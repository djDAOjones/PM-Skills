# AI Project Manager Framework

A reusable, model-agnostic framework for managing AI-assisted coding
projects. Provides markdown-based project memory, behavioral contracts
for AI agents, reusable per-task prompts, and a single-file setup UI.

Works with any AI coding tool. No scripts, no dependencies — just
structured markdown files and a clear workflow.

## Repository structure

```text
AGENTS.md                  Template — permanent AI behavioral contract.
UI-STANDARDS.md            Template — UI, accessibility, and usability rules.
DEV-INFRASTRUCTURE.md      Template — build, dev server, versioning rules.

ai_project_manager_kickstart/
  README.md                Getting started guide.
  init.md                  Step-by-step project initialization.
  index.html               Single-file setup UI (open in a browser).
  project/                 Template project memory files.
  prompts/                 Reusable per-task prompts.
  integrations/            Optional tool-specific configs (e.g. Windsurf).
  scaffold/                Starter files to copy into a new project root.

ai_project_manager_example/
  (Filled-in example showing what a completed setup looks like.)
```

## How to use

1. Copy `ai_project_manager_kickstart/` into your project.
2. Copy `AGENTS.md`, `UI-STANDARDS.md`, and `DEV-INFRASTRUCTURE.md` to
   your project root.
3. Open `ai_project_manager_kickstart/init.md` (or `index.html` in a
   browser) and follow the steps to populate everything.
4. See `ai_project_manager_example/` for a filled-in reference.

## Key concepts

- **Two-tier memory:** Living project files in `project/` (updated every
  session) + permanent contracts (`AGENTS.md`, `UI-STANDARDS.md`,
  `DEV-INFRASTRUCTURE.md`) updated when major decisions change.
- **Design before code:** A 4-stage prompt workflow (scope, design,
  plan, validate) ensures the AI plans before it implements.
- **Template files:** Root-level `.md` files are templates with
  `<!-- CUSTOMISE -->` placeholders. They are meant to be populated
  during initialization, not used as-is.

## Note on root template files

`AGENTS.md`, `UI-STANDARDS.md`, and `DEV-INFRASTRUCTURE.md` at the
repository root are **distribution templates**, not filled-in contracts
for this repository. They contain `<!-- CUSTOMISE -->` placeholders that
are populated during a project's initialization process.
