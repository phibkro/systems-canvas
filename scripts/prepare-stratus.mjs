import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(), target=path.join(root,'.stratus-build'), docsDir=path.join(target,'src/content/docs');
const write=(file,content)=>{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,content);};
const modify=(file,fn)=>write(file,fn(fs.readFileSync(file,'utf8')));
const json=(file,fn)=>modify(file,src=>JSON.stringify(fn(JSON.parse(src)),null,2)+'\n');
fs.rmSync(docsDir,{recursive:true,force:true});
const entries=[
 ['docs/enterprise-agency-modeling.md','Enterprise & Agency Modeling','Model',10],
 ['docs/enterprise-model.md','Enterprise Model','Model',20],
 ['docs/game-model.md','Game Model','Model',30],
 ['docs/human-viable-systems.md','Human Viable Systems','Research',5],
 ['docs/system-canvas-core.md','Core thesis','Foundations',10],
 ['docs/system-canvas-course.md','Learning course','Learn',10],
 ['docs/system-canvas-field-guide.md','Practitioner field guide','Learn',20],
 ['docs/system-canvas-analytical-cases.md','Analytical cases','Learn',30],
 ['research/system-canvas-research-thesis.md','Research thesis','Research',10],
 ['research/system-canvas-validation-protocol.md','Validation protocol','Research',20],
 ['research/system-canvas-expert-brief.md','Expert collaboration','Research',30],
 ['research/system-canvas-insight-register.md','Insight register','Research',40]
];
for(const [input,title,group,order] of entries){
 let body=fs.readFileSync(path.join(root,input),'utf8').replace(/^# [^\n]+\n/,'');
 // Stratus renders diagrams using the MDX Diagram component, not bare Mermaid fences.
 // Keep canonical source Markdown portable while compiling each diagram as an MDX component.
 body=body.replace(/```mermaid[ \t]*\r?\n([\s\S]*?)\r?\n```/g, (_match,definition)=>
  '<Diagram definition={'+JSON.stringify(definition.trim())+'} />'
 );
 body=body.replace(/\]\((?:\.\.\/)?(?:docs\/|research\/)?(system-canvas-[\w-]+)\.md\)/g,(_,name)=>{
  const found=entries.find(e=>path.basename(e[0],'.md')===name);
  return '](/'+(found?.[0].startsWith('research/')?'research':'docs')+'/'+name+'/)';
 });
 write(path.join(docsDir,input.replace(/\.md$/,'.mdx')),
  '---\ntitle: '+JSON.stringify(title)+'\ndescription: '+JSON.stringify('System Canvas · '+title)+'\ngroup: '+JSON.stringify(group)+'\norder: '+order+'\n---\n\n'+body);
}
// Compile the TypeScript/Valibot state machine into one self-contained browser module.
fs.mkdirSync(path.join(target,'public'),{recursive:true});
execFileSync(path.join(root,'node_modules/.bin/esbuild'),[
  path.join(root,'site/system-canvas-interactions.js'),
  '--bundle','--platform=browser','--format=esm','--target=es2022',
  '--outfile='+path.join(target,'public/system-canvas-interactions.js')
],{stdio:'inherit'});
modify(path.join(target,'src/layouts/BaseLayout.astro'),layout=>layout.replace('<ClientRouter />','<script is:inline type="module" src="/system-canvas-interactions.js"></script>\n    <ClientRouter />'));
write(path.join(target,'src/components/custom/CaseExplorer.astro'),fs.readFileSync(path.join(root,'site/CaseExplorer.astro'),'utf8'));
write(path.join(target,'src/components/custom/DiagnosticCanvas.astro'),fs.readFileSync(path.join(root,'site/DiagnosticCanvas.astro'),'utf8'));
write(path.join(target,'src/components/custom/SystemSpatialModel.astro'),fs.readFileSync(path.join(root,'site/SystemSpatialModel.astro'),'utf8'));
for(const [src,name] of [
 ['site/assets/practitioner-vertical.svg','practitioner-vertical.svg'],
 ['site/assets/six-aspect.svg','six-aspect.svg'],
 ['site/assets/journalism-vertical.svg','journalism-vertical.svg']
]){
 const asset=fs.readFileSync(path.join(root,src),'utf8');
 write(path.join(target,'public/diagrams',name),asset);
 if(name==='practitioner-vertical.svg')write(path.join(target,'src/components/custom/assets',name),asset);
}

write(path.join(docsDir,'canvas/index.mdx'),[
 '---',
 'title: "Enterprise Canvas · Interactive prototype"',
 'description: "Explore enterprise organization, behavior, governance and outcomes through an interactive diagnostic canvas."',
 'group: "Explore"',
 'order: 1',
 '---','',
 "import DiagnosticCanvas from '../../../components/custom/DiagnosticCanvas.astro';",
 "import SystemSpatialModel from '../../../components/custom/SystemSpatialModel.astro';",'',
 '# Enterprise Canvas · Start with a concrete problem','',
 '**Enterprise Canvas** is the practitioner interface to [Enterprise & Agency Modeling](/docs/enterprise-agency-modeling/). This is currently an interactive **Enterprise Model** overview; a dedicated Game Canvas is proposed but not yet implemented. The linked [Human Viable Systems](/docs/human-viable-systems/) research program offers optional, explicit normative evaluation criteria. This **experimental prototype** translates the practitioner field guide into a single worksheet. Fill six simple prompts, open a deeper view only when necessary, and export your work. It does **not** store your content on a server. Edits remain in the current browser tab until exported.','',
 '<SystemSpatialModel />','',
 '## Fill out the diagnosis','',
 '<DiagnosticCanvas />','',
 '## What this prototype tests','',
 '- Can someone reach a defensible diagnosis without prior VSM, IAD, 4EM or systems-theory training?',
 '- Can optional analytical views improve reasoning without overwhelming the initial worksheet?',
 '- Can the practitioner separate causal hypotheses from evidence, account for affected parties, and propose testable changes?','',
 'The example is hypothetical, not a documented claim about journalism or platform algorithms. See the [field guide](/docs/system-canvas-field-guide/) and [validation protocol](/research/system-canvas-validation-protocol/).',''
].join('\n'));
write(path.join(docsDir,'cases/journalism.mdx'),[
 '---','title: "Journalism ecosystem: interactive case"',
 'description: "Explore the same system through six analytical lenses."',
 'group: "Explore"','order: 10','---','',
 "import CaseExplorer from '../../../components/custom/CaseExplorer.astro';",'',
 '# One enterprise, six analytical views','',
 'A teaching scenario about journalists, distribution platforms and audiences. Use [Enterprise Models](/docs/enterprise-model/) to map operations and [Game Models](/docs/game-model/) to examine decisions and incentives. The relationships are **illustrative**, not established claims about a particular platform.','',
 '## Explore the case','',
 '<CaseExplorer />','',
 '## What changes with the lens?','',
 'The actors remain, but the questions, evidence needs, rules, goals and outcomes change. A system diagnosis becomes useful when perspectives are connected to falsifiable intervention hypotheses.','',
 'See the [field guide](/docs/system-canvas-field-guide/) and [validation protocol](/research/system-canvas-validation-protocol/).',''
].join('\n'));
json(path.join(target,'src/data/header.json'),x=>({...x,logoAlt:'Enterprise Canvas',showVersionNumber:false,topbarLinks:[{name:'GitHub',path:'https://github.com/phibkro/systems-canvas'}]}));
json(path.join(target,'src/data/footer.json'),x=>({...x,links:[{name:'Framework',path:'/docs/enterprise-agency-modeling/'},{name:'Enterprise Model',path:'/docs/enterprise-model/'},{name:'Game Model',path:'/docs/game-model/'},{name:'Human Viable Systems',path:'/docs/human-viable-systems/'},{name:'Source',path:'https://github.com/phibkro/systems-canvas'}],socials:[{icon:'social/github',link:'https://github.com/phibkro/systems-canvas'}],footerText:'Enterprise Canvas · Enterprise & Agency Modeling · Human Viable Systems research.'}));
json(path.join(target,'src/data/seo.json'),x=>({...x,siteName:'Enterprise Canvas',url:'https://systems-canvas.phibkro.org',description:'Enterprise and game models for explaining how human and AI agents organize, interact and produce outcomes.',titleFormat:'{title} | System Canvas'}));
json(path.join(target,'src/data/sidebar.json'),x=>({...x,homeLabel:'Overview',navGroups:[{name:'Model',collapsed:false},{name:'Explore',collapsed:false},{name:'Learn',collapsed:false},{name:'Foundations',collapsed:false},{name:'Research',collapsed:false}]}));
json(path.join(target,'src/data/announcementBar.json'),x=>({...x,enabled:false}));
json(path.join(target,'src/data/pageTools.json'),x=>({...x,repositoryUrl:'https://github.com/phibkro/systems-canvas/tree/main',feedback:{...x.feedback,enabled:false}}));
json(path.join(target,'src/data/theme.json'),x=>({...x,defaultTheme:'dark',theme:{...x.theme,accentLight:'#0f766e',accentDark:'#8be0c0'}}));
modify(path.join(target,'astro.config.mjs'),x=>x.replace('https://glamorous-boar.cloudvent.net','https://systems-canvas.phibkro.org'));
write(path.join(target,'src/content/pages/index.md'),[
 '---','title: "Enterprise Canvas · Enterprise & Agency Modeling"',
 'description: "Enterprise and game models for understanding how human and AI agents organize, interact and produce outcomes."',
 'pageSections:',
 '  - _component: page-sections/heroes/hero-center',
 '    sectionLabel: Enterprise & Agency Modeling',
 '    eyebrow: Enterprise Canvas · Part of Human Viable Systems research',
 '    eyebrowShowDot: true',
 '    heading: "Understand enterprises. <span class=\\"highlight\\">Explain behavior.</span>"',
 '    headingLevel: h1',
 '    subtext: "Model how people, institutions and AI agents organize and interact. Combine enterprise and game models to analyze structures, incentives and outcomes, then evaluate and test possible changes."',
 '    alignmentHorizontal: start',
 '    buttonSections:',
 '      - _component: building-blocks/core-elements/button',
 '        text: Explore Enterprise Canvas',
 '        link: /canvas/',
 '        variant: primary',
 '        size: md',
 '        iconName: arrow-right',
 '        iconPosition: after',
 '      - _component: building-blocks/core-elements/button',
 '        text: Discover the models',
 '        link: /docs/enterprise-agency-modeling/',
 '        variant: secondary',
 '        size: md',
 '    maxContentWidth: 2xl',
 '    paddingHorizontal: none',
 '    paddingVertical: lg',
 '    colorScheme: inherit',
 '    lockColorScheme: false',
 '    backgroundColor: base',
 '---',''
].join('\n'));
const logo='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 48"><path d="M9 24 24 9 39 24 24 39Z" stroke="#7bd9b8" stroke-width="3" fill="none"/><circle cx="24" cy="24" r="5" fill="#7bd9b8"/><text x="51" y="31" font-family="Arial,sans-serif" font-size="21" font-weight="700" fill="#7bd9b8">Enterprise Canvas</text></svg>';
for(const f of ['logo-light.svg','logo-dark.svg'])write(path.join(target,'src/assets/images/logo',f),logo);
console.log('Overlay prepared: '+entries.length+' documents, 1 interactive case.');
