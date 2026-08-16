# JANITOR-READ — Background maintenance reporter

> **Status:** Current #1 · **Grades:** Medium / Low-Med / Low /
> Medium.

## Intent

Session-start stops computing its nags and reads a standing report
instead. A scheduled (or manually run) janitor pass computes what
the ritual currently computes per session — validator output,
reconcile counts, standing-item ages, doc-deltas debt, attention
counters — into a dated report file. Continuous-core's cheapest
organ, shipped read-only.

## Done when

- A janitor script produces a dated `latest.md` report in a new
  reports directory under self/project (carrying its own Start SHA
  and timestamp), built from the
  validator plus the git-derived counts.
- `pm_skills/prompts/session-start.md` reads a fresh report (under
  ~24 h) instead of computing; a stale or absent report falls back
  to computing — the staleness contract is mandatory, since a stale
  report is worse than none.
- Scheduling is documented for at least one harness (a scheduled
  task or cron line), with manual runs equally valid.

## Evidence / context

`check-memory.mjs` already computes budgets, trailers, ages, and
counters — the janitor is a wrapper plus a file, not new analysis.
RQ8-SCAN: native schedulers exist in every major harness. The
continuous-core fiction names this as the first stream. The
original trigger ("an autonomous-loop deployment") has effectively
fired: development already runs as repeated autonomous sessions.

## Approach

1. A `janitor-read.mjs` sibling in the scripts directory: run the
   validator, append the
   reconcile/ages/doc-deltas lines session-start specifies, stamp
   timestamp + SHA, write the report (previous report overwritten —
   git history keeps the trail).
2. Distributed edit (release): session-start's preflight/nag steps
   gain the read-the-report-if-fresh path with fallback.
3. Repo wiring: root `AGENTS.md` notes the report as a hot
   sectional read when fresh; reports dir joins the cold tier list.

## Constraints

- Read-only forever — writing verbs are JANITOR-WRITE, separately
  gated. Never a gate: the report informs, the validator enforces.
- The report is generated output: never hand-edited, never the
  canonical copy of anything.

## Open questions

- Report retention: latest-only (git keeps history) or dated files
  with an index — lean latest-only.
- Scaffold distribution of the script: after it proves here, per
  the MEM-CHECK precedent.
