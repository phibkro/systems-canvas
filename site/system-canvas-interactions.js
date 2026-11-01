/* Single document-level controller survives Astro ClientRouter swaps.
   Each page's HTML carries its own declarative configuration. */
(() => {
  if (window.__systemCanvasControllerInstalled) return;
  window.__systemCanvasControllerInstalled = true;
  const states = new WeakMap();
  const config = root => {
    if (!root._scConfig) root._scConfig = JSON.parse(root.getAttribute('data-sc-config') || '{}');
    return root._scConfig;
  };
  const state = root => {
    if (!states.has(root)) states.set(root, {lens:0,notes:{}});
    return states.get(root);
  };
  const setText = (root,selector,value) => {
    const el=root.querySelector(selector);
    if(el) el.textContent=value;
  };
  const q = (root,selector) => root.querySelector(selector);
  const status = (root,message) => setText(root,'[data-status]',message);

  document.addEventListener('click',event => {
    const button=event.target.closest('button');
    if(!button) return;
    const map=button.closest('[data-system-map]');
    if(map) {
      const {lenses=[],leverage=[]}=config(map);
      if(button.hasAttribute('data-view')) {
        const id=button.dataset.view;
        const lens=lenses.find(v=>v.id===id)||lenses[0];
        if(!lens) return;
        map.dataset.focus=lens.focus;
        map.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
        setText(map,'[data-lens-title]',lens.title);
        setText(map,'[data-lens-note]',lens.note);
      } else if(button.hasAttribute('data-leverage')) {
        const v=leverage.find(v=>v.id===button.dataset.leverage);
        if(!v) return;
        map.dataset.leverage=v.zone;
        map.querySelectorAll('[data-leverage]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
        setText(map,'[data-leverage-description]',v.detail);
      }
      return;
    }
    const prototype=button.closest('[data-prototype]');
    if(prototype) {
      const {example={},lenses=[]}=config(prototype),s=state(prototype),keys=Object.keys(example);
      const el=key=>q(prototype,'[data-key="'+key+'"]');
      const render=()=>{
        const active=lenses[s.lens];
        if(!active) return;
        setText(prototype,'[data-theory]',active[1]);
        setText(prototype,'[data-question]',active[2]);
        setText(prototype,'[data-test]',active[3]);
        q(prototype,'[data-notes]').value=s.notes[active[0]]||'';
        prototype.querySelectorAll('[data-lens]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.lens)===s.lens)));
      };
      if(button.hasAttribute('data-lens')) {
        s.notes[lenses[s.lens][0]]=q(prototype,'[data-notes]').value;
        s.lens=Number(button.dataset.lens);render();
      } else if(button.dataset.action==='example') {
        keys.forEach(k=>{if(el(k))el(k).value=example[k]});
        s.notes={};render();status(prototype,'Hypothetical example restored.');
      } else if(button.dataset.action==='blank') {
        keys.forEach(k=>{if(el(k))el(k).value=''});
        s.notes={};render();status(prototype,'Blank canvas ready.');
      } else if(button.dataset.action==='print') {
        window.print();
      } else if(button.dataset.action==='export') {
        const data={schema:'system-canvas/worksheet-v0.1',createdAt:new Date().toISOString(),
          answers:Object.fromEntries(keys.map(k=>[k,el(k)?.value||''])),lensNotes:s.notes};
        const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
        const a=document.createElement('a');a.href=url;a.download='system-canvas-worksheet.json';
        document.body.append(a);a.click();a.remove();
        setTimeout(()=>URL.revokeObjectURL(url),1000);
        status(prototype,'JSON exported. No information was uploaded.');
      }
      return;
    }
    const explorer=button.closest('.canvas-demo[data-sc-config]');
    if(explorer && button.hasAttribute('data-lens')) {
      const {views=[]}=config(explorer),v=views[Number(button.dataset.lens)];
      if(!v) return;
      explorer.querySelectorAll('[data-lens]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      setText(explorer,'#lens-prompt',v.prompt);
      setText(explorer,'#edge-one',v.edges[0]);
      setText(explorer,'#edge-two',v.edges[1]);
      setText(explorer,'#lens-insight',v.insight);
      setText(explorer,'#lens-test',v.test);
    }
  });
  document.addEventListener('change',event=>{
    const target=event.target;
    const map=target.closest('[data-system-map]');
    if(map && target.matches('[data-leverage-toggle]')) {
      const panel=q(map,'[data-leverage-panel]');
      if(panel) panel.hidden=!target.checked;
      if(!target.checked) map.dataset.leverage='';
    }
    const explorer=target.closest('.canvas-demo[data-sc-config]');
    if(explorer && target.matches('#case-intervention')) {
      const {changes=[]}=config(explorer),change=changes[Number(target.value)];
      if(!change) return;
      setText(explorer,'#case-effect',change.effect);
      setText(explorer,'#case-risk',change.risk);
    }
  });
  document.addEventListener('input',event=>{
    const root=event.target.closest('[data-prototype]');
    if(!root) return;
    if(event.target.matches('[data-notes]')) {
      const {lenses=[]}=config(root),s=state(root);
      if(lenses[s.lens]) s.notes[lenses[s.lens][0]]=event.target.value;
    }
    status(root,'Unsaved edits in this tab. Export JSON to keep a copy.');
  });
})();
