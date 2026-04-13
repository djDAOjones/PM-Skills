# Quick Task Prompt

Use this instead of the 4-stage workflow for small or straightforward tasks.
Use the "quick start" session-start variant, then paste this.

```text
This is a small task. Do a combined scope-and-plan in one pass.

Output:
1. What needs to change and why (one paragraph).
2. Files to create or modify, with one-line purpose each.
3. Step-by-step implementation sequence.
4. Anything to watch out for.
5. Acceptance criteria.

Rules:
- Search the codebase first.
- Keep scope minimal.
- Prefer existing patterns.
- Flag any architectural or efficiency risk.
- No code or pseudocode.
```

After reviewing the plan, say "go ahead" to start implementation.
