# Trajectory — pm-skills framework repository

## Phase: Planning loop

- UPGRADE-REFUSED (2026-08-27) — upgrade.md gains a Reinstall path:
  measured on a fixture, a naive reinstall silently blanks populated
  memory and (rm -rf variant) deletes tickets and archive outright,
  so the safe recipe ships alongside what it cannot do. Settles the
  Upgrade-actions tax as the record of template changes, not the
  input to an unused walk. Evaluation filed (4.13.0) — see
  decision-log.
- PRUNE-P4-INDEX (2026-08-27) — Prune P4 no longer sweeps the live
  file's own archive-index lines into the new chunk; found by running
  a mid-run prune (decision log 20 → 14 live, chunk 08d, both slices
  byte-identical) during the first epic burn-down (4.12.1) — see
  decision-log.
- EPIC-AUTOJAZZ (2026-08-27) — continuous burn-down ships as
  `integrations/epic.md`, its own integration composing next.md per
  item; the one-item reversal rests on "invoked, never scheduled",
  which is the line Re-assess and the write ladders already draw.
  Written from a live exercise: pre-pick budget check, staged-set
  echo as a stop not a print, and backlog milestones as the table's
  vocabulary all come from what that run hit (4.12.0) — see
  decision-log.
- BACKLOG-TABLE (2026-08-27) — human-readable roadmap view ships
  source-only: `scripts/gen-roadmap.mjs` → tracked
  `self/project/roadmap.md`, gate-checked as `lint:roadmap`. Separate
  file (not in the hot-read backlog), gate-clean via an inline MD033
  disable, phases declared from the trajectory's own headings and
  archived phases listed from INDEX rows without opening cold chunks
  — see decision-log.
- FIELD-EXPORT (2026-08-27) — the twice-run-by-hand harvest
  procedure ships as `prompts/field-report.md`: a prompt not a
  script, distributed not maintainer-side, because the work runs
  inside the consuming project. Analysis note mandatory, redaction
  reported as counts, lane decided per file by what is already
  public, output written outside the project with a
  leave-nothing-behind check (4.11.0) — see decision-log.
- SCAFFOLD-GITPATH (2026-08-27) — GATE-PARITY's Git-path resolution
  ported into the distributed `scaffold/check-links.mjs`; the
  local-passes/CI-fails gap every scaffolded project inherited is
  closed, proved on a throwaway fixture (old copy green, new copy
  red on a gitignored target). Advisory upgrade action — `scaffold`
  class is never touched on upgrade (4.10.1) — see decision-log.
- ARCH-RETENTION (2026-08-27) — the archive gains a retention
  shape: ID join key surfaced in every INDEX row, whole-sequence-unit
  chunking (whole phases for the trajectory), an INDEX row contract
  that can be chosen from, and forward `Supersedes:` marking. Exercised by the due
  Prune in the same task — trajectory 2116 → 1392 words (chunk 0001,
  first ever `archive/trajectory/` file), decision log 21 → 14 live
  (4.10.0) — see decision-log.
- FIELD-HARVEST (2026-08-27) — two applied projects filed as
  consuming-project evidence (source-only): Route Plotter v3
  (pm-skills 4.7.0) and UoN Video Helper (4.9.2) harvested into
  `self/field-reports/` — eleven tracked reports (deployment-snapshot
  notes, memory with byte inventories, rulebooks, full git logs,
  review artefacts, the Video Helper's preserved init prompt) plus 23
  raw session logs in the local lane. First multi-project use of the
  tier; both source repos are public, so only the session logs needed
  the local lane. Taken on the maintainer's direct pick, clearing the
  LAB-FIRST gate. Two findings for a later evaluation: no deployment
  on record has ever walked `upgrade.md` (Route Plotter declined 4.9.2
  outright), and UoN Video Helper runs canon content despite its lab
  provenance — so R2's two-arm test has not started. No release. See
  decision-log 2026-08-27.
- GATE-PARITY (2026-08-24) — the local gate made CI-faithful
  (source-only): `scripts/check-docs.mjs` resolves every reference
  against the paths Git knows about instead of calling `existsSync`,
  so a link to a gitignored generated file now fails locally exactly
  as it fails in CI. `IGNORE` survives as the one deliberate escape
  hatch — backticked prose only, never links. Adds `check:clone`
  (`scripts/check-clone.mjs`), which runs the whole gate on a fresh
  clone of HEAD for divergence classes the docs check cannot see.
  Filed in the Icebox and shipped the same day on the maintainer's
  direct pick, clearing both its own trigger and the LAB-FIRST gate.
  The scaffold fork still carries the bug — captured as
  SCAFFOLD-GITPATH. No release. See decision-log 2026-08-24.
- GATE-REPORTS (2026-08-24) — fresh-clone gate repair: check-docs
  now ignores the gitignored janitor report path
  (`self/project/reports/`), which the root contract names in prose.
  CI had been red on every push since 2026-08-18 (ten runs) while
  the local gate stayed green — the generated file exists only on a
  working checkout. Taken under the LAB-FIRST gate-forced
  maintenance exception. No release. See decision-log 2026-08-24.
- FIELD-REPORTS (2026-08-23) — cold tier for consuming-project
  reports (source-only): `self/field-reports/<slug>/` with a gated
  README (type list, header contract, redaction rule), wired into
  every exclusion point and the `AGENTS.md` cold tier; first
  directory `digital-art-audience-hub` — see decision-log. Same
  day: `export` type added and a gitignored local-only lane
  (`self/field-reports/*/local/`) for evidence that cannot be
  public; first real report (Derry Lane,
  343 KB export) filed local-only — see decision-log.
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

## Phase: Source-only fixes (2026-08)

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
