<!-- field-report: project=dot-crowd-navigator · date=2026-08-17 · type=export
     · pm-skills=unversioned (pre-1.0.0 framework tree: pm_skills/ with project memory and no VERSION file; committed on 2026-08-17 in an as-found snapshot of the April work)
     · source=Git blobs at 8d388802cccda3462e8bd110fae636a9db4ba845 for the harness and gate configuration the project carries (.windsurf, .editorconfig, .gitignore, package.json), taken 2026-09-24 by Claude Code (read from a scratch clone assembled from the remote and the checkout's objects, every ref set to its value at the cut-off 2026-09-24T11:40:00.000Z; content-addressed, so identical to the checkout's HEAD)
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained; session logs and the bundle stay in the local lane -->

# State export

Snapshot: `8d388802cccda3462e8bd110fae636a9db4ba845`.

| Path | Bytes |
| --- | ---: |
| `.editorconfig` | 520 |
| `.gitignore` | 407 |
| `.windsurf/workflows/bugfix.md` | 4213 |
| `.windsurf/workflows/feature.md` | 4039 |
| `.windsurf/workflows/init-project.md` | 3435 |
| `package.json` | 757 |

<!-- FILE: .editorconfig -->

# EditorConfig helps developers define and maintain consistent
# coding styles between different editors and IDEs
# editorconfig.org

root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.md]
max_line_length = 80
trim_trailing_whitespace = false

[*.js]
indent_size = 2
max_line_length = 120
quote_type = single

[*.json]
indent_size = 2

[*.{html,css}]
indent_size = 2
max_line_length = 120

[Makefile]
indent_style = tab

<!-- FILE: .gitignore -->

# Dependencies
node_modules/
package-lock.json
yarn.lock

# System files
.DS_Store
Thumbs.db

# Editor directories and files
.vscode/
.idea/
*.swp
*~
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
# Build outputs
dist/
build/
# docs/ - NOT ignored (needed for GitHub Pages)

# Environment files
.env
.env.local

# Temporary files
*.tmp
temp/
tmp/

# Logs
logs/
*.log

# OS files
Thumbs.db

# Archive folders
Obsolete/

<!-- FILE: .windsurf/workflows/bugfix.md -->

---
description: Run the diagnosis-before-fix workflow for a bug
---

Before fixing anything, diagnose the root cause and get user approval.
Do not write code until diagnosis is confirmed and a fix plan is approved.

1. State the bug.
   One sentence: what is happening vs what should be happening.
   Include reproduction steps if the user provided them.

2. Read project context.
   Read:
   - `AGENTS.md`
   - `UI-STANDARDS.md` (if the bug touches UI)
   - `DEV-INFRASTRUCTURE.md` (if it exists)
   - `pm_skills/project/brief.md`
   - `pm_skills/project/architecture.md`
   - `pm_skills/project/conventions.md` (if it exists)
   - `pm_skills/project/file-map.md`
   - `pm_skills/project/backlog.md`
   - `pm_skills/project/decision-log.md` (if you need context
     on prior choices that may relate to the bug)

3. Triage complexity.
   Ask the user: "Is this a quick fix or does it need full diagnosis?"
   - If quick fix → go to step 4.
   - If full diagnosis → go to step 5.
   - If the user already indicated, don't ask again.

--- QUICK FIX PATH ---

4. Quick diagnosis and fix plan.
   Read `pm_skills/prompts/bug-scoping.md` and follow
   its instructions. Output:
   - Bug description (expected vs actual, reproduction steps if known)
   - Root cause — search the codebase and cite evidence
   - Proposed fix — minimal upstream change
   - Files to modify (with one-line reason each)
   - Acceptance criteria

   Present to the user. After approval, implement the fix.
   Go to step 8.

--- FULL DIAGNOSIS PATH ---

5. Reproduce and observe.
   Confirm the reproduction steps. If the bug is not reliably
   reproducible, note what conditions trigger it and what has been
   tried. Document:
   - Steps to reproduce (or best-known trigger)
   - Expected behaviour
   - Actual behaviour
   - Environment details if relevant

   Present to the user for confirmation before continuing.

6. Diagnose root cause.
   Read `pm_skills/prompts/bug-scoping.md` and follow
   its instructions. Search the codebase, trace the fault, and
   cite evidence. Output:
   - Root cause — state the cause, not the symptoms. Cite file
     paths and line ranges.
   - If the cause is uncertain, state competing hypotheses and
     what evidence would distinguish them.
   - Regression surface — what existing behaviour could break if
     this area is changed.

   Present diagnosis to the user. Wait for approval before
   continuing. Do not propose a fix until the root cause is
   confirmed.

7. Plan the fix.
   Output:
   - Proposed fix — the minimal upstream change that addresses
     the root cause
   - Files to modify (with one-line reason each)
   - Files not to touch
   - Regression checks or tests to run
   - Acceptance criteria — how we know the bug is fixed and no
     regressions were introduced

   Present to the user. After approval, implement the fix.

--- VERIFY ---

8. Verify the fix.
   After implementation:
   - Confirm the original bug is resolved against the reproduction
     steps or trigger conditions.
   - Check for regressions against the identified regression surface.
   - Run existing tests if a test runner is available.

   Report results to the user.

--- CLOSE ---

9. Update project memory.
   After the fix is verified, update:
   - `pm_skills/project/backlog.md` — move this task to the
     Completed section, note any follow-up tasks in Active.
   - `pm_skills/project/file-map.md` — add or
     update entries for files created or changed.
   - `pm_skills/project/decision-log.md` — record
     the key design decision from this task.
   - `pm_skills/project/conventions.md` — if new
     conventions were established or existing ones changed.
   - `README.md` — if architecture, dev workflow, or key
     infrastructure changed significantly.
   - `AGENTS.md` — if this task established new invariants, data model
     changes, protected modules, event namespaces, or anti-patterns.
   - `UI-STANDARDS.md` — if this task established new token systems or
     UI conventions.
   - `DEV-INFRASTRUCTURE.md` — if this task changed build, dev server,
     versioning, or script conventions.

   Present the memory updates to the user for review.

<!-- FILE: .windsurf/workflows/feature.md -->

---
description: Run the design-before-code workflow for a task
---

Before implementing anything, complete the design workflow and get
user approval at each gate. Do not write code until all gates pass.

1. State the goal.
   One sentence: what the user asked for.

2. Read project context.
   Read:
   - `AGENTS.md`
   - `UI-STANDARDS.md` (if the task touches UI)
   - `DEV-INFRASTRUCTURE.md` (if it exists)
   - `pm_skills/project/brief.md`
   - `pm_skills/project/architecture.md`
   - `pm_skills/project/conventions.md` (if it exists)
   - `pm_skills/project/file-map.md`
   - `pm_skills/project/backlog.md`
   - `pm_skills/project/decision-log.md` (if the
     task involves design decisions or you need context on prior choices)

3. Determine task size.
   Ask the user: "Is this a full 4-stage task or a quick task?"
   - If quick → go to step 8.
   - If full → continue to step 4.
   - If the user already indicated the size, don't ask again.

--- FULL 4-STAGE WORKFLOW ---

4. Scoping (stage 1).
   Read `pm_skills/prompts/scoping.md` and follow
   its instructions. Output the scoping deliverables:
   - Problem framing
   - Affected areas
   - Key design decisions
   - Risks and dependencies
   - Smallest useful scope
   - Out of scope
   - Target file list
   - Open questions (only if genuinely blocking)

   Search the source tree to confirm affected files.
   Present scope to the user. Wait for approval before continuing.

5. Design options (stage 2).
   Read `pm_skills/prompts/design-options.md` and
   follow its instructions. Produce 2–3 design options with:
   - Summary, affected files, architectural fit, data flow, benefits,
     risks
   - A recommended option with rationale

   Present to the user. Wait for the user to pick an option.

6. Implementation plan (stage 3).
   Read `pm_skills/prompts/implementation-plan.md`
   and follow its instructions. Output:
   - Ordered file list with purpose
   - Data flow or architectural changes
   - New abstractions (with justification) or explicitly none
   - Tests to write or update
   - Step-by-step implementation sequence
   - Acceptance criteria
   - Watchouts
   - Files not to touch

   Present to the user. Wait for approval before continuing.

7. Validation (stage 4).
   Read `pm_skills/prompts/validation.md` and
   follow its instructions. Output:
   - Design sanity checks
   - Architecture checks
   - Regression risks
   - Test coverage assessment
   - Edge cases
   - Signs the scope is too large

   Present to the user. After approval, tell the user the design
   phase is complete and ask: "Ready to implement?"
   Wait for confirmation, then implement.
   Go to step 9.

--- QUICK TASK WORKFLOW ---

8. Quick scope and plan.
   Read `pm_skills/prompts/quick-task.md` and
   follow its instructions. Output:
   - What needs to change and why
   - Files to create or modify
   - Implementation sequence
   - Watchouts
   - Acceptance criteria

   Present to the user. After approval, implement.
   Go to step 9.

--- CLOSE TASK ---

9. Update project memory.
   After implementation is complete, update:
   - `pm_skills/project/backlog.md` — move this task to the
     Completed section, note any follow-up tasks in Active.
   - `pm_skills/project/file-map.md` — add or
     update entries for files created or changed.
   - `pm_skills/project/decision-log.md` — record
     the key design decision from this task.
   - `pm_skills/project/conventions.md` — if new
     conventions were established or existing ones changed.
   - `README.md` — if architecture, dev workflow, or key
     infrastructure changed significantly.
   - `AGENTS.md` — if this task established new invariants, data model
     changes, protected modules, event namespaces, or anti-patterns.
   - `UI-STANDARDS.md` — if this task established new token systems or
     UI conventions.
   - `DEV-INFRASTRUCTURE.md` — if this task changed build, dev server,
     versioning, or script conventions.

   Present the memory updates to the user for review.

<!-- FILE: .windsurf/workflows/init-project.md -->

---
description: Initialize a new project using PM Skills
---

Guide the user through project initialization. Follow these steps in
order, writing files as you go. Present results for review at each
step before proceeding to the next.

1. Fill in the project brief.
   Ask the user the questions from
   `pm_skills/project/brief.md` (what are we
   building, who is it for, platform, core features, constraints,
   out of scope, open questions).
   Write the answers to `pm_skills/project/brief.md`.

2. Generate the architecture.
   Read `pm_skills/project/brief.md`.
   Propose a tech stack, folder structure, key modules, communication
   patterns, dependency policy, dev workflow, and configuration
   strategy. Follow the template in
   `pm_skills/project/architecture.md`.
   Present the proposal for review. After approval, write it to
   `pm_skills/project/architecture.md`.

3. Generate the initial backlog.
   Read the brief and architecture.
   Propose 8–12 tasks grouped by milestone, ordered by dependency,
   small enough for a single session. Follow the template in
   `pm_skills/project/backlog.md`.
   Present for review. After approval, write to
   `pm_skills/project/backlog.md`.

4. Set initial conventions (optional).
   Ask the user if they have preferred code style, naming, commit
   format, testing, or documentation conventions. If yes, write to
   `pm_skills/project/conventions.md`.
   If unsure, skip — conventions will emerge during implementation.

5. Create a root README.md.
   Read the brief and architecture.
   Draft a concise project README with: one-paragraph description,
   how to run/build, key infrastructure, invariants, gotchas.
   Present for review. After approval, write to `README.md` in the
   project root.

6. Populate AGENTS.md.
   Read the brief, architecture, conventions (if exists), and
   `AGENTS.md`. Fill in every applicable `<!-- CUSTOMISE -->`
   placeholder using the information gathered so far. Follow the
   detailed instructions in `pm_skills/init.md`
   Step 6 for what each section needs.
   Present the populated version for review. After approval, write
   to `AGENTS.md`.

7. Populate UI-STANDARDS.md (if the project has UI).
   Read the brief, architecture, and `UI-STANDARDS.md`.
   Fill in the token systems section.
   Present for review. After approval, write to `UI-STANDARDS.md`.
   If no UI, tell the user this file can be removed.

8. Populate DEV-INFRASTRUCTURE.md (if the project has a build step).
   Read the brief, architecture, and `DEV-INFRASTRUCTURE.md`.
   Fill in every applicable `<!-- CUSTOMISE -->` placeholder.
   Present for review. After approval, write to
   `DEV-INFRASTRUCTURE.md`.
   If no build tooling, tell the user this file can be removed.

9. Copy scaffold files.
   Copy `pm_skills/scaffold/.editorconfig` and
   `pm_skills/scaffold/.gitignore` to the project
   root if they don't already exist.

10. Readiness check.
    Confirm all required files are populated:
    - `pm_skills/project/brief.md`
    - `pm_skills/project/architecture.md`
    - `pm_skills/project/backlog.md`
    - `README.md`
    - `AGENTS.md` (no remaining `[Project Name]` placeholder)
    - `UI-STANDARDS.md` (if applicable)
    - `DEV-INFRASTRUCTURE.md` (if applicable)
    - `.editorconfig`
    - `.gitignore`
    Report what is complete and what is missing.
    If everything is ready, tell the user to pick their first task
    from the backlog.

<!-- FILE: package.json -->

{
  "name": "dot-crowd-navigator",
  "version": "0.1.0",
  "description": "Dot Crowd Navigator — graph-based crowd-flow simulation tool",
  "type": "module",
  "scripts": {
    "start": "node build.js --watch --serve",
    "dev": "node build.js --watch --serve",
    "build": "NODE_ENV=production node build.js",
    "build:deploy": "npm run build && rm -rf docs && cp -r dist docs",
    "push": "node push.js",
    "test": "vitest run",
    "test:watch": "vitest watch",
    "serve": "python3 -m http.server 3000",
    "serve:dist": "cd dist && python3 -m http.server 3000"
  },
  "license": "MIT",
  "devDependencies": {
    "esbuild": "^0.27.0",
    "jsdom": "^27.2.0",
    "vitest": "^4.0.8"
  },
  "dependencies": {
    "mediabunny": "^1.39.2"
  }
}

