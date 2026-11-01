import * as v from "valibot";

// The schemas are the contract; TypeScript types are derived, not duplicated.
const MapClosed = v.strictObject({
  kind: v.literal("map"), view: v.string(),
  leversOpen: v.literal(false), lever: v.null()
});
const MapOpen = v.strictObject({
  kind: v.literal("map"), view: v.string(),
  leversOpen: v.literal(true), lever: v.nullable(v.string())
});
export const MapStateSchema = v.variant("leversOpen", [MapClosed, MapOpen]);
export const CaseStateSchema = v.strictObject({
  kind: v.literal("case"),
  lens: v.pipe(v.number(), v.integer(), v.minValue(0)),
  intervention: v.pipe(v.number(), v.integer(), v.minValue(0))
});
const StringRecordSchema = v.pipe(
  v.custom<Record<string,string>>((input) =>
    input!==null && typeof input==="object" && !Array.isArray(input)),
  v.record(v.string(),v.string())
);
export const WorksheetStateSchema = v.strictObject({
  kind: v.literal("worksheet"),
  lens: v.pipe(v.number(), v.integer(), v.minValue(0)),
  answers: StringRecordSchema,
  notes: StringRecordSchema,
  notice: v.string()
});
export const StateSchema = v.union([
  // MapStateSchema is itself a variant: use this union as the public state contract.
  MapClosed, MapOpen, CaseStateSchema, WorksheetStateSchema
]);
export type State = v.InferOutput<typeof StateSchema>;
export type MapState = v.InferOutput<typeof MapStateSchema>;
export type CaseState = v.InferOutput<typeof CaseStateSchema>;
export type WorksheetState = v.InferOutput<typeof WorksheetStateSchema>;

const MapConfigSchema = v.pipe(v.looseObject({
  kind: v.literal("map"),
  lenses: v.pipe(v.array(v.looseObject({id:v.string()})),v.minLength(1)),
  leverage: v.array(v.looseObject({id:v.string()}))
}),v.check(c=>new Set(c.lenses.map(x=>x.id)).size===c.lenses.length
  && new Set(c.leverage.map(x=>x.id)).size===c.leverage.length));
const CaseConfigSchema = v.looseObject({
  kind:v.literal("case"),
  views:v.pipe(v.array(v.unknown()),v.minLength(1)),
  changes:v.pipe(v.array(v.unknown()),v.minLength(1))
});
const WorksheetConfigSchema = v.looseObject({
  kind:v.literal("worksheet"),
  example:v.record(v.string(),v.string()),
  lenses:v.pipe(v.array(v.pipe(v.array(v.string()),v.minLength(1))),v.minLength(1))
});
export const ConfigSchema = v.union([
  MapConfigSchema,CaseConfigSchema,WorksheetConfigSchema
]);
export type Config = v.InferOutput<typeof ConfigSchema>;
export type MapConfig = v.InferOutput<typeof MapConfigSchema>;
export type CaseConfig = v.InferOutput<typeof CaseConfigSchema>;
export type WorksheetConfig = v.InferOutput<typeof WorksheetConfigSchema>;

export function parseConfig(input: unknown): Config {
  return v.parse(ConfigSchema,input);
}

const ActionSchema = v.variant("type",[
  v.object({type:v.literal("view.select"),id:v.string()}),
  v.object({type:v.literal("levers.toggle"),open:v.boolean()}),
  v.object({type:v.literal("lever.select"),id:v.string()}),
  v.object({type:v.literal("lens.select"),index:v.pipe(v.number(),v.integer())}),
  v.object({type:v.literal("intervention.select"),index:v.pipe(v.number(),v.integer())}),
  v.object({type:v.literal("answer.edit"),key:v.string(),value:v.string()}),
  v.object({type:v.literal("note.edit"),value:v.string()}),
  v.object({type:v.literal("worksheet.blank")}),
  v.object({type:v.literal("worksheet.example")})
]);
export type Action = v.InferOutput<typeof ActionSchema>;

function schemaFor(config: Config) {
  if(config.kind==="map")
    return v.pipe(MapStateSchema,v.check(s=>config.lenses.some(x=>x.id===s.view)
      && (s.lever===null || config.leverage.some(x=>x.id===s.lever))));
  if(config.kind==="case")
    return v.pipe(CaseStateSchema,v.check(s=>s.lens<config.views.length
      && s.intervention<config.changes.length));
  return v.pipe(WorksheetStateSchema,v.check(s=>{
    const keys=Object.keys(config.example);
    return s.lens<config.lenses.length
      && Object.keys(s.answers).length===keys.length
      && keys.every(k=>Object.prototype.hasOwnProperty.call(s.answers,k))
      && Object.keys(s.notes).every(k=>config.lenses.some(l=>l[0]===k));
  }));
}

export function assertValid(state: unknown, config: Config): boolean {
  return v.safeParse(schemaFor(config),state).success;
}
function checked<T extends State>(candidate: T, config: Config): T {
  if (!assertValid(candidate,config)) throw new TypeError("Invalid System Canvas state");
  return candidate;
}

export function initialState(config: Config): State {
  if(config.kind==="map") return checked({
    kind:"map",view:config.lenses[0].id,leversOpen:false,lever:null
  },config);
  if(config.kind==="case") return checked({kind:"case",lens:0,intervention:0},config);
  if(config.kind==="worksheet") return checked({
    kind:"worksheet",lens:0,answers:{...config.example},notes:{},
    notice:"Example loaded. Work stays in this browser tab; export JSON to keep it."
  },config);
  throw new TypeError("Unknown System Canvas component");
}

export function reduce(state: State, unknownAction: unknown, config: Config): State {
  const parsed=v.safeParse(ActionSchema,unknownAction);
  if(!parsed.success) return state;
  const action=parsed.output;
  if(state.kind==="map" && config.kind==="map") {
    switch(action.type){
      case "view.select":
        return config.lenses.some(x=>x.id===action.id)
          ? checked({...state,view:action.id},config):state;
      case "levers.toggle":
        return action.open
          ? checked({kind:"map",view:state.view,leversOpen:true,lever:state.lever},config)
          : checked({kind:"map",view:state.view,leversOpen:false,lever:null},config);
      case "lever.select":
        return state.leversOpen && config.leverage.some(x=>x.id===action.id)
          ? checked({...state,lever:action.id},config):state;
      default: return state;
    }
  }
  if(state.kind==="case" && config.kind==="case") {
    if(action.type==="lens.select" && action.index>=0 && action.index<config.views.length)
      return checked({...state,lens:action.index},config);
    if(action.type==="intervention.select" && action.index>=0 && action.index<config.changes.length)
      return checked({...state,intervention:action.index},config);
    return state;
  }
  if(state.kind==="worksheet" && config.kind==="worksheet") {
    switch(action.type){
      case "lens.select":
        return action.index>=0 && action.index<config.lenses.length
          ? checked({...state,lens:action.index},config):state;
      case "answer.edit":
        return Object.prototype.hasOwnProperty.call(config.example,action.key)
          ? checked({...state,answers:{...state.answers,[action.key]:action.value},
              notice:"Unsaved edits. Export JSON to keep a copy."},config):state;
      case "note.edit":
        return checked({...state,notes:{...state.notes,[config.lenses[state.lens][0]]:action.value},
          notice:"Unsaved edits. Export JSON to keep a copy."},config);
      case "worksheet.blank":
        return checked({...state,answers:Object.fromEntries(Object.keys(config.example).map(k=>[k,""])),
          notes:{},notice:"Blank canvas ready."},config);
      case "worksheet.example":
        return checked({...state,answers:{...config.example},notes:{},
          notice:"Hypothetical example restored."},config);
      default: return state;
    }
  }
  return state;
}
