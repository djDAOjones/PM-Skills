# End of Task

Run this at the end of every task session, after implementation
and verification are complete. This is the canonical housekeeping
ritual. The integration workflows reference this file rather than
duplicating its contents.

## 1. Update project memory

Update each of the following if relevant to this task:

- `pm_skills/project/backlog.md` — move this task to the Completed
  section, note any follow-up tasks in Active.
- `pm_skills/project/file-map.md` — add or update entries for files
  created or changed.
- `pm_skills/project/decision-log.md` — record the key design
  decision from this task.
- `pm_skills/project/conventions.md` — if new conventions were
  established or existing ones changed.
- `README.md` — if architecture, dev workflow, or key infrastructure
  changed significantly.
- `AGENTS.md` — if this task established new invariants, data model
  changes, protected modules, event namespaces, or anti-patterns.
  Check whether `AGENTS.md` still reflects current architecture and
  conventions.
- `UI-STANDARDS.md` — if this task established new token systems or
  UI conventions.
- `DEV-INFRASTRUCTURE.md` — if this task changed build, dev server,
  versioning, or script conventions.

## 2. Run the memory size check

Budgets are defined in `AGENTS.md` → "Memory size budgets". Do not
duplicate the numbers here.

- Word-count each hot whole-file read in `pm_skills/project/` plus
  `README.md`.
- Count Completed items in `backlog.md`.
- Count entries in `decision-log.md` and check the oldest entry's
  date.

If any budget is exceeded:

- Do not auto-prune.
- Output one line per overrun: which file, which budget, current value.
- Propose running `pm_skills/prompts/prune-memory.md` and wait for
  user approval.

## 3. Report

Output a one-line summary:

- Which memory files were updated.
- Which budgets were checked.
- Whether any tripped (and the proposal made if so).

Present the report to the user before closing the task.
