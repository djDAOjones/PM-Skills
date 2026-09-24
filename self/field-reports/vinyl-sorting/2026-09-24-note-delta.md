<!-- field-report: project=vinyl-sorting · date=2026-09-24 · type=note
     · pm-skills=pm-next-v0.2 (lab/next of djDAOjones/PM-Skills-lab at 530637a, vendored 2026-08-30; no canon release governs it)
     · source=harvested from the maintainer's checkout and the Claude Code and Codex session stores by Claude Code (self/FIELD-HARVEST.md, run of 2026-09-24, capture cut-off 2026-09-24T11:40:00Z)
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note
     · retained=project and tool names only; everything else of this delta is in the local lane -->

# Delta note — vinyl sorter, 2026-09-24

The refresh of this directory's archive since the 2026-09-09 harvest.
Everything below is an observed fact recorded at harvest time; nothing
here is an evaluation.

## Why now, and a change of lane

The field-harvest run of 2026-09-24 found 168 commits and 384 sessions
the archive did not hold. It also found that the source repository
(`djDAOjones/vinyl-sorting`) is **private** on 2026-09-24, although the
tier README recorded it as public when the 2026-09-09 exports were
filed in the tracked lane. Every export of this delta is therefore in
`local/`; the README row is corrected; the files already tracked since
2026-09-01 and 2026-09-09 are left where they are, and whether they
should be withdrawn is put to the maintainer in the run's report.

## What moved since the filed snapshot (`60c3c4b`)

| Test | Result |
| --- | --- |
| History | 168 commits from `60c3c4b` to `06f6c90` (2026-09-23 22:03 +0100); 321 files changed, 50,081 insertions, 2,000 deletions |
| Memory (`project/`) | 83 files changed, 14,802 insertions, 533 deletions; 82 files, 1,235,574 bytes at HEAD, `decision-log.md` 241,530 of them, the rest mostly dated evidence folders under `project/evidence/` |
| Working tree | one untracked entry before and after: `attempt-wt/`, a Git worktree created 2026-09-23 14:30 with a detached HEAD at `5afcb28` — an ancestor of `main`, so the bundle holds it |
| Framework | unchanged: pm-next v0.2; the canon `pm_skills/` tree (VERSION 4.9.2) recorded on 2026-09-09 is still on disk, now ignored by `.gitignore` |
| Sessions | 384 not in any filed archive, none grown, 34 already filed unchanged |

Commit shape at HEAD: 283 commits from 2026-08-30 10:07 to 2026-09-23
22:03; 245 subjects open with an item ID, 277 bodies carry a
`Verify:` line, 248 a co-author trailer; one author identity.

The project's own tools, run at harvest on a clean archive of
`06f6c90` under a write-confining sandbox: `check-memory` exit 0 with
20 warnings and 3 OK lines; `gen-backlog --check` exit 0. The janitor
report the project last left is dated 2026-09-22 11:02 UTC (start SHA
`ebe83eb`), filed as found.

## Sessions taken (`local/2026-09-24-sessions.tar.gz`)

462 files, 1,055.3 MB uncompressed, 489.6 MB compressed — photo-reading
rollouts embed images, as the last harvest recorded.

| Store | Taken | Notes |
| --- | ---: | --- |
| Claude Code | 25 | 24 in the checkout's directory, opened from 2026-09-09 onwards, plus one Claude Desktop scratch session (2026-09-20) whose one prompt concerns this project's folder leaving the sidebar |
| Codex, live | 350 | 146 in the checkout; 192 launched from Claude Code scratchpads of vinyl sessions (review and capture runs of 2026-09-20 to 09-23); 12 in `/private/tmp` launched from vinyl sessions on 2026-09-20 |
| Codex, archived | 9 | the store no earlier harvest read |

Model mix across the 418 attributed sessions: Claude Code
`claude-opus-5` 36, `claude-fable-5-1` 2; Codex `gpt-6-astra` 228,
`gpt-5.6-sol` 50, auto-review 30; 72 rollouts record no model in their
opening (imports of Claude Code chats, and spawned threads).

One further `/private/tmp` rollout — a one-word readiness check started
19 minutes before those runs, with no parent and no project reference —
was left unattributed on the second witness's advice (Checkpoint B).

The secrets scan found bearer tokens in 255 archived members: the
`Authorization: Bearer` header Codex's GitHub integration passes to
`git push`. Byte-verbatim, local, and named in the manifest.

## Where things are (all in `local/`)

- `2026-09-23-export-memory.md`, `-export-rulebooks.md`,
  `-export-state.md`, `-export-git-log.md`;
  `2026-09-24-export-inventory.md`.
- `2026-09-24-validator.md`, `2026-09-22-janitor.md`.
- `2026-09-23-repo.bundle` and its manifest — every ref at the cut-off.
- `2026-09-23-export-agent-memory.md`, `2026-09-24-export-prompts.md`.
- `2026-09-24-sessions.tar.gz` and manifest.

## What to compare later

- The decision log (103 live entries at HEAD, per the project's own
  validator) against the v0.2 contract's budget, and against how the
  lab's v2 handles the same shape.
- The 192 scratchpad-launched Codex runs against the Claude Code
  sessions that launched them: which reviews were asked for, and when.
- This project stays on v0.2 by the maintainer's decision of 2026-09-15
  ("keep … unchanged for comparison evidence"); the v2 intakes filed in
  this run are the other side of that comparison.
