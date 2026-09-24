<!-- field-report: project=route-plotter · date=2026-09-24 · type=export
     · pm-skills=4.7.0 (installed fresh by 599407f on 2026-08-17 with memory ported from the v2 line; never upgraded since)
     · source=git log --name-status through 989f11dc564b55c160a1ae76d5a2f71b58945761, all 135 commits reachable from it, newest first, taken 2026-09-24 by Claude Code (read from a scratch clone assembled from the remote and the checkout's objects, every ref set to its value at the cut-off 2026-09-24T11:40:00.000Z; content-addressed, so identical to the checkout's HEAD)
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 90 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained; session logs, prompts, agent memory and the bundle stay in the local lane -->

# Full Git log

Through `989f11dc564b55c160a1ae76d5a2f71b58945761`. Lane: tracked: repository public and 989f11dc564b on GitHub (checked 2026-09-24T11:45:46.361Z).

<!-- FILE: git-log-through-989f11dc564b.txt -->

commit 989f11dc564b55c160a1ae76d5a2f71b58945761
Author: Joe Bell
Author date: 2026-09-24T11:38:56+01:00
Commit date: 2026-09-24T11:38:56+01:00
Parents: fef49cd605966e9b8bb4e4511ec9d149bb0209f9
Subject: PM: the new prompt takes the queue in the backlog's order (#30)

The prompt listed DEF-35 after the six defects W1 released, while the
backlog's Next, which the prompt names as the authority, takes it fourth,
with the other items Joe approved or accepted on 2026-09-24.

Verify: 85 test files · 1,182 tests · 3 todo · shell 0 · build:check 0

Co-Authored-By: Claude Opus 5.5 <redacted-email>
Changed files:

M	reviews/route-plotter-continuation-prompt-2026-09-24.md
commit fef49cd605966e9b8bb4e4511ec9d149bb0209f9
Author: Joe Bell
Author date: 2026-09-24T11:31:52+01:00
Commit date: 2026-09-24T11:31:52+01:00
Parents: 14e36567f4e7f6f6c06fd47adc6b5e186fe3e75d
Subject: PM: close W2 of the abstraction programme; release v3.2.692; brief the next session (#29)

W2 closed with seven PRs (#22-#28), merged on Joe's word and released as
v3.2.692 (deploy 14e3656, tag v3.2.692, all 22 published files
SHA-256-identical to the build). Joe approved DEF-34 and accepted DEF-35,
TST-17 and DEF-36.

- Decision log: "W2 closes" and "v3.2.692: W2's fixes go live".
- Trajectory: the W2 phase, one line per shipped item.
- Backlog Next: what Joe approved or accepted (DEF-34, TST-17, DEF-36,
  DEF-35), the six defects W1 released that are still open, then W3
  (SPL-01). REV-04 records the Chromium export evidence.
- Plan: shipped markers, DEF-26's ISO-02 claim corrected, DEF-34 approved,
  DEF-35 accepted, new DEF-36 and TST-17 rows, W2 status closed.
- Reviews: the 2026-09-24 continuation prompt is current and the W2 prompt
  says it is superseded; the index and file-map follow, with the file-map
  counts corrected (tests 108, reviews 12).
- Wish-list: two jsdom traps DEF-21's test worked round.

Verify: 85 test files · 1,182 tests · 3 todo · shell 0 · build:check 0

Co-Authored-By: Claude Opus 5.5 <redacted-email>
Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	pm_skills/project/wish-list.md
M	reviews/README.md
M	reviews/codebase-abstraction-and-auditability-plan-2026-09-22.md
A	reviews/route-plotter-continuation-prompt-2026-09-24.md
M	reviews/route-plotter-continuation-prompt-w2-2026-09-23.md
commit 14e36567f4e7f6f6c06fd47adc6b5e186fe3e75d
Author: djDAOjones
Author date: 2026-09-24T11:16:20+01:00
Commit date: 2026-09-24T11:16:20+01:00
Parents: 4ae5d803b4d3b786167e9cd7d46774e47d026f5b
Subject: chore: deploy v3.2.692


Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	version.json
commit 4ae5d803b4d3b786167e9cd7d46774e47d026f5b
Author: Joe Bell
Author date: 2026-09-24T11:11:55+01:00
Commit date: 2026-09-24T11:11:55+01:00
Parents: b831a70957fb178cc93be78caa917a246870f4f5
Subject: DEF-23: shared exports carry only the images the project uses (#26)

A saved project and an HTML export now carry only the images the project
references, not every image undo can still reach, and the HTML page no longer
carries their stored filenames; the store's retention for undo is unchanged.

Verify: 83 test files · 1,159 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5.5 <redacted-email>
Changed files:

M	README.md
M	pm_skills/project/file-map.md
M	pm_skills/project/wish-list.md
M	src/app/privacy.js
M	src/services/HTMLExportService.js
M	src/services/ImageAssetService.js
A	tests/exportMinimisation.test.js
M	tests/htmlExportCache.test.js
M	tests/imageAssetRoundTrip.test.js
commit b831a70957fb178cc93be78caa917a246870f4f5
Author: Joe Bell
Author date: 2026-09-24T11:10:14+01:00
Commit date: 2026-09-24T11:10:14+01:00
Parents: 3c4499fcac7f8336844bb1e83356da5d7f3b45a6
Subject: DEF-31: traced crowd ids fit the persisted id limit (#25)

An id derived from waypoint ids is kept verbatim when it fits, cut to the
limit with a hash of the whole when it does not, and kept unique within the
trace, so "Trace route into crowd" on the longest legitimate ids no longer
makes a project that will not reopen, and no node or path is silently lost.

Verify: 82 test files · 1,163 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5.5 <redacted-email>
Changed files:

M	pm_skills/project/file-map.md
M	reviews/codebase-abstraction-and-auditability-plan-2026-09-22.md
M	src/utils/entityId.js
M	src/utils/routeTrace.js
M	tests/authorableLoadable.test.js
M	tests/routeTrace.test.js
commit 3c4499fcac7f8336844bb1e83356da5d7f3b45a6
Author: Joe Bell
Author date: 2026-09-24T11:06:10+01:00
Commit date: 2026-09-24T11:06:10+01:00
Parents: e61db48fb4129441e77b02d35ca7b84624bb9459
Subject: DEF-21: Help and the File menu describe the keys that exist (#28)

Help now calls , and . "Skip to start" and "Skip to end" and K "Play/pause",
which is what the handler does, and the File menu no longer advertises a
Cmd+O that nothing handles; text only, the one-table fix is CON-15.

Verify: 83 test files · 1,159 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5.5 <redacted-email>
Changed files:

M	index.html
M	pm_skills/project/file-map.md
M	src/config/keybindings.js
A	tests/helpTellsTheTruth.test.js
commit e61db48fb4129441e77b02d35ca7b84624bb9459
Author: Joe Bell
Author date: 2026-09-24T11:06:02+01:00
Commit date: 2026-09-24T11:06:02+01:00
Parents: 892141cd9216f0e26ec30794a038b7553a5ae83b
Subject: DEF-26: a short hex glow colour no longer freezes playback (#27)

The glow parses every hex form load accepts and keeps a colour's own alpha,
and one throwing frame can no longer stop playback or latch queueRender, so a
bad frame is an error rather than a frozen editor.

Verify: 83 test files · 1,161 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5.5 <redacted-email>
Changed files:

M	pm_skills/project/file-map.md
M	src/main.js
M	src/services/AnimationEngine.js
M	src/services/BeaconRenderer.js
A	tests/shortHexGlow.test.js
commit 892141cd9216f0e26ec30794a038b7553a5ae83b
Author: Joe Bell
Author date: 2026-09-24T11:05:13+01:00
Commit date: 2026-09-24T11:05:13+01:00
Parents: b0c88c0ae95a9884e1643776fd19488e8fa5198c
Subject: DEF-03: points authored off the image reload (#24)

Load accepts waypoint, polygon and area-centre coordinates across
IMAGE_COORDINATES (-10 to 11) instead of 0-1, and every zoomed-out authoring
path stops at the same edge, so a point placed in the canvas margin no longer
costs the project, its autosave or the exported player's route.

Verify: 82 test files · 1,163 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5.5 <redacted-email>
Changed files:

M	AGENTS.md
M	README.md
M	pm_skills/project/conventions.md
M	pm_skills/project/file-map.md
M	pm_skills/project/wish-list.md
M	reviews/codebase-abstraction-and-auditability-plan-2026-09-22.md
M	src/app/persistence.js
M	src/app/wiringBus.js
M	src/app/wiringControllers.js
M	src/config/constants.js
M	src/models/Waypoint.js
M	src/services/AreaDrawingService.js
A	src/utils/imageCoordinates.js
M	tests/authorableLoadable.test.js
M	tests/example.test.js
M	tests/units.test.js
commit b0c88c0ae95a9884e1643776fd19488e8fa5198c
Author: Joe Bell
Author date: 2026-09-24T11:05:07+01:00
Commit date: 2026-09-24T11:05:07+01:00
Parents: bc3b80cbbd852c05fce7ac8b82999b096d7011df
Subject: DEF-02: the exported player follows anchored crowd nodes to their waypoints (#23)

PlayerApp now builds waypointsById on load, so calculatePath binds each
anchored crowd node to its waypoint as the app does, instead of leaving it
where the crowd was traced; both characterisations become regressions.

Verify: 82 test files · 1,157 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5.5 <redacted-email>
Changed files:

M	pm_skills/project/file-map.md
M	src/player/PlayerApp.js
M	tests/goldenDrawLogs.test.js
M	tests/playerHostContract.test.js
commit bc3b80cbbd852c05fce7ac8b82999b096d7011df
Author: Joe Bell
Author date: 2026-09-24T11:04:59+01:00
Commit date: 2026-09-24T11:04:59+01:00
Parents: bdaab50ed9b0269dbfe765e04daa50c07f0fd671
Subject: PM: point the reviews index at the W2 prompt (#22)

reviews/README.md still named the W1 prompt current and did not list the W2
one, so a session starting from the index was handed a superseded brief; the
W1 prompt now says it is superseded, as the W0 prompt already does.

Verify: 82 test files · 1,156 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5.5 <redacted-email>
Changed files:

M	reviews/README.md
M	reviews/route-plotter-continuation-prompt-2026-09-23.md
commit bdaab50ed9b0269dbfe765e04daa50c07f0fd671
Author: Joe Bell
Author date: 2026-09-23T14:35:07+01:00
Commit date: 2026-09-23T14:35:07+01:00
Parents: ad3a38a335e2b330ff22822d3809aa58a510297f
Subject: PM: refactor the backlog for W2 and brief the next session (#21)

Next now carries the W2 defects and the eight ground-rule-8 fixes W1 released,
with two false owner-gates corrected and the plan rows that caused them
annotated; a new continuation prompt briefs the work with Codex as reviewer.

Verify: 82 test files · 1,156 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	reviews/codebase-abstraction-and-auditability-plan-2026-09-22.md
A	reviews/route-plotter-continuation-prompt-w2-2026-09-23.md
commit ad3a38a335e2b330ff22822d3809aa58a510297f
Author: Joe Bell
Author date: 2026-09-23T13:23:31+01:00
Commit date: 2026-09-23T13:23:31+01:00
Parents: 180d354ec0a2d69ddf5afb5a56263f106574c6bc
Subject: PM: close W1 of the abstraction programme; W2 enters Next (#20)

One decision-log entry for the wave with each PR's preserved contract, the
five trajectory lines, and the backlog handed to W2's live defects.

Verify: 82 test files · 1,156 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/trajectory.md
commit 180d354ec0a2d69ddf5afb5a56263f106574c6bc
Author: Joe Bell
Author date: 2026-09-23T13:17:20+01:00
Commit date: 2026-09-23T13:17:20+01:00
Parents: 16fdda4bc61a33c7fa4a9da5c1b46bf19e3b66e3
Subject: TST-02: golden draw logs (#19)

Freeze what the renderer actually draws — four fixtures × five instants ×
editor/preview/export, as whole transcripts — and pin play == seek and
app == player at the draw level, so W5-W7 can move this code and prove the
picture did not change.

Verify: 82 test files · 1,156 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	pm_skills/project/file-map.md
M	reviews/codebase-abstraction-and-auditability-plan-2026-09-22.md
A	tests/goldenDrawLogs.test.js
A	tests/goldens/draw-log-authored-extras-edit.txt
A	tests/goldens/draw-log-authored-extras-export.txt
A	tests/goldens/draw-log-authored-extras-preview.txt
A	tests/goldens/draw-log-nervous-system-flow-export.txt
A	tests/goldens/draw-log-nervous-system-flow-preview.txt
A	tests/goldens/draw-log-parm-aerial-walk-edit.txt
A	tests/goldens/draw-log-parm-aerial-walk-export.txt
A	tests/goldens/draw-log-parm-aerial-walk-preview.txt
A	tests/goldens/draw-log-uon-open-day-edit.txt
A	tests/goldens/draw-log-uon-open-day-export.txt
A	tests/goldens/draw-log-uon-open-day-preview.txt
A	tests/helpers/drawLog.js
M	tests/setup.js
commit 16fdda4bc61a33c7fa4a9da5c1b46bf19e3b66e3
Author: Joe Bell
Author date: 2026-09-23T12:37:11+01:00
Commit date: 2026-09-23T12:37:11+01:00
Parents: 8717a8c9587f72a0be5045b5288e001e8cd6086a
Subject: TST-06: the save shape, pinned (#18)

Golden the one project snapshot per example plus a fixture that leaves no
field at its default, and state "authorable ⇒ loadable" over the shipped
controls, so a save-format drift and the DEF-03/04/31 data-loss class both
show up as a failing test rather than as a project that will not reopen.

Verify: 81 test files · 1,129 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	pm_skills/project/file-map.md
M	pm_skills/project/wish-list.md
M	reviews/codebase-abstraction-and-auditability-plan-2026-09-22.md
A	tests/authorableLoadable.test.js
A	tests/fixtures/authoredExtras.js
A	tests/goldens/project-snapshot-authored-extras.json
A	tests/goldens/project-snapshot-nervous-system-flow.json
A	tests/goldens/project-snapshot-parm-aerial-walk.json
A	tests/goldens/project-snapshot-uon-open-day.json
A	tests/helpers/projectSnapshot.js
A	tests/projectSnapshotShape.test.js
commit 8717a8c9587f72a0be5045b5288e001e8cd6086a
Author: Joe Bell
Author date: 2026-09-23T08:27:31+01:00
Commit date: 2026-09-23T08:27:31+01:00
Parents: 1d2a06bb5423d4bc46dfc62705318fb5775d208d
Subject: PM: the continuation prompt for W1 onward (#17)

The 2026-09-22 prompt briefs W0, which closed, so a fresh session reading it would start in the wrong place; the new prompt states where main, the live build and the backlog actually are, what the safety net already provides, and the traps learned since — the stacked-PR merge, the 1440px layout gate, esbuild under jsdom, and the Codex sandbox rule.

Verify: 79 test files · 1106 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	pm_skills/project/file-map.md
M	reviews/README.md
M	reviews/route-plotter-continuation-prompt-2026-09-22.md
A	reviews/route-plotter-continuation-prompt-2026-09-23.md
commit 1d2a06bb5423d4bc46dfc62705318fb5775d208d
Author: Joe Bell
Author date: 2026-09-23T01:02:17+01:00
Commit date: 2026-09-23T01:02:17+01:00
Parents: 0942ca9782b429344caec6d97dda72241a433624
Subject: TST-07: the exported player's host contract (#16)

The contract PlayerApp must satisfy is derived from the pathTiming mixin's own source and checked against a really-loaded player, so a new this.something in the mixin fails here rather than in someone's export; esbuild's metafile proves the player bundle carries no editor-only module, with the editor's bundle as the contrast; and DEF-02's missing waypointsById is stated as the one known gap.

Verify: 79 test files · 1106 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	pm_skills/project/file-map.md
A	tests/playerBundleClosure.test.js
A	tests/playerHostContract.test.js
M	tests/setup.js
commit 0942ca9782b429344caec6d97dda72241a433624
Author: Joe Bell
Author date: 2026-09-23T00:56:07+01:00
Commit date: 2026-09-23T00:56:07+01:00
Parents: 96de3ede3df0e9b1b2eaefe6f906f680789ff6b1
Subject: TST-10: a loud bus and a quiet console in tests (#15)

Console error and warn are captured for the whole worker and fail the test that produced them unless it declared them, with stray output from module load or hooks reported at file end; a booted app fails on a swallowed listener error, boots exactly one app and is stopped honestly afterwards; the app's own debug narration is filtered out of the run; and an unfiltered run that executes fewer than 72 files or 1,000 tests fails.

Verify: 77 test files · 1102 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	DEV-INFRASTRUCTURE.md
M	pm_skills/project/file-map.md
M	tests/assetPruning.test.js
M	tests/bootApp.test.js
M	tests/branchAuthoring.test.js
A	tests/consoleGuard.test.js
M	tests/eventBusErrors.test.js
M	tests/helpers/bootApp.js
A	tests/helpers/consoleGuard.js
A	tests/helpers/minCountReporter.js
M	tests/htmlExportCache.test.js
M	tests/multiSelect.test.js
M	tests/networkEdit.test.js
M	tests/reviewAccessibility.test.js
M	tests/reviewPersistence.test.js
M	tests/reviewTimeline.test.js
M	tests/setup.js
M	tests/waypointList.test.js
M	vitest.config.js
commit 96de3ede3df0e9b1b2eaefe6f906f680789ff6b1
Author: Joe Bell
Author date: 2026-09-23T00:27:35+01:00
Commit date: 2026-09-23T00:27:35+01:00
Parents: 9f383185ca3a79d0e7efc6e6f22ad783a1eff51e
Subject: ISO-02: listener errors are observable (#14)

EventBus takes an optional onListenerError handler and counts every listener error it catches, so the failures the bus hides by design can be seen; without the option its behaviour is exactly as before, and TST-10 will use the hook to fail tests on a swallowed error.

Verify: 76 test files · 1097 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	pm_skills/project/file-map.md
M	src/core/EventBus.js
A	tests/eventBusErrors.test.js
commit 9f383185ca3a79d0e7efc6e6f22ad783a1eff51e
Author: Joe Bell
Author date: 2026-09-23T00:18:34+01:00
Commit date: 2026-09-23T00:18:34+01:00
Parents: fb3426c7bcf36fd3a4441f7b64353998166589f8
Subject: PM: record the v3.2.691 release and TST-01 (#13)

One decision-log entry covers the release (steps run, byte verification, smoke test), DEF-01's before/after browser evidence, TST-01 shipping, and two process lessons; the trajectory gains their lines and the backlog drops the two shipped rows.

Verify: 75 test files · 1092 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/trajectory.md
commit fb3426c7bcf36fd3a4441f7b64353998166589f8
Author: djDAOjones
Author date: 2026-09-23T00:07:57+01:00
Commit date: 2026-09-23T00:07:57+01:00
Parents: 190167a05b05b2eaeb42a79e5576b265181229b4
Subject: chore: deploy v3.2.691


Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	version.json
commit 190167a05b05b2eaeb42a79e5576b265181229b4
Author: Joe Bell
Author date: 2026-09-23T00:05:25+01:00
Commit date: 2026-09-23T00:05:25+01:00
Parents: b45d55201206fe2771a85513b70cf75bad248444
Subject: DEF-01: no background mode draws a debug overlay (#12)

Angle of View Reveal painted a black panel and four lines of developer text over the canvas every frame, in preview, video exports and the standalone player, live on the public site; the overlay, its draw call, the AoV debug logs and the cone-debug state are deleted, and a test proves every background mode now draws no text and no panel.

Verify: 75 test files · 1092 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	pm_skills/project/file-map.md
M	src/services/MotionVisibilityService.js
M	src/services/RenderingService.js
A	tests/backgroundModeOverlay.test.js
commit b45d55201206fe2771a85513b70cf75bad248444
Author: Joe Bell
Author date: 2026-09-22T23:54:18+01:00
Commit date: 2026-09-22T23:54:18+01:00
Parents: bd12fd97e924f98955367e7f416bd33121b78e45
Subject: TST-01: boot the whole app in tests (#11)

tests/helpers/bootApp.js builds the shipped index.html shell, stubs what the build injects and jsdom lacks (APP_VERSION, matchMedia, a fetch that serves the repository, a laid-out canvas area), imports src/main.js and fires DOMContentLoaded, so tests can drive the real orchestrator instead of assembling a partial one; four tests pin what the harness provides.

Verify: 74 test files · 1085 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

A	tests/bootApp.test.js
A	tests/helpers/bootApp.js
commit bd12fd97e924f98955367e7f416bd33121b78e45
Author: Joe Bell
Author date: 2026-09-22T23:50:46+01:00
Commit date: 2026-09-22T23:50:46+01:00
Parents: 693caf9d2f99d9785de32a5638daebf4ac44ff59
Subject: TST-01: a truthful test harness (setup fidelity) (#9)

tests/setup.js gives every canvas its own context that records draw calls, style changes and state, returns null for a missing localStorage key as a browser does, and vitest clears mock history between tests, so the characterisation goldens W1 adds can attribute calls to a surface, read state back as a renderer does, and cannot read another test's.

Verify: 73 test files · 1081 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	tests/perfHarness.test.js
M	tests/setup.js
A	tests/testHarness.test.js
M	vitest.config.js
commit 693caf9d2f99d9785de32a5638daebf4ac44ff59
Author: Joe Bell
Author date: 2026-09-22T22:11:58+01:00
Commit date: 2026-09-22T22:11:58+01:00
Parents: 54b12f25269f5010541cde9237d79b79c5cde8d3
Subject: PM: CON-01 takes the two communication-rule exceptions (#8)

Owner's call on 2026-09-22: the NetworkEditService inspection edits and the AreaEditService app callback that DOC-03 surfaced are CON-01's to remove, so the plan row, architecture.md and the W0 decision-log entry name it rather than leaving them unassigned.

Verify: 72 test files · 1071 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	pm_skills/project/architecture.md
M	pm_skills/project/decision-log.md
M	reviews/codebase-abstraction-and-auditability-plan-2026-09-22.md
commit 54b12f25269f5010541cde9237d79b79c5cde8d3
Author: Joe Bell
Author date: 2026-09-22T17:58:22+01:00
Commit date: 2026-09-22T17:58:22+01:00
Parents: 559cfd0caac65537af3274b9c5802465b13a321d
Subject: PM: close W0 of the abstraction programme; W1 enters Next (#7)

One decision-log entry records the wave's owner calls, each PR's preserved contract, the plan rows patched and the metrics; trajectory gains one line per shipped item; backlog Next swaps W0 for W1 with DEF-01 alongside; file-map, wish-list and the plan's DEF-18, DOC-06, GOV-01, DOC-02, DOC-03 and W0 rows now match what shipped.

Verify: 72 test files · 1071 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	pm_skills/project/wish-list.md
M	reviews/codebase-abstraction-and-auditability-plan-2026-09-22.md
commit 559cfd0caac65537af3274b9c5802465b13a321d
Author: Joe Bell
Author date: 2026-09-22T17:50:15+01:00
Commit date: 2026-09-22T17:50:15+01:00
Parents: cda345725b052b67ecf55662c22eb039ac09db08
Subject: DOC-03: the real communication rule (#6)

Replaces "EventBus is the only channel; exceptions: none", which the code contradicts both ways, with the owner's §20 Q15 rule (components reach the app through the bus, the app calls components' public methods, modal tools commit provisional edits by event) in AGENTS.md, architecture.md and conventions.md together, and lists every current exception with what removes it.

Verify: 72 test files · 1071 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	AGENTS.md
M	README.md
M	pm_skills/project/architecture.md
M	pm_skills/project/conventions.md
commit cda345725b052b67ecf55662c22eb039ac09db08
Author: Joe Bell
Author date: 2026-09-22T17:50:04+01:00
Commit date: 2026-09-22T17:50:04+01:00
Parents: d5ef8fc069a0025b82a16b7d0d1190a2e62b3fa9
Subject: DOC-02: the canonical docs match the code (#5)

Corrects the SEG-030 drift still open (render order, autosave, keybindings, the console ring buffer, project structure, the event catalogue, main.js as handler, the scripts table, dev dependencies, source maps, deleting generated output, readiness) against the code, and replaces restated structure, versioning, autosave and keybinding copies with links to the one owner, so agents stop acting on false facts.

Verify: 72 test files · 1071 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	AGENTS.md
M	DEV-INFRASTRUCTURE.md
M	README.md
M	pm_skills/project/architecture.md
M	scripts/README.md
commit d5ef8fc069a0025b82a16b7d0d1190a2e62b3fa9
Author: Joe Bell
Author date: 2026-09-22T17:49:54+01:00
Commit date: 2026-09-22T17:49:54+01:00
Parents: 597be47984f822930f16b3537fbe7ac4502f0636
Subject: GOV-01: the working setup and release steps for the pull-request flow (#4)

DEV-INFRASTRUCTURE → Deployment replaces the one-off merge --no-ff release bullet with the owner's §20 Q1/Q2 setup (fresh full clone outside OneDrive, a short-lived branch and pull request per concern, owner-decided squash merges), states that a merge releases no source because Pages serves the committed docs/, and gives release steps that check the rollback point first, let the helper build, verify bytes and a live smoke test, and tag the deploy commit afterwards.

Verify: 72 test files · 1071 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	DEV-INFRASTRUCTURE.md
commit 597be47984f822930f16b3537fbe7ac4502f0636
Author: Joe Bell
Author date: 2026-09-22T17:01:22+01:00
Commit date: 2026-09-22T17:01:22+01:00
Parents: 1ddcce80a8259d79a15f0ae6dc14135a30873d08
Subject: DOC-06: the root docs meet the vendored workflows (b)-(f) (#3)

DEV-INFRASTRUCTURE gains a Quality gate section and an honest close-out boot note, the root docs gain alias sections so all 12 dangling pm_skills section references resolve, and AGENTS.md gains the refactor-mode, import re-pointing and prune-bar clauses, so agents following the framework stop landing on missing or false guidance.

Verify: 72 test files · 1065 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	AGENTS.md
M	DEV-INFRASTRUCTURE.md
M	UI-STANDARDS.md
commit 1ddcce80a8259d79a15f0ae6dc14135a30873d08
Author: Joe Bell
Author date: 2026-09-22T17:01:07+01:00
Commit date: 2026-09-22T17:01:07+01:00
Parents: 9d008c067ab6e9c11df1355ec638fed6ec77d5af
Subject: DEF-18: push.js refuses unknown options and runs npm run check (#2)

A mistyped dry run (npm run push -- --dryrun, a --dryrun that npm keeps as its own setting, or -n) fell through to a real, now live, release; the helper now refuses any option or dry-run-like npm setting it does not honour before anything runs, reads npm's dry-run setting as npm does, and runs the full check gate rather than npm test alone.

Verify: 72 test files · 1071 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	DEV-INFRASTRUCTURE.md
M	README.md
M	push.js
M	tests/releaseSafety.test.js
commit 9d008c067ab6e9c11df1355ec638fed6ec77d5af
Author: Joe Bell
Author date: 2026-09-22T17:00:47+01:00
Commit date: 2026-09-22T17:00:47+01:00
Parents: 6ed0efa4acdcd17f408b306070bd2b8cd2e4e8af
Subject: DOC-06: agents never commit to or push main (a) (#1)

AGENTS.md gains Commit, push and release: main is the live site, so work lands through short-lived branches and pull requests, main moves only by an owner-approved merge or an owner-called npm run push, and the task.md step 11 close pushes only its working branch.

Verify: 72 test files · 1065 tests · shell 0 · build:check 0

Co-authored-by: Claude Opus 5 <redacted-email>
Changed files:

M	AGENTS.md
commit 6ed0efa4acdcd17f408b306070bd2b8cd2e4e8af
Author: djDAOjones
Author date: 2026-09-22T14:40:16+01:00
Commit date: 2026-09-22T14:40:16+01:00
Parents: cbe40941dd14c5b048f4065f5172ef8b69ebcfb0
Subject: PM: add the continuation prompt for the abstraction programme

A paste-ready brief that runs the adopted plan wave by wave; it supersedes the 2026-08-27 prompt, which stays as provenance.

Verify: docs-only; no test or build step reads reviews/ or pm_skills/project

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

M	pm_skills/project/file-map.md
M	reviews/README.md
A	reviews/route-plotter-continuation-prompt-2026-09-22.md
commit cbe40941dd14c5b048f4065f5172ef8b69ebcfb0
Author: djDAOjones
Author date: 2026-09-22T14:21:55+01:00
Commit date: 2026-09-22T14:21:55+01:00
Parents: 2e4d78e3e9c625755c6e30b13356f47703496928
Subject: PM: adopt the codebase abstraction plan; W0 enters Next

The owner accepted every §20 default. The plan moves to reviews/ (Q20) and the decision log records its adoption; memory is pruned to budget with archives kept verbatim; conventions and file-map are corrected (DOC-06 g/h).

Verify: 72 test files · 1065 tests · shell 0 · build:check 0

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

M	pm_skills/project/archive/INDEX.md
A	pm_skills/project/archive/decision-log-2026-08-27-to-2026-08-27.md
A	pm_skills/project/archive/trajectory/trajectory-0003-2026-08-26-to-2026-08-27.md
M	pm_skills/project/backlog.md
M	pm_skills/project/conventions.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/tickets/REV-03.md
M	pm_skills/project/trajectory.md
M	pm_skills/project/wish-list.md
M	reviews/README.md
A	reviews/codebase-abstraction-and-auditability-plan-2026-09-22.md
commit 2e4d78e3e9c625755c6e30b13356f47703496928
Author: djDAOjones
Author date: 2026-09-22T10:27:41+01:00
Commit date: 2026-09-22T10:27:41+01:00
Parents: 43ad2a71fe0c0a09a41f5298b8621d87e64bd0cb
Subject: REL-02: protect main against force-push and deletion

Owner's call, on the recommended option. Main is now what Pages serves, so
rewriting or deleting it would take the public site with it. A repository
ruleset (id 23814820) blocks exactly deletion and non-fast-forward pushes on
refs/heads/main, with no bypass actors, so it binds agent pushes made with
the owner's admin credentials too. Required status checks were declined:
GitHub rejects direct pushes to a branch that requires them, which would
break the documented `npm run push` pipeline.

Verified through GitHub's effective-rules API for main rather than by
attempting a force-push, which would have rewound the live site had the rule
failed. This push is itself a fast-forward, so it confirms ordinary pushes
still go through.

The backlog's Next lane is now empty: every open item is owner-run evidence
or deferred behind a stated trigger.

Gate: 72 files / 1065 tests green, restart safety, non-mutating check build.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

M	DEV-INFRASTRUCTURE.md
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/trajectory.md
commit 43ad2a71fe0c0a09a41f5298b8621d87e64bd0cb
Author: djDAOjones
Author date: 2026-09-22T10:21:53+01:00
Commit date: 2026-09-22T10:21:53+01:00
Parents: caea6910f1bfa2a9c64464a3034fe9e6f99b1bf2
Subject: PM: record the v3.2.690 release and correct the deployment record

DEPLOY-01, REL-01 and LEGAL-01 are closed on the owner's 2026-09-22 approval,
with Codex (gpt-6-astra) as a read-only partner on the approach.

- decision-log: the release sequence and what verified each step, REL-01
  (keep the source map, with its qualifications) and LEGAL-01 (the owner's
  confirmation as given, and the technical fix). A separate dated entry
  corrects the 2026-08-27 record: Pages had served review-remediation since
  2026-08-26, so the merge hold never had the effect intended — and the
  2026-08-28 session's "nothing on this branch is live" was wrong, which left
  BUG-01 live for about eight hours without anyone knowing.
- DEV-INFRASTRUCTURE → Deployment: what is live is whatever the Pages source
  says; the release and rollback procedure; changing the Pages source through
  the API does not trigger a build; release from a clean clone when OneDrive
  has evicted files.
- backlog: DEPLOY-01, REL-01 and LEGAL-01 removed; REL-02 opened for the one
  residual — branch protection on main, which is the owner's call.
- trajectory, file-map and README updated to match.

Gate: 72 files / 1065 tests green, restart safety, non-mutating check build.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

M	DEV-INFRASTRUCTURE.md
M	README.md
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
commit caea6910f1bfa2a9c64464a3034fe9e6f99b1bf2
Author: djDAOjones
Author date: 2026-09-22T09:58:39+01:00
Commit date: 2026-09-22T09:58:39+01:00
Parents: 4e5575d11bca640ad56da0be8fba9a3380b4ffed
Subject: chore: deploy v3.2.690


Changed files:

A	docs/LICENSE.txt
A	docs/THIRD_PARTY_NOTICES.txt
M	docs/app.js
M	docs/index.html
M	docs/meta.json
M	docs/styles/main.css
M	version.json
commit 4e5575d11bca640ad56da0be8fba9a3380b4ffed
Author: djDAOjones
Author date: 2026-09-22T09:55:16+01:00
Commit date: 2026-09-22T09:55:16+01:00
Parents: 35de7d5e313108f6efd74b3ae8dcfc3e1f442c34
Subject: LEGAL-01: publish the notices with the app and pin their exact sources

A technical-completeness fix, not a legal verdict. MPL-2.0 mediabunny ships
minified inside docs/app.js, but THIRD_PARTY_NOTICES.md and LICENSE never
reached the published site — they were absent from the build allowlist — and
the licence comment preserved in the bundle points only at the licence text.
Someone who received the bundled code from the live site had no route to its
source. Found by Codex (gpt-6-astra) reviewing the release plan; each claim
was checked against build.js, docs/app.js and index.html before acting.

- The notices and licence are now published with the application, as
  THIRD_PARTY_NOTICES.txt and LICENSE.txt. Plain text because Pages runs
  Jekyll over docs/, which would render a .md file to HTML under another name.
- The Help screen links to them, opening in a new tab and saying so.
- Mediabunny's source link is pinned to the v1.55.3 tag and its commit
  16f8889e — verified to be the exact commit the npm package records as its
  gitHead — and the notice says the component is bundled unmodified. JSZip's
  licence link is pinned to v3.10.1, and the notice now says its preserved
  bundle banner credits pako, which was verified in docs/app.js.

Guards: the published inventory changes deliberately (20 -> 22 files) in both
build.js and the boundary test; a governance test fails if the pinned
mediabunny tag ever drifts from the locked version, and another if the Help
link loses its target, its rel or its visible new-tab warning. Both were
mutation-tested.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

M	THIRD_PARTY_NOTICES.md
M	build.js
M	index.html
M	styles/main.css
M	tests/governance.test.js
M	tests/publicationBoundary.test.js
commit 35de7d5e313108f6efd74b3ae8dcfc3e1f442c34
Author: djDAOjones
Author date: 2026-09-22T09:52:28+01:00
Commit date: 2026-09-22T09:52:28+01:00
Parents: cec0191250ab981b30e7242772ff165ea3e775b7 587f90a287d21b7d045c7c34fbc7d703d594a3f3
Subject: Release the review-remediation line into main (DEPLOY-01)

Merges 51 commits of the 2026-08-26 review remediation — RP-01..RP-18
remediation, the inspector foundation, hero-route branches, crowds bound to
route moments, the accessibility work and DEPS-01 — into main, which is what
GitHub Pages is meant to serve.

A merge commit rather than a fast-forward, so the integration point is one
revertible commit on main.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:
commit 587f90a287d21b7d045c7c34fbc7d703d594a3f3
Author: djDAOjones
Author date: 2026-08-28T01:28:14+01:00
Commit date: 2026-08-28T01:28:14+01:00
Parents: be8ace1fae6e2310dcf16e6918c546944a6518eb
Subject: ICE-03: a repeatable cost curve, with no threshold

Per the owner's call, this is a harness rather than a gate. A committed
frame-time threshold would pass on one machine and fail on another with
identical code, and a red that means nothing is worse than no check at all.
scripts/perf-harness.js prints the cost curve on demand and asserts nothing
about timings; you compare your own before and after an optimisation. On
re-run it reproduced PERF-01 (2,000 waypoints: 65.2 ms against 64.6 measured
by hand) — the small drift is precisely why no number is committed.

Its first version destroyed the project it was protecting: it restored the
autosave in a finally, and the still-running app then saved the synthetic
2,000-waypoint benchmark project straight over the restore. Caught because
the restore was verified after a reload rather than assumed. The dev-server
scratch project was lost and rebuilt from the shipped uon-open-day example
it had come from.

The fix is not a bigger backup — autosave is suppressed for the rest of the
page's life, so synthetic projects can never reach storage at all, and the
closing warning insists on a reload. Verified by running a destructive
benchmark and confirming the project survived a reload intact.

The test pins the safety contract, not the speed: the harness still loads,
exposes one entry point, refuses clearly with no app and with no project,
suppresses autosave before the restore, never puts the real autoSave back,
keeps the restore in a finally, and carries no threshold — so adding one
later has to be a deliberate conversation.

Gate: 72 files / 1063 tests green, restart safety, non-mutating check build.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

M	DEV-INFRASTRUCTURE.md
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	scripts/README.md
A	scripts/perf-harness.js
A	tests/perfHarness.test.js
commit be8ace1fae6e2310dcf16e6918c546944a6518eb
Author: djDAOjones
Author date: 2026-08-28T01:16:26+01:00
Commit date: 2026-08-28T01:16:26+01:00
Parents: f737ac2885da2e8a68774c8bf86deb2853cbd7ed
Subject: PERF-01: measure the ceiling instead of agreeing one

Per the owner's call, profiled a range and read the ceiling off the data.
Production Chromium, fixed 1280x720 surface, median and p95 of render()
over 25 deterministic timeline instants.

Waypoint count is the only dimension that costs real frame time: 200
waypoints run at 1.8 ms median / 3.3 ms p95, 500 is borderline (6.4 / 15.6),
1,000 is not interactive (18.1 / 51.7), and 2,000 — the enforced limit — is
unusable at 64.6 ms median / 222 ms p95.

Crowd size is close to free: 5,000 dots, the per-emitter maximum, costs
1.2 ms against 0.3 ms for none. Image resolution costs no frame time at all
— 1 MP and 48 MP both render in 0.3 ms, because the destination surface is
fixed. A large image costs memory and import, not rendering: 48 MP is
183 MiB decoded. Worth stating plainly, since the 48 MP / 40 MiB admission
limits read like performance limits and are not.

So the supported ceiling should be stated in waypoints alone: comfortably
200, borderline 500, gone by 1,000. MAX_WAYPOINTS of 2,000 stays as the
hostile-input safety bound it was built to be (RP-09) — this does not argue
for lowering it, only that it was never a performance statement.

Caveats are in the log rather than buried: one machine, one browser, one
surface size, and render cost is not export cost. Making that repeatable is
exactly ICE-03, whose stated trigger ("alongside PERF-01") has now fired, so
it is promoted out of the icebox with these numbers as its baseline.

No code changed. Gate: 71 files / 1057 tests green.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/trajectory.md
commit f737ac2885da2e8a68774c8bf86deb2853cbd7ed
Author: djDAOjones
Author date: 2026-08-28T01:11:26+01:00
Commit date: 2026-08-28T01:11:26+01:00
Parents: ff6118e3250de8b0f95c09d26f40b26a0f697a6a
Subject: LABEL-01: auto-position at the right moments, and findable

Auto-position itself works well — what was wrong was when it ran and how
findable it was. Three contracts, pinned because they pull against each
other:

- It runs when a label is first written. A new label starts at the default
  offset, often under its own marker: written, then invisible.
- It never runs again once the author has placed the label. A new persisted
  labelPlacedByHand flag is set by the offset sliders, the only route by
  which a label moves by hand. Absent on older saves, which restore as not
  placed so they stay eligible. Excluded from style propagation: where a
  label sits is per-waypoint authoring state, not a style to apply onward.
- Asking explicitly always works. The button ignores the flag; being asked
  for is not the same as happening to you, and that distinction is what
  makes the flag safe.

Per the owner's change to the ticket, the offer fires on collision rather
than on first write — a prompt on every first label is noise, and a
collision is when the offer is worth making. Checked on text commit, not
per keystroke, because only then does the box have its final size.
collidesAtCurrentPosition reuses the scoring auto-position optimises
against, so "colliding" means what auto-position would try to escape.

The prompt reuses the existing toast, which gains one optional action, so
it stays in the established polite live region and out of the focus order.
It is an offer that fades, so it is never the only route: the button now
sits in the Label card's primary tier — the other half of the owner's call.
Four primary controls is the top of the 2-4 budget, and the tier guard was
updated to say so; that expectation encoded a design decision the owner has
now overridden, so the expectation moved rather than the check weakening.

Verified in Chromium: first write moves the label off the default; a slider
drag sets the flag; rewriting afterwards leaves it where the author put it;
a colliding label raises one toast whose 44px action re-places it; a label
that fits raises nothing. The working project was restored byte-for-byte.
The example ZIPs change because Waypoint.toJSON now carries the flag.

Gate: 71 files / 1057 tests green, restart safety, non-mutating check build.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/examples/nervous-system-flow.zip
M	docs/examples/parm-aerial-walk.zip
M	docs/examples/uon-open-day.zip
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	docs/styles/main.css
M	index.html
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/app/wiringDom.js
M	src/main.js
M	src/models/Waypoint.js
M	src/services/TextLabelService.js
M	styles/main.css
A	tests/labelAutoPosition.test.js
M	tests/reviewAccessibility.test.js
M	version.json
commit ff6118e3250de8b0f95c09d26f40b26a0f697a6a
Author: djDAOjones
Author date: 2026-08-28T01:00:29+01:00
Commit date: 2026-08-28T01:00:29+01:00
Parents: 10384c5b9de009aee0dcd7bc7e61b2dbca675483
Subject: REVEAL-01: the reveal fades on an authorable trail, and BUG-02: a hard edge that painted nothing

REVEAL-01, per the owner's call, is a per-project property rather than a
fixed default. The mask still repaints every passed point every frame — that
rebuild is what makes scrubbing bidirectional — but each point is now
weighted by how far behind the head it sits, measured as a fraction of the
whole path so the fade reads the same at any path length or density. It is a
pure function of position, never an accumulated decay; a test pins that
arriving at an instant forwards and backwards gives the same answer.

revealTrail = 100 is a sentinel meaning "never fades" and is the default, so
projects authored before this control render exactly as they did. That rule
lives in revealTrailAlpha, not in its caller — one rule in two places is what
caused BUG-01 earlier today. The snapshot defaults the value rather than
copying it through, because a caller whose settings predate the property
would otherwise write an explicit undefined that the validator rejects.

The reveal sliders were also never synced on load: a restored project
rendered its authored size and feather while the sliders sat at markup
defaults. Adding a third unsynced control would have compounded that, so
syncRevealControls now places all three and their containers.

BUG-02, found while verifying the above in the browser: a radial gradient
with equal radii paints nothing, and SPOTLIGHT_FEATHER_DEFAULT is 0 — so
every new project's spotlight was invisible in both spotlight modes.
Measured in Chromium: peak mask alpha 0 at feather 0, 255 at feather 1. An
owner switching on the reveal to try REVEAL-01 would have seen a blank
canvas. The inner circle now stays a sub-pixel inside the outer one.

Verified in Chromium at the shipped default feather: no-fade paints the whole
travelled path (255 at start, middle, head); a 50% trail gives 255/129/0; a
20% trail lights only the head. The control shows for spotlight-reveal, hides
for plain spotlight, and keeps aria-valuetext in step with its readout.

Gate: 70 files / 1046 tests green, restart safety, non-mutating check build.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	index.html
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/app/persistence.js
M	src/app/wiringControllers.js
M	src/config/constants.js
M	src/controllers/UIController.js
M	src/main.js
M	src/player/PlayerApp.js
M	src/services/MotionVisibilityService.js
M	src/services/RenderingService.js
M	tests/playerApp.test.js
A	tests/revealTrail.test.js
M	tests/reviewPersistence.test.js
M	version.json
commit 10384c5b9de009aee0dcd7bc7e61b2dbca675483
Author: djDAOjones
Author date: 2026-08-28T00:45:34+01:00
Commit date: 2026-08-28T00:45:34+01:00
Parents: 58bd49db560d1c971c2c974103875385f2e5da0e
Subject: PM: record four owner calls on the remaining queue

REVEAL-01 becomes an authorable per-project property rather than a fixed
default. LABEL-01's nudge fires on collision detection, not first write, and
the control moves into the primary tier. PERF-01 profiles a range and
delivers a cost curve, so the ceiling is an output not an input. REL-01 is
carried into DEPLOY-01 and is no longer a runnable sign-off.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
commit 58bd49db560d1c971c2c974103875385f2e5da0e
Author: djDAOjones
Author date: 2026-08-28T00:32:39+01:00
Commit date: 2026-08-28T00:32:39+01:00
Parents: 4e01d8e74d11dd8a1046cb6197b139e97eb956cc
Subject: PM: point LEGAL-01 at the settled MPL versions

DEPS-01 has shipped, so the ticket no longer waits on it: the versions the
owner is being asked to confirm are mediabunny 1.55.3 and axe-core 4.13.0.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

M	pm_skills/project/backlog.md
commit 4e01d8e74d11dd8a1046cb6197b139e97eb956cc
Author: djDAOjones
Author date: 2026-08-28T00:32:11+01:00
Commit date: 2026-08-28T00:32:11+01:00
Parents: 51ccd9e7144319a9cbb2cb8b137f1591dd4b9b39
Subject: DEPS-01: take three upgrades, refuse jsdom 30 on the Node floor

Every direct dependency checked against the registry rather than the
ticket's remembered numbers, each upgrade gated separately:

- vitest 4.1.10 -> 4.1.11 (dev, patch)
- mediabunny 1.55.1 -> 1.55.3 (runtime, patch). Its notes are entirely
  demux-side — ISOBMFF Annex B, encrypted-file tenc fallback, HLS emsg
  segments, AacAudioSpecificConfig — plus a custom-Promise fix. None of it
  touches the video-only mux path this app uses. Re-verified anyway in
  Chromium: valid MP4 and WebM out. That re-verification found BUG-01.
- jsdom 27.4.0 -> 29.1.1 (dev, two majors). The 28 resource-loading
  overhaul and 29 CSSOM rewrite have no surface here — nothing configures
  a ResourceLoader or reads CSSOM. It also removed five transitive
  packages (157 -> 152).
- jszip, esbuild and axe-core are already at latest.

jsdom 30 is deliberately not taken: it needs Node ^22.22.2 || ^24.15.0 ||
>=26.0.0 and this checkout runs 24.5.0. No manifest change would be needed
— engines already allows it and .nvmrc is just "24" — only the installed
Node, which is the owner's toolchain call, not a silent dependency bump.
Noted on the wish-list.

The dependency ledger did its job: the first upgrade failed the gate until
governance.test.js and THIRD_PARTY_NOTICES.md were updated to match.
Licences re-read from the lockfile, unchanged. npm audit clean.

Note: npm install rewrote mediabunny's declared range from ^1.39.2 to
^1.55.3. An improvement — it now records the tested version — but npm's
doing, not a deliberate choice.

docs/ here carries both this pass and the preceding BUG-01 fix.

Gate: 69 files / 1033 tests green, restart safety, non-mutating check build.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

M	THIRD_PARTY_NOTICES.md
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	package-lock.json
M	package.json
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/trajectory.md
M	pm_skills/project/wish-list.md
M	tests/governance.test.js
M	version.json
commit 51ccd9e7144319a9cbb2cb8b137f1591dd4b9b39
Author: djDAOjones
Author date: 2026-08-28T00:28:34+01:00
Commit date: 2026-08-28T00:28:34+01:00
Parents: 571fca635b22fd7d28ed09cd800e2c1c188d382f
Subject: BUG-01: a branch run must not read the trunk's wait index

A branched hero route renders each run with its own waypoint sub-array,
but animationEngine.state.pauseWaypointIndex indexes the whole route. When
the wait sits past the end of a shorter branch run, getHeadDirection read
undefined and threw on .imgX — taking video export down entirely for that
project shape, and throwing on the final preview frame too.

Found while re-verifying export for DEPS-01, not by looking for it, and
confirmed pre-existing before diagnosing: RenderingService.js is untouched
since the handover baseline. Diagnosed live by instrumenting the renderer
in the browser — the failing call receives a 3-waypoint branch run while
the pause index is 4, into a 6-waypoint route.

MotionVisibilityService performs the identical calculation and already
guards it with `pauseWaypointIndex < waypoints.length`; the renderer's copy
was written to match it and simply missed that clause. Out of range means
the wait is not this run's, so it falls through to the run's own
path-based direction, exactly as the AOV path does.

Tests reproduce the crash from the observed shape and pin the fall-through,
plus two that the guard does not disable what it protects: an in-range wait
still steers waypoint-to-waypoint.

Verified in Chromium: export now yields a valid 1.78 MB MP4 (ftyp isom) and
a valid 3.70 MB WebM (EBML magic), nothing thrown. No file was written —
the blob was captured at URL.createObjectURL and the anchor click swallowed.

docs/ is refreshed in the DEPS-01 commit that follows, so the built bundle
is not published here carrying an upgrade this commit does not declare.

Gate: 69 files / 1033 tests green, restart safety, non-mutating check build.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/services/RenderingService.js
A	tests/headDirectionBranchWait.test.js
commit 571fca635b22fd7d28ed09cd800e2c1c188d382f
Author: djDAOjones
Author date: 2026-08-28T00:12:08+01:00
Commit date: 2026-08-28T00:12:08+01:00
Parents: c993ea985f0997baec76313315f1451f144646a7
Subject: PM: refactor the backlog after the accessibility band closes

A11Y-01 and A11Y-02 shipped, so the band is done and REV-05's residual is
now verification only — its forced-colours fallbacks exist and are proved
to ship. Moved REV-05 into Current beside REV-03 and REV-04, the two other
items whose only remaining work is owner evidence, so Next reads as the
genuinely schedulable queue rather than a mix of the two.

Also anchored DEPLOY-01's ahead-count to a commit and named the command
that regenerates it: the stored 41 was already wrong (40 at the handover
baseline, 42 now), and a number that goes stale on every commit should not
be read as fact.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

M	pm_skills/project/backlog.md
commit c993ea985f0997baec76313315f1451f144646a7
Author: djDAOjones
Author date: 2026-08-28T00:10:15+01:00
Commit date: 2026-08-28T00:10:15+01:00
Parents: 5db724e056fa5d6c8c377a3f49fbed35ce0b8602
Subject: A11Y-02: restore focus and selection under forced colours

Forced-colours modes set box-shadow to none, and every focus ring in this
project is a box-shadow drawn over outline:none — 22 in main.css alone,
plus the dropdown, context-menu and swatch rings. In high contrast a
keyboard user had no visible focus anywhere. One global forced-colors
block restores it as an outline in a system colour, which that mode does
repaint, and repaints the selection accent bars that would otherwise
flatten to Canvas.

The same read turned up a second defect: var(--focus) is not a token
anywhere, so .waypoint-rename-input:focus-visible resolved to
box-shadow:none — that input had no focus ring in any colour mode, since
an invalid custom property does not fall back to the cascade. The bespoke
override is deleted; the input takes the universal ring like every other
input. Confirmed live both ways: re-inserting the old rule returns none.

Two deliberate non-fixes, documented in UI-STANDARDS rather than worked
around. The map canvas is content — forced colours does not repaint it and
neither do we, so the Okabe-Ito palette, the hovered leg, its "+" handle
and the beacons stay legible against each other; repainting them would
destroy the colour-blind-safe palette these users need. Colour swatches
take forced-color-adjust:none, the sanctioned colour-picker case.

Evidence: the rules are proved to ship and parse in the live stylesheet,
and the ring fix is measured in Chromium at v3.2.682. How they look under
a real high-contrast theme still needs devtools emulation this automation
cannot drive — that residual stays with REV-05, unclaimed.

Gate: 68 files / 1029 tests green, restart safety, non-mutating check build.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

M	UI-STANDARDS.md
M	docs/app.js
M	docs/index.html
M	docs/meta.json
M	docs/styles/main.css
M	docs/styles/swatch-picker.css
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/trajectory.md
M	styles/main.css
M	styles/swatch-picker.css
M	tests/accessibilityAudit.test.js
M	version.json
commit 5db724e056fa5d6c8c377a3f49fbed35ce0b8602
Author: djDAOjones
Author date: 2026-08-27T23:59:45+01:00
Commit date: 2026-08-27T23:59:45+01:00
Parents: 6f2ac154430be665a9cb1665a6f20d1b317990e0
Subject: A11Y-01: hints describe their control instead of posing as buttons

ParamTooltip gave all 74 [data-tip] labels role="button" and tabindex="0":
74 phantom tab stops announcing as buttons that perform no action, each
owing a 44px target it never meets, and on the two camera <label>s a role
that is invalid ARIA outright.

The hint is now the control's description. Every trigger resolves through
its enclosing label[for], and its text becomes an .sr-only node the control
references with aria-describedby — appended, so the 23 sliders whose readout
already owns a token still announce the value first. The node sits after the
</label> so it cannot join the control's accessible name.

Losing the tab stop must not make the hint mouse-only, so keyboard focus on
the described control reveals the same tooltip, gated on :focus-visible;
Escape dismisses it while focus stays there.

axeAudit now also runs over the shell as JavaScript leaves it — the static
shell was clean while the running app was not, which is why the gate never
saw this. Replaying the old enhancement under the new run reproduces the
same two aria-allowed-role hits the live audit found.

Verified in Chromium at v3.2.680: pointer path, real Tab arrival, Escape
then arrow keys, and a fresh mouse click that correctly reveals nothing;
the interactive accessibility tree now lists only real controls.

Gate: 68 files / 1024 tests green, restart safety, non-mutating check build.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

M	README.md
M	UI-STANDARDS.md
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	pm_skills/project/wish-list.md
M	src/components/ParamTooltip.js
M	tests/axeAudit.test.js
A	tests/paramTooltip.test.js
M	version.json
commit 6f2ac154430be665a9cb1665a6f20d1b317990e0
Author: djDAOjones
Author date: 2026-08-27T23:12:39+01:00
Commit date: 2026-08-27T23:12:39+01:00
Parents: f1c14b96a6e69a3609f4bab4d2ad4109d099752a
Subject: PM: disposition the whole original review into the backlog

Audited all three layers of the 2026-08-26 report, not just the numbered findings. RP-01..RP-18 were already shipped or ticketed; the gap was everything that was not a finding — section 17's Optional roadmap and section 18's unresolved uncertainties never entered the backlog, because the crosswalk only ever bridged the RP items.

Five still-open items ticketed: DEPLOY-01 (RP-07 residual — the branch is 41 commits ahead of main, which is what Pages serves), REL-01 (docs/app.js.map ships 3.1MB with sourcesContent for 89 first-party files), PERF-01 (no legitimate maximum project was ever profiled), LEGAL-01 (owner/legal MPL posture) and ICE-03 (benchmark corpus, Icebox with a trigger). Seven further items verified closed and recorded so the next audit need not repeat this one.

Reconciled with the parallel maintenance session (ea3e27a, f1c14b9): DEPLOY-01 corrected to [blocked: owner calls the release] rather than an open sign-off, since the owner had already held the merge; LEGAL-01 linked to DEPS-01, which moves the same MPL-licensed versions.

Crosswalk extended with a second table covering the non-finding items; new continuation prompt supersedes the 2026-08-26 one, which stays as provenance.

Verify: 67 files / 1006 tests · restart safety pass · non-mutating check build · docs unchanged (PM/docs only)

Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	reviews/README.md
A	reviews/route-plotter-continuation-prompt-2026-08-27.md
M	reviews/route-plotter-review-finding-crosswalk-2026-08-26.md
commit f1c14b96a6e69a3609f4bab4d2ad4109d099752a
Author: djDAOjones
Author date: 2026-08-27T22:25:22+01:00
Commit date: 2026-08-27T22:25:22+01:00
Parents: ea3e27a0a206d2ea3c8ad84e5477fa1da1c1592d
Subject: docs(pm): record owner calls — prune quality bar, merge held

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	pm_skills/project/decision-log.md
commit ea3e27a0a206d2ea3c8ad84e5477fa1da1c1592d
Author: djDAOjones
Author date: 2026-08-27T22:20:54+01:00
Commit date: 2026-08-27T22:20:54+01:00
Parents: 9276e4fce215a4ed2536892ae826d773a7a78658
Subject: docs(pm): memory prune — Aug 17–26 log + closed trajectory epochs archived; DEPS-01 added

Diagnose-approved prune (owner sign-off in session): 36 decision-log
entries (2026-08-17→26) and the v2-era + v3.0-milestone trajectory
epochs moved verbatim to archive/ (diff-verified lossless); ticked
doc-deltas line swept; stale docs/player.js.map file-map row dropped.
Owner calls recorded: stay on PM-Skills 4.7.0; dependency upgrades
deferred into DEPS-01.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	pm_skills/project/archive/INDEX.md
A	pm_skills/project/archive/decision-log-2026-08-17-to-2026-08-26.md
A	pm_skills/project/archive/trajectory/trajectory-0001-2026-04-16-to-2026-06-17.md
A	pm_skills/project/archive/trajectory/trajectory-0002-2026-08-17-to-2026-08-19.md
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/doc-deltas.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
commit 9276e4fce215a4ed2536892ae826d773a7a78658
Author: djDAOjones
Author date: 2026-08-27T21:16:14+01:00
Commit date: 2026-08-27T21:16:14+01:00
Parents: ad2d04910abec9f6b0242ddcf7a60b7ab923015b
Subject: REV-05a: add axe-core as a standing accessibility gate; clear quarantine

axe-core added as a dev dependency on owner approval — runtime dependencies remain jszip and mediabunny, and nothing of axe reaches the published bundle. tests/axeAudit.test.js now runs it over the app shell across WCAG 2.0/2.1/2.2 A/AA/AAA and best practice. 48 rules, zero violations, verified twice in production Chromium (empty shell and with the Open day route loaded) with colour contrast genuinely evaluated; the jsdom gate disables contrast because jsdom cannot paint and a pass there would be a false green.

Four incompletes triaged, none a defect: axe independently confirms A11Y-01 and is stricter than the original finding (role=button is invalid on a label, not merely questionable), the dropdown aria-controls targets exist but are display:none, and the fork mark is a decorative aria-hidden glyph.

Quarantine cleared on owner verdicts: QUAR-01 and QUAR-04 cut; QUAR-02 promoted as REVEAL-01 after investigating that a fading spotlight reveal is genuinely not possible today (the mask repaints every passed point at full opacity each frame); QUAR-03 promoted as LABEL-01 for auto-position timing and discoverability. Licence notice and the governance dependency ledger updated for axe-core.

Verify: 67 files / 1006 tests · restart safety pass · non-mutating check build · Pages build v3.2.679, 20-file inventory

Changed files:

M	THIRD_PARTY_NOTICES.md
M	docs/app.js
M	docs/index.html
M	docs/meta.json
M	package-lock.json
M	package.json
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
A	tests/axeAudit.test.js
M	tests/governance.test.js
M	version.json
commit ad2d04910abec9f6b0242ddcf7a60b7ab923015b
Author: djDAOjones
Author date: 2026-08-27T16:07:33+01:00
Commit date: 2026-08-27T16:07:33+01:00
Parents: 24e650c6b1f0c1599058d4a575a045e8d87caf2c
Subject: PM: evict the shipped ROUTE-01 and COMPOSE-01 detail tickets

A ticket file is working detail for one open item and is deleted when that item ships (memory-policy). Both items are in trajectory and the decision log; REV-03.md stays, its item is still open.

Changed files:

M	pm_skills/project/file-map.md
D	pm_skills/project/tickets/COMPOSE-01.md
D	pm_skills/project/tickets/ROUTE-01.md
commit 24e650c6b1f0c1599058d4a575a045e8d87caf2c
Author: djDAOjones
Author date: 2026-08-27T16:06:07+01:00
Commit date: 2026-08-27T16:06:07+01:00
Parents: a9795fe23bb01d3dbcb727e13767323f5ca9c355
Subject: REV-05: run the accessibility audit and fix two AAA failures

Structural audit (names, ids, heading order, landmarks, lang, alt text, live region), AAA contrast measured on every visible text node against its effective background, target size on every rendered control, and reflow at 320 CSS px — the WCAG 1.4.10 equivalent of 400% zoom — all green in production Chromium.

Two failures found and fixed: the Edit/Preview label measured 6.37:1 because --text-03 is 7:1 on white but sits here on --ui-02 (now --text-02, 19.17:1), and the skip link was 37px tall (now a full 44px target). The structural half is kept as a regression test that asserts only what static analysis can settle.

Two findings ticketed rather than folded into an assurance pass: A11Y-01, ParamTooltip gives ~80 hint labels role=button and a 44px obligation they do not meet; A11Y-02, only the row affordances declare forced-colors fallbacks. Not claimed: axe-core (a new dev dependency is an approval, not an assumption), forced-colours and reduced-motion emulation (needs devtools media overrides), NVDA/VoiceOver (owner-run).

Verify: 66 files / 1003 tests · restart safety pass · non-mutating check build · Pages build v3.2.677, 20-file inventory

Changed files:

M	docs/app.js
M	docs/index.html
M	docs/meta.json
M	docs/styles/main.css
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	styles/main.css
A	tests/accessibilityAudit.test.js
M	version.json
commit a9795fe23bb01d3dbcb727e13767323f5ca9c355
Author: djDAOjones
Author date: 2026-08-27T15:58:49+01:00
Commit date: 2026-08-27T15:58:49+01:00
Parents: fe3577132fb26ba2e2d541693ea6284f16734148
Subject: DEMO-01: ship three example projects as downloadable saves

A plain labelled route, a branching campus route with a crowd traced from it and released at the head's arrival, and a weighted signal network with two dot streams. Each ships as a real .zip project save people can download and re-use, and opens from the File menu through the ordinary loadProject path — no special case anywhere.

Generated rather than committed as source: the repo holds the example definitions plus the already-bundled backgrounds, and the build pairs them. Byte-reproducible (fixed entry timestamps, pinned authoring date) so a rebuild that changed no example produces no diff. Built from the live models, so they cannot rot into an invalid shape — exampleProjects.test.js rehydrates each through the app's own timing path and asserts it resolves, times deterministically and leaves no broken crowd binding.

Publication boundary honoured, not bypassed: the build's ban on project ZIPs was a ban on publishing archives nobody had reviewed. public-assets.json now names the three approved archives and the approved background each contains; the build refuses any ZIP not in that record, .gitignore excepts exactly those three paths, and publicationBoundary.test.js asserts the shipped set equals the approved set.

Verify: 65 files / 991 tests · restart safety pass · non-mutating check build · production Chromium (Open day route opened from the File menu with its background, 1 branch, 0 structural problems, 4 crowd nodes bound and none broken, one join wait, 11.65s timeline, zero console entries) · Pages build v3.2.675, 20-file inventory

Changed files:

M	.gitignore
M	build.js
M	docs/app.js
M	docs/app.js.map
A	docs/examples/nervous-system-flow.zip
A	docs/examples/parm-aerial-walk.zip
A	docs/examples/uon-open-day.zip
M	docs/index.html
M	docs/meta.json
M	index.html
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	public-assets.json
A	scripts/build-examples.mjs
M	src/app/persistence.js
M	src/app/wiringDom.js
A	src/examples/index.js
A	tests/exampleProjects.test.js
M	tests/publicationBoundary.test.js
M	version.json
commit fe3577132fb26ba2e2d541693ea6284f16734148
Author: djDAOjones
Author date: 2026-08-27T15:28:37+01:00
Commit date: 2026-08-27T15:28:37+01:00
Parents: d2f6caa50c5e13bc66de9bc2406330e842b99b98
Subject: COMPOSE-04: offer a branch handle where a crowd enters the route

A waypoint a bound entry node sits on carries a "+" handle beside its marker; clicking it emits route:branch-arm, the same event Alt+click emits, so there is one branch path rather than a second mechanism. Entry nodes only, and a broken binding offers nothing. The leg-midpoint "+" and this one now draw through one routine.

The handle is its own hit target, checked ahead of the waypoint because it sits clear of the marker and so outside its hit radius. The click path hit-tests it directly rather than trusting the hover state: gating on hover left it dead on touch and pen, where a tap never hovers first — exactly the devices REV-03 unified this transaction for.

DEV-01: restart.sh matches LISTEN sockets only. It was refusing to boot on a browser's stale CLOSED client sockets to the server it had just stopped — reporting a foreign port holder where nothing was listening at all.

Verify: 64 files / 963 tests · restart safety pass · non-mutating check build · production Chromium (handle armed the fork with no hover beforehand; the place click created Waypoint 1-B1 alongside the existing 2-B1, correctly lettered per fork, no structural problems, zero console entries) · Pages build v3.2.672, 17-file inventory

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	scripts/restart.sh
M	src/app/pointer.js
M	src/app/wiringControllers.js
M	src/handlers/InteractionHandler.js
M	src/main.js
M	src/services/RenderingService.js
M	src/utils/routeAnchors.js
A	tests/branchHandle.test.js
M	version.json
commit d2f6caa50c5e13bc66de9bc2406330e842b99b98
Author: djDAOjones
Author date: 2026-08-27T15:13:48+01:00
Commit date: 2026-08-27T15:13:48+01:00
Parents: c042a789bc162d6d23a71a4ceeee106f1fe84de9
Subject: COMPOSE-02: solve and bake the wait that outlasts a crowd

"Wait here for this crowd" computes the wait a waypoint needs so the head is still there when the last dot arrives, and writes it as an ordinary authored pauseTime. Solved in closed form rather than differenced: adding a wait lengthens the timeline and every onset is a fraction of it, so "last arrival minus arrival" undershoots. Per dot, P >= (f*D + J - A) / (1 - f), taking the largest — exact in one pass and idempotent, so a refit never creeps.

Unsatisfiable cases report a reason instead of a wrong number: a dot released at the very end moves out by whatever the route is lengthened, and a looping crowd has no arrival at all. The onset arithmetic was extracted from SwarmEngine into crowdArrival.js and the engine now imports it, with every swarm fixture byte-for-byte identical through the extraction.

Verify: 63 files / 945 tests · restart safety pass · non-mutating check build · production Chromium (a crowd finishing at ~25s against a 7.3s route solved to a 48215ms wait, after which the head leaves at 53984ms and the last dot arrives at 53983ms; zero console entries) · Pages build v3.2.670, 17-file inventory

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	index.html
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/app/crowds.js
M	src/app/network.js
M	src/services/SwarmEngine.js
A	src/utils/crowdArrival.js
A	tests/crowdArrival.test.js
M	version.json
commit c042a789bc162d6d23a71a4ceeee106f1fe84de9
Author: djDAOjones
Author date: 2026-08-27T15:06:36+01:00
Commit date: 2026-08-27T15:06:36+01:00
Parents: a1ec48f7746be5c3af0f81c7f4a60cb2b15615c0
Subject: COMPOSE-03: trace the route into a crowd guide network

A node per major waypoint, an edge per leg carrying that leg's minors as control points so the guide curve is the route's own curve, and branches traced as edges leaving the fork and returning to the rejoin. Entries and exits are derived from the traced topology, so a branched route yields several exits. Edges are one-way: a guide traced from a route inherits its direction of travel.

The result is a copy the author reshapes freely — nothing done to it reaches back into the route — while each node keeps its COMPOSE-01 binding, so moving a waypoint carries its traced node instead of stranding the copy. A route too short to trace, or one whose branch structure is unresolved, is refused with a reason rather than half-built.

Verify: 62 files / 923 tests · restart safety pass · non-mutating check build · production Chromium on the branched route (4 bound nodes, entry and exit derived correctly, 4 one-way edges including fork-to-branch and branch-to-rejoin, trunk leg carrying its 2 minors as control points, zero console entries) · Pages build v3.2.668, 17-file inventory

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	index.html
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/app/crowds.js
M	src/app/network.js
A	src/utils/routeTrace.js
A	tests/routeTrace.test.js
M	version.json
commit a1ec48f7746be5c3af0f81c7f4a60cb2b15615c0
Author: djDAOjones
Author date: 2026-08-27T14:58:49+01:00
Commit date: 2026-08-27T14:58:49+01:00
Parents: 823329aec6b5460126063e1c8393d487edad98da
Subject: COMPOSE-01: bind crowds to route moments

GraphNode.anchorWaypointId binds a node's evaluated position to a waypoint; Emitter.releaseAnchor binds a release window's start to arrival, pause-end or route-end. Both resolve at evaluation time from live route state, default to null and are omitted from toJSON when null. Ownership is strictly one-way: nothing here moves a waypoint, and route timing never becomes a function of crowd arrival.

Authored intent survives binding — a node keeps its own x/y and only a derived position() follows the waypoint, so a deleted waypoint returns the node to where it was authored, keeps the binding, and reports the break once per change. Only a bound emitter's window start moves, leaving every existing unanchored swarm hash byte-for-byte identical.

Verify: 61 files / 906 tests · restart safety pass · non-mutating check build · production Chromium (node bound to its waypoint's exact position with authored coords intact, emitter released at 2993ms = arrival + wait with nothing before, broken binding falling back and reported, zero console entries) · Pages build v3.2.666, 17-file inventory

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/app/network.js
M	src/app/pathTiming.js
M	src/main.js
M	src/models/Emitter.js
M	src/models/GraphNode.js
M	src/player/PlayerApp.js
M	src/services/NetworkEditService.js
M	src/services/RenderingService.js
M	src/services/SwarmEngine.js
A	src/utils/routeAnchors.js
A	tests/routeAnchors.test.js
M	version.json
commit 823329aec6b5460126063e1c8393d487edad98da
Author: djDAOjones
Author date: 2026-08-27T14:47:57+01:00
Commit date: 2026-08-27T14:47:57+01:00
Parents: 80f06920d33fe98cab4ba7ab3c24639225e4453c
Subject: ROUTE-01d: carry branches through export

PlayerApp already takes pathTimingMixin wholesale, so it builds the same splines and composes the same master timeline; this carries branchPaths and branchTimeline into its render state and proves nothing is lost in between. A terminal branch that outlives the trunk now extends the timeline instead of being cut off at the trunk's end, while a branch that fits inside it changes nothing. The composed-timeline cache is keyed on base speed as well as geometry.

Verify: 60 files / 878 tests · restart safety pass · non-mutating check build · live Chromium (composed total and engine duration agree at 7269ms; the coordVersion-9 snapshot carries branch links on exactly the one branch waypoint and adds no key to the other five; the inlined player.js bundle contains the branch composition and render code; zero console entries). Opening an exported file end-to-end stays REV-04's owner-run evidence. · Pages build v3.2.664, 17-file inventory

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/app/pathTiming.js
M	src/player/PlayerApp.js
A	tests/branchExportParity.test.js
M	tests/playerApp.test.js
M	version.json
commit 80f06920d33fe98cab4ba7ab3c24639225e4453c
Author: djDAOjones
Author date: 2026-08-27T14:42:17+01:00
Commit date: 2026-08-27T14:42:17+01:00
Parents: 8711ceaffbc288c7b6afd098cac04f14186194a6
Subject: ROUTE-01c: author branches by fork gesture and drag-to-rejoin

Alt+click a waypoint arms a branch and the next canvas click places it, inserted after the fork's own leg block so the array still reads in route order; Alt+click on empty canvas still force-adds a major. Dragging a branch's last waypoint onto another waypoint rejoins it there, and onto the current target clears it — the point is restored, not moved. Branch rows are indented and tagged, numbered fork·letter·position (2·B1) by the shared routing that the scope chip and the semantic outline now also read, and the fork wears a badge on its own marker.

Two bugs the live pass found: findWaypointAt hit-tested the waypoint being dragged (it sits on the target at drop time), and both handlers snapshotted undo before mutating when this project's stack holds post-action states.

Verify: 59 files / 869 tests · restart safety pass · non-mutating check build · production Chromium (fork armed and placed, rejoin with a 1203ms join wait and the point restored, same drag toggling back to terminal, undo restoring the rejoin, reload round-trip, zero console entries) · Pages build v3.2.663, 17-file inventory

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	docs/styles/main.css
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/app/pointer.js
M	src/app/wiringBus.js
M	src/app/wiringControllers.js
M	src/controllers/UIController.js
M	src/handlers/InteractionHandler.js
M	src/utils/routeBranches.js
M	src/utils/sceneSemantics.js
M	src/utils/waypointNaming.js
M	styles/main.css
A	tests/branchAuthoring.test.js
M	version.json
commit 8711ceaffbc288c7b6afd098cac04f14186194a6
Author: djDAOjones
Author date: 2026-08-27T13:29:35+01:00
Commit date: 2026-08-27T13:29:35+01:00
Parents: ba46cf7e98f9c2183d3617acaaaa2d2ecdbf0c75
Subject: ROUTE-01b: draw and animate hero-route branches

Each branch gets its own spline, anchored at its fork and rejoin so it meets the trunk at both ends, plus its own head. Timing stays derived: AnimationEngine keeps the one authoritative transport, branchTiming builds each run's leg, and a branch resolves its position from master timeline time through the same PlayerCore.timelineToPath mapping the trunk uses — so an interleaved pause holds a branch head still by the same arithmetic. Two additive vector layers (branch-paths under the trunk, branch-heads above it) reuse renderPath/renderPathHead via an engine facade differing only in getPathProgress.

Trunk timing now reads the trunk run rather than the whole array, via a module helper because PlayerApp borrows only part of the mixin. The follow-camera keeps tracking the trunk head; per-fork camera choice is left to ROUTE-01c's sign-off. Linear routes never enter the branch pass.

Verify: 58 files / 832 tests · restart safety pass · non-mutating check build · production Chromium on a branched route (both splines start at the fork, two heads advance simultaneously, shorter branch completes and holds, zero console entries) · Pages build v3.2.661, 17-file inventory

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	pm_skills/project/wish-list.md
M	src/app/pathTiming.js
M	src/main.js
M	src/services/RenderingService.js
A	src/utils/branchTiming.js
M	src/utils/routeBranches.js
A	tests/branchTiming.test.js
M	tests/vectorLayers.test.js
M	version.json
commit ba46cf7e98f9c2183d3617acaaaa2d2ecdbf0c75
Author: djDAOjones
Author date: 2026-08-27T13:14:41+01:00
Commit date: 2026-08-27T13:14:41+01:00
Parents: 5e03962d385f7ff7597a420f69ccaff45de64013
Subject: ROUTE-01a: add the branch model and master-timeline composition

A hero-route branch is a contiguous run of waypoints sharing a branchId in the one ordered array, with branchFrom on its first waypoint and branchRejoin on its last. All three default to null and are omitted from toJSON(), so an unsplit project's save stays byte-identical. resolveRouteBranches validates fork/rejoin links and reports structural problems without repairing them; PlayerCore.composeBranchTimeline resolves leg starts by relaxation over fork dependencies, giving simultaneous fork start, latest-arrival rejoin recorded once per join, universal completion, and order-independent, terminating output on a cyclic structure.

Headless slice: no rendering, authoring or export change. ROUTE-01 is now ROUTE-01a/b/c/d.

Verify: 57 files / 808 tests · restart safety pass · non-mutating check build · Pages build v3.2.659, 17-file inventory

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/core/PlayerCore.js
M	src/models/Waypoint.js
A	src/utils/routeBranches.js
A	tests/routeBranches.test.js
M	version.json
commit 5e03962d385f7ff7597a420f69ccaff45de64013
Author: djDAOjones
Author date: 2026-08-27T13:07:44+01:00
Commit date: 2026-08-27T13:07:44+01:00
Parents: 87740a7c79c7c08d0f7673f4e01386ef328356e3
Subject: UI-02: show minor waypoints in the route list

The sidebar list renders the whole route: minors are indented, selectable, renameable rows under the leg they shape, numbered major.minor by a shared routine the semantic outline now also uses (the outline's route-position numbering collided with the list's major numbering). A minor is reorder-visible, not reorder-able — it has no drag or arrow controls, and a major drags as its whole leg block so minors visibly travel where reorderWaypointBlocks will put them; the waypoints:reordered payload stays majors-only.

UI-02a: inline rename detaches its blur listener before replacing the input. Chrome dispatches the blur from inside that replaceWith, and the re-entrant pass threw NotFoundError on every successful Enter-committed rename.

Verify: 56 files / 773 tests · restart safety pass · non-mutating check build · production Chromium (selection, rename, block reorder, autosave round-trip, 44px rows, zero console entries) · Pages build v3.2.658, 17-file inventory

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/styles/main.css
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	pm_skills/project/wish-list.md
M	src/controllers/UIController.js
M	src/utils/sceneSemantics.js
A	src/utils/waypointNaming.js
M	styles/main.css
M	tests/sceneOutline.test.js
A	tests/waypointList.test.js
A	tests/waypointNaming.test.js
M	version.json
commit 87740a7c79c7c08d0f7673f4e01386ef328356e3
Author: djDAOjones
Author date: 2026-08-27T12:41:01+01:00
Commit date: 2026-08-27T12:41:01+01:00
Parents: 9211bc32dcf0fb5926180d9a75095438e68a0155
Subject: DOC-01: unify the Codex/Claude agent contract

AGENTS.md becomes the single shared standing contract with tiered read policy; a minimal root CLAUDE.md imports it. Removes the obsolete inline budget table (budgets live only in pm_skills/memory-policy.md) and the stale prompt paths that no longer exist (roadmap-refactor.md, prune-memory.md, next-batch.md, doctor-memory.md, corrections.md).

Verify: docs only, no source change; baseline npm run check green (745 tests, restart safety, non-mutating check build).

Changed files:

M	.gitignore
M	AGENTS.md
A	CLAUDE.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
commit 9211bc32dcf0fb5926180d9a75095438e68a0155
Author: djDAOjones
Author date: 2026-08-26T22:37:24+01:00
Commit date: 2026-08-26T22:37:24+01:00
Parents: c9a953cbaac74691ac947855c16531138d311e79
Subject: docs(review): add durable remediation handover


Changed files:

M	README.md
M	pm_skills/project/file-map.md
A	reviews/README.md
A	reviews/read-only-comprehensive-repository-review-prompt.md
A	reviews/route-plotter-review-finding-crosswalk-2026-08-26.md
A	reviews/route-plotter-review-headlines-for-novices-2026-08-26.md
A	reviews/route-plotter-review-remediation-continuation-prompt-2026-08-26.md
A	reviews/route-plotter-v3-comprehensive-repository-review-2026-08-26.md
commit c9a953cbaac74691ac947855c16531138d311e79
Author: djDAOjones
Author date: 2026-08-26T22:12:36+01:00
Commit date: 2026-08-26T22:12:36+01:00
Parents: 673e627c9add1871f9b08ca74f88b9d5f973bfac
Subject: PM: refactor roadmap after HEAD-01


Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/tickets/COMPOSE-01.md
commit 673e627c9add1871f9b08ca74f88b9d5f973bfac
Author: djDAOjones
Author date: 2026-08-26T22:10:47+01:00
Commit date: 2026-08-26T22:10:47+01:00
Parents: 8f1167f3336f07bb6f26fc1c8b2a1be989c6019e
Subject: HEAD-01: ship built-in drone head preset


Changed files:

M	build.js
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	index.html
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/app/editorPanel.js
M	src/app/persistence.js
M	src/app/projectReset.js
M	src/app/undoRedo.js
M	src/app/wiringDom.js
A	src/assets/README.md
A	src/assets/drone-head.png
M	src/main.js
M	src/player/PlayerApp.js
M	src/services/RenderingService.js
A	src/utils/pathHeadPresets.js
A	tests/pathHeadPresets.test.js
M	tests/playerApp.test.js
M	tests/projectReset.test.js
M	version.json
commit 8f1167f3336f07bb6f26fc1c8b2a1be989c6019e
Author: djDAOjones
Author date: 2026-08-26T21:43:02+01:00
Commit date: 2026-08-26T21:43:02+01:00
Parents: a6f7b5433887bd47ca73c2c981d01556097f83c5
Subject: MAINT-01: remove verified dead helpers

Delete only the pre-verified superseded timing, visibility and inert export paths, including their orphaned cache state, without widening the sweep.

Verify: 53 test files · 739 tests · restart safety 0 · build 0

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/trajectory.md
M	src/app/exporting.js
M	src/app/pathTiming.js
M	src/app/persistence.js
M	src/player/PlayerApp.js
M	src/services/AnimationEngine.js
M	src/services/MotionVisibilityService.js
M	src/services/PathCalculator.js
M	tests/playerApp.test.js
M	tests/reviewTimeline.test.js
M	tests/units.test.js
M	version.json
commit a6f7b5433887bd47ca73c2c981d01556097f83c5
Author: djDAOjones
Author date: 2026-08-26T21:37:41+01:00
Commit date: 2026-08-26T21:37:41+01:00
Parents: 285a0cdf354cee9b2310e7044453ee0840f29c53
Subject: SCALE-01: add project-reference sizing

Persist one visual reference so editor, HTML and video outputs preserve authored map-bound proportions without coupling appearance to timeline or normalised geometry.

Verify: 53 test files · 739 tests · restart safety 0 · build 0 · Chromium production pass

Changed files:

M	UI-STANDARDS.md
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	index.html
M	pm_skills/project/architecture.md
M	pm_skills/project/backlog.md
M	pm_skills/project/brief.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
D	pm_skills/project/tickets/SCALE-01.md
M	pm_skills/project/trajectory.md
M	src/app/editorPanel.js
M	src/app/persistence.js
M	src/app/projectReset.js
M	src/app/viewport.js
M	src/app/wiringDom.js
M	src/config/constants.js
M	src/config/tooltips.js
M	src/controllers/UIController.js
M	src/main.js
M	src/player/PlayerApp.js
M	src/services/AreaHighlightRenderer.js
M	src/services/RenderingService.js
A	src/utils/renderReference.js
M	src/utils/uiReadouts.js
M	tests/multiSelect.test.js
M	tests/playerApp.test.js
M	tests/projectReset.test.js
A	tests/renderReference.test.js
M	tests/reviewAccessibility.test.js
M	tests/reviewPersistence.test.js
M	tests/scenePersistence.test.js
M	tests/vectorLayers.test.js
M	version.json
commit 285a0cdf354cee9b2310e7044453ee0840f29c53
Author: djDAOjones
Author date: 2026-08-26T20:58:40+01:00
Commit date: 2026-08-26T20:58:40+01:00
Parents: 97c18aec6127c11347ce61355fc0072fd72e0e32
Subject: PM: mark SCALE-01 ready after REV-06


Changed files:

M	pm_skills/project/tickets/SCALE-01.md
commit 97c18aec6127c11347ce61355fc0072fd72e0e32
Author: djDAOjones
Author date: 2026-08-26T20:57:59+01:00
Commit date: 2026-08-26T20:57:59+01:00
Parents: ef791a3744062eda734268af20dbe81f2e4203f3
Subject: REV-06: sleep stable paused render loops

Make preview scheduling demand-driven, keep camera settling alive only while visible work remains, and keep export seeks inside the synchronous export loop. Profiling shows 500-dot 4K drawing is already below a millisecond, so direct-render changes stay out of scope.

Verify: 52 files · 729 tests · restart safety · build 0 · production Chromium v3.2.651

Changed files:

M	AGENTS.md
M	README.md
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	pm_skills/project/architecture.md
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/app/playback.js
M	src/player/PlayerApp.js
M	src/services/AnimationEngine.js
M	src/services/CameraService.js
A	tests/performanceScheduling.test.js
M	version.json
commit ef791a3744062eda734268af20dbe81f2e4203f3
Author: djDAOjones
Author date: 2026-08-26T20:30:59+01:00
Commit date: 2026-08-26T20:30:59+01:00
Parents: 60cc4b4c085f57901737d441a2801f5299f0d839
Subject: CROWD-02: add whole-route busyness envelope


Changed files:

M	AGENTS.md
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	docs/styles/main.css
M	index.html
M	pm_skills/project/architecture.md
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
D	pm_skills/project/tickets/CROWD-02.md
M	pm_skills/project/trajectory.md
M	src/app/crowds.js
M	src/controllers/SceneOutlineController.js
M	src/models/Emitter.js
M	src/services/SwarmEngine.js
A	src/utils/busynessEnvelope.js
M	src/utils/sceneSemantics.js
M	styles/main.css
M	tests/Emitter.test.js
A	tests/busynessEnvelope.test.js
M	tests/crowds.test.js
M	tests/playerApp.test.js
M	tests/reviewAccessibility.test.js
M	tests/scenePersistence.test.js
M	tests/swarmEngine.test.js
M	version.json
commit 60cc4b4c085f57901737d441a2801f5299f0d839
Author: djDAOjones
Author date: 2026-08-26T20:05:27+01:00
Commit date: 2026-08-26T20:05:27+01:00
Parents: ec59de142fc11cb31dd97f31ba9c8561df379259
Subject: CROWD-03: expose seeded crowd variation

Add plain-language walking, pace, release timing and release bias controls, an exact pattern seed, and a seed-only Re-roll action with one-step Undo.

Verify: 50 test files / 708 tests; restart safety passed; build check passed; production Chromium passed at 320 px.

Changed files:

M	UI-STANDARDS.md
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	docs/styles/main.css
M	index.html
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
D	pm_skills/project/tickets/CROWD-03.md
M	pm_skills/project/trajectory.md
M	src/app/crowds.js
M	src/app/sceneOutline.js
M	src/controllers/SceneOutlineController.js
M	src/models/Emitter.js
M	styles/main.css
M	tests/Emitter.test.js
M	tests/crowds.test.js
M	tests/reviewAccessibility.test.js
M	tests/scenePersistence.test.js
M	tests/swarmEngine.test.js
M	version.json
commit ec59de142fc11cb31dd97f31ba9c8561df379259
Author: djDAOjones
Author date: 2026-08-26T19:51:39+01:00
Commit date: 2026-08-26T19:51:39+01:00
Parents: 2a359b0228111adf7a1b724a12a722e5e4e216ac
Subject: UI-05: add waypoint card actions

Reset selected card settings to route style and apply a single waypoint's settings onward through one accessible, undoable transaction.

Verify: 50 test files / 701 tests; restart safety passed; build check passed; production Chromium passed at 320 px.

Changed files:

M	UI-STANDARDS.md
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/styles/main.css
M	index.html
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/app/editorPanel.js
M	src/app/undoRedo.js
M	src/app/wiringBus.js
M	src/app/wiringDom.js
M	src/controllers/SectionController.js
A	src/utils/waypointCardActions.js
M	styles/main.css
M	tests/multiSelect.test.js
M	tests/reviewAccessibility.test.js
A	tests/waypointCardActions.test.js
M	tests/wiringBus.test.js
M	version.json
commit 2a359b0228111adf7a1b724a12a722e5e4e216ac
Author: djDAOjones
Author date: 2026-08-26T19:22:48+01:00
Commit date: 2026-08-26T19:22:48+01:00
Parents: 8b986d0951ab1273d52411af73b0aa4ebcf6c7cb
Subject: UI-04: show honest mixed waypoint values

Compare each inspector control against its real write targets and keep mixed presentation transient.

Verify: 685 tests; restart safety passed; build check passed

Changed files:

M	UI-STANDARDS.md
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	docs/styles/main.css
M	docs/styles/swatch-picker.css
M	index.html
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/app/camera.js
M	src/app/editorPanel.js
M	src/app/wiringControllers.js
M	src/app/wiringDom.js
M	src/components/SwatchPicker.js
M	src/controllers/UIController.js
A	src/utils/mixedControlState.js
M	styles/main.css
M	styles/swatch-picker.css
A	tests/mixedControlState.test.js
M	tests/multiSelect.test.js
M	tests/swatchPicker.test.js
M	tests/units.test.js
M	version.json
commit 8b986d0951ab1273d52411af73b0aa4ebcf6c7cb
Author: djDAOjones
Author date: 2026-08-26T19:00:18+01:00
Commit date: 2026-08-26T19:00:18+01:00
Parents: d3b4cf67732139606ae0244c29dedb85cb49e69f
Subject: UI-03: expose label appearance and zoom transitions

Surface existing per-waypoint controls under More and keep exact custom-colour state honest.

Verify: 678 tests · restart safety 0 · build 0

Changed files:

M	UI-STANDARDS.md
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	docs/styles/swatch-picker.css
M	index.html
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/app/camera.js
M	src/app/editorPanel.js
M	src/app/undoRedo.js
M	src/app/wiringControllers.js
M	src/app/wiringDom.js
M	src/components/SwatchPicker.js
M	src/main.js
M	styles/swatch-picker.css
M	tests/reviewAccessibility.test.js
A	tests/swatchPicker.test.js
M	tests/units.test.js
M	version.json
commit d3b4cf67732139606ae0244c29dedb85cb49e69f
Author: djDAOjones
Author date: 2026-08-26T18:35:24+01:00
Commit date: 2026-08-26T18:35:24+01:00
Parents: bd2148d471a057f60ab63856adbe108e82b04a6f
Subject: UX-02: make inspector units honest


Changed files:

M	UI-STANDARDS.md
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	index.html
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/app/editorPanel.js
M	src/app/persistence.js
M	src/app/undoRedo.js
M	src/app/wiringControllers.js
M	src/app/wiringDom.js
M	src/config/constants.js
M	src/controllers/UIController.js
M	src/main.js
M	src/models/Waypoint.js
M	src/services/RenderingService.js
A	src/utils/uiReadouts.js
M	tests/reviewAccessibility.test.js
M	version.json
commit bd2148d471a057f60ab63856adbe108e82b04a6f
Author: djDAOjones
Author date: 2026-08-26T18:16:23+01:00
Commit date: 2026-08-26T18:16:23+01:00
Parents: bbc1c3f8130aff15a0a914b34e088d3bb0582b6d
Subject: UI-01: add two-tier inspector cards

Keep each common card task visible and place refinements in one native, keyboard-stable More disclosure; refactor the roadmap around the unlocked UI and crowd work.

Verify: 47 test files · 671 tests · restart safety 0 · build 0 · Chromium production pass

Changed files:

M	UI-STANDARDS.md
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/styles/main.css
M	index.html
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/controllers/SectionController.js
M	styles/main.css
M	tests/reviewAccessibility.test.js
M	version.json
commit bbc1c3f8130aff15a0a914b34e088d3bb0582b6d
Author: djDAOjones
Author date: 2026-08-26T17:53:40+01:00
Commit date: 2026-08-26T17:53:40+01:00
Parents: 31cbfd3e89be704bafbf140a83912c19905b04be
Subject: REV-03: unify canvas pointer transactions

Use one restoring Pointer Events state machine for waypoint, area and network gestures; retain physical iOS and Android evidence as the closure gate.

Verify: 47 test files · 669 tests · restart safety 0 · build 0 · Chromium production pass

Changed files:

M	AGENTS.md
M	README.md
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/styles/main.css
M	pm_skills/project/architecture.md
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
A	pm_skills/project/tickets/REV-03.md
M	src/app/editorPanel.js
M	src/app/network.js
M	src/app/persistence.js
M	src/app/projectReset.js
M	src/app/undoRedo.js
M	src/app/wiringBus.js
M	src/app/wiringControllers.js
M	src/handlers/InteractionHandler.js
M	src/main.js
M	src/services/AreaEditService.js
M	src/services/NetworkEditService.js
M	styles/main.css
M	tests/areaEdit.test.js
A	tests/interactionPointer.test.js
M	tests/networkEdit.test.js
M	tests/wiringBus.test.js
M	version.json
commit 31cbfd3e89be704bafbf140a83912c19905b04be
Author: djDAOjones
Author date: 2026-08-26T17:17:59+01:00
Commit date: 2026-08-26T17:17:59+01:00
Parents: b3c20ea654c7fe2a5654ce3d30bdee953ef7f1d3
Subject: REV-02: add semantic scene authoring


Changed files:

M	AGENTS.md
M	README.md
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	docs/styles/main.css
M	index.html
M	pm_skills/project/architecture.md
M	pm_skills/project/backlog.md
M	pm_skills/project/brief.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
D	pm_skills/project/tickets/REV-02.md
M	pm_skills/project/tickets/ROUTE-01.md
M	pm_skills/project/trajectory.md
M	src/app/crowds.js
M	src/app/network.js
M	src/app/persistence.js
A	src/app/sceneOutline.js
M	src/app/undoRedo.js
M	src/app/wiringControllers.js
M	src/app/wiringDom.js
A	src/controllers/SceneOutlineController.js
M	src/controllers/SectionController.js
M	src/controllers/UIController.js
M	src/main.js
M	src/models/FlowLayer.js
A	src/player/playerAccessibility.js
M	src/player/playerEntry.js
M	src/services/AreaDrawingService.js
M	src/services/AreaEditService.js
M	src/services/HTMLExportService.js
M	src/services/NetworkEditService.js
A	src/utils/entityId.js
A	src/utils/sceneSemantics.js
M	styles/main.css
M	tests/areaEdit.test.js
M	tests/crowds.test.js
M	tests/htmlExportCache.test.js
M	tests/mixins.test.js
M	tests/multiSelect.test.js
M	tests/networkEdit.test.js
A	tests/playerAccessibility.test.js
A	tests/playerEntryAccessibility.test.js
M	tests/reviewPersistence.test.js
A	tests/sceneOutline.test.js
A	tests/sceneOutlineApp.test.js
M	version.json
commit b3c20ea654c7fe2a5654ce3d30bdee953ef7f1d3
Author: djDAOjones
Author date: 2026-08-26T15:49:45+01:00
Commit date: 2026-08-26T15:49:45+01:00
Parents: c1b73d8f876d410daa1a5a75acf3d38bcd04c886
Subject: SUPPORT-01: add privacy-safe bug reporting


Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/styles/main.css
M	index.html
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/app/privacy.js
M	styles/main.css
M	tests/privacy.test.js
M	tests/reviewAccessibility.test.js
M	version.json
commit c1b73d8f876d410daa1a5a75acf3d38bcd04c886
Author: djDAOjones
Author date: 2026-08-26T15:28:18+01:00
Commit date: 2026-08-26T15:28:18+01:00
Parents: 591e1d6df36c630a64796aef96f7660bdd51c7a7
Subject: PHASE-1: close health and asset-boundary tranche


Changed files:

M	.gitignore
M	README.md
M	build.js
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	docs/styles/main.css
D	examples/route-project-2026-01-10.zip
D	images/route-project-2026-03-28 (2).zip
M	index.html
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
D	pm_skills/project/tickets/CROWD-01.md
D	pm_skills/project/tickets/REV-08.md
D	pm_skills/project/tickets/REV-09.md
D	pm_skills/project/tickets/REV-10.md
M	pm_skills/project/trajectory.md
A	public-assets.json
M	src/app/backgroundLoading.js
M	src/app/crowds.js
M	src/app/exporting.js
M	src/app/network.js
M	src/app/persistence.js
A	src/app/privacy.js
A	src/app/projectReset.js
M	src/app/undoRedo.js
M	src/app/wiringBus.js
M	src/app/wiringControllers.js
M	src/app/wiringDom.js
M	src/main.js
M	src/models/Emitter.js
A	src/services/DiagnosticsService.js
M	src/services/HTMLExportService.js
M	src/services/ImageAssetService.js
M	src/services/NetworkEditService.js
M	src/services/SwarmEngine.js
M	src/services/UndoService.js
M	src/services/VideoExporter.js
A	src/utils/assetReferences.js
A	src/utils/graphRouting.js
A	src/utils/safeColor.js
M	styles/main.css
A	tests/assetAdmission.test.js
A	tests/assetPruning.test.js
M	tests/crowds.test.js
A	tests/diagnostics.test.js
A	tests/graphRouting.test.js
M	tests/htmlExportCache.test.js
M	tests/imageAssetRoundTrip.test.js
M	tests/mixins.test.js
M	tests/networkEdit.test.js
A	tests/privacy.test.js
A	tests/projectReset.test.js
A	tests/publicationBoundary.test.js
M	tests/reviewAccessibility.test.js
M	tests/reviewPersistence.test.js
A	tests/safeColor.test.js
M	tests/swarmEngine.test.js
A	tests/undoService.test.js
A	tests/videoExporter.test.js
A	tests/wiringBus.test.js
M	version.json
commit 591e1d6df36c630a64796aef96f7660bdd51c7a7
Author: djDAOjones
Author date: 2026-08-26T14:13:11+01:00
Commit date: 2026-08-26T14:13:11+01:00
Parents: cf3b20ee6b32851a6f8acf2029f074c3fda226f9
Subject: PHASE-1: repair live editing and governance


Changed files:

A	.github/SECURITY.md
A	.github/SUPPORT.md
A	LICENSE
M	README.md
A	THIRD_PARTY_NOTICES.md
M	index.html
M	package.json
M	src/app/playback.js
M	src/app/undoRedo.js
M	src/app/wiringControllers.js
M	src/config/keybindings.js
M	src/controllers/UIController.js
M	src/handlers/InteractionHandler.js
M	src/services/AreaEditService.js
M	styles/main.css
A	tests/areaEdit.test.js
A	tests/governance.test.js
M	tests/multiSelect.test.js
M	tests/reviewAccessibility.test.js
commit cf3b20ee6b32851a6f8acf2029f074c3fda226f9
Author: djDAOjones
Author date: 2026-08-26T14:02:26+01:00
Commit date: 2026-08-26T14:02:26+01:00
Parents: 7b7aef5819152051402d38d7511d7f27457bca73
Subject: PHASE-0: sign off foundation decisions

Convert accepted owner decisions into explicit implementation contracts and dependency-placed roadmap work.

Verify: 410 tests · restart safety 0 · build 0

Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/brief.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/tickets/REV-02.md
M	pm_skills/project/tickets/REV-08.md
M	pm_skills/project/tickets/REV-09.md
M	pm_skills/project/tickets/ROUTE-01.md
M	pm_skills/project/tickets/SCALE-01.md
M	pm_skills/project/trajectory.md
commit 7b7aef5819152051402d38d7511d7f27457bca73
Author: djDAOjones
Author date: 2026-08-26T13:46:11+01:00
Commit date: 2026-08-26T13:46:11+01:00
Parents: 2bc9fffdb4f5c6a7763477721a98fa709561b441
Subject: ROADMAP: prioritise live health and crowd delivery

Refactor the queue into dependency phases, promote confirmed user-value gaps, expose owner decisions, retire superseded work and add scoped tickets for crowd, scaling, assets and composition.

Verify: tests 410 · restart contract 0 · build 0 · memory integrity 0

Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/brief.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
A	pm_skills/project/tickets/COMPOSE-01.md
A	pm_skills/project/tickets/CROWD-01.md
M	pm_skills/project/tickets/CROWD-02.md
A	pm_skills/project/tickets/CROWD-03.md
M	pm_skills/project/tickets/REV-02.md
M	pm_skills/project/tickets/REV-08.md
M	pm_skills/project/tickets/REV-09.md
A	pm_skills/project/tickets/REV-10.md
M	pm_skills/project/tickets/ROUTE-01.md
A	pm_skills/project/tickets/SCALE-01.md
M	pm_skills/project/wish-list.md
commit 2bc9fffdb4f5c6a7763477721a98fa709561b441
Author: djDAOjones
Author date: 2026-08-26T13:22:00+01:00
Commit date: 2026-08-26T13:22:00+01:00
Parents: a8133289809dd1a12ab20060c9493f175e356f9d
Subject: chore: deploy v3.2.619

Generate the clean GitHub Pages /docs artifact from the reviewed source and remove stale files outside the deployment allowlist.

Verify: build 0 · cache references 0 · staged set docs/version only

Changed files:

D	docs/UoN_map 24-bit.png
D	docs/UoN_map.png
M	docs/app.js
M	docs/app.js.map
D	docs/images/Courts.jpg
D	docs/images/route-project-2026-03-28 (2).zip
M	docs/index.html
M	docs/meta.json
M	docs/player.js
M	docs/styles/main.css
M	docs/styles/tokens.css
M	version.json
commit a8133289809dd1a12ab20060c9493f175e356f9d
Author: djDAOjones
Author date: 2026-08-26T13:20:27+01:00
Commit date: 2026-08-26T13:20:27+01:00
Parents: cec0191250ab981b30e7242772ff165ea3e775b7
Subject: REV-01: remediate repository review blockers

Make recovery, imports, async images, timeline playback, responsive UI, release builds, deployment and restart ownership fail safely; retain product-scale and governance questions as explicit roadmap work.

Verify: tests 410 · restart contract 0 · build 0 · browser QA 0

Changed files:

A	.github/workflows/ci.yml
M	.gitignore
A	.nvmrc
M	AGENTS.md
M	DEV-INFRASTRUCTURE.md
M	README.md
M	build.js
M	index.html
M	package-lock.json
M	package.json
M	pm_skills/project/architecture.md
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
A	pm_skills/project/tickets/CROWD-02.md
A	pm_skills/project/tickets/REV-02.md
A	pm_skills/project/tickets/REV-08.md
A	pm_skills/project/tickets/REV-09.md
A	pm_skills/project/tickets/ROUTE-01.md
M	pm_skills/project/trajectory.md
M	pm_skills/project/wish-list.md
M	push.js
M	scripts/README.md
M	scripts/restart.sh
A	src/app/backgroundLoading.js
M	src/app/crowds.js
M	src/app/exporting.js
A	src/app/operationGeneration.js
M	src/app/pathTiming.js
M	src/app/persistence.js
M	src/app/playback.js
A	src/app/startup.js
M	src/app/undoRedo.js
M	src/app/viewport.js
M	src/app/wiringControllers.js
M	src/app/wiringDom.js
M	src/controllers/UIController.js
M	src/handlers/InteractionHandler.js
M	src/main.js
M	src/models/AnimationState.js
M	src/models/Emitter.js
M	src/models/FlowLayer.js
M	src/models/ImageAsset.js
M	src/models/Scene.js
M	src/models/Waypoint.js
M	src/player/PlayerApp.js
M	src/player/playerEntry.js
M	src/services/AnimationEngine.js
M	src/services/CoordinateTransform.js
M	src/services/HTMLExportService.js
M	src/services/ImageAssetService.js
M	src/services/MotionVisibilityService.js
M	src/services/RenderingService.js
M	src/services/StorageService.js
M	src/services/UndoService.js
M	src/utils/focusTrap.js
M	styles/main.css
M	styles/tokens.css
M	tests/crowds.test.js
A	tests/htmlExportCache.test.js
A	tests/imageAssetRoundTrip.test.js
A	tests/modelBoundary.test.js
M	tests/multiSelect.test.js
A	tests/operationGeneration.test.js
A	tests/projectLimits.test.js
A	tests/releaseSafety.test.js
A	tests/restartSafety.test.sh
A	tests/reviewAccessibility.test.js
A	tests/reviewPersistence.test.js
A	tests/reviewTimeline.test.js
M	tests/scenePersistence.test.js
A	tests/startup.test.js
M	tests/units.test.js
commit cec0191250ab981b30e7242772ff165ea3e775b7
Author: djDAOjones
Author date: 2026-08-19T11:03:25+01:00
Commit date: 2026-08-19T11:03:25+01:00
Parents: 27dd37682c7d1cf411452ae0ac073e702eb2a997
Subject: docs(pm): backlog triage — next milestone resequenced into waves, quarantine created

All 27 backlog items assessed (useful / fits design / viable) with claims
re-verified in code. Waves 0-4 sequenced; 3 wish-list defects promoted;
two scaling items merged into one design ticket; 5 items quarantined
pending owner approval (nothing deleted). Full write-up:
https://claude.ai/code/artifact/22f61966-b4a3-4240-88c6-f41f6674b075

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/wish-list.md
commit 27dd37682c7d1cf411452ae0ac073e702eb2a997
Author: djDAOjones
Author date: 2026-08-19T09:53:44+01:00
Commit date: 2026-08-19T09:53:44+01:00
Parents: a43639673abb359e28c9470f5db38fc5942ee226
Subject: docs(pm): Phase 5 close-out — v3 live, milestone closed, log archived

README/brief/architecture/DEV-INFRASTRUCTURE point at the live v3 Pages
URL and document the dual-bundle build + real-stack HTML export. Dev
guide reconciled with owner sign-off (mixin split in §4/§7/§10, worker
removal in §9, build:deploy alias in §3) and the doc-delta ticked.
Backlog: the completed v3.0 refactor milestone evicted; trajectory gains
Phase 2/3/4(items 2-5)/5 outcome lines. Decision-log: Phase 5 entry
added; June and April 2026 entries archived by month to
pm_skills/project/archive/ with INDEX.md (owner-approved split; live log
15 entries).

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	DEV-INFRASTRUCTURE.md
M	README.md
M	_Joe/dev notes/needs consolidating and deleting/dev guide.md
M	pm_skills/project/architecture.md
A	pm_skills/project/archive/INDEX.md
A	pm_skills/project/archive/decision-log-2026-04.md
A	pm_skills/project/archive/decision-log-2026-06.md
M	pm_skills/project/backlog.md
M	pm_skills/project/brief.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/doc-deltas.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
commit a43639673abb359e28c9470f5db38fc5942ee226
Author: djDAOjones
Author date: 2026-08-19T09:45:00+01:00
Commit date: 2026-08-19T09:45:00+01:00
Parents: 2d813b5068f4fd2ad017bb7611af101a45a7b9ec
Subject: chore: deploy v3.2.618


Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
A	docs/player.js
M	version.json
commit 2d813b5068f4fd2ad017bb7611af101a45a7b9ec
Author: djDAOjones
Author date: 2026-08-19T09:44:45+01:00
Commit date: 2026-08-19T09:44:45+01:00
Parents: 51a73b08d728299b7db98f265d83d2f9fba4c270
Subject: feat(export): HTML exports run the real render stack via PlayerCore (Phase 5)

The exported player is now PlayerApp — a headless app core bundled to
docs/player.js and inlined into every export — running the app's own
PlayerCore, AnimationEngine, SwarmEngine, RenderingService and child
renderers. The 1,270-line hand-written template player (own mapping copy,
delta-time beacons) is deleted; exports gain swarm layers and area
highlights, and scrub==play==export holds by construction.

- Exports embed the canonical coordVersion-9 snapshot via the new
  persistence _buildProjectSnapshot() (single save shape for autosave +
  export), plus additive timingReference {width,height}: the player
  recomputes timing in the app's recorded space to reproduce the authored
  timeline exactly, then renders at export resolution (the video-export
  preservation rule), scaled into the window per frame.
- PlayerApp adopts pathTimingMixin wholesale plus cherry-picked viewport
  and camera methods, so the fragile timing chain stays single-source.
  resetPlayback() mirrors the app's animation:reset recipe but restores
  the authored duration/mode instead of recomputing.
- build.js gains a second esbuild entry (IIFE, prod-minified, no
  sourcemap) built in watch and production modes.
- Page shell: UoN tokens inline, Carbon productive controls, 44px
  targets, focus rings, native range slider with aria-valuetext,
  keyboard transport, visible boot-error state.
- Tests: playerApp golden cross-check (timeline fingerprint equality,
  authored-timeline restore on reset, deterministic swarm across player
  instances, includeText flow-through); scenePersistence fake app binds
  the real _buildProjectSnapshot. 331 passing.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	build.js
M	package.json
M	src/app/exporting.js
M	src/app/persistence.js
A	src/player/PlayerApp.js
A	src/player/playerEntry.js
M	src/services/HTMLExportService.js
A	tests/playerApp.test.js
M	tests/scenePersistence.test.js
commit 51a73b08d728299b7db98f265d83d2f9fba4c270
Author: djDAOjones
Author date: 2026-08-18T20:33:14+01:00
Commit date: 2026-08-18T20:33:14+01:00
Parents: 6f3bee9243e05877885c952cc080f5943833705d
Subject: chore: deploy v3.1.611


Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	version.json
commit 6f3bee9243e05877885c952cc080f5943833705d
Author: djDAOjones
Author date: 2026-08-18T20:33:08+01:00
Commit date: 2026-08-18T20:33:08+01:00
Parents: 94523f07f2d9e63713b9b22384e4549f2e6c5f46
Subject: docs(pm): Phase 4 fifth slice close-out — multi-select everywhere

Backlog ticks the last Phase 4 item; decision-log entry (36 live —
prune pass still awaiting owner's call); wish-list gains group-drag,
mixed-value indication, marquee selection, and the dead Tab
select-adjacent emit; the stale-after-undo quirk narrows to editor
control values (chip half fixed); file-map notes selectionTargets,
setSelection, and the new test file.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/wish-list.md
commit 94523f07f2d9e63713b9b22384e4549f2e6c5f46
Author: djDAOjones
Author date: 2026-08-18T20:33:01+01:00
Commit date: 2026-08-18T20:33:01+01:00
Parents: 7989a64c7bd0681af20958a3ca77eefc14affb5b
Subject: feat(ui): multi-select honoured by every card — the bulk mode dissolves (Phase 4)

Selection becomes an app-level set with a primary: selectedWaypoints
rides beside selectedWaypoint, kept by the existing selected/
multi-selected/deselected event trio plus new waypoint:toggle-select.
The hidden "Select All Waypoints" row, its warning modal, and the
waypoint:all-change bulk pipeline are deleted — every card control now
writes to selectionTargets() and emits its usual change event once, so
a bulk gesture runs one path recalc, one debounced undo entry, and one
autosave. Leg/path props include minors (all-change never did); marker/
beacon/label/pause/speed/camera stay majors-only, matching the
disabled-control rule; label text stays single-only.

Gestures: Cmd/Ctrl+A selects the whole route incl. minors (the old
handler called a UIController method that never existed — the bus
swallowed the TypeError, so Cmd+A was dead); canvas Cmd/Ctrl+click
toggles membership (mousedown skips select-and-drag under the modifier
so the toggle survives); Delete removes the whole selection as one
undo entry; arrow nudges move the group; right-click keeps a selection.
Chip reads "Editing · N waypoints (M minor)"; cards populate from the
primary; selection rings render on every member; undo snapshots carry
selectedWaypointIds and restores re-bind by id (fixes the stale-chip-
after-undo quirk for waypoint scopes).

301 -> 326 tests (25 new in tests/multiSelect.test.js). Live-verified
at v3.1.610 dev: bulk writes hit exactly the selection, +1 undo stack
entry per gesture, Cmd+A/toggle/nudge/delete via real events, autosave
round-trip, per-waypoint ring pixel diffs, zero console errors.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	index.html
M	src/app/crowds.js
M	src/app/editorPanel.js
M	src/app/undoRedo.js
M	src/app/wiringControllers.js
M	src/app/wiringDom.js
M	src/config/tooltips.js
M	src/controllers/SectionController.js
M	src/controllers/UIController.js
M	src/handlers/InteractionHandler.js
M	src/main.js
M	src/services/RenderingService.js
A	tests/multiSelect.test.js
commit 7989a64c7bd0681af20958a3ca77eefc14affb5b
Author: djDAOjones
Author date: 2026-08-18T18:30:16+01:00
Commit date: 2026-08-18T18:30:16+01:00
Parents: 3ddbda90d59f2988920463127db0d72b67494353
Subject: chore: deploy v3.1.608

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/styles/main.css
M	version.json
commit 3ddbda90d59f2988920463127db0d72b67494353
Author: djDAOjones
Author date: 2026-08-18T18:30:11+01:00
Commit date: 2026-08-18T18:30:11+01:00
Parents: 342de2839141c2365923daa3bbc98fc9aedb9ac9
Subject: docs(pm): Phase 4 fourth slice close-out — network edit mode

Decision-log entry (gestures, entry/exit rules, traffic-share display,
preview-mode force, verification narrative, feel-check flags); backlog
item ticked; file-map gains NetworkEditService + network mixin + test
suite; wish-list gains network extras, the route-gated Add crowd
question, the 'At route end' wording, and the ModeBanner dedupe.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/wish-list.md
commit 342de2839141c2365923daa3bbc98fc9aedb9ac9
Author: djDAOjones
Author date: 2026-08-18T18:30:05+01:00
Commit date: 2026-08-18T18:30:05+01:00
Parents: ab93d4c0633d51d1b298dccde7bcae48457502b5
Subject: feat(ui): network edit mode — the pen draws where crowds walk (Phase 4)

The one true tool mode on the area-draw pattern: the Guide card's
Custom network option is live — switching an empty-network crowd hands
over the pen (forcing Edit mode), Edit network re-enters. Pen chaining:
click places a linked node, click a node continues from it (loops close,
duplicates never), click an edge selects it and lifts the pen; drags
move nodes (Shift 15° vs first neighbour), bend edges (control point in
chain order), move handles — one undo entry per gesture, Esc cancels.
Shift-click deletes with the undo toast. Esc ladder: drag → pen →
selection → exit; mode also exits on crowd deselect, guide switch,
Preview.

Node/Edge scopes join the one-inspector (network > crowd > waypoint >
route; chip in crowd green: 'Editing · Node · entry'). Edge card shows
weight as computed junction traffic shares, never a bare number.
SwarmEngine's edge geometry cache went public — rendering and
hit-testing use exactly the curve dots travel. network-guide layer
draws any selected graph-guided crowd (edit mode only; the eye hides
dots, not scaffolding); network-edit-overlay draws pen/hover/selection
affordances, ids validated so stale targets draw nothing. Restores
re-bind mode + selection by id. .btn[hidden] now actually hides
(display rule was defeating the attribute).

301/301 tests (28 new); live-verified end-to-end at 1680×1000 with real
events — see decision-log 'Phase 4 fourth slice'.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	index.html
M	src/app/crowds.js
A	src/app/network.js
M	src/app/undoRedo.js
M	src/config/constants.js
M	src/controllers/SectionController.js
M	src/controllers/UIController.js
M	src/handlers/InteractionHandler.js
M	src/main.js
A	src/services/NetworkEditService.js
M	src/services/RenderingService.js
M	src/services/SwarmEngine.js
M	styles/main.css
M	tests/mixins.test.js
A	tests/networkEdit.test.js
M	tests/vectorLayers.test.js
commit ab93d4c0633d51d1b298dccde7bcae48457502b5
Author: djDAOjones
Author date: 2026-08-18T17:06:30+01:00
Commit date: 2026-08-18T17:06:30+01:00
Parents: 67b33a7a971710fe691690d0b7ecb78f259197cd
Subject: chore: deploy v3.1.605

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/styles/main.css
M	docs/styles/tokens.css
M	version.json
commit 67b33a7a971710fe691690d0b7ecb78f259197cd
Author: djDAOjones
Author date: 2026-08-18T17:06:29+01:00
Commit date: 2026-08-18T17:06:29+01:00
Parents: 7eb1d805cea7985d6e2524667e93bc4509c2420f
Subject: docs(pm): Phase 4 third slice close-out — layers strip + Crowd scope

Decision-log entry, backlog tick, file-map (crowds mixin), wish-list
(crowd later-tier extras).

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/wish-list.md
commit 7eb1d805cea7985d6e2524667e93bc4509c2420f
Author: djDAOjones
Author date: 2026-08-18T17:06:29+01:00
Commit date: 2026-08-18T17:06:29+01:00
Parents: 10ccd57a880591cf9104eb4fad1b5aa3dae4ad9d
Subject: feat(ui): layers strip + Crowd scope — dots flowing in two clicks (Phase 4)

Layers strip above the waypoint list: Route row + one row per crowd
(swatch, name, visibility eye, delete with undo toast, double-click
rename), and "+ Add crowd" gated on a route existing. One click adds
a route-guided crowd with one sky-blue dot stream and selects it;
click two is play.

Crowd scope joins the one-inspector: Guide (Follow route; Custom
network disabled until network editing) · Dots (colour/size/wobble) ·
Release (count, window %) · Motion (speed, variance, lifecycle).
Chip: "Editing · Crowd 1 · crowd" with green tint; crowds sit outside
the waypoint step cycle. Selection exclusivity flows through ordinary
events; SectionController's scope switch is three-way. Scene undo/
autosave reused; restores re-resolve the selected crowd by id.

New src/app/crowds.js mixin + 15 tests (274 total).

Fix: the waypoint:deselect bus handler threw this.selectWaypoint-is-
not-a-function since the Phase 1 mixin split (EventBus swallowed it) —
Escape now clears waypoint selection through the canonical pipeline.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	index.html
A	src/app/crowds.js
M	src/app/persistence.js
M	src/app/undoRedo.js
M	src/app/wiringControllers.js
M	src/controllers/SectionController.js
M	src/controllers/UIController.js
M	src/main.js
M	styles/main.css
M	styles/tokens.css
A	tests/crowds.test.js
M	tests/mixins.test.js
commit 10ccd57a880591cf9104eb4fad1b5aa3dae4ad9d
Author: djDAOjones
Author date: 2026-08-18T16:39:23+01:00
Commit date: 2026-08-18T16:39:23+01:00
Parents: 47837c7e08519b059b6563c99eb07e0e216ce5b6
Subject: chore: deploy v3.1.604

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/styles/main.css
M	version.json
commit 47837c7e08519b059b6563c99eb07e0e216ce5b6
Author: djDAOjones
Author date: 2026-08-18T16:39:23+01:00
Commit date: 2026-08-18T16:39:23+01:00
Parents: 4d23c59343071fa7d0c5398a41fb66a00ee43d0f
Subject: docs(pm): Phase 4 second slice close-out — canvas affordances

Decision-log entry, backlog tick, file-map (segmentHitTest util), and
three pre-existing quirks wish-listed (dead history:undo emits, stale
scope chip after undo restore, area handle hit-test at zoom > 1).

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/wish-list.md
commit 4d23c59343071fa7d0c5398a41fb66a00ee43d0f
Author: djDAOjones
Author date: 2026-08-18T16:39:17+01:00
Commit date: 2026-08-18T16:39:17+01:00
Parents: f926aa2fec92e7a1cbce4feb481e212e15595986
Subject: feat(ui): canvas affordances — hover ring, leg hit-testing, midpoint + insert (Phase 4)

Hover: rAF-throttled idle hit-testing (area handle > waypoint > leg +
> leg, same cascade as clicks); two-tone hover ring on waypoints and
area handles; glow underlay along the hovered leg; pointer cursor with
modifier cursors keeping priority. Edit mode only.

Legs: a click that misses waypoints now hit-tests the path before
falling through to add-waypoint. Leg body click selects the owning
waypoint (the one whose Leg card names the segment) and expands +
flashes that card. The midpoint "+" handle inserts a minor at exactly
owner+1 on the path midpoint — one undo entry, selection follows.
Modifier gestures unchanged.

New pure util src/utils/segmentHitTest.js + 16 tests (259 total).

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	src/app/pointer.js
M	src/app/wiringControllers.js
M	src/config/constants.js
M	src/controllers/SectionController.js
M	src/handlers/InteractionHandler.js
M	src/main.js
M	src/services/RenderingService.js
A	src/utils/segmentHitTest.js
M	styles/main.css
A	tests/segmentHitTest.test.js
M	tests/vectorLayers.test.js
commit f926aa2fec92e7a1cbce4feb481e212e15595986
Author: djDAOjones
Author date: 2026-08-18T15:41:50+01:00
Commit date: 2026-08-18T15:41:50+01:00
Parents: e22c370a72fcfbfa9c012960cf0ffd2e6882b073
Subject: chore: deploy v3.1.603


Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	docs/styles/main.css
M	docs/styles/tokens.css
M	version.json
commit e22c370a72fcfbfa9c012960cf0ffd2e6882b073
Author: djDAOjones
Author date: 2026-08-18T15:41:49+01:00
Commit date: 2026-08-18T15:41:49+01:00
Parents: ceab7c3d4be29f2b558ad40539fc4eedc2ed2d3e
Subject: docs(pm): Phase 4 first slice close-out — scope-split inspector

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
commit ceab7c3d4be29f2b558ad40539fc4eedc2ed2d3e
Author: djDAOjones
Author date: 2026-08-18T15:41:43+01:00
Commit date: 2026-08-18T15:41:43+01:00
Parents: 95ec5547ed444cda93cf2fe8a83432beb6111222
Subject: feat(ui): scope-split inspector — one inspector, explicit scopes (Phase 4)

The sidebar is now an inspector for the current selection. A scope chip
names the subject (Editing · Waypoint 2 'Library' · major / Editing ·
Route) with prev/next stepping through Route → Waypoint 1 → … → last.
Waypoint scope: Marker · On arrival (beacon + wait + camera zoom) ·
Label · Leg → next waypoint · Area. Route scope (replaces the
settings-disabled ghost state, reachable with zero waypoints): Head ·
Pacing · Reveal · Path emphasis · Background · Video settings. The
right sidebar keeps only the Waypoints list. Markup + wiring only —
no model changes; all control ids preserved.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	index.html
M	src/controllers/SectionController.js
M	src/controllers/UIController.js
M	styles/main.css
M	styles/tokens.css
commit 95ec5547ed444cda93cf2fe8a83432beb6111222
Author: djDAOjones
Author date: 2026-08-18T14:57:05+01:00
Commit date: 2026-08-18T14:57:05+01:00
Parents: 1c8e33eac4ab23de083df6f7d7ed042aa753d298
Subject: fix(timing): count preview tail time only in comet mode

Root cause of the review's 8.6s vs 7.7s duration discrepancy: tail time
(trail fade + 500ms handle) was added for any scene with pathTrail > 0
in preview, but the trail only renders in comet ('instantaneous') path
visibility. The duration readout therefore changed between edit and
preview with byte-identical data. Gated on comet: non-comet scenes now
read identically in both modes (verified live, 7080 == 7080ms); comet
keeps its genuine preview extension for the fade. The deployed v3.1.600
bundle already carried this change — this commit aligns the source.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	src/app/pathTiming.js
commit 1c8e33eac4ab23de083df6f7d7ed042aa753d298
Author: djDAOjones
Author date: 2026-08-18T14:56:46+01:00
Commit date: 2026-08-18T14:56:46+01:00
Parents: 2bfbeeeefc8fbe0e81fe2f3e03df76ef6093c614
Subject: chore: deploy v3.1.600


Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
A	docs/styles/context-menu.css
M	version.json
commit 2bfbeeeefc8fbe0e81fe2f3e03df76ef6093c614
Author: djDAOjones
Author date: 2026-08-18T14:56:39+01:00
Commit date: 2026-08-18T14:56:39+01:00
Parents: 2187d4d85cb5647823ec9c250bcad981058bc93b
Subject: docs(pm): close out Phase 3.5 — decision log, backlog, trajectory, file map, wish list

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	pm_skills/project/wish-list.md
commit 2187d4d85cb5647823ec9c250bcad981058bc93b
Author: djDAOjones
Author date: 2026-08-18T14:47:01+01:00
Commit date: 2026-08-18T14:47:01+01:00
Parents: 441d43b53a1c3f5c135158dbb09247d45289825b
Subject: chore(ui): remove dead wiring — label colour controls, camera zoom-mode UI, segmentTension, stale section key

Review 2026-08-18 paper cuts, all zero-behaviour-change removals:
- label colour/bg/opacity listeners + editor sync targeted controls that
  don't exist in index.html (model + rendering stay — wish-listed for
  the Phase 4 Label card)
- camera zoom-mode hidden select + handlers for a toggle that was never
  in the DOM (camera.zoomMode stays in model + CameraService; old saves
  with 'immediate' still play; wish-listed for the On-arrival card)
- segmentTension was serialised and copied since v2 but no control ever
  existed and PathCalculator never read it — retired from the model;
  old saves carrying it load unchanged
- stale 'general' key in SectionController defaults (no such section)

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	index.html
M	src/app/camera.js
M	src/app/editorPanel.js
M	src/app/pathTiming.js
M	src/app/wiringDom.js
M	src/controllers/SectionController.js
M	src/main.js
M	src/models/Waypoint.js
commit 441d43b53a1c3f5c135158dbb09247d45289825b
Author: djDAOjones
Author date: 2026-08-18T14:43:23+01:00
Commit date: 2026-08-18T14:43:23+01:00
Parents: f24c74014b87b2b5ab4fc0ee8bffea7f2bf879d9
Subject: fix(interaction): shift-delete undo toast; selects excluded from shortcuts

Shift+click delete stays instant with a toast advertising Cmd/Ctrl+Z
(decided over a confirm dialog, owner 2026-08-18) via a new generic
ui:toast event into the existing showToast. Both global keydown
handlers (app + InteractionHandler) now skip focused <select> elements
and contenteditable — arrows/T/a were changing dropdown values AND
firing shortcuts simultaneously.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	src/app/playback.js
M	src/app/wiringControllers.js
M	src/handlers/InteractionHandler.js
commit f24c74014b87b2b5ab4fc0ee8bffea7f2bf879d9
Author: djDAOjones
Author date: 2026-08-18T14:41:58+01:00
Commit date: 2026-08-18T14:41:58+01:00
Parents: a4f2707387501d1ccc62199bed3b57d1b73f5713
Subject: feat(canvas): right-click context menu for waypoints and canvas

InteractionHandler emitted waypoint:/canvas:show-context-menu with no
listener since v2 — right-click suppressed the native menu and did
nothing. New ContextMenu component (Carbon menu anatomy in project
code, UoN tokens, 44px targets, arrow-key/Home/End/Escape navigation,
aria-disabled reasons, focus restore). Waypoint menu: rename (majors),
convert major↔minor, insert before/after, delete. Canvas menu: add
major/minor at the click point, bounds-checked like click-to-add.

Rides on three previously missing pieces implemented here:
- waypoint:toggle-type had no handler (the T key was dead); converts
  type with duration recalc, guarding the last remaining major
- waypoint:insert-adjacent inserts a copied major at the midpoint
  toward the neighbour (or extends past an endpoint)
- waypoint:request-rename bridges into the list's inline rename

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	build.js
M	index.html
M	src/app/wiringControllers.js
A	src/components/ContextMenu.js
A	styles/context-menu.css
commit a4f2707387501d1ccc62199bed3b57d1b73f5713
Author: djDAOjones
Author date: 2026-08-18T14:39:31+01:00
Commit date: 2026-08-18T14:39:31+01:00
Parents: d81006c796097cb2cfa484f49619eb613de01e4a
Subject: refactor(list): dedupe inline rename, option roles, undoable renames

startRenameFor(waypoint) replaces the two verbatim copies of the rename
logic (F2 closure + double-click inline block, review 2026-08-18); both
paths now defer one frame and re-find the row, which also fixes F2
renaming a detached row after the selection rebuild. Waypoint rows get
role=option (the container is role=listbox and aria-selected was
sitting on plain buttons); li wrappers are presentational. Renames now
take a debounced undo snapshot.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	src/app/wiringControllers.js
M	src/controllers/UIController.js
commit d81006c796097cb2cfa484f49619eb613de01e4a
Author: djDAOjones
Author date: 2026-08-18T14:32:34+01:00
Commit date: 2026-08-18T14:32:34+01:00
Parents: b464439c6d49fa4746d855cceec960894af1eff7
Subject: fix(pathhead): resolve the three-way head mismatch — route-global only

Decided global (owner 2026-08-18, decision-log): UI and renderer were
already global; the model's per-waypoint pathHead* fields were dead
weight that was serialised, copied on waypoint creation, and — worst —
read first by the editor sync, so selecting any waypoint reset the head
controls to defaults while the canvas kept rendering the real global
values. Fields stripped from constructor/toJSON/copyProps (old saves
carrying them load unchanged — the constructor ignores unknown keys);
editor sync reads the global; the duplicate pathhead:* event pair
(UIController emit → wiringControllers handler, a second mutation +
synchronous render per input) is removed — the DOM layer owns head
wiring.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	src/app/editorPanel.js
M	src/app/wiringControllers.js
M	src/controllers/UIController.js
M	src/models/Waypoint.js
commit b464439c6d49fa4746d855cceec960894af1eff7
Author: djDAOjones
Author date: 2026-08-18T14:30:07+01:00
Commit date: 2026-08-18T14:30:07+01:00
Parents: edaa4e1e81a75c53963fb94c26bcd984a51ab03e
Subject: fix(editor): single-writer controls — bulk-only UIController listeners

The waypoint editor controls were wired twice: the app's DOM wiring
(single-selection: mutation, unit conversion, readouts) and UIController
duplicates whose single-mode emissions were inert — every input event
double-fired render + undo-debounce + autosave, and the thickness
readout showed the raw slider integer (333) because the duplicate
clobbered the formatted value (review 2026-08-18).

UIController listeners are now bulk-mode only (_emitBulkWaypointChange).
Real defects fixed alongside:
- bulk 'apply to all' on thickness wrote the raw 0-1000 slider integer
  into every major's segmentWidth — the log-scale conversion now lives
  in shared src/utils/pathWidthScale.js (tested), used by both layers
- bulk changes now save an undo snapshot + refresh the sidebar list;
  the modal's 'cannot be undone' copy corrected to advertise undo
- labelPosition had no single-selection wiring at all (the select did
  nothing) — wired in the app DOM layer like its label siblings

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	index.html
M	src/app/editorPanel.js
M	src/app/wiringControllers.js
M	src/app/wiringDom.js
M	src/controllers/UIController.js
A	src/utils/pathWidthScale.js
M	tests/mixins.test.js
commit edaa4e1e81a75c53963fb94c26bcd984a51ab03e
Author: djDAOjones
Author date: 2026-08-18T14:23:18+01:00
Commit date: 2026-08-18T14:23:18+01:00
Parents: 7f3185039a3d948429a68699a2d51919fe1c7e72
Subject: fix(waypoints): carry trailing minors with their major on reorder

Reordering majors rebuilt the array with minors frozen at their original
indices, silently reattaching them to different legs (data bug, review
2026-08-18). Majors now move as blocks with their trailing minors, via
the exported pure reorderWaypointBlocks() with regression tests. Also
fixes two latent defects in the same handler: the index-derived
_majorWaypointsCache was never invalidated after reorder, and reorder
took no undo snapshot.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	src/app/wiringControllers.js
M	tests/mixins.test.js
commit 7f3185039a3d948429a68699a2d51919fe1c7e72
Author: djDAOjones
Author date: 2026-08-18T14:19:54+01:00
Commit date: 2026-08-18T14:19:54+01:00
Parents: 67d3e083220983515abe68550fb3089f7de59474
Subject: docs(pm): resolve Phase 3.5 kickoff sub-decisions (sequencing, path head, shift-delete, Crowd)

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
commit 67d3e083220983515abe68550fb3089f7de59474
Author: djDAOjones
Author date: 2026-08-18T12:24:08+01:00
Commit date: 2026-08-18T12:24:08+01:00
Parents: def083f583086812629aeefbcba8fa07de91d929
Subject: docs(pm): fold 2026-08-18 authoring-UI review into backlog + decision log

Phase 3.5 paper-cut list (incl. minor-detach data bug), Phase 4 rewritten
to the adopted one-inspector/explicit-scopes direction, post-Phase-4
review items added to next milestone. Review artifact linked in the
decision-log entry.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
commit def083f583086812629aeefbcba8fa07de91d929
Author: djDAOjones
Author date: 2026-08-18T11:01:39+01:00
Commit date: 2026-08-18T11:01:39+01:00
Parents: 9d45a07165827e281e9eefbc1d1b27b948b7baea
Subject: feat(swarm): Phase 3 — deterministic SwarmEngine + batched DotRenderer

Dots are now a pure function of timeline time: SwarmEngine.evaluate
(timelineMs, layer, context) recomputes every dot per call via
hash(seed, dotIndex, hopIndex) — onset windows with variance/ramp,
weighted graph walks (one-way/two-way, anti-ping-pong, dead end = exit),
four lifecycle modes (disappear/respawn/loop/collect), route guide,
distance-driven wobble. Per-edge PathCalculator instances cached by
geometry signature. DotRenderer batches one canvas path per
(colour, size) group; new flow-layers VECTOR_LAYERS entry draws
beneath the hero route. 234/234 tests (30 new); live-verified at
v3.1.591 (pixel-delta layer toggle, byte-identical scrub-return,
owner autosave restored byte-for-byte).

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	src/main.js
A	src/services/DotRenderer.js
M	src/services/RenderingService.js
A	src/services/SwarmEngine.js
M	src/services/index.js
A	tests/swarmEngine.test.js
M	tests/vectorLayers.test.js
M	version.json
commit 9d45a07165827e281e9eefbc1d1b27b948b7baea
Author: djDAOjones
Author date: 2026-08-18T10:37:21+01:00
Commit date: 2026-08-18T10:37:21+01:00
Parents: 02ae134d02fb1764281dbe9ada068e1b9670f3a0
Subject: feat(models): Phase 2 scene model — flow layers persist at coordVersion 9

Scene → FlowLayer (guide graph or hero route + Emitters) as pure data
models; per-emitter seeds; normalised release windows on the master
timeline; full founding swarm vocabulary. Saves gain an additive scene
block at coordVersion 9 (8 skipped); pre-v9 projects load unchanged.
Scene wired into clearAll and undo snapshots. 204/204 tests.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	pm_skills/project/architecture.md
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	src/app/persistence.js
M	src/app/undoRedo.js
M	src/main.js
A	src/models/Emitter.js
A	src/models/FlowLayer.js
A	src/models/Scene.js
M	src/models/index.js
A	tests/Emitter.test.js
A	tests/FlowLayer.test.js
A	tests/Scene.test.js
A	tests/scenePersistence.test.js
M	version.json
commit 02ae134d02fb1764281dbe9ada068e1b9670f3a0
Author: djDAOjones
Author date: 2026-08-17T23:17:28+01:00
Commit date: 2026-08-17T23:17:28+01:00
Parents: 5a8cac229b9205d662760221b24cf5b728f6c885
Subject: refactor(core): PlayerCore teardown — scene is a pure function of timeline time

Phase 1 complete. New src/core/PlayerCore.js owns all timeline math as
pure functions: segment building, pause budgets (grow/ripple/pulse
minimums), per-beacon clock schedules, and the timeline<->path mappings.
AnimationEngine keeps its public surface and serialised marker shapes
but delegates every mapping; its remaining jobs are transport state and
wait-event edge-detection. Play advances time, scrub sets it, export
steps it - one evaluation path.

All five beacon animators are closed-form: sync(localSec, win, options)
derives full visual state from a timeline-local clock. Delta-time
accumulation, pause-sync memory hacks, and the grow-beacon runtime
pause extension (mid-evaluation marker mutation) are deleted - one
early-onset formula feeds both the pause budget and the beacon
schedule, so grow always completes inside its precomputed pause.
Reverse playback and backward scrubbing now render beacons exactly
(rings un-fade, completed beacons revive). The interim export
fixed-frame-delta patch is removed as planned.

Golden-frame harness (tests/goldenFrames.test.js): jittered sequential
playback, reverse traversal, and fixed-step export stepping each equal
direct seeks in full scene state; evaluation provably never mutates the
timeline. tests/playerCore.test.js pins builders, budgets, windows,
and inverses. 158/158 tests; verified live incl. a fully-throttled
105-frame MP4 export with zero console errors.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	README.md
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	pm_skills/project/architecture.md
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
M	src/app/exporting.js
M	src/app/playback.js
A	src/core/PlayerCore.js
M	src/main.js
M	src/services/AnimationEngine.js
M	src/services/BeaconRenderer.js
M	src/services/RenderingService.js
D	tests/exportFrameDelta.test.js
A	tests/goldenFrames.test.js
A	tests/playerCore.test.js
M	version.json
commit 5a8cac229b9205d662760221b24cf5b728f6c885
Author: djDAOjones
Author date: 2026-08-17T22:04:43+01:00
Commit date: 2026-08-17T22:04:43+01:00
Parents: 466c4a630e4ce743ab9c2c6c26453b1112e55bed
Subject: fix(export): pin beacon time to encoded-frame delta during video export

Owner report: exports encoded with slowed/weird animation unless the
browser stayed active. The frame stepper was already deterministic
(seekToProgress + explicit WebCodecs timestamps), but renderBeacons()
advanced beacon animators by wall-clock time between renders - in a
background tab the export loop's setTimeout yields stretch to ~1s, so
beacon phases advanced ~25x per encoded frame and grow-beacon pause
extension distorted the timing map mid-export.

RenderingService.setFixedFrameDelta(1/fps) now pins beacon advancement
to encoded-frame time for the duration of the export (cleared in the
finally; unpinning re-arms wall-clock tracking). The AnimationEngine
update callback skips rendering while _isExportMode so the export loop
is the only time-advancing renderer.

Interim until the PlayerCore teardown makes beacon phases closed-form;
removal noted on that backlog item.

Verified in the throttled embedded browser (the failing environment):
75-frame MP4 completed with all 76 beacon updates at exactly 0.100s.
Tests: exportFrameDelta.test.js (145 total).

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/trajectory.md
M	src/app/exporting.js
M	src/app/playback.js
M	src/services/RenderingService.js
A	tests/exportFrameDelta.test.js
M	version.json
commit 466c4a630e4ce743ab9c2c6c26453b1112e55bed
Author: djDAOjones
Author date: 2026-08-17T21:38:14+01:00
Commit date: 2026-08-17T21:38:14+01:00
Parents: f00e2e3616acf09c5dbdb632bafade94ceb81668
Subject: docs(pm): close out Phase 1 items 1-2 in project memory

Backlog trimmed to the remaining PlayerCore item; decision-log entry
for the mixin split + VECTOR_LAYERS registry (incl. deviations and the
rAF-throttle finding); trajectory + file-map + architecture reflect
src/app/* and the registry; README tree gains app/ and the unwired
graph models; dev-guide drift captured in doc-deltas.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	README.md
M	pm_skills/project/architecture.md
M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
M	pm_skills/project/doc-deltas.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
commit f00e2e3616acf09c5dbdb632bafade94ceb81668
Author: djDAOjones
Author date: 2026-08-17T21:35:18+01:00
Commit date: 2026-08-17T21:35:18+01:00
Parents: 6837084ccf29da72fd7069b85688d261fc47a7df
Subject: refactor(rendering): drive vector draw order from VECTOR_LAYERS registry

renderVectorLayerTo()'s hard-coded sequence (area highlights, path,
path head, beacons, waypoints, edit handles, draw preview) becomes a
static RenderingService.VECTOR_LAYERS list, bottom to top. Each entry
guards its own visibility; shared per-frame derivations (applyMotion,
hasPath, shouldRenderPath) ride a frame object. Phase 2 flow layers
insert beneath the hero route by adding an entry instead of editing
the render body.

Tests pin the canonical order and the dispatch guards (142 total).
Verified in-browser in both edit and preview modes, console clean.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/meta.json
M	src/services/RenderingService.js
A	tests/vectorLayers.test.js
M	version.json
commit 6837084ccf29da72fd7069b85688d261fc47a7df
Author: djDAOjones
Author date: 2026-08-17T21:25:15+01:00
Commit date: 2026-08-17T21:25:15+01:00
Parents: c7b94291edd415715f827dfd2f5dee08fa4c52a5
Subject: refactor(app): split main.js into prototype mixins (Phase 1)

main.js 6235 -> 1122 lines. Twelve method groups moved verbatim to
src/app/* and attached via Object.assign(RoutePlotter.prototype, ...):
wiringDom, wiringBus, wiringControllers, undoRedo, playback, camera,
viewport, pathTiming, persistence, exporting, editorPanel, pointer.
The class keeps only the app core (state, init, model bookkeeping,
render scheduling, image loading).

Deliberate deviations from verbatim: static JKL_MAX_SPEED became a
module const in playback.js (statics cannot ride prototype mixins);
snapToAngle moved to src/utils/snapToAngle.js (shared by two wiring
mixins); unused import specifiers dropped per file.

Verified: build + 138/138 tests (new: mixin collision guard,
snapToAngle unit tests), ESLint no-undef sweep clean, and an
interactive in-browser pass (waypoint add/drag, play/scrub, JKL,
undo/redo, zoom, autosave reload) with zero console errors.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
A	src/app/camera.js
A	src/app/editorPanel.js
A	src/app/exporting.js
A	src/app/pathTiming.js
A	src/app/persistence.js
A	src/app/playback.js
A	src/app/pointer.js
A	src/app/undoRedo.js
A	src/app/viewport.js
A	src/app/wiringBus.js
A	src/app/wiringControllers.js
A	src/app/wiringDom.js
M	src/main.js
A	src/utils/snapToAngle.js
A	tests/mixins.test.js
M	version.json
commit c7b94291edd415715f827dfd2f5dee08fa4c52a5
Author: djDAOjones
Author date: 2026-08-17T20:34:41+01:00
Commit date: 2026-08-17T20:34:41+01:00
Parents: e4743ebe1a5c728a1733b2b670bc0ff3797f85b0
Subject: Close out Phase 0

Backlog and trajectory mark Phase 0 complete (2026-08-17). Next: Phase 1
enabling refactor — main.js split, renderer layer registry, PlayerCore +
deterministic animation-core teardown (see backlog Phase 1).

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/trajectory.md
commit e4743ebe1a5c728a1733b2b670bc0ff3797f85b0
Author: djDAOjones
Author date: 2026-08-17T20:21:58+01:00
Commit date: 2026-08-17T20:21:58+01:00
Parents: de6ee4ea56cfb2f832fb90242cb32e1858f815ba
Subject: Reconcile project memory with v3 reality

brief: v3 layered-scene scope, flow layers, students added to audience,
deterministic-timeline constraint, two-bundled-deps policy, repo/Pages
status. architecture: workers/ phantom removed (with pointer to the v2
decision), specs/ added, graph models listed, v3 direction section,
dependency policy updated. file-map: Graph* model rows + specs/ section.
trajectory: v3 founding + salvage chunk. backlog: Phase 0 items closed.

Phase 0 of the v3 refactor is complete except branch housekeeping.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	pm_skills/project/architecture.md
M	pm_skills/project/backlog.md
M	pm_skills/project/brief.md
M	pm_skills/project/file-map.md
M	pm_skills/project/trajectory.md
commit de6ee4ea56cfb2f832fb90242cb32e1858f815ba
Author: djDAOjones
Author date: 2026-08-17T20:19:52+01:00
Commit date: 2026-08-17T20:19:52+01:00
Parents: e07afbdc407a60f94d02527f1185631b6e24a9a5
Subject: Bundle JSZip; drop runtime CDN dependency

jszip 3.10.1 pinned as a real dependency and bundled by esbuild;
ImageAssetService's _loadJSZip() CDN script-injection removed.
Project save/load now works offline. Bundle 494.6 -> 590.8 KB.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	README.md
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
M	package-lock.json
M	package.json
M	pm_skills/project/backlog.md
M	src/services/ImageAssetService.js
M	version.json
commit e07afbdc407a60f94d02527f1185631b6e24a9a5
Author: djDAOjones
Author date: 2026-08-17T19:56:04+01:00
Commit date: 2026-08-17T19:56:04+01:00
Parents: 8eaad8472d012f42193aecffd037d215a0133704
Subject: Salvage dot-crowd fork: land GraphModel + 25 tests, archive fork material

The pre-archive gate on the fork's OneDrive working copy surfaced a
never-pushed working graph editor and Phase 2 swarm core (2026-05-03),
partially destroyed by OneDrive file-offloading. Recovered via git +
Windsurf local history; final state pushed to dot-crowd-navigator
(see its SALVAGE-NOTE.md), then both old repos archived.

Carried into v3:
- src/models/GraphModel.js + tests/GraphModel.test.js (25 tests) —
  unwired until Phase 2, same treatment as GraphNode/GraphEdge
- specs/dot-crowd-navigator/: fork project memory, SwarmEngine +
  SimulationState test suites (behavioural spec only — tick() API is
  superseded by the deterministic evaluate(timelineMs) mandate),
  recovered graph-editor source for Phase 4 pattern mining
- decision-log: salvage entry; coordVersion for layered scene set to 9
  (fork locally shipped a different graph-only 8)

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	pm_skills/project/backlog.md
M	pm_skills/project/decision-log.md
A	specs/dot-crowd-navigator/README.md
A	specs/dot-crowd-navigator/project-memory/architecture.md
A	specs/dot-crowd-navigator/project-memory/backlog.md
A	specs/dot-crowd-navigator/project-memory/brief.md
A	specs/dot-crowd-navigator/project-memory/conventions.md
A	specs/dot-crowd-navigator/project-memory/decision-log.md
A	specs/dot-crowd-navigator/project-memory/file-map.md
A	specs/dot-crowd-navigator/recovered-src/GraphInteractionHandler.js
A	specs/dot-crowd-navigator/recovered-src/GraphRenderer.js
A	specs/dot-crowd-navigator/recovered-src/index.html
A	specs/dot-crowd-navigator/recovered-src/main.js
A	specs/dot-crowd-navigator/tests-salvage/SimulationState.test.js
A	specs/dot-crowd-navigator/tests-salvage/SwarmEngine.test.js
A	src/models/GraphModel.js
A	tests/GraphModel.test.js
commit 8eaad8472d012f42193aecffd037d215a0133704
Author: djDAOjones
Author date: 2026-08-17T18:55:46+01:00
Commit date: 2026-08-17T18:55:46+01:00
Parents: 96e194ec2fc59581e101f644056de075895e9493
Subject: Fix fresh-clone build: track lockfile, raise esbuild target to es2022

npm installs resolved esbuild ^0.27.0 to 0.27.7, which refuses the
legacy chrome58/firefox57/safari11 targets (200+ 'transforming
destructuring' errors) — fresh clones could not build at all; it only
worked on machines with an older esbuild already in node_modules.
package-lock.json was gitignored, so nothing pinned the resolution.

- .gitignore: stop ignoring package-lock.json / yarn.lock; lockfile committed
- build.js: target es2022 (also re-legalises import.meta workers, whose
  miscompilation under chrome58 killed the old worker layer)
- README/DEV-INFRASTRUCTURE: drop phantom Web Worker references, point
  repo links at route-plotter, mark the live demo as the v2 line
- backlog: v3.0 refactor phases added as current milestone
- docs/: rebuilt at v3.1.575; verified build green + 106/106 tests

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

M	.gitignore
M	DEV-INFRASTRUCTURE.md
M	README.md
M	build.js
M	docs/app.js
M	docs/app.js.map
M	docs/index.html
M	docs/meta.json
A	package-lock.json
M	version.json
commit 96e194ec2fc59581e101f644056de075895e9493
Author: djDAOjones
Author date: 2026-08-17T18:55:46+01:00
Commit date: 2026-08-17T18:55:46+01:00
Parents: 599407f4b5b4b62e304bb47a807295761ee6b588
Subject: Cherry-pick dot-crowd-navigator: GraphNode/GraphEdge models + tests; archive fork spec

The only net-new code the fork produced: two dependency-free model
classes (normalised 0-1 coords, byte-compatible with Waypoint's
convention) and their 37 unit tests. Deliberately left out of the
models barrel until Phase 2 wires them into the FlowLayer model.

The fork's AGENTS.md (swarm vocabulary, subsystem contracts, event
taxonomy) and app overview are archived under specs/dot-crowd-navigator/
with provenance headers as the feature spec for Phases 2-4.

Also renames the stale 'Windsurf Map Router' workspace file.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

R100	Windsurf Map Router.code-workspace	Route Plotter v3.code-workspace
A	specs/dot-crowd-navigator/AGENTS-spec.md
A	specs/dot-crowd-navigator/app-overview.md
A	src/models/GraphEdge.js
A	src/models/GraphNode.js
A	tests/GraphEdge.test.js
A	tests/GraphNode.test.js
commit 599407f4b5b4b62e304bb47a807295761ee6b588
Author: djDAOjones
Author date: 2026-08-17T18:55:20+01:00
Commit date: 2026-08-17T18:55:20+01:00
Parents: 3509790b68b50fc31e666dc41521f589a5d8c533
Subject: Install PM-Skills 4.7.0 (fresh, manifest-verified); port v2 project memory

Fresh install via the framework's packager (47 files) replacing the
embedded v2.3.0 copy, which was two major epochs behind. The populated
v2 project memory (brief, architecture, backlog, conventions,
decision-log, trajectory, file-map, wish-list) is ported forward
verbatim; 4.7.0's new doc-deltas.md template retained.

Adds the v3 founding entry to the decision log: fresh-repo decision,
dot-crowd fold-in with layered-scene coexistence (supersedes the fork's
'no linear routes' invariant), and the deterministic-timeline mandate
(scene = pure fn(timelineMs, projectState, seed)) motivated by v2
scrub-vs-play mismatches.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

A	pm_skills/CHANGELOG-1x.md
A	pm_skills/CHANGELOG-2x.md
A	pm_skills/CHANGELOG-3x.md
A	pm_skills/CHANGELOG.md
A	pm_skills/GUIDE.md
A	pm_skills/MANIFEST.md
A	pm_skills/VERSION
A	pm_skills/init.md
A	pm_skills/integrations/adopt.md
A	pm_skills/integrations/bugfix.md
A	pm_skills/integrations/dispatch.md
A	pm_skills/integrations/init-mvp.md
A	pm_skills/integrations/next.md
A	pm_skills/integrations/task.md
A	pm_skills/memory-policy.md
A	pm_skills/project/architecture.md
A	pm_skills/project/backlog.md
A	pm_skills/project/brief.md
A	pm_skills/project/conventions.md
A	pm_skills/project/decision-log.md
A	pm_skills/project/doc-deltas.md
A	pm_skills/project/file-map.md
A	pm_skills/project/trajectory.md
A	pm_skills/project/wish-list.md
A	pm_skills/prompts/backlog-authoring.md
A	pm_skills/prompts/bug-scoping.md
A	pm_skills/prompts/deploy.md
A	pm_skills/prompts/design-options.md
A	pm_skills/prompts/end-of-task.md
A	pm_skills/prompts/implementation-plan.md
A	pm_skills/prompts/memory-maintenance.md
A	pm_skills/prompts/quick-task.md
A	pm_skills/prompts/release.md
A	pm_skills/prompts/review.md
A	pm_skills/prompts/scoping.md
A	pm_skills/prompts/session-start.md
A	pm_skills/prompts/upgrade.md
A	pm_skills/prompts/validation.md
A	pm_skills/scaffold/.editorconfig
A	pm_skills/scaffold/.gitignore
A	pm_skills/scaffold/.markdownlint.json
A	pm_skills/scaffold/check-links.mjs
A	pm_skills/scaffold/gen-file-map.mjs
A	pm_skills/templates/AGENTS.md
A	pm_skills/templates/DEV-INFRASTRUCTURE.md
A	pm_skills/templates/PROCESS.md
A	pm_skills/templates/UI-STANDARDS.md
commit 3509790b68b50fc31e666dc41521f589a5d8c533
Author: djDAOjones
Author date: 2026-08-17T18:49:24+01:00
Commit date: 2026-08-17T18:49:24+01:00
Parents: 
Subject: Import router-plotter-02 @ v3.1 build 573 (commit 5b19787) as fresh v3 history

Route Plotter v3 starts here: a fresh-history continuation of
https://github.com/djDAOjones/router-plotter-02 at its final v2-line
state (v3.1.x, build 573, 2026-06-18). The old repo remains as the
frozen v2 line; dot-crowd-navigator's swarm spec and graph models
follow in separate commits.

pm_skills/ (v2.3.0) intentionally not imported — PM-Skills 4.7.0 is
installed fresh in the next commit, with the v2 project memory ported.

Co-Authored-By: Claude Fable 5 <redacted-email>

Changed files:

A	.codeiumignore
A	.devin/workflows/bugfix.md
A	.devin/workflows/feature.md
A	.editorconfig
A	.gitignore
A	AGENTS.md
A	DEV-INFRASTRUCTURE.md
A	README.md
A	UI-STANDARDS.md
A	Windsurf Map Router.code-workspace
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
A	_Joe/design docs/saved/WAVE Report of Route Plotter v3.1.506.html
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
A	_Joe/dev notes/needs consolidating and deleting/Future Features.md
A	_Joe/dev notes/needs consolidating and deleting/Unit Tests.md
A	_Joe/dev notes/needs consolidating and deleting/dev guide.md
A	_Joe/dev notes/needs consolidating and deleting/example feature.md
A	_Joe/dev notes/opus chat on re-architecting event bus.md
A	_Joe/dev notes/task list.md
A	_Joe/useful prompt fragments.txt
A	build.js
A	docs/UoN_map 24-bit.png
A	docs/UoN_map.png
A	docs/app.js
A	docs/app.js.map
A	docs/images/Court.png
A	docs/images/Courts.jpg
A	docs/images/Garlic.jpg
A	docs/images/Nervous_System.jpg
A	docs/images/PARM_Aerial.jpg
A	docs/images/Rocketry.jpg
A	docs/images/UoN_map.png
A	docs/images/route-project-2026-03-28 (2).zip
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
A	scripts/README.md
A	scripts/build.sh
A	scripts/restart.sh
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
A	styles/dropdown.css
A	styles/main.css
A	styles/swatch-picker.css
A	styles/tokens.css
A	styles/tooltip.css
A	tests/example.test.js
A	tests/setup.js
A	tests/units.test.js
A	version.json
A	vitest.config.js
