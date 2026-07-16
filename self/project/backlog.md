# Backlog — pm-skills framework repository

<!-- OPEN WORK ONLY. Status: [ ] todo  [~] in progress  [-] cut. -->
<!-- Ticket grammar: canonical copy in pm_skills/project/backlog.md
     (the template). Grades carried from the 2026-07-16 case-study
     triage: Impact / Difficulty / Risk / OpΔ, where Impact =
     operational improvement to consuming projects and OpΔ = change to
     the maintainer's day-to-day operation. -->
<!-- Detail files live in self/project/tickets/<ID>.md ([detail] flag).
     Shipped tickets move to self/project/archive/tickets/. -->

## Active

### Current milestone

- [ ] **CODEBASE-AUDIT Whole-codebase review pass** [sign-off] [detail]
  Intent: chunked holistic audit composing review.md area mode;
  findings-first, never silent edits. First real target: this
  self-hosted repo.
  Done when: the open decision (GUIDE recipe vs a review.md whole-repo
  mode) is resolved and one full audit has run · Medium / Medium /
  Low / Low.

### Next milestone

- [ ] **ADOPT-FIXES adopt.md fixes from its first real run** [detail]
  Intent: fold the SELF-HOST dogfood findings back into the
  distributed adopt flow (Step-0 detection misfires on this repo;
  file-map generator scope; memory-home assumption).
  Done when: triaged fix-or-record-why for each finding; distributed
  changes ship as a normal release · Low-Med / Low / Low / None.

### Icebox

<!-- Deferred but worth keeping. Trigger noted where one exists. -->

- [ ] **ITEM-AGE Standing-item ageing** [detail] — `[maintainer]` /
  `[sign-off]` items show age at the batch pick; `[security]` banner
  escalation · Medium / Low / Low / Low.
- [ ] **ARCH-INTEG Archive-integrity check in Diagnose** [detail] —
  verify dated decision-log references resolve; INDEX coverage ·
  Medium / Low / Low / None.
- [ ] **PROCESS-TPL PROCESS.md slot / ADR protocol** [sign-off]
  [detail] — first-class home for macro phases + ADR closure protocol
  (template vs absorb undecided) · Med-High / Medium / Low / Low.
- [ ] **DEPREC-SHIM Deprecation shims on consolidation** [detail] —
  upgrade offers workflow-dir cleanup / tombstones for removed files ·
  Low-Med / Low / Low / None.
- [ ] **TASK-SIZING Size hint for task scope** [detail] — `size:
  minimal|medium|large` calibrates option breadth, never gates or
  prohibitions · Low-Med / Low / Low-Med / Low.
- [ ] **DATA-MIG Data-migration guidance** [blocked: first consuming
  project with persistent user data] — hard rule "no irreversible data
  change without a documented back-out" + DEV-INFRASTRUCTURE section
  reusing the upgrade.md snapshot → propose → execute → reconcile
  shape. Grades when triggered: High / Medium / Low / Low.
- [ ] **TEST-DOC Testing-doctrine cross-reference** [blocked: evidence
  of need] — if ever done: one cross-reference paragraph in the
  DEV-INFRA Quality-gate section, nothing more.
- [ ] **CL-HORIZON Changelog horizon** [blocked: CHANGELOG past ~20k
  words] — split or index the changelog; cold outside upgrades, so no
  action at current size.
