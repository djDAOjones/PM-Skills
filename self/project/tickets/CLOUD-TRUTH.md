---
id: CLOUD-TRUTH
name: Retire the cloud-sync fiction
status: todo
milestone: current
flags: detail
blocked-on:
date: 2026-08-28
grades: Medium / Low / Low / Low
order: 1
summary: retire the "unsupported" claim in the AGENTS template's hostile-filesystem guard — every deployment on record, this repository included, lives on a cloud-synced path — and add the operational cloud-sync section to the DEV-INFRASTRUCTURE template, where both coding projects independently hand-wrote theirs. One release, two template files.
---
# CLOUD-TRUTH — Retire the cloud-sync fiction

> **Status:** Current · **Grades:** Medium / Low / Low / Low.
> **Last assessed:** 2026-08-28 — created at the run-two triage
> (field study FS2-06, the named retirement; framework-level grade,
> high confidence).

## Intent

A rule every deployment permanently violates teaches projects that
rules are decorative. Keep the hostile-filesystem guard's working
half (warn-only preflight, hard block before memory surgery);
retire its dead-letter half (the claim that cloud-synced paths are
"unsupported for project memory"); and give the operational
knowledge a template home.

## Done when

- `pm_skills/templates/AGENTS.md` → "Hostile-filesystem guard" no
  longer claims non-support: it states the hazard, the observed
  failure modes (silent mid-session reverts, conflict copies,
  dropped executable bits, watcher churn, stale `node_modules`),
  and the standing mitigations — preflight, pause-or-exclude,
  commit early and push, archive bulk evidence as single files.
- `pm_skills/templates/DEV-INFRASTRUCTURE.md` gains the operational
  cloud-sync section both projects hand-wrote (symptoms, recovery
  path such as `npm ci`, worker/watcher cautions) as a placeholder
  section with CUSTOMISE guidance.
- Released per `release.md` (root-template class: upgrade actions
  say 3-way merge; reach is future-inits-first, honestly stated —
  no walker has yet used the 4.13.0 reinstall path).

## Evidence / context

Field study `self/evaluations/2026-08-28-field-study-2.md` FS2-06,
confirmed by the same-day addendum: 4 of 4 deployments on OneDrive;
Route Plotter's June incident history; the Video Helper's owner
explicitly rejecting OneDrive exclusion and documenting recovery
instead; the template DEV-INFRASTRUCTURE has zero cloud-sync
mentions; the guard's preflight demonstrably fired in the field
(Codex harvest). Future observable: the next harvest shows projects
deleting hand-rolled OneDrive sections in favour of the template's.

## Constraints

- Keep the memory-surgery block hard — softening the *rule* must not
  soften the *gate*.
- The guard stays in AGENTS (hard rules); DEV-INFRASTRUCTURE gets
  the operational detail; neither restates the other
  (canonical-copy discipline).
