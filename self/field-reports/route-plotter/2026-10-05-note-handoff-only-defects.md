<!-- field-report: project=route-plotter · date=2026-10-05 · type=note
     · pm-skills=pm-next-v3 (lab/next-v3 at 155f145; INTAKE d4fc702, 2026-10-02)
     · source=maintainer note, written by Claude Code (Opus 5.5) in a
       session opened in the canon repository; read-only in the
       project, which its own sessions were working at the time;
       nothing private quoted -->

# Route Plotter — defects that lived only in a handoff file, and a cross-session relay

## Context

On the maintainer's first day on a new Mac, a Route Plotter session
reported that 23 pieces of found work had no backlog line. The canon
repository's session checked where they lived and whether anything had
been lost, then passed the owner's request to record them to Route
Plotter's own sessions. It never wrote in the project's checkout. The
work in question came from the canon-era "big run" (2026-09-28 to
2026-10-01), before the project moved to v3 on 2026-10-02.

## Observations

1. **Found work outside the record is invisible under rule 2.** The
   big run found 21 defects — DEF-50, 51, 54–58, 60, 62, 63 and
   65–75 — and opened pull requests for DEF-53 (#64) and DEF-64 (#77)
   without backlog lines. All of it was written in the run's handoff
   file, kept in Claude Code's per-project store outside the
   repository. The v3 contract's rule 2 forbids a session fetching a
   record from outside the repository, so to every later session that
   work did not exist. Rule 5 ("deferred work is a line") can be checked
   only over the repository. A run that keeps its working state outside
   it — a handoff file, a scratchpad — has to write its found work into
   the record before it hands over, not after.

2. **Nothing was lost, but much of it was one disk away.** The handoff
   file, the run's notes and log, the agent transcripts and the 07:27
   patch backup existed on both machines; session-log retention is 365
   days. The old Mac's Codex rollouts, which hold the review reports,
   existed only on its disk (the new Mac's `~/.codex/sessions` held
   two), while the handoff still named the old path. They were copied
   to the new Mac and checked by file count and size. The 2026-10-01
   reboot losses themselves are already archived as this project's
   2026-10-03 salvage (local lane).

3. **A cross-session relay has three hazards.**
   - A request sent to a session that had just ended its turn, asking
     the owner for a fresh chat, woke it about two minutes later, after
     its replacement had started. The request was withdrawn and resent
     to the replacement. The woken session had queued the work in its
     handoff and stopped; it changed no repository file.
   - It edited the handoff 16 seconds after the replacement had read
     it, so the replacement's copy was stale. A handoff edited after
     handover needs a notice to whoever has already read it.
   - It told the owner a Codex review of pull request #82 "is still
     running"; the review had finished half an hour earlier with a
     blocking verdict. A process's state is checked, not remembered.

   Message the project's current writer, not the last one.

4. **The OneDrive checkout showed 471 modified files,** all
   permission-only after OneDrive restored them. `core.fileMode` was
   still true there. Setting it false, as the lab's rollout prompt asks
   for all three working copies, was left to the project's own
   sessions.

5. **The request landed where the run's own order put it.** The
   replacement's prompt already listed reconciling the backlog with the
   handoff as its third step, after a release. The owner's request was
   the same task, and it was said so to avoid a second ordering.

## What to compare later

Whether the 23 lines reach the backlog as step 3 says, and whether the
big run's fourteen canon-era pull requests land under v3 with their
findings recorded in the project rather than in a handoff file.
