# Next Batch

A `session-start` variant. Instead of you naming the task, this loads
project context, picks the next logical batch from the backlog,
presents it with a recommended workflow, and stops for your go-ahead.
No scoping, no code until you confirm.

A "batch" is the smallest shippable unit of work: a single backlog
item, or a tight cluster of items that share the same files or feature
and clearly belong together.

## 1. Load context

Load the standard project context exactly as
`pm_skills/prompts/session-start.md` describes (canonical hot-read
list and tier policy live in `AGENTS.md` → "Before every task").

`pm_skills/project/backlog.md` is the focus of this prompt — read its
**Active** section (Current milestone, Next milestone, and Icebox all
live there, per the standard tier policy).

## 2. Pick the next batch

From the backlog Active section, choose the next logical unit:

- Prefer continuing an in-progress item (`[~]`) over starting a new one.
- Otherwise take the first unstarted item (`[ ]`) under **Current
  milestone**.
- Fall back to **Next milestone** only if Current milestone is empty
  or fully done.
- Do not pull from **Icebox** unless Active has nothing committed.
- Skip blocked items and say why they're blocked.

## 3. Present the pick

Output, concisely:

1. **The batch** — the backlog item(s), quoted verbatim.
2. **Why it's next** — one or two lines (milestone order, dependency,
   or in-progress continuation).
3. **What it touches** — likely files or areas, grounded in a quick
   source-tree check. A pointer, not full scoping.
4. **Recommended workflow** — full 4-stage / quick / bug — with one
   line of rationale.
5. **Ready-to-paste task statement** — in the matching
   `session-start` form (Standard / Quick / Bug start).
6. **Runner-up** — in one line, the next item you'd pick if this one
   is wrong.

## 4. Stop

Wait for the user to confirm or redirect. Do not begin scoping,
planning, or writing code until they do.

Rules:
- Search the source tree only enough to ground the "what it touches"
  line. Save real scoping for the chosen workflow.
- If two or three candidates are genuinely equal, present them and ask
  the user to choose. Don't guess silently.
- If the backlog Active section is empty or unclear, say so and ask
  what to work on.
