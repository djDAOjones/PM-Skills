---
description: Run a fast two-stage workflow without approval gates
---

Compressed two-stage workflow for small or low-risk tasks. No
approval gates.

- **Stage 1** — quick scope and implementation plan in one pass.
- **Stage 2** — implementation, validation against acceptance criteria,
  verification with build/tests, and project-memory housekeeping.

Where the gated workflows would wait for the user to approve scope or
plan, instead make the best conservative decision, state the
assumption in one line, and continue. Only stop to ask the user a
question if there is a genuinely blocking ambiguity that cannot be
safely assumed.

Conservative defaults to use when no user input is available:
- Prefer the smallest useful scope.
- Prefer existing patterns and existing files over new abstractions.
- Prefer reversible changes; flag irreversible ones explicitly.
- If the task is clearly larger than a quick task while planning,
  stop and recommend switching to `auto-jazz` (or `feature.md` if the
  user wants approval gates).

1. State the goal.
   One sentence: what the user asked for.

2. Read project context.
   Read:
   - `AGENTS.md`
   - `UI-STANDARDS.md` (if the task touches UI)
   - `DEV-INFRASTRUCTURE.md` (if it exists)
   - `pm_skills/project/brief.md`
   - `pm_skills/project/architecture.md`
   - `pm_skills/project/conventions.md` (if it exists)
   - `pm_skills/project/file-map.md`
   - `pm_skills/project/backlog.md`
   - `pm_skills/project/decision-log.md` (if the
     task involves design decisions or you need context on prior choices)

--- STAGE 1: SCOPE + PLAN (no approval gate) ---

3. Combined scope and plan.
   Read `pm_skills/prompts/quick-task.md` and follow
   its instructions. Search the source tree to confirm affected files
   before writing the plan. Output:
   - What needs to change and why
   - Files to create or modify, with one-line purpose each
   - Step-by-step implementation sequence
   - Watchouts
   - Acceptance criteria

   State the chosen scope in one line as an assumption and continue
   to Stage 2. Do not wait for approval.

--- STAGE 2: IMPLEMENT + CLOSE (no approval gate) ---

4. Implement.
   Implement the plan from step 3. Follow the minimal-change
   discipline in `AGENTS.md`. Keep imports at the top of files.
   Match existing style. Do not introduce runtime dependencies
   without an explicit assumption noted in step 3.

5. Validate against acceptance criteria.
   Re-read the acceptance criteria from step 3 and confirm each one
   is met by the changes. If a criterion cannot be met, stop and
   report which one and why before continuing.

6. Verify with build and tests.
   - Run the project's build and test steps if available. If not,
     verify manually and note what was checked.
   - Check the watchouts from step 3 — confirm none have triggered.
   - Report what was run, what passed, and any open issues.

--- CLOSE TASK ---

7. Update project memory.
   After implementation is verified, update:
   - `pm_skills/project/backlog.md` — move this task to the
     Completed section, note any follow-up tasks in Active.
   - `pm_skills/project/file-map.md` — add or
     update entries for files created or changed.
   - `pm_skills/project/decision-log.md` — record
     the key design decision from this task (including the
     assumption made in step 3) if the task involved any design
     choice worth remembering.
   - `pm_skills/project/conventions.md` — if new
     conventions were established or existing ones changed.
   - `README.md` — if architecture, dev workflow, or key
     infrastructure changed significantly.
   - `AGENTS.md` — if this task established new invariants, data model
     changes, protected modules, event namespaces, or anti-patterns.
   - `UI-STANDARDS.md` — if this task established new token systems or
     UI conventions.
   - `DEV-INFRASTRUCTURE.md` — if this task changed build, dev server,
     versioning, or script conventions.

   Then run the memory size check (see AGENTS.md → "Memory size budgets"):
   word-count each hot whole-read file, count Completed items in
   `backlog.md`, count entries and check oldest date in
   `decision-log.md`. If any budget is exceeded, output one line per
   overrun and propose running `pm_skills/prompts/prune-memory.md`.
   Do not auto-prune.

   Report the memory updates and the size-check result to the user.
