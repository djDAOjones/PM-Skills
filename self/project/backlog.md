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

<!-- Intent: nothing committed — the incumbent is between waves;
     the next pick falls through to Next, then to lab research. -->

### Next milestone

<!-- Intent: nothing queued. New work arrives via wish-list triage,
     lab findings, or consuming-project evidence. -->

### Icebox

<!-- Intent: kept with explicit triggers; re-checked at each sweep
     (last full sweep 2026-08-17, TICKET-SWEEP). -->

- [ ] **DATA-MIG Data-migration guidance** [blocked: first consuming
  project with persistent user data] — hard rule "no irreversible
  data change without a documented back-out" + DEV-INFRASTRUCTURE
  section reusing the upgrade.md snapshot → propose → execute →
  reconcile shape. Grades when triggered: High / Medium / Low / Low.
- [ ] **TEST-DOC Testing-doctrine cross-reference** [blocked:
  evidence of need] — if ever done: one cross-reference paragraph in
  the DEV-INFRA Quality-gate section, nothing more.
- [ ] **CL-HORIZON Changelog horizon** [blocked: CHANGELOG past ~20k
  words; measured 17,352 + this release at the 2026-08-17 sweep —
  expect the trigger within a few releases] — split or index the
  changelog.
- [ ] **BACKLOG-STATE Backlog state/view split** [blocked: observed
  parallel-merge incidents, or a commissioned backlog-generation
  process] (2026-08-09) — per-item ticket files + a generated index
  (the gen-file-map move applied to the backlog). Note 2026-08-17:
  the authoring-demand leg was served cheaply by
  `backlog-authoring.md`; the trigger now rests on merge incidents
  or generation outgrowing prose. · High / High / Med-High / Medium.
- [ ] **JANITOR-READ Background maintenance reporter** [blocked: an
  autonomous-loop deployment] (2026-08-09) — reconcile counts, ages,
  and budgets computed into a dated report session-start reads
  instead of computing. · Medium / Low-Med / Low / Medium.
- [ ] **JANITOR-WRITE Auto-run maintenance verbs** [blocked:
  EVAL-HARNESS green + per-verb maintainer sign-off] (2026-08-09) —
  graduated autonomy: Reconcile first, Prune later, doc-sync
  perhaps never.
- [ ] **ARCH-RECALL Recall over cold storage** [blocked: a consuming
  project reports missed-precedent pain] (2026-08-09) — richer
  archive INDEX summaries + a search-then-skim pass; embeddings only
  if evidence demands. · Medium / Medium / Low / Low.
- [ ] **PAR-BRANCH Branch-per-session coordination** [blocked:
  BACKLOG-STATE, or observed claim collisions] (2026-08-09) —
  declined at current scale (same-file appends are git's weakest
  merge case); revisit with per-item records.
- [ ] **PM-MCP Programmatic memory interface** [blocked:
  BACKLOG-STATE proven + more than one consuming project]
  (2026-08-09) — horizon marker from the synthesis packaging
  ladder; the protocol-convergence leg fired (lab RQ8-SCAN).
