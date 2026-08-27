---
description: Burn down the backlog continuously — item after item, re-assessing and reporting at each milestone — until a stop condition fires
---

The multi-item counterpart to `integrations/next.md`. Where that
trigger ships exactly one item and stops, this one keeps going:
build, close, and at each milestone boundary repair the queue,
re-judge it, and print a status table — until the backlog runs out
of workable items or a stop condition fires.

It composes existing workflows and adds no new mechanism:
`next.md` per item, `memory-maintenance.md` (Refactor + Re-assess)
at each milestone, `end-of-task.md` at each close.

## It reverses a standing decision, and only on invocation

`next.md` states the constraint outright — one item per invocation,
and it "never burns down the whole backlog unattended". That was a
deliberate choice, not an oversight. This mode is the other option,
and the reversal holds only because of what invoking it means:

- **Invoked, never scheduled.** A person asks for a burn-down, in
  this session, now. That is what makes the judgement calls below
  delegated rather than automated.
- **Never wired into automation.** Not a cron job, not a janitor
  write rung, not a scheduler. `memory-maintenance.md` → Re-assess
  says automation may *surface* that a pass is due but never run
  one, and `JANITOR-WRITE`-style ladders hold that a blanket
  sign-off opens no gate. Both stay true: this mode runs the
  maintenance verbs because a human asked for a burn-down in the
  same breath, which is a delegation, not an automation.

If you find yourself putting this file behind a timer, stop. The
distinction above is the only thing holding the reversal up.

## Before the first pick

`next.md`'s Start B preflight runs as written, plus one addition
that experience made non-negotiable:

- **Check the memory budgets first, not at close.** A long run
  writes a decision-log entry and a trajectory line per item, so a
  file already near its budget will trip mid-run — and the first
  time this mode was exercised, two budgets were *already* over
  before the run began. If any accreting file is over budget, run
  **Prune** as the run's first act. Do not start a burn-down on
  memory that is already full.
- **Note the headroom.** Say how many items fit before the next
  budget trips. Interleave a Prune when it does; a tripped budget
  mid-run is expected, not a failure.

## The loop

Repeat until a stop condition fires:

1. **Pick** — `next.md` step 1. State the pick in one line.
2. **Build and close** — `next.md` steps 2–5, unchanged, including
   the full close and the commit. Every guardrail in that file is
   load-bearing here and none is relaxed by running long.
3. **At a milestone boundary** — when the milestone you were
   working has no workable items left:
   - **Refactor** (`memory-maintenance.md`) — repair the queue's
     structure. A milestone whose only remaining item is blocked is
     a milestone that cannot be worked; promote past it.
   - **Re-assess** — re-judge what deserves the milestones now, and
     refill from the Icebox or the wish-list. Under this mode's
     delegation, state each placement as a one-line assumption and
     apply directly (RA3's gateless clause).
   - **Print the status table** (below).
   - **Checkpoint commit** — the refactor is its own commit, so an
     interrupted run resumes from a coherent queue.

**"Milestone" means the backlog's own milestones** — Current, Next,
Icebox, or whatever a project names them. Not `init-mvp.md` bands
(those are a greenfield scope ceiling) and not trajectory phases
(those are shipped history). Pick one vocabulary and the backlog's
is the one the queue is already written in.

## The status table

At each milestone boundary, print one table of every open item:

| Column | Content |
| --- | --- |
| Ticket ID | The backlog ID, linked to its ticket when it has one |
| Name | The item's short name |
| Milestone | Which milestone, and its position within it |
| Description | The item's summary, trimmed to one line |
| Status | Todo / in progress / blocked — **with the block reason** |

Items shipped in this run appear once, in the milestone they were
picked from, marked shipped with their release version if any.

If the project generates a human-readable backlog view, render it
and point at that instead of hand-building the table — a
hand-written table drifts from the records the moment it is written.

## Stop conditions

Stop and report — do not push through:

- **A hard prohibition** (`task.md` → "Hard prohibitions"), which
  stops the run, not just the item.
- **A red gate** that is not fixable inside the current item's
  scope. Never `--no-verify`; never weaken a check to keep going.
- **The reconcile gate** over its cap.
- **No workable items left** — every remaining item blocked, held,
  or maintainer-owned. This is the normal ending. Report what is
  left and why each is unworkable; do not invent work.
- **A `[sign-off]` item reaching the front of the queue.** It
  escalates to `full` mode, which needs a person; the burn-down
  stops there rather than running it gateless.
- **The same failure twice.** Two items failing the same way is a
  systemic problem, not two incidents.

## What running long actually breaks

Three risks are specific to this mode. The first two are managed
above; the third is the one to watch.

- **Budgets trip mid-run** — handled by the pre-pick check and by
  interleaving a Prune.
- **Unattended pushes.** Commit-and-push is a standard close step,
  so a long run pushes repeatedly with nobody between. That is the
  intended trade (every item gets a rollback point); the mitigation
  is that each push follows a green gate, never a bypassed one.
- **Compounding error.** One conservative default at a skipped gate
  is cheap; fifty in sequence are not. The specific failure to
  guard is the **staged-set echo** (`task.md` → step 11): over a
  long run a working tree accumulates files the run did not create
  — a parallel session's, a tool's output — and `git add -A` sweeps
  them in. In this mode the echo is a **stop, not a print**: list
  the staged set against the files this item touched, and resolve
  any difference *before* committing, not in the same breath.

## Report

At each milestone: the table, the items shipped, the assumptions
made at skipped gates, and the budget headroom remaining.

At the stop: which condition fired, what shipped in total, what is
left and why it could not be worked, and anything parked to the
wish-list.
