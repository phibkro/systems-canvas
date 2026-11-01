# System Canvas

An open, provisional **practitioner method for analyzing, diagnosing, evaluating and refining human systems**. It makes established systems and organizational theory usable through problem-led procedures, progressive disclosure and evidence-aware diagrams.

**Website:** https://systems-canvas.phibkro.org  
**Interactive case:** https://systems-canvas.phibkro.org/cases/journalism/

## What System Canvas is for

**System Canvas translates established systems and organizational theory into accessible procedures for analyzing, diagnosing, evaluating and refining human systems.** Its primary audience is practitioners working with businesses, public institutions, civic governance, communities and other sociotechnical organizations.

| Practitioner capability | Question | Useful output |
|---|---|---|
| Analyze | What actors, boundaries, dependencies and rules matter? | A comprehensible system view |
| Diagnose | What mechanism reproduces the problem? | A falsifiable causal hypothesis |
| Evaluate | What works, for whom, and with what side effects? | An evidence-based assessment |
| Refine | What can we change, and how will we learn? | An accountable intervention and monitoring plan |

**Start with the problem, not the theory.** The [field guide](docs/system-canvas-field-guide.md) is usable without knowing VSM, IAD, open games or category theory. Six analytical lenses and deeper theoretical models are introduced when they improve the diagnosis, not as mandatory forms to complete.

The design ambition draws on the **approachability of Business Model Canvas, C4, 4EM and ArchiMate** while retaining analytical links to Beer’s VSM, Ostrom’s IAD, second-order cybernetics and organizational theory. This does not claim those established frameworks lack practical methods; the incremental claim is reduced learning and application cost **without a loss of diagnostic validity**.

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
