# Trajectory — pm-skills framework repository

## Phase: Reflection instrument (2026-08-28)

- FIELD-STUDY (2026-08-28) — the reflection practice gains its
  method: `self/FIELD-STUDY.md`, a read-only single-pass procedure
  over the field-report tier. Twelve dimensions, a staleness pass
  that dates every observation against the release it describes,
  consistency grades that stop one project becoming a rule, and a
  mandatory retirement. Source-only: it reads `self/` throughout, and
  REFLECTION.md already defers distribution until two self-hosted
  runs (source-only) — see decision-log.
- FILEMAP-WRAP (2026-08-28) — the file-map generator was silently
  truncating any hand-wrapped role to its first line; four roles in
  this repo's own map had already decayed to half-sentences. Parser
  now folds continuations back; roles restored verbatim from history
  via `git log -S`. Fixed in both deliberate forks (4.16.1) — see
  decision-log.

## Phase: Epic burn-down (2026-08-27)

- ABSTRACTION-PLAN (2026-08-27) — the composition layer ships as
  `prompts/improvement-waves.md`: verified findings into staged
  revertible waves with a pilot, six equal treatments (abstraction is
  not the objective), and a coverage ledger where "exhaustive" means
  reconciled, not everything read. Separate from findings.md because
  per-finding disposition cannot decide order (4.16.0) — see
  decision-log.
- REVIEW-SUITE (2026-08-27) — shipped as `prompts/findings.md`, not
  the dimension suite scoped: field evidence showed both consuming
  projects got competent multi-dimension reviews from tools and then
  wrote critiques of them, catching over-rated findings, a stale one,
  six omissions and a remedy that would have caused a new defect. Five
  verdicts, verify-the-remedy, staleness first, and a disposition for
  every survivor (4.15.0) — see decision-log.
- READ-ONLY-AUDIT (2026-08-27) — the no-write posture ships as
  `prompts/read-only.md`: hard contract, command-isolation rules
  (redirect, else disposable copy, else do not run), and a
  start-and-end integrity check that is never repaired. A posture
  review.md and spike mode declare, not a fourth verb; the autonomy
  exemption is narrow and does not travel (4.14.0) — see
  decision-log.
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

## Phase: Planning loop

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
