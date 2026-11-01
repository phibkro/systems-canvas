import { initialState, reduce, assertValid, parseConfig } from "./system-canvas-state.ts";

const instances=new WeakMap();
const roots="[data-system-map], [data-prototype], .canvas-demo[data-sc-config]";
function instance(root){
  let data=instances.get(root);
  if(data)return data;
  const input=JSON.parse(root.getAttribute("data-sc-config")||"{}");
  input.kind=root.matches("[data-system-map]")?"map":root.matches("[data-prototype]")?"worksheet":"case";
  const config=parseConfig(input);
  data={config,state:initialState(config)};
  instances.set(root,data);
  return data;
}
function setText(root,selector,value){const e=root.querySelector(selector);if(e)e.textContent=value;}
function render(root){
  const {config,state:s}=instance(root);
  if(s.kind==="map"){
    const v=config.lenses.find(x=>x.id===s.view);
    root.dataset.focus=v.focus;
    root.dataset.leverage=s.lever?config.leverage.find(x=>x.id===s.lever).zone:"";
    root.querySelectorAll("[data-view]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.view===s.view)));
    root.querySelectorAll("[data-leverage]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.leverage===s.lever)));
    const c=root.querySelector("[data-leverage-toggle]");if(c)c.checked=s.leversOpen;
    const panel=root.querySelector("[data-leverage-panel]");if(panel)panel.hidden=!s.leversOpen;
    setText(root,"[data-lens-title]",v.title);setText(root,"[data-lens-note]",v.note);
    setText(root,"[data-leverage-description]",s.lever?
      config.leverage.find(x=>x.id===s.lever).detail:
      "Select an intervention type to highlight where it acts. An intervention may cross multiple regions.");
  }else if(s.kind==="case"){
    const v=config.views[s.lens],change=config.changes[s.intervention];
    root.querySelectorAll("[data-lens]").forEach(b=>b.setAttribute("aria-pressed",String(Number(b.dataset.lens)===s.lens)));
    for(const [selector,value] of [["#lens-prompt",v.prompt],["#edge-one",v.edges[0]],["#edge-two",v.edges[1]],["#lens-insight",v.insight],["#lens-test",v.test],["#case-effect",change.effect],["#case-risk",change.risk]])setText(root,selector,value);
    const select=root.querySelector("#case-intervention");if(select)select.value=String(s.intervention);
  }else{
    const lens=config.lenses[s.lens];
    root.querySelectorAll("[data-lens]").forEach(b=>b.setAttribute("aria-pressed",String(Number(b.dataset.lens)===s.lens)));
    setText(root,"[data-theory]",lens[1]);setText(root,"[data-question]",lens[2]);setText(root,"[data-test]",lens[3]);
    const notes=root.querySelector("[data-notes]");if(notes)notes.value=s.notes[lens[0]]||"";
    root.querySelectorAll("[data-key]").forEach(el=>{if(s.answers[el.dataset.key]!==undefined && el.value!==s.answers[el.dataset.key])el.value=s.answers[el.dataset.key];});
    setText(root,"[data-status]",s.notice);
  }
}
function dispatch(root,action){
  const current=instance(root),next=reduce(current.state,action,current.config);
  if(!assertValid(next,current.config))throw new Error("Invalid System Canvas state transition");
  current.state=next;render(root);
}
function exportWorksheet(root){
  const {state}=instance(root);
  const data={schema:"system-canvas/worksheet-v0.1",createdAt:new Date().toISOString(),answers:state.answers,lensNotes:state.notes};
  const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}));
  const a=document.createElement("a");a.href=url;a.download="system-canvas-worksheet.json";document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  setText(root,"[data-status]","JSON exported. No information was uploaded.");
}
function install(){
  if(window.__systemCanvasControllerInstalled)return;
  window.__systemCanvasControllerInstalled=true;
  document.addEventListener("click",event=>{
    const button=event.target.closest("button");if(!button)return;
    const root=button.closest(roots);if(!root)return;
    const {config}=instance(root);
    if(config.kind==="map"){
      if(button.hasAttribute("data-view"))dispatch(root,{type:"view.select",id:button.dataset.view});
      if(button.hasAttribute("data-leverage"))dispatch(root,{type:"lever.select",id:button.dataset.leverage});
    }else if(config.kind==="case"){
      if(button.hasAttribute("data-lens"))dispatch(root,{type:"lens.select",index:Number(button.dataset.lens)});
    }else{
      if(button.hasAttribute("data-lens"))dispatch(root,{type:"lens.select",index:Number(button.dataset.lens)});
      if(button.dataset.action==="blank")dispatch(root,{type:"worksheet.blank"});
      if(button.dataset.action==="example")dispatch(root,{type:"worksheet.example"});
      if(button.dataset.action==="print")window.print();
      if(button.dataset.action==="export")exportWorksheet(root);
    }
  });
  document.addEventListener("change",event=>{
    const target=event.target,root=target.closest(roots);if(!root)return;
    const {config}=instance(root);
    if(config.kind==="map"&&target.matches("[data-leverage-toggle]"))dispatch(root,{type:"levers.toggle",open:target.checked});
    if(config.kind==="case"&&target.matches("#case-intervention"))dispatch(root,{type:"intervention.select",index:Number(target.value)});
  });
  document.addEventListener("input",event=>{
    const target=event.target,root=target.closest("[data-prototype]");if(!root)return;
    if(target.matches("[data-key]"))dispatch(root,{type:"answer.edit",key:target.dataset.key,value:target.value});
    if(target.matches("[data-notes]"))dispatch(root,{type:"note.edit",value:target.value});
  });
  // Astro ClientRouter swaps nodes without reloading scripts. Reconcile each new page.
  document.addEventListener("astro:page-load",()=>document.querySelectorAll(roots).forEach(render));
  document.querySelectorAll(roots).forEach(render);
}
install();
