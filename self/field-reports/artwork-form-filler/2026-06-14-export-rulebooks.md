<!-- field-report: project=artwork-form-filler · date=2026-06-14 · type=export
     · pm-skills=2.2.1 (installed with the initial commit 2c02f80 on 2026-06-13; never upgraded)
     · source=rulebooks and contract files at 02d414590a5f4a66714be8764b0039a5e4e7bc7a, from Git blobs, taken 2026-09-24 by Claude Code (read from a scratch clone assembled from the remote and the checkout's objects, every ref set to its value at the cut-off 2026-09-24T11:40:00.000Z; content-addressed, so identical to the checkout's HEAD)
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained; uncommitted memory, session logs and the bundle stay in the local lane -->

# Rulebook export

Snapshot: `02d414590a5f4a66714be8764b0039a5e4e7bc7a`. Files: `AGENTS.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md`, `README.md`.

<!-- FILE: AGENTS.md -->

# AI Agent Rules

<!-- NOTE: This file is a template. Complete init.md Step 6 to populate
     the CUSTOMISE placeholders. Until then, the project memory files
     in pm_skills/project/ are the primary references. -->

## Product identity

**Artwork Form Filler** — a browser-only React + TypeScript tool that fills
a **target shape** with many **source silhouette images**, arranging them so
every placed silhouette is complete (never clipped), never overlaps another,
never extends outside the target, and the result does not look tiled. It
renders to canvas and exports a transparent PNG.

The canonical mental model is **raster masks**: the target and every source
are binary pixel masks; placement is a search that tests a transformed
source mask for full containment in the target mask and non-collision with
an occupancy mask. It is **not** a vector/SVG nester, a tiling/pattern fill,
or a server-rendered app — all work happens client-side on the canvas.

---

## Who you are working with

The maintainer is a vibe coder who owns macro structure, UX direction,
and conceptual design — but not deep implementation. Do the work; don't
explain concepts back unless asked.

---

## Before every task

<!-- CUSTOMISE: README.md below refers to the project's own root README
     (created at init Step 5). If init is incomplete, skip this section. -->

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
| `backlog.md` Active | 1,500 words **or** ~40 open items (whichever trips first) | Propose `roadmap-refactor.md`: restructure by lifecycle, evict done-work, dedupe stale rounds. A low item count with high words means items are too verbose — tighten them. |
| `backlog.md` shipped work | 0 — done `[x]` items do not live here | Move each to `trajectory.md` (one line) + `decision-log.md` (the why). Flagged by `end-of-task.md` and `doctor-memory.md`. |
| `trajectory.md` | 2,000 words | Propose archiving the oldest phases to `archive/trajectory/`, keeping `archive/INDEX.md` current. |
| `decision-log.md` live log | 20 entries (primary) **or** ~6,000 words | Propose an archive split to `archive/decision-log-*.md` (by whole month; by date-range when one month alone exceeds a budget). Entry count is the primary trigger; the word budget is a secondary guard against runaway entries — a healthy entry is ~150–300 words (Decision, Rationale, Alternatives, Link), not an essay. Keep at least the read-tier latest 10 live. |
| `decision-log.md` oldest entry age | 90 days | Propose an archive split, oldest first — but only when ≥ 5 entries lie beyond the latest-10 read-tier floor (live log ≥ 15). Below that, note the overrun and skip: on low-velocity / sporadic projects the age budget keeps tripping with little to move, so the entry-count and word budgets are the meaningful triggers. |
| `wish-list.md` open items | 25 items | Propose a triage pass (promote each into `backlog.md`, or cut). Never archive — the wish-list shrinks by triage, not by moving content to `archive/`. |
| `archive/` chunk | one epoch per file (whole month / migration boundary) | Chunk cold archives by **sequence boundary for INDEX browsability**, not size — they're never auto-read (grep + line-range only), so word count barely matters and an epoch bounds its own growth. Sub-split a single epoch only if it's genuinely unwieldy to grep; never split or merge epochs just to hit a number. Maintain `archive/INDEX.md`. |

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

- **Placement correctness is the product.** A placement is only valid if
  every visible source pixel lands on an inside-target pixel (full
  containment, no clipping) and no visible source pixel collides with the
  occupancy mask (no overlap, honouring spacing). Never relax these tests to
  make more pieces fit.
- **Alpha-aware, never bounding-box.** All containment, collision, and
  trimming use the real visible (alpha) silhouette, never the rectangular
  image box.
- **Generation must be deterministic for a given seed + settings**, and must
  run chunked so the UI never freezes.
- **Internal placement may be lower-resolution; final export must be
  full-quality.** Placement maths runs on downscaled masks; rendering
  composites the original source images.

---

## Core data model

- **`Mask`** — `{ width, height, data: Uint8Array }` where `data[i]` is 1 for
  an inside/visible pixel and 0 otherwise. The target is one mask; each
  trimmed source is one mask.
- **`SourceItem`** — a loaded source: original image + its trimmed alpha
  mask + visible-pixel area.
- **`Placement`** — `{ sourceIndex, x, y, scale, angle }` describing one
  committed silhouette. The composition is an ordered list of placements.
- **`Occupancy`** — a single mask accumulating all committed placements
  (dilated by spacing) used for collision tests.

Do **not** represent silhouettes as rectangles/bounding boxes for any
containment or collision decision, and do **not** introduce a tiling/grid
fill — placement is a randomised, seed-driven search.

---

<!-- CUSTOMISE: Add a "Relationship to [Original]" section if this project
     was forked from or shares history with another codebase. -->

---

<!-- CUSTOMISE: Add a "Protected infrastructure" table for modules that
     must not be deleted, renamed, or restructured without approval.
     See init.md Step 6 for example shape. -->

---

## Communication pattern

No event bus or global store. Pure functions in `src/lib/` communicate by
direct import; React state is lifted to `App.tsx` and passed down via props.
Generation is an async, chunked routine that yields to the event loop and
reports progress through a callback.

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

<!-- CUSTOMISE: JSDoc is the default for JS/TS. Adjust for other languages
     (e.g. docstrings for Python). -->

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

Concrete project list (see `DEV-INFRASTRUCTURE.md`):

- `dist/` — Vite build output, overwritten on every build.
- `node_modules/` — managed by npm.
- `package-lock.json` — managed by npm; commit it but do not hand-edit.
- Build output directories.

See `DEV-INFRASTRUCTURE.md` for the concrete list of protected paths.

---

<!-- CUSTOMISE: If the project has a persistence layer, add a checklist
     covering every step needed for a new property to survive reload.
     See init.md Step 6 for example shapes (manual serialisation, ORM). -->

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

Project-specific anti-patterns:

- Using an image's rectangular bounding box (instead of its alpha silhouette)
  for any containment, collision, or trim decision.
- Introducing a grid/tiling/pattern fill — placement is a randomised,
  seed-driven search.
- Relaxing the containment or collision test to fit more pieces.
- Doing placement maths on full-resolution images, or running generation
  synchronously without yielding to the event loop.

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

All design tokens live in `styles/tokens.css` as CSS custom properties
prefixed `--aff-`. They implement Carbon's productive (g10 light) design
language in the project's own code — the Carbon npm package is **not** a
dependency.

| Group | Governs | Examples |
| --- | --- | --- |
| **Colour** | Backgrounds, layers, text, borders, interactive, support | `--aff-layer`, `--aff-text-primary`, `--aff-interactive`, `--aff-support-error` |
| **Spacing** | Carbon spacing scale (2–48px) | `--aff-sp-1` … `--aff-sp-9` |
| **Typography** | Font stack and Carbon productive type scale | `--aff-font-sans`, `--aff-type-body`, `--aff-type-heading` |
| **Sizing / borders / focus** | Control heights (≥ 44px), border + focus widths | `--aff-control-height`, `--aff-focus-width` |
| **Motion** | Durations + easing, zeroed under `prefers-reduced-motion` | `--aff-dur-fast`, `--aff-ease` |

Rules:

- Use a token for any colour, spacing, type, border, or motion value. Do not
  hard-code ad hoc UI values where a token exists.
- Text colours are chosen for **7:1** contrast on their surface (AAA). Do not
  introduce lighter text for essential content.
- Layout and component rules live in `styles/app.css`; `tokens.css` holds
  values only. Keep that separation.

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

<!-- NOTE: This file is a template. It contains CUSTOMISE placeholders
     that must be populated before it can serve as an authoritative reference.
     Complete the kickstart process (init.md Step 8) to fill them in.
     If this project has no build step, dev server, or package manager,
     this file can be removed from the boilerplate. -->

This file defines the permanent rules for how the project is built,
run, tested, versioned, and shipped. `AGENTS.md` references this file.
Read it before any task that involves the build system, dev server,
scripts, configuration, or deployment.

---

## Package management

Package manager: **npm** (`package.json` + `package-lock.json` in root).

- **Runtime dependencies:** `react`, `react-dom` only. Adding any other
  runtime dependency requires explicit approval.
- **Dev dependencies:** `vite`, `@vitejs/plugin-react`, `typescript`,
  `@types/react`, `@types/react-dom`, `vitest` — the build/test toolchain.
- Run `npm install` after cloning. Do not commit `node_modules/`.

---

## Canonical scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `vite` | Dev server with hot reload |
| `build` | `tsc && vite build` | Type-check + production build to `dist/` |
| `preview` | `vite preview` | Serve the production build locally |
| `test` | `vitest run` | Run unit tests once |
| `test:watch` | `vitest` | Tests in watch mode |

Do not add scripts without updating this table.

---

## Dev server

- **URL:** `http://localhost:5173`
- **Start:** `npm run dev`
- **Serves:** the app from source via Vite with hot module replacement.

All development and testing use this URL. Do not hard-code alternative ports.

---

## Build system

- **Bundler:** Vite (Rollup under the hood).
- **Entry point:** `index.html` → `src/main.tsx`.
- **Output directory:** `dist/` (read-only — never hand-edit; overwritten on
  every build).
- **Format:** ESM, browser target per Vite defaults.
- **Static files:** anything in `public/` is copied verbatim to `dist/`.

---

## Version management

Single source: the `version` field in `package.json`. Bump manually using
semver when shipping a meaningful change. No automated version stamping at
MVP.

---

## Deployment

Static host. `npm run build` produces `dist/`; deploy its contents to any
static file host (Netlify, GitHub Pages, etc.). No backend, no environment
variables required.

---

## Utility scripts

None beyond the canonical scripts above.

---

## Configuration strategy

- **Algorithm defaults / tuneable constants:** `src/lib/types.ts`
  (`DEFAULT_SETTINGS`) and `src/lib/placement.ts`.
- **Design tokens:** `styles/tokens.css` (Carbon-style colour, spacing,
  typography custom properties).
- **Layout / component styles:** `styles/app.css`.

Do not scatter tuneable constants across component files.

---

## Editor config

The project root contains `.editorconfig` (copied from
`pm_skills/scaffold/`) for mechanical style enforcement: UTF-8, LF line
endings, 2-space indentation, trailing whitespace trimmed.

---

## Files agents must not hand-edit

- `dist/` — Vite build output, overwritten on every build.
- `node_modules/` — managed by npm.
- `package-lock.json` — managed by npm; commit it but do not hand-edit.

<!-- FILE: README.md -->

# Artwork Form Filler

A browser-only tool that fills a **target shape** with many **source
silhouette images**, arranging them so every placed silhouette is complete
(never clipped), never overlaps another, never extends outside the target,
and the result does not look tiled. The composition renders to a canvas and
exports as a transparent PNG.

The mental model is **raster masks**: the target and every source are binary
pixel masks. Placement is a seed-driven search that tests a transformed
source mask for full containment in the target mask and non-collision with an
occupancy mask. It is *not* a vector nester or a tiling/pattern fill.

## Run it

Prerequisites: Node 18+ and npm.

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
npm test         # run unit tests (Vitest)
```

## How to use

1. Upload a **target mask** — a black/white image, a transparent PNG, or a
   simple silhouette. The opaque (or dark) area is the allowed region. Use
   **Invert mask** if detection picks the wrong side.
2. Upload one or more **source silhouettes** — ideally transparent PNGs.
   Transparent pixels are ignored; each source is trimmed to its visible
   bounds.
3. Adjust the controls (density, size range, spacing, edge padding, angle
   and size variation, seed, attempts, reuse mode) and press **Generate**.
4. **Regenerate** repeats with the same settings, **Randomise seed** picks a
   new layout, and **Export PNG** saves the transparent result.

## Key modules

- `src/lib/mask.ts` — build binary/alpha masks, trim sources, erode/dilate.
- `src/lib/transform.ts` — rotate/scale a source mask; containment +
  collision tests.
- `src/lib/placement.ts` — the seedable, chunked placement algorithm
  (reuse and use-each-once modes).
- `src/lib/render.ts` — composite full-quality source images and export PNG.
- `src/components/App.tsx` — state, orchestration, chunked generation.

## Invariants (do not break)

- A placement is valid only if **every** visible source pixel is inside the
  target and **none** collide with the occupancy mask. Never relax these to
  fit more pieces.
- All containment/collision/trimming use the real visible (alpha) silhouette,
  never the rectangular image box.
- Generation is deterministic for a given seed + settings and runs chunked so
  the UI never freezes.

See `pm_skills/project/` for living project memory and `AGENTS.md`,
`UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md` for the permanent contracts.

