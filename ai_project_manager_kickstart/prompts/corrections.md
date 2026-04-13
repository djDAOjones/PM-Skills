# Drift Corrections

Paste one of these if the AI wanders off track.

## Stay in design mode

```text
Pause. Stay in design mode only. No code yet.
```

## Tighten scope

```text
Tighten scope to the smallest useful change. No speculative refactors.
```

## Re-ground in the codebase

```text
Re-ground in the actual codebase. Search the project files and cite what you find.
```

## Respect architecture

```text
Preserve the existing architecture. Don't move responsibilities between modules without strong evidence.
```

## Reset to the plan

```text
Return to the approved implementation plan. Don't add steps we didn't agree on.
```

## Update project memory (use at end of every task)

```text
Before we close this task, update:
- ai_project_manager_kickstart/project/backlog.md — mark this task done and note any follow-up tasks.
- ai_project_manager_kickstart/project/file-map.md — add or update entries for files we created or changed.
- ai_project_manager_kickstart/project/decision-log.md — record the key design decision from this task.
- ai_project_manager_kickstart/project/conventions.md — if new conventions were established or existing ones changed, update this file.
- README.md — if architecture, dev workflow, or key infrastructure changed significantly, update the root README.
- AGENTS.md — if this task established new invariants, data model changes, protected modules, event namespaces, or anti-patterns, update the relevant sections. Also check whether AGENTS.md still reflects current architecture and conventions.
- UI-STANDARDS.md — if this task established new token systems or UI conventions, update the relevant sections.
- DEV-INFRASTRUCTURE.md — if this task changed build, dev server, versioning, or script conventions, update the relevant sections.
```
