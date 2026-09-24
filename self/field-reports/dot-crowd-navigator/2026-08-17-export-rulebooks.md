<!-- field-report: project=dot-crowd-navigator · date=2026-08-17 · type=export
     · pm-skills=unversioned (pre-1.0.0 framework tree: pm_skills/ with project memory and no VERSION file; committed on 2026-08-17 in an as-found snapshot of the April work)
     · source=rulebooks and contract files at 8d388802cccda3462e8bd110fae636a9db4ba845, from Git blobs, taken 2026-09-24 by Claude Code (read from a scratch clone assembled from the remote and the checkout's objects, every ref set to its value at the cut-off 2026-09-24T11:40:00.000Z; content-addressed, so identical to the checkout's HEAD)
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained; session logs and the bundle stay in the local lane -->

# Rulebook export

Snapshot: `8d388802cccda3462e8bd110fae636a9db4ba845`. Files: `AGENTS.md`, `AGENTS.md.new`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md`, `README.md`, `SALVAGE-NOTE.md`.

<!-- FILE: AGENTS.md -->

# AI Agent Rules

## Product identity

**Dot Crowd Navigator** — a graph-based crowd-flow simulation tool.
Users draw a network of nodes and weighted edges over a background
image (map or venue plan), then run a swarm of animated dots through
that network to visualise pedestrian or crowd flow patterns.

The canonical mental model is **graph + swarm**: nodes are junctions,
edges are routes with weights and direction, and the simulation sends
dots through the network proportional to edge weights.

This is **not** Route Plotter. Route Plotter was "one route, one
timeline, one animated head." Dot Crowd Navigator is "a route network
with many moving agents." Do not reference waypoints, beacons, camera
keyframes, or motion visibility — those concepts do not exist here.

---

## Who you are working with

The maintainer is a vibe coder who owns macro structure, UX direction,
and conceptual design — but not deep implementation. Do the work; don't
explain concepts back unless asked.

---

## Before every task

1. Read `README.md` (architecture, key infrastructure, invariants,
   gotchas).
2. Read the project memory files in `pm_skills/project/`:
   `brief.md`, `architecture.md`, `conventions.md` (if it exists),
   `file-map.md`, and the Active section of `backlog.md`.
   Also read `decision-log.md` if the task involves design decisions
   or you need context on prior choices.
3. Read `UI-STANDARDS.md` for any task that touches UI, controls,
   layout, text, states, accessibility, or user-facing behaviour.
4. Read `DEV-INFRASTRUCTURE.md` (if it exists) for build, dev server,
   versioning, and script conventions.
5. For non-trivial work, follow the 4-stage prompt sequence in
   `pm_skills/prompts/`: `scoping.md` →
   `design-options.md` → `implementation-plan.md` →
   `validation.md`. Get user sign-off on scope before writing code.
   For small tasks, use
   `pm_skills/prompts/quick-task.md` instead.
6. Search the full source tree before proposing changes. Check for
   existing tuneable values and UI controls before adding new ones.

---

## Hard rules (invariants)

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
- **Normalised coordinates for all stored positions.** Node and
  control point positions are stored as fractions of image dimensions
  (0.0–1.0). Canvas pixel coordinates are derived at render time via
  `CoordinateTransform`. Never store pixel positions.
- **EventBus-only cross-module communication.** No direct method calls
  between UI, renderer, and model layers. Modules import only EventBus
  and their own data models.
- **Three token systems, never collapsed.** Carbon-aligned structural
  (`--space-`, `--text-`, `--control-`, `--ui-`, `--border-`, `--radius-`,
  `--motion-`, `--elev-`), UoN brand (`--uon-`), and Okabe-Ito map
  palette (`--map-series-`) serve different purposes. All defined in
  `tokens.css`. Do not merge them. See `UI-STANDARDS.md` for full rules.
- **Graph model is the single source of truth.** All graph state lives
  in `GraphModel`. Renderers and UI read from it via events. Never
  cache graph state in a renderer or controller.

---

## Core data model

The canonical model is:

- **`GraphNode`** — `id`, normalised position (`x`, `y`), type
  (`normal` | `entry` | `exit`), label config, visual state.
- **`GraphEdge`** — `id`, `sourceId`, `targetId`, `weight` (positive
  number), `direction` (`one-way` | `two-way`), control points array,
  cached path geometry.
- **`GraphModel`** — Collection of nodes and edges. CRUD, adjacency
  queries, full serialisation via `toJSON`/`fromJSON`.
- **`SimulationState`** (Phase 2) — Dot count, release period, onset
  variance, speed variance, intensity ramp, lifecycle mode.

Do **not** introduce `Waypoint`, `AnimationState`, or any linear-route
abstraction. The graph model is not ordered — edges define
connectivity, not sequence.

---

## Domain subsystems

### Graph editing subsystem (Phase 1)

- **Owner:** `GraphModel` (state), `GraphInteractionHandler` (input),
  `GraphRenderer` (output), `GraphUIController` (sidebar).
- **Contract:** All mutations go through `GraphModel` methods.
  `GraphModel` emits events. Renderer and UI subscribe to events.
  No renderer writes to model. No UI writes to model directly.

### Swarm simulation subsystem (Phase 2)

- **Owner:** `SimulationState` (config), `SwarmEngine` (logic),
  `DotRenderer` (output).
- **Contract:** `SwarmEngine` reads from `GraphModel` (edges, weights,
  entry/exit nodes) but never mutates it. Simulation parameters live
  in `SimulationState`. Rendering is separated from simulation logic
  for performance — `SwarmEngine` produces dot positions,
  `DotRenderer` paints them.

---

## Relationship to Route Plotter

Dot Crowd Navigator was forked from Route Plotter. The relationship is
"same shell, different core."

**Keep:** EventBus, CoordinateTransform, StorageService, UndoService,
PathCalculator (adapted for per-edge use), CatmullRom, Easing,
SwatchPicker, Dropdown, Tooltip, focusTrap, tokens.css, build pipeline,
test setup, background image workflow.

**Reject:** Waypoint model, AnimationState, AnimationEngine,
RenderingService, CameraService, BeaconRenderer,
MotionVisibilityService, HTMLExportService, ImageAssetService, Area
services. These are Route Plotter-specific and have no equivalent in
Dot Crowd Navigator.

**Legacy mental models that are NOT canonical:**

- "One ordered route" — replaced by an unordered graph.
- "One animated path head" — replaced by a swarm of dots.
- "Progress 0.0–1.0 along a single path" — replaced by per-dot
  position on per-edge paths.
- "Waypoint as the fundamental entity" — replaced by GraphNode.

---

## Protected infrastructure

| Module | Role | Notes |
| --- | --- | --- |
| `src/core/EventBus.js` | All cross-module communication | Do not modify API |
| `src/services/CoordinateTransform.js` | Normalised ↔ canvas coords | Core to all rendering |
| `src/services/StorageService.js` | Autosave + save/load | Serialisation contract |
| `src/services/UndoService.js` | Undo/redo stack | Used by all mutations |
| `src/utils/CatmullRom.js` | Spline math | Shared by path systems |
| `styles/tokens.css` | Design token definitions | Three token systems |
| `build.js` | esbuild build script | Build + dev server |

Do not delete, rename, or restructure protected modules without
explicit approval.

---

## Event naming convention

Use colon-separated namespaces for all events. The established
namespaces are:

- `graph:node:added` / `:moved` / `:deleted` — graph node mutations.
- `graph:edge:added` / `:updated` / `:deleted` — graph edge mutations.
- `graph:selection:changed` — user selected a node or edge.
- `ui:controls:change` — a UI parameter changed.
- `sim:swarm:start` / `:tick` / `:end` — simulation lifecycle.
- `export:video:progress` / `:complete` — video export status.
- `app:project:loaded` — full state refresh after load.
- `app:background:changed` — background image loaded.

Keep namespaces consistent. Do not create synonyms for existing event
names. New events must follow the `domain:entity:action` pattern.

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

- New and modified functions, classes, and modules should have
  meaningful comments explaining **why**, not restating **what**.
- Use **JSDoc** for exported functions, classes, and modules. Document
  purpose, parameters, return values, and side effects.
- Comments are for AI agents first and future humans second. Write
  them to provide context that is not obvious from the code alone.
- Do not add boilerplate or redundant comments that restate the code.
  Every comment should earn its place.

Project-specific documentation conventions (what to document, depth,
exceptions) are in `pm_skills/project/conventions.md`.

---

## Testing

- Run the project's build and test steps after every change.
- Never delete or weaken existing tests.
- Add a test for any new model method or utility function.
- **Framework:** Vitest (with jsdom for DOM tests).
- **Run:** `npm test` (single run), `npm run test:watch` (watch mode).

Project-specific testing policy (coverage bar, what to test) is in
`pm_skills/project/conventions.md`.

---

## Files to never edit

- `docs/` — GitHub Pages build output (generated by `npm run build:deploy`).
- `dist/` — esbuild production output (generated by `npm run build`).
- `_Joe/` — Personal developer notes, design docs, and helper scripts.
- `pm_skills/prompts/` — Reusable prompt templates (read-only reference).
- `pm_skills/integrations/` — Workflow templates (read-only reference).

See `DEV-INFRASTRUCTURE.md` for the concrete list of protected paths.

---

## Persistence checklist

When adding any property that should survive reload:

1. Default in constructor (relevant model class).
2. Include in serialisation (`toJSON()` or equivalent).
3. Handle in deserialisation (`fromJSON()` or equivalent) with fallback
   default.
4. Serialise in auto-save.
5. Restore in load/auto-load.

---

## Document ownership

| Layer | Owns | Update when |
| --- | --- | --- |
| `AGENTS.md` | Hard rules, invariants, data model, anti-patterns | Major architectural or design decisions change |
| `UI-STANDARDS.md` | UI, accessibility, usability rules | New token systems or UI conventions established |
| `DEV-INFRASTRUCTURE.md` | Build, dev server, versioning, scripts | Build or deployment decisions change |
| `pm_skills/project/` memory files | Brief, architecture, backlog, file map, conventions, decision log | End of every task session |

When in doubt: unconditional invariant → `AGENTS.md`. UI convention →
`UI-STANDARDS.md`. Build/dev rule → `DEV-INFRASTRUCTURE.md`. Evolving
context → `pm_skills/project/`.

---

## Anti-patterns to reject

- Bypassing EventBus with direct method calls between modules.
- Inventing a custom UI control when Carbon provides a suitable pattern.
- Installing Carbon packages instead of implementing to Carbon's spec.
- Leaving a panel, state, or error condition without an intentional,
  visible, accessible treatment.
- Hard-coding values that should be tokenised or configurable.
- Adding runtime dependencies without explicit approval.
- Treating graph nodes as if they have an implicit order (they don't —
  the graph is unordered).
- Using Route Plotter's `Waypoint`, `AnimationState`, or
  `AnimationEngine` as a design reference for new code.
- Collapsing the three token systems (Carbon structural, `--uon-`,
  `--map-series-`) into one.
- Storing canvas pixel positions instead of normalised coordinates.
- Caching graph state in renderers or controllers — read from
  `GraphModel` via events.

Project-specific anti-patterns are also in
`pm_skills/project/conventions.md` under "Patterns to avoid".

<!-- FILE: AGENTS.md.new -->

# AI Agent Rules

<!-- NOTE: This file is a template. Complete init.md Step 6 to populate
     the CUSTOMISE placeholders. Until then, the project memory files
     in pm_skills/project/ are the primary references. -->

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
     pm_skills/ relative to the project root.
     README.md here refers to the project's own root README — the one
     created during init Step 5 that documents architecture, key
     infrastructure, invariants, and gotchas. It is NOT the framework's
     distribution README. If init has not been completed yet, skip
     this step. -->

1. Read `README.md` (architecture, key infrastructure, invariants,
   gotchas).
2. Read the project memory files in `pm_skills/project/`:
   `brief.md`, `architecture.md`, `conventions.md` (if it exists),
   `file-map.md`, and the Active section of `backlog.md`.
   Also read `decision-log.md` if the task involves design decisions
   or you need context on prior choices.
3. Read `UI-STANDARDS.md` for any task that touches UI, controls,
   layout, text, states, accessibility, or user-facing behaviour.
4. Read `DEV-INFRASTRUCTURE.md` (if it exists) for build, dev server,
   versioning, and script conventions.
5. For non-trivial work, follow the 4-stage prompt sequence in
   `pm_skills/prompts/`: `scoping.md` →
   `design-options.md` → `implementation-plan.md` →
   `validation.md`. Get user sign-off on scope before writing code.
   For small tasks, use
   `pm_skills/prompts/quick-task.md` instead.
6. Search the full source tree before proposing changes. Check for
   existing tuneable values and UI controls before adding new ones.

---

## Hard rules (invariants)

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
exceptions) are in `pm_skills/project/conventions.md`.

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
test) is in `pm_skills/project/conventions.md`.

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

| Layer | Owns | Update when |
| --- | --- | --- |
| `AGENTS.md` | Hard rules, invariants, data model, anti-patterns | Major architectural or design decisions change |
| `UI-STANDARDS.md` | UI, accessibility, usability rules | New token systems or UI conventions established |
| `DEV-INFRASTRUCTURE.md` | Build, dev server, versioning, scripts | Build or deployment decisions change |
| `project/` memory files | Brief, architecture, backlog, file map, conventions, decision log | End of every task session |

When in doubt: unconditional invariant → `AGENTS.md`. UI convention →
`UI-STANDARDS.md`. Build/dev rule → `DEV-INFRASTRUCTURE.md`. Evolving
context → `project/`.

---

## Anti-patterns to reject

- Bypassing the project's established communication pattern (e.g.
  direct method calls when the project uses events or hooks).
- Inventing a custom UI control when Carbon provides a suitable pattern.
- Installing Carbon packages instead of implementing to Carbon's spec.
- Leaving a panel, state, or error condition without an intentional,
  visible, accessible treatment.
- Hard-coding values that should be tokenised or configurable.
- Adding runtime dependencies without explicit approval.

Project-specific anti-patterns are in
`pm_skills/project/conventions.md` under
"Patterns to avoid".

<!-- CUSTOMISE: Add project-specific anti-patterns below. Examples:
     - Iterating data as if it has an implicit order when it doesn't.
     - Using a legacy abstraction as a design reference.
     - Collapsing parallel token systems into one. -->

<!-- FILE: UI-STANDARDS.md -->

# UI Standards

This file contains the full UI, usability, and accessibility rules for
the project. `AGENTS.md` references this file. Read it before any task
that touches UI, controls, layout, text, states, accessibility, or
user-facing behaviour.

---

## Design system

IBM Carbon Design System is the **reference standard** for this
project. Carbon is not installed as a package dependency. All UI
components are implemented in the project's own code to match Carbon's
productive design language: component anatomy, interaction behaviour,
spacing, sizing, and visual conventions.

### Carbon-first UI discipline

- Prefer Carbon components, patterns, tokens, spacing, and interaction
  conventions wherever a suitable Carbon solution exists. Do not invent
  a custom control if Carbon already provides an appropriate one.
- Use Carbon's **productive** UI style for the working interface, not
  expressive or marketing styling.
- Use semantic design tokens for colour, spacing, typography, layer,
  border, and state. Do not hard-code ad hoc UI values unless there is
  no suitable tokenised equivalent.
- Keep layouts modular, consistent, and task-focused. Reuse an existing
  Carbon pattern before creating a new one.
- Where Carbon defaults meet AA but not this project's stricter AAA
  target, adapt them. Carbon is the baseline, not the ceiling.

### Token systems

Three token systems run side by side in `styles/tokens.css`:

| System | Prefix | Governs | Examples |
| --- | --- | --- | --- |
| **UoN brand palette** | `--uon-` | Source brand colours, UI surfaces, interactive states, text hierarchy, support/feedback colours, links | `--uon-blue`, `--uon-nottingham-blue`, `--uon-jubilee-red`, `--ui-01`…`--ui-05`, `--text-01`…`--text-05`, `--support-error`, `--interactive-01` |
| **Okabe-Ito map palette** | `--map-series-` | Canvas/data series colours (colour-blind safe), map rendering tokens (ink, marker, path, label, selection) | `--map-series-0`…`--map-series-8`, `--map-ink`, `--map-label-text` |
| **Carbon-aligned structural** | `--space-`, `--text-`, `--control-`, `--radius-`, `--motion-`, `--elev-` | Spacing scale, typography scale, control sizing, border widths, radii, elevation, motion timing, focus ring | `--space-1`…`--space-8`, `--text-xs`…`--text-xl`, `--control-h`, `--radius-2`, `--motion-fast`, `--elev-2` |

**Rules:**

- Do **not** collapse these systems into one. Each serves a distinct
  purpose (brand identity, data accessibility, structural layout).
- UoN tokens define **what colour** — Carbon-aligned tokens define
  **how much space, how big, how fast**.
- Okabe-Ito tokens are used **only on the canvas** for data series.
  Never use `--map-series-*` for UI chrome.
- When adding a new token, decide which system owns it based on the
  table above. If it's a brand colour → `--uon-`. If it's a canvas
  data colour → `--map-series-`. If it's spacing, sizing, or
  structural → use the Carbon-aligned prefix.
- The file also contains legacy compatibility aliases (e.g.
  `--primary`, `--color-primary`). Do not add new aliases. Migrate
  away from them when touching related code.
- `@media (prefers-contrast: more)` and `@media (prefers-reduced-motion: reduce)` overrides are defined at the bottom of `tokens.css`. Respect these when adding new tokens.

---

## Usability heuristics

The following rules are derived from Nielsen's usability heuristics.
They are **hard operating rules**, not aspirational guidelines.

### Match between the system and the real world

- Prefer user language over internal or technical jargon.
- Use words, phrases, and concepts familiar to the user.
- Follow real-world conventions and natural ordering.
- Labels, messages, and control names must describe the task the user is
  actually trying to do, not the implementation beneath it.

### Carbon content and form rules

- Use **sentence case** for UI text.
- Every input must have a visible label.
- Visible label text must be reflected in the accessible name.
- Labels must be concise and clear; prefer 1–3 words where practical.
- Do not use colons after labels.
- Use helper text only when it prevents error, clarifies format, or
  explains consequence.
- Prefer native HTML form controls before custom ARIA-heavy controls.
- Group related controls with clear headings and structure.

### Visibility of system status

- Every async or delayed action must show status immediately:
  loading, progress, success, or error.
- The UI must never appear frozen during processing.
- Long-running work must show an explicit loading state, and heavy
  operations should show progress where possible.
- Important status changes must be announced programmatically where
  relevant, not only shown visually.
- Auto-save, export, import, render, and recovery states must be visible
  and understandable.

### Empty, loading, and no-data states

- Every major panel, canvas, or workspace must have an intentional empty
  state.
- Empty states must explain what belongs here and what the user can do
  next.
- Loading states must indicate that work is in progress and preserve
  layout stability where practical.
- No-data states must distinguish between "nothing here yet", "filtered
  out", "failed to load", and "not available".
- Do not leave blank panels, unexplained placeholders, or silent failure
  states.

### User control and freedom

- Provide cancel, close, back out, or undo routes for any non-trivial
  action.
- Do not trap the user in transient modes, overlays, or incomplete
  flows.
- Keyboard escape routes must remain available where appropriate.
- Destructive actions must have clear confirmation or a reliable undo
  path.
- The user must be able to recover from accidental actions without
  having to reload or lose work.

### Consistency and standards

- Use the same words, icons, control patterns, spacing logic, and
  interaction rules for the same concepts throughout the app.
- Follow existing project event names, UI terms, Carbon conventions, and
  established design tokens.
- Do not create synonyms for existing concepts.
- Similar panels and controls should behave the same way unless there is
  a clear documented reason for divergence.

### Error prevention

- Prevent errors before they happen: constrain invalid input, validate
  early, and disable impossible actions.
- Prefer safe defaults over blank or dangerous defaults.
- For critical submissions, destructive actions, or irreversible changes,
  provide validation, confirmation, reversal, or a combination of these.
- Do not allow invalid states to propagate silently through the UI.

### Recognition rather than recall

- Keep key controls visible when needed.
- Do not rely on users remembering hidden modes, keyboard shortcuts,
  required formats, invisible constraints, or prior state.
- Show current selection, active mode, current tool, and important state
  changes explicitly in the interface.
- Surface useful context near the point of action rather than forcing
  the user to remember information from elsewhere.

### Flexibility and efficiency of use

- Support both novice use and efficient repeat use.
- Preserve sensible defaults, but expose efficient shortcuts for common
  actions.
- Reduce unnecessary clicks, repeated input, and mode switching.
- Where the platform supports multiple input types, do not force users
  into a single input modality.
- Avoid drag-only interactions; provide click, tap, and keyboard
  alternatives where practical.

### Aesthetic and minimalist design

- Keep interfaces lean and task-relevant.
- Do not add decorative chrome, redundant copy, visual noise, or
  competing calls to action.
- Motion, colour, and visual emphasis must support task completion, not
  distract from it.
- Dense tools are acceptable where needed, but clutter is not.

### Help users recognize, diagnose, and recover from errors

- Error messages must say what happened, where relevant, and what the
  user should do next.
- Errors must be specific, human-readable, and linked to the relevant
  field or control both visually and programmatically.
- Do not use vague failures such as "Something went wrong" without
  actionable detail where detail can safely be provided.
- Where recovery is possible, the UI must point directly to the recovery
  route.

### Help and documentation

- Provide contextual help for non-obvious controls, workflows, or modes.
- Help content must be task-focused, concrete, and brief.
- Prefer inline guidance, helper text, and tooltips over forcing users
  into external documentation for routine actions.
- Use headings and structure so help content can be scanned quickly.

### Motion and attention discipline

- Motion must be subtle, purposeful, and easy to ignore.
- Non-essential motion should be reduced or disabled when possible.
- Respect `prefers-reduced-motion`.
- Do not use motion as the only carrier of meaning.
- No content may flash more than three times in any one-second period.

---

## Accessibility — WCAG 2.2 AAA by default

This project targets **WCAG 2.2 AAA by default for all applicable UI
and content**. Do not claim blanket AAA conformance unless all
applicable success criteria are actually met. Use **AAA by default,
exceptions documented** as the working rule. Where a criterion cannot
reasonably apply or must be excepted, record the exception explicitly
in change notes or implementation notes.

### Perceivable

- Text and images of text must meet **7:1 contrast**.
- Large-scale text may use **4.5:1** only where WCAG permits it.
- Do not rely on colour alone to convey state, status, meaning, or
  required action.
- Avoid images of text unless essential.
- Link text must make sense on its own; avoid vague text such as "more",
  "here", or "click here".
- Use headings and landmarks to structure substantial content and
  control-heavy panels.
- Provide text alternatives for meaningful non-text content.

### Operable

- All functionality must be keyboard operable without traps.
- Focus order must be logical and must preserve meaning.
- Focus indicators must be clearly visible, high-contrast, and not
  obscured by sticky headers, overlays, or custom panels.
- Pointer targets should be at least **44 × 44 CSS px** unless a WCAG
  exception clearly applies.
- Do not require path-based gestures, dragging, hovering, or fine motor
  precision when a simpler alternative can be provided.
- Interaction-triggered motion must be avoidable when non-essential.
- Provide pause, stop, or hide controls for moving, blinking, scrolling,
  or auto-updating content when applicable.
- Warn clearly before any timeout that could cause data loss, and
  preserve work where practical.

### Understandable

- Use predictable behaviour and consistent placement.
- Do not change context unexpectedly on focus, input, or selection
  unless clearly signposted and user-initiated.
- Form instructions, validation, and recovery guidance must be clear and
  placed near the relevant control.
- Visible labels and accessible names must match closely enough to
  support speech input and assistive technology use.
- Use user-facing terminology, not internal implementation terms.

### Robust

- Prefer semantic HTML before ARIA; no ARIA is better than bad ARIA.
- Use ARIA only when native semantics do not provide the required
  meaning or behaviour.
- Dynamic updates such as loading, validation, save status, and errors
  must be exposed programmatically where relevant.
- Custom widgets must expose role, name, value, and state correctly.

---

## Design review gate

Before sign-off on any UI-affecting change, verify:

1. Which Carbon component or pattern this change follows.
2. Why a custom pattern was necessary if Carbon was not used.
3. Which Nielsen heuristics were most at risk.
4. Text contrast meets **7:1** for normal text and **4.5:1** for large
   text where permitted.
5. Focus order, focus visibility, and focus non-obscuration still work.
6. All pointer targets meet **44 × 44 CSS px** unless a documented WCAG
   exception applies.
7. Visible labels match accessible names.
8. Link text is self-describing without surrounding context.
9. Empty, loading, success, validation, and error states were all
   considered and are not visual-only.
10. Keyboard, pointer, and assistive-technology routes all still work.
11. Motion can be reduced or disabled where non-essential.
12. Critical submissions or destructive actions support validation,
    confirmation, undo, or reversal as appropriate.
13. Any exception to the AAA-by-default rule is documented explicitly.

<!-- FILE: DEV-INFRASTRUCTURE.md -->

# Dev Infrastructure

This file defines the permanent rules for how the project is built,
run, tested, versioned, and shipped. `AGENTS.md` references this file.
Read it before any task that involves the build system, dev server,
scripts, configuration, or deployment.

---

## Package management

Package manager: **npm**

- `package.json` lives in the project root.
- **Runtime dependencies** require explicit approval. Currently one:
  `mediabunny` (video export).
- **Dev dependencies:** esbuild (bundler), Vitest (test runner),
  jsdom (test DOM).
- Run `npm install` after cloning. Do not commit `node_modules/`.

---

## Canonical scripts

| Script | Command | Purpose | When to use |
| --- | --- | --- | --- |
| `dev` | `node build.js --watch --serve` | Dev server with hot rebuild | Day-to-day development |
| `start` | `node build.js --watch --serve` | Alias for `dev` | Same as dev |
| `build` | `NODE_ENV=production node build.js` | Production build | Before deploy |
| `build:deploy` | `npm run build && rm -rf docs && cp -r dist docs` | Build + copy to GitHub Pages dir | When ready to ship |
| `test` | `vitest run` | Run tests once | After every change |
| `test:watch` | `vitest watch` | Tests in watch mode | During development |
| `push` | `node push.js` | Build + commit + push | When ready to ship |
| `serve` | `python3 -m http.server 3000` | Static file server (no build) | Quick preview |
| `serve:dist` | `cd dist && python3 -m http.server 3000` | Serve production build | Verify build output |

Do not add scripts without updating this table.

---

## Dev server

- **URL:** `http://localhost:3000`
- **Start:** `npm run dev`
- **Serves:** Build output via esbuild's built-in server (rebuilds on
  JS change).

All development and testing should use this URL. Do not hard-code
alternative ports or URLs.

---

## Build system

- **Bundler:** esbuild (via custom `build.js`)
- **Entry point:** `src/main.js`
- **Output directory:** `dist/` (copied to `docs/` for GitHub Pages
  via `build:deploy`)
- **Format:** ESM bundle
- **Source maps:** Enabled
- **Minification:** Production builds only
- **Static files:** `index.html` and `styles/*.css` are copied to
  the output directory by the build script.

The output directories (`dist/`, `docs/`) are **read-only** — never
hand-edit files in them. They are overwritten on every build.

---

## Version management

Format: `major.minor.build` (e.g. `0.1.76`)

| Component | Source | Updated | Example |
| --- | --- | --- | --- |
| `major.minor` | `package.json` version field | Manually, for features or breaking changes | 0.1 → 0.2 |
| `build` | `version.json` build field | Automatically, once per dev session | 0.1.75 → 0.1.76 |

The combined version is injected at build time via esbuild's `define`
feature as `APP_VERSION`. It is a compile-time constant with no
runtime overhead.

Do not edit `version.json` manually — the build script manages it.
Bump `major.minor` in `package.json` when shipping a new feature or
breaking change.

---

## Deployment

- **Target:** GitHub Pages (served from `docs/` on `main` branch)
- **Pipeline:** `npm run build:deploy` → builds to `dist/`, copies to
  `docs/`, ready to commit and push.
- **Post-deploy:** Verify the live URL matches the latest build
  version.

---

## Utility scripts

- **`push.js`** — Runs a production build, stages all changes, commits
  with a version-stamped message, and pushes to the remote. Safe to
  run without review for routine commits. Does not force-push.

---

## Configuration strategy

- **Constants:** `src/config/constants.js` — all tuneable values
  (animation, rendering, interaction, path, motion, text labels,
  video export). Grouped by domain. Check this file before adding
  any new hard-coded value.
- **Design tokens:** `styles/tokens.css` — CSS custom properties for
  colours, spacing, and theming. Three token systems (Carbon
  structural, UoN brand, Okabe-Ito map). Do not duplicate token
  values in JavaScript; reference the CSS properties where possible.
- **Keybindings:** `src/config/keybindings.js` — all mouse and
  keyboard shortcuts. Customisable at runtime via localStorage.

Do not scatter configuration across service files. If a value might
need tuning, it belongs in the constants file.

---

## Editor config

The project root contains `.editorconfig` for mechanical style
enforcement. It defines:

- UTF-8 encoding, LF line endings
- 2-space indentation for all files
- Trailing whitespace trimmed (except in markdown)
- Single quotes in JavaScript
- 120-char max line length for JS/HTML/CSS, 80-char for markdown

Editors that support EditorConfig apply these rules automatically on
save. This is the first line of defence for consistent formatting.

---

## Files agents must not hand-edit

- `docs/` — build output, overwritten on every build.
- `dist/` — intermediate build output.
- `version.json` — managed by the build script.
- `node_modules/` — managed by npm.
- `package-lock.json` — managed by npm. Do not edit manually, but
  do commit it.
- `_Joe/` — personal developer notes.

<!-- FILE: README.md -->

# Dot Crowd Navigator

Graph-based crowd-flow simulation tool. Draw a network of nodes and weighted edges over a background image, then run a swarm of dots through the network to visualise pedestrian or crowd flow patterns. Forked from Route Plotter; see `_Joe/Dot Crowd Navigator App Overview.md` for full context.

> **Note:** This README still contains legacy Route Plotter documentation below. A full rewrite is tracked in the backlog (Phase 1F).

## Features

**Waypoints** — Click to add major waypoints, Cmd/Ctrl+Click for minor control points. Drag to reposition. Each waypoint can have text labels, custom markers, beacon effects, wait times, and per-segment speed control.

**Path** — Catmull-Rom spline interpolation with adjustable tension. Line, squiggle, or randomised shapes. Solid, dashed, or dotted styles. Configurable thickness and colour from the Okabe-Ito colour-blind safe palette.

**Animation** — Constant-speed or constant-time modes. Corner slowing for natural motion. Multiple visibility modes for path, markers, and background — including spotlight, angle-of-view, and comet trail effects.

**Camera** — Per-waypoint zoom with continuous interpolation between keyframes.

**Export** — Video (WebM) or standalone HTML at custom resolution, aspect ratio, and frame rate. Export with or without the background image.

**Accessibility** — WCAG 2.2 AAA target. Full keyboard navigation, ARIA labels, screen reader announcements, focus trapping in modals, and Okabe-Ito colours throughout.

**Persistence** — Auto-saves to localStorage. Save/load projects as ZIP files.

## Quick start

```bash
git clone https://github.com/djDAOjones/router-plotter-02.git
cd router-plotter-02
npm install
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # Production build → docs/
npm test        # Run tests (Vitest)
```

## Project structure

```plaintext
├── index.html
├── build.js
├── package.json
├── src/
│   ├── main.js                  # RoutePlotter application class
│   ├── config/
│   │   ├── constants.js         # All tuneable values
│   │   ├── keybindings.js       # Mouse + keyboard bindings (customisable)
│   │   ├── helpContent.js       # Welcome modal content
│   │   └── tooltips.js          # Tooltip definitions
│   ├── components/              # SwatchPicker, Dropdown, Tooltip
│   ├── controllers/             # UIController, SectionController
│   ├── core/EventBus.js         # Pub-sub event system
│   ├── handlers/                # InteractionHandler (mouse + keyboard)
│   ├── models/                  # Waypoint, AnimationState, ImageAsset
│   └── services/                # AnimationEngine, PathCalculator,
│                                  RenderingService, CameraService,
│                                  BeaconRenderer, TextLabelService,
│                                  MotionVisibilityService, VideoExporter,
│                                  HTMLExportService, CoordinateTransform,
│                                  ImageAssetService, StorageService,
│                                  UndoService
├── styles/
│   ├── tokens.css               # Design tokens (UoN palette)
│   ├── main.css                 # Core layout and components
│   ├── swatch-picker.css        # Colour picker
│   ├── dropdown.css             # Dropdown menus
│   └── tooltip.css              # Tooltips
└── docs/                        # GitHub Pages build output
```

## Tech

Pure JavaScript — no frameworks. Canvas-based rendering, esbuild bundler, CSS custom properties for theming. Zero runtime dependencies.

---

## Configuration

All tuneable values live in `src/config/constants.js`. The tables below document each group.

### `ANIMATION`

| Constant | Default | Description |
|---|---|---|
| `DEFAULT_DURATION` | `10000` | Default animation duration (ms) |
| `DEFAULT_SPEED` | `400` | Default speed (px/s) |
| `DEFAULT_WAIT_TIME` | `1500` | Default waypoint pause (ms) |
| `TARGET_FPS` | `60` | Render target frame rate |
| `MAX_DELTA_TIME` | `100` | Cap on frame time jump (ms) |
| `TIMELINE_RESOLUTION` | `1000` | Timeline slider steps |

### `VIDEO_EXPORT`

| Constant | Default | Description |
|---|---|---|
| `DEFAULT_FRAME_RATE` | `25` | Export frame rate (fps) |
| `DEFAULT_BITRATE` | `20000000` | Video bitrate (20 Mbps) |
| `START_BUFFER_MS` | `2000` | Static frame at start of export (ms) |

### `RENDERING`

| Constant | Default | Description |
|---|---|---|
| `DEFAULT_PATH_COLOR` | `#D55E00` | Default path colour (Okabe-Ito Vermillion) |
| `DEFAULT_PATH_THICKNESS` | `3` | Line thickness (px, legacy) |
| `DEFAULT_DOT_SIZE` | `8` | Major waypoint radius (px, legacy) |
| `MINOR_DOT_SIZE` | `4` | Minor waypoint radius (px, legacy) |
| `MINOR_DOT_COLOR` | `#000000` | Minor waypoint colour |
| `MINOR_DOT_OPACITY` | `0.5` | Minor waypoint opacity |
| `PATH_HEAD_SIZE` | `8` | Path head marker radius (px, legacy) |
| `REFERENCE_DIAGONAL` | `1414` | Reference diagonal for relative sizing |
| `BEACON_PULSE_DURATION` | `2000` | Pulse cycle length (ms) |
| `BEACON_RIPPLE_DURATION` | `1500` | Ripple lifetime (ms) |
| `BEACON_RIPPLE_INTERVAL` | `500` | Time between ripples (ms) |
| `CONTROLS_HEIGHT` | `80` | Bottom controls panel height (px) |

### `PATH`

| Constant | Default | Description |
|---|---|---|
| `POINTS_PER_SEGMENT` | `100` | Catmull-Rom interpolation density |
| `DEFAULT_TENSION` | `0.1` | Curve tightness (lower = tighter) |
| `TARGET_SPACING` | `2` | Pixels between reparameterised points |
| `MIN_CORNER_SPEED` | `0.2` | Minimum speed at corners (20%) |
| `MAX_CURVATURE` | `0.1` | Curvature threshold for max slowing |

### `MOTION`

| Constant | Default | Description |
|---|---|---|
| `PATH_TRAIL_DEFAULT` | `0.20` | Trail length as fraction of path duration |
| `SPOTLIGHT_SIZE_DEFAULT` | `10` | Spotlight radius (% of canvas) |
| `SPOTLIGHT_FEATHER_DEFAULT` | `0` | Spotlight feather (% of spotlight) |
| `AOV_ANGLE_DEFAULT` | `60` | Angle-of-view cone angle (degrees) |
| `AOV_DISTANCE_DEFAULT` | `25` | AoV distance (% of canvas diagonal) |
| `AOV_DROPOFF_DEFAULT` | `50` | AoV gradient fade (%) |
| `TIMELINE_START_HANDLE_MS` | `2000` | Pre-animation static buffer (ms) |
| `TIMELINE_END_HANDLE_MS` | `3000` | Post-animation buffer (ms) |

### `INTERACTION`

| Constant | Default | Description |
|---|---|---|
| `WAYPOINT_HIT_RADIUS` | `15` | Click detection radius (px) |
| `DRAG_THRESHOLD` | `3` | Minimum drag distance (px) |
| `DOUBLE_CLICK_TIME` | `300` | Double-click window (ms) |

### `TEXT_LABEL`

| Constant | Default | Description |
|---|---|---|
| `SIZE_PX_MIN` / `MAX` | `16` / `48` | Font size range (px) |
| `WIDTH_DEFAULT` | `15` | Text area width (% of canvas) |
| `OFFSET_DEFAULT_Y` | `-5` | Default vertical offset (% above marker) |
| `BG_OPACITY_DEFAULT` | `0.85` | Label background opacity |
| `FADE_DURATION` | `500` | Fade in/out duration (ms) |
| `AUTO_POSITION_DIRECTIONS` | `8` | Directions tested for auto-position |

### Visibility modes

Defined as enums in `constants.js`:

- **Path** (`PATH_VISIBILITY`): `always-show`, `show-on-progression`, `hide-on-progression`, `instantaneous` (comet), `always-hide`
- **Waypoints** (`WAYPOINT_VISIBILITY`): `always-show`, `hide-before`, `hide-after`, `hide-before-and-after`, `always-hide`
- **Background** (`BACKGROUND_VISIBILITY`): `always-show`, `spotlight`, `spotlight-reveal`, `angle-of-view`, `angle-of-view-reveal`, `always-hide`
- **Text** (`TEXT_VISIBILITY`): `off`, `on`, `fade-up`, `fade-up-down`

---

## Custom keybindings

All mouse and keyboard shortcuts are defined in `src/config/keybindings.js` and can be customised at runtime via localStorage.

### How it works

Bindings are loaded from `DEFAULT_BINDINGS`, then merged with any user overrides stored under the `routePlotter_customKeybindings` localStorage key. Each binding has:

```javascript
{
  key: 'click',              // Key or mouse action
  modifiers: ['alt', 'meta'], // Required modifiers: meta, alt, shift
  action: 'waypoint:force-add-minor',  // EventBus event to emit
  description: 'Force add minor (bypass selection)',
  category: 'waypoint'       // Groups: waypoint, navigation, playback, general
}
```

`meta` maps to **Cmd** on macOS and **Ctrl** on Windows/Linux.

### Programmatic API

```javascript
import { getKeybindings, saveCustomBindings, resetToDefaults } from './config/keybindings.js';

// Read current bindings
const bindings = getKeybindings();

// Override a single keyboard binding
const custom = { keyboard: { playPause: { key: 'p' } } };
saveCustomBindings(custom);

// Reset everything
resetToDefaults();
```

### Default binding categories

The full set of defaults is defined in `keybindings.js` under `DEFAULT_BINDINGS.mouse` and `DEFAULT_BINDINGS.keyboard`, organised into four categories: **Waypoints**, **Navigation**, **Playback**, and **General**. The in-app help panel (press `?`) renders all bindings dynamically from this config.

---

## Glossary

Precise terminology for discussing features, bugs, and enhancements.

### Core concepts

- **Route** — The complete journey from first waypoint to last.
- **Path** — The interpolated Catmull-Rom spline connecting waypoints.
- **Path points** — The array of calculated coordinates defining the path (typically hundreds of points).
- **Canvas** — The HTML5 canvas element where all rendering occurs.
- **Background image** — The map or image displayed behind the route.

### Waypoints and markers

- **Waypoint** — A user-defined point along the route. Either *major* or *minor*.
- **Major waypoint** — Full-featured: labels, pause times, beacon effects, larger marker (8px default).
- **Minor waypoint** — Path shaping only: smaller marker (4px), no pause or label support.
- **Marker** — The visual representation of a waypoint (dot, square, flag, custom image, or none).
- **Selected waypoint** — Currently being edited. Highlighted with a yellow glow.

### Path and curves

- **Tension** — Controls curve tightness (0.0 = straight lines, 1.0 = maximum smoothness). Default: 0.1.
- **Path shape** — Line (smooth Catmull-Rom), squiggle (sine wave modulation), or randomised (jittered).
- **Curvature** — How sharply the path bends at any point. Drives corner slowing.
- **Corner slowing** — Automatic speed reduction at sharp turns. Controlled by `MIN_CORNER_SPEED`.
- **Reparameterisation** — Redistributing path points at even spacing for consistent animation speed.
- **Segment speed** — Per-segment speed multiplier (0.1x–10x) for variable-speed animation.

### Animation and timing

- **Progress** — Position through the animation, 0.0 (start) to 1.0 (end).
- **Duration** — Total animation length in milliseconds, calculated from path length ÷ speed.
- **Speed** — Animation velocity in px/s (default 400).
- **Playback speed** — Multiplier on animation speed (0.1–10.0). Controlled by J/K/L keys.
- **Timeline** — The scrubber/slider showing animation progress (0–1000 steps).
- **Playhead** — The moving indicator at the current path position (arrow, dot, or custom image).
- **Waypoint pause** — Timed pause, manual pause (wait for user), or none.

### Visual effects

- **Beacon** — Animated effect at major waypoints: pulse, ripple, glow, pop, or grow.
- **Path head** — The leading indicator (arrow, dot, custom image, or none).
- **Label** — Text at major waypoints with visibility modes: off, always on, fade up, fade up & down.
- **Tint** — Semi-transparent overlay on the background image (−100 black to +100 white).
- **Spotlight** — Circular reveal around the path head. Configurable size and feather.
- **Angle of view** — Cone-shaped reveal from the path head with adjustable angle, distance, and dropoff.
- **Trail** — In comet/instantaneous mode, the visible portion of the path behind the head.

### Coordinate systems

- **Image coordinates** (`imgX`, `imgY`) — Position in the original image. Used for waypoint storage.
- **Canvas coordinates** (`x`, `y`) — Screen position on the display canvas. Used for rendering and interaction.
- **Coordinate transform** — Conversion between the two systems, accounting for zoom, pan, and fit/fill mode.

### Architecture

- **EventBus** — Pub-sub system for decoupled communication between services.
- **Services** — Modular components: AnimationEngine, PathCalculator, RenderingService, CameraService, BeaconRenderer, TextLabelService, MotionVisibilityService, VideoExporter, HTMLExportService, CoordinateTransform, ImageAssetService, StorageService, UndoService.
- **RoutePlotter** — Main application class in `src/main.js` coordinating all services.

---

## License

MIT — see LICENSE file.

## Author

Joe Bell — University of Nottingham

## Links

- [Repository](https://github.com/djDAOjones/router-plotter-02)
- [Live demo](https://djdaojones.github.io/router-plotter-02/)
- [Issues](https://github.com/djDAOjones/router-plotter-02/issues)

<!-- FILE: SALVAGE-NOTE.md -->

# Salvage note — 2026-08-17

This repository was archived after its intended functionality was folded into
**Route Plotter v3** (https://github.com/djDAOjones/route-plotter). The final
two commits preserve the last local working state, which was never pushed:

1. **As-found snapshot** — the working tree exactly as recovered from the
   OneDrive working copy on 2026-08-17, after OneDrive file-offloading had
   destroyed part of it (all of `src/models`, `src/services`, `src/components`,
   `src/controllers`, `src/handlers` were empty; tracked files showed as
   deleted; content had to be re-hydrated via a OneDrive restart).
2. **Restoration** — missing tracked files restored from git (`f99f0ab`), and
   lost newer files restored from Windsurf's local file history (latest
   snapshots, 2026-05-03 ~03:00): the clean ~700-line `src/main.js` (v27),
   `src/models/GraphModel.js`, `src/services/GraphRenderer.js`,
   `src/handlers/GraphInteractionHandler.js`, `build.js` (chrome90 targets),
   `styles/main.css`, `tests/GraphModel.test.js`, and others.

## What this repo actually achieved (per pm_skills/project/backlog.md)

A working standalone **graph editor**: place/drag nodes, draw weighted/directed
edges, entry/exit types, selection, sidebar properties, JSON save/load +
autosave (coordVersion 8, graph-only), wheel zoom/pan, undo/redo — plus
**Phase 2 core**: SimulationState (9 tests), SwarmEngine (7 tests, weighted
routing, 4 lifecycle modes), DotRenderer, and simulation controls UI.

## Known losses (unrecoverable locally)

Four implementation files existed at the last session (~2026-05-03) but were
lost to OneDrive offloading and had no Windsurf local-history entries
(likely agent-written, never hand-edited):

- `src/models/SimulationState.js`
- `src/services/SwarmEngine.js`
- `src/services/DotRenderer.js`
- `src/controllers/GraphUIController.js`

Their executable specs survive: `tests/SimulationState.test.js` and
`tests/SwarmEngine.test.js` (in this repo), plus backlog/decision-log
descriptions. A copy may still exist in the OneDrive **web recycle bin /
version history** (deletion likely occurred ~2026-07-14 during the
offloading event; business retention is typically 93 days).

## Where the work went

Route Plotter v3 carries this project forward as "flow layers" over the
mature route-plotting app (layered scene, one master timeline, deterministic
`evaluate(timelineMs)` swarm — superseding this repo's `tick(deltaMs)`
architecture). Carried verbatim: GraphNode, GraphEdge, GraphModel + all
their tests, the swarm parameter vocabulary, and this repo's project memory
(archived under `specs/dot-crowd-navigator/` in the v3 repo).

