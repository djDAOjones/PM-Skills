<!-- field-report: project=route-plotter · date=2026-08-27 · type=export
     · pm-skills=4.7.0
     · source=git log from the maintainer's checkout, harvested by Claude Code -->

# Git log export — route-plotter

Full history to HEAD `f1c14b9`, newest first, with commit
bodies and changed-file lists. The bodies carry the project's
`Verify:` lines, so this doubles as a record of which quality
gate ran at each task close, and the subjects show how far the
`<ITEM-ID>: <summary>` commit grammar was actually followed.

State at harvest: HEAD `f1c14b9`, 85 commits, 0 path(s)
differing from HEAD.

Redaction. Absolute checkout paths have been collapsed to
`<checkout>`, and any other path under the maintainer's home
directory to `<home>`; that is the only alteration, and the content
is otherwise byte-verbatim. A scan of this set found no e-mail
addresses, credentials, or account identifiers.

```text
f1c14b9 2026-08-27 djDAOjones
docs(pm): record owner calls — prune quality bar, merge held
Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

pm_skills/project/decision-log.md
ea3e27a 2026-08-27 djDAOjones
docs(pm): memory prune — Aug 17–26 log + closed trajectory epochs archived; DEPS-01 added
Diagnose-approved prune (owner sign-off in session): 36 decision-log
entries (2026-08-17→26) and the v2-era + v3.0-milestone trajectory
epochs moved verbatim to archive/ (diff-verified lossless); ticked
doc-deltas line swept; stale docs/player.js.map file-map row dropped.
Owner calls recorded: stay on PM-Skills 4.7.0; dependency upgrades
deferred into DEPS-01.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

pm_skills/project/archive/INDEX.md
pm_skills/project/archive/decision-log-2026-08-17-to-2026-08-26.md
pm_skills/project/archive/trajectory/trajectory-0001-2026-04-16-to-2026-06-17.md
pm_skills/project/archive/trajectory/trajectory-0002-2026-08-17-to-2026-08-19.md
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/doc-deltas.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
9276e4f 2026-08-27 djDAOjones
REV-05a: add axe-core as a standing accessibility gate; clear quarantine
axe-core added as a dev dependency on owner approval — runtime dependencies remain jszip and mediabunny, and nothing of axe reaches the published bundle. tests/axeAudit.test.js now runs it over the app shell across WCAG 2.0/2.1/2.2 A/AA/AAA and best practice. 48 rules, zero violations, verified twice in production Chromium (empty shell and with the Open day route loaded) with colour contrast genuinely evaluated; the jsdom gate disables contrast because jsdom cannot paint and a pass there would be a false green.

Four incompletes triaged, none a defect: axe independently confirms A11Y-01 and is stricter than the original finding (role=button is invalid on a label, not merely questionable), the dropdown aria-controls targets exist but are display:none, and the fork mark is a decorative aria-hidden glyph.

Quarantine cleared on owner verdicts: QUAR-01 and QUAR-04 cut; QUAR-02 promoted as REVEAL-01 after investigating that a fading spotlight reveal is genuinely not possible today (the mask repaints every passed point at full opacity each frame); QUAR-03 promoted as LABEL-01 for auto-position timing and discoverability. Licence notice and the governance dependency ledger updated for axe-core.

Verify: 67 files / 1006 tests · restart safety pass · non-mutating check build · Pages build v3.2.679, 20-file inventory

---

THIRD_PARTY_NOTICES.md
docs/app.js
docs/index.html
docs/meta.json
package-lock.json
package.json
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
tests/axeAudit.test.js
tests/governance.test.js
version.json
ad2d049 2026-08-27 djDAOjones
PM: evict the shipped ROUTE-01 and COMPOSE-01 detail tickets
A ticket file is working detail for one open item and is deleted when that item ships (memory-policy). Both items are in trajectory and the decision log; REV-03.md stays, its item is still open.

---

pm_skills/project/file-map.md
pm_skills/project/tickets/COMPOSE-01.md
pm_skills/project/tickets/ROUTE-01.md
24e650c 2026-08-27 djDAOjones
REV-05: run the accessibility audit and fix two AAA failures
Structural audit (names, ids, heading order, landmarks, lang, alt text, live region), AAA contrast measured on every visible text node against its effective background, target size on every rendered control, and reflow at 320 CSS px — the WCAG 1.4.10 equivalent of 400% zoom — all green in production Chromium.

Two failures found and fixed: the Edit/Preview label measured 6.37:1 because --text-03 is 7:1 on white but sits here on --ui-02 (now --text-02, 19.17:1), and the skip link was 37px tall (now a full 44px target). The structural half is kept as a regression test that asserts only what static analysis can settle.

Two findings ticketed rather than folded into an assurance pass: A11Y-01, ParamTooltip gives ~80 hint labels role=button and a 44px obligation they do not meet; A11Y-02, only the row affordances declare forced-colors fallbacks. Not claimed: axe-core (a new dev dependency is an approval, not an assumption), forced-colours and reduced-motion emulation (needs devtools media overrides), NVDA/VoiceOver (owner-run).

Verify: 66 files / 1003 tests · restart safety pass · non-mutating check build · Pages build v3.2.677, 20-file inventory

---

docs/app.js
docs/index.html
docs/meta.json
docs/styles/main.css
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
styles/main.css
tests/accessibilityAudit.test.js
version.json
a9795fe 2026-08-27 djDAOjones
DEMO-01: ship three example projects as downloadable saves
A plain labelled route, a branching campus route with a crowd traced from it and released at the head's arrival, and a weighted signal network with two dot streams. Each ships as a real .zip project save people can download and re-use, and opens from the File menu through the ordinary loadProject path — no special case anywhere.

Generated rather than committed as source: the repo holds the example definitions plus the already-bundled backgrounds, and the build pairs them. Byte-reproducible (fixed entry timestamps, pinned authoring date) so a rebuild that changed no example produces no diff. Built from the live models, so they cannot rot into an invalid shape — exampleProjects.test.js rehydrates each through the app's own timing path and asserts it resolves, times deterministically and leaves no broken crowd binding.

Publication boundary honoured, not bypassed: the build's ban on project ZIPs was a ban on publishing archives nobody had reviewed. public-assets.json now names the three approved archives and the approved background each contains; the build refuses any ZIP not in that record, .gitignore excepts exactly those three paths, and publicationBoundary.test.js asserts the shipped set equals the approved set.

Verify: 65 files / 991 tests · restart safety pass · non-mutating check build · production Chromium (Open day route opened from the File menu with its background, 1 branch, 0 structural problems, 4 crowd nodes bound and none broken, one join wait, 11.65s timeline, zero console entries) · Pages build v3.2.675, 20-file inventory

---

.gitignore
build.js
docs/app.js
docs/app.js.map
docs/examples/nervous-system-flow.zip
docs/examples/parm-aerial-walk.zip
docs/examples/uon-open-day.zip
docs/index.html
docs/meta.json
index.html
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
public-assets.json
scripts/build-examples.mjs
src/app/persistence.js
src/app/wiringDom.js
src/examples/index.js
tests/exampleProjects.test.js
tests/publicationBoundary.test.js
version.json
fe35771 2026-08-27 djDAOjones
COMPOSE-04: offer a branch handle where a crowd enters the route
A waypoint a bound entry node sits on carries a "+" handle beside its marker; clicking it emits route:branch-arm, the same event Alt+click emits, so there is one branch path rather than a second mechanism. Entry nodes only, and a broken binding offers nothing. The leg-midpoint "+" and this one now draw through one routine.

The handle is its own hit target, checked ahead of the waypoint because it sits clear of the marker and so outside its hit radius. The click path hit-tests it directly rather than trusting the hover state: gating on hover left it dead on touch and pen, where a tap never hovers first — exactly the devices REV-03 unified this transaction for.

DEV-01: restart.sh matches LISTEN sockets only. It was refusing to boot on a browser's stale CLOSED client sockets to the server it had just stopped — reporting a foreign port holder where nothing was listening at all.

Verify: 64 files / 963 tests · restart safety pass · non-mutating check build · production Chromium (handle armed the fork with no hover beforehand; the place click created Waypoint 1-B1 alongside the existing 2-B1, correctly lettered per fork, no structural problems, zero console entries) · Pages build v3.2.672, 17-file inventory

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
scripts/restart.sh
src/app/pointer.js
src/app/wiringControllers.js
src/handlers/InteractionHandler.js
src/main.js
src/services/RenderingService.js
src/utils/routeAnchors.js
tests/branchHandle.test.js
version.json
d2f6caa 2026-08-27 djDAOjones
COMPOSE-02: solve and bake the wait that outlasts a crowd
"Wait here for this crowd" computes the wait a waypoint needs so the head is still there when the last dot arrives, and writes it as an ordinary authored pauseTime. Solved in closed form rather than differenced: adding a wait lengthens the timeline and every onset is a fraction of it, so "last arrival minus arrival" undershoots. Per dot, P >= (f*D + J - A) / (1 - f), taking the largest — exact in one pass and idempotent, so a refit never creeps.

Unsatisfiable cases report a reason instead of a wrong number: a dot released at the very end moves out by whatever the route is lengthened, and a looping crowd has no arrival at all. The onset arithmetic was extracted from SwarmEngine into crowdArrival.js and the engine now imports it, with every swarm fixture byte-for-byte identical through the extraction.

Verify: 63 files / 945 tests · restart safety pass · non-mutating check build · production Chromium (a crowd finishing at ~25s against a 7.3s route solved to a 48215ms wait, after which the head leaves at 53984ms and the last dot arrives at 53983ms; zero console entries) · Pages build v3.2.670, 17-file inventory

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
index.html
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/app/crowds.js
src/app/network.js
src/services/SwarmEngine.js
src/utils/crowdArrival.js
tests/crowdArrival.test.js
version.json
c042a78 2026-08-27 djDAOjones
COMPOSE-03: trace the route into a crowd guide network
A node per major waypoint, an edge per leg carrying that leg's minors as control points so the guide curve is the route's own curve, and branches traced as edges leaving the fork and returning to the rejoin. Entries and exits are derived from the traced topology, so a branched route yields several exits. Edges are one-way: a guide traced from a route inherits its direction of travel.

The result is a copy the author reshapes freely — nothing done to it reaches back into the route — while each node keeps its COMPOSE-01 binding, so moving a waypoint carries its traced node instead of stranding the copy. A route too short to trace, or one whose branch structure is unresolved, is refused with a reason rather than half-built.

Verify: 62 files / 923 tests · restart safety pass · non-mutating check build · production Chromium on the branched route (4 bound nodes, entry and exit derived correctly, 4 one-way edges including fork-to-branch and branch-to-rejoin, trunk leg carrying its 2 minors as control points, zero console entries) · Pages build v3.2.668, 17-file inventory

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
index.html
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/app/crowds.js
src/app/network.js
src/utils/routeTrace.js
tests/routeTrace.test.js
version.json
a1ec48f 2026-08-27 djDAOjones
COMPOSE-01: bind crowds to route moments
GraphNode.anchorWaypointId binds a node's evaluated position to a waypoint; Emitter.releaseAnchor binds a release window's start to arrival, pause-end or route-end. Both resolve at evaluation time from live route state, default to null and are omitted from toJSON when null. Ownership is strictly one-way: nothing here moves a waypoint, and route timing never becomes a function of crowd arrival.

Authored intent survives binding — a node keeps its own x/y and only a derived position() follows the waypoint, so a deleted waypoint returns the node to where it was authored, keeps the binding, and reports the break once per change. Only a bound emitter's window start moves, leaving every existing unanchored swarm hash byte-for-byte identical.

Verify: 61 files / 906 tests · restart safety pass · non-mutating check build · production Chromium (node bound to its waypoint's exact position with authored coords intact, emitter released at 2993ms = arrival + wait with nothing before, broken binding falling back and reported, zero console entries) · Pages build v3.2.666, 17-file inventory

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/app/network.js
src/app/pathTiming.js
src/main.js
src/models/Emitter.js
src/models/GraphNode.js
src/player/PlayerApp.js
src/services/NetworkEditService.js
src/services/RenderingService.js
src/services/SwarmEngine.js
src/utils/routeAnchors.js
tests/routeAnchors.test.js
version.json
823329a 2026-08-27 djDAOjones
ROUTE-01d: carry branches through export
PlayerApp already takes pathTimingMixin wholesale, so it builds the same splines and composes the same master timeline; this carries branchPaths and branchTimeline into its render state and proves nothing is lost in between. A terminal branch that outlives the trunk now extends the timeline instead of being cut off at the trunk's end, while a branch that fits inside it changes nothing. The composed-timeline cache is keyed on base speed as well as geometry.

Verify: 60 files / 878 tests · restart safety pass · non-mutating check build · live Chromium (composed total and engine duration agree at 7269ms; the coordVersion-9 snapshot carries branch links on exactly the one branch waypoint and adds no key to the other five; the inlined player.js bundle contains the branch composition and render code; zero console entries). Opening an exported file end-to-end stays REV-04's owner-run evidence. · Pages build v3.2.664, 17-file inventory

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/app/pathTiming.js
src/player/PlayerApp.js
tests/branchExportParity.test.js
tests/playerApp.test.js
version.json
80f0692 2026-08-27 djDAOjones
ROUTE-01c: author branches by fork gesture and drag-to-rejoin
Alt+click a waypoint arms a branch and the next canvas click places it, inserted after the fork's own leg block so the array still reads in route order; Alt+click on empty canvas still force-adds a major. Dragging a branch's last waypoint onto another waypoint rejoins it there, and onto the current target clears it — the point is restored, not moved. Branch rows are indented and tagged, numbered fork·letter·position (2·B1) by the shared routing that the scope chip and the semantic outline now also read, and the fork wears a badge on its own marker.

Two bugs the live pass found: findWaypointAt hit-tested the waypoint being dragged (it sits on the target at drop time), and both handlers snapshotted undo before mutating when this project's stack holds post-action states.

Verify: 59 files / 869 tests · restart safety pass · non-mutating check build · production Chromium (fork armed and placed, rejoin with a 1203ms join wait and the point restored, same drag toggling back to terminal, undo restoring the rejoin, reload round-trip, zero console entries) · Pages build v3.2.663, 17-file inventory

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
docs/styles/main.css
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/app/pointer.js
src/app/wiringBus.js
src/app/wiringControllers.js
src/controllers/UIController.js
src/handlers/InteractionHandler.js
src/utils/routeBranches.js
src/utils/sceneSemantics.js
src/utils/waypointNaming.js
styles/main.css
tests/branchAuthoring.test.js
version.json
8711cea 2026-08-27 djDAOjones
ROUTE-01b: draw and animate hero-route branches
Each branch gets its own spline, anchored at its fork and rejoin so it meets the trunk at both ends, plus its own head. Timing stays derived: AnimationEngine keeps the one authoritative transport, branchTiming builds each run's leg, and a branch resolves its position from master timeline time through the same PlayerCore.timelineToPath mapping the trunk uses — so an interleaved pause holds a branch head still by the same arithmetic. Two additive vector layers (branch-paths under the trunk, branch-heads above it) reuse renderPath/renderPathHead via an engine facade differing only in getPathProgress.

Trunk timing now reads the trunk run rather than the whole array, via a module helper because PlayerApp borrows only part of the mixin. The follow-camera keeps tracking the trunk head; per-fork camera choice is left to ROUTE-01c's sign-off. Linear routes never enter the branch pass.

Verify: 58 files / 832 tests · restart safety pass · non-mutating check build · production Chromium on a branched route (both splines start at the fork, two heads advance simultaneously, shorter branch completes and holds, zero console entries) · Pages build v3.2.661, 17-file inventory

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
pm_skills/project/wish-list.md
src/app/pathTiming.js
src/main.js
src/services/RenderingService.js
src/utils/branchTiming.js
src/utils/routeBranches.js
tests/branchTiming.test.js
tests/vectorLayers.test.js
version.json
ba46cf7 2026-08-27 djDAOjones
ROUTE-01a: add the branch model and master-timeline composition
A hero-route branch is a contiguous run of waypoints sharing a branchId in the one ordered array, with branchFrom on its first waypoint and branchRejoin on its last. All three default to null and are omitted from toJSON(), so an unsplit project's save stays byte-identical. resolveRouteBranches validates fork/rejoin links and reports structural problems without repairing them; PlayerCore.composeBranchTimeline resolves leg starts by relaxation over fork dependencies, giving simultaneous fork start, latest-arrival rejoin recorded once per join, universal completion, and order-independent, terminating output on a cyclic structure.

Headless slice: no rendering, authoring or export change. ROUTE-01 is now ROUTE-01a/b/c/d.

Verify: 57 files / 808 tests · restart safety pass · non-mutating check build · Pages build v3.2.659, 17-file inventory

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/core/PlayerCore.js
src/models/Waypoint.js
src/utils/routeBranches.js
tests/routeBranches.test.js
version.json
5e03962 2026-08-27 djDAOjones
UI-02: show minor waypoints in the route list
The sidebar list renders the whole route: minors are indented, selectable, renameable rows under the leg they shape, numbered major.minor by a shared routine the semantic outline now also uses (the outline's route-position numbering collided with the list's major numbering). A minor is reorder-visible, not reorder-able — it has no drag or arrow controls, and a major drags as its whole leg block so minors visibly travel where reorderWaypointBlocks will put them; the waypoints:reordered payload stays majors-only.

UI-02a: inline rename detaches its blur listener before replacing the input. Chrome dispatches the blur from inside that replaceWith, and the re-entrant pass threw NotFoundError on every successful Enter-committed rename.

Verify: 56 files / 773 tests · restart safety pass · non-mutating check build · production Chromium (selection, rename, block reorder, autosave round-trip, 44px rows, zero console entries) · Pages build v3.2.658, 17-file inventory

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/styles/main.css
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
pm_skills/project/wish-list.md
src/controllers/UIController.js
src/utils/sceneSemantics.js
src/utils/waypointNaming.js
styles/main.css
tests/sceneOutline.test.js
tests/waypointList.test.js
tests/waypointNaming.test.js
version.json
87740a7 2026-08-27 djDAOjones
DOC-01: unify the Codex/Claude agent contract
AGENTS.md becomes the single shared standing contract with tiered read policy; a minimal root CLAUDE.md imports it. Removes the obsolete inline budget table (budgets live only in pm_skills/memory-policy.md) and the stale prompt paths that no longer exist (roadmap-refactor.md, prune-memory.md, next-batch.md, doctor-memory.md, corrections.md).

Verify: docs only, no source change; baseline npm run check green (745 tests, restart safety, non-mutating check build).

---

.gitignore
AGENTS.md
CLAUDE.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
9211bc3 2026-08-26 djDAOjones
docs(review): add durable remediation handover

---

README.md
pm_skills/project/file-map.md
reviews/README.md
reviews/read-only-comprehensive-repository-review-prompt.md
reviews/route-plotter-review-finding-crosswalk-2026-08-26.md
reviews/route-plotter-review-headlines-for-novices-2026-08-26.md
reviews/route-plotter-review-remediation-continuation-prompt-2026-08-26.md
reviews/route-plotter-v3-comprehensive-repository-review-2026-08-26.md
c9a953c 2026-08-26 djDAOjones
PM: refactor roadmap after HEAD-01

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/tickets/COMPOSE-01.md
673e627 2026-08-26 djDAOjones
HEAD-01: ship built-in drone head preset

---

build.js
docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
index.html
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/app/editorPanel.js
src/app/persistence.js
src/app/projectReset.js
src/app/undoRedo.js
src/app/wiringDom.js
src/assets/README.md
src/assets/drone-head.png
src/main.js
src/player/PlayerApp.js
src/services/RenderingService.js
src/utils/pathHeadPresets.js
tests/pathHeadPresets.test.js
tests/playerApp.test.js
tests/projectReset.test.js
version.json
8f1167f 2026-08-26 djDAOjones
MAINT-01: remove verified dead helpers
Delete only the pre-verified superseded timing, visibility and inert export paths, including their orphaned cache state, without widening the sweep.

Verify: 53 test files · 739 tests · restart safety 0 · build 0

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/trajectory.md
src/app/exporting.js
src/app/pathTiming.js
src/app/persistence.js
src/player/PlayerApp.js
src/services/AnimationEngine.js
src/services/MotionVisibilityService.js
src/services/PathCalculator.js
tests/playerApp.test.js
tests/reviewTimeline.test.js
tests/units.test.js
version.json
a6f7b54 2026-08-26 djDAOjones
SCALE-01: add project-reference sizing
Persist one visual reference so editor, HTML and video outputs preserve authored map-bound proportions without coupling appearance to timeline or normalised geometry.

Verify: 53 test files · 739 tests · restart safety 0 · build 0 · Chromium production pass

---

UI-STANDARDS.md
docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
index.html
pm_skills/project/architecture.md
pm_skills/project/backlog.md
pm_skills/project/brief.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/tickets/SCALE-01.md
pm_skills/project/trajectory.md
src/app/editorPanel.js
src/app/persistence.js
src/app/projectReset.js
src/app/viewport.js
src/app/wiringDom.js
src/config/constants.js
src/config/tooltips.js
src/controllers/UIController.js
src/main.js
src/player/PlayerApp.js
src/services/AreaHighlightRenderer.js
src/services/RenderingService.js
src/utils/renderReference.js
src/utils/uiReadouts.js
tests/multiSelect.test.js
tests/playerApp.test.js
tests/projectReset.test.js
tests/renderReference.test.js
tests/reviewAccessibility.test.js
tests/reviewPersistence.test.js
tests/scenePersistence.test.js
tests/vectorLayers.test.js
version.json
285a0cd 2026-08-26 djDAOjones
PM: mark SCALE-01 ready after REV-06

---

pm_skills/project/tickets/SCALE-01.md
97c18ae 2026-08-26 djDAOjones
REV-06: sleep stable paused render loops
Make preview scheduling demand-driven, keep camera settling alive only while visible work remains, and keep export seeks inside the synchronous export loop. Profiling shows 500-dot 4K drawing is already below a millisecond, so direct-render changes stay out of scope.

Verify: 52 files · 729 tests · restart safety · build 0 · production Chromium v3.2.651

---

AGENTS.md
README.md
docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
pm_skills/project/architecture.md
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/app/playback.js
src/player/PlayerApp.js
src/services/AnimationEngine.js
src/services/CameraService.js
tests/performanceScheduling.test.js
version.json
ef791a3 2026-08-26 djDAOjones
CROWD-02: add whole-route busyness envelope

---

AGENTS.md
docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
docs/styles/main.css
index.html
pm_skills/project/architecture.md
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/tickets/CROWD-02.md
pm_skills/project/trajectory.md
src/app/crowds.js
src/controllers/SceneOutlineController.js
src/models/Emitter.js
src/services/SwarmEngine.js
src/utils/busynessEnvelope.js
src/utils/sceneSemantics.js
styles/main.css
tests/Emitter.test.js
tests/busynessEnvelope.test.js
tests/crowds.test.js
tests/playerApp.test.js
tests/reviewAccessibility.test.js
tests/scenePersistence.test.js
tests/swarmEngine.test.js
version.json
60cc4b4 2026-08-26 djDAOjones
CROWD-03: expose seeded crowd variation
Add plain-language walking, pace, release timing and release bias controls, an exact pattern seed, and a seed-only Re-roll action with one-step Undo.

Verify: 50 test files / 708 tests; restart safety passed; build check passed; production Chromium passed at 320 px.

---

UI-STANDARDS.md
docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
docs/styles/main.css
index.html
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/tickets/CROWD-03.md
pm_skills/project/trajectory.md
src/app/crowds.js
src/app/sceneOutline.js
src/controllers/SceneOutlineController.js
src/models/Emitter.js
styles/main.css
tests/Emitter.test.js
tests/crowds.test.js
tests/reviewAccessibility.test.js
tests/scenePersistence.test.js
tests/swarmEngine.test.js
version.json
ec59de1 2026-08-26 djDAOjones
UI-05: add waypoint card actions
Reset selected card settings to route style and apply a single waypoint's settings onward through one accessible, undoable transaction.

Verify: 50 test files / 701 tests; restart safety passed; build check passed; production Chromium passed at 320 px.

---

UI-STANDARDS.md
docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/styles/main.css
index.html
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/app/editorPanel.js
src/app/undoRedo.js
src/app/wiringBus.js
src/app/wiringDom.js
src/controllers/SectionController.js
src/utils/waypointCardActions.js
styles/main.css
tests/multiSelect.test.js
tests/reviewAccessibility.test.js
tests/waypointCardActions.test.js
tests/wiringBus.test.js
version.json
2a359b0 2026-08-26 djDAOjones
UI-04: show honest mixed waypoint values
Compare each inspector control against its real write targets and keep mixed presentation transient.

Verify: 685 tests; restart safety passed; build check passed

---

UI-STANDARDS.md
docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
docs/styles/main.css
docs/styles/swatch-picker.css
index.html
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/app/camera.js
src/app/editorPanel.js
src/app/wiringControllers.js
src/app/wiringDom.js
src/components/SwatchPicker.js
src/controllers/UIController.js
src/utils/mixedControlState.js
styles/main.css
styles/swatch-picker.css
tests/mixedControlState.test.js
tests/multiSelect.test.js
tests/swatchPicker.test.js
tests/units.test.js
version.json
8b986d0 2026-08-26 djDAOjones
UI-03: expose label appearance and zoom transitions
Surface existing per-waypoint controls under More and keep exact custom-colour state honest.

Verify: 678 tests · restart safety 0 · build 0

---

UI-STANDARDS.md
docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
docs/styles/swatch-picker.css
index.html
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/app/camera.js
src/app/editorPanel.js
src/app/undoRedo.js
src/app/wiringControllers.js
src/app/wiringDom.js
src/components/SwatchPicker.js
src/main.js
styles/swatch-picker.css
tests/reviewAccessibility.test.js
tests/swatchPicker.test.js
tests/units.test.js
version.json
d3b4cf6 2026-08-26 djDAOjones
UX-02: make inspector units honest

---

UI-STANDARDS.md
docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
index.html
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/app/editorPanel.js
src/app/persistence.js
src/app/undoRedo.js
src/app/wiringControllers.js
src/app/wiringDom.js
src/config/constants.js
src/controllers/UIController.js
src/main.js
src/models/Waypoint.js
src/services/RenderingService.js
src/utils/uiReadouts.js
tests/reviewAccessibility.test.js
version.json
bd2148d 2026-08-26 djDAOjones
UI-01: add two-tier inspector cards
Keep each common card task visible and place refinements in one native, keyboard-stable More disclosure; refactor the roadmap around the unlocked UI and crowd work.

Verify: 47 test files · 671 tests · restart safety 0 · build 0 · Chromium production pass

---

UI-STANDARDS.md
docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/styles/main.css
index.html
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/controllers/SectionController.js
styles/main.css
tests/reviewAccessibility.test.js
version.json
bbc1c3f 2026-08-26 djDAOjones
REV-03: unify canvas pointer transactions
Use one restoring Pointer Events state machine for waypoint, area and network gestures; retain physical iOS and Android evidence as the closure gate.

Verify: 47 test files · 669 tests · restart safety 0 · build 0 · Chromium production pass

---

AGENTS.md
README.md
docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/styles/main.css
pm_skills/project/architecture.md
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/tickets/REV-03.md
src/app/editorPanel.js
src/app/network.js
src/app/persistence.js
src/app/projectReset.js
src/app/undoRedo.js
src/app/wiringBus.js
src/app/wiringControllers.js
src/handlers/InteractionHandler.js
src/main.js
src/services/AreaEditService.js
src/services/NetworkEditService.js
styles/main.css
tests/areaEdit.test.js
tests/interactionPointer.test.js
tests/networkEdit.test.js
tests/wiringBus.test.js
version.json
31cbfd3 2026-08-26 djDAOjones
REV-02: add semantic scene authoring

---

AGENTS.md
README.md
docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
docs/styles/main.css
index.html
pm_skills/project/architecture.md
pm_skills/project/backlog.md
pm_skills/project/brief.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/tickets/REV-02.md
pm_skills/project/tickets/ROUTE-01.md
pm_skills/project/trajectory.md
src/app/crowds.js
src/app/network.js
src/app/persistence.js
src/app/sceneOutline.js
src/app/undoRedo.js
src/app/wiringControllers.js
src/app/wiringDom.js
src/controllers/SceneOutlineController.js
src/controllers/SectionController.js
src/controllers/UIController.js
src/main.js
src/models/FlowLayer.js
src/player/playerAccessibility.js
src/player/playerEntry.js
src/services/AreaDrawingService.js
src/services/AreaEditService.js
src/services/HTMLExportService.js
src/services/NetworkEditService.js
src/utils/entityId.js
src/utils/sceneSemantics.js
styles/main.css
tests/areaEdit.test.js
tests/crowds.test.js
tests/htmlExportCache.test.js
tests/mixins.test.js
tests/multiSelect.test.js
tests/networkEdit.test.js
tests/playerAccessibility.test.js
tests/playerEntryAccessibility.test.js
tests/reviewPersistence.test.js
tests/sceneOutline.test.js
tests/sceneOutlineApp.test.js
version.json
b3c20ea 2026-08-26 djDAOjones
SUPPORT-01: add privacy-safe bug reporting

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/styles/main.css
index.html
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/app/privacy.js
styles/main.css
tests/privacy.test.js
tests/reviewAccessibility.test.js
version.json
c1b73d8 2026-08-26 djDAOjones
PHASE-1: close health and asset-boundary tranche

---

.gitignore
README.md
build.js
docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
docs/styles/main.css
examples/route-project-2026-01-10.zip
images/route-project-2026-03-28 (2).zip
index.html
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/tickets/CROWD-01.md
pm_skills/project/tickets/REV-08.md
pm_skills/project/tickets/REV-09.md
pm_skills/project/tickets/REV-10.md
pm_skills/project/trajectory.md
public-assets.json
src/app/backgroundLoading.js
src/app/crowds.js
src/app/exporting.js
src/app/network.js
src/app/persistence.js
src/app/privacy.js
src/app/projectReset.js
src/app/undoRedo.js
src/app/wiringBus.js
src/app/wiringControllers.js
src/app/wiringDom.js
src/main.js
src/models/Emitter.js
src/services/DiagnosticsService.js
src/services/HTMLExportService.js
src/services/ImageAssetService.js
src/services/NetworkEditService.js
src/services/SwarmEngine.js
src/services/UndoService.js
src/services/VideoExporter.js
src/utils/assetReferences.js
src/utils/graphRouting.js
src/utils/safeColor.js
styles/main.css
tests/assetAdmission.test.js
tests/assetPruning.test.js
tests/crowds.test.js
tests/diagnostics.test.js
tests/graphRouting.test.js
tests/htmlExportCache.test.js
tests/imageAssetRoundTrip.test.js
tests/mixins.test.js
tests/networkEdit.test.js
tests/privacy.test.js
tests/projectReset.test.js
tests/publicationBoundary.test.js
tests/reviewAccessibility.test.js
tests/reviewPersistence.test.js
tests/safeColor.test.js
tests/swarmEngine.test.js
tests/undoService.test.js
tests/videoExporter.test.js
tests/wiringBus.test.js
version.json
591e1d6 2026-08-26 djDAOjones
PHASE-1: repair live editing and governance

---

.github/SECURITY.md
.github/SUPPORT.md
LICENSE
README.md
THIRD_PARTY_NOTICES.md
index.html
package.json
src/app/playback.js
src/app/undoRedo.js
src/app/wiringControllers.js
src/config/keybindings.js
src/controllers/UIController.js
src/handlers/InteractionHandler.js
src/services/AreaEditService.js
styles/main.css
tests/areaEdit.test.js
tests/governance.test.js
tests/multiSelect.test.js
tests/reviewAccessibility.test.js
cf3b20e 2026-08-26 djDAOjones
PHASE-0: sign off foundation decisions
Convert accepted owner decisions into explicit implementation contracts and dependency-placed roadmap work.

Verify: 410 tests · restart safety 0 · build 0

---

pm_skills/project/backlog.md
pm_skills/project/brief.md
pm_skills/project/decision-log.md
pm_skills/project/tickets/REV-02.md
pm_skills/project/tickets/REV-08.md
pm_skills/project/tickets/REV-09.md
pm_skills/project/tickets/ROUTE-01.md
pm_skills/project/tickets/SCALE-01.md
pm_skills/project/trajectory.md
7b7aef5 2026-08-26 djDAOjones
ROADMAP: prioritise live health and crowd delivery
Refactor the queue into dependency phases, promote confirmed user-value gaps, expose owner decisions, retire superseded work and add scoped tickets for crowd, scaling, assets and composition.

Verify: tests 410 · restart contract 0 · build 0 · memory integrity 0

---

pm_skills/project/backlog.md
pm_skills/project/brief.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/tickets/COMPOSE-01.md
pm_skills/project/tickets/CROWD-01.md
pm_skills/project/tickets/CROWD-02.md
pm_skills/project/tickets/CROWD-03.md
pm_skills/project/tickets/REV-02.md
pm_skills/project/tickets/REV-08.md
pm_skills/project/tickets/REV-09.md
pm_skills/project/tickets/REV-10.md
pm_skills/project/tickets/ROUTE-01.md
pm_skills/project/tickets/SCALE-01.md
pm_skills/project/wish-list.md
2bc9fff 2026-08-26 djDAOjones
chore: deploy v3.2.619
Generate the clean GitHub Pages /docs artifact from the reviewed source and remove stale files outside the deployment allowlist.

Verify: build 0 · cache references 0 · staged set docs/version only

---

docs/UoN_map 24-bit.png
docs/UoN_map.png
docs/app.js
docs/app.js.map
docs/images/Courts.jpg
docs/images/route-project-2026-03-28 (2).zip
docs/index.html
docs/meta.json
docs/player.js
docs/styles/main.css
docs/styles/tokens.css
version.json
a813328 2026-08-26 djDAOjones
REV-01: remediate repository review blockers
Make recovery, imports, async images, timeline playback, responsive UI, release builds, deployment and restart ownership fail safely; retain product-scale and governance questions as explicit roadmap work.

Verify: tests 410 · restart contract 0 · build 0 · browser QA 0

---

.github/workflows/ci.yml
.gitignore
.nvmrc
AGENTS.md
DEV-INFRASTRUCTURE.md
README.md
build.js
index.html
package-lock.json
package.json
pm_skills/project/architecture.md
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/tickets/CROWD-02.md
pm_skills/project/tickets/REV-02.md
pm_skills/project/tickets/REV-08.md
pm_skills/project/tickets/REV-09.md
pm_skills/project/tickets/ROUTE-01.md
pm_skills/project/trajectory.md
pm_skills/project/wish-list.md
push.js
scripts/README.md
scripts/restart.sh
src/app/backgroundLoading.js
src/app/crowds.js
src/app/exporting.js
src/app/operationGeneration.js
src/app/pathTiming.js
src/app/persistence.js
src/app/playback.js
src/app/startup.js
src/app/undoRedo.js
src/app/viewport.js
src/app/wiringControllers.js
src/app/wiringDom.js
src/controllers/UIController.js
src/handlers/InteractionHandler.js
src/main.js
src/models/AnimationState.js
src/models/Emitter.js
src/models/FlowLayer.js
src/models/ImageAsset.js
src/models/Scene.js
src/models/Waypoint.js
src/player/PlayerApp.js
src/player/playerEntry.js
src/services/AnimationEngine.js
src/services/CoordinateTransform.js
src/services/HTMLExportService.js
src/services/ImageAssetService.js
src/services/MotionVisibilityService.js
src/services/RenderingService.js
src/services/StorageService.js
src/services/UndoService.js
src/utils/focusTrap.js
styles/main.css
styles/tokens.css
tests/crowds.test.js
tests/htmlExportCache.test.js
tests/imageAssetRoundTrip.test.js
tests/modelBoundary.test.js
tests/multiSelect.test.js
tests/operationGeneration.test.js
tests/projectLimits.test.js
tests/releaseSafety.test.js
tests/restartSafety.test.sh
tests/reviewAccessibility.test.js
tests/reviewPersistence.test.js
tests/reviewTimeline.test.js
tests/scenePersistence.test.js
tests/startup.test.js
tests/units.test.js
cec0191 2026-08-19 djDAOjones
docs(pm): backlog triage — next milestone resequenced into waves, quarantine created
All 27 backlog items assessed (useful / fits design / viable) with claims
re-verified in code. Waves 0-4 sequenced; 3 wish-list defects promoted;
two scaling items merged into one design ticket; 5 items quarantined
pending owner approval (nothing deleted). Full write-up:
https://claude.ai/code/artifact/22f61966-b4a3-4240-88c6-f41f6674b075

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/wish-list.md
27dd376 2026-08-19 djDAOjones
docs(pm): Phase 5 close-out — v3 live, milestone closed, log archived
README/brief/architecture/DEV-INFRASTRUCTURE point at the live v3 Pages
URL and document the dual-bundle build + real-stack HTML export. Dev
guide reconciled with owner sign-off (mixin split in §4/§7/§10, worker
removal in §9, build:deploy alias in §3) and the doc-delta ticked.
Backlog: the completed v3.0 refactor milestone evicted; trajectory gains
Phase 2/3/4(items 2-5)/5 outcome lines. Decision-log: Phase 5 entry
added; June and April 2026 entries archived by month to
pm_skills/project/archive/ with INDEX.md (owner-approved split; live log
15 entries).

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

DEV-INFRASTRUCTURE.md
README.md
_Joe/dev notes/needs consolidating and deleting/dev guide.md
pm_skills/project/architecture.md
pm_skills/project/archive/INDEX.md
pm_skills/project/archive/decision-log-2026-04.md
pm_skills/project/archive/decision-log-2026-06.md
pm_skills/project/backlog.md
pm_skills/project/brief.md
pm_skills/project/decision-log.md
pm_skills/project/doc-deltas.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
a436396 2026-08-19 djDAOjones
chore: deploy v3.2.618

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/player.js
version.json
2d813b5 2026-08-19 djDAOjones
feat(export): HTML exports run the real render stack via PlayerCore (Phase 5)
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

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

build.js
package.json
src/app/exporting.js
src/app/persistence.js
src/player/PlayerApp.js
src/player/playerEntry.js
src/services/HTMLExportService.js
tests/playerApp.test.js
tests/scenePersistence.test.js
51a73b0 2026-08-18 djDAOjones
chore: deploy v3.1.611

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
version.json
6f3bee9 2026-08-18 djDAOjones
docs(pm): Phase 4 fifth slice close-out — multi-select everywhere
Backlog ticks the last Phase 4 item; decision-log entry (36 live —
prune pass still awaiting owner's call); wish-list gains group-drag,
mixed-value indication, marquee selection, and the dead Tab
select-adjacent emit; the stale-after-undo quirk narrows to editor
control values (chip half fixed); file-map notes selectionTargets,
setSelection, and the new test file.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/wish-list.md
94523f0 2026-08-18 djDAOjones
feat(ui): multi-select honoured by every card — the bulk mode dissolves (Phase 4)
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

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

index.html
src/app/crowds.js
src/app/editorPanel.js
src/app/undoRedo.js
src/app/wiringControllers.js
src/app/wiringDom.js
src/config/tooltips.js
src/controllers/SectionController.js
src/controllers/UIController.js
src/handlers/InteractionHandler.js
src/main.js
src/services/RenderingService.js
tests/multiSelect.test.js
7989a64 2026-08-18 djDAOjones
chore: deploy v3.1.608
Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/styles/main.css
version.json
3ddbda9 2026-08-18 djDAOjones
docs(pm): Phase 4 fourth slice close-out — network edit mode
Decision-log entry (gestures, entry/exit rules, traffic-share display,
preview-mode force, verification narrative, feel-check flags); backlog
item ticked; file-map gains NetworkEditService + network mixin + test
suite; wish-list gains network extras, the route-gated Add crowd
question, the 'At route end' wording, and the ModeBanner dedupe.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/wish-list.md
342de28 2026-08-18 djDAOjones
feat(ui): network edit mode — the pen draws where crowds walk (Phase 4)
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

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

index.html
src/app/crowds.js
src/app/network.js
src/app/undoRedo.js
src/config/constants.js
src/controllers/SectionController.js
src/controllers/UIController.js
src/handlers/InteractionHandler.js
src/main.js
src/services/NetworkEditService.js
src/services/RenderingService.js
src/services/SwarmEngine.js
styles/main.css
tests/mixins.test.js
tests/networkEdit.test.js
tests/vectorLayers.test.js
ab93d4c 2026-08-18 djDAOjones
chore: deploy v3.1.605
Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/styles/main.css
docs/styles/tokens.css
version.json
67b33a7 2026-08-18 djDAOjones
docs(pm): Phase 4 third slice close-out — layers strip + Crowd scope
Decision-log entry, backlog tick, file-map (crowds mixin), wish-list
(crowd later-tier extras).

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/wish-list.md
7eb1d80 2026-08-18 djDAOjones
feat(ui): layers strip + Crowd scope — dots flowing in two clicks (Phase 4)
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

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

index.html
src/app/crowds.js
src/app/persistence.js
src/app/undoRedo.js
src/app/wiringControllers.js
src/controllers/SectionController.js
src/controllers/UIController.js
src/main.js
styles/main.css
styles/tokens.css
tests/crowds.test.js
tests/mixins.test.js
10ccd57 2026-08-18 djDAOjones
chore: deploy v3.1.604
Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/styles/main.css
version.json
47837c7 2026-08-18 djDAOjones
docs(pm): Phase 4 second slice close-out — canvas affordances
Decision-log entry, backlog tick, file-map (segmentHitTest util), and
three pre-existing quirks wish-listed (dead history:undo emits, stale
scope chip after undo restore, area handle hit-test at zoom > 1).

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/wish-list.md
4d23c59 2026-08-18 djDAOjones
feat(ui): canvas affordances — hover ring, leg hit-testing, midpoint + insert (Phase 4)
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

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

src/app/pointer.js
src/app/wiringControllers.js
src/config/constants.js
src/controllers/SectionController.js
src/handlers/InteractionHandler.js
src/main.js
src/services/RenderingService.js
src/utils/segmentHitTest.js
styles/main.css
tests/segmentHitTest.test.js
tests/vectorLayers.test.js
f926aa2 2026-08-18 djDAOjones
chore: deploy v3.1.603

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/styles/main.css
docs/styles/tokens.css
version.json
e22c370 2026-08-18 djDAOjones
docs(pm): Phase 4 first slice close-out — scope-split inspector
Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
ceab7c3 2026-08-18 djDAOjones
feat(ui): scope-split inspector — one inspector, explicit scopes (Phase 4)
The sidebar is now an inspector for the current selection. A scope chip
names the subject (Editing · Waypoint 2 'Library' · major / Editing ·
Route) with prev/next stepping through Route → Waypoint 1 → … → last.
Waypoint scope: Marker · On arrival (beacon + wait + camera zoom) ·
Label · Leg → next waypoint · Area. Route scope (replaces the
settings-disabled ghost state, reachable with zero waypoints): Head ·
Pacing · Reveal · Path emphasis · Background · Video settings. The
right sidebar keeps only the Waypoints list. Markup + wiring only —
no model changes; all control ids preserved.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

index.html
src/controllers/SectionController.js
src/controllers/UIController.js
styles/main.css
styles/tokens.css
95ec554 2026-08-18 djDAOjones
fix(timing): count preview tail time only in comet mode
Root cause of the review's 8.6s vs 7.7s duration discrepancy: tail time
(trail fade + 500ms handle) was added for any scene with pathTrail > 0
in preview, but the trail only renders in comet ('instantaneous') path
visibility. The duration readout therefore changed between edit and
preview with byte-identical data. Gated on comet: non-comet scenes now
read identically in both modes (verified live, 7080 == 7080ms); comet
keeps its genuine preview extension for the fade. The deployed v3.1.600
bundle already carried this change — this commit aligns the source.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

src/app/pathTiming.js
1c8e33e 2026-08-18 djDAOjones
chore: deploy v3.1.600

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
docs/styles/context-menu.css
version.json
2bfbeee 2026-08-18 djDAOjones
docs(pm): close out Phase 3.5 — decision log, backlog, trajectory, file map, wish list
Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
pm_skills/project/wish-list.md
2187d4d 2026-08-18 djDAOjones
chore(ui): remove dead wiring — label colour controls, camera zoom-mode UI, segmentTension, stale section key
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

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

index.html
src/app/camera.js
src/app/editorPanel.js
src/app/pathTiming.js
src/app/wiringDom.js
src/controllers/SectionController.js
src/main.js
src/models/Waypoint.js
441d43b 2026-08-18 djDAOjones
fix(interaction): shift-delete undo toast; selects excluded from shortcuts
Shift+click delete stays instant with a toast advertising Cmd/Ctrl+Z
(decided over a confirm dialog, owner 2026-08-18) via a new generic
ui:toast event into the existing showToast. Both global keydown
handlers (app + InteractionHandler) now skip focused <select> elements
and contenteditable — arrows/T/a were changing dropdown values AND
firing shortcuts simultaneously.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

src/app/playback.js
src/app/wiringControllers.js
src/handlers/InteractionHandler.js
f24c740 2026-08-18 djDAOjones
feat(canvas): right-click context menu for waypoints and canvas
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

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

build.js
index.html
src/app/wiringControllers.js
src/components/ContextMenu.js
styles/context-menu.css
a4f2707 2026-08-18 djDAOjones
refactor(list): dedupe inline rename, option roles, undoable renames
startRenameFor(waypoint) replaces the two verbatim copies of the rename
logic (F2 closure + double-click inline block, review 2026-08-18); both
paths now defer one frame and re-find the row, which also fixes F2
renaming a detached row after the selection rebuild. Waypoint rows get
role=option (the container is role=listbox and aria-selected was
sitting on plain buttons); li wrappers are presentational. Renames now
take a debounced undo snapshot.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

src/app/wiringControllers.js
src/controllers/UIController.js
d81006c 2026-08-18 djDAOjones
fix(pathhead): resolve the three-way head mismatch — route-global only
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

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

src/app/editorPanel.js
src/app/wiringControllers.js
src/controllers/UIController.js
src/models/Waypoint.js
b464439 2026-08-18 djDAOjones
fix(editor): single-writer controls — bulk-only UIController listeners
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

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

index.html
src/app/editorPanel.js
src/app/wiringControllers.js
src/app/wiringDom.js
src/controllers/UIController.js
src/utils/pathWidthScale.js
tests/mixins.test.js
edaa4e1 2026-08-18 djDAOjones
fix(waypoints): carry trailing minors with their major on reorder
Reordering majors rebuilt the array with minors frozen at their original
indices, silently reattaching them to different legs (data bug, review
2026-08-18). Majors now move as blocks with their trailing minors, via
the exported pure reorderWaypointBlocks() with regression tests. Also
fixes two latent defects in the same handler: the index-derived
_majorWaypointsCache was never invalidated after reorder, and reorder
took no undo snapshot.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

src/app/wiringControllers.js
tests/mixins.test.js
7f31850 2026-08-18 djDAOjones
docs(pm): resolve Phase 3.5 kickoff sub-decisions (sequencing, path head, shift-delete, Crowd)
Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
67d3e08 2026-08-18 djDAOjones
docs(pm): fold 2026-08-18 authoring-UI review into backlog + decision log
Phase 3.5 paper-cut list (incl. minor-detach data bug), Phase 4 rewritten
to the adopted one-inspector/explicit-scopes direction, post-Phase-4
review items added to next milestone. Review artifact linked in the
decision-log entry.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
def083f 2026-08-18 djDAOjones
feat(swarm): Phase 3 — deterministic SwarmEngine + batched DotRenderer
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

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
src/main.js
src/services/DotRenderer.js
src/services/RenderingService.js
src/services/SwarmEngine.js
src/services/index.js
tests/swarmEngine.test.js
tests/vectorLayers.test.js
version.json
9d45a07 2026-08-18 djDAOjones
feat(models): Phase 2 scene model — flow layers persist at coordVersion 9
Scene → FlowLayer (guide graph or hero route + Emitters) as pure data
models; per-emitter seeds; normalised release windows on the master
timeline; full founding swarm vocabulary. Saves gain an additive scene
block at coordVersion 9 (8 skipped); pre-v9 projects load unchanged.
Scene wired into clearAll and undo snapshots. 204/204 tests.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
pm_skills/project/architecture.md
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
src/app/persistence.js
src/app/undoRedo.js
src/main.js
src/models/Emitter.js
src/models/FlowLayer.js
src/models/Scene.js
src/models/index.js
tests/Emitter.test.js
tests/FlowLayer.test.js
tests/Scene.test.js
tests/scenePersistence.test.js
version.json
02ae134 2026-08-17 djDAOjones
refactor(core): PlayerCore teardown — scene is a pure function of timeline time
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

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

README.md
docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
pm_skills/project/architecture.md
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/app/exporting.js
src/app/playback.js
src/core/PlayerCore.js
src/main.js
src/services/AnimationEngine.js
src/services/BeaconRenderer.js
src/services/RenderingService.js
tests/exportFrameDelta.test.js
tests/goldenFrames.test.js
tests/playerCore.test.js
version.json
5a8cac2 2026-08-17 djDAOjones
fix(export): pin beacon time to encoded-frame delta during video export
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

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/trajectory.md
src/app/exporting.js
src/app/playback.js
src/services/RenderingService.js
tests/exportFrameDelta.test.js
version.json
466c4a6 2026-08-17 djDAOjones
docs(pm): close out Phase 1 items 1-2 in project memory
Backlog trimmed to the remaining PlayerCore item; decision-log entry
for the mixin split + VECTOR_LAYERS registry (incl. deviations and the
rAF-throttle finding); trajectory + file-map + architecture reflect
src/app/* and the registry; README tree gains app/ and the unwired
graph models; dev-guide drift captured in doc-deltas.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

README.md
pm_skills/project/architecture.md
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/doc-deltas.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
f00e2e3 2026-08-17 djDAOjones
refactor(rendering): drive vector draw order from VECTOR_LAYERS registry
renderVectorLayerTo()'s hard-coded sequence (area highlights, path,
path head, beacons, waypoints, edit handles, draw preview) becomes a
static RenderingService.VECTOR_LAYERS list, bottom to top. Each entry
guards its own visibility; shared per-frame derivations (applyMotion,
hasPath, shouldRenderPath) ride a frame object. Phase 2 flow layers
insert beneath the hero route by adding an entry instead of editing
the render body.

Tests pin the canonical order and the dispatch guards (142 total).
Verified in-browser in both edit and preview modes, console clean.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

docs/app.js
docs/app.js.map
docs/meta.json
src/services/RenderingService.js
tests/vectorLayers.test.js
version.json
6837084 2026-08-17 djDAOjones
refactor(app): split main.js into prototype mixins (Phase 1)
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

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
src/app/camera.js
src/app/editorPanel.js
src/app/exporting.js
src/app/pathTiming.js
src/app/persistence.js
src/app/playback.js
src/app/pointer.js
src/app/undoRedo.js
src/app/viewport.js
src/app/wiringBus.js
src/app/wiringControllers.js
src/app/wiringDom.js
src/main.js
src/utils/snapToAngle.js
tests/mixins.test.js
version.json
c7b9429 2026-08-17 djDAOjones
Close out Phase 0
Backlog and trajectory mark Phase 0 complete (2026-08-17). Next: Phase 1
enabling refactor — main.js split, renderer layer registry, PlayerCore +
deterministic animation-core teardown (see backlog Phase 1).

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/trajectory.md
e4743eb 2026-08-17 djDAOjones
Reconcile project memory with v3 reality
brief: v3 layered-scene scope, flow layers, students added to audience,
deterministic-timeline constraint, two-bundled-deps policy, repo/Pages
status. architecture: workers/ phantom removed (with pointer to the v2
decision), specs/ added, graph models listed, v3 direction section,
dependency policy updated. file-map: Graph* model rows + specs/ section.
trajectory: v3 founding + salvage chunk. backlog: Phase 0 items closed.

Phase 0 of the v3 refactor is complete except branch housekeeping.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

pm_skills/project/architecture.md
pm_skills/project/backlog.md
pm_skills/project/brief.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
de6ee4e 2026-08-17 djDAOjones
Bundle JSZip; drop runtime CDN dependency
jszip 3.10.1 pinned as a real dependency and bundled by esbuild;
ImageAssetService's _loadJSZip() CDN script-injection removed.
Project save/load now works offline. Bundle 494.6 -> 590.8 KB.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

README.md
docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
package-lock.json
package.json
pm_skills/project/backlog.md
src/services/ImageAssetService.js
version.json
e07afbd 2026-08-17 djDAOjones
Salvage dot-crowd fork: land GraphModel + 25 tests, archive fork material
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

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
specs/dot-crowd-navigator/README.md
specs/dot-crowd-navigator/project-memory/architecture.md
specs/dot-crowd-navigator/project-memory/backlog.md
specs/dot-crowd-navigator/project-memory/brief.md
specs/dot-crowd-navigator/project-memory/conventions.md
specs/dot-crowd-navigator/project-memory/decision-log.md
specs/dot-crowd-navigator/project-memory/file-map.md
specs/dot-crowd-navigator/recovered-src/GraphInteractionHandler.js
specs/dot-crowd-navigator/recovered-src/GraphRenderer.js
specs/dot-crowd-navigator/recovered-src/index.html
specs/dot-crowd-navigator/recovered-src/main.js
specs/dot-crowd-navigator/tests-salvage/SimulationState.test.js
specs/dot-crowd-navigator/tests-salvage/SwarmEngine.test.js
src/models/GraphModel.js
tests/GraphModel.test.js
8eaad84 2026-08-17 djDAOjones
Fix fresh-clone build: track lockfile, raise esbuild target to es2022
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

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

.gitignore
DEV-INFRASTRUCTURE.md
README.md
build.js
docs/app.js
docs/app.js.map
docs/index.html
docs/meta.json
package-lock.json
version.json
96e194e 2026-08-17 djDAOjones
Cherry-pick dot-crowd-navigator: GraphNode/GraphEdge models + tests; archive fork spec
The only net-new code the fork produced: two dependency-free model
classes (normalised 0-1 coords, byte-compatible with Waypoint's
convention) and their 37 unit tests. Deliberately left out of the
models barrel until Phase 2 wires them into the FlowLayer model.

The fork's AGENTS.md (swarm vocabulary, subsystem contracts, event
taxonomy) and app overview are archived under specs/dot-crowd-navigator/
with provenance headers as the feature spec for Phases 2-4.

Also renames the stale 'Windsurf Map Router' workspace file.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

Route Plotter v3.code-workspace
specs/dot-crowd-navigator/AGENTS-spec.md
specs/dot-crowd-navigator/app-overview.md
src/models/GraphEdge.js
src/models/GraphNode.js
tests/GraphEdge.test.js
tests/GraphNode.test.js
599407f 2026-08-17 djDAOjones
Install PM-Skills 4.7.0 (fresh, manifest-verified); port v2 project memory
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

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

pm_skills/CHANGELOG-1x.md
pm_skills/CHANGELOG-2x.md
pm_skills/CHANGELOG-3x.md
pm_skills/CHANGELOG.md
pm_skills/GUIDE.md
pm_skills/MANIFEST.md
pm_skills/VERSION
pm_skills/init.md
pm_skills/integrations/adopt.md
pm_skills/integrations/bugfix.md
pm_skills/integrations/dispatch.md
pm_skills/integrations/init-mvp.md
pm_skills/integrations/next.md
pm_skills/integrations/task.md
pm_skills/memory-policy.md
pm_skills/project/architecture.md
pm_skills/project/backlog.md
pm_skills/project/brief.md
pm_skills/project/conventions.md
pm_skills/project/decision-log.md
pm_skills/project/doc-deltas.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
pm_skills/project/wish-list.md
pm_skills/prompts/backlog-authoring.md
pm_skills/prompts/bug-scoping.md
pm_skills/prompts/deploy.md
pm_skills/prompts/design-options.md
pm_skills/prompts/end-of-task.md
pm_skills/prompts/implementation-plan.md
pm_skills/prompts/memory-maintenance.md
pm_skills/prompts/quick-task.md
pm_skills/prompts/release.md
pm_skills/prompts/review.md
pm_skills/prompts/scoping.md
pm_skills/prompts/session-start.md
pm_skills/prompts/upgrade.md
pm_skills/prompts/validation.md
pm_skills/scaffold/.editorconfig
pm_skills/scaffold/.gitignore
pm_skills/scaffold/.markdownlint.json
pm_skills/scaffold/check-links.mjs
pm_skills/scaffold/gen-file-map.mjs
pm_skills/templates/AGENTS.md
pm_skills/templates/DEV-INFRASTRUCTURE.md
pm_skills/templates/PROCESS.md
pm_skills/templates/UI-STANDARDS.md
3509790 2026-08-17 djDAOjones
Import router-plotter-02 @ v3.1 build 573 (commit 5b19787) as fresh v3 history
Route Plotter v3 starts here: a fresh-history continuation of
https://github.com/djDAOjones/router-plotter-02 at its final v2-line
state (v3.1.x, build 573, 2026-06-18). The old repo remains as the
frozen v2 line; dot-crowd-navigator's swarm spec and graph models
follow in separate commits.

pm_skills/ (v2.3.0) intentionally not imported — PM-Skills 4.7.0 is
installed fresh in the next commit, with the v2 project memory ported.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

.codeiumignore
.devin/workflows/bugfix.md
.devin/workflows/feature.md
.editorconfig
.gitignore
AGENTS.md
DEV-INFRASTRUCTURE.md
README.md
UI-STANDARDS.md
Windsurf Map Router.code-workspace
_Joe/design docs/Colour.html
_Joe/design docs/UI Audit - Carbon + Nielsen.md
_Joe/design docs/UI from ChatGPT
_Joe/design docs/saved/Archive/automatic_version_display_with_server.md
_Joe/design docs/saved/Archive/route_plotter_v3_styling_pack spec/route_plotter_v3_components_uon_carbon.css
_Joe/design docs/saved/Archive/route_plotter_v3_styling_pack spec/route_plotter_v3_tokens_uon_carbon.css
_Joe/design docs/saved/Archive/route_plotter_v3_styling_pack spec/route_plotter_v3_uon_integrated_design_system.md
_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/route_plotter_v3_map_ink_tokens_optional.css
_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/route_plotter_v3_swatch_picker.css
_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/route_plotter_v3_swatch_picker.js
_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/route_plotter_v3_swatch_picker_spec.md
_Joe/design docs/saved/Archive/route_plotter_v3_swatch_picker spec/swatch_picker_demo.html
_Joe/design docs/saved/Archive/route_plotter_v3_wcag_aaa_intent_consolidated.md
_Joe/design docs/saved/UoN Colours from UoN ER.html
_Joe/design docs/saved/WAVE Report of Route Plotter v3.1.506.html
_Joe/design docs/saved/route_plotter_v3_1_400_ux_wcag_aaa_review.md
_Joe/design docs/saved/ui_list.md
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.35.38 1440x900.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.35.43 1440x900 Keyboard shortcuts expanded but not brililant visual cue they are below or expanded.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.35.53 scrolled down to show shortcuts.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.36.00 scrolled to end of shortcuts.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.39.51 waypoints initially placed.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.40.46 mid play.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.41.10 all left sidebar expanded using full page image capture plugin.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.41.10 all left sidebar expanded.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.42.40 export drop down clicked.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.42.43 examples drop down clicked.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.43.05 edit switch toggled - warning message causes new line on title.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.45.20 2560 x 1440.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.45.26 2560 x 1440.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.45.33 2560 x 1440.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 09.45.49 2560 x 1440.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 10.01.31 768x1024.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 10.01.46 960x540.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 10.02.00 360x800.png
_Joe/design docs/screenshots/Screenshot 2026-02-08 at 10.16.15 waypoint selected.png
_Joe/dev helper scripts/push_github.js
_Joe/dev helper scripts/restart_localhost.sh
_Joe/dev notes/needs consolidating and deleting/Future Features.md
_Joe/dev notes/needs consolidating and deleting/Unit Tests.md
_Joe/dev notes/needs consolidating and deleting/dev guide.md
_Joe/dev notes/needs consolidating and deleting/example feature.md
_Joe/dev notes/opus chat on re-architecting event bus.md
_Joe/dev notes/task list.md
_Joe/useful prompt fragments.txt
build.js
docs/UoN_map 24-bit.png
docs/UoN_map.png
docs/app.js
docs/app.js.map
docs/images/Court.png
docs/images/Courts.jpg
docs/images/Garlic.jpg
docs/images/Nervous_System.jpg
docs/images/PARM_Aerial.jpg
docs/images/Rocketry.jpg
docs/images/UoN_map.png
docs/images/route-project-2026-03-28 (2).zip
docs/index.html
docs/meta.json
docs/styles/dropdown.css
docs/styles/main.css
docs/styles/swatch-picker.css
docs/styles/tokens.css
docs/styles/tooltip.css
examples/route-project-2026-01-10.zip
images/Court.png
images/Garlic.jpg
images/Nervous_System.jpg
images/PARM_Aerial.jpg
images/Rocketry.jpg
images/UoN_map.png
images/route-project-2026-03-28 (2).zip
index.html
package.json
push.js
scripts/README.md
scripts/build.sh
scripts/restart.sh
src/components/Dropdown.js
src/components/ParamTooltip.js
src/components/SwatchPicker.js
src/components/Tooltip.js
src/config/constants.js
src/config/helpContent.js
src/config/keybindings.js
src/config/tooltips.js
src/controllers/SectionController.js
src/controllers/UIController.js
src/core/EventBus.js
src/handlers/InteractionHandler.js
src/main.js
src/models/AnimationState.js
src/models/ImageAsset.js
src/models/Waypoint.js
src/models/index.js
src/services/AnimationEngine.js
src/services/AreaDrawingService.js
src/services/AreaEditService.js
src/services/AreaHighlightRenderer.js
src/services/BeaconRenderer.js
src/services/CameraService.js
src/services/CoordinateTransform.js
src/services/HTMLExportService.js
src/services/ImageAssetService.js
src/services/MotionVisibilityService.js
src/services/PathCalculator.js
src/services/RenderingService.js
src/services/StorageService.js
src/services/TextLabelService.js
src/services/UndoService.js
src/services/VideoExporter.js
src/services/index.js
src/utils/CatmullRom.js
src/utils/Easing.js
src/utils/focusTrap.js
src/utils/index.js
styles/dropdown.css
styles/main.css
styles/swatch-picker.css
styles/tokens.css
styles/tooltip.css
tests/example.test.js
tests/setup.js
tests/units.test.js
version.json
vitest.config.js
```
