# System Canvas

A provisional, open **systems diagnosis and redesign** method connecting structural, behavioral, epistemic, deontic, teleological and evaluative analysis to testable interventions.

**Website:** https://systems-canvas.phibkro.org  
**Interactive case:** https://systems-canvas.phibkro.org/cases/journalism/

## Documents

| Resource | Source |
|---|---|
| Core thesis | [docs/system-canvas-core.md](docs/system-canvas-core.md) |
| Learning course | [docs/system-canvas-course.md](docs/system-canvas-course.md) |
| Practitioner field guide | [docs/system-canvas-field-guide.md](docs/system-canvas-field-guide.md) |
| Analytical cases | [docs/system-canvas-analytical-cases.md](docs/system-canvas-analytical-cases.md) |
| Research thesis | [research/system-canvas-research-thesis.md](research/system-canvas-research-thesis.md) |
| Validation protocol | [research/system-canvas-validation-protocol.md](research/system-canvas-validation-protocol.md) |
| Expert brief | [research/system-canvas-expert-brief.md](research/system-canvas-expert-brief.md) |
| Insight register | [research/system-canvas-insight-register.md](research/system-canvas-insight-register.md) |

## Website architecture

The production website now uses the **[Stratus](https://github.com/CloudCannon/stratus-astro-documentation-template)** Astro documentation starter (MIT licensed). Builds checkout a **pinned upstream commit** into `.stratus-build`; `scripts/prepare-stratus.mjs` overlays this repository's source Markdown, branding and interactive six-perspective Astro component. This intentionally preserves the documents as the canonical source, with reproducible template builds. Stratus's generated application is not checked into this repository.

The template already supplies MDX, Mermaid, Pagefind search, sidebar navigation, print layouts, sitemap, AI-readable Markdown and `llms.txt`. See [integration decisions](INTEGRATIONS.md).

To build locally (Node 24.18 or compatible version):

```bash
npm run build
cd .stratus-build
npm run preview
```

See [deployment instructions](DEPLOYMENT.md) for Cloudflare Pages.

## Research status

System Canvas is a **proposed integration**, not an empirically validated new theory. Teaching cases are illustrative; actual results require source evidence, baseline comparison and evaluation. Scientific, practical and educational tracks develop in parallel.
