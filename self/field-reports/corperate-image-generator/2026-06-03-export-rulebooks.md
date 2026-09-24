<!-- field-report: project=corperate-image-generator · date=2026-06-03 · type=export
     · pm-skills=2.2.0 (installed with the single commit ee49264 on 2026-06-03; never upgraded)
     · source=rulebooks and contract files at ee4926480fb0799239590817eea9753e9bad0d11, from Git blobs, taken 2026-09-24 by Claude Code (read from a scratch clone assembled from the remote and the checkout's objects, every ref set to its value at the cut-off 2026-09-24T11:40:00.000Z; content-addressed, so identical to the checkout's HEAD)
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained; uncommitted work, session logs and the bundle stay in the local lane -->

# Rulebook export

Snapshot: `ee4926480fb0799239590817eea9753e9bad0d11`. Files: `AGENTS.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md`, `README.md`, `corporate-image-generator-kickoff-prompt.md`.

<!-- FILE: AGENTS.md -->

# AI Agent Rules

## Product identity

**Corporate Image Generator** — a local, browser-based generative-art
instrument for live gallery performance. It consumes the AI Jam Exhibition
System (v2) Hub's live 3×3 Art Wall over the shipped EXT-1 LAN contract,
analyses the 8 outer cells locally on a timed cycle, and generates a
corporate-stock-style image of a recurring 7-character cast via a local
ComfyUI service — with incoming imagery progressively driving mood, behaviour,
and eventually clothing from subtle realism to exaggerated "overdrive."

The canonical mental model is a **timed performance instrument**: a repeating
capture→analyse→select→generate→display cycle with live controls and keep-up
metrics. It is **not** a request/response image tool, not a productivity app,
and not part of the exhibition system — it is a standalone LAN consumer that
integrates only through the EXT-1 contract.

---

## Who you are working with

The maintainer is a vibe coder who owns macro structure, UX direction,
and conceptual design — but not deep implementation. Do the work; don't
explain concepts back unless asked.

---

## Before every task

### Read tiers

Project memory has four read tiers. Load only what each tier
prescribes — this keeps session context bounded.

**Hot whole-file** — read every task. Three groups, budgeted differently:

_Reference docs_ — written once to a natural size; they do not accrete,
so each carries only a soft size guideline, **not** a prune target:

- `README.md`
- `pm_skills/project/brief.md`
- `pm_skills/project/architecture.md`
- `pm_skills/project/conventions.md` (if it exists)

_Accreting_ — read every task, but grows as agents append per-task
roles/notes, so it carries a hard, prunable budget:

- `pm_skills/project/file-map.md`

_Conditional_ — read **only** when the task touches the domain (a task
usually touches one, rarely both), so **not** counted in the every-task
read-load review:

- `UI-STANDARDS.md` — UI, controls, text, states, accessibility, or
  user-facing behaviour.
- `DEV-INFRASTRUCTURE.md` (if it exists) — build, dev server,
  versioning, or scripts.

**Hot sectional** — read by section only:

- `pm_skills/project/backlog.md` — read only the **Active** section
  (open work: Current, Next, Icebox). Shipped work is not here — see
  `trajectory.md`.
- `pm_skills/project/decision-log.md` — read only the **latest 10
  entries**. Search older entries on demand when prior-decision
  context is needed.

**Warm** — read on demand, not auto-read every task:

- `pm_skills/project/trajectory.md` — the shipped-work narrative. Read
  during `roadmap-refactor.md`, release work, or when reconstructing
  what already shipped.

**Cold** — never auto-read:

- `pm_skills/project/wish-list.md` — capture inbox for unscoped ideas.
  Read only during an explicit triage pass (see "Capturing deferred
  ideas" below); never auto-load.
- `pm_skills/project/archive/*.md` — historical content moved out of
  hot files. Search via grep when explicitly relevant; never auto-load.

### Memory size budgets

Memory files have word/entry budgets: **hard, prunable** limits on
accreting files (`file-map.md`, the sectional `backlog.md` /
`decision-log.md`, `trajectory.md`) and **soft** size guidelines on
reference docs (see the table). The end-of-task update check flags
overruns and proposes running `pm_skills/prompts/prune-memory.md`. Do
not auto-prune — always propose first.

| Scope | Soft limit | Action when exceeded |
| --- | --- | --- |
| Reference doc (`README`, `brief.md`, `architecture.md`, `conventions.md`, + project standards/process/infra docs) | soft ~3,500 words each | Not a prune target — reference docs don't accrete. If one is genuinely bloated, tighten it or split detail into a permanent contract file; never strip to hit a number. |
| `file-map.md` (accreting) | 2,000 words | Propose `prune-memory.md`: strip accreted history (task tags, dates, test counts) to `archive/file-map-*-historical.md`, keep current roles. Floor = the irreducible current-role list; on a large codebase that may exceed 2,000, which is fine — strip noise, not signal. |
| Every-task read load | structural (no aggregate word cap) | A fixed sum fires permanently on a mature project (≥ 5 hot files × the 2,000 file budget > any flat cap), so there is none. Healthy = each file within its own row above. If the always-read set keeps growing, review whether a hot read should move to _conditional_ or _warm_, or whether a reference doc has bloated. |
| `backlog.md` Active | 1,500 words **and** ~40 open items | Propose `roadmap-refactor.md`: restructure by lifecycle, evict done-work, dedupe stale rounds. |
| `backlog.md` shipped work | 0 — done `[x]` items do not live here | Move each to `trajectory.md` (one line) + `decision-log.md` (the why). Flagged by `end-of-task.md` and `doctor-memory.md`. |
| `trajectory.md` | 2,000 words | Propose archiving the oldest phases to `archive/trajectory/`, keeping `archive/INDEX.md` current. |
| `decision-log.md` live log | 20 entries (primary) **or** ~6,000 words | Propose an archive split to `archive/decision-log-*.md` (by whole month; by date-range when one month alone exceeds a budget). Entry count is the primary trigger; the word budget is a secondary guard against runaway entries — a healthy entry is ~150–300 words (Decision, Rationale, Alternatives, Link), not an essay. Keep at least the read-tier latest 10 live. |
| `decision-log.md` oldest entry age | 90 days | Propose an archive split, oldest first — but only when ≥ 5 entries lie beyond the latest-10 read-tier floor (live log ≥ 15). Below that, note the overrun and skip: on low-velocity / sporadic projects the age budget keeps tripping with little to move, so the entry-count and word budgets are the meaningful triggers. |
| `wish-list.md` open items | 25 items | Propose a triage pass (promote each into `backlog.md`, or cut). Never archive — the wish-list shrinks by triage, not by moving content to `archive/`. |
| `archive/` chunk | 8,000 words **or** 20 entries per file | Split larger chunks by sequence/date so each loads in one read. Maintain `archive/INDEX.md`. |

### Workflow

1. For non-trivial work, follow the 4-stage prompt sequence in
   `pm_skills/prompts/`: `scoping.md` → `design-options.md` →
   `implementation-plan.md` → `validation.md`. Get user sign-off on
   scope before writing code. For small tasks, use
   `pm_skills/prompts/quick-task.md` instead.
2. Search the full source tree before proposing changes. Check for
   existing tuneable values and UI controls before adding new ones.
3. Exception: if the user explicitly invokes `auto-jazz` or
   `auto-jazz-lite` (see `pm_skills/integrations/`), run those
   workflows without waiting for scope or plan approval. Make the
   best conservative decision at each gate, state the assumption in
   one line, and continue. Only ask the user a question if there is
   a genuinely blocking ambiguity. All other rules in this file
   (source-tree search, project-memory housekeeping, memory size
   check, minimal-change discipline, hard rules) still apply.

---

## Capturing deferred ideas (wish-list)

When an out-of-scope idea surfaces mid-task, append it to
`pm_skills/project/wish-list.md` as a single line and keep working. Do
not act on it, scope it, estimate it, or discuss it unless the user
asks — capturing the one line is the whole interaction.

- **User trigger.** "Park it" (or similar) means: append the idea to
  the wish-list and move on. See `pm_skills/prompts/corrections.md`.
- **Boundary.** The wish-list is the **pre-triage** inbox — raw,
  unjudged ideas. The backlog **Icebox** is **post-triage** — ideas
  already judged worth keeping. Promote items from the wish-list
  _into_ `backlog.md`; never treat the wish-list as a second backlog.
- **Triage, not hoarding.** Drain the wish-list during
  `pm_skills/prompts/next-batch.md` (and when the `end-of-task.md`
  size check flags it): promote each item into the backlog, or cut
  it. Promoting moves the line out; cutting deletes it. No history is
  kept in the wish-list.

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
- **Canonical cell keys `cell.0 … cell.8`** (per EXT-1). The centre
  `qr:audience-url` cell is never analysed; analyse the 8 outer cells only.
  Display labels like "top left" are presentation-only, never keys in code.
- **EXT-1 is the only integration surface** with the exhibition system. Never
  reach into its internals and never modify its repo.
- **The `EventBus` is the only cross-module channel** (see "Event naming").
  The engine never touches the DOM directly.
- **Pluggable seams:** input via `FrameSource`, generation via
  `ImageGenerator`. The loop depends only on these interfaces, never on a
  concrete transport or service.
- **Always measure and report** analysis and generation time _separately_, and
  warn (amber/red) when a cycle cannot keep up with the interval.
- **Graceful degradation over correctness.** When ComfyUI or the source is
  unavailable, fall back visibly (placeholder generator / hold last frame)
  rather than stalling the loop.
- **A cycle must never overlap the next** — the scheduler guards this.

---

## Core data model

The canonical entities (typed in `src/config/types.ts`):

- **`Character`** — one of the recurring cast of 7; `id`, `name`, reference
  image, baseline appearance/clothing notes, and an `appearanceCount` used for
  balancing. The cast is loaded from `assets/characters/`.
- **`Archetype`** — a corporate-stock scene template; `id`, `label`, character
  count range, scene/composition/activity, baseline mood. Loaded from
  `assets/archetypes/corporate-archetypes.json`.
- **`CellKey`** — canonical `cell.0 … cell.8`. `cell.<centre>` carries the
  reserved `qr:audience-url` token and is excluded at the source/crop layer.
- **`CellAnalysis`** — per-cell vibe words + content hint + visual properties
  (brightness, colourfulness, saturation, energy, dominant hue).
- **`Analysis`** — overall vibe words + overall content summary + the
  per-cell `CellAnalysis[]`.
- **`ScenePrompt`** — the constructed generation prompt (positive/negative
  text, archetype, chosen cast, scene-response value).
- **`CycleRecord`** — the structured per-cycle session-log entry.
- **`PerformanceSession`** — duration, elapsed, state, and live control values.

Do **not** invent non-canonical cell keys, couple these models to a specific
transport/generator, or mutate `Character` references from the generation layer.

---

## Domain subsystems

- **Input (`FrameSource`)** — yields `Map<CellKey, ImageBitmap>` per cycle. The
  loop never knows the transport. The centre cell is excluded here (source /
  `gridCrop`), not in analysis. MVP impls: `FileSource`, `ScreenCaptureSource`.
- **Analysis (`Analyser`)** — pure, deterministic, downscaled canvas
  heuristics; no network and no ML model in the MVP. Produces per-cell results
  plus a combined overall summary.
- **Selection** — per cycle: pick an `Archetype`, then pick a cast subset sized
  to the archetype with balancing toward roughly equal appearances. Both are
  file-driven.
- **Generation (`ImageGenerator`)** — `comfyuiGenerator` (primary) and
  `placeholderGenerator` (fallback). Must report progress and duration, and
  degrade gracefully when ComfyUI is unreachable.
- **Cycle engine** — orchestrates the stages, emits `cycle:*` events, guards
  overlap, and hands timings to metrics. Owns nothing it can delegate.
- **Metrics** — measures analysis vs generation separately; computes
  last/3/5/session averages, the buffer, and the green/amber/red keep-up state.

---

## Relationship to the exhibition system

This app is a **standalone LAN consumer** of the **AI Jam Exhibition System
(v2)** (`djDAOjones/nottingham-contemporary-exhibition-2026-march`). That is a
separate project we **must not modify**. We integrate only through its shipped
**EXT-1 external-consumer contract**, mirrored locally at
`docs/exhibition-integration-contract.md`. Treat that contract as a stable
external API: consume `source`/composition data over the LAN Socket.IO + HTTP
API; never screen-scrape internals, masquerade as a display, or depend on
exhibition implementation details.

---

## Protected infrastructure

| Module | Role | Notes |
| --- | --- | --- |
| `pm_skills/` (except `project/`) | The pm-skills framework | Upgrade only via `pm_skills/integrations/upgrade.md`; don't hand-edit |
| `docs/exhibition-integration-contract.md` | EXT-1 external API (mirror) | Treat read-only; do not diverge from the exhibition repo |
| `src/core/eventBus.ts` | Sole cross-module channel | Don't replace with direct calls |
| `src/core/cycleEngine.ts` | The performance loop | Restructure only with approval |
| `src/sources/frameSource.ts`, `src/generation/imageGenerator.ts` | Stable seams | Keep interfaces stable; add implementations, don't break them |

Do not delete, rename, or restructure protected modules without explicit
approval.

---

## Event naming convention

All cross-module communication uses the typed `EventBus` with
colon-separated namespaces:

- `session:*` — `session:started`, `session:paused`, `session:resumed`,
  `session:stopped`, `session:reset`.
- `cycle:*` — `cycle:started`, `cycle:frame-captured`, `cycle:analysed`,
  `cycle:selected`, `cycle:prompt-built`, `cycle:generating`,
  `cycle:generated`, `cycle:completed`, `cycle:error`.
- `metrics:*` — `metrics:updated`.
- `source:*` — `source:connected`, `source:frame`, `source:lost`.
- `generator:*` — `generator:status` (ready / unreachable / error).
- `log:*` — `log:entry-added`.
- `ui:*` — `ui:control-changed`.

UI panels subscribe; services and the engine publish. Do not bypass the bus
with direct method calls between subsystems.

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

JSDoc is the documentation standard (TypeScript).

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

Tests protect invariants — behaviours that would do real damage if they
silently broke. Write a test to prove an invariant, not to chase a
coverage number; coverage is a warning light, never a target.

**Named categories, never "add tests" in the abstract.** When a change
warrants tests, cover the categories that apply: happy path, empty,
error, boundary, permission/gating, regression (one per fixed bug), and
a persistence round-trip (write → reload) for stateful changes.
**"Not applicable" is a valid outcome** — if no meaningful invariant is
at risk, say so rather than manufacture tests.

**Fast and hermetic.** Prefer in-process injection, fakes, and temp
directories over live servers and real I/O — fast enough to run on
every change.

**Two layers.** The automated safety net never replaces the manual gate
(real browsers, devices, permissions, rehearsal). Name what only a
human can verify.

**Hard rules.**

- Run build and tests after every change; if no runner exists yet,
  verify manually and note what was checked.
- Never silently delete, skip, or weaken a test to make a change pass.
  If a test is genuinely obsolete because the intended behaviour
  changed, say so and update or remove it as part of the approved
  change.
- Never write hollow tests (assertion-free, snapshot-everything, or
  mocking the unit under test). A test that cannot fail protects
  nothing.
- Rigour ramps with maturity; before invariants stabilise (e.g. the
  first MVP build), deferring tests and saying so is correct.

Tooling and project-specific policy (runner, config, what to test) live
in `pm_skills/project/conventions.md`.

---

## Files to never edit

- `dist/` — Vite build output, overwritten on every build.
- `docs/` — input reference docs; `exhibition-integration-contract.md` mirrors
  the exhibition repo and must not be diverged locally.
- `node_modules/` — managed by npm.
- `package-lock.json` — managed by npm (commit it, but do not hand-edit).
- `pm_skills/` framework files (everything except `pm_skills/project/`) —
  upgrade via the workflow, never hand-edit.

See `DEV-INFRASTRUCTURE.md` for the authoritative list.

---

## Persistence checklist

The app persists live control/session settings to `localStorage` (session logs
are exported as downloadable JSON, not persisted). When adding any control or
setting that should survive reload:

1. Add its default to `src/config/constants.ts`.
2. Include it in `appState` serialisation (`toJSON()`).
3. Restore it in `appState` deserialisation (`fromJSON()`) with a fallback
   default for missing/old keys.
4. Save on change (debounced) under the app's `localStorage` key.
5. Load on startup before wiring the UI.

---

## Document ownership

| Layer | Owns | Update when |
| --- | --- | --- |
| `AGENTS.md` | Hard rules, invariants, data model, anti-patterns | Major architectural or design decisions change |
| `UI-STANDARDS.md` | UI, accessibility, usability rules | New token systems or UI conventions established |
| `DEV-INFRASTRUCTURE.md` | Build, dev server, versioning, scripts | Build or deployment decisions change |
| `project/` memory files | Brief, architecture, backlog, wish-list, trajectory, file map, conventions, decision log | End of every task session |
| `project/archive/` | Historical content moved out of hot files, indexed in `archive/INDEX.md` | Only via `pm_skills/prompts/prune-memory.md` or `roadmap-refactor.md` |

When in doubt: unconditional invariant → `AGENTS.md`. UI convention →
`UI-STANDARDS.md`. Build/dev rule → `DEV-INFRASTRUCTURE.md`. Evolving
context → `project/`. Historical content → `project/archive/`.

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
- Letting the `wish-list.md` inbox become a write-only graveyard, or
  scoping or estimating its items at capture time. Capture is one
  line; judgement happens at triage.
- Leaving shipped (`[x]`) work in the backlog. Completed work moves to
  `trajectory.md` (one line) plus `decision-log.md` (the why); the
  backlog holds open work only.
- Letting the backlog become an audit trail of dated rounds, or
  narrating a shipped item in full in both the backlog and the
  decision-log. Compress on ship; run `roadmap-refactor.md` to repair
  drift.

Project-specific anti-patterns are in
`pm_skills/project/conventions.md` under
"Patterns to avoid".

- Inventing non-canonical cell keys (`top_left`) in code instead of
  `cell.0 … cell.8`.
- Analysing or cropping the centre `qr:audience-url` cell.
- Coupling the cycle, analysis, selection, or prompt logic to a specific
  `FrameSource` or `ImageGenerator`.
- Firing a generation call that can hang a cycle — always time-bound it and
  degrade.
- Reaching into the exhibition Hub beyond the EXT-1 contract.
- Hard-coding the ComfyUI URL or cycle intervals outside
  `src/config/constants.ts`.

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

Two token systems run side by side, both defined in `styles/tokens.css` as
CSS custom properties:

| System | Governs | Notes |
| --- | --- | --- |
| **Carbon conventions** (`--cds-*`-style) | Spacing scale, typography scale, layout grid, layer tokens, border tokens, interaction-state tokens | Implemented to match Carbon's **Gray 100 (dark) productive** theme; not imported from a Carbon package |
| **Project tokens** (`--app-*`) | Semantic UI colours, status colours (keep-up green/amber/red), the output-stage surface | Maps onto Carbon layers but adds performance-instrument semantics |

The app uses Carbon's **dark productive theme (Gray 100)** as its base — it
suits a darkened gallery control station and lets the generated image stand
out. Where a Carbon dark token only meets AA, override it in the project layer
to reach the AAA **7:1** target.

Do not collapse one system into the other. When adding a token, decide which
system owns it: structural/spacing/type/state → Carbon layer; semantic
colour/status/brand → project layer. Never hard-code a raw colour or px value
in a component when a token exists.

---

## Usability heuristics

Nielsen's heuristics are **hard rules**, not aspirations.

### Content and form (Carbon rules)

- **Sentence case** for all UI text.
- Every input must have a visible label. No colons after labels.
- Visible label text must match the accessible name.
- Labels: concise, 1–3 words where practical.
- Helper text only when it prevents error, clarifies format, or
  explains consequence.
- Prefer native HTML form controls before custom ARIA widgets.
- Use user language, not implementation terms.

### System status

- Every async action must show status: loading, progress, success,
  or error. The UI must never appear frozen.
- Important status changes must be announced programmatically, not
  only shown visually.
- Auto-save, export, import, and recovery states must be visible.

### Empty and no-data states

- Every panel must have an intentional empty state explaining what
  belongs here and what to do next.
- Distinguish "nothing yet," "filtered out," "failed to load," and
  "not available." No blank panels or silent failures.
- Loading states must preserve layout stability — no content jumps.

### User control and freedom

- Provide cancel, undo, or back-out routes for non-trivial actions.
- Destructive actions require confirmation or reliable undo.
- Do not trap users in modes, overlays, or incomplete flows.

### Consistency

- Same words, icons, patterns, and spacing for the same concepts
  throughout. Do not create synonyms for existing concepts.
- Follow existing Carbon conventions and established design tokens.

### Error prevention and recovery

- Constrain invalid input, validate early, disable impossible actions.
- Prefer safe defaults. No silent propagation of invalid states.
- Error messages must say what happened and what to do next.
- Errors must be specific, human-readable, and linked to the relevant
  control. No vague "Something went wrong" without actionable detail.

### Recognition over recall

- Keep key controls visible. Show current selection, mode, and state
  explicitly. Surface context near the point of action.

### Flexibility and efficiency

- Support novice and repeat use. Expose shortcuts for common actions.
- Provide click, tap, and keyboard alternatives — avoid drag-only
  interactions.

### Minimalist design

- Keep interfaces lean and task-relevant. No decorative chrome,
  redundant copy, or competing calls to action.

### Motion discipline

- Motion must be subtle, purposeful, and easy to ignore.
- Respect `prefers-reduced-motion`. No motion as the only carrier
  of meaning. No content flashing more than 3 times per second.

### Help and contextual guidance

- Provide contextual help (tooltips, helper text, inline guidance)
  for non-obvious controls and workflows.
- Help content must be task-focused, concrete, and brief.

---

## Accessibility — WCAG 2.2 AAA by default

Target **WCAG 2.2 AAA** for all applicable UI. Document exceptions
explicitly. Where a criterion cannot reasonably apply, record it in
implementation notes.

### Perceivable

- Text contrast: **7:1** (large text may use **4.5:1** where WCAG
  permits).
- Do not rely on colour alone for state, status, or meaning.
- Link text must make sense on its own — no "click here."
- Use headings and landmarks for substantial content. Provide text
  alternatives for meaningful non-text content.

### Operable

- All functionality must be keyboard operable without traps.
- Focus order must be logical. Focus indicators must be visible and
  not obscured by sticky headers or overlays.
- Pointer targets: **≥ 44 × 44 CSS px** unless a WCAG exception
  applies.
- Do not require path-based gestures or fine motor precision when a
  simpler alternative exists.
- Provide pause/stop/hide for moving or auto-updating content.
- Warn before timeouts that could cause data loss.

### Understandable

- Predictable behaviour. No unexpected context changes on focus or
  input.
- Form instructions and validation near the relevant control.
- Visible labels and accessible names must match for speech input.

### Robust

- Semantic HTML before ARIA. No ARIA is better than bad ARIA.
- Dynamic updates (loading, validation, errors) exposed
  programmatically. Custom widgets must expose role, name, value,
  and state correctly.

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
- **Runtime dependencies require explicit approval. The current count is
  zero** — the browser platform (Canvas, `getDisplayMedia`, `fetch`,
  `WebSocket`) covers the MVP.
- **Dev dependencies** (`vite`, `typescript`, `vitest`, `@types/*`) are
  allowed when justified by the architecture.
- Run `npm install` after cloning. Do not commit `node_modules/`.

---

## Canonical scripts

| Script | Command | Purpose | When to use |
| --- | --- | --- | --- |
| `dev` | `vite` | Dev server + HMR at `localhost:5173`; proxies `/comfy` to ComfyUI | Day-to-day development |
| `build` | `tsc --noEmit && vite build` | Type-check then production build to `dist/` | Before deploy |
| `preview` | `vite preview` | Serve the built `dist/` locally | Verify a build |
| `test` | `vitest run` | Run tests once | After every change |
| `test:watch` | `vitest` | Tests in watch mode | During development |

Do not add scripts without updating this table.

---

## Dev server

- **URL:** `http://localhost:5173` (Vite default).
- **Start:** `npm run dev`.
- **Serves:** `index.html` + `src/` via Vite with HMR.
- **ComfyUI proxy:** `/comfy/*` is proxied to `http://127.0.0.1:8188` (HTTP)
  and `/comfy/ws` to the ComfyUI WebSocket, so the browser talks to ComfyUI
  same-origin (no CORS). The target lives in `vite.config.ts`; the base path
  in `src/config/constants.ts`.

All development uses this URL. Do not hard-code alternative ports.

---

## Build system

- **Bundler:** Vite (Rollup under the hood).
- **Entry point:** `index.html` → `src/main.ts`.
- **Output directory:** `dist/` (static; deployable to any static host).
- **Format / target:** ESM, ES2020.
- **Source maps:** enabled.
- **Minification:** production builds only.
- **Static assets:** files under `assets/` ship as-is; large/binary character
  references are fetched at runtime, not bundled.

The output directory `dist/` is **read-only** — never hand-edit it; it is
overwritten on every build.

---

## Version management

Format: semantic `major.minor.patch` in `package.json` (starts at `0.1.0`).

- Bump **manually**: minor on a shipped milestone, patch for fixes, major
  reserved for a breaking change after v1.
- No build-stamp automation in the MVP; add one only if a release process
  needs it.

---

## Deployment

- **Target (MVP):** runs locally — `npm run dev`, or `npm run build` +
  `npm run preview` / any static file server on the venue machine.
- **Constraint:** must be reachable on the same machine/LAN as the Hub and
  ComfyUI (EXT-1 is LAN-only).
- **Post-build check:** load the dev/preview URL, run one cycle, confirm the
  output renders and timing metrics populate.
- A hosted static deploy is possible later but is **not** the primary mode —
  the app is a local instrument.

---

## Utility scripts

None beyond the standard `dev` / `build` / `preview` / `test` cycle in the
MVP. Add any here (with purpose and safety notes) when introduced.

---

## Configuration strategy

- **Tuneable values:** `src/config/constants.ts` — intervals (10–120s, default
  30s), sensitivity range (0–400%), keep-up thresholds, ComfyUI base path,
  grid layout.
- **Domain types:** `src/config/types.ts`.
- **Design tokens:** `styles/tokens.css`.
- **User-editable content (no code change):** `assets/` — `characters/`,
  `archetypes/corporate-archetypes.json`, `prompts/*.md`,
  `workflows/comfyui-default.json`, `fixtures/`.

Do not scatter configuration across service modules.

---

## Editor config

The project root contains `.editorconfig` for mechanical style enforcement:
UTF-8, LF line endings, 2-space indentation, final newline, trailing
whitespace trimmed (except in Markdown).

---

## Files agents must not hand-edit

- `dist/` — Vite build output, overwritten on every build.
- `docs/` — input reference docs; `exhibition-integration-contract.md` mirrors
  the exhibition repo and must not be diverged locally.
- `node_modules/` — managed by npm.
- `package-lock.json` — managed by npm. Commit it, but do not hand-edit.
- `pm_skills/` framework files (except `pm_skills/project/`) — upgrade via the
  workflow.

<!-- FILE: README.md -->

# Corporate Image Generator

A local, browser-based generative-art instrument for live gallery performance.
It consumes the **AI Jam Exhibition System (v2)** Hub's live 3×3 Art Wall over
the shipped **EXT-1 LAN contract**, captures a still on a configurable interval
(default 30s), runs lightweight local analysis on the 8 outer grid cells, and
generates a **corporate-stock-style image** featuring a recurring cast of 7
supplied characters — via a local **ComfyUI** service. Over a performance the
incoming imagery progressively drives the characters' mood, behaviour, and
eventually clothing, from subtle realism to exaggerated "overdrive." It is a
timed performance instrument with live controls and keep-up metrics — a
generative artwork, not a productivity tool.

## Requirements

- Node 18+ and npm (dev tooling only).
- A modern Chromium-based browser (for `getDisplayMedia` screen capture).
- **ComfyUI** running locally for real generation (see below). Without it the
  app degrades gracefully to a placeholder generator.
- Runs on the same machine / LAN as the exhibition Hub (EXT-1 is LAN-only).

## Run

```sh
npm install
npm run dev          # → http://localhost:5173
npm run build        # → dist/  (static, deployable)
npm test             # Vitest (run once)
```

The dev server proxies `/comfy` → `http://127.0.0.1:8188`, so start ComfyUI
with its API reachable there:

```sh
# in your ComfyUI checkout
python main.py --listen 127.0.0.1 --port 8188
```

MVP input works fully offline via **FileSource** (bundled fixture grids) and
**ScreenCaptureSource** (`getDisplayMedia` on the Art Wall tab). Live Hub input
(Tier B / Tier C) is milestone 2.

## Key infrastructure

- `src/core/cycleEngine.ts` — the timed capture→analyse→select→generate→display
  loop; emits `cycle:*` events.
- `src/core/eventBus.ts` — the only cross-module communication channel.
- `src/sources/` — pluggable `FrameSource` (File, ScreenCapture).
- `src/analysis/heuristicAnalyser.ts` — local canvas analysis.
- `src/generation/` — `ImageGenerator` seam; `comfyuiGenerator` (primary) +
  `placeholderGenerator` (fallback); `promptBuilder`.
- `assets/` — user-editable content: characters, archetypes, prompts, and the
  ComfyUI workflow template. Edit without touching code.
- `docs/` — input reference docs: the product `source-notes.md` and the
  `exhibition-integration-contract.md` (EXT-1).

## Invariants / gotchas

- **Zero runtime dependencies.** Adding one requires approval (see
  `pm_skills/project/architecture.md`).
- **Do not modify the exhibition repo.** Integrate only via the EXT-1 contract.
- The Art Wall centre cell holds the `qr:audience-url` token — **ignore it**;
  analyse the 8 outer cells only.
- `dist/` is build output (read-only). `docs/` holds inputs, not build output.
- Carbon-style UI is implemented in our own code — **no Carbon packages**.

## Project management

This project uses the **pm-skills** framework. Permanent contracts live in
`AGENTS.md`, `UI-STANDARDS.md`, and `DEV-INFRASTRUCTURE.md`; living project
memory (brief, architecture, backlog, decisions) lives in
`pm_skills/project/`. Read `AGENTS.md` → "Before every task" first.

<!-- FILE: corporate-image-generator-kickoff-prompt.md -->

# Kickoff prompt — AI-Responsive Corporate Image Generator

> **How to use this file.** Open a new Cascade chat **inside the new project
> folder** (the one that already has `pm_skills/` scaffolded). Copy the source
> notes in first (see "Before you paste" below), then paste everything between
> the `=== PASTE BELOW ===` markers as your first message.

---

## Before you paste (one-time setup in the new folder)

1. Copy two files from the exhibition repo into the new project so the new
   chat can read them:
   - `_user files/ai_responsive_corporate_image_generator_notes.md` →
     `docs/source-notes.md` (the product brief input).
   - `runbooks/external-consumer.md` →
     `docs/exhibition-integration-contract.md` (the **shipped EXT-1**
     integration contract — the authoritative, code-matched API for consuming
     exhibition video; see below).
2. Confirm the new folder already contains `pm_skills/` (you said you'll run
   `pm_skills/integrations/init-project.md` there).
3. Then paste the prompt below.

---

=== PASTE BELOW ===

You are initializing a brand-new project. Do **not** write feature code yet —
your job this session is to run project initialization and get sign-off on the
foundation.

## What we're building

A **local, browser-based generative-art application** for a live gallery
performance. It receives a live video feed (a 3×3 image grid) from an existing
exhibition system, captures a still frame on a configurable interval
(default 30s), runs **lightweight local image analysis** on the 8 outer grid
cells, and uses that analysis to generate a **corporate-stock-style image**
featuring a recurring cast of **7 supplied characters**. Over a performance,
the incoming imagery progressively influences the mood, behaviour, and
eventually clothing of the characters — from subtle realism up to exaggerated,
unstable "overdriven" output. It runs as a timed performance instrument with
live controls, ramps, and performance metrics.

The full intent, controls, and open questions are in **`docs/source-notes.md`**
— read that file first and treat it as the authoritative product brief input.

## Your first actions

1. Read `docs/source-notes.md` and `docs/exhibition-integration-contract.md`
   in full.
2. Confirm `pm_skills/` exists, then **load and follow
   `pm_skills/integrations/init-project.md`** step by step. Gate on my approval
   at each step (brief → architecture → backlog → conventions → README →
   AGENTS.md → UI-STANDARDS → DEV-INFRASTRUCTURE → scaffold → readiness check).
3. Use the source notes as the raw material for the brief, architecture, and
   backlog, and the integration contract as the fixed external API for the
   video input. Where the notes flag uncertainty, use the "Upstream system
   facts" below to resolve it, and surface anything still genuinely open as
   brief "open questions" for me to decide.

## Upstream system facts (this resolves the notes' biggest unknowns)

The source notes guess the upstream app is called **"NTU AI Gem"** and are
unsure how it exposes video. Here are the real facts — use them:

- The upstream system is the **AI Jam Exhibition System (v2)** — a live
  multi-artist art-jam hub. GitHub:
  `djDAOjones/nottingham-contemporary-exhibition-2026-march`. It is a separate
  project; **we must not modify it.** Our app is a standalone consumer that
  integrates only through the contract below.
- The **3×3 grid the notes describe already exists**: it is the **Art Wall**, a
  composed display of up to **9 cells** (`cell.0 … cell.8`), one live video
  **source** per cell. The **centre cell holds the audience-URL QR token**
  (`qr:audience-url`), not artwork — which lines up exactly with the notes' "the
  central cell can be ignored." Analyse the 8 outer cells.
- Media flows **peer-to-peer**; the Hub does signalling/allocation only and
  **never relays full video** (the one exception is the low-rate preview JPEGs
  used by Tier B below).

### Upstream integration is already shipped and sanctioned (EXT-1 + EXT-2, 2026-06-03)

The exhibition team **shipped a first-class external-consumer contract
specifically for this app** (ticket **EXT-1**). You do **not** need to
screen-scrape, masquerade as a display, or use Tauri / any native protocol. The
authoritative, code-matched contract is
`docs/exhibition-integration-contract.md` (copied from the exhibition repo's
`runbooks/external-consumer.md`) — **read it before designing the
architecture.** A sibling ticket, **EXT-2**, shipped a Solo Display
(`/solo`) + picker for native TouchDesigner/OBS screen-grab; this app doesn't
need it, but it's why per-source consumption is already battle-tested.

Both transports are **LAN-only** (the `sources` and `external:*` Socket.IO
rooms are refused over the public tunnel), so the generator must run on the
same machine or LAN as the Hub.

Three tiers, in priority order for this app:

**Tier B — preview-frame subscription `(recommended primary path)`**
Subscribe over Socket.IO to per-source JPEG stills and assemble the grid
yourself:

- Connect Socket.IO to the Hub origin (e.g. `http://<hub-lan-ip>:3000`).
- `emit('room:join', { room: 'sources' })`; await the `{ ok: true }` ack.
- Listen for `source:preview-frame` → `{ sourceId, data }` (a JPEG data URL,
  ~160×90, ~0.5 fps **per source**), plus `source:advertised` /
  `source:revoked`.
- Map sources to grid cells with `GET /api/compositions/art-wall` →
  `cells: { "cell.0": "<sourceId>", … "cell.8": … }`; subscribe to
  `composition:updated` for live re-binds. Ignore the `qr:audience-url` centre
  cell.

Why this is the right default: 0.5 fps matches the 30–60 s analysis cadence
exactly (you sample one frame per cycle anyway), and you get **clean
per-source stills** — which map *directly* to the notes' "analyse the 8 cells
independently," with **no grid-cropping step at all**. 160×90 is adequate for
lightweight mood/vibe analysis. No WebRTC, ICE, or TURN.

**Tier C — first-class `external` WebRTC consumer `(full-fidelity escalation)`**
When you need full frame-rate / resolution (e.g. live compositing or a
low-latency display), establish a real WebRTC consume using the **shipped
`consumerType: 'external'`**:

- `GET /api/media/ice-config`; `emit('room:join', { room: 'external:<yourId>' })`.
- `POST /api/sources/:sourceId/consumers` with
  `{ consumerType: 'external', consumerId: '<yourId>' }` — `consumerId` **must**
  equal the room id so signalling routes back to you.
- Handle `media:signal` offer/ICE, reply with answer/ICE, then
  `DELETE /api/consumers/:consumerId` to tear down. The contract doc points at
  the reference `createIncomingPeer` handshake to port. Each consumed cell = one
  consumer against the mesh ceiling.

**Option A — screen-capture the Art Wall tab `(offline / no-Hub dev fallback)`**
`getDisplayMedia()` on `http://127.0.0.1:3000/art-wall` gives the assembled grid
as one stream with zero coupling. Keep this **only** as a dev fallback for when
the Hub isn't reachable, or for a quick demo — Tier B is the production path.

**Design the input layer as a pluggable `FrameSource`** that yields a map of
`cellKey → still image` per cycle: a `PreviewFrameSource` (Tier B, primary), a
`WebRtcFrameSource` (Tier C), a `ScreenCaptureSource` (Option A, crops one
composite into 3×3), and a `FileSource` for offline tests. The analysis layer
consumes `cellKey → image` and never cares which source produced it.

## Pre-answers to the notes' "Decisions still required" (section 24)

Resolved by the facts above — fold these into the brief:

- **Upstream name / interface:** AI Jam Exhibition System v2; consumed via its
  **shipped EXT-1 external-consumer contract**
  (`docs/exhibition-integration-contract.md`).
- **How video is exposed:** over the Hub's LAN Socket.IO + HTTP API —
  per-source preview-frame JPEGs (Tier B) or a first-class `external` WebRTC
  consume (Tier C). Screen-capturing the Art Wall page is only a dev fallback.
- **Input type:** for the MVP, **per-source JPEG stills** pushed over the
  `sources` Socket.IO room (~0.5 fps, 160×90), mapped to grid cells via
  `GET /api/compositions/art-wall`. No raw camera, no grid-cropping needed.
- **Fixed 3×3?** Yes — the Art Wall is a fixed 3×3 grid (`cell.0 … cell.8`);
  ignore the centre `qr:audience-url` cell.
- **Per-cell vs whole-grid analysis:** do **both** — Tier B already hands you
  per-source (per-cell) stills; analyse each, then derive a lightweight overall
  summary (per the notes).

Still genuinely open — raise these as brief "open questions" for me:

- Local image-generation model/stack on an **M1 Max / 32 GB** that keeps a
  recurring 7-character cast reasonably consistent (the hard part — see
  guardrails).
- How faithful character likeness must be vs. how far it may drift at high
  sensitivity.
- Fully-local generation vs. a local control surface driving an external
  generation service (the notes say either is acceptable).
- Still images only vs. crossfading between outputs.
- Whether prompt construction is visible/editable in the UI.
- Whether performance settings are saved as reusable presets.

## Target platform & hard constraints

- Runs locally on an **Apple MacBook Pro, M1 Max, 32 GB RAM**, possibly while
  other software is running — preserve performance headroom.
- **Browser-based** control panel + output display.
- **Local-first AI:** image analysis runs locally; image generation runs
  locally if feasible, otherwise behind a local interface to an external
  service (decide during architecture).
- Default cycle: one analyse-and-generate pass every **30s**, adjustable
  (~10–120s); the system must **measure and report** actual analysis and
  generation times separately and warn when it can't keep up.
- **MVP-first.** Build the basic capture → analyse → select → generate →
  display loop with timing metrics before ramps, clothing logic, fashion files,
  overrun/fade, and >100% overdrive behaviour (the notes give an explicit MVP /
  later split — follow it).

## Engineering guardrails

- **Do not modify the exhibition repo.** Integrate only through the shipped,
  documented EXT-1 contract (`docs/exhibition-integration-contract.md`); treat
  it as a stable external API and don't reach into exhibition internals.
- **LAN-only:** the generator must run on the same machine/LAN as the Hub (the
  `sources` and `external:*` rooms are refused over the public tunnel).
- **De-risk character consistency early** — it's the riskiest unknown. Prove a
  recurring-cast approach on a couple of characters before committing the
  architecture.
- Keep **configurable assets editable without code changes**: character
  references, fashion references, corporate archetypes, and baseline/response
  prompt text — file-driven (e.g. JSON/Markdown under `assets/`).
- **Minimal runtime dependencies**; justify any you add.
- Maintain a **structured session log** (per-cycle: timings, analysis,
  archetype, characters, prompt, output, warnings) for reproducibility.
- This is a **generative-art instrument**, not a productivity tool — favour
  controllability and graceful degradation over correctness guarantees.

Start by reading `docs/source-notes.md` and
`docs/exhibition-integration-contract.md`, confirm you can see `pm_skills/`,
then begin step 1 of `pm_skills/integrations/init-project.md` and present the
draft brief for my review.

=== PASTE ABOVE ===

