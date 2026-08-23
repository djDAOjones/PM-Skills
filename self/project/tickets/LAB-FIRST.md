---
id: LAB-FIRST
name: Work the lab before this repo
status: todo
milestone: current
flags: ALERT, maintainer, detail
blocked-on: 
date: 2026-08-23
grades: 
order: 0
summary: maintainer standing order (2026-08-23) — before picking any new work here, run the lab arc (djDAOjones/PM-Skills-lab, checkout in CascadeProjects): UPSTREAM-ASSIM first, then R2 parallel-run preparation for the two-arm test on the next real project. Exceptions in the ticket. Cleared only by the maintainer.
---

# LAB-FIRST — work the lab before this repo

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
