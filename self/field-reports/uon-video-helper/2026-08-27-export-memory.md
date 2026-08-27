<!-- field-report: project=uon-video-helper · date=2026-08-27 · type=export
     · pm-skills=4.9.2
     · source=harvested from the maintainer's checkout by Claude Code -->

# Project memory export — uon-video-helper

Verbatim copy of `pm_skills/project/**` as it stood on disk.
Source repository: https://github.com/djDAOjones/UoN-Video-Helper
(public — every file below is already published there).

Snapshot caveat. Both projects were under active development while
this was taken — sessions were open and commits were landing during
the harvest itself. This is a point-in-time copy, not a quiescent
one. Content is read from the working tree, so anything in flight is
captured as the maintainer actually had it, which is why the state
line below reports paths differing from HEAD rather than asserting a
clean tree.

State at harvest: HEAD `a3c070a`, 108 commits, 6 path(s)
differing from HEAD.

Paths differing from HEAD at harvest:

```text
M  pm_skills/project/archive/INDEX.md
A  pm_skills/project/archive/decision-log-0002-2026-08-25-to-2026-08-27.md
A  pm_skills/project/archive/trajectory/trajectory-0003-review-remediation-and-band-1-close.md
M  pm_skills/project/decision-log.md
M  pm_skills/project/file-map.md
M  pm_skills/project/trajectory.md
```

Redaction. Absolute checkout paths have been collapsed to
`<checkout>`, and any other path under the maintainer's home
directory to `<home>`; that is the only alteration, and the content
is otherwise byte-verbatim. A scan of this set found no e-mail
addresses, credentials, or account identifiers.

No third-party personal names appear in this set.

Files are separated by `<!-- FILE: <repo-relative path> -->`
markers; content between markers is byte-verbatim after the
path redaction described above.

## Inventory at harvest

| File | Bytes |
| --- | ---: |
| `pm_skills/project/architecture.md` | 15039 |
| `pm_skills/project/archive/INDEX.md` | 1948 |
| `pm_skills/project/archive/decision-log-0001-2026-08-25.md` | 24011 |
| `pm_skills/project/archive/decision-log-0002-2026-08-25-to-2026-08-27.md` | 50539 |
| `pm_skills/project/archive/trajectory/trajectory-0001-band-0-mvp.md` | 4844 |
| `pm_skills/project/archive/trajectory/trajectory-0002-real-material-and-band-1.md` | 12073 |
| `pm_skills/project/archive/trajectory/trajectory-0003-review-remediation-and-band-1-close.md` | 11492 |
| `pm_skills/project/backlog.md` | 15469 |
| `pm_skills/project/brief.md` | 6878 |
| `pm_skills/project/conventions.md` | 5290 |
| `pm_skills/project/decision-log.md` | 33766 |
| `pm_skills/project/doc-deltas.md` | 4295 |
| `pm_skills/project/file-map.md` | 20497 |
| `pm_skills/project/tickets/VH-26.md` | 3138 |
| `pm_skills/project/tickets/VH-30.md` | 2519 |
| `pm_skills/project/trajectory.md` | 8396 |
| `pm_skills/project/wish-list.md` | 9201 |

## Files

<!-- FILE: pm_skills/project/architecture.md -->

# Architecture

<!-- Hot whole-file read. See pm_skills/memory-policy.md for limits. -->
<!-- Describe current structure only. Move historical batch notes to decision-log.md. -->

Rationale for the settled choices below lives in
[`docs/02-technical-rationale.md`](../../docs/02-technical-rationale.md).
Do not re-open WebCodecs, Mediabunny, OPFS, the loudness targets, or the
resolution-preserving compression without new evidence.

## Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| Language | **TypeScript** (strict) | Mediabunny ships full types; the DSP carries numeric invariants that types catch cheaply; the `check` gate gets a real type check for free. |
| Build / dev server | **Vite** | First-class Web Worker bundling (`new Worker(new URL(...), { type: 'module' })`), static output, no config for what we need. |
| Tests | **Vitest** | Same toolchain as Vite. The EBU Tech 3341 harness is pure maths on `Float32Array` and runs in Node with no browser. |
| Video/audio codec | **WebCodecs** (`VideoDecoder`/`VideoEncoder`/`AudioDecoder`/`AudioEncoder`) | Browser built-in. Streams frame-by-frame, reaches hardware encoders, no GPL/patent exposure, no COOP/COEP headers. |
| Container demux/mux | **Mediabunny** 1.55.x, MPL-2.0 | The only runtime dependency. WebCodecs handles codecs but not containers. Zero runtime deps of its own (`@types/*` only). |
| Loudness DSP | **Bespoke TypeScript** in a Web Worker | No filter graph exists in a WebCodecs architecture, and a wasm audio build would reintroduce the licensing question for no gain. |
| Working storage | **OPFS**, written through Mediabunny's `StreamTarget` | `StreamTarget` takes a `WritableStream<{type,data,position}>` — positioned, seekable writes with backpressure that propagates back and throttles the encoders. An OPFS file handle's `createWritable()` produces exactly that shape, so no bespoke target is needed. |
| Save to disk | **File System Access API**, blob download fallback | Lets a multi-GB result stream straight to the user's chosen location. |
| UI | **Vanilla TS + our own components** | Carbon productive design language implemented in project code — never the Carbon packages. See `UI-STANDARDS.md`. |

No framework, no CSS library, no polyfills. If the browser cannot do it
natively, the browser is not supported (spec §10) and says so plainly.

## The shape of a job

The single most important structural fact: **the whole job runs in one
Web Worker.** The main thread renders UI and nothing else. A one-hour
encode that stutters the UI is indistinguishable from a hung tab, and
spec §7.5 requires the page stay responsive throughout.

The second most important: **audio is inherently two-pass, video is
one-pass.** The single linear gain in spec §5.2 step 5 cannot be known
until integrated loudness over the *whole* file has been measured. So:

```
Pass 1  decode audio only ──▶ K-weighting ──▶ integrated / short-term / LRA / true peak
        (fast — audio-only decode of an hour takes seconds)
                                        │
                                        ▼
                            measurements + warnings + the gain figure
                                        │
Pass 2  decode video ─▶ conform (CFR, scale) ─▶ VideoEncoder ─┐
        decode audio ─▶ chain (§5.2 steps 2–6) ─▶ AudioEncoder┤─▶ Mediabunny Output ─▶ OPFS
        branding ────▶ re-encode to match, audio bed UNPROCESSED ┘
```

The third: **loudness is measured on source content only, never on the
concatenated timeline** (spec §4.4). The branding audio bed is mastered at
target and bypasses the chain entirely. Architecturally the audio path has
two lanes that meet only at the muxer.

## Project structure

```
src/
  main.ts                  entry — the whole UI, worker client, job lifecycle
  config/                  ALL tuneable values. No magic numbers elsewhere.
    presets.ts             the two output presets, output shape, AVC level (§6.1, §6.2)
    audio.ts               loudness targets + every chain constant (§5.1, §5.2)
    branding.ts            durations (D2), variant table, closing defaults (§4.2)
    thresholds.ts          pre-flight bands (§7.3), probe length, worker limits
  core/
    logger.ts              structured logger + bounded ring buffer
    diagnostics.ts         global error/unhandledrejection capture, redacted bundle
    redact.ts              what never leaves the machine, applied to the bundle
    egress.ts              per-realm watch on what leaves; the worker runs its own
    keep-awake.ts          screen wake lock + the unload-warning rule (§7.5)
    watchdog.ts            silence-based timeouts for worker requests
    version.ts             product version and build identity
  media/
    inspect.ts             Mediabunny demux → SourceReport, on the PRIMARY tracks
    isobmff.ts             handler-type scan for the tracks Mediabunny cannot see
    capability.ts          WebCodecs + canEncode* + OPFS quota + device class
    probe.ts               3-second calibration probe → throughput + estimate
    preflight.ts           the §7.3 verdict, pure
    framerate.ts           VFR verdict and conform cost
    conform.ts             CFR conform, scale-to-fit, pad maths
    pipeline.ts            pass 1 / pass 2 orchestration, both feed lanes
    audio-plan.ts          the gain solve and the content audio processor
    audio-frames.ts        planar/interleaved conversion at the Mediabunny edge
    encoding.ts            the encoder configs Mediabunny is given
    encoder-delay.ts       measures the AAC encoder's own delay, and compensates
    branding.ts            variant selection, fetch, boundary fades, timeline
    composite.ts           the build over picture, for the overlay modes
    freeze.ts              picks the held final frame for `over-freeze`
    opfs.ts                job-scoped working store, Web Locks, orphan sweep
    save.ts                File System Access API, blob fallback, source guard
    output-verification.ts the §13 criterion 2 postcondition, pure
    vtt.ts                 WebVTT parse, cue offset, emit
  audio/
    kweighting.ts          BS.1770-4 pre-filter + RLB biquads
    biquad.ts              the second-order section both filters are built from
    loudness.ts            gated integrated, short-term, LRA
    truepeak.ts            4x oversampled true peak, drained at end of stream
    analyse.ts             loudness + true peak over one traversal
    highpass.ts            60 Hz
    macrolevel.ts          conditional envelope, 15 s smoothing, slew, pause freeze
    compressor.ts          2:1, -18 dBFS, 20 ms / 200 ms, soft knee
    limiter.ts             5 ms look-ahead, 50 ms release, working ceiling
    chain.ts               the ordered chain, assembled
    gain-solve.ts          §5.2 step 5's gain, solved against the chain that limits
    warnings.ts            the §5.4 rows, plus what production cost the user
  workers/
    job.worker.ts          the whole job
    cancellation.ts        the registry that makes a request cancellable
    protocol.ts            typed messages across the boundary
  ui/
    source-panel.ts        what the file is, and what cannot be carried over
    preflight-panel.ts     the verdict, in plain language
    warning-text.ts        one sentence per warning code
    format.ts             durations, sizes, rates
  acceptance/              the §13 harness. Dev-only; not built.
  spike/                   maintainer probes. Dev-only; not built.
  styles/
    tokens.brand.css       UoN palette — the D1 token lives here, once
    tokens.carbon.css      Carbon structural tokens (spacing, type, layer, state)
test/
  ebu3341/                 signal synthesis + published expected values
  helpers/                 shared signal generators
samples/                   YOUR real recordings. Gitignored. Never committed.
```

## Key modules

| Module | Responsibility |
| --- | --- |
| `media/inspect.ts` | Turn a `File` into a `SourceReport`: resolution, duration, codecs, rotation, audio presence, and a VFR verdict from `computeFrameRateMetrics()`. |
| `media/capability.ts` | Answer "can this device do this job?" — `canEncodeVideo()` for the exact target config, `navigator.storage.estimate()` against 2.5x the projected output, device class. |
| `media/probe.ts` | Decode+encode 3 s of the *actual* file, measure throughput, extrapolate. Turns spec §7.3's thresholds from guesses into measurements. |
| `media/conform.ts` | All the geometry and timing maths: CFR timestamp generation at the rounded average rate, scale-to-fit, pad rectangle. Pure functions, heavily unit-tested. |
| `media/opfs.ts` | The working store: a job-scoped OPFS directory, `createWritable()` handles wrapped for `StreamTarget`, and the orphan sweep at app start. Output lands in OPFS first and is copied to the user's destination only on success — writing straight to their chosen file would leave a partial on cancel, breaking spec §13 criterion 8. |
| `audio/loudness.ts` | The meter. Everything downstream trusts it, so it is built and validated first. |
| `audio/chain.ts` | Assembles steps 2-6 in order and applies them to a stream of `Float32Array` blocks. Each step is a separate, independently testable module. |
| `media/branding.ts` | Picks the master variant nearest the output frame rate and resolution class, fetches it, and owns the boundary fades and the output timeline. |
| `media/save.ts` | Streams the result to the user's chosen location, and refuses a destination that IS the source (VH-56). |
| `audio/gain-solve.ts` | Solves spec §5.2 step 5's gain against the chain that limits, over an injected measurement, so the harness and the product cannot diverge (VH-50). |
| `workers/cancellation.ts` | The registry that makes a request cancellable from before its first await (VH-57). |
| `workers/job.worker.ts` | Owns the job lifecycle: pass 1, pass 2, progress reporting, cancellation, OPFS cleanup. |

## Communication patterns

- **Across the worker boundary** — a typed request/response + progress-event
  protocol in `workers/protocol.ts`. The main thread sends `inspect`,
  `preflight`, `process`, `cancel`, `discard`, `lease` and `egress`, and
  receives `inspected`, `preflighted`, `stage`, `processed`, `cancelled`,
  `discarded`, `failed` and `uncaught`. Cancellation is an `AbortController`
  registered before the handler's first await (`workers/cancellation.ts`) and
  reached by a `cancel` message. No shared mutable state; transfer
  `ArrayBuffer`s, never copy.
- **Within the worker** — direct imports and plain function composition.
  The pipeline is a pipeline; it does not need an event bus.
- **Within the main thread** — `main.ts` holds the state directly: a
  selection epoch, the in-flight flags, and the retained result. There is no
  store and no bus, and adding either is a decision rather than a default —
  the surface is one screen with one job on it.

Exception worth naming: the progress path is deliberately one-way and
lossy. Dropping a progress frame is fine; dropping a `warning` or `error`
is not, so those are acknowledged.

## Dependency policy

**One runtime dependency: `mediabunny`.** That is the whole list, and it is
authorised by appearing here. Adding any other runtime dependency trips the
stop-and-ask rule in `AGENTS.md` — stop and ask, do not install.

Dev dependencies (`vite`, `vitest`, `typescript`, lint/format, the
markdownlint pair) are tooling, ship nothing to the user, and do not count
against that rule — but keep the set small and boring.

Licence floor: MPL-2.0 or more permissive. No GPL component ships, ever —
avoiding that exposure is one of the reasons this architecture exists.

## Configuration strategy

Every tuneable value lives in `src/config/`. Nothing in `media/`, `audio/`
or `ui/` may hard-code a threshold, target, duration, bitrate or colour.
This is not tidiness — it is how the four open decisions stay cheap:

| Open decision | Where it lands | Cost to answer |
| --- | --- | --- |
| D1 brand colour | `styles/tokens.brand.css`, one custom property | One line |
| D2 branding durations | `config/branding.ts` | One line each |
| D3 boundary treatment | `config/audio.ts` (fade length) + `audio/chain.ts` | One constant |
| D8 published limits | `config/thresholds.ts` | Three numbers |

Design tokens follow `UI-STANDARDS.md`: two systems side by side, UoN brand
palette and Carbon structural tokens, never collapsed into one.

## Dev workflow

| Action | Command | Result |
| --- | --- | --- |
| Install | `npm install` | |
| Dev | `npm run dev` | http://localhost:5173 |
| Build | `npm run build` | static files in `dist/` |
| Preview build | `npm run preview` | http://localhost:4173 |
| Test | `npm test` | Vitest |
| Quality gate | `npm run check` | non-mutating: types, lint, tests, build, docs |

Full detail — runtime lifecycle, diagnostics, the gate's contents, version
identity, security baseline — is in `DEV-INFRASTRUCTURE.md`.

## Known constraints in the dependency

Verified against Mediabunny 1.55.2, not assumed:

- **Subtitle tracks are invisible, not merely unreadable.** Verified by
  round-trip: an MP4 written by Mediabunny *with* a WebVTT subtitle track
  reads back as `getTracks().length === 0`. `Input` exposes only
  `getTracks`, `getVideoTracks`, `getAudioTracks` and the two
  `getPrimary*` variants — there is no subtitle getter at all.
  **Consequence:** detecting an embedded subtitle or chapter track needs
  our own minimal ISOBMFF scan — walk `moov` → `trak` → `mdia` → `hdlr`
  and read the handler type (`sbtl` / `subt` / `text`), plus `tref`/`chap`
  for chapters. Handler types only; no sample parsing. That scan lives in
  `media/isobmff.ts` and is the whole of VH-9's detection half.
- **Subtitle writing works.** `addSubtitleTrack` +
  `TextSubtitleSource('webvtt')`; `Mp4OutputFormat.getSupportedSubtitleCodecs()`
  returns `['webvtt']`. Verified by writing a valid subtitle-bearing MP4.
- **Metadata tags round-trip.** `Input.getMetadataTags()` /
  `Output.setMetadataTags()` both exist.
- **Metadata tags read and write** across MP4/QuickTime, so file-level
  metadata carry-through is available.
- **Chapters have no documented support** either direction.
- **`fastStart` must always be set explicitly.** The type is
  `false | 'in-memory' | 'reserve' | 'fragmented'`, and the docs state
  that when it is *not defined* Mediabunny picks `false` **or
  `'in-memory'`** automatically from the target type. `'in-memory'` holds
  every chunk until finalize — the exact ceiling this architecture exists
  to escape — so leaving the field undefined is a latent multi-gigabyte
  bug. Always name the value. `false` puts the moov at the end (fine for
  destinations that re-encode); `'reserve'` places it at the front with
  bounded memory but needs `maximumPacketCount` up front, which CFR
  conform makes computable.


<!-- FILE: pm_skills/project/archive/INDEX.md -->

# Archive index

<!-- The browsable map of cold storage. Never auto-read; grep and line-range
     reads only. One row per archive file, so a reader knows what a chunk holds
     without opening it. Word counts are recorded for FROZEN files only. -->

| File | Type | Range | Words | Holds |
| --- | --- | --- | --- | --- |
| [`trajectory/trajectory-0001-band-0-mvp.md`](trajectory/trajectory-0001-band-0-mvp.md) | trajectory | Phase 1, to 2026-08-25 | 760 | Band 0: VH-1..VH-11, VH-18, VH-12, VH-22, VH-M1 — skeleton, the BS.1770-4 meter and its EBU Tech 3341 pass, the audio chain, conform, OPFS, sidecars, pre-flight, the UI, and the acceptance run that closed the milestone. |
| [`trajectory/trajectory-0002-real-material-and-band-1.md`](trajectory/trajectory-0002-real-material-and-band-1.md) | trajectory | 2026-08-25 → 26 | 1543 | The corpus and branding masters arriving, the deploy, the three-engine alpha divergence, and Band 1 from VH-45 through VH-47. |
| [`trajectory/trajectory-0003-review-remediation-and-band-1-close.md`](trajectory/trajectory-0003-review-remediation-and-band-1-close.md) | trajectory | 2026-08-26 → 27 | 1719 | VH-50 and VH-54 closing the output contract on real material, the 2026-08-26 repository-review remediation run (VH-37..VH-53), and the overnight self-review VH-51. |
| [`decision-log-0001-2026-08-25.md`](decision-log-0001-2026-08-25.md) | decision-log | 2026-08-25 | 12 entries | Band 0's MVP decisions through VH-33 — the stack, the doc-sync, Band 1's ordering, the branding masters, the VH-34 spike, and the first memory prune. |
| [`decision-log-0002-2026-08-25-to-2026-08-27.md`](decision-log-0002-2026-08-25-to-2026-08-27.md) | decision-log | 2026-08-25 → 27 | 25 entries | Band 1's close on real material, the repository-review remediation decisions (VH-37..VH-68), VH-51's self-review, and the second memory prune. One 2026-08-27 entry (VH-52) sits out of date order, as it did live. |


<!-- FILE: pm_skills/project/archive/decision-log-0001-2026-08-25.md -->

# Decision-log archive 0001 — 2026-08-25

<!-- Frozen slice of pm_skills/project/decision-log.md, moved 2026-08-26 when the
     live log passed its 20-entry budget. Twelve entries, verbatim and in their
     original order: the Band 0 MVP decisions through VH-33. The live log keeps
     the latest ten, which is the read tier. Append-only — never rewritten. -->

## 2026-08-25 — VH-33: helper text is not a safeguard

**Decision:** Remove the opening checkbox and its helper paragraph from
`index.html`; pass `opening: false` in the job spec. The pipeline's opening
path, the config and the placeholder assets are all left alone.

**Rationale:** The control was already defaulted off and captioned "Not yet
available… leave this off unless you are testing." That is an instruction, not
a constraint, and what it guards is a published video carrying an unapproved
University graphic. Same reasoning as VH-45 hours earlier, and the same shape:
remove the control, keep the capability, restore it when there is something
approved to restore (VH-23).

**Checked rather than assumed:** the placeholder assets stay in `public/` and
keep being served. `gen-placeholder-branding.mjs` draws the literal text
"PLACEHOLDER — opening — 1080p25" and no University branding, so a public URL
serving one is not a brand risk — the risk was only ever compositing it into
someone's video, which is now unreachable.

**Link:** `index.html`, `src/main.ts`, doc-deltas SPEC §9.1 (already open), VH-23.

## 2026-08-25 — VH-36: one flag, and buttons that outlive the render

**Decision:** Build Start and Cancel once at module scope and never replace
them; hold the job's request id in `jobCancelId`; gate the screen on a single
`setJobInFlight` that disables the file, subtitle, preset and branding controls.

**Rationale:** The bug was not that the wrong controls were disabled, it was
that the controls were being REBUILT — `showProcessControls` ran
`processActions.replaceChildren()` on every preflight, so changing the preset
mid-job detached the running job's Cancel and appended a fresh, enabled Start.
Guarding each call site would have left the rebuild in place for the next
caller to trip over. Long-lived nodes remove the failure rather than defend
against it, and they are also why the cancel listener can be bound once
instead of once per Start click.

One flag with one applier, because VH-32 inherits this: the alternative — each
control deciding for itself — is what VH-36 was.

**A second defect, found by looking:** disabling was already happening to Start
and did nothing visible. `.button` sets its own background and colour, so the
browser's native greying never applied, and a disabled file input still drew a
live blue `::file-selector-button`. A lock nobody can see is not a lock. The
disabled look drops the solid fill rather than washing out the text, so it uses
`--text-secondary` on `--layer-02` — a pair `test/contrast.test.ts` already
pins at AAA — instead of taking WCAG's exemption for inactive controls.

**Verified in the browser**, since none of this is testable in Node: a preset
change leaves both button nodes identical (`dataset` markers survive); during a
job the file, subtitle, preset, branding and Start are all disabled and Cancel
is the only live control; three extra Start clicks do nothing; a cancel at
"Encoding video — 15%" settles as cancelled and restores every control.
Computed styles confirm the disabled Start is `--layer-02` / `--text-secondary`
at `not-allowed` against a live blue idle state.

**Link:** `src/main.ts`, `src/styles/app.css`, backlog VH-32.

## 2026-08-25 — VH-35: Web Locks, not job ids, protect another tab's scratch

**Decision:** A live `OpfsWorkspace` holds an exclusive Web Lock named for its
directory until `dispose`, and `sweepOrphanedJobs` removes a directory only
when that lock is free. Directory names gained a per-tab session prefix.

**Rationale:** The ticket proposed passing the live job ids to the sweep. That
fixes nothing: the sweep runs at worker BOOT, when this context has no jobs, and
the directories at risk belong to another tab whose ids it cannot see. Web Locks
are origin-scoped, so they cross tabs, and the browser releases them when the
holder dies — which is the exact case the sweep exists for. No heartbeat, no
staleness threshold, no window in which a live job looks dead. The session
prefix fixes a second defect found on the way: `job-${id}` is a per-worker
counter, so two tabs both opened `job-1` and wrote into one directory.

**Alternatives:** a heartbeat file needs a tuned threshold and tolerates clock
weirdness badly. Namespacing per session without a sweep rule means a crashed
tab's scratch is never reclaimed, which is what the sweep is for.

**Found by measuring:** `/spike-opfs.html` run in all three engines caught two
things the unit test could not. One undeletable directory threw out of the
removal loop and abandoned every orphan after it (Firefox) — now per-entry.
And the spike's own first draft called `finish()` with no Mediabunny `Output`
to close the writable, which is not a real sequence; rewritten to exercise
the cancel path, which is the one criterion 8 cares about.

**Testing:** the selection rule is pure and unit-tested in Node
(`selectSweepable`); OPFS and Web Locks do not exist there, so the browser half
is `/spike-opfs.html`, ALL PASS in Chrome 151, Firefox 154 and Safari 26.5.2.

**Link:** `src/media/opfs.ts`, `src/spike/opfs.ts`, `src/workers/job.worker.ts`.

## 2026-08-25 — VH-46: make the three-engine check repeatable

**Decision:** Promoted the ad-hoc VH-34 harness to `scripts/run-in-engines.mjs`
and deleted its wish-list line. It runs any spike page in Chrome, Firefox and
Safari and prints all three, keying off the `<pre id="log">` … `done` contract
every spike page already shares.

**Rationale:** `conventions.md` requires browser-only checks to be verified in a
real browser and recorded, and VH-34 found a shipped defect only because all
three engines were finally measured together — by hand, which is the chore that
stops getting done. VH-44's regression test has to hold in three engines, so
this is its dependency rather than speculative tooling.

**Alternatives:** Playwright would bring a dev dependency and its own browser
downloads to replace ~300 lines using protocols already on the machine.
Firefox's `--screenshot` was tried and rejected: it fires at load, long before
an async decode finishes.

**Gate surface:** `eslint.config.js` gained four Node globals — `fetch`,
`setTimeout`, `AbortSignal`, `WebSocket` — in the existing `**/*.mjs` block. No
rule was weakened; the block already listed three globals by hand, and a
`globals` package would be a dependency for a lookup table.

**Watch:** it must never join `npm run check`. Three browsers saturate the
machine and the DSP suite fails on timeout rather than on merit —
`chain.test.ts` took 540 s and failed a test the one time they overlapped,
against ~4 s idle. Recorded in the script header and in DEV-INFRASTRUCTURE.

**Link:** `DEV-INFRASTRUCTURE.md` → "Cross-engine verification",
`tickets/VH-44.md`.

## 2026-08-25 — Pruned project memory: the first trajectory split

**Decision:** Moved Phase 1 (Band 0 MVP, 76 lines / 722 words) verbatim to
`archive/trajectory/trajectory-0001-band-0-mvp.md`, left a one-line pointer in
its place, and created `archive/INDEX.md`. Trajectory 2,069 → 1,358 words
against a 2,000 budget and a 1,400 prune-to target.

**Rationale:** The previous prune predicted this ("the next shipped item trips
it") and VH-45 was that item. Phase 1 is the natural boundary: a closed
milestone whose items are all shipped, none of which any live item still
reasons about. Everything after it — the corpus, the real branding assets, the
deploy, the engine divergence — is still being argued with.

**Alternatives:** compressing Phase 1 in place was rejected; trajectory lines
are already one-per-item outcomes, so compression means deleting outcomes, and
an archive keeps them greppable at no cost to the live read.

**Deviation:** the Prune procedure says to add new archive files to
`file-map.md` under an "Archive" section. Not done, deliberately — that file is
generator-owned and `gen-file-map.mjs` ignores `^pm_skills/`, so a hand-written
section would be dropped on its next run. `archive/INDEX.md` is the map of cold
storage and carries the row instead.

**Verify:** three `diff` runs against the intact original proved the split
lossless — archived slice, kept header, kept tail, all byte-identical.

**Link:** `pm_skills/project/archive/INDEX.md`.

## 2026-08-25 — VH-45: withdraw the transition controls rather than wait

**Decision:** Delete the "How the logo arrives" and "Animation" fieldsets from
`index.html` and their wiring in `main.ts`. The pipeline keeps all three modes;
`chosenBranding` already fell back to `CLOSING_DEFAULTS`, so removing the radios
is the whole change.

**Rationale:** VH-34 found `over-picture` and `over-freeze` wrong in Firefox
hours after the site went live, and both were offered as radio buttons. The
exposure is a user choosing a broken closing today; VH-44's fix is a startup
probe with a regression test, which is not a today-sized piece of work. VH-33
set the precedent — a control that should not be chosen is removed, not
defaulted off — and removal costs nothing to reverse when VH-44 lands. Animation
went with the modes because Fade and Slide differ only during the build a hard
cut discards: `syncBrandingOptions` was already disabling it on every default
job, and a permanently-disabled control is exactly what VH-32 objects to.

**Alternatives:** hiding the modes in Firefox alone was rejected — engine
sniffing is what VH-44's ticket rejects for the fix, and it would make the
control set depend on the browser. Leaving them with a warning was rejected:
spec §9.2 says every exposed control is a decision a novice is forced to make,
and this one has a wrong answer.

**Link:** `index.html`, `src/main.ts`, backlog VH-44, doc-deltas SPEC §4.1.

## 2026-08-25 — VH-34 spike: the composite is engine-dependent after all

**Question:** `composite.ts` moved the blend to the CPU because the engines
disagree over whether a decoded frame is premultiplied. `compose()` still reads
the branding frame back through `getImageData`, which un-premultiplies by
specification. Does the disagreement reappear at the readback? Timebox: one
session.

**Method:** `spike-alpha.html` gained the measurement, run headlessly in all
three engines — Firefox over WebDriver BiDi, Chrome over CDP, Safari over
`safaridriver`. Ground truth came from ffmpeg decoding the onsets straight from
the WebM: the frame at t=0.40 s is uniform, white `(73,73,73,75)` and blue
`(4,10,17,75)`, premultiplied. Measured on the real `compose()` over a black
picture, the maximum-error case and the one a real closing over dark footage
would show.

**Finding — yes, and every alternative route is broken somewhere too:**

| Route | Chrome 151 | Firefox 154 | Safari 26.5.2 |
| --- | --- | --- | --- |
| `draw` then `getImageData` (today) | correct | un-premultiplied | correct |
| `new VideoFrame(canvas).copyTo` | double-premultiplied | correct | BGRA |
| `VideoSample.copyTo` (no canvas) | correct | correct | luma plane |

In Firefox blue returns 3.7x too bright — `5 x 255/69 = 18.5`, exact on all
three channels — and white overflows and WRAPS rather than clamping:
`74 x 255/69 = 273`, reported as 17. So the white closing over dark picture
does not glow, it inverts. Safari's two failures are one cause: it ignores
`VideoFrameCopyToOptions.format` silently. Blue caught it and white would have
hidden it — `(17,10,7)` is `(4,10,17)` reversed, invisible on grey. Firefox
also expands the alpha plane as limited range (75 becomes 69), which is what
pushes the white case over 255 in the first place.

**Recommendation:** no single route is portable, so the fix is a startup probe
against a known branding frame that picks a working route and refuses the
overlay modes if none matches — the shape `capability.ts` already uses, and
consistent with failing loudly rather than silently. Raised as VH-44, which
inherits this entry's numbers as its expected values. Not attempted here: a
spike's code does not merge.

**Alternatives:** correcting Firefox's readback arithmetically was rejected —
the overflow wrap destroys the value, and it survives only because Firefox's
alpha rescaling breaks the `RGB <= alpha` invariant the correction would rely
on. Re-tagging the assets full-range would remove the wrap but not the
un-premultiply, so it fixes the symptom that is easiest to see and leaves the
error.

**Scope note:** the measurement stayed in `src/spike/alpha.ts` rather than a
scratch directory, matching how VH-12's alpha check is kept — dev-only, never
built, and re-runnable as one URL. A spike normally leaves nothing behind; a
verification that cannot be re-run is not a verification.

**Link:** `src/media/composite.ts`, `src/spike/alpha.ts`,
`public/branding/README.md`, backlog VH-44.

## 2026-08-25 — Pruned project memory

**Decision:** Swept the 12 doc-deltas ticked by the same session's doc-sync, and
deleted two dead wish-list lines. No file was archived — nothing was over an
archivable budget.

**Rationale:** The ledger shrinks by ticking-then-sweeping, so the sweep was due
the moment doc-sync ticked; the audit trail it held now lives in this log and in
git. The two wish-list lines were not deferrals but errors: the TypeScript 7 pin
duplicated Icebox item VH-28 verbatim and should have been deleted when VH-28 was
minted (the wish-list is pre-triage, the Icebox post-triage — an item cannot sit
in both), and the `bestGuessFrameRate` concern was answered by VH-24's
verification that `inspect.ts` reads the rate from `computeFrameRateMetrics()`,
measured from packets, and never from `bestGuessFrameRate`.

Backlog Active stays over its word budget (2,479 / 1,500) by standing decision —
the inline detail is doing real work and the open-item count is well within
budget. `tickets/VH-24.md` and `VH-25.md` are over their soft budgets for the
same reason. The P3 backup was deleted after verification: both files were
byte-identical to what git already held, so committing them into the tracked
archive would have been duplication, not history.

**Watch:** `trajectory.md` is at 1,972 of 2,000 words. The next shipped item
trips it, and the prune-to target is 70% — so the first archive split is due
then, not now.

**Link:** `pm_skills/project/doc-deltas.md`, `wish-list.md`.

## 2026-08-25 — Doc-sync: the specification meets the real assets

**Decision:** Reconcile `docs/01-specification.md` against all 12 open
doc-deltas in one signed-off batch, plus 3 consequential edits derived from
the same sources that the ledger had not captured. 15 edits, 0 deferred.
Spec grows 2,761 → 3,772 words (3,841 before a follow-on copy-edit pass
tightened §4.1, §4.3, §6.3 and §8.3 without dropping a fact).

**Rationale:**

- **Ten deltas were the spec going stale.** Reality differed and the code was
  already right: the branding is silent (§4.4 bed struck), one 4K25 master
  exists rather than a four-variant matrix (§4.2), four style variants exist
  that the spec never anticipated, the alpha is premultiplied and the
  operation is compositing rather than concatenation (§4.3), v1 is
  closing-only (§4.1), embedded subtitle tracks cannot be read at all so two
  of §8.3's four steps had no reachable branch, the frame rate is measured
  rather than declared (§6.3), and colour/HDR was specified nowhere (new
  §6.5, which states the behaviour is undefined rather than inventing one).
- **Two were the opposite** — the code faithfully implements the spec and the
  spec's rule is the defect: §6.2's bitrate targets with no never-exceed-source
  cap, and §6.3's round-to-nearest-standard, which snaps Teams' 16.000 fps to
  24. Both are written as the corrected rule, so the spec leads the code by one
  band; VH-24 in Band 1 closes the gap, and §13 is where "is it built" is
  tracked.
- **Three edits went beyond the ledger.** §13.1 required "both animations",
  impossible in a closing-only v1; §13.6 and the corpus note required a
  variable-frame-rate test source, and no corpus file classifies as variable.
  The ledger captures where drift was *noticed*; the edit is derived from the
  source and reaches wherever that source reaches.

**Alternatives:** Holding the two rule-defects until VH-24 ships was rejected —
it would have built VH-24 against a spec still asserting the rule it exists to
overturn. Pending-markers in the body were rejected as duplicating §13.

**Link:** `pm_skills/project/doc-deltas.md` (12 ticked); spec §§4.1–4.4, 6.2,
6.3, 6.5, 8.3, 13.

## 2026-08-25 — Band 1: what the pilot owes its first real users

**Decision:** Open the gate the post-Band-0 bucket was holding. Band 1 is
**VH-33, VH-24, VH-31, VH-19, VH-25, VH-32**, in that order. Band 2 (VH-16,
VH-20, VH-17) and Band 3 (VH-26, VH-23, VH-30) are recorded but not committed.
Maintainer work (VH-M2, VH-M3, VH-14, VH-15) is listed apart from the bands so
it cannot read as waiting on one. Alongside it: **VH-22 closes** (shipped),
**VH-21 is cut** (premise gone), and **VH-23 is split**, with the live risk
pulled forward as VH-33.

**Rationale:**

- **The band question changed when the app went live.** Band 0 asked "does it
  work?" Every item found since was found by real material or a real run, so
  Band 1 asks "is what it produces right, and does it read right?" That is what
  sorts the sixteen: the four things a staff member currently meets that are
  wrong or misleading go in; the rest wait.
- **Order is dependency, not ID.** VH-24 settles the output shape, so VH-31's
  estimate and VH-19's content class both key off it, and all three land on
  `outputShapeFor` and the same three-second probe. Touching that function
  three times in three bands would be the expensive way to do one piece of work.
- **VH-32 goes last on purpose.** The redesign has to lay out the estimate
  wording, the content class and the fade toggles that the four items above
  decide. Running the design pass first means running it twice.
- **VH-33 goes first because it is a live brand risk, not a feature.** The
  deployed site still offers "Add the opening sequence" over a stand-in UoN
  graphic, held back only by helper text. Removing a control is small; leaving
  it queued behind engineering work was the actual mistake.
- **VH-22 was already done.** All three modes, the default, the alpha-decode
  fallback and the clean-frame freeze are in the code and verified in all three
  engines. Its two unmet clauses belonged to other items and moved there.
- **VH-21 lost its premise.** It asks to preserve a branding audio bed when the
  source is silent; the masters are silent by design and the bed is struck from
  spec §4.4 (doc-delta, 2026-08-25). There is nothing to preserve.

**Alternatives:** Putting VH-32 first — the maintainer's most recent request —
was rejected on the rework it forces. One undifferentiated band of everything
found after Band 0 was rejected as a holding pen with a new name: it carries no
ordering signal and no gate.

**Link:** `pm_skills/project/backlog.md`; VH-22's outcome in `trajectory.md`.

## 2026-08-25 — Branding: real assets, four styles, and a shared tail

**Decision:** Build VH-12 in full (approved by the maintainer 2026-08-25).
Ship all four 2025 closing styles; **Fade Blue is the default**; retire
`UoN Logo Exit Animation JB 2023`. Treat the shared 4 s tail as a guaranteed
property, not a coincidence.

**Rationale:**

- **The masters are not a file swap.** `qtrle`/`argb` is undecodable by
  WebCodecs, the 1.00 s alpha onset is meant for compositing rather than
  concatenation, and one 4K25 master must serve sources from 640×480 to 4K at
  16–50 fps. That is a converter, a compositor and a resizer, not a copy.
- **The shared tail is deliberate.** The maintainer authored the assets by
  duplicating one After Effects composition and varying the onset animation
  and the colour, so frames after t=1.00 s are byte-identical *within a
  colour*. Confirmed by frame hashes before asking. This is safe to build on:
  ship **two tails** (Blue, White) and **four onsets**, which cuts the
  alpha-carrying material to 4 seconds total and the download substantially.
- **Alpha decode is the risk, so it is verified first.** Browser support for
  transparent video is thinner than for ordinary video. If it fails, "clean
  cut" still works — that mode never composites — so branding ships either
  way, with fewer modes.

**Alternatives:** Asking for re-exports in a browser-ready format was
rejected — the master format is correct for a master, and converting at build
time keeps the authoring tool free to change. Collapsing the tail to a still
image was rejected on measurement: it is animated throughout.

## 2026-08-25 — Band 0 MVP: stack, scope, and the decisions that shaped it

**Decision:** Build the first milestone as a static TypeScript app on
WebCodecs with Mediabunny as the only runtime dependency, scoped to Band 0
(local, no deploy), and treat the specification set in `docs/` as
authoritative throughout.

**Rationale:**

- **Stack.** TypeScript 6.0.3 + Vite + Vitest. TypeScript 7 is released but
  typescript-eslint caps at `<6.1.0`, and adopting 7 would have cost the
  correctness lint the quality gate depends on — a worse trade than being one
  major behind.
- **The meter first.** VH-2 and VH-3 were moved ahead of the pipeline. The
  loudness meter is the highest-risk component and has no dependencies, so
  proving it against EBU Tech 3341 before anything consumed it meant a failure
  would cost one item rather than six. It passed at 0.021 LU worst error.
- **Three audio passes, not an estimate.** The single linear gain must land the
  *output* on −16 LUFS, and steps 2–4 of the chain change loudness on the way.
  Measuring what they leave (pass B) rather than estimating it is why a
  −46.83 LUFS source lands at −16.03.
- **The chain runs in the pipeline's feed loop, not the encoder's transform
  hook.** That hook sees every sample including the branding bed, which is
  mastered at target and must pass through unprocessed (spec §4.4). This is
  spec §4.4 expressed as an architectural constraint, and it only became
  visible when branding arrived.
- **Audio timeline shifted by the measured encoder delay.** AAC adds 44 ms of
  priming; the conventional fix is an edit list, which Mediabunny does not
  write. Measured rather than assumed, because it belongs to whichever encoder
  the browser provides.
- **Verification against reference material, not self-consistency.** The EBU
  signals and the acceptance harness each found defects that 29 and 245
  passing tests respectively had not: a 5.0 channel-weight gap, a 100 ms
  update grid too coarse for EBU tests 10–14, cancellation escaping cleanup,
  and two faults in my own measuring instruments.

**Assumptions made** (all recorded against open decisions, none invented):
D1 brand colour is a single token, verified as a one-line change; D2 durations
are config-only; D3 boundary treatment is a hard cut with a 100 ms fade; D4's
Safari-below-26 exclusion holds pending UoN IT.

**Alternatives considered:** ffmpeg.wasm was rejected before this run and not
revisited — rationale §1 stands. `fastStart: 'reserve'` for the smaller preset
was deferred to VH-17 rather than guessed at, since it needs a measured packet
count and a real SharePoint upload to settle.

**Known open:** acceptance criteria 1, 4, 5 and 7 need real material and a
person (VH-M1); published limits need real hardware (VH-M2). Three protected-doc
deltas await sign-off in `doc-deltas.md`, of which spec §6.3's frame-rate
rounding is the one that changes behaviour.


<!-- FILE: pm_skills/project/archive/decision-log-0002-2026-08-25-to-2026-08-27.md -->

# Decision-log archive 0002 — 2026-08-25 → 2026-08-27

<!-- Frozen slice of pm_skills/project/decision-log.md, moved 2026-08-27 when
     the live log passed its 20-entry budget. Twenty-five entries, verbatim and
     in their original order: Band 1's close on real material and the
     repository-review remediation, VH-63 back through VH-24/VH-41 (one
     2026-08-27 entry, VH-52, sits out of date order here exactly as it did in
     the live log). Append-only — never rewritten. -->

## 2026-08-27 — VH-63: warn only when there is something to lose

**Decision:** hold a screen wake lock for the length of a job, re-taking it
when the tab returns to view, and attach `beforeunload` for exactly the
interval in which work could be lost — which includes an unsaved result, not
just a running job.

**Rationale:** spec 7.5 asks for both and neither existed anywhere in `src/`
(review R-12). A forty-minute encode on a laptop that sleeps is forty minutes
gone, and a reload during one discards it without a word.

Re-acquisition on `visibilitychange` is the part that is easy to leave out and
does most of the work: the browser releases a wake lock whenever the document
is hidden, so a user who switches tabs during a long encode returns to a
machine free to sleep — the exact case the lock was taken for.

The unload warning covers a wider interval than the review proposed. A job in
flight is obvious; a save still streaming out of OPFS is the same risk with a
different name; and a finished file the user has not put anywhere is an hour of
work sitting in scratch that a reload discards. All three, and nothing else —
a page that always warns trains people to dismiss the warning, and then it
protects nothing.

**Verified in Chrome:** no listener and no request while idle; one of each once
a job starts; the warning STAYS attached after the job finishes because the
result is unsaved; and it comes off when the file is saved. The lock itself was
refused with `NotAllowedError` because the pane is not visible — which is the
quiet-degradation path working. Whether a GRANTED lock prevents sleep needs a
visible window and a real sleep, and is not verified here.

**Link:** VH-63; review R-12; spec 7.5; `src/core/keep-awake.ts`,
`src/main.ts`.

## 2026-08-27 — VH-68: four faults that were nobody's ticket

**Decision:** fix all four in one visit — the sliding minimum's counter type,
two config values nothing read, the silence warning's misplaced guard, and the
cross-engine tally.

**Rationale:** the review's consolidation dropped these, and each is the kind
of fault that survives precisely because it is too small to schedule.

`SlidingMinimum.position` counts samples for the length of a file and never
resets, in an `Int32Array` that wraps past 2^31 — 12.4 hours at 48 kHz. After
the wrap the expiry comparison goes negative and the ring cycles forever. Well
outside this tool's envelope; a latent hang is still a latent hang. A
`Float64Array` holds every integer to 2^53 exactly.

`WARNING_THRESHOLDS.clippingDbtp` and `COMPRESSOR.softKnee` were declared and
never read, while `truepeak.ts` carried its own `-0.1` and `compressor.ts` its
own `6`. That is worse than a plain literal: a literal admits where the number
lives, whereas a config entry nobody reads invites someone to tune it and watch
nothing happen. `softKnee: true` also described the shape while a different
file decided the width, so it becomes `kneeDb: 6` — a soft knee is how wide it
is.

`extended-silence` sat inside a guard written for the NOISE test. That guard
exists so a recording with no pauses is not accused of background noise it may
not have — a judgement about noise, applied by accident to silence. An entirely
silent track has every short-term value at `-Infinity`, so the guard emptied and
the one warning that describes it could never fire.

And `run-in-engines.mjs` reported `wanted.length - failures` complete runs, so
"3/3" could mean one ran and two were not installed. Three independent counters
now, and a skip fails the run only when that engine was named explicitly —
defaulting to all three means "whatever is installed"; naming one means "this
one".

**Link:** VH-68; review's dropped findings; `src/audio/limiter.ts`,
`src/audio/truepeak.ts`, `src/audio/compressor.ts`, `src/audio/warnings.ts`,
`src/config/audio.ts`, `scripts/run-in-engines.mjs`.

## 2026-08-27 — VH-62: a status the harness did not earn

**Decision:** give the acceptance report an `external` status, measure both
tracks of the sync meter on one clock, watch the worker's realm as well as the
page's, and make the egress instrument prove it can fire.

**Rationale:** four ways the page could be green without having looked
(review R-11).

Criterion 3 was hard-coded `pass`. The meter conformance it describes is
asserted by `npm run check`, not by that page — so the page could be entirely
green while the gate had never run, or was failing. `external` says where the
evidence is instead of borrowing its colour, and the summary counts it
separately rather than folding it into "passed".

The sync meter read video markers as presentation timestamps and audio markers
as a running count of decoded frames. On a contiguous track starting at zero
those agree, which is why it went unnoticed — but they diverge on a track that
starts late, a gap mid-file, or an edit list, which is precisely the set of
cases the meter exists to judge. That is also why VH-55's second half was
sequenced behind this: it moves the audio start, and would have been graded by
a meter using two clocks.

Criterion 9's instruments are per-realm. A worker has its own `fetch` and its
own resource timeline, and the job runs in a worker — so the only request this
app makes at runtime, for branding, was invisible to a watch on the main
thread, and the criterion was reporting a clean timeline that contained none of
the app's real requests. The worker now runs a watch of its own and reports it
over the protocol; `mergeEgress` joins them, and criterion 1's fixture runs
WITH branding so the fetch actually happens.

And a watch that never fires is indistinguishable from a watch that cannot.
A new check deliberately uploads two bodies — one on `init`, one built into a
`Request`, the shape that used to slip past because only `init.body` was read —
and fails if either goes unseen.

**Note:** `EgressWatch` moved to `core/egress.ts`. The worker needs it, and
production code importing the acceptance harness is the wrong direction.

**Verified directly in Chrome:** both body shapes are caught, the
`Request`-carried one as "present, size unmeasurable". NOT verified: a complete
acceptance run. It takes over an hour in this browser — four minutes per
synthesised corpus entry — which is a finding of its own and is on the
wish-list.

**Link:** VH-62; review R-11; `src/core/egress.ts`, `src/acceptance/run.ts`,
`src/acceptance/measure.ts`, `src/workers/protocol.ts`.

## 2026-08-27 — VH-59: inspect the track that will be encoded

**Decision:** have inspection call `getPrimaryVideoTrack()` and
`getPrimaryAudioTrack()` — the same calls production makes — and say before
processing how many tracks a file holds that the output cannot keep.

**Rationale:** inspection read `getVideoTracks()[0]` and `getAudioTracks()[0]`
while the pipeline asks Mediabunny for its primary tracks, and those are not
the same selection. Mediabunny picks a primary by position, disposition,
bitrate — higher wins — and pairing with the primary video track. An OBS
recording with programme audio on track 0 and a higher-bitrate commentary mic
on track 1 would therefore be inspected against one and encoded from the other,
so the loudness plan, the audio warnings and the whole pre-flight would describe
sound the user will not hear (review R-09). Calling the same API in both places
makes divergence impossible rather than unlikely.

The output carries one video and one audio track by design, so anything beyond
that is content the user loses. `AGENTS.md` requires saying so before
processing, and the source panel already has the pattern — the subtitle notice
sits two rows below. Metadata that fails to copy now reports too, through the
`outputWarnings` channel VH-55 gave a first member.

**Note:** `TrackScan` also counts tracks, from a direct ISOBMFF handler walk.
That count exists to see what Mediabunny cannot — subtitles and chapters — and
is `scanned: false` for WebM. The new counts come from Mediabunny and work for
every container, so the two are complementary rather than duplicated.

**Verified:** a two-audio-track MP4, synthesised with ffmpeg because the real
corpus has none, is described as "This file has 1 more sound track" with the
note before Start is available, and processes to a correct single-track output.

**Link:** VH-59; review R-09; `src/media/inspect.ts`, `src/ui/source-panel.ts`,
`src/media/pipeline.ts`.

## 2026-08-27 — VH-55: measure the loss now, move the video later

**Decision:** make the encoder-delay probe report "unmeasurable" separately
from "zero", and make the onset the compensation discards a visible warning —
but do NOT re-time the video lane in the same task.

**Rationale:** compensating the AAC encoder's ~44 ms delay shifts the audio
timeline earlier and discards whatever lands before zero. Three files in the
real corpus carry energy there — two near -26 dBFS, one near -48 — so what goes
is sometimes the attack of a first word (review R-03). Two separate faults sat
on top of that. The probe returned 0 both for an encoder with genuinely no
delay (Opus, PCM) and for a probe that threw or found no impulse, so nothing
could tell an uncompensated job from a job that needed no compensation. And the
loss was silent, which `AGENTS.md` names as the worst outcome available.

Preserving the samples is possible and the mechanism is known: delay the VIDEO
by the encoder delay instead, which Mediabunny expresses as an empty edit list
(`isobmff-boxes.js` writes `edts` whenever a track's first timestamp is
positive — the module comment saying it writes no edit list is wrong, though
its conclusion stands, because an empty edit cannot express priming-skip
either). The edit itself is about six lines across four timestamp sites.

What is not six lines is proving it. The change moves A/V sync, and the
acceptance meter reads audio markers in decoded-sample time and video markers
in presentation time — so it would measure the one axis this change moves using
two different clocks, and could report either a false pass or a false 44 ms
failure. Making a sync change whose verification is known to be blind is how
silent drift reaches published video. VH-55 keeps the second half, sequenced
after VH-62.

**Rejected:** encoding at the source sample rate; leaving the delay
uncompensated (44 ms sits right on ITU-R BT.1359's detectability threshold);
and shifting the video by a whole number of frames, which would trade exact
sync for 22 ms of audio lead — tighter than the tolerance for audio leading.

**Link:** VH-55; review R-03; `src/media/encoder-delay.ts`,
`src/audio/warnings.ts`, `src/config/audio.ts`.

## 2026-08-27 — VH-57: cancellation is a property of every request

**Decision:** register a request's `AbortController` before its handler can
await, make inspection and pre-flight cancellable, and re-check the signal at
every boundary that commits a result.

**Rationale:** `Cancel leaves nothing behind` is an `AGENTS.md` invariant, and
three separate paths broke it (review R-07). `handleProcess` registered its
controller after `await releaseFinished()`, so a Cancel pressed during cleanup
found an empty map and vanished — a window VH-56 then widened, because cleanup
can now wait on a save lease. Only `process` registered at all, while `main.ts`
posts a `cancel` for any request that exceeds its bound, so a timed-out
inspection or pre-flight went on doing full analysis and probing for a screen
that had given up on it. And the signal stopped at `runPipeline`: the
finished-file verification walks the whole output again with no signal at all,
then posts `processed` unconditionally, so Cancel during the longest silent
phase of a long job answered "Your video is ready."

`analyseSourceAudio` is the subtle one. It stops at the next sample rather than
throwing, so an aborted traversal returns a measurement of PART of the file —
which would then fail the output contract and be reported as a broken video
rather than as the cancellation it was. Every caller now re-checks after it.

The registry moved to `workers/cancellation.ts` because the rule deserves a
test and importing the worker runs its boot. The invariant it pins is one
sentence: a request is cancellable from before its first await.

**Verified in Chrome on a real recording:** Cancel during preparing, analysing
and finishing each returns `cancelled`, leaves no Save control, and leaves the
OPFS jobs root empty. Finishing is the new one — the phase that used to answer
"ready".

**Link:** VH-57; review R-07; `src/workers/cancellation.ts`,
`src/workers/job.worker.ts`, `src/media/inspect.ts`, `src/media/pipeline.ts`.

## 2026-08-27 — VH-56: a finished result is owned, not merely displayed

**Decision:** hold a finished result until the user has it somewhere, protect
its scratch with a worker-side read lease as well as a UI lock, and refuse a
save destination that is the source file.

**Rationale:** the result was a `File` on the screen and nothing more. Four
ways it could be lost, all on ordinary paths (review R-04). A fallback download
was treated as complete the moment `anchor.click()` returned, and the caller
then discarded the OPFS scratch the object URL still reads from lazily.
Starting another job disposed that scratch while a picker save was streaming
out of it, because saving disabled only the Save button. Starting another job
also discarded an unsaved result outright, one click, no question. And the save
picker returns whatever the user selected, so selecting their own source was
allowed — which makes "the original file is never changed" falsifiable in the
interface that says it.

The lease is deliberately belt and braces. The UI lock alone would be enough if
the UI were always right, and VH-36 is what happens when it is not; the lease
makes disposal wait on the reader rather than on a convention. It expires after
{@link SAVE_LEASE_LIMIT_MS} because a lease that cannot expire is a user who
can never start another job.

`isSameEntry()` is the exact identity test and needs a handle for the source,
which the app does not have: the file arrives through `<input type="file">`.
Name, size and modification time together are conclusive enough — a different
file matching all three is the same file by any practical definition — and
`saveFile` uses `isSameEntry` instead whenever a handle is supplied, so
acquiring one later (a VH-32 question) upgrades the guard rather than
replacing it.

**Rejected:** a modal confirmation. The question belongs beside the result it
is about, and `UI-STANDARDS.md` reserves focus-stealing dialogues for something
irreversible the user did not initiate.

**Verified in Chrome on a real recording:** Start asks before discarding and
"Keep it" restores the result intact; a save that is the source is refused
without reaching `createWritable`; Start, the file input and Save are all
locked while a save streams and a programmatic Start click is inert; and the
worker disposes the workspace only after the lease comes back — the ordering
that would otherwise deadlock `discard`.

**Link:** VH-56; review R-04; `src/media/save.ts`, `src/main.ts`,
`src/workers/job.worker.ts`, `src/workers/protocol.ts`.

## 2026-08-27 — VH-50 and VH-54: the contract is measured on the file

**Decision:** solve the step 5 gain against the chain that actually runs, and
hold the limiter a measured 1.0 dB below the published true-peak ceiling.

**Rationale:** two independent reasons the delivered file missed spec §13
criterion 2 while every fixture passed.

The gain was solved against an unlimited chain (`gainDb: null` also sets
`limiter = null`) and then used in one that limits, so the limiter took back
whatever it took back. Invisible on synthesised speech — a ~7 dB crest factor
never reaches the limiter — and up to 2.4 LU on material shaped like a real
lecture. `solveChainGainDb` now measures the real chain and corrects, and the
harness calls that same function instead of re-implementing the rule, which is
what let the two diverge in the first place.

Separately, the limiter is not the last thing to touch the signal: AAC-LC is,
and an MDCT codec does not preserve peak level. Four real lectures, all limited
to exactly −2.0 dBTP, decoded at −1.98, −1.91, −1.90 and −1.61. Resampling was
ruled out — the worst is the one 48 kHz file, which is never resampled. The
limiter's working ceiling is therefore a config value below the published one.
1.0 dB rather than the 0.44 dB worst case because the trade is asymmetric: too
little headroom refuses the user's job, too much costs a decibel of gain
reduction on transients and nothing else.

VH-54 is the same promise one layer down: the oversampling FIR is causal and
had no post-roll, so a full-scale sample in the last frame measured −64 dBTP,
and `flush()` emitted its tail at one frozen gain — 0 dBTP out of a limiter
that guarantees −2.0.

**Measured (2026-08-27, `best` preset, `/spike-real.html`):**

| File | Source | Before | After |
| --- | --- | --- | --- |
| AMCS3059 | −21.86 LUFS / −1.86 dBTP | −16.75 / −1.98 | −16.41 / −2.98 |
| CULT1027 | −23.29 / −3.42 | −16.13 / −1.61 | −16.10 / −2.56 |
| MLAC3139 | −27.24 / −4.50 | −16.08 / −1.91 | −16.10 / −2.94 |
| AMCS2007 | −26.07 / −3.77 | −16.11 / −1.90 | −16.15 / −2.95 |

**Rejected:** encoding at the source sample rate to avoid resampling — spec
§6.1 and §6.2 require 48 kHz, and the measurement showed resampling was not the
cause. Also rejected: a re-encode when the postcondition fails, which would
double an hour-long job to fix a decibel.

**Link:** VH-50, VH-54; review R-01, R-02; `src/audio/gain-solve.ts`,
`src/config/audio.ts`, `src/audio/truepeak.ts`, `src/audio/limiter.ts`.

## 2026-08-27 — VH-31: audio presence is an estimator input

**Decision:** require every output-size projection call to state whether the
inspected source has audio, and charge the configured audio bitrate only when
the job will create an audio track.

**Rationale:** the worker already has the authoritative fact in `SourceReport`.
Making it explicit at the pure-function boundary prevents silent sources from
inflating both the displayed estimate and the storage gate, while leaving the
blocked content-estimator redesign untouched. A default was rejected because
it would preserve the original failure mode for future callers.

**Link:** VH-31; `src/config/presets.ts`, `src/workers/job.worker.ts`.

## 2026-08-26 — VH-53: one shared contract, two native entry points

**Decision:** keep `AGENTS.md` as the canonical shared behavioural contract and
add a short `CLAUDE.md` that imports it. Claude-specific text is limited to the
memory boundary: automatic memory is local recall, while durable facts and task
close-out stay in the repository locations assigned by `AGENTS.md`.

**Rationale:** Codex discovers `AGENTS.md` natively, while Claude Desktop Code
discovers `CLAUDE.md` and supports repository-relative imports. The adapter
therefore gives both tools the same mature invariants and tiered PM Skills read
policy without a second hand-maintained summary. A symlink was rejected because
it leaves no tool-specific layer and is less portable across Windows and synced
filesystems; an independent summary was rejected because it would drift.

**Unchanged:** `AGENTS.md`, application behaviour, the specification set, and
both tools' machine-local generated memory stores.

**Link:** `CLAUDE.md`, `README.md` → "AI project context".

## 2026-08-26 — VH-31: measured, designed, and deliberately not built

**Decision:** run the design workflow, record everything it measured on the
ticket, and DO NOT implement. All three adversarial refuters returned blocking
findings against the recommendation — the third reported after this entry was
first written and only strengthened the conclusion.

**Rationale:** the measurement was worth having and the design was not ready.
Building it at 4am, with no time left for the review pass that had just caught a
regression in work from midnight, would have repeated exactly the mistake that
review existed to find. A measured design plus its confirmed objections is a
better thing to hand over than a half-verified change to the number a lecturer
decides on.

**Two of the ticket's own premises turned out false**, which is the most useful
result and would not have surfaced without measuring:
- The 3.6x headline is stale. VH-47 shipped hours earlier and more than halved
  it — 1.70x now, which I verified by hand against the same file rather than
  taking the agent's figure.
- The over-estimate is not a safety margin. At "Smaller file" the projection
  already falls BELOW the produced file on 4 of 23 real jobs, because the
  encoder overspends its target while the 1.02 container constant is fully
  consumed by real overhead. So this is not "the number is too big" — it is too
  big at one preset and slightly too small at the other, and a fix that only
  shrinks it makes the second half worse.

**What the bake-off settled:** the first three seconds are useless as a sample
(0.049 of actual on one file), because a 3-second encode reproduces its
requested bitrate to ~99.8% and so says nothing about the file. The
source-byte ratio is worse (15.6x on a black lead-in). Only long concatenated
windows track, and even they are driven by WHERE the expensive content sits
rather than by how much is sampled.

**Why the recommendation was refused:** it raises `requiredStorageBytes` on 42
of 46 corpus combinations — a hard block with no override — while its own text
promises it does not; its longer probe moves `estimatedSeconds` across spec
7.3's bands; its wall budget is checked between windows and so cannot bound the
probe; and it puts its largest new cost inside a pre-flight exchange that
already runs against a hard 180 s deadline.

**What survived and should be kept when this is picked up:** two numbers rather
than one, with the shown estimate never reaching `PreflightInput`; a single
`audioBitrateFor` decision site (a refuter found a third caller the design
missed); and wording that states its own nature — but `requiredStorageBytes`
must round UP, or the block can ask for less space than the gate demands.

**Link:** `tickets/VH-31.md`, workflow `wf_e01102b9-014`.

## 2026-08-26 — VH-51: reviewing the unattended run was worth more than another item

**Decision:** run a 25-agent adversarial review over the night's 14 commits
before the maintainer woke, and fix what it confirmed. 15 findings confirmed,
3 refuted.

**Rationale:** `integrations/task.md` says to suggest `review.md` after a
gateless run, and ten items shipped unattended to a live pilot is the strongest
possible case for it. It found a regression that no test caught and that I would
have reported as a clean night's work.

**The regression.** VH-38 replaced a one-hour job deadline with a 60-second
SILENCE bound, justified by "the encode loop reports every thirty frames". True
— and true of the encode loop alone. `inspectFile`, both `planAudio`
traversals and the post-encode verification emit nothing, and all three scale
with the source. So the fix for a duration cap reintroduced one at a much lower
threshold, on exactly the long jobs the original item existed to protect. Three
lenses found it independently. All three phases report now and the bound is
120 s, matching what `main.ts` already allows a standalone inspection.

**The cancellation hole.** VH-37 moved both lanes onto a derived `AbortSignal`
wired with `addEventListener`. A listener attached to an already-aborted signal
never fires — reproduced in Node — so a cancel landing in the window between the
last `throwIfAborted` and that line was lost and the job encoded the whole file.
One line: check `aborted` after attaching.

**Three of my own claims were false**, and correcting them matters more than the
code fixes because they would have been believed:
- `Promise.all` does not leak an unhandled rejection. `PerformPromiseAll` calls
  `.then` on every element as it iterates. I reproduced it: zero events. The
  real defect is that it rejects early and leaves the loser RUNNING into an
  output being torn down — still worth fixing, but not for the stated reason.
- A test named "leaves no rejection unobserved" could not fail, because the
  detection mechanism does not exist in the test environment. Replaced with one
  that asserts the ordering property that actually matters.
- VH-39's "make three stale claims read true" sweep wrote a FOURTH, which VH-44
  falsified four commits later in the same session.

**What the review cleared** is worth recording too, because absence of findings
is only informative if someone looked: the VH-47 bitrate band's arithmetic and
guards, the VH-20 flush's interaction with the limiter's gain, VH-42's A/V sync,
the one-dependency and no-egress invariants, and VH-49's pre-flight config
matching what the job actually asks for.

**Link:** workflow `wf_c248dbde-11f`; `src/config/thresholds.ts`,
`src/media/pipeline.ts`, `src/media/composite.ts`, `src/media/branding.ts`.

## 2026-08-26 — Pruned project memory: the overnight run's own overflow

**Decision:** Split `decision-log.md` at its read-tier floor — the latest ten
entries stay live, twelve go verbatim to
`archive/decision-log-0001-2026-08-25.md` — and moved a second trajectory phase
to `archive/trajectory/trajectory-0002-real-material-and-band-1.md`.
Trajectory 3,321 → 1,423 words; decision-log 22 → 10 entries.

**Rationale:** both overruns were created by the same overnight run that is now
clearing them, which is the right order — leaving them would hand the next
session a mandatory prune before it could pick up any work. The split points are
the read tier itself for the log, and the end of Band 1's first half for the
trajectory, so what stays live is what a session tomorrow would actually reach
for.

**Verified:** three `diff` runs per file against the intact original — archived
slice, kept header, kept tail — all byte-identical before the swap.

**Link:** `pm_skills/project/archive/INDEX.md`.

## 2026-08-26 — VH-44: detect the property, not the engine

**Decision:** `compose()` reads the branding pixels through
`VideoSample.copyTo` when the engine honours a request for RGBA, and through
the canvas readback when it does not. Which is which is decided by asking
`allocationSize({ format: 'RGBA' })` whether it equals `width x height x 4`.

**Rationale:** the ticket proposed probing a known branding frame at startup and
comparing the returned RGBA against expected values. That works, and it ages
badly: the expected values are the ASSETS' values, so re-running
`build-branding.mjs` would silently invalidate the check that protects the
assets. Asking about the size instead tests the same thing — does this engine
mean RGBA when it says RGBA — and depends on nothing that can drift. Safari
answers 5,184,000 where four bytes per pixel is 8,294,400; Chrome and Firefox
answer exactly.

**The route table, measured rather than assumed:** `copyTo` is correct in
Chrome and Firefox and returns the luma plane in Safari; the canvas readback is
correct in Chrome and Safari and un-premultiplies in Firefox. Neither route is
portable, and their union is. The property check happens to select the correct
one in each — which is the point of choosing a property that describes the
actual failure.

**Scaling had to move.** `copyTo` hands back the frame at its own resolution,
so the canvas is no longer doing the fitting. `compositeSampled` interpolates
bilinearly — correct on PREMULTIPLIED colour, which is the space interpolation
is defined in, and another reason the decoder's own buffer is the right thing
to work from.

**Verified:** `compose()` over black — the maximum-error case — now returns
`(74,74,74)` / `(5,11,18)` in Firefox against a file holding `(73,73,73)` /
`(4,10,17)`, where it returned `(17,17,17)` / `(18,40,66)` before. Chrome and
Safari unchanged. Fifteen unit tests pin the sampler, including that it touches
nothing outside the fit rectangle and interpolates rather than steps.

**Deliberately NOT done:** restoring the two controls VH-45 withdrew. The
engineering is finished and verified, but putting controls back in front of
users on a live site is a decision, and VH-32's interface pass may present them
differently anyway. Raised as VH-46b.

**Link:** `src/media/composite.ts`, `src/spike/alpha.ts`, backlog VH-46b.

## 2026-08-26 — VH-43, and the Firefox audio gap it surfaced

**Decision:** verify the corpus's odd shapes with synthesised fixtures carrying
the same properties, in every engine. Then, on what that found: make
`capability.ts` ask `AudioEncoder.isConfigSupported` and let pre-flight block
with `no-aac-encode`.

**Rationale for synthesising:** `samples/` is gitignored and irreplaceable, so a
check that depends on it runs on exactly one machine. The properties are what
matter — 852x480 is interesting because 852 is not a multiple of 4, not because
of what the lecture is about — and those travel.

**What it found, which was not what it was looking for.** Firefox 154 has the
`AudioEncoder` class and refuses `mp4a.40.2` at every bitrate from 64k to 256k
and at both channel counts, while accepting Opus and every video configuration
we ask for. Measured headless and in a normal window, so not an artefact of
headless mode. `capability.ts` checked that the CLASS existed — a different
question — so a Firefox user passed pre-flight, watched a progress bar, and got
"Something went wrong" when the audio track reached the encoder. Every lecture
with sound, in a browser spec section 10 lists as supported.

**Why block rather than warn:** the alternative to blocking is what already
happened, which is the worst version available — the user spends the encode
time before being told. The message names a browser that works, as every block
in this app must.

**What is deliberately NOT decided:** what Firefox users should get. Blocking is
honest and excludes a supported browser from a University tool; WebM/Opus is
behind D11 and contradicts spec 6.1's MP4; dropping audio is not an option. That
is a product decision, so it is VH-49 with `[sign-off]` rather than something to
settle at 2am.

**A closed-by-condition note:** VH-43 carried a warning that a mono source plus
an opening mixes channel counts into one track. Unreachable — VH-33 removed the
opening control and the real closings are silent — so it is recorded against
VH-23, which is what would revive it.

**Link:** `src/spike/shapes.ts`, `src/spike/codecs.ts`,
`src/media/capability.ts`, `tickets/VH-49.md`.

## 2026-08-26 — VH-16: a harness that had never run the real path

**Decision:** the acceptance harness gains a worker-driven check, a
camera-motion fixture for preset comparison, and takes its loudness offset from
the pipeline's own reported figure.

**Rationale, and the one that matters most:** `OpfsWorkspace.createFile` prefers
a `FileSystemSyncAccessHandle` and falls back to `createWritable()` when one is
unavailable — and sync handles are worker-only. The harness called `runPipeline`
on the main thread, so every acceptance run this project has ever done exercised
the FALLBACK and never the path the app takes. That is the kind of gap that
makes a passing harness worse than none, because it is evidence pointing at the
wrong thing.

**Why camera motion:** on the screen-like default fixture — static background,
one moving box — H.264 predicts almost everything for free, both presets land
within a few percent, and comparing them measures nothing. On a field that
changes everywhere every frame they separate properly: 1223 kB against 468 kB,
38%. The fixture is deterministic rather than random, because a fixture that
differs between runs turns a size comparison into a coin toss.

**The offset was a latent trap.** The harness derived it from
`BRANDING_DURATIONS.openingSeconds` — what the opening is SUPPOSED to be — while
the pipeline uses the clip's actual decoded duration. They agree only because
the placeholder is exactly 5.000 s. A real asset a few frames off would have
shifted every loudness window the harness measured, and the harness would have
gone on passing. `PipelineResult` reports the truth now.

**Link:** `src/acceptance/run.ts`, `src/acceptance/fixtures.ts`,
`src/media/pipeline.ts`.

## 2026-08-26 — VH-38: measure silence, not duration

**Decision:** the `process` request's watchdog resets on every message the
worker sends about it, and gives up only after `WORKER_SILENCE_LIMIT_MS` of
quiet. Giving up posts `cancel` before rejecting.

**Rationale:** the old bound asked the wrong question. "Has this job been
running for more than an hour?" is a duration cap, and spec section 7 opens by
saying there is not one; it also gets slow devices exactly backwards, punishing
the machines that most need patience. "Has this job said anything in the last
minute?" is the question that actually separates a wedged worker from a busy
one, and it is answerable because `pipeline.ts` reports a stage every thirty
frames — so a healthy job speaks several times a second however long it runs.

**The retention half mattered as much.** Rejecting without telling the worker
left the job encoding, its result landing in `finished`, and nothing ever
releasing it. The user was told the job had failed while it quietly succeeded
and held its output for the tab's lifetime.

**Why 60 s:** it only has to exceed the longest gap a HEALTHY job can produce,
and the errors are asymmetric — too patient costs a wedged worker some seconds
nobody is watching, too impatient cancels real work. Recorded in
`thresholds.ts` with that reasoning rather than as a bare number.

**Extracted to be testable:** inline in `requestWithId` this needed a worker and
an hour. As `createWatchdog` it is seven assertions under fake timers, including
the one that is easy to miss — a late sign of life must not resurrect a request
whose caller has already been told it failed and whose worker has already been
sent a cancel.

**Link:** `src/core/watchdog.ts`, `src/config/thresholds.ts`, `src/main.ts`.

## 2026-08-26 — VH-20: emit the tail rather than document the loss

**Decision:** `createContentAudioProcessor` returns `{ process, flush }`, and
`feedAudio` emits the flush after the last source sample.

**Rationale:** the ticket offered a choice — emit the tail, or measure the loss
and record it as accepted. Emitting won on a fact that was not in the ticket:
`AudioChain.flush()` already existed and `analyseSourceAudio` already called it.
So the analysis pass measured the whole signal while the encode path dropped its
last look-ahead window, and the two things that are supposed to describe the
same audio disagreed. Documenting that as acceptable would have meant writing
down that the meter and the output measure different things, when the fix was to
call a method that was already there.

**Testing:** frame conservation — in equals out once the flush is included, and
strictly less before it. That is the invariant the pipeline was breaking, and it
holds without asserting anything about the audio's content.

**Link:** `src/media/audio-plan.ts`, `src/media/pipeline.ts`,
`src/audio/chain.test.ts`.

## 2026-08-26 — VH-40: two of three claims survived checking

**Decision:** `check:placeholders` becomes a `prebuild` script; a Vite plugin
removes `branding/README.md` from the output; the worker sets its own minimum
log level. Sourcemaps stay.

**Rationale for the ordering fix:** the guard exists to stop a real lecture
recording reaching a deployed build — the single most direct protection for the
no-egress invariant — and it ran after `build` in the gate and not at all for a
bare `npm run build`, which is exactly what `.github/workflows/deploy-pages.yml`
calls. A guard that fires after the thing it guards is decoration. As `prebuild`
npm runs it before `build` however `build` is invoked.

**Why the worker needed its own line:** it has a separate module scope, so
`main.ts:32` never reached it. The two threads share one diagnostics bundle, so
a bundle was half verbose and half not.

**Two claims did not survive, and this is the more useful half of the item.**
The spike pages do not ship — `rollupOptions.input` names `index.html` alone and
every `spike-*.html` returns 404 on the live site. And the sourcemaps expose
nothing: the repository is PUBLIC, so every line they reveal is already on
GitHub, while they are what turns a diagnostics bundle from a lecturer's machine
into real function names. Removing them would have cost real diagnostic value to
protect nothing. That decision rests on the repository's visibility, not on the
deploy, so the comment in `vite.config.ts` names the condition to revisit.

**Alternatives:** moving `public/branding/README.md` out of `public/` was
rejected — the notes describe the assets beside them and Vite offers no
per-file exclusion for `publicDir`, so deleting after the copy is the smaller
cost.

**Link:** `package.json`, `vite.config.ts`, `src/workers/job.worker.ts`.

## 2026-08-26 — VH-37: report the disease, not the symptom

**Decision:** Move the `InvalidVttError` case to `handleProcess` and delete it
from the two handlers that cannot raise it. Replace `Promise.all` over the feed
lanes with `settleLanes`, which waits for both, aborts the survivor, and
rethrows the original cause in preference to a `CancelledError`.

**Rationale:** both defects turned a known cause into "something went wrong",
which is the one thing `AGENTS.md` says an error must never do. The VTT check
was in two handlers by copy rather than by reason — `offsetVtt` is called from
exactly one place, `pipeline.ts:293`, which only `handleProcess` reaches. Keeping
the dead branches would have left the next reader believing inspection can
produce a subtitle error.

**The lane bug was two bugs.** `Promise.all` rejects on the first failure and
abandons the second promise, so the survivor kept feeding an `Output` that was
already cancelling and then rejected with nothing awaiting it — and because
`diagnostics.ts` hooks `unhandledrejection`, that reached the user as a second
error they had no way to interpret. The fix has to do both things: observe both
rejections, and stop the survivor rather than merely ignoring it.

**Why the cause is preferred over the cancellation:** when the video lane fails,
the audio lane's `CancelledError` is an EFFECT of that failure. Reporting it
would name the symptom. `settleLanes` picks the first non-cancellation cause and
falls back to cancellation only when that is genuinely all that happened — a
user pressing Cancel, where both lanes raise it and there is no truer cause.

**Extracted to be testable.** Inline in `encode()` this needed WebCodecs to
reach. As a pure function over promises it is seven assertions, including the
one that matters most: that no rejection is left unobserved when both lanes fail
independently.

**Link:** `src/media/pipeline.ts`, `src/workers/job.worker.ts`,
`src/media/lanes.test.ts`.

## 2026-08-26 — VH-42: split the duration that was doing two jobs

**Decision:** `PipelineOptions.durationSeconds` becomes `videoDurationSeconds`
and `audioDurationSeconds`. All branding boundaries key off the picture; the
arithmetic moves to a pure `closingTimeline()` in `branding.ts`.

**Rationale:** the bug was not a wrong sum, it was one name meaning two things.
`SourceReport.durationSeconds` is `max(video, audio)`, and the pipeline treated
it as "how long the picture runs". Splitting the field rather than adding one
made the type checker enumerate all four call sites, which is the difference
between fixing this and fixing it everywhere.

**Why the arithmetic moved out:** it sat inside `encode()`, which needs
WebCodecs, so neither failure was reachable from a Node test — and neither case
exists in the corpus, so nothing would have caught them by being run either. A
defect that no test can express is a defect that comes back. It is fourteen
assertions now.

**What trailing audio does.** It keeps playing under the closing rather than
being truncated at the picture's end. The real closing masters carry no audio,
so nothing collides, and cutting a lecturer's last words to match the picture is
the worse error. If a future master does carry a bed, two sources would write
the same stretch of one track — corruption, not a mix — so the content yields
and takes its fade at the boundary instead. That branch is pinned.

**Alternatives:** holding the last frame to cover the gap was rejected — it
invents a freeze the user did not ask for, where letting audio run under opaque
branding is ordinary. Truncating the audio was rejected as losing content.

**Verified:** unit tests for the arithmetic, plus two synthesised fixtures in
`/spike-modes.html`, since the corpus contains neither shape. Audio two seconds
past the picture yields 8.00 s (old code: 10.08 s, with two seconds of empty
video timeline); a 0.5 s source yields 5.52 s, proving the `over-freeze`
downgrade fired rather than a negative overlay start.

**Link:** `src/media/branding.ts`, `src/media/pipeline.ts`,
`src/media/branding-timeline.test.ts`.

## 2026-08-26 — VH-47: the band may only ever lower the figure

**Decision:** "Best quality" asks for the geometric mean of spec 6.1's anchor
and the source's measured bits-per-pixel-per-frame, clamped to
`[0.03, 0.12]` bpp — the upper bound being the anchor itself. `OutputShape`
gained `bitrateBasis`, and `bitrateWasCappedToSource` now reads it instead of
comparing two numbers.

**Rationale:** VH-41 exempted this preset from the never-exceed-source cap for a
sound reason, but the figure it exempted never looked at the source, so the
headroom was inverted — 4.0x for the file with nothing left to protect. A
geometric mean gives the ratio the shape it should have, `sqrt(anchor/sourceBpp)`,
which shrinks as the source approaches transparency.

**Method:** an eight-agent workflow — one scout, three independent designs, a
judge, three adversarial refuters. It was worth it. The scout found that the
change breaks a test I wrote the day before and that two harnesses
(`acceptance/run.ts`, `spike/real.ts`) never pass a source bitrate, so the rule
would have shipped having run on no real material. Two refuters returned
BLOCKING findings against the judge's own recommendation.

**What the refutation changed.** The judge proposed a 0.18 bpp ceiling, above
the 0.12 anchor. A refuter encoded the real files and scored them: that ceiling
adds 77-933 MB to 7 of 23 corpus files for +0.60 VMAF against a roughly
6-point JND, and raises required free storage by up to 50%, which can turn a job
that runs today into a hard `insufficient-storage` block. Setting the ceiling to
the anchor returns all 7 raises to exactly today's figure, leaves all 16
reductions untouched, and buys a property worth more than the bits: **the figure
can only fall**, so nothing that runs today can be refused tomorrow.

**Half the ticket was retired by measurement.** VH-47 argued two defects — over-
asking on thin sources and under-serving pristine masters. The first is real and
fixed. The second is not a defect: the destination re-encodes on ingest, so the
extra bits die there. The ticket's proposed 1.2x floor would have forbidden the
correct answer on 7 real files.

**Also corrected, found by the scout:** `MAC_EXPORT` in `presets.test.ts` carried
frame rate 25 where the file measures 1000/33 and conforms to 30 — my error from
2026-08-25. At 25 its assertion cleared the cap by 0.16%. And `sourceBpp` must
divide by the SOURCE's rate, not the conformed one; they differ by the conform
ratio, which reaches 15% on a 40 fps source.

**Verified independently:** I re-measured six corpus files with ffprobe rather
than trusting the agents. Teams 1,005,714, AMCS3068 484,914 and Nonreligion
19,105,327 match to the byte.

**Alternatives:** a ratio cap at 2.0x the source (the ticket's, and one
refuter's blocking finding) was NOT adopted. It is unmeasured, and the same
refuter that measured the reductions found today's cuts already visually
transparent; going further would act on argument over evidence. The absolute
50 Mbps backstop was dropped as out of scope — it would change behaviour on a
shape the corpus does not contain, and dropping it makes "never above today's
figure" true universally rather than nearly.

**Open, and deliberately not decided here:** `BEST_SOURCE_BLEND = 0.5` is the
one constant that is judgement. The calibration probe already decodes three
seconds of the real file, so encoding that sample at a spread of multiples and
scoring each through a second encode would measure it — two files at widely
separated densities determine it, a third validates. On the wish-list; the
ticket file was evicted on ship, so this entry is the record.

**Link:** spec §6.1 and §6.2 doc-deltas; `src/config/presets.ts`; workflow
`wf_00530dba-cb8`.

## 2026-08-27 — VH-52: keep the CI bound; explain contention at failure

**Decision:** Keep `testTimeout: 30_000` unchanged. `npm test` now prints one
settled-machine instruction immediately before Vitest, whose default failure
report already names the failing file and includes both file and test-case
durations. A timeout after an unusually long duration is a reason to rerun
idle before changing an assertion or extending the bound; it is not automatic
proof that the test is wrong.

**Rationale:** The 30-second value was measured for a roughly 1.5x CI runner,
whereas local browser contention has stretched a roughly four-second DSP file
to 540 seconds. Enlarging the timeout enough to cover that starvation would
make a genuinely hung test take minutes to report. A custom reporter, wrapper
script or verbose output would add machinery or noise without adding evidence
the built-in reporter lacks. Auto-jazz therefore chose the smallest reversible
quality-gate change and preserved the existing bound.

**Verification:** An intentional `--testTimeout=1` run failed
`chain.test.ts`, printed the new instruction, the 25.9-second file duration and
each case duration. The normal `npm run check` then passed 361 tests plus type,
lint, build, documentation and memory checks.

**Link:** `package.json`; `DEV-INFRASTRUCTURE.md` Quality gate.

## 2026-08-26 — VH-50: output compliance is a postcondition, not advice

**Decision:** A finalized MP4 is not reported as `processed` until its decoded
output audio passes one shared, pure postcondition: finite measurements,
integrated loudness within −16 ±0.5 LUFS, and true peak at or below −2 dBTP.
Missing or non-finite audio on an audio-bearing source is also a failure. The
worker disposes the output through its existing error path; the acceptance
harness calls the same verifier.

**Rationale:** Warning thresholds describe source material and cannot certify
the exported file. The old acceptance criterion measured a synthetic corpus
but defaulted missing measurements to passing values and never made an
out-of-range result fail. That let the harness pass the product's protected
invariant while real material missed it. Integrated loudness is still measured
over content, while true peak is measured over the whole output because the
ceiling applies to branding boundaries too.

**Limit:** This slice makes failure honest; it does not calibrate it away. The
Chromium corpus now reports the two synthetic misses as −1.9968 and −1.9989
dBTP rather than rounding both to a misleading −2.00, while the worker-path
fixture and four other browser criteria pass. A 0.0032 dB miss does not justify
guessing an AAC margin: R-02's confirmed FIR/limiter finalization repair comes
first and crosses protected DSP. VH-50 remains open until that repair lands,
the gain/limiter cause is measured on real material, both figures pass, and the
regression case is pinned.

**Link:** spec §13.2; `src/media/output-verification.ts`;
`src/workers/job.worker.ts`; `src/acceptance/run.ts`.

## 2026-08-25 — VH-24 and VH-41: one visit to the output shape

**Decision:** Two rules the spec already carried and the code did not.
`conformedFrameRate` stops rounding upward below the lowest standard rate, and
`outputShapeFor` caps the smaller preset's request at the source's measured
video bitrate. `inspect` gained `averageBitrateBps` from
`computePacketStats`, and `OutputShape` gained `requestedVideoBitrateBps` so
the cap can be seen rather than inferred.

**Rationale:** the doc-sync put both corrected rules in the spec on 2026-08-25
and deliberately let the spec lead the code by one band. This is that band.
Measuring the bitrate rather than reading the container's declared figure is
the same discipline the frame rate already follows, and for the same reason —
the corpus contains files whose headers say things that are not true.

**The asymmetry is deliberate:** the cap applies to "Smaller file" and not to
"Best quality". Only one of them promises a smaller file; the other goes to
EchoVideo and YouTube, which re-encode on ingest, where headroom above the
source is what keeps a second generation from showing.

**A pinned test was rewritten, not deleted.** `framerate.test.ts` asserted
`conformCost(15).frameRate === 24` with a 0.6 delta ratio — it pinned the
defect. It now pins the rule, with a comment saying so, because a reader
finding the change in `git log` should not have to wonder whether coverage was
quietly dropped to make something pass.

**Found while verifying:** on a silent source the estimate charges 128 kbps for
an audio track the output will not have — 64 kB of an 82 kB figure on a 4 s
fixture. Recorded against VH-31 rather than fixed here; it is that item's
subject and deserves its own test.

**Link:** spec §6.2, §6.3; `src/media/framerate.ts`, `src/config/presets.ts`,
`src/media/inspect.ts`, `src/ui/preflight-panel.ts`.



<!-- FILE: pm_skills/project/archive/trajectory/trajectory-0001-band-0-mvp.md -->

# Trajectory archive 0001 — Band 0 MVP

<!-- Frozen slice of pm_skills/project/trajectory.md, moved 2026-08-25 when the
     live file passed its 2,000-word budget. Append-only: entries are verbatim,
     never rewritten. Cold tier — grep and line-range reads only. -->

## Phase 1 — Band 0 MVP (shipped 2026-08-25)

- VH-1 — Runnable skeleton: the app boots in dev and production, the job
  worker round-trips, and an uncaught throw on either thread is captured and
  surfaced with a stack. `npm run check` runs seven steps green.

- VH-2 — BS.1770-4 loudness meter: gated integrated loudness, momentary and
  short-term curves, LRA per Tech 3342, and 4x oversampled true peak. Pure
  arithmetic, no browser APIs, streaming, and chunk-size invariant. Projected
  3.6 s + 8.8 s for a one-hour stereo file.

- VH-3 — EBU Tech 3341 compliance gate: Table 1 cases 1-6, 9-23 synthesised
  from their published definitions and asserted inside `npm run check`. Worst
  loudness error 0.021 LU against a ±0.1 tolerance; worst true-peak error
  0.265 dB against +0.2/−0.4. Cases 7-8 need the EBU's authentic-programme
  audio and are not run.

- VH-4 — File inspection: Mediabunny demux in the worker reporting resolution,
  rotation, duration, frame-rate metrics, codecs and channels, with VFR taken
  from Mediabunny's own verdict. Files with no video track are rejected rather
  than described. Verified against a MediaRecorder-produced WebM.

- VH-5 — Pre-flight and calibration probe: capability checked against the exact
  encoder config, OPFS quota against 2.5x the projected output, device class,
  and a 3-second decode-and-encode of the real file on the real device. All four
  spec 7.3 outcomes tested. Measured 303 fps on a 720p25 fixture.

- VH-6 — Video pipeline: decode to encode to mux, streaming to OPFS through a
  sync-handle-backed StreamTarget, both presets, with progress and cancellation.
  A VFR source (min 10.4, max 55.6 fps) produced a CFR 30 fps output that plays
  in a real decoder; a 2560x1440 source downscaled to 1920x1080 on the smaller
  preset; cancelling removed the job's scratch entirely.

- VH-7 — Audio chain: high-pass, conditional macro-levelling, gentle
  compression, one linear gain and a true-peak limiter, planned over three
  audio passes so the gain is measured rather than estimated. End to end, a
  -46.83 LUFS source came out at -16.03; a drifting source with LRA 14.36 came
  out at -16.02 with LRA 8.01 and true peak exactly at the -2.0 ceiling.

- VH-8 — Branding conform and concatenation: eight placeholder masters covering
  the four spec 4.2 variants, master selection by frame rate then resolution,
  scale-to-fit with brand-colour padding, and the bed passed through
  unprocessed. A 4:3 source produced a 17.04 s timeline from 5 + 8 + 4, padding
  took a changed D1 token exactly, and the content still measured -15.88 LUFS.

- VH-9 — Subtitle, chapter and metadata handling: an ISOBMFF handler scan finds
  the tracks Mediabunny reports as absent, a sidecar WebVTT is offset by the
  opening duration with its words untouched, and file-level metadata round-trips.
  On a subtitle-bearing MP4, Mediabunny saw 2 tracks and the scan saw 3; the
  muxed sidecar's sample boundaries landed at exactly 7 / 11.5 / 35 / 38.25 s
  against source cues at 2 / 6.5 / 30 / 33.25.

- VH-10 — UI workflow: the spec 5.4 warnings detected and worded, named
  progress stages, always-available cancel, streaming save through the File
  System Access API, and the finished file measured to answer 5.4's
  post-processing row. Absorbs VH-22. The AAA design review found one
  unlabelled section and a 32 px browser-drawn button; both fixed, and the
  audit then reported no target under 44x44 and no unlabelled landmark.

- VH-11 — Acceptance verification: a repeatable in-browser harness against
  spec 13. Four criteria pass, four need a person and are named as such, and
  one fails honestly — audio runs about 50 ms late, now VH-18. The harness
  found two real bugs on its first run: cancelling during the analysis pass
  escaped the pipeline's cleanup and leaked its scratch, and the main-thread
  OPFS path never released its writable.

- VH-18 — A/V sync: the 50 ms audio delay was the AAC encoder's own priming,
  uncompensated because Mediabunny writes no edit list. Measured in isolation
  at AAC 44.0 ms against Opus and PCM at 0. The audio timeline is now shifted
  by the measured delay, and the pipeline adds 0.0 ms at every marker on a
  constant-frame-rate source. Acceptance criterion 6 passes.

Outcome: a static browser-only app that takes a recorded lecture and returns a
branded, correctly-levelled, correctly-encoded MP4, with nothing leaving the
device. Acceptance run: 5 pass, 0 fail, 4 need real material and a person.
See decision-log 2026-08-25.


<!-- FILE: pm_skills/project/archive/trajectory/trajectory-0002-real-material-and-band-1.md -->

# Trajectory archive 0002 — real material, and the first half of Band 1

<!-- Frozen slice of pm_skills/project/trajectory.md, moved 2026-08-26 when the
     live file passed its 2,000-word budget for the second time. Covers the
     arrival of the real corpus and branding masters, the deploy, the
     three-engine alpha divergence, and Band 1 from VH-45 through VH-47.
     Verbatim; append-only. Cold tier — grep and line-range reads only. -->

## 2026-08-25 — Real material arrives

The maintainer supplied the test corpus (VH-M1) and the branding masters. Both
changed the picture rather than confirming it, so nothing was built this
session; the findings were recorded and the affected tickets reopened.

The corpus (26 files, 16 GB, 20 lecture sources) shows the awkward input is the
common case: 30.303 fps screen recordings, declared frame rates that disagree
with actual ones by ~1%, 16:10 geometry, mono and PCM audio, mixed sample
rates, and two files with no audio at all. VH-24 carries the detail.

The branding masters are `qtrle`/`argb` — a codec WebCodecs cannot decode —
carry a 1.00 s alpha ramp meant for compositing rather than concatenation,
have no audio bed, and ship as one 4K25 master in four styles rather than the
four resolution variants the spec anticipated. VH-12 was reopened as a
sign-off item; the boundary modes it implies are VH-22.

### Loudness meter verified at 16 kHz

The Teams recording's audio is 16 kHz mono — a third of the rate the meter was
validated at, and far enough outside EBU Tech 3341's 48 kHz signals that the
K-weighting derivation could plausibly have drifted. Checked against ffmpeg's
`ebur128` over the first 180 s:

| | integrated | LRA |
| --- | --- | --- |
| ffmpeg, native 16 kHz | −20.9 LUFS | 12.8 LU |
| ours, native 16 kHz | −20.88 LUFS | 12.8 LU |
| ffmpeg, resampled 48 kHz | −21.0 LUFS | 12.8 LU |
| ours, resampled 48 kHz | −20.97 LUFS | 12.8 LU |

0.02–0.03 LU from the reference at both rates, with LRA matching exactly.
Deriving the K-weighting coefficients analytically per sample rate, rather than
hardcoding the 48 kHz set, is what makes this hold — the choice made in
`kweighting.ts` during VH-3 paid off on material that did not exist yet.


### VH-12 — real branding, end to end

The masters were not the file swap the item assumed: `qtrle`/`argb`, which no
browser decodes; a 1.00 s premultiplied-alpha build meant for compositing
rather than concatenation; no audio bed; and one 4K25 master where the spec
expected a matrix of four.

What shipped instead: a build-time transcode (`scripts/build-branding.mjs`)
producing eight 1 s onsets as VP9+alpha WebM and four 4 s tails as H.264 —
twelve files, 0.74 MB, against the ~100 MB first estimated. Two tails rather
than four, because Fade and Slide are byte-identical after the build within a
colour, which the maintainer confirmed was deliberate. Tails are H.264 on
purpose: hard cut uses only the tail, so that mode survives anywhere alpha
decode does not.

Three findings were worth more than the code. The alpha is premultiplied, so
the composite is `brand + source×(1−a)` and the conventional straight-alpha
form double-darkens — measured, not reasoned: canvas `drawImage` returns 202
where 255 is correct, so the blend had to stay on the CPU. Source and build
frames pair by timestamp, never frame order, because the build is 25 fps and
sources are not. And the freeze must hold the last CLEAN frame, distinguishing
a defect from a deliberate fade — a trend needs two significant steps one way,
a flash is a single jump.

Verified in a browser at each step rather than by compiling: alpha survives
decode, all three modes produce their promised timelines (+3.97, +3.97, +4.97
against 4/4/5), and the build is fetched only for the modes that composite it —
duration alone would not have caught a silent fallback. Safari and Firefox
remain unverified; `/spike-alpha.html` exists so that check is one URL.

### Deployed, and verified in the browsers that mattered

The app went live at `djdaojones.github.io/UoN-Video-Helper/` on 2026-08-25 as
an unadvertised pilot; the intended home is an internal server. The WebCodecs
decision is what made GitHub Pages viable at all — no `SharedArrayBuffer`
means no COOP/COEP headers, which Pages cannot set.

Chrome 151 and Safari 26.5.2 both decode VP9 alpha, through the app's own
loader, so all three closing modes work in both. Firefox is still unchecked.
Both browsers independently return `drawImage -> R=202` on the premultiplied
onset, confirming that treating that colour as straight is standard canvas
behaviour rather than one engine's quirk — the CPU composite is necessary
everywhere, not a workaround for Chrome.

The first real job on the deployed site worked. It also exposed two things the
harness could not: the size estimate overstates by 3.6x (VH-31), and the
interface needs a deliberate design pass rather than tweaks (VH-32).

### All three engines verified — and they disagree

Firefox joined Chrome 151 and Safari 26.5.2 in decoding VP9 alpha through the
app's own loader. Decode is all that proved: VH-34 later measured the PIXELS
and found the two compositing modes wrong in Firefox (see below).

The same runs found something worth more than the pass. Compositing the onset
over white via `drawImage` returns 202 in Chrome and Safari but **255 in
Firefox**, on 152 and again on 154 two major versions later: the engines
genuinely disagree about whether a decoded frame's colour is premultiplied, and
it is not a regression on its way out. 255 is the correct answer, so Gecko is
the one in the right — but a composite that is correct in one engine and
double-darkened in the other two is unusable, and no `drawImage` call is
portable. Doing the blend on the CPU in `composite.ts` was chosen when only
Chrome had been measured, and it was right to move; it was not sufficient.

A smaller difference in the same output: asking for exactly t=0.40 s returned
the neighbouring frame in Firefox. Invisible at 40 ms, but a reminder not to
key logic off exact multiples of the frame period.

The deployed site was also confirmed working on a University machine, so
`github.io` is not filtered there — the last unknown in VH-14's technical half.

### VH-22 — the three boundary modes, closed

- VH-22 — Closing boundary modes shipped with VH-12 and closed on review
  2026-08-25: `hard-cut`, `over-picture` and `over-freeze` live in
  `config/branding.ts`, `pipeline.ts` and `freeze.ts`, hard cut is the default
  and the alpha-decode fallback, the freeze holds the last CLEAN frame rather
  than the last decoded one, and all three DECODED in Chrome 151, Safari 26.5.2
  and Firefox 152 — which is not the same as compositing correctly, as VH-34
  found. Two clauses outlived the code and moved rather than closing: the
  fade-out defaulting on for hard cut only went to VH-25, and the unguarded
  negative overlay start on a sub-1-second source went to VH-42.

### VH-45 — the transition controls withdrawn

- VH-45 — Shipped 2026-08-25, hours after VH-34 measured the defect: the "How
  the logo arrives" and "Animation" fieldsets are gone from `index.html`, so
  every job takes the hard cut that was already the default. Animation went
  with them — Fade and Slide differ only during the build a hard cut discards.
  `chosenBranding` already fell back to `CLOSING_DEFAULTS`, so the pipeline
  keeps all three modes for VH-44 and nothing else moved.

### VH-46 — the three-engine check, repeatable

- VH-46 — Shipped 2026-08-25: `scripts/run-in-engines.mjs` runs a spike page in
  Chrome (CDP), Firefox (WebDriver BiDi) and Safari (`safaridriver`) and prints
  all three. It knows only the `<pre id="log">` … `done` contract the spike
  pages share, so it works on any of them. Documented in DEV-INFRASTRUCTURE
  with the reason it must stay out of `npm run check`. The same run also
  cleared 15 missing file-map roles and the two glob lines the generator could
  not resolve.

### VH-35 — a second tab no longer deletes the first tab's work

- VH-35 — Shipped 2026-08-25. A live job now holds an origin-wide Web Lock on
  its scratch directory and the sweep removes only what nobody holds, so a
  second tab's boot sweep leaves an in-flight job and an unsaved result alone.
  Directory names gained a per-tab session prefix, which also stops two tabs
  both opening `job-1`. The three-engine check found two more: a sweep abandoned
  every remaining orphan after one undeletable directory (Firefox), and
  `dispose` on the cancel path was never exercised. Both fixed; all three
  engines pass `/spike-opfs.html`.

### VH-36 — the screen locks while a job runs

- VH-36 — Shipped 2026-08-25. Start and Cancel are built once at module scope
  and never replaced, so a preset change no longer detaches the running job's
  Cancel or hands back an enabled Start; the cancel listener is bound once
  rather than per Start click. One `setJobInFlight` flag disables the file,
  subtitle, preset and branding controls for the duration — the state model
  VH-32 inherits. Also fixed what made the lock invisible: `.button` set its own
  colours, so a disabled Start looked identical to a live one, and a disabled
  file input still drew a blue `::file-selector-button`.

### VH-33 — the opening control withdrawn

- VH-33 — Shipped 2026-08-25. The "Add the opening sequence" checkbox and its
  "leave this off" helper text are gone from `index.html`; the job spec passes
  `opening: false` and the pipeline's opening path is untouched for VH-23. The
  placeholder assets stay on disk and keep shipping, which is harmless: they
  render the words "PLACEHOLDER — opening — 1080p25" and carry no University
  branding, so the risk was only ever putting one INTO a video.

### VH-24, VH-41 — the output shape stops lying about the source

- VH-24 — Shipped 2026-08-25. `conformedFrameRate` withdraws the
  round-to-nearest-standard rule below 24 fps, so a Teams recording stays at its
  measured 16.000 instead of becoming 24 with half its frames duplicated. Above
  the floor nothing changes: a PowerPoint export at 30.303 still conforms to 30.
  The test that pinned the old behaviour was rewritten to pin the new rule
  rather than deleted.
- VH-41 — Shipped 2026-08-25. `inspect` now measures the source's real video
  bitrate from its packets, and the smaller preset's request is capped at it, so
  the preset named for making files smaller can no longer inflate one. The cap
  is stated in the preflight panel in plain language rather than applied
  silently. Deliberately not applied to "best quality" — that preset's
  destinations re-encode on ingest, where headroom is what prevents generation
  loss. Verified in the browser on a synthesised 16 fps source: output reads
  "640 × 360 at 16 fps" and the estimate falls from 324 kB to 82 kB.

### VH-47 — best quality stops ignoring the source

- VH-47 — Shipped 2026-08-26. The "best quality" bitrate is the geometric mean
  of spec 6.1's `pixelRate x 0.12` anchor and the source's own measured density,
  bounded below at 0.03 bits/pixel/frame and ABOVE AT THE ANCHOR — so the rule
  can only ever lower the figure, never raise it. Teams falls 3.98 to 2.00 Mbps
  (still 1.99x its source), the thinnest corpus file falls to a quarter of
  today, and a well-encoded master is left exactly where it is. Designed and
  adversarially verified by an eight-agent workflow which measured all 23 corpus
  sources with ffprobe and scored real encodes; two of three refuters returned
  blocking findings and the design shipped is the corrected one. Half the
  ticket's diagnosis was retired by measurement: raising a pristine master's
  bitrate buys +0.60 VMAF for up to 933 MB, below the perceptual threshold.
  `bitrateBasis` replaced the figure comparison that decided the pre-flight
  cap message, which would otherwise have announced "already compressed as far
  as this setting would take it" over outputs running at twice the source.



<!-- FILE: pm_skills/project/archive/trajectory/trajectory-0003-review-remediation-and-band-1-close.md -->

# Trajectory archive 0003 — the review remediation, and Band 1's close

<!-- Frozen slice of pm_skills/project/trajectory.md, moved 2026-08-27 when the
     live file passed its 2,000-word budget for the third time. Covers VH-50
     and VH-54 closing the output contract on real material, the 2026-08-26
     repository-review remediation run (VH-37..VH-53), and the overnight
     self-review VH-51. Verbatim; append-only. Cold tier — grep and line-range
     reads only. -->

### VH-50, VH-54 — the output contract holds on real material

- VH-54 — Shipped 2026-08-27. The true-peak interpolator is drained at end of
  stream and the limiter clocks its tail out through the normal detection and
  gain path, so a transient in the final frames is measured and limited instead
  of reading −64 dBTP and leaving at 0. See decision-log.
- VH-50 — Shipped 2026-08-27. The step 5 gain is solved against the chain that
  limits, and the limiter holds 1.0 dB below the published ceiling for our own
  AAC encode. Four real lectures now meet −16 ±0.5 LUFS and −2.0 dBTP; before,
  none met both. The acceptance harness calls the product's own solver and
  carries a real-shaped crest-factor case. See decision-log.

### VH-52 — DSP timeout failures carry their operating context

- VH-52 — Shipped 2026-08-27. The 30-second test timeout remains the measured
  CI bound; test output now pairs Vitest's file/test durations with an explicit
  settled-machine rerun instruction, so contention is legible without turning
  a genuinely hung test into a minutes-long wait. See decision-log.

### VH-53 — one project contract for both coding agents

- VH-53 — Shipped 2026-08-26. Claude Desktop Code now imports the same root
  `AGENTS.md` that Codex loads; tool-managed memories remain local recall aids,
  not the shared project record. See decision-log.

### VH-42 — branding boundaries measured against the picture

- VH-42 — Shipped 2026-08-26. `PipelineOptions.durationSeconds` was
  `max(video, audio)` and every branding boundary keyed off it; it is replaced
  by `videoDurationSeconds` plus `audioDurationSeconds`, which made the compiler
  find all four call sites. The arithmetic moved out of the pipeline into a pure
  `closingTimeline()` so the defect is unit-testable at all — it needed WebCodecs
  to reach before. A source shorter than the build now degrades to `over-freeze`
  and logs why instead of computing a negative start, and trailing audio plays
  under the closing rather than opening a video gap ahead of it, unless the
  closing master carries a bed of its own. Both cases are synthesised fixtures in
  `/spike-modes.html`: audio two seconds past the picture produces 8.00 s where
  the old code gave 10.08 s, and a 0.5 s source produces 5.52 s via the freeze.

### VH-39 — three claims that had stopped being true

- VH-39 — Shipped 2026-08-26. `README.md` said "Foundation set, build not
  started" on the front page of a deployed app; it now says what the pilot is
  and names the two things withdrawn from it (VH-33, VH-44).
  `src/media/branding.ts` described the transition modes as not built; they
  shipped with VH-22. `presets.ts` commented `avc1.640033` as "level 4.2" where
  `0x33` is 51 — level 5.1 — and the comment was wrong in the direction that
  matters, since 4.2 tops out below the 4K sources spec §2 contains.

### VH-37 — failures that name themselves

- VH-37 — Shipped 2026-08-26. `InvalidVttError` was checked in `handleInspect`
  and `handlePreflight`, neither of which parses VTT, and not in
  `handleProcess`, which is the only path that reaches `offsetVtt` — so a
  malformed sidecar surfaced as "something went wrong". The check moved to
  where the throw is and the two dead ones are gone. And the two feed lanes now
  fail together: `Promise.all` left the survivor pushing into a cancelling
  `Output`, and its later rejection reached the user as a second, unexplained
  entry in the errors panel via `diagnostics.ts`'s `unhandledrejection` hook.
  `settleLanes` waits for both, aborts the survivor, and reports the cause
  rather than the cancellation it triggered — extracted so it is testable
  without WebCodecs.

### VH-40 — the guard runs before anything is written

- VH-40 — Shipped 2026-08-26. `check:placeholders` — the safeguard that stops a
  real lecture recording being copied into a deployed build — ran AFTER `build`
  in the gate, and not at all for a bare `npm run build`, which is what the
  deploy workflow calls. It is now a `prebuild` script, so nothing can write
  `dist/` without it. A small Vite plugin drops `branding/README.md` from the
  output, which the live site was serving with its ticket IDs. The worker now
  sets its own log level: it has a separate module scope, so `main.ts` never
  reached it and every debug line reached a production console.
- Two of the item's claims did not survive checking, and both are recorded
  rather than "fixed": the spike pages do not ship (every `spike-*.html` 404s),
  and the sourcemaps expose nothing, because the repository is public.

### VH-20 — the audio chain's tail is emitted

- VH-20 — Shipped 2026-08-26. `AudioChain.flush()` already existed and the
  encode path never called it, so every job lost the limiter's look-ahead window
  from the end of its audio. `createContentAudioProcessor` returns
  `{ process, flush }` and the pipeline emits the tail after the last sample.
  The inconsistency was sharper than the 5 ms suggests: the ANALYSIS pass
  already flushed, so loudness was being measured over audio the output did not
  contain. Pinned by a frame-conservation test — in equals out, flush included.

### VH-38 — the one-hour ceiling removed

- VH-38 — Shipped 2026-08-26. The `process` request carried a 3,600,000 ms
  deadline on the whole job — a duration cap of exactly the kind spec §7 opens
  by disclaiming — and it rejected WITHOUT telling the worker, so the job ran on,
  finished, and held its output in the `finished` map while the user was told it
  had not finished. The watchdog now measures SILENCE: `pipeline.ts` reports a
  stage every thirty frames, so a healthy job speaks several times a second
  however long it runs, and `WORKER_SILENCE_LIMIT_MS` (60 s) catches a wedged
  one. Giving up posts `cancel` first, so nothing is retained. Extracted as
  `createWatchdog` and pinned with fake timers, including that a late progress
  message cannot resurrect a request whose caller has already been told it
  failed.

### VH-16 — the harness covers the path the app takes

- VH-16 — Shipped 2026-08-26, all three gaps closed. The harness now runs a
  fixture through the WORKER, which is the only way to reach OPFS's
  sync-access-handle path — every previous run had exercised the
  `createWritable` fallback and never the real one. Preset comparison moved to a
  new camera-motion fixture, where the two presets land at 1223 kB and 468 kB
  (38%); on the screen-like default H.264 predicts nearly everything and the
  comparison measured nothing. And the loudness window takes its offset from
  `PipelineResult.contentOffsetSeconds` rather than
  `BRANDING_DURATIONS.openingSeconds` — the pipeline offsets by the clip's
  actual decoded duration, and the two agreed only because the placeholder is
  exactly 5.000 s.

### VH-43 — the odd shapes reach a correct output, and Firefox does not

- VH-43 — Shipped 2026-08-26. `/spike-shapes.html` runs the awkward properties
  the real corpus has — 852x480, 4:3, 16:10, mono, 44.1 kHz, and no audio —
  through the pipeline and checks each for distortion, dimension parity, sample
  rate conform and channel preservation. ALL PASS in Chrome and Safari.
  Synthesised rather than the real lectures so it runs anywhere rather than only
  on the maintainer's machine. The mono-plus-opening channel-count note is
  recorded as closed by condition: VH-33 removed the opening control and the
  real closings are silent, so nothing can mix counts until VH-23 restores
  openings, and it is named on that item.
- It also found something much larger. Firefox 154 refuses to encode AAC at any
  bitrate, so every lecture with sound failed mid-job in a browser spec §10
  lists as supported. `capability.ts` now asks
  `AudioEncoder.isConfigSupported` and pre-flight blocks with `no-aac-encode`
  before a job starts, naming a browser that works. What Firefox users should
  actually get is VH-49, and needs a person.

### VH-44 — the composite agrees in all three engines

- VH-44 — Shipped 2026-08-26. `compose()` now reads the branding pixels with
  whichever route the engine actually honours: `VideoSample.copyTo` where a
  request for RGBA is respected, the canvas readback where it is not. Firefox
  over black went from `(17,17,17)` and `(18,40,66)` — white inverted, blue
  3.7x too bright — to `(74,74,74)` and `(5,11,18)`, against a file holding
  `(73,73,73)` and `(4,10,17)`. Chrome and Safari unchanged and still correct.
- The engine is identified by a PROPERTY rather than a table or a pixel
  comparison: ask `allocationSize` for RGBA and check it equals `width x height
  x 4`. Safari answers 5,184,000 where the answer is 8,294,400, which is it
  saying it will not honour the format. No expected-colour constants, so
  re-rendering the masters cannot invalidate the check.
- `copyTo` returns the frame at its own resolution, so scaling moved out of the
  canvas into `compositeSampled` — bilinear, which is well-defined on
  premultiplied colour and is exactly why the decoder's own buffer is the right
  thing to interpolate.
- The controls stay withdrawn. The engineering is done and verified; putting
  them back in front of users is a decision, raised as VH-46b.

### VH-51 — the overnight run reviewed itself, and found a regression

- VH-51 — Shipped 2026-08-26. A 25-agent adversarial review of the night's 14
  commits confirmed 15 defects and refuted 3. The worst was mine: VH-38's
  60-second SILENCE watchdog rested on "the encode loop reports every thirty
  frames", which is true of the encode loop and of nothing else. Inspection,
  both audio-analysis traversals and the post-encode verification each emitted
  nothing and each scale with the source — so a long job could sit silent and be
  cancelled for being slow, which is the duration cap spec §7 disclaims,
  reintroduced at a lower threshold. All three now report; the bound is 120 s.
- Also fixed: a cancel arriving between the last checkpoint and the lane
  controller was lost outright, because a listener attached to an
  ALREADY-aborted signal never fires (reproduced in Node); `honoursRgbaReadback`
  compared `allocationSize` against CODED dimensions where it measures the
  VISIBLE rect, so a padded master would have failed closed onto the
  Firefox-broken path and quietly undone VH-44; `timelineSeconds` added the
  audio overrun on top of the closing instead of taking the later of the two
  tracks; and `compositeSampled` had dropped the opaque and transparent fast
  paths, costing ~133 M reads a frame at 4K.
- Three claims the run made were false and are corrected rather than quietly
  dropped: `Promise.all` does NOT leak an unhandled rejection (reproduced —
  zero events), so VH-37's recorded root cause was wrong; a test named for that
  mechanism could not fail and is replaced; and VH-39's "stale claims" sweep
  wrote a fresh stale claim that VH-44 falsified four commits later.


<!-- FILE: pm_skills/project/backlog.md -->

# Backlog

<!-- OPEN WORK ONLY. Status: [ ] todo  [~] in progress  [-] cut. -->
<!-- Shipped work does NOT stay here. On ship: add one line to
     trajectory.md (the outcome) + an entry to decision-log.md (the why),
     then remove the item from this file. There is no Completed section. -->
<!-- Hot sectional. Agents read the Active section only by default. -->

## Active

<!-- BANDS. Band 0 (VH-1..VH-11, VH-18, VH-12, VH-22, VH-M1) shipped
     2026-08-25 and the app went live as an unadvertised pilot. Bands are
     ordered; within a band, order is dependency-driven, not by ID, and each
     item says what it waits on. Maintainer work is never band-gated — see
     Standing. Why these bands: decision-log 2026-08-25 "Band 1".
     VH-54..VH-68 came from an external repository review (2026-08-26) and its
     two critiques. All three documents live in `reviews/2026-08-26/`, which is
     the detail source for those items — cite the R-number rather than
     restating the evidence here. Findings were re-verified against source
     before banding; where the review's own remedy was shown unsafe, the item
     says so. -->

### Band 1a — The output is what we say it is (signed off 2026-08-25)

<!-- Committed. Everything a staff member meets today that is wrong,
     misleading, or a risk. VH-54, VH-50 and VH-58 shipped 2026-08-27 and the
     output contract now holds on real material, and VH-56 shipped with it so
     a finished file survives the next click and VH-57 made every phase answer
     Cancel, VH-55 made its onset loss visible and VH-59 made track loss
     visible. What remains of 1a is VH-55's second half, which waits on VH-62's
     sync meter. -->

- [~] **VH-55 Source onset can be replaced by encoder priming** (2026-08-27)
      Intent: R-03. `AudioTimelineShift.apply()` drops AAC samples landing
      before timestamp zero. Sync survives; content does not — three files in
      the real corpus carry energy in their first 44 ms.
      Done 2026-08-27: the probe distinguishes an unmeasurable encoder from a
      zero-delay one, and a discarded onset above −50 dBFS now raises a visible
      `onset-trimmed` warning, so the loss is no longer silent.
      Remaining: stop discarding it. Delay the VIDEO by the encoder delay
      instead — Mediabunny writes the empty edit list — which is ~6 lines
      across four timestamp sites. UNBLOCKED 2026-08-27: VH-62 put the sync
      meter on one clock, so the change can now be measured. The open question
      the measurement answers is whether Mediabunny's demuxer applies a video
      edit list to the timestamps it reports; if it does not, the meter cannot
      grade the change even though players would honour it.
      Done when: no source sample is discarded, and a sync meter that measures
      both tracks on one clock says so.

### Band 1b — Decisions the maintainer owns (signed off 2026-08-25)

<!-- Committed work that cannot proceed without a product call. Listed apart
     from 1a so agent work is never read as waiting on these. -->

- [ ] **VH-19 Content-adaptive bitrate for the smaller preset**
      Intent: spec §6.2 sets ~1.5 Mbps for slides and ~2.5 Mbps for camera.
      `ContentClass` exists and `outputShapeFor` already takes it; nothing sets
      it, so every job uses the higher figure.
      Blocked 2026-08-27 by a measurement, not by missing code. Mean absolute
      inter-frame difference on a 64x36 luma, four points through five real
      lectures:

      | File | 0% | 25% | 50% | 75% |
      | --- | ---: | ---: | ---: | ---: |
      | AMCS3059 | 0.00 | 0.25 | 0.00 | 0.00 |
      | CULT1027 | 0.00 | 1.86 | 1.35 | 1.58 |
      | MLAC 3139 | 0.00 | 0.01 | 0.02 | 0.32 |
      | AMCS2007 | 0.00 | 0.00 | 0.00 | 0.68 |
      | Engineering Placements | 0.01 | 0.09 | 0.30 | 0.00 |

      Camera content separates cleanly from slides — 1.35–1.86 against
      ≤0.68 — but **every file reads 0.00 at the start**, because a lecture
      opens on a title card. The calibration probe samples exactly there, so
      classifying from its existing window would call every source "screen",
      including the one that is plainly camera. That is the 40% bitrate cut
      applied to the content that most needs the bits, decided silently.
      Done when: the class comes from a sample that is representative — several
      points through the file, in a pass separate from the timed probe so it
      cannot re-calibrate `videoFramesPerSecond` — the threshold is set from
      more than five files, and the chosen class is stated in plain language.
      Note: mis-classifying camera as screen costs picture quality; the reverse
      costs only file size. The threshold must be biased accordingly.

### Band 2 — The edges hold

<!-- Not committed. Known gaps not currently biting anyone, plus review
     findings that are real but not user-facing today. VH-62 earns promotion
     into Band 1a the moment Band 1a's pipeline changes turn out large: a
     harness with false-pass routes matters far more when the pipeline moves. -->

- [~] **VH-62 The acceptance harness has false-pass routes** (2026-08-27)
      Intent: R-11. Criterion 2's missing-measurement and cropped-peak routes
      closed 2026-08-27.
      Done 2026-08-27: criterion 3 no longer claims a `pass` this page did not
      run (`external`); the sync meter reads both tracks on one clock, which
      unblocks VH-55; the worker's realm is watched and merged, so the branding
      fetch is visible at all; and a negative control proves the egress
      instrument fires on both body shapes.
      Remaining: resource warnings still do not fail a run; a complete run
      takes over an hour in a browser — four minutes per synthesised corpus
      entry, in-process on the main thread — so nobody sits through it, which
      is its own false-pass route (see wish-list).
      Done when: the harness cannot report green on an unexecuted or unmeasured
      invariant, an injected defect turns it red, and a run is short enough
      that it is actually run.

- [ ] **VH-17 Evaluate `fastStart: 'reserve'` for the smaller preset**
      Intent: the "smaller file" preset goes to OneDrive and SharePoint, where
      students may stream it. `fastStart: false` puts the moov box at the end,
      which can force a full download before playback starts.
      Done when: `'reserve'` is adopted with a packet count derived from the
      CFR grid plus a margin and verified on a real SharePoint upload, or the
      current behaviour is confirmed adequate and the reason recorded.
      Scope: `'in-memory'` is not an option — it reinstates the memory ceiling.
      Maintainer 2026-08-27: **EchoVideo (Engage) is the key platform**, and it
      re-encodes on ingest — so the moov position cannot reach a viewer there
      at all, on either preset. That removes the stakes from the path most
      videos take and leaves this a secondary-path question about OneDrive and
      SharePoint only. Still worth the upload test he can run within the week;
      no longer worth designing around before it.
      Note: it also means most jobs should be taking "Best quality", which is
      already the default and already what §6.1 names for EchoVideo.

### Band 3 — New capability, or waiting on material

<!-- Not committed. VH-26 waits on material; the other two wait on a scoping
     pass. VH-23 went to the icebox 2026-08-27. -->

- [ ] **VH-26 Mobile phone sources** [detail](tickets/VH-26.md) (2026-08-25)
      Intent: staff may upload phone footage and none was in the corpus.
      Rotation was traced end to end and is correct.
      Material acquired 2026-08-27 — five samples in `samples/phone/`, covering
      HLG 1080p, Dolby Vision 4K60, 8-bit 4K30 and a legacy 3GP.
      The central fear did NOT reproduce: HLG and Dolby Vision both round-trip
      in Chrome with luma percentiles within two units of the source, because
      the browser tone-maps on decode and the pipeline encodes what it is
      given. Chrome decodes HEVC Main 10 at 1080p and 4K60.
      Done when: Firefox is checked — the question there is whether an
      undecodable HEVC source hits VH-60's `no-source-decode` block cleanly,
      not whether the colour is right — and portrait branding composition is
      specified against a portrait sample, which the corpus still lacks.

- [ ] **VH-30 Trim the source** [detail](tickets/VH-30.md) (2026-08-25)
      [sign-off]
      Intent: maintainer request. Recordings carry material nobody wants and
      today the only fix is another tool first, which defeats a one-step app.
      Ranged reads are native to Mediabunny; the work is the interactions. The
      one that matters most: loudness must measure the TRIMMED region, or
      leading silence drags the gated figure.
      Done when: scoped and signed off — recorded rather than scheduled.

### Standing — maintainer-owned, never band-gated

<!-- Human work, not agent work. Listed apart from the bands precisely so it
     cannot be read as waiting on one. -->

- [ ] **VH-M2 Measure the device envelope** [maintainer] (2026-08-24)
      Intent: spec §7.4 — published limits come from measurement, and this
      closes D8.
      Done when: 5 / 20 / 60 minute jobs at 720p and 1080p are timed on a
      managed University laptop, a modern MacBook and a low-spec Windows
      device.
      Maintainer 2026-08-27: a 60-minute recording within the week; the
      three-device timings in about six weeks.
      First figure (2026-08-25, this MacBook): 1080p, 215 s of silent slides,
      "best quality" — 34.2 s, or **6.3x real time**. The 29.25-minute Teams
      recording covers the 20-minute case; 60 minutes needs material as well as
      a device.

- [ ] **VH-14 Deployment** [maintainer] (2026-08-24)
      Maintainer 2026-08-27: the intended home is a UoN-hosted web app in the
      shape of <https://xerte.nottingham.ac.uk/play_56450> — a University
      server, University URL, no public GitHub Pages. D5 answered in principle;
      what remains is who provisions it.
      Intent: Pages is viable — no COOP/COEP needed, and asset URLs derive from
      `import.meta.env.BASE_URL`. What is unsettled is whether it should stay
      there: a Pages site on a personal account is public and serves UoN
      branding from `djdaojones.github.io`. Public hosting was accepted for an
      unadvertised pilot; the intended home is an internal server.
      **Every push to `main` deploys** — there is no separate act of
      publishing. VH-65 hardens that boundary.
      Done when: the move to internal hosting is planned and the cache strategy
      for offline-after-first-load is in place.

### Launch milestone

- [ ] **VH-13 Published limits copy** [blocked: VH-M2] (2026-08-24)
      Turn the measured envelope into user-facing wording. Closes D8. Also
      waits on VH-31: publishing figures derived from an estimate that
      overstates would publish the same error.

### Icebox

<!-- Post-triage. Deferred deliberately; each has a revisit trigger in
     docs/03-open-decisions.md. -->

- [ ] **D9 Pumping detection on pre-existing audio** — unreliable to
      measure; a false accusation is worse than silence. Revisit if staff
      report a gap the current warnings miss.
- [ ] **D11 WebM output** — supported by the muxer, not exposed. Revisit if
      a destination platform requires it. VH-49 decided AGAINST it for Firefox
      on 2026-08-27; VH-69 is the pathway if that is ever reopened.
- [ ] **VH-23 Opening graphics** (2026-08-25)
      Intent: the MVP is closing-only. Cut to the icebox 2026-08-27 — the
      maintainer's position is that openings are for external, brand-
      recognition-first video, and this tool is internal, where a closing is
      the norm. Not to be addressed until far later in the product's life.
      The pipeline path is dormant rather than deleted: `loadBrandingClip`
      refuses an opening and returns `null`, the generated placeholders are
      gone from `public/branding/`, and the timeline still speaks in terms of
      an opening duration that is currently zero.
      Revisit when approved opening assets exist AND there is a reason to want
      them. They need VH-22's three boundary modes mirrored, and a mono source
      plus a stereo opening mixes channel counts into one audio track (VH-43).
- [ ] **VH-69 A pathway for Firefox users** (2026-08-27)
      Intent: VH-49 blocks Firefox for any source with audio and names a
      browser that works, which is honest but excludes a supported browser from
      a University tool. A pathway would be WebM/Opus (D11) or an Opus-in-MP4
      variant, either of which is a second output contract to specify, test and
      explain. Low priority: the block is correct today and the message is
      clear.
      Revisit if staff report being stuck on Firefox, or if D11 opens for
      another reason.
- [ ] **VH-70 The manual gates nobody has run** (2026-08-27) [maintainer]
      Intent: four checks no automated harness can reach — a job running while
      the device sleeps and wakes, the progress bar under a screen reader, a
      throttled multi-gigabyte fallback download completing, and an output
      accepted by EchoVideo's ingest. Each covers something already built and
      believed to work; none has been confirmed by a person.
      Revisit when there is a real pilot user, or before VH-13's published
      limits go out.
- [ ] **D12 Custom or per-department branding** — needs a governance answer
      for who approves a variant before it needs an implementation.
- [ ] **D13 Batch processing** — the most likely first request from anyone
      with a module's worth of recordings. Revisit when v1 is in use.
- [ ] **VH-27 EBU Tech 3341 cases 7 and 8** — the authentic-programme segments,
      which the EBU distributes as audio and cannot be synthesised. Would need
      the files checked in as gitignored fixtures. Cases 3-5 already cover the
      same gating behaviour.
- [ ] **VH-28 TypeScript 7** — blocked on typescript-eslint supporting `>=6.1.0`.
      A one-line change to the pin when it does.
- [ ] **VH-29 Full embedded-subtitle extraction** — would need a bespoke MP4 box
      walker for `tx3g` / `wvtt` / `stpp` samples, since Mediabunny cannot
      read subtitle tracks. Revisit only if embedded tracks turn out to be
      common in practice; spec §8.2 says they will not be.

<!-- Ticket grammar (CANONICAL COPY — prompts and workflows point here,
     they do not restate it): quick items stay one line. Non-trivial or
     sign-off items add two lines so intent survives compression:
       - **ID Short title** [flags]
         Intent: the outcome wanted.
         Done when: the acceptance condition.
     Flags: [sign-off] (scope sign-off first → full mode), [blocked: X],
     [spike] (timeboxed investigation → spike mode in task.md),
     [detail] (has a ticket file — write the flag as a Markdown link
     targeting `tickets/<ID>.md`, one hop), [maintainer] (human-owned,
     not agent work), [security] (live exposure — a leaked credential
     or open auth hole; nothing weaker).
     Standing items — [maintainer], [sign-off], or [blocked] work that
     waits across sessions — carry their creation date (YYYY-MM-DD).
     Add optional Scope:/Risks: lines only for sign-off items. -->


<!-- FILE: pm_skills/project/brief.md -->

# Project Brief

<!-- Hot whole-file read. See pm_skills/memory-policy.md for limits. -->

The authoritative specification is [`docs/01-specification.md`](../../docs/01-specification.md).
This brief is the summary agents read every task; the spec is the detail
they read when the task touches it. Where they disagree, the spec wins —
and this file is wrong and should be corrected.

| Document | Purpose |
| --- | --- |
| [`docs/01-specification.md`](../../docs/01-specification.md) | The specification. Authoritative. |
| [`docs/02-technical-rationale.md`](../../docs/02-technical-rationale.md) | Why each decision was made, with evidence. Read before re-opening a settled question. |
| [`docs/03-open-decisions.md`](../../docs/03-open-decisions.md) | What still needs a human decision (D1–D13). |
| [`docs/00-original-brief.md`](../../docs/00-original-brief.md) | The original brief, verbatim. Historical record only. |

## What are we building?

A static, browser-only web app that takes a staff member's recorded
educational video and produces a consistent, correctly-levelled,
correctly-branded MP4 — in one pass, with no software to install, no
upload, and no media leaving the device. It adds approved UoN opening and
closing branding, normalises audio to −16 LUFS integrated with a −2.0 dBTP
true-peak ceiling, and exports H.264/MP4 in one of two purpose-named
variants. All processing runs on the user's own machine through the
WebCodecs API.

It is **not** a video editor. No trimming, no cutting, no caption
authoring, and no exposed codec, bitrate or loudness settings.

It solves three problems at once: inconsistent branding, inconsistent
audio, and the technical burden of expecting academics to learn FFmpeg.

## Who is it for?

University of Nottingham academic and professional-services staff.
Novice level, on managed or personal laptops. They arrive with a Teams or
Zoom recording, a screen-recorded PowerPoint, a webcam talking head, or a
screen capture — typically 720p–1080p, 25–30 fps, frequently variable
frame rate — and they are publishing to EchoVideo (primary, including
Moodle embeds), OneDrive/SharePoint, or occasionally YouTube.

The destination mix defines the two outputs: EchoVideo and YouTube
re-encode on ingest, so files sent there favour quality; OneDrive and
SharePoint files are downloaded as-is, so those favour size.

## Platform and deployment

Static files served over HTTPS. No server-side processing, no build
requirement beyond a bundler, no special response headers (this is one
reason WebCodecs was chosen over ffmpeg.wasm — see rationale §1.3). Must
work offline after first load, except for branding assets, which are
cached.

Hosting location and URL are **not yet decided** (D5) and are not needed
for the MVP, which is built and verified locally.

## Core features (v1)

- **Branding** — independent opening and closing toggles, prepended and
  appended (not overlaid), conformed to the source's resolution and frame
  rate, with the branding's own audio bed passed through unprocessed.
- **Loudness normalisation** — BS.1770-4 measurement, then a bespoke
  chain: high-pass, conditional macro-levelling (only when LRA > 9 LU,
  slew-limited to 1 dB/s), gentle compression, a single linear gain to
  −16 LUFS, and a true-peak limiter at −2.0 dBTP.
- **Two outputs by purpose** — "Best quality" for EchoVideo/YouTube, and
  "Smaller file" for OneDrive/SharePoint. The smaller preset **preserves
  resolution** and takes the saving from bitrate, because slide legibility
  depends on resolution.
- **Device pre-flight** — no fixed size or duration cap. A 3-second
  calibration probe on the user's actual file and device produces a real
  time estimate, plus capability, storage and device-class checks.
- **Track pass-through** — subtitle, chapter and metadata tracks are
  carried through, with cue timings offset by the opening-branding
  duration so they stay in sync. Content is never altered.
- **A workflow a novice can complete** — plain language, named progress
  stages, always-available cancel, and errors that say what happened and
  what to do next.

## Constraints

- **WebCodecs, not ffmpeg.wasm.** Load-bearing and settled. ffmpeg.wasm
  fails this brief on four independent counts — a ~2 GB write ceiling in
  wasm memory, GPL/x264 plus AVC patent-pool exposure, the COOP/COEP
  headers a static University host may not allow, and no path to hardware
  encoders. See rationale §1. Do not re-open without new evidence.
- **One runtime dependency: Mediabunny** (MPL-2.0), for MP4 demux and
  mux. WebCodecs handles codecs but not containers. Anything beyond this
  needs explicit approval.
- **Privacy is a hard requirement.** No media egress, verifiable by
  inspecting network activity. No analytics carrying filenames or media
  characteristics.
- **Licensing.** All dependencies permissive (MPL-2.0 or better). No GPL
  components shipped. UoN assumes no codec patent obligation.
- **Accessibility.** WCAG 2.2 AAA is the target, AA the documented floor;
  every AAA exception is recorded explicitly. Carbon productive design
  language, implemented in our own code, with a separate UoN brand token
  layer. See `UI-STANDARDS.md`.
- **Browser support** excludes Safari below 26 and Firefox on Android —
  roughly 5% of active browsers, shown a clear explanation rather than a
  broken app.
- **The loudness meter must validate against EBU Tech 3341** reference
  values within ±0.1 LU before anything is built on top of it. This is an
  acceptance criterion, not an optional extra.

## Out of scope (for now)

Per spec §12: trimming, cutting or any picture editing; creating, editing
or transcribing captions; batch processing; exposed WebM output (the muxer
supports it, the UI does not); pumping detection on pre-existing audio
processing; noise reduction or de-reverberation; custom or per-department
branding variants.

Deferred within v1: the stream-copy fast path for the "best quality"
output (D10) — it fails unpredictably on variable-frame-rate sources,
which are common here.

## Open questions

The live list is [`docs/03-open-decisions.md`](../../docs/03-open-decisions.md).
Four block work and are being **built around**, not answered by guesswork:

| ID | Question | Working assumption |
| --- | --- | --- |
| D1 | UoN brand background colour | A single named token, `#000000` interim, referenced in one place |
| D2 | Branding durations | 5 s opening / 4 s closing, parameterised — never hard-coded |
| D3 | Boundary audio treatment | Hard cut with a 100 ms fade each side |
| D4 | Safari-below-26 exclusion, unsigned by UoN IT | Holds. Tracked as a standing risk, since reversing it is architectural |

Real branding assets do not exist yet. Placeholder clips matching the
§4.2 master format stand in, so the real renders drop in unchanged.


<!-- FILE: pm_skills/project/conventions.md -->

# Conventions

<!-- Hot whole-file read. See pm_skills/memory-policy.md for limits. -->

## Code style

- TypeScript, `strict: true`. `noUncheckedIndexedAccess` on — this is a
  codebase full of buffer indexing, and an off-by-one in a DSP loop is
  invisible at runtime.
- ES modules only. All imports at the top (an `AGENTS.md` hard rule).
- Prefer pure functions over classes. The DSP, the conform maths and the
  threshold logic are all pure; only the pipeline, the OPFS store and the
  UI hold state.
- No `any`. Where a browser API is ahead of its types, declare a narrow
  local interface and comment why.

## Naming

- Files: `kebab-case.ts`. Directories: lower-case, singular where it reads
  better (`audio/`, `media/`, `config/`).
- Units live in the identifier, always: `thresholdDbfs`, `windowSeconds`,
  `slewDbPerSecond`, `ceilingDbtp`, `offsetMicroseconds`. An unqualified
  number in a signature is a bug waiting to happen.
- Loudness units are never mixed silently. LUFS (absolute), LU
  (relative), dBFS (sample peak), dBTP (true peak) are distinct — convert
  explicitly through a named helper, never inline.
- Timestamps: WebCodecs works in **microseconds**. Say so in the name
  (`timestampUs`) whenever a number crosses a module boundary.

## Commit messages

Short imperative subject, no type prefix. Body when the change needs a
why. Reference the backlog ID when there is one: `VH-3: validate meter
against EBU Tech 3341 cases 1-9`.

## Documentation

- JSDoc on everything exported. For DSP modules, the doc block must cite
  the spec section or standard clause it implements — e.g. `BS.1770-4
  §4.1` or `spec §5.2 step 3` — so the code can be checked against the
  source of truth without archaeology.
- Every magic-looking constant in `config/` carries a one-line comment
  saying where the number came from. If the answer is "we chose it",
  say that too.
- Skip JSDoc on trivial internal helpers.

## Testing

- Runner: **Vitest**. The DSP suite runs in Node — it is pure maths over
  `Float32Array` and needs no browser.
- Anything touching WebCodecs, OPFS or the File System Access API cannot
  run in Node. Those are verified in a real browser and the check is
  recorded in the task's verification notes. Do not mock WebCodecs — a
  mocked encoder proves nothing about whether the real one accepts the
  config.
- Invariants this project must protect, in priority order:
  1. Meter accuracy against EBU Tech 3341 (±0.1 LU). Non-negotiable.
  2. Output loudness −16 ±0.5 LUFS, true peak never above −2.0 dBTP.
  3. CFR conform preserves A/V sync across the full duration.
  4. Cancellation leaves no partial file and no orphaned OPFS data.
  5. Zero media egress.
- Fixtures are **generated**, not committed. `test/fixtures/` is built by
  a script so the repo stays free of binaries and the fixtures stay
  reproducible.

## Patterns to follow

- **Config is the only home for numbers.** Every threshold, target,
  duration, bitrate and colour lives in `src/config/` or a CSS token. A
  literal threshold anywhere else is a defect, not a style preference —
  it is how the open decisions (D1, D2, D3, D8) stay one-line changes.
- **The worker owns the job; the main thread owns the UI.** No DOM in the
  worker, no decoding on the main thread.
- **Transfer, never copy.** `ArrayBuffer`s cross the worker boundary as
  transferables.
- **Fail loudly on data loss.** Anything that cannot be carried through
  (a subtitle track we cannot read, a chapter list) produces a visible
  warning before processing starts. Silent loss is the worst outcome
  available to this app.
- **Streaming everywhere.** If a design step would hold the whole media
  file in memory, it is the wrong design step — that is the ceiling this
  architecture exists to escape.

## Patterns to avoid

- `fastStart: 'in-memory'` on the Mediabunny output — or, just as bad,
  leaving `fastStart` unset, because the library then picks between
  `false` and `'in-memory'` on its own. Always name the value.
- Measuring loudness on the concatenated timeline. Analysis runs on
  **source content only** — a 5-second music sting averaged with 50
  minutes of speech mis-levels the whole video (spec §4.4).
- Applying macro-levelling unconditionally. It is gated on LRA > 9 LU
  precisely because processing that is not needed can only do harm.
- Reaching for a library. One runtime dependency, and it is Mediabunny.
- Exposing a technical setting "just in case". Every exposed control is a
  decision a novice is forced to make (spec §9.2).

## Tooling

- Bundler / dev server: **Vite**
- Test runner: **Vitest**
- Types: `tsc --noEmit`
- Linter: **ESLint** + `typescript-eslint`, strict on correctness
  (unused/broken imports, floating promises, dead code), taste rules off
- Formatter: **Prettier**, auto-fix on save — never a `check` failure.
  **Markdown is out of its scope** (`.prettierignore`): Prettier pads table
  cells to align them, which rewrites every table in `docs/` for no gain, and
  `docs/` is protected infrastructure agents read rather than restyle.
  markdownlint governs Markdown.
- Docs: `markdownlint` + `check-links.mjs` (scaffolded)

The `check` command that composes these is defined in
`DEV-INFRASTRUCTURE.md` → "Quality gate".


<!-- FILE: pm_skills/project/decision-log.md -->

# Decision Log

<!-- Append new decisions at the top. Don't edit old entries. -->
<!-- Use this during the design phase of each task to record what you chose and why. -->
<!-- Hot sectional. Agents scan the latest 10 HEADINGS by default and
     open only the bodies relevant to the task. -->
<!-- Keep each entry tight: Decision / Rationale / Alternatives, not an essay.
     The live log is budgeted by WORDS as well as entry count (see
     pm_skills/memory-policy.md), so verbose entries trip a prune sooner. -->
<!-- This is the home of the WHY. The backlog/trajectory only point here;
     never paste an entry's prose into those files. -->
<!-- Append-only: when archiving, move entries verbatim. Never rewrite. -->

## 2026-08-27 — Stale branches archived as tags, not deleted

**Decision:** Resolve the two stale `codex/*` branches by tagging their tips
`archive/<branch-name>` and pushing the tags **before** deleting the branches.
`codex/repository-review-implementation` (10 commits) and
`codex/comprehensive-review-remediation` (1 commit) are gone from the branch
list; both tips stay reachable at `archive/repository-review-implementation`
(`d6c5edb`) and `archive/comprehensive-review-remediation` (`81c0012`). The
abandoned scratch worktree at
`/private/tmp/uon-video-helper-review-implementation-20260826` was removed —
clean, fully pushed, untouched since 2026-08-26.

**Rationale:** the implementation branch is the only copy of the road not
taken. It implements VH-19's content classifier, VH-25's softened boundaries,
VH-31's audio projection and VH-32's UI guidance — all four superseded on
2026-08-27 by decisions that went the other way (VH-19 blocked on the probe
sampling the title card, VH-25 cut, VH-31 reframed as an honest upper bound,
VH-32 closed differently). Deleting it outright would destroy working code that
becomes relevant again the moment VH-19 unblocks; keeping the branch leaves
stale refs that read as live work. A tag is the git equivalent of this
project's own memory archives — verbatim, permanently reachable, and clearly
not the live line. The second branch's content was byte-verified as already
living at `reviews/2026-08-26/uon-video-helper-internal-code-review-2026-08-26.md`
(one relative link differs), so its tag is completeness only.

**Verified:** both tags confirmed on `origin` with dereferenced `^{}` SHAs
matching the original branch tips before either deletion ran. Recover either
with `git checkout archive/<name>`.

**Link:** first tags in the repo; `archive/` namespace chosen so it cannot
collide with the `vMAJOR.MINOR.PATCH` product-version tags DEV-INFRASTRUCTURE
reserves.

## 2026-08-27 — Pruned project memory: the review batch outgrew the log again

**Decision:** Split `decision-log.md` at the 70% prune-to target — the latest
14 entries stay live, 25 went verbatim to
`archive/decision-log-0002-2026-08-25-to-2026-08-27.md` — and moved the
2026-08-26 remediation run plus Band 1's close on real material to
`archive/trajectory/trajectory-0003-review-remediation-and-band-1-close.md`.
Decision-log 39 → 14 entries; trajectory 3,010 → 1,303 words. The file map
also dropped the four deleted `opening-*.mp4` placeholder paths (gone since
VH-25/VH-23) via `gen-file-map.mjs` — 161 → 157 mapped files.

**Rationale:** the repository-review remediation wrote most of 29 entries in
two days, which is the log doing its job, not bloat; the split point keeps the
whole decision-closing day of 2026-08-27 live, which is what the next session
reaches for. Doc-sync was deliberately NOT run: 13 open deltas sit over the
10-line threshold and wait for their own sign-off session per the
protected-doc rule.

**Verified:** `diff` runs per file against the intact original — archived
slice and kept slice byte-identical before each swap; 14 + 25 = 39 entries
reconciled; trajectory pointer integrity re-checked after the split.

**Link:** `pm_skills/project/archive/INDEX.md`.

## 2026-08-27 — VH-26: the colour fear did not reproduce

**Decision:** take five phone samples into `samples/phone/`, and reduce VH-26
from "the picture is silently wrong" to two specific, smaller questions.

**Rationale:** the maintainer supplied a curated list of directly-downloadable
phone recordings. Five were taken — HLG 1080p, Dolby Vision 4K60, an 8-bit 4K30
pair and a legacy 3GP — and every one was classified with `ffprobe` rather than
from its filename, which turned out to matter: the two files published as "SDR"
and "HDR" are both plain 8-bit H.264 bt709. The supplied document warns about
exactly that and was right.

VH-26 has said since 2026-08-25 that phone HDR would come out "silently washed
out or crushed", because `src/` has no colour-space or tone-map handling at
all. Measured, it does not. One frame from each of the two genuinely-HDR files,
source against output, read through a `<video>` element so the numbers describe
what a viewer sees: the HLG 1080p file reads mean 110 / p05 5 / p50 109 / p95
219 at source and 110 / 5 / 108 / 219 out; the Dolby Vision 4K60 file reads
130 / 11 / 137 / 233 in and 131 / 13 / 139 / 233 out. Within two units
everywhere.

The reason is that the browser tone-maps HLG to SDR when it decodes, and the
pipeline encodes what it is handed. Having no colour handling of our own turns
out to be correct here rather than merely absent — though it is correct by
inheritance, which is worth knowing rather than relying on.

Two smaller questions survive. Firefox is untested, and the question there is
not colour but whether an undecodable HEVC source hits VH-60's
`no-source-decode` block cleanly instead of failing mid-job. And portrait is
still absent from the corpus, so portrait branding composition remains
unspecified.

**Incidental, and worth a note:** 4K60 encodes at about 1.3x real time on this
MacBook (16.5 s for 21.7 s), which is far better than feared — but a 4K60 phone
video comes out BIGGER than it went in, 139 MB to 154 MB, because "best
quality" anchors to a ~51 Mbps source (VH-47). Not a defect; a surprise, and
the smaller preset is the answer.

**Link:** VH-26, VH-60, VH-47; `samples/phone/`, `pm_skills/project/tickets/VH-26.md`.

## 2026-08-27 — VH-32 closed, VH-61 closed, VH-17 reframed

**VH-32 — no redesign. The simplicity is the design.** The maintainer's answer
to the interface pass he asked for: he likes it as it is, and the only thing
that would justify a SECOND screen is a trim function. So the ticket closes on
"nothing to change" rather than on a delivered redesign, and the screen-count
question moves to VH-30, which is what would raise it.

That is a stronger outcome than it looks. The original complaint was that the
screen accretes rather than progresses and speaks in codecs rather than
outcomes. Most of it has since been answered piecemeal by items that were not
UI tickets — VH-64 gave the progress bar a name and a stage and made a
discouraged job ask before it proceeds; VH-56 gave the finished result an
owner, so the screen stops offering a Save for a file that is gone; VH-46b
collapsed the closing from a checkbox plus a hidden mode set into one question
with four plainly-worded answers; VH-31 made the size estimate say "at most"
instead of quoting a figure it beats by 3.6x. What is left of the original
complaint is largely what those fixed.

**VH-61 — leave it.** The maintainer accepted the recommendation. Loudness
range goes blind in the final second of a file, which under-reports, which
keeps the macro-leveller OFF — the safe direction, and the same judgement spec
§5.2 step 3 already makes. The review's remedy inverts it. Closed as accepted
behaviour with the evidence recorded rather than as a defect deferred.

**VH-17 — EchoVideo (Engage) is the key platform**, which changes the stakes
rather than the answer. EchoVideo re-encodes on ingest, so where the moov box
sits cannot reach a viewer there on either preset. That removes the question
from the path most videos take and leaves it a secondary concern for OneDrive
and SharePoint. Still worth the upload test; no longer worth designing around
beforehand.

It is also a useful confirmation elsewhere: if EchoVideo is where most videos
go, most jobs should be taking "Best quality", which is already the default and
already what spec §6.1 names for EchoVideo.

**Link:** VH-32, VH-61, VH-17, VH-30; spec §6.1, §5.2 step 3.

## 2026-08-27 — VH-19: the probe samples the one part that says nothing

**Decision:** do not classify content from the calibration probe's existing
window. VH-19 stays open, blocked by a measurement rather than by missing code.

**Rationale:** everything needed to ship this looked present — `ContentClass`
exists, `outputShapeFor` already takes it, and the probe already decodes three
seconds. So the obvious move was to measure inter-frame difference on those
frames and set the class. Measuring the real corpus first is what stopped it.

Mean absolute inter-frame difference on a 64x36 luma, sampled at four points
through five real lectures, separates camera from slides cleanly: CULT1027
reads 1.35 to 1.86, everything else 0.68 or below. But **every one of the five
reads 0.00 at the start**, because a lecture opens on a title card. The probe
samples exactly there. Classifying from it would have called every source
"screen" — including the one that is plainly camera — and "screen" cuts the
smaller preset from 2.5 Mbps to 1.5.

The error is asymmetric. Calling camera content "screen" takes 40% of the
bitrate off the material that most needs it, silently, on someone's lecture.
Calling slides "camera" costs only file size, on the preset whose entire
purpose is a smaller file. Any threshold has to be biased hard toward camera,
and five files is not enough to place one.

This is the same shape as the finding that stopped VH-31's estimator: where you
sample drives the answer more than how long you sample for. A representative
classification needs several points through the file, in a pass separate from
the timed probe so it cannot re-calibrate `videoFramesPerSecond`.

**Link:** VH-19, VH-31; spec §6.2; `src/config/presets.ts`, `src/media/probe.ts`.

## 2026-08-27 — VH-31: an upper bound that is actually one

**Decision:** keep the estimate as an upper bound, say so on screen, and fix
the one way it was not a bound. The content-derived estimator stays unbuilt.

**Rationale:** the maintainer chose the upper bound and asked for improvement
where it was cheap. Two things were cheap and one was not.

The projection multiplied by the SOURCE duration, while the output is longer
by whatever branding is appended — the tail was omitted outright, about 3% on
a 130 s lecture, and part of why four real "Smaller file" jobs produced a file
LARGER than the figure the user had decided on. A bound that can be exceeded
is not a bound. Pre-flight does not know the mode yet, so it assumes the
longest closing: over-stating by a second on a job that turns out to be a
clean cut is the safe direction.

And the panel said "Estimated size: 27.7 MB" for a file that came out at 7.5.
A bare figure reads as a prediction, so the margin read as a defect. "At most
27.7 MB" is the same number describing itself honestly, and costs nothing.

What stays unbuilt is the content-derived estimator, and the reason is in the
ticket rather than in taste: all three adversarial refuters returned blocking
findings. It raises `requiredStorageBytes` on 42 of 46 corpus combinations
into a hard block with no override; the longer probe it needs re-calibrates
`videoFramesPerSecond` by 34-66%, moving the estimate across spec 7.3's 20-
and 60-minute bands; and the wall budget withdraws the fix from exactly the
large files it exists to fix, on hardware only 1.8x slower than the machine it
was costed on. The ticket file goes, and those findings come with it into
VH-19's note, because VH-19 rides the same probe and would inherit the same
objections unanswered.

**Link:** VH-31, VH-19; `src/config/branding.ts`, `src/workers/job.worker.ts`,
`src/ui/preflight-panel.ts`.

## 2026-08-27 — Seven maintainer answers, recorded

**D4 / VH-15 — the browser exclusion is signed off.** Safari below 26 may be
excluded. This was the one decision flagged as expensive to reverse, and it is
now closed rather than standing. VH-15 is removed.

**D5 / VH-14 — the intended home is a UoN-hosted web app**, in the shape of
`xerte.nottingham.ac.uk`: University server, University URL, not public GitHub
Pages. Answered in principle; who provisions it is what remains, so VH-14
stays open with the target named. Pages continues as the unadvertised pilot in
the meantime.

**D6 — AA is the floor, AAA is the goal.** Which is what `UI-STANDARDS.md`
already implements. No change beyond recording that the ambition is deliberate
rather than aspirational, and that an AAA exception has to be argued for.

**D7 — Legal will not engage, and there is nothing to escalate.** Worth being
plain about what the question was: the app ships no codec. It uses the codecs
already in the user's browser through WebCodecs, which is why ffmpeg.wasm was
rejected — that would have meant UoN distributing an x264 binary and inheriting
both GPL obligations and AVC patent-pool exposure. The current architecture has
neither. The sign-off was a confirmation of a position already believed sound,
not a request for permission, so its absence is a small residual risk rather
than a blocker. Recorded and closed on that basis.

**D12 — per-department branding is a later possibility, not a requirement.**
The plan is to build it, show it around, and hand it to the maintainer's
central department, which would then own any variant governance. Stays
iceboxed; the revisit trigger is that handover.

**VH-48 — cut. Keep re-encoding.** The maintainer asked for the most reliable
option and that is the current one. Stream copy would leave the source video
untouched and encode only the branding, which is generationally lossless and
near-instant — but it requires the copied source and the encoded branding to
match byte-exactly in codec parameters, and when they do not the failure is
silent A/V drift discovered after publication. Rationale §4.3 rejected it on
two grounds; VH-24 removed one (the corpus is effectively CFR) and this one
still stands. Re-encoding is slower and predictable, and predictable wins.

**VH-M3 — the OneDrive exclusion will not happen.** So the hazard is
permanent, and the response is to make it legible rather than to keep asking.
The symptom is `ETIMEDOUT` from `readFileSync` or `tsc` hanging, the cause is
Files-On-Demand dehydrating `node_modules`, and the fix is `npm ci` — all three
are in `README.md` → Gotchas and in `AGENTS.md`'s hostile-filesystem rule. No
detector was built: nothing is dehydrated right now, so it could not be tested,
and an untested guard for a condition that cannot be reproduced is worse than
a documented one.

**Link:** D4, D5, D6, D7, D12; VH-15, VH-14, VH-48, VH-M3.

## 2026-08-27 — VH-46b: one question, four answers

**Decision:** the closing is a single four-way radio — Clean cut, Over the
picture, Over a freeze frame, No closing sequence — with Animation revealed
only for the two modes that play the build, and Colour whenever a closing is
chosen.

**Rationale:** the maintainer asked for all four options back plus a GUI
analysis of the best way to offer them. The analysis turns on three facts.

"None" is not a different KIND of answer from "clean cut" — it is a fourth
value of the same question. It had been a checkbox with the three modes behind
it as a separate group, so the user was asked twice about one thing, and the
second question looked optional when it was not. One radio group asks once.

Animation only means something for `over-picture` and `over-freeze`. A clean
cut discards the 1 s build entirely, so under it Fade and Slide differ by
nothing — precisely the control `AGENTS.md` names as the one never to expose.
It is hidden rather than disabled: a disabled control still says "there is a
decision here you may not make", and there is not one.

What separates the modes for a user is what happens to their last second and
how many seconds they gain, neither of which is guessable from a two-word
label. Each option carries a sentence saying both. Clean cut stays the default
— least to think about, and the only mode that composites nothing, so it works
even where alpha decode does not.

**On the processing being sound:** the compositing that VH-45 withdrew is
correct because of VH-44, which detects whether the engine honours an RGBA
`copyTo` and takes the canvas round-trip only where it does not. That is a
property test rather than a browser sniff, which is why it survives. Verified
end to end here in Chrome across five combinations — every mode, both styles,
both colours — and each produced the duration its configuration promises:
`hard-cut` and `over-picture` +3.99 s, `over-freeze` +4.99 s against nominal
4.00 and 5.00, the remainder being frame quantisation at 30 fps.

**Rejected:** keeping the checkbox and adding a separate mode group, which is
the shape that caused the problem; and a select, which hides three of four
options behind a click for no gain at this length.

**Link:** VH-46b, VH-44, VH-45; `index.html`, `src/main.ts`,
`src/styles/app.css`.

## 2026-08-27 — VH-25 cut, VH-23 iceboxed: less to decide, not more

**Decision (VH-25):** do not build picture fades at the branding boundary, in
either direction. The ticket is cut, not deferred.

**Rationale:** the maintainer's call, and it overrides the corpus evidence that
raised the ticket — 21 of 21 real recordings end on a bright frame, which is
what made a fade-out look obviously right. The objection is about the viewing
context rather than the frame: a lecture is watched by an audience who have
just been told something, a fade to the closing card adds nothing they need,
and it costs a second of attention at exactly the point the branding is trying
to land. No benefit, a possible negative, so it does not get offered.

Nothing is lost by cutting it, because nothing was built: there is no picture
fade anywhere in `src/`. What DOES exist and stays is the 100 ms audio fade at
the branding join (`BOUNDARY_FADE_MS`, open decision D3). That is not an
aesthetic fade — it is a click preventer. Two unrelated pieces of audio butted
together produce an audible click, and 100 ms is short enough that nobody
perceives it as a fade at all. Removing it would make every job click.

The ticket's third clause — a notice for the four corpus files that start
mid-speech — goes with it, and is already covered: VH-55's `onset-trimmed`
warning fires when audible content sits in the window that encoder-delay
compensation discards, which is that case.

**Decision (VH-23):** opening graphics to the icebox, low priority, not to be
addressed until far later in the product's life. The pipeline path is dormant,
not deleted.

**Rationale:** the maintainer's position, unchanged since 2026-08-25 and now
made permanent enough to move: openings suit external video where brand
recognition comes first, and this tool is internal, where a closing is the
norm. `loadBrandingClip` refuses an opening and returns `null` — the same
answer the pipeline already handles for branding that fails to load. The four
generated placeholder openings are removed from `public/branding/`, which is
the substantive part: they were shipping in every build, and an unapproved
University graphic reaching a published video is the risk VH-33 named.

The timeline maths stays. Every offset downstream — content start, subtitle
shift, closing position, the estimate — is written in terms of an opening
duration that is currently zero, and is tested that way. Deleting it would
cost more than it saves and would have to be rebuilt to bring the feature
back.

**Link:** VH-25, VH-23, VH-33, VH-55; D3; `src/media/branding.ts`,
`public/branding/`.

## 2026-08-27 — VH-49: Firefox is told to switch, not served a lesser file

**Decision:** Firefox stays blocked for any source with audio, with a message
naming a browser that works. No WebM/Opus path, no dropped audio.

**Rationale:** the maintainer's call. The three options were block, ship
WebM/Opus, or drop audio. Dropping audio was never real — a silent lecture is
not a lecture. WebM/Opus means a second output contract: spec §6.1 says MP4,
EchoVideo and OneDrive both take MP4 without question, and a Firefox-only
format would have to be specified, tested across the same corpus, and
explained to a user who did not ask for it. Blocking is honest, already built,
and already names the way out.

It does exclude a supported browser from a University tool, which is a real
cost and not one to pretend away. VH-69 is the pathway if it is ever worth
paying for, kept low because the block is correct today.

Spec §10 still lists Firefox desktop as "Supported" — a doc-delta, since only
silent sources run there now. `README.md` says what actually happens.

**Link:** VH-49, VH-69; D11; `README.md`, `pm_skills/project/doc-deltas.md`.

## 2026-08-27 — D1 answered: the padding is Nottingham Blue

**Decision:** `--uon-brand-bg` is Nottingham Blue `#10263B`, the University's
primary brand colour, aliased from a named `--uon-brand-blue`.

**Rationale:** the maintainer supplied
<https://www.nottingham.ac.uk/brand/visual/colour.aspx> as the palette the
branding masters were made from. Verified rather than taken on trust: the
shipped `closing-tail-blue-1080p.mp4` decodes to `#10263a` at its corners —
one unit off in the blue channel, which is YUV-to-RGB rounding in an H.264
encode. The asset is that colour.

Padding a non-16:9 source in the same blue the closing card ends on makes the
whole output one field of colour rather than black bars round a brand graphic.
Black remains one line away if that reads worse on real material.

The two neutrals are defined alongside it because the white closing variant and
the interface both need them. The nine accent colours are on that page and are
not invented into this file until something needs one.

**Also:** `gen-placeholder-branding.mjs` read the token with a regex that only
accepted a literal hex, so the alias broke it. It follows one `var()` hop now.

**Link:** D1; `src/styles/tokens.brand.css`,
`scripts/gen-placeholder-branding.mjs`.

## 2026-08-27 — VH-66: correct the code where the doc was right

**Decision:** fix the drift in whichever direction is true. Where the code had
fallen behind a published promise, change the code; where a document described
a project that no longer exists, change the document; where the document is
protected, capture a delta and change nothing.

**Rationale (review R-15):** four drifts, and they did not all point the same
way.

`DEV-INFRASTRUCTURE.md` said both the product version and the build identity
appear "in the UI's About/footer line". Production showed the product version
alone, and the diagnostics bundle that carries the build id is dev-only — so a
running production app could answer "what release is this?" and not "exactly
what code is live?", which is the whole point of having two. The document was
right; `main.ts` was wrong. Non-secret: this repository is public and the
commit is already in the shipped sourcemaps.

Its Deployment section said the MVP is "local only" and that "nothing deploys
until D5 is answered". Every push to `main` has published since 2026-08-25.
The document was wrong, and updating it is squarely within its ownership.

`architecture.md`'s source tree named `core/bus.ts`, `core/store.ts`,
`media/sidecar.ts`, `branding/assets.ts`, `ui/shell.ts`, `ui/components/` and
`ui/views/` — none of which exist — and described a store-and-bus main thread
that was never built. Replaced with what is on disk, and the communication
section now says the main thread holds its state directly and that adding a
store is a decision rather than a default.

`gen-placeholder-branding.mjs` still emitted a flat `closing-{label}.mp4`.
The real closings arrived with VH-12 and are built by `build-branding.mjs` as
`closing-tail-*` and `closing-onset-*`, so running the old generator dropped
four stale files beside the real ones. It builds openings only now — there are
still no approved opening assets, which is what it is for.

**Captured, not edited:** two spec deltas. §5.2 step 6 states the limiter's
ceiling as −2.0 dBTP, which is now the ceiling of the FILE while the limiter
targets 1.0 dB below it (VH-50); and §5.2 step 3 lists the pause freeze once
where the implementation needs it twice (VH-61). `docs/` is protected, so
those go to `doc-deltas.md` for a sign-off pass.

**Link:** VH-66; review R-15; `DEV-INFRASTRUCTURE.md`, `src/main.ts`,
`pm_skills/project/architecture.md`, `scripts/gen-placeholder-branding.mjs`.

## 2026-08-27 — VH-64: name the progress, and ask before the slow job

**Decision:** give the progress bar an accessible name that tracks the stage,
and withhold Start on a `discourage` verdict until the user says to carry on.

**Rationale:** a bare `<progress>` announces a percentage and nothing else, so
a screen-reader user heard "63%" with no way to know 63% of what — and the
stage is the half that carries the meaning. It is labelled by a visible line
that follows the stage, rather than by an `aria-label` nobody sighted can see,
so the two cannot drift.

Spec 7.3 allows a discouraged job to continue "after acknowledgement", and
there was no acknowledgement: Start appeared for every outcome short of a
block, so agreement was inferred from the user pressing the button they were
being warned about (review R-14). The acknowledgement is a deliberate second
act, per selection rather than per session — an acknowledgement is about one
job.

**Rejected:** a modal. `UI-STANDARDS.md` reserves those for something
irreversible the user did not initiate; this is a recommendation they may
disagree with, and it belongs beside the recommendation.

**Verified in Chrome, with the mobile device class emulated:** a discouraged
verdict shows the acknowledgement and hides Start; acknowledging reveals Start
and moves focus to it; a desktop `proceed` verdict shows Start immediately and
never the acknowledgement; and the bar announces "Analysing audio" rather than
nothing while it runs.

**Link:** VH-64; review R-14; spec 7.3; `index.html`, `src/main.ts`.

## 2026-08-27 — VH-60: an answer belongs to the question that asked it

**Decision:** stamp every selection with an epoch and drop any answer that
arrives for a superseded one; add secure context, OPFS and source-decode to the
pre-flight verdict as blocks; and derive the H.264 level from the shape instead
of fixing it.

**Rationale:** three separate ways the screen could describe one job while
Start submitted another (review R-05, R-06).

Nothing checked, on the way back, which selection an asynchronous answer was
about — so whichever finished LAST won. Choosing file A then file B could leave
B on screen with Start pointing at A, and a slow pre-flight for the old preset
could arm Start after the user had chosen a different one. `beginSelection()`
returns the test; inspection, pre-flight and the subtitle read all take it, and
a preset change additionally takes Start down for the interval, because the
verdict that revealed it described the other preset.

`hasOpfs`, `isSecureContext` and both tracks' `canDecode` were all measured and
then never consulted, so a job could reach a live Start button on a device that
could not finish it — and the source panel says in as many words that full
guidance arrives with pre-flight. All three are now required inputs rather than
optional ones, so a future call site cannot omit them by accident. They are
ordered by what the user can act on: an insecure context is fixable from the
address bar, so it is named before "install another browser".

The codec string declared level 5.1 for every shape. ITU-T H.264 Table A-1
caps 5.1 at 983,040 macroblocks a second; 3840x2160 at 60 fps needs 240 x 135
x 60 = 1,944,000. Chrome ACCEPTS the over-declaration, which makes this the bad
kind of bug: not a refusal, a stream declaring a level it exceeds, for a strict
downstream decoder to reject after publication. The level now comes from the
shape, which also drops 1080p to 4.2 — more widely hardware-accelerated than
5.1 and correct for everything up to 1080p60.

**Verified in Chrome:** picking A then B leaves B on screen AND submits B (the
produced file is 11.3 MB, B's size; A's is ~7 MB); a preset change hides Start
until the new verdict lands; `isConfigSupported` accepts the derived level at
720p30, 1080p30, 1080p60, 1440p30, 4K30 and 4K60; and a real job encodes and
verifies at level 4.2 with a byte-identical result.

**Link:** VH-60; review R-05, R-06; `src/main.ts`, `src/media/preflight.ts`,
`src/config/presets.ts`, `src/ui/preflight-panel.ts`.

## 2026-08-27 — VH-61 and VH-67: freeze the envelope, and keep less of the curve

**Decision:** apply the pause freeze to the FINISHED envelope as well as to the
raw correction; halve the meter's block store by pre-weighting; keep the
momentary curve only for callers that ask. Do NOT touch the LRA end-of-file
suppression.

**Rationale (VH-61):** spec 5.2 step 3 lists the freeze last — after smoothing,
clamping and slew limiting — and the code applied it first, to the raw
correction only. The smoothing window is CENTRED, so speech fifteen seconds
past a pause reached back into it and moved a gain that was supposed to be
frozen: measured at -5 dB entering a pause and -1.29 dB inside it, and +1.85 dB
in the silence before a recording's first word. The freeze now appears twice
and the two do different jobs — the first keeps a pause's enormous raw demand
out of the smoother, the second stops the smoother reaching into the pause.
Expressed as "do not advance the slew", so it can never introduce a step the
slew limit forbids.

**Rationale (VH-67):** `computeIntegrated` averaged per-channel mean squares
across the gated blocks and then applied channel weights. Those commute, so
weighting on the way in stores one number per block instead of one per channel
per block at an identical result — the EBU harness passes unchanged, which is
the equivalence proof. And nothing in the pipeline reads the momentary curve;
the envelope and the warnings both work from the short-term one, while the EBU
max-M cases need every value. It is retained on request, defaulting to on, and
the pipeline asks for off. A stereo hour goes from ~1.4 MB to ~580 kB, which is
what the module's comment always claimed.

**Not done, deliberately (VH-61's other half):** a loud passage in the final
second reads LRA 0.00 against 10.80 for the same event mid-file. Real, and
recorded. But the review's remedy — 1.5 s of silence before finalising LRA —
was measured and is worse: on a recording ending quietly it took LRA from 3.79
to 15.32 against a mid-file truth of 6.51. It cannot be fixed by inventing
audio, because the only audio there is to invent is silence, and silence in a
partial short-term window survives the relative gate.

The direction matters more than the magnitude. LRA gates macro-levelling at
9 LU. Suppression makes the meter UNDER-report, so the leveller stays off — the
safe failure, and the same judgement spec 5.2 step 3 already makes ("processing
that is not needed can only do harm"). Padding makes it OVER-report, switching
the leveller on because a recording ends in room tone. Correcting this needs a
standards-grounded design and a model of its effect on that gate, not a patch.

**Link:** VH-61, VH-67; review R-10, R-16; `src/audio/macrolevel.ts`,
`src/audio/loudness.ts`, `src/audio/analyse.ts`.

## 2026-08-27 — VH-65: the build job does not need to be able to publish

**Decision:** move `pages: write` and `id-token: write` off the top level and
onto the `deploy` job alone, pin every action to a commit SHA, and make the
publishable-media guard allow "committed to this repository" rather than a
directory.

**Rationale:** every push to `main` publishes (VH-14), so this workflow IS the
act of publishing and its blast radius is the University's pilot site.
Top-level permissions applied to both jobs, and `build` runs `npm ci` and the
whole test suite — a great deal of third-party code holding a token that can
deploy. It needs to read the repository and nothing else.

A major-version tag is mutable. `actions/checkout@v4` is whatever the tag
points at today, and whoever controls it can move it to any commit, which then
runs on every push to `main` with this workflow's permissions. SHAs resolved
deliberately and named with the version each is, so updating is a decision
rather than a drift.

The media guard scanned `public/spike/` only, so a recording copied anywhere
else under `public/` shipped. The fix is not a list of branding filenames — a
list has to be updated whenever an asset is added, and the day it is not is the
day the guard stops guarding. Git already knows: the branding assets are
tracked, a lecture copied in by hand is not, wherever it was put. Without a
checkout it falls back to the old directory rule rather than to trusting
everything.

**Verified:** an untracked MP4 placed in `public/assets/` — outside the only
directory the old guard looked at — now fails the gate with exit 1 and names
the file.

**Link:** VH-65; review R-13; `.github/workflows/deploy-pages.yml`,
`scripts/check-placeholders.mjs`.

## Archived: 25 entries, 2026-08-25 → 2026-08-27 — see archive/decision-log-0002-2026-08-25-to-2026-08-27.md

## Archived: 12 earlier entries — see archive/decision-log-0001-2026-08-25.md


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

- [ ] 2026-08-25 SPEC §9.1 — workflow step 4 still offers "Toggle opening
      animation", which §4.1's closing-only v1 withdrew (source: copy-edit
      review of the 2026-08-25 doc-sync; pairs with VH-33)
- [ ] 2026-08-25 SPEC §8.1/§8.3 — the subtitle timing problem is framed
      wholly on the opening animation, so the sidecar cue offset is always
      zero in a closing-only v1 (source: copy-edit review of the 2026-08-25
      doc-sync; UI-copy twin already on the wish-list)
- [ ] 2026-08-25 SPEC §4.1 — "the user's choice of boundary mode" describes a
      control withdrawn by VH-45; the modes remain in the pipeline, not the UI
- [ ] 2026-08-25 SPEC §6.1 — the "best quality" bitrate is a fixed
      ~0.12 bits/pixel/frame, which never looks at the source; VH-47 makes it
      a source-relative band (source: VH-41 review)
- [ ] 2026-08-25 RATIONALE §4.3 — stream copy is rejected partly because VFR
      sources "are common here"; VH-24 measured the corpus as effectively CFR,
      so half the rejection no longer holds (source: VH-48)
- [ ] 2026-08-25 DECISIONS D10 — still listed as deferred with an unmet
      revisit trigger; the trigger fired and it is now VH-48 (source: VH-48)
- [ ] 2026-08-26 SPEC §6.2 — its prose presents consulting the source as the
      SMALLER preset's distinguishing property; since VH-47 both presets do,
      one capped at the source and one anchored to it (source: VH-47)
- [ ] 2026-08-27 DECISIONS D4/D5/D6/D7/D12 — all five answered 2026-08-27 and
      still listed as open: D4 signed off, D5 is a UoN-hosted app, D6 is
      AA-floor/AAA-goal, D7 closed as a residual risk, D12 deferred to the
      handover (source: maintainer)
- [ ] 2026-08-27 DECISIONS D10 — VH-48 was cut 2026-08-27; D10's icebox entry
      should record that the revisit happened and the answer was no
      (source: VH-48)
- [ ] 2026-08-27 SPEC §10 — Firefox desktop 130+ is listed "Supported", and
      since VH-49 it is blocked for any source WITH audio; only silent sources
      run. D4's browser-support claim inherits the same correction
      (source: VH-49)
- [ ] 2026-08-27 SPEC §5.2 step 6 — the limiter's ceiling is stated as
      −2.0 dBTP, which is now the ceiling of the FILE; the limiter itself
      targets 1.0 dB below it because AAC raises true peak after it
      (source: VH-50)
- [ ] 2026-08-27 DECISIONS D1 — answered 2026-08-27: Nottingham Blue #10263B,
      verified against the shipped closing tail; the entry still reads as open
      with black as the interim (source: D1)
- [ ] 2026-08-27 SPEC §5.2 step 3 — the freeze is listed once, and the
      implementation needs it twice: on the raw correction and on the
      finished envelope, because the smoothing window is centred
      (source: VH-61)


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
<!-- 157 file(s) across 9 section(s); regenerate with pm_skills/scaffold/gen-file-map.mjs -->
- `(root)` — 20 file(s)
- `.claude` — 1 file(s)
- `.github` — 1 file(s)
- `docs` — 5 file(s)
- `public` — 13 file(s)
- `reviews` — 7 file(s)
- `scripts` — 4 file(s)
- `src` — 102 file(s)
- `test` — 4 file(s)
<!-- /file-map-index -->

## (root)

- `AGENTS.md` — Permanent behavioural contract for agents: invariants, data model, subsystems, protected paths.
- `CLAUDE.md` — Claude Desktop Code adapter: imports the canonical shared `AGENTS.md` and adds only tool-specific memory boundaries.
- `DEV-INFRASTRUCTURE.md` — Build, dev server, runtime lifecycle, diagnostics, quality gate, versioning, security.
- `README.md` — Entry point for a human: what this is, how to run it, the invariants, the gotchas.
- `UI-STANDARDS.md` — UI, usability and accessibility rules. Two token systems; the AAA design-review gate.
- `acceptance.html` — Maintainer page for the acceptance run. Excluded from the production build.
- `check-links.mjs` — Scaffolded internal Markdown link checker. Runs in `check`.
- `eslint.config.js` — Flat ESLint config. Strict on correctness, silent on taste; formatting is Prettier's job.
- `index.html` — The single page. Landmarks, skip link, and the polite live region the app announces into.
- `package.json` — Scripts, the one runtime dependency, and the product version.
- `spike-alpha.html` — Maintainer page: does this browser decode transparent video? Excluded from the build.
- `spike-codecs.html` — Maintainer page: which encoder configurations does this engine actually accept, video AND audio?
- `spike-framerate.html` — Maintainer page: does the app measure the frame rate or trust the header?
- `spike-modes.html` — Maintainer page: do the three closing modes produce the timelines they promise?
- `spike-opfs.html` — Maintainer page: does a sweep leave a live job's scratch alone in this engine?
- `spike-preflight-audio.html` — Maintainer page: does pre-flight refuse exactly what the audio encoder will refuse?
- `spike-real.html` — Maintainer page: runs a real recording end to end and reports what came out.
- `spike-shapes.html` — Maintainer page: do the corpus's odd shapes — 852x480, 4:3, 16:10, mono, 44.1 kHz, silent — reach a correct output?
- `tsconfig.json` — Strict TypeScript. `noUncheckedIndexedAccess` matters here — this codebase indexes buffers.
- `vite.config.ts` — Build config and the build-identity injection (`__APP_VERSION__`, `__BUILD_ID__`).

## .claude

- `.claude/launch.json` — Dev-server definition so the preview tooling can boot the app by name.

## .github

- `.github/workflows/deploy-pages.yml` — Manual GitHub Pages deploy. Runs the full gate, then publishes `dist`.

## docs

- `docs/00-original-brief.md` — The original brief, verbatim. Historical record; never rewritten.
- `docs/01-specification.md` — The specification. Authoritative — where this and project memory disagree, this wins.
- `docs/02-technical-rationale.md` — Why each decision was made, with evidence. Read before re-opening a settled question.
- `docs/03-open-decisions.md` — D1-D13: what still needs a human. The four blocking ones shape config, not code.
- `docs/04-init-prompt.md` — The prompt that seeded this project's PM Skills run. Historical record.

## public

- `public/branding/README.md` — What the real assets are, how they are built, and which placeholders remain.
- `public/branding/closing-onset-fade-blue-1080p.webm` — Real closing onset, fade blue at 1080p: the 1.00 s premultiplied-alpha build. VP9+alpha WebM; used only by the compositing modes.
- `public/branding/closing-onset-fade-blue-2160p.webm` — Real closing onset, fade blue at 2160p: the 1.00 s premultiplied-alpha build. VP9+alpha WebM; used only by the compositing modes.
- `public/branding/closing-onset-fade-white-1080p.webm` — Real closing onset, fade white at 1080p: the 1.00 s premultiplied-alpha build. VP9+alpha WebM; used only by the compositing modes.
- `public/branding/closing-onset-fade-white-2160p.webm` — Real closing onset, fade white at 2160p: the 1.00 s premultiplied-alpha build. VP9+alpha WebM; used only by the compositing modes.
- `public/branding/closing-onset-slide-blue-1080p.webm` — Real closing onset, slide blue at 1080p: the 1.00 s premultiplied-alpha build. VP9+alpha WebM; used only by the compositing modes.
- `public/branding/closing-onset-slide-blue-2160p.webm` — Real closing onset, slide blue at 2160p: the 1.00 s premultiplied-alpha build. VP9+alpha WebM; used only by the compositing modes.
- `public/branding/closing-onset-slide-white-1080p.webm` — Real closing onset, slide white at 1080p: the 1.00 s premultiplied-alpha build. VP9+alpha WebM; used only by the compositing modes.
- `public/branding/closing-onset-slide-white-2160p.webm` — Real closing onset, slide white at 2160p: the 1.00 s premultiplied-alpha build. VP9+alpha WebM; used only by the compositing modes.
- `public/branding/closing-tail-blue-1080p.mp4` — Real closing tail, blue at 1080p: the 4.00 s opaque card. H.264 so hard cut works without alpha decode.
- `public/branding/closing-tail-blue-2160p.mp4` — Real closing tail, blue at 2160p: the 4.00 s opaque card. H.264 so hard cut works without alpha decode.
- `public/branding/closing-tail-white-1080p.mp4` — Real closing tail, white at 1080p: the 4.00 s opaque card. H.264 so hard cut works without alpha decode.
- `public/branding/closing-tail-white-2160p.mp4` — Real closing tail, white at 2160p: the 4.00 s opaque card. H.264 so hard cut works without alpha decode.

## reviews

- `reviews/2026-08-26/README.md` — Index, baseline and provenance for the self-contained repository-review evidence bundle.
- `reviews/2026-08-26/continuation-prompt.md` — Self-contained handoff prompt for continuing the evidence-led review on a newer checkout.
- `reviews/2026-08-26/uon-video-helper-comprehensive-review-2026-08-26.md` — Portable reading copy of the original external comprehensive review.
- `reviews/2026-08-26/uon-video-helper-comprehensive-review-2026-08-26.source.txt` — Byte-for-byte archive of the externally supplied review source.
- `reviews/2026-08-26/uon-video-helper-internal-code-review-2026-08-26.md` — Durable copy of the earlier in-repository review used as a lead source.
- `reviews/2026-08-26/uon-video-helper-review-critique-2026-08-26.md` — Independent critique, reproductions, disagreements and corrected priority order.
- `reviews/2026-08-26/uon-video-helper-updated-review-critique-2026-08-26.md` — Source-verified finding verdicts, omitted findings, provenance corrections and release gates.

## scripts

- `scripts/build-branding.mjs` — Converts the UoN masters into the shipped onset/tail assets. Run by hand, not by `build`.
- `scripts/check-placeholders.mjs` — Tier 0 of the gate: fails on stray template markers, reports key-shaped strings.
- `scripts/gen-placeholder-branding.mjs` — Generates the placeholder masters with a local ffmpeg. Authoring tool only.
- `scripts/run-in-engines.mjs` — Runs a spike page in Chrome, Firefox and Safari and prints all three. Maintainer tool; never part of `check`.

## src

- `src/acceptance/fixtures.ts` — Synthesised sources for the acceptance run, including paired A/V sync markers.
- `src/acceptance/main.ts` — Entry point for the acceptance page. Development only; never built.
- `src/acceptance/measure.test.ts` — Pins the drift estimator — an endpoint difference read the trend backwards.
- `src/acceptance/measure.ts` — Sync by marker, loudness by region, and two independent egress instruments.
- `src/acceptance/run.ts` — The spec 13 run: what is checked, and what is reported as needing a person.
- `src/audio/analyse.test.ts` — Proves the facade measures the same thing the components do separately.
- `src/audio/analyse.ts` — The analysis pass: loudness and true peak over one traversal of source audio only.
- `src/audio/biquad.ts` — Second-order IIR section, Direct Form II transposed, Float64 state to resist hour-long drift.
- `src/audio/chain.test.ts` — Acceptance criteria 2 and 4, including material with a real lecture's crest factor.
- `src/audio/chain.ts` — Assembles spec 5.2 steps 2-6 in order; two shapes, one for measuring and one for applying.
- `src/audio/compressor.test.ts` — Pins the static curve, the knee, and that the stereo image never shifts.
- `src/audio/compressor.ts` — Gentle 2:1 compression. RMS detection, because sample peaks are the limiter's job.
- `src/audio/gain-solve.ts` — Solves spec 5.2 step 5's gain against the chain that limits, over an injected measurement.
- `src/audio/highpass.test.ts` — Checks the -3 dB cutoff, rumble rejection, and that channels stay independent.
- `src/audio/highpass.ts` — 60 Hz Butterworth high-pass: rumble out, speech untouched.
- `src/audio/kweighting.test.ts` — Asserts the derivation reproduces the standard's published 48 kHz coefficients.
- `src/audio/kweighting.ts` — BS.1770-4 K-weighting, derived at the source's real sample rate rather than resampling to a table.
- `src/audio/limiter.test.ts` — The ceiling promise, including a signal that reaches full scale between samples.
- `src/audio/limiter.ts` — True-peak limiter sharing the meter's oversampling, so detection and limiting agree.
- `src/audio/loudness.test.ts` — Meter behaviour, with every expected value derived from BS.1770-4's equations.
- `src/audio/loudness.ts` — Gated integrated loudness, momentary and short-term curves, and LRA. Streaming.
- `src/audio/macrolevel.test.ts` — Each anti-pumping property tested alone — conditional, window, slew, freeze.
- `src/audio/macrolevel.ts` — Conditional macro-levelling: the four properties that separate it from an AGC.
- `src/audio/truepeak.test.ts` — Proves it finds inter-sample peaks and never reads below sample peak.
- `src/audio/truepeak.ts` — 4x oversampled true peak. Polyphase FIR with exact pruning, drained at end of stream.
- `src/audio/warnings.test.ts` — Triggers every 5.4 row deliberately, including the gapless false-positive guard.
- `src/audio/warnings.ts` — Detects the spec 5.4 audio-quality conditions; thresholds live with the numbers.
- `src/config/audio.ts` — Project audio choices — targets, thresholds, chain constants. Standard-defined values live in src/audio/.
- `src/config/branding.test.ts` — Pins master selection: frame rate first, resolution second, never upscaled.
- `src/config/branding.ts` — Closing style/colour/mode, the 1 s/4 s split and per-mode duration; opening placeholders.
- `src/config/presets.test.ts` — Pins the preset rules, including that the smaller preset preserves resolution.
- `src/config/presets.ts` — The two output presets and the encoder config they imply. Purpose-named, never technique-named.
- `src/config/thresholds.ts` — Pre-flight bands and probe constants — the numbers D8 will replace with measurements.
- `src/core/diagnostics.ts` — Global error capture on both threads, plus the redacted copy-diagnostics bundle.
- `src/core/egress.test.ts` — Pins that a body is a finding however it was attached, and that both realms are counted.
- `src/core/egress.ts` — Watches what leaves ONE realm. Per-global, so the worker runs its own and the two are merged.
- `src/core/keep-awake.test.ts` — Pins when the leave warning is attached: both ways of getting it wrong cost the user.
- `src/core/keep-awake.ts` — Spec 7.5: a screen wake lock across a job, re-taken on visibility, and the unload warning rule.
- `src/core/logger.test.ts` — Proves the log buffer is bounded — a one-hour encode must not grow it without limit.
- `src/core/logger.ts` — The single structured logger. Console plus a bounded ring buffer; no DOM, so the worker shares it.
- `src/core/redact.test.ts` — Proves the bundle carries media characteristics but never the media, its name, or its path.
- `src/core/redact.ts` — Redaction. This app's sensitive asset is the user's media and filename, not a token.
- `src/core/version.ts` — Reads the injected product version and build identity.
- `src/core/watchdog.test.ts` — Pins the silence watchdog, including that a late sign of life cannot resurrect a request already given up on.
- `src/core/watchdog.ts` — A timer that measures SILENCE rather than elapsed time, so a long job is never mistaken for a stuck one.
- `src/main.ts` — App entry: installs diagnostics first, mounts the shell, runs the system check.
- `src/media/audio-frames.ts` — AudioSample to planar Float32 and back, shared by the chain and branding.
- `src/media/audio-plan.ts` — The three audio passes, and the per-sample hook the encoder calls.
- `src/media/branding-fade.test.ts` — Pins what "hard cut with a 100 ms fade" means at sample level (D3).
- `src/media/branding-timeline.test.ts` — Pins where branding sits on the timeline: boundaries measured against the picture, never the longer track.
- `src/media/branding.ts` — Conform and concatenate the opaque parts; load the real closing tail; the boundary fade.
- `src/media/capability.ts` — Device checks asked against the exact target config, not a generic capability flag.
- `src/media/composite.test.ts` — Pins `compositePremultiplied` against the straight-alpha mistake that looks plausible and double-darkens.
- `src/media/composite.ts` — Premultiplied-alpha compositing. `out = brand + source×(1−a)`; the straight form double-darkens.
- `src/media/conform.test.ts` — Proves fit/pad never distorts, across 4:3, vertical and ultrawide sources.
- `src/media/conform.ts` — Scale-to-fit and pad geometry, and the reusable frame scaler the pipeline and probe share.
- `src/media/encoder-delay.test.ts` — Pins that delay compensation measures the onset it discards, at the levels the corpus carries.
- `src/media/encoder-delay.ts` — Measures the audio encoder's own delay and shifts the timeline to cancel it.
- `src/media/encoding.ts` — Mediabunny encoding configs derived from the presets; where VH-7's audio chain will hook in.
- `src/media/framerate.test.ts` — Proves the rounding rule and that timestamps derive from the index so error cannot accumulate.
- `src/media/framerate.ts` — CFR conform decisions: nearest standard rate, what conforming costs, and the timestamp grid.
- `src/media/freeze.test.ts` — Pins the freeze frame on the last CLEAN frame, not simply the last decoded one.
- `src/media/freeze.ts` — Picks the frame `over freeze frame` holds: walks back past defects, keeps a deliberate fade.
- `src/media/inspect.ts` — Demuxes a chosen file into a SourceReport. Rejects files with no video track.
- `src/media/isobmff.test.ts` — Synthetic boxes covering subtitle handlers, chapters, moov-at-end and non-ISOBMFF.
- `src/media/isobmff.ts` — A minimal box walk for the handler types Mediabunny cannot see at all.
- `src/media/lanes.test.ts` — Pins how the two feed lanes fail together: survivor stopped, cause reported over the cancellation it caused.
- `src/media/opfs.test.ts` — Pins the sweep rule: never remove a claimed directory, never remove one it could not ask about.
- `src/media/opfs.ts` — The OPFS working store: one directory per job, sync-handle writes, cleanup on every exit path.
- `src/media/output-verification.test.ts` — Pins every decoded-output compliance boundary and each fail-closed result.
- `src/media/output-verification.ts` — Shared pure postcondition for finite, in-range output loudness and true peak.
- `src/media/pipeline.ts` — Decode to encode to mux, streaming to OPFS, with progress and cancellation.
- `src/media/preflight.test.ts` — Triggers all four spec 7.3 outcomes deliberately — acceptance criterion 7.
- `src/media/preflight.ts` — The pure verdict: given what was measured, proceed / warn / discourage / block.
- `src/media/probe.ts` — The 3-second calibration probe: real decode and encode on the real file and device.
- `src/media/save.test.ts` — Pins the suggested filename and the guard that refuses the source as a destination.
- `src/media/save.ts` — Streams the result to the user's chosen location, refuses the source, and hands back what to release.
- `src/media/vtt.test.ts` — Proves cue text, settings, comments and line endings survive byte for byte.
- `src/media/vtt.ts` — Offsets WebVTT timings by rewriting only timestamp lines; never touches the words.
- `src/spike/alpha.ts` — VH-12 spike: decodes each branding onset and reads back pixel alpha. Dev-only, not built.
- `src/spike/codecs.ts` — Probes VideoEncoder and AudioEncoder support per preset and shape. How the Firefox AAC gap was found.
- `src/spike/framerate.ts` — VH-24 spike: reads a real PowerPoint export and reports measured vs declared rate.
- `src/spike/modes.ts` — VH-22 spike: runs a fixture through all three closing modes and checks output length.
- `src/spike/opfs.ts` — Drives the VH-35 sweep checks against real OPFS and real Web Locks. Dev-only; not built.
- `src/spike/preflight-audio.ts` — Checks the no-aac-encode block fires where the encoder refuses, and nowhere else.
- `src/spike/real.ts` — Runs a real recording from `public/spike/` through the pipeline; reports levels and speed.
- `src/spike/shapes.ts` — Runs the corpus's awkward properties through the pipeline, synthesised so it runs on any machine.
- `src/styles/app.css` — App shell styles. Carbon productive language at AAA.
- `src/styles/tokens.brand.css` — UoN brand tokens. Holds the D1 placeholder and nothing invented.
- `src/styles/tokens.carbon.css` — Carbon structural tokens. Every pair is contrast-asserted by test/contrast.test.ts.
- `src/ui/format.test.ts` — Pins the wording, so phrasing is tested rather than reviewed by opinion.
- `src/ui/format.ts` — Technical facts as plain language — durations, sizes, codecs, channel layouts.
- `src/ui/preflight-panel.ts` — Renders the verdict, naming a browser that works when the answer is no.
- `src/ui/source-panel.test.ts` — Pins which losses are named before processing: extra tracks, subtitles, and what is not guessed.
- `src/ui/source-panel.ts` — Renders a SourceReport, including the standing caveat about tracks we cannot see.
- `src/ui/warning-text.test.ts` — Mechanical half of "reads clearly": no jargon, no blame, always a next step.
- `src/ui/warning-text.ts` — The 5.4 warnings in words, and their rendering. Possibilities, never verdicts.
- `src/vite-env.d.ts` — Ambient types: the injected build globals and the File System Access API surface.
- `src/workers/cancellation.test.ts` — Pins the one rule: a request is cancellable from before its first await.
- `src/workers/cancellation.ts` — The worker's cancellation registry, kept apart from the worker so it can be tested in Node.
- `src/workers/job.worker.ts` — The job worker. Owns the pipeline when it lands; today proves the boundary and its error path.
- `src/workers/protocol.ts` — The typed message contract across the worker boundary.

## test

- `test/contrast.test.ts` — Makes the AAA contrast claim mechanical: every rendered pair >= 7:1 in both themes.
- `test/ebu3341/signals.ts` — EBU Tech 3341 Table 1 signals, synthesised from their published definitions.
- `test/ebu3341/tech3341.test.ts` — The compliance gate: Table 1 cases 1-23 against the meter, inside `npm run check`.
- `test/helpers/signals.ts` — Synthesised tones and silence shared by the meter tests and the EBU harness.


<!-- FILE: pm_skills/project/tickets/VH-26.md -->

# VH-26 — Mobile phone sources

Detail file for the backlog item. Working context only; the decision rationale
lives in `decision-log.md`.

## What changed on 2026-08-27

The maintainer supplied a curated list of directly-downloadable phone samples
(`mobile-phone-video-sample-downloads.md`, checked 27 August 2026). Five were
taken, and they are in `samples/phone/` — gitignored with the rest of
`samples/`, and the maintainer's own recordings are untouched.

| File | What it is | Size |
| --- | --- | ---: |
| `2020_iPhone12_FloreView_HEVC.MOV` | HEVC Main 10, 10-bit, bt2020 / **HLG**, Dolby Vision profile 8 level 4, 1080p30, 25.8 s | 27 MB |
| `2021_iPhone13Pro_4K60_DolbyVision.mov` | HEVC Main 10, 10-bit, bt2020 / **HLG**, Dolby Vision profile 8 level 10, **4K60**, 21.7 s | 139 MB |
| `2020_iPhone12ProMax_4K30_SDR.mov` | H.264 High, 8-bit, bt709, 4K30 | 91 MB |
| `2020_iPhone12ProMax_4K30_HDR.mov` | H.264 High, 8-bit, bt709, 4K30 — **not HDR despite its name** | 52 MB |
| `2018_LenovoTabE7_FloreView_H264.3gp` | H.264 Constrained Baseline, 3GP container, 640x480 | 14 MB |

## The ticket's central fear did not reproduce

VH-26 said phone HDR would come out "silently washed out or crushed". Measured
in Chrome, it does not. Luma percentiles of one frame, source against output,
read through a `<video>` element so the numbers describe what a viewer sees:

| File | | mean | p05 | p50 | p95 |
| --- | --- | ---: | ---: | ---: | ---: |
| iPhone 12 HLG 1080p | source | 110 | 5 | 109 | 219 |
| | output | 110 | 5 | 108 | 219 |
| iPhone 13 Pro DV 4K60 | source | 130 | 11 | 137 | 233 |
| | output | 131 | 13 | 139 | 233 |

Within two units everywhere. The browser tone-maps HLG to SDR when it decodes,
and the pipeline encodes what it is handed, so the round trip preserves the
picture. Chrome also reports `VideoDecoder.isConfigSupported` true for HEVC
Main 10 at both 1080p and 4K60.

## What is still open

- **Only Chrome was tested.** Firefox is the real question: if it cannot decode
  HEVC at all, an iPhone video should now hit VH-60's `no-source-decode` block
  and be refused cleanly rather than failing mid-job. That is the behaviour to
  confirm, not the colour.
- **Portrait is still absent.** None of the five is portrait, so portrait
  branding composition remains unspecified and untested.
- **A 4K60 phone video comes out BIGGER than it went in** — 139 MB to 154 MB.
  Not a defect: "best quality" anchors to the source (VH-47), and the source is
  ~51 Mbps. But a user putting phone footage through would be surprised, and
  the smaller preset is the answer to point them at.
- **Speed is fine.** 21.7 s of 4K60 encoded in 16.5 s, about 1.3x real time on
  this MacBook. Reading the 139 MB source took considerably longer than the
  encode did.

## Do not trust the published labels

The two photographyblog files named SDR and HDR are both plain 8-bit H.264
bt709 — the "HDR" one is not HDR. The supplied document warns about exactly
this ("Published labels are not a substitute for inspection"), and it was
right. Every classification in the table above comes from `ffprobe`, not from
a filename.


<!-- FILE: pm_skills/project/tickets/VH-30.md -->

# VH-30 — Trim the source

Requested by the maintainer 2026-08-25 as a future feature. Not scoped or
scheduled; this records why it is wanted and what it would touch.

## Why

Lecture recordings routinely carry material nobody wants: the wait before
people join, the fumble for the stop button, a false start. The corpus already
shows the symptom — four of nineteen sources begin mid-speech (VH-25), and the
Teams recording opens on a meeting that has not started.

Today the only fix is to trim in another tool first, which defeats the point of
a one-step browser app.

## The mechanics are cheap

`VideoSampleSink.samples(startTimestamp, endTimestamp)` and its audio
equivalent take a range natively, so the pipeline reads a window instead of a
whole track. No new decoding machinery.

## The interactions are the actual work

Every one of these is a place where trimming silently corrupts something else
if it is bolted on rather than threaded through.

- **Loudness must measure the TRIMMED region.** Analysis currently runs over
  the whole source. Leading silence or room tone drags the gated integrated
  figure, and the single linear gain derived from it would mis-level the video
  the viewer actually sees. This is the one that produces a wrong output rather
  than a wrong duration.
- **The closing boundary moves.** `over-picture` composites the build over the
  closing second of *content*, and `over-freeze` holds the last clean frame —
  both must key off the trim out-point, not the end of the file.
- **Subtitle offsets shift twice.** Cues are already offset by the opening
  duration (spec 8.1); a trim start subtracts as well, and cues falling outside
  the kept window need dropping or clamping — an undefined case today.
- **Duration estimates and progress.** `expectedFrames` and the time estimate
  both derive from source duration.
- **The calibration probe** samples three seconds; it should sample from inside
  the kept window, or it may measure material that will not be encoded.

## Design questions

- Setting the points needs a UI with a preview, which is the first thing in
  this project to need scrubbing rather than a form control.
- Frame-accurate or keyframe-accurate? Frame-accurate needs re-encoding from
  the preceding keyframe, which the pipeline does anyway — so accuracy is
  free here, unlike in a stream-copy tool.
- Does trim interact with D10 (the stream-copy fast path, iceboxed)? It would
  rule it out for trimmed jobs, since a cut mid-GOP cannot be copied.


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

## Archived: Phase 1 — Band 0 MVP — see archive/trajectory/trajectory-0001-band-0-mvp.md

## Archived: real material and Band 1's first half — see archive/trajectory/trajectory-0002-real-material-and-band-1.md

## Archived: the review remediation and Band 1's close — see archive/trajectory/trajectory-0003-review-remediation-and-band-1-close.md

### VH-32, VH-61 — closed on the maintainer's judgement

- VH-32 — Closed 2026-08-27. No redesign wanted: the simplicity is the design,
  and only a trim function would justify a second screen. See decision-log.
- VH-61 — Closed 2026-08-27 as accepted behaviour. The LRA blind spot
  under-reports, which keeps macro-levelling off — the safe direction.
- VH-17 — Reframed 2026-08-27: EchoVideo re-encodes on ingest, so this is a
  secondary-path question rather than a headline one.

### VH-31 — the estimate is a bound, and says so

- VH-31 — Closed 2026-08-27. The projection now covers the whole output rather
  than the source alone, and the panel says "at most". The content-derived
  estimator stays unbuilt; its refuters' findings moved to VH-19, which rides
  the same probe. See decision-log.

### Seven decisions closed

- VH-15 — Closed 2026-08-27. UoN IT signed off the Safari-below-26 exclusion
  (D4). VH-48 — Cut: re-encoding is the reliable option. VH-M3 — Won't do;
  the OneDrive hazard is permanent and documented. D5, D6, D7, D12 answered.
  See decision-log.

### VH-46b — the closing is one question again

- VH-46b — Shipped 2026-08-27. The closing is a four-way radio (clean cut,
  over the picture, over a freeze frame, none), Animation appears only where
  it can change anything, and every mode was verified end to end across both
  styles and both colours. See decision-log.

### VH-25, VH-23 — two features decided away

- VH-25 — Cut 2026-08-27. No picture fades at the branding boundary, either
  direction: no benefit in a lecture viewing context. The 100 ms audio fade
  stays — it prevents a click, not a fade. See decision-log.
- VH-23 — Iceboxed 2026-08-27. Openings are dormant rather than deleted, and
  the four placeholder assets no longer ship. See decision-log.

### VH-49 — Firefox is told to switch

- VH-49 — Closed 2026-08-27. The block stands as the answer: Firefox users are
  told to use a browser that works rather than served a different format. A
  pathway is iceboxed as VH-69. See decision-log.

### D1 — the padding has a brand colour

- D1 — Answered 2026-08-27. `--uon-brand-bg` is Nottingham Blue #10263B,
  confirmed against the shipped closing tail's own pixels. See decision-log.

### VH-66 — the documents and the code agree again

- VH-66 — Shipped 2026-08-27. Production shows the build identity its own
  documentation promised, the Deployment section says that `main` publishes,
  `architecture.md` names modules that exist, and the placeholder generator
  stopped emitting closings the app does not fetch. Two spec deltas captured
  rather than edited. See decision-log.

### VH-64 — progress says what it is, and a slow job is agreed to

- VH-64 — Shipped 2026-08-27. The progress bar carries an accessible name that
  follows the stage, and a discouraged verdict withholds Start until the user
  acknowledges it. See decision-log.

### VH-60 — the screen and the Start button describe one job

- VH-60 — Shipped 2026-08-27. Every asynchronous answer carries the selection
  it was asked for and a stale one is dropped; secure context, OPFS and
  source-decode became pre-flight blocks; and the H.264 level is derived from
  the shape rather than declared 5.1 for everything. See decision-log.

### VH-61 (part), VH-67 — the envelope holds, the meter keeps less

- VH-67 — Shipped 2026-08-27. Gating blocks are stored pre-weighted, which is
  the same arithmetic at half the size, and the momentary curve is kept only
  for callers that ask. A stereo hour: ~1.4 MB to ~580 kB. See decision-log.
- VH-61 — Partly shipped 2026-08-27. The pause freeze now holds the finished
  envelope, so a centred window can no longer reach into a pause and undo it.
  The LRA end-of-file half is left alone on purpose. See decision-log.

### VH-65 — least privilege where publishing happens

- VH-65 — Shipped 2026-08-27. Deploy credentials belong to the deploy job
  alone, every action is pinned to a commit SHA with its version named, and the
  publishable-media guard allows what git tracks rather than what directory a
  file sits in. See decision-log.

### VH-63 — a long job survives a tab switch

- VH-63 — Shipped 2026-08-27. A screen wake lock is held for the length of a
  job and re-taken when the tab returns to view, and `beforeunload` is attached
  while a job runs, a save streams, or a finished file is still unsaved. See
  decision-log.

### VH-68 — four faults too small to schedule

- VH-68 — Shipped 2026-08-27. The limiter's sample counter no longer wraps at
  12.4 hours, two config values that nothing read now drive the code that
  duplicated them, an entirely silent track can raise the silence warning, and
  the cross-engine tally counts completed, skipped and failed apart. See
  decision-log.

### VH-62 (part) — the harness stops flattering itself

- VH-62 — Partly shipped 2026-08-27. Criterion 3 reports `external` rather than
  a pass it did not run, the sync meter uses one clock for both tracks
  (unblocking VH-55), the worker's realm is watched and merged into criterion 9,
  and a negative control proves the egress instrument can fire. See
  decision-log.

### VH-59 — the track that is inspected is the track that is encoded

- VH-59 — Shipped 2026-08-27. Inspection and production now call the same
  primary-track API, extra video and sound tracks are named before Start, and
  metadata that fails to copy reports rather than only logging. See
  decision-log.

### VH-55 (part) — the onset loss is no longer silent

- VH-55 — Partly shipped 2026-08-27. An unmeasurable encoder delay is now
  distinguishable from a zero one, and audio discarded by delay compensation
  raises a warning above −50 dBFS. Preserving it needs the video lane re-timed
  and a sync meter that can prove it. See decision-log.

### VH-57 — cancel is answered by every phase

- VH-57 — Shipped 2026-08-27. Every request registers its controller before it
  can await, inspection and pre-flight are cancellable, and the finished-file
  verification honours the signal — so Cancel no longer answers "your video is
  ready". See decision-log.

### VH-56, VH-58 — a finished file survives the user's next click

- VH-58 — Shipped 2026-08-27. A job claims its OPFS directory before creating
  it and the boot sweep deletes only inside a granted lock, closing both
  windows in which a live workspace could be swept. See decision-log.
- VH-56 — Shipped 2026-08-27. A finished result is retained until the user has
  it somewhere: a read lease blocks disposal while a save streams, starting
  again asks before discarding, a fallback download keeps its scratch and
  object URL, and a save destination that is the source is refused. See
  decision-log.



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

## Open

- The short-term curve is still kept in full at 100 Hz — LRA needs the whole
  distribution, so it cannot simply be dropped. VH-67 removed the momentary
  curve and halved the block store, taking a stereo hour from ~1.4 MB to
  ~580 kB; what is left is the irreducible part unless LRA is computed
  incrementally. Worth revisiting only for a multi-hour recording.
  (from: VH-3, revised 2026-08-27 by VH-67)
- EBU Tech 3341 cases 20-23 pass on my reading of "continuous in phase at both
  sides of the single period", which Table 1 does not define. Confirm against
  the EBU's own signal files if they are ever downloaded. (from: VH-3)
- Worker bundle is now 404 kB — demux, decode, encode and mux paths. Spec §11
  wants the app usable offline after first load, and first load is on a managed
  University network. Worth measuring gzipped and deciding whether it needs
  splitting before launch. (from: VH-6)
- The time estimate covers decode, encode and audio analysis. It does not yet
  include the audio chain (VH-7) or branding conform (VH-8), so it will
  under-report once those land. Revisit the extrapolation then. (from: VH-5)
- The macro-levelling envelope is indexed by frame count from the start of the
  audio, which assumes the track begins at t=0 and has no gaps. True for
  everything seen so far; would misalign on a source with a delayed or
  discontinuous audio track. (from: VH-7)
- The compressor detects RMS where the spec says only "attack 20 ms, release
  200 ms". That is a choice inside the spec rather than a departure from it,
  but it is a choice, and it belongs in the decision log at close. (from: VH-7)
- Branding assets are fetched at runtime with no caching. Spec §11 wants the
  app usable offline after first load "except for branding assets, which are
  cached" — nothing caches them yet. Belongs with the deploy decision (D5) but
  the caching itself is app-level. (from: VH-8)
- Every branding frame is redrawn through a canvas to get brand-colour padding.
  Fine at 1080p; at 4K that is 150 canvas compositions per sequence. Worth
  measuring before the real 4K masters land. (from: VH-8)
- The acceptance run takes ~94 s, mostly building fixtures. Fine as a
  maintainer tool; too slow to fold into `npm run check`. (from: VH-11)
- `npm run check` now takes ~27 s, up from ~2 s: the chain tests process
  minutes of synthesised audio each, and LRA needs 60 s of material to settle
  (Tech 3342). Still fine to run on every change, but worth watching — the gate
  earns its keep only if people actually run it. (from: VH-7)
- Progress is emitted every 30 frames, which is invisible on short jobs. Fine
  for an hour of video; revisit if the UI feels dead on short ones. (from: VH-6)
- `inspectFile` runs three times per job (inspect, preflight, process), each
  re-probing frame-rate metrics and re-running `scanTrackHandlers`, which
  slices up to 64 MB — 128 MB when the head misses and the tail fallback
  fires. The most real of the review's efficiency findings. (from: 2026-08-25
  external review)
- The ISOBMFF tail fallback rarely works: `file.slice(tailStart)` starts at an
  arbitrary offset, so `readBoxes` from position 0 parses mid-`mdat`. It fails
  safe — reports "not ISOBMFF" — but does not do its job. Walking top-level box
  headers forward with 16-byte slices would find a trailing `moov` for
  kilobytes. (from: 2026-08-25 external review)
- Audio is traversed four to five times per job. Declined as premature — the
  measured cost is 3.6 s + 8.8 s per hour against a video path at 6.3× real
  time — but `audio-plan.ts:70`'s preflight duplicate is the one that is pure
  waste, and caching pass A against the file would remove it. Revisit if the
  audio path ever shows up in a profile. (from: 2026-08-25 external review)
- `detectSourceWarnings` calls `percentile()` twice, each copying and sorting
  the full short-term curve — 720k values on a two-hour file. One sort would
  do. (from: 2026-08-25 external review)
- The `TruePeakLimiter` and `TruePeakDetector` hot loops shift a 13-element
  window per sample per channel; a ring buffer removes ~13 writes per sample.
  The largest single win in the audio path, and still not a bottleneck.
  (from: 2026-08-25 external review)
- The subtitle helper text promises timings are "shifted to match the opening
  sequence", but the opening is off by default and VH-33 removes it, so the
  offset is usually zero. Revisit as part of VH-32's copy pass. (from:
  2026-08-25 external review)
- Spec §6.3 and §6.5 now carry corpus evidence inline, though the spec's own
  header points at `02-technical-rationale.md` as where evidence lives (2,008
  words, room to spare). Moving it there would clear the 3,500-word reference
  guideline without losing a sentence. (from: 2026-08-25 spec copy-edit)
- Mediabunny reports samples garbage-collected without being closed — two
  VideoSamples on every inspect+preflight, and three AudioSamples during an
  interrupted acceptance run (2026-08-27). Same shape, two paths. Original
  note: two "A VideoSample was garbage collected without first being closed" warnings
  land in the console on every inspect+preflight. Our own loops close every
  sample (`probe.ts:76-84` uses try/finally), so this looks like Mediabunny
  decoding ahead of the `samples(0, CALIBRATION_PROBE_SECONDS)` range and
  dropping what it does not need. No user impact — `diagnostics.ts` hooks
  `error` and `unhandledrejection`, not `console.error`, so it never reaches the
  errors panel — but it is noise in every diagnostics bundle and it would mask a
  real leak of ours. (from: 2026-08-25, seen while verifying VH-33)
- Measure `BEST_SOURCE_BLEND` instead of judging it. VH-47 shipped with 0.5 —
  the geometric mean, i.e. "no basis to trust the source estimate over the shape
  estimate" — and it is the only constant in that rule not backed by a number.
  The experiment is bounded and the machinery exists: the calibration probe
  already decodes `CALIBRATION_PROBE_SECONDS` of the real file, so encode that
  same sample at source x{1.0, 1.25, 1.5, 2.0, 3.0}, put each through a second
  encode standing in for the destination's ingest, and score against the first
  decode. Two corpus files at widely separated densities determine it; a third
  validates. It matters most on the Teams file: at 0.6 its figure falls from
  2.00 to about 1.6 Mbps. (from: 2026-08-26 VH-47)
- Measure the AAC true-peak overshoot per job rather than carrying a corpus
  constant. `ENCODE_TRUE_PEAK_HEADROOM_DB` is 1.0 dB because four real
  lectures ranged 0.02-0.44; the calibration probe already decodes
  `CALIBRATION_PROBE_SECONDS` of the real file, so encoding and decoding that
  same excerpt at the job's exact audio config would give the actual figure and
  let the limiter stop holding headroom nobody's file needs.
  (from: 2026-08-27 VH-50)
- AAC costs integrated loudness as well as peak, and nothing models it. The
  same four files lost 0.02-0.41 LU between the limiter's output and the
  decoded file, worst on the most heavily limited material, so a job can sit at
  -16.4 while the chain solved -16.0 — 80% of the +/-0.5 budget spent on the
  codec. Measurable by the same probe round-trip as the item above.
  (from: 2026-08-27 VH-50)
- The acceptance page takes over an hour in a browser: criterion 2's corpus
  alone spent roughly four minutes per synthesised entry, in-process on the
  main thread, and the run was abandoned after four of them. A harness nobody
  can sit through is a harness that never goes red, whatever its statuses say.
  Run the corpus in the worker, or shorten the fixtures and say so.
  (from: 2026-08-27 VH-62)
- Resource-timing entries are added when a request COMPLETES, so
  `EgressWatch.stop()` can miss a request that is still in flight — a HEAD to a
  branding asset did not appear in `allRequests` during a direct test. The
  body-wrapping instrument is unaffected; the passive timeline is not a
  complete census. (from: 2026-08-27 VH-62)

