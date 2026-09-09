<!-- field-report: project=vinyl-sorting · date=2026-09-01 · type=export
     · pm-skills=pm-next-v0.2 (lab/next of djDAOjones/PM-Skills-lab at 530637a, vendored 2026-08-30; no canon release governs it)
     · source=git log --name-only through snapshot 60c3c4b55dba25c52e6e0ba9a8bbf3fc9ea88f88, newest first, taken 2026-09-09 by Claude Code
     · redaction=0 checkout path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 114 e-mail address(es) replaced; no credential-shaped values found
     · retained=public names Joe and djDAOjones, the public Worker subdomain joe-2d2 and the Discogs account name walter_odington retained where present — every one already public in the project's committed files; no unpublished identity was intentionally added -->

# Full Git log

<!-- FILE: git-log-through-60c3c4b55dba25c52e6e0ba9a8bbf3fc9ea88f88.txt -->

commit 60c3c4b55dba25c52e6e0ba9a8bbf3fc9ea88f88
Author: djDAOjones
Author date: 2026-09-01T23:44:27+01:00
Commit date: 2026-09-01T23:44:27+01:00
Subject: SPIKE-PHOTO-TO-FIELDS: the round trip runs, and the two faults it found are fixed

Crate 3 — six records, 34 photographs — went up blind and came back
scored. It fails at 7 exact, 1 refused, 14 wrong, and the failure is
almost entirely schema: ten of the fourteen are two documents answering
different questions, and the check the spike exists for never ran at
all, because the typed sheet had no `decoy_numbers` column. The report
still printed "decoy numbers reported as catalogue numbers: 0 — must
be 0", which reads as a pass on an untested condition.

Of the four values that did test reading, the reading was right on
three. 487 is the case in miniature: the cover wreath says `M. 2316`,
the disc says `AM-2316`, and the sheet took the sleeve — so the scorer
counted the disc against the decoy. The ground truth is a reading too,
and nothing in the harness accounts for that.

Two faults the run exposed, both now tested:

- `parseChatReply` dug the JSON array out only when the reply did not
  START with `[`. An answer that led with its array and explained
  itself underneath went to JSON.parse whole and was rejected as
  malformed. Both of this run's replies took that shape. It now scans
  to the matching bracket, tracking string state, so a bracket inside a
  value cannot end the array early and prose after it cannot extend it.
- A blank skeleton row scored as five wrong answers rather than reading
  as untyped. `photos-pull` seeds one per photographed record and an
  empty cell means "the label does not carry it", so an untyped row was
  scored as a sheet saying nothing — row 484 lost four correct readings
  that way, and 35 skeletons were listed as "typed but never read
  back". The scorer now applies the same test `photo-import` already
  used to decide whether an answer existed; the two disagreed, and that
  was the bug.

Photographs are no longer the blocker. 42 records are on disk, 37 have
readings, and 31 of those were read before any answer existed and are
still untyped — above the twenty this record asks for. What is short is
ground truth in the scorer's own seven columns.

Three features raised by the maintainer while testing:

- NAV-HOME — `g`+`h` is keyboard-only, the manifest opens on /capture
  by design, and a home-screen PWA has no address bar, so the phone
  reaches one screen and cannot leave it.
- RECORD-EDIT-PHOTOS — delete, add and split all need a person to SEE
  the shots, and /browse lists them by key precisely because serving
  one needs a Worker GET a sign-in-free v1 refuses to have. Blocked on
  that one question rather than on three work items.
- PHOTO-CULL — 7 of crate 3's 34 shots repeated a corner already
  captured. Rules proposed, the load-bearing one being propose-never-
  delete: the subset test runs on an extraction, so a reading that
  missed a number would mark the only shot carrying it as redundant.

SPIKE-PHOTO-TO-FIELDS is 945 words against a 600 soft budget even after
the run detail moved to notes.md beside the run. It now carries two
eras — the build and the first measurement — and wants splitting.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/label-photos/Book2.csv
data/label-photos/ground-truth.csv
data/label-photos/row-ids.csv
data/photo-runs/opus5-2026-09-01-crate3/extract.json
data/photo-runs/opus5-2026-09-01-crate3/notes.md
data/photo-runs/opus5-2026-09-01-crate3/reply-01.txt
data/photo-runs/opus5-2026-09-01-crate3/reply-02.txt
data/photo-runs/opus5-2026-09-01-crate3/score.md
project/backlog.md
project/records/NAV-HOME.md
project/records/PHOTO-CULL.md
project/records/RECORD-EDIT-PHOTOS.md
project/records/SPIKE-PHOTO-TO-FIELDS.md
tools/lib/photo-fields.mjs
tools/photo-score.mjs
tools/test/photo-extract.test.mjs
commit d488a3932c31b65ae21ce8b21bc69e48a1a2444b
Author: djDAOjones
Author date: 2026-09-01T00:53:07+01:00
Commit date: 2026-09-01T00:53:07+01:00
Subject: APP-RENAME: old Worker deleted, and the record reduced to the one thing left

deep-groove is gone and answers 404; vinyl-sorter serves all five
screens against the same D1, R2 and KV, with one cron trigger. What
remains is EDIT_TOKEN, which is per-script and cannot be moved by
anyone but the maintainer — its value exists nowhere but in a person's
head and the deleted script, and AGENTS.md bars pasting a passphrase
into a transcript.

Verify: deep-groove /api/health 404, vinyl-sorter 200 with 484 items.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/records/APP-RENAME.md
commit ba3c8a0ba493a834b10c9b07ed994423ebe324e6
Author: djDAOjones
Author date: 2026-09-01T00:47:15+01:00
Commit date: 2026-09-01T00:47:15+01:00
Subject: CATALOGUE-CONTROLS: show the reading, so the mop-up crate names discs

The mop-up view shipped as nineteen rows of dashes. Those rows are
photo-only: their capture columns are empty and their values live in
raw_value, which the list never selected. A filter that produces a list
of ids answers "how many" and not "which discs do I go and find".

The reading gets its OWN columns rather than being COALESCEd into
capture's — merging them would erase the distinction the whole project
rests on, that capture is what a person read and a reading is what a
machine read off a photograph. They render in italic, because the
provenance rule requires an unconfirmed value be shown AS unconfirmed
and a table of 484 rows has no space for the sentence the detail panel
uses. A preset may now set columns too, so mop-up shows what it is for.

Verify: npm run gate 286 passing. Also added a check that no backtick
appears inside a SQL comment in a Worker template literal — that trap
broke the build three times today.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

src/browse.css
src/browse.ts
worker/index.ts
commit a518a2ca5d601a3d7ff71d2629d64e658b4f7d1f
Author: djDAOjones
Author date: 2026-09-01T00:35:38+01:00
Commit date: 2026-09-01T00:35:38+01:00
Subject: Review queue de-duplication, and the collection screen's controls

Two things, and the first was found by looking at the LIVE queue rather
than by a test. Making re-running normal (MATCH-REVERIFY-SWEEP) meant a
swept row that still cannot auto-accept writes a SECOND needs-review
run — and /api/review-queue selected per RUN, so the same disc would
have appeared twice. A sweep meant to refresh the queue would have
doubled it, one disc at a time, while every individual row was correct.
Now the newest run per item, with a test; match-stats gains an
item-level count because "how much work is in the queue" is a question
about discs, not runs.

CATALOGUE-CONTROLS lands its interface half: 22 columns each declaring
how to read and sort itself, any of them choosable, five named views,
and the whole view in the URL so it can be bookmarked or sent.
?view=mop-up lists the discs photographed, read, and still unresolved —
the crate to re-shoot, which the 2026-08-31 ruling had no mechanism
behind. Absent values sort LAST in both directions: a null is not a
small number.

Value and genre stay open; both need data the database does not hold —
a price backfill and migration 005 — and the record says so.

Verify: npm run gate 286 passing. In the browser: the mop-up preset
produced a shareable URL, sorting round-tripped through it, a pasted
URL restored preset + columns + sort, the detail panel and Escape still
work, and the table scrolls inside its own box at 375 px.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

README.md
project/backlog.md
project/records/CATALOGUE-CONTROLS.md
src/browse.css
src/browse.ts
src/home.ts
tools/test/admin.test.mjs
worker/index.ts
commit 81ea3c40452f2d7639853a3bf648c0b7aa7f63d1
Author: djDAOjones
Author date: 2026-09-01T00:15:19+01:00
Commit date: 2026-09-01T00:15:19+01:00
Subject: APP-SETTINGS + MATCH-REVERIFY-SWEEP: settings, export, and a sweep that advances

Device settings open; the re-verify toggle and a JSON/CSV export behind
the shared passphrase; token entry, resetting and roster editing left
at the command line, with the page saying why rather than leaving a
gap. The export is fetched as a blob because an <a download> sends no
headers — the same shape of bug that 401'd every photograph.

The sweep is ordered by match_run.ran_at, NOT last_verified_at. That
column is written only by resolveRun, when a person settles a row, so
the matcher never changes it: a sweep ordered by it would hand back the
same oldest rows every five minutes for ever while looking correct. Add
never-matched-first, never-a-confirmed-row, and a daily cap that exists
because the cost is the maintainer's evening rather than money.

Verify: npm run gate 284 passing (275 + 9 new), including the ordering
test that would have caught the loop. In the browser: the toggle
round-tripped to the server, the CSV came back with a header and a row
per record, the same request without the passphrase was 401.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

.claude/launch.json
project/backlog.md
project/decision-log.md
project/records/APP-SETTINGS.md
project/records/MATCH-REVERIFY-SWEEP.md
project/trajectory.md
src/settings.ts
tools/test/admin.test.mjs
worker/admin.ts
worker/index.ts
worker/match/run.ts
commit 0a8e848d384b5c415bb6a8e770dbadd762cce063
Author: djDAOjones
Author date: 2026-09-01T00:09:07+01:00
Commit date: 2026-09-01T00:09:07+01:00
Subject: MATCH-OTHER-NUMBERS: try the rest of the label

other_numbers has been extracted into data/photo-extract.json since the
spike and consumed by nothing. It now reaches raw_value, is read by
pendingRows, and builds a second ladder spent only on a row the first
one failed to place — 480's "SUA 10639 Mono" and 469's "642 273 GL"
were sitting in the same JSON as the number that found nothing.

The trigger counts FAMILIES, not points, and the first draft had this
wrong: a candidate collects 5 points just for being a vinyl LP, so
`score > 0` let a field of unrelated records read as "scored something"
while placing nothing. A test caught it on that exact row.

The alternatives join the scoring variants unconditionally but stay ONE
family — two numbers printed on one label are one label, and counting
them separately would let a row clear the corroboration gate against
itself.

Verify: npm run gate 275 passing (271 + 4 new): the held-back ladder,
the newline/pipe split, the row that must not pay for the fallback, and
the row that must.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/decision-log.md
project/records/MATCH-OTHER-NUMBERS.md
project/trajectory.md
tools/photo-promote.mjs
tools/test/matcher.test.mjs
worker/match/queries.ts
worker/match/run.ts
commit 895c3226159a3ee81f7cd20a419933fe5b09ff36
Author: djDAOjones
Author date: 2026-09-01T00:03:46+01:00
Commit date: 2026-09-01T00:03:46+01:00
Subject: CAPTURE-GUIDANCE: say what to shoot, and let the number survive

A ranked sheet on first launch — disc label first, then sleeve back,
then runout, then anything that disagrees — recallable from the header.
The stored long edge goes 1568 to 2048 after item 481's catalogue
number was resized out of its own file, and a tap on any thumbnail
opens it full size while the disc is still in your hand.

Framing is the dominant fix and the arithmetic is in the constant's
comment: a whole 12" disc leaves ~16 px a character, the label filling
the frame leaves ~50. Full resolution was refused — 5x the storage to
buy less than the guidance gives away free.

The camera ask rose 3840 to 4096 so the "ask at least twice what you
store" test keeps its invariant; the suite now also PINS
PHOTO_LONG_EDGE, which it did not before, so this is strictly stronger
coverage rather than an adjusted threshold.

Verify: npm run gate 271 passing; sheet shown on first launch,
dismissed to vs.guide=seen, reopened from the header; capture stayed
dark under a light system preference.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/archive/decision-log-2026-08.md
project/backlog.md
project/decision-log.md
project/records/CAPTURE-GUIDANCE.md
project/trajectory.md
src/guidance.ts
src/main.ts
src/queue-logic.ts
src/style.css
tools/test/queue-logic.test.mjs
commit 0e676f0cd0f1e89b011428aa527fbebbf1dbe63c
Author: djDAOjones
Author date: 2026-08-31T23:55:49+01:00
Commit date: 2026-08-31T23:55:49+01:00
Subject: REVIEW-CARD + APP-KEYS: the sleeve, and five states instead of two

Discogs sends thumb and cover_image on every search and SearchResult
declared neither, so both were parsed away while a reviewer holding a
photograph was asked to match it against a line of text. Now stored in
signals_json at no extra request. Each candidate also says field by
field how the reading stands against it — with `unread` and `unknown`
separated from `differs`, because 267 queued rows have no label and a
red mark that also means "nothing to compare" gets ignored.

APP-KEYS closes here too: it shipped inside chrome.ts with the design
system, and this is the commit where its done-when was actually
verified end to end.

Verify: npm run gate 271 passing; hotlink checked for real, not
assumed — one live search returned i.discogs.com URLs and the image
decoded at naturalWidth 150 with referrerpolicy=no-referrer; queue
rendered in both themes; `?` and `g c` driven from real key events.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/decision-log.md
project/records/APP-KEYS.md
project/records/REVIEW-CARD.md
project/trajectory.md
src/review.css
src/review.ts
tools/dev-api.mjs
worker/discogs.ts
worker/match/run.ts
worker/match/score.ts
commit ca5157a509b3676189fbcd6e902857ddf37bb065
Author: djDAOjones
Author date: 2026-08-31T23:42:39+01:00
Commit date: 2026-08-31T23:42:39+01:00
Subject: DESIGN-SYSTEM + APP-HOME-HUB: one language, and a front door

Tokens, components and shared chrome under all five screens, plus a
hub at / with capture moved to /capture.html. The two close in ONE
commit rather than two, against the per-item rule: a hub has nothing
to be built from without the system, and the system's header has
nowhere to link without the hub, so splitting them would have
committed a knowingly-broken intermediate — the go-keys pointing at a
/capture.html that did not exist yet — for the sake of the ceremony.

Verify: npm run gate 271 passing; five screens rendered at 1100 px and
375 px in both themes; `g c` navigated; `?` opened the card; the
service worker's offline navigation fallback is path-aware so capture
with no signal still gets the camera.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

.claude/launch.json
browse.html
capture.html
index.html
project/backlog.md
project/decision-log.md
project/records/APP-HOME-HUB.md
project/records/DESIGN-SYSTEM.md
project/trajectory.md
public/manifest.webmanifest
public/sw.js
review.html
settings.html
src/app.css
src/browse.css
src/browse.ts
src/chrome.ts
src/home.css
src/home.ts
src/main.ts
src/review.css
src/review.ts
src/settings.css
src/settings.ts
src/style.css
src/tokens.css
vite.config.ts
commit 95dd11c8fbc73f43d2ad4f28c536f2c1421d4897
Author: djDAOjones
Author date: 2026-08-31T23:26:03+01:00
Commit date: 2026-08-31T23:26:03+01:00
Subject: APP-RENAME: the app answers at vinyl-sorter, with its data intact

The Worker name IS the workers.dev hostname, so renaming it is a
redeploy — and the bindings reference a UUID and a bucket, so all 484
items and every photograph came across untouched. wrangler.toml's
claim that this meant a migration was wrong and is now corrected in
place, along with the README and the brief.

Verify: npm run gate 271 passing; live checks against the new URL —
health 484 items, /api/photos served 512 KB over a COOKIE the way an
<img> sends it, unnamed caller still 401, all three screens 200.
EDIT_TOKEN and deleting the old script are the maintainer's, and the
record says why the old one is still up.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

README.md
project/backlog.md
project/brief.md
project/records/APP-RENAME.md
wrangler.toml
commit fddb7604df7cecf257dc78a2dc4a2b2544050903
Author: djDAOjones
Author date: 2026-08-31T23:20:53+01:00
Commit date: 2026-08-31T23:20:53+01:00
Subject: Upkeep: scope the thirteen-point interface brief

Eleven records for the maintainer's 2026-08-31 brief and the three
triage points that followed it, with the four decisions taken up front
recorded where the work is: rename and delete the old Worker, settings
that stop at export, a manual reading loop, and a full redesign. Five
feature ideas to the wish-list; _meta intents rewritten to say what
current and next now mean.

Verify: check-memory 0 failures (1 pre-existing warning), gen-backlog
--check clean, Active 1497 words / 23 items.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/records/AI-ROUND-TRIP.md
project/records/APP-HOME-HUB.md
project/records/APP-KEYS.md
project/records/APP-RENAME.md
project/records/APP-SETTINGS.md
project/records/CAPTURE-GUIDANCE.md
project/records/CATALOGUE-CONTROLS.md
project/records/DESIGN-SYSTEM.md
project/records/MATCH-OTHER-NUMBERS.md
project/records/MATCH-REVERIFY-SWEEP.md
project/records/REVIEW-CARD.md
project/records/_meta.md
project/wish-list.md
commit 82622e0585ff48d637d578f0ddaf267483f006e2
Author: djDAOjones
Author date: 2026-08-31T23:13:01+01:00
Commit date: 2026-08-31T23:13:01+01:00
Subject: SPIKE-PHOTO-TO-FIELDS: the second crate read, and what it exposed

Seventeen sleeve-only records read by ChatGPT desktop, imported under
id checks and rotated upright; the run is archived beside the first.
Three wish-list entries follow from what the reading showed rather than
from what it said: it never once refused, so a value read off a sleeve
is indistinguishable from one read off a disc; item 480's mono/stereo
pair is recorded and nothing tries the alternative; and the mop-up
ruling needs a filter naming the unresolved rows or the crate is
assembled from memory.

Verify: photo-import 17/17 ids accepted, none rejected or duplicated;
photo-rotate 23 turned, 29 already correct; photo-score reports nothing
measurable, as expected with no typed truth; check-memory 0 structural
failures (the M2-DISCOGS-PACING WARN predates this); gen-backlog
--check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/label-photos/rotations-applied.json
data/photo-extract.json
data/photo-runs/gpt-desktop-2026-08-31-crate2/extract.json
data/photo-runs/gpt-desktop-2026-08-31-crate2/reply-01.txt
data/photo-runs/gpt-desktop-2026-08-31-crate2/reply-02.txt
data/photo-runs/gpt-desktop-2026-08-31-crate2/reply-03.txt
data/photo-runs/gpt-desktop-2026-08-31-crate2/reply-04.txt
data/photo-runs/gpt-desktop-2026-08-31-crate2/reply-05.txt
data/photo-runs/gpt-desktop-2026-08-31-crate2/reply-06.txt
project/wish-list.md
commit 1174260002fb30b6ac57d4de3ea081e19d2146f9
Author: djDAOjones
Author date: 2026-08-31T22:21:49+01:00
Commit date: 2026-08-31T22:21:49+01:00
Subject: Upkeep: photograph the disc label, not only the sleeve

The second crate came back sleeve-only, which is where the decoys are —
mono/stereo pairs, LP beside tape, export beside domestic, and adverts
carrying another record's catalogue number — so the ruling is stated
where a person reads before walking a crate, and the mop-up for rows
that will not identify is on the wish-list rather than assumed. Also
gitignores the unread pack, following the photo-resplit precedent.

Verify: check-memory 0 structural failures (the one WARN, M2-DISCOGS-PACING
at 627 words, predates this and is untouched); gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

.gitignore
README.md
project/wish-list.md
commit ef18de5b680eb6b3462f8b28a2fe5c1f64a4cbb5
Author: djDAOjones
Author date: 2026-08-31T21:35:11+01:00
Commit date: 2026-08-31T21:35:11+01:00
Subject: Upkeep: row-ids.csv after the 453/466 split re-pull

Regenerated output, tracked because photo-pack reads it to tie a
reading back to a record. The split moved six photographs to item 466
and photos-pull renumbered both halves.

Verify: npm run gate green (271); check-memory 0 structural failures;
gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/label-photos/row-ids.csv
commit f339526ad931b41bd6589208fb42749c14bd54de
Author: djDAOjones
Author date: 2026-08-31T17:03:42+01:00
Commit date: 2026-08-31T17:03:42+01:00
Subject: TRACKLIST-CAPTURE: the fetch was starved, and a known release gained nothing

Two matches were auto-accepted after the tracklist code deployed and
release_track stayed empty. The code read as correct; it was never
reached.

The fetch runs LAST and opens by checking the budget, so a ladder that
spent everything left it nothing. Item 453's own reason said so —
"stopped at 10 of 12 queries: subrequest budget" — and the fetch then
returned no tracks without complaining. budgetSpent now takes a
reserve, and the ladder holds back one query's worth of attempts for
the fetch that follows it.

Separately, upsertRelease returned early for a release it had seen
before, so the 267 seeded releases — every record catalogued before the
app existed — could never acquire a tracklist, being exactly the
releases already present. A known release now gains one if it has none,
and is left alone if it has some.

Verify: npm run gate green (271), with a client whose budget is tight
enough that a greedy ladder would starve the fetch, and a second item
matching the same release not duplicating its tracks.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

tools/test/matcher.test.mjs
worker/discogs.ts
worker/match/run.ts
commit 45f83d9b9d572b2a6298a5d0615e4ffa06d54d8d
Author: djDAOjones
Author date: 2026-08-31T16:43:10+01:00
Commit date: 2026-08-31T16:43:10+01:00
Subject: M2-DISCOGS-PACING: let the matcher find its own pace

The interval was a number a person put in KV and tuned by hand three
times in one day. The tick already knows how many of its queries were
refused, which is the only input that tuning ever used — so it adjusts
itself: 1.5x wider past a 5% refusal rate, 0.9x narrower on a clean
tick, never below the shipped floor.

The first version tolerated 30% refusals and, simulated against an
upstream refusing under 5s, converged — to 4.5s and a PERMANENT 10%
refusal rate. Converged and wasteful. At 5% it reaches 4.9s in seven
ticks and holds at 2%, which is noise rather than a standing order for
traffic that returns nothing.

A tick that ran queries and got only errors stops asking for two cron
periods. When Discogs is refusing, a further request is one that will
also be refused: it spends the subrequest budget and the shared window
and returns nothing.

The manual key stays widen-only and the learned one may move both ways;
the wider is enforced. A person can always slow the matcher and never
speed it past the floor.

Verify: npm run gate green (269), including convergence, the narrow
dead zone, the human override winning when wider and being refused when
below the floor, and a cooldown that expires on its own.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/records/M2-DISCOGS-PACING.md
tools/test/pacing.test.mjs
worker/index.ts
worker/rate-limit.ts
commit 7ba305c916d7b9047a704fc353199bcd0236e1e9
Author: djDAOjones
Author date: 2026-08-31T16:27:17+01:00
Commit date: 2026-08-31T16:27:17+01:00
Subject: M2-DISCOGS-PACING: size the batch on attempts, not on queries

The subrequest budget worked — it refuses before the request and the
invocation survives, and item 453 auto-accepted on a ladder the budget
had truncated, saying so in its reason. But batchSizeFor was sizing the
tick as though every query succeeded first time: three rows at twelve
queries came to exactly the 36-attempt budget with NOTHING left for a
retry, so the first throttled query ate the next row's allowance.
Items 451 and 466 spent the whole budget on nine queries — 3.7 attempts
each.

Now divided by QUERIES_PER_ROW * MAX_ATTEMPTS_PER_QUERY, which pins the
batch to one row per invocation at every permitted gap. The test that
said widening narrows the batch is corrected rather than dropped: there
is nothing left to narrow, and that is the honest state — it is why the
matcher is slow, not why it fails.

Interval widened to 6s to cut the retries that are spending the budget.

Verify: npm run gate green (265), asserting a worst-case tick against
the budget at four gaps.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

tools/test/pacing.test.mjs
worker/discogs.ts
worker/index.ts
commit 571b62ed965bbe5d0a14eaf56c35bd9962af3753
Author: djDAOjones
Author date: 2026-08-31T15:28:45+01:00
Commit date: 2026-08-31T15:28:45+01:00
Subject: Constrain r2Key at the door, since capture is deliberately open

POST /api/captures takes no credential by decision (OPEN-V1-AUTH: an
offline queue must not acquire a way to fail), so photos[].r2Key
arrives from a stranger. It was only trimmed, then written verbatim
into item_photo.r2_key.

Two consumers dereference it. tools/photos-pull.mjs interpolates it
into a wrangler argv, and GET /api/photos/:key — which shipped today —
fetches it from R2. A key carrying path syntax is a path somebody else
chose, in both.

Now required to match ^labels/[A-Za-z0-9._-]{1,120}$, with `..` barred
separately because the character class permits a dot and `labels/..`
would otherwise pass while still naming a parent. PUT /api/photos/:key
already constrained its own path parameter; this is the other half of
the same surface.

The rule rejects nothing real: the client has only ever sent
labels/<clientId>-<n>.jpg, and all 98 keys in production conform, the
longest at 31 characters.

Verify: npm run gate green (265) with nine hostile shapes refused and
the client's own shape still accepted; against the running Worker,
labels/ok-1.jpg 201 while ../.., /etc/passwd and a nested path all 400.
check-memory 0 structural failures; gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

tools/test/worker.test.mjs
worker/capture.ts
commit 1bfcebb3b1abc6526732019b7e99eb53c31401cd
Author: djDAOjones
Author date: 2026-08-31T15:22:15+01:00
Commit date: 2026-08-31T15:22:15+01:00
Subject: CAPTURE-MERGED-ROWS follow-up: promote the split rows, and scope the re-catalogue question

453 and 466 re-read after the split, each now one disc with one
catalogue number — ACL 45 Decca and MFP 2024 Music for Pleasure. Both
promoted and re-queued, which confirms the split was right.

Scopes OPEN-RECATALOGUE with the numbers that prompted it: all 293
review items are legacy spreadsheet rows and 267 have no label, which
is precisely the signal family the corroboration gate is refusing them
for. A photograph supplies it.

The record argues against deciding on 267 discs: photograph twenty and
count how many auto-accept, because that answers it with a number
rather than an argument.

Verify: check-memory 0 failures; both rows promoted with vision
provenance.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/photo-extract.json
project/backlog.md
project/records/OPEN-RECATALOGUE.md
commit 8740840aa9043da98fc6e9212989ad757e62c712
Author: djDAOjones
Author date: 2026-08-31T15:18:26+01:00
Commit date: 2026-08-31T15:18:26+01:00
Subject: M2-REVIEW-QUEUE: a candidate says what the release is, not just its score

The screen showed "Discogs release 1451234" and a number, so deciding
whether a candidate was the record in your hand meant opening Discogs
for every one of them — across a queue of 293 that is the whole cost of
the milestone.

Discogs returned the title, label, catalogue number, year and format on
the rung that found the candidate. It was scored and discarded. Now
stored beside the families and signals the gate reasoned from, and
rendered as the heading and a line beneath it. Candidates that predate
this fall back to the bare id, which is what all of them showed before.

No migration: it rides in the existing signals_json, which is where
queriesRun and queryErrors already live.

Verify: npm run gate green (264), including a candidate whose stored
release carries a flattened label array and a format.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

src/review.css
src/review.ts
tools/test/matcher.test.mjs
worker/match/run.ts
commit eb2ce48409b5fe9f48739ef53cd991e335352ae6
Author: djDAOjones
Author date: 2026-08-31T15:08:03+01:00
Commit date: 2026-08-31T15:08:03+01:00
Subject: M2-REVIEW-QUEUE: split the candidate into accept and look

Accepting a match and going to look at it are different intentions, and
the row could only express the first — so checking a candidate meant
accepting it and undoing, or not checking. Two items were confirmed on
2026-08-31 by someone with no way to look.

Left half accepts, hovering green. Right half opens the Discogs release,
hovering orange. Different colours because they are adjacent and do
different things; one colour across the row would say they were one
control, which is the mistake the split exists to prevent.

The right half is an <a>, not a button: middle-click, cmd-click and
open-in-new-tab work for free, the URL shows on hover, and nothing that
opens Discogs can carry a click handler that records a decision.

Found while verifying: style.css has a generic `.top { gap: .75rem }`
for the capture header, and the candidate modifier was also `.top`.
Inherited onto the row grid it opened a 12px DEAD STRIP between the
halves where a click landed on neither control — invisible, and the one
defect a split control must not have. Renamed to `.best`.

Verify: npm run gate green (263); driven in a browser — pick is a
BUTTON, peek is an A with target=_blank and rel=noopener noreferrer and
no click handler, and a twelve-point sweep across the row finds zero
dead points.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

src/review.css
src/review.ts
commit 1be89a8f54a35a21e192ba3406913bcc61da5ec6
Author: djDAOjones
Author date: 2026-08-31T14:38:10+01:00
Commit date: 2026-08-31T14:38:10+01:00
Subject: Upkeep: a focused re-read pack for the two rows the split changed

453 and 466 need reading again — the reading on file describes a row
that was two records — but the other seventeen do not, and repacking
everything would renumber the packs and invalidate replies already
imported.

Gitignored: transient, regenerated whenever a row is split, and the
reading it produces is archived under data/photo-runs/ like any other.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

.gitignore
data/label-photos/row-ids.csv
commit 8a0a492f7a9d2108fe95ce59ec5c5f33a73fcf91
Author: djDAOjones
Author date: 2026-08-31T14:27:08+01:00
Commit date: 2026-08-31T14:27:08+01:00
Subject: CAPTURE-MERGED-ROWS: one real merge, one false positive, record closed

453 was two discs and is split at photograph 7 into item 466. 455 was
not: M-2314; AM 2314 is one disc printing two numbers, a double header.

So two catalogue numbers is NOT evidence of a merged row, and neither
is a high photograph count — a record with several pieces earns several
photographs honestly. The heuristic that correctly found 453 would have
destroyed 455, and only a person looking at the discs could tell the
cases apart. Worth remembering the next time a tidy signal appears in
this data.

The reader was right both times: given two records it reported two
numbers rather than choosing, and given a double header it did the
same. Refusing to choose is correct in both; what the answer means is a
fact about the disc.

Checked before promoting rather than after: normaliseCatno already
splits 'M-2314; AM 2314' into both M-2314 and AM 2314, so the ladder
tries each and nothing needed building. 455 promoted and re-queued.

Verify: check-memory 0 failures, gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/decision-log.md
project/records/CAPTURE-MERGED-ROWS.md
project/trajectory.md
commit 4c71708ab2c38bd1e4439629433ec4f987774f7f
Author: djDAOjones
Author date: 2026-08-31T14:21:34+01:00
Commit date: 2026-08-31T14:21:34+01:00
Subject: CAPTURE-MERGED-ROWS: split 453 at photograph 7, giving item 466

The maintainer put the boundary there and the photographs agree:
453-6.jpg is Ace of Clubs ballet notes under Fistoulari, 453-7.jpg is
the Music for Pleasure sleeve front — Tchaikovsky Romeo & Juliet /
Francesca da Rimini, St. Louis Symphony, Golschmann.

split-item.mjs takes the boundary as an argument and reads no
photograph itself: only somebody who can see them knows where one disc
ends, and the timestamps cannot help since all twelve arrived in one
capture under one clientId.

It deletes nothing — the new item is an INSERT, the photographs move by
UPDATE, no R2 object is touched, nothing is re-photographed. The new
row inherits only what is true of both discs. It refuses if a match_run
carries a candidate or a human decision rather than stranding somebody's
work against a row that no longer means what it did.

Both rows re-queued. 455 still needs a person to look — its two numbers
may be one disc printing both.

Verify: item 453 has 6 photographs, item 466 has 6, 0 stale runs on the
pair; npm run gate green (263).

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/records/CAPTURE-MERGED-ROWS.md
tools/split-item.mjs
commit f3f86495c9c117e602f2c8eb6d6b919bb025a884
Author: djDAOjones
Author date: 2026-08-31T13:59:03+01:00
Commit date: 2026-08-31T13:59:03+01:00
Subject: BROWSE-PHOTOS: drop lazy loading, which was hiding the images it deferred

Two faults, found in the order that made the second look like the
first.

The cookie fix was necessary: an <img> cannot send a header, so every
photograph really was a 401 in the maintainer's browser.

But with that fixed the images still did not appear, and the cause was
`loading="lazy"` — the requests were never made at all, which reads
exactly like a refused one. A dozen small thumbnails on a panel a
person opened deliberately gain nothing from deferral, and it cost the
whole feature. Forced eager, all twelve load at 882x1568.

Verify: npm run gate green (263); against production, twelve
photographs of item 453 all load.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

src/browse.ts
src/review.ts
commit e7479de4f24abae6138c680aadf1ce67f3a83cc0
Author: djDAOjones
Author date: 2026-08-31T13:54:01+01:00
Commit date: 2026-08-31T13:54:01+01:00
Subject: BROWSE-PHOTOS: gate on a cookie too, because an <img> cannot send a header

Every photograph on browse and review was a broken image. The gate
accepted only an `x-capturer` header, which `fetch` can set and
`<img src>` cannot — so every image request went out unauthenticated
and came back 401.

Verified with curl and a header, which is the one caller that was never
going to fail. The request that mattered was a page load.

The name is now also a cookie, which rides on an image request
automatically, including lazy-loaded and cached ones. It changes
nothing about what the gate is worth: the roster still ships in the
client bundle. Devices that named themselves before this get the cookie
restored on load, so their images do not stay broken for invisible
reasons.

Verify: npm run gate green (263), now including a request carrying only
a cookie among other cookies, and one whose cookie names nobody on the
roster.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

src/browse.ts
src/review.ts
src/who.ts
tools/test/worker.test.mjs
worker/index.ts
commit e9e5e8c89bed8916b61b2d97afb1d49d05948649
Author: djDAOjones
Author date: 2026-08-31T13:26:23+01:00
Commit date: 2026-08-31T13:26:23+01:00
Subject: BROWSE-PHOTOS: show the record, so a match can be judged against it

Two items were confirmed in the review queue against an empty panel
because the screen had nothing to compare with. The photographs were in
R2 the whole time. Both browse and review now show them.

The gate is the typed name, per maintainer sign-off — and the code says
what that is: the roster ships in the client bundle, so this is a speed
bump, not access control. It is at least the speed bump it claims,
because the r2_key moved behind the same header: the key is the
photograph's address, and gating the route alone would have protected
nothing. An invented key is matched against item_photo before R2 sees
it, since parseCapture only trims r2Key.

The test asserting no photo route may exist is updated rather than
deleted — the property it protects is unchanged, so the assertion moved
to the form that still protects it.

Found on the way: makeR2 recorded a byte count and returned no body, so
a photo route serving nothing would have passed every local check. It
now keeps the bytes; the test asserts the image comes back.

Verify: npm run gate green (263); against the real Worker, unnamed 401,
named-but-unknown-key 404, and 21,848 bytes in / 21,848 out as a valid
JPEG.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/decision-log.md
project/records/BROWSE-PHOTOS.md
project/trajectory.md
src/browse.css
src/browse.ts
src/review.css
src/review.ts
tools/test/helpers/bindings.mjs
tools/test/photos-pull.test.mjs
tools/test/worker.test.mjs
worker/index.ts
commit f71600aa5e28f731f0d0fb1009cfb2ea77ce5fba
Author: djDAOjones
Author date: 2026-08-31T12:43:38+01:00
Commit date: 2026-08-31T12:43:38+01:00
Subject: TRACKLIST-CAPTURE: store the tracklist Discogs was already giving us

release_track has held zero rows since M1, because DiscogsClient's
getRelease has never once been called: the matcher uses only the search
rungs, which return catalogue number, label and title but not the
tracklist. So the field that says which pressing a record actually is
was being fetched, scored and discarded.

An accepted match now costs one extra request — not per row, not per
query, and only for a release about to be stored. Against a ladder
spending 9-12 requests a row that is noise, and it fills the table M3
and M4 both read. A fetch that fails costs only the tracklist: the
verdict was reached on the search rungs and stands.

completeness stays 'unknown' deliberately. Whether a track is a whole
work, a movement or an excerpt decides which cluster a performance
joins, and that is M3's judgement from MusicBrainz rather than a guess
made here.

The record scopes the other two halves the maintainer raised — using a
tracklist as a seventh corroboration family, and reading one off a
sleeve photograph — and says why this one comes first: doing it
measures how many releases Discogs has wrong, which is the population
the photo path would serve.

Verify: npm run gate green (262).

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/records/TRACKLIST-CAPTURE.md
tools/test/matcher.test.mjs
worker/match/run.ts
commit f816d58f674f9b5ce740ca2f37c6ec07ca87c1de
Author: djDAOjones
Author date: 2026-08-31T12:39:15+01:00
Commit date: 2026-08-31T12:39:15+01:00
Subject: M2-REVIEW-QUEUE: backfill the ten blank releases, and take the photo ruling

The ten releases the matcher created before today carried no title,
label or catalogue number. release-backfill.mjs fills them from Discogs
— additive only: nothing deleted, no item repointed, no confirmation
altered, and COALESCE so a known value is never overwritten.

With them filled, the two confirmations made against blank panels are
checkable, and both are right: item 3 matches SMS 2341 Krips/Kletzki
exactly, and item 2 agrees on catalogue number, label and conductor
while its captured title is M0 junk. Nothing to revert.

BROWSE-PHOTOS signed off: serve the photographs, gated by CAPTURE-WHO's
typed name. The record keeps the objection that shapes the build — an
open /api/items/:id already returns every r2_key, so gating the route
without the keys would be theatre.

Verify: 10 of 10 backfilled; check-memory 0 failures.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/records/BROWSE-PHOTOS.md
tools/release-backfill.mjs
commit 3da855c5377fc87f4ff5f1bd25a9b2ab5d22c544
Author: djDAOjones
Author date: 2026-08-31T12:36:32+01:00
Commit date: 2026-08-31T12:36:32+01:00
Subject: M2-REVIEW-QUEUE: store the release, so a person has something to confirm

The review screen asks whether a Discogs match is right. It could not
be answered: upsertRelease created the release row from the discogs id
alone, so title, label and catalogue number were scored by the gate and
then discarded. All ten releases the matcher has ever created are
blank, and on 2026-08-31 two items were confirmed against exactly that
emptiness — the maintainer reported having "no idea how I was supposed
to cross check", which was the interface telling the truth.

Scored now carries the candidate as Discogs returned it, and the
release row is written with it. Nothing extra is fetched: the data was
already in hand and being thrown away.

Verify: npm run gate green (259); a new test asserts a verified release
stores title, catno, flattened label and year.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

tools/test/matcher.test.mjs
worker/match/run.ts
worker/match/score.ts
commit e7902e1513832da66b7e6658e8e7b687ccbce67f
Author: djDAOjones
Author date: 2026-08-31T12:22:04+01:00
Commit date: 2026-08-31T12:22:04+01:00
Subject: Upkeep: prune the decision log after integrating the parallel stream

Five entries from the merged branch plus four from this session took
the live log to 23 against a budget of 20. The oldest nine move
verbatim to the archive — the M0/M1/M2 build decisions and the
2026-08-30 capture-interface work. Their rules survive in AGENTS.md, in
the schema comments and in tests, so the live log loses no rule.

Verify: check-memory 0 failures, 1 warning (a record length);
gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/archive/decision-log-2026-08.md
project/decision-log.md
commit 6917c4bdc2d70216ba132d4a1a0bf066af5fc567
Author: djDAOjones
Author date: 2026-08-31T12:21:37+01:00
Commit date: 2026-08-31T12:21:37+01:00
Subject: Integrate the parallel development stream — five items

Merges worktree-agent-acc72224487d08505: CAPTURE-NEXT-DISC,
CAPTURE-WHO, DATASET-VIEWER, DATASET-EDIT and CAPTURE-BULK-REMNANT.

One conflict, project/backlog.md, resolved the way AGENTS.md prescribes
— regenerated from the merged records rather than hand-merged. Both
sessions touched worker/index.ts and git merged it cleanly: the edit
routes and the matcher's pacing constants do not overlap.

The branch reported 10 failing tests; they pass here. Its diagnosis was
right — matcher and photo-extract tests read the gitignored
`Pre August 2026/` archive, which no worktree has. That is a real
friction between AGENTS.md's one-branch-per-session and a gate that
depends on an untracked path, and it is worth its own item.

Verify: npm run gate green (258 tests, up from 238); check-memory 0
structural failures; gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:
commit f9472b3c94df0cb96c21e1d40330746e23a9d1d0
Author: djDAOjones
Author date: 2026-08-31T12:19:04+01:00
Commit date: 2026-08-31T12:19:04+01:00
Subject: M2-DISCOGS-PACING: three fixes for three faults, only one of them Discogs

1. QUERIES_PER_ROW was 5, estimated before there was anything to
   measure; promoted photo readings walk 9.4-12 rungs because a reading
   supplies label, title and name as well as a catalogue number. Batch
   sizing had been dividing by a number that stopped being true.

2. Cloudflare's per-invocation subrequest cap is a second ceiling that
   waiting cannot relieve, and it is what actually killed the tick. The
   Discogs client now counts every attempt against a budget of 36 and
   refuses BEFORE the request, so the invocation survives to write what
   it already found; the ladder stops and says so in the reason, rather
   than a truncated search reading as "nothing found". batchSizeFor
   takes the smaller of the two ceilings.

3. A row is claimed as a `pending` run BEFORE searching, so a row
   outlasting the five-minute cron period cannot be selected twice.
   Item 451 collected two runs and paid Discogs twice for one disc.

Also lowers the KV override cap from 60s to 20s: 60s was derived as
"5 queries x 60s = one cron period", and at twelve rungs it would have
meant 720s for a row that must finish inside 300s.

Verify: npm run gate green (238). At 2s the cap now binds at 3 rows and
36 subrequests a tick; the widest permitted override still lets one row
complete inside a period, asserted.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

tools/test/pacing.test.mjs
tools/test/spend-guard.test.mjs
worker/discogs.ts
worker/index.ts
worker/match/run.ts
worker/rate-limit.ts
commit 38f5bdf003d19fb1193f7f590e2df864533fc901
Author: djDAOjones
Author date: 2026-08-31T12:15:37+01:00
Commit date: 2026-08-31T12:15:37+01:00
Subject: CAPTURE-BULK-REMNANT: they stay, and the file says so

bulkFields and BULK_CARRIED keep their place and their tests, now under
a comment whose first line is "NOTHING CALLS THESE TWO" — the cost of
the remnant was never the bytes, it was the next reader having to work
out whether something was broken. Deleting them deletes their tests,
which AGENTS.md makes a stop-and-ask, so that ending stays the
maintainer's to take; the test comment says the two bulk tests go WITH
the exports and not before them.

Verify: npm run gate — comments only, 258 tests, 222 pass, the same 10
pre-existing environmental failures as the parent. Both validators
green.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/decision-log.md
project/records/CAPTURE-BULK-REMNANT.md
project/trajectory.md
src/queue-logic.ts
tools/test/queue-logic.test.mjs
commit 013c13017feb1ac8bd1c0ecc34f95d879006124e
Author: djDAOjones
Author date: 2026-08-31T12:14:05+01:00
Commit date: 2026-08-31T12:14:05+01:00
Subject: DATASET-EDIT: a person may correct their own reading

Correct, confirm or promote a reading from the browse detail, behind a
shared EDIT_TOKEN that answers 503 rather than 200 when it is unset;
every write lands as a confirmed `shelf` value with a name on it and
nothing becomes decision-eligible, because only the review queue can
confirm a release. MACHINE WRITES OVER `capture` STAY BARRED — AGENTS.md
and 001-init.sql are reworded in this commit to say that is what the
rule always meant, on the maintainer's sign-off of 2026-08-31, and
nothing in match/ or review.ts can reach edit.ts. Promotion writes a new
shelf row and leaves the vision reading unconfirmed rather than
laundering it.

Verify: npm run gate — typecheck clean, 258 tests, 222 pass; the same 10
pre-existing environmental failures as the parent (matcher.test.mjs and
photo-extract.test.mjs read the gitignored "Pre August 2026/" archive,
absent from any worktree). Eleven new Worker tests, including the four
the record named. Driven against the real Worker over node:sqlite. Both
validators green.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

AGENTS.md
README.md
project/backlog.md
project/decision-log.md
project/records/DATASET-EDIT.md
project/trajectory.md
schema/001-init.sql
src/browse.css
src/browse.ts
tools/dev-api.mjs
tools/test/worker.test.mjs
worker/edit.ts
worker/env.ts
worker/index.ts
commit 00d7f7c13bb507292c576d8d639d8e88f3ef4cb8
Author: djDAOjones
Author date: 2026-08-31T12:06:09+01:00
Commit date: 2026-08-31T12:06:09+01:00
Subject: M2-DISCOGS-PACING: measured — a richer reading costs more than it earns, for now

The measurement this record asked for, taken on 16 promoted photo
readings rather than on a hypothetical. A vision reading supplies
label, title and name as well as a catalogue number, so the query
ladder walks 9.4-12 permutations against capture-only's 4.7 — every
extra signal that makes a match more likely also makes the row cost
more to try. 5 of 11 rows errored.

Two failures, only one of which is Discogs: throttling as before, and
Cloudflare's per-invocation subrequest cap, which widening the interval
cannot fix. Plus a third fault caused by the pacing rather than by
Discogs — item 451 collected two match_run rows because a row
outlasting the five-minute cron period is still in flight when the next
tick selects it, and nothing in the schema forbids two verdicts for one
item.

Verify: read from queries_json on production; npm run gate green (238).

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/records/M2-DISCOGS-PACING.md
commit 7d3ee64a47939245dfe3b6ede5f20e9e0b9284ff
Author: djDAOjones
Author date: 2026-08-31T11:59:55+01:00
Commit date: 2026-08-31T11:59:55+01:00
Subject: DATASET-VIEWER: a third screen, minus the photographs

/browse lists the whole collection with its match history and a
provenance mark on every field — including the fields that have no
provenance row at all, because "nothing recorded" and "read at the
shelf" are the two things a spreadsheet cannot tell apart; the
unaggregated capture join that returned an item once per capture row is
fixed with a test. The photographs are listed rather than shown: the
GET /api/photos route DATASET-VIEWER asked for is forbidden in those
words by photos-pull.test.mjs, which belongs to another record, so the
route was withdrawn rather than shipped and the question is split out as
BROWSE-PHOTOS with a sign-off flag.

Verify: npm run gate — typecheck clean, 247 tests, 211 pass; the same 10
pre-existing environmental failures as the parent (matcher.test.mjs and
photo-extract.test.mjs read the gitignored "Pre August 2026/" archive,
absent from any worktree). Four new Worker tests. Driven at 1200x900 and
375x812 against the real Worker over node:sqlite. Both validators green.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

browse.html
project/backlog.md
project/decision-log.md
project/records/BROWSE-PHOTOS.md
project/records/DATASET-EDIT.md
project/records/DATASET-VIEWER.md
project/trajectory.md
src/browse.css
src/browse.ts
src/review.ts
src/style.css
tools/test/worker.test.mjs
vite.config.ts
worker/index.ts
commit c399d431b626e8f42da856a55230ef930592b339
Author: djDAOjones
Author date: 2026-08-31T11:44:44+01:00
Commit date: 2026-08-31T11:44:44+01:00
Subject: CAPTURE-WHO: a name typed once at the start

A first-run screen asks for a first name and refuses one that is not on
the six-name roster, so every row says who read its label and the gate
is a name you have to know rather than a list of buttons that prints
the answers; the name is stored canonically, re-checked on every read so
an older build's free text cannot go on stamping rows, and the offline
queue drains behind the gate because that promise does not get a caveat.

Verify: npm run gate — typecheck clean, 243 tests, 207 pass; the same 10
pre-existing environmental failures as the parent (matcher.test.mjs and
photo-extract.test.mjs read the gitignored "Pre August 2026/" archive,
absent from any worktree). Driven at 375x812 on both screens: refusal,
canonicalisation, capturedBy on a queued row with no box, hand-over, and
a legacy free-text dg.who re-asked. Both validators green.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/decision-log.md
project/records/CAPTURE-WHO.md
project/trajectory.md
src/main.ts
src/review.ts
src/style.css
src/who.ts
tools/test/who.test.mjs
commit ee69b8eebebd762dfb4f833267f52353fe7ddc78
Author: djDAOjones
Author date: 2026-08-31T11:38:07+01:00
Commit date: 2026-08-31T11:38:07+01:00
Subject: CAPTURE-NEXT-DISC: queue from inside the viewfinder

A Next disc control in the camera bar files the disc in hand and keeps
the viewfinder open, so a crate costs N shutter taps plus one instead of
N plus three and the camera never restarts between discs; the mis-tap it
introduces is bounded by a five-second Undo built out of the drain's own
nextAttemptAt, which delays the send and never the write.

Verify: npm run gate — typecheck clean, 239 tests, 203 pass; the 10
failures are pre-existing and environmental (matcher.test.mjs and
photo-extract.test.mjs read the gitignored "Pre August 2026/" archive,
absent from any worktree — the identical 10 fail on this commit's
parent). Driven in the browser at 375x812, 667x375 and 375x667. Both
validators green.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/decision-log.md
project/records/CAPTURE-NEXT-DISC.md
project/trajectory.md
src/main.ts
src/queue-logic.ts
src/style.css
tools/test/queue-logic.test.mjs
commit e298cb044a9f17d9c043d35580f890237c26e662
Author: djDAOjones
Author date: 2026-08-31T11:35:09+01:00
Commit date: 2026-08-31T11:35:09+01:00
Subject: SPIKE-PHOTO-TO-FIELDS: archive the full 18-record reading

data/photo-packs/ is gitignored — it is regenerated output — so the six
replies would have been lost to the next photo-pack run. The reading
itself is evidence: it is what a named model produced from named
photographs on a named date, and comparing readers is half of what the
spike is for.

Verify: all six replies and the merged extract archived under
data/photo-runs/gpt-desktop-2026-08-31/.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/photo-extract.json
data/photo-runs/gpt-desktop-2026-08-31/extract.json
data/photo-runs/gpt-desktop-2026-08-31/reply-01.txt
data/photo-runs/gpt-desktop-2026-08-31/reply-02.txt
data/photo-runs/gpt-desktop-2026-08-31/reply-03.txt
data/photo-runs/gpt-desktop-2026-08-31/reply-04.txt
data/photo-runs/gpt-desktop-2026-08-31/reply-05.txt
data/photo-runs/gpt-desktop-2026-08-31/reply-06.txt
commit fee602c696782c5abfec41882cdad0d42fdc38d1
Author: djDAOjones
Author date: 2026-08-31T11:34:48+01:00
Commit date: 2026-08-31T11:34:48+01:00
Subject: SPIKE-PHOTO-TO-FIELDS: all 18 read, and a reader may declare itself compromised

ChatGPT completed all six packs and volunteered that pack-01 was not
independent — prior project memory had exposed earlier transcription
details before it read READ-ALL.md. Nothing here could have detected
that: the file-based check only sees whether an answer already existed,
and for 449-452 it had not. So the import gained --not-independent, and
the scorer holds those rows out on the reader's word alone.

Ignoring a disclosure because the mechanical check came back clean
would let a known-contaminated batch count as evidence, which is the
failure the guard exists to prevent.

29 photographs stood upright from the rotations the reading reported.

Also records CAPTURE-MERGED-ROWS: 453 carries twelve photographs of two
different discs (ACL 45 and MFP 2024) because nothing between shots
said "new disc". The reader reported both numbers rather than choosing,
which is correct. Neither 453 nor 455 may be promoted until split.

Verify: npm run gate green (238); 18 of 18 rows imported, 13
independent, 5 held out.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/label-photos/rotations-applied.json
project/backlog.md
project/records/CAPTURE-MERGED-ROWS.md
tools/photo-import.mjs
tools/photo-score.mjs
commit 4a802529596f41684f85e903f9a717210d6b439b
Author: djDAOjones
Author date: 2026-08-31T11:29:23+01:00
Commit date: 2026-08-31T11:29:23+01:00
Subject: OPEN-V1-AUTH: no sign-in for v1, and the edit drawer gets the bolt

Maintainer signed off both open gates on 2026-08-31, with an explicit
instruction to leave rethink triggers rather than close them silently.

v1 gets no sign-in: capture and photo upload stay anonymous, because an
offline queue on a phone in a loft must not acquire a way to fail, and
what is exposed is junk rows rather than a credential. DATASET-EDIT
proceeds as written, including the AGENTS.md amendment barring machine
writes to capture while permitting human correction — no longer a
stop-and-ask for whoever builds it.

CAPTURE-WHO promoted to current on the same instruction: the typed name
is the crude gate and the logger for who read each label.

Verify: check-memory 0 failures, gen-backlog --check matches, gate
green (238). Three soft warnings remain, all pre-existing record
lengths.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/decision-log.md
project/records/CAPTURE-WHO.md
project/records/DATASET-EDIT.md
project/records/OPEN-V1-AUTH.md
project/trajectory.md
commit 2dd08c7b59951bb71d4c8d0963df8245dad6a951
Author: djDAOjones
Author date: 2026-08-31T11:23:50+01:00
Commit date: 2026-08-31T11:23:50+01:00
Subject: Upkeep: un-track an agent worktree committed by a careless git add -A

`git add -A` swept in .claude/worktrees/agent-*, which git recorded as
a gitlink — an accidental submodule pointing at a transient isolation
directory that will not exist for anyone who clones this.

Removed from the index and gitignored so it cannot recur.

Verify: git ls-files .claude/ lists only launch.json.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

.claude/worktrees/agent-acc72224487d08505
.gitignore
commit 3cce7b211c0021fce738a198541becb62bca3d92
Author: djDAOjones
Author date: 2026-08-31T11:23:27+01:00
Commit date: 2026-08-31T11:23:27+01:00
Subject: M2-FIRST-RUN: close the migration-004 gap two sessions recorded

Both parallel sessions recorded production as schemaVersion 3 with the
`vision` source inert there. It was applied this session — schema 4,
4,734 provenance rows, 465 items and 98 photographs intact across the
field_source rebuild, every decision view recreated. The note was true
when written and is not now.

Verify: live D1 reports version 4; check-memory 0 failures, gen-backlog
--check matches. The 3 warnings are the DATASET records' own.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

.claude/worktrees/agent-acc72224487d08505
project/backlog.md
project/records/M2-FIRST-RUN.md
project/records/_meta.md
commit 6481cc3af9390c7d410d5301cf3817e4368b9eb2
Author: djDAOjones
Author date: 2026-08-31T11:14:10+01:00
Commit date: 2026-08-31T11:14:10+01:00
Subject: SPIKE-PHOTO-TO-FIELDS: keep each model's reading, so two can be compared

A fresh run overwrites reply-01.txt and photo-extract.json, so the
reading a given model produced would be gone the moment another model
read the same photographs. Comparing readers is half of what the spike
is for, and the evidence has to survive to make that possible.

Verify: archived the ChatGPT desktop run of 2026-08-31 verbatim before
a faster model reads the same packs.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/photo-runs/gpt-desktop-2026-08-31/extract.json
data/photo-runs/gpt-desktop-2026-08-31/reply-01.txt
commit 55a7f6dfde85972118d56fb619299581f6541258
Author: djDAOjones
Author date: 2026-08-31T11:12:52+01:00
Commit date: 2026-08-31T11:12:52+01:00
Subject: VIEW-REGEN: restore the four entries a racing view generator dropped

Two sessions share this working tree. The view committed alongside
CAPTURE-NEXT-DISC was generated from HEAD's records a few seconds before
DATASET-VIEWER's commit landed, so it went in on top of that commit
carrying a view that predated it: DATASET-EDIT, DATASET-VIEWER and
OPEN-V1-AUTH vanished from the backlog and M2-FIRST-RUN reverted to
open. No record file was touched — only the generated view, which is why
regenerating is the whole fix, per the merge rule.

Verify: gen-backlog --check matches over all 16 records; check-memory 0
failures, 3 warnings, all of them DATASET-EDIT and DATASET-VIEWER's own.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
commit 2179302d1df83e94e2a6a53080f919bf19c890f2
Author: djDAOjones
Author date: 2026-08-31T11:12:16+01:00
Commit date: 2026-08-31T11:12:16+01:00
Subject: CAPTURE-NEXT-DISC: park the approved viewfinder loop and two loose ends

CAPTURE-NEXT-DISC is the approved design, not built: a Next disc control
in the camera bar files the disc, zeroes the count and keeps the
viewfinder open, so a crate costs one tap per disc instead of three and
the camera never restarts. It records why Done does NOT simply queue —
Done and "this is one disc" are different claims, and a premature one
turns the rest of a disc's photographs into a second row, which is the
fault the crate mode was removed for. The undo option is written down
with it: hold the send ~5s, offer Undo on the flash, entry still on disk
first.

CAPTURE-BULK-REMNANT records that bulkFields and BULK_CARRIED were left
exported and tested with no caller, and why that was not mine to tidy.

CAPTURE-WHO gains the cross-reference to OPEN-V1-AUTH, raised in
parallel: this item answers who is holding the phone, that one answers
who may write at all. Trimmed under the ticket guard and moved to icebox
order 4 so the two sit together.

Verify: check-memory 0 failures 0 warnings, gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/records/CAPTURE-BULK-REMNANT.md
project/records/CAPTURE-NEXT-DISC.md
project/records/CAPTURE-WHO.md
commit d3ba6d8f3991759dae847167fea0e2c43c618151
Author: djDAOjones
Author date: 2026-08-31T11:11:48+01:00
Commit date: 2026-08-31T11:11:48+01:00
Subject: DATASET-VIEWER: scope a browse screen, its editable half, and the auth question that follows

465 catalogued rows can currently be neither seen nor corrected anywhere in the
app, so browse is specced read-first (DATASET-VIEWER) with the edit path behind
it (DATASET-EDIT); editing capture in place is the maintainer's call of
2026-08-31 and contradicts a hard rule, so the record carries the AGENTS.md
amendment as its own first task rather than leaving an autonomous session to
stall on it. M2-FIRST-RUN and the current-intent line are corrected against
production, which has already deployed and matched every row.

Verify: check-memory 0 structural failures (3 soft warns: the DATASET-EDIT
security banner, two records a little over the 600-word soft budget);
gen-backlog --check view matches records.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/records/DATASET-EDIT.md
project/records/DATASET-VIEWER.md
project/records/M2-FIRST-RUN.md
project/records/OPEN-V1-AUTH.md
project/records/_meta.md
commit 23426945e5544231a1647a5cdd46b63af384cefe
Author: djDAOjones
Author date: 2026-08-31T11:07:47+01:00
Commit date: 2026-08-31T11:07:47+01:00
Subject: CAPTURE-WHO: a name typed at the start, not a list of buttons

The picker is out on the maintainer's reading that it is more friction,
and it was self-defeating anyway: six buttons print the valid answers on
the screen, so it could never gate anything. A name typed once at first
launch does both jobs — you have to know one to get in, and it stamps
every row captured on that phone afterwards.

Typing does not reopen the spelling problem, because the roster closes
it: the name is matched against Joe, Jen, Ro, Ivy, Jojo, Sue and stored
canonical, so jojo and JoJo both land as Jojo and an unknown name is
refused. That refusal is the gate.

The record still says plainly what it is not. Six household first names
are guessable and the roster has to live where the app can read it, so
this is a speed bump and an honest label on a row. OPEN-USERS-ACCESS is
untouched and still reopens at M2.

Verify: check-memory 0 failures 0 warnings, gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/records/CAPTURE-WHO.md
commit a79bc91278f49e72bd32069c370826fc095d0a0d
Author: djDAOjones
Author date: 2026-08-31T10:36:04+01:00
Commit date: 2026-08-31T10:36:04+01:00
Subject: CAPTURE-WHO: park a name picker for the six people who capture

capturedBy lost its box when CAPTURE-ONE-SCREEN parked the More block,
and it was barely reachable before that. Joe, Jen, Ro, Ivy, Jojo, Sue
is a list to pick from, not a field to type into: six known names typed
by hand would manufacture the spelling problem NAMES-CANONICAL exists
to clean up on the composer side.

The record separates the two things "log in" can mean. A name picker
with no password is identification and can ship without reopening
OPEN-USERS-ACCESS; a gate is that decision, which the brief already
says reopens at M2. Whoever promotes this says which.

Icebox: one person is doing the capturing, so the value is one field of
provenance on rows nobody is disputing yet. Promoted out of the
wish-list, which is triaged rather than hoarded.

Verify: check-memory 0 failures 0 warnings, gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/records/CAPTURE-WHO.md
project/wish-list.md
commit 9aca1fa575c7b8cbf7248fbd2fbb1b5d526a8a60
Author: djDAOjones
Author date: 2026-08-31T05:38:49+01:00
Commit date: 2026-08-31T05:38:49+01:00
Subject: CAPTURE-ONE-SCREEN: one disc, one screen

"Photograph a whole crate" is gone on the maintainer's reading that more
than one photograph is always needed: it wrote one row per photograph,
so a crate walked that way manufactured three discs where one stood.
Condition grading and the More block are commented out of the page — the
Worker still accepts every field and readFields still looks for every
id, so two comment markers put them back.

What is left is the shutter, three boxes and Queue it, and it fits an
iPhone SE in portrait with nothing below the fold. Five mobile-only
faults went with the pass: camera errors painted behind the fullscreen
viewfinder where nobody could read them, a double tap on Queue it
writing two discs, autofocus throwing the keyboard over the shutter, a
24 px delete target beside another one, and landscape putting the boxes
below the fold.

capturedBy lost its box with the More block, so a second capturer cannot
name themselves; the value is read from storage alone and an unnamed
device sends nothing rather than a guess. On the wish-list.

Verify: npm run gate green (238 tests), vite build clean, and the page
driven at 375x812, 375x667 and 667x375 — fits without scrolling in all
three, Enter walks the boxes and releases the keyboard, the queue button
counts its photographs, a save resets the form, and every parked id
resolves to null without throwing.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/decision-log.md
project/trajectory.md
project/wish-list.md
src/main.ts
src/style.css
commit 85e914aeddf120794419528984ce47e3ac732a14
Author: djDAOjones
Author date: 2026-08-31T02:27:50+01:00
Commit date: 2026-08-31T02:27:50+01:00
Subject: SPIKE-PHOTO-TO-FIELDS: ask for every pack once, not each pack separately

Six packs meant six prompts, and the first real run read pack-01 and
stopped — correctly, since that is what it was asked for. photo-pack
now writes READ-ALL.md listing every pack and the reply file each
should produce, and asks the reader to report which packs it covered so
a gap is visible rather than silent.

Packs stay separate underneath: bounded so a browser upload cannot
exceed a per-message cap, and so a bad reply costs one pack.

Verify: npm run gate green (238 tests).

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/label-photos/README.md
data/photo-extract.json
tools/lib/photo-fields.mjs
tools/photo-pack.mjs
tools/test/photo-extract.test.mjs
commit 3c41dae6e2ace134921516461c6499aec360d0fe
Author: djDAOjones
Author date: 2026-08-31T02:06:17+01:00
Commit date: 2026-08-31T02:06:17+01:00
Subject: PHOTO-PROMOTE: a photo reading becomes a matching lead, never a fact

Migration 004 adds a `vision` provenance so a reading off a photograph
stays distinguishable from the fabricated legacy AI values M0 found.
photo-promote writes raw_value under it, and the matcher reads it only
where capture is empty — capture holds what a human read and is never
written.

Safe by construction rather than by care: v_confirmed_field allow-lists
three sources, so a new one is unreachable through every decision view
the moment it exists.

Verify: npm run gate green (237 tests), including a confirmed `vision`
row staying out of v_confirmed_field, and the COALESCE asserted to put
capture first.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/decision-log.md
project/trajectory.md
schema/004-vision-source.sql
tools/photo-promote.mjs
tools/test/photo-extract.test.mjs
tools/test/schema.test.mjs
worker/match/run.ts
commit 0bec3a09f61bd6b7210d9eac473ba46641e7c19b
Author: djDAOjones
Author date: 2026-08-31T01:56:57+01:00
Commit date: 2026-08-31T01:56:57+01:00
Subject: SPIKE-PHOTO-TO-FIELDS: ask for rotation per image, and count records once

The first real reading exposed two faults in my own tooling.

rotate_cw was asked once per record, which record 451 proved
unanswerable: 451-1.jpg is upright and 451-3.jpg is 90° out, so the
reader said 0 and was right to. It is now a map from image filename to
degrees, and photo-rotate turns only images the pack actually held.

photo-import counted row-ids.csv lines rather than records, so a reply
covering 5 records reported "5 of 98 ids" and named record 453 twelve
times as missing.

Verify: npm run gate green (233 tests), including a reply naming an
image the pack never contained, which is skipped rather than turned.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/photo-extract.json
tools/lib/photo-fields.mjs
tools/photo-import.mjs
tools/photo-rotate.mjs
tools/photo-score.mjs
tools/test/photo-extract.test.mjs
commit de539e12622a5983cf2849db43574e7b195b1cbf
Author: djDAOjones
Author date: 2026-08-31T01:18:00+01:00
Commit date: 2026-08-31T01:18:00+01:00
Subject: SPIKE-PHOTO-TO-FIELDS: cap a pack by images as well as records

Batching by record kept discs whole but ignored how many images that
came to: 18 records at five and twelve photographs each made a pack of
53, far past any chat's per-message limit and certain to fail halfway
through an upload. A batch now closes when either cap is reached, and a
record larger than the image cap still gets a pack of its own rather
than vanishing from every pack.

Verify: npm run gate green (234 tests); the real set now packs as 6
packs of at most 19 images with no record split.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/label-photos/README.md
tools/photo-pack.mjs
tools/test/photo-extract.test.mjs
commit 55e3d2ba95ba19ba5092e655d2947e1ad8a59ba3
Author: djDAOjones
Author date: 2026-08-31T01:15:21+01:00
Commit date: 2026-08-31T01:15:21+01:00
Subject: PHOTOS-TO-DESKTOP: stable photo numbering, so a late arrival cannot shift it

Ordered newest-photo-first, so the number in each filename was both
backwards and unstable: a photo arriving later for an existing record
shifted every number, while the files already on disk were skipped as
present — each name then silently described a different object than its
content. That is not hypothetical; 459-465 synced off the phone after
the first pull and would have done exactly this.

Now newest RECORD first so --limit still favours recent work, oldest
PHOTOGRAPH first within a record so a late arrival appends.

Verify: npm run gate green (232 tests); wiped and re-pulled all 98
photographs of 18 records, numbering now in shooting order.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/label-photos/row-ids.csv
tools/photos-pull.mjs
commit 3d279a484e057583147f17b171808d861dd23b5d
Author: djDAOjones
Author date: 2026-08-31T00:30:25+01:00
Commit date: 2026-08-31T00:30:25+01:00
Subject: NAMES-CANONICAL: scope name resolution, and record why it is not prompt guidance

A label prints TSCHAIKOWSKY and Tchaikovsky for one man, and clustering
groups by work, so unresolved names split clusters that should be one.

Scoped as a resolution layer rather than as extraction guidance: a
reader that normalises has stopped reading and started inferring, which
is the clause that also stops it supplying a catalogue number from
memory. It would destroy the raw evidence and make the spike
unmeasurable against a correct transcription.

Verify: check-memory 0 failures 0 warnings, gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/records/NAMES-CANONICAL.md
commit 84866f0ead7726d0404a6c9bc961fbbab1c47536
Author: djDAOjones
Author date: 2026-08-31T00:27:46+01:00
Commit date: 2026-08-31T00:27:46+01:00
Subject: CAPTURE-LIVE-CAMERA: stop the torch handler holding a dead track

Regression from yesterday's rotation fix. The torch handler closed over
the track that existed when the camera opened; restarting the stream on
rotation stops that track, so the next tap applied a constraint to a
dead one, threw, and the catch hid the button — a torch that worked
until you turned the phone and then blamed the platform.

No track reference is held anywhere now; it is resolved at each use.
The lamp also survives a restart, which it did not before: the new
track starts dark and is relit, which is what a crate in a loft needs.

Verify: npm run gate green (232 tests); driven in a browser through the
exact path — torch on, orientationchange (2 streams made), lamp still
on, then a tap on the NEW track toggles cleanly instead of throwing.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

src/main.ts
commit edef43c3e36d7f024074f67549b8708a279749db
Author: djDAOjones
Author date: 2026-08-31T00:17:00+01:00
Commit date: 2026-08-31T00:17:00+01:00
Subject: PHOTO-ROTATION: the stream does not turn with the phone

Sixty real photographs answered yesterday's question: they do arrive
rotated, and intermittently — 451-1 was 90° out while 449-1 and 452-1
from the same session were upright. On iOS a track's dimensions are
fixed at getUserMedia and do not follow the device, so turning the
phone after opening the camera stores a sideways label.

The stream is now re-acquired on rotation, the preview is `contain` so
it shows what actually gets stored, rotation is reported as degrees
clockwise rather than an ambiguous word, and photo-rotate stands the
sixty already taken back up rather than asking for them again.

Verify: npm run gate green (232 tests); 451-1 rotated 270° came back
upright and legible, a second run turned nothing, and 45° was refused
rather than passed to sips.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

README.md
data/label-photos/row-ids.csv
project/decision-log.md
project/trajectory.md
src/main.ts
src/style.css
tools/lib/photo-fields.mjs
tools/photo-rotate.mjs
tools/photo-score.mjs
tools/photos-pull.mjs
tools/test/photo-extract.test.mjs
commit 8d8cb9361dbc8cee2ce98436fb26b3b68d2ab203
Author: djDAOjones
Author date: 2026-08-30T23:59:29+01:00
Commit date: 2026-08-30T23:59:29+01:00
Subject: Upkeep: prune the decision log to its 70% mark

A day of capture-interface decisions took the live log to 21 against a
budget of 20. The seven oldest — M1 and M2 build decisions — move
verbatim to the archive; the schema, the Worker's shape and the
matcher's gate are enforced by tests and AGENTS.md, so no rule is lost
by their leaving.

Verify: check-memory 0 failures 0 warnings, gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/archive/decision-log-2026-08.md
project/decision-log.md
commit 85d2e22f9873860105710f1ad6897ebea2d95dbf
Author: djDAOjones
Author date: 2026-08-30T23:58:59+01:00
Commit date: 2026-08-30T23:58:59+01:00
Subject: PHOTO-ORIENTATION: ask how the writing sat before building a detector

A projection-profile detector is cheap, but it answers a question
nobody has established is being asked: no photograph has been read, so
neither "do they arrive rotated" nor "does rotated read worse" is
known, and a detector is only worth writing if both are true.

The reading contract now reports orientation and the score tabulates
wrong values against it. Not a scored field — it describes the
photograph, not the record.

Verify: npm run gate green (230 tests); a run with one upright, one
mixed and one upside-down photo reports 1.00 wrong values per photo for
upside-down against 0.00 for the others.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/decision-log.md
project/trajectory.md
tools/lib/photo-fields.mjs
tools/photo-score.mjs
tools/test/photo-extract.test.mjs
commit 31117799d73a26c2d5185b271e060d967d284831
Author: djDAOjones
Author date: 2026-08-30T23:51:44+01:00
Commit date: 2026-08-30T23:51:44+01:00
Subject: CAPTURE-HOMESCREEN: give iOS an icon it will actually use

iOS reads none of the manifest's icons, so adding to the home screen
produced a screenshot of the page as the icon. Adds a 180px PNG
(apple-touch-icon takes no SVG), full-bleed because iOS applies its own
rounded mask and a pre-rounded source is rounded twice, plus the title
and standalone tags older iOS needs. Shell cache bumped to v3 so the
icon is there offline.

Only index.html: review.html is the desktop queue and is not something
you add to a phone.

Verify: npm run gate green (229 tests); icon rendered and inspected at
180x180, opaque square.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

index.html
public/apple-touch-icon.png
public/sw.js
commit dc771d659829886cba49cb34124837b979e41237
Author: djDAOjones
Author date: 2026-08-30T23:47:33+01:00
Commit date: 2026-08-30T23:47:33+01:00
Subject: CAPTURE-VIEWFINDER: the camera takes the whole screen

Landscape on an iPhone SE was unusable — 375px of height before Safari
takes its share, and the preview capped at 60vh of the remainder.
Competing with the page for space was the mistake, so it no longer
does: fullscreen, scroll locked, controls floating over the preview and
moving to the right edge in landscape where they cost width instead.

The torch is now offered and tried rather than gated on a capability
report that under-reports; a refusal hides the button and points at
Control Centre, which does work on iOS.

Verify: npm run gate green (229 tests); driven at 667x375 and 375x667 —
preview fills the viewport in both, controls sit right in landscape,
and a simulated iOS torch refusal hides the button with the Control
Centre message. Done restores the page and stops the stream.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

README.md
project/decision-log.md
project/trajectory.md
src/main.ts
src/style.css
commit 4fd7c67535f22adb1ca7915411c629b868813c8f
Author: djDAOjones
Author date: 2026-08-30T23:36:11+01:00
Commit date: 2026-08-30T23:36:11+01:00
Subject: CAPTURE-LIVE-CAMERA: a viewfinder that stays open

iOS always demands Retake / Use Photo and then closes the camera, so
ten photographs was thirty taps. getUserMedia gives one tap each and a
viewfinder that never goes away.

Torch is capability-gated and will not appear on iOS, which exposes
none — a dead button reads as a broken app. Frames grab straight to the
stored size rather than encoding at 4K and again at save.

Verify: npm run gate green (229 tests); driven in a browser against a
synthetic 4K stream — six shutter taps became six photos at 22-24 KB,
queued and synced with no confirmation step. Shutter latency on a real
phone is NOT verified: the pane throttles the renderer.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

README.md
project/decision-log.md
project/trajectory.md
src/main.ts
src/queue-logic.ts
src/style.css
tools/test/queue-logic.test.mjs
commit 1a1cc82f3c3aca5ac10ce98199e174bb951f4dfc
Author: djDAOjones
Author date: 2026-08-30T23:26:15+01:00
Commit date: 2026-08-30T23:26:15+01:00
Subject: RENAME: Deep Groove becomes Vinyl sorter

Renames every name a person sees — the heading, both page titles, the
PWA manifest that names the home-screen icon, the Discogs user-agent,
the README and the brief.

Resource identities keep the old name deliberately, and now say why:
the Worker name is the live URL, D1 and R2 cannot be renamed in place,
and the IndexedDB name is where captures queue on a phone — renaming
that would orphan photographs taken in a loft with no signal.

Verify: npm run gate green (227 tests).

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

README.md
index.html
package.json
project/brief.md
public/manifest.webmanifest
review.html
src/main.ts
src/queue.ts
tools/deploy.sh
tools/load-dataset.mjs
worker/discogs.ts
worker/index.ts
wrangler.toml
commit a5a20fe38f7471ef8b12beab11f39f9d3b8dfa7c
Author: djDAOjones
Author date: 2026-08-30T23:21:35+01:00
Commit date: 2026-08-30T23:21:35+01:00
Subject: CAPTURE-UNDESCRIBED: stop asking what a photograph shows

"There will be no consistency, so any attempt to ascribe information is
dishonest and a waste of time." Every specific kind asserts something;
with nobody asserting it, storing one invents a fact. Migration 003 adds
`other`, and capture is now tap-tap-tap with nothing to choose.

photo-pack batches by record rather than image so a disc's shots stay
together, and the prompt asks for one object per record.

Verify: npm run gate green (227 tests); driven in a browser against the
real Worker — four undescribed photos on one capture stored as four
item_photo rows, and a pack of two records / four images groups 448's
three shots under one row id.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

README.md
data/label-photos/README.md
project/decision-log.md
project/trajectory.md
schema/003-photo-other.sql
src/main.ts
src/queue-logic.ts
src/style.css
tools/lib/photo-fields.mjs
tools/photo-pack.mjs
tools/photos-pull.mjs
tools/test/photo-extract.test.mjs
tools/test/queue-logic.test.mjs
tools/test/schema.test.mjs
worker/capture.ts
commit ef1da626cd59f5919c8f1724eb491a561733463b
Author: djDAOjones
Author date: 2026-08-30T23:07:07+01:00
Commit date: 2026-08-30T23:07:07+01:00
Subject: SPIKE-PHOTO-TO-FIELDS: read correctly for a single-photo pack

Verify: npm run gate green (225 tests).

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

tools/lib/photo-fields.mjs
commit 5347af0a18791375ae17ae7815898a1b7e980e72
Author: djDAOjones
Author date: 2026-08-30T23:06:34+01:00
Commit date: 2026-08-30T23:06:34+01:00
Subject: SPIKE-PHOTO-TO-FIELDS: make the order the guard, now the reader has repo access

A prompt asking a reader not to open ground-truth.csv is worthless when
it can cat the file. The import now stamps each row with whether an
answer already existed — the only moment that is knowable — and the
scorer holds those rows out of the bar and names them, so looking up
the answer cannot manufacture a pass.

Verify: npm run gate green (225 tests), including a run where every row
was read after its answer was typed, which now scores nothing and exits
non-zero.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

README.md
data/label-photos/README.md
tools/lib/photo-fields.mjs
tools/photo-import.mjs
tools/photo-score.mjs
tools/test/photo-extract.test.mjs
commit fe68c2efd6b71f2b8d97295f9c8c91ff8e860247
Author: djDAOjones
Author date: 2026-08-30T23:02:14+01:00
Commit date: 2026-08-30T23:02:14+01:00
Subject: SPIKE-PHOTO-TO-FIELDS: surface wrangler's error instead of swallowing it

photos-pull left stdin inherited, so wrangler waited on a TTY it never
had and failed; the reason was discarded as "Command failed". stdin is
now closed and stderr is captured into the thrown error. Also reads
correctly for a single photograph.

Verify: npm run gate green (223 tests); photos-pull now completes
against the live D1 and R2 and reports "In the store: 1 label_a".

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

tools/lib/photo-fields.mjs
tools/photos-pull.mjs
tools/test/photo-extract.test.mjs
commit 6f423ebf9e203bec76adb03c788a0a17659e99ad
Author: djDAOjones
Author date: 2026-08-30T22:58:54+01:00
Commit date: 2026-08-30T22:58:54+01:00
Subject: CAPTURE-MANY-PHOTOS: several photographs per capture, one per kind

The catalogue number is on the centre label and the title is often only
on the sleeve, so a form that took one photograph was forcing a choice
between them. Add-buttons offer only the kinds not yet taken, so a
sleeve cannot be filed as a label.

Nothing below the form changed: item_photo was always a table and the
Worker always took an array.

Verify: npm run gate green (223 tests); driven in a browser against the
real Worker — three photos on one capture stored as three item_photo
rows with distinct kinds and keys, and no crate.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

.gitignore
project/decision-log.md
project/trajectory.md
src/main.ts
src/queue-logic.ts
src/style.css
tools/photos-pull.mjs
tools/test/queue-logic.test.mjs
commit 3167bc8b9dc3036ec6e8bf58dfd08d4d9137c421
Author: djDAOjones
Author date: 2026-08-30T22:48:44+01:00
Commit date: 2026-08-30T22:48:44+01:00
Subject: CAPTURE-LOCATION: stop requiring a location the storage cannot support

Crate is optional, folded into More and no longer sticky, after the
first real capture arrived as crate "1" position "1". Also fixes a
downscale that ran only on the bulk path, so a single capture queued a
full 4.4 MB phone frame.

Verify: npm run gate green (220 tests); driven in a browser with a
stale sticky crate present — a 6.45 MB photo queued at 370 KB and no
crate was stored.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/label-photos/ground-truth.csv
data/label-photos/row-ids.csv
project/decision-log.md
project/trajectory.md
src/main.ts
tools/test/worker.test.mjs
worker/capture.ts
commit bf7b2d12cd2dfb7105eada92166fdc6a50dc50dc
Author: djDAOjones
Author date: 2026-08-30T22:05:38+01:00
Commit date: 2026-08-30T22:05:38+01:00
Subject: PHOTOS-TO-DESKTOP: attach R2, so a photograph can leave a phone at last

R2 was already enabled on the account; only the binding was missing, so
every upload had returned 503 and the app had queued them silently for
ever.

Verify: npm run gate green (220 tests); deployed with env.PHOTOS bound,
then a 785-byte JPEG PUT returned 201 where it had always returned 503
and wrangler fetched the identical bytes back. Probe object deleted.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/records/PHOTOS-TO-DESKTOP.md
wrangler.toml
commit c5290d4c3eb2a6b004ffd16994727e50d0bd12b8
Author: djDAOjones
Author date: 2026-08-30T21:56:59+01:00
Commit date: 2026-08-30T21:56:59+01:00
Subject: PHOTOS-TO-DESKTOP: pull photos out of R2 by item id, without adding a route

Pairs come from D1 rather than a bucket listing, ground truth is
generated from what a person typed into capture, and deploy.sh now
attaches the R2 binding itself instead of asking for a TOML edit.

Verify: npm run gate green (220 tests); tests assert the tool issues no
write verb, uses `get` as its only R2 verb, and that the Worker still
has a photo PUT and no photo GET. Cannot run end to end until R2 is
enabled on the account.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

README.md
project/backlog.md
project/records/PHOTOS-TO-DESKTOP.md
project/records/_meta.md
tools/deploy.sh
tools/photos-pull.mjs
tools/test/photos-pull.test.mjs
commit 2d4c12f7fd7efd6f702d35fc480c5d44942a9011
Author: djDAOjones
Author date: 2026-08-30T21:37:13+01:00
Commit date: 2026-08-30T21:37:13+01:00
Subject: CAPTURE-BULK-PHOTOS: photograph a crate in one pass, one row per photo

Bulk rows carry only crate, position and capturer, so no disc's
catalogue number can reach another's row; photos downscale before
queueing, and a rejected row no longer blocks the crate behind it.

Verify: npm run gate green (214 tests); driven in a real browser
against the Worker — 3 photos became 3 rows at positions 12-14 with the
typed catalogue number absent from all of them, and an oversized photo
mid-batch came back 413 and stayed retrying while the rest synced.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

.claude/launch.json
README.md
project/archive/decision-log-2026-08.md
project/backlog.md
project/decision-log.md
project/records/CAPTURE-BULK-PHOTOS.md
project/trajectory.md
src/main.ts
src/queue-logic.ts
src/style.css
src/sync.ts
tools/test/queue-logic.test.mjs
commit 7c266ca8b659fafba7a06c3216de7941bdd6f9b1
Author: djDAOjones
Author date: 2026-08-30T21:30:21+01:00
Commit date: 2026-08-30T21:30:21+01:00
Subject: SPIKE-PHOTO-TO-FIELDS: make each pack a directory a session reads in place

Packs of 10, written as a directory as well as a zip, each carrying its
own READ-THIS-FIRST.md — so the cheap path is no upload at all, and the
guard against reading the answer sheet off the same disk is tested.

Verify: npm run gate green (209 tests), check-memory 0 failures 0
warnings, gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

README.md
data/deep-groove.sqlite-shm
data/deep-groove.sqlite-wal
data/label-photos/README.md
project/backlog.md
project/records/SPIKE-PHOTO-TO-FIELDS.md
project/records/_meta.md
tools/lib/photo-fields.mjs
tools/photo-pack.mjs
tools/test/photo-extract.test.mjs
commit f39a4c44933f2e6c269927eaf616371e9b85bd43
Author: djDAOjones
Author date: 2026-08-30T20:48:13+01:00
Commit date: 2026-08-30T20:48:13+01:00
Subject: CAPTURE-BULK-PHOTOS, PHOTOS-TO-DESKTOP: scope the phone-to-chat path into the icebox

Capture takes one disc at a time and nothing can read a photo back out of R2, so the app-integrated route Joe described needs both a bulk capture mode and a way onto the desktop; the second is scoped as a wrangler-driven pull rather than the obvious zip-download route, which would turn "no route reads a photo" into "one route returns all of them" in a v1 with no sign-in.

Verify: npm run gate green (205 tests, tsc clean); check-memory 0 failures 0 warnings after dropping a security flag that would have bannered every session for an iceboxed design note; gen-backlog --check view matches records.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/records/CAPTURE-BULK-PHOTOS.md
project/records/M3-WORKS-PERFORMANCES.md
project/records/M4-CLUSTERS-CONTRAST.md
project/records/M4-COMPILATION-COVERAGE.md
project/records/M5-SHOOTOUT-SELL-LIST.md
project/records/PHOTOS-TO-DESKTOP.md
commit 4628ecda1ebc697631b62b86b14087ae72978933
Author: djDAOjones
Author date: 2026-08-30T19:10:27+01:00
Commit date: 2026-08-30T19:10:27+01:00
Subject: SPIKE-PHOTO-TO-FIELDS: read the labels through a chat window, not an API

No API keys by maintainer decision, so photo-pack.mjs writes chat-sized zips of images named after their row ids with the prompt to paste, photo-import.mjs reads the reply back, and the API caller is deleted rather than parked; every row carries its own id and an unsent one is refused, because a hand-run round trip can return eighteen objects for twenty images and without ids every row after the gap is attributed to its neighbour.

Verify: npm run gate green (205 tests, up from 199; tsc clean); check-memory 0 failures 0 warnings; gen-backlog --check view matches records; packer exercised on real photos through real zips, and the import-then-score round trip is tested end to end including a reply that lost a row.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

.gitignore
README.md
data/label-photos/README.md
data/label-photos/ground-truth.csv
project/backlog.md
project/decision-log.md
project/records/SPIKE-PHOTO-TO-FIELDS.md
tools/lib/photo-fields.mjs
tools/photo-extract.mjs
tools/photo-import.mjs
tools/photo-pack.mjs
tools/photo-score.mjs
tools/test/photo-extract.test.mjs
commit d987733aaa48283ccb9ff1d5938c0354293980f7
Author: djDAOjones
Author date: 2026-08-30T18:36:55+01:00
Commit date: 2026-08-30T18:36:55+01:00
Subject: SPIKE-PHOTO-TO-FIELDS: build and test the photo-to-fields harness, so twenty photos are all that is left

photo-extract.mjs asks a vision model what is printed on a label photo and photo-score.mjs scores it against typed ground truth, keeping refused and wrong apart rather than averaging them into a figure that hides the only question worth asking; the contract gives an unassignable number somewhere to go that is not catno_raw and forbids inference from knowledge of the recording, and neither tool can reach the database because a spike measures rather than promotes.

Verify: npm run gate green (199 tests, up from 180; tsc clean); check-memory 0 failures 0 warnings; gen-backlog --check view matches records; both CLIs exercised end to end on fixtures, and the scorer's own bar was corrected after a test caught a flawless run failing on `0 < 0`.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

.gitignore
README.md
data/label-photos/README.md
data/label-photos/ground-truth.csv
project/backlog.md
project/records/SPIKE-PHOTO-TO-FIELDS.md
tools/lib/photo-fields.mjs
tools/photo-extract.mjs
tools/photo-score.mjs
tools/test/photo-extract.test.mjs
commit ef21f274faae7a4ed2d508953ffb85bf81ac268c
Author: djDAOjones
Author date: 2026-08-30T18:16:59+01:00
Commit date: 2026-08-30T18:16:59+01:00
Subject: SPIKE-PHOTO-TO-FIELDS: ice the photo-to-fields spike with cost and provenance already settled

The label photo is stored and read by nothing; the spike asks whether a vision model can turn it into leads, and records the two answers that needed no photos — cost is ~$2.30 for all 750 on Haiku 4.5, and `raw_value`/`guess` is already the schema's home for a machine reading, so no migration is needed. Accuracy is blocked on twenty real labels, which do not exist yet.

Verify: npm run gate green (180 tests, tsc clean); check-memory 0 failures 0 warnings; gen-backlog --check view matches records.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/records/SPIKE-PHOTO-TO-FIELDS.md
project/records/_meta.md
commit cc6614c64a12889828f50c0821e3f92bc9bad96f
Author: djDAOjones
Author date: 2026-08-30T17:32:38+01:00
Commit date: 2026-08-30T17:32:38+01:00
Subject: OPEN-SELL-THRESHOLD, OPS-SPEND-GUARD: close both on maintainer input

Sell threshold ruled: value never earns a keep — a copy is kept for
musical reasons only, and selling is attempted only above £10, where
listing and posting stop costing more than they return. Separates the
two questions the shootout kept entangling. The sub-£10 loser has
nowhere to go yet; that edge is in the wish-list rather than invented.

Spend guard closed on the plan answer. The account is on Free (113 of
100,000 requests today), so runaway billing is not possible: D1 refuses
writes past 100k/day rather than charging. The item's own scope note
said to settle the plan first because it decides how much the rest
matters, and it did — the wall exists, the alert is set, and the
per-tick write budget ships as redundancy. The ceiling stays a
provisional 200, guarded by a headroom test, with the measurement
retriggered by any upgrade to a paid plan.

Verify: check-memory 0 failures 0 warnings, 19 live decision entries
(budget 20); gen-backlog --check view matches records.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/decision-log.md
project/records/OPEN-SELL-THRESHOLD.md
project/records/OPS-SPEND-GUARD.md
project/trajectory.md
project/wish-list.md
commit e865b1f7b08c96c6e17b119ec6bc1b0b7b791040
Author: djDAOjones
Author date: 2026-08-30T17:31:52+01:00
Commit date: 2026-08-30T17:31:52+01:00
Subject: OPS-SPEND-GUARD: remove the CPU limit that made the Worker undeployable

Regression I introduced in d4e019c. `[limits] cpu_ms` is rejected
outright on the Free plan — "CPU limits are not supported for the Free
plan [code: 100328]" — so every `wrangler deploy` failed at the last
step. The maintainer's deploy hit this and, because the command was
chained with &&, the KV tuning step behind it never ran either.

A guard that stops the thing shipping is worth less than no guard.

Nothing is lost by removing it: Free enforces its own per-invocation
CPU cap, and the real wall against runaway cost is D1 refusing writes
past 100k/day rather than billing for them. The per-tick write budget
is the ceiling doing the actual work.

The test is inverted rather than deleted: it now asserts the Worker
stays deployable, ignoring comments so the explanatory block above the
removed setting cannot trip it. It says what to do on a paid plan.

Verify: npm run gate — 180/180 pass. `bash tools/deploy.sh` now
completes; version f868d641 live with the */5 cron.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

tools/test/spend-guard.test.mjs
wrangler.toml
commit 23497373deedb5d76984ad2510fe1965d6aa5b3e
Author: djDAOjones
Author date: 2026-08-30T17:00:41+01:00
Commit date: 2026-08-30T17:00:41+01:00
Subject: M2-DISCOGS-PACING: make the tuning loop runnable without a deploy

Finding the gap that holds from Cloudflare's shared egress is
widen-measure-repeat, and a loop whose every step costs a deploy does
not get run. So this builds the loop rather than guessing at 3s.

The Discogs gap now comes from KV (rl:discogs:min-interval) and can be
changed with `wrangler kv key put`. Widen-only: an override that could
narrow it would let one typo restore the burst behaviour Discogs
refused us for, so anything unparseable, narrower than the shipped 2s
or wider than 60s falls back. Failing closed costs recall; failing
open costs the token.

Batch size now derives from the gap, so widening no longer silently
doubles the invocation. At 2s it still yields exactly four rows —
today's behaviour is unchanged until someone tunes it.

Every run records queriesRun/queryErrors inside the existing
queries_json rather than new columns: no migration, and match-report
already reads that column with json_extract. Its new Pacing section
counts pre-existing runs as UNRECORDED, not as zero failures — all 446
are in that bucket, and reporting them clean would manufacture the
false green this item exists to remove.

A test pinned the edge: past ~8s one row exceeds the 40s tick budget
and the floor of one row wins deliberately, because a tick rounding to
zero rows would stall the matcher permanently. Waiting is not CPU, so
that is free against cpu_ms and bounded by the 5-minute period — which
is what makes the 60s override cap meaningful.

Not shipped: the measurement needs a deploy and a freshly captured
record.

Verify: npm run gate — tsc --noEmit clean, 180/180 tests pass (7 new).
check-memory 0 failures 0 warnings; gen-backlog --check view matches.
match-report regenerated against the live 446-row database.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/match-report.md
project/backlog.md
project/records/M2-DISCOGS-PACING.md
tools/match-report.mjs
tools/test/pacing.test.mjs
worker/index.ts
worker/match/run.ts
worker/rate-limit.ts
commit d4e019c43b0a2ff52aace4e7b65e5157a83ee05f
Author: djDAOjones
Author date: 2026-08-30T16:53:35+01:00
Commit date: 2026-08-30T16:53:35+01:00
Subject: OPS-SPEND-GUARD: cap the CPU and count what a tick writes

Cloudflare sells no hard spend cap, so the ceiling is ours to build.
Two of the three parts need neither the dashboard nor a measurement,
and the cron is already live on a five-minute schedule, so they land
now: cpu_ms capped at 10s against a 30s default, and a per-tick write
budget the matcher stops at and reports.

persistRun returns the rows it wrote. runMatchBatch stops before a row
rather than part-way through one, so a budget stop cannot leave a run
half-written and get the item searched twice.

Not shipped: the $10 budget alert is a maintainer billing action, and
the 200-write ceiling stays provisional until M2-FIRST-RUN measures
the real volume. A test asserts the headroom so the number cannot be
tightened into a throttle by accident.

runMatchBatch took an options object so the clock could be injected;
that cut this file's tests from 94s to 0.35s. fetchImpl is deliberately
left to the client's default — naming fetch here would have broken the
invariant that outbound calls live in one rate-limited file, which is
what the existing test caught when I did.

Verify: npm run gate — tsc --noEmit clean, 173/173 tests pass (6 new).
check-memory 0 failures 0 warnings; gen-backlog --check view matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/records/OPS-SPEND-GUARD.md
tools/test/spend-guard.test.mjs
worker/index.ts
commit 1f6237debfc6fe7d6d9f82d17a45f0b9e41945bd
Author: djDAOjones
Author date: 2026-08-30T16:45:06+01:00
Commit date: 2026-08-30T16:45:06+01:00
Subject: M2: space Discogs requests, and correct a wrong conclusion about why they failed

The limiter enforced a per-minute budget with no minimum spacing, so a Worker spent the whole allowance as an instant burst — twelve requests in a few hundred milliseconds — and Discogs refused them. It enforces a lower rate than it publishes and cares about burstiness; a laptop hid the fault because the round-trip paces the calls. Now 30/min AND at least 2s apart, per the rate the maintainer had already established in the earlier CLI work, with the cron batch resized to four rows to match.

I had concluded this was Discogs throttling Cloudflare's shared egress and was unfixable. That was wrong and the record is corrected: both effects are real, but the dominant cause was ours. Also floors KV TTLs at the 60s minimum the platform enforces, and makes the fake KV enforce it too — a double more permissive than the real thing let an 8s TTL ship.

Verify: live cron now matches a freshly captured record — 5 candidates found, correctly refused on margin. npm run gate 167/167; check-memory 0 failures, 0 warnings.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

README.md
project/backlog.md
project/decision-log.md
project/records/M2-DISCOGS-PACING.md
project/records/M2-EGRESS-IP.md
tools/test/spend-guard.test.mjs
worker/index.ts
worker/match/run.ts
wrangler.toml
commit 9b00ec0b44d62a30d8527fe7019d906495b1b045
Author: djDAOjones
Author date: 2026-08-30T16:38:57+01:00
Commit date: 2026-08-30T16:38:57+01:00
Subject: M2-EGRESS-IP: fold in the measured Discogs rate correction

Found uncommitted in the working tree from an earlier session that
ended before committing; verified rather than assumed, and folded in
under the AGENTS.md rule for in-flight work from a dead session.

Corrects the shared Discogs budget from 50/min to 30/min AND at least
2 s between consecutive requests. The spacing is the substantive part:
Discogs enforces a lower rate than it publishes and cares how bursty
traffic is, so a per-minute budget alone is spent as an instant burst
and refused. Measured — the deployed matcher was throttled while the
same token from a laptop had 59 requests remaining.

Provenance: authored by the earlier session, not by this one. This
commit adds no code of its own; it verifies and records.

Verify: npm run gate — tsc --noEmit clean, 167/167 tests pass,
including "requests are SPACED, not merely counted". check-memory
0 failures / 0 warnings.

Changed files:

AGENTS.md
tools/test/helpers/bindings.mjs
tools/test/matcher.test.mjs
tools/test/worker.test.mjs
worker/index.ts
worker/rate-limit.ts
commit 18490d217f65a4c17a6a5568a61a6b8f039092b8
Author: djDAOjones
Author date: 2026-08-30T16:19:02+01:00
Commit date: 2026-08-30T16:19:02+01:00
Subject: M2-EGRESS-IP: Discogs throttles Cloudflare's shared egress, so matching runs locally

The deployed cron matcher failed all 12 queries for its first real row with "throttled by Discogs after 4 attempts", while the same token from this machine returned HTTP 200 with 59 requests remaining. The account is fine; Discogs rate-limits by source IP and Workers egress from shared addresses, which no amount of central rate limiting can fix because the budget is being spent by strangers. Records the finding, the four options for closing it, and the deploy lessons from five faults that passed locally and failed in production.

Verify: token from this machine 200 with x-discogs-ratelimit-remaining 59; Worker 429 at the same moment; local match-run completed all 446 with 0 failed queries. check-memory 0 failures, 0 warnings; npm run gate 166/166.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

README.md
project/backlog.md
project/decision-log.md
project/records/M2-EGRESS-IP.md
project/records/OPS-SPEND-GUARD.md
tools/test/matcher.test.mjs
worker/discogs.ts
commit f062907850d20e030b0837d96c6d68240ea9d673
Author: djDAOjones
Author date: 2026-08-30T15:55:33+01:00
Commit date: 2026-08-30T15:55:33+01:00
Subject: Deploy: serve the client from the Worker, and chunk past D1's parameter limit

Two more faults the real platform surfaced. The client now ships as Worker static assets rather than a separate Pages project, so the app and its API share an origin and there is no CORS to configure or second deploy to keep in step — Cloudflare's own error recommends this over Pages. And the review queue's candidate lookup bound one parameter per run id, which exceeds D1's cap of 100 per query: a 200-row page returned 500 in production while passing locally, because SQLite has no such limit. The ids are now chunked, so any page size works.

R2 stays optional: enabling it needs a dashboard action the API refuses to perform, so the Worker deploys without it and photo uploads answer a retryable 503 while the phone keeps them queued.

Verify: live at https://deep-groove.joe-2d2.workers.dev — health reports 446 items, match-stats 135 auto-accepted / 286 needs-review / 25 rejected, review-queue returns 200 items with candidates at limit=200, an unnamed route 404s, and the queue screen renders. npm run gate 165/165.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

README.md
tools/deploy.sh
tools/test/review.test.mjs
tools/test/worker.test.mjs
worker/env.ts
worker/index.ts
wrangler.toml
commit 6006f111dd71387af7c8318692c4f971bcde48d2
Author: djDAOjones
Author date: 2026-08-30T15:45:59+01:00
Commit date: 2026-08-30T15:45:59+01:00
Subject: Deploy: fix three faults the real Cloudflare surfaced

Local miniflare accepted all of these; only the live account refused them.
1. Remote D1 rejects explicit transactions outright, so the seed no longer wraps itself in BEGIN/COMMIT — safe because the table order is already dependency order.
2. `d1 info <name>` resolves the name through wrangler.toml, which holds a placeholder on a first run, so ids now come from `d1 list --json`. This is what made the first deploy appear to do nothing: it created the database, failed to read the id back, and exited.
3. The login check grepped for "account", which also matches wrangler's logged-out "temporary preview account" hint — a false positive that would have reported success while logged out. It now tests for "not authenticated".

Also makes the schema and seed steps genuinely idempotent by consulting schema_migration and the item count, since re-running a CREATE TABLE is an error rather than a no-op.

Verify: remote D1 now holds 446 items, 446 match_run rows, 2045 candidates, 0 decision-eligible. Worker deploy still blocked on R2 needing enabling in the dashboard, which is a maintainer action.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/deep-groove.sqlite-shm
data/deep-groove.sqlite-wal
data/match-report.md
data/match-run.json
tools/deploy.sh
tools/load-dataset.mjs
wrangler.toml
commit a5089d7b11ca1db3657de88d83be43a998bbff95
Author: djDAOjones
Author date: 2026-08-30T15:05:07+01:00
Commit date: 2026-08-30T15:05:07+01:00
Subject: M2-FIRST-RUN: WAL mode, so reading progress cannot kill the run

Running the progress report against the live database aborted a 45-minute job with "database is locked" — the default rollback journal takes an exclusive lock. The runner now opens in WAL with a busy timeout so readers and the writer coexist, and the report opens read-only. Progress survived the crash intact, which is what resumability is for: the restart picked up at 116 of 446 and lost nothing.

Verify: the report now runs concurrently with an active run and returns counts rather than erroring.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/deep-groove.sqlite-shm
data/deep-groove.sqlite-wal
data/match-report.md
tools/match-report.mjs
tools/match-run.mjs
commit 592568bb394b0817bc217260a5e4814cbe3f6b11
Author: djDAOjones
Author date: 2026-08-30T14:54:18+01:00
Commit date: 2026-08-30T14:54:18+01:00
Subject: M2-FIRST-RUN: make the full run resumable, and report what it decided

Back the run with a file database rather than memory so 45 minutes of API time survives the process, cover all 446 rather than only the backlog, and re-emit data/seed.sql with the match results so a deployment inherits the run instead of spending the same ~2,000 queries again. Adds tools/match-report.mjs, which reads the database rather than a log so it describes the state that will actually be deployed.

Verify: resume proven — a second invocation reported "resuming, 3 row(s) already matched" and matched only new ones; npm run gate 163/163.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

.gitignore
data/match-report.md
tools/match-report.mjs
commit 8b902a7feaf54e5e33e44317ccf23a5610a22250
Author: djDAOjones
Author date: 2026-08-30T14:51:36+01:00
Commit date: 2026-08-30T14:51:36+01:00
Subject: Deploy: automate everything that does not need a Cloudflare login

Add tools/deploy.sh, which creates the D1 database, R2 bucket and KV namespace, writes their ids into wrangler.toml, applies both migrations, loads the dataset, deploys the Worker and publishes the client — idempotent, so a half-failed run is fixed by running it again. It deliberately does not touch DISCOGS_TOKEN; storing a credential stays a maintainer step and the command is printed at the end.

Verify: wrangler deploy --dry-run bundles at 95.44 KiB with all three bindings resolving; both migrations apply through wrangler's own local D1 (18 tables, 4 views) and the seed loads into it — 267 releases, 4681 provenance rows, 0 decision-eligible; bash -n clean; npm run gate 163/163.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

.gitignore
README.md
data/match-run.json
tools/deploy.sh
tools/load-dataset.mjs
tools/match-run.mjs
commit 4ae870a4c5c0ba17142b7721bfa348f10f074670
Author: djDAOjones
Author date: 2026-08-30T14:39:13+01:00
Commit date: 2026-08-30T14:39:13+01:00
Subject: M2-FIRST-RUN: record the live calibration for the full run

Measure the throttling fix on the same 60-row sample: 53 false "nothing found" became 4 auto-verified and 36 needing review, with 0 failed queries and 4.7 queries per row. Extrapolates to ~2,100 queries and a queue of roughly 250 items for the remaining 446, and gives the run a stated expectation so a large no-match count reads as a bug rather than a result.

Verify: npm run gate — tsc clean, 163/163 tests pass; check-memory 0 failures, 0 warnings; gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/match-run.json
project/records/M2-FIRST-RUN.md
project/trajectory.md
commit cea27ffc4126b1d33a722497821063be97ebddf9
Author: djDAOjones
Author date: 2026-08-30T14:34:04+01:00
Commit date: 2026-08-30T14:34:04+01:00
Subject: M2-REVIEW-QUEUE: Keyboard-driven review queue

Ship the queue that decides the project — capture on the left, scored candidates on the right showing which families of evidence agreed, cleared entirely by keyboard, with resolving as the only route to decision-eligibility. Driving it in a real browser found two bugs the suite could not reach: a type-ahead race that answered the same item twice while skipping the next, and a cache-first service worker that would have stopped any future deployment reaching anyone.

Verify: npm run gate — tsc clean, 163/163 tests pass; in-browser, three rapid keystrokes now resolve three distinct runs exactly once each. The full 446-row run is an operation, split out as M2-FIRST-RUN rather than counted as done.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/decision-log.md
project/records/M2-FIRST-RUN.md
project/records/M2-REVIEW-QUEUE.md
project/trajectory.md
commit d4e0382892d400272f65388a5fac8dc8ead67563
Author: djDAOjones
Author date: 2026-08-30T14:31:57+01:00
Commit date: 2026-08-30T14:31:57+01:00
Subject: M2-MATCHER: stop a throttled search reporting itself as "nothing found"

A live run marked 53 of 60 rows unmatched. They were not unmatched: the run had exhausted Discogs' rate limit, every query threw, and matchRow swallowed the errors and reported no_match — a silent negative that would have written off hundreds of records. Failures are now counted, a row whose queries all failed is an error rather than a negative, and the client waits on the shared budget and honours Retry-After instead of throwing. Also adds the letter/digit split variant, without which a compacted catalogue number asked Discogs exactly one question.

Verify: npm run gate — tsc clean, 163/163 tests pass, including that a fully-failed search is an error and a genuinely empty result set is still no_match, and that the client waits for the budget rather than failing on it.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/match-run.json
tools/match-run.mjs
tools/test/matcher.test.mjs
worker/discogs.ts
worker/match/normalise.ts
worker/match/run.ts
commit 0e6d14fad3a7075b961b7dca049845866b15daaa
Author: djDAOjones
Author date: 2026-08-30T14:25:28+01:00
Commit date: 2026-08-30T14:25:28+01:00
Subject: M2-MATCHER: re-verify the 277 existing matches, and fix the audit that flattered them

Run the corroboration gate over every row that already claimed a Discogs release. A first pass scored against the captured label — which on these rows came from Discogs — so it compared Discogs with itself and reported 1 unsupported of 277. Restricted to values whose provenance is legacy or shelf, it reports 12, four of them labelled "Exact", including a conductor matched to a heavy metal album and a Classics for Pleasure number matched to a Fontana pop single.

Verify: npm run gate — tsc clean, 156/156 tests pass, including a regression test that a Discogs-sourced field may not corroborate a Discogs match; audit output in data/reverify-report.md. The brief's figure of 26 is not reproducible and is not claimed.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

README.md
data/match-run.json
data/reverify-report.md
project/backlog.md
project/decision-log.md
project/records/M2-MATCHER.md
project/trajectory.md
tools/match-run.mjs
tools/reverify-report.mjs
commit b32851e89f40e934ed3d8189c19712396d65c300
Author: djDAOjones
Author date: 2026-08-30T14:14:53+01:00
Commit date: 2026-08-30T14:14:53+01:00
Subject: M2-MATCHER: normalisation, sanity check, query ladder, scoring and the corroboration gate

Port the proven ladder from the Windsurf CLI with the three intended changes — MacRoman rather than cp1252, an input sanity check that rejects junk before any API call, and a corroboration gate requiring score >= 80, two independent signal families and a margin of 25 over the runner-up; matching runs from a cron trigger rather than a route, so no caller can aim a Discogs query even with no sign-in.

Verify: npm run gate — tsc clean, 156/156 tests pass, including that an exact catalogue number alone is never auto-accepted, that a near-tie is refused however high the score, and that a Discogs-sourced field may not corroborate a Discogs match.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

.gitignore
project/backlog.md
project/records/M2-MATCHER.md
project/records/M2-REVIEW-QUEUE.md
project/records/_meta.md
public/sw.js
review.html
schema/002-verification.sql
src/review.css
src/review.ts
tools/dev-api.mjs
tools/load-dataset.mjs
tools/reverify.mjs
tools/test/helpers/bindings.mjs
tools/test/matcher.test.mjs
tools/test/review.test.mjs
tools/test/schema.test.mjs
tools/test/worker.test.mjs
vite.config.ts
worker/discogs.ts
worker/index.ts
worker/match/normalise.ts
worker/match/queries.ts
worker/match/run.ts
worker/match/sanity.ts
worker/match/score.ts
worker/review.ts
wrangler.toml
commit 9d7089adbf676cc96f4a19bc0cc386929a96344f
Author: djDAOjones
Author date: 2026-08-30T13:58:19+01:00
Commit date: 2026-08-30T13:58:19+01:00
Subject: Upkeep: prune the decision log to its 70% mark

Archive the five founding entries of 2026-08-28 verbatim to project/archive/ as the live log reached 19 of its 20-entry budget, keeping the newest 14. Their substance is already restated in brief.md and AGENTS.md, so working memory loses nothing.

Verify: check-memory 0 failures, 0 warnings; decision-log 14 live entries (budget 20).

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/archive/decision-log-2026-08.md
project/decision-log.md
commit b7c4b45f821b5460262eaf5757031484e4614a6a
Author: djDAOjones
Author date: 2026-08-30T13:55:57+01:00
Commit date: 2026-08-30T13:55:57+01:00
Subject: M1-SCHEMA: emit the dataset as seed SQL, the only route into a remote D1

Close a gap in the deploy runbook: the loader wrote a local SQLite file, but wrangler d1 execute takes SQL, so there was no way to get the 446 rows into a deployed database. Emits batched multi-row INSERTs — 84 statements rather than 12,445 — and the seed is gitignored because one command regenerates it from the committed CSV.

Verify: npm run gate — tsc clean, 119/119 tests pass, including a round-trip asserting the re-seeded database matches row for row and stays decision-ineligible, and that quotes in titles are escaped rather than breaking the dump.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

.gitignore
README.md
project/backlog.md
project/records/_meta.md
tools/load-dataset.mjs
tools/test/schema.test.mjs
commit de3af1260fe4d0ebeb9b0edf71060befa9e9647a
Author: djDAOjones
Author date: 2026-08-30T13:54:19+01:00
Commit date: 2026-08-30T13:54:19+01:00
Subject: M1-CAPTURE-UI: Photo-first offline capture screen

Write every capture to IndexedDB before anything else so the UI never awaits the network, drain it in the background with capped backoff that never drops an entry, and keep label and catalogue number as separate inputs with the reason printed under them; adds a local dev API serving the real Worker so the whole app runs without a Cloudflare account, and a README runbook for the deploy steps that need one.

Verify: npm run gate — tsc --noEmit clean, 117/117 tests pass. Verified in-browser: a capture made with no backend queued, survived a hard refresh intact, retried under backoff, then synced on the Worker appearing — arriving as shelf-sourced, unconfirmed, decision_eligible 0.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

.claude/launch.json
README.md
index.html
package.json
project/backlog.md
project/decision-log.md
project/records/M1-CAPTURE-UI.md
project/trajectory.md
public/icon.svg
public/manifest.webmanifest
public/sw.js
src/main.ts
src/queue-logic.ts
src/queue.ts
src/style.css
src/sync.ts
tools/dev-api.mjs
tools/test/queue-logic.test.mjs
vite.config.ts
commit 716c0b52dc42692de1f7cd3777b76d023b838e87
Author: djDAOjones
Author date: 2026-08-30T13:47:50+01:00
Commit date: 2026-08-30T13:47:50+01:00
Subject: M1-WORKER: Hono Worker with named operations and the token as a secret

Expose only the operations capture needs and refuse everything else, with the Discogs token unreachable rather than merely unused — M1 contains no outbound request at all, which a test enforces alongside one asserting no route dereferences the binding; capture writes are idempotent on a client id so an offline replay cannot create a second disc, and the shared rate limiter is built and tested ahead of M2 so it cannot be skipped.

Verify: npm run gate — tsc --noEmit clean, npm test 108/108 pass, including two limiter instances proving the budget is shared not per caller; Worker exercised over real HTTP against the real schema via node:sqlite, no wrangler required.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

package.json
project/backlog.md
project/decision-log.md
project/records/M1-WORKER.md
project/trajectory.md
tools/test/helpers/bindings.mjs
tools/test/worker.test.mjs
tsconfig.json
worker/capture.ts
worker/env.ts
worker/index.ts
worker/rate-limit.ts
wrangler.toml
commit f2dd96eea4c3330cebcd240fb1f26ea23cc6ae70
Author: djDAOjones
Author date: 2026-08-30T13:42:59+01:00
Commit date: 2026-08-30T13:42:59+01:00
Subject: M1-SCHEMA: D1 schema and the M0 dataset loaded into it

Build the four-entity schema from brief section 03 with the provenance rule enforced by views rather than convention, and load M0's 446 rows so that a value's destination follows its provenance — human-typed labels to capture, Discogs-written ones to release, everything homeless to raw_value with its true source — leaving nothing decision-eligible until a person confirms.

Verify: npm test 85/85 pass, including that confirming one row makes exactly that row appear in the decision view; load yields 446 items, 267 releases across 277 links, 4681 provenance rows, 0 decision-eligible; check-memory 0 failures, 0 warnings.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

package.json
project/backlog.md
project/decision-log.md
project/records/M1-SCHEMA.md
project/trajectory.md
schema/001-init.sql
tools/lib/csv.mjs
tools/load-dataset.mjs
tools/test/schema.test.mjs
commit 50d4b443a6bfe98cb73814b8083dceaa4e96cb62
Author: djDAOjones
Author date: 2026-08-30T13:37:03+01:00
Commit date: 2026-08-30T13:37:03+01:00
Subject: M1: adopt the brief's stack and split the capture milestone into three items

Install the maintainer-sanctioned stack (hono at runtime; typescript, vite, wrangler and workers-types as dev deps) and record the carve-out in AGENTS.md so the no-new-dependencies rule stays true rather than quietly violated; split M1-CAPTURE's four deliverables into M1-SCHEMA, M1-WORKER and M1-CAPTURE-UI so each can be gated on its own.

Verify: check-memory 0 failures, 0 warnings; gen-backlog --check matches; wrangler 4.127.1 resolves via npx.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

.gitignore
AGENTS.md
package-lock.json
package.json
project/backlog.md
project/records/M1-CAPTURE-UI.md
project/records/M1-CAPTURE.md
project/records/M1-SCHEMA.md
project/records/M1-WORKER.md
commit 6d2436b8ff2e035b11398921e254aa768174d144
Author: djDAOjones
Author date: 2026-08-30T12:44:07+01:00
Commit date: 2026-08-30T12:44:07+01:00
Subject: M1-CAPTURE: promote to the current milestone

Promote M1 now that its three sign-off questions are answered and M0 is shipped, and rewrite the milestone intent lines so Current names the capture build rather than an empty group.

Verify: check-memory 0 failures, 0 warnings; gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/records/M1-CAPTURE.md
project/records/_meta.md
commit 32aa75faf123ba7449aa0e16020e1f72fbcc7d2a
Author: djDAOjones
Author date: 2026-08-30T12:43:43+01:00
Commit date: 2026-08-30T12:43:43+01:00
Subject: OPEN-USERS-ACCESS: Who else is capturing — Access or a shared passphrase?

Record the maintainer's decision of no sign-in for v1 and propagate it to brief.md, M1-CAPTURE and M2-MATCHER; because capture never calls Discogs the token needs no browser-reachable path in M1, so the Worker gets named operations rather than an open proxy and the exposure question is deferred to M2 where a caller could first drive a Discogs query.

Verify: check-memory 0 failures, 0 warnings; gen-backlog --check matches; node --test 'tools/test/*.test.mjs' 70/70 pass.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/brief.md
project/decision-log.md
project/records/M1-CAPTURE.md
project/records/M2-MATCHER.md
project/records/OPEN-USERS-ACCESS.md
project/trajectory.md
commit a395a48e69f38af997251416ce3820cbbe90ea00
Author: djDAOjones
Author date: 2026-08-30T12:42:59+01:00
Commit date: 2026-08-30T12:42:59+01:00
Subject: OPEN-SYSTEM-OF-RECORD: Is the app database the system of record?

Confirmed the app database is authoritative, so import is one-way and the OneDrive CSV export is a readable backup rather than a synchronisation contract — which keeps round-tripping, the failure mode behind the previous nine schema generations, out of the build entirely.

Verify: check-memory 0 failures, 0 warnings; gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/decision-log.md
project/records/OPEN-SYSTEM-OF-RECORD.md
project/trajectory.md
commit 432a5df2b272403cfe09ba10b06fbe46ca40f6be
Author: djDAOjones
Author date: 2026-08-30T12:42:40+01:00
Commit date: 2026-08-30T12:42:40+01:00
Subject: OPEN-DISCOGS-TOKEN: Is the existing Discogs token live, and is the account a seller?

Verified the token authenticates as walter_odington and the account is not a seller, then measured what that costs: only condition-graded price suggestions are gated, while lowest asking price, number for sale and the have/want ratio all return 200 — enough for the sell list and shortlist ranking, so no seller signup is needed.

Verify: /oauth/identity 200, /marketplace/stats 200, /marketplace/price_suggestions 404 seller-only, /releases 200; token never echoed; check-memory 0 failures; gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/decision-log.md
project/records/OPEN-DISCOGS-TOKEN.md
project/trajectory.md
commit 5df41d317a0a78e97b635ad5461f33bb220210cc
Author: djDAOjones
Author date: 2026-08-30T11:56:15+01:00
Commit date: 2026-08-30T11:56:15+01:00
Subject: M0-RECONCILIATION-REPORT: One clean CSV plus a reconciliation report

Generate both M0 artefacts from one buildDataset call with an embedded machine-readable summary, so the report cannot drift from the dataset it describes, and state the rule behind every count rather than the count alone; M0 is complete at 446 rows with nothing decision-eligible, and _meta.md records that promoting M1 is a maintainer call gated on three sign-offs.

Verify: node --test 'tools/test/*.test.mjs' 70/70 pass; freeze-archive --check OK (87 files, 143245336 bytes unchanged across the whole milestone); rebuild byte-identical; check-memory 0 failures; gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/reconciliation-report.md
project/backlog.md
project/decision-log.md
project/records/M0-RECONCILIATION-REPORT.md
project/records/_meta.md
project/trajectory.md
tools/build-report.mjs
tools/test/reconciliation-report.test.mjs
commit 1f6ca54f6dcba07b663cb6f0d9a51c59597d102d
Author: djDAOjones
Author date: 2026-08-30T11:52:46+01:00
Commit date: 2026-08-30T11:52:46+01:00
Subject: M0-IMPORT-AI-WORKS: Import AI Works columns as guess provenance only

Attach the AI track listings, confidence, remarks and sources to the 305 enriched rows tagged guess and enforced by a recomputed decision_eligible column; record that no AI ratings exist in any of the six files that carry the column, and reclassify the 28 enriched-sheet track listings that are byte-identical to the AI output from legacy to guess.

Verify: node --test 'tools/test/*.test.mjs' 62/62 pass, including that a guessed value stays ineligible even when confirmed; 305 attached, 0 unmatched, 28 reclassified, v2 agrees with v1 on all 305; check-memory 0 failures; gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/deep-groove-v1.csv
project/backlog.md
project/decision-log.md
project/records/M0-IMPORT-AI-WORKS.md
project/trajectory.md
tools/build-dataset.mjs
tools/lib/dataset.mjs
tools/lib/import/ai-works.mjs
tools/test/import-ai-works.test.mjs
commit 51e5b7b099bcabb998bf6792d2eac63fe9348ac7
Author: djDAOjones
Author date: 2026-08-30T11:49:43+01:00
Commit date: 2026-08-30T11:49:43+01:00
Subject: M0-MERGE-LOAD-FILES: Merge 83 usable rows from the load-to-add files

De-duplicate the 83 usable load-file rows against the imported dataset by catalogue number plus label with multiplicity, finding all 83 already present in Remedial — 0 merged, 83 duplicate decisions each naming the row it matched, dataset unchanged at 446, which is what the brief's "446 already catalogued" says.

Verify: node --test 'tools/test/*.test.mjs' 53/53 pass, including that the four RTL2075 MCPS copies each matched a different existing row; confirmed independently by positional comparison (83/83 catalogue strings, 46/46 titles); check-memory 0 failures; gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/decision-log.md
project/records/M0-MERGE-LOAD-FILES.md
project/trajectory.md
tools/build-dataset.mjs
tools/lib/import/load-files.mjs
tools/test/merge-load-files.test.mjs
commit 308dc3055229b44d0f712e999b67456c306f1dd2
Author: djDAOjones
Author date: 2026-08-30T11:47:58+01:00
Commit date: 2026-08-30T11:47:58+01:00
Subject: M0-IMPORT-REMEDIAL: Import 141 remedial rows, drop 210 placeholders

Partition the 351-row Remedial sheet with a mechanical rule — nothing beyond ID means placeholder — importing the 141 real records as needs-capture with the combined catalogue string split, and returning all 210 dropped IDs for the report rather than deleting silently; the composed dataset is now 446 rows.

Verify: node --test 'tools/test/*.test.mjs' 46/46 pass; build-dataset emits 446 records, ids DG-0001..DG-0446, 0 decision-eligible; check-memory 0 failures; gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/deep-groove-v1.csv
project/backlog.md
project/decision-log.md
project/records/M0-IMPORT-REMEDIAL.md
project/trajectory.md
tools/build-dataset.mjs
tools/lib/import/enriched.mjs
tools/lib/import/remedial.mjs
tools/test/import-remedial.test.mjs
commit 76482ab21c783aa0cbf3ed067c2bd21adb621fdf
Author: djDAOjones
Author date: 2026-08-30T11:46:23+01:00
Commit date: 2026-08-30T11:46:23+01:00
Subject: M0-IMPORT-ENRICHED: Import the 305 enriched rows as unverified

Import all 305 rows into the reconciled dataset with per-field provenance derived from the data rather than assumed — Discogs wrote Label, Discogs ID/URL/Score on exactly the 277 matched rows and overwrote Musicians and Track listing there too — with confirmation unset everywhere, so a query for decision-eligible values returns nothing.

Verify: node --test 'tools/test/*.test.mjs' 38/38 pass; build-dataset emits 305 records, 52 columns, 0 decision-eligible; check-memory 0 failures; gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/deep-groove-v1.csv
project/backlog.md
project/decision-log.md
project/records/M0-IMPORT-ENRICHED.md
project/trajectory.md
tools/build-dataset.mjs
tools/lib/dataset.mjs
tools/lib/import/enriched.mjs
tools/test/import-enriched.test.mjs
commit 0545537de9dc81c834341a0c52bcdd1d80260040
Author: djDAOjones
Author date: 2026-08-30T11:42:25+01:00
Commit date: 2026-08-30T11:42:25+01:00
Subject: M0-SPLIT-LABEL-CATNO: Split combined label and catalogue strings

Split the 141 backlog rows against a gazetteer of the 98 labels attested in the collection's own Discogs-sourced rows, emitting a label only on an attested match with a well-formed catalogue remainder and refusing with a named reason otherwise — 31 split, 73 bare catalogue numbers, 37 refused and routed to capture; also records the finding that the 83 load-file rows are already present in Remedial.

Verify: node --test 'tools/test/*.test.mjs' 28/28 pass, including archive-backed assertion of the 31/73/37 split; all 31 splits reviewed by eye; check-memory 0 failures; gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/decision-log.md
project/records/M0-MERGE-LOAD-FILES.md
project/records/M0-SPLIT-LABEL-CATNO.md
project/trajectory.md
tools/lib/split-label-catno.mjs
tools/test/split-label-catno.test.mjs
commit 53a95c8d7c40c35f798fe1baf528379b5366162b
Author: djDAOjones
Author date: 2026-08-30T11:37:17+01:00
Commit date: 2026-08-30T11:37:17+01:00
Subject: M0-REPAIR-ENCODING: Repair MacRoman mojibake and invisible whitespace

Confirm the corruption is MacRoman from the CSV byte histogram and repair both layers — the MacRoman-encoded file and the UTF-8-read-as-MacRoman strings inside the workbooks — under a strict-decode acceptance test, so legitimate text containing the same characters is provably left alone; adds the zero-dependency xlsx reader the remaining M0 imports need.

Verify: node --test 'tools/test/*.test.mjs' 14/14 pass, including 31 fixtures drawn from the frozen inputs and 6 negative controls; check-memory 0 failures; gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

project/backlog.md
project/decision-log.md
project/records/M0-REPAIR-ENCODING.md
project/records/M2-MATCHER.md
project/trajectory.md
tools/extract-encoding-fixtures.mjs
tools/lib/text-repair.mjs
tools/lib/xlsx.mjs
tools/test/fixtures/encoding.json
tools/test/text-repair.test.mjs
commit 12493c1cb6e018a70b822ccabde897861bfc7377
Author: djDAOjones
Author date: 2026-08-30T11:31:49+01:00
Commit date: 2026-08-30T11:31:49+01:00
Subject: M0-ARCHIVE-FREEZE: Archive and freeze the source spreadsheets

Freeze the 87 real source files under a sha256 manifest so every later import can name the bytes it read; the 9,106-file venv and other reproducible artefacts are excluded by declared pattern, and the archived Discogs token is listed without a digest.

Verify: node --test 'tools/test/*.test.mjs' 4/4 pass; freeze-archive --check OK (87 files, 143245336 bytes); check-memory 0 failures; gen-backlog --check matches.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

data/archive-manifest.json
project/backlog.md
project/decision-log.md
project/records/M0-ARCHIVE-FREEZE.md
project/trajectory.md
tools/freeze-archive.mjs
tools/test/freeze-archive.test.mjs
commit 2bc9260bdd9aead8fb71f8696f0d972e52096069
Author: djDAOjones
Author date: 2026-08-30T10:07:35+01:00
Commit date: 2026-08-30T10:07:35+01:00
Subject: INIT: adopt pm-next v0.2, seed memory from the Deep Groove brief

Installs the pm-next v0.2 prototype (AGENTS.md, curricula.md, project
memory, the three state tools plus records-server) and populates it
from the v1 classical development brief dated 2026-08-28: brief,
20 records across M0-M5 plus five maintainer questions, five
architectural decisions, and the deferred wish-list.

The 189M "Pre August 2026" source archive is gitignored — it is a
read-only input under the project hard rules and it contains a
Discogs personal access token.

Verify: check-memory 0 failures / 1 intentional security warning;
gen-backlog --check view matches records.

Co-Authored-By: Claude Opus 5 <redacted-email>

Changed files:

.gitignore
AGENTS.md
curricula.md
project/backlog.md
project/brief.md
project/decision-log.md
project/records/M0-ARCHIVE-FREEZE.md
project/records/M0-IMPORT-AI-WORKS.md
project/records/M0-IMPORT-ENRICHED.md
project/records/M0-IMPORT-REMEDIAL.md
project/records/M0-MERGE-LOAD-FILES.md
project/records/M0-RECONCILIATION-REPORT.md
project/records/M0-REPAIR-ENCODING.md
project/records/M0-SPLIT-LABEL-CATNO.md
project/records/M1-CAPTURE.md
project/records/M2-MATCHER.md
project/records/M2-REVIEW-QUEUE.md
project/records/M3-WORKS-PERFORMANCES.md
project/records/M4-CLUSTERS-CONTRAST.md
project/records/M4-COMPILATION-COVERAGE.md
project/records/M5-SHOOTOUT-SELL-LIST.md
project/records/OPEN-DISCOGS-TOKEN.md
project/records/OPEN-PASSAGE-SELECTION.md
project/records/OPEN-SELL-THRESHOLD.md
project/records/OPEN-SYSTEM-OF-RECORD.md
project/records/OPEN-USERS-ACCESS.md
project/records/_meta.md
project/trajectory.md
project/wish-list.md
tools/check-memory.mjs
tools/gen-backlog.mjs
tools/janitor-read.mjs
tools/records-server.mjs
