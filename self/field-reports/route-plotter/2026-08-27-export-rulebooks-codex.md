<!-- field-report: project=route-plotter · date=2026-08-27 · type=export
     · pm-skills=4.7.0
     · source=tracked root rulebooks at public commit 6f2ac154430be665a9cb1665a6f20d1b317990e0
     · redaction=none required; scan found 0 absolute checkout/home paths, 0 e-mail addresses, 0 private-key blocks, and 0 credential-shaped tokens
     · retained=already-public personal names, public GitHub accounts/URLs, framework/product names, commit hashes, and other tracked identifiers retained -->

# Rulebook export

Complete live project rulebooks at public commit `6f2ac154430be665a9cb1665a6f20d1b317990e0`, concatenated in the requested order.

## Source byte inventory

| Repo-relative source | Source bytes | Exported content bytes |
| --- | ---: | ---: |
| `AGENTS.md` | 7,317 | 7,317 |
| `UI-STANDARDS.md` | 9,894 | 9,894 |
| `DEV-INFRASTRUCTURE.md` | 11,958 | 11,958 |
| `CLAUDE.md` | 675 | 675 |
| `README.md` | 22,115 | 22,115 |
| **Total** | **51,959** | **51,959** |

Redaction applied to the concatenated content: 0 checkout path(s), 0 other home-path prefix(es), 0 e-mail address(es), 0 credential-shaped token(s), and 0 private-key block(s).

<!-- FILE: AGENTS.md -->

# AI Agent Rules — Route Plotter

## Product identity

**Route Plotter** is a single-purpose animated route editor for maps and
images. Its canonical mental model is background image → waypoints →
animated path → export. It is not a GIS tool, drawing app, or general video
editor.

## Who you are working with

The maintainer is a novice coder who owns macro structure, UX direction, and
conceptual design, while relying on AI for implementation and project
management. Do the work; explain concepts only when asked. Comments should
make non-obvious data flow and fragile behaviour understandable.

## Durable context architecture

- This file is the shared agent contract. Codex loads it directly; Claude Code
  loads it through the root `CLAUDE.md`. Keep shared rules here and do not copy
  them into tool-specific files.
- `README.md` and the permanent project references describe the current
  product and engineering contracts.
- `pm_skills/project/` is the version-controlled, evolving project memory:
  current intent, architecture, conventions, queue, decisions, and file roles.
- Local Codex memories and Claude auto memory are recall aids only. They are
  generated, machine-local, and not authoritative. Move any fact that must
  survive across tools, machines, or contributors into its owned repository
  document through the normal end-of-task workflow.
- Do not create a second repository memory tree or duplicate existing project
  facts in `CLAUDE.md`, `.claude/`, `.codex/`, or ad hoc handover files.

## Before every task

Load only the tier the task needs so startup context stays useful.

### Hot whole-file

- `README.md`
- `pm_skills/project/brief.md`
- `pm_skills/project/architecture.md`
- `pm_skills/project/conventions.md`

### Hot sectional

- `pm_skills/project/file-map.md`: read the index and only the sections for
  directories the task touches; use the whole file only for cross-cutting work.
- `pm_skills/project/backlog.md`: read the Active section only.
- `pm_skills/project/decision-log.md`: scan the latest 10 headings and read only
  relevant entries. Search older entries only when the task needs them.

### Conditional

- Read `_Joe/dev notes/needs consolidating and deleting/dev guide.md` for code
  changes, debugging, persistence work, or fragile implementation areas.
- Read `UI-STANDARDS.md` for UI, controls, layout, text, states,
  accessibility, or user-facing behaviour.
- Read `DEV-INFRASTRUCTURE.md` for build, dev-server, versioning, scripts,
  configuration, or deployment work. At task close, read its quality-gate
  section even when the rest was not needed.

### Warm and cold

- `pm_skills/project/trajectory.md` is warm: read on demand when
  reconstructing shipped work, releasing, or maintaining memory.
- `pm_skills/project/wish-list.md`, `pm_skills/project/doc-deltas.md`,
  `pm_skills/project/archive/`, and `pm_skills/project/tickets/` are cold. Read
  them only in their named workflow; a ticket is read only when the active
  backlog item carries `[detail]`.
- Memory budgets live only in `pm_skills/memory-policy.md`. Read that file for
  task close or memory maintenance; never restate its numbers here.

## Workflow

1. For non-trivial work, follow `pm_skills/integrations/task.md`; its default
   mode is `checkpoint`. Use `full` for `[sign-off]` items or when requested.
   For bugs, follow `pm_skills/integrations/bugfix.md`. For small work, use the
   quick path in `pm_skills/prompts/quick-task.md`.
2. Search the full source tree before proposing changes. Check
   `src/config/constants.js` for tuneable values and `index.html` for existing
   controls before adding anything.
3. Close completed work through `pm_skills/prompts/end-of-task.md`. Update only
   the documents whose owned facts changed. Do not create narrative duplicates.
4. If another session may be writing, follow the claim and single-memory-writer
   procedure in `pm_skills/prompts/session-start.md` and
   `pm_skills/memory-policy.md`.

## Hard rules and invariants

- Waypoints store normalised `imgX` and `imgY` values (0–1). Convert through
  `CoordinateTransform`; never persist canvas pixels on a waypoint.
- EventBus is the only cross-component communication channel. Components emit
  events; the `RoutePlotter` orchestrator handles mutation.
- `InteractionHandler` owns one Pointer Events transaction for mouse, touch,
  and pen authoring. Do not add a competing canvas click/mouse/touch mutation
  path.
- Put all imports at the top of a file.
- Treat `docs/` as generated build output. Never hand-edit it.
- The only runtime dependencies are `jszip` and `mediabunny`. Do not add a
  package without explicit approval.
- Keep the Okabe-Ito map palette separate from UoN UI tokens. UI follows the
  project's Carbon-first, WCAG 2.2 AAA contract in `UI-STANDARDS.md`.
- Programmatic speed-slider updates use `ui:slider:update-speed`, never direct
  `.value` assignment.
- Stable paused editor and player views queue no animation frame. Active
  playback and visible camera settling may keep preview awake; export keeps its
  single explicit synchronous frame loop.
- Runtime recovery must remain one documented, ownership-safe command that
  verifies readiness, not merely process launch.
- Do not invent synonyms for existing EventBus events. Use the event catalogue
  in `README.md` and the relevant source definitions.

## Minimal change and documentation discipline

- Do not reorganise code or edit comments outside the requested surface.
- Match existing style: 2-space indentation, single quotes, and semicolons.
- Add an abstraction only when it reduces real duplication, isolates fragile
  logic, or has a clear reuse case.
- Explain why in comments; do not restate what the code says. Follow
  `pm_skills/project/conventions.md` for JSDoc and fragile-area guidance.
- When an out-of-scope idea arises, add one unjudged line to
  `pm_skills/project/wish-list.md` and continue. Triage, do not scope, it later.

## Testing and persistence

- Run the non-mutating canonical gate, `npm run check`, after changes. Never
  delete, skip, or weaken an existing test to obtain a pass.
- Add a focused test for new model methods, utilities, and regressions. Name
  any browser/device verification that remains manual.
- A persisted property needs a default, `toJSON()` and `fromJSON()` handling,
  inclusion in the canonical project snapshot, restore handling, and a
  save/reload round-trip test.

## Files agents must not hand-edit

- `docs/*` — generated build output
- `_Joe/*` — maintainer-owned notes and evidence
- `version.json` — build-managed version state
- `node_modules/*` — package-manager state

## Document ownership

- `AGENTS.md`: shared standing instructions and hard invariants.
- `CLAUDE.md`: minimal Claude-specific adapter only.
- `README.md`: product overview, current architecture, glossary, and gotchas.
- `UI-STANDARDS.md`: UI, accessibility, and usability rules.
- `DEV-INFRASTRUCTURE.md`: build, runtime, scripts, versioning, and deployment.
- `pm_skills/project/`: evolving shared brief, architecture, queue, decisions,
  and file roles.
- Local/auto memory: temporary tool-specific recall, never the shared source
  of truth.

When a fact changes, update its owner and link to it elsewhere rather than
restating it.

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

Two token systems run side by side:

| System | Governs | Source |
| --- | --- | --- |
| **Okabe-Ito palette** | Map data colours (markers, paths, beacons, area highlights) | `styles/tokens.css` as `--map-series-*` and enforced by `SwatchPicker.js` |
| **UoN semantic tokens** | UI chrome (surfaces, text, borders, interactive states) | `styles/tokens.css` as `--surface-*`, `--text-*`, `--border-*`, etc. |

Carbon conventions (spacing scale, typography scale, layout grid, layer
tokens, border tokens, interaction state tokens) are implemented to
match Carbon spec using the UoN semantic tokens as the colour source.

Do not collapse one system into the other. Map data colours must always
use Okabe-Ito (colour-blind safe). UI chrome must always use UoN
semantic tokens.

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
- Slider readouts show the value the renderer or timeline consumes, never an
  internal slider coordinate. Name the unit or direction in the visible
  readout, connect that readout with `aria-describedby`, and keep
  `aria-valuetext` synchronized when the control uses a translated scale.
- Map-bound size controls use `reference px` readouts and say in contextual
  help that exports scale them from the project's stable reference short edge.
  Normalised geometry and timeline values do not use this scale. Label type is
  clamped to 14–72 physical pixels only in the interactive editor for
  legibility; HTML and video output use the exact reference scale.
- Palette controls identify the exact current colour in text. A custom or
  imported value that does not match a preset leaves every preset unselected;
  the UI must never imply that a different colour is active.
- Multi-edit controls compare the entities they will actually write. When
  those values disagree, selects show a disabled `Mixed` option, range
  readouts and `aria-valuetext` say `Mixed`, native checkboxes are
  indeterminate, and palette controls clear every swatch and show `Mixed` in
  text. The retained source value is only an interaction starting point, never
  a claim about the whole selection; a real edit clears the transient state.

### Flexibility and efficiency

- Support novice and repeat use. Expose shortcuts for common actions.
- Provide click, tap, and keyboard alternatives — avoid drag-only
  interactions.

### Minimalist design

- Keep interfaces lean and task-relevant. No decorative chrome,
  redundant copy, or competing calls to action.
- Complex inspector cards keep 2–4 conceptual controls for the shortest
  complete task visible in `.section-primary`. Secondary refinements use one
  native `details.section-more` disclosure labelled `More`; compact cards do
  not render an empty tier, and prerequisites never move behind it.
- Repeated waypoint-card actions use one compact final row. `Reset` applies
  route/default values to the card's actual selected targets; `Apply onward`
  requires one source and follows route order. Disable no-op, ambiguous and
  unavailable actions with a specific accessible reason. Treat the action as
  one undoable transaction, and never propagate authored content that the card
  does not explicitly style (for example label text or polygon geometry).
- Seeded variation controls expose the exact persisted seed and make Re-roll a
  discrete, undoable authoring action that changes the seed only. They use
  plain effect names and directional readouts instead of internal signed
  parameters, and must never introduce wall-clock randomness into playback,
  scrubbing or export.

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

This file defines the permanent rules for how Route Plotter is built,
run, tested, versioned, and shipped. `AGENTS.md` references this file.
Read it before any task that involves the build system, dev server,
scripts, configuration, or deployment.

---

## Package management

Package manager: **npm**

- `package.json` lives in the project root.
- **Runtime dependencies:** `jszip` (project archives) and `mediabunny`
  (MP4/WebM mux layer). Do not add runtime packages without explicit
  approval.
- **Dev dependencies** (esbuild, vitest, jsdom) are established.
  New dev dependencies can be added when justified.
- Supported Node versions are declared in `package.json`; `.nvmrc` pins
  Node 24 for maintainers and `packageManager` records the expected npm
  release (npm does not enforce that field by itself).
- Run `npm ci` after cloning. Do not commit `node_modules/`.

---

## Canonical scripts

| Script | Command | Purpose | When to use |
| --- | --- | --- | --- |
| `dev` | `node build.js --watch --serve` | Dev server with watch | Day-to-day development |
| `build` | `NODE_ENV=production node build.js` | Production build (minified, sourcemap) | Before deploy |
| `build:deploy` | `npm run build` | Alias of `build` — outputs straight to `docs/` (the GitHub Pages dir) | When deploying |
| `build:check` | `NODE_ENV=production node build.js --check` | Validate a temporary production build without changing `docs/` or `version.json` | CI / close-out |
| `check` | `npm test && npm run test:shell && npm run build:check` | Canonical JS, maintainer-script and build gate | Before commit |
| `test` | `vitest run --pool=threads --no-file-parallelism` | Run tests once | After every change |
| `test:shell` | `bash tests/restartSafety.test.sh` | Project-scoped dev-server PID/cleanup contract | After restart-script changes / in CI |
| `test:watch` | `vitest watch --pool=threads --no-file-parallelism` | Tests in watch mode | During development |
| `push:dry-run` | `node push.js --dry-run` | Show deployment commands without changing files or Git | Before deploy |
| `push` | `node push.js` | From a clean source commit: test, build, stage generated files, commit, push current branch | When ready to ship |

Do not add scripts without updating this table.

> **Why the threads pool?** Vitest's default `forks` pool times out
> starting its worker in this OneDrive-synced workspace path and
> silently reports "no tests" with exit 0 — a false green. The
> `threads` pool with `--no-file-parallelism` runs reliably.
> See decision-log 2026-06-16.

---

## Dev server

- **URL:** `http://localhost:3000`
- **Start:** `npm run dev`
- **Serves:** Build output from `docs/` (esbuild rebuilds JS on
  change; CSS and HTML are watched and copied)
- **No hot-module replacement.** After any change, hard-refresh
  (`Cmd+Shift+R`).

If port 3000 is already in use, `restart.sh` stops it only when the process
belongs to this checkout. It reports and preserves a foreign listener. Inspect
that process before deciding whether to stop it:

```bash
lsof -nP -iTCP:3000 -sTCP:LISTEN
ps -p <PID> -o pid=,command=
```

---

## Runtime lifecycle

Route Plotter is a **client-only static app** — no backend, database,
or persistent server state. "Running it" means building the bundle and
serving `docs/` over HTTP. Reaching a known-good state is one command
(`npm run dev`); recovery is stopping the dev server and restarting.

**Command surface** (full table in Canonical scripts above):

| Verb | Command | Does |
| --- | --- | --- |
| Boot | `npm run dev` | Build, watch `src/`, serve `docs/` at the dev URL. The canonical run command. |
| Reboot | `./scripts/restart.sh` (or `Ctrl-C`, then `npm run dev`) | Stop this checkout's recorded watcher tree and start fresh (also bumps the build number); refuse to kill an unrelated port holder; verify readiness. |
| Build | `npm run build` (or `./scripts/build.sh`) | One-off production build into `docs/` (no server). |
| Test | `npm test` | Run the vitest suite once. |

- **Dev URL / port:** `http://localhost:3000` (see Dev server above).
- **Components & startup order:** a single foreground process —
  esbuild (watch + rebuild) and the static file server are started
  together by `build.js`. No ordering concerns.
- **Process ownership:** runs in the foreground; `restart.sh` records its
  wrapper PID in ignored `.route-plotter-dev.pid` and removes it at shutdown;
  no log files are written. The tree is `npm run dev` → `node build.js --watch` → an
  esbuild service child that binds port 3000. A clean stop must kill the
  `node build.js --watch` parent, not just the port listener, or the
  watcher is orphaned (see decision-log 2026-06-17).
- **Env / secrets:** none. No `.env`, no API keys — the app runs
  entirely in the browser.
- **Generated output (safe to delete and rebuild):** `docs/` and the
  `version.json` build field, both produced by `build.js`. Never
  hand-edit them (see Files agents must not hand-edit below).
- **Health / readiness:** the app is *ready* — not merely launched —
  when `http://localhost:3000` loads with no console errors and the
  version stamp renders. A blank page or console error means not-ready.
- **Recovery playbook** — server wedged or port stuck. One command stops any
  running dev server, reboots, and waits for HTTP 200:

```bash
./scripts/restart.sh             # stop dev server, reboot, verify readiness
```

  Manual equivalent for a server you launched in the current terminal:

```bash
Ctrl-C                           # stop that foreground server tree
npm run dev                      # reboot to a ready state
# then hard-refresh the browser (Cmd+Shift+R) — no HMR
```

  If the wrapper reports a foreign port holder, inspect the PID with the
  commands in Dev server above and stop it explicitly only when you own it.

- **Exposure:** local only by default (`localhost`). There is no public
  tunnel or LAN mode; publishing is a separate, explicit `npm run push`
  (see Deployment below).

---

## Build system

- **Bundler:** esbuild (via custom `build.js`)
- **Entry points:** `src/main.js` → `docs/app.js` (the app) and
  `src/player/playerEntry.js` → `docs/player.js` (the exported-HTML
  player bundle, IIFE; HTMLExportService fetches and inlines it into
  every export, so it must ship alongside the app). Both build in
  watch and production modes.
- **Output directory:** `docs/` (also serves as GitHub Pages root)
- **Format:** ESM
- **Source maps:** Enabled in both dev and production
- **Minification:** Production builds only
- **Static files:** an explicit allowlist in `build.js` copies `index.html`,
  the six shipped stylesheets, and the six built-in example images. Production
  output is assembled in a same-filesystem staging directory, checked for
  missing local references, then swapped into `docs/`; stale or accidental
  files cannot survive from an older build.

The output directory is **read-only** — never hand-edit files in it.
They are overwritten on every build.

---

## Version management

Format: `major.minor.build` (e.g. `3.1.530`)

| Component | Source | Updated |
| --- | --- | --- |
| `major.minor` | `package.json` version field | Manually, for features or breaking changes |
| `build` | `version.json` build field | Automatically, once per dev session start or `npm run build` |

The combined version is injected at build time via esbuild `define`
as `APP_VERSION`. It is a compile-time constant.

| Change type | Build number increments? |
| --- | --- |
| Edit JS in `src/` | No — only on next dev restart or build |
| Edit CSS/HTML | No (static copy, not a JS rebuild) |
| Restart dev server | Yes (once per session) |
| `npm run build` | Yes |
| `npm run build:check` | No |

Do not edit `version.json` manually — the build script manages it.
Bump `major.minor` in `package.json` when shipping a new feature or
breaking change.

---

## Deployment

- **Target:** GitHub Pages served from `/docs` on the selected branch. The live
  site currently selects `main`; a review branch can be selected for a Pages
  preview without changing the helper.
- **Pipeline:** first commit all source changes, then run `npm run push`. The
  helper requires a clean tree, runs tests, creates and validates a fresh
  production output, permits only `docs/` and `version.json` to change, commits
  those generated files, and pushes the current branch to the same remote ref.
- **Custom message:** `npm run push -- "custom msg"`
- **Dry run:** `npm run push:dry-run`
- **Live URL:** <https://djdaojones.github.io/route-plotter/> (Pages enabled 2026-08-19, Phase 5; the frozen v2 line stays at <https://djdaojones.github.io/router-plotter-02/>)

---

## Utility scripts

- **`push.js`** — argv-safe, current-branch GitHub Pages helper with a clean-tree
  gate and generated-file allowlist.
- **`build.js`** — esbuild bundler with version management, explicit static
  allowlist, checked staging/publish, non-mutating check mode, and dev server.

### Maintainer shell scripts (`scripts/`)

Thin, run-from-anywhere wrappers around the npm scripts above. Run them as
`./scripts/<name>.sh` (or `bash scripts/<name>.sh` if the executable bit is
lost to OneDrive sync). See `scripts/README.md`.

- **`scripts/restart.sh`** — clean restart/boot: stops only the process tree
  recorded for this checkout (graceful TERM→KILL), refuses an unrelated
  listener on port 3000, then boots `npm run dev` and polls
  until `http://localhost:3000` returns HTTP 200 before reporting ready.
  Foreground; Ctrl-C stops it cleanly. `--hard-reset` also deletes `docs/`
  (regenerated on boot); `--help` for usage. This is the scripted form of the
  Recovery playbook above.
- **`scripts/build.sh`** — one-shot `npm run build` into `docs/`; `--test`
  also runs the suite; `--help` for usage.

---

## Configuration strategy

- **Constants:** `src/config/constants.js` — all tuneable values
  (animation, rendering, interaction, path, motion, text labels,
  video export, area highlight, storage). Grouped by domain. Check
  this file before adding any new hard-coded value.
- **Design tokens:** `styles/tokens.css` — CSS custom properties for
  colours, spacing, and theming (UoN palette + Okabe-Ito map palette).
- **Keybindings:** `src/config/keybindings.js` — all mouse and
  keyboard shortcuts. Customisable at runtime via localStorage.
- **Help content:** `src/config/helpContent.js` — welcome modal and
  inline help HTML generators.
- **Tooltips:** `src/config/tooltips.js` — tooltip definitions.

Do not scatter configuration across service files. If a value might
need tuning, it belongs in the constants file.

### Imported-project safety budgets

Untrusted project and image ceilings live beside the boundary they protect:
`PROJECT_MODEL_LIMITS` in `src/app/persistence.js`, archive budgets in
`ImageAssetService.js`, image budgets in `ImageAsset.js`, and aggregate
scene/flow/emitter budgets in their model files. Import stages and decodes a
detached candidate before commit. Keep those limits finite, cover increases
with adversarial tests, and document user-visible changes in `README.md`.

Autosave is capped at a 4 MiB serialized snapshot. It includes background and
custom assets only while they fit, reports real storage failures, and flushes
pending state on `pagehide`; a manual project ZIP remains the durable format.

---

## Editor config

The project root contains `.editorconfig`:

- UTF-8 encoding, LF line endings
- 2-space indentation for all files
- Trailing whitespace trimmed (except in markdown)
- Single quotes in JavaScript
- 120 char max line length for JS/HTML/CSS, 80 for markdown

---

## Files agents must not hand-edit

- `docs/` — build output, overwritten on every build.
- `_Joe/` — personal dev notes, design docs, helper scripts.
- `version.json` — managed by the build script.
- `node_modules/` — managed by npm.

<!-- FILE: CLAUDE.md -->

# Claude Code project entry point

@AGENTS.md

## Claude Code-specific guidance

- The imported `AGENTS.md` is the shared project contract. Keep this adapter
  small and do not duplicate shared project knowledge here.
- Treat paths under `pm_skills/` as repository workflows to read and follow;
  they do not require a separately installed slash command.
- Auto memory is optional, machine-local recall. Do not use it as the source of
  truth for standing rules, decisions, the backlog, or handovers; write durable
  cross-tool knowledge to the repository-owned document instead.
- Use `/context` when you need to verify which memory files loaded in a Claude
  Code session.

<!-- FILE: README.md -->

# Route Plotter

An animated route editor for maps and images. Drop in a background, click to place waypoints, tweak styles and timing, then export as MP4, WebM, or a self-contained HTML file.

**[Live demo](https://djdaojones.github.io/route-plotter/)** *(the frozen v2 line remains at [router-plotter-02](https://djdaojones.github.io/router-plotter-02/))*

---

## What it does

1. Load a background image (drag-and-drop, upload, or pick a built-in example).
2. Click the canvas to add **major** waypoints (full features) or Cmd/Ctrl+Click for **minor** waypoints (path shaping only).
3. A Catmull-Rom spline connects them into a smooth animated path.
4. Configure per-waypoint: marker style, colour, beacon effect, text label, wait time, segment speed, camera zoom, and area highlight.
5. Configure globally: path visibility mode, waypoint visibility mode, background reveal mode (spotlight, angle-of-view), tint, trail, and graphics scale.
6. Toggle between **Edit** and **Preview** modes in the header.
7. Export to MP4 (H.264 via WebCodecs), WebM (VP8), or standalone HTML with interactive playback.
8. Projects auto-save to localStorage and can be saved/loaded as ZIP files.

---

## Quick start

```bash
git clone https://github.com/djDAOjones/route-plotter.git
cd route-plotter
nvm use            # Node version is pinned in .nvmrc
npm ci
npm run dev        # Dev server with watch → http://localhost:3000
```

```bash
npm run build          # Production bundle → docs/
npm run build:check    # Validate a production build without changing docs/ or the version
npm test               # Vitest (jsdom)
npm run check          # Tests + non-mutating production build
npm run push:dry-run   # Preview the clean-tree deployment commands
npm run push           # Test, build, commit docs/, push the current branch
```

Maintainer shortcuts — wrappers around the above, runnable from any directory (see `scripts/README.md`):

```bash
./scripts/restart.sh   # restart this repo's server, then wait for HTTP 200
./scripts/build.sh     # production build into docs/ (add --test to run tests)
```

---

## Project structure

```text
index.html                        Single-page app shell (sidebar + canvas + controls)
.nvmrc                            Supported local Node major
build.js                          esbuild bundler, version management, dev server
version.json                      Auto-incremented build number
push.js                           Clean-tree, current-branch GitHub Pages deploy helper

scripts/                          Maintainer convenience wrappers (run from anywhere)
  restart.sh                      Owned-process restart/boot — refuse foreign port holders, verify HTTP 200
  build.sh                        Production build into docs/ (--test also runs tests)
  README.md                       Usage reference for these scripts

src/
  main.js                         RoutePlotter class — app entry point and orchestrator core
  app/                            RoutePlotter prototype mixins (method groups moved out of main.js;
                                  attached via Object.assign — wiring, playback, undo/redo, camera,
                                  viewport, path timing, persistence, exporting, editor panel, pointer,
                                  semantic scene-outline integration)
  config/
    constants.js                  All tuneable values (animation, rendering, path, etc.)
    keybindings.js                Mouse + keyboard bindings (customisable via localStorage)
    helpContent.js                Welcome modal and inline help HTML generators
    tooltips.js                   Tooltip definitions
  components/
    SwatchPicker.js               Okabe-Ito colour-blind safe palette picker
    Dropdown.js                   Accessible dropdown menus
    Tooltip.js                    Tooltip attachment
    ParamTooltip.js               Click-label parameter tooltips (Carbon pattern)
  controllers/
    UIController.js               Sidebar controls, waypoint list, slider sync
    SectionController.js          Collapsible settings sections
    SceneOutlineController.js     Native lazy scene outline, authoring forms, focus and draft state
  core/
    EventBus.js                   Pub-sub event system
    PlayerCore.js                 Pure timeline math — segments, pause budgets, beacon schedules,
                                  timeline↔path mapping; play/scrub/export share this one evaluation path
  player/
    PlayerApp.js                  Headless app core for exported HTML files (real render stack,
                                  adopts the app's own timing mixins)
    playerEntry.js                Exported-page boot + transport controls (bundled → docs/player.js)
    playerAccessibility.js        Static scene summary and discrete transport announcements
  handlers/
    InteractionHandler.js         Captured Pointer Events, keyboard, and drag-and-drop input
  models/
    Waypoint.js                   Waypoint data model (position, style, camera, area, etc.)
    AnimationState.js             Playback state (progress, timing, pause tracking)
    ImageAsset.js                 Custom image references (marker, path head)
    GraphNode.js                  Active flow-network node model
    GraphEdge.js                  Active weighted directed edge with control points
    GraphModel.js                 Active network collection (CRUD, adjacency)
  services/
    AnimationEngine.js            Demand-driven preview scheduler and transport timing
    PathCalculator.js             Catmull-Rom spline, reparameterisation, curvature
    RenderingService.js           Canvas drawing — path, markers, labels, overlays
    BeaconRenderer.js             Animated waypoint effects (ripple, glow, pop, grow, pulse)
    TextLabelService.js           Text label layout, fade, auto-positioning
    MotionVisibilityService.js    Path/waypoint/background visibility calculations
    CameraService.js              Per-waypoint zoom with target-aware interpolation
    CoordinateTransform.js        Image ↔ canvas coordinate conversion
    VideoExporter.js              MP4/WebM export (WebCodecs primary, MediaRecorder fallback)
    HTMLExportService.js           Self-contained HTML export with embedded player
    ImageAssetService.js          Custom image management and deduplication
    StorageService.js             localStorage with debounce and change detection
    UndoService.js                150-step undo/redo history
    AreaDrawingService.js         Polygon area drawing mode
    AreaEditService.js            Area highlight repositioning and vertex editing
    AreaHighlightRenderer.js      Per-waypoint area highlight rendering
  utils/
    CatmullRom.js                 Catmull-Rom spline interpolation
    Easing.js                     Easing functions (linear, quad, cubic, etc.)
    entityId.js                   Persisted structural-ID boundary
    focusTrap.js                  Modal focus trapping for accessibility
    sceneSemantics.js             Pure canonical-project projection for the scene outline

styles/
  tokens.css                      Design tokens — UoN palette, semantic colours, spacing
  main.css                        Core layout, sidebar, canvas, controls, modals
  swatch-picker.css               Swatch picker grid (5×2, 44px AAA touch targets)
  dropdown.css                    Dropdown component styles
  tooltip.css                     Tooltip styles

tests/
  *.test.js                       Unit, integration, golden-frame, persistence, safety, and UI contracts
  review*.test.js                 Regression contracts added from repository reviews
  projectLimits.test.js           Adversarial project/model resource ceilings
  releaseSafety.test.js           Build/deployment argument and dry-run safety
  setup.js                        Vitest jsdom setup

reviews/                          Historical review evidence and continuation dossier
  README.md                       Index, provenance and cross-project filename guard
  route-plotter-v3-comprehensive-repository-review-2026-08-26.md
                                  Full pre-remediation review at commit cec0191
  route-plotter-review-finding-crosswalk-2026-08-26.md
                                  RP-01–RP-18 remediation and residual-ticket map
  route-plotter-review-remediation-continuation-prompt-2026-08-26.md
                                  Paste-ready next-chat development handover

docs/                             Build output served by GitHub Pages
```

---

## Architecture

### Overview

`RoutePlotter` (in `main.js`) is the single orchestrator. It owns all services, handles EventBus events, manages application state, and drives the render loop. Since the Phase 1 split its method groups live as prototype mixins in `src/app/*` (attached via `Object.assign(RoutePlotter.prototype, …)` at the bottom of `main.js`); `main.js` itself keeps only the constructor, init, model bookkeeping, and render scheduling. Method names must stay unique across all mixins.

There is no framework. The app is pure JavaScript with Canvas 2D rendering and vanilla DOM for the sidebar UI.

### Event-driven communication

Components talk through `EventBus` (pub-sub), not direct method calls:

```text
Captured canvas gesture → InteractionHandler emits one terminal event
    → main.js handles event, updates Waypoint model
    → main.js calls queueRender()
    → RenderingService draws the frame
```

```text
User moves slider → UIController emits event
    → main.js handles event, updates state
    → main.js recalculates timing / path
    → main.js calls queueRender()
```

### Key event categories

| Event prefix | Source | Purpose |
| --- | --- | --- |
| `waypoint:*` | InteractionHandler, UIController | Add, delete, select, move, restyle waypoints |
| `animation:*` | AnimationEngine, UIController | Play, pause, reset, speed, seek |
| `ui:*` | UIController | Slider sync, mode changes, export triggers |
| `video:*` | VideoExporter | Export lifecycle (started, progress, complete, error) |
| `area:*` | AreaDrawingService, AreaEditService | Area highlight draw/edit |
| `undo:*` | UndoService | State snapshot/restore |
| `scene-outline:*` | SceneOutlineController, RoutePlotter | Semantic snapshots, stable-ID authoring commands, validation feedback |

### Rendering pipeline

1. `queueRender()` coalesces editor mutations, while `AnimationEngine` schedules preview frames only for active transport or visible camera settling; a stable paused view leaves no frame queued.
2. `render()` builds a `renderState` object from current waypoints, animation progress, motion settings, camera, and preview mode.
3. `RenderingService` draws layers in order: background → tint overlay → area highlights → path → waypoints → labels → path head → beacons.
4. `MotionVisibilityService` computes per-frame visibility/opacity for path, waypoints, and background based on animation progress and the active visibility mode.
5. `CameraService` applies zoom/pan transforms from per-waypoint camera keyframes.

### Coordinate systems

Waypoints are stored in **normalised image coordinates** (0–1). The `CoordinateTransform` service converts between:

- **Image coords** (`imgX`, `imgY`) — storage and serialisation.
- **Canvas coords** (`x`, `y`) — rendering and hit-testing.

Zoom, pan, and fit/fill mode are handled inside the transform. Path points are recalculated when the canvas resizes.

---

## Persistence and export

### Auto-save (localStorage)

State is debounce-saved to `routePlotter_autosave` on every change and loaded
on startup. Recovery is deliberately model-only: it never stores original
background/custom-image bytes or their original filenames. Custom marker and
path-head references are replaced with loadable built-in fallbacks in the
recovery snapshot, while the live project remains unchanged. **Save Project**
is the durable option for preserving images. Pending recovery is flushed on
`pagehide`, and **Clear All** also removes the old recovery point so cleared
work cannot return on reload.

Other localStorage keys: `routePlotter_preferences`, `routePlotter_splashShown`, `routePlotter_customKeybindings`.

### Project save/load (ZIP)

Save Project packages all state (including the background image) into a `.zip`
file. Open Project validates and decodes a detached candidate before replacing
the current project; any failure leaves the live project, assets, history, and
autosave unchanged. ZIP and standalone HTML exports embed the retained original
PNG, JPEG, or WebP data URL without canvas/JPEG re-encoding; export stops with a
clear error if those source bytes are unavailable. Explicitly shared exports
may contain original custom-image filenames and asset metadata.

### Import safety limits

Imported images must be PNG, JPEG, or WebP and are limited to 16 MiB, 8,192 px
on either axis, and 24 megapixels each. A project ZIP is limited to 50 MiB
compressed, 256 entries, 64 MiB decompressed, 2 MiB of project JSON, 128 image
assets, 40 MiB of asset bytes, and 48 megapixels across those assets. Model
ceilings include 2,000 waypoints, 32 flow layers, 256 emitters, 20,000 dots,
10,000 graph nodes, 20,000 graph edges, and 10,000 polygon points. Files above
these ceilings are rejected before live state changes. Persisted waypoint,
flow-layer, emitter, graph-node and graph-edge IDs are limited to 256
characters so high-cardinality projects cannot amplify one structural value;
display names and labels retain their separate text budget.

### Video export

- **MP4**: H.264 via WebCodecs + [mediabunny](https://www.npmjs.com/package/mediabunny) muxer. Explicit frame timestamps avoid background-timer stretching; hardware acceleration is requested but capability-probed at runtime. Requires even dimensions (auto-rounded).
- **WebM**: VP8 via WebCodecs + mediabunny, with a manually clocked MediaRecorder fallback when the exact required APIs pass runtime probes. Browser/version support remains release-tested rather than assumed.
- Configurable resolution (up to 7680×4320), frame rate (10–60 fps), aspect ratio presets, and path-only (transparent) mode.

### HTML export

Self-contained HTML file with embedded base64 background image, the full project data, and the app's own player runtime (`docs/player.js`, inlined at export time). The exported player runs the same PlayerCore/SwarmEngine/RenderingService stack as the app, so crowds, beacons, pauses, camera, labels, and area highlights replay exactly as previewed — including the authored timeline, which is preserved verbatim regardless of the viewer's window size. Interactive transport: play/pause, scrubbing, keyboard, playback speed. 80–95% smaller than equivalent video.

---

## Versioning

Format: `major.minor.build` (e.g. `3.1.530`).

- **major.minor** — set manually in `package.json`.
- **build** — auto-incremented in `version.json` once per dev-server start or production build.

The combined string is injected at build time via esbuild's `define` as `APP_VERSION`.

| Change | Version bumps? |
| --- | --- |
| Edit JS in `src/` | Build increments on next `npm run dev` restart or `npm run build` |
| Edit CSS/HTML only | No (static files are copied, not rebuilt) |
| Force bump after CSS | Restart the dev server, or run a production build |

---

## Keybindings

All shortcuts live in `src/config/keybindings.js`. User overrides are stored in `routePlotter_customKeybindings` localStorage key and merged at load time.

Each binding specifies: `key`, `modifiers` (meta/alt/shift), `action` (EventBus event name), `description`, and `category`.

`meta` maps to **Cmd** on macOS, **Ctrl** on Windows/Linux.

The in-app help panel (press `?`) renders all bindings dynamically from this config.

---

## Constants reference

All tuneable values are in `src/config/constants.js`, grouped by concern:

| Group | Key values |
| --- | --- |
| `ANIMATION` | `DEFAULT_SPEED` 200 px/s, `DEFAULT_DURATION` 10 000 ms, `DEFAULT_WAIT_TIME` 1 500 ms, `TARGET_FPS` 60 |
| `VIDEO_EXPORT` | `DEFAULT_FRAME_RATE` 25 fps, `DEFAULT_BITRATE` 20 Mbps, `START_BUFFER_MS` 2 000 ms |
| `RENDERING` | `DEFAULT_PATH_COLOR` #D55E00, `DEFAULT_DOT_SIZE` 8 px, `MINOR_DOT_SIZE` 4 px, `CONTROLS_HEIGHT` 80 px |
| `PATH` | `POINTS_PER_SEGMENT` 100, `DEFAULT_TENSION` 0.1, `TARGET_SPACING` 2 px, `MIN_CORNER_SPEED` 0.2 |
| `MOTION` | Trail default 20%, spotlight 10% canvas, AoV 60°/25%/50%, timeline handles 2 s + 3 s |
| `INTERACTION` | Hit radius 15 px, drag threshold 3 px, double-click 300 ms |
| `TEXT_LABEL` | 16–48 px font, 15% width, 0.85 bg opacity, 500 ms fade, 8-direction auto-position |
| `AREA_HIGHLIGHT` | Circle/rectangle/polygon, Okabe-Ito fill, configurable border, fade in/out, same visibility modes as waypoints |
| `STORAGE` | Autosave debounce 1 000 ms |

### Visibility mode enums

| Enum | Values |
| --- | --- |
| `PATH_VISIBILITY` | `always-show`, `show-on-progression`, `hide-on-progression`, `instantaneous` (comet), `always-hide` |
| `WAYPOINT_VISIBILITY` | `always-show`, `hide-before`, `hide-after`, `hide-before-and-after`, `always-hide` |
| `BACKGROUND_VISIBILITY` | `always-show`, `spotlight`, `spotlight-reveal`, `angle-of-view`, `angle-of-view-reveal`, `always-hide` |
| `TEXT_VISIBILITY` | `off`, `on`, `fade-up`, `fade-up-down` |
| `AREA_VISIBILITY` | Same five modes as `WAYPOINT_VISIBILITY` |

---

## Common development tasks

### Add a new per-waypoint property

1. Add the property with a default in `Waypoint.js` constructor.
2. Include it in `toJSON()` and handle it in `fromJSON()`.
3. Add a UI control in the appropriate `index.html` settings section.
4. Wire the control in `UIController.js` to emit an EventBus event.
5. Handle the event in `main.js` (update waypoint, call `queueRender()`).

### Add a new global setting

1. Add the value to the relevant state object in `RoutePlotter` constructor (`motionSettings`, `exportSettings`, `styles`).
2. Add a constant/default in `constants.js`.
3. Add UI control in `index.html`, wire in `UIController.js`.
4. Handle in `main.js`, persist in auto-save and project save/load.

### Modify canvas rendering

Edit `RenderingService.js`. Drawing methods follow the naming pattern `render*()`. The rendering order is defined in the `LAYERS` constants.

### Debug issues

- **Console**: The app intercepts `console.log/warn/error` into a 500-entry ring buffer. Use **Export → Download Debug Log** or **Copy Debug Log** to capture it as markdown.
- **Browser DevTools**: Check the Console tab and Network tab.
- **Version**: Shown in the header tooltip and page title.

---

## Gotchas

- **Don't edit `docs/`** — it is generated by the build. Edit source files in `src/`, `styles/`, or `index.html`.
- **Imports at top only** — esbuild bundles from `src/main.js`. Never import mid-file.
- **Coordinate transform** — always use `CoordinateTransform.canvasToImage()` / `imageToCanvas()` when converting between screen and storage positions.
- **Autosave is model-only recovery, not a project file** — backgrounds, custom
  image bytes, original image filenames, and unusable custom-image references
  are deliberately excluded; use **Save Project** for durable work.
- **Slider feedback loops** — programmatic slider updates must go through `ui:slider:update-speed` to avoid re-triggering input event handlers. Check `isUpdatingSlider` flag in `UIController`.
- **H.264 even dimensions** — MP4 export requires even width and height. The exporter auto-rounds, but custom resolution inputs can produce odd values.
- **Two runtime dependencies, both bundled** — mediabunny (MP4/WebM mux) and
  jszip (project save/load). Nothing loads from a CDN. Creating the first HTML
  export still reads the same-origin `player.js`; offline-first export is
  tracked as follow-up work. Everything else is vanilla JS.

---

## Glossary

Precise terms used across the codebase.

- **Route** — Full journey from first to last waypoint.
- **Path** — Interpolated Catmull-Rom spline connecting waypoints.
- **Path points** — Dense array of `{x, y}` coordinates defining the path.
- **Major waypoint** — Full-featured: labels, pauses, beacons, area highlights, larger marker.
- **Minor waypoint** — Path shaping only: smaller marker, no pause/label/beacon.
- **Marker** — Visual dot, square, flag, custom image, or none.
- **Path head** — Leading indicator at current animation position (arrow, dot, custom image, or none).
- **Beacon** — Animated effect at waypoints: ripple, glow, pop, grow, pulse.
- **Label** — Text attached to a waypoint with fade/visibility modes.
- **Area highlight** — Per-waypoint overlay region (circle, rectangle, or drawn polygon) with visibility timing.
- **Tint** — Background overlay from −100 (black) to +100 (white).
- **Spotlight** — Circular background reveal around the path head.
- **Angle of view** — Cone-shaped background reveal from the path head.
- **Trail** — In comet mode, the visible path segment behind the head.
- **Segment speed** — Per-segment speed multiplier (0.1x–10x).
- **Progress** — Animation position, 0.0–1.0.
- **Image coordinates** — Normalised 0–1 position on the background image. Used for storage.
- **Canvas coordinates** — Screen-pixel position. Used for rendering and hit-testing.
- **Graphics scale** — Global multiplier (0.25×–4×) applied to all vector element sizes.

---

## License

Route Plotter's first-party source is available under the [MIT License](LICENSE).
Third-party components retain their own terms; see
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Author

Joe Bell — University of Nottingham

## Links

- [Repository](https://github.com/djDAOjones/route-plotter)
- [Live demo](https://djdaojones.github.io/route-plotter/)
- [Live demo (frozen v2 line)](https://djdaojones.github.io/router-plotter-02/)
- [Issues](https://github.com/djDAOjones/route-plotter/issues)
- [Support policy](.github/SUPPORT.md)
- [Security policy](.github/SECURITY.md)
