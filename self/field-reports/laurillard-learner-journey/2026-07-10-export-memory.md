<!-- field-report: project=laurillard-learner-journey · date=2026-07-10 · type=export
     · pm-skills=3.1.1 (installed with the first commit 2fef7cf on 2026-07-10; never upgraded)
     · source=every Git blob under pm_skills/project/ at 0341c0bb898776bf353a67d490ec7d9d73c24996, taken 2026-09-24 by Claude Code (read from a scratch clone assembled from the remote and the checkout's objects, every ref set to its value at the cut-off 2026-09-24T11:40:00.000Z; content-addressed, so identical to the checkout's HEAD)
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained; uncommitted work, session logs and the bundle stay in the local lane -->

# Project-memory export — `pm_skills/project/`

Snapshot: `0341c0bb898776bf353a67d490ec7d9d73c24996`. 8 files, 20958 bytes, archive chunks and tickets included.

| Path | Bytes at snapshot | Bytes exported (after redaction) |
| --- | ---: | ---: |
| `pm_skills/project/architecture.md` | 3904 | 3904 |
| `pm_skills/project/backlog.md` | 2157 | 2157 |
| `pm_skills/project/brief.md` | 2467 | 2467 |
| `pm_skills/project/conventions.md` | 2875 | 2875 |
| `pm_skills/project/decision-log.md` | 5174 | 5174 |
| `pm_skills/project/file-map.md` | 2733 | 2733 |
| `pm_skills/project/trajectory.md` | 1475 | 1475 |
| `pm_skills/project/wish-list.md` | 173 | 173 |

<!-- FILE: pm_skills/project/architecture.md -->

# Architecture

<!-- Hot whole-file read. See pm_skills/memory-policy.md for limits. -->
<!-- Describe current structure only. Move historical batch notes to decision-log.md. -->

## Tech stack

- HTML5 — single portable document, no build pipeline required.
- Inline SVG — precise diagram geometry and accessible image semantics.
- Inline CSS — local styling for print, focus, hover, and highlighted states.
- Vanilla JavaScript — small dependency-free interaction layer.
- Node.js scripts — local development checks only; not required to view the page.
- PM-Skills — project memory, workflows, and development rulebooks.

## Project structure

```text
.
├── laurillard_video_functions_learning_journey.html  # self-contained diagram
├── README.md                                         # project overview and run/check commands
├── AGENTS.md                                         # agent rules for this repo
├── UI-STANDARDS.md                                   # UI/accessibility rules for the diagram
├── DEV-INFRASTRUCTURE.md                             # local check and release mechanics
├── package.json                                      # no-dependency npm scripts
├── check-links.mjs                                   # PM-Skills scaffold link checker
├── scripts/
│   ├── check-html.mjs                                # validates the HTML/SVG interaction contract
│   └── check-project-memory.mjs                      # verifies local PM-Skills customisation files
├── .github/workflows/check.yml                       # CI runs npm run check
└── pm_skills/                                        # PM-Skills framework and project memory
```

## Key modules

- `laurillard_video_functions_learning_journey.html` — the production artifact: embedded data model, SVG renderer, styling, and interaction logic.
- `scripts/check-html.mjs` — validates that the artifact remains self-contained and that the data/render/highlight contract still exists.
- `scripts/check-project-memory.mjs` — guards against leaving local PM-Skills project files in template state.
- `pm_skills/project/*` — living project memory used by agents at the start and close of tasks.
- Root rulebooks (`AGENTS.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md`) — project-specific behavioural contracts layered on top of the framework.

## Communication patterns

The page uses direct DOM relationships generated from the embedded `dataModel`. The model has `categories` and `relationships`; relationships use labels plus a `strength` value. The inline script normalises labels into SVG-safe IDs, renders the selected column order, filters visible links to current adjacent pairs regardless of authored direction, draws those links left-to-right in the displayed order, builds connection sets, and applies CSS classes for highlight state. Column headings are the drag and keyboard reorder controls, with badges and grip marks rendered inside SVG. The page wraps the SVG in a contained horizontal scroller on small screens so labels stay readable. There is no app-wide event bus or state store.

## Dependency policy

Runtime dependencies are forbidden by default. Development dependencies are also avoided while the repo remains a single static artifact; any package addition needs explicit maintainer approval and a clear benefit over a small Node script.

## Dev workflow

- Install: no install step is required for viewing. `npm install` is not required because the scripts use Node built-ins only.
- View: open `laurillard_video_functions_learning_journey.html` in a browser, or serve the directory with any static server.
- Check: `npm run check`.
- CI: GitHub Actions runs `npm run check` on pushes and pull requests.
- Deploy: push the HTML file to any static host or use the GitHub repository as the source of truth.

<!-- FILE: pm_skills/project/backlog.md -->

# Backlog

<!-- OPEN WORK ONLY. Status: [ ] todo  [~] in progress  [-] cut. -->
<!-- Shipped work does NOT stay here. On ship: add one line to
     trajectory.md (the outcome) + an entry to decision-log.md (the why),
     then remove the item from this file. -->
<!-- Hot sectional. Agents read the Active section only by default. -->

## Active

### Current milestone

- [ ] **DIAG-1 Add dev diagnostics**
  Intent: make runtime interaction failures easier to capture from the static page.
  Done when: the page has a small dev-only diagnostics helper or documented console diagnostic path without changing the production visual.

- [ ] **A11Y-1 Keyboard and screen-reader pass**
  Intent: verify that keyboard focus, accessible descriptions, and SVG semantics are sufficient for the interactive diagram.
  Done when: tab/focus behaviour is documented, labels remain reachable, and any required ARIA/SVG accessibility tweaks are applied.

- [ ] **VIS-1 Browser visual verification**
  Intent: protect the arrowhead/shaft rendering that motivated the current implementation.
  Done when: a documented headless-browser or manual visual check covers at least one highlighted pathway and confirms arrow shafts meet arrowhead bases.

### Next milestone

- [ ] **EXPORT-1 Assess export needs**
  Intent: decide whether collaborators need PNG/PDF export or if browser print/screenshot is enough.
  Done when: the maintainer has a recommendation and any follow-up implementation item is added.

### Icebox

- [ ] Add optional per-node explanatory tooltips or notes.
- [ ] Add print-specific polish if the diagram is used in handouts.

<!-- Ticket grammar (CANONICAL COPY — prompts and workflows point here,
     they do not restate it): quick items stay one line. Non-trivial or
     sign-off items add two lines so intent survives compression:
       - **ID Short title** [flags]
         Intent: the outcome wanted.
         Done when: the acceptance condition.
     Flags: [sign-off] (scope sign-off first), [blocked: X],
     [spike] (timeboxed investigation), [detail] (has a ticket file).
     Add optional Scope:/Risks: lines only for sign-off items. -->

<!-- FILE: pm_skills/project/brief.md -->

# Project Brief

<!-- Hot whole-file read. See pm_skills/memory-policy.md for limits. -->

## What are we building?

A self-contained HTML file that presents an interactive SVG diagram linking Laurillard learning types, teaching functions, and learner-journey stages. The diagram is driven by an embedded `categories` / `relationships` data model, lets the viewer drag headings to choose column order, and is intended to be opened directly in a browser without any build step or external assets.

## Who is it for?

The maintainer and education/pedagogy collaborators who need a clear visual aid for discussing how video functions across a learner journey.

## Platform and deployment

Static browser page. The canonical artifact is `laurillard_video_functions_learning_journey.html` at the repository root. It should work from `file://` and from ordinary static hosting.

## Core features (v1)

- Render a three-column relationship diagram as inline SVG.
- Let the user choose any column order by dragging or keyboard-moving
  the column headings.
- Show only relationships between current adjacent columns, with arrows
  flowing from the first column to the second and from the second column
  to the third.
- Highlight a related pathway when a user hovers, focuses, or clicks a label.
- Embolden connected text areas, strokes, and arrowheads while dimming unrelated items.
- Preserve relationship strengths (`strong`, `moderate`, `supporting`) in the rendered links.
- Keep arrows visually clean, with shafts connected to arrowhead bases and arrow tips landing on target boxes.
- Remain self-contained: no network calls, no external libraries, no generated build output.

## Constraints

- Preserve the one-file HTML deliverable.
- Keep JavaScript dependency-free and readable in the inline script.
- Prefer semantic SVG/HTML and keyboard-accessible interactions.
- Avoid adding runtime dependencies unless the maintainer explicitly approves.
- Treat PM-Skills files as project-management support, not part of the user-facing artifact.

## Out of scope (for now)

- Multi-page site structure.
- Framework migration to React/Vite/etc.
- External data loading.
- Server-side rendering or deployment-specific hosting code.
- Full automated visual regression unless the project grows beyond this single artifact.

## Open questions

- Whether exported PNG/PDF snapshots are needed.
- Whether the diagram should include explanatory text for each node beyond its label.

<!-- FILE: pm_skills/project/conventions.md -->

# Conventions

<!-- Hot whole-file read. See pm_skills/memory-policy.md for limits. -->

## Code style

- Keep the HTML file self-contained and dependency-free.
- Use plain, readable JavaScript with `const`/`let`, early returns, and named constants for geometry.
- Keep CSS selectors simple and tied to semantic classes (`.node`, `.nodeText`, `.link`, `.linkArrow`).
- Do not minify the source artifact; editability matters.

## Naming

- Use lower-case, hyphenated file names for project docs where new files are needed.
- Preserve `laurillard_video_functions_learning_journey.html` as the canonical artifact name.
- Keep model labels human-readable in `dataModel`; let the script generate SVG-safe IDs with `slugify`.

## Commit messages

- Prefer concise imperative commits, for example `Initialize Laurillard diagram project`.
- Mention PM-Skills changes explicitly when project memory or rulebooks are updated.

## Documentation

- Keep root docs short and operational.
- Store current project facts in `pm_skills/project/*`; store shipped history in `trajectory.md`; store rationale in `decision-log.md`.
- Do not duplicate decision-log prose into the backlog or trajectory.

## Testing

- Canonical gate: `npm run check`.
- The HTML check must verify the script parses, the model has 21 category nodes and 68 relationships, old SVG marker arrows are not reintroduced, generated arrowhead logic is present, legacy order buttons are absent, draggable heading logic, direction-independent adjacent-link filtering, and displayed left-to-right link rendering are present, and no external runtime assets are referenced.
- Browser visual checks are useful for arrow/hover refinements, but the no-dependency check remains the CI floor.

## Patterns to follow

- Keep diagram data and interaction rules visible in the HTML file.
- Preserve the `categories` / `relationships` model shape when changing data.
- Keep column reordering on the headings rather than separate visible
  order buttons.
- Keep category accents restrained and preserve the mobile diagram
  scroller when changing layout.
- Use CSS classes for visual state rather than inline style mutation.
- Preserve keyboard focus support on labels.
- Let the browser render the artifact directly without build tooling.

## Patterns to avoid

- Do not introduce external CDNs, remote fonts, analytics, or package-managed runtime assets.
- Do not move the diagram into a framework unless the maintainer explicitly changes the project direction.
- Do not reintroduce SVG `marker-end` arrows unless the shaft-to-arrowhead rendering issue is solved and verified.
- Do not leave PM-Skills root templates or project memory in placeholder state.

## Tooling

- Node.js 18+ for local checks.
- `check-links.mjs` from PM-Skills scaffold for local Markdown links.
- Custom scripts in `scripts/` for project-specific validation.

<!-- FILE: pm_skills/project/decision-log.md -->

# Decision Log

<!-- Append new decisions at the top. Don't edit old entries. -->
<!-- Hot sectional. Agents scan the latest 10 HEADINGS by default and
     open only the bodies relevant to the task. -->
<!-- This is the home of the WHY. The backlog/trajectory only point here. -->

## 2026-07-10 — Clarify diagram interface with restrained visual structure

**Decision:** Add a compact page header, subtle category accents, background column bands, numeric heading badges, grip marks on draggable headings, a relationship-strength key, and contained horizontal scrolling for the diagram on narrow screens.

**Rationale:** The prior UI was functional but visually flat, with weak affordance that headings could be moved. The revised interface gives users stronger orientation cues while preserving the single first-screen diagram and avoiding external dependencies.

**Alternatives considered:**

- Keep the diagram monochrome: simpler, but category identity and heading affordance remained too quiet.
- Build a richer control panel: discoverable, but heavier than the static artifact needs.

## 2026-07-10 — Render reordered adjacent relationships left-to-right

**Decision:** When columns are reordered, treat relationships as eligible if their two columns are adjacent in the displayed order, regardless of the relationship's authored source/target direction. Preserve the authored source/target as metadata, but render the visible arrow from the left displayed column to the right displayed column.

**Rationale:** The visible diagram reads as column 1 to 2 and column 2 to 3 after every reorder. Filtering only by authored direction meant some reordered arrangements still showed original-flow links or lost links entirely, which contradicted the displayed structure.

**Alternatives considered:**

- Preserve authored direction for both filtering and arrow direction: faithful to the data, but confusing after reorder.
- Duplicate reversed relationships in the data model: noisier and easier to desynchronise than deriving visual direction from the current order.

## 2026-07-10 — Use draggable headings and adjacent-flow filtering

**Decision:** Remove the visible column-order buttons. Make each column heading draggable and focusable for reordering, and render only links from the current first column to the second and from the current second column to the third.

**Rationale:** Heading-based reordering keeps the interface closer to the diagram itself, avoids a separate control row, and makes the currently visible flow easier to read. Filtering out third-to-first links prevents wraparound connections from implying an extra cyclic stage in the visible arrangement.

**Alternatives considered:**

- Keep the six header buttons: explicit, but visually heavier and now less direct than manipulating the headings.
- Show all relationship directions for every order: complete, but it reintroduces 3-to-1 wraparound lines that the maintainer asked to avoid.

## 2026-07-10 — Use pasted categories/relationships model and selectable column order

**Decision:** Replace the hard-coded SVG diagram with a renderer driven by an embedded `dataModel` containing `categories` and `relationships`, preserving relationship `strength` values and adding selectable column ordering.

**Rationale:** The maintainer supplied a clearer domain model than the original hand-authored paths. Rendering from that model makes future data changes safer and lets viewers inspect the relationship cycle from different column arrangements without changing the source artifact.

**Alternatives considered:**

- Keep static SVG and only add buttons that rearrange existing elements: less data-safe and harder to maintain.
- Move data to an external JSON file: cleaner separation, but it would break the self-contained file invariant.

## 2026-07-10 — Install PM-Skills as project-development layer

**Decision:** Add PM-Skills framework files, root rulebooks, project memory, a no-dependency quality gate, and CI for the diagram repository.

**Rationale:** The project is small, but future iterations still need persistent context: the one-file deliverable constraint, SVG interaction assumptions, and arrow rendering decisions are easy to lose between chats. PM-Skills provides that context without changing the runtime artifact.

**Alternatives considered:**

- Commit only the HTML file: simpler, but future agents would rediscover constraints repeatedly.
- Add a full frontend toolchain: unnecessary for the current single-file artifact.

## 2026-07-10 — Use explicit SVG polygons for arrowheads

**Decision:** Replace SVG marker arrows with generated `polygon` arrowheads and shorten each path so the shaft overlaps the arrowhead base.

**Rationale:** Browser marker rendering made emboldened shafts appear disconnected from, or pushed through, arrowheads. Explicit polygons keep the arrow tip on the target box edge while making the shaft visually meet the broad side of the arrowhead.

**Alternatives considered:**

- Tune marker `refX` and endpoint offsets: improved one symptom while creating another.
- Hand-edit every SVG path endpoint: brittle and harder to maintain.

<!-- FILE: pm_skills/project/file-map.md -->

# File Map

<!-- Add entries as files are created. One line per file. -->
<!-- Hot whole-file read. See pm_skills/memory-policy.md for limits. -->

## Entry point

- `laurillard_video_functions_learning_journey.html` — self-contained user-facing HTML/SVG diagram with embedded categories/relationships data, draggable column headings, category accents, adjacent-flow link rendering, responsive scroll containment, inline styling, and interaction logic.

## Project documentation and rules

- `README.md` — concise project overview, run/check instructions, and invariants.
- `AGENTS.md` — agent operating rules and PM-Skills read tiers for this repository.
- `UI-STANDARDS.md` — UI/accessibility expectations for the static diagram.
- `DEV-INFRASTRUCTURE.md` — package, runtime, check, CI, and version-management rules.
- `VERSION` — product version source for the static artifact.

## Project memory

- `pm_skills/project/brief.md` — product brief and scope boundaries.
- `pm_skills/project/architecture.md` — current stack, structure, and dependency policy.
- `pm_skills/project/conventions.md` — local editing, naming, testing, and tooling conventions.
- `pm_skills/project/backlog.md` — open work only.
- `pm_skills/project/decision-log.md` — append-only rationale for decisions.
- `pm_skills/project/trajectory.md` — shipped-work narrative.
- `pm_skills/project/wish-list.md` — cold inbox for unscoped ideas.
- `pm_skills/project/file-map.md` — this file.

## PM-Skills framework

- `pm_skills/GUIDE.md` — PM-Skills manual.
- `pm_skills/init.md` — PM-Skills project initialization workflow.
- `pm_skills/memory-policy.md` — memory size budgets and maintenance actions.
- `pm_skills/MANIFEST.md` — framework upgrade classes.
- `pm_skills/VERSION` — installed PM-Skills framework version.
- `pm_skills/CHANGELOG.md` — installed PM-Skills release history and upgrade notes.
- `pm_skills/prompts/*` — reusable workflow prompts.
- `pm_skills/integrations/*` — task, bugfix, and init-MVP workflow files.
- `pm_skills/scaffold/*` — upstream starter config retained for reference.

## Build and tooling

- `package.json` — no-dependency npm scripts.
- `check-links.mjs` — Markdown internal link checker from PM-Skills scaffold.
- `scripts/check-html.mjs` — validates the HTML data model, renderer contract, and interaction assumptions.
- `scripts/check-project-memory.mjs` — checks local PM-Skills customization files for placeholder drift.
- `.editorconfig` — editor-level formatting defaults.
- `.gitignore` — local ignore rules.
- `.markdownlint.json` — PM-Skills scaffold Markdown lint baseline retained for future use.
- `.github/workflows/check.yml` — CI quality gate.

<!-- FILE: pm_skills/project/trajectory.md -->

# Trajectory

<!-- Shipped-work narrative. Warm tier; agents do not auto-read this every task. -->
<!-- Compress on ship. One line per item: the outcome, not the implementation. -->

## Foundation — interactive static diagram (shipped 2026-07-10)

- DATA-1 — Replaced hard-coded SVG nodes/links with an embedded `categories` / `relationships` model. See decision-log 2026-07-10.
- ORDER-1 — Replaced column-order buttons with draggable/focusable headings and limited visible links to the current 1-to-2 and 2-to-3 flows. See decision-log 2026-07-10.
- ORDER-2 — Made reordered views select relationships by displayed adjacency and draw them left-to-right instead of preserving only authored data direction. See decision-log 2026-07-10.
- UI-1 — Added a compact page header, category accents, column bands, heading badges/grips, a relationship-strength key, and mobile diagram scroll containment. See decision-log 2026-07-10.
- INIT-1 — Created a self-contained HTML/SVG Laurillard video-functions learner-journey diagram with hover/focus/click pathway highlighting. See decision-log 2026-07-10.
- INIT-2 — Reworked arrow rendering so emboldened shafts meet arrowhead bases and arrow tips land cleanly on target boxes. See decision-log 2026-07-10.
- INIT-3 — Installed PM-Skills project memory, root rulebooks, local checks, and CI setup. See decision-log 2026-07-10.

Outcome: the project is a Git-ready static artifact with a documented development process.

<!-- FILE: pm_skills/project/wish-list.md -->

# Wish-list

<!-- Capture inbox for unscoped ideas. Cold tier; never auto-read. -->

## Open

- Explore a handout-friendly print layout if the diagram is used in workshops.

