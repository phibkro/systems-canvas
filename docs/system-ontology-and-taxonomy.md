# Shared System Ontology and Analytical Taxonomy

**Proposed metamodel v0.1 · provisional, not a formally validated ontology.** This is the semantic foundation shared by [Enterprise Models](/docs/enterprise-model/), [Institutional Game Models](/docs/game-model/), and the [Dynamic/Cybernetic Model](/docs/dynamic-cybernetic-model/). [Human Viable Systems](/docs/human-viable-systems/) provides one explicitly normative evaluation program.

## Four distinct levels

1. **Ontology:** What may be represented: entities, boundaries, events, relationships, claims.
2. **Taxonomy:** How a specified system *at a specified scale and time* may be characterized.
3. **Theories and models:** Which explanatory assumptions and mechanisms are relevant; enterprise, strategic interaction, and dynamics are complementary, not exclusive ontologies.
4. **Views, procedures and evaluation:** Stakeholder-oriented projections; analysis/engineering activities; declared normative or empirical criteria.

Do not turn the six existing **Structural, Behavioral, Epistemic, Deontic, Teleological and Evaluative views** into six incompatible datasets. Views project the same identities and assertions.

## Core semantic concepts

| Concept | Working definition | Boundary condition |
|---|---|---|
| Entity | Distinguishable subject of an inquiry | Not necessarily material or an agent |
| System | Contextually delimited interacting entities/processes | The boundary is selected for a purpose, not automatically discovered |
| Boundary | Inclusion/exclusion/interface decision for a specified question | Can overlap, nest and change |
| Relation | Typed association among entities | An arrow is not evidence of causality |
| Process | Pattern of activity/transformation through time | Not always goal-directed |
| State | Relevant configuration of properties at a time | Partial and observer-relative |
| Event | Occurrence that may alter a state | May be external or internal |
| Resource | Something employed, exchanged, depleted or maintained | Material and intangible resources differ |
| Capability | Contextual capacity to produce an effect | Capability does not confer permission |
| Constraint | Restriction on actions or possible states | Natural, technical and institutional constraints differ |
| Mechanism | Hypothesized or established account of how an outcome is produced | Mark evidence and rival explanations |
| Observation | Record or measurement about an entity/process | Observer, instrument, provenance and uncertainty matter |
| Objective | Desired condition *attributed to a specific actor/designer* | Do not anthropomorphize all systems |
| Outcome | Actual, intended or predicted consequence | Tag which status applies |
| Actor | Participant occupying a role in an action situation | Actor role ≠ agent capability |
| Agent | Entity modeled as able to select/initiate actions toward objectives | May be human, artificial, organizational or theoretical |
| Rule | Prescription, permission, prohibition or procedure shaping actions | Written policy ≠ rule-in-use |
| Authority | Institutionally recognized decision right | Authority ≠ capability, power or legitimacy |
| Claim | Contextual assertion about the model or real-world system | Must be distinguished from observed fact |

Treat a **model itself as an entity**, so observers, models, metrics, interventions, and governing processes can be included inside the inquiry. An actor may belong to one enterprise while participating in multiple institutional games. Rules may be revised by other rules and action situations.

### Canonical relation vocabulary (provisional)

`participates_in`, `part_of`, `depends_on`, `exchanges_with`, `observes`, `models`, `influences`, `regulates`, `authorizes`, `constrains`, `enforces`, `contests`, `revises`, `produces`, `affects`.

Relations require **source, target, context, temporal scope and confidence/evidence status**; `part_of` must not be conflated with `participates_in`, and `authorizes` must not be conflated with `can_perform`. Typed domains/ranges and formally testable semantics remain future work.

## Agency and autonomy: independent questions

**Agency** is the capacity to initiate or direct consequential action toward objectives; **autonomy** concerns discretion or self-determination over actions and objectives. In institutional analysis, distinguish *granted discretion* from *exercised self-governance*. Under the latter definition autonomy normally presupposes some agency; a simplistic fully independent binary matrix is misleading.

Record an actor's **situated profile** instead of a universal agency score:

| Dimension | Question |
|---|---|
| Capability | What effects can this actor produce? |
| Agency | Which consequential actions can it initiate or direct? |
| Autonomy | How independently can it choose actions and objectives? |
| Authority | Which decisions does it legitimately have a right to make? |
| Resources | Which material, temporal, informational and social means are actually available? |
| Knowledge | What can it observe, understand and verify? |
| Adaptability | How can its behavior or model change? |

**Unit of assessment:** `actor × action situation × capability/action × constraints × time`. Record *formally granted*, *practically accessible*, and *actually exercised* rights/capabilities separately. Distinguish operational discretion, objective-setting authority and institutional rule-revision authority.

A persistent AI agent can have narrow authority; a short-lived tool-calling agent can make discretionary decisions; a durable workflow can be entirely prescribed. Persistence, learning, tool access, agency, autonomy and governance rights are not synonyms. Human welfare and moral status must not be inferred for AI from computational agency.

## Orthogonal analytical dimensions

These dimensions are **facets**, not exclusive subclasses, an ordinal ladder, or a validated scoring instrument. A system may have several values per facet, varying by subsystem, spatial scale or time.

| Facet | Initial values / probing questions |
|---|---|
| Substrate | Physical, biological, computational, social, hybrid |
| Boundary configuration | Open, isolated approximation, networked, nested, overlapping; what crosses it? |
| Dynamics | Static approximation, reactive, stateful, adaptive, evolving; what changes and on what time scale? |
| Control architecture | Centralized, hierarchical, distributed, polycentric; who regulates which variables? |
| Agency configuration | Non-agentic, delegated agents, multi-agent; what choices are meaningful? |
| Autonomy distribution | Externally directed, constrained, self-directed; **for whom and over what?** |
| Reflexivity | Behavioral, epistemic, institutional; what behavior, model or rule becomes revisable? |
| Coordination | Prescribed, cooperative, competitive, mixed; where is strategic interdependence? |
| Governance | External, participatory, self-governing; who sets, contests and changes rules? |

**Reflexivity is not equivalent to second-order cybernetics.** Second-order cybernetics investigates the observer as part of the observed/control relation; participant rule-revision is one *possible institutional application*, not its definition. Similarly a first-order control system may already include multiple human or distributed regulators.

### Reusable archetypes, not a single type field

Feedback-regulated; self-adaptive; complex adaptive; multi-agent; institutional; reflexively governed; sociotechnical; system of systems. These labels can overlap and require a documented rationale. Adaptation is not inherently improvement; stability or viability does not establish legitimacy or human benefit.

## Evidence-aware assertion contract

A minimal *conceptual* assertion (not a shipped executable schema):

```json
{
  "subject": "students",
  "predicate": "can_contest",
  "object": "assessment_rules",
  "context": {"situation": "university_assessment", "boundary": "department", "time": "2026"},
  "claimKind": "descriptive",
  "epistemicStatus": "hypothesis",
  "provenance": [],
  "uncertainty": "not yet verified in practice"
}
```

Allow `claimKind`: descriptive / explanatory / predictive / normative / prescriptive. Distinguish observation, source-supported report, hypothesis and unknown; record contested interpretations and contrary evidence. Rule authority, goal attribution and claims about causality must be evidence-aware.

**Avoid false rigor:** numbers assigned to autonomy, viability or power are illustrative unless their operationalization, measurement quality and uncertainty are specified.

## Composition and scope

- An entity can participate in multiple systems, games, organizations and governance processes without losing its identity.
- Boundary selection, perspective, scale, timespan and analyst belong to every investigation.
- Systems may be described without any goals or agents; agentic and institutional constructs are optional escalations.
- Physical, software, institutional and knowledge boundaries can overlap; engineering requirements are often cross-disciplinary.
- The model is selective and revisable. Formal category-theoretic or game-theoretic interpretations are optional specializations, never assumed by the vocabulary.

## Sources and methodological neighbors

This is a synthesis, not a new claim about empirical system laws. Relevant foundations: ISO/IEC/IEEE 15288 (system lifecycle processes); INCOSE Systems Engineering Handbook; Checkland's Soft Systems Methodology; Ostrom's IAD; Beer/Espejo organizational cybernetics; 4EM/EKD; ArchiMate; second-order cybernetics; feedback-control and self-adaptive software engineering. Specific interpretations, comparisons and evidence gaps should be tracked in the [research thesis](/research/system-canvas-research-thesis/) and [validation protocol](/research/system-canvas-validation-protocol/).

Continue with the [engineering workflow](/docs/system-engineering-workflow/) or [dynamic model](/docs/dynamic-cybernetic-model/).
