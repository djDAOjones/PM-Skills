<!-- field-report: project=pattern-mapper · date=2026-07-17 · type=export
     · pm-skills=canon 4.0.0 (installed as 3.17.1 on 2026-07-17 and upgraded to 4.0.0 the same day; never upgraded since; baseline taken before the pm-next v2 intake maps its history)
     · source=the maintainer's prompts from the earliest logged session (local lane), plus the memory files as committed at the install commit 3d5baa5f67bbac9be08cedaca2a8d3d72e133208
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained where present; the agent memory, the project transcripts and every session log stay in the local lane -->

# Install-time prompts and the memory as first committed

Install commit: `3d5baa5f67bbac9be08cedaca2a8d3d72e133208`.

## The maintainer's prompts at initialisation, verbatim

The earliest logged Claude Code session on this project, then named Cross Stitch Lens, from the session logs archived in the local lane. Timestamps are UTC.

## Claude Code session `40f8a4f5` — opened 2026-07-19T20:38:23.096Z, model claude-opus-4-8, 2 maintainer prompt(s)

### 2026-07-19T20:38:23.184Z

> autojazz M5A on the @pm_skills/project/backlog.md

### 2026-07-19T21:01:59.389Z

> commit them as one M5 chunk and push to github


## Files at the install commit

<!-- FILE: pm_skills/project/brief.md @ 3d5baa5 -->

# Brief — Cross Stitch Lens

<!-- Hot whole-file read. See pm_skills/memory-policy.md for limits. -->

## What we're building

A macOS-first web application that converts visual artwork into
cross-stitch designs in real time. The user edits artwork in another
application (typically Photoshop); Cross Stitch Lens continuously
captures a selected screen region and renders a live cross-stitch
interpretation.

Two core reductions define the product:

- **Spatial reduction** — source image → fixed stitch grid
  (e.g. 200 × 200 stitches, max 1024 × 1024).
- **Colour reduction** — source colours → a selected thread palette,
  with dithering as a first-class creative tool.

Full requirements: `docs/requirements.md` (cite section numbers,
do not duplicate content into memory files).

## Who it's for

Primary user: the project owner (personal creative use on macOS).
Wider distribution planned later — architectural choices must not
foreclose it (hence web platform, offline-capable, Tauri as a future
packaging path).

## MVP scope (build this, nothing more)

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
preview mode.

## Explicitly out of scope for MVP

Multiple dithering algorithms beyond Floyd–Steinberg, user-defined
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

<!-- FILE: pm_skills/project/backlog.md @ 3d5baa5 -->

# Backlog

<!-- Generated during project initialization. Edit freely. -->
<!-- OPEN WORK ONLY. Status: [ ] todo  [~] in progress  [-] cut. -->
<!-- Shipped work does NOT stay here. On ship: add one line to
     trajectory.md (the outcome) + an entry to decision-log.md (the why),
     then remove the item from this file. There is no Completed section. -->
<!-- Hot sectional. Agents read the Active section only by default. -->
<!-- See pm_skills/memory-policy.md for limits; run memory-maintenance.md
     (Refactor) when the queue drifts into dated rounds. -->

Milestones ship in order. A milestone is done when its acceptance
line passes and `check` is green. Requirements references are to
`docs/requirements.md`.

## Active

### M0 — Scaffold & quality gate (current milestone)

- [ ] Vite + TS strict + ESLint (incl. core-isolation rule) + Vitest
- [ ] `check` script: typecheck + lint + test + build
- [ ] CI workflow running `check`
- [ ] Core types: `PixelBuffer`, `Palette`, `Stage`, `ProjectFile` (v1 schema stub)
- [ ] Golden-test harness (fixture load/compare with per-test tolerance)

*Acceptance: `npm run check` green on a hello-world pipeline test.*

### M1 — Engine core (TS reference, §4–§8)

- [ ] Image import (file picker, drag-drop, clipboard paste)
- [ ] Resize stage: fit/contain/cover/stretch to grid, 1×1–1024×1024
- [ ] Colour: sRGB↔linear↔Lab conversions + Euclidean-RGB and CIELAB metrics (golden-tested against published reference values)
- [ ] Palette model + one preset palette imported from owner's hex spreadsheet (placeholder DMC-subset until supplied)
- [ ] LUT builder (15-bit RGB → palette index) in worker
- [ ] Reduce stage (LUT path + exact path used by dither)
- [ ] Floyd–Steinberg dither stage (serpentine option), seedable
- [ ] Pipeline executor in Worker with configurable stage order; two order presets: adjust→resize→reduce+dither vs adjust→reduce+dither→resize (§7 comparison)
- [ ] Stats: colour count, stitch counts, per-colour counts, % usage (§11 subset)

*Acceptance: import PNG → 200×200, 16-colour dithered output renders
correctly; golden tests for every stage; save→load→save byte-identical.*

### M2 — Preview & info UI (§10 subset)

- [ ] OffscreenCanvas preview in worker; zoom, pan, fit-to-window
- [ ] Grid overlay: show/hide, minor/major interval, line colour/thickness (§15 subset)
- [ ] Basic tick marks + row/column numbering, origin at 1 (§16 subset)
- [ ] Source vs output split compare
- [ ] Info panel bound to stats (live update)
- [ ] Carbon-based control panels for grid, palette/colour mode, dither on/off, pipeline order preset

*Acceptance: 60 fps pan/zoom at 1024×1024; controls update preview
< 150 ms end-to-end at 200×200.*

### M3 — Exports (§12–§14, §18–§19 subsets)

- [ ] Clean PNG at 1 px/stitch; transparent or solid background
- [ ] Enlarged PNG, integer nearest-neighbour scale
- [ ] Styled PNG chart: stitch cells + grid + major lines + numbering
- [ ] Single-page PDF chart (pdf-lib): A4/Letter, portrait/landscape, margins, design title, palette key (colour swatches + hex; symbols are post-MVP)
- [ ] Project save/load as JSON v1 (§20), schema documented

*Acceptance: printed A4 PDF of a 100×100 design is legible and
stitchable; clean PNG pixel-equal to engine output buffer.*

### M4 — Live capture (§3, §22)

- [ ] `getDisplayMedia` screen/window session with permission UX
- [ ] User-drawn crop rectangle over live thumbnail; move/resize/lock
- [ ] Frame pump: `requestVideoFrameCallback`, latest-wins coalescing
- [ ] Dirty-frame skip via 64×64 downsample hash
- [ ] Pause/resume, manual refresh, draft-quality mode under load

*Acceptance: editing in Photoshop at 200×200 grid sustains ≥ 4
preview updates/sec with < 250 ms latency; idle frames cost ~0 CPU.*

### M5 — WASM + WebGPU backends (§22, §23.5)

- [ ] Profiling harness: per-stage timings surfaced in a debug panel
- [ ] Rust crate: Floyd–Steinberg (SIMD), wasm-pack build wired into Vite + `check`
- [ ] WASM backend registered for dither stage; golden tests bit-exact vs TS
- [ ] WebGPU compute: LUT build + palette mapping (WGSL); tolerance-tested
- [ ] Automatic backend selection (feature-detect + profile); TS fallback verified by disabling both in tests
- [ ] Benchmark test asserting architecture.md budgets at 1024×1024

*Acceptance: full pipeline ≤ 100 ms at 1024×1024/64 colours on the
dev Mac; all backends pass the same golden suite.*

### Icebox

<!-- Deferred but worth keeping (post-triage). Needs a decision to
     reactivate. Promote into a milestone when committed. -->

**Parked next (post-MVP, triage from wish-list):** more dithering
algorithms, user-defined palettes, symbols + B/W charts, multi-page
PDF, advanced grid/tick styling presets, thread estimates, Tauri
packaging.

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
     put it in pm_skills/project/tickets/<ID>.md and add the [detail] flag
     to the item. Cold tier — agents read it ONLY when that item is the
     active task, so Active stays terse. Working context only; the "why"
     still goes to decision-log.md on ship. The file is deleted when the
     item ships or is cut — it does not outlive the item. -->

