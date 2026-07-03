# PM Skills

[![Lint](https://github.com/djDAOjones/PM-Skills/actions/workflows/lint.yml/badge.svg)](https://github.com/djDAOjones/PM-Skills/actions/workflows/lint.yml)

An opinionated session context system for AI-assisted coding: project
memory, behavioral contracts, and a design-before-code task workflow.
Built for solo and small-team builders who own product direction but
want AI agents to handle implementation without losing context,
drifting, or wasting tokens. "PM" means project memory and
project-management discipline for AI coding sessions.

Defaults: Carbon Design System, WCAG 2.2 AAA, Nielsen heuristics,
JSDoc, and a lean invariant-led testing doctrine. All customisable.

## Set up

1. Copy `pm_skills/` into your project.
2. Copy `AGENTS.md`, `UI-STANDARDS.md`, and `DEV-INFRASTRUCTURE.md` to
   your project root.
3. Follow `pm_skills/init.md` to populate everything — manually, or
   tell the agent to run it (it doubles as a gated agent workflow).

Want the agent to **build** the project too? Run
[`pm_skills/integrations/init-mvp.md`](pm_skills/integrations/init-mvp.md):
you sign off the foundation and a **scope band** (local MVP → full
backlog to production), then it builds — and, for deploy bands,
ships — to that ceiling without further gates.

## How to use it, day to day

The operating loop is: **pick → build → close**, with project memory
carrying context between chats so every session starts warm.

1. **Start a session.** Open a new chat and either name your task
   (`pm_skills/prompts/session-start.md` → Start A) or say "pick the
   next batch" (Start B — the agent triages the wish-list, picks from
   the backlog, and waits for your go-ahead).
2. **Run the task workflow.** `pm_skills/integrations/task.md` in the
   default **checkpoint** mode: you approve the scope and pick a
   design option (the two judgement calls); plan, validation, and
   implementation then run with stated assumptions. Say `full` for
   high-risk work (a gate at every stage), `auto-jazz` /
   `auto-jazz-lite` when you trust it end-to-end. Bugs go through
   `bugfix.md` instead — diagnosis before fix.
3. **Close.** `pm_skills/prompts/end-of-task.md` runs the quality gate
   (`check`), updates project memory (backlog, decision log,
   trajectory, file map), and size-checks it. After a gateless run,
   paste `pm_skills/prompts/review.md` before accepting the work.

Steering costs one line: "park it" captures an idea to the wish-list;
the other drift corrections live in `session-start.md`. When the size
check flags a budget, approve the proposed
`pm_skills/prompts/memory-maintenance.md` pass (Diagnose / Prune /
Refactor). Ship to production with `pm_skills/prompts/deploy.md`.

See [`pm_skills/GUIDE.md`](pm_skills/GUIDE.md) for the full guide:
folder contents, memory layers and read tiers, and the manual
paste-prompt flow for tools without workflow support.

## Upgrading

Make the latest pm-skills visible to your agent (a sibling clone, Git
URL, or pasted files), then run
[`pm_skills/prompts/upgrade.md`](pm_skills/prompts/upgrade.md). It
compares your `pm_skills/VERSION` against the latest, applies only the
deltas the `CHANGELOG.md` documents, preserves your project memory and
populated templates, and never silently overwrites a local
customisation.

## What's in this repo

- **`pm_skills/`** — the framework: templates, prompts, workflows,
  docs. Versioned via `pm_skills/VERSION`, `pm_skills/CHANGELOG.md`,
  and `pm_skills/MANIFEST.md`, which make upgrades a declarative read
  rather than a full-tree diff.
- **`AGENTS.md`**, **`UI-STANDARDS.md`**, **`DEV-INFRASTRUCTURE.md`** —
  distribution templates with `<!-- CUSTOMISE -->` placeholders,
  populated during initialization. Not filled-in contracts for this
  repository.

Contributing to the framework itself? See
[`CONTRIBUTING.md`](CONTRIBUTING.md).
