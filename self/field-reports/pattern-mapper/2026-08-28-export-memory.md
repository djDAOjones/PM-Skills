<!-- field-report: project=pattern-mapper · date=2026-08-28 · type=export
     · pm-skills=canon 4.0.0 (installed as 3.17.1 on 2026-07-17 and upgraded to 4.0.0 the same day; never upgraded since; baseline taken before the pm-next v2 intake maps its history)
     · source=Git blobs under pm_skills/project/ at 348eb1692c5c16eb94d6c934cd8d9a42a78f6a95, taken 2026-09-16 by Claude Code
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained where present; the agent memory, the project transcripts and every session log stay in the local lane -->

# Project-memory export

Snapshot: `348eb1692c5c16eb94d6c934cd8d9a42a78f6a95`. Every tracked file under `pm_skills/project/`, including the archive chunks and tickets, so the memory can be read against the release in force without the repository.

| Repository-relative path | Source bytes at snapshot | Exported bytes after redaction |
| --- | ---: | ---: |
| `pm_skills/project/architecture.md` | 15165 | 15165 |
| `pm_skills/project/archive/INDEX.md` | 5210 | 5210 |
| `pm_skills/project/archive/decision-log-2026-07-16.md` | 5938 | 5938 |
| `pm_skills/project/archive/decision-log-2026-07-17-to-2026-07-19.md` | 56946 | 56946 |
| `pm_skills/project/archive/decision-log-2026-07-20-to-2026-07-23.md` | 98302 | 98302 |
| `pm_skills/project/archive/decision-log-2026-08-04-to-2026-08-05.md` | 28979 | 28979 |
| `pm_skills/project/archive/decision-log-2026-08-06-to-2026-08-09.md` | 113669 | 113669 |
| `pm_skills/project/archive/decision-log-2026-08-11-to-2026-08-12.md` | 78642 | 78642 |
| `pm_skills/project/archive/trajectory/trajectory-0001-2026-07-17-to-2026-07-20.md` | 18562 | 18562 |
| `pm_skills/project/archive/trajectory/trajectory-0002-2026-07-21-to-2026-07-22.md` | 7128 | 7128 |
| `pm_skills/project/archive/trajectory/trajectory-0003-2026-07-22-to-2026-07-23.md` | 3426 | 3426 |
| `pm_skills/project/archive/trajectory/trajectory-0004-2026-08-04-to-2026-08-09.md` | 16737 | 16737 |
| `pm_skills/project/archive/trajectory/trajectory-0005-2026-08-07-to-2026-08-09.md` | 5938 | 5938 |
| `pm_skills/project/archive/trajectory/trajectory-0006-2026-08-11.md` | 10390 | 10390 |
| `pm_skills/project/backlog.md` | 28373 | 28373 |
| `pm_skills/project/brief.md` | 4861 | 4861 |
| `pm_skills/project/conventions.md` | 4433 | 4433 |
| `pm_skills/project/decision-log.md` | 125716 | 125716 |
| `pm_skills/project/doc-deltas.md` | 6692 | 6692 |
| `pm_skills/project/file-map.md` | 44155 | 44155 |
| `pm_skills/project/tickets/CREATIVE-01.md` | 24746 | 24746 |
| `pm_skills/project/tickets/DATA-01.md` | 5339 | 5339 |
| `pm_skills/project/tickets/ICE-EXPLORER-01.md` | 5080 | 5080 |
| `pm_skills/project/tickets/ICE-PICKER-01.md` | 8626 | 8626 |
| `pm_skills/project/tickets/ICE-PROFILES-02.md` | 26118 | 26118 |
| `pm_skills/project/tickets/ICE-TAURI-01.md` | 5423 | 5423 |
| `pm_skills/project/tickets/PAINT-01.md` | 6400 | 6400 |
| `pm_skills/project/tickets/PRINT-01.md` | 6672 | 6672 |
| `pm_skills/project/tickets/PRINT-02.md` | 2090 | 2090 |
| `pm_skills/project/tickets/PRINT-TEST-01.md` | 2202 | 2202 |
| `pm_skills/project/tickets/SNAP-01.md` | 5190 | 5190 |
| `pm_skills/project/tickets/TWOCOLOUR-01.md` | 4704 | 4704 |
| `pm_skills/project/trajectory.md` | 16321 | 16321 |
| `pm_skills/project/wish-list.md` | 3913 | 3913 |

<!-- FILE: pm_skills/project/architecture.md -->

# Architecture — Pattern Mapper

<!-- Hot whole-file read. See pm_skills/memory-policy.md for limits. -->
<!-- Describe current structure only. Move historical batch notes to decision-log.md. -->

## Stack (decided — do not relitigate; see decision-log.md)

| Layer | Choice |
| --- | --- |
| Language | TypeScript, `strict: true` |
| Build/dev | Vite |
| UI | Carbon Design System web components + plain DOM; **no framework in the processing path** |
| Preview | Canvas 2D via OffscreenCanvas in a Worker; WebGL/WebGPU render later if profiling demands |
| Processing | Dedicated Web Worker(s); zero-copy transfers (`ArrayBuffer` transferables, `ImageBitmap`) |
| Native acceleration | Rust → WASM (`wasm-pack`, SIMD) for error diffusion; WebGPU compute (WGSL) for parallel stages |
| Capture | `getDisplayMedia` + user-drawn crop rect; frames via `ImageCapture`/`requestVideoFrameCallback` |
| PDF export | pdf-lib |
| Persistence | `.pmproj` project packages — a store-only zip holding canonical `project.json` beside the picture verbatim (schema v13; explicit save; legacy `.json` v1–v9 still loads); IndexedDB for **library** data — thread inventory, saved palettes, profiles, user colours — and, in its own database `pattern-mapper-designs`, the **design history** that restores the latest design on reopen and steers to explicit save (DUR-01, D179) |
| Tests | Vitest + golden-output fixtures |
| Future packaging | Tauri v2 (macOS ScreenCaptureKit plugin for arbitrary-region capture) — no code paths assume it |

## Repository layout

```text
src/
  core/            # Pure engine. No DOM, no Worker, no UI imports. Ever.
    types.ts       # PixelBuffer, Palette, StageParams
    pipeline/      # Stage implementations (TS reference)
      resize.ts
      adjust.ts
      reduce.ts    # palette mapping + LUT build
      dither.ts    # five dither methods (DitherConfig union)
      threshold-tiles.ts # Bayer + blue-noise threshold tiles
    color/         # sRGB↔linear↔Lab, distance metrics
    stats.ts       # stitch/colour counts
    project.ts     # (de)serialisation, schema versioning
    project-package.ts # .pmproj container: deterministic writer, bounded reader
  backends/
    wasm/          # thin TS adapters over the Rust crate
    webgpu/        # WGSL shaders + dispatch adapters
  worker/          # pipeline executor, scheduling, dirty-frame detection
  capture/         # getDisplayMedia session, crop-rect model
  export/          # png.ts, chart.ts, pdf.ts
  library/         # IndexedDB: inventory + palettes (store.ts), design history (snapshots.ts)
  ui/              # Carbon components, panels, preview host
crates/
  stitch-engine/   # Rust: error diffusion (+ future hot stages)
tests/
  golden/          # input fixtures + expected output buffers
docs/
  requirements.md  # full combined requirements spec (reference only)
```

## Core contracts

### PixelBuffer

```ts
interface PixelBuffer {
  width: number;
  height: number;
  data: Uint8ClampedArray; // RGBA, length = w*h*4
}
```

All pipeline stages are pure functions `(PixelBuffer, params) →
PixelBuffer` (or index buffers where noted). No stage touches the
DOM, reads globals, or mutates its input.

Fully transparent cells (`alpha === 0`) take no part in the dither
scan or error diffusion — they carry no colour, and quantising them as
opaque black would diffuse phantom error into the stitches beside a
`contain`/`fit` letterbox band. This is `=== 0` exactly, not the D9
`< 128` fabric threshold (a semi-transparent cell has a real colour);
the rule is mirrored bit-for-bit in the TS and Rust dither backends
(D49).

Dithering is a discriminated **`DitherConfig` union** (added at schema
v4): `none`; error-diffusion methods (Floyd–Steinberg, Atkinson,
Jarvis) carrying `serpentine` + `strength` (0–1, fraction of error
diffused); threshold methods (ordered Bayer 8×8, blue-noise 32×32)
carrying `strength` alone (0–2 × a ±48/255 base amplitude), tiles from
`threshold-tiles.ts`. Invalid combinations cannot be expressed
(D61/D62).

### Stage backends

```ts
type Backend = 'ts' | 'wasm' | 'webgpu';

interface Stage<P> {
  name: string;
  backends: Partial<Record<Backend, StageFn<P>>>; // 'ts' is mandatory
}
```

- The TS implementation is the **reference**: always present, ground
  truth for golden tests, automatic fallback when WASM/WebGPU are
  unavailable or fail.
- WASM/WebGPU implementations must be bit-exact vs. the TS reference
  where the algorithm is deterministic (error diffusion), or within a
  documented tolerance where not (GPU float rounding in colour math).
- Backend selection is per-stage, routed by the colour **metric**, not
  by runtime profiling: `lab → ts` (the TS path prunes candidates),
  `rgb → wasm`. The wasm crate implements exactly Floyd–Steinberg at
  full strength, so `routeDither` sends every other `DitherConfig` to
  `ts` unconditionally and the wasm adapter delegates defensively when
  params say otherwise — a backend may never substitute a different
  method (D62). Routing holds no state — D42's startup calibration was
  removed, not retuned (D48). A recorded per-stage override exists
  (`setSelectedBackend`, applied where routing has no opinion) but is
  currently reachable only from tests and audits — there is no
  user-facing backend override yet. The measurement harness can
  additionally force a backend per stage via the worker *request*
  (`force`, above even routing; M13-PROF-03) — harness-only by
  construction: it is not on `PipelineConfig`, so it cannot persist
  or reach a project file.

### Pipeline

Ordered list of stage instances + params, executed in the worker.
Order is data, not code — it is stored in the project file and the
UI can reorder it (requirements §7). Default order:
`adjust → resize → reduce(+dither)`. The `adjust` stage is still
**omitted from the built stage list while its params are the
identity** — including it would buy a full-frame clone and nothing
else (D48/M5-PERF-25) — but since ADJUST-01 (D202) those params are
real: one three-point lightness curve carrying the black and white
points at its ends, plus global saturation, applied in Lab. It is the
only stage doing per-pixel colour maths at *source* resolution, so its
hot loop tables the two transcendental steps (≈ 189 → 70 ms/MP in
node) against a documented tolerance of ≤ 1 sRGB level per channel.
Adjustments change what the quantiser sees, never which threads it may
choose, so the LUT fingerprint (D46) is untouched by them — but the
full-RGB twin **keeps** them, because the count-limit selection source
and the compare half are both "the picture as the design renders it".

### Thread identity and the palette policy (M7)

Identity is `brandId:reference` (`Thread.id`); RGB is a display value
only. Threads are never merged because their colours match — the
catalogue holds 3,338 threads across eight brands at just 2,830
distinct colours, so RGB de-duplication would delete ~500 real threads
(D55/D56).

Because two threads can render identically, "which thread is this
stitch?" has no answer in the pixels. Stages that map to a palette
therefore emit a **palette-index sidecar** on their output buffer
(`PixelBuffer.indices`, `EMPTY_INDEX = 0xffff` for fabric), transferred
across the worker boundary alongside the pixels. A stage that
invalidates it (resize after reduce, under `reduce-first`) omits it,
and stats fall back to counting colours with no reference rather than
guessing one.

Which threads a conversion may use is decided by one pure layer:

| Module | Owns |
| --- | --- |
| `thread-catalogue.ts` | Brands, threads, identity, union ordering |
| `palette-policy.ts` | brands ∩ source ∩ ownedOnly − excluded, + locks/preferences → `PermittedSet` + typed conflicts |
| `palette-selection.ts` | Colour-count selection and lock/prefer auto-fill over a weighted Lab distribution |
| `palette-resolve.ts` | The single entry point composing the two, count applied **last** |
| `palette-presets.ts` | Built-in algorithmic LCh schemes |
| `thread-equivalents.ts` | Nearest cross-brand equivalent, curated over computed |

Nothing there throws: every failure is a `PaletteConflict` with a
severity and a user-facing sentence. The count limit selects *from* the
permitted set, so it can never widen one — the invariant M7-ACCEPT-01
checks.

Count selection reads the resized **full-RGB** grid buffer, never the
pipeline's own output: selecting from an already-reduced image feeds
the selector its previous answer, so a design narrowed to 12 colours
could never widen back to 30. It is fetched once per source or geometry
change through the export route, not per frame.

Library data (thread inventory, saved palettes) lives in IndexedDB
behind `src/library/store.ts`, outside `src/core/` — core consumes a
plain immutable set of allowed identities. The memory fallback is
announced through `LibraryStore.persistent`, never silent.

### Colour reduction strategy

1. On palette, metric or tone change, build a LUT: 15-bit quantised
   RGB (32,768 entries) → nearest palette index, computed once in the
   worker (CIELAB distance by default; metric pluggable). The LUT
   stores palette *indices*, so its cache key is a content fingerprint
   of the entries **in order** — never the palette name (D46) — plus,
   since TONE-01, the tone fingerprint (weight, curve, cuts), because
   an engaged tone is baked into the entries. An engaged tone builds
   on the TS path only (the WGSL kernel has not learned the weights)
   and matches in the tone space (curved L, w·a, w·b — `tone.ts`);
   dither then diffuses its error in that same space (D200/D201).
2. Per-pixel mapping is then an array lookup — this is why the TS
   path is already fast; WASM/WebGPU accelerate LUT *construction*
   and non-LUT paths (dither error terms use exact arithmetic).

### Worker & scheduling

- Main thread: capture + UI only. One processing Worker owns the
  pipeline and an OffscreenCanvas for the preview.
- Frames are coalesced: if a frame arrives while processing, keep
  only the newest (latest-wins, no queue).
- Dirty-frame detection: hash a 64×64 downsample of the crop; skip
  identical frames (requirements §22). The downsample averages small
  edits away, so an unchanged-looking source is re-processed anyway
  after `DIRTY_MAX_STALE_MS` — bounded staleness, not silent loss (D46).
- Every worker request answers exactly once (result or error): the
  client's latest-wins gate releases only on a response, so a silent
  path wedges live preview permanently (D46).
- Preview may run at reduced quality under load; **exports always
  re-run the pipeline at full quality**.

## Performance budgets (measured baselines, asserted by `npm run bench`)

The bar that binds is the product promise: **≥ 4 preview updates/sec at
≤ 300² in the browser**. Since M13-IMPL-02 it is *asserted*, not merely
stated — the driven capture leg of `npm run bench:auto` fails when the
sustained rate drops below 4/sec or any frame is missed or dropped
(D135). 1024² is an export/finishing grid, not a live-editing one, and
the brief's "≤ 100 ms at 1024²" line was **retired** at D135: what
binds there is correctness plus an honest published median.

Two kinds of bound row, never interchangeable:

- **Regression baselines** — an observed median naming its **runtime,
  workload ID and build**, guarded ×1.35 plus a staleness guard (a row
  running > 2× faster than recorded fails, so the baseline cannot go
  slack). They answer "did this get worse?". All node rows are these.
- **Product targets** — the promise above, at a browser boundary. Only
  driven **base** capture rows may carry one; `.edit-<class>` rows and
  anything measured against real Photoshop are permanently unbindable
  (the bv2 amendment, enforced in code). `interaction` stays published,
  not bound.

The canonical rows and the boundaries they bind to live in
`docs/measurement-contract.md` (boundary contract **bv2**);
`npm run bench` writes the node report and asserts the baselines,
`npm run bench:auto` the browser leg and its targets. Budgets bind to
**warm, steady-state** calls — preparation is budgeted separately and
cache misses publish as their own cold rows.

Node is **not** a browser proxy (the same TS resize runs ~3.5× slower
in-browser while dither is ~1.1×), so every row names the runtime it was
taken on, and node never asserts a browser promise through a multiplier.
The aspirational 5/10/15/100 ms table that stood here missed every row
but preview-render from the day it was written (D43) and was replaced by
measured reality at M5C/M5D (D47/D48).

## Project file (JSON, versioned)

`{ schemaVersion, source, pipeline, palette, symbols, gridStyle,
preview, export, estimates }` — see requirements §20 for the full field
inventory. Loading an older `schemaVersion` must migrate, never fail
(currently **v13** — `SCHEMA_VERSION` in `src/core/project.ts` — with
forward steps from v1–v12; v5 added the colour and dither profile refs
at M15 under the D114 compatibility waiver, v6 the symbol-assignment
block and chart mode at M9, v7 the grid-styling split at M11, v8 the
PDF pagination fields at M10, v9 the fabric/estimation settings at
M12, v10 the `source` block `{ entry, type, name }` naming the embedded
picture at DUR-01, v11 the colour swaps in `palette.design`
(ICE-RECOLOUR-01), v12 the tone block `pipeline.tone` and the
colour-use floor `palette.design.floor` (TONE-01), v13 the image
adjustments `pipeline.adjust` + `adjustProfileRef` (ADJUST-01)). A file saved by a
*newer* version is refused with a message naming both versions, never
silently misread.

Since DUR-01 (D179) the file on disk is a `.pmproj` **package**
(`src/core/project-package.ts`): a store-only zip holding `project.json`
and the picture's bytes verbatim, deterministic (fixed 1980 stamps,
fixed layout) so the round trip stays byte-identical, and read as
untrusted input — sizes checked before any copy, CRCs verified,
compressed, encrypted, zip64 and truncated archives refused with a
sentence. Legacy `.json` files are told apart by their first bytes.

The `gridStyle` block (v7, M11) is `{ screen, print, preset }`: one
style-values shape (`src/core/grid-style.ts`) persisted twice —
screen in CSS px driving the preview overlay, print in raster px
driving the chart PNG and the PDF's embedded chart — plus preset
provenance (`src/core/grid-presets.ts`; null = custom). Canonical
values always win: the preset id records where the values came from
and can never restyle a saved design.

The `palette` block holds **both** halves, and needs both (D55):

- `policy` — the user's intent (enabled brands, source, `ownedOnly`,
  count request, locks/preferences/exclusions). Policy alone would let
  a catalogue release silently change a saved design.
- `snapshot` — the exact ordered threads that rendered it. Snapshot
  alone would lose the intent, so nothing could be recomputed.

On reopen the snapshot is authoritative; library drift is reported,
never repaired by name. `null` is full-RGB mode.

<!-- FILE: pm_skills/project/archive/INDEX.md -->

# Archive index

<!-- Browsable map of cold storage: one row per archive file, so a reader
     never opens a chunk to learn what it holds. Counts appear only on
     frozen archive rows, never live files. Maintained by prune passes. -->

| File | Type | Range | Size | Description |
| --- | --- | --- | --- | --- |
| `decision-log-2026-07-16.md` | decision-log | D1–D10 (2026-07-16) | 10 entries / 802 words | Founding decisions: web platform, getDisplayMedia capture, resize-first pipeline, TS ground truth, backend split, LUT colour matching, Carbon UI, versioned JSON format, product name, MVP palette. |
| `decision-log-2026-07-17-to-2026-07-19.md` | decision-log | D11–D45 (2026-07-17 → 2026-07-19) | 35 entries / 8,239 words | Framework 4.0.0 upgrade; M0–M4 milestones (toolchain/gate, engine core, preview & info UI, exports, live capture); the M5 backend program through the M5B audits (profiling harness, stitch-engine crate, WASM+WebGPU backends, automatic backend selection, benchmark); plus the D26 prune record. |
| `decision-log-2026-07-20-to-2026-07-23.md` | decision-log | D46–D90 (2026-07-20 → 2026-07-23) | 45 entries / 14,341 words | M5 correctness closes and measured budgets (M5B-FIX → M5F); M6 companion layout; M7 thread identity, inventory & palette policy; M8 dithering expansion; M13 measurement contract + profiling programme (D64–D72); M14 UI/UX excellence from audit through the second look (D73–D90); incl. prune D59, doc-sync D60, roadmap refactor D63. |
| `decision-log-2026-08-04-to-2026-08-05.md` | decision-log | D91–D105 (2026-08-04 → 2026-08-05) | 15 entries / 4,382 words | M14 third look: the eleven-task triage and its shipped arc (cold shell state, viewport arc, capture-region section, colour limit, thread highlight, the aspect-follows split D101); the ACCEPT-01 first pass and its six routed fixes (D102–D105). |
| `decision-log-2026-08-06-to-2026-08-09.md` | decision-log | D106–D148 (2026-08-06 → 2026-08-09) | 43 entries / 16,636 words | M14 looks four to six and end review (D106–D127); the whole M15 colour & dithering profiles build from joint scoping through the gallery signatures to the combined M13/M15 close (D114–D148); M13's synthesis, bench governance and ship (D128–D148 span); incl. prune D120. Everything before the D149 roadmap reorganisation. |
| `decision-log-2026-08-11-to-2026-08-12.md` | decision-log | D149–D171 (2026-08-11 → 2026-08-12) | 23 entries / 11,544 words | The D149 roadmap reorganisation and Batch C0 (D149–D159: rename, doc-sync + AUDIT-01, DIAG-01/KEY-01, EXPORT-01, M8-GOLD-02, DATA-01, UI-06/A11Y-01, FLICKER-01/ZOOM-01, STALE-01/DOCS-01, DITH-06); Track C's opening and the licence baseline (D160–D164); Track A's build — M9 (D165, D170), M11 (D167), M10 (D168), M12 (D169) — and DUR-01's scope signature (D171). Everything before the first public deploy (D172). |
| `trajectory/trajectory-0001-2026-07-17-to-2026-07-20.md` | trajectory | M0–M5 (2026-07-17 → 2026-07-20) | 6 phases / 2,479 words | Shipped-work narrative for M0 scaffold & quality gate, M1 engine core, M2 preview & info UI, M3 exports, M4 live capture, and M5 WASM+WebGPU backends (v0.1.0 → M5). |
| `trajectory/trajectory-0002-2026-07-21-to-2026-07-22.md` | trajectory | M6–M8 (2026-07-21 → 2026-07-22) | 3 phases / 986 words | Shipped-work narrative for M6 Photoshop companion layout, M7 palette & colour strategy (eight brands, one policy layer), and M8 dithering expansion (engine + controls; maintainer acceptance still open in the backlog Icebox). |
| `trajectory/trajectory-0003-2026-07-22-to-2026-07-23.md` | trajectory | M13 phases 1–2 (2026-07-22 → 2026-07-23) | 1 phase / 461 words | Shipped-work narrative for the M13 profiling programme: bv2 measurement contract + browser harness, PROF-01..05 evidence, DEF-01/02 fixes; milestone remainder open in the backlog at archive time. |
| `trajectory/trajectory-0004-2026-08-04-to-2026-08-09.md` | trajectory | M13 remainder + M14 (2026-08-04 → 2026-08-09) | 2 phases / 2,332 words | Shipped-work narrative for the M13 remainder (MEAS-03/04, PROF-04/05, SYNTH-01, IMPL-01/02, DEF-03, ACCEPT-01/02, INFRA-CHECK-01) and the whole of M14 UI/UX excellence (audit → spec → the six owner looks → VERIFY/ACCEPT). Both complete at archive time: M13 shipped 2026-08-09 (D148), M14 accepted 2026-08-07 (D127). |
| `trajectory/trajectory-0005-2026-08-07-to-2026-08-09.md` | trajectory | M15 (2026-08-07 → 2026-08-09) | 1 phase / 828 words | Shipped-work narrative for M15 colour & dithering profiles: scoping signatures, the colour and dither halves on the shared takeover editor, schema v5, the sixteen signed gallery profiles, and the combined acceptance close (D148). Complete at archive time. |
| `trajectory/trajectory-0006-2026-08-11.md` | trajectory | Batch C0 (2026-08-11) | 1 phase / 1,472 words | Shipped-work narrative for Batch C0 — Sharpen the tools: the mechanical tooling and defect batch between M15 and Track A (rename, audits, diagnostics, export assertions, golden fixtures, catalogue sweep, the first accessibility pass, flicker/zoom fixes, docs tooling, DITH-06). Complete at archive time: shipped 2026-08-11 (D159). |

<!-- FILE: pm_skills/project/archive/decision-log-2026-07-16.md -->

# Decision log archive — 2026-07-16 (D1–D10)

<!-- Archived verbatim from decision-log.md on 2026-07-19 (prune pass).
     Append-only history; do not edit. Cold tier: grep + line-range only. -->

## D1 — Web platform, not Max/MSP, not native (2026-07-16)

**Decision:** Build as a TypeScript web application.
**Why:** Development is AI-assisted (Windsurf + Anthropic API); LLMs
have maximum leverage in TypeScript and near-zero in Max patching.
Web covers macOS-first now and wider distribution later (URL or
Tauri). Max's prototyping advantage is nullified by AI codegen speed.
**Rejected:** Max/MSP (opaque to LLMs, weak UI/palette/project
management, poor distribution); native Swift (slower iteration,
forecloses easy cross-platform).

## D2 — No Photoshop UXP plugin; capture via getDisplayMedia (2026-07-16)

**Decision:** Capture the source by screen/window capture, not by
integrating into Photoshop.
**Why:** The previous prototype (Photoshop-Live-Ditherer) was slow
largely *because* of UXP: constrained JS runtime, no real Web
Workers, slow pixel transfer out of the document, React re-renders
around pixel loops. Screen capture decouples us from Adobe entirely
and works with any source app.
**Consequence:** Arbitrary-region capture = full-screen/window
capture + our own crop rect. Native ScreenCaptureKit via Tauri is the
future path if browser capture UX becomes annoying.

## D3 — Resize-first pipeline default (2026-07-16)

**Decision:** Default processing order downsizes to the stitch grid
*before* colour reduction and dithering.
**Why:** All expensive per-pixel work then runs on ≤ 1M cells
(usually ~40k), the single biggest performance lever vs. the old
prototype which dithered at document scale. Alternative orders remain
available as data (requirements §7) because they are creatively
different, not because the default is in doubt.

## D4 — TS reference implementation is ground truth (2026-07-16)

**Decision:** Every pipeline stage ships a pure TypeScript
implementation first; WASM/WebGPU are drop-in backends behind the
same interface, adopted per-stage only where profiling shows need.
**Why:** Correctness anchor for golden tests, universal fallback,
and the shape AI tooling handles best (isolated, testable modules).
**Consequence:** The TS backend is never deleted or allowed to rot;
CI runs golden tests against all available backends.

## D5 — Backend split: error diffusion on CPU/WASM, parallel stages on WebGPU (2026-07-16)

**Decision:** Floyd–Steinberg (and future error-diffusion kernels)
run in Rust→WASM with SIMD. Colour-distance/LUT work, ordered/blue-
noise dithering, adjustments and stitch rendering target WebGPU.
**Why:** Error diffusion is inherently sequential (neighbour
dependency) — a bad GPU fit; palette matching is embarrassingly
parallel — an ideal compute-shader fit. "WebGPU everything" is
explicitly rejected.

## D6 — LUT-based colour matching (2026-07-16)

**Decision:** Nearest-palette lookup via a precomputed 15-bit RGB →
palette-index table (32,768 entries), rebuilt on palette/metric
change.
**Why:** Turns per-pixel CIELAB search into an array index; typically
50–100× faster and makes the TS path viable at real-time rates on its
own.
**Trade-off:** 15-bit quantisation error is below one thread-colour
step in practice; the dither stage uses exact error terms so
diffusion quality is unaffected.

## D7 — Carbon Design System for UI chrome (2026-07-16)

**Decision:** Carbon web components for panels/controls (framework
default from PM-Skills); canvas preview is custom.
**Why:** Framework default, accessible (WCAG 2.2 AAA target), and
web components avoid pulling React into the app — keeping the hot
path framework-free (a direct lesson from D2).

## D8 — Versioned JSON project format from day one (2026-07-16)

**Decision:** `schemaVersion` field in every project file; loaders
migrate forward, never reject.
**Why:** Wider distribution later (requirements §26 Q11/Q13) makes
format stability a product feature; retrofitting versioning is
painful.

## D9 — Product name "Cross Stitch Lens"; provisional defaults confirmed (2026-07-16)

**Decision:** Adopt "Cross Stitch Lens" as the product name (replacing
the working title "StitchLive" everywhere). Confirm all four
init-interview (provisional) defaults: (7) MVP ships one
preset palette as a DMC-subset placeholder until the owner's hex
spreadsheet is supplied; (9) alpha below 50% = empty stitch (renders
as fabric colour, excluded from colour counts); (17) chart
coordinates start at 1; (18) tick marks align to grid boundaries.
**Why:** Settled during init — renaming later is not a clean
find-and-replace, and the provisional defaults are the sensible MVP
positions, each revisable post-MVP (0-origin and centre-aligned ticks
are wish-list items).

## D10 — MVP palette: owner DMC/Anchor map, generated to JSON (2026-07-16)

**Decision:** The MVP preset palette is the owner's supplied
DMC/Anchor thread map. The raw CSV is tracked at
`src/core/palettes/dmc-anchor-map.csv` (the source of truth);
`scripts/build-palette.mjs` derives `src/core/palettes/dmc.json`, which
the engine ships. This supersedes the D9 (7) "DMC-subset placeholder".
Generation rules: one entry per unique DMC code (first occurrence
wins, since the CSV lists a DMC once per Anchor equivalent); rows
without a valid `#rrggbb` hex are skipped; Anchor "NA" becomes null;
descriptions kept verbatim. First run: 533 colours from 679 rows
(4 skipped, 142 duplicate DMC codes collapsed).
**Why:** A tracked, mechanically-generated palette is reproducible and
avoids inventing colour data. Keeping the CSV as source lets the map be
re-derived if the owner updates it.
**Provisional:** the JSON schema (`{ code, name, hex, rgb, anchor }`) is
minimal and may be revised by the M1 palette model; the Anchor cross-
reference and per-manufacturer thread metadata are carried but not yet
used.

<!-- FILE: pm_skills/project/archive/decision-log-2026-07-17-to-2026-07-19.md -->

# Decision log archive — 2026-07-17 → 2026-07-19 (D11–D45)

<!-- Archived verbatim from decision-log.md on 2026-07-21 (prune pass).
     Append-only history; do not edit. Cold tier: grep + line-range only. -->

## D11 — Upgraded pm-skills framework 3.17.1 → 4.0.0 (2026-07-17)

**Decision:** Upgraded pm-skills framework.
**Version:** 3.17.1 → 4.0.0.
**Source:** `https://github.com/djDAOjones/PM-Skills.git` (fresh clone).
**What changed:** Framework sync per the 4.0.0 (DIST-BOUNDARY) upgrade
actions — overwrote `init.md`, `GUIDE.md`, `MANIFEST.md`,
`prompts/upgrade.md`, `integrations/adopt.md`,
`integrations/init-mvp.md`, `VERSION`, `CHANGELOG.md`; added
`pm_skills/templates/` (the three rulebook templates, now shipped
inside the distributable). Root rulebooks untouched (project-owned).
Housekeeping per the same entry — removed framework-source-repo files
never meant for consuming projects: `self/` (maintainer memory),
`CONTRIBUTING.md`, `scripts/gen-file-map.mjs` (source-repo fork; the
scaffold copy at `pm_skills/scaffold/gen-file-map.mjs` is the one
`AGENTS.md` already names), and the dead `self/` ignore rules in
`.gitignore`, `.markdownlintignore`, `.markdownlint-cli2.jsonc`,
`cspell.json`, `.editorconfig-checker.json`. Kept (in active use as
the interim docs-lint gate until M0): `package.json` (renamed
`pm-skills` → `cross-stitch-lens`, repository URL corrected),
`scripts/check-docs.mjs` (path validation now skips framework-class
`pm_skills/` docs, still checks `pm_skills/project/`),
`.github/workflows/lint.yml`, `.githooks/pre-commit`.
`.windsurf/workflows/next.md` rewritten from the source repo's
self-hosted mapping to the standard consuming-project form.
**Local framework customisations:** none found (Step 4 diff clean).
**Gate:** `npm run check` green (all four steps) after the change.

## D12 — M0 toolchain and gate composition (2026-07-17)

**Decision:** M0 shipped on current majors — Vite 8, TypeScript 6
(strict + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`),
ESLint 10 flat config, Vitest 4, `@types/node`, Prettier (format only,
never the gate). All dev dependencies; zero runtime dependencies.
`check` composes six non-mutating steps: typecheck, ESLint, Vitest,
production build, the docs-lint baseline (markdownlint, check-docs,
cspell, editorconfig), and a report-only secret scan
(`scripts/check-secrets.mjs`). CI (`.github/workflows/lint.yml`) runs
`npm run check` on Node 22 — local green = CI green.
**Why (notable calls):**

- Core isolation is enforced with `no-restricted-imports` (layer-dir
  patterns + a regex banning package imports) plus
  `no-restricted-globals` in `src/core/` — tsc cannot express the
  boundary; ESLint can.
- `Stage<P>` is invariant in `P`, so heterogeneous pipelines use a
  `stageInstance()` helper that erases `P` only after stage+params are
  verified together — the one sanctioned erasure; `any` stays banned.
- Initial golden fixtures were generated (not regenerated) by the
  committed `scripts/gen-golden-hello.mjs`; the protected-file rule
  applies from this commit forward.
- `check-docs` no longer validates paths in the decision log: an
  append-only record legitimately references paths that later vanish
  (same class as the framework CHANGELOG exclusion).
- `no-console` is on app-wide; `src/diagnostics/log.ts` carries the
  single sanctioned disable, and Node CLI scripts are exempt.
- Product version v0.1.0 (M0); build identity injected at build via
  Vite `define` (`v0.1.0+YYYYMMDD.shortsha`).

## D13 — Colour-reduction vertical: conversions, palette, LUT, reduce (2026-07-18)

**Decision:** Shipped the M1 colour-reduction foundation as one batch:
`src/core/color/` (conversions + metrics), the palette model over the
generated DMC data, the 15-bit LUT builder, and the reduce stage with
LUT and exact paths.
**Why (notable calls):**

- Conversions use the IEC 61966-2-1 sRGB curve/matrix and CIE 1976 Lab
  (D65/2°), pinned by golden tests against published reference values
  (tolerance 0.1) and a 1/255 round-trip invariant. Out-parameter API
  (`Float32Array` + offset) keeps hot loops allocation-free.
- Metrics return SQUARED distances — nearest-neighbour search only
  compares, so sqrt is never taken. CIE76 is the MVP metric; CIEDE2000
  stays on the wish-list (§6).
- LUT bins map to representative colours by bit replication
  ((v<<3)|(v>>2)) so pure black/white are exact; LUT[key] is computed
  against those representatives, making LUT↔exact agreement on bin
  centres a testable invariant. The LUT builder is pure core; hosting
  it in the worker belongs to the executor item.
- Reduce keeps both paths behind one params contract
  (`path: 'lut' | 'exact'`, optional precomputed `lut`): LUT for
  preview speed, exact for dither error terms and full-quality export.
  Alpha passes through untouched.
- The reduce golden fixture is hand-derived (2x2 vs an unambiguous
  4-colour palette, verifiable by inspection) rather than generated,
  so no generator script duplicates the algorithm under test.
- `ReduceParams` carries the palette object for now; palette-by-name
  serialisation is deferred to the project-file work (M3).

## D14 — Floyd–Steinberg dither: exact errors, serpentine, schema-level seed (2026-07-18)

**Decision:** Dither runs error diffusion in a `Float32Array` working
buffer with exact palette matching (never the LUT), a serpentine
option that mirrors both scan direction and kernel offsets, and alpha
excluded from diffusion (passthrough). `DitherParams.seed` exists in
the schema but is unused: Floyd–Steinberg is deterministic, and the
field is reserved so stochastic variants (wish-list §8) won't bump the
project-file schema.
**Why:** Exact error terms are the D6 trade-off's other half — LUT
quantisation is acceptable for plain reduction precisely because
diffusion quality never depends on it. Bit-exact determinism is the
reference bar future WASM backends must clear (backend discipline).
Working values are clamped to 0–255 before matching and the error is
computed from the clamped value, bounding runaway accumulation at
saturated edges.
**Tests:** golden 8x8 fixture (generated by the TS reference via a
temporary vitest file, then committed; generator deleted), a
hand-derived 1x4 diffusion trace, palette membership, cross-metric
determinism, mean preservation on a uniform field (±3), serpentine ≠
raster, alpha/purity.

## D15 — Resize: pure area-average reference, grid-always output (2026-07-18)

**Decision:** The resize TS reference is a pure exact-area resampler
(premultiplied alpha) — no canvas/drawImage in core. Output is always
grid-sized; uncovered cells are RGBA(0,0,0,0) empty stitches (D9),
placement centred. Modes: stretch / contain / cover, and `fit` defined
as scale-down contain (never enlarges — CSS scale-down semantics),
since plain aspect-fit is already `contain`. Grid dimensions validate
as integers 1–1024 (`RangeError` otherwise).
**Why:** Core purity forbids the GPU `drawImage` path in the budget
table — that arrives later as an accelerated backend behind the same
stage contract, exactly like WASM/WebGPU elsewhere (D4/D5). Area
averaging is deterministic and golden-testable where bilinear kernels
vary by implementation; premultiplication stops transparent pixels
bleeding colour into edges, which matters when alpha means "empty
stitch". Manual positioning/padding within the grid stay post-MVP
(§4 extras, wish-list).
**Tests:** committed golden (9x5 → contain 4x4, translucency included)
plus hand-derived exact cases: checkerboard average, letterbox rows,
symmetric crop, unscaled centring, no-bleed premultiply, bounds,
determinism/purity.

## D16 — Worker executor: config over stages, thin shell, latest-wins (2026-07-18)

**Decision:** The serialisable `PipelineConfig` — not a stage array —
crosses the worker boundary; `buildStages()` in core turns it into the
executable list, with both §7 presets (`resize-first` default per D3,
`reduce-first` for comparison). The `adjust` stage ships as the
identity hook (brief excludes ops beyond the hook; the slot exists so
presets and future project files already carry it). When dithering is
on, the dither stage IS the quantiser — reduce is not also run. The
worker entry is a two-line postMessage shell; executeRequest,
the LUT cache (one build per palette+metric), and the latest-wins
`Coalescer` are plain modules tested hermetically. Frames fail as
error *responses*, never worker crashes. Pixel data crosses as
transferred ArrayBuffers both ways.
**Why:** Config-as-data keeps order in the project file (§7,
non-destructive), keeps postMessage payloads serialisable, and lets
the worker own LUT lifetime (the D13 deferral, now closed). A thin
shell means the only untested code is two lines of glue — the real-
browser pass is named a manual-gate item for M2's preview UI.
**LUT cache key** is palette name + entry count: sufficient while
palettes are built-in presets; user-defined palettes (post-MVP) must
revisit it.

## D17 — Image import + minimal M1 dev shell (2026-07-18)

**Decision:** All three import routes (§3: file picker, drag-drop,
clipboard paste) funnel one decode path — `createImageBitmap` →
`OffscreenCanvas` → `PixelBuffer` — into the worker client at a fixed
demo config (200×200 contain, DMC, Lab, serpentine dither,
resize-first). The shell renders the result 1:1 with CSS pixelated
upscale; thread colours stay unfiltered content. The pure half
(file-list filtering) is hermetically tested; decode/render were
verified in the running browser, which also exercised the worker
round-trip with transferred buffers — the D16 manual-gate item, now
closed.
**Documented deviation (UI-STANDARDS):** this is the minimal M1 dev
shell — plain semantic HTML honouring the AAA basics (visible label,
7:1 text contrast both schemes, focus rings, ≥44px file-input target,
role="status" live region, drop/paste never the only route). The
Carbon panel layout, controls, and real preview are M2's own backlog
items, not a gap.
**Why:** M1's acceptance line requires the dithered output to
*render*, so a render surface is in scope now; keeping it deliberately
throwaway (one canvas, no zoom) avoids pre-building M2. Fixed config
because controls without Carbon panels would be rework.

## D18 — Stats subset + M1 milestone close (2026-07-18, v0.2.0)

**Decision:** `computeStats` runs one pass over an OUTPUT buffer:
stitch/empty partition at alpha ≥ 128 (the D9 50% rule; empty cells'
colours are ignored), distinct-colour count, per-colour counts and
percentage OF STITCHES (not cells), sorted by count with a hex
tiebreak for determinism; thread references attach when the colour
matches the active palette, so full-RGB mode simply carries none.
Runs on the main thread over the returned frame for now — M2's "info
panel bound to stats" decides whether it moves into the worker.
Physical dimensions / thread length / skeins stay post-MVP (§11
remainder, wish-list).
**M1 closes at v0.2.0** (milestone MINOR bump). Verified in-browser:
320×240 PNG → 200×150 in a 200×200 grid = 30,000 stitches + 10,000
empty (sums to the cell count), 111 DMC colours, dithered.
**Acceptance caveats (seed-backlog drift, for maintainer sign-off):**
(1) "16-colour" output — MVP scope is one preset palette (DMC 533) or
full RGB; no 16-colour palette exists by design (D9/D10). (2)
"save→load→save byte-identical" — the project file is M3's own item;
that clause is deferred to M3, not silently claimed. (3) Golden
fixtures cover resize/reduce/dither/identity; the adjust hook shares
the identity implementation and gets its own fixtures when §9 ops
land.

## D19 — Preview surface: worker-owned canvas, main-owned viewport (2026-07-18)

**Decision:** The preview canvas transfers control to the processing
worker (`transferControlToOffscreen`) — the architecture's "one
worker owns the pipeline and an OffscreenCanvas". The worker keeps an
ImageBitmap of the last processed frame (snapshotted before the
pixels transfer back for stats) and redraws on view/resize messages
without reprocessing; smoothing is off, so stitches stay square. All
viewport mathematics — fit-to-window, cursor-anchored zoom clamped to
5%–6400%, pan clamped to keep ≥32 device px visible — lives main-side
in pure, hermetically tested functions; the worker applies a finished
transform blindly. Input per UI-STANDARDS canvas accessibility:
focusable host with visible ring, `+`/`−`/`0` keys, arrow-key pan
(Shift ×4), wheel zoom anchored at the cursor, drag pan with pointer
capture, 44px toolbar buttons with a zoom readout. Auto-fit applies
per new image and disengages on any manual view change.
**Why:** Worker-side redraw makes pan/zoom independent of pipeline
cost (the 60 fps acceptance bar); main-side maths keeps the testable
logic out of the untestable-in-node worker context; device-pixel
transforms keep the surface DPR-crisp.
**Verified in-browser:** auto-fit 296%, buttons ×1.25² → 462%, `0`
refits, focus lands on the host, crisp pixel squares at 1127%.

## D20 — Grid overlay: pure geometry, worker draw, legibility auto-hide (2026-07-18)

**Decision:** The grid overlay (§15 subset) renders worker-side in
`preview-surface.ts`, above the stitches, in device space — line
thickness is zoom-independent, matching chart convention. Geometry
lives in a pure module (`src/worker/grid.ts`, D19 pattern: testable
maths + a blind drawing shell): lines on cell boundaries at minor/major
intervals, both outer edges always present, minor never duplicating
major, spans snapped to whole device pixels. A line class auto-hides
when its spacing falls under 4× its thickness, so a zoomed-out preview
never smears into a solid wash. `GridStyle` (show, minor/major
interval, one line colour, per-class thickness) crosses the protocol as
a `grid` message with thicknesses pre-scaled to device px by the main
thread — the worker stays DPR-blind, same contract as the view
transform. Interim UI is a toolbar "Grid" toggle (aria-pressed +
inverted-fill on state); the full Carbon grid panel and the remaining
§15 controls (opacity, border, above/below, dashed, empty-cell
visibility) stay with their own backlog items. GridStyle joins
`ProjectFile` when M3 save/load lands.
**Why:** Device-space drawing keeps grid redraw on the existing
view-message path (no reprocessing, 60 fps bar intact); the legibility
rule makes the default grid safe at any zoom without a control.
**Verified in-browser:** majors-only at 216%, minors appear at 422%,
toggle hides/shows instantly, console clean.

## D21 — Tick marks + numbering: boundary labels, origin 1, thinning (2026-07-18)

**Decision:** Basic §16 subset: outward tick marks with numbers on
the top and left edges only, aligned to grid boundaries at the major
interval, counting whole stitches with origin at 1 (the boundary
after stitch 10 reads "10"; the 0 edge is never labelled). Geometry
joins the pure grid module: `labelInterval` doubles the major
interval until neighbouring labels sit ≥ 48 device px apart, so
zoomed-out numbering thins (10 → 20 → 40…) instead of colliding.
Ticks ride the existing `GridStyle` message and the interim Grid
toggle — one switch for all chart furniture until the Carbon panel
splits controls. Label text uses the page's computed text colour,
sent from main and re-sent on a `prefers-color-scheme` change (the
worker stays theme-blind); tick strokes reuse the grid line colour.
`fitView` gained an optional margin (24 CSS px × DPR at the call
site) reserving room for the furniture — it changes only the scale;
centring symmetry leaves the offsets untouched, so existing viewport
behaviour is preserved. The rest of §16 (per-edge placement, fonts,
directions, centre alignment, presets) stays parked; tick settings
join `ProjectFile` with M3 save/load alongside GridStyle.
**Why:** Boundary-aligned numbering at the major interval is the
cross-stitch chart convention; the thinning rule keeps the default
legible at any zoom with zero controls.
**Verified in-browser:** full 10-step numbering at 286% fit, thinned
to 20s at 146%, white labels in dark scheme, console clean.

## D22 — Split compare: full-RGB twin pass, clip-free draw (2026-07-18)

**Decision:** The split compare (§10) shows the *resized, unreduced*
source — `fullRgbVariant(config)` strips the palette, keeping preset,
grid and resize mode — not the native-resolution original. Both
halves then share grid dimensions and one transform, aligning
cell-for-cell, so the difference on screen is exactly what colour
reduction does. The worker caches the last source frame (stages are
pure, the request buffer survives processing) and reruns the cheap
full-RGB pass on frame arrival while comparing, or once on a late
compare-enable — no main-thread round-trip. Split position crosses
the protocol as a design-width fraction; UI is a Compare toggle plus
a native labelled range slider (keyboard-operable for free), shown
only while comparing. **Hard-won constraint: no `ctx.clip()` on the
transferred OffscreenCanvas.** The first implementation clipped the
source half; enabling compare then stalled Chromium's compositor —
page rAF stopped entirely (screenshots/scroll hung; worker and main
JS stayed alive) and recovered the instant compare was disabled,
reproduced in two tabs. The draw now uses a source-rect `drawImage`
(no clip, no save/restore) and the stall is gone.
**Why:** Comparing at grid scale isolates the reduction decision the
user is actually tuning; the twin-config approach reuses the whole
executor rather than growing a second render path.
**Verified in-browser:** smooth source left / dithered DMC right at
50%, divider tracks the slider to 25%, rAF probe healthy with
compare on, console clean.

## D23 — Info panel: pure row model, capped table, content swatches (2026-07-18)

**Decision:** The stats info panel (§11 bound to the preview) is a
summary line plus a colours-by-usage table docked below the canvas,
re-rendered per processed frame. The module splits per the project's
test convention: `buildRows` / `formatPercent` / `summaryText` are
pure and node-tested; `createInfoPanel` is the thin DOM half,
verified in-browser. The table caps at the top 30 colours with an
aggregated "+N more colours · M stitches" row — full-RGB mode can
emit thousands of distinct colours, and an unbounded per-frame table
rebuild would be both unreadable and slow. Swatches are decorative
(`aria-hidden`) beside the text label (thread "code name", else hex);
the hex always rides the row tooltip (colour-fidelity rule); swatch
backgrounds are content colours, never UI tokens. No `aria-live` on
the table — per-frame announcements would be noise; the existing
status line covers state changes. Counts use a fixed en-GB locale for
deterministic tests; singular/plural handled ("1 colour").
**Why:** Binding the already-computed M1 stats to a real panel closes
the §11 display loop before the Carbon panels land; the cap keeps the
live-update path frame-rate-safe by construction.
**Verified in-browser:** 95-colour gradient shows 30 DMC rows + "+65
more · 4,804 stitches" (sums check), black square updates live to
"1 colour", empty state renders after reload, console clean.

## D24 — Control panels: native fields, Carbon-productive, master-copy reprocess (2026-07-18)

**Decision:** The M2 control panel is a side `aside` of four
`fieldset` groups — Grid / Colour / Dither / Pipeline (UI-STANDARDS layout
model) — built from native form controls styled to Carbon's
productive language in project code (no Carbon packages, per the
hard rule): switch-role checkboxes drawn as toggle tracks with
On/Off state text (never colour-only), labelled number inputs whose
values snap back in-range via a pure tested `clampInt`, a native
colour picker, and selects for colour mode (DMC / full RGB) and the
§7 order preset. Controls apply immediately — no Apply buttons
(§5.4). Pipeline-affecting changes reprocess by cloning a main-side
**master copy** of the decoded image into the existing latest-wins
submit path — chosen over a worker-side reconfigure message because
it reuses coalescing wholesale at the cost of one buffer copy per
change (~ms at MVP sizes; profile before optimising). Grid-style
changes stay view-only worker messages (no pipeline run). The dither
toggle disables in full-RGB mode (disable impossible actions).
"Grid" here means the §15 overlay styling; grid *dimensions* UI (§4)
is parked to the wish-list, not silently dropped.
**Why:** Native-first controls meet the accessibility bar for free
and the Carbon look is CSS; the master-copy path keeps the worker
protocol small while M4 live capture will naturally replace it with
a frame stream.
**Verified in-browser:** full RGB → 1,410 hex colours + disabled
dither; DMC without dithering → 45; reduce-first → 1,034 (quantise-then-
resize blending, the §7 comparison working); pipeline 3.3 ms
(< 150 ms acceptance); major-interval 5 redraws instantly; zero
uncaught errors.

## D25 — M2 milestone close: acceptance evidence, v0.3.0 (2026-07-19)

**Decision:** M2 closes with both acceptance legs verified and the
product version bumped to v0.3.0 (milestone = MINOR, per
DEV-INFRASTRUCTURE → "Version management"; lock synced via
`npm install --package-lock-only`, 0 advisories). Evidence:
controls-to-preview latency **3.3 ms** end-to-end at 200×200 (bar:
150 ms), measured through the real pipeline via the timings the
worker already reports. The 60 fps pan/zoom leg was measured by
driving the **real `preview-surface` draw code** (dev-server module
import, main-thread instance of the same module) with a 1024×1024
bitmap on a 2800×1800 device-pixel surface: worst case **0.32
ms/full redraw** (deep zoom, dense minor grid + ticks), 0.07 ms at
fit — ~52× inside the 16.7 ms frame budget. Caveat recorded: the
probe times the draw path, not the worker's message loop; message
overhead is micro-scale and the headroom absorbs it. README status
rewritten (was still "M0 not yet landed"); M3 (exports) becomes the
current milestone.
**Why:** The one unmeasured acceptance leg needed real-code evidence
before calling the milestone done; a probe through the actual module
beats a synthetic canvas benchmark and needed no instrumentation
code.

## D26 — Pruned project memory (2026-07-19)

**Decision:** Archived D1–D10 (the 2026-07-16 founding decisions,
verbatim) to `archive/decision-log-2026-07-16.md` and created
`archive/INDEX.md`; live log 25 → 15 entries plus this record.
Trigger: entry count over the 20-entry budget (Diagnose check 1).

## D27 — Clean/enlarged PNG export: worker re-run + pure NN expansion (2026-07-19)

**Decision:** Exports go through a dedicated worker `export` message
that re-runs the pipeline from the retained master image and is
answered one-to-one by id (a promise on the client), bypassing both
the preview surface and latest-wins coalescing — so the "exports
always re-run at full quality" invariant holds by construction and
survives M4's draft-quality preview. Enlargement is pure TS
nearest-neighbour block replication (`scaleNearest`) followed by a
1:1 OffscreenCanvas PNG encode — no `drawImage` resampling in the
export path, so output is deterministic and hermetically testable.
Transparent background passes engine alpha through untouched; solid
background is a straight-alpha composite over an opaque colour.
Scale is clamped to the ~16384 px canvas side limit, with the clamp
surfaced in the status line. Auto-jazz assumptions: scope held to
the two backlog items (§13 extras — custom dimensions, metadata,
sidecar palette, intermediate stages — stay parked); the export UI
is a fifth fieldset (Scale / Background / Background colour /
Export PNG) with the button disabled until a frame exists. Dev
infra: `vite.config.ts` honours a `PORT` env var and launch.json
sets `autoPort`, so a second session's dev server coexists with a
running one.
**Why:** Reusing the last preview frame was simpler but would
silently break the full-quality invariant the moment draft mode
lands; the worker re-run costs one extra pipeline pass per export
(milliseconds) and makes the invariant structural rather than
disciplinary.

## D28 — Styled PNG chart: preview geometry reuse, print-fixed colours (2026-07-19)

**Decision:** The chart export reuses the preview's pure grid
geometry (`worker/grid.ts` — `gridLines`/`tickLabels`/`snapSpan` at
scale = cell px) and the clean-PNG transforms (`scaleNearest` +
`flattenBackground`) rather than growing a parallel chart-furniture
implementation. Furniture follows the user's on-screen grid settings
(intervals, colour, CSS-px thicknesses — the chart's native unit),
so the only new control is a chart cell-size field (4–40 px, clamped
to the canvas side limit with margins included). Paper is fixed
white and label ink fixed dark regardless of app theme — the
preview's page-text-colour labels would vanish on white paper.
Empty (transparent) stitches flatten to paper rather than exporting
holes. The chart re-runs the pipeline via the M3-PNG export message
(full-quality invariant). Assumptions at skipped gates: the chart
respects the show/ticks toggles (furniture-off charts are
deliberately possible); §14 extras (symbols, palette key, titles,
page furniture) stay parked for the PDF item and post-MVP.
**Why:** One geometry implementation means the chart and the preview
can never disagree about where lines and numbers fall — the tested
pure layer stays the single source of truth; fixed print colours
stop a dark-theme session silently producing an unreadable chart.

## D29 — Single-page PDF chart: embedded raster + vector key (2026-07-19)

**Decision:** The PDF (pdf-lib 1.17.1 — first use of the allowlisted
dependency, 0 advisories) embeds the chart.ts raster at print
resolution (~2400 px long side ≈ 300 dpi on A4) and draws the title
and thread key as native vector text, so furniture geometry stays
single-sourced in grid.ts/chart.ts rather than reimplemented in PDF
space. A pure bottom-up layout (`pdfLayout`) computes page size
(A4/Letter, portrait/landscape), mm margins, the title block, an
aspect-preserving chart fit, and a column-wrapped key of **used**
colours (computeStats.perColor: swatch + code + hex) capped at 40 %
of content height with a "+N more colours" note; full-RGB mode omits
the key. Standard PDF fonts are WinAnsi-only, so titles degrade
non-Latin characters to '?' instead of throwing. `buildChartPdf` is
plain pdf-lib and runs under Node — tests parse the produced PDF.
Assumptions at skipped gates: the key lists used colours only (a
533-swatch DMC key would be unusable); counts and symbols stay
parked (§17, post-MVP).
**Why:** Embedding the tested raster keeps one furniture
implementation and makes the PDF show exactly what the chart PNG
shows; vector title/key stay crisp at any print size. The milestone
acceptance leg — a printed A4 of a 100×100 design is legible — is a
manual print check by design: named here, not silently skipped.

## D30 — Project file v1: settings-only schema, canonical serialisation (2026-07-19)

**Decision:** Schema v1 (§20 MVP subset) persists settings only —
pipeline config with the palette as a **name reference** ("DMC" /
null, never embedded data), grid/chart styling (minus the
theme-derived tick text colour, recomputed at render), and export
preferences. The source image is not stored; a loaded project applies
to the next import (source references arrive with capture, M4). The
schema, migration switch, and (de)serialisation live together in
`src/core/project.ts` — the v1 stub moved out of `types.ts` so the
version and its logic have one owner and no type cycle through the
stage modules. `serializeProject` reconstructs a canonical field
order (2-space indent, trailing newline) and `parseProject` validates
with path-named errors, ignores unknown extra fields, refuses a newer
`schemaVersion` explicitly, and migrates older ones forward — making
save → load → save byte-identical (AGENTS.md invariant, asserted in
tests). On load the UI writes state objects first, then syncs control
DOM values silently (no synthetic events) so a load costs exactly one
reprocess. Assumptions at skipped gates: an unknown palette name
refuses the load rather than substituting; validation ranges are
broad sanity bounds (grid 1–1024 per the brief), not duplicates of
the control bounds.
**Why:** Name-referencing the palette keeps project files small and
human-readable and lets future preset palettes resolve by name;
canonical serialisation makes the byte-identical guarantee structural
rather than accidental.

## D31 — M3 milestone close: print check waived, v0.4.0 (2026-07-19)

**Decision:** M3 closed at v0.4.0 with one acceptance leg verified
and one waived. The clean-PNG leg — export pixel-equal to the engine
output buffer — holds structurally (the worker export message re-runs
the pipeline at full quality and the encoder writes that buffer
directly, D27) and is covered by the export test suites (39 export +
project tests). The printed-A4 legibility leg (D29's named manual
check) was **waived at close by the maintainer** — recorded here as
the residual risk of the milestone: chart print legibility at 100×100
has not been physically verified. If a first real print shows a
legibility problem, treat it as an M3 defect (PATCH), not new scope.
Also tagged the missing `v0.3.0` on the M2 close commit (`fc2294c`) —
the tag ritual was skipped at that close; DEV-INFRASTRUCTURE requires
every product version to carry its git tag.
**Why:** The maintainer chose shipping the milestone over blocking on
a printer; naming the waived check here keeps the acceptance line
honest rather than silently green.

## D32 — M4 capture session: main-thread wrapper, one-shot grab included (2026-07-19)

**Decision:** M4's first item ships as `src/capture/session.ts` — a
small main-thread wrapper over `getDisplayMedia` exposing a session
object (label, `grabFrame()`, `stop()`, `onEnded`) plus two pure,
hermetically tested helpers (`captureErrorMessage`, `displayLabel`),
mirroring the `ui/import.ts` pure/browser split. The session includes a
**one-shot frame grab** (a detached muted `<video>` + `OffscreenCanvas`
draw) feeding the existing `masterImage → reprocess` path, and the UI
gets Start/Capture frame/Stop buttons in the source section — so the
session is visibly useful before the crop rect and frame pump land.
"Manual refresh" from the M4 item-5 line therefore shipped early as
the Capture frame button; item 5 was trimmed accordingly.
**Why:** A session with no frame path is not a shippable unit; the
one-shot grab is the smallest slice that proves permission UX, stream
handling, and external-end recovery (browser stop-sharing UI) end to
end. `ImageCapture.grabFrame()` was rejected as less portable than the
video-element draw. Capture stays off the worker per architecture
("main thread: capture + UI only"). Auto-jazz assumptions: scope as
above; buttons reuse existing dev-shell styles (44 px met); declined
permission treated as a normal status, not an error.

## D33 — Crop rectangle: pure geometry model, video-element thumbnail (2026-07-19)

**Decision:** The M4 crop rectangle ships as a pure geometry module
(`src/capture/crop.ts`: clamp/move/resize-by-handle/hit-test +
`stitchSpan` for the readout, all in source-video pixels,
hermetically tested) driven by a thin DOM overlay in `main.ts`. The
live thumbnail **is the session's own `<video>` element** mounted
width-driven (height auto), so overlay maths is one linear scale —
no second render path. `grabFrame` takes an optional region, clamped
session-side. Lock is a pressed-state toggle button that disables
pointer/keyboard edits and hides handles (solid border as the shape
cue). Keyboard: arrows move 8 source px, shift+arrows resize the se
edge — the non-pointer route UI-STANDARDS requires. Source-dimension
changes mid-session re-clamp the rect (`video` `resize` event).
**Why:** The pure/DOM split mirrors D32 and keeps the interaction
maths testable without a browser; a canvas-drawn overlay was
rejected as a second renderer with no benefit at thumbnail scale.
Handles are 12 px visuals with a generous hit tolerance; the WCAG
44 px target rule is met by the documented keyboard alternative.
Outside-region dimming (box-shadow) is a thumbnail affordance only —
the preview canvas stays unfiltered (colour-fidelity rule). Auto-jazz
assumptions: full frame selected on session start; stitches readout
assumes contain mapping; frame pump stays out of scope.

## D34 — Frame pump: rVFC ticks, latest-wins gate at the grab (2026-07-19)

**Decision:** Live updates ship as `src/capture/pump.ts`: a pure
`PumpGate` (busy/pending/dropped — the worker `Coalescer` policy,
payload-free) plus `startFramePump`, a `requestVideoFrameCallback`
subscription with a `requestAnimationFrame` fallback. The gate sits
**at the grab**, not just at processing: at most one
grab-readback+pipeline run is in flight; new video frames only set a
pending flag, and the worker's result callback triggers the next grab.
Pump grabs are quiet (no per-frame status or ring-buffer logging);
grab failure stops the pump but keeps the session usable via Capture
frame. The pump stops with the session and its drop count is logged.
**Why:** `getImageData` readback is the expensive main-thread step, so
gating only at the worker (which already coalesces) would still pay a
readback per 60 Hz tick; gating the grab holds main-thread cost to the
pipeline's own rate. A shared `Coalescer<T>` reuse was rejected — its
payload slot is meaningless when "pending" always means "the newest
frame". Auto-jazz assumptions: pump starts automatically with the
session (pause/resume is the remaining M4 item); worker results from
manual reprocesses may advance the gate early — harmless, latest-wins
holds; per-frame logging omitted by design.

## D35 — Dirty-frame skip: pre-readback 64×64 FNV hash + region signature (2026-07-19)

**Decision:** The dirty check ships as `src/capture/dirty.ts` and runs
**before** the full-resolution readback in the pump path: each tick
draws the crop to a reused 64×64 OffscreenCanvas (a fixed 16 KB
readback), hashes it with FNV-1a 32-bit, and combines it with the crop
region into a string signature. A matching signature skips the grab
and pipeline run entirely, releases the pump gate, and names the state
("Source unchanged.") in the status region. Moving or resizing the
crop changes the signature, so region edits always re-process even
over static content. Manual Capture frame bypasses the skip but
records the signature; the skip counter is logged at pump stop.
**Why:** Hashing after the grab (or in the worker) would already have
paid the full readback + transfer — the acceptance leg is "idle frames
cost ~0 CPU", which only the pre-readback sample delivers. FNV-1a over
16 K bytes is deterministic and cheap; a hash collision merely delays
one update until the next change. Auto-jazz assumptions: 64×64 is the
architecture-specified sample size; a same-hash different-region frame
must re-process (hence the composite signature); skipped frames are
counted, not logged per-tick.

## D36 — Pause/resume + draft mode: pump lifecycle toggle, dither-drop governor (2026-07-19)

**Decision:** Pause/resume ships as a pressed-state toggle that stops
and restarts the frame pump only — the session, thumbnail, crop rect,
and manual Capture frame stay live, and the preview holds the last
frame (named "Capture paused" state). Draft mode ships as a pure
`DraftGovernor` (`src/capture/draft.ts`): hysteresis over per-frame
pipeline times (enter after 2 consecutive frames > 200 ms, exit after
5 consecutive < 100 ms) that drops **dithering only** from the live
config, with a persistent visible "Draft quality" label plus a status
announcement. Only live-pump results feed the governor; manual
reprocesses never flip quality. Mode flips clear the dirty signature
so the new quality applies even over static content. Exports keep the
untouched config — full quality by construction.
**Why:** Dithering is the priciest stage and dropping it degrades
gracefully; downscaling the grid instead was rejected because it
changes the stitch geometry the user is designing against. Hysteresis
with a 2:1 threshold gap prevents flapping at the boundary. Pausing
resets the governor so a stale draft state can't survive a pause.
Auto-jazz assumptions: thresholds 200/100 ms and 2/5 counts are
starting values (tunable constructor params, revisit with M5
profiling); pause holds the last frame rather than blanking.

## D37 — M4 milestone close: acceptance measurement waived, v0.5.0 (2026-07-19)

**Decision:** M4 closed at v0.5.0 with all five feature items shipped
(session D32, crop D33, pump D34, dirty-skip D35, pause/draft D36) and
the quality gate green (186 tests). The acceptance line — ≥ 4 preview
updates/sec at a 200×200 grid with < 250 ms latency while editing in
Photoshop, and ~0 CPU on idle frames — was **waived at close by the
maintainer** ("close out M4" without the live measurement): recorded
here as the residual risk of the milestone. The structural case is
strong (dirty-skip caps idle cost at one 16 KB readback per tick; M2
measured the pipeline at 3.3 ms/frame at 200×200, far inside the
250 ms bar) but no live Photoshop session has been measured. If a real
session misses the bar, treat it as an M4 defect (PATCH), not new
scope. The M4-ACCEPT tracking item was removed with this waiver. M5
(WASM + WebGPU backends) becomes the current milestone; its profiling
harness is the natural place to capture the live numbers this close
waived.
**Why:** The maintainer chose shipping over blocking on a manual
measurement, same trade as the M3 print check (D31); naming the waived
leg keeps the acceptance line honest rather than silently green.

## D38 — Profiling harness: rolling timing window, dev-only disclosure panel (2026-07-19)

**Decision:** The M5 profiling harness reuses the per-stage timings the
worker already returns with every processed frame (`StageTiming[]`,
wired since the M1 executor) — no new instrumentation, no protocol
change. A pure `TimingWindow` (`src/ui/debug-panel.ts`) aggregates
last / median / max per stage plus a whole-frame total over a rolling
120-frame window, and **resets when the stage list changes** so the
aggregates always describe one comparable pipeline configuration. The
DOM half is a native `<details>` "Profiling" disclosure below the info
panel — keyboard operable for free, 44 px summary target — mounted only
under `import.meta.env.DEV` per UI-STANDARDS → "Diagnostics affordance"
and verified stripped from the production bundle. The meta line carries
frames-sampled and the client's dropped-frame count. Export runs are
not profiled (they return no timings; preview timings are the
optimisation target).
**Why:** M5's backend items need a place to read TS-reference numbers
before and after each WASM/WebGPU drop-in, and D37 named this harness
as where the waived M4 live numbers get captured. Median-over-window
resists one-off GC spikes; the stage-change reset keeps windows honest
across preset flips.
**Run notes (auto-jazz via /next):** assumptions — dev-only panel
(diagnostics rule), preview-only timings, `info-panel.ts` pure-model
pattern. No gates were stopped at; gate green (194 tests).

## D39 — stitch-engine crate: libm for bit-exact parity, toolchain-aware gate step (2026-07-19)

**Decision:** The M5 Rust crate (`crates/stitch-engine`) is a
line-for-line port of the TS dither reference: f32 storage widened to
f64 for arithmetic (mirroring Float32Array semantics), strict-`<`
first-min-wins nearest search, exact-binary kernel weights, and
**libm** (fdlibm lineage — the same ancestry as V8's `Math.pow` /
`Math.cbrt`) instead of platform intrinsics, so bit-exactness vs the
TS backend is credible by construction; the next item's golden suite
verifies it. Cargo deps approved by the maintainer: wasm-bindgen +
libm (they compile into the shipped `.wasm`, so they follow the
runtime-dependency approval rule — allowlist recorded in
DEV-INFRASTRUCTURE). SIMD lands as `+simd128` codegen via a
crate-local cargo config (wasm target only, IEEE semantics unchanged);
explicit hand-vectorisation is deferred until the benchmark item
demands it. The gate gains `check:wasm` (`scripts/check-wasm.mjs`):
`cargo test` + `wasm-pack build`, **skipping with a visible warning
when the toolchain is absent locally but hard-failing in CI**, which
now installs rustup's wasm target + wasm-pack — this preserves the
existing "check passes without Rust" rule without letting the skip
green-wash a break. The Rust toolchain was installed on the dev Mac
this task (rustup stable 1.97.1, wasm-pack 0.15 via Homebrew).
**Why:** Bit-exactness is the milestone's hardest constraint; choosing
fdlibm-lineage math up front avoids discovering ULP drift after the
adapter lands. The toolchain-aware skip keeps the gate honest on
machines without Rust while CI stays the backstop.
**Run notes (auto-jazz via /next):** stopped at two gates — the
missing toolchain (user chose install) and the Cargo dependency
approval (user approved both). Clippy/rustfmt in the gate parked to
the wish-list.

## D40 — WASM dither registered: alias/stub feature detection, parity proven (2026-07-19)

**Decision:** The wasm dither backend registers by assignment —
`src/backends/wasm/dither.ts` sets `ditherStage.backends.wasm` after
async module init — so core stays untouched and the executor's
`?? backends.ts` fallback covers not-yet-ready and unavailable alike.
The worker fires registration at startup (never blocking a frame).
Feature detection is build-time: a `stitch-engine-wasm` Vite alias
resolves to the wasm-pack pkg when built, else to a committed stub,
with a `__WASM_AVAILABLE__` define gating the adapter — verified by
building with the pkg renamed away (tsc, vite build, and the test
suite all pass; the parity suite skips visibly). Ambient types for the
alias keep `tsc` independent of the generated pkg. The gate reordered
(`check:wasm` before `check:test`) so Vitest always sees a fresh pkg.
**Parity result: bit-exact.** Six golden tests match wasm against TS
at tolerance 0 — the committed 8×8 fixture, both metrics × both scan
modes, and 64×64 seeded noise against the full 533-colour DMC palette
under CIELAB and RGB — confirming D39's libm/fdlibm bet on
`pow`/`cbrt` parity with V8. Registration routes nothing by itself:
stage instances still default to `ts`; routing arrives with the
automatic-selection item.
**Why:** Assignment-registration keeps the core dependency arrow
one-way (backends import core, never the reverse); the alias/stub
pattern makes the "builds succeed without the toolchain" promise real
instead of aspirational.
**Run notes (auto-jazz via /next):** no gates stopped at; assumptions —
per-call palette flattening (cache deferred to the selection item),
node tests init the module from disk bytes via an optional adapter
parameter.

## D41 — WebGPU LUT build + palette map: cache-layer wiring, near-tie tolerance (2026-07-19)

**Decision:** The WebGPU kernels (WGSL, `src/backends/webgpu/`) land
as **async functions**, not sync StageFn backends: GPU readback cannot
satisfy the synchronous stage contract, so core and the executor stay
untouched. The LUT build — the actually expensive part per
architecture ("WASM/WebGPU accelerate LUT construction") — wires into
the worker cache as `ensureLut` (GPU-first, TS on any failure),
awaited by the worker before frames that need a LUT; cache hits cost
nothing. The palette-map kernel is implemented and GPU-tested but not
yet routed — the backend-selection item owns any executor
asyncification. **Tolerance, documented:** GPU colour maths is f32, so
a GPU LUT may disagree with the f64 TS reference only on *near-ties*
(two threads at almost identical distance). The automated suite
quantifies this in node via an f32 mirror of the WGSL arithmetic
(≤ 1% of bins, and every disagreement within a 0.5% relative distance
margin — visually equivalent picks); a real-GPU suite runs the same
assertions wherever `navigator.gpu` exists and skips visibly in
node/CI. Mapping through a given LUT is integer-only and asserted
bit-exact. Consequence accepted: non-dithered output can differ on
near-tie bins between GPU and non-GPU machines; within one session
preview and export share one cached LUT, so they always agree.
`@webgpu/types` added as a types-only devDependency (user-approved).
**Why:** The cache-layer wiring gets the GPU win where profiling says
it lives without destabilising the pure sync pipeline; the f32 mirror
makes "tolerance-tested" a real, CI-run assertion rather than a
browser-only claim.
**Run notes (auto-jazz via /next):** stopped once (types package
approval). Assumption: real-GPU CI coverage via a browser-mode runner
is parked to the wish-list, not scoped here.

## D42 — Automatic backend selection: one-shot calibration, hysteresis, ts safety net (2026-07-19)

**Decision:** Selection lives in the worker layer
(`src/worker/backend-select.ts`) — core's `runPipeline` and the Stage
contract are untouched. Resolution order in the executor: explicit
instance backend > automatic selection > 'ts', and a requested backend
missing from the stage's map always falls back to the TS reference, so
a stale selection can never break a frame. Feature-detect *is*
registration (an unregistered backend can never be picked); the profile is a
**one-shot calibration** at worker startup after the wasm module
registers: ts vs wasm dither on a 96×96 synthetic frame against the
real DMC palette, alternating runs, median compared with a **10%
hysteresis margin** — the pipeline leaves ground truth only for a
clear win, never on JIT noise or a near-tie. WebGPU is not selected
here (async kernels; the LUT build already auto-selects GPU-first in
the cache — D41). `StageTiming` gained a `backend` field: the
profiling panel labels rows "dither (wasm)" and its stage-key reset
starts a fresh window on a backend switch, so a selection change is
visible and measurable. The backlog's acceptance clause is tested
directly: with wasm unregistered and no `navigator.gpu` (node), a
stale wasm selection still runs and reports 'ts', and `ensureLut`
resolves the TS-built LUT.
**Why:** Calibration-at-startup is the cheapest honest "profiled"
implementation: it measures the real machine once, off the frame
path, and the hysteresis margin plus the fallback chain mean the
worst possible outcome is the status quo (everything on ts).
**Run notes (auto-jazz via /next):** no gates stopped at. Assumptions —
dither is the only sync-selectable stage today; a user-facing override
(debug panel / ?backend=) stays future work.

## D43 — Benchmark shipped; every budget missed — recorded as signal, not green-washed (2026-07-19)

**Decision:** The benchmark (`tests/benchmark.test.ts`, `npm run
bench`) asserts the architecture.md budget table directly: per-stage
medians (5 timed runs after warmup) at 1024×1024 / 64 DMC colours,
whole pipeline at 1024 and 200 grids, ×3 budget stretch under CI.
It is gated behind `BENCH=1` — visible skip in the plain gate — since
a perf assertion in `check` would make every commit hostage to
machine noise. The preview-render row is browser-only (profiling
panel), not benchable in node.
**Measured on the dev Mac (2026-07-19):** resize 36 ms (budget 5),
reduce-LUT 13 ms (10), dither-wasm 412 ms (15), whole pipeline
452 ms (100), 200×200 grid 29 ms (10). **All five miss.** The bench
is red by design until the gap is closed — it was NOT weakened to
pass. Probable causes, in order: exact per-pixel palette search in
the dither hot loop (64 lab distances × 1M px; the budget row
implies LUT-style acceleration), CPU box-average resize (the budget
row assumes GPU `drawImage`), and reduce being within ~30% (closest
to its budget). The 15 ms dither figure needs either a candidate-
pruning structure (e.g. LUT-seeded search) or a budget revision.
**Consequences:** M5's acceptance line (≤ 100 ms full pipeline) is
NOT met — the milestone stays open with a new scoped perf item; the
budget-vs-implementation drift in architecture.md is captured as a
doc-delta for owner sign-off (never auto-edited). At the typical
200×200 grid the app measures 29 ms/frame — interactive in practice
(the M2 draft governor covers capture), so this is a budget breach,
not a UX emergency.
**Run notes (auto-jazz via /next):** no gates stopped at. Assumption:
shipping the honest red benchmark and scoping the fix separately is
the correct reading of "a failure is signal" — the alternative
(tuning budgets myself) would be green-washing a protected doc.

## D44 — M5A measurement truth: bv1 boundary contract, frozen workload matrix, reproducible reports (2026-07-19)

**Decision:** Ship the M5A trio as one coupled measurement layer rather
than three sequential items — a boundary contract without a workload
matrix measures nothing, and a matrix without a report schema is not
reproducible. Three artefacts: `docs/measurement-contract.md` (the
canonical prose), `tests/bench/` (contract, matrix, harness, schema and
runner as code), and `npm run bench` (runs the matrix, writes a JSON
report, *then* asserts budgets).

**Boundary contract bv1** defines six boundaries — `prepare`, `stage`,
`pipeline-compute`, `preview-update`, `interaction`, `export` — each
with an explicit start mark, end mark and exclusion list. The three
sign-off questions M5-PERF-02 existed to settle were decided
conservatively under auto-jazz: (1) budgets bind to **warm,
steady-state** calls, with preparation budgeted separately; (2) the
100 ms whole-pipeline row is **warm**, and cache misses are published as
their own cold rows rather than averaged in or hidden; (3) preview
completion is the **preview surface draw returning** — the last step the
app controls. M5C revisits all three against evidence.

**Why a version stamp:** moving a start mark changes whether a budget
passes without changing the product. Every report carries
`boundaryVersion`, and reports across versions must not be diffed. The
pre-bv1 benchmark timed a 6.5 MB `slice()` and a fresh palette *inside*
the whole-pipeline closure; bv1 builds the request once, outside the
clock. That bias was real but worth only ~1 ms — it was never why the
budgets miss.

**Why raw samples and explicit gaps:** the schema keeps every timed
sample plus median/p90/p95/stdDev/spread, and forces an unmeasurable row
to be `unsupported`/`not-measured` **with a reason, never zero**. A
median without its distribution cannot be compared; a zero silently
reads as "fast". The three browser-only boundaries therefore appear in
every node report as visible holes.

**Measured (Apple M1 Max, 124 rows):** every D43 figure reproduced
within noise, so the harness rebuild did not move ground truth. All five
budgets still miss. The decomposition is the real deliverable, and it
overturned two standing leads:

- **Dither is conversion-bound, not search-bound.** `metric: lab`
  424.5 ms vs `metric: rgb` 125.1 ms at 1024²/64 → sRGB→Lab is ~70% of
  dither cost. Palette scaling agrees independently (~1.44 ms per
  palette entry; ~332 ms fixed). Candidate pruning alone can address at
  most ~22% and cannot reach the 15 ms row.
- **Separable resize is challenged.** Exact area averaging already
  visits each source pixel ~once under hard downscale; redundancy
  appears only as the scale ratio nears 1. Expect ~1.5–2× from a CPU
  candidate, not the ~7× the 5 ms row needs. Integral-image is the
  better lead — M5-PERF-11 verifies before M5-PERF-21 commits.
- **Two leads shrank:** the identity `adjust` clone is 0.15 ms and warm
  stage-list construction 0.01–0.05 ms — both immaterial, not the "free
  win" the analysis assumed.
- **D3 emphatically confirmed:** `reduce-first` at 300²/64 costs 656 ms
  against 51 ms for `resize-first`.

**Consequences:** M5B audits start from confirmed/bounded/challenged
verdicts instead of unverified hypotheses, and M5-PERF-13 is now the
highest-value target in M5. `bench` stays out of `check` (noisy by
nature), but matrix coverage, percentile math, warm-up exclusion and
schema round-trip are unit-tested in the gate — 28 new tests. Reports go
to gitignored `bench-reports`. No pipeline behaviour changed; no golden
fixture touched.

**Run notes (auto-jazz, all gates skipped):** assumptions — ship M5A as
one run because the three items are one deliverable; the M5-PERF-01
spike output ships as code rather than throwaway because M5-PERF-03
consumes it directly; the M5-PERF-02 sign-off decisions were taken
conservatively and are flagged for M5C rather than deferred. **No
browser numbers were taken** — the rehearsal procedure is written and
M5-PERF-18 owns executing it; M5A's claim to cover transport and
rendering latency is therefore procedural, not measured.

## D45 — M5B audits: three bit-exact wins, four bv1 leads overturned, one shipped GPU bug (2026-07-19)

**Context:** M5A left ten component audits with a bv1 baseline and a set
of leads, to verify rather than re-discover — plus browser-only
boundaries that had never been measured.

**Decision:** ship the audits as code. `npm run audit` (AUDIT=1, gated
like `bench`) reruns every node measurement; candidate prototypes live
in `tests/audits/candidates/` and are explicitly not shipping code. The
browser work is a written repeatable procedure with recorded results
(`docs/browser-measurement.md`), not a one-off session. Full evidence
and every number: `docs/performance-evidence.md` → "M5B component
evidence" (moved there from `tickets/M5-PERF.md` at M5C close, D47).

**Why it matters — what the evidence changed:**

- **Three bit-exact wins exist**, so the biggest available speedups need
  no mode contract, no tolerance and no golden regeneration. Dither
  888 → 217 ms at 1024²/64 (hoisting a loop-invariant `Float32Array`
  re-read out of the palette scan, then provably-exact per-bin candidate
  pruning); resize ~1.5× everywhere. This reframes M5C: the mode
  question now covers only the two levers that *do* change appearance.
- **Four bv1 leads were wrong, and each would have misdirected work.**
  "Dither is conversion-bound (~70%)" is a WASM artefact of D39's `libm`
  parity choice — TS-hoisted measures ~0%, so a shared conversion
  strategy would have been built on a backend-specific number.
  Separable resize is *harmful* near 1:1, not merely unhelpful, so
  M5-PERF-21's planned rewrite would have regressed the ceiling grid.
  The wasm boundary (0.2% of a call) and the `?? 0` read tax (nil) are
  closed, which retires zero-copy/SIMD work and protects strict
  TypeScript from being traded away for imagined speed.
- **Node is not a browser proxy** — the same TS resize is ~3.5× slower
  in-browser while dither is ~1.1×. Stage-dependent, so no multiplier
  corrects it; budgets must name their runtime.
- **A P0 shipped bug was found by looking where node cannot see.**
  `lutBuildShader` uses `target`, a reserved WGSL keyword; WebGPU reports
  shader compile errors asynchronously, so nothing throws, the dispatch
  no-ops, and the zero-filled buffer is cached by `ensureLut` in
  preference to the correct TS LUT — non-dithered reduction renders a
  solid single colour in every WebGPU browser. The suite that would have
  caught it is `skipIf(!isWebGpuAvailable())` and CI is node, so it has
  never run anywhere. Three further defects filed: LUT cache-key
  collision, a worker gate that wedges on an unhandled rejection, and
  dirty detection blind to small edits.

**Consequences:** M5B closes; a new **M5B-FIX** milestone jumps ahead of
the M5C gate because two of its four items are wrong-output bugs, not
performance work. The 5 ms resize and 15 ms dither rows are unreachable
on this evidence — M5C owns revising them (doc-deltas captured). First
browser numbers: 11.6–17.4 preview updates/sec at ≤ 300², so the brief's
≥ 4/sec bar is met with margin. No pipeline behaviour changed; no golden
fixture touched.

**Run notes (auto-jazz, all gates skipped):** assumptions — audits ship
as committed code (M5A precedent; M5C must rerun them); the ten
per-ticket files were deleted on close per the tickets policy, evidence
folded into `docs/performance-evidence.md`; audits 16/17/19 were one
frame-path surface; browser probes ran on one machine via the dev
server, so the node/browser gap is flagged for confirmation, not
settled. The GPU defect was reported, not fixed — fixing inside a spike
would have broken the audit boundary.

<!-- FILE: pm_skills/project/archive/decision-log-2026-07-20-to-2026-07-23.md -->

# Decision log archive — 2026-07-20 → 2026-07-23 (D46–D90)

<!-- Archived verbatim from decision-log.md on 2026-08-07 (prune pass, D113).
     Append-only history; do not edit. Cold tier: grep + line-range only. -->

## D46 — M5B-FIX: four correctness defects closed; the GPU bug had a second half only a real GPU could find (2026-07-20)

**Context:** the M5B audits (D45) filed four defects — two wrong-output
bugs, one latent stall, one silent miss. All four are fixed here.

**Decisions:**

- **WebGPU LUT (M5-PERF-31).** Renamed the reserved WGSL identifier
  (`target` → `probe`), and made shader creation fail loudly: drain
  `getCompilationInfo()` and wrap pipeline creation and the compute pass
  in `pushErrorScope('validation')`, returning `null` so the TS fallback
  takes over. `ensureLut` now sanity-checks any GPU LUT before caching
  it (index in range; not one index for a multi-entry palette) — cheap
  insurance because the failure mode is silent and user-visible.
- **A second defect was hiding behind the first.** With the shader
  compiling for the first time, the real GPU rejected the *bind group*:
  `layout: 'auto'` derives the layout from bindings a shader actually
  **uses**, and the `lab` variant never reads `pal_rgb`. Each metric now
  declares only the palette buffer it reads, with the binding indices in
  one shared constant (`LUT_BINDINGS`) used by both the WGSL emitter and
  the dispatch.
- **LUT cache key (M5-PERF-26).** Keyed on a content fingerprint of the
  entries in order (`paletteFingerprint`, core) plus metric and a schema
  version, replacing `name:length:metric`. Cache is now LRU-bounded at 8.
- **Worker gate (M5-PERF-29).** Routing moved out of the worker entry
  into `src/worker/router.ts` with injected dependencies, so it is
  testable without a Worker. Every `process`/`export` path now posts
  exactly one response; a failed preview bitmap logs and still returns
  the frame, because losing a redraw must not cost the frame.
- **Dirty detection (M5-PERF-30).** The 64×64 downsample destroys small
  edits *before* the hash sees them, so no hash precision fixes it and
  fine-enough sampling costs the readback the skip exists to avoid.
  `DirtyGate` bounds the damage instead: an unchanged-looking source is
  re-processed after `DIRTY_MAX_STALE_MS` (2 s), turning "a small stroke
  never appears" into "it appears within 2 s".

**Why it matters:** the static scans now cover both known GPU classes
without a GPU (reserved words; declared-vs-bound and declared-vs-read
bindings) — but it was **execution on a real GPU that found the second
defect**, exactly as the ticket predicted. Verified in-browser on
Metal-3: GPU LUT 523 distinct indices (was 1) and **0 mismatches across
all 32,768 bins** for both metrics, mapping kernel 0 wrong pixels of
4096, and `ensureLut` now byte-identical to `getLut`. That is well
inside the D41 near-tie tolerance, which is therefore untouched.

**Consequences:** M5B-FIX closes. The real-GPU-in-CI leg of M5-PERF-31
is **not** met — it needs a browser test runner — and is carried forward
as M5-PERF-32 rather than quietly dropped. No golden fixture touched; no
pipeline output changed on a correct configuration.

**Run notes (auto-jazz, all gates skipped):** assumptions — all four
items in one run (shared LUT/worker/capture surface); the browser-runner
promotion was judged out of scope for a correctness fix (new dev-dep +
CI surface), so the GPU-free scans landed instead; 2 s chosen for the
forced refresh (≈3% of one core idle at 200²) without the in-browser
threshold measurement the ticket asked for, because the averaging loss
is analytic, not empirical. Each fix was verified failing before the fix.

## D47 — M5C: processing modes cut; budgets bind to measured reality (2026-07-20)

**Context:** M5C had to choose resize strategy, mode semantics, default
mode, visual thresholds, budget binding, and honest Exact expectations.
The owner's provisional decisions (Q3: budgets bind to Balanced; Q4:
Balanced is the default everywhere) were explicitly subject to
validation against the completed evidence.

**Decision — cut Balanced and Responsive.** Ship one fidelity plus the
existing adaptive draft governor.

**Why:** Balanced had no content left. Its two intended ingredients both
died on M5B evidence — rounded conversion is worth ~0% in situ on the
hoisted TS path while changing **49–53% of output pixels**, and
separable resize is *slower* near 1:1. The only remaining ingredient is
canvas resize, whose output differs from the oracle by mean **39/255 per
channel on 100% of pixels**. For a product whose entire spatial
reduction *is* the resize, that is wrong output, not a controlled
trade-off. Meanwhile the three bit-exact wins give 4.1× on dither and
1.5× on resize with **zero** appearance change, and the brief's actual
bar — ≥ 4 preview updates/sec at ≤ 300² — is already met with margin
(11.6–17.4/sec measured pre-wins). Modes would have cost a 3× parity
matrix, per-mode fixtures, a project-file enum plus migration, a UI
control and a visual sign-off gate, to express a distinction the
evidence could not justify.

**Consequences:**

- **No visual thresholds are needed anywhere in M5** — every approved
  change is bit-exact, so the golden fixtures are untouched.
- **The v1 back-compat waiver is withdrawn.** With no mode enum, v1
  project files render exactly as before; the Q4 appearance-change
  acceptance is moot.
- **M5E is cut** (M5-MODE-01…06, ticket files deleted). M5-ACCEPT-02
  narrows to a single-fidelity confidence review.
- **Budgets change shape**: one product promise (≥ 4 updates/sec at
  ≤ 300², in-browser) plus per-stage measured baselines with regression
  guards, each naming its runtime and workload ID. The aspirational
  table had missed every row except preview-render since it was written,
  and a permanently-red budget trains everyone to ignore it. The 5 ms
  resize and 15 ms dither rows are revised, not met. **M5-ACCEPT-04
  alone edits the protected table.**
- Escalation if the ceiling grid proves unusable at ACCEPT-03: canvas
  resize joins the **draft ladder** (temporary, automatic, visibly
  named, never exported), not a user-facing mode.
- 1024² is stated plainly as an export/finishing grid, not a
  live-editing grid (~1.6/sec pre-wins, ~2.5/sec projected).

**New evidence taken at the gate:** the GPU LUT rows in the evidence
base were measured against a kernel that never ran (D46), so they were
re-taken on the fixed kernel: LUT build 59× (64 colours) and 655× (533)
versus TS on the same runtime, per-pixel map 6.7× at 1024²/64. This
makes WebGPU a real contender for the reduce row — but the dev-server TS
figures run 10–16× slower than node (vs ~3.5× for resize), so they are
flagged as understated and M5-PERF-23 must re-measure on a production
build before wiring `mapPaletteGpu`.

**Housekeeping:** the M5-PERF ticket shipped, so its file was moved to
`docs/performance-evidence.md` rather than deleted — the item closed but
its measured evidence is still load-bearing for M5D/M5F. Superseded
sections (pre-M5B leads, design options, scope sketch) were dropped.

**Run notes (auto-jazz):** the mode question was put to the maintainer
because the item is `[sign-off]` and its acceptance is literally
"approved"; everything else ran gateless. `npm run audit` also caught a
stale M5B audit asserting the M5-PERF-26 collision still reproduces —
inverted to prove it cannot recur. `audit` is AUDIT=1-gated and not part
of `check`, which is why the D46 close missed it.

## D48 — M5D: the wins are real, the attributions were not (2026-07-20)

**Context:** M5D was execution — land M5B's bit-exact wins, cut its
inventoried allocations, re-derive routing, encode D47's budget shape.

**Decision — land all eight items; correct M5B's causal attribution
twice; decline `mapPaletteGpu` on its own gate.**

**Why the attributions changed.** Both audits now measure against
verbatim pre-M5D implementations, because M5-PERF-21/22 landed into the
code the audits used as oracle — timing the shipped stage against itself
reports ~1.0× and proves nothing. The totals then reproduced M5B exactly
(resize 37.2 ms vs its 37.4; dither 858 ms vs its 821–888). The causes
did not:

- **Resize:** M5B credited ~1.5× to hoisted coverage. Actually inlining
  the per-cell `sampleArea` call (1.45×); the hoist is 1.05×.
- **Dither:** M5B credited ~4× to hoisting the Lab scan reads. The hoist
  is worth **0.96–1.11× — nothing**. The large term is inlining the
  `deltaE76Sq(labScratch, 0, …)` call, made 64–533× per pixel and not
  inlined by V8 (2.85–4.31×). Pruning is the real algorithmic win (1.2×
  at 64 colours, 3.38× at 533).

Same error twice: a candidate changing two things, credited to the
interesting one. **Both M5B "algorithmic" wins were call-boundary costs
in a per-pixel loop.** Treat TS micro-optimisation leads as
call-boundary-first, and change one thing per measurement. The audits
keep the pre-M5D baselines, so the decomposition now guards itself.

**Exactness.** Every shipped change is byte-identical to pre-M5D output.
Pruning is an exclusion proof, verified over 138,688 adversarial values
× 5 palettes with 0 mismatches; Rust parity is asserted against the
**pruned** TS path, since that is what ships.

**Routing (M5-PERF-27).** Decided by **metric**, not a grid × palette
threshold: lab → ts (1.79–3.34×; TS prunes, Rust does not), rgb → wasm
(1.46–1.88×; neither prunes). Across 96²–1024² × 64/533 the metric
decided all sixteen, so no size cutoff is applied — inventing one the
evidence does not show is worse than none. D42's calibration is
**removed, not retuned**: routing holds no state, which was D42's actual
failure mode.

**`mapPaletteGpu` declined (M5-PERF-23).** D47 required a
production-build re-measurement and was right to: 6.7× was almost all
dev-server slowdown on the TS side. Production: **~1.4×**
(0.98/1.62/1.45) on a 17 ms stage — ~5 ms/frame, non-dithered path only.
Price is the executor's asyncification, which D46 hardened so every
request answers exactly once. Declined.

**Alternatives rejected:** porting pruning to Rust (routing never
selects that path); a grid/palette threshold (unsupported); keeping D42
alongside routing (two mechanisms, one known wrong).

**Consequences:**

- Per-frame allocation at 1024²: ~26.5 MB → ~8 MB.
- Split compare runs one pipeline per frame, not two; divider drag runs
  none.
- Budgets are measured baselines naming runtime, workload and build,
  with a regression guard (×1.35) and a staleness guard (fires when a
  row runs >2× faster than recorded, so it cannot go slack). The product
  promise stays out of the node suite — it is an in-browser boundary and
  a node proxy would be green-washing.
- `bench.html`: new production-build browser harness; satisfied
  M5-PERF-32 (real GPU, 0 mismatches over 32,768 bins × 3 configs, plus
  an all-zeros trap for the D46 failure mode).
- architecture.md's budget table stays unreconciled — **M5-ACCEPT-04
  alone edits it** (D47) — so this adds a doc-delta instead.

**Run notes (auto-jazz):** gateless throughout; no blocking ambiguity.
Two process corrections. (1) Piping `npm run check` through `tail` made
the harness record *tail's* exit code — two "green" runs were
unverified; the pre-commit hook caught what they missed. (2) The browser
harness first reported 200² six times *slower* than 300², because it was
measured first and absorbed the pipeline's JIT cost; unexamined that
would have shipped as a product-promise failure.

## D49 — M5-ACCEPT-01: the matrix found an engine defect on its first run (2026-07-20)

**Context:** M5F's automated gate. The per-stage suites are strong — 52
files, every stage against its own contract — but nothing exercised the
*composed* pipeline across axes a user reaches together, which is
precisely what M5-ACCEPT-01 exists to do. The ticket predates D47 and
still described processing modes, per-mode fixtures and tolerances; with
modes cut, the matrix reduces to one fidelity and every row is exact.

**Decision — build the matrix, and fix what it found rather than
document it as green.**

### The defect: empty cells were dithering

Fully transparent cells were quantised as if they were opaque black and
**diffused that error into the real stitches beside them**. Resize
writes literal `RGBA(0,0,0,0)` for every grid cell the source does not
cover, so any `contain`/`fit` letterbox band was a strip of phantom
black feeding error into the artwork it framed.

It hid because the obvious test palette contains black: matching
(0,0,0) to black gives **zero** error, so nothing propagates and the
bug is invisible. It needs a palette with no near-black to appear — and
then it is severe, not subtle. Measured: 220-grey against a 200/255
palette, `contain` into a square grid, dithered to **solid 200 across
the entire visible area** — mean level 20 below the source and no
dithering at all, versus a correct 200/255 mix in isolation.

Fixed in both backends (`alpha === 0` takes no part in the scan) with
the TS and Rust rules mirrored line-for-line. Deliberately `=== 0` and
not the D9 `< 128` fabric threshold: alpha 0 provably carries no
colour, whereas a semi-transparent cell has a real one and whether it
should participate is a creative question — parked on the wish-list.
Bit-exact for all-opaque content, so **no golden fixture changed**.

### The characterisation: `reduce-first` is not a stitchable mode

The matrix's palette-membership invariant failed on all five
`reduce-first` rows. Not a defect: that preset maps to threads at source
resolution and only then resizes, and the resize **area-averages**,
blending threads into colours no thread has. Measured at 32²/64: **1006
of 1024 cells off-palette, 955 distinct colours, 4 carrying a thread
reference** — against 14/14 for `resize-first`.

So the §7 order comparison shows what that order *costs*; it is not an
alternative way to produce a design. The invariant is now scoped to
`resize-first` and the reason is **asserted rather than waived** — if
`reduce-first` ever produced palette-membered output, that test fails
and the exemption gets revisited. Worth surfacing at M5-ACCEPT-02:
choosing that preset yields a chart whose colours are mostly not
threads.

### Two MVP invariants were never actually asserted

- **Export isolation** ("preview quality must be unable to leak into
  exported output", an AGENTS.md hard rule) lived only in
  `runtime.audit.test.ts`, which is `AUDIT=1`-gated and therefore **not
  run by `check`**. Nothing stopped a regression reaching main. Promoted
  into the gate against the real executor, including the case that
  matters: a router warmed with draft-quality frames still exports
  byte-identically to a cold one.
- **"A saved project reopens with identical output"** — the brief's
  third success criterion — was nowhere. Byte-identical JSON round-trip
  proves the *file* survives, not that it still means the same picture:
  a dropped field or a parse-time default would round-trip perfectly and
  reopen as different artwork. Now walked end to end (config → file →
  text → parse → config → pixels) across four creative configurations,
  with a control asserting those four differ from each other.

**Matrix shape.** Mirrors the bench matrix idiom (derived IDs, mandatory
core cross-product plus targeted expansions, each row carrying a
`proves` line) but separate from it: the bench matrix is frozen for
measurement and its sources are perf-scale. Pairwise-plus-risk, not
Cartesian — the full product is 28,672 rows to re-prove what the
per-stage suites already hold. 31 rows, 218 assertions, 1.9 s in
`check`; the 1024² ceiling row is `MATRIX_FULL=1` (11.3 s).

**The coverage table is generated, and its staleness is a gate.**
`docs/acceptance-matrix.md` is rendered from the same rows the suite
runs, and the suite fails if the committed copy drifts. `check` never
writes it — `npm run matrix:write` does — so the gate stays
non-mutating. A row that cannot say what it proves cannot pad the
matrix.

**Consequences:**

- `check` is green: 41 files, 540 tests. Rust crate step **skipped
  locally** (no toolchain on this machine) — the crate change and its
  new unit test are verified by CI, and this is recorded as an explicit
  skip in the matrix doc rather than implied as covered.
- The local `crates/stitch-engine/pkg/` is now stale against the crate
  source, and without a toolchain it cannot be rebuilt here. Parked.
- M5-ACCEPT-02 gains a question it did not have: whether `reduce-first`
  should remain user-reachable given what its output is.

**Run notes (auto-jazz):** gateless. One judgement worth naming — on
finding the dither defect the choice was to ticket it or fix it. Fixed,
because M5-ACCEPT-01's own invariant list requires alpha to hold, and
shipping a matrix that documents a broken invariant as green is the
green-washing the project forbids. The maintainer-owned items
(ACCEPT-02/03) were not attempted: they are human gates by definition.

## D50 — The diagnostics affordance was specified three times and never built (2026-07-20)

**Context:** M5F's remaining items are all human gates. Preparing them —
which both maintainer tickets explicitly assign to the chat — meant
answering "how does the rehearsal record its evidence?". It could not.

**The gap.** `recentLogs()` in `src/diagnostics/log.ts` carried the
comment *"the (future) copy-diagnostics affordance reads"* and had **no
callers anywhere in the tree**. Meanwhile the affordance was specified
as present in three protected documents: an AGENTS.md hard rule
("Self-explaining runtime"), a full UI-STANDARDS section governing its
placement and behaviour, and DEV-INFRASTRUCTURE's bundle contract
listing its exact contents. Three documents described a control that did
not exist, and the dead export was the only trace.

**Decision — build it, as the prerequisite for M5-ACCEPT-03.**

**Shape.** `src/diagnostics/bundle.ts` is pure: every environment fact
is passed in rather than read from `window` here. That is what makes the
redaction rules — the part that must never be wrong — testable in node
without a DOM.

**Redaction is fail-closed, and that is the whole design.** The rule is
not "strip what we recognise as secret" but "emit only what we can
positively recognise as safe". Known-safe primitives inside depth,
string-length and entry caps; secret-shaped **keys** withheld by name;
secret-shaped **values** withheld by shape under any key (JWTs, prefixed
keys, long hex/base64 runs) because the dangerous case is a credential
logged under an innocent name; and anything else — a class instance, a
function, a value past the depth cap — **dropped rather than serialised
hopefully**. A class instance is dropped specifically because its
getters may have side effects or fields we cannot reason about.

The eagerness is deliberate and was confirmed by a test failure: a
1000-character string was redacted rather than truncated because it
matched the base64 pattern. That is the correct trade — a false positive
costs one field in a debug bundle, a false negative leaks a key into
someone else's chat log.

**UI deviation, recorded rather than silently taken.** UI-STANDARDS says
*Carbon icon button with a tooltip*, and also that the visible label and
accessible name must match — which a bare icon cannot satisfy. Every
other control in this app is a text button, so this is one too, with
`title` and text identical. Verified live: 159 × 44 px, keyboard
reachable, `role="status"` announcing what was copied **and that it is
redacted**, so the maintainer knows before pasting it somewhere public.
Captured as a doc-delta.

**Verified in the browser, not assumed.** Drove the real button in the
dev server with a seeded secret-shaped log record: status announced
correctly, no raw secret in the payload, `[redacted]` present, build id
resolving to the real commit, capabilities detected, and
`activeBackends` populating from a real frame as `{resize: ts, dither:
ts}` — the Lab routing D48 specifies. Screenshots came back blank in
this environment; the functional read-back is stronger evidence anyway
and is what was recorded.

**Also shipped: the two gate packs** the maintainer tickets ask the chat
to prepare — `docs/acceptance-visual-review.md` and
`docs/acceptance-live-rehearsal.md`. Both are grounded in real
thresholds (the draft governor's 200/100 ms and 2/5-frame hysteresis,
`DIRTY_MAX_STALE_MS`, the ≥ 4 updates/sec promise, 1024² as an
export grid per D47) rather than restating the tickets. The visual pack
carries the two things that actually changed since M4 — the D49
empty-cell fix, visible at letterboxed edges — and the open
`reduce-first` question, so the review has a decision to return rather
than only an impression.

**Consequences:**

- M5-ACCEPT-03 can now record its evidence with one paste instead of
  hand-transcribing build and environment facts.
- The affordance is **dev-only**. Production exposure needs the explicit
  opt-in and redaction review DEV-INFRASTRUCTURE requires; not done, not
  claimed.
- `check` green: 42 files, 560 tests. Rust step skipped locally as ever.

**Run notes (auto-jazz):** gateless. The scope judgement worth naming:
"auto-jazz M5F" had no agent-closable item left, so the batch became
*unblock the human gates* rather than either manufacturing work or
stopping. Building the affordance is not in the backlog — it is a
hard-rule gap that the rehearsal depends on, which is why it was treated
as in scope rather than parked.

## D51 — M5F closed on maintainer acceptance; roadmap restructured M6–M12 (2026-07-20)

**Context:** the maintainer ran the M5F gates and stated the M5 items
are tested and accepted. Separately, the maintainer supplied a
comprehensive product-direction prompt expanding the parked Icebox
themes into roadmap work.

**Decision 1 — close M5F.** All four acceptance items
(M5-ACCEPT-02..05) were human gates; the maintainer's acceptance is the
evidence they were waiting for. Recorded as sign-off, not fabricated
measurements — the gate packs (`docs/acceptance-visual-review.md`,
`docs/acceptance-live-rehearsal.md`) remain the record of what was
judged. Ticket files deleted per lifecycle.

**Decision 2 — roadmap shape.** Milestones M6–M12 added, ordered
companion layout → palette strategy → dithering → charting/export →
cosmetics/estimates. M6 first because the narrow-window Photoshop
workflow is the core product promise; M7 rides the M5 palette evidence
(LUT cache key fixed D46; GPU LUT build 59–655× faster than TS, D47);
M8 rides the M5 search structures with algorithms landing as choices,
not fidelity tiers (D47). Only M6–M8 carry full task breakdowns —
M9–M12 are terse stubs expanded when they become Next — keeping the
Active section inside its 1,500-word/40-item budget while the
maintainer's ticket-detail pass and agent runs work milestone by
milestone.

**Decision 3 — Icebox.** Tauri packaging stays uncommitted as a
feasibility spike (ICE-TAURI-01); a new automated Photoshop companion
workspace item (ICE-WORKSPACE-01, with detail ticket) records the
browser-vs-desktop capability split — browser gets a companion window
at best, OS-level Photoshop window control needs packaging. Wish-list
lines promoted into M6–M12 were drained.

**Consequences:** decision-log live entries now exceed the 20-entry
budget (41 live) — an archive split per `memory-policy.md` should be
proposed at next maintenance; not auto-pruned here.

## D52 — M6 companion layout: four resolutions named, capture aspect locked (2026-07-21)

**Context:** M6 makes the app usable in a tall narrow window beside
Photoshop. The recurring failure it guards against is conceptual, not
visual — "resolution" and "scale" meant four different things across
`config.grid`, `CropRect`, `ViewState`, and `exportState`, and nothing
stopped a future change wiring the wrong two together.

**Decision 1 — four named quantities, independence by reference.**
`src/ui/scales.ts` owns pattern (stitches) / capture (source px) /
preview (CSS px per stitch) / export (output px per stitch); every
field name carries its unit and there is no universal `scale` type.
The `with*` updaters share the three untouched slices *by reference*,
so the 4×4 matrix test asserts identity, not deep equality — a helper
that rebuilt an equal-but-new slice would pass `toEqual` and be the
start of exactly the coupling this exists to prevent. Preview scale is
persisted in CSS px, never device px, so a Retina project reopens the
same size on a 1× display.

**Decision 2 — the capture aspect lock is unconditional.** Every crop
mutation (new session, draw, eight handles, keyboard, source resize,
pattern change) ends in `constrainRect`. The anchor never moves — a
drag past the source edge shrinks the region rather than sliding the
whole selection — and the dragged axis leads, so an edge handle widens
instead of refusing to. Sizes snap to a whole multiple of the reduced
pattern ratio where one fits, making the ratio *exact* rather than
within a pixel; `contain` letterboxes any residue into a visibly empty
row at small region sizes, which is what made "within a pixel"
insufficient. `stitchSpan` was deleted: under the lock its answer is
always the pattern itself.

**Decision 3 — "Fit" is reset view.** The ticket asked for fit-to-space
and a reset view; its own conservative definition of reset *is*
fit-to-space, so shipping both would be two names for one behaviour.
One "Fit" button, plus fit-width and fit-height. "Actual size" stays
unbuilt — 1:1 is ambiguous between CSS px, device px, and physical
fabric size until the owner says which.

**Decision 4 — one shell-state model for two hiding features.** Panel
collapse and preview focus compose through a single `visibility()`
function rather than two layers of `hidden`. Focus mode wins while on
but never overwrites the panel's state, so leaving it restores a
deliberately collapsed panel. Panel state persists in localStorage as a
*shell preference*, not project data — a shared project must not make a
collaborator's controls vanish; preview focus is session-only.

**Decision 5 — preview-first DOM, panel on the right.** Rather than
reorder with CSS `order` (which desynchronises focus order from visual
order), the preview comes first in the DOM at every width and the
settings panel sits to its right above 60 rem. Reading, visual, and tab
order agree at all widths — verified at 320/360/480/800/1000.

**Consequences:** project schema v2 (`preview` block, forward migration
from v1). Three layout bugs were found only by measuring in a real
browser, not by reading CSS: `'center'.includes('e')` silently made
every reframe a north-east anchor; `margin: 0 auto` on `main`
suppressed cross-axis stretch so preview focus made the preview
*smaller*; and `height: 100dvh` without `border-box` clipped focus
mode's only status line under the fold.

## D53 — M6-WIN-01 spike: browser window placement is not worth shipping (2026-07-21)

**Question:** what companion-window workflow can ship in the browser,
and what needs packaging?

**Measured** (Chromium 148 in the Claude in-app browser, macOS,
DPR 2): `window.resizeTo()` on a window the script did not create is
**ignored without error** — no exception, no change, exactly the
"ignored without error" outcome the ticket named as a first-class
result. The `window-management` permission returned `denied`;
`getScreenDetails` exists but is unusable without it, and
`screen.isExtended` was false. `window.open` was blocked even from a
**trusted** user gesture. `outerWidth/Height` disagreed with
`innerWidth/Height` under viewport emulation — which is precisely why
any preset must *measure* the result and report partial failure rather
than trust a return value.

**Not measured:** stable Safari, Chrome, and Firefox on the
maintainer's own macOS setup. An Electron-embedded Chromium result is
not evidence about those, and the popup leg in particular is
browser- and user-setting-dependent.

**Decision — option (A), size guidance only.** Park browser window
placement. The reasoning is that M6-NARROW-01/PANEL-01/FOCUS-01 already
deliver the actual goal: measured at 320–480 CSS px the preview takes
93–95 % of the width with no page-level horizontal scrolling, so the
maintainer resizes the window once by hand and the app fits. Against
that, a companion window buys little and costs a lot — it introduces
cross-window ownership of the Worker, the capture stream, project
state, downloads, and diagnostics, and it cannot preselect Photoshop as
the captured surface, because `getDisplayMedia` requires the user to
choose one every time. The friction that remains is the one window
placement does not touch.

**Consequences:** no production code. ICE-WORKSPACE-01 carries the
finding: browser placement is parked, and the OS-level arrangement it
describes needs ICE-TAURI-01 first. Reopening this needs the
real-browser rehearsal matrix, which is a maintainer task.

## D54 — M6 closed on maintainer acceptance (2026-07-21)

**Verdict:** accepted. The maintainer signed off M6-ACCEPT-01 — the
legs only a human at a real machine can judge: Photoshop side by side
at a realistic narrow width with live capture running, the
aspect-locked crop driven by pointer and keyboard on a Retina display
and against a window resized mid-session, and the ≥ 4 updates/sec
promise under that load.

**Why it is recorded rather than assumed:** M6's agent-side work
shipped 2026-07-21 (D52/D53) but the milestone's acceptance line is a
human gate by construction — the failure modes it guards (a crop that
fights the pointer at DPR 2, a layout that only breaks once Photoshop
is actually beside it) are not reachable from an automated check. The
acceptance is the evidence; nothing about the shipped code changed.

**Consequences:** M6 leaves the backlog; v0.5.0 stands as the shipped
companion-layout release. M7 (palette & colour strategy) becomes
Current.

## D55 — M7: identity is the thread, not the colour (2026-07-21)

**Context:** M7 turns one hard-coded DMC palette into brands,
inventory, saved palettes, presets, colour counts and per-thread rules.
Every one of those is a way of *narrowing* which threads a conversion
may use, and the failure mode they share is narrowing silently.

**Decision 1 — identity is `brandId:reference`; RGB is a display
value.** `PaletteEntry` is gone; a palette is an ordered set of
`Thread`s carrying id, brand, reference, name, provenance and status.
Nothing merges two threads because their colours match. The data makes
this load-bearing rather than theoretical: 3,338 threads render as only
2,830 distinct colours, so RGB de-duplication would delete ~500 real,
separately-buyable threads.

**Decision 2 — a palette-index sidecar, not a reverse lookup.** Once
two brands can hold the same colour, "which thread is this stitch?" has
no answer in the pixels. `PixelBuffer.indices` is set by the stages that
map to a palette and travels the worker boundary as a transferable;
`EMPTY_INDEX` (0xffff) marks fabric so a black first entry is not
reported as stitches. The Rust crate was extended to return it too —
deriving it JS-side from the output RGB would have been exactly the
guess this exists to remove. A stage that invalidates it (resize after
reduce, under `reduce-first`) simply omits it, and stats fall back to
counting colours with no reference rather than inventing one.

**Decision 3 — four restrictions, composed in one place, never
collapsed.** `palette-policy.ts` holds brands (the universe), source
(a strict palette or preset within it), `ownedOnly` (the inventory
overlay) and lock/prefer/exclude. Collapsing any two is how "brand
enabled" quietly starts meaning "brand preferred". The colour-count
limit is deliberately *outside* it, in `palette-selection.ts`, because
it depends on the image — and it is applied **last**, so it selects
from the permitted set and can never widen one.

**Decision 4 — nothing throws; every failure is an explained
conflict.** No brand enabled, an empty inventory under "owned only", a
strict preset that resolved nothing, a lock outside the permitted set:
all are `PaletteConflict` values with a severity and a full sentence
naming the way out. These are states a person reaches by clicking two
checkboxes, and an exception thrown from inside a pixel pipeline is not
a UI. The UI keeps the three per-thread rules disjoint, so the
"locked and excluded" contradiction the resolver reports can only come
from a hand-edited file, never from clicking.

**Decision 5 — selection chooses against the source, never its own
output.** Count-limited selection is constrained quantisation over the
catalogue, seeded from a weighted Lab distribution of the design. The
first implementation fed it the pipeline's *reduced* output, which the
browser check caught: narrowing to 12 colours then asking for 30
returned 16, because the distribution only held the 12 already chosen.
The buffer is now the resized full-RGB twin, fetched once per source or
geometry change through the export route. Under live capture it is
deliberately not refreshed per frame — a palette rebuilt every frame
would make the preview churn.

**Decision 6 — presets ship algorithmic and say so.** Four LCh rules
(Neutrals, Pastels, Earth tones, Deep shades), each carrying its rule
as user-facing copy. A preset named "Pastels" promises taste, and taste
is the owner's to sign off; inventing a curated membership list and
presenting it as authoritative would be the agent putting words in the
product's mouth. The resolver already supports curated presets — a
curated preset is just a rule returning a fixed set.

**Decision 7 — projects store intent *and* the resolved snapshot.**
Schema v3's palette block holds the policy (what was asked for) and the
exact ordered threads that rendered (what happened). Policy alone would
let a catalogue release change a saved design; snapshot alone would
lose the intent. On reopen the snapshot wins and library drift is
reported, never repaired by name.

**Consequences:** project schema v3 with a v2 forward migration;
`PREFERENCE_DISCOUNT = 0.9` is a named product constant whose effect is
reported back as `preferredUsed`; 96 new tests. Deferred to the
acceptance gate: palette reordering UI, bulk inventory operations, and
curated preset membership.

## D56 — The thread data was superseded mid-milestone (2026-07-21)

**Context:** partway through M7 the maintainer replaced the owner data.
`dmc-anchor-map.csv` (a DMC→Anchor cross-reference, 533 DMC rows) is
superseded by `thread_list.csv` — 3,338 threads across eight brands
(Cosmo, DMC, CXC, Sullivans, Anchor, Ariadna, Madeira, Finca), each
carrying that brand's own colours. A second file, `thread_map.csv`,
proposes a cross-reference schema but contains **no data rows**.

**Why the architecture absorbed it:** D55's identity model was designed
for a case that was then an edge (Anchor colours mapped from DMC) and is
now the norm. Nothing in the policy, selection, or sidecar work changed.

**Decision 1 — one generator, CSV in, JSON out.** The source of truth
stays CSV: the owner edits it, it diffs in git, it needs no tooling.
`build-palette.mjs` now emits only `catalogue.json`; `dmc.json` had no
remaining reader and was deleted. Determinism is unchanged (brands
alphabetically by id, threads in source order within a brand).

**Decision 2 — references are normalised, brands are not merged.**
Anchor, CXC and Sullivans repeat their brand name inside the code
column ("Anchor 403"); the brand is already its own field, so the
prefix is stripped — otherwise every label reads "Anchor Anchor 403".
All eight brands are `provenance: "measured"`; the `mapped` variant
stays in the model for the cross-reference data when it lands.

**Decision 3 — nearest-equivalent ships computed, layered under
curated.** With measured colours per brand this is already answerable
from the existing Lab maths, so it ships now — but every result is
labelled, because a computed match is a suggestion and a published
conversion is not. The gap is real and measurable: DMC 310 is recorded
as `#0c0c0c` and Anchor 403 as `#000000`, so the correct answer still
carries ΔE 3.3. That is the argument for curated data, recorded as a
test.

**Recommendation on the map format (not yet acted on):**
`thread_map.csv`'s wide shape — a name/id column pair per brand — makes
every new brand a schema change and already carries ~400 blank rows.
A long form (`group_id,brand,code`, one row per thread per equivalence
group) adds rows instead of columns. Backlogged as M7-BRAND-03.

**Consequences:** the old CSV is retained as owner data but no longer
read; the protected-doc data tables were corrected in-flight because
the docs gate blocks on a path that no longer exists (doc-delta filed);
owner CSVs are excluded from the EditorConfig check, since their BOM
and CRLF are the exporter's, not this repo's, and the generator
normalises both at read time.

## D57 — M7 accepted; the remainder triaged by what blocks it (2026-07-21)

**Verdict:** accepted. The maintainer signed off M7-ACCEPT-01 on the
shipped workflow — brands, inventory, saved palettes, presets, colour
counts, and lock/prefer/exclude.

**The triage question:** three items were still open under M7. Rather
than carry them as one undifferentiated queue, they were sorted by
*what actually blocks each one*, which turned out to split them cleanly.

**Kept ahead of M8 — M7-LIB-01 (renamed from M7-PAL-02).** Every piece
of it is a **missing operation on a shipped feature**, not a new
capability: a user can create library palettes but has no route to
reorder or delete one, and can only build an inventory a checkbox at a
time. Reordering is the sharpest case — D46 makes palette order
identity-significant, so the app documents an edit it provides no way
to perform. Renamed because the work spans the inventory as well as
palettes, so the `PAL` prefix was wrong.

**Moved to the Icebox — ICE-XREF-01 (was M7-BRAND-03).** Blocked twice over: the
curated cross-reference data does not exist (`thread-map-proposed.csv`
is a header with zero rows), *and* nothing in the UI surfaces
equivalents, so even complete data would have no consumer.
ICE-EXPLORER-01 is its natural first one. The engine half already
shipped and is tested, so reactivation is data plus a generator.

**Moved to the Icebox — ICE-PRESET-01 (new).** D55 deferred curated preset
membership to owner review but never gave it a backlog home, which is
how deferred work quietly becomes forgotten work. It is blocked on
taste, not code: the resolver already treats a curated preset as a rule
returning a fixed set.

**Why the split matters:** all three would have read as "M7 leftovers"
in one list, and a next-batch pick would have had to re-derive each
time that two of them cannot be started at all. Sorting by blocker leaves
exactly one item in Active that can be started today, and states the
reactivation condition on the other two.

**Consequences:** M7 closes with one open item; M8 (dithering
expansion) is the next milestone, entered through its spike. The
memory budgets tripped at the M7 ship (trajectory over 2,000 words,
decision log at 46 entries against 20) remain open and are now the
oldest outstanding housekeeping.

## D58 — M7-LIB-01: the library's missing verbs (2026-07-21)

**Context:** M7 shipped a thread library you could add to but not
change. Palettes could be created, never reordered or removed; the
inventory could only be built one checkbox at a time across 3,338
threads. Reordering was the sharpest gap — D46 makes palette order the
nearest-match tie-break, so the app documented an edit it gave no way
to perform.

**Decision 1 — buttons, not drag.** Reordering is move-up/move-down
buttons per entry. A native button is keyboard-operable by
construction; a drag gesture needs a parallel key handler bolted on to
meet the same rule (UI-STANDARDS → "Operable"). Measured 46 × 44 and
92 × 44 CSS px, over the 44 px AAA floor, with `aria-label`s naming the
thread rather than "Move up".

**Decision 2 — bulk acts on the filter, and says how many.** The thread
table renders at most 60 rows, so a bulk action reading the rendered
list would silently do less than its label claims. `filteredThreads`
returns the uncapped match set and the buttons carry the count in their
own label — "Mark 480 shown as owned" — which is error *prevention*
rather than a confirmation after the fact. A no-op button disables
itself and says why ("All shown already owned").

**Decision 3 — confirm only the subtractive direction.** Marking
threads owned is additive and reversible by its own inverse; marking
them not-owned destroys a record the user built by hand. Only the
latter confirms. Symmetric confirmation would have trained the user to
dismiss the dialog that matters.

**Decision 4 — delete gets undo instead of a modal.** UI-STANDARDS
allows confirmation *or* reliable undo. Undo is the better half here
because deletion cannot damage a saved project at all — projects carry
their own palette snapshot (D55) — so the only loss is the reusable
record, and a session-scoped restore returns it exactly, revision
intact. Deleting the palette the policy points at falls back to the
enabled-brand set rather than leaving a dangling reference.

**Decision 5 — the editor is a collapsed disclosure, capped at 60.**
Rendering 489 entries added ~10,600 px to a settings panel already
14,700 px long, and every reorder rebuilds the list. Collapsed by
default, with the palette name and thread count in the summary so the
contents are identifiable without opening. The cap matches the thread
list; past it a note points at the colour-count control, which is the
actual way to get a palette worth reordering by hand.

**A measurement I got wrong:** the first timings suggested a reorder
cost ~2.6 s and I nearly redesigned around it. The figure was my own
polling `sleep`, not the work. Measured properly with a
`MutationObserver`, click-to-repaint is **8 ms**. The cap survives on
the worst-case argument (an eight-brand palette would rebuild ~17,000
elements per click), not on the number that prompted it — recorded
because the wrong figure is now in the git history of this file.

**Consequences:** M7 closes entirely; M8 (dithering expansion) becomes
Current. The memory budgets flagged at the M7 ship are still open and
are now the only outstanding housekeeping.

## D59 — Pruned project memory (2026-07-21)

**Decision:** Archived D11–D45 (2026-07-17 → 2026-07-19, 35 entries,
verbatim) to `archive/decision-log-2026-07-17-to-2026-07-19.md`, and the
six oldest trajectory phases M0–M5 (2026-07-17 → 2026-07-20, verbatim) to
`archive/trajectory/trajectory-0001-2026-07-17-to-2026-07-20.md`. Live
decision-log 48 → 13 entries plus this record (D46–D59); trajectory
3,455 → 985 words (8 → 2 phases, M6–M7 kept). Both live files now under
budget.
**Trigger:** decision-log over the 20-entry budget and trajectory over
the 2,000-word budget (Prune verb, user-requested).
**Not touched:** AGENTS.md (4,223 w, over the 3,500 soft guideline) left
as-is — reference docs are not prune targets. `doc-deltas.md` (17 open,
over the 10 threshold) noted for a Doc-sync pass, not archived. New
archive files are catalogued in `archive/INDEX.md`, not `file-map.md`
(the generator excludes `pm_skills/`).

## D60 — Doc-sync: four protected docs reconciled; requirements.md declared frozen (2026-07-21)

**Decision:** Reconciled the doc-deltas ledger (17 open) in one
sign-off-gated pass. Applied, per maintainer approval:
`architecture.md` (budget table replaced with the measured-baseline
model — product promise ≥ 4 updates/sec at ≤ 300² in-browser, rows
naming runtime/workload/build with regression + staleness guards,
canonical numbers in `docs/measurement-contract.md`; metric-based
backend routing replacing "automatic (profiled)"; the conditional
`adjust` stage note; the dither `alpha === 0` contract),
`DEV-INFRASTRUCTURE.md` (stale pre-M0 comments removed, `check`
composition corrected to its seven steps, `matrix`/`matrix:write` +
staleness gate added, `PORT`/`autoPort` parallel-session note),
`AGENTS.md` (stale `PaletteEntry` entity replaced by `Thread`,
thread-identity terminology contract added beside the four
resolutions, conditional-`adjust` note), and `UI-STANDARDS.md`
(diagnostics control is a text-labelled button, not icon-only, per
D50; new conflict/explanation pattern — `aria-live` list, severity as
a word, disjoint lock/prefer/exclude). Delta #15 (protected-data
tables, D56) needed no edit — the in-flight factual update was
verified current and this pass is its sign-off. 15 deltas ticked.
**Cut, with a policy:** the two `docs/requirements.md` deltas
(M6-VIEW-01, M6-CAPRES-01). `requirements.md` is the original combined
spec, explicitly "reference only": shipped behaviour belongs to
`architecture.md` / `AGENTS.md` / `DEV-INFRASTRUCTURE.md` (Document
ownership), where these facts already live. **requirements.md is
frozen reference** — do not capture future implementation drift
against it.

## D61 — M8-SPIKE-01: six dither methods earn a slot; matrix size, phase and seed do not (2026-07-22)

**Question:** which dither methods are materially different and useful
for cross-stitch output, and which controls does each genuinely need?

**Method:** a scratch harness in `tests/audits/` (the M5B candidates
pattern, `AUDIT=1`-gated): nine candidates — FS/Atkinson/JJN/Stucki/
Sierra Lite through one kernel-as-data loop asserted byte-identical to
the shipped stage for the FS kernel, Bayer 4×4/8×8, a generated
32×32 void-and-cluster blue-noise tile (seed `0x5eed`), and no-dither —
over seven 300² fixtures, scored on tone ΔE (4×4 box average), isolated-
stitch %, L\* bias, distinctness vs FS, and node timing. Full evidence:
`docs/dither-evaluation.md`, the published audit artefact, and an HTML
side-by-side gallery for the owner's eye.

**Decision — commit none, floyd-steinberg, atkinson, jarvis, ordered
(Bayer 8×8) and blue-noise (32×32); cut Stucki, Sierra Lite and
Bayer 4×4.** Diffusion owns tone fidelity on smooth content (organic
tone ΔE 1.45–2.67 vs none 8.05); Atkinson buys a third of FS's isolated
stitches for a small tone cost; Jarvis is the only large kernel that is
not FS-within-noise (Stucki and Sierra Lite are, and are cut).
Threshold methods leave flat and near-palette content untouched where
diffusion peppers it (flat-art isolation 2.3% vs 18.5%) — the graphic-
content answer; blue-noise halves ordered's isolated stitches with no
periodic texture. Bayer 4 vs 8 is indistinguishable at stitch scale, so
one ordered method ships and **matrix size gets no control**.

**Control surface:** algorithm selector; **strength** everywhere but
none, with per-family definitions (diffusion: fraction of error
diffused 0–1 — at 0.5 it *improves* tiny-palette tone; threshold:
0–2 × a ±48/255 base amplitude — tiny palettes need > 1); **serpentine**
diffusion-only. No phase, no seed — nothing stochastic ships.

**Performance:** every candidate is within ~10–20% of the no-dither
reduce loop (the palette scan dominates); no accelerated backend is
justified by this evidence. Ordered/blue-noise are pointwise and
WebGPU-shaped if a profile ever asks.

**Run notes (auto-jazz):** spike mode, gateless; the committed set is
the conservative numeric pick, explicitly reviewable at the M8-ACCEPT-01
visual session, whose failure routing may reopen this decision. First
run used the bench `palette64()` (first-64 chunk) and drowned quality
in −16 L\* palette-coverage bias; quality rows were re-taken on a
64-thread spread palette — worth remembering for any future perceptual
comparison.

## D62 — M8 shipped: the dither union, FS-only wasm guard, and the flat-kernel lesson (2026-07-22)

**Context:** implementing the D61 set (M8-ALG-01/M8-CTRL-01 plus the
automated half of M8-ACCEPT-01) in one auto-jazz run.

**Decision 1 — dithering is a discriminated union, schema v4.**
`PipelineConfig.dither: boolean` (+ top-level `serpentine`) became
`DitherConfig`: `none` carries nothing, diffusion carries
`serpentine` + `strength` (0–1, fraction of error), threshold carries
`strength` alone (0–2 × a ±48/255 base amplitude). Invalid
combinations cannot be expressed rather than runtime-guessed. The
v3→v4 migration maps `true` to Floyd–Steinberg/full-strength/stored
scan direction — old projects render byte-identically (asserted); the
dropped `serpentine` of a `dither:false` file had no observable effect.
Stage params keep optional `algorithm`/`strength` with FS/1 defaults so
every pre-M8 caller keeps its exact meaning.

**Decision 2 — a backend may never substitute a different method.** The
Rust crate implements exactly FS at strength 1, so `routeDither` routes
everything else to `ts` unconditionally, and the wasm adapter
defensively delegates to the TS reference when params say otherwise —
a stale manual override cannot silently swap algorithms.

**Decision 3 — the readable kernel table needs a hot-loop shape.** The
first generic diffusion loop iterated `readonly [dx, dy, w][]` tuples
per pixel and cost **2.3×** the unrolled pre-M8 FS on the 1024² budget
row (`npm run bench` caught it). Flattening each kernel once into
parallel typed arrays (mirrored dx pair for serpentine) restored the
budget with the kernel-as-data source of truth intact. Lesson: in the
per-pixel loop, tuple destructuring is an allocation-adjacent cost V8
does not forgive; the benchmark gate is what made this visible before
merge.

**Decision 4 — presets are evidence-bearing data.** Each of the seven
presets (None/Subtle/Balanced/Strong/Photograph/Graphic/Very limited
palette) carries a `basis` line quoting its D61 evidence; the UI model
is pure (`src/ui/dither-model.ts`), presets resolve by structural
equality so any edit lands the selector on a disabled "Custom" option,
and per-method last-settings memory is deliberately session-only — the
project file stores exactly one canonical configuration.

**Deferred to the owner:** the visual acceptance session
(M8-ACCEPT-01, maintainer) and the golden-fixture decision
(M8-GOLD-01, `tests/golden/**` is protected); ordinary deterministic
fixtures prove the implementations meanwhile. The frozen bench matrix
was **not** extended with algorithm rows — budgets stay bound to the
FS rows, and the D61 audit artefact carries the per-method timings
(all within ~10–20% of no-dither; a matrix extension would need a
boundary-version bump).

## D63 — Roadmap refactor: M13 visual-processing performance; M8 maintainer gates deferred (2026-07-22)

**Decision:** the backlog's single active milestone is now **M13 —
Visual processing performance**: thirteen tasks in five dependency-ordered
phases (measurement refresh → component profiling → a `[sign-off]`
synthesis → conditional evidence-approved implementation → integrated
automated + maintainer acceptance). No ticket files were created — the
owner will generate each performance ticket pack independently, so no
new task carries `[detail]` yet.

**Deferrals — explicitly not passed, cut, completed or shipped:** the
two open M8 maintainer gates, **M8-ACCEPT-01** (visual-quality
acceptance session) and **M8-GOLD-01** (golden-fixture decision), were
**intentionally deferred** to the Icebox with IDs, wording, dates, flags
and the M8-ACCEPT-01 ticket file preserved. The M9–M12 milestone stubs
moved from "Next milestones" (section removed) to the Icebox verbatim,
ticket files intact. Nothing moved to the trajectory (nothing shipped);
existing ICE-* items are unchanged.

**Rationale:** re-measurement precedes optimisation — the M5 evidence
is historical input (its attributions were overturned once already,
D48), M8 added four dither methods the frozen bench matrix and budget
rows never covered (D62), there is no 300² budget row despite the
product promise binding there, and the browser-only boundaries
(`preview-update`, `interaction`, `export`) are still manual-only. The
synthesis gate (M13-SYNTH-01) keeps implementation conditional on
evidence rather than encoding speculative speedups as acceptance
criteria.

**Alternatives:** running the M8 gates first (rejected by the owner for
now — deferred, not abandoned); splitting the five phases into separate
milestones (rejected: one milestone keeps the dependency chain and the
single synthesis/evidence doc in one place). Wish-list overlap noted and
left in place by owner decision: the browser test-runner idea
(M13-MEAS-02 territory), the manual `?backend=` override (M13-PROF-03),
and the 1024-cap revisit (M13-SYNTH-01).

## D64 — M13-MEAS-01: bv2 — the bench contract now tells the truth about M8 and the palette (2026-07-22)

**Decision — bump the node bench to boundary version bv2.** The six
marks are unchanged; the workload meaning changed, which is the same
comparability break. bv1 and bv2 reports must not be diffed.

- **Dither axis = the engine's `DitherConfig` union.** bv1's Boolean
  froze before M8, so every `dither` row silently meant FS/serpentine/
  strength 1 and the four M8 methods had no coverage. The ID token is
  now `nodither | <method>-s<pct>[-serp|-raster]` — percent-granular so
  the dot-separated grammar survives; two executable configs can never
  share an ID. A mandatory method block covers each M8 method at 300²
  and 1024²; targeted rows cover half strength, raster scan and
  threshold strength 1.5.
- **`p533` → `p489`.** `loadDmcPalette()` returns the catalogue's 489
  DMC threads; the old ID named a count that never existed. The
  large-palette stress is the full eight-brand union (3,338 threads) as
  `pfull` — **preparation rows only** (`prep.pfull.lab`): a per-frame
  pipeline row over the whole catalogue measures no product path.
- **Preparation coverage extended.** Cold candidate-table builds
  (27 / 180 / 3,296 ms at p64 / p489 / pfull — the pfull figure is the
  standout, M13-PROF-02's territory), threshold-tile first use (Bayer
  0.02 ms, blue-noise generation 12.1 ms), pfull LUT 206 ms.
- **Run validity.** Every run is assessed — wall-vs-monotonic clock
  drift (sleep/suspension), samples over 120 s, stall-shaped outliers —
  and a tainted run fails loudly with findings; samples are never
  deleted. This is the e703ed4 lesson (a ~5.8 M ms sample of unknown
  cause) made mechanical.
- **Re-baseline: ten budget rows** at `v0.5.0+20260722.33d021b`, node
  24.5, M1 Max. Headline finding: FS dither 1024²/p64 is 231.9 →
  296.7 ms (**+28 %**, inside the ×1.35 guard) — D62's flat-kernel fix
  restored *tolerance*, not parity. Recorded, not rebased away;
  decomposing the cause is M13-PROF-01's job. New guards: the 300²
  pipeline row (37.0 ms — a node component baseline, never a proxy for
  the in-browser promise) and per-method 1024² dither rows (290–338 ms,
  all TS; no method is an outlier vs FS).

**Run notes (auto-jazz):** gateless; the audits' bv1 workload IDs were
mechanically renamed so they still resolve; their pre-existing stale
post-M8 assertions were parked on the wish-list, not fixed here.

## D65 — M13-MEAS-02: the browser harness measures the shipped route, and shared bv2 types moved into src (2026-07-22)

**Decision — the bv2 vocabulary lives in `src/bench/`.** The harness
must emit real bv2 rows, production code must not import test modules,
and two drifting copies of the schema is the worse failure — so the
pure modules (`boundaries`, `report`, `harness`, `workloads`) moved
from `tests/bench/` to `src/bench/`; node-only `env-node`/`run-node`
stay in tests. Only the bench entries import them, so the app bundle is
unchanged.

**Decision — boundaries are measured where they happen.** The worker
now stamps additive absolute-clock `FrameMarks` (received / compute /
bitmap / preview-draw-return) on each `ProcessResult` — Window and
Worker have different `timeOrigin`s, so marks travel as
`timeOrigin + now()`. `PipelineClient` gains an optional job observer
(job actually posted / settled). `preview-update` = post → draw-return,
per the contract; main-thread receipt is a separate diagnostic phase.
Marks are attached only when the draw happened — a failed snapshot must
not report a preview it never made — and the D46 answer-exactly-once
invariant is untouched.

**Decision — `interaction` gets a controlled start mark.** A Photoshop
edit has no programmatic timestamp, so repeatable interaction rows use
a same-origin `bench-source.html` window that repaints on
BroadcastChannel command and replies with its own double-rAF paint
timestamp; the owner shares it in the capture picker. Real-Photoshop
interaction stays manual (M13-PROF-04/M13-ACCEPT-02). Capture-input
rows use a `capture.g<grid>.…` pseudo-ID — a matrix ID would lie about
the input.

**Also:** a pure `CounterTracker` ledger (interval deltas +
conservation checks, gate-tested) for the pump/dirty/coalescing
counters; `startFramePump` passes rvfc metadata through untouched;
`npm run bench:browser` is the documented run command. **Remaining
leg:** the maintainer's browser run itself — `getDisplayMedia` needs
the owner's gesture, so the item stays open at "code complete,
evidence pending".

## D66 — M13-PROF-01/02 node halves: the match is the cost, selection is the sleeper (2026-07-22)

**Decision — publish the node halves now, hold the browser halves.**
Both audits (`npm run audit` → `m13-stage`, `m13-prep`) publish ranked,
artefact-backed node evidence and record the browser questions as
explicit gaps: per-stage node↔browser ratios, GPU LUT end-to-end and
selection-source/live-preview contention all need the M13-MEAS-02
harness run, which requires the owner's capture gesture. Nothing
node-side is extrapolated to the browser (M5 measured resize ~3.5× vs
dither ~1.1× — there is no single multiplier).

**Stage findings (node):** dither dominates every ranked cell, and the
per-stitch exact match is ~92% of it (pruned scan 27.8 ms of a 30.3 ms
FS stage at 300²/p64; conversion ~10.5 ms of that; kernel propagation
~1 ms). The five methods sit within ±14% of each other everywhere —
the shared match, not any method, is the only meaningful target.
Pruning is worth 3.0× at p489 and near-nothing at p64 (consistent with
D48). Resize follows the source (28.1 ms from 1280², 13.9 ms from a
grid-sized 1024² input).

**Preparation findings (node):** below the candidate table, the
count-limited selection path is the sleeper — 121 ms to resolve
"30 from all eight brands" (116 ms in `selectThreads`) vs 0.65 ms
without a count. Candidate tables stay the dominant cold cost (30.7 /
549.9 / 1,325.6 ms at p64/p489/pfull), but the p489 figure disagrees
with the bench cold row by ~2.7× — recorded as measurement
sensitivity, both artefacts carry it. Cache behaviour is now proven by
counters (`lutCacheStats`, additive diagnostics in
`src/worker/lut-cache.ts`): content keying and reorder-rebuilds behave
as designed; **the candidate cap of 2 rebuilds on any 3-palette
cycle**.

**Scope note:** engine untouched beyond the additive cache counters
(explicitly in the ticket's surface). Both items stay `[~]` until the
browser halves land.

## D67 — M13-MEAS-02 shipped: the harness earns its evidence over three runs (2026-07-23)

**Decision:** accept the run-3 report
(`bench-reports/browser-bench-v0.5.0_20260723.8adb5d2-run3.json`) as
the MEAS-02 evidence, with its first live row discarded. The report is
formally tainted by a "page hidden during the live window" finding,
but the taint is fully attributed to that discarded row
(`page visible: false`, three zero intervals) and the same report
carries a clean retake (119 samples, counters conserving). The taint
system flagging exactly the window that went wrong is the contract
working. A pristine re-run stays cheap if the maintainer wants an
artefact with no caveat.

**What three runs taught:** Run 1 shared the harness's own window
(capture width = viewport × DPR) because the run doc said "any
surface" — and the harness published 30 s of zeros as a clean measured
row. Fixes: the `zeroFrameReason` verdict (zero-callback window →
`not-measured` + tainting finding, never 0 updates/sec), a
wrong-surface width warning at capture start, button 6 driving the
source at 4 changes/sec (it repaints only on command), and the doc
naming the button-4 source window. Run 2 landed the live leg but froze
at interaction change 3: the span timeout nulled the shared settle
waiter on a null check, so a stale 5 s timer from a fast change stole
the active change's waiter, which could then never resolve — fixed
with an identity-guarded waiter token, reachable only once spans
settle fast (why run 1 never hit it). Run 3 completed all three
boundaries.

**Headline numbers (M1 Max, production build, worker route):** still
preview-update 21.1/37.3 ms at 200²/300²; live capture 30.3 ms median
at a driven 4 changes/sec (pipeline keeps pace, zero drops/skips);
interaction 53.7 ms median source-paint → preview-draw (7/8, one
counted miss); GPU LUT agreement EXACT ×3; reduce 1024²/p64 ts 5.0 ms
vs webgpu map 5.3 ms end-to-end — near parity, so PROF-03's question
now has production data. Caveat: runs 2–3 measured the fixed harness
from a dirty tree still stamped 8adb5d2; the close commit lands the
code the reports measured.

**Unblocks:** M13-PROF-03/04/05; the browser halves of PROF-01/02.

## D68 — M13-PROF-01/02 browser halves: ratios are stage-specific both ways, and a hidden page is not a measurement surface (2026-07-23)

**Decision:** publish the browser halves from an unattended foreground
Chrome run and close both PROF items. The harness gained three
gestureless legs — a worker-route stage matrix over 18 shared bv2
workload IDs (the executor's own `StageTiming[]`, so browser stage rows
pair with node rows by ID + label), timed GPU-vs-TS LUT builds, and a
selection-source contention probe — plus an `?auto=<legs>&post=<url>`
mode so an agent can run the gestureless half in a real browser window
it cannot script. Evidence: `docs/performance-evidence.md` → "M13
profiling, browser halves";
`bench-reports/browser-bench-v0.5.0_20260723.170dcba-auto.json`.

**Findings:** dither browser ≈ node (1.00–1.11 across all five methods,
grids, palettes); resize 1.12–1.28× (the M5-era 3.5× is superseded on a
production build); reduce ~2.3× **faster** in browser — so node medians
must be translated per stage, in both directions. GPU LUT build is a
clear wired-in win (3.6/2.4 ms vs TS 8.3/39.7 ms at p64/p489,
dispatch-bound, EXACT ×5). `mapPaletteGpu` loses end-to-end here
(8.0 vs 5.4 ms) — M5-PERF-23 stands. The selection-source export blocks
overlapping frames by ≤ one export (~51 ms) with zero drops/errors —
bounded, no race, no wedge; the capture-path confirmation moves to
M13-PROF-04's live leg.

**The lesson:** the first attempt ran in the in-app preview pane, which
always reports `hidden`; the whole renderer — worker included — was
CPU-throttled to 10–20× inflated samples. Discarded. The auto mode and
a doc warning encode it; the env row's visibility field makes a
background run self-incriminating.

**Auto-jazz assumptions:** scope = browser halves via harness extension
(no engine changes — additive bench entry only); design = executor
timings over page-context stage calls; contention measured worker-side
under a synthetic 250 ms still pump, caveat named in the row labels.
Same dirty-tree caveat as D67: the report is stamped `170dcba`, this
close commit lands the measured harness code.

## D69 — M13-PROF-03: every routing rule confirmed end-to-end; a request-level force makes both sides measurable (2026-07-23)

**Decision:** publish the backend comparison and close M13-PROF-03. The
worker gained a **harness-only per-stage backend force** riding on the
request (`force`, `src/worker/protocol.ts`) — top of the executor's
precedence, TS fallback when the forced backend is unregistered,
deliberately not on `PipelineConfig` so it can never reach a project
file. The harness gained a `backend` auto leg: cold-init rows, the
12-cell forced TS↔WASM Floyd–Steinberg matrix through the shipped
worker route (interleaved, byte-equality oracle on pixels **and**
indices per cell), the TS-vs-`mapPaletteGpu` sweep, the export-boundary
comparison, and fallback probes. Evidence:
`docs/performance-evidence.md` → "M13 backend end-to-end comparison";
`bench-reports/browser-bench-v0.5.0_20260723.0042e73-backend.json`.

**Findings:** all three routing rules **confirmed, no crossover in
range** — `lab → ts` (TS wins 1.33–2.88×, margin grows with palette:
pruning is Lab-only and Rust's `libm` transcendentals are software),
`rgb → wasm` (wasm wins 2.0–2.8× and holds 2.39× at the full export
boundary), `mapPaletteGpu` stays unwired (TS wins every cell including
the 1024² ceiling, and the kernel still emits no indices sidecar —
unroutable under D55 regardless of speed). Categorical metric routing
needs no size threshold: the metric decided all 12 cells. Counter-
proven: caching the wasm adapter's per-call palette flatten
(0.0/0.1 ms at p64/p489). Every fallback probe answered exactly once
(D46); GPU device loss recovers with an EXACT rebuilt LUT. One defect
filed: **M13-DEF-01** — `StageTiming.backend` reports `wasm` while the
adapter's non-FS delegation guard actually ran the TS reference
(reachable only via override/force).

**Auto-jazz assumptions:** scope = harness + force channel only (the
surface the ticket names), no adapter or routing edits;
`timestamp-query` GPU pass time deferred — requesting the feature
means editing shipped `device.ts`, which the ticket forbids, and CPU
wall time settles the wiring question; off-matrix rgb cells published
under grammar-derived IDs (contract note added to
`docs/measurement-contract.md`). Same dirty-tree caveat as D67/D68:
the report is stamped `0042e73`; this close commit lands the force
channel and leg it measured.

## D70 — M13-PROF-04 gestureless half: the dirty gate is size-blind, not contrast-blind (2026-07-23)

**Decision:** publish the gestureless live-path rows, land the
owner-session instrumentation, and hold the live half for the owner's
capture gesture — the rehearsal sheet
(`docs/browser-measurement.md` → "The M13-PROF-04 owner session") is
that session's script. PROF-04 stays `[~]`. Evidence:
`docs/performance-evidence.md` → "M13 live-path gestureless rows";
`bench-reports/browser-bench-v0.5.0_20260723.c68e2c3-livepath.json`.

**Findings:** detection probability is a function of **edit size
alone** — ≤ 2 px invisible at any contrast (1 px full-contrast 0/20),
the knee between 16 px (55–70%) and 32 px (100%) at a realistic
Retina crop. The 64² averaging destroys the signal before the hash
sees it, so the 2 s forced refresh is the user-visible latency for
small strokes — the owner session should *feel* that number, not
discover it. Per-tick sample cost sits below the 0.1 ms timer floor;
`computeStats` adds 2.0 ms per displayed 300² frame on the main
thread. Instrumentation added to the live legs: dirty/grab medians,
long tasks, timestamped draft transitions, track
`frameRate`/`displaySurface`, a 200² window (6b), and one mid-stream
selection export with overlap analysis (the D68 carry-in).

**Auto-jazz assumptions:** the replay mirrors the sampler's canvas
ops (the shipped `sampleVideo` is video-only) with the shipped hash —
caveat on every row; no `main.ts` instrumentation (the DevTools trace
owns the app-side DOM half); no policy tuning (the ticket forbids it).
Dirty-tree caveat as D67–D69: report stamped `c68e2c3`, this commit
lands the leg that produced it.

## D71 — M13-PROF-05 gestureless half: the capture copies dominate, exports starve the main thread, not the worker (2026-07-23)

**Decision:** publish the census, isolation re-proof, contention and
peak rows; hold the snapshot-pair and GC-pause reads for the same
owner session PROF-04 already needs (rehearsal sheet Parts C/D).
PROF-05 stays `[~]`. Evidence: `docs/performance-evidence.md` → "M13
memory, GC and export contention";
`bench-reports/browser-bench-v0.5.0_20260723.5494a8d-mem.json`.

**Findings:** the census puts **~93% of per-frame churn at 300² in two
crop-sized main-thread buffers** (grab `ImageData` + pre-submit copy,
≥ 11.9 MB per accepted frame, ~180 MB/s at 15 updates/sec) — the top
reuse candidates, ranked; worker outputs matter only at the 1024²
ceiling. Export isolation is EXACT everywhere (idle / pump / draft /
rapid ×2). Artefact exports never displaced the worker measurably and
never dropped a frame; the 527 ms PDF export instead **blocks the
main thread** (~0.5 s preview freeze, zero worker queue) — encode and
assembly, not pipeline, are the contention. Peaks: chart cell 10 at
1024² backs ~430 MB twice over; clean ×16 at the exact 16,384 px edge
succeeds (2.18 s, ~2.1 GB transient). Two defects/questions:
**M13-DEF-02** (chart past the canvas edge dies on a silently zeroed
`OffscreenCanvas` with no clamp or user-facing message, reproduced
twice) and the **post-export ~75 MiB that 5 s of idle does not
reclaim** (lazy GC vs retention — the snapshot pair decides; a first
probe without the idle tail was discarded for conflating the two).

**Auto-jazz assumptions:** heap readings are Chrome's JS-heap number,
labelled as such; node `arrayBuffers` corroboration skipped (the
census is dimension arithmetic, the browser run corroborates end to
end); worker-side GPU-loss export unreachable from the page (D46
suites own it); no pooling or scheduling changes (ticket forbids).
Dirty-tree caveat as D67–D70: report stamped `5494a8d`, this commit
lands the leg.

## D72 — M13-DEF-01/02: labels only name code that ran; exports refuse before the canvas can lie (2026-07-23)

**Decision:** fix both profiling-filed defects as quick tasks.
**DEF-01** — the crate's capability fact now lives once, in
`wasmDitherImplements` (`backend-select.ts`); routing consults it and
the executor clamps a forced or recorded `wasm` through it before the
timing label is stamped, so `StageTiming.backend` can only name code
that actually ran. The adapter's internal delegation (M8-ALG-01)
stays as unreachable defence in depth. Regression tests cover both
reachable routes (harness force, recorded selection); the harness
probe now treats a `wasm` label there as a regression finding.
**DEF-02** — the app UI already clamped (`maxCellPx`, `maxScaleFor`),
so the fix is the module boundary: `oversizeMessage` (`png.ts`) gives
both encoders a user-facing refusal thrown **before** any canvas
exists — which is also what makes the guard node-testable (the
browser's own failure mode is a silently zeroed canvas and "size of
OffscreenCanvas is zero"). The chart refusal names the largest cell
that fits. Regression tests reproduce the 1024²/cell-16 case.

**Auto-jazz assumptions:** both items were unblocked one-line defects
(quick-task path, not evidence-gated by SYNTH); no behaviour change
reachable from today's UI — the clamp corner was force/override-only
and the refusal corner was module-direct-call-only.

## D73 — M14 UI/UX excellence: novice-first milestone, gates deferred to one end review (2026-07-23)

**Decision:** created milestone M14 — and, on the owner's direction
later the same session, made it **Current**, moving M13's remainder
to Next — a UI/UX excellence pass optimising the default surface for
first-time users while keeping full control depth deliberately
placed. Twelve tasks in
four phases (audit → spec → implementation → verification), every one
agent-executable without maintainer sign-off, per the owner's
directive (2026-07-23 session). Design judgement is deferred, not
removed: each substantive decision is recorded (decision log +
`docs/ui-evidence.md`) and judged once at M14-ACCEPT-01, the only
[maintainer] item.

**Constraints encoded in the milestone preamble:** UI-only — engine,
worker and export outputs stay byte-identical (reference exports
captured at audit, hash-matched at verify); no new runtime
dependencies (Carbon implemented in project code, per UI-STANDARDS);
presentation/disclosure state in the preferences store, never the
project file; no project-file schema change. `UI-STANDARDS.md` binds
throughout (Carbon productive, WCAG 2.2 AAA, Nielsen as hard rules,
the 14-item design review gate).

**Why now:** the shell still wears its M1 dev styling by design
(`index.html` says so itself); `src/ui/styles/tokens.css` — promised
by both UI-STANDARDS and DEV-INFRASTRUCTURE — does not exist; controls
are Carbon-informed but not Carbon-complete; there is no first-run
guidance. The accessibility bones (44 px targets, 7:1 contrast, focus
rings, reduced motion) are already in place, so this is a completion
pass, not a rescue.

**Alternatives rejected:** folding UX work item-by-item into the
feature milestones (M9–M12) — the novice-first restructure is
cross-cutting and would be relitigated per milestone. **Sequencing:**
M14 was first slotted as Next, then promoted to Current at the
owner's direction: M13's remaining halves are owner-session-gated
(PROF-04/05 rehearsals → the [sign-off] synthesis) while M14 is
machine-executable, so agent capacity goes to M14 meanwhile; M13's
banked evidence (D64–D72) stands. The don't-disturb concern is
carried by the UI-only invariant plus a re-capture rule — if M13
implementation ships mid-M14, M14's reference exports are
re-captured.

**Link:** backlog → "Current — M14"; tickets `M14-*.md`; wish-list UX
overlaps deliberately left parked (rename, adjustments panel, preview
modes, processing-order editor — feature work, not this milestone);
the FIT_MARGIN tick-label clip stays wish-listed but is folded into
the audit's known findings.

## D74 — M14-AUDIT-01: a completion pass confirmed — 22 findings, none blocking; byte-identity gets a tripwire (2026-07-23)

**Decision:** the standards audit (`docs/ui-audit.md`) records 22
ranked findings — 8 major, 11 minor, 3 polish, no blockers — from a
full surface × state walk (a11y-tree reads, programmatic target-size
and contrast sweeps, real-control state driving, synthetic
`canvas.captureStream` route for capture states). D73's "completion
pass, not a rescue" framing held: contrast is uniformly 18.1:1/16.45:1,
focus and live-region bones are in place. The majors cluster where the
milestone already aims: 68 sub-target checkboxes and 60 identical
"Own" accessible names in the thread list, two selector gaps in the
44 px rule, the 16-screen default surface at 320 px, an
opens-to-nothing disclosure, native prompt/confirm dialogs, a
machine-token capture label, and silent keyboard crop moves.

**Baseline design (the byte-identity spine):** a vitest tripwire
(`tests/ui-baseline/baseline.test.ts`, runs inside `check`) pins
SHA-256 of the seeded fixture PNG, the reference-pipeline output
(pixels + indices, TS forced), and the serialized default project
file; browser-side export captures are committed under
`tests/ui-baseline/exports/` with hashes in the audit doc. The browser
clean PNG's decoded pixels hash-match the Node pin exactly, welding
the UI route to the reference. Rules recorded: PDFs compare after
normalising pdf-lib's creation dates; the saved project compares
field-wise (`preview.cssPxPerStitch` is viewport-derived); a pin
mismatch during M14 is a defect, never a fixture refresh.

**Assumptions at skipped gates:** scope = ticket as written, read-only
plus sanctioned baseline artefacts; before/after pack = the audit
doc's state recipes + hashes (no committed screenshot binaries).
Incidental: `architecture.md`'s "currently v3" corrected to v4
(observed `schemaVersion: 4` in the saved project).

**Link:** `docs/ui-audit.md`; `tests/ui-baseline/`; backlog M14 →
SPEC-01/02 unblocked.

## D75 — M14-AUDIT-02: the depth numbers name the redesign — 1-drop conversion, 13-screen exports, silent loss on close (2026-07-23)

**Decision:** the journey walk (`docs/ui-journeys.md`) records the
five as-is journeys with step counts and a complete control-tier
inventory. The mechanics are strong where they exist: 1 drop → 1.3 s →
converted preview with honest statuses; live capture reaches a
pre-drawn aspect-locked region in one in-app click; palette
refinement's summary/conflict honesty holds under every degenerate
state driven. The failures are placement and guidance, quantified:
Dither/Export/Project sit at ~10.1k/10.7k/11.6k px on an 11.8k px
default page (the 60-row thread list inflates the panel ~8k px; ~130
tab stops for a keyboard user); the four resolutions span three
surfaces at three depths; capture starts with an unexplained OS prompt;
the first preview is thread-mapped to DMC without the user choosing
threads.

**Confirmed dead end:** no autosave exists in src/ (the architecture
stack line is aspiration) — close/reload silently discards everything;
a novice who never found Save (13+ screens deep) loses the session.
M14-scope remedy is placement + honest copy (SPEC-01/IMPL-04);
building autosave is new behaviour, outside the UI-only milestone —
left to a future backlog decision.

**Method:** cleared origin (localStorage + IndexedDB) before the first
walk; journey 2 crossed the un-scriptable OS picker via a
`canvas.captureStream` substitute at the `getDisplayMedia` boundary,
disclosed inline; real-route step counts include the picker decisions.

**Assumptions at skipped gates:** scope = ticket as written; tier
judgements are first-pass (E/C/D/dev), explicitly SPEC-01's to decide.

**Link:** `docs/ui-journeys.md`; audit findings cross-refs `A#` →
`docs/ui-audit.md` (D74). Phase 1 complete — SPEC-01/02 unblocked.

## D76 — M14 tier scheme: three tiers with a measurable reach contract (2026-07-23)

**Decision:** every control gets a tier with a hard reach ceiling from
the default populated state — E visible/≤1 interaction, C ≤2 (one
section open), D ≤3 (section + one inline disclosure), dev unchanged —
with disclosure state in the preferences store only (`ui-spec.md` §1).
Collapsed regions leave the tab order, which is what converts J3's
~130 tab stops and 10–12k px depths (D75) into bounded numbers
VERIFY-02 re-measures. One recorded exception: the three export
buttons are E-tier actions at reach 2 (exporting is never a session's
first act; the section summary keeps them findable). **Alternative
rejected:** a modal "advanced settings" surface — hides depth behind a
context switch and breaks the live-preview editing loop (§5.4
immediate application).

## D77 — M14 regrouping: seven flat groups become five stateful sections (2026-07-23)

**Decision:** Pattern+Colour essentials → **Design** (open by
default); Grid+Dither → **Appearance**; Export and Project keep their
names as sections; Pipeline → **Advanced** (renamed control, D79);
the thread list, rules, inventory and library actions move behind one
"Thread library & rules" disclosure inside Design (`ui-spec.md` §2/§5).
Rationale per change: Pattern and Colour are the two decisions that
define a design (J1's "what next"); Grid and Dither are both
appearance of the same preview; the thread list is the measured cause
of the depth pathology (D75) and only renders when opened; Export
buttons lead their section (A22). Collapsed headers carry derived
state summaries (recognition over recall; status-line precedent —
derived from owned state, never scraped). Version/build line moves to
the Project foot (A13). **Alternatives rejected:** Save duplicated in
the shell bar (two homes for one action breaks consistency); a
single-open accordion (punishes cross-section work during live
editing).

## D78 — M14 first-run: two equal entries, a generated sample, and unsaved-work honesty (2026-07-23)

**Decision:** the empty state becomes a Carbon-pattern entry point —
"Choose an image" and "Capture your screen" as equal primary buttons,
"Try a sample" secondary (deterministic in-code buffer through the
normal import path; no asset, no dependency, not the test fixture),
drop/paste named in one line, and a capture-expectation sentence
("Your browser will ask which window or screen to share") answering
J2's unexplained prompt. After first conversion the source section
compacts to one row. The no-autosave dead end (D75) is answered in
scope by honesty, not feature: "Nothing is kept unless you save your
project." in the Project section; autosave itself stays a future
backlog decision. Crop readout gains position and becomes a polite
status at drag-end/key-release (A8).

## D79 — M14 terminology: user words on default surfaces, craft terms kept, truth preserved (2026-07-23)

**Decision:** the map in `ui-spec.md` §4 binds IMPL-05: implementation
words leave default surfaces ("Order preset" → "Processing order" with
an honest trade-off helper; "Full RGB" → "Unlimited colours (no
threads)"; "Every permitted thread" → "No limit"); craft terms of art
stay (dither method names — evidence-bearing per D62; "Serpentine"
with a plain helper); D72's truthful-label rule is untouched (backend
names surface only in dev). Copy fixes ride the map: "shown" →
"matching" (A10), the transient count sentence names the rebuild not a
missing image (A11), capture labels pass an allow-list human-shape
test (A7), placeholders that duplicate labels are dropped (A20).
UK English; sentence case; visible label = accessible name throughout.

## D80 — M14-SPEC-02 token architecture: one CSS file is the truth, and the gate reads it (2026-07-23)

**Decision:** `src/ui/styles/tokens.css` lands as the single source of
truth — no JSON/generator indirection — with the two token systems
(project capture-region set; carbon-convention spacing/type/layer/
state/focus/motion under `--csl-`) in documented sections, both
schemes, unconsumed until IMPL-01 (zero visual change verified: no
import exists and the built bundle carries no `csl-`). The contrast
contract is machine-readable in the file itself: `@pair fg on bg
[large|nontext]` lines checked by `scripts/check-contrast.mjs`
(new gate step `check:contrast`, dependency-free, exits 1 on failure)
at 7:1 / 4.5:1 / 3:1 in both schemes — 17 pairs × 2 schemes all pass;
`@exempt token reason` lines are printed decisions (disabled opacity,
decorative border, the content-adjacent capture double-ring).

**AAA adaptations recorded** (Carbon = baseline, not ceiling): helper
text shares the secondary colour (Carbon helper greys ~5:1); control
borders bind to border-strong (≥3:1; Carbon subtle is decorative
here); focus stays 3 px `currentColor` (18.1/16.45:1) over Carbon's
focus blue. Status colour tokens: deliberately none — status is words
in live regions; the file says where one would start.

**Alternative rejected:** a JS/JSON token source generating the CSS —
a build step and a second artefact for zero current consumers; the
annotation contract keeps one file honest instead.

**Link:** `ui-spec.md` §9 (pair table, inventory mapping, scales);
`DEV-INFRASTRUCTURE.md` gate table row.

## D81 — M14-IMPL-01 stylesheet structure: tokens → base → shell, and an 8-line critical block (2026-07-23)

**Decision:** the dev shell extracts into three Vite-imported sheets —
`tokens.css` (SPEC-02), `base.css` (element layer), `shell.css`
(layout/chrome) — imported from `main.ts` in cascade order; deeper
splits (per-panel files) wait until a panel owns enough CSS to earn
one. `index.html` keeps an 8-line critical block whose only job is
pre-bundle dark-scheme paint (the DOM is bundle-built, so nothing
else can flash); reason recorded in the block itself. Carbon
productive adoption in the same move: body-01 base, heading-04 h1
(A16), settings column as a layer-01 surface with field-02-style
inputs, decorative rules on border-subtle, hover/active state fills,
spacing tokens throughout. M6 why-comments ported verbatim with their
rules; reduced-motion handling moved wholly to the token layer.
Structural invariants restated as greps in `tests/ui-styles.test.ts`
([hidden]!important, no CSS order, dev-shell absence, import order).
Evidence + matrix in `docs/ui-evidence.md`; engine surfaces untouched
(ui-baseline tripwire green).

**Alternative rejected:** CSS modules / per-component sheets now —
premature while IMPL-02/03 will still move rules between surfaces.

## D82 — M14-IMPL-02: anatomy in the builders, dialogs in project code, prevention announced (2026-07-23)

**Decision:** control anatomy landed at the builder layer so one
implementation serves every consumer: helper/error linkage via
`aria-describedby` in `controls.ts`; the snap-back number field now
announces its correction in a linked `role="status"` message rather
than silently rewriting input (prevention stays, silence goes).
Checkboxes are Carbon-drawn with the pseudo-element hit extension to
44 px (the toggle's house pattern, A1) and per-thread accessible
names (A2); a generic `summary` target rule closes A3b.
`window.prompt`/`confirm` are replaced by `src/ui/modal.ts` — Carbon
modal anatomy with focus trap, Escape/backdrop cancel, focus
restoration, danger default on Cancel (A6) — tested in jsdom
(`tests/modal.test.ts` — pure halves). Dither carries its disabled reason locally
(A9); preview host and crop overlay take operable roles with linked
instructions (A15); info rows carry hex visibly (A14 — two test
assertions updated to the intended labels, stated).

**Adaptations recorded:** the error red (`--csl-support-error`,
paired non-text ≥ 3:1 both schemes) marks edges only; error/correction
message text stays `text-primary` because Carbon's error-text red
misses the 7:1 AAA bar. `aria-invalid` flags the correction moment
only — the field never persists invalid by design. Also fixed in
passing: inverse-filled buttons (pressed/modal-primary) keep their
fill under hover/active — IMPL-01's generic hover would have put
inverse text on a light ground.

**Link:** evidence in `docs/ui-evidence.md`; spec rows `ui-spec.md`
§5 anatomy baseline.

## D83 — M14-IMPL-03: five sections, one reveal per depth, and the numbers that motivated them (2026-07-23)

**Decision:** the spec architecture (D76/D77) is implemented as a
project-coded Carbon accordion (`src/ui/accordion.ts`) whose headers
are the page's h2 structure — real `<h2>` wrapping the toggle button,
panels leaving layout and the tab order via `hidden`, closed headers
carrying state summaries derived from owned state. Native `<details>`
was rejected for sections only because `summary` cannot be a heading;
it *is* the mechanism for every inline depth reveal (thread library,
grid/dither details, per-exporter options — the debug-panel
precedent). Disclosure state persists per id in the preferences store
with spec defaults for unknown ids. Legends dropped where a fieldset
is its section's only child (Export/Project/Advanced) — the header
already names it.

**Measured effect:** default page 14,495 → 3,877 px; settings tab
stops ~130 → 11; Export reach 2, thread depth 2, grid depth 3 — all
inside the D76 contract. Verification instrument note recorded:
Chromium hides closed `<details>` via `content-visibility`, so rect/
offsetParent sweeps false-positive — focus-probing is the honest
measure (bound into VERIFY-01's method).

**Also decided:** coarse Project save-state summary ("not saved this
session" / "saved …") over live dirty-diffing — a real dirty tracker
means serialising the 489-thread snapshot per refresh or new state
machinery; rejected as outside the milestone's UI-only remit. One
boot defect found and fixed in-task (construction-order TDZ:
applyPolicy → refreshSections before assembly; guarded, boots clean).

**Link:** evidence table in `docs/ui-evidence.md`; spec `ui-spec.md`
§1/§2/§5.

## D84 — M14-IMPL-04: inline first-run, a drawn sample, and no tour (2026-07-23)

**Decision:** the first-run layer is inline affordances only — an
entry state (title, Choose an image / Capture your screen as filled
primaries, Try a sample, capture-expectation line, routes line) that
compacts to a one-line source row after the first conversion. A
modal tour/overlay walkthrough is **rejected on record**: it traps
(user control & freedom), it ages with every UI change, and it
violates minimalist design — the surfaces must explain themselves.

**Sample design:** `src/ui/sample.ts` draws a deterministic 256²
test-card (hue sweep × lightness ramp / greyscale band / eight flat
swatches) chosen so reduction, dithering, neutral mapping and stats
each have something visible to do; no asset, no dependency, no
randomness; it feeds the normal source path and is labelled a sample
in status and the source row.

**Also closed here:** A8 — the crop readout is a polite status with
size *and position*, updated at end-events (never per pointer-move,
so no SR flooding); A7 — `displayLabel` is allow-list shaped (word
structure required; token-shaped labels fall back to "the shared
screen"); thread-list filtered-out state distinguishes an empty
search from an empty brand set; processing order carries its
consequence helper (wording from the D79 map).

**Link:** evidence + empty-state matrix in `docs/ui-evidence.md`;
spec `ui-spec.md` §3.

## D85 — M14-IMPL-05: the map applied; derived strings follow; one core sentence deferred on record (2026-07-23)

**Decision:** the D79 terminology map is applied verbatim (inventory
in `docs/ui-evidence.md`), with one extension the map implied but did
not list: strings *derived from* the renamed concepts follow them —
the count summary's "Full RGB — no thread palette." and the compact
status's "Full RGB" fallback both read "Unlimited colours" now, so
one concept keeps one name across surfaces (Nielsen consistency).
Select *values* and the project-file schema are untouched
(`resize-first`, `rgb` et al. remain the stored identifiers).

**Deferred on record:** the conflict sentence "…or switch to full-RGB
mode" is produced in `src/core/palette-policy.ts`. It stays honest,
and editing core strings inside the UI-only milestone trades churn
for consistency — ACCEPT-01 rules on it; if approved it is a
one-line follow-up.

**Test policy:** three assertions updated with the copy they assert
(count summary ×2, status fallback) — stated, intended, behaviour
identical.

**Link:** inventory table `docs/ui-evidence.md`; map D79.

## D86 — M14-VERIFY-01: conformance re-proven; three waivers stand as the review's input (2026-07-23)

**Decision:** the audit protocol re-run on final code closes 19 of 22
findings with evidence and waives three on record (`ui-evidence.md`
ledger): A16 partially — the spec's Fit-options menu is deferred
(five passing text buttons vs one menu is taste, ACCEPT-01's call;
spec §5 amended); A17 FIT_MARGIN (canvas furniture, wish-listed);
A18 status staleness bound (M13 remainder). Machine sweeps on final
code: zero dangling ARIA references cold and fully-open; 176
focusables with zero sub-44 targets under the focus-probe method;
rendered contrast probes 8.86–16.45:1; matrix cells green (320/
collapsed/focus). Fixed in-pass per the ticket's remit: the last two
unnamed landmarks (Preview/Source sections). The 14 gate items are
answered consolidated — every surface changed, so per-surface
repetition would say the same things eight times.

**Method bound forward:** focus-probing is the target/tab instrument
of record (Chromium's content-visibility keeps layout boxes in closed
details); reduced motion is verified at the token layer. Proposed,
not added: an automated a11y checker dev-dependency (axe-core class)
for the maintainer to approve or decline.

**Link:** conformance section + ledger in `docs/ui-evidence.md`.

## D87 — M14-VERIFY-02: the journeys hold, the bytes hold, the milestone's agent half is done (2026-07-23)

**Decision:** the five journeys re-walked on final code close the
loop the audits opened: 1 interaction to a converted preview with
every route named (sample 988 ms); capture met with expectations and
a position-bearing crop status; both conflict severities followed
out; exports and save at reach 2 with the honesty line in place. The
D76 reach contract measures within bounds tier-wide; no inventory
control was lost. Byte-identity attested: three PNGs sha-identical to
the audit baselines; the PDF's content streams identical including
the 17.7 MB print raster (residual = date strings + their
deflate/xref ripple, per the audit rule); the saved project clean
field-wise with two explained fields (exempt viewport scale; an inert
`count.n` behind `mode:'all'` — walk-order history, pixels identical);
node tripwire green in every close; bench green; engine dirs
diff-clean across the milestone.

**Open for ACCEPT-01, on record:** the owner OS-picker rehearsal;
the Fit-menu waiver (D86); the core conflict-sentence wording (D85);
autosave as a future backlog decision (D75); the axe-core dev-dep
proposal (D86).

**Link:** journey tables + attestation in `docs/ui-evidence.md`;
M14 backlog now holds only M14-ACCEPT-01 [maintainer].

## D88 — M14 extension: the owner's UI feedback triaged — four new tasks, six already delivered, three calls settled (2026-07-23)

**Decision:** the owner's UI feedback (written against the pre-M14
build, confirmed) triages into four agreed extension tasks now gating
ACCEPT-01 — M14-EXT-01 top-bar consolidation (title, quiet build id,
dev-only diagnostics cluster with a new log-download affordance,
Source, both shell controls), M14-EXT-02 source chooser modal
(returning-user switcher; cold-start entry state preserved),
M14-EXT-03 view-controls disclosure (open first-run, persisted;
retires the A16 waiver), M14-EXT-04 "Design width/height" rename.

**Already delivered by M14, listed for re-check at the end review:**
preview-first placement; colour mode ordered above the in-use counts;
collapsible colour settings (Design section + thread reveal);
collapsible palette contents (disclosure, library-source-only, A5);
collapsible dimensions (Design section); the suggested hierarchy
(five sections with summaries ≈ the requested four plus Project).

**Owner calls recorded:** Hide settings and Preview focus stay two
controls, both in the bar (distinct functions — persisted layout
preference vs session mode; a merged control would cycle three
states); "Design width/height" over "Canvas…" (fabric/M12 and
preview-surface collisions) and over "Pattern canvas…" (label length);
capture surfaces stay below the preview — the modal is a chooser,
never the session home. Build-id-in-chrome reverses A13's placement
on the owner's authority, recorded here.

**Link:** backlog → M14 "Extension — owner feedback triage"; tickets
`M14-EXT-01/02.md`; ACCEPT-01 now [blocked: EXT-01..04].

## D89 — M14-EXT shipped: the bar, the chooser, the fold, the name (2026-07-23)

**Decision:** the four D88 extension tasks landed as one coherent
change set (EXT-01+02 share the header rebuild; EXT-03/04 rode the
same verification pass). Outcomes: one app bar carrying title, quiet
build id, Source, both shell modes and the dev-only diagnostics
cluster — including the new Download log affordance, which saves the
same redacted bundle as the copy path through the app's one download
route (never the raw ring buffer); a Carbon choice modal
(`choicesModal` joins `modal.ts`) as the returning user's source
switcher, with the cold-start entry state and the below-preview
capture surfaces untouched by construction; view controls behind a
persisted disclosure open on first run — which supersedes the D86
A16 waiver outright; and "Design width/height" via the SCALE_LABELS
single source of truth (legend "Size"; stored values and schema
untouched).

**Verification:** live walk on cleared storage (bar order/wrap at
320 px, modal flows incl. the sample route end-to-end, fold
persistence across reload, focus-mode hiding with a settled-viewport
no-scroll re-measure, rename sweep); `check` green (938 tests,
19×2 contrast pairs); engine dirs diff-clean; ui-baseline tripwire
green. The compact source row and its `sourceNote` element were
removed rather than left dead.

**Link:** `ui-evidence.md` extension section; `ui-spec.md` §5
amendments; triage rationale in D88. ACCEPT-01 is now unblocked —
the milestone's one remaining item.

## D90 — M14-EXT-05: the polish pass — nine findings, nine fixes, one lesson (2026-07-23)

**Decision:** the owner's second look was answered with a self-review
of the running app rather than a defence of the shipped one: nine
findings (cold-surface duplication ×3, view-controls double chrome,
ragged bar and entry wrapping, a raw file input, the always-on
colours table, chevron overlap), all fixed in one pass
(`ui-evidence.md` table). Notables: the Source button now composes
shell × source state in applyShell (one visibility writer — the
shell rule held); the expectation sentence lives in exactly one
place as a linked helper (the modal choice slot was added for it);
the entry actions and modal choices share one `.action-stack`
pattern; the colours table joined the persisted-disclosure system
(`colours-table`, open by default) with its caption visually hidden
so the name isn't said twice.

**Lesson recorded:** EXT-01..04 landed feature-complete but
composition-blind — each new affordance was verified alone, not
against what already occupied the surface (the Source button next to
an entry state offering the same actions). "No duplicate affordance
on any surface" joins the review checklist for UI work; ACCEPT-01
judges the result.

**Link:** ticket M14-EXT-05 (deleted on ship); evidence table in
`docs/ui-evidence.md`; ACCEPT-01 unblocked again.

<!-- FILE: pm_skills/project/archive/decision-log-2026-08-04-to-2026-08-05.md -->

# Decision log archive — 2026-08-04 → 2026-08-05 (D91–D105)

<!-- Archived verbatim from decision-log.md on 2026-08-07 (prune pass, D120).
     Append-only history; do not edit. Cold tier: grep + line-range only. -->

## D91 — M14 third look: the voice memo triaged — eleven tasks, two icebox promotions (2026-08-04)

**Decision:** the owner's third look (a voice memo, transcribed and
repaired 2026-08-04) triages into eleven extension tasks that gate
ACCEPT-01 again — M14-EXT-06 settings appear with the source, EXT-07
the sample affordance retired, EXT-08 always-auto-fit with Fit
width/height removed, EXT-09 sticky preview, EXT-10 click-to-engage
panning, EXT-11 view controls collapsed/discreet and home to the
grid toggles, EXT-12 capture region to the top, EXT-13 colour limit
as a slider defaulting to eight, EXT-14 "Colours by usage" collapsed
— plus two [sign-off] proposal tasks where the memo asked for
elegance rather than naming a shape: EXT-15 capture-region aspect
handling and EXT-16 Design-size rework (the dictation trailed off on
its destination).

**Routed out of the milestone:** tonal light↔dark transform sliders
and colour-provenance visualization change or extend engine/worker
outputs, which M14 forbids (UI-only, byte-identical) — promoted to
the Icebox as ICE-ADJUST-01 (absorbing the wish-list "Image
adjustments panel" line; the `adjust` stage exists from M1) and
ICE-PROVENANCE-01. Parked deliberately, not dropped.

**Supersessions on the owner's own authority:** capture surfaces
below the preview (D88) → the region section surfaces first and open
when capture is the source (EXT-12); the view-controls fold open on
first run (D89) → collapsed and quieter (EXT-11); the colours table
open by default (D90) → collapsed (EXT-14); the sample route built
by D84 and kept through D88's modal → retired everywhere
user-reachable (EXT-07); M7's default colour policy all/n=20 (D55) →
a default limit of eight (EXT-13). The D86 A16 fit-menu waiver is
settled rather than re-waived: under always-auto-fit the
width/height variants go (EXT-08). M6-CAPRES-01's always-on aspect
lock (D52) is reopened, not reversed — EXT-15 proposes options
first.

**Assumptions flagged for the end review:** the Source modal's "Try
a sample" entry goes with the entry button (same affordance; the
memo named only the button); plain Fit survives as the manual reset
after zoom (only the width/height variants were named); Zoom in/out
and Compare stay per the memo. EXT-06 must keep a project-open route
on the cold surface — hiding the sections must not orphan Load.

**Link:** backlog → M14 "Extension — third-look triage (D91)";
tickets `M14-EXT-10/13/15/16.md`; ACCEPT-01 re-blocked on
EXT-06..16.

## D92 — M14 third look, second pass: the critique applied — one viewport arc, one sign-off, the sample lives in the modal (2026-08-04)

**Decision:** the owner accepted the design critique of the D91
triage in full (2026-08-04) and the extension set is revised
accordingly. Structural changes: EXT-08..11 are one **viewport arc**
landing as a set with a dedicated composition verify, M14-EXT-18 —
the D90 lesson applied in advance rather than learned again; EXT-16
merges into EXT-15 as one "Size, region & aspect" sign-off (the
memo's trailed-off sentence and the aspect options are the same
design decision; the EXT-16 id is retired, never reused); M14-EXT-17
(thread highlight) joins from the re-scoped ICE-PROVENANCE-01 — the
per-stitch index sidecar already reaches the UI (M7-BRAND-01), so
highlighting a thread's stitches is a Compare-class preview
decoration, not an engine change; the icebox item keeps only the
tonal-position half.

**Forks decided (owner-accepted recommendations):** a permanent
quiet **view strip** replaces the collapsed-fold shape — D91's
EXT-11 would have demoted E-tier zoom to reach 2, breaking the §1
contract; the strip keeps every view control at reach 1 and retires
the D89 fold. **Focus-unified panning** — pan engagement *is*
canvas-host focus; no second mode machinery beside it.
**The sample survives in the Source modal** — the entry button goes
(the memo's literal ask) but the one zero-permission demo route
stays; supersedes D91's remove-everywhere assumption.
**Colour-limit anatomy** — a "Limit colours" toggle (default on) +
slider with paired number input; "exactly" demotes to depth; a
No-limit end-stop would conflate mode and count. **Fit resolves as
Reset view** — under auto-fit the resting state is fitted, so the
surviving button's job is returning to it; Fit, Fit width and Fit
height all retire and the D86 A16 waiver closes with them.

**Constraints bound into the tasks:** the docked preview carries a
capped height under 60 rem plus scroll-margin clearance so no
focused control sits beneath it (UI-STANDARDS focus non-obscuration;
the 320 px companion posture is the budget); EXT-17 re-proves export
byte-identity on ship, so the decoration reading is enforced rather
than assumed; EXT-06 lands as a shell-model state, never a second
hidden layer; EXT-06 adds a quiet "Open a project" entry action so
hiding the sections cannot orphan Load.

**Link:** backlog → M14 "Extension — third-look triage (D91,
revised D92)"; every task carries a ticket (`M14-EXT-06..15.md`,
`M14-EXT-17.md`, `M14-EXT-18.md`; `M14-EXT-16.md` deleted on
merge); ACCEPT-01 blocked on the full set.

## D93 — M14-EXT-06: cold is a shell state, not a hidden layer (2026-08-04)

**Decision:** the cold surface landed as a third field on the one
shell model — `cold` in `ShellState`, overriding both presentation
preferences in `visibility()` — never a second `hidden` layer. The
entry state's visibility write moved into `applyShell` (the D90
one-writer rule now covers the whole cold composition), and the five
source routes plus project open exit cold one-way for the session.
The entry gained the quiet "Open a project" action (D92 constraint:
Load must not orphan), wired to the panel's own hidden project input.

**Assumptions at the skipped gates:** dev-only chrome (diagnostics
cluster, profiling panel) is exempt from "entry only" — it is not
product surface, and a cold boot error is precisely when Copy
diagnostics earns its keep. Source-bearing exits announce "Design
ready — settings are on the right/below" (layout-aware via
`matchMedia`, the 60 rem breakpoint); the project route exits quietly
because its own status line already directs ("import an image to see
it applied"). Focus rescue for an entry action that hides under the
user's finger goes to the bar's Source button — chooser hands to
chooser. A denied capture permission keeps the page cold: the route
never completed, nothing exists to configure.

**Found and fixed in verification:** `applyShell` had never written
`focusToggle.hidden` (the toggle predates cold and was always
visible); cold showed a Preview-focus button for a preview that
cannot exist. Composed from the model as `!panelToggle && !focusExit`
— true exactly when no mode control is meaningful — rather than a new
visibility field.

**Link:** ticket M14-EXT-06 (deleted on ship); ui-spec §3 amendment;
evidence in `docs/ui-evidence.md`; shell tests extended to 18
(cold-override sweep, exit-onto-preference, no-persistence guard).

## D94 — M14-EXT-07: the sample keeps one door (2026-08-04)

**Decision:** the entry state's "Try a sample" is removed — the
memo's literal ask — and the Source modal keeps the sample as the one
zero-permission demo route (the D92 fork, superseding D91's
remove-everywhere assumption). Entry stack is now Choose an image /
Capture your screen / Open a project. `loadSample()` and the sample
buffer stay: the modal calls them, tests and bench rely on the
deterministic buffer.

**Consequence accepted:** with the Source button hidden cold (D90
composition) and the entry sample gone, the cold surface has no
sample route at all — a first-run novice must bring a source or open
a project before the demo becomes reachable at all. That is the
owner's stated preference; ACCEPT-01 judges it, and the ticket noted
reversal is one modal choice away.

**Link:** ticket M14-EXT-07 (deleted on ship); ui-spec §3 amendment +
§5 row (sample now reach 2, modal only); evidence in
`docs/ui-evidence.md`.

## D95 — M14-EXT-08..11: the viewport arc — fitting stops being the user's job (2026-08-04)

**Decision:** the four legs landed as one set, per the D92 revision.
**Auto-fit (EXT-08):** the existing mode machine tightened to two
states — 'space' (auto, the default; refits on source change, host
resize, dock transitions) and 'manual' (any deliberate zoom or pan;
left by Reset view, `0`, or a source replacement). Fit width/height
retired with their buttons; **Reset view** is the one surviving fit
control, closing the D86 A16 waiver. A loaded project opens in auto
regardless of its stored preview scale — predictability over
restoration; the schema field still round-trips in core, it just no
longer drives the opening view. **Docked preview (EXT-09):** the
preview unit (strip · canvas · compact status) is `position: sticky`
in both layouts; at the companion width, scrolling past its natural
position caps the canvas to 40dvh via a scroll-threshold class.
The info panel moved out of the preview section to the content flow —
it scrolls, the picture doesn't. **Focus-unified panning (EXT-10):**
pan engagement *is* host focus — unfocused wheel/drag belong to the
page, the wheel-zoom handler was deleted outright, Escape blurs and
is consumed so preview-focus exits on the next press. The host shows
its ring on `:focus` (not `:focus-visible`): the ring is the engaged
state the memo described, so pointer engagement must show it too.
**View strip (EXT-11):** the D89 fold retired for a permanent quiet
row of ghost text buttons — Zoom out · Zoom in · Reset view ·
Compare · Grid · Numbers + readouts — tighter padding than panel
buttons but the same 44 px minimum targets; the grid pair moved from
Appearance switches to strip toggle buttons, and the Appearance
summary re-derives from what remains (dither state only).

**Found live and fixed:** (1) an IntersectionObserver dock trigger
oscillates — docking shrinks the page, which moves the trigger back
into view — and hung the renderer at 375 px; replaced with a
scroll-position threshold against the sentinel's *static* document
offset, which the dock state cannot move. (2) A rAF-gated scroll
handler freezes in a hidden tab with its pending flag wedged; the
work is one comparison, so it is synchronous now. (3) `position:
sticky` released mid-scroll because `.content` ends before the
settings do: at the companion width `.content` becomes
`display: contents` so the sticky containing block is the full
column; at wide the row is `align-items: stretch` for the same
reason. (4) The strip wrapped to 3 rows at 375 px; strip buttons use
spacing-03 padding, restoring the ≤ 2-row budget (88 px measured).

**Link:** tickets M14-EXT-08/09/10/11 (deleted on ship); ui-spec §2
amendment, §5 rows, §6 keyboard model, §4 strip terminology;
composition evidence lands with M14-EXT-18.

## D96 — M14-EXT-18: the composition holds (2026-08-04)

**Decision:** the viewport arc passes as a whole. 188-control
keyboard walks at 320/800/1280 with zero focus-obscuration
violations; the memo's palette scenario proven at 320 × 700 (392 px
of pinned canvas while the colour select holds focus); zero
duplicated affordances; both schemes; reduced motion by construction.
The one deviation from the EXT-11 budget is within its own named
fallback: at 320 px the six strip buttons hold two rows but the
readouts wrap to a third quiet text line — accepted as the ticket's
"inline text under the strip" shape, ACCEPT-01 judges the taste.
J1's fastest zero-permission route now sits behind the Source modal
(D94 consequence) — recorded for the end review rather than
re-litigated here. EXT-17's cross-product and the live SR/trackpad
half are named exclusions, owned by that ship and ACCEPT-01
respectively.

**Link:** ticket M14-EXT-18 (deleted on ship); evidence matrix in
`docs/ui-evidence.md`; §2/§4/§5/§6 amendments confirmed in place.

## D97 — M14-EXT-12: the capture surface moves into the settings (2026-08-04)

**Decision:** during a session the whole capture surface — live
thumb + crop overlay, session controls, position readout, draft
badge — lives in a **Capture region** accordion section mounted at
first position in the settings panel; the source section carries the
cold entry only. Open on first appearance, persisted collapse
thereafter (per-session remount honours the stored choice). The
placement supersedes D88's below-the-preview arrangement on the
owner's own authority (D91), and pays off in both layouts: beside
the preview at wide, first under the docked preview at narrow.
Aspect semantics untouched — EXT-15 owns them.

**Consequences accepted:** the capture surfaces now hide with the
panel (they are settings geography; the preview keeps rendering), and
the wide-layout thumb is panel-width — both routed to ACCEPT-01 as
taste. The capture-start announcement lands after the cold-exit line
and is then overwritten by the first frame's "Preview updated." —
queued for a screen reader, transient visually; accepted.

**Found in verification:** the focus-rescue contains() check ran
after the session buttons were hidden, when focus had already
dropped to body — the flag is now read at the top of `endCaptureUi`,
and the rescue targets the Source button, falling back to the
entry's first action for a stop-before-any-frame session. Stopping
normally keeps the last grabbed frame as the source (existing
behaviour), so the entry does not return and Source is the right
target.

**Link:** ticket M14-EXT-12 (deleted on ship); ui-spec §2/§3
amendment; evidence in `docs/ui-evidence.md`.

## D98 — M14-EXT-13: limit colours by switch and slider; eight is the new default (2026-08-04)

**Decision:** the Colour-limit mode select + number field became a
**"Limit colours" switch (default on) + slider (1–64) with paired
number input (1–512)** — the D92 anatomy: a slider "No limit"
end-stop was rejected as conflating mode and count, and "exactly"
demoted to a depth checkbox beside the thread-library disclosure
("Use exactly this many"), remembered across an off/on cycle. The
fresh-session default is **at most 8 colours** — `defaultPolicy()`
count `{mode:'max', n:8}`, superseding D55's unlimited default on
the owner's authority (D91/D92). Never silent: the collapsed Design
summary reads "… · DMC · 8 colours (limit)" and the count summary
"489 permitted · 8 selected of 8 requested · 8 used in the design."

**Boundaries held:** the v2→v3 project migration keeps its own
inline `all/20` literal — an old file meant "no limit" when saved,
and the migration preserves meaning, not the current taste. Stored
policies (schema v3) are untouched. The one test fixture that read
the ambient default in its no-limit branch now pins `mode:'all'`
explicitly (the ticket's named risk, found in the right direction),
and a new test pins the eight-default deliberately.

**Verified live:** fresh drop resolves 8; slider arrow → 9 resolves
9; typing 100 pegs the slider at 64 and resolves 100; switch off →
unlimited (489, controls hidden); switch on → n and exactness
remembered; exact checkbox flips mode with the same honest
selected-vs-requested strings.

**Tripwire resolution:** the ui-baseline tripwire fired on the
default flip — correctly, but for the wrong reason: it derived its
pinned config from `defaultPolicy()`, so an intended UI-policy
decision read as engine drift. The tripwire now freezes the
audit-time reference policy inline and keeps every committed hash
untouched — engine byte-identity stays proven over the same config
as at audit time, and default changes can no longer masquerade as
engine changes (or vice versa). No hash was refreshed.

**Link:** ticket M14-EXT-13 (deleted on ship); ui-spec §4/§5 rows;
evidence in `docs/ui-evidence.md`.

## D99 — M14-EXT-14: the colours table folds, the fold line informs (2026-08-04)

**Decision:** the colours-by-usage disclosure defaults **closed**
(flipping D90's open default on the memo's ask; the persisted choice
still wins), and the fold line grows a derived readout so the table
still informs collapsed: "Colours by usage — 8 · DMC 310 leads" —
count plus leading thread, derived from owned stats at render
(`usageSummaryLabel`, pure and unit-tested), never scraped from the
DOM. The D90 name-once rule survives: the visually-hidden caption
keeps the table's accessible name; the fold line is the disclosure's
label.

**Tension on record (from the ticket):** the default-8 palette makes
this table the novice's best feedback, and the owner still wants it
folded — the summary carries the load, and EXT-17's highlight gives
the table a reason to open. EXT-17's row selection lands at reach 2
under this default, inside the C-tier contract (§5 row updated).

**Link:** ticket M14-EXT-14 (deleted on ship); evidence in
`docs/ui-evidence.md`.

## D100 — M14-EXT-17: where a thread lives, shown without touching a pixel that ships (2026-08-04)

**Decision:** selecting a thread row in Colours by usage highlights
its stitches on the preview as a **Compare-class decoration**: a new
`highlight` worker message (deliberately not a `PipelineConfig`
field, so processing, exports and project files cannot see it by
construction) sets a palette index on the preview surface, which
dims every non-matching stitch under a uniform scrim (alpha 150) —
matching stitches and fabric stay untouched, because thread colours
are content and absence of scrim IS the highlight. The scrim draws
under Compare, so the source half stays pristine and the two
decorations compose. Selection is keyed by palette index (the
sidecar's vocabulary), owned by the info panel as session state; a
changed entry list (an entries fingerprint in `resolvePalette`)
clears it rather than letting it silently point at a different
thread. Rows carry the A2 per-row anatomy ("Highlight" visible,
"Highlight DMC 310 Black" accessible, `aria-pressed`); reselect and
Escape clear; announcements carry the table's own count.

**Costs accepted:** the router copies the index sidecar to the
surface before the response transfer detaches it — unconditional
(~180 KB at 300², 0.024 ms measured), so a highlight engages
instantly on a static image with no re-run. Full added cost with a
highlight active: 0.796 ms/frame at 300² (copy + mask + draw) —
0.3 % of the 4 fps budget, ~1 % of the banked 57–86 ms baseline
frames (D64–D72), so the ≥ 4 updates/sec promise holds by margin.
The live-pump rate could not be re-measured headless (rAF-frozen
hidden pane); named for the ACCEPT-01 live session.

**Byte-identity enforced, not assumed (D92):** export PNG SHA-256
identical with and without an active highlight on the real export
path; the ui-baseline tripwire stays green; the type system keeps
the highlight out of every processing request shape.

**Link:** ticket M14-EXT-17 (deleted on ship); ICE-PROVENANCE-01
keeps the tonal half; evidence in `docs/ui-evidence.md`; mask
invariants unit-tested (`tests/highlight.test.ts`).

## D101 — M14-EXT-15: the signed shape ships — aspect follows by default, frees on demand (2026-08-05)

**Decision:** the owner signed **A + D + S1** (structured in-session
answer, 2026-08-05; pack in the D91–D100 commit) and the shape is
implemented. An **"Aspect follows design"** toggle joins the capture
session controls — pressed by default, session-only, reset each
session, never project data (schema untouched). Unlocked, every
shape-changing gesture runs the free geometry (`resizeRect`/
`clampRect`) and the gesture end adopts the region's shape as the
design height (`deriveGridHeight` — width stays the user's, stitches
stay square, nothing distorts). Shift-drag frees a pin temporarily
while locked; the keyboard route to a free resize is the toggle
itself, with shift+arrows staying aspect-locked until it is off
(recorded as D's keyboard answer). S1: the Design size fields join
the Capture region section for the session and return to Design on
end — moved, never duplicated, focus preserved across the reparent.

**The independence promise, split as signed:** locked keeps D52
whole (constrainRect the only route; region chooses which pixels,
never how many stitches — existing suites stand). Unlocked is the
one sanctioned crossing: region shape → design height, one
direction, announced in the readout ("(height follows the region)")
while the derived height field disables with the reason in its
helper (A9 adjacency). AGENTS.md's invariant updated to the split;
ui-spec §3/§5/§7 amended. The derive/constrain pair is a proven
fixed point (no feedback loop) in the crop suite.

**Losers recorded:** B (resample) distorts stitches — carried as the
strawman and rejected; C (letterbox) buys freedom at a third concept
(silent blank bands + D9 fabric semantics without source
transparency); S2 invents a compound control; S3 moves size edits to
reach 2 when the complaint was chunkiness, not reach.

**Found in verification:** a region-derived height left a stale
number in the disabled field — `applyPattern` now mirrors both
fields whatever drove the change. Pointer-drag geometry could not be
driven in the headless pane (the capture video never lays out — same
rig class as the frozen pump); the keyboard route proved the full
derive chain, the shift-gesture free/adopt path was demonstrated via
draw, the geometry is unit-tested (52 crop tests incl. the new
locked/unlocked split), and the real drag sits on ACCEPT-01's live
checklist.

**Link:** ticket M14-EXT-15 + `docs/ext15-options.md` +
`docs/ext15-mockups.html` (all deleted on this ship — conclusions
live here); evidence in `docs/ui-evidence.md`; ACCEPT-01 is now
unblocked — the milestone's one remaining item, and it is the
owner's.

## D102 — ACCEPT-01 first pass: six findings routed to fix tasks (2026-08-05)

**Decision:** the owner's first live Photoshop companion run
(2026-08-05, narrow window beside Photoshop 2026, real capture)
produced six findings, routed to M14-FIX-01..06 per ACCEPT-01's own
rule — fix tasks, never silent rework. ACCEPT-01 re-blocks on the
set; the formal pass/fail session follows.

**The findings, ordered as they will run:** FIX-06 first — a
scroll-time oscillation of the preview at companion width during
capture, a defect in my D95 dock/sticky mechanics (prime suspect:
the dock's page-shortening crossing its own scroll threshold near a
short page's bottom — the exact loop class D95 dismissed for tall
pages; a page with everything collapsed is short). Then FIX-01 —
capture region leading the session flow, which collides with the
preview-first §7 invariant and carries a reorder-vs-guidance option
set (the owner explicitly left mechanic latitude); FIX-03 — the
canvas host hugging the fitted design's height instead of a flat
60dvh; FIX-05 — the stats block compressed, dropping the
strip-readout duplication; FIX-04 — a discreet window-width guide
for the narrow posture; FIX-02 — `selfBrowserSurface: 'exclude'` +
window-share copy, with the platform's full-screen limit recorded
("not essential if not viable" is the owner's stated tolerance).

**Also observed in the session artefacts:** the owner shared a
screen containing the app itself (the design stitched the app's own
UI) — the motivating reproduction for FIX-02's copy nudge; and the
shipped extension surfaces (default-8 announced in the Design
summary, the informative colours fold line, the aspect toggle in
the capture section) all visible working in the real posture.

**Link:** backlog → "First-pass review feedback"; tickets
M14-FIX-01/02/03/04/06 (FIX-05 is line-only); owner screenshots in
the session transcript.

## D103 — M14-FIX-06 + FIX-03: nothing in the layout is scroll-linked (2026-08-05)

**Decision:** the two findings are one geometry decision, landed as
one change. The D95 scroll-threshold dock is **deleted** — its class
toggle changed the page height on its own trigger's axis, and scroll
anchoring / bottom clamping fed the change straight back across the
threshold as the docked↔undocked flap the owner filmed. The cure is
categorical, not tuned: no hysteresis, no re-measure — layout height
simply has no scroll input left. The canvas instead **hugs the
fitted design** under auto-fit (`hugHeight`, pure: fit the width,
follow the aspect, clamp to a 10rem floor and a posture cap — 40dvh
stacked, 60dvh wide). Height depends only on host width and design
shape — never on the height it replaces — so the ResizeObserver
settles in one pass; the fixed point is unit-tested, not assumed.
Manual zoom freezes the height where the user left it; Reset view
re-hugs; preview focus fills the window by flex (`!important` over
the inline hug). The D97-era "scroll back restores full height"
behaviour is retired with the mechanism — under hugging there is no
unnecessary height to restore (the FIX-03 ask).

**Verified live (380 × 700):** wide 200×80 design → host 173 px
(derivation exact, was a fixed 489); square design → capped 282 px;
an 8-position scroll sweep holds ONE height with clean sticky
pinning; manual zoom froze 173 through a grid change; Reset re-hugged
to the cap. Nothing in src listens to scroll any more (grep-clean).

**Link:** tickets M14-FIX-06/03 (deleted on ship); ui-spec §2
re-amended (supersedes D95's dock paragraph); evidence in
`docs/ui-evidence.md`; EXT-18's dock legs re-walked under the new
geometry at close of the FIX set.

## D104 — M14-FIX-01: the region leads while it is the task (2026-08-05)

**Decision:** during a capture session the Capture region section
mounts in the content column **above the preview** — the owner's
tweak → lock → collapse → progress flow made literal, superseding
D97's panel-first slot on the first-pass review. Session start hands
focus to the section's own toggle (the user's gesture was "set up a
capture"); collapsing or locking scrolls the preview back into the
lead (instant — reduced-motion by construction). The preview-first
invariant gains exactly one owner-signed session-time exception,
recorded in UI-STANDARDS and ui-spec §2/§7 — a DOM mount, never CSS
`order`, so reading, visual and tab order remain one thing.

**Composition kept honest:** the section now follows the *source*
region's visibility in applyShell (late-bound — the shell applies
before the section exists), so preview focus still strips it; and it
no longer hides with the settings panel — D97's "settings geography"
consequence reverses to content geography, which matches the flow
(collapse the settings, keep region + preview). The wide-layout
thumb gains the content column's width in the bargain.

**Verified live:** mount precedes the preview, open, focus on the
toggle; collapse at scroll 400 → 0; lock at scroll 300 → 0; preview
focus hides / exit restores; panel collapse leaves it visible; stop
unmounts clean.

**Link:** ticket M14-FIX-01 (deleted on ship); UI-STANDARDS layout
rule + ui-spec §2/§7 amendments; evidence in `docs/ui-evidence.md`.

## D105 — M14-FIX-05/04/02: the small three from the first pass (2026-08-05)

**Decision:** the remaining first-pass findings landed as one pass.
**FIX-05:** the stats line drops its dimensions — the strip readout
already says "200 × 200 stitches" a few lines up, and the duplicate
was height the companion posture pays for; the info block's text
margins tighten to spacing-02 and the stacked-layout gap to
spacing-03. Measured at 380 px: canvas-to-source spans 128 px at the
spec default with every fact kept. **FIX-04:** a window-width guide
with zero standing chrome — a debounced (350 ms) line in the
existing status region during a resize burst below 960 px: "Window
380 px wide — works down to 320 px." / "narrower than the supported
320 px floor."; silent at roomy widths; the claim is the supported
floor, not an aesthetic optimum. **FIX-02:** `selfBrowserSurface:
'exclude'` + `surfaceSwitching: 'include'` on the capture request
(the app's own tab leaves its picker on Chromium; unknown members
ignored elsewhere), and the expectation copy now says the honest
thing in both of its homes: "choose the window you draw in — sharing
the whole screen includes this app." The platform limit is on
record: no web API removes a window from a monitor share, so
window-sharing is the 100 % answer — the owner's "not essential if
not viable" tolerance is answered with "partially viable, done".

**Link:** tickets M14-FIX-04/02 (deleted on ship; FIX-05 was
line-only); evidence in `docs/ui-evidence.md`. With these, all six
first-pass findings are closed — ACCEPT-01 unblocks for the formal
pass/fail session.

<!-- FILE: pm_skills/project/archive/decision-log-2026-08-06-to-2026-08-09.md -->

# Decision log archive — 2026-08-06 → 2026-08-09 (D106–D148)

<!-- Archived verbatim from decision-log.md on 2026-08-12 (prune pass, D166).
     M14 looks four to six through the M15 build and the M13/M15 combined
     close: everything before the D149 roadmap reorganisation.
     Append-only history; do not edit. Cold tier: grep + line-range only. -->

## D106 — M14 fourth look: dictated feedback triaged — twelve tasks, one new milestone (2026-08-06)

**Decision:** the owner's fourth look (dictated feedback, transcript
repaired against the live UI labels, 2026-08-06) triages into twelve
extension tasks that gate ACCEPT-01 again, ids in run order —
EXT-19 the capture picker prefers the entire screen
(`displaySurface: 'monitor'`, a hint beside D105's exclusions);
EXT-20 the region↔design coupling recut ("Lock aspect", default off,
drags rederiving **both** dimensions through a visible
source-px-per-stitch scale slider, compact Size fields); EXT-21 a
Stats section pinned above the capture settings (design size, stitch
total, colours in use — the owner excludes coordinates and aspect
state) with the capture-region readout retired; EXT-22 collapsed
folds showing bare headings; EXT-23 a collapsible preview (default
expanded, re-opened by capture); EXT-24 Preview focus retired whole
with its button; EXT-25 [sign-off] the session controls rationalised
with Stop capture moving to the app bar (plausibly a Source-button
state — options-first, the owner picks); EXT-26 a Debug menu over
the diagnostics affordance (copy JSON / download JSON / email-dev
via mailto); EXT-27 engaged-only trackpad pinch-zoom and two-finger
pan; EXT-28 Colour as its own section out of Design; EXT-29 the
colour anatomy recut ("Threadify colours" leading, count
slider+input+steppers, `Use exactly this many` retired, a separate
constrain switch); EXT-30 Appearance renamed "Processing" with the
grid geometry relocated (recommendation: the view strip's grid
reveal, where D92 already homed the toggles).

**Routed out of the milestone:** memo items 14–16 — "Colour profile"
replacing `Colour mode` + `Threads to choose from`, the profile
editor (colour libraries incl. tech colour maps, user collections
with code/hex search and custom RGB, five-image test preview,
advanced min-distance and H/S/B-range constraints), and "Dithering
profiles" with their editor — become **M15**, scoping-first as two
[maintainer] [sign-off] joint sessions (M15-SCOPE-01/02) at the
owner's explicit ask ("needs more scoping work that would benefit
from us both"). Out of M14 by constraint, not preference: profiles
change which colours are available (outputs not byte-identical) and
user libraries add persistence — M14 forbids both. The scope tickets
carry the repaired memo text, the M7 machinery it maps onto (named
palettes, inventory, policy layer), the D55 identity question
non-thread colours raise, and the D53 evidence against a real second
browser window.

**Supersessions on the owner's own authority:** D101's
aspect-follows-by-default and height-only derive → free by default,
both dimensions through one scale (EXT-20; the D52 conduct survives
whole behind "Lock aspect" on). The informative fold lines — the
section summaries and D98's never-silent limit line, D99's
Colours-by-usage lead → bare headings (EXT-22), with the
never-silent duty moving to Stats first (EXT-21 precedes EXT-22 for
exactly this). UI-STANDARDS' "the canvas never does [collapse]" and
the Capture-UX dimensions readout → EXT-23/EXT-21, protected-doc
deltas to ledger at ship. M6-FOCUS-01's Preview focus mode → retired
with its only entry (EXT-24). M14-EXT-10's "no wheel handler — do
not reintroduce it" → reopened for the engaged state only, the
unfocused surface keeping the promise verbatim (EXT-27). D92's
colour-limit anatomy → EXT-29's two-switch recut.

**Assumptions flagged for the pick gates:** "Threadify colours" is
read as the full-RGB↔threads boolean (today's `Colour mode`) with
"Constrain number of colours" as the count switch — the literal
rename-Limit-colours reading is inconsistent but recorded in the
EXT-29 ticket for the owner to rule on; Stats' "resolution" = design
size in stitches; "Colours in use" vs the shipped `Colours by usage`
fold, and the "five test images" against four named presets, resolve
at M15-SCOPE-01; exact-count's fate is named at EXT-29's gate.

**Link:** backlog → M14 "Extension — fourth look (D106)" + "Next —
M15"; tickets M14-EXT-20/21/25/26/27/29/30, M15-SCOPE-01/02;
ACCEPT-01 re-blocked on EXT-19..30.

## D107 — M14-EXT-19..24, 26..30: the fourth-look extension lands in one auto-jazz run (2026-08-06)

**Decision:** eleven of the twelve fourth-look tasks shipped as one
gateless run (auto-jazz, per the owner's "autojazz the backlog"
instruction — conservative picks at every skipped gate, each named
here). EXT-19: `displaySurface: 'monitor'` rides inside the `video`
constraints beside D105's exclusions; D105's choose-a-window
expectation copy deliberately stays (still the honest warning — the
tension is ACCEPT-01's to judge). EXT-20: "Lock aspect" defaults
off; `deriveGridSize` replaces `deriveGridHeight` (both dimensions
through one held source-px-per-stitch scale, fixed-point-proven);
the slider ships as **"Stitch size"** + "Source pixels per stitch"
helper (the unit-in-helper idiom — a bare "scale" label is D52-banned
and "Detail" inverts); both Size fields disable-with-reason while
unlocked (the ticket's pick for the open field-edit question — the
user's handles are region and slider); a mid-session project load
re-seeds the scale from the loaded width, keeping D101's
width-honoured semantics. EXT-21: Stats leads the panel (not the
page — the ticket's recommendation); the info panel's summary line
retired with the region readout (Stats owns every headline figure —
the "no third copy" duty), and gesture-end status announcements keep
A8's keyboard feedback without a standing readout; coordinates die
unmourned. EXT-22: the accordion summary machinery deleted whole,
not emptied — `usageSummaryLabel`, `captureSummary` and the Design/
capture fold lines went with it. EXT-23/24: preview collapse is a
third shell-model field, **session-only** (a working gesture, not a
preference — reopening into a hidden canvas is a bad first second);
preview focus retired whole — `status-line.ts`, the compact status,
the CSS flex chain, and the Escape-exit listener all deleted, none
idled. EXT-26: the Debug menu is a `details` disclosure (the house
pattern); Email the dev downloads the redacted log then opens an
identity-only mailto (redaction boundary unit-tested); the address
ships as an empty placeholder constant — the owner names what a
public bundle exposes. EXT-27: the engaged/unengaged split lives in
a pure `wheelIntent` (the unfocused-inert promise is a regression
test); pinch is exponential (`e^(−Δy/100)`, in/out cancels exactly);
Safari's gesture events covered. EXT-28: Colour defaults closed
(every non-Design section does; Stats carries the count). EXT-29:
reading A shipped — Threadify colours = the mode boolean, Constrain
number of colours = the count switch; exact mode cut from the
surface, kept in core for loaded files (edits write 'max'); steppers
announce via a dedicated polite region because a button press is
natively silent where slider and input are not. EXT-30: destination
A — the grid reveal mounts between strip and canvas; the
`section-appearance` disclosure preference seeds `section-processing`
by fallback, nothing stranded.

**Verified:** typecheck/lint 0, 964 tests (54 crop, 28 viewport, 7
debug-menu; shell/info-panel/scales suites rewritten to the new
contracts — approved behaviour changes, not weakening); live sweep at
1280×720 and 380×700 (evidence table in `docs/ui-evidence.md`):
Stats honest pre- and post-frame, wheel contract exact (192%→522% =
e¹), lockstep count controls, zero horizontal overflow, zero app
console errors. Live capture legs are unit-tested geometry plus
ACCEPT-01's checklist — same rig limitation as D101.

**Supersessions land as triaged (D106):** D101's default-on and
height-only derive; D93/D98/D99's informative fold lines; M6-FOCUS-01
whole; M14-EXT-10's no-wheel rule for the engaged state only;
UI-STANDARDS' capture readout and never-collapsing canvas plus
AGENTS' four-resolutions split text → ledgered in `doc-deltas.md`,
never auto-edited.

**Link:** backlog → EXT-25 is the set's one survivor ([sign-off] —
options prepared in its ticket, the pick is the owner's); ACCEPT-01
re-blocks on it alone; tickets M14-EXT-20/21/26/27/29/30 deleted on
ship; ui-spec §2/§3/§5/§6/§7 amended; evidence in
`docs/ui-evidence.md`.

## D108 — M14-EXT-25: the Source button carries the session (2026-08-06)

**Decision:** the owner picked **option A** at the sign-off gate
(structured in-session answer, 2026-08-06; the pack is preserved in
this entry's losers). During a capture session the bar's Source
button reads **"Capturing — Source"** (label = accessible name, so
the state is announced to whoever reads the control) and its modal
leads with a session block — **Stop capture** (primary while
capturing) · **Pause/Resume capture** (label derived from the pump
state) · **Capture frame** — above the unchanged source choices, so
switching source never hides behind the same click that stops.
Inline, the session row reduces to the two region toggles that pair
naturally: **Lock region** beside **Lock aspect**. Nothing is cut:
pause and frame-grab demoted to the modal, and the pump-death
recovery copy now points there ("use Capture frame in the Source
menu"). Stop is reach 2 (bar → modal) but reachable from the bar at
all times — the fixed point the backlog demanded. The vestigial
"Start screen capture" button (hidden since the EXT-02 modal took
over) went with the row.

**Losers recorded:** B (a dedicated bar Stop during sessions) kept
the unjustified inline row and paid a fourth bar control at
companion width; C (bar Stop + Capture frame cut) removed a shipped
recovery route — the owner did not name the cut.

**Verified:** typecheck/lint 0, 957 tests; live: the no-session
modal unchanged (three choices, current-source note), the inline row
reduced to the two locks by construction. The in-session modal block
and the label swap ride code paths a headless pane cannot drive
(getDisplayMedia) — named for ACCEPT-01's live session with the
region-drag legs.

**Link:** ticket M14-EXT-25 (deleted on ship — the option pack lives
in its D107/D108 trail); ui-spec §5 amended; ACCEPT-01 is now
unblocked — the milestone's one remaining item, and it is the
owner's.

## D109 — M14 fifth look: refinements on the fourth-look surface triaged — seven tasks (2026-08-06)

**Decision:** the owner's fifth look (ten typed refinements on the
just-shipped fourth-look surface, 2026-08-06) triages into seven
extension tasks that gate ACCEPT-01 again, ids in run order —
EXT-31 the preview gains a real accordion-style header and collapses
from it, the bar toggle retiring with the move (memos 6+2, one task
because the header is the replacement route); EXT-32 the settings
toggle retires and the whole-panel collapse mode with it (memo 3 —
the M6-PANEL-01 sunset, EXT-24's pattern; after 31+32 the shell
model tends to `cold` alone); EXT-33 the capture section recut
(memos 1+4+5: rename to "Capture", every session starts expanded,
and the session controls return from the Source modal to the
section — the Source button reads "Source" always); EXT-34 the
empty-Design fix (memo 8 — diagnosed as EXT-28 plus D101's S1
reparent composing into an open heading over nothing during
sessions; recommendation: retire S1, options in the ticket); EXT-35
grid details as a live-apply form modal from the strip, Numbers
folding into it (memo 7 — bounded to existing GridStyle capability,
tick font size finally surfaced; new rendering capability stays
M11's); EXT-36 the look/feel/ergonomics/intuitiveness polish pass
(memo 9, the EXT-05 method scaled up); EXT-37 the full Carbon
conformance review (memo 10, VERIFY-01's table discipline over
every component class, after EXT-36 so the audit sees the final
surface).

**Supersessions on the owner's own authority, same day, having seen
them live:** D107's bar Hide/Show preview → the section header
(EXT-31); D108's option A — the Source button carrying the session
and its bar-reachability fixed point → session controls inline in
the Capture section (EXT-33); D107's under-strip grid-reveal
placement and D95's strip Numbers toggle → the modal (EXT-35);
D97's persisted-collapse-at-mount → always-open session start
(EXT-33). EXT-34's recommendation would touch D101's S1 half only —
the lock conduct and derive halves stand.

**Memo repair note:** "capturing source" (memo 4) is matched to the
shipped **"Capturing — Source"** bar-button state — the only surface
by that name — and "move" read as relocating the session affordance
whole; the narrower label-only reading is recorded in the EXT-33
ticket for the gate.

**Link:** backlog → M14 "Extension — fifth look (D109)"; tickets
M14-EXT-31/33/34/35/36/37 (EXT-32 is line-only); ACCEPT-01
re-blocked on EXT-31..37. Nothing implemented in this triage.

## D110 — M14-EXT-31..37: the fifth look lands in one auto-jazz run (2026-08-07)

**Decision:** all seven fifth-look tasks shipped as one gateless run
(auto-jazz, the owner's "autojazz the backlog until the colour/dither
profile editors" instruction — the run stops exactly at M15-SCOPE-01/
02, which are owner-collaboration by design). Conservative picks at
every skipped gate: EXT-31 — the preview accordion reuses
`createSection` with the settings-section anatomy exactly (outer
section unnamed, the panel is the named region, so "Preview" is said
once); the disclosure joins the persisted store (`preview-section`),
capture-start re-expand persists too; a collapsed heading is not
sticky (class flips on toggle, never scroll — D103 re-proven live).
EXT-32 — `ShellState` reduces to `cold`; the `panelCollapsed`
preference is dropped without a version bump (a bump would discard
disclosure records over a dead field; old records parse, the field
drops on next write — unit-pinned); the recorded consequence: the
16 rem column always stands at wide. EXT-33 — ticket order Stop ·
Pause · Frame · Lock aspect · Lock region; Pause keeps the shipped
label-flip + aria-pressed pair; no primary among source choices
during a session (emphasis would nudge replacing the live source);
the session verbs skip the per-session hidden dance (the section
mount is the visibility gate). EXT-34 — option A as recommended: S1
retired (D101's lock/derive halves stand), only the Stitch size
slider travels with the session. EXT-35 — trigger label "Grid
options" (the Export "… options" idiom; "details" was the retired
`<details>` species); modal field order = old reveal order with the
numbering block appended; Number size bounds 6–32 px; `formModal`
resolves void — Close/Escape/backdrop are one path because live-apply
leaves nothing to cancel. EXT-36 — two fixes (scroll-padding reserve
408→`40dvh + 12rem` against the measured 427 px unit — a real
focus-obscuration risk; the stale two-row strip comment corrected to
measured reality), five checked-no-change, three parks (floor-width
readout line — pre-existing and contract-shaped; logger console
stringification — dev chrome; one unreproducible uncaught-error pair
— ACCEPT-01 watch). EXT-37 — ten-row conformance table, zero
unexplained deviations: D50 text-buttons and AAA-over-AA re-affirmed;
one new waiver (accordion chevron ▸/▾ over Carbon's ▾/▴ — one
disclosure language with native details, D83).

**Supersessions land as triaged (D109):** D107's bar preview toggle →
the header; D108's option A whole (the bar-reachability fixed point
consciously given up — named for ACCEPT-01); D97's persisted capture
collapse → always-open, unpersisted; D101's S1 → retired; D107's
under-strip reveal + D95's strip Numbers → the modal.

**Verified:** typecheck/lint/contrast/build/docs/secrets green; 953
tests serialised (parallel runs tripped 5 s timeouts on heavy engine
suites — rig contention (another session's dev server + synced I/O),
every file green in isolation, no engine code in the diff); live
sweep on this session's own server at 1280 and 380/320 × 700, both
schemes, error-catcher armed: evidence tables in `docs/ui-evidence.md`.
The in-session capture legs ride getDisplayMedia (not driveable in this
rig, D101's limitation) — named for ACCEPT-01's live checklist.

**Link:** backlog → fifth-look section removed, ACCEPT-01 unblocked
(the milestone's one remaining item, the owner's); tickets
M14-EXT-31/33/34/35/36/37 deleted on ship; ui-spec §2/§5/§7/§9
amended; UI-STANDARDS deltas ledgered in `doc-deltas.md`, never
auto-edited.

## D111 — M14 sixth look: five memos on the fifth-look surface triaged — four tasks (2026-08-07)

**Decision:** the owner's sixth look (five typed memos on the
just-shipped fifth-look surface, 2026-08-07) triages into four
extension tasks that gate ACCEPT-01 again, ids in run order —
EXT-38 the capture-row trims (memos 1+2: Capture frame retires —
the cut D108 declined precisely because the owner had not named it
is now named; "Pause capture" renames to Freeze; the pump-death
recovery copy re-points at the freeze toggle, whose resume leg
restarts the pump); EXT-39 the status line relocates under the
header's build id with an economy pass (memo 4 — the off-viewport
announcement trade at narrow recorded, not hidden); EXT-40 Design
dissolves into Capture, Stitch size becomes **Zoom**, Stats gains
the readout row (memo 5 [detail] — the ticket carries the
no-session-home question with the permanent-Capture-section
recommendation, the factor definition with the same-number "3×"
recommendation, and the named collision with the preview's zoom
vocabulary that D52 exists to police); EXT-41 "Colours by usage" →
**"Colours used"** as a real accordion section plus the
one-hierarchy pass (memo 3 [detail] — anatomy promotion as the
floor, aside-box flattening as the recommendation, the two-column
companion layout explicitly not in question; runs last so the
equalisation lands on the final census).

**Supersessions on the owner's own authority, having seen them
live:** D110's EXT-33-restored Capture frame button → cut (EXT-38);
D110's EXT-34/A — Size's permanent Design home, held one day → the
fields' only home is the Capture section (EXT-40); D99's fold-line
placement of the colours table → section anatomy, its
collapsed-by-default choice surviving (EXT-41); the M2-era content
placement of the status region → header (EXT-39).

**Memo repair notes:** "moe" read as "move" (memo 5); "resolution
integer controls" matched to the Design width/height number fields —
the only integer size controls in the live UI; "the 'source
unchanged' dialogue" matched to the one status live region (that
string is its most persistent occupant during capture), so EXT-39
moves the region, not one message.

**Link:** backlog → M14 "Extension — sixth look (D111)"; tickets
M14-EXT-40/41 (38/39 are line-only); ACCEPT-01 re-blocked on
EXT-38..41 and its live-session list extended with the sixth look's
trades. Nothing implemented in this triage.

## D112 — M14 sixth look, second batch: memos 6–8 triaged — three tasks (2026-08-07)

**Decision:** the sixth look's second batch (three typed memos, same
day) triages into EXT-42..44, extending the D111 set; the whole
sixth-look run order is restated in the backlog (38 → 39 → 43 → 40 →
42 → 44 → 41: the dropdown defect runs before the Colour compression
that would churn the same panel; the hierarchy pass stays last).
EXT-42 [detail] — the Colour section's redundancy census (seven
elements for one integer, eight near-identical brand helper lines, a
summary overlapping Stats, six standing library buttons) compresses
with a gate; the steppers cut would reverse the owner's own EXT-29
ask and is flagged as such, and the compression must not foreclose
M15's Colour-profile slot. EXT-43 [detail] — a defect, bug mode:
the "Threads to choose from" popup collapses because
`palettePanel.update()` fires on every processed frame and rebuilds
controls under it (hypothesis; the dither panel — rebuilt only on
algorithm change — surviving is the confirming contrast); fix shape
is diff-update on an option fingerprint, never rebuilding a focused
or open control. EXT-44 [detail] — Processing order retires and the
Advanced section sunsets with it (the EXT-32 pattern).

**The memo-8 question, answered on record:** reduce-first is not
literally redundant (its output differs) but no longer earns UI:
slower by construction (per-pixel work before the resize lever,
D3), stats degrade while active (the sidecar dies under
resize-after-reduce, so no thread references), and its one virtue —
a softer look — is served deliberately by the M8 dither surface.
Loaded-file conduct recommended: honour + say so (core keeps the
preset, the UI states it while active) — the only shape satisfying
both reopen-identical and visible-state; coerce-on-load and
honour-silently each break one hard rule and are rejected in the
ticket.

**Link:** backlog → sixth-look section extended to EXT-38..44,
ACCEPT-01 re-blocked on the full range; tickets M14-EXT-42/43/44.
Nothing implemented in this triage.

## D113 — Pruned project memory (2026-08-07)

Decision-log D46–D90 (45 entries, 2026-07-20 → 2026-07-23, 14,341
words, incl. both per-entry-guard offenders D49/D50) moved verbatim to
archive/decision-log-2026-07-20-to-2026-07-23.md. Trajectory phases
M6–M8 moved verbatim to
archive/trajectory/trajectory-0002-2026-07-21-to-2026-07-22.md; live
trajectory keeps M13 + M14 at 1,900 words. Live log is D91–D112 plus
this entry (23 entries) — over the 20-entry budget by agreed exception:
August is the live month, next natural cut at month end. Lossless
splits proven by diff against the intact originals before each swap;
environment preflight clean, OneDrive sync paused for the surgery.
file-map.md untouched on record: its generator maps the source tree
only, so archive/INDEX.md remains the archive's map.

## D114 — M15-SCOPE-01: colour-profile scope signed — recipe model, takeover editor, rules split by meaning (2026-08-07)

**Decision:** the joint scoping session the fourth look asked for
(D106) ran 2026-08-07 and signs the colour-profile scope. A
**profile is a composition recipe, never a flat list**: which colour
libraries are enabled (thread brands; generated colour maps; "My
threads" — the inventory), an "only colours I own" modifier,
per-colour in/out pins, and hue/saturation/brightness **range
rules** — resolved on demand to the effective ordered colour table
with every narrowing explained (the M7 conflicts machinery
extends). Profiles absorb the brand toggles, `ownedOnly` and the
source select whole. The editor is an **in-app takeover view** (a
shell view swap, not a dialog — D53's evidence against real windows
stands), editing a **draft committed by explicit Save** — a
deliberate, recorded exception to §5.4 live-apply, because a saved
profile edit ripples into every design that uses it; the editor's
own test preview does apply live, and frame results never rebuild
editor controls (the EXT-43 contract, pinned by test).

**Owner picks at the gate (all three on the recommendation):**

- **Rules split by meaning.** Exclude dissolves into profile
  membership (a colour is in the recipe or it is not — no second
  exclusion mechanism); lock survives per-design as **Must use**
  chips beside the count; **Prefer retires** (its taste half is
  membership, its steering half a weak lock). Supersedes the
  three-disjoint-rules anatomy (M7's surface, recut in D92/D107)
  at build time; the disjointness invariant survives trivially
  with one rule remaining.
- **Ranges live in the profile; minimum distance lives with the
  design.** A style profile wants to be rule-based ("Rave" over
  whatever libraries are on, recomposing when brands change), so
  H/S/B two-pole ranges are recipe content. Minimum perceptual
  distance is a rule about the *chosen few*, not membership — it
  sits beside count in the Colour section and extends
  palette-selection as a pure rule.
- **The (edited)-copy pattern** reconciles profile-side membership
  with per-design reachability: the project file's policy half
  becomes the design's own recipe copy plus an `{id, revision}`
  link to a named profile; edits from design context land on the
  copy — the select shows "(edited)", actions Update profile /
  Save as new / Revert — so a one-off "kill that green" never
  mutates the shared library and never forces fork clutter. This
  extends D55's policy+snapshot pair, not forks it.

**Identity and data:** synthetic namespaces `map:<mapId>:<code>`
and `user:<id>` for non-thread colours — Thread-shaped records,
never merged with real threads (D55/D56 upheld), provenance-honest
labels everywhere including export keys (a chart row with nothing
to buy says so). Maps v1, all generated in code, no data files:
black & white (2), greys (4), 1-bit RGB (8), retro 16,
2-bit/channel (64), web-safe (216); 4-bit/channel (4,096)
deliberately skipped. A ~150-entry CSS/X11 colour-name table
embeds as a code constant (public-standard data, no dependency,
not an owner-protected file): exact matches display names,
otherwise hex stands.

**Presets end as a concept.** The four algorithmic LCh presets
retire; shipped taste returns as **read-only built-in profiles**
(duplicate-to-edit): DMC (default), All threads, My threads, Black
& white, Retro 16, Web-safe, and three buildable styles — Sepia,
Pastels, Classic cross stitch. ICE-PRESET-01 is re-scoped to
style-profile curation and carries the placeholder list (Memphis,
Rave, Mondrian, Bauhaus, Art nouveau, Warhol, Monet, cosy pixel
farm — shipped names style-descriptive, never trademarks). Nothing
placeholder ships in the UI: a "coming soon" select entry is a
dead control.

**Test preview:** five slots — four owner-supplied photos under
`public/profile-demo/` (folder created with the feature; per-slot
"image offline" states name the missing file; the owner adds the
files later) plus the generated test card, with the **live design
(last still) as the default view**; the three-row grid renders
every populated slot at equal display size with the stitch grid
divided (÷1/÷4/÷16 — divisor settled at build). Renders go through
the real pipeline, draft-labelled, debounced, and must not starve
a live session.

**The owner's compatibility waiver, scoped:** "backwards
compatibility is irrelevant" (owner, at the constraints gate) is
recorded as: loaders still never crash and the D55 snapshot keeps
any old design rendering byte-identical, but old policy semantics
— preset strict/prefer modes, exact count, the prefer rule —
migrate best-effort or reset **with a visible note**, and no
effort is spent preserving them. Round-trip integrity of the new
schema stays a hard rule.

**Cut line:** v1 intent is the full model + persistence + section
recut + editor (libraries, pins, ranges, readout, custom RGB) +
preview slots/grid; nearest-thread hints and custom-colour naming
wait. Recorded as intent with adaptive licence (owner grant), not
a fence. The dithering-profile editor (M15-SCOPE-02, still
scoping-first) inherits the takeover shell — UI-02 builds it
kind-agnostic.

**Link:** backlog → M15 build tasks M15-CORE-01..03,
M15-PERSIST-01, M15-UI-01..04, M15-ACCEPT-01/02 (SCOPE-01 ships;
its ticket is superseded by tickets CORE-01/CORE-02/UI-03/UI-04);
ICE-PRESET-01 re-scoped; M14-EXT-42's protected slot is UI-01's
landing site.

## D115 — M15 second look: run order inverts, three contract gaps closed, the profile gallery becomes a task (2026-08-07)

**Decision:** an owner-asked second look over the D114 breakdown
lands seven adjustments, all backlog/ticket-level; D114 itself
stands as written. (1) The UI run order inverts to UI-02 → UI-03
→ UI-04 → UI-01: the editor completes first behind a dev-only
entry and the section cutover lands last, atomic and wired to a
finished editor — the drafted order shipped a dead "Edit
profiles…" button and a half-migrated section. (2) SCOPE-02
ideally runs before UI-02 so the kind-agnostic shell is designed
against both known kinds (dither scoping already in progress in a
parallel session); failing that, UI-02 builds colour-first and
generalises at the dither build. (3) `ownedOnly` binds to
thread-library content only — `map:` and `user:` entries are not
ownable, and without the carve-out a profile with a map and
owned-only enabled empties silently (CORE-02 contract). (4)
Existing saved palettes convert 1:1 into explicit-membership
profiles, order preserved — the D114 waiver covers semantics,
never library data (PERSIST-01). (5) Custom `user:` colours
persist in the global My-colours library, available to every
profile, not trapped in the one that pinned them (PERSIST-01 /
UI-03). (6) "Classic cross stitch" ships as an initial, honest
agent-chosen subset, not a placeholder — the no-placeholder rule
applies to built-ins too (CORE-02). (7) M14-EXT-42's ticket now
names what M15-UI-01 deletes wholesale (brand helper lines,
library buttons), capping compression there at cheap wins.
M15-UI-01 additionally gains the Must-use search-to-add affordance
and non-thread Colours-used rendering in its acceptance.

**The gallery:** the owner upgrades the curation ask — "lots of
useful and interesting profiles from across culture and nature" —
so ICE-PRESET-01 is absorbed into **M15-GALLERY-01** [sign-off]
[blocked: M15-CORE-02]: agent-drafted candidate batches (6–10 a
batch, rule- or membership-based, test-image evidence), owner-
curated names and membership per batch, style-descriptive naming,
the candidate list living in the ticket and never the select.

**Link:** backlog → M15 reordered, M15-GALLERY-01 added,
ICE-PRESET-01 removed (absorbed); tickets M15-CORE-02, M15-UI-03,
M15-GALLERY-01 (new), M14-EXT-42.

## D116 — M15-SCOPE-02: dithering-profile scope signed — complete configs on the shared shell, colour builds first (2026-08-07)

**Decision:** the dither half of the D106 scoping ask ran 2026-08-07
(a design session in parallel with D114's colour session, landing
before UI-02 starts — the D115 hope) and signs the dithering-profile
scope. A **dithering profile is a complete named `DitherConfig`** —
method, per-family strength, serpentine where the method has a scan
direction — never partial: a profile fully determines the dither
stage, extending M8-CTRL-01's no-hidden-state rule to the profile
layer. The D61 control surface is the whole surface; no new engine
parameters. The seven shipped presets (`DITHER_PRESETS`) become
**read-only built-in profiles** (duplicate-to-edit, evidence basis
lines kept) — D114's "presets end as a concept" extends to dither —
and the never-lying Custom sentinel carries over: an unmatched
configuration renders as an honest unnamed state, never silently
adopted by a profile.

**Editor:** the dither kind mounts in the kind-agnostic takeover
shell (M15-UI-02) with the UI-04 preview rig inherited whole —
last-still default view, photo slots, generated test card,
three-resolution grid, draft-labelled real-pipeline renders,
draft-then-Save (D114's recorded §5.4 exception), the EXT-43
no-rebuild contract. The chooser-editor reading is signed: profile
list + judgement preview + the three-field form; the editor opens
on the design's active profile, and an explicit act (a shell verb
or a per-kind Use — settled at build against the shipped colour
editor) updates the design. The kind contract UI-02/UI-04 build
against: the draft is **opaque to the shell** (each kind supplies
its form and its pipeline stage-override mapping — the rig renders
"the pipeline with a draft-overridden stage", never "a draft colour
recipe"), and a dither preview needs a resolved thread palette —
the design's current palette by default, a **named demonstration
palette when the design is full-RGB** (dithering applies to thread
palettes; the label always names what the preview renders with,
because dither's look depends on palette density).

**Section:** Processing recuts to a "Dithering profile" select plus
an Edit profiles… button — the owner's minimal pick; the Dither
style select and the Dither details reveal retire (the editor
absorbs depth). With no inline tuning, divergence arises only from
load-time unmatched configs and later library edits, both rendered
honestly. Persistence extends D55 the cheap way: the project file
already stores the resolved config (the snapshot half), so
`ditherProfileRef {id, revision}` is additive — old projects attach
a built-in reference on structural match and otherwise stay
unreferenced; no migration beyond the bump. Unlike colour, an
unchanged config through the profile layer changes no engine
output, so byte-identity is assertable at acceptance — the dither
half's risk is persistence, not appearance.

**Owner picks at the gate:** complete profiles; built-ins immutable
with Duplicate; store + snapshot + reference persistence; the
chooser-editor on the shared shell; the minimal section; the
interaction contract and live preview inherited from the colour
editor by name; **colour builds first, dither second** — the
owner's call, reversing the agent's prove-the-shell-on-the-small-
kind recommendation, recorded so UI-02/UI-04 design against both
kinds from this entry rather than generalising later. M8-ACCEPT-01
**folds into the dither acceptance session** (M15-DITH-05 absorbs
its checklist whole; the five methods have shipped since M8 without
complaint, so the visual judgement runs once, on the final profile
surface — agent licence to unfold if that stops making sense). The
v1 cut line is owner-delegated: in — built-ins + user profiles
with duplicate/rename/delete, one judgement preview with content
and scale selection, the palette-context line; deferred — the
side-by-side compare grid; import/export ships only if the
PERSIST-01 pattern provides it generically.

**Link:** backlog → M15 "Dither half (D116)" M15-DITH-01..05
(after the colour half, owner order); tickets M15-DITH-01/02/05;
M15-SCOPE-02 ships (ticket superseded, deleted); M8-ACCEPT-01
absorbed into M15-DITH-05 (icebox line removed); M15-UI-02's
backlog line and M15-UI-04's ticket carry the kind pointer.

## D117 — Combined M15 review: seven seam fixes ahead of development (2026-08-07)

**Decision:** with both halves signed (D114–D116), an owner-asked
combined review checked the joined queue against the code and the
cross-half seams. The halves join cleanly — UI-02/UI-04 design
against both signed kinds, and the feared unnamed legacy state
dissolved in code: the seven dither presets include `none`, so a
no-dither project matches a named built-in at load. Seven seam
fixes land, all backlog/ticket-level. (1) PERSIST-01 is kind-aware
from the start — DITH-01 mounts a second kind on it without
rework; import/export generic or absent (the D116 cut line). (2)
The editor-Save contract is settled on UI-02: Save on the design's
active profile updates the design's copy in the same act; saving
any other profile never touches the design — DITH-02's Use
question inherits the answer. (3) UI-03 extracts the capped browse
table to a shared module rather than borrowing from
`palette-panel.ts`, which UI-01 deletes later in the run order.
(4) DITH-03 carries the shipped full-RGB conduct forward by name —
the profile select disables with "Dithering applies to thread
palettes." (the A9 sentence), never silent inertness. (5) DITH-03
gains a rename gate: Processing → Dithering once the select is the
section's only content is the owner's call — EXT-30 named it
Processing on the owner's own authority, so no silent re-rename.
(6) GALLERY-01 batches are owner-paced and interleave freely with
the dither half — they never block it. (7) M8-GOLD-01 rides
DITH-05's session as an agenda line; the owner is already judging
the five methods there. Explicitly unchanged, so a development
session does not "fix" them: the divergence asymmetry between the
halves (colour's three section verbs vs dither's no inline tuning)
is D116's signed pick, and DITH-01's [blocked: M15-PERSIST-01]
stays formally weaker than the owner's colour-first prose order,
which governs at pick time.

**Link:** backlog M15-PERSIST-01 / M15-UI-02 / M15-DITH-03 /
M15-GALLERY-01 lines + the M8-GOLD-01 icebox line; tickets
M15-UI-03, M15-DITH-05.

## D118 — Doc-sync: ten deltas reconciled across five protected docs (2026-08-07)

**Decision:** the doc-deltas ledger reached its 10-open threshold and
this maintenance session reconciled all ten in one signed batch, each
edit derived fresh from its source entry. UI-STANDARDS (5): the
Capture UX standing dimensions readout retired in favour of Stats +
gesture-end status announcements (D107); the Layout model's "the
canvas never collapses" replaced by the preview's own persisted
accordion header (D107, then D110); "Shell presentation modes" recast
as "Shell presentation state" — cold-only shell model, per-disclosure
persistence, whole-panel collapse and preview focus both retired
(D107/D110). AGENTS (3): the bench-budgets-in-`check` claim corrected
to `npm run bench` (`BENCH=1`, outside the gate — D43/D44); the MVP
scope guard reframed around committed milestones with the M8 dither
expansion named (D61/D62); the four-resolutions split text updated to
the shipped shape — "Lock aspect" defaults off, both dimensions derive
via `deriveGridSize` (D107). brief.md (same delta): the out-of-scope
dithering line tagged as since-shipped (M8). architecture.md (1):
`dither.ts` described as the five-method `DitherConfig` union with
`threshold-tiles.ts` in the tree and the FS-only wasm routing guard
(D61/D62). DEV-INFRASTRUCTURE (1): both `?backend=` URL-override
claims removed — no such wiring exists in `src/` (`setSelectedBackend`
is test/audit-only; the override idea stays on the wish-list). No
delta deferred; all ten ticked in the ledger.

**Link:** `pm_skills/project/doc-deltas.md` (all open lines ticked);
sources D43/D44, D61/D62, D107, D110.

## D119 — Roadmap refactor: backlog Active compressed, detail moved to tickets (2026-08-07)

**Decision:** Active stood at 4,196 words / 43 open items against the
1,500-word budget — verbosity, not structural drift (no done-work, no
stale rounds, tickets 1:1). The repair: milestone preambles compressed
to constraint-plus-pointer form (the shipped-look narration and the
M15 scope summary live in D91–D117, not the queue); four overlong
un-ticketed items gained ticket files carrying their full intent
(M15-PERSIST-01, M15-UI-02, M15-UI-01, M15-DITH-03 — all now
[detail]); the other [detail] lines compressed to the ticket grammar
after verifying each ticket carries the detail — one gap found and
fixed first (M14-ACCEPT-01's ticket lacked the region-drag,
picker-hint, EXT-19-tension and sixth-look-trade session legs; they
were appended before the line compressed). No item added, cut, merged
or reordered; all 43 IDs, flags, dates and dependencies verified
identical before/after. Active lands at 3,705 words. The residual
overrun is accepted and item-count-driven: three scoped milestones in
flight (M13 remainder with live status lines, M14 tail, M15 both
halves) plus an 11-item icebox put the grammar floor near 2,600, and
the two next-up items (EXT-38/39) keep full lines as their own
working spec. Relief is structural — M14's close removes eight items;
revisit then rather than gutting signed scope now.

**Link:** `pm_skills/project/backlog.md` (Active); new tickets
M15-PERSIST-01 / M15-UI-02 / M15-UI-01 / M15-DITH-03; M14-ACCEPT-01
ticket appended.

## D120 — Pruned project memory (2026-08-07)

**Decision:** the maintenance session's prune, all splits
diff-verified lossless before swap. Decision-log D91–D105 (15
entries, the third-look-and-fixes era 2026-08-04 → 2026-08-05) moved
verbatim to archive/decision-log-2026-08-04-to-2026-08-05.md, leaving
D106+ live (15 entries including this one). The trajectory's M13
phase (profiling evidence, 2026-07-22 → 2026-07-23) moved verbatim to
archive/trajectory/trajectory-0003-2026-07-22-to-2026-07-23.md with
the milestone remainder still open in the backlog — the live file
lands at 1,660 words. doc-deltas swept of its 25 ticked lines (the
D60 and D118 sync residue), leaving zero open deltas at 230 words.
INDEX.md carries the two new rows; the file map is untouched by
design (the generator excludes pm_skills/ — INDEX.md is the archive
map). Environment note: the repo lives on a OneDrive-synced path;
preflight found no conflict artefacts before surgery, and the
standing pause-sync advice repeats at session start.

**Link:** archive/INDEX.md; the D118 doc-sync and D119 refactor
entries this session precede it.

## D121 — M14-EXT-38..44: the sixth look lands in one auto-jazz run (2026-08-07)

**Decision:** all seven sixth-look tasks shipped as one gateless run
(auto-jazz, the owner's "autojazz M14 and M15" instruction — this is
the M14 half; M13 deferred to its own session by the same
instruction). Conservative picks at every skipped gate: EXT-38 — the
Freeze label flips (Freeze ↔ Unfreeze) and aria-pressed is dropped (a
flipping label under aria-pressed is the ARIA-APG anti-pattern the
shipped Pause/Resume pair carried; the two lock toggles keep
constant-label + pressed); a dead pump enters the frozen state — same
observable state, honest button — so the documented recovery is the
single Unfreeze press and the copy names it (verified: the resume leg
calls startPumpNow). EXT-39 — the status stacks under the build id in
a `.header-id` block taking the slack width, with a one-line
min-height reserve so announcements never reflow the page; two
economy fixes (the unscoped `.shell-bar` margin rule silently lost
the cascade to the later generic `.toolbar` margins — 24 px of dead
space; the ≤60 rem `flex-basis: 100%` utility rows collapse to one
shared row): header 225 → 165 px at 380. The off-viewport-when-
scrolled-deep trade is recorded for ACCEPT-01. EXT-43 — the D112
hypothesis confirmed exactly (per-frame `update()` rebuilt the source
select under its open popup via replaceChildren; the
algorithm-change-only dither panel was the surviving contrast); fix
is structural fingerprints per region (source/editor/threads/
conflicts) with value-only changes landing in place, selected values
excluded from structure (keyboard arrowing fires change per step),
focused count controls never written, and focus restored by id →
aria-label → summary on structural rebuilds; five pure tests pin
unchanged ⇒ identical fingerprints (vitest env is node, so the
contract pins at the pure level per the house convention — DOM legs
proven live: element identity preserved across source swaps for all
five probed controls). EXT-40 — option A with the section title
unchanged ("Capture" is the owner's own word in the memo; the
still-image naming stretch is recorded for ACCEPT-01, not silently
retitled); zoom factor (i) — the same number as "N×", unit in the
helper; the D52 zoom-vocabulary collision helper-disambiguated and
named, never silently renamed; the Capture section becomes a
standing panel section in Design's old slot, its disclosure seeded
from the retired `section-design` key, force-opened per session —
D110's named unpersisted-disclosure exception dissolves because the
section is no longer session-scoped; `sectionsReady` now flips after
the capture declarations so the first Stats refresh can read the
session state. EXT-42 — cheap wins per the D115 cap: the count
cluster packs (five stacked blocks → three packed rows at 16 rem),
the summary trims to availability alone, brand provenance to marked
exceptions plus one shared group note; the retired panel-state
fields (selectedCount/usedCount/awaitingSource) leave the interface;
the steppers cut is parked (it reverses the owner's own EXT-29 ask)
alongside the library-button re-home (M15-UI-01 deletes those
wholesale). EXT-44 — conduct A, honour + say so: a standing note in
Processing plus a load-status tail; no edit route back; proven
end-to-end through the app's own save → flip → load. EXT-41 —
option B: the fold promotes to a real "Colours used" section (old
`colours-table` key seeds the new id), the settings aside drops its
layer-01 box so every region reads at one level; an empty table
hides the whole section (shell × content composed by one writer);
the "Colours in use"/"Colours used" near-twin is flagged with the
owner's wording standing.

**Supersessions land as triaged (D111/D112):** D110's EXT-33-restored
Capture frame → cut; D110's EXT-34/A permanent Design home → the
standing Capture section is the fields' only home and Design retires;
the M2-era content-column status region → header; D99's fold
placement of the colours table → section anatomy (its
collapsed-by-default choice surviving); EXT-30's Processing-order
seat and the Advanced section → retired whole.

**Verified:** full gate green — typecheck, lint, 955 tests (5 new
fingerprint tests; the scales label and countSummary suites updated
with the approved renames, not weakened), wasm, build, contrast AAA,
docs, secrets. Live sweep on this session's own dev server at
1280 × 800 and 380/320 × 700, both schemes, error catcher armed —
evidence tables in `docs/ui-evidence.md` ("Sixth look"). The
in-session capture legs (freeze toggle live, zoom slider live, the
session mount) ride getDisplayMedia — not driveable in this rig
(D101's limitation) — and are named for ACCEPT-01's live checklist.

**Link:** backlog → sixth-look section removed, ACCEPT-01 unblocked
(again the milestone's one remaining item, the owner's); tickets
M14-EXT-40/41/42/43/44 deleted on ship (38/39 were line-only);
ui-spec §2/§5 amended; ui-evidence extended; AGENTS/UI-STANDARDS
deltas ledgered in `doc-deltas.md`, never auto-edited.

## D122 — M15-CORE-01..03: the colour core lands — sources, resolver, selection recut (2026-08-07)

**Decision:** the three pure-core tasks of the M15 colour half ship
in the continuing auto-jazz run (the owner's "autojazz M14 and M15").
CORE-01 — `src/core/color-sources.ts`: the six generated maps
(2/4/8/16/64/216 entries, deterministic, R-major where computed;
Retro 16 is the HTML4/VGA named set in VGA index order) as
Thread-shaped records under `map:<mapId>:<code>` (`brandId` carries
`map:<mapId>`, so the D55 id grammar holds unchanged); codes are
corner/CSS names where a map defines them, uppercase hex otherwise;
the ~140-entry CSS name table embeds as a constant with alias pairs
collapsed one-per-value (cyan and magenta win; grey spelt UK-style
for display, CSS spellings kept as identity codes); naming is exact
match only — `#00ff00` is "Lime", never a guess. CORE-02 —
`src/core/color-profile.ts`: the recipe (`libraries` incl. `mine`,
`ownedOnly`, include/exclude pins, union-of-bands two-pole H/S/B
ranges with hue wrap), the five-step resolution order pinned by
test with a sentence per narrowing (new ConflictKinds extend the M7
machinery); include wins over ranges (library position kept),
exclude wins over everything (M7-MIX-01 conduct on contradiction);
ownedOnly passes `map:`/`user:` entries through with the D115
sentence; nine built-ins resolve non-empty, "Classic cross stitch"
shipping as a real 25-thread DMC starter (honest, never
placeholder); `policyToRecipe` is the shared PERSIST-01/UI-01
bridge (strict presets and saved palettes become explicit
membership; a prefer-mode preset keeps its open universe and loses
only its retired steering half). CORE-03 — selection keeps count,
gains `minDistance` (ΔE76, squared-compare in the hot loop): every
auto-filled pick clears every seat already chosen, locks are exempt
(a hard promise beats a spacing preference) and guaranteed as the
Must-use seats; the take-everything shortcut is guarded so an
over-generous target still spaces its picks; `distanceLimited`
surfaces as the `distance-limits-count` sentence naming both dials.
The prefer machinery (PREFERENCE_DISCOUNT, preferredUsed) is
deleted from selection.

**Sequencing assumption (stated at the skipped gate):** the live
policy path is not rewired at CORE-02 — `resolvePermitted` keeps its
exact shipped semantics and the panel keeps driving it until the
UI-01 cutover later this run, where the surface and the model swap
together. Same end state as the ticket's cutover note, no interim
behaviour change to a surface UI-01 deletes; `policyToRecipe` exists
from today. Interim honesty note: with prefer removed from
selection, the panel's Prefer role stops steering until UI-01
retires the control — acceptable only because both land in this same
run. `PalettePolicy.minDistance` is optional and unset anywhere
until UI-01, so project files are byte-stable until PERSIST-01 bumps
the schema deliberately.

**Verified:** full suite 1002 green (47 new tests across
color-sources / color-profile / selection); policy, panel and
acceptance-matrix suites untouched and green.

**Link:** backlog → CORE-01..03 removed; tickets M15-CORE-01/02
deleted on ship; file-map roles added.

## D123 — M15-PERSIST-01 (store half) + M15-UI-02/03/04: the profile editor lands behind its dev entry (2026-08-07)

**Decision:** the persistence store and the whole takeover editor
ship in the continuing auto-jazz run. PERSIST-01's store half —
`records.ts` gains the generic, kind-opaque profile file format
(one shape for every kind, payloads bounded and uninterpreted — the
D116 generic-or-absent line honoured) plus the My-colours format;
`store.ts` gains kind-aware profile and user-colour stores
(IndexedDB v3, keyPath `[kind, id]`; a dev-session v2 intermediate
is healed by the idempotent upgrade), with built-in immutability
pinned at the store level (a `builtin:` put rejects — D116) and at
import. **The schema half of PERSIST-01 deliberately rides the
UI-01 cutover** (stated assumption): bumping the project file while
the app still thinks in policy would demand a reverse recipe→policy
adapter — the dual model D117 warns against — so the file format
pivots atomically with the surface, the D115 atomicity principle
applied to persistence. UI-02 — `profile-editor.ts`, the
kind-agnostic takeover shell: view swap over the app layout (header
and the one status region stay; a capture session keeps running
underneath), switcher + New/Duplicate/Rename/Delete, draft-then-Save
with a JSON-snapshot dirty model, discard guarded by a danger modal,
Escape = Back, focus to the view heading on open and back to the
invoker on close; the D117 editor-Save contract is wired in the Save
path (active-profile saves update the design through the host link —
the link itself activates at UI-01, when a design can carry an
active profile); the EXT-43 contract holds **by construction** — the
shell exposes no frame-facing API at all, so no frame can rebuild
it (proven live: element identity across a source replacement and
its frames). UI-03 — `profile-editor-colour.ts` + the extracted
shared `browse-table.ts` (D117 seam 3: the editor never imports
from `palette-panel.ts`, which UI-01 deletes; the old panel keeps
its own copy until then rather than churning a dying file): the
libraries column (8 brands with mapped-only provenance marks, 6
maps with counts, My threads), per-library Browse scoping into the
shared capped table with disjoint Pin in/Pin out row toggles
(M7-MIX-01 conduct), ownedOnly, one two-pole H/S/B rule with
slider + numeric pairs (hue wraps; full-span start), hex-search
custom add into the global My-colours library (D115) pinned as
`user:` identity, and the resulting-colours readout (count +
conflict sentences + capped swatch grid) refreshed on EXT-43-style
fingerprints. UI-04 — `profile-editor-preview.ts`: design-still
default, four photo slots under `public/profile-demo/` with honest
"Image offline — add the file" states (a content-type guard tells
Vite's index.html fallback from a real image), the generated test
card, and the ÷1/÷4/÷16 grid (floor 8); renders run the real
pipeline via the worker export route, debounced 150 ms and
latest-wins, draft-labelled (the M4 rule). Dev-only entry: a
"Profiles (dev)" shell-bar button, dev builds only (D115 — the real
entry ships with UI-01).

**Verified live** (this session's dev server): nine built-ins list
and resolve (DMC 489); duplicate → edit → Save → reload →
IndexedDB round-trip intact (491 with the added map); range rule
narrows live (491 → 198); custom `#00ff88` lands as "Custom —
`#00ff88`" pinned in; offline slot states render with the real path;
grid mode renders 6 cells through the pipeline; editor control
identity preserved across a source drop and its frames; Back with
a dirty draft guards, discard returns to the design with focus and
a status line. 13 new pure tests (browse rows, hex parsing,
fingerprints, grid divisors, the absent-vs-broken slot guard) +
the store/records suite from the same phase; full suite green.

**Link:** backlog → UI-02/03/04 removed, PERSIST-01 annotated
(store half shipped, schema half rides UI-01); tickets
M15-UI-02/03/04 deleted on ship; file-map roles added.

## D124 — M15-UI-01 + PERSIST-01 schema half + ACCEPT-01: the colour half ships whole (2026-08-07)

**Decision:** the atomic cutover lands, completing the M15 colour
half's agent work. Schema v5 (PERSIST-01's deferred half, on the
D115 atomicity principle): the palette block becomes `profileRef` +
the design's `recipe` copy + `design` rules (count, minDistance,
mustUse) + the authoritative snapshot; v4 → v5 migrates under the
D114 waiver — brands policies map straight, library and
strict-preset sources become explicit membership **from the
snapshot** (exactly what rendered; the brands universe when the file
never ran), prefer's steering half retires, locks become Must-use
seats — and `parseProject` reports `migratedFrom` so the load status
carries the visible note; save → load → save is byte-identical at v5
(pinned, incl. a migrated-then-saved file). The default project's
baseline hash re-pinned for the schema change (the recorded
exception the waiver sanctions — pixel and export hashes stayed
green untouched). UI-01: `colour-section.ts` replaces
`palette-panel.ts` (deleted with its suite — its no-rebuild contract
lives on in the editor and section fingerprints): profile select
with "(edited)" on the linked option + Edit profiles… into the
finished editor; Update profile / Save as new / Revert (Update
disabled with its reason on a built-in link); count cluster +
Minimum distance beside it; Must-use chips with browse-table
search-to-add; the conflicts list; and the My-threads inventory
reveal (ownership stayed its own concern — Own boxes, import/export
survive there). Colours used gains the Remove-from-profile row
action, landing an exclude on the design's copy — no shared-library
mutation without an explicit Update/Save as new (proven live: a
built-in edit renders "(edited)" and the built-in stays whole).
Saved palettes convert 1:1 into explicit-membership profiles at
library open (idempotent by id, order intact); custom colours load
into the resolver's inputs; the D117 editor-Save design link is
live (active-profile saves update the design's copy in the same
act). The PDF key keeps provenance-honest labels for non-thread
entries via `nonThreadLabel` — "Web-safe Lime #00ff00", never a raw
namespace (`keyLabel` extracted and pinned). ACCEPT-01's machine
half closes with this entry: resolver/selection/persistence suites
green (1,067 tests), export byte-identity for thread-only profiles
re-proven by the untouched ui-baseline pixel pins, and the D46 LUT
strategy needed no revisit — profile membership materialises as
ordered Thread entries, which the content fingerprint already keys.

**Retained, ticketed as cleanup:** the policy-world resolver
(`resolvePermitted`, `resolveProjectPalette`) and the LCh presets
stay in core as tested migration-era substrate this release; nothing
in src consumes them post-cutover — a wish-list line marks the
removal pass.

**Verified live:** the recut section renders the census exactly (no
old control anywhere); Retro 16 adopt → 16 available; the
remove-row action → "Retro 16 (edited)" + edited verbs + 15;
Revert restores; distance at 25/30 spaces the selection (used 7
of limit 8) with the sentence path node-pinned; a v5 save → Open
round-trip reopens on the same profile, distance intact; v4 loads
migrate with the visible note (code path proven, node-pinned).

**Link:** backlog → PERSIST-01/UI-01/ACCEPT-01 removed (colour half
complete; GALLERY-01 owner-paced and ACCEPT-02 maintainer remain);
tickets M15-PERSIST-01/M15-UI-01 deleted; file-map regenerated;
wish-list gains the resolver-cleanup line.

## D125 — M15-DITH-01..04: the dither half ships on the shared shell (2026-08-07)

**Decision:** the dither half lands whole, closing M15's agent work.
DITH-01 — the canonical presets and `sameDither` moved to
`src/core/pipeline/dither-presets.ts` (core cannot import ui;
`dither-model.ts` re-exports so consumers hold), with
`matchBuiltInDither` as the load-time attach; `ditherProfileRef`
joins schema v5 additively (the same unreleased cycle as D124, so no
v6 — the baseline project hash re-pinned once more under the same
waiver); the resolved `DitherConfig` stays the authoritative
snapshot half (D55). The kind-aware store carries dither profiles
with no store change — the PERSIST-01 kind-awareness paying off
exactly as D117 intended. DITH-02 — `profile-editor-dither.ts`
mounts the dither kind in the takeover shell with **zero shell
changes** (the D116 design goal, verified live): the three-field
form (method select, per-family strength with its semantics in the
helper, serpentine only where the method scans), built-ins carrying
their D61 basis lines as "Why:", the UI-04 rig inherited whole with
the D116 palette-context line — the design's palette by name, or
"Demonstration palette — Retro 16" when the design is full-RGB.
DITH-03 — the Processing section recuts to a "Dithering profile"
select + Edit profiles…; the Dither style select and details reveal
retire (`dither-panel.ts` deleted; the pure `dither-model.ts`
survives as the form's vocabulary); adopting a profile applies its
complete config live (no inline tuning — D116); the never-lying
Custom entry appears exactly when the config matches no profile;
full-RGB disables the surface with the A9 sentence ("Dithering
applies to thread palettes."); the section keeps the name
"Processing" — the rename to "Dithering" stays the owner's call
(D117 seam 5). DITH-04 — matching pinned over every preset (incl.
the None built-in for no-dither projects — D117's dissolved legacy
state), tweaked configs stay honestly unreferenced, and the
byte-identity leg holds by identity: an adopted built-in hands the
engine a config deep-equal to the preset's own.

**Verified live:** seven built-ins list in Processing; Graphic
adopts and renders; the editor opens on the design's active profile
read-only with its basis line; duplicate → strength edit → Save
lands on the copy and **not** the design (the D117 contract
observed); Back restores the section with the user profile listed.
Full suite 996 green; no shell file touched by the second kind.

**Link:** backlog → DITH-01..04 removed; M15-DITH-05 unblocked (the
absorbed M8 acceptance session, the owner's); tickets
M15-DITH-01/02/03 deleted; file-map regenerated.

## D126 — Review follow-ups: editor id uniqueness, the unlinked sentinel, three small honesties (2026-08-07)

**Decision:** the punch list from the D121–D125 review runs as its
own fix task (review.md rule: approved fixes are a task, not review
edits). (1) Editor ids are kind-prefixed — both kinds' editors stay
mounted in the host once opened, and the hidden twin duplicated
`#profile-switcher` and `#preview-view`, breaking id uniqueness and
label association; the shell derives its switcher id from
`adapter.kind` and the preview rig takes an `idPrefix` dep (proven
live: zero duplicate ids with both editors mounted). (2) The colour
select gains the `UNLINKED_DESIGN` sentinel — "This design's
colours" — so a migrated old file with no profile link never wears
the first option's name; picking the sentinel is a no-op (it names
a state, it is not adoptable); the dither select's never-lying
conduct, mirrored (proven live over a synthesised v4 library-source
file). (3) The loaded-snapshot palette display name refreshes once
the profiles cache lands, guarded by object identity so a
faster-fingered edit is never overwritten. (4) The built-in-linked
Update button's reason is a visible helper sentence wired by
aria-describedby, not a hover-only title. (5) The `\\u2019` escape
becomes a literal. ui-spec §5 gains the M15 amendment block (Colour
and Processing censuses, the takeover editor). Left deliberately for
the acceptance walk: re-capturing the browser-side baseline project
fixture (it needs the capture protocol's reference environment).

**Verified:** typecheck, lint, 996 tests, docs green; live — zero
duplicate ids with both editors mounted; the migrated file renders
the sentinel selected.

**Link:** the D124 review (session report); ui-spec §5 amended.

## D127 — M14-ACCEPT-01 accepted: M14 closes; M15-ACCEPT-02 deferred (2026-08-07)

**Decision:** the owner accepts M14-ACCEPT-01 — the maintainer end
review over the six looks (D74–D121), the review pack and this
session's evidence — with no failures routed to fix tasks, so **M14
UI/UX excellence closes whole**: the acceptance line has passed and
`check` is green on the final code. The watch items and live-session
legs the ticket carried (the getDisplayMedia legs, the Zoom naming
beside the preview's zoom, the "Capture"-over-a-still stretch, the
"Colours used"/"Colours in use" near-twin, the parked steppers
question, the off-viewport status trade) are accepted as shipped by
this verdict; anything the owner later wants changed arrives as a
new item, never silent rework. **M15-ACCEPT-02 is deferred** on the
owner's word: the colour half stays agent-complete with the human
acceptance session to run at a time of their choosing; the item
stays open in the backlog with its deferral dated. M15-DITH-05 and
M15-GALLERY-01 are unchanged by this entry.

**Link:** backlog → the M14 section removed whole (no Current
milestone until the next pick); M15-ACCEPT-02 line dated deferred;
ticket M14-ACCEPT-01 deleted on ship; trajectory M14 phase closed;
README status refreshed.

## D128 — M13 returned to Current; gestureless evidence re-baselined on the post-M14/M15 build (2026-08-07)

**Decision:** the owner's "autojazz M13" is the pick that returns the
M13 remainder to Current (M14 closed at D127). Because the live-path
surfaces churned ~3k lines through M14/M15 after the 2026-07-23
packs, every gestureless leg was re-run on `d7218be` before the owner
session — the D62/D63 re-measure rule applied to the profile evidence
itself. Node bench green (22 rows); the browser auto legs
(`still,stage,backend,livepath,gpu,lut,contention`) and the mem leg
re-run in a visible production Chrome window, both untainted
(`bench-reports/browser-bench-v0.5.0_20260807.d7218be-{auto,mem}.json`,
quoted in `docs/performance-evidence.md` → the D128 section). Every
load-bearing 2026-07-23 figure replicates — dirty knee, stats, still
preview-update, the ~51 ms selection export, isolation EXACT, GPU
agreement EXACT, device-loss PASS, and the post-export idle residue
to the decimal (74.8 MiB) — so the owner session lands on
known-good instrumentation. The D72 fixes are visible and truthful
in the rows (the non-FS clamp reports `ts`; the oversized chart
publishes `not-measured` via the refusal). TS reduce runs ~2.5×
faster with `reduce.ts` untouched — environment/JIT drift, recorded
so the synthesis binds to current-build baselines; the bv2 env row's
missing browser-version field is noted as the one attribution the
comparison wanted. The rehearsal sheet is repaired against the
shipped M14 surface (pause/resume → Freeze/Unfreeze; the documented
auto-token list gains `livepath` and names `mem` with its ~2 GiB
peak-probe caveat). The owner capture session (Parts A–D) is now the
sole input left for M13-SYNTH-01's gate; PROF-04/05 stay `[~]` on
exactly that remainder.

**Link:** backlog → M13 returned to Current with the note refreshed
and both PROF status lines re-dated; tickets M13-PROF-04/05 status
appended; evidence `docs/performance-evidence.md` → D128 section;
procedure `docs/browser-measurement.md` auto-list + Part C repairs.

## D129 — M13-MEAS-03: the owner session shrinks to its human legs; flag-granted capture sanctioned; D71 answered in mechanism (2026-08-08)

**Decision:** Tier 1 only — launch flags, no new dependencies; the
Tier-2 CDP driver stays untaken pending explicit owner dependency
approval. The probe (the ticket's kill-switch) passed on Chrome
151.0.7922.77: `--auto-select-window-capture-source-by-title` alone
resolves `getDisplayMedia` gestureless and pickerless, overriding
even the shipped monitor hint; `--use-fake-ui-for-media-stream`
breaks capture on that release and is excluded. Because the flag
matches any window system-wide by title substring, the automated
legs measure nothing until an in-page content guard proves the
captured pixels are the controlled source — joining visibility,
`zeroFrameReason` and the width warning as load-bearing
self-incrimination. `npm run bench:auto` is the one command
(dedicated throwaway profile, CORS-correct collector, validated
reports; invalid runs exit non-zero). Back-to-back automated windows
exposed two real harness ledger defects the manual flow's human
pauses had hidden — jobs settling after the books closed, and
latest-wins client drops leaving phantom in-flight entries — fixed
by a drain plus a drop-retirement cursor, so conservation now holds
at machine cadence. The six Part-B edit classes ride the controlled
source as seeded commanded patterns (`.edit-<class>` rows,
controlled-source evidence only). The forced-GC probe
(`--js-flags=--expose-gc`) answered D71: the idle residue collapses
to 11.5 MiB on forced GC in every run — lazy major GC, not
retention; the snapshot-pair Part D retires unless a run reports
otherwise. Engineering runs were refused by the validity gate
(hidden windows on an in-use desktop) — the gate working as built;
the first valid capture artefact awaits a quiet-desktop run, and its
rows enter canon only after the one-time manual cross-check
(Part A′), still owner work.

**Link:** ticket M13-MEAS-03 (remaining slivers); backlog status
lines; procedure `docs/browser-measurement.md` → "Automated
owner-session legs" + the shrunk rehearsal sheet; evidence
`docs/performance-evidence.md` → D129 section; scripts table
`DEV-INFRASTRUCTURE.md`.

## D130 — bench:auto --when-quiet: the quiet-desktop precondition automated, not bent (2026-08-08)

**Decision:** the owner's "take another look at automating" lands as
scheduling automation, deliberately not environment modification.
The alternative — Chrome's throttle-disabling flags
(`--disable-backgrounding-occluded-windows` et al.) — would let runs
survive occlusion but changes the scheduler on a measurement
instance and makes the env row's `visible` mean something weaker;
it stays a wish-list item requiring visible-vs-occluded equivalence
evidence before it could ever be sanctioned. Instead the launcher
automates the precondition the sheet already states: `--when-quiet`
polls `ioreg` HIDIdleTime until the desktop has been input-free for
`BENCH_IDLE_SECS` (60 s default), wakes and holds the display via
the macOS built-in `caffeinate` (`-u -t 1` then `-di` — display
wake and hold only; user input is never faked), runs, and re-arms
for the next quiet gap when an attempt's failures are wholly
environmental — a tested signature gate, so structural failures
(conservation, missing forced-GC) never burn retries. Artefact
naming becomes clobber-safe: every attempt writes a timestamped
file; only a validated leg is copied to the canonical unstamped
name, closing the run-6 hole where an invalid rerun overwrote run
5's valid mem report. Pure logic (idle parsing, naming,
retry gate) lives in `scripts/bench-auto-lib.mjs` under unit test.
If idleness is unreadable the gate degrades to a warning and the
validity gate remains the backstop — a wasted attempt is possible,
a quietly wrong report is not.

**Link:** launcher `scripts/bench-auto.mjs` + `bench-auto-lib.mjs`
(+ tests); `DEV-INFRASTRUCTURE.md` scripts table + utility entry;
procedure `docs/browser-measurement.md` → "Automated owner-session
legs"; ticket M13-MEAS-03 + backlog status (armed 2026-08-08).

## D131 — the Part-A′ cross-check holds: automated capture rows are canon; M13-MEAS-03 ships (2026-08-08)

**Decision:** the owner's verdict on the Part-A′ cross-check is
**holds** — given with the provenance stated plainly: the
picker-granted leg used the real picker dialog (a grant path fully
independent of the launch flags) with its two clicks scripted via
System Events, not a human hand. The evidence is the `52300de` pair
(`bench-reports/browser-bench-v0.5.0_20260808.52300de-{capture,picker}.json`,
both untainted, zero findings, verified against the ticket's table
in this session): live 300² median 38.5 → 37.7 ms (0.98×), live 200²
30.6 → 30.2 ms (0.99×), interaction 76.5 → 77.3 ms (1.01×), 4.0
updates/sec both sides, protocol misses 2 vs 3 (the known double-rAF
race, both sides). Consequence: **automated capture rows are canon**
— a `bench:auto` capture report that passes validation is quotable
evidence without a manual twin, starting with the D130 artefacts on
`6e79c78`; Part A′ retires from the rehearsal sheet and re-arms only
when a Chrome update changes flag behaviour (the probe expectation
re-run stays mandatory on update, per D129). The owner session
shrinks to Parts B and C exactly as designed, and M13-MEAS-03 closes
on this verdict — its remaining lines were only this call and this
recording.

**Link:** evidence `docs/performance-evidence.md` → D131 section
(the comparison table); procedure `docs/browser-measurement.md` →
"Cross-check before canon" status + Part A′ retirement; backlog →
M13-MEAS-03 removed, PROF-04/05 statuses re-cut; trajectory →
M13-MEAS-03 line; ticket M13-MEAS-03 deleted on ship (Tier-2 scope
ported to M13-MEAS-04's ticket — see D132).

## D132 — Tier-2 approved: the CDP trace leg opens as M13-MEAS-04, zero-dep raw CDP first (2026-08-08)

**Decision:** the owner grants the Tier-2 dependency approval D129
left pending — a CDP driver for the bench Chrome is sanctioned, and
the Part-C trace half becomes agent work as **M13-MEAS-04**. Design
stance chosen conservatively: **raw CDP over Node's built-in
WebSocket first** (engines pin Node ≥ 22.18, so a WebSocket client
ships with the runtime — the approved dev dependency is held in
reserve, taken only if raw CDP proves insufficient; the approval
covers `ws`/`playwright-core` if needed, recorded here so no future
session re-asks). Scope: record tracing during driven live capture
on the controlled source — GC pauses (serving PROF-05's remaining
line), long tasks and input responsiveness (serving PROF-04's Part
C) — published as a validated report next to the capture leg. The
MEAS-03 honesty rules carry over whole: controlled-source numbers
only (never quoted as Photoshop behaviour), the content guard stays
load-bearing, validity gates refuse tainted runs, a forced or
scripted anything is labelled. What stays human shrinks to: the
Photoshop-content trace, adversarial feel checks (browser-bar stop
and declined re-prompt stay approximate under any driver — D129),
perceived responsiveness, and every acceptance verdict
(M13-ACCEPT-02, SYNTH-01).

**Link:** backlog → M13-MEAS-04 opened in Phase 2 with [detail];
ticket `pm_skills/project/tickets/M13-MEAS-04.md` (design sketch,
honesty rules, the ported Tier-2 notes); this entry is the recorded
dependency approval D129 required.

## D133 — M13-MEAS-04 ships: the canonical trace run lands; GC closed as a non-source under driven capture (2026-08-08)

**Decision:** the canonical quiet-desktop artefact landed on the
first armed attempt — `bench:trace --when-quiet`, build
`v0.5.0+20260808.684811a` (the committed machinery build, clean
tree), validated whole: page half untainted with zero findings, all
nine windows paired, renderer self-identified, no trace-buffer data
loss, and the per-window GC accounting conserving exactly against
the whole leg. Verdict quoted to the evidence doc: **GC is not a
pause source on the driven live-capture path** — ~0.4 % of wall
time, a single 12.5 ms worst pause in 162 s (every other window's
major max ≤ 1.4 ms), zero observer long tasks in all eight observed
windows; major-GC frequency tracks allocation rate by edit class,
the same lazy-major mechanism as D129. M13-PROF-05's last automated
line (live GC pressure) closes on it; PROF-04/05 now carry only the
owner sitting. The ticket's second slice — an app-UI responsiveness
trace driving `index.html` itself under flag-granted capture —
deliberately does not ship with the item: the Done-when is met
without it, and whether that extra controlled-source evidence is
worth taking is a synthesis-time call, so it is parked on the
wish-list rather than silently dropped. M13-MEAS-04 closes.

**Link:** evidence `docs/performance-evidence.md` → D133 section
(the per-window GC table + honesty notes); procedure
`docs/browser-measurement.md` → trace-leg bullet (canon status
line); machinery, honesty rules and sheet shrink shipped under
D132's design in commit `684811a`; backlog → M13-MEAS-04 removed,
PROF-04/05 statuses re-cut; trajectory → M13-MEAS-04 line;
wish-list → second-slice line; ticket M13-MEAS-04 deleted on ship.

## D134 — the owner sitting closes M13-PROF-04 and M13-PROF-05 (2026-08-08)

**Decision:** both remaining halves close on the sitting's numbers
plus owner notes, exactly as the shrunk sheet designed. Part B
(Photoshop window, human by policy): the promise holds on real
content — 4.7–7.5 updates/sec at 300², 4.1 at 200², draft governor
truthfully silent, zero pump drops/errors — and every cost scales
with captured-surface pixels, not grid (×1.62 surface → ×1.6–1.76
everywhere; grab surface-sized at both grids). The discovery is
main-thread long-task density under a 6.5 MP window (11–18 % of
wall vs zero on the controlled source), the headline SYNTH-01
input. The report is formally tainted by two conservation findings
explained to the frame as harness bookkeeping — per-window drop
counters against cumulative submits — filed as **M13-DEF-03**
(repro: buttons 6, 6, 6b on a 30 fps surface; invisible on
automated runs where drops are zero; does not gate the synthesis,
whole-sitting totals conserve). Part C (the owner's real whole
screen + crop geometry, 156 s DevTools trace): GC is not a pause
source on the real path either — max pause 3.92 ms, 0.71 % of wall,
major frequency identical to the driven leg (3.2/s), allocation-
rate mechanism confirmed; long tasks 14.4 % of wall, max 82 ms,
matching the harness density; the D71 census's two crop-sized
main-thread copies keep the #1 reuse ranking. All adversarial
checks passed ("all seemed ok"; export full-quality and the
external-stop status line individually confirmed); the owner's
expectation of a louder end-of-capture prompt is a salience note
for ACCEPT-02, not a defect. Schedule enactment is human-infeasible
in-window (owner verbatim) — D129's automation of the edit classes
vindicated. M13-SYNTH-01 unblocks; acceptance stays M13-ACCEPT-02.
The close itself surfaced a second infrastructure finding: composed
`check` runs flake all-timeout on this synced path under the
post-sitting desktop load (every failure a 5 s timeout, zero
assertion failures, single files and one full run green) — filed as
INFRA-CHECK-01 rather than green-washed; the gate for this close
runs on a settled desktop. The owner disclosed afterwards that a
game was open in the background throughout — paused during both
measured legs, actively played only in the aftermath (overlapping
red gate runs, no measurement) — recorded as the evidence section's
environment-provenance note rather than hidden.

**Link:** evidence `docs/performance-evidence.md` → D134 section
(comparison table, GC table, taint arithmetic); procedure
`docs/browser-measurement.md` → Parts B/C status lines; backlog →
PROF-04/05 removed, M13-DEF-03 filed, SYNTH-01 unblocked;
trajectory → PROF-04/05 lines; wish-list → export-settings default
line; tickets M13-PROF-04/05 deleted on ship. Artefacts local
(untracked): `bench-reports/…da5d80b-photoshop.json`,
`bench-reports/traces/…owner-partC.json.gz`.

## D135 — M13-SYNTH-01 signed: the promise binds to the driven capture leg, the 1024² 100 ms line retires, Phase 4 narrows to two bit-exact candidates (2026-08-08)

**Decision:** all four rows signed on the recommendations at the
sign-off meeting; the evidence-quality gate passed with no
route-backs (Part B's formal taint adjudicated as M13-DEF-03 harness
bookkeeping — window 1 balances, the sitting conserves, medians
unaffected). (1) **Promise:** binds as sustained rate at
`preview-update` on the automated driven capture leg — zero cadence
misses at 4 /sec, medians 40.6/30.7 ms guarded ×1.35 — with a bv2
amendment (IMPL-02's to make) letting driven *base* capture rows
carry product targets; `.edit-<class>` and real-Photoshop rows never
bind. Interaction stays published-not-bound (double-rAF race, no
Photoshop start mark — a p95 bound would encode noise). (2)
**1024²:** the brief's "≤ 100 ms" line is retired — 1024² is an
export/finishing grid bound by correctness/robustness plus honest
medians; no quality-neutral ~3× exists. The 1024 cap stays (closes
the D9/D10-era wish-list question; ×16 export is already ~2.1 GB
transient). (3) **Phase 4:** IMPL-01 activates narrowed to two
bit-exact candidates — persistent grab surface, pre-submit copy
elimination (census #1/#2, allocator confirmed in Part C) — one
candidate per measurement, capture+mem legs as before/after;
IMPL-02 activates narrowed — routing **confirmed unchanged** (no
size/palette thresholds invented; `mapPaletteGpu` stays unwired),
scope = node bv2 rebind on the implementation build + browser
target rows + env browser-version field; **IMPL-03 is cut** — the
appearance gate is not met, no material user problem lacks a
quality-neutral answer, D47 stands; the cut resolves ACCEPT-01's
third blocker. (4) **Deferrals:** small-stroke feel and PDF-freeze
acceptability become ACCEPT-02 agenda lines; eight-brand cold prep
defers behind a use trigger; the D133 app-UI trace slice is cut;
off-main-thread capture is wish-listed behind a named surface-size
trigger (> ~6.5 MP or felt stutter). Headline finding driving
IMPL-01: main-thread long tasks scale with captured-surface pixels
(zero at 4.1 MP → 11–18 % of wall at 6.5 MP), not with grid.

**Link:** evidence `docs/performance-evidence.md` → "M13-SYNTH-01 —
the synthesis" (gate verdicts, targets, decision table, IMPL-01
activation block, signed acceptance matrix, residual risks); backlog
→ SYNTH-01 removed, Phase 4 re-cut (IMPL-03 line removed, IMPL-02
blocked on IMPL-01), ACCEPT-01 blockers now IMPL-01/02; tickets →
IMPL-01/02 updated with the signed scope, ACCEPT-02 agenda appended,
IMPL-03 + SYNTH-01 deleted on ship; wish-list → three lines resolved
(1024 cap, env browser-version, trace slice), off-main capture line
added; `brief.md` performance bar annotated;
`docs/measurement-contract.md` pointer sentence updated.

## D136 — INFRA-CHECK-01: the gate's test timeouts become 30 s liveness bounds; the starved-desktop flake closes (2026-08-08)

**Decision:** raise Vitest `testTimeout`/`hookTimeout` from the 5 s
default to 30 s config-wide (`vite.config.ts`), and raise the matching
explicit floor in `tests/acceptance-matrix.test.ts` (its per-row
`Math.max(5 s, grid/100)` overrides the config exactly where it hurt).
Timeouts in `check` are liveness guards, not perf assertions — the
perf budgets live in `bench`, deliberately outside the gate (D43/D44)
— so a loaded desktop must slow the gate, never fail it. Assertions
are untouched; a genuine hang still dies at 30 s.

**Mechanism (pinned by controlled legs on this machine):** healthy
suite 3.2 s wall, slowest test 889 ms — only ~5.6× tail headroom
against 5 s. Default-QoS 2× core oversubscription inflates just ~2.9×
(green). Clamping the run to the **utility QoS band** under the same
load — where macOS puts background work while a foreground app/game
owns the machine — reproduces the sitting's exact signature:
timeout-only failures, zero assertion failures, transform/import
aggregates 32×/35×; at the background band the suite exceeds 187×.
The sitting's 10–25× sits inside that QoS envelope, and the moving
failure set (8–16 across runs) is whichever tests' inflated wall
crossed 5 s. The synced-path coupling (`check:wasm` rewriting the
111 MB `target/` + `pkg/` into the OneDrive File Provider domain just
before `check:test`) is a secondary multiplier only — unobservable
today: the sync client sat at 0 % CPU through a 100 MB in-domain
write storm, so it is recorded as unexercised, not asserted. Its
hygiene fix (churn relocation off the synced tree) goes to the
wish-list.

**Verification:** post-fix the full suite is green at utility-band
starvation (1052/1052; transform 60×, import 47×, tests 19×; 86 s
wall) and composed `check` is green quiet (16.4 s). Residual:
pathological starvation (saturated cores + a foreground game) can
exceed any finite bound — the operational rule stays "gate on a
settled desktop" (D134's practice).

**Link:** backlog → INFRA-CHECK-01 removed; trajectory → one line;
wish-list → synced-tree churn-relocation line;
`DEV-INFRASTRUCTURE.md` → Quality gate liveness-bound note;
`docs/performance-evidence.md` → residual-risks line closed.

---

## D137 — M13-DEF-03: the multi-window drop ledger folds by delta; a silent missed-callback clamp falls with it (2026-08-08)

**Decision:** drop counts fold into the cumulative `CaptureCounters`
ledger **by delta** via a new `DropLedger` (`src/bench/counters.ts`),
and each live window publishes its own totals separately
(`window pump drops` / `window client drops` beside `window
callbacks`, with the `counter …` block cumulative throughout). The
harness no longer assigns a window value into a cumulative field.

**Why it looked right:** the two drop sources run on different
clocks. `PumpGate` is constructed per measurement window, so its
count restarts at zero and the `pumpDropsBefore` subtraction was
always a no-op; the worker client outlives every window and only
grows. Subtracting a "before" reading from each therefore *looks*
symmetrical while producing a per-window number for a field whose
siblings (`submitted`, `results`, `callbacks`) accumulate. From
window 2 the conservation identity was short by exactly the earlier
windows' drops, and each later window's first interval delta went
negative. Automated runs never showed it: the driven source drops no
frames, so `pumpDrops` carried the identical defect purely latently.

**The D134 arithmetic is unchanged.** Re-checked against the fixed
ledger: 720 submitted = 491 results + 229 drops + 0 errors + 0 in
flight, and the per-window drops (49 / 122 / 58) are what the fold
now computes. The sitting's two conservation findings and its
−22 / −106 interval deltas were artefacts of the reset and are gone;
no measured quantity moves, so every D134 conclusion — and the D135
synthesis resting on it — stands as signed.

**A sibling, found by the same review and worth more than the
original:** `rvfc missed callbacks` compared a per-window
`presentedFrames` delta against the *cumulative* callback total, so
`Math.max(0, …)` clamped it to zero for every window after the
first. D134 published 0 missed callbacks for windows 2 and 3 where
119 and 81 were true — a wrong number presented as a good one, where
the drop defect at least announced itself as a taint. Now measured
against `windowCallbacks`. Raw meta only: no narrative or target
cited it, and window 1's 52 was always correct.

**Scope:** harness-only. Nothing in `src/core/`, `src/worker/` or the
app path is touched, so no measured row and no budget moves. The
manual multi-window sitting is unblocked; validating it against a
real 30 fps surface (share, then buttons 6, 6, 6b, 8) is human by
policy and rides the next owner sitting.

**Link:** backlog → M13-DEF-03 removed; trajectory → one line;
`docs/performance-evidence.md` → the D137 section plus the closed
residual-risks line; tests → `tests/bench-counters.test.ts` (the
D134 numbers as a regression fixture).

---

## D138 — M13-IMPL-01: both signed candidates land; the before/after pair does not (2026-08-08)

**Decision:** the two D135-approved candidates are implemented and
correctness-proven; the item stays **open** on its evidence half. No
run made while implementing them is quoted.

**What landed.** Candidate 1: one `OffscreenCanvas` per session
(`src/capture/surface.ts`), resized in place on a crop change, instead
of a fresh canvas + context per accepted frame (census #1). Candidate
2: the pump's pre-submit `new Uint8ClampedArray` is gone — the grab
buffer is transferred (census #2). They land together because
candidate 2 is only safe *because of* candidate 1: the retained
surface still holds the frame after its buffer detaches, so
`snapshot()` re-reads it with no `drawImage` and the copy is paid only
when a consumer appears. The one-candidate-per-**measurement** rule is
untouched.

**Two things the census did not say.** A reused surface composites
`source-over` by default — a no-op only while the source is opaque.
Capture video is, but exactness must not rest on that, so the draw is
explicit `globalCompositeOperation = 'copy'`. And a transferred array
keeps its geometry while losing its bytes, so a bare read returns a
correctly-sized *blank* picture; one pure rule
(`src/capture/master-image.ts`) now guards every pixel read, and a
refill that cannot deliver reports no source rather than an empty one.

**Two hazards found while implementing, neither in the ticket:**
ending a capture session would have taken the design with it (the
pixels live on the grab surface, not in `masterImage`) — `endCaptureUi`
now rescues the last frame into a still first, and `snapshot()`
survives `stop()` so the browser's own stop-sharing path can too; and
the profile editors hold the design still across awaits, unlike every
other consumer, so their hook returns a detach-proof copy.

**Why no before/after.** The material reason: the automated capture
leg *cannot* price candidate 2. `src/bench-browser.ts`'s pump submits
its grab buffer directly and keeps no master image, so the app's
per-frame copy never existed in the harness; a zero delta there
reported as "no regression" would be measuring the wrong workload.
Candidate 1 shares the app's `grabFrame` and is priced honestly.
Closing that fidelity gap is a harness change and must not ride the
same run as a candidate — wish-listed. The practical reason: of five
attempts, one pair came back valid, and it measured neither the
baseline nor the final source and carried the parent commit's build id
(the work was uncommitted). It proves the legs run on this desktop and
nothing about the change. The owner runs the pair later.

**Scope:** `src/capture/` plus the master-image reads in `src/main.ts`;
nothing in `src/core/` or `src/worker/`. `check` green (1,070 tests, 15
new); boot check clean. Live capture is browser-only and rides the
owner's measurement pair.

**Link:** backlog → M13-IMPL-01 `[~]`; `docs/performance-evidence.md`
→ the D138 section; wish-list → the harness-fidelity line; tests →
`tests/capture-surface.test.ts`, `tests/capture-master-image.test.ts`.

---

## D139 — M15-GALLERY-01 batch 1: eight candidates drafted and reviewed, unsigned (2026-08-09)

**Decision:** eight built-in profiles are drafted into
`builtInProfiles()` — five rule-shaped (Autumn leaves, Golden hour,
Winter frost, Deep sea, Neon noir) and three curated (De Stijl
primaries, Delft blue, Ukiyo-e woodblock). They ship as code but are
**unsigned**: the owner curates names and membership per batch (D115).
This batch establishes the evidence format the rest follow. A review
pass ran before signature and its follow-ups are folded in here.

**The split is a claim, not a convenience.** Rule-shaped where the
style genuinely is a band of colour space; curated where a rule would
misdescribe it. No HSB band produces "red, blue, yellow, black,
white" without dragging in every neighbouring shade.

**A stated criterion was wrong and is corrected.** Scoping proposed
"roughly 8–60 entries" as the acceptance band, which would have
rejected every shipped range profile (Sepia 346, Pastels 965). A range
profile is the *eligible universe* the colour-count limit selects
from. The bound now counts **distinct colours**, not entries — 3,338
threads render as 2,830 distinct colours (D55/D56) — and is recorded
in `conventions.md`, because the wrong intuition is specific and
repeatable.

**Evidence format, set here:** each candidate rendered through the
real pipeline on the sample card at the default eight-colour limit,
reported as its selected colours with each colour's share of the
image. The eligible count alone cannot say whether the style reads —
and twice here it did not.

**Two candidates changed under that evidence.** Neon noir was retuned
twice: its cyan pole started at hue 170, which is sea green, and won
the image at 43 % while the dark floor gave 9 % — tropical, not noir.
Loosening the floor to saturation 35 then handed 30 % to a dark olive
— swampy, no better. The floor has to stay genuinely neutral to read
as black, so it is saturation ≤ 12 taken deeper (brightness ≤ 35): 32
near-neutral darks with no greens among them. Delft blue lost B5200,
a second white one step from 3865, which freed the slot its ladder
needed.

**A test was written and removed, which is the more useful finding.**
"No two colours the eye cannot separate" is not expressible as a
distance threshold: the duplicate white was 21 apart in RGB, but the
shipped Classic set has two greens at 18 and Delft's own navies sit at
15. Every threshold that catches the duplicate condemns a deliberate
tonal rung. The difference is intent — which is what owner curation is
for, and a gate there would have been theatre.

**The naming guard nearly became the thing it guards against.** A
second review caught the widened trademark list matching as
substrings: `ral` sits inside "Coral reef" — a candidate in this very
ticket — and `lego` inside "Allegory". It was whole-word anchored, and
the test now asserts in both directions, because a guard that rejects
a legitimate name is worse than none: the fix looks like renaming the
profile.

**Left deliberately:** rule-shaped profiles keep `libraries: allBrands`,
following Sepia/Pastels. Restricting only the gallery to DMC would
make these behave differently from the two profiles beside them in the
same menu; it is one word per profile and it is the owner's call.

**Scope:** `src/core/color-profile.ts`, its test, and a
`conventions.md` line. No UI change, no change to
`resolveProfileMembership`, no protected file touched. `check` green.

**Link:** backlog → M15-GALLERY-01 batch 1 pending signature;
curation sheet published; the photo-slot half of the evidence format
is blocked on owner-supplied images (`public/profile-demo/` is empty);
the catalogue oddity is wish-listed.

---

## D140 — M15-GALLERY-01 batch 1 signed as-is; two open questions closed by the owner (2026-08-09)

**Decision:** the owner signed all eight batch-1 candidates unchanged
— Autumn leaves, Golden hour, Winter frost, Deep sea, Neon noir, De
Stijl primaries, Delft blue, Ukiyo-e woodblock. Names and membership
stand as drafted (D139). They are now shipped built-ins, not
provisional, and batch 2 may start.

**All-brands stands.** Rule-shaped profiles keep
`libraries: allBrands`, matching shipped Sepia/Pastels. The known
cost is accepted: one eight-colour design can call for thread from
five brands. The reasoning is that the multi-brand shopping list is a
*selection* concern — which threads get picked from the eligible set —
not a membership one, so narrowing the gallery would be working around
the symptom. It also keeps these eight behaving like the two profiles
beside them in the same menu.

**Neon noir signed with its residual named.** Its largest area is a
mid grey-taupe rather than true darkness, after two retunes. A rename
was recommended and **declined**: the neon poles do read, and the
catalogue holds too few near-blacks to carry the name any harder. This
is recorded because the next reader will see the grey and take it for
an oversight — it is a decision. Changing it needs the owner, not a
tidy-up.

**Left standing from D139:** the photo-slot half of the evidence
format is still blocked on owner-supplied images
(`public/profile-demo/` holds only its README), and the catalogue's
`ariadna:1650` row — a cyan-white named "heather very light" — is
still wish-listed for an owner call. Neither gates the signature.

**Scope:** comment text in `src/core/color-profile.ts` recording the
signature and the Neon noir decision; memory. No recipe, no rule and
no membership changed — the signature is the whole change. `check`
green.

**Link:** backlog → M15-GALLERY-01 batch 1 signed, item stays open for
later batches; trajectory → one line; D139 is the drafting and review
record and stands unamended.

---

## D141 — M13-IMPL-01 closes: the pair is clean, the grab term moves, the end-to-end span does not (2026-08-09)

**Decision:** both candidates are **kept**, and M13-IMPL-01 closes.
The persistent grab surface is priced and pays; the pre-submit copy
elimination stays unpriced by construction (D138) and is kept on its
correctness proof plus the D71 census, not a measured delta.

**The pair.** Baseline `138cd0f` → after `3bfe7ef`, both **valid on
attempt 1**, same shared surface (2080 × 1948) and driven cadence.
Each leg was built in its own detached worktree: a build from an
uncommitted tree carries the parent commit's sha, which would have
stamped both reports identically. Full tables in
`docs/performance-evidence.md` → the D141 section.

**What moved.** `grab median ms` — the term candidate 1 owns — fell in
**8 of 8** windows, mean −2.9 ms (canonical −16 % and −13 %). One pair
of runs proves little; eight independent windows moving together is
what carries it.

**What did not, and why that is the honest headline.**
`preview-update` medians went the other way by a hair: +0.20 to
+1.20 ms across seven rows (interaction −2.90). The sign is
consistent, which is not nothing — but per-row standard deviation is
~9.5 ms, so half a millisecond is not separable from drift on one
pair. Recorded as **flat**, neither claimed as a regression nor
explained away.

**Why a 3 ms saving buys no latency.** At the driven 250 ms cadence
the path is not grab-bound: long tasks 0 in both runs, drops 0 in
both, submitted = results = 120 with nothing in flight. The span is
owned by worker processing and the drive interval, so removing
main-thread allocation returns **headroom, not latency** — precisely
the term the D135 surface-size trigger worried about growing with the
crop.

**Two things the pair does not measure.** The mem leg's plateau
verdict is identical across it, but that leg's workload is synthetic
noise and never calls `grabFrame`, so the census-scale allocation
claim still rests on the D71 arithmetic and the deterministic test —
only candidate 1's *time* half is measured here. And candidate 2
remains unpriced: the harness pump never carried the copy (D138), a
gap that stays wish-listed rather than being closed on the same run as
a candidate.

**No regression elsewhere:** 4.0 updates/sec on every row before and
after, `npm run bench` green at 22 passed, nothing in `src/core/` or
`src/worker/` touched.

**Link:** backlog → M13-IMPL-01 removed, M13-IMPL-02 unblocked;
trajectory → one line; `docs/performance-evidence.md` → the D141
measured section; D138 is the implementation record and stands
unamended.

## D142 — M13-IMPL-02: the promise becomes an assertion; bindability is enforced in code, not convention (2026-08-09)

**Decision:** M13-IMPL-02 closes. The routing half is **record-only**
as D135 signed it — categorical `lab → ts` / `rgb → wasm`, no
thresholds, no selection code touched. The budget half lands in full.

**The promise is now asserted.** Until now "≥ 4 preview updates/sec"
was a sentence in the brief. It is now a gate: `bench:auto` fails when
the driven capture leg's sustained rate drops below 4/sec, or any
frame is missed or dropped. It binds as a **rate with zero misses**,
never a latency percentile — a fast median while frames are dropped is
not the promise being kept. A **missing** counter fails rather than
passes: the claim is not "no misses were reported", it is "misses were
counted and there were none", which is the only version D43's
no-green-washing rule can hold.

**Bindability is enforced, not documented.** The bv2 amendment lets
driven *base* capture rows carry a target, because that environment is
reproducible. `.edit-<class>` rows (driven at their own cadence) and
anything measured against real Photoshop (content and timing nobody
controls) never can. `assertBindable` checks this against the key
rather than trusting the table, so a future edit cannot quietly bind an
unbindable row. `interaction` stays published-not-bound (D135).

**The node rebinding is drift, not a win.** All ten rows re-took
1.7–4.3 % faster on the implementation build — uniformly, so it is
environment/JIT, not any stage. Nothing here is an IMPL-01 effect: no
node row observes the capture path (D141). The take is only as good as
the machine: an earlier one of the same build, minutes after a full
`check`, put `reduce` at 21.1 ms on a single 65 ms sample — enough to
fail its own guard, and correctly *not* tainted, since nothing about
that sample was implausible. The remedy is a settled machine, never a
widened tolerance.

**Link:** backlog → M13-IMPL-02 removed, M13-ACCEPT-01 unblocked;
trajectory → one line; ticket deleted; two doc-deltas captured
(AGENTS.md, DEV-INFRASTRUCTURE.md).

## D143 — M13-ACCEPT-01 passes: the machine half is done, every leg valid first time (2026-08-09)

**Decision:** M13-ACCEPT-01 closes on build
`v0.5.0+20260809.b4cf665`. M13-ACCEPT-02 is unblocked and is the only
thing left in M13.

**What passed.** Node: `check` (1090), `matrix` (267), `bench` (22) on
the rebound baselines. Browser: capture, mem, trace and backend legs
all VALID on **attempt 1**. The promise measured 37.6 ms at 300² and
29.5 ms at 200², both at 4.0 updates/sec with zero missed callbacks and
zero drops — the first time a miss would have failed the command rather
than needed a reader to notice. GC re-confirmed as a non-source: 0.30 %
of wall over 163 s, worst pause 1.8 ms, zero observer long tasks.
Backend: 66 cells EXACT, indices sidecar EXACT in all of them, both
fallback probes PASS with M13-DEF-01 not regressed.

**A leg became a command.** The backend comparison had no one-command
path — the leg list was hardcoded to capture/mem/trace — so
`bench:auto -- --backend` was added with `validateBackendReport`. This
is ACCEPT-01's own "focused backend commands activated by synthesis",
not new scope. Its third check earns its place: mismatches already
taint via the leg's findings, but a suite that measured **zero** cells
would otherwise look identical to one where everything agreed, so a
zero-comparison report now fails.

**Attribution is honest about its limit.** The new env `browser` field
reads `Chrome 151.0.0.0` because Chromium serves a reduced UA with
minor/patch frozen. That answers what D128 asked — which *release* —
and the full version would need an async high-entropy call, making
report assembly async for a digit nobody has needed. Recorded rather
than dressed up.

**Alternatives rejected:** re-running the browser legs in an embedded
browser (not a legitimate measurement surface); accepting D69's
backend evidence as still-current rather than re-taking it (ACCEPT-01
says green on *final* code).

**Link:** backlog → ACCEPT-01 removed, ACCEPT-02 unblocked and now
M13's only open item; trajectory → one line; ticket deleted; run sheet
`docs/acceptance-m13-live.md` prepared and pinned to the passing build;
evidence `docs/performance-evidence.md` → the M13-ACCEPT-01 section.

---

## D144 — M15-GALLERY-01 batch 2: eight candidates drafted, unsigned; the evidence run becomes reproducible (2026-08-09)

**Decision:** eight more built-in profiles are drafted into
`builtInProfiles()` — four rule-shaped (Rainforest, Spring meadow,
Gemstones, Moorland) and four curated (Art deco, Mid-century modern,
Fair Isle, Fluoro spot print). They ship as code but are **unsigned**:
the owner curates names and membership per batch (D115). Curation
sheet published.

**The batch was picked against gaps, not down the ticket's list.**
After batch 1 the gallery had no greens at all, nothing that narrows
on chroma rather than hue, nothing muted, and a culture half entirely
of pre-war Europe and Japan. Rainforest and Spring meadow are one hue
arc split at brightness 52 — canopy greens, meadow greens — so neither
carries a band the other lacks. Gemstones narrows on saturation alone
and Moorland is its mirror; those two are the first rules in the
gallery with no hue band, which is the honest shape for "defined by
chroma".

**Batch 1's evidence could not be regenerated, so it was rebuilt and
then committed.** D139 set the format but not the method, and the
published numbers matched none of the obvious readings until dithering
was included: the app's default Floyd–Steinberg is what turns an edge
into a mix, so undithered shares describe an image nobody sees. With
resize → select at the default eight → full pipeline with dither, the
batch-1 sheet reproduces to within a few tenths of a point on every
row. That run is now
`tests/audits/profile-gallery.audit.test.ts`, `AUDIT=1`-gated beside
the perf audits: batch 3 quotes numbers instead of re-deriving them.

**A trademark nearly shipped from the ticket itself.** The candidate
list says "Risograph print"; Risograph is Riso Kagaku's mark, and it
reads as a printing technique, which is exactly the good-faith failure
D115's naming rule is for. It ships as **Fluoro spot print** and
`riso` joins the guard list — whole-word anchored, asserted in both
directions so it bites "Risograph print" and still passes "Risotto
cream", per the D139 anchoring lesson.

**Left for the owner, both named on the sheet:** Art deco's Pearl Grey
takes 43.8 % of the card because that card carries a greyscale ramp a
photograph would not — chrome is a real deco colour, so this may be
the card flattering it rather than a fault, and the alternative (415 →
3799) costs Black, which falls to 2.6 %. And `finca:4368` (`#2d6153`)
has an **empty name** in the catalogue: a second bad row beside
`ariadna:1650`, surfaced by Rainforest. Owner data, protected,
wish-listed.

**Scope:** `src/core/color-profile.ts`, its test's naming guard, and a
new audit file. No UI change, no change to
`resolveProfileMembership`, no protected file touched. `check` green
(1091 tests).

**Link:** backlog → M15-GALLERY-01 batch 2 pending signature;
trajectory → one line on signature, not before; D139 and D140 stand
unamended.

---

## D145 — M15-DATA-01 opens: the catalogue gets swept once instead of a row per batch (2026-08-09)

**Decision:** the owner's ask for a verification pass over the colour
listings becomes M15-DATA-01, and the two wish-listed bad rows are
promoted into it. Rule-shaped profiles read all 3,338 rows, so every
gallery batch turns up another one — finding them singly is the
slowest possible route to a clean list.

**A first scan is in the ticket so the item starts with evidence.**
Two classes are certain: **21 rows carry no name at all**, and every
one is Finca — about a tenth of that brand, so it reads as one gap in
that ingest rather than 21 slips. The name column is empty in the
owner CSV itself, so the generator is innocent. **11 same-brand pairs
share a hex**; across brands that is normal and deliberate (D55/D56),
within one brand it is likelier a transcription slip. Every brand+reference pair is
unique and every hex is well formed.

**The class that matters resists automation, which is the finding.** A
crude name-versus-hue probe returns 402 hits and is mostly false
positives: compound names — "Blue Green", "Antique Violet" — sit
legitimately between their two words, and a near-neutral row's hue
means little. `ariadna:1650` (a cyan-white named "heather") is
qualitatively different. So the sweep reports evidence for judgement;
it must not auto-flag, and it must not gate `check` over data the
agent may not edit.

**Out of scope, deliberately:** checking the measured hexes against
each brand's published values. All 3,338 carry provenance `measured`
and no published source is in the repo — that is its own work, with
ICE-XREF-01's data problem.

**Link:** backlog → M15-DATA-01 under M15 Next with a `[detail]`
ticket; wish-list → the two rows promoted out; D144 recorded them as
wish-listed and stands unamended.

---

## D146 — M15-GALLERY-01 batch 2 signed as-is; the gallery reaches sixteen (2026-08-09)

**Decision:** the owner signed all eight batch-2 candidates unchanged —
Rainforest, Spring meadow, Gemstones, Moorland, Art deco, Mid-century
modern, Fair Isle, Fluoro spot print. Names and membership stand as
drafted (D144). They are shipped built-ins, not provisional, and batch
3 may start.

**Art deco is signed with its residual named**, the same conduct Neon
noir got at D140. Pearl Grey takes 43.8 % of the evidence card because
that card carries a full greyscale ramp and hands the mid grey area no
photograph would. The alternative was offered and not taken: 415 →
3799 buys a deeper shadow and drops Black to 2.6 %. The next reader
will see the grey and take it for an oversight — it is a decision, and
changing it needs the owner.

**The rename stands.** "Fluoro spot print" ships in place of the
ticket's "Risograph print", and `riso` stays in the naming guard.

**Two findings left the wish-list for the queue**, at the owner's ask
that findings live in the backlog rather than the inbox: the missing
profile-demo photos become **M15-EVID-01** (owner action — three of
the five test-preview slots render "Image offline", so every batch so
far has been judged on the generated card alone, and a style that
reads on a synthetic hue sweep is not proof it reads on a face), and
the audit suite's post-M8 drift becomes **ICE-AUDIT-01**, surfaced
again when batch 2 added an audit file and ran only that one.

**Scope:** comment text in `src/core/color-profile.ts` recording the
signature and the Art deco decision; memory. No recipe, no rule and no
membership changed — the signature is the whole change. `check` green.

**Link:** backlog → batches 1 and 2 both signed, item stays open for
batch 3; two items added; trajectory → one line; D144 is the drafting
record and stands unamended.

---

## D147 — Six demo images land, the slot list grows to six, and M16 opens (2026-08-09)

**Decision:** the owner supplied six 2048² demo images; they are in
`public/profile-demo/` and `PHOTO_SLOTS` grows from four to six to use
all of them. M15-EVID-01 closes.

**The slot list was a guess and the images are the fact.** The four
slots were named before any image existed — `landscape.png`,
`cartoon.png`, `portrait.png`, `text.png`. What arrived is two
landscapes, a portrait, a flat-colour graphic, stained glass and text,
five of them JPEG. Bending six images into four slots would have
thrown away the two that test a profile hardest: a second landscape is
what stops one lucky picture reading as proof, and stained glass —
saturated colour against black leading — is the case a rule-shaped
profile fails first. So the list took the images' names, extensions
included, rather than the reverse.

**Verified rather than assumed:** all six fetch with an `image/*`
content type (the loader's guard rejects anything else, which is how a
missing file stays an honest "Image offline"), and each renders
through the real pipeline in the editor — six canvases, no offline
state. The repo grows 5.3 MB; the images are owner data and were not
recompressed.

**A defect fell out of looking.** In the editor's Libraries list each
`Browse` button sits after a variable-width brand name in a flex row,
so eight buttons start at eight different left edges (129–157 px at
1280 px wide). Filed as M15-UI-05 — it is the first thing visible in
the editor the acceptance sitting judges.

**M16 is committed, not scoped.** The owner's export-settings ask from
the D134 sitting — print-sized defaults, grid lines and numbering on —
was called a milestone at the time and had been sitting on the
wish-list since. It becomes **M16**, opening with a `[sign-off]`
scoping item, because "print-ready by default" spans four exporters
and a migration and should not be guessed at.

**Scope:** `src/ui/profile-editor-preview.ts`, its test, the
profile-demo README, six images, memory. `check` green.

**Link:** backlog → M15-EVID-01 removed, M15-UI-05 and the M16 section
added; wish-list → the export-settings line promoted out; trajectory →
one line.

## D148 — M13 ships on its maintainer gate; M15's acceptance closes with it (2026-08-09)

**Context.** The combined sitting (`docs/acceptance-combined-session.md`)
ran nine legs in one sitting to close M13-ACCEPT-02, M15-ACCEPT-02,
M15-DITH-05 and the M8-GOLD-01 rider. It ran on HEAD
(`v0.5.0+20260809.0642be5`), not the sheet's pinned `b4cf665`: no file
on the processing path had changed since that build, so the pairing
with ACCEPT-01's automated evidence held, and M15 could not run on the
pinned build at all.

**Decisions.**

- **M13 ships.** Live editing at 200² and 300² was judged responsive;
  no gap at or below 300², so M13-SYNTH-01 was never reopened. All four
  D135 agenda lines signed — three accepted outright, cold prep
  **accepted at this workload only** at a measured **6 s**, roughly
  double D135's 1.3–3.3 s estimate. The estimate was wrong, not the
  behaviour; the line is now triggered rather than hypothetical.
- **The gallery closes at sixteen**, and its forty unbuilt candidates
  are *kept*, not cut — the owner asked for them to survive the close,
  so they became ICE-PROFILES-02 with the signed-batch process attached.
  Closing an item does not have to destroy its queue.
- **Golden fixtures approved** (M8-GOLD-01, standing since 2026-07-22)
  — with all five methods freshly judged, this was the best-evidenced
  moment the decision would get. The owner's suggested source
  (`landscape-1.jpg`) was declined *as a file* and kept *as content*: a
  golden fixture must stay diffable when it fails, and JPEG decoding
  varies across platforms, which would break bit-exactness for reasons
  unrelated to the dither maths. M8-GOLD-02 carries a small JSON crop
  in the existing 8×8 house style.
- **The access leg was part-deferred** rather than guessed. Keyboard,
  focus, 200 % zoom and the narrow width passed; the screen-reader half
  became A11Y-VO-01. An open gap recorded honestly beats a pass nobody
  performed.

**The sitting's own findings.** Nine were captured, all iceboxed:
ICE-ZOOM-01 (canvas jump on first wheel zoom), ICE-KEY-01 (the PDF key
prints the hex twice), ICE-EXPORT-01, ICE-GLOBALERR-01, ICE-STALE-01,
ICE-SAVE-01, ICE-FLICKER-01, ICE-VARIANTS-01, ICE-WIDTH-01/02. Two are
worth remembering together: **ICE-KEY-01's function was already unit
tested and green**, because the fixture used a *named* web-safe colour
while the broken majority are named by their hex — which is the whole
argument for ICE-EXPORT-01, asserting the artefact rather than the
helper. And the run sheet's own step 5 turned out unrunnable: it asks
for the diagnostics bundle on a build its step 2 requires be
production, where that control is dev-only.

**Scope.** `src/ui/styles/base.css` (M15-UI-05), backlog, trajectory,
decision-log, wish-list, three ticket files deleted, one added,
`docs/acceptance-combined-record.md` added.

**Link:** M15 becomes Current, M16 becomes Next. M15-DATA-01 and
M16-SCOPE-01 were queued for this session and did not run — the sitting
took it.

<!-- FILE: pm_skills/project/archive/decision-log-2026-08-11-to-2026-08-12.md -->

# Decision log archive — 2026-08-11 → 2026-08-12 (D149–D171)

<!-- Archived verbatim from decision-log.md on 2026-08-23 (prune pass, D184).
     Append-only history; do not edit. Cold tier: grep + line-range only. -->

## D149 — Roadmap reorganisation: the output half becomes the critical path, the audience widens, and a fifteen-item batch precedes it (2026-08-11)

**Decision.** A whole-queue review, at the owner's request, with three
outcomes: a restructured backlog, four owner answers that change scope,
and a batch built to be run gatelessly.

**The structural finding.** M13, M14 and M15 all shipped work on the
*input and appearance* side of the app — performance, UI, colour
profiles. Meanwhile M9–M12 (symbols, multi-page charts, grid styling,
fabric and thread estimates) had sat deferred since 2026-07-22 (D63).
The brief's second success criterion — "a stitchable chart PDF can be
printed from a captured design" — is therefore still unmet: today's PDF
is one page, colour cells only, screen-sized, no symbols, and its thread
key prints the hex twice (KEY-01). The app is an excellent lens attached
to an unfinished pattern. Those five milestones become **Track A, the
printable pattern**, ordered M9 → M11 → M16 → M10 → M12, and Track A is
Next.

**M16 demoted from milestone to task.** Its ask — grid lines and major
numbering on by default — *is* an M11 preset choice, and print-ready
defaults cannot be settled before M9 decides whether a chart cell
carries a symbol. It was a defaults change to furniture that does not
exist yet, sitting in front of the milestones that build the furniture.

**Ship order stops tracking milestone number.** M9–M12 now ship after
M13–M15, and M16 after M11. The numbers stay because they are greppable
across ten ticket files and 149 decision entries; renumbering would cost
that for no gain. The backlog states the order explicitly instead.

**Batch C0 precedes Track A**, and is the argument the owner asked for
about running a large gateless (auto-jazz) batch. Fifteen items with
confirmed mechanisms, named acceptance conditions and no taste required:
the 2026-08-09 sitting's findings plus the tooling debt that made that
sitting expensive. Three of them run first because they are
preconditions for *trusting* a gateless run at all:

1. **RENAME-01** — a large run writes prose, decision entries and
   identifiers; every one written under the old name becomes rename
   surface. Cheapest now.
2. **The doc-sync pass**, plus the hot-read drift fixed in this entry.
3. **AUDIT-01 + ROUTE-01** — `npm run audit` is red (2 files / 2
   tests), so the audits currently give the agent no signal.

The general principle, worth keeping: before a long gateless run, fix
the things that make failure legible. A red audit suite, a diagnostics
buffer that evicts real faults for browser noise (DIAG-01), and export
helpers that pass while the artefact is wrong (EXPORT-01) are precisely
the conditions under which an unattended run does damage nobody sees.

**Owner answers that changed scope.**

- **The audience widens.** The owner intends to publish online to a
  broader audience who "could be using it on anything". "macOS-first,
  personal creative use" is no longer the product, only where it was
  built and measured. Recorded in `brief.md`.
- **ICE-ADJUST-01 survives, and the recommendation against it was
  wrong.** The review argued for cutting it: tonal sliders duplicate
  Photoshop, which the user has open beside the app and which does it
  incomparably better. That argument rested entirely on the upstream
  editor being there — and a broader audience may have nothing of the
  kind. The owner also holds that controlling the final image process
  *is* the point of the app, and asked for colour thresholds as presets.
  Rescoped rather than kept as-was: build it as a **third profile kind**
  on M15's kind-agnostic editor shell, beside colour and dither, because
  "available as presets" is exactly what that shell already does and a
  third kind is the shape it was built for. It is the presumptive
  milestone after Track A.
- **DUR-01 opened.** There is no autosave, no session restore and no
  unsaved-work guard; `beforeunload` appears nowhere in `src/`.
  IndexedDB holds *library* data only, localStorage holds accordion
  state, and the design in progress exists only if you save a file —
  mitigated by one sentence at `src/main.ts:1971`. M14-AUDIT-02
  confirmed the silent loss at D75 and it was never opened as work. It
  is the highest-severity open product defect and it was not in the
  backlog at all. Ships with SAVE-01: same subject.
- **The rename is real.** Promoted from the wish-list, where it had sat
  since 2026-07-20, and sequenced first. Its tier is the one blocking
  question — the preferences key and the IndexedDB database name need
  migrations or an existing install loses its accordion state,
  inventory, palettes and profiles, and the repo/remote/directory tier
  is the owner's to perform, not the agent's.

**A dependency nobody had noticed.** M9's ticket makes font and asset
licensing a first-class milestone decision. "Embeddable for personal use
in a local web app" and "redistributed inside a published app" are
different licence answers, so ICE-TAURI-01's distribution intent is now
an *input* to M9 rather than an unrelated spike. Settle it first or pick
symbol assets twice.

**Splits and narrowings.**

- **M15-DATA-01 split three ways.** As written it chased the cosmetic
  class and excluded the consequential one. A thread's *name* is
  decoration (identity is `brandId:reference`, RGB is display-only —
  D55/D56); a wrong **hex** misrenders the design. DATA-01 keeps the two
  machine-certain classes and runs in the batch; DATA-02 holds the
  name-versus-colour probe (402 hits, mostly compound-name false
  positives); DATA-03 holds the published-values data ask, blocked on
  owner data.
- **A11Y-VO-01 split.** A11Y-01 asserts every control *has* an
  accessible name, hand-rolled over `tests/ui-styles.test.ts` with no
  new dependency; A11Y-VO-01 keeps the part a person has to hear —
  whether the announcements are any good. A short VoiceOver crawl
  instead of a long one.
- **ICE-VARIANTS-01 narrowed** from four axes (including a 2→256 sweep)
  to one bounded axis: the five dither methods from a frozen still. It
  is the best idea in the Icebox — it fixes choosing by memory — but a
  grid is many pipelines, so let one axis earn the rest.

**Cuts and corrections.**

- **ICE-AUTOMATE-01 cut.** Its deliverable was the
  automatable/partly/human-only triage, and that triage was already
  written in the item. It has become the ordering rationale for Batch C0
  and this entry; keeping the item would have been keeping a finished
  piece of work in the queue.
- **ICE-TRANSCRIPT-01's stated blocker was already fixed.** The item
  claimed `_transcripts/*.md` was absent from `.gitignore`; it is at
  line 42 with a `!README.md` exception, and the folder and README
  exist. Only the save-or-retire question remains, as DOCS-01. In 26
  days the close ritual has produced zero transcripts, so retiring the
  reminder is a real option: a reminder nobody obeys trains the reader
  to skim the close.
- **Hot-read drift corrected, and this is why item 2 runs early.**
  `architecture.md` claimed "IndexedDB for autosave/session state"
  (there is none) and schema **v4** (the code is v5). `README.md` said
  M15's acceptance was pending and the M13 remainder was next (both
  shipped), and still advertised the settings-panel collapse and
  preview-focus mode (retired at M14), the capture region as
  aspect-locked to the pattern (default-off since D107), and
  lock/**prefer**/exclude (prefer retired, exclude dissolved into
  membership at M15). Every session hot-reads those files; a gateless
  run would have built on all of it.

**Memory maintenance, folded in.** Three of four accreting files were
over budget. `backlog.md` Active: **4,207 words → 2,000** against a
1,500 budget, by moving fifteen items' traced mechanisms into one shared
run sheet (`tickets/BATCH-C0.md` — one file, not fifteen, because they
ship together) and tightening the Icebox to the grammar's two lines.
The residual overrun is honest rather than green-washed: 36 open items
at two lines each has a floor near 1,800, and Batch C0's fifteen lines
evaporate when the run lands. `trajectory.md`: **3,225 → 1,005 words**,
M13's remainder and all of M14 archived to
`archive/trajectory/trajectory-0004-2026-08-04-to-2026-08-09.md`, and
M15's two separate sections — one "in progress", one "agent work
complete" — merged into one **SHIPPED** section, which was itself drift.
`decision-log.md` is at 43 live entries against a 20 budget; the archive
split is **proposed, not performed** — it is the most delicate protected
file, agents read only the latest ten headings, and splitting it in the
same commit as everything else would have buried the diff.

**Alternatives rejected.** Renumbering the milestones into ship order
(breaks greppability across tickets and 149 entries for cosmetic
tidiness). Keeping M16 as a milestone (it cannot be specified before M9
and M11). Cutting ICE-ADJUST-01 (the argument depended on an upstream
editor the new audience may not have — see above). Running the autojazz
batch immediately (the rename, the doc drift and the red audit suite all
get more expensive, not less, once a large run has written over them).
Compressing Batch C0's traced mechanisms away to hit the word budget:
they were paid for at an expensive sitting and are the difference
between a twenty-minute fix and a two-hour rediscovery.

**Scope.** `backlog.md` (rewritten), `trajectory.md`, `brief.md`,
`architecture.md`, `README.md`, `wish-list.md` (triaged, three lines
left), `doc-deltas.md` (+4, now 9 open), `archive/INDEX.md`,
`archive/trajectory/trajectory-0004-*.md` (new),
`tickets/BATCH-C0.md` (new), `tickets/M15-DATA-01.md` →
`tickets/DATA-01.md`. No source changed; `check` green before and after.

**Link:** Batch C0 becomes Current, Track A becomes Next, Track B and a
regrouped Icebox follow. RENAME-01's tier is the one answer needed
before the batch can run.

## D150 — RENAME-01: the product becomes Pattern Mapper; two storage identifiers are treated differently on purpose (2026-08-11)

**Decision.** The rename ships at the owner's chosen tier 3 ("everything
you can"). Every user-facing string, both HTML titles, the diagnostics
bundle and email, three error messages, the Rust crate description,
`package.json`, the launch config, all live docs including the protected
trio, and the localStorage key now read **Pattern Mapper**. Two things
deliberately do not.

**The IndexedDB database name stays `cross-stitch-lens`.** This is the
substantive decision in the entry, and it is a refusal, not an
oversight. IndexedDB has no rename operation: changing `DB_NAME` does
not move a database, it points at a different, empty one. Migrating
would mean opening both connections and copying four object stores —
`inventory`, `palettes`, `profiles`, `user-colors`, which between them
hold the owner's hand-curated thread inventory and every profile they
have signed — then carrying that copy path forever, all to change an
identifier no user will ever see. The value is zero and the downside is
losing curated data to a migration that fails halfway. Storage keys
outliving product names is ordinary practice. The reasoning is written
onto the constant so the next agent does not "finish the job".

**The localStorage key *was* renamed**, and the asymmetry is the point:
`cross-stitch-lens.shell` → `pattern-mapper.shell` with a legacy
fallback read is three lines inside a pure function whose worst failure
mode is falling back to defaults. A data-copy across four async object
stores is a different kind of change. One is safe, so it happened; the
other is not, so it did not. `loadPreferences` prefers the current key
whenever it holds anything, so a post-rename write is never overridden
by a stale legacy record, and the legacy key is **not deleted** after a
successful read — it costs a few hundred bytes and means a downgrade to
an older build still finds its preferences. Five tests pin all of it:
legacy read, current-wins, forward migration on write, legacy record
left intact, and both-absent falling back to defaults.

**Deliberately untouched.** `pm_skills/project/archive/**` and every
existing `decision-log.md` entry (append-only history — the app *was*
called Cross Stitch Lens, and rewriting that would make the record
lie), and `bench-reports/**` (recorded measurements carry the name in
provenance strings; renaming a measurement rewrites history).
`docs/requirements.md` had its prose renamed and its section numbers
left alone, since the memory files cite it by number.

**The git remote and `repository.url` still name the old repo**, because
the repo has not been renamed. Pointing them at a URL that does not
exist yet would be worse than leaving them accurate. Tracked as
RENAME-02 with the owner's two steps: rename the GitHub repo, and rename
the OneDrive directory with no session running against the path
(hostile-filesystem guard). The agent finishes the remote afterwards.

**Doc-deltas.** Two ticked and applied in the same sitting, as the D149
capture line required: AGENTS.md § Product identity (the name, plus the
audience widening — "macOS-first" retired and the
no-upstream-editor-assumed premise recorded) and the protected-doc
rename sweep, where DEV-INFRASTRUCTURE.md turned out to carry no
occurrence. Two "macOS-first" leads in `README.md` and `brief.md` were
corrected while there, since they now contradicted the widened audience
two paragraphs below them.

**Alternatives rejected.** Renaming the database with a copy migration
(above). Deleting the legacy preferences key after reading it (a
downgrade would then silently reset the user's disclosure choices).
Hand-editing `package-lock.json` (it is a managed file; `npm install
--package-lock-only` regenerated it). Renaming the archives for
consistency (it would make append-only history untrue).

**Scope.** `src/main.ts`, `src/diagnostics/bundle.ts`,
`src/ui/diagnostics-button.ts`, `src/ui/preferences.ts`,
`src/ui/styles/tokens.css`, `src/core/project.ts`,
`src/library/records.ts`, `src/library/store.ts`, `tests/shell.test.ts`
(+5 tests), `tests/diagnostics-bundle.test.ts`,
`tests/debug-menu.test.ts`, `index.html`, `bench.html`,
`bench-source.html`, `crates/stitch-engine/Cargo.toml`, `package.json`,
`package-lock.json`, `.claude/launch.json`, `.gitignore`,
`.windsurf/workflows/next.md`, `AGENTS.md`, `UI-STANDARDS.md`,
`README.md`, `docs/measurement-contract.md`,
`docs/browser-measurement.md`, and the memory files. `check` green.

**Link:** RENAME-02 carries the two owner steps. Batch C0 continues at
the doc-sync pass, then AUDIT-01 → ROUTE-01.

## D151 — The doc-sync drains, AUDIT-01 corrects a stale shape and a slack bound, and ROUTE-01 is settled as noise (2026-08-11)

**Decision.** The three preconditions Batch C0 named for trusting a
gateless run are met: the rename is complete (D150), the hot-read and
protected docs are true again, and `npm run audit` is green.

**The doc-sync pass: 9 open deltas → 1.** Applied, each against the
source entry rather than a stored instruction (the DOC-1 lesson):

- **AGENTS.md § The four resolutions** — the derive-scale control is the
  **Zoom** slider, renamed from "Stitch size" at M14-EXT-40; "Stitch
  size" survives only as the Stats readout of the same ratio. The D52
  collision is now recorded *in the contract* rather than only in
  `scales.ts`: "Zoom" means source px per stitch here and preview CSS px
  per stitch in the view strip, the helper text is the disambiguation,
  and it is explicitly **not** a precedent — a bare `scale` label stays
  banned.
- **AGENTS.md § Performance** — budgets bind at **two** boundaries now,
  and conflating them is the error the entry guards against: `bench`
  asserts node regression baselines (×1.35, staleness-guarded), while
  `bench:auto` asserts the **product promise** in a browser and exits
  non-zero on a missed rate or a dropped frame (D142). Only driven base
  capture rows may bind a target.
- **AGENTS.md § Scope guards** — the committed fence is Batch C0 → Track
  A → Track B, and ship order is not milestone-number order (D149).
- **UI-STANDARDS.md § Layout model** — the controls census was three
  milestones stale. It listed Pattern/Grid/Colour/Dither/Pipeline as
  sections and an info strip docked below the preview; none of that is
  true. Replaced with the real census, each retirement named.
- **UI-STANDARDS.md § Conflict and explanation pattern** — the
  three-disjoint-rules anatomy retired at M15: exclude dissolved into
  profile membership, prefer was removed outright, lock became Must use.
  Recorded so the *principle* survives its shape — M15 made the
  contradiction unrepresentable rather than merely unclickable, which is
  a strengthening, not a loss.
- **DEV-INFRASTRUCTURE.md § `bench:auto`** — the validation summary
  described a report writer; the command now also asserts product
  targets and fails on a missed promise.

Caught in passing and fixed: the command table called `check` **7
non-mutating steps** and listed seven, omitting `check:contrast`. It is
eight. A gate census that cannot count its own steps is exactly the
drift a doc-sync exists to catch.

The one survivor is deferred **by its own terms**: AGENTS.md's
persistence checklist reads as though project state persists
automatically, and DUR-01 is about to change what the true answer is.
Syncing it now would mean syncing it twice.

**AUDIT-01 — two different faults under one item.**

The failing assertion was not catching a defect, it was testing a shape
the app stopped producing. `runtime.audit` hand-simulated the draft
substitution as `{ ...config, dither: false }` and asserted a boolean;
M8 made dither a discriminated `DitherConfig` union (D61/D62). Rather
than fix the literal, the audit now mirrors what `liveConfig()`
*actually does* — `{ algorithm: 'none' }`, behind its real guard (a
palette is set and dithering is on) — and asserts the guard fires before
asserting the invariant, so the audit cannot silently prove nothing on a
workload the substitution declines. The invariant itself is unchanged
and still holds: draft turns dithering off in a **copy**, and the
original the exporter uses is untouched.

The `p533` labels were the same class. `loadDmcPalette()` returns 489
and always has; the bench axis corrected this at bv2 (M13-MEAS-01) and
the matrix and audit axes never followed. Renamed across the live test
surfaces, and the regenerated `docs/acceptance-matrix.md` follows from
`rows.ts`, not by hand.

**One of those labels was load-bearing.** `dither-pruning` asserted
`mean < 533 / 5` on the real DMC palette — a bound ~9 % slacker than
intended, derived from a count the catalogue never had. It is now
`dmc.entries.length / 5`, so it cannot drift again when the catalogue
changes. A mislabel that had quietly become a weaker test is the best
argument for treating label drift as real work.

**ROUTE-01 — settled as noise, with the mechanism identified.** The item
insisted this not be lumped in with AUDIT-01's stale assertions, and it
was right to. Reading the `margin` column, as its Done-when asks:

- **Quiet machine:** all sixteen rows separate by **1.35×–4.02×**, zero
  disagreements. The router's metric-based policy (lab → ts, rgb →
  wasm) is correct across the entire matrix.
- **Under deliberate 10-core load** (the sweep ran 39 % slower): still
  zero disagreements, but the narrowest row — `200²/64/lab` — collapsed
  from **1.77× to 1.24×**. That is the row with the least headroom, and
  it is almost certainly the one that flipped when the failure was first
  seen.

So the disagreement was the measurement, not the router: the sweep picks
its winner by comparing two medians, and a load-inflated median is
indistinguishable from a real regression. The fix is the one ROUTE-01
prescribed — tolerate ties. A disagreement now fails only when the
margin is **≥ 1.25×**; below that the row is reported as a near tie and
not counted. The threshold is evidence-derived (every quiet row clears
1.35×), not picked. Verified both ways: green quiet, and green under the
load that previously broke it, with `200²/64/lab` correctly classified.

This matters beyond the audit: **M13-SYNTH-01 (D135) signed off "routing
confirmed unchanged"**, and that claim now rests on a sweep that no
longer flips with machine load. Near-tie disagreements are still
published in the findings, so nothing is swept away — a genuine policy
break shows the *opposite* winner at a decisive margin and still fails.

**Alternatives rejected.** Fixing the audit's literal `dither: false` to
`{ algorithm: 'none' }` without mirroring the real guard (it would keep
a simulation that can drift from `liveConfig()` again). Re-running
ROUTE-01 until it passed and calling it fixed — it *did* pass on the
first re-run, which is precisely the trap: an intermittent assertion
trains you to re-run rather than to look. Renaming `533` inside
`performance-evidence.md`, `browser-measurement.md`, `bench-reports/`
and the archives: those are recorded measurements, and renaming a
measurement rewrites history (D150's principle).

**Scope.** `AGENTS.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md`,
`doc-deltas.md` (9 → 1 open), `tests/audits/runtime.audit.test.ts`,
`tests/audits/routing.audit.test.ts`,
`tests/audits/orchestration.audit.test.ts`,
`tests/audits/dither.audit.test.ts`,
`tests/audits/lut-reduce.audit.test.ts`,
`tests/audits/m8-dither.audit.test.ts`,
`tests/audits/wasm-boundary.audit.test.ts`,
`tests/audits/candidates/dither-candidates.ts`, `tests/matrix/rows.ts`,
`tests/acceptance-matrix.test.ts`, `tests/dither-pruning.test.ts`,
`tests/backend-select.test.ts`, `tests/wasm-dither.test.ts`,
`tests/benchmark.test.ts`, `docs/acceptance-matrix.md` (regenerated).
`check` and `audit` both green.

**Link:** Batch C0's three preconditions are met; the remaining eleven
items are order-free.

## D152 — DIAG-01 and KEY-01: the diagnostics buffer keeps faults, and the PDF key stops repeating itself (2026-08-11)

**Decision.** Two independent defects from the 2026-08-09 sitting, both
with mechanisms already traced, both fixed with the regression fixture
the finding named.

**DIAG-01 — three separate things, not one.** The item read as "downgrade
a noisy message", but its acceptance condition asked for three, and each
needed its own change:

1. **Known-benign notifications are downgraded, not dropped.** The
   ResizeObserver loop message — both wordings, since engines differ —
   is logged at `debug` with its reason stated in code beside a list
   that is explicitly a silencer, so anything added to it must be
   genuinely benign rather than merely inconvenient. Matched by prefix,
   and a real fault whose message merely *contains* the phrase still
   lands at error (there is a test for exactly that, because a silencer
   that over-matches is worse than the noise).
2. **Real faults keep their evidence.** `installGlobalCapture` recorded
   `message` and `source` but no **stack**, so an uncaught error said
   something broke without saying where. Both the error and the
   unhandled-rejection paths now carry one when the payload is an
   `Error`, and omit the field rather than inventing it when it is not.
3. **Eviction prefers noise over faults.** This is the part the item's
   last clause asked for and the one a quick reading would skip. The
   buffer used `shift()`, so a burst of routine chatter evicts the very
   error you opened the diagnostics for — downgrading the ResizeObserver
   message reduces that pressure but does not remove it, because debug
   records still consume slots. `evictOne` now drops the oldest
   **non-error** record and falls back to the oldest only once the
   buffer is all errors. Bounded stays bounded; errors are simply last
   to go.

**KEY-01 — fixed in `keyLabel`, not at the call site.** The traced path
was right: for a generated colour with no CSS name, `entry.name` *is*
the hex, so `nonThreadLabel` returns "Web-safe #cccccc" and `keyLabel`
appended the hex a second time. The tempting fix is to stop passing
`reference: ''` from the export assembly, but that makes `keyLabel`
return the bare hex and throws away the honest "Web-safe" label D114
introduced. Suppressing the trailing hex when the label already carries
one fixes every row regardless of who builds the label, which is what
the acceptance condition ("never prints the same token twice") actually
asks for. Real threads are untouched: "DMC 310" cannot contain its own
hex, so "DMC 310 #000000" still reads correctly, and the suppression is
conditional so a *named* synthetic ("Retro 16 Lime") still gets its hex.

**The fixture is the point.** `keyLabel` was already unit-tested and
green, because the fixture used "Web-safe Lime" — a named colour. The
unnamed majority is the broken one, and that gap is precisely why the
defect reached an owner's printed export. The regression case is an
unnamed generated colour, plus a case-mismatch variant, plus a sweep
asserting no generated-map row repeats its hex. This is the same lesson
EXPORT-01 exists to institutionalise: a green unit test over a
flattering fixture proves less than it appears to.

**Alternatives rejected.** Filtering benign notifications out entirely
(they would vanish from the record, and "it did not happen" is a
different claim from "it happened and was harmless"). Token-level
deduplication in `keyLabel` (it would collapse legitimate repeats in a
brand name; the defect is specifically the appended hex). Bumping
`BUFFER_CAPACITY` instead of prioritising eviction (a bigger buffer
delays the loss, it does not stop it).

**Scope.** `src/diagnostics/log.ts`, `src/export/pdf.ts`,
`tests/diagnostics-log.test.ts` (new, 10 tests),
`tests/export-pdf.test.ts` (+5). `check` and `audit` green.

**Link:** Batch C0 continues; nine items remain, all order-free.

## D153 — EXPORT-01: the artefacts get asserted, and the suite refuses its own flattering fixture (2026-08-11)

**Decision.** An artefact-level export suite (22 tests) now runs inside
`check`. It takes a real pipeline output from `executeRequest` — the
same worker entry `acceptance-matrix` uses, so the LUT cache, candidate
cache and routing are all in the loop — and pushes it through the real
export assembly, asserting properties of what comes out.

**The key assembly moved to make this honest.** It was inline in
`main.ts`, so a test could only *reimplement* it — and two copies
agreeing proves nothing, which is the same failure that let KEY-01
ship. `buildKeyEntries` now lives in `src/export/key-entries.ts` and
both the app and the suite call it. This is the one production change in
the item, and it is what makes the rest of it mean anything.

**What is asserted, and why each earns its place.**

- **Clean PNG** — the frame is the grid exactly, so 1 stitch = 1 px.
- **Enlarged PNG** — dimensions are an exact integer multiple *and*
  every output pixel is a verbatim copy of its source pixel at ×2, ×3
  and ×7. Restated as a property: the enlargement invents no colour the
  frame did not contain. An interpolating resampler would blend across
  cell edges, and a stitch chart that blends is not a stitch chart.
- **Chart raster** — larger than the bare cells (grid and numbering need
  room), growing in both axes with cell size, and its own `maxCellPx`
  stays inside the canvas limit.
- **PDF** — parsed, not string-matched. One page; the requested box in
  points for A4, Letter and landscape; the image drawn with its aspect
  preserved and fitted inside the margins; the title present; and every
  key row carrying **exactly one hex and no repeated token**.

**Node cannot run the canvas encoders, and the suite says so rather
than pretending.** `encodePngBlob` and `encodeChartPng` need
`OffscreenCanvas`. Their *inputs* are pure and are asserted directly;
the PDF assembly is plain pdf-lib and runs whole, which is why the PDF
gets byte-level treatment and the PNGs get input-level treatment. The
test-only PNG encoder (node's built-in `zlib`, no new dependency) exists
solely to hand pdf-lib the bytes a browser would; nothing about the
app's own encoding is asserted through it.

**The suite caught itself repeating the mistake it exists to catch.**
First draft used a DMC palette for the realistic path. Mutation-testing
it — reverting the KEY-01 fix — showed only the *dedicated* guard
failing, because every DMC row is a real thread ("DMC 310 #000000") and
real threads never had the defect. The realistic case was the flattering
case. A second pipeline run over a **generated** colour map (`websafe`,
whose entries are named by their hex) now covers the shape that actually
broke, and the revert fails two tests instead of one.

That is the general lesson worth keeping: an artefact suite is only as
good as the *inputs* it drives, and "realistic" is not the same as
"covers the failure mode". Mutation-testing a new suite against the bug
it was written for is cheap and is the only way to know.

**Alternatives rejected.** Copying the key assembly into the test (two
copies agreeing is not evidence). Adding a PNG-decoding dependency to
assert the chart raster's pixels (the canvas encoders cannot run in Node
at all, so the dependency would buy nothing the layout assertions do not
already give). String-matching `/Type /Page` and the MediaBox numbers in
the PDF bytes — it failed, because pdf-lib compresses the object
structure, and parsing with `PDFDocument.load` is both correct and
robust to that.

**Scope.** `src/export/key-entries.ts` (new), `src/main.ts` (calls it;
`nonThreadLabel` import retired), `tests/export-artefacts.test.ts` (new,
22 tests). `check` and `audit` green, 1133 tests.

**Link:** Batch C0 continues; eight items remain.

## D154 — M8-GOLD-02: the four M8 methods get golden fixtures, over a crop chosen for difficulty (2026-08-11)

**Decision.** Atkinson, Jarvis, ordered (Bayer 8×8) and blue noise now
carry committed golden fixtures under `tests/golden/`, asserted
bit-exactly alongside the Floyd–Steinberg golden that has existed since
M1. They pin today's owner-signed output so a future WASM or WebGPU
backend cannot drift silently — the entire reason the FS golden exists.

Owner-approved 2026-08-09 at the combined sitting, after judging all
five methods: the best-evidenced moment that decision would get.
`tests/golden/**` remains protected — any later regeneration needs its
own approval with a stated algorithm reason, never to make a failing
test pass. `dither-algorithms.test.ts`'s docstring said M8 fixtures
could not be added without that approval; it now records that they were.

**The source, and why it is not the JPEG.** The owner asked for
`landscape-1`, then agreed the reasoning: a small crop *derived from*
`public/profile-demo/landscape-1.jpg`, committed as a JSON pixel buffer
in the existing 8×8 house style. A golden fixture must stay diffable
when it fails — a 2048² expected buffer is four million pixels of
unreadable diff — and JPEG decoding varies across platforms and library
versions, which would break bit-exactness for reasons that have nothing
to do with the dither maths. Real photographic colour, tiny artefact.

**The crop was chosen, not picked.** The first attempt took a plausible
region by eye and produced a nearly flat beige patch: 12 near-identical
colours. Dither methods barely diverge on a flat patch, so those
fixtures would have pinned almost nothing while looking like real
coverage. The committed crop comes from scanning the whole image for the
8×8 window with the widest channel spread — (320, 768), where all 64
pixels are distinct and the range is 6–255. Extracted 1:1 through the
browser (Node cannot decode JPEG without a dependency), so no scaling
filter is in the fixture; the JSON is what ships and the extraction is
not part of the build.

**Proven to discriminate, not merely to exist.** Two extra assertions
carry that: the four fixtures are pairwise distinct (5–11 of 64 pixels
differ between any pair) and every fixture pixel is a palette colour. A
fixture set where two methods agreed would pin nothing about either, and
that failure is invisible unless something checks for it.

**One shared input, four expected buffers.** The ticket says "an
`.input.json`/`.expected.json` pair" per method; committing the same
input bytes four times would be worse in every respect. Each method has
an input and an expected — the input is simply shared, and named
`m8-crop-8x8.input.json` so its role is legible.

**Alternatives rejected.** Committing the JPEG (above). A synthetic
gradient — `dither-algorithms.test.ts` already generates those for its
invariants; the owner asked for real photographic colour, and the
distinction is the point of this item. Regenerating on the fly rather
than committing (that is not a golden, it is a tautology).

**Scope.** `tests/golden/m8-crop-8x8.input.json`,
`tests/golden/m8-{atkinson,jarvis,ordered,blue-noise}-8x8.expected.json`
(all new), `tests/dither-algorithms.test.ts` (+7 tests, docstring).
`check` green, 1139 tests.

**Link:** Batch C0 continues; seven items remain.

## D155 — DATA-01: the sweep becomes a committed audit, and the owner's worklist becomes a diffable document (2026-08-11)

**Decision.** The thread-catalogue sweep ships as
`tests/audits/catalogue.audit.test.ts` — `AUDIT=1`, beside the gallery
audit whose pattern it follows — reporting exactly the two
machine-certain classes from D151's split, with the judgement classes
left to DATA-02/DATA-03 by design. The sweep **validates the ticket's
hand-counted numbers**: 21 unnamed rows, every one Finca (9.6 % of that
brand, one ingest gap rather than 21 slips), and 11 same-brand
identical-hex groups covering 22 rows. Every brand+reference pair is
unique and every hex is well formed.

**Two rankings the ticket did not ask for**, added because "eleven
groups to inspect" is a chore and a ranked list is a decision aid: four
of the eleven pairs are **consecutive references** (45175/45176,
45312/45313, 45199/45200, 45001/45002 — the shape a copied-down
spreadsheet cell makes, and all Sullivans), and 6 of 11 groups sit in
that one brand — the same concentration shape as class 1's Finca rows.
Both point at per-brand ingest defects, not scattered typos, which
changes how the owner should attack the list.

**The worklist is a generated document, not a buried artefact.** The
JSON report lands in `bench-reports/`, which is gitignored — correct for
measurements, useless for a worklist the owner must act on across
sessions. So the sweep also writes `docs/catalogue-sweep.md`: generated,
hand-edit-forbidden, and **deliberately timestamp-free**, so re-running
after a round of corrections produces a byte-identical file unless the
data changed — the delta is a plain git diff. Verified: the audit re-run
regenerated it byte-identical.

**Gating philosophy, stated in the file.** The two data classes are
reported, never gated — a failing assertion over owner data the agent
may not edit would block every unrelated task. What *is* asserted are
the generator's own promises (unique `brandId:reference`, well-formed
lower-case hex): a breach there means `build-palette.mjs` broke, which
is agent-fixable and should fail loudly.

**Alternatives rejected.** Gating on the findings (above). Committing
the JSON artefact instead of a doc (bench-reports stays untracked by
policy, and JSON is not a worklist). Timestamping the generated doc
(kills the diff signal). Folding the name-versus-colour probe back in
(D151 split it precisely because its 402-hit noise floor needs its own
design or the owner's eyes).

**Lifecycle.** DATA-01 stays open as a `[maintainer]` item in the
Icebox: the detection half is done, the corrections half is the owner's
(`thread-list.csv` → regenerate → re-run the sweep). The ticket file
survives per its own D149 note — the sweep outlives the run that built
it.

**Scope.** `tests/audits/catalogue.audit.test.ts` (new, 5 tests),
`docs/catalogue-sweep.md` (generated). `check` and `audit` green — the
audit suite now runs 55 tests across 12 files.

**Link:** Batch C0 continues; seven items remain. A parallel session's
uncommitted work (cloud-session provisioning + a `check-docs` CI-parity
fix) was found in the tree during this close and deliberately left
unstaged — its own session commits it.

## D156 — UI-06 and A11Y-01: the colour key joins its subject, and accessible names become a tripwire (2026-08-11)

**UI-06.** "Colours used" moves from its top-level home in the content
column into the **Colour section's panel** — it is a readout *of* the
colour choices, and a separate section split one subject across two
places while lengthening the shell (the owner's ask at the 2026-08-09
sitting; pairs with ICE-WIDTH-01). It keeps its own accordion
disclosure, so it still opens and closes independently, and nothing
about what it lists changed. `createSection` gained an optional
`headingLevel` (default 2) and the nested section passes 3, so the
document outline stays honest rather than nesting an h2 inside another
h2's region. The shell×has-rows visibility writer is untouched.
Verified in the running app: the key renders inside
`#section-colour-panel` with an h3, toggles independently, carries the
same rows (`DMC 310 Black …`), and the console is clean. No test
pinned the old placement, so none moved.

**A11Y-01.** The automatable half of the screen-reader pass, split
from A11Y-VO-01 by D149's triage. With no DOM environment installed
and a new dependency forbidden, the honest node-shape is a
**source-scan tripwire** (`tests/a11y-names.test.ts`, the
`ui-styles.test.ts` lineage): every raw
`createElement('button'|'input'|'select'|'textarea')` site — 66 across
the product UI — must carry a recognised name-wiring signal beside it.
The signals were derived from the codebase's real patterns, not
imagined: `textContent`, `aria-label and aria-labelledby`, id↔`htmlFor` association
matched textually so literals, shared identifiers and template
literals all count, appended named spans (the accordion's shape), and
the tree-removing exemptions (`hidden`, `aria-hidden`). Zero
exceptions were needed — every current site's wiring is visible to the
scanner — and the exceptions list is asserted against rot.

Three things keep it from being hollow: a **mutation test** (an
unnamed probe button fails the suite, named by file and line), a
**self-test** floor (a scan matching under 50 sites means the scanner
broke, not that the controls left), and the explicit statement of what
it is: a tripwire that forces new controls to wire a name where the
scanner can see it, never a proof of name *quality* — which is
precisely the half A11Y-VO-01 keeps for VoiceOver.

**Alternatives rejected.** A DOM environment (jsdom/happy-dom — not
installed, and the no-new-dependency rule is A11Y-01's own text). A
window-only heuristic without identifier tracking (the first prototype
flagged 20 of 66 sites; identifier-tracked signals got it to 8, and
reading those 8 by hand showed all were wired — the flags were scanner
blindness, so the scanner learned the patterns rather than the code
gaining exceptions). Asserting builder usage only (main.ts creates
controls raw, legitimately).

**Scope.** `src/main.ts`, `src/ui/accordion.ts`,
`tests/a11y-names.test.ts` (new, 3 tests). Gate green.

**Link:** Batch C0 continues.

## D157 — FLICKER-01 and ZOOM-01: both mechanisms confirmed before fixing, and one ticket suspect was wrong (2026-08-11)

Both items carried the same instruction — confirm the mechanism before
proposing a fix — and the instruction earned its keep twice: one
suspicion confirmed precisely, one overturned.

**FLICKER-01, confirmed as suspected.** `setCount` calls
`invalidateSelectionSource()` and then `applyColour()` resolves
**synchronously with no selection source** while the replacement is
fetched async; `resolveProfilePalette` with no source resolves a count
limit to the **full permitted set** (the documented first-frame
two-step), and `reprocess()` painted it. That interim wide render *is*
the owner's "original high-colour picture between values". Observed
live before fixing: a single count event produced `24 → 17 → 24` in
the Colours-in-use stat — an intermediate frame under a different
palette.

The fix is the run sheet's named conservative option: **hold the
previous reduced frame**. `applyColour` now returns early while
`selectionPending`, keeping the old palette and frame; the fetch's
completion handler re-resolves and reprocesses the moment the source
lands, so the swap is old-reduced → new-reduced and never passes
through wide. Verified live after: stepping 24→8 samples as
`24 · limit 8` → `8 · limit 8` with no intermediate. Deliberately
bypassed by source *replacements* (new artwork reprocesses immediately
with the old palette — showing the new picture beats holding a stale
one, and that two-step stays documented behaviour). The draft
governor's honesty is untouched.

**ZOOM-01, suspect overturned.** The ticket suspected the fit→manual
handover freezing the host height at a rounded value. Reading the
geometry disproved it — `goManual()` never resizes the host,
`zoomAt` is continuous, `clampPan` is loose — and the real mechanism
sat one layer up: **`onFrame` re-derived the view on every processed
frame**, and manual-mode `applyMode` re-derives through `scaledView`,
which **re-centres**. Under live capture (~4 frames/sec), the wheel
zoom landed anchored at the pointer and the next frame threw the
anchor away within ≤ 250 ms — the visible snap. The same mechanism
was quietly discarding **pans** under live capture too, a worse defect
hiding under the same line.

Fix: `onFrame` re-derives only when the stitch dimensions actually
changed (a new pattern has no meaningful anchor to preserve);
same-size frames leave the user's view alone; host resizes were
already the ResizeObserver's job. The engaged-only wheel contract
(M14-EXT-27) is untouched — the acceptance condition names it. The
"moves smoothly by feel" half is a one-line human check at the next
sitting; the mechanism fix is complete.

**Worth keeping.** A traced-and-named suspect is still a hypothesis.
FLICKER's suspect survived contact with the code; ZOOM's did not, and
fixing the named suspect would have shipped a no-op "fix" while the
real defect stayed. The run sheet's confirm-first instruction is the
cheap insurance that caught it.

**Scope.** `src/main.ts` (applyColour), `src/ui/preview.ts` (onFrame).
Gate green; behavioural verification live in the running app for
FLICKER, by mechanism for ZOOM.

**Link:** Batch C0 continues.

## D158 — STALE-01 closes as accepted; DOCS-01 lands as one command instead of a retired reminder (2026-08-11)

**STALE-01.** Closed **as accepted**, the run sheet's conservative
default, on the owner's own recorded words ("a bit sluggish but can
live with", D148). Sub-2 px edits are invisible to dirty detection by
design and surface via the staleness bound; that is the accepted
trade. The remedy stays on file, not taken: lowering
`DIRTY_MAX_STALE_MS` (`src/capture/dirty.ts:54`, 2000 ms) requires
bench evidence that the extra full-frame comparisons keep the
≥ 4 updates/sec promise — a promise that is now *asserted* by
`bench:auto`, which is exactly why a gateless run must not trade it
for a comfort already accepted.

**DOCS-01.** The investigation flipped the expected outcome. The
item's original suspicion — the macOS Claude *Desktop* app's storage
is unusable — is true (Chromium blobs). But these sessions run on
**Claude Code**, whose transcripts persist as plain JSONL under
`~/.claude/projects/<cwd-slug>/`, fully readable: 52 sessions under
the pre-rename slug alone. So the ritual's failure was never a missing
data source — it was the absence of one command. Retiring the
reminder would have recorded the wrong conclusion.

`npm run transcript` now lists the project's sessions and exports a
chosen one to `_transcripts/` as **redacted** markdown. Redaction is
applied, not promised: the check-secrets key shapes are scrubbed (not
merely reported), data-URIs and base64 runs elide, tool results
truncate to a head — the dialogue is the evidence; full tool dumps
are where screen content hides — thinking blocks and sidechains drop
entirely, and the home path collapses to `~`. Six tests pin the scrub
rules, because a redaction regression is a leak into whatever chat
window a transcript gets pasted into. The output stays gitignored
regardless — redaction here is a floor, and the read-before-sharing
rule stands (`_transcripts/README.md`, updated with the command;
DEV-INFRASTRUCTURE's command table gained the row its own standing
rule requires).

The live smoke test exported this project's *other* current session —
the first transcript ever saved — and caught a D150 residue in
passing: `package.json`'s `description` still opened "Cross Stitch
Lens" (the third of that file's three occurrences; D150 fixed name
and repository URL). Fixed. Pre-rename sessions stay reachable via
`--dir` with the old slug.

**DITH-06 drafted, not applied.** The seven method-led names are in
`tickets/BATCH-C0.md` awaiting signature — method first, the setting
as the qualifier, no mood words ("Atkinson (half strength)",
"Floyd–Steinberg (damped)", "Ordered (Bayer 8×8)"…). Confirmed before
drafting: `sameDither`/`matchBuiltInDither` match on config alone, so
a signed rename is label-only and every existing reference resolves.
The one open flag: two drafted names are longer than the mood words
they replace — re-check the Processing select at the narrow floor at
apply time.

**Also parked:** the audit-after-check flake (2 intermittent failures
when `npm run audit` runs immediately after a full `check`; observed
twice, green on every immediate re-run, failing pair not yet captured)
— one wish-list line with the capture instruction, so the next
occurrence gets named instead of re-run.

**Scope.** `scripts/save-transcript.mjs` (new),
`tests/save-transcript.test.ts` (new, 6 tests), `package.json`
(description fix + `transcript` script), `DEV-INFRASTRUCTURE.md`
(command-table row), `_transcripts/README.md`, wish-list. Gate green.

**Link:** Batch C0's queue is empty but for DITH-06's signature. The
batch's close condition (`check` and `audit` green) is met.

## D159 — DITH-06 signs, and Batch C0 closes whole (2026-08-11)

**Decision.** The owner signed the seven drafted names as presented
("great, commit and push" on the drafted table), and they are applied:
**None · Atkinson (half strength) · Floyd–Steinberg · Blue noise
(boosted) · Jarvis · Ordered (Bayer 8×8) · Floyd–Steinberg (damped)**.
The method leads, the parenthetical is the setting in plain words, and
the mood words retire — the gallery's own naming discipline
(style-descriptive, honest) applied to the place where the method *is*
the fact. The `basis` evidence lines are untouched.

**Label-only by construction, and verified anyway.** Ids are identity
and did not change; `sameDither`/`matchBuiltInDither` match on config
alone, so no saved project or profile reference can be orphaned by a
label. Verified live in the running app: the `dither-profile` select
reads all seven new names with each ref resolving to its "(built-in)"
profile, and the page shows no horizontal overflow — the two longer
names truncate inside the `width: 100%` field rather than widening the
narrow column, which was the one flag raised at drafting.

**Batch C0 closes.** Fifteen items in one day, all shipped, both gates
green (`check` 1,148 tests, `audit` 55). The run sheet
(`tickets/BATCH-C0.md`) is deleted per its own lifecycle; everything
that outlives the batch already lives elsewhere — DATA-01's
corrections half ([maintainer], `tickets/DATA-01.md`,
`docs/catalogue-sweep.md`), A11Y-VO-01's human half, ZOOM-01's
one-line feel-check for the next sitting, and the audit-after-check
flake on the wish-list with capture instructions.

**What the batch was for, settled.** It existed to make a gateless run
trustworthy before Track A: the rename happened before the run wrote
prose, the hot-read docs were made true before anything built on them,
and the audits went green before they were needed as a signal. The
close makes **Track A Current**, and its first move is a human one —
M9's scope sitting (symbol language, the licence question that now
depends on distribution intent, manual-override scope).

**Scope.** `src/core/pipeline/dither-presets.ts` (labels + provenance
note), `tickets/BATCH-C0.md` (deleted), backlog (Batch C0 section
retired, Track A promoted), trajectory (batch outcome + DITH-06),
this entry. `check` green.

**Link:** Track A is Current. Next session: Start A on M9's scope
sitting, full mode — it is a [sign-off] milestone.

## D160 — M9's scope signs in-session, and publication gets its licence baseline (2026-08-11)

**M9 scope signed.** The owner accepted the agent's four
recommendations whole ("accepted"), making the async exchange the
scope sitting. The decisions, recorded in full in `tickets/M9.md`:
**app-owned vector glyphs** (a reviewed ~64-set signed in batches
through the gallery process, refusal past the set — no silent reuse);
the **licence question dissolved** by that choice, decoupling M9 from
ICE-TAURI-01; **overrides from the unused pool only** with explicit
swap (collisions unrepresentable — the M15 membership lesson applied);
and **assignment as identity-keyed persisted state**, which dissolves
the stable-algorithm problem into the project-file pattern the app
already has. The standard-font route died on the ticket's own
machine-independence rule (the chart raster renders with *system*
fonts); the embedded-font route on the fontkit runtime dependency plus
a permanent licence surface. What keeps M9 `[sign-off]` is the glyph
batches — printed-evidence signatures, the D139/D146 process.

**PUB-01 opens, on an audit rather than a worry.** The owner's ask —
licences for public use on their website — was grounded the same hour:
one npm runtime dependency (pdf-lib, MIT © 2019 Andrew Dillon), two
crates in the shipped wasm (wasm-bindgen, libm, both MIT/Apache-2.0 —
libm carries the fdlibm lineage its own licence covers), blue noise
generated in-house (D61: nothing stochastic ships), no Carbon code or
copied icon paths, PDF standard fonts referenced not embedded, demo
images owner-supplied (confirmation of rights is one of the three
owner decisions). `Cargo.toml` already declares `UNLICENSED`;
`package.json` now matches, so the proprietary *default* is explicit
everywhere pending the real decision. **The headline finding: the
GitHub repo is public with no licence** — all rights reserved by
default while fully visible, which is a fine holding position only if
it is chosen rather than accidental. That choice, the demo-image
confirmation, and the catalogue's nominative-use posture are PUB-01's
three owner decisions; the notices file and its in-app surface are
agent work the moment the first is made.

**Structural.** Track C — Publication opens as the home for this and
future deploy/hosting work; M9's and ICE-TAURI-01's backlog lines drop
their now-false coupling.

**Scope.** `tickets/M9.md`, `backlog.md`, `package.json`
(`license: "UNLICENSED"`), this entry. `check` green.

**Link:** M9's build can start gateless up to the first glyph batch;
PUB-01 waits on decision (a).

## D161 — The IP is protected today, the graphic becomes the owner's item, and the catalogue's provenance is corrected (2026-08-11)

**Decision (a) executed: proprietary, now.** "Protect the app IP for
now" is the owner's answer to PUB-01's licence question, and it shipped
the same hour: a `LICENSE` declaring all rights reserved with the
source publicly viewable and contributions unacceptable-by-construction
(no licence exists to merge them under), and `THIRD-PARTY-NOTICES.md`
carrying the three bundled components' verbatim MIT texts — pdf-lib
(© 2019 Andrew Dillon), wasm-bindgen (© 2014 Alex Crichton, MIT elected
from the dual), libm (MIT elected) — sourced from the installed
packages, not retyped from memory. `package.json` and `Cargo.toml`
already both said `UNLICENSED`, so every machine-readable field now
agrees with the human-readable one. The choice is the reversible one:
proprietary-now keeps every option open, including open-sourcing later;
the reverse move does not exist. PUB-01's remainder is the small in-app
surface that makes the notices reachable, plus shipping them with the
deploy when deploying becomes real.

**PUB-02 opens as the owner's item.** `graphic.jpg` is fan art of the
Amiga logo by DeviantArt user zgodzinski — the artist's copyright plus
the Amiga mark beneath it, which is not the artist's to license, so
even permission could not fully clear it. The owner replaces rather
than clears, on their own schedule; the slot needs only a flat-colour
hard-edged graphic, the `PHOTO_SLOTS` filename contract makes the swap
a zero-code change, and fixing HEAD without rewriting history is the
proportionate remedy (the D150 principle). The item gates public
deploy. The five photographs' owner-provenance still needs its one
explicit yes — load-bearing twice, since `landscape-1.jpg` seeded the
M8 golden crop.

**The provenance correction, and what it changed.** The owner
corrected the record: the catalogue's colour values are **compiled
from publicly circulating reference material, uncalibrated** — not
owner-measured, despite every row's `provenance: "measured"` field and
this log's own repetitions of that claim (D145/D155 among them, which
stand as written history). Three consequences, all applied:

- The **notices posture** was rewritten before it shipped: approximate
  compiled sRGB representations, not manufacturer specifications, not
  calibrated measurements, check a physical card before buying. That
  posture is honest *and* defensible — facts and approximations carry
  little protectable weight, the use is free and non-competing, and
  nothing manufacturer-published sits in the repo.
- **DATA-03 reshaped** from "verify measured against published"
  (void — the values were never measured) into finalisation: the
  owner finalises the values post-corrections and the provenance
  label is made honest at that point. Any change to the shipped
  values carries a test cascade — the `p489` matrix rows, the
  gallery evidence audit, and any catalogue-derived expectations
  re-pin under the golden-approval rule.
- The **standing constraint** the correction makes sharper:
  manufacturer-published lists stay out of the repo regardless — a
  committed copy of a brand's own colour card is the one thing that
  would turn a defensible posture into an extraction claim.

Calibrated own-measurement stays what the owner called it: a distant
task in the unlikely commercial event — at which point it also becomes
the clean-room answer to this entire paragraph.

**Scope.** `LICENSE` (new), `THIRD-PARTY-NOTICES.md` (new),
`cspell.json` (notices ignored as verbatim third-party text),
`backlog.md` (PUB-01 decided, PUB-02 new, DATA-03 reshaped),
`tickets/DATA-01.md` (correction block). `check` green.

**Link:** PUB-01's remainder is one small UI task; PUB-02 and DATA-03
are owner-paced; M9's build remains the open invitation.

## D162 — DATA-04 opens: the catalogue's structure gets reviewed before its values finalise (2026-08-12)

**Decision.** A bounded data-structure review of the thread catalogue
is added ahead of DATA-03, so the shape is settled before the values
are — one schema decision, one finalisation, one run of the
regeneration cascade instead of two.

**Why now.** DATA-03's finalisation is the natural moment to change
shape and values together, and the structural questions already exist
rather than being invented for the review: the `provenance` field is
recorded-inaccurate (D161) and needs an honest vocabulary; DATA-01's
21 unnamed rows pose a schema question (is an empty `name` legal, or
does display fall back?); the 3,338 → 2,830 distinct-colour figure
quoted in the protected docs is value-dependent and would drift with
any value change; M12's ticket explicitly anticipates per-brand
catalogue metadata (skein length as data, not formula branches);
`mappedFrom` sits null everywhere while ICE-XREF-01 proposes a
separate long/tidy equivalence table; and the generated catalogue
carries no data version for cache and snapshot hygiene.

**The ripple list is the point of doing it as a review.** Any schema
change touches `build-palette.mjs`, the `Thread` type, every
catalogue consumer — and, the subtle one, palette snapshots inside
saved project files: schema v5 embeds the ordered thread entries, so
a new field crosses into user data and meets the byte-identical
round-trip rule, with migration care to match.

**Scope.** `backlog.md` (DATA-04, sequenced before DATA-03), this
entry. Docs gate green.

**Link:** order of operations in the data cluster is now DATA-01
corrections → DATA-04 schema sign-off → DATA-03 finalisation, all
owner-paced; DATA-02 remains independent.

## D163 — PUB-03 opens: publication cuts from a clean initial commit, and DATA-04 gains the source-of-truth question (2026-08-12)

**Decision.** Two additions shaping how the project goes public.

**PUB-03.** At publication, the public repository will start from its
release state — one fresh initial commit of the finished tree — and
this repository, with its full development history, goes **private as
the permanent archive**. Privatise, never delete: the history remains
the owner's working record, including every decision entry's commit
references, which become archaeology rather than public links. This is
a common release pattern for projects developed personally and
published deliberately, and it has a concrete side benefit: PUB-02's
history residue (the encumbered demo image in old commits) ends at the
cut, because the new repository never contains it — which is exactly
why PUB-02 is a hard blocker: cutting first would re-inherit the
problem into the clean start.

Division of labour mirrors RENAME-02: the owner privatises the old
repository and creates the new one; the agent prepares the release
tree, cuts the initial commit, swaps `origin`, and verifies push and
gate from the unchanged working directory.

**DATA-04 widens by one question**: where the owner CSV's source of
truth lives — in-repo as today, or as a private owner-held master with
the repository carrying derived data. Owner data is owner data either
way; the question is what the published artefact derives from, and the
protected-files list and generator contract would both follow the
answer. It must be settled before DATA-03 finalises values, which is
already DATA-04's position in the cluster.

**Sequencing across the cluster and Track C now reads:** DATA-01
corrections → DATA-04 schema + source-of-truth sign-off → DATA-03
finalisation → PUB-02 image replacement → PUB-03 clean cut →
deploy-when-real. Owner-paced throughout; the agent halves of PUB-03
are mechanical once the owner's two steps are done.

**Scope.** `backlog.md` (PUB-03 new, DATA-04 widened), this entry.
Docs gate green.

**Link:** Track C is now a complete path from today's tree to a
publishable one.

## D164 — Publication stays in this repository; the clean cut becomes a dormant contingency (2026-08-12)

**Decision.** The owner weighed D163's clean-cut republication against
keeping this repository as the one continuous public record, and chose
continuity. PUB-03 is demoted from a Track C step to a dormant Icebox
contingency; PUB-02 and DATA-03 — which were always the items that fix
the tree itself — carry the publication path unchanged.

**The reasoning, on the record.** Three things tipped it. The
development history has real portfolio value: a hundred and seventy
commits of decision-logged, gate-verified work is a public
demonstration of how the project is built, and the cut would hide it.
Operationally, one repository is simpler than a swap. And the
protections that matter for the app's data and assets rest where they
have rested since D161 — on the stated posture in
`THIRD-PARTY-NOTICES.md` and on the replacement items themselves,
which fix what repository visitors and the deployed app actually see.
The residual that the cut would have addressed — that history remains
history — is accepted knowingly, as proportionate for a free personal
application, rather than overlooked.

**Two triggers wake the contingency**, named in the item so the
decision does not need re-deriving under pressure: a rights complaint
touching anything in this repository's history, or the app turning
commercial. On the commercial trigger the catalogue has its own
recorded endgame — first-party measurement of physical threads, which
supersedes the compiled values entirely and retires the provenance
question at the source.

**DATA-03 gains a landing note**: the finalisation lands as one
catalogue rebuild together with DATA-04's schema outcome and DATA-01's
corrections — one data revision, one regeneration cascade, one commit
that says what it is.

**Scope.** `backlog.md` (Track C intro, PUB-03 demoted to Icebox,
DATA-03 landing note), this entry. Docs gate green.

**Link:** Track C now reads: PUB-01 remainder (in-app notices surface)
→ PUB-02 → DATA-01/04/03 in cluster order → deploy-when-real. No cut
on the path.

## D165 — M9's build lands whole: one fill-only geometry model, need-based grants, schema v6 (2026-08-12)

**The build half of M9 shipped in one gateless run**, as D160's
signing intended: the 64-glyph draft catalogue, the assignment model,
project-file persistence, three chart modes across both chart
artefacts, the enriched key, the refusal paths, and the print-evidence
generator. What keeps M9 open is exactly what D160 said would: the
owner's batch signatures on printed evidence.

**Geometry: one path, no stroke.** Every glyph is a single fill-only
SVG path (M/L/C/Z, nonzero winding) with outlines carried as
reverse-wound inner contours — line weight is geometry, so canvas
`Path2D` and pdf-lib `drawSvgPath` cannot disagree about it, at any
scale, with zero renderer configuration. That is the strongest
possible reading of D160's "one geometry model", and it is why the
evidence sheet (vector, through the same `drawSvgPath` consumer the
key uses) signs what the artefacts draw.

**Grants happen at first need, not palette arrival.** "First need
takes the next unused symbol" is read literally: the moment of need is
a symbol-mode export, sequenced in palette order so frame content
never steers assignment. A 100-thread palette whose design uses 30
still exports; the queue only spends on threads that appear. Two
consequences got their deterministic shape here: departures release to
the queue **back** in grant order, and D160's "cross-brand replacement
resets" triggers on **zero surviving grants** — incremental edits
always have survivors, wholesale replacement never does, so no
heuristic and no UI wiring is needed.

**Persistence is schema v6**: a `symbols` block carrying grants, the
queue order (release history is state — it cannot be derived), and
overrides; plus `export.chartMode`. Migration seeds the empty state.
The M14 ui-baseline `projectJson` pin moved for the bump — an intended
schema change, not engine drift; the three engine hashes stand
untouched, which is the tripwire doing its job.

**Key discipline extended, not restated**: rows gained the glyph,
thread name, and stitch count; KEY-01's lesson (D152) now also
suppresses a name that repeats the label (DMC "White" named "White"),
and truncation spends the name before it may touch identity or count.

**Verification**: 1,198 tests green including the new suites (glyph
grammar + pinned canonical order, assignment semantics, v5→v6, chart
coverage refusals, enriched key); live app run confirmed symbol PNG +
PDF exports and the full-RGB refusal sentence. `check` green.

**Parallel note**: D162–D164 (Track C) landed from a parallel session
mid-run; this session's claim (symbols, exporters, schema, M9 memory)
never overlapped, and this entry took the next free number.

**Scope.** `src/core/symbols/*`, `src/core/project.ts` (v6),
`src/core/stats.ts` (STITCH_ALPHA export), `src/export/{chart,pdf,key-entries}.ts`,
`src/main.ts`, `scripts/gen-symbol-evidence.mjs` + `symbols:evidence`
script, tests, `tests/ui-baseline/hashes.json` (projectJson re-pin),
ticket, backlog, two doc-delta captures.

**Link:** M9 remains `[~]` until the batches sign; M10's page planner
can start against the same glyph model.

## D166 — Memory close-out ahead of Track A's next phase (2026-08-12)

**Pruned project memory** on the owner's close-out ask, clearing the
three budget trips the M9 close reported. The live decision log kept
D149–D165 — the current arc, from the roadmap reorganisation onward —
and archived D106–D148 verbatim (43 entries, M14 looks four onward
through the M15 build and the combined M13/M15 close) to
`archive/decision-log-2026-08-06-to-2026-08-09.md`; 60 → 17 live
entries. The trajectory archived its M15 phase verbatim to
`archive/trajectory/trajectory-0005-2026-08-07-to-2026-08-09.md`,
keeping Batch C0 live; 2,477 → 1,700 words. Both splits
diff-verified lossless before the swap.

**The backlog Active tightened** 2,700 → 1,631 words without touching
the queue: all 26 open items, their flags, dates, and Intent/Done-when
lines survive; what left was narrative duplicating decision-log prose
(the Track C audit story, D149 recaps, item asides), and the two
canonical template comments moved from the file's tail to the header
block so the Active count measures the queue, not documentation.
Nothing was cut, merged, promoted, or reordered. The residual ~130
over budget is deliberate: 26 items of mandated ticket grammar is the
floor, per the strip-noise-not-signal rule — the number recovers as
the sign-off-heavy items ship.

**Swept in passing**: the seven ticked doc-delta lines (applied at
D150/D151) deleted per ledger rules, leaving three open; and the
decision log's own title still read the pre-rename product name —
live-file metadata RENAME-01 missed, fixed (archived history stays
untouched, per D150).

**Scope.** `decision-log.md` (split + title), `trajectory.md` (split),
`backlog.md` (tightened), `doc-deltas.md` (sweep), two new archive
files, `archive/INDEX.md`. `check` green.

**Link:** the next session's Start B picks up a lean queue: M9 waits
only on glyph signatures; M11 is the next unstarted build.

## D167 — M11 ships: preset-led grid styling with a screen/print split (2026-08-12)

**M11 shipped in one checkpoint run** — scope and the option pick
signed in-session, stages 3–4 gateless per the mode. Grid furniture is
now preset-led: six built-ins (No grid, Fine, Every 5, Every 10,
Traditional, High-contrast print) applying paired **screen + print**
style blocks, with "Custom" a computed state, never a choice — the
option stays disabled and provenance recomputes on every edit, so
values landing back on a built-in relabel honestly.

**The shape that won (Option A):** flat extension of the one style
model plus immutable in-code presets — over B (grouped model with
per-target overrides: generality M11 didn't need, at real migration
risk) and C (a third kind on the M15 profile shell: disproportionate
for cheap per-design state, and it would widen the draft-then-save
§5.4 exception). Presets live in `src/core/grid-presets.ts` so the
migration can label a file whose values byte-match a built-in; the
project file always stores canonical values — the preset id is
provenance only, so a preset changing in a later release can never
restyle a saved design.

**Schema v7:** `gridStyle` splits into `{ screen, print, preset }`;
migration seeds both halves from the one v6 block (appearance
preserved exactly; untouched files label Every 10). The print half
ends the unit conflation — chart and PDF now read persisted raster-px
style, never DPR-scaled screen values. New fields: per-class colour,
opacity, dashed minors (one batched stroke), an outer border that owns
the boundary (edge-tagged lines).

**A17 closed:** the fixed 24 px preview gutter became `labelGutterPx`
(font size + digit count), shared with the chart margin — which was
itself one digit short at 1024².

**Verification:** `check` green at 1,219 tests (21 new: geometry,
presets-as-signing, v6→v7, layout); ui-baseline `projectJson`
re-pinned for the intended bump with the engine hashes untouched; live
run verified preset application, dash rendering, and a full in-app
save→load round trip carrying `fine` provenance.

**Scope.** `worker/grid.ts`, new `core/grid-style.ts` +
`core/grid-presets.ts`, both renderers, `ui/preview.ts` gutter, the
grid modal in `main.ts`, `core/project.ts` (v7), `shell.css` modal
scroll, tests, ticket deleted.

**Link:** M10 must decide dash phase and repeated numbering across
tiled pages; §16's residue (origins, edges, tick facing, fonts) stays
in requirements for a later slice.

## D168 — M10 ships: the chart PDF paginates from a pure planner (2026-08-12)

**M10 shipped in the autojazz run**, planner-first exactly as its
ticket drew the boundary. `planPages` (new `src/export/pages.ts`) is
pure and exhaustively tested: half-open global bounds, leading-edge
overlap repeated from the previous page, row-major order, impossible
settings returned as user-facing sentences — never thrown.

**Global coordinates, one geometry model:** `gridLines`/`tickLabels`
gained a `startStitch` origin and the chart encoder an `origin`, so a
tile classifies majors and numbers rows by **global** stitch — pages
agree at their joins, and `chartLayout` sizes margins for the largest
global label a tile can carry.

**Assembly:** a cover page (title, colour overview map with the
tiling drawn over it and page numbers in grey, thread key once — the
key drawing extracted to one shared `drawKey`), then one page per
tile at **one shared scale** so a taped-up assembly is ruler-true,
with corner alignment marks, dashed trim lines where leading overlap
repeats, and footers naming page, position, and global range.

**Modes:** `single` (the unchanged default) and `grid` (fixed fresh
stitches per page). Fixed-physical-mm scale is deferred to M16, which
owns print sizing. Schema **v8** adds the paging fields to
`export.pdf`; migration seeds `single`. The `[blocked: M9 for symbol
charts]` qualifier was treated as mechanism-satisfied per D165's own
Link line — glyph signatures affect artwork, never assembly; symbol
tiles reuse `drawSymbols` verbatim.

**Deferred, on record:** vector tile furniture (raster tiles stand),
per-page key policy, A3/custom sizes, fixed-mm scale (M16).

**Verification:** `check` green at 1,240 tests (+21: planner, global
offsets, assembly parsed under node, v8 migration); live run exported
a 200×200 design at 60/page as 17 pages (16 tiles + cover) and the
saved v8 file carries the paging; ui-baseline `projectJson` re-pinned
for the intended bump, engine hashes untouched.

**Scope.** `export/pages.ts` (new), `export/pdf.ts`, `worker/grid.ts`,
`export/chart.ts`, `main.ts`, `core/project.ts` (v8), five test
suites, ticket deleted.

**Link:** the physical tape-and-ruler assembly rehearsal folds into
M16's sign-off sitting; M12 is Track A's remainder.

## D169 — M12 ships: fabric sizing and qualified thread estimates (2026-08-12)

**M12 shipped in the autojazz run**, closing Track A's build half. A
pure estimator (`src/core/estimates.ts`) carries the ticket's model
verbatim: fabric count as stitches per inch over one square, front
geometry `2·√2 × pitch`, a named ×1.2 routing factor for back travel,
a 10% waste share, working strands purchased as `strands/6` of
six-strand floss, and 8 m skeins rounded up **per colour** — colours
cannot share a skein, so the total is the shopping answer, not
`ceil(total/skein)`. No magic constants: every factor is a persisted
setting, and `estimateAssumptions` renders them as the disclosure
sentence the Stats panel shows beside the results ("plan with them,
don't promise by them").

**Surface:** the Stats section gains Fabric size, Cut size, Centre,
and Thread estimate rows plus a Fabric fieldset (count, cut margin,
working strands — routing/waste/skein persist with documented
defaults, hand-editable until a sitting asks for controls). Full-RGB
output says "needs the palette applied" rather than pricing fictional
identities. Per-colour counts ride the existing stats pass.

**Schema v9** adds the `estimates` block; migration seeds the
documented defaults. Deferred, on record: per-colour skeins in the
PDF key and Colours-used rows, an inches/cm display preference, and a
stitcher's review of defaults and wording.

**Verification:** `check` green at 1,255 tests (+15: hand-calculated
sizes, skein boundaries, the per-colour round-up invariant, v9
migration); live run confirmed 200×200 at 18-count reads 28.2 cm and
≈70.2 m — matching the hand calculation — updating live with the
count, and the v9 file carries the block.

**Scope.** `core/estimates.ts` (new), `core/project.ts` (v9),
`main.ts` (Stats rows + Fabric fieldset), tests, ticket deleted.

**Link:** Track A's remainder is human: M9's glyph signatures and
M16's print-defaults sitting — where the estimator's wording review
belongs too.

## D170 — M9 closes on the owner's signature; Track A is build-complete (2026-08-12)

**The owner signed all four glyph batches** on printed evidence
(`bench-reports/m9-symbol-evidence.pdf`, four batch pages plus the
all-64 distinctness page at 3.5 mm). That was the `[sign-off]` D160
reserved and the last gate on M9, so **M9 closes** — and with M11,
M10 and M12 already shipped today, **Track A is build-complete**. The
64 glyph ids and their canonical order were already permanent from
D165; the signature makes the *shapes* final too.

**Two declared residues, placed rather than dropped:**

- The **override UI** was named a v1-optional slice at scope
  (D160-3) and is deferred whole to the Icebox as ICE-SYMBOL-UI-01.
  The model, persistence and swap semantics all exist — only the
  picker is missing, so this is a UI-alone item, not a reopening.
- The **manual print inspection** (every chart mode at minimum and
  typical cell sizes, grayscale/low-ink, key↔chart agreement) folds
  into **M16's sitting** rather than standing alone. M16 is already a
  print-judgement sitting with paper in hand, and it now has real
  multi-page output (M10) and estimate wording (M12) to judge in the
  same pass — three inspections that want one printer session, not
  three.

**PUB-02 gained the owner's replacement plan** (not yet executed):
render the flat-graphic slot as a Blender cube lit by three RGB lights
aimed at the visible corners. That yields both a hue spread and a
luminance ramp across flat faces — precisely the banding-and-
posterisation case the slot exists to test — and being built from
primitives it is wholly self-produced, so the two-layer rights problem
(artist's copyright plus the underlying mark) dissolves rather than
being exchanged for a different one.

**Scope.** `backlog.md` (M9 removed, Track A note rewritten, M16
absorbs the inspection, PUB-02 plan, ICE-SYMBOL-UI-01 opened),
`trajectory.md`, `tickets/M9.md` deleted.

**Link:** what remains of Track A is one owner sitting (M16). Track B
opens next — DUR-01's scope signed the same day (D171).

## D171 — DUR-01's scope signs: restore quietly, steer to save, and put the picture in the file (2026-08-12)

**The owner signed DUR-01's shape**, answering the four scope
questions and adding a fifth the questions had not reached. Track B's
premise — "the app loses your work" — is now a committed change, not
an accepted state.

**Signed:**

1. **Reopening restores the design in progress.** No explicit save
   required, no dialog — the work is simply there.
2. **A history, not one slot** — several recent designs, recoverable.
3. **Explicit save stays the primary act, and the UI steers to it.**
   The owner's reasoning is the durable part and is why the history
   does not make saving redundant: a saved file **survives a system
   clear-out** (the OS may evict browser storage; a file on disk it
   cannot touch) and **is the sharing unit**. Restore is a safety net;
   saving is the act that means something.
4. **The source picture is restored too** — settings alone would
   return a design that cannot be re-rendered.
5. **The picture becomes part of saved files** (the addition): a
   project file carries its own source, so it opens the same design
   anywhere. **A live screen capture freezes** to a still at save time
   — a capture has no file to reference, so the frame becomes one.
6. **Storage is bounded and honest about it**: a limit per project,
   a **warning before a stored picture is evicted**, and an **opt-in
   to keep more** (persistent storage) rather than silent loss.

**Consequences recorded, not yet decided.** Embedding a source changes
what a project file *is* — today it is small readable settings JSON
(§20's premise). The format question is deliberately left to the
option gate: it is user-visible, it is what people hand to each other,
and it is the hard-to-reverse half. One constraint is already fixed by
an existing invariant: **source bytes are stored verbatim, never
re-encoded**, or save → load → save stops being byte-identical.

**Architecture note:** design snapshots get their own IndexedDB store,
separate from library data. `architecture.md`'s persistence row states
the current no-autosave contract and is a protected-doc delta once
this ships — captured, not edited (the existing DUR-01 ledger line
already reserves it).

**Scope.** `backlog.md` (DUR-01 rewritten, `[detail]` added),
`tickets/DUR-01.md` (new).

**Link:** SAVE-01 ships with it (a design's title names its file).
Build starts at the option gate — the file-format pick.

<!-- FILE: pm_skills/project/archive/trajectory/trajectory-0001-2026-07-17-to-2026-07-20.md -->

# Trajectory archive — 2026-07-17 → 2026-07-20 (M0–M5)

<!-- Archived verbatim from trajectory.md on 2026-07-21 (prune pass).
     Append-only history; do not edit. Cold tier: grep + line-range only. -->

## M5 — WASM + WebGPU backends (shipped 2026-07-20)

- M5-ACCEPT-02, M5-ACCEPT-03, M5-ACCEPT-04, M5-ACCEPT-05 (2026-07-20) —
  maintainer tested and accepted the M5 acceptance gates: visual review,
  live Photoshop rehearsal, budget/protected-doc reconciliation, and the
  milestone close sign-off. M5F closed; M5 shipped. See decision-log D51.

- DIAG-01 (2026-07-20) — copy-diagnostics affordance built: a hard-rule
  gap where AGENTS.md, UI-STANDARDS and DEV-INFRASTRUCTURE all specified
  a control that did not exist and `recentLogs()` sat as a dead export.
  Pure bundle builder with fail-closed redaction (secret-shaped keys and
  values withheld, unrecognised types dropped rather than serialised),
  dev-only text-button control announcing what was copied and that it is
  redacted. Verified live in the browser against a seeded secret.
  Unblocks M5-ACCEPT-03, which had no way to record its evidence. Gate
  packs for both maintainer items written:
  `docs/acceptance-visual-review.md` and
  `docs/acceptance-live-rehearsal.md`. See decision-log D50.

- M5-ACCEPT-01 (2026-07-20) — integrated correctness and parity matrix:
  31 rows over preset × metric × dither × resize mode × palette ×
  alpha × grid, driven through the real worker entry, 218 assertions in
  `check` (1024² ceiling behind `MATRIX_FULL=1`). Coverage table
  generated into `docs/acceptance-matrix.md` with its staleness gated.
  Found and fixed an engine defect on the first run — fully transparent
  cells were quantised as opaque black and diffused that error into the
  stitches beside them, so a `contain`/`fit` letterbox band destroyed
  the dither of the artwork it framed (TS + Rust, no golden fixture
  changed). Characterised `reduce-first` as non-stitchable rather than
  waiving the palette-membership invariant for it. Promoted export
  isolation out of `AUDIT=1`-only into the gate, and added the brief's
  never-asserted "a saved project reopens with identical output". See
  decision-log D49.

- M5-PERF-21, M5-PERF-22, M5-PERF-25, M5-PERF-20, M5-PERF-28,
  M5-PERF-27, M5-PERF-23, M5-PERF-24, M5-PERF-32 (2026-07-20) — M5D
  quality-neutral implementation, all bit-exact. Resize hoisted
  (1.29–1.77×); dither inlined + per-bin pruned (3.6× at 64 colours,
  16.2× at 533, 0 mismatches over 138,688 adversarial values × 5
  palettes); identity `adjust` omitted and the 12 MB dither scratch
  reused (per-frame allocation ~26.5 MB → ~8 MB at 1024², closing
  M5-PERF-20); split compare now donates the pipeline's post-resize
  buffer instead of re-running it (one pipeline per frame, not two);
  dither routed per workload by metric (lab → ts, rgb → wasm) with
  D42's startup calibration removed; budgets replaced by measured
  baselines naming runtime + workload + build, with regression and
  staleness guards. `mapPaletteGpu` **declined on its own gate** — on a
  production build the GPU edge is ~1.4×, not D47's dev-server 6.7×.
  New `bench.html` production-build browser harness satisfied
  M5-PERF-32 on a real GPU (0 mismatches over 32,768 bins × 3 configs).
  M5B's causal attribution corrected twice: both its "algorithmic" wins
  were call-boundary costs. See decision-log D48.

- M5-PERF (2026-07-20) — M5C decision gate: **processing modes cut**.
  Balanced's ingredients both died on M5B evidence (rounded conversion
  ~0% gain but 49–53% of pixels changed; separable resize slower), so
  one fidelity plus the existing draft governor ships instead — no
  visual thresholds needed anywhere, golden fixtures untouched, and the
  v1 back-compat waiver withdrawn. Budgets reshaped to one product
  promise plus regression-guarded measured baselines. M5E cut; evidence
  re-homed to `docs/performance-evidence.md`. See decision-log D47.

- M5-PERF-31, M5-PERF-30, M5-PERF-29, M5-PERF-26 (2026-07-20) —
  M5B-FIX: the four audit defects closed. The WebGPU LUT works for the
  first time (523 distinct indices, 0 mismatches vs TS across all 32,768
  bins on Metal-3) — the reserved-keyword bug was hiding a second,
  bind-group defect that only real-GPU execution could surface. LUT
  cache keyed on palette content (LRU-bounded); worker routing extracted
  to `router.ts` and now answers every request, so a rejection can no
  longer wedge live preview; `DirtyGate` bounds an averaged-away edit to
  2 s instead of never appearing. Real-GPU CI coverage carried forward
  as M5-PERF-32. See decision-log D46.

- M5-PERF-10, M5-PERF-11, M5-PERF-12, M5-PERF-13, M5-PERF-14,
  M5-PERF-15, M5-PERF-16, M5-PERF-17, M5-PERF-18, M5-PERF-19
  (2026-07-19) — M5B component audits: ten investigations shipped as a
  repeatable `npm run audit` suite plus the first browser measurements
  the project has ever taken (`docs/browser-measurement.md`). Found
  three **bit-exact** wins (dither 888 → 217 ms at 1024²/64; resize
  ~1.5× everywhere), overturned four bv1 leads, closed the wasm-boundary
  and `?? 0` leads as immaterial, and uncovered a shipped wrong-output
  bug: the WebGPU LUT shader has never compiled and silently replaced
  the correct LUT. Evidence in `docs/performance-evidence.md`; see decision-log
  D45.

- M5-PERF-01, M5-PERF-02, M5-PERF-03 (2026-07-19) — M5A measurement
  truth: boundary contract **bv1** (six boundaries, versioned so a moved
  mark invalidates comparison), a frozen 24-row workload matrix with
  derived stable IDs, and a report schema keeping raw samples plus
  build/environment identity — unmeasurable rows are `unsupported` with
  a reason, never zero. `npm run bench` writes the JSON report *before*
  asserting, so a missed budget still leaves evidence.
  Baseline (M1 Max, 124 rows) reproduces every D43 figure; all five
  budgets still miss. Decomposition overturned two leads: dither is
  **conversion-bound** (Lab is ~70% of cost — pruning alone can address
  ~22%), and **separable resize is challenged** (~1.5–2× available, not
  the ~7× needed). `adjust` clone and stage-list build measured
  immaterial. No browser numbers taken — rehearsal documented,
  M5-PERF-18 owns it. See decision-log D44.
- M5-BENCH (2026-07-19) — budget benchmark shipped (`npm run bench`,
  BENCH=1-gated, ×3 CI stretch): asserts the architecture.md table at
  1024×1024/64 DMC. **All five budgets miss** (whole pipeline 452 ms
  vs 100; dither-wasm 412 ms vs 15) — recorded honestly, milestone
  held open with a [sign-off] budget-gap item; architecture drift
  captured as a doc-delta. See decision-log D43.
- M5-SELECT (2026-07-19) — automatic backend selection: one-shot
  startup calibration (ts vs wasm dither, DMC workload, 10%
  hysteresis), executor order explicit > selected > ts with the
  missing-backend safety net; StageTiming carries the backend that ran
  (profiling rows read "dither (wasm)"); ts fallback with both
  backends disabled proven in tests. See decision-log D42.
- M5-WEBGPU (2026-07-19) — WGSL LUT build + palette map as async GPU
  kernels; LUT build wired GPU-first into the worker cache
  (`ensureLut`, ts fallback), map kernel awaits the selection item;
  tolerance quantified in node via an f32 mirror (≤ 1% bins, near-tie
  bound) + skipIf real-GPU suite. See decision-log D41.
- M5-WASM (2026-07-19) — wasm dither backend registered (worker
  startup, assignment onto `ditherStage.backends`, ts fallback);
  alias/stub build-time feature detection; **bit-exact parity proven**
  vs TS at tolerance 0 incl. full DMC under CIELAB (6 golden tests).
  See decision-log D40.
- M5-CRATE (2026-07-19) — `stitch-engine` Rust crate: bit-exact
  Floyd–Steinberg port (f32/f64 JS semantics, libm math, simd128
  codegen), 6 Rust tests; wasm-pack build + toolchain-aware
  `check:wasm` gate step, CI installs the toolchain. Rust installed on
  the dev Mac. See decision-log D39.
- M5-PROFILE (2026-07-19) — profiling harness: per-stage last/median/max
  timings over a rolling 120-frame window (stage-change reset) in a
  dev-only "Profiling" disclosure below the info panel; stripped from
  production builds. See decision-log D38.

## M4 — Live capture (shipped 2026-07-19, v0.5.0)

- M4-CLOSE (2026-07-19) — milestone close: all five feature items
  shipped, gate green (186 tests); the live acceptance measurement
  (≥ 4 updates/sec in Photoshop, ~0 idle CPU) **waived at close** by
  maintainer decision — see decision-log D37. v0.5.0 bumped and
  tagged.
- M4-PAUSE (2026-07-19) — pause/resume + draft mode (§22 subset):
  pump-lifecycle pause toggle (session and manual refresh stay live,
  preview holds the last frame, named states), pure hysteresis
  governor dropping dithering under sustained load with a visible
  "Draft quality" label; exports untouched (full quality by
  construction). See decision-log D36.
- M4-DIRTY (2026-07-19) — dirty-frame skip (§22 subset): pre-readback
  64×64 downsample + FNV-1a hash + crop-region signature; unchanged
  frames skip the full grab and pipeline run ("Source unchanged."
  named state), region edits always re-process, skip count logged at
  pump stop. See decision-log D35.
- M4-PUMP (2026-07-19) — frame pump (§22 subset): live updates via
  `requestVideoFrameCallback` (rAF fallback) with a pure latest-wins
  gate at the grab — one readback+pipeline run in flight, newest
  frame wins; quiet per-frame path, pump failure degrades to manual
  Capture frame; starts/stops with the session. See decision-log D34.
- M4-CROP (2026-07-19) — user-drawn crop rectangle over the live
  thumbnail (§3 subset): pure geometry model (clamp/move/resize/
  hit-test) in source pixels, draw/move/resize by pointer, arrow-key
  move + shift-resize, lock toggle, source-px → stitches readout,
  cropped frame grabs, mid-session source-resize re-clamp;
  hermetically tested. See decision-log D33.
- M4-SESSION (2026-07-19) — `getDisplayMedia` screen/window capture
  session (§3 subset): user-initiated Start/Capture frame/Stop buttons
  in the source section, honest permission UX (declined prompt is a
  status, not an error), external stop-sharing handled, one-shot frame
  grab into the existing pipeline path; pure error/label helpers
  node-tested. See decision-log D32.

Outcome: the product's defining loop runs — share a screen or window,
draw/move/lock a crop region over the live thumbnail, and watch the
cross-stitch preview follow edits in another app, with unchanged
frames costing ~nothing, latest-wins everywhere, pause/resume, and an
honest draft-quality mode under load. Live acceptance measurement
waived at close (D37).

## M3 — Exports (shipped 2026-07-19, v0.4.0)

- M3-CLOSE (2026-07-19) — milestone close: clean-PNG acceptance leg
  green (export re-runs the pipeline and encodes the engine buffer;
  pixel-exact, tested); the printed-A4 legibility leg **waived at
  close** by maintainer decision — see decision-log D31. v0.4.0
  bumped and tagged.
- M3-PROJECT (2026-07-19) — project save/load as JSON schema v1 (§20
  subset): settings-only (pipeline config with palette by name,
  grid/chart style, export prefs), canonical serialisation for the
  byte-identical round-trip invariant, path-named validation errors,
  forward-migration switch; Save/Load control group syncs the panel
  and reprocesses once. See decision-log D30.
- M3-PDF (2026-07-19) — single-page PDF chart (§18 subset): pdf-lib
  first use; chart raster embedded at ~300 dpi with vector title +
  used-colour thread key (swatch/code/hex), A4/Letter, orientation,
  mm margins; layout + built PDF parsed under Node in tests;
  browser-verified. Print legibility check remains manual. See
  decision-log D29.
- M3-CHART (2026-07-19) — styled PNG chart export (§14 subset): stitch
  cells + minor/major grid + margin numbering, sharing the preview's
  grid settings and pure geometry; white-paper print colours; pure
  layout tested, browser-verified pixel-exact. See decision-log D28.
- M3-PNG (2026-07-19) — clean PNG export (§13 MVP subset): 1 px/stitch
  or integer nearest-neighbour enlargement, transparent or solid
  background; a dedicated worker export message re-runs the pipeline at
  full quality (never the preview frame); pure scale/flatten helpers
  unit-tested, browser-verified pixel-exact. See decision-log D27.

Outcome: a captured design leaves the app on paper and disk — clean
and enlarged PNGs, a styled chart PNG, a single-page A4/Letter PDF
with thread key, and a versioned JSON project that round-trips
byte-identically. Print-legibility check waived at close (D31).

## M2 — Preview & info UI (shipped 2026-07-19, v0.3.0)

- M2-CLOSE (2026-07-19) — milestone close: both acceptance legs
  verified (controls 3.3 ms against 150 ms; worst-case preview redraw
  0.32 ms at a 1024×1024 grid against the 16.7 ms frame budget),
  version bumped to v0.3.0. See decision-log D25.

- M2-PANELS (2026-07-18) — Carbon-style control panels: Grid /
  Colour / Dither / Pipeline `fieldset` groups of native controls (toggle
  switches, clamped number fields, colour picker, selects), instant
  apply; pipeline changes reprocess a main-side master copy through
  latest-wins, grid changes stay view-only; dither disabled in
  full-RGB; browser-verified at 3.3 ms/frame. See decision-log D24.
- M2-INFO (2026-07-18) — info panel bound to stats (§11): summary
  line + colours-by-usage table (swatch, thread ref, count, %) below
  the preview, live per frame; pure node-tested row model, top-30 cap
  with aggregate row, en-GB counts, empty state; browser-verified.
  See decision-log D23.
- M2-COMPARE (2026-07-18) — source vs output split compare (§10):
  full-RGB twin pipeline pass at grid scale (cell-aligned halves),
  worker-cached source frame, divider + native Split slider behind a
  Compare toggle; clip-free draw after a Chromium compositor stall
  (no ctx.clip on the transferred OffscreenCanvas); browser-verified.
  See decision-log D22.
- M2-TICKS (2026-07-18) — tick marks + row/column numbering (§16
  subset): boundary-aligned numbers at the major interval, origin 1,
  top/left edges, collision-free label thinning, theme-aware text
  colour, fit margin reserving room; rides the GridStyle message and
  the Grid toggle; browser-verified. See decision-log D21.
- M2-GRID (2026-07-18) — grid overlay (§15 subset): pure line
  geometry with minor/major intervals, device-px snapping and a
  spacing-based auto-hide, drawn worker-side above the stitches at
  zoom-independent thickness; GridStyle over the protocol (DPR-blind
  worker), interim toolbar toggle; browser-verified. See decision-log
  D20.
- M2-PREVIEW (2026-07-18) — worker-rendered preview surface: canvas
  control transferred to the worker (bitmap redraw on view change, no
  reprocessing), pure viewport maths (fit, cursor-anchored zoom 5%–
  6400%, pan clamping), wheel/drag/keyboard (+/−/0/arrows) input,
  44px toolbar, auto-fit per new image; browser-verified. See
  decision-log D19.

Outcome: the app is a usable interactive tool — import an image,
tune colour mode / dither / pipeline order / grid styling from a
Carbon-style panel, compare source against output, and read live
per-colour stats, all at single-digit-millisecond latencies.

## M1 — Engine core (shipped 2026-07-18, v0.2.0)

- M1-STATS (2026-07-18) — design stats (§11 subset): stitch/empty
  partition on the D9 alpha-50% rule, distinct colours, per-colour
  counts + % of stitches sorted by usage, thread references attached;
  wired into the shell caption. See decision-log D18.
- M1-IMPORT (2026-07-18) — image import (file picker, drag-drop,
  paste) through one decode path into the worker pipeline, plus the
  minimal M1 dev shell rendering the dithered 200×200 DMC preview 1:1
  (pixelated upscale); browser-verified end-to-end, closing the D16
  worker manual gate. See decision-log D17.
- M1-WORKER (2026-07-18) — worker pipeline executor: serialisable
  PipelineConfig with both §7 order presets (order is data), adjust
  hook stage (identity until §9 ops), worker-side LUT cache, exact
  latest-wins coalescing, transferred-buffer protocol, error-as-
  response; hermetic tests, browser exercise lands with M2. See
  decision-log D16.
- M1-RESIZE (2026-07-18) — resize stage: pure area-average resampler
  in premultiplied alpha; stretch/contain/cover/fit (fit = scale-down
  contain), grid-sized output with empty cells, 1–1024 validation;
  golden fixture + hand-derived geometry/average invariants. See
  decision-log D15.
- M1-DITHER (2026-07-18) — Floyd–Steinberg dither stage: exact error
  terms in a float working buffer, serpentine option, seed carried in
  the params schema for future stochastic variants; golden fixture
  generated by the TS reference + determinism/mean-preservation
  invariants. See decision-log D14.
- M1-COLOR (2026-07-18) — sRGB↔linear↔Lab conversions (D65, CIE 1976)
  plus Euclidean-RGB / ΔE76 metrics, golden-tested against published
  reference values; round-trip within 1/255. See decision-log D13.
- M1-PALETTE (2026-07-18) — Palette model over the generated DMC data
  (533 colours) with typed-array rgb/Lab flattening. See decision-log D13.
- M1-LUT (2026-07-18) — 15-bit RGB → palette-index LUT builder
  (bit-replicated bin representatives); worker hosting lands with the
  executor item. See decision-log D13.
- M1-REDUCE (2026-07-18) — reduce stage, LUT + exact paths under one
  contract, alpha passthrough; golden fixture + invariant suite
  (palette membership, fixed point, LUT↔exact agreement). See
  decision-log D13.

Outcome: the whole engine path runs — import a PNG in the browser,
worker-process it (resize → reduce/dither against the real DMC
palette), render 200×200 with live stats. Acceptance caveats in D18.

## M0 — Scaffold & quality gate (shipped 2026-07-17, v0.1.0)

- M0 — Vite 8 + TS 6 strict + ESLint 10 (core-isolation rule) + Vitest 4;
  `check` = typecheck + lint + test + build + docs baseline + secret scan;
  CI runs `check`; core types (`PixelBuffer`, `Palette`, `Stage`,
  `ProjectFile` v1 stub) + minimal pipeline executor; golden harness with
  per-test tolerance + hello-world identity test (4 tests); app shell with
  build identity + structured logger. See decision-log 2026-07-17 (D12).

Outcome: `npm run check` green end-to-end; dev server boots and renders
the shell with version identity.

<!-- FILE: pm_skills/project/archive/trajectory/trajectory-0002-2026-07-21-to-2026-07-22.md -->

# Trajectory archive — 2026-07-21 → 2026-07-22 (M6–M8)

<!-- Archived verbatim from trajectory.md on 2026-08-07 (prune pass, D113).
     Append-only history; do not edit. Cold tier: grep + line-range only. -->

## M8 — Dithering expansion (engine + controls shipped 2026-07-22; maintainer acceptance open)

- M8-CTRL-01 (2026-07-22) — the Dither group: preset + algorithm
  selectors with method-specific controls only where the method defines
  them (strength per family, serpentine diffusion-only), seven
  evidence-based presets, a disabled "Custom" state, and session
  memory of each method's last settings. Pure model in
  `src/ui/dither-model.ts`. See decision-log D62.
- M8-ALG-01 (2026-07-22) — four new deterministic dither methods beside
  Floyd–Steinberg (Atkinson, Jarvis, ordered Bayer 8×8, blue-noise
  32×32) behind one stage; `DitherConfig` union, schema v4 migration
  keeping old projects byte-identical; wasm routing gated FS-only so a
  backend can never substitute a different method; a bench-caught 2.3×
  regression fixed by flattening kernels to typed arrays. See
  decision-log D62.
- M8-SPIKE-01 (2026-07-22) — dither evaluation spike: nine candidates
  measured on tone fidelity, isolated-stitch rate, distinctness and
  cost; committed set of six user choices, matrix size/phase/seed
  earn no control; evidence in `docs/dither-evaluation.md` + audit
  artefact + HTML gallery. See decision-log D61.

## M7 — Palette & colour strategy (shipped 2026-07-21)

- M7-LIB-01 (2026-07-21) — the library operations that never shipped:
  keyboard-operable palette reordering and entry removal (both bump the
  revision), bulk owned/not-owned across the whole filter rather than
  the rendered page, and palette deletion with a session undo. The
  entry list is a collapsed disclosure capped at 60. See decision-log
  D58.
- M7-ACCEPT-01 (2026-07-21) — maintainer accepted the combined
  brands → inventory → palettes → presets → counts → locks workflow.
  Close triage kept one item ahead of M8 (M7-LIB-01, the library
  operations that never shipped) and moved the two that depend on
  owner data to the Icebox (ICE-XREF-01, ICE-PRESET-01). See decision-log D57.
- M7-DATA-01 (2026-07-21) — owner thread data superseded mid-milestone:
  `thread-list.csv` (3,338 threads, 8 brands, each brand's own measured
  colours) replaces the DMC→Anchor cross-reference; `dmc.json` retired,
  `catalogue.json` generated in its place. See decision-log D56.
- M7-BRAND-01 (2026-07-21) — thread identity is `brandId:reference` and
  RGB is display-only: `Thread` replaces `PaletteEntry`, a
  palette-index sidecar runs through reduce, dither, the Rust crate,
  the worker protocol and stats, so ~500 threads sharing a colour with
  another stay distinct. See decision-log D55.
- M7-BRAND-02 (2026-07-21) — brands enable/disable as a checkbox group
  with deterministic union order; no-brand is an explained error, never
  full-RGB. Stats, chart key and PDF carry brand + reference. See
  decision-log D55.
- M7-INV-01 (2026-07-21) — cross-project thread inventory in IndexedDB
  behind a `LibraryStore` interface (memory fallback announced, never
  silent), versioned canonical import/export, additive merge, and an
  "only threads I own" restriction. See decision-log D55.
- M7-PAL-01 (2026-07-21) — named library palettes with revisions;
  project schema v3 stores policy *and* the resolved snapshot, so a
  reopen reproduces the design even after the library palette is edited
  or deleted. See decision-log D55.
- M7-PRESET-01 (2026-07-21) — four algorithmic LCh presets (Neutrals,
  Pastels, Earth tones, Deep shades), each labelled with its rule;
  strict vs preference kept distinct; curated membership deferred to
  owner review. See decision-log D55.
- M7-COUNT-01 (2026-07-21) — exact/maximum colour counts by greedy
  weighted-ΔE selection over real permitted threads, chosen against the
  resized full-RGB source (never the pipeline's own output); selected
  and used counts reported separately. See decision-log D55.
- M7-MIX-01 (2026-07-21) — lock / prefer / exclude as three disjoint
  sets with auto-fill; "lock 5, request 15" fills exactly ten, and
  every conflict is a typed result with a user-facing sentence. See
  decision-log D55.
- M7-EQUIV-01 (2026-07-21) — nearest cross-brand equivalent, curated
  over computed, each labelled; no curated data exists yet, so every
  answer today says "closest by colour" with its ΔE. See decision-log D56.

Outcome: eight brands, 3,338 threads, and one policy layer behind them —
a design can be restricted to a brand, an inventory, a saved palette or
a preset, capped at a colour count, and pinned with locks, with every
narrowing explained in words rather than silently applied.

## M6 — Photoshop companion layout (shipped 2026-07-21)

- M6-ACCEPT-01 (2026-07-21) — maintainer accepted the companion layout
  gate: side-by-side Photoshop workflow, aspect-locked crop under
  pointer and keyboard on Retina, and the live-update rate under that
  load. See decision-log D54.
- M6-SCALE-01 (2026-07-21) — pattern / capture / preview / export scale
  split into four unit-named quantities in `src/ui/scales.ts`, with
  pattern-dimension controls added and a 4×4 matrix test asserting
  independence by reference identity. See decision-log D52.
- M6-CAPRES-01 (2026-07-21) — capture frame aspect-locked to the pattern
  through `constrainRect` on every mutation route; region size no longer
  affects stitch count. `stitchSpan` removed as tautological. See
  decision-log D52.
- M6-VIEW-01 (2026-07-21) — fit-to-space / fit-width / fit-height, zoom,
  stitch-dimensions readout, and preview scale persisted in project
  schema v2 (CSS px per stitch, forward migration from v1). See
  decision-log D52.
- M6-PANEL-01 (2026-07-21) — settings panel collapses from a permanent
  shell bar with `aria-expanded`; preview gains 37 % more area; state
  remembered in a localStorage shell preference, not project data. See
  decision-log D52.
- M6-FOCUS-01 (2026-07-21) — preview focus hides all but the preview,
  its toolbar, and a compact status line derived from one owned
  snapshot; live capture continues; Escape plus a persistent exit
  control. See decision-log D52.
- M6-NARROW-01 (2026-07-21) — preview-first DOM at every width with the
  settings panel to its right above 60 rem; verified at 320/360/480/800/
  1000 CSS px with no page-level horizontal scrolling, no under-44 px
  targets, and preview before controls in tab order. See decision-log D52.
- M6-WIN-01 (2026-07-21) — spike: browser window placement parked
  (option A, size guidance only); `resizeTo` is ignored without error,
  window-management permission denied, popups blocked even from a
  trusted gesture. No production code. See decision-log D53.

Outcome: the app works as a tall companion beside Photoshop — at 320–480
CSS px the preview takes 93–95 % of the width, panel collapse and preview
focus grow it further, and pattern dimensions are provably independent of
capture, display, and export scale.

<!-- FILE: pm_skills/project/archive/trajectory/trajectory-0003-2026-07-22-to-2026-07-23.md -->

# Trajectory archive — 2026-07-22 → 2026-07-23 (M13 phases 1–2)

<!-- Archived verbatim from trajectory.md on 2026-08-07 (prune pass, D120).
     Milestone remainder open in the backlog at archive time.
     Append-only history; do not edit. Cold tier: grep + line-range only. -->

## M13 — Visual processing performance (in progress)

- M13-MEAS-01 (2026-07-22) — bv2 node bench contract: the dither axis
  became the `DitherConfig` union with method-and-settings ID tokens,
  `p533` renamed to the truthful `p489`, a mandatory M8 method block at
  300²/1024², cold candidate-table / threshold-tile / full-catalogue
  preparation rows, run-validity tainting (clock drift, implausible
  samples, stalls), and a ten-row re-baseline — the FS 1024² +28 % drift
  since pre-M8 recorded as evidence for M13-PROF-01. See decision-log
  D64.
- M13-MEAS-02 (2026-07-23) — bv2 browser harness evidence complete over
  three owner runs: still preview-update 21.1/37.3 ms (200²/300²), live
  capture 30.3 ms median at a driven 4 changes/sec (119 samples,
  counters conserve, zero drops), interaction 53.7 ms median
  source-paint → preview-draw (7/8), GPU LUT agreement EXACT ×3 runs,
  six export rows. Zero-frame verdict, wrong-surface warning, source
  drive and the settle-waiter token fix landed en route. See
  decision-log D67.
- M13-PROF-01/02 browser halves (2026-07-23) — harness gained three
  gestureless legs (worker-route stage matrix, timed GPU-vs-TS LUT
  builds, selection-source contention probe) plus an unattended
  `?auto=` mode; a clean foreground Chrome run published the ratios:
  dither browser ≈ node (1.00–1.11), resize 1.12–1.28× (M5's 3.5×
  superseded), reduce ~2.3× faster in browser; GPU LUT build 2.3×/16×
  win at p64/p489, EXACT; selection-source export delays overlapping
  frames by ≤ one export (~51 ms), zero drops. Both PROF items closed.
  See decision-log D68.
- M13-PROF-03 (2026-07-23) — backend end-to-end comparison through the
  shipped worker route via a harness-only request-level backend force:
  `lab → ts` confirmed (TS wins 1.33–2.88×), `rgb → wasm` confirmed
  (wasm wins 2.0–2.8×, 2.39× at the export boundary), `mapPaletteGpu`
  stays unwired (loses every cell, still no indices sidecar); all 12
  cells byte-exact including indices; fallback probes all PASS;
  M13-DEF-01 filed (StageTiming label lies under non-FS delegation).
  See decision-log D69.
- M13-PROF-04/05 gestureless halves (2026-07-23) — dirty gate proven
  size-blind (≤ 2 px invisible at any contrast, knee 16–32 px; the 2 s
  forced refresh is the small-stroke latency); allocation census puts
  ~93% of 300² per-frame churn in two crop-sized main-thread buffers;
  export isolation re-proven EXACT under pump/draft/rapid exports;
  artefact exports starve the main thread (~0.5 s PDF freeze), never
  the worker; M13-DEF-02 filed (chart past the canvas edge). Both
  items `[~]` — one owner capture session remains (rehearsal sheet in
  `docs/browser-measurement.md`). See decision-log D70/D71.
- M13-DEF-01/02 (2026-07-23) — both profiling-filed defects fixed:
  the executor clamps unimplementable wasm dither requests so
  `StageTiming.backend` only names code that ran, and both export
  encoders refuse oversized outputs with a user-facing sentence
  before the canvas exists; regression tests on every reachable
  route. See decision-log D72.

<!-- FILE: pm_skills/project/archive/trajectory/trajectory-0004-2026-08-04-to-2026-08-09.md -->

# Trajectory archive — 2026-08-04 → 2026-08-09 (M13 remainder, M14)

<!-- Archived verbatim from trajectory.md on 2026-08-11 (prune pass, D149).
     Both milestones complete at archive time: M13 shipped on its
     maintainer gate 2026-08-09 (D148), M14 accepted 2026-08-07 (D127).
     M13 phases 1-2 were archived earlier, in trajectory-0003.
     Append-only history; do not edit. Cold tier: grep + line-range only. -->

## M13 — Visual processing performance (SHIPPED 2026-08-09)

**Outcome:** the milestone closes on its maintainer gate. Live
Photoshop editing at 200² and 300² judged responsive by the owner, all
four D135 agenda lines signed, exports and recovery clean, and the
TypeScript-only fallback correct at ~8 updates/sec. No performance gap
at or below 300², so M13-SYNTH-01 stayed closed.

- M13-ACCEPT-02 (2026-08-09) — the human half passes on
  `v0.5.0+20260809.0642be5` (HEAD, not the pinned `b4cf665` — nothing
  on the processing path had changed). Nine legs, eight completed;
  agenda verdicts: small-stroke **accept** (2 s, reservation kept as
  ICE-STALE-01), PDF freeze **accept** (0.5–1 s), external-stop
  **accept**, cold prep **accept at this workload only** (6 s with all
  eight brands — double the D135 estimate). Access leg part-deferred
  (A11Y-VO-01). Record in `docs/acceptance-combined-record.md`. See D148.
- M13-ACCEPT-01 (2026-08-09) — the machine half passes on
  `v0.5.0+20260809.b4cf665`, every leg valid on the first attempt.
  Node: check 1090, matrix 267, bench 22 on the rebound baselines.
  Browser: capture, mem, trace and backend all VALID — the promise
  measured 37.6 ms at 300² and 29.5 ms at 200², 4.0 updates/sec, zero
  missed callbacks and zero drops, the first run where a miss would
  have failed the command. GC re-confirmed a non-source (0.30 % of
  wall, worst pause 1.8 ms). 66 backend cells EXACT with the indices
  sidecar intact in every one; both fallback probes PASS. The backend
  leg gained a one-command path (`bench:auto -- --backend`). Only
  M13-ACCEPT-02 remains. See D143.

- M13-IMPL-02 (2026-08-09) — the product promise stops being a
  sentence and becomes a gate: `bench:auto` now fails when the driven
  capture leg's sustained rate falls under 4 updates/sec or any frame
  is missed or dropped, with `preview-update` medians bound ×1.35 at
  300²/200². Carries the bv2 bindability amendment — driven *base*
  capture rows may bind, `.edit-<class>` and real-Photoshop rows never
  can, enforced in code. All ten node baselines re-taken on the
  implementation build (1.7–4.3 % faster: uniform drift, not a win);
  env rows gain a parsed browser version. Routing confirmed unchanged
  — no selection code touched. See D142.

- M13-IMPL-01 (2026-08-09) — the two D135-signed candidates ship: one
  reused grab surface per session, and the pump's pre-submit 5.9 MB
  copy replaced by a transfer plus a guarded refill off that surface.
  Measured on a clean bv2 pair (`138cd0f` → `3bfe7ef`, both valid on
  attempt 1): `grab median ms` down in 8 of 8 windows, mean −2.9 ms
  (canonical −16 %/−13 %); `preview-update` flat — the path is not
  grab-bound at the driven cadence, so the saving is headroom, not
  latency. Candidate 2 stays unpriced by construction (the harness
  pump never had the copy). See D138 (code) and D141 (evidence).

- M13-DEF-03 (2026-08-08) — the multi-window bench ledger conserves:
  drop counts fold by delta (`DropLedger`) instead of overwriting a
  cumulative field, per-window totals published separately, and the
  same review caught `rvfc missed callbacks` silently clamping to 0
  after window 1 (D134 published 0 where 119 and 81 were true). D134's
  measured numbers re-checked and unchanged. See D137.

- INFRA-CHECK-01 (2026-08-08) — the starved-desktop all-timeout
  `check` flake reproduced (utility-QoS clamp + load: 10–35×
  inflation, timeout-only failures) and closed: test/hook timeouts
  become 30 s liveness bounds config-wide plus the matrix file's
  explicit floor; suite green at 19–60× starvation, composed `check`
  green quiet. See D136.

- M13-SYNTH-01 (2026-08-08) — synthesis signed at the owner meeting:
  product promise binds to the driven capture leg (rate, not
  interaction p95), the brief's 1024² ≤ 100 ms line retired (1024
  cap stays), backend routing confirmed unchanged, Phase 4 narrowed
  to two bit-exact reuse candidates (IMPL-01) + budget rebinding
  (IMPL-02), IMPL-03 cut as evidence-led restraint. Signed matrix
  and activation block in `docs/performance-evidence.md`. See D135.

- M13-PROF-04 (2026-08-08) — live-path profile complete: the owner
  sitting lands real-Photoshop numbers — promise held (4.1–7.5
  updates/sec), every cost surface-sized not grid-sized (×1.62
  surface → ×1.6–1.76 across grab/dirty/compute), main-thread
  long-task density 11–18 % under a 6.5 MP window (zero on the
  controlled source), adversarial/recovery checks clean. Files
  M13-DEF-03 (harness multi-window drop ledger). See D134.

- M13-PROF-05 (2026-08-08) — memory/GC/contention complete: the
  owner's real-workflow trace confirms GC is not a pause source on
  the app path (max pause 3.92 ms, 0.71 % of wall, major frequency
  identical to the driven leg), allocation-rate mechanism and the
  two crop-sized main-thread copies' #1 reuse ranking confirmed;
  export isolation stood re-proven since D128. See D134.

- M13-MEAS-04 (2026-08-08) — Part C's trace half automated:
  `bench:trace` drives the flagged bench Chrome over raw CDP (Node
  built-in WebSocket, zero new deps), publishes validated per-window
  GC buckets with observer long tasks quoted alongside, and the
  first canonical quiet-gap artefact closes PROF-05's live-GC line —
  GC is not a pause source under driven capture (~0.4 % of wall
  time, max 12.5 ms, zero long tasks). See D132/D133.

- M13-MEAS-03 (2026-08-08) — the owner session shrinks to its human
  legs: `bench:auto` runs the capture and mem legs unattended
  (flag-granted, content-guarded, validity-gated), `--when-quiet`
  arms quiet-gap runs, the forced-GC probe answers D71 in mechanism
  (lazy major GC, not retention), and the zero-click Part-A′
  cross-check holds (0.98–1.01×) so automated capture rows are
  canon. See D129/D130/D131.

## M14 — UI/UX excellence (complete — owner accepted 2026-08-07)

- M14-ACCEPT-01 (2026-08-07) — the maintainer end review passes over
  the six looks' review pack and evidence; no failures routed. The
  milestone closes: acceptance passed, `check` green on final code.
  See decision-log D127.

- M14-EXT-38, M14-EXT-39, M14-EXT-40, M14-EXT-41, M14-EXT-42,
  M14-EXT-43, M14-EXT-44 (2026-08-07) — the sixth look lands in one
  auto-jazz run: the capture row trims to Stop · Freeze · locks
  (Capture frame cut, pump death recovers via Unfreeze); the status
  region moves into the header under the build id with an economy
  pass; the snapping Threads dropdown is fixed by a structural
  no-rebuild contract (fingerprint-gated updates, pinned by test);
  Design dissolves into a standing Capture section with the Zoom
  rename and a Stats stitch-size row; the Colour section compresses
  (count cluster, availability-only summary, provenance marks);
  Processing order and the Advanced section retire (loaded
  reduce-first files honoured and named); "Colours used" becomes a
  real section and the settings aside flattens to one hierarchy. See
  decision-log D121.
- M14-EXT-31..37 (2026-08-07) — the fifth look lands in one auto-jazz
  run: the preview becomes a real accordion section (bar toggle
  retired, disclosure persisted, collapsed heading unpinned); the
  settings toggle and whole-panel collapse retire (shell model =
  cold alone); the Capture section renames, opens every session, and
  takes the session controls back inline (Source reads "Source"
  always — D108's fixed point consciously surrendered); Size keeps
  one permanent home in Design (S1 retired); Grid options becomes a
  live-apply form modal (Numbers folded in, tick font size surfaced);
  the EXT-36 polish pass fixes the focus-obscuration reserve and
  parks three named residues; the EXT-37 Carbon table closes with
  zero unexplained deviations (one new chevron waiver). See
  decision-log D110.
- M14-EXT-25 (2026-08-06) — owner picked option A at the sign-off
  gate: the Source button carries the session ("Capturing — Source";
  Stop/Pause/Capture frame lead its modal, primary Stop), the inline
  row reduces to Lock region beside Lock aspect, nothing cut. See
  decision-log D108.
- M14-EXT-19, M14-EXT-20, M14-EXT-21, M14-EXT-22, M14-EXT-23,
  M14-EXT-24, M14-EXT-26, M14-EXT-27, M14-EXT-28, M14-EXT-29,
  M14-EXT-30 (2026-08-06) — the fourth look lands in one auto-jazz
  run: entire-screen picker hint; "Lock aspect" default-off with
  both dimensions deriving through a visible Stitch size scale and a
  compact Size row; a Stats section takes every headline figure while
  the region readout and all fold summaries retire (bare headings
  app-wide); the preview collapses like any region and preview focus
  retires whole; a Debug menu gathers copy/download/email; engaged
  trackpad pinch and pan; Colour stands alone with the
  Threadify/constrain recut; Appearance becomes Processing with the
  grid geometry under the view strip. EXT-25 survives as the one
  owner pick. See decision-log D107.
- M14-FIX-05, M14-FIX-04, M14-FIX-02 (2026-08-05) — stats line loses
  its duplicated dimensions and the block tightens to 128 px; a
  debounced zero-chrome window-width guide in the status region; the
  app's own tab excluded from its capture picker with honest
  window-share copy. See decision-log D105.
- M14-FIX-01 (2026-08-05) — capture region mounts above the preview
  during a session; focus hands to it, collapse/lock return the lead.
  One signed exception to preview-first order. See decision-log D104.
- M14-FIX-06+03 (2026-08-05) — the scroll-linked dock deleted (its
  height change fed back through scroll anchoring as the owner's
  docked↔undocked flap); the canvas now hugs the fitted design under
  auto-fit with posture caps — scroll-neutral by construction. See
  decision-log D103.
- M14-EXT-15 (2026-08-05) — owner signed A + D + S1 and the shape
  shipped: aspect-follows toggle (default on, session-only), free
  pins derive design height, shift-drag exception, size fields join
  the capture section per session; crop suite gains the
  locked/unlocked split. AGENTS.md invariant updated. See
  decision-log D101.
- M14-EXT-17 (2026-08-04) — thread highlight as a Compare-class
  preview decoration over the index sidecar: per-row toggles, scrim
  over non-matching stitches, export bytes re-proven identical,
  +0.8 ms/frame at 300². See decision-log D100.
- M14-EXT-14 (2026-08-04) — colours table collapsed by default, the
  fold line carrying count + leading thread; persisted choice wins.
  See decision-log D99.
- M14-EXT-13 (2026-08-04) — colour limit as "Limit colours" switch +
  slider (1–64, number to 512); exact demoted to depth; fresh default
  now at-most-8, announced on three surfaces (supersedes D55's
  unlimited). See decision-log D98.
- M14-EXT-12 (2026-08-04) — capture surface moved into a first-position
  "Capture region" accordion section, open first appearance, persisted
  collapse; source section is the cold entry only. See decision-log
  D97.
- M14-EXT-18 (2026-08-04) — viewport composition verified whole:
  188-control walks at 320/800/1280 with zero focus obscuration, the
  memo's palette scenario proven at 320, zero duplicate affordances,
  both schemes. See decision-log D96.
- M14-EXT-08..11 (2026-08-04) — the viewport arc as one set: auto-fit
  until touched with Reset view as the only fit control (D86 waiver
  closed), sticky/docked preview in both layouts, pan engagement =
  host focus (wheel-zoom deleted), permanent quiet view strip with
  the grid toggles moved in. Composition verify is EXT-18. See
  decision-log D95.
- M14-EXT-07 (2026-08-04) — entry sample removed on the memo's ask;
  the Source modal keeps the one zero-permission demo route (sample
  now reach 2, modal only). See decision-log D94.
- M14-EXT-06 (2026-08-04) — cold surface as a shell state: entry-only
  page before any source, `cold` in the one shell model overriding
  both preferences, five exit routes + quiet "Open a project", focus
  handed to the Source button on exit. See decision-log D93.
- M14-EXT-05 (2026-07-23) — polish pass from the owner's second
  look: nine findings (cold-surface duplication, view-controls double
  chrome, ragged wrapping, raw Load input, always-on colours table),
  nine fixes, one recorded lesson — verify composition, not just each
  new affordance alone. See D90.
- M14-EXT-01..04 (2026-07-23) — owner-feedback extension shipped as
  one set: app bar (title, build id, Source, shell modes, dev
  diagnostics + Download log), Source choice modal with cold-start
  entry preserved, persisted View-controls fold (supersedes the D86
  A16 waiver), Design width/height rename. See D88 (triage) + D89
  (ship); evidence in `docs/ui-evidence.md`.

- M14-VERIFY-02 (2026-07-23) — journeys re-walked on final code (1
  interaction to converted preview; both conflict severities followed
  out; reach contract measured within bounds); byte-identity attested
  (3 PNGs sha-identical; PDF content streams identical incl. the
  17.7 MB raster; project field-wise clean); bench green; engine dirs
  diff-clean across the milestone. See D87.
- M14-VERIFY-01 (2026-07-23) — conformance re-proven on final code:
  19/22 findings closed with evidence, 3 waived on record (Fit menu
  taste call, FIT_MARGIN, staleness bound); zero dangling ARIA refs;
  zero sub-44 targets over 176 focusables; gate items answered. See
  D86; ledger in `docs/ui-evidence.md`.
- M14-IMPL-05 (2026-07-23) — D79 map applied end-to-end with derived
  strings following ("Unlimited colours" everywhere one concept
  surfaces); one core conflict sentence deferred to ACCEPT-01 on
  record; before/after inventory in the evidence doc. See D85.
- M14-IMPL-04 (2026-07-23) — first-run layer: entry state with three
  visible actions + capture expectations, drawn deterministic sample
  through the real pipeline, source-row compaction, crop status with
  position at end-events (A8), allow-list capture labels (A7),
  filtered-out thread state; no tour, on record. See D84.
- M14-IMPL-03 (2026-07-23) — the five-section architecture is live:
  default page 14,495 → 3,877 px, settings tab stops ~130 → 11,
  every reach inside the D76 contract; disclosure state persisted in
  preferences; summaries derived from owned state. See D83.
- M14-IMPL-02 (2026-07-23) — full Carbon anatomy in place: linked
  helpers + announced snap-back corrections, drawn 44 px checkboxes
  with per-thread names, project-coded Carbon modals replacing
  prompt/confirm, local disabled reasons, operable canvas/crop roles,
  hex in info rows. Live-verified; pure halves node-tested. See D82.
- M14-IMPL-01 (2026-07-23) — dev shell shed: styling moved to
  tokens/base/shell sheets under `src/ui/styles`, index.html down to
  an 8-line critical block; Carbon productive ramp + layer panel
  live; all shell invariants held (matrix in `docs/ui-evidence.md`);
  engine surfaces diff-clean. See D81.
- M14-SPEC-02 (2026-07-23) — tokens.css landed (two systems, both
  schemes, unconsumed — zero visual change proven) with the
  `check:contrast` gate step: 17 @pair rows × 2 schemes all ≥ AAA
  bars; AAA adaptations from Carbon recorded. See D80; pair table in
  `docs/ui-spec.md` §9.
- M14-SPEC-01 (2026-07-23) — interaction architecture decided: 3-tier
  reach contract, 7 groups → 5 stateful accordion sections with derived
  summaries, thread depth behind one lazy disclosure, first-run entry
  state + generated sample, terminology map. Every audit major answered
  or deferred with a reason. See D76–D79; spec in `docs/ui-spec.md`.

- M14-AUDIT-02 (2026-07-23) — five journeys walked from a cleared
  origin with step counts and a full control-tier inventory: 1-drop
  conversion is strong; Dither/Export/Project buried at 10–12k px
  (~130 tab stops); no autosave — silent loss on close confirmed. See
  decision-log D75; record in `docs/ui-journeys.md`.
- M14-AUDIT-01 (2026-07-23) — standards & heuristics audit: 22 ranked
  findings (8 major, no blockers) across every surface × state;
  byte-identity tripwire landed (`tests/ui-baseline/` — fixture,
  Node-pinned hashes in `check`, browser export captures welded to the
  reference pin). See decision-log D74; findings in `docs/ui-audit.md`.

<!-- FILE: pm_skills/project/archive/trajectory/trajectory-0005-2026-08-07-to-2026-08-09.md -->

# Trajectory archive — 2026-08-07 → 2026-08-09 (M15)

<!-- Archived verbatim from trajectory.md on 2026-08-12 (prune pass, D166).
     M15 complete at archive time: shipped 2026-08-09 on both acceptance
     gates (D148). Append-only history; do not edit. Cold tier: grep +
     line-range only. -->

## M15 — Colour & dithering profiles (SHIPPED 2026-08-09)

**Outcome:** colour and dithering both become *profiles* — named
composition recipes on one kind-agnostic takeover editor, with
read-only built-ins, the (edited)-copy pattern, and schema v5. Sixteen
signed built-in style profiles, five dither methods judged and held,
and both acceptance gates closed at the combined sitting (D148). The
screen-reader half of the access leg is an open gap on record
(A11Y-VO-01), not a guessed pass.

- M15-UI-05 (2026-08-09) — the library rows' `Browse` buttons become a
  column: one `margin-left: auto` scoped to `.check-row > button`, the
  brand name takes the slack, one left edge at every width. See D148.
- M15-GALLERY-01 (2026-08-09) — closed at **sixteen** signed built-in
  style profiles on the owner's call; the forty unbuilt candidates were
  kept rather than cut, as ICE-PROFILES-02. See D148.
- M15-ACCEPT-02 (2026-08-09) — the maintainer half passes: building a
  profile from scratch, the style built-ins, the test preview across
  six real photographs, and the (edited)-copy flow all signed. See D148.
- M15-DITH-05 (2026-08-09) — all five dither methods and all sixteen
  profiles pass; D61 stays closed. Rider M8-GOLD-01 **approved** —
  fixtures for the four unpinned methods become M8-GOLD-02. See D148.

- M15-EVID-01 (2026-08-09) — six owner 2048² demo images land in
  `public/profile-demo/` and `PHOTO_SLOTS` grows four → six to use all
  of them: two landscapes, portrait, flat-colour graphic, stained
  glass, text. The editor's test preview now judges a profile on real
  pictures rather than only the generated hue sweep. See D147.

- M15-GALLERY-01 batch 2 (2026-08-09) — eight more built-in style
  profiles ship owner-signed, taking the gallery to sixteen: four
  rule-shaped (Rainforest, Spring meadow, Gemstones, Moorland) and
  four curated (Art deco, Mid-century modern, Fair Isle, Fluoro spot
  print), chosen against the gaps batch 1 left — no greens, nothing
  narrowing on chroma rather than hue, nothing muted. Batch 1's
  numbers could not be regenerated, so the evidence run was rebuilt
  from the published sheet and committed as an `AUDIT=1` audit; the
  ticket's own "Risograph print" turned out to be a trademark and
  ships renamed, with `riso` added to the naming guard. See D144
  (drafting) and D146 (signature).

- M15-GALLERY-01 batch 1 (2026-08-09) — eight built-in style profiles
  ship owner-signed: five rule-shaped (Autumn leaves, Golden hour,
  Winter frost, Deep sea, Neon noir) and three curated (De Stijl
  primaries, Delft blue, Ukiyo-e woodblock). The batch set the
  evidence format — each candidate rendered through the real pipeline
  and reported by the colours it actually selects — which caught two
  candidates not reading as their names before signature. Later
  batches continue against the ticket's remaining candidates. See
  D139 (drafting and review) and D140 (signature).

- M15-DITH-01, M15-DITH-02, M15-DITH-03, M15-DITH-04 (2026-08-07) —
  the dither half ships on the shared shell with zero shell changes:
  presets + structural matching move to core, ditherProfileRef joins
  v5 additively, the dither kind mounts in the takeover editor with
  basis lines and the demo-palette context, and Processing recuts to
  a profile select with the never-lying Custom state and the
  full-RGB sentence. See decision-log D125.

- M15-PERSIST-01, M15-UI-02, M15-UI-03, M15-UI-04, M15-UI-01,
  M15-ACCEPT-01 (2026-08-07) — the colour half ships whole: the
  kind-aware profile store + generic file format + My colours; the
  kind-agnostic takeover editor (shell, colour form, judgement
  preview) behind, then replacing, its dev entry; schema v5 with
  best-effort migration under the D114 waiver; the Colour section
  recut to profile select + (edited) verbs + count/distance +
  Must-use chips; honest non-thread export keys. See decision-log
  D123/D124.

- M15-CORE-01, M15-CORE-02, M15-CORE-03 (2026-08-07) — the colour
  core lands: six generated colour maps under the `map:`/`user:`
  namespaces with exact-match CSS naming and honest labels; the
  profile recipe + five-step resolver with a sentence per narrowing
  and nine non-empty built-ins (Classic cross stitch ships real);
  selection gains the minimum-distance rule with guaranteed Must-use
  seats and the prefer machinery removed. See decision-log D122.

- M15-SCOPE-02 (2026-08-07) — the dither half signs: a dithering
  profile is a complete named `DitherConfig`; the seven presets
  become read-only built-in profiles (duplicate-to-edit, basis
  lines kept); the dither kind mounts in the shared takeover shell
  and preview rig with a named demo palette under full-RGB;
  Processing recuts to profile select + Edit profiles; persistence
  is snapshot + additive `ditherProfileRef`. Colour builds first,
  dither second (owner order). M8-ACCEPT-01 absorbed into
  M15-DITH-05. Build broken into M15-DITH-01..05. See decision-log
  D116.

- M15-SCOPE-01 (2026-08-07) — the joint scoping session signs the
  colour-profile scope: profile = composition recipe (libraries,
  owned modifier, per-colour pins, H/S/B ranges) resolving to the
  available colour table; takeover-view editor with draft-then-Save;
  exclude dissolves into membership, Must use stays per-design,
  Prefer retires; ranges in profile, minimum distance beside count;
  the (edited)-copy pattern links designs to named profiles; presets
  retire into read-only built-in profiles. Build broken into
  M15-CORE-01..03, M15-PERSIST-01, M15-UI-01..04, M15-ACCEPT-01/02.
  See decision-log D114.

<!-- FILE: pm_skills/project/archive/trajectory/trajectory-0006-2026-08-11.md -->

# Trajectory archive — 2026-08-11 (Batch C0)

<!-- Archived verbatim from trajectory.md on 2026-08-23 (prune pass, D184).
     Batch C0 complete at archive time: shipped 2026-08-11 (D159).
     Append-only history; do not edit. Cold tier: grep + line-range only. -->

## Batch C0 — Sharpen the tools (SHIPPED 2026-08-11)

**Outcome:** the whole fifteen-item batch shipped in one day as the
gateless autojazz run it was designed to be (D149–D159): the product
renamed end to end, the memory and protected docs made true again, the
audits green and load-tolerant, the diagnostics buffer honest, the PDF
key fixed with the artefact suite that would have caught it, golden
fixtures for all five dither methods, the catalogue swept into a
diffable worklist, the shell shortened, accessible names machine-
checked, two live-preview defects fixed with mechanisms confirmed
first (one ticket suspect overturned), the staleness reservation
closed as accepted, the transcript ritual turned into one command, and
the dither presets renamed to their methods on the owner's signature.
Closed at `check` 1,148 tests and `audit` 55, both green. Residues, on
record: DATA-01's corrections ([maintainer], worklist in
`docs/catalogue-sweep.md`), A11Y-VO-01's human half, ZOOM-01's
feel-check at the next sitting, and the audit-after-check flake on the
wish-list.

- DITH-06 (2026-08-11) — the seven built-in dither profiles are named
  after their methods, owner-signed: None · Atkinson (half strength) ·
  Floyd–Steinberg · Blue noise (boosted) · Jarvis · Ordered (Bayer
  8×8) · Floyd–Steinberg (damped). Label-only by construction —
  matching is structural (`sameDither`) — and verified live in the
  select with every ref resolving and no overflow at width: 100%. The
  basis lines stay. See D159.
- RENAME-01 (2026-08-11) — the product becomes **Pattern Mapper**
  across user-facing strings, both HTML titles, diagnostics, error
  messages, the Rust crate description, `package.json` (lock
  regenerated by npm), the launch config and all live docs including the
  protected trio. The localStorage key moved with a legacy fallback read
  and five tests; the IndexedDB database name deliberately did **not**
  move — renaming it would mean copying hand-curated user data to change
  a string no user sees. Archives and `bench-reports/` untouched: they
  are history. See D150.
- DOCS-01 (2026-08-11) — the transcript ritual becomes one command:
  `npm run transcript` lists this project's Claude Code sessions
  (`~/.claude/projects/<slug>/*.jsonl` — the investigation found the
  sessions were always locally readable; the *Desktop* app's storage is
  the unusable one) and exports a chosen session to `_transcripts/` as
  redacted markdown. Redaction is applied, not promised — key shapes,
  binary payloads, tool-result truncation, home paths — and pinned by
  6 tests. First transcript ever saved landed during the smoke test,
  which also caught `package.json`'s description still reading "Cross
  Stitch Lens" (the D150 residue). See D158.
- STALE-01 (2026-08-11) — the small-edit staleness reservation closes
  **as accepted**, on the owner's recorded "a bit sluggish but can live
  with". The remedy stays on file — lower `DIRTY_MAX_STALE_MS`
  (`src/capture/dirty.ts:54`) with bench evidence that ≥ 4 updates/sec
  holds — and was deliberately not taken gatelessly. See D158.
- ZOOM-01 (2026-08-11) — the wheel-zoom snap is fixed, and the
  confirmed mechanism was **neither of the ticket's suspects**: every
  processed frame re-derived the view, and manual mode re-centres via
  `scaledView`, so under live capture the next frame (≤ 250 ms) threw
  away the wheel's pointer anchor — and any pan. `onFrame` now
  re-derives only when the stitch dimensions change; resizes stay the
  ResizeObserver's. Engaged-only wheel contract (M14-EXT-27) untouched.
  Feel-check at the next sitting. See D157.
- FLICKER-01 (2026-08-11) — stepping the colour count no longer shows
  the un-reduced picture: `setCount` invalidates the selection source,
  and resolving with no source falls back to the full permitted set —
  the interim frame *was* that wide render. `applyColour` now holds the
  previous palette and frame while the fresh source is in flight; the
  fetch's completion handler swaps old-reduced → new-reduced. Verified
  live: stepping 24→8 samples as `24 · limit 8` → `8 · limit 8`, no
  wide frame between. Source *replacements* keep their documented
  two-step on purpose. See D157.
- A11Y-01 (2026-08-11) — every control's accessible name is now a
  gate assertion: a source-scan tripwire over all 66 raw
  interactive-element creation sites (no DOM environment exists and no
  new dependency was allowed), recognising the codebase's real wiring
  patterns — textContent, aria-label, id↔htmlFor by literal,
  identifier or template, appended named spans. Zero exceptions;
  mutation-verified (an unnamed probe button fails, named by file and
  line). A11Y-VO-01 narrows to announcement *quality* plus the
  colour-only check. See D156.
- UI-06 (2026-08-11) — "Colours used" moves inside the Colour
  section's panel: choices above, readout below, one subject in one
  place, and the shell shortens by a top-level section (the
  ICE-WIDTH-01 pairing). It keeps its own disclosure at headingLevel 3
  (a nested section, so the outline stays honest — `createSection`
  gained the option), and its shell×has-rows visibility writer is
  unchanged. Verified in the running app: nested panel, independent
  toggles, identical rows, zero console errors. See D156.
- DATA-01 detection half (2026-08-11) — the catalogue sweep ships as a
  committed `AUDIT=1` audit plus a generated, deliberately timestamp-free
  worklist (`docs/catalogue-sweep.md`), so a re-run after corrections
  shows the delta as a plain git diff. Confirmed the ticket's hand
  numbers exactly: 21 unnamed rows (all Finca, 9.6% of the brand) and 11
  same-brand identical-hex pairs — with two rankings the ticket did not
  ask for: four pairs are **consecutive** references (the copied-down
  spreadsheet-cell shape, all Sullivans) and 6 of 11 groups are one
  brand, the same single-ingest shape as class 1. Findings reported,
  never gated; only the generator's own promises (unique identity,
  well-formed hex) assert. Corrections stay open as [maintainer]. See
  D155.
- M8-GOLD-02 (2026-08-11) — the four unpinned M8 methods gain committed
  golden fixtures (Atkinson, Jarvis, ordered/Bayer 8×8, blue noise),
  asserted bit-exactly beside the pre-M8 Floyd–Steinberg case. Source is
  an 8×8 JSON crop of `landscape-1.jpg` taken 1:1, **not** the JPEG —
  a golden must stay diffable when it fails, and JPEG decoding varies by
  platform. The crop was chosen by scanning for the widest channel
  spread: all 64 pixels distinct, 6–255. Fixtures proven pairwise
  distinct and strictly palette-valid, so they discriminate between the
  methods rather than merely existing. See D154.
- EXPORT-01 (2026-08-11) — the exported artefacts get asserted, not
  just their helpers: 22 tests driving a real `executeRequest` frame
  through the real export assembly. The clean PNG is the grid exactly;
  the enlarged PNG is proven pixel-verbatim at ×2/×3/×7 and invents no
  colour; the chart reserves its furniture and stays inside the canvas
  limit; and the **PDF is parsed as bytes** — one page, the right box in
  points, aspect preserved, and every key row carrying exactly one hex
  with no repeated token. The key assembly moved out of `main.ts` into
  `export/key-entries.ts` so the suite drives production code rather
  than a copy of it. Mutation-verified: reverting the KEY-01 fix fails
  two of these tests. See D153.
- KEY-01 (2026-08-11) — the PDF thread key stops printing the hex
  twice. `keyLabel` now suppresses the trailing hex when the label
  already carries one, which is the case for every generated colour
  with no CSS name (`nonThreadLabel` names those by their hex). Real
  threads unaffected. The regression fixture is an **unnamed**
  generated colour — the old green test used the flattering named case,
  which is why the defect shipped. See D152.
- DIAG-01 (2026-08-11) — the diagnostics buffer stops losing faults to
  noise: the ResizeObserver loop notification (both engines' wordings)
  is downgraded to debug with its reason in code, real uncaught errors
  and unhandled rejections now carry a **stack**, and buffer eviction
  drops the oldest non-error first so chatter cannot evict the error you
  opened the bundle for. 10 tests. See D152.
- ROUTE-01 (2026-08-11) — the routing disagreement is **noise, not a
  defect**: on a quiet machine all sixteen rows separate by 1.35×–4.02×
  with zero disagreements, and under deliberate 10-core load the
  narrowest row (200²/64/lab) collapses 1.77× → 1.24× — the row with the
  least headroom, and the one that flipped. The sweep now tolerates
  near-ties below 1.25× (reported, not failed) and still fails a
  decisive disagreement. D135's "routing confirmed unchanged" stands.
  See D151.
- AUDIT-01 (2026-08-11) — `npm run audit` goes green: the draft-governor
  assertion stopped testing the pre-M8 boolean and now mirrors
  `liveConfig()`'s real `DitherConfig` substitution and its guard, and
  the `p533` axis label became the truthful `p489` across the matrix and
  audit surfaces — including one genuinely slack bound
  (`533 / 5` → `dmc.entries.length / 5`, ~9% tighter). Recorded evidence
  and archives left alone. See D151.
- Doc-sync (2026-08-11) — the protected-doc ledger drains 9 open → 1:
  the four-resolutions Zoom rename and its named D52 collision, the
  two-boundary performance contract, the ship-order fence, the UI
  section census, the retired three-disjoint-rules anatomy, and
  `bench:auto`'s target assertion. Caught in passing: `check` was
  documented as 7 steps and is 8. The survivor is deferred by its own
  terms until DUR-01 decides it. See D151.
- RENAME-02 (2026-08-11) — the platform half closes: the owner renamed
  the GitHub repo and the OneDrive directory, the agent repointed the
  git remote and `package.json`. The repo survived the synced-path move
  intact — clean tree, no conflict copies, `fsck` showing only ordinary
  dangling objects. No new decision; the why is D150.

<!-- FILE: pm_skills/project/backlog.md -->

# Backlog

<!-- Generated during project initialization. Edit freely. -->
<!-- OPEN WORK ONLY. Status: [ ] todo  [~] in progress  [-] cut. -->
<!-- Shipped work does NOT stay here. On ship: add one line to
     trajectory.md (the outcome) + an entry to decision-log.md (the why),
     then remove the item from this file. There is no Completed section. -->
<!-- Hot sectional. Agents read the Active section only by default. -->
<!-- See pm_skills/memory-policy.md for limits; run memory-maintenance.md
     (Refactor) when the queue drifts into dated rounds. -->

<!-- Ticket grammar (CANONICAL COPY — prompts and workflows point here,
     they do not restate it): quick items stay one line. Non-trivial or
     sign-off items add two lines so intent survives compression:
       - **ID Short title** [flags]
         Intent: the outcome wanted.
         Done when: the acceptance condition.
     Flags: [sign-off] (scope sign-off first → full mode), [blocked: X],
     [spike] (timeboxed investigation → spike mode in task.md),
     [detail] (has a ticket file), [maintainer] (human-owned, not agent
     work), [security] (live exposure — a leaked credential or open auth
     hole; nothing weaker).
     Standing items — [maintainer], [sign-off], or [blocked] work that
     waits across sessions — carry their creation date (YYYY-MM-DD) so
     Start B can surface their age at the pick and Diagnose can flag the
     stale ones. A [security] item is a standing item by definition and
     additionally prints a one-line session-start banner until closed;
     flag a leaked-credential tracking item [security] on creation
     (tracking is not remediation — rotate first).
     Add optional Scope:/Risks: lines only for sign-off items. -->

<!-- Optional detail file: when an item needs more context than its line
     can hold (research, options explored, acceptance detail, links),
     put it in pm_skills/project/tickets/<ITEM-ID>.md and add the [detail] flag
     to the item. Cold tier — agents read it ONLY when that item is the
     active task, so Active stays terse. Working context only; the "why"
     still goes to decision-log.md on ship. The file is deleted when the
     item ships or is cut — it does not outlive the item.
     Exception (D149): Batch C0's items share one run sheet,
     tickets/BATCH-C0.md, because they ship together in one run. -->

Milestones ship in order. A milestone is done when its acceptance
line passes and `check` is green. Requirements references are to
`docs/requirements.md`.

**Ship order is no longer milestone-number order** (D149). Shipped:
M0–M8, M13, M14, M15, **Batch C0** (D149–D159, 2026-08-11) and
**Track B** (DUR-01 + SAVE-01, D179, 2026-08-23) and the **small UI
batch** (eight items, D191–D196, 2026-08-23); **Track A** is
build-complete (D165–D170), its close parked with the print programme.
The order set on 2026-08-23 (D189): the small UI batch first, then
**Track D — Creative control**, then **Track C — Publication**; the
**Print** programme (M16's sitting, PRINT-01 → PRINT-02, PRINT-TEST-01)
waits in the Icebox until the owner schedules it. The numbers stay
because they are greppable across the tickets and the decision log;
they no longer imply sequence. Amended 2026-08-27 (D208): **Track E —
Hardening** interleaves — BATCH-E0 any time, the STATE spine after
ADJUST-02 and before Track D's remaining slices, the public-surface
group riding with Track C.

## Active

<!-- Refactored 2026-08-27 after BATCH-E0 (D209): preambles and item
     bodies were restating D188/D200/D208. Intent + acceptance here;
     the why stays in the log. -->

### Current — Track D Creative control of the image

The user controls the final picture *inside* the app, beyond
nearest-colour realism (D188). Five slices signed in order at D200;
shared spec in `tickets/CREATIVE-01.md`, which dies with the last
slice. PAINT-01 scopes separately.

- [~] **TONE-01 Tone mode: the weighted metric, the ramp and the curve** [detail] (2026-08-23)
  Intent: slice 1, schema v12 — the colour↔tone weight through metric,
  selection, dither and LUT key; ladder mode with cut handles on the
  ramp; natural cuts + Equalise; the three-point curve; the colour-use
  floor.
  Done when: a ladder profile maps a photograph as tone at the
  end-stop, the ramp readout shows achieved shares under dither, and
  the four naming items are settled with the owner.
  Status: built and verified (D201/D203). Open is the owner half only —
  mode name, floor label/unit, confetti wording, ramp shape — plus a
  native keyboard pass on the ramp cut handles.
- [ ] **PICK-01 Eyedropper: grab a colour from the picture, the design or the screen** (2026-08-23)
  Intent: slice 3, no bump — pick from the source, the rendered design,
  or (where the EyeDropper API exists) anything on screen, resolved to
  the nearest threads with their distance. Feeds Must-use, swap targets
  and the inventory; pilots the preview tool-mode PAINT-01 inherits.
  Done when: a picked colour lands in Must-use, a swap target or the
  inventory with its ΔE shown.
- [ ] **SHEET-01 The contact sheet as a mechanism** [detail] (2026-08-23)
  Intent: slice 4, no bump — frozen still → labelled variants → a pick
  adopts, through the worker. Axis 1 dither presets, axis 2 adjustment
  presets. The render loop must not yield on frames alone (an occluded
  window suspends rAF).
  Done when: both axes ship through the worker, a pick adopts, and the
  adoption sentence survives the reprocess (STATUS-01 or equivalent).
- [ ] **COMPARE-ERR-01 Match-error compare: the ΔE heat map** (2026-08-23)
  Intent: slice 5, no bump — a Compare-class decoration (D92) showing
  where the palette serves the picture worst, which is where a Must-use,
  a swap or a painted cell earns its place.
  Done when: the heat map ships as a compare mode with an honest label.
- [ ] **PAINT-01 Scope the pixel editor** [sign-off] [detail] (2026-08-23)
  Intent: an editor a stitcher can work in, not a demo brush — tools,
  the interaction model by pointer/keyboard/touch, persistence,
  clearing, undo, and composition with the swap's render palette
  (D199). Stills only in v1.
  Done when: the owner signs the v1 tool set, interaction model,
  persistence and build slices; each slice becomes its own item.

### Interleaved — Track E Hardening

From the 2026-08-26 external review, adopted at D208; the report stays
untracked at `_user-guff/2026-08-26-repo-review.md` — it maps unfixed
surfaces of the live app. No schema changes anywhere in the track.
BATCH-E0 shipped (D209); ADJUST-02 shipped (D211); the spine's
convention is signed (D212) and runs serially in `main.ts` as
STATE-02…05 — note the order was swapped on evidence, so STATE-02 is
the capture work and STATE-03 the snapshots. Track D's remaining
slices wait on it (SHEET-01 multiplies in-flight requests, the defect
the spine repairs). STORE-01's library half and LIMIT-01/02 are
parallel-safe; the public-surface group rides with Track C.

- [~] **STATE-02 Source transitions and capture release** (2026-08-27)
  Intent: slice 1 of the signed spine (D212), first because it closes
  three findings a user can reach today — one `transitionSource(next)`
  settling and stopping the outgoing source before installing the
  next, one `clearSourceState()`, cleanup-on-failure around
  acquisition, and the grab surface cleared once its still is taken.
  Done when: capture→file / sample / project / capture, a late picker
  completion and a `video.play()` failure each stop the superseded
  tracks exactly once (mocked); source-less and corrupt loads leave no
  previous image in preview, worker input, history bytes or package
  contents; verified live in Chrome plus one non-Chromium browser with
  the OS indicator observed off.
  Scope: `src/main.ts`, `src/capture/session.ts`, `src/capture/pump.ts`.
  Status: built and verified 2026-08-27 (D213) — the transition lives
  inside `setStillMaster`, so all four source routes take it; the
  mocked failure paths and the surface release are green. Open is the
  human half only: a live capture pass in Chrome plus one non-Chromium
  browser with the OS indicator observed off after each transition,
  which an automated browser cannot drive (`getDisplayMedia` needs a
  real picker).
- [ ] **STATE-05 History queue** (2026-08-27)
  Intent: slice 4 (D212), last because it has no verified live symptom
  — snapshots capture synchronously into immutable values, and enqueue
  returns a promise resolving on commit-or-supersede (a real flush
  barrier).
  Done when: rapid design switching under deferred image bytes never
  mixes JSON, image, title or ID across generations.
- [ ] **STORE-01 Persistence is atomic and honest** (2026-08-27)
  Intent: one-transaction `putReplacing(snapshot, victims)` so eviction
  cannot outlive a failed replacement; await `transaction.oncomplete`
  everywhere; an explicit initialising / persistent / session-only
  storage state with early writes queued or refused visibly. Library
  files are parallel-safe beside the spine and start now (D212); the
  `main.ts` adoption seam lands after STATE-02.
  Done when: an injected put-failure after victim deletion loses
  nothing, and "saved" means committed.
- [ ] **LIMIT-01 The export refuses unpayable page counts** (2026-08-27)
  Intent: arithmetic page-count precheck before `slicePages` — refuse
  above 500 naming the count, confirm above 60 (D208); iterate pages
  during assembly instead of retaining every PNG. Export-side only —
  the round-trip invariant forbids clamping on load; PRINT-01 inherits
  the cap.
  Done when: an over-cap request is refused before any allocation
  (instrumented), the boundary passes, and a moderate multi-page export
  is byte-stable.
- [ ] **LIMIT-02 The package parser budgets before it copies** (2026-08-27)
  Intent: gate `File.size` before `arrayBuffer()`, cap the central
  directory aggregate at 256 MiB and `project.json` at 16 MiB (D208),
  allocate named supported entries only — today sixteen 256 MiB entries
  are nominally valid and every entry is sliced after the whole file is
  read.
  Done when: synthetic oversize headers are refused with no allocation
  (spies, no giant fixtures) and the limits are documented user-facing.

**With Track C, owner-paced** (D208): the public-surface group.

- [ ] **NOTICE-01 Notices cover the shipped closure** (2026-08-27)
  Intent: the production bundle ships `@pdf-lib/standard-fonts`,
  `@pdf-lib/upng`, `pako` and `tslib`; none appear in
  THIRD-PARTY-NOTICES.md. Reconcile against the resolved closure and
  pin it with a test; the owner approves the wording (D161/D177).
  Done when: every bundled runtime package is listed and the closure
  test is green.
- [ ] **DIAG-05 Diagnostics honour the disclosure** (2026-08-27)
  Intent: titles, filenames and capture labels survive in message and
  scope strings; the newest-80 cut lets frame chatter evict the error
  that mattered; every frame updates a live region. Allowlist the
  bundle schema, omit or hash labels, keep errors from the whole ring,
  sample frame telemetry, announce transitions not frames — and correct
  the in-app disclosure in the same commit. A11Y-VO-01 gains a re-check
  line.
  Done when: a bundle from a realistic-filename session contains none,
  eighty-plus frame logs cannot evict an error, and announcements per
  reprocess are bounded.
- [ ] **CAP-01 Capture is offered only where it can work** (2026-08-27) — preflight `getDisplayMedia`; where absent the control is disabled with a reason instead of failing on use. Done when a browser without the API shows the reason, not a failure.
- [ ] **CROP-01 Crop pins meet the 44 px rule** (2026-08-27) — the pins measure ~24 px against the AAA 44 × 44 hard rule; invisible hit-area enlargement, no visual change, keyboard crop stays green, a UI-STANDARDS line records the pattern.
- [ ] **INFRA-04 `check` obeys its own invariant; the reboot verb exists** (2026-08-27)
  Intent: `check` writes WASM and `dist` against the AGENTS
  non-mutating rule; a missing local wasm-pack skips green while CI
  installs it; the documented one-command reboot surface is
  unimplemented. Conform the code (D208), docs reconcile after.
  Done when: a whole-tree manifest is identical across `check`, missing
  tooling is a red with install instructions, and the reboot command
  exists and verifies readiness.
- [ ] **SUPPORT-01 The supported-platform policy** [sign-off] (2026-08-27)
  Intent: D149 widened the audience and the platform contract lags —
  ES2020 docs against an ES2022 build, no tested
  Safari/Firefox/mobile/private-mode matrix, meta-CSP and source-map
  postures undecided. One sitting, paired with A11Y-VO-01 and M16's.
  Done when: the matrix is signed and each gap becomes an item or an
  accepted limitation.
- [ ] **PERF-01 Settle the dither differential** (2026-08-27)
  Intent: the review's A/B kept every HEAD median under its ceiling but
  left Atkinson +17.5 % and blue-noise +10.9 % unexplained under
  extreme spread. Quiet-host interleaved pairs (three or more,
  order-reversed); if it persists, bisect. Ceilings move only with an
  explanation, never to green. `bench:auto` on the reference browser is
  the [maintainer] half.
  Done when: three quiet pairs agree and the differential is explained
  or closed.

### Next — Track C Publication

Live at <https://djdaojones.github.io/pattern-mapper/>: a green `check`
on `main` publishes the bundle and verifies it (PUB-04/PUB-05, D164).
Both items are the owner's; the deploy overtook the PUB-02 gate, so
that one is pressing.

- [ ] **PUB-02 Replace `graphic.jpg` and confirm the photo provenance** [maintainer] (2026-08-11)
  Intent: the flat-graphic demo slot is third-party fan art with a
  two-layer rights problem (the artist's copyright and the underlying
  mark); it gates public deploy (D150) and is already live. The plan
  (2026-08-12): a Blender cube lit by three RGB lights — a colour
  spread and a luminance ramp from primitives, no rights problem. The
  `PHOTO_SLOTS` contract keeps the name, so zero code changes.
  Done when: `graphic.jpg` at HEAD is rights-clean and the five
  photographs are confirmed as the owner's own (`landscape-1.jpg` also
  seeded the M8 golden crop). README-PROV-01 (D209) states the record
  until then.
- [ ] **DIAG-03 Set `DEV_EMAIL` to the dedicated alias** [maintainer] (2026-08-23)
  Intent: one line in `src/ui/diagnostics-button.ts` — a retirable
  alias, never a personal address (D187); until then "Report a problem"
  composes with no recipient. Each push deploys.
  Done when: a tester's report reaches the alias.

### Icebox

<!-- Deferred but worth keeping (post-triage). Needs a decision to
     reactivate. Promote into a milestone when committed. -->

**Print — parked 2026-08-23 on the owner's word (D189).** Scoped and
build-ready (`838f3e7`): the owner's calls — the preset sizes stand as
starting values, every print size derives from one type scale, no
backward compatibility for print settings (files still load), M16's
sitting signs the standard first — are in PRINT-01's ticket. Returns to
Active when the owner schedules it; Track A's close waits with it.

- [ ] **M16 The print standard: sign the floors and presets on paper** [sign-off] (2026-08-09, re-aimed 2026-08-23)
  The owner's sitting with a printer signs the Readable / Large print / Compact values, the default assembly mode and key placement, and records M9's print inspection and M12's estimate review (D170) — the evidence PRINT-01 builds to. Pack at `bench-reports/m16-sitting/`; its form's items 2–9 and 13 are superseded by PRINT-01's model. Done when the preset table and defaults are signed in the decision log, M9's inspection and M12's review are recorded pass/fail, and Track A's close is decided.
- [ ] **PRINT-01 The print plan: size presets with floors, a planner that fits the paper** [detail] (2026-08-23)
  Readable / Large print / Compact presets with text and cell floors, furniture as ratios of the cell, balanced tiles, paper and orientation alternatives with a page stepper, A3 and a true-size page, key with the chart or separate; the print-plan model replaces `export.pdf`. Done when a 200² design prints at ≥ 3.5 mm per stitch with ≥ 10 pt numbers by default and PRINT-TEST-01 is green at every preset.
- [ ] **PRINT-02 Assembly and sequence: join, work page by page, a key per page** [detail] (2026-08-23)
  The two ways a tiled chart is used — taped into one sheet (lettered tiles, glue tabs, registration marks, an assembly page) or stitched page by page (shaded overlap, continuation labels, stitching-order pages, a per-page key). Done when both modes print from the plan and the pages tape together by their marks.
- [ ] **PRINT-TEST-01 The proof set: one command prints every case with a checklist** [detail] (2026-08-23)
  `npm run print:proof` renders every chart style × preset × paper × mode with a proof strip per sheet and writes the tick-box checklist. Done when the set renders from one command and a ruler on the scale bar proves 100 %.

**Owner-paced — yes at the 2026-08-23 triage (D188)**, scheduled by the
owner; the catalogue is one cascade (DATA-01 → DATA-04 → DATA-03, D164).

- [ ] **A11Y-VO-01 The human remainder of the screen-reader pass** [maintainer] (2026-08-09)
  Intent: A11Y-01 took the "has a name" half; this is whether the announcements are any *good*, plus the no-meaning-by-colour check. PUB-01's Licences control and DUR-01's three new controls have joined the list (D177, D179). Pairs with M16's sitting.
  Done when: a VoiceOver pass over the main control surface is recorded pass/fail per control, and the colour-only check is answered.
- [ ] **DATA-01 Correct the swept catalogue rows** [maintainer] [detail] (2026-08-11)
  The detection half shipped (D155): the sweep runs inside `npm run audit`, worklist in `docs/catalogue-sweep.md` — 21 unnamed rows (all Finca) and 11 same-brand hex pairs. Corrections are the owner's, in `thread-list.csv`; regenerate and re-run the sweep for the delta.
- [ ] **DATA-04 Catalogue data-structure review before finalisation** [sign-off] (2026-08-12)
  Intent: settle the catalogue's shape once, ahead of DATA-03, so finalisation triggers the regeneration cascade a single time — provenance vocabulary (D161), empty-name legality, shared-hex semantics, per-brand metadata, `mappedFrom` vs the curated cross-reference note in ICE-EXPLORER-01's ticket, a data version, and where the owner CSV lives (D163).
  Done when: the owner signs the target schema with migration notes and the ripple list — `build-palette.mjs`, the core `Thread` type, every consumer, and the snapshots inside saved project files (the round trip must hold).
- [ ] **DATA-03 Finalise the catalogue values before publication** [maintainer] (2026-08-11, reshaped 2026-08-11)
  Intent: the values are compiled from public reference material, uncalibrated — the `provenance: "measured"` label is inaccurate (D161) and gets honest here. Lands as one catalogue rebuild with DATA-04's schema outcome and DATA-01's corrections (D164); manufacturer-published lists stay out of the repo.
  Done when: the owner finalises the values, the provenance label tells the truth, and the regeneration cascade runs with approvals.

**Parked follow-ups — each wakes on a named trigger** (wish-list
triage, D197).

- [ ] **INFRA-03 Gate reliability on the synced tree** — `npm run audit` intermittently reports 2 failures right after a full `check` (twice, 2026-08-11; grab `/tmp/audit.log` while red), and `crates/stitch-engine/pkg` goes stale silently without a local Rust toolchain. Wakes on the next red.
- [ ] **CAPTURE-OMT-01 Off-main-thread capture** — move the surface-sized grab readback and dirty sample off the main thread (`MediaStreamTrackProcessor`-class); an architecture change with its own scope (D135). Wakes on felt stutter, or a captured surface materially over 6.5 MP.
- [ ] **COUNT-02 Re-select against the held source** — every distinct count step pays a full-RGB refetch plus the FLICKER-01 hold although the distribution does not depend on the count. Wakes on a slider-feel report.
- [ ] **DUR-02 Accept a deflate-compressed `.pmproj`** — a package re-zipped by Finder or Explorer is refused; `DecompressionStream('deflate-raw')` in an adapter outside core would accept it. Wakes when a user hits it.
- [ ] **DUR-03 Design-history follow-ups** — remove one design, clear the history, "Keep more designs" outside the near-quota window; a "capture the same window again" offer when a restored capture returns as a still. Wakes on a user ask; the 2026-08-26 review flags the same retention-visibility gap (D208).
- [ ] **DIAG-04 One-file report** — `project.json` plus the log inside a store-only `.pmproj` the app loads directly: one download, no multiple-downloads prompt (D187 chose two files). Wakes on tester friction.
- [ ] **SYMBOL-SWAP-01 Explicit symbol swap** — take another thread's glyph and hand it yours in one act; a model verb beside `setOverride`, the picker lists the unused pool only (D191). Wakes on a user ask.
- [ ] **STATUS-01 Keep a status sentence across one reprocess** — a sentence set beside a reprocess ("X is stitched as Y.", the Must-use sentences) shows only until the frame's "Preview updated." replaces it a second later; the status line needs a way to hold a user-facing sentence through one frame (from ICE-RECOLOUR-01). Wakes on a user missing an explanation.
- [ ] **ICE-HEADERS-01 Response-header hardening** [blocked: a hosting decision] (2026-08-27) — CSP, HSTS and frame policies need a host that can set response headers; GitHub Pages cannot. Wakes if hosting moves or a concrete threat model demands it; the meta-CSP slice rides SUPPORT-01 (D208).
- [ ] **ICE-BUNDLE-01 Profile the 927 KiB client chunk** — before any code-splitting talk (the review agrees: no speculative restructuring). Wakes on a measured cold-load complaint (D208).

**Parked — each wakes on a named trigger** (D188).

- [ ] **ICE-PROFILES-02 More built-in colour profiles: the unbuilt candidates** [detail] (2026-08-09)
  Ninety-two unsigned candidates remain after batch three shipped the gallery to 33 and the manufacturer split followed (D205–D207). Wakes when CREATIVE-01's tone-only matching ships or a user asks; done when run through the signed-batch process, or cut.
- [ ] **SNAP-01 Snap any profile to one manufacturer's range** [detail] [blocked: a named trigger] (2026-08-24)
  Intent: render any colour profile in the threads you actually buy — the owner's ask at the manufacturer split. Matters more than convenience: every curated built-in is a list of specific threads and all but one are DMC, so the gallery is brand-shaped even after MENU-01 removed DMC's billing from the menu; this removes it from the profiles. Could also retire D206's multi-brand hi-vis exception. **The engine half already exists and is wired to nothing** — `core/thread-equivalents.ts` does nearest-in-CIELAB per brand with a curated-over-computed model, tested, unused. The work is profile-level application, the UI, and the honesty: there is no curated data yet (`thread-map-proposed.csv` is a header), so every snap today is a *suggestion*, and a shopping list is what people spend money on.
  Done when: not scoped — a scoping pass answers where it lives (per-design control, standing preference, or export-only) and the collision rule (two colours snapping to one thread: shrink, second-nearest, or refuse), then produces a build slice. Wakes on the owner scheduling it, on curated cross-reference data arriving (DATA-01), or on a user asking for a design in another brand.
- [ ] **ICE-PICKER-01 A searchable, taggable profile picker** [detail] [blocked: a named trigger] (2026-08-24)
  Intent: what replaces MENU-01's grouped `<select>` once profiles outgrow it — tags AND groups, both, with collapse and search over each, and a highlighted few on top (the owner's hunch, 2026-08-24: "I think we'll have well over 100 profiles as things progress", which makes this a question of when rather than whether). Not MENU-01: a search field and tag filters cannot live inside a native `<select>`, and UI-STANDARDS prefers native (lines 212, 317), so leaving it must be earned by a count grouping cannot carry — 33 is not that count. Cheaper than it looks: `ui/browse-table.ts` already owns search, the row cap and the honest count line for the 3,338-thread browse, so the work is a row model plus filters, not a search control. Three orthogonal axes must stay separate: `group` (one, MENU-01 ships it), `tags` (many, here), `featured` (here).
  Done when: not scoped — a scoping pass answers the open questions (chiefly whether user profiles get tags, which is the one that costs a schema version) and produces a build slice. Wakes when one optgroup passes ~25 on its own, when a user asks to find a profile by anything but scrolling, or when saved profiles become a scrolling problem themselves.
- [ ] **ICE-SELECTS-01 Converge the four profile selects on one option renderer** (2026-08-24)
  Intent: four selects list profiles — `#colour-profile` (`ui/colour-section.ts`), `#dither-profile` and `#adjust-profile` (`main.ts`), and the editor's shared `#<kind>-profile-switcher` — and each hand-rolls its option loop. They have drifted: one builds labels inline, two build from `[value, label]` pairs, and the `(built-in)` suffix and sentinel handling differ between them as a result. The *controls* are correctly separate (a section select applies a profile to the design; the switcher opens one for editing, guarded by `confirmDiscard`) — only the rendering should converge. MENU-01 extracts a helper for the two colour selects as a precondition of grouping; this item finishes the job across all four.
  Done when: one renderer serves all four selects with their differences expressed as options, not as copies. Wakes when MENU-01 has landed its helper, or when a fifth select is proposed.
- [ ] **TWOCOLOUR-01 A two-colour mode whose two colours you choose** [detail] (2026-08-24)
  Intent: two colours of the user's choosing is reachable today only by building a profile with two pinned colours — seven steps through a general editor, and nothing in the product names the idea (`grep` finds no "1-bit" or "two colour" in the UI). Worse, the name that does exist misleads: `1-bit RGB` is eight colours, being one bit per channel, so the app currently answers the question wrongly. `Black & white` is the obvious start and cannot be edited, its membership being a generated map. The ticket carries three shapes (a pinned built-in, a fourth profile kind, a Colour-section shortcut) plus the `1-bit RGB` re-label; the owner picks.
  Done when: a user reaches a two-colour design with their own two colours without working out that a profile is the mechanism, and `1-bit RGB` no longer misdirects. Raised by the owner 2026-08-24 and iceboxed by their own "maybe for later" — wakes on their word, no other trigger needed.
- [ ] **ICE-EXPLORER-01 Colour explorer** [detail] (2026-07-21)
  A browse view over the 3,338-thread catalogue with cross-brand equivalents and their provenance; the engine half exists. Wakes on a user ask. Its ticket carries the curated cross-reference note absorbed from ICE-XREF-01 (cut 2026-08-23).
- [ ] **ICE-TAURI-01 Tauri desktop packaging feasibility** [spike] [detail] [blocked: a named trigger] (2026-07-20)
  Raised by D149: publication targets any platform, so this spike is the packaging input. Wakes on users asking for an installable app, or browser capture proving insufficient on a platform the audience uses; its Photoshop-workspace case went with ICE-WORKSPACE-01 (cut, D188).
- [ ] **PUB-03 Clean-cut republication — dormant contingency** [blocked: a named trigger] (2026-08-12, demoted 2026-08-12)
  Intent: the D163 plan (publish from a fresh initial commit; this repository goes private as the archive), kept as an option. Wakes on a rights complaint touching this history, or the app turning commercial (which also retires the compiled catalogue values — DATA-03).
  Done when: triggered and executed per D163, or cut once publication is behind us.

<!-- FILE: pm_skills/project/brief.md -->

# Brief — Pattern Mapper

<!-- Hot whole-file read. See pm_skills/memory-policy.md for limits. -->

## What we're building

A web application that converts visual artwork into cross-stitch
designs in real time. The user edits artwork in another application
(typically Photoshop); Pattern Mapper continuously captures a selected
screen region and renders a live cross-stitch interpretation.

Built and measured on macOS first; since D149 that is where it started,
not what it targets — see "Who it's for".

Two core reductions define the product:

- **Spatial reduction** — source image → fixed stitch grid
  (e.g. 200 × 200 stitches, max 1024 × 1024).
- **Colour reduction** — source colours → a selected thread palette,
  with dithering as a first-class creative tool.

Full requirements: `docs/requirements.md` (cite section numbers,
do not duplicate content into memory files).

## Who it's for

Primary user: the project owner (personal creative use on macOS).

**Widened 2026-08-11 (D149).** The owner intends to publish the app
online to a broader audience who "could be using it on anything", which
moves wider distribution from *planned later* to *intended*, and has
three consequences the roadmap must respect:

- **"macOS-first" is no longer the product**, only where it was first
  built and measured. Cross-platform behaviour stops being a
  don't-foreclose-it constraint and becomes a requirement.
- **No upstream editor can be assumed.** Much of the design rests on
  the user editing in Photoshop beside the app; a broader audience may
  have nothing of the kind. This is why controlling the image inside the
  app — adjustments and colour thresholds as presets (ICE-ADJUST-01) —
  is product scope rather than duplication of a better tool.
- **Redistribution changes licence questions**, most immediately M9's
  symbol font or asset choice: embeddable for personal use in a local
  web app and redistributable in a published app are different answers.

Architectural choices must not foreclose it (hence web platform,
offline-capable, Tauri as a future packaging path — ICE-TAURI-01).

## MVP scope (build this, nothing more)

This is the **original** MVP definition, kept as the record of what was
committed first. M0–M5 delivered it; the roadmap since (M6–M12,
restructured in D51) deliberately extends past it — most visibly M7,
which replaced item 1's "one preset thread palette" with an eight-brand
catalogue and a full policy layer. Read it as intent, not as the
current feature list; `README.md` has that.

1. **Engine** — image-file import; custom grid width/height; full-RGB
   mode or one preset thread palette; resize to grid; nearest-colour
   palette reduction (CIELAB via LUT); Floyd–Steinberg dithering
   on/off; comparison of two processing orders.
2. **Preview & info** — zoomable pixel-grid preview with optional grid
   lines, major grid interval, basic tick marks, row/column
   numbering; live colour count, stitch count, per-colour counts.
3. **Exports** — clean PNG (1 stitch = 1 px), enlarged PNG (integer
   nearest-neighbour scale), styled PNG chart, basic single-page PDF
   chart; save/load project as versioned JSON.
4. **Live capture** — screen/window capture via `getDisplayMedia`,
   user-drawn crop rectangle, pause/resume, skip unchanged frames.
5. **Performance backends** — Rust→WASM error diffusion and
   WebGPU colour reduction behind the same stage interface as the
   TypeScript reference implementation, adopted only where profiling
   shows the TS version misses budget.

## Performance bar

Interactive feel while editing in Photoshop: ≥ 4 preview updates/sec
at typical grids (≤ 300 × 300); full pipeline ≤ 100 ms at the
1024 × 1024 maximum. Exports always run at full quality regardless of
preview mode. (The 1024² ≤ 100 ms line was retired at the M13
synthesis — D135: 1024² is an export/finishing grid bound by
correctness and honest published medians, not a live-editing target.
The ≥ 4 updates/sec promise binds at the driven capture leg.)

## Explicitly out of scope for MVP

Multiple dithering algorithms beyond Floyd–Steinberg (since shipped
post-MVP: M8's five-method expansion — D61/D62), user-defined
palettes and palette import/export UI, symbols and pattern keys,
multi-page PDF, advanced grid/tick styling, thread-length estimates,
fabric simulation, image adjustments beyond the pipeline hooks,
Photoshop plugin integration (explicitly rejected — see
decision-log), embroidery machine formats, cloud/collaboration.
These live in `wish-list.md` / requirements §25.

## Success criteria

- Editing in Photoshop with live preview feels responsive (no
  perceptible lag at 200 × 200).
- A stitchable chart PDF can be printed from a captured design.
- A saved project reopens with identical output (golden-test
  guarantee).

<!-- FILE: pm_skills/project/conventions.md -->

# Conventions — Pattern Mapper

<!-- Hot whole-file read. See pm_skills/memory-policy.md for limits. -->

## Code style

### TypeScript

- `strict: true`; `any` is banned (use `unknown` + narrowing).
- Pixel data is always `Uint8ClampedArray` / `Float32Array` /
  `Uint16Array` — never arrays of objects, never per-pixel
  allocation inside loops.
- `src/core/` imports nothing outside `src/core/`. Enforced by an
  ESLint `no-restricted-imports` rule, not by convention.
- Pure functions in the engine: same input → same output, no
  mutation of arguments. Randomised algorithms (random dithering,
  blue noise) take an explicit seed.
- JSDoc on every exported symbol (framework default). Engine
  functions document units and value ranges (e.g. "0–255 sRGB",
  "Lab, D65").

### Rust (crates/stitch-engine)

- `wasm-pack` build, `#![forbid(unsafe_code)]` unless a benchmark
  justifies an exception recorded in the decision-log.
- Buffers cross the boundary as `&[u8]`/`&mut [u8]` views over shared
  memory; no serde in the hot path.

## Naming

- Files: `kebab-case.ts`; types `PascalCase`; functions/vars
  `camelCase`; WGSL files mirror their stage name (`reduce.wgsl`).
- Stage params objects are named `<Stage>Params` and are the single
  source of truth for both UI controls and project-file schema.

### UK English

Spec, UI copy and docs use UK spelling ("colour") — except code
identifiers, which use US spelling (`color`) to match platform APIs.

## Commit messages

- Conventional commits (`feat:`, `fix:`, `perf:`, `test:`); one
  logical change per commit.

## Documentation

- JSDoc on every exported symbol. Engine functions additionally
  document units and value ranges (e.g. "0–255 sRGB", "Lab, D65").
- The permanent documentation rules (explain why not what, no
  boilerplate) are in `AGENTS.md`.

## Testing (lean, invariant-led)

- **Golden tests are the spine.** Every pipeline stage has fixtures:
  input buffer + params → expected output buffer, generated by the TS
  reference and committed. WASM/WebGPU backends run against the same
  fixtures (bit-exact for error diffusion; tolerance ≤ 1/255 per
  channel for GPU colour math, tolerance documented per test).
- Invariants over examples where possible: output dimensions match
  grid; every output pixel ∈ palette when reduction is on; stitch
  counts sum to w×h; project save→load→save is byte-identical.
- Benchmark test asserts the architecture.md budgets on CI (generous
  CI multiplier ×3; exact budgets checked locally).
- No UI snapshot testing in MVP; UI logic that matters (crop-rect
  math, zoom/pan transforms) is extracted into pure, tested modules.

## Patterns to follow

- LUT-based colour matching (15-bit RGB → palette index) rebuilt on
  palette/metric change; exact error terms in the dither stage.
- Typed-array buffers crossing thread boundaries as transferables,
  never structured-clone copies.
- **A range-shaped colour profile is the eligible universe, not the
  palette.** Its rule narrows the catalogue; the design's colour-count
  limit then selects the actual palette from what survives. So a
  healthy one resolves in the hundreds (Sepia 346, Pastels 965) and
  judging it by entry count is a category error — narrowness of
  *character* is the property that matters. Where a count bound is
  needed, count **distinct colours**, not entries: 3,338 catalogue
  threads render as only 2,830 distinct colours (D55/D56), so entries
  overstate what a profile offers the eye. See D139.

## Patterns to avoid

- Per-pixel object allocation inside processing loops.
- Anything in `src/core/` importing outside `src/core/` or touching
  the DOM/Workers/I-O.
- Optimising ahead of the profiler (adding WASM/WebGPU/shaders
  without a recorded profile).
- Reintroducing UXP / Photoshop-plugin approaches (decision-log D2).

## Tooling

- Bundler/dev: Vite. Test runner: Vitest (+ golden fixtures).
- Types: `tsc --noEmit` (strict). Correctness: ESLint +
  typescript-eslint, including the `no-restricted-imports` core
  isolation rule. Format: Prettier (auto-fix on save, never a gate
  failure).
- Rust: rustfmt (format) + clippy (correctness); `wasm-pack` build
  from M5.
- Docs: EditorConfig + the scaffolded markdownlint baseline +
  `check-links.mjs`; cspell with a domain dictionary once one exists.
- The `check` command that composes these lives in
  `DEV-INFRASTRUCTURE.md` → "Quality gate".

<!-- FILE: pm_skills/project/decision-log.md -->

# Decision log — Pattern Mapper

<!-- Append-only. Newest at the bottom. Don't edit old entries. -->
<!-- Use this during the design phase of each task to record what you chose and why. -->
<!-- Hot sectional. Agents scan the latest 10 HEADINGS by default and
     open only the bodies relevant to the task. -->
<!-- Keep each entry tight: Decision / Rationale / Alternatives, not an essay.
     The live log is budgeted by WORDS as well as entry count (see
     pm_skills/memory-policy.md), so verbose entries trip a prune sooner. -->
<!-- This is the home of the WHY. The backlog/trajectory only point here;
     never paste an entry's prose into those files. -->

## Archived: D1–D10 — see archive/decision-log-2026-07-16.md

## Archived: D11–D45 (2026-07-17 → 2026-07-19) — see archive/decision-log-2026-07-17-to-2026-07-19.md

## Archived: D46–D90 (2026-07-20 → 2026-07-23) — see archive/decision-log-2026-07-20-to-2026-07-23.md

## Archived: D91–D105 (2026-08-04 → 2026-08-05) — see archive/decision-log-2026-08-04-to-2026-08-05.md

## Archived: D106–D148 (2026-08-06 → 2026-08-09) — see archive/decision-log-2026-08-06-to-2026-08-09.md

## Archived: D149–D171 (2026-08-11 → 2026-08-12) — see archive/decision-log-2026-08-11-to-2026-08-12.md

## D172 — PUB-04: GitHub Pages serves the built bundle, not the raw branch (2026-08-22)

**The owner switched GitHub Pages on** to share the app (2026-08-22,
"Deploy from a branch": `main`, `/(root)`) and the live URL served
an empty shell. The raw repository is not the app: `index.html` asks
the browser for `/src/main.ts` — TypeScript, resolved against the
domain root — so nothing loads. The branch deploy also published the
whole tree (docs, project memory, tests, the demo photos) at a public
URL.

**Decision.** Publish the production bundle from CI instead. On a push
to the default branch, a green `npm run check` is followed by a second
`vite build --base /<repo>/` — a project site lives under
`/pattern-mapper/`, and the gate's own build at base `/` stays a build
proof, not the shipped artefact — then `dist` is uploaded as the Pages
artifact and a `deploy` job publishes it. The bundle carries the Rust
engine because `check:wasm` has already built the pkg in the same job.
One runtime string had the domain root baked in — the profile-demo
slot loader — and now reads `import.meta.env.BASE_URL`, pinned by a
regression test under a non-root base. `npm run build` and `vite
preview` keep base `/`, so `bench:auto` and local preview are
untouched. The Pages source must be **GitHub Actions**: a branch
source keeps its own build running and races the workflow on every
push.

**Alternatives.** A committed `gh-pages` branch (build output in git —
the history the D150 posture avoids); a separate deploy workflow
chained by `workflow_run` (a second toolchain install, and a run the
owner correlates by hand); Vite `base: './'` (fragile for the worker
and wasm asset URLs).

**Gates recorded, not waived.** PUB-02 gates public deploy and is
still open — `graphic.jpg` was already live under the branch deploy,
so this change narrows the public surface to `dist` rather than
widening it; the owner's replacement is now the pressing Track C act.
PUB-01's "reachable from the app" clause has a real deploy to ship
with. The bench harness (`bench.html`) rides along in the bundle;
whether it should is parked.

**Scope.** `.github/workflows/lint.yml`, `src/ui/profile-editor-preview.ts`,
`tests/profile-editor.test.ts`, `.claude/launch.json` (a base-path
preview config), `README.md` (live URL), memory files.

**Link:** `DEV-INFRASTRUCTURE.md` § Deployment still reads "post-MVP,
published by the host" — captured in `doc-deltas.md` for the next
doc-sync.

## D173 — ICE-RECOLOUR-01 opens, and the first live-app reports are diagnosed (2026-08-22)

**Context.** The first user feedback since the site went live (D172)
arrived through the owner: "the number of colours limitation is not
honoured" and "must have colours not working". The same message asked
for a review of creative colouring — a pixel editor, a colour swap,
"something that gives users the creative potential to move beyond
realism" — and, later in the session, a target % distribution of
palette colours, strongest at 1-bit.

**Diagnosis, confirmed in the running app before anything was
proposed** (the D157 rule). The count limit was *honoured* on every
path reachable in-session: constraint off → 252 of 489 colours used,
8 → 8, 3 → 3, 12 → 12, a switch to Pastels → 8 of 965; the live pump,
grab, sample, pattern-change and project-load paths read correct. The
report is therefore not reproduced (COUNT-01, blocked on the
reporter's steps or a diagnostics bundle); the named candidates are the
editor's design preview, which renders the whole profile by design
(D116), Must-use seats exceeding the limit, and the one-frame two-step.

Must-use, by contrast, has a mechanism: the search-to-add offers the
entire build, so a thread outside the profile's membership can be
chosen, after which the resolver keeps the seat and emits a Note rather
than filling it — Anchor 403 on the DMC profile, and both seats after a
switch to Pastels, reproduced exactly. That is a contradiction
validated after the fact, the shape UI-STANDARDS says to make
unrepresentable. A second, semantic half: a seat guarantees a palette
entry, never stitches (DMC 666 took 701 stitches with dithering and
157 without; on a picture with nothing near it, none). Both halves are
MUST-01.

**Decision.** Open ICE-RECOLOUR-01 as a `[sign-off]` review item with
the exploration in its ticket: a thread-for-thread **swap layer** (a
pure stage over the index sidecar — presence, which Must-use cannot
promise), a **pixel editor** of cell overrides (after DUR-01: hand
edits must survive the tab), and quantiser controls — tone-only
matching so curated ladders work as two-tone maps, and the owner's
distribution target, exact at two states (a quantile threshold) and
iterative above. Recommended order: swap → tone-only → editor; the
distribution control stays deep-thought. No code changed.

**Alternatives.** Fixing Must-use by scoping its search to the profile
(smaller, but a user who wants a colour the profile lacks is left with
nothing) versus auto-pinning every Must-use into the design's recipe
copy (the D114 (edited)-copy pattern; recommended). Building the pixel
editor first (the largest surface, and premature while the app still
loses work on tab close).

**Scope.** `backlog.md` (MUST-01, COUNT-01, ICE-RECOLOUR-01), three
ticket files, `wish-list.md` (three findings from the trace), this
entry. No product code.

**Link:** ICE-RECOLOUR-01's swap is the presence half of MUST-01;
MUST-01's own fix is the seat half.

## D174 — The owner's project file names the mechanism; DIAG-02 opens (2026-08-23)

**Context.** The owner could reproduce both live-app reports and sent
the saved project (`project-120x60.json`). Its palette block was the
diagnosis: profile `builtin:my-threads`, six Anchor/Ariadna Must-use
seats, `count.n = 8`, and `snapshot: []` — the snapshot is
`config.palette?.entries` at save time, so the palette was null with
Threadify on.

**Mechanism, confirmed by loading the file into the dev build.** My
threads resolves over the inventory of the browser it runs in — not in
the file, and empty here. An empty membership fails resolution,
`resolvePalette` maps failure to `config.palette = null`, and the
pipeline runs full-RGB: the picture not reduced, no seats. The readouts
then mislead by omission: "Colours in use: 3305 · limit 8" (the suffix
keys on `paletteMode`, not the palette), "≈ 12.2 m · 3305 skeins" (the
M12 guard keys on the mode too), six live chips, and one "Problem:"
line carrying the generic profile-empty sentence rather than "your
inventory is empty in this browser". Owning one seat's thread gave
"1 · limit 8" — and exposed a grammar slip in the profile-world count
sentence. The two complaints are one state. COUNT-01 is therefore
reproduced and re-titled; MUST-01 keeps the seat semantics, with the
My-threads variant added. Yesterday's "not reproduced" verdict stood
on the DMC path, where nothing is wrong — the file supplied the path.

**Decision.** DIAG-02 opens, on the owner's instruction: the Debug menu
behind a `?diag=1` opt-in on the live build (the `DIAG=1` flag the
diagnostics contract reserves, after its redaction review), palette
resolutions logged, and a one-click report bundling the project JSON
with the redacted log — the saved file proved to be the evidence, and a
tester would not know to send it. No code changed; the fixes wait on
the owner's pick (state the failure where the picture is, or refuse to
render — the ticket recommends the former).

**Scope.** `backlog.md` (COUNT-01 rewritten and unblocked, DIAG-02
new), `tickets/COUNT-01.md` (rewritten), `tickets/MUST-01.md` (update),
`tickets/DIAG-02.md` (new), `wish-list.md` (one line: My-threads
designs are not portable), this entry.

**Link:** COUNT-01's fix is the presentation of a failed resolution;
MUST-01's is the seat; DIAG-02 is how the next report arrives whole.

## D175 — COUNT-01 ships: a failed resolution stops looking like a render; DIAG-02's opt-in and palette log ship with it (2026-08-23)

**Decision.** The owner asked for "all the quick fixes" from D174, and
they landed as one batch, each a minimal upstream change:

- A profile that resolves to nothing still renders full-RGB — the
  fallback stays, the owner's pick being the recommended "state it
  where the picture is" over refusing to render — but it can no longer
  pass as a palette render: the Stats line reads "3305 · no palette
  applied" instead of "· limit 8" (`colourInUseLine` now tests the
  palette, not the mode), the thread estimate says "needs the palette
  applied" rather than pricing 3,305 skeins (the same correction to
  the M12 guard), and the Colour section's summary states the
  consequence — the picture is shown without threads, and the limit
  and Must-use do not apply — beside the Problem line that states the
  cause.
- The cause is now the right one: `resolveProfileMembership` names an
  empty inventory under My threads ("your inventory has no threads in
  this browser…") — an error when that is the whole profile, a warning
  when other libraries carry it — instead of the generic profile-empty
  sentence whose three remedies were all wrong.
- The profile-world count sentence is grammatical ("resolves 1 colour,
  so it is being used").
- MUST-01's honesty half: the status line after a pick outside
  membership says so, and the Must-use group explains seat versus
  presence. The seat semantics stay the owner's — the item is now
  `[sign-off]`, because auto-pinning reverses M15-CORE-03's "kept and
  explained" rule.
- DIAG-02 shapes 1 and 2: the Debug menu mounts in a production bundle
  behind `?diag=1` — a per-visit URL parameter, not a build flag,
  because the live site is one bundle for everyone — after the
  redaction review the contract reserved (every logger call read:
  sizes, timings, backend names, export options, user-chosen
  filenames, the capture's display label, crop coordinates, browser
  error messages; nothing from storage, no credentials); and
  `resolvePalette` logs every resolution, so the next bundle carries
  the profile, rule, seats, membership, selection and conflicts.

**Verification.** `check` green at 1,262 tests (+6: the inventory
sentences, the opt-in rule, and a first direct suite for the
profile-world resolver, which had none). The owner's
`project-120x60.json` re-run live before and after; a `vite preview`
of the production build shows the Debug menu with `?diag=1` and not
without.

**Alternatives.** Refusing to render on a failed resolution (honest,
but hides the picture the user just loaded); a `DIAG=1` build flag
(would expose the menu to every visitor of the one public bundle).

**Scope.** `src/main.ts`, `src/core/color-profile.ts`,
`src/core/palette-resolve.ts`, `src/ui/colour-section.ts`,
`src/ui/diagnostics-button.ts`, three test files (one new), memory
files, one doc-delta (the diagnostics contract).

**Link:** DIAG-02's remaining shape is the one-click report, on the
`DEV_EMAIL` decision; MUST-01 waits on the seat sign-off.

## D176 — MYTHREADS-01 ships: the empty-inventory dead end gets an exit, and "My threads" becomes "My inventory" (2026-08-23)

**Context.** The reporter's second save (`project-120x60 (1).json`) was
the same null-palette state as the first with the Must-use colours
removed: D175 had made the state honest, not escapable. The owner
signed the ticket's recommendation ("yes, patch it").

**Decision.** Three changes, together:

- **A disabled option with the reason.** While the inventory is empty,
  the profile select lists "My inventory (built-in) — empty: mark
  threads as owned first" as non-selectable; a design already linked to
  it (a loaded file) keeps its option selectable, labelled "— empty in
  this browser". One new fact in the section state (`inventoryEmpty`),
  fingerprinted with the options.
- **A banner beside the picture.** While Threadify is on and the
  design's palette is null, the Preview section shows "No palette
  applies — *the error sentence* The picture is shown as it is." with
  **Use DMC** (adopts the DMC profile through the same `adoptProfile`
  routine as the select — an explicit act, never a silent substitution)
  and **Add threads** (opens the Colour section and the inventory
  reveal, focusing its search; shown only when the recipe draws on the
  inventory). One writer, synced from every palette-changing path:
  `resolvePalette` and both branches of `applyLoadedPalette`.
- **The rename.** The built-in is "My inventory" (id
  `builtin:my-threads` unchanged — saved files reference ids), the
  reveal is "My inventory", the editor's library row reads "My
  inventory — threads you own", and the two D175 sentences follow.

**Verification.** Types, lint, 1,262 tests; live on the reporter's
file: the banner and its sentence appear on load and with a picture
("3305 · no palette applied"), Add threads opens the reveal with the
search focused, Use DMC gives "8 · limit 8" and hides the banner, and
a fresh session shows the option disabled with its reason.

**Alternatives.** Rendering nothing while the palette is null — kept in
reserve if the banner proves insufficient in the field; a silent
fallback to DMC on load (forbidden by D55: nothing is substituted by
name without the user's act).

**Scope.** `src/main.ts`, `src/ui/colour-section.ts`,
`src/core/color-profile.ts`, `src/ui/profile-editor-colour.ts`,
`src/ui/styles/shell.css`, memory; one doc-delta (`docs/ui-spec.md`,
the Preview section's census).

**Link:** both reporter files now open to a one-click way out; MUST-01's
seat semantics and DIAG-02's report half remain open.

## D177 — PUB-01 ships: the licences and notices are reachable from the app (2026-08-23)

**Context.** D161 committed `LICENSE` and `THIRD-PARTY-NOTICES.md`; D172
gave the app a deploy to ship them with. What remained was placement
and mechanism; the owner picked the placement, relayed through the
coordinator of the 2026-08-23 parallel run (branch `pub-01`).

**Decision.** A ghost (borderless) **Licences** button after Source in
the shell bar — Carbon's header anatomy, no added height because it
sits in the existing 44 px utility row, and borderless keeps a legal
link subordinate to the product action beside it; visible on first
landing because `applyShell` hides the Source button, never the bar.
It opens a Close-only `formModal`, "Licences and notices", whose first
`h3` takes initial focus so the dialog opens at the top. The two root
files arrive by `?raw` import, so the bundle carries the documents: no
fetch, nothing root-relative, base-path-proof by construction (the
D172 lesson), still fully offline. A ~25-line pure parser renders
headings and wrapped paragraphs, not a `<pre>` dump — the hard-wrapped
MIT texts would force sideways scrolling at 320 px. A test pins each
shipped text byte-for-byte to its repo file; a source guard rejects
`fetch(` and `/LICENSE`-style paths.

**Alternatives.** Beside the build id inside `.header-id` (the header
grows a line at wide widths — the dead space fought at M14-EXT-39 /
ICE-WIDTH-02); an inline link-styled control in the version sentence
(the first non-button control against D50); the Project-section foot
(identity left it at D88); the Debug menu (opt-in only). Declined: a
wide modal variant, and a generic `.button-ghost` in `base.css` —
scoped under `.app-header` until a second ghost earns it.

**Verification.** Gate green at merge (1,276 tests); live in dev and a
Pages-base build: a 91 × 44 px target, an `aria-modal` dialog opening
at the top, Tab trap, Escape restoring focus, dark scheme, no console
errors. Human remainder: native Enter/Space activation, in-dialog
scrolling, a VoiceOver pass (A11Y-VO-01 grows by one).

**Scope.** `src/ui/notices.ts` and `tests/notices.test.ts` (new),
`src/main.ts`, `src/ui/styles/shell.css`, README's licence line,
memory; deltas ledgered for `UI-STANDARDS.md`, `docs/ui-spec.md` and
`docs/ui-evidence.md`.

**Link:** merged as `6b3d839`; Track C's open items are PUB-02 (the
rights gate) and the promoted PUB-05/PUB-06.

## D178 — MUST-01 ships: a Must-use outside the profile pins into the design's colours (2026-08-23)

**Context.** D175 made the seat honest — a Must-use outside the
profile's membership stayed a kept-and-explained Note — and left the
seat semantics to the owner. Picked on the `must-01` branch of the
2026-08-23 parallel run; both decisions relayed through the coordinator.

**Decision.** (b) auto-pin: a Must-use chosen outside membership is
written into the design's recipe copy as an include pin — D114's
"(edited)" copy pattern, "kill that green" mirrored by "I need this
red" — so the resolver's M15-CORE-03 rule changes nowhere. The reversal
is confined to the pick: a *chosen* seat no longer stays outside, while
a seat that *drifts* out (a profile edit, a moved profile on load,
adopting another profile, Revert) is still kept and explained. Built as
pure recipe helpers with thin wiring: `pinIntoRecipe` (include once,
exclusion lifted) and `unpinFromRecipe` measured against the linked
profile's base (drop the include unless the base has it, restore a base
exclusion, never add a base include the copy lacks; no base →
unchanged), so the pick and its undo are one gesture and "(edited)"
stays honest after a remove. Folded, all the owner's: adopting a
profile does not re-pin; Revert stays recipe-only; the empty-inventory
warning is judged once the table is known, so a My-inventory design
resolving through its pins alone still says so (auto-pin would
otherwise hide D176's banner); membership is asked of the resolver
before resolving, never read back from `paletteConflicts` (stale under
FLICKER-01's gate); D175's "unseated" status branch goes as superseded.

**Alternatives.** (a) a membership-scoped search with a "Search all
colours" reveal — a strict superset in code, wish-listed; wiring-only
(a removed seat's pin stayed as residue); a resolver-derived implicit
pin (reverses CORE-03 everywhere, silently widening loaded files);
load-time pinning of legacy seats (indistinguishable from drift).

**Verification.** Resolver and helper tests (DMC and Pastels pins, the
Revert shape, My-inventory + pins with the warning, an unowned pin under
`ownedOnly`), a byte-identical round trip, and the ticket's table live
before and after (Anchor 403 on DMC: 490 colours, no Note, "(edited)",
4,339 stitches reaching Colours used and the key). Gate green on the
merged tree: 1,285 tests.

**Scope.** `src/core/color-profile.ts`, `src/main.ts`,
`src/ui/colour-section.ts`, `tests/color-profile.test.ts`,
`tests/palette-resolve.test.ts`; the MUST-01 ticket deleted; memory. No
doc-delta; the save format is unchanged.

**Link:** merged as `1a2dc42`; presence itself stays ICE-RECOLOUR-01's
swap; DIAG-02 is unaffected.

## D179 — DUR-01 and SAVE-01 ship: `.pmproj` packages, a design history that restores on reopen, title-named files (2026-08-23)

**Context.** DUR-01 as signed at D171, built on the `dur-01` branch of
the 2026-08-23 parallel run; the store-only package was picked at the
option gate and the plan decisions were the owner's, relayed through
the coordinator. The branch owns schema v10.

**The file.** A saved project is a `.pmproj`: a store-only zip holding
canonical `project.json` beside the picture's bytes verbatim (a JPEG
stays a JPEG; a capture frame becomes a PNG once). Fixed 1980 stamps
and a fixed layout keep save → load → save byte-identical. v10 adds the
`source` block `{ entry, type, name }`; v1–v9 `.json` files still load
by magic-byte detection and migrate with `source: null`. The reader
treats a package as untrusted input — sizes checked from the central
directory before any copy, CRCs verified; compressed, encrypted, zip64,
multi-disk and truncated packages refused with a sentence — which is
why `project-package.ts` runs 402 lines against the ~250 trigger.

**The history.** Designs live in their own IndexedDB database,
`pattern-mapper-designs` (never the library's), payloads apart from
metadata so a listing never loads a picture; the memory fallback
announces itself. A 2 s tick observes the serialised state rather than
hooking controls, so no path is missed and no other stream's region is
touched. The latest design returns silently on boot, marked
restored-but-unsaved; a Recent designs picker lists the rest. Bounds:
10 designs / 150 MB, or 25 / 600 MB once `persist()` is granted ("Keep
more designs", offered only near the quota), clamped to half the
reported free space; eviction oldest-first, a never-saved design named
before it goes, no modal — the moment arrives asynchronously. Explicit
save stays the act that means something. Saving a live capture freezes
the frame to PNG while the session stays live; a restored capture
returns as a still and says so.

**SAVE-01.** The Design title names the file
(`Fox-sketch-200x150.pmproj`), the picture's name stands in, a local
timestamp is the last resort.

**Portability.** A loaded design drawing on My inventory gets a
warning naming how many snapshot threads this browser lacks and renders
from its saved colours; embedding the inventory is wish-listed. Found
at the boundary: a fit against a collapsed preview on a 2× display
saved `cssPxPerStitch: 0.025` and the parser refused the file;
`currentProject()` now clamps into the schema's range.

**Alternatives.** Base64-in-JSON and a sidecar pair; a store in the
library database; a confirm modal before eviction; hooking every
control.

**Verification.** Gate green on the merged tree (1,341 tests); live:
byte-identical package round trip, legacy v9 load, naming, the tick,
silent restore after a reload, the picker, a capture saving a PNG entry
while staying live. Human remainder: IndexedDB in Firefox/Safari, the
persist prompt, private mode, eviction at 10+ designs, a `.pmproj` on
another machine, VoiceOver on three new controls.

**Scope.** Five new files (`project-package.ts`, `library/snapshots.ts`,
two suites, a fixture), `project.ts`, `library/store.ts`, `main.ts`,
`tests/project.test.ts`, the ui-baseline pin; the DUR-01 ticket deleted;
`architecture.md` and README updated; deltas ledgered for `AGENTS.md`
and `docs/ui-spec.md`.

**Link:** merged as `fb1aabf`; Track B closes with it.

## D180 — PUB-05 ships: `verify:deploy` proves the live site serves the pushed commit (2026-08-23)

**Context.** D172 left "verify the live URL serves the buildId" as a
manual step. Promoted from the wish-list for the 2026-08-23 parallel
run and built on the `infra` branch; the three delegated decisions
(`--wait` kept, the `.d.mts` sibling, CI wiring) were the owner's,
relayed through the coordinator.

**Decision.** `scripts/verify-deploy.mjs` (`npm run verify:deploy`).
The live `index.html` carries no build id — `__BUILD_ID__` is a Vite
define, so the id lives in the content-hashed entry asset: the script
fetches the index cache-busted (Pages serves it `max-age=600` behind a
CDN), resolves its single `<script type="module">`, fetches that asset
and reads the id; the hashed name means it can never be a stale copy.
SHAs compare by prefix (`git --short` auto-abbreviates and can grow).
The default target is `origin/main` resolved locally — current after a
local push; pass a SHA or fetch elsewhere — and `--wait N` polls every
15 s because a deploy takes ~4 min, which makes
`git push && npm run verify:deploy -- --wait 600` genuinely one
command. One stdout line; exit 0/1/2 = PASS/FAIL/ERROR. Kept out of
`check` (it needs the network); the pure helpers are exported and
unit-tested with the network off, and `main()` runs only when the file
is the process entry. CI runs it in the deploy job after
`actions/deploy-pages` (`--wait 300` against `$GITHUB_SHA`), so a
mismatch reddens the run without un-deploying; no `npm ci` there — the
script has no dependencies.

**Alternatives.** Reading the id from the index (it is not there); a
fetch in the default path (a local push already makes `origin/main`
current — a `--fetch` flag is wish-listed).

**Scope.** `scripts/verify-deploy.mjs`, `scripts/verify-deploy.d.mts`,
`tests/verify-deploy.test.ts` (new), `package.json`,
`.github/workflows/lint.yml`; `DEV-INFRASTRUCTURE.md` deltas ledgered.

**Link:** merged as `1a5efdb` with PUB-06 (D181); first live run
`PASS` from the worktree against the deployed `72d9db7`.

## D181 — PUB-06: the public bundle drops the bench harness; every other build keeps it (2026-08-23)

**Context.** The harness rode into the public bundle because
`bench.html` / `bench-source.html` are unconditional rollup inputs
(D172 parked the question). At a public URL it was a maintainer
instrument with a broken root-relative popup (`/bench-source.html`
404s under `/<repo>/`, confirmed) and a ~2 GiB `?auto=mem` probe.

**Decision.** Option 2, the owner's through the coordinator:
`vite.config.ts` builds `main` alone when `PM_PUBLIC_BUNDLE=1`, set by
the CI Pages-build step; the default `vite build` — the gate's compile
proof and what `bench:auto` / `bench:browser` serve at base `/` — still
carries the harness. Keyed on an explicit env, not `--mode`:
`import.meta.env.MODE` / `DEV` are written into bench reports and gate
the debug panel, whereas the env changes nothing but the input list.
Verified by building both ways and listing `dist/`. For the record, in
D172's framing: the gate's build stays a compile proof, not a
byte-identical artefact proof — the public bundle's chunk graph differs
(shared chunks fold into `main`).

**Alternatives.** Keep shipping it (a partly broken maintainer page at
a public URL); exclude it from all builds (not viable — the harness
exists to measure the production build; dev-server figures are what
M5-PERF-23 gated out after D47).

**Scope.** `vite.config.ts` (`bundleInputs()`),
`.github/workflows/lint.yml`; the latent root-relative popup path is
wish-listed.

**Link:** merged as `1a5efdb` with PUB-05 (D180); the first deploy
after this merge is the first to exclude the harness —
`/pattern-mapper/bench.html` starts 404-ing on Pages by design.

## D182 — ICE-RECOLOUR-01 signs: a swap is presence, a design rule, and a pure stage over the sidecar (2026-08-23)

**Context.** D173 opened the item with three layers and five questions.
The sign-off ran on the `recolour-design` branch of the 2026-08-23
parallel run against `f33a3cb`, after two things moved under the
ticket: DUR-01 merged (D179, schema v10) and MUST-01 shipped as
auto-pin (D178), which closed the seat half and handed presence here.
Every answer was the owner's, relayed through the coordinator.

**Signed.** (1) A swap target comes from the whole universe — every
brand, the generated maps, custom colours, any other palette entry (a
merge) — because a target never enters selection, so it cannot break
what the profile promises, and D178 settled the principle one layer
down; the browse ignores "only threads I own". (2) "Swap…" is the third
verb on the Colours-used row beside Highlight and Remove, opening the
shared browse table in a modal; after X → Y the table shows Y's row
labelled "swapped from X" and Swap… there re-targets — swaps never
chain; a Swaps chip list beside Must-use is the state's second home,
where a dangling swap is kept and explained (D178's drift rule). (3)
The pixel editor paints stills only in v1 — overrides held across
frames, the brush off while frames flow — because cell edits need a
stable picture and DUR-01 made "still" the durable state. (4) Order
A → C1 → B: B depends on A's render palette, A closes MUST-01's
presence half, C1 is stage params only. (5) A swap is a design rule in
`palette.design` beside count, minimum distance and Must-use, never in
the recipe for now — a profile is a composition recipe (D114) and a
recipe-level swap would dangle in every design but the one it was made
for; `from` is the selected entry's id, `to` a full thread record (D55
snapshot semantics).

**Layer A, scoped and picked.** `config.swaps` → `buildStages` derives
a render palette (selected entries, indices unchanged, plus render-only
targets appended in swap order) and an index map, and appends a pure
swap stage after the colour stage only when a swap is active (the
`adjustIsIdentity` precedent — zero cost unused). The stage rewrites
each cell's index through the map and repaints its RGB;
`config.palette` stays the selected palette, so the LUT fingerprint
(D46) is untouched and error diffusion still runs against the matched
colour. The sidecar thereafter indexes the render palette: stats, key
entries, highlight and symbol sync switch to it through one helper.
Persistence is `palette.design.swaps`, schema v11, empty default,
byte-identical round trip; the projectJson baseline re-pins, the engine
hashes must not move.

**Alternatives.** Folding the remap into reduce/dither (touches the
protected colour stages, both backend adapters and the golden/parity
signatures for one fewer O(cells) pass); resolving at the palette layer
(a membership edit in disguise); a reveal under the Colours-used table
for the picker (rebuilt around every frame); B first (the largest
surface, solving the render palette ad hoc).

**Scope.** `tickets/ICE-RECOLOUR-01.md` only (commit `1f8dbe4`); no
product code. Ready to build as schema v11 — the only bump in its round
— in full mode from the plan gate.

**Link:** merged as `86a36e8`; presence closes MUST-01's other half
when A ships; layers B and C1 scope at their own pick.

## D183 — DIAG-02 ships its report: one click saves the settings document and the redacted log, then opens the email route (2026-08-23)

**Context.** D174 opened DIAG-02 from the first live-app reports; D175
shipped the `?diag=1` opt-in and the palette log. The remainder was the
one-click report, waiting on the `DEV_EMAIL` placeholder. Built on the
`diag-02` branch of the 2026-08-23 parallel run. This entry is the
integrator's reconstruction from the branch's commit record and module
documentation — no handoff block reached it.

**Decision.** "Report a problem" leads the Debug menu: one click saves
the project file — the palette half of any report, since its snapshot
is the palette the pipeline actually ran with (D174) — then the
redacted log, then opens a prefilled `mailto:` compose window whose
subject carries the version and build identity and whose body says to
attach both files; `mailto:` cannot attach, so the flow is
download-then-email and the copy says so, and the app stays offline.
The project text reaches the diagnostics module through a host
callback, never an import, so the module never depends on the project
model or its save format: when D179 changed the format underneath, the
only adjustment was in the wiring block — the **settings document
alone** (never the `.pmproj` package with its picture, which is the
tester's screen and must not travel on a click made for a log), under
Save's name (SAVE-01's parts) with a `.json` extension for the person
reading the email. The status line names every file the tester has to
attach — a browser that rations automatic downloads may hold the
second one back, and a named file that did not arrive is noticed.
Failures are stated: a project failure before anything is saved, a
download failure without opening mail. `DEV_EMAIL` stays empty (a
compose window with no recipient still works as a hand-off) until the
owner's **dedicated, retirable alias** lands: the address ships in a
public bundle, so it is never a personal address and never a secret —
a harvested alias is switched off and one line changes.

**Alternatives.** Reaching into the project model from the diagnostics
module (the save format would have broken it mid-round); sending the
package (the tester's picture on a log click); log content in the mail
body (the redaction boundary — a test pins that neither project nor
log content enters the URL).

**Verification.** Gate green on the merged tree (1,362 tests); nine
new tests cover the route order, the log-only case, the redaction
boundary and both failure paths, plus a guard that `DEV_EMAIL` is empty
or well-formed.

**Scope.** `src/ui/diagnostics-button.ts`, `src/main.ts` (the wiring
block), `tests/debug-menu.test.ts`; deltas ledgered for
`DEV-INFRASTRUCTURE.md` and `docs/ui-spec.md`. Open: the alias, the
owner's.

**Link:** merged as `d014e48`; DIAG-02 stays open for the
`[maintainer]` alias only.

## D184 — Pruned project memory: D149–D171 and the Batch C0 phase go to the archive (2026-08-23)

**Decision.** With the round's nine streams merged the live log stood
at 35 entries (budget 20) and the trajectory at 2,763 words (2,000).
Archived verbatim, byte-checked before the swap: decision-log
**D149–D171** (23 entries, 11,544 words — the roadmap reorganisation,
Batch C0, Track C's opening and Track A's build, up to DUR-01's scope
signature) to `archive/decision-log-2026-08-11-to-2026-08-12.md`,
and the **Batch C0** trajectory phase (1,472 words) to
`archive/trajectory/trajectory-0006-2026-08-11.md`; `archive/INDEX.md`
gained both rows. Live: 12 entries (D172 onward — the publication and
live-app era) and 1,299 trajectory words; every trajectory pointer
still resolves. Nothing rewritten.

## D185 — Roadmap refactor: the live-app section folds into Track C and the queue tightens (2026-08-23)

**Decision.** Structural repair, no re-prioritisation. The dated
"Reported from the live app (2026-08-22)" section — by now one
`[maintainer]` item and a narrative that lives in D173/D174 — is
dropped and DIAG-02 moves under Track C (testers on the live build are
a publication concern); the Track A and Track C intros state the
present instead of the past; PUB-02, DATA-01/03/04 and ICE-RECOLOUR-01
are tightened with intent and done-when preserved; the unblock order is
named on the Icebox groups; A11Y-VO-01 records the controls PUB-01 and
DUR-01 added to its list; the file-top paragraph names what remains
(M16 and Track C). Active 1,678 → 1,497 words, 22
items unchanged, no cuts, no merges, no promotions — the wish-list
triage stays the owner's at Start B. No ticket files affected.

## D186 — Doc-sync: the five reference docs catch up with the round (2026-08-23)

**Decision.** The ledger held 18 open deltas, every one from this
round or the Track A build; the owner signed all five batches, each
edit derived fresh from its source entry. `AGENTS.md`: the
`ProjectFile` shape at v10 inside a `.pmproj` package (the v6–v10
blocks named) and the Persistence checklist stating the design history
(D165, D167–D169, D179). `DEV-INFRASTRUCTURE.md`: `symbols:evidence`
and `verify:deploy` in the scripts table and under Utility scripts,
the Pages-base preview, the Debug menu with the `?diag=1` opt-in and
the D175 redaction review, `check:docs`'s `bench-reports` exemption,
the conditional rollup inputs, and Deployment rewritten from
"post-MVP" to the live CI pipeline with post-deploy verification (D165,
D172, D175, D180, D181, D183). `UI-STANDARDS.md`: the header utility
row and the ghost button (D177). `docs/ui-spec.md`: the J5 amendment,
"My inventory", and a Live-app amendments subsection (D176, D177, D179,
D183). `docs/ui-evidence.md`: the PUB-01 evidence section (D177).
Applied 18, deferred 0; ticked lines stay until the next prune sweeps
them.

## D187 — DIAG-02's decision record arrives: five owner choices behind the one-click report; DIAG-03 holds the alias (2026-08-23)

**Context.** D183 closed DIAG-02 from the branch's commit record
because the secondary's handoff had not reached the integrator; it
arrived after the round closed. This entry carries the why it held and
applies its backlog instruction: DIAG-02 leaves the backlog as shipped
(all three shapes), its ticket is deleted, and a `[maintainer]` stub,
**DIAG-03**, holds the one remaining act.

**The five choices** (the owner's, through the coordinator, or forced
by the round). `DEV_EMAIL` is a **dedicated, retirable alias** — over
"route kept with no recipient" and "downloads only" — because DIAG-02
exists because the first reports arrived with nothing attached, and
every step that asks a tester to find or type an address loses
evidence; exposure is bounded (no secret; a string in the bundle built
into a `mailto:` at click time, never a DOM href; retirable in one
line; the public repository already carries an author address on the
owner's domain). Rejected: a build-time variable (hides the address
from the repo, not the bundle) and a GitHub-Issues link (needs an
account, cannot attach, makes a tester's project public). **One route,
not two** — a tester sent a `?diag=1` link sees exactly one button.
**Two files, not one** — the project document must stay loadable as-is
(D174's workflow); the cost is Chrome's multiple-downloads prompt, so
the project goes first and the status line names both. **The document,
never the package** — D179's `.pmproj` carries the picture, the
tester's screen, which a one-click report must not send unknowingly;
on load the app says the picture the document names was not inside.
**A callback, not an import** — DUR-01 changed the model and the format
underneath it mid-round and the merge needed one line. "Every conflict"
in the Done-when is met by the palette record's per-conflict kind list;
ids and sentences are not logged (wish-listed).

**Verification (the stream's).** Gate green at 1,362 tests (+10); a
production-shaped `vite build` + `vite preview` under `?diag=1`: one
click produced the settings document (schema 10, the 8-thread snapshot,
the source descriptor) and `pattern-mapper-log.txt` (12 records, the
palette record complete), the status line named both, the JSON loaded
back with the picture-missing sentence, leak probes clean. Human
remainder: the mail client opening with the prefilled body, Chrome's
prompt, the route on the live URL.

**Link:** D183 (the reconstruction) stands; DIAG-03 is the alias.

## D188 — Icebox triage: the creative programme gets scoping of its own, a small UI batch promotes, three items go (2026-08-23)

**Context.** The owner asked for a whole-icebox triage — every item
judged worth doing or not, chunked, the yes/no and the order theirs.
It landed after the 2026-08-23 parallel run merged (D176–D183) and the
prune, refactor and doc-sync that followed (D184–D187), so it judged
the queue as it now stands: MUST-01, DUR-01 and SAVE-01 shipped,
ICE-RECOLOUR-01 signed with layer A build-ready. Nineteen items in six
chunks; the owner agreed the calls with three amendments. The print
scoping (PRINT-01, PRINT-02, PRINT-TEST-01; M16 re-aimed — `838f3e7`)
landed beside it from the Integrator chat and is not re-judged here.

**Decision.**

- **Track D — Creative control of the image opens**, the owner's major
  ask: tickets that give *space and resources* to scoping two
  programmes rather than deciding each candidate at a pick.
  CREATIVE-01 scopes the creative and diagnostic image features —
  tone-only matching, adjustments as a third profile kind, the contact
  sheet as a mechanism, the tonal provenance view, the eyedropper's
  in-app half, the distribution control, the PROFILES-02 hook — and
  PAINT-01 scopes the pixel editor as an editor a stitcher can work
  in. Each is `[sign-off]` with a ticket naming its candidates, the
  questions, the method (two or three sessions, throwaway prototypes,
  evidence on real pictures, a survey of the idiom users bring) and
  what a signature delivers; signed features become Track D items.
  ICE-RECOLOUR-01 narrows to layer A, the build-ready swap; its B and
  C layers moved into the two tickets. ICE-ADJUST-01, ICE-VARIANTS-01
  and ICE-PROVENANCE-01 leave the Icebox as CREATIVE-01's candidates —
  their IDs stay on its line, their intent in its ticket.
- **PICK-01, the eyedropper**, on the owner's ask: pick from the
  picture, the design or (the EyeDropper API, where present) the
  screen; resolve to the nearest threads; feed Must-use, swap targets
  and the inventory. Scoped in CREATIVE-01; its pick-up half in
  PAINT-01.
- **A small UI batch promotes to Next**, gateless-able:
  ICE-SYMBOL-UI-01 (UI only — model and persistence verified),
  ICE-LIMIT-01 with its scale signed (floor 2, ceiling 512, log,
  midpoint ≈ 16 — D149's own words), ICE-WIDTH-01 decided — the floor
  stays 320 px, the app is **designed for 400 px**, and phones are
  still-image users because mobile browsers lack `getDisplayMedia` —
  with the judging left as the item, ICE-WIDTH-02 reshaped (the public
  header drops the width sentence; the readout moves behind `?diag=1`)
  and DATA-05, one tooltip string that implies the catalogue is
  measured (D161).
- **Owner-paced, yes:** A11Y-VO-01 (pairs with M16's sitting) and the
  DATA-01 → DATA-04 → DATA-03 cascade, unchanged.
- **Parked with a named trigger:** ICE-PROFILES-02 (tone-only matching
  ships, or a user asks), ICE-EXPLORER-01 (a user asks), ICE-TAURI-01
  (users want an installable app, or browser capture proves
  insufficient), PUB-03 (as before).
- **Cut:** DATA-02 — closed as cosmetic (a name is decoration, D55/D56;
  real cases surface in DATA-03); ICE-XREF-01 — blocked twice with zero
  data rows, its long/tidy-form design note absorbed into
  ICE-EXPLORER-01's ticket; ICE-WORKSPACE-01 — built for the
  Photoshop-beside-the-app workflow D149 retired, and D53 already
  delivered the real goal.

**Order.** M16's sitting signs the print standard · the small UI batch
· ICE-RECOLOUR-01 layer A · CREATIVE-01 and PAINT-01 scoping (beside the
swap in a parallel worktree) · their signed slices · the Print
programme builds at the end of the cycle, as its scoping says; Track C
and the owner sittings alongside. Nothing waits on DUR-01 any more.

**Alternatives.** Cutting ICE-PROVENANCE-01 (recommended; the owner
kept it). One scoping ticket for everything (the editor would crowd
the features out). Folding the scoping into ICE-RECOLOUR-01 (layer A
must not wait on a programme). Keeping the absorbed items as Icebox
lines (one home, and the word budget).

**Scope.** `backlog.md`; tickets CREATIVE-01 and PAINT-01 new,
ICE-RECOLOUR-01 narrowed, ICE-EXPLORER-01 absorbing XREF, DATA-01 and
ICE-TAURI-01 re-pointed, ICE-XREF-01 and ICE-WORKSPACE-01 deleted;
`doc-deltas.md` (the width posture). No product code; the wish-list
untouched at 52 lines, over its cap — the owner's Start B.

**Link:** Track D's first build is ICE-RECOLOUR-01 layer A; CREATIVE-01
and PAINT-01 close on signatures, not ships.

## D189 — The queue re-orders on the owner's word: the small UI batch, then Track D, then Track C; the print programme parks (2026-08-23)

**Context.** The owner set the order directly, the day D188's triage
landed: the small UI batch first, creative control of the image
second, publication third, and printing into the Icebox. D188's order
had M16's sitting signing the print standard first and the Print
programme building at the end of the cycle.

**Decision.** `backlog.md` Active now reads Current — the small UI
batch (ICE-SYMBOL-UI-01, ICE-LIMIT-01, ICE-WIDTH-01, ICE-WIDTH-02,
DATA-05, unchanged) · Next — Track D (ICE-RECOLOUR-01 layer A,
CREATIVE-01, PAINT-01, PICK-01, unchanged) · Then — Track C (PUB-02,
DIAG-03, both the owner's). The **Print programme parks in the
Icebox** as its own group: PRINT-01, PRINT-02, PRINT-TEST-01 **and
M16** — the sitting is the print standard's signature, its form's
items 2–9 and 13 are already superseded by PRINT-01's model, and the
programme "builds to" the sitting's evidence, so the four move
together. No wake trigger is invented: the group returns to Active
when the owner schedules it. **Track A stays build-complete with its
close deferred** — D170's "on the signed standard, or on PRINT-01
shipping" now waits with the group. The owner's scoping calls (preset
sizes stand, one type scale, no backward compatibility for print
settings, the sitting signs first) live in PRINT-01's ticket; the
backlog lines compress to the Icebox idiom. The duplicated
"Milestones ship in order" header lines are folded to one.

**Alternatives.** Keeping M16 in Current as an owner-gated standing
item (rejected: it would sit above the batch the owner put first, and
a sitting that signs print presets is print work). Track C
"alongside" rather than third (the owner numbered it; its two items
remain owner-owned either way).

**Scope.** `backlog.md`; `doc-deltas.md` gains one line for
`AGENTS.md` § Scope guards, whose "committed fence" sentence predates
both Batch C0's and Track B's ships. No product code.

**Link:** the order stands until the owner moves it; ICE-SYMBOL-UI-01's
"before M16's sitting" is now satisfied by construction.

## D190 — Pruned project memory: the ledger's nineteen ticked lines swept; nothing archived (2026-08-23)

**Decision.** Full sweep against `memory-policy.md`, six entries after
D184. Green: the live log at 17 entries (oldest D172, today), the
trajectory at 1,341 words, `file-map.md` at 4,293 against 293 × 35 =
10,255, every reference doc under its soft guideline bar
`DEV-INFRASTRUCTURE.md` at 3,637 (not a prune target). Over:
**backlog Active** at 2,017 words (23 items) — the D189 refactor took
it to 1,863 by compressing the four parked print lines to their
tickets; the rest is D182/D188-signed wording left verbatim, and the
five small-batch ships will clear it; **`doc-deltas.md`** carried 19
ticked lines from the D186 doc-sync — swept, the 3 open lines kept
verbatim and one added (D189); the **wish-list** at 53 against 25 —
a triage, the owner's Start B, not a prune; **D188** at 659 words
against the ~600 per-entry guard, the newest entry so it cannot archive — noted;
the seven `[detail]` tickets over their soft ~600 words shrink only by
lifecycle eviction. No archive file created; `archive/INDEX.md`
unchanged.

## D191 — ICE-SYMBOL-UI-01 ships: the Colours-used table is the live symbol key, with a picker over the unused pool (2026-08-23)

**Context.** M9 left the manual override as a v1-optional slice
(D170): `setOverride` / `clearOverride` existed in
`src/core/symbols/assignment.ts` with nothing calling them, and
symbols reached the user only inside a symbol-chart export. The owner
ran the small UI batch gateless (`auto-jazz-lite`, D188/D189); the
assumptions below were stated, not gated.

**Decision.** The Colours-used row gains a **Symbol** column — the
key the chart will print, as data, so its header is visible unlike the
control-only Highlight and Remove columns. Each cell is a text button
(the glyph inline in `currentColor` beside its name; accessible name
"{name}: change the symbol for {thread}", the A2 pattern) opening a
Carbon dialog over `runModal`: a grid of every **unused** glyph in
catalogue order (D160-3 — a collision is as unrepresentable from the
UI as from the model), "Let the app choose" when an override is
recorded, Cancel. **Grants happen live** as frames arrive, in palette
order, **only while every palette entry could hold a symbol**
(`entries.length ≤ 64`): past that, live grants would let threads that
came and went exhaust the queue and turn a later export into a refusal
the export-time grant would never have made, so larger palettes keep
D160's "export is the moment of need" and read "Auto". The column is
absent — not full of "Auto" — without a thread palette or per-stitch
identities. An override is project data in the `symbols` block, so
the history and a save carry it with no new wiring (D179). The table
rebuild now restores focus to the same row and slot — the picker's
return-to-invoker was landing on a replaced button, and a Highlight
pressed mid-capture had the same hole.

**Not built.** The explicit swap (taking another thread's symbol)
needs a model verb; wish-listed. Catalogue order, not queue order, for
the pool: the queue reshuffles as symbols are released.

**Verification.** Gate green (+8 tests: the pool, the row's glyph
before and after a grant, save → load → grant with the override
winning). In the running app: live key on the sample picture, pick →
row and status update with focus kept, "Let the app choose" clears the
override, a real `.pmproj` save → disturb → load restored the chosen
glyph, Threadify off hides the column and on brings the grants back.

**Scope.** `src/ui/symbol-picker.ts` (new), `info-panel.ts`,
`modal.ts` (exports `runModal`), `main.ts`, `shell.css`;
`tests/symbol-picker.test.ts`. No schema change.

## D192 — ICE-LIMIT-01 ships: the colour-limit slider is a log scale, 2–512 with 16 at the midpoint (2026-08-23)

**Context.** The slider stopped at 64 with a "type here for more"
helper, linear, while the number input reached 512 (EXT-13, D98). D188
signed the scale in D149's words — floor 2, ceiling 512, log, midpoint
near 16 — with the stored `n` unchanged so old projects load as they
were. Gateless run; the choices below are assumptions.

**Decision.** The range's value is a **position** (0–300) on two log
segments meeting at 16 — 2→16 across the left half, 16→512 across the
right — so the region most designs live in gets half the travel and
the midpoint is exactly 16 (a single log scale 2→512 would put 32
there). `sliderToCount` / `countToSlider` are pure exports of
`colour-section.ts`; the number input stays the exact handle (its
1–512 bounds untouched — "the number input already reaches 512"), the
helper now says so, and `aria-valuetext` speaks the count, never the
position. **300 steps**, not thousands: every whole count below ~40
is one position apart and an arrow key still moves ≈ 1.4 % low /
2.3 % high; a finer grid would make the keyboard crawl from 2 to 3
through dozens of presses for a control whose exact handle sits
beside it. A position that rounds to the count already set does not
re-select — the wish-list's per-step refetch cost (COUNT-01) would
otherwise be paid many times at the low end, where many positions
share one count.

**Verification.** +5 tests pin the anchors (0→2, 150→16, 300→512),
the geometric quarter points (6, 91), monotonicity, an exact round
trip for 2–40 and one-step tolerance above, and clamping (a loaded
`n` of 1 shows at the floor). In the app: 8 sat at position 100, the
midpoint produced 16, a typed 157 moved the handle to 249.

**Scope.** `src/ui/colour-section.ts`; `tests/count-scale.test.ts`.
`docs/ui-spec.md` and `docs/ui-evidence.md` still say 1–64 — a
doc-deltas line.

## D193 — ICE-WIDTH-01 and ICE-WIDTH-02 ship: the shell judged at 400 and 320 px, three overflow causes fixed; the width guide goes behind the diagnostics rule (2026-08-23)

**Context.** D188 decided the posture — the floor stays 320 px, the
app is *designed for* 400 px, phones are still-image users — and left
the judging as the item; ICE-WIDTH-02 reshaped the header's width
sentence as a maintainer aid. Gateless run, judged in the automated
browser on the sample picture with every section and reveal opened.

**What failed, and the fixes.** At 400 px the page scrolled
horizontally for three independent reasons, none of them layout
design: (1) `width: 100%` text, number and search inputs were
`content-box`, so their 1 px borders ran 2 px past every panel —
`box-sizing: border-box` on that rule; (2) the Colours-used table's
visually-hidden header text (absolutely positioned) escaped the
scrolling `.info-panel` and stretched the document to the table's
619 px — the panel is now `position: relative`, the containing block
the scroll box was assumed to be; (3) the browser default
`fieldset { min-inline-size: min-content }` let one long nowrap thread
name in a browse row widen the whole Colour fieldset to 430 px, so the
rows' `min-width: 0` + ellipsis never applied — reset to 0. At 320 px,
with those in, nothing overflowed and every pointer target held 44 px;
the one visible fault was the browse rows' "Must use" buttons wrapping
to two uneven lines — `flex: none; white-space: nowrap` on the row's
buttons sends the squeeze to the name's ellipsis instead. The preview
keeps 298 of 320 px.

**The width guide** (M14-FIX-04, a status-line announcement on a
resize burst below 960 px) now registers only when the diagnostics
control does — D175's rule: every dev build, production only behind
`?diag=1` — so the public header is the two lines shorter. Verified on
the built bundle: silent at `/`, "Window 400 px wide — works down to
320 px." at `/?diag=1`.

**Left as is.** The Colours-used table scrolls inside its panel at
every width by design (UI-STANDARDS → companion-window baseline); no
new ticket.

**Scope.** `src/ui/styles/base.css`, `src/ui/styles/shell.css`,
`src/main.ts`. No tests: CSS containment is browser-verified; the
a11y and contrast gates are unchanged. `docs/ui-evidence.md` FIX-04 /
EXT-39 rows predate the gate — a doc-deltas line.

## D194 — DATA-05 ships as three strings: the mapped-colour tooltip stops implying a measured catalogue; the Design title says it names the file; the chart readout counts the gutter (2026-08-23)

**Context.** DATA-05 was one tooltip — "colour mapped, not measured"
on generated colours, which implied the catalogue rows *were* measured
(they are compiled and uncalibrated, D161; DATA-03 relabels the
provenance vocabulary later). The wish-list triage surfaced two more
strings of the same size and the owner's gateless batch took them
together.

**Decision.** The tooltip now says where a mapped colour came from —
"colour mapped from its DMC equivalent" — and nothing about
measurement; the `Provenance` type's `'measured'` label is DATA-03's
to rename and is untouched here. The Design title field gains the
helper "Printed on the PDF; also names the saved project file." — its
second job (SAVE-01, D179) was invisible from the field. The
export-size readout's chart figure is now the file's real canvas:
`chartLayout` with the cell clamped as the export clamps it, so label
gutter and edge padding are counted — the M16 pack read "chart
2000 × 2000 px" beside a 2037 px file. Because the print half of the
grid style sizes that gutter, print-half edits and grid presets now
refresh the section readouts.

**Verification.** `info-panel.test.ts` asserts the new wording and
the absence of "measured"; in the app the readout said 2037 × 2037
and the exported PNG decoded at 2037 × 2037; the helper is wired by
`aria-describedby`.

**Scope.** `src/ui/info-panel.ts`, `src/main.ts`,
`tests/info-panel.test.ts`. `docs/ui-spec.md` § 280 still quotes the
old mapped-colour helper — a doc-deltas line.

## D195 — FIT-01 and GRID-DPR-01 ship: the zoom bounds are CSS px at any density; the grid style and the preview surface follow a device-pixel-ratio change (2026-08-23)

**Context.** Two wish-list defects from DUR-01 and M11, promoted into
the gateless batch. `viewport.ts` clamped its scale in device px
(0.05–64) while the schema bounds `cssPxPerStitch` in CSS px with the
same numbers, so on a 2× display a collapsed preview fitted at
0.025 CSS px — below what `parseProject` accepts; the save path
clamped it, the fit kept producing it — and the zoom ceiling halved
to 32 CSS px. Separately `sendGridStyle` premultiplied
`devicePixelRatio` but re-sent only on a colour-scheme change, so a
window moved to a display of another density kept stale line
thickness and tick font until the next style edit.

**Decision.** The viewport's bounds are declared **CSS px per stitch**
and every clamp (`fitView`, `scaledView`, `zoomAt`, `clampScale`)
takes the ratio, defaulting to 1 so the module stays pure and its
existing tests stand; the controller passes
`window.devicePixelRatio` at its five call sites. A test pins
`MIN_SCALE`/`MAX_SCALE` equal to the schema's constants so the two
modules cannot drift apart again. For the ratio change: there is no
DPR event, so a media query for the current ratio
(`(resolution: <ratio>dppx)`) fires once when it stops matching and is
re-armed for the new one; it re-sends the grid style and calls a new
`PreviewController.displayChanged()` (re-size the backing store,
re-derive the device-px view from the CSS values the controller
keeps — a manual zoom re-centres, which a display move can bear).

**Verification.** +3 viewport tests (a collapsed fit lands at the CSS
floor at 2×, a zoom reaches the CSS ceiling at 2×, the constants
match). In the app at DPR 2: forty Zoom-in presses read 6400 % and
forty Zoom-out presses 5 % (3200 % and 3 % before). The DPR change
itself is a human check — drag the window between displays of
different density and watch the grid's line weight hold.

**Scope.** `src/ui/viewport.ts`, `src/ui/preview.ts`, `src/main.ts`;
`tests/viewport.test.ts`.

## D196 — CAPTURE-END-01 ships: an externally ended capture is named above the preview, not only in the status line (2026-08-23)

**Context.** The owner's sitting (D134) found "Screen capture ended
(sharing was stopped)." truthful but easy to miss — a one-line status
in the header while the eye is on the preview, which keeps showing
the last frame as if nothing happened. The wish-list carried it as a
toast-versus-banner taste call; the gateless batch took it.

**Decision.** A project-coded **Carbon inline notification**
(`src/ui/notification.ts`): one sentence, an informational left edge
in the interactive blue (a non-text pair on layer-01, now registered
in the contrast contract), a text **Dismiss** button, `role="status"`
so showing it announces once without stealing focus. It mounts above
the preview beside the palette banner — the region the user is
looking at — and shows only when the share ends **from outside the
app** (the browser's stop control, the shared window closing): "Screen
capture ended — sharing was stopped. The last frame is kept as a
still; choose Source to capture again." The user's own Stop needs no
notice. It hides on Dismiss (focus to the preview host, never to
body) and when the next design begins. A toast was rejected: it moves
and times out, which is the failure mode being fixed; an inline
notification stays until acknowledged and costs the header nothing.

**Verification.** Gate green; in the app the element mounts hidden in
the right place, and the component shows, announces, dismisses and
returns focus as designed, driven through the dev server's module
graph. The trigger itself — a share ended from the browser's own
control — is a human check.

**Scope.** `src/ui/notification.ts` (new), `src/main.ts`,
`src/ui/styles/shell.css`, `src/ui/styles/tokens.css` (one `@pair`).
`docs/ui-spec.md` / `ui-evidence.md` describe the status line alone —
a doc-deltas line.

## D197 — Wish-list triage: 48 lines promoted or cut, the inbox empty; the gate riders queue ahead of the next worktree round (2026-08-23)

**Context.** The wish-list stood at 52 against its cap of 25 through
two prunes (D188, D190) that deferred the triage to the owner's Start
B. This session's Start B presented every line in seven chunks with a
call each; the owner ran the UI work first and then asked for
everything tied up for a fresh chat, which takes the calls as
presented — each below is reversible by re-adding a line.

**Cut (25).** The twelve **spec §25 / "later" lines** — order editor,
CIEDE2000 and weighting, preview modes, camera input, fabric
simulation, ScreenCaptureKit, SVG/CSV/ZIP, embroidery formats,
Photoshop revisited, cloud, export presets, optimisation modes — were
a copy of `docs/requirements.md` §25, which remains their home; two
ideas in them were worth carrying (below). Gate and bench lines with
no trigger: clippy/rustfmt in the gate, the browser-mode runner, the
manual `?backend=` override, bv2 per-row taint, the occlusion flag,
the harness master-image gap, the synced-tree cache relocation.
Retired premises or accepted behaviour: the companion-window
rehearsal (D149), semi-transparent dither participation, the
document-size modal, Must-use membership marking and
remove-after-exclusion (D178), the `resolvePalette` log widening, the
retired policy-world resolver (D124 keeps the record), and the M10
residue (A3, true-size page, per-page key are PRINT-01/02's).

**Promoted.** To **Current**, ahead of Track D: **INFRA-02**, four
gate one-liners (`bench-source.html` base path, `check:docs` standing
alone, `eslint` over `bench-reports/`, `verify:deploy --fetch`) — each
bites the worktree round Track D's scoping opens. To the **Icebox**, a
parked-follow-ups group with a trigger each: INFRA-03 (audit flake,
stale wasm pkg), CAPTURE-OMT-01 (off-main-thread capture, D135),
COUNT-02 (re-select against the held source), DUR-02 (deflate
`.pmproj`), DUR-03 (history management, re-capture on restore),
DIAG-04 (one-file report), SYMBOL-SWAP-01 (D191's swap verb). Into
**tickets**: CREATIVE-01 gains re-pick-from-frame, recipe-level
"render X as Y" and the finished-stitch view as candidates 9–11;
PRINT-01 absorbs the M12 key residue, print-from-phone, the
accessibility face, SVG/CSV/ZIP and vector furniture;
ICE-RECOLOUR-01 takes the stats race as a build-time must-fix and the
inventory-in-file as a plan-gate question. Swap-to-fabric was already
PAINT-01's Q10. Seven lines shipped in the batch (D191–D196).

**Cost.** Backlog Active rises to ~1,900 words / 26 items against
1,500 — the parked group is terse by design and the Refactor D190
proposed stands; the wish-list is at 0 against 25.

**Scope.** `wish-list.md`, `backlog.md`, three tickets. One handoff
from the Icebox-triage chat at its close: the generated
`docs/catalogue-sweep.md` still named DATA-02 as a parked class — its
writer (`tests/audits/catalogue.audit.test.ts`) now says "closed as
cosmetic (D188)" and the sweep was re-run; the data half is unchanged.

## D198 — INFRA-02 ships: four gate riders fixed and proved green in a fresh worktree (2026-08-23)

**Context.** D197 queued four one-liners ahead of Track D because
each bites the worktree round its scoping tickets open: the bench
harness popup was root-relative, `check:docs` on its own failed in a
fresh tree, `eslint .` linted gitignored `bench-reports/`, and
`verify:deploy` resolved `origin/main` from whatever the checkout last
saw. Run gateless (auto-jazz) as the item's line allows.

**Decision.** (1) `src/bench-browser.ts` opens
`${import.meta.env.BASE_URL}bench-source.html` (the `SOURCE_PAGE`
constant, also named in the popup-blocked messages) — identical at
base `/`, where `bench:auto` serves, and `/pattern-mapper/bench-source.html`
in a `--base` harness build. (2) `scripts/check-docs.mjs` adds
`crates/stitch-engine/pkg` to its generated-output ignore class beside
`bench-reports/`: the folder is gitignored and `check:wasm` builds it
only where a Rust toolchain exists, so citing it is a statement about
the build, not a reference that can rot; the alternative — rewording
`docs/acceptance-matrix.md` — was rejected because `matrix:write`
generates that file. (3) `eslint.config.js` ignores `bench-reports/**`
(the `m16-sitting/geometry.mjs` probe was in the lint set; 226 → 225
files). (4) `verify:deploy --fetch` runs `git fetch --quiet origin`
before resolving the target, an ERROR with git's stderr when the fetch
fails; `--fetch=value` is a usage error. Assumption stated at the
skipped gate: the remote is always `origin` — a non-origin target
(`upstream/main`) would still resolve locally; derive the remote from
the ref if that day comes.

**Verification.** Stock HEAD in a fresh worktree reproduced rider 2
(`docs/acceptance-matrix.md:46 missing path`); with the patch applied
the full `check` ran green there — `cargo test` + `wasm-pack`, 1,378
tests, build, docs — and a `--base /pattern-mapper/` build carries the
base-prefixed popup path with no root-relative leftover. Live:
`verify:deploy --fetch` → PASS against `92405d8`. Worktree and branch
removed afterwards.

**Scope.** `src/bench-browser.ts`, `scripts/check-docs.mjs`,
`eslint.config.js`, `scripts/verify-deploy.mjs` + `.d.mts`,
`tests/verify-deploy.test.ts`, one stale phrase in `vite.config.ts`'s
bundle-inputs comment. `DEV-INFRASTRUCTURE.md`'s `verify:deploy` rows
do not yet name `--fetch` — a doc-deltas line.

## D199 — ICE-RECOLOUR-01 ships: the colour swap is a pure stage over the sidecar, a design rule at schema v11, and a verb on the Colours-used row (2026-08-23)

**Context.** Signed and optioned at D182, narrowed to layer A at
D188; built in full mode from the plan gate, the owner approving the
plan's four defaults and its validation in one sitting. Closes
MUST-01's presence half: a user can now say "*this* thread, *here*"
for every stitch the mapper gave one colour.

**Built.** `src/core/pipeline/swap.ts`: `renderPalette()` derives the
render palette — the selected entries, indices unchanged, then every
render-only target appended by id in swap order — plus an index map
applied exactly once per cell, which is the no-chain rule by
construction (an appended target can never be a `from`); a target
already selected is a merge. `buildStages` appends the stage to the
colour group only while the map changes something (the
`adjustIsIdentity` precedent), so under `reduce-first` it runs at
source resolution before the resize drops the sidecar.
`PipelineConfig.swaps` is optional (absent = none) so the twenty-eight
config literals in tests and bench stayed untouched; the persisted
`design.swaps` is required at v11 — `{ from, to }` with `to` a full
record (D55), unique `from` refused on read, the list capped at
`MAX_PALETTE_ENTRIES`, v10 → v11 seeding `[]`. `config.palette` stays
the selected palette: LUT, candidates, both backends and every golden
hash unmoved; only the `projectJson` baseline pin moved. Every
sidecar reader in `main.ts` — stats, key, highlight `indexFor`,
symbol grants and sync, `symbolTableFor` — goes through one
`renderPaletteOf()`; a frame's stats read against the config *it ran
with* (`FrameResult.config`), which is the D197 stats-race fix.

**UI.** Swap… is the third verb on the Colours-used row; a target's
row reads "swapped from X" as visible text and Swap… there
re-targets every swap onto it (a merge target's own swap needs the
chip removed first — the signed wording taken literally); a
render-only target has no Remove. The picker is a `runModal` over the
shared browse table, the whole universe, ownership ignored. A Swaps
chip list sits under Must-use, shown only once a swap exists; a
dangling swap reads "(X is not in the palette now — kept)". Focus
follows a swapped thread's stitches to the target row after the
frame rebuild (found in the browser pass, fixed in the panel).

**Verification.** 1,407 tests (29 new: stage, config placement,
executor render-space sidecar, v11 round trip / migration / refusals,
swap through the real export route, row notes); gate green. In the
app: merge and render-only swaps, re-target, highlight on a target,
`.pmproj` save → load with the swap, the design history restoring
it, dangling on a count change, Threadify off/on, a symbol-mode PDF
keyed against the render palette (8 entries, no refusal), the swap
stage at ~2 % of a frame. Human remainder: the modal's Escape and
focus return under a real keyboard, VoiceOver over the chips.

**Assumptions at the gates.** Inventory-in-file stays out (its own
bump); the cap is on the list, the render palette bounded by
construction; a multi-source target re-targets all its sources at
once.

**Scope.** `swap.ts` (new), `config.ts`, `project.ts`, `client.ts`,
`main.ts`, `info-panel.ts`, `colour-section.ts`; seven test files +
`tests/swap.test.ts`; `hashes.json`. Deltas ledgered for `AGENTS.md`,
`architecture.md` and `docs/ui-spec.md`; README updated. The ticket
is deleted with the item.

## D200 — CREATIVE-01 signed: the creative programme is five slices, tone mode first (2026-08-23)

**Context.** The scoping ran five discussion rounds (2026-08-23),
then two prototypes on the worktree branch `creative-01-proto`
(`7897ff2` → `9041fae`, pushed to origin): tone mode, and the
contact sheet grown to a second axis carrying the nine slice-2a
adjustment-preset candidates. The owner signed the programme on that
evidence the same night; findings live in the ticket's two
"Prototype findings" sections, artefacts in the worktree's
`bench-reports/`.

**Signed.** The programme exactly as consolidated in the ticket's
"Scoping state after discussion rounds 1–5": slice 1 **tone mode**
(schema v12; folds C1, C2's two-state case, the provenance strip,
re-pick-from-frame and the colour-use floor); slices 2a/2b
**adjustments** as the third profile kind (v13); slice 3 the
**eyedropper** (PICK-01, no bump); slice 4 the **contact sheet** (no
bump); slice 5 the **match-error compare** (no bump). Parked with
triggers: mid-slider shares, the L/C/H split, posterise,
recipe-level swaps, finished-stitch preview, the N-D distribution;
PROFILES-02 wakes when slice 1 ships. Cut: brightness, contrast,
gamma, threshold, global hue shift — the curve, the mixer and tone
mode cover all five.

**The prototypes' calls stand as decisions.**

- Tone-mode dither diffuses error in the weighted space (curved L,
  w·a, w·b). Measured: reusing the sRGB error path leaks hue into
  lightness at 6.88 L\* column spread vs 2.28 weighted (σ 2.42 vs
  0.32) on the constant-L hue sweep; L\* bias 7.31 vs 0.03 on
  landscape-1.
- Quantile shares are exact undithered up to flat-region ties (2–3 %
  on the sample card); dithered they drift 12–32 % — so the ramp
  readout shows **achieved** shares whenever dither is on, never a
  restated target.
- The count-limit selection carries the same weight as matching: the
  prototype's greedy copy at t = 0 equals production selection
  exactly, and at t = 1 it discovers a lightness ladder (L\* 9–92)
  from the whole catalogue.
- The contact sheet is a mechanism: the second axis cost one
  variant-list branch; each adjustment cell re-selects its palette
  from the adjusted picture, and every candidate changes 3–8 of the
  8 picks (Mono prep re-picks all eight as near-greys). Budget:
  30–60 ms per cell at 300², selection included.
- Two constraints for the shipped sheet: an occluded window suspends
  `requestAnimationFrame`, so the render loop must not yield on
  frames alone; and a backgrounded renderer QoS-throttles ~30×
  (D136's effect seen live) — together the case for the worker
  route.

**Open, owned by the building slice** (none reopen the signature):
tone mode's user-facing name and the ladder naming (survey
neighbours: gradient map, duotone, colour ramp, ombré set); the
floor's unit and final label; the confetti-note wording; the ramp
control shape (the histogram-backed strip read better on
photographs); modal vs panel for the sheet (modal fits the 400 px
shell); ADJUST-02's saturation-range remap flavour; the adjustment
starter set's final membership and names (the nine candidates are
evidence, not signatures).

**Bookkeeping.** CREATIVE-01 closes on the signature, as its
done-when says. TONE-01, ADJUST-01, ADJUST-02, SHEET-01 and
COMPARE-ERR-01 join Track D in slice order; PICK-01's line becomes
slice 3. The ticket file stays as the five items' shared spec (the
D149 shared-file exception) and is deleted with the last slice.
PAINT-01 still scopes separately.

## D201 — TONE-01 builds: tone mode is one weighted metric through matching, selection and dither, at schema v12 (2026-08-24)

**Context.** Slice 1 of the signed creative programme (D200); the
scope and design were signed in CREATIVE-01, so the checkpoint gates
were pre-satisfied by the ticket and the build ran gateless against
its decisions of record. The prototype's central call — dither must
diffuse error in the weighted space — is now production behaviour.
The item stays open ([~]) on its owner half: mode name, floor
label/unit, confetti wording and ramp shape are working labels until
the sitting settles them.

**Built.** One weighted metric, engaged only under 'lab' and only
when the weight or curve departs from default — disengaged tone runs
none of the tone code, which is what keeps t = 0 byte-identical
(engine baseline hashes unmoved; only the projectJson pin moved, the
v10/v11 precedent). `src/core/color/tone.ts` owns the space: w = 1−t
scales a/b, the three-point curve remaps picture lightness only,
ladder order is L*-ascending with natural cuts at rung midpoints,
custom cuts bind at the end-stop alone and degrade to natural on a
palette-size mismatch. Matching, LUT build (key carries the tone
fingerprint — D46 made literal), count-limit selection and both
dither families all work in that one space; the candidates table is
skipped under tone (plain-Lab proof), the GPU LUT routes to TS, and
wasm dither is routed *and* clamped away. Threshold dither perturbs
curved L at 100/255 of the sRGB amplitude — a stated working
assumption, published in the audit, not asserted. Selection curves
the distribution's lightness too (the prototype did not — the
decision of record's "same objective as the render" argument wins);
the minimum-distance rule deliberately stays in plain Lab: it
promises perceptual spacing of bought threads, and the scaled space
would call two same-lightness hues distance zero. The colour-use
floor drops the worst under-earner one at a time over the selection
distribution (locks exempt, never below one colour, works with and
without a count limit) and its sentence names the count dropped and
both ways out. Schema v12: `pipeline.tone` {weight, curve, cuts} and
`palette.design.floor`, v11 files seeded disengaged/off.

**UI.** The tone group mounts in the Colour section after Minimum
distance (the inventory's host-owns-plumbing pattern): the colour↔tone
slider; the ramp strip — histogram over band colours on canvas, cut
handles as 44 px sliders live at the end-stop, the band list as the
DOM mirror with *achieved* shares from the rendered frame (never
targets; a merge-swapped rung honestly reads "swapped"); Equalise and
Reset cuts; the three-point curve behind a reveal (pointer + arrows +
native number inputs); re-pick from current frame (disabled with its
reason outside live capture); the floor toggle + stitches input; one
suitability heuristic driving the ladder offer and the confetti
caution, never a block. The selection source is now fetched whenever
the count limit, the floor or tone needs it, and re-pick is
invalidate + refetch of the same buffer.

**Verification.** `check` green (1,450 tests; 62 new). The production
audit reproduces the prototype's numbers on the shipped paths
bit-for-bit — hue-sweep FS spread 2.28 L*, σ 0.32, bias −0.01 (the
sRGB error space measured ~6.9); Equalise 2.3 % drift undithered,
29.2 % under FS; catalogue selection at t = 1 spans L* 8–92 —
artefacts `bench-reports/audit-tone-01-<sha>.json` +
`tone-01-gallery-<sha>.html`. Live in the app: end-stop re-selection
to a ladder, Equalise, the floor drop with its sentence, curve
inversion, and a `.pmproj` round trip restoring weight, curve, cuts
and floor. Human checks left: keyboard activation of handles/points
and the four naming items.

## D202 — ADJUST-01 builds: the adjust stage wakes as one curve plus one saturation, the third profile kind, at schema v13 (2026-08-24)

**Context.** Slice 2a of the signed programme (D200); its scope and
design were signed in CREATIVE-01, so the build ran gateless against
them. The item stays open (`[~]`) on its owner half — D200 leaves the
starter set's membership and names to the sitting, so the nine
built-ins ship as working labels.

**Built.** The identity hook becomes a real stage. The whole 2a
parameter set is **one three-point lightness curve plus one saturation
factor** — the black and white points ARE the curve's ends, and the
curve replaces gamma and contrast — applied in Lab, alpha-0 cells
copied through untouched (D9/D49). It stays out of the built order
while it is the identity, so a v12 file renders byte-for-byte as it
did: the engine baseline hashes are unmoved, only the `projectJson`
pin (the v10/v11/v12 precedent). `fullRgbVariant`
**keeps** the adjustment — the selection source is the adjusted picture
(the slice-2 engine note), and the compare half runs it too so the
difference on screen stays exactly the colour reduction. Both
content-keyed caches carry an adjustment fingerprint; the **LUT key
does not**, because adjustments change what the quantiser sees and
never which threads it may choose (D46), asserted at the injected-
provider seam. Schema v13: `pipeline.adjust` + `adjustProfileRef`, v12
files seeded at the identity with no profile attached.

**The hot loop is hand-rolled, on a recorded profile.** This is the
only stage doing per-pixel colour maths at *source* resolution (§7),
so D3's lever does not apply to it. The exact round trip through
`srgbToLab`/`labToSrgb` costs **189 ms/MP** (node) — most of the
≥ 4 updates/s budget (D135) on one stage. Tabling the two
transcendental steps gives **70 ms/MP** (node) / **86 ms/MP** (real
worker) for a measured worst case of **1 sRGB level** per channel over
4M+ colours × seven settings, and exactly 0 for the identity — the
conventions.md documented-tolerance shape, pinned by test. Rejected
with numbers: a 15-bit nearest-bin LUT (4.3 ms/MP but 37 levels of
banding), 32³/64³ trilinear grids (48–57 ms/MP *and* 9–14 levels —
slower *and* worse), a previous-pixel memo (neutral to worse).

**Honest where the promise does not bind.** At the source size the
capture rows use (w1280) the adjusted frame is ~110–130 ms — 7–8
updates/s; at a 4.2 MP still it is 446 ms, so a large capture region
plus an adjustment can miss 4/s. That is CAPTURE-OMT-01's
source-resolution scaling, parked again rather than pre-optimised, and
the bound `bench:auto` rows stay unadjusted — the promise is evidenced
by headroom, not re-asserted in code.

**One primitive, two curves.** ADJUST-01's curve and TONE-01's are
deliberately not folded — one remaps the picture before the resize,
the other remaps lightness inside the metric — but they may not drift
apart in their maths. The three-point curve moves to
`color/curve.ts` (tone re-exports it under its established names, no
caller changed) and the control to `ui/curve-control.ts`, so both have
one interaction model for the sitting; `.tone-curve*` becomes
`.curve*`.

**UI.** An "Adjustment profile" select plus *Edit profiles…* leads the
Processing section, because the stage leads the pipeline; unlike
dithering it stays live in full-RGB. The takeover editor's two-kind
branch generalises to a kind map, so the third kind mounted without a
third copy.

**Verification.** `check` green (1,481 tests; 31 new). The audit
(`audit-adjust-01-*.json` + gallery) reproduces the prototype's
decisive number on the shipped paths: Mono prep drops mean chroma by
**49.6** and re-picks all eight threads. Live on `landscape-1.jpg`
that re-pick lands as eight greys — the selection source is
demonstrably the adjusted picture; the editor opens read-only with its
"Why:" line, Duplicate-edit-Save yields a profile the design adopts,
and a `.pmproj` round trip restores curve, saturation and ref at v13.
Human checks left: keyboard activation of the curve points, and the
owner's sitting.

## D203 — ADJUST-01 signs and ships: the nine adjustment presets stand as they are, the curve's keyboard pass is green (2026-08-24)

**Signed.** The owner signed the starter set on the gallery's
before/afters (`adjust-01-gallery-*.html`, nine candidates × adjusted
and stitched): **membership and names exactly as built** — None,
Contrast stretch, Punch, Faded, High key, Low key, Muted, Vivid, Mono
prep. This closes the last of D200's in-slice items for 2a; the ids
were already identity and matching is structural (`sameAdjust`), so
the signature costs no migration and a later rename still cannot
orphan a saved reference.

**Passed.** The human keyboard check D202 left open — Tab to a curve
point, arrows nudge — is green on the profile editor's Lightness
curve. Because the control is now one shared component
(`ui/curve-control.ts`, D202), tone mode's own curve points are the
same code in a different mount and are covered by construction; the
tone **ramp cut handles** are a different control (44 px sliders) and
remain untested, so they stay TONE-01's.

**Shipped.** ADJUST-01's done-when is met in all three parts: the
signed starter set ships as built-ins, the frame holds ~7–8 updates/s
at the source size the ≥ 4/s promise binds at (D202's profile), and
the LUT fingerprint is proved untouched. The item leaves the backlog.
CREATIVE-01's ticket stays — it is the five slices' shared spec and
dies with the last of them (D149 exception), and ADJUST-02, PICK-01,
SHEET-01 and COMPARE-ERR-01 are still to come. TONE-01 stays open on
its four naming items and the ramp-handle keyboard pass.

---

## D204 — ICE-PROFILES-02 gains a second pool of sixty, and lightness ladders are admissible as palettes (2026-08-24)

**Decision:** the iceboxed candidate queue grows from forty names to
**one hundred**, in two pools: pool A is the original forty (D146),
pool B is sixty drafted here. The item stays iceboxed and every
candidate stays **unsigned** — no rule, no membership, no evidence.
The batch process (D115/D139) is untouched.

**The owner's call: ladders are fine as palettes.** Pool B was first
drafted with single-hue lightness ladders held back, reading
CREATIVE-01's "the ramp control and a 'ramp' profile shape must not
collide" as excluding them. The owner overruled that on the pick, and
the reading was too broad: CREATIVE-01's warning is about the
**control shape and the naming**, not about the membership. Eight
ladders join pool B, and the consequence runs the other way from a
collision — a ladder profile feeding tone mode is the pairing the two
features were built for. A narrow ordered ramp as the eligible
universe, matched by the tone metric, *is* gradient-map behaviour,
reached through two controls that already exist and with no new code.
Two drafting rules follow: a ladder is where order-is-identity (D46)
bites hardest, so it ships written light-to-dark; and its evidence
must be read at a colour limit below the default eight, because a
five-rung ladder selected down to eight is the whole profile. Pool A's
**Sashiko indigo** is a ladder and no longer needs re-filing.

**Pool B was picked against gaps, not down a list of names** — the
D144 method. After sixteen built-ins the gallery has no red (Autumn
leaves begins at hue 10 and is orange in practice), no violet, no
achromatic ladder, no all-hue dark (Deep sea is cool, Rainforest is
green), one two-pole shape, and nothing at all from industry. A
proposed batch three of eight is recorded against those holes at the
batch-2 split of four rule to four curated: Grisaille, Chiaroscuro,
Vermilion and madder, Teal and orange, Anodised aluminium, Heraldic
tinctures, High-visibility safety, Transit map lines.

**The pool leans curated and that is the territory, not laziness.**
Fourteen rule-shaped and eight ladders against thirty-eight curated,
next to a shipped gallery that is nine to seven. Industry, systems and
early-computing palettes were *specified by somebody* — a colour-space
band would misdescribe them — so batches drawn from here have to reach
for the rule-shaped candidates deliberately or the gallery drifts all
list, no rule.

**Early computing was added at the owner's request, and three of its
obvious entries are already shipped.** Teletext's eight is exactly
**1-bit RGB**; EGA/VGA sixteen is exactly **Retro 16**; the dithered
web set is **Web-safe**. Recording those as already-covered is the
useful half of the category. The seven that survive are named by
mechanism — Handheld green LCD, Green phosphor, Amber phosphor,
Four-colour adapter, Composite artefact colour, Home micro brights,
Home console — because every machine that defined a palette also
defined a trademark.

**The naming guard was extended, and the reason is that it cannot be
left alone.** `Technicolor` sits in pool A and passed this test for
two batches: a fixed list only catches the marks somebody already
thought of. Added: `technicolor`, `technicolour`, `kodachrome`,
`polaroid`, `formica`, `perspex`, `tarmac`, `astroturf`, `day-glo`,
`letraset`, `atari`, `amiga`, `sega`, `game boy`. Deliberately **not**
added, and now asserted as passing: `spectrum` and `commodore` — both
are ordinary words before they are machines, and D139's lesson is that
a guard rejecting a legitimate name is worse than no guard, because
the fix looks like renaming the profile. Pool A's *Technicolor* and
*Pop art (Warhol)* must be renamed before they are ever drafted;
*Talavera tile* carries a denomination of origin and wants a call.

**Nine investigations are recorded rather than run.** Each is settled
by resolving a candidate against the live catalogue in the audit run
and comparing entry sets — cheap once a rule exists, wasted before
then. Four are redundancy questions that may kill a candidate outright
(Bleach bypass vs Grisaille/Moorland; Undyed fleece vs Fair Isle's
undyed opening; Brutalist concrete vs Moorland; Home micro brights vs
1-bit RGB). Recording them stops a drafting session rediscovering
them.

**Also noted, not acted on:** three generated colour maps — **Greys**,
**1-bit RGB**, **2-bit RGB** — are already selectable as libraries in
the profile editor but have no built-in profile of their own. Each is
a one-line addition to `builtInProfiles()`. Not done here: it is a
gallery change, and gallery changes are owner-signed.

**Scope:** `pm_skills/project/tickets/ICE-PROFILES-02.md` rewritten,
the naming-guard list and its assertions in
`tests/color-profile.test.ts`, and a new
`docs/palette-candidates.csv` carrying all 128 rows (28 in-app, 40
pool A, 60 pool B) for review outside the repo. No source change, no
UI change, no schema change, no protected file touched.

**Link:** backlog → ICE-PROFILES-02 stays iceboxed at one hundred
candidates; a live triage page in the app and per-profile category
tags were both raised at the pick and are **unscoped** — neither is
decided here.

---

## D205 — ICE-PROFILES-02 batch three drafted and unsigned; the menu splits to absorb it (2026-08-24)

**Decision:** eight built-in colour profiles are drafted into
`builtInProfiles()` — four rule-shaped (Grisaille, Chiaroscuro,
Vermilion and madder, Teal and orange) and four curated (Anodised
aluminium, Heraldic tinctures, High-visibility safety, Transit map
lines). They ship as code and are **unsigned**: the owner curates names
and membership per batch (D115), as at D139→D140 and D144→D146. The
gallery is 25 → 33 built-ins.

**Picked against the gaps, not down a list** — the D144 method. The
sixteen left no red, no violet, no achromatic ladder, no all-hue dark,
one two-pole shape and nothing from industry; each of the eight closes
one of those.

**Three changed under the evidence, which is the whole reason the run
exists.** Chiaroscuro first read as pastel rather than shadow — its
high-key band admitted pale terracotta, yellow-green and lavender, which
took the top three shares; tightened to saturation ≤ 10 / brightness
≥ 92 it reads as darks against near-whites with no middle.
High-visibility safety gave Pearl Grey 57.7 % against the fluoro's
14.5 % — grey with accents, not hi-vis; the grey is dropped and it ships
as three entries at black 51.7 % / fluoro 39.5 %. Vermilion and madder
was retuned four times and **ships with its residual named**, in the
Neon noir (D140) and Art deco (D146) pattern.

**That residual is the sample card, and it is now evidenced rather than
assumed.** Vermilion's largest share is a mahogany at 42 %, not a
vermilion. The card is **56 % full-hue sweep** (`ui/sample.ts`), so a
red-only profile must map every green and blue on it to the nearest
red. The two shipped narrow-hue profiles do the same thing: **Autumn
leaves** leads with a tan at 36 %, **Delft blue** with white at 38.9 %.
So a concentrated leader is what this card does to a narrow band, not
what the rule does to the style — judge it on a photograph (D147's
six-image preview) before changing it.

**One profile leaves DMC, and the reason is the name.** Hi-vis uses
`ariadna:1697` for its fluoro yellow-green: DMC's nearest is ΔE ≈ 36
(Lemon, a plain yellow) against Ariadna's ΔE ≈ 7, and a hi-vis profile
whose signature colour is a plain yellow lies about what it is. Its
orange, black and silver stay DMC, so the shopping list costs one extra
manufacturer. Every other curated built-in is single-brand, so **this
is an owner call**, named rather than slipped in.

**The menu split, as MENU-01 said it would.** All eight land in style
territory, taking "Style and era" from 8 to 16 and tripping the ≤ 12
bound that ticket's test carries. Split three ways — **Art and craft**
(6), **Design and era** (4), **Screen and signal** (6) — so nothing
exceeds eight and the gallery reads in six groups. The existing sixteen
were re-homed, never renamed; ids are untouched, so no saved design
moves. The bound behaved exactly as designed: it failed, and the failure
was the signal to re-balance rather than a defect to suppress.

**A menu-order bug surfaced and is fixed.** The option renderer takes
group order from first appearance, so the menu was following
`builtInProfiles()` **batch** order — Screen and signal ahead of Art and
craft — rather than the order `PROFILE_GROUPS` declares.
`profileGroupIndex` plus a stable sort in the two callers fixes it, with
a test asserting the rendered group order equals the declared one, since
without it any future batch would silently reshuffle the menu.

**Scope:** `src/core/color-profile.ts` (eight profiles, the group
split, `profileGroupIndex`), `src/main.ts` and
`src/ui/profile-editor-colour.ts` (the sort), `tests/color-profile.test.ts`
(+4), and the ticket. No schema change, no migration, no UI change
beyond the menu's contents. `check` green (1498 tests).

**Link:** backlog → ICE-PROFILES-02 stays iceboxed, its queue down to 92
unsigned candidates; batch three awaits the owner's signature on names,
membership, the multi-brand hi-vis call, and the Vermilion residual.

---

## D206 — batch three signed as drafted; the gallery reaches 33 and the menu carries six groups (2026-08-24)

**Decision:** the owner signed all eight batch-3 candidates unchanged —
Grisaille, Chiaroscuro, Vermilion and madder, Teal and orange,
Anodised aluminium, Heraldic tinctures, High-visibility safety, Transit
map lines. Names and membership stand as drafted (D205). They are
shipped built-ins, not provisional. The gallery is **33**.

**Two calls the batch raised were signed with it**, both of which the
draft named rather than slipped in.

**The multi-brand exception.** High-visibility safety keeps
`ariadna:1697` for its fluoro yellow-green. DMC's nearest is ΔE ≈ 36 —
Lemon, a plain yellow — against Ariadna's ΔE ≈ 7, and a hi-vis profile
whose signature colour is a plain yellow lies about what it is. It is
the **only** entry in the gallery that leaves DMC, and it is signed as
the deliberate exception: correcting it back to DMC would rename the
profile, so it does not happen without asking. The shopping list costs
one extra manufacturer, on three entries.

**The menu split.** "Style and era" reached 16 of 33 and tripped
MENU-01's ≤ 12 bound — the bound behaving exactly as designed, a signal
rather than a defect. Signed at six groups: Your threads (3), Basics
(6), Nature and place (8), **Art and craft** (6), **Design and era**
(4), **Screen and signal** (6), plus Your profiles when the store has
any. Nothing exceeds eight. The existing sixteen were re-homed, never
renamed, and no id moved — no saved design moved with them.

**One standing residual, in the D140 pattern.** Vermilion and madder's
largest share on the evidence card is a mahogany at 42 %, not a
vermilion. That is the card, not the rule: it is 56 % full-hue sweep, so
a red-only profile must map every green and blue on it to the nearest
red — the shipped Autumn leaves leads with a tan at 36 % and Delft blue
with white at 38.9 % for the same reason. Signed as-is with the
residual named. **Judge it on a photograph (D147's six-image preview)
before retuning it**; four rounds of tuning against this card already
made it narrower without making it redder.

**What the signature does not close.** ICE-PROFILES-02 stays iceboxed
with 92 unsigned candidates. Batch four would take Style-side groups
past the bound again, so the next batch either leans nature-and-place or
carries its own split — and at that point ICE-PICKER-01's trigger (one
group past ~25, or the owner's standing expectation of 100+) is the
better answer than a fourth re-balance.

**Scope:** `src/core/color-profile.ts` comments only — the code was
already the signed state — plus the ticket, this entry, and the
candidate sheet's status column. No behaviour change from the
signature itself. `check` green.

**Link:** backlog → ICE-PROFILES-02 stays iceboxed at 92 candidates;
MENU-01 shipped at D205's split and needs no further work.

---

## D207 — every manufacturer gets its own profile; the menu group becomes Manufacturers (2026-08-24)

**Decision:** the eight thread brands each get a built-in profile —
Anchor, Ariadna, Cosmo, CXC, DMC, Finca, Madeira, Sullivans — generated
from the catalogue in its alphabetical order, beside **All threads**.
The menu group they sit in is renamed **"Manufacturers"**. The gallery
is **40** built-ins in **7** groups.

**Two naming failures are fixed, one of them a day old.** The group was
called "Your threads" (MENU-01, D205) and held DMC, All threads and My
inventory — **two of the three being whole manufacturer catalogues with
nothing to do with the user**. The owner read the name, assumed they
had listed their threads at some point, and asked what it was. That is
the same failure MYTHREADS-01 already fixed one level down, where "My
threads" was renamed "My inventory" because it "read as *the threads I
choose* and sent a new user into a profile that is empty by
construction" — reintroduced at the group and caught by exactly the
confusion it causes.

**And DMC had billing it had not earned.** It was the only brand with a
built-in, for no reason beyond being the largest range. The owner's
framing is the correction and is worth keeping: *"we buy one colour at
a time, DMC is just the largest set — it's fine for palettes not to
have DMC, for example Anchor has the nicest colours."* Brands were
always selectable in the profile editor's Libraries checklist, so the
DMC built-in was only ever a shortcut; making it eight shortcuts costs
one generated line and removes the favouritism.

**My inventory moves to "Your profiles".** It is not a manufacturer and
not a style; it belongs with the profiles you save. That group is now
never empty, which also makes the inventory discoverable rather than
hidden behind an empty heading.

**The bound behaved again.** Manufacturers holds 9 (eight brands plus
All threads), so the ≤ 12 rule stands and the exact-max tripwire moved
from 8 to 9 — deliberately, with the change stated in the test. A new
test asserts every catalogue brand has a profile and that none is
privileged, so a ninth brand cannot arrive unfiled.

**Also raised, and iceboxed as SNAP-01:** map any profile to the nearest
colours in a chosen manufacturer's range. The important finding is that
`core/thread-equivalents.ts` **already does the matching** — nearest in
CIELAB per brand, curated-over-computed, tested — and is wired to
nothing. So the cost is the profile-level application, the UI and the
honesty, not the algorithm. It would also let D206's multi-brand hi-vis
exception retire, because membership could be authored in whatever range
carries a style and *resolve* into the user's. It stays iceboxed because
the curated layer is empty (`thread-map-proposed.csv` is a header), so
every snap today is a suggestion, and the collision rule — two colours
snapping to one thread — is an unanswered design question, not a detail.

**Scope:** `src/core/color-profile.ts` (the generated brand profiles,
the group rename, My inventory re-homed), `tests/color-profile.test.ts`
(+1 test, 3 updated), the new `tickets/SNAP-01.md` and its backlog
line. No schema change: `builtin:dmc` keeps its id, so no saved design
moved. `check` green (1499 tests).

**Link:** backlog → SNAP-01 iceboxed; MENU-01 shipped and now carries
seven groups; ICE-PROFILES-02 unaffected at 92 candidates.

## D208 — Track E opens: the 2026-08-26 review lands as the hardening programme (2026-08-27)

**Decision:** the external repository review of c0082b0 (18 findings,
cited PMR-01…18) is adopted as **Track E — Hardening**, interleaved:
BATCH-E0 (eight standalone fixes) any time; a signed STATE programme
(immutable request snapshots, a source generation token, one
transition and one settlement path — the review's structural repair,
no rewrite) after ADJUST-02 and before Track D's remaining slices;
STORE-01 and LIMIT-01/02 alongside; the public-surface group
(NOTICE-01, DIAG-05, CAP-01, CROP-01, INFRA-04, SUPPORT-01, PERF-01)
with Track C.

**The owner's calls** (a blanket "execute" on the programme's eight
recommendations, each reversible): (1) the order above — SHEET-01
waits for the spine it would otherwise build on; (2) deploy posture
unchanged, pushes stay the owner's word — noted that until STATE-03
every deploy carries the capture-retention defect; (3) LIMIT-01
refuse > 500 pages / confirm > 60; LIMIT-02 256 MiB aggregate /
16 MiB document; (4) README-PROV-01 now, NOTICE-01's edit
owner-approved at its close; (5) SUPPORT-01 parked to the Track C
era; (6) the Track E name and IDs as drafted; (7) the crop pins
conform to the AAA 44 px rule rather than amending it; (8) `check`
conforms to its non-mutating invariant rather than amending it.

**Rationale:** sampled findings verified in code before adoption —
the retained in-flight config reference, the 1-stitch/page floor,
the `curl | sh` installer, the bootstrap-if-absent baseline, the
never-called `free()`, the four missing notice packages. Findings
fold into existing homes rather than duplicating: pagination's deep
fix stays with PRINT-01 (the cap is inherited), retention UX stays
DUR-03, the VoiceOver list stays A11Y-VO-01.

**Alternatives:** finish all of Track D first (rejected — SHEET-01
multiplies in-flight requests, the exact PMR-01 hazard, and the live
privacy defect would stand longer); a pre-sitting capture-stop
micro-fix (kept available if the sitting slips).

**Refactor riding the entry:** MENU-01 evicted (shipped at D205; the
eviction was missed) with its trajectory line back-filled and
tickets/MENU-01.md deleted; ICE-PROFILES-02's count refreshed to 92;
ICE-HEADERS-01 and ICE-BUNDLE-01 parked with named triggers; DUR-03
annotated.

**Link:** backlog → Interleaved — Track E Hardening;
tickets/BATCH-E0.md and tickets/STATE-01.md; the review kept
untracked at `_user-guff/2026-08-26-repo-review.md` while it maps
unfixed surfaces of the live app; the programme artifact:
<https://claude.ai/code/artifact/7780e750-3f3b-43ad-a359-dfca9713622e>.

## D209 — BATCH-E0: the hardening quick eight, and the two fixture rules they turn on (2026-08-27)

**Decision:** Track E's eight standalone fixes ship as one serial
burst, gate green (1,528 tests). CI-01 pins the deploy workflow's
whole supply chain — five actions by commit SHA with version
comments, `ubuntu-24.04`, Node 22.18.0 (the `engines` floor, so a
green gate proves the minimum claimed), Rust 1.97.1, and wasm-pack
0.15.0 fetched as a fixed release asset whose SHA-256 is verified
before extraction; the `curl … | sh` installer is gone. TEST-01
makes the UI baseline **fail closed** and moves regeneration to
`npm run baseline:write`. SCAN-01 gets the secret scan to zero
warnings without touching a pattern. DEPS-01, WASM-01, FONT-01,
UI-NITS-01 and README-PROV-01 land as specified.

**Rationale — the two that were more than chores.** *TEST-01:*
bootstrap-if-absent was deliberate and documented, but a tripwire
that writes its own missing oracle cannot detect the loss it exists
to catch — delete `hashes.json` and the run went green having
re-derived the expectation from the very code under test. Rehearsed:
with the oracle removed the suite now fails naming the regenerator,
and writes nothing. The reference config moved to
`tests/ui-baseline/reference.ts` so suite and generator compute from
one definition; two copies is a tripwire that can disagree with its
own generator. *SCAN-01:* four known-benign warnings on every green
run train the reader to skim the fifth. The fix is to the fixtures,
never the detector — sample tokens are now assembled at runtime
(`tests/helpers/sample-credentials.ts`), the one path exception is
named with a reason, and a new suite proves every shape still trips
and the near-misses still don't.

**Smaller whys.** WASM-01: the generated getters `.slice()`, so the
copies outlive the handle and `free()` in a `finally` is safe — the
test drives a fake module, which is also the only way to make a
getter throw. UI-NITS-01: the source input never cleared its value,
so re-picking a file the user had just edited on disk was silently a
no-op (the project input had always cleared); the editor's async
selection guard became `ui/latest-wins.ts`, deliberately UI-local —
STATE-01 is where a generation convention gets signed app-wide.
CI-01's `runs-on` is written out per job because that key resolves
before the `env` context exists.

**Alternatives:** `npm audit fix --force` (banned — it resolves by
bumping whatever it likes; the existing `js-yaml` override admitted
the fixed 4.3.2, so all six advisories cleared non-breaking and
markdownlint-cli2 stayed at 0.22.1); adding jsdom to test the editor
guard through the DOM (rejected — the house convention is logic in
node, and it would have been a new dev dependency for one test);
downloading the wasm-pack tarball to compute its checksum (rejected
— GitHub's release API serves a server-computed digest, so the pin
is verified without fetching anything).

**Verification:** `check` green — typecheck, lint, 1,528 tests,
build, docs, AAA contrast, and a **silent** secret scan over 391
tracked files. `cargo audit`: 14 crate dependencies against 1,226
advisories, zero findings. Checksum-gate rehearsal: a wrong digest
exits 1 under `set -euo pipefail` before extraction. App boots and
converts in the browser; the file input reads `''` after a change,
so same-file re-selection now fires.

**Open for the owner:** README-PROV-01's wording is drafted, not
signed (D208 called it "now", with the owner approving the words).
The provenance section says `graphic.jpg` is third-party with
unresolved rights and that the other five are *recorded as* the
owner's own, pending PUB-02's confirmation — deliberately reporting
the record rather than asserting the fact.

**Link:** backlog → Interleaved — Track E Hardening (BATCH-E0
removed); `tickets/BATCH-E0.md` deleted with the batch;
DEV-INFRASTRUCTURE.md → "Supply-chain pins" and the advisory-triage
cadence under "Security baseline".

## D210 — What BATCH-E0's first three pushes taught: the local gate cannot see a clean checkout (2026-08-27)

**Decision:** the three red CI runs after D209 are recorded as a class,
not as three slips. Each was a green local gate and a red CI, and none
was reachable from this machine — so the lesson is procedural: a
change touching fixtures, generated docs, or anything encoded is not
verified until CI has run it, and on a push-deploys repository that
means watching the run rather than assuming the local green.

**The three, and what each teaches.**

1. **Encoded bytes are not portable.** The new baseline suite asserted
   that a freshly encoded fixture PNG hashes to the committed one.
   `encodePng` ends in `deflateSync`, and a DEFLATE stream is not
   byte-identical across zlib versions — the assertion compared macOS
   against the Linux runner. Fixed by pinning what is actually stable:
   `sourcePixels` hashes the raw seeded RGBA (pure arithmetic, portable
   anywhere) and the PNG is pinned as a committed *file*, read and
   never re-derived. The generator gained the matching rule — rewrite
   the PNG only when its content moved, never because this machine's
   zlib differs, or every generator run would churn a protected fixture
   with a diff that reads as real.
2. **The file map can name a file that exists only here.**
   `gen-file-map.mjs` discovers untracked-but-unignored files by
   design, so the refresh mapped a local-only Codex hooks file;
   `check-docs` then failed in every clean checkout while passing
   locally, because locally the file is there.
3. **The note about the trap was the trap.** The wish-list line
   describing (2) named the file in backticks, and `check-docs`
   resolves every backticked path-shaped code span in a tracked
   `.md` — red again, one commit later. The decision log is exempt
   (append-only sources legitimately name files that no longer exist),
   which is why this entry may say what the wish-list may not.

**Rationale:** all three share one shape — the local machine has
something CI does not (a file, a zlib build), so "green here" tested a
different world. Worth the entry because the natural reading of three
reds in a row is carelessness, and the useful reading is that this
class is invisible to the gate by construction.

**Alternatives:** adding the Codex path to `check-docs`'s IGNORE list
(rejected — that decides the file will never be committed, which is
the owner's call, and its hook points at the committed
`scripts/cloud-setup.sh`); committing it (same, not ours). Left alone;
both it and the generator trap are on the wish-list.

**Verification:** CI green and deployed at `a8b9caf`. The pinned
wasm-pack step — fixed asset, checksum verified — succeeded on all
four runs, including the three that failed later in the gate, so
CI-01's mechanism is proven independently of the reds.

**Standing annotation, not a regression:** `checkout`, `setup-node` and
`cache` at v4 target Node 20 and the runner force-upgrades them, with a
deprecation warning per run. The `@v4` tags already resolved to these
SHAs, so pinning did not cause it; the major bump is its own commit
under the DEV-INFRASTRUCTURE procedure and is on the wish-list.

## D211 — ADJUST-02: the six-band mixer, the saturation range, and three things the maths forced (2026-08-27)

**Decision:** slice 2b ships at **schema v14** — `pipeline.adjust`
gains `mixer` (six bands × hue/saturation/lightness) and `range` (a
saturation floor and ceiling), both identity by default, both
**collapsed** in the editor per D200. The remap flavour the sitting
left open is settled: **nominal with a low-saturation roll-off**, the
owner's call. Order of operations is fixed and documented: curve →
mixer → range → global saturation.

**The band centres are derived, not assumed.** The obvious
implementation spaces the classic six R/Y/G/C/B/M 60° apart. In CIELAB
they are nowhere near even — Red 40.0°, Yellow 102.9°, Green 136.0°,
Cyan 196.4°, Blue 306.3°, Magenta 328.2°, so gaps run from 22°
(Blue→Magenta) to 110° (Cyan→Blue). Even spacing would put the green
band's centre in the cyans and make the blue slider mostly a magenta
slider. `color/mixer.ts` computes the centres from this project's own
`srgbToLab` at load and blends between whichever two actually bracket
a pixel; the suite re-derives them and asserts they are *not* evenly
spaced, so the day someone "tidies" them into 60° steps the test says
why not.

**A `chroma > 0` guard is not a grey guard.** The first implementation
skipped the mixer for zero-chroma pixels, and a neutral grey came back
tinted: the adjust stage's tabled conversion leaves a nominally grey
pixel with a small non-zero a/b, which is enough to pick a band and
take its full lightness offset. Replaced by `hueConfidence()` — a
smoothstep over the same low-saturation knee the range uses — and
every band control fades through it, so a neutral is untouchable by
construction rather than by a guard someone must remember at each call
site. This is the classic H/S/L-mixer shadow artefact, avoided.

**Nominal, not observed-range** (the owner's pick): saturation is
chroma over the most chromatic colour sRGB can express (C\* ≈ 133.8,
blue), so the same setting means the same thing on every picture and a
re-crop does not move the result. Observed-range would use the full
control travel on every image but needs the held source under live
capture or it flickers, and makes the control's units depend on the
crop.

**The 2a fast path is byte-identical, and tested as such.** Nine
shipped presets and every saved adjustment profile are 2a-only, so the
hot loop keeps the old expression exactly when both 2b controls are
identity — `a0 * sat` evaluates as `500 * (fx - fy) * sat` did — and
the L\* clamp the mixer needs is applied on the mixer path only, since
clamping unconditionally could move a 2a result in its last bit
wherever the tabled `labF` lands a hair outside 0–100. A test runs six
real 2a settings and compares whole buffers. `adjustFingerprint`
appends the 2b parts only when engaged, so fingerprints minted before
this slice keep their exact string and the caches they key stay warm.

**Alternatives:** a custom dual-thumb slider for the range (rejected —
two labelled native sliders that push rather than cross are operable
on the first try, and UI-STANDARDS prefers native); straightening an
inverted range in the schema (rejected — the loader refuses it, since
an inversion reads as deliberate and this stage has no such operation;
the *editor* straightens, because a library record is the user's own
data and must always render).

**Verification:** `check` green, 1,574 tests. Baseline regenerated with
a stated reason: `projectJson` moved, `outputPixels`, `outputIndices`
and `sourcePixels` did **not** — the bump changed the document, not the
picture. v13 → v14 migration is field-level (a v13 file already has an
`adjust` block, so a block-level "is it missing?" test would pass it
through and the validator would then refuse a merely-older file) and
carries its own regression test, because a returning user's history
store holds v13 designs. Driven live: 18 uniquely-named sliders, both
reveals closed by default, the collapsed summary reporting "2 bands
set" so a closed fold is not a hiding place, the range handles pushing
rather than crossing, and reset returning to identity.

**Note on the dev-server errors seen during this work:** repeated
`undefined is not a function` in the history write were HMR staleness —
old-shaped live config meeting new code across a schema change — not a
defect. A clean server start is silent, and the migration test proves
the real path. Worth knowing before someone chases it again.

**Link:** backlog → Track D (ADJUST-02 removed); `tickets/CREATIVE-01.md`
slice 2b closed; `src/core/color/mixer.ts`, `src/ui/mixer-control.ts`.

## D212 — STATE-01 signed: the convention, and the order swapped on evidence (2026-08-27)

**Decision:** the state and lifecycle convention is signed — immutable
request snapshots, a source generation token, one `transitionSource()`,
one `clearSourceState()`, one terminal settlement path per operation.
Four slices spin out, **in a different order from the one the ticket
proposed**. The sitting's four calls, all as recommended:

1. **All five elements signed, with one amendment:** the generation
   token reuses `main.ts`'s existing `sourceGeneration` rather than
   minting a second counter, widening its job from "the history
   noticed a picture change" to "every async continuation checks
   this". One clock, two readers — two counters tracking the same
   event can disagree, and the disagreement would be silent.
2. **Capture release moves first.** STATE-01's ticket proposed
   snapshots → transitions; the signed order is transitions →
   snapshots. Note for anyone grepping: **STATE-02 and STATE-03 have
   swapped content** relative to that proposal.
3. **`RequestSnapshot` lives in `src/core/`** — it crosses the worker
   boundary, so structural cloneability becomes a compile-time fact
   under core's isolation lint rather than a convention.
4. **STORE-01's library half starts now**, its `main.ts` adoption
   wiring after STATE-02 (sooner than planned, because of the swap).

**Rationale — why the order changed.** The review's claims were read
out of the four files before signing, and two are worse than it
implied. `capture?.stop()` has exactly one call site (`stopSession`,
main.ts:5361): `importBlob` — the file, drop *and* paste route — never
touches it, so importing a picture during a capture leaves the share
running, the OS indicator on, and the pump still overwriting the
imported image with screen frames. And `startCapture` has no
cleanup-on-failure after `getDisplayMedia` resolves: `await
video.play()` and `await whenReady(video)` follow an already-live
stream, and `whenReady` waits on a `loadeddata` that may never fire
with no timeout — the user is sharing and the app never returns an
object that could stop it. Both are reachable now, on the live site.
Snapshots repair a real correctness bug (results interpreted against
state that has since moved) but one needing a user to change a control
mid-export to see. **Ordering by reach rather than by architecture**
puts the three live, privacy-shaped findings in the first slice, which
is also the smaller one.

**The other three findings, verified:** the grab surface is never
cleared (`snapshot()` "deliberately survives `stop()`" — the rescue is
load-bearing, so the fix is to clear after the still is taken, not to
drop it); `worker/client.ts` wires `onmessage` and neither `onerror`
nor `onmessageerror`, so a fatal worker error leaves every
`pendingExports` promise unsettled for ever and the coalescer gate
shut — an export that waits silently and a preview that stops; and
`inFlight` retains the live config reference while `main.ts` mutates
config in place, so `FrameResult.config`'s promise to be "the config
this frame actually ran with" is not kept.

**Alternatives:** the review's order (rejected — leaves three live
findings standing through a slice); a second generation counter
(folded in as the amendment instead); a `main.ts`-local snapshot type
(rejected — it would be defined on one side of the boundary it exists
to cross).

**Link:** the signed sheet
<https://claude.ai/code/artifact/54477cd1-9e4b-431f-9786-0d28fa3e626b>;
backlog → Track E (STATE-01 replaced by STATE-02…05);
`tickets/STATE-01.md` deleted with the item.

## D213 — STATE-02: the source transition exists, and it lives where every route already passes (2026-08-27)

**Decision:** slice 1 of the signed spine (D212) lands. `transitionSource()`
settles and stops the outgoing source; `clearSourceState()` drops every
trace of it; acquisition cleans up on failure; the grab surface is
released once its rescue has been taken.

**The placement is the decision.** Four routes install a still —
`importBlob` (file, drop and paste), `loadSample`, the project load and
`restoreDesign` — and all four already funnel through
`setStillMaster()`. So the transition goes *inside* that function
rather than at the four call sites. A convention that has to be
remembered at each site is one a fifth route will forget, and the
review's finding was precisely that: `capture?.stop()` had exactly one
call site, the Stop button, so importing a picture during a capture
left the share running, the browser's indicator on for a surface the
app no longer showed, and the pump still overwriting the picture the
user had just chosen.

**Cleanup-on-failure, and a bound.** The moment `getDisplayMedia`
resolves the user is sharing and the app holds the only handle that
can end it. Two awaits followed with nothing around them: a rejecting
`video.play()` left the share running, and `whenReady` waited on a
`loadeddata` that might never fire — so `startCapture` never returned,
the caller never received a session, and the user was sharing with
nothing able to stop it. Both are wrapped now, and `whenReady` carries
a 10 s bound. A rejection is recoverable; a hang is not.

**Releasing frames is a pairing, not a reversal.** `snapshot()`
deliberately survives `stop()` — that is what rescues the last live
frame into a still when sharing ends externally, and it is
load-bearing. The fix is not to drop the rescue but to end it:
`releaseFrames()` zeroes the surface's backing store at the point the
app has taken what it needs, so a copy of the last shared frame stops
living for as long as the page does. `endCaptureUi` rescues, then
releases, in that order.

**A source-less load now clears rather than inherits.** Loading a
project with no embedded picture (or one that will not decode) left
the *previous* picture on screen under the *new* project's settings,
reported it as that project, and would have embedded those pixels in
the next save. `clearSourceState()` makes the design honestly empty
and the status says to import one.

**Alternatives:** calling `transitionSource()` at the four call sites
(rejected — see above); clearing the surface inside `stop()` (rejected
— it would break the external-end rescue, which is the one moment the
app can save the user's last frame); no timeout on `whenReady`
(rejected — an unbounded wait on an already-live share is the worst
shape this defect can take).

**Verification:** `check` green, 1,584 tests. Five new acquisition
tests drive the failure paths against fakes, because a real browser
cannot be made to reject `play()` or withhold `loadeddata` on demand;
each fails against the previous code (the reject path left the track
count at zero; the unready path never settled at all). Five surface
tests pin the release. Two consecutive imports verified live with no
console errors.

**Outstanding — the human half of done-when:** the live capture pass
(Chrome plus one non-Chromium browser, OS indicator observed off after
each transition) cannot be driven from an automated browser —
`getDisplayMedia` needs a real picker and a real user gesture. STATE-02
stays `[~]` until that pass is recorded.

**Link:** backlog → Track E; the signed sheet at D212.

## D214 — STATE-03: shallow is enough, and the reason is a property of the app (2026-08-27)

**Decision:** slice 2 of the spine lands. `RequestSnapshot` lives in
`src/core/pipeline/snapshot.ts` (the D212 call) and is taken at
**submit**, not at post; the three export routes capture every mutable
render option before awaiting and read only from that capture.

**Shallow, and why that is not a shortcut.** `main.ts` owns one
long-lived `PipelineConfig` and **replaces** its fields — every write
is `config.tone = { ...currentTone(), weight }` or
`config.dither = structuredClone(chosen)`. Checked exhaustively:
nine fields are written, none in place, and there is no
`config.x.y = z` or `Object.assign(config.…)` anywhere. Under that
discipline a shallow copy captures everything, because the objects the
copy points at are never edited — they are swapped. A deep clone
would also be correct and would copy up to 489 thread records per
submitted frame for no added safety.

**So the discipline is the load-bearing part, and it is now asserted
rather than trusted.** `tests/request-snapshot.test.ts` reads
`main.ts` and fails on any in-place config write at any depth, on any
mutating method call through a config field, and on any
`Object.assign` into one. Both regexes were checked against the
shapes they must catch *and* the legal forms they must ignore, since a
guard that silently matches nothing is worse than no guard. The day
someone writes `config.grid.width = n`, that test is what says a
shallow snapshot no longer suffices.

**Snapshot at submit, not at post.** A coalesced frame can sit in the
pending slot while the user keeps moving controls, so the config
reaching `post()` may already be a later one than the caller
submitted. Taking it in `submit()` is what makes the result describe
the request.

**The export half was the worse one.** A full-quality export takes
seconds and every control stays live throughout. `exportPdf` read
`chartMode`, `pdfPaging`, `pdfOptions`, `gridPrint`, `symbolState`
*and* called `renderPaletteOf(config)` on the live config after
awaiting — so the thread key could be built from a palette the pixels
never saw. One `exportSnapshot()` now feeds all three routes, and a
test asserts no route reads a mutable option after its await, so a
fourth route cannot quietly reintroduce it.

**Alternatives:** `structuredClone` per submission (rejected — cost
without benefit while the discipline holds, and the discipline is now
enforced); leaving `FrameResult.config` as the live reference and
fixing readers instead (rejected — the field's own doc-comment already
promised it was the config the frame ran with; the fix is to make that
true, not to document the exception).

**Verification:** `check` green, 1,591 tests. All three export routes
driven live — PNG, chart PNG and PDF each produced a file with no
console errors.

**Link:** backlog → Track E; the signed sheet at D212.

## D215 — STATE-04: the worker cannot be recovered, so it says so (2026-08-27)

**Decision:** slice 3 lands. `PipelineClient` wires `onerror` and
`onmessageerror`; a fatal failure settles every pending export with a
rejection, drops the in-flight bookkeeping, releases the coalescer
gate, terminates the worker, and tells the host once. The host says
plainly that the page must be reloaded.

**"Recovers, or says plainly that it can't" resolved to the second
half, and not for want of trying.** The preview canvas reaches the
worker through `transferControlToOffscreen`, which is **one-way and
once-only**: a replacement worker cannot be handed the same canvas, so
recreating the worker inside this class would produce one that can
never draw. Genuine recovery means building a new canvas element and a
new client — a decision above this layer. So the client exposes
`isDead` and `setOnFatal`, and `main.ts` names the one action that
helps. An honest refusal beats a recovery that half-works.

**Why a rejection, not a retry.** An export promise was previously
settled only from the response handler, so a dead worker left it
pending for ever: the button waited with nothing said, and the
coalescer gate — released only by `complete()`, called from a response
that was never coming — stayed shut, so the preview stopped too. Two
silent failures from one cause. A rejection the caller can show is
strictly better than a promise that never settles.

**Two smaller repairs the reading turned up.** `Coalescer` gained
`reset()` (it had no way to release a gate held by work that will
never complete — `PumpGate` already had one, so this closes an
asymmetry). And `handleResponse` released the gate on *any* response,
including an id it never issued; it now releases only for a preview
job it actually started, since completing on an unrecognised id would
let the next frame run while the real one is still out.

**Alternatives:** recreating the worker (rejected — see the canvas
constraint; it would look like recovery and silently not be); a
timeout on every export (rejected — it guesses at a duration that
depends on design size and machine, and the failure it guards is
already reported by `onerror`).

**Verification:** `check` green, 1,601 tests. Ten new tests drive the
failure modes against a fake worker, because a real one cannot be made
to die on demand: single and multiple pending exports, `error` and
`messageerror`, repeat failures settling exactly once, a late response
arriving after death delivering no frame, and a per-request
`ProcessError` still settling *without* killing the worker — the
recoverable case must stay recoverable. Verified live: frames flow and
a control change reprocesses cleanly.

**Link:** backlog → Track E; the signed sheet at D212.

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

- [ ] 2026-08-23 docs/ui-spec.md § Debug menu (EXT-26) — "Email the dev" is "Report a problem" and leads the menu; it saves the project document and the log, the mailto body names both, the address is a dedicated alias (source: DIAG-02 close / D187)
- [ ] 2026-08-23 UI-STANDARDS.md § Companion-window baseline — the app is designed for 400 px with the 320 px floor kept, and phones are still-image users (mobile browsers have no `getDisplayMedia`); the baseline names only the floor (source: D188/ICE-WIDTH-01)
- [ ] 2026-08-23 AGENTS.md § Scope guards — "the committed fence is now Batch C0 … then Track A … followed by Track B" predates both ships; the fence is the small UI batch → Track D → Track C, with the Print programme (M16, PRINT-01/02/TEST-01) parked in the Icebox (source: D189; D185/D188 for the tracks)
- [ ] 2026-08-23 docs/ui-spec.md § Colours used (EXT-41) and the control inventory — the table carries a Symbol column (visible header; per-row text button "{glyph name}" / "Auto", accessible "{name}: change the symbol for {thread}") opening the symbol picker dialog; grants are live for palettes ≤ 64 entries (source: ICE-SYMBOL-UI-01 / D191)
- [ ] 2026-08-23 docs/ui-spec.md § control inventory (Limit colours) and docs/ui-evidence.md § anatomy — the slider is a log scale 2–512 with 16 at the midpoint (300 positions, `aria-valuetext` speaks the count), not 1–64; helper reads "The slider runs from 2 to 512, finest below 16; type an exact number here." (source: ICE-LIMIT-01 / D192)
- [ ] 2026-08-23 docs/ui-evidence.md § FIX-04 and EXT-39 rows — the width guide ("Window N px wide — works down to 320 px.") renders only under the diagnostics rule (dev builds; production behind `?diag=1`), not in the public header (source: ICE-WIDTH-02 / D193)
- [ ] 2026-08-23 docs/ui-spec.md § control inventory (brand note, row 280) and Export group — the mapped-colour wording is "colour mapped from its DMC equivalent" (no "not measured"); the Design title field carries the helper "Printed on the PDF; also names the saved project file."; the export-size readout's chart figure includes gutter and padding (source: DATA-05 / D194)
- [ ] 2026-08-23 docs/ui-spec.md § Preview region and docs/ui-evidence.md (capture end) — an externally ended share shows a dismissible inline notification above the preview ("Screen capture ended — sharing was stopped. …", role=status, Dismiss returns focus to the preview host) in addition to the status line; the user's own Stop does not (source: CAPTURE-END-01 / D196)
- [ ] 2026-08-23 DEV-INFRASTRUCTURE.md § Canonical scripts and § Utility scripts (`verify:deploy`) — the script takes `--fetch` (runs `git fetch origin` before resolving `origin/main`, for a worktree or another machine); the standalone `check:docs` no longer depends on `check:wasm` having built `crates/stitch-engine/pkg` (source: INFRA-02 / D198)
- [ ] 2026-08-23 AGENTS.md § Core data model (`ProjectFile`) — schema is v11: `palette.design.swaps` (`{ from, to }`, `to` a full thread record) joins count, minimum distance and Must-use; the pipeline's colour group may end in a `swap` stage over the sidecar (source: ICE-RECOLOUR-01 / D199)
- [ ] 2026-08-23 architecture.md § Persistence row and the project-file paragraph ("currently v10") — v11 adds `design.swaps`; the render palette (selected entries + render-only targets) is the sidecar's vocabulary after the swap stage, derived by `renderPalette()` on both threads (source: ICE-RECOLOUR-01 / D199)
- [ ] 2026-08-23 docs/ui-spec.md § Colours used (EXT-41) and the control inventory — a Swap… verb per row ("Swap {thread}" / "Re-target the swap onto {thread}"), a visible "swapped from X" note on a target's row, no Remove on a render-only target; the "Swap X for…" modal over the browse table; a Swaps chip list under Must-use with "Remove the swap of X for Y" (source: ICE-RECOLOUR-01 / D199)
- [ ] 2026-08-24 UI-STANDARDS.md § Content and form — no rule covers long selects; needs one: group with `<optgroup>` past ~a dozen options, keep no group longer than ~8, group on what the reader asks about rather than how the data is built, decide grouping from the supplied data never a length threshold in the control, and treat "needs search or filtering" as the signal it is a picker not a longer select (source: MENU-01)
- [ ] 2026-08-27 DEV-INFRASTRUCTURE.md § browser support — claims ES2020 while the build targets ES2022; reconcile through SUPPORT-01's signed matrix (source: 2026-08-26 review / D208)
- [ ] 2026-08-27 AGENTS.md § Scope guards — the committed fence gains Track E — Hardening, interleaved after ADJUST-02 and before Track D's remaining slices (source: D208)
- [ ] 2026-08-27 UI-STANDARDS.md § Content and form — no rule covers a group of many related sliders; ADJUST-02's mixer needed one and used a `<fieldset>` per band with the band name as `<legend>` inside a `depth-reveal`, plus a per-slider `aria-label` carrying the group name (eighteen sliders all called "Hue" is a screen-reader listing with no information), and a collapsed summary that names what is set so a closed fold is not a hiding place (source: ADJUST-02 / D211)

<!-- FILE: pm_skills/project/file-map.md -->

# File Map

<!-- One line per source file: `path` — its role. Map roles, not history
     (move batch notes, dates, and test counts to decision-log.md). -->
<!-- Skeleton is generator-owned: run `node pm_skills/scaffold/gen-file-map.mjs`
     after adds/renames/deletes. It groups paths by top-level directory
     into `## <dir>` sections, preserves existing role text by path, marks
     new files `(role needed)`, and flags paths no longer on disk — you
     only write the role text. Sections below are a starting scaffold;
     the generator replaces them with directory-based ones on first run. -->
<!-- Hot read is SECTIONAL: read the index block + the sections matching
     the task's directories; read whole only for cross-cutting work
     (renames, conventions, upgrades). See AGENTS.md "Before every task".
     Size budget derives from the file count in the index — see
     pm_skills/memory-policy.md. -->

<!-- file-map-index -->
<!-- 330 file(s) across 13 section(s); regenerate with pm_skills/scaffold/gen-file-map.mjs -->
- `(root)` — 13 file(s)
- `.claude` — 2 file(s)
- `.githooks` — 1 file(s)
- `.github` — 1 file(s)
- `.windsurf` — 1 file(s)
- `_transcripts` — 1 file(s)
- `crates` — 4 file(s)
- `docs` — 17 file(s)
- `public` — 8 file(s)
- `scripts` — 23 file(s)
- `src` — 118 file(s)
- `tests` — 140 file(s)
<!-- /file-map-index -->

## (root)

- `AGENTS.md` — operative agent contract: hard rules, data model, read tiers
- `DEV-INFRASTRUCTURE.md` — build/run/test/version/deploy rulebook
- `README.md` — project front door: what it is, how to run it
- `THIRD-PARTY-NOTICES.md` — verbatim third-party licence texts (pdf-lib, wasm-bindgen, libm) plus the trademark/colour-data notice for public distribution (D161)
- `UI-STANDARDS.md` — Carbon-first UI + WCAG 2.2 AAA rulebook
- `bench-source.html` — entry for the controlled capture source the harness's interaction rows share (M13-MEAS-02)
- `bench.html` — entry for the production-build browser measurement harness; built by Vite alongside the app so its figures are not dev-server artefacts
- `cspell.json` — spelling dictionary + ignore paths for the docs gate
- `eslint.config.js` — flat config; core-isolation + no-console rules
- `index.html` — Vite entry; dev-shell styles (AAA contrast, pixelated preview)
- `package.json` — scripts (dev/build/test/check/verify:deploy) + dev dependencies
- `tsconfig.json` — strict TS config (ES2022, bundler resolution)
- `vite.config.ts` — Vite + Vitest config; injects version/build identity; `bundleInputs()` drops the bench harness when `PM_PUBLIC_BUNDLE=1` (PUB-06)

## .claude

- `.claude/launch.json` — dev-server and preview launch configs for agent browser preview, incl. the Pages base-path preview (serves a `dist` built with the same `--base`)
- `.claude/settings.json` — project agent settings: the SessionStart hook that provisions cloud sessions

## .githooks

- `.githooks/pre-commit` — runs `npm run check` before every commit

## .github

- `.github/workflows/lint.yml` — CI: `npm run check` per push/PR on a fully pinned supply chain (action SHAs, `ubuntu-24.04`, Node/Rust versions, checksum-verified wasm-pack — CI-01/D209; bump procedure in DEV-INFRASTRUCTURE); a green default-branch push then rebuilds with the Pages base and `PM_PUBLIC_BUNDLE=1` (no harness) and publishes `dist` to GitHub Pages (D172), then `verify-deploy` confirms the live build id (D180)

## .windsurf

- `.windsurf/workflows/next.md` — `/next` wiring to the pm-skills loop

## _transcripts

- `_transcripts/README.md` — explains the gitignored chat-transcript store and its redaction rule (GUIDE → "Saving session transcripts")

## crates

- `crates/stitch-engine/.cargo/config.toml` — simd128 rustflags for the wasm target only
- `crates/stitch-engine/Cargo.lock` — pinned crate dependency graph (committed, CI cache key)
- `crates/stitch-engine/Cargo.toml` — crate manifest: wasm-bindgen + libm (approved allowlist)
- `crates/stitch-engine/src/lib.rs` — Floyd–Steinberg WASM backend: bit-exact port of the TS reference

## docs

- `docs/acceptance-combined-record.md` — the evidence record of the M13 + M15 combined maintainer sitting: leg verdicts, the four D135 agenda lines, per-method and per-profile results, and what was deliberately not proven (D148).
- `docs/acceptance-combined-session.md` — the combined M13+M15 owner sitting: build decision, prep, nine-leg order, per-item close conditions
- `docs/acceptance-live-rehearsal.md` — M5-ACCEPT-03 rehearsal checklist: setup, actions, evidence, miss classification
- `docs/acceptance-m13-live.md` — M13-ACCEPT-02 run sheet: live Photoshop capture legs, the four owner-judgement lines, pinned to the passing build
- `docs/acceptance-matrix.md` — M5-ACCEPT-01 evidence: generated coverage table, per-row invariants, explicit skips
- `docs/acceptance-visual-review.md` — M5-ACCEPT-02 review sheet: review set, protocol, verdict record
- `docs/browser-measurement.md` — browser-only boundary procedure + recorded results (M5-PERF-18)
- `docs/catalogue-sweep.md` — DATA-01 owner worklist written by the committed sweep: unnamed catalogue rows and same-brand hex pairs (D155)
- `docs/dither-evaluation.md` — M8-SPIKE-01 evidence: method, findings, committed set, control surface (D61)
- `docs/measurement-contract.md` — boundary contract (bv2): workload ID grammar, matrix blocks, report schema + run validity, budget bindings, browser rehearsal
- `docs/palette-candidates.csv` — the 128-row colour-profile candidate list behind ICE-PROFILES-02 — the spreadsheet the reasoning page links to.
- `docs/performance-evidence.md` — measured evidence: bv1 history (M5 audits, M5C decisions) + the bv2 re-baseline (M13-MEAS-01)
- `docs/requirements.md` — full combined requirements spec (reference only)
- `docs/ui-audit.md` — M14-AUDIT-01 findings record: surface × state matrix, 22 ranked findings, style inventory, baseline hashes + re-run rules
- `docs/ui-evidence.md` — M14 implementation evidence: per-task matrix runs, deviations, before/after notes
- `docs/ui-journeys.md` — M14-AUDIT-02 record: five journey step tables, depth measurements, control-tier inventory
- `docs/ui-spec.md` — M14-SPEC-01: tier/reach contract, 5-section architecture, control table, terminology map, keyboard model

## public

- `public/palette-candidates.html` — standalone reasoning page for the profile queue. Self-contained since FONT-01: system font stacks, no external request.
- `public/profile-demo/README.md` — names the four owner-supplied preview photos the editor rig looks for (M15-UI-04)
- `public/profile-demo/graphic.jpg` — demo slot: flat-colour graphic, the banding and posterisation case.
- `public/profile-demo/landscape-1.jpg` — demo slot: first landscape; also the agreed source for M8-GOLD-02's golden crop.
- `public/profile-demo/landscape-2.jpg` — demo slot: second landscape, so a palette must hold up on more than one.
- `public/profile-demo/portrait.jpg` — demo slot: portrait; skin tones are where a narrow profile fails first.
- `public/profile-demo/stained-glass.jpg` — demo slot: saturated colour against black leading, the hardest case for a rule-shaped profile.
- `public/profile-demo/text.png` — demo slot: text in three fonts; legibility survives the reduction or it does not.

## scripts

- `scripts/bench-auto-lib.d.mts` — types for the quiet-run helpers (plain-JS module, typed for the test suite)
- `scripts/bench-auto-lib.mjs` — quiet-run logic: HIDIdleTime parsing, stamped/canonical artefact naming, environmental-retry gate (pure)
- `scripts/bench-auto-validate.d.mts` — types for the validation module (kept plain-JS for the node launcher)
- `scripts/bench-auto-validate.mjs` — bv2 report validation for the automated owner-session legs (pure; shared launcher/test)
- `scripts/bench-auto.mjs` — one-command automated owner-session legs: build, serve, flagged dedicated Chrome ×2, collect + validate reports
- `scripts/bench-cdp.mjs` — raw-CDP client for the trace leg (Node built-in WebSocket): DevToolsActivePort wait, command/event socket, streamed Tracing start/stop
- `scripts/bench-cross-check.d.mts` — types for the cross-check comparison (plain-JS CLI, typed for the test suite)
- `scripts/bench-cross-check.mjs` — Part-A′ arithmetic: manual vs automated capture rows side by side, same-build guarded (verdict stays human)
- `scripts/bench-trace-lib.d.mts` — types for bench-trace-lib.mjs so the vitest suite gets real types over the plain-JS module
- `scripts/bench-trace-lib.mjs` — pure trace parsing (M13-MEAS-04): mark grammar, renderer self-identification, window pairing, three-bucket GC accounting, observer long-task quoting
- `scripts/build-palette.mjs` — derives `dmc.json` from the owner CSV
- `scripts/check-contrast.mjs` — gate step: WCAG AAA proof of every tokens.css @pair, both schemes
- `scripts/check-docs.mjs` — docs gate: backticked path/link validation
- `scripts/check-secrets.mjs` — report-only credential-shape scan (gate step)
- `scripts/check-wasm.mjs` — gate step: cargo test + wasm-pack build; toolchain-aware skip (hard-fails in CI)
- `scripts/cloud-setup.sh` — SessionStart hook body: `npm ci` inside a cloud session only; no-op locally
- `scripts/gen-golden-hello.mjs` — one-time generator of the M0 hello fixtures
- `scripts/gen-symbol-evidence.mjs` — M9 print-evidence generator: renders the glyph catalogue as a vector PDF (batch pages + distinctness page) to bench-reports/ for owner signature (`symbols:evidence`)
- `scripts/gen-ui-baseline.mjs` — the ONLY writer of the UI-baseline artefacts (TEST-01). Refuses in CI and without a stated reason; `--check` reports drift. Protected fixtures — owner approval required.
- `scripts/save-transcript.mjs` — saves a chat-session transcript into _transcripts/ (`npm run transcript`)
- `scripts/verify-deploy.d.mts` — types for the verify-deploy helpers (plain-JS module, typed for the test suite — the bench-auto-lib.d.mts pattern)
- `scripts/verify-deploy.mjs` — post-deploy verification CLI + pure helpers: fetch the live index, resolve the hashed entry asset, read its build id, compare the SHA with the pushed commit; `--wait` polls; exit 0/1/2 (PUB-05)
- `scripts/write-acceptance-matrix.mjs` — regenerates the coverage table (the fixer; `check` only compares)

## src

- `src/backends/wasm/dither.ts` — wasm dither adapter: init + StageFn wrap + backends.wasm registration
- `src/backends/wasm/stitch-engine-wasm.d.ts` — ambient types for the stitch-engine-wasm alias (tsc without pkg)
- `src/backends/wasm/stub.ts` — alias stand-in when the pkg is unbuilt; never called at runtime
- `src/backends/webgpu/device.ts` — WebGPU feature detect + one lazy shared device (null on failure)
- `src/backends/webgpu/reduce.ts` — async GPU kernels: LUT build + palette map; null → ts fallback
- `src/backends/webgpu/wgsl.ts` — WGSL sources + binding indices: lut-build (metric-baked) + integer palette-map
- `src/bench-browser.ts` — the bv2 browser harness: preview-update/interaction/export rows through the shipped Worker route, the M13 worker-route stage matrix, LUT-build timing, selection-source contention and forced-backend comparison legs (`?auto=` unattended mode), live-capture counters, the M5 GPU gates, downloadable bv2 report. Not imported by the app
- `src/bench-source.ts` — controlled interaction source: repaints on BroadcastChannel command, replies with its own paint timestamp
- `src/bench/boundaries.ts` — the six measurement boundaries + BOUNDARY_VERSION (code copy of the contract; moved from tests/bench so production entries never import test modules)
- `src/bench/clock.ts` — absolute cross-context timestamps (timeOrigin + now) + timer-resolution probe
- `src/bench/counters.ts` — capture-path counter ledger: interval snapshots, conservation checks, drop folding across windows, zero-frame verdict (pure)
- `src/bench/edit-classes.ts` — the six Part-B edit-class approximations: seeded pure geometry + drive cadences
- `src/bench/harness.ts` — warm-up policy, sync/async sample collection, interleaved candidate timing
- `src/bench/memory.ts` — retained-heap verdict vocabulary: plateau threshold + forced-GC lazy-vs-real classification (pure)
- `src/bench/report.ts` — report schema, percentiles, unmeasured-never-zero rows, run-validity assessment (pure)
- `src/bench/workloads.ts` — the frozen bv2 workload matrix (DitherConfig axis) + seeded source generators
- `src/capture/crop.ts` — pure crop-rect geometry: clamp/move/resize, hit-test, stitch span
- `src/capture/dirty.ts` — dirty-frame skip: 64×64 sampler, FNV-1a hash, region signature, staleness gate
- `src/capture/draft.ts` — draft-quality governor: pure hysteresis over frame times
- `src/capture/master-image.ts` — master-image readback rule: refills a transferred (detached) buffer, never returns a blank one (pure)
- `src/capture/pump.ts` — frame pump: rVFC subscription + pure latest-wins grab gate
- `src/capture/session.ts` — getDisplayMedia session: start/grab/snapshot/stop + pure error/label helpers
- `src/capture/surface.ts` — one reusable grab canvas: resize in place, never reallocate per frame (pure, injected factory)
- `src/core/color-profile.ts` — colour-profile recipe + resolver to the effective ordered table, every narrowing explained; built-ins; policy→recipe bridge (M15); pin/unpin recipe helpers (MUST-01)
- `src/core/color-sources.ts` — generated colour maps, map:/user: identity namespaces, CSS name table, provenance-honest labels (M15)
- `src/core/color/candidates.ts` — per-bin candidate pruning for exact Lab matching: conservative Lab bounding box per 15-bit bin, witness-radius exclusion. An exclusion proof, not an approximation — returns the identical index to a full scan
- `src/core/color/convert.ts` — sRGB↔linear↔Lab conversions (D65, CIE 1976)
- `src/core/color/curve.ts` — the three-point lightness curve primitive shared by tone matching and the adjust stage (two curves, one maths)
- `src/core/color/lut.ts` — 15-bit RGB→palette-index LUT builder + exact nearest
- `src/core/color/metrics.ts` — squared colour distances: Euclidean RGB, ΔE76
- `src/core/color/mixer.ts` — the six-band mixer and saturation-range maths (ADJUST-02). Band centres DERIVED from `srgbToLab` — CIELAB spaces the classic six 22°–110° apart, not 60°. `hueConfidence` is the shared roll-off that stops any hue-dependent control touching a neutral.
- `src/core/color/tone.ts` — tone mode (TONE-01): weighted metric, ladder cuts/quantiles, histogram, suitability hints; the curve maths comes from `color/curve.ts`
- `src/core/estimates.ts` — pure fabric sizing + thread/skein estimator (M12): named factors only, per-colour skein round-up, and the disclosure sentence
- `src/core/grid-presets.ts` — six built-in grid styling presets (paired screen/print halves) + exact-match provenance detector; in core so the v6→v7 migration can label files
- `src/core/grid-style.ts` — the persisted grid style-values shape + appearance-preserving defaults; single source for the worker style, both project-file halves, and the presets
- `src/core/palette-policy.ts` — brands/source/inventory/locks → permitted set + explained conflicts
- `src/core/palette-presets.ts` — built-in algorithmic colour-scheme presets (LCh rules)
- `src/core/palette-resolve.ts` — the one policy → ordered palette entry point
- `src/core/palette-selection.ts` — colour-count selection and auto-fill, in the tone space when engaged, plus the colour-use floor cascade (TONE-01)
- `src/core/palette.ts` — Palette model, DMC preset load, rgb/Lab flattening, colour + identity fingerprints
- `src/core/palettes/catalogue.json` — generated catalogue, 3,338 threads across 8 brands (protected)
- `src/core/palettes/dmc-anchor-map.csv` — superseded DMC/Anchor map, kept as owner data (protected)
- `src/core/palettes/thread-list.csv` — owner-supplied 8-brand thread list (protected)
- `src/core/palettes/thread-map-proposed.csv` — proposed cross-reference schema, no data yet (protected)
- `src/core/pipeline/adjust-presets.ts` — the nine built-in adjustment presets with their basis lines + structural matching (ADJUST-01; working names until the sitting signs)
- `src/core/pipeline/adjust.ts` — adjust stage (ADJUST-01): one lightness curve + saturation in Lab, tabled hot loop with a documented ≤ 1-level tolerance; out of the order while identity
- `src/core/pipeline/config.ts` — PipelineConfig → stage list; §7 presets; full-RGB twin (which keeps `adjust?`); the swap stage joins the colour group when active (`swaps?`)
- `src/core/pipeline/dither-presets.ts` — canonical dither presets + structural equality + built-in matching (M15-DITH-01; moved from ui)
- `src/core/pipeline/dither.ts` — the five dither methods: exact errors, serpentine; tone-space diffusion/threshold when tone engages (TONE-01)
- `src/core/pipeline/identity.ts` — identity stage: hello-world purity demo
- `src/core/pipeline/index.ts` — pipeline executor: backend pick + ts fallback
- `src/core/pipeline/reduce.ts` — reduce stage: LUT + exact paths, alpha passthrough
- `src/core/pipeline/resize.ts` — resize stage: area-average, 4 modes, empty cells
- `src/core/pipeline/snapshot.ts` — `RequestSnapshot` — what a request carries and hands back with its result (STATE-03). Documents why a shallow copy is a complete snapshot, and which app discipline that rests on.
- `src/core/pipeline/swap.ts` — swap stage (ICE-RECOLOUR-01): `renderPalette()` (selected entries + render-only targets, index map, no-chain) and the pure sidecar remap + repaint
- `src/core/pipeline/threshold-tiles.ts` — Bayer + void-and-cluster blue-noise threshold tiles: fixed data, documented provenance, memoised
- `src/core/project-package.ts` — store-only zip project package (`.pmproj`): deterministic writer (fixed 1980 stamps), bounded reader with named refusals, format detection, readProjectBytes/writeProjectBytes (DUR-01)
- `src/core/project.ts` — project file (§20): schema v13 with `pipeline.adjust` + `adjustProfileRef` (ADJUST-01) over v12's tone/floor, v1→v13 migrations, canonical (de)serialisation, title-driven `projectFilename` + stamp fallback, `PROJECT_EXTENSION` (DUR-01/SAVE-01)
- `src/core/stats.ts` — design stats §11 subset: counts, %, thread refs
- `src/core/symbols/assignment.ts` — symbol assignment as persisted state (D160-4): need-based grants, release-to-back queue, survivor-free reset, overrides, load reconcile
- `src/core/symbols/glyphs.ts` — the app-owned 64-glyph catalogue in canonical append-only order; fill-only M/L/C/Z paths rendered identically by Path2D and drawSvgPath (D165)
- `src/core/thread-catalogue.ts` — brands, threads, stable `brandId:reference` identity
- `src/core/thread-equivalents.ts` — nearest cross-brand equivalent (curated over computed)
- `src/core/types.ts` — core contracts: PixelBuffer, Palette, Stage
- `src/diagnostics/bundle.ts` — copy-diagnostics bundle: pure builder + fail-closed redaction
- `src/diagnostics/log.ts` — structured logger: console + ring buffer + global capture
- `src/export/chart.ts` — styled PNG chart (§14 subset): pure margin/
- `src/export/key-entries.ts` — assembles the chart/PDF thread key from stats + palette (+ symbol map since M9) — the real assembly the artefact suite drives (D153)
- `src/export/pages.ts` — pure multi-page planner (M10): half-open tile bounds, leading-edge overlap, row-major order, sentence errors; plus the frame slice helper
- `src/export/pdf.ts` — single-page PDF chart (§18 subset): pure
- `src/export/png.ts` — clean PNG export (§13 subset): pure nearest-
- `src/library/records.ts` — Pure library file formats: canonical inventory/palette JSON, validation, additive merge, id-collision rename
- `src/library/snapshots.ts` — the design history: its own IndexedDB database (meta + payload stores) with an announced memory fallback; pure quota model (tiers, oldest-first eviction, near-quota) and the Project line's copy (DUR-01)
- `src/library/store.ts` — Cross-project library storage behind one interface; IndexedDB impl + memory fallback that announces itself; exports the request helper the design history shares
- `src/main.ts` — app entry: M2 shell — import, control panel, preview, info panel
- `src/ui/accordion.ts` — Carbon accordion section: h2-wrapped toggle, hidden panel, derived closed-state summary
- `src/ui/browse-table.ts` — shared capped search table (the 60-row pattern extracted; D117 seam 3)
- `src/ui/colour-section.ts` — recut Colour section: profile select + (edited) verbs, count (log-scale slider, ICE-LIMIT-01) + minimum distance, tone-matching slot (TONE-01), Must-use chips, Swaps chips (ICE-RECOLOUR-01), inventory reveal (M15-UI-01)
- `src/ui/controls.ts` — Carbon-style field builders: toggle/number/colour/select + clampInt
- `src/ui/curve-control.ts` — the three-point curve reveal: SVG plot, 44 px slider points (pointer + arrows), native number inputs, id-prefixed per instance
- `src/ui/debug-panel.ts` — dev-only profiling panel: rolling timing window (pure) + disclosure DOM
- `src/ui/diagnostics-button.ts` — the Debug menu: Report a problem (project document + redacted log + mailto, DIAG-02), Copy diagnostics, Download log; announced status line; `DEV_EMAIL`
- `src/ui/dither-model.ts` — pure Dither-controls model: algorithm options, per-family strength, evidence-bearing presets, session memory
- `src/ui/import.ts` — import routes → decode: filter (pure) + blob→PixelBuffer
- `src/ui/info-panel.ts` — "Colours used" table content: pure row model + thin DOM half, hosted by a section (M14-EXT-41); the live symbol key column (ICE-SYMBOL-UI-01); the Swap… verb and "swapped from" note (ICE-RECOLOUR-01); focus kept across rebuilds, following a swap to its target
- `src/ui/latest-wins.ts` — generation gate for async selection (UI-NITS-01): take a token, apply only while newest. UI-local by intent — STATE-01 signs the app-wide convention.
- `src/ui/mixer-control.ts` — the two slice-2b reveals, both collapsed by default (D200): the mixer as a fieldset per band, the range as two native sliders that push rather than cross.
- `src/ui/modal.ts` — Carbon modals (text prompt, choices, danger confirm, live-apply form): trap arithmetic pure, focus restore, Escape/backdrop cancel
- `src/ui/notices.ts` — licences and notices: `?raw` imports of `LICENSE` + `THIRD-PARTY-NOTICES.md`, a pure document parser, the Close-only dialog and the ghost header button (PUB-01)
- `src/ui/notification.ts` — Carbon inline notification (CAPTURE-END-01): one sentence, kind edge, text Dismiss with deliberate focus return; role=status
- `src/ui/preferences.ts` — Shell preferences (per-disclosure open state) in localStorage; parse falls back to defaults for anything unreadable. Never project data.
- `src/ui/preview.ts` — preview controller: toolbar, wheel/drag/keys → worker
- `src/ui/profile-editor-adjust.ts` — adjustment profile kind: curve + saturation form, basis lines, stored-payload guard; mounts the shared shell unchanged (ADJUST-01)
- `src/ui/profile-editor-colour.ts` — colour profile kind: libraries, pins, ranges, custom colours, fingerprinted readout; pure halves exported
- `src/ui/profile-editor-dither.ts` — dither profile kind: three-field form, basis lines, palette-context line; mounts the shared shell unchanged (M15-DITH-02)
- `src/ui/profile-editor-preview.ts` — kind-generic judgement preview: slots, offline states, test card, ÷1/÷4/÷16 grid, debounced real-pipeline renders
- `src/ui/profile-editor.ts` — kind-agnostic takeover editor shell: switcher + verbs, draft-then-Save, D117 Save contract, no frame-facing API
- `src/ui/profile-options.ts` — the shared `<option>` renderer for profile selects, with group support (MENU-01).
- `src/ui/sample.ts` — deterministic drawn test-card for "Try a sample"; feeds the normal source path
- `src/ui/scales.ts` — The four resolutions kept apart — pattern/capture/preview/export — with unit-named fields, reference-sharing updaters, and the visible label set.
- `src/ui/shell.ts` — Shell state reduced to the cold flag (M14-EXT-31/32); `visibility()` is the single composition rule for what the cold surface hides.
- `src/ui/styles/base.css` — element layer: reset, [hidden] contract, focus ring, type ramp, generic fields/buttons/toggle/tables
- `src/ui/styles/shell.css` — shell chrome: header, columns, preview host, focus-mode chain, capture surfaces, panel containers
- `src/ui/styles/tokens.css` — design tokens: project + Carbon-convention systems, both schemes, @pair contrast contract (D80)
- `src/ui/symbol-picker.ts` — symbol override picker (ICE-SYMBOL-UI-01): pure model (unused pool in catalogue order, the row's glyph), inline-SVG glyph element, the Carbon picker dialog over `runModal`
- `src/ui/tone-controls.ts` — tone-matching group: slider, ramp strip (canvas + 44px cut handles + DOM band mirror), the shared curve reveal, floor, re-pick; pure halves exported
- `src/ui/viewport.ts` — pure viewport maths: fit, anchored zoom, pan clamp
- `src/vite-env.d.ts` — ambient types for injected version/build globals
- `src/worker/backend-select.ts` — per-workload dither routing (metric-categorical, M5-PERF-27) + recorded per-stage override map
- `src/worker/client.ts` — main-thread client: Worker + coalescing + transfer + optional measurement observer; a frame returns with the config it ran with
- `src/worker/coalesce.ts` — latest-wins scheduler (no queue), drop counter
- `src/worker/execute.ts` — timed frame execution; errors become responses
- `src/worker/grid.ts` — pure grid/tick geometry: line placement, auto-hide, label thinning
- `src/worker/lut-cache.ts` — one LUT per palette content+metric+tone (TONE-01; engaged tone skips the GPU); LRU-bounded; rejects implausible GPU LUTs; hit/miss/eviction counters
- `src/worker/pipeline-worker.ts` — worker entry shell: owns worker scope, wires router
- `src/worker/preview-surface.ts` — worker: OffscreenCanvas; view/grid/tick/compare redraw (no clip)
- `src/worker/protocol.ts` — main↔worker message types, transferred buffers, absolute-clock frame marks, harness-only backend force
- `src/worker/router.ts` — message routing + compare source cache; guarantees one response per request

## tests

- `tests/a11y-names.test.ts` — accessible-name tripwire over the control surface (D156)
- `tests/acceptance-matrix.test.ts` — M5-ACCEPT-01 driver: per-row invariants through the worker entry, tie-break oracles, coverage-table staleness gate
- `tests/adjust-controls.test.ts` — the adjust kind's pure halves: payload guard, saturation percentage, the curve primitive's one-implementation identity
- `tests/adjust.test.ts` — the adjust stage: identity, curve/saturation behaviour, alpha, purity, the ≤ 1 sRGB-level tolerance, presets, LUT fingerprint untouched
- `tests/audits/adjust-01.audit.test.ts` — ADJUST-01 evidence: the cost table behind the tabled hot loop, the accuracy bound, per-preset re-selection, and the before/after gallery
- `tests/audits/audit.ts` — audit harness: AUDIT=1 gate, timed/counted rows, JSON artefacts
- `tests/audits/candidates/dither-candidates.ts` — dither prototypes: exact pruning table, hoisted scan, rounded conversion
- `tests/audits/candidates/m8-dither-candidates.ts` — M8-SPIKE-01 prototypes: kernel-as-data diffusion, threshold tiles, candidate registry — never imported by src/
- `tests/audits/candidates/resize-candidates.ts` — resize prototypes: hoisted (bit-exact), separable, summed-area
- `tests/audits/catalogue.audit.test.ts` — catalogue data sweep behind `npm run audit`: unnamed rows and same-brand hex pairs feed docs/catalogue-sweep.md (D155)
- `tests/audits/dither.audit.test.ts` — M5-PERF-13/14: conversion decomposition + exact-pruning proof
- `tests/audits/lut-reduce.audit.test.ts` — M5-PERF-12: LUT build vs map, stale-cache-key repro
- `tests/audits/m13-prep.audit.test.ts` — M13-PROF-02 node half: policy/selection/build timings per palette size, counter-proven cache behaviour
- `tests/audits/m13-stage.audit.test.ts` — M13-PROF-01 node half: stage ranking per grid/palette/method + dither-leader decomposition
- `tests/audits/m8-dither.audit.test.ts` — M8-SPIKE-01 evaluation (AUDIT=1): quality/structure metrics, timings, HTML gallery artefact
- `tests/audits/orchestration.audit.test.ts` — M5-PERF-10: palette rebuild, `?? 0` tax, allocation inventory
- `tests/audits/profile-gallery.audit.test.ts` — M15-GALLERY-01 batch evidence: every built-in rendered on the sample card at the default limit, reported by selected colour and share
- `tests/audits/resize.audit.test.ts` — M5-PERF-11: candidate timings + byte-equality across the mode matrix
- `tests/audits/routing.audit.test.ts` — sweeps grid × palette × metric on both dither backends and asserts `routeDither` agrees with the measured winner on every row (M5-PERF-27 evidence)
- `tests/audits/runtime.audit.test.ts` — M5-PERF-16/17/19: compare cost, gate stalls, dirty sensitivity, export isolation
- `tests/audits/tone-mode.audit.test.ts` — TONE-01 evidence behind AUDIT=1: hue-sweep error-space table, Equalise drift, curve inversion, ladder selection, floor; writes the gallery HTML
- `tests/audits/wasm-boundary.audit.test.ts` — M5-PERF-15: boundary vs Rust split, calibration representativeness
- `tests/backend-select.test.ts` — selection policy/calibration + ts fallback with both backends disabled
- `tests/bench-auto-lib.test.ts` — quiet-run logic: idle parsing, valid-only canonical naming, never-retry-structural gate
- `tests/bench-auto-validate.test.ts` — automated-run validation: tainted/hidden/incomplete reports must fail, complete ones pass
- `tests/bench-counters.test.ts` — capture-counter ledger: interval deltas, conservation violations, multi-window drop folding, meta flattening
- `tests/bench-cross-check.test.ts` — cross-check comparison: ratios, same-build + tainted guards, missing rows never invented
- `tests/bench-edit-classes.test.ts` — edit-class geometry: seed determinism, per-class ops, bounds, stroke continuity
- `tests/bench-matrix.test.ts` — workload-matrix invariants: dither ID tokens, unique/derived IDs, core + method blocks, axis coverage
- `tests/bench-memory.test.ts` — retention verdicts: plateau/no-reading/lazy-GC/real-retention branches + threshold boundary
- `tests/bench-report.test.ts` — boundary contract, percentile math, warm-up exclusion, run-validity rules, schema round-trip
- `tests/bench-trace-lib.test.ts` — trace-parsing invariants: mark pairing strictness, thread majority vote, GC bucket attribution, ts-0 metadata span regression
- `tests/bench/env-node.ts` — node build/environment capture + report output dir
- `tests/bench/run-node.ts` — matrix runner + budget-to-row bindings + cold preparation rows
- `tests/benchmark.test.ts` — BENCH=1-gated: runs the matrix, writes the report, then asserts validity and budgets
- `tests/capture-acquire.test.ts` — proves every `startCapture` failure path stops the stream (STATE-02) — a rejecting `play()`, a surface that never produces a frame, a stream with no video track. Fakes, because no real browser fails these ways on demand.
- `tests/capture-crop.test.ts` — crop geometry: bounds/min-size, handles, hit-test, span
- `tests/capture-dirty.test.ts` — hash determinism/sensitivity, region-aware signatures, staleness bound
- `tests/capture-draft.test.ts` — governor hysteresis: enter/exit runs, gap, reset
- `tests/capture-master-image.test.ts` — master readback: real transfer-detachment, refill, failed/empty refill
- `tests/capture-pump.test.ts` — pump gate policy: busy/pending/drop/reset transitions
- `tests/capture-session.test.ts` — capture pure half: error messages, surface labels
- `tests/capture-surface.test.ts` — grab-surface reuse: one canvas across N grabs, in-place resize, context failure
- `tests/check-secrets.test.ts` — the secret scanner’s own suite (SCAN-01): every shape trips, near-misses do not, exceptions stay narrow.
- `tests/color-convert.test.ts` — golden: Lab reference values + round-trips
- `tests/color-profile.test.ts` — profile resolver: every narrowing step + sentence, ordering contract, built-ins non-empty, policy→recipe bridge; recipe pin helpers + pins-only inventory warning (MUST-01)
- `tests/color-sources.test.ts` — map identity/count/ordering pins, exact-match naming incl. lime/green, namespace collision guard
- `tests/controls.test.ts` — number-input clamping (pure half of controls)
- `tests/count-scale.test.ts` — the colour-limit slider's log scale: anchors 2/16/512, quarter points, monotone, round trip, clamping (ICE-LIMIT-01)
- `tests/debug-menu.test.ts` — Debug-menu pure halves: the report sequence (order, log-only fallback, failure stops before mail), mailto redaction boundary, announced outcomes, `DEV_EMAIL` shape (M14-EXT-26, DIAG-02)
- `tests/debug-panel.test.ts` — timing-window aggregation, cap, stage-change reset, ms formatting
- `tests/design-snapshots.test.ts` — design history store + quota model: tiers, oldest-first eviction, near-quota copy, memory fallback (DUR-01)
- `tests/diagnostics-bundle.test.ts` — redaction (secret keys/values, fail-closed, caps), bundle shape, status text
- `tests/diagnostics-log.test.ts` — diagnostics logger/ring-buffer contract, including fault retention (D152)
- `tests/dither-algorithms.test.ts` — M8 method invariants: determinism, membership+sidecar, boundaries, distinctness, tile validity
- `tests/dither-model.test.ts` — dither-control state matrix: families, strength semantics, preset↔custom, per-method memory
- `tests/dither-pruning.test.ts` — pruning exactness over 138,688 adversarial values × 5 palettes, dither byte-equality with and without a table, and the shared f32 work-buffer reuse guards (M5-PERF-22/25)
- `tests/dither.test.ts` — dither golden + determinism/mean/serpentine invariants
- `tests/estimates.test.ts` — hand-calculated sizes and lengths, skein boundaries, the colours-cannot-share-a-skein invariant, the disclosure sentence
- `tests/export-artefacts.test.ts` — end-to-end export artefact suite over the real key assembly and PDF build, parsed back under Node (D153)
- `tests/export-chart.test.ts` — chart layout: label margin + edge pad,
- `tests/export-pages.test.ts` — planner invariants: exact-fit/overflow, overlap edges, fresh-span coverage with no gaps, slice sidecar alignment, error sentences
- `tests/export-pdf.test.ts` — PDF layout (page sizes, aspect fit, key
- `tests/export-png.test.ts` — export transforms: k×k block replication,
- `tests/golden/dither-8x8.expected.json` — golden fixture: dither expected, TS-generated (protected)
- `tests/golden/dither-8x8.input.json` — golden fixture: dither input (protected)
- `tests/golden/hello-4x4.expected.json` — golden fixture: identity expected output (protected)
- `tests/golden/hello-4x4.input.json` — golden fixture: 4x4 gradient input (protected)
- `tests/golden/m8-atkinson-8x8.expected.json` — M8 golden: Atkinson over the difficulty crop (D154)
- `tests/golden/m8-blue-noise-8x8.expected.json` — M8 golden: blue-noise over the difficulty crop (D154)
- `tests/golden/m8-crop-8x8.input.json` — M8 golden input: the 8×8 crop chosen for difficulty (D154)
- `tests/golden/m8-jarvis-8x8.expected.json` — M8 golden: Jarvis over the difficulty crop (D154)
- `tests/golden/m8-ordered-8x8.expected.json` — M8 golden: ordered Bayer over the difficulty crop (D154)
- `tests/golden/reduce-2x2.expected.json` — golden fixture: reduce expected, hand-derived (protected)
- `tests/golden/reduce-2x2.input.json` — golden fixture: reduce input, hand-derived (protected)
- `tests/golden/resize-9x5-contain-4x4.expected.json` — golden fixture: resize expected, TS-generated (protected)
- `tests/golden/resize-9x5-contain-4x4.input.json` — golden fixture: resize input (protected)
- `tests/grid-presets.test.ts` — the presets' signing: unique ids, schema-bound values, the Every-10-equals-defaults migration identity, exact matching
- `tests/grid.test.ts` — grid-line placement, tick numbering/thinning, auto-hide rule
- `tests/helpers/golden.ts` — golden harness: fixture load + tolerance compare
- `tests/helpers/lut-f32.ts` — f32 mirror of the WGSL LUT arithmetic (fround per op)
- `tests/helpers/project-fixture.ts` — compact v10 project fixture for the container/history suites
- `tests/helpers/sample-credentials.ts` — credential shapes assembled at RUNTIME so no literal is on disk for the scanner to match (SCAN-01). Shared by the redaction and scanner suites.
- `tests/helpers/threads.ts` — Thread fixtures — one place identity-carrying test palettes are built
- `tests/helpers/wgsl-reserved.ts` — WGSL reserved-word list + identifier scan (GPU-free shader guard)
- `tests/highlight.test.ts` — highlight-mask invariants: scrim membership, compare composition, index keying (M14-EXT-17)
- `tests/info-panel.test.ts` — row cap/overflow, thread-vs-hex labels, percent format
- `tests/latest-wins.test.ts` — the async-selection guard against a deferred adapter — the hazard is latent while adapters resolve synchronously.
- `tests/library-records.test.ts` — Library file round trips, corrupt/oversized import, merge, collisions, memory store
- `tests/lut-cache.test.ts` — cache identity by palette content, LRU bound, GPU-LUT sanity rejection
- `tests/matrix/rows.ts` — the correctness matrix: row definitions with `proves` text, adversarial palettes, seeded sources
- `tests/mixer.test.ts` — the mixer maths — that the centres are derived and NOT evenly spaced, that six identity bands are the identity at every hue, and that the roll-off fades each control to its own neutral.
- `tests/modal.test.ts` — pure halves: focus-trap decisions + aria-describedby list arithmetic
- `tests/notices.test.ts` — parser invariants, byte-for-byte pin of the shipped texts to the repo files, no-fetch / no-root-URL guard (D172)
- `tests/palette-policy.test.ts` — Policy resolution: brands/source/inventory/exclusions and every explained conflict
- `tests/palette-presets.test.ts` — Preset semantics: real references, enabled-brand only, visible degradation, stated rules
- `tests/palette-resolve.test.ts` — the profile-world resolver's pins: COUNT-01 sentences, MUST-01 seat rule (pin fills, Revert shape, My-inventory pins, ownedOnly), empty-inventory case
- `tests/palette-selection.test.ts` — Count limits and auto-fill, incl. the canonical "lock 5, request 15 → 10 filled"
- `tests/palette.test.ts` — DMC load invariants (533, unique, hex↔rgb)
- `tests/pipeline-config.test.ts` — preset order, full-RGB, dither-replaces-reduce
- `tests/pipeline-hello.test.ts` — M0 acceptance: identity golden + purity invariants
- `tests/profile-editor.test.ts` — editor pure halves: browse rows, hex parsing, readout fingerprints, grid divisors, absent-vs-broken slots
- `tests/profile-options.test.ts` — the shared option renderer’s row model and grouping.
- `tests/profile-store.test.ts` — kind-aware store contract, generic profiles file round-trip, builtin rejection, My colours, paletteToProfile
- `tests/project-package.test.ts` — `.pmproj` container: byte-identical round trip, legacy JSON detection, refusals for compressed/encrypted/zip64/truncated packages (DUR-01)
- `tests/project.test.ts` — project file: byte-identical round trip, validation errors, version refusal, v10 migration, title/fallback naming (SAVE-01)
- `tests/reduce.test.ts` — reduce golden + invariants (membership, fixed point, LUT↔exact)
- `tests/request-snapshot.test.ts` — the snapshot, plus the guard on the discipline it depends on: fails on any in-place config write in `main.ts`, and on any export route reading a mutable option after its await.
- `tests/resize.test.ts` — resize golden + geometry/average/bounds invariants
- `tests/save-transcript.test.ts` — transcript-save script behaviour (paths, redaction guard)
- `tests/scales.test.ts` — The 4×4 independence matrix (identity, not equality) plus the label-distinctness checks.
- `tests/shell.test.ts` — Shell visibility composition, panel/focus label state, and preference fallback including a throwing storage.
- `tests/stats.test.ts` — stats partition/sum/sort/reference invariants
- `tests/swap.test.ts` — render palette (append, merge, dangling, re-target, no-chain) and the swap stage (remap, empty cells, no sidecar, purity)
- `tests/symbol-picker.test.ts` — picker model: unused pool order, row glyph before/after a grant, an override surviving save → load and winning at the next grant
- `tests/symbols-assignment.test.ts` — assignment-model semantics: grants, release-to-back, disjoint reset, overrides, exhaustion, reconcile (D165)
- `tests/symbols-glyphs.test.ts` — glyph catalogue invariants: pinned canonical order (append-only tripwire), path grammar, bounds (D165)
- `tests/thread-equivalents.test.ts` — Nearest cross-brand equivalent: ordering, labelling, curated over computed
- `tests/tone-controls.test.ts` — tone-controls pure halves: swap-aware share attribution, cut clamping, curve nudging, share label
- `tests/tone.test.ts` — tone-mode invariants: engagement gate + tie-break parity with production, end-stop/cut semantics, quantiles, tone reduce/dither determinism and lightness hold
- `tests/ui-baseline/baseline.test.ts` — M14 byte-identity tripwire: pins fixture/pipeline/project hashes inside check
- `tests/ui-baseline/exports/chart-200x200.pdf` — M14 baseline capture: chart PDF (compare date-normalised, D74)
- `tests/ui-baseline/exports/chart-200x200.png` — M14 baseline capture: chart PNG at cell 10
- `tests/ui-baseline/exports/design-200x200.png` — M14 baseline capture: clean PNG, pixels = reference pin
- `tests/ui-baseline/exports/design-200x200@4x.png` — M14 baseline capture: enlarged PNG at scale 4
- `tests/ui-baseline/exports/project-200x200.json` — M14 baseline capture: saved project (compare field-wise, D74)
- `tests/ui-baseline/hashes.json` — Committed SHA-256 pins the baseline test asserts; never regenerated
- `tests/ui-baseline/reference.ts` — the single definition of what the UI baseline pins; imported by both the suite (compares) and the generator (writes).
- `tests/ui-baseline/source-gradient-256.png` — Deterministic fixture the browser walks import; write-once
- `tests/ui-baseline/source.ts` — Seeded fixture generator + minimal PNG encoder for the baseline
- `tests/ui-import.test.ts` — image-file filtering (pure half of import)
- `tests/ui-styles.test.ts` — stylesheet invariant greps: [hidden]!important, no CSS order, dev-shell absence, import order
- `tests/verify-deploy.test.ts` — verify-deploy pure helpers with the network off: entry-script discovery, build-id parsing, SHA prefix match, verdict line, arg parsing (PUB-05)
- `tests/viewport.test.ts` — viewport maths exact cases (fit/anchor/clamp)
- `tests/wasm-dither-lifetime.test.ts` — proves the Rust handle is freed exactly once — on success and on a throwing getter (WASM-01). Fake module, so it runs without the pkg.
- `tests/wasm-dither.test.ts` — wasm↔TS bit-exact parity: golden fixture, metrics/scan modes, full DMC Lab
- `tests/webgpu-lut.test.ts` — GPU tolerance suite: f32-mirror near-tie bound, static shader scans, skipIf real-GPU parity
- `tests/worker-executor.test.ts` — executor end-to-end, LUT cache, coalescer
- `tests/worker-router.test.ts` — response invariant: every request answered, gate released on each rejection
- `tests/worker-settlement.test.ts` — every worker failure mode against a fake worker (STATE-04): pending exports reject instead of hanging, repeat failures settle once, a late response delivers no frame, and a per-request error stays recoverable.

<!-- FILE: pm_skills/project/tickets/CREATIVE-01.md -->

# CREATIVE-01 — Scope the creative and diagnostic image features

> **SIGNED 2026-08-23 (D200).** The scoping is closed on the owner's
> signature. This file stays as the shared spec for the five slice
> items — TONE-01, ADJUST-01, ADJUST-02, PICK-01, SHEET-01,
> COMPARE-ERR-01 (the D149 shared-file exception) — and is deleted
> when the last slice ships. Where a candidate bullet contradicts the
> "Scoping state after discussion rounds 1–5" section, that section
> wins; the naming and flavour items D200 lists stay open, each owned
> by its building slice.
>
> **TONE-01 build landed 2026-08-24 (D201, schema v12).** The tone
> module is `src/core/color/tone.ts`; the UI group
> `src/ui/tone-controls.ts` in the Colour section; evidence regenerates
> via `npm run audit` (`audit-tone-01-*.json`, `tone-01-gallery-*.html`).
> Open on the item: the four naming items and a human keyboard pass.
> For the later slices: the selection source now fetches when a floor
> or tone needs it, not only under a count limit; `PipelineConfig.tone`
> rides the config like `swaps`; the wasm clamp and GPU-LUT skip gate
> on `toneEngaged`. ADJUST-01's curve is a *different* curve (source
> remap in the adjust stage); do not fold them.
>
> **ADJUST-01 shipped 2026-08-24 (D202 build, D203 signature; schema v13).** The stage
> is `src/core/pipeline/adjust.ts` (one lightness curve + saturation,
> in Lab, with a tabled hot loop and a documented ≤ 1 sRGB-level
> tolerance — it is the only stage doing per-pixel colour maths at
> source resolution); the built-ins are
> `src/core/pipeline/adjust-presets.ts`; the profile kind is
> `src/ui/profile-editor-adjust.ts`, mounted in the Processing section
> ahead of dithering. Evidence regenerates via `npm run audit`
> (`audit-adjust-01-*.json`, `adjust-01-gallery-*.html`). Open on the
> item: the owner's starter-set signature and a human keyboard pass.
> For the later slices: the three-point curve maths now lives in
> `src/core/color/curve.ts` and its control in
> `src/ui/curve-control.ts` (tone re-exports the maths, so no caller
> changed — and its keyboard behaviour is proved once for both); the takeover editor is a kind map, so a fourth kind costs
> one branch; `fullRgbVariant` keeps `adjust`, and both content-keyed
> caches (`selectionGeometryKey`, the router's `geometryKey`) carry an
> adjustment fingerprint while the LUT key deliberately does not.
> SHEET-01's axis 2 is these presets — the prototype's per-cell
> re-selection is now production behaviour.

## Outcome

One signed programme for controlling the picture inside the app past
nearest-colour realism: which features ship, in what order, where each
lives (a pure stage, a stage parameter, a profile kind, or a view), how
each persists, and the first build slice. Each signed feature then runs
as an ordinary Track D item with its own done-when. This ticket closes
on the signature, not on the features shipping.

## Why a scoping ticket of its own (owner, 2026-08-23)

The candidates accumulated as separate Icebox lines with separate
rationales (D48, D92, D149, D173) and would otherwise be decided one at
a time at each pick. At the icebox triage (D188) the owner asked for
the scoping to get space and resources of its own — sessions,
prototypes and a sign-off sitting — for two programmes: this one, and
the pixel editor (PAINT-01). The preconditions are now met: stills are
durable (DUR-01, D179), the Must-use seat is closed (D178), the swap is
build-ready and supplies the render palette several candidates consume
(D182), and the app is live with its first user asking for "creative
potential beyond realism".

## The candidate set

Each carries what is already decided; the scoping judges the rest.

1. **Tone-only / weighted matching** (RECOLOUR C1). Lab channel weights
   in the metric (§6): at L-only a curated ladder such as Delft blue or
   Ukiyo-e becomes a two- or three-tone map of the picture's lightness
   with the hue supplied by the profile, whose order already carries
   the gradient (D46). One metric variant and a LUT key; the WebGPU LUT
   routes to TS until it learns the weights (TS is ground truth). The
   signed order puts it straight after the swap (D182-4).
2. **Image adjustments as a third profile kind** (ICE-ADJUST-01, the
   D149 presumptive milestone). Tonal sliders plus colour thresholds as
   presets, remapping the source ahead of reduction with live preview,
   shipped as read-only built-ins plus editable copies. The hook
   exists — `src/core/pipeline/adjust.ts` is an identity stub with an
   empty `AdjustParams`, left out of `buildStages` while inert — and so
   does the home: the editor shell is kind-agnostic through
   `ProfileKindAdapter` (`src/ui/profile-editor.ts`, D116). Open: the
   first slice of §9's sixteen operations (recommend black/white point
   and gamma, brightness and contrast, saturation, and threshold and
   posterisation levels — the ones that change what the quantiser sees);
   source resolution versus grid (§7 puts adjust before resize); the
   cost under live capture against the ≥ 4 updates/s promise (D135).
3. **Target % distribution** (RECOLOUR C2, the owner's idea, "deep
   thought"). Exact at two states — the source's lightness quantile at
   the requested share — and iterative above (a per-entry bias on the
   distance until the histogram lands within tolerance). The scoping
   decides whether the two-state case ships inside the threshold preset
   now and the general case stays parked.
4. **The contact sheet** (ICE-VARIANTS-01). One axis first: the dither
   methods from a frozen still, labelled, a pick adopts. Build it as a
   mechanism — frozen still → N variants → pick — because threshold
   presets and, later, profiles want the same strip. Open: modal versus
   panel, the render budget off the live path, cell size at 400 px.
5. **Tonal provenance view** (ICE-PROVENANCE-01, kept by the owner at
   the triage as the diagnostic half). Where each chosen thread sits on
   the source's light↔dark range — selection-stage introspection an
   upstream editor cannot give. Open: a strip under Colours used, an
   overlay on the contact sheet, or part of the editor's judgement
   preview; labelled as provenance, never offered as a control.
6. **The eyedropper, in-app half** (PICK-01). Pick from the source
   picture or the design; resolve to the nearest threads with ΔE; feed
   Must-use (pins, D178), swap targets (D182) and the inventory. The
   EyeDropper API (Chromium) is a progressive enhancement for picking
   from an editor beside the app; the editor's pick-up tool is
   PAINT-01's.
7. **More built-in profiles** (ICE-PROFILES-02) — a content hook, not a
   feature: once C1 exists, the forty unsigned names are re-judged as
   two-tone maps through the signed-batch process.
8. *Proposed at the triage, unjudged:* a **match-error view** — a ΔE
   heat map over the design showing where the palette serves the
   picture worst, which is where a Must-use, a swap or a painted cell
   earns its place. Diagnostic; a Compare-class decoration (D92).
9. *From the wish-list triage (D197), unjudged:* **re-pick colours from
   the current frame** — a live capture seeds the selection source from
   its first frame (or an earlier still) and holds it until the
   geometry or a colour rule changes, so the palette can be chosen
   against a picture that is no longer the source (COUNT-01).
10. *Likewise:* **recipe-level "render X as Y"** — a profile carrying
    swaps; additive once C1 exists (ICE-RECOLOUR-01 Q5).
11. *Likewise, a view not a control:* **finished-stitch / fabric
    preview** — simulated thread crosses and fabric (§10; §25's fabric
    simulation), the creative sibling of the provenance view.

## Questions the scoping must answer

- Order and slices: what ships first after the swap; which candidates
  fold into one build (thresholds with the two-state distribution; the
  contact sheet with the provenance strip).
- Placement, by the rule that nothing is preview-only: a stage
  (adjust), a stage parameter (C1, C2), a profile kind (adjustment
  presets), or a decoration (contact sheet, provenance, heat map,
  eyedropper). Exports re-run the pipeline; engine purity holds.
- The adjust stage's position and cost under live capture; adjustments
  change the source, not the palette, so the LUT fingerprint (D46) is
  untouched — confirm rather than assume.
- Persistence: each feature's home in the project file (design rule,
  profile, or none), the `.pmproj` round trip byte-identical, and one
  schema bump per round (the D182 rule).
- UI homes in the M14/M15 shell at 400 px and the 320 px floor
  (ICE-WIDTH-01): which section each feature joins; what a contact
  sheet or a heat map does to the preview-first layout.
- Profiles as colouring tools once C1 lands: does the editor's
  judgement preview gain a weight control; may a profile carry weights
  (the recipe-level option D182-5 keeps open).
- Diagnostics: which views earn their space; honest labels throughout.

## Method and resources

- Runs as a scoping task in full mode — `pm_skills/prompts/scoping.md`
  then `pm_skills/prompts/design-options.md` — budgeted at two or three
  sessions, not one: eight candidates, and the contact sheet and the
  adjustments each want a throwaway prototype.
- Prototypes are allowed on a branch, never copied into production
  source (ICE-TAURI-01's rule), and measured on the bench fixtures;
  evidence goes in `bench-reports/` or here.
- Evidence on real pictures: the six-photograph preview rig (D147) and
  the profile-gallery audit (`npm run audit`) already render every
  profile on the sample card; each candidate shows before/after there.
- Live checks follow the browser repro recipe in the running app.
- A short survey of the vocabulary users bring — the threshold,
  posterisation and gradient-map adjustments they know from Photoshop; the
  contact-sheet idiom from proofing — for naming, not for copying.
- The owner's time: one sign-off sitting per slice (the M15-GALLERY-01
  pattern), not one per question.

## Done when

The owner signs: the feature list with its order and first build slice;
for each feature its placement, persistence, UI home and done-when; the
schema plan; and which candidates are cut or stay parked (C2's general
case; the PROFILES-02 hook). The signed features become Track D items.

## Constraints that already bind

Engine purity (`src/core/` never touches the DOM); every feature a pure
stage, a stage parameter or a decoration; exports re-run the pipeline;
save → load → save byte-identical; the LUT fingerprint changes only when
matching changes (D46); ≥ 4 updates/s at ≤ 300² under live capture
(D135); the engaged-preview contract (M14-EXT-27); UI-STANDARDS' reach
and focus rules; a profile is a composition recipe (D114); design rules
live in `palette.design` (D182-5).

## Dependencies and references

Depends on ICE-RECOLOUR-01 layer A for the render palette (PICK-01's
swap-target verb; the contact sheet's swatches). Shares the eyedropper
and the render palette with PAINT-01. ICE-PROFILES-02 waits on C1.
Requirements §5.1, §6, §9, §10; decisions D46, D48, D92, D114/D116,
D135, D147, D149, D173, D178, D182, D188.

## Scoping state after discussion rounds 1–5 (2026-08-23)

Owner-agreed working state from five discussion rounds; the sitting
signs. Where this contradicts a candidate bullet above, this wins.

### The programme

1. **Slice 1 — tone mode** (schema v12). The colour ↔ tone weighted
   metric as a slider, ladder mode at its end-stop; tone bands with
   cut handles on a lightness ramp — the ramp strip is control and
   provenance readout in one (the owner's reference: the DaVinci
   Resolve qualifier idiom); target shares = cuts at source-lightness
   quantiles (exact at any N undithered, near with); cuts start
   natural with one Equalise button; re-pick from the current frame;
   the colour-use floor. Folds candidates 1, 3, 5, 9 and the new 12.
2. **Slices 2a/2b — adjustments** as the third profile kind.
   2a (v13, shipped D202): black point, white point, tone curve,
   global saturation. 2b (v14, shipped D211): the six-band H/S/L
   colour mixer and the saturation range slider, both collapsed by
   default. Band centres are derived from `srgbToLab`, not assumed
   60° apart — in CIELAB the classic six sit 22°–110° apart.
3. **Slice 3 — eyedropper** (PICK-01's in-app half): the preview
   tool-mode pilot PAINT-01 inherits; nearest threads with ΔE feeding
   Must-use, swap targets and the inventory. No bump.
4. **Slice 4 — contact sheet**: a modal over the held still via the
   export route; axis 1 dither methods, later adjustment presets and
   colour profiles; a pick adopts. No bump.
5. **Slice 5 — match-error compare**: the ΔE heat map as a compare
   mode. No bump.

Parked, with triggers: mid-slider shares (the iterative bias; wakes
when the slider proves itself), the L/C/H weight split (advanced
reveal, on ask), posterise (the contact sheet shows the per-hue-
banding gap), recipe-level swaps (a user wants one swap across
designs), finished-stitch preview (the print programme's home), the
N-D distribution case. PROFILES-02 wakes when slice 1 ships. Cut:
brightness, contrast, gamma, threshold, global hue shift — the curve,
the mixer and tone mode cover all five.

### Slice-1 decisions of record

- **Weighted from the start** (the parked weights "need to come
  soon"): the metric carries the weight; the count-limit selection
  uses the same weight as cell matching; the LUT key includes it.
  Dither must diffuse error in the weighted space or hue error leaks
  into lightness — the prototype's central measurement.
- **Tone curve**: exactly three points — top, mid, bottom — each
  adjustable on both axes, so an inverted mapping is legal by
  construction; no free-point spline. Keyboard: Tab through the
  points, arrows nudge.
- **Softness** on a band boundary ships in slice 1 only if it falls
  naturally out of the dither maths (softness = dither confined to
  the falloff zone around a cut); else hard cuts first.
- **Colour-use floor**: after the count — "count up to N, then drop
  the under-earners"; ending below N is accepted. Off by default,
  toggleable. Owner label direction "Minimum colour count threshold"
  or similar; working label "Minimum stitches per colour"; unit lean
  absolute stitches (to confirm). Must-use seats exempt; the drop
  cascade converges — the palette only shrinks.
- **Tone hint and confetti caution**: one suitability heuristic
  (entry count, hue spread, lightness spread), two messages — a
  ladder near the tone end offers a one-click "use tone matching"
  button; a broad multi-hue palette near the tone end shows a subtle
  inline caution (owner's sketch: "may be entering confetti zone").
  Never a silent change, never a block. Full tone + full palette
  stays allowed, unguarded — the ramp readout explains the result.
- **Naming**: "ladder" is project coinage (nodding to the art-class
  value ladder). Established neighbours: gradient map (Photoshop),
  duotone/tritone (print), colour ramp (pixel art), gradient/ombré
  set (yarn). The survey weighs these; the ramp control and a "ramp"
  profile shape must not collide.

### Slice-2 decisions of record

- The curve replaces gamma AND contrast; the black/white point
  sliders bind to the curve's endpoints.
- Saturation range slider: two handles rescaling the picture's
  saturation into a chosen band — levels for the S channel; lives in
  the adjust stage (already first in the chain, the owner's "close
  to the raw image"). Design-options fork: nominal remap with a
  low-S roll-off (lean — raising the floor must not tint near-greys
  whose hue is noise) vs observed-range remap (image-adaptive; needs
  the held source under live capture or it flickers).
- The mixer: six colour bands (owner-confirmed) × H/S/L; the classic
  six R/Y/G/C/B/M as working centres the prototype may tune.
- Engine note: `fullRgbVariant` must keep the adjust params so the
  selection source is the adjusted picture.
- Built-in adjustment presets: the sitting signs the starter set; ~8
  candidates with before/afters from the rig come as evidence.

### Open for the sitting (none block the prototype)

The floor's unit and final label; the user-facing names for tone mode
and ladder-shaped profiles; the confetti-note wording.

**Settled 2026-08-27 (D211):** the saturation-range remap flavour is
**nominal with a low-saturation roll-off** — the owner's call. The
same roll-off became `hueConfidence()`, shared with the mixer, so no
hue-dependent control can touch a neutral.

### Prototype plan (agreed)

Two prototypes on a branch, never production source: (1) **tone
mode** — the weighted metric, the ramp with cut handles and the
three-point curve (two or three control shapes trialled), natural
cuts + Equalise, quantile shares; the weighted-dither error question
measured on the bench fixtures; before/afters over the six-photograph
rig and `npm run audit` with two to four ladder profiles. (2) the
**contact-sheet modal** (dither axis). Evidence to `bench-reports/`
or here; then the sign-off sitting signs the programme and the
slices become Track D items.

## Prototype 1 findings — tone mode (2026-08-23)

Built at `7897ff2` on the worktree branch `creative-01-proto`
(`~/pm-worktrees/creative-01-proto`); branch-local, never merges — the
signed build re-derives from this ticket. Playground: `npm run dev` in
the worktree, open `/tone-proto.html` — source picker over the sample
card and the six-photograph rig, both ramp control shapes, the
three-point curve, live dither-variant compare, and a "whole
catalogue, 8 by weight" palette that shows the weighted selection
working. Evidence twin runs inside `npm run audit`
(`tests/audits/tone-mode.audit.test.ts`), writing
`bench-reports/creative-01-proto-tone-<sha>.json` plus the
before/after gallery `creative-01-proto-tone-gallery.html` (Delft
blue, Ukiyo-e and two programmatic hue-window ladders).

### The central measurement — the dither error space

Hue sweep at constant L\* (the adversarial fixture), Delft blue,
t = 1, natural cuts; per-column mean output L\* minus source:

| dither         | column spread | σ    | mean bias |
| -------------- | ------------- | ---- | --------- |
| none (hard)    | 0.34 L*       | 0.08 | −1.79     |
| srgb-error     | 6.88 L*       | 2.42 | +0.34     |
| weighted-error | 2.28 L*       | 0.32 | −0.01     |

Diffusing in the weighted space (curved L, w·a, w·b) cuts the
hue→lightness leak roughly 3× in spread and 7× in σ against reusing
the production sRGB error path unchanged, and holds mean tone almost
exactly; on `landscape-1.jpg` live the gap is starker still — L* bias
7.31 (srgb-error) against 0.03 (weighted-error). The decision-of-
record hypothesis is confirmed: when the weight is engaged, the
shipped dither must diffuse the error the metric sees.

### Supporting results

- **Quantile shares.** Undithered Equalise lands 2–3 % total-
  variation drift on the sample card — bounded by ties (a flat region
  shares one L*, so no cut can split it), not by the mechanism; the
  programmatic ladders on smooth content land 0.0 %. Dither then
  trades shares for tone fidelity: 12–32 % drift with either error
  space, because diffusion is precisely what splits the flat regions
  a cut lands in across neighbouring rungs. The sitting should hear
  "exact at any N" as "exact undithered, up to flat regions" — and
  the ramp readout should show achieved shares whenever dither is on,
  not restate targets.
- **Curve.** The inverted three-point curve inverts a lightness ramp
  cleanly (mean L* 27→74 becomes 74→27); identity is a true no-op.
- **Weighted selection.** The prototype's greedy copy at t = 0 equals
  production `selectThreads` exactly (asserted in the audit). At
  t = 1 over the whole catalogue at limit 8 it discovers a lightness
  ladder — picks spanning L* 9–92 — which is the PROFILES-02 story
  working from the metric alone.
- **Ladder mode as bands.** Natural cuts (rung midpoints) reproduce
  L-only nearest matching by construction; Equalise is quantile cuts;
  both live behind one ramp strip that doubles as the provenance
  readout, per the qualifier-idiom sketch.

### What the prototype leaves open

- Softness: diffusion already mixes rungs near a cut (the share drift
  is that mixing), but it is not *confined* to a falloff zone — a
  confined zone is new maths, so hard cuts ship first, per the
  decision of record.
- Control shapes: gradient strip and histogram-backed strip are both
  built; the histogram-backed one reads better on photographs (the
  handles land where the mass is). The sitting picks.

## Prototype 2 findings — the contact sheet (2026-08-23)

Built at `c10687a` on the same branch; `npm run dev` in the worktree,
open `/contact-proto.html`. The mechanism as agreed: the still and
its palette freeze at open, N labelled variants render off the live
path, a pick adopts. Axis 1 is the seven shipped dither presets
(`DITHER_PRESETS`, owner-signed labels D159) through the real
pipeline, resize included — a sheet render is priced like an export,
because exports re-run the pipeline.

- **The render budget is a non-question at this scale.** All seven
  variants at 300² render in 128–140 ms total (9–26 ms each) on the
  sample card and the portrait photo, sequenced with a
  requestAnimationFrame yield between variants so the page never
  blocks longer than one variant. The worker route is still the right
  shipping home, but the budget forces no design compromise: later
  axes (adjustment presets, colour profiles) can afford full-pipeline
  cells too.
- **Modal vs panel: both built behind one sheet builder.** The modal
  reads as "compare, decide, return" — adopting closes it. The panel
  reads as "keep comparing" — adopting leaves it open and the current
  render updates beside it. Inside the 400 px shell frame the panel
  pushes the preview off-screen, so the modal fits the companion
  window better; on a wide window the panel is the nicer instrument.
  Sitting call, with both on screen to judge.
- **Cell size at 400 px:** two-up gives ~164 px cells, and the dither
  character (ordered's grid, Floyd–Steinberg's grain) reads at that
  size on the portrait; the sample card's fine structure wants one-up
  (~340 px). Cells-per-row as a user control looks right rather than
  a fixed answer.
- **Adoption wording met STATUS-01.** The "Adopted: Jarvis." sentence
  was eaten by the re-render's ready message — STATUS-01's mechanism
  reproduced in miniature. One line fixes it in the prototype; the
  app's status line still needs STATUS-01 itself when the sheet
  ships.
- The preset `basis` lines (the D61 evidence sentences) ride along
  unused — a natural "Why:" hover for the shipped sheet.

### Axis 2 — the adjustment-preset candidates (2026-08-23, `9041fae`)

The sheet proved itself as a mechanism: a second axis cost one
variant-list branch. Its cells are the nine slice-2a candidates the
sitting owes (~8 plus None), each defined as one three-point curve —
the black/white points ARE the curve's endpoints, per the decision of
record — plus a saturation factor
(`src/core/tone/adjust-proto.ts` on the branch: None, Contrast
stretch, Punch, Faded, High key, Low key, Muted, Vivid, Mono prep,
each with a one-line basis). Adjust runs before resize (§7) and
**each cell re-selects its palette from the adjusted picture** — the
slice-2 engine note made visible, and the evidence is decisive: on
the sample card at DMC limit 8, every non-None candidate changes 3–8
of the 8 picks (Mono prep drops mean chroma by 49.6 and re-picks all
eight as near-greys — the natural feed for tone mode). Adopting an
adjustment composes with the dither axis: the dither sheet then
freezes over the adopted adjustment. Evidence artefacts:
`bench-reports/creative-01-proto-adjust-<sha>.json` + gallery, from
`AUDIT=1` on `tests/audits/adjust-presets.audit.test.ts`; per-cell
cost ≈ 30–60 ms at 300² including the re-selection.

One shipping constraint found live: an occluded window suspends
`requestAnimationFrame`, so a sheet whose render loop yields on
frames alone parks forever behind another window — the prototype now
races the frame against a 50 ms timeout, and the shipped sheet (or
worker route) must not depend on the compositor either. A backgrounded
renderer is also QoS-throttled hard (the D136 effect, seen here as
30× cell times), which is one more argument for the worker route.

<!-- FILE: pm_skills/project/tickets/DATA-01.md -->

# DATA-01 — Verify the thread catalogue's colour listings

Owner ask 2026-08-09, after M15-GALLERY-01 batch 2 surfaced a second
bad row. Rule-shaped profiles read the whole catalogue, so every batch
turns up another one; finding them one at a time is the slowest
possible route to a clean list.

**Split at D149** (was M15-DATA-01). This ticket is now the *detection*
half — the two machine-certain classes, shipped in Batch C0. The other
two classes became their own backlog items, because the original item
could not close without a large slice of the owner's time spent on the
class that matters least:

- **DATA-02** — name-versus-colour disagreement (closed as cosmetic at the 2026-08-23 triage, D188). A thread's *name* is
  decoration: identity is `brandId:reference` and RGB is display-only
  (D55/D56), so a wrong name is ugly in the key and nothing more.
- **DATA-03** — published brand values. This is the class that actually
  affects output, and the original item explicitly excluded it.

This ticket **survives Batch C0** rather than being deleted with it: the
sweep is re-runnable after each round of owner corrections, so it
outlives the run that builds it.

`src/core/palettes/thread-list.csv` is **protected owner data**. The
agent's half is detection and reporting. Corrections are the owner's,
made in the CSV, with `catalogue.json` regenerated by
`scripts/build-palette.mjs` — never hand-edited.

## What a first scan already found

Across 3,338 rows / 8 brands (Anchor 446, Ariadna 375, Madeira 366,
Finca 219, DMC 489, CXC 489, Sullivans 454, Cosmo 500):

| Class | Count | Certainty |
| --- | --- | --- |
| Row has no name at all | 21 | certain |
| Same brand, identical hex | 11 pairs | needs eyes |
| Name disagrees with the colour | unknown | needs a better probe |
| Duplicate brand + reference | 0 | clean |
| Malformed or missing hex | 0 | clean |

**The 21 unnamed rows are all Finca** — about a tenth of that brand —
which points at one gap in the Finca ingest rather than 21 unrelated
slips. The name column is empty in the owner CSV itself, so the
generator is innocent: `Finca,4368,,#2d6153`. They render in the
colour key as a reference with nothing beside it.

**Same-brand identical hex is not automatically wrong.** Two threads
sharing an RGB is normal and deliberate across brands — identity is
`brandId:reference` and RGB is display-only (D55/D56), which is why
3,338 threads render as 2,830 distinct colours. Within a *single*
brand it is likelier a transcription slip, but only the owner can say.
Examples: `Madeira 2004`/`2400` both `#000000`; `Sullivans
45175`/`45176` both `#645312`; `Ariadna 1610`/`1639` both `#cdf0ff`.

**Name-versus-colour is the class that matters and the one that
resists automation.** A crude probe (colour word in the name vs actual
hue) returns 402 hits, and the sample is dominated by false positives:
compound names like "Blue Green", "Khaki Green" and "Antique Violet"
legitimately sit between their two words, and a very dark or very pale
row's hue is barely meaningful. The known-real cases are qualitatively
different — `ariadna:1650` is `#beffff`, a cyan-white, named "heather
very light", where heather is a mauve. A useful probe has to survive
compound names and near-neutrals, or the report is noise.

## Suggested shape

- A committed sweep (the `AUDIT=1` pattern, beside
  `tests/audits/profile-gallery.audit.test.ts`) that reports each
  class with its rows and writes a JSON artefact — so the list can be
  re-run after corrections and the delta read directly.
- The certain classes go to the owner as a list to act on. The
  judgement classes go as a shortlist with the evidence beside each
  row, never as an auto-flag.
- No test gates on the findings: a failing gate over owner data the
  agent may not edit would block every unrelated task.

## Provenance correction (2026-08-11, D161)

The owner corrected the record: the colour values are **compiled from
publicly circulating reference material and are not calibrated
measurements** — the catalogue's `provenance: "measured"` field is
inaccurate and will be relabelled honestly when the data is finalised
(DATA-03). Statements below about "measured" values predate the
correction and are kept as written history; the sweep's findings are
unaffected (unnamed rows and same-brand hex pairs are defects in any
provenance story).

## Explicitly out of scope

Verifying the measured hexes against each brand's **published** colour
values. Every one of the 3,338 rows carries provenance `measured` and
no published source sits in the repo, so that is a separate piece of
work with its own data problem — and it is the one that would need
the kind of owner-supplied source data the curated cross-reference note in ICE-EXPLORER-01's ticket describes.

## Done when

- The sweep is committed and re-runnable, and reports the two certain
  classes with their rows (unnamed rows; same-brand identical hex).
- The owner has them as a list to act on, with evidence beside each
  same-brand hex pair since only they can say whether it is a slip.
- Accepted corrections are in `thread-list.csv` by the owner's hand,
  `catalogue.json` regenerated, and `check` green.
- The name-versus-colour probe is **out of scope here** — DATA-02, closed as cosmetic at the 2026-08-23 triage (D188).

<!-- FILE: pm_skills/project/tickets/ICE-EXPLORER-01.md -->

# ICE-EXPLORER-01 — Colour explorer

## Outcome

A view for *browsing* the thread catalogue rather than converting with
it: find a thread by eye or by search across 3,338 records and eight
brands, and see its nearest equivalents in every other brand side by
side.

Owner-flagged as a later nicety when the eight-brand data landed —
"a dedicated colour explorer might be nice, but this can be a later
icebox feature". Parked accordingly; it needs a decision to reactivate.

## Why it is cheap now

The engine half already exists and is tested:

- `src/core/thread-catalogue.ts` — all brands and threads, indexed by
  identity.
- `src/core/thread-equivalents.ts` — `nearestEquivalents()` across any
  brand pair, curated-over-computed, each answer labelled and carrying
  its ΔE.
- `src/core/palette-presets.ts` — `rgbToLch()`, so sorting or filtering
  by hue / lightness / chroma is already available.

What is missing is only the view.

## Sketch

- A filterable, sortable grid or table over the catalogue: by brand, by
  ownership, by LCh band, by text.
- Selecting a thread opens a detail view: its own record (brand,
  reference, name, hex, provenance) plus one row per other brand
  showing the nearest equivalents with source and ΔE.
- Natural entry point for M7-BRAND-03's curated data — this is where
  "published equivalent" versus "closest by colour" earns its keep.
- Read-only, or read-mostly: marking ownership from here would be a
  convenience, but the explorer must not become a second palette
  editor.

## Open questions

- Does it belong in the companion-narrow shell at all, or is it a
  full-width view the user opens deliberately? The M6 layout is
  preview-first at every width and this is not the preview.
- Sorting a 3,338-row list by computed LCh is fine; computing
  cross-brand equivalents for *every* row is not — the detail view
  should compute on selection, not up front.

## References

- Decisions: D56 (eight-brand data, computed-equivalents layering).
- Related: the curated cross-reference (once M7-BRAND-03, then ICE-XREF-01; now the section below), which this view is
  the natural consumer of.

## Curated cross-reference (absorbed from ICE-XREF-01, 2026-08-23 — D188)

ICE-XREF-01 was cut at the icebox triage: blocked twice over (the
owner's `thread-map-proposed.csv` is a header with zero rows, and
nothing consumes equivalents), and this view is the consumer it was
waiting for. Its design note survives here so the ingestion can start
the day the owner supplies groupings.

**Outcome.** "What is the nearest Anchor equivalent of DMC 310?" is
answered from an owner-reviewed conversion table where one exists, and
from colour distance where it does not — with the user always able to
tell which they are looking at.

**What exists.** `src/core/thread-equivalents.ts` ships the computed
half and the layering: `nearestEquivalents(catalogue, thread, brandId,
limit, curated)` takes a `CuratedMap`, prefers its entries, marks them
`source: 'curated'` with no ΔE, and fills the remaining slots with
computed matches. `NO_CURATED` (an empty map) is the shipped value.

**Shape (D56).** The owner's sketch is **wide** — one name/id column
pair per brand — so every new brand is a schema change to every row,
the file is mostly blank by construction, and a thread in two groups
has nowhere to go. Recommended instead: a **long/tidy** form, one row
per thread per equivalence group (`group_id,brand,code`); a ninth brand
adds rows, never columns, and a bad grouping is a one-line diff. The
one modelling question before ingestion: a true equivalence class
(symmetric) or a directed mapping (DMC 310 → Anchor 403, not
necessarily the reverse). Manufacturer charts are usually directed;
a group is easier to maintain — recommend groups, limitation stated.

**Behaviour to define.** A thread in no group falls through to the
computed answer (the normal case); a group naming a reference this
build's catalogue lacks keeps the entry visible as unresolved, never
silently dropped; curated and computed results are never blended into
one ranking without their labels (`describeEquivalent` already
enforces the wording split); provenance is per answer, not per brand.

**Implementation surface.** `scripts/build-palette.mjs` (or a sibling
generator) ingests the CSV into generated JSON beside the catalogue;
`thread-equivalents.ts` loads it in place of `NO_CURATED`; this view
surfaces it.

**Acceptance.** Every curated reference resolves to a real catalogue
thread; a curated answer outranks a nearer computed one and says so; a
thread outside every group still gets a computed answer; generated
output is deterministic; and the DMC 310 / Anchor 403 case (ΔE 3.3 in
`tests/thread-equivalents.test.ts`) is answered from the table rather
than the maths.

**Risks.** Curated data is the owner's judgement — never invent
groupings to fill the file. A conversion chart is a manufacturer's
claim as much as a measurement; present it as "published equivalent",
not ground truth. DATA-04's `mappedFrom` question refers here.

<!-- FILE: pm_skills/project/tickets/ICE-PICKER-01.md -->

# ICE-PICKER-01 — a searchable, taggable profile picker

Raised by the owner 2026-08-24 while MENU-01 was being scoped: *"we
are likely to need many colour profiles, so need a way to filter /
reduce — maybe some highlighted ones come top and the rest are
searchable by name and/or tags, tags selectable."*

Iceboxed, not scheduled. MENU-01 (grouping a native `<select>`) is the
answer up to a few dozen profiles; this is the answer beyond that.

## Why it is not MENU-01

A search field and selectable tag filters cannot live inside a native
`<select>`. Wanting them means replacing the control with a combobox
or a takeover picker — a different thing, not a bigger `<select>`.
Three things keep it separate and unscheduled:

- **UI-STANDARDS prefers native.** Line 212: *"Prefer native HTML form
  controls before custom ARIA widgets"*; line 317: *"Semantic HTML
  before ARIA. No ARIA is better than bad ARIA."* Leaving `<select>`
  forfeits the mobile picker, keyboard type-ahead and screen-reader
  behaviour that are free today. That cost has to be earned by a
  profile count grouping genuinely cannot carry.
- **Grouping is sufficient for now.** 25 built-ins today, 33 if
  ICE-PROFILES-02's batch three ships. Four optgroups handle that
  comfortably. The pressure only becomes real when one group passes
  roughly 25 on its own.
- **Nothing is blocked by waiting.** MENU-01 ships `group`; this ticket
  adds `tags` and `featured` alongside it. They are orthogonal fields,
  so nothing has to be undone.

## The owner's hunch, recorded 2026-08-24

Stated at MENU-01's scope-time, and it is the most important line in
this file:

> *"I think we need tags and groups, and the ability to collapse and
> search for groups and profiles within the menu. I think we'll have
> well over 100 profiles as things progress."*

So the shape wanted is **tags *and* groups, both**, with **collapse**
and **search** over both — not tags instead of groups. And the
expected scale is **100+**, which is a statement of intent rather than
a threshold to wait for.

That changes this ticket's standing. The trigger below was written as
wait-and-see; if the owner expects 100+, the question is no longer
*whether* but *when*, and the honest reading is that MENU-01 buys time
rather than solving the problem. The trigger stands as the signal to
*schedule* it, not as evidence it might never be needed.

**Collapse is new** and was not in the original scope. It is
cheap — see below — but it adds a state question: are groups collapsed
by default, and does that state persist per user? A picker that opens
fully collapsed shows a dozen headings, which is arguably the best
possible answer to a 100-profile list, but it is a real design call.

## The trigger

Wakes on whichever comes first:

- the owner scheduling it, which their hunch above makes likely to be
  the real route; or
- one group passing ~25 profiles on its own (MENU-01's largest is 8
  today, drifting to ~16 after ICE-PROFILES-02's batch three); or
- a user asking to find a profile by anything other than scrolling; or
- user-created profiles becoming numerous enough that "Your profiles"
  is itself a scrolling problem.

## What already exists — the reason this is cheaper than it looks

`src/ui/browse-table.ts` is **the shared capped search table**
(M15-UI-03, D117 seam fix 3). It already owns:

- a search field with a pure `rowsFor(query)` row model;
- a row cap with an honest count line — *"Showing 40 of 3338 — search
  to narrow"*;
- a distinct empty state for "nothing matches your search" versus "this
  universe is genuinely empty";
- the "add as custom" offer hook, which a picker would not need.

It drives the colour browse over the 3,338-thread catalogue, so it is
already proven at a scale far past anything the profile list will
reach — 100+ profiles is not a large list by this codebase's
standards. A profile picker should **reuse it, not reimplement it** —
the work is a row model plus the tag filters, not a search control.

`src/ui/accordion.ts` is the other half. It is the project-coded
Carbon accordion (M14-IMPL-03, D83) already used across the shell,
`preferences.ts` and `info-panel.ts`: a real heading wrapping the
toggle, `aria-expanded`/`aria-controls`, and a panel that leaves both
layout and the tab order when closed. **Collapsible groups are a
solved pattern here, not new work.**

So both halves the owner asked for — search and collapse — exist as
proven, accessible modules. That materially changes the cost estimate:
this is closer to assembling two existing components against a new row
model than to building a custom widget from scratch. The remaining
risk is concentrated in what neither module covers: the *combined*
keyboard model (moving between a search field, tag filters and a
grouped list), and whether the thing replaces the native `<select>` or
sits behind a button.

## The three axes, which are genuinely different

The owner's sketch names three things that must not be collapsed into
one field:

| Axis | Cardinality | What it is for | Where it lands |
| --- | --- | --- | --- |
| **group** | exactly one | which optgroup an option sits in | MENU-01, shipped first |
| **tags** | many | selectable filters — "show me the industrial ones" | here |
| **featured** | boolean | the highlighted few that come top | here |

`group` cannot be derived from `tags` (an `<option>` lives in exactly
one `<optgroup>`, so it would need an arbitrary tiebreak), and
`featured` is not a group — approximating it by ordering one group
first would be a lie the moment a featured profile belongs elsewhere.
MENU-01 is instructed not to pre-build tags for exactly this reason.

## Open questions for whoever scopes this properly

- **Do user profiles get tags?** Built-in tags are free — built-ins are
  computed from code, so a tag on one is invisible to saved files.
  User-profile tags are **persisted**, so they cost a schema version
  and a migration. That is the single biggest scoping fork here, and
  it is the reason MENU-01 deliberately kept user profiles out of the
  category model.
- **Who assigns tags?** Agent-drafted and owner-signed per batch, like
  membership (D115)? Or user-editable on their own profiles? The first
  is consistent with how the gallery is governed; the second is what
  "tags selectable" might imply.
- **Does it replace the `<select>` or sit beside it?** A takeover
  picker behind a "Browse profiles…" button keeps the native select
  for the common case and is the smaller change; a combobox replaces
  it outright and is the better end state. **This is the question that
  decides how much of MENU-01 survives**, and it is worth answering
  before MENU-01 is built rather than after: if the picker replaces the
  select, MENU-01's optgroup rendering, its option-renderer extraction
  and its DOM tests are all thrown away, while its `group` field, its
  audit-table grouping and its UI-STANDARDS line are kept either way.
  If the picker sits beside the select, all of MENU-01 keeps its value.
  MENU-01 is one session, so the exposure is bounded — but it is a free
  decision to make early and an avoidable waste to make late.
- **Are groups collapsed by default, and does that state persist?**
  New with the owner's hunch. Opening fully collapsed shows a dozen
  headings, which may be the best answer to a 100-profile list; opening
  expanded is friendlier at 30. Persisting the state per user means
  storing it somewhere, which is a small but real decision.
- **What is "featured"?** Owner-chosen per release, usage-derived, or
  a fixed starter set? Usage-derived means telemetry the app does not
  have and should not grow for this.
- **Does it serve all four selects** (`#colour-profile`,
  `#dither-profile`, `#adjust-profile`, the editor switcher), or only
  colour? Dither has 7 built-ins and adjust 9 — neither will ever need
  it. See ICE-SELECTS-01.

## Done when

Not scoped. A scoping pass answers the open questions above and
produces a build slice; the trigger decides when that pass happens.

## Links

- MENU-01 — the native-`<select>` grouping this supersedes at scale;
  ships `group` and deliberately leaves `tags` and `featured` unbuilt.
- ICE-SELECTS-01 — the four hand-rolled option loops; a picker would
  want them converged first.
- ICE-PROFILES-02 — the candidate queue that would create the pressure
  (100 unsigned candidates; 125 built-ins if it were ever all built).
- `src/ui/browse-table.ts` — the search table to reuse.
- UI-STANDARDS lines 212 and 317 — the native-first rule this has to
  argue against.

<!-- FILE: pm_skills/project/tickets/ICE-PROFILES-02.md -->

# ICE-PROFILES-02 — built-in colour profiles: the unbuilt candidates

The candidate queue that outlived M15-GALLERY-01. That item shipped
sixteen built-in style profiles in two owner-signed batches (D140,
D146) and the owner closed it at sixteen on 2026-08-09 — but asked
that the unbuilt candidates be kept for a later review rather than
cut. This file is that list; the item is iceboxed, not scheduled.

The queue now holds **100 unsigned ideas** in two pools: the original
forty (D146) and a second pool of sixty drafted 2026-08-24 (D204).
None has a rule, a membership, or test-image evidence. Nothing here
may reach the profile select without going through the same batch
process the shipped sixteen did.

## The process, if this is ever reactivated

Carried over from M15-GALLERY-01, which proved it twice:

- Agent drafts candidates in batches of roughly 6–10: a range rule
  where the style is honestly rule-shaped, curated membership where it
  is taste-shaped. Each candidate ships with test-image evidence.
- The owner curates each batch — names and membership/rules — and
  signs it. Only signed batches ship as built-ins.
- **Naming:** style-descriptive, never trademarks. "Fluoro spot print"
  is the shipped example — it is this list's "Risograph print" renamed
  off a trademark, and `riso` now sits in the naming guard.
- Built-ins are read-only and duplicate-to-edit, distinguished from
  user profiles (M15-CORE-02).
- The evidence run is reproducible and must be quoted, not re-derived:
  `npm run audit` → `tests/audits/profile-gallery.audit.test.ts`
  renders every built-in on the sample card and writes the table plus
  a JSON artefact. Since D147 the editor's preview also judges a
  profile against six real photographs, which the first two batches
  did not have.
- A profile is the **eligible universe, not the palette**: its rule
  narrows the catalogue, and the design's colour limit then selects
  from what survives. A healthy one resolves in the hundreds. Judging
  a candidate by entry count is a category error.

## Lightness ladders are admissible (D204)

The second pool was first drafted with single-hue lightness ladders
held back, on the reading that CREATIVE-01's "the ramp control and a
'ramp' profile shape must not collide" excluded them. **The owner
ruled otherwise on 2026-08-24: ladders are fine as palettes.**

The consequence is worth stating, because it is the opposite of a
collision. A ladder profile feeding tone mode is the *pairing the two
features were built for* — a narrow ordered ramp as the eligible
universe, matched by the tone metric, is exactly gradient-map
behaviour, reached through two controls that already exist. The
warning in CREATIVE-01 is about the **control shape and the naming**
not colliding, not about the membership being forbidden.

Two things follow for drafting:

- A ladder is where **order is identity** (D46) bites hardest. It
  ships written light-to-dark and is judged in that order.
- Ladder candidates need their evidence read at a *low* colour limit
  as well as the default eight. A five-rung ladder selected down to
  eight is the whole profile; the same rule against a photograph at
  limit 20 is a different claim.

Queued **Sashiko indigo** (pool A) is a ladder and no longer needs
re-filing. Pool B's **Nautical chart** keeps its depth bands.

---

## Pool A — the original forty (D139/D146 era)

### Candidates — culture (19)

- **Movements and eras:** Impressionist water-lilies, Art nouveau,
  Bauhaus, Pop art (Warhol), Memphis, Baroque gold, Rococo pastel.
- **Design and media:** Technicolor, Vaporwave, Y2K chrome, Rave
  flyer, 8-bit arcade, Cosy pixel farm.
- **Craft and place:** Talavera tile, Batik, Kilim, Sashiko indigo,
  Terracotta and lime, Scandinavian winter.

### Candidates — nature (21)

- **Seasons and light:** Summer coast, Dawn mist, Storm light, Aurora.
- **Biomes:** Desert bloom, Coral reef, Alpine, Tundra, Wetland reeds.
- **Flora and fauna:** Wildflower verge, Succulents, Butterfly wing,
  Plumage, Beetle shell, Lichen and bark, Autumn fungi, Rock pool.
- **Mineral and sky:** Opal fire, Slate and moss, Sandstone canyon,
  Night sky.

**Two names in pool A now fail the naming guard** and must be renamed
before they are ever drafted: *Technicolor* (a live mark, and the
proof that a fixed guard list cannot catch what nobody thought of)
and *Pop art (Warhol)* (an artist whose estate enforces). *Talavera
tile* carries a Mexican denomination of origin and wants the owner's
call.

---

## Pool B — the second pool, sixty candidates (D204)

Picked against gaps rather than down a list of names, the way batch 2
was. The gallery still has **no red** (Autumn leaves begins at hue 10
and is orange in practice), **no violet**, **no achromatic ladder**,
**no all-hue dark** (Deep sea is cool, Rainforest is green), **one
two-pole shape** (Neon noir), and **nothing from industry**.

Pool B leans curated — 14 rule-shaped and 8 ladders against 38
curated, next to a shipped gallery that is 9 rule to 7 curated. That
is the untouched territory being what it is: industry, systems and
early-computing palettes were *specified by somebody*, so a
colour-space band would misdescribe them. Batches drawn from this pool
must reach for the rule-shaped candidates deliberately.

### Batch three — SIGNED 2026-08-24 (D206), the gallery reaches 33

**All eight shipped as drafted.** The owner signed names and membership
unchanged, together with the two calls the batch raised: the
multi-brand hi-vis and the menu split. Evidence is in
`bench-reports/audit-m15-gallery-01-*.json` and reproduces with
`npm run audit`.

Do **not** re-propose these; and note two entries carry standing
decisions that a later pass must not quietly undo — Vermilion's
residual and hi-vis's single Ariadna thread, both recorded below and in
the source comments.

**Three changed under the evidence, which is what the run is for.**

- **Chiaroscuro** first read as *pastel*, not shadow: its high-key band
  was saturation ≤ 25 / brightness ≥ 90, which admitted pale terracotta,
  yellow-green and lavender — they took the top three shares. Tightened
  to saturation ≤ 10 / brightness ≥ 92, it now reads as darks against
  near-whites with no middle, which is the style.
- **High-visibility safety** gave Pearl Grey 57.7 % and the fluoro only
  14.5 % — grey with accents, not hi-vis. Retroreflective silver is real
  workwear, but not at the cost of the name: the grey is dropped and it
  ships as three entries (fluoro yellow-green, fluoro orange, black) at
  black 51.7 % / fluoro 39.5 %.
- **Vermilion and madder** was retuned four times and is **signed-off
  material with a residual named**, in the Neon noir and Art deco
  pattern. Its largest share is a mahogany at 42 %, not a vermilion.
  That is the sample card, not the rule: the card is **56 % full-hue
  sweep**, so a red-only profile must map every green and blue on it to
  the nearest red. The shipped, signed **Autumn leaves** leads with a
  tan at 36 % and **Delft blue** with white at 38.9 % for exactly the
  same reason. Judge this one on a photograph before changing it.

**One profile leaves DMC, signed as the deliberate exception.**
High-visibility safety uses `ariadna:1697` for its fluoro yellow-green
because DMC's nearest is ΔE ≈ 36 (Lemon — a plain yellow) against
Ariadna's ΔE ≈ 7. A hi-vis profile whose signature colour is a plain
yellow would lie about what it is. Orange and black stay DMC, so the
shopping list costs exactly one extra manufacturer. Every other curated
built-in is single-brand: this is **the** exception, signed as such —
do not "correct" it to DMC, because that renames the profile.

**The menu grew a group, and the split is signed with the batch.** All
eight land in style territory, which took MENU-01's "Style and era"
from 8 to 16 and tripped its ≤ 12 test. Split three ways as MENU-01
anticipated: **Art and craft** (6), **Design and era** (4), **Screen
and signal** (6). Nothing exceeds eight; the existing sixteen were
re-homed, not renamed, and no id moved, so no saved design moved.

The batch as drafted, with every entry closing a named gap:

| Candidate | Shape | Closes |
| --- | --- | --- |
| Grisaille | rule | achromatic — no thread-based neutral set exists |
| Chiaroscuro | rule, 2 bands | all-hue dark — every dark profile is hue-locked |
| Vermilion and madder | rule | red — nothing in the gallery owns it |
| Teal and orange | rule, 2 bands | warm/cool poles — Neon noir is magenta/cyan |
| Anodised aluminium | curated | violet — the largest unclaimed region |
| Heraldic tinctures | curated | violet again, via a defined historical system |
| High-visibility safety | curated | acid, and the first industry entry |
| Transit map lines | curated | distinguishability — directly useful in a chart |

### Art and pigment (10)

The queued forty covers movements; this covers **materials** — what a
medium physically permits, which rules more honestly than a movement.

- **Grisaille** *(rule)* — the paint-in-greys underpainting: near-zero
  chroma across the full lightness range.
- **Chiaroscuro** *(rule, 2 bands)* — any hue at very low brightness,
  plus a narrow high-key band. The gap between them is the style.
- **Vermilion and madder** *(rule)* — the red arc alone, scarlet
  through crimson to rose, held at chroma so it never drifts to brick.
- **Fresco lime plaster** *(rule)* — what survives wet lime: earth
  hues capped at middling chroma, held bright. *Check: Sepia.*
- **Verdigris and bronze** *(rule)* — copper oxides against warm
  unweathered metal. Fills the seam between Rainforest and Deep sea.
- **Sumi ink wash** *(ladder)* — a warm-black dilution ladder. The
  warm counterpart to Grisaille's cool.
- **Cave ochre and charcoal** *(curated)* — red ochre, yellow ochre,
  charcoal, chalk white. Four or five entries; tests the count floor.
- **Egg tempera and gold ground** *(curated)* — vermilion, lapis,
  ochre, verdigris, gold, ivory.
- **Expressionist woodcut** *(curated)* — black, raw white, one or two
  unmixed colours. Deliberate counterweight to Ukiyo-e's refinement.
- **Botanical plate** *(curated)* — hand-coloured engraving on cream.
  *Check: Spring meadow.*

### Design and print (8)

Sets somebody specified for a reason, so curated is the truthful shape.

- **Terrazzo** *(rule, 2 bands)* — a pale ground band plus all-hue
  mid-chroma chips. The split is the material.
- **Brutalist concrete** *(rule)* — near-neutral mids with a cool
  cast, plus rust and moss staining. *Check: Moorland — may be
  redundant.*
- **Transit map lines** *(curated)* — one entry per hue sextant at
  maximum mutual separation. Legibility as membership.
- **Anodised aluminium** *(curated)* — the violet-blue, acid green,
  gold, red, and raw silver.
- **Vitreous enamel signage** *(curated)* — deep blue, white, red,
  black. *Check: De Stijl primaries.*
- **International typographic** *(curated)* — red, black, white, one
  grey.
- **Constructivist** *(curated)* — red, black, cream, ochre. The
  warmer, dirtier cousin. *Ship at most one of these two.*
- **Ceramic glaze** *(curated)* — celadon, tenmoku, oxblood, ash,
  iron. Muted-but-deep, between Moorland and Deep sea.

### Industry and infrastructure (8)

Entirely new territory — neither pool A nor the shipped sixteen holds
a single industrial entry, and membership here is documented fact
rather than taste.

- **Shipping container** *(rule)* — everything faded by a year at sea:
  mid chroma across all hues. *Check: Moorland.*
- **High-visibility safety** *(curated)* — fluoro yellow-green and
  orange against black and retroreflective silver.
- **Hazard and warning** *(curated)* — yellow on black, white on red,
  white on blue. *Overlaps the above at yellow; ship at most one.*
- **Machinery and plant** *(curated)* — plant green-grey, dust yellow,
  oxide primer red, black.
- **Maritime signal flags** *(curated)* — red, yellow, blue, black,
  white. Five colours fixed by a real system; the cleanest curated
  case in the pool.
- **Railway livery** *(curated)* — bottle green, maroon, cream, black,
  with fine lining. The lining is one stitch wide, which suits the
  medium exactly.
- **Cockpit instrument** *(curated)* — dark panel grey-green, amber,
  white, warning red. A palette designed to be read in the dark.
- **Circuit board** *(curated)* — solder-mask green, gold pad, black
  component, tinned silver, red and blue wire.

### Early computing (7)

Added at the owner's request, 2026-08-24. The category needs unusual
care in two directions: **three obvious entries are already shipped**
(see "Already covered"), and every machine that defined a palette also
defined a trademark, so all seven are named by mechanism.

- **Handheld green LCD** *(ladder)* — four greens, no more. The
  clearest ladder in the pool and instantly recognisable.
- **Green phosphor** *(ladder)* — black to a single green, by
  brightness alone.
- **Amber phosphor** *(ladder)* — the same shape one hue over. Ship
  both or neither; they are a pair, not a duplicate.
- **Four-colour adapter** *(curated)* — black, cyan, magenta, white;
  the alternate mode swaps in red, green and dark yellow. The
  *restriction* is the style, which is why it is not Retro 16.
- **Composite artefact colour** *(curated)* — the purple, green, blue
  and orange fringes that appeared where no colour was sent. Nothing
  in the gallery resembles it.
- **Home micro brights** *(curated)* — eight hues at two brightness
  levels. Distinct from 1-bit RGB *because* of the dim/bright pairing,
  which is the whole character. *Verify that distinction first.*
- **Home console** *(curated)* — the washed, low-contrast console
  palette with no true saturation at the extremes. *Check: pool A's
  8-bit arcade — arcade boards carried far more colour, but confirm.*

### Photography and film (6)

The strongest rule-shaped seam: a stock or a grade *is* a
transformation of colour space, and users recognise these without
being told the name.

- **Teal and orange** *(rule, 2 bands)* — a warm skin arc against a
  cool shadow arc, with the greens and magentas left out.
- **Cross-processed** *(rule, 2 bands)* — highlights pushed
  yellow-green, shadows pushed cyan-blue. Hue split by brightness,
  which no shipped profile does.
- **Instant film** *(rule)* — milky and warm: low chroma at mid-to-high
  brightness with the hue range skewed off neutral. *Check: Pastels.*
- **Sun-bleached print** *(rule)* — cyan dye fades first, so a print
  drifts magenta-yellow. *Check: Sepia — this keeps pink.*
- **Bleach bypass** *(rule)* — chroma stripped, blacks kept. **Likely
  redundant against Grisaille and Moorland; verify before drafting.**
- **Screen-plate colour** *(curated)* — the earliest colour
  photography: soft orange-red, green and blue-violet grains over a
  warm haze. Named by process, not by the maker's mark.

### Textile and dye (7)

Closest to the product's own world and easiest to over-fill. Pool A
already holds Batik, Kilim and Sashiko indigo; **a batch should take
at most two from here.**

- **Natural dye garden** *(curated)* — weld yellow, madder red, woad
  blue, walnut brown, onion gold. What a dye plot actually yields.
- **Indigo dip** *(ladder)* — each dip darkens the last. *Check:
  pool A's Sashiko indigo, which is the same shape.*
- **Tartan sett** *(curated)* — bottle green, navy, deep red, black,
  with white and yellow overchecks one thread wide. *Check: Fair Isle.*
- **Undyed fleece** *(curated)* — white, oatmeal, moorit brown, grey,
  black. **Overlaps Fair Isle, which opens on undyed wool (3866,
  3045); verify first.**
- **Kente** *(curated)* — gold, maroon, forest green, black, blue.
  *Cultural naming — owner's call.*
- **Suzani** *(curated)* — madder, indigo, saffron, cream. *Check:
  pool A's Kilim — same dye tradition, different cloth.*
- **Sari and zari** *(curated)* — saturated silk grounds shot with
  metallic gold. *Check: Gemstones, which is chroma with no metal.*

### Systems, maps and the laboratory (5)

Palettes somebody standardised and wrote down, so membership is a
matter of record — the least contestable curated candidates here.

- **Heraldic tinctures** *(curated)* — gules, azure, vert, sable, or,
  argent, purpure. Seven colours fixed for eight centuries.
- **Laboratory stain** *(curated)* — haematoxylin blue-purple against
  eosin pink, on white. Fills the violet-to-pink corner.
- **Geological map** *(curated)* — the stratigraphic period colours:
  pale yet oddly saturated, standardised internationally.
- **Topographic map** *(curated)* — buff contours, blue water,
  woodland green, road orange, grey grid on white. Describe by
  convention; **never name a national mapping agency.** *Legibility-
  driven like Transit map lines; at most one per batch.*
- **Nautical chart** *(curated)* — buff land, depth-banded blues,
  magenta symbols, black soundings.

### Heat, light and sky (3)

Three ladders, admissible since D204. Grouped by what they describe
graduated light rather than by where they come from.

- **Foundry heat** *(ladder)* — black through cherry red, orange and
  yellow to white. The blackbody curve; the most legible ramp here.
- **Stellar temperature** *(ladder)* — red through white to blue. A
  ladder that crosses hue rather than staying on one.
- **Cyanotype** *(ladder)* — paper white to Prussian blue, with
  nothing between but dilution.
- **Storm light** — *already in pool A.* Listed here only so the
  territory reads whole.

### Vernacular and place (6)

Nobody designed these; they accumulated. Hardest to defend as rules,
most likely to charm — which is what the batch signature is for.

- **Institution green** *(rule)* — the pale green-grey of hospitals,
  schools and swimming baths: narrow, cool, low chroma, held bright.
  Fills light-and-muted-with-hue; Pastels is hue-free.
- **Allotment and shed** *(curated)* — creosote brown, sage paint,
  terracotta pot, galvanised grey. *Check: Moorland.*
- **Fairground and carousel** *(curated)* — red, gold, cream, deep
  green, mirror silver. *Check: pool A's Rave flyer — ornate, not flat.*
- **Enamelware kitchen** *(curated)* — cream body, deep green or navy
  trim, one red handle. *Overlaps Vitreous enamel signage in material.*
- **Sports pitch and playground** *(curated)* — primary plastics on
  pitch green and asphalt grey, white line-marking through it.
- **Harbour town** *(curated)* — chalky pinks, blues and ochres
  against white, weathered. **Close to pool A's Summer coast; compare
  before drafting.**

---

## Investigations to settle before drafting

Each is answered by resolving the candidate against the live
catalogue in the audit run and comparing entry sets — cheap once a
rule exists, and wasted effort before then. Recorded so a drafting
session does not rediscover them.

| # | Question | Settles |
| --- | --- | --- |
| 1 | Does **Bleach bypass** resolve to a subset of Grisaille or Moorland? | Whether it ships at all |
| 2 | Does **Undyed fleece** overlap Fair Isle's undyed opening? | Whether it ships at all |
| 3 | Does **Brutalist concrete**'s cool cast separate it from Moorland? | Whether it ships at all |
| 4 | Is **Harbour town** distinguishable from pool A's Summer coast? | Which of the two is drafted |
| 5 | Does **Home micro brights**' dim/bright pairing survive as membership, or collapse into 1-bit RGB? | Whether it ships at all |
| 6 | Does **Home console** separate from pool A's 8-bit arcade? | Whether both can ship |
| 7 | Does **Indigo dip** differ from pool A's Sashiko indigo? | Which of the two is drafted |
| 8 | International typographic vs Constructivist; High-visibility vs Hazard; Transit map vs Topographic | One of each pair per batch |
| 9 | Do ladder candidates read at colour limits below 8 as well as at the default? | The D204 evidence rule |

## Already covered — do not propose

Recorded so the same suggestions do not arrive again.

| Suggestion | Already is |
| --- | --- |
| Teletext eight | **1-bit RGB** — the same eight saturated corners, exactly |
| Desktop 16 / EGA / VGA 16 | **Retro 16** — the HTML4/VGA named set in VGA index order |
| Dithered web palette | **Web-safe** — the 216 |
| Workstation greyscale | **Greys** map, plus Grisaille above |
| Harris tweed / Heather | **Moorland**, almost exactly |
| Stained glass | **Gemstones** plus a dark floor — and it collides with a demo-image name |
| Slide film | **Gemstones** |
| Autumn woodland | **Autumn leaves** |
| Ocean depths | **Deep sea** |
| Seaside pastels | Pool A's **Summer coast**, plus Pastels |
| Camouflage | **Moorland** |
| Psychedelic poster | Pool A's **Rave flyer** |
| Adire / Shibori | Pool A's **Sashiko indigo** |
| Persian carpet | Pool A's **Kilim** |
| Watercolour wash | **Pastels** |

## Naming

No pool B name trips the guard. Three notes:

- **Two names were pre-emptively changed at draft.** "Screen-plate
  colour" avoids the mark on the early colour process; "Sports pitch"
  avoids a trademarked road-surface name. Same failure mode that
  turned Risograph print into Fluoro spot print.
- **The guard was extended (D204)** with film, print, material and
  early-computing marks — `technicolor`, `kodachrome`, `polaroid`,
  `formica`, `perspex`, `tarmac`, `astroturf`, `day-glo`, `letraset`,
  `atari`, `amiga`, `sega`, `game boy`. `spectrum` and `commodore`
  were **deliberately left out** and are asserted as passing: both are
  ordinary words before they are machines, and the D139 lesson is that
  a guard rejecting a legitimate name is worse than no guard.
- **Cultural names need the owner's explicit call.** Kente, Suzani and
  Sari in pool B; Talavera tile and Pop art (Warhol) in pool A. Fair
  Isle and Ukiyo-e set the precedent that place and tradition names
  are acceptable; where the cloth and the people have different names,
  prefer the cloth.

## What drafting actually costs (measured 2026-08-24)

**The machine cost is nil.** `AUDIT=1 vitest run
tests/audits/profile-gallery.audit.test.ts` renders all 25 built-ins
through the real pipeline in **~1.7 s**, reporting per profile: entry
count, distinct colours, and the eight selected colours with brand,
reference and percent share of the image. At 125 profiles it would
still be seconds. **Iterate freely** — the draft → run → read shares →
retune loop is free, and D139 proved it is necessary: Neon noir was
retuned twice and Delft blue lost an entry under exactly this loop.

**The cost is judgement, and it splits three ways:**

| Class | Rough cost each | Why |
| --- | --- | --- |
| Rule-shaped | 15–30 min | Three number pairs. Falsifiable — the audit says if it is wrong. |
| Ladder | 20–40 min | Ordered rungs from the catalogue, judged at a low colour limit too. Even L\* steps can be computed rather than guessed. |
| Curated | 30–60 min | Choosing 5–11 threads from 3,338 to embody a style. The taste-shaped half. |

Pool A's forty are worse: they have never had a *shape* decided, so
that judgement comes first.

**All 100 is therefore roughly 10–14 drafting sessions — and about 13
owner sittings**, since D115 signs batches of 6–10. The signature, not
the drafting, is the real rate limit. That is worth knowing before
anyone commits to the queue.

## Do not build all one hundred

The gallery closed at sixteen deliberately, and the menu is the
evidence that finishing the queue is the wrong goal: 25 built-ins today
sit in a flat `<select>`, 33 after batch three, and **125 would be
indefensible**. A 125-profile gallery is a worse product than a
33-profile one.

- **MENU-01** groups the menu and is the precondition for batch three.
  It is sized for a few dozen profiles, not hundreds.
- **ICE-PICKER-01** is what a genuinely large gallery would need —
  search and selectable tags — and its trigger is one optgroup passing
  ~25, which today's Styles group (19, or 27 after batch three) would
  reach on a *second* signed batch.

The triage board and `docs/palette-candidates.csv` exist so the queue
gets **cut** before it gets built. Treat the hundred as a menu to
choose from, never as a backlog to clear.

## The cheapest useful next move

If this item wakes and a full batch is not wanted, draft **the 14
rule-shaped pool-B candidates only**, run the audit, and report which
resolve healthily and which collapse. About one session, and the best
value available, because:

- a range rule is three numbers, so no taste is smuggled in and it
  cannot pre-empt the owner's signature the way a curated list would;
- it **tests the gap claims rather than restating them** — whether
  Vermilion and madder actually finds reds, whether Grisaille finds a
  real neutral ladder, whether Chiaroscuro's dark band collapses the
  way Neon noir's floor did twice before it was retuned;
- several candidates would likely die in it, which is the point, and
  dying there costs no owner time.

It returns an evidence table, not a proposal.

## Three maps that could be profiles today

`Greys` (4 even levels), `1-bit RGB` (the 8 corners) and `2-bit RGB`
(64) are generated by `core/color-sources.ts` and are already
selectable as *libraries* in the profile editor — but none has a
built-in profile of its own, so none appears in the profile menu. Each
is a one-line addition to `builtInProfiles()`, in the same shape as the
shipped `Black & white` / `Retro 16` / `Web-safe` entries.

Not done at D204: adding a profile to the gallery is a gallery change
and therefore owner-signed. But it is the cheapest three entries
available, and `1-bit RGB` in particular is the one TWOCOLOUR-01 finds
actively misleading — eight colours under a name people read as two.

## Shareable sheet

`docs/palette-candidates.csv` carries all 100 candidates with pool,
category, shape, description and status, for review outside the repo.
Regenerate expectations there if this file changes.

<!-- FILE: pm_skills/project/tickets/ICE-TAURI-01.md -->

# ICE-TAURI-01 — Tauri desktop-packaging feasibility spike

## Outcome

Decide whether a Tauri package materially improves Pattern Mapper's
Photoshop-companion workflow enough to justify a second application surface.
Produce a go/no-go recommendation, evidence for the difficult capabilities, and
a delivery/security outline. Do not begin packaging or add dependencies during
the spike without separate approval.

## Current web baseline

The app is a Vite/TypeScript browser application whose core processing runs in a
Web Worker. It uses `getDisplayMedia` for user-selected screen/window capture,
OffscreenCanvas for rendering/export, optional WASM/WebGPU backends, browser file
downloads/imports, and a versioned JSON project schema. That pure core and
worker-message boundary are favourable for reuse inside a webview, but browser
API presence does not prove equivalent permissions or capture behaviour in a
packaged macOS webview.

## Questions the spike must answer

### Capture and permissions

- Does the actual Tauri macOS webview expose the current capture flow, source
  chooser, frame rate, region cropping, and audio-free constraints reliably?
- If not, is a small ScreenCaptureKit bridge required, and can it deliver frames
  as transferables without moving processing onto the main thread?
- What Screen Recording prompts, denial/retry states, app restart, and signed-app
  identity behaviour occur on supported macOS versions?
- Can web and native builds retain one capture-session interface rather than
  branching throughout `main.ts`?

Apple's ScreenCaptureKit is the native reference and can present system capture
selection, but Tauri's official plugin catalogue does not currently provide a
screen-capture plugin. Treat a custom bridge as material native code and ongoing
maintenance, not a configuration toggle.

### Window/workspace value

Prototype Tauri's logical position/size, monitor enumeration, always-on-top if
desired, and window-state restoration. Then test the window-automation need ICE-WORKSPACE-01 described (cut at the 2026-08-23 triage, D188; its ticket is in git history):
arranging Lens is straightforward; moving Photoshop requires a separate,
tightly-scoped macOS Accessibility/automation mechanism and permission. Tauri
does not itself grant control over another application's windows.

### Platform and distribution

- Minimum macOS/Windows versions and WebView feature parity.
- Apple signing, hardened runtime, entitlements, notarisation, first-launch
  prompts, and update signing; Windows code signing/SmartScreen equivalents.
- Secure update channel and rollback, with product version plus build identity.
- Project-file byte compatibility between web and desktop builds.
- GPU/WASM availability, benchmark parity, diagnostics, crash/error collection,
  and one-command dev/runtime/quality gates.

## Security boundary

Use Tauri capabilities with least privilege per window. Inventory every command,
filesystem path, shell/automation action, URL, and update permission. No generic
shell execution, arbitrary path access, secret in configuration, or broad remote
content. Photoshop automation, if tested, should accept a constrained layout
request rather than user-supplied script text. Diagnostics remain redacted.

## Spike method and artefacts

Build the smallest throwaway vertical slice on a disposable branch or scratch
area: app window → permission → live captured frame → current worker pipeline →
preview, plus save/open one project and restore one window position. Measure the
same fixtures and build identity as the web app. Record an environment matrix,
permission screenshots/errors, capture/update rates, CPU/memory, package size,
signing/notarisation steps, native-code inventory, and unresolved risks.

Do not copy production source into a fork. The delivery outline should define a
shared web application plus narrow adapters for capture, files, window control,
and updates.

## Go/no-go criteria

Recommend **go** only if the package reliably improves at least one high-value
workflow (capture permission/source selection, stable companion window, or
approved workspace automation), keeps project/output compatibility, meets live
performance, has an acceptable signing/update path, and needs a maintainable
native surface. Recommend **no-go/park** if it merely wraps the same browser
limits, requires an extensive custom capture stack, weakens the security model,
or creates disproportionate release support.

## Dependencies

- M6-WIN-01 supplies the tested browser ceiling.
- The window-automation use case came from ICE-WORKSPACE-01 (cut 2026-08-23, D188: D149 retired the Photoshop-beside-the-app assumption).
- This is an icebox spike; it does not block browser milestones M6–M12.

## References

- [Tauri window API](https://v2.tauri.app/reference/javascript/api/namespacewindow/).
- [Tauri capabilities and permissions](https://v2.tauri.app/security/capabilities/).
- [Tauri official plugins](https://v2.tauri.app/plugin/).
- [Tauri distribution and signing](https://v2.tauri.app/distribute/).
- [Tauri macOS bundles and entitlements](https://v2.tauri.app/distribute/macos-application-bundle/).
- [Apple ScreenCaptureKit](https://developer.apple.com/documentation/ScreenCaptureKit?changes=l_4).
- [Apple ScreenCaptureKit sample](https://developer.apple.com/documentation/screencapturekit/capturing-screen-content-in-macos?changes=_9).

<!-- FILE: pm_skills/project/tickets/PAINT-01.md -->

# PAINT-01 — Scope the pixel editor

## Outcome

A signed design for painting stitches in a design — the tools, the
interaction model by pointer, keyboard and touch, what persists and
when it clears, undo, how painting composes with the swap's render
palette and the profile, and the v1 slice — so the editor builds as a
sequence of ordinary Track D items. Closes on the signature.

## The ask

Owner, 2026-08-22: "a pixel editor … something that gives users the
creative potential to move beyond realism in the colour mapping".
Owner, 2026-08-23 (the icebox triage, D188): "a pixel editor so users
can effectively paint pixels in a design" — the word is *effectively*:
an editor a stitcher can work in, not a demo brush. The scoping gets
its own sessions, a prototype and a sign-off sitting.

## Already decided (D182 — the seed moved here from ICE-RECOLOUR-01)

- Cell overrides are a **sparse cell → thread map applied as the last
  stage** — cell-addressed, so after resize under either preset.
- **Stills only in v1**: import, sample, paused or grabbed capture,
  restored design. Overrides are held across frames; the brush is off
  while frames flow. "Live too" is not v1; revisit on demand.
- **After layer A**: a painted thread may be outside the palette, so
  the editor needs the render palette; the order is A → C1 → B.
- Exports carry edits because they re-run the pipeline; the sidecar
  drives stats, the key, estimates and symbols (identity-keyed grants,
  D160/D165).
- Persisted sparse (dense worst case ~2 MB at 1024²); cleared on any
  grid change because cells re-address.
- Seed tools: paint a thread, fill a contiguous same-index region,
  erase to fabric, undo. The cost is the surface: hit-testing through
  the preview's view transform (`src/ui/viewport.ts`), a tool mode,
  keyboard painting for AAA operability, the engaged-preview contract
  (M14-EXT-27).

## Questions the scoping must answer

1. **Tool vocabulary for v1.** Stitch-pattern editors share an idiom —
   pencil, fill, line, rectangle and ellipse (outline and filled),
   select and move, mirror and flip, replace colour, pick-up (the
   eyedropper). Which are v1, which later; backstitch and fractional
   stitches are outside the model and stay out.
2. **The paint palette.** The render palette (selected entries plus
   swap targets), "add a thread from the universe" through the shared
   browse table, and fabric (erase). How a painted thread enters
   Colours used, the key and the estimates — by construction if
   overrides rewrite the sidecar index — and takes a symbol.
3. **Interaction model.** Pointer (mouse, pen, touch) through the view
   transform at any zoom; a tool mode with an explicit enter and exit
   so the engaged-preview contract (wheel and pan) and painting never
   fight; keyboard painting (a cursor cell, arrows, Enter or Space to
   paint, Shift to extend for fill and rectangle) for AAA operability;
   the cursor cell and its thread announced to assistive technology
   (A11Y-VO-01 grows); touch at 400 px without stealing the scroll.
4. **Undo and redo.** A bounded stroke-level history in session, and
   how it sits beside the design history's 2 s tick (D179): undo is
   within a session, the history is across sessions.
5. **The stage and the sidecar.** `overrides` as the last pure stage
   over the sidecar (the swap's precedent: omitted when empty,
   O(cells)). A grid change clears — warn first, DUR-01's rule of
   warning before loss. A profile change leaves overrides referencing
   threads by id: a dangling override is kept, explained and rendered
   from its snapshot, mirroring dangling swaps (D178's drift rule).
6. **Persistence.** `design.overrides` sparse (cell index → thread
   record or render-palette id), a cap, its own schema bump in its own
   round, a byte-identical round trip, the `.pmproj` container
   untouched.
7. **Live capture.** What the UI says while frames flow; freeze as the
   entry to painting (a capture already freezes at save time, D179).
8. **Performance.** A stroke must not re-run the whole pipeline: the
   override stage alone re-runs over the held frame (the FLICKER-01
   hold); target a stroke rendered within one frame at 300². Painting
   is off the live path, so the ≥ 4 updates/s promise is untouched —
   confirm with the prototype.
9. **Where it lives.** A tool strip in the view strip (D92's permanent
   quiet strip) and an "Edited stitches: N · Clear" readout in the
   Colour section; the profile editor's preview rig ignores overrides.
10. **Swap-to-fabric** (wish-list: erase a thread by swapping it to
    empty) — this editor's erase, or the swap's territory.

## Method and resources

- A scoping task in full mode — `pm_skills/prompts/scoping.md` then
  `pm_skills/prompts/design-options.md` — budgeted at two or three
  sessions plus a throwaway prototype of the hit-testing and the
  one-stroke render path, measured before the sitting.
- A short survey of the idiom users bring: stitch-pattern editors for
  the tool set, pixel editors for keyboard conventions — vocabulary
  and expectations, not code.
- The accessibility pass planned in from the start: keyboard and
  VoiceOver on the prototype, not after.
- The owner's sign-off sitting with the prototype in hand; one sitting
  per slice after that.

## Done when

The owner signs the v1 tool set, the interaction model (pointer,
keyboard, touch), persistence and clearing rules, undo, the UI home,
and the build slices — for example v1a pencil + pick-up + undo +
persistence, v1b fill + erase, v1c line, rectangle and select. Each
slice becomes a Track D item.

## Constraints that already bind

Stills only in v1 (D182-3); layer A first (D182-4); engine purity; a
pure last stage, never preview-only; exports re-run the pipeline; a
byte-identical round trip; one schema bump per round; AAA operability
for every tool; the engaged-preview contract (M14-EXT-27);
UI-STANDARDS' reach and focus rules; design state in `palette.design`
or a sibling block, never in a profile.

## Dependencies and references

ICE-RECOLOUR-01 layer A (the render palette); PICK-01 (the pick-up
tool is the eyedropper's editor half); CREATIVE-01 (shared homes).
Requirements §5.1, §10, §20; decisions D92, D135, D160/D165, D171/D179,
D178, D182, D188; `src/ui/viewport.ts`, `src/ui/preview.ts`,
`src/core/pipeline/`.

<!-- FILE: pm_skills/project/tickets/PRINT-01.md -->

# PRINT-01 — The print plan: size presets with floors, a planner that fits the paper

Scoped 2026-08-23 (the round's integrator chat, on the owner's brief).
Builds at the end of the current cycle; M16's sitting signs the
standard on paper first and is the evidence this builds to.

## Why

The PDF path renders the chart as a raster (12–40 px cells) and scales
it to fit the page, so the physical stitch is a consequence of page
fit, never a setting: a 200² design on one A4 page is 0.89 mm per
stitch, and because the furniture is sized in raster px against the
chart PNG's 10 px cell, row numbers print at ≈ 2.3 pt and minor lines
at 0.2 pt at every paging. The planner tiles at a fixed "stitches per
page", leaves slivers (200 at 60 = 60/60/60/20), and the key truncates
names. None of that is readable by construction.

## Owner decisions at scoping (2026-08-23)

- The preset sizes below stand as starting values (signed on paper at
  M16's sitting).
- **Every print size derives from one type scale**, so a later "+2 pt
  everything" is one edit and one proof run — a `PRINT_SCALE` table in
  core: per preset one base pt; key rows = base, row/column numbers =
  base − 2, footer = base − 3, title = base + 2, and the cell floor
  derived from the glyph height (symbol ≈ 0.7 × cell). Nothing else
  may hold a pt value.
- **No backward compatibility for print settings.** Old files still
  load (never refused; the round trip holds), but `export.pdf` is
  replaced by the print-plan model and old files reset to the new
  defaults with the D114 migrated note.
- Printing smaller stays available but user-directed; nothing below
  Compact is offered.

## The standard

| Preset | Text (key, footer) | Numbers | Cell floor | Who |
| --- | --- | --- | --- | --- |
| Readable (default) | 12 pt | ≥ 10 pt | ≥ 3.5 mm | most people, arm's length, no magnifier (the 12–14 pt clear-print guidance) |
| Large print | 16 pt | ≥ 13 pt | ≥ 5 mm | low vision, poor light |
| Compact | 9 pt | ≥ 8 pt | 2.5 mm (the M9 evidence's floor) | fewer pages, deliberately |

Furniture in the PDF becomes ratios of the cell with pt floors (lines
0.3 / 0.6 pt minimum — hairlines drop out on many printers).

## Controls (the Export section's PDF options, replaced)

Paper (A4 · Letter · A3 · Tabloid; default from locale) · Orientation
(auto · portrait · landscape; auto picks per design, uniform across the
document) · Print size (the preset) · Pages (a stepper over the cell
sizes that tile cleanly, reading "17 pages · 2.9 mm per stitch";
stepping below the preset's floor offers Compact in a sentence, never
silently) · Key (with the chart · separate · per page — PRINT-02) ·
Large format (one page at true size, e.g. 57 × 57 cm for 200² Readable,
for an A3 printer or a print shop). Advanced: margin (≥ 10 mm), overlap.
Removed: stitches per page. The section shows the alternatives the
planner computed ("17 portrait · 13 landscape · 6 on A3 · 1 sheet") with
the best preselected.

## Planner

Balanced tiles (equal fresh spans, no slivers); page count derived from
paper, orientation and cell; the 1024² case names its page count and
steers to large format or Compact rather than printing 300 pages.

## Typeface — measured 2026-08-23

The owner's pixel fonts in `_user-guff/demo images/fonts/`: Press Start
2P (OFL 1.1), Pixel Operator (CC0), a bitmap family with permissive
terms in its LICENSE file, and m5x7 (no licence file — confirm before
use). Read from the font files and compared with pdf-lib's Helvetica at
one nominal size, then normalised to equal digit height: the pixel
faces land within ±15 % of Helvetica regular's stroke weight, while
**Helvetica-Bold is heavier than all of them** (1.4 pt strokes at
10 pt — about five times the ~0.3 pt a cheap printer drops) and is
already in pdf-lib, dependency-free, Node-safe. The 2.3 pt numbers
were a size problem; no typeface fixes size.

Baseline for print, therefore: **Helvetica-Bold for row/column numbers
and tile labels at the preset sizes**, Helvetica for key prose. The
pixel faces stay as a design option for the places they are made for —
the chart PNG's 11 px numbering and the preview at small cells, where
a face hinted to the pixel grid reads crisply and looks right in a
pixel-grid app — and as a style choice, never as the print
accessibility lever. If chosen there: bake the digits to vector paths
at build time like the M9 glyphs (dev-only script, no runtime
dependency). An accessibility text face for the key (option C) needs
`@pdf-lib/fontkit`, a new runtime dependency; wish-listed pending proof
evidence.

## The other design decision

Raster tiles (today) versus a vector chart path — raster colour fill
with vector grid, numbers and symbols. Vector prints crisper and makes
PRINT-TEST-01 fully runnable under Node; the cost is file size at 1024²
(a rect per stitch). Hybrid is the likely answer.

## Model and schema

A print-plan block replaces `export.pdf`; schema bump — one per round:
ICE-RECOLOUR-01's layer A holds v11, so share it or take v12. Migration
resets and labels; `gridStyle.print`'s meaning changes from raster px
to ratios (doc delta for M11).

## Absorbed at the wish-list triage (2026-08-23, D197)

- **M12 key residue:** a per-colour skein column in the PDF key and
  the Colours-used rows; a cm/inches display preference; controls for
  routing, waste and skein length. The stitcher's review of the
  defaults is M16's sitting (D170).
- **Print from a phone, or share the PDF to one** — D188 reads phones
  as still-image users; revisit once the plan exists.
- **An embedded accessibility face for the key** (Atkinson’s face
  or IBM Plex Sans, both open-licensed) if PRINT-TEST-01's proof set
  shows 1/l/I or 6/9 confusion — needs `@pdf-lib/fontkit`, a runtime
  dependency decision.
- **SVG chart, CSV stitch data, a print-ready ZIP** (§19) — outputs the
  plan's model makes cheap; judged here, not as a milestone.
- **Vector furniture** (grid, numbers, symbols as PDF vectors) is the
  hybrid in "The other design decision"; the M10 residue's A3, true-size
  page and per-page key are already this ticket's and PRINT-02's.

## Risks

Page explosion at large grids; Helvetica is Latin-1 (`?` for non-Latin
titles); printer unprintable margins; a dependency if (C) is chosen.

## Done when

A 200² design prints at ≥ 3.5 mm per stitch with ≥ 10 pt numbers by
default; the Export section shows the alternatives and picks the best;
the plan model replaces `export.pdf` with old files loading under the
migrated note; save → load → save byte-identical; PRINT-TEST-01 green
at every preset.

<!-- FILE: pm_skills/project/tickets/PRINT-02.md -->

# PRINT-02 — Assembly and sequence: join, work page by page, a key per page

Scoped 2026-08-23 with PRINT-01; builds after it, end of cycle.

## Why

A tiled chart is used two ways, and the app serves neither well: taped
into one sheet (the planner gives overlap, trim lines, corner marks and
a footer range — but slivers, no tabs, no instructions), or stitched
page by page (nothing: no continuity cues, no per-page key). Most
stitchers do the second.

## What exists

`src/export/pages.ts` plans leading-edge overlap in row-major order;
`src/export/pdf.ts` draws a cover (title, overview map with the tiling
dashed on, the key once, capped at 40 % of the page) and one page per
tile at one shared scale with L-shaped alignment marks, dashed trim
lines where overlap repeats, and an 8 pt footer "page N of M (chart i,
row r, column c) — columns a–b · rows c–d".

## Scope

- **Join** mode: balanced tiles lettered like a map grid (B3), a glue-tab
  margin on trailing edges, registration marks, and an **assembly page**
  — a diagram of the layout, the tape order, which edge to trim.
- **Sequence** mode: the overlap rows and columns printed *shaded* so the
  join is checked twice, edge labels ("continues on page 7 →"), page
  order following the stitching direction from a chosen corner, and a
  **per-page key** listing only the colours on that page, at the preset's
  text size.
- **Key placement** for both: with the chart/cover, separate page(s), or
  per page; the hex leaves the rich rows so names survive (the M16
  pack's item 9); a "fit the key on N pages" stepper scales rows down to
  the Compact floor and no further. One honest line stays: colours on
  paper are display-only — the symbol and the thread id carry identity
  (D55).
- Cover text tells the user which mode the document is in and how to
  use it.

## Done when

Both modes print from the plan; the cover explains assembly; a
per-page key lists exactly the colours on the page; the pages tape
together by the marks in a tape-up rehearsal (the M10 test, D168); the
proof set covers both modes.

<!-- FILE: pm_skills/project/tickets/PRINT-TEST-01.md -->

# PRINT-TEST-01 — The proof set: one command prints every case with a checklist

Scoped 2026-08-23 with PRINT-01. Separate by the owner's instruction:
print testing should be push-button, and every later print change
re-runs it. The M16 sitting pack (`bench-reports/m16-sitting/`, built
by hand from the in-app browser) is the prototype; this makes it a
script.

## Shape

`npm run print:proof` renders, from a fixed design (the demo
`landscape-1.jpg` at 200², plus 100² and a 1024² stress case), every
chart style × print-size preset × paper (A4, Letter) × mode (single,
join, sequence, large format) into `bench-reports/print-proof/`
(machine-local, gitignored, like every report). Each sheet carries a
**proof strip**: proof id (`P-07`), what it is, the settings, the
expected mm per stitch, the build id, and a **50 mm scale bar** so a
ruler proves the print ran at 100 %. The same run writes
`CHECKLIST.md`: one line per sheet, cross-referenced by id, saying what
to look for — numbers readable at arm's length, symbols distinct (the
known pairs), trim lines aligning between named sheets, the key
matching the chart, the accessibility floors measured against the
standard — with tick boxes. Verdicts go to the decision log (the
pack's convention), never into the folder.

## Implementation notes

- Runs under Node if PRINT-01 takes the vector chart path (the real
  planner and PDF builders already run under Node — the pack's
  `geometry.mjs` proved it); otherwise it drives the browser harness the
  way `bench:auto` does (downloads intercepted).
- A dev-only Debug-menu route "Print proof set" is a one-line
  follow-up once the script exists; the script is the button first.
- New script → a `DEV-INFRASTRUCTURE.md` scripts-table delta; stays
  outside `check` (it writes artefacts and takes minutes).
- The matrix is data, so a preset or paper added later appears in the
  set without touching the script.

## Done when

The set renders from one command; every sheet identifies itself and
its expected measurements; the checklist covers every sheet and the
accessibility floors; a ruler on the scale bar proves 100 %; the M16
sitting can be repeated from it in one sitting.

<!-- FILE: pm_skills/project/tickets/SNAP-01.md -->

# SNAP-01 — snap any profile to one manufacturer's range

Raised by the owner 2026-08-24, at the manufacturer split: *"it would
be cool if we have a function that would map any of the colour profiles
to snap to the nearest colours for a given manufacturer."*

Iceboxed, not scheduled. The engine half already exists and is unused,
which makes this much cheaper than it looks — and much more valuable
than a convenience, because it is what finally removes brand privilege
from the gallery rather than just from the menu.

## Why it matters more than it sounds

Every curated built-in in the gallery is a list of **specific threads**,
and all but one are DMC. So Ukiyo-e woodblock, Art deco, Delft blue,
Fair Isle, Heraldic tinctures and the rest are, in practice, DMC
designs. A stitcher who prefers Anchor can select them, but the
shopping list they get is somebody else's brand.

Snapping fixes that at the root: any profile, rendered in the range you
actually buy. Two consequences worth naming:

- **The gallery stops being brand-shaped.** MENU-01 removed DMC's
  billing from the menu; this removes it from the profiles themselves.
- **The High-visibility safety exception could retire.** It is the one
  built-in that spans brands (D206), because DMC's nearest fluoro
  yellow-green is ΔE ≈ 36. With snapping, membership could be authored
  in whatever range carries the style honestly and *resolve* into the
  user's — which is a better answer than either single-brand or
  multi-brand authoring.

## What already exists

`src/core/thread-equivalents.ts` — **built, tested, and wired to
nothing** (only `tests/thread-equivalents.test.ts` imports it). It
answers exactly the question this feature asks:

- `nearestEquivalents()` — nearest in CIELAB over a target brand's own
  measured colours;
- a two-layer model, **curated over computed**, where curated means a
  manufacturer or owner-reviewed cross-reference;
- `describeEquivalent()` for labelling;
- every result carries which layer it came from.

So the work is not the matching. It is the profile-level application,
the UI, and the honesty.

## The honesty constraint, which is the hard part

The module's own doc states the rule, and it should govern this
feature:

> a computed match is a *suggestion*, and presenting it with the same
> authority as a manufacturer's own conversion chart would be a false
> claim about thread the user is about to buy.

**There is no curated data today** — `thread-map-proposed.csv` is a
header with no rows (owner data, DATA-01's territory). So every snap
would currently be computed, i.e. every result is a suggestion. The UI
cannot present a snapped palette as if it were the profile's own
colours; the shopping list is the thing people spend money on.

## Open questions for whoever scopes it

- **Where does it live?** Three quite different products: a control on
  the design ("show me this in Anchor"), a standing preference ("I buy
  Anchor — always resolve into it"), or an export-time option ("chart
  in DMC, shopping list in Anchor"). The preference reading is the one
  that would let the DMC/All-threads shortcuts disappear entirely.
- **Does it change the design or only the list?** Snapping alters the
  rendered colours, so it changes the picture — it is a pipeline
  concern, not a labelling one. Unless it is export-only, in which case
  the chart and the picture disagree, which the project would normally
  refuse.
- **Collisions are the real design problem.** Two distinct colours in a
  profile can snap to the *same* thread in a smaller range. Does the
  palette shrink (honest, but the colour count silently drops), does it
  take the second-nearest (keeps the count, worsens the match), or does
  it refuse and say so? The count-limit machinery and the
  "never-lying" conventions both bear on this. A range with 489 entries
  snapping into one with 200 will collide often.
- **How is a computed match labelled** in the Colours-used table, the
  chart key and the PDF export? KEY-01's provenance-honest labelling is
  the precedent — real threads keep manufacturer identity (D55).
- **Does it interact with Must-use pins and swaps?** A pinned thread
  that snaps to something else is a promise broken.

## Trigger

Wakes on any of: the owner scheduling it; curated cross-reference data
arriving (DATA-01 / `thread-map-proposed.csv` gaining rows, which would
make snapping authoritative rather than suggestive); or a user asking
for a design in a brand other than the one a profile was authored in.

## Done when

Not scoped. A scoping pass answers the questions above — chiefly the
collision rule and where it lives — and produces a build slice.

## Links

- `src/core/thread-equivalents.ts` and its test — the engine half.
- `src/core/palettes/thread-map-proposed.csv` — the empty curated
  layer; owner data, protected.
- D206 — the hi-vis multi-brand exception this could retire.
- MENU-01 / D207 — the manufacturer split, which removed brand
  privilege from the menu but not from the profiles.
- ICE-EXPLORER-01 — carries the curated cross-reference note.
- DATA-01 — owns the catalogue's shape, including cross-reference.

<!-- FILE: pm_skills/project/tickets/TWOCOLOUR-01.md -->

# TWOCOLOUR-01 — a two-colour mode whose two colours you choose

Raised by the owner 2026-08-24: *"users can select a 1-bit colour mode
and easily specify the two colours."* This file records what the app
does today, why that is not yet satisfactory, and the options — the
shape is the owner's call, not settled here.

## What is possible today

**It can be done, but only by construction, and nothing in the app
names it.** The route:

1. Colour section → open the profile editor → **New**.
2. "Find or add a colour": type a hex. A colour the catalogue cannot
   answer offers *"Add #xxxxxx as a custom colour"*, which stores it in
   the global My-colours library and pins it (`user:` id, D115).
3. Repeat for the second colour.
4. Name, save, select the profile.
5. Optionally set **Constrain number of colours** to 2 — though a
   two-entry profile is already two colours.

Seven steps through a general-purpose editor, and every one of them
has to be worked out rather than followed.

## Why it is not satisfactory

**1. There is no two-colour concept in the product.** `grep -riE
"1.bit|one.bit|two.colour|bi.level"` over `src/ui/` and `src/main.ts`
returns nothing. The capability exists; the idea does not.

**2. The name that does exist is a trap.** `1-bit RGB` is a shipped
colour map — and it is **eight** colours, because it is one bit *per
channel*. A user hunting for "1-bit" finds it, gets eight, and has
been actively misdirected rather than merely unserved. This is the
strongest argument that the gap is worth closing: the app currently
answers the question wrongly.

**3. `Black & white` is a dead end for customisation.** It is the
obvious starting point and it is exactly two colours — but its
membership is generated (`libraries: ['map:bw']`), so the two values
cannot be edited. Built-ins are read-only and Duplicate makes an
editable copy (D114), but the copy still points at the map: changing
the two colours means knowing to *uncheck the library and pin two
colours instead*. Nothing says so.

**4. The partner feature is already built and unlinked.** Tone mode
(TONE-01) plus two colours plus dither is classic 1-bit halftone —
arguably the single most recognisable thing this app could do. Nothing
leads a user from one to the other.

**5. Minor, and real:** the count number input is `min="1"`
(`ui/colour-section.ts`) while its own helper says *"The slider runs
from 2 to 512"*. One colour is reachable by typing and not by
dragging. Either one is a legitimate design (a single-colour
silhouette) and the helper is wrong, or it is not and the input should
floor at 2.

## Options for the shape — the owner picks

Not ranked; each is a different amount of product.

- **A. A built-in you duplicate.** Ship a `Two colours` built-in that
  is two *pinned* entries rather than a map, so Duplicate-to-edit
  lands the user on exactly the right recipe with two swatches to
  change. Cheapest — one entry in `builtInProfiles()`, no new UI, no
  schema change. Fixes (2) and (3), leaves the flow long.
- **B. A profile kind.** A fourth kind in the editor's kind map
  alongside colour/dither/adjust — "two colours", rendering just two
  swatch pickers. The takeover editor is already a kind map in
  `main.ts`, so a fourth kind costs one branch (D202). Fixes (1)–(3);
  more surface.
- **C. A Colour-section shortcut.** A control in the Colour section
  itself — "Two colours" with two pickers — that writes a profile
  behind the scenes. Most discoverable, most product, and the one that
  needs the hardest thinking about what it does to the profile model
  (a design linked to a profile it did not choose).

Independently of A/B/C: **rename or re-label `1-bit RGB`**, which is
the misdirection. It is a shipped map id (`rgb1`) so the id must
stand; only the display name is in play, and any rename is a
gallery-facing change and therefore owner-signed.

## Done when

A user can reach a two-colour design with two colours of their
choosing without having to work out that a profile is the mechanism,
and `1-bit RGB` no longer answers the question wrongly. Evidence: the
flow walked end to end in the real app, plus a rendered example at two
colours with dither on.

## Links

- Current mechanics: `src/ui/profile-editor-colour.ts` (the custom-hex
  offer), `src/ui/colour-section.ts` (the count control),
  `src/core/color-sources.ts` (`bw`, `rgb1` maps),
  `src/core/color-profile.ts` (`builtInProfiles`).
- Tone mode: TONE-01 / CREATIVE-01, for the halftone pairing.
- ICE-PROFILES-02 records three generated maps (Greys, 1-bit RGB,
  2-bit RGB) that are selectable as libraries but have no built-in
  profile — option A is the same shape of fix.

<!-- FILE: pm_skills/project/trajectory.md -->

# Trajectory

<!-- Shipped-work narrative. The story of what changed over time, in chunks. -->
<!-- Warm tier. Agents do NOT auto-read this every task. Read it on demand:
     during memory-maintenance.md (Refactor), release.md, or when
     reconstructing what already shipped. See AGENTS.md → "Before every task". -->
<!-- Compress on ship. One line per item: the outcome, not the implementation.
     The WHY lives in decision-log.md; the per-file roles live in file-map.md.
     Never paste a decision-log entry in here. A pointer is enough. -->
<!-- Keep every shipped ID individually greppable: start each line with the
     item ID. When one line covers a group of related sub-items, spell out
     each ID (e.g. WL-19a, WL-19b, ... WL-19h) rather than a range, so an
     ID-level reconcile can find them all. -->
<!-- Structure: newest phase/milestone at the top. Group items by the phase or
     milestone they belong to, with a one-line Outcome per phase. -->
<!-- Budget: see pm_skills/memory-policy.md. Over budget → memory-maintenance.md
     (Prune) moves the oldest phases to archive/trajectory/trajectory-NNNN-<range>.md
     and adds a row to archive/INDEX.md. Archives are append-only; never rewrite. -->

## Track E — Hardening (IN PROGRESS)

**Outcome:** opened 2026-08-27 (D208) from the 2026-08-26 external
review; the quick eight cleared first, leaving the state spine and the
public-surface group.

- BATCH-E0 (2026-08-27) — the hardening quick eight, gate green: the
  deploy workflow's supply chain fully pinned (SHAs, runner, Node,
  Rust, and a checksum-verified wasm-pack replacing `curl | sh`); the
  UI baseline fails closed with regeneration moved to
  `npm run baseline:write`; the secret scan reaches zero warnings with
  its patterns untouched; six dev advisories cleared non-breaking and
  an advisory cadence stated; the WASM handle freed in a `finally`;
  the palette page's last third-party request gone; same-file
  re-selection fixed and the editor's async selection guarded; the
  demo README's provenance corrected — see decision-log D209.
- BATCH-E0 CI follow-ups (2026-08-27) — three green-locally / red-on-CI
  pushes fixed and recorded as a class: encoded bytes are not portable
  across zlib builds, the file map can name a file that exists only on
  one machine, and the note describing that trap tripped the same
  checker. CI green and deployed at `a8b9caf` — see decision-log D210.

- STATE-01/02 (2026-08-27) — the state convention signed on read
  evidence (D212), with the slice order swapped: capture release first,
  because three of the five findings are reachable by a user today.
  Slice 1 landed (D213) — one transition path inside the function all
  four source routes already call, cleanup-on-failure and a bound
  around acquisition, and the grab surface released once its rescue is
  taken. The live capture pass is the human remainder.
- STATE-03 (2026-08-27) — snapshots taken at submit, not at post; the
  three export routes capture their render options before awaiting.
  Shallow suffices because main.ts replaces config fields rather than
  editing them, and that discipline is now asserted against the source
  instead of trusted — see decision-log D214.
- STATE-04 (2026-08-27) — the worker settles: `onerror` and
  `onmessageerror` reject every pending export, release the frame gate
  and terminate. Recovery is impossible in-page (the preview canvas
  transfer is one-way), so the app says so and names the reload —
  see decision-log D215.

## Track D — Creative control of the image (IN PROGRESS)

**Outcome:** opened 2026-08-23 (D188/D189); the gate was made safe for
the worktree round its scoping tickets open before any of them ran.

- ADJUST-02 (2026-08-27) — slice 2b: the six-band H/S/L mixer and the
  saturation range, both collapsed, at schema v14. Band centres derived
  from the project's own converter (CIELAB spaces the classic six from
  22° to 110° apart, not 60°); every band effect fades out on
  near-greys through one shared hue-confidence curve; the remap flavour
  settled nominal-with-roll-off on the owner's call. The slice-2a path
  is byte-identical and tested as such — see decision-log D211.
- CREATIVE-01 (2026-08-23) — the creative programme signed on two
  prototypes' evidence (branch `creative-01-proto`, pushed): five
  slices — tone mode (v12), adjustments 2a/2b (v13), the eyedropper,
  the contact sheet, the match-error compare — with the weighted
  dither space confirmed by measurement and the nine adjustment
  candidates judged on before/afters. The slices are Track D items
  TONE-01, ADJUST-01/02, PICK-01, SHEET-01, COMPARE-ERR-01; PAINT-01
  scopes separately. See D200.
- ADJUST-01 (2026-08-24) — image adjustments as the third profile
  kind at schema v13: the adjust stage wakes as one three-point
  lightness curve (its ends are the black and white points) plus
  saturation, in Lab, ahead of the resize; nine signed built-ins with
  editable copies in the Processing section; the selection source and
  the compare half are the adjusted picture while the LUT fingerprint
  stays untouched. The hot loop is tabled on a recorded profile
  (189 → 70 ms/MP) at a documented 1-level tolerance. Signed and
  keyboard-passed the same day. See D202, D203.
- MENU-01 (2026-08-24) — the colour-profile selects group with
  `<optgroup>`; shipped inside D205's menu split, seven groups after
  the manufacturer round. Needs no further work (D206). See
  D205–D207. (Line back-filled at the D208 refactor — the eviction
  was missed at ship.)
- ICE-RECOLOUR-01 (2026-08-23) — the colour swap, layer A: a pure
  `swap` stage after the colour stage remaps the sidecar through a
  render palette (selected entries + render-only targets); a design
  rule at schema v11; Swap… on the Colours-used row with a picker over
  the whole universe, "swapped from X" on the target's row, a Swaps
  chip list that keeps and explains a dangling swap; stats read
  against the frame's own config. Closes MUST-01's presence half. See
  D199.
- INFRA-02 (2026-08-23) — four gate riders: the bench harness popup
  follows `BASE_URL`, `check:docs` passes on its own in a fresh tree
  (the wasm pkg is generated output), `eslint` ignores
  `bench-reports/`, and `verify:deploy --fetch` refreshes `origin`
  first; the full gate proved green in a fresh worktree. See D198.

## Small UI batch (SHIPPED 2026-08-23)

**Outcome:** the five Icebox promotions of D188 plus three UI defects
the wish-list triage surfaced, run gateless in one sitting in the
owner's order (D189) — eight items, D191–D196.

- ICE-SYMBOL-UI-01 (2026-08-23) — the Colours-used table is the live
  symbol key: a Symbol column with a picker over the unused glyphs,
  live grants for palettes that fit the 64-glyph set, overrides
  persisting through the existing `symbols` block. See D191.
- ICE-LIMIT-01 (2026-08-23) — the colour-limit slider is a log scale
  from 2 to 512 with 16 at its midpoint (two log halves, 300
  positions, `aria-valuetext` in colours); the number input stays the
  exact handle. See D192.
- ICE-WIDTH-01 (2026-08-23) — the shell judged at 400 and 320 px:
  three page-overflow causes fixed (content-box inputs, the table's
  visually-hidden text escaping its scroll box, the fieldset
  min-content default) and the browse-row buttons kept on one line.
  See D193.
- ICE-WIDTH-02 (2026-08-23) — the width guide announces only under
  the diagnostics rule (dev builds, `?diag=1` in production); the
  public header is two lines shorter. See D193.
- DATA-05 (2026-08-23) — three strings: the mapped-colour tooltip
  names its source instead of "not measured", the Design title's
  helper says it names the saved file, and the chart-size readout
  counts the label gutter (2037, not 2000). See D194.
- FIT-01 (2026-08-23) — the preview's zoom bounds are CSS px per
  stitch at any density: a collapsed preview fits at the schema floor
  and a zoom reaches the ceiling on a 2× display. See D195.
- GRID-DPR-01 (2026-08-23) — a device-pixel-ratio change re-sends the
  grid style and re-derives the preview surface. See D195.
- CAPTURE-END-01 (2026-08-23) — a share ended from outside the app is
  named above the preview in a dismissible inline notification, beside
  the status line. See D196.

## Track B — Durability & identity (SHIPPED 2026-08-23)

**Outcome:** the app no longer loses your work and can tell two designs
apart — saved projects are `.pmproj` packages with the picture inside, a
design history restores the latest design on reopen, and files carry
the design's title.

- DUR-01 (2026-08-23) — work survives closing the tab: `.pmproj`
  project packages (schema v10, the picture embedded verbatim, legacy
  `.json` still loads), a design history in its own IndexedDB database
  that restores the latest design on boot with a Recent designs picker,
  bounded storage with oldest-first eviction and a persist opt-in, and
  a live capture that freezes to a still at save time. See D179.
- SAVE-01 (2026-08-23) — a saved project has a name of its own: the
  Design title names the file, the picture's name stands in, a
  timestamp is the last resort. See D179.

## Live-app feedback (IN PROGRESS, from 2026-08-22)

**Outcome:** the first reports from the public URL are becoming fixes
with the mechanism confirmed in the running app before anything is
proposed — and the owner's saved project file is the evidence that
names it.

- MUST-01 (2026-08-23) — a Must-use picked outside the profile pins
  into the design's recipe copy: the seat is honoured, "(edited)" tells
  the truth, removing the chip undoes the pin, Revert drops it; drifted
  seats stay kept and explained; My-inventory designs render from their
  pins with the inventory warning. See D178.
- DIAG-02 (2026-08-23) — Report a problem: one click saves the settings
  document and the redacted log, then opens a prefilled compose window
  that says to attach both; the project text is a host callback, so
  D179's format change cost one wiring line. `DEV_EMAIL` stays empty
  until the owner's alias lands. See D183, D187.
- ICE-RECOLOUR-01 (2026-08-23) — sign-off: the five questions answered,
  layer A (the colour swap) scoped and its option picked — a design
  rule, a pure stage over the sidecar with a render palette; builds as
  schema v11 in a later round. See D182.
- MYTHREADS-01 (2026-08-23) — the empty-inventory dead end gets an
  exit: "My inventory" (renamed from "My threads", id unchanged) is a
  disabled option with its reason while the inventory is empty, and a
  design already linked to it shows a banner beside the preview with
  Use DMC / Add threads. Verified on the reporter's second file. See
  D176.
- COUNT-01 (2026-08-23) — a profile that resolves to nothing no longer
  masquerades as a render: the Stats line says "no palette applied"
  instead of "· limit N", the estimate refuses to price RGB, the Colour
  section states the consequence beside the cause, an empty inventory
  under My threads is named as such, and the profile-world count
  sentence is grammatical. Reproduced from the owner's project before
  and after. DIAG-02's `?diag=1` opt-in and palette logging shipped
  alongside; MUST-01's wording half too. See D174 (mechanism) and D175
  (fix).

## Track C — Publication (IN PROGRESS, owner-paced)

**Outcome:** the app has a public URL. Licences and notices landed
(D161) and are readable in the app (D177), publication proceeds in
this repository (D164), and the deploy pipeline ships the built bundle
from a green gate and then proves the live site serves it (D180).

- PUB-06 (2026-08-23) — `PM_PUBLIC_BUNDLE=1` drops `bench.html` /
  `bench-source.html` from the public Pages build; every other build
  keeps the harness. See D181.
- PUB-05 (2026-08-23) — `npm run verify:deploy` compares the live build
  id's SHA with the pushed commit (`--wait` polls through the ~4-min
  deploy), and CI runs it after the deploy job. See D180.
- PUB-01 (2026-08-23) — the notices are reachable from the app: a ghost
  "Licences" button in the header's utility row opens a Close-only
  dialog carrying `LICENSE` and `THIRD-PARTY-NOTICES.md`, imported at
  build time so the bundle carries the documents and nothing is
  fetched. Human remainder: native activation, in-dialog scrolling, a
  VoiceOver pass. See D177.
- PUB-04 (2026-08-22) — GitHub Pages serves the built app, not the
  raw branch: a green `check` on `main` rebuilds with
  `--base /pattern-mapper/`, uploads `dist` and deploys it, Rust engine
  included; the one root-baked runtime path (the profile-demo loader)
  now follows the base, pinned by a regression test. See D172.

## Track A — The printable pattern (IN PROGRESS)

**Outcome:** the chart became a printable pattern. Four milestones
shipped in one day — symbols and B/W charting, grid styling presets,
multi-page pagination, and fabric/thread estimates — carrying the
project file from schema v5 to v9. The brief's second success
criterion (a stitchable chart printed from a captured design) is
mechanically met; what remains of the track is M16's owner sitting.

- M16 (2026-08-23) — sitting pack prepared, no product change: the
  defaults table, the M9 inspection checklist, the M12 wording list, a
  sign-off form with 14 proposed defaults, 13 export artefacts and
  regenerated symbol evidence under `bench-reports/m16-sitting/`
  (machine-local); the sitting decides.
- M9 (2026-08-12) — symbols and black-and-white charting close on the
  owner's signature: 64 app-owned vector glyphs in four signed
  batches, identity-keyed assignment persisted as state (schema v6),
  three chart modes across both chart artefacts, a symbol/name/count
  key, and refusal rather than silent repetition past the set. The
  override UI deferred to ICE-SYMBOL-UI-01; the print inspection
  folded into M16. See D165 (build) and D170 (signature, close).
- M12 (2026-08-12) — fabric sizing and thread estimates ship
  disclosed: a pure estimator (front geometry, named routing and
  waste factors, strands-of-six conversion, per-colour skein
  round-up — colours cannot share a skein), Stats rows for fabric
  size, cut size, centre, and total thread beside a Fabric fieldset,
  and the assumptions sentence rendered wherever a result shows.
  Schema v9 persists the whole model. Verified against hand
  calculation live. See D169.
- M10 (2026-08-12) — the chart PDF paginates: a pure, exhaustively
  tested page planner (half-open bounds, leading-edge overlap,
  row-major), tiles rendered through the one chart encoder with
  **global** grid classification and numbering, a cover page with the
  tiling drawn over a colour overview map plus the key, one shared
  scale so a taped assembly is ruler-true, alignment marks, dashed
  trim lines, and range-naming footers. Schema v8 adds `single`/`grid`
  paging to `export.pdf` (single stays the default). Verified live:
  200×200 at 60/page → 17 pages. See D168.
- M11 (2026-08-12) — grid, ruler & tick styling ships preset-led: six
  built-ins over paired screen + print style blocks (schema v7,
  appearance-preserving migration), per-class colour, opacity, dashed
  minors, an outer border, and the label gutter sized from the
  numbering font — closing the A17 `FIT_MARGIN` clip in preview and
  the chart's own 4-digit variant. Custom is a computed state; the
  file stores canonical values with the preset id as provenance only.
  Verified live including an in-app save→load round trip. See D167.

## Archived: Batch C0 (2026-08-11) — see archive/trajectory/trajectory-0006-2026-08-11.md

## Archived: M15 (2026-08-07 → 2026-08-09) — see archive/trajectory/trajectory-0005-2026-08-07-to-2026-08-09.md

## Archived: M13 remainder + M14 (2026-08-04 → 2026-08-09) — see archive/trajectory/trajectory-0004-2026-08-04-to-2026-08-09.md

## Archived: M13 phases 1–2 (2026-07-22 → 2026-07-23) — see archive/trajectory/trajectory-0003-2026-07-22-to-2026-07-23.md

## Archived: M6–M8 (2026-07-21 → 2026-07-22) — see archive/trajectory/trajectory-0002-2026-07-21-to-2026-07-22.md

## Archived: M0–M5 (2026-07-17 → 2026-07-20) — see archive/trajectory/trajectory-0001-2026-07-17-to-2026-07-20.md

<!-- FILE: pm_skills/project/wish-list.md -->

# Wish-list

<!-- Capture inbox for unscoped ideas. Append one line; no structure required. -->
<!-- Cold tier. Agents NEVER auto-read this file. Read it only during an
     explicit triage pass — the next-batch pick (session-start.md Start B),
     or end-of-task.md / memory-maintenance.md when the size check flags
     it. See AGENTS.md → "Before every task". -->
<!-- Boundary: this is PRE-triage — raw, unjudged ideas. The backlog Icebox
     is POST-triage — ideas already judged worth keeping. Promote items INTO
     backlog.md (Current, Next, or Icebox); never treat this as a second backlog. -->
<!-- Triage = promote or cut. Promoting MOVES the item into backlog.md. Cutting
     DELETES the line. No history is kept here — survivors live in the backlog. -->
<!-- Format: one plain bullet per idea, optionally a source. Append at the
     bottom; triage from the top. Example:
     - Idea in one line — (from: 2026-05-30 task) -->
<!-- Soft cap ~25 open items. Over budget → end-of-task flags it and
     memory-maintenance.md (Prune) runs a forced triage pass (not an
     archive). See pm_skills/memory-policy.md. -->

Raw parked ideas. Triage into backlog.md or cut. Section numbers
refer to `docs/requirements.md`.

<!-- Triaged 2026-08-23 (D197): every line promoted or cut — the spec
     §25 parking lot goes back to being docs/requirements.md §25's
     alone. Append new ideas below this comment. -->
- Tone-aware candidate pruning: tone mode skips the Lab candidate table (full scan per pixel under dither); extend the exclusion proof to the scaled/curved space if a large-palette tone design ever feels slow.
- Ramp track click-to-move: tapping the ramp between handles could move the nearest cut there; today only the handles drag.
- Adjustments under a large capture region: the adjust stage is source-resolution work at ~86 ms/MP in the worker, ~5× the resize, so an adjusted 4 MP surface misses ≥ 4 updates/s while a w1280 one holds ~7–8; if it is felt, the answers are draft-quality participation or CAPTURE-OMT-01's off-main-thread grab, not a second pass at the maths (from: ADJUST-01, D202).
- Index-guard cost in the hot loops: dropping the `?? 0` reads in the adjust loop measured ~12 % under `noUncheckedIndexedAccess`; if the engine ever needs it, decide the idiom once across dither/tone/adjust rather than one loop at a time (from: ADJUST-01, D202).
- Keep the CI pins from rotting: CI-01 pinned five actions to commit SHAs, which is safe but static — a scheduled Dependabot `github-actions` config (or a monthly job) would open the bump PR instead of relying on someone remembering the DEV-INFRASTRUCTURE procedure. Cheap; the risk it removes is a security patch we never notice (from: BATCH-E0, D209).
- The file-map generator maps untracked files, and `scripts/check-docs.mjs` then fails in every clean checkout: `pm_skills/scaffold/gen-file-map.mjs` discovers `git ls-files --others --exclude-standard`, so a local-only Codex hooks file got a mapped line and reddened CI twice while the local gate stayed green — once from the map, once from the wish-list note describing it, because the PATHS check reads any backticked path-shaped code span. Including uncommitted files is deliberate (map a file before committing it), but nothing warns that mapping one you never intend to commit is a gate trap. Options: have the generator mark untracked entries, or have the checker name the cause. Framework-class change (from: BATCH-E0 CI, D209).
- Pinned actions are aging out of their runtime: `actions/checkout`, `setup-node` and `cache` at v4 target Node 20, which the runner now force-upgrades to Node 24 with a deprecation annotation on every run. Predates CI-01 (v4 resolved to these SHAs already); v7/v7/v6 are current. A major bump is a behaviour change, so it wants its own commit per the DEV-INFRASTRUCTURE procedure (from: BATCH-E0 CI, D209).

