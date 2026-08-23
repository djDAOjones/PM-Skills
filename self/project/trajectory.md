# Trajectory — pm-skills framework repository

## Phase: Planning loop

- RELEASE-TREE-GLOB — release.md step 6 GUIDE-tree check honours
  glob lines (4.9.2): the three `CHANGELOG-*x.md` archives no longer
  fire MISSING at every release; regex-derived match, verified under
  sh/bash/zsh, negative case still reports (2026-08-23) — see
  decision-log.
- GUIDE-SYNC — guide prose caught up to 4.9.0 behaviour (4.9.1):
  optional `PROCESS.md` and the full hot tier in the mental model,
  exact MANIFEST class names, `backlog-authoring.md` as a workflow
  command, the empty-queue Re-assess rule and janitor report at
  Pick, `doc-deltas.md` and `check-memory.mjs` in the Close steps,
  the validator as a gate for any project (2026-08-23).
- README-SYNC (2026-08-23) — README caught up to 4.9.0 (source-only):
  optional `PROCESS.md` template, `doc-deltas.md`, all six
  memory-maintenance verbs, spike/refactor modes, `next`/`dispatch`
  in the daily loop, the commit-and-push close (and the opt-out
  line), lite close, rules-import tip, archived changelog epochs.
- PLAN-ORDER — Re-assess verb ships (4.9.0): sixth
  memory-maintenance verb re-judges the standing queue (grades,
  holds, order, refill), propose-only and never auto-run; Diagnose
  check 13 and the Start B icebox rule route to it; first pass run
  live on this repo at the release (2026-08-18) — see decision-log.

## Phase: Records distribution (BACKLOG-STATE phase 2)

- RECORDS-DIST — records mode distributable (4.8.0): scaffold
  gen-backlog + check-memory (run in place, --project-dir),
  `_meta.md` dialect keys (milestones/flags), adoption + grammar
  guidance (GUIDE, backlog-authoring, template pointer); fixture
  caught and fixed the missing-`## Active` first-generation gap;
  close-control harness run at the release (2026-08-17) — see
  decision-log.

## Phase: Regression-net slice (post-INTAKE-DEEP)

- RELEASE-EVALS — advisory harness check in the release close:
  release.md step 7 + repo checklist line, scenario-class mapping
  decided, janitor line declined; first release closed under the
  net (4.7.1) (2026-08-17) — see decision-log.
- CL-440-WORDING — 4.4.0 upgrade-actions correction entry +
  class-precedence guard in upgrade.md Step 3 + release.md awk
  completion (review F1); first blinded upgrade-scenario run at a
  release close (4.7.2) (2026-08-17) — see decision-log.

## Phase: Parallel arc

- PAR-DISPATCH — parallel dispatch verb shipped (4.7.0): disjoint
  pick, lane briefs, the dispatching session integrates and
  releases once; verified by a live two-lane dispatched exercise
  on this repo before the text shipped (2026-08-17) — see
  decision-log.
- RETIRE-TRANSCRIPT-NAG — per-close transcript reminder retired
  from end-of-task; GUIDE transcript section demoted to on-demand
  reference (4.7.0, dispatched lane) (2026-08-17) — see
  decision-log.
- REPORTS-IGNORE — janitor report untracked: self/project/reports/
  git-ignored, freshness purely the filesystem contract
  (source-only, dispatched lane) (2026-08-17) — see decision-log.

## Phase: Records arc

- VALIDATOR-QC — probe-evidenced check-memory hardening
  (source-only): records-aware repair messages on both coherence
  FAILs, WARN on unknown record status values, dialect-tolerant
  trajectory counters; verified against canon, the Hub's live
  memory (counters 0 → 12), and replays of both Hub probe failure
  scenarios (2026-08-17) — see decision-log.

- PAR-BRANCH — branch-per-session for records mode: verified live
  on both repos (records clean; view conflicts regenerate away);
  GUIDE + secondary-close updated (4.6.0) (2026-08-17) — see
  decision-log.
- BACKLOG-STATE — phase 1 shipped: canon backlog runs records mode
  (tickets = records, view generated, validator coherence FAILs
  divergence); phase 0 = lab RQ3 pass (2026-08-17) — see
  decision-log.

## Phase: Ticket sweep (post-wave incumbent development)

- CL-HORIZON — changelog epochs archived behind an index; live
  file ~1.9k words from ~17.9k; upgrade walk spans the split
  (4.5.0) (2026-08-17) — see decision-log.
- JANITOR-READ — read-only janitor: report script + session-start
  read-when-fresh path with staleness contract; first report
  generated (4.5.0) (2026-08-17) — see decision-log.

- BACKLOG-AUTH — authoring cluster shipped: backlog-authoring
  prompt with canonical ticket skeleton and external contract,
  Start B promotion hook, `[detail]` links, legibility guidance
  (4.4.0) (2026-08-17) — see decision-log.
- PROCESS-TPL — optional PROCESS.md root template shipped, option
  A: phases + DoD, ADR closure protocol, always-4-stage triggers,
  demo/spike cadence, risk watch (4.4.0) (2026-08-17) — see
  decision-log.
- DEPREC-SHIM — deprecation shims on consolidation: upgrade
  workflow-dir sweep + tombstones, backup-invocation guard,
  release old→new map rule (4.4.0) (2026-08-17) — see decision-log.

## Phase: Machine-native Wave 2

- REFLECT-PRACTICE — reflection protocol codified as a standing
  practice (`self/REFLECTION.md`) (2026-08-09) — see decision-log.
- PRUNE-HYST + CTX-IMPORTS — prune hysteresis targets and measured
  rules-import guidance (4.3.0) (2026-08-09) — see decision-log.
- MEM-CHECK-2 — attention counters (shipped/30d, commits per item)
  and token estimates in the validator (2026-08-09) — see
  decision-log.
- EVAL-HARNESS — harness v1 shipped (scripts/eval): upgrade
  scenario GREEN (first mechanical proof of the upgrade promise),
  trailer-key probe DETECTED (arbitrary-contract doctrine
  confirmed) (2026-08-09) — see decision-log.

## Phase: Machine-native Wave 1 (R0 instrumentation)

- CLOSE-COMMIT — commit-and-push standard at close; propose-only
  restorable per project (4.2.0) (2026-08-09) — see decision-log.
- RETIRE-COMP — first measured prose retirement: imports-at-top
  dropped, plain-shell clause narrowed, bypass-hardening added
  (4.2.0) (2026-08-09) — see decision-log.
- OPT-PROTO — empirical option checks rule in design-options
  (4.2.0) (2026-08-09) — see decision-log.
- TRANSCRIPT-SHA — transcripts carry a Start SHA header; the
  archive becomes scenario seeds (4.2.0) (2026-08-09) — see
  decision-log.
- MEM-CHECK — memory validator shipped and wired into the gate as
  lint:memory; budgets machine-readable in memory-policy;
  end-of-task validator hook (4.1.0) (2026-08-09) — see
  decision-log.

<!-- Shipped-work narrative, newest phase at the top. One line per
     item: the outcome. The why lives in decision-log.md; release
     detail lives in pm_skills/CHANGELOG.md — point, don't restate. -->

## Wave 6 — distribution boundary (shipped 2026-07-17, v4.0.0)

- DIST-BOUNDARY (4.0.0) — `pm_skills/` is now the entire
  distributable: the three rulebook templates moved into
  `pm_skills/templates/` (init Step 0 copies them out), the operative
  self contract was promoted to the repo root, and source-only
  `scripts/package.mjs` exports the tree manifest-verified
  (`npm run package`, gate-wired as `lint:boundary`). Driven by
  whole-repo-copy leakage observed on the first real consuming
  project. See decision-log 2026-07-17.

## Source-only fixes

- INTAKE-DEEP (2026-08-17) — the whole intake pool (five icebox
  records, eight wish-list lines) deep-assessed against the day's
  evidence: RELEASE-EVALS and CL-440-WORDING promoted to Current,
  the three records-distribution wishes merged into RECORDS-DIST
  (Next), all five icebox records held with dated reasons,
  PACE-POLICY surfaced for a maintainer yes/no, one lab-side
  residual cut. No release. See decision-log 2026-08-17.
- DEV-PREP (2026-08-17) — prep sweep before the next arc: the five
  loose July transcripts identified, renamed to convention, and
  committed after a redaction scan; npm audit 3 high → 0 via
  markdownlint-cli2 0.23.2 with both override pins retired at their
  documented condition; the missing lint:memory step added to CI
  and the DEV-INFRASTRUCTURE table (4.1.0 parity drift);
  INTAKE-DEEP queued as Current #1. No release. See decision-log
  2026-08-17.
- GATE-FRESH (2026-08-08) — fresh-clone gate repair: check-docs now
  ignores gitignored `node_modules/` path references (three doc refs
  failed every fresh clone), and the file-map dropped its stale line
  for the untracked .devin session-shim stub (map regenerated). No
  release. See decision-log 2026-08-08.
- CI-NODE (2026-07-16) — CI Lint job bumped Node 20 → 22 and
  `engines` → `>=22.18.0`; `cspell@^10` needs Node `>=22.18.0` and was
  failing every push to `main`. No release. See decision-log 2026-07-16.

## Wave 5 — consuming-project features (shipped 2026-07-16, v3.15.0–3.17.1)

- ARCH-INTEG (3.17.1) — Diagnose gains check 7, archive referential
  integrity: dated `decision-log` pointers in the trajectory must
  resolve to a live-log entry or an archive INDEX range, else FAIL with
  a git-recovery hint (propose-restore, never auto-edit); Prune P5
  re-runs it after a split. Former checks 7–12 renumber to 8–13. See
  decision-log 2026-07-16.
- ITEM-AGE (3.17.0) — standing human-owned work surfaces its age at the
  Start B pick; new `[security]` flag banners at every session start
  until closed; Diagnose check 12 + a `memory-policy.md` age row
  (WARN 30 d). Grammar (canonical backlog comment) documents
  `[maintainer]`/`[security]` + the creation-date convention. Age is
  informational — never reorders the queue. See decision-log 2026-07-16.
- NEXT-CMD (3.16.0) — the `/next` loop shipped as a distributed
  workflow `pm_skills/integrations/next.md` (Start B pick → auto-jazz
  build → end-of-task close; one item per invocation, invocation is
  the go-ahead, `[sign-off]` escalates to full). GUIDE/README wired;
  this repo's `/next` now defers to the distributed copy + `self/`
  mapping. See decision-log 2026-07-16.
- REPO-REVIEW (3.15.3) — full source-tree review: gen-file-map
  idempotence fix in both forks (index block parsed as roles), scaffold
  copy-vs-run-in-place doc drift fixed, memory audited all-green. See
  decision-log 2026-07-16.
- CODEBASE-AUDIT (3.15.0) — whole-codebase audit path: an orchestrated
  loop over `review.md` area mode (chunk by `file-map.md` section,
  findings-only, aggregate, triage). GUIDE recipe + review.md pointer
  note; no new files. See decision-log 2026-07-16.
- ADOPT-FIXES (3.15.1) — adopt.md Step 0 gains a framework-source-tree
  exception (don't route the product's own `VERSION` to upgrade);
  two findings closed why-not (file-map `IGNORE` knob, `self/`
  memory-home mapping). See decision-log 2026-07-16.
- REVIEW-FIXES (3.15.2) — first `review.md` pass over the burst:
  changelog `self/` reference reworded (product-tree rule),
  transcripts deduped and renamed to convention, wish-list newline.
  See decision-log 2026-07-16.

Outcome: first product feature shipped through the self-hosted loop,
the loop's own first dogfood findings folded back in, and the burst
reviewed clean end-to-end.

## Self-hosting (shipped 2026-07-16)

- SELF-HOST — framework repo adopted its own memory: `self/`
  deployment (contract + standard memory set), ROADMAP scratch
  retired to `self/archive/user_crud/`, adopted memory lint-gated,
  session loops switched to the standard prompts with the `self/`
  path mapping. Source-only (no release). See decision-log
  2026-07-16.

Outcome: the framework develops itself through its own loops; first
real run of adopt.md (findings → ADOPT-FIXES).

## Wave 4 — process hardening (shipped 2026-07-16, v3.13.0–3.14.1)

- COMMIT-STEP (3.13.0) — per-task commit checkpoints with staged-set
  echo; recommend-only.
- MULTI-WRITER (3.14.0) — parallel-session claim, provenance rule,
  secondary-session handoff close.
- MODEL-TIER (3.14.1) — per-step model-tier guidance (mechanical
  halves cheap; judgement and protocol closes on the stronger tier).

Outcome: the failure modes observed on this repo's own 2026-07-16
burst are now framework mechanisms.

## Waves 1–3 — the 2026-07-16 burst (v3.2.0–3.12.1)

- MEM-MAINT (3.2.0) — sanctioned lite close + Reconcile verb.
- ENV-PREFLIGHT (3.3.0) — environment/sync-conflict preflight +
  repair playbook.
- BUDGET-SCALE (3.4.0) — scale-aware memory budgets.
- FILEMAP-GEN (3.5.0) — generated, sectional file-map.
- ADOPT (3.6.0) — existing-codebase adoption flow.
- TRANSCRIPTS (3.7.0) — chat-transcript archiving convention.
- SEC-BASE (3.8.0) — security baseline as the 5th tiered capability.
- SPIKE (3.9.0) — timeboxed spike mode.
- REFACTOR-MODE (3.10.0) — behaviour-preserving refactor mode.
- REVIEW-AREA (3.11.0) — feature-area review scope.
- DOC-SYNC (3.12.0) — protected-doc sync loop; plus 3.12.1
  burst-review consistency fixes.

Outcome: the Hub case-study findings (retrospective evaluation,
archived) triaged into eleven same-day releases.

## Foundations (2026-04 → 2026-07, v1.x–3.1.1)

- 2.0.0/3.0.0 — consolidation eras: token-efficiency, task.md modes,
  memory-maintenance verbs, 48 → 36 files.
- 2.8.0 — per-item `[detail]` ticket files.
- 3.1.0/3.1.1 — traceable version identity; public GitHub upgrade
  source.
- Source-only: quality-gate tooling (cspell, editorconfig-checker,
  docs-integrity checker, CI, pre-commit hook); npm-audit override
  pins.

Outcome: framework matured from initial templates to a versioned,
upgrade-safe distribution with a lint gate. Detail:
`pm_skills/CHANGELOG.md` + git history.
