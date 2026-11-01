import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(), target=path.join(root,'.stratus-build'), docsDir=path.join(target,'src/content/docs');
const write=(file,content)=>{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,content);};
const modify=(file,fn)=>write(file,fn(fs.readFileSync(file,'utf8')));
const json=(file,fn)=>modify(file,src=>JSON.stringify(fn(JSON.parse(src)),null,2)+'\n');
fs.rmSync(docsDir,{recursive:true,force:true});
const entries=[
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
 body=body.replace(/\]\((?:\.\.\/)?(?:docs\/|research\/)?(system-canvas-[\w-]+)\.md\)/g,(_,name)=>{
  const found=entries.find(e=>path.basename(e[0],'.md')===name);
  return '](/'+(found?.[0].startsWith('research/')?'research':'docs')+'/'+name+'/)';
 });
 write(path.join(docsDir,input.replace(/\.md$/,'.mdx')),
  '---\ntitle: '+JSON.stringify(title)+'\ndescription: '+JSON.stringify('System Canvas · '+title)+'\ngroup: '+JSON.stringify(group)+'\norder: '+order+'\n---\n\n'+body);
}
write(path.join(target,'src/components/custom/CaseExplorer.astro'),fs.readFileSync(path.join(root,'site/CaseExplorer.astro'),'utf8'));
write(path.join(target,'src/components/custom/DiagnosticCanvas.astro'),fs.readFileSync(path.join(root,'site/DiagnosticCanvas.astro'),'utf8'));
write(path.join(docsDir,'canvas/index.mdx'),[
 '---',
 'title: "Diagnostic canvas prototype"',
 'description: "A problem-led, editable one-page worksheet with selective deeper analytical views."',
 'group: "Explore"',
 'order: 1',
 '---','',
 "import DiagnosticCanvas from '../../../components/custom/DiagnosticCanvas.astro';",'',
 '# Start with a problem, not a theory','',
 'This **experimental prototype** translates the practitioner field guide into a single worksheet. Fill six simple prompts, open a deeper view only when necessary, and export your work. It does **not** store your content on a server. Edits remain in the current browser tab until exported.','',
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
 '# One system, six analytical views','',
 'A teaching scenario about journalists, distribution platforms and audiences. The relationships are **illustrative**, not established claims about a particular platform.','',
 '<CaseExplorer />','',
 '## What changes with the lens?','',
 'The actors remain, but the questions, evidence needs, rules, goals and outcomes change. A system diagnosis becomes useful when perspectives are connected to falsifiable intervention hypotheses.','',
 'See the [field guide](/docs/system-canvas-field-guide/) and [validation protocol](/research/system-canvas-validation-protocol/).',''
].join('\n'));
json(path.join(target,'src/data/header.json'),x=>({...x,logoAlt:'System Canvas',showVersionNumber:false,topbarLinks:[{name:'GitHub',path:'https://github.com/phibkro/systems-canvas'}]}));
json(path.join(target,'src/data/footer.json'),x=>({...x,links:[{name:'Course',path:'/docs/system-canvas-course/'},{name:'Research',path:'/research/system-canvas-research-thesis/'},{name:'Source',path:'https://github.com/phibkro/systems-canvas'}],socials:[{icon:'social/github',link:'https://github.com/phibkro/systems-canvas'}],footerText:'System Canvas · An open, provisional research program.'}));
json(path.join(target,'src/data/seo.json'),x=>({...x,siteName:'System Canvas',url:'https://systems-canvas.phibkro.org',description:'An open framework for understanding, diagnosing, and redesigning complex systems.',titleFormat:'{title} | System Canvas'}));
json(path.join(target,'src/data/sidebar.json'),x=>({...x,homeLabel:'Overview',navGroups:[{name:'Explore',collapsed:false},{name:'Learn',collapsed:false},{name:'Foundations',collapsed:false},{name:'Research',collapsed:false}]}));
json(path.join(target,'src/data/announcementBar.json'),x=>({...x,enabled:false}));
json(path.join(target,'src/data/pageTools.json'),x=>({...x,repositoryUrl:'https://github.com/phibkro/systems-canvas/tree/main',feedback:{...x.feedback,enabled:false}}));
json(path.join(target,'src/data/theme.json'),x=>({...x,defaultTheme:'dark',theme:{...x.theme,accentLight:'#0f766e',accentDark:'#8be0c0'}}));
modify(path.join(target,'astro.config.mjs'),x=>x.replace('https://glamorous-boar.cloudvent.net','https://systems-canvas.phibkro.org'));
write(path.join(target,'src/content/pages/index.md'),[
 '---','title: "System Canvas"',
 'description: "An open research, teaching and practice method for systems diagnosis and redesign."',
 'pageSections:',
 '  - _component: page-sections/heroes/hero-center',
 '    sectionLabel: Introduction',
 '    eyebrow: Open research · Method under development',
 '    eyebrowShowDot: true',
 '    heading: "Understand systems. <span class=\\"highlight\\">Redesign mechanisms.</span>"',
 '    headingLevel: h1',
 '    subtext: "A teachable framework for explaining persistent outcomes and designing testable interventions."',
 '    alignmentHorizontal: start',
 '    buttonSections:',
 '      - _component: building-blocks/core-elements/button',
 '        text: Try the diagnostic canvas',
 '        link: /canvas/',
 '        variant: primary',
 '        size: md',
 '        iconName: arrow-right',
 '        iconPosition: after',
 '      - _component: building-blocks/core-elements/button',
 '        text: Start the course',
 '        link: /docs/system-canvas-course/',
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
const logo='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 48"><path d="M9 24 24 9 39 24 24 39Z" stroke="#7bd9b8" stroke-width="3" fill="none"/><circle cx="24" cy="24" r="5" fill="#7bd9b8"/><text x="51" y="31" font-family="Arial,sans-serif" font-size="21" font-weight="700" fill="#7bd9b8">System Canvas</text></svg>';
for(const f of ['logo-light.svg','logo-dark.svg'])write(path.join(target,'src/assets/images/logo',f),logo);
console.log('Overlay prepared: '+entries.length+' documents, 1 interactive case.');
