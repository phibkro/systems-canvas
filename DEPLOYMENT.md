# Publish System Canvas on Cloudflare Pages

The repository includes a VitePress site with Mermaid diagrams and built-in local search.

## Cloudflare Pages: Git integration

1. Open [Cloudflare dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Authorize GitHub and choose **phibkro/systems-canvas**; production branch **main**.
3. Configure build:
   - **Framework preset:** None (or VitePress if available)
   - **Build command:** `npm run docs:build`
   - **Build output directory:** `.vitepress/dist`
   - **Root directory:** repository root
   - **Node.js:** 20 or 22 (set `NODE_VERSION=22` if the build environment requires it).
4. Deploy and confirm the generated `*.pages.dev` site works.
5. In the Pages project's **Custom domains**, add **systems-canvas.phibkro.org**. If the `phibkro.org` DNS zone is managed by the same Cloudflare account, Cloudflare can typically provision the DNS record and certificate. Otherwise follow its displayed DNS instructions.
6. Test navigation, Mermaid diagrams, search and mobile layout. Future commits to `main` should trigger automatic builds.

## Local preview

```sh
npm install
npm run docs:dev
npm run docs:build
```

## Troubleshooting

- Build errors: inspect Pages deployment logs and check Node version.
- Custom domain not active: verify DNS ownership, CNAME and TLS status in Cloudflare.
- Mermaid errors: check the Markdown `mermaid` fenced code syntax.
- Broken links: run a production build; VitePress validates internal links.

The project does **not** require a Cloudflare API token in GitHub if using Cloudflare Pages' native Git integration.
