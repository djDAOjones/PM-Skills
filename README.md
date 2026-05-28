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
heuristics, and JSDoc documentation.

## Quick start

1. Copy `pm_skills/` into your project.
2. Copy `AGENTS.md`, `UI-STANDARDS.md`, and `DEV-INFRASTRUCTURE.md` to
   your project root.
3. Follow `pm_skills/init.md` to populate everything.

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
workflow audits the differences, preserves your project memory and
populated root templates, and updates framework files in place.

## What's in this repo

- **`pm_skills/`** — the framework. Templates, prompts, workflows,
  and documentation.
- **`AGENTS.md`**, **`UI-STANDARDS.md`**, **`DEV-INFRASTRUCTURE.md`** —
  distribution templates with `<!-- CUSTOMISE -->` placeholders.
  Copied to the project root and populated during initialization.
  These are not filled-in contracts for this repository.
