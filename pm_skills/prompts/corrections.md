# Drift Corrections

Use these to redirect the agent when it wanders off track.

- **Stay in design mode** — Pause. Stay in design mode only. No code yet.
- **Tighten scope** — Tighten scope to the smallest useful change. No speculative refactors.
- **Re-ground in codebase** — Re-ground in the actual codebase. Search the project files and cite what you find.
- **Respect architecture** — Preserve the existing architecture. Don't move responsibilities between modules without strong evidence.
- **Reset to plan** — Return to the approved implementation plan. Don't add steps we didn't agree on.

---

## Update project memory (end of every task)

After implementation, update the following files:

- `pm_skills/project/backlog.md` — move this task to the Completed section, note any follow-up tasks in Active.
- `pm_skills/project/file-map.md` — add or update entries for files created or changed.
- `pm_skills/project/decision-log.md` — record the key design decision from this task.
- `pm_skills/project/conventions.md` — if new conventions were established or existing ones changed.
- `README.md` — if architecture, dev workflow, or key infrastructure changed significantly.
- `AGENTS.md` — if this task established new invariants, data model changes, protected modules, event namespaces, or anti-patterns. Check whether AGENTS.md still reflects current architecture and conventions.
- `UI-STANDARDS.md` — if this task established new token systems or UI conventions.
- `DEV-INFRASTRUCTURE.md` — if this task changed build, dev server, versioning, or script conventions.
