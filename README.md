# PM Skills

An opinionated session context system for AI-assisted coding where above-default project management is needed.
Includes project memory, behavioral contracts, and a design-before-code
prompt workflow.

Built for solo and small-team builders who own product direction
and macro structure but want AI agents to handle implementation
without losing context, drifting, or wasting tokens. "PM" here means
project memory and project-management discipline for AI coding
sessions — not generic project-management training.

Defaults to Carbon Design System, WCAG 2.2 AAA accessibility, Nielsen
heuristics, JSDoc documentation, and a lean invariant-led testing
doctrine.

## Quick start

1. Copy `pm_skills/` into your project.
2. Copy `AGENTS.md`, `UI-STANDARDS.md`, and `DEV-INFRASTRUCTURE.md` to
   your project root.
3. Follow `pm_skills/init.md` to populate everything.

Prefer to let the agent build it? Run
[`pm_skills/integrations/init-mvp.md`](pm_skills/integrations/init-mvp.md) —
you sign off the foundation (product read, stack, and MVP backlog), then it
builds the first-milestone MVP to completion without further gates,
de-risked by staged rollback checkpoints.

See [`pm_skills/GUIDE.md`](pm_skills/GUIDE.md) for the full guide:
folder contents, two-tier memory system, per-task workflow, and how to
keep project memory fresh.

## Upgrading from an older version

Already using pm-skills and want the latest? Make the new version
visible to your AI agent (a sibling clone, a Git URL, or pasted
files), then run
[`pm_skills/integrations/upgrade.md`](pm_skills/integrations/upgrade.md)
or paste
[`pm_skills/prompts/upgrade.md`](pm_skills/prompts/upgrade.md). The
workflow compares your project's `pm_skills/VERSION` against the
latest and stops early if you are already current. Otherwise it
applies only the deltas the `CHANGELOG.md` documents, preserves your
project memory and populated root templates, and never silently
overwrites a framework file you have customised locally.

## What's in this repo

- **`pm_skills/`** — the framework. Templates, prompts, workflows,
  and documentation. Versioned via `pm_skills/VERSION`,
  `pm_skills/CHANGELOG.md`, and `pm_skills/MANIFEST.md`, which make
  upgrades a declarative read rather than a full-tree diff.
- **`AGENTS.md`**, **`UI-STANDARDS.md`**, **`DEV-INFRASTRUCTURE.md`** —
  distribution templates with `<!-- CUSTOMISE -->` placeholders.
  Copied to the project root and populated during initialization.
  These are not filled-in contracts for this repository.
