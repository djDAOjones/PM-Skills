<!-- field-report: project=vinyl-sorting · date=2026-08-30 · type=export
     · pm-skills=pm-next-v0.2 (lab/next of djDAOjones/PM-Skills-lab at 530637a, vendored 2026-08-30; no canon release governs it)
     · source=the maintainer's own prompts from the harness session logs (local lane), plus the brief and milestone intents as committed at the install commit 2bc9260bdd9aead8fb71f8696f0d972e52096069
     · redaction=0 checkout path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=public names Joe and djDAOjones, the public Worker subdomain joe-2d2 and the Discogs account name walter_odington retained where present — every one already public in the project's committed files; no unpublished identity was intentionally added -->

# Install and init prompts, and the brief as first committed

Install commit: `2bc9260bdd9aead8fb71f8696f0d972e52096069`. The prompts are the actual input to the stand-up, preserved from the session logs rather than reconstructed; the brief and `_meta.md` are what the agent committed from them.

## The maintainer's prompts, verbatim

Taken from the Claude Code session logs (local lane). Timestamps are
UTC. The three prompts of session `7bf9721f` are the install; the one
prompt of session `46ce3c9c` was issued between the wrong install and
its correction; the first prompt of session `43bf9e82` opened the
automated stream that produced every item after INIT.

### 2026-08-30T08:16:07Z — session 7bf9721f, first prompt

> I want to use pm-skills-lab version of pm-skills in this project to
> run a real-world test. please copy it over. if there is an old
> version of pm-skills, remove

### 2026-08-30T08:49:42Z — session 46ce3c9c, only prompt

> review the briefing doc and take me through the pm-skills-labs init
> process

### 2026-08-30T08:55:57Z — session 7bf9721f, second prompt

> no, this has gone wrong. dont install pm-skills from the lab fork. I
> want pm-skills-labs. uninstall completely

### 2026-08-30T09:00:51Z — session 7bf9721f, third prompt

> 1. project name: Vinyl Sorting
> 2. we can be flexible
> 3. please initiate the pm-skills-labs process based on the brief
>    at: https://claude.ai/code/artifact/f1939d24-b221-4ed9-8948-8b193bd64e35
> 4. please make a new git repo for this in my account

### 2026-08-30T10:10:52Z — session 43bf9e82, first prompt

> alrighty, lets move through development in automated fashion. let
> me know maintainer inputs in advance if possible, but ask during if
> needed.

## Files at the install commit

<!-- FILE: project/brief.md -->

# Project Brief — Vinyl Sorting

<!-- What, for whom, out of scope. Identity document: import into the rules position where supported. -->

**Product name:** Deep Groove. Full development brief (v1, classical,
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
photos, Access for email sign-in.

A Worker is not optional: the Discogs API sends no CORS headers, and a
static site cannot hold a secret.

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

<!-- FILE: project/records/_meta.md -->

---
current-intent: M0 — reconcile the existing spreadsheets into one clean, provenance-tagged dataset. No app required; can start now.
next-intent: M1 — schema, Worker skeleton and the offline capture screen, so a disc can be captured in a loft with no signal. Plus the open questions that gate it.
icebox-intent: M2–M5 — verify, resolve works, cluster and decide. Committed and sequenced behind capture; trigger is the milestone before it going green.
---
# Backlog view meta (records mode)

