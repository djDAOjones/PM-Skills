---
id: EPIC-AUTOJAZZ
name: Continuous burn-down mode
status: todo
milestone: icebox
flags: detail
date: 2026-08-27
grades: High / High / High / Medium
order: 12
summary: investigate an "epic" auto-jazz mode that keeps developing continuously across the backlog — re-assessing the queue before the run and after each milestone, printing a status table as it goes — instead of stopping after one item. Reopens the burn-down-until-stopped option NEXT-CMD weighed and rejected; init-mvp already does this shape for greenfield.
---
# EPIC-AUTOJAZZ — continuous burn-down mode

> **Status:** Icebox — investigation, unblocked. **Last assessed:**
> 2026-08-27, the first Re-assess since filing. **Grades:**
> provisional at intake (2026-08-27): High / High / High / Medium —
> the risk grade is the point, not a formality.

## Intent

An auto-jazz mode that continues across items rather than stopping
after one: re-assess the backlog before the run and after each
milestone, keep building, and print a table of ticket ID, name,
milestone, description, and status as it goes.

## It reverses a standing decision

- `pm_skills/integrations/next.md` states the constraint outright:
  one item per invocation, and "it never burns down the whole
  backlog unattended".
- NEXT-CMD's archived ticket shows this was chosen, not overlooked:
  "single-item per invocation (recommended — bounded, matches
  'batch' semantics) **vs burn-down-until-stopped**."

So this is the road not taken. The investigation has to argue the
reversal on evidence and say what has changed since.

## The framework already does it once

`init-mvp.md` step 9 burns down milestones: items in dependency
order, a lightweight auto-jazz loop each, a commit after each
completed milestone as a rollback checkpoint, up to a band ceiling
the band sign-off already authorised. Step 10 is the stop-and-narrow
rule — stop if the architecture is wrong, the build stops running,
or scope balloons. That is the requested shape, confined to
greenfield. The real question is whether it generalises to an
established backlog with a regression surface. "Continuous-core" is
already the repo's term for this direction (ICEBOX-DEEP, 2026-08-17).

## What it composes — no new mechanism

- `next.md` per item; `dispatch.md` for genuinely disjoint lanes.
- **Re-assess** re-judges the queue and **Refactor** repairs its
  structure: together they are the "refactor the backlog" step, and
  Re-assess already fires when Current and Next are empty.
- **`Close: lite` + Reconcile** is a natural pacer — the reconcile
  cap (5 unreconciled closes, or 7 days) forces a
  stop-and-consolidate at roughly milestone rhythm.
- **BACKLOG-TABLE** is the requested table, same columns.
  Sequence it first or this reimplements it.

## Risks specific to running long

- **Memory budgets trip mid-run — realised, not hypothetical.**
  Filed quoting 1987/2000 trajectory words and 18/20 log entries.
  Hours later both were breached — 2116/2000 and 21/20 — by ordinary
  single-item work, no long run involved. Prune must be interleaved.
- **Unattended pushes.** CLOSE-COMMIT made commit-and-push a
  standard close step, so a long run pushes repeatedly with nobody
  between.
- **Compounding error.** One conservative default at a skipped gate
  is cheap; fifty in sequence are not.

## Investigation questions

- Graduated authorisation on JANITOR-WRITE's ladder, or one blanket
  sign-off? That ticket holds that a blanket sign-off opens nothing.
- Stop conditions: budget, red gate, blocked item, prohibition, or a
  cap on items or wall-clock?
- What "minor milestone" means — backlog milestones, init-mvp bands,
  or trajectory phases. The table column must pick one vocabulary.
- A mode inside `next.md`, or its own integration?

## Constraints

- The `next.md` guardrails are load-bearing and survive unchanged:
  `[sign-off]` escalates to full mode, wish-list triage runs at each
  pick, the reconcile gate blocks new picks, hard prohibitions stop
  and ask, and close stays full by default.
- Product tree, so a release; zero dependencies.
