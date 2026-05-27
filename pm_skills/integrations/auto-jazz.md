---
description: Run the full design-before-code workflow without approval gates
---

Run the same internal stages as `feature.md` — scoping, design options,
implementation plan, validation, implementation, verification, and
project-memory housekeeping — but do not pause for user approval.

Where `feature.md` would wait for the user to approve scope, choose an
option, approve a plan, or confirm readiness, instead make the best
conservative decision, state the assumption in one line, and continue.
Only stop to ask the user a question if there is a genuinely blocking
ambiguity that cannot be safely assumed (and then ask one concise
question, not a list).

Conservative defaults to use when no user input is available:
- Prefer the smallest useful scope over the broader one.
- Prefer the recommended option from `design-options.md`.
- Prefer existing patterns and existing files over new abstractions.
- Prefer reversible changes; flag irreversible ones explicitly.
- If a check in stage 4 trips a real risk, narrow scope rather than
  push through.

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

--- FULL 4-STAGE WORKFLOW (no approval gates) ---

3. Scoping (stage 1).
   Read `pm_skills/prompts/scoping.md` and follow
   its instructions. Search the source tree to confirm affected files.
   Output the scoping deliverables:
   - Problem framing
   - Affected areas
   - Key design decisions
   - Risks and dependencies
   - Smallest useful scope
   - Out of scope
   - Target file list
   - Open questions — only if genuinely blocking

   State the chosen scope in one line as an assumption and continue.
   Do not wait for approval.

4. Design options (stage 2).
   Read `pm_skills/prompts/design-options.md` and
   follow its instructions. Produce 2–3 design options with:
   - Summary, affected files, architectural fit, data flow, benefits,
     risks
   - A recommended option with rationale

   Pick the recommended option. State the choice in one line as an
   assumption and continue. Do not wait for the user.

5. Implementation plan (stage 3).
   Read `pm_skills/prompts/implementation-plan.md`
   and follow its instructions. Output:
   - Ordered file list with purpose
   - Data flow or architectural changes
   - New abstractions (with justification) or explicitly none
   - Tests to write or update
   - Step-by-step implementation sequence
   - Acceptance criteria
   - Watchouts
   - Files not to touch

   Continue without waiting for approval.

6. Validation (stage 4).
   Read `pm_skills/prompts/validation.md` and
   follow its instructions. Output:
   - Design sanity checks
   - Architecture checks
   - Regression risks
   - Test coverage assessment
   - Edge cases
   - Signs the scope is too large

   If a check surfaces a blocking concern (likely regression, broken
   invariant, or scope obviously too large), stop and ask one concise
   question. Otherwise, state "Validation passed" in one line and
   continue.

--- IMPLEMENT ---

7. Implement.
   Implement the plan from step 5. Follow the minimal-change
   discipline in `AGENTS.md`. Keep imports at the top of files.
   Match existing style. Do not introduce runtime dependencies
   without an explicit assumption noted in step 5.

--- VERIFY ---

8. Verify.
   - Run the project's build and test steps if available. If not,
     verify manually and note what was checked.
   - Confirm each acceptance criterion from step 5 is met.
   - Check the regression surface identified in step 6.
   - Report what was run, what passed, and any open issues.

--- CLOSE TASK ---

9. Update project memory.
   After implementation is verified, update:
   - `pm_skills/project/backlog.md` — move this task to the
     Completed section, note any follow-up tasks in Active.
   - `pm_skills/project/file-map.md` — add or
     update entries for files created or changed.
   - `pm_skills/project/decision-log.md` — record
     the key design decision from this task (including the
     assumptions made in steps 3–5).
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
