# AI Project Manager Kickstart

A reusable, model-agnostic starter pack for projects that want an
"AI project manager" approach to vibe coding.

Works with any AI coding tool. No scripts, no dependencies — just
markdown files with a clear structure and workflow.

## Start here

**New project?** Open [init.md](./init.md) and follow the steps.

**Looking for examples?** See `../ai_project_manager_example/` for
filled-in versions of the project files.

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

Tools that support global rules (e.g. Windsurf Cascade) load
`AGENTS.md` automatically. For other tools, the session-start prompts
include explicit read instructions.

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
  operating-rules.md      Agent behavioral contract (supplements AGENTS.md).
  session-start.md        How to begin a new chat.
  scoping.md              Stage 1: scope the task.
  design-options.md       Stage 2: explore options.
  implementation-plan.md  Stage 3: plan the build.
  validation.md           Stage 4: pre-code checks.
  quick-task.md           Single-stage alternative for small tasks.
  corrections.md          Drift correction snippets.

integrations/    Optional tool-specific configs.

scaffold/        Template files to copy into your project root.
  .editorconfig    Editor style enforcement (indent, encoding, etc.).
  .gitignore       Common ignores for JS/npm projects.
```

## Per-task quick reference

### Non-trivial tasks (4-stage)

1. New chat → paste `prompts/session-start.md` (standard start).
2. Paste `prompts/scoping.md` → approve scope.
3. Paste `prompts/design-options.md` → pick an option.
4. Paste `prompts/implementation-plan.md` → approve plan.
5. Paste `prompts/validation.md` → confirm readiness.
6. "Go ahead and implement."
7. End of task → paste "Update project memory" from `prompts/corrections.md`.

### Small tasks (single-stage)

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
