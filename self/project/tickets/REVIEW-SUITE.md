---
id: REVIEW-SUITE
name: Deep code-review suite
status: todo
milestone: icebox
flags: detail
date: 2026-08-26
grades: High / High / Medium / Low
order: 3
summary: investigate a thorough code-review suite — engineering-depth dimensions (security, performance, dependencies, tests), a validation phase that runs the project's own tooling, and a severity-plus-confidence finding schema — layered on the whole-repo audit recipe CODEBASE-AUDIT shipped. Candidate basis archived at self/inputs/2026-08-26-code-review-prompt.txt.
---
# REVIEW-SUITE — deep code-review suite

> **Status:** Icebox — investigation, unblocked.
> **Last assessed:** 2026-08-27. **Grades:** provisional at intake
> (2026-08-26): High / High / Medium / Low.

## Intent

Whether the framework should carry a thorough code-review suite
for consuming projects: beyond "did this change do what it said"
to "is this software sound, safe, and fit to run", with findings
that are evidence-backed, severity-rated, and ready to schedule.

## Source material

Maintainer-supplied review prompt, archived verbatim at
`self/inputs/2026-08-26-code-review-prompt.txt` (tier contract in
`self/inputs/README.md`). A candidate basis, not a specification:
three phases (understand → validate by running the project's own
tooling → review), nine review dimensions, per-finding evidence
requirements, severity crossed with confidence, a ten-section
report contract. Read it, don't restate it.

## What already exists — do not rebuild

- **`pm_skills/prompts/review.md`** — reviews one change set:
  scope adherence, contract and invariant audit, risk and
  spot-checks, memory hygiene, verdict plus punch list, and the
  cite-`file:line` rule.
- **`pm_skills/GUIDE.md` → "Auditing the whole codebase"** — the
  outer loop shipped by CODEBASE-AUDIT: chunk by file-map
  section, bounded read cost per chunk, aggregate into one
  severity-tagged report with an explicit "not audited" list,
  triage rather than fix.

Orchestration and the change-set engine exist. **The gap is depth
per chunk, not repository coverage.**

## The gap

- **Engineering dimensions.** Today's review audits against the
  project's rulebooks; it does not sweep for injection,
  authorisation paths, secrets in the tree, races, non-atomic
  writes, leaks, abandoned dependencies, lockfiles
  reproducibility, or accessibility and error states.
- **A validation phase.** Nothing tells the reviewer to install,
  build, lint, type-check and test, then record commands and
  outcomes. The honesty rule — never claim a command succeeded
  without running it — is the most valuable import.
- **A finding schema.** Severity × confidence, plus location,
  impact, realistic scenario, remediation, verification, effort,
  sequencing. One actionable line suits a change set, not an
  audit feeding a roadmap.
- **Discipline against invention.** Trace usages before calling
  code dead; check existing mitigations and tests; say where
  evidence is thin.

## Investigation questions

- **Home:** a depth mode in `review.md`, a companion checklist,
  or the dedicated `audit.md` CODEBASE-AUDIT deferred until the
  recipe proved to under-specify — that deferral is the precedent
  to argue with.
- **Size:** what survives the "point don't restate" style; how it
  degrades for docs-only projects.
- **Overlap:** harnesses increasingly ship their own review
  commands. Does the framework's value become the triage half —
  severity into backlog grammar — not the finding half?

## Constraints

- **Findings-only** — never edits code; findings become records.
- **Product tree, so every change is a release** — VERSION,
  CHANGELOG with upgrade actions, MANIFEST and GUIDE sync.
- **Zero dependencies** — prose curriculum, never a scanner.
- **Bounded read cost** — chunking is not optional at this depth.

## Evidence needed at pick

This repository cannot validate the suite on itself: Markdown and
lint tooling, no runtime code, no interface, no deployment — the
dimensions that matter have nothing to bite on. The real test is a
consuming project with real code.

Refreshed 2026-08-27: this gate used to wait on "the university
video-helper app once the lab's R2 arc reaches it". R2 will not
reach it (decision-log 2026-08-27), but the gate is now easier to
meet, not harder: Route Plotter and UoN Video Helper are both
consuming projects with real code, filed in `self/field-reports/`,
and their own 2026-08-26 review rounds are prior art for this verb.
Treat a run against either as the gate before distributing.

## Family settled (2026-08-27 Re-assess)

The three read-only whole-repository items are no longer an unsettled
family. The division of labour, and this item's place in it, is
recorded once in `READ-ONLY-AUDIT.md` → "Family settled". Nothing was
merged and nothing cut.
