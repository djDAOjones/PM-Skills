---
id: CL-440-WORDING
name: Correct the 4.4.0 upgrade-actions wording
status: todo
milestone: current
flags: detail
date: 2026-08-17
grades: High / Low / Low / Low
order: 2
summary: the 4.4.0 Upgrade actions name pm_skills/project/backlog.md in a "replace" list — only the MANIFEST class stops an upgrade overwriting a populated backlog; append a correction entry (append-only file: correction, not a rewrite). (source: R1 Hub evidence 2026-08-17)
---
# CL-440-WORDING — Correct the 4.4.0 upgrade-actions wording

<!-- ID note: the wish was captured as "CL-4.4.0-WORDING"; renamed
     at promotion — the item-ID grammar is SCREAMING-KEBAB (letters,
     digits, hyphens; the validator's ID parse excludes dots). -->

> **Status:** Current #2 · **Grades:** High / Low / Low / Low.

## Intent

The changelog is the upgrade instruction set. The 4.4.0 entry's
Upgrade actions list `pm_skills/project/backlog.md` among files to
replace; a literal agent that misses the MANIFEST project-memory
class would overwrite a consuming project's populated backlog —
the exact harm the "never touches your project memory" promise
forbids. Correct the record without rewriting history.

## Done when

- A correction lands as an appended entry (patch release) stating
  what 4.4.0 should have said; the published 4.4.0 entry stays
  byte-untouched (append-only rule).
- The correction tells an upgrading agent how to treat any
  project-memory path found in an older entry's actions: the
  MANIFEST class always wins over an entry's literal file list.

## Evidence / context

R1 Hub evidence 2026-08-17 (lab findings, walking the Hub
upgrade). VALIDATOR-QC deliberately left this un-batched — it is
distributed, so it was wished for triage; the INTAKE-DEEP sweep is
that triage. 4.4.0 sits in the live 4.x changelog (CL-HORIZON
keeps all 4.x entries live), so the correction needs no archive
surgery.

## Approach

Patch release: append the correction entry to the live changelog.
Ships after RELEASE-EVALS so this release is the first to run
under the advisory line; batching both into one listed release
stays a build-time option per the 4.3.0 precedent.

## Constraints

- Never rewrite the published 4.4.0 entry.

## Open questions

- Does `pm_skills/prompts/upgrade.md` also gain a one-line
  class-check guard (MANIFEST class before any replace) — decide
  at scoping.
