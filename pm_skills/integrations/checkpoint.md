---
description: Run the design-before-code workflow with gates only at scope and design pick
---

The recommended default for non-trivial tasks. Same four internal
stages as `feature.md`, but it stops for user approval only at the two
points where human judgement adds value:

- **Gate 1 — Scope.** Confirm the problem framing and the smallest
  useful scope before any design work.
- **Gate 2 — Design pick.** Choose (or confirm) the design option.

The implementation plan and validation stages then run gateless, like
`auto-jazz.md`: make the best conservative decision, state each
assumption in one line, and continue. This matches how the stages are
actually consumed — scope and option choice are judgement calls; plan
and validation approvals are usually rubber stamps that cost a full
round-trip each.

Positioning: `feature.md` = 4 gates (use for `[sign-off]` items or
when the user asks), **`checkpoint.md` = 2 gates (default)**,
`auto-jazz.md` = 0 gates, `auto-jazz-lite.md` = 0 gates + compressed
stages.

Conservative defaults and **hard prohibitions** are exactly those
listed in `pm_skills/integrations/auto-jazz.md` — read them there and
honour them in the gateless stages. If a prohibited action is needed,
stop and ask one concise question.

1. State the goal.
   One sentence: what the user asked for.

2. Read project context.
   Load the standard project context per `AGENTS.md` → "Before every
   task". If `AGENTS.md` is not loaded as a global rule, read it now.
   Also read `pm_skills/project/backlog.md` (Active section) and scan
   `pm_skills/project/decision-log.md` (latest 10 headings; open only
   relevant bodies).

--- GATED: THE TWO JUDGEMENT CALLS ---

3. Scoping (stage 1). (gate)
   If scoping reveals this is actually a **small task** (one or two
   files, no design choice worth exploring), say so and switch to the
   `pm_skills/prompts/quick-task.md` path (one gate: the combined
   scope-and-plan) instead of running four stages on it.

   Otherwise read `pm_skills/prompts/scoping.md`, follow its
   instructions, and produce the deliverables it lists. Search the
   source tree to confirm affected files.

   Present the scope. **Wait for approval before continuing.**

4. Design options (stage 2). (gate)
   Read `pm_skills/prompts/design-options.md`, follow its
   instructions, and produce the deliverables it lists.

   Present the options with a recommendation. **Wait for the user to
   pick.**

   Resume insurance: if implementation is likely to span sessions (a
   large plan, an expected handover, or a long-running task), persist
   the approved scope and the picked option — a few lines each — to
   `pm_skills/project/tickets/<ITEM-ID>.md` (add the `[detail]` flag
   per `scoping.md`) before implementing, so an interrupted run
   resumes without re-deriving them. Skip this for tasks that will
   finish in-session — it is insurance, not ritual.

--- GATELESS: PLAN, VALIDATE, IMPLEMENT ---

5. Implementation plan (stage 3).
   Read `pm_skills/prompts/implementation-plan.md`, follow its
   instructions, and produce the deliverables it lists.

   State any assumption in one line and continue. Do not wait.

6. Validation (stage 4).
   Read `pm_skills/prompts/validation.md`, follow its instructions,
   and produce the deliverables it lists.

   If a check surfaces a blocking concern (likely regression, broken
   invariant, scope obviously too large), stop and ask one concise
   question. Otherwise state "Validation passed" in one line and
   continue.

7. Implement.
   Implement the plan from step 5. Follow the minimal-change
   discipline in `AGENTS.md`. Keep imports at the top of files. Match
   existing style.

8. Verify.
   - Run the project's quality gate (`check`) if available — or its
     build and test steps. If neither exists, verify manually and note
     what was checked.
   - Confirm each acceptance criterion from step 5 is met.
   - Check the regression surface identified in step 6.
   - Report what was run, what passed, and any open issues.

--- CLOSE TASK ---

9. End-of-task housekeeping.
   Run the procedure in `pm_skills/prompts/end-of-task.md`. When
   recording the decision-log entry, include the assumptions made in
   the gateless stages. Present the closing report to the user.
