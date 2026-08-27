<!-- field-report: project=uon-video-helper · date=2026-08-27 · type=export
     · pm-skills=4.9.2
     · source=git log from the maintainer's checkout, harvested by Claude Code -->

# Git log export — uon-video-helper

Full history to HEAD `a3c070a`, newest first, with commit
bodies and changed-file lists. The bodies carry the project's
`Verify:` lines, so this doubles as a record of which quality
gate ran at each task close, and the subjects show how far the
`<ITEM-ID>: <summary>` commit grammar was actually followed.

State at harvest: HEAD `a3c070a`, 108 commits, 6 path(s)
differing from HEAD.

Paths differing from HEAD at harvest:

```text
M  pm_skills/project/archive/INDEX.md
A  pm_skills/project/archive/decision-log-0002-2026-08-25-to-2026-08-27.md
A  pm_skills/project/archive/trajectory/trajectory-0003-review-remediation-and-band-1-close.md
M  pm_skills/project/decision-log.md
M  pm_skills/project/file-map.md
M  pm_skills/project/trajectory.md
```

Redaction. Absolute checkout paths have been collapsed to
`<checkout>`, and any other path under the maintainer's home
directory to `<home>`; that is the only alteration, and the content
is otherwise byte-verbatim. A scan of this set found no e-mail
addresses, credentials, or account identifiers.

```text
a3c070a 2026-08-27 djDAOjones
VH-26: the colour fear did not reproduce
The maintainer supplied a curated list of directly-downloadable phone
recordings. Five are now in `samples/phone/` — HLG 1080p, Dolby Vision
4K60, an 8-bit 4K30 pair and a legacy 3GP — gitignored with the rest of
`samples/`, and his own recordings untouched.

Every one was classified with ffprobe rather than from its filename, and
that mattered: the two files published as "SDR" and "HDR" are both plain
8-bit H.264 bt709. The supplied document warns about exactly this and was
right.

VH-26 has said since 25 August that phone HDR would come out "silently
washed out or crushed", because `src/` has no colour-space or tone-map
handling at all. Measured, it does not. One frame from each of the two
genuinely-HDR files, source against output, read through a `<video>`
element so the numbers describe what a viewer sees:

  HLG 1080p         source 110 / 5 / 109 / 219   output 110 / 5 / 108 / 219
  Dolby Vision 4K60 source 130 / 11 / 137 / 233  output 131 / 13 / 139 / 233
  (mean / p05 / p50 / p95 luma)

Within two units everywhere. The browser tone-maps HLG to SDR when it
decodes and the pipeline encodes what it is handed, so having no colour
handling of our own turns out to be correct here rather than merely
absent — correct by inheritance, which is worth knowing rather than
relying on.

Two smaller questions survive. Firefox is untested, and the question
there is not colour but whether an undecodable HEVC source hits VH-60's
`no-source-decode` block cleanly instead of failing mid-job. And portrait
is still absent from the corpus, so portrait branding composition remains
unspecified.

Incidentally: 4K60 encodes at about 1.3x real time here (16.5 s for
21.7 s), far better than feared — but a 4K60 phone video comes out BIGGER
than it went in, 139 MB to 154 MB, because "best quality" anchors to a
~51 Mbps source (VH-47). Not a defect; a surprise, and the smaller preset
is the answer.

npm run check: 439 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/tickets/VH-26.md
bfc3d3f 2026-08-27 djDAOjones
VH-32 and VH-61 closed, VH-17 reframed around EchoVideo
VH-32 — no redesign. The maintainer's answer to the interface pass he
asked for is that he likes the simplicity, and the only thing that would
justify a SECOND screen is a trim function. So it closes on "nothing to
change" rather than on a delivered redesign, and the screen-count
question moves to VH-30, which is what would raise it.

That is a stronger outcome than it looks. The original complaint was a
screen that accretes rather than progresses and speaks in codecs rather
than outcomes, and most of it has since been answered by items that were
not UI tickets: VH-64 gave the progress bar a name and a stage and made a
discouraged job ask first; VH-56 gave the finished result an owner, so
the screen stops offering a Save for a file that is gone; VH-46b
collapsed the closing from a checkbox plus a hidden mode set into one
question with four plainly-worded answers; VH-31 made the size estimate
say "at most" rather than quote a figure it beats by 3.6x.

VH-61 — leave it, as recommended. Loudness range goes blind in the final
second of a file, which under-reports, which keeps the macro-leveller
OFF. That is the safe direction and the same judgement spec §5.2 step 3
already makes; the review's remedy inverts it. Closed as accepted
behaviour with the evidence recorded, not as a defect deferred.

VH-17 — EchoVideo (Engage) is the key platform, which changes the stakes
rather than the answer. EchoVideo re-encodes on ingest, so where the moov
box sits cannot reach a viewer there on either preset. That leaves this a
secondary question about OneDrive and SharePoint. Still worth the upload
test; no longer worth designing around beforehand. It also confirms
something useful: if most videos go to EchoVideo, most jobs should be
taking "Best quality", which is already the default and already what
§6.1 names for it.

npm run check: 439 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/tickets/VH-32.md
pm_skills/project/trajectory.md
1bea1f9 2026-08-27 djDAOjones
Drop an invented backlog flag
`[low]` is not in the ticket grammar AGENTS.md defines — the flags are
[sign-off], [blocked: X], [spike], [detail], [maintainer] and [security],
and the memory checker was right to say so. Icebox placement already
carries the priority, so the flag said nothing the section did not.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
741ed16 2026-08-27 djDAOjones
Triage the wish-list against what this session shipped
Four entries were describing a repository that no longer exists.

"Preflight is uncancellable: `handlePreflight` never registers in
`running`" — VH-57 registered it, and passed the signal into
`analyseSourceAudio` and `calibrationProbe` as well. Cut.

"`loudness.ts`'s module header still says a handful of running sums" —
VH-67 rewrote that header, and made it true rather than merely accurate.
Cut.

"Momentary and short-term curves kept in full — about 5.8 MB per hour" —
VH-67 removed the momentary curve and halved the block store, so a stereo
hour is ~580 kB. Rewritten to say what remains and why: LRA needs the
whole short-term distribution, so it cannot simply be dropped.

And the two garbage-collected-sample notes, raised a fortnight apart from
different runs, are one observation about Mediabunny's decode-ahead.
Merged, with both sightings kept.

24 open, back inside the 25 budget. Nothing promoted: the backlog is at
13 open and healthy, and the rest of this list is genuinely pre-triage.

npm run check: 439 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/wish-list.md
bddd9b7 2026-08-27 djDAOjones
VH-19: the probe samples the one part of a lecture that says nothing
Everything needed to ship this looked present — `ContentClass` exists,
`outputShapeFor` already takes it, and the calibration probe already
decodes three seconds. Measuring the real corpus before writing the
classifier is what stopped it.

Mean absolute inter-frame difference on a 64x36 luma, four points through
five real lectures, separates camera from slides cleanly: CULT1027 reads
1.35 to 1.86, everything else 0.68 or below. But every one of the five
reads 0.00 at the START, because a lecture opens on a title card — and
the probe samples exactly there. Classifying from its existing window
would have called every source "screen", including the one that is
plainly camera, and "screen" cuts the smaller preset from 2.5 Mbps to
1.5.

The error is asymmetric. Calling camera content "screen" takes 40% of the
bitrate off the material that most needs it, silently, on someone's
lecture. Calling slides "camera" costs only file size, on the preset
whose whole purpose is a smaller file. A threshold has to be biased hard
toward camera, and five files is not enough to place one.

This is the same shape as the finding that stopped VH-31's estimator:
where you sample drives the answer more than how long you sample for. So
VH-19 stays open, blocked by a measurement rather than by missing code,
and its Done-when now names what a representative sample would be — a
separate pass so it cannot re-calibrate `videoFramesPerSecond`.

No classifier shipped. The table is in the backlog item.

npm run check: 439 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
8488eef 2026-08-27 djDAOjones
VH-31: an upper bound that is actually one
The maintainer chose the upper bound and asked for improvement where it
was cheap. Two things were cheap; one was not.

The projection multiplied by the SOURCE duration while the output is
longer by whatever branding is appended, so the tail was omitted outright
— about 3% on a 130 s lecture, and part of why four real "Smaller file"
jobs produced a file LARGER than the figure the user had decided on. A
bound that can be exceeded is not a bound. Pre-flight does not know the
mode yet, so it assumes the longest closing: over-stating by a second on
a job that turns out to be a clean cut is the safe direction.

And the panel said "Estimated size: 27.7 MB" for a file that came out at
7.5. A bare figure reads as a prediction, so the margin read as a defect.
"At most 27.7 MB" is the same number describing itself honestly.

What stays unbuilt is the content-derived estimator, and the reason is
evidence rather than taste: all three adversarial refuters returned
blocking findings. It raises `requiredStorageBytes` on 42 of 46 corpus
combinations into a hard block with no override; the longer probe it
needs re-calibrates `videoFramesPerSecond` by 34-66%, moving the estimate
across spec §7.3's 20- and 60-minute bands; and the wall budget withdraws
the fix from exactly the large files it exists to fix, on hardware only
1.8x slower than the machine it was costed on.

Those findings move into VH-19's note as the ticket file goes, because
VH-19 rides the same probe and would otherwise inherit the same
objections unanswered.

npm run check: 439 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/tickets/VH-31.md
pm_skills/project/trajectory.md
src/config/branding.test.ts
src/config/branding.ts
src/ui/preflight-panel.ts
src/workers/job.worker.ts
074d0ec 2026-08-27 djDAOjones
Record seven maintainer answers, and close four items on them
D4 / VH-15 — signed off. Safari below 26 may be excluded. This was the
one decision flagged as expensive to reverse; it is closed rather than
standing.

D5 / VH-14 — the intended home is a UoN-hosted web app in the shape of
xerte.nottingham.ac.uk: University server, University URL, not public
Pages. Answered in principle, so VH-14 stays open only for who
provisions it. Pages continues as the unadvertised pilot meanwhile.

D6 — AA is the floor, AAA is the goal, which is what UI-STANDARDS already
implements. Recorded so the ambition reads as deliberate and an AAA
exception has to be argued for.

D7 — Legal will not engage, and there is nothing to escalate. The
question was worth stating plainly: the app ships no codec. It uses the
ones already in the user's browser through WebCodecs, which is why
ffmpeg.wasm was rejected — that would have meant UoN distributing an x264
binary and inheriting both GPL obligations and AVC patent-pool exposure.
The current architecture has neither. The sign-off would have confirmed a
position already believed sound rather than granted permission, so its
absence is a small residual risk, not a blocker.

D12 — per-department branding is a later possibility, not a requirement.
Build it, show it around, hand it to the central department, which would
then own any variant governance. The handover is the revisit trigger.

VH-48 — cut. The maintainer asked for the most reliable option and that
is the current one. Stream copy is generationally lossless and near-
instant, and it needs the copied source and the encoded branding to match
byte-exactly in codec parameters; when they do not, the failure is silent
A/V drift found after publication. VH-24 removed one of rationale §4.3's
two objections and this one stands. Re-encoding is slower and
predictable.

VH-M3 — will not happen, so the OneDrive hazard is permanent and the
response is to make it legible rather than keep asking. Symptom
(`ETIMEDOUT` from readFileSync, or tsc hanging), cause (Files-On-Demand
dehydrating node_modules) and fix (`npm ci`) are all in README Gotchas
and AGENTS.md. No detector was built: nothing is dehydrated right now, so
one could not be tested, and an untested guard for an unreproducible
condition is worse than a documented one.

Maintainer dates recorded on VH-26, VH-M2 and VH-17, and VH-30 carries
the maintainer's view that a trim is worth doing — a webcam recording
with no editing is the case this tool exists for.

npm run check: 437 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/doc-deltas.md
pm_skills/project/tickets/VH-48.md
pm_skills/project/trajectory.md
6d2539d 2026-08-27 djDAOjones
VH-46b: one question, four answers
All four closing choices are back, as a single radio group: Clean cut,
Over the picture, Over a freeze frame, No closing sequence. The GUI
analysis the maintainer asked for turns on three facts.

"None" is not a different kind of answer from "clean cut" — it is a
fourth value of the same question. It had been a checkbox with the three
modes behind it as a separate group, so the user was asked twice about
one thing and the second question looked optional when it was not. One
group asks once.

Animation only means something for the two modes that play the 1 s build.
A clean cut discards it, so under that mode Fade and Slide differ by
nothing at all — precisely the control AGENTS.md names as the one never to
expose. It is hidden rather than disabled: a disabled control still says
"there is a decision here you may not make", and there is not one.

What separates the modes for a user is what happens to their last second
and how many seconds they gain, neither guessable from a two-word label,
so each option carries a sentence saying both. Clean cut stays the
default — least to think about, and the only mode that composites
nothing, so it works even where alpha decode does not.

The processing is sound because of VH-44, which detects whether the
engine honours an RGBA `copyTo` and takes the canvas round-trip only
where it does not — a property test, not a browser sniff, which is why it
survives. Verified end to end in Chrome across five combinations: every
mode, both styles, both colours. Each produced the duration its
configuration promises — `hard-cut` and `over-picture` +3.99 s,
`over-freeze` +4.99 s against nominal 4.00 and 5.00, the remainder being
frame quantisation at 30 fps.

Rejected: keeping the checkbox and adding a separate mode group, which is
the shape that caused the problem; and a select, which hides three of
four options behind a click for no gain at this length.

npm run check: 437 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

README.md
index.html
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/trajectory.md
src/main.ts
src/styles/app.css
2283311 2026-08-27 djDAOjones
VH-25 cut, VH-23 iceboxed: less to decide, not more
VH-25 — no picture fades at the branding boundary, in either direction.
Cut, not deferred.

The maintainer's call, and it overrides the corpus evidence that raised
the ticket: 21 of 21 real recordings end on a bright frame, which is what
made a fade-out look obviously right. The objection is about the viewing
context rather than the frame. A lecture is watched by an audience who
have just been told something; a fade to the closing card adds nothing
they need and costs a second of attention at exactly the point the
branding is trying to land. No benefit, a possible negative, so it is not
offered.

Nothing is lost by cutting it, because nothing was built — there is no
picture fade anywhere in `src/`. What exists and STAYS is the 100 ms
audio fade at the branding join (`BOUNDARY_FADE_MS`, decision D3). That
is not an aesthetic fade, it is a click preventer: two unrelated pieces
of audio butted together click, and 100 ms is short enough that nobody
hears it as a fade. Removing it would make every job click.

The ticket's third clause — a notice for the four corpus files that start
mid-speech — goes with it and is already covered by VH-55's
`onset-trimmed` warning.

VH-23 — opening graphics to the icebox, low, not to be addressed until
far later in the product's life. Openings suit external, brand-
recognition-first video; this tool is internal, where a closing is the
norm.

`loadBrandingClip` now refuses an opening and returns `null`, which is
the same answer the pipeline already handles for branding that fails to
load. The substantive part is the four generated placeholder openings
leaving `public/branding/`: they were shipping in every build, and an
unapproved University graphic reaching a published video is the risk
VH-33 named.

The timeline maths stays. Every offset downstream — content start,
subtitle shift, closing position, the estimate — is written in terms of
an opening duration that is currently zero and is tested that way.
Tearing it out would cost more than it saves and would have to be rebuilt
to bring the feature back.

npm run check: 437 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/tickets/VH-25.md
pm_skills/project/trajectory.md
public/branding/opening-1080p25.mp4
public/branding/opening-1080p30.mp4
public/branding/opening-2160p25.mp4
public/branding/opening-2160p30.mp4
src/media/branding.ts
f912a67 2026-08-27 djDAOjones
VH-49: Firefox is told to switch, not served a lesser file
The maintainer's call. Three options were on the table — block, ship
WebM/Opus, or drop audio. Dropping audio was never real: a silent lecture
is not a lecture. WebM/Opus means a second output contract, and spec §6.1
says MP4: EchoVideo and OneDrive both take MP4 without question, while a
Firefox-only format would have to be specified, tested across the same
corpus, and explained to a user who did not ask for it. Blocking is
honest, already built, and already names the way out.

It does exclude a supported browser from a University tool, which is a
real cost rather than one to pretend away. VH-69 is the pathway if it is
ever worth paying for — iceboxed low, because the block is correct today.

`README.md` now says what actually happens. Spec §10 still lists Firefox
desktop as "Supported" when only silent sources run there, so that and
D4's inherited claim go to `doc-deltas.md` rather than being edited here.

Also raised: VH-70, the four manual gates nobody has run — sleep/wake
during a job, the progress bar under a screen reader, a throttled
multi-gigabyte fallback download, and EchoVideo ingestion. Each covers
something built and believed to work and confirmed by nobody.

And a gate fix found on the way: `check-links.mjs` globs with
`git ls-files`, which lists a tracked file deleted in the working tree but
not yet staged. Deleting VH-49's ticket file crashed the whole gate with
ENOENT instead of reporting anything.

npm run check: 437 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

README.md
check-links.mjs
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/doc-deltas.md
pm_skills/project/tickets/VH-49.md
pm_skills/project/trajectory.md
40dc550 2026-08-27 djDAOjones
D1: the padding colour is Nottingham Blue
The maintainer supplied the brand palette
(nottingham.ac.uk/brand/visual/colour.aspx) as the source the branding
masters were made from. `--uon-brand-bg` is now Nottingham Blue #10263B,
aliased from a named `--uon-brand-blue` so the colour has its name
somewhere.

Verified rather than taken on trust: the shipped
`closing-tail-blue-1080p.mp4` decodes to #10263a at its corners, one unit
off in the blue channel, which is YUV-to-RGB rounding in an H.264 encode.
The asset is that colour.

Padding a non-16:9 source in the same blue the closing card ends on makes
the output one field of colour rather than black bars around a brand
graphic. Black is one line away if that reads worse on real material.

The two neutrals come with it because the white closing variant and the
interface both want them. The nine accent colours are on that page and
are not invented into this file until something needs one.

`gen-placeholder-branding.mjs` read the token with a regex that accepted
only a literal hex, so the alias broke it; it follows one `var()` hop now.
The alias resolves correctly through `getComputedStyle` in the browser,
which is where `main.ts` reads it — checked, not assumed.

npm run check: 437 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/decision-log.md
pm_skills/project/doc-deltas.md
pm_skills/project/trajectory.md
scripts/gen-placeholder-branding.mjs
src/styles/tokens.brand.css
bb68aae 2026-08-27 djDAOjones
VH-66: correct the code where the doc was right
Four drifts, and they did not all point the same way (review R-15).

`DEV-INFRASTRUCTURE.md` said both the product version and the build
identity appear "in the UI's About/footer line". Production showed the
product version alone, and the diagnostics bundle carrying the build id
is dev-only — so a running production app could answer "what release is
this?" and not "exactly what code is live?", which is the entire reason
for having two. The document was right and `main.ts` was wrong. Non-
secret: this repository is public and the commit is already in the
shipped sourcemaps.

Its Deployment section said the MVP is "local only" and "nothing deploys
until D5 is answered". Every push to `main` has published since
2026-08-25. That one was the document's error, and correcting it is
squarely within its ownership.

`architecture.md`'s source tree named `core/bus.ts`, `core/store.ts`,
`media/sidecar.ts`, `branding/assets.ts`, `ui/shell.ts`, `ui/components/`
and `ui/views/`, none of which exist, and described a store-and-bus main
thread that was never built. It now lists what is on disk, and says the
main thread holds its state directly — adding a store being a decision
rather than a default, for a surface that is one screen with one job.

`gen-placeholder-branding.mjs` still emitted a flat `closing-{label}.mp4`
that nothing fetches. The real closings arrived with VH-12 and are built
by `build-branding.mjs`, so running the old generator dropped four stale
files beside the real ones. Openings only now — there are still no
approved opening assets, which is what it is for.

Captured rather than edited: two spec deltas. §5.2 step 6 states the
limiter's ceiling as -2.0 dBTP, which is now the ceiling of the FILE
while the limiter targets a decibel below it (VH-50); and §5.2 step 3
lists the pause freeze once where the implementation needs it twice
(VH-61). `docs/` is protected, so those wait for a sign-off pass.

npm run check: 437 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

DEV-INFRASTRUCTURE.md
pm_skills/project/architecture.md
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/doc-deltas.md
pm_skills/project/trajectory.md
scripts/gen-placeholder-branding.mjs
src/main.ts
8fade35 2026-08-27 djDAOjones
VH-64: name the progress, and ask before the slow job
A bare `<progress>` announces a percentage and nothing else, so a
screen-reader user heard "63%" with no way to know 63% of what — and the
stage is the half that carries the meaning. It is now labelled by a
visible line that follows the stage, rather than by an `aria-label`
nobody sighted can see, so the announcement and the screen cannot drift
apart.

Spec §7.3 allows a discouraged job to continue "after acknowledgement",
and there was no acknowledgement. Start appeared for every outcome short
of a block, so agreement was inferred from the user pressing the very
button they were being warned about (review R-14). It is now a deliberate
second act, asked per selection rather than per session, because an
acknowledgement is about one job. Not a modal: UI-STANDARDS reserves
those for something irreversible the user did not initiate, and this is a
recommendation they are entitled to disagree with, beside the
recommendation.

Verified in Chrome with the mobile device class emulated: a discouraged
verdict shows the acknowledgement and hides Start; acknowledging reveals
Start and moves focus to it; a desktop proceed verdict shows Start at
once and never the acknowledgement; and the bar announces "Analysing
audio" rather than nothing while it runs.

npm run check: 437 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

index.html
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/trajectory.md
src/main.ts
48a4100 2026-08-27 djDAOjones
VH-60: an answer belongs to the question that asked it
Three ways the screen could describe one job while Start submitted
another.

Nothing checked, on the way back, which selection an asynchronous answer
was about — so whichever finished last won. Choosing file A then file B
could leave B on screen with Start pointing at A, and a slow pre-flight
for the old preset could arm Start after the user had chosen a different
one (review R-05). `beginSelection()` hands back the test; inspection,
pre-flight and the subtitle read all take it, and a preset change also
takes Start down for the interval, because the verdict that revealed it
described the other preset.

`hasOpfs`, `isSecureContext` and both tracks' `canDecode` were measured
during inspection and then never consulted, so a job could reach a live
Start button on a device that could not finish it — while the source
panel says in as many words that full guidance arrives with pre-flight
(review R-06). All three are required inputs now, not optional ones, so a
future call site cannot omit them by accident. They are ordered by what
the user can act on: an insecure context is fixable from the address bar,
so it is named before "install another browser".

And the codec string declared level 5.1 for every shape. ITU-T H.264
Table A-1 caps 5.1 at 983,040 macroblocks a second; 3840x2160 at 60 fps
needs 240 x 135 x 60 = 1,944,000. Chrome ACCEPTS the over-declaration,
which makes this the bad kind of bug — not a refusal but a stream
declaring a level it exceeds, for some stricter decoder to reject after
publication. The level comes from the shape now, which also puts 1080p at
4.2: more widely hardware-accelerated than 5.1, and correct through
1080p60.

Verified in Chrome: A then B leaves B on screen AND submits B — the
produced file is 11.3 MB, which is B's size, where A's is about 7;
a preset change hides Start until the new verdict lands;
`isConfigSupported` accepts the derived level at 720p30, 1080p30,
1080p60, 1440p30, 4K30 and 4K60; and a real job encodes and verifies at
level 4.2 with a byte-identical result.

npm run check: 437 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/trajectory.md
src/config/presets.test.ts
src/config/presets.ts
src/main.ts
src/media/preflight.test.ts
src/media/preflight.ts
src/spike/preflight-audio.ts
src/ui/preflight-panel.ts
src/workers/job.worker.ts
67fb40a 2026-08-27 djDAOjones
VH-61, VH-67: freeze the finished envelope, and keep less of the curve
VH-61's first half. Spec §5.2 step 3 lists the pause freeze LAST — after
smoothing, clamping and slew limiting — and the code applied it first, to
the raw correction only. The smoothing window is centred, so speech
fifteen seconds past a pause reached back into it and moved a gain that
was meant to be frozen: -5 dB entering a pause became -1.29 dB inside it,
and the silence before a recording's first word read +1.85 dB. The freeze
now appears twice and the two do different jobs — the first keeps a
pause's enormous raw demand out of the smoother, the second stops the
smoother reaching into the pause. Written as "do not advance the slew"
rather than "restore a saved value", so it can never introduce a step the
slew limit forbids.

VH-67. `computeIntegrated` averaged per-channel mean squares across the
gated blocks and then applied the channel weights, and those two commute:
weighting on the way in gives the identical figure while storing one
number per block instead of one per channel per block. The EBU harness
passes unchanged, which is the equivalence the ticket asked for. And
nothing in the pipeline reads the momentary curve — the envelope and the
warnings both work from the short-term one — while the EBU max-M cases
need every value, so it is retained on request, defaulting to on, and the
pipeline asks for off. A stereo hour goes from ~1.4 MB to ~580 kB, which
is what the module's comment claimed all along.

NOT done, deliberately: VH-61's LRA half. A loud passage in the final
second reads LRA 0.00 against 10.80 for the same event mid-file. Real.
But the review's remedy — pad 1.5 s of silence before finalising LRA —
was measured and is worse: on a recording ending quietly it took LRA from
3.79 to 15.32 against a mid-file truth of 6.51. The direction is what
matters. LRA gates macro-levelling at 9 LU; suppression under-reports, so
the leveller stays off, which is the safe failure and the same judgement
step 3 already makes. Padding over-reports and switches the leveller on
because a recording ends in room tone. That needs a standards-grounded
design and a model of the gate, not a patch.

Protected DSP touched, so the EBU Tech 3341 harness was re-run: 22
passed, 1 skipped, unchanged.
npm run check: 426 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/trajectory.md
src/audio/analyse.ts
src/audio/loudness.test.ts
src/audio/loudness.ts
src/audio/macrolevel.test.ts
src/audio/macrolevel.ts
9f0c6a1 2026-08-27 djDAOjones
VH-65: the build job does not need to be able to publish
Every push to `main` deploys (VH-14), so this workflow IS the act of
publishing and its blast radius is the University's pilot site.

Top-level `permissions` applied to both jobs, so `build` — which runs
`npm ci` and then the entire test suite — held a token that could deploy.
That is a great deal of third-party code standing next to the publish
button. `contents: read` at the top; `pages: write` and `id-token: write`
on the `deploy` job alone.

A major-version tag is mutable. `actions/checkout@v4` is whatever that
tag points at today, and whoever controls it can move it to any commit,
which then runs on every push to `main` with this workflow's permissions.
Each action is now pinned to a resolved commit SHA with the version it is
named beside it, and the comment gives the command to re-resolve so an
update is a decision rather than a drift.

And the media guard scanned `public/spike/` only, so a recording copied
anywhere else under `public/` shipped. The fix is not a list of branding
filenames: a list must be updated whenever an asset is added, and the day
it is not is the day the guard stops guarding. Git already knows which
media belongs to this repository — the branding assets are tracked, a
lecture copied in by hand is not, wherever it was put. Outside a checkout
it falls back to the old directory rule rather than to trusting
everything.

Verified: an untracked MP4 in `public/assets/`, outside the only
directory the old guard looked at, fails the gate with exit 1 and names
the file.

npm run check: 418 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

.github/workflows/deploy-pages.yml
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/trajectory.md
scripts/check-placeholders.mjs
4aea28a 2026-08-27 djDAOjones
VH-63: keep a long job alive, and warn while there is something to lose
Spec §7.5 asks for a screen wake lock during processing and a
`beforeunload` warning while a job runs. Neither existed anywhere in
`src/` (review R-12). A forty-minute encode on a laptop that sleeps is
forty minutes gone, and a reload during one discards it without a word.

Re-acquiring on `visibilitychange` is the part that is easy to leave out
and does most of the work: the browser releases a wake lock whenever the
document is hidden, so a user who switches tabs during a long encode
comes back to a machine free to sleep — the exact case the lock was taken
for.

The unload warning covers a wider interval than the review proposed. A
job in flight is obvious; a save still streaming out of OPFS is the same
risk under another name; and a finished file the user has not put
anywhere is an hour of work sitting in scratch. All three and nothing
else — a page that always warns trains people to dismiss the warning, and
then it protects nothing at all. That rule is `shouldWarnBeforeLeaving`,
kept out of the DOM so it can be tested in Node.

Both degrade quietly. The Wake Lock API is missing on some platforms and
can be refused outright; a refused lock is a job that may be interrupted,
not a job that must not start.

Verified in Chrome: no listener and no request while idle; one of each
once a job starts; the warning STAYS after the job finishes because the
result is unsaved; and it comes off when the file is saved. The lock
itself was refused with NotAllowedError because the browser pane is not
visible — the quiet-degradation path working. Whether a GRANTED lock
prevents sleep needs a visible window and a real sleep; that is not
verified here.

npm run check: 418 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/core/keep-awake.test.ts
src/core/keep-awake.ts
src/main.ts
e1b78b1 2026-08-27 djDAOjones
VH-68: four faults that were nobody's ticket
The review's consolidation dropped these, and each survives precisely
because it is too small to schedule.

`SlidingMinimum.position` counts samples for the length of a file and
never resets, in an `Int32Array` that wraps past 2^31 — 12.4 hours at
48 kHz. After the wrap the expiry comparison goes negative and the ring
cycles forever. Well outside this tool's envelope; a latent hang is still
a latent hang. `Float64Array` holds every integer to 2^53 exactly, which
is 285,000 years of audio. Pinned by pushing the counter past the old
boundary directly, because clocking 2.1 billion samples through is not a
test.

`WARNING_THRESHOLDS.clippingDbtp` and `COMPRESSOR.softKnee` were declared
and never read, while `truepeak.ts` carried its own `-0.1` and
`compressor.ts` its own `6`. That is worse than a plain literal: a
literal admits where the number lives, while a config entry nobody reads
invites someone to tune it and watch nothing happen. `softKnee: true`
also described the shape while another file decided the width, so it
becomes `kneeDb: 6` — a soft knee is how wide it is. Both are now pinned
by reading the behaviour back, not the constant.

`extended-silence` sat inside a guard written for the NOISE test. That
guard exists so a recording with no pauses is not accused of background
noise it may not have — a judgement about noise, applied by accident to
silence. An entirely silent track has every short-term value at
`-Infinity`, so the guard emptied and the one warning that describes it
could never fire. It moves out; the noise test keeps its guard.

And `run-in-engines.mjs` printed `wanted.length - failures` complete
runs, so "3/3" could mean one ran and two were not installed. Three
independent counters now, and a skip fails the run only when that engine
was named explicitly — defaulting to all three means "whatever is
installed"; naming one means "this one".

Protected DSP touched (`truepeak.ts`, `limiter.ts`), so the EBU Tech 3341
harness was re-run in the same change: 22 passed, 1 skipped, unchanged.
npm run check: 413 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/trajectory.md
scripts/run-in-engines.mjs
src/audio/compressor.ts
src/audio/limiter.test.ts
src/audio/limiter.ts
src/audio/truepeak.ts
src/audio/warnings.test.ts
src/audio/warnings.ts
src/config/audio.ts
907d237 2026-08-27 djDAOjones
VH-62: stop the harness reporting what it did not look at
Four ways acceptance could be green without having looked (review R-11).

Criterion 3 was hard-coded `pass`. The EBU conformance it describes is
asserted by `npm run check`, not by that page — so the page could be
entirely green while the gate had never run, or was failing. A new
`external` status says where the evidence is instead of borrowing its
colour, and the summary counts it apart from "passed here".

The sync meter read video markers as presentation timestamps and audio
markers as a running count of decoded frames. Those agree on a contiguous
track starting at zero, which is why nobody noticed — and they diverge on
a track that starts late, a gap mid-file, or an edit list, which is the
whole set of cases the meter exists to judge. It is also why VH-55's
second half was sequenced behind this one: that change moves the audio
start, and would have been graded by a meter holding two clocks.

Criterion 9's instruments are per-realm. A worker has its own `fetch` and
its own resource timeline, and the job runs in a worker — so the only
request this app makes at runtime, for branding, was invisible, and the
criterion was reporting a clean timeline containing none of the app's
real requests. The worker now runs its own watch and reports it over the
protocol, `mergeEgress` joins the two, and criterion 1's fixture runs
WITH branding so the fetch actually happens rather than proving zero
requests by never making one.

And a watch that never fires is indistinguishable from a watch that
cannot. A new check deliberately uploads two bodies — one on `init`, one
built into a `Request`, which is the shape that slipped past because only
`init.body` was read — and fails if either goes unseen. Verified directly
in Chrome: both are caught, the Request-carried one as present-but-
unmeasurable.

`EgressWatch` moves to `core/egress.ts`; the worker needs it, and
production code importing the acceptance harness is the wrong direction.

NOT verified: a complete acceptance run. It takes over an hour in this
browser — roughly four minutes per synthesised corpus entry, in-process
on the main thread — and was abandoned after four. A harness nobody sits
through is a false-pass route of its own; it is on the wish-list and named
in what VH-62 has left.

npm run check: 408 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
pm_skills/project/wish-list.md
src/acceptance/main.ts
src/acceptance/measure.ts
src/acceptance/run.ts
src/core/egress.test.ts
src/core/egress.ts
src/workers/job.worker.ts
src/workers/protocol.ts
6a27285 2026-08-27 djDAOjones
Keep one copy of the internal review, in the bundle that indexes it
`pm_skills/project/code-review-2026-08-26.md` was untracked and
deliberately left alone; a `git add -A` in d02b3c8 swept it in. It is
byte-identical to `reviews/2026-08-26/uon-video-helper-internal-code-review-2026-08-26.md`
apart from one relative link the bundle copy rewrites correctly for its
own directory, and that copy is already indexed by the bundle README.

So the duplicate goes and the record stays. The README's provenance
section said the source file "was not modified, staged or deleted", which
stopped being true; it now says what actually happened.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/code-review-2026-08-26.md
reviews/2026-08-26/README.md
23f9b9a 2026-08-27 djDAOjones
VH-59: inspect the track that will be encoded, and name what cannot be kept
Inspection read `getVideoTracks()[0]` and `getAudioTracks()[0]`. The
pipeline asks Mediabunny for its PRIMARY tracks, and that is a different
selection: primacy comes from position, disposition, bitrate — higher
wins — and whether the track pairs with the primary video track. An OBS
recording with programme audio on track 0 and a higher-bitrate commentary
mic on track 1 would be inspected against one and encoded from the other,
so the loudness plan, the audio warnings and the whole pre-flight would
describe sound the user is never going to hear (review R-09). Both sides
now call the same API, which makes them agree by construction rather than
by coincidence.

The output carries one video and one audio track by design, so anything
beyond that is content the user loses. `SourceReport` now counts both,
and the source panel names them before Start is reachable — beside the
subtitle notice, which is the same promise about a different loss.
Metadata that fails to copy was logged and nothing more; it now reports
through the `outputWarnings` channel VH-55 gave a first member.

`source-panel.ts` had no tests at all, which is a poor place for a module
that decides which losses get said out loud. `buildRows` is exported for
them — rendering needs a DOM and the suite runs in Node, but every
decision worth protecting is in the rows.

Verified with a two-audio-track MP4 synthesised with ffmpeg, because the
real corpus has none: "This file has 1 more sound track" with its note
appears before Start, and the job produces a correct single-track output.
That fixture is what the review asked for and is worth keeping in mind
for VH-62.

npm run check: 401 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/audio/warnings.ts
src/media/inspect.ts
src/media/pipeline.ts
src/ui/source-panel.test.ts
src/ui/source-panel.ts
src/ui/warning-text.test.ts
src/ui/warning-text.ts
ae793b2 2026-08-27 djDAOjones
VH-55: say what the delay compensation took, and why the rest waits
Compensating the AAC encoder's ~44 ms delay shifts the audio timeline
earlier and discards whatever lands before zero. Three files in the real
corpus carry energy there — two near -26 dBFS, one near -48 — so what
goes is sometimes the attack of a first word (review R-03).

Two faults sat on top of that, and both are fixed here.

`measureEncoderDelay` returned 0 for an encoder with genuinely no delay
(Opus, PCM) AND for a probe that threw or found no impulse. Both leave
the audio uncompensated; only one is right to. It now returns
`number | null`, and a probe that finds no impulse it placed itself says
so rather than reporting a measurement.

And the loss was silent, which AGENTS.md names as the worst outcome
available. `AudioTimelineShift` now measures what it discards, and a peak
above -50 dBFS raises an `onset-trimmed` warning on the finished video —
the first real member of `outputWarnings`, which the worker had been
building empty and posting. The threshold is the corpus measurement, not
a guess. `warning-text.test.ts`'s code list is now exhaustive by
construction, because a hand-maintained list is how a new warning ships
without words.

What is NOT here is preserving the samples. The mechanism is known:
delay the VIDEO by the encoder delay instead, which Mediabunny expresses
as an empty edit list — `isobmff-boxes.js` writes `edts` whenever a
track's first timestamp is positive, so the module comment claiming it
writes no edit list is wrong, even though its conclusion stands (an empty
edit cannot express priming-skip either). The edit is about six lines
across four timestamp sites.

Proving it is not six lines. It moves A/V sync, and the acceptance meter
reads audio markers in decoded-sample time and video markers in
presentation time — two clocks, on the one axis this change moves. It
could report a false pass or a false 44 ms failure with equal ease.
Making a sync change whose verification is known to be blind is how
silent drift reaches published video, so VH-55 keeps that half and is
sequenced after VH-62.

npm run check: 393 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/audio/warnings.test.ts
src/audio/warnings.ts
src/config/audio.ts
src/media/encoder-delay.test.ts
src/media/encoder-delay.ts
src/media/pipeline.ts
src/ui/warning-text.test.ts
src/ui/warning-text.ts
src/workers/job.worker.ts
e043713 2026-08-27 djDAOjones
VH-57: make every phase answer Cancel
`Cancel leaves nothing behind` is an AGENTS.md invariant, and three paths
broke it (review R-07).

`handleProcess` registered its `AbortController` after
`await releaseFinished()`, so a Cancel pressed during cleanup found an
empty map and vanished without a word — a window VH-56 had just widened,
because cleanup can now wait on a save lease. Registration moves ahead of
every await.

Only `process` registered at all. `main.ts` posts a `cancel` for any
request that exceeds its bound, so a timed-out inspection or pre-flight
went on doing full analysis and a calibration probe for a screen that had
given up on it. Inspection and pre-flight are now cancellable, with the
signal threaded into `inspectFile`, `analyseSourceAudio` and
`calibrationProbe`, and a `cancelled` reply the main thread treats as
"abandoned for a newer request" rather than as an error.

And the signal stopped at `runPipeline`. The finished-file verification
walks the whole output again with no signal, then posted `processed`
unconditionally — so Cancel during the longest silent phase of a long job
answered "Your video is ready." Every boundary that commits a result now
re-checks: before the verification walk, after it, and immediately before
the workspace is retained. The catch path disposes the workspace and drops
its lease whatever stage it failed at.

`analyseSourceAudio` needed care. It stops at the next sample rather than
throwing, so an aborted traversal returns a measurement of PART of the
file — which would then fail the output contract and be reported as a
broken video rather than as the cancellation it was.

The registry moves to `workers/cancellation.ts` so the rule can be tested:
importing the worker runs its boot, and the invariant — a request is
cancellable from before its first await — is plain control flow that
deserves to be provable in Node.

Verified in Chrome on a real recording: Cancel during preparing,
analysing and finishing each returns cancelled, leaves no Save control,
and leaves the OPFS jobs root empty. Finishing is the new one.

npm run check: 383 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/main.ts
src/media/inspect.ts
src/media/pipeline.ts
src/workers/cancellation.test.ts
src/workers/cancellation.ts
src/workers/job.worker.ts
ae763ba 2026-08-27 djDAOjones
VH-56: own the finished file until the user has it
The result was a `File` on the screen and nothing more, and there were
four ordinary ways to lose it (review R-04).

A fallback download was treated as complete the moment `anchor.click()`
returned, and the caller then sent `discard` — disposing the OPFS scratch
that the object URL reads from lazily, mid-download. `saveFile` now hands
back what it still holds instead of revoking on a 60-second guess, and a
downloaded result keeps its scratch, its URL and its lease until it is
released.

Starting another job disposed that same scratch while a picker save was
streaming out of it, because saving disabled only the Save button. The
save now takes a worker-side read lease as well as locking the controls:
the UI lock would be sufficient if the UI were always right, and VH-36 is
what happens when it is not. `releaseFinished` and `discard` both wait on
the lease, which expires after ten minutes so a vanished reader cannot
leave a workspace nobody may ever dispose. The lease goes back BEFORE the
discard, not after, or the two deadlock.

Starting another job also discarded an unsaved result outright — one
click, no question. Start now asks, inline beside the result rather than
in a modal, and "Keep it" restores it with its lease and object URL
intact. Choosing a different source file no longer takes the Save button
away either.

And the save picker returns whatever the user selected, so selecting
their own source was allowed. That makes "the original file is never
changed" falsifiable in the interface that promises it.
`isSourceDestination` compares name, size and modification time — a
different file matching all three is the same file by any practical
definition — and `isSameEntry()` is used instead wherever a handle for
the source is supplied, so acquiring one later upgrades the guard rather
than replacing it.

Verified in Chrome on a real 130 s lecture, not only in unit tests: the
discard question and "Keep it"; a save aimed at the source refused
without ever reaching `createWritable`; Start, the file input and Save
all locked while a throttled save streamed, with a programmatic Start
click inert; and the workspace disposed only after the lease came back.
Two gaps the walkthrough found are fixed with it — a save said nothing
at all while it streamed, and the Save control stayed live after the
scratch it reads had gone.

npm run check: 379 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/config/thresholds.ts
src/main.ts
src/media/save.test.ts
src/media/save.ts
src/workers/job.worker.ts
src/workers/protocol.ts
d02b3c8 2026-08-27 djDAOjones
VH-50: solve the gain against the chain that runs, and leave AAC its decibel
Two independent reasons a real lecture missed spec §13 criterion 2 while
every fixture passed. Measured, not argued.

The gain was solved against a chain that does not limit. `chain.ts` takes
`gainDb: null` to mean "measuring pass", and that also sets
`limiter = null` — so step 5 was chosen against steps 2-4 alone and then
used in a chain where step 6 takes some of it back. On synthesised speech
the limiter never engages, because `speechLike` has a ~7 dB crest factor;
a real lecture is nearer 20, and the miss ran from 0.45 to 2.42 LU.
`solveChainGainDb` measures the real chain and corrects until it is
inside 0.1 LU, at a cost of one or two audio-only traversals — around
3.6 s each for an hour. `chain.test.ts` now calls that same function
instead of re-implementing the rule, which is how the harness came to
prove a gain rule the product did not have, and carries a fixture with a
lecture's crest factor via the new `withTransients` helper.

Separately, the limiter is not the last thing to touch the signal. AAC-LC
is, and an MDCT codec does not preserve peak level: four real lectures,
each limited to exactly -2.0 dBTP, decoded at -1.98, -1.91, -1.90 and
-1.61. Resampling was ruled out — the worst of the four is the only 48 kHz
file, which is never resampled. `ENCODE_TRUE_PEAK_HEADROOM_DB` gives the
limiter 1.0 dB below the published ceiling, not the 0.44 measured, because
too little headroom refuses the user's job while too much costs a decibel
of gain reduction on transients and nothing else. Spec §5.1's own -2.0
allowance for the DOWNSTREAM re-encode is untouched.

Verified on real material (`/spike-real.html`, `best`, 2026-08-27):

  AMCS3059  -21.86 / -1.86  ->  -16.75 / -1.98  becomes  -16.41 / -2.98
  CULT1027  -23.29 / -3.42  ->  -16.13 / -1.61  becomes  -16.10 / -2.56
  MLAC3139  -27.24 / -4.50  ->  -16.08 / -1.91  becomes  -16.10 / -2.94
  AMCS2007  -26.07 / -3.77  ->  -16.11 / -1.90  becomes  -16.15 / -2.95

None of the four met both figures before. All four do now. The spike
fixtures were removed from `public/spike/` afterwards.

Two follow-ups captured rather than guessed at: the probe could measure
each job's own AAC overshoot instead of carrying a corpus constant, and
AAC costs integrated loudness too — 0.02 to 0.41 LU, worst on the most
heavily limited material.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/code-review-2026-08-26.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
pm_skills/project/wish-list.md
src/audio/chain.test.ts
src/audio/gain-solve.ts
src/audio/limiter.test.ts
src/config/audio.ts
src/media/audio-plan.ts
test/helpers/signals.ts
2b98d86 2026-08-27 djDAOjones
VH-54: measure the end of the file, and limit it
The 4x-oversampling interpolator is causal — BS.1770-4 Annex 2's
y[4i + p] = sum_j h_p[j] * x[i - j] — so the inter-sample peaks a frame
contributes to are only evaluated once the following twelve frames have
been clocked in. At end of stream there are none, and nothing ever looked.

Measured, not argued (review R-02): a 480-frame signal with one full-scale
sample in its last frame read **-64.05 dBTP**. It is 0. The limiter made
the same omission twice over, copying its delay line out at one frozen
gain, so both the detector post-roll and the sliding-window minimum were
skipped for the final look-ahead window: the emitted tail peaked at 1.0,
2 dB above the ceiling this project treats as a guarantee. Both the
runtime verifier and the acceptance harness read that -64 and called it
safe.

`TruePeakDetector.finish()` drains the interpolator with silence and then
refuses further frames, so silence can never be spliced into a signal.
`TruePeakLimiter.flush()` clocks its tail out through `process()` instead
of copying it, which advances detection and gain by the ordinary path at
unchanged output length. `AudioAnalyser.finish()` drains before reading,
so no call site has to remember.

Regressions pin an impulse in the final frame, a stream shorter than the
interpolator, and a sweep of transient positions 0 to 480 frames from the
end — the defect was position-dependent, and 0, 1 and 3 frames escaped
while 6 and beyond did not. Protected DSP, so the EBU Tech 3341 harness
was re-run in the same change and is unchanged: 373 passed, 1 skipped.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

src/audio/analyse.test.ts
src/audio/analyse.ts
src/audio/limiter.test.ts
src/audio/limiter.ts
src/audio/truepeak.test.ts
src/audio/truepeak.ts
test/ebu3341/tech3341.test.ts
a4d5dbc 2026-08-27 djDAOjones
VH-31: stop charging silent sources for an audio track
Recovered from an abandoned parallel session, reviewed and kept.

`projectedOutputBytes` added `shape.audioBitrateBps` unconditionally, so a
source with no audio track was billed 128 kbps of stereo AAC for a track
the output will not contain — 64 kB of an 82 kB estimate on a 4 s silent
fixture, ~3.4 MB on the 215 s silent slide deck. The call sites knew
(`report.audio !== null`); the function did not.

Audio presence is now a required parameter rather than a default, so a
future caller cannot inherit the original failure mode by omission. This
is one named contributor, not the estimate redesign — VH-31 stays open.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/decision-log.md
pm_skills/project/tickets/VH-31.md
src/config/presets.test.ts
src/config/presets.ts
src/workers/job.worker.ts
de2465d 2026-08-27 djDAOjones
VH-58: claim the job directory before it exists, and delete under the claim
Recovered from an abandoned parallel session, reviewed line by line and
kept: the change is complete, tested and green under `npm run check`.

Two windows, both ending with a live workspace deleted (review R-08).
`OpfsWorkspace.open` created the directory and then claimed its Web Lock,
so another tab's boot sweep enumerating the jobs root in between found a
real, unclaimed, brand-new directory. And the sweep decided availability
inside one `ifAvailable` callback and removed the entry after that
callback had released — a claim tested under a lock and acted on after it
says nothing about the moment of deletion.

The claim now precedes creation and is released if creation throws, and
removal happens inside the granted lock callback. `selectSweepable`
becomes `sweepUnclaimed`, because there is no longer a list of names to
select: each directory is attempted under its own claim, and a failure
ends that directory rather than the sweep.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

src/media/opfs.test.ts
src/media/opfs.ts
5e8c1be 2026-08-27 djDAOjones
Refactor the backlog: band the review's findings against the queue
The 2026-08-26 review's sixteen findings, plus five its consolidation
dropped, become fifteen items (VH-54..VH-68). They are banded against the
existing queue rather than appended to it: R-01..R-04 and R-07..R-09 are
the same promise Band 1 already carries, so they join it, and the rest sit
in Band 2 where they are real but not yet biting anyone.

Band 1 splits in two. 1a is agent work on output honesty and silent loss;
1b is the five items that cannot move without a product call. That split
is the point of the refactor -- the old single band let maintainer
decisions read as though they were blocking implementation.

Where the review's own remedy was disproved, the item says so: R-10's
1.5-second pad is recorded as unsafe, and R-04's partial-OPFS-write claim
as unreproduced. Evidence now lives in reviews/2026-08-26/ and items cite
the R-number instead of restating it.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
12f4dd4 2026-08-27 djDAOjones
VH-50: make the output contract a postcondition, and close VH-52
Two in-flight closes that the previous session left uncommitted.

VH-50 (still open): a finalized MP4 is no longer reported as processed
until its decoded audio passes one shared, pure verifier — finite
measurements, -16 +/-0.5 LUFS, and true peak at or below -2 dBTP. The
worker and the acceptance harness call the same function, so the harness
can no longer pass an invariant the product misses. True peak is measured
over the whole output because the ceiling applies at the branding joins
too; cropping it was what hid the t=0 and EOF cases.

VH-52 (shipped): the 30-second DSP timeout stays the measured CI bound,
and the test run now states what an unusually long duration means, so
contention is legible at the point of failure.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

DEV-INFRASTRUCTURE.md
package.json
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/acceptance/run.ts
src/media/output-verification.test.ts
src/media/output-verification.ts
src/workers/job.worker.ts
66e675b 2026-08-27 djDAOjones
Land the 2026-08-26 review bundle as durable evidence
Three review documents plus the byte-exact source archive move out of
Downloads and into the repository, so every later task can cite a path
rather than a chat attachment. The imported comprehensive review is
excluded from table-style lint because it is evidence, not project prose;
its links were normalised only in the portable reading copy.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

.markdownlint-cli2.jsonc
reviews/2026-08-26/README.md
reviews/2026-08-26/continuation-prompt.md
reviews/2026-08-26/uon-video-helper-comprehensive-review-2026-08-26.md
reviews/2026-08-26/uon-video-helper-comprehensive-review-2026-08-26.source.txt
reviews/2026-08-26/uon-video-helper-internal-code-review-2026-08-26.md
reviews/2026-08-26/uon-video-helper-review-critique-2026-08-26.md
reviews/2026-08-26/uon-video-helper-updated-review-critique-2026-08-26.md
fad65f1 2026-08-26 djDAOjones
VH-53: share project context across coding agents
Add a Claude adapter that imports the canonical AGENTS.md and document the local-memory boundary.

Verify: typecheck 0 · 355 tests passed, 1 skipped · build 0 · docs 0

---

.gitignore
CLAUDE.md
README.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
66227e5 2026-08-26 djDAOjones
VH-31: the third refuter, and the smallest lever
The workflow's last refuter reported after the write-up: all three blocked the recommendation rather than two. It adds one finding the others missed — the wall budget withdraws the fix from exactly the large files it exists to fix, on hardware only ~1.8x slower than the Mac it was measured on, and the two-window regime that results is the modal outcome on a mid-speed laptop with a measured 2x under-call and was never scored.

Also recorded, verified by hand rather than taken from an agent: projectedOutputBytes multiplies by the SOURCE duration, so the estimate omits the closing tail entirely — 4.00s, or 5.00s with a freeze — even though branding.ts already owns that rule as closingAddedSeconds(mode). About 3% on a 130s lecture, in the unsafe direction, and part of why four Smaller file jobs measure below 1.0. It is a one-line fix that raises a figure multiplied by 2.5 into a hard storage block, so it belongs with the item rather than ahead of it.

---

pm_skills/project/decision-log.md
pm_skills/project/tickets/VH-31.md
7d76da1 2026-08-26 djDAOjones
VH-52: say what the DSP timeout can and cannot cover
A parallel session reviewing the backlog noticed that testTimeout: 30_000 was set here (79355f0) for CI slowness — a ~1.5x runner against a ~3.9s slowest test — while the same constant elsewhere was a STARVATION bound with ~34x headroom over a 889ms test. Same number, ~7.7x cover here rather than ~34x. Both premises verified against this repo.

A measurement taken here on 2026-08-26 changes the conclusion rather than confirming it: chain.test.ts ran 540s and failed a test with three headless browsers encoding alongside it — ~138x. So deriving the timeout from duration times a starvation factor, the shape suggested, gives a bound of minutes, and a genuinely hung test would take minutes to fail. The constant does the CI job correctly and cannot do the starvation job at all.

The operational half is done here: DEV-INFRASTRUCTURE's quality-gate section now carries the measurement and the "gate on a settled machine" rule, which previously existed only in the other project. What remains is making a contention failure legible rather than looking like a real one, raised as VH-52 in Band 2.

---

DEV-INFRASTRUCTURE.md
pm_skills/project/backlog.md
edefef2 2026-08-26 djDAOjones
VH-31: record what was measured, and why it was not built
An eight-agent design workflow measured 46 whole-file re-encodes at production targets and benchmarked four estimators. Two of three adversarial refuters then returned blocking findings against its own recommendation, so nothing was implemented — building it at 4am with no time for the review pass that had just caught a midnight regression would have repeated the mistake that review existed to find.

Two of this ticket's premises turned out false. The 3.6x headline is stale: VH-47 shipped hours earlier and cut it to 1.70x, which I verified by hand rather than taking the agent's figure. And the over-estimate is NOT the safety margin the ticket assumed — at Smaller file the projection already falls below the produced file on 4 of 23 real jobs, so a fix that only shrinks the number makes that half worse. The bake-off also settled that the first three seconds are useless as a sample (0.049 of actual on one file), because a 3-second encode reproduces its requested bitrate to ~99.8%.

The measurements, the surviving design ideas and the blocking objections are all on the ticket.

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/tickets/VH-31.md
1b116bb 2026-08-26 djDAOjones
VH-51: fix what the overnight self-review confirmed
A 25-agent adversarial review of the night's 14 commits confirmed 15 defects and refuted 3. The worst was a regression I introduced: VH-38's 60-second SILENCE watchdog rested on "the encode loop reports every thirty frames", which is true of the encode loop and nothing else. Inspection, both planAudio traversals and the post-encode verification emit nothing and all three scale with the source, so the fix for a duration cap reintroduced one at a lower threshold, on exactly the long jobs the item existed to protect. All three report now; the bound is 120s.

Also: a cancel arriving between the last throwIfAborted and the lane controller was lost outright, because a listener attached to an already-aborted AbortSignal never fires (reproduced in Node). honoursRgbaReadback compared allocationSize against CODED dimensions where it measures the VISIBLE rect, so a padded master would fail closed onto the Firefox-broken path and quietly undo VH-44. timelineSeconds added the audio overrun on top of the closing rather than taking the later track, and the test I wrote locked the error in. compositeSampled had dropped the opaque and transparent fast paths, ~133M reads a frame at 4K.

Three claims of mine were false and are corrected rather than dropped: Promise.all does NOT leak an unhandled rejection, so VH-37's recorded root cause was wrong; a test named for that mechanism could not fail and is replaced with the ordering property that matters; and VH-39's stale-claims sweep wrote a fresh stale claim that VH-44 falsified four commits later.

Verify: typecheck 0 · lint 0 · 355 tests · build 0 · docs 0 · links 0 · memory 0 structural · /spike-alpha.html still correct in all three engines after the composite changes · a job completes and restores the controls in the browser

---

README.md
pm_skills/project/decision-log.md
pm_skills/project/trajectory.md
src/config/presets.ts
src/config/thresholds.ts
src/media/audio-plan.ts
src/media/branding-timeline.test.ts
src/media/branding.ts
src/media/composite.test.ts
src/media/composite.ts
src/media/lanes.test.ts
src/media/pipeline.ts
src/workers/job.worker.ts
e5bcc45 2026-08-26 djDAOjones
Raise VH-50: real material misses the loudness invariant
AMCS3059 comes out at -16.75 LUFS against -16 +/-0.5 and -1.98 dBTP against a -2.00 ceiling. Both miss, and conventions.md lists that pair as invariant 2. Verified NOT a regression — re-running the identical file on de0b94f, before this session, gives figures identical to the hundredth.

The worse half is that the acceptance harness passes criterion 2 on synthesised material. A harness that passes the invariant the product misses is worse than no harness, so the item requires a fixture that would have caught it, not just a fix.

---

pm_skills/project/backlog.md
9589d93 2026-08-26 djDAOjones
Archive the overnight run's own memory overflow
Both overruns were created by the run that is now clearing them, which is the right order: leaving them would hand the next session a mandatory prune before it could pick up any work. decision-log splits at its read-tier floor — the latest ten stay live, twelve go verbatim to archive/decision-log-0001-2026-08-25.md. trajectory loses a second phase to archive/trajectory/trajectory-0002-real-material-and-band-1.md. 3,321 to 1,435 words; 22 to 11 entries.

Verify: three diffs per file against the intact original — archived slice, kept header, kept tail — all byte-identical before the swap. Full gate green.

---

pm_skills/project/archive/INDEX.md
pm_skills/project/archive/decision-log-0001-2026-08-25.md
pm_skills/project/archive/trajectory/trajectory-0002-real-material-and-band-1.md
pm_skills/project/decision-log.md
pm_skills/project/trajectory.md
fab13df 2026-08-26 djDAOjones
VH-44: detect the property, not the engine
compose() reads the branding pixels through VideoSample.copyTo where the engine honours a request for RGBA, and through the canvas readback where it does not. No route is portable — copyTo returns the luma plane in Safari, the canvas readback un-premultiplies in Firefox — and their union is.

The ticket proposed probing a known branding frame and comparing expected RGBA. That works and ages badly: the expected values are the ASSETS' values, so re-running build-branding.mjs would silently invalidate the check protecting the assets. Asking allocationSize({format:'RGBA'}) whether it equals width*height*4 tests the same thing — does this engine mean RGBA when it says RGBA — and depends on nothing that can drift. Safari answers 5,184,000 against 8,294,400; Chrome and Firefox answer exactly. Scaling moved out of the canvas into compositeSampled, bilinear, which is well-defined on premultiplied colour.

Firefox over black went from (17,17,17) and (18,40,66) — white inverted to near-black, blue 3.7x too bright — to (74,74,74) and (5,11,18), against a file holding (73,73,73) and (4,10,17). Chrome and Safari unchanged and still correct.

NOT done, deliberately: restoring the two controls VH-45 withdrew. The engineering is finished and verified in three engines, but putting controls back in front of users on a live site is a decision, and VH-32's interface pass may present them differently. Raised as VH-46b.

Verify: typecheck 0 · lint 0 · 353 tests (8 new) · build 0 · docs 0 · links 0 · memory 0 structural · /spike-alpha.html measured in Chrome 151, Firefox 154 and Safari 26.5.2

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/tickets/VH-44.md
pm_skills/project/trajectory.md
src/media/composite.test.ts
src/media/composite.ts
src/media/pipeline.ts
src/spike/alpha.ts
f926eb1 2026-08-26 djDAOjones
Pin the no-aac-encode block in unit tests
The block shipped verified in three real browsers but with nothing in the Node suite holding it. Three assertions: it fires when AAC is refused, it stays quiet when there is no encoder at all, and when both video and audio fail it names the picture rather than the sound.

Verify: full gate green, 345 tests

---

src/media/preflight.test.ts
aa39f03 2026-08-26 djDAOjones
VH-43: verify the odd shapes, and find that Firefox cannot make audio
The shape half is what the item asked for and it passes: 852x480, 4:3, 16:10, mono, 44.1 kHz and silent sources all reach a correct output — aspect preserved, dimensions even, 44.1 conformed to 48, channel count never silently changed, a silent source producing no empty audio track. Synthesised rather than the real lectures, because samples/ is gitignored and a check that depends on it runs on exactly one machine, while the PROPERTIES travel.

It also found something much larger, which is now VH-49. Firefox 154 has the AudioEncoder class and refuses mp4a.40.2 at every bitrate from 64k to 256k and at both channel counts, while accepting Opus and every video configuration we ask for — measured headless AND in a normal window. capability.ts checked only that the class existed, so a Firefox user passed pre-flight, watched a progress bar, and got "Something went wrong" when the audio reached the encoder. Every lecture with sound, in a browser spec 10 lists as supported. capability.ts now asks AudioEncoder.isConfigSupported for the exact configuration the job will use, and pre-flight blocks with no-aac-encode before anything starts, naming a browser that works. What Firefox users should actually GET is a product decision and carries [sign-off].

Verify: typecheck 0 · lint 0 · 342 tests · build 0 · docs 0 · links 0 · memory 0 structural · /spike-shapes.html ALL PASS in Chrome and Safari, and in Firefox with the audio cases honestly skipped · /spike-preflight-audio.html ALL PASS in all three: Firefox blocks with no-aac-encode, Chrome and Safari proceed, silent sources proceed everywhere

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/tickets/VH-49.md
pm_skills/project/trajectory.md
spike-codecs.html
spike-preflight-audio.html
spike-shapes.html
src/acceptance/fixtures.ts
src/media/capability.ts
src/media/preflight.test.ts
src/media/preflight.ts
src/spike/codecs.ts
src/spike/preflight-audio.ts
src/spike/shapes.ts
src/ui/preflight-panel.ts
src/workers/job.worker.ts
c952f58 2026-08-26 djDAOjones
VH-16: make the harness run the path the app actually takes
OpfsWorkspace.createFile prefers a FileSystemSyncAccessHandle and falls back to createWritable() when one is unavailable — and sync handles are worker-only. The harness called runPipeline on the main thread, so every acceptance run this project has done exercised the FALLBACK and never the real path. That is a gap that makes a passing harness worse than none, because it is evidence pointing at the wrong thing. It now drives a fixture through the worker: 81 kB, 4.10s, pass.

Preset comparison moved to a new deterministic camera-motion fixture. On the screen-like default H.264 predicts nearly everything for free and the two presets land within a few percent, so comparing them measured nothing; on a field that changes everywhere every frame they separate properly — 1223 kB against 468 kB, 38%. And the loudness offset now comes from PipelineResult.contentOffsetSeconds rather than BRANDING_DURATIONS.openingSeconds: the pipeline offsets by the clip's actual decoded duration and the two agreed only because the placeholder is exactly 5.000s, so a real asset a few frames off would have shifted every window measured while the harness went on passing.

Verify: typecheck 0 · lint 0 · 342 tests · build 0 · docs 0 · links 0 · memory 0 structural · full acceptance run in the browser: "Finished — nothing failed", with both new checks passing

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/trajectory.md
src/acceptance/fixtures.ts
src/acceptance/run.ts
src/media/pipeline.ts
c79bcc3 2026-08-26 djDAOjones
VH-38: measure silence, not duration
The process request carried a 3,600,000 ms deadline on the whole job — a duration cap of exactly the kind spec section 7 opens by disclaiming, and one that gets slow devices backwards by punishing the machines that most need patience. Worse, it rejected WITHOUT telling the worker, so the job ran on, finished, landed its result in the finished map, and nothing ever released it: the user was told the job had failed while it quietly succeeded and held its output for the tab's lifetime.

The watchdog now resets on every message the worker sends about the request and gives up only after WORKER_SILENCE_LIMIT_MS of quiet. pipeline.ts reports a stage every thirty frames, so a healthy job speaks several times a second however long it runs, which makes silence the question that actually separates a wedged worker from a busy one. Giving up posts cancel first. Extracted as createWatchdog so it is testable without a worker and an hour — including that a late progress message must not resurrect a request whose caller has already been told it failed.

Verify: typecheck 0 · lint 0 · 342 tests (7 new) · build 0 · docs 0 · links 0 · memory 0 structural · browser: a job completes with the watchdog resetting on progress, and a mid-job cancel still settles cleanly and restores the controls

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/config/thresholds.ts
src/core/watchdog.test.ts
src/core/watchdog.ts
src/main.ts
ee0f0cd 2026-08-26 djDAOjones
VH-20: emit the audio chain's tail rather than document the loss
The limiter delays by its look-ahead and the encode path just stopped, dropping that window from the end of every job. The ticket offered a choice — emit the tail, or measure the loss and accept it — and a fact not in the ticket settled it: AudioChain.flush() already existed and analyseSourceAudio already called it. So the analysis pass measured the whole signal while the output dropped its last window, and the meter and the output disagreed about the same audio. Accepting that would have meant writing down the disagreement when the fix was to call a method already there. createContentAudioProcessor returns { process, flush } and feedAudio emits the tail after the last sample.

Verify: typecheck 0 · lint 0 · 335 tests (1 new) · build 0 · docs 0 · links 0 · memory 0 structural · pinned by frame conservation: strictly short before the flush, exact after

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/trajectory.md
src/audio/chain.test.ts
src/media/audio-plan.ts
src/media/pipeline.ts
48788af 2026-08-26 djDAOjones
VH-40: run the guard before anything is written
check:placeholders stops a real lecture recording being copied into a deployed build — the most direct protection the no-egress invariant has — and it ran AFTER build in the gate, and not at all for a bare npm run build, which is precisely what deploy-pages.yml calls. It is a prebuild script now, so nothing writes dist/ without it. A small Vite plugin drops branding/README.md, which the live site was serving with its ticket IDs and build notes. And the worker sets its own minimum log level: it has a separate module scope, so main.ts:32 never reached it and every debug line the job emitted reached a production console.

Two of the item's three claims did not survive checking, and both are recorded rather than acted on. The spike pages do not ship — rollupOptions.input names index.html alone and every spike-*.html returns 404 live. And the sourcemaps expose nothing, because the repository is public: every line they reveal is already on GitHub, while they are what turns a diagnostics bundle from a lecturer's machine into real function names. That rests on visibility rather than on the deploy, so vite.config.ts names the condition to revisit.

Verify: typecheck 0 · lint 0 · 334 tests · build 0 · docs 0 · links 0 · memory 0 structural · prebuild confirmed firing before build · dist/branding/README.md confirmed absent with the assets intact

---

package.json
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/trajectory.md
src/workers/job.worker.ts
vite.config.ts
331d4dc 2026-08-26 djDAOjones
VH-37: report the disease, not the symptom
InvalidVttError was checked in handleInspect and handlePreflight, neither of which parses VTT, and NOT in handleProcess — the only path that reaches offsetVtt (pipeline.ts:293 is its sole caller). A malformed sidecar therefore surfaced as "Something went wrong". The check moved to where the throw is and the two dead branches are gone, so the next reader is not told inspection can produce a subtitle error.

The lane bug was two bugs. Promise.all rejects on the first failure and abandons the second promise, so the survivor kept feeding an Output that was already cancelling and then rejected with nothing awaiting it — and diagnostics.ts hooks unhandledrejection, so that reached the user as a second error they had no way to interpret. settleLanes observes both, aborts the survivor through a signal derived from the caller's, and rethrows the original cause in preference to the CancelledError that cause triggered. Extracted from encode() so it is testable without WebCodecs: seven assertions, including that nothing is left unobserved when both lanes fail independently.

Verify: typecheck 0 · lint 0 · 334 tests (7 new) · build 0 · docs 0 · links 0 · memory 0 structural

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/media/lanes.test.ts
src/media/pipeline.ts
src/workers/job.worker.ts
666df43 2026-08-26 djDAOjones
VH-39: make three stale claims read true
README said "Foundation set, build not started" on the front page of an app that has been live since 2026-08-25; it now says what the pilot is and names what is withdrawn from it. media/branding.ts described the transition modes as not built, two days after they shipped. And presets.ts commented avc1.640033 as level 4.2 where 0x33 is 51, i.e. level 5.1 — wrong in the direction that matters, because 4.2 tops out below the 4K sources spec 2 contains, so anyone trusting the comment would have "corrected" the string into refusing them.

Verify: typecheck 0 · docs:lint 0 · links 0 broken · check:memory 0 structural

---

README.md
pm_skills/project/backlog.md
pm_skills/project/trajectory.md
src/config/presets.ts
src/media/branding.ts
5eabf1b 2026-08-26 djDAOjones
VH-42: measure the branding boundaries against the picture
PipelineOptions.durationSeconds was SourceReport.durationSeconds, which is max(video, audio), and every branding boundary keyed off it. Audio outrunning the picture therefore put the closing where the AUDIO ended — opening a video gap with nothing fed into it — and pushed the composite point past anything the picture reached, so the build silently never appeared. A source shorter than the 1.00s build computed a negative overlay start. The field is now videoDurationSeconds plus audioDurationSeconds, which made the compiler enumerate all four call sites rather than leaving me to find them.

The arithmetic moved out of encode() into a pure closingTimeline(), because inside the pipeline it needed WebCodecs to reach and neither failure exists in the corpus — so no test could express either one, and a defect no test can express comes back. Trailing audio now plays under the closing rather than being truncated, since the real masters carry no audio to collide with; if a future one does, the content yields at the boundary instead, and that branch is pinned too.

Verify: typecheck 0 · lint 0 · 327 tests (14 new) · build 0 · docs 0 · links 0 · memory 0 structural · two synthesised fixtures in /spike-modes.html, since the corpus contains neither shape: audio +2s yields 8.00s where the old code gave 10.08s, and a 0.5s source yields 5.52s via the over-freeze downgrade

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/acceptance/fixtures.ts
src/acceptance/run.ts
src/media/branding-timeline.test.ts
src/media/branding.ts
src/media/pipeline.ts
src/spike/modes.ts
src/spike/real.ts
src/workers/job.worker.ts
7a2555a 2026-08-26 djDAOjones
VH-47: anchor best quality to the source, and only ever downward
The best-quality bitrate is now the geometric mean of spec 6.1's pixelRate x 0.12 anchor and the source's own measured density, clamped to [0.03, 0.12] bits/pixel/frame. The upper bound IS the anchor, so the rule can only lower the figure, never raise it — nothing that runs today can be refused tomorrow for storage it suddenly needs. Teams falls 3.98 to 2.00 Mbps and is still at 1.99x its source; the thinnest corpus file falls to a quarter of today; a well-encoded master is left exactly where it is.

Designed and adversarially verified by an eight-agent workflow. Two of three refuters returned blocking findings against the first recommendation and the design here is the corrected one: a 0.18 bpp ceiling was measured, with real encodes, to add up to 933 MB per file for +0.60 VMAF against a ~6-point JND. That also retired half the ticket's diagnosis — under-serving a pristine master is not a defect when the destination re-encodes on ingest, and the ticket's proposed 1.2x floor would have forbidden the right answer on 7 real files. The unmeasured 2.0x ratio cap was declined for the same reason it was proposed: no measurement behind it.

Two errors of mine from yesterday, found by the scout: MAC_EXPORT carried frame rate 25 where the file measures 1000/33 and conforms to 30, and bitrateWasCappedToSource compared two figures — which would have printed 'already compressed as far as this setting would take it' over outputs running at twice the source. It reads bitrateBasis now. The acceptance harness and spike/real.ts never passed a source bitrate, so both source-relative rules would have shipped having run on no real material.

Verify: typecheck 0 · lint 0 · 313 tests (11 new) · build 0 · docs 0 · links 0 · memory 0 structural · corpus figures re-measured independently with ffprobe (Teams 1005714, AMCS3068 484914, Nonreligion 19105327 all match to the byte) · invariants brute-forced: 0 violations of best>=smaller over 6048 combinations, 0 non-monotonic points

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/doc-deltas.md
pm_skills/project/tickets/VH-47.md
pm_skills/project/trajectory.md
pm_skills/project/wish-list.md
src/acceptance/run.ts
src/config/presets.test.ts
src/config/presets.ts
src/spike/real.ts
src/workers/job.worker.ts
c5049f9 2026-08-25 djDAOjones
Raise VH-47 and VH-48, and promote D10 out of the icebox
Authored by a parallel session on this repo, 2026-08-25; committed here after verification because it was left uncommitted and the tree has to be clean before anything builds on it. Gate re-run clean against it: 302 tests, 0 structural memory failures, 0 broken links.

VH-47 is a fair catch on VH-41: exempting best quality from the never-exceed-source cap was right, but the figure it exempts is pixelRate x 0.12, which never looks at the source — so the Teams recording gets 4.0x headroom and a 20 Mbps camera master gets 0.37x, inverted with respect to the exemption's own purpose. It sequences ahead of VH-31 because an estimate should be grounded against the bitrate that will actually be requested. VH-48 promotes D10 now that VH-24 has disproven half its rejection, and correctly keeps [sign-off] because the codec-parameter-matching objection still stands.

---

pm_skills/project/backlog.md
pm_skills/project/doc-deltas.md
pm_skills/project/tickets/VH-47.md
pm_skills/project/tickets/VH-48.md
de0b94f 2026-08-25 djDAOjones
VH-24, VH-41: the output shape stops lying about the source
Two rules the spec has carried since the 2026-08-25 doc-sync and the code did not. conformedFrameRate withdraws round-to-nearest-standard below 24 fps, so a Teams recording stays at its measured 16.000 instead of becoming 24 with half its frames duplicated; above the floor nothing changes and a PowerPoint export at 30.303 still conforms to 30. inspect now measures the source's real video bitrate from its packets, and the smaller preset's request is capped at it, so the preset named for making files smaller cannot inflate one. The cap is stated in the preflight panel in plain language rather than applied silently. Not applied to best quality, deliberately: that preset's destinations re-encode on ingest, where headroom is what prevents generation loss. The framerate test that asserted the old 15->24 behaviour pinned the defect; it was rewritten to pin the rule, with a comment saying so.

The corpus ticket moved from VH-24 to VH-43, which is the open item still resting on it — the gate's orphan check caught that, and every reference was repointed.

Verify: typecheck 0 · lint 0 · 302 tests (13 new) · build 0 · docs 0 · links 0 · memory 0 structural · browser: a 16 fps source reports "640 x 360 at 16 fps" and the smaller preset shows the cap notice with the estimate falling 324 kB to 82 kB

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/tickets/VH-43.md
pm_skills/project/trajectory.md
src/config/presets.test.ts
src/config/presets.ts
src/media/framerate.test.ts
src/media/framerate.ts
src/media/inspect.ts
src/ui/preflight-panel.ts
src/workers/job.worker.ts
34f9cb4 2026-08-25 djDAOjones
VH-33: withdraw the opening control until an approved asset exists
The checkbox was already defaulted off and captioned "Not yet available... leave this off unless you are testing". That is an instruction, not a constraint, and what it guarded is a published video carrying an unapproved University graphic. Same shape as VH-45: remove the control, keep the capability, restore it when there is something approved to restore (VH-23). The placeholder assets stay and keep shipping, which is harmless — they draw the literal words PLACEHOLDER - opening - 1080p25 and no University branding, so the risk was only ever compositing one into someone's video.

Verify: typecheck 0 · lint 0 · 289 tests · build 0 · docs 0 · links 0 · memory 0 structural · browser: no branding-opening input or helper in the DOM, Branding reads "Add the closing sequence" alone

---

index.html
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/trajectory.md
pm_skills/project/wish-list.md
src/main.ts
29246d2 2026-08-25 djDAOjones
VH-36: the screen locks while a job runs
The bug was not which controls were disabled but that the controls were being REBUILT: showProcessControls ran processActions.replaceChildren() on every preflight, so changing the preset mid-job detached the running job's Cancel and appended a fresh enabled Start — the job became uncancellable and a second one launchable. Start and Cancel are now built once at module scope and never replaced, which also lets the cancel listener be bound once instead of once per Start click. One setJobInFlight flag disables the file, subtitle, preset and branding controls for the duration; VH-32 inherits that model rather than re-deciding it. A second defect found on the way: disabling Start was already happening and was invisible, because .button sets its own colours and a disabled file input still drew a live blue ::file-selector-button. The disabled look drops the fill rather than washing out the text, so it reuses a pair contrast.test.ts already pins at AAA.

Verify: typecheck 0 · lint 0 · 289 tests · build 0 · docs 0 · links 0 · memory 0 structural · browser: preset change leaves both button nodes identical, every invalidating control disabled mid-job, three extra Start clicks inert, cancel at 15% settles cancelled and restores the screen

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/trajectory.md
src/main.ts
src/styles/app.css
4cb1449 2026-08-25 djDAOjones
VH-35: a second tab no longer deletes the first tab's work
The ticket proposed passing the live job ids to the sweep, which fixes nothing — the sweep runs at worker boot, when this context has no jobs, and the directories at risk belong to another tab whose ids it cannot see. A live workspace now holds an origin-wide Web Lock on its directory and the sweep removes only what nobody holds; the browser releases those locks when a tab dies, which is the exact case the sweep exists for. Directory names gained a per-tab session prefix, fixing a second defect found on the way: job-${id} is a per-worker counter, so two tabs both opened job-1. Running the new spike page in all three engines found two more — one undeletable directory abandoned every orphan after it in the sweep loop, and the cancel path was never exercised.

Verify: typecheck 0 · lint 0 · 289 tests (7 new) · build 0 · docs 0 · links 0 · memory 0 structural · /spike-opfs.html ALL PASS in Chrome 151, Firefox 154, Safari 26.5.2

---

AGENTS.md
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
spike-opfs.html
src/acceptance/run.ts
src/media/opfs.test.ts
src/media/opfs.ts
src/spike/opfs.ts
src/workers/job.worker.ts
1b466b4 2026-08-25 djDAOjones
VH-46: make the three-engine check one command
The VH-34 harness was built ad hoc and thrown away, which is the wrong way round: conventions require browser-only checks to be verified in a real browser and recorded, and a recorded check nobody can re-run is weak. scripts/run-in-engines.mjs drives Chrome over CDP, Firefox over WebDriver BiDi and Safari over safaridriver, keying off the <pre id="log"> ... done contract every spike page already shares, so it works on any of them. No dependency — the protocols are already on the machine and Node has a global WebSocket. VH-44 needs it to prove its regression test in three engines. eslint.config.js gains four Node globals in the existing .mjs block; no rule weakened. Also filled 15 missing file-map roles and cleared the two glob lines the generator could not resolve.

Verify: typecheck 0 · lint 0 · 282 tests · build 0 · docs 0 · links 0 · memory 0 structural · 3/3 engines reported a complete run on /spike-alpha.html

---

DEV-INFRASTRUCTURE.md
eslint.config.js
pm_skills/project/decision-log.md
pm_skills/project/file-map.md
pm_skills/project/tickets/VH-44.md
pm_skills/project/trajectory.md
pm_skills/project/wish-list.md
public/branding/README.md
scripts/run-in-engines.mjs
0c9c5c7 2026-08-25 djDAOjones
Archive the Band 0 phase out of the live trajectory
The previous prune predicted the next shipped item would trip the 2,000-word budget, and VH-45 did. Phase 1 moves verbatim to archive/trajectory/trajectory-0001-band-0-mvp.md behind a pointer, and archive/INDEX.md is created as the map of cold storage. 2,069 to 1,358 words, against a 1,400 prune-to target. Three diffs against the intact original proved the split lossless.

Verify: docs:lint 0 · links 0 broken · check:memory 0 structural

---

pm_skills/project/archive/INDEX.md
pm_skills/project/archive/trajectory/trajectory-0001-band-0-mvp.md
pm_skills/project/decision-log.md
pm_skills/project/trajectory.md
3ec6544 2026-08-25 djDAOjones
Correct the deploy trigger: every push to main already publishes
VH-44's note and VH-14 both said the Pages workflow was workflow_dispatch only. It carries push: branches: [main] as well, added when public hosting was accepted — so VH-45's withdrawal went live with its own push. Verified on the deployed site: no branding-mode or branding-style inputs remain in the DOM.

---

pm_skills/project/backlog.md
b169bed 2026-08-25 djDAOjones
Say plainly that the withdrawal is not live until someone deploys
VH-44's note claimed the exposure was closed. It is closed in the code; the Pages workflow is workflow_dispatch only, so the deployed site still offers the two broken controls until a deploy runs.

---

pm_skills/project/backlog.md
55a9fb5 2026-08-25 djDAOjones
VH-45: withdraw the two closing transition controls
VH-34 found over-picture and over-freeze wrong in Firefox, and both were live radio buttons on the deployed site. VH-44's fix is a startup probe with a regression test, so the controls come out first — VH-33's precedent, and reversible when VH-44 lands. Animation goes with them: Fade and Slide differ only during the build a hard cut discards, so syncBrandingOptions was already disabling it on every default job. chosenBranding already fell back to CLOSING_DEFAULTS, so the pipeline keeps all three modes untouched. Spec 4.1 still describes the choice as the user's; recorded as a doc-delta.

Verify: typecheck 0 · lint 0 · 282 tests · build 0 · docs 0 · links 0 · memory 0 structural · DOM checked in the browser (0 mode inputs, 0 style inputs, 2 colour inputs, no console errors)

---

index.html
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/doc-deltas.md
pm_skills/project/trajectory.md
src/main.ts
7491ce3 2026-08-25 djDAOjones
Measure the composite in all three engines, and find it broken in one
VH-34 asked whether compose()'s getImageData readback puts back the engine disagreement the CPU blend was meant to escape. It does. Firefox returns the blue onset 3.7x too bright and overflows the white one past 255, where it wraps to 17 rather than clamping — so a white closing over dark picture inverts. Neither alternative route is portable either: VideoSample.copyTo is right in Chrome and Firefox and returns the luma plane in Safari, which ignores the requested format silently. Ground truth came from ffmpeg reading the onsets straight out of the WebM; the browsers were driven headlessly over BiDi, CDP and safaridriver. The spike closes as VH-44, which carries the numbers a fix has to satisfy, and the claims that outran the evidence are narrowed in composite.ts, the branding README and trajectory.

Verify: typecheck 0 · lint 0 · 282 tests · build 0 · docs 0 · links 0 · memory 0 structural

---

pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/tickets/VH-34.md
pm_skills/project/tickets/VH-44.md
pm_skills/project/trajectory.md
pm_skills/project/wish-list.md
public/branding/README.md
spike-alpha.html
src/media/composite.ts
src/spike/alpha.ts
47df0f1 2026-08-25 djDAOjones
Split VH-24 into the four defects it was actually carrying
One item had five acceptance conditions across five files: the frame-rate conform (VH-24), the never-exceed-source bitrate cap (VH-41), the closing boundary's duration (VH-42), and odd source shapes (VH-43). VH-42 is a wrong boundary on the default path, so it moves up beside the other severe items; the rest stay in the output-shape cluster. The ticket file stays whole as the shared corpus characterisation and gains a fixture map, which also records that VH-42 has no fixture in the corpus and needs two synthesised.

Verify: docs:lint 0 · links 0 broken · check:memory 0 structural

---

pm_skills/project/backlog.md
pm_skills/project/tickets/VH-24.md
e2f6e25 2026-08-25 djDAOjones
Let the specification say what the assets and the corpus actually are
Reconciles docs/01-specification.md against all 12 open doc-deltas in one
signed-off batch, plus 3 consequential edits the ledger had not captured:
§13's acceptance criteria still required both animations and a
variable-frame-rate test source, neither of which exists.

Ten deltas were the spec going stale against code that was already right —
the branding is silent, one 4K25 master per style and colour rather than a
four-variant matrix, four style variants nobody had specified, the alpha is
premultiplied so the operation is compositing rather than concatenation, v1
is closing-only, embedded subtitle tracks cannot be read at all, the frame
rate is measured rather than declared, and colour/HDR was specified nowhere.
Two were the opposite, where the code implements the spec faithfully and the
rule itself is the defect: bitrate targets with no never-exceed-source cap,
and round-to-nearest-standard, which snaps Teams' 16.000 fps to 24.

A follow-on copy-edit then tightened §4.1, §4.3, §6.3 and §8.3 without
dropping a fact, 3,841 -> 3,772 words. The per-engine alpha measurements and
the full corpus counts live in composite.ts and VH-24, so the spec keeps the
rule and the code keeps the evidence. It also corrected a claim the sync
introduced: three files declare 30/1 against a real 30.303, and a fourth
declares a 600 Hz timebase, which is not a disagreement of "about 1%".

Two residual deltas the sync did not reach are captured rather than fixed —
§9.1 still offers an opening toggle, and §8 frames subtitle re-timing wholly
on the opening. Both need their own sign-off.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

docs/01-specification.md
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/doc-deltas.md
pm_skills/project/tickets/VH-22.md
pm_skills/project/tickets/VH-24.md
pm_skills/project/tickets/VH-25.md
pm_skills/project/tickets/VH-31.md
pm_skills/project/tickets/VH-32.md
pm_skills/project/tickets/VH-34.md
pm_skills/project/trajectory.md
pm_skills/project/wish-list.md
f02b416 2026-08-25 djDAOjones
Confirm the alpha divergence is settled, not a passing bug
Firefox 154 returns exactly what 152 did - drawImage over white gives
255, and the frame at t=0.40s reads alpha 69. Two major versions apart,
identical.

That changes what the finding means. A single version disagreeing could
have been a regression about to be fixed; the same answer two majors
later is a settled difference in how Gecko interprets a decoded frame's
alpha. Chrome and Safari say 202, Firefox says 255, and 255 is correct -
so the engine in the right is the odd one out, which helps nobody.

No code changes. composite.ts already does the blend on the CPU; this
records why that is the only option rather than a precaution, so nobody
later moves it onto the GPU on the strength of testing one browser.

The frame-boundary difference is stable per engine too, so it is
rounding rather than flakiness.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/tickets/VH-22.md
pm_skills/project/trajectory.md
public/branding/README.md
src/media/composite.ts
1c08b04 2026-08-25 djDAOjones
Record that the engines disagree on premultiplied alpha
Firefox 152 completes the set - all three supported browsers decode VP9
alpha through the app's own loader, so every closing mode works
everywhere.

The more valuable result is a disagreement. Compositing the onset over
white via drawImage returns 202 in Chrome 151 and Safari 26.5.2 but 255
in Firefox 152: the engines differ on whether a decoded frame's colour
is premultiplied. 255 is correct, so Firefox is the one in the right -
but a composite that is correct in one engine and double-darkened in
the other two is unusable, and behaviour that has to be re-measured per
engine and per version cannot be depended on whichever way a later
release moves.

composite.ts was written to blend on the CPU when only Chrome had been
measured. That now looks less like caution and more like the only
option that renders the same picture everywhere. No code changes; the
reasoning behind it is now recorded where someone would go looking to
"optimise" it onto the GPU.

Also notes that exact frame boundaries resolve differently between
engines - t=0.40s on a 25fps build returned the neighbouring frame in
Firefox - and that the deployed site works on a University machine, so
github.io is not filtered.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/tickets/VH-22.md
pm_skills/project/trajectory.md
public/branding/README.md
src/media/composite.ts
src/spike/alpha.ts
79355f0 2026-08-25 djDAOjones
Give the DSP tests enough time to pass on a CI runner
The first deploy that actually ran the gate in CI failed, and not on an
assertion: three audio chain tests timed out. They push 90-120 seconds
of synthesised speech through the full chain, so locally the slowest
sits at ~3.9s against vitest's 5s default - 23% headroom, which a
shared runner at roughly 1.5x slower erases.

Raised the timeout to 30s rather than shortening the signals, because
the signal lengths are what make the gating and anti-pumping assertions
meaningful. This only changes how long a hung test takes to fail; no
assertion is weakened.

Worth knowing that the previous commit therefore never deployed - the
live site was still the build before it, without the opening-off
change.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

DEV-INFRASTRUCTURE.md
vite.config.ts
c377ad6 2026-08-25 djDAOjones
Default the opening sequence off, and log what the first real use found
The opening toggle defaulted ON with only a generated placeholder behind
it. On a public site that means a real video could ship carrying a
stand-in UoN graphic, which is a brand risk rather than an unfinished
feature. It now defaults off and says plainly what it is; VH-23 carries
the stronger option of removing the control until real assets exist.

Records the browser verification: Chrome 151 and Safari 26.5.2 both
decode VP9 alpha through the app's own loader, so all three closing
modes work in both. Firefox remains unchecked. Both also return
drawImage -> R=202 independently, which confirms the premultiplied
composite is necessary everywhere rather than a Chrome workaround.

VH-31: the estimate said 27.7MB and the app produced 7.5MB on the first
real file anyone ran - reproduced exactly at 27.1MB projected, 3.6x
over. projectedOutputBytes assumes the encoder spends its whole bitrate
budget, and VBR undershoots badly on slide content. It is shown before
the user commits, and it feeds VH-13's published limits.

VH-32: a deliberate interface pass, requested after real use. The
screen accretes rather than progresses, speaks in codecs rather than
outcomes, and never shows moving picture despite being a video tool.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

index.html
pm_skills/project/backlog.md
pm_skills/project/tickets/VH-31.md
pm_skills/project/tickets/VH-32.md
pm_skills/project/trajectory.md
public/branding/README.md
e4df33e 2026-08-25 djDAOjones
Run real UoN material end to end, and enable deployment
The maintainer accepted a public pilot site, so main now deploys
automatically; manual dispatch stays for re-running without a commit.

Adds spike-real.html, which runs an actual recording through the whole
pipeline rather than a synthesised fixture - several §13 criteria are
recorded as "needs real material" for exactly that reason. First run,
on the Mac PowerPoint export: 214.8s in, 218.8s out, which is the 4.00s
hard-cut closing exactly, at 6.3x real time. That is also the first
real performance figure for VH-M2; an hour of that material would take
about ten minutes on this machine.

The new sample is a second PowerPoint family - macOS, Core Media
handler rather than Windows Media Foundation - and the most extreme
declared rate in the corpus: r_frame_rate 600/1, which is the 600Hz
timebase, not a frame rate. Its intervals genuinely alternate between
19 and 20 ticks because 30.303fps is not an integer tick count, so it
is the closest thing to real VFR here. The app still resolves it to
30.303030303030305 with min === max, which is the right answer since we
conform by timestamp.

It also has no audio stream at all. A silent briefing is most likely a
failed export - PowerPoint drops narration when timings and narrations
are excluded - which makes the §5.4 missing-audio warning a real safety
net. Three of twenty-two corpus files are now silent.

Quantifies the bitrate concern too: against this 2.08 Mbps source, the
preset named "smaller file" asks for 2.50 Mbps.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

.github/workflows/deploy-pages.yml
pm_skills/project/backlog.md
pm_skills/project/file-map.md
pm_skills/project/tickets/VH-24.md
spike-real.html
src/spike/framerate.ts
src/spike/real.ts
95d8021 2026-08-25 djDAOjones
Make the build deployable to GitHub Pages
Pages is viable, and the WebCodecs decision is why: nothing uses
SharedArrayBuffer or crossOriginIsolated, so the app needs no COOP/COEP
headers - which Pages cannot set, and which would have made an
ffmpeg.wasm build impossible to host there without a service-worker
hack.

One thing did break. BRANDING_ASSET_BASE was the absolute '/branding',
and a project site serves from '/<repo>/', so every branding fetch
would have 404'd. It now derives from import.meta.env.BASE_URL, and
vite.config.ts takes `base` from BASE_PATH so local dev stays at '/'.
Verified against a real build: the worker bundle - which is what
actually fetches branding at runtime - carries
'UoN-Video-Helper/branding'.

The workflow is deliberately workflow_dispatch only. A Pages site on a
personal account is public and this one carries UoN branding, so the
first publish should be a decision rather than a side effect of a
commit. It runs the full gate before deploying, and derives the base
path from the repo name so a rename or fork cannot silently produce a
site whose asset URLs all 404.

VH-14 is no longer blocked on D5 for the technical work; what remains
is the hosting question itself, plus whether github.io is reachable
from a managed University machine.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

.github/workflows/deploy-pages.yml
pm_skills/project/backlog.md
pm_skills/project/file-map.md
src/config/branding.test.ts
src/config/branding.ts
vite.config.ts
3221c34 2026-08-25 djDAOjones
Log the trim feature, and correct an overstated frame-rate claim
VH-30 records trim as a future feature. Ranged reads are native to
Mediabunny so the mechanics are cheap; the ticket captures the
interactions instead, the sharpest being that loudness must measure the
TRIMMED region - leading silence drags the gated figure and the single
linear gain then mis-levels what the viewer actually sees.

VH-24 claimed the app would trust a declared frame rate and drift ~6s
over a ten minute lecture. It would not. inspect.ts feeds
conformDecision the rate from computeFrameRateMetrics(), which is
measured from packets. Verified against the real AMCS2007 through a new
spike page: the app reports 30.303044932583884 with min === max,
correctly reads it as CFR, and conforms to 30. Trusting the header
would have drifted 0.96s over that file. The claim is corrected in
place rather than deleted, so it is not made again. What remains in
VH-24 is the SNAPPING - 16fps rounds up to 24 - which is a spec
decision, not a bug.

Also guards the build. public/ is copied verbatim into dist, and spike
fixtures are real lecture recordings copied in from samples/ by hand.
Gitignoring them stops a commit but not a build, and this project's
first invariant is that no media leaves the device - a forgotten
fixture in a deployed build would publish someone's lecture. The
placeholder check now fails on anything left in public/spike/.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

.gitignore
pm_skills/project/backlog.md
pm_skills/project/file-map.md
pm_skills/project/tickets/VH-24.md
pm_skills/project/tickets/VH-30.md
scripts/check-placeholders.mjs
spike-framerate.html
src/spike/framerate.ts
3018496 2026-08-25 djDAOjones
Add the branding options UI, and close VH-12
Style, colour and mode are now selectable, behind a disclosure so the
default path stays a single decision - the maintainer's framing was
that hard cut is what nobody should have to think about and the rest
are perks.

One wrinkle worth the extra code: because Fade and Slide share a tail,
the animation choice does NOTHING under a hard cut, which is the
default. A live control that silently has no effect is worse than no
control, so the group disables itself and says why.

BrandingChoice is now one shared type rather than the same shape
repeated across the pipeline, the worker protocol and the worker. Radio
values are validated against the config before use: the DOM is
editable, and an unrecognised mode would reach the pipeline as a string
matching no branch.

Verified in a browser - the full mode matrix drives the disable logic
correctly, every new target clears 44px, all inputs are labelled and
every fieldset has a legend.

Closes VH-12: deletes the now-dead closing placeholders, rewrites the
branding README so the opening guidance does not repeat assumptions the
real closings disproved, and records the outcome in trajectory.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

index.html
pm_skills/project/backlog.md
pm_skills/project/file-map.md
pm_skills/project/tickets/VH-12.md
pm_skills/project/trajectory.md
public/branding/README.md
public/branding/closing-1080p25.mp4
public/branding/closing-1080p30.mp4
public/branding/closing-2160p25.mp4
public/branding/closing-2160p30.mp4
src/config/branding.ts
src/main.ts
src/media/pipeline.ts
src/styles/app.css
src/workers/job.worker.ts
src/workers/protocol.ts
3c58545 2026-08-25 djDAOjones
Wire the three closing modes into the pipeline
The compositor and the freeze picker existed but nothing called them.
Now feedVideo branches on mode: over-picture composites the build over
the closing second of moving picture, over-freeze holds the last clean
frame under it, and hard-cut concatenates as before.

Source and build frames are paired by TIMESTAMP, never by frame order.
The build runs at 25fps and sources do not - a Teams capture is 16fps -
so counting frames would drift them apart across the overlap.
VideoSampleSink.getSample(t) returns the last frame at or before t,
which is the pairing wanted.

Only over-freeze adds time of its own, since it holds a frame under the
build; over-picture plays across source that was going to be there
anyway. findFreezeFrame walks back by random access rather than
buffering a ring of candidates, which would cost 33MB per frame at 4K
to compare brightness.

If the build fails to load, the job degrades to a hard cut and says so,
rather than losing branding altogether.

Verified end to end in a browser (/spike-modes.html): +3.97s, +3.97s
and +4.97s against 4/4/5 expected, with the console confirming the
build is fetched only for the two modes that composite it - duration
alone would not have distinguished over-picture from a silent fallback.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/file-map.md
pm_skills/project/tickets/VH-12.md
spike-modes.html
src/media/freeze.ts
src/media/pipeline.ts
src/spike/modes.ts
e4f1d5f 2026-08-25 djDAOjones
Name the boundary modes with the conventional edit terms
"clean cut" was invented wording. The three modes really differ in what
sits UNDER the graphic's 1s animated build, so they are now named for
that, using terms an editor would recognise:

  clean-cut         -> hard-cut       (cuts straight to the finished card)
  transition        -> over-picture   (build plays over moving picture)
  transition-freeze -> over-freeze    (build plays over a held frame)

"over picture" and "over freeze frame" are also plainer than
"transition" and "transition with freeze frame", which described the
graphic rather than the choice being made - and the choice is whether
the closing second of content matters.

Rewrites the VH-22 ticket around that framing, which brought it back
under its word budget, and carries the implementation notes worth
having to hand: pair frames by timestamp not order (the build is 25fps
and sources are not), and the blend cannot use drawImage.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/tickets/VH-12.md
pm_skills/project/tickets/VH-22.md
public/branding/README.md
src/config/branding.test.ts
src/config/branding.ts
src/media/branding.ts
d7fe01f 2026-08-25 djDAOjones
Trim VH-12 back under its ticket budget
Compresses the sections that had been restated as work landed. No
findings removed - the asset facts live in public/branding/README.md
and the rationale in the decision log.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/tickets/VH-12.md
1256bc0 2026-08-25 djDAOjones
Default to clean cut, and build the pieces the transitions need
Clean cut is now the default: least for a user to think about, per the
maintainer, and it happens to be the most robust choice too - the one
mode that composites nothing, so the default path keeps working even in
a browser that cannot decode transparency.

Measured rather than assumed: canvas drawImage CANNOT do our composite.
Canvas blends in premultiplied space internally but treats a decoded
frame's colour as straight, so it multiplies by alpha twice. Drawing the
white onset (RGB 75, alpha 75) over white returns 202 where the correct
answer is 255 - the exact straight-alpha value. So the blend stays on
the CPU in composite.ts, and BrandingCompositor holds its canvases open
across frames. Its overlay clears to TRANSPARENT, not to the brand
background: during a transition, anything the branding does not cover
must show the picture the mode exists to preserve.

freeze.ts picks which frame "transition with freeze frame" holds. The
hard part is telling a defect from an intention: a black-flashed final
frame must be walked back, but a deliberate fade to black must not be,
or the freeze lands mid-fade. A fade moves repeatedly one way; a flash
is a single jump however large, so a trend needs two significant steps
in one direction. A window that both slopes and ends badly walks back
further than ideal - pinned as known behaviour and documented, since
fitting the slope is more machinery than the case is worth.

15 new tests; 282 pass.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

src/config/branding.test.ts
src/config/branding.ts
src/media/composite.ts
src/media/freeze.test.ts
src/media/freeze.ts
src/spike/alpha.ts
d29d5fc 2026-08-25 djDAOjones
Load the transparent onsets, and check it through the app's own loader
fetchClip now offers both container formats on every branding fetch
rather than choosing by file extension - the tails are MP4 and the
onsets are WebM, and a URL is not a reliable statement about what is
inside it.

loadClosingOnset is kept separate from loadBrandingClip because it is
optional in a way the tail is not: if it returns null the job can still
fall back to clean cut and produce branding, which is what makes an
alpha-decode failure a degradation rather than an outage.

The spike page now exercises the app loader as well as Mediabunny
directly, since that is the path that actually has to work:
loadClosingOnset -> 1.000s, loadBrandingClip -> 4.000s, both passing.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/tickets/VH-12.md
src/media/branding.ts
src/spike/alpha.ts
960d213 2026-08-25 djDAOjones
Add the premultiplied compositor, pinned against the wrong formula
The UoN masters store premultiplied alpha, so the composite is
out = brand + source*(1-a), not the straight-alpha form. Applying the
straight form to premultiplied source multiplies by alpha twice,
darkening the logo and fringing every edge - and it looks plausible,
which is what makes it dangerous.

So the test suite pins the mistake rather than only the fix: a white
logo at half opacity over a white picture must stay white (255).
Straight alpha yields 191, a grey smear where the logo should be
invisible, and that 191 is asserted explicitly so a future
"simplification" fails here instead of shipping. A second test replays
the measured ramp values from the masters over black, so the assets
themselves are checked against what VH-12 measured.

Fully-opaque pixels short-circuit: four of the five branding seconds
are opaque, so that is the common path.

Seven new tests; 267 pass. Also maps the five files added this session.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/file-map.md
pm_skills/project/tickets/VH-12.md
src/media/composite.test.ts
src/media/composite.ts
aedc57c 2026-08-25 djDAOjones
Rewire branding config, and put the real closing asset in the pipeline
src/config/branding.ts now models the two-part closing: style, colour
and mode types, the measured 1s/4s split, closingAddedSeconds(mode) and
modeNeedsOnset(mode). brandingAssetHeight replaces the old frame-rate
variant matching, which had nothing left to match now that only a 25fps
master exists. Opening keeps the older placeholder model, separated and
marked VH-23.

loadBrandingClip('closing') fetches the real tail, so clean cut works
end to end on real assets - that mode is the tail alone. Confirmed in a
browser: the acceptance harness loads
/branding/closing-tail-blue-1080p.mp4 at 4.000s and still finishes
5 pass / 0 fail / 4 need-a-person.

Mode is deliberately not yet a parameter of loadBrandingClip rather
than being accepted and ignored, since the compositor does not exist.

Also replaces a hardcoded 5 in the acceptance harness with
BRANDING_DURATIONS.openingSeconds. AGENTS.md requires numbers to live
in src/config/, and the closing figure is about to become
mode-dependent, so a copy would have drifted silently.

Nine new config tests; 260 pass.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/tickets/VH-12.md
src/acceptance/run.ts
src/config/branding.test.ts
src/config/branding.ts
src/media/branding.ts
0fb5a3d 2026-08-25 djDAOjones
Convert the branding masters, and verify alpha decode in a browser
The spike passed: Mediabunny merges colour and alpha on the CPU, so it
needs only ordinary VP9 decode rather than native browser alpha-video
support. /spike-alpha.html loads each asset, draws it through a canvas
and reads back pixel alpha. Fade reads a uniform 75 and Slide reads
0-255, which cross-checks exactly against the masters - Fade is a
whole-frame opacity ramp, Slide a hard-edged wipe. Chromium only;
Safari and Firefox still need a manual check, which the page exists to
make cheap.

scripts/build-branding.mjs converts the masters into what ships: eight
1s onsets as VP9+alpha WebM, four 4s tails as H.264 MP4. Tails are
deliberately the most compatible format, because "clean cut" uses only
the tail and so survives anywhere alpha decode does not. Two tails, not
four, since Fade and Slide are identical after the onset within a
colour.

Twelve files, 0.74 MB total, against the ~100 MB this ticket first
estimated. The split is frame-exact and the tails measure PSNR 63 dB /
SSIM 0.9999 against the masters. The script refuses to build from a
master that is not 3840x2160 at 25fps and 125 frames, since the split
point and mode durations all depend on that shape.

The app still loads the placeholders - selection and compositing are
not written yet, so nothing references a missing file.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/tickets/VH-12.md
public/branding/README.md
public/branding/closing-onset-fade-blue-1080p.webm
public/branding/closing-onset-fade-blue-2160p.webm
public/branding/closing-onset-fade-white-1080p.webm
public/branding/closing-onset-fade-white-2160p.webm
public/branding/closing-onset-slide-blue-1080p.webm
public/branding/closing-onset-slide-blue-2160p.webm
public/branding/closing-onset-slide-white-1080p.webm
public/branding/closing-onset-slide-white-2160p.webm
public/branding/closing-tail-blue-1080p.mp4
public/branding/closing-tail-blue-2160p.mp4
public/branding/closing-tail-white-1080p.mp4
public/branding/closing-tail-white-2160p.mp4
scripts/build-branding.mjs
spike-alpha.html
src/spike/alpha.ts
526bddd 2026-08-25 djDAOjones
Approve VH-12 and settle the branding choices
Maintainer approved the work and settled the open questions: all four
2025 styles ship, Fade Blue is the default, the 2023 exit animation is
retired, and the shared tail is deliberate - the assets were authored
by duplicating one After Effects composition and varying the onset
animation and colour.

That makes the identical tail a guaranteed property rather than a
coincidence, so the app ships two shared tails (Blue, White) and four
onsets, cutting alpha-carrying material to four seconds total. The tail
is identical within a colour; Blue and White differ throughout.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

DEV-INFRASTRUCTURE.md
package-lock.json
package.json
pm_skills/project/backlog.md
pm_skills/project/decision-log.md
pm_skills/project/tickets/VH-12.md
c30aae4 2026-08-25 djDAOjones
Confirm the clean-frame freeze, and check the code against phone sources
Mode 3 freezes the last CLEAN frame, confirmed by the maintainer. With
21 of 21 corpus sources ending on a bright frame, a corrupt or
black-flashed final frame would be held in full view for a second, so
VH-22 now carries a bounded definition: walk back from the end, reject
luma outliers against their neighbours, fall back to the true final
frame so the mode always produces something.

Mobile formats raised as a likely input class (VH-26). Rotation was
traced end to end through Mediabunny and is correct - the decoder
stamps the file's rotation on each sample, transform() applies it, and
the output shape already uses rotation-corrected display dimensions -
so the UI's "the output will be upright" is honest. Recorded so it is
not re-investigated, with a comment in encoding.ts pinning the footgun:
transform.rotate ADDS to file rotation, so setting it would
double-rotate every tagged phone video.

The real gap is colour. There is no colour-space or tone-map handling
anywhere in src/, and phones record HDR 10-bit by default, so the
picture would be silently washed out or crushed depending on the
browser's canvas conversion, with no error surfaced.

Also restructures the Active section: Band 0 shipped, so its heading no
longer claims to be the current milestone, and the five ticketed items
are summaries rather than duplicating their detail files.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/doc-deltas.md
pm_skills/project/tickets/VH-22.md
pm_skills/project/tickets/VH-26.md
src/media/encoding.ts
2f2ce04 2026-08-25 djDAOjones
Confirm the three boundary modes and trace every anomaly to PowerPoint
Maintainer confirmed the mode definitions, so they are written down with
exact timings: hard transition discards the 1.00s onset (output T+4.00,
no compositing); transition plays the onset over the closing second
(T+4.00, nothing cut but the last second obscured); transition with
still frame sustains the final frame under the onset (T+5.00, nothing
obscured). Modes 1 and 2 share a duration; only 3 is longer.

Since the onset IS the transition in modes 2 and 3, the VH-25 picture
fade-out defaults ON for mode 1 only rather than globally.

Container metadata explains the corpus: all eight frame-rate anomalies
come from one family (PowerPoint / Windows Media Foundation, bare
VideoHandler and no encoder tag), and all twelve professional-tool
exports are clean. PowerPoint exports a nominal 30 fps as 1000/33 and
sometimes declares 30/1 anyway. The 852x480 and 640x480 geometry is
the same family's presets.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/tickets/VH-22.md
pm_skills/project/tickets/VH-24.md
6278285 2026-08-25 djDAOjones
Record that silent branding is intended, not a gap
Maintainer confirms no audio on the graphics is 'more native', so
spec 4.4's audio bed and its -16 LUFS mastering rule are struck rather
than treated as unmet. Flags the shared Fade/Slide tail for
confirmation before it becomes load-bearing.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/doc-deltas.md
pm_skills/project/tickets/VH-12.md
7e6a646 2026-08-25 djDAOjones
Characterise the branding alpha, the Teams recording and boundary fades
The branding alpha is premultiplied, matted with black: on the white
variant, RGB is exactly capped at alpha (16/16, 75/75, 255/255). The
straight-alpha composite the spec implies would double-darken the logo
and fringe every edge, so the formula is brand + source*(1-a).

The assets also factorise. Alpha reaches 255 across the whole frame at
exactly t=1.00s and never drops, and frames after that point are
byte-identical between Fade and Slide. So four 5s masters are really
two shared 4s opaque tails plus four 1s onsets, and only four seconds
of alpha-carrying material ships at all.

The Teams recording is 16.000 fps CFR with zero interval variance
across 29 minutes, so Teams does not produce the VFR the conform path
was built for. Its audio is 16 kHz mono, which prompted a check of the
meter against ffmpeg ebur128: -20.88 against -20.9, LRA matching
exactly, at a third of the rate it was validated at.

Adds VH-25 for boundary fades, where the corpus shows a clear
asymmetry: 21 of 21 sources end on a bright frame, but none end above
-69 dBFS, so the picture always needs a fade and the audio never does.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/doc-deltas.md
pm_skills/project/tickets/VH-12.md
pm_skills/project/tickets/VH-24.md
pm_skills/project/tickets/VH-25.md
pm_skills/project/trajectory.md
864eb36 2026-08-25 djDAOjones
Record findings from the real corpus and branding masters
The maintainer supplied the test corpus (VH-M1) and the branding
masters. Both changed the picture rather than confirming it, so this
records what they showed and reopens the affected tickets.

The branding masters are not the file swap VH-12 assumed: qtrle/argb,
which WebCodecs cannot decode; a 1.00 s alpha ramp meant for
compositing rather than concatenation; no audio bed, which spec 4.4
depends on; and one 4K25 master in four styles rather than the 4.2
matrix of four resolution variants. VH-12 is reopened for sign-off,
with the measurements in a ticket file.

The corpus shows awkward input is the common case: six of 20 files at
30.303 fps, four declaring a rate that disagrees with the actual by
~1%, two with no audio, one mono, one PCM, mixed sample rates and one
at 16:10. That is VH-24.

Adds VH-22 (branding boundary modes: clean cut, transition, transition
with freeze frame) and VH-23 (opening graphics, deferred), and closes
VH-M1 with its coverage gaps folded into VH-M2 and VH-24.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/doc-deltas.md
pm_skills/project/tickets/VH-12.md
pm_skills/project/tickets/VH-24.md
pm_skills/project/trajectory.md
public/branding/README.md
53761fb 2026-08-25 djDAOjones
Close Band 0: consolidated decision log and shipped-phase record
Step 13 housekeeping for the init-mvp run.

- decision-log: one consolidated entry covering the stack choice, the
  MVP cut, the band, and the decisions that shaped the build — including
  why the meter went first, why the audio plan takes three passes, why
  the chain cannot live in the encoder's transform hook, and why the
  encoder delay is measured rather than assumed. 463 words, inside the
  runaway-entry guard.
- trajectory: Phase 1 closed with its outcome line. The eleven shipped
  items each keep one line; the reasoning lives in the decision log.
- Removed the template's example entry now there is a real one.

Memory size check, full sweep — every budget green:
  file-map 1815 / 3955 (derived from 113 mapped files)
  backlog Active 1210 / 1500, 20 open items, no [x] residue
  trajectory 900 / 2000, decision-log 1 entry, wish-list 13 / 25
  doc-deltas 3 open / 10

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/decision-log.md
pm_skills/project/trajectory.md
6f3695e 2026-08-25 djDAOjones
VH-18: cancel the AAC encoder's delay — acceptance criterion 6 passes
The 50 ms of late audio was the AAC encoder's own priming. Measured in
isolation by encoding an impulse at a known time and decoding it back:

  AAC   44.0 ms
  Opus   0.0 ms
  PCM    0.0 ms

The conventional fix is an edit list telling the player to skip the
priming samples. Mediabunny writes none, and the decoder does not strip
them either, so the content simply ends up late — confirmed by reading
the output's boxes and finding no `elst` on either track.

Compensated by shifting the whole audio timeline earlier by the measured
delay. The delay is measured rather than assumed, because it belongs to
whichever encoder the browser provides; when it cannot be measured the
shift is skipped, since shipping a known offset beats applying a number
we never took. It costs the first 44 ms of sound, which on a lecture is
either silence or the start of a branding fade.

Every sample now reaches the encoder through one emit path, so branding
and content shift together. A bed that skipped the shift would sit at a
different offset from the speech.

On a constant-frame-rate source the pipeline now adds 0.0 ms at every
marker, against 44 ms before.

Two flaws in my own instruments, both of which had been reporting the
build as worse than it was:

- The check conflated a systematic offset with frame quantisation. The
  first is what perception responds to and what an encoder can get
  wrong; the second is a marker landing within half a frame period of
  its true time, which no correct encoding removes. They are now
  asserted separately — systematic within 10 ms, spread within one frame
  period — and both are reported either way. This is a separation, not a
  relaxation: the perception threshold still applies to the part it
  applies to, and that part now measures 5.8 ms.
- Drift was the difference between the first and last measurement. On
  data scattered by frame quantisation that is decided by two samples:
  it reported -16 ms where a least-squares fit through all twelve points
  reports +9 ms. Wrong in magnitude and in sign, and it was the only
  thing keeping criterion 6 failing after the real defect was fixed.
  Now fitted across every marker, and pinned by tests that reproduce the
  exact series that exposed it.

Acceptance run: 5 passed, 0 failed, 4 need a person.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/acceptance/measure.test.ts
src/acceptance/measure.ts
src/acceptance/run.ts
src/media/branding.ts
src/media/encoder-delay.ts
src/media/inspect.ts
src/media/pipeline.ts
src/workers/job.worker.ts
ccc1509 2026-08-25 djDAOjones
Backlog: remove a duplicate VH-16 and name the band boundary
The fixture generator was built as part of VH-11 but its earlier entry
was never removed, leaving two items sharing an ID.

More importantly: the band signed off on 2026-08-24 was VH-1..VH-11 plus
the two maintainer items, and all of those are now done. The items added
since were found while building them and sit beyond that ceiling. VH-18
is the exception — it is spec 13 criterion 6, so it belongs to the
original definition of done rather than to new scope.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
483f2b3 2026-08-25 djDAOjones
VH-11: acceptance verification against spec 13
A repeatable in-browser harness at /acceptance.html, so "it works" is a
report with numbers rather than an impression. Development only —
vite.config builds index.html alone, so a test harness never ships.

Result: 4 pass, 4 need a person and are named as such, 1 fails.

  13.2  PASS  -16.01, -16.01, -16.12, -16.08 LUFS across four sources;
              worst deviation 0.12 LU, highest peak -2.15 dBTP
  13.3  PASS  meter within 0.021 LU of EBU Tech 3341
  13.8  PASS  job directories before 0, during 1, after 0
  13.9  PASS  8 requests, all same-origin, none carrying a body
  13.6  FAIL  audio runs about 50 ms late — now VH-18

Criterion 6 is left failing. The harness places paired markers — a white
frame and an audio burst at the same instant — and measures output
against source so the fixture's own frame quantisation cancels. Audio is
consistently late by roughly 50 ms with no trend. ITU-R BT.1359 puts the
detection threshold for audio-after-video at about +45 ms, so this sits
right on the edge and is not dismissable. The temptation is to widen the
threshold; 20 ms came from the perception literature, not from what the
build happens to do.

Two real bugs found on the harness's first run, both invisible from the
app:

- Cancelling during the analysis pass escaped the pipeline's cleanup
  entirely. `throwIfAborted` after planAudio threw before the try block
  that owned disposal, so the job's scratch survived. The app hides this
  because the worker disposes as a fallback; the harness calls
  runPipeline directly and does not. Cleanup now covers the whole
  function.
- The main-thread OPFS path never released its writable, so the
  directory could not be removed. That path is new — added in this item
  so the harness could drive the same pipeline off-worker rather than
  the storage layer being usable in only one context.

Two earlier findings were my own instruments, not the build. Single-frame
sync markers are exactly what frame-rate conform is entitled to drop, and
losing one in twelve read as five seconds of drift; markers are now held
across several frames. And the first egress watch patched XHR, which
lint rightly objected to — the browser's own resource timeline catches
every request however it was made, including from code that does not
exist yet, so it replaces the patching rather than supplementing it.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

acceptance.html
pm_skills/project/backlog.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
pm_skills/project/wish-list.md
src/acceptance/fixtures.ts
src/acceptance/main.ts
src/acceptance/measure.ts
src/acceptance/run.ts
src/media/opfs.ts
src/media/pipeline.ts
src/styles/app.css
vite.config.ts
f13a362 2026-08-25 djDAOjones
VH-10: UI workflow, audio-quality warnings, and saving
The spec 5.4 conditions were undetected, not merely unrendered — the
analysis pass produced the data and nothing derived them. Now detected,
worded, and shown BEFORE processing, because a lecturer told their
recording is inaudible only after forty minutes has been told too late.

Detection and wording are separate modules on purpose: the thresholds
belong with the numbers and the sentences belong where they can be
reviewed as writing. Both are tested. The wording tests check the
mechanical half of "reads clearly to a non-technical reader" — no
implementation jargon, no blame, and always a next step.

One rule needed a guard. Taken literally, "noise floor (10th-percentile
short-term) > -50 LUFS" fires on any recording with no pauses at all,
because there is no quiet passage to measure a floor in and the
percentile just returns the speech level. Spec 5.4 dropped pumping
detection precisely because a false accusation is worse than silence, so
the floor is only assessed where the gaps are at least 10 LU below the
median. A genuinely noisy recording clears that easily — speech at -20
with room tone at -45 is a 25 LU gap.

Saving streams from OPFS straight into the chosen location through the
File System Access API, so a multi-gigabyte result costs no more memory
than a small one. Firefox has no picker and falls back to an object URL,
which does materialise the file — that is the compromise, and the reason
the streaming path is tried first rather than treated as an
optimisation.

The finished file is measured after encoding to answer 5.4's last row,
which is the only warning that cannot be known in advance. Also absorbs
VH-22: branding that was asked for but could not be loaded is now named
in the result, rather than a video quietly arriving without it.

The AAA design review found two real problems. A `section` created at
runtime for the warnings carried no accessible name, and the file
input's browser-drawn button was 32 px against the 44 px floor — WCAG
2.5.5 does not exempt a control because the browser draws it. Both
fixed; the audit then reported no target under 44x44 and no unlabelled
landmark. The 20x20 checkboxes it first flagged were a false positive:
their wrapping labels are the actual target at 862x44.

Verified in a browser:
- A deliberately difficult recording raised "the volume varies a lot"
  (24.8 LU) and "there is a long silent stretch" (32 s), and correctly
  did NOT raise background noise, because 35 s of true silence sets the
  10th percentile well below the threshold.
- Clipping needed a lossless fixture to test end to end: AAC pulled a
  hard-clipped signal down to -1.87 dBFS, leaving nothing to detect. On
  PCM the meter read +0.021 dBTP with 162,070 clipped positions and the
  warning fired.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

index.html
pm_skills/project/backlog.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/audio/analyse.ts
src/audio/truepeak.ts
src/audio/warnings.test.ts
src/audio/warnings.ts
src/main.ts
src/media/audio-plan.ts
src/media/pipeline.ts
src/media/preflight.ts
src/media/save.test.ts
src/media/save.ts
src/styles/app.css
src/ui/warning-text.test.ts
src/ui/warning-text.ts
src/workers/job.worker.ts
src/workers/protocol.ts
66764f9 2026-08-25 djDAOjones
VH-9: subtitle, chapter and metadata handling
Carries non-A/V tracks through where it can, and fails loudly where it
cannot — never loses them silently.

Mediabunny cannot see subtitle or chapter tracks at all: an MP4 it wrote
WITH a subtitle track reads back as zero tracks, verified in Phase A. So
this adds a minimal ISOBMFF box walk that reads handler types and nothing
else. It parses no samples and deliberately understands as little of the
format as it can, because every extra thing it claims to know is another
thing that can be wrong about a file some recorder wrote unusually. A
non-ISOBMFF file reports `scanned: false`, and the UI then says nothing
rather than guessing.

That replaces the standing caveat with something true. Where the scan
finds tracks it names them and says what to do; where it finds none it
can now say so honestly.

The sidecar offset takes spec 8.1 literally — never alter caption
CONTENT, always offset caption TIMING — by rewriting only the timestamps
on `-->` lines and leaving every other byte as it found it. Identifiers,
cue settings, styling blocks, comments and line endings survive because
they are never read. A parse-and-reserialise pass would be tidier and
would have far more ways to quietly change someone's words.

My own test caught an inconsistency worth keeping: a line whose cue TEXT
contains `-->` was counted as a cue by countCues but correctly ignored by
offsetVtt. The WebVTT grammar forbids that, but a file breaking the rule
should be miscounted rather than mangled, so both now ignore lines
carrying no actual timestamp, and agree.

Verified in a browser:

- On a subtitle-bearing MP4, Mediabunny reported 2 tracks and the scan
  reported 3 — vide, soun, text — and the UI said "Found 1 subtitle
  track" with what to do about it.
- A muxed sidecar's sample boundaries read 0 / 7 / 11.5 / 35 / 38.25 s
  against source cues at 2 / 6.5 / 30 / 33.25, so every cue moved by
  exactly the 5 s opening. Chrome does not surface in-band WebVTT from
  MP4 as a text track, so this was read out of the stts box directly.
- Cue text came through verbatim, and file-level metadata tags
  round-tripped including the raw MP4 atoms.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

index.html
pm_skills/project/backlog.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/main.ts
src/media/inspect.ts
src/media/isobmff.test.ts
src/media/isobmff.ts
src/media/pipeline.ts
src/media/vtt.test.ts
src/media/vtt.ts
src/ui/source-panel.ts
src/workers/job.worker.ts
src/workers/protocol.ts
c9cd65b 2026-08-25 djDAOjones
VH-M3: note OneDrive syncing paused as an interim mitigation
Pausing is per-session and reverts on its own, so the item stays open
until the folder is excluded or marked always-keep-local.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
c4cfecf 2026-08-25 djDAOjones
Record VH-8 issues, and a OneDrive failure that broke the build
Bookkeeping plus one operational finding that needs the maintainer.

The quality gate began failing with `ETIMEDOUT: connection timed out,
read` from readFileSync, and `tsc` hung indefinitely. Neither looks like
a storage problem. OneDrive Files-On-Demand had dehydrated
node_modules — 598 cloud-only files in the first 3000 checked — so every
read became a network fetch. `npm ci` rewrites them locally and fixed it
in three seconds.

Worth correcting my own first diagnosis: I thought the Vite dev server's
watcher was contending for the filesystem, because tsc started completing
after I stopped it. It was not. Running `tsc --listFiles` had pulled
tsc's own dependencies back down one file at a time, so tsc got faster
while ESLint — whose files had not been touched — still timed out.
Rehydration was the whole story.

Recorded as VH-M3 [maintainer]: exclude this folder from sync, or mark it
always-keep-local. `.gitignore` has no effect, because OneDrive does not
read it. AGENTS.md already declares cloud-synced paths unsupported for
project memory; this is the same hazard reaching the build. The recovery
is now in DEV-INFRASTRUCTURE under the runtime lifecycle, and the README
gotcha names the two symptoms so they are recognisable.

Also from VH-8:
- VH-21: a source with no audio track drops the branding bed too, because
  the audio output is created only when the SOURCE has audio. A screen
  recording made without a microphone gets branding added silently.
- VH-22: a failed branding fetch warns to the log and continues, so a
  user who asked for branding can get a video without it and never know.
- VH-18 now records that AAC priming was found and normalised in VH-8 and
  is very likely the same root cause, while noting that normalising the
  start does not prove the durations agree.
- VH-12 now records that the real bed must be mastered at -16 LUFS
  because it bypasses the chain, and that eight masters at ~20 Mbps come
  to roughly 100 MB against the placeholders' 1.1 MB.

wish-list: branding assets are fetched with no caching, against spec 11's
offline requirement; and every branding frame is redrawn through a canvas
for brand-colour padding, worth measuring before 4K masters land.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

DEV-INFRASTRUCTURE.md
README.md
pm_skills/project/backlog.md
pm_skills/project/wish-list.md
b5a738a 2026-08-24 djDAOjones
VH-8: branding conform and concatenation
Sequences are prepended and appended, never overlaid, with two
independent toggles giving all four combinations. Eight placeholder
masters cover the four spec 4.2 variants, generated by a local ffmpeg
and committed so the script is optional.

Using ffmpeg here deserves a word, since this project exists partly to
avoid it: that decision governs what the app ships and runs — no GPL in
the bundle, no AVC patent obligation, no wasm memory ceiling. None of it
is engaged by using a locally-installed ffmpeg as an authoring tool for
stand-in files that the real After Effects renders will replace.

The audio chain moved out of the encoder's transform hook, because that
hook sees every sample including the branding bed — which is mastered at
target and must pass through unprocessed (spec 4.4). Levelling it would
undo the mastering, and would do so inconsistently depending on where it
fell relative to the content. The chain now runs in the pipeline's feed
loop, where content and branding can be treated differently.

Mediabunny's fit:'contain' scales correctly but offers no choice of
padding colour, and spec 4.3 requires the brand background behind any
source whose shape does not match. Branding frames are therefore drawn
through our own canvas, which is what conform.ts kept its geometry for.

One real bug, found by running it:

  Timestamps must be non-negative (got -0.0213s)

That is AAC encoder priming — 1024 samples at 48 kHz — surfacing as a
negative first timestamp on the branding clip. Every segment's
timestamps are now taken relative to its own track's first sample. This
was not a fixture artefact: with branding off the content offset is
zero, so any real recording carrying priming would have hit it too, and
it is very likely the same root cause as the 86 ms discrepancy already
logged as VH-18.

Also: a worker failure now appends the underlying reason in development
builds. "Something went wrong" is right for the user and useless for a
maintainer, and this is the one place the real cause is known — it is
what turned a generic failure into the diagnosis above.

Verified in a browser on a 4:3 source, so the padding path was exercised:

- 5 + 8 + 4 produced a 17.04 s timeline at 1440x1080, CFR 25.
- With the D1 token changed to #c8102e at runtime, the padding measured
  rgb(200,15,46) against rgb(200,16,46) expected, while the branding's
  own content stayed distinct and the content frame stayed untinted edge
  to edge. D1 really is a one-line change.
- The opening bed measured -15.71 LUFS against -15.99 standalone, the
  0.28 dB being the boundary fade; the content measured -15.88 LUFS.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

index.html
pm_skills/project/backlog.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
public/branding/README.md
public/branding/closing-1080p25.mp4
public/branding/closing-1080p30.mp4
public/branding/closing-2160p25.mp4
public/branding/closing-2160p30.mp4
public/branding/opening-1080p25.mp4
public/branding/opening-1080p30.mp4
public/branding/opening-2160p25.mp4
public/branding/opening-2160p30.mp4
scripts/gen-placeholder-branding.mjs
src/config/branding.test.ts
src/config/branding.ts
src/main.ts
src/media/audio-frames.ts
src/media/audio-plan.ts
src/media/branding-fade.test.ts
src/media/branding.ts
src/media/encoding.ts
src/media/pipeline.ts
src/workers/job.worker.ts
src/workers/protocol.ts
f02cdbb 2026-08-24 djDAOjones
Record issues surfaced by VH-7
Bookkeeping, no behaviour change.

backlog:
- VH-20: the limiter delays by its 5 ms look-ahead and the streaming path
  never flushes it, so the output loses about 5 ms from the end of the
  audio. Inaudible on a lecture that ends in silence, but undocumented
  behaviour rather than a decision.
- VH-10 now records that the spec 5.4 conditions are undetected, not just
  unrendered — the analysis pass produces the data, nothing derives them
  yet, and that is real work rather than presentation.
- VH-11 now records that acceptance criterion 4 is confirmed "by
  listening and by short-term loudness plot". The plot side is
  automated; the listening side is a maintainer check on real material
  and cannot be claimed without it.

wish-list: the macro-levelling envelope assumes audio starting at t=0
with no gaps; the compressor's RMS detection is a choice inside the spec
that belongs in the decision log at close.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/wish-list.md
288c1bd 2026-08-24 djDAOjones
VH-7: audio chain
Spec 5.2 steps 2-6, each a separate tested module, planned over three
audio passes. The single linear gain has to land the OUTPUT on -16 LUFS,
and steps 2-4 change the loudness on the way — so pass A measures the
source, pass B runs steps 2-4 and measures what they leave, and pass C
applies everything with the gain that pass B made computable. Three
traversals sounds expensive and is not: audio-only decode of an hour
measured around 3.6 s, and estimating what the compressor did instead
would be guessing at the one number the whole stage exists to get right.

Two design decisions worth naming:

- The compressor detects RMS, not peak. A peak detector responds to
  plosives rather than to how loud the talker is, and with a 20 ms attack
  it cannot track a waveform cycle anyway, so the stated 2:1 would never
  quite apply — the first test caught exactly that, missing 2:1 by
  0.72 dB. Sample peaks are the limiter's job; this stage responds to
  level.
- The limiter shares the meter's oversampling filters, so what it catches
  and what the meter reports agree by construction rather than by two
  implementations happening to match. Applied gain is never allowed above
  the minimum required across the look-ahead window, which is what makes
  the ceiling a guarantee rather than a target a smoother might overshoot.

The four anti-pumping properties from rationale 3.3 are each tested
alone: conditional on LRA > 9, a 15 s window, a 1 dB/s slew limit, and a
pause freeze below -45 LUFS. Removing any one turns this into the AGC
the brief was right to worry about.

Verified end to end in a browser, measuring outputs with the
EBU-validated meter:

- A -46.83 LUFS source (inaudible, true peak -38 dBTP) came out at
  -16.03 LUFS — a 31 dB lift landing 0.03 LU from target.
- A drifting source, LRA 14.36, came out at -16.02 LUFS with LRA 8.01
  and true peak -1.99 dBTP, the limiter holding the ceiling exactly.

The pumping test was rewritten to measure the chain's contribution
rather than absolute swing: speech moves between syllables and pauses on
its own, and an absolute threshold cannot tell that apart from pumping.
On the drifting fixture the chain added 0.3 LU to the worst one-second
swing, against a slew limit that caps its contribution at 1 LU.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
pm_skills/project/wish-list.md
src/audio/chain.test.ts
src/audio/chain.ts
src/audio/compressor.test.ts
src/audio/compressor.ts
src/audio/highpass.test.ts
src/audio/highpass.ts
src/audio/limiter.test.ts
src/audio/limiter.ts
src/audio/macrolevel.test.ts
src/audio/macrolevel.ts
src/audio/truepeak.ts
src/main.ts
src/media/audio-plan.ts
src/media/pipeline.ts
test/helpers/signals.ts
ddb62d3 2026-08-24 djDAOjones
Record issues surfaced by VH-5 and VH-6
Bookkeeping, no behaviour change.

backlog:
- VH-18 [sign-off] A/V sync. In VH-6 verification the output audio track
  measured 5.163 s against 5.077 s of source audio and 5.000 s of output
  video. Roughly 86 ms of growth, more than AAC priming alone explains.
  A constant offset that size is near the edge of perceptible on speech;
  drift that grows with duration would be worse and would not show on a
  5-second fixture. Acceptance criterion 6 depends on this.
- VH-19 content-adaptive bitrate. Spec 6.2 sets 1.5 Mbps for screen and
  2.5 for camera; ContentClass exists but nothing sets it, so every job
  takes the higher figure. The probe already decodes three seconds and
  is the natural place to measure it.
- VH-11 now notes that preset comparison needs camera-like motion: on
  near-static fixtures both presets are content-limited and produce
  almost identical files, so the difference cannot be observed.

wish-list: worker bundle now 404 kB and first load is on a managed
network; the time estimate does not yet include the audio chain or
branding; Mediabunny's bestGuessFrameRate read 32.25 on a fixture
averaging 21.96 and we round from that; progress granularity.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/wish-list.md
1380627 2026-08-24 djDAOjones
VH-6: video pipeline
Decode to encode to mux, streaming to OPFS. Frames flow one at a time,
Mediabunny applies backpressure to the decoder when the encoder falls
behind, and bytes land in OPFS as they are produced — memory is bounded
by a few frames, not by file size. Video and audio are fed concurrently,
because feeding all of one first would force the muxer to buffer that
whole track, which is the exact ceiling this design exists to avoid.

Scaling and CFR conform are handed to Mediabunny's encoding transform
rather than hand-rolled, and the calibration probe was rewritten to use
the same Output, the same source and the same config into a NullTarget.
A probe that measured a cheaper path than the real job is the one way it
could be worse than no probe at all.

`fastStart` is set explicitly, per the hard rule. `false` for now: the
moov box lands at the end, which is right for the destinations that
re-encode on ingest. Whether the smaller preset should use 'reserve' for
progressive playback from SharePoint needs a measured packet count and a
real upload to settle, so it is VH-17 rather than a guess here.

OPFS writes go through a FileSystemSyncAccessHandle wrapped as a
WritableStream, not createWritable(). Both satisfy StreamTarget, but
createWritable() stages through a temporary file and copies on close —
at multi-gigabyte output that is a second full write of the whole file.

Verified in a browser against fixtures with exact timestamps, reading
every output back with an independent demux:

- A genuinely variable source (min 10.4 fps, max 55.6 fps, constant
  false, underlying null) produced an output measuring constant true,
  underlying 30, min 30, max 30 — and it plays in a real video element.
- 2560x1440 on the smaller preset produced 1920x1080; 1280x720 stayed
  1280x720, since that preset preserves resolution below 1080p.
- Cancelling mid-encode removed the job's OPFS directory entirely, left
  no result, and said so.

That last test also exposed a leak: completed jobs were retained until
the UI sent `discard`, which depends on the user reaching the save step.
Three unsaved 3 GB jobs would have left 9 GB of scratch. Only the most
recent result can be saved, so only the most recent is now kept —
verified across three consecutive runs.

Also removed FrameScaler and its helpers from conform.ts. Mediabunny's
transform does that work now, and they had no callers; conform.ts keeps
only the fit geometry VH-8 will need for brand-coloured padding.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

index.html
pm_skills/project/backlog.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/main.ts
src/media/conform.ts
src/media/encoding.ts
src/media/opfs.ts
src/media/pipeline.ts
src/media/probe.ts
src/styles/app.css
src/workers/job.worker.ts
src/workers/protocol.ts
47dc1a3 2026-08-24 djDAOjones
VH-5: pre-flight and calibration probe
Answers "will this work here, and how long?" with a measurement rather
than a guess. Capability is asked against the exact encoder configuration
the job will use, never a generic flag: WebCodecs support is
per-configuration, and a browser that encodes 720p may refuse 4K.
Discovering that forty minutes in is the failure this exists to prevent.

The probe decodes and re-encodes three seconds of the real file at the
real output shape — including the scaling the pipeline will pay, so the
estimate cannot flatter the machine — and measures the audio analysis
rate on the same file. Pass 1 analyses audio before pass 2 processes it,
so the audio cost is counted twice.

The verdict is pure and separated from everything that needs a browser,
so all four spec 7.3 outcomes are unit-tested. An unknown storage quota
warns rather than blocks: some browsers decline to report one, and
refusing a job that would have worked is worse than starting one that
might run out, since the failure is recoverable and the source file is
never at risk.

Also adds the two output presets and the conform geometry. The smaller
preset PRESERVES resolution to 1080p and takes its saving from bitrate —
rationale 4.1, and now a test, because halving resolution is the single
most damaging thing that could be done to slide content.

Verified in a browser against a fixture built with exact frame
timestamps rather than wall clock, which also closed both checks VH-4
had to defer:

- A CFR 1280x720 25 fps H.264/AAC MP4 reported 25 fps with no VFR
  warning, and measured 303 fps of encode throughput.
- A source stored 1280x720 with a 90 degree rotation flag reported
  720x1280 display dimensions, warned that the output will be upright,
  and shaped the output to match.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

index.html
pm_skills/project/backlog.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/config/presets.test.ts
src/config/presets.ts
src/config/thresholds.ts
src/main.ts
src/media/capability.ts
src/media/conform.test.ts
src/media/conform.ts
src/media/inspect.ts
src/media/preflight.test.ts
src/media/preflight.ts
src/media/probe.ts
src/styles/app.css
src/ui/preflight-panel.ts
src/workers/job.worker.ts
src/workers/protocol.ts
ba5150d 2026-08-24 djDAOjones
Record outstanding issues across project memory
Bookkeeping, no behaviour change. Everything raised while building
VH-1..VH-4 is now written down where the relevant workflow will find it,
rather than living in a chat transcript.

doc-deltas (protected-doc reconciliations needing sign-off):
- SPEC 6.3 frame-rate rounding snaps a 15 fps source to 24, adding 60%
  duplicate frames; Teams and Zoom drop to 15-20 fps under load.
- SPEC 8.3.2 and 8.3.3 both assume embedded subtitle tracks can be read.
  They cannot, so neither the re-embed branch nor the sidecar-export
  fallback has a reachable path for them.

wish-list: curve memory at 100 Hz, the EBU 20-23 interpretation, worker
bundle size, and the TypeScript 7 pin.

backlog: VH-16 fixture generator (named in DEV-INFRASTRUCTURE but never
written), plus EBU cases 7-8 and TypeScript 7 in the Icebox.

Also reconciled the canonical scripts table, which had drifted in both
directions — `check:placeholders` existed but was undocumented, and
`fixtures` was documented but did not exist. DEV-INFRASTRUCTURE calls
that a defect by its own rule.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

DEV-INFRASTRUCTURE.md
pm_skills/project/backlog.md
pm_skills/project/doc-deltas.md
pm_skills/project/wish-list.md
7ab7b2d 2026-08-24 djDAOjones
VH-4: file inspection
Demuxes a chosen file into a SourceReport — resolution, display
dimensions, rotation, duration, frame-rate metrics, codecs, audio
presence and channel count — and runs in the worker, so the rule that
demuxing never happens where the UI runs holds from the first file.

VFR comes from Mediabunny's own `frameRateIsConstant` and a null
`underlyingFrameRate` rather than a threshold of ours. The conform
decision is separated into a pure module and reports what conforming
costs, which surfaces two consequences of spec section 6.3 taken
literally: an NTSC source duplicates about 1 frame in 1000, and a 15 fps
Teams recording snaps up to 24 and gains 60% duplicate frames. The second
is warned about in the UI.

Verified against a WebM produced by MediaRecorder — deliberately not by
Mediabunny, so the reader was tested against a file it did not write.
That found a real gap: a header-only MP4 with no tracks at all was
reported as a successful read of a zero-length video. A file with no
video track cannot be branded or encoded, so `video` is now non-nullable
on SourceReport and such files are rejected with a message that
distinguishes "sound but no picture" from "nothing here at all".

Also:

- Narrowed the accepted containers to MP4/MOV/MKV/WebM instead of
  ALL_FORMATS, which was pulling every demuxer Mediabunny has. Worker
  bundle 311 kB -> 181 kB, and we no longer advertise reading formats we
  could not then process.
- The dev server honours PORT and falls back cleanly when 5173 is taken.
- Prettier no longer touches Markdown. It pads table cells to align them,
  which rewrote every table in the protected specification set; those
  files are reverted and `.prettierignore` now prevents a repeat.
  markdownlint remains the Markdown authority.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

.claude/launch.json
.markdownlint-cli2.jsonc
.prettierignore
DEV-INFRASTRUCTURE.md
index.html
pm_skills/project/backlog.md
pm_skills/project/conventions.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/audio/analyse.test.ts
src/audio/loudness.test.ts
src/audio/truepeak.test.ts
src/audio/truepeak.ts
src/core/logger.ts
src/main.ts
src/media/framerate.test.ts
src/media/framerate.ts
src/media/inspect.ts
src/styles/app.css
src/ui/format.test.ts
src/ui/format.ts
src/ui/source-panel.ts
src/workers/job.worker.ts
src/workers/protocol.ts
test/ebu3341/signals.ts
vite.config.ts
b039b86 2026-08-24 djDAOjones
VH-3: EBU Tech 3341 compliance gate
Spec section 13 acceptance criterion 3. Table 1 cases 1-6 and 9-23 are
synthesised from their published definitions and asserted inside
`npm run check`, so a change that breaks meter accuracy fails the gate
rather than being discovered by ear.

Worst loudness error 0.021 LU against Table 1's ±0.1; worst true-peak
error 0.265 dB against its +0.2/−0.4. The document's own section 2.9
alignment check (1 kHz stereo at −18 dBFS peak reads −18.0 LUFS) is
included and reads −17.993.

Reading Table 1 properly rather than from recall exposed two defects:

- Cases 10-14 offset their tones by i*20 ms and i*150 ms specifically to
  probe update-rate resolution. On the 100 ms grid implied by BS.1770-4's
  75% block overlap, the best-aligned 400 ms window holds only 360-380 ms
  of a 400 ms tone and reads up to 0.46 LU low — 4.6x the tolerance. The
  accumulator now runs at 10 ms, the gcd of 20 and 150, while gating
  blocks are still taken every 100 ms by stepping ten hops, so the
  integrated measurement is unchanged and still standard-conformant.
- Case 6 is a 5.0 signal, and channelWeights only handled 1, 2 and 6
  channels. Five channels fell through to an all-1.0 fallback, dropping
  the +1.5 dB surround weighting and reading 0.39 LU low.

Known gaps, deliberate and recorded:

- Cases 7 and 8 are real programme segments distributed by the EBU as
  audio. They cannot be synthesised from a description and are skipped;
  cases 3, 4 and 5 exercise the same gating behaviour on derivable
  signals.
- Cases 20-23 rest on an interpretation. Table 1 says the signal is
  "continuous in phase at both sides of the single period" without
  saying how the two frequencies are joined; this builds it with a
  continuous phase accumulator. They pass, but with less margin than
  15-19 (0.265 dB vs 0.024 dB), and that caveat belongs with any future
  failure there.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/audio/loudness.test.ts
src/audio/loudness.ts
test/ebu3341/signals.ts
test/ebu3341/tech3341.test.ts
0cdb9c9 2026-08-24 djDAOjones
VH-2: BS.1770-4 loudness meter and true-peak detector
The component everything downstream trusts, built before anything
consumes it. Pure arithmetic over Float32Array — no AudioContext, no
WebCodecs, no DOM — so the whole meter runs in Node under the EBU
compliance harness that follows in VH-3.

- K-weighting derived analytically at the source's real sample rate
  rather than resampling to fit the standard's 48 kHz table; the table
  is kept as the fixture the derivation is asserted against, and it
  reproduces to 12 decimal places.
- Gated integrated loudness, momentary and short-term curves, and LRA
  per EBU Tech 3342.
- True peak by 4x oversampling: a 49-tap polyphase FIR, odd-length so
  phase 0 is an exact impulse and the reading can never fall below
  sample peak. Exact pruning via the filter's L1 bound skips the
  convolution where no phase could beat the running peak.

Every expected value in the tests is derived from the standards'
equations rather than recorded from a first run. Two cases where the
implementation disagreed with my expectation turned out to be the
expectation's fault, and both are now documented in the tests:

- A stereo 1 kHz sine at -23 dBFS *peak* reads -22.993 LUFS, not a flat
  -23.000. K-weighting's gain at 1 kHz is 0.6977 dB against the
  standard's -0.691 offset, leaving 0.0067 dB — 15x inside the EBU
  tolerance, and the reason the offset exists at all.
- Ten seconds of tone followed by ten of silence reads 0.0656 LU lower,
  because three 400 ms blocks straddle the boundary at partial energy.
  Predicted and observed agree to four decimals. Without the absolute
  gate the silence would have cost 3.01 LU.

One real bug, found by testing rather than assumed away: the true-peak
delay line aliased against itself when a chunk was shorter than the
filter, smearing one sample across the whole window. Chunk-size
invariance is now asserted down to single-sample chunks.

Measured: 3.6 s loudness + 8.8 s true peak projected for a one-hour
stereo file.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

pm_skills/project/backlog.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
src/audio/analyse.test.ts
src/audio/analyse.ts
src/audio/biquad.ts
src/audio/kweighting.test.ts
src/audio/kweighting.ts
src/audio/loudness.test.ts
src/audio/loudness.ts
src/audio/truepeak.test.ts
src/audio/truepeak.ts
src/config/audio.ts
test/helpers/signals.ts
c8c1848 2026-08-24 djDAOjones
VH-1: runnable skeleton with diagnostics and quality gate
Phase B checkpoint 2. The app boots in dev and production, the job worker
round-trips, and an uncaught throw on either thread is captured and
surfaced with a stack. `npm run check` runs seven steps green.

Stack: TypeScript 6.0.3 + Vite 8 + Vitest 4, one runtime dependency
(mediabunny). TypeScript 7 is current but typescript-eslint caps at
<6.1.0, and adopting 7 today would cost the correctness lint the quality
gate depends on. One-line change when the linter catches up.

Two bugs found by testing the worker error path rather than assuming it:

- One worker throw was captured three times — by the worker's own hook
  (correctly, with a stack), by the parent's worker.onerror, and again by
  the parent window's error hook. The worker now claims its own error
  events; the main thread deliberately does not, since that would also
  suppress the browser's console report.
- A runtime worker error flipped the system check to "failed to start",
  which would mislead during a job. Startup failure and runtime error are
  now distinguished by whether the worker has ever answered a ping.

test/contrast.test.ts asserts every rendered text/background pair at 7:1
in both themes, which failed seven pairs on the first palette. Clearing
7:1 against three surfaces only admits the far ends of the Carbon ramp,
so status colour reads as near-black rather than as "red" or "green" —
acceptable only because every status also states its outcome in words.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

.claude/launch.json
.markdownlint-cli2.jsonc
.prettierignore
.prettierrc.json
AGENTS.md
DEV-INFRASTRUCTURE.md
README.md
docs/00-original-brief.md
eslint.config.js
index.html
package-lock.json
package.json
pm_skills/project/backlog.md
pm_skills/project/file-map.md
pm_skills/project/trajectory.md
scripts/check-placeholders.mjs
src/core/diagnostics.ts
src/core/logger.test.ts
src/core/logger.ts
src/core/redact.test.ts
src/core/redact.ts
src/core/version.ts
src/main.ts
src/styles/app.css
src/styles/tokens.brand.css
src/styles/tokens.carbon.css
src/vite-env.d.ts
src/workers/job.worker.ts
src/workers/protocol.ts
test/contrast.test.ts
tsconfig.json
vite.config.ts
82ad18b 2026-08-24 djDAOjones
Populate PM Skills project memory and rulebooks for the MVP build
Phase A of init-mvp: foundation and mandate. Both gates passed —
product readback confirmed, Band 0 (local MVP, no deploy) signed off.

- brief.md, architecture.md, backlog.md, conventions.md populated from
  the docs/ specification set rather than a fresh interview
- AGENTS.md, UI-STANDARDS.md, DEV-INFRASTRUCTURE.md copied from the
  framework templates and fully populated
- Stack fixed: TypeScript + Vite + Vitest, WebCodecs, one runtime
  dependency (mediabunny, MPL-2.0), OPFS working store
- MVP is milestone one: VH-1..VH-11 plus two [maintainer] items, with
  the loudness meter and its EBU Tech 3341 validation moved ahead of
  the pipeline as the highest-risk, lowest-dependency work

Dependency claims verified against mediabunny 1.55.2 rather than its
docs, which corrected four things:

- Subtitle tracks are invisible to Mediabunny, not merely unreadable —
  a subtitle-bearing MP4 round-trips to zero tracks, so detection needs
  our own ISOBMFF hdlr scan (VH-9)
- fastStart must always be set explicitly; left undefined the library
  may choose 'in-memory', which buffers the whole file
- StreamTarget already accepts positioned writes and pairs directly
  with createWritable(), so no bespoke OPFS target is needed
- The worker exists for UI responsiveness, not for sync access handles

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

.editorconfig
.markdownlint.json
AGENTS.md
DEV-INFRASTRUCTURE.md
README.md
UI-STANDARDS.md
check-links.mjs
pm_skills/project/architecture.md
pm_skills/project/backlog.md
pm_skills/project/brief.md
pm_skills/project/conventions.md
92e9791 2026-08-24 Joe Bell
Reinstall PM Skills framework at v4.9.2
Erased and replaced the v4.6.0 install rather than running the upgrade
procedure — nothing had been customised and no project memory was
populated yet, so a clean replace is simpler and carries no merge risk.

Re-exported via scripts/package.mjs: 49 manifest-verified files (was 46).

New since 4.6.0:
- integrations/dispatch.md — parallel dev across multiple chats
- scaffold/gen-backlog.mjs + check-memory.mjs — optional records-mode
  backlog tooling and memory validator
- memory-maintenance.md gains a sixth verb, Re-assess

Verified init.md and integrations/init-mvp.md keep the same step
structure, so docs/04-init-prompt.md remains accurate; updated its
version reference and noted that prose backlog (not records mode) is
the right default for a solo v1.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

README.md
docs/04-init-prompt.md
pm_skills/CHANGELOG.md
pm_skills/GUIDE.md
pm_skills/MANIFEST.md
pm_skills/VERSION
pm_skills/init.md
pm_skills/integrations/dispatch.md
pm_skills/integrations/next.md
pm_skills/project/backlog.md
pm_skills/prompts/backlog-authoring.md
pm_skills/prompts/end-of-task.md
pm_skills/prompts/memory-maintenance.md
pm_skills/prompts/release.md
pm_skills/prompts/session-start.md
pm_skills/prompts/upgrade.md
pm_skills/scaffold/check-memory.mjs
pm_skills/scaffold/gen-backlog.mjs
fad297a 2026-08-24 Joe Bell
Add PM Skills initialisation prompt
Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

docs/04-init-prompt.md
2767039 2026-08-24 Joe Bell
Add specification v2, technical rationale and open decisions
Resolves the brief's open questions with researched recommendations.

Key architectural finding: ffmpeg.wasm cannot meet this brief. Its output
is bounded by wasm linear memory (~2GB), H.264 encoding requires GPL x264
plus an AVC patent licence, and multithreading needs COOP/COEP headers a
static University host may not permit.

Specified WebCodecs + Mediabunny (MPL-2.0) instead: streams to OPFS so long
files are feasible, uses the browser's own licensed encoder, and needs no
special response headers.

Also resolves two contradictions in the original brief: subtitle timing
must be offset when branding is prepended, and 'windowed loudness
normalisation' needs conditional application with slew limiting to avoid
causing the pumping it aims to prevent.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

README.md
docs/00-original-brief.md
docs/01-specification.md
docs/02-technical-rationale.md
docs/03-open-decisions.md
f46bcf0 2026-08-24 Joe Bell
Install PM Skills framework v4.6.0
Exported from djDAOjones/PM-Skills-lab via scripts/package.mjs
(46 manifest-verified files under pm_skills/).

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

---

.gitignore
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
```
