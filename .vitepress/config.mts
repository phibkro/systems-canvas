import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'System Canvas',
  description: 'An open research and practice framework for systems diagnosis and redesign',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#1d655c' }],
    ['meta', { property: 'og:title', content: 'System Canvas' }],
    ['meta', { property: 'og:description', content: 'Research, practice, and education for systems diagnosis and redesign' }]
  ],
  themeConfig: {
    siteTitle: 'System Canvas',
    nav: [
      { text: 'Overview', link: '/' },
      { text: 'Course', link: '/docs/system-canvas-course' },
      { text: 'Field Guide', link: '/docs/system-canvas-field-guide' },
      { text: 'Research', link: '/research/system-canvas-research-thesis' },
      { text: 'GitHub', link: 'https://github.com/phibkro/systems-canvas' }
    ],
    sidebar: [
      { text: 'Introduction', items: [{ text: 'Start here', link: '/' }, { text: 'Core thesis', link: '/docs/system-canvas-core' }] },
      { text: 'Learn & apply', items: [
        { text: 'Course', link: '/docs/system-canvas-course' },
        { text: 'Field guide', link: '/docs/system-canvas-field-guide' },
        { text: 'Analytical cases', link: '/docs/system-canvas-analytical-cases' }
      ] },
      { text: 'Research', items: [
        { text: 'Research thesis', link: '/research/system-canvas-research-thesis' },
        { text: 'Validation protocol', link: '/research/system-canvas-validation-protocol' },
        { text: 'Expert collaboration', link: '/research/system-canvas-expert-brief' },
        { text: 'Insight register', link: '/research/system-canvas-insight-register' }
      ] }
    ],
    search: { provider: 'local' },
    editLink: { pattern: 'https://github.com/phibkro/systems-canvas/edit/main/:path', text: 'Improve this page on GitHub' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/phibkro/systems-canvas' }],
    footer: { message: 'Open research in progress. Hypotheses and illustrative cases are not validated findings.' }
  },
  mermaid: { theme: 'default' }
}))
