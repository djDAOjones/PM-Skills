# AI Project Manager Kickstart

An opinionated starter pack for AI-assisted coding projects.
Structured markdown files, design-before-code discipline, and
persistent project memory — the way Joe likes to work in 2026.

Defaults to Carbon Design System, WCAG 2.2 AAA, Nielsen heuristics,
and JSDoc. All customisable, none apologised for.

## Start here

**New project?** Follow [init.md](./init.md) step by step.

## Two-tier memory system

This framework uses two kinds of project memory:

- **`project/`** — living project memory. Updated every session.
  Contains the brief, backlog, file map, conventions, and decision log.
- **`AGENTS.md` + `UI-STANDARDS.md` + `DEV-INFRASTRUCTURE.md`** (in
  the project root) — permanent behavioral contracts. Contain hard
  rules, invariants, accessibility standards, design system
  conventions, and dev infrastructure rules. Populated during the
  kickoff process (Steps 6–8 of `init.md`) and updated when major
  architectural, UI, or build decisions change.

AI tools that support global rules load `AGENTS.md` automatically.
For other tools, the session-start prompts include explicit read
instructions.

## What's in this folder

```text
project/         Durable project memory. Fill once, maintain ongoing.
  brief.md         What we're building.
  architecture.md  Tech stack, structure, key decisions.
  conventions.md   Style, naming, patterns, rules.
  backlog.md       Living task list with status.
  file-map.md      Key files and their roles.
  decision-log.md  Append-only record of design decisions.

prompts/         Reusable per-task prompts.
  session-start.md        How to begin a new chat.
  scoping.md              Stage 1: scope the task.
  design-options.md       Stage 2: explore options.
  implementation-plan.md  Stage 3: plan the build.
  validation.md           Stage 4: pre-code checks.
  quick-task.md           Single-stage alternative for small tasks.
  corrections.md          Drift correction snippets.

integrations/    Optional tool-specific workflows.
  init-project.md    Guided project initialization.
  feature.md         Full task workflow with approval gates.

scaffold/        Template files to copy into your project root.
  .editorconfig    Editor style enforcement (indent, encoding, etc.).
  .gitignore       Common ignores for JS/npm projects.
```

## Per-task quick reference

### AI tools with workflow support

If your AI tool supports workflows (e.g. Windsurf Cascade), copy the
files from `integrations/` to your tool's workflow directory. Then run
the task workflow at the start of any task — it reads project memory,
asks full vs quick, runs the pipeline with approval gates, and reminds
you to update project memory at the end.

### Manual prompt workflow

**Non-trivial tasks (4-stage):**

1. New chat → paste `prompts/session-start.md` (standard start).
2. Paste `prompts/scoping.md` → approve scope.
3. Paste `prompts/design-options.md` → pick an option.
4. Paste `prompts/implementation-plan.md` → approve plan.
5. Paste `prompts/validation.md` → confirm readiness.
6. "Go ahead and implement."
7. End of task → paste "Update project memory" from `prompts/corrections.md`.

**Small tasks (single-stage):**

1. New chat → paste `prompts/session-start.md` (quick start).
2. Paste `prompts/quick-task.md` → approve plan.
3. "Go ahead and implement."
4. End of task → paste "Update project memory" from `prompts/corrections.md`.

## Keeping project memory fresh

| File | When to update |
| --- | --- |
| `brief.md` | Rarely. Only if the project's direction fundamentally changes. |
| `architecture.md` | When adding major modules or changing the tech stack. |
| `conventions.md` | When a new convention is established or changed. |
| `backlog.md` | End of every task — mark done, add follow-ups. |
| `file-map.md` | When files are created, renamed, or deleted. |
| `decision-log.md` | During the design phase of each task. |
| `README.md` (root) | When architecture, dev workflow, or key infrastructure changes. |
| `AGENTS.md` (root) | When new invariants, data model changes, protected modules, event namespaces, or anti-patterns are established. |
| `UI-STANDARDS.md` (root) | When new token systems or UI conventions are established. |
| `DEV-INFRASTRUCTURE.md` (root) | When build, dev server, versioning, or script conventions change. |

Use the "Update project memory" prompt in `prompts/corrections.md`
at the end of every task session to stay current.
