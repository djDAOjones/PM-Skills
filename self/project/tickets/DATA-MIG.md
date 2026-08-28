---
id: DATA-MIG
name: Data-migration guidance
status: todo
milestone: icebox
flags: blocked
blocked-on: maintainer confirms the trigger fired — the Derry Lane Notion register, with live states added and hand-run propose/confirm/execute migrations, is a plausible first claimant
date: 2026-07-16
order: 4
summary: hard rule "no irreversible data change without a documented back-out" + DEV-INFRASTRUCTURE section reusing the upgrade snapshot → propose → execute → reconcile shape. Grades when triggered: High / Medium / Low / Low.
---
# DATA-MIG — Data-migration guidance

Record only — the summary is the item; no working detail yet.

Last assessed 2026-08-17 (INTAKE-DEEP): hold — trigger unfired; no
consuming project carries persistent user data (the R1 Hub evidence
is memory-records evidence, not user data).

Re-assessed 2026-08-28 (run-two triage): the hold's premise is now
questionable. The Derry Lane register is persistent product data —
346 → 357 issues, schema evolution (a new capture state added), and
hand-run propose → confirm → execute migrations (F-13/F-14) that are
exactly the shape this item would codify. The record was last judged
before that evidence was filed (2026-08-23). Held in the Icebox, but
the blocked-on is now a maintainer confirm, not an unfired trigger;
`brief.md` → "Out of scope" carries the matching deferral line and
changes with this item when it opens.
