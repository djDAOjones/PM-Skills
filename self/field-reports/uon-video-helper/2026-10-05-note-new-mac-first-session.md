<!-- field-report: project=uon-video-helper · date=2026-10-05 · type=note
     · pm-skills=pm-next-v3 (lab/next-v3 at 155f145; INTAKE d2f94fe, 2026-10-02)
     · source=maintainer note, written by Claude Code (Opus 5.5) in a
       session opened in the canon repository, working in the project's
       checkout by path; nothing private quoted -->

# UoN Video Helper — the first session on a new Mac, and what v3's close caught

## Context

The maintainer's first attended session on a new Mac, in the Claude
Code desktop app. The session was opened in the canon repository and
worked in the project's OneDrive checkout by absolute path, so the
project's own `CLAUDE.md` and session hooks were not loaded for it. It
ran the lab's prepared first-session checklist (V3-ROLLOUT, Phase B
step 2 with the project's first-session prompt), then three closes,
all under the ID `V3-CONFIRM`, each pushed to `main` and the working
branch:

| Commit | What |
| --- | --- |
| `dbba144` | The owner confirms the OneDrive checkout (pinned, `core.fileMode` false) as the working copy; the rules' Environment line loses "work in a clone outside it [guess]". |
| `0f72350` | A correction after a read-only Codex Astra check returned BLOCKING; the owner chose a "detect and report" guard against sync interference. |
| `b161289` | "Prose: en-GB" confirmed, the last intake guess; `V3-CONFIRM` closes; the session's end. |

Gate at every close: the project's `npm run check` green (64 test
files, 957 tests, one long-standing skip) and `node tools/check.mjs`
with 0 failures.

## Observations

1. **A prepared prompt in the wrong workspace failed safe.** The
   checklist was first pasted into the canon repository's session. It
   named its own expected state — branch, commit, a `samples/` folder,
   a rules line — so every read-only check failed and the session
   stopped, as the checklist told it to, before any write. Cost: one
   round trip. A first-session prompt that states the state it expects
   is cheap protection against being run in the wrong place.

2. **A census row's force was lost at confirmation, not at migration.**
   The working-copy line came from canon's hostile-filesystem guard
   (the migration census, row C60), which named two hazards —
   dehydration, and sync reverting tracked files or leaving conflict
   copies — and two protections (pause syncing, or exclude `.git`).
   The intake carried it as a `[guess]`. When the owner confirmed the
   OneDrive checkout, the session's edit kept the dehydration half and
   dropped the other, and its decision said pinning met "the canon
   hazard". A Codex Astra check briefed from the record, as the close
   verb's step 6 describes, found it and called it blocking. The owner
   chose to detect and report (with a twelve-hour sync pause on the
   side), recorded in `0f72350`. A second model briefed from the record
   found a real defect in a record-only change.

3. **A negative claim in a `Verify:` line was false.** `dbba144` said
   "no Codex check, Codex not installed on this Mac". The session had
   checked only the shell's `PATH`; Codex had been installed in
   `~/.local/bin` forty minutes earlier. Corrected forward in the next
   entry, pushed history untouched. The checker's own caveat — a
   declaration is not proof of execution — holds for claims of absence
   too.

4. **The session-end trigger was missed once.** The session passed the
   profile's Session line (200k tokens of context) before `0f72350`
   without noticing, so that close should have been its last and
   carried a `Session-end:` line. The project's session hooks would
   have warned, but a session rooted in another folder runs without
   them. The owner then directed one more close, which carried the line
   and recorded the miss. The sensor 3.15 relies on is per folder, and
   a cross-folder session has none.

5. **Friction met in the v3 ledger tools at close:**
   - `Supersedes:` takes exactly one exact heading. A correction that
     partly reversed two earlier entries (the intake's proposed line and
     the `[guess]` the 2026-10-02 entry kept) could name only its own
     predecessor and cite the others in prose.
   - Rule 6's trajectory line for an ID that never had a backlog line:
     Codex read it as due at the first close, the session read it as
     due at finishing, and the line was written at the real close under
     a new "V3 adoption" phase heading. The trajectory had no phase for
     intake-time IDs.
   - The item-file path check reads any backticked token containing a
     slash as a local path, so a branch name warned until it was written
     without backticks.
   - A retired wish line is traced only by a commit-body line that
     quotes the whole wish verbatim.

6. **Harness facts on the new Mac.** The project's SessionStart hook
   ran when a Video Helper chat was reopened: its state file was
   created at 01:00:01, with an offset equal to the transcript's size.
   PostToolUse was not yet confirmed on the new Mac. The project's
   sandbox allows only `github.com` and `registry.npmjs.org` and
   excludes only `gh`, so a session in that folder cannot run
   `codex exec`. A Handoff that names Codex as the reviewer needs Codex
   excluded as `gh` is.

7. **Two owner instructions lived outside the record.** The
   2026-10-02 entry's request for a `/hooks` check, and the location of
   VH-105's saved work (a backup branch, stated in chat), were
   recorded at the session end as a wish line and an item note.

## What to compare later

Whether the next session in the project's own folder confirms
PostToolUse, records a ruling on Codex and the sandbox, and starts
product work. The trial's bar is 30 commits per project by 2026-10-23,
and this session added three, all record changes.
