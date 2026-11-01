# Astro Integration Review

**Decision: reuse Stratus's built-ins instead of adding duplicate plugins.** Reviewed on 2026-11-01 against Astro's integration directory and Stratus's documented features.

| Capability | Choice | Rationale |
|---|---|---|
| Markdown with embedded components | **Built-in Stratus `@astrojs/mdx`** | Required for interactive lessons and custom visuals |
| Mermaid and model diagrams | **Built-in Stratus Mermaid** | Existing integration handles common systems diagrams |
| Full-text documentation search | **Built-in Stratus Pagefind** | Static, privacy-friendly local index; avoid second search service |
| SEO / site discovery | **Built-in Stratus sitemap, JSON-LD, RSS, `llms.txt`** | Already implemented |
| Code fences / annotations | **Built-in Stratus Shiki/code components** | No need for `astro-expressive-code` yet |
| Interactive six-view systems model | **Custom Astro island** | Minimal JS, no React hydration dependency |
| Equation display | **Deferred: remark-math / rehype-katex** | Relevant once formal models and math-backed lessons are added |
| Scholarly bibliography/citations | **Deferred: rehype-citation or a managed bibliography workflow** | Needs verified citation sources and manuscript citation conventions first |
| Rich graph editing / dynamic edges | **Deferred: React Flow (`@xyflow/react`)** | Only justified once a real shared system-model schema and user editing workflow exist |
| User analytics | **Deferred** | Define privacy, consent and learning metrics before instrumenting users |
| Forms / feedback collection | **Deferred** | Decide research consent/data retention before enabling responses |

## Design principle

Content is canonical Markdown. Interactive views are *instruments* for teaching and analysis, never substitutes for textual explanations, evidence links, accessible tables, or falsifiable claims.

## Primary sources

- https://astro.build/themes/details/stratus/
- https://cloudcannon.com/templates/stratus/
- https://astro.build/integrations/
- https://docs.astro.build/en/guides/integrations-guide/mdx/
