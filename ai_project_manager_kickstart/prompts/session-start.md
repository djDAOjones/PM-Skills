# Session Start

Use one of these to begin a new chat.

If your AI tool loads `AGENTS.md` automatically (e.g. Windsurf
Cascade), you can omit the explicit read of `AGENTS.md` and
`UI-STANDARDS.md` — they're already in context.

## Standard start (full task workflow)

```text
Read the behavioral contracts:
- AGENTS.md
- UI-STANDARDS.md (if the task touches UI)

Read the project memory in ai_project_manager_kickstart/project/:
- brief.md
- architecture.md
- backlog.md
- file-map.md
- conventions.md (if it exists)
- decision-log.md

Also read ai_project_manager_kickstart/prompts/operating-rules.md.

My task: [one sentence from the backlog]

Start with scoping only. No code.
```

## Quick start (simple or small tasks)

```text
Read the behavioral contracts:
- AGENTS.md
- UI-STANDARDS.md (if the task touches UI)

Read the project memory in ai_project_manager_kickstart/project/:
- brief.md
- architecture.md
- file-map.md
- conventions.md (if it exists)

Also read ai_project_manager_kickstart/prompts/operating-rules.md.

My task: [one sentence]

This is a small task. Scope it, plan it, and present the plan for approval. No code yet.
```

## Continuing a task from a previous session

```text
Read AGENTS.md and the project memory in ai_project_manager_kickstart/project/.

I'm continuing work on: [task description]
Here's where I left off: [brief status]
```
