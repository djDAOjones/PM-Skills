<!-- field-report: project=artwork-form-filler · date=2026-06-14 · type=export
     · pm-skills=2.2.1 (installed with the initial commit 2c02f80 on 2026-06-13; never upgraded)
     · source=git log --name-status through 02d414590a5f4a66714be8764b0039a5e4e7bc7a, all 8 commits reachable from it, newest first, taken 2026-09-24 by Claude Code (read from a scratch clone assembled from the remote and the checkout's objects, every ref set to its value at the cut-off 2026-09-24T11:40:00.000Z; content-addressed, so identical to the checkout's HEAD)
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained; uncommitted memory, session logs and the bundle stay in the local lane -->

# Full Git log

Through `02d414590a5f4a66714be8764b0039a5e4e7bc7a`. Lane: tracked: repository public and 02d414590a5f on GitHub (checked 2026-09-24T11:49:02.986Z).

<!-- FILE: git-log-through-02d414590a5f.txt -->

commit 02d414590a5f4a66714be8764b0039a5e4e7bc7a
Author: djDAOjones
Author date: 2026-06-14T02:07:38+01:00
Commit date: 2026-06-14T02:07:38+01:00
Parents: 3fb0b4310ba6ac86db3cec0dea77fb3edb67f0a2
Subject: docs: record seed-on-load + preview backdrop (auto-jazz)

- decision-log + trajectory: add the "Preview & seed UX" entries,
  including the auto-jazz deferral calls (Web Worker skipped per perf
  numbers; attempt cache + resolution tuning need visual sign-off;
  Icebox needs product direction).
- backlog: remove the two shipped Next-milestone items.
- file-map: note render.ts preview-only backdrop + CanvasStage toggle.
Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
commit 3fb0b4310ba6ac86db3cec0dea77fb3edb67f0a2
Author: djDAOjones
Author date: 2026-06-14T02:07:28+01:00
Commit date: 2026-06-14T02:07:28+01:00
Parents: 1700c5047ddf45dc688e9810214e5c72e23d7298
Subject: Feature: seed-on-load + preview shape backdrop

- Seed: live seed initialises to a fresh randomSeed() once per load
  (lazy useState); DEFAULT_SETTINGS.seed stays deterministic so
  defaults/tests are pure.
- Preview backdrop: renderToCanvas takes an optional RenderOptions
  (backdrop image + alpha); the preview draws the target shape faintly
  (0.12) behind the silhouettes. exportComposition never passes it, so
  the exported PNG stays silhouettes-on-transparent.
- Preview now renders whenever a target exists (shape visible before &
  after generation); empty-state guidance overlays the faint shape and
  hides while generating.
- "Show shape" toggle (default on) in the stage toolbar.
- Output-preserving for the suite: 26 tests green, build clean.
Changed files:

M	src/components/App.tsx
M	src/components/CanvasStage.tsx
M	src/lib/render.ts
M	styles/app.css
commit 1700c5047ddf45dc688e9810214e5c72e23d7298
Author: djDAOjones
Author date: 2026-06-14T01:53:04+01:00
Commit date: 2026-06-14T01:53:04+01:00
Parents: ea10df52a6010f69afe69c2c59f4cc173d7a45dc
Subject: docs: record presets / high-res export / auto-fit milestone

- backlog: remove the three shipped Current-milestone items.
- decision-log + trajectory: add the feature-milestone entries.
- file-map: add presets.ts, vite-env.d.ts, assets/presets/, and note
  the new loaders/render decoupling + export constants.
Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
commit ea10df52a6010f69afe69c2c59f4cc173d7a45dc
Author: djDAOjones
Author date: 2026-06-14T01:52:52+01:00
Commit date: 2026-06-14T01:52:52+01:00
Parents: 2a0b21b083758a3eccc37a7e7d91cbfdb0a4b1ed
Subject: Feature: auto-fit scaling toggle

- Add Settings.autoFit (default false). When on, reuse mode sizes every
  placement by one uniform area-budget scale sqrt(density*area / sum area)
  with sizeVariation jitter, instead of random Min/Max sizing — matching
  the use-each-once base scale.
- Controls: "Auto-fit size to the shape" checkbox; hide Min/Max sliders
  when it is on.
- The autoFit=false path keeps the exact rng sequence, so the placement
  determinism + snapshot tests are unchanged. Added an auto-fit
  determinism test (26 tests green).
Changed files:

M	src/components/Controls.tsx
M	src/lib/__tests__/placement.test.ts
M	src/lib/placement.ts
M	src/lib/types.ts
commit 2a0b21b083758a3eccc37a7e7d91cbfdb0a4b1ed
Author: djDAOjones
Author date: 2026-06-14T01:49:43+01:00
Commit date: 2026-06-14T01:49:43+01:00
Parents: bbb7550e052a20c34819df0d4076064d68d44e59
Subject: Feature: high-res export size control

- Decouple preview from export: renderToCanvas takes an explicit output
  longest side; preview renders at PREVIEW_MAX_DIM (1400px), export
  renders to an offscreen canvas at the chosen size.
- exportComposition() renders + downloads at the selected size.
- Export size selector (2048 / 3600 / 4800 px, default 3600) with a
  resulting-dimensions readout in the stage toolbar.
- Replace MIN_EXPORT_DIM with PREVIEW_MAX_DIM / EXPORT_DIMS /
  DEFAULT_EXPORT_DIM.
Changed files:

M	src/components/App.tsx
M	src/components/CanvasStage.tsx
M	src/lib/render.ts
M	src/lib/types.ts
M	styles/app.css
commit bbb7550e052a20c34819df0d4076064d68d44e59
Author: djDAOjones
Author date: 2026-06-14T01:41:23+01:00
Commit date: 2026-06-14T01:41:23+01:00
Parents: ad25d284bbc60d534f7b6fc0a41057928dc302ee
Subject: Feature: bundled presets + auto-load demo on first launch

- Bundle example shapes + filler silhouettes under src/assets/presets/,
  collected via import.meta.glob (src/lib/presets.ts) so new PNGs
  register automatically.
- loadTargetFromUrl / loadSourceFromUrl reuse the existing loaders for
  bundled assets (fetch -> File).
- Uploaders: clickable "Example shapes" thumbnail grid (aria-pressed
  selection) + "Load example silhouettes" button.
- App: first-run demo auto-loads a default shape + the filler set
  (localStorage-guarded) and auto-generates, so the app opens on a
  finished example.
- Add src/vite-env.d.ts for Vite client types (import.meta.glob).
Changed files:

A	src/assets/presets/fillers/Grantham-Capoeira-2026-03-26-20-P1570570.png
A	src/assets/presets/fillers/Grantham-Capoeira-2026-03-26-39-P1570702.png
A	src/assets/presets/fillers/Grantham-Capoeira-2026-03-26-42-P1570717.png
A	src/assets/presets/fillers/Grantham-Capoeira-2026-04-02-115-P1580968.png
A	src/assets/presets/fillers/Grantham-Capoeira-2026-04-02-126-Panasonic-DMC-GX8-5184x3888_000058.png
A	src/assets/presets/fillers/Grantham-Capoeira-2026-04-02-129-Panasonic-DMC-GX8-5184x3888_000082.png
A	src/assets/presets/fillers/Grantham-Capoeira-2026-04-02-133-Panasonic-DMC-GX8-5184x3888_000121.png
A	src/assets/presets/fillers/Grantham-Capoeira-2026-04-02-144-Panasonic-DMC-GX8-5184x3888_000197.png
A	src/assets/presets/fillers/Grantham-Capoeira-2026-04-02-155-Panasonic-DMC-GX8-5184x3888_000295.png
A	src/assets/presets/fillers/Grantham-Capoeira-2026-04-02-174-Panasonic-DMC-GX8-5184x3888_000427.png
A	src/assets/presets/fillers/Grantham-Capoeira-2026-04-02-182-Panasonic-DMC-GX8-5184x3888_000503.png
A	src/assets/presets/fillers/Grantham-Capoeira-2026-04-02-196-Panasonic-DMC-GX8-5184x3888_000611.png
A	src/assets/presets/fillers/Grantham-Capoeira-2026-04-02-205-P1580485.png
A	src/assets/presets/fillers/Grantham-Capoeira-2026-04-02-67-P1580583.png
A	src/assets/presets/fillers/Grantham-Capoeira-2026-04-02-74-P1580626.png
A	src/assets/presets/fillers/Grantham-Capoeira-2026-04-02-79-P1580674.png
A	src/assets/presets/fillers/Grantham-Capoeira-2026-04-02-90-P1580800.png
A	src/assets/presets/fillers/Grantham-Capoeira-2026-04-02-96-P1580848.png
A	src/assets/presets/shapes/Circle 1.png
A	src/assets/presets/shapes/Circular double.png
A	src/assets/presets/shapes/Circular.png
A	src/assets/presets/shapes/Hexagonal 1.png
A	src/assets/presets/shapes/Triangular 1.png
M	src/components/App.tsx
M	src/components/Uploaders.tsx
M	src/lib/imageLoading.ts
A	src/lib/presets.ts
A	src/vite-env.d.ts
M	styles/app.css
commit ad25d284bbc60d534f7b6fc0a41057928dc302ee
Author: djDAOjones
Author date: 2026-06-14T01:33:58+01:00
Commit date: 2026-06-14T01:33:58+01:00
Parents: 2c02f80179e1693fad049bd646be22361056a252
Subject: Baseline: MVP source + placement performance pass

First commit of the Artwork Form Filler source tree (browser-only
React + TypeScript + Vite raster-mask form filler): core libs
(rng, types, imageLoading, mask, transform, placement, render), UI
components, styles, configs, and the Vitest suite.

Performance pass (output-preserving):
- rasterizeTransformed reuses module-level scratch Int32Arrays filled
  in a single pass and returned with a valid count, replacing the
  per-attempt number[] + Int32Array.from churn. Consumers already
  iterate by count, so output is identical. ~1.43x (reuse) / ~1.25x
  (use-each-once) faster.
- Added a seeded benchmark (npm run bench) and a placement
  determinism / containment-overlap / output-snapshot safety net.
  25 tests green; build clean.

Also includes maintainer reference assets under _maintainer_files/.
Changed files:

A	.editorconfig
A	.gitignore
M	AGENTS.md
M	DEV-INFRASTRUCTURE.md
A	README.md
M	UI-STANDARDS.md
A	_maintainer_files/Illustrator/Artwork form shapes.ai
A	_maintainer_files/example filling images/Grantham Capoeira silhouettes June 2026.zip
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-03-26-20-P1570570.png
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-03-26-39-P1570702.png
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-03-26-42-P1570717.png
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-04-02-115-P1580968.png
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-04-02-126-Panasonic-DMC-GX8-5184x3888_000058.png
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-04-02-129-Panasonic-DMC-GX8-5184x3888_000082.png
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-04-02-133-Panasonic-DMC-GX8-5184x3888_000121.png
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-04-02-144-Panasonic-DMC-GX8-5184x3888_000197.png
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-04-02-155-Panasonic-DMC-GX8-5184x3888_000295.png
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-04-02-174-Panasonic-DMC-GX8-5184x3888_000427.png
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-04-02-182-Panasonic-DMC-GX8-5184x3888_000503.png
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-04-02-196-Panasonic-DMC-GX8-5184x3888_000611.png
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-04-02-205-P1580485.png
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-04-02-67-P1580583.png
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-04-02-74-P1580626.png
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-04-02-79-P1580674.png
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-04-02-90-P1580800.png
A	_maintainer_files/example filling images/Grantham-Capoeira-2026-04-02-96-P1580848.png
A	_maintainer_files/example shapes/Circle 1.png
A	_maintainer_files/example shapes/Circular double.png
A	_maintainer_files/example shapes/Circular.png
A	_maintainer_files/example shapes/Hexagonal 1.png
A	_maintainer_files/example shapes/Triangular 1.png
A	index.html
A	package-lock.json
A	package.json
M	pm_skills/project/architecture.md
M	pm_skills/project/backlog.md
M	pm_skills/project/brief.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
A	src/components/App.tsx
A	src/components/CanvasStage.tsx
A	src/components/Controls.tsx
A	src/components/Report.tsx
A	src/components/Uploaders.tsx
A	src/components/icons.tsx
A	src/index.css
A	src/lib/__tests__/__snapshots__/placement.test.ts.snap
A	src/lib/__tests__/mask.test.ts
A	src/lib/__tests__/placement.bench.ts
A	src/lib/__tests__/placement.test.ts
A	src/lib/__tests__/rng.test.ts
A	src/lib/__tests__/transform.test.ts
A	src/lib/imageLoading.ts
A	src/lib/mask.ts
A	src/lib/placement.ts
A	src/lib/render.ts
A	src/lib/rng.ts
A	src/lib/transform.ts
A	src/lib/types.ts
A	src/main.tsx
A	styles/app.css
A	styles/tokens.css
A	tsconfig.json
A	tsconfig.node.json
A	vite.config.ts
commit 2c02f80179e1693fad049bd646be22361056a252
Author: djDAOjones
Author date: 2026-06-13T22:24:15+01:00
Commit date: 2026-06-13T22:24:15+01:00
Parents: 
Subject: Initial commit: project memory and standards files


Changed files:

A	AGENTS.md
A	DEV-INFRASTRUCTURE.md
A	UI-STANDARDS.md
A	pm_skills/CHANGELOG.md
A	pm_skills/GUIDE.md
A	pm_skills/MANIFEST.md
A	pm_skills/VERSION
A	pm_skills/init.md
A	pm_skills/integrations/auto-jazz-lite.md
A	pm_skills/integrations/auto-jazz.md
A	pm_skills/integrations/bugfix.md
A	pm_skills/integrations/feature.md
A	pm_skills/integrations/init-mvp.md
A	pm_skills/integrations/init-project.md
A	pm_skills/integrations/prune-memory.md
A	pm_skills/integrations/spec-to-prod.md
A	pm_skills/integrations/upgrade.md
A	pm_skills/project/architecture.md
A	pm_skills/project/backlog.md
A	pm_skills/project/brief.md
A	pm_skills/project/conventions.md
A	pm_skills/project/decision-log.md
A	pm_skills/project/file-map.md
A	pm_skills/project/trajectory.md
A	pm_skills/project/wish-list.md
A	pm_skills/prompts/bug-scoping.md
A	pm_skills/prompts/corrections.md
A	pm_skills/prompts/deploy.md
A	pm_skills/prompts/design-options.md
A	pm_skills/prompts/doctor-memory.md
A	pm_skills/prompts/end-of-task.md
A	pm_skills/prompts/implementation-plan.md
A	pm_skills/prompts/next-batch.md
A	pm_skills/prompts/prune-memory.md
A	pm_skills/prompts/quick-task.md
A	pm_skills/prompts/release.md
A	pm_skills/prompts/roadmap-refactor.md
A	pm_skills/prompts/scoping.md
A	pm_skills/prompts/session-start.md
A	pm_skills/prompts/upgrade.md
A	pm_skills/prompts/validation.md
A	pm_skills/scaffold/.editorconfig
A	pm_skills/scaffold/.gitignore
