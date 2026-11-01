import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://systems-canvas.phibkro.org',
  output: 'static',
  integrations: [mdx(), react()],
  markdown: { syntaxHighlight: 'shiki', shikiConfig: { theme: 'github-dark' } }
});
