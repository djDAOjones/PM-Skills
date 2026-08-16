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

<!-- Wave 1 — R0 instrumentation for the revolution programme
     (self/evaluations/2026-08-08 series as revised by the extended
     assessment; triaged 2026-08-09, TRIAGE-REV). -->

<!-- Wave 1 ship-list COMPLETE 2026-08-09: MEM-CHECK (4.1.0),
     EVAL-SCEN (spike), TRANSCRIPT-SHA / OPT-PROTO / RETIRE-COMP /
     CLOSE-COMMIT (4.2.0), CTX-CACHE (spike; root CLAUDE.md trial).
     Next pick falls through to Next milestone. -->

### Next milestone

- [ ] **PROCESS-TPL PROCESS.md slot / ADR protocol** [sign-off]
  [detail] — first-class home for macro phases + ADR closure protocol
  (template vs absorb undecided) · Med-High / Medium / Low / Low.
<!-- Wave 2 shipped 2026-08-09 (autonomous run): EVAL-HARNESS v1
     (scripts/eval — upgrade GREEN, probe DETECTED), MEM-CHECK-2
     (counters + token estimates), PRUNE-HYST (4.3.0),
     REFLECT-PRACTICE (self/REFLECTION.md). Remaining follow-ups
     live in wish-list / harness README. -->

### Icebox

<!-- Deferred but worth keeping. Trigger noted where one exists. -->

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
- [ ] **BACKLOG-STATE Backlog state/view split** [blocked: observed
  parallel-merge incidents, or a commissioned backlog-generation
  process] (2026-08-09) — per-item ticket files + a generated index
  (the gen-file-map move applied to the backlog).
  · High / High / Med-High / Medium.
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
