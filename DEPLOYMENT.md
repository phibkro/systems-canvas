# Deployment: System Canvas (Stratus + Cloudflare Pages)

The Cloudflare Pages project **systems-canvas** is connected to the GitHub repository **phibkro/systems-canvas** and publishes **systems-canvas.phibkro.org**.

## Production settings

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `.stratus-build/dist` |
| Root directory | `/` |
| Build environment | Node 24.18.0 (`NODE_VERSION` in Pages project configuration) |
| Production branch | `main` |
| DNS | CNAME `systems-canvas.phibkro.org` → `systems-canvas.pages.dev` |

The earlier VitePress and custom Astro configurations are superseded. **Do not change output back to `dist` or `.vitepress/dist`.**

## What the build does

1. `scripts/build-stratus.sh` checks out [Stratus](https://github.com/CloudCannon/stratus-astro-documentation-template) at commit `371843802d4c38ad08a7267ddbf33ee1e0632c96` into `.stratus-build`.
2. `scripts/prepare-stratus.mjs` copies the Markdown corpus as Stratus MDX content collection entries, repairs internal links, adds the interactive case, and configures branding/SEO.
3. Stratus installs dependencies from its lockfile and runs its own production build with its Pagefind search-index step.
4. Cloudflare Pages publishes `.stratus-build/dist` automatically on pushes to `main`.

This design minimizes maintenance but requires GitHub access to the pinned upstream template during builds. An alternative later is vendoring or mirroring Stratus into the repository.

## Validation

Cloudflare production build for `72b865b` passed on 2026-11-01. It generated documentation routes and indexed the static site with Pagefind. Browser Rendering verified the homepage, course, research thesis and interactive journalism page after deployment.

For future verification:

- Run `npm run build` locally; the script requires `git` and Node.js.
- Inspect [Cloudflare dashboard](https://dash.cloudflare.com/) → Workers & Pages → systems-canvas → Deployments for failures.
- Check `/`, `/docs/system-canvas-course/`, `/research/system-canvas-research-thesis/`, and `/cases/journalism/`.
- Test search, tab switching, accessibility and mobile layout in a browser.

## Attribution

Stratus is developed by CloudCannon and distributed under the MIT license. See [upstream license](https://github.com/CloudCannon/stratus-astro-documentation-template/blob/main/LICENSE).
