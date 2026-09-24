<!-- field-report: project=dot-crowd-navigator · date=2026-08-17 · type=export
     · pm-skills=unversioned (pre-1.0.0 framework tree: pm_skills/ with project memory and no VERSION file; committed on 2026-08-17 in an as-found snapshot of the April work)
     · source=git log --name-status through 8d388802cccda3462e8bd110fae636a9db4ba845, all 7 commits reachable from it, newest first, taken 2026-09-24 by Claude Code (read from a scratch clone assembled from the remote and the checkout's objects, every ref set to its value at the cut-off 2026-09-24T11:40:00.000Z; content-addressed, so identical to the checkout's HEAD)
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 2 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained; session logs and the bundle stay in the local lane -->

# Full Git log

Through `8d388802cccda3462e8bd110fae636a9db4ba845`. Lane: tracked: repository public and 8d388802cccd on GitHub (checked 2026-09-24T11:46:20.791Z).

<!-- FILE: git-log-through-8d388802cccd.txt -->

commit 8d388802cccda3462e8bd110fae636a9db4ba845
Author: djDAOjones
Author date: 2026-08-17T19:53:54+01:00
Commit date: 2026-08-17T19:53:54+01:00
Parents: 08801103e2723c4fdb9ad6bb67384b3ea4073fc0
Subject: Restore lost source: tracked files from f99f0ab + Windsurf local history

OneDrive offloading destroyed the src/ tree. This restores:
- tracked legacy files from git (their deletion was an unfinished backlog
  task, not yet real at the last session)
- lost newer work from Windsurf local-history snapshots (2026-05-03):
  clean-shell main.js (v27), GraphModel.js, GraphRenderer.js,
  GraphInteractionHandler.js, CoordinateTransform.js, constants.js,
  RenderingService.js (graph-guard variant)

Still missing (no history entries; see SALVAGE-NOTE.md): SwarmEngine.js,
SimulationState.js, DotRenderer.js, GraphUIController.js — their test
suites survive in tests/.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

A	src/components/Dropdown.js
A	src/components/ParamTooltip.js
A	src/components/SwatchPicker.js
A	src/components/Tooltip.js
M	src/config/constants.js
M	src/config/helpContent.js
M	src/config/keybindings.js
M	src/config/tooltips.js
A	src/controllers/SectionController.js
A	src/controllers/UIController.js
M	src/core/EventBus.js
A	src/handlers/GraphInteractionHandler.js
A	src/handlers/InteractionHandler.js
A	src/main.js
A	src/models/AnimationState.js
A	src/models/GraphEdge.js
A	src/models/GraphModel.js
A	src/models/GraphNode.js
A	src/models/ImageAsset.js
A	src/models/Waypoint.js
A	src/models/index.js
A	src/services/AnimationEngine.js
A	src/services/AreaDrawingService.js
A	src/services/AreaEditService.js
A	src/services/AreaHighlightRenderer.js
A	src/services/BeaconRenderer.js
A	src/services/CameraService.js
A	src/services/CoordinateTransform.js
A	src/services/GraphRenderer.js
A	src/services/HTMLExportService.js
A	src/services/ImageAssetService.js
A	src/services/MotionVisibilityService.js
A	src/services/PathCalculator.js
A	src/services/PathCalculatorWithWorker.js
A	src/services/RenderingService.js
A	src/services/StorageService.js
A	src/services/TextLabelService.js
A	src/services/UndoService.js
A	src/services/VideoExporter.js
A	src/services/index.js
M	src/utils/CatmullRom.js
M	src/utils/Easing.js
M	src/utils/focusTrap.js
M	src/utils/index.js
A	src/workers/pathWorker.js
commit 08801103e2723c4fdb9ad6bb67384b3ea4073fc0
Author: djDAOjones
Author date: 2026-08-17T19:52:54+01:00
Commit date: 2026-08-17T19:52:54+01:00
Parents: f99f0ab06d04f5ebeddc2f97f26695c3c5a2ff1a
Subject: As-found snapshot: last local working state, recovered 2026-08-17

Working tree exactly as recovered from the OneDrive working copy after
file-offloading damage (src/ subdirectories emptied; content re-hydrated
via OneDrive restart). Never pushed before today: pm_skills framework +
populated project memory, SwarmEngine/SimulationState/GraphModel test
suites, clean-shell teardown (main_legacy.js / index_legacy.html), and
updated rulebooks. See SALVAGE-NOTE.md.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	.editorconfig
M	.gitignore
A	.windsurf/workflows/bugfix.md
D	.windsurf/workflows/feature-scoping.md
A	.windsurf/workflows/feature.md
A	.windsurf/workflows/init-project.md
M	AGENTS.md
A	AGENTS.md.new
A	DEV-INFRASTRUCTURE.md
M	README.md
A	SALVAGE-NOTE.md
M	UI-STANDARDS.md
M	Windsurf Map Router.code-workspace
M	_Joe/Dot Crowd Navigator App Overview.md
M	_Joe/WAVE Report of Route Plotter v3.1.506.html
M	_Joe/design docs/Colour.html
M	_Joe/design docs/UI Audit - Carbon + Nielsen.md
M	_Joe/design docs/UI from ChatGPT
M	_Joe/design docs/saved/Archive/automatic_version_display_with_server.md
M	_Joe/design docs/saved/Archive/route_plotter_v3_styling_pack spec/route_plotter_v3_components_uon_carbon.css
M	_Joe/design docs/saved/Archive/route_plotter_v3_styling_pack spec/route_plotter_v3_tokens_uon_carbon.css
M	_Joe/design docs/saved/Archive/route_plotter_v3_styling_pack spec/route_plotter_v3_uon_integrated_design_system.md
M	_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/route_plotter_v3_map_ink_tokens_optional.css
M	_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/route_plotter_v3_swatch_picker.css
M	_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/route_plotter_v3_swatch_picker.js
M	_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/route_plotter_v3_swatch_picker_spec.md
M	_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/swatch_picker_demo.html
M	_Joe/design docs/saved/Archive/route_plotter_v3_wcag_aaa_intent_consolidated.md
M	_Joe/design docs/saved/UoN Colours from UoN ER.html
M	_Joe/design docs/saved/route_plotter_v3_1_400_ux_wcag_aaa_review.md
M	_Joe/design docs/saved/ui_list.md
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.35.38 1440x900.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.35.43 1440x900 Keyboard shortcuts expanded but not brililant visual cue they are below or expanded.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.35.53 scrolled down to show shortcuts.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.36.00 scrolled to end of shortcuts.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.39.51 waypoints initially placed.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.40.46 mid play.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.41.10 all left sidebar expanded using full page image capture plugin.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.41.10 all left sidebar expanded.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.42.40 export drop down clicked.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.42.43 examples drop down clicked.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.43.05 edit switch toggled - warning message causes new line on title.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.45.20 2560 x 1440.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.45.26 2560 x 1440.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.45.33 2560 x 1440.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.45.49 2560 x 1440.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 10.01.31 768x1024.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 10.01.46 960x540.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 10.02.00 360x800.png
M	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 10.16.15 waypoint selected.png
M	_Joe/dev helper scripts/push_github.js
M	_Joe/dev notes/Future Features.md
M	_Joe/dev notes/Unit Tests.md
M	_Joe/dev notes/dev guide READ_ME.md
M	_Joe/dev notes/example feature.md
M	_Joe/useful prompt fragments.txt
A	ai_project_manager_example/README.md
A	ai_project_manager_example/project/architecture.md
A	ai_project_manager_example/project/backlog.md
A	ai_project_manager_example/project/brief.md
A	ai_project_manager_example/project/conventions.md
A	ai_project_manager_example/project/decision-log.md
A	ai_project_manager_example/project/file-map.md
M	build.js
M	docs/UoN_map 24-bit.png
M	docs/UoN_map.png
M	docs/app.js
M	docs/app.js.map
M	docs/images/Court.png
M	docs/images/Courts.jpg
M	docs/images/Garlic.jpg
M	docs/images/Nervous_System.jpg
M	docs/images/PARM_Aerial.jpg
M	docs/images/Rocketry.jpg
M	docs/images/UoN_map.png
A	docs/images/route-project-2026-03-28 (2).zip
M	docs/index.html
M	docs/meta.json
M	docs/styles/dropdown.css
M	docs/styles/main.css
M	docs/styles/swatch-picker.css
M	docs/styles/tokens.css
M	docs/styles/tooltip.css
M	examples/route-project-2026-01-10.zip
M	images/Court.png
M	images/Garlic.jpg
M	images/Nervous_System.jpg
M	images/PARM_Aerial.jpg
M	images/Rocketry.jpg
M	images/UoN_map.png
M	images/route-project-2026-03-28 (2).zip
M	index.html
A	index_legacy.html
M	package.json
A	pm_skills/GUIDE.md
A	pm_skills/init.md
A	pm_skills/integrations/bugfix.md
A	pm_skills/integrations/feature.md
A	pm_skills/integrations/init-project.md
A	pm_skills/project/architecture.md
A	pm_skills/project/backlog.md
A	pm_skills/project/brief.md
A	pm_skills/project/conventions.md
A	pm_skills/project/decision-log.md
A	pm_skills/project/file-map.md
A	pm_skills/prompts/bug-scoping.md
A	pm_skills/prompts/corrections.md
A	pm_skills/prompts/design-options.md
A	pm_skills/prompts/implementation-plan.md
A	pm_skills/prompts/quick-task.md
A	pm_skills/prompts/scoping.md
A	pm_skills/prompts/session-start.md
A	pm_skills/prompts/validation.md
A	pm_skills/scaffold/.editorconfig
A	pm_skills/scaffold/.gitignore
M	push.js
D	src/components/Dropdown.js
D	src/components/ParamTooltip.js
D	src/components/SwatchPicker.js
D	src/components/Tooltip.js
M	src/config/constants.js
M	src/config/helpContent.js
M	src/config/keybindings.js
M	src/config/tooltips.js
D	src/controllers/SectionController.js
D	src/controllers/UIController.js
M	src/core/EventBus.js
D	src/handlers/InteractionHandler.js
R099	src/main.js	src/main_legacy.js
D	src/models/AnimationState.js
D	src/models/GraphEdge.js
D	src/models/GraphNode.js
D	src/models/ImageAsset.js
D	src/models/Waypoint.js
D	src/models/index.js
D	src/services/AnimationEngine.js
D	src/services/AreaDrawingService.js
D	src/services/AreaEditService.js
D	src/services/AreaHighlightRenderer.js
D	src/services/BeaconRenderer.js
D	src/services/CameraService.js
D	src/services/CoordinateTransform.js
D	src/services/HTMLExportService.js
D	src/services/ImageAssetService.js
D	src/services/MotionVisibilityService.js
D	src/services/PathCalculator.js
D	src/services/PathCalculatorWithWorker.js
D	src/services/RenderingService.js
D	src/services/StorageService.js
D	src/services/TextLabelService.js
D	src/services/UndoService.js
D	src/services/VideoExporter.js
D	src/services/index.js
M	src/utils/CatmullRom.js
M	src/utils/Easing.js
M	src/utils/focusTrap.js
M	src/utils/index.js
D	src/workers/pathWorker.js
M	styles/dropdown.css
M	styles/main.css
M	styles/swatch-picker.css
M	styles/tokens.css
M	styles/tooltip.css
M	tests/GraphEdge.test.js
A	tests/GraphModel.test.js
M	tests/GraphNode.test.js
A	tests/SimulationState.test.js
A	tests/SwarmEngine.test.js
M	tests/example.test.js
M	tests/setup.js
M	version.json
M	vitest.config.js
commit f99f0ab06d04f5ebeddc2f97f26695c3c5a2ff1a
Author: djDAOjones
Author date: 2026-04-13T23:27:36+01:00
Commit date: 2026-04-13T23:27:36+01:00
Parents: e78d1856a6926681041ce94e391d8c0dce446a02
Subject: feat: add GraphEdge model and unit tests

- Add GraphEdge.js model for graph edge connections
- Add GraphEdge.test.js unit tests
Changed files:

A	src/models/GraphEdge.js
A	tests/GraphEdge.test.js
commit e78d1856a6926681041ce94e391d8c0dce446a02
Author: djDAOjones
Author date: 2026-04-13T23:22:48+01:00
Commit date: 2026-04-13T23:22:48+01:00
Parents: 6a7b8b0682181283c7b5c53f4fe2284adb6e54c2
Subject: feat: add GraphNode model and unit tests

- Add GraphNode.js model for graph data structure
- Add GraphNode.test.js unit tests
Changed files:

A	src/models/GraphNode.js
A	tests/GraphNode.test.js
commit 6a7b8b0682181283c7b5c53f4fe2284adb6e54c2
Author: djDAOjones
Author date: 2026-04-13T23:18:45+01:00
Commit date: 2026-04-13T23:18:45+01:00
Parents: 99b858b5853dd53a43890ce41a38c1c06824c08e
Subject: docs: add AGENTS.md, UI-STANDARDS.md, and update README/docs

- Add AGENTS.md for AI assistant guidelines
- Add UI-STANDARDS.md for design system documentation
- Update README and documentation
- Add Court.png image asset
- Create .windsurf/ workflows directory
Changed files:

A	.windsurf/workflows/feature-scoping.md
A	AGENTS.md
M	README.md
A	UI-STANDARDS.md
A	docs/images/Court.png
M	docs/index.html
M	package.json
M	src/config/constants.js
M	src/main.js
M	version.json
commit 99b858b5853dd53a43890ce41a38c1c06824c08e
Author: djDAOjones
Author date: 2026-04-12T02:49:24+01:00
Commit date: 2026-04-12T02:49:24+01:00
Parents: e76b54a5f9a2b4be1b2fd107e51fd9187345ca50
Subject: Initial commit for Dot Crowd Navigator


Changed files:

A	_Joe/Dot Crowd Navigator App Overview.md
commit e76b54a5f9a2b4be1b2fd107e51fd9187345ca50
Author: djDAOjones
Author date: 2026-04-12T02:41:26+01:00
Commit date: 2026-04-12T02:41:26+01:00
Parents: 
Subject: Replace with router-plotter-02 codebase


Changed files:

A	.editorconfig
A	.gitignore
A	README.md
A	Windsurf Map Router.code-workspace
A	_Joe/WAVE Report of Route Plotter v3.1.506.html
A	_Joe/design docs/Colour.html
A	_Joe/design docs/UI Audit - Carbon + Nielsen.md
A	_Joe/design docs/UI from ChatGPT
A	_Joe/design docs/saved/Archive/automatic_version_display_with_server.md
A	_Joe/design docs/saved/Archive/route_plotter_v3_styling_pack spec/route_plotter_v3_components_uon_carbon.css
A	_Joe/design docs/saved/Archive/route_plotter_v3_styling_pack spec/route_plotter_v3_tokens_uon_carbon.css
A	_Joe/design docs/saved/Archive/route_plotter_v3_styling_pack spec/route_plotter_v3_uon_integrated_design_system.md
A	_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/route_plotter_v3_map_ink_tokens_optional.css
A	_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/route_plotter_v3_swatch_picker.css
A	_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/route_plotter_v3_swatch_picker.js
A	_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/route_plotter_v3_swatch_picker_spec.md
A	_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/swatch_picker_demo.html
A	_Joe/design docs/saved/Archive/route_plotter_v3_wcag_aaa_intent_consolidated.md
A	_Joe/design docs/saved/UoN Colours from UoN ER.html
A	_Joe/design docs/saved/route_plotter_v3_1_400_ux_wcag_aaa_review.md
A	_Joe/design docs/saved/ui_list.md
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.35.38 1440x900.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.35.43 1440x900 Keyboard shortcuts expanded but not brililant visual cue they are below or expanded.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.35.53 scrolled down to show shortcuts.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.36.00 scrolled to end of shortcuts.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.39.51 waypoints initially placed.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.40.46 mid play.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.41.10 all left sidebar expanded using full page image capture plugin.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.41.10 all left sidebar expanded.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.42.40 export drop down clicked.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.42.43 examples drop down clicked.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.43.05 edit switch toggled - warning message causes new line on title.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.45.20 2560 x 1440.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.45.26 2560 x 1440.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.45.33 2560 x 1440.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.45.49 2560 x 1440.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 10.01.31 768x1024.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 10.01.46 960x540.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 10.02.00 360x800.png
A	_Joe/design docs/screenshots/Screenshot 2026-02-08 at 10.16.15 waypoint selected.png
A	_Joe/dev helper scripts/push_github.js
A	_Joe/dev helper scripts/restart_localhost.sh
A	_Joe/dev notes/Future Features.md
A	_Joe/dev notes/Unit Tests.md
A	_Joe/dev notes/dev guide READ_ME.md
A	_Joe/dev notes/example feature.md
A	_Joe/useful prompt fragments.txt
A	build.js
A	docs/UoN_map 24-bit.png
A	docs/UoN_map.png
A	docs/app.js
A	docs/app.js.map
A	docs/images/Courts.jpg
A	docs/images/Garlic.jpg
A	docs/images/Nervous_System.jpg
A	docs/images/PARM_Aerial.jpg
A	docs/images/Rocketry.jpg
A	docs/images/UoN_map.png
A	docs/index.html
A	docs/meta.json
A	docs/styles/dropdown.css
A	docs/styles/main.css
A	docs/styles/swatch-picker.css
A	docs/styles/tokens.css
A	docs/styles/tooltip.css
A	examples/route-project-2026-01-10.zip
A	images/Court.png
A	images/Garlic.jpg
A	images/Nervous_System.jpg
A	images/PARM_Aerial.jpg
A	images/Rocketry.jpg
A	images/UoN_map.png
A	images/route-project-2026-03-28 (2).zip
A	index.html
A	package.json
A	push.js
A	src/components/Dropdown.js
A	src/components/ParamTooltip.js
A	src/components/SwatchPicker.js
A	src/components/Tooltip.js
A	src/config/constants.js
A	src/config/helpContent.js
A	src/config/keybindings.js
A	src/config/tooltips.js
A	src/controllers/SectionController.js
A	src/controllers/UIController.js
A	src/core/EventBus.js
A	src/handlers/InteractionHandler.js
A	src/main.js
A	src/models/AnimationState.js
A	src/models/ImageAsset.js
A	src/models/Waypoint.js
A	src/models/index.js
A	src/services/AnimationEngine.js
A	src/services/AreaDrawingService.js
A	src/services/AreaEditService.js
A	src/services/AreaHighlightRenderer.js
A	src/services/BeaconRenderer.js
A	src/services/CameraService.js
A	src/services/CoordinateTransform.js
A	src/services/HTMLExportService.js
A	src/services/ImageAssetService.js
A	src/services/MotionVisibilityService.js
A	src/services/PathCalculator.js
A	src/services/PathCalculatorWithWorker.js
A	src/services/RenderingService.js
A	src/services/StorageService.js
A	src/services/TextLabelService.js
A	src/services/UndoService.js
A	src/services/VideoExporter.js
A	src/services/index.js
A	src/utils/CatmullRom.js
A	src/utils/Easing.js
A	src/utils/focusTrap.js
A	src/utils/index.js
A	src/workers/pathWorker.js
A	styles/dropdown.css
A	styles/main.css
A	styles/swatch-picker.css
A	styles/tokens.css
A	styles/tooltip.css
A	tests/example.test.js
A	tests/setup.js
A	version.json
A	vitest.config.js
