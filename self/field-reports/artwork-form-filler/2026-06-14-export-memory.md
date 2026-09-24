<!-- field-report: project=artwork-form-filler · date=2026-06-14 · type=export
     · pm-skills=2.2.1 (installed with the initial commit 2c02f80 on 2026-06-13; never upgraded)
     · source=every Git blob under pm_skills/project/ at 02d414590a5f4a66714be8764b0039a5e4e7bc7a, taken 2026-09-24 by Claude Code (read from a scratch clone assembled from the remote and the checkout's objects, every ref set to its value at the cut-off 2026-09-24T11:40:00.000Z; content-addressed, so identical to the checkout's HEAD)
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained; uncommitted memory, session logs and the bundle stay in the local lane -->

# Project-memory export — `pm_skills/project/`

Snapshot: `02d414590a5f4a66714be8764b0039a5e4e7bc7a`. 8 files, 27256 bytes, archive chunks and tickets included.

| Path | Bytes at snapshot | Bytes exported (after redaction) |
| --- | ---: | ---: |
| `pm_skills/project/architecture.md` | 3602 | 3602 |
| `pm_skills/project/backlog.md` | 2412 | 2412 |
| `pm_skills/project/brief.md` | 2301 | 2301 |
| `pm_skills/project/conventions.md` | 2175 | 2175 |
| `pm_skills/project/decision-log.md` | 7912 | 7912 |
| `pm_skills/project/file-map.md` | 3453 | 3453 |
| `pm_skills/project/trajectory.md` | 4183 | 4183 |
| `pm_skills/project/wish-list.md` | 1218 | 1218 |

<!-- FILE: pm_skills/project/architecture.md -->

# Architecture

<!-- Generated during project initialization. Review and edit as needed. -->
<!-- Update this file when major structural decisions change. -->
<!-- Hot whole-file read. See AGENTS.md → "Memory size budgets" for limits. -->
<!-- Describe current structure only. Move historical batch notes to decision-log.md. -->

## Tech stack

- **React 18 + TypeScript** — component UI with type safety for the
  pixel-level algorithm code.
- **Vite** — dev server and static production build; minimal config.
- **Canvas 2D API** — all masking, placement testing, rendering, and PNG
  export. No WebGL needed at MVP scale.
- **Vitest** — unit tests for the pure geometry/mask functions.
- No UI framework. Carbon-style productive UI is implemented in our own CSS
  with design tokens; icons are inlined SVG.

## Project structure

```text
src/
  lib/                  — framework-free core (pure, unit-testable)
    rng.ts              — seedable PRNG (mulberry32)
    types.ts            — shared types (Mask, Placement, Settings, …)
    imageLoading.ts     — File/URL → HTMLImageElement + ImageData
    mask.ts             — binary/alpha mask build, trim, erode/dilate
    transform.ts        — rotate/scale a source mask; containment + collision tests
    placement.ts        — the placement algorithm (both modes), chunked
    render.ts           — draw placements to canvas; export transparent PNG
  components/           — React UI
    App.tsx             — top-level state + orchestration
    Uploaders.tsx       — target + sources upload
    Controls.tsx        — all generation controls
    CanvasStage.tsx     — preview canvas + progress
    Report.tsx          — placement report
  main.tsx              — React entry
  index.css             — imports tokens + app styles
styles/
  tokens.css            — Carbon-style design tokens
  app.css               — layout + component styles
index.html              — Vite entry HTML
```

## Key modules

- **`lib/mask.ts`** — converts ImageData to a binary mask (Uint8Array +
  width/height/bounds); trims sources to visible alpha bounds; erodes target
  for edge padding and dilates occupancy for spacing.
- **`lib/transform.ts`** — produces a rotated+scaled raster of a source mask
  and tests (a) full containment in the target mask and (b) collision with
  the occupancy mask.
- **`lib/placement.ts`** — the seedable, chunked placement loop driving both
  reuse and use-each-once modes; returns placements + a report.
- **`lib/render.ts`** — composites placed source *images* (full quality) to
  an output canvas at export resolution and exports a transparent PNG.
- **`components/App.tsx`** — owns settings/state, runs generation off the UI
  thread via chunking, wires controls to the algorithm.

## Communication patterns

Direct imports (pure functions in `lib/`); React state lifted to `App.tsx`
and passed down via props. No event bus or global store — the app is small
and single-screen. Generation runs as an async, chunked routine that yields
to the event loop and reports progress via a callback.

## Dependency policy

- **Runtime deps:** `react`, `react-dom` only. Anything else needs explicit
  approval (see `AGENTS.md`).
- **Dev deps:** `vite`, `@vitejs/plugin-react`, `typescript`,
  `@types/react`, `@types/react-dom`, `vitest` — the build/test toolchain.

## Dev workflow

- Install: `npm install`
- Dev: `npm run dev` → `http://localhost:5173`
- Build: `npm run build` → output in `dist/`
- Preview build: `npm run preview`
- Test: `npm test` (Vitest)

<!-- FILE: pm_skills/project/backlog.md -->

# Backlog

<!-- Generated during project initialization. Edit freely. -->
<!-- OPEN WORK ONLY. Status: [ ] todo  [~] in progress  [-] cut. -->
<!-- Shipped work does NOT stay here. On ship: add one line to
     trajectory.md (the outcome) + an entry to decision-log.md (the why),
     then remove the item from this file. There is no Completed section. -->
<!-- Hot sectional. Agents read the Active section only by default. -->
<!-- See AGENTS.md → "Memory size budgets" for limits; run
     roadmap-refactor.md when the queue drifts into dated rounds. -->

## Active

<!-- MVP shipped 2026-06-13 — see trajectory.md → "MVP". -->

### Current milestone

<!-- Presets + auto-load demo, high-res export, and auto-fit scaling shipped
     2026-06-14 — see trajectory.md → "Presets, high-res export & auto-fit". -->
<!-- Next batch is unscoped; pull from Next milestone / Icebox below. -->

### Next milestone

<!-- Seed-on-load + preview backdrop shipped 2026-06-14 — see trajectory.md
     → "Preview & seed UX". -->

- [ ] Generation Web Worker (perf follow-up #1) — move `generate()` off-thread so the UI never blocks regardless of job size (pass masks/geometry only, never the `HTMLImageElement`; cancel via `terminate()`; progress via `postMessage`; no-worker fallback). Commit or skip based on the Performance-pass numbers. Land before the source attempt cache so its savings run off-thread.
- [ ] Source attempt cache (perf follow-up #2) — reuse rasterised transforms across candidate positions (quantised by angle/scale) to cut per-attempt recompute; output-changing, so land after the Web Worker.
- [ ] Placement-resolution tuning (perf follow-up) — lower `PLACEMENT_MAX_DIM` (sweep 2026-06-14: 600≈−29%, 500≈−55%, 400≈−71%, ~quadratic); output-changing (packing precision, not export quality), needs a visual sign-off. Paused mid-comparison.

### Icebox

- [ ] Vector/SVG nesting and polygon-packing optimisation.
- [ ] Multiple targets / multi-region composition.
- [ ] Persisted projects (save/load settings + composition).
- [ ] Full undo/redo history.

<!-- Ticket grammar: quick items stay one line. Non-trivial or sign-off
     items add two lines so intent survives compression:
       - **ID Short title** [flags]
         Intent: the outcome wanted.
         Done when: the acceptance condition.
     Add optional Scope:/Risks: lines only for sign-off items. -->

<!-- FILE: pm_skills/project/brief.md -->

# Project Brief

<!-- Hot whole-file read. See AGENTS.md → "Memory size budgets" for limits. -->

## What are we building?

**Artwork Form Filler** — a browser-only tool that fills a target shape
with multiple source silhouette images. The user uploads one target mask
(black/white, transparent PNG, or simple silhouette) and many source
silhouettes (ideally transparent PNGs). The app arranges the sources inside
the target shape so that every placed silhouette is complete (never
clipped), never overlaps another, never extends outside the target, and the
result does not look like a tiled pattern. The composition renders to canvas
and exports as a transparent PNG.

## Who is it for?

A single maker / designer doing artwork composition locally. No accounts,
no collaboration, no server — everything runs in the browser.

## Platform and deployment

Client-side single-page web app. React + Vite + TypeScript. Static build,
deployable to any static host. No backend.

## Core features (v1 / MVP)

- Upload one target mask and many source silhouettes.
- Alpha-aware masking: ignore transparent pixels, trim sources to visible
  bounds, place by real silhouette not bounding box.
- Raster placement algorithm with full target containment and non-overlap,
  configurable spacing and edge padding, seedable randomness.
- Two modes: "allow reuse of sources" (fill to a density target) and "use
  each source once" (auto base scale, shrink-retry, placement report).
- Render to canvas and export as transparent PNG.

## Constraints

- Raster-mask / canvas approach only for the MVP — no vector nesting, SVG
  packing, ML, or server rendering.
- Minimal runtime dependencies (react, react-dom only). Carbon-style
  productive UI implemented in our own CSS — no UI framework dependency.
- Must stay responsive: chunked generation with progress, never freeze the
  UI for long periods.

## Out of scope (for now)

Vector/SVG nesting, polygon-packing optimisation, machine learning,
server-side rendering, multiple simultaneous targets, full undo history
(Regenerate covers re-runs).

## Open questions

- Best default heuristic for detecting the target's inside region across
  black/white vs transparent inputs (resolved for MVP: auto-detect alpha,
  else dark = inside, plus an Invert toggle).

<!-- FILE: pm_skills/project/conventions.md -->

# Conventions

<!-- Fill this in before or during your first implementation task. -->
<!-- Skip at init if you're not sure yet — capture conventions as they emerge. -->
<!-- Hot whole-file read. See AGENTS.md → "Memory size budgets" for limits. -->

## Code style

<!-- Language-specific style rules. Formatter or linter config if any. -->

## Naming

<!-- File naming, variable naming, component naming patterns. -->

## Commit messages

<!-- Format, scope, conventions. -->

## Documentation

<!-- Project-specific documentation conventions. The permanent rules
     (JSDoc, explain why not what, no boilerplate) are in AGENTS.md.
     This section captures how they apply to this project as
     conventions emerge. Example:
     - What to document: all exported functions, hooks, db/ methods.
     - Depth: purpose, parameters, return values, side effects.
     - Exceptions: trivial getters don't need JSDoc. -->

## Testing

<!-- Project-specific testing policy. The permanent doctrine (invariants
     over coverage, named categories, fast-and-hermetic, two layers,
     never silently weaken a test) is in AGENTS.md. Capture here: the
     runner and its config — with non-obvious reasons, e.g. sequential
     execution when tests mutate env or reset module singletons — the
     coverage bar if any, and the specific invariants this project must
     protect. Default for JS/Node: Vitest (safety net) + Playwright
     (critical journeys); swap per stack. -->

## Patterns to follow

<!-- Recurring patterns that should be consistent across the codebase. -->

## Patterns to avoid

<!-- Project-specific anti-patterns. The permanent anti-patterns
     (Carbon, accessibility, dependencies) are in AGENTS.md. This
     section captures patterns specific to this project's codebase. -->

## Tooling

<!-- Bundler, test runner, formatter/linter, editor config.
     Example:
     - Bundler: esbuild (via custom build.js)
     - Test runner: Vitest
     - Formatter: .editorconfig (mechanical), no additional formatter yet
     - Linter: none yet
     This section captures tool choices. For detailed build/dev/deploy
     rules, see DEV-INFRASTRUCTURE.md. -->

<!-- FILE: pm_skills/project/decision-log.md -->

# Decision Log

<!-- Append new decisions at the top. Don't edit old entries. -->
<!-- Use this during the design phase of each task to record what you chose and why. -->
<!-- Hot sectional. Agents read the latest 10 entries by default. -->
<!-- Keep each entry tight: Decision / Rationale / Alternatives, not an essay.
     The live log is budgeted by WORDS as well as entry count (see AGENTS.md
     → "Memory size budgets"), so verbose entries trip a prune sooner. -->
<!-- This is the home of the WHY. The backlog/trajectory only point here;
     never paste an entry's prose into those files. -->
<!-- Append-only: when archiving, move entries verbatim. Never rewrite. -->

## 2026-06-14 — Seed-on-load + preview backdrop (auto-jazz)

**Decision:** Two UX-polish features run via auto-jazz. (1) Initialise the
live seed to `randomSeed()` once per load with a lazy `useState`;
`DEFAULT_SETTINGS.seed` stays `1` so defaults/tests are deterministic.
(2) Draw the target shape faintly (alpha 0.12) behind the silhouettes in the
**preview canvas only**, via a new optional `RenderOptions.backdrop` on
`renderToCanvas`; `exportComposition` never passes it, so the exported PNG
stays silhouettes-on-transparent. The preview renders whenever a target
exists (shape visible before *and* after generation); a "Show shape" toggle
(default on) controls it, and the empty-state guidance floats over the faint
shape (hidden while generating).

**Rationale:** Backdrop-in-the-preview-canvas (vs a separate DOM `<img>`
layer) guarantees pixel-perfect alignment with the silhouette coordinate
space and keeps export clean — export simply omits the option. Both changes
are output-preserving for the test suite.

**Auto-jazz scope call (assumptions, no user input):** implemented only the
two safe/output-preserving items. Deferred — Web Worker (skipped per
"commit-or-skip on perf numbers": `generate` is <100ms typical and chunked);
source attempt cache + placement-resolution tuning (output-changing → need a
visual sign-off); Icebox (vector nesting [rejected per brief], multi-region,
persistence, undo/redo → large, need product direction).

**Link:** trajectory.md → "Preview & seed UX".

## 2026-06-14 — Presets, high-res export & auto-fit (feature milestone)

**Decision:** Three user-requested features. (1) Bundle example shapes
(targets) + filler silhouettes (sources) under `src/assets/presets/`,
collected via `import.meta.glob`; on first run with no content, auto-load a
default shape + the filler set (localStorage-guarded) and auto-generate so the
app opens on a finished example. (2) Decouple export from preview: the live
preview renders at `PREVIEW_MAX_DIM` (1400px); export renders offscreen at a
user-chosen size (`EXPORT_DIMS` 2048/3600/4800px, default 3600) via
`exportComposition`. (3) Add an `autoFit` toggle that sizes reuse-mode pieces
by one uniform area-budget scale `√(density·area / Σ area)` — the formula
use-each-once already uses — overriding Min/Max.

**Rationale:** The request's folder labels were swapped; contents confirmed
shapes = targets, fillers = sources. Export was target-native (floor 1200px),
too low for t-shirt print; export quality is independent of placement
resolution because render composites the originals. `autoFit` defaults false
and its false-path keeps the exact rng sequence, so the placement
determinism/snapshot tests are unchanged.

**Alternatives:** export size in `Settings` (rejected — not a generation input;
kept as separate App state); `public/` + hand-written manifest (rejected for
`import.meta.glob` auto-registration).

**Caveat:** export sharpness is capped by the filler PNGs' own resolution.

**Link:** trajectory.md → "Presets, high-res export & auto-fit".

## 2026-06-14 — Placement performance pass (allocation fix; tuning paused)

**Decision:** Cut `rasterizeTransformed`'s per-attempt cost by filling reusable
module-level scratch `Int32Array`s in a single pass and returning them with a
valid `count`, instead of growing `number[]`s and copying via `Int32Array.from`.
Output-preserving. Added a seeded benchmark (`npm run bench`) and a placement
determinism + containment/overlap + output-snapshot safety net, written and run
green BEFORE the change.

**Rationale:** Per-attempt allocation/GC dominated the hot loop. The scratch
buffers are allocation-free per attempt; all consumers (`canPlace`,
`stampOccupancy`, the placement loops) already iterate by `count`, never
`xs.length`, so nothing else changed. Result: reuse ~1.43×, use-each-once
~1.25× faster; snapshot identical; 25 tests green; build clean.

**Contract:** returned `xs`/`ys` are shared buffers — valid only until the next
`rasterizeTransformed` call, possibly longer than `count`. The placement loop
fully consumes each transform (no `await` while one is live), so this holds.

**Tuning paused:** a sweep showed `PLACEMENT_MAX_DIM` is the dominant lever
(600≈−29%, 500≈−55%, 400≈−71%, ~quadratic). It is output-changing (packing
precision, NOT export quality — render composites originals), so it needs a
visual sign-off; deferred to a follow-up.

**Alternatives:** exact-size `slice` per call (owned arrays, simpler contract
but still 2 allocs/attempt) — rejected for the zero-alloc scratch since
consumers honor `count`. Lowering `SOURCE_MAX_DIM` — rejected: transformed size
∝ target longest side, so it barely affects speed but cuts fidelity.

**Link:** trajectory.md → "Performance pass".

## 2026-06-13 — MVP foundation + first build (init-mvp)

**Decision:** Build the Artwork Form Filler MVP as a browser-only
React 18 + TypeScript + Vite SPA using a raster-mask/Canvas 2D approach.
Runtime deps limited to `react`/`react-dom`; UI is Carbon-style productive,
implemented in our own CSS tokens (`--aff-*`) with no UI-framework or
Carbon-package dependency. Vitest covers the pure geometry functions.

**Rationale:** The user specified the stack and a raster-first approach.
Masks (Uint8Array) make containment/collision exact and alpha-aware, are
cheap to test, and keep the algorithm readable. Placement runs on downscaled
masks (`PLACEMENT_MAX_DIM` 700, `SOURCE_MAX_DIM` 360) for speed while render
composites the original full-res images for quality. Generation is chunked
(batches + `setTimeout` yields) so the UI never freezes, and seeded
(mulberry32) so a seed + settings reproduce a layout.

**Key algorithm choices / assumptions:**

- Containment uses the target mask **eroded** by edge padding; spacing is
  applied by **dilating** committed pieces into the occupancy mask (disk
  offsets). A single `canPlace` pass tests bounds + target + occupancy.
- Target inside-region detection: `auto` = alpha if the image has
  transparency else dark-is-inside; plus `alpha`/`dark`/`light` modes and an
  Invert toggle.
- Reuse mode fills toward `density · targetArea`; use-each-once derives a base
  scale from `√(density·targetArea / Σ sourceArea)`, places largest-first, and
  shrinks the global scale (×0.88, up to 6 retries) until all fit, reporting
  "Placed X of N".
- The two "reuse" toggles are modelled as a single mutually-exclusive radio
  group (better UX than two conflicting toggles).
- Render is WYSIWYG with export: only silhouettes on a transparent canvas.

**Alternatives considered:**

- Vector/SVG nesting or polygon packing — rejected per brief (raster MVP first).
- Carbon npm package / Tailwind / shadcn — rejected for the minimal-dependency
  rule; Carbon language implemented in own CSS instead.
- Per-attempt re-dilation of the whole occupancy mask — rejected for cost;
  stamp dilated pieces once at commit time instead.

**Fix:** `rasterizeTransformed` subtracts a 1e-9 epsilon before `ceil` so
floating-point noise (90° rotation → 1.0000000000000002) doesn't inflate the
transformed bbox by a pixel. Caught by a regression test.

**Link:** trajectory.md → "MVP".

<!-- FILE: pm_skills/project/file-map.md -->

# File Map

<!-- Add entries as files are created. One line per file. -->
<!-- Format: path — role or responsibility -->
<!-- Update when files are created, renamed, or deleted. -->
<!-- Hot whole-file read. See AGENTS.md → "Memory size budgets" for limits. -->
<!-- Map roles, not history. Move batch notes and change history to decision-log.md. -->

## Entry point

- `index.html` — Vite HTML entry.
- `src/main.tsx` — mounts React into `#root`, imports global CSS.
- `src/vite-env.d.ts` — Vite client types (`import.meta.glob`, asset-URL modules).

## Core modules

- `src/lib/types.ts` — shared types (Mask, SourceItem, Placement, Settings, report) + `DEFAULT_SETTINGS` and tuneable constants.
- `src/lib/rng.ts` — seedable mulberry32 PRNG (`Rng`) + `randomSeed`.
- `src/lib/imageLoading.ts` — File → image → ImageData at capped resolution; loads target + source items (incl. `loadTargetFromUrl`/`loadSourceFromUrl` for bundled presets).
- `src/lib/presets.ts` — bundled example presets (shapes + fillers) collected from `src/assets/presets/` via `import.meta.glob`.
- `src/lib/mask.ts` — build target/source masks, trim to visible bounds, erode (edge padding), disk offsets (spacing).
- `src/lib/transform.ts` — rasterise scaled+rotated source mask (reusable scratch buffers; borrowed `xs`/`ys` valid until next call, read by `count`); containment + collision test (`canPlace`); occupancy stamping.
- `src/lib/placement.ts` — the chunked, seedable placement algorithm (reuse + use-each-once modes); returns placements + report.
- `src/lib/render.ts` — composite full-res sources to canvas at a given output size (preview vs export decoupled); optional preview-only `backdrop` (faint target, never exported); `exportComposition` renders offscreen + downloads a transparent PNG.

## UI

- `src/components/App.tsx` — state owner + generation orchestration.
- `src/components/Uploaders.tsx` — target + source uploaders (drag/drop, click, keyboard), mask mode + invert.
- `src/components/Controls.tsx` — all generation settings.
- `src/components/CanvasStage.tsx` — preview canvas, toolbar (export size + "Show shape" backdrop toggle), progress, empty states.
- `src/components/Report.tsx` — placement report banner.
- `src/components/icons.tsx` — inline SVG icons (no icon-library dependency).

## Styles and tokens

- `styles/tokens.css` — Carbon-style design tokens (`--aff-*`).
- `styles/app.css` — layout + component styles.
- `src/index.css` — imports the two stylesheets.

## Config and constants

- `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`.
- Tuneable algorithm values live in `src/lib/types.ts` (`DEFAULT_SETTINGS`, `*_MAX_DIM`, `PREVIEW_MAX_DIM`, `EXPORT_DIMS`).
- `src/assets/presets/{shapes,fillers}/` — bundled example PNGs (preset shapes + filler silhouettes).

## Tests

- `src/lib/__tests__/rng.test.ts` — RNG determinism + ranges.
- `src/lib/__tests__/mask.test.ts` — trim, alpha/dark detection, invert, erode.
- `src/lib/__tests__/transform.test.ts` — rasterise dims, containment, collision, spacing.
- `src/lib/__tests__/placement.test.ts` — `generate` determinism (both modes) + containment/overlap invariant + output-preservation snapshot.
- `src/lib/__tests__/placement.bench.ts` — seeded `generate` benchmarks (reuse + use-each-once); run via `npm run bench`.

## Build and tooling

- Vite + Vitest; `.editorconfig`, `.gitignore` in root.

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

## Preview & seed UX (shipped 2026-06-14)

- FEAT-SEED — live seed initialises to a fresh `randomSeed()` once per load (lazy `useState`); `DEFAULT_SETTINGS.seed` stays deterministic for defaults/tests.
- FEAT-BACKDROP — faint target shape (alpha 0.12) behind silhouettes in the preview only (`RenderOptions.backdrop`; export omits it); visible before & after generation; "Show shape" toggle (default on).

Outcome: each load starts from a fresh layout; the shape is always visible behind the fill without polluting the export. 26 tests green, build clean. Auto-jazz run — see decision-log 2026-06-14 for the deferral calls.

## Presets, high-res export & auto-fit (shipped 2026-06-14)

- FEAT-PRESETS — bundled example shapes + fillers under `src/assets/presets/` (`import.meta.glob`); sidebar preset pickers; first-run demo auto-loads + auto-generates (localStorage-guarded). Commit bbb7550.
- FEAT-EXPORT — export decoupled from preview: preview at `PREVIEW_MAX_DIM` (1400px), export rendered offscreen at a chosen size (2048/3600/4800px, default 3600) with a dimensions readout. Commit 2a0b21b.
- FEAT-AUTOFIT — "Auto-fit size" toggle sizes reuse-mode pieces by one uniform area-budget scale (matching use-each-once); hides Min/Max when on.

Outcome: app opens on a working example; t-shirt-ready high-res PNG export; one-click auto-sizing. 26 tests green, build clean. See decision-log 2026-06-14.

## Performance pass — placement allocation fix (shipped 2026-06-14)

- PERF-A — `rasterizeTransformed` fills reusable module scratch buffers (borrowed-buffer contract; consumers honor `count`) instead of per-attempt `number[]` + `Int32Array.from`; output-preserving, ~1.43×/1.25× faster (reuse / use-each-once). Added a seeded benchmark (`npm run bench`) + a placement determinism / containment-overlap / output-snapshot safety net. See decision-log 2026-06-14.

Outcome: ~30%/20% faster generation with zero output change; 25 tests green, build clean. Resolution tuning identified (`PLACEMENT_MAX_DIM` dominant) but paused pending visual sign-off.

## MVP — Raster form filler (shipped 2026-06-13)

- Foundation — brief, architecture, backlog, README; AGENTS/UI-STANDARDS/DEV-INFRASTRUCTURE populated; Vite+React+TS scaffold. See decision-log 2026-06-13.
- Core libs — rng, types, imageLoading, mask (build/trim/erode/disk), transform (rasterise + canPlace + stamp), placement (both modes, chunked), render (+ PNG export).
- UI — uploaders (target + sources), full control set, canvas preview, progress, placement report; Carbon-style CSS tokens, WCAG-AAA-tuned.
- Tests — Vitest safety net for RNG determinism, mask trim/detect/erode, and containment/collision/spacing (21 tests).

Outcome: upload a target shape + transparent PNG silhouettes, generate a non-overlapping, non-clipped, in-bounds composition (reuse or use-each-once with a placement report), preview on canvas, and export a transparent PNG. `npm run build` + `npm test` green.

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

<!-- Append captured ideas below, one bullet each. Delete this comment once
     you add the first real item. -->

