<!-- field-report: project=laurillard-learner-journey · date=2026-07-10 · type=export
     · pm-skills=3.1.1 (installed with the first commit 2fef7cf on 2026-07-10; never upgraded)
     · source=rulebooks and contract files at 0341c0bb898776bf353a67d490ec7d9d73c24996, from Git blobs, taken 2026-09-24 by Claude Code (read from a scratch clone assembled from the remote and the checkout's objects, every ref set to its value at the cut-off 2026-09-24T11:40:00.000Z; content-addressed, so identical to the checkout's HEAD)
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained; uncommitted work, session logs and the bundle stay in the local lane -->

# Rulebook export

Snapshot: `0341c0bb898776bf353a67d490ec7d9d73c24996`. Files: `AGENTS.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md`, `README.md`, `VERSION`.

<!-- FILE: AGENTS.md -->

# AI Agent Rules

## Product Identity

**Laurillard Video Functions Learner Journey** is a static, self-contained
HTML/SVG diagram for exploring relationships between Laurillard learning
types, teaching functions, and learner-journey stages. The canonical
mental model is a single portable artifact with an embedded
`categories` / `relationships` data model plus project memory; this is
not a framework app unless the maintainer explicitly changes direction.

## Who You Are Working With

The maintainer owns the pedagogy, UX judgement, and macro structure.
Do the engineering work directly, explain tradeoffs plainly, and avoid
teaching implementation basics unless asked.

## Before Every Task

Read these hot files:

- `README.md`
- `pm_skills/project/brief.md`
- `pm_skills/project/architecture.md`
- `pm_skills/project/conventions.md`
- `pm_skills/project/file-map.md`

Read these by section:

- `pm_skills/project/backlog.md` - Active section only.
- `pm_skills/project/decision-log.md` - latest headings first, bodies
  only when relevant.
- `DEV-INFRASTRUCTURE.md` - Quality gate section before closing a task.

Read `UI-STANDARDS.md` when work touches layout, visual style,
interaction, accessibility, text, or user-facing behaviour. Read warm
or cold memory (`trajectory.md`, `wish-list.md`, archives, tickets)
only when explicitly relevant.

## Workflow

- For non-trivial work, use `pm_skills/integrations/task.md`.
- For small tweaks, use `pm_skills/prompts/quick-task.md`.
- For bugs, diagnose first with `pm_skills/integrations/bugfix.md`.
- At task close, run `npm run check`, update project memory, and report
  any residual risk.

## Hard Rules

- Preserve the one-file runtime artifact:
  `laurillard_video_functions_learning_journey.html`.
- No runtime dependencies, CDNs, remote fonts, or analytics without
  explicit maintainer approval.
- Keep the page usable from `file://`.
- Preserve keyboard focus support for interactive labels.
- Search the source before changing diagram behaviour; the SVG geometry
  and inline script are tightly coupled.
- Do not reintroduce SVG `marker-end` arrows without explicit visual
  verification that emboldened shafts meet arrowhead bases.
- Keep PM-Skills framework files upgradeable. Project-specific behaviour
  belongs in root rulebooks or `pm_skills/project/*`, not by editing
  framework prompts unless the task is explicitly a framework change.
- Do not hand-edit generated or external dependency directories if they
  are added later.

## Data And Interaction Model

The diagram uses an embedded `dataModel` object with `categories` and
`relationships`. Relationships use human-readable `source`, `target`,
and `strength` values; the inline script normalises labels into stable
SVG-safe node IDs, renders all nodes, filters links to the current
adjacent column pairs, renders those links left-to-right in the current
display order, generates explicit polygon arrowheads, and toggles CSS
classes for highlight state. Column headings are the drag/focus reorder
controls. Keep visual state in CSS classes rather than scattered inline
style mutation.

## Protected Paths

- `laurillard_video_functions_learning_journey.html` - production
  artifact; edit carefully and validate after changes.
- `pm_skills/project/*` - living memory; update intentionally, not as
  scratch notes.
- `pm_skills/VERSION`, `pm_skills/MANIFEST.md`, and
  `pm_skills/CHANGELOG.md` - framework version and upgrade sources.

## Files Agents Must Not Hand-Edit

- `node_modules/`
- `dist/`
- `.git/`
- Any future generated export directory unless it is documented in
  `DEV-INFRASTRUCTURE.md`.

<!-- FILE: UI-STANDARDS.md -->

# UI Standards

This project is a single static diagram, so the UI rules are practical
and focused on clarity, accessibility, and preserving the pedagogical
map.

## Design System

Use a restrained productive interface style: clear labels, high contrast,
stable geometry, and minimal decoration. Carbon remains the reference for
control clarity, spacing discipline, focus visibility, and state language,
but Carbon packages are not installed.

## Diagram Rules

- The three-column structure is the primary reading pattern.
- Treat column headings as the reorder controls; they must remain
  draggable, focusable, and visibly interactive.
- Use subtle category accents to help users distinguish Laurillard
  learning types, teaching functions, and learner journey stages.
- Preserve readable diagram scale on small screens with contained
  horizontal scrolling rather than shrinking labels until unreadable.
- Show only relationships between adjacent columns for the current order,
  with arrows flowing column 1 to 2 and column 2 to 3.
- Hover, focus, and click states must be equivalent in meaning.
- Highlighted pathways must embolden connected text areas, link shafts,
  and arrowheads while dimming unrelated elements.
- Arrow tips should land at the target box edge, and link shafts should
  visibly meet the broad side of arrowheads.
- Do not let text overlap boxes, links, or other labels at normal browser
  zoom.

## Accessibility

- Preserve SVG `title` and `desc` text.
- Keep label text focusable for keyboard users.
- Maintain visible focus and sufficient contrast for normal and dimmed
  states.
- Do not rely on colour alone; highlighted state also uses weight and
  stroke changes.
- Avoid motion that carries meaning. Existing opacity/stroke transitions
  should remain subtle and non-essential.

## Copy And Content

- Keep on-page guidance short and factual.
- Use pedagogy terms consistently: "Laurillard learning types",
  "Teaching functions", and "Learner journey".
- Avoid explanatory panels unless the project direction changes; the
  diagram should remain the first-screen experience.

## Diagnostics Affordance

There is no visible diagnostics control in the current static artifact.
For now, diagnostics are developer-side: browser console errors plus
`npm run check`. If the page gains richer interaction, add a dev-only
copy-diagnostics control that does not cover the diagram.

<!-- FILE: DEV-INFRASTRUCTURE.md -->

# Dev Infrastructure

This file defines how the project is viewed, checked, versioned, and
published.

## Package Management

Node.js 18+ is used only for local checks. There are no runtime packages
and no development dependencies at the current project size.

## Canonical Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `check` | `npm run check:html && npm run check:memory && npm run check:links` | Full non-mutating quality gate. |
| `check:html` | `node scripts/check-html.mjs` | Validate the self-contained HTML/SVG artifact. |
| `check:memory` | `node scripts/check-project-memory.mjs` | Validate project-specific PM-Skills files. |
| `check:links` | `node check-links.mjs` | Check internal Markdown links. |

## Dev Server

No server is required. Open `laurillard_video_functions_learning_journey.html`
directly in a browser. Optional static serving can use `npx serve .` when
testing HTTP behaviour.

## Runtime Lifecycle

- Boot/view: open the HTML file directly.
- Reboot: refresh the browser tab.
- Status: run `npm run check`.
- Logs: use browser DevTools console for the static page.
- Reset: there is no generated runtime state to reset.

## Maintainer Diagnostics

Tier 0. Runtime diagnostics are limited to browser console errors and
the local quality gate. The project has no app-owned logging buffer or
copy-diagnostics UI yet. Add one only if interaction complexity grows.

## Quality Gate

The canonical quality gate is:

```sh
npm run check
```

It is non-mutating and CI-safe. It validates the HTML artifact, checks
PM-Skills local customisation files, and checks internal Markdown links.
It deliberately omits full browser visual regression; use headless Chrome
or manual browser inspection when changing SVG geometry, arrowheads, or
highlight rendering.

## Build System

There is no build system. The source HTML file is the deployable artifact.
Do not add bundling or generated output unless the maintainer changes the
project direction.

## Version Management

The current product version source is the root `VERSION` file. Start at
`v0.1.0` while the artifact is pre-release. Use Git commit SHA as the
machine-traceable build identity when publishing or diagnosing a specific
copy.

## CI

GitHub Actions runs `npm run check` on pushes and pull requests to `main`.

## Deployment

The repository is the source of truth. Deployment is any static hosting
or direct sharing of `laurillard_video_functions_learning_journey.html`.

<!-- FILE: README.md -->

# Laurillard Video Functions Learner Journey

A self-contained HTML/SVG diagram connecting Laurillard learning types,
teaching functions, and learner-journey stages. The diagram is data-driven,
lets the viewer drag headings to change the column order, and is designed to be opened
directly in a browser as one portable HTML file.

## Run

Open `laurillard_video_functions_learning_journey.html` in a browser.
No build step, server, package install, or network access is required.

Optional local static serving:

```sh
npx serve .
```

## Check

Run the no-dependency quality gate:

```sh
npm run check
```

The gate validates the HTML/SVG interaction contract, checks local
Markdown links, and verifies the project-specific PM-Skills memory files
are not still in template state.

## Key Files

- `laurillard_video_functions_learning_journey.html` is the production
  artifact.
- `pm_skills/` contains the installed PM-Skills framework and project
  memory.
- `AGENTS.md`, `UI-STANDARDS.md`, and `DEV-INFRASTRUCTURE.md` are the
  project-specific rulebooks for future agent sessions.

## Invariants

- Keep the diagram self-contained.
- Do not add runtime dependencies without explicit approval.
- Preserve hover, focus, and click pathway highlighting.
- Preserve the embedded `categories` / `relationships` data model.
- Render only relationships between current adjacent columns, with arrows
  flowing column 1 to 2 and column 2 to 3.
- Do not reintroduce SVG marker arrows unless the shaft-to-arrowhead
  rendering issue is intentionally revisited and verified.

<!-- FILE: VERSION -->

v0.1.0

