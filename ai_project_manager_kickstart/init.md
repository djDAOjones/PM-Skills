# Initialize Your Project

Follow these steps to go from a blank project to "ready for first task."
Total time: ~30 minutes.

This process populates two kinds of project memory:

- **`project/`** — living project memory (brief, backlog, file map,
  decisions). Read at the start of every task session.
- **`AGENTS.md` + `UI-STANDARDS.md` + `DEV-INFRASTRUCTURE.md`** —
  permanent behavioral contracts. Loaded automatically by AI tools that
  support global rules, or read manually at session start for other
  tools.

Both are kept in sync. The kickoff process gathers information once and
writes it to the right places.

---

## Step 1: Fill in the project brief

Open `project/brief.md` and answer each question.

Keep it short — a few sentences per section is fine. You can always
expand later. This is the seed that everything else grows from.

---

## Step 2: Generate the architecture

Start a chat with your AI tool and paste this:

```text
Read ai_project_manager_kickstart/project/brief.md.

Based on this brief, propose:
1. A recommended tech stack with a one-line justification per choice.
2. A folder and file structure for the project.
3. Key modules or components, with a one-sentence responsibility for each.
4. Communication patterns — how modules should interact (e.g. pub-sub
   event bus, direct imports, state store). Name the preferred pattern.
5. A dependency policy — what's allowed without approval.
6. A dev workflow — how to install, run in development, build for
   production, and run tests. Include the expected dev URL and port.
7. A configuration strategy — where tuneable values, constants, and
   design tokens should live.

Keep it practical and minimal. This is a starting point, not a final architecture.
Output in markdown format matching the template in ai_project_manager_kickstart/project/architecture.md.
```

Review the output. Edit until you agree with it. Save the result to
`project/architecture.md`, replacing the template comments.

---

## Step 3: Generate the initial backlog

In the same chat (or a new one), paste this:

```text
Read:
- ai_project_manager_kickstart/project/brief.md
- ai_project_manager_kickstart/project/architecture.md

Based on the brief and architecture, propose an initial backlog of
8–12 tasks that would take this project from zero to a working first
milestone.

Format each task as:
- [ ] Task title — one-sentence description

Group tasks under milestone headings.
Order by dependency — what must come first.
Keep tasks small enough to complete in a single focused session.
Output in markdown format matching the template in ai_project_manager_kickstart/project/backlog.md.
```

Review the output. Reorder, add, or remove tasks. Save to
`project/backlog.md`.

---

## Step 4: Set initial conventions (optional)

If you already know your preferred code style, naming patterns, commit
format, or testing approach, fill in `project/conventions.md` now.

If you're not sure yet, skip this. Conventions will emerge naturally
once you start writing code. Capture them in `project/conventions.md`
when they do.

---

## Step 5: Create a root README.md

`AGENTS.md` tells AI agents to read `README.md` at the start of every
task. Create a root `README.md` for your project now.

It does not need to be long. Include:

- **What this project is** — one paragraph.
- **How to run it** — build/serve commands, prerequisites.
- **Key infrastructure** — important modules, entry points, gotchas.
- **Invariants** — anything a contributor must not break.

You can generate a first draft from your brief and architecture:

```text
Read:
- ai_project_manager_kickstart/project/brief.md
- ai_project_manager_kickstart/project/architecture.md

Draft a concise root README.md for this project. Include:
1. One-paragraph description of the project.
2. How to run or build it (commands, prerequisites).
3. Key modules and entry points.
4. Any invariants or gotchas a contributor should know.

Keep it short — this is a working reference, not marketing copy.
```

Review and save to the project root as `README.md`.

---

## Step 6: Populate AGENTS.md

`AGENTS.md` is the permanent behavioral contract for AI agents. It
contains `<!-- CUSTOMISE -->` placeholder sections that should be filled
in using the information gathered in Steps 1–5.

In the same chat (or a new one), paste this:

```text
Read:
- ai_project_manager_kickstart/project/brief.md
- ai_project_manager_kickstart/project/architecture.md
- ai_project_manager_kickstart/project/conventions.md (if it exists)
- AGENTS.md

AGENTS.md has <!-- CUSTOMISE --> placeholder sections. Using the brief,
architecture, and conventions, populate every applicable placeholder:

1. **Product identity** — Replace [Project Name] and [short product
   description] with the real product name and a 2–4 sentence
   description. State what the app IS and what mental model is
   canonical. Optionally state what it is NOT.

2. **Hard rules (invariants)** — Add project-specific invariants below
   the existing universal ones. Consider: canonical data formats,
   cross-component communication rules, specific token systems,
   programmatic update patterns to avoid feedback loops.

3. **Core data model** — If there are canonical entities, describe them.
   State which patterns are explicitly forbidden.

4. **Domain subsystems** — If the architecture defines subsystems
   (simulation, rendering, data pipeline, etc.), add a section for each
   describing the design contract.

5. **Relationship to prior work** — If this project was forked from or
   shares history with another codebase, fill in that section.

6. **Protected infrastructure** — If there are modules that must not be
   deleted or restructured without approval, list them.

7. **Event naming convention** — Fill in the event naming section
   with the project's actual namespaces, or remove the section if
   the project doesn't use events.

8. **Files to never edit** — List build output dirs, personal notes, or
   other paths agents must never touch.

9. **Anti-patterns** — Add project-specific anti-patterns below the
   universal ones.

10. **Testing** — Define what testing means for this project today.
    Replace the default with the actual policy.

11. **Persistence checklist** — If the project has stateful models
    that persist to localStorage or files, fill in the checklist.
    If not applicable, remove the section.

12. **Code documentation** — Confirm or adjust the documentation
    standard (e.g. JSDoc for JavaScript).

Only fill in sections where the brief and architecture provide enough
information. Leave remaining placeholders for later. Do not invent
information.

Output the updated AGENTS.md in full.
```

Review the output. Save the result to `AGENTS.md`, replacing the
template version.

**Optional — tool-specific workflows:** If your AI tool supports
workflows, copy the files from `integrations/` to your tool's workflow
directory. For example, Windsurf Cascade users can copy them to
`.windsurf/workflows/`. The prompt files in `prompts/` serve the same
purpose for tools without workflow support.

---

## Step 7: Populate UI-STANDARDS.md (if the project has UI)

If this project has a user interface, paste this:

```text
Read:
- ai_project_manager_kickstart/project/brief.md
- ai_project_manager_kickstart/project/architecture.md
- UI-STANDARDS.md

UI-STANDARDS.md has a <!-- CUSTOMISE --> placeholder for the token
systems section. Using the brief and architecture:

1. Define the token systems used by this project.
2. If the project uses a brand palette alongside Carbon structural
   tokens, describe both systems and state they must not be collapsed.
3. If the project has a single token system, describe it.

Output only the updated "Token systems" section.
```

Review and save to the Token systems section of `UI-STANDARDS.md`.

If this project has no user interface, the UI-STANDARDS.md file can be
removed from the boilerplate.

---

## Step 8: Populate DEV-INFRASTRUCTURE.md (if the project has a build step)

If this project uses a package manager, bundler, dev server, or build
step, populate `DEV-INFRASTRUCTURE.md` now. If the project is pure
static files with no build tooling, skip this step — the file can be
removed from the boilerplate.

In the same chat (or a new one), paste this:

```text
Read:
- ai_project_manager_kickstart/project/brief.md
- ai_project_manager_kickstart/project/architecture.md
- DEV-INFRASTRUCTURE.md

DEV-INFRASTRUCTURE.md has <!-- CUSTOMISE --> placeholder sections.
Using the brief and architecture, populate every applicable placeholder:

1. **Package management** — package manager, dependency policy.
2. **Canonical scripts** — table of every script in package.json.
3. **Dev server** — canonical URL, port, how to start, what it serves.
4. **Build system** — bundler, entry point, output directory, source
   maps, minification, static file handling.
5. **Version management** — numbering scheme, sources, auto-increment
   rules, when to bump manually.
6. **Deployment** — target, pipeline, post-deploy verification.
7. **Utility scripts** — any helper scripts beyond dev/build/test.
8. **Configuration strategy** — where constants, design tokens, and
   user-facing config live.
9. **Editor config** — describe the .editorconfig if one exists.
10. **Files agents must not hand-edit** — concrete paths.

Only fill in sections where the architecture provides enough
information. Leave remaining placeholders for later. Do not invent
information.

Output the updated DEV-INFRASTRUCTURE.md in full.
```

Review the output. Save the result to `DEV-INFRASTRUCTURE.md`,
replacing the template version.

---

## Step 9: Copy scaffold files

Copy the following from `ai_project_manager_kickstart/scaffold/` to
your project root, if they don't already exist:

- **`.editorconfig`** — editor style enforcement (indent, encoding,
  line endings). Useful for any project, not just those with a build
  step. Customise to match your preferences.
- **`.gitignore`** — common ignores for JS/npm projects. Adapt for
  your stack if needed.

---

## Step 10: Readiness check

Before starting your first task, confirm:

- [ ] `project/brief.md` is filled in.
- [ ] `project/architecture.md` is filled in.
- [ ] `project/backlog.md` has an initial task list.
- [ ] Root `README.md` exists.
- [ ] `AGENTS.md` has been populated — no remaining `[Project Name]`
  placeholder, and applicable `<!-- CUSTOMISE -->` sections are filled.
- [ ] `UI-STANDARDS.md` token systems section is populated (if the
  project has UI).
- [ ] `DEV-INFRASTRUCTURE.md` is populated (if the project has a build
  step or dev server).
- [ ] `.editorconfig` is in the project root.
- [ ] `.gitignore` is in the project root.

If any of these are incomplete, finish them before proceeding.

---

## Step 11: Start your first task

Open `project/backlog.md` and pick the first task.

If your AI tool supports workflows and you copied `integrations/`
in Step 6, run the task workflow and state your task.
Otherwise, follow the manual prompt workflow below.

For non-trivial tasks (4-stage):

1. Open a new chat.
2. Paste the "Standard start" from `prompts/session-start.md`.
3. Use `prompts/scoping.md` — approve the scope.
4. Use `prompts/design-options.md` — pick an option.
5. Use `prompts/implementation-plan.md` — approve the plan.
6. Use `prompts/validation.md` — confirm readiness.
7. Say "go ahead and implement."
8. When done, use the "Update project memory" prompt from `prompts/corrections.md`.

For small or simple tasks (single-stage):

1. Open a new chat.
2. Paste the "Quick start" from `prompts/session-start.md`.
3. Use `prompts/quick-task.md` — approve the plan.
4. Say "go ahead and implement."
5. When done, use the "Update project memory" prompt from `prompts/corrections.md`.

---

## You're set up

From here, the cycle is: pick a task → scope/plan → implement → update
project memory → pick the next task.

The files in `project/` are your living memory. `README.md`,
`AGENTS.md`, `UI-STANDARDS.md`, and `DEV-INFRASTRUCTURE.md` are your
permanent project references. Keep them all current and every new
chat can pick up where the last one left off.
