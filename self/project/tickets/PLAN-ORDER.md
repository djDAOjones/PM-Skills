---
id: PLAN-ORDER
name: Development-order planning
status: todo
milestone: icebox
flags: detail
date: 2026-08-18
grades: Medium / Low / Low / Low
order: 7
summary: investigate whether a verb — or other development — earns a place for re-assessing, triaging, and planning the development order: a repeatable pass that re-grades standing items, refreshes hold reasons, re-orders, and refills milestones. INTAKE-DEEP (2026-08-17) is the manual precedent; sibling of VOICE-INTAKE (new-material intake).
---
# PLAN-ORDER — Development-order planning

> **Status:** Icebox — investigation, unblocked; open to a
> maintainer pick. **Grades:** provisional at intake (2026-08-18):
> Medium / Low / Low / Low — the investigation re-grades.

## Intent

Investigate whether a verb — or another development — is useful
for re-assessing, triaging, and planning the development order: a
repeatable pass over the standing backlog that re-grades items,
refreshes hold reasons and triggers, re-orders, and refills the
milestones from the Icebox and wish-list, so the next pick stands
on current judgement rather than stale grades.

## Evidence / context

- INTAKE-DEEP (2026-08-17) was exactly this pass, run once by
  hand: a deep assessment of the Icebox and wish-list with hold
  reasons and grades. The "Last assessed" lines it left in ticket
  bodies are a convention already emerging without a home.
- The present backlog state is the motivating case: Current and
  Next are empty after RECORDS-DIST, so the next pick needs
  maintainer direction — a planning pass would be the structured
  way to refill.
- The validator and janitor already surface staleness (standing
  items past 30 days warn today), but nothing consumes those
  signals into a re-assessment.
- Sibling of VOICE-INTAKE: that item covers intake of new
  material; this one covers re-assessment and ordering of what is
  already recorded.

## Investigation questions

- Shape: a distributed verb versus an extension of the existing
  memory-maintenance or backlog-authoring prompts versus a
  documented cadence note and nothing more.
- Cadence and trigger: maintainer-called on demand, on empty
  milestones (as now), on janitor staleness warnings, or after a
  release arc closes.
- Scope of one pass: re-grade, re-order, refresh triggers, refill
  Current/Next, cut dead items — all of it, or a smaller core.
- Records-mode fit: the pass edits records and `_meta.md` intent
  lines, then regenerates; does the grammar want a formal
  last-assessed field?
- Overlap guard: /next does the pick, the janitor reads state,
  JANITOR-WRITE automates mechanical maintenance — where does
  this sit without duplicating any of them?
- Generality: consuming-project value, or a self/ process note.

## Constraints

- Judgement stays with the maintainer: the verb structures the
  pass and records its outcome; it never auto-decides priorities.
- Prose only — no new scripts unless the investigation proves the
  need.
