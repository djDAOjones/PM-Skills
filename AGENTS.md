# AI Agent Rules

<!-- NOTE: This file is a template. It contains CUSTOMISE placeholders
     that must be populated before it can serve as an authoritative behavioral
     contract. Complete the kickstart process (init.md Step 6) to fill them
     in. Until then, the project memory files in
     ai_project_manager_kickstart/project/ are the primary references. -->

<!-- CUSTOMISE: Replace [Project Name] and write a 2–4 sentence product
     description. State what the app IS and what mental model is canonical.
     Optionally state what it is NOT, to prevent the wrong assumptions. -->

## Product identity

**[Project Name]** — _[short product description]_.

---

## Who you are working with

The maintainer is a vibe coder who owns macro structure, UX direction,
and conceptual design — but not deep implementation. Do the work; don't
explain concepts back unless asked.

---

## Before every task

<!-- CUSTOMISE: Update the paths below to match your project layout.
     The defaults assume the kickstart pack lives at
     ai_project_manager_kickstart/ relative to the project root.
     README.md here refers to the project's own root README — the one
     created during init Step 5 that documents architecture, key
     infrastructure, invariants, and gotchas. It is NOT the framework's
     distribution README. If init has not been completed yet, skip
     this step. -->

1. Read `README.md` (architecture, key infrastructure, invariants,
   gotchas).
2. Read the project memory files in `ai_project_manager_kickstart/project/`:
   `brief.md`, `architecture.md`, `conventions.md` (if it exists),
   `file-map.md`, and `backlog.md`.
   Also read `decision-log.md` if the task involves design decisions
   or you need context on prior choices.
3. Read `UI-STANDARDS.md` for any task that touches UI, controls,
   layout, text, states, accessibility, or user-facing behaviour.
4. Read `DEV-INFRASTRUCTURE.md` (if it exists) for build, dev server,
   versioning, and script conventions.
5. For non-trivial work, follow the 4-stage prompt sequence in
   `ai_project_manager_kickstart/prompts/`: `scoping.md` →
   `design-options.md` → `implementation-plan.md` →
   `validation.md`. Get user sign-off on scope before writing code.
   For small tasks, use
   `ai_project_manager_kickstart/prompts/quick-task.md` instead.
6. Search the full source tree before proposing changes. Check for
   existing tuneable values and UI controls before adding new ones.

---

## Hard rules (invariants)

These apply unconditionally to every change.

- **All imports at the top of the file.** Mid-file imports break
  bundlers and make dependency chains harder to trace.
- **Build output directories are read-only.** Never hand-edit files
  that are overwritten by the build step.
- **Minimal runtime dependencies.** Do not add packages without
  explicit approval.
- **Carbon-first UI.** All UI work must follow IBM Carbon's productive
  design language: components, patterns, tokens, spacing, and
  interaction conventions. Carbon is the reference standard for how
  controls should look, behave, and be structured — but implemented in
  the project's own code, not via Carbon packages. See
  `UI-STANDARDS.md` for full rules.
- **WCAG 2.2 AAA by default.** 7:1 text contrast for normal text,
  ≥ 44 × 44 CSS px pointer targets, visible focus rings, no
  colour-only meaning. Where Carbon defaults meet AA but not AAA,
  adapt them. See `UI-STANDARDS.md` for full accessibility rules.

<!-- CUSTOMISE: Add project-specific invariants below. Examples:
     - Canonical data formats (e.g. normalised coordinates, UTC timestamps).
     - Cross-component communication rules (e.g. EventBus-only, no direct calls).
     - Specific token systems and how they coexist.
     - Programmatic update patterns to avoid feedback loops. -->

---

<!-- CUSTOMISE: Add a "Core data model" section describing the canonical
     entities, their properties, and the mental model that MUST be followed.
     State what patterns are explicitly forbidden. Example:

## Core data model

The canonical model is:
- **`EntityA`** — id, properties…
- **`EntityB`** — id, relationships…

Do **not** introduce [anti-pattern X] or [legacy pattern Y]. -->

---

<!-- CUSTOMISE: If the project has domain-specific subsystems (simulation,
     rendering pipeline, data pipeline, etc.), add a section for each one
     describing the design contract agents must follow. -->

---

<!-- CUSTOMISE: If this project was forked from or shares history with
     another codebase, add a "Relationship to [Original]" section.
     State what to keep, what to reject, and which legacy mental models
     are NOT canonical. -->

---

<!-- CUSTOMISE: If there are modules that must not be deleted, renamed,
     or restructured without approval, list them in a
     "Protected infrastructure" table:

## Protected infrastructure

| Module | Role | Notes |
| --- | --- | --- |
| `example.js` | Description | Migration plan or n/a |

Do not delete, rename, or restructure protected modules without
explicit approval. -->

---

<!-- CUSTOMISE: Define event namespaces for your project, or remove
     this section if not applicable. Keep namespaces consistent and
     do not create synonyms for existing event names. Example:

## Event naming convention

Use colon-separated namespaces for all events. Group by domain:

- `domain:entity:action` for model events.
- `ui:component:action` for UI events.
- `app:lifecycle:action` for application-level events.

     If the project uses hooks, direct imports, or another pattern
     instead of events, state that here and remove the namespace
     guidance. -->

---

## UI, usability, and accessibility (summary)

Full rules are in `UI-STANDARDS.md`. Read that file for any task that
touches UI. The key principles are:

- **Carbon is the reference standard.** Follow Carbon's productive
  design language for all controls, layout, spacing, and interaction.
  Implement to Carbon's spec, not via Carbon packages.
- **WCAG 2.2 AAA by default, exceptions documented.** 7:1 contrast,
  44 px targets, keyboard operability, no colour-only meaning, visible
  focus, semantic HTML first.
- **Nielsen heuristics are hard rules, not aspirations.** Visibility of
  status, user control and freedom, consistency, error prevention,
  recognition over recall, flexibility, minimalist design, error
  recovery, and contextual help all apply to every UI change.
- **Design review gate.** Every UI-affecting change must pass the
  checklist in `UI-STANDARDS.md` before sign-off.

---

## Minimal change discipline

- Don't reorganise code you weren't asked to touch.
- Don't add or remove comments in code you weren't asked to touch.
  New code should follow the documentation rules below.
- Don't introduce new abstractions for a single use case.
- Match existing style (indent size, quote style, semicolons, etc.).
- Avoid speculative abstractions unless there is duplication, unstable
  logic, or a clear reuse case.

---

## Code documentation

<!-- CUSTOMISE: Confirm or adjust the documentation standard.
     JSDoc is the default for JavaScript and TypeScript projects.
     For Python, use docstrings. Adjust to match your language. -->

- New and modified functions, classes, and modules should have
  meaningful comments explaining **why**, not restating **what**.
- Use **JSDoc** for exported functions, classes, and modules. Document
  purpose, parameters, return values, and side effects.
- Comments are for AI agents first and future humans second. Write
  them to provide context that is not obvious from the code alone.
- Do not add boilerplate or redundant comments that restate the code.
  Every comment should earn its place.

Project-specific documentation conventions (what to document, depth,
exceptions) are in `ai_project_manager_kickstart/project/conventions.md`.

---

## Testing

<!-- CUSTOMISE: Define what testing means for this project today.
     If there is no test runner yet, say so and describe the expected
     manual verification steps. Update this section as the testing
     infrastructure matures. Example stages:
     1. Manual browser/CLI verification for UI and integration.
     2. Unit tests for model, state, and utility code.
     3. Automated integration or end-to-end tests.
     Replace the defaults below with your project's actual policy. -->

- Run the project's build and test steps after every change. If no
  automated test runner exists yet, verify the change manually and
  note what was checked.
- Never delete or weaken existing tests.
- Add a test for any new model method or utility function when a
  test runner is available.

Project-specific testing policy (framework, coverage bar, what to
test) is in `ai_project_manager_kickstart/project/conventions.md`.

---

## Files to never edit

<!-- CUSTOMISE: List build output dirs, personal notes, or any other
     paths that agents must never touch. Examples:
     - docs/ or dist/ — build output, overwritten on every build.
     - version.json — managed by the build script.
     - node_modules/ — managed by npm.
     - package-lock.json — managed by npm (commit but do not edit). -->

- Build output directories.

See `DEV-INFRASTRUCTURE.md` for the concrete list of protected paths.

---

<!-- CUSTOMISE: This checklist applies to apps with stateful models
     that persist to localStorage, files, or a database. If the project
     has no persistence layer, remove this section. Define the concrete
     steps for your project's persistence pattern. Example for a
     JS app with manual serialisation:

## Persistence checklist

     When adding any property that should survive reload:
     1. Default in constructor (relevant model class).
     2. Include in serialisation (`toJSON()` or equivalent).
     3. Handle in deserialisation (`fromJSON()` or equivalent) with
        fallback default.
     4. Serialise in auto-save.
     5. Restore in load/auto-load.

     Example for an ORM-based app:
     1. Add the field to the model definition.
     2. Create and run a migration.
     3. Handle the field in any import/export functions with a fallback
        default.
     4. Verify it persists correctly via the ORM layer. -->

---

## Document ownership

Project knowledge is split across these layers:

- **`AGENTS.md`** — permanent hard rules, invariants, data model
  contracts, protected modules, event namespaces, and anti-patterns.
  Updated when major architectural or design decisions change.
- **`UI-STANDARDS.md`** — permanent UI, accessibility, and usability
  rules. Updated when new token systems or UI conventions are
  established.
- **`DEV-INFRASTRUCTURE.md`** — permanent build, dev server,
  versioning, and script conventions. Updated when build or deployment
  decisions change.
- **`project/` memory files** — living project context: brief,
  architecture, backlog, file map, conventions, and decision log.
  Updated at the end of every task session.

When in doubt about where a rule belongs: if it is an unconditional
invariant, it goes in `AGENTS.md`. If it is a UI convention, it goes
in `UI-STANDARDS.md`. If it is a build or dev workflow rule, it goes
in `DEV-INFRASTRUCTURE.md`. If it is evolving context, it goes in
`project/`.

---

## Anti-patterns to reject

If you find yourself doing any of these, stop and reconsider:

- Bypassing the project's established communication pattern (e.g.
  direct method calls when the project uses events or hooks).
- Inventing a custom UI control when Carbon provides a suitable pattern.
- Installing Carbon packages instead of implementing to Carbon's spec.
- Using AA contrast thresholds when AAA (7:1) is required.
- Leaving a panel, state, or error condition without an intentional,
  visible, accessible treatment.
- Hard-coding values that should be tokenised or configurable.
- Adding runtime dependencies without explicit approval.

Project-specific anti-patterns are in
`ai_project_manager_kickstart/project/conventions.md` under
"Patterns to avoid".

<!-- CUSTOMISE: Add project-specific anti-patterns below. Examples:
     - Iterating data as if it has an implicit order when it doesn't.
     - Using a legacy abstraction as a design reference.
     - Collapsing parallel token systems into one. -->
