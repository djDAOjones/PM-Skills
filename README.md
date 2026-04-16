# AI Project Manager Framework

An opinionated, markdown-based framework for managing AI-assisted
coding projects. Provides project memory, behavioral contracts for AI
agents, and a design-before-code prompt workflow.

Defaults to Carbon Design System, WCAG 2.2 AAA accessibility, Nielsen
heuristics, and JSDoc documentation. Adapts to other stacks but makes
no apology for its defaults.

## Quick start

1. Copy `ai_project_manager_kickstart/` into your project.
2. Copy `AGENTS.md`, `UI-STANDARDS.md`, and `DEV-INFRASTRUCTURE.md` to
   your project root.
3. Follow `ai_project_manager_kickstart/init.md` to populate everything.

See [`ai_project_manager_kickstart/README.md`](ai_project_manager_kickstart/README.md)
for the full guide: folder contents, two-tier memory system, per-task
workflow, and how to keep project memory fresh.

## What's in this repo

- **`ai_project_manager_kickstart/`** — the framework. Templates,
  prompts, workflows, and documentation.
- **`AGENTS.md`**, **`UI-STANDARDS.md`**, **`DEV-INFRASTRUCTURE.md`** —
  distribution templates with `<!-- CUSTOMISE -->` placeholders.
  Copied to the project root and populated during initialization.
  These are not filled-in contracts for this repository.
