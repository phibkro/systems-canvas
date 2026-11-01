# Spatial canvas rendering experiment

**Status:** Prototype comparison; not a user study. Rendered D2 with D2 CLI v0.9.0 in GitHub Actions and compared with manually positioned SVGs.

| Model | D2 grid source | D2 render | Hand-positioned SVG |
| --- | --- | --- | --- |
| Six aspects | [six-aspect-grid.d2](six-aspect-grid.d2) | [D2 SVG](six-aspect-grid.svg) · [PNG](six-aspect-grid.png) | Standalone SVG in downloadable comparison bundle |
| Practitioner | [practitioner-grid.d2](practitioner-grid.d2) | [D2 SVG](practitioner-grid.svg) · [PNG](practitioner-grid.png) | Local comparison bundle (see conversation artifact) |

## Experiment

Both D2 grid definitions compiled with Dagre and retained their declared grid shape (3×3 for the six-aspect model, 4×3 for practitioner). The compiler generated 9 and 7 connection paths respectively. Under Dagre, connections among grid cells are simple center-to-center straight segments, not obstacle-aware routes. Source: https://d2lang.com/tour/grid-diagrams

The SVG alternatives position and route connections explicitly to distinguish enabling/production flow from governance and learning loops.

## Recommendation

Use a **hand-positioned SVG for the canonical teaching canvas**, where placement, labels and edge paths carry specific pedagogical meaning. Use **D2 grid for portable, readable, rapidly authored supporting models**, especially when strict control of feedback routing isn't essential. Consider testing D2 + TALA independently for complex connections before rejecting D2 wholesale.

This is a design hypothesis, not proof of user comprehension. The next validation should compare novice interpretations, visual traceability, edge crossings, and time required to update the model.
