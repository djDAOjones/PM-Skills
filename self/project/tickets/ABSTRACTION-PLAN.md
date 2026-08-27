---
id: ABSTRACTION-PLAN
name: Abstraction and auditability planning
status: todo
milestone: icebox
flags: detail
date: 2026-08-26
grades: High / High / Medium / Low
order: 8
summary: investigate a read-only whole-repository planning function that turns evidence into a coverage-accounted programme of small, behaviour-preserving improvements — abstraction and de-abstraction rules, staged waves, a pilot, measurable validation. Two revisions of the basis archived under self/inputs/ (2026-08-26, superseded by 2026-08-27).
---
# ABSTRACTION-PLAN — abstraction and auditability planning

> **Status:** Icebox — investigation, unblocked (LAB-FIRST gates
> the pick, not the filing). **Grades:** provisional at intake
> (2026-08-26): High / High / Medium / Low.

## Intent

Whether pm-skills should offer a read-only function that turns
whole-repository evidence into a safe programme for improving code:
clearer boundaries, stronger auditability, appropriate reuse, small
reversible waves. Planning only; it never silently implements.

## Source material

Two revisions of one maintainer prompt, archived verbatim (tier
contract in `self/inputs/README.md`). A candidate basis, not an
adopted specification: census, segment register, per-segment and
cross-cutting assessment, target direction, staged waves, pilot,
decision rules, metrics, coverage ledger.

- `2026-08-26-code-abstraction-prompt.txt` — first revision,
  normalised only by a terminating newline and one list indent.
- `2026-08-27-code-abstraction-prompt-codex.md` — **supersedes it**,
  byte-identical to source. Same passes and report structure; the
  self-review grows from 10 questions to 15, plus four closing
  sections: completion criteria, context-limit handling, an
  autonomous execution instruction, and a final-response contract.
  Read this one; the first stays for provenance.

Context-limit handling is the most useful addition, and bears on the
invariants below: it grades inspection as classified-not-inspected,
superficial, substantive, or excluded-with-justification, and forbids
trading inspection for assumption when a run cannot finish.

## Boundary with existing functions

- **CODEBASE-AUDIT** supplies the bounded outer loop: file-map
  chunks, findings-only review, aggregation, triage.
- **REVIEW-SUITE** investigates defect and risk depth within those
  chunks: tool validation, severity-plus-confidence findings.
- **`task.md` refactor mode** executes one approved,
  behaviour-preserving surface.

The possible gap is the composition layer between findings and
execution: architecture boundaries, abstraction versus
de-abstraction, dependencies between changes, and a test-first
sequence of reviewable waves.

## Done when

- A ship, revise, merge, or reject recommendation says whether this
  is a separate function or a stage of REVIEW-SUITE.
- The useful invariants are distilled without copying the long
  prompt into the hot product surface: exhaustive accounting,
  explicit exclusions, evidence and confidence, positive findings,
  and "leave unchanged" as a valid result.
- Large-repository operation is context-bounded, separating files
  accounted for from those substantively assessed.
- The report lifecycle is defined: cold storage, human approval, then
  one record and refactor run per accepted wave.
- A pilot on a real codebase gives useful, traceable recommendations
  without modifying application source.

## Approach

Compare the prompt against CODEBASE-AUDIT, REVIEW-SUITE, and refactor
mode; extract the missing contract; exercise it on one bounded area;
pick the smallest product home.

## Constraints

- Findings and planning only; implementation is authorised
  separately.
- “Exhaustive” means reconciled coverage, never one unbounded session
  or an unsupported claim of complete assessment.
- Preserve behaviour by default. Abstraction is not the objective:
  simplification, de-abstraction, retained duplication, and no change
  stay first-class treatments.
- Follow each project's dependency rules and quality gate; no package
  or generic scanner enters the framework.
- Adapt the prompt's hard-coded report filename to the project's
  artefact conventions.

## Open questions

- Separate function, or an architecture-planning stage of
  REVIEW-SUITE?
- Consume accepted audit findings, or repeat the census to preserve
  traceability?
- Which metrics aid decisions without becoming targets to game?
- Does the newer revision's autonomous, no-pausing execution mode
  belong in a gated framework? READ-ONLY-AUDIT raises the same
  tension — settle it once, for both.
