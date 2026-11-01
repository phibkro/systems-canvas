import React, { useState } from 'react';

const actors = [
  { id: 'news', name: 'Newsroom', detail: 'Creates and checks claims', x: 20 },
  { id: 'platform', name: 'Platform', detail: 'Distributes content', x: 226 },
  { id: 'audience', name: 'Audience', detail: 'Interprets and responds', x: 432 }
];
const views = {
  structural: { label:'Structure', question:'Who controls the connections?', edges:['content supply','distribution'], evidence:'Which distribution channels and dependencies actually exist?', notes:'A newsroom supplies reports; a platform mediates some distribution. Alternative channels may exist.' },
  behavioral: { label:'Behavior', question:'What behavior reinforces the outcome?', edges:['publishing choices','ranking incentives'], evidence:'Do visibility metrics causally influence editorial decisions?', notes:'A feedback loop between visibility and publisher adaptation is plausible, not proven.' },
  epistemic: { label:'Knowledge', question:'Who knows or can verify what?', edges:['reported claims','exposure to claims'], evidence:'Who verifies source claims, and how reliably do corrections reach readers?', notes:'Credibility, factual accuracy, and audience belief are different variables.' },
  deontic: { label:'Authority', question:'Who may decide and enforce?', edges:['platform rules','moderation decisions'], evidence:'Who can appeal a decision, audit its basis, or change the rules?', notes:'Published policies do not themselves demonstrate fair or consistent enforcement.' },
  teleological: { label:'Purpose', question:'Which goals conflict?', edges:['reach / quality','retention / access'], evidence:'What objectives are explicitly stated versus rewarded in actual operations?', notes:'Editorial accuracy, public value, reach, and platform revenue need not align.' },
  evaluative: { label:'Outcomes', question:'What happens, and to whom?', edges:['quality / reach','access / trust'], evidence:'What baseline and outcome measures could test any proposed change?', notes:'Attention alone is not equivalent to truth, welfare or democratic value.' }
};
const changes = {
  none: { label:'No change', hypothesis:'Baseline is unknown. The existing pattern may persist.', risk:'Unobserved changes and alternative explanations remain.' },
  visibility: { label:'Make corrections more visible', hypothesis:'Broader corrections may reduce persistent misbelief.', risk:'Selective corrections or low audience trust can limit effectiveness.' },
  audit: { label:'Independent distribution audit', hypothesis:'External scrutiny may expose misaligned ranking practices.', risk:'Disclosure can enable gaming and raise privacy concerns.' },
  governance: { label:'Introduce shared appeals', hypothesis:'An appeal mechanism may improve institutional accountability.', risk:'Complex governance may introduce delays or power struggles.' }
};
export default function CaseExplorer() {
  const [view,setView] = useState('structural');
  const [actor,setActor] = useState('platform');
  const [change,setChange] = useState('none');
  const active=views[view];
  return <section className="sc-explorer" aria-label="Interactive six-perspective journalism case">
    <div className="sc-header"><strong>System Canvas · Interactive case</strong><span>Hypothetical / unverified</span></div>
    <div className="sc-tabs" role="group" aria-label="Analytical lenses">{Object.entries(views).map(([key,v])=><button key={key} type="button" aria-pressed={view===key} className={view===key?'active':''} onClick={()=>setView(key)}>{v.label}</button>)}</div>
    <h3>{active.question}</h3>
    <p className="sc-hint">Select any participant to keep it in focus while changing analytical views.</p>
    <div className="sc-map"><svg viewBox="0 0 600 192" role="img" aria-label={active.label+' relationships between a newsroom, platform, and audience'}>
      <defs><marker id="sc-arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#8be0c0"/></marker></defs>
      <rect x="4" y="5" width="592" height="180" rx="12" fill="#132329" stroke="#52696c" strokeDasharray="5 5"/>
      <text x="18" y="23" fill="#97b5b5" fontSize="10">SYSTEM BOUNDARY / ILLUSTRATIVE</text>
      {actors.map((a,i)=><g key={a.id} onClick={()=>setActor(a.id)} role="button" tabIndex="0" onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setActor(a.id)}}} style={{cursor:'pointer'}}>
        <rect x={a.x} y="60" rx="8" width="148" height="68" fill={actor===a.id?'#2a5048':'#22363b'} stroke={actor===a.id?'#8be0c0':'#567076'} strokeWidth={actor===a.id?2:1}/>
        <text x={a.x+74} y="85" fill="#f1faf8" textAnchor="middle" fontSize="15" fontWeight="600">{a.name}</text>
        <text x={a.x+74} y="108" fill="#b4c8c6" textAnchor="middle" fontSize="10">{a.detail}</text>
      </g>)}
      {[0,1].map(i=><g key={i}><path d={`M${actors[i].x+148} 95 H${actors[i+1].x-7}`} stroke="#8be0c0" strokeWidth="2" markerEnd="url(#sc-arrow)" /><text x={(actors[i].x+148+actors[i+1].x)/2} y="48" fill="#ccdfda" fontSize="10" textAnchor="middle">{active.edges[i]}</text></g>)}
      <text x="20" y="162" fill="#a5bdb9" fontSize="11">Arrows indicate analytical relationships, not proven causation.</text>
    </svg></div>
    <div className="sc-details"><div><strong>{active.label} insight</strong><p>{active.notes}</p></div><div><strong>Evidence to collect</strong><p>{active.evidence}</p><strong>Selected actor: {actors.find(a=>a.id===actor).name}</strong></div></div>
    <div className="sc-intervention"><label htmlFor="sc-intervention-select">Intervention hypothesis</label><select id="sc-intervention-select" value={change} onChange={e=>setChange(e.target.value)}>{Object.entries(changes).map(([id,c])=><option key={id} value={id}>{c.label}</option>)}</select><p><strong>Possible effect:</strong> {changes[change].hypothesis}</p><p><strong>Potential side effect:</strong> {changes[change].risk}</p><small>No measured effects are implied. This is a qualitative thought experiment, not a simulation.</small></div>
    <style>{`
      .sc-explorer{font-family:system-ui,sans-serif;color:#e8f3ef;background:#172a30;border:1px solid #466068;border-radius:14px;margin:28px 0;overflow:hidden}
      .sc-explorer *{box-sizing:border-box}.sc-header{display:flex;justify-content:space-between;gap:12px;padding:17px 20px;border-bottom:1px solid #3a545a;font-size:13px}.sc-header span{color:#eacb91}
      .sc-tabs{display:flex;gap:6px;overflow-x:auto;padding:16px 18px}.sc-tabs button{background:#223b41;color:#c8d8d7;border:1px solid #49666a;padding:9px 11px;border-radius:7px;cursor:pointer;white-space:nowrap;font-size:12px}.sc-tabs button.active{background:#426b5c;border-color:#8be0c0;color:white}.sc-tabs button:focus-visible,.sc-intervention select:focus-visible{outline:2px solid #8be0c0;outline-offset:2px}
      .sc-explorer h3{font-size:19px;margin:12px 20px 4px!important;border:0!important}.sc-explorer .sc-hint{font-size:12px;color:#afc8c4;margin:6px 20px 14px}.sc-map{overflow-x:auto;padding:0 14px}.sc-map svg{display:block;width:100%;min-width:520px;height:auto}.sc-details{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:18px 20px}.sc-details>div{padding:15px;border-radius:9px;background:#21373d}.sc-details p{font-size:13px;line-height:1.6;color:#c2d5d2;margin:9px 0}.sc-details strong{font-size:13px}.sc-intervention{background:#1d3238;border-top:1px solid #405b60;padding:19px 20px}.sc-intervention label{font-weight:700;font-size:13px;display:block;margin-bottom:8px}.sc-intervention select{width:100%;background:#11252c;color:white;padding:10px;border:1px solid #648080;border-radius:7px}.sc-intervention p{font-size:13px;color:#d6e6e3}.sc-intervention small{font-size:11px;color:#aac5c0}@media(max-width:650px){.sc-details{grid-template-columns:1fr}.sc-header{flex-direction:column}}
    `}</style>
  </section>;
}