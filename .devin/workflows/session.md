# Devin session — pm-skills framework repository (self-hosted)

This repo self-hosts its own development on the standard pm-skills
loops. This shim is the Devin sibling of
`.windsurf/workflows/next.md`: it defers to the distributed
workflow rather than re-copying steps.

1. Run `pm_skills/integrations/next.md` with the `self/` path
   mapping from the root `AGENTS.md` applied throughout: wherever
   it says `pm_skills/project/<file>`, read/write
   `self/project/<file>`. The gate and scripts are per
   `self/DEV-INFRASTRUCTURE.md`; `UI-STANDARDS.md` does not apply.
2. Verify before trusting: reconcile `pm_skills/VERSION`, the top
   `pm_skills/CHANGELOG.md` entry, and `git status` before building
   on any memory claim. Fix drift first.
3. When the picked item touches distributed files (`pm_skills/**`),
   close per the framework release checklist in the root
   `AGENTS.md` → "End-of-task extension" as well as
   `end-of-task.md`. Commit and push per the close convention.
