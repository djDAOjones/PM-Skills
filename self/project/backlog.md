# Backlog — pm-skills framework repository

<!-- OPEN WORK ONLY. Status: [ ] todo  [~] in progress  [-] cut. -->
<!-- Ticket grammar: canonical copy in pm_skills/project/backlog.md
     (the template). Grades: Impact / Difficulty / Risk / OpΔ, where
     Impact = operational improvement to consuming projects and OpΔ =
     change to the maintainer's day-to-day operation. -->
<!-- Detail files: the [detail] flag links to `tickets/<ID>.md`;
     shipped tickets move to archive/tickets/. Authoring at volume:
     pm_skills/prompts/backlog-authoring.md. -->

## Active

### Current milestone

<!-- Intent: machine-native icebox promotions, small-first
     (ICEBOX-DEEP triage 2026-08-17); order is the development
     order. -->

- [ ] **JANITOR-READ Background maintenance reporter**
  [detail](tickets/JANITOR-READ.md) — janitor script wraps the
  validator into a dated report; session-start reads it when fresh
  (staleness contract), computes as fallback. Read-only forever.
  · Medium / Low-Med / Low / Medium.
- [ ] **CL-HORIZON Changelog epoch split**
  [detail](tickets/CL-HORIZON.md) — archive superseded major
  epochs verbatim with an index the upgrade walk follows; execute
  before the ~20k trigger fires mid-release (measured 17,352 +
  4.4.0). · Medium / Low-Med / Low / Low.

### Next milestone

<!-- Intent: the records arc — structural, phased, R1-unprejudiced;
     lab RQ3 findings gate phase 1. -->

- [ ] **BACKLOG-STATE Backlog state/view split**
  [detail](tickets/BACKLOG-STATE.md) — per-item record files
  (flat frontmatter) under a generated backlog view; validator
  checks record↔view coherence. Phase 0 = lab RQ3-SUBSTRATE.
  · High / High / Med-High / Medium.
- [ ] **PAR-BRANCH Branch-per-session coordination**
  [detail](tickets/PAR-BRANCH.md) [blocked: BACKLOG-STATE phase 1]
  (2026-08-09) — records make item writes disjoint; branch-per-
  session with mechanical merge; advisory claims remain for shared
  files and prose-memory projects. · Medium / Low-Med / Low /
  Medium.

### Icebox

<!-- Intent: kept with explicit triggers; re-checked each sweep
     (deep sweep 2026-08-17, ICEBOX-DEEP). -->

- [ ] **DATA-MIG Data-migration guidance** [blocked: first consuming
  project with persistent user data] (2026-07-16) — hard rule "no
  irreversible data change without a documented back-out" +
  DEV-INFRASTRUCTURE section reusing the upgrade.md snapshot →
  propose → execute → reconcile shape. Grades when triggered:
  High / Medium / Low / Low.
- [ ] **TEST-DOC Testing-doctrine cross-reference** [blocked:
  evidence of need] (2026-07-16) — if ever done: one
  cross-reference paragraph in the DEV-INFRA Quality-gate section,
  nothing more.
- [ ] **ARCH-RECALL Recall over cold storage** [blocked: a consuming
  project reports missed-precedent pain] (2026-08-09) — richer
  archive INDEX summaries + a search-then-skim pass; embeddings only
  if evidence demands. · Medium / Medium / Low / Low.
- [ ] **JANITOR-WRITE Auto-run maintenance verbs**
  [detail](tickets/JANITOR-WRITE.md) [blocked: per-verb scenario
  green + explicit per-verb maintainer sign-off] (2026-08-09) —
  graduated autonomy, Reconcile rung first; a blanket sign-off does
  not open this gate. · Medium / Medium / Medium / Medium.
- [ ] **PM-MCP Programmatic memory interface**
  [detail](tickets/PM-MCP.md) [blocked: BACKLOG-STATE proven —
  prototype via lab RQ5; distribution additionally on more than one
  consuming project] (2026-08-09) — packaging-ladder rung 4; adapter
  outside the distributed tree, never core.
  · High / High / Medium / Medium.
