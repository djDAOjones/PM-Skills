<!-- field-report: project=vinyl-sorting · date=2026-09-01 · type=export
     · pm-skills=pm-next-v0.2 (lab/next of djDAOjones/PM-Skills-lab at 530637a, vendored 2026-08-30; no canon release governs it)
     · source=Git blobs under project/ at snapshot 60c3c4b55dba25c52e6e0ba9a8bbf3fc9ea88f88, taken 2026-09-09 from the maintainer's checkout by Claude Code
     · redaction=0 checkout path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=public names Joe and djDAOjones, the public Worker subdomain joe-2d2 and the Discogs account name walter_odington retained where present — every one already public in the project's committed files; no unpublished identity was intentionally added -->

# Project-memory export

Snapshot: `60c3c4b55dba25c52e6e0ba9a8bbf3fc9ea88f88` (HEAD at harvest; the working tree carried no uncommitted change to any file under `project/`). pm-next keeps its memory at `project/` rather than `pm_skills/project/`: the records under `project/records/` are the open items, the view `project/backlog.md` is generated from them, and a shipped item's record is deleted rather than ticked, so the trajectory is the only list of what shipped.

| Repository-relative path | Source bytes at snapshot | Exported bytes after redaction |
| --- | ---: | ---: |
| `project/archive/decision-log-2026-08.md` | 66444 | 66444 |
| `project/backlog.md` | 8611 | 8611 |
| `project/brief.md` | 4137 | 4137 |
| `project/decision-log.md` | 45404 | 45404 |
| `project/records/AI-ROUND-TRIP.md` | 2705 | 2705 |
| `project/records/APP-RENAME.md` | 1831 | 1831 |
| `project/records/CATALOGUE-CONTROLS.md` | 2230 | 2230 |
| `project/records/M2-DISCOGS-PACING.md` | 3711 | 3711 |
| `project/records/M2-FIRST-RUN.md` | 2256 | 2256 |
| `project/records/M3-WORKS-PERFORMANCES.md` | 1144 | 1144 |
| `project/records/M4-CLUSTERS-CONTRAST.md` | 1257 | 1257 |
| `project/records/M4-COMPILATION-COVERAGE.md` | 936 | 936 |
| `project/records/M5-SHOOTOUT-SELL-LIST.md` | 1613 | 1613 |
| `project/records/NAMES-CANONICAL.md` | 3585 | 3585 |
| `project/records/NAV-HOME.md` | 2101 | 2101 |
| `project/records/OPEN-PASSAGE-SELECTION.md` | 702 | 702 |
| `project/records/OPEN-RECATALOGUE.md` | 2753 | 2753 |
| `project/records/PHOTO-CULL.md` | 3859 | 3859 |
| `project/records/PHOTOS-TO-DESKTOP.md` | 3564 | 3564 |
| `project/records/RECORD-EDIT-PHOTOS.md` | 3531 | 3531 |
| `project/records/SPIKE-PHOTO-TO-FIELDS.md` | 5678 | 5678 |
| `project/records/TRACKLIST-CAPTURE.md` | 3088 | 3088 |
| `project/records/_meta.md` | 1016 | 1016 |
| `project/trajectory.md` | 12491 | 12491 |
| `project/wish-list.md` | 3419 | 3419 |

<!-- FILE: project/archive/decision-log-2026-08.md -->

# Archived decision-log entries

<!-- Pruned from project/decision-log.md, VERBATIM, newest first.

     2026-08-31, fourth prune: a parallel session added five entries
     and this one added four, taking the live log to 23. The oldest
     nine move here — the M0/M1/M2 build decisions and the capture
     interface work of 2026-08-30. Their rules survive in AGENTS.md,
     in the schema comments and in tests.

     2026-08-30, third prune: a day of capture-interface decisions
     filled the log again. The seven oldest — M1 and M2 build decisions
     — moved here; the schema, the Worker's shape and the matcher's
     gate are all enforced by tests and by AGENTS.md, so the live log
     loses none of the rules they set.

     2026-08-30, second prune: the live log was full at 20 and
     CAPTURE-BULK-PHOTOS needed an entry, so the oldest six — the M0
     import and repair decisions — moved here. Their rules survive in
     code and tests (the split-label-catno rule is named in
     tools/lib/photo-fields.mjs and enforced by its tests), so leaving
     the live log costs working memory nothing.

     2026-08-30, first prune: the live log reached 19 of 20. The five
     founding decisions of 2026-08-28 moved here; their substance is
     restated in project/brief.md and AGENTS.md. -->

<!-- 2026-09-01, fifth prune: six entries, all 2026-08-30, moved
     when the interface stream took the log to its 20-entry
     ceiling. Verbatim, newest first, as the contract requires. -->

## 2026-08-31 — PHOTO-ROTATION: the stream does not turn with the phone

**Decision:** The camera stream is re-acquired whenever the phone
turns, the preview switches from `cover` to `contain`, the reading
reports `rotate_cw` in degrees rather than a word, and
`tools/photo-rotate.mjs` stands already-taken photographs upright from
that reading.

**Rationale:** Yesterday's measurement asked whether photographs arrive
rotated. Sixty real ones answered: yes, and intermittently, which is
the detail that identifies the cause. `451-1.jpg` arrived 90° out with
its catalogue number running vertically, while `449-1` and `452-1` from
the same session were upright.

**On iOS a track's dimensions are fixed when `getUserMedia` is called
and do not follow the device.** Open the camera in portrait, turn the
phone to frame a wide sleeve, and the frame stays portrait while it is
held sideways — so the label is stored rotated. Photographs taken
without turning the phone were fine, which is exactly the intermittency
observed. Restarting the stream on `orientationchange` renegotiates it
for the orientation now in use, and costs a black frame while turning.

**`contain` rather than `cover`, so the preview is what gets stored.**
Cover fills the screen by cropping, so the frame being composed was
never quite the frame being saved — and composing a catalogue number at
the edge of a sleeve is precisely what this is for. Letterbox bars cost
less than a cropped-off number.

**Degrees, not words.** The field was `orientation` with values like
`left`, which has to be interpreted before anything can act on it and
is ambiguous about whether it names the fault or the fix. `rotate_cw`
in degrees drives `sips -r` straight through. Verified against a real
photograph: 451-1 reported at 270° came back upright and legible, and
the 90° guess came back upside down — a direction convention that can
be checked is worth more than one that reads well.

**The sixty already taken are corrected, not re-shot.** The disc has
been handled once already, which the brief names as the expensive
resource. `photo-rotate.mjs` applies what a reading reported and is
idempotent by ledger rather than by inspection — a corrected photograph
is pixel-for-pixel indistinguishable from one that was always upright,
so re-running against the same reading would turn it twice.

Nothing detects an angle. A reading already reports one, and a
heuristic that disagreed would leave two answers and no way to choose.

## 2026-08-30 — PHOTO-ORIENTATION: ask before building a detector

**Decision:** The reading contract gains an `orientation` field —
`upright`, `left`, `right`, `upside-down` or `mixed` — reported by the
reader and shown in the score against how many values that photograph
got wrong. Nothing detects or corrects rotation. `orientation` is not a
scored field: it describes the photograph, not the record.

**Rationale:** Asked whether there could be "a viably light process to
identify the orientation of the writing". There could — a projection-
profile pass over the ink density is maybe sixty lines and no
dependency. But it would answer a question nobody has established is
being asked. No photograph has been read yet, so two things are unknown
and both are cheap to find out:

1. **Do photographs arrive rotated at all?** The live camera takes the
   frame as held, and a label is round, so the answer is not obvious in
   either direction.
2. **Does a rotated one read worse?** Vision models are largely robust
   to rotation. If a sideways label reads as well as an upright one,
   the whole question is moot however cheap the detector.

A detector is worth building only if both are true. One field in the
reply establishes both, costs nothing, and cannot be wrong in a way
that damages the data — it is never scored against a label.

**`mixed` is a correct answer, not a refusal.** A centre label with the
company name curved over the top and the title straight across the
middle genuinely has no single orientation, and forcing a choice would
manufacture a fact — the failure this project keeps returning to.

**If it turns out to matter, the cheap fix is not a detector.** The
phone knows how it is being held: `screen.orientation.angle` at shutter
time is deterministic where image analysis is a heuristic. That was not
built either, because whether the stream is already display-oriented
varies by browser and could not be tested on the maintainer's device
from here — building it blind risked rotating correct photographs into
wrong ones.

## 2026-08-30 — CAPTURE-VIEWFINDER: the camera takes the whole screen

**Decision:** While the camera is open it is fullscreen — fixed to the
viewport, page scroll locked, controls floating over the preview. In
landscape on a short screen they move to the right-hand edge. The torch
button is now always offered and tried, rather than gated on a
capability report, and explains itself when the browser refuses.

**Rationale:** Maintainer, on an iPhone SE mk2: landscape was unusable
because Safari's chrome took the room and the preview was capped at
`60vh` of what was left. On that device landscape is 375 px tall before
the browser takes its share — a preview too small to frame a label in.

Competing with the page for space was the mistake. Nothing else on that
screen matters while you are shooting, so nothing else is shown.
Measured at 667×375: the preview is now the full viewport in both
orientations, where it was a strip.

**Landscape moves the controls sideways.** At the bottom they cost the
height that is already scarce; on the right they cost width, which on a
667 px-wide viewport there is plenty of. 104 px of it, against 375 px of
height saved.

**The torch is offered, then tried.** It was gated on
`getCapabilities().torch`, which under-reports on some browsers and does
not exist on others — so the control was hidden from devices where it
would have worked. Now it is always shown, the first tap tries it, and
a refusal hides the button and says what does work: the system torch,
from Control Centre, stays lit while the camera runs. That is a real
answer for iOS rather than an apology. One wasted tap on a device that
cannot do it, against a feature that is not silently withheld from one
that can.

`100dvh` rather than `100vh`, so a collapsing URL bar cannot crop the
preview mid-shoot.

## 2026-08-30 — CAPTURE-LIVE-CAMERA: a viewfinder that stays open

**Decision:** Capture opens a live camera in the page. One tap per
photograph, no confirmation, no closing; a torch toggle where the
device has one; **Done** ends the viewfinder and **Queue it** uploads
the lot. `<input capture>` stays on the page as the fallback.

**Rationale:** Maintainer: "the flow should be camera on (flash on if
possible) and then store each shutter action, then click to upload
all." The file input cannot do that. iOS always shows Retake / Use
Photo and then closes the camera, so ten photographs is thirty taps and
ten context switches — and that friction lands on the one activity the
brief names as the thing that must not be slow.

`getUserMedia` gives a viewfinder that never goes away. It needs HTTPS,
which the live site has.

**Two costs, both real, both stated rather than discovered later.**

A video frame is a weaker image than the same phone's still: no HDR, no
multi-frame stacking. That matters here more than usual, because the
field this exists to read is a catalogue number printed smaller than
everything else on the label. So the constraints ask for 3840×2160
`ideal` — far above the 1568 px the photo is stored at — and the file
input stays on the page for a label the stream cannot resolve.

**Torch will almost certainly not appear on the iPhone.** It is a real
constraint that Chrome implements and Safari does not expose at all.
The button is capability-gated on `getCapabilities().torch` and stays
hidden otherwise, because a dead control reads as a broken app rather
than a platform limit. "Flash if possible" turns out to mean "not on
iOS", and saying so is better than shipping a button that does nothing.

**Frames are grabbed at the stored size, not at full resolution.** The
first version drew the 4K frame, encoded it, and let `downscale` encode
it again at save — two encodes, the first at six times the pixels. Now
`drawImage` scales in one step. Nothing is lost: the full-resolution
frame was being discarded at save anyway.

Shutter feedback fires before the encode rather than after, because the
encode is long enough to notice and a shutter that responds afterwards
feels broken.

**What is not verified:** shutter latency on a real phone. It was
measured only in a headless browser pane, where the renderer is
throttled and every timing came back pinned to a ~1 s tick — a
measurement of the harness, not the code. The structural gain is
certain; the number is not, and no number is claimed.

## 2026-08-30 — CAPTURE-UNDESCRIBED: the app stops asking what a photograph shows

**Decision:** Capture takes as many photographs of a record as you tap
for, and asks nothing about any of them. Every app-captured photograph
is stored as a new kind, `other`, meaning "a photograph of this item,
not described". Migration 003 rebuilds `item_photo` to allow it. The
five specific kinds stay valid for anything that can honestly claim
one; nothing captured in the app claims one, including the first shot.

**Rationale:** Maintainer, rejecting the kind-picker shipped hours
earlier: *"there will be no consistency, so any attempt to ascribe
information is dishonest and a waste of time."* That is this project's
own rule aimed at its own interface, and it is correct. `label_a`,
`front` and `runout` each assert something. With nobody asserting it,
writing one would invent a fact — and nothing downstream could
distinguish an assumed `label_a` from a confirmed one, which is the
failure the provenance rule exists to prevent.

The two cheaper options were both rejected on that reasoning.
Positional assignment (photo 3 is the sleeve front) asserts something
specific and wrong. Reusing `label_b` for extras asserts something the
schema does not mean. Only a new value ascribes nothing.

**A schema change, so it was a stop-and-ask**, per AGENTS.md. Taken now
rather than later because production held exactly one photo row: the
`item_photo` rebuild is as cheap as it will ever be, and the same
change in six months would carry hundreds of rows across a DROP TABLE.
Existing rows keep the kinds they were given — those were asserted by
an interface that asked, so they are evidence rather than guesses.

**Order is kept, because order is a fact.** The R2 key is
`clientId-<n>.jpg`. The index says when the photograph was taken and
nothing about what is in it, and it keeps the key stable so a retried
upload lands on the same object instead of making a second one.

**This forced the grouping work that was deferred this morning**, and
the deferral turned out to be right for the wrong reason: it was
waiting on a measurement, and what actually settled it was a product
decision. `photos-pull` now takes every photograph and names them
`<item_id>-<n>.jpg`; `photo-pack` batches by RECORD rather than by
image, so a record's shots can never be split across two packs; and the
prompt tells the reader that several images may be one record and asks
for one object per record. Without that last part a record photographed
three times comes back as three records — the same misattribution the
row ids exist to prevent, arriving from the other direction.

## 2026-08-30 — CAPTURE-MANY-PHOTOS: one frame is not one record

**Decision:** A capture carries several photographs, at most one of
each kind. The big button is always the centre label; add-buttons offer
only the kinds not yet taken — Label B, Sleeve front, Sleeve back,
Runout — and each extra appears as a removable thumbnail.

**Rationale:** Maintainer, from the shelf: "the catalogue and title
sometimes aren't in the same frame". That is true of most classical
LPs — the catalogue number is on the centre label, the title and
performers are often only complete on the sleeve, and on a boxed set
they can be three surfaces apart. A form that allowed one photograph
was quietly forcing a choice between them.

**Nothing below the form had to change.** `item_photo` has always been
a table rather than a column, `parseCapture` has always taken an array,
and the Worker has always written one row per photo. The constraint was
entirely in the capture screen. That is worth recording as a mark in
favour of the M1 schema: the first real product request arrived and the
data model already answered it.

**Only free kinds are offered.** A sleeve back filed as `label_b` would
assert something untrue, which is the fault crate and position were
fixed for hours earlier. Offering only the kinds not yet used makes the
wrong answer unreachable rather than merely discouraged, and it keeps
one photo per kind — which is what lets the R2 key be
`clientId-kind.jpg` without inventing a counter that a retry could
disagree with.

**The consequence lands downstream, and is stated rather than fixed.**
`photo-pack.mjs` treats one image as one row id, which no longer
matches a record that has three. `photos-pull.mjs` now counts what is
in the store by kind and says plainly how many photographs it is NOT
pulling, so a record whose title is on its sleeve cannot be read from
its label alone without someone being told. Making the pack carry
several images per row is the real fix and is deliberately not done
here — the spike has never been run, and changing what it sends before
it has a baseline would be tuning a measurement nobody has taken.

## 2026-08-30 — CAPTURE-LOCATION: a required location gets answered with filler

**Decision:** Crate stops being required, and both crate and position
move into the collapsed "More" section. Crate also stops being sticky.
Nothing is removed from the schema, and the review queue still shows a
location when one exists.

**Rationale:** Maintainer, on the evidence of the first real capture
through the photo path. Item 448 arrived as crate "1", position "1" —
placeholders, because the storage is neither permanent nor organised
and there was no honest answer to give. The reasoning for requiring it
("a session card has to say where to find the disc") assumed a stable
shelf order that does not exist; the maintainer would rather look for a
disc than maintain a map of where it was last seen.

A required field answered with filler is the worst of the three
options. The database then asserts a location that is untrue, and
nothing downstream can distinguish it from a real one — the same shape
as the M0 failure, where a catalogue number was recorded as a verdict
and 16 wrong matches were labelled "Exact". Absent is honest; typed is
useful; invented is expensive. This project's rule has been consistent
about which to prefer, and it applies to its own form.

**Stickiness had to go with it.** Crate persisted between discs, which
was right while the field was required and visible. Folded into "More"
it becomes an invisible field that fills itself in, so one placeholder
typed once would attach itself to every future capture unseen — the
same fault by a quieter route. The remembered value is now cleared on
load, so the "1" already stored stops propagating. `capturedBy` stays
sticky: it is a fact about who is holding the phone, not a claim about
the disc.

**A bug found while verifying this.** The downscale shipped with
CAPTURE-BULK-PHOTOS ran only on the bulk path, so a single capture
still queued a full phone frame — which is how item 448 reached R2 at
4.4 MB. Twenty spike photographs taken the way they were about to be
taken would have been ~130 MB in IndexedDB, on a phone, which is the
exact failure the downscale existed to prevent. It now runs on both
paths: a 6.45 MB frame queues at 370 KB.

## 2026-08-30 — CAPTURE-BULK-PHOTOS: a bulk row carries the crate and nothing else

**Decision:** Bulk capture writes one row per photo and carries exactly
three fields to every row — crate, position and who is capturing.
Everything else on the form is dropped. Position auto-increments only
from a number the person typed; blank stays blank. Photos are
downscaled to 1568 px on the long edge before they are queued. And the
drain now continues past a row the server rejects, stopping only when
the failure is shared.

**Rationale:** Promoted out of the icebox ahead of its stated trigger,
on maintainer instruction to bring the photo path forward. That was the
right call on the evidence: M2's remaining work is a deploy and 286
keyboard decisions, both maintainer work, so this was the buildable
item — and the brief names "building the app instead of cataloguing the
records" as the risk that actually matters.

Three sub-decisions carried real weight.

**What carries over is the whole design.** The obvious implementation
copies the form to every row, and that would put one disc's catalogue
number on twenty — nineteen invented values, indistinguishable from
typed ones, which is precisely the M0 error manufactured wholesale
rather than inherited. Crate is where you are standing, position is
countable, and who is capturing does not change between shots. A
catalogue number, a label, a condition grade are each a claim about one
disc. `BULK_CARRIED` is three entries long and a test asserts the other
eight are dropped.

**Position auto-increments only from a typed start.** Photographing in
shelf order genuinely does make positions sequential, so incrementing
is not a guess — but choosing the starting point would be. Type 12
before a crate of twenty and get 12–31; leave it blank and every row
has no position at all. The record asked for a decision rather than a
silent null, and this is one in both directions.

**A bad row must not hold a crate hostage.** The drain used to `break`
on any failure, which is right for one entry and wrong for twenty: a
photo the server refuses would sit at the head of the queue for ever
with the good ones stuck behind it. The split is now by cause — no
status means the fetch never completed (offline, everything behind
fails alike), 5xx is the server or a missing binding (equally shared),
4xx is about that entry alone. Verified in a browser against the real
Worker: a deliberately oversized photo in the middle of a batch of four
came back 413 and stayed `failed` and retrying, while the other three
synced, and the badge read "3 sent · 1 retrying" — a half-uploaded
crate that looks half-uploaded.

Downscaling was the cheap part but not optional: the queue stores raw
Blobs, so a crate of twenty phone frames is ~80 MB in IndexedDB, on a
phone, in a loft, where iOS evicts under storage pressure. 1568 px is
what the chat pack sends anyway, so nothing downstream loses anything.
If the browser lacks the canvas APIs the original is queued unchanged —
losing a capture to a resize is not a trade this app should make.

Nothing in the Worker or the schema changed; `parseCapture` already
accepted a capture with a photo and no catalogue number, and a test
already said so in those words.

## 2026-08-30 — SPIKE-PHOTO-TO-FIELDS: no API keys; the label reading goes through a chat window

**Decision:** No API keys, anywhere in this project. Reading a label
photograph happens by uploading a zip of images to a chat the
maintainer already pays for, and importing the reply. The metered path
— a vision API called from `tools/`, then perhaps from the Worker — is
ruled out, and the tool that implemented it is deleted rather than
parked.

**Rationale:** Maintainer's ruling, given as "no API keys to be used"
alongside the observation that a zip export of images with row ids
would be useful. It is a better fit than the design it replaced, on
three counts the spike had already flagged as costs:

- **OPS-SPEND-GUARD stays intact.** That decision rests on the
  Cloudflare Free plan being a hard wall — D1 refuses writes past
  100k/day rather than charging. A metered API key has no wall, and
  adding one would have reopened a question that is currently closed.
- **The Worker's one-outbound-file invariant survives.** A vision
  client would have been the second file in `worker/` making an
  outbound `fetch(`, against an exact-equality assertion in
  `worker.test.mjs`. Nothing now needs that test generalised.
- **No second secret**, in a v1 that has no sign-in.

**The cost it carries, recorded:** a hand-run round trip has a failure
mode an API call does not. Twenty images go up and eighteen objects
come back, and without ids every row after the gap is attributed to its
neighbour — nineteen plausible readings, all shifted by one, and
indistinguishable from good data. That is why every image is named
after its row id, why the id is repeated in the prompt text, why the
importer refuses an id it never sent, and why it exits non-zero when a
reply names one. The mitigation is not incidental to the design; it is
most of it.

Also uncosted but real: a person now does the uploading, 750 records at
20 per batch. If the readings turn out good, whether that is tolerable
is the next question — and it is the one thing that could argue for
revisiting the metered path.

**Trigger to revisit:** a scored run that passes the bar, plus the
maintainer finding the manual loop tedious enough to price again.

## 2026-08-30 — OPEN-SELL-THRESHOLD: value is never a reason to keep

**Decision:** A copy is kept for musical reasons only. Market value
does not earn a keep, however high. Selling is only attempted above
**£10**; below that the effort is not worth it.

**Rationale:** Maintainer's ruling, asked as "a losing copy turns out
to be worth £80 — sell or keep as an asset?" The answer separates the
two questions the shootout kept entangling: whether the music is worth
having, and whether the object is worth money. Only the first can keep
a record. Deciding it once removes a per-record hesitation from every
session, which is an R5 mitigation — the shootout dies around session
six when each decision reopens the same argument.

The £10 floor is about effort, not worth: listing, packing and posting
a £4 record costs more than it returns.

**Follow-on, unresolved:** what happens to a sub-£10 loser. It is not
sold and not kept, and nothing in the design says where it goes —
donate, charity shop, or a "not worth selling" pile. Small, but it will
come up the first session that produces one, so it is in the wish-list
rather than invented here.

## 2026-08-30 — OPS-SPEND-GUARD: the Free plan is the wall; the write budget is belt-and-braces

**Decision:** Ship the per-tick write budget and ship no CPU limit. The
account is on the **Free plan** (confirmed from the dashboard: 113 of
100,000 requests today, with an Upgrade button), so runaway billing is
not possible — D1 refuses writes past 100k/day rather than charging for
them. `WRITE_BUDGET_PER_TICK` stays at a provisional 200.

**Rationale:** This item was written on the premise that "Cloudflare
sells no hard spend cap", which is true on Workers Paid and moot on
Free. Its own scope note said to settle the plan question first because
it decides how much the rest matters. It did: the wall already exists,
the budget alert is set, and the per-tick budget is now redundancy
rather than the only defence.

The ceiling stays provisional deliberately. The item asked for it to be
measured, and it still should be — but a guessed number costing nothing
while billing is impossible is not worth blocking the item for. A test
asserts its headroom, so it cannot be tightened into a throttle by
accident.

**Cost of getting this wrong, recorded:** `[limits] cpu_ms` was added
here as prudence and made the Worker undeployable on Free — every
deploy failed with code 100328 until it was removed. The lesson is
narrower than "test your config": a guard that blocks shipping is worse
than the risk it guards. The test is inverted to hold that.

**Trigger to revisit:** upgrading to a paid plan. Then the wall
disappears, cpu_ms becomes settable, and the ceiling wants its
measurement.

## 2026-08-30 — DEPLOY: six faults only the real platform could show, and one wrong conclusion

**Decision:** Ship to a Worker serving its own static assets. The
matcher runs from cron, pacing Discogs requests at least 2 s apart.

Live at `deep-groove.joe-2d2.workers.dev` with 446 items, 446 match
runs and 2,045 candidates. Every fault below passed locally:

1. **Remote D1 rejects explicit transactions.** The seed wrapped itself
   in `BEGIN`/`COMMIT`; miniflare accepted it, D1 refused.
2. **`d1 info <name>` resolves through wrangler.toml**, which holds a
   placeholder on a first run — which is why the maintainer's first
   deploy appeared to do nothing. Ids now come from `d1 list --json`.
3. **D1 caps a query at 100 bound parameters.** The review queue bound
   one per run id, so a 200-row page returned 500 in production.
4. **A stored global `fetch` is detached in Workers**, raising "Illegal
   invocation". Node tolerates it; the default is now a wrapper.
5. **KV refuses a TTL below 60 s.** The spacing key wanted 8. The fake
   KV ignored TTLs entirely, so it shipped — a double more permissive
   than the real thing is worse than none, and it now enforces the floor.
6. **The rate limiter had no minimum spacing.** A per-minute budget is
   spent as an instantaneous burst, and Discogs enforces a lower rate
   than it publishes while caring about burstiness.

**A wrong conclusion, corrected.** On seeing 429s from the Worker while
the same token returned 200 from a laptop with 59 requests remaining, I
concluded Discogs was throttling Cloudflare's shared egress IPs and
that no amount of rate limiting could help. The maintainer said the
real limit is lower than published and needs about one request every
two seconds. That was right, and it was my bug: the fixed-window
counter permitted the entire budget instantly. The laptop looked
healthy precisely because its round-trip time paced it.

Both factors are real — the shared IP does make Discogs stricter, since
7 of 12 queries still fail at 2 s where the laptop managed 446 rows
with zero failures — but the dominant cause was mine. Tuning continues
in M2-DISCOGS-PACING.

**The pattern worth keeping:** a suite of 167 tests and a local
emulator caught none of these. Faults 4, 5 and 6 would each have
silently mis-reported records as unmatchable, had the error state built
in M2-MATCHER not refused to call a failed search a negative result.

**R2 stays off.** Enabling it needs a dashboard action the API refuses
and which may ask for payment details, so the binding is optional:
photo uploads answer a retryable 503 and the phone keeps them queued.

## 2026-08-30 — M2-REVIEW-QUEUE: two bugs that only a real browser was going to find

**Decision:** Ship the keyboard-driven queue — 1–5 choose, N none, S
skip, B back, M manual id — with each candidate showing which families
of evidence agreed rather than only a score. Resolving is the ONLY
route to decision-eligibility: the matcher writes `discogs` unconfirmed,
and a person's answer is what adds `confirmed_by`.

**A type-ahead race was mis-filing decisions.** `resolve()` read
`queue[cursor]` and advanced the cursor only after awaiting the write,
so a second keypress during the in-flight request answered the SAME
item twice — and because the write upserts on run id, the second answer
silently overwrote the first while the next item was skipped entirely.
Driving it in a browser produced `POST /review/1`, `/review/2`,
`/review/2`: three keystrokes, two items, one wrong answer recorded and
one item never seen. Someone clearing hundreds of items types ahead, so
this was the normal case. Fixed by capturing the run id before the
await and advancing optimistically, with a rollback that puts the item
back rather than losing it.

**The service worker would have blocked every future deployment.** It
was cache-first for everything same-origin, so once `index.html` was
cached a new build never reached anyone — the stale HTML kept pointing
at the old hashed assets. It was caught because the browser kept
serving a fixed module's old copy back during testing. Now navigations
and HTML are network-first with cache as the offline fallback, and only
content-hashed `/assets/*` are cache-first.

Neither bug was reachable from the test suite as written: one needed
real event timing, the other a real cache. That is the argument for
driving the thing rather than only asserting about it.

**On the done-when.** "The queue can be cleared by keyboard" is met and
was demonstrated. "The 446 have been through it" is not — that is an
operation needing a deployment and about an hour of API time, split out
as M2-FIRST-RUN rather than quietly counted as done.

## 2026-08-30 — M2-MATCHER: the gate works, and the audit nearly marked its own homework

**Decision:** Ship the ported ladder with the three intended changes —
MacRoman repair upstream, an input sanity check before any API call,
and the corroboration gate (score >= 80, families >= 2, margin >= 25).
Matching runs from a **cron trigger, not a route**, which is how "no
sign-in" survives the arrival of a live token: there is no HTTP entry
point to aim, and the query set is a pure function of stored capture
values.

**The audit had to be corrected before it measured anything.** The
first run scored each claimed release against the captured `label` —
but on those 277 rows the label came FROM Discogs, so the label family
always fired and 276 of 277 looked corroborated. That is Discogs
agreeing with itself. Re-run using only values whose recorded
provenance is `legacy` or `shelf`, it reports **12 unsupported**, 4 of
them labelled "Exact". The AGENTS.md rule — verification runs on what a
human read, not on what a bad match wrote — turns out to apply to the
verifier as much as to the data.

**What the gate caught.** A conductor captured as "Kletski" matched to
King Diamond's *Abigail II* on a colliding `2241-2`. `CFP 4016`, a
Classics for Pleasure number, matched to a Fontana pop single and
labelled "Exact". A 1938 Carnatic 78. A 2014 dance compilation. These
are precisely the collisions the margin and family tests exist to
refuse, and the old rule accepted them.

**The brief's figure of 26 cannot be reproduced, and is not claimed.**
It does not say which rows it meant or how they were identified, so
there is nothing to compare against. 12 is what the gate measures on
the evidence available. Reporting 26 would be fitting the number to the
story.

**Where risk remains:** 102 of the 265 supported rows carry no people
evidence at all — catalogue number, title and format only — and 29 of
those have no year either. A generic compilation title plus a colliding
catalogue number clears 80 unaided, so that is where a wrong match is
likeliest to be hiding.

**Alternatives:** Weight the catalogue number higher so more rows
auto-accept — rejected, that is the defect. Keep the label in the
audit — rejected, it is circular and produced a flattering, meaningless
result.

## 2026-08-30 — M1-CAPTURE-UI: the queue is the product, and it was verified in a browser

**Decision:** A single-screen PWA. Every capture is written to
IndexedDB before anything else happens, and the UI never awaits the
network. Sync is a background drain with capped exponential backoff
that never drops an entry. Label and catalogue number are separate
inputs, with the reason printed under them.

**Verified end to end in a real browser, not asserted.** A capture was
entered with no backend running; it queued, was marked for retry
rather than lost, survived a hard refresh with every field intact,
retried four times under backoff, and then synced the moment the
Worker appeared — arriving in the database as crate B4, position 12,
`SXL 6113`, Decca, Solti, VG+, with `shelf` provenance, unconfirmed,
and `decision_eligible` still zero. That sequence is the done-when:
captured with no signal, appears in the collection afterwards.

**Photo-first, so a photo-only capture is valid.** The requirement is
a crate — a session card has to say where the disc is — plus either a
photo or a catalogue number. Walking a crate photographing labels and
typing nothing is the fast, delegable path, and the API and the client
agree on it; a shared test feeds the client's request body to the
Worker's validator.

**Crate and captured-by are sticky.** You work through one crate at a
time, so re-typing it per disc is the single largest avoidable cost.
With no sign-in there is no identity to read, so `captured_by` is a
remembered free-text field — a partial recovery of the "who captured
this" the provenance model wants.

**The app measures itself.** Each entry records milliseconds from
starting the disc to queueing it, and the header shows a running
median. The done-when asks for a measured median under 30 s; the
instrument now exists and reports honestly, but the number will only
mean anything once real discs are captured. Nothing here claims that
threshold has been met.

**Local development needs no Cloudflare account.** `tools/dev-api.mjs`
serves the real Worker over the node:sqlite bindings, so the whole app
runs on a machine with no wrangler login. Deployment does need one and
is a maintainer step; README carries the runbook.

**Alternatives:** Post directly and queue only on failure — rejected,
it makes the offline path the exceptional one and therefore the broken
one. A combined label/catalogue field — rejected, that is the defect
M0 measured at 9%.

## 2026-08-30 — M1-WORKER: with no sign-in, the Worker's shape is the security

**Decision:** Named operations only — health, capture write, photo
upload, item reads, and a decision-eligible count that reads through
the views. Everything else returns 404 "no such operation". No route
takes a caller-supplied upstream query, and **M1 contains no outbound
request at all**.

**Rationale:** v1 has no sign-in, so nothing at the perimeter
distinguishes the maintainer from a stranger who finds the URL. What
does the work instead is the absence of anything worth aiming. The
strongest available form of "no proxy" is not a hard-coded upstream
but no outbound call to hard-code one into, and a test asserts exactly
that: zero bare `fetch(` in the Worker sources. A second test asserts
no route reads `DISCOGS_TOKEN` — the binding is declared so the types
know it exists, and dereferenced nowhere. The token is unreachable,
not merely unused.

This is what makes the no-sign-in decision cost nothing in M1: capture
is a person typing what is printed on a label, so there is no Discogs
path to protect yet. M2 changes that, and M2-MATCHER carries the gate.

**Capture writes are idempotent on a client-generated id.** The
offline queue retries, and a retry must not create a second physical
disc. A replay returns 200 rather than 201 so the client can drop the
queued entry either way without treating success as an error.

**Captured values are `shelf` and unconfirmed.** Reading a label is
not verifying a pressing — M2 confirms. So a freshly captured disc is
decision-ineligible exactly like an imported one, and a test asserts
it.

**A photo-only capture is valid.** Photo-first means walking a crate
photographing labels and typing nothing, so the API requires a crate
(a session card has to say where the disc is) plus either a photo or a
catalogue number — not a catalogue number.

**The rate limiter is built although nothing calls it**, so M2 cannot
skip it, with the shared budgets AGENTS.md fixes: Discogs 50/min,
MusicBrainz 1/sec. A test drives two limiter instances standing in for
two isolates and proves 50 total, not 50 each. The counter store is an
interface because KV is eventually consistent; when M2 needs
exactness, a Durable Object satisfies the same three methods.

**Testable with no Cloudflare account.** D1 is SQLite, so the bindings
are stubbed over `node:sqlite` and the Worker is exercised through
real HTTP requests against the real schema — no wrangler, no emulator.

**Alternatives:** A general `/api/discogs/*` proxy — rejected; with no
sign-in it hands a stranger the maintainer's rate limit and identity.
Per-caller rate limiting — rejected by AGENTS.md, and it cannot work
when callers are anonymous.

## 2026-08-30 — M1-SCHEMA: provenance decides where a value lands, and views decide what may read it

**Decision:** The four-entity schema from brief section 03, with two
enforcement mechanisms rather than conventions.

**The query layer is real code.** Four views — `v_confirmed_field`,
`v_decision_eligible_item`, `v_decision_eligible_release`,
`v_eligible_work_coverage` — are the only route by which anything may
feed a cluster, coverage check, sell list or shortlist. A `guess` or
`legacy` value is unreachable through them *even when marked
confirmed*, and an unconfirmed `discogs` value likewise. Tests assert
both directions: that the loaded dataset yields nothing, and that
confirming one row makes exactly that row appear. A view that is
merely empty proves nothing; this one discriminates.

**A value's destination is decided by its provenance, not its name.**
`label_raw` sourced `legacy` is something a person typed and goes to
`capture`; the same column sourced `discogs` is something a matcher
wrote and goes to `release`. This is the AGENTS.md boundary — never
write back over capture — made structural. Of the 446 rows, 31 labels
reached `capture` (the ones M0 split out of the backlog) and 267
reached `release`.

**Nothing is dropped.** Values with no home in the model yet go to
`raw_value` with provenance intact: 1,248 `guess`, 554 `discogs`
(musicians and track listings on matched rows, homeless until M3
resolves tracks into works) and 528 `legacy`. A first attempt tallied
these by column name and was wrong twice — the 28 track listings M0
reclassified are named like legacy columns and are guessed in truth.
Counting by name would have reproduced, in the statistics, the exact
confusion the provenance rule exists to end.

**Load result:** 446 items, 446 captures, 267 releases across 277
links — 10 items share a pressing with another, which is two copies of
one release and not a duplicate — and 4,681 `field_source` rows. Zero
decision-eligible, which is the done-when.

**Testable without Cloudflare.** D1 is SQLite, so the schema and the
load run against Node's built-in `node:sqlite`: no emulator, no
account, no deploy. The same SQL is what `wrangler d1 execute` applies.

**Alternatives:** Enforce provenance in application code — rejected,
that is the convention the rule explicitly refuses. Drop the values
with no home — rejected, `musicians` and the track listings are M3's
input.

## 2026-08-30 — OPEN-USERS-ACCESS: no sign-in for v1, and the risk is deferred rather than accepted

**Decision:** No sign-in for v1. Two or more trusted people capture,
and the maintainer chose no authentication after being shown that
Cloudflare Access needs no password — an emailed code or a Google
sign-in — and that it is free to 50 users. That is the maintainer's
call and the build follows it. `brief.md` is updated so the identity
document stops claiming Access sign-in.

**The concern, recorded once:** an open URL means anyone who finds it
can read and edit the collection, and any public endpoint that reaches
Discogs does so with a token now confirmed live. The brief also says
"not public, ever". Per-person identity would additionally have told
`shelf`-sourced values who read them off the record.

**Why this costs nothing yet.** Capture does not call Discogs — it is
typing what is printed on a label, offline, into an IndexedDB queue. So
M1 needs no Discogs path reachable from the browser at all. The Worker
gets named operations only, capture-write and dataset-read, rather than
a general proxy; the token stays a Worker secret that no caller can
aim. Deployment goes to an unguessable Pages subdomain.

**Where it becomes live: M2.** The matcher is the first thing that
would let a caller drive Discogs queries. Noted on M2-MATCHER as a
gate: before shipping the matcher, either add Access then, or keep
matching strictly server-side as a queued job with no
caller-controlled query. The second option preserves "no sign-in" and
still closes the quota hole, so this may never need revisiting as an
auth question at all.

**Alternatives:** Cloudflare Access with an email allowlist —
recommended and declined. A shared passphrase — not offered seriously;
it is more friction than Access and weaker.

## 2026-08-30 — OPEN-SYSTEM-OF-RECORD: the app database is authoritative

**Decision:** Confirmed by the maintainer — the app database is the
system of record. Import is one-way: the frozen spreadsheets flow in
once and are never written back. The CSV export to OneDrive is a
readable backup, not a synchronisation contract.

**Rationale:** The alternative makes round-tripping a first-class
problem, and round-tripping between a database and a spreadsheet is
where the previous nine schema generations died. One-way import means
`data/deep-groove-v1.csv` is a handoff artefact rather than a live
mirror, and M1 can load it and forget it.

**Consequences to hold to:**

- Editing moves into the app. A spreadsheet edited after M1 loads is
  not a source of truth, and nothing will reconcile it.
- The export is written for a human to read and for disaster recovery.
  Nothing reads it back in.
- `Pre August 2026/` stays read-only, as it already is.

**Alternatives:** OneDrive stays authoritative — rejected by the
maintainer. It would have required two-way sync, conflict resolution
and a merge story for per-field provenance, none of which a private
household tool should be carrying.

## 2026-08-30 — OPEN-DISCOGS-TOKEN: valid, not a seller, and that costs less than assumed

**Decision:** Keep the existing token. The account will not be made a
seller. Valuation uses lowest asking price, number for sale and the
have/want ratio; condition-graded price suggestions are out of scope.

**Verified, not assumed.** The token authenticates — HTTP 200 on
`/oauth/identity`, account `walter_odington` (id 1149676), 40-char key.
`num_for_sale` is 0 and `/marketplace/price_suggestions` returns 404
"You must fill out your seller settings first", so the account is
definitively not a seller.

**What that actually costs.** Tested against release 7387168, the first
row of the M0 dataset:

- `/marketplace/stats` — HTTP 200. `num_for_sale: 21`,
  `lowest_price: GBP 1.59`.
- `/releases/{id}` — HTTP 200. `community.have: 70`, `community.want:
  13`, `lowest_price: 2.15`.
- `/marketplace/price_suggestions` — 404, seller-only.

So the only loss is "what should a VG+ copy fetch". Lowest current
price, supply and the have/want ratio are all reachable, and have/want
is a better scarcity signal than a price suggestion anyway. An earlier
note in this session claimed a non-seller account could not value a
record at all; that was wrong, and it changes OPEN-SELL-THRESHOLD from
a question about whether valuation is possible into a question about
what to do with the number.

**Handling:** the token was read inside a script and never echoed. It
stays out of the repo, enters the Worker via `wrangler secret`, and the
archived copy remains listed in the manifest without a digest.

**Alternatives:** Fill out seller settings to unlock price suggestions
— rejected by the maintainer, who has never sold and does not intend
to. Mint a fresh token — unnecessary, this one works.

## 2026-08-30 — M0-RECONCILIATION-REPORT: the report is generated from the build it describes

**Decision:** `tools/build-report.mjs` writes both artefacts —
`data/deep-groove-v1.csv` and `data/reconciliation-report.md` — from a
single `buildDataset()` call, and embeds a machine-readable summary
block. The gate asserts those numbers still equal a fresh build, that
the digests the report quotes match `data/archive-manifest.json`, and
that every source row is either imported, dropped or explained.

**Rationale:** A hand-written report is out of date the moment an
import changes, and a report that disagrees with its dataset is worse
than none — it is the artefact that is supposed to make the import
trustworthy. Generating both from the same in-memory rows makes
disagreement impossible rather than unlikely. The summary block exists
so the gate can check the claim rather than the prose.

The report states rules, not just counts: the placeholder rule, the
multiplicity rule for de-duplication, why a wrong label is worse than
an absent one, and that there are no AI ratings. Tests assert those
sentences are present, because a count without its rule cannot be
disputed later.

**M0 is complete.** 446 rows: 305 enriched, 141 backlog, 0 merged from
the load files because all 83 were already present. 210 placeholders
dropped with every ID listed. 0 rows decision-eligible. Verified: the
frozen archive is byte-for-byte unchanged after the whole milestone
(87 files, 143,245,336 bytes), the rebuild is byte-identical, and git
records no write inside `Pre August 2026/`.

**Expect the totals to move.** The report says so in its own text. It
is a record of this pass, not a permanent truth; what should survive is
the rule each count came from.

**Milestone state:** Current is now empty. M1 is ready to promote but
carries three `sign-off` questions — OPEN-USERS-ACCESS,
OPEN-SYSTEM-OF-RECORD and OPEN-DISCOGS-TOKEN — and promoting it is a
maintainer call, not a self-approval. `_meta.md` says so rather than
leaving an unexplained empty milestone.

**Alternatives:** Write the report by hand — rejected, it would drift
from the data on the first re-import. Emit only the summary JSON —
rejected, the report has to be readable by a person deciding whether
to trust the import.

## 2026-08-30 — M0-IMPORT-AI-WORKS: the ratings do not exist, and the track listings had already leaked

**Decision:** Attach the AI columns to the 305 enriched rows tagged
`source: guess` — track listing, track-listing confidence, remarks and
sources. Keep the rating columns in the schema and let them arrive
empty. Reclassify the 28 enriched-sheet track listings that are
byte-identical to the AI output from `legacy` to `guess`.

**Finding 1 — there are no AI ratings.** `Critical Rating` is empty in
all six AI Works files that carry the column, including
`AI_Vinyl_Works_Stage_7 Rating Qualifiers etc.xlsx`. The
AI-invented ratings the brief warns about were never written. This
narrows the item rather than blocking it: what does exist is 305 AI
track listings, their confidence (High/Medium/Low), remarks and
sources. The rating columns stay in the schema and arrive blank, which
is the honest result and leaves M5's valuation pass somewhere to land.

**Finding 2 — the AI track listings had already leaked into the
sourced data.** On all 28 rows where Discogs found nothing, `Track
listing` in `Classical Master` is byte-identical to the AI file's
value; on none of the 277 matched rows is it. That is precisely the
"AI-invented data sits indistinguishably beside sourced data" problem
the brief describes, and it is now measured rather than feared. Those
28 values are reclassified to `guess` — identity with the AI output is
evidence, not inference. Their tell-tale is visible in the prose:
"exact symphony numbers not verified from accessible sources", sitting
in a data column.

**On the v2 override:** v2 `classical Track listings 01.xlsx` was
chosen to win over v1 Stage 8 for track listings. It agrees with Stage
8 on all 305 rows, so the override changed nothing. Recorded because
"we checked and they agree" is a different fact from "we did not
check", and `ai_track_listing_origin` says so per row.

**Rationale for the guess tag:** enforcement is by computation, not
convention. `decision_eligible` is recomputed after the AI pass so a
guessed value cannot make a row eligible by arriving late, and a test
asserts that a guessed value stays ineligible even when the row is
marked confirmed.

**Alternatives:** Discard the AI columns — rejected, the track listings
are a usable starting point and the provenance rule is what makes
keeping them safe. Leave the 28 as `legacy` — rejected, that labels AI
prose as a human entry, which is the exact confusion this item exists
to end.

## 2026-08-30 — M0-MERGE-LOAD-FILES: the 83 rows were already merged, so 0 are new

**Decision:** Merge 0 new rows and record 83 duplicate decisions. The
83 usable rows in `1st load to add.xlsx` and `2nd load to add.xlsx` are
already present in `Classical Remedial`. The reconciled dataset stays
at 446 rows, not 529.

**Rationale:** Two independent methods agree. Positionally, the 83 rows
map in order onto Remedial rows 59-141 — all 83 catalogue strings and
all 46 titles match exactly, with only the IDs differing because the
Remedial sheet renumbered them to 1058+. Separately, the merge's own
key-based de-duplication, which knows nothing about row order, matched
all 83 and merged none. 2nd load occupies Remedial 59-104 and 1st load
105-141.

446 is also what the brief already says: "446 already catalogued". The
~300 new records are the physical backlog that has never been entered,
not these files.

**De-duplication is by key with multiplicity.** Four rows read
`RTL2075 MCPS`, and they are four physical copies rather than one row
counted four times, so a key already present four times absorbs four
incoming rows and no more. A test asserts each of the four matched a
different existing copy. Key matches with disagreeing titles are
treated as ambiguous and kept, per the record — carrying a duplicate a
person can resolve while holding the disc beats merging on a guess.
None occurred.

The key folds case, spacing and the Unicode dashes so `TWO-269` and
`TWO‑269` compare equal. That folding is for comparison only; stored
values stay faithful, because normalising the data itself is M2's job.

**Consequence for M2:** the re-verification run is 446 rows, and the
load files need never be read again.

**Alternatives:** Merge all 83 and de-duplicate later — rejected, it
would put 83 known duplicates into the dataset that M2 would then
re-verify against Discogs at real cost. Match on catalogue number
alone — rejected, it cannot distinguish a genuine second copy from a
re-import, which is exactly what multiplicity handles.

## 2026-08-30 — M0-IMPORT-REMEDIAL: the placeholder rule is mechanical, and every drop is named

**Decision:** A `Classical Remedial` row is a placeholder when it
carries no value in any column other than ID. That rule partitions the
sheet exactly 210 placeholders / 141 real records. The 141 import as
`needs-capture`; the 210 are dropped, and every dropped ID is returned
so the reconciliation report can list them.

**Rationale:** The record allows dropping but not dropping silently.
A rule that needs no judgement can be re-run and disputed later — if
the numbers ever look wrong, the report names the rule and the 210 IDs
it applied to, and anyone can check it against the frozen sheet. The
rule was not chosen to fit a target: it was applied first and produced
210/141, which is what the brief already claimed.

**On provenance:** every value here is `legacy`. None of these rows was
ever matched against Discogs, so no Discogs field exists to carry over,
and a test asserts none appears. `Label` is empty on all 141 — the
"label captured on 0% of the backlog" finding — so the combined string
in `Catalogue #` goes through the splitter: 31 split, 73 bare catalogue
numbers, 37 refused and left with their combined string intact.

**On item ids:** allocation moved out of the importers into
`build-dataset.mjs`, so numbering runs unbroken across batches. Ids are
stable as long as the import order is, and that order is fixed by the
M0 sequence. The composed dataset is DG-0001 to DG-0446 — 305 enriched
plus 141 backlog, which is exactly the brief's "446 already
catalogued".

**Alternatives:** Drop rows lacking a title or catalogue number —
rejected, it would have discarded the 58 rows that carry only a
composer, which are real records. Keep the placeholders as empty rows
to be filled later — rejected, they are 210 unallocated ID slots, not
records; the physical backlog is counted by handling discs, not by
counting blank spreadsheet rows.

## 2026-08-30 — M0-IMPORT-ENRICHED: which columns Discogs wrote, established from the data

**Decision:** Import all 305 rows with per-field `<field>_source`
columns. `Label`, `Discogs ID`, `Discogs URL` and `Discogs ID Score`
are `discogs`; `Musicians` and `Track listing` are `discogs` on the 277
matched rows and `legacy` on the other 28; everything else is `legacy`.
Confirmation is `no` on every row. The existing confidence labels ride
along as `discogs_confidence_legacy` and `discogs_score_legacy` — data
to audit, never provenance.

**Rationale:** Which columns the enrichment actually wrote was measured
rather than assumed. `Label`, `Discogs ID`, `Discogs URL` and
`Discogs ID Score` are populated on exactly the 277 rows where
`Discogs record found?` is Yes and on none of the other 28 — a perfect
correlation, so they are Discogs output. `Musicians` and `Track
listing` are filled on all 305, but 166 of the 277 matched rows carry
Discogs credit-role markers such as "(Orchestra)" and artist
disambiguation such as "(6)", and none of the 28 unmatched rows do, so
that column was overwritten by the same pass. The remaining columns
are filled uniformly across all 305 and therefore predate it.

The legacy confidence labels are carried but never trusted: 236 rows
say "Exact", and 16 of the known-wrong matches are among them. A test
asserts that no confidence label can make a row decision-eligible.

**On `decision_eligible`:** the provenance rule is emitted as a
computed column rather than left to convention, so it can be tested.
It reads `no` on all 305 rows, which is the correct end state for a
pure import — nothing has been confirmed by a person and nothing was
captured off the shelf.

Per-field confirmation state is deliberately not emitted as thirty more
columns all reading `no`. M0 confirms nothing, so one row-level
`confirmed` column states the invariant; M1's D1 schema materialises
real per-value `field_source` rows.

**Alternatives:** Treat every column in the sheet as `discogs` —
rejected, it would misattribute the composer and title a person typed
years ago. Treat the whole sheet as `legacy` — rejected, it would lose
the record of what to re-verify in M2. Trust the confidence labels —
rejected, that is the defect the project exists to fix.

## 2026-08-30 — M0-SPLIT-LABEL-CATNO: labels are recognised, never inferred

**Decision:** Split against a gazetteer of the 98 distinct labels
attested in this collection's own data — the 277 rows of `Classical
Master` where Discogs already supplied a separate Label. A label is
emitted only when an attested name matches and the remainder is a
well-formed catalogue number. Everything else is refused with a named
reason, and refusals route to capture. Three outcomes, not two:
`split`, `bare-catno` (no label present, which is complete rather than
failed) and `refused`.

**Rationale:** The record's rule is that a wrong label is worse than an
absent one, because a wrong label corroborates a wrong match — the
exact failure that put 26 of 277 existing matches on the wrong record.
A pattern-based splitter would have to decide whether `Harmony` in
`CBS Harmony 30001` is a sub-label or part of the catalogue number, and
it would be guessing. Deriving the vocabulary from the data replaces
that guess with evidence, and makes the refusals principled: `Decca Ace
of Diamonds SDD 538` is refused because this collection has never
attested `Ace of Diamonds`, not because a regex failed.

Two-character labels are excluded from the gazetteer. `PS` is an
attested label and also the prefix of `PS 287` and `PS5032`; keeping it
would split real catalogue numbers in half.

**Result on the 141 backlog rows:** 31 split, 73 bare catalogue numbers
with no label present, 37 refused — 18 unattested sub-labels, 11
unattested label prefixes, 7 cells holding two pressings, 1 unrecognised
parenthetical. All 31 splits were checked by eye and are correct,
including `EMI Eminence` beating `EMI` on longest match. Label casing
is normalised to the attested form, so `Vox` becomes `VOX`.

Nothing is discarded: every result keeps `combinedRaw`, so a refusal
loses no data and a later pass with a larger gazetteer can re-split it.

**Alternatives:** Pattern-only splitting — rejected, it cannot tell a
sub-label from a catalogue prefix, and would emit exactly the confident
wrong labels this project exists to stop. Accepting a parent label when
the sub-label is unattested — rejected for the same reason: `Decca` is
a label that pressing does not carry. Compound matching of two adjacent
attested labels — rejected, it would gain 2 rows and would also merge
`Columbia/CBS`, which is genuinely two labels.

## 2026-08-30 — M0-REPAIR-ENCODING: two corruptions, one confirmed as MacRoman

**Decision:** Repair in two separate passes. Byte-level: decode
`classical vinyl list in progress.csv` with MacRoman rather than
UTF-8. String-level: undo "UTF-8 bytes decoded as MacRoman" inside the
workbooks by re-encoding to MacRoman and decoding as strict UTF-8,
accepting the result only when the whole string decodes cleanly.
U+00A0 folds to a space rather than being deleted; zero-width
characters are deleted; newlines survive.

**Rationale:** The byte histogram settles the diagnosis rather than
assuming it — 0xCA x68, 0xD0 x57, 0x8E x19 read as NBSP, en dash and
e-acute under MacRoman, and as unassigned, Eth and E-circumflex under
cp1252. The record predicted cp1252 would produce different wrong
answers; it does, and there is now a test asserting it.

Strictness is the safety property. A repair that accepts partial
decodes would rewrite legitimate text: `Side A • Side B` and
`√2 is irrational` contain the exact characters MacRoman mojibake
produces. Requiring that the entire string decode as valid UTF-8, and
that it contain a UTF-8 lead byte at all, leaves both untouched — both
are negative controls in the suite.

U+00A0 folds to a space because in `CBS Harmony 30001` it separates
the label from the catalogue number. Deleting it welds two tokens
together and defeats the exact match this whole item exists to enable.
Newlines survive because track listings are multi-line and M3 reads
them per track.

**Scale:** 331 distinct strings repaired across the frozen inputs —
324 invisible-character fixes and 7 mojibake fixes. All 7 are in the
`Label (and Catalog #)` column of the load files, which is the field
the corroboration gate depends on.

**Alternatives:** cp1252 — rejected on the evidence above. A
character-by-character substitution table — rejected, it cannot tell
a real bullet from half a mojibake pair, which is precisely the
distinction that matters. Normalising U+2011 to ASCII hyphen here —
rejected as out of scope: M0 repairs faithfully, M2 normalises, and
conflating the two hides the original bytes. Noted on M2-MATCHER
instead.

## 2026-08-30 — M0-ARCHIVE-FREEZE: freeze 87 sources, not 9,285 files

**Decision:** The frozen manifest covers the 87 files that are
actually source data. `.venv/`, `__pycache__/` and nested `.git/`
are excluded by declared pattern, each with its reason recorded in
the manifest itself. Digests are sha256 over bytes; mtime is
deliberately not recorded. The archived Discogs token is listed by
path and size with its digest written as `REDACTED-SECRET`.

**Rationale:** `Pre August 2026/` holds 9,285 files, of which 9,106
are a Python virtualenv belonging to the old Windsurf CLI. Hashing
them exceeded two minutes and froze nothing of value — a venv is
reproducible from `pyproject.toml` and is not an input to any
import. Scoped to real sources the manifest builds in 0.5 s, which
makes `--check` cheap enough to run as a gate rather than a ritual.
mtime is omitted because this tree lives on OneDrive and sync
rewrites timestamps, so recording them would make `--check` fail for
reasons unrelated to the bytes. The token digest is redacted because
the manifest is committed, and a hash of a live credential does not
belong in git history.

**Alternatives:** Hash everything — rejected, minutes of work to
freeze artefacts that no import reads. Exclude silently — rejected,
an undeclared exclusion is indistinguishable from a bug; the
manifest carries `excluded` and `redacted` lists so what is absent
is auditable.

## 2026-08-28 — DATA-MODEL: four linked records, not a flat row

**Decision:** Model `item` (a disc you own), `release` (a Discogs
pressing), `performance` (a reading) and `work` (the music) as four
linked entities rather than one row per record.

**Rationale:** The existing spreadsheets cannot answer "how many
copies of this symphony do I own, and which is best?" because a flat
row conflates all four. The keep/sell decision belongs to the item;
identity belongs to the release; `work` is what you group by to find
clusters; `performance` is what you compare and what a verdict
attaches to. A conductor field on a flat row does the first two badly
and the last not at all. This conflation is the direct cause of nine
schema generations and five restarts.

**Alternatives:** Keep a flat row with more columns — rejected, it is
the thing that failed. Group by conductor string — rejected, it cannot
distinguish two recordings by the same conductor.

## 2026-08-28 — PROVENANCE: every sourced value carries its origin

**Decision:** Every sourced value carries a `field_source` row naming
its origin (shelf, discogs, musicbrainz, legacy, guess) and its
confirmation state. Values sourced `guess` or `legacy`, and
unconfirmed `discogs` values, may be displayed anywhere but may never
feed a cluster, a coverage check, a sell list or a shortlist until a
person confirms them. Enforced in the query layer, not by convention.

**Rationale:** AI-invented ratings and track listings currently sit in
the same cells as sourced data, indistinguishable. This is the single
rule that lets the AI Works columns be imported safely instead of
discarded, and the rule that stops the current mess recurring.
Convention will not hold it — the query layer will.

**Alternatives:** Discard the AI columns entirely — rejected, some of
it is useful as a starting point. Trust-by-column — rejected, the
corruption is per-cell.

## 2026-08-28 — MATCH-GATE: a catalogue number is a lead, never a verdict

**Decision:** Auto-accept a Discogs match only when score >= 80, at
least two independent signal families agree, and the margin over the
runner-up is >= 25. Reject junk catalogue input before any API call.
Persist the top five candidates and the exact queries used.

**Rationale:** 26 of 277 existing matches point at a different record
and 16 of those are labelled "Exact", because today's rule is `catno
exact → accept`. Catalogue numbers are unique per label, not globally.
The margin test kills the collisions where four records all matched
one release with nothing to separate them.

**Alternatives:** Raise the string-similarity threshold — rejected,
confidence must derive from evidence, not string equality.

## 2026-08-28 — STACK: Cloudflare Pages plus one Worker

**Decision:** Static SPA on Cloudflare Pages building from the GitHub
repo, with a Hono Worker holding the Discogs token, proxying and
rate-limiting both APIs, and running jobs. D1 for data, KV for cache,
R2 for photos, Access for sign-in.

**Rationale:** Two constraints rule out a pure static site: the
Discogs API sends no CORS headers, and a static site cannot hold a
secret. One small server-side component solves both and additionally
enforces one shared rate limit, so two people cataloguing at once
cannot throttle the account.

**Alternatives:** Supabase — reasonable, but free projects pause after
about a week of inactivity, which is wrong for a stop-start project.
Pure static site — impossible, see above.

## 2026-08-28 — REUSE-CLI: port the Windsurf Python matcher, don't rewrite

**Decision:** Port the existing CLI's normalisation ladder, query
permutations, rate limiting and resumable output into the Worker.
Three changes only: MacRoman instead of cp1252, the input sanity
check, and the corroboration gate.

**Rationale:** That logic is already proven against this exact data.
Rewriting it would discard the one component with a track record and
reintroduce bugs already found.

**Alternatives:** Fresh implementation — rejected, no upside.

<!-- FILE: project/backlog.md -->

# Backlog

<!-- GENERATED between markers: edit project/records/, run tools/gen-backlog.mjs. -->

## Active

<!-- generated:records:start (edit records/, run gen-backlog) -->

### Current milestone

<!-- Intent: M2 plus the interface brief of 2026-08-31. M2's own remainder is maintainer work — clearing 287 needs-review by keyboard — and the app moves to its real URL, gains a home page and a settings screen, and is rebuilt on one visual language. The two meet at the review queue: REVIEW-CARD and MATCH-OTHER-NUMBERS exist to make clearing it cheaper, not prettier. -->

- [ ] **APP-RENAME Set EDIT_TOKEN on the renamed Worker** (2026-09-01) —
  The move to vinyl-sorter is done and the old script is deleted, but
  Worker secrets are per-script and EDIT_TOKEN did not come across — so
  correcting a reading and downloading an export both answer 503 until one
  command is run.
- [~] **SPIKE-PHOTO-TO-FIELDS Can a label photograph populate the
  capture fields?** [spike] [blocked: ground truth typed to the scorer's
  columns — `decoy_numbers` above all] (2026-08-30) — The round trip has
  now run end to end — crate 3, six records read blind and scored — and it
  fails, but on schema rather than on reading: ten of fourteen wrong
  values are two documents answering different questions, and the decoy
  check that the whole spike exists for never ran at all, because
  `decoy_numbers` was not a column the typed sheet had. Photographs are no
  longer the blocker; ground truth typed to the scorer's own columns is.
- [~] **PHOTOS-TO-DESKTOP Pull captured photos and their row ids out for
  a chat pack** [detail](records/PHOTOS-TO-DESKTOP.md) (2026-08-30) —
  Built, gated and live — photos-pull reads (item_id, r2_key) pairs from
  D1 and fetches each object by name, writing data/label-photos plus a
  ground-truth starter taken from the values a person typed into capture;
  R2 is now attached and a photo has made the full round trip, so all that
  is left is photographs being taken.
- [~] **M2-FIRST-RUN Run the matcher over all 446 and clear the queue
  once** — The operation, not the code — deployed and run as of
  2026-08-31, every row carrying a match_run and 287 sitting in
  needs-review, so all that remains is a person clearing the queue by
  keyboard.
- [ ] **TRACKLIST-CAPTURE Capture tracklists — from Discogs first, from
  photographs only where that fails** (2026-08-31) — release_track has
  held zero rows since M1 because the Worker's getRelease is never called,
  so the tracklist Discogs already returns for every accepted match is
  fetched, scored and discarded — and a tracklist is the field that says
  what a pressing actually is when a catalogue number is shared, which is
  exactly the tie the corroboration gate cannot currently break.
- [~] **M2-DISCOGS-PACING Tune Discogs pacing — 7 of 12 queries still
  fail in the Worker** (2026-08-30) — A richer reading costs 9.4-12
  queries against capture-only's 4.7, which broke the matcher three ways —
  Discogs throttling, Cloudflare's per-invocation subrequest cap and a row
  selected twice; all three are fixed and the interval now learns its own
  level from the refusal rate rather than being tuned by hand, backing off
  entirely when a tick reaches nothing.
- [ ] **OPEN-RECATALOGUE Photograph the 446 imported rows rather than
  review them by keyboard?** [sign-off] (2026-08-31) — Every one of the
  293 items in the review queue is a legacy spreadsheet row and 267 of
  them have no label, which is exactly why the corroboration gate refuses
  them — so photographing those discs would supply the missing signal
  family and shrink the queue, and the question is whether handling 267
  discs costs less than deciding 293 blind.

### Next milestone

<!-- Intent: The half of the interface brief needing data the database does not hold — value and genre, a re-verification sweep for when the backlog empties, and readings that name their source photograph. Each blocked on a migration, a backfill or a pack-format change rather than on M2. -->

- [~] **CATALOGUE-CONTROLS Sort, filter and choose columns on the
  collection screen** (2026-08-31) — The interface half is done — every
  column sortable and choosable, five named views including the mop-up
  crate, and the whole view in the URL — so what remains is the two sorts
  that need data the database does not hold: value, which needs a price
  backfill, and genre, which needs a migration.
- [ ] **AI-ROUND-TRIP Make the hand-carried reading loop fast, and make
  it say which photograph it read** (2026-08-31) — The maintainer kept the
  no-metered-services rule, so the answer is a better round trip rather
  than an API — and its biggest missing field is provenance, because a
  number off a disc label and one in sleeve small print arrive with
  identical standing.
- [ ] **NAV-HOME Every screen needs a visible way back to the hub**
  [detail](records/NAV-HOME.md) (2026-09-01) — The keyboard already goes
  home — `g` then `h` — but a phone has no keyboard, and capture opens
  full-screen into the camera by design, so on the device the app is
  actually used on there is no way back to the menu except the browser's
  own chrome, which a home-screen PWA does not show.
- [ ] **RECORD-EDIT-PHOTOS Edit a record's photographs — delete, add,
  and split by selection** [blocked: whether a photo-reading route can
  exist without a sign-in] (2026-09-01) — Browse can already correct every
  field, but its photographs are listed by key and never shown, because
  serving one needs a Worker GET that a sign-in-free v1 deliberately does
  not have; so deleting a bad shot, adding a missing disc label, or
  splitting a record by picking which photos go where is desk work through
  split-item.mjs, blind, and only reachable by whoever has the
  credentials.
- [ ] **PHOTO-CULL Cull photographs that carry no text no other shot
  carries** [detail](records/PHOTO-CULL.md) (2026-09-01) — Crate 3 took 34
  photographs of 6 records and roughly a fifth were re-shoots of the same
  corner, which cost pack space and reading attention and bought nothing;
  a proposed rule set keeps one whole-sleeve view for identification plus
  every shot that is the sole source of some value, and proposes the rest
  for deletion rather than deleting them, because a cull driven by an
  extraction lets a bad reading destroy its own evidence.

### Icebox

<!-- Intent: M3–M5 — resolve works, cluster and decide — committed and sequenced, each triggered by the milestone before it going green; plus the open questions those milestones need answered, which unblock on their own evidence rather than on a milestone. The photo path left here on 2026-08-30. -->

- [ ] **OPEN-PASSAGE-SELECTION Should the app propose the comparison
  passage?** [sign-off] (2026-08-30) — Whether the app proposes the
  two-to-three-minute comparison passage from the track listing, or the
  listener always chooses it themselves.
- [ ] **M3-WORKS-PERFORMANCES MusicBrainz works, performances and
  per-track completeness** — Resolve work and recording identity from
  MusicBrainz, resolve composers for the 131 Various/Unknown rows, and
  attach real per-track completeness so clustering stops relying on the
  track-count heuristic.
- [ ] **NAMES-CANONICAL One canonical form per composer and performer,
  resolved after capture** (2026-08-31) — A label prints TSCHAIKOWSKY,
  Tchaikovsky, P.I. Tschaikowsky and Pyotr Ilyich Tchaikovsky for one man,
  and clustering cannot group performances of a work until those resolve
  to one composer — so the raw string stays untouched and a resolution
  layer sits between it and every decision view.
- [ ] **M4-CLUSTERS-CONTRAST Cluster building, contrast scoring and
  shortlisting** — Build clusters from complete performances, score how
  far apart two readings are before any listening happens, and shortlist
  large clusters to three with the remainder visibly set aside and
  recallable.
- [ ] **M4-COMPILATION-COVERAGE Compilation coverage check** — For each
  of the 132 compilations, answer per track whether that work is owned on
  a record being kept — disposing of 43% of the collection without a
  record going on the turntable.
- [ ] **M5-SHOOTOUT-SELL-LIST Blind shootout sessions, three outcomes,
  and the sell list** — Session cards sized to a sitting, blind scoring
  with performance and sound scored separately, keep-one / keep-several /
  defer, and the valuation pass feeding shortlists and the sell list.

<!-- generated:records:end -->

<!-- FILE: project/brief.md -->

# Project Brief — Vinyl Sorting

<!-- What, for whom, out of scope. Identity document: import into the rules position where supported. -->

**Product name:** Vinyl sorter. Full development brief (v1, classical,
28 August 2026): <https://claude.ai/code/artifact/f1939d24-b221-4ed9-8948-8b193bd64e35>
— that artifact is the spec; this file is the identity summary.

## What we are building

A web app for cataloguing a classical vinyl collection, verifying each
record against Discogs and MusicBrainz, and organising the overlapping
copies into a finite queue of listening decisions — keep, contrast, or
let go.

Three jobs, in order, each useless on its own: **catalogue** (every
record into one structured store, captured once, with a photo of the
label so no disc is handled twice for data reasons), **verify**
(resolve each record to a real Discogs release and MusicBrainz work,
under a corroboration rule that refuses to accept a catalogue number
on its own), **organise** (group overlapping copies by work, strip the
compilations, rank each cluster, hand back a queue sized to a sitting).

## Who it is for

A private household tool for a handful of trusted people. Joe
captures and decides; at least one other person may capture. Not
public, ever.

## Scale

~750 records in scope for v1: 446 already catalogued and needing
re-verification, ~300 new. Of 305 enriched records, 110 are the only
copy of their work, 132 are compilations resolved on data, and 63 fall
into 15 clusters that reach a listening decision. 2,000–6,000 more
varied records are deferred to a later phase, so the schema stays
genre-neutral throughout.

## Why it exists

Nine schema generations and five restarts. The existing spreadsheets
cannot answer "how many copies of this symphony do I own, and which is
best?" because a flat row conflates a physical disc, a pressing, a
piece of music and a performance. 9% of existing Discogs matches are
provably wrong — 26 of 277 point at a different record, 16 of them
labelled "Exact" — because a catalogue number was treated as a verdict
rather than a lead.

## Platform

Cloudflare Pages static SPA (Vite + TypeScript, PWA, IndexedDB offline
queue) building from this GitHub repo on push; a Cloudflare Worker
(Hono) holding the Discogs token, proxying and rate-limiting Discogs
and MusicBrainz, and running matching, clustering and coverage as
queued jobs; D1 for the schema, KV for the API cache, R2 for label
photos. No sign-in for v1 by maintainer decision (2026-08-30) — see
the decision log; the Worker exposes named operations rather than an
open proxy, and auth is revisited before M2 puts the Discogs token
behind a public endpoint.

A Worker is not optional: the Discogs API sends no CORS headers, and a
static site cannot hold a secret. Live at
`vinyl-sorter.joe-2d2.workers.dev` since 2026-08-31.

## Constraints

- Offline capture is a hard requirement — crates live in lofts and
  garages. Entries queue in IndexedDB and survive a hard refresh.
- The expensive resource is handling the record, not API calls.
  Design so each disc is picked up exactly once.
- Existing data dictates behaviour: text corruption is MacRoman
  mis-decoding (not cp1252); label is captured on 0% of the backlog
  and mashed into free text with the catalogue number; AI-invented
  ratings sit indistinguishably beside sourced data.
- Port the proven normalisation ladder, query permutations, rate
  limiting and resumable output from the existing Windsurf Python CLI
  rather than rewriting.

## Out of scope for v1

- Non-classical crates — the schema must permit them, the interface
  will not show them.
- Selling, listing or pricing workflow beyond a static sell list with
  values attached.
- Audio playback, ripping, or any handling of the music itself.
- Public sharing.

## The risk that actually matters

Building the app instead of cataloguing the records. M1 exists to make
capture possible before anything else is built, and a phone camera
plus a shared album is a legitimate fallback from day one. If in three
months there are 300 photographed labels and a half-finished app, that
is a win.

<!-- FILE: project/decision-log.md -->

# Decision log

<!-- Append-only, newest first. -->

## 2026-09-01 — MATCH-REVERIFY-SWEEP: order by the thing that moves

**Decision:** when nothing is waiting to be matched for the first time,
the tick tops its batch up with rows nothing has looked at for a while.
Off by default, settable in Settings, capped per day.

**IT IS ORDERED BY `match_run.ran_at`, NOT BY `last_verified_at`, and
that is the whole difference between a sweep and an infinite loop.**
The obvious column is the wrong one: `last_verified_at` is written only
by `resolveRun` — when a PERSON settles a row — so the matcher never
changes it. A sweep ordered by it would hand back the same oldest rows
every five minutes for ever, spending the shared Discogs budget and
reaching nothing new, while looking entirely correct. `ran_at` is
written on every pass, so re-running a row pushes it to the back of its
own queue. A test asserts the queue advances.

**Three more brakes, and each one is a different failure:**

- **Never-matched rows always come first.** The sweep tops the batch
  up rather than competing, so it can be left on without ever delaying
  a newly captured disc.
- **A confirmed row is never swept.** Re-running a release a person
  accepted can only produce a queue item contradicting a human
  decision, which is worse than not running.
- **A daily cap, and it is about the maintainer's time rather than
  money.** Every swept row that fails to auto-accept lands in the
  review queue — a person's evening. An uncapped sweep would refill a
  queue somebody is trying to empty, faster than they can clear it,
  while being individually right about every row. The count lives in
  KV against the date so it resets itself, is written BEFORE the work
  so a dying tick still spends its allowance, and a KV failure yields
  zero allowance rather than infinite.

A swept run records `swept: true` and the previous run's timestamp, so
a reviewer meeting a row again knows why it came back.

**Verify:** npm run gate; five new tests including the ordering one
that would have caught the `last_verified_at` loop.

## 2026-09-01 — APP-SETTINGS: settings and export, and a line under them

**Decision:** three tiers. **Device** — name, theme, density — open,
local, and a claim about a phone rather than about the collection.
**Collection** — the re-verification sweep and its two numbers — behind
the shared passphrase, in KV. **Export** — the whole database as JSON
or CSV — behind the passphrase, read-only.

**Three things asked for are deliberately absent, and none is a
refusal on the merits.** A Discogs token typed into a browser has to
live where the Worker can read it, which means KV — readable by
anything that gets one shared word, on a URL with no sign-in — when
`wrangler secret put` already works and is strictly better. Resetting
is a destructive data operation and a stop-and-ask boundary in the hard
rules; it will exist as a tool that snapshots first, not as a button
anyone reaches by mistyping a URL. The roster is shared by the client
and the Worker precisely so the gate and the sign-in cannot disagree.
All three want a sign-in first, which is OPEN-V1-AUTH, and the page
says so in plain words rather than leaving a gap.

**Two export formats, answering two questions.** JSON is the structured
dump that could be restored, and it carries `schema_migration` because
a dump that cannot say which schema it came from is one nobody can
safely load. CSV is one row per record, for a spreadsheet.

**The download is fetched as a blob, not linked.** The route is behind
`x-edit-token` and an `<a download>` sends no headers — the identical
shape of bug that made every label photograph 401 in the browser while
`curl -H` passed. Getting this wrong twice would have been the same
mistake, not a new one.

**Reading settings is open; writing is not.** What comes back is three
numbers about how the matcher paces itself — no record, no person, no
secret — and the screen has to render before it can ask for a
passphrase.

**Verify:** npm run gate; four new tests on the defaults, the clamping
and the gate. In the browser: the toggle round-tripped to the server,
the CSV came back with a header and a row per record, and the same
request without the passphrase was 401.

## 2026-09-01 — MATCH-OTHER-NUMBERS: try the rest of the label

**Decision:** `other_numbers` — extracted into
`data/photo-extract.json` since the spike and consumed by absolutely
nothing — is promoted into `raw_value`, read by `pendingRows`, and
builds a SECOND query ladder that is spent only when the first one
places nothing.

The maintainer's two worked examples: item **480** carries `SUA 10639
Mono` behind the stereo number the reading chose as primary; item
**469** carries `642 273 GL` behind `GL5840`. The right answer was
sitting in the same JSON as the wrong one.

**It is not in `PHOTO_FIELDS`, deliberately.** That list is the SCORED
set — what `photo-score.mjs` grades a reading against — and a reading
cannot be right or wrong about which numbers a label happens to print.
It is evidence, not an answer, so it is promoted alongside rather than
added to the graded set.

**The trigger counts FAMILIES, not points, and the first draft got this
wrong.** A candidate collects 5 points merely for being a vinyl LP, so
gating on `score > 0` let a field of a dozen unrelated records read as
"scored something" while having placed nothing at all — a test caught
it on exactly that row. Families are what the corroboration gate
spends; a field where not one candidate carries a single family is a
field the primary number failed to place, which is the population that
ends as "not found" today. That is what makes the extra rungs free:
they fall on rows already lost and on no others, and a test asserts a
row the primary number DID place never pays for them.

**One family, not two.** The alternatives join the scoring variants
unconditionally — a candidate the first ladder already found may match
on an alternative number, and refusing to notice would throw away a hit
already paid for. But they are VARIANTS rather than a new family: two
numbers printed on one label are one label, and counting them
separately would let a row satisfy the corroboration gate against
itself, which is the precise fault the gate exists to prevent.

**And it decides mop-up cases by itself.** For a sleeve-only row with
two candidate numbers: one matching and the other not is a finished
row, the tie broken by elimination; neither matching has earned its
place in the re-shoot crate. Those two outcomes are currently
indistinguishable — both are "needs review" — and telling them apart is
worth more than either.

A match found this way says so in its verdict, because it is a fact
about the READING as much as about the match: the reading picked the
wrong number as primary.

**Verify:** npm run gate 271+4 passing; four new tests covering the
held-back ladder, the split on newlines and pipes, the row that must
not pay, and the row that must.

## 2026-09-01 — CAPTURE-GUIDANCE: say what to shoot, and let the number survive

**Decision:** three things, and they are one failure seen from three
sides.

**A ranked sheet, once per device, recallable from the header.** Fill
the frame with the disc label; then the sleeve back for the tracklist;
then the runout angled to the light; then anything that disagrees.
Order is the whole message — a crate is walked at speed and nobody
reads four paragraphs in a loft. The seventeen sleeve-only rows of
items 467-483 are the argument, and the ruling that produced them was
written into the README, which is exactly where the person holding the
camera is not looking.

**The stored long edge goes 1568 → 2048.** Item 481's catalogue number
is printed on the Ace of Clubs badge, in the right place, and is not in
the file: the downscale took it. `PHOTO_LONG_EDGE`'s own comment
claimed "nothing downstream loses anything", and that is now known to
be false.

**Framing is the dominant fix, not pixels, and that is why the number
moved one step rather than four.** A whole 12″ disc at 1568 px puts the
4″ label across ~520 px — about sixteen pixels per character of a
catalogue number, which JPEG then finishes off. The same label filling
the frame gives ~fifty and is never in doubt. So the sheet buys more
than any resolution can, and costs nothing. 2048 px is ~1.3 MB against
800 KB, ~70% more in a queue that must survive a loft with no signal,
bought to restore the margin for a shot framed in a hurry. **Keeping a
full-resolution original was refused**: roughly five times the storage
to buy less than the guidance gives away free.

**The camera ask rose with it, 3840 → 4096.** A test asserts the ask is
at least twice what is stored, and at 2048 a 3840 ask stopped being
that. The invariant is the right one — "far more than is stored" is
what keeps small print legible — so the number that moved was the ask,
not the assertion. `ideal` costs nothing to raise: a phone whose best
mode is 3840 still hands back 3840. The test now also pins
`PHOTO_LONG_EDGE` itself, which it did not before, so this is a
strictly stronger suite rather than an adjusted one.

**And a tap opens any photograph full size.** Nobody could have caught
481 until the disc was back in the crate and the pack reached a desk. A
thumbnail 88 px wide cannot answer "is that number legible?"; the full
frame can, and now does, at the one moment when re-shooting is free.

None of this helps the 483 rows already photographed. Those are the
mop-up crate, and CATALOGUE-CONTROLS is where they get listed.

**Verify:** npm run gate 271 passing; the sheet rendered on first
launch, dismissed to `vs.guide=seen`, and reopened from the header;
capture stayed dark under a light system preference, so `data-force-dark`
holds.

## 2026-09-01 — REVIEW-CARD: the sleeve, and five states instead of two

**Decision:** `SearchResult` now declares `thumb` and `cover_image`,
which Discogs has been sending on every search all along and this
project parsed away. The small one is stored in the candidate's
`signals_json` and rendered beside the photographs of the actual disc.
**No new request buys it** — it is in the response the ladder already
pays for.

**Hotlinking was checked rather than assumed.** One search against the
live API returned `i.discogs.com` URLs; loaded in the browser with
`referrerpolicy="no-referrer"` the image decoded at its natural
150 px. The `onerror` fallback stays anyway, and so does the drawn
placeholder, because the 296 runs already in the queue were scored
before this existed and will carry no image until they are re-run.

**The second half is the comparison, and the state count is the whole
argument.** Every candidate showed its families as identical grey
chips, so `catno` and `year` read the same. It now says field by
field how the reading stands against the candidate, in FIVE states:

- `agrees`, `partly`, `differs` — the ordinary three;
- `unread` — never read off the disc. 267 queued rows have no label,
  and rendering that as a disagreement blames the candidate for the
  reading's silence;
- `unknown` — read, and Discogs returned nothing to compare it with. A
  gap on the other side is not a mismatch either.

A reviewer who cannot tell those two absences from a real conflict
learns to ignore the red mark entirely, which costs more than the
chips are worth.

**The verdict comes from the scorer's own `families`, never re-derived
here.** Re-deriving would let the screen and the gate disagree about
the same candidate. The candidate's value appears only in the tooltip,
which is what makes a disagreement arguable — a red `label` beside a
release plainly labelled the same thing is then visibly a scorer bug
rather than a mystery. The demo seed was made self-consistent for
exactly this reason, and says so.

**Verify:** npm run gate 271 passing; the queue rendered in both themes
at 1280 px; `naturalWidth: 150` on the hotlinked thumbnail and the
drawn placeholder on the candidate without one.

## 2026-09-01 — APP-KEYS: one scheme, and a card that cannot go stale

**Decision:** `g` then a letter goes — `h` home, `a` add, `r` resolve,
`c` collection, `s` settings. `/` focuses search, `?` opens the card,
`Escape` closes what is open or leaves the field. The review queue's
`1`–`5`, `N`, `S`, `B`, `M` are unchanged.

**`g` is a prefix rather than a modifier** because every single-letter
global steals that letter from a screen that might want it — and the
review queue, the screen with the most keys, wants nearly all of them.
It times out after 1.4 s so a stray `g` cannot silently swallow a
keystroke a minute later.

**The card is generated from the same table that binds the keys**, so a
shortcut cannot exist without being documented. That is not tidiness:
the review queue's five were real, good, and a secret for a month
because nothing on any screen said they existed.

**The typing guard is shared rather than remembered.** A key pressed
inside a text field is text — the review queue had to learn this when
typing a Discogs id fired four shortcuts, and it is exactly the kind of
rule each new screen would otherwise re-learn by breaking. It lives in
`chrome.ts` and every screen defers to it.

**Verify:** npm run gate 271 passing; `?` opened the card from a real
keydown; `g c` navigated from settings to the collection; capture takes
the go-keys and nothing else, because there is no keyboard in a loft.

## 2026-09-01 — APP-HOME-HUB: a front door, and capture keeps its own

**Decision:** `/` is a hub of four tiles — Add vinyl, Resolve entries,
The collection, Settings — each carrying the number of things waiting
behind it. Capture moved to `/capture.html`. Every screen wears the
same header with the same way home in the same place.

**The manifest's `start_url` moved to `/capture.html` with it, and that
is the load-bearing part.** The brief's stated risk is building the app
instead of cataloguing the records, and capture is tuned around it:
nothing between the shutter and Queue it. A menu in front of the camera
is exactly the tax that principle refuses. So the two audiences get
different front doors — a phone with the app installed still opens
straight into the camera, and the hub is for the desk and for anyone
arriving at the bare URL. Neither pays for the other.

**The service worker's offline fallback had to change or the move would
have broken the one promise that matters.** It answered every
uncached navigation with `/index.html`, which was correct while the
root WAS capture. Unchanged, it would have met "open the camera, I have
no signal" with a menu. It now falls back on the requested path, and
the shell caches all five pages.

**Verify:** npm run gate 271 passing; all five screens rendered at
1100 px and at 375 px in both themes; `g c` navigated from settings to
the collection; the shortcut card opens on `?`.

## 2026-09-01 — DESIGN-SYSTEM: one language, and dark is the base

**Decision:** `tokens.css` holds every colour, size and duration;
`app.css` holds every component more than one screen uses; `chrome.ts`
holds the header, the theme, the toast and the keyboard. The three
dialects in `style.css`, `browse.css` and `review.css` are gone, and
what is left in each is only what that screen alone has — the
viewfinder, the detail panel, the candidate row.

**Dark is the base and light is an override**, rather than the other
way round. If the theme script never runs — JavaScript blocked, an
error before paint — the app falls back to the palette the hardest
environment needs rather than to a white page held over a crate.
Capture opts out of light entirely with `data-force-dark`: dim light
and gloves are constraints it was measured against, not a preference.

**Light is a class on `<html>`, set by an inline script before paint.**
`light-dark()` would have been cleaner and needs Safari 17.5, which is
not a promise this app can make about whatever phone is to hand; a
duplicated `prefers-color-scheme` block would have meant writing the
palette twice and letting the copies drift. Three lines of duplicated
script is the smaller cost, and `tokens.css` says so where they live.

**The accent is brass, and it marks only what is interactive.** That
is why `needs-review` stopped being amber and became blue: 296 rows
sit in that state and every one of them is the app working correctly —
the corroboration gate refusing to guess. Colouring the most common
state in the database as a warning said something false about it. An
accent that also means "careful" stops meaning either.

**Verify:** npm run gate 271 passing; five screens at 1100 px and
375 px, both themes; the narrow-screen header drops the word "Home"
and keeps the mark, because at 375 px it was clipping the queue status
— the one thing on that bar that changes.

## 2026-08-31 — CAPTURE-BULK-REMNANT: they stay, and the file says so

**Decision:** `bulkFields` and `BULK_CARRIED` stay in
`src/queue-logic.ts` with their two tests. Both now carry a comment
saying, in the first line, that nothing calls them and why — so the next
reader does not spend five minutes working out whether something is
broken. Deleting them remains the maintainer's to take.

**Rationale:** The record offered two honest endings and one of them is
not this session's to choose. Deleting the exports deletes their
assertions in `queue-logic.test.mjs`, and "no weakening or deleting
tests" is a stop-and-ask boundary in AGENTS.md — which an autonomous
session may not cross on its own judgement, however safe the deletion
looks. Nothing is left untested by removing a test with the code it
covers, and that argument is exactly the kind a person should make
rather than an agent.

**So the other ending was taken, and it is a real one.** The cost of the
remnant was never the bytes; it was the next reader finding tested,
exported logic with no caller and having to reconstruct whether that was
a bug. A comment that opens "NOTHING CALLS THESE TWO. Read this before
you go looking." costs nothing and removes the whole cost.

**What the comment says, so the decision is not lost with it.** The mode
is retired on a reason that will not reverse — more than one photograph
of a disc is always wanted, so one row per photograph manufactured three
discs where one stood. The logic is not half-wired and not waiting on
anything. And the test comment says the two bulk tests go WITH the
exports and not before them, so a future tidy-up cannot delete the
coverage and leave the code.

Note for whoever takes it: `scaleTo`, in the same test section, is very
much live — the downscale runs on every photograph — so the section
header is misleading about its own contents. Only the two bulk tests
cover retired code.

**Verify:** npm run gate — comments only, 258 tests with the same 222
passing.

## 2026-08-31 — DATASET-EDIT: a person may correct their own reading

**Decision:** Built as signed off. Two routes, `POST
/api/items/:id/field` and `.../promote`, behind a shared `EDIT_TOKEN`
header; four operations on the browse detail — correct a capture field,
correct a physical item field, confirm a value unchanged, promote a
photo reading. AGENTS.md and `001-init.sql` are reworded in the same
commit: **machine writes over `capture` stay barred**, human correction
is permitted.

**The amendment is the load-bearing part, and it is narrow.** The bar
exists so duplicate detection runs on what a person read rather than on
what a bad match wrote — a bar on machine writes, which is what it
always meant. Nothing in `match/` or `review.ts` may reach `edit.ts`,
and `review.ts` still says `capture` is never touched. The accepted
cost, taken with the sign-off: the previous reading is gone, surviving
in `data/deep-groove-v1.csv` for the 446 imported rows and nowhere for
app captures.

**What a write actually lands.** The value, and a `field_source` row
with source `shelf`, `confirmed_by` and `confirmed_at` set — upserted
on `UNIQUE (entity, entity_id, field)`, in the shape `resolveRun`
already uses, so confirming twice re-stamps rather than duplicating.
`insertCapture` deliberately writes `shelf` UNCONFIRMED, because typing
at a crate is not verifying a pressing; saying at a screen that a value
is right is the different act `confirmed_by` was added for.

**It makes nothing decision-eligible**, and a test asserts it.
`v_decision_eligible_item` needs a confirmed `release_id` on the ITEM,
which only the review queue writes — so `release_id` is the one field
the panel shows and will not edit. Correcting capture text improves what
the matcher searches with; it is not a verdict about a pressing.

**Promotion writes a new row rather than laundering the old one.** The
`raw_value` row keeps its `vision` provenance untouched, so what the
model read stays on record and stays outside `v_confirmed_field`.
Re-labelling the reading as confirmed would erase the difference between
a machine's answer and a person's, which is the difference this project
exists to keep.

**Three things the build found.** An unset `EDIT_TOKEN` answers 503, not
200: an absent secret must never read as an unlocked door. The guard is
attached per route rather than as a mounted sub-app — a wildcard
middleware answered before the 404 fallthrough, so every unnamed path
started replying 401 and advertising that a passphrase exists. And a
401 clears the stored passphrase instead of retrying with it, or a
secret rotated on the Worker fails every edit for the rest of the
session in the same silent way.

**Field names come from allow-lists, never from the request** — they
reach a column position in the SQL, where values are bound. `release_id`
and `decision` are absent on purpose; a grade outside the Goldmine set
is refused before the CHECK constraint sees it.

**Verify:** typecheck clean; 258 tests, 222 pass, the same 10
pre-existing environmental failures as the parent. Eleven new Worker
tests, including the four the record named. Driven against the real
Worker over node:sqlite: a locked screen refuses, a wrong passphrase is
cleared with the reason, correcting a crate updates the row in the table
above it, Escape puts a value back untouched, an emptied field is
removed and provenance recorded, unchanged text is filed as a
confirmation rather than a correction, and promoting a `vision` reading
fills the label while leaving the reading unconfirmed.

## 2026-08-31 — DATASET-VIEWER: a third screen, minus the photographs

**Decision:** `/browse` ships — a filterable list of the whole
collection, an item detail, the match history behind every row, and a
provenance mark on every field. The photographs are LISTED, not shown.
The route that would render them is split out as BROWSE-PHOTOS, flagged
`sign-off`, because two live records disagree about whether it may
exist and that is not this session's call.

**Rationale:** 465 rows were in D1 and the only way to see one was
`GET /api/items` in a browser tab. The larger cost was that nothing
showed *why* a row looked the way it did — 287 sit in needs-review and
nobody could see whether the capture text behind one was a clean reading
or the label mashed into the catalogue number.

**Provenance is the screen, not a column on it.** Every field carries
its `field_source` in words — read at the shelf, from Discogs, read off
a photograph (`vision`), legacy import, guess — and separately whether a
person confirmed it. A field with NO provenance row says so out loud
rather than rendering blank: "nothing recorded" and "read at the shelf"
are exactly the two things a spreadsheet cannot tell apart. Unconfirmed
values are shown, which the rule permits, and shown as unconfirmed.

**The latent bug the record predicted was real.** `/api/items` LEFT
JOINed `capture` unaggregated, so an item with two capture rows returned
twice — a screen that miscounts its own collection. It now takes the
newest capture explicitly rather than relying on one-per-item holding,
with a test that inserts a second and asserts one row back.

**Why the photographs are only listed.** Rendering one needs
`GET /api/photos/:key`. `photos-pull.test.mjs` asserts no such route
exists, in those words: "with no sign-in that is the household's
photographs behind a URL". That test belongs to PHOTOS-TO-DESKTOP, and
the pull tool exists *because* the Worker has a PUT and no GET. The
route was built, tested and then withdrawn rather than shipped, because
shipping it meant editing another record's security test — a
stop-and-ask boundary twice over.

The detail that settles it, written down where the decision gets taken:
`/api/items/:id` is already open and already returns every `r2_key`, so
a photo GET is not one unguessable URL per photograph but an enumerable
archive. Any answer resting on key randomness has the surface wrong.

What ships instead is what can be said honestly — how many photographs
exist, when each was taken, and its key, which is what `photos-pull`
fetches by. That the screen is worth having without the images is itself
evidence for one of BROWSE-PHOTOS' options.

**The screens link to each other**, `.html` and all, because Vite's dev
server does not serve the extensionless path Pages also accepts. Capture
is left out of the nav on purpose: every element between the shutter and
Queue it is a reason to stop cataloguing.

**Verify:** typecheck clean; 247 tests, 211 pass, the same 10
pre-existing environmental failures as the parent commit. Four new
Worker tests: one item per row with two captures, the list columns the
filters need, the newest run winning the state column, and a detail
payload carrying candidates, a decision and a `vision` reading that is
still absent from `v_confirmed_field`. Driven at 1200x900 and 375x812
against the real Worker over node:sqlite: filters by state, by
photograph and by free text, the search box keeps focus while typing,
the detail opens with provenance on every field, and the page no longer
scrolls sideways on a phone — the table scrolls inside its own box.

## 2026-08-31 — CAPTURE-WHO: a name typed once, checked against a roster

**Decision:** A first-run screen asks for a first name and refuses one
that is not on a six-name roster — Joe, Jen, Ro, Ivy, Jojo, Sue. The
accepted name is stored canonically in `dg.who` and stamped on every
capture made on that phone. The review queue's own "who is reviewing"
screen now uses the same roster. `who.ts` holds all of it.

**Rationale:** `capturedBy` lost its box when CAPTURE-ONE-SCREEN parked
the More block, so a phone that had never had a name typed into it sent
nothing — absent rather than guessed, which is right, but it left a row
saying who read its label only by accident. The maintainer's design does
two jobs with one screen: a crude password, and the logger.

**Typed, not picked.** Six buttons print the six valid answers, so a
picker cannot gate anything, and it costs a tap on every device for
ever. Typing costs one screen, once, and asks you to know something not
on the page. The refusal does not list the roster.

**Spelling is the roster's problem, not the typist's.** `jojo`, `JOJO`,
`JoJo` and `  jOJo  ` all land as `Jojo`, so the free-text spelling
problem NAMES-CANONICAL exists to clean up on the composer side never
reaches `captured_by` at all. Near misses are refused rather than
guessed at: `Jon`, `Jenn` and `Joseph` are all no. A fuzzy match would
put one person's name on another person's row — the same class of fault
as an invented rating, and just as invisible a month later.

**The stored value is re-checked on every read.** The review queue used
to take whatever was typed, so `dg.who` may already hold free text on a
real device; a value that is not on the roster is treated as no value
and asked for once more. Verified: a stored `"jo "` puts the review
screen back on its gate rather than signing decisions with it.

**It does not gate the queue.** `startSync` runs whatever the screen
shows, so a phone back from a loft with twenty captures uploads them
while somebody works out how to spell Jojo — which is why the status
line is on the gate. The offline guarantee does not get a caveat.

**Say what it is not, again.** Six household first names are guessable
and the roster ships in the bundle. This says who is holding the phone;
it does not say who may write at all. OPEN-V1-AUTH answered that second
question "no sign-in for v1" the same day, and shipping this neither
re-opens nor answers it.

**Hand-over is explicit and lossless where it matters.** The name shows
in the header and tapping it confirms before clearing. Captures already
queued keep the name they were made under — that is the point of writing
it down — and the photographs in hand survive the switch; only typing in
the boxes is cleared, which the confirmation says.

**Verify:** typecheck clean; 243 tests, 207 pass, the same 10
pre-existing environmental failures as the parent commit. Four new tests
cover the resolver. Driven at 375x812: `Joseph` refused with nothing
stored and no roster on screen, `  jOJo  ` accepted and stored as
`Jojo`, the capture screen fits without scrolling, a queued row carries
`capturedBy: "Jojo"` with no box on the page, a cancelled hand-over
changes nothing, a confirmed one returns to the gate with the queue
still draining behind it, and `sue` then arrives at a capture screen
still holding the two photographs and showing "Queue it · 2 photos".

## 2026-08-31 — CAPTURE-NEXT-DISC: the crate never leaves the camera

**Decision:** A third control, **Next disc · N**, goes in the camera
bar. One tap files the disc in hand, zeroes the count and leaves the
viewfinder open. Done keeps its meaning exactly — leave the camera for
the form, photographs intact. The torch moves out of the bar to the
top-left corner of the viewfinder to make room.

**Rationale:** Photographing one disc cost N shutter taps plus three
that were not — Photograph, Done, Queue it — and restarted the camera,
black frame and fresh `getUserMedia`, every disc. It is now N + 1, and
after the first the camera never closes. Typing moved behind Done, which
makes typing the exception rather than the default: what photo-first has
meant all along.

**Done still does not queue.** Done is what you press to check a frame,
to type a catalogue number, because somebody spoke to you. A premature
one would file a disc with two of its four photographs and turn the
other two into a SECOND disc — the fault CAPTURE-ONE-SCREEN deleted the
crate mode for, arriving one tap at a time.

**The undo is the drain's own backoff field, not new machinery.** A
filed entry is written to IndexedDB immediately, as always, but with
`nextAttemptAt` five seconds out. `selectDrainable` already refuses an
entry whose attempt time has not arrived, so the hold cannot leak and
nothing new had to learn about undo. The offline guarantee is untouched:
the WRITE never waits, only the send. A tab closed inside the window
leaves an ordinary pending entry that goes out on the next tick.

Undo puts the disc's photographs back in FRONT of anything shot since,
so a tap between two frames of one disc loses neither, and it restores
typed values only into boxes still empty — it must never delete
something typed in the seconds after the mis-tap. It covers Queue it
too: one code path rather than two, and the double-tap fault the last
pass found lives on both.

**Geometry, measured rather than asserted.** Next disc sits bottom-LEFT,
Done bottom-right. A phone is held in one hand and shot with that thumb,
so the near corner is reached without thinking and the far one needs a
stretch: Done costs a tap when mis-hit, Next disc files a disc, so Next
disc is the one put out of reach — 44 px clear of the shutter at 375 px
wide. In landscape the bar runs down the right edge, where end-aligning
put Next disc 8 px from the shutter; centred in its row it is 49 px away
and Done is left where it was.

**Costs, stated.** A viewfinder open across a crate costs battery and
keeps the camera indicator lit; Done is still there for a pause. Every
capture's first send is five seconds later than it was.

**Verify:** typecheck clean; 239 tests, 203 pass. The 10 failures are
pre-existing and environmental — `matcher.test.mjs` and
`photo-extract.test.mjs` read `Pre August 2026/`, gitignored and so
absent from any worktree; the identical 10 fail on this commit's parent.
Driven at 375x812, 667x375 and 375x667 against a canvas-backed fake
camera with `/api` failing the way a loft fails: one tap files the disc
and the viewfinder stays open, the count zeroes, the entry lands with a
5,003 ms hold, Undo deletes it and returns three photographs and the
typed label, the toast passes taps to the shutter while its own button
takes them, the offer goes when the window closes, and Done still
reaches the form with the photographs intact.

## 2026-08-31 — CAPTURE-ONE-SCREEN: one disc, one screen

**Decision:** "Photograph a whole crate" is removed. Condition grading
and the "More" block are commented out of the page rather than deleted.
What is left is the shutter, three boxes and Queue it, which fits an
iPhone SE in portrait with nothing below the fold.

**Rationale:** One sentence from the maintainer retires the bulk mode
outright — more than one photograph is always needed. CAPTURE-BULK-PHOTOS
wrote one row per photograph, so a crate walked that way manufactured
three discs where one stood: the same fault as a required field answered
with filler, arriving faster and indistinguishable afterwards. The speed
it bought is bought instead by there being almost nothing on the page.

**Parked, not deleted.** The condition and More markup stays in `main.ts`
inside HTML comments. The Worker still accepts every one of those fields,
`readFields` still looks for every id, and removing two comment markers
restores the page exactly. Nothing is lost by leaving them off: condition
and matrix/runout are legible on the photograph afterwards, which is a
better reading than one typed one-handed in a loft.

**What it costs, stated rather than solved.** `capturedBy` has no box now,
so a second capturer cannot name themselves. The value is read from
storage alone and a device that never had one sends nothing — absent
rather than guessed, per the rule everywhere else here. On the wish-list.

**`bulkFields` and `BULK_CARRIED` stay in `queue-logic.ts`** with their
tests. The UI path is gone; deleting tested logic to tidy up after it is
not the same decision and was not asked for.

**Five faults the pass found, all of them mobile-only.** A flash message
was written into the page flow, so every camera error — including the
torch refusal iOS always gives — was painted behind the fullscreen
viewfinder where nobody could read it; it is now a fixed toast above both
the bar and the camera. A double tap on Queue it wrote two discs, because
each pass mints its own clientId and the Worker's idempotency cannot see
past that. Autofocus after a save threw the keyboard over the shutter,
which is the next thing anyone touches. The photo-delete target was 24 px
next to another 24 px target, and losing that coin toss deletes a
photograph of a disc already back in the crate — 34 px now, and inside
the frame rather than overhanging the next photograph. Landscape put the
three boxes below the fold; they now run across, where the width is.

**Verify:** npm run gate green (238 tests), and the page driven in a
375x812, a 375x667 and a 667x375 viewport: fits without scrolling in all
three, Enter walks the three boxes and releases the keyboard, the queue
button counts the photographs it is about to send, a queued capture
resets the form, and the parked ids resolve to null without throwing.

## 2026-08-31 — OPEN-V1-AUTH, DATASET-EDIT: no sign-in, one bolted drawer

**Decision:** Maintainer signed off both on 2026-08-31.

- **v1 gets no sign-in.** Capture and photo upload stay anonymous.
- **DATASET-EDIT proceeds as written**: a shared `EDIT_TOKEN` on the
  edit endpoints only, and — in the same commit — the AGENTS.md hard
  rule reworded from "never write back over `capture`" to bar *machine*
  writes while permitting human correction.
- **CAPTURE-WHO is promoted to the current milestone**, on the
  maintainer's instruction not to lose it. A typed name is the third
  piece: it gates the app crudely and stamps who captured each row.

Both were signed off with an explicit instruction to leave notes for
rethinking later, so the revisit triggers below are part of the
decision rather than a hedge against it.

**Rationale:** The brief defers auth but conditions it — revisit
"before M2 puts the Discogs token behind a public endpoint". That
happened, so the revisit was owed and has now been taken rather than
allowed to lapse quietly, which is the whole value of having written
the condition down.

What is actually exposed is junk rows and R2 objects, not a credential:
the Worker exposes named operations, nothing returns the token, and the
matcher runs from cron with no HTTP entry point. Against that, sign-in
on capture would put a way to fail into an offline queue on a phone in
a loft — which is the one place this app must not acquire one.

The asymmetry is the reasoning: **adding a row is not the risk that
rewriting 465 is.** So the bolt goes on the drawer worth bolting and
nowhere else. It is not sign-in and the record is explicit that it does
not pretend to be.

**The hard-rule amendment is the load-bearing part**, and it is narrow.
The bar exists so duplicate detection runs on what a person read rather
than on what a bad match wrote — a bar on machine writes. A person
fixing their own typo is the opposite case, and the sentence as written
forbade it, so an autonomous session would correctly have stopped.
Machine writes stay barred. The accepted cost: the previous reading is
gone, surviving in `data/deep-groove-v1.csv` for the 446 imported rows
and nowhere for app captures.

**Rethink when any of these:** the passphrase starts feeling like the
wrong shape; anyone outside the household needs to capture; a junk-row
flood arrives through the open capture endpoint; or the collection
becomes worth more than the inconvenience of signing in. Cloudflare
Access in front of everything is the known next step and was not chosen
now, not ruled out.

## 2026-08-31 — CAPTURE-MERGED-ROWS: one merge, and one false positive

**Decision:** Item 453 was two discs and is split at photograph 7,
giving item 466. Items 455, 453 and 466 are each **one disc**, on the
maintainer's inspection. `tools/split-item.mjs` exists for the next
one.

**Rationale:** The first full reading of the photographed set found two
rows carrying more than one catalogue number, and both were the rows
with the most photographs — twelve and eight against a median of five.
That looked like a clean signature and it was half right.

**453 really was two records.** `453-6` is Ace of Clubs ballet notes
under Fistoulari; `453-7` is the Music for Pleasure sleeve front for
Tchaikovsky's *Romeo & Juliet* and *Francesca da Rimini*. The
maintainer put the boundary at 7 and the photographs agree.

**455 was not.** `M-2314; AM 2314` is one disc printing two numbers — a
double header. So **two catalogue numbers is not evidence of a merged
row**, and the count of photographs is not either: a record with
several pieces earns several photographs honestly. The heuristic that
found 453 would have destroyed 455, and only a person looking at the
discs could tell them apart. That is worth remembering the next time a
tidy signal appears in this data.

**The reader was right both times.** Given twelve photographs of two
records it reported two catalogue numbers rather than choosing one, and
given a double header it did the same. Refusing to choose is correct in
both cases; what the answer means is a fact about the disc, not about
the reading.

**And the ladder already handles a double header.**
`normaliseCatno('M-2314; AM 2314')` yields both `M-2314` and `AM 2314`
as separate search variants, so the matcher tries each. Nothing needed
building — it was worth checking before promoting rather than
discovering through a row that matched nothing.

**The prevention shipped separately.** Filing a disc used to mean
leaving the viewfinder, so a second disc joined the first;
CAPTURE-NEXT-DISC put that control in the camera bar. This record was
the repair.

## 2026-08-31 — BROWSE-PHOTOS: serve the photographs, behind the typed name

**Decision:** `GET /api/photos/:key` exists and requires an
`x-capturer` header naming someone on the roster. The `r2_key` fields
in `/api/items/:id` and the review queue move behind the same header.
Browse and the review queue both show the photographs.

**Rationale:** Maintainer, 2026-08-31: "yes, show. use the name sign
in." The prompting failure was concrete — two items were confirmed in
the review queue against an empty panel, and the maintainer reported
having "no idea how I was supposed to cross check". A match cannot be
judged against a disc nobody can see.

**Say what this gate is, because the code does.** The roster is six
household first names and it SHIPS IN THE CLIENT BUNDLE; `src/who.ts`
calls the name "a speed bump and an honest label on a row, not access
control". Anyone who opens the JavaScript can read the six valid
answers. So this stops a crawler and a stranger guessing a URL, and
stops nobody who looks. That trade was taken knowingly, by the same
person who had already settled OPEN-V1-AUTH as no sign-in for v1.

**What stopped it being theatre.** `/api/items/:id` returns every
`r2_key`, and the key IS the photograph's address — gating the route
while handing keys out anonymously would have protected nothing at all.
Both moved together. That an item HAS photographs, and when, stays
public: it is the count the browse filter reads and it says nothing
about a record.

**A path the caller controls, closed on the way.** `parseCapture` only
trims `r2Key`, so a stored key can be any string a capture chose. The
route matches the key against `item_photo` before R2 sees it, so an
invented key is a 404 rather than a lookup.

**The test that said no such route may exist was updated, not
deleted.** It was right when written, while the question was open. The
property it protects — photographs are not anonymously enumerable — is
unchanged, so the assertion moved to the form that still protects it,
now covering the key as well as the route.

**And a lie in the test double was found by this.** `makeR2` recorded a
byte COUNT and returned it, so `get(...).body` was undefined: a photo
route could serve nothing and every local check would still pass. Found
by fetching a real photograph through the real Worker and getting 200
with zero bytes. The double now keeps the bytes and returns a stream,
and the test asserts the image itself comes back — 21,848 bytes in,
21,848 out.

## 2026-08-31 — PHOTO-PROMOTE: a reading becomes a lead, never a fact

**Decision:** A photo reading is written into `raw_value` with a new
provenance source, `vision` (migration 004), and the matcher may read
it where `capture` is empty. `capture` is never written. The matcher's
output goes to the review queue, where a person accepts or rejects it.

**Rationale:** The maintainer asked for every photographed record to be
attempted, matched against Discogs, and then confirmed by hand. That is
the decision SPIKE-PHOTO-TO-FIELDS was built to inform, and it was
taken deliberately rather than drifted into: everything before this
measured, and this one writes.

**`vision` rather than `guess`.** The legacy AI values M0 imported were
fabricated outright — invented ratings sitting indistinguishably beside
sourced data, which is most of why this project exists. A reading taken
off a photograph of the actual disc is evidence of a different kind.
Filing both as `guess` would hide that difference exactly where it
matters: deciding whether a value is worth showing someone to confirm.

**The provenance rule holds by construction, not by care.**
`v_confirmed_field` allow-lists `('shelf','discogs','musicbrainz')`, so
a new source is unreachable through every decision view the moment it
exists. Adding a value cannot open a hole; only editing that view
could, and 004 recreates it verbatim. A test asserts a `vision` row
stays out of the view even when confirmed.

**Why the matcher may use it.** The provenance rule governs clusters,
coverage checks, sell lists and shortlists — none of which this feeds.
Matching produces candidates for a human to rule on, and the
corroboration gate still refuses a verdict on one signal family, so a
reading cannot verify a release by itself. It has exactly the standing
a catalogue number has always had here: a lead. `capture` wins wherever
it holds a value, and a test asserts the COALESCE cannot be inverted.

**It re-queues, carefully.** The cron matcher already swept all 18 rows
and rejected them, having had nothing to search — 17 rejected, 1 error,
zero candidates, zero human decisions. Those verdicts are removed so
the rows are matched again. A run carrying a candidate or a decision is
never touched, because that is somebody's work rather than a machine's
answer to an empty question.

<!-- FILE: project/records/AI-ROUND-TRIP.md -->

---
id: AI-ROUND-TRIP
name: Make the hand-carried reading loop fast, and make it say which photograph it read
summary: The maintainer kept the no-metered-services rule, so the answer is a better round trip rather than an API — and its biggest missing field is provenance, because a number off a disc label and one in sleeve small print arrive with identical standing.
status: open
date: 2026-08-31
milestone: next
order: 3
---
# The hand-carried loop

Maintainer ruling, 2026-08-31: **keep it manual, make it smooth.**

Worth writing down why, because it will be asked again. There is no
supported API behind a Claude or ChatGPT subscription — "use the
subscription I already pay for" is not available at any price. The real
options were a metered key (refused since 2026-08-30, and the premise
of OPS-SPEND-GUARD), Cloudflare's free Workers AI allocation, or a
local model. The maintainer took none of them: the loop stays a person
moving a pack into a chat they already have, and the investment goes
into the loop instead.

## 1. Which photograph each value came from — the strongest one

Today every field in a reply arrives with the same standing. But a
catalogue number read off a **disc label** is strong evidence, and the
same number read out of **sleeve small print** is weak — that is the
entire lesson of the 467-483 crate, and the model's answer format
cannot express it.

The evidence for how badly it is needed: **seventeen confident readings
with zero fields marked unreadable.** The refusal-versus-wrong
distinction `photo-score.mjs` was built around went completely unused,
which means the reply format is not asking a question the model can
answer honestly.

**The plumbing already exists.** Packs send per-record filenames, so a
reply can carry `source` per field with nothing new to build. Then
`raw_value` records it, the browse screen shows it, and 480, 481 and
473 would have sorted themselves out.

Cheapest first, and it is also the one that makes everything else
worth more.

## 2. `other_numbers`, into the matcher

Split into [[MATCH-OTHER-NUMBERS]] — it is a matcher change, not a
pack change, and it is ready to do now.

## 3. The loop itself

Bigger packs, so a sitting reads a crate rather than a handful. A
prompt that asks for the source photograph and for an explicit
"unreadable" rather than accepting a guess. Import that reports what
changed rather than only that it worked. And a screen that says which
photographs are still unread, so the next pack builds itself.

**Done when** a reading carries a source photograph per field, the
score separates refusals from errors on real data, and building the
next pack is one command with no arguments to remember.

<!-- FILE: project/records/APP-RENAME.md -->

---
id: APP-RENAME
name: Set EDIT_TOKEN on the renamed Worker
summary: The move to vinyl-sorter is done and the old script is deleted, but Worker secrets are per-script and EDIT_TOKEN did not come across — so correcting a reading and downloading an export both answer 503 until one command is run.
status: open
date: 2026-09-01
milestone: current
order: 1
---
# Set EDIT_TOKEN on the renamed Worker

The rename itself closed on 2026-09-01. `vinyl-sorter.joe-2d2.workers.dev`
serves all five screens against the same D1, the same R2 and the same
KV — the bindings reference a UUID and a bucket, so nothing moved —
`deep-groove` answers 404, and exactly one cron trigger exists.

`DISCOGS_TOKEN` was set again from the archived token file. **The other
secret cannot be moved by anyone but the maintainer**: its value exists
nowhere but in a person's head and the deleted script, and AGENTS.md
bars a passphrase from being pasted into a session transcript.

Until it is set, `POST /api/items/:id/field`, `POST /api/settings` and
`GET /api/export` all answer 503 — "editing is not configured on this
deployment", which is the honest message rather than a broken one.

    npx wrangler secret put EDIT_TOKEN

## The thing to check afterwards

Every phone re-adds the app from the new URL, and re-types its name:
`localStorage`, the `dg_who` cookie and the IndexedDB capture queue are
all scoped to the hostname. **Anything a phone had queued and unsent at
the moment of the cut was at the old origin and is unreachable.** The
last capture reached D1 at 20:44 on 2026-08-31, so the phone that was
working had signal — that is evidence rather than proof, and it is the
cost the maintainer accepted when choosing a clean cut over a redirect.

**Done when** the secret is set and one edit has been made through the
browse screen.

<!-- FILE: project/records/CATALOGUE-CONTROLS.md -->

---
id: CATALOGUE-CONTROLS
name: Sort, filter and choose columns on the collection screen
summary: The interface half is done — every column sortable and choosable, five named views including the mop-up crate, and the whole view in the URL — so what remains is the two sorts that need data the database does not hold: value, which needs a price backfill, and genre, which needs a migration.
status: in-progress
date: 2026-08-31
milestone: next
order: 1
---
# Sort, filter and choose columns

Asked for: sort by value, sort by release date, choosable columns, a
genre toggle. Three of the four need data the database does not hold.

## Where it stands, 2026-09-01

**The interface half is done and deployed.** Twenty-two columns, each
declaring how to read and sort itself in one place; any of them
choosable and sortable; five named views; and the whole view — filters,
sort, direction, columns — encoded in the URL, so it can be bookmarked
and sent. Absent values sort LAST in both directions, which is the same
rule the old `verified` sort had to learn: a null is not a small number
and not an early date.

**The mop-up filter exists and is one click.** `/api/items` gained a
`reading_count`, so "photographed, read, still unresolved" is a
composition of state the row already carries, and the crate no longer
has to be assembled from memory.

## What is left, and what each one is blocked on

**Value** needs `release.lowest_price` to be populated. The column has
existed since M1 and has never been written. TRACKLIST-CAPTURE now
calls the release endpoint once per accepted match, so new matches can
carry it for free — the ~300 already matched need a backfill pass at
the pacing M2-DISCOGS-PACING settled, and prices go stale, so
`price_checked_at` has to be shown rather than hidden.

**Genre** needs migration 005 and a Discogs field. Worth saying again
that the honest use of it is not a genre column: classical is nearly
the whole collection, so what earns its place is a **not-classical
toggle**, which is what the brief means when it says the schema stays
genre-neutral while the v1 interface does not show it.

**Done when** value sorts with unpriced last, and the interface can
hide what is not classical.

<!-- FILE: project/records/M2-DISCOGS-PACING.md -->

---
id: M2-DISCOGS-PACING
name: Tune Discogs pacing — 7 of 12 queries still fail in the Worker
summary: A richer reading costs 9.4-12 queries against capture-only's 4.7, which broke the matcher three ways — Discogs throttling, Cloudflare's per-invocation subrequest cap and a row selected twice; all three are fixed and the interval now learns its own level from the refusal rate rather than being tuned by hand, backing off entirely when a tick reaches nothing.
status: in-progress
milestone: current
order: 6
date: 2026-08-30
blocked-on: nothing — measured 2026-08-31, three faults identified and none yet fixed
---
# Tune the Discogs pacing

Fixed: the deployed matcher reaches Discogs and returns candidates.
Not finished: on its first real row, **7 of 12 queries still failed**
while 5 succeeded. The row reached a correct verdict anyway, but every
failed rung is lost recall — the best match may have been in one.

**What was wrong**: the limiter had no minimum spacing, so a Worker
spent its per-minute allowance as an instant burst. Discogs cares about
burstiness; a laptop hides it because the round-trip paces the calls.
Now 30/min AND at least the learned gap apart. The local runner managed
446 rows with zero failures at ~1.25s while the Worker still fails at
2s — the shared egress IP does make Discogs stricter.

## Measured — 2026-08-31, on 16 promoted photo readings

**A richer reading makes the pacing worse, and that was the finding.**
M2-FIRST-RUN measured 4.7 queries per row on capture-only data; a
promoted vision reading supplies label, title and name as well, so the
ladder walks **9.4 to 12**. Every extra signal that makes a match more
likely also makes the row cost more to try. Of 11 rows attempted, 5
errored.

Three faults, only one of them Discogs:

- **Throttling**, arriving sooner because each row spends twice the
  requests.
- **Cloudflare's per-invocation subrequest cap** — not a Discogs limit
  at all, and one that widening the interval cannot relieve. Twelve
  queries at up to four attempts each reach it before Discogs refuses.
- **A row selected twice.** Item 451 collected two runs minutes apart:
  `pendingRows` excluded rows that already had one, but the run was
  written after the search, so a row outlasting the cron period was
  still in flight when the next tick chose it.

## It paces itself now — 2026-08-31

The three fixes above landed and the interval was tuned by hand three
times in one day, which is the tell: the tick already knows how many of
its queries were refused, and that was the only input the tuning ever
used.

- **The interval is learned, not set.** Widens 1.5x past a 5% refusal
  rate, narrows 0.9x on a clean tick, never below the shipped floor.
  Simulated against an upstream refusing under 5s it reaches 4.9s in
  seven ticks and holds at a 2% refusal rate.
- **The threshold is 5%, not 30%.** The first version tolerated 30% and
  converged — to 4.5s and a permanent 10% refusal rate. Converged and
  wasteful. A tolerance for refusals is a standing order for traffic
  that returns nothing.
- **A tick that got nothing stops asking** for two cron periods. When
  Discogs is refusing, a further request is one that will also be
  refused: it spends the subrequest budget, spends the shared window,
  and returns nothing.
- **The manual key stays widen-only** and the learned one may move both
  ways; the wider of the two is enforced. So a person can always slow
  the matcher and never speed it past the floor.

**Done when** a freshly captured record matches with no failed queries,
and no item carries two runs from one pass. The pacing no longer needs
a person, so what remains is watching whether it holds.

<!-- FILE: project/records/M2-FIRST-RUN.md -->

---
id: M2-FIRST-RUN
name: Run the matcher over all 446 and clear the queue once
summary: The operation, not the code — deployed and run as of 2026-08-31, every row carrying a match_run and 287 sitting in needs-review, so all that remains is a person clearing the queue by keyboard.
status: in-progress
milestone: current
order: 5
---
# Run the matcher over all 446, and clear the queue once

The matcher and the queue are built, gated and verified against live
Discogs. The deployment and the run are done; what remains is a person
clearing the queue.

## Where it stands, measured 2026-08-31

`/api/match-stats` on the deployed Worker: 465 items and **none
unmatched** — every row has a `match_run`. 135 auto-accepted, 287
needs-review, 42 rejected, 1 error. And `reviewed: 0` — nobody has
resolved a single item, so the second half of Done when is the whole
remaining job.

The one error row was never successfully searched, and wants
re-queueing rather than reading as a negative.

Migration 004 was applied to production on 2026-08-31, so the `vision`
source PHOTO-PROMOTE writes now exists there: schema 4, with all 4,734
provenance rows, 465 items and 98 photographs intact across the
`field_source` rebuild and every decision view recreated. The gap this
record noted is closed; what is left here is only the keyboard.

Re-running is resumable by construction — `pendingRows` selects only
items with no `match_run`, so a batch that dies costs one batch.

Expect most of the 141 backlog rows NOT to auto-verify: label is
captured on 0% of them, so a catalogue number is usually the only
signal and the gate correctly refuses a single family. Those rows want
capture, not matching. That is what M1's capture screen is for, and it
is the honest reading of the 9% error rate.

**Measured on a 60-row live sample (2026-08-30), after the throttling
fix:** 4 auto-verified, 36 needing review, 20 nothing found, 0 errors,
284 queries — 4.7 per row. The same sample before the fix reported 53
"nothing found", every one of them a swallowed rate-limit error, so
treat any large no-match count as a bug until proven otherwise.

**Done when** every one of the 446 has a `match_run` — met — and the
review queue has been cleared once by a person.

<!-- FILE: project/records/M3-WORKS-PERFORMANCES.md -->

---
id: M3-WORKS-PERFORMANCES
name: MusicBrainz works, performances and per-track completeness
summary: Resolve work and recording identity from MusicBrainz, resolve composers for the 131 Various/Unknown rows, and attach real per-track completeness so clustering stops relying on the track-count heuristic.
status: todo
milestone: icebox
order: 6
---
# Works, performances, completeness

Discogs identifies the object; MusicBrainz identifies the music.
Trying to make Discogs do both is why the classical side stalled
before. Separate bucket, 1/sec, proper user-agent.

Completeness is the load-bearing output: a `release_track` joins a
work's cluster only if `completeness = 'complete'`. Until this
milestone lands, that comes from the track-count heuristic (<= 8 →
headline record, > 8 → compilation), which will misfile a two-LP opera
and a single-movement filler — see R3. The clusters screen must show
which classification came from the heuristic so a wrong cluster is
explicable rather than mysterious.

**Done when** a compilation's tracks resolve to individual works and a
headline LP resolves to a complete performance. ~3 days.

<!-- FILE: project/records/M4-CLUSTERS-CONTRAST.md -->

---
id: M4-CLUSTERS-CONTRAST
name: Cluster building, contrast scoring and shortlisting
summary: Build clusters from complete performances, score how far apart two readings are before any listening happens, and shortlist large clusters to three with the remainder visibly set aside and recallable.
status: todo
milestone: icebox
order: 7
---
# Clusters, contrast and shortlists

Contrast scoring is the feature that serves "I like contrasting
versions": >= 4 → likely keep both, presented as "worth having both?";
2–3 → normal shootout; <= 1 → cull candidate, decided on condition
alone with no listening at all. The near-identical branch removes work
from the queue, which matters as much as the contrasting branch.

R4 is the trap here: recording year and duration are the two strongest
signals and both are frequently absent on budget pressings. The score
must degrade **honestly** — report "insufficient data" rather than a
low contrast score, because low contrast triggers a cull and a false
negative there is expensive.

Set-aside copies stay one click away with a "queue for a listen"
action, shown as a count on screen. Nothing is discarded unheard
without it being visible.

**Done when** the queue shows ~15 clusters with contrast bands.

<!-- FILE: project/records/M4-COMPILATION-COVERAGE.md -->

---
id: M4-COMPILATION-COVERAGE
name: Compilation coverage check
summary: For each of the 132 compilations, answer per track whether that work is owned on a record being kept — disposing of 43% of the collection without a record going on the turntable.
status: todo
milestone: icebox
order: 8
---
# Compilation coverage check

Pure data once works are attached. Three outcomes: fully covered →
sell, no listening; partially covered → list precisely which pieces
would be lost, usually one or two obscure tracks judged on their own;
sole source for anything → keep, and flag those works as gaps worth
filling properly.

Unmatched tracks are shown as **unknown** rather than assumed covered.
Assuming coverage is how a record gets sold and the music quietly
lost.

Compilations never appear on the clusters screen — they get a coverage
check, not a shootout.

**Done when** the 132 compilations have coverage verdicts. ~3 days.

<!-- FILE: project/records/M5-SHOOTOUT-SELL-LIST.md -->

---
id: M5-SHOOTOUT-SELL-LIST
name: Blind shootout sessions, three outcomes, and the sell list
summary: Session cards sized to a sitting, blind scoring with performance and sound scored separately, keep-one / keep-several / defer, and the valuation pass feeding shortlists and the sell list.
status: todo
milestone: icebox
order: 9
---
# The comparison session and the sell list

Designed around physical reality: vinyl cannot be A/B'd instantly and
memory for sound decays within minutes. Pull and clean all copies at
once, same passage for every copy, score immediately after each copy
before the next goes on.

**Blind until scored.** Label, catalogue number, year and value are
genuinely hidden until the last score is submitted — not merely
collapsed in the DOM. Knowing one is an original Decca SXL is exactly
the bias being suppressed.

Two scores, never one: `perf_score` attaches to the performance and
outlives the disc; `sound_score` attaches to the item. Separating them
lets the app say what a single score never can — you preferred this
performance but the copy is worn, so replace it rather than discard
the interpretation. In a collection built from budget reissues that is
a common outcome.

Three outcomes: keep one; keep several (first-class, reason pre-filled
from the contrast score); defer (counts as progress, returns at low
priority). R5 mitigations are design features, not nice-to-haves —
visible burn-down, sessions sized to a sitting, and don't save the
dull clusters for the end.

**Done when** a cluster can be resolved end to end from a tablet next
to the turntable. ~3 days.

<!-- FILE: project/records/NAMES-CANONICAL.md -->

---
id: NAMES-CANONICAL
name: One canonical form per composer and performer, resolved after capture
summary: A label prints TSCHAIKOWSKY, Tchaikovsky, P.I. Tschaikowsky and Pyotr Ilyich Tchaikovsky for one man, and clustering cannot group performances of a work until those resolve to one composer — so the raw string stays untouched and a resolution layer sits between it and every decision view.
status: open
date: 2026-08-31
milestone: icebox
order: 6
---
# One canonical form per composer and performer

A classical label is not consistent about names, and neither are two
labels about the same man. `TSCHAIKOWSKY`, `Tchaikowsky`,
`P. I. Tchaikovsky` and `Pyotr Ilyich Tchaikovsky` are one composer;
`Beethoven, Ludwig van` and `Ludwig van Beethoven` differ only in sort
order; `The Philharmonia` and `Philharmonia Orchestra` are one
ensemble. Clustering groups performances **by work**, and a work is
identified partly by its composer, so unresolved names split a cluster
that should have been one and hide exactly the overlap this project
exists to find.

## Why this is NOT prompt guidance

The obvious place to fix it is the extraction prompt — tell the reader
how to format a composer. That would be wrong, and it is worth writing
down why, because the suggestion will recur.

The contract's governing rule is **report only what is printed**. A
reader that turns `TSCHAIKOWSKY` into `Tchaikovsky` has stopped
reading and started inferring, which is the one thing the prompt exists
to prevent — and the same clause is what stops it supplying a
catalogue number from memory. Weakening it for names weakens it for
everything.

It also destroys evidence. `capture` holds what a human read and
`name_raw` is raw on purpose; `Tchaikovsky` cannot be turned back into
`TSCHAIKOWSKY`, so a normalised reading loses the ability to say which
pressing it came from. And it would make the spike unmeasurable: the
ground truth is what the label says, so a reader normalising its answer
scores as wrong against a correct transcription.

**So the raw string is never touched.** Resolution happens between the
raw value and anything that decides, which is where `normaliseCatno`
and `compactText` already sit for catalogue numbers.

## What it has to do

- **Fold the obvious variants**: case, diacritics, initials against
  full forenames, and `Surname, Forename` against `Forename Surname`.
  The `composer` table already carries `name` and `sort_name`, so the
  schema anticipated this.
- **Handle the leading article** in ensemble names — `The Philharmonia`
  and `Philharmonia` — without mangling names where the article is
  load-bearing.
- **Refuse rather than merge on a guess.** Two names that merely look
  similar are not one person: `Kleiber, Carlos` and `Kleiber, Erich`
  are father and son and conducted the same repertoire. A wrong merge
  silently deletes a contrast the collection exists to compare, and is
  far more expensive than two clusters that should have been one.
- **Resolve against MusicBrainz where possible**, which is M3's job
  anyway and gives an external identity rather than a local guess.

Transliteration is where this gets hard and where the refuse-rather-
than-guess rule earns its keep: Russian, Czech and Polish names arrive
through German, French and English conventions on the same shelf.

Trigger: M3, which resolves composers for the 131 Various/Unknown rows
and needs a canonical form to resolve them to. Also needed the first
time a photo reading is promoted into the store, since that is a second
route by which name variants arrive.

<!-- FILE: project/records/NAV-HOME.md -->

---
id: NAV-HOME
name: Every screen needs a visible way back to the hub
summary: The keyboard already goes home — `g` then `h` — but a phone has no keyboard, and capture opens full-screen into the camera by design, so on the device the app is actually used on there is no way back to the menu except the browser's own chrome, which a home-screen PWA does not show.
status: open
date: 2026-09-01
milestone: next
order: 4
flags: detail
---
# Every screen needs a visible way back to the hub

Raised by the maintainer on 2026-09-01, after a testing pass through
capture on a phone.

## What exists, and why it is not enough

`g` then a letter goes — `h` home, `a` add, `r` resolve, `c`
collection, `s` settings — and `?` lists them. That is the whole of
navigation between the five screens, and it is keyboard-only.

The phone is the device capture was built for. It has no keyboard, and
the app's manifest starts at `/capture` rather than the hub precisely so
that a home-screen icon opens straight into the camera. Both decisions
are right and neither should change. Together they mean the primary
device reaches exactly one screen and cannot leave it: a PWA launched
from the home screen has no address bar and no back button, so the
browser chrome that rescues this on the desk is not there.

## What it must not break

- **Nothing goes between the shutter and Queue it.** Capture takes the
  whole screen with one tap per photograph and no confirm step. A home
  control that can be hit while aiming would cost a crate.
- **Landscape puts controls on the right-hand edge**, where they cost
  width rather than the height a phone has little of. Any new control
  follows that rule or it is wrong in the orientation people shoot in.
- The keyboard shortcuts stay. This is an addition for the phone, not a
  replacement for the desk.

## Open question

Whether capture is the exception — reached by **Done** rather than by a
persistent control — or whether it too carries one. Capture is the
screen most at risk from a stray tap and the only one a phone opens
into, which argues both ways.

<!-- FILE: project/records/OPEN-PASSAGE-SELECTION.md -->

---
id: OPEN-PASSAGE-SELECTION
name: Should the app propose the comparison passage?
summary: Whether the app proposes the two-to-three-minute comparison passage from the track listing, or the listener always chooses it themselves.
status: open
date: 2026-08-30
milestone: icebox
order: 2
flags: sign-off
---
# Should the app propose the comparison passage?

The brief proposes app-suggested and editable. The alternative is
always choosing manually, which is slower per session but may be the
point — passage choice is a musical judgement, and a bad automatic
suggestion could quietly weaken every comparison it touches.

Trigger: needed before M5's session cards.

**Maintainer decision required.**

<!-- FILE: project/records/OPEN-RECATALOGUE.md -->

---
id: OPEN-RECATALOGUE
name: Photograph the 446 imported rows rather than review them by keyboard?
summary: Every one of the 293 items in the review queue is a legacy spreadsheet row and 267 of them have no label, which is exactly why the corroboration gate refuses them — so photographing those discs would supply the missing signal family and shrink the queue, and the question is whether handling 267 discs costs less than deciding 293 blind.
status: open
date: 2026-08-31
milestone: current
order: 6
flags: sign-off
---
# Photograph the backlog instead of reviewing it?

The maintainer's instinct, 2026-08-31: re-catalogue with pictures,
because it is so much easier than typing. The queue's composition says
that is not just a preference.

## What the queue actually is

Of the 293 items in `needs-review`:

- **293 are legacy rows** from the M0 spreadsheet import. Not one is an
  app capture.
- **267 have no label** — 91%.
- 42 have no title either.
- 6 have a photograph.

That is the whole explanation. The gate refuses a verdict on one signal
family, a catalogue number is usually the only signal these rows carry,
and M0 measured why that matters: 26 of 277 matches wrong, 16 labelled
"Exact", because a catalogue number was treated as a verdict.

**A photograph supplies label, title and performers.** That is the
second and third family the gate is waiting for. It does not merely
help these rows; it is the missing input.

## The trade, honestly

Against: the brief says the expensive resource is handling the record,
and to design so each disc is picked up exactly once. Photographing 267
discs is a second pickup.

For: the first pickup did not capture enough. Those rows have a
catalogue number and nothing to corroborate it with, so the cost was
paid and the data is still thin. Reviewing them by keyboard produces a
release verdict but **still no label** — the capture row stays as poor
as it was, and M3's composer resolution inherits the same gap.

And the flow has changed underneath the question. Photographing a disc
is now a few shutter taps in a viewfinder that stays open; it was
twenty form interactions when the brief was written.

## Do not decide this on 267 discs

**Photograph twenty legacy rows and count how many auto-accept.** That
is a couple of minutes of shooting and it answers the question with a
number rather than an argument: if fifteen of twenty clear the gate,
the case is made for the rest; if three do, keyboard review is the
cheaper path after all and the reason will be visible in the runs.

The same discipline as SPIKE-PHOTO-TO-FIELDS, and for the same reason —
the alternative is committing hours of physical handling to a guess.

**Maintainer decision required**, after that measurement.

<!-- FILE: project/records/PHOTO-CULL.md -->

---
id: PHOTO-CULL
name: Cull photographs that carry no text no other shot carries
summary: Crate 3 took 34 photographs of 6 records and roughly a fifth were re-shoots of the same corner, which cost pack space and reading attention and bought nothing; a proposed rule set keeps one whole-sleeve view for identification plus every shot that is the sole source of some value, and proposes the rest for deletion rather than deleting them, because a cull driven by an extraction lets a bad reading destroy its own evidence.
status: open
date: 2026-09-01
milestone: next
order: 6
flags: detail
blocked-on: RECORD-EDIT-PHOTOS — nothing can show a person the shots they are being asked to drop
---
# Cull photographs that carry no text no other shot carries

Raised by the maintainer on 2026-09-01: drop shots whose text nothing
depends on, but keep a whole-sleeve view because that is what identifies
the record by eye. Rules were left to me; these are proposed, not
settled.

## The evidence

Crate 3: **34 photographs of 6 records**, 5.7 a record. Reading them, at
least seven bought nothing — a second shot of a corner already read.

| record | redundant | what it repeated |
| --- | --- | --- |
| 484 | `484-4` | the `GL25021` corner, already in `484-3` |
| 484 | `484-5` | the title band, already in `484-2` |
| 485 | `485-6` | the `GSTP-8A/S8` corner, already in `485-5` |
| 486 | `486-2` | the HMV logo, on the sleeve and both discs already |
| 488 | `488-6` | the spine, repeating the front's title and label |
| 489 | `489-4`, `489-5` | two crops of the top bar whole in `489-3` |

That is ~20% of the pack, and the cost is not storage. Packs cap at 10
records and 20 images, so redundant shots split a crate across more
packs than it needs, and every one of them is a thing a reader looks at.

## Proposed rules

Keep a photograph if **any** of these holds:

1. **It is the record's whole-sleeve view.** Exactly one, kept always,
   even carrying no text at all — this is the identification-by-eye case
   the maintainer named, and it is what a person recognises a record by
   when the fields disagree.
2. **It is a disc label.** Never culled, ever, and never the last one.
   The disc is the only thing that says which record is in your hand:
   crate 2 came back sleeve-only and could not be identified, and on
   487 the sleeve says `M. 2316` where the disc says `AM-2316`.
3. **It is the sole source of some value** — a number, a name, a year
   that appears on no other shot of that record.
4. **It carries a decoy** — a number that is *not* the catalogue number.
   Counter-intuitive, and the reason is that these are the hardest rows:
   a shot proving `M. 2316` exists is what makes `AM-2316` a judgement
   rather than a guess.

Propose for deletion anything else — specifically a shot whose readable
text is a **subset** of another shot of the same record. Two photographs
of one corner are one photograph.

## The rule that matters more than the rules

**Propose, never delete.** The subset test runs on an extraction, so a
reading that missed a number marks the only shot carrying it as
redundant and destroys the evidence that would have corrected it. That
is the failure mode of the whole idea, and it is silent.

So a cull is a list a person confirms, per record rather than per crate,
and a photograph a reading has already cited is never proposed —
deleting it leaves a claim in the store with nothing behind it. Which
needs a person to see the shots: [[RECORD-EDIT-PHOTOS]], and this is
blocked behind it.

## Cheaper than culling

Most of crate 3's waste was doubled shots taken seconds apart — a second
tap after a first that looked wrong on a phone screen in a loft. Capture
noticing a near-identical frame, while retaking is still free, beats
deleting it later. Not this record's work; the same problem met earlier.

<!-- FILE: project/records/PHOTOS-TO-DESKTOP.md -->

---
id: PHOTOS-TO-DESKTOP
name: Pull captured photos and their row ids out for a chat pack
summary: Built, gated and live — photos-pull reads (item_id, r2_key) pairs from D1 and fetches each object by name, writing data/label-photos plus a ground-truth starter taken from the values a person typed into capture; R2 is now attached and a photo has made the full round trip, so all that is left is photographs being taken.
status: in-progress
date: 2026-08-30
milestone: current
order: 4
flags: detail
blocked-on: nothing — waiting on photographs being taken through the app
---
# Pull captured photos and their row ids out for a chat pack

`tools/photo-pack.mjs` reads a local directory. Photos taken on the
phone are not in one; they belong in R2, and the Worker exposes
`PUT /api/photos/:key` and no GET at all.

## Built and green (2026-08-30)

`node tools/photos-pull.mjs` — one query, one fetch per object, no new
route.

- **Pairs come from D1, never from a bucket listing.** `item_photo`
  carries `(item_id, r2_key)`, which was the record's open question and
  the schema answers it. A tool that enumerated R2 would be one step
  from the export route this design exists to avoid.
- **It is read-only against production**, and tests assert it: no
  INSERT, UPDATE, DELETE, DROP, ALTER or CREATE, and `get` as the only
  R2 verb. It runs with real credentials against `--remote`, so a stray
  verb would be a production write rather than a failing test.
- **The row ids are `item.id`** — what actually ties a reading back to
  a record, and better than the filename stems the spike falls back to.
- **Ground truth is generated, not retyped.** `capture` holds what a
  human read off the label, which is the definition of ground truth
  here, so the CSV is written from it with only `decoy_numbers` left
  blank. Retyping those values would be transcribing them twice and
  inviting a discrepancy. An existing file is never overwritten — the
  decoys are the expensive half.

## The obvious design is still the wrong one

A zip-download route in the app inverts the property that keeps a
sign-in-free v1 safe: "no route reads a photo" becomes "one route
enumerates and returns all of them". Unlike the matcher, which runs
from cron and has no caller, an export route exists to be called. A
test now asserts the Worker still has a photo PUT and no photo GET.

## Why nothing had come through — settled 2026-08-30

**The `PHOTOS` binding did not exist.** `[[r2_buckets]]` was commented
out in `wrangler.toml`, because a binding to a bucket that cannot exist
fails the deploy outright. So the live Worker had no photo storage,
every upload returned 503, and the app kept them queued — correct
behaviour with a silent and total consequence: no photograph had ever
left a phone, and nothing on screen said so.

R2 turned out to be enabled on the account already; only the binding
was missing. `tools/deploy.sh` now uncomments the block itself once
`r2 bucket list` answers, so nobody hand-edits TOML.

**Verified against the live Worker**, not merely deployed: a 785-byte
JPEG PUT to `/api/photos/` returned 201 where it had always returned
503, and `wrangler r2 object get` fetched the identical 785 bytes back
— which is the exact call `photos-pull` makes. The probe object was
deleted afterwards. Both halves of this tool have now run against real
infrastructure; what has never run is the D1 query, because no capture
with a photo exists yet.

**Done when** a photograph taken on the phone appears in
`data/label-photos/` named by its item id.

<!-- FILE: project/records/RECORD-EDIT-PHOTOS.md -->

---
id: RECORD-EDIT-PHOTOS
name: Edit a record's photographs — delete, add, and split by selection
summary: Browse can already correct every field, but its photographs are listed by key and never shown, because serving one needs a Worker GET that a sign-in-free v1 deliberately does not have; so deleting a bad shot, adding a missing disc label, or splitting a record by picking which photos go where is desk work through split-item.mjs, blind, and only reachable by whoever has the credentials.
status: open
date: 2026-09-01
milestone: next
order: 5
flags: blocked
blocked-on: whether a photo-reading route can exist without a sign-in
---
# Edit a record's photographs — delete, add, and split by selection

Raised by the maintainer on 2026-09-01. Three operations, one blocker
shared between them.

## What is wanted

- **Delete** a photograph — a mis-fire, a blurred retake, a shot of the
  carpet.
- **Add** one to an existing record, which is how a sleeve-only row gets
  its disc label without re-cataloguing the disc. Crate 3 needs this
  today: 484, 485 and 488 were photographed sleeve-only.
- **Split** a record by choosing which photographs go to which side —
  the case where one capture turns out to hold two discs.

## The blocker is one decision, not three

`/browse` lists photographs **by key rather than showing them**, and
that is not an oversight. Serving a photograph needs a Worker route that
reads R2, and v1 has no sign-in: the property that keeps that safe is
that no HTTP entry point can reach a photograph at all. `photos-pull.mjs`
exists precisely so the desk can see them without such a route ever
being added — it uses the credentials the maintainer already has for
deploying, so there is no new exposure.

Every operation above needs a person to **see** the photographs to
choose between them. Delete-by-key is not a feature, it is a trap: the
keys are opaque and the only thing distinguishing `…-3.jpg` from
`…-4.jpg` is what is in them.

So this record is blocked on a question, not on work: **can the app show
a photograph without acquiring a route that enumerates or serves them to
anyone who asks?** Plausible answers, none yet chosen:

- A signed, expiring URL minted only for a caller already holding
  `EDIT_TOKEN` — keeps the passphrase as the gate the edit routes
  already use, and an `<img>` can carry it in the URL where it cannot
  carry a header. Note the trap recorded on 2026-08-31: a photo gate
  proved with `curl -H` is proved against the one caller that could
  never fail.
- Keep it desk-only and grow `tools/split-item.mjs` into something that
  shows contact sheets locally. No new route, no new exposure, but it
  stays maintainer-only — and the people finding these problems are
  testers with phones.
- Accept a sign-in for the edit surface alone, which reopens a decision
  taken deliberately on 2026-08-30.

## What already exists

`tools/split-item.mjs` splits a record. It does it blind and by
argument, which is workable for the maintainer and useless to a tester.
The browse screen's field editing — click to correct, tick to confirm,
promote a reading into its field — is the model this should follow:
every write lands as a confirmed `shelf` value with a name on it, and
none of it makes anything decision-eligible.

**Deletion needs its own thought.** A photograph is the evidence behind
a reading; deleting one after a reading has cited it leaves a claim with
no support. Culling is [[PHOTO-CULL]] and has the same problem in a
larger size.

<!-- FILE: project/records/SPIKE-PHOTO-TO-FIELDS.md -->

---
id: SPIKE-PHOTO-TO-FIELDS
name: Can a label photograph populate the capture fields?
summary: The round trip has now run end to end — crate 3, six records read blind and scored — and it fails, but on schema rather than on reading: ten of fourteen wrong values are two documents answering different questions, and the decoy check that the whole spike exists for never ran at all, because `decoy_numbers` was not a column the typed sheet had. Photographs are no longer the blocker; ground truth typed to the scorer's own columns is.
status: in-progress
date: 2026-08-30
milestone: current
order: 3
flags: spike, blocked
blocked-on: ground truth typed to the scorer's columns — `decoy_numbers` above all
---
# Can a label photograph populate the capture fields?

Every capture already stores a `label_a` photo in R2 and reads nothing
from it. That photo carries five of the six `capture` columns — all but
`matrix_runout`, which is etched in the deadwax and is why `runout` is
its own photo kind.

## Built and green

Three commands, no API key: `photo-pack.mjs`, `photo-import.mjs`,
`photo-score.mjs`. **Nothing touches the database**, and a test asserts
it cannot — a spike measures; promoting a reading into the store is the
decision the measurement exists to inform.

Three moves carry the split-label-catno rule, refuse rather than guess:

- **`other_numbers`** gives a number the model can see but cannot
  assign somewhere to go that is not `catno_raw` — a classical label is
  littered with matrix codes, side numbers, opus numbers and (P) years.
- **The prompt forbids inference from knowledge of the recording.** In
  a chat nothing enforces a schema, so those words are the whole guard
  and a test asserts they survive editing.
- **Every row carries its own `row_id`** and an unsent id is refused.
  Twenty images up and eighteen back would otherwise attribute every
  row after the gap to its neighbour — indistinguishable from good data.

Scoring holds `refused` and `wrong` apart rather than averaging them
into a figure that would hide the only question worth asking. A decoy
reported as the catalogue number fails the run on one occurrence: the
M0 error recreated, a number treated as a verdict.

## Two ways in, one contract (2026-08-30)

Maintainer's call: batches of 10, saved to a directory. Each pack is
written twice — `pack-NN/` and `pack-NN.zip`. The directory is the
cheap path: a session reads it in place, so no upload, no dragging and
no per-message cap. `READ-THIS-FIRST.md` carries the task, the ids and
the destination, embedding `chatPrompt` verbatim so the two statements
of one contract cannot drift.

The zip is browser transport only. Uploading it whole does not work —
claude.ai never passes a zip's contents to the vision path.

**Reading in place costs one new guard**: the reader is now on the same
disk as `ground-truth.csv`, and a reading taken with the answer sheet
in context measures nothing — verifying Discogs with Discogs, a third
time. `BLIND_READ` is its own tested constant and no pack may contain
the ground truth, but nothing mechanical can prove a context never
opened a file. A fresh session is the practice.

## The first real run (2026-09-01)

Crate 3 — six records read blind, then scored against a sheet typed at
the crate. `data/photo-runs/opus5-2026-09-01-crate3/`.

**7 exact, 1 refused, 14 wrong: fails.** The number is honest and
measures almost nothing, which is the finding. `notes.md` beside the run
has the breakdown; three things belong here.

**The decoy check never ran.** The sheet had no `decoy_numbers` column,
so nothing could spring the trap — and the report still printed "decoy
numbers reported as catalogue numbers: 0 — must be 0". A report that
cannot tell an untested condition from a passed one is itself a fault.

**Ten of fourteen are schema, not sight** — transcription against
summary, orthography, a column the sheet lacks. Of the four that tested
reading, the reading won three. 487 is the case in miniature: cover
wreath `M. 2316`, disc `AM-2316`, sheet took the sleeve, and the scorer
counted the disc against the decoy.

**The ground truth is a reading too**, and here it was wrong at least as
often as the machine. The scorer treats the sheet as fact by
construction. Whether that survives 750 records is now a live question.

Two harness faults were found by this run and fixed the same day:
`parseChatReply` extracted the array only when the reply did not *start*
with `[`, and a blank skeleton row scored as five wrong answers instead
of reading as untyped. Both now tested.

## What is left

**Ground truth in the scorer's seven columns** — `decoy_numbers` above
all, since without it a run can neither pass nor fail the thing it
measures. Photographs are no longer short: 42 records on disk, 37 read,
and 31 of those from crates 1–2 were read before any answer existed and
are still untyped. They would score today, and they already exceed the
twenty this record asks for.

Half of crate 3 was sleeve-only (484, 485, 488) and 484 has no typed row
at all, so it repeats the crate-2 condition rather than testing the fix.

More testers are coming, which makes two conveniences load-bearing: the
sheet needs the scorer's schema rather than each person's own, and a
reading must name who read it — crate 3 was read by the session that
scored it, which is weaker than a fresh one.

Cost and provenance are already settled — see the decision log.

## Decisions it feeds

Whether `field_source.source` gains a `vision` value, so a photo
reading is distinguishable from a legacy AI guess; and whether a
hand-run round trip is tolerable at 750 records.

<!-- FILE: project/records/TRACKLIST-CAPTURE.md -->

---
id: TRACKLIST-CAPTURE
name: Capture tracklists — from Discogs first, from photographs only where that fails
summary: release_track has held zero rows since M1 because the Worker's getRelease is never called, so the tracklist Discogs already returns for every accepted match is fetched, scored and discarded — and a tracklist is the field that says what a pressing actually is when a catalogue number is shared, which is exactly the tie the corroboration gate cannot currently break.
status: open
date: 2026-08-31
milestone: current
order: 5
---
# Capture tracklists

The maintainer's point, 2026-08-31: tracklists are what settle which
pressing a record actually is, published metadata is often wrong about
them, and the collection cannot be grouped by work without them.

All true, and the cheap half is already paid for.

## Three separate things, in cost order

### 1. Store what Discogs already gives us — nearly free

`release_track` has held **zero rows since M1**. `DiscogsClient` has a
`getRelease` method that the matcher has never once called: the search
rungs return catalogue number, label and title, and the release
endpoint returns the tracklist, but only search is used.

So the cost is **one extra request per newly accepted release** — not
per row, not per query. Against a ladder already spending 9-12 requests
a row, that is noise, and it fills the table M3 and M4 both read.

Positions and durations come with it. `duration_s` and `position` are
columns that have never had a value.

### 2. Use the tracklist as a corroboration signal — cheap, once (1) exists

The gate counts independent signal families: catno, label, name, title,
format, year. A tracklist is a seventh and a strong one — two pressings
sharing a catalogue number differ by what is on them, which is
precisely the tie the gate currently cannot break and the reason it
refuses a single-family verdict.

Wants care: comparing classical tracklists is a normalisation problem
of its own — movement titles, opus numbers, translated names — and that
is [[NAMES-CANONICAL]] territory. A naive string compare would report
disagreement between two correct listings of the same record.

### 3. Read the tracklist off a photograph — expensive, and only where 1 and 2 fail

The sleeve back carries it, and the capture flow is already
photographing sleeve backs: `452-1.jpg` shows a full listing with side
divisions. So the pixels exist.

But this is the costly path and it is a fallback, not a plan: it is
worth building only for releases Discogs has wrong or does not have,
and nobody yet knows how many those are. Doing (1) first MEASURES that
— a release whose stored tracklist disagrees with the sleeve is the
population this would serve.

## Why the order matters

Building (3) first would be reading from photographs what a free API
call already answers correctly most of the time, and with no way to
tell which times those are.

**Done when** an accepted match stores its tracklist, and the number of
releases Discogs has no tracklist for is a measured figure rather than
a guess.

<!-- FILE: project/records/_meta.md -->

---
current-intent: M2 plus the interface brief of 2026-08-31. M2's own remainder is maintainer work — clearing 287 needs-review by keyboard — and the app moves to its real URL, gains a home page and a settings screen, and is rebuilt on one visual language. The two meet at the review queue: REVIEW-CARD and MATCH-OTHER-NUMBERS exist to make clearing it cheaper, not prettier.
next-intent: The half of the interface brief needing data the database does not hold — value and genre, a re-verification sweep for when the backlog empties, and readings that name their source photograph. Each blocked on a migration, a backfill or a pack-format change rather than on M2.
icebox-intent: M3–M5 — resolve works, cluster and decide — committed and sequenced, each triggered by the milestone before it going green; plus the open questions those milestones need answered, which unblock on their own evidence rather than on a milestone. The photo path left here on 2026-08-30.
---
# Backlog view meta (records mode)

<!-- FILE: project/trajectory.md -->

# Trajectory

<!-- One line per shipped item. -->
- M0-ARCHIVE-FREEZE — 87 source files frozen with sha256; venv/cache artefacts excluded by declaration, token digest redacted (2026-08-30) — see decision-log
- M0-REPAIR-ENCODING — MacRoman confirmed by byte histogram; two corruptions repaired under 14 fixture tests drawn from the frozen inputs (2026-08-30) — see decision-log
- M0-SPLIT-LABEL-CATNO — 141 backlog rows split against a 98-label gazetteer attested in the data: 31 split, 73 bare catno, 37 refused with reasons (2026-08-30) — see decision-log
- M0-IMPORT-ENRICHED — 305 rows imported with per-field provenance; 277 Discogs-derived and unconfirmed, 0 decision-eligible (2026-08-30) — see decision-log
- M0-IMPORT-REMEDIAL — 141 rows imported needing capture, 210 placeholders dropped with every ID named; dataset now 446 rows (2026-08-30) — see decision-log
- M0-MERGE-LOAD-FILES — all 83 usable rows already present in Remedial: 0 merged, 83 duplicate decisions recorded; dataset stays 446 (2026-08-30) — see decision-log
- M0-IMPORT-AI-WORKS — AI track listings, confidence, remarks and sources attached to 305 rows as guess; no AI ratings exist; 28 AI track listings found hiding in the enriched sheet and reclassified (2026-08-30) — see decision-log
- M0-RECONCILIATION-REPORT — 446-row CSV plus a report naming every source, rule and drop; archive verified unchanged, rebuild byte-identical. M0 complete (2026-08-30) — see decision-log
- OPEN-DISCOGS-TOKEN — token valid (walter_odington); not a seller, which costs only condition-graded price suggestions — lowest price, count for sale and have/want all reachable (2026-08-30) — see decision-log
- OPEN-SYSTEM-OF-RECORD — app database is authoritative; import is one-way and the OneDrive CSV export is a backup, not a round-trip (2026-08-30) — see decision-log
- OPEN-USERS-ACCESS — no sign-in for v1 by maintainer decision; Worker exposes named operations only and capture never calls Discogs, so auth is revisited at M2 (2026-08-30) — see decision-log
- M1-SCHEMA — four-entity D1 schema with the provenance rule enforced by views; 446 rows loaded with 4,681 provenance records and nothing decision-eligible (2026-08-30) — see decision-log
- M1-WORKER — Hono Worker with named operations only; no outbound request exists in M1, so the Discogs token is unreachable rather than merely unused; central rate limiter built and tested ahead of M2 (2026-08-30) — see decision-log
- M1-CAPTURE-UI — photo-first offline capture PWA; verified in-browser that a capture survives a hard refresh and syncs when the Worker appears, with the app measuring its own median entry time (2026-08-30) — see decision-log
- M2-MATCHER — corroboration gate ported and live-tested; 277 existing matches re-verified, 12 unsupported including 4 labelled "Exact" and several pointing at a different record entirely (2026-08-30) — see decision-log
- M2-REVIEW-QUEUE — keyboard-driven queue built and verified in-browser; a type-ahead race that silently mis-filed decisions found and fixed, and a cache-first service worker that would have blocked every future deploy (2026-08-30) — see decision-log
- M2-MATCHER (follow-up) — throttling fix measured: the same 60-row sample went from 53 false "nothing found" to 4 verified and 36 needing review, with 0 failed queries (2026-08-30) — see decision-log
- OPEN-SELL-THRESHOLD — value never earns a keep; sell only above £10, keep only for musical reasons (2026-08-30) — see decision-log
- OPS-SPEND-GUARD — Free plan confirmed, so D1's 100k/day refusal is the real wall; per-tick write budget and query accounting shipped as redundancy, and a cpu_ms limit that made the Worker undeployable was found and removed (2026-08-30) — see decision-log
- CAPTURE-BULK-PHOTOS — a crate photographs in one pass, one row per photo, nothing typed; bulk rows carry only crate, position and capturer, so no disc's catalogue number can reach another's row, and a rejected photo no longer blocks the crate behind it (2026-08-30) — see decision-log
- CAPTURE-LOCATION — crate no longer required, no longer sticky and folded into More, after the first real capture arrived as crate "1" position "1"; a downscale that ran only on the bulk path found and fixed, so one photo queues at 370 KB rather than 6.45 MB (2026-08-30) — see decision-log
- CAPTURE-MANY-PHOTOS — a capture takes several photographs, one per kind, because the catalogue number and the title are rarely in one frame; no schema or Worker change was needed, and photos-pull now states how many photographs it is not pulling (2026-08-30) — see decision-log
- CAPTURE-UNDESCRIBED — the app stops asking what a photograph shows and stores every capture as `other` (migration 003), because with no consistency to describe, any kind would be an invented fact; photo-pack now batches by record so a disc's shots stay together (2026-08-30) — see decision-log
- CAPTURE-LIVE-CAMERA — a viewfinder that stays open, one tap per photograph and no Use Photo confirmation, with the torch capability-gated because iOS exposes none; frames grab straight to the stored size rather than encoding twice (2026-08-30) — see decision-log
- CAPTURE-VIEWFINDER — the camera goes fullscreen with the page locked behind it, controls moving to the right edge in landscape where they cost width not the scarce height; the torch is offered and tried rather than gated on a capability report that under-reports (2026-08-30) — see decision-log
- PHOTO-ORIENTATION — the reader reports how the writing sat and the score tabulates wrong values against it, so a rotation detector gets built only if photographs actually arrive rotated and rotated ones actually read worse (2026-08-30) — see decision-log
- PHOTO-ROTATION — sixty real photographs showed the iOS stream does not turn with the phone, so the camera now re-acquires on rotation and the preview shows what is actually stored; rotate_cw is reported in degrees and photo-rotate stands already-taken photographs up, idempotent by ledger (2026-08-31) — see decision-log
- PHOTO-PROMOTE — a photo reading lands in raw_value under a new `vision` provenance (migration 004) and the matcher may use it where capture is empty, so a photographed record can reach the review queue; capture is never written and the decision views allow-list, so a reading cannot reach a cluster (2026-08-31) — see decision-log
- CAPTURE-ONE-SCREEN — the crate-in-one-pass mode withdrawn on the maintainer's reading that more than one photograph is always needed, so a crate walked that way manufactured three discs where one stood; condition and More parked as comments and the screen cut to shutter, three boxes and Queue it, which fits an iPhone SE without scrolling (2026-08-31) — see decision-log
- OPEN-V1-AUTH — no sign-in for v1 on maintainer sign-off; capture and photo upload stay anonymous because an offline queue must not acquire a way to fail, and the shared passphrase goes on the edit endpoints only, since adding a row is not the risk that rewriting 465 is (2026-08-31) — see decision-log
- CAPTURE-NEXT-DISC — a Next disc control in the camera bar files the disc in hand and keeps the viewfinder open, so a crate costs N shutter taps plus one instead of N plus three and the camera never restarts between discs; the mis-tap is bounded by a five-second Undo built out of the drain's own nextAttemptAt, which delays the send and never the write (2026-08-31) — see decision-log
- CAPTURE-WHO — a first-name gate at first launch, matched against a six-name roster and stored canonically, so every row says who read its label and `jojo`/`JOJO`/`JoJo` land as one value; the same roster now guards the review queue, which used to store whatever was typed, and the offline queue drains behind the gate because that promise does not get a caveat (2026-08-31) — see decision-log
- DATASET-VIEWER — /browse lists the whole collection with its match history and a provenance mark on every field, including the fields with no provenance row at all; the unaggregated capture join that returned an item once per capture row is fixed with a test, and the photographs are listed rather than shown because the route that would serve them is forbidden by another record's security test — split out as BROWSE-PHOTOS for the maintainer (2026-08-31) — see decision-log
- DATASET-EDIT — correct, confirm or promote a reading from the browse detail, behind a shared EDIT_TOKEN that answers 503 rather than 200 when it is unset; every write lands as a confirmed `shelf` value with a name on it, nothing becomes decision-eligible, promotion leaves the `vision` reading unconfirmed rather than laundering it, and AGENTS.md now bars MACHINE writes over capture while permitting human correction (2026-08-31) — see decision-log
- CAPTURE-BULK-REMNANT — bulkFields and BULK_CARRIED stay, with a comment in queue-logic.ts and in its test opening "nothing calls these two", because deleting them deletes tests and that is a stop-and-ask an autonomous session may not take on its own judgement; the cost was never the bytes but the next reader wondering whether something was broken, and that cost is gone (2026-08-31) — see decision-log
- BROWSE-PHOTOS — label photographs are served behind the typed name and shown in both browse and the review queue, with the r2_key moved behind the same header because the key is the photograph's address; found and fixed an R2 test double that returned no body, so a route serving nothing would have passed (2026-08-31) — see decision-log
- CAPTURE-MERGED-ROWS — item 453 was two discs and is split at photograph 7 into item 466; 455's two catalogue numbers turned out to be one disc printing both, so multiple numbers is not evidence of a merge and only a person looking could tell the two cases apart (2026-08-31) — see decision-log
- DESIGN-SYSTEM — one token sheet and one component library under all five screens; dark is the base and light a class applied before paint, so a device where the theme script never runs gets the palette the loft needs. The accent marks only what is interactive, which is why needs-review stopped being amber (2026-09-01) — see decision-log
- APP-HOME-HUB — a hub at / with four destinations and their counts; capture moved to /capture.html and the manifest start_url with it, so an installed phone still opens the camera. The service worker's offline fallback is now path-aware, or it would answer "no signal" with a menu (2026-09-01) — see decision-log
- REVIEW-CARD — the sleeve Discogs already returns is stored and shown at no extra request, and each candidate says field by field how the reading stands against it in five states; unread and unknown are the two that were missing, because blaming a candidate for a silence teaches a reviewer to ignore the red mark (2026-09-01) — see decision-log
- APP-KEYS — g-then-a-letter to go, / to search, ? for a card generated from the same table that binds the keys, and a shared typing guard so no shortcut fires into a text box; the review queue's established keys are untouched (2026-09-01) — see decision-log
- CAPTURE-GUIDANCE — a ranked sheet saying to fill the frame with the disc label and why the sleeve carries decoys, the stored long edge raised to 2048 after item 481's catalogue number was resized out of its own file, and a tap opens any shot full size. Framing beats pixels, so full resolution was refused (2026-09-01) — see decision-log
- MATCH-OTHER-NUMBERS — every other number a reading saw now reaches D1 and builds a second ladder, spent only where no candidate carried a signal family; the alternatives score but stay one family, since two numbers on one label are one label (2026-09-01) — see decision-log
- APP-SETTINGS — device settings open, collection settings and a JSON/CSV export behind the shared passphrase, and token entry, resetting and roster editing left at the command line because all three want a sign-in first; the export is fetched as a blob, since an <a download> sends no headers (2026-09-01) — see decision-log
- MATCH-REVERIFY-SWEEP — the tick tops up with the oldest rows once nothing is unmatched: off by default, never a row a person confirmed, capped per day. Ordered by match_run.ran_at and NOT last_verified_at, which only resolveRun writes — ordering by it would loop for ever (2026-09-01) — see decision-log

<!-- FILE: project/wish-list.md -->

# Wish-list

<!-- Unscoped ideas. Triaged, not hoarded: promote into a record or delete. -->

## Open
- The later batch — 2,000–6,000 more varied records. The schema is
  genre-neutral from day one so this stays possible; the v1 interface
  just never shows an empty classical field.
- Non-classical crates in the interface. Schema permits them already.
- A real selling workflow — listing, pricing, offers — beyond v1's
  static sell list with values attached.
- Browse the deliberately-kept contrasting pairs as a labelled part of
  the collection, since keep-several is a first-class outcome.
- Sampling set-aside copies from large clusters, beyond the one-click
  recall already in M4.
- Mop up the sleeve-only rows that will not identify. Items 467-483 were
  photographed sleeve-only, so a shared, ambiguous or advertised
  catalogue number has nothing to break the tie; re-shoot the disc
  labels of whatever the reading and the matcher leave unresolved,
  rather than all seventeen. Needs a browse filter that names those rows
  — photographed, read, still unresolved — or the mop-up crate is
  assembled from memory. From the 2026-08-31 capture ruling.
- The reading should say which photograph each value came from. A
  catalogue number read off the disc label is far stronger evidence than
  the same number in sleeve small print, and nothing currently tells the
  two apart: the 2026-08-31 crate returned seventeen confident readings
  with zero fields marked unreadable, so the refusal/wrong distinction
  the scorer is built around went unused. The pack already sends
  per-record filenames, so the reply can carry the source photo per
  field without new plumbing.
- The matcher should fall back to `other_numbers` when the primary
  catalogue number finds nothing. Item 480 carries `SUA ST 50639 Stereo`
  and `SUA 10639 Mono` — the reading recorded both and picked one with
  nothing on the sleeve to decide it — and item 469 has `642 273 GL`
  behind `GL5840`. The alternative is already captured; no query ever
  tries it.
- Where a sub-£10 shootout loser actually goes. Not sold (below the
  effort floor), not kept (no musical reason) — donate, charity shop,
  or a "not worth selling" pile? Comes up the first session that
  produces one. From OPEN-SELL-THRESHOLD, 2026-08-30.
- Warn at the shelf when a catalogue number is already in the
  collection. Finding overlapping copies is the whole project, and the
  cheapest moment to notice one is while the disc is still in your
  hand rather than in a cluster three milestones later.
- "Do I own this?" from a shop. The PWA and the offline store already
  exist; caching catalogue numbers for lookup with no signal is a small
  addition to them and is the one feature that gets used away from the
  house.
- Import a shared phone album at the desk. The brief names a camera
  plus a shared album as a legitimate day-one fallback, and there is
  currently no way to get those photographs in — only the in-app
  camera writes.
- A progress screen: catalogued, photographed, matched, confirmed,
  decided, as counts over time. The home page will show today's
  numbers; this is the one that says whether the collection is
  actually converging.
- The history of one field. Every correction already writes
  `field_source`, so who changed what and when is recorded and
  unreadable — an audit view costs a query and no new data.

