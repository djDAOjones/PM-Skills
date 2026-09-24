<!-- field-report: project=corperate-image-generator · date=2026-06-03 · type=export
     · pm-skills=2.2.0 (installed with the single commit ee49264 on 2026-06-03; never upgraded)
     · source=every Git blob under pm_skills/project/ at ee4926480fb0799239590817eea9753e9bad0d11, taken 2026-09-24 by Claude Code (read from a scratch clone assembled from the remote and the checkout's objects, every ref set to its value at the cut-off 2026-09-24T11:40:00.000Z; content-addressed, so identical to the checkout's HEAD)
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained; uncommitted work, session logs and the bundle stay in the local lane -->

# Project-memory export — `pm_skills/project/`

Snapshot: `ee4926480fb0799239590817eea9753e9bad0d11`. 8 files, 28822 bytes, archive chunks and tickets included.

| Path | Bytes at snapshot | Bytes exported (after redaction) |
| --- | ---: | ---: |
| `pm_skills/project/architecture.md` | 8155 | 8155 |
| `pm_skills/project/backlog.md` | 2236 | 2236 |
| `pm_skills/project/brief.md` | 4544 | 4544 |
| `pm_skills/project/conventions.md` | 3447 | 3447 |
| `pm_skills/project/decision-log.md` | 2550 | 2550 |
| `pm_skills/project/file-map.md` | 4047 | 4047 |
| `pm_skills/project/trajectory.md` | 2625 | 2625 |
| `pm_skills/project/wish-list.md` | 1218 | 1218 |

<!-- FILE: pm_skills/project/architecture.md -->

# Architecture

<!-- Generated during project initialization. Review and edit as needed. -->
<!-- Update this file when major structural decisions change. -->
<!-- Hot whole-file read. See AGENTS.md → "Memory size budgets" for limits. -->
<!-- Describe current structure only. Move historical batch notes to decision-log.md. -->

## Tech stack

| Choice | Reason |
| --- | --- |
| **TypeScript** | Types keep the cycle state machine, frame/analysis/generation contracts, and the ComfyUI adapter honest. |
| **Vite** | Zero-config dev server + HMR + build; dev proxy to ComfyUI removes CORS friction. |
| **Vanilla DOM + own components** | No UI framework. Carbon's productive language is implemented in our own code/CSS (hard rule: no Carbon packages), keeping runtime deps at zero. |
| **Vitest** | Fast, hermetic unit tests for analysis heuristics, selection/balancing, prompt building, metrics, and the ComfyUI graph builder. |
| **Browser APIs only** | Canvas 2D (analysis + placeholder render), `getDisplayMedia` (screen capture), `fetch` + `WebSocket` (ComfyUI). No runtime dependency. |
| **Local ComfyUI HTTP service** | Primary generator; runs on the same Mac. Accessed via Vite proxy in dev, configurable base URL otherwise. |

**Runtime dependencies: zero.** Dev-only: `vite`, `typescript`, `vitest`,
`@types/*`. Adding any runtime dependency requires explicit approval.

## Project structure

```text
index.html                      — app entry (control panel + output display)
src/
  main.ts                       — bootstrap: wire state, engine, UI, sources, generators
  config/
    constants.ts                — tuneable values (intervals, ranges, defaults, ComfyUI base)
    types.ts                    — shared domain types (CellKey, Analysis, CycleRecord, ...)
  core/
    eventBus.ts                 — typed pub/sub; the only cross-module comms channel
    cycleEngine.ts              — the timed capture→analyse→select→generate→display loop
    scheduler.ts                — interval timer; fires cycles, guards overlap
    sessionLog.ts               — structured per-cycle records + JSON export
    metrics.ts                  — per-cycle timings, moving averages, buffer, keep-up status
  state/
    appState.ts                 — central state store (session, controls, last cycle)
  sources/
    frameSource.ts              — FrameSource interface; CellKey→ImageBitmap map per cycle
    fileSource.ts               — offline fixture grids (default, fully testable)
    screenCaptureSource.ts      — getDisplayMedia → composite frame
    gridCrop.ts                 — crop a 3×3 composite into 8 outer cells (drop centre)
  analysis/
    analyser.ts                 — Analyser interface
    heuristicAnalyser.ts        — canvas heuristics → per-cell vibe/content + overall summary
  selection/
    archetypes.ts               — load + validate the archetype library
    characterPool.ts            — semi-random cast selection with balancing
  generation/
    imageGenerator.ts           — ImageGenerator interface (+ result/progress types)
    comfyuiGenerator.ts         — ComfyUI adapter: upload refs, build graph, /prompt, ws, /view
    placeholderGenerator.ts     — canvas-composite fallback (offline/test/graceful degrade)
    promptBuilder.ts            — baseline + analysis + archetype + cast + scene-response → prompt
    comfyuiGraph.ts             — parametrise the workflow-template JSON
  response/
    sceneResponse.ts            — scene-response sensitivity (0–400%) → prompt-weight mapping
  ui/
    controlPanel.ts             — session, tempo, scene-response controls
    outputDisplay.ts            — generated-image stage
    metricsPanel.ts             — timing metrics + keep-up indicator
    logPanel.ts                 — session-log view + export button
    statusBar.ts                — source/generator connection + warnings
    components/                 — Carbon-style Button, Slider, NumberInput, Toggle, Tag
styles/
  tokens.css                    — design tokens (Carbon-aligned structural + brand palette)
  app.css                       — layout + component styling
assets/
  characters/character_01..07/  — reference image + meta.json (user-replaceable placeholders)
  characters/characters.json    — cast manifest
  archetypes/corporate-archetypes.json
  prompts/baseline-corporate-style.md
  prompts/response-rules.md
  workflows/comfyui-default.json — parametrised ComfyUI graph template
  fixtures/                     — sample composite grids for FileSource + tests
docs/                           — source-notes.md, exhibition-integration-contract.md (inputs)
tests/                          — Vitest specs (*.test.ts)
```

`dist/` is the Vite build output (read-only). `docs/` holds **input reference
docs**, not build output — do not point the build at it.

## Key modules

- **`core/eventBus.ts`** — typed publish/subscribe; the single sanctioned
  cross-module channel.
- **`core/cycleEngine.ts`** — orchestrates one full cycle and emits `cycle:*`
  events at each stage; owns nothing it can delegate.
- **`core/metrics.ts`** — records analysis/generation durations separately,
  computes last/3/5/session averages and the buffer, derives green/amber/red.
- **`sources/frameSource.ts`** — the pluggable input seam; yields a
  `CellKey→image` map so analysis never knows the transport.
- **`analysis/heuristicAnalyser.ts`** — pure, deterministic canvas analysis.
- **`selection/characterPool.ts`** — semi-random cast pick with appearance
  balancing.
- **`generation/imageGenerator.ts`** — the generation seam; `comfyuiGenerator`
  (primary) and `placeholderGenerator` (fallback) implement it.
- **`generation/promptBuilder.ts`** — deterministic prompt assembly from
  baseline + analysis + archetype + cast + scene-response.

## Communication patterns

**Typed pub/sub `EventBus` is the preferred pattern** for cross-module
communication: `cycleEngine` and services publish events; UI panels and the
session log subscribe. This keeps the loop decoupled from the UI and from the
chosen source/generator.

Exceptions (direct imports allowed): pure utilities (`gridCrop`,
`comfyuiGraph`, `sceneResponse`), reading immutable config/constants, and a
module calling its own collaborators it explicitly owns. Never bypass the bus
to push UI updates from inside the engine.

Event namespaces: `session:*`, `cycle:*`, `metrics:*`, `source:*`,
`generator:*`, `log:*`, `ui:*` (see `AGENTS.md`).

## Dependency policy

- **Runtime dependencies: zero by default.** Every runtime dependency must be
  named in this file and approved before use. The browser platform (Canvas,
  `getDisplayMedia`, `fetch`, `WebSocket`) covers the MVP.
- **Dev dependencies** allowed when justified: `vite`, `typescript`,
  `vitest`, `@types/*`. Adding more needs a one-line justification.
- ComfyUI is an **external local service**, not an npm dependency — it is
  reached over HTTP/WS, never bundled.

## Dev workflow

- **Install:** `npm install`
- **Dev:** `npm run dev` → `http://localhost:5173` (Vite). Dev server proxies
  `/comfy` → `http://127.0.0.1:8188` (ComfyUI HTTP) and `/comfy/ws` → the
  ComfyUI WebSocket, so the browser app talks to ComfyUI same-origin.
- **Build:** `npm run build` → `dist/`
- **Preview build:** `npm run preview`
- **Test:** `npm test` (Vitest, run once) / `npm run test:watch`

The canonical dev URL is `http://localhost:5173`. Do not hard-code other
ports. ComfyUI must be started separately (`--listen 127.0.0.1 --port 8188`).

## Configuration strategy

- **Tuneable values:** `src/config/constants.ts` (intervals, ranges, defaults,
  ComfyUI base URL, keep-up thresholds), grouped by domain.
- **Domain types:** `src/config/types.ts`.
- **Design tokens:** `styles/tokens.css` (CSS custom properties).
- **User-editable content (no code change):** `assets/` — archetypes JSON,
  baseline/response prompt Markdown, character manifest + per-character meta,
  and the ComfyUI workflow template.

Do not scatter configuration across service modules.

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

### Current milestone — Production input + generation hardening

<!-- MVP (M1-01 … M1-12) shipped 2026-06-03 — see trajectory.md + decision-log. -->

- [ ] M2-01 Tier B `PreviewFrameSource` — Socket.IO `sources` room, map cells
  via `GET /api/compositions/art-wall`, live `composition:updated` re-binds.
  (Requires a live Hub on the LAN to validate; adds `socket.io-client`.)
- [ ] M2-02 Character reference workflow — drop-in real 7-character refs +
  per-character ComfyUI conditioning (IP-Adapter/InstantID/LoRA), consistency tuning.
- [ ] M2-03 ComfyUI model/graph decision — pick checkpoint + node graph that
  holds the cast consistent on M1 Max; record in decision-log.
- [ ] M2-04 Robustness — reconnect/backoff, generation timeout/cancel, missed-cycle
  recovery, richer error surfacing.

### Icebox

<!-- Deferred but worth keeping (post-triage). Needs a decision to reactivate. -->

- [ ] Time-based ramps for scene + clothing response (start/end value, times).
- [ ] Ramp curve control (linear + S-curve), later visual curve editor.
- [ ] Clothing-response control + partial/intermittent distribution (75/25).
- [ ] Fashion-reference file driving clothing transforms.
- [ ] Overrun toggle + final fade-out (default 30s).
- [ ] >100% overdrive visual behaviour (distortion/instability above 100%).
- [ ] Saved performance presets.
- [ ] Session archive export (log + captures + generated images).
- [ ] Tier C WebRTC (`consumerType:'external'`) full-fidelity input.
- [ ] ML-based content classification (CLIP/BLIP) to augment heuristics.
- [ ] Crossfade between successive outputs.
- [ ] Editable/visible prompt construction in the UI.

<!-- FILE: pm_skills/project/brief.md -->

# Project Brief

<!-- Hot whole-file read. See AGENTS.md → "Memory size budgets" for limits. -->

## What are we building?

A local, browser-based generative-art instrument for live gallery
performance. It consumes the **AI Jam Exhibition System (v2)** Hub's live 3×3
**Art Wall** over the shipped **EXT-1 LAN integration contract**, captures a
still on a configurable interval (default 30s), runs lightweight local
analysis on the 8 outer grid cells (the centre `qr:audience-url` cell is
ignored), and uses that analysis to generate a **corporate-stock-style image**
featuring a recurring cast of **7 supplied characters**. Over a performance,
the incoming imagery progressively influences the mood, behaviour, and
eventually clothing of the characters — from subtle realism up to exaggerated,
unstable "overdriven" output. It is a timed performance instrument with live
controls, time-based ramps, and keep-up metrics — a generative artwork, not a
productivity tool.

## Who is it for?

The artist(s) operating the piece during a live gallery performance, on a
single MacBook Pro (M1 Max, 32 GB) on the venue LAN alongside the exhibition
Hub. Operated by one person from a single control panel; the output display is
the public-facing artwork.

## Platform and deployment

Browser-based (control panel + output display), running locally. Must run on
the same machine or LAN as the Hub — the EXT-1 `sources` and `external:*`
Socket.IO rooms are refused over the public tunnel (LAN-only). Image analysis
runs locally in the browser; image generation runs via a **local ComfyUI HTTP
service** on the same machine.

## Core features (v1 / MVP)

- Browser control panel + output display, Carbon-style, WCAG 2.2 AAA.
- Pluggable `FrameSource`; MVP ships `FileSource` (offline fixtures) and
  `ScreenCaptureSource` (Option A: `getDisplayMedia` → crop 3×3, drop centre).
- Timed capture→analyse→select→generate→display loop, interval 10–120s
  (default 30s).
- Lightweight local per-cell analysis (canvas heuristics → mood words +
  content hints) plus a combined overall summary.
- File-driven corporate archetype library + semi-random character selection
  with basic balancing across the cast of 7.
- One scene-response sensitivity control (0–400% range; MVP tuned for coherent
  ≤100%) feeding prompt construction.
- Image generation via a local **ComfyUI** adapter (primary), with a
  placeholder/compositing generator as the offline/test fallback.
- Timing metrics (analysis vs generation, separately), buffer, and a
  green/amber/red keep-up indicator; structured per-cycle session log
  (exportable JSON).

## Constraints

- Apple MacBook Pro, M1 Max, 32 GB RAM; preserve performance headroom (other
  software may run during a show).
- **Local-first:** analysis local in-browser; generation via local ComfyUI.
- **Minimal runtime dependencies** — target zero runtime deps; dev deps
  (Vite, TypeScript, Vitest) only. Carbon implemented in own code, not via
  Carbon packages.
- **Do not modify the exhibition repo.** Integrate only through the EXT-1
  contract (`docs/exhibition-integration-contract.md`); treat it as a stable
  external API.
- Configurable assets (characters, archetypes, prompts, fashion, ComfyUI
  workflow) must be editable without code changes.
- Must measure and report actual analysis and generation times and warn when
  it cannot keep up. Favour controllability and graceful degradation over
  correctness guarantees.

## Out of scope (for now)

Deferred to milestone 2+ per the source notes' explicit MVP/later split:
Tier B (Socket.IO preview-frame) and Tier C (WebRTC) inputs; time-based ramps
and S-curves; clothing-response control and partial distribution; fashion
reference file; overrun toggle; final fade-out; >100% overdrive visual
behaviour; richer monitoring/graphs; advanced cast balancing; saved presets;
crossfade between outputs; ML-based content classification (CLIP/BLIP).

## Open questions

1. Real local generation model/checkpoint for M1 Max that keeps the 7-character
   cast reasonably consistent (ComfyUI graph: SDXL + IP-Adapter / InstantID /
   reference, or per-character LoRA?).
2. How faithful must character likeness be vs. how far may it drift at high
   sensitivity?
3. Stills only vs. crossfading between outputs.
4. Should prompt construction be visible/editable in the UI?
5. Should performance settings be saved as reusable presets?
6. Should each session export a full archive (log + captures + generated
   images), or just the JSON log for MVP?

<!-- FILE: pm_skills/project/conventions.md -->

# Conventions

<!-- Fill this in before or during your first implementation task. -->
<!-- Skip at init if you're not sure yet — capture conventions as they emerge. -->
<!-- Hot whole-file read. See AGENTS.md → "Memory size budgets" for limits. -->

## Code style

- **TypeScript**, ES modules, `strict` mode on. No `any` unless unavoidable
  and commented.
- 2-space indent, single quotes, semicolons, trailing commas (multiline).
  Enforced mechanically by `.editorconfig`.
- Imports at the top of every file (hard rule).
- Prefer small pure functions; keep side effects in the engine/UI/adapter
  layers, not in analysis/selection/prompt logic.

## Naming

- Files: `camelCase.ts` for modules (`cycleEngine.ts`), `PascalCase` only for
  UI component files that export a single component class/factory.
- Types/interfaces: `PascalCase` (`FrameSource`, `CycleRecord`). No `I` prefix.
- Constants: `UPPER_SNAKE` for fixed config values; `camelCase` for everything
  else.
- Events: colon-namespaced strings (`cycle:generated`) — see `AGENTS.md`.
- Cell keys: canonical `cell.0 … cell.8` (per EXT-1 contract); never invent
  `top_left`-style keys in code (those are display labels only).

## Commit messages

- Conventional-style prefix: `feat:`, `fix:`, `chore:`, `docs:`, `test:`,
  `refactor:`. Imperative mood, concise subject.
- Reference the backlog ID when relevant (e.g. `feat: M1-08 ComfyUI adapter`).

## Documentation

- JSDoc on exported functions, classes, interfaces, and modules (purpose,
  params, returns, side effects). Explain **why**, not what.
- Each module starts with a one-line header comment stating its role.
- Trivial internal helpers don't need JSDoc; don't add boilerplate.

## Testing

- Runner: **Vitest** (`environment: 'node'` for pure logic; `jsdom` only where
  a test touches the DOM). Hermetic — no live ComfyUI, no real `getDisplayMedia`.
- Pre-invariant MVP stage: test the **pure** logic that would do real damage if
  it broke — heuristic analyser, character balancing, prompt builder,
  metrics math, ComfyUI graph builder. UI and live-service paths are verified
  manually for the MVP (named in the validation step).
- Inject fakes for `ImageGenerator` and `FrameSource`; never hit the network.
- One regression test per fixed bug. Round-trip test for session-log export.

## Patterns to follow

- Cross-module comms via the typed `EventBus`; UI subscribes, never reaches
  into the engine.
- New input transports implement `FrameSource`; new generators implement
  `ImageGenerator`. The loop depends only on those interfaces.
- All tuneable numbers live in `config/constants.ts`; all user-editable
  content lives in `assets/`.
- Every async UI action shows loading/success/error status (no frozen UI).

## Patterns to avoid

- Hard-coding intervals, ranges, thresholds, or the ComfyUI URL in service
  modules instead of `config/constants.ts`.
- Bypassing the `EventBus` to mutate the DOM from inside the engine.
- Coupling analysis/selection/prompt code to a specific source or generator.
- Blocking the main thread with heavy per-pixel loops — downscale before
  analysing.
- Letting a cycle overlap the next; the scheduler must guard against it.

## Tooling

- Bundler / dev server: **Vite**.
- Test runner: **Vitest**.
- Formatter: `.editorconfig` (mechanical); no Prettier/ESLint yet — add only
  if churn justifies it.
- For build/dev/deploy specifics see `DEV-INFRASTRUCTURE.md`.

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

## 2026-06-03 — MVP foundation + first-milestone build (init-mvp)

**Decision:** Build the MVP capture→analyse→select→generate→display loop as a
zero-runtime-dependency TypeScript + Vite browser app, with **ComfyUI** as the
primary generator and a canvas **placeholder generator** as the fallback.

**Rationale:**

- TS + Vite + vanilla DOM (Carbon-style in own code) keeps runtime deps at zero
  and the bundle tiny; Vite dev-proxies `/comfy` to avoid CORS.
- Analysis is local canvas heuristics (brightness, colourfulness, saturation,
  energy, hue) — fast, deterministic, no ML model needed for the MVP.
- Generation behind an `ImageGenerator` seam: ComfyUI (real, via /upload,
  /prompt, WS progress, /history poll, /view) is primary; the placeholder keeps
  the loop demonstrable and gives graceful degradation when ComfyUI is down.
- Pluggable `FrameSource` seam: File (offline fixtures) + ScreenCapture shipped;
  Tier B/C (live Hub) deferred — they need a live Hub to validate.
- Scheduler guards overlap; metrics measure analysis vs generation separately.
- Balancing uses a **min-relative** weight (`1/(count-min+1)^2`) so laggards stay
  favoured all run; an absolute `1/(count+1)` flattens late and lets spread grow
  (caught by the balancing test).

**Assumptions (signed off):** offline-testable MVP; user supplies real ComfyUI +
7 character refs; settings persist to localStorage; session log exports JSON.

**Alternatives considered:** A1111/Draw Things adapters (user chose ComfyUI);
placeholder-only generation (user escalated to a real service); React (rejected
— a framework runtime dep for a single-operator instrument).

**Deferred (open questions / M2+):** ComfyUI model+IP-Adapter for character
consistency, likeness-vs-drift policy, crossfade, editable prompt UI, presets,
ramps/clothing/fashion/overrun-fade/overdrive visuals.

<!-- FILE: pm_skills/project/file-map.md -->

# File Map

<!-- Add entries as files are created. One line per file. -->
<!-- Format: path — role or responsibility -->
<!-- Update when files are created, renamed, or deleted. -->
<!-- Hot whole-file read. See AGENTS.md → "Memory size budgets" for limits. -->
<!-- Map roles, not history. Move batch notes and change history to decision-log.md. -->

## Entry point

- `index.html` — HTML entry; mounts `#app`, loads `src/main.ts`.
- `src/main.ts` — bootstrap: builds shell, loads assets, wires engine + session
  controller + UI, manages swappable source/generator.

## Core modules

- `src/core/eventBus.ts` — typed pub/sub; the only cross-module channel.
- `src/core/cycleEngine.ts` — orchestrates one cycle; emits `cycle:*`; times-out → degrades.
- `src/core/scheduler.ts` — interval timer with overlap guard.
- `src/core/sessionController.ts` — session lifecycle (start/pause/resume/stop/reset) + tick.
- `src/core/metrics.ts` — analysis/generation timings, averages, buffer, keep-up status.
- `src/core/sessionLog.ts` — per-cycle records + JSON export/round-trip.
- `src/state/appState.ts` — control values (localStorage) + session timing.

## Domain (input / analysis / selection / generation / response)

- `src/sources/frameSource.ts` — FrameSource interface (CellKey→ImageBitmap).
- `src/sources/gridCrop.ts` — 3×3 cell-rect maths + crop (drops centre).
- `src/sources/fileSource.ts` — offline fixture-grid source.
- `src/sources/screenCaptureSource.ts` — getDisplayMedia source.
- `src/analysis/analyser.ts` — Analyser interface.
- `src/analysis/heuristicAnalyser.ts` — pure pixel heuristics + canvas wrapper.
- `src/selection/archetypes.ts` — archetype load + analysis-biased selection.
- `src/selection/characterPool.ts` — cast manifest + min-relative balancing.
- `src/generation/imageGenerator.ts` — ImageGenerator interface + request type.
- `src/generation/comfyuiGenerator.ts` — ComfyUI adapter (primary).
- `src/generation/comfyuiGraph.ts` — pure workflow-token parametriser.
- `src/generation/placeholderGenerator.ts` — canvas fallback generator.
- `src/generation/promptBuilder.ts` — baseline + analysis + cast → ScenePrompt.
- `src/response/sceneResponse.ts` — sensitivity (0–400%) → influence weights.

## UI

- `src/ui/dom.ts` — `h()` DOM helper + time formatters.
- `src/ui/controlPanel.ts` — session/tempo/scene-response/source/generator controls.
- `src/ui/outputDisplay.ts` — output stage + caption + live status.
- `src/ui/metricsPanel.ts` — timing table + keep-up indicator.
- `src/ui/logPanel.ts` — session-log list + JSON export.
- `src/ui/statusBar.ts` — app-bar session + generator-health chips.

## Styles and tokens

- `styles/tokens.css` — Carbon Gray 100 (`--cds-*`) + project (`--app-*`) tokens.
- `styles/app.css` — layout + Carbon-style component CSS.

## Config and constants

- `src/config/types.ts` — canonical domain types + AppEventMap.
- `src/config/constants.ts` — intervals, ranges, thresholds, ComfyUI paths, asset paths.
- `src/vite-env.d.ts` — Vite client types.

## Assets (user-editable, file-driven)

- `assets/archetypes/corporate-archetypes.json` — archetype library.
- `assets/prompts/baseline-corporate-style.md` — baseline prompt text (injected raw).
- `assets/prompts/response-rules.md` — response-mapping reference doc.
- `assets/characters/characters.json` + `_placeholder.svg` + `README.md` — cast manifest + placeholder.
- `assets/workflows/comfyui-default.json` — tokenised ComfyUI txt2img graph.
- `assets/fixtures/grid-{calm,energetic,dark}.svg` — offline test grids.

## Tests

- `tests/*.test.ts` — Vitest: analyser, characterPool, promptBuilder, metrics,
  comfyuiGraph, gridCrop, sceneResponse, sessionLog.

## Build and tooling

- `package.json`, `tsconfig.json`, `vite.config.ts` — npm + TS + Vite (dev-proxy to ComfyUI).
- `.editorconfig`, `.gitignore`, `.markdownlintignore` — scaffolding/lint config.
- `docs/` — input reference docs (source-notes, EXT-1 contract).

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

## Phase 1 — MVP loop (shipped 2026-06-03)

- M1-01 — Runnable Vite + TS skeleton, Carbon-style dark shell.
- M1-02 — Core: domain types, constants, typed EventBus, AppState (+localStorage).
- M1-03 — FrameSource seam; FileSource (SVG fixtures) + ScreenCaptureSource; gridCrop (drops centre).
- M1-04 — Heuristic analyser (pure pixel core + canvas wrapper).
- M1-05 — Archetype library load + min-relative balancing CharacterPool.
- M1-06 — Scene-response (0–400%) mapping + deterministic prompt builder.
- M1-07 — ImageGenerator seam + canvas PlaceholderGenerator (fallback).
- M1-08 — ComfyUI adapter (upload ref → /prompt → WS progress → /history → /view) + token graph builder.
- M1-09 — CycleEngine + overlap-guarding Scheduler; emits cycle:* events; times-out → degrades.
- M1-10 — Metrics (analysis/generation split, buffer, keep-up) + SessionLog (JSON export).
- M1-11 — UI: control/output/metrics/log panels + status bar; file-driven assets (archetypes, prompts, characters, workflow, fixtures).
- M1-12 — Vitest specs (33) for analyser, balancing, prompt builder, metrics, graph builder, grid crop, session-log round-trip.

Outcome: the full capture→analyse→select→generate→display loop runs locally with
timing metrics and a session log; ComfyUI is the primary generator with graceful
placeholder fallback. Build + 33 tests green. See decision-log 2026-06-03.

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

