# Publish System Canvas on Cloudflare Pages

## Current implementation

The site currently uses **Astro 5, MDX and React**. The Stratus documentation starter is the selected design target; its full source has not yet been incorporated. The interactive journalism case and Markdown document renderer work with Astro independently of the template.

## Cloudflare Pages — settings to fix the failed build

- Repository: `phibkro/systems-canvas`
- Production branch: `main`
- Framework: **Astro** (or None)
- **Build command: `npm run build`**
- **Build output: `dist`**
- Root: repository root
- Node: **22** (see `.nvmrc`)

**Previous VitePress values (`npm run docs:build` and `.vitepress/dist`) are no longer valid.** Update the Cloudflare Pages settings, then retry.

After a successful `pages.dev` preview, add `systems-canvas.phibkro.org` under the Pages project's Custom Domains. If domain DNS is managed in the same Cloudflare account, follow the automatic DNS and certificate setup.

## Verify before publishing

```sh
npm install
npm run build
npm run preview
```

Also check the GitHub Actions `site-build` workflow, which tests the production build on every commit. The Cloudflare build log remains the authoritative record of its actual failure.

## Stratus adoption

Stratus upstream: https://github.com/CloudCannon/stratus-astro-documentation-template (MIT licensed).

Stratus already provides:
- MDX and Mermaid
- Grouped documentation and sidebars
- Pagefind search, table of contents, print and PDF views
- A broad component catalog and CloudCannon editing support

For a clean migration, adopt Stratus **as the application foundation** and port the existing project documents, interactive CaseExplorer and custom domain. Avoid pasting Stratus components into the current homegrown layout ad hoc. Stratus content must be `.mdx` in `src/content/docs/` with `group` and `order` frontmatter, rather than the current `docs/*.md` routes. CloudCannon is optional for deployment to Cloudflare Pages.

The upstream template pins Node 24.18.0; verify that Cloudflare's build environment supports it before switching from the current Node 22 setup.

See: https://astro.build/themes/details/stratus/
