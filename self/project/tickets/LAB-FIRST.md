---
id: LAB-FIRST
name: The lab is the one workspace until R3
status: todo
milestone: current
flags: ALERT, maintainer, detail
blocked-on: 
date: 2026-08-23
grades: 
order: 0
summary: RESUMED by the maintainer 2026-10-05, reworded — the lab (djDAOjones/PM-Skills-lab, checkout in CascadeProjects) is the one workspace for pm-skills and v3 work until the R3 migration decision. Open sessions there, not here. This repository is written only by lab sessions, for field evidence and evaluations, and by the weekly session-log archive task; no new canon work. Gate-forced fixes still run. Only the maintainer clears this.
---

# LAB-FIRST — the lab is the one workspace until R3

## Resumed and reworded (2026-10-05)

The maintainer resumed this order on 2026-10-05 and reworded it, after
asking whether the lab or this repository should be the one place
where work happens ("either is fine … use one or the other, not
both"). The answer: the lab. This section governs; the sections below
are the order's history.

- **Where sessions open:** the lab checkout under `CascadeProjects`,
  for every pm-skills and pm-next v3 task — specification, the field
  trial, the rollout, harvests and evaluations. No session is opened
  in this repository.
- **What still writes here:** lab sessions, filing into
  `self/field-reports/` and `self/evaluations/` under this
  repository's rules (the V3-SPEC-PROMPT and FIELD-NOTES-V3
  precedents), and the weekly session-log archive task, which writes
  only into the ignored local lanes. Gate-forced fixes (a red
  `npm run check`) still run.
- **What does not:** new canon work. Consuming projects still on
  canon move to v3 through the lab's rollout, not through canon
  releases.
- **Why the lab:** its contract makes it the quarantined fork where
  the successor is decided. Changes travel here only when R2 and R3
  are granted, and the trial deciding them is under way. It is
  private and outside cloud sync. The v3 product, its ledger, the
  migration tools and the rollout plan already live there.
- **Cleared when:** the maintainer decides R3, or says so sooner.
  Only the maintainer clears or rewords this record.

## Paused (2026-08-27)

The maintainer paused this order until further notice. It no longer
gates the queue: the `ALERT` flag is withdrawn and the record has
moved to the Icebox, so canon work may be picked normally. Nothing
about the order's content is retracted — it resumes intact whenever
the maintainer says so, and only the maintainer resumes or clears it.

What changed underneath it while it stood:

- **UPSTREAM-ASSIM shipped** 2026-08-24 (lab `cf4cef2`); upstream is
  merged to 4.9.2 and pm-next is v0.2, installable.
- **The R2 leg did not run.** It was planned as a two-arm test on the
  University of Nottingham video-helper app. That app was built —
  108 commits over four days — but on **canon 4.9.2**, not pm-next.
  It was sourced from the lab fork, so its README links there, but
  no `pm-next` artefact exists anywhere in its tree. It is therefore
  a second incumbent run, like Derry Lane before it, and is spent as
  an R2 subject. Evidence:
  `self/field-reports/uon-video-helper/2026-08-27-note-deployment-snapshot.md`
  → "Provenance, stated precisely"; recorded in decision-log
  2026-08-27 (FIELD-HARVEST).
- **R2 now needs a fresh project.** The lab's own memory still
  records the video-helper as the planned subject; correcting that is
  a lab-side task, not canon work.

## The order

Maintainer standing order (2026-08-23): before picking any new
work in this repository, switch to the lab fork
(`djDAOjones/PM-Skills-lab`; local checkout under
`CascadeProjects`, outside cloud sync) and run its queue —
UPSTREAM-ASSIM first (merge and rule on the 4.6.0 → current
delta), then the R2 arc: parallel-run preparation and the planned
two-arm test on the next real project (a university video-helper
app, spec expected within about a week of 2026-08-23).

## Why

The R2 gate needs pm-next tested on a real project against the
incumbent at its current best — and the lab is behind upstream.
Every canon change made before the assimilation widens the very
delta the lab must absorb and stales the survey hints riding on
its UPSTREAM-ASSIM ticket. See decision-log 2026-08-23.

## What still runs here

- Gate-forced maintenance: a red `npm run check` or validator
  FAILs get fixed regardless.
- Work the lab arc itself requests of upstream (the lab consumes
  releases; nothing reaches canon by any other route).
- VOICE-INTAKE stays blocked on its maintainer inputs as before —
  unaffected by this alert, and not an excuse to pick other work.

## Cleared when

The maintainer removes this record once the lab arc is underway
or done. Nobody else clears it; sessions never treat it as stale.
