---
id: ABSTRACTION-PLAN
name: Abstraction and auditability planning
status: todo
milestone: icebox
flags: detail
date: 2026-08-26
grades: High / High / Medium / Low
order: 8
summary: investigate a read-only whole-repository planning function that turns evidence into a coverage-accounted programme of small, behaviour-preserving improvements, with appropriate abstraction and de-abstraction rules, staged waves, a pilot, and measurable validation. Candidate basis archived at self/inputs/2026-08-26-code-abstraction-prompt.txt.
---
# ABSTRACTION-PLAN — abstraction and auditability planning

> **Status:** Icebox — investigation, unblocked (LAB-FIRST gates
> the pick, not the filing). **Grades:** provisional at intake
> (2026-08-26): High / High / Medium / Low.

## Intent

Whether pm-skills should offer a read-only function that turns
whole-repository evidence into a safe programme for improving code:
clearer boundaries, stronger auditability, appropriate reuse, and
small reversible refactoring waves. Planning only; it must not
silently implement its recommendations.

## Source material

Maintainer-supplied prompt, archived verbatim at
`self/inputs/2026-08-26-code-abstraction-prompt.txt` (tier contract
in `self/inputs/README.md`). It is a candidate basis, not an adopted
specification: a machine-derived census, stable segment register,
per-segment and cross-cutting assessment, target direction, staged
waves, pilot, decision rules, metrics, and coverage reconciliation.
The only source normalisation is a terminating newline and one list
continuation changed from three spaces to four for the quality gate.

## Boundary with existing functions

- **CODEBASE-AUDIT** already supplies the bounded outer loop:
  file-map chunks, findings-only review, aggregation, and triage.
- **REVIEW-SUITE** investigates deeper defect and risk assessment
  within those chunks, including project-tool validation and a
  severity-plus-confidence finding schema.
- **`task.md` refactor mode** executes one approved,
  behaviour-preserving surface with a baseline and preservation
  contract.

The possible gap is the composition layer between findings and
execution: explicit architecture boundaries, abstraction versus
de-abstraction decisions, dependencies between changes, and a
test-first sequence of independently reviewable waves.

## Done when

- A ship, revise, merge, or reject recommendation states whether
  this is a separate function or a stage/mode of REVIEW-SUITE.
- The useful invariants are distilled without copying the 730-line
  prompt into the hot product surface: exhaustive accounting,
  explicit exclusions, evidence and confidence, positive findings,
  justified duplication, and "leave unchanged" as a valid result.
- Large-repository operation is context-bounded and distinguishes
  files accounted for from files substantively assessed.
- The report lifecycle is defined: privacy-aware cold storage,
  human approval, then one record and refactor run per accepted wave.
- A pilot on a real consuming codebase shows useful, traceable
  recommendations without modifying application source.

## Approach

Compare the source prompt against CODEBASE-AUDIT, REVIEW-SUITE, and
refactor mode; extract only the missing contract; exercise that
contract on one bounded codebase area; then decide the smallest
product home (recipe, companion prompt, or suite stage).

## Constraints

- Findings and planning only; implementation remains separately
  authorised work.
- “Exhaustive” means reconciled coverage, never one unbounded session
  or an unsupported claim of complete assessment.
- Preserve behaviour by default. Abstraction is not the objective:
  simplification, de-abstraction, retained duplication, and no change
  must remain first-class treatments.
- Follow each project's dependency rules and canonical quality gate;
  no packages or generic scanner enter the framework.
- Adapt the prompt's hard-coded report filename to the project's
  artefact and privacy conventions; sensitive reports may stay local.

## Open questions

- Separate function, or an architecture-planning stage of
  REVIEW-SUITE?
- Should it consume accepted audit findings, or repeat the census and
  segment assessment to preserve traceability?
- Which metrics genuinely aid decisions without becoming targets that
  are easy to game?
