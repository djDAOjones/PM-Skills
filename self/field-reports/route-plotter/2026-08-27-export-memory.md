<!-- field-report: project=route-plotter · date=2026-08-27 · type=export
     · pm-skills=4.7.0
     · source=Git blobs under pm_skills/project at public snapshot 6f2ac154430be665a9cb1665a6f20d1b317990e0
     · redaction=0 checkout path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=public names Joe Bell and Gary Priestnall and public GitHub identifier djDAOjones retained where present; no unpublished identity was intentionally added -->

# Project-memory export

Snapshot: `6f2ac154430be665a9cb1665a6f20d1b317990e0`. This is the public committed baseline; the separately indexed local working-tree snapshot records in-flight changes.

| Repository-relative path | Source bytes at snapshot | Exported bytes after redaction |
| --- | ---: | ---: |
| `pm_skills/project/architecture.md` | 7109 | 7109 |
| `pm_skills/project/archive/INDEX.md` | 1520 | 1520 |
| `pm_skills/project/archive/decision-log-2026-04.md` | 1470 | 1470 |
| `pm_skills/project/archive/decision-log-2026-06.md` | 32569 | 32569 |
| `pm_skills/project/archive/decision-log-2026-08-17-to-2026-08-26.md` | 97330 | 97330 |
| `pm_skills/project/archive/trajectory/trajectory-0001-2026-04-16-to-2026-06-17.md` | 7821 | 7821 |
| `pm_skills/project/archive/trajectory/trajectory-0002-2026-08-17-to-2026-08-19.md` | 7361 | 7361 |
| `pm_skills/project/backlog.md` | 6890 | 6890 |
| `pm_skills/project/brief.md` | 3535 | 3535 |
| `pm_skills/project/conventions.md` | 2633 | 2633 |
| `pm_skills/project/decision-log.md` | 37807 | 37807 |
| `pm_skills/project/doc-deltas.md` | 1487 | 1487 |
| `pm_skills/project/file-map.md` | 36310 | 36310 |
| `pm_skills/project/tickets/REV-03.md` | 4163 | 4163 |
| `pm_skills/project/trajectory.md` | 13222 | 13222 |
| `pm_skills/project/wish-list.md` | 2652 | 2652 |

<!-- FILE: pm_skills/project/architecture.md -->

# Architecture

## Tech stack

| Technology | Reason |
| --- | --- |
| Vanilla JavaScript (ES modules) | No framework overhead, full Canvas API control |
| Canvas 2D | Direct pixel manipulation for path rendering and animation |
| esbuild | Fast bundling, simple config, ESM output |
| Vitest + jsdom | Unit testing with DOM simulation |
| mediabunny | MP4/WebM mux layer |
| jszip | Project ZIP import/export |
| CSS custom properties | Design tokens for theming (UoN + Okabe-Ito) |

## Project structure

```text
src/
  main.js              — RoutePlotter class: app entry point and orchestrator core
  app/                 — RoutePlotter prototype mixins (wiring, playback, undo/redo, camera,
                         viewport, path timing, persistence, exporting, editor panel, pointer,
                         synchronized scene-outline integration)
  config/              — constants, keybindings, help content, tooltips
  core/                — EventBus (pub-sub), PlayerCore (pure timeline math)
  models/              — Waypoint, AnimationState, ImageAsset + scene model (Scene → FlowLayer → GraphModel/GraphNode/GraphEdge + Emitter)
  services/            — single-responsibility services (18 modules)
  controllers/         — UIController, SectionController, SceneOutlineController
  components/          — SwatchPicker, Dropdown, Tooltip, ParamTooltip
  handlers/            — InteractionHandler (Pointer Events transactions, keyboard, DnD)
  utils/               — CatmullRom, Easing, focusTrap
styles/                — tokens.css, main.css, swatch-picker.css, dropdown.css, tooltip.css
specs/                 — archived dot-crowd-navigator material (spec, memory, salvaged tests/src) for Phases 2–4
tests/                 — Vitest unit tests
```

(The former `workers/` layer was deleted 2026-06-18 — it never initialised
under the old esbuild targets; see the v2 decision-log entry. es2022 targets
re-legalise workers if ever needed again.)

## v3 direction (founded 2026-08-17)

Layered scene over one master timeline: the Waypoint chain remains the
"hero route" layer; **flow layers** (GraphModel guide networks + emitters)
add crowd/particle animation. Everything renders as a pure function of
(timelineMs, projectState, seed) — the deterministic-timeline mandate,
implemented since Phase 1 (2026-08-17) by **`src/core/PlayerCore.js`**: it
builds the timeline (segments, exact pause budgets, beacon schedules) and
evaluates any instant with no wall-clock reads or mutation. AnimationEngine
is demand-driven transport + events: play and visible camera settling keep its
preview frame alive, while stable paused views leave no frame queued; export
keeps its explicit synchronous frame loop. Beacons are closed-form in timeline
time; play, scrub, and export share the one evaluation path (golden harness:
`tests/goldenFrames.test.js`). Since Phase 5 (2026-08-19) the HTML
export runs the same stack: `src/player/PlayerApp.js` (bundled to
`docs/player.js`, inlined into exports) hydrates the coordVersion-9
snapshot, recomputes timing in the snapshot's `timingReference` space
to preserve the authored timeline, and renders at export resolution with the
app's own services. A separate stable `renderReference` supplies the visual
short-edge scale for map-bound reference-pixel values; it never participates
in coordinate or timeline calculations. Older snapshots migrate additively
from `timingReference` or the authored canvas (cross-check:
`tests/playerApp.test.js` and `tests/renderReference.test.js`).
The scene data model landed in Phase 2 (2026-08-18): `Scene` →
`FlowLayer` (guide graph or hero route + `Emitter`s with per-emitter
seeds, normalised release windows and two-to-eight-handle busyness envelopes),
persisted additively as the
coordVersion 9 `scene` block. Phases and rationale: backlog +
decision-log 2026-08-17/18.

REV-02 adds an equivalent non-canvas authoring path without changing that
ownership: `src/utils/sceneSemantics.js` projects the canonical model into a
plain semantic snapshot, `src/controllers/SceneOutlineController.js` renders
lazy native DOM and emits stable-ID commands, and `src/app/sceneOutline.js`
resolves those commands back into the existing mutation/undo/autosave paths.
The exported player uses `src/player/playerAccessibility.js` for an aggregate
scene description and discrete transport announcements.

## Key modules

| Module | Path | Responsibility |
| --- | --- | --- |
| RoutePlotter | `src/main.js` + `src/app/*` | Sole orchestrator: owns all services, handles all events, manages state. Method groups live as prototype mixins in `src/app/*` (Object.assign; names unique across mixins) |
| Waypoint | `src/models/Waypoint.js` | Data model for waypoints (position, style, camera, area, etc.) |
| AnimationEngine | `src/services/AnimationEngine.js` | Demand-driven preview scheduler, transport, timing, segment speed and pause markers |
| PathCalculator | `src/services/PathCalculator.js` | Catmull-Rom spline, reparameterisation, curvature |
| RenderingService | `src/services/RenderingService.js` | Canvas drawing plus project-reference scaling for path, markers, labels, effects and area borders |
| UIController | `src/controllers/UIController.js` | Sidebar controls, waypoint list, slider sync |
| SceneOutlineController | `src/controllers/SceneOutlineController.js` | Lazy native semantic outline, authoring forms, focus and draft state |
| InteractionHandler | `src/handlers/InteractionHandler.js` | Captured mouse/touch/pen transactions, keyboard and drag-and-drop input |
| CoordinateTransform | `src/services/CoordinateTransform.js` | Image ↔ canvas coordinate conversion |
| VideoExporter | `src/services/VideoExporter.js` | MP4/WebM export via WebCodecs |

## Communication patterns

**EventBus (pub-sub)** is the only communication channel between
components. UIController, SceneOutlineController and InteractionHandler emit
events; `main.js` handles them. No direct method calls between components.

Exceptions: none. This is a hard rule.

Canvas authoring uses one primary-pointer transaction owned by
`InteractionHandler`: hit-test and immutable geometry snapshot on down, a
shared 3 CSS px tap/drag threshold, captured movement, then exactly one commit
or restoring cancellation. Window terminal-event fallbacks are deliberately
idempotent with captured canvas events. Area, network and waypoint drags share
this boundary; a selected waypoint group moves by one shared bounds-safe delta.

## Dependency policy

- **Two bundled runtime dependencies: mediabunny and jszip** (jszip
  bundled 2026-08-17, replacing a runtime CDN load). No new runtime
  packages without explicit approval.
- Dev dependencies (esbuild, vitest, jsdom) are established.

## Dev workflow

- Install: `npm ci` (Node 24 is pinned in `.nvmrc`)
- Dev: `npm run dev` → http://localhost:3000
- Build: `npm run build` → output in `docs/`
- Check: `npm run check` (Vitest + restart-script safety contract +
  non-mutating production build)
- Deploy: commit source, run `npm run push:dry-run`, then `npm run push`

<!-- FILE: pm_skills/project/archive/INDEX.md -->

# Archive index

<!-- One line per archived chunk. Cold tier: chunks are never auto-read —
     locate content here, then grep or line-range read the chunk. -->

- `decision-log-2026-08-17-to-2026-08-26.md` — decision-log, 36 entries / 13,319 words (2026-08-17 → 2026-08-26): v3 founding + dot-crowd salvage, refactor Phases 0–5 (deterministic timeline, layered scenes, swarm engine, inspector, export parity, Pages go-live), and the first review-remediation day (REV-01…REV-03, REV-06, UI-01…05, UX-02, CROWD-02/03, SCALE-01, MAINT-01, HEAD-01, DOC-01, SUPPORT-01)
- `trajectory/trajectory-0002-2026-08-17-to-2026-08-19.md` — trajectory, 1,014 words: v3.0 refactor milestone epoch (founding → Phase 5 parity & release; milestone CLOSED 2026-08-19)
- `trajectory/trajectory-0001-2026-04-16-to-2026-06-17.md` — trajectory, 1,094 words: v2-line era epoch (path styling, export options, camera zoom, contrast, June polish + hardening)
- `decision-log-2026-06.md` — 14 June-2026 entries (v2-line era): segment-speed model + worker removal, path glow + HTML-export casing parity, console-spam gate, undo granularity, sidebar calmness, export include-toggles, restart.sh orphan fix, maintainer scripts, OneDrive watch survival, control contrast, camera major-keyframing, roadmap triage, memory prune, deploy-path fix, threads-pool test fix, code-review rounds, pm-skills 2.3.0 upgrade
- `decision-log-2026-04.md` — 2 April-2026 entries: path casing as a global style toggle, PM-Skills framework adoption

<!-- FILE: pm_skills/project/archive/decision-log-2026-04.md -->

# Decision Log — 2026-04 (archived)

<!-- Archived from decision-log.md on 2026-08-19 (Phase 5 docs pass, owner-approved
     budget split). Entries verbatim, newest first. Never auto-read; grep +
     line-range only. See archive/INDEX.md. -->


## 2026-04-16 — Path casing as a global style toggle

**Decision:** Add `showPathCasing` boolean to `this.styles` (default
`true`) with a checkbox in the right sidebar. Guards casing draws in
RenderingService (2 locations) and HTMLExportService (1 location).

**Rationale:** Simple global style property, no new event type needed.
Uses `!== false` guard so existing saves without the property default
to casing on (backward compatible).

---

## 2026-04-16 — Adopted PM-Skills framework for AI guidance

**Decision:** Replace the previous ad-hoc AGENTS.md + feature-scoping
workflow with the PM-Skills two-tier memory system.

**Rationale:** The previous system had a single AGENTS.md and one
Windsurf workflow. PM-Skills provides structured project memory
(brief, architecture, conventions, backlog, file-map, decision-log),
permanent behavioral contracts (AGENTS.md, UI-STANDARDS.md,
DEV-INFRASTRUCTURE.md), reusable prompt workflows, and Windsurf
integrations. Better discipline, cheaper AI sessions.

**Alternatives considered:**

- Keep the old system: simpler but lacked project memory, UI standards,
  dev infrastructure rules, and structured workflows.
- Build a custom system: more work, less battle-tested.

<!-- FILE: pm_skills/project/archive/decision-log-2026-06.md -->

# Decision Log — 2026-06 (archived)

<!-- Archived from decision-log.md on 2026-08-19 (Phase 5 docs pass, owner-approved
     budget split). Entries verbatim, newest first. Never auto-read; grep +
     line-range only. See archive/INDEX.md. -->


## 2026-06-18 — Segment-speed refinement: major-leg keyframing + Web Worker removal

**Task:** Backlog "Segment-speed model — audience-coherent leg timing" and its
dependent "Wider segment-speed range", preceded by the backlog-mandated
diagnosis spike.

**Latent bug fixed — Web Worker layer removed.** The spike found that
`PathCalculatorWithWorker` never initialised: esbuild downlevels
`new Worker(new URL(…, import.meta.url))` against the `chrome58/firefox57`
target (which predate `import.meta`), so the URL was invalid and the code
*always* silently fell back to the synchronous main-thread `PathCalculator`.
Decision: delete the worker layer (`PathCalculatorWithWorker.js`,
`src/workers/pathWorker.js`) and use `PathCalculator` directly. This makes
main-thread **corner-slowing** reparameterisation the single canonical path
behaviour (no hidden even-spacing fork) and drops dead async code.

**Decision — majors are the only timing keyframes.** One speed per
major-to-major leg; minors shape geometry but never split a leg or act as a
timing keyframe, and their `segmentSpeed` (incl. legacy saved values) is ignored
in playback. Mirrors the camera half shipped via `CameraService.toMajorKeyframes`
(2026-06-16). New `RoutePlotter.getMajorLegData()` aggregates majors + progress +
per-leg lengths and feeds `AnimationEngine.setSegmentMarkers()` one marker/leg.

**Decision — progress-span timing basis (kills the regime split).**
`PathCalculator.legTimingLengths(majorProgress, totalLength)` weights each leg by
its progress span × full path length, not summed pixel lengths. Payoffs: (1)
corner-slowing preserved (progress maps to corner-dense point index); (2) at
all-1.0x the legs sum to the full path length, so total duration equals
`calculatePathLength / baseSpeed` — playback is identical with or without a
custom leg speed (the old all-1.0x-vs-variable discontinuity is gone).
`getSegmentDurations()` (zoom rate-limit input) rewritten to the same basis so
its major→major aggregation stays correct.

**Folded in.** Range widened 0.2x–5.0x → **0.1x–10x** (symmetric log slider,
centred on 1.0x; only the `SEGMENT_SPEED` constant changed — mapping fns read it
dynamically). Segment-speed control now hidden for minors (mirrors the pause
control). HTML export needs no change: markers are serialised verbatim, so the
player replays the new leg timing automatically.

**Deferred (wish-list):** `getSegmentLengths()` / `calculateSegmentLengths()` are
now unused by timing; left in place to keep the change minimal.

**Scope:** `PathCalculator.js`, `main.js`, `UIController.js`,
`AnimationEngine.js`/`Waypoint.js` (doc comments). v3.1.569, build + 69 tests
green (3 new). In-browser feel-check pending user sign-off.

---

## 2026-06-17 — Path glow (Option B layered underlay) + HTML-export casing parity

**Task:** Next-milestone "Path glow effect" — an optional soft glow around the
path, named distinctly from the beacon "glow" style.

**Decision — Option B (layered additive underlay).** Glow is drawn as N
widening, translucent strokes beneath the casing using
`globalCompositeOperation = 'lighter'`, brightening toward the path centre.
Chosen over `ctx.shadowBlur` (B over A): shadowBlur is unreliable per-segment,
scales poorly across zoom, and is costly per frame. The maths live in a pure
static `RenderingService.glowLayers(baseWidthPx, intensity, extraScale)` →
`{width, alpha}[]` (widest first), so it is unit-testable without a canvas and
reused verbatim by preview, the partial head segment, and the HTML player.
Per-segment colour (not one global colour) so multi-colour routes glow in kind.
Defaults: 4 layers, +28px max extra width, 0.16 per-layer alpha, 0.5 intensity
(`RENDERING.PATH_GLOW_*`); halo width scales by zoom×graphics like the casing.

**Bonus fix — HTML-export casing parity.** The export `styles` payload
(`HTMLExportService.js:108`) is hand-picked and never included `showPathCasing`,
so the player's `styles.showPathCasing !== false` was always true — the casing
toggle was silently ignored in HTML exports. Since glow had to be added to that
same payload, `showPathCasing` was added too; HTML export now matches preview
(default-on, so the only behaviour change is that a casing-off export now omits
casing).

**Folded in.** (A) UI: Path casing moved into a new "Path emphasis" Carbon
fieldset with the glow toggle + intensity slider. (B) the white casing colour +
`+2px` extra-width literals are now `RENDERING.PATH_CASING_COLOR` /
`PATH_CASING_EXTRA_WIDTH` (no value change).

**Scope:** `constants.js`, `RenderingService.js`, `main.js`, `index.html`,
`styles/main.css`, `HTMLExportService.js`, `tests/units.test.js`. `pathGlow`
persists via `_syncGlobalStyleUI()` (undo/redo, autosave, project-open).
v3.1.563, build + 66 tests green (6 new `glowLayers` tests).

---

## 2026-06-17 — Console spam gated to console.debug (AnimationEngine)

**Task:** Next-milestone "Console spam gate" — the throttled per-frame
`console.log` in `AnimationEngine.pathTimeToPathProgress` (plus the related
segment-speed diagnostics) flooded the 500-entry console ring buffer and
polluted the Download/Copy Debug Log export during variable-speed playback.

**Finding:** the file already reserved `console.log` for exactly 7 verbose
segment-speed diagnostics while using `console.debug` for ~15 routine ones.
The ring-buffer interceptor (`main.js:28`) captures only
`['log', 'warn', 'error']` — not `debug`.

**Decision:** downgrade all 7 `console.log` sites to `console.debug`
(`pathTimeToPathProgress` transition + throttled per-frame; `setSegmentMarkers`
header + per-segment loop; `play()` header; `dumpSegmentState`;
`timelineToPathProgress` trace). This keeps them out of the ring buffer / Debug
Log export *and* hidden at the default console level (verbose is suppressed by
default), while preserving the diagnostics for opt-in DevTools debugging —
matching the file's dominant `console.debug` pattern. Chosen over deleting them
(reversible, keeps tooling) and over a new DEBUG flag (no such pattern exists);
the throttle guards (`_debugFrameCount`/`_debugLogInterval`/`_debugLastSegIdx`)
are left intact.

**Scope:** `src/services/AnimationEngine.js` only (7 lines, `console.log` →
`console.debug`). No behavioural change. v3.1.562, 60/60 tests green.

---

## 2026-06-17 — Undo granularity verified (no change); Edit/Preview header reflow fixed

**Task:** Diagnosis (verify-don't-trust) on two Current-milestone items —
"undo snaps at too-fine increments" and "Edit/Preview warning rejigs the
header". Both task-brief leads were wrong on specifics.

**Undo — no change.** The mouse-drag path already collapses one drag into one
undo entry: `InteractionHandler` emits `position-changed {isDragging:true}`
during the drag (`InteractionHandler.js:243`), the `main.js` handler skips the
save while dragging (`main.js:1848`) and saves once on `drag-ended`
(`main.js:1860`); `calculatePath()` emits no cascading events. Verified working
with the user. The only fine-grained path is arrow-key nudge (one debounced
save per tap, by design — `main.js:2227`). Backlog item closed, no code change.

**Header reflow — fixed.** The warning is a red herring:
`.export-warning` (absolute), `.highlight-warning` (box-shadow) and the export
tip (fixed toast) are all out of flow. The cause is `.mode-label.active`
switching `font-weight` 500→600 (`styles/main.css:226`, toggled by
`_updateModeSwitch` `main.js:3243`) — the bolder active label is wider, so each
Edit↔Preview toggle resizes `.mode-switch` and shifts the flex
`.header-controls`. Fixed by dropping the `font-weight:600` (active state is
already multi-signal: pill bg + darker text + box-shadow), CSS-only — v3.1.561,
60/60 tests green.

**Aside:** `showExportModeWarning()` (`main.js:5350`) is dead — queries a
non-existent `#export-mode-warning` (CSS class is `.export-warning`); the toast
already covers it. Parked on the wish-list.

**Scope:** Header fix in `styles/main.css` (one declaration removed); plus memory (backlog, trajectory, wish-list, this log).

---

## 2026-06-17 — Sidebar calmness: waypoint list + swatch picker (UI polish)

**Task:** Two Current-milestone "UI polish and UX" items — calm the waypoint
list (item 4) and reduce the swatch picker's visual weight (item 3). User chose
the low-risk "inline tidy" direction over a swatch popover redesign. CSS-only.

**Waypoint list (item 4):**

- **Progressive disclosure:** at rest a row shows only its colour dot + name;
  the drag handle, ▲/▼ reorder buttons, and delete `×` reveal on
  `:hover`/`:focus-within`. Hidden controls use `opacity:0` (layout stays
  stable — space reserved) plus `pointer-events:none` so the invisible delete
  can't be mis-clicked; both restore on reveal. Keyboard users get the controls
  via `:focus-within`, so nothing becomes unreachable.
- **Reorder button size:** grew from 24×16 to **24×22 px** so the two stacked
  buttons total exactly the 44 px row height — larger than before with *no*
  hover row-growth jank. **AAA exception (documented):** WCAG 2.5.5's 44 px
  per button is infeasible for a stacked dual reorder control in a dense list
  (would need 88 px / doubled rows); 24×24 (the AA 2.5.8 square) would regrow
  the row 4 px on every hover — itself a calmness regression. 24×22 is the
  chosen balance; reorder is also keyboard- and drag-operable.

**Swatch picker (item 3):** the inline 5×2 grid can't shrink below ~88 px
because each `.swatch-option` cell is `min-height:2.75rem` (44 px) for WCAG
2.5.5 — a hard floor. So visual weight was reduced by shrinking the colour
*chip* from filling the cell to `height:2rem` (32 px), centred; the 44 px
clickable cell is untouched. The larger popover redesign (single current-colour
swatch → grid on click) is parked in the backlog Icebox.

**Scope:** `styles/main.css`, `styles/swatch-picker.css` only. No JS/HTML.

**Verified:** `npm run build` (v3.1.557) + 60/60 tests green. Visual
confirmation of the lighter/calmer sidebar pending user review (canvas/CSS not
unit-tested).

---

## 2026-06-17 — Export "Include in export" group + reduced-motion beacons (glow)

**Task:** Two Current-milestone "UI polish and UX" items — consolidate the
Export inclusion controls into one checkbox group (item 8) and close the
reduced-motion beacon gap (item 7). Also verified the keyboard-reorder item
(item 5) was already shipped.

**Export include group (item 8):**

- **Decision:** Replaced the `Included` `<select>` (with-image / path-only)
  with a Carbon `<fieldset>` "Include in export" of three checkboxes —
  Background image, Camera movement, Text labels. The camera/text checkboxes
  (shipped 2026-06-16) moved into the group unchanged; the image toggle is new.
- **Minimal churn:** kept the `video:layers-change(pathOnly)` event and its
  `main.js` handler; only the *source control* changed (checkbox →
  `pathOnly = !checked`). New id `export-include-image`; element ref renamed
  `exportLayers` → `exportIncludeImage`. `UIController` shares `main.js`'s
  `elements`, so the ref changed in one place.
- **Correctness fixes folded in:** the `video:layers-change` handler now calls
  `autoSave()` (previously it didn't — the image preference could fail to
  persist), matching the camera/text handlers; and `openProject` now syncs the
  image checkbox (it previously synced only camera/text, leaving the inclusion
  control stale after a project load).
- **AAA:** native fieldset/legend grouping (semantic, no ARIA); each row given
  `min-height:2.75rem` (44px target, WCAG 2.5.5). Sentence-case labels.

**Reduced-motion beacons (item 7):** the guard suppressed only `pulse`/`ripple`;
`glow` (a ~3s animated radial bloom) still played under
`prefers-reduced-motion`. Added `glow` to the skip set (effect held static,
marker at normal scale). `pop`/`grow` remain — brief one-shot reveal
transitions, not continuous motion (WCAG 2.3.3).

**Keyboard reorder (item 5):** confirmed already complete — ▲/▼ buttons with
aria-labels, boundary `disabled`, and `announce()`. Residual nit: the buttons
are 24×16px (below the 44px AAA target) and `opacity:0` until hover/focus-within;
migrated to the "waypoint list calmness" backlog item to keep that row-chrome
rework in one place, rather than fixed here.

**Scope:** `index.html`, `src/controllers/UIController.js`, `src/main.js`,
`src/services/BeaconRenderer.js`, `styles/main.css`. Event contract unchanged.

**Verified:** `npm run build` + 60/60 tests green. Manual canvas / checkbox /
persistence / reduced-motion verification pending user confirmation.

---

## 2026-06-17 — restart.sh stops the whole dev tree, not just the port (orphan fix)

**Symptom:** After a `restart.sh` shutdown — and on the next restart — a
`node build.js --watch` process (plus its npm / `restart.sh` wrappers) was left
running; repeated restarts accreted orphaned watchers.

**Root cause:** esbuild's `ctx.serve()` binds the port from a child "service"
process, so `lsof -ti :3000` returns the **esbuild child**, not its
`node build.js --watch` parent. The original `free_port()` killed only the port
listener, orphaning the node parent (which keeps the esbuild service and file
watchers alive). This corrects the kill-scope claim in the entry below
("only PIDs on port 3000").

**Fix:** replaced `free_port()` with `dev_pids()` + `stop_dev()`. `dev_pids()`
unions the port listener (`lsof -ti :3000`) with the parent
(`pgrep -f 'build.js --watch'`); `stop_dev()` sends TERM to the set, then KILL
to survivors only. Still scoped to this project's dev server — never a broad
`pkill node`. Called both pre-boot and from the Ctrl-C / TERM `cleanup` trap.

**Verified:** fresh boot → 1 watcher, HTTP 200; restart while already running →
exactly 1 watcher (old script exits); close-out (TERM, the same `cleanup`
handler as Ctrl-C) → 0 watchers, 0 port listeners, script exited. Docs
(DEV-INFRASTRUCTURE recovery playbook, `scripts/README.md`) updated to match.

---

## 2026-06-17 — Maintainer run/build scripts (scripts/)

**Task:** Add ergonomic, tracked entry points for running and rebuilding —
`scripts/restart.sh` (clean restart/boot) and `scripts/build.sh` (rebuild).

**Decisions:**

- **Codify, don't reinvent.** `restart.sh` is the scripted form of the
  DEV-INFRASTRUCTURE Recovery playbook (free port 3000 → `npm run dev` →
  hard-refresh), not new behaviour; `build.sh` wraps `npm run build`. Both
  resolve the repo root so they run from any CWD.
- **Honour the one-command-runtime-recovery invariant (AGENTS.md).** Kill
  scope is *only* PIDs on port 3000 (graceful TERM, then KILL survivors) —
  never a broad `pkill node`. Readiness is a `curl` poll for HTTP 200, not
  "process launched" (we had a print-Serving-then-crash incident, see entry
  below). Destructive actions are gated: default restart deletes nothing;
  only `--hard-reset` removes `docs/` (documented generated output);
  `version.json`/`src/`/`_Joe/` are never touched.
- **Tracked, not personal.** Lives in `scripts/` (version-controlled) with a
  short `scripts/README.md`, superseding the untracked `_Joe/` helper. Made
  executable; also runnable via `bash` since OneDrive can drop the +x bit.
- **No npm aliases** added (kept to the shell-script request); easy to add
  `npm run restart` later if wanted.

**Verified:** `build.sh` builds clean (v3.1.548); `restart.sh` freed the port,
booted, and reported HTTP 200 (v3.1.549) with a single listener; `--help`
works on both.

---

## 2026-06-16 — Dev server survives OneDrive watch churn (build.js)

**Symptom:** `npm run dev` exited 1 mid-session and `localhost:3000` stopped
loading; log showed `Serving at http://undefined:3000` and a rapid loop of
`Static file changed: index.html`.

**Root cause:** this workspace is OneDrive-synced; sync repeatedly touches and
swaps file inodes. The static-file `fs.watch` calls in `build.js` had no
`error` handler, so an inode swap surfaced as an unhandled FSWatcher error →
uncaught exception → process exit 1. (The `undefined` host was a separate
cosmetic bug: current esbuild `ctx.serve()` returns `{ hosts: [...] }`, not
`{ host }`.)

**Fix:** added a `watcher.on('error', …)` handler and wrapped the copy in
try/catch so transient sync failures are logged and ignored, not fatal; the
serve log now prints `http://localhost:${port}` directly. No change to the
recovery procedure — `npm run dev` remains the one command.

**Verified:** clean restart serves HTTP 200 (v3.1.547); host log fixed.

---

## 2026-06-16 — Interactive control colour + contrast (UoN blue, 3:1 borders)

**Task:** Two Current-milestone UI items — sliders/switches should read UoN
dark blue not black; interactive elements need a ≥3:1 non-text boundary
(WCAG 2.2 SC 1.4.11). CSS/token-only.

**Key finding:** control fills already referenced `--interactive-01`
(= `--uon-blue` `#003A65`, ~11.7:1 on white) — it *passes* contrast but reads
near-black at small sizes, and a couple of sliders (`.sidebar-control-row`,
`.control-row-inline`) set no accent, so they fell back to the UA default. So
"not black" was a perception + consistency gap, not a contrast bug.

**Decisions:**

- **Colour (A1):** added a semantic `--control-accent` / `--control-accent-hover`
  seam (= `--uon-blue` / `--uon-nottingham-blue`) and pointed every control
  fill at it (section + timeline thumbs, `.mode-toggle` on-state,
  `.segment.active`, checkboxes). Added `accent-color` on `body` so *all*
  native controls inherit UoN blue — kills UA-default/black fallbacks in one
  line. Kept `#003A65` as the value; the seam allows a one-place retune later.
  Normal text colour untouched.
- **Borders (B1):** interactive boundary = `--border-interactive` `#767676`
  (4.53:1). Added a 1px rail border to the two custom sliders
  (`.section-content`, `.timeline-slider`; rails were `--ui-03` ≈1.2:1), gave
  the `.mode-toggle` OFF state a visible border (ON sets it transparent — navy
  fill is already 11.7:1), and flipped the interactive containers
  (`.segmented-control`, `.mode-switch`) from passive `--border-subtle` to
  `--border-interactive`. Repaired `--border-control` (was `#BDBDBD` ≈1.9:1,
  failed 3:1 → now aliases `--border-interactive`).
- **Adjacent fix:** `.segment.active` used an undefined `--text-on-color`,
  rendering the selected Edit/Preview tab as near-black text on the navy fill
  (~1.3:1). Repointed to `--text-04` (white inverse, 11.7:1) — a one-line fix
  on a line already being edited.

**Kept separate:** UoN UI tokens vs Okabe-Ito map palette — no map colours
touched. No colour-only meaning: switch state is carried by fill + thumb
position, selection by border + contrast.

**Scope:** `styles/tokens.css` + `styles/main.css` only. No JS/HTML.

**Verified:** `npm run build` (v3.1.544) + 60/60 tests green. Visual smoke-load
pending user confirmation (canvas/CSS not unit-tested).

---

## 2026-06-16 — Camera zoom: keyframe over major waypoints only (bug fix)

**Bug:** With two 4x majors and a minor between them, the follow-cam zoom
dipped toward 1x at the minor (preview + MP4/WebM + HTML export).

**Root cause:** Zoom was keyframed over *every* waypoint.
`CameraService._findWaypointSegment()` walked the full waypoint list and
each `Waypoint.camera.zoom` defaults to 1, so a minor injected a 1x
keyframe → interpolation ran 4x→1x→4x. The camera UI was already
major-only ("This/Next Zoom" read the next *major*,
`main.js:_updateCameraControls`), so the engine was the part out of step.

**Decision:** Make minors transparent to the camera by feeding the
keyframer a *majors-only* waypoint+progress set. Chosen over filtering
inside `CameraService` so the interpolation/smoothing/rate-limiter maths
stay untouched and the service stays generic ("keyframe over whatever
you're given"). New invariant: **camera zoom keyframes over major
waypoints only; minors shape path geometry, never zoom.**

**Mechanism:**

- New pure `CameraService.toMajorKeyframes(waypoints, progressValues)` →
  index-aligned majors-only arrays (unit-tested).
- `main.js:_calculateCameraState()` passes the filtered arrays. Head
  position still derives from full `pathPoints`, so panning is unaffected.
- **HTML export mirror:** the embedded player's `findWaypointSegment` /
  `calculateTargetZoom` / `hasZoom` filter on `isMajor !== false` (already
  embedded). Same predicate in both so indices align.
- **Rate-limit warning:** `main.js:validateZoomTransitions()` now builds
  major→major pairs with durations aggregated across spanned minors —
  otherwise short minor sub-segments would raise false warnings.

**Not touched:** `AnimationEngine.setSegmentMarkers()` (timing still
keyframes every waypoint). That is the same minors-as-keyframes shape and
the *shared* half of the Next-milestone "segment-speed model" item — but
that item has separate contributors (`MIN_CORNER_SPEED`, the all-1.0x vs
variable-speed regime split) and needs its own spike. Mirror this
majors-only approach there when it lands.

**Verified:** `npm run build` (v3.1.542) + 60/60 tests (added a
regression test proving full-list dips to ~1x and majors-only holds 4x).
Manual smoke confirmed by user: preview holds 4x across the minor.

---

## 2026-06-16 — Export toggles: without-camera / without-text

**Decision:** Added `exportSettings.includeCamera` / `includeText`
(default true), surfaced as two Carbon checkboxes in the Export section.
Chosen design = Option A: gate the raster/preview render; shape the HTML
export data. Never mutate the live waypoint model.

**Mechanism:**

- **Camera:** `_calculateCameraState()` returns identity when
  `!includeCamera` (alongside the existing `!previewMode` guard) — flat
  view in preview + export.
- **Text:** render state carries
  `suppressLabels = !includeText && (previewMode || _isExportMode)`;
  `RenderingService.renderVectorLayerTo` skips `renderLabel`. WYSIWYG in
  Preview, full suppression during export, labels always shown in plain
  Edit mode.
- **HTML:** `HTMLExportService` shapes `PROJECT_DATA` (per-waypoint
  `camera.zoom = 1` so the player's `hasZoom` check is false; `label =
  ''`) — no embedded-player JS changed.

**Persistence:** both keys added to autoSave + project-save; explicit
`!== undefined` restore + checkbox sync in `loadAutosave`; checkbox sync
after the project-load `Object.assign` (`!== false` so old saves default
to included).

**Naming:** positive `includeX` (checkbox checked = included), inverse
to the legacy `pathOnly`. Events `video:camera-change` /
`video:text-change` mirror `video:layers-change`.

**Deferred:** consolidating the Export "Included" select + these toggles
into one checkbox group → `wish-list.md`.

**Verified:** `npm run build` + 57 tests green. Manual canvas/HTML
verification pending.

---

## 2026-06-16 — Roadmap: six incoming requests triaged + batched

**Context:** Six requests (segment-speed range; first-leg speed
coherence; path glow; zoom-returns-to-1x; export-without-camera;
export-without-text) scoped against source before any code.

**Key finding — shared root cause:** Minor waypoints act as full
*timing and camera keyframes*, contradicting the documented "minors
shape geometry only" model. `CameraService._findWaypointSegment()`
keyframes over every waypoint and each `Waypoint.camera.zoom` defaults
to 1, so a minor between two zoomed majors interpolates 4x→1x→4x — the
"zoom returns to 1x" report. The camera UI already implies
major-to-major ("This/Next Zoom" read the next *major*), so the engine
is the part out of step. Timing has the same per-leg-incl-minors
structure in `AnimationEngine.setSegmentMarkers()`.

**Decisions:**

- **Camera 1x dip = bug, lands in Current.** Fix by keyframing zoom over
  major waypoints only (minors pass through). Aligns the engine to the
  existing UI contract; low ambiguity.
- **Segment-speed model rethink needs a diagnosis spike first.** Lean:
  minors = geometry only, majors = timing keyframes. But corner-slowing
  reparameterisation (`MIN_CORNER_SPEED`) and the all-1.0x vs
  variable-speed regime split are separate contributors to "first leg
  feels different" — confirm before committing. Goes to Next (rework,
  not a clear-cut bug); shares the camera diagnosis.
- **Wider range sequenced after the model** to avoid tuning twice;
  proposed 0.1x–10x, slider stays log-centred on 1.0x.
- **Export-without-camera / -without-text batched together** — same
  pattern as existing `pathOnly` (temp state swap during export) plus
  4-place persistence; ship as one low-risk batch, first.
- **Path glow: global toggle**, distinct name from beacon "glow"; new
  render pass modelled on the casing pass.
- **HTML-export parity included** for glow + both export toggles
  (`HTMLExportService` has its own renderer — extra work accepted for
  consistency).

**Recommended order:** export toggles → camera fix → segment-speed
model + range → glow.

**Scope:** Memory only (`backlog.md` + this entry). No app code.

---

## 2026-06-16 — Pruned project memory

**Decision:** Migrated the lone shipped `[x]` item out of `backlog.md`
(shipped work has a budget of 0 there). Moved *Path casing toggle* to
`trajectory.md` as the first real phase entry (one line); its WHY was
already logged (2026-04-16). Removed the `## Completed` section and its
stale "read Active only" comment from `backlog.md`.

**Scope:** No `archive/` files created — content moved to the live
`trajectory.md`, not cold storage. All other memory files are within
budget. This clears the follow-up noted in the 2026-06-14 upgrade entry.

---

## 2026-06-16 — Fixed broken deploy path (`build:deploy` / `push.js`)

**Decision:** `build:deploy` was `npm run build && rm -rf docs && cp -r
dist docs`, but `build.js` writes straight to `docs/` and never creates
`dist/`. So `npm run push` built fresh `docs/`, deleted it, then copied
a stale, gitignored `dist/` (months old, 280 KB vs 479 KB) over it —
i.e. it would deploy old code. Simplified `build:deploy` to
`npm run build`; dropped `dist` from `push.js` `STAGE_TARGETS` /
`git add` / log messages; repointed `serve:dist` at `docs/`. Updated
`DEV-INFRASTRUCTURE.md` + `README.md` to match.

**Verified:** `node push.js --dry-run` shows build → stage `docs
version.json` → commit → push, with no `dist`. The bug was caught
during the code-review-phase2 deploy (done manually to avoid it). The
stale local `dist/` is harmless now that nothing references it.

---

## 2026-06-16 — `npm test` uses the threads pool (OneDrive workspace fix)

**Decision:** Changed `npm test` from `vitest run` to
`vitest run --pool=threads --no-file-parallelism` (and `test:watch`
to match) in `package.json`.

**Why:** Vitest's default `forks` pool times out starting its worker
in this OneDrive-synced workspace path, exiting 0 with "no tests" — a
silent false green. The 2026-06-14 entries noted forks "succeeds once
hydrated", but the timeout has proven consistent enough to need a
permanent fix rather than relying on warm `node_modules`. The
`threads` pool with `--no-file-parallelism` was verified green
(57/57, ~1s) and is now the canonical invocation.

**Scope:** `package.json` scripts + `DEV-INFRASTRUCTURE.md` canonical
scripts table (command + a "why" note). No source or test changes;
generated `docs/*`/`version.json` left untouched.

---

## 2026-06-14 — Code review phase 2: cleanups + coverage (branch code-review-phase2)

**Decision:** Continued the review ("go whole hog on the parked items").
Shipped the safe, verifiable improvements; deliberately deferred the two
high-surface, interaction-unverifiable items to a supervised session.

**Shipped (branch `code-review-phase2`, build + 57 tests green):**

- Canonicalised labelMode — normalise legacy `'none'` → `'off'` on load;
  `hasLabel()` now tests `!== OFF`; UIController editor fallback `'off'`.
- PathCalculator coordinate access uses `??` (a valid `0` coordinate is
  no longer discarded by falsy `||`).
- Removed unused `A11Y` constants and 4 dead `@deprecated` methods
  (reveal-mask ×2, tab no-ops ×2) — all verified zero callers.
- +13 unit tests (labelMode/hasLabel, getTextVisibility branches, log2
  slider round-trip, ImageAsset). Suite 44 → 57.

**Deferred, with reasoning:** a blind `main.js` split is organisational
only (no runtime benefit) and a ~40-site `render()`→`queueRender()`
migration both carry subtle interaction-regression risk I cannot verify
without a browser (no Playwright/interaction harness). Both are planned
concretely in `wish-list.md` for a supervised session. A few
`@deprecated` methods were left in place (internal whitespace makes
tool-based excision fragile).

---

## 2026-06-14 — Code review: restored test suite, fixed latent bugs

**Decision:** Ran a full code-review pass (auto-jazz, unsupervised) on
branch `code-review-autojazz`. Prioritised safe, high-value fixes over
risky refactors.

**What changed:**

- **Test suite restored (0 → 44 passing).** `npm test` was a silent
  false-green ("no tests", exit 0). Causes: (1) `tests/setup.js`
  assigned getter-only jsdom 27 globals (`performance`, `localStorage`,
  `Image`, URL helpers) via `global.x =`, throwing during setup;
  (2) `example.test.js` used `jest.fn()` in a Vitest project; (3) stale
  assertions (labelMode `'none'`, pixel-space PathCalculator input,
  removed Easing methods). Also discovered: the default forks pool times
  out on a cold OneDrive `node_modules` ("files on demand") and reports
  no tests; it succeeds once hydrated — a real false-green trap.
- **fix(waypoint):** `toggleType()` set `labelMode` to legacy sentinel
  `'none'` (invalid TEXT_VISIBILITY mode); aligned to `'off'` like
  `createMinor`/`copyPropertiesFrom`.
- **fix(app):** `destroy()` called non-existent methods
  (`pathCalculator.destroy`, `eventBus.removeAll`) and cancelled a
  boolean instead of a RAF id; corrected, and `queueRender()` now stores
  the frame id.
- **+18 unit tests** for pure model/service logic (`tests/units.test.js`).

**Deferred (wish-list — too risky unsupervised):** split 6057-line
`main.js`; direct `render()` → `queueRender()`; remove `@deprecated`
shims and unused `A11Y` constants; dead `Waypoint.hasLabel()`.

**Status:** committed to branch, not pushed/merged — awaiting review.

---

## 2026-06-14 — Upgraded pm-skills framework (pre-1.0.0 → 2.3.0)

**Decision:** Upgraded pm-skills from its pre-versioning state to
v2.3.0 via the framework's Legacy upgrade path (full-tree diff against
source, classified by `MANIFEST.md`).

**Version:** pre-1.0.0 (no `VERSION` file) → 2.3.0.
**Source:** <https://github.com/djDAOjones/PM-Skills> (shallow clone).

**What changed:**

- Added metadata `VERSION`, `CHANGELOG.md`, `MANIFEST.md` — the project
  is now versioned and future upgrades skip the legacy path.
- Overwrote 12 existing framework files (GUIDE, init, integrations
  bugfix/feature, 8 prompts) with their v2.3.0 versions.
- Added 15 new framework files (7 integrations incl. init-mvp,
  init-project, spec-to-prod, prune-memory, auto-jazz(-lite), upgrade;
  8 prompts incl. deploy, end-of-task, doctor-memory, next-batch,
  prune-memory, release, roadmap-refactor, upgrade).
- Created two new project-memory files from template: `trajectory.md`
  (warm — shipped-work narrative) and `wish-list.md` (cold — idea inbox).
- Merged root templates: `AGENTS.md` gained the Memory size budgets
  table, the Capturing deferred ideas section, the One-command runtime
  recovery hard rule, an updated Document-ownership table, and new
  anti-patterns; `DEV-INFRASTRUCTURE.md` gained a populated Runtime
  lifecycle section. `UI-STANDARDS.md` unchanged (already current).

**Local customisations:** none — existing framework files were vanilla
older versions (no project-specific edits found), so all were
overwritten cleanly. All populated content in the root templates was
preserved verbatim.

**Follow-up:** `backlog.md` still has a `## Completed` section; newer
pm-skills relocates shipped work into `trajectory.md` (one line) +
`decision-log.md` (the why). Migrate via `roadmap-refactor.md` /
`prune-memory.md` when convenient — deferred to keep this upgrade
lossless.

---

<!-- FILE: pm_skills/project/archive/decision-log-2026-08-17-to-2026-08-26.md -->

# Decision Log — archived 2026-08-17 → 2026-08-26

<!-- Archived from decision-log.md on 2026-08-27 (memory prune). Verbatim,
     append-only history: v3 founding + refactor Phases 0-5 (08-17..08-19)
     and the first review-remediation day (08-26). Newest first. -->

## 2026-08-26 — one checked-in contract briefs Codex and Claude Code

**Decision:** Keep `AGENTS.md` as the single shared standing contract and add
one root `CLAUDE.md` that imports it. Codex discovers the contract natively;
Claude Code and the Code tab in Claude Desktop load the adapter and expand the
import. `README.md` plus `pm_skills/project/` remain the canonical product and
evolving project records. The adapter contains only Claude-specific loading
and auto-memory guidance, so shared facts cannot drift between two copies.

**Context and memory boundary:** Replace the obsolete budget table and broad
every-task reads in `AGENTS.md` with the current tiered policy. Budget numbers
live only in `pm_skills/memory-policy.md`; file-map, backlog, and decision-log
loads are sectional. Codex local memory and Claude auto memory are optional,
machine-local recall layers, never standing policy or a cross-machine handover.
`CLAUDE.local.md` is ignored for genuinely personal project preferences, while
the existing ignored `.claude/` launch configuration stays local.

**Repository boundary and evidence:** The enclosing PARM Maps Encore folder is
not a Git repository and contains several independent projects. Both tools must
open the `Route Plotter v3` Git root for startup discovery and worktree sharing.
The design follows the official Codex
[AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) and
[memories](https://learn.chatgpt.com/docs/customization/memories) guidance, plus
Claude Code's [memory](https://code.claude.com/docs/en/memory) and
[Desktop](https://code.claude.com/docs/en/desktop) documentation. No application
source, runtime configuration, or generated output changed.

## 2026-08-26 — HEAD-01 bundles one reviewed preset across both runtimes

**Decision:** Ship the approved right-facing, top-down quadcopter as a 512 px
RGBA source asset and a native `Drone` head style. The style reuses the
existing route-wide size, follow/fixed rotation and offset controls; it hides
the custom upload affordance because a built-in preset is selectable, not an
editable asset. Arrow remains the default, and the custom-image path retains
its existing asset ID, preview, persistence and undo ownership.

**Runtime/publication boundary:** Import the PNG through one preset resolver
and inline it as a data URL in both `app.js` and the standalone `player.js`.
Projects therefore persist only the `drone` style string, exported HTML remains
self-contained, and Clear All cannot discard the bundled image. The source PNG
is public on the approved review branch, but it does not enter
`public-assets.json`: that manifest and the exact 17-file Pages inventory still
govern only the six separately copied example backgrounds.

**Evidence and sequence:** Asset metadata/tests pin a square RGBA source,
preset/custom loader separation, renderer transform, Clear All and standalone
player hydration. The canonical gate passes 54 files / 745 tests, restart
safety and a clean production check build. Local Chromium shows the
native selection, rotation-only preset controls, clean canvas rendering and
reload persistence with no warning/error console entries. HEAD-01 leaves the
backlog; UI-02 moves to Current as the next runnable item but keeps its explicit
owner sign-off gate. The shipped CROWD-03 dependency is removed from the
COMPOSE-01 and COMPOSE-03 gate labels; no Icebox evidence was triggered.

## 2026-08-26 — MAINT-01 removes only the pre-verified dead paths

**Decision:** Keep the maintenance sweep at the exact boundary recovered from
the roadmap evidence: delete the superseded per-waypoint segment-length path,
the deprecated duration calculator, the unused legacy logarithmic converters,
and the export warning whose target DOM never existed. The orphaned segment
length cache leaves the editor, standalone player and transactional rollback
state with its dead producer. No other apparently unused public method is
included; a broader dead-code search would mix uncertain compatibility choices
into a behaviour-preserving ticket.

**Evidence:** Repository-wide symbol searches show no runtime callers for the
removed paths. Existing path-length coverage now names the canonical total-path
calculation, while major-leg timing, golden playback/export parity and video
transport restoration retain their existing tests. The canonical gate passes
53 files / 739 tests, restart safety and a clean production check build. The
production app bundle falls from 772.67 KB to 770.85 KB and the player bundle
from 160.37 KB to 159.09 KB. No roadmap dependency or Icebox trigger changed.

## 2026-08-26 — SCALE-01 separates authored appearance from output resolution

**Decision:** Each project now persists one additive `renderReference`, seeded
for legacy data from `timingReference`, the current authored canvas or export
dimensions in that order. Map-bound path, marker, route-head, beacon and area
border values are authored as reference pixels and convert through the ratio
between current and reference short edges. Normalised coordinates and area
geometry remain canvas-relative, while `timingReference` remains the sole
exported-player timing space. Camera zoom continues to transform the composed
scene rather than rewriting either reference.

**Editor/export boundary:** Visible controls report `reference px`. Label type
uses a 14–72 screen-pixel clamp only in the interactive editor so extreme
viewport sizes stay legible; HTML and video render the exact reference scale.
The label padding and radius follow the effective type size. All authored
values and both references remain unchanged by preset, portrait, landscape,
custom-resolution and video rendering.

**Migration, evidence and sequence:** ZIP save, recovery and HTML export now
share the canonical snapshot builder, preventing additive metadata from
drifting between persistence paths. Invalid references fail transactional
import, while old snapshots migrate without a schema rewrite. The canonical
gate passes 53 files / 739 tests, restart safety and a clean production check
build. Production Chromium confirms coherent canvas output, stable readouts
across 1:1, 9:16 and 16:9 presets, and no warning/error logs. Phase 6 is
complete. Backlog refactoring promotes HEAD-01 from its SCALE-01 gate but keeps
it low priority behind product and assurance work; no Icebox trigger fired.

## 2026-08-26 — REV-06 makes preview scheduling demand-driven

**Decision:** `AnimationEngine` now requests one coalesced update for startup,
paused seeks and other transport mutations, then leaves no animation frame
queued once the view is stable. Play wakes the loop without charging the idle
interval to its first frame. A callback may keep frames alive only for visible
non-timeline work; editor and standalone player use that contract for camera
momentum. Export suspension cancels preview work; restore requests one
coalesced update and only active captured transport keeps it awake, so the
explicit synchronous export frame loop remains the sole export renderer.

**Profiling boundary:** The old scheduler requested a new browser frame before
every callback even when paused, despite the editor already suppressing most
idle canvas redraws. A deterministic scheduler harness now proves one requested
paused update settles to zero queued frames, while play, pause, seek, camera and
export transitions retain their wake paths. Camera settling compares its
rate-limited and smoothed values with their authored targets; a stable 4x view
is no longer mistaken for a transition merely because it is not 1x.

**Evidence and sequence:** A real 3,840×2,160 Canvas2D fixture with 500 seeded
dots averaged 0.343 ms for evaluate plus batched draw, with 0.5 ms p95 across
200 frames. The app's own near-4K MP4 run likewise reported 0.3 ms average
rendering while encoder backpressure consumed 7.2 seconds, so no speculative
direct-render coalescing was added. The canonical gate passes 52 files / 729
tests, restart safety and a clean build; production Chromium proves advancing
playback, stable pause and no warning/error logs. REV-06 leaves the backlog and
unblocks SCALE-01 into Current. No Icebox evidence was triggered, and the full
owner-protected trajectory remains intact despite its soft-size warning.

## 2026-08-26 — CROWD-02 compiles authored busyness into deterministic release time

**Decision:** Persist `Emitter.busynessEnvelope` as two-to-eight ordered
normalised time/value handles, with `gradual` or `step` on each outgoing span.
The flat two-handle default is neutral. Existing `intensityRamp` behaviour is
unchanged and runs before the envelope, so projects without the additive field
retain their exact historical schedules. The pure SwarmEngine compiles segment
areas once per emitter evaluation and maps each seeded dot quantile through the
envelope's inverse cumulative density; no runtime crowd state is stored and the
full authored count still releases by the window end.

**Authoring contract:** Release's native More tier owns one compact SVG graph.
Its 44 px pointer targets move handles directly; labelled Time, Busy and Change
controls provide equivalent keyboard authoring, with Enter as an explicit
numeric commit. Endpoints stay at zero and 100 percent, adding a handle splits
the widest span without changing the curve, Reset restores even busyness, and
an all-quiet profile is rejected. V1 continues to edit only the first emitter,
matching the established crowd-card boundary; additional emitters remain
inspectable rather than silently rewritten.

**Evidence and sequence:** Pure density tests cover neutral, triangular and
sudden profiles plus strict persistence validation. Model, UI, scene, engine
and exported-player tests cover migration, pointer and exact-control
transactions, seeded replay, Undo and editor/reload/export parity. The
canonical gate passes 51 files / 721 tests, restart safety and clean production
build validation. Production Chromium authored a quiet to sudden-busy to
gradual-quiet profile, proved reload persistence and one-step Reset/Undo, and
showed readable single-column controls at 320 px. CROWD-02 leaves the backlog;
REV-05 is now gated only by REV-03. No Icebox evidence was triggered, and the
owner-requested full trajectory remains preserved despite its known soft-size
warning.

## 2026-08-26 — CROWD-03 exposes one reproducible pattern, not runtime randomness

**Decision:** Keep the founding Emitter model and make its deterministic
variation legible. The immediate controls remain in their task cards and use
plain names: Walking variation for lateral wobble and Pace variation for
per-dot speed. Release's native More tier adds Release timing for uneven
set-offs, Release bias for earlier/later density, the exact unsigned pattern
seed and Re-roll pattern. Directional readouts state the effective result, not
the signed storage value.

**Seed and route-choice contract:** Re-roll changes only the primary emitter's
seed. It never changes authored variation, release, appearance or lifecycle
controls, and it guarantees a different seed even if the authoring-time random
draw collides. One immediate history/autosave/render transaction makes the
change reversible and refreshes the semantic outline. Playback, scrubbing,
reload and export remain pure evaluations of the persisted snapshot. On custom
networks, CROWD-01 junction shares own route proportions while the seed assigns
individual dots reproducibly; named presets and multi-emitter editing remain
outside this tranche.

**Evidence and sequence:** The canonical v3.2.645 gate passed 50 files / 708
tests, restart safety and the clean production-build comparison. Model, crowd
UI, persistence, semantic-outline and SwarmEngine tests cover 0/100 percent
bounds, seed collision, weighted choices and serialized-clone frame parity.
Production Chromium
covered release controls, seed-only Re-roll and Undo, autosave/reload, custom
network guidance, clean fixture restoration, a readable 320 px layout and an
empty warning/error console. CROWD-03 leaves the backlog and CROWD-02 becomes
Current; no Icebox trigger is met and the owner-requested full trajectory is
preserved despite its known soft-size warning.

## 2026-08-26 — UI-05 makes card-scale propagation explicit and reversible

**Decision:** Marker, On arrival, Label and Leg end with one compact action
row. Reset writes canonical route/default values to the card's actual selected
targets; Apply onward requires exactly one source and writes only later
route-order targets. Major-only properties continue to skip minors, while Leg
appearance includes them. Area is deliberately excluded because polygon
geometry is authored content and already has an explicit Delete action. Label
actions preserve label text, waypoint names and auto-name state.

**Transaction and state:** Each available action flushes a pending continuous
edit, performs at most one model transaction, refreshes only its required
path/timing/list effects, records one immediate undo state and schedules one
autosave. Visually empty actions are disabled with an accessible reason;
colour comparisons are case-insensitive and dormant custom-marker assets do
not create false differences. Custom images reuse the already-admitted runtime
asset reference while serialisable nested camera data is copied by value.
Undo/redo also synchronises the inspector's visible route/waypoint scope with
the restored selection without replaying mutation events.

**Evidence and sequence:** Focused action, wiring and multi-selection tests and
the canonical production gate cover selection boundaries, content
preservation, one-step history and persistence. Production Chromium covered
Marker and On arrival propagation, one-step Undo, no-op and multi-selection
reasons, autosave/reload, route-scope restoration, a 320 px layout and a clean
warning/error console. UI-05 leaves the backlog and CROWD-03 becomes Current;
UI-02 remains an owner sign-off gate and no Icebox trigger is met. The owner's
requested full history and trajectory remain preserved despite the known
soft-size warnings.

## 2026-08-26 — UI-04 makes every multi-edit field honest about disagreement

**Decision:** A waypoint inspector control derives its displayed state from the
same actual target set that its existing event handler will write. Leg and Area
fields compare every selected waypoint; marker, arrival, label and camera
fields compare selected major waypoints only. A selection containing one major
and any number of minors therefore shows that major's real value, while a
minor-only selection disables major-only controls. Disagreement is presented
as a disabled transient Mixed option for selects, `Mixed` readout and
`aria-valuetext` for ranges, native indeterminate state for checkboxes, and an
unselected palette with a visible Mixed label for swatches.

**Architecture and interaction:** Mixedness is DOM-only state: no Waypoint
field, serialised shape, default, renderer, timeline, export rule or migration
changed. Choosing any concrete value clears the presentation through the
normal control path and applies one shared value using the established
selection, history, render and autosave pipeline. Mixed parent choices hide
dependent controls that would otherwise imply one active subtype. Polygon
drawing is unavailable for a multi-selection because it is an inherently
single-shape operation. Custom-marker preview copy no longer falsely implies
the primary image when selected majors disagree.

**Evidence and sequence:** The canonical production gate passed 49 files / 685
tests, restart safety and the clean-build comparison for v3.2.641. Live
Chromium checks covered mixed marker, size, colour and camera controls,
single-step shared edits and Undo, autosave/reload, a 320 px layout and exact
fixture restoration. UI-04 leaves the backlog and UI-05 becomes Current. The
roadmap review found no evidence strong enough to promote an Icebox item, and
the owner's requested full history and trajectory remain preserved despite
the known soft-size warnings.

## 2026-08-26 — UI-03 exposes latent appearance and camera choices without a migration

**Decision:** Surface the Waypoint model's existing label foreground,
background, background opacity and destination zoom mode inside the established
Label and On arrival More disclosures. Label colours reuse map-neutral presets
plus the component's custom-colour escape; the picker now names the exact
current hex value and leaves every preset unselected when none matches. This
preserves imported values instead of falsely presenting the first swatch.
Background opacity is an explicit percentage. Zoom-transition copy states the
ownership that CameraService already implements: gradual over the incoming leg
or quick on arrival at this waypoint.

**Architecture and compatibility:** The auto-jazz gates chose the smallest
existing-pattern option over standalone native colour fields or any new model
abstraction. No Waypoint field, default, serialised shape, rendering rule,
timeline rule or export path changed. UI edits write to selected majors and emit
the existing `waypoint:style-changed` event, retaining one render, debounced undo
and autosave path. Minor-only selections disable the controls. UI-04 still owns
truthful mixed-value presentation; UI-05 remains behind it.

**Evidence and sequence:** The canonical gate passed 48 files / 678 tests,
including exact custom-swatch state and distinct camera-mode semantics.
Production Chromium v3.2.638 proved preset/custom changes, one-step Undo,
autosave/reload, accessible custom disclosure, a usable 320 px layout and an
empty warning/error console; the fixture was restored and reloaded to a fresh
disabled-Undo baseline. UI-03 leaves the backlog and UI-04 becomes Current. No
Icebox trigger was met, so none is promoted; the full trajectory is preserved
under the owner's standing direction.

## 2026-08-26 — UX-02 exposes authored values instead of slider coordinates

**Decision:** Inspector range controls must name the value consumed by the
renderer or timeline, not the implementation coordinate used to shape the
slider curve. Label Size now edits the model's existing 16–48 pixel value
directly; marker, leg and head sizes add pixel units; shape amplitude translates
its legacy five-units-per-effective-percent storage; and the background overlay
states its effective opacity plus darker/lighter direction. Translated sliders
keep their visible readout and `aria-valuetext` synchronized. Pulse “Cycle
speed” becomes “Cycle duration.”

**Compatibility and timing:** This is a UI migration, not a project migration.
No persisted field, existing numeric value, renderer scaling rule or export
result is rewritten. Pacing shows a short explanation only when Comet is
selected: with a non-zero trail, Preview intentionally continues after the
route head finishes so the tail can clear. Timeline calculation remains the
canonical existing implementation.

**Evidence and sequence:** Focused persistence/inspector tests and the canonical
47-file / 673-test gate are green. Production Chromium v3.2.636 proved live
pixel, effective-amplitude and directional-overlay readouts, Comet duration
switching, a clean warning/error console and a usable 320 px layout; the browser
fixture was restored and reloaded to a fresh baseline. UX-02 leaves the backlog
and its temporary detail ticket is removed. UI-03 moves to Current because
UI-01's More slot and UX-02's readout convention are now stable; UI-04 remains
behind it and no Icebox item is promoted.

## 2026-08-26 — UI-01 makes progressive disclosure a card contract

**Decision:** Use native `details`/`summary` as the inspector's one secondary
tier. A crowded card keeps the shortest complete task in a `.section-primary`
region and labels its refinements `More`; cards already at four or fewer
conceptual controls receive no empty disclosure. On arrival, Label, Leg, Area,
Reveal and Video use the new slot without changing any control identity, event,
model or persistence path. The native open state and non-colour chevron expose
state; a small SectionController keyboard adapter guarantees Enter and Space in
embedded Chromium surfaces where default summary activation is inconsistent.

**Usability boundary:** Primary means required to complete the card's common
task, not merely frequently used. Shape-specific area geometry and Delete stay
visible; appearance and timing refinements can be disclosed. Compact and
contextual cards remain one tier. More is a 44 px target with the established
AAA focus ring and no nested-card border. Production Chromium v3.2.633 proved
pointer, Enter and Space activation, retained control/readout wiring, no
duplicate IDs, a clean console and a 320 px open-card layout with no overflow.
The canonical gate passed 47 files / 671 tests.

**Roadmap refactor:** UI-01 leaves the backlog and its detail ticket is removed.
UX-02 becomes active; UI-03, UI-02 and CROWD-03 are ready. UI-04 follows UI-03
so mixed states cover the surfaced controls, and UI-05 follows those mixed-state
rules. CROWD-02 now waits only on CROWD-03. ICE-01 remains deferred: keeping the
Marker palette visible supports recognition for novices, while UI-01 already
contains secondary Area palettes. No other Icebox item is promoted.

## 2026-08-26 — REV-03 uses one restoring pointer transaction

**Decision:** Mouse, touch and pen canvas authoring share one primary Pointer
Events transaction. `InteractionHandler` hit-tests and snapshots geometry on
pointer down, applies one 3 CSS px tap/drag threshold, and emits exactly one
terminal tap, drag commit or cancellation. Pointer capture is the main
outside-canvas path; idempotent window `pointerup`/`pointercancel` fallbacks
cover user agents that release capture before routing the terminal event back
to the canvas. Native drop, context-menu, wheel and range-control behaviour
remain separate.

**Geometry and history:** A drag on any selected waypoint promotes it to
primary while retaining the selection. Every member moves from immutable
gesture-start coordinates by one shared, bounds-safe delta, with one path
recalculation per frame and one history/autosave commit. Area centre/vertex and
network node/control/edge drags use the same end/cancel boundary. Cancellation
restores exact start geometry; a no-op release or a move away and back creates
no history entry.

**Evidence and sequence:** Automated mouse/touch/pen contracts, the 47-file /
669-test canonical gate and production Chromium v3.2.629 are green, including
an outside-canvas group release, one-step group Undo, 320/390 px layout and a
clean console. The canonical cold restart then reached ready at v3.2.630.
Physical iOS Safari and Android Chrome navigation/rotation evidence is
intentionally not inferred from emulation, so REV-03 remains open with that
named residual gate and its dependent items stay gated. UI-01 remains the next
independent ready product slice; no Icebox item is promoted.

## 2026-08-26 — REV-02 makes the canonical scene operable without the canvas

**Decision:** Ship one synchronized semantic scene outline as an equivalent
authoring view, not a second project model. Native disclosures, lists, forms
and buttons expose every major/minor waypoint, crowd, primary emitter, stored
network node/edge/control point and polygon vertex. Commands carry stable
entity identities back to the RoutePlotter orchestrator, which alone validates,
mutates, records undo and autosaves. The canvas remains the visual renderer;
selection and focus synchronize in both directions without making passive
inspection enter a drawing mode.

**Robustness and accessibility:** Numeric forms preserve exact stored values
until an author changes them, rejected submissions retain their drafts and
successful project replacement is the only load boundary that clears transient
outline/inspector state. Persisted entity IDs are structural rather than display
text and are limited to 256 UTF-16 code units, bounding high-cardinality key
fan-out while leaving the separate 100,000-character authored-text budget
unchanged. The outline mounts closed branches lazily and coalesces high-frequency
semantic refreshes. Standalone exports expose one concise privacy-safe aggregate
scene summary and announce discrete transport changes, waits and completion;
they never disclose authored names or coordinates or narrate animation frames.

**Sequence:** REV-02 leaves the live backlog and its detail ticket is removed.
REV-03 is now dependency-ready in Current. Only the resolved REV-02 gates are
removed from UI-02, REV-05 and ROUTE-01; UI-01 and crowd-envelope dependencies
remain. No Icebox or wish-list item is promoted because its trigger is still
unmet, and the complete prior trajectory is preserved as requested.

## 2026-08-26 — SUPPORT-01 separates preview, sharing and support navigation

**Decision:** The permanent Report a bug header action creates one fresh,
fixed-schema diagnostic bundle and shows its exact bytes before any other
action. Public-Issues guidance names the public and best-effort/no-SLA boundary;
suspected vulnerabilities receive a separate private-reporting link. Copy,
download and navigation remain independent user gestures, and neither support
URL contains diagnostics or project data.

**Recovery and accessibility:** Both governed destinations are real links whose
fixed runtime `href`, new-tab label, `noopener` and `noreferrer` preserve browser
semantics without weakening the same-origin resource inventory. Because secure
new-tab success cannot be detected reliably, the modal always shows the exact
Issues address plus an explicit address-copy fallback. It never offers a
same-tab escape that could discard live image bytes. Report mode alone exposes
the support controls and warning in its accessible description; utility
diagnostics remain unchanged. Heading focus keeps the scrollable disclosure at
the top, and closing returns to the originating Report or Export control.

**Sequence:** SUPPORT-01 leaves the live backlog after canonical and production
browser verification. REV-02 remains the next product tranche, followed by the
UI-01 layout substrate; REV-04 stays open only for its named real-engine and
genuinely offline evidence.

## 2026-08-26 — REV-10 uses minimum-loss transactional image admission

**Decision:** Interactive custom marker and route-head uploads preview the
exact undo stack that an ordinary successful save would retain, including the
normal 150-state rollover and redo invalidation. They first sweep asset bytes
unreachable from that prospective stack, then discard only the minimum strict
oldest prefix needed to meet the 128-asset, 40 MiB and 48-million-pixel project
limits. The new current state is never eligible for removal. Additional
history loss receives one visible and announced toast; normal rollover does
not.

**Transaction boundary:** Model references, asset bytes and history commit as
one synchronous unit. Any admission or assignment failure restores all three;
rollback failures are surfaced rather than hidden. Selecting the identical
image creates no history branch and preserves redo. Existing Waypoint event
payloads remain compatible, with the already-saved marker flag carried as a
second event argument.

**Persistence boundary:** Autosave remains deliberately model-only and is not
an asset-retention root. Explicit project imports stay detached until their
validated commit, then reset one baseline and prune only within the protected
transaction. Clear All invalidates late async work, removes every image byte
and reference, cancels pending writers and creates one empty non-undoable
baseline. Explicit ZIPs round-trip every reachable asset at the full boundary
and omit bytes already swept as unreachable.

## 2026-08-26 — Roadmap refactor: lifecycle queue after Phase 1 health work

**Decision:** Replace six numbered implementation phases with a dependency-led
Current / Next / Icebox queue. KEY-01, UX-01, BUG-01, QA-02, CROWD-04,
CROWD-01, REV-08 and REV-09 leave the live backlog because their outcomes are
implemented and canonically verified. REV-04 stays visible as a real-browser
and offline-artifact verification residual. REV-10 stays visible until the
approved minimum-oldest-history shortening rule and the full asset-boundary
matrix are proven.

**Sequence:** Promote SUPPORT-01 to Current because the public/privacy and
governance contracts now exist: the remaining work is an explicit GitHub
Issues hand-off that reuses previewed/redacted diagnostics and never uploads
automatically. MAINT-01 is also ready now that the keyboard-path repair has
shipped. All other open work is ordered by its actual dependency chain rather
than a stale phase label; REV-07 remains deferred in Icebox and Quarantine is
unchanged.

**History:** No wish-list item is promoted or cut because its trigger remains
unmet. The maintainer explicitly chose to preserve the complete trajectory
despite its size warning, so this refactor adds the new shipped lines without
archiving or deleting older trajectory content.

## 2026-08-26 — Phase 0 signed off; decisions become implementation contracts

**Decision:** Accept QA-01 and convert every Phase 0 decision ticket into
dependency-placed implementation work rather than treating sign-off as shipped
functionality. REV-02 will make the canonical scene available as a synchronized
DOM outline: all route, crowd, emitter, graph and polygon entities are
inspectable/selectable, with labelled coordinate/time inputs and explicit
keyboard commands for creation and editing. The standalone player will expose a
concise scene summary and meaningful transport announcements, not per-frame
narration.

**Publication and governance:** The six built-in backgrounds already allowlisted
on the owner-approved public branch may ship; legacy project ZIPs still require
individual provenance review. Explicit project/HTML exports retain original
bitmap bytes for fidelity, while diagnostics default to a previewed, redacted
technical report with no project content, raw storage, image bytes or original
filenames. Nothing uploads automatically. First-party source uses MIT; bundled
dependencies receive a checked third-party notice and source links. Security
uses GitHub private vulnerability reporting; general support uses GitHub Issues
on a best-effort/no-SLA basis. V1 uses the lockfile and release inventory rather
than a per-release SBOM. These are owner choices, not legal advice.

**Product models:** A split hero route runs every enabled branch simultaneously
on the one deterministic master timeline. Reconverged continuation waits for the
latest incoming branch; shared join effects and waits fire once; completion
waits for every terminal branch. Linear projects remain byte-compatible until
split. A project also owns a reference render size: map-bound graphics scale
uniformly from its short edge, labels use reference pixels with editor
legibility clamps, and export never mutates saved size values or authored
timing. These conservative auto-jazz choices preserve the existing deterministic
and additive-migration rules while making later implementation testable.

**Roadmap refactor:** Phase 0 leaves the active queue. REV-08/REV-09 join live
health and release assurance; REV-02 leads authoring foundation; ROUTE-01 leads
route composition; SCALE-01 leads showcase/scale. QA-01 alone is fully closed.

---

## 2026-08-26 — Roadmap refactor: health and decisions before new gestures

**Decision:** Replace the flat review list plus feature waves with six
dependency-ordered phases. Phase 0 exposes owner work that can run in parallel:
the consolidated QA feel-check, non-visual authoring, publication/privacy,
licence/support, split-route semantics and the scaling model. Phase 1 starts
with live defects and short user value. Source inspection promoted KEY-01
because Undo/Redo/Save currently emit events with no subscribers; UX-01 and the
area zoom hit-test follow. Export portability and reference-aware asset
collection stay ahead of new public examples. ROUTE-01 moves from a buried
blocked section into discovery now, but implementation remains behind its
model decision and REV-02/REV-03.

**Feature sequence and promotions:** CROWD-01 moves into Phase 1 because its
engine, edge weights and selected-edge share readout already exist; it need not
wait for the general inspector redesign. UI-01 then becomes the substrate for
CROWD-03 controls whose deterministic model largely exists, followed by
CROWD-02's net-new envelope. Wish-list controls for
label appearance, camera transition and mixed multi-select values move behind
that disclosure; graph-only crowd creation and neutral lifecycle copy become
CROWD-04. Group drag joins REV-03, edge-weight visualisation joins CROWD-01,
and render-call coalescing becomes a measured REV-06 technique. No standalone
Icebox feature is promoted because the swatch and palette triggers remain
unmet.

**Reconciliation:** Three segment-speed rows become QA-01. Suspected nudge and
restore regressions become one verify-first QA-02 because current code appears
to satisfy them. The Clear-All undo request is cut: REV-01 deliberately makes
Clear a non-undoable empty recovery baseline, so ordinary undo would risk stale
work revival. Custom-head work narrows to a drone preset because upload,
rotation, persistence and export already ship. The completed main.js split
leaves Quarantine; history already lives in trajectory. This preserves intent
while making one next development lane legible.

---

## 2026-08-26 — REV-01 closes the bounded review repairs; product-scale work stays explicit

**Decision:** Close REV-01 with the defects whose root causes could be repaired
without changing the product model: detached transactional project loading and
rollback, documented import ceilings, honest bounded autosave and recovery
ownership, generation-guarded async image work, deterministic trail/timeline
and transport restoration, one keyboard command path, modal/focus repairs,
responsive 1280/1024/480/320 reflow with 44 px targets, and reproducible CI,
clean Pages builds, current-branch deployment and owned-process restart. The
former blocked reflow item is therefore shipped under REV-01, not left as a
second description of completed work. The canonical check passed 410 tests,
the restart contract and a non-mutating production build.

**Boundary and roadmap:** Do not let this corrective branch imply that the
larger review questions are solved. Non-visual scene authoring, unified Pointer
Events, cross-browser/offline export proof, full accessibility assurance, idle
profiling, CI maturity, publication/privacy, licence/support governance and
reference-aware asset collection remain REV-02–REV-10. The requested direct
way back from waypoint editing is UX-01 in Wave 1. Competing-route shares,
whole-route busyness handles and seeded walking/release/choice variation are
CROWD-01–CROWD-03 in Wave 2, after the inspector disclosure layout they need.
Split hero routes are ROUTE-01 in Blocked / needs scoping because fork/rejoin
authoring also changes selection, waits, timing, head count, completion and
standalone-player/export semantics; owner sign-off must choose one branch, all
branches in sequence, or simultaneous heads before implementation. This keeps
bounded reliability work shippable while preserving each product decision as
an explicit, testable commitment.

---

## 2026-08-19 — Backlog triage: next milestone resequenced into waves; quarantine created

**Task:** Owner-requested assessment of every backlog item (useful? fits
the design? viable?) with verdicts stated, the backlog reorganised into a
development sequence, and rejected/questionable items quarantined visibly
for owner approval rather than deleted.

**Verified in code (2026-08-19):** the icebox main.js split is DONE
(Phase 1: 6,057 → 1,150 lines + src/app mixins, all five candidate
clusters extracted); the three dead-code icebox lines and the wish-list
`getSegmentLengths` pair remain genuinely dead (no callers;
`#export-mode-warning` element absent so the call null-guard no-ops);
keybinding customisation has no UI (`saveCustomBindings` uncalled);
`TextLabelService.autoPosition` already collision-scores; comet + reveal
already combine (Phase 5 golden variant); waypoint `customImage` with
auto-rotation exists as the base for a custom head icon; an example
project ZIP already ships in images/.

**Decision — wave sequence (proposal; owner disposes):** W0 close-out
(one consolidated feel-check clears both June [~] segment-speed items
plus the Phase 4/5 checks); W1 hygiene & launch-window quick wins
(dead-code sweep, nudge-undo coalescing, unit/naming pass, bug report
button, and three defect fixes promoted from the wish-list — area-handle
hit-test at zoom > 1, stale controls after undo/redo, Clear All undo
snapshot); W2 inspector completion (two-tier disclosure FIRST since it
defines the card slots, then minors-in-list, per-card reset/apply-onward);
W3 route⇄crowd composition (anchors before the branch gesture, which
depends on them; fit-wait and trace-route alongside); W4 showcase
(example projects authored after W3 so they demo the full story; custom
head icon). Ordering rationale: defects and the feedback channel first
while v3 is newly live; structural UI before the features that land on
it; the anchors→branch dependency chain; examples authored once.

**Decision — merged and reframed:** "Relative sizing across canvas
sizes" + "Export resolution preservation in zoom modes" merged into one
blocked design ticket (same root: absolute-px sizing tied to canvas
resolution; touches the timingReference rules — highest blast radius in
the app). Reflow breakpoint reframed as the brief's WCAG 2.2 reflow
commitment (1.4.10); its scoping/posture decision is the schedulable
unit, not the implementation.

**Quarantine (nothing deleted; owner approval pending):** propose CUT
import/export keybindings (feature on an unbuilt foundation); propose
RESTATE-OR-CUT comet-for-reveal, label auto-position improvement, and
path randomised-frequency (none names a current gap); propose DELETE the
verified-done main.js-split line. Wish-list triage: 4 lines moved out
(1 folded into the sweep, 3 promoted as W1 fixes), 14 remain.

---

## 2026-08-19 — Phase 5: HTML export runs the real stack; v3 goes live on GitHub Pages

**Task:** Phase 5 of the v3.0 refactor — HTML-export parity via PlayerCore,
GitHub Pages enablement, docs refresh (backlog Phase 5; owner scoped the
export work to FULL render-stack reuse over engine-bundle-only, and set
Pages go-live for end of phase, 2026-08-19).

**Decision — the exported player IS the app's render stack.** New
`src/player/PlayerApp.js`: a headless app core owning real instances of
EventBus, AnimationEngine, PathCalculator, CoordinateTransform,
RenderingService (and through it Beacon/Area/Dot/TextLabel renderers),
MotionVisibilityService, CameraService, SwarmEngine, hydrated from the
embedded project snapshot. It adopts `pathTimingMixin` WHOLESALE plus
cherry-picked viewport methods and `cameraMixin._calculateCameraState`
(the mixin `this`-contract makes this safe), so the fragile timing chain —
segment markers, pause budgets incl. grow early-onset, reveal intro,
comet tail — has exactly one source. The 1,270-line hand-written template
player (own mapping copy, delta-time `updateBeacons` — the founding
defect class) is deleted; exports gain swarm layers AND area highlights
(never exported before — the old payload simply omitted them). Bundle
discipline: the player must never import ImageAssetService (drags jszip)
or the exporting mixin (drags mediabunny); custom images hydrate through
the bare ImageAsset model.

**Decision — snapshot-embedded exports.** `_buildProjectSnapshot()`
extracted in the persistence mixin is now the single coordVersion-9 shape
for autosave AND HTML export (exports always include assets; autosave
keeps its 5MB gate). HTMLExportService embeds it plus the background data
URL and the pre-built `docs/player.js` (second esbuild entry, IIFE,
prod-minified; fetched same-origin at export time, inlined so files stay
self-contained; script-breakout-safe via unicode-escaping the < in the
embedded JSON).

**Decision — authored-timeline preservation via `timingReference`.**
Speed is px/s against the on-screen path, so duration/markers depend on
canvas size; video export already preserves the authored timeline by
never recomputing at the export canvas (_enterExportMode's rule), and the
old HTML export did so by serialising markers verbatim. The new player
honours the same rule: the snapshot carries additive
`timingReference {width, height}` (the app's display dims at export);
PlayerApp computes timing ONCE in that space — reproducing the authored
timeline to the double — then switches to export-resolution render space
(like an exported video frame) scaled into the window per frame.
`resetPlayback()` mirrors the app's `animation:reset` recipe for renderer
state but RESTORES the authored duration/mode instead of recomputing
(AnimationState.reset() clobbers both; nothing can change post-load, so
restore is exact). Found en route: `seekToTime()` updates currentTime but
not pathProgress — scrubbing must use `seekToProgress()` (the player's
arrow keys initially hit this; the app's slider always used the safe path).

**Verification:** 331/331 tests — new `tests/playerApp.test.js` golden
cross-check: app fixture (real services + real mixins) → snapshot →
PlayerApp reproduces the FULL timeline fingerprint (duration, segment
markers, pause budgets, intro/tail, beacon schedules) exactly, incl. a
reveal+comet variant; authored-timeline restore after reset; identical
deterministic swarm across independent player instances; includeText
flow-through. Live pass at v3.2.617: real in-app export of an authored
scene (4 waypoints incl. minor, pauses, 2.0x leg, ripple+grow beacons,
labels, circle area highlight, route-guide crowd seed 42 + graph crowd
seed 7) proved BYTE-IDENTICAL reconstructable (sha256 match of blob vs
service-template rebuild); exported page: zero console errors, timeline
equal to the app to the last digit, scrub-return byte-identical canvas,
both crowds rasterising (1,003 + 1,473 tolerance-counted pixels), area
highlight obeying hide-before (0 early / 103,805 fill px late), play
advancing correctly (60 synthetic frames = 1002ms; pane rAF throttling is
environmental). Shell follows UI-STANDARDS: UoN tokens inlined, Carbon
productive controls, 44px targets, focus rings, native range +
aria-valuetext, keyboard transport, visible boot-error state.

**Release:** version bumped 3.1 → 3.2 (AGENTS release rule); GitHub Pages
enabled on `route-plotter` (main, /docs) and v3.2.618 deployed —
**https://djdaojones.github.io/route-plotter/ is live** (player.js served
alongside, so exports work from the live site). The frozen v2 line stays
at router-plotter-02 for existing users. Docs refreshed: README, brief,
architecture, DEV-INFRASTRUCTURE (v3 URL + dual entry points), and the
owner-approved dev-guide reconciliation (§4/§7/§10 mixin split, §9 worker
removal, §3 build:deploy alias — doc-delta ticked). Decision-log archived
by month (2026-06, 2026-04 → archive/, INDEX.md created) per the
owner-approved budget split.

**Scope:** new src/player/{PlayerApp,playerEntry}.js,
tests/playerApp.test.js, pm archive files; HTMLExportService.js rewritten
(−1,270-line template); persistence.js (+_buildProjectSnapshot,
+timingReference), exporting.js (snapshot payload), build.js (player
entry), scenePersistence.test.js (real snapshot binding), package.json
(3.2), docs refresh set. Bundle: docs/app.js −45KB (template player
gone); docs/player.js 138KB min. Phase 5 closes the founding phase plan;
next milestone = post-Phase-4 feature wish-list (anchors, fit-wait,
branch gesture, More… tiering, minors-in-list).

## 2026-08-18 — Phase 4 fifth slice: multi-select everywhere — the hidden bulk mode dissolves

**Task:** Land the last Phase 4 item: multi-select honoured by every
card; the hidden "Select All Waypoints" bulk mode dissolves into
ordinary multi-select; minors included; one undo entry per bulk change.

**What shipped:**

- **Selection is now an app-level set with a primary.** `RoutePlotter`
  carries `selectedWaypoints` (route order) beside `selectedWaypoint`
  (the last-interacted primary); single selection is a one-element set.
  The existing event trio is the only pipeline — `waypoint:selected`,
  `waypoint:multi-selected` (now normalised to route order), and
  `waypoint:deselected` — plus new `waypoint:toggle-select` for
  membership toggles. UIController keeps its gesture Set and gains
  `setSelection()` so app-decided selections (canvas toggle, Cmd+A,
  undo restore, deletes) keep list rows, chip, and shift-range anchor
  coherent without event loops.
- **The bulk mode is gone.** The "Select All Waypoints" list row, the
  "Apply to all?" warning modal, `waypoint:all-selected`,
  `waypoint:all-change`, and UIController's bulk-only control
  listeners are deleted. The app's DOM wiring is now the single writer
  for every selection size: each card handler writes to
  `selectionTargets()` and emits its usual change event once with the
  primary, so a bulk gesture still runs one path recalc, one debounced
  undo entry, one autosave — "one undo entry per bulk change" falls
  out of the existing pipelines rather than a parallel bulk path.
- **Applicability follows the disabled-control rule.** Leg/path
  properties (segment colour/width/style, path shape + params) write
  to minors too — the old `waypoint:all-change` skipped minors, so
  bulk restyles left minor-owned legs inconsistent. Marker, beacon,
  label, pause, speed, and camera targets filter to majors, exactly
  the controls the single-selection UI disables for minors. Label
  *text* stays single-only (hidden in multi). `_updateRippleWaitTime`
  re-times every selected ripple major from its own maxScale.
- **Gestures:** list click/Cmd-click/Shift-click unchanged (the Set
  machinery already existed, but cards ignored it — edits silently hit
  only the primary). Canvas Cmd/Ctrl+click on a waypoint now toggles
  membership (empty-canvas Cmd+click still adds a minor; the mousedown
  path skips select-and-drag under the modifier so the toggle isn't
  collapsed before the click lands). Cmd/Ctrl+A selects the whole
  route **including minors** — the old handler called
  `uiController.selectAllWaypoints()`, a method that never existed;
  the bus swallowed the TypeError, so Cmd+A had been dead. Delete
  removes the whole selection in one pass (one snapshot, one recalc,
  one "N waypoints deleted" announcement, then Route scope). Arrow
  nudges move every selected waypoint by the same canvas delta.
  Right-click on a selection member keeps the selection.
- **Inspector in multi:** cards populate from the primary (the values
  a change will write everywhere) instead of clearing to defaults; the
  chip says "Editing · N waypoints (M minor)" — minors are named in
  the count because the list doesn't show them yet. Chip stepping
  stays disabled in multi. Renderer draws selection rings on every
  member (`renderWaypoints` accepts one waypoint or the set;
  edit-mode-only for minors since minors never render in preview).
- **Undo:** snapshots add `selectedWaypointIds`; `_restoreState`
  re-resolves the set by id and hands it to UIController and
  InteractionHandler — Cmd+Z mid-multi-select keeps the selection, and
  the wish-listed "scope chip stale after undo" quirk is fixed for
  waypoint scopes as a side effect (editor control values after undo
  remain the open half of that quirk).

**Live-verified** at v3.1.610 dev (1680×1000, real events): bulk
segment colour/width hit exactly the selected waypoints, +1 undo stack
entry per gesture, one undo reverted one gesture with selection
intact; Cmd+A chip "Editing · 4 waypoints (1 minor)"; real canvas
cmd+click toggled without adding a minor; real ArrowRight moved the
pair; real Delete removed the pair as one entry and undo brought both
back selected; autosave round-trip across reload; selection-ring
pixel-diffs per waypoint (890/831/345/583 changed px = rings on all
four incl. the minor; unselected neighbours byte-identical — early
all-four diffs were mode/resize transition races in the probe, not
the app); zero console errors. Test-suite: 326/326 (25 new in
tests/multiSelect.test.js — selectionTargets rules, select-all incl.
minors, toggle collapse ladder, bulk delete/nudge, snapshot id
round-trip, headless UIController gestures + chip).

**Feel-check flags for the owner:** Cmd+A now works and includes
minors (invisible in the list until minors-in-list ships); canvas
Cmd/Ctrl+click on a waypoint toggles selection instead of plain
selecting; the "Apply to all?" confirm is gone (undo toast philosophy);
multi cards show the primary's values with no mixed-value indication
yet; dragging a member still moves only that waypoint (group drag
wish-listed).

---


**Task:** Land Phase 4 item 4: network editing as the app's one true tool
mode (backlog: "like polygon draw") — pen gestures on shared
hit-testing, Node card (pass-through/entry/exit), Edge card (direction;
weight shown as computed junction traffic share). Unlocks the Guide
card's "Custom network" option that slice 3 shipped disabled.

**What shipped:**

- New `src/services/NetworkEditService.js` owns tool state (bound
  layer, pen anchor, selection, hover, drag) + the mode banner, on the
  AreaDrawingService pattern: `network:edit-mode-changed` flips
  interception in InteractionHandler; capture-phase keys (Esc /
  Delete / T) keep global shortcuts out. New `src/app/network.js`
  mixin owns transforms, hit-testing, the cards, and the
  undo/autosave/render answer to `network:changed` — the same seams
  the crowds mixin uses.
- **Pen chaining:** click places a node already linked from the pen
  node (successive clicks draw a connected chain, exactly the route-
  drawing feel); click an existing node links pen→node once (loops
  close, duplicates never) and continues from it; click an edge
  selects it and lifts the pen (inspecting is not drawing); Shift
  while placing snaps 15° from the pen node (shared snapToAngle).
  Drag moves a node (Shift snaps vs its first neighbour), bends an
  edge (control point inserted in chain order under the pointer), or
  moves a control handle; drags commit one undo entry at release,
  Esc mid-drag cancels (an inserted bend point is removed).
  Shift-click deletes node/edge/control with the standard undo toast.
  Esc ladder: cancel drag → lift pen → clear selection → exit.
- **Entry/exit:** the Guide select's Custom network option is enabled;
  switching an empty-network crowd auto-enters the mode ("two clicks
  to a pen"), an "Edit network" button re-enters later. Entering
  forces Edit mode through the canonical `_setPreviewMode(false)` —
  found live: the app idles in Preview, where the mode's scaffolding
  layers are gated off. Mode exits on: Done button, Esc, crowd
  deselected (incl. deletion — any waypoint selection deselects the
  crowd), a different crowd selected, guide switched back to route,
  or Preview re-entered.
- **Inspector:** node-scope and edge-scope groups join the one-
  inspector; SectionController's priority is now network > crowd >
  waypoint > route; chip wears the crowd green — "Editing · Node ·
  entry" / "Editing · Edge · one-way" — and re-announces on type/
  direction changes. Node card: Type select + Delete. Edge card:
  Direction, Swap (one-way only; reverses endpoints + control order),
  and Traffic — the weight slider's readout is the computed share of
  departures at each end ("100% · 25% of departures"), never the bare
  weight; the approximation ignores the walk's came-from exclusion.
- **Rendering:** SwarmEngine's per-edge geometry cache went public
  (`edgeGeometry`, was `_edgeGeometry`) so drawing and hit-testing use
  exactly the curve dots travel. Two VECTOR_LAYERS entries:
  `network-guide` beneath flow-layers (edges in the crowd's dot colour,
  one-way midpoint arrows, glyphs entry=triangle / exit=square /
  pass-through=circle, white-outlined) — drawn for any selected
  graph-guided crowd, edit mode only, even with the dots' eye off
  (the eye hides dots, not scaffolding); `network-edit-overlay` above
  hover-affordances (pen ring + dashed preview line, hover/selection
  rings, control handles), ids validated against the live graph so
  stale targets draw nothing.
- **Persistence:** graph edits ride the scene machinery unchanged
  (autosave + undo snapshots since Phase 2). Restores re-bind the mode
  by layer id (`resolveNetworkAfterRestore` beside the crowd resolve in
  `_restoreState`): fresh layer adopted, selection/pen re-resolved by
  id, mode closes only if the layer is gone. CSS note: `.btn`'s
  display rule was defeating the `hidden` attribute (same fix the
  scope groups already carry) — `.btn[hidden]` now wins.

**Verification:** 301/301 tests (28 new in tests/networkEdit.test.js —
service against real models, mixin glue on the crowds-style jsdom
harness). Live at v3.1.607 dev, 1680×1000, real events end-to-end:
guide switch auto-entered (Preview forced to Edit — fix found by pixel
count returning 0 for scaffolding, then verified 3,991 exact-ink px
network-only), pen chained 3 nodes/2 edges by real clicks and closed
the triangle on the first node, banner counts tracked, chip followed
every scope, drag-bend inserted a control point through the real
pointer pipeline, node drag moved and re-anchored, hover gave pointer
cursor + hover state (embedded-browser rAF freeze delays it until a
frame composites — known harness artifact), direction/swap wrote
through with chip re-announce, Cmd+Z mid-mode rebound the fresh layer
with the edge still selected and the swap reversed, Esc ladder walked
pen → selection → exit, passive network stayed rendered after exit,
button re-entered and Done exited, engine walked the custom network
(23 dots mid-timeline; 1,645 exact-colour dot px, byte-identical
across eye toggle), autosave round-tripped the graph across reload
(nodes/edges/types intact), zero console errors, embedded profile
restored to its as-found empty state.

**Design points (owner feel-check welcome):** Node/Edge as the
user-facing nouns (banner, cards, chip alike); auto-enter only when
the switched crowd's network is empty; edge selection lifts the pen;
entry=triangle/exit=square glyph language; chip reuses the crowd
green for network scopes; T cycles node type (waypoint habit);
right-click suppressed inside the mode; Add crowd still requires a
route (network-only scenes wish-listed); Motion card's "At route end"
label reads odd for networks (wish-listed).

---

## 2026-08-18 — Phase 4 third slice: layers strip + Crowd scope — dots flowing in two clicks

**Task:** Land Phase 4 item 3: layers strip above the waypoint list
(Route + crowds: add/rename/visibility), and selecting a crowd switches
the inspector to Crowd scope — Guide / Dots / Release / Motion. Zero
graph UI until Custom network is chosen (network editing is the next
slice, so that option is present but disabled).

**What shipped:**

- New `src/app/crowds.js` mixin owns the whole feature: the strip
  (Route row + one row per crowd — colour swatch, name, visibility eye,
  delete ×, double-click-to-rename), "+ Add crowd", the crowd selection
  events, card syncing, and the single-writer control wiring.
- "Add crowd" creates a route-guided FlowLayer with one Emitter
  (model defaults, but dot colour Okabe-Ito sky blue #56B4E9 so the
  crowd reads instantly against the vermillion route) and selects it —
  dots are flowing on the next play/scrub: click 1 Add crowd, click 2
  play. The button gates on a route existing ("Crowds follow the
  route — draw a route first") because route is the only guide until
  network editing lands.
- Crowd scope joins the one-inspector: `#crowd-scope` group with
  **Guide** (Follow route | Custom network disabled with reason) ·
  **Dots** (colour swatch grid, size, wobble) · **Release** (count,
  window start/length as % of the timeline) · **Motion** (speed in
  img/s, variance, "At route end" lifecycle select). Dots + Release
  open by default. Cards edit the layer's FIRST emitter — the model
  keeps its emitters array; multi-stream authoring is a later tier.
- Scope chip: "Editing · Crowd 1 · crowd", new green tint tokens
  (`--scope-crowd-*`, ≥8:1); crowds sit outside the Route ↔ waypoints
  prev/next step cycle (steppers disable — design point, revisit if
  stepping into crowds feels missing).
- Selection exclusivity through ordinary events: crowd:selected emits
  waypoint:deselected; any waypoint selection emits crowd:deselected;
  Escape backs out of Crowd scope to Route scope. SectionController's
  scope switch is now three-way (crowd > waypoint > route).
- Persistence/undo ride the existing machinery (scene has been in
  autosave + undo snapshots since Phase 2): param edits go through a
  central `crowd:param-changed` (debounced undo + autosave + render,
  mirroring waypoint:path-property-changed); restores re-resolve the
  selected crowd by id (`resolveCrowdSelectionAfterRestore` in
  _restoreState and both load paths); crowd delete is instant with an
  undo toast (same contract as shift-click waypoint delete).
- **Bug found live and fixed:** the `waypoint:deselect` bus handler
  has thrown `this.selectWaypoint is not a function` since the Phase 1
  mixin split (no such method survived; the EventBus swallowed the
  error, so Escape never cleared waypoint selection through this
  path). Now routes through the canonical `waypoint:deselected`
  pipeline — Escape deselection genuinely works.

**Verification:** 274/274 tests (15 new: add/name/gate, strip render +
selection + visibility + delete/toast, scope exclusivity incl. Escape,
restore re-resolution by id, rename commit/cancel + chip re-announce).
Live at v3.1.605 dev, 1680×1000, empty embedded profile restored empty:
add-crowd one-click flow (chip, scope groups, strip), dots at
mid-timeline (59 exact-colour px → eye toggle 0 → 59 byte-deterministic),
all nine controls written through with correct conversions (size 59 →
11,053 px, count → 16,206 px, colour swap 46k green px + row swatch),
rename → chip follows (regression found live, fixed, tested),
delete → toast → undo returns the same layer id, full autosave
round-trip across reload (name/guide/colour/count/size/lifecycle/
window/speed all intact), Escape fix verified in the served bundle.

**Design points (owner feel-check welcome):** new-crowd dot colour sky
blue vs the model's founding orange default (deliberate contrast
choice); crowd rename is double-click-only (no F2/context menu yet);
crowds excluded from chip stepping; Dots + Release open as the crowd
defaults; strip lists crowds in scene order under Route (drag-reorder
and z-order presentation are later work alongside `Scene.moveFlowLayer`).

---

## 2026-08-18 — Phase 4 second slice: canvas affordances — the map answers back

**Task:** Land Phase 4 item 2: hover cursor + ring on waypoints and area
handles; segment hit-testing (hover glow, click selects the owning
waypoint and flashes its Leg card); midpoint "+" handle inserting a minor
on the leg. Modifier gestures unchanged.

**What shipped:**

- New pure-geometry util `src/utils/segmentHitTest.js` (nearest-point
  projection onto the path polyline, waypoint→point-index mapping, leg
  ownership, leg midpoint), unit-tested in isolation. A leg is the span
  between consecutive waypoints of any type — exactly what the
  inspector's Leg card header names, so canvas and inspector teach the
  same rule. `findSegmentAt` on the pointer mixin wraps it with the
  screen→canvas transform and zoom-scaled radii (INTERACTION:
  SEGMENT_HIT_RADIUS 8, LEG_PLUS_HIT_RADIUS 12).
- InteractionHandler grew an idle-hover path: rAF-throttled
  `canvas:hover-move` (+ `canvas:hover-clear` on mouseleave, drag start,
  draw mode), answered in wiringControllers by the same hit-test cascade
  clicks use — area handle → waypoint → leg "+" → leg. Cursor logic
  unified in `_refreshCursor`: modifiers outrank hover (they change what
  a click does), hover shows pointer, else crosshair.
- Render side: `hover` rides renderState; two VECTOR_LAYERS entries —
  `leg-hover` (glow underlay beneath the path: white halo + accent, width
  follows the leg's rendered thickness via the last-major styling rule)
  and `hover-affordances` (two-tone hover ring on waypoints/handles —
  solid, lighter than the marching-ants selection ring; the "+" chip at
  the leg midpoint, enlarged/filled when its own radius is hovered).
  All hover layers gate on edit mode and validate hover against current
  data, so stale hovers after route edits draw nothing.
- Click cascade: plain click that misses waypoints now checks legs
  before falling through to add-waypoint. Leg body → `segment:clicked`
  (select owner + `section:flash` on the Leg card — SectionController
  expands, scrolls, and pulses it; reduced-motion gets a single static
  highlight). Midpoint "+" → `waypoint:insert-on-leg`: minor spliced at
  exactly owner+1 with the midpoint's path coords, so the route shape
  doesn't move; inherits the owner's styling (copy-at-creation), becomes
  the selection (same rule as insert-adjacent); one undo entry via
  waypoint:added. A click within ~8px of the path no longer drops an
  accidental major on top of it — that's the point of hit-testing.
- Modifier clicks (add minor/major, shift-delete, snap) behave exactly
  as before, even over the path.

**Verification:** 259/259 tests (16 new: geometry util + hover layer
dispatch/order). Live at v3.1.604 dev, 1680×1000, embedded profile
(autosave was empty; restored to empty + reload): all three hover types
+ callbacks verified through real mousemove/click events end-to-end —
ring pixels appear/clear byte-identically, leg glow 7.3k px, "+" insert
turned MMmM into MmMmM at index 1 on the exact midpoint with chip
"Editing · minor waypoint", undo/redo exact, leg click selected the
owner + expanded/flashed the Leg card without adding a waypoint, cursor
pointer/crosshair/not-allowed precedence correct, preview mode refuses
hover, hit radii scale at 2.25× zoom. Zero console errors.

**Pre-existing quirks spotted, not touched (wish-listed):** the
`history:undo`/`history:redo` bus emits from InteractionHandler have no
listener (real Cmd+Z lives in playback.js's own keydown handler — two
parallel handlers, one dead emit); the scope chip goes stale after
undo/redo because `_restoreState` re-emits no selection events; area
handle hit-testing (drag, and now hover, consistently) misses at
viewport zoom > 1 — `area:check-handle` compares screen coords against
imageToCanvas outputs.

---

## 2026-08-18 — Phase 4 first slice: scope-split inspector — the sidebar says what it edits

**Task:** Land Phase 4 item 1 (adopted direction "one inspector, explicit
scopes"): markup + wiring only, no model changes.

**What shipped:**

- Scope chip replaces the empty sidebar subtitle: "Editing · Waypoint 2
  'Library' · major" / "Editing · Route" / "Editing · N waypoints" /
  "Editing · All waypoints", colour-tinted per scope (new
  `--scope-waypoint-*` / `--scope-route-*` tokens, ≥7:1), `role=status`
  so scope changes are announced. Prev/next buttons step the selection
  Route → Waypoint 1 → … → last: prev from Waypoint 1 backs out to Route
  scope, ends disable, multi/all modes aren't steppable. Steps emit the
  ordinary `waypoint:selected`/`waypoint:deselected` events.
- Two scope groups in the DOM (`#waypoint-scope` / `#route-scope`);
  SectionController toggles `hidden` on selection change — the
  `settings-disabled` ghost state is deleted outright. With zero
  waypoints the help placeholder now sits above Route scope, so
  Background/Video settings are reachable before the first waypoint
  (previously all sections were hidden).
- Waypoint cards: **Marker** (colour/icon/size) · **On arrival** (beacon
  + ripple/pulse subs, wait time, and the camera zoom block moved in —
  the Camera section is gone) · **Label** (was Text) · **Leg → next**
  (segment colour/thickness/shape/style/speed; the header names the
  ownership rule via UIController — "Leg → Waypoint 3 'Chapel'", or
  "Leg → route end" on the final waypoint) · **Area**.
- Route cards: **Head** (head cluster out of the old Path card; "Arrow
  Style" label → "Style") · **Pacing** (Duration + Scale, moved from the
  right sidebar) · **Reveal** (was Animation) · **Path emphasis** (moved
  from the right sidebar) · **Background** · **Video settings** (was
  Export — the header Export menu keeps the name for actions).
- Right sidebar is now just the Waypoints list — the slot the Phase 4
  Layers strip lands in.

**Design points (owner feel-check welcome):**

- Duration/Scale/Path emphasis now require deselecting (Route scope) to
  reach — deliberate ("the panel edits what's selected"), but it moves
  three much-used controls; flag it if it fights muscle memory.
- Defaults: waypoint scope opens on Marker (as before); Route scope
  opens on Pacing + Background (tune timing / start a project).
- Minor waypoint chip reads "Editing · minor waypoint" (no index) —
  minors-in-list presentation is still the open sub-decision.
- Section state keys renamed (text→label, path→leg, camera→on-arrival,
  animation→reveal, export→video; + head/pacing/path-emphasis): open/
  closed states reset once per browser; stale old keys in localStorage
  are harmless.
- Kept `animation-speed-right` etc. ids through the move — the
  unit/naming pass is already a post-Phase-4 backlog item.

**Design gate:** Carbon accordion + tag/chip patterns; the heuristic
served is recognition-over-recall (scope visible at all times). Chip
fg/bg pairs ≥7:1; nav buttons 44px targets; no colour-only meaning (the
text names the scope); `aria-controls`/`aria-expanded` wiring kept on
all renamed sections.

**Verification:** build + 243/243 tests green; live at v3.1.602 —
scope switch on select/deselect/Escape, chip stepping incl. both
boundaries, leg header naming (rename + route end cases), On-arrival
camera sync, thickness log-scale conversion intact through the moved
Leg card, all-waypoints and multi-select chips, zero console errors.
Embedded-profile autosave backed up and restored byte-identical.

---

## 2026-08-18 — Phase 3.5 shipped: fifteen paper cuts, and the defects hiding under them

**Task:** All 15 items from the authoring-UI review landed (seven
commits, edaa4e1..441d43b + close-out). The notable finds beyond the
review's own list, discovered while fixing its items:

- **Bulk "apply to all" thickness corrupted data** — UIController sent
  the raw 0–1000 slider integer as `segmentWidth`, so bulk writes stored
  e.g. 333 on every major. The log-scale conversion now lives once in
  `src/utils/pathWidthScale.js` (tested), used by both wiring layers,
  which may not call each other (EventBus rule).
- **Bulk edits took no undo snapshot** — the modal's "cannot be undone"
  was literally true. Snapshot added; copy now advertises Cmd+Z.
  (clearAll still doesn't snapshot — wish-listed, copy there is honest.)
- **labelPosition had no single-selection wiring at all**; the select
  did nothing. Wired in the DOM layer like its label siblings.
- **F2 rename targeted a detached row** (selection rebuilds the list);
  the extracted `startRenameFor` defers a frame and re-finds the row.
- **The T key was dead** — `waypoint:toggle-type` had no handler. Real
  handler written for the context menu (guards the last major,
  recalculates duration); renames now undo-snapshot too.
- **Reorder never invalidated `_majorWaypointsCache`** (index-derived
  positions went stale) and took no undo snapshot — fixed with the
  minor-carry data bug.
- **Duration readout mechanism found** (the 8.6s vs 7.7s VERIFY item):
  preview-only tail time (trail fade + 500 ms handle) was counted for
  every scene with `pathTrail > 0`, but trails render only in comet
  mode. Tail is now gated on comet; edit == preview for non-comet
  scenes (verified live 7080 == 7080 ms on identical data). Comet keeps
  its genuine preview extension (7080 → 8396 ms) — open design point
  for the Phase 4 Pacing card: label that extension rather than hide it.

Verified live at v3.1.599, 1680×1000, owner autosave backed up and
restored byte-identical. 243/243 tests.

## 2026-08-18 — Phase 3.5 kickoff: the review's open sub-decisions resolved

Four of the five open sub-decisions from the authoring-UI review entry
(below) resolved by the owner at Phase 3.5 kickoff; the fifth (how
minors present in the waypoint list) stays open — it gates a
next-milestone item, not this phase.

- **Sequencing: Phase 3.5 fully precedes Phase 4.** All 15 paper cuts
  land now — they are small, independent and individually verifiable,
  and the inspector rewrite then starts from a clean base. Most are
  logic-level (listeners, bus handlers, model fields) and survive the
  Phase 4 markup regroup.
- **Path head is global.** Matches what users already see (UI and
  renderer are global) and the adopted Phase 4 layout, which puts Head
  at Route scope. The dead per-waypoint fields stop being written;
  loads tolerate them. Rejected per-waypoint: more work, contradicts
  the adopted direction.
- **Shift+click delete keeps no confirm — undo toast.** Delete stays
  instant; a toast advertises Cmd+Z. The undo service already covers
  deletion; a dialog would punish every intentional delete.
- **"Crowd" is the user-facing noun** for dot layers ("Editing ·
  Crowd", Crowd scope). Internal names (`FlowLayer`, `flow-layers`
  registry entry, `scene` block) are unchanged — code vocabulary is
  not user vocabulary.

## 2026-08-18 — Authoring-UI review: "one inspector, explicit scopes" adopted for Phase 4

**Task:** Pre-Phase-4 deep review of the authoring UI (path/waypoint styling
focus) and how crowd authoring folds in. Full write-up — findings, verified
bug table with file:line refs, before/after sidebar mockups, method — at
<https://claude.ai/code/artifact/9553ea85-5c61-4d69-b98c-19f74437f480>
(reviewed at v3.1.593: hands-on live pass at 1680×1000 against the owner's
real autosave, backed up and verified byte-identical after, plus a full
wiring trace of index.html, SectionController, UIController, editorPanel,
wiringDom/wiringControllers/wiringBus, InteractionHandler, and the
rendering/area services).

**Headline finding:** scope is invisible. The left sidebar edits three
different things — the selected waypoint (Marker/Text/most-of-Path/Area/
Camera), the whole route (head cluster, Background, Animation, Export), and
a hidden all-majors bulk mode — with no labelling anywhere. The Path card is
the worst case: per-segment controls sit beside route-global head controls,
and the head disagrees three ways (per-waypoint in the model, global in UI
and renderer). Segments have no hit-testing, so "which waypoint owns this
line" is learnable only by experiment; the subtitle element that could
announce scope renders an empty string in single selection. Secondary
findings: the good copy-at-creation inheritance model is invisible,
irreversible and non-retroactive; modifier-only gestures with a dead
right-click; unit/naming drift ("Arrow Style" configures a head that can be
a dot; readouts mix real units, abstract scales and one raw slider int).
Verified paper-cut bugs — including one DATA bug (major reorder detaches
minors) — are itemised as backlog Phase 3.5.

**Direction adopted (backlog Phase 4 rewritten):** the sidebar becomes an
inspector for the current selection, opening with a scope header that always
names its subject — "Editing · Waypoint 2 'Library' · major" / "Editing ·
Route" (replacing the settings-disabled ghost state) / "Editing · Crowd".
One rule the user learns once: the panel edits what's selected — waypoint,
route, crowd layer, node or edge. Key moves: cards regroup by subject
(Marker / On arrival / Label / "Leg → next waypoint" / Area for waypoints;
Head / Pacing / Reveal / Background / Video settings for the route); the Leg
card names the segment-ownership rule in its own header (the Camera
prev/this/next idea, generalised); inheritance stays copy-at-creation but
gains per-card "Reset to route style" / "Apply onward"; bulk mode dissolves
into ordinary multi-select. Crowd authoring lands as one more scope on the
same skeleton: Layers strip above the waypoint list, Follow-route as the
two-click default guide, network editing as the app's one true tool mode on
shared pen services, edge weights displayed as computed junction traffic
shares. Anchors (node↔waypoint drops, emitter windows resolved through
PlayerCore's pure mappings) and "fit wait to crowd" (bake, don't bind —
route timing never becomes a live function of swarm state) are post-Phase-4
backlog items.

**Deliberately kept:** the section system and persisted open/closed state,
the existing contextual-disclosure patterns, the Okabe-Ito-only constraint,
copy-at-creation inheritance (made visible, not replaced), the keyboard map,
the waypoint list's reorder/rename mechanics.

**Open sub-decisions (owner's call):** "Crowd" vs "Flow" as the
user-facing noun; shift-delete = undo-toast vs confirm; how minors present
in the list; whether Phase 3.5 fully precedes Phase 4 or interleaves;
path-head resolution (global vs per-waypoint — Phase 3.5 item forces the
choice).

**Session hygiene note:** the review's dev-server run regenerated docs/ and
bumped version.json; those side effects were reverted, not committed.

---

## 2026-08-18 — Phase 3 swarm engine: deterministic SwarmEngine + batched DotRenderer

**Task:** Phase 3 of the v3.0 refactor — dots flow while everything stays a
pure function of timeline time (backlog Phase 3; behavioural spec carried
from the salvaged fork suites, tick() API superseded per 2026-08-17).

**Shipped:**
- `src/services/SwarmEngine.js` — `evaluate(timelineMs, layer, context)`
  recomputes every dot from scratch each call: no stored dot state, no
  call-order sensitivity (pinned by test: t₂-after-t₁ == t₂ on a fresh
  engine). Variation comes from `hash(seed, dotIndex, hopIndex)` — FNV-1a
  combine + murmur3 fmix32 finaliser, offset-basis-seeded so seed 0 still
  mixes; exact outputs are test-pinned because changing the hash would
  silently restyle every authored scene.
- Onset model: dot i of N takes centred slot (i+0.5)/N across the release
  window; `onsetVariance` linearly blends slot → uniform draw (0 = even
  metronome, 1 = fully scattered — dotCount stays an exact promise);
  `intensityRamp` biases via power curve (u^(1/(1+r)) back-loaded,
  u^(1-r) front-loaded). Overhanging windows clip at evaluation, as the
  Phase 2 model promised.
- Graph walk: hop 0 picks the entry (uniform over `type:'entry'` nodes;
  a graph with no explicit entries falls back to any node with a way
  onward, so console/authoring experiments flow immediately); each
  junction consumes one hop index, choosing among traversable edges
  (one-way honoured, two-way walkable both directions) proportional to
  edge weight; the arrival edge is excluded unless it is the only option
  (anti-ping-pong); a dead end behaves as an exit. Walks are capped at
  2048 hops per dot per evaluation (beyond it the dot parks) to bound
  frame cost.
- Lifecycles at an exit: `disappear` ends the dot; `collect` parks it on
  the exit node; `respawn` teleports to a freshly hashed entry and keeps
  walking (the walk is one infinite deterministic edge sequence);
  `loop` replays the dot's own first journey cyclically (distance modulo
  journey length). On a route guide, respawn and loop coincide (single
  path, wrap by length).
- `wobble`: perpendicular sine displacement, phase a pure function of
  distance travelled (amplitude ≤ 2% of the image at wobble 1, per-dot
  frequency/phase hashed); parked dots don't wobble.
- Per-edge geometry: one PathCalculator instance per edge (backlog), the
  polyline cached against a signature of node positions + control points,
  so authoring edits invalidate exactly the edges they touch (test-pinned
  mid-edge). Corner-slowing spacing is deliberately kept: dots ease
  through sharp corners with the hero head's motion language.
- `src/services/DotRenderer.js` + a `flow-layers` entry in
  `RenderingService.VECTOR_LAYERS` between `area-highlights` and `path` —
  beneath the hero route per the founding decision, above the area
  spotlight so dots stay bright like the path does. Dots batch into one
  canvas path per (colour, size) group; radius =
  `scaleSizeClamped(dotSize × 10)` reference px. renderState gains
  `scene` + `swarmEngine`; the engine reads `animationEngine.getTime()`
  and `state.duration`, so scrub, play, reverse and export all see the
  same dots by construction.

**Verification:** 234/234 tests (was 204; 30-test swarmEngine suite
covering the salvaged fork spec re-expressed against evaluate()).
Live pass at v3.1.591 on the owner's real autosave (backed up first,
restored byte-for-byte after, reload confirmed 3 waypoints / 0 flow
layers): console-authored 4-node graph (weighted 3:1 fork, one curved
edge) + sky-blue respawn stream + orange mid-timeline collect burst;
toggling the layer changed canvas pixels by +1550 blue / +2011 orange
(dots demonstrably rasterise beneath nothing-else-changed frames);
seek 4000 → 7500 → 500 → 4000 reproduced a byte-identical canvas hash;
playback advanced with the burst visibly travelling; zero console
errors.

**Scope:** new SwarmEngine.js, DotRenderer.js, swarmEngine.test.js;
RenderingService.js (import + registry entry), main.js (engine instance +
renderState), services/index.js barrel, vectorLayers.test.js order pin.
Phase 4 (authoring UI) is next; Phase 5 wires the HTML-export player.

---

## 2026-08-18 — Phase 2 scene model: Scene/FlowLayer/Emitter land, saves go to coordVersion 9

**Task:** Phase 2 of the v3.0 refactor — the layered-scene data model and
additive save/load (backlog Phase 2; founding + salvage entries 2026-08-17).

**Shipped:**
- `src/models/Emitter.js` — one dot stream's authored parameters plus its
  per-emitter seed. Full founding vocabulary: dotCount, speed,
  speedVariance, dotSize, dotColor, lifecycleMode
  (disappear/respawn/loop/collect), releaseStart/releaseDuration,
  onsetVariance, intensityRamp, wobble. Zero transient state — dots are
  computed by the Phase 3 engine as a pure function of
  (timelineMs, layer, seed) and never stored.
- `src/models/FlowLayer.js` — guide network + emitters. `guideType`
  'graph' | 'route' (hero route reused as a guide, per the founding
  decision); a layer always owns its GraphModel so switching guide type
  never loses data. This is the salvaged GraphModel's first wiring.
- `src/models/Scene.js` — ordered flow layers (index 0 bottom; all flow
  layers draw beneath the hero route); CRUD, reorder, clear. The hero
  route stays `RoutePlotter.waypoints` — the Scene model carries flow
  layers only.
- Persistence: coordVersion 7→**9** (8 skipped — the fork's graph-only
  saves used it). v9 = the v7 shape + an additive `scene` block; pre-v9
  saves load unchanged with an empty scene (MIN_COORD_VERSION stays 6).
  Scene is cleared by `clearAll()` and included in undo snapshots, so
  Phase 4 editing gets undo by construction.

**Decision — emitter timing is an onset window on the master timeline**
(owner's call, 2026-08-18, over fork-style free-running releasePeriod and
over "whole timeline only"). Each emitter's dots onset within
releaseStart/releaseDuration; default window = the whole timeline. All
candidate parameterisations were determinism-safe — the mandate constrains
evaluation, not vocabulary — so the window won on expressiveness
(mid-animation crowd arrival) and on dotCount being an exact promise
rather than a rate-dependent cap.

**Decision — the release window is normalised (0–1 fractions of the
timeline), not milliseconds.** Timeline duration is derived (route length
÷ speed, plus pauses) and shifts constantly during authoring; absolute
windows would drift out of range. Both fields clamp independently; an
overhanging window (start + duration > 1) is kept as authored and clipped
by the engine at evaluation time.

**Decision — full founding vocabulary in v9 from day one** (owner's call
over a fork-proven-fields-only format). onsetVariance/intensityRamp/wobble
are persisted now with defaults; Phase 3 may refine ranges but not names.
Adding defaulted fields later stays legal within v9 if the engine needs
more (e.g. a wobble frequency).

**Verification:** 204/204 tests (was 158) — four new suites: Emitter,
FlowLayer, Scene, and a scenePersistence contract suite that binds the
persistence/undo mixins to a fake app and pins the additive-format rules.
Live browser pass at v3.1.589: the owner's real v7 autosave upgraded to
v9 in place (3 waypoints intact, empty scene block added); a
programmatically authored scene (graph + seeded emitter, mid-timeline
window) survived autosave → reload as real model instances with exact
params; no console errors; the owner's autosave was backed up first and
byte-for-byte restored after the test.

---

## 2026-08-17 — PlayerCore teardown: the scene is now a pure function of timeline time (Phase 1 complete)

**Task:** Phase 1 item 3 — PlayerCore extraction + deterministic
animation-core teardown + scrub-vs-play golden-frame harness.

**Decision — PlayerCore owns all timeline math.** New `src/core/PlayerCore.js`
(pure, no wall-clock, no mutation): segment building, pause building, beacon
schedules, and the timeline↔path mappings. AnimationEngine keeps its public
surface (setSegmentMarkers/setPauseMarkers/timelineToPathProgress/
pathToTimelineProgress and the marker fields the HTML export serialises —
shapes unchanged) but every mapping delegates to PlayerCore; the engine's
remaining jobs are transport state and wait-event edge-detection
(`_applyWaitState`). Play advances time, scrub sets it, export steps it —
one evaluation path.

**Decision — beacon phases are closed-form.** Every animator's
`update(deltaTime, phase, …)` accumulation (plus the `_lastHoldTime`/
`_lastLoopTime`/pauseElapsed sync hacks) is replaced by
`sync(localSec, win, options)`: full visual state derived from the beacon's
local clock `timelineMs - clockStartMs`, where clock starts and hold windows
come from PlayerCore's per-waypoint schedules (`engine.beaconSchedules`).
Consequences: reverse playback and backward scrubbing render beacons exactly
(rings un-fade, completed beacons revive); pulse's exit-crossing is computed,
not frame-detected; ripple ring state rebuilds per evaluation.

**Decision — grow pauses are exact, runtime extension deleted.** One
early-onset formula (`PlayerCore.beaconEarlyOnsetMs`: lead capped by the
half-gap to the previous major) feeds BOTH the pause budget and the beacon
schedule, so the scale-down always completes inside the precomputed pause.
The `isGrowBeaconAnimating` hook, the mid-evaluation marker mutation /
`timeShiftApplied` machinery, and the interim export fixed-frame-delta patch
(+ its test) are all deleted. The export render-loop gate stays as a plain
perf optimisation.

**Known behaviour deltas (deliberate):** grow early-onset now uses exact
path-times with a half-gap-to-previous-major cap (the engine and renderer
previously used two *different* approximations — the drift the 750ms buffer
papered over; buffer retained as visual margin). Ripple pause budgets read
`rippleMaxScale` (the value the rings actually use) rather than the stale
`beaconScale`. `pathToTimelineProgress` now includes start-handle/intro
offsets, making it a true inverse under export handles and reveal intros.
Pulse under hide-before begins its loop after its full 2-quarter onset
(previously desynced by one quarter). Per-frame SegSpeed/Timeline debug
traces were dropped with the duplicated math; `dumpSegmentState()` remains.

**Verification:** `tests/goldenFrames.test.js` — sequential jittered playback,
reverse traversal, and fixed-step export stepping each equal direct seeks in
full scene state (path + waits + every beacon field); evaluation provably
never mutates the timeline; grow completes by pause end; backward scrub
revives beacons byte-identically. `tests/playerCore.test.js` pins builders,
budgets, windows, and inverse mappings. 158/158 tests; ESLint sweep clean.
Live in the throttled pane: seek-into-beacon renders mid-animation state,
end-and-back round-trip identical, reverse JKL un-fades rings, and a 105-frame
MP4 exported clean at 1.1fps (fully throttled) with zero console errors and
no interim patch.

**Scope:** new `src/core/PlayerCore.js`; `AnimationEngine.js` (−~350 lines),
`BeaconRenderer.js` (all five animators + service update), `RenderingService.js`
(timeline-time beacon sync; fixed-delta machinery removed), `exporting.js`,
`playback.js`, `main.js` (hook removal); tests: goldenFrames + playerCore
added, exportFrameDelta removed (superseded).

---

## 2026-08-17 — Export slowdown when browser inactive: fixed-frame-delta interim fix

**Task:** Owner report — video export "encodes weirdly (slowed animation)"
unless the browser stays active during export.

**Mechanism (confirmed in code + live):** the export loop itself is
deterministic — `seekToProgress(progress)` per frame with explicit WebCodecs
timestamps — but `RenderingService.renderBeacons()` advanced beacon animators
by **wall-clock delta between renders**. Foreground encodes only looked right
because the loop happens to run near real-time; in a background tab the
loop's `setTimeout` yields stretch to ~1s, advancing beacon phases ~25x per
encoded frame, and grow-beacon pause extension (driven by those same clocks)
mutates the progress→time map mid-export — the hero motion stretches through
the extended sections. Exactly the stateful-animation defect class from the
founding entry, showing up in encodes.

**Decision — pin beacon time to encoded-frame time during export.**
`RenderingService.setFixedFrameDelta(seconds)`: when set, beacon updates
advance by exactly that delta per rendered frame (export sets 1/frameRate,
clears to wall-clock in the export `finally`; unpinning re-arms the
wall-clock tracker so the first live frame never inherits an export-length
delta). Because fixed-delta renders are time-advancing, the AnimationEngine
update callback now skips rendering while `_isExportMode` — the export loop
owns rendering (previously duplicate renders were harmless only because
wall-clock deltas are render-count-independent).

**Interim, not the fix:** the PlayerCore teardown still replaces accumulation
with closed-form beacon phases; this patch (and its `_isExportMode` render
gate) should be removed as part of that work — noted on the backlog item.

**Verified live in the throttled in-app browser** (unfocused pane = the
failing environment): 75-frame MP4 export completed; all 76 beacon updates
during export received exactly 0.100s (1/10fps), none wall-clock — proving
both the pin and the render gate; post-export preview resumed on the 0.016s
bootstrap. `tests/exportFrameDelta.test.js` pins the selection logic
(145 tests total).

**Scope:** `RenderingService.js`, `src/app/exporting.js`,
`src/app/playback.js`, `tests/exportFrameDelta.test.js`.

---

## 2026-08-17 — Phase 1 enabling refactor: main.js mixin split + renderer layer registry

**Task:** Phase 1 items 1–2 — split the 6,235-line `main.js` and formalise
the vector draw order — as groundwork for the PlayerCore teardown (item 3).

**Decision — prototype mixins, not class inheritance or delegation.** Twelve
method groups moved verbatim into `src/app/*` modules, each exporting a plain
object attached by `Object.assign(RoutePlotter.prototype, …)` at the bottom of
`main.js`: wiringDom, wiringBus, wiringControllers, undoRedo, playback,
camera, viewport, pathTiming, persistence, exporting, editorPanel, pointer.
`main.js` (6,235 → ~1,120 lines) keeps only the app core: constructor, init,
model bookkeeping, render scheduling, image loading, destroy. `this` semantics
and the runtime prototype shape are unchanged (bundle grew 214 bytes — module
wrappers only). Constraint this creates: **method names must stay unique
across all mixins** (last-write-wins otherwise) — `tests/mixins.test.js`
fails loudly on a collision.

**Deviations from verbatim (all deliberate):** `static JKL_MAX_SPEED` became
a module const in `playback.js` (statics cannot ride a prototype mixin);
`snapToAngle()` moved to `src/utils/snapToAngle.js` (needed by two wiring
mixins; unit-tested); per-file imports trimmed to what each file uses.

**Decision — vector draw order is data, not code.** The hard-coded sequence
in `RenderingService.renderVectorLayerTo()` became the static
`RenderingService.VECTOR_LAYERS` registry (bottom → top: area-highlights,
path, path-head, beacons, waypoints, area-edit-handles, area-draw-preview).
Each entry guards its own visibility; shared per-frame derivations ride a
`frame` object. Phase 2 flow layers (swarms beneath the hero route) insert by
adding an entry between area-highlights and path. `tests/vectorLayers.test.js`
pins the order and the ALWAYS_HIDE guards.

**Verification:** build + 142/142 tests (11 new); one-off ESLint no-undef
sweep over `src/` clean (the two remaining warnings are pre-existing unused
locals, left verbatim); interactive in-app-browser pass — waypoint add/drag,
play/scrub, JKL (L×3 → 4x, J reverse, K reset-on-pause), undo/redo exact
position round-trip, zoom-to-waypoint, Edit/Preview toggle, autosave reload —
zero console errors. Two environment findings worth keeping: the embedded
browser throttles rAF when unfocused, freezing the engine clock between
forced frames (confirms the delta-time accumulation the PlayerCore teardown
exists to kill), and keyboard shortcuts are correctly swallowed while a
slider (e.g. `#timeline-slider`) holds focus — test keys with body focus.

**Scope:** `src/main.js`, new `src/app/*` (12 files), `src/utils/snapToAngle.js`,
`src/services/RenderingService.js`, `tests/mixins.test.js`,
`tests/vectorLayers.test.js`, README tree/orchestrator note. v3.1.580+.

---

## 2026-08-17 — Dot-crowd salvage: recovered fork state, GraphModel landed, coordVersion goes to 9

**Task:** Before archiving dot-crowd-navigator, verify the local OneDrive
working copy held nothing unpushed (founding-entry gate).

**Finding:** It held a lot. The fork's last local state (2026-05-03, never
pushed) was a working standalone graph editor — clean ~700-line app shell,
GraphModel/GraphRenderer/GraphInteractionHandler/GraphUIController, JSON
save/load with graph-only autosave at coordVersion 8, zoom/pan, undo — plus
Phase 2 core: SimulationState (9 tests), SwarmEngine (7 tests, weighted
routing, 4 lifecycle modes), DotRenderer, and sim controls UI. OneDrive
file-offloading (~2026-07-14) then destroyed most of `src/`. Recovered:
tracked files from git; newer files from Windsurf local-history snapshots.
Unrecoverable (agent-written, no history entries): SwarmEngine.js,
SimulationState.js, DotRenderer.js, GraphUIController.js — their test
suites survive. Full story: SALVAGE-NOTE.md in the archived fork.

**Decision — carried into v3 now:** `GraphModel.js` + its 25 tests land in
src/models/ and tests/ (unwired until Phase 2, same treatment as
GraphNode/GraphEdge — total graph tests now 62). Fork memory, the two
swarm test suites, and the recovered graph-editor source are archived under
`specs/dot-crowd-navigator/` as Phase 2–4 reference.

**Decision — tick() API superseded, behaviour retained.** The recovered
SwarmEngine tests specify a stateful `tick(deltaMs)` engine — exactly the
architecture the deterministic-timeline mandate forbids. v3 carries the
*behavioural* spec (release scheduling, weighted junction choice, lifecycle
modes disappear/respawn/loop/collect, normalised dot positions) into the
pure `evaluate(timelineMs, layer)` design; the tick-based tests are kept as
reference only, not ported as-is.

**Decision — coordVersion for the layered scene is 9, not 8.** The fork's
local builds already shipped a *different* coordVersion 8 (graph-only JSON,
clears v≤7 data). v3 skips 8 entirely to keep the number unambiguous:
7 = current route-only, 9 = layered scene (routeLayer + flowLayers).

**Repo state:** dot-crowd-navigator final state pushed (as-found +
restoration commits) and the repo archived; router-plotter-01 archived.
router-plotter-02 stays live as the frozen v2 line.

---

## 2026-08-17 — Route Plotter v3 founding: fresh repo, dot-crowd fold-in, deterministic-timeline mandate

**Task:** Owner-commissioned review of router-plotter-02 (mature) vs
dot-crowd-navigator (nascent) to decide whether the dot-swarm concept folds
into the route-plotter line, and to found the v3 refactor.

**Finding that reframed everything:** git history proves dot-crowd-navigator
is router-plotter-02 copied at v3.1.530 (2026-04-12) — a rename plus two
unwired model classes (`GraphNode`, `GraphEdge`, 232 LOC, 37 passing tests)
and spec docs. The swarm was never built. "Merge the apps" therefore means
"build the swarm feature inside this codebase, guided by the fork's spec".
Verdict from adversarial cross-review: viable; conflicts are sequencing
risks, not incompatibilities.

**Decision — v3 is this fresh-history repo (`route-plotter`).** Imported
router-plotter-02 @ v3.1 build 573 (commit 5b19787) as the initial commit.
router-plotter-02 keeps its name and stays frozen as the v2 line, so the
deployed v2 Pages URL (djdaojones.github.io/router-plotter-02/) keeps
working while v3 matures. dot-crowd-navigator and router-plotter-01 will be
archived on GitHub after cherry-picking, gated on a diff of the local
OneDrive working copies to confirm no unpushed work (the fork's overview doc
references a `Migration.md` and a more advanced state that exist nowhere on
GitHub).

**Decision — supersedes dot-crowd AGENTS.md "no linear routes" invariant.**
The fork's spec forbade Waypoint/linear-route abstractions; v3 explicitly
adopts a coexistence model instead: a **layered scene over one master
timeline** — the existing Waypoint chain remains the narrative "hero route"
layer, and new **flow layers** (guide networks built from the ported
GraphNode/GraphEdge, or the hero route reused as a guide) carry emitters
with the fork's swarm vocabulary (count, release window, onset variance,
speed variance, intensity ramp, wobble, lifecycle). The fork's spec docs are
archived under `specs/dot-crowd-navigator/` as the feature-vocabulary source.

**Decision — deterministic-timeline mandate (animation-core teardown).**
Owner reports v2 scrubbing sometimes disagreed with real-time playback and
requested a total teardown. Review confirmed the mechanism class:
`BeaconRenderer` animators accumulate `this.time += deltaTime` with
pause-sync/monotonic-hold hacks, and Grow beacons mutate timeline duration
at runtime (`isGrowBeaconAnimating` dynamically extends pauses) — so
duration is not a pure function of project state, and seek and play can
diverge. Mandate for all v3 work: **the scene is a pure function of
(timelineMs, projectState, seed)** — no wall-clock or delta-time
accumulation in any renderer; beacon phases become closed-form functions of
time-since-trigger; grow-beacon pause extension is precomputed into the
timeline, never applied mid-flight; play = advancing time, scrub = setting
time, export = stepping time, all through one evaluation path (the
`PlayerCore` extraction). The swarm engine inherits the same rule
(`hash(seed, dotIndex, hopIndex)` for per-dot variation), which makes video
export, scrubbing, reverse JKL, and undo correct by construction.

**Phases (backlog holds the living copy):** 0 stabilise (lockfile tracked,
es2022 esbuild targets, bundle JSZip, PM-Skills 4.7.0) → 1 enabling refactor
(main.js split, renderer layer registry, PlayerCore + timeline teardown) →
2 scene/flow-layer model (coordVersion 8) → 3 deterministic SwarmEngine +
batched DotRenderer → 4 authoring UI (first canvas tool-mode: Route/Flow,
Crowd sidebar section, graph gestures) → 5 HTML-export parity via
PlayerCore, docs, deploy.

**Scope:** pm_skills upgraded v2.3.0 → 4.7.0 (fresh install, v2 project
memory ported forward); GraphNode/GraphEdge + tests cherry-picked verbatim;
fork's AGENTS.md + overview archived to specs/dot-crowd-navigator/.

---

<!-- FILE: pm_skills/project/archive/trajectory/trajectory-0001-2026-04-16-to-2026-06-17.md -->

# Trajectory — archived epoch: v2-line era (2026-04-16 → 2026-06-17)

<!-- Archived from trajectory.md on 2026-08-27 (memory prune). Verbatim.
     Work shipped in the router-plotter-02 line before the v3 founding. -->

## Path glow + casing parity (shipped 2026-06-17)

- Path glow (Next-milestone feature) — an optional soft, per-segment-coloured halo beneath the path casing, surfaced via a new "Path emphasis" fieldset (Path casing + Path glow toggle + intensity slider). Renders in preview, the animated head segment, and the HTML-export player → MP4/WebM/HTML parity; off by default, round-trips through autosave + project save/load + undo/redo. Layered additive underlay computed by the pure `RenderingService.glowLayers()` (unit-tested). See decision-log 2026-06-17.
- HTML-export casing parity (bonus) — `showPathCasing` was never in the export payload, so the casing toggle was silently ignored in HTML exports (casing always drew); added alongside `pathGlow` so HTML export now matches preview. See decision-log 2026-06-17.
- Casing constants (fold-in) — the white casing colour + extra-width literals are now `RENDERING.PATH_CASING_COLOR` / `PATH_CASING_EXTRA_WIDTH` (no value change).

Outcome: paths can carry an optional soft halo for legibility on busy maps, consistent across preview and all exports; the casing toggle now also applies to HTML export. v3.1.563, build + 66 tests green (6 new `glowLayers` tests).

## Diagnostics hygiene — console spam gate (shipped 2026-06-17)

- Console spam gate (Next-milestone item) — the 7 verbose segment-speed `console.log` diagnostics in `AnimationEngine` are now `console.debug`, so variable-speed playback no longer floods the 500-entry console ring buffer or the Download/Copy Debug Log export (verbose is hidden by default; the interceptor captures only log/warn/error). See decision-log 2026-06-17.

Outcome: the Debug Log export stays clean during variable-speed playback; diagnostics remain available at the DevTools verbose level. v3.1.562, build + 60 tests green.

## UI polish — undo verified + header reflow fixed (2026-06-17)

- Undo granularity (Current-milestone item) — the "undo snaps at too-fine increments" report was investigated and the mouse-drag path already collapses a drag to one undo entry (mid-drag saves suppressed via `isDragging`; one save on `drag-ended`). Verified working with the user; closed with no code change. See decision-log 2026-06-17.
- Edit/Preview header reflow (Current-milestone item) — fixed: the cause was `.mode-label.active` going `font-weight` 500→600 (not the warning, which is out-of-flow), widening the active label and shifting the header on every toggle. Dropped the weight bump; active state still reads via bg + colour + shadow. CSS-only, v3.1.561. See decision-log 2026-06-17.

Outcome: one UI-polish item closed as already-correct, one root-caused and fixed (CSS-only, build + 60 tests green); Current milestone now has only the blocked reflow-breakpoint item.

## UI polish — sidebar calmness (shipped 2026-06-17)

- Waypoint list calmness (item 4) — rows are calm at rest (colour dot + name); the drag handle, ▲/▼ reorder buttons, and delete reveal on hover/`:focus-within` (keyboard-reachable), and the reorder buttons grew from 24×16 to 24×22 px. See decision-log 2026-06-17.
- Swatch picker compaction (item 3) — colour chips shrank from filling the cell to 32px tall, lightening the three pickers while the 44px cell stays the tap target (AAA floor). The bigger popover redesign is parked in the Icebox. See decision-log 2026-06-17.

Outcome: the colour pickers and waypoint list read lighter and calmer; all controls stay keyboard-operable. CSS-only, build + 60 tests green; visual confirmation pending.

## UI polish — export inclusion + reduced motion (shipped 2026-06-17)

- Export "Include in export" group — the Export "Included" select plus the camera/text checkboxes are now one Carbon fieldset of three checkboxes (background image / camera movement / text labels); the image toggle persists immediately and syncs on project open, and rows are ≥44px AAA targets. See decision-log 2026-06-17.
- Reduced motion for beacons (glow) — `glow` joins `pulse`/`ripple` in the `prefers-reduced-motion` skip, so no continuous/multi-second beacon animation plays; brief one-shot `pop`/`grow` remain. See decision-log 2026-06-17.
- Keyboard waypoint reorder — verified already shipped (▲/▼ buttons with aria-labels, boundary `disabled`, screen-reader `announce()`); the residual <44px move-button target size migrated to the "waypoint list calmness" backlog item.

Outcome: the milestone's export-toggle thread is consolidated into one coherent group, reduced-motion now covers every continuous beacon, and the keyboard-reorder item is confirmed done. Build + 60 tests green.

## Dev runtime hardening (shipped 2026-06-17)

- Maintainer scripts — `scripts/restart.sh` (clean restart/boot with an HTTP-200 readiness poll) and `scripts/build.sh` (one-shot rebuild, `--test` also runs the suite), tracked wrappers that supersede the untracked `_Joe/` helper. See decision-log 2026-06-17.
- Dev server survives OneDrive watch churn — `build.js` static-file `fs.watch` now has an error handler + try/catch copy, so OneDrive inode swaps no longer crash the dev server (exit 1); the serve log prints the real `localhost` host. See decision-log 2026-06-16.
- restart.sh orphan fix — restart/shutdown now stops the whole dev tree (the port-3000 esbuild listener **and** its `node build.js --watch` parent), so no orphaned watcher accretes across restarts. See decision-log 2026-06-17.

Outcome: one documented, verified command (`./scripts/restart.sh`) reaches a known-good running state and tears it down cleanly — no OneDrive-sync crash, no orphaned watchers — satisfying the one-command-runtime-recovery invariant.

## Interactive control colour + contrast (shipped 2026-06-16)

- Slider and switch colours — sliders, switches, the timeline, and checkboxes now use a `--control-accent` token (UoN dark blue `#003A65`, not black), with a `body` accent-color so no native control falls back to the UA default. See decision-log 2026-06-16.
- Border role separation — interactive elements (slider/timeline rails, toggle off-state, segmented/mode-switch containers, the repaired `--border-control` token) carry a ≥3:1 non-text boundary via `--border-interactive`; passive dividers stay decorative. Also fixed the selected Edit/Preview segment's near-black-on-navy text. See decision-log 2026-06-16.

Outcome: controls read as UoN blue not black, interactive boundaries meet WCAG 1.4.11 (3:1), and the active Edit/Preview tab is legible; normal text stays black, Okabe-Ito map palette untouched. CSS/token-only (v3.1.544).

## Camera zoom fix (shipped 2026-06-16)

- Camera zoom drops to 1x at minor waypoints — zoom now keyframes over *major* waypoints only (minors shape geometry, not zoom), in preview, MP4/WebM, and HTML export. See decision-log 2026-06-16.

Outcome: two 4x majors either side of a minor hold ~4x across it; minors no longer inject a 1x keyframe.

## Export options (shipped 2026-06-16)

- Export without camera + Export without text — two persisted Export-section checkboxes (checked by default) that drop the follow-cam and/or waypoint labels from preview, MP4/WebM, and HTML export. See decision-log 2026-06-16.

Outcome: exports can omit camera movement and/or text labels; toggles reflect live in Preview and round-trip through autosave and project save/load.

## Path styling (shipped 2026-04-16)

- Path casing toggle — global right-sidebar switch to turn off the white path outline. See decision-log 2026-04-16.

Outcome: white path casing is now a global on/off style (defaults on for backward compatibility).

<!-- FILE: pm_skills/project/archive/trajectory/trajectory-0002-2026-08-17-to-2026-08-19.md -->

# Trajectory — archived epoch: v3.0 refactor milestone (2026-08-17 → 2026-08-19)

<!-- Archived from trajectory.md on 2026-08-27 (memory prune). Verbatim.
     Founding through Phase 5 parity & release; milestone CLOSED 2026-08-19. -->

## Phase 5 — parity & release (shipped 2026-08-19; PHASE 5 COMPLETE — v3.0 refactor milestone CLOSED)

Outcome: HTML exports run the app's real render stack — `src/player/PlayerApp.js` (bundled to `docs/player.js`, inlined into every export) replaces the 1,270-line template player; exports gain swarm layers and area highlights, preserve the authored timeline via the snapshot's `timingReference`, and render at export resolution. v3.2.618 released: GitHub Pages enabled — **https://djdaojones.github.io/route-plotter/ live** (v2 line stays up). Docs refreshed incl. the owner-approved dev-guide reconciliation; decision-log archived by month. See decision-log 2026-08-19 "Phase 5".

## Phase 4, items 2–5 — canvas affordances, layers strip + Crowd scope, network edit mode, multi-select everywhere (shipped 2026-08-18; PHASE 4 COMPLETE)

Outcome: the canvas answers back (hover rings, leg hit-testing + midpoint insert), crowds are authorable in two clicks (layers strip + Crowd scope cards), custom guide networks get the one true tool mode (pen chaining, node/edge cards, Esc ladder), and selection became an app-level set honoured by every card (Cmd+A works, canvas toggle, group delete/nudge, one undo entry per bulk change). See decision-log 2026-08-18 second/third/fourth/fifth slices.

## Phase 3 — deterministic swarm engine (shipped 2026-08-18; PHASE 3 COMPLETE)

Outcome: `SwarmEngine.evaluate(timelineMs, layer, context)` — pure hash(seed, dotIndex, hopIndex) dots with weighted graph walks, four lifecycle modes, route guide, wobble; batched DotRenderer drawing beneath the hero route via the `flow-layers` registry entry. See decision-log 2026-08-18 "Phase 3 swarm engine".

## Phase 2 — layered scene model (shipped 2026-08-18; PHASE 2 COMPLETE)

Outcome: `Scene` → `FlowLayer` (guide graph or hero route) → `Emitter` models with per-emitter seeds and normalised release windows; coordVersion 7→9 additive `scene` block (8 skipped); scene included in clearAll + undo snapshots. See decision-log 2026-08-18 "Phase 2 scene model".

## Phase 4, item 1 — scope-split inspector (shipped 2026-08-18)

Outcome: the sidebar is an inspector that names its subject — scope chip with prev/next stepping, waypoint cards (Marker · On arrival · Label · Leg → next · Area) vs route cards (Head · Pacing · Reveal · Path emphasis · Background · Video settings) swapped on selection, ghost state deleted, right sidebar reduced to the Waypoints list ready for the Layers strip. Markup + wiring only. See decision-log 2026-08-18 "Phase 4 first slice".

## Phase 3.5 — authoring-UI paper cuts (shipped 2026-08-18; PHASE 3.5 COMPLETE)

Outcome: all 15 review items landed same-day — one data bug (minor-detach on reorder), one data-corruption find (bulk thickness raw ints), the context menu (first right-click UI, revived the dead T-key toggle), single-writer editor controls, path head resolved global, duration discrepancy root-caused (preview tail gated on comet) — see decision-log 2026-08-18 "Phase 3.5 shipped".

## Phase 1 enabling refactor, item 3 — PlayerCore teardown (shipped 2026-08-17; PHASE 1 COMPLETE)

- PlayerCore extraction — `src/core/PlayerCore.js` owns all timeline math (segments, exact pause budgets, beacon schedules, timeline↔path mappings) as pure functions; AnimationEngine delegates and keeps only transport + wait-event edge-detection. See decision-log 2026-08-17 (PlayerCore teardown).
- Closed-form beacons — all five animators derive state from a timeline-local clock (`sync(localSec, win, options)`); delta-time accumulation, pause-sync hacks, and the grow runtime pause extension are gone; reverse scrubbing revives/un-fades beacons exactly. Interim export fixed-delta patch removed as planned.
- Golden-frame harness — `tests/goldenFrames.test.js` pins play == scrub == reverse == export stepping at the state level and proves evaluation never mutates the timeline; `tests/playerCore.test.js` pins the builders and windows.

Outcome: the scene is a pure function of (timelineMs, projectState) — the deterministic-timeline mandate is implemented for everything that exists today, ready for Phase 2's seeded flow layers. 158/158 tests; verified live incl. a fully-throttled 105-frame export with zero console errors. Phase 1 closed.

## Phase 1 enabling refactor, items 1–2 (shipped 2026-08-17)

- Export slowdown fix (owner report, interim) — beacon time is pinned to 1/frameRate per encoded frame during video export, so encodes no longer depend on the browser staying active (background-tab throttling used to speed wall-clock beacons ~25x/frame and distort grow-pause timing). Superseded by PlayerCore later. See decision-log 2026-08-17 (export slowdown).
- main.js mixin split — 6,235 → ~1,120 lines; twelve method groups moved verbatim to `src/app/*` prototype mixins (Object.assign onto RoutePlotter.prototype); snapToAngle now a tested util; mixin-collision guard test added. See decision-log 2026-08-17 (Phase 1).
- Renderer layer registry — vector draw order formalised as `RenderingService.VECTOR_LAYERS` (data-driven, bottom → top) so Phase 2 flow layers insert beneath the hero route by adding an entry; order + visibility guards pinned by tests. See the same entry.

Outcome: the orchestrator is navigable and the draw order is data; build + 142 tests green, interactive browser pass clean. Phase 1 now has one item left: PlayerCore extraction + deterministic animation-core teardown with the scrub-vs-play golden-frame harness.

## Route Plotter v3 founding + dot-crowd salvage (shipped 2026-08-17)

- v3 founding — fresh-history repo `route-plotter` created; router-plotter-02 imported @ v3.1 build 573 and frozen as the v2 line (its Pages URL stays live). See decision-log 2026-08-17 (founding).
- PM-Skills 4.7.0 — fresh manifest-verified install replacing embedded v2.3.0; v2 project memory ported forward.
- Graph models landed — GraphNode, GraphEdge, GraphModel + 62 tests cherry-picked/salvaged from the dot-crowd fork (unwired until Phase 2).
- Toolchain fix — package-lock.json now tracked; esbuild target chrome58/firefox57/safari11 → es2022 (fresh clones were unbuildable under esbuild 0.27.7).
- JSZip bundled — jszip 3.10.1 as a real dependency; CDN script-injection removed; offline save/load works.
- Dot-crowd salvage — the fork's never-pushed working state (graph editor + Phase 2 swarm core, partially destroyed by OneDrive offloading) recovered via git + Windsurf local history, pushed to the fork, mined into `specs/dot-crowd-navigator/`; dot-crowd-navigator and router-plotter-01 archived on GitHub. Four implementation files remain lost (their test suites survive). See decision-log 2026-08-17 (salvage) and the fork's SALVAGE-NOTE.md.

Outcome: v3 founded on the mature trunk with the swarm feature specced and its graph data layer already tested in-tree; build + 131 tests green. Phase 0 closed 2026-08-17 (memory reconciled, JSZip bundled, offline-capable). Next: Phase 1 — main.js split, renderer layer registry, PlayerCore + deterministic animation-core teardown.


<!-- FILE: pm_skills/project/backlog.md -->

# Backlog

<!-- Status: [ ] todo  [~] in progress  [x] done  [-] cut -->
<!-- Grammar: `- [ ] **ID Short title** · Band [flags] — description`.
     Band names the delivery theme; the H3 lane names the schedule state. -->

## Active

<!-- Current is the active lane or has a named residual gate. Next is ordered
     by dependency chain rather than deadline; [ready] marks runnable
     successors. Quarantine is not schedulable.

     Gate vocabulary: `[gated: X impl]` waits on X's *code* landing;
     `[verify: …]` is an evidence-only residual that blocks nothing
     downstream. Conflating the two stalled the whole Phase 5 chain behind
     physical-device evidence that no successor actually needs. -->

### Current

- [~] **REV-04 Cross-browser and offline export evidence** · Review assurance
  [verify: Chromium/Firefox/Safari + offline] — Runtime probes, format-locked
  strategy selection, cached player loading and one endpoint-inclusive frame
  plan are implemented. Publish real-browser codec/container and genuinely
  offline standalone-export evidence.
- [~] **REV-03 Unified pointer transactions** · Review assurance
  [[detail]](tickets/REV-03.md) [verify: physical iOS Safari + Android Chrome]
  — Unified Pointer Events, captured group drag and cancel/no-op transactions
  are implemented and green in automation plus production Chromium. Record the
  physical mobile pass.

### Next

- [~] **REV-05 Accessibility assurance** · Accessibility assurance
  [verify: NVDA/VoiceOver + forced colours] — Structural audit, AAA contrast
  sampling, 400%-zoom reflow and axe-core all green in production Chromium
  (48 rules, zero violations, contrast evaluated live), with two AAA failures
  fixed and axe now a standing gate. Screen readers stay owner-run; forced
  colours needs devtools emulation.
- [ ] **DEPLOY-01 Release the remediation branch** · Release
  [blocked: owner calls the release] — The owner held the merge on 2026-08-27
  (`f1c14b9`): the live site stays on v3.2.618 until they call it. This ticket
  exists so RP-07's residual is tracked rather than forgotten, not to reopen
  the decision. When called: `review-remediation` is 41 commits ahead of
  `main`, which is what Pages serves. Also settle GitHub branch-protection and
  Pages permissions, which the review could inspect only from repository files.
- [ ] **REL-01 Decide the production source-map policy** · Release
  [ready] [sign-off] — `docs/app.js.map` publishes 3.1 MB carrying the full
  unminified source of 89 first-party files (`sourcesContent`). The repository
  is public, so this is a size and tidiness decision rather than a secrecy one:
  keep it for debuggable production stack traces, or drop it. Review §17
  Optional.
- [ ] **PERF-01 Benchmark a representative maximum project** · Performance
  [ready] — Hostile inputs are bounded and fixture-covered (RP-09), but no
  *legitimate* large project was ever profiled, so the supported ceiling is a
  UI limit rather than a measured budget. Profile an agreed maximum — waypoint
  count, crowd size, image resolution — and record what it costs. Review §18
  "intended project-size ceiling".
- [ ] **LEGAL-01 Confirm the MPL source-notice posture** · Governance
  [ready] [maintainer] — `mediabunny` (runtime, bundled) and now `axe-core`
  (dev-only) are MPL-2.0. Notices and licence text shipped under REV-09, but
  the review flagged that a technical review cannot give legal advice and the
  owner should confirm the redistribution posture is what they intend. Review
  §18 "MPL/source-notice obligations". Pair with DEPS-01, which moves those
  same versions.
- [ ] **A11Y-01 Tooltip triggers should not be buttons** · Accessibility
  [ready] — `[data-tip]` labels get `role="button"` and `tabindex="0"`, so ~80
  hint labels announce as buttons that perform no action and owe a 44px target
  they do not meet. axe confirms it is worse than questionable: `role="button"`
  is *invalid* on a `<label>`, and would be a violation rather than an
  incomplete once the camera controls are shown. Describe the control instead
  (`aria-describedby`) and drop the phantom role.
- [ ] **REVEAL-01 Spotlight reveal that fades behind the head** · Reveal modes
  [ready] — Owner: "the spot reveals the background, but then its revealing
  effect fades out over time". Not currently possible: the mask repaints every
  passed path point at full opacity each frame, so revealed stays revealed.
  Weight each point's alpha by its distance behind the head, keeping the
  per-frame rebuild that makes scrubbing bidirectional.
- [ ] **LABEL-01 Auto-position at the right moments** · Inspector polish
  [ready] — Owner: auto-position itself works well. Three changes: run it when
  a label is first written (it starts hidden), do NOT re-run it after the
  author has moved the label by hand, and surface the control — it is buried
  in the collapsed "More" disclosure. A fading prompt offering auto-position
  is the proposed nudge.
- [ ] **A11Y-02 Forced-colours sweep** · Accessibility [ready] — Only the
  UI-02/ROUTE-01c row affordances declare `forced-colors` fallbacks. Selection
  accent bars, focus rings, the leg “+” and beacon colours have none. Needs
  devtools forced-colours emulation to verify, so pair it with REV-05's
  residual.
- [ ] **DEPS-01 Consider dependency upgrades across the board** · Engineering
  maturity [ready] — Owner-requested (2026-08-27 maintenance). Evaluate and
  take deliberate upgrades: mediabunny 1.55.1→1.55.3 (runtime — re-verify
  export), vitest 4.1.10→4.1.11, jsdom 27→29 (two majors, test env), plus any
  transitive drift; full gate after each. Relates to REV-07 (icebox), which
  would automate this recurring pass.

### Icebox

- [ ] **REV-07 CI maturity** · Engineering maturity [deferred] — Mature the
  already-green CI gate with risk-based coverage thresholds, a supported-Node
  matrix and dependency-update automation. Promote when a regression escapes
  the current gate or a Node upgrade is forced.
- [ ] **ICE-01 Swatch-picker popover** · UI polish [deferred] — UI-01 now
  contains secondary area palettes under More while keeping Marker colour
  visible for novices; promote only if observed palette height becomes a real
  navigation problem.
- [ ] **ICE-03 Visual and performance benchmark corpus** · QA [deferred] —
  Golden-frame fixtures catch timeline regressions, but there is no repeatable
  benchmark for subtle visual or performance drift, so optimisation decisions
  stay anecdotal. Review §17 Optional. Promote if a visual regression escapes
  the golden frames, or alongside PERF-01.
- [ ] **ICE-02 Import-time palette conversion** · Import/colour [deferred] —
  Import-time Okabe-Ito/UoN palette conversion. Promote only on user demand;
  photo posterisation/dithering needs separate quality work.

<!-- FILE: pm_skills/project/brief.md -->

# Project Brief

## What are we building?

Route Plotter v3 — an animated route editor for maps and images. Users
drop in a background image, click to place waypoints, configure styles
and timing, and export as MP4, WebM, or a self-contained HTML file.

v3 extends the single narrative route into a **layered scene over one
master timeline**: the existing waypoint chain stays as the "hero route",
and new **flow layers** add particle/crowd animation — many dots
following guide networks (weighted, directed graphs) or the hero route
itself, with emitter controls for count, release window, onset/speed
variance, intensity ramp and lifecycle (absorbed from the archived
dot-crowd-navigator fork; spec in `specs/dot-crowd-navigator/`).

## Who is it for?

University educators, students, and presentation makers who need
animated map or image overlays showing routes, processes, sequences, or
flows (people moving across a map, particles in a system). Primary user:
Gary Priestnall, University of Nottingham (geography/cartography).

## Platform and deployment

Web app. Single-page, client-side only. No server. Repo:
`djDAOjones/route-plotter` (fresh-history v3 line, founded 2026-08-17).
Deploys via GitHub Pages from `docs/` on `main` — live at
`djdaojones.github.io/route-plotter/` since Phase 5 (2026-08-19). The
frozen v2 line remains served from
`djdaojones.github.io/router-plotter-02/` for existing users.

## Core features (v1)

- Drag-and-drop background images with waypoint placement (major + minor)
- Catmull-Rom spline path with per-segment speed control
- Per-waypoint markers, beacons, text labels, area highlights, camera zoom
- Multiple visibility modes (path, waypoint, background)
- Video export (MP4/WebM via WebCodecs) and self-contained HTML export
- Auto-save to localStorage, project save/load as ZIP

## Constraints

- Pure JavaScript, no frameworks. Two bundled runtime dependencies:
  mediabunny (video mux) and jszip (project ZIPs). Nothing from CDNs.
- Canvas 2D rendering.
- **Deterministic timeline (v3 mandate):** the scene is a pure function
  of (timelineMs, projectState, seed) — no wall-clock or delta-time
  accumulated state in any renderer. Play/scrub/export share one
  evaluation path. See decision-log 2026-08-17.
- npm + esbuild for bundling (target es2022; lockfile committed),
  Vitest for testing.
- WCAG 2.2 AAA is the product target; the semantic authoring model now ships,
  while REV-03/REV-05 track the remaining pointer-parity and assurance evidence
  before it can be claimed as verified support.
- IBM Carbon Design System for UI patterns (implemented, not installed).
- Okabe-Ito colour-blind safe palette for map data.
- UoN semantic design tokens for UI chrome.

## Out of scope (for now)

- Server-side storage or user accounts
- Multi-user collaboration
- GIS integration or georeferencing
- Mobile-native apps

## Decided foundations

- Split hero routes animate simultaneous branches on one master timeline;
  reconvergence waits for the latest branch and shared join effects fire once.
- Projects own a shipped reference render size: map-bound graphics scale from
  its short edge while normalised geometry and authored timing remain
  unchanged. Interactive label clamps protect editor legibility; exports use
  the exact reference scale.
- Public/share/support boundaries retain original project image bytes only in
  explicit saves/exports, use previewable redacted diagnostics, and publish
  under MIT with third-party notices and best-effort GitHub support.

<!-- FILE: pm_skills/project/conventions.md -->

# Conventions

## Code style

- 2-space indentation
- Single quotes
- Semicolons
- LF line endings
- 120 char max line length (JS/HTML/CSS), 80 for markdown
- Enforced by `.editorconfig`

## Naming

- Files: PascalCase for classes/components (`Waypoint.js`,
  `RenderingService.js`), camelCase for utils (`focusTrap.js`)
- Variables/functions: camelCase
- Constants: UPPER_SNAKE_CASE (grouped objects in `constants.js`)
- CSS custom properties: kebab-case (`--map-series-1`,
  `--surface-primary`)
- Events: colon-separated namespaces (`waypoint:style-changed`)

## Commit messages

Format: `type(scope): description`

Types: `feat`, `fix`, `refactor`, `style`, `chore`, `test`, `docs`

Examples:

- `feat(area): add polygon area highlights`
- `fix(animation): correct duration after reset`
- `chore: deploy v3.1.530`

## Documentation

Permanent rules are in `AGENTS.md` § Code documentation. This section
captures how they apply to this project:

- **Always document:** event chains across files, coordinate transform
  logic, animation timing calculations, serialisation format
  assumptions, H.264/WebCodecs constraints, WCAG requirement
  connections.
- **Skip JSDoc for:** trivial getters, obvious one-liners, simple
  event emissions.
- **Fragile areas requiring comments:** slider feedback loops,
  animation duration after reset, coordinate space conversions,
  WebCodecs backpressure, mediabunny codec naming.

## Testing

- Test runner: Vitest with jsdom
- Unit tests cover: Waypoint, AnimationState, PathCalculator,
  CoordinateTransform, EventBus, Easing, CatmullRom
- Integration testing: manual browser verification
- After every change: `npm run build` + `npm test`

## Patterns to follow

- EventBus for all cross-component communication
- `queueRender()` for deferred rendering (never call `render()`
  directly)
- `autoSave()` at end of state-mutating event handlers
- Waypoint factory methods (`createMajor()`, `createMinor()`) for
  creation
- `waypointsById` Map for O(1) lookups
- Batch mode (`beginBatch`/`endBatch`) for multi-waypoint operations

## Patterns to avoid

- Direct method calls between components (use EventBus)
- Storing pixel coordinates on Waypoint (use normalised 0–1)
- Setting slider `.value` directly (use `ui:slider:update-speed` event)
- Mid-file imports (esbuild requires all imports at top)
- Per-frame object allocations in render loop
- Installing Carbon packages (implement to Carbon spec instead)
- Collapsing Okabe-Ito and UoN token systems

## Tooling

- Bundler: esbuild (via custom `build.js`)
- Test runner: Vitest
- Formatter: `.editorconfig` (mechanical)
- Linter: none

<!-- FILE: pm_skills/project/decision-log.md -->

# Decision Log

<!-- Append new decisions at the top. Don't edit old entries. -->

## 2026-08-27 — owner sets the prune bar, and holds the merge

Two owner calls following the memory prune. **Pruning must never harm
development quality**: archive freely once context is closed, but content
still feeding open work — open-item rationale, the active era's trajectory —
stays live, and budget/prune-to targets yield to that bar (today's stopping
points, log at 16/20 entries and trajectory at 91% of budget, are the rule
applied, not an overrun to fix). Post-prune audit confirmed no open item's
needed context went cold: REV-03's archived design entry covers implemented,
green work, with live detail in its ticket. And **review-remediation does
not merge to main yet** — the live site stays on v3.2.618 until the owner
calls the release.

## 2026-08-27 — memory prune, and two owner deferrals

Maintenance Diagnose flagged the decision-log at 51 live entries (budget 20)
and the trajectory at 3,859 words (budget 2,000). Pruned losslessly
(diff-verified): 36 entries (2026-08-17 → 2026-08-26) moved to
`archive/decision-log-2026-08-17-to-2026-08-26.md`, keeping today's 15 live;
the trajectory's two closed epochs moved to `archive/trajectory/`
(0001 v2-line era Apr–Jun, 0002 v3.0 refactor milestone Aug 17–19), keeping
the remediation era live at 1,812 words. Swept the one ticked doc-deltas
line; dropped the stale `docs/player.js.map` file-map row (the build emits no
player sourcemap). Owner calls this session: **stay on PM-Skills 4.7.0**
(upstream is 4.9.2 — skipped, not merely deferred); **dependency updates
deferred into new ticket DEPS-01** (consider upgrades across the board).
Gate context: 67 files / 1006 tests green, `npm audit` clean.

## 2026-08-27 — the original review is fully dispositioned into the backlog

**Question asked:** is everything from the original review and its report now
effective in the backlog? **Audited rather than assumed**, against all three
layers of the report, not just the headline findings.

**RP-01…RP-18:** all shipped or carrying a named ticket. The crosswalk was
already accurate for the findings themselves and has been refreshed with
current dispositions.

**The gap was everything that was not a numbered finding.** Section 17's
*Optional* roadmap and section 18's *unresolved uncertainties* never entered
the backlog, because the crosswalk only ever bridged RP-01…RP-18. Five items
were still open and are now ticketed:

- **DEPLOY-01** — RP-07's stated residual plus §18's "GitHub branch
  protection/Pages permissions". Written as an open sign-off, then corrected
  on reading `f1c14b9`: a parallel maintenance session had already put the
  question to the owner, who **held the merge** — the live site stays on
  v3.2.618 until they call the release. The ticket is now `[blocked: owner
  calls the release]`, so the residual is tracked without reopening a settled
  decision.
- **REL-01** — `docs/app.js.map` publishes 3.1 MB carrying `sourcesContent`
  for 89 first-party files. The repository is public, so this is a size and
  tidiness decision, not a secrecy one; saying otherwise would overstate it.
  `[sign-off]`.
- **PERF-01** — RP-09 bounded *hostile* inputs, but no *legitimate* maximum
  project was ever profiled, so the supported ceiling is a UI limit rather than
  a measured budget.
- **LEGAL-01** — MPL-2.0 posture for mediabunny (bundled) and now axe-core
  (dev-only). Notices shipped under REV-09; the review was explicit that a
  technical review cannot give legal advice. `[maintainer]`.
- **ICE-03** — a visual/performance benchmark corpus, Icebox with a trigger.

Seven further §17/§18 items were checked and are genuinely closed: structured
diagnostics, Clear All semantics, content sensitivity, public-ZIP intent,
supported browsers, the coverage floor, and the AAA audit. Each is recorded in
the crosswalk with where it landed, so the next audit does not repeat this one.

**Crosswalk extended** with a second table covering the non-finding items, and
the dossier index now points at the current continuation prompt. The old
prompt is kept as provenance for the run it briefed rather than deleted.

**Parallel session reconciled.** Two commits (`ea3e27a`, `f1c14b9`) landed on
the branch from a maintenance session while this audit ran: the memory prune
happened, with an owner-set quality bar that pruning must never harm
development, and DEPS-01 was added. This session's edits applied cleanly on top
(additions only, nothing clobbered), DEPLOY-01 was corrected as above, and
LEGAL-01 now points at DEPS-01, which moves the same MPL-licensed versions.
The trajectory and decision-log budget warnings this session had been
preserving are therefore resolved, not deferred.

**Link:** DEPLOY-01, REL-01, PERF-01, LEGAL-01, ICE-03.

## 2026-08-27 — owner verdicts clear quarantine, and axe joins the gate

**Quarantine is empty.** All four parked items got an owner verdict:
- **QUAR-01** import/export custom keybindings — **cut**.
- **QUAR-04** randomised path-shape frequency — **cut**; the owner judges it
  already done.
- **QUAR-02** → promoted as **REVEAL-01**. The owner's intent, recovered:
  the spotlight reveals the background, and that reveal then *fades out over
  time* behind the head. Investigated rather than guessed — it is **not**
  currently possible. `buildSpotlightRevealMask` repaints every passed path
  point at full opacity on every frame, so revealed stays revealed, uniformly
  and permanently. The fix is tractable and fits the architecture: weight each
  point's alpha by its distance behind the head, keeping the per-frame rebuild
  that is what makes scrubbing bidirectional.
- **QUAR-03** → promoted as **LABEL-01**. The owner confirms auto-position
  works well; the ask is *when* it runs and how findable it is. Run it when a
  label is first written, never after the author has moved it by hand, and
  surface the control — it sits inside the collapsed "More" disclosure today.

Two of four were genuinely recoverable intent, which is the argument for
quarantining rather than cutting on an agent's judgement.

**axe-core added as a dev dependency**, owner-approved. Runtime dependencies
are unchanged: jszip and mediabunny. `tests/axeAudit.test.js` is now a standing
gate over the app shell across WCAG 2.0/2.1/2.2 A/AA/AAA and best-practice.

**Result: 48 rules, zero violations** — run twice in production Chromium, once
on the empty shell and once with the "Open day route" example loaded, with
`color-contrast` genuinely evaluated (confirmed, not assumed). The jsdom gate
disables `color-contrast` because jsdom has no painting; a pass there would be
a false green, so contrast stays a live measurement.

**Four incompletes, triaged, none a defect:**
- `aria-allowed-role` on two camera `<label>`s — axe's independent
  confirmation of **A11Y-01**, and stricter than the original finding:
  `role="button"` is *invalid* on a `<label>`, and becomes a violation rather
  than an incomplete once those controls are shown. Ticket updated to say so.
- `aria-valid-attr-value` on the File and Export dropdowns — the referenced
  menus exist with `role="menu"`; axe cannot resolve a `display:none` target.
  Markup is correct.
- `color-contrast` / `color-contrast-enhanced` on `.waypoint-fork-mark` — axe
  skips glyph-only content. The mark is `aria-hidden`, decorative, and its
  meaning is carried by the row's `.sr-only` text.

**Deferred by the owner:** the `trajectory.md` and `decision-log.md` size
warnings, to a maintenance session shortly. Not pruned.

**Link:** REV-05 (residual now NVDA/VoiceOver and forced colours only),
REVEAL-01, LABEL-01, A11Y-01.

## 2026-08-27 — the accessibility audit, and what it is honest to claim

**Ran and green in production Chromium:** unique ids, every control named,
one h1, no heading-rank skips, a main landmark, `lang`, alt text everywhere,
a polite live region. Contrast measured on every visible text node against its
effective background at the AAA thresholds. Target size on every rendered
control. Reflow at 320 CSS px — the WCAG 1.4.10 equivalent of 400% zoom at
1280 px — with no horizontal document scroll and, after the fix below, no
undersized control.

**Two AAA failures, found and fixed:**
- The Edit/Preview label measured 6.37:1. `--text-03` is exactly 7:1 on white,
  but that label sits on the toggle's own `--ui-02` surface. Moved to
  `--text-02`, now 19.17:1.
- The skip link was 37 px tall. It is the first thing a keyboard or switch user
  reaches, so it now fills the 44 px target.

**Two findings ticketed rather than folded in.** An assurance pass that
quietly turns into a redesign is exactly the failure this programme warns
against, so:
- **A11Y-01** — `ParamTooltip` gives every `[data-tip]` label `role="button"`
  and `tabindex="0"`. That announces ~80 hint labels as buttons that perform no
  action, and obliges each to a 44 px target it does not meet at 96×19. The
  right shape is `aria-describedby` on the control the label describes; that is
  a semantics change across the sidebar and deserves its own run.
- **A11Y-02** — only the UI-02 and ROUTE-01c row affordances declare
  `forced-colors` fallbacks. Selection accent bars, focus rings, the leg "+"
  and beacon colours have none.

**What is NOT claimed.** axe-core was not run: it would be a new dev
dependency, and that is an approval, not an assumption. Forced-colours and
reduced-motion emulation need devtools media overrides this automation cannot
drive. NVDA and VoiceOver remain owner-run by standing policy. The regression
test asserts only what static analysis can settle and says so in its header —
a jsdom "pass" on contrast or a screen reader would be worth less than nothing.

**Link:** REV-05, still `[~]` with a named residual.

## 2026-08-27 — examples are generated project saves, published under review

**Owner decision:** the examples ship as full `.zip` project saves so people
can download and re-use them, not as JSON the app alone understands. Asked and
answered at the DEMO-01 gate.

**Generated, not committed as source.** The repository holds the example
*definitions* (`src/examples/index.js`) and the already-bundled backgrounds;
the build pairs them into the archive. This keeps a second copy of a 1–2 MB
image out of the source tree, and the archives are byte-reproducible — fixed
entry timestamps and a pinned authoring date, because `Waypoint.toJSON()`
carries `created`/`modified` — so a rebuild that changed no example produces
no diff and lands no new blob in history. The archives themselves do go to
`docs/`, which is how a static site can offer a download at all.

**Built from the live models, which is what makes them fixtures.** Hand-written
JSON would rot into a shape nobody reads; `toJSON()` output is current by
definition. `tests/exampleProjects.test.js` rehydrates each one through the
app's own timing path and asserts it resolves, times deterministically, gives
every waypoint an arrival and leaves no broken crowd binding. If the save
format, branch model or timeline maths drift, an example stops resolving and
the suite says so.

**Publication boundary, honoured rather than bypassed.** The build refused any
ZIP in its output, because "legacy project ZIPs still require individual
provenance review" (decision-log 2026-08-26). That rule was never a blanket
ban on archives — it was a ban on publishing archives nobody had reviewed. So
`public-assets.json` gained an `exampleProjects` block naming the three
approved archives and the approved background each contains, the build's guard
now refuses any ZIP *not* in that record, and `publicationBoundary.test.js`
asserts the shipped set equals the approved set. A stray user project still
fails the build.

**Content:** a plain labelled route with a beacon (no crowd); a branching
campus route whose crowd is traced from it and released at the head's arrival;
and a weighted network with two dot streams and no hero route — between them
every Phase 5 capability, and one gentle first-open example.

**Link:** DEMO-01. 65 files / 991 tests green. Verified in production Chromium:
"Open day route" opened from the File menu with its background, 1 branch, 0
structural problems, 4 crowd nodes bound and none broken, one join wait and an
11.65 s timeline. Zero console entries.

## 2026-08-27 — the branch handle is an offer, and it must survive a tap

**Decision:** A waypoint that a *bound entry* node sits on carries a "+" handle
beside its marker. Clicking it emits `route:branch-arm` — the same event
Alt+click emits — so there is one branch path through the code, not a second
mechanism that could drift from it. Entry nodes only: a pass-through or exit
node marks a crowd already moving through, not a moment the story opens at, and
a broken binding offers nothing.

**Its own hit target, and not hover-gated.** The handle sits clear of the
marker so it cannot steal the marker's clicks — which also puts it outside the
marker's hit radius, so a cascade that only looked for handles *after* a
waypoint hit never reached it. It is now checked ahead of the waypoint, beside
the area handles.

More importantly, the click path hit-tests the handle itself rather than
trusting the hover state. Gating on hover left the handle dead on touch and
pen, where a tap never hovers first — exactly the devices REV-03 unified this
transaction for. Hover is the visual affordance; it is not the gate. This was
found because the hover cascade is not reproducible in browser automation, and
chasing that turned up the real defect underneath it.

**One "+" routine:** the leg-midpoint handle and this one now draw through
`_drawPlusHandle`, so two offers that mean "add something here" cannot drift
into looking different.

**Link:** COMPOSE-04. 64 files / 963 tests green. Verified in production
Chromium: the handle on the crowd's entry waypoint armed the fork with no hover
beforehand, and the place click created `Waypoint 1·B1` alongside the existing
`2·B1` — correctly lettered per fork — with no structural problems and zero
console entries.

## 2026-08-27 — a closed client socket is not a port holder

**Decision:** `scripts/restart.sh` matches `lsof -sTCP:LISTEN` when deciding
whether the port is held by a foreign process.

**Rationale:** it matched *any* socket on port 3000, including a browser's
stale CLOSED client connections to the server it had just stopped. The
documented one-command boot then refused to start — correctly reporting that it
would not kill a process it does not own, but about sockets that hold nothing.
The ownership-safety contract is intact and still refuses a genuine foreign
listener; it just no longer mistakes a hung-up caller for one.

**Found by:** the boot failing after a dev-server restart during COMPOSE-04
verification, with nothing listening on the port at all.

**Link:** DEV-01. `tests/restartSafety.test.sh` still green.

## 2026-08-27 — the crowd wait is solved, not iterated, and then baked

**Decision:** "Wait here for this crowd" computes the wait a waypoint needs so
the head is still there when the crowd's last dot arrives, and writes it as an
ordinary authored `pauseTime`. The route gains no live dependency on the crowd —
Phase 5 forbids that, and a live one would make the timeline a fixed-point
problem on every frame.

**Why a difference is wrong.** Adding a wait `P` lengthens the timeline, and
every dot's onset is a *fraction* of the timeline, so the crowd finishes later
too. "Last arrival minus arrival" therefore undershoots, and iterating converges
slowly as onsets approach the end. Solved per dot instead, with `A` the head's
arrival (unaffected by a wait *at* that waypoint), `f` the onset fraction, `J`
the journey and `D` the timeline minus the waypoint's current wait:

    A + P ≥ f·(D + P) + J   ⇒   P ≥ (f·D + J − A) / (1 − f)

taking the largest such `P` over the dots. Exact in one pass, and idempotent:
fitting twice lands on the same number, so a refit never creeps.

**Unsatisfiable cases are reported, not approximated:** a dot with onset
fraction 1 releases exactly at the end and moves out by however much the route
is lengthened, so no wait can outlast it; a looping or respawning crowd has no
arrival at all. Both come back with a reason rather than a wrong number.

**Shared arithmetic:** the onset routine was extracted from `SwarmEngine` into
`crowdArrival.js` and the engine now imports it, rather than the solve
restating it. Every swarm fixture stayed byte-for-byte identical through that
extraction, which is the check that mattered. `scheduleDots` resolves the guide
the same way `evaluate` does and walks a graph dot's own route to its first
exit, so per-dot journeys differ on a graph exactly as they do on screen.

**Assumption at the skipped gate:** the wait applies to the selected major
waypoint when there is one, otherwise the route's last major — the two things
an author means by "wait here" — rather than introducing a waypoint picker.

**Staleness is honest, not hidden:** the number is a snapshot. Retune the crowd
and it goes stale; fit it again. That is the cost of baking, and it is the cost
Phase 5 chose.

**Link:** COMPOSE-02. 63 files / 945 tests green. Verified in production
Chromium: a crowd finishing at ~25 s against a 7.3 s route solved to a 48215 ms
wait, after which the head leaves at 53984 ms and the last dot arrives at
53983 ms. The naive difference would have set ~19 s and still missed. Zero
console entries.

## 2026-08-27 — tracing the route makes a copy that still follows it

**Decision:** "Trace route into network" replaces the selected crowd's guide
network with one mirroring the route: a node per **major** waypoint, an edge
per leg carrying that leg's **minors as control points**, and `one-way` edges
throughout. Branches trace as edges leaving the fork node and returning to the
rejoin node, so a crowd splits exactly where the route splits.

**A copy that still follows.** Every traced node keeps a COMPOSE-01 binding to
the waypoint it came from, so moving that waypoint carries the node rather than
stranding the copy — but the network is otherwise the author's: retune weights,
add shortcuts, draw extra nodes, none of which reaches back into the route.
That is the one-way rule paying for itself twice.

**Minors are geometry, not junctions.** A node at a minor would be a decision
point the route does not have, and a crowd would treat it as a place to choose.
Carrying minors as edge control points keeps the guide curve the route's own
curve instead of a straight chord between majors.

**Entries and exits are derived, not declared:** a node with no incoming edge
is an entry, one with no outgoing edge an exit. A branched route therefore
yields several exits without the caller reasoning about topology.

**Refuse rather than half-build:** a route with fewer than two majors, or one
whose branch structure has an unresolved fork or rejoin, is refused with a
reason. A partial trace would leave edges pointing at endpoints that were never
created.

**Availability:** the button stays enabled while the pen is live — switching a
crowd to "Custom network" hands you the pen immediately, which is exactly when
"or just trace the route" is most useful. Clicking it puts the pen down first,
because the trace replaces every node and a half-drawn edge would be left
pointing at one that no longer exists.

**Link:** COMPOSE-03. 62 files / 923 tests green. Verified in production
Chromium on the branched route: 4 bound nodes with the first an entry and the
last an exit, 4 one-way edges including the fork→branch and branch→rejoin
pair, and the trunk leg carrying its 2 minors as control points. Zero console
entries.

## 2026-08-27 — a bound crowd reads the route; the route never reads the crowd

**Decision:** `GraphNode.anchorWaypointId` binds a node's *evaluated* position
to a waypoint, and `Emitter.releaseAnchor` binds a release window's start to a
route moment. Both are resolved at evaluation time from live route state, both
default to null, and both are omitted from `toJSON()` when null so an
unanchored scene's saved shape is unchanged.

**Authored intent is never rewritten.** A bound node keeps its own `x`/`y`;
only a derived `position()` follows the waypoint. That is what makes the
fallback meaningful — when the waypoint is deleted the node returns to where it
was authored, keeps its binding, and the break is reported. Deleting the node
or freezing the crowd would both destroy work the author never asked to lose
(the ticket's open question on fallback).

**Named moments, not a normalised offset** (the ticket's second open question):
`arrival`, `pause-end` and `route-end`. An author can reason about "when the
head gets there" and "when it moves off again"; both survive retiming; and an
offset into a pause means nothing when the pause is zero.

**Determinism and fixture compatibility:** only a bound emitter's window
*start* moves. The onset arithmetic — slot, hash channels, variance, ramp,
busyness envelope — is untouched, so every existing unanchored swarm hash is
byte-for-byte identical, which the suite confirms. `getRouteArrivalMap()`
composes a linear route's single trunk leg through the same routine a branched
one uses, so a bound crowd reads the same arithmetic either way.

**Read split:** everything that draws an edge, walks a dot or hit-tests reads
`node.position()`; the authoring surfaces (semantic outline inputs, node drag,
validation) keep reading `x`/`y`. `edgeGeometry`'s cache signature includes the
resolved position, so a route edit invalidates the drawn curve — the drawn
curve and the curve dots travel must stay the same curve.

**Warning cadence:** the break notice fires once per *change*, not once per
path rebuild — `calculatePath` runs on every drag frame. Resolution itself runs
ahead of that function's early returns, because deleting a route down to one
waypoint breaks every binding and is exactly when a stale resolution is worst.

**Link:** COMPOSE-01. 61 files / 906 tests green. Verified in production
Chromium on a branched route: the node bound to its waypoint's exact position
while its authored coordinates stayed put, the emitter released at 2993 ms
(Waypoint 2's arrival plus its 1500 ms wait) with nothing before it, and
breaking the binding returned the node to its authored position with the
binding intact and the break reported. Zero console entries.

## 2026-08-27 — the exported player inherits branches rather than reimplementing them

**Decision:** ROUTE-01d needed almost no new export code. `PlayerApp` already
takes `pathTimingMixin` wholesale, so it builds the same splines and composes
the same master timeline the editor does; the work was carrying `branchPaths`
and `branchTimeline` into its render state and proving nothing is lost in
between. A second, player-local branch implementation was never on the table —
it is exactly how play, scrub and export would drift apart.

**Timeline length:** a terminal branch can outlive the trunk, so
`updateAnimationDuration` now takes the max of the trunk-derived duration and
the composed branch total (plus the same handles, intro and tail, which sit
outside the composition). Without this the route ended when the trunk did and
a longer branch was cut off mid-animation. A branch that fits inside the trunk
changes nothing — it must not pad a route it already fits in.

**Cache correctness:** the composed timeline is a function of geometry *and*
base speed, so its cache is keyed on both. Keying on geometry alone reported a
branch's duration at the previous speed after a speed change.

**Partial-mixin hosts, a third time:** `updateAnimationDuration` calling
`this.getBranchTimeline()` broke the player-parity harness, which
cherry-picks mixin methods. Fixed on both sides — the harness takes the new
accessor (it is part of the timing contract it exercises) and the call is
optional, because a host without the accessor has no branch data either.

**Evidence:** 60 files / 878 tests. Live Chromium: composed total and engine
duration agree at 7269 ms on a branched route, the coordVersion-9 snapshot
carries `branchId`/`branchFrom`/`branchRejoin` on exactly the one branch
waypoint and adds no key to the other five, and the `player.js` bundle inlined
into every standalone export contains the branch composition and render code.
Opening an exported file in a browser end-to-end remains REV-04's outstanding,
owner-run evidence.

**Link:** ROUTE-01d.

## 2026-08-27 — two gestures author a branch, and both are owner-chosen

**Decision:** Alt+click on an existing waypoint arms a branch; the next plain
canvas click places its first waypoint. Dragging a branch's last waypoint onto
another waypoint rejoins the branch there; dragging it onto the current target
again clears the rejoin. Both were picked by the owner at the ROUTE-01c gate
over a list "+ Branch" button, a canvas ⑂ handle and an inspector dropdown.

**What Alt+click gives up:** Alt+click previously force-added a major *even on
top of an existing waypoint*, bypassing selection. The hit-test now splits it:
empty canvas still force-adds, a waypoint hit arms a branch. The one lost case
is force-adding a major exactly on top of another, and Alt+Cmd still
force-adds a minor there. Escape unwinds an armed gesture before it unwinds a
selection — an armed state is the more recent and more surprising one to be
stuck in.

**Placement:** a branch is inserted after the fork's own leg block, so the flat
array still reads in route order and the sidebar list needs no reordering pass.
Numbering is `fork·letter·position` (`2·B1`), lettered from B because the
trunk's own continuation past the fork is implicitly A — so adding a second
branch never renumbers the first.

**Validation lives in the model, not the gesture:** `canForkFrom`,
`canRejoinBranch` and `branchEndInfo` answer every question the gestures ask,
and `canRejoinBranch` decides by applying the change to a copy and re-resolving
rather than restating the rules. A gesture that reimplemented them would drift
from `resolveRouteBranches` the first time either changed.

**Two bugs the live pass found, neither reachable from jsdom:**
- `findWaypointAt` hit-tested the waypoint being dragged. At drop time it sits
  under the cursor, on top of the target, so the rejoin never fired. It now
  takes an exclusion, and the caller excludes the whole drag group.
- Both branch handlers snapshotted undo *before* mutating. This project's undo
  stack holds post-action states and `undo()` pops the current one to restore
  the previous, so a pre-mutation snapshot made undo skip a step. Corrected to
  match `waypoint:deleted` and `waypoints:reordered`.

**Layout:** the fork ⑂ is badged onto the waypoint's colour dot rather than
placed in the row's text flow. A major row is already dot + handle + title +
▲▼ + × inside roughly 140px, and one more inline child wrapped the title.

**Link:** ROUTE-01c. 59 files / 869 tests green. Verified in production
Chromium: fork armed and placed at the right array index, rejoin set with a
1203 ms join wait and the dragged point restored rather than moved, the same
drag toggling back to terminal, undo restoring the rejoin, persistence across
reload, zero console entries.

## 2026-08-27 — a branch borrows the trunk's transport, never its own

**Decision:** `AnimationEngine` keeps exactly one authoritative transport — the
trunk's. Branch timing is pure derived data: `branchTiming.js` turns each run's
geometry into a leg, `PlayerCore.composeBranchTimeline` places the legs, and the
renderer asks `branchPathProgressAt(masterTimeMs, …)` for a branch's position.
No branch installs segment markers, holds playback state or accumulates time.

**Rationale:** the deterministic-timeline mandate says the scene is a pure
function of (timelineMs, projectState, seed). A per-branch transport would have
given every branch its own accumulating clock and broken that at the first
scrub. Deriving each branch's position from the master instant keeps play,
scrub and export agreeing by construction, exactly as they already do for the
trunk.

**Shared mapping, not a second one:** each leg carries its own `{segments,
pauses, pathDuration, totalPauseTime, hasVariableSpeed}` in precisely the shape
`PlayerCore.timelineToPath` consumes, and branches resolve position through
that same function. A first attempt approximated it (local time minus pause
time already spent) and drifted the moment a pause sat mid-branch rather than
at its end. An interleaved pause now holds a branch head still for the same
reason and by the same arithmetic as the trunk.

**Render seam:** two additive vector layers — `branch-paths` beneath the trunk
so the trunk still reads as the primary line, `branch-heads` above it, since
every enabled branch animates simultaneously and so owns a head. `renderPath`
and `renderPathHead` read a small fixed slice of the engine, so each branch
passes a facade that differs only in `getPathProgress()` and delegates the
rest. Branch waypoints, labels, beacons and areas needed no change at all:
those layers already iterate the whole waypoint array. Both branch layers
return early when `state.branchPaths` is empty, so a linear route never enters
the branch pass.

**Assumption at the skipped gate (camera):** the follow-camera keeps tracking
the trunk head. Trunk timing now reads `routeOf(app)` — the trunk, not the full
array — and `CameraService.toMajorKeyframes` follows it, so this falls out of
the model rather than being special-cased. Choosing per-fork which head the
camera follows, or framing all live heads, is a product decision left to
ROUTE-01c's sign-off.

**Mixin safety:** `routeOf(app)` is a module helper, not a mixin method,
because `PlayerApp` borrows only part of `pathTiming`; a `this.trunkRoute()`
call was undefined there and broke seven export-parity tests.

**Link:** ROUTE-01b. 58 files / 832 tests green. Verified in production
Chromium on a branched route: trunk and branch splines both start at the fork
point, two heads advance simultaneously from t=0, the shorter branch completes
and holds, zero console entries. A linear route reports `isLinear` with no
branch paths and renders unchanged.

## 2026-08-27 — branches are runs in the one waypoint array, not a second graph

**Decision:** A hero-route branch is a *contiguous run* of waypoints sharing a
`branchId`, stored in the same ordered array the route has always used, with
`branchFrom` on the run's first waypoint and `branchRejoin` on its last. All
three default to null and are omitted from `toJSON()` when null, so an unsplit
project's save is byte-identical to a pre-ROUTE-01 save.

**Alternatives rejected:** a dedicated `RouteGraph` of nodes and edges reads
cleaner in isolation but forces a migration of every consumer — path,
rendering, timing, persistence, export, outline — and cannot honour "preserve
valid linear projects exactly" without carrying the array anyway. Reusing the
crowd `GraphModel` was rejected outright: it is a weighted directed graph where
dots *choose* an edge, and importing edge weights and probabilistic selection
into hero-route storytelling would have made the two models mean the same
thing when the approved contract says they must not.

**Timeline composition:** `PlayerCore.composeBranchTimeline` resolves leg start
times by relaxation over fork dependencies, so it is order-independent and
terminates on a cyclic structure by reporting the survivors as `unresolved`
rather than looping. Simultaneous start, latest-arrival rejoin recorded as a
`joinWaitsById` entry (once per join, not once per incoming branch) and
completion as the max over every terminal endpoint. A disabled branch keeps its
place but contributes zero duration — otherwise hiding a branch would stretch
the route it is hidden from.

**Validation, not repair:** `resolveRouteBranches` never throws and never
fixes a broken structure. A deleted fork target, a split run or a cycle comes
back in `problems` with the runs still intact, so the route renders and the
author is told what is wrong. Silent repair during a render would rewrite
authored intent.

**Scope:** ROUTE-01 was too large for one slice, so it is now ROUTE-01a
(this: model + composition, headless), ROUTE-01b (rendering + camera),
ROUTE-01c (authoring, `[sign-off]`) and ROUTE-01d (export parity). COMPOSE-01
and COMPOSE-03 depend on the model, so they gate on ROUTE-01a; REV-05 needs
the authoring UI to settle, so it gates on ROUTE-01c.

**Link:** ROUTE-01a. 57 files / 808 tests green; no runtime behaviour change.

## 2026-08-27 — the route list shows minors, and one numbering serves both views

**Decision:** The sidebar waypoint list renders the whole route. Minors appear
as indented child rows of the leg they shape, with a visible `minor` tag, a
grey shaping-dot glyph matching what the canvas actually draws, and an
`.sr-only` statement of the relationship — indentation alone would leave the
structure to layout (WCAG 2.2 1.3.1).

**Rationale — one numbering:** `src/utils/waypointNaming.js` now numbers the
route once (`1`, `1.1`, `1.2`, `2`, …) and both the list and the semantic
outline read from it. Before this, the outline numbered minors by route
position, so its "Minor waypoint 7" and the list's "Waypoint 7" named different
waypoints — a collision a screen-reader user moving between the two surfaces
would hit directly. Leg 0 is a real case, not a guard: deleting a major strands
its trailing minors ahead of every remaining major, and they read `0.1`, `0.2`
rather than borrowing the number of the major that now follows them.

**Rationale — reorder-visible, not reorder-able:** a minor is not draggable and
owns no ▲/▼. Its place inside a leg is authored on the canvas, and
`reorderWaypointBlocks` already moves it with its major; giving minors their
own reorder controls would reopen the 2026-08-18 data bug where rebuilding
majors in place silently reattached minors to different legs. A major instead
drags as its whole leg block, so the minors visibly travel to where the model
will actually put them. The `waypoints:reordered` payload stays majors-only.

**Alternatives rejected:** an ARIA tree (`role="treeitem"` + `aria-level`)
would have replaced the deliberate action-list semantics — each row is a native
button beside independent reorder/delete buttons — for hierarchy the `.sr-only`
line already conveys. Keeping the outline's route-position numbering and giving
the list its own scheme would have shipped two names per waypoint.

**Link:** UI-02. 56 files / 773 tests green; verified in production Chromium —
selection, rename, block reorder with minors travelling, autosave round-trip,
44 px rows, zero console entries. Generated Pages build v3.2.658.

## 2026-08-27 — inline rename detaches its blur listener before touching the DOM

**Decision:** `startRenameFor`'s `finish()` calls
`input.removeEventListener('blur', onBlur)` as its first statement, and returns
early when the input is no longer connected.

**Rationale:** replacing the focused input removes it from the tree, and Chrome
dispatches the resulting `blur` from *inside* that `replaceWith` call. The
re-entrant pass then replaced a node that no longer had a parent and threw
`NotFoundError` into the console on every successful Enter-committed rename.
An `isConnected` guard alone did not close it — the re-entry happens mid-swap,
while the node's connected flag is still set. Detaching the listener up front
removes the re-entry entirely, whatever the dispatch ordering. The `isConnected`
return still covers the other case: an app-side list rebuild (autosave, a
selection refresh) replacing the row while a rename is open, where the new row
already carries its own title span.

**Context:** pre-existing since the rename paths were unified, found live during
UI-02 verification rather than by any test — jsdom does not reproduce Chrome's
synchronous mid-mutation blur, so the regression test asserts the re-entrant
`finish()` cannot throw rather than reproducing the browser's exact ordering.

**Link:** UI-02a. `tests/waypointList.test.js`.

## 2026-08-27 — gate vocabulary splits blocking dependencies from evidence debt

**Decision:** Backlog gates now distinguish `[gated: X impl]` — waits on X's
code landing — from `[verify: …]`, an evidence residual that blocks nothing
downstream. ROUTE-01 and the COMPOSE chain move to `[ready]`/`[gated: … impl]`;
REV-05 re-gates onto UI-02 and ROUTE-01. Items also carry a short title and a
band so the roadmap table reads without cross-referencing.

**Rationale:** REV-03's implementation shipped at `bbc1c3f`; only physical
iOS/Android evidence is outstanding. Writing that as `[gated: REV-03]` parked
the entire Phase 5 chain behind evidence none of its successors needs — the
real dependency is a stable single pointer transaction, which exists. REV-05 is
the genuine exception: it wants the authoring UI to stop changing shape, and
the tickets still changing it are UI-02 and ROUTE-01, not REV-03.

**Cost if wrong:** ROUTE-01 builds branch authoring on a pointer layer whose
physical-device behaviour is unconfirmed. Accepted: the layer is green in
automation and production Chromium, and REV-03/REV-04 keep their honest
evidence residuals rather than being closed early.

**Link:** backlog refactor, 2026-08-27.

## Archived: 2026-08-17 → 2026-08-26 — see archive/decision-log-2026-08-17-to-2026-08-26.md
## Archived: 2026-06 — see archive/decision-log-2026-06.md
## Archived: 2026-04 — see archive/decision-log-2026-04.md

<!-- FILE: pm_skills/project/doc-deltas.md -->

# Doc-deltas

<!-- Capture-only ledger of pending protected-doc reconciliations. Append one
     line per delta; the edit detail is derived fresh at sync time. -->
<!-- Cold tier. Agents NEVER auto-read this file beyond the open-count line
     surfaced at session start. Read it in full only during a doc-sync pass
     (memory-maintenance.md → Doc-sync) or when the size check flags it.
     See AGENTS.md → "Before every task". -->
<!-- What belongs here: a protected doc (SPEC, ADR, or its kin — edit-on-request
     only) no longer describes current behaviour, and reconciling it needs
     explicit maintainer sign-off. This is sign-off DEBT, not work to pick —
     never mix it into backlog.md (the backlog/wish-list boundary precedent). -->
<!-- Capture, don't rewrite: append ONE line naming the doc and the delta; do
     NOT write edit instructions here. Inventories balloon when they hold the
     fix (the DOC-1 lesson) — the fix is regenerated from the source entry when
     the doc-sync pass runs. ADR status closures (Proposed → Accepted) are a
     first-class delta type. -->
<!-- Format: one checkbox line, oldest at the top. Tick (`[x]`) when the
     doc-sync pass applies the edit; delete ticked lines at the next prune.
     Example:
     - [ ] 2026-07-16 SPEC §6 — entity model is 11 not 9 (source: PERF-1e) -->
<!-- Threshold: WARN past ~10 open or oldest > 30 days → propose a doc-sync
     pass. See pm_skills/memory-policy.md. -->

## Open

<!-- FILE: pm_skills/project/file-map.md -->

# File Map

<!-- file-map-index -->
<!-- 288 file(s) across 12 section(s); regenerate with pm_skills/scaffold/gen-file-map.mjs -->
- `(root)` — 14 file(s)
- `.devin` — 2 file(s)
- `.github` — 3 file(s)
- `_Joe` — 45 file(s)
- `docs` — 20 file(s)
- `images` — 6 file(s)
- `reviews` — 7 file(s)
- `scripts` — 4 file(s)
- `specs` — 15 file(s)
- `src` — 97 file(s)
- `styles` — 6 file(s)
- `tests` — 69 file(s)
<!-- /file-map-index -->

## (root)

- `AGENTS.md` — Project-wide agent contract: product boundaries, invariants, workflow, documentation and memory rules
- `CLAUDE.md` — Claude Code adapter importing the shared `AGENTS.md` contract without duplicating project knowledge
- `DEV-INFRASTRUCTURE.md` — Canonical build, test, version, deployment and owned-runtime lifecycle contract
- `README.md` — Product overview, user/developer quick start, architecture, persistence/export behaviour and glossary
- `Route Plotter v3.code-workspace` — VS Code workspace definition for this repository
- `THIRD_PARTY_NOTICES.md` — Checked licence, copyright and source notices for the exact direct runtime and development dependencies
- `UI-STANDARDS.md` — Carbon-first UI, UoN/Okabe-Ito token and WCAG 2.2 AAA interaction contract
- `build.js` — esbuild/watch server plus clean staged production builds, explicit Pages allowlist, versioned static references and non-mutating build checks
- `index.html` — Single-page app shell (sidebar + canvas + controls)
- `package.json` — Project metadata and scripts
- `public-assets.json` — Owner-approved public image allowlist pinned to exact paths and SHA-256 hashes
- `push.js` — Clean-tree, current-branch Pages deploy helper with argv-safe commits and a non-mutating dry run
- `version.json` — Auto-incremented build number
- `vitest.config.js` — Vitest jsdom configuration, setup binding and test-file selection

## .devin

- `.devin/workflows/bugfix.md` — Devin adapter for the repository's pm-skills bug-fix workflow
- `.devin/workflows/feature.md` — Devin adapter for the repository's pm-skills feature workflow

## .github

- `.github/SECURITY.md` — Private vulnerability-reporting route, safe evidence guidance and supported-code scope
- `.github/SUPPORT.md` — Best-effort public Issues support boundary with safe-sharing and no-SLA guidance
- `.github/workflows/ci.yml` — Read-only Node CI: frozen install plus the canonical test/build/restart-safety gate

## _Joe

- `_Joe/design docs/Colour.html` — Maintainer-owned colour exploration reference; not application source
- `_Joe/design docs/UI Audit - Carbon + Nielsen.md` — Maintainer-owned Carbon/Nielsen UI audit reference
- `_Joe/design docs/UI from ChatGPT` — Maintainer-owned saved UI design discussion
- `_Joe/design docs/saved/Archive/automatic_version_display_with_server.md` — Archived version-display/server design note
- `_Joe/design docs/saved/Archive/route_plotter_v3_styling_pack spec/route_plotter_v3_components_uon_carbon.css` — Archived UoN/Carbon component-style proposal
- `_Joe/design docs/saved/Archive/route_plotter_v3_styling_pack spec/route_plotter_v3_tokens_uon_carbon.css` — Archived UoN/Carbon design-token proposal
- `_Joe/design docs/saved/Archive/route_plotter_v3_styling_pack spec/route_plotter_v3_uon_integrated_design_system.md` — Archived integrated UoN design-system specification
- `_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/route_plotter_v3_map_ink_tokens_optional.css` — Archived optional map-ink token proposal
- `_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/route_plotter_v3_swatch_picker.css` — Archived swatch-picker CSS prototype
- `_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/route_plotter_v3_swatch_picker.js` — Archived swatch-picker JavaScript prototype
- `_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/route_plotter_v3_swatch_picker_spec.md` — Archived swatch-picker interaction specification
- `_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/swatch_picker_demo.html` — Archived standalone swatch-picker demo
- `_Joe/design docs/saved/Archive/route_plotter_v3_wcag_aaa_intent_consolidated.md` — Archived consolidated WCAG AAA intent
- `_Joe/design docs/saved/UoN Colours from UoN ER.html` — Saved UoN colour-source evidence
- `_Joe/design docs/saved/WAVE Report of Route Plotter v3.1.506.html` — Saved WAVE accessibility report for an earlier build
- `_Joe/design docs/saved/route_plotter_v3_1_400_ux_wcag_aaa_review.md` — Saved UX/WCAG AAA review of an earlier build
- `_Joe/design docs/saved/ui_list.md` — Maintainer-owned inventory of UI elements
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.35.38 1440x900.png` — Archived 1440×900 baseline UI audit screenshot
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.35.43 1440x900 Keyboard shortcuts expanded but not brililant visual cue they are below or expanded.png` — Archived keyboard-shortcuts disclosure screenshot
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.35.53 scrolled down to show shortcuts.png` — Archived scrolled keyboard-shortcuts screenshot
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.36.00 scrolled to end of shortcuts.png` — Archived end-of-shortcuts screenshot
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.39.51 waypoints initially placed.png` — Archived initial-waypoint state screenshot
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.40.46 mid play.png` — Archived mid-playback screenshot
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.41.10 all left sidebar expanded using full page image capture plugin.png` — Archived full-page expanded-sidebar screenshot
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.41.10 all left sidebar expanded.png` — Archived expanded-sidebar viewport screenshot
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.42.40 export drop down clicked.png` — Archived Export-menu screenshot
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.42.43 examples drop down clicked.png` — Archived Examples-menu screenshot
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.43.05 edit switch toggled - warning message causes new line on title.png` — Archived Edit-toggle/header-wrap defect screenshot
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.45.20 2560 x 1440.png` — Archived 2560×1440 responsive audit screenshot 1
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.45.26 2560 x 1440.png` — Archived 2560×1440 responsive audit screenshot 2
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.45.33 2560 x 1440.png` — Archived 2560×1440 responsive audit screenshot 3
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.45.49 2560 x 1440.png` — Archived 2560×1440 responsive audit screenshot 4
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 10.01.31 768x1024.png` — Archived 768×1024 responsive audit screenshot
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 10.01.46 960x540.png` — Archived 960×540 responsive audit screenshot
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 10.02.00 360x800.png` — Archived 360×800 responsive audit screenshot
- `_Joe/design docs/screenshots/Screenshot 2026-02-08 at 10.16.15 waypoint selected.png` — Archived selected-waypoint UI screenshot
- `_Joe/dev helper scripts/push_github.js` — Legacy maintainer deploy helper, superseded by root `push.js`
- `_Joe/dev helper scripts/restart_localhost.sh` — Legacy local restart helper, superseded by `scripts/restart.sh`
- `_Joe/dev notes/needs consolidating and deleting/Future Features.md` — Legacy maintainer feature notes; backlog is canonical
- `_Joe/dev notes/needs consolidating and deleting/Unit Tests.md` — Legacy maintainer test-planning notes
- `_Joe/dev notes/needs consolidating and deleting/dev guide.md` — Maintainer development guide for change mechanics and fragile areas
- `_Joe/dev notes/needs consolidating and deleting/example feature.md` — Legacy example feature-workflow note
- `_Joe/dev notes/opus chat on re-architecting event bus.md` — Archived EventBus architecture discussion
- `_Joe/dev notes/task list.md` — Legacy maintainer task list; project backlog is canonical
- `_Joe/useful prompt fragments.txt` — Maintainer-owned reusable prompt fragments

## docs

- `docs/app.js` — Generated, minified main application bundle served by GitHub Pages
- `docs/app.js.map` — Generated source map for the Pages application bundle
- `docs/examples/nervous-system-flow.zip` — Generated downloadable example project save (Pages output)
- `docs/examples/parm-aerial-walk.zip` — Generated downloadable example project save (Pages output)
- `docs/examples/uon-open-day.zip` — Generated downloadable example project save (Pages output)
- `docs/images/Court.png` — Generated Pages copy of the Court example background
- `docs/images/Garlic.jpg` — Generated Pages copy of the Garlic example background
- `docs/images/Nervous_System.jpg` — Generated Pages copy of the nervous-system example background
- `docs/images/PARM_Aerial.jpg` — Generated Pages copy of the PARM aerial example background
- `docs/images/Rocketry.jpg` — Generated Pages copy of the Rocketry example background
- `docs/images/UoN_map.png` — Generated Pages copy of the UoN map example background
- `docs/index.html` — Generated, version-injected Pages application shell
- `docs/meta.json` — Generated build/version metadata used for readiness and artifact checks
- `docs/player.js` — Generated standalone-export player bundle fetched and inlined by the app
- `docs/styles/context-menu.css` — Generated Pages copy of context-menu styles
- `docs/styles/dropdown.css` — Generated Pages copy of dropdown styles
- `docs/styles/main.css` — Generated Pages copy of the core application styles
- `docs/styles/swatch-picker.css` — Generated Pages copy of swatch-picker styles
- `docs/styles/tokens.css` — Generated Pages copy of design tokens
- `docs/styles/tooltip.css` — Generated Pages copy of tooltip styles

## images

- `images/Court.png` — Built-in Court example background
- `images/Garlic.jpg` — Built-in Garlic example background
- `images/Nervous_System.jpg` — Built-in nervous-system example background
- `images/PARM_Aerial.jpg` — Built-in PARM aerial example background
- `images/Rocketry.jpg` — Built-in Rocketry example background
- `images/UoN_map.png` — Built-in UoN map example background

## reviews

- `reviews/README.md` — Public-safe review dossier index, provenance and
  cross-project filename guard
- `reviews/read-only-comprehensive-repository-review-prompt.md` — Original
  read-only review brief retained as historical provenance, not active policy
- `reviews/route-plotter-review-finding-crosswalk-2026-08-26.md` — Original
  RP-01–RP-18 findings mapped to shipped work and residual assurance tickets
- `reviews/route-plotter-review-headlines-for-novices-2026-08-26.md` —
  Plain-language pre-remediation health snapshot with an explicit stale-state
  warning
- `reviews/route-plotter-review-remediation-continuation-prompt-2026-08-26.md`
  — Paste-ready, path-based continuation contract for the next development chat
- `reviews/route-plotter-v3-comprehensive-repository-review-2026-08-26.md` —
  Full historical Route Plotter review at commit cec0191, public-path sanitised
- `reviews/route-plotter-continuation-prompt-2026-08-27.md` — Current
  paste-ready continuation prompt; work is driven by the PM-Skills backlog

## scripts

- `scripts/README.md` — usage reference for the maintainer scripts
- `scripts/build-examples.mjs` — Assembles the downloadable example project
- `scripts/build.sh` — maintainer wrapper: `npm run build` into docs/ (`--test`, `--help`)
- `scripts/restart.sh` — Exact owned-process stop/start/status wrapper: refuse foreign listeners, record process identity and verify HTTP 200

## specs

- `specs/dot-crowd-navigator/AGENTS-spec.md` — Archived dot-crowd product/invariant specification; reference, not live agent policy
- `specs/dot-crowd-navigator/README.md` — Provenance and navigation guide for the salvaged dot-crowd material
- `specs/dot-crowd-navigator/app-overview.md` — Archived verbatim application overview from the dot-crowd fork
- `specs/dot-crowd-navigator/project-memory/architecture.md` — Archived fork architecture memory used as design evidence
- `specs/dot-crowd-navigator/project-memory/backlog.md` — Archived fork backlog showing the salvaged feature intent
- `specs/dot-crowd-navigator/project-memory/brief.md` — Archived fork product brief
- `specs/dot-crowd-navigator/project-memory/conventions.md` — Archived fork coding and product conventions
- `specs/dot-crowd-navigator/project-memory/decision-log.md` — Archived fork decision history
- `specs/dot-crowd-navigator/project-memory/file-map.md` — Archived fork source-role map
- `specs/dot-crowd-navigator/recovered-src/GraphInteractionHandler.js` — Recovered graph-editor interaction source retained for pattern mining
- `specs/dot-crowd-navigator/recovered-src/GraphRenderer.js` — Recovered graph-editor rendering source retained for pattern mining
- `specs/dot-crowd-navigator/recovered-src/index.html` — Recovered graph-editor shell retained as historical reference
- `specs/dot-crowd-navigator/recovered-src/main.js` — Recovered fork orchestrator retained as historical reference
- `specs/dot-crowd-navigator/tests-salvage/SimulationState.test.js` — Salvaged simulation-state behavioural contract; superseded API reference only
- `specs/dot-crowd-navigator/tests-salvage/SwarmEngine.test.js` — Salvaged swarm-engine behavioural contract used to reconstruct deterministic flow

## src

- `src/app/backgroundLoading.js` — Detached user/example background decoding with compressed-byte retention and latest-request commit guards
- `src/app/camera.js` — camera keyframe UI, actual-major mixed-state sync, camera state evaluation and zoom-transition warnings
- `src/app/crowds.js` — Crowd layers mixin: layers strip and selection plus single-writer first-emitter controls, seeded variation, one-step Re-roll and the accessible busyness-envelope graph
- `src/app/editorPanel.js` — Waypoint list/editor sync, actual write-target resolution, transient mixed-state overlays and card-action state/transactions
- `src/app/exporting.js` — Video/HTML export flows, summary UI and exact pre-export transport/timing restoration
- `src/app/network.js` — Network editing mixin (Phase 4): Guide-card entry point (Edit network + auto-enter), pointer routing into NetworkEditService, node/edge/control hit-testing on the engine's edge polylines, Node/Edge card wiring, traffic-share readout, restore re-binding
- `src/app/operationGeneration.js` — Project-generation, per-channel request-token and edit-revision helpers for stale async-work rejection
- `src/app/pathTiming.js` — path recalc, easing, segment/leg timing, duration updates
- `src/app/persistence.js` — Transactional bounded project/ZIP staging, commit and rollback; honest autosave recovery, save revisions and the shared coordVersion-9 snapshot including timing and visual references
- `src/app/playback.js` — Single keyboard-command path, canonical transport/JKL, preview mode, demand-driven render keepalive and time display
- `src/app/pointer.js` — canvas pointer fallbacks and hit-testing
- `src/app/privacy.js` — Explicit export disclosures plus fixed-schema diagnostics preview, public/private support hand-off, exact-address fallback and modal recovery
- `src/app/projectReset.js` — Testable Clear All transaction: invalidate async work, clear bytes/model/UI, reset the visual reference, cancel writers and establish one empty baseline
- `src/app/sceneOutline.js` — EventBus integration and sole mutation/undo/autosave owner for stable-ID semantic scene-outline commands, with shared plain crowd-field vocabulary
- `src/app/startup.js` — Testable startup sequence: await autosave recovery before selecting a default background
- `src/app/undoRedo.js` — Undo/redo model, selection and inspector-scope restoration; reference-aware asset sweeping and rollback-safe interactive image admission with minimum history loss
- `src/app/viewport.js` — Responsive canvas/panel bounds, first-authored-canvas visual-reference seeding, coordinate conversion, aspect handling and manual zoom
- `src/app/wiringBus.js` — EventBus + AnimationEngine subscriptions, including card-action availability refresh and compatible already-saved image-edit signalling
- `src/app/wiringControllers.js` — UIController/InteractionHandler event connections
- `src/app/wiringDom.js` — DOM control and delegated card-action wiring, transient mixed-state reset, and detached transactional custom marker/route-head image uploads
- `src/assets/README.md` — Provenance and bundling boundary for reviewed first-party visual assets
- `src/assets/drone-head.png` — Reviewed 512 px RGBA quadcopter route-head preset, inlined into both runtime bundles
- `src/components/ContextMenu.js` — Right-click menu (canvas waypoints + empty canvas): Carbon menu anatomy, arrow-key navigation, aria-disabled reasons, focus restore (Phase 3.5)
- `src/components/Dropdown.js` — Accessible dropdown menus
- `src/components/ParamTooltip.js` — Click-label parameter tooltips (Carbon pattern)
- `src/components/SwatchPicker.js` — Okabe-Ito palette picker with exact custom, disabled and transient mixed-state synchronization
- `src/components/Tooltip.js` — Tooltip attachment
- `src/config/constants.js` — All tuneable values (animation, rendering, path, etc.)
- `src/config/helpContent.js` — Welcome modal and inline help HTML generators
- `src/config/keybindings.js` — Mouse + keyboard bindings (customisable via localStorage)
- `src/config/tooltips.js` — Tooltip definitions
- `src/controllers/SceneOutlineController.js` — Native-details/list/form renderer owning transient disclosure, focus and dirty-draft state while emitting model-free commands in the shared plain field vocabulary
- `src/controllers/SectionController.js` — Collapsible settings sections, waypoint/route/crowd/network scope switching, undo selection-state synchronization and deterministic native More keyboard activation
- `src/controllers/UIController.js` — Sidebar/list/slider sync; stable multi-selection scope and Leg headings; selection gestures; whole-selection pause, speed and area writes
- `src/core/EventBus.js` — Pub-sub event system
- `src/core/PlayerCore.js` — Pure timeline math (deterministic-timeline mandate): segment/pause/beacon-schedule builders + timeline↔path mappings; one evaluation path shared by play, scrub, and export
- `src/examples/index.js` — The three bundled example projects, built from the
- `src/handlers/InteractionHandler.js` — One captured Pointer Events transaction for mouse/touch/pen waypoint, area and network taps/drags; keyboard, drop, context-menu and wheel paths stay native
- `src/main.js` — RoutePlotter class: app entry + orchestrator core (constructor, init, model bookkeeping, render scheduling); attaches the `src/app/*` mixins to its prototype
- `src/models/AnimationState.js` — Playback state, canonical seek-derived timing/pause state and exact transport snapshots
- `src/models/Emitter.js` — Persisted dot-stream parameters, two-to-eight-handle busyness envelope and guaranteed-changing authoring seed; no transient runtime state
- `src/models/FlowLayer.js` — Bounded graph/hero-route guide plus emitters, with strict endpoint and persisted-data validation
- `src/models/GraphEdge.js` — Weighted directed edge with control points
- `src/models/GraphModel.js` — Node/edge collection: CRUD, referential integrity, adjacency (owned by FlowLayer)
- `src/models/GraphNode.js` — Flow-network node (normalised pos, entry/exit type)
- `src/models/ImageAsset.js` — Custom image references (marker, path head)
- `src/models/Scene.js` — Ordered flow layers (drawn beneath the hero route); serialises as the coordVersion 9 `scene` block
- `src/models/Waypoint.js` — Waypoint data model (normalised coords, style, camera, area)
- `src/models/index.js` — Barrel exports for canonical project and flow-scene models
- `src/player/PlayerApp.js` — Headless app core for exported files: real service instances + adopted app mixins, separate authored timing/visual references and demand-driven camera keepalive; renders at export resolution and never imports ImageAssetService (jszip) or the exporting mixin (mediabunny)
- `src/player/playerAccessibility.js` — Privacy-safe aggregate exported-scene summary and action-driven transport announcements
- `src/player/playerEntry.js` — Exported-page boot: background decode, transport controls, keyboard, resize; exposes `window.__routePlotterPlayer` debug handle
- `src/services/AnimationEngine.js` — Demand-driven preview scheduler plus transport (play/pause/seek/reverse) and wait-event edge-detection; all timeline mapping delegates to PlayerCore and export can suspend preview frames
- `src/services/AreaDrawingService.js` — Polygon area drawing mode
- `src/services/AreaEditService.js` — Area highlight repositioning and vertex editing
- `src/services/AreaHighlightRenderer.js` — Per-waypoint area geometry with project-reference-scaled border rendering
- `src/services/BeaconRenderer.js` — Animated waypoint effects (ripple, glow, pop, grow, pulse); closed-form: each animator's `sync(localSec, win, options)` derives state from a timeline-local clock (schedules from PlayerCore via `engine.beaconSchedules`)
- `src/services/CameraService.js` — Per-major-waypoint zoom with target-aware continuous interpolation and settling; `toMajorKeyframes()` drops minors (minors shape geometry, not zoom)
- `src/services/CoordinateTransform.js` — Image ↔ canvas coordinate conversion
- `src/services/DiagnosticsService.js` — Pure fixed-schema technical diagnostics with bounded allowlisted fields and URL/path/filename redaction
- `src/services/DotRenderer.js` — Batched swarm-dot drawing: one canvas path per (colour, size) group, sizes via `scaleSizeClamped()` (Phase 3)
- `src/services/HTMLExportService.js` — Self-contained HTML export: embeds snapshot/background and the exact-build same-origin player bundle; owns the exported shell
- `src/services/ImageAssetService.js` — Strict bitmap validation, bounded ZIP staging/export, deduplication and deterministic unreachable-asset sweeping
- `src/services/MotionVisibilityService.js` — Stateless timeline-derived path, waypoint and background visibility, including comet trails
- `src/services/NetworkEditService.js` — Network edit mode (Phase 4): pen state machine (chaining, drags, bends, Esc ladder, mode keys), banner, node/edge selection events, and the guide/overlay canvas rendering (edge geometry via SwarmEngine's cache)
- `src/services/PathCalculator.js` — Catmull-Rom spline, corner-slowing reparameterisation, curvature; `legTimingLengths()` gives per-major-leg timing lengths (progress-span basis)
- `src/services/RenderingService.js` — Canvas drawing and stable short-edge reference scaling for path, markers, labels, effects and overlays; static `VECTOR_LAYERS` drives draw order
- `src/services/StorageService.js` — Honest bounded localStorage writes with debounce, change detection, deterministic flush/cancel and clear
- `src/services/SwarmEngine.js` — Deterministic flow-layer dot evaluator: pure `evaluate(timelineMs, layer, context)`, seeded release-density inversion, weighted graph walks, four lifecycle modes and per-edge PathCalculator caches
- `src/services/TextLabelService.js` — Text label layout, fade, auto-positioning
- `src/services/UndoService.js` — 150-state undo/redo history with non-mutating save previews and validated additional oldest-prefix discard
- `src/services/VideoExporter.js` — Runtime-probed MP4/WebM export with one frame plan, visibility-safe MediaRecorder pacing and rollback-safe WebCodecs cleanup
- `src/services/index.js` — Barrel exports for the core application services used by consumers
- `src/utils/CatmullRom.js` — Catmull-Rom spline interpolation
- `src/utils/Easing.js` — Easing functions (linear, quad, cubic, etc.)
- `src/utils/assetReferences.js` — Image-ID reachability collector and pure minimum-oldest-history admission planner for count/byte/pixel limits
- `src/utils/branchTiming.js` — Pure per-run branch timing: builds each run's
- `src/utils/busynessEnvelope.js` — Pure busyness-handle normalisation/validation, segment-area compilation and inverse-density sampling for seeded release times
- `src/utils/crowdArrival.js` — Pure crowd-arrival maths shared with
- `src/utils/entityId.js` — Shared persisted structural-ID length boundary that leaves authored display text untouched
- `src/utils/focusTrap.js` — Modal inerting, focus containment/wrap, Escape handling and origin-focus restoration
- `src/utils/graphRouting.js` — Shared directed departures, overflow-safe weight normalisation and stable whole-percentage traffic shares
- `src/utils/index.js` — Barrel exports for Catmull-Rom and easing utilities
- `src/utils/mixedControlState.js` — DOM-only mixed-value comparison, select/range/checkbox presentation and concrete-input reset helpers
- `src/utils/pathHeadPresets.js` — Built-in route-head registry, shared image decoding and custom/preset hydration boundary
- `src/utils/pathWidthScale.js` — Log-scale thickness slider ↔ width (1–40px) mapping; single source shared by the DOM wiring and UIController bulk edits (Phase 3.5)
- `src/utils/renderReference.js` — Pure visual-reference migration and current-to-authored short-edge scale calculation
- `src/utils/routeAnchors.js` — Pure one-way route→crowd binding: resolves
- `src/utils/routeBranches.js` — Pure hero-route branch resolution: cuts a
- `src/utils/routeTrace.js` — Pure trace of the hero route into a crowd guide
- `src/utils/safeColor.js` — Strict persisted hexadecimal-colour grammar with opt-in exact transparent sentinel
- `src/utils/sceneSemantics.js` — Pure bounded DOM-free projection and collision-safe semantic keys for route/crowd/network/polygon models
- `src/utils/segmentHitTest.js` — Pure leg hit-test geometry: polyline nearest-point projection, waypoint→point-index mapping, leg ownership + midpoint (Phase 4 canvas affordances; used by pointer mixin and hover render layers)
- `src/utils/snapToAngle.js` — Angle-snap geometry for shift-drag waypoint placement (moved out of main.js in the Phase 1 split)
- `src/utils/uiReadouts.js` — Shared reference-pixel, effective-amplitude and background-overlay readout formatting with accessible range-value synchronisation
- `src/utils/waypointCardActions.js` — Pure Reset/Apply-onward field ownership, target filtering, semantic no-op comparison and effect metadata for waypoint cards
- `src/utils/waypointNaming.js` — Shared hierarchical route numbering

## styles

- `styles/context-menu.css` — Context menu styles (UoN tokens, 44px AAA targets)
- `styles/dropdown.css` — Dropdown component styles
- `styles/main.css` — Core responsive layout, sidebar/canvas reflow, 44 px controls, modal and application states
- `styles/swatch-picker.css` — Swatch picker grid (5×2, 44px AAA touch targets)
- `styles/tokens.css` — Design tokens: UoN palette, Okabe-Ito map palette, semantic colours, spacing
- `styles/tooltip.css` — Tooltip styles

## tests

- `tests/Emitter.test.js` — Emitter defaults, bounds, updates, collision-safe reseeding and persistence contracts
- `tests/FlowLayer.test.js` — Flow-layer guide, emitter CRUD and hydration/round-trip contracts
- `tests/GraphEdge.test.js` — Graph-edge direction, weight, control-point and serialisation contracts
- `tests/GraphModel.test.js` — Graph CRUD, adjacency, referential-integrity and hydration contracts
- `tests/GraphNode.test.js` — Graph-node type, normalised-position and serialisation contracts
- `tests/Scene.test.js` — Ordered flow-layer CRUD, movement, clearing and persistence contracts
- `tests/accessibilityAudit.test.js` — REV-05 structural accessibility guard:
- `tests/areaEdit.test.js` — Screen-space area-handle hit targets and one-commit polygon editing through zoom/pan transforms
- `tests/assetAdmission.test.js` — Pure minimum-prefix image admission at exact count, 40 MiB and 48-million-pixel boundaries plus fail-closed inputs
- `tests/assetPruning.test.js` — Reference collection, deterministic sweep and transactional marker/head admission, redo and rollback contracts
- `tests/axeAudit.test.js` — Standing axe-core gate over the app shell across
- `tests/branchAuthoring.test.js` — ROUTE-01c contract: branch numbering,
- `tests/branchExportParity.test.js` — ROUTE-01d contract: branch links in
- `tests/branchHandle.test.js` — COMPOSE-04 contract: which waypoints are
- `tests/branchTiming.test.js` — ROUTE-01b contract: run timing, master
- `tests/busynessEnvelope.test.js` — Neutral, gradual, sudden, normalisation and strict-validation contracts for crowd release density
- `tests/crowdArrival.test.js` — COMPOSE-02 contract: onset/journey maths,
- `tests/crowds.test.js` — Crowd creation/layers/selection plus seeded variation, busyness graph/control transactions, seed-only Re-roll and custom-network guidance contracts
- `tests/diagnostics.test.js` — Fixed diagnostic schema, deterministic byte parity, hostile-field exclusion, redaction and no-network contracts
- `tests/example.test.js` — Unit tests (Waypoint, AnimationState, Path, EventBus, etc.)
- `tests/exampleProjects.test.js` — DEMO-01 living-fixture contract: every
- `tests/goldenFrames.test.js` — Scrub-vs-play golden harness: sequential/reverse/export-step == direct seek (full scene state incl. beacons); evaluation never mutates the timeline
- `tests/governance.test.js` — MIT metadata, exact dependency notices and approved security/support route contracts
- `tests/graphRouting.test.js` — Directed graph choices, backtrack avoidance, overflow-safe shares and stable 100-percent rounding
- `tests/htmlExportCache.test.js` — HTML export fetches the standalone player bundle for the exact application build
- `tests/imageAssetRoundTrip.test.js` — Persistence-safe image IDs and import→export→import asset round-trip contracts
- `tests/interactionPointer.test.js` — Pointer transaction contracts: exactly-once mouse/touch/pen taps, common threshold, capture/window terminal fallback, cancellation, mode priority, group snapshots and teardown
- `tests/mixedControlState.test.js` — Mixed comparison, accessible control presentation and user-input reset contracts
- `tests/mixins.test.js` — Mixin split guards: cross-mixin name-collision check, cluster spot-checks, snapToAngle unit tests
- `tests/modelBoundary.test.js` — Strict graph-endpoint and persisted emitter integer boundary contracts
- `tests/multiSelect.test.js` — Multi-select write-target rules, gestures/bulk actions/persistence, undo scope restoration, stable headings and honest per-control mixed-state integration
- `tests/networkEdit.test.js` — Network edit mode: pen chaining/loop-close, snap, drags + bends + cancel, Esc ladder + mode keys, guide-card auto-enter/exit rules, change pipeline, hit cascade, traffic-share readout, restore re-binding
- `tests/operationGeneration.test.js` — Latest-request/project-generation guards and original background-byte retention
- `tests/pathHeadPresets.test.js` — Drone preset metadata, native control, loader ownership and renderer-transform contracts
- `tests/performanceScheduling.test.js` — Manual-rAF scheduler contract: idle sleep, transport wake/coalescing, camera keepalive and export suspension/restore
- `tests/playerAccessibility.test.js` — Aggregate-summary privacy/counting and discrete/coalesced transport-announcement contracts
- `tests/playerApp.test.js` — Golden app-to-exported-player timeline, reset, reveal, swarm and text parity contracts
- `tests/playerCore.test.js` — PlayerCore builders, pause budgets, timeline windows, inverse mappings
- `tests/playerEntryAccessibility.test.js` — Exported-player summary, keyboard/transport live-region and playback-speed integration contracts
- `tests/privacy.test.js` — Export disclosures, byte-identical diagnostics, support navigation/address fallback, mode isolation, focus recovery and no automatic sharing
- `tests/projectLimits.test.js` — Adversarial image, model, ZIP/ZIP64 and detached-import resource-limit contracts
- `tests/projectReset.test.js` — Behavioral Clear All proof for stale writers/tokens, asset/reference removal and one empty non-undoable baseline
- `tests/publicationBoundary.test.js` — Approved-image hashes, CSP/same-origin shell, exact Pages inventory and manifest-tamper rejection
- `tests/releaseSafety.test.js` — Clean-build rollback, versioned CSS references and dry-run deployment safety contracts
- `tests/renderReference.test.js` — Reference migration, aspect/export scaling, label clamp, camera, area-border and no-timeline-mutation contracts
- `tests/restartSafety.test.sh` — Shell contract for exact owned-process restart, readiness and foreign-listener refusal
- `tests/reviewAccessibility.test.js` — Keyboard semantics, modal focus, responsive/support/privacy shell, disclosure, card-action and accessible crowd-variation/busyness UI contracts
- `tests/reviewPersistence.test.js` — Autosave honesty, transactional load/rollback, save revisions and undo-image restoration regressions
- `tests/reviewTimeline.test.js` — Stateless comet, canonical transport/export and timing-invalidation review regressions
- `tests/routeAnchors.test.js` — COMPOSE-01 contract: node/emitter binding,
- `tests/routeBranches.test.js` — ROUTE-01a contract: branch resolution and
- `tests/routeTrace.test.js` — COMPOSE-03 contract: trace fidelity across
- `tests/safeColor.test.js` — Accepted hexadecimal forms, hostile CSS rejection and exact transparent-sentinel opt-in
- `tests/sceneOutline.test.js` — Semantic projection/controller security, focus, disclosure, draft, stable-key and bounded-scale contracts
- `tests/sceneOutlineApp.test.js` — App command mutation, selection, undo/autosave, reset and model-boundary integration contracts
- `tests/scenePersistence.test.js` — coordVersion-9 scene variation/seed autosave, ZIP, migration and undo round-trip contracts
- `tests/segmentHitTest.test.js` — Pure polyline projection, leg ownership and midpoint geometry contracts
- `tests/setup.js` — Vitest jsdom setup (uses defineProperty for getter-only jsdom globals)
- `tests/startup.test.js` — Recovery-before-default-image startup ordering contracts
- `tests/swarmEngine.test.js` — SwarmEngine behavioural spec: hash pins, serialized-clone determinism, busyness density, release variation, weighted junctions, lifecycles, route guide, wobble and cache invalidation
- `tests/swatchPicker.test.js` — Exact preset/custom/mixed colour state, external refresh and complete disabled-fieldset contracts
- `tests/undoService.test.js` — Prospective-save parity, natural rollover, extra oldest discard, redo preservation/invalidation and rejected-input immutability
- `tests/units.test.js` — Extended unit coverage (state transitions, coordinate round-trips, path maths, waypoint serialisation/inheritance)
- `tests/vectorLayers.test.js` — VECTOR_LAYERS registry: canonical order + per-layer visibility-guard dispatch
- `tests/videoExporter.test.js` — Endpoint-inclusive frame planning, visibility throttling, cancellation and complete MediaRecorder/WebCodecs cleanup
- `tests/waypointCardActions.test.js` — Reset/Apply-onward ownership, no-op reasons, content preservation, copy semantics and one-transaction integration contracts
- `tests/waypointList.test.js` — UI-02 sidebar list contract: whole-route
- `tests/waypointNaming.test.js` — Route numbering and its agreement with
- `tests/wiringBus.test.js` — Waypoint edit event compatibility, card-action refresh and exactly-once undo/render/list/autosave routing

<!-- FILE: pm_skills/project/tickets/REV-03.md -->

# REV-03 — Unified pointer transactions

> **Status:** Implementation complete; automated and production-Chromium
> evidence green. Physical mobile evidence remains the closure gate.

## Intent

Make mouse, touch and pen authoring use one explicit gesture transaction so a
single physical action cannot mutate the project twice or leave a drag stuck.

## Contract

- One primary left pointer owns a gesture from down through captured up,
  cancellation or unexpected capture loss. Other pointers are ignored.
- Movement of at most 3 CSS pixels remains a tap. Crossing that threshold
  starts at most one waypoint, area-handle or network drag; a completed drag
  can never fall through into a tap.
- Pointer cancellation, capture loss, project replacement and window blur
  restore the gesture-start geometry and create no undo or autosave commit.
- A tap on one member of a multi-selection collapses to it. Dragging any
  selected member preserves the group, makes that member primary and moves
  every selected waypoint by one shared, bounds-safe delta.
- Group movement is derived from the immutable gesture-start snapshot, keeps
  relative geometry, recalculates once per frame and commits one undo state.
- Native background file drop, list reordering, context menu, wheel zoom and
  player range-input behaviour remain separate native-control paths.
- The canvas has an intentional touch-action policy for reliable authored
  drags; physical-device evidence must distinguish page navigation from canvas
  authoring and must not be inferred from a responsive viewport.

## Done when

- InteractionHandler registers one Pointer Events path with capture and
  removable listeners; no touch-to-mouse synthesis or canvas click mutation
  owner remains.
- Mouse, touch and pen contract tests prove exactly-once taps, threshold
  classification, pointer identity, outside release, cancellation idempotence,
  mode priority and complete teardown.
- Waypoint group drag, area centre/vertex drag and network node/control/edge
  drag share the same commit/cancel boundary; no-op releases commit nothing.
- Focused suites, the canonical gate and production Chromium checks are green.
- A real iOS Safari and Android Chrome pass records tap, drag, cancellation,
  page navigation and rotation behaviour before REV-03 is evicted as shipped.

## Evidence boundary

Chromium touch emulation and synthetic pen PointerEvents are useful automated
browser evidence, but they are not physical phone, tablet or stylus evidence.
The current development server is localhost-only, so real-device verification
needs an approved reachable build such as the already-public review branch or
an explicitly approved temporary LAN route.

## Evidence recorded 2026-08-26

- The Pointer Events contract suite covers mouse, touch and pen exactly-once
  taps, the common 3 px threshold, ownership, outside release, cancellation,
  area/network priority, group snapshots and complete listener teardown.
- Focused interaction and orchestration suites are green. The canonical gate
  passed 47 files / 669 tests, restart-safety and the non-mutating production
  build; the cold runtime then reached ready at v3.2.630.
- Production Chromium v3.2.629 formed a two-waypoint selection through real
  pointer input, released a bounds-safe group drag outside the canvas, created
  one undo entry and restored both points with one Undo. An early outside-drop
  check exposed premature capture release in the browser harness; idempotent
  window `pointerup`/`pointercancel` fallbacks now close that transaction.
- The 320 px and 390 px responsive layouts have no horizontal overflow, the
  canvas computes `touch-action: none`, and the browser console is clean.
- Still required before eviction: real iOS Safari and Android Chrome tap,
  drag, cancellation, page-navigation and rotation evidence.

## Constraints

Preserve configurable modifier semantics, angle snapping, existing network and
area model ownership, linear-project persistence, deterministic rendering and
the one-undo-per-gesture rule. Do not broaden this ticket into list drag/drop,
player controls or route-branch interaction design.

<!-- FILE: pm_skills/project/trajectory.md -->

# Trajectory

<!-- Shipped-work narrative. The story of what changed over time, in chunks. -->
<!-- Warm tier. Agents do NOT auto-read this every task. Read it on demand:
     during roadmap-refactor.md, release.md, or when reconstructing what
     already shipped. See AGENTS.md -> "Before every task". -->
<!-- Compress on ship. One line per item: the outcome, not the implementation.
     The WHY lives in decision-log.md; the per-file roles live in file-map.md.
     Never paste a decision-log entry in here. A pointer is enough. -->
<!-- Keep every shipped ID individually greppable: start each line with the
     item ID. When one line covers a group of related sub-items, spell out
     each ID (e.g. WL-19a, WL-19b, ... WL-19h) rather than a range, so an
     ID-level reconcile can find them all. -->
<!-- Structure: newest phase/milestone at the top. Group items by the phase or
     milestone they belong to, with a one-line Outcome per phase. -->
<!-- Budget: see AGENTS.md -> "Memory size budgets". Over budget -> prune-memory.md
     moves the oldest phases to archive/trajectory/trajectory-NNNN-<range>.md and
     adds a row to archive/INDEX.md. Archives are append-only; never rewrite. -->

## Programme close-out (2026-08-27)

PM — The original review is fully dispositioned: RP-01…RP-18 all shipped or
ticketed, and the review's Optional roadmap and unresolved uncertainties —
never covered by the RP crosswalk — audited into DEPLOY-01, REL-01, PERF-01,
LEGAL-01 and ICE-03. The backlog is now the single source of truth for what to
do next. (2026-08-27) — see decision-log.

## Accessibility assurance (in progress 2026-08-27)

REV-05a — axe-core joined the gate (dev dependency, owner-approved): 48 rules,
zero violations across WCAG 2.0/2.1/2.2 A/AA/AAA and best practice, verified
live with contrast evaluated for real. (2026-08-27) — see decision-log.

PM — Quarantine cleared on owner verdicts: two cut, two recovered as REVEAL-01
(spotlight reveal that fades behind the head — investigated and confirmed not
currently possible) and LABEL-01 (auto-position timing and discoverability).
(2026-08-27) — see decision-log.

REV-05 — The structural audit, AAA contrast sampling and 400%-zoom reflow ran
green in production Chromium; two AAA failures found and fixed (a 6.37:1 label
and a 37px skip link), and the structural half is now a permanent regression
test. (2026-08-27) — see decision-log.

## Showcase (shipped 2026-08-27)

DEMO-01 — Three example projects ship as downloadable `.zip` project saves and
open from the File menu: a plain labelled route, a branching campus route with
a crowd traced from it, and a weighted signal network. Built from the live
models and loaded through the ordinary project path, so they double as living
fixtures. (2026-08-27) — see decision-log.

## Phase 5 — crowds bound to the route (in progress 2026-08-27)

COMPOSE-04 — A waypoint a bound crowd enters from carries a branch "+" handle:
clicking it arms the same fork gesture Alt+click does, hit-tested directly so a
touch tap reaches it. (2026-08-27) — see decision-log.

DEV-01 — `restart.sh` no longer refuses to boot because a browser left a closed
client socket on the port; the check matches listeners only. (2026-08-27) — see
decision-log.

COMPOSE-02 — "Wait here for this crowd" solves, in closed form, the wait a
waypoint needs so the head does not leave before the last dot arrives, and
bakes it as an ordinary authored pause. (2026-08-27) — see decision-log.

COMPOSE-03 — A crowd's network can be traced from the route: a node per major,
an edge per leg carrying that leg's minors as control points, and branches
traced as edges leaving the fork and returning to the rejoin. The copy is the
author's to reshape and each node stays bound to its waypoint. (2026-08-27) —
see decision-log.

COMPOSE-01 — A crowd can follow the route: a graph node binds to a waypoint's
position and an emitter's release binds to a route moment (arrival, pause end
or route completion), both resolved from live route state. Authored positions
and windows are never rewritten, a broken binding falls back to them with a
warning, and unanchored crowds evaluate byte-for-byte as before. (2026-08-27)
— see decision-log.

## Phase 5 — split hero routes (in progress 2026-08-27)

ROUTE-01d — A branched route exports: the snapshot carries its branch links,
the standalone player rebuilds the identical structure and master timeline, and
a branch that outlives the trunk extends the timeline instead of being cut off.
(2026-08-27) — see decision-log.

ROUTE-01c — Branches are authorable: Alt+click a waypoint to fork, click to
place; drag a branch's end onto a waypoint to rejoin (again to end it there).
Branch rows read `2·B1`, indented and tagged, with a ⑂ badge on the fork's
marker; the scope chip, the row and the semantic outline all number a branch
waypoint the same way. (2026-08-27) — see decision-log.

ROUTE-01c-a — `findWaypointAt` takes an exclusion, so a drop hit-test no longer
finds the waypoint being dragged. (2026-08-27) — see decision-log.

ROUTE-01b — Branches now draw and animate: each gets its own spline anchored
at its fork (and rejoin), its own head, and its own progress resolved from
master timeline time through the same PlayerCore mapping the trunk uses. The
follow-camera keeps tracking the trunk head. (2026-08-27) — see decision-log.

ROUTE-01a — The hero route can now describe branches: additive, null-defaulting
branch links on Waypoint, a pure resolver that cuts a route into trunk plus
contiguous branch runs and reports structural problems instead of repairing
them, and a deterministic master-timeline composer implementing simultaneous
fork start, latest-arrival rejoin and universal completion. Headless — linear
projects keep their exact serialized shape and timeline. (2026-08-27) — see
decision-log.

## Inspector foundation (shipped 2026-08-27)

UI-02 — The waypoint list now shows the whole route: minors appear as indented,
selectable, renameable rows under the leg they shape, numbered `major.minor` by
the same routine the semantic outline uses, and a major visibly drags and
reorders as its whole leg block. (2026-08-27) — see decision-log.

UI-02a — Inline rename no longer throws NotFoundError on every successful
commit: `finish()` detaches its own blur listener before replacing the input.
(2026-08-27) — see decision-log.

DOC-01 — `AGENTS.md` is one shared Codex/Claude contract with a tiered read
policy and a minimal `CLAUDE.md` adapter; stale prompt paths and the duplicated
budget table are gone. (2026-08-26) — see decision-log.

## Route-head presets (shipped 2026-08-26)

HEAD-01 — A reviewed right-facing quadcopter is now a built-in route head with
shared size, rotation, persistence, undo and standalone-export behaviour, while
custom image ownership stays unchanged. (2026-08-26) — see decision-log.

## Maintenance (shipped 2026-08-26)

MAINT-01 — Superseded timing/visibility helpers, a permanently inert export
warning and their orphaned cache state are removed without changing route,
playback, persistence or export behaviour. (2026-08-26) — see decision-log.

## Phase 6 — resolution-independent rendering (shipped 2026-08-26)

SCALE-01 — Projects now preserve map-bound authored sizes through a stable
reference render space across editor, HTML and video resolutions, independently
of normalised geometry and the authored timeline. (2026-08-26) — see
decision-log.

## Performance (shipped 2026-08-26)

REV-06 — Stable paused editor and standalone-player views now leave no animation
frame queued; transport changes and camera settling wake on demand while the
explicit export frame loop stays synchronous. (2026-08-26) — see decision-log.

## Crowd controls (shipped 2026-08-26)

CROWD-02 — Crowds now author whole-release busyness with a direct line graph,
two-to-eight handles, gradual or sudden spans and equivalent exact controls;
the seeded profile is undoable and identical after reload and in export.
(2026-08-26) — see decision-log.

CROWD-03 — Crowds now expose plain-language seeded walking, pace, release and
route-choice variation, the exact reproducible seed and a one-step Re-roll
that changes the pattern without changing authored controls. (2026-08-26) —
see decision-log.

## Inspector foundation (shipped 2026-08-26)

UI-05 — Marker, On arrival, Label and Leg cards now reset the selected
waypoints to route style or apply one waypoint's settings to later applicable
waypoints as one accessible, undoable transaction; authored label text and
polygon geometry stay untouched. (2026-08-26) — see decision-log.

UI-04 — Multi-waypoint cards now compare each field's actual write targets and
show a transient, accessible Mixed state without changing saved projects;
choosing a value still performs the established shared edit. (2026-08-26) —
see decision-log.

UI-03 — Label text/background colour and opacity plus incoming camera zoom
transition are now editable under More, with exact custom-colour state,
multi-major writes, undo, reload and export-compatible persistence.
(2026-08-26) — see decision-log.

UX-02 — Label Size now edits its persisted 16–48 renderer-pixel value directly;
size, amplitude and background-overlay readouts expose their effective units
and accessible values; ambiguous names use plain language; and Pacing explains
Comet's intentional preview-tail extension. Stored project values, scaling and
timeline semantics are unchanged. (2026-08-26) — see decision-log.

UI-01 — Crowded inspector cards now keep their shortest complete task visible
and place refinements in one accessible native More disclosure, providing the
layout slot for advanced and crowd controls. (2026-08-26) — see decision-log.

## Review Phase 2 — semantic scene authoring (shipped 2026-08-26)

REV-02 — Route, crowd, emitter, custom-network and polygon structure is now
inspectable and authorable through a synchronized semantic outline; standalone
exports add aggregate scene context and discrete transport announcements.
(2026-08-26) — see decision-log.

## Support hand-off (shipped 2026-08-26)

SUPPORT-01 — Report a bug now previews one redacted diagnostic bundle before
any explicit copy, download or public-Issues hand-off, supplies a safe address
fallback and routes suspected vulnerabilities to private reporting.
(2026-08-26) — see decision-log.

## Phase 1 — live-app health and public boundary (shipped 2026-08-26)

KEY-01 — Undo, redo and Save now have one authoritative keyboard/button event
path; stale Tab navigation was removed. (2026-08-26) — see decision-log.

UX-01 — Waypoint scope now has a direct labelled Route target, avoiding
repeated back-arrow navigation. (2026-08-26) — see decision-log.

BUG-01 — Area-handle hit-testing now compares one coordinate space and remains
correct through viewport zoom and drag. (2026-08-26) — see decision-log.

QA-02 — Nudge undo grouping and editor restoration after undo/redo are pinned
as verified behaviour. (2026-08-26) — see decision-log.

CROWD-04 — Add crowd works without a hero route by creating a graph guide and
entering network authoring with neutral lifecycle copy. (2026-08-26) — see
decision-log.

CROWD-01 — Junction choices are edited together as normalised shares and
previewed with percentage text plus non-colour-only guide widths.
(2026-08-26) — see decision-log.

REV-08 — The public/share/support boundary is enforced by an explicit build
allowlist, CSP, safe style grammar, original-byte disclosure and previewed
redacted diagnostics. (2026-08-26) — see decision-log.

REV-09 — MIT terms, dependency notices, private vulnerability reporting and
best-effort GitHub Issues support now ship as checked governance contracts.
(2026-08-26) — see decision-log.

REV-10 — Custom marker and route-head images now use reference-aware asset
reachability, rollback-safe admission and minimum-oldest undo shortening at
the project limits; Clear, load, recovery and ZIP boundaries are pinned.
(2026-08-26) — see decision-log.

## Phase 0 — owner decisions and acceptance (closed 2026-08-26)

QA-01 — Owner accepted selection behaviour, standalone-player feel, major-leg
timing and the shipped 0.1×–10× segment-speed range. (2026-08-26) — see
decision-log 2026-08-26.

REV-02, REV-08, REV-09, ROUTE-01, SCALE-01 — Owner signed off the
semantic-authoring, publication/privacy, governance, simultaneous split-route
and project-reference sizing contracts; each implementation moved to its
dependency phase. (2026-08-26) — see decision-log 2026-08-26.

## REV-01 — comprehensive repository-review remediation (shipped 2026-08-26)

REV-01 — Project recovery/import is transactional and bounded; autosave is honest and Clear All cannot revive stale work; timeline/export behaviour is deterministic; keyboard, modal and responsive reflow defects are repaired; and CI, clean Pages builds, deployment and restart scripts fail safely. The larger product, assurance and governance questions remain as REV-02–REV-10. (2026-08-26) — see decision-log 2026-08-26.


<!-- FILE: pm_skills/project/wish-list.md -->

# Wish-list

<!-- Capture inbox for unscoped ideas. Append one line; no structure required. -->
<!-- Cold tier. Agents NEVER auto-read this file. Read it only during an
     explicit triage pass — next-batch.md, or end-of-task.md / prune-memory.md
     when the size check flags it. See AGENTS.md -> "Before every task". -->
<!-- Boundary: this is PRE-triage — raw, unjudged ideas. The backlog Icebox
     is POST-triage — ideas already judged worth keeping. Promote items INTO
     backlog.md (Current, Next, or Icebox); never treat this as a second backlog. -->
<!-- Triage = promote or cut. Promoting MOVES the item into backlog.md. Cutting
     DELETES the line. No history is kept here — survivors live in the backlog. -->
<!-- Format: one plain bullet per idea, optionally a source. Append at the
     bottom; triage from the top. Example:
     - Idea in one line — (from: 2026-05-30 task) -->
<!-- Soft cap ~25 open items. Over budget -> end-of-task flags it and
     prune-memory.md runs a forced triage pass (not an archive). See
     AGENTS.md -> "Memory size budgets". -->

## Open

- Per-leg spline tension under Leg → More if ever wanted — per-waypoint segmentTension was retired unread; PathCalculator would need to consume it. — (from: 2026-08-18 Phase 3.5)
- Crowd editing extras still outside the roadmap: multi-emitter authoring (cards edit `emitters[0]` only) and strip drag-reorder via `Scene.moveFlowLayer`. Seed re-roll and release/intensity shaping moved to CROWD-02/CROWD-03 on 2026-08-26. — (from: 2026-08-18 Phase 4 layers strip)
- Network extras after REV-03: click-on-edge splits it with a node, node labels/rename, arrow-key nudge and a network context menu. Edge-weight visualisation moved to CROWD-01 on 2026-08-26. — (from: 2026-08-18 Phase 4 network edit)
- Mode banners are near-duplicates (area draw + network edit both inline-style their own) — extract a shared ModeBanner component. — (from: 2026-08-18 Phase 4 network edit)
- `pm_skills/scaffold/gen-file-map.mjs` silently drops wrapped role descriptions — it keeps only the first line of a multi-line entry, so re-running it flattened six `reviews/` roles to "(role needed)". — (from: 2026-08-27 UI-02)
- `npm run dev` leaves `docs/player.js.map` behind: the watch build emits a player sourcemap the production build's 17-file inventory does not, so the generated tree drifts from what is published. — (from: 2026-08-27 ROUTE-01b)
- Marquee / rubber-band selection on canvas — drag over empty space currently does nothing in edit mode; a selection rectangle is the natural next gesture. — (from: 2026-08-18 Phase 4 multi-select)

