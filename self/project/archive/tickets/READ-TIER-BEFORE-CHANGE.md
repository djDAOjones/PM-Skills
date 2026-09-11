---
id: READ-TIER-BEFORE-CHANGE
name: Read tier is "before your first change", as agents actually do it
status: todo
milestone: current
flags: detail
date: 2026-09-11
grades: High / High / Low / Low
order: 1
summary: reword the session-start read tier (session-start.md, templates/AGENTS.md) to require the hot reads before the first code change rather than as the first act, matching what every measured session did — 90–100% read memory before editing, 0–25% first thing (FIELD-PM-GRADING; CLEANROOM-AB Amendment 3). Patch release.
---
# READ-TIER-BEFORE-CHANGE — the read tier, timed as agents keep it

## Intent

The contract says "before every task" and lists hot whole-file reads.
Three studies show what agents actually do: orient in the code first,
then consult project memory before the first edit — shipped sessions
90–100% before the first change, 0–25% within the first three calls,
on both Claude Code and Codex, canon and pm-next alike. The ritual is
being kept in substance and broken in letter. Reword the tier so the
letter matches: the hot reads must happen *before the first change to
the tree*, and the wording says so; the tier's contents stay. Note the
evidence in the prompt's own comment so a future edit knows why.

## Done when

- `pm_skills/prompts/session-start.md` and
  `pm_skills/templates/AGENTS.md` say "before your first change" (and
  keep every file in the tier).
- Patch release (wording; no new files), CHANGELOG entry with the
  upgrade action "re-copy the two files".
- Evidence cited: FIELD-PM-GRADING (2026-09-11), CLEANROOM-AB findings
  (Amendment 3).
