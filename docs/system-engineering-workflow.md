# Systems Analysis and Engineering Workflow

**A proposed operating method connecting descriptive system analysis to design and validation.** It adds engineering artifacts without requiring every problem to become a formal simulation or an exhaustive specification.

## Two entry paths, one learning cycle

| Existing system: analysis | Proposed system: engineering |
|---|---|
| Observe an outcome and affected parties | Specify intended outcomes and beneficiaries |
| Select boundary, time, perspective and evidence | Select scope, stakeholders, environment and constraints |
| Model relevant structure, games and dynamics | Allocate capabilities, interfaces, rules and regulators |
| Diagnose mechanism and rival explanations | Specify mechanism, design alternatives and assumptions |
| Evaluate observed performance and harms | Define acceptance criteria, invariants and assurance |
| Propose and test interventions | Prototype, implement, verify, validate and monitor |

Both paths iterate through **observe → compare → revise**. Requirements and models are hypotheses about a design's fitness until evidence is gathered. A model describes a target or observed system, whereas a **view** serves an audience's concern. Procedures operate on models; theories explain or constrain them; evaluation uses explicit criteria.

## Minimal analysis protocol

1. **Frame:** What problem, boundary, affected parties, time horizon and purpose of inquiry?
2. **Represent:** Which entities, resources, processes, observations, rules and relations are necessary?
3. **Classify:** Which [system facets](/docs/system-ontology-and-taxonomy/) are evidenced at the chosen scale? Mark unknowns.
4. **Explain:** Propose a reproducing mechanism; include strategic interaction, regulation, adaptation or emergence **only if needed**.
5. **Evaluate:** Compare actual effects against *declared* criteria; identify distribution and downstream effects.
6. **Intervene/learn:** State accountable actor, authorized lever, mechanism, expected effects, risks, baseline, monitoring and revision rights.

## Minimal engineering artifacts

| Artifact | Required content |
|---|---|
| Design brief | Purpose, stakeholders, environment, chosen boundary and alternatives |
| Requirements | Desired behavior, nonfunctional qualities, constraints and affected parties |
| Invariants/safeguards | Conditions not to violate; distinguish hard constraints from tradeable objectives |
| System architecture | Elements, interfaces, dependencies, authority and responsibility allocations |
| Mechanism specification | Why proposed processes, controls or incentives should generate outcomes |
| Evidence plan | Verification tests, validation observations, assumptions, counterexamples and stop conditions |
| Intervention record | Implementing authority, consent/appeal route, reversibility and monitoring |
| Revision protocol | Who may challenge, amend or withdraw mechanisms and requirements |

This is compatible in spirit with ISO/IEC/IEEE 15288 lifecycle engineering, but is **not** an ISO process implementation or compliance claim.

## Worked analytical and design comparison

**Situation (hypothetical):** a university suspects a high-stakes assessment format encourages short-term grade optimization at the expense of durable learning.

**Analyze:** map course administration and feedback; distinguish observed assessment outcomes from claimed learning; ask which actions students/instructors can take and who sets assessment rules. Record competing hypotheses: assessment design, instructional resources, prior preparation, workload or course difficulty.

**Design A — continuous assessment:** change timing and frequency of feedback. Requirements might include timely feedback, measurable learning, manageable workload and accessibility. Risk: more continuous pressure or administrative burden.

**Design B — participatory rule revision:** establish a documented mechanism for students and instructors to propose, contest and review assessment changes. Specify representation, decision authority, accountability, appeals and constitutional constraints. Risk: procedural capture, unequal participation or delay.

**Evaluate:** compare learning indicators, costs, experience, equity and gaming of metrics; seek counterfactual or baseline evidence, monitor harms, and record who can revise the experiment. No outcome is asserted without empirical testing.

## Cross-cutting human viability

[Human Viable Systems](/docs/human-viable-systems/) is an **optional explicit normative evaluation layer**, not implied by describing the system. Candidate criteria include meaningful human agency, volitional autonomy, competence, connection, procedural recourse, equity, safety and ecological sustainability. Some may be noncompensatory minimum protections rather than weights in an aggregate optimization function. AI agents can be delegated different levels of agency, autonomy, persistence and authority without assuming human welfare interests.

## Do not overclaim

- A diagram does not establish causation.
- Formal authority does not establish effective access, legitimacy or compliance in practice.
- Technical capability is not permission.
- Adaptation is not necessarily beneficial.
- A validated technical component does not validate a sociotechnical institution.
- A model of agents does not require every system element to have intentions.
- Design and evaluation claims should link to provenance, uncertainty, rival explanations and explicit boundary decisions.

Use the [practitioner field guide](/docs/system-canvas-field-guide/) to facilitate a case and [research validation protocol](/research/system-canvas-validation-protocol/) to assess whether the approach improves real diagnoses.
