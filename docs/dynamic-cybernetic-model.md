# Dynamic and Cybernetic Model

**Proposed complementary model family · specification, not a shipped interactive simulator.**

The [Enterprise Model](/docs/enterprise-model/) asks how capabilities, operations and governance are organized. The [Game Model](/docs/game-model/) examines choices within action situations. The **Dynamic/Cybernetic Model** asks **how system state changes, is regulated, adapts and evolves**, whether or not intentional agents participate.

All three should project a [shared ontology](/docs/system-ontology-and-taxonomy/) and the existing six analytical views, not maintain separate actor identities.

## Minimum model

| Construct | Question |
|---|---|
| Boundary and environment | What crosses the system boundary? Which external disturbances matter? |
| State and variables | What can accumulate, vary or change; at which temporal resolution? |
| Events and transitions | What triggers or permits a transition? |
| Flows and delays | Which exchanges and lags matter? |
| Observations | Who/what senses state? With what error and delay? |
| Regulator/control policy | What responds to which deviation, and with which actuators? |
| Feedback | Are loops balancing/reinforcing, and are those signs substantiated? |
| Adaptation | Can the response policy, configuration, internal model or goals change? |
| Emergence | Which aggregate patterns may arise from interactions? |
| Evaluation | What performance, fragility, distributional or viability effects result? |

**Do not imply every system is adaptive or every feedback loop is intentional.** An event-driven script can be reactive without learning; a thermostat can regulate without deliberation; a multi-agent institution may be adaptive without a central controller.

## Three separate kinds of change

1. **Operational adjustment:** actions or parameters change within existing rules.
2. **Epistemic/model revision:** agents or regulators revise estimates, explanations, measures or objectives.
3. **Institutional revision:** authorized or de facto actors change rules, rights, decision procedures or governance.

These can co-occur. Ostrom's operational, collective-choice and constitutional-choice rule levels offer an established analysis of nested institutional decision-making; they are not a universal cybernetic hierarchy.

## Model selection: use only what is warranted

| Problem | Candidate representation | Epistemic caution |
|---|---|---|
| Discrete procedure | State machine or process model | Check hidden state and exceptional transitions |
| Stocks, rates, lags | Stock/flow or system dynamics | Units and calibration matter |
| Regulated variable | Feedback/control diagram | Identify sensor, controller, actuator, disturbance |
| Adaptive software | MAPE-K or policy/configuration change model | Separate adaptation from mere event handling |
| Strategic decisions | Institutional action situation or game | Specify actors, actions, information and incentives |
| Emergent coordination | Agent-based/network model | Simulation is not causal confirmation |
| Observer alters behavior | Reflexive observation/measurement model | Include analyst/metric selection and reactions |
| Rule revision | Nested governance/authority model | Distinguish formal permissions from rules-in-use |

## Reflexive modeling

An observer, metric, report or intervention can itself be an entity in the system, with `observes`, `models`, `influences`, `regulates`, `contests` and `revises` relations. Ask who chooses what is measured, who sees the results, whether measurement changes incentives, and how the regulator is held accountable.

Do not define second-order cybernetics simply as 'units regulate themselves': it specifically foregrounds the observing/knowing participant in circular systems of observation and control.

## Example: university assessment

- **Enterprise:** departments, teaching capacity, exams, grading services, administrators and students.
- **Game:** students and instructors respond to assessment incentives and informational asymmetries.
- **Dynamics:** delayed performance feedback, workload accumulation, learning over semesters, policy response, and possible gaming of indicators.
- **Governance:** instructors may change assignments; departments may change policies; students may have consultation or appeal rights. Verify actual rules-in-use.
- **Evaluation:** distinguish grades from learning, efficiency from human viability, and predicted effects from observed outcomes.

Intervention A, continuous assessment, primarily changes operational evaluation and feedback. Intervention B, participatory assessment design, changes collective-choice participation. Neither is automatically beneficial; test effects and unintended costs.

## Status and integration

This page introduces the dynamic model **conceptually**. No runtime state representation, simulator, new worksheet fields or interactive canvas controls are implemented in this revision. Build such capabilities only against explicit contracts, fixtures and falsifiable tests.

See [ontology and taxonomy](/docs/system-ontology-and-taxonomy/), [engineering workflow](/docs/system-engineering-workflow/), and [field guide](/docs/system-canvas-field-guide/).
