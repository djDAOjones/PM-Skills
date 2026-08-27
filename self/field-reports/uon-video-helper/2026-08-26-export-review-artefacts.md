<!-- field-report: project=uon-video-helper · date=2026-08-26 · type=export
     · pm-skills=4.9.2
     · source=tracked reviews tree at git commit 09702c2d8c749e72943678c94c558cf33ac1270f
     · redacted=53 absolute checkout path occurrence(s) to <checkout>; 1 other home path occurrence(s) to <home>
     · not-redacted=already-public personal names, public repository/account identifiers, commit hashes, workflow identifiers, and project facts -->

# UoN Video Helper review-artefact export

The review material was produced on 2026-08-26 and landed in the repository on 2026-08-27.

| Source file | Bytes at snapshot |
| --- | ---: |
| `reviews/2026-08-26/README.md` | 2,519 |
| `reviews/2026-08-26/continuation-prompt.md` | 15,702 |
| `reviews/2026-08-26/uon-video-helper-comprehensive-review-2026-08-26.md` | 82,226 |
| `reviews/2026-08-26/uon-video-helper-comprehensive-review-2026-08-26.source.txt` | 88,863 |
| `reviews/2026-08-26/uon-video-helper-internal-code-review-2026-08-26.md` | 29,410 |
| `reviews/2026-08-26/uon-video-helper-review-critique-2026-08-26.md` | 19,099 |
| `reviews/2026-08-26/uon-video-helper-updated-review-critique-2026-08-26.md` | 46,665 |
| **Total** | **284,484** |
<!-- FILE: reviews/2026-08-26/README.md -->

# Repository review bundle — 26 August 2026

This directory makes the repository-review evidence self-contained. A new task
does not need Downloads, chat attachments, temporary files or prior
conversation history.

## Files

| File | Role |
| --- | --- |
| `uon-video-helper-comprehensive-review-2026-08-26.md` | Portable reading copy of the original 929-line external review. Local editor links are repository-relative. |
| `uon-video-helper-comprehensive-review-2026-08-26.source.txt` | Byte-for-byte archive of the supplied Downloads file. |
| `uon-video-helper-review-critique-2026-08-26.md` | The independent critique, reproductions, disagreements and corrected priority order. |
| `uon-video-helper-updated-review-critique-2026-08-26.md` | The completed continuation: source-verified R-01–R-16 verdicts, further reproductions, six omitted findings, provenance corrections and release gates. |
| `uon-video-helper-internal-code-review-2026-08-26.md` | A durable copy of the earlier in-repository review used as a lead source by the comprehensive review. |
| `continuation-prompt.md` | Self-contained prompt for continuing the same evidence-led review process in a new task. |

## Baseline

All four review documents concern commit:

`66227e51dc0905c1853d79fb927d8f009be80ad4`

Always verify the current branch, commit and worktree status before applying
their conclusions to newer code.

## Usage

Use `uon-video-helper-updated-review-critique-2026-08-26.md` as the current
finding verdict and remediation-order source. `continuation-prompt.md` is kept
as the self-contained instruction record that produced it; the prompt refers
only to repository-relative paths.

## Provenance

The `.source.txt` archive is verified byte-for-byte against:

`<home>/Downloads/uon-video-helper-comprehensive-review-2026-08-26.md`

The Markdown reading copy differs only by replacing editor-specific absolute
repository links and `:line` suffixes with portable repository-relative links.
The absolute Downloads path is recorded here only as provenance. No
continuation task depends on it.

The internal review was copied from what was then an untracked file at
`pm_skills/project/code-review-2026-08-26.md`. That source was left untouched
while this bundle was assembled, then swept into commit `d02b3c8` by a
`git add -A` and removed again on 2026-08-27 once the two were confirmed
byte-identical apart from one link rewritten for this directory. The copy here
is the surviving record; project memory holds no second one.

<!-- FILE: reviews/2026-08-26/continuation-prompt.md -->

# Continuation prompt — repository-review critique

Copy the text below into a new task opened at the UoN Video Helper repository
root.

---

Continue the independent, evidence-led review of the UoN Video Helper
repository begun on 26 August 2026.

## Start with these repository files

Read all three review documents completely:

1. `reviews/2026-08-26/uon-video-helper-comprehensive-review-2026-08-26.md`
   — the 929-line external comprehensive review being assessed.
2. `reviews/2026-08-26/uon-video-helper-review-critique-2026-08-26.md`
   — the independent critique and executable reproductions from the first
   continuation.
3. `reviews/2026-08-26/uon-video-helper-internal-code-review-2026-08-26.md`
   — the earlier in-repository code review that the comprehensive review
   appears to consolidate.

The review bundle is indexed by:

- `reviews/2026-08-26/README.md`

Do not rely on Downloads, chat attachments, temporary paths or prior
conversation history. The repository copies above are the durable sources.

## Purpose

Determine what the comprehensive external review gets right, what it gets
wrong or overstates, what it omits, and whether its evidence, severity
ratings, proposed remedies, dependencies and implementation order withstand
direct verification against the repository.

This task continues that process. Treat all three review documents as evidence,
not authority. Independently verify material claims before adopting them.

This is a **read-only review and investigation task**. Do not implement fixes,
edit project memory, alter protected documentation, update the backlog, commit,
push or deploy unless the user separately authorises that action.

## Baseline and checkout

The comprehensive review examined:

`66227e51dc0905c1853d79fb927d8f009be80ad4`

When the review bundle was added:

- `HEAD` was still `66227e5`.
- The checked-out branch was `codex/repository-review-remediation`.
- That branch and `main` pointed to the same commit.
- The pre-existing `pm_skills/project/code-review-2026-08-26.md` remained
  untracked and untouched.

Before relying on this baseline:

1. Run `git status --short --branch`.
2. Record `git rev-parse HEAD` and `git branch --show-current`.
3. Preserve unrelated and untracked files.
4. If the source has moved, distinguish findings that still apply from
   findings fixed or changed since `66227e5`.

## Required project context

Follow `AGENTS.md` and the repository's PM-Skills workflow. At minimum read:

- `README.md`
- `AGENTS.md`
- `pm_skills/project/brief.md`
- `pm_skills/project/architecture.md`
- `pm_skills/project/conventions.md`
- the Active section of `pm_skills/project/backlog.md`
- relevant entries in `pm_skills/project/decision-log.md`
- relevant sections of `pm_skills/project/file-map.md`

For product, DSP, infrastructure and UI claims, consult as applicable:

- `docs/01-specification.md` — authoritative specification
- `docs/02-technical-rationale.md` — settled rationale
- `docs/03-open-decisions.md`
- `DEV-INFRASTRUCTURE.md`
- `UI-STANDARDS.md`

Important protected paths include:

- `docs/*.md`
- `src/audio/kweighting.ts`
- `src/audio/loudness.ts`
- `src/audio/truepeak.ts`
- `test/ebu3341/`
- `src/config/`

Do not edit these during review. Any future DSP change must rerun the EBU
harness. Never modify, move or delete anything under `samples/`; real
recordings may be inspected read-only.

## Established conclusions to challenge, preserve or correct

The first critique classified the comprehensive review's 16 findings as:

### Confirmed substantially as written

- R-02
- R-03
- R-05
- R-07
- R-09
- R-12
- R-13
- R-14
- R-15
- R-16

### Correct in substance but requiring correction or qualification

- R-01
- R-06
- R-10
- R-11

### Overstated or materially mis-rated

- R-04
- R-08

Keep these conclusions open to correction if new source evidence contradicts
them, but do not discard the executable evidence below without reproducing or
refuting it.

## Key reproduced evidence

### R-02 — EOF true-peak failure

The first critique reproduced the defect against the real
`TruePeakDetector` and `TruePeakLimiter`.

For a 480-frame signal containing one full-scale sample at EOF:

```text
detector without post-roll   -64.05359209046344 dBTP
detector after zero pad        0                dBTP
limiter look-ahead           240 samples
peak from process() output     0
peak from flush() tail         1.0 = 0 dBFS
```

Moving the impulse backwards from EOF gave:

```text
0, 1 or 3 frames from EOF      0.00 dBFS
6, 7, 12 or 240 frames back   -2.00 dBFS
```

The causal polyphase FIR receives no post-roll for the final samples.
`AudioAnalyser.finish()` reads the detector immediately, while
`TruePeakLimiter.flush()` drains its delay using one frozen gain instead of
clocking silence through the normal detector and gain path.

This is both a limiter defect and a verifier defect: final decoded-output
verification uses the same incomplete true-peak detector.

### R-01 — real material misses the output contract

The existing real-source result tracked in VH-50 is:

- Source: approximately `-21.86 LUFS / -1.86 dBTP`
- Output: `-16.75 LUFS / -1.98 dBTP`
- Contract: `-16 ±0.5 LUFS` and no higher than `-2.0 dBTP`

The comprehensive review's useful additional decomposition was:

- Pass-B measurement: approximately `-22.47 LUFS`
- Selected gain: `+6.47 dB`
- Limited pre-encode output: approximately `-16.41 LUFS`
- Resampling and AAC moved it farther from target

R-01 does **not** depend on R-02. In `src/audio/chain.ts`, the measuring
pass uses `gainDb: null`, which also sets `this.limiter = null`. Gain is
solved against an unlimited chain and then used in a chain that does limit.
Fixing six unmeasured EOF samples does not close that gain loop.

Also verify:

- `WARNING_THRESHOLDS.targetMissedByLu` is 1 LU while the contract is
  ±0.5 LU.
- Final true peak is logged but not enforced.
- Verification exceptions may be swallowed.
- An out-of-contract result can still be reported as successful.

Do not sequence R-01 behind R-02 merely because the comprehensive review does.

### R-03 — source-onset loss

`AudioTimelineShift.apply()` deliberately drops AAC samples that would land
before timestamp zero during encoder-delay compensation.

The first critique measured the first 44 ms of the read-only real corpus.
Exactly three files contained energy meaningfully above the noise floor,
including two at approximately `-26.4` and `-27.0 dBFS` and one at
approximately `-47.8 dBFS`.

The shift preserves later synchronisation but can replace real source onset
with encoder-priming silence. Preserve the distinction between "sync is
correct" and "source content is conserved."

### R-10 — real defect, unsafe prescribed remedy

The review correctly identifies an EOF problem in LRA measurement, but its
proposed fix — append 1.5 seconds of silence before finalising LRA — was shown
to be unsafe.

| Tail event | At EOF | EOF + 1.5 s silence | Same event mid-file |
| --- | ---: | ---: | ---: |
| 1 s loud passage | 0.00 | 10.61 | 10.80 |
| 2 s loud passage | 8.81 | 12.95 | 13.18 |
| 3 s loud passage | 12.43 | 13.97 | 14.02 |
| 5 s quiet passage | 3.79 | 15.32 | 6.51 |

Conclusions:

- EOF suppression is genuine and can be severe.
- Blind zero-padding is not a generally correct remedy.
- On quiet endings, padding creates partially silent short-term windows that
  survive the relative gate and dramatically overstate LRA.
- This changes behaviour because `shouldApplyMacroLevelling()` activates the
  leveller when `LRA > 9`.
- The prescribed padding could enable macro-levelling solely because a
  recording ends in room tone.

Do not implement or recommend the 1.5-second padding remedy without a
standards-grounded and gate-aware design.

R-10's other sub-finding may be stronger than the review states:
specification §5.2 step 3 describes pause freeze after smoothing, clamping and
slew limiting so pauses and room tone are never amplified.
`src/audio/macrolevel.ts` freezes the raw correction before smoothing.
Verify whether the final applied envelope can still raise pauses.

### R-06 — only the video half still drifts

Previous verification found:

- Video config drift is real:
  `videoEncoderConfigFor()` probes `avc1.640033`, while
  `videoEncodingConfigFor()` gives Mediabunny abstract codec `avc`.
- The Level 5.1 throughput issue for 3840×2160 at 60 fps should be checked
  against authoritative H.264 limits.
- The AAC claim is stale: VH-49 changed preflight to probe the actual runtime
  sample rate, channel count and mono/stereo bitrate.

Do not recommend redoing the AAC half as though it remains unfixed.

### R-04 — mixed finding, classification overstated

Three sub-claims were considered strong:

- A fallback download can be treated as complete immediately after
  `anchor.click()`.
- Beginning another process may dispose the OPFS workspace while a save
  `pipeTo()` is still reading it.
- The save picker does not prevent the user selecting and overwriting the
  source file.

The claimed partial OPFS write defect was not demonstrated. The code ignores
the byte count returned by the sync write, and guarding it is sensible, but
the review explicitly did not test actual OPFS short writes or quota
exhaustion. Keep it classified as an unguarded invariant or supported risk
unless reproduced.

### R-08 — real race, poor effort/risk assessment

The OPFS/Web Lock race was judged real:

- A job directory is created before its lock is acquired.
- The sweeper determines lock availability in one callback and deletes later,
  outside the lock callback.

The apparent remedy is small: claim before creation and perform deletion while
the lock is held. Reassess implementation risk carefully, but do not let an
inflated estimate bury a cheap data-loss prevention change.

### R-11 — acceptance false-pass routes

Previous verification supported these concerns:

- Criterion 2 crops the output region and can exclude t=0 and EOF defects.
- Missing decoded measurements can leave an empty result set whose default
  aggregates still pass.
- Resource warnings may not fail the run.
- Request observation does not cover every context equally.

Qualification: criterion 3's detail text admits official EBU cases 7 and 8 are
skipped. Its status may be too flattering, but the omission is disclosed
rather than concealed.

## Findings omitted by the comprehensive consolidation

Recheck and preserve or reject each explicitly:

1. `SlidingMinimum` stores an indefinitely increasing position in an
   `Int32Array`; at 48 kHz it can wrap after roughly 12.4 hours. This is
   outside the one-hour envelope but is a real latent defect.
2. Beginning another job can silently destroy an unsaved result through
   `processResult.replaceChildren()` and `releaseFinished()`, even without
   a racing save.
3. Declared configuration values appear unused:
   `WARNING_THRESHOLDS.clippingDbtp` and `COMPRESSOR.softKnee`.
4. An entirely silent source may never trigger the extended-silence warning
   because the check is nested under `if (audible.length > 0)`.
5. `scripts/run-in-engines.mjs` may report a missing engine as skipped
   without representing that omission correctly in its final tally.

## Provenance concerns

Investigate and state clearly:

- The headline VH-50 measurement was already in
  `pm_skills/project/backlog.md` before the comprehensive review presented it
  in its executive summary. The review added useful pass-B measurements, but
  should distinguish existing from new evidence.
- The report says its isolated copy came from `git archive HEAD`, but
  `samples/` is gitignored and absent from that archive. A real-source run in
  the isolated copy required an additional transfer or mount step that is not
  described.
- This is a provenance gap, not by itself evidence that the measurement is
  fabricated.

## Strengths already supported

Do not make this a purely negative exercise. Previous inspection supported:

- Source media remains local and read-only.
- No production media, filenames or media characteristics were found leaving
  the device.
- Processing is streamed with backpressure.
- Mediabunny outputs explicitly use `fastStart: false`.
- Worker protocol and major data structures are typed and separated.
- The canonical suite passed at the baseline with 32 files, 355 tests passed
  and 1 skipped.
- Mediabunny remains the only runtime dependency.

## Required method

1. Read the complete comprehensive review, not only its executive summary.
2. Trace every material claim to source and tests.
3. Reproduce high-impact claims where practical with small, isolated,
   removable tests.
4. Do not modify the real sample corpus.
5. Remove scratch files after experiments.
6. Do not rely on mocked WebCodecs as evidence of browser capability.
7. For external technical claims, use authoritative primary documentation or
   standards and distinguish standards requirements from project choices.
8. Do not convert untested browser risks into confirmed defects.
9. Check whether findings changed since `66227e5`.
10. Run `npm run check` before closing if any local experiment or file change
    occurs.
11. Do not edit implementation, protected documentation, backlog, decision
    log or project memory without separate authorisation.
12. Preserve unrelated and untracked files.

Use precise classifications:

- confirmed defect;
- code-proven defect;
- experimentally reproduced defect;
- strongly supported risk;
- unguarded invariant;
- browser-dependent risk;
- standards or product-contract mismatch;
- hardening recommendation.

## Questions to answer

- Are there further factual errors, stale claims or unsafe remedies in the
  comprehensive review?
- Are severities and dependencies proportionate to demonstrated impact?
- Does the suggested change order minimise user harm and implementation risk?
- Which findings are release blockers, pilot blockers, ordinary defects,
  hardening work or documentation corrections?
- What evidence would move each supported risk into a confirmed defect?
- Did the first critique overlook anything in the 929-line review?
- Have findings been fixed or invalidated on the current branch?
- Can each proposed DSP remedy be shown not to introduce a worse result on a
  boundary corpus?
- Does the acceptance harness test the invariant its UI says passed?

## Deliverable

Produce an updated Markdown critique that is self-contained and suitable for
committing to this review bundle.

Include:

1. Executive verdict.
2. Current repository baseline and drift from `66227e5`.
3. Method and limitations.
4. A finding-by-finding table covering R-01 through R-16.
5. Detailed analysis of every disagreement or qualification.
6. Reproduction evidence with exact commands or concise experimental setup.
7. A section covering omitted findings.
8. A provenance and evidentiary-quality assessment.
9. A corrected priority order separating:
   - immediate cheap risk reductions;
   - release-blocking correctness work;
   - transactional/lifecycle work;
   - test-harness repair;
   - medium-term hardening and documentation.
10. Clear "agree", "partly agree" and "disagree" conclusions.
11. A final list of what remains unverified.
12. Confirmation that no repository or sample file was altered.

Write for a maintainer who owns product direction but does not want deep
implementation concepts explained unless they affect a decision. Lead with
outcomes, use exact evidence and avoid severity inflation.

Do not merely restate the first critique. Continue it: challenge its
assumptions, reproduce anything doubtful, and improve it where evidence
supports doing so.

<!-- FILE: reviews/2026-08-26/uon-video-helper-comprehensive-review-2026-08-26.md -->

# UoN Video Helper — Read-Only Comprehensive Repository Review

Review date: 26 August 2026  
Repository commit: `66227e51dc0905c1853d79fb927d8f009be80ad4`

## 1. Executive summary

UoN Video Helper has a coherent browser-only architecture, strong privacy intent, explicit streaming constraints, useful diagnostics, and a substantial automated safety net. However, it is not ready for general production use. The review found no Critical issues, but identified 9 High, 6 Medium, and 1 Low consolidated findings.

The clearest release blocker is that the current pipeline can create an MP4 that fails both stated audio requirements while still reporting success. In an isolated Chrome run using a real repository sample, the source measured −21.86 LUFS/−1.86 dBTP and the output measured −16.75 LUFS/−1.98 dBTP, outside the required −16 ±0.5 LUFS and ≤−2.0 dBTP limits. Separate executable checks demonstrated an end-of-file true-peak defect capable of leaving a final transient at 0 dBTP.

Other serious risks involve source-onset deletion, stale preflight results, partial OPFS writes, output deletion during saving, cancellation races, multi-track data loss, and a Web Lock race capable of deleting a live workspace.

Strong aspects include:

- Source media remains local and read-only.
- No production source-media, filename, or media-characteristic egress was found.
- Media processing is streamed with backpressure.
- Every Mediabunny output explicitly disables in-memory fast-start behaviour.
- The worker protocol and major data objects are typed and well separated.
- The isolated canonical quality gate passed 355 tests with one skip.
- Dependency audits reported no known vulnerabilities.

The five highest-priority actions are:

1. Finalize true-peak detection and limiting correctly at EOF.
2. Calibrate loudness against the complete output chain and enforce final decoded-output acceptance.
3. Preserve every source audio sample and its source timeline.
4. Make OPFS writing, verification, saving, and deletion one explicit ownership transaction.
5. Bind preflight to an immutable file/preset job and make cancellation authoritative across every phase.

The current UI also does not yet expose the final opening/closing branding choices, so the repository is not feature-complete for the stated product even apart from these defects.

No suggested change was applied. The original repository remained unchanged.

## 2. Repository status and review environment

| Item | Observed state |
|---|---|
| Repository | [UoN Video Helper](../..) |
| Branch | `main`, tracking `origin/main`, ahead/behind 0/0 |
| Starting and final commit | `66227e51dc0905c1853d79fb927d8f009be80ad4` |
| Starting status | No staged or unstaged tracked changes; one pre-existing untracked file: `pm_skills/project/code-review-2026-08-26.md` |
| Final status | Identical to starting status |
| Submodules | None |
| Worktrees | One, at the repository root |
| Remote | `https://github.com/djDAOjones/UoN-Video-Helper.git`; no embedded credential |
| Tags | None observed |
| OS | macOS 26.5.2 / Darwin build 25F84, arm64 |
| Tools | Node 24.5.0; npm 11.5.1; Git 2.49.0; ripgrep 15.2.0; Python 3.10.13 |
| Installed build tool | Vite 8.2.2 in the isolated copy |
| Network | Restricted initially; approved read-only access was used for npm registry metadata and authoritative standards documentation |
| Credentials | None required; no backend, database, authentication service, or production environment was accessed |
| Isolation | `/private/tmp/uon-video-review.Y90uPA`, populated from `git archive HEAD`; dependencies, caches, build output, and custom validation stayed there |
| Browser validation | Local isolated Vite server at `127.0.0.1:5179`, inspected in the in-app Chromium browser |
| Repository integrity | `git diff` and `git diff --cached` were empty at close; branch, commit, remote, worktree, and untracked status were unchanged |

The pre-existing untracked review document was used only as a lead index. Every material claim reported below was independently checked against current source, callers, tests, configuration, or executable behaviour. It was not modified.

The repository resides in OneDrive. That is a documented hostile-filesystem risk for project-memory surgery, but no unexpected divergence or conflict copy appeared during this read-only run.

## 3. System purpose and architecture

The product is a static, browser-only conveyor for turning a local educational video into a newly encoded, University-branded, loudness-normalised MP4. Its intended users are University staff who should not have to choose codecs, bitrates, levels, or technical settings.

Principal technologies:

- TypeScript and vanilla browser UI
- Vite
- Web Workers
- WebCodecs
- Mediabunny 1.55.2
- Origin Private File System
- Vitest, ESLint, TypeScript, Prettier check, Markdownlint
- GitHub Actions/GitHub Pages deployment configuration

There is no server, database, account system, authentication, authorisation, tenant model, queue, webhook, analytics backend, or production API.

```text
Untrusted local File/Blob — opened read-only
            │
            ▼
     Main-thread coordinator
     file selection + UI state
            │ typed messages
            ▼
         Job worker
     ┌────────┴─────────┐
     │ inspect source   │ → SourceReport
     │ preflight device │ → Capability/verdict
     └────────┬─────────┘
              ▼
        Processing pipeline
     ┌───────────────────────┐
     │ Pass A: source audio  │
     │ Pass B: gain planning │
     │ Pass C: encode/mux    │
     └─────────┬─────────────┘
               │
       inbound same-origin
       branding assets ────────► video/audio mux lanes
               │
               ▼
       job-scoped OPFS MP4
               │ OPFS-backed File
               ▼
      picker stream or download
               │
               ▼
      explicit workspace cleanup
```

Important boundaries:

- The local source file is untrusted input but is never opened for writing.
- Source media crosses from main thread to the worker but not off-device.
- Branding assets are fetched inbound from the same origin.
- OPFS is persistent scratch storage scoped to the browser origin.
- Saving crosses from OPFS into a user-selected filesystem destination or browser download.
- CI has GitHub Pages and OIDC permissions and is therefore the main privileged repository-side process.
- Browser codecs, filesystem implementations, and Mediabunny are critical operational dependencies.

The main application enters through [index.html](../../index.html) and [src/main.ts](../../src/main.ts). The independent browser acceptance surface enters through [acceptance.html](../../acceptance.html).

## 4. Review coverage matrix

Finding counts use primary ownership and are not double-counted across components.

| Component | Purpose | Depth | Important material inspected | Validation | Primary findings | Limitations |
|---|---|---:|---|---|---:|---|
| Root configuration | Build, package, documentation, tool configuration | Full | `package*.json`, Vite, TypeScript, ESLint, README, agent rules | Install, build, lint, typecheck, docs checks | 1M | Hosting settings outside Git were unavailable |
| `src/audio/` | Loudness, K-weighting, macro-level, compression, true peak | Full | All implementation and tests; protected DSP traced end-to-end | Unit suite plus custom EOF/LRA reproductions | 1H / 1M / 1L | Official downloaded EBU corpus not run |
| `src/media/` | Inspection, preflight, branding, encode, mux, OPFS, save | Full | All first-party files and relevant Mediabunny internals | Unit suite, real browser processing, custom sample analysis | 6H | Safari/Firefox and destructive fault injection not run |
| `src/workers/`, `src/main.ts`, `src/core/` | Request coordination, state, cancellation, diagnostics | Full | Protocol, worker handlers, state transitions, timeouts, logger | Unit suite and browser acceptance | 2H / 1M | Every asynchronous interleaving was not executable |
| `src/ui/`, `src/styles/`, `index.html` | User workflow and presentation | Full plus browser inspection | All UI modules, semantics, tokens, states, responsive layout | Desktop and 390×844 browser inspection; contrast tests | 1M | No screen reader or voice-control session |
| `src/acceptance/` | Real-browser acceptance criteria and fixtures | Full | Fixture generation and all acceptance criteria | Full local Chrome acceptance run | 1M | Four criteria remain expressly manual |
| `test/` | Unit, integration, EBU and policy tests | Full for first-party tests | 32 test files and generated-fixture rules | 355 pass, 1 skipped | Included above | Generated binary fixtures were not hand-edited or exhaustively decoded |
| `src/config/` | Presets and load-bearing numbers | Full | Presets, thresholds, branding, version | Typecheck/tests/build | Cross-cutting | Configuration accuracy still depends on real devices |
| `scripts/`, `.github/`, `public/` | Build guards, CI, public assets | Targeted/full for text; sampled for binaries | Placeholder guard, workflow, branding inventory | Build inventory, static inspection, audit | 1M | Branding binaries were not visually inspected frame-by-frame |
| `docs/` | Protected specification and rationale | Full | Specification, rationale, open decisions | Markdown lint and link validation | 1M | Proposed corrections were not written because docs are protected |
| `pm_skills/project/` | Current decisions, backlog and architecture memory | Targeted per project rules | Hot sections, relevant decisions/tickets, untracked review lead | Memory structural check | Informational | Framework-owned `pm_skills` internals were sampled, not reviewed as product code |
| `node_modules/` | Third-party implementation | Sampled | Mediabunny paths needed to verify primary-track selection and encoder config | npm audit and metadata analysis | None assigned | Transitive source was not manually reviewed package by package |
| `dist/` | Generated deployment output | Generated only in isolation | Bundle inventory and source maps | Vite production build | None assigned | Not reviewed as authoritative source |
| `samples/` | Maintainer recordings | Targeted, read-only | Onset energy and one full output case | Browser processing and independent audio measurements | Evidence only | Not every sample was processed |
| Backend/database/auth | Not present | Excluded | Repository-wide search | N/A | 0 | Irrelevant to this static application |

The repository contains 209 tracked files. The review inspected every significant first-party component; generated binaries, third-party packages, real recordings, and framework-owned project-management internals received risk-based rather than line-by-line review.

## 5. Validation results

### Completed successfully

| Command/check | Location | Tool | Result and relevant output | Interpretation | Original unchanged |
|---|---|---|---|---|---|
| `git status --short --branch`, `git rev-parse HEAD`, diffs, worktree and remote inspection | Original repository | Git 2.49.0 | Exit 0; starting and final states identical | Integrity confirmed | Yes |
| `npm ci --ignore-scripts --no-audit --no-fund` using a temp npm cache | Isolated copy | npm 11.5.1 | Exit 0; 243 packages installed | Lockfile resolves reproducibly on this environment without lifecycle scripts | Yes |
| `npm run check` | Isolated copy with read-only copied Git metadata | Node 24.5.0/npm 11.5.1 | Exit 0; placeholders, typecheck, lint, tests, build, docs and memory structure passed | Canonical gate is green but does not cover the demonstrated boundary defects | Yes |
| Vitest portion of `npm run check` | Isolated copy | Vitest | 32 files; 355 passed, 1 skipped; 23.05 seconds | Broad and fast safety net; one standards case remains skipped | Yes |
| Vite production build | Isolated copy | Vite 8.2.2 | 19 modules; worker 435.77 kB uncompressed; app 23.23 kB; CSS 9.21 kB | Production bundle builds successfully | Yes |
| Documentation lint/link checks | Isolated copy | Markdownlint/custom link checker | 10 linted Markdown files, zero issues; 63 checked files, zero broken links | Documentation is structurally healthy | Yes |
| `npm audit --json` | Isolated copy | npm 11.5.1 | Exit 0; zero known vulnerabilities at all severities | No current npm advisory finding | Yes |
| `npm audit --omit=dev --json` | Isolated copy | npm 11.5.1 | Exit 0; zero production vulnerabilities | Runtime dependency audit clean | Yes |
| Responsive browser inspection | Local isolated server | In-app Chromium | No 390 px horizontal overflow; panels remained within viewport | Basic mobile reflow is sound | Yes |

The memory check emitted five non-blocking size warnings and zero structural failures. The warnings concern backlog/ticket word budgets, not product correctness, and were not “fixed” during this review.

### Completed with failures or material findings

| Command/check | Location | Result | Classification |
|---|---|---|---|
| Initial `npm ci --ignore-scripts --no-audit --no-fund` | Isolated sandbox | `ENOTFOUND` plus npm exit-handler error | Review-environment network restriction; rerun successfully with approved read-only network access |
| Initial `npm run check` in the `git archive` copy | Isolated copy without `.git` | Documentation link check could not resolve tracked-file metadata | Isolation-construction issue, not repository defect; exact rerun passed after supplying copied Git metadata |
| `npm outdated --json` | Isolated copy | Exit 1 because TypeScript 6.0.3 has 7.0.2 available | Update available, already represented by backlog ecosystem-upgrade work; not an urgent defect |
| `/acceptance.html` run | Local isolated Chrome; 85.8 seconds | 7 pass, 0 fail, 4 manual; produced playable worker output and cleaned OPFS | Functional acceptance succeeded, but console emitted unclosed `AudioSample` and `VideoSample` warnings |
| Real sample processing through current browser pipeline | Isolated Chrome | Output −16.75 LUFS/−1.98 dBTP against −16 ±0.5/≤−2.0 | Confirmed production-output failure |
| Custom true-peak/limiter EOF harness | Temporary isolated scripts | Final-frame impulse remained at 0 dBTP; moving it six frames earlier produced about −2.0 dBTP | Confirmed EOF defect |
| Custom file-LRA harness | Temporary isolated scripts | Current vs correctly padded examples differed by 2.69 LU and 6.02 LU | Confirmed file-finalization defect |
| Browser accessible-name inspection | Local isolated server | Initial hidden `<progress>` had no label, `aria-label`, or `aria-labelledby` | Probable WCAG name/role/value defect |

The browser acceptance’s synthetic results were:

- quiet: −16.00 LUFS / −7.87 dBTP
- hot: −16.00 / −7.24
- drift: −16.11 / −2.14
- inconsistent: −16.08 / −2.95
- VFR markers: 12/12, systematic 5.8 ms, drift 9.0 ms, spread 24 ms
- cancellation OPFS directories: 0 → 1 → 0
- worker-path file: 81 kB, 4.10 seconds
- smaller-output result: 468 kB versus 1,223 kB
- egress observer: 47 same-origin requests and no observed request body

### Not run

- Safari and Firefox browser acceptance
- Screen-reader, voice-control, switch-control, and browser-zoom rehearsal
- Official full EBU test-set download and execution
- Subjective listening for pumping, clipping, transitions, or sync
- Every real recording and 5/20/60-minute device matrix
- Large multi-gigabyte fallback-download lifetime test
- Deterministic multi-tab Web Lock race
- Sleep, wake-lock, reload, crash, and tab-force-close recovery
- Deliberate disk-quota exhaustion or actual OPFS short writes
- Real malformed/fuzzed media corpus
- Live GitHub Pages deployment, repository permissions, branch protection, or hosting headers
- Penetration test against a deployed origin
- Disaster-recovery exercise; there is no backend data store to restore

These were unavailable, unsafe for a read-only review, required unsupported browsers/hardware, or require stakeholder-owned infrastructure.

## 6. Prioritised findings

### R-01 Final output can fail stated loudness and true-peak acceptance

- **Severity:** High
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Audio correctness / misleading success
- **Location:** [src/media/audio-plan.ts](../../src/media/audio-plan.ts), [src/audio/chain.ts](../../src/audio/chain.ts), [src/media/encoding.ts](../../src/media/encoding.ts), [src/workers/job.worker.ts](../../src/workers/job.worker.ts)
- **Affected component or flow:** Source analysis → gain planning → limiting → resampling/AAC → final verification
- **Evidence:** A real 44.1 kHz sample produced −16.75 LUFS and −1.98 dBTP. Pass B measured −22.47 LUFS without the limiter, selected +6.47 dB, and the limited pre-encode output was already −16.41 LUFS. Resampling and AAC moved it further.
- **Current behaviour:** Gain planning assumes the nonlinear limiter does not change integrated loudness. Final verification warns only beyond a 1 LU miss, logs true peak without enforcing it, and swallows verification exceptions.
- **Why it matters:** The application’s main promise is a correctly levelled output. A green UI can presently deliver an out-of-contract file.
- **Realistic scenario:** High-crest speech activates limiting; the file is accepted by the synthetic harness but rejected by an institutional ingest or fails internal quality review.
- **Existing mitigation:** Source-only analysis, limiter, final decoded measurement, and synthetic acceptance. Their thresholds and corpus are insufficient.
- **Recommended change:** Solve gain against the complete DSP path, limit at final sample rate or establish encoded-output headroom, then enforce ±0.5 LU and ≤−2 dBTP on the decoded MP4. A failed postcondition must retry safely or fail visibly.
- **Illustrative patch or implementation outline:** Not applied. Add a bounded gain-calibration loop around the full chain; decode and verify the finalized MP4 before placing it in the `finished` map.
- **Tests to add or amend:** 44.1→48 kHz high-crest speech; real-material regression; AAC/resampler matrix; hard failures for loudness and peak misses.
- **Validation approach:** Independent decoded-output meter plus ffmpeg comparison on representative samples.
- **Estimated effort:** Large
- **Implementation risk:** High
- **Dependencies or sequencing:** Fix R-02 first; then tighten R-11.
- **Relevant standard or classification:** Project specification §§4.4, 5.2 and acceptance criterion 2. Existing backlog VH-50 already tracks the core real-output miss.

### R-02 True-peak detection and limiting miss end-of-file transients

- **Severity:** High
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** DSP boundary correctness
- **Location:** [src/audio/truepeak.ts](../../src/audio/truepeak.ts), [src/audio/limiter.ts](../../src/audio/limiter.ts)
- **Affected component or flow:** Final interpolation FIR state and limiter look-ahead drain
- **Evidence:** A one-sample full-scale signal was reported as −64.05 dBTP without tail finalization. Correct zero padding reports 0 dBTP. A final-frame impulse also emerged from the limiter at 0 dBTP.
- **Current behaviour:** The detector advances only when another input sample arrives. Limiter flush drains delayed samples using stale gain without advancing the detector through a zero-padded tail.
- **Why it matters:** A legal-looking output can contain a peak 2 dB above the hard ceiling.
- **Realistic scenario:** A cut, click, or consonant transient at the final sample is neither detected nor attenuated.
- **Existing mitigation:** Sustained-tone and faded-tone tests; they do not exercise the final interpolation positions.
- **Recommended change:** Add explicit detector finalization with FIR zero padding. During limiter flush, continue advancing detector and gain while preserving exact output length.
- **Illustrative patch or implementation outline:** Not applied. Introduce `finish()`/`flushTail()` semantics shared by measurement and limiting rather than duplicating padding rules.
- **Tests to add or amend:** One-frame full scale; final-frame impulse; every final FIR offset; chunk-size invariance; independent zero-padded output measurement.
- **Validation approach:** Protected DSP suite, Tech 3341 harness, property tests, and real decoded output.
- **Estimated effort:** Medium
- **Implementation risk:** High
- **Dependencies or sequencing:** First implementation item; protected files require the full acceptance harness.
- **Relevant standard or classification:** ITU-R BS.1770-4 true-peak measurement.

### R-03 Source audio timing and onset are not preserved

- **Severity:** High
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Silent data loss / A/V synchronisation
- **Location:** [src/media/audio-plan.ts](../../src/media/audio-plan.ts), [src/media/encoder-delay.ts](../../src/media/encoder-delay.ts), [src/media/pipeline.ts](../../src/media/pipeline.ts)
- **Affected component or flow:** Decoded audio → chain output timestamps → AAC priming compensation
- **Evidence:** Processed audio timestamps are reconstructed from emitted frame count rather than source timestamps, collapsing initial offsets and gaps. AAC compensation then deliberately discards approximately 44 ms from the start. Three real sources contained audible energy in that interval.
- **Current behaviour:** Video retains source-relative time while audio is re-clocked continuously and shifted earlier, deleting negative-time samples.
- **Why it matters:** Speech onsets, meaningful gaps, and A/V alignment can change without warning.
- **Realistic scenario:** A lecture starts immediately with a consonant; the first sound is clipped while later sync appears normal.
- **Existing mitigation:** AAC delay measurement improves later systematic sync. It assumes the removed interval is silence or branding, which current UI behaviour does not guarantee.
- **Recommended change:** Preserve source timestamp offsets and gaps. Compensate priming with supported container edit-list/priming metadata or a timeline/picture adjustment that retains all samples. Represent probe failure separately from zero delay.
- **Illustrative patch or implementation outline:** Not applied. Carry input timestamp and duration through each processed audio block; express padding/gaps explicitly instead of deriving time solely from `emittedFrames`.
- **Tests to add or amend:** Impulse at t=0; initial non-zero timestamp; internal gap; no-opening/opening cases; channel-count variants; beginning-waveform equality; A/V markers at start, middle, and end.
- **Validation approach:** Decode output and compare sample conservation and marker timing across supported browsers.
- **Estimated effort:** Large
- **Implementation risk:** High
- **Dependencies or sequencing:** Coordinate with R-01 and any branding-boundary work.

### R-04 Output success is not transactional from OPFS write through user save

- **Severity:** High
- **Confidence:** High for partial-write handling; Medium-high for browser-specific save failure
- **Classification:** Confirmed defect plus strongly supported lifetime risk
- **Category:** Data integrity / filesystem ownership
- **Location:** [src/media/opfs.ts](../../src/media/opfs.ts), [src/media/save.ts](../../src/media/save.ts), [src/main.ts](../../src/main.ts), [src/workers/job.worker.ts](../../src/workers/job.worker.ts)
- **Affected component or flow:** Mux write → postcondition check → OPFS-backed `File` → picker/download → cleanup
- **Evidence:** The sync writer ignores the returned byte count, although the [File System Standard requires callers to account for partial writes](https://fs.spec.whatwg.org/#api-filesystemsyncaccesshandle-write). Verification exceptions are swallowed. Fallback download returns immediately after `anchor.click()`, after which main discards the backing OPFS entry; the standard notes that such a `File` may become unreadable after entry removal. A new job can also delete a result while picker streaming is active.
- **Current behaviour:** Corrupt or partially consumed output can be reported as ready/saved. The picker can also select the original source destination; no same-entry check protects the “source never modified” invariant.
- **Why it matters:** This is the principal irreversible user-data boundary.
- **Realistic scenario:** Quota pressure produces a short write, or a multi-gigabyte fallback download loses its OPFS backing before consumption completes.
- **Existing mitigation:** Storage headroom, OS overwrite confirmation, 60-second object URL, and awaited picker `pipeTo`.
- **Recommended change:** Implement write-all semantics, require readable expected tracks, introduce an explicit result read lease/exclusive saving state, and compare source/destination handles with `isSameEntry()` where handles are available. [MDN documents the file-handle identity API](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemHandle/isSameEntry).
- **Illustrative patch or implementation outline:** Not applied.

  ```text
  while bytes remain:
      written = handle.write(remaining, at=currentOffset)
      if written <= 0: throw OutputWriteError
      advance by written

  verify video and expected audio
  acquire result lease
  consume save stream
  release lease
  only then permit workspace disposal
  ```

- **Tests to add or amend:** Short-write fake; corrupt MP4; missing expected audio; slow picker plus second process; early fallback discard; byte comparison; source/destination same-entry case.
- **Validation approach:** Unit fault injection and real multi-gigabyte browser tests in each supported engine.
- **Estimated effort:** Large
- **Implementation risk:** Medium
- **Dependencies or sequencing:** Release blocker independent of DSP work.

### R-05 Preflight results are not bound to the selected file and preset

- **Severity:** High
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Asynchronous state race
- **Location:** [src/main.ts](../../src/main.ts), [src/workers/job.worker.ts](../../src/workers/job.worker.ts)
- **Affected component or flow:** File selection/preset change → concurrent inspect/preflight → visible Create control → process request
- **Evidence:** Late inspect or preflight responses can call `showProcessControls(file)` and replace the mutable `jobFile`. Start re-reads the current preset instead of using the preflighted combination. Worker request handlers run concurrently.
- **Current behaviour:** A result for file A or preset X can enable a job using file B or preset Y.
- **Why it matters:** Storage, codec, and duration conclusions can be bypassed without user awareness.
- **Realistic scenario:** A slow file A finishes after file B; the UI names B but processing receives A. Alternatively, a preset is changed and Create is clicked before its new preflight completes.
- **Existing mitigation:** Request IDs correlate individual promises, but no selection generation binds their effects to current UI state.
- **Recommended change:** Add a monotonically increasing selection epoch, disable Create immediately on relevant change, ignore stale responses, and store one immutable accepted `JobSpec`.
- **Illustrative patch or implementation outline:** Not applied.

  ```text
  epoch = ++selectionEpoch
  candidate = {epoch, fileIdentity, presetId}
  result = await preflight(candidate)
  if epoch != selectionEpoch: ignore
  acceptedJob = freeze(candidate + result)
  Start sends acceptedJob unchanged
  ```

- **Tests to add or amend:** Deferred A/B replies; preset change mid-preflight; stale errors; assert processed file and preset exactly match the enabling summary.
- **Validation approach:** Deterministic coordinator tests plus browser rapid-selection rehearsal.
- **Estimated effort:** Medium
- **Implementation risk:** Medium
- **Dependencies or sequencing:** Pair with R-06 and R-07.

### R-06 Preflight does not prove that the exact executable job is supported

- **Severity:** High
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Capability validation / configuration drift
- **Location:** [src/media/capability.ts](../../src/media/capability.ts), [src/media/inspect.ts](../../src/media/inspect.ts), [src/media/preflight.ts](../../src/media/preflight.ts), [src/config/presets.ts](../../src/config/presets.ts), [src/media/encoding.ts](../../src/media/encoding.ts)
- **Affected component or flow:** Inspection/capability probe → verdict → Mediabunny runtime encoder
- **Evidence:** Secure-context and OPFS capability are measured but omitted from the blocking input. Per-track decode support is reported but not made a hard prerequisite. Probe failures can become “estimate unavailable.” Manual support probing uses fixed AVC/AAC configurations that differ from Mediabunny’s runtime configuration.
- **Current behaviour:** Start can be enabled for an undecodable source or an environment that cannot create OPFS. Conversely, a fixed probe can reject a runtime-supported candidate.
- **Why it matters:** A supposedly approved job can predictably fail after expensive processing begins.
- **Realistic scenario:** An unsupported HEVC MOV reaches `VideoSampleSink`, or an insecure deployment reaches workspace creation before failing.
- **Existing mitigation:** Boot status, source support rows, manual `isConfigSupported`, and a real-path calibration probe.
- **Recommended change:** Put secure context, OPFS, and primary-track decode support into the verdict; preserve typed probe failure causes; derive the exact `isConfigSupported()` input from the same encoder candidate used at runtime. WebCodecs support is explicitly configuration-specific in the [W3C specification](https://www.w3.org/TR/webcodecs/).
- **Illustrative patch or implementation outline:** Not applied. Create one `EncoderCandidate` object and pass it to support probing, calibration, runtime setup, diagnostics, and tests.
- **Tests to add or amend:** Every missing prerequisite; unsupported real codec; exact captured Mediabunny candidate; probe timing failure versus capability failure.
- **Validation approach:** Real browser matrix using runtime-captured configurations.
- **Estimated effort:** Medium
- **Implementation risk:** Medium
- **Dependencies or sequencing:** Resolve with R-05 before estimate refinement.
- **Relevant standard or classification:** The fixed `avc1.640033` Level 5.1 probe also cannot represent 3840×2160 at 60 fps: the [ITU H.264 Table A-1](https://www.itu.int/rec/dologin_pub.asp?id=T-REC-H.264-202408-I%21%21PDF-E&lang=e&type=items) limit is lower than the required macroblock rate, which requires Level 5.2.

### R-07 Cancellation is neither authoritative nor resource-safe

- **Severity:** High
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Cancellation / native resource lifetime
- **Location:** [src/workers/job.worker.ts](../../src/workers/job.worker.ts), [src/media/pipeline.ts](../../src/media/pipeline.ts), [src/media/audio-plan.ts](../../src/media/audio-plan.ts)
- **Affected component or flow:** Inspect, preflight, processing, finalization, verification, cleanup
- **Evidence:** The process controller is registered after awaiting previous-result cleanup, so an early cancel is lost. There are no post-finalize or post-verification abort checks. Inspect/preflight cancellation messages have no controller. Several loops check abort before entering the `try/finally` that closes a yielded sample. Chrome emitted unclosed `AudioSample` and `VideoSample` warnings.
- **Current behaviour:** Cancel can produce success, allow superseded work to continue, or defer native cleanup to garbage collection.
- **Why it matters:** Users are explicitly promised that cancellation stops work and leaves nothing behind.
- **Realistic scenario:** Cancel during verification returns “ready,” or repeated aborts accumulate decoder/GPU pressure.
- **Existing mitigation:** Abort signals, ordinary mid-pipeline cancellation, OPFS disposal, and a passing directory-count acceptance case.
- **Recommended change:** Register controllers before the first await; make all request kinds cancellable/latest-only; check after every non-cancellable commit boundary; pass the signal into verification; initiate output cancellation while lanes await; place ownership checks inside `try/finally`.
- **Illustrative patch or implementation outline:** Not applied.

  ```text
  for await sample:
      try:
          throwIfAborted(signal)
          await consume(sample)
      finally:
          sample.close()
  ```

- **Tests to add or amend:** Barriers after iterator yield, result cleanup, finalize, finish, and verification; exactly one cancelled response; no processed response; every sample closed once; wedged `add()` released by output cancellation.
- **Validation approach:** Deterministic unit barriers and browser cancellation in every phase/engine.
- **Estimated effort:** Medium
- **Implementation risk:** High
- **Dependencies or sequencing:** Clarify result ownership from R-04 first.

### R-08 OPFS claim checking and deletion have a Web Lock race

- **Severity:** High
- **Confidence:** Medium
- **Classification:** Strongly supported risk
- **Category:** Filesystem concurrency / silent data loss
- **Location:** [src/media/opfs.ts](../../src/media/opfs.ts)
- **Affected component or flow:** New workspace creation and cross-tab orphan sweeping
- **Evidence:** A directory becomes visible before its live claim is obtained. Sweep briefly acquires and releases a candidate lock while classifying, then removes the directory later outside that lock.
- **Current behaviour:** Classification and deletion are not one atomic critical section.
- **Why it matters:** A rare interleaving can delete a newly live job workspace—the exact outcome the Web Lock design is intended to prevent.
- **Realistic scenario:** Tab A creates a directory; Tab B classifies it as orphaned; A acquires the live claim; B then removes it.
- **Existing mitigation:** Per-session names, long-held live-job locks, fail-closed uncertainty, and per-entry sweep failures.
- **Recommended change:** Acquire the job lock before creating/opening the directory. In sweep, perform removal inside the successful `ifAvailable` lock callback.
- **Illustrative patch or implementation outline:** Not applied. Lock ownership must cover both observation and mutation; the [Web Locks API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API) provides the coordination primitive, not automatic filesystem exclusion.
- **Tests to add or amend:** Injected lock scheduler with barriers; two-worker/two-tab browser spike; open-wins and sweep-wins interleavings.
- **Validation approach:** Deterministic concurrency model plus real multi-tab repetition.
- **Estimated effort:** Medium
- **Implementation risk:** High
- **Dependencies or sequencing:** Land separately from other OPFS changes.

### R-09 Multi-track files can be inspected and processed inconsistently, with silent track loss

- **Severity:** High
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Silent data loss / source interpretation
- **Location:** [src/media/inspect.ts](../../src/media/inspect.ts), [src/media/pipeline.ts](../../src/media/pipeline.ts), [src/ui/source-panel.ts](../../src/ui/source-panel.ts)
- **Affected component or flow:** Track inspection → preflight → primary-track selection → output mux
- **Evidence:** Inspection uses array element zero, while processing uses Mediabunny’s `getPrimary*Track()` selection. Only one video and audio stream are emitted. Extra A/V track counts are not presented as a pre-processing loss warning.
- **Current behaviour:** Capability can be reported for one stream while another is processed, and additional language/commentary/angle tracks disappear silently.
- **Why it matters:** Silent track loss is a protected project invariant.
- **Realistic scenario:** A lecture contains a default low-bitrate stream and a higher-bitrate alternate; the UI describes one, processes another, and drops the remainder.
- **Existing mitigation:** Subtitles and chapters are disclosed. Extra A/V tracks are not.
- **Recommended change:** Inspect the exact primary tracks selected for processing; surface all track counts; block or require an explicit purpose-written acknowledgement before lossy processing.
- **Illustrative patch or implementation outline:** Not applied. Centralize `selectProcessingTracks(input)` and reuse its result in inspection, preflight, processing, diagnostics, and warnings.
- **Tests to add or amend:** Multi-video, multi-audio, language/default flags, commentary track, different codec capabilities, no-primary edge cases.
- **Validation approach:** Synthetic MP4/WebM/MKV fixtures and real-player inspection.
- **Estimated effort:** Medium
- **Implementation risk:** Medium
- **Dependencies or sequencing:** Immediate safe option is to block unsupported multiplicity; preservation policy is a later product decision.

### R-10 File-LRA and pause-freeze semantics diverge at boundaries

- **Severity:** Medium
- **Confidence:** High for LRA; Medium for pause behaviour
- **Classification:** Confirmed defect
- **Category:** Protected DSP correctness
- **Location:** [src/audio/loudness.ts](../../src/audio/loudness.ts), [src/audio/macrolevel.ts](../../src/audio/macrolevel.ts)
- **Affected component or flow:** LRA finalization and macro-level gain envelope
- **Evidence:** The file analyser does not append the 1.5 seconds of silence prescribed for final file LRA. Reproductions changed LRA by 2.69 and 6.02 LU. Separately, raw pause correction is frozen before centred smoothing and slew limiting, so post-pause speech can still change gain through the paused interval.
- **Current behaviour:** End-of-file level changes are underrepresented; “freeze during pauses” is not a strict final-envelope invariant.
- **Why it matters:** Both can change whether macro-level processing activates and whether pauses audibly pump.
- **Realistic scenario:** A late level change is hidden from the LRA gate, or a pause ramps toward future correction.
- **Existing mitigation:** Macro gating, clamp, slew limit, pause mask, and extensive common-path tests.
- **Recommended change:** Advance only LRA state with a 1.5-second zero tail; do not alter integrated loudness or duration. Reapply a pause hold to the final smoothed/slew-limited envelope.
- **Illustrative patch or implementation outline:** Not applied.
- **Tests to add or amend:** Official Tech 3342 material; EOF level changes; opposite pre/post corrections around a long pause; chunk invariance.
- **Validation approach:** Protected DSP suite and subjective real-speech listening.
- **Estimated effort:** Medium
- **Implementation risk:** High
- **Dependencies or sequencing:** After R-01/R-02; re-run all protected harnesses.
- **Relevant standard or classification:** [EBU Tech 3342](https://tech.ebu.ch/docs/tech/tech3342.pdf) file-measurement procedure.

### R-11 The acceptance harness has false-pass paths

- **Severity:** Medium
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Test effectiveness / unsupported assurance
- **Location:** [src/acceptance/run.ts](../../src/acceptance/run.ts), [test/ebu3341/tech3341.test.ts](../../test/ebu3341/tech3341.test.ts), [test/ebu3341/signals.ts](../../test/ebu3341/signals.ts)
- **Affected component or flow:** Browser release acceptance
- **Evidence:** Criterion 2 crops the first and last content seconds, uses the crop for true peak, and skips missing audio while defaults allow the criterion to pass. Criterion 3 is hardcoded to pass. Authentic EBU programme cases are skipped; some peak cases use an acknowledged local interpretation. The egress observer does not comprehensively observe worker/XHR request bodies, and cancellation passed despite native-resource warnings.
- **Current behaviour:** The exact defects in R-01/R-02/R-07 evade an all-green automated result.
- **Why it matters:** The harness is treated as release evidence.
- **Realistic scenario:** An output loses audio or has a final over-peak transient but criterion 2 still passes.
- **Existing mitigation:** Real WebCodecs, OPFS, worker, VFR, playback and network activity are exercised.
- **Recommended change:** Require one finite decoded measurement per expected audio output; use full output for true peak; fail resource warnings; make compliance status reflect actually executed fixtures; observe all browser request contexts.
- **Illustrative patch or implementation outline:** Not applied.
- **Tests to add or amend:** Missing audio, t=0/EOF transients, real high-crest material, result-count assertions, worker/XHR egress, official EBU cases/checksums.
- **Validation approach:** Run repaired harness in all supported engines.
- **Estimated effort:** Medium
- **Implementation risk:** Medium
- **Dependencies or sequencing:** Tighten immediately after product corrections, not before.
- **Relevant standard or classification:** [EBU Tech 3341](https://tech.ebu.ch/docs/tech/tech3341.pdf) describes its cases as minimum evidence rather than universal proof.

### R-12 Long-running jobs lack required survival controls

- **Severity:** Medium
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Reliability / recovery
- **Location:** [docs/01-specification.md](../../docs/01-specification.md), [src/main.ts](../../src/main.ts)
- **Affected component or flow:** Processing lifecycle and unsaved result
- **Evidence:** The specification requires screen wake lock and unload protection. No implementation was found.
- **Current behaviour:** Sleep, reload, or navigation can destroy a long job without a contextual warning.
- **Why it matters:** Processing may consume tens of minutes on slower devices.
- **Realistic scenario:** A laptop sleeps during a one-hour encode; scratch is later swept, but the user loses all elapsed work.
- **Existing mitigation:** Progress, cancellation, OPFS cleanup, and bounded recovery.
- **Recommended change:** Acquire/release and visibility-reacquire a wake lock; attach `beforeunload` only while processing or holding an unsaved output. Wake lock availability is platform-dependent; [MDN documents the visibility lifecycle](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API). `beforeunload` is also unreliable on some mobile paths and should remain conditional, as [MDN cautions](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event).
- **Illustrative patch or implementation outline:** Not applied.
- **Tests to add or amend:** Stubbed wake-lock lifecycle, rejection, visibility change, unload handler registration, manual sleep/reload.
- **Validation approach:** Real laptops and mobile browsers.
- **Estimated effort:** Medium
- **Implementation risk:** Low
- **Dependencies or sequencing:** Near term; independent.

### R-13 The release boundary lacks least privilege and a strict public-media allowlist

- **Severity:** Medium
- **Confidence:** High
- **Classification:** Strongly supported risk
- **Category:** Supply chain / privacy
- **Location:** [.github/workflows/deploy-pages.yml](../../.github/workflows/deploy-pages.yml), [scripts/check-placeholders.mjs](../../scripts/check-placeholders.mjs)
- **Affected component or flow:** CI build/deploy and Vite public-directory publication
- **Evidence:** Pages/OIDC permissions are granted at workflow scope, so build and dependency-install steps inherit them. Actions use mutable major tags rather than full commit SHAs. The media guard rejects recordings only under `public/spike`; a misplaced real recording elsewhere under `public/` would be copied into the deployment.
- **Current behaviour:** No current media leak or CI exploit was found, but the preventions are weaker than the repository’s privacy promise.
- **Why it matters:** Public deployment and privileged CI are high-consequence boundaries.
- **Realistic scenario:** A sample is accidentally committed under a different public subdirectory, or a compromised mutable action tag executes with deploy permissions.
- **Existing mitigation:** Current public inventory contains only expected branding media; lockfile integrities are present; secrets scan passed.
- **Recommended change:** Add an exact public-media allowlist; scope build permissions to `contents: read`; grant Pages/OIDC only to deploy; pin actions by full SHA with an update mechanism. GitHub recommends least-privilege permissions and full-length SHA pinning in its [Actions security guidance](https://docs.github.com/en/code-security/tutorials/secure-your-organization/protect-against-threats).
- **Illustrative patch or implementation outline:** Not applied.
- **Tests to add or amend:** Build failure on an unexpected public media file; workflow policy test for permission scope and immutable action refs.
- **Validation approach:** Static CI policy check and deployment inventory diff.
- **Estimated effort:** Medium
- **Implementation risk:** Low
- **Dependencies or sequencing:** Near term; does not require product-code changes.

### R-14 Progress semantics and “discourage” acknowledgement are incomplete

- **Severity:** Medium
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Accessibility / error prevention
- **Location:** [index.html](../../index.html), [src/main.ts](../../src/main.ts)
- **Affected component or flow:** Processing progress and preflight warning state
- **Evidence:** The progress element has no accessible name. A non-blocking “discourage” verdict exposes Create directly even though the specification calls for acknowledgement.
- **Current behaviour:** Assistive technology may announce an unnamed progressbar; a consequential warning can be bypassed by a routine click.
- **Why it matters:** Both obscure current system state and weaken informed consent.
- **Realistic scenario:** A screen-reader user hears only a percentage with no task context, or starts a highly unsuitable job without acknowledging its warning.
- **Existing mitigation:** Semantic regions, fieldsets, visible labels, live status region, skip link, focus rings, contrast tests, 44 px targets, reduced motion, and sound mobile reflow.
- **Recommended change:** Add a stable accessible progress label and stage-specific description; introduce an explicit acknowledge action for discourage outcomes.
- **Illustrative patch or implementation outline:** Not applied.
- **Tests to add or amend:** Accessible-tree assertions, keyboard-only warning flow, live-region/stage announcements, screen-reader rehearsal.
- **Validation approach:** Axe or equivalent plus NVDA, VoiceOver, and TalkBack manual checks.
- **Estimated effort:** Small
- **Implementation risk:** Low
- **Dependencies or sequencing:** Can land independently.
- **Relevant standard or classification:** Probable WCAG 2.2 SC 4.1.2 issue for the unnamed progress control.

### R-15 Operational and documentation contracts have drifted

- **Severity:** Medium
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Documentation / operational correctness
- **Location:** [DEV-INFRASTRUCTURE.md](../../DEV-INFRASTRUCTURE.md), [.github/workflows/deploy-pages.yml](../../.github/workflows/deploy-pages.yml), [src/core/diagnostics.ts](../../src/core/diagnostics.ts), [src/main.ts](../../src/main.ts), [package.json](../../package.json)
- **Affected component or flow:** Quality gate, deployment, offline promise, diagnostics, version identity
- **Evidence:** Infrastructure documentation describes deployment as undecided/local while a Pages workflow deploys `main`. The offline-after-first-load promise has no service-worker/cache implementation. Production UI exposes the product version but not the full build identity described by infrastructure rules. Diagnostics omit several promised job/capability details. The quality gate is documented as non-mutating but includes `vite build`, which writes ignored `dist/`.
- **Current behaviour:** Maintainers and users can rely on contracts the implementation does not satisfy.
- **Why it matters:** Operational trust depends on accurate recovery, deployment, privacy, and version information.
- **Realistic scenario:** A maintainer expects a report-only gate but it rewrites generated output, or a user expects offline reuse after the browser evicts assets.
- **Existing mitigation:** Build identity exists in diagnostics, docs are structurally checked, and offline/deployment work is partly tracked in the backlog.
- **Recommended change:** Reconcile implementation and documentation deliberately. Protected specification changes must go through the doc-delta/sign-off process; implementation gaps should not be papered over by silently narrowing promises.
- **Illustrative patch or implementation outline:** Not applied.
- **Tests to add or amend:** Check-command write-set test; offline reload; production version/build display; diagnostics schema/redaction; deployment-doc consistency.
- **Validation approach:** Clean temporary checkout before/after snapshots plus deployed-site rehearsal.
- **Estimated effort:** Medium
- **Implementation risk:** Low
- **Dependencies or sequencing:** Coordinate with VH-14 and protected-document ownership.

### R-16 Loudness-analysis retention grows linearly with duration

- **Severity:** Low
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Performance / documentation accuracy
- **Location:** [src/audio/loudness.ts](../../src/audio/loudness.ts), [src/media/audio-plan.ts](../../src/media/audio-plan.ts)
- **Affected component or flow:** Pass-A analysis retained through encoding
- **Evidence:** Block energy, block loudness, momentary, and short-term arrays accumulate with duration. Curves are retained at approximately 100 Hz despite 100 ms interface commentary.
- **Current behaviour:** A one-hour stereo input retains roughly 828,000 JavaScript numbers—at least about 6.6 MB before array overhead.
- **Why it matters:** It is not whole-file buffering, but it contradicts the “few hundred kilobytes” comment and bounded-state aspiration.
- **Realistic scenario:** Long files on low-memory devices add unnecessary pressure alongside decoder and encoder resources.
- **Existing mitigation:** PCM/video frames remain streaming and bounded; current documented one-hour scope keeps this moderate.
- **Recommended change:** Add a runtime-retention mode with only required 10 Hz/LRA/maxima data, and release curves once warnings/envelopes are derived.
- **Illustrative patch or implementation outline:** Not applied.
- **Tests to add or amend:** Retained-element count by duration and equivalence of final metrics.
- **Validation approach:** Heap profiling on 5-, 20-, and 60-minute files.
- **Estimated effort:** Medium
- **Implementation risk:** Medium
- **Dependencies or sequencing:** Optional until correctness work is complete.

## 7. Root-cause themes

| Theme | Connected findings | Structural response |
|---|---|---|
| Internal plans are treated as proof of final output | R-01, R-04, R-06, R-11 | Define executable postconditions on the finalized MP4 and make success contingent on them |
| Boundary conditions are under-tested | R-02, R-03, R-07, R-10, R-11 | Add start/EOF/cancel/finalize/save boundary fixtures before expanding happy-path coverage |
| Mutable asynchronous state lacks ownership | R-04, R-05, R-07 | Model accepted job, active operation, finished result, and save lease as explicit immutable states |
| Filesystem coordination is split across observations and mutations | R-04, R-08 | Hold ownership through the entire critical operation: write, validate, read, save, delete |
| Source interpretation is not single-sourced | R-03, R-06, R-09 | Reuse exact selected tracks, encoder configuration, and timebase across inspection, validation, processing, and diagnostics |
| Synthetic acceptance is too forgiving | R-01, R-02, R-07, R-11 | Add representative real/high-crest material and make missing evidence fail closed |
| Documentation runs ahead of implementation | R-12, R-14, R-15 | Add contract tests and reconcile protected claims through the established sign-off process |
| Resource limits are treated mainly as capacity estimates | R-07, R-12, R-16 | Test lifecycle survival and retained resources, not only estimated runtime/storage |

The highest leverage structural improvement is a small job/result state model that owns an immutable accepted job and a leased output. It would address significant parts of R-04, R-05, and R-07 without requiring a broad rewrite.

## 8. Positive findings

- The one-way conveyor model is consistently reflected in the main architecture; technical options are not exposed as “advanced” settings.
- Source files are passed as local `Blob` objects and never opened for writing.
- Production source inspection found no analytics, beacon, upload, WebSocket, or outbound request carrying source media or characteristics.
- All reviewed Mediabunny outputs specify `fastStart: false`; no implicit or explicit in-memory output mode was found.
- Audio and video lanes run concurrently, respect backpressure, and settle sibling work after failure.
- Source loudness is measured before branding joins the timeline.
- The DSP implementation is pure TypeScript over `Float32Array`, allowing Node-based standards tests.
- K-weighting and ordinary 44.1/48 kHz integrated gating are well structured and extensively tested.
- The typed worker protocol distinguishes request-correlated terminal responses from droppable progress.
- OPFS workspaces have per-session prefixes, centralized handle cleanup, idempotent disposal, and fail-independent orphan deletion.
- Subtitle and chapter limitations are disclosed before processing; supplied VTT cue content is preserved while timing is shifted.
- Structured logging is bounded, copied diagnostics are redacted, and global error hooks exist.
- User-controlled text is rendered through safe text APIs; no material DOM injection path was found.
- UI code includes landmarks, fieldsets, labels, a skip link, status announcements, strong focus treatment, AAA-oriented contrast tests, reduced-motion handling, and 44 px targets.
- TypeScript is strict, lint runs with zero warnings, the lockfile has integrity hashes, and there is only one declared runtime dependency.
- The acceptance harness uses real WebCodecs and OPFS rather than mocked encoders.
- The repository has a documented one-command runtime and quality model, even though the non-mutating quality-gate detail needs correction.

## 9. Test-gap analysis

| Behaviour | Risk and current coverage | Proposed level/scenarios | Fixture/infrastructure | CI? | Priority |
|---|---|---|---|---:|---:|
| Final decoded audio contract | Synthetic corpus missed a real failure | Browser integration: high-crest 44.1/48 kHz, AAC matrix, hard postconditions | Small licence-safe speech fixtures | Engine CI where WebCodecs exists | Immediate |
| EOF true peak | Sustained/faded tones only | Unit/property: every final FIR position and chunk split | Generated impulses | Yes | Immediate |
| Source onset and timestamp gaps | Markers begin at one second | Integration: t=0 impulse, non-zero offset, internal gap, sample conservation | Generated A/V fixture | Yes/browser | Immediate |
| Partial writes/output verification | Normal OPFS only | Unit fault injection: short writes, malformed MP4, missing expected track | Fake sync handle/corrupt fixture | Yes | Immediate |
| Save lifetime/source overwrite | Filename-only unit tests | Browser: slow picker, early discard, large download, same-entry destination | Multi-GB sparse/generated file | Manual/engine CI | Immediate |
| File/preset ordering | Pure verdict only | Coordinator tests with controllable deferred replies | Fake worker transport | Yes | Immediate |
| Cancellation phase coverage | One fixed mid-encode cancel | Barriers at yield, cleanup, finalize, verification and save | Injected hooks plus browser | Mostly | Immediate |
| OPFS lock atomicity | Sequential sweep tests | Deterministic lock scheduler and two-tab stress | Injectable Web Lock layer | Unit + browser | Near |
| Multi-track behaviour | No representative multi-A/V fixture | Contract/E2E for defaults, language, alternate angle, unsupported codec | MP4/WebM/MKV generators | Yes/browser | Immediate |
| LRA tail and pause freeze | Common speech patterns only | Protected unit tests and official Tech 3342 cases | Checksum-pinned official/generated files | Yes if licensing permits | Near |
| Acceptance self-verification | Missing audio/resource warnings can pass | Meta-tests proving each criterion fails on an injected defect | Controlled broken outputs | Yes/browser | Near |
| Cross-engine support | Current run only in Chromium | Safari/Firefox/Chrome acceptance matrix | Real devices or hosted runners | Partly | Near |
| Accessibility | Contrast and layout strong; no AT | Automated tree plus keyboard, VoiceOver, NVDA, TalkBack | Browser/AT matrix | Automation plus manual | Near |
| Sleep/reload/recovery | Not implemented | Wake/visibility/unload unit tests and real sleep rehearsal | Laptop/mobile | Partly | Near |
| Long-file performance | No current device matrix | Heap/CPU/OPFS profiling for 5, 20, 60 minutes | Representative 1080p/4K/VFR/HDR | Usually manual | Medium |
| Public-media privacy guard | Only `public/spike` protected | Static negative test with unexpected public media | Tiny dummy media file | Yes | Near |
| Official compliance evidence | Authentic EBU programme cases skipped | Checksum/provenance workflow and official cases | EBU/ITU material | Subject to distribution rights | Medium |

## 10. Dependency and supply-chain assessment

- [package.json](../../package.json) declares one runtime dependency: Mediabunny 1.55.2.
- `package-lock.json` is lockfile version 3. Registry tarballs have integrity values; no Git dependencies or unpinned direct runtime dependency were found.
- The isolated install resolved 243 package entries without running lifecycle scripts. The only detected install script belonged to optional `fsevents`.
- Both full and production-only npm audits reported zero known vulnerabilities.
- No deprecated package metadata or missing dependency licence metadata was observed.
- Observed dependency licences were permissive or weak-copyleft licences normally compatible with web-tool distribution, including MIT, ISC, BSD, Apache-2.0, MPL-2.0, BlueOak and Python-2.0. This is a technical inventory, not legal advice.
- Package metadata says MIT, but no root `LICENSE` file was found. Add the intended licence text or correct the metadata.
- Branding assets should have a distinct provenance/usage notice because institutional artwork rights are separate from source-code licensing.
- TypeScript 7.0.2 was newer than the pinned/wanted 6.0.3. The current version passes; upgrade only after Vite/ESLint/type-definition compatibility is confirmed. Existing VH-28 work already represents the ecosystem-upgrade dependency.
- No Dependabot/Renovate-style update configuration was found.
- CI actions should be full-SHA pinned and updated automatically; job permissions should be reduced as described in R-13.
- Public source maps are produced. Given the public repository this is not a source-secrecy issue, but deployment should confirm that this is intentional.
- No package replacement or new runtime dependency is justified by this review.

## 11. Security and privacy assessment

The application’s attack surface is relatively narrow because it is static and has no accounts or server-side state.

- **Authentication, authorisation, tenants:** Not applicable. There is no privileged in-app user role.
- **Primary untrusted input:** User-selected media and optional sidecar content. Parsing occurs in browser/Mediabunny/WebCodecs.
- **Source handling:** Local, read-only `Blob`; no source upload.
- **Network:** Production source contains only scoped inbound branding fetches. Static inspection and the observed browser run found no source-media, filename, or media-characteristic egress.
- **Storage:** Source remains in browser memory/file handles; output uses job-scoped OPFS until saved or discarded.
- **Retention:** Normal success/error/cancel cleanup exists, but R-04/R-07/R-08 show lifetime and concurrency gaps. Crashed tabs can leave scratch until sweep.
- **Logging:** Structured, bounded, and redacted by default. No live secrets were found.
- **Third parties:** Static host/CDN, browser codecs, npm/GitHub Actions, and Mediabunny. There is no analytics processor in source.
- **Output handling:** The most serious misuse path is choosing the original source as the save destination. An OS prompt is mitigation but does not enforce the invariant.
- **CI exposure:** Workflow-wide Pages/OIDC permissions and mutable action tags increase supply-chain consequence.
- **Accidental publication:** Vite publishes `public/`; the current guard is not a complete institutional-media allowlist.
- **XSS:** No material path was identified; user-facing dynamic strings use safe DOM text operations.
- **Secrets:** Placeholder scan passed and no live credential was identified. External hosting/repository secrets were not accessible.
- **Security headers:** No conclusion can be reached without inspecting the deployed response. CSP, COOP/COEP, Referrer-Policy and Permissions-Policy should be verified on the real origin rather than inferred from source.
- **Compliance:** The implementation supports data minimisation and local processing, but this review does not assert GDPR, institutional-policy, or security-standard compliance.

Required manual security work is limited but should include malformed-media fuzzing, deployed-header inspection, CI/repository permission review, object-URL/save abuse paths, and confirmation that public assets contain no personal recordings.

## 12. Accessibility and user-facing assessment

Observed strengths:

- Meaningful page landmarks, fieldsets and labels
- Skip link
- Visible focus styles
- Status/live-region support
- Carbon-derived token system
- Automated contrast tests
- Minimum 44×44 px targets
- Reduced-motion handling
- No 390 px horizontal overflow
- Clear conveyor-style hierarchy rather than an editor interface

Material issues:

- The progressbar lacks a programmatic accessible name.
- “Discourage” preflight outcomes do not require acknowledgement.
- Current branding choices are not yet enabled, so the final three-choice workflow cannot be evaluated end-to-end.
- Browser acceptance still leaves playback, subjective audio quality, slide legibility, and wording as manual.
- The application has no implemented offline recovery despite documentation implying offline-after-first-load behaviour.
- Long jobs lack sleep/reload protection.
- Screen-reader announcements for changing stages and percentages have not been tested and could be either insufficient or overly chatty.
- No VoiceOver, NVDA, TalkBack, voice-control, high-zoom, forced-colours, or keyboard-only end-to-end rehearsal was performed.

The demonstrated issue is a probable WCAG 2.2 SC 4.1.2 failure. Broader WCAG conformance cannot be concluded from code and automated tests alone.

## 13. Architecture and maintainability assessment

The architecture is appropriate for the product and does not need a rewrite.

Strengths:

- Main thread, worker boundary, pipeline, DSP, configuration and UI are separated coherently.
- Four immutable conceptual data objects avoid a global mutable job blob.
- Direct composition inside the worker is simpler than an unnecessary event bus.
- Load-bearing values reside primarily in `src/config/`.
- Runtime dependency count is intentionally small.
- DSP is pure and testable outside a browser.
- Media paths stream and apply backpressure.
- Diagnostics are centralized rather than scattered `console.log` calls.

Hot spots:

- `src/main.ts` owns asynchronous request coordination and mutable UI/job references without a generation model.
- `job.worker.ts` combines request routing, result ownership, cancellation, processing and post-output verification.
- OPFS ownership is implicit across worker/main/save layers.
- Inspection, preflight, calibration and runtime encoding do not share one exact track/configuration object.
- The acceptance page reports some externally run or manual criteria as though they were locally proved.
- Protected DSP boundary semantics are distributed among detector, limiter, analyser and acceptance cropping.

Recommended structural improvements:

1. Introduce a small immutable `AcceptedJob` containing file identity, selected tracks, preset, exact encoder candidates, capability verdict and epoch.
2. Model output state as `processing → verifying → ready(leaseable) → saving → discarded`.
3. Centralize processing-track selection and encoder-candidate creation.
4. Define explicit `finish()` semantics for stateful DSP units.
5. Keep these targeted; do not introduce a generalized framework or global state machine library.

## 14. Performance and scalability assessment

Demonstrated evidence:

- The full synthetic browser acceptance run took 85.8 seconds on the review host.
- The output worker bundle is 435.77 kB uncompressed.
- One-hour analysis retains at least roughly 6.6 MB of numeric array payload before JavaScript-array overhead.
- Cancellation produced native sample-lifetime warnings.
- The pipeline does not buffer complete video/audio content and all output muxers avoid in-memory fast-start.

Likely bottlenecks:

- Browser video decode/encode is the dominant CPU/GPU cost.
- Three audio traversals add proportional I/O and decode cost.
- Post-output audio verification adds another potentially long traversal without granular heartbeat.
- Multiple unsuperseded preflights can contend within one worker.
- Large OPFS writes are sensitive to quota and partial-write behaviour.
- Long files add analysis arrays linearly.

Not demonstrated:

- Performance on Windows, managed University devices, integrated GPUs, Safari or Firefox
- 4K60/HDR throughput
- One-hour reliability
- Memory peaks during branding transition composition
- OPFS quota behaviour near exhaustion
- Thermal throttling or battery impact

Safe optimisation priorities are correctness first, cancellation/resource closure second, then retention reduction. Avoid speculative parallelism: video and audio lanes already run concurrently, and more encoder concurrency could worsen device pressure.

Recommended profiling:

- 5-, 20-, and 60-minute 1080p and 4K inputs
- CFR/VFR, 30/60 fps, mono/stereo/5.1, 44.1/48 kHz
- Heap snapshots after each audio pass
- Native sample counts during repeated cancellation
- OPFS throughput/quota curves
- Stage timings and long-phase heartbeat gaps

## 15. Documentation assessment

| Document/section | Problem | Proposed change |
|---|---|---|
| [DEV-INFRASTRUCTURE.md — Quality gate](../../DEV-INFRASTRUCTURE.md) | Says the gate is non-mutating, while `npm run check` invokes Vite build and writes `dist/` | Either build into a temporary directory during `check`, or document/approve the generated-output write |
| [DEV-INFRASTRUCTURE.md — Deployment](../../DEV-INFRASTRUCTURE.md) | Describes deployment as undecided/local while GitHub Pages deploys `main` | Document the actual pilot deployment, permissions, rollback and verification |
| [docs/01-specification.md](../../docs/01-specification.md) / brief | Offline-after-first-load behaviour is not implemented | Implement VH-14 or capture a protected-doc reconciliation proposal |
| DEV infrastructure version section | Promises product version and build identity in production | Expose both consistently in UI/diagnostics or narrow the documented UI promise |
| DEV infrastructure diagnostics section | Describes capability, source and job details absent from copied diagnostics | Add a redacted schema-aligned summary and tests |
| Audio source comments | “Few hundred kilobytes” understates retained one-hour state | Correct after deciding the runtime retention mode |
| Acceptance criterion 3 | UI labels EBU compliance as passed without executing all official cases | Report partial/external/manual status until authentic material runs |
| Root legal documentation | Package metadata says MIT but no `LICENSE` exists | Add the intended licence and separate branding-asset provenance notice |
| Operational guidance | No browser-specific save, wake lock, storage quota or large-job troubleshooting | Add after the related implementation is stable |

Protected specification and rationale files should not be edited as ordinary implementation documentation. Any factual correction belongs in the established doc-delta/sign-off batch.

## 16. Suggested change set

No change below was applied.

| Change group | Objective and findings | Proposed files/work | Tests and acceptance | Effort/risk |
|---|---|---|---|---|
| A. Finish DSP correctly | R-01, R-02, R-10 | Add explicit true-peak/limiter finalization; perform complete-chain gain calibration; enforce decoded-output criteria; add LRA tail and strict pause hold | EOF FIR matrix, official DSP material, real high-crest encoded output within both limits | Large / High |
| B. Preserve source content | R-03, R-09 | Carry source audio timestamps/gaps; replace destructive AAC shift; centralize primary-track selection; block or warn on extra A/V tracks | t=0 sample conservation, gaps, multi-track fixtures, cross-browser sync | Large / High |
| C. Transactional output ownership | R-04, R-08 | Implement write-all; hard output postconditions; `ResultLease`; exclusive save state; same-entry protection; atomic lock/delete sections | Short-write, corrupt output, slow save, multi-tab race, byte equality | Large / High |
| D. Immutable request lifecycle | R-05, R-06, R-07 | Add selection epoch and `AcceptedJob`; derive exact encoder candidates once; controllers for every request; commit-boundary abort checks; close samples in ownership `finally` | Out-of-order replies, unsupported prerequisites, cancellation barriers, no late UI updates | Large / High |
| E. Make acceptance capable of refuting the product | R-11 | Measure full-output peaks; require expected audio; fail resource warnings; represent partial/manual criteria honestly; add real-material corpus | Each injected defect must make the relevant criterion fail | Medium / Medium |
| F. Complete user/operational protections | R-12, R-14, R-15 | Wake lock, conditional unload warning, progress naming, discourage acknowledgement, diagnostics/version alignment, non-mutating check implementation | Accessibility tree, sleep/reload, clean-tree snapshots, production bundle identity | Medium / Low–medium |
| G. Harden release inputs | R-13 | Narrow CI permissions, pin actions, add public-media allowlist, add licence/provenance files | Workflow policy and negative publication tests | Medium / Low |
| H. Reduce retained analysis state | R-16 | Runtime retention mode and early curve release | Metric equivalence and heap/element-count limits | Medium / Medium |

Rollout should use small, separately reviewable commits. Protected DSP and OPFS concurrency changes should not be combined. Each group should retain a straightforward Git rollback and should not require stored-data migration because OPFS is scratch state.

## 17. Prioritised remediation roadmap

### Immediate

| Item | Benefit / risk if deferred | Prerequisites | Effort / risk | Owner | Verification |
|---|---|---|---|---|---|
| R-02 EOF true-peak repair | Removes a demonstrated hard-ceiling violation | None | M / High | DSP engineer | Final-position impulse matrix and protected suite |
| R-01 full-chain audio acceptance | Makes the core output promise honest | R-02 | L / High | DSP + media engineer | Decoded real corpus within ±0.5 LU and ≤−2 dBTP |
| R-04 output transaction | Prevents corrupt, truncated, prematurely deleted, or source-overwriting outputs | None | L / Medium | Browser storage engineer | Fault injection and large-save byte comparison |
| R-03 onset/timeline preservation | Stops silent deletion and sync distortion | Encoder/container timing decision | L / High | Media engineer | t=0 conservation and full-duration sync |
| R-05/R-06 immutable exact preflight | Prevents the wrong or unsupported job from starting | Shared candidate design | M / Medium | UI/worker engineer | Deferred-response and exact-config browser tests |
| R-07 authoritative cancellation | Makes cancel trustworthy and closes native resources | Result ownership clarified | M / High | Worker/media engineer | Every phase returns only cancelled and leaks nothing |
| R-09 multi-track protection | Prevents silent loss | Product decision: block versus preserve | M / Medium | Product + media | Multi-track warning/block acceptance |

These are release blockers for general production. A narrowly controlled single-track pilot would still need R-01 through R-07 addressed or explicitly disabled behind a non-production gate.

### Near term

| Item | Benefit / risk if deferred | Prerequisites | Effort / risk | Owner | Verification |
|---|---|---|---|---|---|
| R-08 atomic OPFS locks | Removes rare live-workspace deletion | Deterministic lock abstraction | M / High | Storage/concurrency | Two-tab stress and barrier tests |
| R-10 LRA/pause semantics | Corrects protected analysis and macro behaviour | DSP baseline stable | M / High | DSP engineer | Tech 3342 plus pause fixture |
| R-11 acceptance hardening | Prevents future green false positives | Product fixes landed | M / Medium | Test engineer | Mutation/injected-defect checks |
| R-12 long-job controls | Protects elapsed processing work | Stable lifecycle state | M / Low | UI/platform engineer | Sleep, visibility and unload rehearsal |
| R-13 release hardening | Reduces CI and publication consequence | None | M / Low | DevOps/security | Workflow policy and deploy inventory |
| R-14 accessible progress/acknowledgement | Improves state clarity and error prevention | None | S / Low | UI/accessibility | AT and keyboard run |

### Medium term

| Item | Benefit / risk if deferred | Prerequisites | Effort / risk | Owner | Verification |
|---|---|---|---|---|---|
| R-15 contract reconciliation | Restores operational/documentation trust | Relevant implementation decisions | M / Low | Maintainer + technical writer | Clean-check, offline, version and diagnostics rehearsal |
| Cross-engine matrix | Establishes actual browser support | Stable output pipeline | M / Medium | QA | Chrome/Firefox/Safari acceptance |
| Official EBU/ITU corpus | Strengthens compliance evidence | Licensing/cache workflow | M / Medium | DSP/QA | Checksummed official cases |
| Long-file/device capacity matrix | Establishes honest estimates and limits | Stable lifecycle | L / Low | Performance QA | 5/20/60-minute device report |
| Channel-layout/sample-rate spike | Avoids false multichannel claims | Representative fixtures | M / Medium | DSP/media | Isolated-channel 5.1 and 22.05 kHz cases |

### Optional

| Item | Benefit / risk if deferred | Prerequisites | Effort / risk | Owner | Verification |
|---|---|---|---|---|---|
| R-16 analysis retention reduction | Lowers long-file heap pressure | Correct metrics stabilized | M / Medium | DSP/performance | Heap and equivalence tests |
| Dormant closing-transition repairs | Prevents opaque-gradient sampling and decode-fallback defects when re-enabled | Approved branding/UI milestone | S–M / Medium | Media/UI | Gradient scaling and corrupt-onset fallback |
| Automated dependency updates | Keeps pinned actions/tooling current | Review policy | S / Low | DevOps | Update PR checks |
| Additional malformed-media fuzzing | Improves parser resilience | Stable supported-format policy | M / Medium | Security/QA | Hermetic fuzz corpus |

## 18. Unresolved uncertainties

| Unknown | Evidence inspected and safest assumption | Why it matters / verification | Dependent findings |
|---|---|---|---|
| Safari/Firefox WebCodecs, OPFS and save behaviour | Source and Chromium were inspected; do not assume parity | Run full acceptance and save/cancel cases on supported versions | R-03, R-04, R-06, R-07 |
| Exact fallback-download failure mode after OPFS deletion | Standards and lifetime sequence strongly support risk; manifestation is browser-dependent | Large-file early-discard byte comparison | R-04 |
| Frequency of the Web Lock interleaving | Race exists in source, but was not reproduced live | Deterministic barriers and long two-tab stress | R-08 |
| Actual Mediabunny encoder candidate across engines | Relevant library source sampled; candidates can vary by engine/input | Capture and compare runtime candidate to probed config | R-06 |
| Intended treatment of multiple A/V tracks | Specification demands visible warning for loss but does not define full preservation | Product decision followed by multi-track fixtures | R-09 |
| Complete EBU accuracy | Current synthetic/common cases pass; authentic programme cases were not run | Checksum-pinned official test set and BS.2217 coverage | R-01, R-10, R-11 |
| Multichannel layout semantics | Channel count is available, semantic labels are not clearly carried | Isolated-channel 5.1/7.1 AAC fixtures | Audio support claim |
| 22.05 kHz block timing | Current common 44.1/48 kHz paths are exact; rounded-hop behaviour may differ | Generate reference signals at uncommon rates | Audio support claim |
| Production hosting headers/permissions | Workflow is visible; deployed response and GitHub settings are not | Inspect real Pages headers, environments, permissions and branch protection | R-13, security assessment |
| Branding licences and approved masters | Binary inventory exists; legal provenance was not available | Institutional confirmation and committed notice | Supply-chain assessment |
| Final branding workflow | Current choices are disabled/dormant | Stakeholder approval plus end-to-end branded acceptance | Production readiness |

## 19. Manual verification checklist

- [ ] Run the repaired output pipeline on a representative University corpus: quiet/hot speech, music, slides, VFR, 44.1/48 kHz, mono/stereo, immediate speech onset, long silence, and EOF transient.
- [ ] Confirm loudness and true peak independently with a trusted meter.
- [ ] Listen for pumping, consonant loss, clicks, clipping, transition artefacts, and branding-level mismatch.
- [ ] Inspect output in Chrome, Firefox, Safari, VLC, QuickTime and EchoVideo.
- [ ] Run 5-, 20-, and 60-minute jobs on representative managed Windows/macOS hardware.
- [ ] Cancel during every stage, including cleanup, finalization, verification and saving.
- [ ] Repeatedly exercise two-tab OPFS creation/sweep interleavings.
- [ ] Save a multi-gigabyte result through both picker and fallback download; byte-compare after early lifecycle events.
- [ ] Attempt to save over the source and confirm it is blocked.
- [ ] Force sleep, visibility changes, reload, navigation, browser crash and tab close.
- [ ] Exercise low disk quota and denied filesystem permissions.
- [ ] Test multi-video/multi-audio files and confirm all loss is disclosed before processing.
- [ ] Run VoiceOver, NVDA and TalkBack; verify keyboard-only flow, announcements, focus recovery, 200–400% zoom and forced colours.
- [ ] Verify deployed CSP and other security headers, GitHub Actions permissions, environment approvals and branch protections.
- [ ] Inspect the final public deployment inventory for recordings, source filenames, debug artefacts and unexpected media.
- [ ] Run checksum-pinned official EBU/ITU material where licensing permits.
- [ ] Confirm branding masters, wording, licences and opening/closing interaction with institutional stakeholders.
- [ ] Verify production diagnostics contain product/build identity and no sensitive media information.

## 20. Handover summary

The five most important findings are:

1. A real output missed both loudness and true-peak requirements while being reported as successful.
2. EOF true-peak detection and limiting can miss a final transient completely.
3. Audio timing reconstruction and AAC compensation can delete source onset and collapse gaps.
4. OPFS writes, output verification, saving and deletion do not form a safe ownership transaction.
5. Mutable asynchronous preflight/cancellation state can run the wrong, unsupported, or supposedly cancelled job.

The five most valuable proposed changes are:

1. Add correct DSP finalization and full-chain encoded-output acceptance.
2. Preserve source timestamps and every source sample.
3. Add write-all semantics, hard output postconditions and a result lease.
4. Introduce an immutable epoch-bound `AcceptedJob`.
5. Make cancellation and sample ownership authoritative across every phase.

General-production release blockers are R-01 through R-07 and R-09. R-08 should also be resolved before multi-tab use is relied upon. Current disabled branding choices are a separate feature-completeness gate.

After implementation, another developer should run:

```bash
npm ci
npm run check
npm audit
npm run dev
```

They should then open `/acceptance.html` on the documented local server and complete the browser/manual checklist above. Because `npm run check` currently writes ignored `dist/`, clean-tree immutability should either be tested in a temporary checkout or repaired as part of R-15.

No illustrative patch or suggested edit was applied. No branch, commit, remote, issue, pull request, deployment, database, credential, or external system was modified. The original repository remained on `main` at `66227e51dc0905c1853d79fb927d8f009be80ad4`, with no tracked or staged changes and the same pre-existing untracked review file.

<!-- FILE: reviews/2026-08-26/uon-video-helper-comprehensive-review-2026-08-26.source.txt -->

# UoN Video Helper — Read-Only Comprehensive Repository Review

Review date: 26 August 2026  
Repository commit: `66227e51dc0905c1853d79fb927d8f009be80ad4`

## 1. Executive summary

UoN Video Helper has a coherent browser-only architecture, strong privacy intent, explicit streaming constraints, useful diagnostics, and a substantial automated safety net. However, it is not ready for general production use. The review found no Critical issues, but identified 9 High, 6 Medium, and 1 Low consolidated findings.

The clearest release blocker is that the current pipeline can create an MP4 that fails both stated audio requirements while still reporting success. In an isolated Chrome run using a real repository sample, the source measured −21.86 LUFS/−1.86 dBTP and the output measured −16.75 LUFS/−1.98 dBTP, outside the required −16 ±0.5 LUFS and ≤−2.0 dBTP limits. Separate executable checks demonstrated an end-of-file true-peak defect capable of leaving a final transient at 0 dBTP.

Other serious risks involve source-onset deletion, stale preflight results, partial OPFS writes, output deletion during saving, cancellation races, multi-track data loss, and a Web Lock race capable of deleting a live workspace.

Strong aspects include:

- Source media remains local and read-only.
- No production source-media, filename, or media-characteristic egress was found.
- Media processing is streamed with backpressure.
- Every Mediabunny output explicitly disables in-memory fast-start behaviour.
- The worker protocol and major data objects are typed and well separated.
- The isolated canonical quality gate passed 355 tests with one skip.
- Dependency audits reported no known vulnerabilities.

The five highest-priority actions are:

1. Finalize true-peak detection and limiting correctly at EOF.
2. Calibrate loudness against the complete output chain and enforce final decoded-output acceptance.
3. Preserve every source audio sample and its source timeline.
4. Make OPFS writing, verification, saving, and deletion one explicit ownership transaction.
5. Bind preflight to an immutable file/preset job and make cancellation authoritative across every phase.

The current UI also does not yet expose the final opening/closing branding choices, so the repository is not feature-complete for the stated product even apart from these defects.

No suggested change was applied. The original repository remained unchanged.

## 2. Repository status and review environment

| Item | Observed state |
|---|---|
| Repository | [UoN Video Helper](<<checkout>>) |
| Branch | `main`, tracking `origin/main`, ahead/behind 0/0 |
| Starting and final commit | `66227e51dc0905c1853d79fb927d8f009be80ad4` |
| Starting status | No staged or unstaged tracked changes; one pre-existing untracked file: `pm_skills/project/code-review-2026-08-26.md` |
| Final status | Identical to starting status |
| Submodules | None |
| Worktrees | One, at the repository root |
| Remote | `https://github.com/djDAOjones/UoN-Video-Helper.git`; no embedded credential |
| Tags | None observed |
| OS | macOS 26.5.2 / Darwin build 25F84, arm64 |
| Tools | Node 24.5.0; npm 11.5.1; Git 2.49.0; ripgrep 15.2.0; Python 3.10.13 |
| Installed build tool | Vite 8.2.2 in the isolated copy |
| Network | Restricted initially; approved read-only access was used for npm registry metadata and authoritative standards documentation |
| Credentials | None required; no backend, database, authentication service, or production environment was accessed |
| Isolation | `/private/tmp/uon-video-review.Y90uPA`, populated from `git archive HEAD`; dependencies, caches, build output, and custom validation stayed there |
| Browser validation | Local isolated Vite server at `127.0.0.1:5179`, inspected in the in-app Chromium browser |
| Repository integrity | `git diff` and `git diff --cached` were empty at close; branch, commit, remote, worktree, and untracked status were unchanged |

The pre-existing untracked review document was used only as a lead index. Every material claim reported below was independently checked against current source, callers, tests, configuration, or executable behaviour. It was not modified.

The repository resides in OneDrive. That is a documented hostile-filesystem risk for project-memory surgery, but no unexpected divergence or conflict copy appeared during this read-only run.

## 3. System purpose and architecture

The product is a static, browser-only conveyor for turning a local educational video into a newly encoded, University-branded, loudness-normalised MP4. Its intended users are University staff who should not have to choose codecs, bitrates, levels, or technical settings.

Principal technologies:

- TypeScript and vanilla browser UI
- Vite
- Web Workers
- WebCodecs
- Mediabunny 1.55.2
- Origin Private File System
- Vitest, ESLint, TypeScript, Prettier check, Markdownlint
- GitHub Actions/GitHub Pages deployment configuration

There is no server, database, account system, authentication, authorisation, tenant model, queue, webhook, analytics backend, or production API.

```text
Untrusted local File/Blob — opened read-only
            │
            ▼
     Main-thread coordinator
     file selection + UI state
            │ typed messages
            ▼
         Job worker
     ┌────────┴─────────┐
     │ inspect source   │ → SourceReport
     │ preflight device │ → Capability/verdict
     └────────┬─────────┘
              ▼
        Processing pipeline
     ┌───────────────────────┐
     │ Pass A: source audio  │
     │ Pass B: gain planning │
     │ Pass C: encode/mux    │
     └─────────┬─────────────┘
               │
       inbound same-origin
       branding assets ────────► video/audio mux lanes
               │
               ▼
       job-scoped OPFS MP4
               │ OPFS-backed File
               ▼
      picker stream or download
               │
               ▼
      explicit workspace cleanup
```

Important boundaries:

- The local source file is untrusted input but is never opened for writing.
- Source media crosses from main thread to the worker but not off-device.
- Branding assets are fetched inbound from the same origin.
- OPFS is persistent scratch storage scoped to the browser origin.
- Saving crosses from OPFS into a user-selected filesystem destination or browser download.
- CI has GitHub Pages and OIDC permissions and is therefore the main privileged repository-side process.
- Browser codecs, filesystem implementations, and Mediabunny are critical operational dependencies.

The main application enters through [index.html](<<checkout>/index.html>) and [src/main.ts](<<checkout>/src/main.ts:1>). The independent browser acceptance surface enters through [acceptance.html](<<checkout>/acceptance.html>).

## 4. Review coverage matrix

Finding counts use primary ownership and are not double-counted across components.

| Component | Purpose | Depth | Important material inspected | Validation | Primary findings | Limitations |
|---|---|---:|---|---|---:|---|
| Root configuration | Build, package, documentation, tool configuration | Full | `package*.json`, Vite, TypeScript, ESLint, README, agent rules | Install, build, lint, typecheck, docs checks | 1M | Hosting settings outside Git were unavailable |
| `src/audio/` | Loudness, K-weighting, macro-level, compression, true peak | Full | All implementation and tests; protected DSP traced end-to-end | Unit suite plus custom EOF/LRA reproductions | 1H / 1M / 1L | Official downloaded EBU corpus not run |
| `src/media/` | Inspection, preflight, branding, encode, mux, OPFS, save | Full | All first-party files and relevant Mediabunny internals | Unit suite, real browser processing, custom sample analysis | 6H | Safari/Firefox and destructive fault injection not run |
| `src/workers/`, `src/main.ts`, `src/core/` | Request coordination, state, cancellation, diagnostics | Full | Protocol, worker handlers, state transitions, timeouts, logger | Unit suite and browser acceptance | 2H / 1M | Every asynchronous interleaving was not executable |
| `src/ui/`, `src/styles/`, `index.html` | User workflow and presentation | Full plus browser inspection | All UI modules, semantics, tokens, states, responsive layout | Desktop and 390×844 browser inspection; contrast tests | 1M | No screen reader or voice-control session |
| `src/acceptance/` | Real-browser acceptance criteria and fixtures | Full | Fixture generation and all acceptance criteria | Full local Chrome acceptance run | 1M | Four criteria remain expressly manual |
| `test/` | Unit, integration, EBU and policy tests | Full for first-party tests | 32 test files and generated-fixture rules | 355 pass, 1 skipped | Included above | Generated binary fixtures were not hand-edited or exhaustively decoded |
| `src/config/` | Presets and load-bearing numbers | Full | Presets, thresholds, branding, version | Typecheck/tests/build | Cross-cutting | Configuration accuracy still depends on real devices |
| `scripts/`, `.github/`, `public/` | Build guards, CI, public assets | Targeted/full for text; sampled for binaries | Placeholder guard, workflow, branding inventory | Build inventory, static inspection, audit | 1M | Branding binaries were not visually inspected frame-by-frame |
| `docs/` | Protected specification and rationale | Full | Specification, rationale, open decisions | Markdown lint and link validation | 1M | Proposed corrections were not written because docs are protected |
| `pm_skills/project/` | Current decisions, backlog and architecture memory | Targeted per project rules | Hot sections, relevant decisions/tickets, untracked review lead | Memory structural check | Informational | Framework-owned `pm_skills` internals were sampled, not reviewed as product code |
| `node_modules/` | Third-party implementation | Sampled | Mediabunny paths needed to verify primary-track selection and encoder config | npm audit and metadata analysis | None assigned | Transitive source was not manually reviewed package by package |
| `dist/` | Generated deployment output | Generated only in isolation | Bundle inventory and source maps | Vite production build | None assigned | Not reviewed as authoritative source |
| `samples/` | Maintainer recordings | Targeted, read-only | Onset energy and one full output case | Browser processing and independent audio measurements | Evidence only | Not every sample was processed |
| Backend/database/auth | Not present | Excluded | Repository-wide search | N/A | 0 | Irrelevant to this static application |

The repository contains 209 tracked files. The review inspected every significant first-party component; generated binaries, third-party packages, real recordings, and framework-owned project-management internals received risk-based rather than line-by-line review.

## 5. Validation results

### Completed successfully

| Command/check | Location | Tool | Result and relevant output | Interpretation | Original unchanged |
|---|---|---|---|---|---|
| `git status --short --branch`, `git rev-parse HEAD`, diffs, worktree and remote inspection | Original repository | Git 2.49.0 | Exit 0; starting and final states identical | Integrity confirmed | Yes |
| `npm ci --ignore-scripts --no-audit --no-fund` using a temp npm cache | Isolated copy | npm 11.5.1 | Exit 0; 243 packages installed | Lockfile resolves reproducibly on this environment without lifecycle scripts | Yes |
| `npm run check` | Isolated copy with read-only copied Git metadata | Node 24.5.0/npm 11.5.1 | Exit 0; placeholders, typecheck, lint, tests, build, docs and memory structure passed | Canonical gate is green but does not cover the demonstrated boundary defects | Yes |
| Vitest portion of `npm run check` | Isolated copy | Vitest | 32 files; 355 passed, 1 skipped; 23.05 seconds | Broad and fast safety net; one standards case remains skipped | Yes |
| Vite production build | Isolated copy | Vite 8.2.2 | 19 modules; worker 435.77 kB uncompressed; app 23.23 kB; CSS 9.21 kB | Production bundle builds successfully | Yes |
| Documentation lint/link checks | Isolated copy | Markdownlint/custom link checker | 10 linted Markdown files, zero issues; 63 checked files, zero broken links | Documentation is structurally healthy | Yes |
| `npm audit --json` | Isolated copy | npm 11.5.1 | Exit 0; zero known vulnerabilities at all severities | No current npm advisory finding | Yes |
| `npm audit --omit=dev --json` | Isolated copy | npm 11.5.1 | Exit 0; zero production vulnerabilities | Runtime dependency audit clean | Yes |
| Responsive browser inspection | Local isolated server | In-app Chromium | No 390 px horizontal overflow; panels remained within viewport | Basic mobile reflow is sound | Yes |

The memory check emitted five non-blocking size warnings and zero structural failures. The warnings concern backlog/ticket word budgets, not product correctness, and were not “fixed” during this review.

### Completed with failures or material findings

| Command/check | Location | Result | Classification |
|---|---|---|---|
| Initial `npm ci --ignore-scripts --no-audit --no-fund` | Isolated sandbox | `ENOTFOUND` plus npm exit-handler error | Review-environment network restriction; rerun successfully with approved read-only network access |
| Initial `npm run check` in the `git archive` copy | Isolated copy without `.git` | Documentation link check could not resolve tracked-file metadata | Isolation-construction issue, not repository defect; exact rerun passed after supplying copied Git metadata |
| `npm outdated --json` | Isolated copy | Exit 1 because TypeScript 6.0.3 has 7.0.2 available | Update available, already represented by backlog ecosystem-upgrade work; not an urgent defect |
| `/acceptance.html` run | Local isolated Chrome; 85.8 seconds | 7 pass, 0 fail, 4 manual; produced playable worker output and cleaned OPFS | Functional acceptance succeeded, but console emitted unclosed `AudioSample` and `VideoSample` warnings |
| Real sample processing through current browser pipeline | Isolated Chrome | Output −16.75 LUFS/−1.98 dBTP against −16 ±0.5/≤−2.0 | Confirmed production-output failure |
| Custom true-peak/limiter EOF harness | Temporary isolated scripts | Final-frame impulse remained at 0 dBTP; moving it six frames earlier produced about −2.0 dBTP | Confirmed EOF defect |
| Custom file-LRA harness | Temporary isolated scripts | Current vs correctly padded examples differed by 2.69 LU and 6.02 LU | Confirmed file-finalization defect |
| Browser accessible-name inspection | Local isolated server | Initial hidden `<progress>` had no label, `aria-label`, or `aria-labelledby` | Probable WCAG name/role/value defect |

The browser acceptance’s synthetic results were:

- quiet: −16.00 LUFS / −7.87 dBTP
- hot: −16.00 / −7.24
- drift: −16.11 / −2.14
- inconsistent: −16.08 / −2.95
- VFR markers: 12/12, systematic 5.8 ms, drift 9.0 ms, spread 24 ms
- cancellation OPFS directories: 0 → 1 → 0
- worker-path file: 81 kB, 4.10 seconds
- smaller-output result: 468 kB versus 1,223 kB
- egress observer: 47 same-origin requests and no observed request body

### Not run

- Safari and Firefox browser acceptance
- Screen-reader, voice-control, switch-control, and browser-zoom rehearsal
- Official full EBU test-set download and execution
- Subjective listening for pumping, clipping, transitions, or sync
- Every real recording and 5/20/60-minute device matrix
- Large multi-gigabyte fallback-download lifetime test
- Deterministic multi-tab Web Lock race
- Sleep, wake-lock, reload, crash, and tab-force-close recovery
- Deliberate disk-quota exhaustion or actual OPFS short writes
- Real malformed/fuzzed media corpus
- Live GitHub Pages deployment, repository permissions, branch protection, or hosting headers
- Penetration test against a deployed origin
- Disaster-recovery exercise; there is no backend data store to restore

These were unavailable, unsafe for a read-only review, required unsupported browsers/hardware, or require stakeholder-owned infrastructure.

## 6. Prioritised findings

### R-01 Final output can fail stated loudness and true-peak acceptance

- **Severity:** High
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Audio correctness / misleading success
- **Location:** [src/media/audio-plan.ts](<<checkout>/src/media/audio-plan.ts:108>), [src/audio/chain.ts](<<checkout>/src/audio/chain.ts:41>), [src/media/encoding.ts](<<checkout>/src/media/encoding.ts:52>), [src/workers/job.worker.ts](<<checkout>/src/workers/job.worker.ts:174>)
- **Affected component or flow:** Source analysis → gain planning → limiting → resampling/AAC → final verification
- **Evidence:** A real 44.1 kHz sample produced −16.75 LUFS and −1.98 dBTP. Pass B measured −22.47 LUFS without the limiter, selected +6.47 dB, and the limited pre-encode output was already −16.41 LUFS. Resampling and AAC moved it further.
- **Current behaviour:** Gain planning assumes the nonlinear limiter does not change integrated loudness. Final verification warns only beyond a 1 LU miss, logs true peak without enforcing it, and swallows verification exceptions.
- **Why it matters:** The application’s main promise is a correctly levelled output. A green UI can presently deliver an out-of-contract file.
- **Realistic scenario:** High-crest speech activates limiting; the file is accepted by the synthetic harness but rejected by an institutional ingest or fails internal quality review.
- **Existing mitigation:** Source-only analysis, limiter, final decoded measurement, and synthetic acceptance. Their thresholds and corpus are insufficient.
- **Recommended change:** Solve gain against the complete DSP path, limit at final sample rate or establish encoded-output headroom, then enforce ±0.5 LU and ≤−2 dBTP on the decoded MP4. A failed postcondition must retry safely or fail visibly.
- **Illustrative patch or implementation outline:** Not applied. Add a bounded gain-calibration loop around the full chain; decode and verify the finalized MP4 before placing it in the `finished` map.
- **Tests to add or amend:** 44.1→48 kHz high-crest speech; real-material regression; AAC/resampler matrix; hard failures for loudness and peak misses.
- **Validation approach:** Independent decoded-output meter plus ffmpeg comparison on representative samples.
- **Estimated effort:** Large
- **Implementation risk:** High
- **Dependencies or sequencing:** Fix R-02 first; then tighten R-11.
- **Relevant standard or classification:** Project specification §§4.4, 5.2 and acceptance criterion 2. Existing backlog VH-50 already tracks the core real-output miss.

### R-02 True-peak detection and limiting miss end-of-file transients

- **Severity:** High
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** DSP boundary correctness
- **Location:** [src/audio/truepeak.ts](<<checkout>/src/audio/truepeak.ts:133>), [src/audio/limiter.ts](<<checkout>/src/audio/limiter.ts:159>)
- **Affected component or flow:** Final interpolation FIR state and limiter look-ahead drain
- **Evidence:** A one-sample full-scale signal was reported as −64.05 dBTP without tail finalization. Correct zero padding reports 0 dBTP. A final-frame impulse also emerged from the limiter at 0 dBTP.
- **Current behaviour:** The detector advances only when another input sample arrives. Limiter flush drains delayed samples using stale gain without advancing the detector through a zero-padded tail.
- **Why it matters:** A legal-looking output can contain a peak 2 dB above the hard ceiling.
- **Realistic scenario:** A cut, click, or consonant transient at the final sample is neither detected nor attenuated.
- **Existing mitigation:** Sustained-tone and faded-tone tests; they do not exercise the final interpolation positions.
- **Recommended change:** Add explicit detector finalization with FIR zero padding. During limiter flush, continue advancing detector and gain while preserving exact output length.
- **Illustrative patch or implementation outline:** Not applied. Introduce `finish()`/`flushTail()` semantics shared by measurement and limiting rather than duplicating padding rules.
- **Tests to add or amend:** One-frame full scale; final-frame impulse; every final FIR offset; chunk-size invariance; independent zero-padded output measurement.
- **Validation approach:** Protected DSP suite, Tech 3341 harness, property tests, and real decoded output.
- **Estimated effort:** Medium
- **Implementation risk:** High
- **Dependencies or sequencing:** First implementation item; protected files require the full acceptance harness.
- **Relevant standard or classification:** ITU-R BS.1770-4 true-peak measurement.

### R-03 Source audio timing and onset are not preserved

- **Severity:** High
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Silent data loss / A/V synchronisation
- **Location:** [src/media/audio-plan.ts](<<checkout>/src/media/audio-plan.ts:147>), [src/media/encoder-delay.ts](<<checkout>/src/media/encoder-delay.ts:127>), [src/media/pipeline.ts](<<checkout>/src/media/pipeline.ts:343>)
- **Affected component or flow:** Decoded audio → chain output timestamps → AAC priming compensation
- **Evidence:** Processed audio timestamps are reconstructed from emitted frame count rather than source timestamps, collapsing initial offsets and gaps. AAC compensation then deliberately discards approximately 44 ms from the start. Three real sources contained audible energy in that interval.
- **Current behaviour:** Video retains source-relative time while audio is re-clocked continuously and shifted earlier, deleting negative-time samples.
- **Why it matters:** Speech onsets, meaningful gaps, and A/V alignment can change without warning.
- **Realistic scenario:** A lecture starts immediately with a consonant; the first sound is clipped while later sync appears normal.
- **Existing mitigation:** AAC delay measurement improves later systematic sync. It assumes the removed interval is silence or branding, which current UI behaviour does not guarantee.
- **Recommended change:** Preserve source timestamp offsets and gaps. Compensate priming with supported container edit-list/priming metadata or a timeline/picture adjustment that retains all samples. Represent probe failure separately from zero delay.
- **Illustrative patch or implementation outline:** Not applied. Carry input timestamp and duration through each processed audio block; express padding/gaps explicitly instead of deriving time solely from `emittedFrames`.
- **Tests to add or amend:** Impulse at t=0; initial non-zero timestamp; internal gap; no-opening/opening cases; channel-count variants; beginning-waveform equality; A/V markers at start, middle, and end.
- **Validation approach:** Decode output and compare sample conservation and marker timing across supported browsers.
- **Estimated effort:** Large
- **Implementation risk:** High
- **Dependencies or sequencing:** Coordinate with R-01 and any branding-boundary work.

### R-04 Output success is not transactional from OPFS write through user save

- **Severity:** High
- **Confidence:** High for partial-write handling; Medium-high for browser-specific save failure
- **Classification:** Confirmed defect plus strongly supported lifetime risk
- **Category:** Data integrity / filesystem ownership
- **Location:** [src/media/opfs.ts](<<checkout>/src/media/opfs.ts:288>), [src/media/save.ts](<<checkout>/src/media/save.ts:33>), [src/main.ts](<<checkout>/src/main.ts:646>), [src/workers/job.worker.ts](<<checkout>/src/workers/job.worker.ts:174>)
- **Affected component or flow:** Mux write → postcondition check → OPFS-backed `File` → picker/download → cleanup
- **Evidence:** The sync writer ignores the returned byte count, although the [File System Standard requires callers to account for partial writes](https://fs.spec.whatwg.org/#api-filesystemsyncaccesshandle-write). Verification exceptions are swallowed. Fallback download returns immediately after `anchor.click()`, after which main discards the backing OPFS entry; the standard notes that such a `File` may become unreadable after entry removal. A new job can also delete a result while picker streaming is active.
- **Current behaviour:** Corrupt or partially consumed output can be reported as ready/saved. The picker can also select the original source destination; no same-entry check protects the “source never modified” invariant.
- **Why it matters:** This is the principal irreversible user-data boundary.
- **Realistic scenario:** Quota pressure produces a short write, or a multi-gigabyte fallback download loses its OPFS backing before consumption completes.
- **Existing mitigation:** Storage headroom, OS overwrite confirmation, 60-second object URL, and awaited picker `pipeTo`.
- **Recommended change:** Implement write-all semantics, require readable expected tracks, introduce an explicit result read lease/exclusive saving state, and compare source/destination handles with `isSameEntry()` where handles are available. [MDN documents the file-handle identity API](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemHandle/isSameEntry).
- **Illustrative patch or implementation outline:** Not applied.

  ```text
  while bytes remain:
      written = handle.write(remaining, at=currentOffset)
      if written <= 0: throw OutputWriteError
      advance by written

  verify video and expected audio
  acquire result lease
  consume save stream
  release lease
  only then permit workspace disposal
  ```

- **Tests to add or amend:** Short-write fake; corrupt MP4; missing expected audio; slow picker plus second process; early fallback discard; byte comparison; source/destination same-entry case.
- **Validation approach:** Unit fault injection and real multi-gigabyte browser tests in each supported engine.
- **Estimated effort:** Large
- **Implementation risk:** Medium
- **Dependencies or sequencing:** Release blocker independent of DSP work.

### R-05 Preflight results are not bound to the selected file and preset

- **Severity:** High
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Asynchronous state race
- **Location:** [src/main.ts](<<checkout>/src/main.ts:390>), [src/workers/job.worker.ts](<<checkout>/src/workers/job.worker.ts:42>)
- **Affected component or flow:** File selection/preset change → concurrent inspect/preflight → visible Create control → process request
- **Evidence:** Late inspect or preflight responses can call `showProcessControls(file)` and replace the mutable `jobFile`. Start re-reads the current preset instead of using the preflighted combination. Worker request handlers run concurrently.
- **Current behaviour:** A result for file A or preset X can enable a job using file B or preset Y.
- **Why it matters:** Storage, codec, and duration conclusions can be bypassed without user awareness.
- **Realistic scenario:** A slow file A finishes after file B; the UI names B but processing receives A. Alternatively, a preset is changed and Create is clicked before its new preflight completes.
- **Existing mitigation:** Request IDs correlate individual promises, but no selection generation binds their effects to current UI state.
- **Recommended change:** Add a monotonically increasing selection epoch, disable Create immediately on relevant change, ignore stale responses, and store one immutable accepted `JobSpec`.
- **Illustrative patch or implementation outline:** Not applied.

  ```text
  epoch = ++selectionEpoch
  candidate = {epoch, fileIdentity, presetId}
  result = await preflight(candidate)
  if epoch != selectionEpoch: ignore
  acceptedJob = freeze(candidate + result)
  Start sends acceptedJob unchanged
  ```

- **Tests to add or amend:** Deferred A/B replies; preset change mid-preflight; stale errors; assert processed file and preset exactly match the enabling summary.
- **Validation approach:** Deterministic coordinator tests plus browser rapid-selection rehearsal.
- **Estimated effort:** Medium
- **Implementation risk:** Medium
- **Dependencies or sequencing:** Pair with R-06 and R-07.

### R-06 Preflight does not prove that the exact executable job is supported

- **Severity:** High
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Capability validation / configuration drift
- **Location:** [src/media/capability.ts](<<checkout>/src/media/capability.ts:28>), [src/media/inspect.ts](<<checkout>/src/media/inspect.ts:213>), [src/media/preflight.ts](<<checkout>/src/media/preflight.ts:35>), [src/config/presets.ts](<<checkout>/src/config/presets.ts:332>), [src/media/encoding.ts](<<checkout>/src/media/encoding.ts:21>)
- **Affected component or flow:** Inspection/capability probe → verdict → Mediabunny runtime encoder
- **Evidence:** Secure-context and OPFS capability are measured but omitted from the blocking input. Per-track decode support is reported but not made a hard prerequisite. Probe failures can become “estimate unavailable.” Manual support probing uses fixed AVC/AAC configurations that differ from Mediabunny’s runtime configuration.
- **Current behaviour:** Start can be enabled for an undecodable source or an environment that cannot create OPFS. Conversely, a fixed probe can reject a runtime-supported candidate.
- **Why it matters:** A supposedly approved job can predictably fail after expensive processing begins.
- **Realistic scenario:** An unsupported HEVC MOV reaches `VideoSampleSink`, or an insecure deployment reaches workspace creation before failing.
- **Existing mitigation:** Boot status, source support rows, manual `isConfigSupported`, and a real-path calibration probe.
- **Recommended change:** Put secure context, OPFS, and primary-track decode support into the verdict; preserve typed probe failure causes; derive the exact `isConfigSupported()` input from the same encoder candidate used at runtime. WebCodecs support is explicitly configuration-specific in the [W3C specification](https://www.w3.org/TR/webcodecs/).
- **Illustrative patch or implementation outline:** Not applied. Create one `EncoderCandidate` object and pass it to support probing, calibration, runtime setup, diagnostics, and tests.
- **Tests to add or amend:** Every missing prerequisite; unsupported real codec; exact captured Mediabunny candidate; probe timing failure versus capability failure.
- **Validation approach:** Real browser matrix using runtime-captured configurations.
- **Estimated effort:** Medium
- **Implementation risk:** Medium
- **Dependencies or sequencing:** Resolve with R-05 before estimate refinement.
- **Relevant standard or classification:** The fixed `avc1.640033` Level 5.1 probe also cannot represent 3840×2160 at 60 fps: the [ITU H.264 Table A-1](https://www.itu.int/rec/dologin_pub.asp?id=T-REC-H.264-202408-I%21%21PDF-E&lang=e&type=items) limit is lower than the required macroblock rate, which requires Level 5.2.

### R-07 Cancellation is neither authoritative nor resource-safe

- **Severity:** High
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Cancellation / native resource lifetime
- **Location:** [src/workers/job.worker.ts](<<checkout>/src/workers/job.worker.ts:115>), [src/media/pipeline.ts](<<checkout>/src/media/pipeline.ts:426>), [src/media/audio-plan.ts](<<checkout>/src/media/audio-plan.ts:51>)
- **Affected component or flow:** Inspect, preflight, processing, finalization, verification, cleanup
- **Evidence:** The process controller is registered after awaiting previous-result cleanup, so an early cancel is lost. There are no post-finalize or post-verification abort checks. Inspect/preflight cancellation messages have no controller. Several loops check abort before entering the `try/finally` that closes a yielded sample. Chrome emitted unclosed `AudioSample` and `VideoSample` warnings.
- **Current behaviour:** Cancel can produce success, allow superseded work to continue, or defer native cleanup to garbage collection.
- **Why it matters:** Users are explicitly promised that cancellation stops work and leaves nothing behind.
- **Realistic scenario:** Cancel during verification returns “ready,” or repeated aborts accumulate decoder/GPU pressure.
- **Existing mitigation:** Abort signals, ordinary mid-pipeline cancellation, OPFS disposal, and a passing directory-count acceptance case.
- **Recommended change:** Register controllers before the first await; make all request kinds cancellable/latest-only; check after every non-cancellable commit boundary; pass the signal into verification; initiate output cancellation while lanes await; place ownership checks inside `try/finally`.
- **Illustrative patch or implementation outline:** Not applied.

  ```text
  for await sample:
      try:
          throwIfAborted(signal)
          await consume(sample)
      finally:
          sample.close()
  ```

- **Tests to add or amend:** Barriers after iterator yield, result cleanup, finalize, finish, and verification; exactly one cancelled response; no processed response; every sample closed once; wedged `add()` released by output cancellation.
- **Validation approach:** Deterministic unit barriers and browser cancellation in every phase/engine.
- **Estimated effort:** Medium
- **Implementation risk:** High
- **Dependencies or sequencing:** Clarify result ownership from R-04 first.

### R-08 OPFS claim checking and deletion have a Web Lock race

- **Severity:** High
- **Confidence:** Medium
- **Classification:** Strongly supported risk
- **Category:** Filesystem concurrency / silent data loss
- **Location:** [src/media/opfs.ts](<<checkout>/src/media/opfs.ts:59>)
- **Affected component or flow:** New workspace creation and cross-tab orphan sweeping
- **Evidence:** A directory becomes visible before its live claim is obtained. Sweep briefly acquires and releases a candidate lock while classifying, then removes the directory later outside that lock.
- **Current behaviour:** Classification and deletion are not one atomic critical section.
- **Why it matters:** A rare interleaving can delete a newly live job workspace—the exact outcome the Web Lock design is intended to prevent.
- **Realistic scenario:** Tab A creates a directory; Tab B classifies it as orphaned; A acquires the live claim; B then removes it.
- **Existing mitigation:** Per-session names, long-held live-job locks, fail-closed uncertainty, and per-entry sweep failures.
- **Recommended change:** Acquire the job lock before creating/opening the directory. In sweep, perform removal inside the successful `ifAvailable` lock callback.
- **Illustrative patch or implementation outline:** Not applied. Lock ownership must cover both observation and mutation; the [Web Locks API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API) provides the coordination primitive, not automatic filesystem exclusion.
- **Tests to add or amend:** Injected lock scheduler with barriers; two-worker/two-tab browser spike; open-wins and sweep-wins interleavings.
- **Validation approach:** Deterministic concurrency model plus real multi-tab repetition.
- **Estimated effort:** Medium
- **Implementation risk:** High
- **Dependencies or sequencing:** Land separately from other OPFS changes.

### R-09 Multi-track files can be inspected and processed inconsistently, with silent track loss

- **Severity:** High
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Silent data loss / source interpretation
- **Location:** [src/media/inspect.ts](<<checkout>/src/media/inspect.ts:189>), [src/media/pipeline.ts](<<checkout>/src/media/pipeline.ts:224>), [src/ui/source-panel.ts](<<checkout>/src/ui/source-panel.ts:95>)
- **Affected component or flow:** Track inspection → preflight → primary-track selection → output mux
- **Evidence:** Inspection uses array element zero, while processing uses Mediabunny’s `getPrimary*Track()` selection. Only one video and audio stream are emitted. Extra A/V track counts are not presented as a pre-processing loss warning.
- **Current behaviour:** Capability can be reported for one stream while another is processed, and additional language/commentary/angle tracks disappear silently.
- **Why it matters:** Silent track loss is a protected project invariant.
- **Realistic scenario:** A lecture contains a default low-bitrate stream and a higher-bitrate alternate; the UI describes one, processes another, and drops the remainder.
- **Existing mitigation:** Subtitles and chapters are disclosed. Extra A/V tracks are not.
- **Recommended change:** Inspect the exact primary tracks selected for processing; surface all track counts; block or require an explicit purpose-written acknowledgement before lossy processing.
- **Illustrative patch or implementation outline:** Not applied. Centralize `selectProcessingTracks(input)` and reuse its result in inspection, preflight, processing, diagnostics, and warnings.
- **Tests to add or amend:** Multi-video, multi-audio, language/default flags, commentary track, different codec capabilities, no-primary edge cases.
- **Validation approach:** Synthetic MP4/WebM/MKV fixtures and real-player inspection.
- **Estimated effort:** Medium
- **Implementation risk:** Medium
- **Dependencies or sequencing:** Immediate safe option is to block unsupported multiplicity; preservation policy is a later product decision.

### R-10 File-LRA and pause-freeze semantics diverge at boundaries

- **Severity:** Medium
- **Confidence:** High for LRA; Medium for pause behaviour
- **Classification:** Confirmed defect
- **Category:** Protected DSP correctness
- **Location:** [src/audio/loudness.ts](<<checkout>/src/audio/loudness.ts:297>), [src/audio/macrolevel.ts](<<checkout>/src/audio/macrolevel.ts:72>)
- **Affected component or flow:** LRA finalization and macro-level gain envelope
- **Evidence:** The file analyser does not append the 1.5 seconds of silence prescribed for final file LRA. Reproductions changed LRA by 2.69 and 6.02 LU. Separately, raw pause correction is frozen before centred smoothing and slew limiting, so post-pause speech can still change gain through the paused interval.
- **Current behaviour:** End-of-file level changes are underrepresented; “freeze during pauses” is not a strict final-envelope invariant.
- **Why it matters:** Both can change whether macro-level processing activates and whether pauses audibly pump.
- **Realistic scenario:** A late level change is hidden from the LRA gate, or a pause ramps toward future correction.
- **Existing mitigation:** Macro gating, clamp, slew limit, pause mask, and extensive common-path tests.
- **Recommended change:** Advance only LRA state with a 1.5-second zero tail; do not alter integrated loudness or duration. Reapply a pause hold to the final smoothed/slew-limited envelope.
- **Illustrative patch or implementation outline:** Not applied.
- **Tests to add or amend:** Official Tech 3342 material; EOF level changes; opposite pre/post corrections around a long pause; chunk invariance.
- **Validation approach:** Protected DSP suite and subjective real-speech listening.
- **Estimated effort:** Medium
- **Implementation risk:** High
- **Dependencies or sequencing:** After R-01/R-02; re-run all protected harnesses.
- **Relevant standard or classification:** [EBU Tech 3342](https://tech.ebu.ch/docs/tech/tech3342.pdf) file-measurement procedure.

### R-11 The acceptance harness has false-pass paths

- **Severity:** Medium
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Test effectiveness / unsupported assurance
- **Location:** [src/acceptance/run.ts](<<checkout>/src/acceptance/run.ts:233>), [test/ebu3341/tech3341.test.ts](<<checkout>/test/ebu3341/tech3341.test.ts:121>), [test/ebu3341/signals.ts](<<checkout>/test/ebu3341/signals.ts:135>)
- **Affected component or flow:** Browser release acceptance
- **Evidence:** Criterion 2 crops the first and last content seconds, uses the crop for true peak, and skips missing audio while defaults allow the criterion to pass. Criterion 3 is hardcoded to pass. Authentic EBU programme cases are skipped; some peak cases use an acknowledged local interpretation. The egress observer does not comprehensively observe worker/XHR request bodies, and cancellation passed despite native-resource warnings.
- **Current behaviour:** The exact defects in R-01/R-02/R-07 evade an all-green automated result.
- **Why it matters:** The harness is treated as release evidence.
- **Realistic scenario:** An output loses audio or has a final over-peak transient but criterion 2 still passes.
- **Existing mitigation:** Real WebCodecs, OPFS, worker, VFR, playback and network activity are exercised.
- **Recommended change:** Require one finite decoded measurement per expected audio output; use full output for true peak; fail resource warnings; make compliance status reflect actually executed fixtures; observe all browser request contexts.
- **Illustrative patch or implementation outline:** Not applied.
- **Tests to add or amend:** Missing audio, t=0/EOF transients, real high-crest material, result-count assertions, worker/XHR egress, official EBU cases/checksums.
- **Validation approach:** Run repaired harness in all supported engines.
- **Estimated effort:** Medium
- **Implementation risk:** Medium
- **Dependencies or sequencing:** Tighten immediately after product corrections, not before.
- **Relevant standard or classification:** [EBU Tech 3341](https://tech.ebu.ch/docs/tech/tech3341.pdf) describes its cases as minimum evidence rather than universal proof.

### R-12 Long-running jobs lack required survival controls

- **Severity:** Medium
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Reliability / recovery
- **Location:** [docs/01-specification.md](<<checkout>/docs/01-specification.md:365>), [src/main.ts](<<checkout>/src/main.ts:518>)
- **Affected component or flow:** Processing lifecycle and unsaved result
- **Evidence:** The specification requires screen wake lock and unload protection. No implementation was found.
- **Current behaviour:** Sleep, reload, or navigation can destroy a long job without a contextual warning.
- **Why it matters:** Processing may consume tens of minutes on slower devices.
- **Realistic scenario:** A laptop sleeps during a one-hour encode; scratch is later swept, but the user loses all elapsed work.
- **Existing mitigation:** Progress, cancellation, OPFS cleanup, and bounded recovery.
- **Recommended change:** Acquire/release and visibility-reacquire a wake lock; attach `beforeunload` only while processing or holding an unsaved output. Wake lock availability is platform-dependent; [MDN documents the visibility lifecycle](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API). `beforeunload` is also unreliable on some mobile paths and should remain conditional, as [MDN cautions](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event).
- **Illustrative patch or implementation outline:** Not applied.
- **Tests to add or amend:** Stubbed wake-lock lifecycle, rejection, visibility change, unload handler registration, manual sleep/reload.
- **Validation approach:** Real laptops and mobile browsers.
- **Estimated effort:** Medium
- **Implementation risk:** Low
- **Dependencies or sequencing:** Near term; independent.

### R-13 The release boundary lacks least privilege and a strict public-media allowlist

- **Severity:** Medium
- **Confidence:** High
- **Classification:** Strongly supported risk
- **Category:** Supply chain / privacy
- **Location:** [.github/workflows/deploy-pages.yml](<<checkout>/.github/workflows/deploy-pages.yml:19>), [scripts/check-placeholders.mjs](<<checkout>/scripts/check-placeholders.mjs:73>)
- **Affected component or flow:** CI build/deploy and Vite public-directory publication
- **Evidence:** Pages/OIDC permissions are granted at workflow scope, so build and dependency-install steps inherit them. Actions use mutable major tags rather than full commit SHAs. The media guard rejects recordings only under `public/spike`; a misplaced real recording elsewhere under `public/` would be copied into the deployment.
- **Current behaviour:** No current media leak or CI exploit was found, but the preventions are weaker than the repository’s privacy promise.
- **Why it matters:** Public deployment and privileged CI are high-consequence boundaries.
- **Realistic scenario:** A sample is accidentally committed under a different public subdirectory, or a compromised mutable action tag executes with deploy permissions.
- **Existing mitigation:** Current public inventory contains only expected branding media; lockfile integrities are present; secrets scan passed.
- **Recommended change:** Add an exact public-media allowlist; scope build permissions to `contents: read`; grant Pages/OIDC only to deploy; pin actions by full SHA with an update mechanism. GitHub recommends least-privilege permissions and full-length SHA pinning in its [Actions security guidance](https://docs.github.com/en/code-security/tutorials/secure-your-organization/protect-against-threats).
- **Illustrative patch or implementation outline:** Not applied.
- **Tests to add or amend:** Build failure on an unexpected public media file; workflow policy test for permission scope and immutable action refs.
- **Validation approach:** Static CI policy check and deployment inventory diff.
- **Estimated effort:** Medium
- **Implementation risk:** Low
- **Dependencies or sequencing:** Near term; does not require product-code changes.

### R-14 Progress semantics and “discourage” acknowledgement are incomplete

- **Severity:** Medium
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Accessibility / error prevention
- **Location:** [index.html](<<checkout>/index.html:107>), [src/main.ts](<<checkout>/src/main.ts:452>)
- **Affected component or flow:** Processing progress and preflight warning state
- **Evidence:** The progress element has no accessible name. A non-blocking “discourage” verdict exposes Create directly even though the specification calls for acknowledgement.
- **Current behaviour:** Assistive technology may announce an unnamed progressbar; a consequential warning can be bypassed by a routine click.
- **Why it matters:** Both obscure current system state and weaken informed consent.
- **Realistic scenario:** A screen-reader user hears only a percentage with no task context, or starts a highly unsuitable job without acknowledging its warning.
- **Existing mitigation:** Semantic regions, fieldsets, visible labels, live status region, skip link, focus rings, contrast tests, 44 px targets, reduced motion, and sound mobile reflow.
- **Recommended change:** Add a stable accessible progress label and stage-specific description; introduce an explicit acknowledge action for discourage outcomes.
- **Illustrative patch or implementation outline:** Not applied.
- **Tests to add or amend:** Accessible-tree assertions, keyboard-only warning flow, live-region/stage announcements, screen-reader rehearsal.
- **Validation approach:** Axe or equivalent plus NVDA, VoiceOver, and TalkBack manual checks.
- **Estimated effort:** Small
- **Implementation risk:** Low
- **Dependencies or sequencing:** Can land independently.
- **Relevant standard or classification:** Probable WCAG 2.2 SC 4.1.2 issue for the unnamed progress control.

### R-15 Operational and documentation contracts have drifted

- **Severity:** Medium
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Documentation / operational correctness
- **Location:** [DEV-INFRASTRUCTURE.md](<<checkout>/DEV-INFRASTRUCTURE.md:262>), [.github/workflows/deploy-pages.yml](<<checkout>/.github/workflows/deploy-pages.yml:1>), [src/core/diagnostics.ts](<<checkout>/src/core/diagnostics.ts:22>), [src/main.ts](<<checkout>/src/main.ts:152>), [package.json](<<checkout>/package.json:1>)
- **Affected component or flow:** Quality gate, deployment, offline promise, diagnostics, version identity
- **Evidence:** Infrastructure documentation describes deployment as undecided/local while a Pages workflow deploys `main`. The offline-after-first-load promise has no service-worker/cache implementation. Production UI exposes the product version but not the full build identity described by infrastructure rules. Diagnostics omit several promised job/capability details. The quality gate is documented as non-mutating but includes `vite build`, which writes ignored `dist/`.
- **Current behaviour:** Maintainers and users can rely on contracts the implementation does not satisfy.
- **Why it matters:** Operational trust depends on accurate recovery, deployment, privacy, and version information.
- **Realistic scenario:** A maintainer expects a report-only gate but it rewrites generated output, or a user expects offline reuse after the browser evicts assets.
- **Existing mitigation:** Build identity exists in diagnostics, docs are structurally checked, and offline/deployment work is partly tracked in the backlog.
- **Recommended change:** Reconcile implementation and documentation deliberately. Protected specification changes must go through the doc-delta/sign-off process; implementation gaps should not be papered over by silently narrowing promises.
- **Illustrative patch or implementation outline:** Not applied.
- **Tests to add or amend:** Check-command write-set test; offline reload; production version/build display; diagnostics schema/redaction; deployment-doc consistency.
- **Validation approach:** Clean temporary checkout before/after snapshots plus deployed-site rehearsal.
- **Estimated effort:** Medium
- **Implementation risk:** Low
- **Dependencies or sequencing:** Coordinate with VH-14 and protected-document ownership.

### R-16 Loudness-analysis retention grows linearly with duration

- **Severity:** Low
- **Confidence:** High
- **Classification:** Confirmed defect
- **Category:** Performance / documentation accuracy
- **Location:** [src/audio/loudness.ts](<<checkout>/src/audio/loudness.ts:154>), [src/media/audio-plan.ts](<<checkout>/src/media/audio-plan.ts:30>)
- **Affected component or flow:** Pass-A analysis retained through encoding
- **Evidence:** Block energy, block loudness, momentary, and short-term arrays accumulate with duration. Curves are retained at approximately 100 Hz despite 100 ms interface commentary.
- **Current behaviour:** A one-hour stereo input retains roughly 828,000 JavaScript numbers—at least about 6.6 MB before array overhead.
- **Why it matters:** It is not whole-file buffering, but it contradicts the “few hundred kilobytes” comment and bounded-state aspiration.
- **Realistic scenario:** Long files on low-memory devices add unnecessary pressure alongside decoder and encoder resources.
- **Existing mitigation:** PCM/video frames remain streaming and bounded; current documented one-hour scope keeps this moderate.
- **Recommended change:** Add a runtime-retention mode with only required 10 Hz/LRA/maxima data, and release curves once warnings/envelopes are derived.
- **Illustrative patch or implementation outline:** Not applied.
- **Tests to add or amend:** Retained-element count by duration and equivalence of final metrics.
- **Validation approach:** Heap profiling on 5-, 20-, and 60-minute files.
- **Estimated effort:** Medium
- **Implementation risk:** Medium
- **Dependencies or sequencing:** Optional until correctness work is complete.

## 7. Root-cause themes

| Theme | Connected findings | Structural response |
|---|---|---|
| Internal plans are treated as proof of final output | R-01, R-04, R-06, R-11 | Define executable postconditions on the finalized MP4 and make success contingent on them |
| Boundary conditions are under-tested | R-02, R-03, R-07, R-10, R-11 | Add start/EOF/cancel/finalize/save boundary fixtures before expanding happy-path coverage |
| Mutable asynchronous state lacks ownership | R-04, R-05, R-07 | Model accepted job, active operation, finished result, and save lease as explicit immutable states |
| Filesystem coordination is split across observations and mutations | R-04, R-08 | Hold ownership through the entire critical operation: write, validate, read, save, delete |
| Source interpretation is not single-sourced | R-03, R-06, R-09 | Reuse exact selected tracks, encoder configuration, and timebase across inspection, validation, processing, and diagnostics |
| Synthetic acceptance is too forgiving | R-01, R-02, R-07, R-11 | Add representative real/high-crest material and make missing evidence fail closed |
| Documentation runs ahead of implementation | R-12, R-14, R-15 | Add contract tests and reconcile protected claims through the established sign-off process |
| Resource limits are treated mainly as capacity estimates | R-07, R-12, R-16 | Test lifecycle survival and retained resources, not only estimated runtime/storage |

The highest leverage structural improvement is a small job/result state model that owns an immutable accepted job and a leased output. It would address significant parts of R-04, R-05, and R-07 without requiring a broad rewrite.

## 8. Positive findings

- The one-way conveyor model is consistently reflected in the main architecture; technical options are not exposed as “advanced” settings.
- Source files are passed as local `Blob` objects and never opened for writing.
- Production source inspection found no analytics, beacon, upload, WebSocket, or outbound request carrying source media or characteristics.
- All reviewed Mediabunny outputs specify `fastStart: false`; no implicit or explicit in-memory output mode was found.
- Audio and video lanes run concurrently, respect backpressure, and settle sibling work after failure.
- Source loudness is measured before branding joins the timeline.
- The DSP implementation is pure TypeScript over `Float32Array`, allowing Node-based standards tests.
- K-weighting and ordinary 44.1/48 kHz integrated gating are well structured and extensively tested.
- The typed worker protocol distinguishes request-correlated terminal responses from droppable progress.
- OPFS workspaces have per-session prefixes, centralized handle cleanup, idempotent disposal, and fail-independent orphan deletion.
- Subtitle and chapter limitations are disclosed before processing; supplied VTT cue content is preserved while timing is shifted.
- Structured logging is bounded, copied diagnostics are redacted, and global error hooks exist.
- User-controlled text is rendered through safe text APIs; no material DOM injection path was found.
- UI code includes landmarks, fieldsets, labels, a skip link, status announcements, strong focus treatment, AAA-oriented contrast tests, reduced-motion handling, and 44 px targets.
- TypeScript is strict, lint runs with zero warnings, the lockfile has integrity hashes, and there is only one declared runtime dependency.
- The acceptance harness uses real WebCodecs and OPFS rather than mocked encoders.
- The repository has a documented one-command runtime and quality model, even though the non-mutating quality-gate detail needs correction.

## 9. Test-gap analysis

| Behaviour | Risk and current coverage | Proposed level/scenarios | Fixture/infrastructure | CI? | Priority |
|---|---|---|---|---:|---:|
| Final decoded audio contract | Synthetic corpus missed a real failure | Browser integration: high-crest 44.1/48 kHz, AAC matrix, hard postconditions | Small licence-safe speech fixtures | Engine CI where WebCodecs exists | Immediate |
| EOF true peak | Sustained/faded tones only | Unit/property: every final FIR position and chunk split | Generated impulses | Yes | Immediate |
| Source onset and timestamp gaps | Markers begin at one second | Integration: t=0 impulse, non-zero offset, internal gap, sample conservation | Generated A/V fixture | Yes/browser | Immediate |
| Partial writes/output verification | Normal OPFS only | Unit fault injection: short writes, malformed MP4, missing expected track | Fake sync handle/corrupt fixture | Yes | Immediate |
| Save lifetime/source overwrite | Filename-only unit tests | Browser: slow picker, early discard, large download, same-entry destination | Multi-GB sparse/generated file | Manual/engine CI | Immediate |
| File/preset ordering | Pure verdict only | Coordinator tests with controllable deferred replies | Fake worker transport | Yes | Immediate |
| Cancellation phase coverage | One fixed mid-encode cancel | Barriers at yield, cleanup, finalize, verification and save | Injected hooks plus browser | Mostly | Immediate |
| OPFS lock atomicity | Sequential sweep tests | Deterministic lock scheduler and two-tab stress | Injectable Web Lock layer | Unit + browser | Near |
| Multi-track behaviour | No representative multi-A/V fixture | Contract/E2E for defaults, language, alternate angle, unsupported codec | MP4/WebM/MKV generators | Yes/browser | Immediate |
| LRA tail and pause freeze | Common speech patterns only | Protected unit tests and official Tech 3342 cases | Checksum-pinned official/generated files | Yes if licensing permits | Near |
| Acceptance self-verification | Missing audio/resource warnings can pass | Meta-tests proving each criterion fails on an injected defect | Controlled broken outputs | Yes/browser | Near |
| Cross-engine support | Current run only in Chromium | Safari/Firefox/Chrome acceptance matrix | Real devices or hosted runners | Partly | Near |
| Accessibility | Contrast and layout strong; no AT | Automated tree plus keyboard, VoiceOver, NVDA, TalkBack | Browser/AT matrix | Automation plus manual | Near |
| Sleep/reload/recovery | Not implemented | Wake/visibility/unload unit tests and real sleep rehearsal | Laptop/mobile | Partly | Near |
| Long-file performance | No current device matrix | Heap/CPU/OPFS profiling for 5, 20, 60 minutes | Representative 1080p/4K/VFR/HDR | Usually manual | Medium |
| Public-media privacy guard | Only `public/spike` protected | Static negative test with unexpected public media | Tiny dummy media file | Yes | Near |
| Official compliance evidence | Authentic EBU programme cases skipped | Checksum/provenance workflow and official cases | EBU/ITU material | Subject to distribution rights | Medium |

## 10. Dependency and supply-chain assessment

- [package.json](<<checkout>/package.json>) declares one runtime dependency: Mediabunny 1.55.2.
- `package-lock.json` is lockfile version 3. Registry tarballs have integrity values; no Git dependencies or unpinned direct runtime dependency were found.
- The isolated install resolved 243 package entries without running lifecycle scripts. The only detected install script belonged to optional `fsevents`.
- Both full and production-only npm audits reported zero known vulnerabilities.
- No deprecated package metadata or missing dependency licence metadata was observed.
- Observed dependency licences were permissive or weak-copyleft licences normally compatible with web-tool distribution, including MIT, ISC, BSD, Apache-2.0, MPL-2.0, BlueOak and Python-2.0. This is a technical inventory, not legal advice.
- Package metadata says MIT, but no root `LICENSE` file was found. Add the intended licence text or correct the metadata.
- Branding assets should have a distinct provenance/usage notice because institutional artwork rights are separate from source-code licensing.
- TypeScript 7.0.2 was newer than the pinned/wanted 6.0.3. The current version passes; upgrade only after Vite/ESLint/type-definition compatibility is confirmed. Existing VH-28 work already represents the ecosystem-upgrade dependency.
- No Dependabot/Renovate-style update configuration was found.
- CI actions should be full-SHA pinned and updated automatically; job permissions should be reduced as described in R-13.
- Public source maps are produced. Given the public repository this is not a source-secrecy issue, but deployment should confirm that this is intentional.
- No package replacement or new runtime dependency is justified by this review.

## 11. Security and privacy assessment

The application’s attack surface is relatively narrow because it is static and has no accounts or server-side state.

- **Authentication, authorisation, tenants:** Not applicable. There is no privileged in-app user role.
- **Primary untrusted input:** User-selected media and optional sidecar content. Parsing occurs in browser/Mediabunny/WebCodecs.
- **Source handling:** Local, read-only `Blob`; no source upload.
- **Network:** Production source contains only scoped inbound branding fetches. Static inspection and the observed browser run found no source-media, filename, or media-characteristic egress.
- **Storage:** Source remains in browser memory/file handles; output uses job-scoped OPFS until saved or discarded.
- **Retention:** Normal success/error/cancel cleanup exists, but R-04/R-07/R-08 show lifetime and concurrency gaps. Crashed tabs can leave scratch until sweep.
- **Logging:** Structured, bounded, and redacted by default. No live secrets were found.
- **Third parties:** Static host/CDN, browser codecs, npm/GitHub Actions, and Mediabunny. There is no analytics processor in source.
- **Output handling:** The most serious misuse path is choosing the original source as the save destination. An OS prompt is mitigation but does not enforce the invariant.
- **CI exposure:** Workflow-wide Pages/OIDC permissions and mutable action tags increase supply-chain consequence.
- **Accidental publication:** Vite publishes `public/`; the current guard is not a complete institutional-media allowlist.
- **XSS:** No material path was identified; user-facing dynamic strings use safe DOM text operations.
- **Secrets:** Placeholder scan passed and no live credential was identified. External hosting/repository secrets were not accessible.
- **Security headers:** No conclusion can be reached without inspecting the deployed response. CSP, COOP/COEP, Referrer-Policy and Permissions-Policy should be verified on the real origin rather than inferred from source.
- **Compliance:** The implementation supports data minimisation and local processing, but this review does not assert GDPR, institutional-policy, or security-standard compliance.

Required manual security work is limited but should include malformed-media fuzzing, deployed-header inspection, CI/repository permission review, object-URL/save abuse paths, and confirmation that public assets contain no personal recordings.

## 12. Accessibility and user-facing assessment

Observed strengths:

- Meaningful page landmarks, fieldsets and labels
- Skip link
- Visible focus styles
- Status/live-region support
- Carbon-derived token system
- Automated contrast tests
- Minimum 44×44 px targets
- Reduced-motion handling
- No 390 px horizontal overflow
- Clear conveyor-style hierarchy rather than an editor interface

Material issues:

- The progressbar lacks a programmatic accessible name.
- “Discourage” preflight outcomes do not require acknowledgement.
- Current branding choices are not yet enabled, so the final three-choice workflow cannot be evaluated end-to-end.
- Browser acceptance still leaves playback, subjective audio quality, slide legibility, and wording as manual.
- The application has no implemented offline recovery despite documentation implying offline-after-first-load behaviour.
- Long jobs lack sleep/reload protection.
- Screen-reader announcements for changing stages and percentages have not been tested and could be either insufficient or overly chatty.
- No VoiceOver, NVDA, TalkBack, voice-control, high-zoom, forced-colours, or keyboard-only end-to-end rehearsal was performed.

The demonstrated issue is a probable WCAG 2.2 SC 4.1.2 failure. Broader WCAG conformance cannot be concluded from code and automated tests alone.

## 13. Architecture and maintainability assessment

The architecture is appropriate for the product and does not need a rewrite.

Strengths:

- Main thread, worker boundary, pipeline, DSP, configuration and UI are separated coherently.
- Four immutable conceptual data objects avoid a global mutable job blob.
- Direct composition inside the worker is simpler than an unnecessary event bus.
- Load-bearing values reside primarily in `src/config/`.
- Runtime dependency count is intentionally small.
- DSP is pure and testable outside a browser.
- Media paths stream and apply backpressure.
- Diagnostics are centralized rather than scattered `console.log` calls.

Hot spots:

- `src/main.ts` owns asynchronous request coordination and mutable UI/job references without a generation model.
- `job.worker.ts` combines request routing, result ownership, cancellation, processing and post-output verification.
- OPFS ownership is implicit across worker/main/save layers.
- Inspection, preflight, calibration and runtime encoding do not share one exact track/configuration object.
- The acceptance page reports some externally run or manual criteria as though they were locally proved.
- Protected DSP boundary semantics are distributed among detector, limiter, analyser and acceptance cropping.

Recommended structural improvements:

1. Introduce a small immutable `AcceptedJob` containing file identity, selected tracks, preset, exact encoder candidates, capability verdict and epoch.
2. Model output state as `processing → verifying → ready(leaseable) → saving → discarded`.
3. Centralize processing-track selection and encoder-candidate creation.
4. Define explicit `finish()` semantics for stateful DSP units.
5. Keep these targeted; do not introduce a generalized framework or global state machine library.

## 14. Performance and scalability assessment

Demonstrated evidence:

- The full synthetic browser acceptance run took 85.8 seconds on the review host.
- The output worker bundle is 435.77 kB uncompressed.
- One-hour analysis retains at least roughly 6.6 MB of numeric array payload before JavaScript-array overhead.
- Cancellation produced native sample-lifetime warnings.
- The pipeline does not buffer complete video/audio content and all output muxers avoid in-memory fast-start.

Likely bottlenecks:

- Browser video decode/encode is the dominant CPU/GPU cost.
- Three audio traversals add proportional I/O and decode cost.
- Post-output audio verification adds another potentially long traversal without granular heartbeat.
- Multiple unsuperseded preflights can contend within one worker.
- Large OPFS writes are sensitive to quota and partial-write behaviour.
- Long files add analysis arrays linearly.

Not demonstrated:

- Performance on Windows, managed University devices, integrated GPUs, Safari or Firefox
- 4K60/HDR throughput
- One-hour reliability
- Memory peaks during branding transition composition
- OPFS quota behaviour near exhaustion
- Thermal throttling or battery impact

Safe optimisation priorities are correctness first, cancellation/resource closure second, then retention reduction. Avoid speculative parallelism: video and audio lanes already run concurrently, and more encoder concurrency could worsen device pressure.

Recommended profiling:

- 5-, 20-, and 60-minute 1080p and 4K inputs
- CFR/VFR, 30/60 fps, mono/stereo/5.1, 44.1/48 kHz
- Heap snapshots after each audio pass
- Native sample counts during repeated cancellation
- OPFS throughput/quota curves
- Stage timings and long-phase heartbeat gaps

## 15. Documentation assessment

| Document/section | Problem | Proposed change |
|---|---|---|
| [DEV-INFRASTRUCTURE.md — Quality gate](<<checkout>/DEV-INFRASTRUCTURE.md:262>) | Says the gate is non-mutating, while `npm run check` invokes Vite build and writes `dist/` | Either build into a temporary directory during `check`, or document/approve the generated-output write |
| [DEV-INFRASTRUCTURE.md — Deployment](<<checkout>/DEV-INFRASTRUCTURE.md:379>) | Describes deployment as undecided/local while GitHub Pages deploys `main` | Document the actual pilot deployment, permissions, rollback and verification |
| [docs/01-specification.md](<<checkout>/docs/01-specification.md>) / brief | Offline-after-first-load behaviour is not implemented | Implement VH-14 or capture a protected-doc reconciliation proposal |
| DEV infrastructure version section | Promises product version and build identity in production | Expose both consistently in UI/diagnostics or narrow the documented UI promise |
| DEV infrastructure diagnostics section | Describes capability, source and job details absent from copied diagnostics | Add a redacted schema-aligned summary and tests |
| Audio source comments | “Few hundred kilobytes” understates retained one-hour state | Correct after deciding the runtime retention mode |
| Acceptance criterion 3 | UI labels EBU compliance as passed without executing all official cases | Report partial/external/manual status until authentic material runs |
| Root legal documentation | Package metadata says MIT but no `LICENSE` exists | Add the intended licence and separate branding-asset provenance notice |
| Operational guidance | No browser-specific save, wake lock, storage quota or large-job troubleshooting | Add after the related implementation is stable |

Protected specification and rationale files should not be edited as ordinary implementation documentation. Any factual correction belongs in the established doc-delta/sign-off batch.

## 16. Suggested change set

No change below was applied.

| Change group | Objective and findings | Proposed files/work | Tests and acceptance | Effort/risk |
|---|---|---|---|---|
| A. Finish DSP correctly | R-01, R-02, R-10 | Add explicit true-peak/limiter finalization; perform complete-chain gain calibration; enforce decoded-output criteria; add LRA tail and strict pause hold | EOF FIR matrix, official DSP material, real high-crest encoded output within both limits | Large / High |
| B. Preserve source content | R-03, R-09 | Carry source audio timestamps/gaps; replace destructive AAC shift; centralize primary-track selection; block or warn on extra A/V tracks | t=0 sample conservation, gaps, multi-track fixtures, cross-browser sync | Large / High |
| C. Transactional output ownership | R-04, R-08 | Implement write-all; hard output postconditions; `ResultLease`; exclusive save state; same-entry protection; atomic lock/delete sections | Short-write, corrupt output, slow save, multi-tab race, byte equality | Large / High |
| D. Immutable request lifecycle | R-05, R-06, R-07 | Add selection epoch and `AcceptedJob`; derive exact encoder candidates once; controllers for every request; commit-boundary abort checks; close samples in ownership `finally` | Out-of-order replies, unsupported prerequisites, cancellation barriers, no late UI updates | Large / High |
| E. Make acceptance capable of refuting the product | R-11 | Measure full-output peaks; require expected audio; fail resource warnings; represent partial/manual criteria honestly; add real-material corpus | Each injected defect must make the relevant criterion fail | Medium / Medium |
| F. Complete user/operational protections | R-12, R-14, R-15 | Wake lock, conditional unload warning, progress naming, discourage acknowledgement, diagnostics/version alignment, non-mutating check implementation | Accessibility tree, sleep/reload, clean-tree snapshots, production bundle identity | Medium / Low–medium |
| G. Harden release inputs | R-13 | Narrow CI permissions, pin actions, add public-media allowlist, add licence/provenance files | Workflow policy and negative publication tests | Medium / Low |
| H. Reduce retained analysis state | R-16 | Runtime retention mode and early curve release | Metric equivalence and heap/element-count limits | Medium / Medium |

Rollout should use small, separately reviewable commits. Protected DSP and OPFS concurrency changes should not be combined. Each group should retain a straightforward Git rollback and should not require stored-data migration because OPFS is scratch state.

## 17. Prioritised remediation roadmap

### Immediate

| Item | Benefit / risk if deferred | Prerequisites | Effort / risk | Owner | Verification |
|---|---|---|---|---|---|
| R-02 EOF true-peak repair | Removes a demonstrated hard-ceiling violation | None | M / High | DSP engineer | Final-position impulse matrix and protected suite |
| R-01 full-chain audio acceptance | Makes the core output promise honest | R-02 | L / High | DSP + media engineer | Decoded real corpus within ±0.5 LU and ≤−2 dBTP |
| R-04 output transaction | Prevents corrupt, truncated, prematurely deleted, or source-overwriting outputs | None | L / Medium | Browser storage engineer | Fault injection and large-save byte comparison |
| R-03 onset/timeline preservation | Stops silent deletion and sync distortion | Encoder/container timing decision | L / High | Media engineer | t=0 conservation and full-duration sync |
| R-05/R-06 immutable exact preflight | Prevents the wrong or unsupported job from starting | Shared candidate design | M / Medium | UI/worker engineer | Deferred-response and exact-config browser tests |
| R-07 authoritative cancellation | Makes cancel trustworthy and closes native resources | Result ownership clarified | M / High | Worker/media engineer | Every phase returns only cancelled and leaks nothing |
| R-09 multi-track protection | Prevents silent loss | Product decision: block versus preserve | M / Medium | Product + media | Multi-track warning/block acceptance |

These are release blockers for general production. A narrowly controlled single-track pilot would still need R-01 through R-07 addressed or explicitly disabled behind a non-production gate.

### Near term

| Item | Benefit / risk if deferred | Prerequisites | Effort / risk | Owner | Verification |
|---|---|---|---|---|---|
| R-08 atomic OPFS locks | Removes rare live-workspace deletion | Deterministic lock abstraction | M / High | Storage/concurrency | Two-tab stress and barrier tests |
| R-10 LRA/pause semantics | Corrects protected analysis and macro behaviour | DSP baseline stable | M / High | DSP engineer | Tech 3342 plus pause fixture |
| R-11 acceptance hardening | Prevents future green false positives | Product fixes landed | M / Medium | Test engineer | Mutation/injected-defect checks |
| R-12 long-job controls | Protects elapsed processing work | Stable lifecycle state | M / Low | UI/platform engineer | Sleep, visibility and unload rehearsal |
| R-13 release hardening | Reduces CI and publication consequence | None | M / Low | DevOps/security | Workflow policy and deploy inventory |
| R-14 accessible progress/acknowledgement | Improves state clarity and error prevention | None | S / Low | UI/accessibility | AT and keyboard run |

### Medium term

| Item | Benefit / risk if deferred | Prerequisites | Effort / risk | Owner | Verification |
|---|---|---|---|---|---|
| R-15 contract reconciliation | Restores operational/documentation trust | Relevant implementation decisions | M / Low | Maintainer + technical writer | Clean-check, offline, version and diagnostics rehearsal |
| Cross-engine matrix | Establishes actual browser support | Stable output pipeline | M / Medium | QA | Chrome/Firefox/Safari acceptance |
| Official EBU/ITU corpus | Strengthens compliance evidence | Licensing/cache workflow | M / Medium | DSP/QA | Checksummed official cases |
| Long-file/device capacity matrix | Establishes honest estimates and limits | Stable lifecycle | L / Low | Performance QA | 5/20/60-minute device report |
| Channel-layout/sample-rate spike | Avoids false multichannel claims | Representative fixtures | M / Medium | DSP/media | Isolated-channel 5.1 and 22.05 kHz cases |

### Optional

| Item | Benefit / risk if deferred | Prerequisites | Effort / risk | Owner | Verification |
|---|---|---|---|---|---|
| R-16 analysis retention reduction | Lowers long-file heap pressure | Correct metrics stabilized | M / Medium | DSP/performance | Heap and equivalence tests |
| Dormant closing-transition repairs | Prevents opaque-gradient sampling and decode-fallback defects when re-enabled | Approved branding/UI milestone | S–M / Medium | Media/UI | Gradient scaling and corrupt-onset fallback |
| Automated dependency updates | Keeps pinned actions/tooling current | Review policy | S / Low | DevOps | Update PR checks |
| Additional malformed-media fuzzing | Improves parser resilience | Stable supported-format policy | M / Medium | Security/QA | Hermetic fuzz corpus |

## 18. Unresolved uncertainties

| Unknown | Evidence inspected and safest assumption | Why it matters / verification | Dependent findings |
|---|---|---|---|
| Safari/Firefox WebCodecs, OPFS and save behaviour | Source and Chromium were inspected; do not assume parity | Run full acceptance and save/cancel cases on supported versions | R-03, R-04, R-06, R-07 |
| Exact fallback-download failure mode after OPFS deletion | Standards and lifetime sequence strongly support risk; manifestation is browser-dependent | Large-file early-discard byte comparison | R-04 |
| Frequency of the Web Lock interleaving | Race exists in source, but was not reproduced live | Deterministic barriers and long two-tab stress | R-08 |
| Actual Mediabunny encoder candidate across engines | Relevant library source sampled; candidates can vary by engine/input | Capture and compare runtime candidate to probed config | R-06 |
| Intended treatment of multiple A/V tracks | Specification demands visible warning for loss but does not define full preservation | Product decision followed by multi-track fixtures | R-09 |
| Complete EBU accuracy | Current synthetic/common cases pass; authentic programme cases were not run | Checksum-pinned official test set and BS.2217 coverage | R-01, R-10, R-11 |
| Multichannel layout semantics | Channel count is available, semantic labels are not clearly carried | Isolated-channel 5.1/7.1 AAC fixtures | Audio support claim |
| 22.05 kHz block timing | Current common 44.1/48 kHz paths are exact; rounded-hop behaviour may differ | Generate reference signals at uncommon rates | Audio support claim |
| Production hosting headers/permissions | Workflow is visible; deployed response and GitHub settings are not | Inspect real Pages headers, environments, permissions and branch protection | R-13, security assessment |
| Branding licences and approved masters | Binary inventory exists; legal provenance was not available | Institutional confirmation and committed notice | Supply-chain assessment |
| Final branding workflow | Current choices are disabled/dormant | Stakeholder approval plus end-to-end branded acceptance | Production readiness |

## 19. Manual verification checklist

- [ ] Run the repaired output pipeline on a representative University corpus: quiet/hot speech, music, slides, VFR, 44.1/48 kHz, mono/stereo, immediate speech onset, long silence, and EOF transient.
- [ ] Confirm loudness and true peak independently with a trusted meter.
- [ ] Listen for pumping, consonant loss, clicks, clipping, transition artefacts, and branding-level mismatch.
- [ ] Inspect output in Chrome, Firefox, Safari, VLC, QuickTime and EchoVideo.
- [ ] Run 5-, 20-, and 60-minute jobs on representative managed Windows/macOS hardware.
- [ ] Cancel during every stage, including cleanup, finalization, verification and saving.
- [ ] Repeatedly exercise two-tab OPFS creation/sweep interleavings.
- [ ] Save a multi-gigabyte result through both picker and fallback download; byte-compare after early lifecycle events.
- [ ] Attempt to save over the source and confirm it is blocked.
- [ ] Force sleep, visibility changes, reload, navigation, browser crash and tab close.
- [ ] Exercise low disk quota and denied filesystem permissions.
- [ ] Test multi-video/multi-audio files and confirm all loss is disclosed before processing.
- [ ] Run VoiceOver, NVDA and TalkBack; verify keyboard-only flow, announcements, focus recovery, 200–400% zoom and forced colours.
- [ ] Verify deployed CSP and other security headers, GitHub Actions permissions, environment approvals and branch protections.
- [ ] Inspect the final public deployment inventory for recordings, source filenames, debug artefacts and unexpected media.
- [ ] Run checksum-pinned official EBU/ITU material where licensing permits.
- [ ] Confirm branding masters, wording, licences and opening/closing interaction with institutional stakeholders.
- [ ] Verify production diagnostics contain product/build identity and no sensitive media information.

## 20. Handover summary

The five most important findings are:

1. A real output missed both loudness and true-peak requirements while being reported as successful.
2. EOF true-peak detection and limiting can miss a final transient completely.
3. Audio timing reconstruction and AAC compensation can delete source onset and collapse gaps.
4. OPFS writes, output verification, saving and deletion do not form a safe ownership transaction.
5. Mutable asynchronous preflight/cancellation state can run the wrong, unsupported, or supposedly cancelled job.

The five most valuable proposed changes are:

1. Add correct DSP finalization and full-chain encoded-output acceptance.
2. Preserve source timestamps and every source sample.
3. Add write-all semantics, hard output postconditions and a result lease.
4. Introduce an immutable epoch-bound `AcceptedJob`.
5. Make cancellation and sample ownership authoritative across every phase.

General-production release blockers are R-01 through R-07 and R-09. R-08 should also be resolved before multi-tab use is relied upon. Current disabled branding choices are a separate feature-completeness gate.

After implementation, another developer should run:

```bash
npm ci
npm run check
npm audit
npm run dev
```

They should then open `/acceptance.html` on the documented local server and complete the browser/manual checklist above. Because `npm run check` currently writes ignored `dist/`, clean-tree immutability should either be tested in a temporary checkout or repaired as part of R-15.

No illustrative patch or suggested edit was applied. No branch, commit, remote, issue, pull request, deployment, database, credential, or external system was modified. The original repository remained on `main` at `66227e51dc0905c1853d79fb927d8f009be80ad4`, with no tracked or staged changes and the same pre-existing untracked review file.

<!-- FILE: reviews/2026-08-26/uon-video-helper-internal-code-review-2026-08-26.md -->

# Full code review — 2026-08-26

- **Baseline:** `66227e51dc0905c1853d79fb927d8f009be80ad4` (`main`, clean before review)
- **Review outcome:** **Needs changes — not ready for a real-user pilot**
- **Change boundary:** Report only. No application code, protected specification, backlog, ticket, or decision-log file was changed.

## Executive summary

The app has a disciplined architecture, unusually good invariant-oriented tests, explicit streaming mux configuration, one runtime dependency, and a green canonical quality gate. Those strengths do not yet make it safe to give real recordings to users.

The review found no P0 issue and no current evidence of media egress, a committed secret, or a vulnerable installed dependency. It did find several P1 paths that can produce an incorrect file, lose a finished file, process a different file from the one shown, approve a job that cannot run, or falsely certify a safety invariant. The most important novel defect was reproduced directly: a full-scale transient at the end of a file leaves the limiter at **0 dBTP** while the app's own verifier reports about **−64.05 dBTP**. That violates the required −2 dBTP ceiling and can make both runtime and acceptance evidence look safe when it is not.

The active backlog also already contains a separate launch-blocking result, VH-50: real material measured −16.75 LUFS and −1.98 dBTP while the synthetic harness passed. Taken together, the novel P1 findings and VH-50 mean the current build should be treated as an engineering prototype, not as a trustworthy pilot build.

## Scope and method

The review covered every mapped repository area:

- root configuration and launch files, `.github/`, scripts, public branding assets, and deployment controls;
- all `src/audio/`, `src/config/`, `src/core/`, `src/media/`, `src/ui/`, `src/workers/`, `src/acceptance/`, and `src/spike/` code and colocated tests;
- `test/`, including the EBU Tech 3341 harness;
- the authoritative specification and rationale, the UI and development standards, the active backlog, current decisions, architecture, conventions, and file map;
- the installed Mediabunny source where the app depends on primary-track selection, track metadata, or generated encoder configuration.

The review used source tracing, adversarial state/lifecycle analysis, narrow executable reproductions, targeted suites, static egress/secret/dependency checks, branding-asset inspection with `ffprobe`, and the complete project gate. Real user recordings in `samples/` were not modified or used for new output. A rendered browser snapshot stalled and was abandoned; browser-dependent cases are therefore identified explicitly below rather than presented as verified.

Severity means:

- **P0:** immediate catastrophic loss/exposure on an ordinary path.
- **P1:** can corrupt or lose user work, violate a headline invariant, run the wrong job, or falsely pass a release-safety check.
- **P2:** material reliability, compatibility, accessibility, security-hardening, or maintainability defect without the same immediate impact.
- **P3:** bounded edge case, drift, or lower-impact contract gap.

Evidence labels used below are **reproduced**, **code-proven** (the control/data flow is deterministic), and **browser-dependent risk** (the faulty race or lifecycle exists, but final browser behaviour still needs a real-engine regression).

## P1 findings

### P1-01 — A terminal transient bypasses both the true-peak limiter and verifier

**Status:** Novel. **Evidence:** Reproduced.

The causal 4× FIR detects an input sample several frames after it arrives, but [`TruePeakDetector`](../../src/audio/truepeak.ts#L139) has no finish/post-roll operation and [`AudioAnalyser.finish()`](../../src/audio/analyse.ts#L44) reads it immediately. Separately, [`TruePeakLimiter.flush()`](../../src/audio/limiter.ts#L159) drains its look-ahead buffer at one fixed gain instead of clocking silence through the ordinary detector/gain path.

A 480-frame stream with a single `1.0` sample at EOF produced:

```json
{"latency":240,"samplePeak":1,"truePeakWithoutPostroll":-64.05359209046344,"truePeakWithPostroll":0,"tailFinalSample":1}
```

The emitted final sample is therefore 0 dBTP, 2 dB above the ceiling, while the unfinalized verifier reports it as approximately −64.05 dBTP. Existing true-peak and limiter tests place energy away from EOF or repeat the same unfinalized measurement blind spot.

**Required change:** Add a detector finalization/post-roll path; make limiter flush advance normal detection and gain state while returning exactly the delayed source frames; add EOF-impulse and very-short-stream regressions; confirm one produced MP4 with an independent external true-peak meter.

### P1-02 — Source audio offsets and gaps are collapsed, causing A/V desynchronisation

**Status:** Novel. **Evidence:** Code-proven.

[`createContentAudioProcessor()`](../../src/media/audio-plan.ts#L147) generates timestamps from a contiguous `emittedFrames` counter and never reads the incoming [`AudioSample.timestamp`](../../src/media/audio-plan.ts#L186). The video lane, by contrast, preserves each frame's position relative to the first video timestamp in [`pipeline.ts`](../../src/media/pipeline.ts#L420).

An audio track that begins 500 ms after picture is moved to time zero; a genuine two-second midstream discontinuity is removed, making everything after it two seconds early. Analysis also concatenates the gap, so silence warnings and the macro envelope describe different timing from the source container. The acceptance sync meter has the same blind spot: audio markers use cumulative decoded frames in [`measure.ts`](../../src/acceptance/measure.ts#L119), while video markers use timestamps.

**Required change:** Establish one source timeline origin, retain audio timestamps, insert explicit silence for real gaps, and compensate only measured DSP/encoder latency. Add delayed-start and midstream-gap marker fixtures whose verifier also uses sample timestamps.

### P1-03 — Late inspection/preflight responses can arm Start for the wrong file or preset

**Status:** Novel. **Evidence:** Code-proven.

Every file change launches an uncancelled inspection followed by preflight in [`main.ts`](../../src/main.ts#L390). Preset changes launch another preflight in [`main.ts`](../../src/main.ts#L485). There is no selection epoch, current-request check, or atomic `{file, preset, verdict}` state. Any response that arrives last can call [`showProcessControls(file)`](../../src/main.ts#L641), even if the picker now displays another file. During a preset recheck, the old Start target also remains available.

Rapid A → B selection can therefore show B while Start still submits A. A slow old preset check can also approve Start after the user has chosen another preset. The subtitle reader has the same stale-completion shape in [`main.ts`](../../src/main.ts#L71).

**Required change:** Bind file, subtitle, preset, report, and verdict into one immutable selection generation; invalidate older request IDs; hide/disable Start while any relevant check is pending; ignore every stale response. Add deterministic deferred-promise tests for A → B and rapid preset changes.

### P1-04 — Preflight can approve a job whose input cannot decode or whose workspace cannot exist

**Status:** Novel. **Evidence:** Code-proven.

Inspection records exact video/audio decode support in [`inspect.ts`](../../src/media/inspect.ts#L213), and capability inspection records OPFS and secure-context support in [`capability.ts`](../../src/media/capability.ts#L28). None of those fields enter [`PreflightInput`](../../src/media/preflight.ts#L35) or the verdict assembled in [`job.worker.ts`](../../src/workers/job.worker.ts#L340). A decode failure during the calibration probe is also collapsed to “unmeasured” in [`probe.ts`](../../src/media/probe.ts#L189), which becomes only a warning.

An unsupported source codec, unavailable OPFS, or insecure context can therefore reach a visible Start button and fail only after expensive work begins. The source panel even promises that full guidance will arrive with preflight for video decode failure, but no such blocking reason exists.

**Required change:** Add exact audio/video decode, secure-context, and usable-OPFS gates; return structured probe failure causes so unsupported execution is a block and only an unreliable time estimate is a warning. Exercise each block in a real browser.

### P1-05 — The finished file's OPFS backing can be deleted before saving finishes

**Status:** Novel. **Evidence:** Browser-dependent risk supported by explicit local ownership contracts.

The fallback path clicks an object-URL download and returns immediately in [`save.ts`](../../src/media/save.ts#L59). The caller then discards the job workspace in [`main.ts`](../../src/main.ts#L681), although the worker protocol explicitly says the returned `File` becomes unreadable when that workspace is removed in [`protocol.ts`](../../src/workers/protocol.ts#L71). A multi-gigabyte Firefox/Safari download may still be reading after `anchor.click()` returns; the fixed 60-second URL lifetime is another unproved ceiling.

There is a second route to the same failure. Saving disables only the Save button, not job controls. Starting another encode calls [`releaseFinished()`](../../src/workers/job.worker.ts#L106), which can dispose the old workspace while a picker `pipeTo()` is still reading it.

**Required change:** Treat save as part of the job lifecycle. Keep the workspace until a streaming picker write has resolved; retain fallback downloads until an explicit later lifecycle point rather than a timer; prohibit a new job while save is active. Browser-test a throttled large download and a concurrent new-job attempt.

### P1-06 — The Save picker can overwrite the source despite the absolute “never modified” promise

**Status:** Novel. **Evidence:** Code-proven capability; destructive result requires a user to confirm the OS replacement prompt.

[`saveFile()`](../../src/media/save.ts#L33) accepts whatever handle the user chooses and immediately creates a writable stream. The app retains only the source filename, not its file-system handle, so it never uses `isSameEntry()` or another identity check. The test in [`save.test.ts`](../../src/media/save.test.ts#L27) proves only that the suggested string differs from the original; it does not prevent the user selecting the original file in the dialogue.

That makes the headline promise in the UI and [`README.md`](../../README.md#L80) false under an allowed application flow.

**Required change:** On supporting browsers, acquire and retain an input `FileSystemFileHandle` and reject a same-entry save; otherwise use a save path whose limitations are stated honestly. Add a fake-handle regression for `isSameEntry()` and a manual overwrite rehearsal.

### P1-07 — Cancel is not authoritative across the whole job

**Status:** Novel residual after VH-38/VH-51. **Evidence:** Code-proven.

The process controller is registered only after awaiting old-result cleanup in [`job.worker.ts`](../../src/workers/job.worker.ts#L121), while Cancel only looks in that map. A cancellation during slow cleanup is dropped. Later, the pipeline checks cancellation before `output.finalize()` but not after it in [`pipeline.ts`](../../src/media/pipeline.ts#L556). Finished-file verification then performs another full audio traversal without a signal and posts `processed` unconditionally in [`job.worker.ts`](../../src/workers/job.worker.ts#L174).

The user can press Cancel during cleanup, finalize, or verification and still receive “Your video is ready.” The current acceptance case cancels only during encode.

**Required change:** Register the controller before the first await, propagate the signal through fetch/finalize/verification where supported, and check it immediately before retaining or posting success. Test every named cancellation phase and assert both `cancelled` and an empty job directory.

### P1-08 — Additional A/V tracks and supported track metadata are silently lost

**Status:** Novel; embedded-subtitle extraction itself remains VH-29. **Evidence:** Code-proven.

Inspection describes the first video/audio entries in [`inspect.ts`](../../src/media/inspect.ts#L189), while production later chooses Mediabunny's primary tracks in [`pipeline.ts`](../../src/media/pipeline.ts#L224). Those are not guaranteed to be the same tracks. Only one output video and audio track is created, `reportedTrackCount` is unused as a gate, and language/name/disposition are not carried. File-metadata failure is logged but never shown to the user in [`pipeline.ts`](../../src/media/pipeline.ts#L321).

An OBS file with programme audio plus commentary can therefore be inspected against one track, processed from another, and silently lose the rest. This violates the explicit “warn before processing” rule for anything that cannot be carried.

**Required change:** Inspect the exact primary tracks the pipeline will use; enumerate every unsupported additional track before Start; carry language, name, disposition, and supported metadata; convert metadata-copy failure into a visible pre-processing warning where it is knowable. Add a multi-track fixture.

### P1-09 — OPFS orphan checking and deletion are not atomic

**Status:** Novel residual after shipped VH-35. **Evidence:** Code-proven race; needs a browser stress regression.

The sweep briefly asks for an available lock in [`opfs.ts`](../../src/media/opfs.ts#L58), releases it when the callback returns, and deletes the directory later in [`opfs.ts`](../../src/media/opfs.ts#L123). A new workspace creates its directory before claiming it in [`opfs.ts`](../../src/media/opfs.ts#L191); if the sweeper temporarily owns the lock, the claim logs a warning and continues unprotected.

A boot sweep can therefore classify a newly-created directory as free, release its test lock, allow the job to start, and then delete the live directory. The unit tests cover only selection, not lock/delete atomicity.

**Required change:** Acquire the job lock before creating/using the directory and perform orphan deletion while holding the same lock callback. Stress simultaneous tab boot/start in all supported engines.

### P1-10 — Long jobs have neither required wake protection nor unload protection

**Status:** Novel. **Evidence:** Code-proven absence.

The job lifecycle in [`main.ts`](../../src/main.ts#L551) only disables controls. There is no Screen Wake Lock or `beforeunload` handler anywhere in the runtime, despite both being explicit requirements in [spec §7.5](../../docs/01-specification.md#L361).

An accidental reload or a sleeping laptop can discard hours of work without warning.

**Required change:** Acquire/reacquire a screen wake lock while processing, release it on every exit path, and install/remove `beforeunload` for the exact in-flight interval. Test lifecycle cleanup and rehearse sleep/visibility/reload in real browsers.

### P1-11 — Acceptance criterion 9 can falsely certify “nothing leaves the device”

**Status:** Novel. **Evidence:** Code-proven safety-net gap; static scan found no current runtime upload.

[`EgressWatch`](../../src/acceptance/measure.ts#L200) wraps only main-global `fetch` and `sendBeacon`, while the actual job runs and fetches branding inside a Worker. It reads `init.body` but misses a body already stored in a `Request`, does not inspect XHR/WebSocket bodies, and treats same-origin requests as safe unless the wrapper saw a body. Resource timing reveals URLs, not payloads. [`run.ts`](../../src/acceptance/run.ts#L423) nevertheless turns those incomplete observations into a pass.

The current source scan found no runtime upload, analytics, beacon, XHR, or WebSocket path; the only runtime fetch is same-origin inbound branding. The defect is that a future regression could pass the headline release criterion.

**Required change:** Capture network activity at browser/protocol level for main thread and workers, fail on every outbound body regardless of origin, and separately reject filenames/media characteristics in URLs and headers. Add deliberate Request-body, worker-fetch, XHR, same-origin, and cross-origin negative controls that prove the harness fails.

## P2 findings

| ID | Finding | Evidence and required change |
| --- | --- | --- |
| P2-01 | Pause freeze is undone by centered smoothing | [`macrolevel.ts`](../../src/audio/macrolevel.ts#L72) freezes raw correction before a centred 15-second window, so future speech moves gain during a pause. Reproduction moved gain from −5 dB to −1.29 dB inside a middle pause and to +1.85 dB before leading-silence speech began. Freeze the final applied envelope during below-threshold regions and add leading/middle/trailing regressions. |
| P2-02 | Preflight does not validate the configuration production actually encodes | Preflight hard-codes `avc1.640033` in [`presets.ts`](../../src/config/presets.ts#L332), while production gives Mediabunny an abstract `codec: 'avc'` config in [`encoding.ts`](../../src/media/encoding.ts#L21). This can falsely block low shapes and miss a production-derived failure. It also promises 3840×2160@60 while Level 5.1 allows 983,040 macroblocks/s and that shape needs 1,944,000; the official [ITU-T H.264 Table A-1](https://www.itu.int/rec/dologin_pub.asp?id=T-REC-H.264-202408-I%21%21PDF-E&lang=e&type=items) requires Level 5.2's higher rate. Validate the exact final encoder config through one shared path and test 720p through 4K60 in real engines. |
| P2-03 | The runtime verifier does not enforce the true-peak ceiling | The worker measures `truePeakDbtp` but calls only the loudness warning and derives `onTarget` from loudness in [`job.worker.ts`](../../src/workers/job.worker.ts#L174). Verification failure is log-only. This reinforces active VH-50. Check both invariants, show a visible result warning if verification fails, and prevent a “verified” state when either measurement is unavailable. |
| P2-04 | The “measured” duration estimate omits substantial production work | [`probe.ts`](../../src/media/probe.ts#L135) uses a `NullTarget`, omits OPFS backpressure, compositing, DSP/encode detail, finalize, and the full output verification traversal, and arithmetically counts only two audio passes. Use bounded samples of the actual stages and separate audio/video durations. Keep separate from VH-31's size-estimate defect. |
| P2-05 | Fixed inspection/preflight deadlines do not actually cancel their work | [`main.ts`](../../src/main.ts#L250) posts cancel at 120/180 seconds, but [`job.worker.ts`](../../src/workers/job.worker.ts#L63) registers only process requests in the cancellable map. Timed-out inspection/preflight continues full analysis/probing and can overlap retries. Give all long worker requests an abort controller or selection-generation cancellation and move the tuneable limits into config. |
| P2-06 | Starting over silently destroys an unsaved result | The UI removes the old Save control when another job starts in [`main.ts`](../../src/main.ts#L562), and the worker disposes every retained result before the next process in [`job.worker.ts`](../../src/workers/job.worker.ts#L106). Require an explicit save/discard/start-over transition. |
| P2-07 | Cancellation acceptance bypasses the real product path | [`run.ts`](../../src/acceptance/run.ts#L348) cancels a main-thread pipeline helper, not the worker protocol or worker-only sync-handle path. Drive the real worker, post `cancel`, await `cancelled`, and inspect OPFS. |
| P2-08 | Acceptance criterion 3 is hard-coded green | [`run.ts`](../../src/acceptance/run.ts#L432) inserts a static historical pass for EBU conformance. The page can be green when the gate was not run or is failing. Execute the meter suite through a shared artifact/result, or report it as external/unverified rather than `pass`. |
| P2-09 | Production hides the traceable build identity | [`main.ts`](../../src/main.ts#L152) renders `BUILD_ID` only in development, contrary to [`DEV-INFRASTRUCTURE.md`](../../DEV-INFRASTRUCTURE.md#L355). Expose both product version and build identity in production. |
| P2-10 | Diagnostics omit required job context | [`diagnostics.ts`](../../src/core/diagnostics.ts#L22) has environment, errors, and logs but no redacted SourceReport shape, capability result, current view, or JobSpec. Add explicit snapshot inputs and redaction tests; never add filename or media payload. |
| P2-11 | Deployment credentials are granted to the dependency-running build job | Top-level `pages: write` and `id-token: write` in [`deploy-pages.yml`](../../.github/workflows/deploy-pages.yml#L19) apply to both jobs. Keep top-level/build at `contents: read` and grant Pages/OIDC only to `deploy`. |
| P2-12 | Cross-engine success counts include skipped engines | [`run-in-engines.mjs`](../../scripts/run-in-engines.mjs#L345) records missing engines as skipped, but its final count subtracts only failures. Report completed/skipped/failed independently and fail any workflow that explicitly required an unavailable engine. |
| P2-13 | A discouraged job needs no acknowledgement | Preflight shows Start for every non-block in [`main.ts`](../../src/main.ts#L452), while spec §7.3 says “allow continue after acknowledgement.” Add an explicit acknowledgement state for `discourage` outcomes without exposing technical settings. |
| P2-14 | The build guard can publish real media outside `public/spike/` | [`.gitignore`](../../.gitignore#L19) covers only `samples/`, MOV, and MKV, and [`check-placeholders.mjs`](../../scripts/check-placeholders.mjs#L73) scans only `public/spike/`. A copied MP4/WebM elsewhere under `public/` ships. Add an allow-list for known branding assets and reject every other media file in copied build inputs. |

## P3 findings

| ID | Finding | Evidence and required change |
| --- | --- | --- |
| P3-01 | Entirely silent audio does not trigger the extended-silence warning | [`warnings.ts`](../../src/audio/warnings.ts#L108) runs silence detection only when finite loudness exists; all-silence is all `-Infinity`. The three-second measurement window also understates a real gap. Evaluate silence outside the audible guard and test the actual analyser with 31-second and all-silent sources. |
| P3-02 | Tuneable values bypass `src/config/`, while declared config is dead | Examples include the clipping default in [`truepeak.ts`](../../src/audio/truepeak.ts#L100), noise-gap threshold in [`warnings.ts`](../../src/audio/warnings.ts#L16), detector/knee constants in [`compressor.ts`](../../src/audio/compressor.ts#L27), and envelope step in [`macrolevel.ts`](../../src/audio/macrolevel.ts#L30). `WARNING_THRESHOLDS.clippingDbtp` and `COMPRESSOR.softKnee` are not operative. Centralise project choices and test that config feeds runtime. |
| P3-03 | Limiter sample indices wrap on extremely long inputs | [`limiter.ts`](../../src/audio/limiter.ts#L29) stores an ever-growing sample position in `Int32Array`; it wraps after about 12.4 hours at 48 kHz and can make the expiry loop cycle forever. Use safe-number/`Float64Array` indices. |
| P3-04 | The native progress element has no accessible name | [`index.html`](../../index.html#L107) has neither a label nor `aria-label`/`aria-labelledby`. Associate it with the live stage/status text and verify name/value announcements with assistive technology. |
| P3-05 | Maintainer documentation and one generator have material drift | [`architecture.md`](../../pm_skills/project/architecture.md#L56) names nonexistent bus/store/sidecar/branding/UI modules and an obsolete protocol; [`DEV-INFRASTRUCTURE.md`](../../DEV-INFRASTRUCTURE.md#L377) says local-only while [`deploy-pages.yml`](../../.github/workflows/deploy-pages.yml#L14) deploys every push to `main`; [`gen-placeholder-branding.mjs`](../../scripts/gen-placeholder-branding.mjs#L38) still generates obsolete closing placeholders. Reconcile in the protected-doc/doc-sync workflow rather than silently editing here. |

## Already-tracked work confirmed by this review

These are not duplicate review findings and should keep their existing IDs:

| Item | Review conclusion |
| --- | --- |
| **VH-50** | Launch blocker. Real output already missed −16 LUFS and −2 dBTP while the synthetic harness passed. P2-03 and P1-01 reveal additional verifier blind spots, but do not replace the ticket's real-material result. |
| **VH-31** | Size estimates remain materially inaccurate; review additionally found a separate duration-estimate problem (P2-04). |
| **VH-49** | Exact AAC encode checking now blocks Firefox appropriately; supported-browser sign-off remains. |
| **VH-27** | Authentic EBU cases 7 and 8 remain explicitly skipped; the synthetic cases are not a substitute. |
| **VH-19** | Content-adaptive smaller-output bitrate remains required; no duplicate was opened. |
| **VH-25** | Picture boundary fades remain absent; audio boundary fades are present. |
| **VH-32 / VH-52** | The planned UI-quality and long-stage-legibility passes remain relevant. |
| **VH-17** | `fastStart: false` is explicit and safe from in-memory buffering; progressive-start reserve remains a measured follow-up. |
| **VH-23 / VH-46b** | Opening assets and hidden closing transitions remain deferred. Dormant paths should not be treated as user-ready. |
| **VH-26** | HDR/colour handling remains open. P2-02 adds a specific 4K60 AVC-level contradiction to consider in that compatibility work. |

## What is working well

- Every Mediabunny output sets `fastStart` explicitly; no runtime output path opts into whole-file in-memory muxing.
- The video/audio lanes are bounded, awaited for backpressure, mutually aborted, and disciplined about sample closure.
- Source-only loudness planning and branding-audio bypass are structurally separated.
- The loudness/DSP code is pure and Node-testable, with strong clause-level comments and good chunk-boundary coverage.
- Exact AAC configuration probing correctly catches Firefox's known refusal.
- CFR, shape, bitrate-basis, branding timeline, WebVTT offset, logger/redaction, and OPFS selection rules have meaningful invariant tests.
- The UI uses semantic labels/fieldsets, a skip link, a polite status region, visible word marks, tokenised focus treatment, and 44 px targets.
- User-derived UI content is written with `textContent`; the only `innerHTML` found is a fixed internal template.
- The runtime source scan found no analytics, upload, beacon, XHR, WebSocket, or media-characteristic egress. The one runtime fetch is same-origin inbound branding.
- There is one runtime dependency, `mediabunny`, as required.

## Verification record

### Canonical gate

`npm run check` passed at the reviewed baseline:

- placeholder/secret-shape guard: clean;
- TypeScript: passed;
- ESLint: passed with zero warnings;
- Vitest: **32 files; 355 passed, 1 skipped**;
- production build: passed;
- Markdown lint: passed;
- internal links: **62 files, 0 broken links**;
- memory structure: **0 structural failures**.

The memory checker reported five non-blocking warnings: backlog Active is over its word budget and VH-25, VH-31, VH-32, and VH-49 ticket files exceed their soft size guide. Those are maintenance signals, not reasons to prune review evidence automatically.

### Focused checks

- Audio/config/EBU: 13 files; **147 passed, 1 skipped**.
- Media: 12 files; **128 passed**.
- UI/core/acceptance-focused: 7 files; **80 passed**.
- Runtime dependency tree: only `mediabunny` plus its bundled type packages.
- `npm audit --omit=dev --json`: **0 vulnerabilities**.
- `npm audit --json`: **0 vulnerabilities across 243 installed dependencies**.
- `ffprobe`: all 16 shipped branding videos matched their wired codec, resolution, frame rate, and nominal duration; no asset mismatch was found.
- Git sanity: the reviewed baseline matched `origin/main`; no conflict artefact or pre-existing worktree change was present.

### Not verified in this pass

- A full rendered-browser walkthrough: the local browser DOM snapshot stalled and was interrupted.
- Safari/Firefox/Chrome completion of a real end-to-end source job.
- Large throttled fallback download completion.
- Multi-tab OPFS boot/start races.
- Sleep/wake, reload, and assistive-technology behaviour.
- Real-material loudness, sync, HDR/phone colour, slide legibility, and EchoVideo ingestion beyond the results already recorded in active tickets.

## Recommended remediation order

1. **Protect output correctness:** P1-01 terminal true peak, P1-02 audio timing, and VH-50. Do not call the output correctly levelled until independent real-file measurements pass.
2. **Make the selected job atomic:** P1-03 stale requests and P1-04 preflight blockers.
3. **Make result ownership safe:** P1-05/P1-06 saving, P1-07 cancellation, and P1-09 OPFS lock atomicity.
4. **Make data loss visible:** P1-08 multi-track/metadata handling.
5. **Protect long work and the safety case:** P1-10 wake/unload behaviour and P1-11 egress instrumentation.
6. **Then close P2/P3 gaps and existing compatibility/UI tickets**, rerun the full gate, and perform the named real-browser/manual checks on actual representative media.

The next pilot decision should be based on a new end-to-end evidence run after items 1–5, not on the current green unit/build gate alone.

<!-- FILE: reviews/2026-08-26/uon-video-helper-review-critique-2026-08-26.md -->

# Critique of the UoN Video Helper Comprehensive Review

Subject: `uon-video-helper-comprehensive-review-2026-08-26.md`
Baseline: `66227e51dc0905c1853d79fb927d8f009be80ad4` (`main`, working tree clean)
Date: 26 August 2026

Every finding in the review was re-checked against the code at that commit. Its
central measurement was reproduced. Three further experiments were run that the
review did not run. No repository file was modified.

## 1. Verdict at a glance

| Verdict | Count | Findings |
| --- | ---: | --- |
| Confirmed as written | 10 | R-02, R-03, R-05, R-07, R-09, R-12, R-13, R-14, R-15, R-16 |
| Correct, but needs correcting | 4 | R-01, R-06, R-10, R-11 |
| Overstated or mis-rated | 2 | R-04, R-08 |
| Verified findings dropped | 5 | P1/P2/P3 items from the earlier in-repo review |

**Take it seriously.** It is a competent, largely accurate review, and its
headline finding is real — reproduced here to fourteen significant figures.

Four findings are correct in substance but carry a mistake in the fix, the
dependency order, or the characterisation. In one case the prescribed remedy
would introduce a worse defect than the one it removes. Two are
hardened-invariant recommendations dressed as confirmed defects.

The material weakness is not accuracy, it is **provenance and completeness**.
The review consolidates the untracked review already sitting in
`pm_skills/project/code-review-2026-08-26.md`, and in consolidating it silently
dropped five findings that took under a minute each to verify. It also opens by
presenting VH-50's existing measurement as a fresh browser result.

## 2. Method

Four things were executable, and all four were run:

- **Reproduced the EOF true-peak defect** against the real `TruePeakDetector`
  and `TruePeakLimiter` via a scratch Vitest file, since removed.
- **Ran the full suite** — 32 files, 355 passed, 1 skipped, 22.97 s. The
  review's figures are exact.
- **Measured onset energy** across the whole `samples/` corpus with ffmpeg, to
  test the one evidentiary claim in R-03 that cannot be read off the code.
- **Ran an LRA experiment** the review did not run, comparing an end-of-file
  level change against the same event mid-file, with and without the tail
  padding it prescribes.

The repository was unchanged: `git status` showed only the pre-existing
untracked review file.

## 3. Finding by finding

| ID | Claim | Verdict | What was found |
| --- | --- | --- | --- |
| R-02 | EOF true-peak blind spot | **Confirmed** | Reproduced exactly. Strongest finding in the report. |
| R-03 | Source onset and gaps deleted | **Confirmed** | Code-proven, and the onset-energy evidence was independently corroborated. |
| R-05 | Preflight not bound to file/preset | **Confirmed** | No epoch anywhere; `jobFile` is a mutable module variable set by whichever reply lands last. |
| R-07 | Cancellation not authoritative | **Confirmed** | Controller registered after `await releaseFinished()`; no abort check after `finalize()` or verification; inspect/preflight have no controller at all. |
| R-09 | Multi-track inconsistency | **Confirmed** | `inspect.ts` uses `videoTracks[0]`; `pipeline.ts` uses `getPrimaryVideoTrack()`. Different questions, same UI. |
| R-12 | No wake lock, no unload guard | **Confirmed** | Spec §7.5 requires both. Neither string appears anywhere in `src/`. |
| R-13 | CI privilege and public-media guard | **Confirmed** | Workflow-level `pages: write` + `id-token: write` reach the `npm ci` job. Guard scans only `public/spike/`. |
| R-14 | Progress name, discourage ack | **Confirmed** | Bare `<progress>`, no label. Any non-block verdict reveals Start directly. |
| R-15 | Documentation drift | **Confirmed** | All four sub-claims verified, including the deployment section still reading "Not yet defined — open decision D5". |
| R-16 | Analysis retention grows linearly | **Confirmed** | 828,000 numbers for one hour of stereo — the arithmetic is exactly right. Best new finding in the report. |
| R-01 | Output misses both audio limits | **Correct, wrong order** | Mechanism confirmed. But it does not depend on R-02, and the roadmap says it does. |
| R-06 | Preflight doesn't prove the real job | **Half right** | Video config drift is real. The AAC probe is already exact — that work shipped as VH-49. |
| R-10 | LRA tail and pause freeze | **Right, bad fix** | Both defects real. The prescribed 1.5 s pad over-states LRA by 8.8 LU on a file that ends quietly. |
| R-11 | Acceptance has false-pass paths | **Right, unfair** | The crop and the empty-corpus pass are real. Criterion 3 is disclosed in its own detail string, not concealed. |
| R-04 | Output not transactional | **Overstated** | Three of four sub-claims confirmed. The partial-write one is an unguarded invariant, not a demonstrated defect. |
| R-08 | OPFS Web Lock race | **Mis-rated** | Race is real and the review is honest about confidence. Effort "Medium / risk High" for a two-line reorder is wrong. |

## 4. The one to fix tomorrow — R-02, reproduced

The detector's polyphase FIR is causal, and phase 0 puts the exact impulse at
tap 6. A sample only reaches its own peak reading six input samples later — so
the final six samples of any stream are never evaluated at any interpolation
phase, and the limiter's `flush()` drains its look-ahead at one frozen gain
without clocking the detector at all.

```text
one full-scale sample at EOF, 480-frame stream
  detector, no post-roll   -64.05359209046344 dBTP
  detector, zero-padded      0                dBTP

limiter, same signal
  look-ahead                240 samples
  peak in process() output    0    (nothing emitted)
  peak in flush() tail        1.0  =  0 dBFS

same impulse, moved back from EOF
  0,1,3 frames    ->   0.00 dBFS   ungained
  6,7,12,240      ->  -2.00 dBFS   limited correctly
```

The review quoted −64.05 dBTP and "about −2.0 dBTP six frames earlier". Both are
right, to the digit. This is a genuine defect against BS.1770-4, it is cheap to
fix, and it silently corrupts the app's own output verifier as well as the meter.

One thing the review understates: the same blind spot sits in the pass that
*verifies* the finished MP4, so the number the worker logs as `truePeakDbtp` is
unreliable at precisely the file position where a ceiling breach is most likely.

## 5. Four corrections to make before acting

### R-10 — the prescribed LRA fix would break the gate it feeds

The review says the file analyser "does not append the 1.5 seconds of silence
prescribed for final file LRA", cites Tech 3342 without a clause, and reports
reproductions differing by 2.69 LU and 6.02 LU. That reproduction is circular:
it shows padding changes the number, not that the current number is wrong.

The honest test is the same level change at end-of-file versus mid-file, which
is the closest available ground truth:

| Tail event | At EOF | EOF + 1.5 s pad | Same event mid-file |
| --- | ---: | ---: | ---: |
| 1 s loud passage | 0.00 | 10.61 | 10.80 |
| 2 s loud passage | 8.81 | 12.95 | 13.18 |
| 3 s loud passage | 12.43 | 13.97 | 14.02 |
| 5 s quiet passage | 3.79 | **15.32** | 6.51 |

**The defect is real, and worse than the review shows.** A one-second loud
passage at the end of a file reads as **LRA 0.00** today; the identical event
mid-file reads 10.80. That is total suppression, not under-representation, and
the review never demonstrates it.

**The prescribed fix is wrong.** On a file that ends with five seconds of quiet,
padding drives LRA from 3.79 to **15.32** against a mid-file truth of 6.51 — it
more than doubles the error, in the other direction. Zero padding manufactures
short-term windows describing a mixture of content and silence, and those
windows still clear the −20 LU relative gate.

This matters more than a metering nicety, because LRA is not a display value
here. `shouldApplyMacroLevelling()` gates on `LRA > 9 LU`. Padding as
prescribed would switch macro-levelling *on* for a recording that merely ends
in room tone — which is the pumping risk the whole stage was designed around.

The second half of R-10 is **stronger** than the review credits. It rates
pause-freeze at "Medium confidence", but spec §5.2 step 3 lists the operations
in order and puts *freeze* last, after smoothing, clamping and slew-limiting.
The implementation applies it first, to the raw array. The spec's purpose clause
— "so pauses and room tone are never amplified" — is a guarantee about applied
gain, not an intermediate buffer. That is a plain ordering mismatch, not a
judgement call.

### R-01 — it does not depend on R-02, and the roadmap says it does

The review makes R-02 a prerequisite for R-01 and puts it first in the Immediate
table. The dependency does not exist.

R-01's root cause is visible in ten lines of `chain.ts`: pass B constructs the
chain with `gainDb: null`, and that constructor sets `this.limiter = null`.
The gain is therefore solved against an *unlimited* signal, then applied to a
chain that does limit. Limiting only attenuates, so the output lands below target
by however much the limiter engaged — which is exactly the direction VH-50
measured (−16.75 against −16.00).

Fixing the EOF blind spot changes the integrated measurement by six samples in
an hour. It has no bearing on closing the gain loop. Sequencing the launch
blocker behind the rarer defect delays the thing that already fails on the first
real file anyone tried.

One sharpening the review has but buries: `WARNING_THRESHOLDS.targetMissedByLu`
is **1**, while the contract is **±0.5**. The verifier is calibrated exactly
twice as loose as the invariant it exists to verify, which is why a 0.75 LU miss
produces a clean log line. True peak is measured, logged, and never compared to
anything.

### R-06 — the AAC probe is already exact, and that work shipped

R-06 says "manual support probing uses fixed AVC/AAC configurations that differ
from Mediabunny's runtime configuration." Half of that is right and half would
send someone to redo finished work.

The **video** side does drift: `videoEncoderConfigFor()` probes `avc1.640033`
while `videoEncodingConfigFor()` hands Mediabunny an abstract `codec: 'avc'`
and lets it choose. Real finding.

The **audio** side does not. `handlePreflight` calls `canEncodeAudio` with the
exact runtime tuple — `mp4a.40.2`, `OUTPUT_SAMPLE_RATE`, the source's own
channel count, the preset's mono or stereo bitrate. The code comment names why.
That is VH-49, and it is the reason Firefox is blocked correctly today.

The H.264 level arithmetic in the same finding *is* right and worth keeping:
Level 5.1 allows 983,040 macroblocks/s, and 3840×2160 at 60 fps needs 1,944,000.
The preset claims a shape its own probe string cannot represent.

### R-04 and R-08 — two severity calls that don't survive contact

**R-04's partial write.** Classified "Confirmed defect", High.
`handle.write(chunk.data, { at: chunk.position })` does discard the returned
byte count, and guarding it is cheap and correct. But no short write was
observed — the review's own "Not run" list includes "actual OPFS short writes",
and every engine in practice throws `QuotaExceededError` rather than
short-writing. That is an unguarded invariant, not a confirmed defect, and the
distinction decides whether it blocks a pilot.

The other three sub-claims in R-04 are solid and belong at High: the fallback
download returns the instant `anchor.click()` does, `releaseFinished()` will
dispose a workspace while a picker `pipeTo()` is still reading it, and nothing
stops the user pointing the save dialogue at their own source file.

**R-08's effort rating.** The race is real — `OpfsWorkspace.open()` creates the
directory on line 194 and claims the lock on line 196, and the sweep classifies
inside an `ifAvailable` callback then deletes outside it. But the fix is moving
the claim above the create and moving `removeEntry` inside the lock callback.
Rating that "Effort: Medium / Implementation risk: High" and scheduling it as
Near-term buries a two-line change that removes a data-loss class outright. It is
the cheapest item in the report.

## 6. Where the review's evidence held up better than expected

R-03 asserts that AAC priming compensation "deliberately discards approximately
44 ms from the start" and that "three real sources contained audible energy in
that interval." The mechanism is code-proven — `AudioTimelineShift.apply()`
closes and returns `null` for any sample landing before zero, with a comment
saying so.

The evidentiary half cannot be read off the code, so the first 44 ms of every
file in `samples/` was measured:

```text
ffmpeg volumedetect, first 44 ms, peak level

-26.4 dB   LIBA2002 Migration and Identity...
-27.0 dB   Pelvis Sculpting 1e Final Final
-47.8 dB   CULT1027 Producing Film and Television
-56.0 dB   Philosophy of Psychotherapy v3
-66.8 dB   AMCS3068 North American Film Adaptations
-84.3 dB   Paul Smith NSS 2026-01-21
-90.3 dB   ... eight further files at the dither floor
-91.0 dB   ... three more
```

Exactly three files carry energy meaningfully above the noise floor in that
window, two of them at around −27 dBFS — real signal, not room tone. "Three real
sources" is accurate. This claim was approached to challenge it and ended up
confirmed.

Worth stating plainly for whoever picks this up: the shift preserves *sync*
correctly. What it costs is content. Source audio at 44 ms lands at output 44 ms,
and the first 44 ms is replaced by encoder priming silence.

## 7. What went missing

The review says it used the untracked `pm_skills/project/code-review-2026-08-26.md`
"only as a lead index". Its sixteen findings map almost one-to-one onto that
document's P1/P2/P3 set. Consolidating is fine. Losing verified findings in the
process is not — each of these was re-checked against the tree in under a minute:

| Was | Finding | Status now |
| --- | --- | --- |
| P3-03 | `SlidingMinimum` stores an ever-growing sample position into an `Int32Array`; wraps after ~12.4 h at 48 kHz and the expiry loop can then cycle. | Verified in `limiter.ts`. Out of scope at one hour, but a real latent bug, and the report has no equivalent. |
| P2-06 | Starting a new job silently destroys an unsaved result — `processResult.replaceChildren()` plus `releaseFinished()`, no confirmation. | Verified. R-04 mentions the racing case but not the ordinary one. |
| P3-02 | Declared config that nothing reads: `WARNING_THRESHOLDS.clippingDbtp` and `COMPRESSOR.softKnee`. | Verified — both appear only in `src/config/audio.ts` and nowhere else. Dead knobs in a file whose whole purpose is tunability. |
| P3-01 | An entirely silent recording never triggers the extended-silence warning: the check sits inside `if (audible.length > 0)` and silence filters to empty. | Verified in `warnings.ts`. The worst case for the warning is the one case it cannot fire on. |
| P2-12 | `run-in-engines.mjs` counts a missing engine as skipped but subtracts only failures from its final tally. | Verified. The cross-engine matrix the review recommends is reported by a script that can pass with nothing run. |

## 8. Provenance

**The headline measurement is not new.** The executive summary reads: "In an
isolated Chrome run using a real repository sample, the source measured
−21.86 LUFS/−1.86 dBTP and the output measured −16.75 LUFS/−1.98 dBTP." Those
output figures, and the −1.86 dBTP source peak, are already in `backlog.md`
under VH-50, dated the same day, on the same file. R-01 credits VH-50 in its
last line; the summary does not. The genuinely new numbers are the pass-B
decomposition — −22.47 LUFS, +6.47 dB selected, −16.41 LUFS pre-encode — and
those are the useful part, because they isolate the cause.

**The isolation story and the sample run don't reconcile.** The environment
table says the isolated copy was populated from `git archive HEAD`.
`samples/` is gitignored and returns nothing from `git ls-files`, so it is
not in that archive. A real-sample browser run in that copy needs a step the
report never describes. The sample itself checks out — `AMCS3059` is 852×480,
44.1 kHz stereo AAC, exactly as claimed — so this is a reporting gap rather
than a fabrication, but a review that opens by asserting its own read-only
rigour should close it.

## 9. On the report as a document

929 lines, sixteen fixed fields per finding, and a large share of them carrying
no information. Every finding contains "Illustrative patch or implementation
outline: Not applied." Eleven of the sixteen say only that. The remediation
tables assign owners — DSP engineer, Browser storage engineer,
DevOps/security, technical writer — for a project with one maintainer.

The coverage matrix claims "Full" depth on nearly every component and the
introduction says "every material claim reported below was independently
checked". On the evidence of the finding set, the honest description is
*verification and consolidation of an existing review, plus new browser
evidence*. That is genuinely valuable, and it would read as more trustworthy
stated than implied.

Its best original contributions are R-16, which is arithmetically exact and
which the earlier review missed entirely, the licence and branding-provenance
gap, and the pass-B decomposition behind R-01.

## 10. Suggested order of work

| # | Item | Why here | Size |
| ---: | --- | --- | --- |
| 1 | **R-08** — claim before create, delete inside the lock | Removes a data-loss class for two lines. The review scheduled it Near-term. | Trivial |
| 2 | **R-01** — close the gain loop around the limiter | The launch blocker, failing on the first real file. Not gated on R-02. | Large |
| 3 | **R-02** — detector `finish()`, limiter flush through the gain path | Reproduced, cheap, and it also repairs the output verifier's own reading. | Medium |
| 4 | Tighten `targetMissedByLu` to the contract, enforce true peak | A one-line threshold and a missing comparison. Stops a green log line on an out-of-contract file. | Small |
| 5 | **R-04** — save lease, minus the partial-write blocker | Three real sub-claims. Guard the write count while you are there, but do not let it gate the release. | Large |
| 6 | **R-05** + **R-07** — selection epoch and controller ordering | One state model answers both. Register controllers before the first await. | Medium |
| 7 | **R-10** — pause freeze on the final envelope only | Do the spec-ordering half. **Do not** pad the LRA tail until the gate behaviour is modelled. | Medium |

R-11's acceptance hardening should follow the product fixes, as the review says —
but its criterion-2 crop should be widened first, because that crop is the
specific reason R-02 and R-01 both cleared a green harness.

---

Checked against `66227e5` on 26 August 2026. No repository file was modified;
the scratch Vitest file used for the R-02 and LRA reproductions was removed and
the suite re-run at 32 files / 355 passed / 1 skipped. Measurements from the
real corpus were taken read-only with ffmpeg. Nothing was added to the backlog
or the decision log.

<!-- FILE: reviews/2026-08-26/uon-video-helper-updated-review-critique-2026-08-26.md -->

# Updated critique of the UoN Video Helper comprehensive review

**Review date:** 26 August 2026  
**Repository baseline:** `66227e51dc0905c1853d79fb927d8f009be80ad4`  
**Current checkout at durable integration:** `fad65f1c4e298b563a68f21f3de8d2f6a18dd5a8`  
**Reviewed branch:** `codex/repository-review-remediation`  
**Scope:** read-only verification of the three documents in
`reviews/2026-08-26/`

## 1. Executive verdict

The comprehensive review is directionally reliable. Its central warning is
supported: the current application can report success despite an output that
misses the audio contract, loses source audio, processes a job different from
the one preflighted, or does not stop authoritatively when cancelled. Those are
not speculative architecture concerns; several were reproduced against the
real modules.

The review should nevertheless not be used as an implementation plan without
correction. Eight findings stand substantially as written. Eight are right in
substance but combine claims of different evidentiary strength, contain stale
details, prescribe an unsafe remedy, or misstate effort and dependencies. No
R-series finding is wholly rejected, but several subclaims are.

- **Agree:** R-02, R-03, R-05, R-07, R-09, R-12, R-13 and R-14.
- **Partly agree:** R-01, R-04, R-06, R-08, R-10, R-11, R-15 and R-16.
- **Disagree as a whole finding:** none. The disagreements concern particular
  mechanisms, remedies, scope statements and priorities.

The most consequential corrections are:

1. R-01 is independent of R-02 as a root cause. R-02 should still land before
   final R-01 calibration because the finished detector and limiter are inputs
   to that sign-off, not because EOF samples cause the gain-loop error.
2. The 1 LU `targetMissedByLu` threshold is the specification's advisory
   warning threshold, not the ±0.5 LU acceptance tolerance. It should not
   simply be tightened. A separate fail-closed postcondition is required.
3. R-02 needs a 12-input-frame FIR drain, not the six-frame explanation in the
   first critique. A six-frame delay exposes the exact-sample centre, but a
   49-tap, four-phase FIR needs 12 input frames for its complete tail response.
4. EBU Tech 3342 v4 explicitly requires at least 1.5 seconds of trailing
   silence for file LRA. The first critique was wrong to reject that procedure.
   It was right that using the resulting value directly as the macro-levelling
   switch can make processing worse. Reporting and processing eligibility need
   separate, standards-aware semantics.
5. R-06's AAC criticism is stale, while its video issue is deeper than probe
   drift: the fixed probe and Mediabunny's present AVC level selection can both
   choose Level 5.1 for 3840×2160 at 60 fps even though that rate needs Level
   5.2.
6. R-04 is not one homogeneous confirmed defect. Result/save lifetime and the
   ability to overwrite the source are code-proven; actual fallback corruption
   and an OPFS short write remain browser-dependent. Ignoring the write count is
   nevertheless a standards-defined integrity gap and a cheap fix.
7. R-08 is a real race. The comprehensive review overstates implementation
   risk, but the first critique understates the repair as a two-line reorder.
   Lock acquisition must fail closed before directory creation/use, and the
   sweep deletion must occur inside the lock callback.
8. The comprehensive consolidation omitted six useful earlier findings, not
   five. It also dropped the finding that the supposedly measured duration
   estimate omits substantial production work.

The current green quality gate does not contradict these conclusions. Its
acceptance layer crops the positions that expose R-02/R-03, can pass when no
output audio was measured, and does not exercise the worker cancellation path.
It cannot currently refute the product defects its UI says passed.

## 2. Repository baseline and drift

The investigation ran against the reviewed source commit:

```text
reviewed source  66227e51dc0905c1853d79fb927d8f009be80ad4
current HEAD     fad65f1c4e298b563a68f21f3de8d2f6a18dd5a8
branch           codex/repository-review-remediation
```

While this critique was being made durable, the branch advanced by one commit,
`fad65f1` (`VH-53: share project context across coding agents`). Its six
changed paths are root/project documentation only: `.gitignore`, `CLAUDE.md`,
`README.md`, `decision-log.md`, `file-map.md` and `trajectory.md`.
Local and remote `main` remain at `66227e5`; the remote remediation branch
matches `fad65f1`. No `src/`, test, configuration, workflow or media path
changed. There is therefore documentation drift but no product-source drift:
none of R-01 through R-16 has been fixed or invalidated.

The pre-existing worktree state was preserved:

```text
 M .markdownlint-cli2.jsonc
?? pm_skills/project/code-review-2026-08-26.md
?? reviews/
```

The modified lint configuration only ignores the 929-line comprehensive
review. The existing review bundle and earlier review file were not altered
during the investigation; after explicit approval, this updated critique and
its index entry were added as the only durable-integration changes. The real
recordings under `samples/` remain untracked and were treated as read-only
local evidence. Corpus observations in this critique are therefore
observations of the present local corpus, not facts carried by commit
`66227e5`.

## 3. Method and limitations

The following were read in full or by the repository's prescribed sectioning:

- all three review documents and the review-bundle index;
- the hot project context and relevant backlog, decision-log and file-map
  sections;
- the specification, technical rationale, open decisions, infrastructure and
  UI standards;
- the source, tests and dependency code implicated by every R-series finding;
- the relevant primary standards and platform documentation.

Material claims were classified as code-proven, experimentally reproduced,
standards/product-contract mismatches, unguarded invariants, browser-dependent
risks, or hardening recommendations. Small test media and harnesses lived only
under temporary directories and were removed. No mocked WebCodecs result was
used as capability evidence.

Primary references used for external claims include:

- [ITU-R BS.1770-4](https://www.itu.int/dms_pubrec/itu-r/rec/bs/R-REC-BS.1770-4-201510-S!!PDF-E.pdf)
  for true-peak measurement;
- [EBU Tech 3342 v4](https://tech.ebu.ch/docs/tech/tech3342.pdf) for file-LRA
  measurement and its cautions around short material and silence;
- the [File System Standard](https://fs.spec.whatwg.org/) for synchronous write
  counts and file snapshots;
- the [Web Locks specification](https://w3c.github.io/web-locks/) for callback
  lifetime;
- [WebCodecs](https://www.w3.org/TR/webcodecs/) and
  [ITU-T H.264](https://www.itu.int/rec/t-rec-h.264) for exact configuration and
  AVC level constraints;
- the [Screen Wake Lock specification](https://www.w3.org/TR/screen-wake-lock/)
  for lifecycle behaviour;
- GitHub's [workflow-permission syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)
  and [secure-use guidance](https://docs.github.com/en/actions/reference/security/secure-use)
  for R-13;
- WCAG's [Name, Role, Value explanation](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)
  and [failure F68](https://www.w3.org/WAI/WCAG22/Techniques/failures/F68)
  for R-14.

Limitations remain important. No real OPFS short write, failed large fallback
download, live workspace deletion, source overwrite, sleep interruption or
cross-engine 4K60 outcome was observed. Those claims are not promoted beyond
their evidence. Real AAC/resampler behaviour after candidate DSP repairs,
Safari/Firefox differences, subjective audio quality and production CI policy
were also not tested.

## 4. Finding-by-finding conclusions

| ID | Conclusion | Evidence class | Correct decision significance |
| --- | --- | --- | --- |
| R-01 | **Partly agree** | Experimentally reproduced product-contract defect | Pilot and release blocker. Preserve the 1 LU advisory; add a separate finite, audio-present, ±0.5 LU and ≤−2 dBTP hard postcondition. Use a bounded full-chain solver with infeasibility handling. |
| R-02 | **Agree** | Experimentally reproduced DSP defect | Pilot and release blocker. Drain all 12 FIR input frames and clock limiter gain through its look-ahead while emitting only original-duration audio. It is independent of R-01's cause but should precede final calibration. |
| R-03 | **Agree** | Code-proven and current-corpus exposure | Pilot and release blocker. Audio timestamps and gaps collapse, then leading samples can be deleted. Four local sources, not three, have meaningful first-44 ms energy. |
| R-04 | **Partly agree** | Mixed: code-proven defects, unguarded invariant and browser-dependent risks | Result ownership/save completion is a pilot and release blocker. Short-write checking is immediate cheap prevention, but actual short writes and fallback corruption were not observed. |
| R-05 | **Agree** | Code-proven asynchronous race | Pilot and release blocker. The enabled Start control can refer to a stale file/preset combination. |
| R-06 | **Partly agree** | Code-proven missing gates plus standards/config mismatch | Pilot and release blocker unless the pilot is constrained to an exact tested job/device path. AAC is fixed; decode, OPFS and secure-context gates are absent; 4K60 AVC level selection remains invalid. |
| R-07 | **Agree** | Code-proven cancellation and ownership defects; browser warning observed previously | Pilot and release blocker. Cancellation can be lost or followed by success, and yielded native samples can escape their closing `finally`. |
| R-08 | **Partly agree** | Code-proven TOCTOU; destructive browser interleaving not observed | General-release blocker; pilot blocker unless concurrent tabs are credibly excluded. Small code change, low-to-medium implementation risk, medium verification effort. |
| R-09 | **Agree** | Experimentally reproduced track-selection mismatch and code-proven silent loss | Release blocker under the no-silent-loss invariant. A controlled pilot may proceed only after a fail-closed single-track gate or explicit loss acknowledgement. |
| R-10 | **Partly agree** | Standards mismatch and experimentally reproduced processing hazard | Release blocker for trusted audio; pilot blocker unless macro processing is conservatively gated. The standards tail is correct, but the report-LRA value is not automatically a safe processing trigger. Pause freeze is a definite contract mismatch. |
| R-11 | **Partly agree** | Code-proven false-pass routes | Acceptance-evidence blocker. Criterion 3's omission is disclosed, not concealed. Add negative controls now and update success expectations after product fixes. |
| R-12 | **Agree** | Code-proven specification omission | Pilot blocker if long-file reliability is promised; general-release blocker otherwise. Actual platform rejection/reacquisition behaviour remains manual evidence. |
| R-13 | **Agree** | Strongly supported release-boundary risk; no current leak | Public-release hardening, not proof of a present compromise. The public-media allowlist is an immediate cheap prevention. |
| R-14 | **Agree** | Code-proven UI/spec defects | General-release accessibility/error-prevention blocker under the project's AAA policy; both fixes are small. |
| R-15 | **Partly agree** | Confirmed documentation/implementation drift with one browser-dependent outcome | Split into deployment, offline, version, diagnostics and gate-integrity items. Do not mislabel absent opening branding as a v1 feature gap. |
| R-16 | **Partly agree** | Arithmetic/code-proven duration-linear retention | Ordinary low-priority performance defect, not whole-media buffering. Distinguish traversal peak from retained encoding state; there is no specified one-hour cap. |

## 5. Detailed corrections and qualifications

### R-01 — close the actual gain loop, not the warning threshold

`src/media/audio-plan.ts:88-135` measures pass B through `AudioChain` with
`gainDb: null`. In `src/audio/chain.ts:41-48`, that also means no limiter. Pass
C then adds the calculated gain and a nonlinear limiter. The system measured to
choose gain is therefore not the system rendered. Final verification in
`src/workers/job.worker.ts:174-211` checks only an advisory loudness warning,
logs true peak without enforcing it, swallows verification exceptions and can
still publish `processed`.

The comprehensive review is right about the failure and the need to calibrate
the complete path. The first critique's threshold recommendation is wrong.
Specification §5.4 intentionally warns only when the target is missed by more
than 1 LU (`docs/01-specification.md:221-233`); formal acceptance is ±0.5 LU
and ≤−2 dBTP (`docs/01-specification.md:484-496`). These are two different
surfaces. Keep the advisory threshold unless the protected specification is
changed, and introduce a separate hard postcondition using
`INTEGRATED_TOLERANCE_LU`.

A naive repeated correction is unsafe. A real-module synthetic trial gave:

| Corpus | Initial output | Behaviour of repeated correction |
| --- | ---: | --- |
| 0.1 s hot burst per second | −16.2536 LUFS | Bounded iterations converged through −16.1446, −16.0824 and −16.0466 LUFS. |
| Sparse full-scale impulses | −41.6363 LUFS | Naive gain rose from +23.70 to +121.38 dB while output remained around −38 LUFS. |

The sparse case is not representative speech; it proves that peak-constrained
material needs maximum gain, convergence/monotonicity checks and a visible
infeasible outcome. A pre-encode solver also cannot guarantee the result after
resampling and AAC. Decoded-output verification, calibrated headroom or a
bounded re-encode policy remains necessary.

R-01 does not depend on R-02 causally. Its design can proceed in parallel. The
R-02 finalization repair should nevertheless land before R-01's final corpus
calibration because otherwise both the limiter and the verifying meter have
incorrect EOF semantics.

### R-02 — the first critique's six-sample explanation is incomplete

The core reproduction stands. A full-scale sample at the final frame was read
as −64.0536 dBTP by the current detector and emerged from the current limiter
at 0 dBFS rather than the −2 dBTP ceiling.

The polyphase FIR has 49 taps and 13 taps per phase. Six subsequent samples are
enough for the phase-0 centre to see the exact final sample, which explains the
first critique's offset table. Twelve input frames are needed to drain the
complete FIR response. The safe semantic is therefore an idempotent detector
finalization over `PHASE_TAPS - 1` virtual zero frames, not a magic six-sample
pad.

The limiter must clock zeros through the ordinary detector/envelope path for
its look-ahead duration and return only delayed original frames. A 50-signal
temporary boundary corpus covering lengths 1–1000 and chunk sizes 1, 7, 239,
240 and 4096 produced exact lengths, bit-identical results across chunking and
a worst peak of −1.9999996 dBTP with that candidate mechanic. Still unresolved
are `clippedSampleCount` semantics for virtual samples and decoded-MP4/AAC
confirmation.

### R-03 — the mechanism is stronger, and the corpus count is four

`src/media/audio-plan.ts:147-189` assigns timestamps from emitted frame count
and does not use the decoded sample timestamp. Initial offsets and internal
gaps therefore collapse. `src/media/encoder-delay.ts:127-165` then closes or
slices leading samples during AAC delay compensation, while video preserves
source-relative time in `src/media/pipeline.ts:420-434`.

The acceptance harness repeats the blind spot: audio time is reconstructed
from cumulative frames (`src/acceptance/measure.ts:119-139`), and its sync
markers start at one second (`src/acceptance/fixtures.ts:74-78`). A green sync
criterion does not establish source-timeline conservation.

The first critique's corpus scan was case-sensitive and omitted `C0413.MP4`.
The corrected present-corpus result is:

```text
−26.4 dBFS  LIBA2002 …
−27.0 dBFS  Pelvis …
−32.2 dBFS  C0413.MP4
−47.8 dBFS  CULT1027 …
```

The exact audible result still needs real-engine tests using t=0 content, a
non-zero audio start and an internal gap. The timestamp destruction itself is
code-proven and violates the project's silent-data-loss rule.

### R-04 — split integrity checks from browser manifestations

Four different issues should not share one evidence label or estimate.

1. `src/media/opfs.ts:304-307` ignores the synchronous `write()` byte count.
   The File System Standard defines that count so partial writes can be
   detected and handled. This is a confirmed unguarded invariant; no actual
   OPFS short write or quota-induced truncation was observed. A write-all loop
   is small and should land immediately.
2. Post-output verification checks only primary audio and catches exceptions
   before publishing success. Missing/corrupt expected output is therefore a
   code-proven false-success path.
3. Picker saving waits for `pipeTo()`, but a second job can release the prior
   workspace while the save is reading. Fallback saving returns immediately
   after `anchor.click()` and main then discards the backing workspace. That
   lifetime race is code-proven; actual failed consumption by a particular
   engine is browser-dependent.
4. The source is selected as a `File`, while the save picker returns only a
   destination handle. The current design therefore has no source handle for
   `isSameEntry()`. The app can overwrite the original if the user selects it;
   that destructive capability is code-proven, although the OS dialogue and
   user choice are preconditions.

Estimate separately: write-count handling is small; result leasing and blocking
a competing process are small-to-medium; reliable fallback retention requires
cross-engine work; source identity is medium and may need a supporting-browser
open-picker path plus a defined fallback policy.

### R-05 and R-06 — bind one exact, executable job

R-05 is confirmed without qualification. `src/main.ts:390-490` launches
uncancelled asynchronous inspection/preflight chains. Any late response can
call `showProcessControls(file)`. Start then combines mutable `jobFile` with
the currently selected preset rather than the tuple that passed. Request IDs
correlate replies but do not protect current UI state. A deterministic
deferred-response test should prove stale results cannot re-enable Start.

R-06 contains one stale claim and one understated problem:

- AAC probing now uses the exact runtime AAC-LC sample rate, channel count and
  preset bitrate. VH-49 shipped that correction; do not redo it.
- OPFS, secure-context and per-track decode support are recorded but omitted
  from the blocking preflight verdict. Probe failure can degrade to an
  “estimate unavailable” warning. Those are current code defects.
- The video probe fixes `avc1.640033`, while runtime supplies Mediabunny with
  abstract `avc`. More importantly, Mediabunny's present H.264 level selector
  considers frame size and bitrate but not frame rate. At 3840×2160×60, the
  rate is 1,944,000 macroblocks/s: over Level 5.1's 983,040 and within Level
  5.2's 2,073,600. Reusing the current runtime-generated candidate would not
  alone repair 4K60; candidate generation itself must account for MaxMBPS.

One immutable accepted-job value should bind file identity, processing tracks,
preset, exact encoder candidates, capability verdict and selection epoch. It
should be reused by the UI, worker, diagnostics and tests. That is a targeted
boundary object, not an invitation to add a general state-machine framework.

### R-07 — cancellation must own every phase and every yielded sample

The controller is placed in the `running` map only after
`await releaseFinished()` (`src/workers/job.worker.ts:106-136`), so an early
cancel is lost. Inspect and preflight have no controllers. The last pipeline
abort check occurs before finalization; finalization and verification can still
end in `processed`. Several loops check abort before entering the
`try`/`finally` that owns a yielded `AudioSample` or `VideoSample`, so an abort
at that boundary can leak the native sample.

The comprehensive review's High impact is proportionate. Its “R-04 first”
dependency is too rigid: establish explicit result ownership jointly, but
register controllers before the first await, place sample ownership inside
`finally`, and add post-commit abort checks independently.

The acceptance cancel case calls the main-thread pipeline directly. It does
not exercise the worker protocol, prior-result release, sync-handle cleanup,
finalization or worker verification. Required barriers are: before the first
await, immediately after iterator yield, during finalize, during verification
and during old-result release. Every case should emit exactly one `cancelled`,
never `processed`, close each native sample once, and return OPFS to baseline.

### R-08 — a small repair, but not a two-line reorder

`src/media/opfs.ts:58-81` requests a candidate lock with `ifAvailable`, returns
a boolean from the callback, and therefore releases the lock before deletion.
Selection occurs separately from deletion. `openWorkspace()` creates the job
directory before requesting its long-lived lock and continues even if the
claim fails.

This admits the review's interleaving: A creates; B briefly acquires/releases
and classifies; A claims; B deletes outside the lock. The browser need not
integrate Web Locks with OPFS automatically—the application must keep the
critical section inside the callback.

The fix is likely small, with low-to-medium code risk, but validation is not
trivial. Claim before directory creation/use and fail closed if unavailable;
perform orphan deletion within the successful sweep callback; test open-wins
and sweep-wins barriers with a deterministic lock scheduler, then stress two
tabs. The first critique's “two-line change” misses the fail-closed ownership
contract and testing work.

### R-09 — reproduced, not merely inferred

Inspection uses array element zero (`src/media/inspect.ts:189-200`), while
processing asks Mediabunny for primary tracks (`src/media/pipeline.ts:224-227`).
Mediabunny ranks default/pairability/bitrate properties when selecting a
primary. Output then writes exactly one video and one audio track, and the UI
does not warn about extra A/V tracks.

A temporary MP4 with two video and two audio tracks, with the second pair
marked default, reproduced the mismatch:

```text
first video track   1    primary video track   2
first audio track   3    primary audio track   4
```

All 28 present sample files have one video and at most one audio track, so this
is not current-corpus exposure. A fail-closed multiplicity check is small and
unblocks a controlled single-track pilot. Full preservation requires a product
decision about alternate audio, loudness processing and branding; do not hide
that decision inside the implementation.

### R-10 — standards-correct reporting can still be unsafe processing

The comprehensive review is right that the current file analyser stops before
the short-term/LRA window reaches EOF. The first critique is wrong to use a
mid-file event as the authority for rejecting padding. EBU Tech 3342 v4
explicitly requires at least 1.5 seconds of silence after a file signal before
final LRA. It also cautions that leading/trailing silence and short or isolated
material can produce misleading LRA.

The first critique's experiment remains valuable because this product uses LRA
as a control input. Examples from the real loudness module were:

| Tail event | Current EOF | LRA-only +1.5 s tail | Same event mid-file |
| --- | ---: | ---: | ---: |
| 1 s loud passage | 0.00 | 10.61 | 10.80 |
| 2 s loud passage | 8.81 | 12.95 | 13.18 |
| 3 s loud passage | 12.43 | 13.97 | 14.02 |
| 5 s quiet passage | 3.79 | 15.32 | 6.51 |

The standards tail repairs EOF under-measurement, but the quiet-ending result
crosses the app's `LRA > 9` macro switch. Directly adding ordinary silence also
changed integrated loudness by as much as +0.458 LU. Finalization must advance
only the LRA/short-term state, not duration, integrated loudness or the
source-aligned curve. More importantly, the application needs either a
qualified processing-eligibility metric or a deliberate separation between
standards-report LRA and macro activation. Because the protected specification
currently says LRA triggers macro mode, this may need a product decision and
doc delta.

Pause freeze is a separate definite mismatch. The specification orders
smoothing, clamp, slew and then pause hold. The code freezes raw correction
before smoothing, and the final envelope can move during the pause. In a
30-second loud / 20-second pause / 30-second quiet case, applied gain moved from
−5.0000 to −0.0331 dB across the pause. Simply overwriting the final array held
the pause but caused a 5.0331 dB resume jump, violating the 1 dB/s slew limit.
The safe design must hold the prior applied gain during every paused sample and
resume by slewing from that value, while still excluding pause values from the
smoothing input.

No production R-10 remedy is yet proved safe. Required tests include leading,
middle and trailing pauses; opposite corrections on either side; constant
applied gain throughout pause; ≤0.1 dB change per 100 ms at both boundaries;
chunk invariance; and no pre-onset room-tone boost.

### R-11 — fix the harness both before and after the product

The review correctly identifies false-pass routes:

- criterion 2 crops the first and last content seconds and uses the crop for
  true peak;
- missing audio returns `null`, is skipped, and leaves default aggregates of
  zero deviation and `-Infinity` peak, which pass;
- the audio-through-worker criterion asserts size/video duration but not the
  expected output audio track;
- cancellation bypasses the worker path;
- egress wrapping covers main-global `fetch`/`sendBeacon`, not Request-object
  bodies, XHR bodies or worker-context requests;
- criterion 3 inserts a static pass while authentic EBU cases 7/8 remain
  skipped and peak cases 20–23 are a declared local interpretation.

The comprehensive report should not imply current egress: static inspection
found none. It should also say criterion 3's limitation is disclosed in its
detail string, although displaying `pass` is still misleading.

The sequence “tighten only after product corrections” is too late. Add
fail-closed result counts, expected-audio assertions, EOF/t=0 negative controls,
worker cancellation and egress negative controls immediately so fixes cannot
be falsely certified. Rebaseline successful-output values after the product
changes. EBU Tech 3341 itself describes its cases as minimum evidence, not a
universal proof of meter accuracy.

### R-12 through R-14 — confirmed, with boundary-specific labels

R-12 is a confirmed implementation absence against specification §7.5:
neither wake lock nor conditional unload protection exists. Wake locks are
advisory and can be released on visibility/activity changes, so real support
needs rejection handling and visibility reacquisition rather than one acquire
call. `beforeunload` must exist only while processing or holding an unsaved
result. Actual mobile unload behaviour remains manual evidence.

R-13 is correctly labelled a strongly supported risk, not a current breach.
The build job inherits workflow-wide Pages/OIDC writes, actions use mutable
major tags, and the guard scans only `public/spike`. A temporary
`public/lecture-copy.mp4` negative control still returned
`check-placeholders: clean`. Current `public/` contains only expected branding
assets. Narrow job permissions, pin actions by full SHA with an update policy,
and reject every unapproved public media file before the next public release.

R-14 contains two small confirmed defects: `index.html:107` has an unnamed
native progress control, and every non-block preflight reveals Start despite
the specification requiring acknowledgement for `discourage`. Accessible-tree,
keyboard and screen-reader rehearsal remain needed after the code fix.

### R-15 — split the drift, and correct the v1 branding claim

The following drift is confirmed:

- infrastructure documentation says deployment is undecided/local-only while
  the workflow deploys every push to `main`;
- offline-after-first-load is promised, but there is no service-worker/cache
  implementation; actual browser HTTP-cache/offline navigation was not tested;
- the infrastructure contract says both product and build identity are exposed
  in production, while main hides `BUILD_ID` outside development (diagnostics
  do carry it);
- diagnostics lack explicit redacted SourceReport, accepted-job, capability
  and current-view fields, although some facts appear incidentally in logs;
- the documented non-mutating `check` runs Vite build and creates `dist/` in a
  clean archive;
- architecture documentation names modules and protocol shapes that do not
  exist.

One additional comprehensive-review statement is wrong. Its accessibility
assessment says absent opening/closing choices make the final three-choice
workflow incomplete. Specification §4.1 explicitly makes v1 closing-only; an
opening toggle is not a v1 blocker. The closing boundary mode remains a real
missing user choice, and the closing choice itself exists. Correct the feature
inventory rather than treating future opening branding as unfinished v1 work.

### R-16 — real linear state, wrong scope and lifetime wording

For one hour of stereo at 48 kHz, one completed analyser holds:

```text
momentary                 359,961
short-term                359,701
block loudness             35,997
block mean squares         71,994
total                     827,653 numbers
minimum numeric payload   6,621,224 bytes before array overhead
```

The comprehensive arithmetic is accurate and the “few hundred kilobytes”
comment is false. Its lifetime wording is imprecise. `finish()` returns only
momentary and short-term arrays, so 719,662 numbers remain in the completed
report; block arrays become collectable. Up to roughly 35,971 macro-envelope
values can also be retained. Peak traversal memory can be higher than the
review says because pass B runs while pass A's report/envelope remains live:
roughly 1.55–1.58 million duration-linear numbers can coexist.

This is not PCM/frame buffering and does not invalidate the streaming
architecture. It is an ordinary memory/performance defect. The first critique
and comprehensive review both lean on a “one-hour envelope”, but the
authoritative specification says there is no arbitrary duration cap
(`docs/01-specification.md:329`). At 12.4 hours the omitted limiter-index defect
also becomes reachable. Retention should therefore be profiled and bounded,
not dismissed as outside a fictional product limit.

## 6. Reproduction and verification record

### Baseline commands

```sh
git status --short --branch
git rev-parse HEAD
git branch --show-current
git rev-parse main origin/main origin/codex/repository-review-remediation
```

### Canonical gate

```sh
npm run check
```

Result at the reviewed baseline:

- 32 test files;
- 355 tests passed and 1 skipped;
- production build passed;
- Markdown and link checks passed, covering 68 files with zero broken links;
- memory validation reported zero structural failures and five budget
  warnings.

The warnings are reports, not a reason to alter protected/project memory in
this read-only task. The green gate does not cover the reproductions below.

### Focused existing tests

```sh
npm exec vitest -- run src/media/opfs.test.ts src/media/save.test.ts src/media/lanes.test.ts
npm exec vitest -- run src/audio/warnings.test.ts src/media/preflight.test.ts test/ebu3341/tech3341.test.ts
```

Results:

- storage/save/lane group: 3 files, 19 tests passed;
- warnings/preflight/EBU group: 3 files, 56 passed and 1 skipped.

### DSP boundary harness

The temporary Vitest configuration imported the production detector, limiter,
chain, analyser and macro-leveller directly. It was removed after execution.

```sh
npm exec vitest -- run --config /tmp/uon-vitest.config.ts --reporter=verbose --disable-console-intercept
npm exec vitest -- run --config /tmp/uon-vitest.config.ts --reporter=verbose --disable-console-intercept -t 'holds the post-rolled ceiling|shows the final envelope'
```

Five synthetic tests and two focused property tests passed. The important
observations were:

```text
final full-scale impulse, current detector      -64.0535920905 dBTP
same detector with 12-frame postroll              0.0000000000 dBTP
current limiter output                            0.0000000000 dBTP
clocked candidate limiter                        -2.0000002404 dBTP

middle-pause gain variation                       4.9669 dB
naive post-array freeze resume jump               5.0331 dB / 100 ms
```

### Media and harness reproductions

- **Onset scan:** every read-only sample selected with case-insensitive media
  extensions was measured over its first 44 ms using ffmpeg `volumedetect`.
  Four files were above the meaningful-noise cutoff; the first critique's
  extension filter missed uppercase `.MP4`.
- **Multi-track:** a temporary MP4 containing two video and two audio tracks
  marked the second track of each type as default. Mediabunny returned first
  IDs 1/3 but primary IDs 2/4. The file was removed.
- **Public media:** in an isolated temporary archive,
  `public/lecture-copy.mp4` was added and
  `node scripts/check-placeholders.mjs` returned clean, exit 0.
- **Silent warning:** 31 seconds of zero PCM passed through the production
  `AudioAnalyser`; warnings were `[]`, reproducing the missing all-silent
  warning.
- **Engine tally:** an isolated copy pointed all three engine paths at absent
  executables. The script printed three `SKIPPED`, then
  `3/3 engine(s) reported a complete run`, exit 0.
- **Limiter index:** a guarded temporary test seeded `SlidingMinimum` near
  2³¹ and reproduced the signed wrap at position 2,147,483,648.
- **Check mutation:** a clean archive had no `dist/`; `npm run build` created
  the complete output directory, confirming the documentation contradiction.

All temporary media/configuration files were removed.

## 7. Findings omitted by the comprehensive consolidation

### O-01 — limiter position wraps after about 12.4 hours

**Confirmed Low ordinary boundary defect.** `SlidingMinimum` stores an
indefinitely increasing position in `Int32Array`. At 48 kHz, 2³¹ samples is
44,739.24 seconds, or 12.428 hours. The wrap can break expiry ordering. The
first critique calls this outside a one-hour envelope, but the specification
sets no arbitrary duration cap. Use safe-number or 64-bit-capable indices and
add a near-wrap regression; no 12-hour media fixture is needed.

### O-02 — an ordinary new job destroys an unsaved result

**Confirmed Medium lifecycle defect.** New selection removes the Save UI;
starting again removes it and `releaseFinished()` disposes the workspace before
the replacement job succeeds. This is distinct from R-04's concurrent-save
race. Model `ready-unsaved → saving | discarded`, require an explicit
save/discard/start-over transition, and retain the old result until that choice
is complete.

### O-03 — declared configuration is dead and runtime numbers bypass config

**Confirmed Low maintainability/invariant defect.** Repository-wide search
finds `WARNING_THRESHOLDS.clippingDbtp` and `COMPRESSOR.softKnee` only at their
declarations. Runtime instead defaults the true-peak detector to −0.1 dBTP and
uses a fixed 6 dB compressor knee. Other tuneable project choices also remain
outside `src/config/`. This violates a project invariant, but is not itself a
user-harm release blocker. Wire the declared values or remove/replace them only
as part of an approved config cleanup.

### O-04 — an all-silent source cannot emit extended-silence warning

**Experimentally reproduced Low user-warning defect.** Extended-silence logic
is nested inside `audible.length > 0`; an entirely silent curve is all
`-Infinity` and cannot enter. Evaluate silence independently of finite audible
windows and cover actual analyser output, not just hand-built curve arrays.

### O-05 — skipped engines are reported as completed

**Experimentally reproduced Medium acceptance-harness defect.** The script
increments failures but not skips when calculating the final count. Report
completed, skipped and failed independently; an explicitly requested but
unavailable engine must prevent a complete-run claim.

### O-06 — the measured duration estimate omits material production work

**Confirmed Medium estimate-accuracy defect.** The earlier internal review's
P2-04 does not materially appear among R-01 through R-16. `probe.ts` uses a
`NullTarget`, omits OPFS write/backpressure, compositing, detailed DSP/encoding,
branding, finalize and the full verification traversal, and arithmetically
counts only two audio passes. R-06 mentions failed probes and future estimate
refinement, but that does not preserve this claim. Validate bounded samples of
the actual stages and report audio/video components separately; keep it
distinct from the output-size estimate.

## 8. Provenance and evidentiary quality

The three reports should carry a clearer evidence map.

1. The AMCS3059 result of approximately −16.75 LUFS and −1.98 dBTP was already
   recorded in the active VH-50 backlog entry before the comprehensive review.
   The review acknowledges that later, but its executive summary presents the
   numbers without provenance. Its new contribution is the useful pass-B
   decomposition (approximately −22.47 LUFS, +6.47 dB selected gain and −16.41
   LUFS before encode), not discovery of the headline miss.
2. The comprehensive review says its isolated checkout came from
   `git archive HEAD`. `samples/` is gitignored, `git ls-files samples` is
   empty, and the archive contains no `samples/` entries. A real-source run in
   that checkout required a separate copy, mount or selection step that is not
   described. This is a reproducibility/provenance gap, not evidence that the
   result was fabricated.
3. The comprehensive R-series maps closely to the earlier internal P findings
   and says that file was used as a lead index. A source-to-consolidated mapping
   would make inherited, reproduced and newly discovered evidence explicit.
4. The consolidation dropped six findings, including duration-estimate
   accuracy. The first critique correctly recovered five but made its own
   case-sensitive corpus error and gave an incomplete six-sample R-02 model.
5. Evidence labels should remain local to subclaims. For example, R-04 contains
   code-proven ownership defects, a standards-defined but unobserved short-write
   risk, and browser-dependent consumption behaviour. Calling the bundle simply
   “confirmed” hides the distinction.

The strongest new comprehensive-review evidence remains the pass-B R-01
decomposition, duration-linear R-16 arithmetic and broad cross-cutting source
inventory. The strongest independent reproductions are the R-02 EOF matrix,
R-10 pause/LRA boundary corpus, R-09 multi-track file and negative harness
controls.

## 9. Corrected order of work

One numerical list would mix impact, ease and verification cost. The safer plan
uses workstreams with explicit release gates.

### Immediate cheap risk reductions

1. **R-08:** acquire the live workspace lock before directory creation/use,
   fail closed, and delete orphans inside the successful sweep callback.
2. **R-04:** check/loop on synchronous write counts and make missing/unreadable
   expected tracks fail verification.
3. **R-09:** fail closed on unsupported extra A/V tracks until the preservation
   policy is decided.
4. **R-07:** register cancellation before the first await and move yielded
   sample ownership inside `try`/`finally`.
5. **R-14:** name the progress control and require explicit acknowledgement of
   a discourage verdict.
6. **R-11/O-05/R-13:** add missing-audio/result-count/EOF negative controls,
   correct the engine tally, and enforce an exact public-media allowlist.

These are small, independently reviewable changes. They should not be bundled
into one OPFS/DSP/UI commit.

### Release-blocking correctness work

1. **R-02:** land explicit detector finalization and clocked limiter drain with
   the 12-frame FIR boundary matrix, exact-length/chunk-invariance properties,
   protected EBU harness and decoded-output check.
2. **R-01:** in parallel, design a bounded full-chain solver and fail-closed
   decoded-output postconditions. Final calibration/sign-off follows R-02; the
   mechanism is not otherwise dependent on it.
3. **R-03:** preserve source timestamps, offsets, gaps and onset through AAC
   delay handling. Prove sample/timeline conservation in real engines.
4. **R-05/R-06:** bind one immutable accepted job and make secure context, OPFS,
   decode support and a frame-rate-valid exact encoder candidate hard gates.
5. **R-09:** retain the fail-closed pilot policy or approve explicit
   multi-track semantics before general release.
6. **R-10:** implement standards-compliant LRA finalization without altering
   integrated/source-curve state, decide the safe relationship between report
   LRA and macro eligibility, and implement stateful final pause hold plus
   resume slew.

### Transactional and lifecycle work

1. **R-04 plus O-02:** introduce explicit result states and read leases; keep
   the backing workspace until save consumption completes; block competing
   processing while saving; require deliberate discard/start-over; define
   source same-entry policy and browser fallback.
2. **R-07:** extend authoritative cancellation through inspection, preflight,
   finalization, verification and old-result cleanup, with exactly one terminal
   response.
3. **R-12:** acquire/reacquire wake lock while processing and attach unload
   protection only during processing or an unsaved-result state.

### Test-harness repair

1. Add fail-closed negative controls now for missing audio, t=0/EOF peaks,
   stale preflight, worker cancel, lock barriers, Request/XHR/worker egress and
   skipped engines.
2. Add each regression with its product fix; do not rely on the current green
   criterion as proof.
3. After R-01/R-02/R-03/R-10, rebaseline decoded-output acceptance and run real
   Chrome/Safari paths plus the constrained Firefox path.
4. Report authentic EBU execution, local interpretations and manual checks as
   separate states; never render an unexecuted criterion as passed.

### Medium-term hardening and documentation

- **R-13:** complete least-privilege jobs, immutable action refs, action-update
  policy, deployed inventory and licence/branding provenance.
- **R-15:** reconcile deployment, offline, version, diagnostics, architecture
  and check-mutation contracts through the protected-doc process where needed.
- **R-16/O-01:** profile peak and retained analysis memory, reduce state after
  correctness stabilises, and replace the wrapping limiter index.
- **O-03/O-04/O-06:** restore config authority, repair all-silent warning and
  calibrate honest duration estimates.

## 10. Pilot and release gates

For a narrowly supervised, single-track pilot, the minimum unresolved blockers
are R-01, R-02, R-03, the result-lifetime parts of R-04, R-05 and R-07. R-06
also blocks unless the exact input/device/preset path is preflighted fail-closed.
R-09 requires a single-track gate. R-10 requires either boundary-proved macro
semantics or a conservative approved way not to activate uncertain macro
processing. R-12 blocks any pilot that promises unattended long-file
reliability.

General release additionally requires R-08, full R-09 policy, repaired R-11
release evidence, R-12 lifecycle protection, R-14 accessibility/error
prevention and R-13 public-release hardening. R-15's user-facing promises must
either be implemented or reconciled through protected documentation. R-16 and
the low omitted defects are ordinary follow-up work unless capacity testing
shows a supported-device failure.

This is not permission to bypass blockers procedurally. A pilot exception must
be explicit, narrow, observable and unable to turn silent loss into success.

## 11. What remains unverified

- Real AAC/resampler output and browser-engine differences after any DSP repair.
- A bounded R-01 solver over representative real speech, including its visible
  infeasible-case UX and encoded-output strategy.
- Authentic Tech 3342/BS.2217-style LRA material and the correct relationship
  between standards-report LRA and macro eligibility.
- `clippedSampleCount` semantics after virtual detector/limiter tail clocking.
- Full decoded-MP4 proof of exact duration, chunk invariance, loudness and true
  peak after the candidate R-02 mechanic.
- Subjective pumping, room-tone and boundary listening tests.
- Actual OPFS partial-write/quota behaviour and byte-for-byte large-output
  recovery in each supported engine.
- Large fallback download consumption after OPFS removal and object-URL revoke.
- Source/destination same-entry behaviour under supporting and fallback picker
  paths.
- A deterministic live R-08 workspace deletion and repeated two-tab stress.
- Real rapid file/preset selection behaviour after a candidate R-05 fix.
- Chrome/Safari/Firefox acceptance of the exact final AVC/AAC candidates,
  especially 4K60 and unusual channel layouts.
- Platform-specific wake-lock rejection/reacquisition, laptop sleep and mobile
  unload behaviour.
- Accessibility-tree and VoiceOver/NVDA/TalkBack behaviour.
- Live GitHub repository/environment permissions, deployed response headers,
  deployed public inventory and offline navigation/cache behaviour.
- Heap profiles for 5-, 20-, 60-minute and very-long inputs on supported
  devices.

## 12. Integrity statement

The investigation itself did not alter any repository file, protected
document, project-memory file, sample, branch, commit, remote or deployment.
Temporary harness files and generated media were isolated outside the
repository and removed. After explicit approval, the completed critique was
copied into the existing untracked review bundle and its bundle index was
updated. No product source, protected document, project memory or sample was
changed by that durable-integration step.
