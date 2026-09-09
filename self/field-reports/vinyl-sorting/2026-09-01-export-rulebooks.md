<!-- field-report: project=vinyl-sorting · date=2026-09-01 · type=export
     · pm-skills=pm-next-v0.2 (lab/next of djDAOjones/PM-Skills-lab at 530637a, vendored 2026-08-30; no canon release governs it)
     · source=root contract, curricula and README at snapshot 60c3c4b55dba25c52e6e0ba9a8bbf3fc9ea88f88, taken 2026-09-09 by Claude Code
     · redaction=0 checkout path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=public names Joe and djDAOjones, the public Worker subdomain joe-2d2 and the Discogs account name walter_odington retained where present — every one already public in the project's committed files; no unpublished identity was intentionally added -->

# Rulebook export

Snapshot: `60c3c4b55dba25c52e6e0ba9a8bbf3fc9ea88f88`. pm-next has one contract file, `AGENTS.md`, and one optional curricula file; there is no `UI-STANDARDS.md` or `DEV-INFRASTRUCTURE.md` in this design. The README is included because pm-next's contract names it as a reference document the validator budgets.

<!-- FILE: AGENTS.md -->

# AI Agent Rules — Vinyl Sorting (pm-next v0.2)

<!-- The whole framework, one file. Judgement curricula are the
     optional curricula.md; everything mechanical below is either a
     checked contract or a pointer to a tool. Where your harness
     supports rules imports, import this file plus the identity
     documents (project/brief.md and kin) into the rules position —
     identity only, never work-target files. -->

## Hard rules (one canonical statement — tools enforce, this states)

No new runtime dependencies. No destructive or schema-altering data
operations. No weakening or deleting tests. Minimal change: touch
what the item needs. Stop and ask at any of these boundaries; in
autonomous modes, stop means park the item with a note, take the
next.

Sanctioned dependency exception (maintainer, 2026-08-30, at the M1
boundary): the brief's named stack — `hono` at runtime, and
`typescript`, `vite`, `wrangler` and `@cloudflare/workers-types` as
dev dependencies. Nothing else. The rule still bites for every other
package, and adding one is still a stop-and-ask.

Project boundaries, same force as the above:

- `Pre August 2026/` is a read-only archive. Never edit, move or
  rename anything inside it; every import reads and writes elsewhere.
- Never let a MACHINE write over `capture`. Discogs data lands in
  `release`; the two stay separate for ever, so duplicate detection
  runs on what a human read rather than on what a bad match wrote. A
  PERSON may correct their own reading through the browse screen —
  maintainer sign-off, 2026-08-31 — and that edit lands as a confirmed
  `shelf` value carrying the name of whoever made it. The bar is on
  machine writes, which is what it always meant; the accepted cost is
  that the previous reading is gone.
- The provenance rule: a value sourced `guess` or `legacy`, or an
  unconfirmed `discogs` value, may be displayed anywhere but may
  never feed a cluster, a coverage check, a sell list or a shortlist
  until a person has confirmed it. Enforce it in the query layer, not
  by convention.
- No secrets in the repo. `DISCOGS_TOKEN` is a Worker secret; a token
  file present in the working tree is never committed, echoed or
  pasted into a prompt.
- Rate limits are enforced centrally in the Worker, never per caller:
  Discogs 30/min shared AND at least 2 s between consecutive requests,
  MusicBrainz 1/sec with a real user-agent. The spacing is not
  decoration: Discogs enforces a lower rate than it publishes and cares
  how bursty the traffic is, so a per-minute budget alone is spent as
  an instant burst and refused. Corrected from 50/min on 2026-08-30
  after the deployed matcher was throttled while the same token from a
  laptop had 59 requests remaining.

## Memory contract (exact — the two checks below FAIL deviations)

- Items are records: `project/records/<ID>.md` — flat `key: value`
  frontmatter (id, name, summary, status: open|todo|in-progress|cut,
  milestone: current|next|icebox, flags, blocked-on, date, grades,
  order; the key is `name`, never `title`) over an H1 body.
  Frontmatter is flat by construction, so: every item has an ID,
  Icebox included; IDs are SCREAMING-KEBAB with no dots; `summary:`
  is one physical line however long. An unknown `status:` renders as
  open and warns — it never silently disappears.
- `_meta.md` carries the milestone intent lines and two optional
  dialect keys: `milestones: key=Title, …` renames or re-orders the
  three groups, and `flags: a, b` extends the known flag list, which
  is otherwise sign-off, spike, detail, maintainer, security and
  blocked. A record naming a milestone outside that set is an error,
  never a silent drop. `_meta.md` itself is optional; without it the
  three default milestones apply.
- The rest of memory is four files, all budgeted: `project/brief.md`
  (what is being built, for whom, what is out — the identity
  document), `project/trajectory.md` (one line per shipped item),
  `project/decision-log.md` (append-only, newest first) and
  `project/wish-list.md` (unscoped ideas, triaged not hoarded).
- The backlog view is GENERATED: `node tools/gen-backlog.mjs`
  renders `project/backlog.md` between markers. Edit records,
  regenerate; never hand-edit between markers. On any view merge
  conflict: regenerate from the merged records — never hand-merge.
- Ship = delete the record, regenerate (update `_meta.md` intent
  lines if a milestone emptied or changed meaning), then append one
  trajectory line `- ID — outcome (YYYY-MM-DD) — see decision-log`
  and prepend one decision entry `## YYYY-MM-DD — ID: title`
  (Decision and Rationale lines; 600-word entry guard, shorter is
  better). Re-run the validator after the memory writes — it must
  be green at commit time, not merely before the writes.
- Commit every touched file per close: title `ID: summary`, one
  what/why line, one `Verify:` line with the gate result. Push when
  a remote is already configured; never add or change a remote.
- Cutting is disposal, not a state to keep: mark `status: cut` only
  long enough to decide, then delete the record and regenerate, with
  one trajectory line saying it was cut and why. A cut record left in
  place still renders, and still counts against the Active budget.
- Pruned decision-log entries move verbatim to `project/archive/`,
  created on first prune. Records are deleted rather than archived —
  the trajectory line and the decision entry carry them forward, and
  git holds the rest.
- A `sign-off` flag on a record is a human gate: park the item for
  the maintainer; never self-approve.

## Operation (stream-first)

Work items back-to-back in one context. Between items run
`node tools/janitor-read.mjs` and read the report it writes
(`latest.md` under the project reports directory; fresh = under
~24 h with its Start SHA in branch history) instead of any
re-reading ritual; stale or absent → run the validator
directly. Per item: implement → gate green → memory writes → validator green
(`node tools/check-memory.mjs` for the form of memory, `node
tools/gen-backlog.mjs --check` for view-versus-records drift — neither
catches the other's faults) → commit. Janitor reports are
generated output: gitignored, never hand-edited, never committed —
freshness is a filesystem contract, and a per-session generated file
in git only manufactures conflicts on the parallel branches below.
A budget WARN is an input, not noise: see `curricula.md` → Upkeep.
Stream start = the between-items protocol
(fresh report or direct validator run); there is no other ritual. Parallel
work: one branch per session; records make item writes disjoint;
shared-append files (decision-log, trajectory) are the residue —
union carefully at integration and let review check the seams.
Crashed sessions never block anyone: verify a dead session's
in-flight work (gate + validator), then fold it in with provenance
stated.

## Budgets (machine-readable)

The validator reads a machine-readable budget block from the first
available source: a memory-policy.md file in the project directory,
then `pm_skills/memory-policy.md`, then this block. A project-owned
policy therefore overrides an inherited framework baseline without
editing comparison or distribution material. The selected source
must contain the validator's complete non-negative integer shape;
malformed or incomplete higher-priority policy fails closed instead
of silently falling through or disabling a guard.

```json
{
  "$comment": "Canonical budgets for pm-next v0.2. Words unless stated.",
  "referenceDocSoftWords": 3500,
  "backlogActive": { "softWords": 1500, "maxOpenItems": 40 },
  "trajectoryWords": 2000,
  "decisionLog": { "maxLiveEntries": 20, "entryGuardWords": 600, "maxOldestDays": 90, "liveFloorEntries": 10, "minEntriesBeyondFloor": 5 },
  "wishListMaxOpen": 25,
  "ticketSoftWords": 600,
  "standingItemWarnDays": 30
}
```

Pruning keeps roughly the newest 70% of the live entry budget and
never drops below `liveFloorEntries`; that ratio is judgement, so it
lives here in prose rather than as a key nothing reads.

## What pm-next deliberately dropped (the deletion ledger)

Lite closes and Reconcile (streams make full closes cheap enough to
always do); the file map (oriented agents navigate; revisit at
scale); doc-deltas (project-specific; add back where protected docs
exist); the mode system (one stream mode with conservative
defaults; `sign-off` flags are the human gates). Everything else
sensible is your judgement — see `curricula.md` when a task is
complex enough to deserve staged thinking.

<!-- FILE: curricula.md -->

# Curricula — staged thinking for non-trivial work (optional read)

<!-- pm-next v0.2. Read when an item is complex enough to deserve
     staged thinking: multiple files, a real design choice, or a
     sign-off flag. Trivial items skip straight to implement. -->

## Scope (before building)

State: the problem, the affected areas, the smallest useful scope,
what is explicitly out, and the target files. Search before
concluding; cite what you find. Park out-of-scope ideas to the
wish-list, one line each.

## Options (when a real choice exists)

Two or three ways, each with fit, risk, and trade-offs; recommend
one. Where options differ on an empirically checkable claim costing
minutes to check, check it in scratch first and present measured
comparisons, not argued ones.

## Validate (before implementing anything risky)

Name the regression surface, the acceptance criteria, and anything
irreversible. A blocking concern narrows scope rather than pushing
through.

## Review (after autonomous or parallel work)

Read-only: map changes to intent, check scope adherence and the
hard rules, verify memory hygiene, look for seam damage at merges.
Verdict: accept / accept with follow-ups / needs changes, with a
punch list. Review proposes; fixes run as their own items.

## Upkeep (when the validator warns)

Budgets propose; they never block. A WARN is the signal that memory
now costs more to read than it is worth. The four below are the ones
that actually recur; anything else the validator warns about is read
the same way — fix the cause, not the number.

- **Decision log over its live-entry or age budget** — prune: move
  the oldest entries verbatim to `project/archive/`, leaving the
  live file at roughly 70% of the entry budget and never below the
  floor `liveFloorEntries` sets.
  Archive, never delete; an index line says what moved and when.
  (Shipped records are the opposite case and are deleted, because
  the trajectory line and the decision entry carry them forward. A
  log entry has no such carrier, so it moves rather than goes.)
- **Backlog Active over words or open items** — too much is
  committed, not too much is written. Cut what is dead (and delete
  the record — a cut row still renders and still counts), park what
  is merely wanted to the wish-list, and let the rest wait in Icebox
  with a trigger rather than a hope. Trimming summaries relieves the
  word half; only removal relieves the item half.
- **Items standing past the age warning** — re-judge rather than
  re-order. Per item: does its blocked reason still hold and has its
  trigger fired; are its grades still true against what has shipped
  since; is its intent dead. Refresh the wording with a current
  date, or cut it with a reason. Age informs the judgement; it is
  never itself the reason to promote something.
- **Trajectory or a reference document over budget** — compress on
  ship, not in bulk: outcomes belong in one line each, the why in
  the decision log, the detail in neither.

Two rules hold across all four. Propose before writing when the
maintainer is present, and say plainly when nothing needs doing — a
quiet no-op is the common case and a good result. Never let upkeep
edit the generated view: it is records in, view out, always.

## Bugs

Reproduce, then diagnose to a root cause with cited evidence,
then fix minimally upstream. Competing hypotheses get stated with
the evidence that would separate them.

<!-- FILE: README.md -->

# Vinyl sorter

Catalogue a classical vinyl collection, verify each record against
Discogs and MusicBrainz, and turn overlapping copies into a finite
queue of listening decisions.

**Live:** <https://vinyl-sorter.joe-2d2.workers.dev>
— a hub at `/`, capture at `/capture`, the review queue at `/review`,
the collection at `/browse`, settings at `/settings`. The Worker serves
all five, so the API is same-origin.

The app's manifest starts at `/capture`, not at the hub: a phone with
the app on its home screen opens straight into the camera, and the menu
is for the desk. Nothing goes between the shutter and Queue it.

The app was called Deep Groove until 2026-08-30, and the URL followed
on 2026-08-31. The D1 database, the R2 bucket and the phone's offline
store still carry the old name on purpose: they are identities rather
than labels, none is visible in the app, and renaming them would mean a
real migration — bindings reference a UUID and a bucket, so the data
never moved when the Worker did. What the rename did cost was the
origin, and it was paid once: every phone re-added its home-screen
icon and re-typed its name, because localStorage, cookies and the
IndexedDB capture queue are all scoped to the hostname.
`wrangler.toml` and `src/queue.ts` say so at the point it matters.

`project/brief.md` is the identity document; `AGENTS.md` is the working
contract; `project/backlog.md` is generated — edit `project/records/`
and run `node tools/gen-backlog.mjs`.

## Run it locally

No Cloudflare account is needed. D1 is SQLite, so the real Worker runs
against `node:sqlite` and the real client talks to it.

```bash
npm install
npm run api     # the real Worker on :8787, in-memory D1
npm run dev     # the capture app on :5173, proxying /api
```

```bash
npm run gate    # tsc --noEmit + the whole test suite
```

Five screens (Cloudflare drops the `.html`; Vite's dev server does not,
so links are written the long way):

| | |
| --- | --- |
| `/` | the hub — four destinations and the counts behind them |
| `/capture.html` | photograph a disc and queue it; always dark |
| `/review.html` | resolve what the matcher could not settle |
| `/browse.html` | the collection, with columns, sorts and saved views |
| `/settings.html` | theme, density, matching, and an export |

`npm run api -- --demo` seeds a few review items so the queue has work
in it, and `DG_EDIT_TOKEN=anything npm run api -- --demo` also turns on
the edit and settings routes locally.

Press <kbd>?</kbd> on any screen for the keyboard shortcuts; `g` then a
letter goes — `h` home, `a` add, `r` resolve, `c` collection, `s`
settings.

The collection screen keeps its whole view in the URL — filters, sort,
columns — so a view can be bookmarked or sent. `?view=mop-up` lists the
discs that were photographed, read, and still have no confirmed
release, which is the crate to re-shoot.

### Walking a crate

One disc at a time, photographed as many times as it needs. The
crate-in-one-pass mode was withdrawn on 2026-08-31: it wrote one row per
photograph, and more than one photograph is always wanted — label,
sleeve, runout — so a crate walked that way manufactured three discs
where one stood.

**Photograph the disc label, not only the sleeve.** Ruled on 2026-08-31,
after the second crate — items 467-483 — came back sleeve-only. The
sleeve is where the decoys are: a mono and a stereo catalogue number
printed as a pair, an LP number beside a tape number, an export number
beside the domestic one, and adverts carrying the catalogue number of a
different record entirely. Only the disc says which of them is in your
hand. Those seventeen rows stay as they were shot — the discs have been
handled once already — and any the reading cannot positively identify is
mopped up with a disc photograph then, not now.

Type your first name once on a device and it goes on every row captured
there; tap it in the header to hand the phone over.

Capture opens a live camera that takes the whole screen: one tap per
photograph, no "Use Photo" to confirm, and the viewfinder never closes.
In landscape the controls sit on the right-hand edge, where they cost
width rather than the height a phone has little of. **Next disc** files
the disc in hand and keeps the viewfinder open — so a crate is N shutter
taps plus one per disc, and the camera never restarts; a mis-tap is
recallable for five seconds from the toast. **Done** ends the viewfinder
for the form, **Queue it** files from there. The torch button is always offered and tried on the first tap, rather
than gated on a capability report that under-reports on some browsers.
Where the browser refuses — Safari on iOS does — it hides itself and
says what does work: the system torch from Control Centre stays lit
while the camera runs.

The phone's own camera is still one tap away underneath, because a
video frame has no HDR or multi-frame stacking and a catalogue number
printed small may need the better sensor.

Capture asks nothing about a photograph. `Queue it` ends the record. Every
one is stored as kind `other`, meaning "a photograph of this item, not
described", because there is no consistency to describe and any other
value would be an invented fact. Order is kept in the key, since order
is the one thing actually known.

Photos are downscaled to 1568 px before they are queued, so a crate of
twenty is ~16 MB in IndexedDB rather than ~80 MB. And a photo the
server refuses no longer blocks the crate behind it: the drain stops
for a shared failure (offline, 5xx) and moves on past one that is only
about that row (4xx).

## Browse and correct the collection

`/browse` lists every row with its catalogue number, label, crate, match
state and photograph count, filterable by state, by whether a photograph
exists, and by free text. Opening one shows every field with **where the
value came from** and whether a person has confirmed it — read at the
shelf, from Discogs, read off a photograph, legacy import, guess, or
nothing recorded at all — plus the match history behind the row: each
run, the candidates it weighed and the verdict if there is one.

Editing is behind a shared passphrase. Click a value to correct it in
place, tick it to confirm it unchanged, or promote a reading taken off a
photograph into the field it belongs to. Every write lands as a
confirmed `shelf` value with a name on it, and none of it makes anything
decision-eligible — only the review queue can confirm a release.

Photographs are listed by key rather than shown: serving one needs a
Worker route a sign-in-free v1 deliberately does not have. Use
`tools/photos-pull.mjs` to fetch them to a desk.

## Re-verify the existing matches

Audits every row that already claims a Discogs release, asking whether
the evidence actually supports the claim. Releases are cached, so a
second run costs no API calls.

```bash
node tools/reverify.mjs
```

It scores **only values a person supplied**, judged by recorded
provenance. That matters more than it sounds: on the 277 enriched rows
the `label` column came from Discogs, so letting it corroborate a
Discogs match compares Discogs with itself. A first run did exactly
that and reported 1 unsupported out of 277 — a measurement of nothing.

"Unsupported" means *not corroborated by independent human evidence*,
which is not the same as *wrong*. Those rows go to the review queue,
where a person decides.

## Rebuild the M0 dataset

Reads the frozen archive, writes `data/`. The archive is read-only for
the life of the project and is never modified.

```bash
node tools/freeze-archive.mjs --check && node tools/build-report.mjs
```

## Read the labels from photographs — SPIKE-PHOTO-TO-FIELDS

Capture already stores a photo of every label and reads nothing from
it. This packs those photos for a chat window, imports the reply, and
scores it against what a person typed off the same records.

**No API key, by your decision on 2026-08-30.** The reading happens in
a chat you are already paying for, so nothing metered sits behind the
Cloudflare Free plan and OPS-SPEND-GUARD's wall still holds.

```bash
node tools/photo-pack.mjs
```

That writes each pack twice — a directory `data/photo-packs/pack-NN/`
and a `pack-NN.zip` beside it — batched to 10 images, which is under
every chat client's per-message cap. Both hold the images named after
their row ids, a `READ-THIS-FIRST.md`, a `PROMPT.txt` and a manifest.

**The cheap path is the directory, and it involves no upload at all.**
Point a session on this machine at it:

> Read `data/photo-packs/pack-01/READ-THIS-FIRST.md` and do what it says.

That file carries the task, the ids and the destination, so there is
nothing to paste beside it.

**Photograph, read, and only then type what the label says.** A reader
with repository access can open `ground-truth.csv` whatever the prompt
asks, so the order is the guard rather than the promise: the import
records whether an answer already existed for each row, and the scorer
holds those rows out of the bar and names them. Looking it up cannot
produce a pass — only a wasted photograph.

The zip is the browser fallback: unzip it, drag the images in, paste
`PROMPT.txt`. Uploading the zip whole does not work on claude.ai, which
never passes a zip's contents to the vision path. Either way, then:

```bash
node tools/photo-import.mjs data/photo-packs/reply-01.txt
```

If the reading says photographs arrived turned, stand them up and read
those rows again rather than re-photographing — the disc has been
handled once already:

```bash
node tools/photo-rotate.mjs
```

It applies the `rotate_cw` degrees the reading reported, and is
idempotent by ledger rather than by inspection: a corrected photograph
is indistinguishable from one that was always upright, so nothing else
could stop a second run turning it twice.

```bash
node tools/photo-score.mjs
```

Every row carries its own `row_id`, and the importer refuses an id it
did not send. That is the whole point of the ids: twenty images up and
eighteen objects back would otherwise attribute every row after the gap
to its neighbour — nineteen plausible readings, all shifted by one, and
indistinguishable from good data.

The scorer keeps **refused** and **wrong** apart rather than averaging
them. A blank costs a re-read of a photo you already have; a confident
wrong catalogue number is the 9% error M0 measured, arriving by a new
route. A run reporting a decoy number — matrix, stamper, side — as the
catalogue number fails on one occurrence.

Neither tool touches the database, and a test asserts they cannot: a
spike measures, and promoting a reading into the store is the decision
the measurement exists to inform.

It needs ~20 photographed labels first — `data/label-photos/README.md`.

### Getting the photos off the phone

Photograph a crate through the app, then pull them down. No renaming:
each file is named after its item id, which is what ties a reading back
to a record.

```bash
node tools/photos-pull.mjs --limit 20
```

That reads `(item_id, r2_key)` pairs from D1, fetches each object by
name, and writes `data/label-photos/` plus a `ground-truth.csv`
pre-filled from the values you typed into capture — leaving only
`decoy_numbers` to add by hand. It is read-only against production, and
a test asserts it: no write verb, and `get` as the only R2 verb. It
never enumerates the bucket, so no photo-reading route was added to the
Worker, which is what keeps a sign-in-free v1 safe.

**It returns nothing until R2 is switched on.** `[[r2_buckets]]` is
commented out because a binding to a bucket that cannot exist fails the
deploy, so photo uploads currently return 503 and the app keeps them
queued on the phone for ever. Enable R2 once at
<https://dash.cloudflare.com> → R2, then re-run `bash tools/deploy.sh`
— it attaches the binding itself.

## Deploying — needs your Cloudflare account

Everything that can be automated is. Two commands are yours because
they need your login and your credential; the rest is one script.

```bash
npx wrangler login
```

```bash
bash tools/deploy.sh
```

That creates the D1 database, the R2 bucket and the KV namespace,
writes their ids into `wrangler.toml`, applies both migrations, loads
the dataset, deploys the Worker and publishes the client. It is
idempotent — if it fails halfway, run it again.

Then the one step I will not automate, because storing a credential is
yours to do:

```bash
npx wrangler secret put DISCOGS_TOKEN
npx wrangler secret put EDIT_TOKEN     # the browse-screen passphrase
```

The Discogs token is in `Pre August 2026/Windsurf Projects/`. Until it
is set, the cron matcher logs a warning and does nothing; everything
else works. `EDIT_TOKEN` is a passphrase you choose: until it is set the
edit routes answer 503, because an unset secret must never read as an
unlocked door. Capture and photo upload stay open either way — an
offline queue in a loft must not acquire a way to fail.

**Already verified locally, so it should not surprise you:** the Worker
bundles at 95 KiB with all three bindings resolving, both migrations
apply through wrangler's own D1 (18 tables, 4 views), and the seed
loads into it — 267 releases, 4,681 provenance rows, 0 decision
eligible. What is untested is only what needs a real account.

## Discogs pacing

Discogs enforces a lower rate than it publishes, and cares how bursty
the traffic is. The limiter therefore spaces requests **at least 2 s
apart** as well as capping them at 30/min — a per-minute budget alone
is spent as an instant burst, which is what a Worker does and what a
laptop hides, because the round-trip paces the calls for you.

The cron matcher works with that pacing, though 7 of 12 queries still
failed on its first live row; tuning is `M2-DISCOGS-PACING`. To match a
batch from here instead, which is faster and currently more reliable:

```bash
node tools/match-run.mjs
```

Resumable — only rows with no `match_run` are selected.

## How no-sign-in stays safe now the matcher exists

v1 has **no sign-in**, by your decision on 2026-08-30. M2 gives the
Worker a live Discogs token and an upstream to call, so the M1
guarantee — no outbound request exists — no longer holds. What replaces
it is stricter about what matters:

- **The matcher runs from a cron trigger, not a route.** There is no
  HTTP entry point to it, so no visitor can make it run or aim a query.
  The query set is a pure function of stored capture values.
- **Nothing served over HTTP can reach Discogs or the token.** A test
  extracts the whole `createApp()` body and asserts it mentions neither
  the token, the client, nor the batch runner.
- **Every upstream call goes through one rate-limited client**, and a
  test asserts that exactly one file in `worker/` makes an outbound
  request.

Deploy to the Pages subdomain rather than a guessable custom domain.

