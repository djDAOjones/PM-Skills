# Wish-list — pm-skills framework repository

<!-- Capture inbox for unscoped ideas. Cold tier — read only at triage
     (session-start Start B, or when the size check flags it).
     Promote into backlog.md or cut; no history kept here. -->

## Open

- CLOSE-SCENARIO-DEBT: the close-control scenario has not been run
  against 4.18.0, which changed `prompts/end-of-task.md` (step-4 size
  check only — no property the scenario asserts). Advisory per
  release.md step 7; the harness needs a blinded sub-agent, which the
  shipping session may not be. Fold into the next blinded run rather
  than scheduling one for this. (source: BUDGET-TRUTH close,
  2026-08-28)
- REVIEW-ACCEPTANCE-WATCH: standing observable, no edit — does the
  run-acceptance review verb (`prompts/review.md`) ever fire? Zero
  invocations across two projects while ordinary review sessions
  did its job; the study's original shrink-into-findings.md remedy
  was withdrawn at interrogation (wrong object — review.md is
  run-acceptance, not whole-repo production). If the next two field
  reports still show silence, the retirement question is the verb
  itself. (source: field study run two, FS2-02 + addendum)
- LITE-CLOSE-WATCH: standing observable, no edit — `Close: lite`
  has zero firings in 197 field commits despite being referenced in
  the Video Helper's own rulebooks (reachable, unused). If the next
  harvest still shows zero, propose retiring the trailer or finding
  its real use case. Absorbed the withdrawn SESSION-CHECKPOINT
  candidate: end-of-task already ships the checkpoint machinery
  (lite close + secondary-session handoff), so there is nothing to
  add — only this silence to watch. (source: field study run two,
  FS2-05 + addendum)
- ROADMAP-DIST: distribute the roadmap renderer — `gen-roadmap.mjs`
  to `pm_skills/scaffold/`, the view to the project-memory templates —
  once this repo has actually used the source-only copy for a while.
  Held deliberately at BACKLOG-TABLE's close (2026-08-27): shipping it
  now doubles the maintenance under the deliberate-fork rule for a
  shape with no usage evidence. Re-assessed 2026-08-28 — hold stands,
  but the clock is running: the renderer was regenerated at every
  close of the run-two burn-down and its `--check` caught a real
  divergence mid-run. Re-judge once the usage spans more than a
  single session.
- NEXT-FRAGMENTS: pm-next v0.2 — per-item decision/trajectory
  fragments folded at integration, closing the successor's last
  shared-append residue. (source: reflection run one; PACE-POLICY
  adopted 2026-08-17 — paused until the Hub leg lands, then route
  to the lab's own queue)
- AUTO-DEPLOY: make changes live automatically by default — once a
  task closes committed, pushed and green, run `prompts/deploy.md`
  as part of the close (where the project's `DEV-INFRASTRUCTURE.md`
  → "Deployment" defines a pipeline) instead of waiting to be asked.
  One named switch (e.g. "cautious") restores deploy-on-request.
  The switch is for the deploy side only: commit-and-push is already
  automatic (4.2.0) and task gating is out of scope. Triage
  questions: which of deploy.md's own stops survive the new default
  (a red or dirty tree never ships; a destructive or irreversible
  command — a prod migration, a backfill — still flags and confirms
  before running; post-deploy verification still runs)? Where does
  the switch live — one line in root `AGENTS.md`, a per-invocation
  word, or both? When verification fails after an unattended
  deploy, roll back automatically or stop and report? (source:
  maintainer, 2026-09-22; narrowed the same day from a broader
  "max progress everywhere" capture)
- V2-FIELD-STUDY-ERRATA: two defects in the filed package
  (`self/evaluations/2026-09-24-v2-field-study-1.md`), both missed by
  the Codex review. (1) Section 9 says the Video Helper pairing holds
  on both clauses, but by the R2 field form's own falsification rule
  (v2 lower by 1 point or more) v2's 6/8 against its 7/8 fails the
  score clause: each early pairing fails one clause (Route Plotter on
  size, the Video Helper on score). The verdict — unmatched age, not
  settled — stands; the early signal is weaker than stated. (2)
  Section 8's two icebox rows leave `V2-ICEBOX` rows unread, two of
  them with field evidence: archive splits and memory maintenance
  (V2F-5, D7) and the folded standards templates (standards overflow
  the profile, D1). Correcting a filed package needs the
  maintainer's word; both bear on the V3-SPEC session's R2 and icebox
  rulings. (source: package Q&A session, 2026-09-25)
- V3-SPEC-LAB-PATH: `self/V3-SPEC-SESSION.md` defines `<lab>` as the
  lab checkout's root, but everything it names under `<lab>` (the
  installed v2 ledger, the next-v2 and findings folders,
  RAW-EVIDENCE.md) lives one level down, in the checkout's lab folder. Read literally, the spec
  lands at the checkout root instead of beside next-v2. One-line fix
  to the definition before any rerun. (source: package Q&A session,
  2026-09-25)
