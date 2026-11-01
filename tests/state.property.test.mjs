import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { initialState, reduce, assertValid, parseConfig } from "../site/system-canvas-state.ts";

const configs = {
  map:{kind:"map", lenses:[{id:"overview"},{id:"authority"},{id:"behavior"}], leverage:[{id:"rules"},{id:"feedback"}]},
  case:{kind:"case", views:[{name:"Structure"},{name:"Knowledge"},{name:"Authority"}], changes:[{name:"none"},{name:"audit"}]},
  worksheet:{kind:"worksheet",example:{problem:"example",boundary:"people",change:"test"},lenses:[["Structure"],["Behavior"],["Knowledge"]]}
};
const arbitraryAction=fc.record({
  type:fc.oneof(fc.constantFrom("view.select","levers.toggle","lever.select","lens.select","intervention.select","answer.edit","note.edit","worksheet.blank","worksheet.example","unknown"),fc.string({maxLength:15})),
  id:fc.oneof(fc.constantFrom("overview","authority","behavior","rules","feedback"),fc.string({maxLength:15})),
  index:fc.oneof(fc.integer({min:-100,max:100}),fc.constant(NaN),fc.constant(Infinity)),
  open:fc.oneof(fc.boolean(),fc.string({maxLength:4})),
  key:fc.oneof(fc.constantFrom("problem","boundary","change"),fc.string({maxLength:10})),
  value:fc.oneof(fc.string({maxLength:300}),fc.integer({min:-5,max:5}))
});
describe("reducer invariants",()=>{
  for(const [kind,config] of Object.entries(configs)){
    it(`${kind}: randomized sequences never construct invalid states`,()=>{
      fc.assert(fc.property(fc.array(arbitraryAction,{minLength:0,maxLength:80}),actions=>{
        let state=initialState(config);
        expect(assertValid(state,config)).toBe(true);
        for(const action of actions){
          const old=state;
          state=reduce(state,action,config);
          expect(assertValid(state,config)).toBe(true);
          expect(old.kind).toBe(state.kind);
        }
      }),{numRuns:160});
    });
    it(`${kind}: unknown actions do not change state`,()=>{
      const state=initialState(config);
      expect(reduce(state,{type:"nonsense"},config)).toBe(state);
    });
  }
  it("map: closing the overlay clears selected lever; invalid selection cannot reopen",()=>{
    const cfg=configs.map;
    let state=initialState(cfg);
    expect(reduce(state,{type:"lever.select",id:"rules"},cfg)).toBe(state);
    state=reduce(state,{type:"levers.toggle",open:true},cfg);
    state=reduce(state,{type:"lever.select",id:"rules"},cfg);
    expect(state.lever).toBe("rules");
    state=reduce(state,{type:"levers.toggle",open:false},cfg);
    expect(state.lever).toBeNull();
    expect(state.leversOpen).toBe(false);
    expect(reduce(state,{type:"lever.select",id:"rules"},cfg)).toBe(state);
  });
  it("map: selecting a valid view changes exactly the view",()=>{
    const cfg=configs.map;
    const state=initialState(cfg);
    expect(reduce(state,{type:"view.select",id:"authority"},cfg)).toEqual({...state,view:"authority"});
    expect(reduce(state,{type:"view.select",id:"missing"},cfg)).toBe(state);
  });
  it("case: lens and intervention indices are independent",()=>{
    const cfg=configs.case;
    let state=reduce(initialState(cfg),{type:"lens.select",index:2},cfg);
    state=reduce(state,{type:"intervention.select",index:1},cfg);
    expect(state).toEqual({kind:"case",lens:2,intervention:1});
    expect(reduce(state,{type:"lens.select",index:-1},cfg)).toBe(state);
  });
  it("worksheet: lens-scoped notes and answers survive view switching",()=>{
    const cfg=configs.worksheet;
    let state=initialState(cfg);
    state=reduce(state,{type:"answer.edit",key:"problem",value:"edited"},cfg);
    state=reduce(state,{type:"note.edit",value:"structural insight"},cfg);
    state=reduce(state,{type:"lens.select",index:1},cfg);
    state=reduce(state,{type:"note.edit",value:"behavioral insight"},cfg);
    state=reduce(state,{type:"lens.select",index:0},cfg);
    expect(state.notes).toEqual({Structure:"structural insight",Behavior:"behavioral insight"});
    expect(state.answers.problem).toBe("edited");
  });
  it("worksheet: blank resets notes and answers, example restores source",()=>{
    const cfg=configs.worksheet;
    let state=reduce(initialState(cfg),{type:"note.edit",value:"note"},cfg);
    state=reduce(state,{type:"worksheet.blank"},cfg);
    expect(Object.values(state.answers)).toEqual(["","",""]);
    expect(state.notes).toEqual({});
    state=reduce(state,{type:"worksheet.example"},cfg);
    expect(state.answers).toEqual(cfg.example);
  });
  it("reducer does not mutate prior states",()=>{
    fc.assert(fc.property(fc.array(arbitraryAction,{maxLength:60}),actions=>{
      const cfg=configs.worksheet;
      let state=initialState(cfg);
      for(const action of actions){
        const prior=state, before=structuredClone(state);
        state=reduce(state,action,cfg);
        expect(prior).toEqual(before);
        expect(assertValid(state,cfg)).toBe(true);
      }
    }),{numRuns:75});
  });
});


describe("invalid states must be rejected",()=>{
  it("rejects null, arrays and unknown variants without throwing",()=>{
    for(const cfg of Object.values(configs)){
      for(const invalid of [null,undefined,[],{}, {kind:"wrong"}, {kind:cfg.kind,lens:-1}].slice(0,5)){
        expect(assertValid(invalid,cfg)).toBe(false);
      }
    }
  });
  it("rejects map's impossible control states",()=>{
    const cfg=configs.map,base=initialState(cfg);
    for(const patch of [
      {view:"missing"},{view:undefined},{leversOpen:"yes"},
      {leversOpen:false,lever:"rules"},{leversOpen:true,lever:"unknown"},
      {leversOpen:true,lever:12},{leversOpen:null}
    ])expect(assertValid({...base,...patch},cfg)).toBe(false);
  });
  it("rejects invalid case lens and intervention indices",()=>{
    const cfg=configs.case,base=initialState(cfg);
    for(const patch of [
      {lens:-1},{lens:cfg.views.length},{lens:1.5},{lens:"0"},
      {intervention:-1},{intervention:cfg.changes.length},
      {intervention:NaN},{intervention:"1"}
    ])expect(assertValid({...base,...patch},cfg)).toBe(false);
  });
  it("rejects invalid worksheet records and individual fields",()=>{
    const cfg=configs.worksheet,base=initialState(cfg);
    for(const patch of [
      {lens:-1},{lens:cfg.lenses.length},{lens:"0"},
      {answers:null},{answers:[]},{answers:{}},
      {answers:{...base.answers,problem:100}},
      {answers:{...base.answers,extra:"unrecognized"}},
      {notes:null},{notes:[]},{notes:{Unknown:"value"}},
      {notes:{Structure:123}},{notice:42}
    ])expect(assertValid({...base,...patch},cfg)).toBe(false);
  });
  it("fuzzes invalid worksheet field types and missing answers",()=>{
    const cfg=configs.worksheet;
    fc.assert(fc.property(
      fc.constantFrom(...Object.keys(cfg.example)),
      fc.oneof(fc.integer(),fc.boolean(),fc.constant(null),fc.constant(undefined)),
      (key,value)=>{
        const base=initialState(cfg);
        const answers={...base.answers,[key]:value};
        expect(assertValid({...base,answers},cfg)).toBe(false);
        delete answers[key];
        expect(assertValid({...base,answers},cfg)).toBe(false);
      }
    ),{numRuns:200});
  });
  it("unknown and malformed events are no-ops",()=>{
    for(const cfg of Object.values(configs)){
      const state=initialState(cfg);
      for(const action of [undefined,null,{},false,7,"bad",{type:7},{type:"unrecognized"}]){
        expect(reduce(state,action,cfg)).toBe(state);
      }
    }
  });
  it("initial state variants are fully specified",()=>{
    expect(initialState(configs.map)).toEqual({kind:"map",view:"overview",leversOpen:false,lever:null});
    expect(initialState(configs.case)).toEqual({kind:"case",lens:0,intervention:0});
    expect(initialState(configs.worksheet)).toEqual({
      kind:"worksheet",lens:0,answers:configs.worksheet.example,notes:{},
      notice:"Example loaded. Work stays in this browser tab; export JSON to keep it."
    });
    expect(()=>initialState({kind:"invalid"})).toThrow(TypeError);
  });
});

describe("Valibot configuration and persistence boundary",()=>{
  it("rejects malformed configs before building state",()=>{
    for(const bad of [
      null, {}, {kind:"map",lenses:[],leverage:[]},
      {kind:"map",lenses:[{id:"a"},{id:"a"}],leverage:[]},
      {kind:"map",lenses:[{id:"a"}],leverage:[{id:"x"},{id:"x"}]},
      {kind:"case",views:[],changes:[{}]},
      {kind:"case",views:[{}],changes:[]},
      {kind:"worksheet",lenses:[],example:{}},
      {kind:"worksheet",lenses:[[]],example:{}},
      {kind:"worksheet",lenses:[["Structure"]],example:{problem:45}}
    ])expect(()=>parseConfig(bad)).toThrow();
  });
  it("preserves UI metadata while validating required config members",()=>{
    const config=parseConfig({kind:"map",lenses:[{id:"overview",title:"Overview",focus:"all"}],
      leverage:[{id:"rules",zone:"governance"}],extraInfo:"preserved"});
    expect(config.lenses[0].title).toBe("Overview");
    expect(config.extraInfo).toBe("preserved");
  });
  it("accepts JSON round-tripped legal states, rejects fabricated ones",()=>{
    for(const cfg of Object.values(configs)){
      let state=initialState(cfg);
      const actions=cfg.kind==="map"
        ? [{type:"levers.toggle",open:true},{type:"lever.select",id:"rules"}]
        : cfg.kind==="case"
        ? [{type:"lens.select",index:1},{type:"intervention.select",index:1}]
        : [{type:"answer.edit",key:"problem",value:"changed"},{type:"note.edit",value:"some evidence"}];
      for(const action of actions)state=reduce(state,action,cfg);
      const roundTrip=JSON.parse(JSON.stringify(state));
      expect(assertValid(roundTrip,cfg)).toBe(true);
      expect(roundTrip).toEqual(state);
      expect(assertValid({...roundTrip,extraneousField:true},cfg)).toBe(false);
    }
  });
});
