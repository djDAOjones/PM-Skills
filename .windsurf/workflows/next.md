---
description: Pick and ship the next pm-skills roadmap item
---

This repo self-hosts its own development: the framework is the process
for working on the framework. The protocol's single source of truth is
the `SESSION KICK-OFF` comment block at the top of
`user_crud/ROADMAP.md` — this workflow is a pointer to it, not a copy.

1. Read `pm_skills/prompts/session-start.md` (Start B is the process
   model) and the `SESSION KICK-OFF` block in `user_crud/ROADMAP.md`.
   Follow the kick-off block exactly, including its verify-before-trust
   reconciliation (VERSION, top CHANGELOG entry, git status).
2. Pick the first open `[ ]` item: Current focus, then the earliest
   open Wave, then Later / minor. If everything is empty, triage the
   Inbox and stop for maintainer input.
3. Read the item's detail file at `user_crud/tickets/<ID>.md` before
   scoping. It banks evidence, approach leans, constraints, and open
   questions — do not re-research what it already answers.
4. Work the item auto-jazz (gateless; state each assumption in one
   line). Stop for maintainer input only when the ticket flags
   `[decision needed]`, when scope genuinely forks, or when something
   is blocking.
5. Close out with the LITERAL CHECKLIST in kick-off step 5 (VERSION,
   CHANGELOG, MANIFEST/GUIDE sync, gate green after the last edit,
   release consistency check, ticket moved to `user_crud/tickets/`
   `archive/`, commit proposed with a staged-set echo — never
   auto-committed).
6. If the work surfaced ideas with merit, capture each as one line in
   the ROADMAP Inbox (or a ticket, if already well-shaped). Close with
   a short report: what shipped, version, gate result, captures added.
