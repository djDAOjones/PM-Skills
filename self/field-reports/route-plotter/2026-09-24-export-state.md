<!-- field-report: project=route-plotter · date=2026-09-24 · type=export
     · pm-skills=4.7.0 (installed fresh by 599407f on 2026-08-17 with memory ported from the v2 line; never upgraded since)
     · source=Git blobs at 989f11dc564b55c160a1ae76d5a2f71b58945761 for the harness and gate configuration the project carries (.github, .devin, .editorconfig, .gitignore, .codeiumignore, .nvmrc, package.json, Route Plotter v3.code-workspace), taken 2026-09-24 by Claude Code (read from a scratch clone assembled from the remote and the checkout's objects, every ref set to its value at the cut-off 2026-09-24T11:40:00.000Z; content-addressed, so identical to the checkout's HEAD)
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained; session logs, prompts, agent memory and the bundle stay in the local lane -->

# State export

Snapshot: `989f11dc564b55c160a1ae76d5a2f71b58945761`.

| Path | Bytes |
| --- | ---: |
| `.codeiumignore` | 558 |
| `.devin/workflows/bugfix.md` | 4213 |
| `.devin/workflows/feature.md` | 4039 |
| `.editorconfig` | 520 |
| `.github/SECURITY.md` | 975 |
| `.github/SUPPORT.md` | 913 |
| `.github/workflows/ci.yml` | 697 |
| `.gitignore` | 908 |
| `.nvmrc` | 3 |
| `Route Plotter v3.code-workspace` | 60 |
| `package.json` | 1165 |

<!-- FILE: .codeiumignore -->

# Build output (duplicates src/ + styles/ + index.html)
docs/

# Personal dev notes, design docs, helper scripts
_Joe/*

# Allow Cascade to read the required agent dev guide only
!_Joe/dev notes/
_Joe/dev notes/*
!_Joe/dev notes/needs consolidating and deleting/
_Joe/dev notes/needs consolidating and deleting/*
!_Joe/dev notes/needs consolidating and deleting/dev guide.md

# Binary assets — no code value
images/
examples/

# Standard exclusions
node_modules/
dist/
.git/

# Binary file types (belt-and-suspenders)
*.png
*.jpg
*.jpeg
*.zip
*.mp4
*.webm

<!-- FILE: .devin/workflows/bugfix.md -->

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

<!-- FILE: .devin/workflows/feature.md -->

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

<!-- FILE: .github/SECURITY.md -->

# Security policy

## Reporting a vulnerability

Please report suspected vulnerabilities through
[GitHub private vulnerability reporting](https://github.com/djDAOjones/route-plotter/security/advisories/new).
Do not disclose a suspected vulnerability in a public issue, discussion, or
pull request before it has been assessed.

Include, where possible:

- the affected Route Plotter version or commit;
- the browser and operating system;
- clear reproduction steps and the expected impact;
- a minimal, non-sensitive project or input that demonstrates the problem;
- any suggested mitigation.

Avoid including personal data, confidential maps, credentials, or other
secrets. The maintainers will assess reports on a best-effort basis. No
response or remediation timeframe is guaranteed.

## Supported code

Security fixes target the current Route Plotter v3 code and its current
GitHub Pages deployment. Historical or separately archived versions are not
actively maintained.

<!-- FILE: .github/SUPPORT.md -->

# Support

Use [GitHub Issues](https://github.com/djDAOjones/route-plotter/issues) for bug
reports, reproducible compatibility problems, and focused feature requests.
Search existing issues first, then include:

- the Route Plotter version shown in the app;
- browser and operating-system versions;
- concise reproduction steps and the expected behaviour;
- screenshots or a minimal project file when they are safe to share;
- relevant error messages.

Support and maintenance are provided on a best-effort basis. There is no
guaranteed response time, resolution time, compatibility window, or commitment
to implement a request.

Do not upload confidential projects, personal data, credentials, or other
sensitive material to a public issue. Report suspected security
vulnerabilities privately through
[GitHub private vulnerability reporting](https://github.com/djDAOjones/route-plotter/security/advisories/new).

<!-- FILE: .github/workflows/ci.yml -->

name: Verify

on:
  pull_request:
  push:

permissions:
  contents: read

concurrency:
  group: verify-${{ github.ref }}
  cancel-in-progress: true

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Check out source
        uses: actions/checkout@v4

      - name: Use pinned Node version
        uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm

      - name: Install frozen dependencies
        run: npm ci

      - name: Run canonical verification
        run: npm run check

      - name: Prove verification did not rewrite Pages output
        run: git diff --exit-code -- docs version.json

<!-- FILE: .gitignore -->

# Dependencies
node_modules/

# System files
.DS_Store
Thumbs.db

# Editor directories and files
.vscode/
.idea/
.claude/
CLAUDE.local.md
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
.docs-build-*
.docs-backup-*
# docs/ - NOT ignored (needed for GitHub Pages)

# Local runtime ownership
.route-plotter-dev.pid

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

# User project exports are private unless individually reviewed for publication
*.zip
# …except the three example project archives the owner approved for publication
# on 2026-08-27 (public-assets.json -> exampleProjects). Named individually so
# the blanket rule still catches a stray user project save (DEMO-01).
!docs/examples/parm-aerial-walk.zip
!docs/examples/uon-open-day.zip
!docs/examples/nervous-system-flow.zip

<!-- FILE: .nvmrc -->

24

<!-- FILE: Route Plotter v3.code-workspace -->

{
	"folders": [
		{
			"path": "."
		}
	],
	"settings": {}
}

<!-- FILE: package.json -->

{
  "name": "route-plotter",
  "version": "3.2.0",
  "private": true,
  "description": "Route Plotter v3 - Interactive path animation tool",
  "type": "module",
  "packageManager": "npm@11.5.1",
  "engines": {
    "node": ">=24.0.0 <25"
  },
  "scripts": {
    "start": "node build.js --watch --serve",
    "dev": "node build.js --watch --serve",
    "build": "NODE_ENV=production node build.js",
    "build:check": "NODE_ENV=production node build.js --check",
    "build:deploy": "npm run build",
    "push": "node push.js",
    "push:dry-run": "node push.js --dry-run",
    "test": "vitest run --pool=threads --no-file-parallelism",
    "test:shell": "bash tests/restartSafety.test.sh",
    "check": "npm test && npm run test:shell && npm run build:check",
    "test:watch": "vitest watch --pool=threads --no-file-parallelism",
    "serve": "python3 -m http.server 3000",
    "serve:dist": "cd docs && python3 -m http.server 3000"
  },
  "license": "MIT",
  "devDependencies": {
    "axe-core": "^4.13.0",
    "esbuild": "^0.28.1",
    "jsdom": "^29.1.1",
    "vitest": "^4.1.11"
  },
  "dependencies": {
    "jszip": "^3.10.1",
    "mediabunny": "^1.55.3"
  }
}

