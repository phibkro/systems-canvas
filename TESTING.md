# System Canvas interaction tests

The Explore pages use a small, immutable **TypeScript + Valibot reducer + dispatch** pattern, not a full statechart framework. The browser module is bundled with esbuild, and component configurations are parsed at the mount boundary.

- Pure domain state: [`site/system-canvas-state.ts`](site/system-canvas-state.ts)
- DOM adapter: [`site/system-canvas-interactions.js`](site/system-canvas-interactions.js)
- Astro integration: [`scripts/prepare-stratus.mjs`](scripts/prepare-stratus.mjs) adds the controller to the Stratus base layout.

## Why this design?

Astro's `ClientRouter` can replace the DOM when navigating between pages. Attaching one-time click handlers to individual buttons left newly mounted buttons inert. The new controller uses **document-level event delegation** and `astro:page-load` reconciliation. Each component exposes data and holds its own normalized state.

The reducer defines explicit transitions for three components:

| Component | Legal transitions |
|---|---|
| Spatial model | Select known view; open/close intervention overlay; select known lever only while overlay open |
| Journalism explorer | Select an existing lens or intervention |
| Worksheet | Select lens, edit known answer, edit active lens note, reset to example or blank |

Invalid IDs, noninteger indices and unsupported events are no-ops. The runtime `assertValid` guard prevents dispatch from committing malformed states. This is runtime validation rather than a compile-time TypeScript proof.

## Tests

```sh
npm install
npm test                # Vitest, fixed examples + fast-check properties and fuzzing
npm run test:property   # Focus just on the property suite
npm run test:mutation   # Stryker mutation tests (about one minute in CI)
```

**What is checked:** randomized action sequences (160 per component, up to 80 actions each); no mutation of previous states; correct response to invalid indices; impossible leverage combinations; no loss of lens-scoped notes; reset and restore; deliberately invalid or missing field data; invalid state and action values. fast-check seeds/shrinking make failing sequences reproducible.

**What is *not* established:** domain-level analytical correctness, persistent drafts across navigation, accessibility conformance, or real-world intervention outcomes. Those need separate studies.

### Mutation results (2026-11-01)

| Measure | First baseline | After adversarial-state tests |
|---|---:|---:|
| Mutation score | 68.82% | **91.03%** |
| Mutants killed | 192 | **274** |
| Survived | 77 | **26** |
| No coverage | 10 | **1** |

Evidence: [GitHub Actions run 41273851075](https://github.com/phibkro/systems-canvas/actions/runs/41273851075) (baseline) and [run 41274091316](https://github.com/phibkro/systems-canvas/actions/runs/41274091316) (improved). The improved run attached an HTML mutation report. Current minimum mutation threshold is 85%.

The current Valibot TypeScript migration passed **22 Vitest tests** (including fast-check randomized actions and configuration/serialization guards). Its Stryker score is **86.07%**: **241 killed, 38 survived, 1 uncovered**, clearing the configured 85% minimum. The previous JavaScript reducer had 91.03%; the scores are not directly comparable because the schema-based implementation has different mutation opportunities. See [Valibot baseline run 41274707764](https://github.com/phibkro/systems-canvas/actions/runs/41274707764).

GitHub Actions runs inexpensive property and TypeScript checks on pushes, and mutation checks are available through `workflow_dispatch` to control CI cost.

### Browser-level regression checks

Cloudflare browser rendering verified Canvas → Journalism → Back → change lens; Journalism → Canvas → Back → change lens; and 200 deterministic randomized spatial-model interactions. These complement pure reducer tests because Astro page swaps are a browser lifecycle concern.

When adding a new state or action: add a reducer variant, test both valid and invalid transitions, update its rendered projection, then exercise navigation away and back. Keep the SVG and page layout derived from state rather than acting as the source of truth.
