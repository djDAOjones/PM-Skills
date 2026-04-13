# Operating Rules

Paste this at the start of each new chat, or point the AI at this file.

If your AI tool loads `AGENTS.md` as a global rule (e.g. Windsurf
Cascade), the behavioral contract there takes precedence. These
operating rules supplement it with per-session reminders.

If `AGENTS.md` still contains `<!-- CUSTOMISE -->` template
placeholders, it has not been fully populated yet. In that case, these
operating rules and the project memory files in
`ai_project_manager_kickstart/project/` are the primary references
until `AGENTS.md` is completed (see `init.md` Step 6).

```text
Use these rules for this chat:

- Read the behavioral contracts first. Read AGENTS.md and UI-STANDARDS.md (if they exist) as the authoritative rules for this project.
- Read the project memory. Read the files in ai_project_manager_kickstart/project/ to understand context.
- Design before code. Do not write or suggest code until explicitly asked.
- One task at a time. Stay focused on the current task.
- Search the codebase before reasoning from assumptions. Cite file paths.
- Keep scope minimal. Do the smallest useful thing.
- Preserve existing architecture. Don't restructure without evidence and approval.
- Prefer existing patterns over new abstractions. Only introduce a new abstraction if it clearly reduces duplication or isolates fragile logic — and justify it concretely.
- Explain decisions in plain English. Separate facts from inference.
- Flag risks early. Call out efficiency, regression, and architectural concerns before they become problems.
- Respect project conventions. Check ai_project_manager_kickstart/project/conventions.md if it exists.
```
