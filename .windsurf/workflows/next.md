---
description: Pick and ship the next pm-skills framework item (self-hosted)
---

This repo self-hosts its own development on the standard pm-skills
loops (SELF-HOST, 2026-07-16). The operative contract is
`self/AGENTS.md` — the product/process split, the `self/` path
mapping, and the release checklist all live there. This workflow is a
pointer, not a copy.

1. Read `self/AGENTS.md`, then run
   `pm_skills/prompts/session-start.md` → Start B with the path
   mapping applied: memory at `self/project/`, gate and scripts per
   `self/DEV-INFRASTRUCTURE.md`. Include Start B's preflight,
   reconcile count, and wish-list triage.
2. Verify before trusting: reconcile `pm_skills/VERSION`, the top
   `pm_skills/CHANGELOG.md` entry, and `git status` before building on
   any memory claim. Fix drift first.
3. Pick from `self/project/backlog.md` Active (Current milestone
   first). Read the item's `self/project/tickets/<ID>.md` before
   scoping — do not re-research what it already answers.
4. Work the item auto-jazz (state each assumption in one line) unless
   it carries `[sign-off]`. Stop for maintainer input only when scope
   genuinely forks or something is blocking.
5. Close per `pm_skills/prompts/end-of-task.md` plus the framework
   release checklist in `self/AGENTS.md` → "End-of-task extension"
   (gate green after the last edit; commit proposed with a staged-set
   echo — never auto-committed).
6. Capture surfaced ideas as one line each in
   `self/project/wish-list.md` (or a ticket, if already well-shaped).
   Close with a short report: what shipped, version, gate result,
   captures added.
