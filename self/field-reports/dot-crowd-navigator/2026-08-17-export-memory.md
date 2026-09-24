<!-- field-report: project=dot-crowd-navigator · date=2026-08-17 · type=export
     · pm-skills=unversioned (pre-1.0.0 framework tree: pm_skills/ with project memory and no VERSION file; committed on 2026-08-17 in an as-found snapshot of the April work)
     · source=every Git blob under pm_skills/project/ at 8d388802cccda3462e8bd110fae636a9db4ba845, taken 2026-09-24 by Claude Code (read from a scratch clone assembled from the remote and the checkout's objects, every ref set to its value at the cut-off 2026-09-24T11:40:00.000Z; content-addressed, so identical to the checkout's HEAD)
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained; session logs and the bundle stay in the local lane -->

# Project-memory export — `pm_skills/project/`

Snapshot: `8d388802cccda3462e8bd110fae636a9db4ba845`. 6 files, 34145 bytes, archive chunks and tickets included.

| Path | Bytes at snapshot | Bytes exported (after redaction) |
| --- | ---: | ---: |
| `pm_skills/project/architecture.md` | 10369 | 10369 |
| `pm_skills/project/backlog.md` | 4187 | 4187 |
| `pm_skills/project/brief.md` | 3317 | 3317 |
| `pm_skills/project/conventions.md` | 2812 | 2812 |
| `pm_skills/project/decision-log.md` | 7683 | 7683 |
| `pm_skills/project/file-map.md` | 5777 | 5777 |

<!-- FILE: pm_skills/project/architecture.md -->

# Architecture

<!-- Generated during kickstart adoption. Reflects the existing codebase -->
<!-- (Phase 0 — retained Route Plotter infra) plus planned additions.   -->
<!-- Update this file when major structural decisions change.            -->

## Tech stack

| Choice | Reason |
| --- | --- |
| **Vanilla JS (ES modules)** | Inherited from Route Plotter. Self-contained, zero runtime deps. |
| **esbuild** | Fast bundler, used for production builds (`build.js`). Dev via `--watch --serve`. |
| **HTML Canvas 2D API** | All rendering — background image, graph overlay, dot swarm animation. |
| **CSS Custom Properties** | Tokenised design system (`tokens.css`) aligned to Carbon conventions without Carbon packages. Uses UoN + Okabe-Ito palettes. |
| **Vitest** | Unit testing. Existing tests cover retained shared infrastructure. |
| **localStorage** | Client-side autosave. Full save/load via JSON download/import. |
| **MediaRecorder / WebCodecs** | Native browser video export — no server, no ffmpeg. WebCodecs path available for broader format support. |

## Project structure (current)

```text
dot-crowd-navigator/
├── index.html                     — app shell, sidebar + canvas layout
├── build.js                       — esbuild build script
├── package.json                   — dev deps: esbuild, vitest, jsdom
├── src/
│   ├── main.js                    — DotCrowdNavigator app class (orchestrator)
│   ├── config/
│   │   ├── constants.js           — all tuneable values
│   │   ├── keybindings.js         — mouse + keyboard bindings
│   │   ├── helpContent.js         — welcome modal content
│   │   └── tooltips.js            — tooltip definitions
│   ├── core/
│   │   └── EventBus.js            — pub/sub event system
│   ├── models/                    — [ROUTE PLOTTER LEGACY — to be replaced]
│   │   ├── Waypoint.js            — → replaced by GraphNode
│   │   ├── AnimationState.js      — → replaced by SimulationState
│   │   └── ImageAsset.js          — retained (background images)
│   ├── services/
│   │   ├── CoordinateTransform.js — retained: normalised ↔ canvas coords
│   │   ├── StorageService.js      — retained: autosave, save/load
│   │   ├── UndoService.js         — retained: undo/redo stack
│   │   ├── PathCalculator.js      — retained: to be adapted for per-edge paths
│   │   ├── PathCalculatorWithWorker.js — legacy: web worker wrapper
│   │   ├── TextLabelService.js    — retained: to be adapted for node labels
│   │   ├── VideoExporter.js       — deferred: Phase 2
│   │   ├── AnimationEngine.js     — [LEGACY — replaced by SwarmEngine]
│   │   ├── RenderingService.js    — [LEGACY — replaced by GraphRenderer]
│   │   ├── CameraService.js       — [LEGACY — still present, to be removed]
│   │   ├── BeaconRenderer.js      — [LEGACY — still present, to be removed]
│   │   ├── MotionVisibilityService.js — [LEGACY — still present, to be removed]
│   │   ├── HTMLExportService.js   — [LEGACY — still present, to be removed]
│   │   ├── ImageAssetService.js   — [LEGACY — still present, to be removed]
│   │   ├── AreaDrawingService.js   — [LEGACY — still present, to be removed]
│   │   ├── AreaEditService.js      — [LEGACY — still present, to be removed]
│   │   ├── AreaHighlightRenderer.js — [LEGACY — still present, to be removed]
│   │   └── index.js               — barrel export (legacy)
│   ├── controllers/               — [LEGACY — to be replaced]
│   │   ├── UIController.js        — → replaced by graph-aware UI controller
│   │   └── SectionController.js   — → replaced or adapted
│   ├── handlers/                  — [LEGACY — to be replaced]
│   │   └── InteractionHandler.js  — → replaced by GraphInteractionHandler
│   ├── components/
│   │   ├── SwatchPicker.js        — retained: colour picker
│   │   ├── Dropdown.js            — retained: dropdown menus
│   │   ├── Tooltip.js             — retained: tooltips
│   │   └── ParamTooltip.js        — retained: parameter tooltips
│   ├── utils/
│   │   ├── CatmullRom.js          — retained: spline math
│   │   ├── Easing.js              — retained: easing functions
│   │   ├── focusTrap.js           — retained: modal focus trapping
│   │   └── index.js               — barrel export
│   └── workers/
│       └── pathWorker.js          — [LEGACY — still present, to be removed]
├── styles/
│   ├── tokens.css                 — design tokens (UoN palette, Carbon-aligned)
│   ├── main.css                   — core layout and components
│   ├── swatch-picker.css          — colour picker styles
│   ├── dropdown.css               — dropdown styles
│   └── tooltip.css                — tooltip styles
├── tests/
│   └── example.test.js            — infrastructure tests (EventBus, etc.)
├── docs/                          — GitHub Pages build output (read-only)
├── AGENTS.md                      — AI agent behavioral contract
├── UI-STANDARDS.md                — UI/accessibility standards
├── DEV-INFRASTRUCTURE.md           — build, dev server, versioning rules
└── pm_skills/                     — project management framework
    ├── project/                   — living project memory
    ├── prompts/                   — reusable task prompts
    └── integrations/              — tool-specific workflows
```

## Planned new modules (Phase 1)

| Module | Planned path | Responsibility |
| --- | --- | --- |
| **GraphNode** | `src/models/GraphNode.js` | Node data model: id, position (normalised), type (normal/entry/exit), label config, `toJSON`/`fromJSON`. |
| **GraphEdge** | `src/models/GraphEdge.js` | Edge data model: id, source/target node ids, weight, direction, control points, curve data, cached path geometry, `toJSON`/`fromJSON`. |
| **GraphModel** | `src/models/GraphModel.js` | Collection of nodes and edges. CRUD operations, adjacency queries, serialisation. Single source of truth for graph state. |
| **GraphRenderer** | `src/services/GraphRenderer.js` | Renders nodes, edges, weight previews, selection highlights, and labels onto canvas. Replaces RenderingService. |
| **GraphInteractionHandler** | `src/handlers/GraphInteractionHandler.js` | Mouse/keyboard handling for graph editing: add/move/delete nodes, draw edges, select, control points. Replaces InteractionHandler. |
| **GraphUIController** | `src/controllers/GraphUIController.js` | Sidebar controls for graph editing: node properties, edge weight/direction, entry/exit toggles. Replaces UIController. |

## Planned new modules (Phase 2)

| Module | Planned path | Responsibility |
| --- | --- | --- |
| **SimulationState** | `src/models/SimulationState.js` | Simulation parameters: dot count, release period, onset variance, speed variance, intensity ramp, lifecycle mode. |
| **SwarmEngine** | `src/services/SwarmEngine.js` | Runs the dot simulation: spawns dots at entry nodes, routes through weighted edges, applies variance and lifecycle rules. |
| **DotRenderer** | `src/services/DotRenderer.js` | Paints individual dots with wobble/warble effects. Separated from graph rendering for performance. |

## Retained infrastructure (from Route Plotter)

| Module | Path | Status |
| --- | --- | --- |
| **EventBus** | `src/core/EventBus.js` | Retained as-is. All cross-module communication. |
| **CoordinateTransform** | `src/services/CoordinateTransform.js` | Retained. Normalised ↔ canvas coordinate mapping. |
| **StorageService** | `src/services/StorageService.js` | Retained. Autosave + save/load. |
| **UndoService** | `src/services/UndoService.js` | Retained. Undo/redo stack. |
| **PathCalculator** | `src/services/PathCalculator.js` | Retained. Still single-route; to be adapted for per-edge paths. |
| **TextLabelService** | `src/services/TextLabelService.js` | Retained. Still waypoint labels; to be adapted for node labels. |
| **SwatchPicker** | `src/components/SwatchPicker.js` | Retained. Colour picker. |
| **CatmullRom** | `src/utils/CatmullRom.js` | Retained. Spline interpolation. |
| **Easing** | `src/utils/Easing.js` | Retained. Animation easing curves. |
| **VideoExporter** | `src/services/VideoExporter.js` | Deferred to Phase 2. |

## Communication patterns

All cross-module communication uses **EventBus** with colon-separated namespaces:

- **`graph:node:added` / `:moved` / `:deleted`** — graph model changes → renderer + UI sync.
- **`graph:edge:added` / `:updated` / `:deleted`** — edge changes → renderer re-renders weight previews.
- **`graph:selection:changed`** — user selected a node or edge → sidebar shows properties.
- **`ui:controls:change`** — a parameter changed → model updates → renderer re-renders.
- **`sim:swarm:start` / `:tick` / `:end`** — simulation lifecycle → renderer animates dots.
- **`export:video:progress` / `:complete`** — export status → toolbar shows progress/download.
- **`app:project:loaded`** — full state refresh after load.
- **`app:background:changed`** — background image loaded → canvas resized.

**Data flow:** UI → event → Model (validates, stores) → event → Renderer / UI consumers.

No direct method calls between modules. Modules only import EventBus and their own data models.

## Dependency policy

| Category | Rule |
| --- | --- |
| **Runtime packages** | Minimal. Currently one: `mediabunny` (video export). Browser APIs otherwise. |
| **Dev tooling** | esbuild (bundler), Vitest (tests), jsdom (test DOM). |
| **New dependencies** | Any new runtime dependency requires explicit approval and documented justification. |
| **Fonts** | Self-hosted or system fonts only — no external CDN calls. |
| **Polyfills** | Only if a target browser lacks Canvas 2D or MediaRecorder. Requires approval. |

<!-- FILE: pm_skills/project/backlog.md -->

# Backlog

<!-- Status: [ ] todo  [~] in progress  [x] done  [-] cut -->
<!-- Agents: read Active tasks only. Completed section is for reference. -->

## Active

### Phase 1 — Remaining items

- [ ] Node labels — Adapt TextLabelService for graph nodes. Position labels relative to node, avoid overlap.
- [ ] Edge control points — Add/move control points on edges for curve shaping (Catmull-Rom curved edges).
- [ ] Undo/redo for graph — Hook GraphModel mutations into UndoService stack for proper undo history.
- [ ] Delete legacy files — Remove `main_legacy.js`, `index_legacy.html`, and legacy service/model/controller files from `src/`. Currently unused but still present on disk.

### Phase 1F — Documentation

- [ ] Update README.md — Replace Route Plotter feature docs with Dot Crowd Navigator description, architecture, usage, and graph-editing instructions.

### Phase 2 — Remaining items

- [ ] Intensity ramp — Start-to-end flow scaling (gradual build-up of dot count).
- [ ] Dot visual options — Configurable shape, colour per-dot, wobble/warble effects.
- [ ] Curved edge paths — Dots follow Catmull-Rom curves instead of straight lines.
- [ ] Video export — Record simulation to downloadable video via VideoExporter.

### Icebox

- [ ] Per-edge path shaping UI — Squiggle amplitude, randomised jitter, tension controls per edge.
- [ ] Fullscreen simulation view — Hide UI, show only canvas at full viewport.
- [ ] Heatmap overlay — Aggregate dot density over time and render as a heatmap layer.
- [ ] Import/export graph as standard format — GeoJSON, GraphML, or similar for interop.
- [ ] Multi-scenario comparison — Run and compare different weight configurations side by side.

---

## Completed

- [x] Fork Route Plotter codebase into Dot Crowd Navigator repo.
- [x] Retain shared infrastructure: EventBus, CoordinateTransform, StorageService, UndoService, PathCalculator, CatmullRom, Easing, SwatchPicker, UI components, tokens.
- [x] Keep background image workflow (drag-drop, upload, example images, zoom, tint).
- [x] Stub play/save/load controls for later phases.
- [x] Adopt PM Skills framework and populate project memory.
- [x] Rename identity — package.json, README.md, main.js, constants.js.
- [x] GraphNode model — id, normalised position, type, label, toJSON/fromJSON, 14 unit tests.
- [x] GraphEdge model — id, sourceId, targetId, weight, direction, control points, toJSON/fromJSON, 23 unit tests.
- [x] GraphModel — Collection class with CRUD, referential integrity, adjacency queries, serialisation, 25 unit tests (added clear + instance fromJSON).
- [x] GraphRenderer — Render nodes as circles, edges as straight lines, weight as thickness. Selection highlights, entry/exit badges (E/X letters), one-way direction arrows. Wired to canvas via CoordinateTransform.
- [x] Replace ai_project_manager_kickstart with PM Skills framework.
- [x] Phase 0B — Clean app shell. Rewrote main.js (6065→~400 lines) and index.html (853→~180 lines). Legacy code moved to `main_legacy.js` / `index_legacy.html` for reference; not imported.
- [x] Phase 1B — Selection rendering. Blue ring on selected node, highlight on selected edge.
- [x] Phase 1C — GraphInteractionHandler. Click-to-add nodes, click+drag to move, shift-click to draw edges, delete/backspace to remove, double-click to cycle type, escape to deselect.
- [x] Phase 1D — GraphUIController. Sidebar: node properties (type, position, id), edge properties (weight slider, direction toggle), status bar, empty-state instructions.
- [x] Phase 1E (partial) — Save/load JSON project files. Autosave graph to localStorage (coordVersion 8). Background overlay persisted.
- [x] Build target updated (chrome58→chrome90, firefox57→firefox90, safari11→safari15) to fix destructuring transform errors.
- [x] Phase 2 (core) — SimulationState model (9 tests), SwarmEngine (7 tests, weighted routing, 4 lifecycle modes), DotRenderer, simulation controls UI (play/pause/reset, dot count, speed, lifecycle).
- [x] Wheel zoom + middle-button/Cmd-drag pan on canvas.
- [x] Undo/redo wiring — graph state snapshots saved to UndoService, buttons enable/disable.

<!-- FILE: pm_skills/project/brief.md -->

# Project Brief

## What are we building?

**Dot Crowd Navigator** — a graph-based crowd-flow simulation tool. Users draw a network of nodes and weighted edges over a background image (typically a map or venue plan), then run a swarm of animated dots through that network. The tool visualises pedestrian or crowd flow patterns across a spatial network.

This is a rewrite of Route Plotter. Route Plotter was "draw one route and animate movement along it." Dot Crowd Navigator is "draw a route network and simulate many moving agents through it." The codebase retains Route Plotter's mature infrastructure (EventBus, coordinate transform, autosave, undo, Canvas 2D render loop, build/test/deploy, path math) but replaces the domain model entirely.

## Who is it for?

Researchers, urban planners, and event organisers who need to visualise crowd flow across a spatial network — typically over a map or floor plan image.

## Platform and deployment

Single-page web app. Pure JavaScript, Canvas 2D, esbuild bundler. Zero runtime dependencies. Deployed via GitHub Pages.

## Core features (v1 — Phase 1: Graph Editor MVP)

- Background image workflow (drag-drop, upload, example images, zoom, tint) — already implemented
- Graph model: `GraphNode`, `GraphEdge`, `GraphModel` with direction, weight, curve data, cached path geometry
- Graph editing: add/move/delete nodes, draw edges, add/move control points, select nodes or edges, edit edge weights and direction
- Entry/exit node designation (multiple entry/exit nodes supported)
- Edge weight preview (thickness-based visualisation)
- Per-edge path shaping: Catmull-Rom smoothing, reparameterisation, squiggle/randomised shapes
- Node labels (adapted from Route Plotter's waypoint label system)
- Save/load projects, autosave to localStorage

## Core features (v2 — Phase 2: Weighted Swarm Engine)

- Weighted branch selection at junctions (dot routing proportional to edge weights)
- Swarm simulation: configurable total dot count, release period, onset variance, speed variance
- Intensity ramp (start-to-end flow scaling)
- Dot behaviour: wobble/warble, lifecycle modes (disappear, respawn, loop, collect)
- Video export of simulation

## Constraints

- WCAG 2.2 AAA target (7:1 contrast, 44px targets, keyboard-operable, no colour-only meaning)
- Self-contained: no external CDN calls, no server-side dependencies
- Carbon-first UI design language (implemented to spec, not via Carbon packages)
- All coordinates stored normalised (image-relative), rendered via CoordinateTransform
- EventBus-only cross-module communication — no direct method calls between modules

## Out of scope (for now)

- Real-time data ingestion or live sensor feeds
- 3D or WebGL rendering
- Multi-user collaboration
- Server-side computation or storage
- Route Plotter-specific features removed during Phase 0: beacon rendering, motion visibility modes, camera keyframes, area highlight editing, custom image asset system, HTML export

## Open questions

- Exact lifecycle mode behaviours (disappear vs respawn vs loop vs collect) — to be designed during Phase 2 scoping
- Whether edge curve control points should support full Bézier or stay with Catmull-Rom + control points
- Video export codec strategy (WebM via MediaRecorder vs WebCodecs for broader format support)

<!-- FILE: pm_skills/project/conventions.md -->

# Conventions

## Code style

- **2-space indentation** everywhere (JS, HTML, CSS, JSON). See `.editorconfig`.
- **Single quotes** in JS. No semicolons omission — semicolons required.
- **LF line endings**, UTF-8 charset, final newline.
- **120-char max line length** for JS, HTML, CSS. **80-char** for markdown.
- **JSDoc comments** on exported classes and public methods (see EventBus.js as reference).
- **ES module syntax** — `import`/`export`, no CommonJS.
- No linter or formatter tool configured — style enforced by `.editorconfig` and convention.

## Naming

- **Files:** PascalCase for classes (`GraphNode.js`, `EventBus.js`), camelCase for utilities and configs (`constants.js`, `focusTrap.js`).
- **Classes:** PascalCase (`GraphNode`, `SwarmEngine`).
- **Methods and variables:** camelCase (`addNode`, `edgeWeight`).
- **Constants objects:** UPPER_SNAKE_CASE (`ANIMATION`, `RENDERING`, `VIDEO_EXPORT`).
- **Events:** colon-separated namespaces, lowercase (`graph:node:added`, `ui:controls:change`).
- **CSS custom properties:** Carbon-aligned structural tokens use `--space-`, `--text-`, `--control-`, `--ui-`, `--border-`, `--radius-`, `--motion-`, `--elev-` prefixes. UoN brand uses `--uon-`. Okabe-Ito map palette uses `--map-series-`. See `UI-STANDARDS.md` for full rules.

## Commit messages

No formal convention established yet. Keep messages short and descriptive.

## Testing

- **Framework:** Vitest (with jsdom for DOM tests).
- **Test location:** `tests/` directory at project root.
- **What gets tested:** All model classes (`toJSON`/`fromJSON` round-trips, CRUD operations), utility functions, EventBus integration.
- **Bar:** Every new model method or utility function must have a corresponding test.
- **Run:** `npm test` (single run), `npm run test:watch` (watch mode).

## Patterns to follow

- **EventBus for all cross-module communication.** No direct method calls between modules.
- **Normalised coordinates** for all stored positions. Canvas coordinates only at render time via CoordinateTransform.
- **`toJSON`/`fromJSON`** on every model class. Fallback defaults in `fromJSON` for forward compatibility.
- **Constructor defaults** for every persistent property.
- **Autosave integration** for any new persistent state — hook into StorageService.
- **Undo integration** for any user-facing mutation — hook into UndoService.
- **Constants in `src/config/constants.js`** — all tuneable values centralised, never hard-coded inline.

## Patterns to avoid

- Direct method calls between UI, renderer, and model layers.
- Importing Carbon npm packages — implement to Carbon spec instead.
- Hard-coded pixel values for positions (use normalised coords).
- Mid-file imports.
- New runtime dependencies without approval.
- Inventing new abstractions for a single use case.

<!-- FILE: pm_skills/project/decision-log.md -->

# Decision Log

<!-- Append new decisions at the top. Don't edit old entries. -->
<!-- Use this during the design phase of each task to record what you chose and why. -->

## 2026-05-03 — Clean app shell + graph interaction (Phases 0B/1B/1C/1D/1E)

**Decision:** Replace the 6065-line legacy `main.js` and 853-line `index.html`
with clean, minimal versions (~400 and ~180 lines respectively) that only
import retained infrastructure + new graph modules. Legacy files preserved
as `main_legacy.js` / `index_legacy.html` for reference.

**Rationale:** The old main.js was deeply entangled with Route Plotter's
Waypoint/AnimationEngine/RenderingService code. Surgical removal would be
more fragile and slower than writing a clean shell. The new main.js
imports only: EventBus, CoordinateTransform, StorageService, UndoService,
GraphModel, GraphRenderer, GraphInteractionHandler, GraphUIController.

**New files created:**
- `src/handlers/GraphInteractionHandler.js` — Click/drag/shift-click/
  delete/double-click for graph editing.
- `src/controllers/GraphUIController.js` — Sidebar panels for node/edge
  properties with type/weight/direction controls.

**Files modified:**
- `src/services/GraphRenderer.js` — Added selection highlighting (ring
  for nodes, wider stroke for edges), type badges (E/X letters inside
  entry/exit nodes), and direction arrowheads for one-way edges.
- `src/models/GraphModel.js` — Added `clear()` and instance `fromJSON()`
  methods. Fixed destructuring-in-for-of for build target compatibility.
- `build.js` — Updated esbuild target from chrome58/firefox57/safari11
  to chrome90/firefox90/safari15. The old target caused build failures
  with destructuring syntax used throughout the codebase.

**Persistence:** Autosave uses coordVersion 8 (graph-only JSON). Old
Route Plotter autosave data (versions ≤ 7) is detected and cleared.
Save/load uses plain JSON files (not ZIP as before).

**Build result:** 47.92 KB bundle. 25/25 GraphModel tests pass.

## 2026-04-16 — Replace ai_project_manager_kickstart with PM Skills

**Decision:** Migrate from the original `ai_project_manager_kickstart`
framework to its successor, [PM Skills](https://github.com/djDAOjones/PM-Skills).
PM Skills adds `DEV-INFRASTRUCTURE.md` (build/dev/deploy rules),
a `Code documentation` section in AGENTS.md, a `Document ownership`
table, Active/Completed backlog structure, a bug-scoping prompt,
and richer Windsurf workflows (`/feature`, `/bugfix`, `/init-project`).

**Changes:** Deleted `ai_project_manager_kickstart/`. Copied `pm_skills/`
in its place. Migrated all populated project memory files. Rebuilt
`AGENTS.md` on the new template with all DCN content preserved.
Created and populated `DEV-INFRASTRUCTURE.md`. Installed three
Windsurf workflows. Removed old `feature-scoping.md` workflow.
Updated all internal path references.

## 2026-04-14 — GraphRenderer + minimal app integration

**Decision:** Wire graph rendering into the existing render pipeline
with the smallest possible touch. `GraphRenderer` is stateless —
receives `GraphModel`, `imageToCanvas`, and `CoordinateTransform` per
frame via `renderState`. Graph layer draws under all legacy content in
`renderVectorLayerTo()`, guarded so existing behaviour is unchanged
when graph is empty. Dev seed graph (3 nodes, 3 edges) gated behind
`if (true)` flag for easy removal.

**Files added:** `src/services/GraphRenderer.js`
**Files changed:** `src/main.js` (+2 imports, +2 constructor lines,
+6 dev seed, +2 renderState props), `src/services/RenderingService.js`
(+4 lines guarded call).

## 2026-04-13 — Implement GraphModel collection

**Decision:** Create `GraphModel` as a pure data collection owning
nodes and edges via `Map`. Enforces referential integrity:
`addEdge` validates source/target exist (throws otherwise),
`removeNode` cascade-deletes connected edges. `fromJSON` silently
drops edges with dangling references for defensive loading.
All getters return snapshot arrays.

**Files added:** `src/models/GraphModel.js`, `tests/GraphModel.test.js`
(22 tests, all green). Phase 1A data model layer is now complete.

## 2026-04-13 — Implement GraphEdge model

**Decision:** Create `GraphEdge` as a pure data model requiring
`sourceId` and `targetId` (throws on missing). Weight clamped to
≥ 0.01, direction validated to `one-way` | `two-way`, control points
clamped to 0–1. Follows same patterns as GraphNode: prefixed IDs
(`ge_`), `toJSON`/`fromJSON` with fallback defaults, static helpers.

**Files added:** `src/models/GraphEdge.js`, `tests/GraphEdge.test.js`
(23 tests, all green).

## 2026-04-13 — Implement GraphNode model

**Decision:** Create `GraphNode` as a pure data model with no EventBus
dependency. Follows Waypoint's serialisation pattern (`toJSON`/`fromJSON`
with fallback defaults) but uses the graph-first design:
normalised coords clamped to 0–1, validated `type` enum, auto-generated
prefixed IDs (`gn_`).

**Files added:** `src/models/GraphNode.js`, `tests/GraphNode.test.js`
(14 tests, all green).

## 2026-04-13 — Reality-sync project memory with codebase

**Decision:** Audit and correct all kickstart project memory files to
match the actual codebase state.

**Findings:** Phase 0 was overclaimed as done. 10 legacy service files,
3 legacy models, 2 controllers, 1 handler, and 1 worker were marked as
"removed" but still exist. `main.js` still says "Route Plotter".
PathCalculator and TextLabelService were marked as "adapted" but
haven't been touched. Token prefix `--cds-` was referenced but doesn't
exist in `tokens.css`.

**Changes made:**
- Split Phase 0 into 0A (done) and 0B (pending legacy cleanup).
- Fixed architecture.md: "removed" → "still present, to be removed".
- Fixed file-map.md: same correction, added 5 missing files.
- Fixed AGENTS.md + conventions.md: corrected token prefix references,
  changed "Two token systems" to "Three token systems".
- Collapsed redundant 1F cleanup tasks into Phase 0B.

## 2026-04-12 — Adopted ai_project_manager_kickstart framework

**Decision:** Adopt the AI Project Manager Kickstart framework for
structured project management with AI coding assistants.

**Rationale:** The project is transitioning from Route Plotter to a
fundamentally different domain model (graph + swarm). A structured
framework ensures consistent context across AI sessions, prevents
drift, and provides a clear backlog and decision trail.

**Alternatives considered:**
- Ad-hoc prompting: simpler but loses context between sessions.
- Full PM tool (Linear, Jira): overkill for a solo vibe-coded project.

## 2026-04-12 — Fork Route Plotter as Phase 0 foundation

**Decision:** Fork Route Plotter codebase, strip domain-specific
features, retain generic infrastructure as the foundation for Dot
Crowd Navigator.

**Rationale:** Route Plotter's EventBus, CoordinateTransform,
StorageService, UndoService, Canvas 2D render loop, build/test/deploy
pipeline, path math, and accessibility infrastructure are all mature
and directly reusable. Starting from scratch would rewrite ~2 years of
tested code for no benefit.

**What was kept:** EventBus, CoordinateTransform, StorageService,
UndoService, PathCalculator, CatmullRom, Easing, SwatchPicker,
Dropdown, Tooltip, focusTrap, tokens.css, build.js, test setup.

**What was removed:** Beacon rendering, motion visibility modes, camera
keyframes, area highlight editing, custom image asset system, HTML
export scaffolding.

**What will be replaced:** Waypoint → GraphNode, AnimationState →
SimulationState, AnimationEngine → SwarmEngine, RenderingService →
GraphRenderer, InteractionHandler → GraphInteractionHandler,
UIController → GraphUIController.

<!-- FILE: pm_skills/project/file-map.md -->

# File Map

<!-- Format: path — role or responsibility -->
<!-- Update when files are created, renamed, or deleted. -->

## Entry point

- `index.html` — App shell, sidebar (background + graph property panels) + canvas layout.
- `src/main.js` — DotCrowdNavigator orchestrator (~400 lines). Bootstraps EventBus, CoordinateTransform, StorageService, UndoService, GraphModel, GraphRenderer, GraphInteractionHandler, GraphUIController. Handles canvas, background images, coordinate pipeline, rendering, persistence.

## Core modules

- `src/core/EventBus.js` — Pub/sub event system. All cross-module communication.
- `src/services/CoordinateTransform.js` — Normalised ↔ canvas coordinate mapping.
- `src/services/StorageService.js` — Autosave to localStorage, save/load JSON.
- `src/services/UndoService.js` — Undo/redo stack for user-facing mutations.
- `src/services/GraphRenderer.js` — Renders graph nodes, edges, selection highlights, type badges, direction arrows. Stateless.
- `src/services/PathCalculator.js` — Catmull-Rom spline generation. To be adapted for per-edge curved paths.
- `src/services/TextLabelService.js` — Text labels on canvas. To be adapted for graph node labels.
- `src/services/SwarmEngine.js` — Dot swarm simulation: spawning, weighted routing, movement, lifecycle modes (disappear/respawn/loop/collect).
- `src/services/DotRenderer.js` — Paints swarm dots as filled circles with outlines. Stateless per frame.
- `src/services/VideoExporter.js` — Canvas → video export. Deferred.

## Models

- `src/models/GraphNode.js` — Graph node data model: id, normalised position, type, label, toJSON/fromJSON.
- `src/models/GraphEdge.js` — Graph edge data model: id, sourceId, targetId, weight, direction, control points, toJSON/fromJSON.
- `src/models/GraphModel.js` — Graph collection: node/edge CRUD, clear, referential integrity, adjacency queries, toJSON/fromJSON (static + instance).
- `src/models/SimulationState.js` — Simulation parameters: dotCount, releasePeriod, speed, speedVariance, dotSize, dotColor, lifecycleMode. toJSON/fromJSON.

## Controllers

- `src/controllers/GraphUIController.js` — Sidebar controls for graph editing: node type/position, edge weight/direction, status bar, empty state instructions.

## Handlers

- `src/handlers/GraphInteractionHandler.js` — Mouse/keyboard input for graph editing: click-to-add, drag-to-move, shift-click-to-connect, delete, double-click type cycle, escape deselect.

## UI components

- `src/components/Tooltip.js` — Tooltip component.
- `src/components/ParamTooltip.js` — Parameter-specific tooltip.
- `src/components/Dropdown.js` — Dropdown menu component.
- `src/components/SwatchPicker.js` — Colour picker (Okabe-Ito palette).

## Utilities

- `src/utils/CatmullRom.js` — Catmull-Rom spline math.
- `src/utils/Easing.js` — Easing functions for animation.
- `src/utils/focusTrap.js` — Modal focus trapping for accessibility.
- `src/utils/index.js` — Barrel export for utils.

## Config and constants

- `src/config/constants.js` — All tuneable values (animation, rendering, interaction, etc.).
- `src/config/keybindings.js` — Mouse + keyboard bindings (customisable via localStorage).
- `src/config/helpContent.js` — Welcome/help modal content.
- `src/config/tooltips.js` — Tooltip text definitions.

## Styles

- `styles/tokens.css` — Design tokens (UoN palette, Carbon-aligned spacing/colour/type).
- `styles/main.css` — Core layout and component styles.
- `styles/swatch-picker.css` — Colour picker styles.
- `styles/dropdown.css` — Dropdown styles.
- `styles/tooltip.css` — Tooltip styles.

## Tests

- `tests/example.test.js` — Infrastructure tests (EventBus, Waypoint, PathCalculator, etc.).
- `tests/GraphNode.test.js` — GraphNode model unit tests (14 tests).
- `tests/GraphEdge.test.js` — GraphEdge model unit tests (23 tests).
- `tests/GraphModel.test.js` — GraphModel collection unit tests (25 tests).
- `tests/SimulationState.test.js` — SimulationState model unit tests (9 tests).
- `tests/SwarmEngine.test.js` — SwarmEngine simulation unit tests (7 tests).

## Build and tooling

- `build.js` — esbuild build script (dev server + production build).
- `package.json` — Project metadata, scripts, dependencies.
- `.editorconfig` — Code style rules (indent, line endings, etc.).

## Project management

- `AGENTS.md` — AI agent behavioral contract (project root).
- `UI-STANDARDS.md` — UI/accessibility standards (project root).
- `DEV-INFRASTRUCTURE.md` — Build, dev server, versioning, scripts (project root).
- `pm_skills/project/` — Living project memory (brief, architecture, backlog, etc.).
- `pm_skills/prompts/` — Reusable task prompts.
- `pm_skills/integrations/` — Tool-specific workflows (feature, bugfix, init).

## Legacy (on disk but NOT imported — safe to delete)

- `src/main_legacy.js` — The original 6065-line Route Plotter main.js. Kept as reference.
- `index_legacy.html` — The original 853-line Route Plotter index.html. Kept as reference.
- `src/services/AnimationEngine.js`, `RenderingService.js`, `CameraService.js`, `BeaconRenderer.js`, `MotionVisibilityService.js`, `HTMLExportService.js`, `ImageAssetService.js`, `AreaDrawingService.js`, `AreaEditService.js`, `AreaHighlightRenderer.js` — Route Plotter services. Not imported.
- `src/models/Waypoint.js`, `AnimationState.js`, `ImageAsset.js` — Route Plotter models. Not imported.
- `src/controllers/UIController.js`, `SectionController.js` — Route Plotter controllers. Not imported.
- `src/handlers/InteractionHandler.js` — Route Plotter interaction handler. Not imported.
- `src/services/PathCalculatorWithWorker.js`, `src/workers/pathWorker.js` — Legacy web worker path calc. Not imported.

