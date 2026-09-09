<!-- field-report: project=vinyl-sorting · date=2026-09-02 · type=export
     · pm-skills=pm-next-v0.2 (lab/next of djDAOjones/PM-Skills-lab at 530637a, vendored 2026-08-30; no canon release governs it)
     · source=Claude Code's auto-memory directory for this project (~/.claude/projects/<project>/memory/), the agent's own operating notes written during the run; copied 2026-09-09
     · redaction=0 checkout path occurrence(s), 0 scratch path occurrence(s) and 3 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=public names Joe and djDAOjones, the public Worker subdomain joe-2d2 and the Discogs account name walter_odington retained where present — every one already public in the project's committed files; no unpublished identity was intentionally added -->

# Agent-memory export

These are not the project's memory files. They are the notes the coding agent kept for itself across sessions, outside the repository — its working agreement with the maintainer, the standing answers it was given, the pitfalls it recorded, and where it believed the framework came from. They are evidence of how the framework was operated rather than what it prescribed. Dated by the newest file.

<!-- FILE: memory/MEMORY.md -->

# Memory index

- [Automated stream working agreement](automated-stream-working-agreement.md) — front-load maintainer questions, then run uninterrupted to a real gate.
- [Deep Groove run defaults](deep-groove-run-defaults.md) — push per close, commit derived data to data/, no API keys or metered services.
- [Deep Groove local verification](deep-groove-local-verification.md) — wrangler is logged in and deploying is routine; three traps make a broken thing look fine.
- [Deep Groove Discogs pitfalls](deep-groove-discogs-pitfalls.md) — swallowed rate limits look like "nothing found"; never verify Discogs with Discogs.
- [pm-next framework source](pm-next-framework-source.md) — the AGENTS.md/tools contract is vendored from PM-Skills-lab, one-way.
- [Shared working tree hazard](vinyl-shared-worktree-hazard.md) — parallel sessions share one tree; the generated backlog view races.
- [Field-report harvest](field-report-harvest.md) — chat/trajectory evidence is filed in the public PM-Skills checkout under 4_Work, not the lab; generator script sits beside it.

<!-- FILE: memory/automated-stream-working-agreement.md -->

---
name: automated-stream-working-agreement
description: How Joe wants automated pm-next development runs on Deep Groove — front-load the maintainer questions, then run items back-to-back without checking in.
metadata:
  type: feedback
---

When Joe asks to "move through development in automated fashion", he wants
the maintainer inputs identified and asked **before** the run starts, in one
batch, then the stream executed item-to-item without further check-ins until
a genuine gate is reached.

**Why:** he said it explicitly — "let me know maintainer inputs in advance if
possible, but ask during if needed". Stopping mid-stream for a decision that
could have been anticipated wastes the point of an automated run.

**How to apply:** read the records first, do enough data investigation to
know which choices are real, then batch them into one AskUserQuestion. Take
routine judgement calls yourself and state them. Stop only at `sign-off`
flags and milestone promotion, which are human gates by contract. See
[[deep-groove-run-defaults]].

<!-- FILE: memory/deep-groove-discogs-pitfalls.md -->

---
name: deep-groove-discogs-pitfalls
description: Two ways the Deep Groove matcher lies quietly — swallowed rate limits reported as "nothing found", and circular verification using Discogs-sourced fields.
metadata:
  type: project
---

Both of these produced confident, wrong, plausible-looking numbers on
2026-08-30. Check for them whenever matcher output looks surprising.

**A large no-match count is a bug until proven otherwise.** A 60-row
live run reported 53 "nothing found". None of them were: the run had
exhausted Discogs' rate limit, every query threw, and the errors were
swallowed. After fixing it the same sample gave 4 verified, 36 needing
review, 20 genuinely not found. `match_run.state = 'error'` now exists
for exactly this and must be re-queued, never read as a negative.

**Never let a Discogs-sourced field corroborate a Discogs match.** On
the 305 enriched rows the `label` column came FROM Discogs, so scoring
a claimed release against it compares Discogs with itself. The first
audit did that and reported 1 unsupported of 277. Filtered to `legacy`
and `shelf` provenance it reports 12. `tools/reverify.mjs` exports
`humanFieldsOnly` for this; there is a regression test.

**Discogs needs SPACING, not just a budget.** It enforces a lower rate
than the published 60/min and cares about burstiness. A per-minute
counter alone is spent as an instant burst — a Worker fires a dozen
requests in a few hundred milliseconds and gets 429s, while a laptop
looks fine because the round-trip paces it. Joe established ~1 request
per 2 seconds in the earlier Windsurf CLI work; that figure held.

When the Worker was throttled and the same token returned 200 from the
laptop, I wrongly concluded Discogs was blocking Cloudflare's shared
egress IPs and that it was unfixable. Joe corrected it. Both effects
are real — the shared IP does make Discogs stricter — but the dominant
cause was the missing spacing, and it was mine. **Suspect our own
pacing before blaming the platform.**

**Calibration**, post-fix: ~4.7 Discogs queries per row, ~50/min shared.
Backlog rows mostly cannot auto-verify because label is captured on 0%
of them — a catalogue number alone is one family, and the gate needs
two. That is correct, not a deficiency: those rows want capture.

See [[deep-groove-local-verification]].

<!-- FILE: memory/deep-groove-local-verification.md -->

---
name: deep-groove-local-verification
description: "How Deep Groove is verified and deployed — wrangler IS logged in now, D1 is SQLite locally, and three traps make a broken thing look fine."
metadata: 
  node_type: memory
  type: project
  originSessionId: 9511fb3c-9249-4dc1-9b4e-0d40c7ce1c6d
  modified: 2026-08-31T20:36:05.461Z
---

**Wrangler is logged in and deploying is routine.** This corrects the
earlier note that said otherwise: as of 2026-08-31 `bash tools/deploy.sh`
runs end to end from this machine — it builds, applies pending migrations
and deploys.

**The URL moved on 2026-09-01: `vinyl-sorter.joe-2d2.workers.dev`.**
`deep-groove` is deleted and 404s. The D1 database, the R2 bucket and
the KV namespace still carry the old NAME and that is correct — they
are bound by UUID and by bucket name, so renaming the Worker moved no
data at all. `wrangler.toml` used to claim it would; that was wrong.
`DISCOGS_TOKEN` is set on the new script; `EDIT_TOKEN` is the
maintainer's to set and until then every write route answers 503.

Everything is also verifiable locally, and should be first:

- D1 **is** SQLite, so `schema/*.sql` and the loader run against Node's
  built-in `node:sqlite` — no emulator.
- `node tools/dev-api.mjs` (`npm run api`) serves the **real** Worker over
  binding stubs in `tools/test/helpers/bindings.mjs`.
- `npm run gate` = `tsc --noEmit` + the whole suite.

Node 24 runs the TypeScript directly via type stripping, which is why the
`.mjs` tests import `worker/*.ts`. That is also why `tsconfig.json` sets
`erasableSyntaxOnly` — constructor parameter properties and enums will not
run.

## Three traps that make a broken thing look fine

All three cost real time on 2026-08-31.

- **`dev-api.mjs` imports the Worker at boot and never hot-reloads.**
  After any `worker/` change it serves stale code, and captures fail with
  a confusing 400 that looks like a validation bug. Restart it.
- **The browser pane reports `viewportH: 0` while hidden**, so
  `loading="lazy"` images never load and every check reads as broken
  regardless of the server. Resize to a real viewport, or drop lazy.
- **A backtick inside a SQL comment breaks the file, not the query.**
  The Worker builds SQL in template literals, so `-- see \`capture\``
  ends the literal and yields a bare `TS1005: ',' expected` pointing at
  a line that looks fine. It cost three builds on 2026-09-01. Write SQL
  comments with no backticks.
- **Test doubles can lie.** `makeR2` recorded a byte *count* and returned
  no `body`, so a photo route serving nothing passed every local test.
  Found only by fetching through the real Worker. When a test double
  stands in for something that carries data, check it carries the data.

- **A first remote D1 call can 7403 and then work.** On 2026-09-01
  `photos-pull.mjs --dry-run` died on
  `The given account is not valid or is not authorized` — which reads
  exactly like a logged-out token, and `whoami` does not list an `r2`
  scope, so it reads as two problems. Both were false: the identical
  query succeeded on retry and the pull ran end to end. Retry once
  before concluding anything about auth.

- **`~/Downloads` is unreadable from this environment.** macOS TCC
  returns `EPERM`/`Operation not permitted` to Bash *and* to Read, and
  `dangerouslyDisableSandbox` does not help. When Joe hands over a file,
  ask for it anywhere else — the project directory or `/private/tmp`.
  Cost a round trip on 2026-09-01.

**Verify the request the product actually makes.** A photo gate was
proved with `curl -H`, which is the one caller that could never fail —
an `<img>` cannot send a header, so every image 401'd in the browser.

See [[deep-groove-run-defaults]] and [[deep-groove-discogs-pitfalls]].

**Other sessions work this repo concurrently.** Commits carrying
`Co-Authored-By: Claude Opus 5` that you did not make are normal. Two
sessions sharing one working tree raced the view generator and dropped
four backlog entries (commit `55a7f6d`); AGENTS.md wants one branch per
session, and `Agent(isolation: "worktree")` is how to honour that.

**HEAD is not necessarily what is deployed.** `wrangler deploy` ships the
working tree, so compare the live `Version ID` against `git log` before
concluding the running app contains a given fix.

<!-- FILE: memory/deep-groove-run-defaults.md -->

---
name: deep-groove-run-defaults
description: Standing answers Joe gave for Deep Groove development runs — push cadence, where derived data lives, AI Works source preference.
metadata:
  type: feedback
---

Confirmed by Joe on 2026-08-30, at the start of the M0 stream:

- **Push after each item closes.** The remote `origin` is already configured;
  AGENTS.md's close protocol applies literally. Do not batch pushes to the
  end of a milestone.
- **Derived data is committed**, in `data/` at the repo root — the reconciled
  CSV, the reconciliation report and the archive manifest. It is M1's input,
  so version history is wanted.
- **AI Works: v1 Stage 8 as the base, v2 overriding track listings**, with
  provenance recording which file each value came from. (In the event the two
  agree on all 305 rows, so the override is a no-op.)
- **The brief's stack wins over AGENTS.md's no-new-dependencies rule** — but
  only for the named packages: `hono` at runtime, `typescript`, `vite`,
  `wrangler` and `@cloudflare/workers-types` as dev dependencies. Recorded as
  a dated carve-out in AGENTS.md. Anything else is still a stop-and-ask.
- **No sign-in for v1.** Joe declined Cloudflare Access after being shown it
  needs no password. Do not re-litigate it; the gate to revisit is M2, where a
  caller could first drive a Discogs query against the live token.
- **No API keys, anywhere.** Nothing metered. Where a model has to read
  something, it happens by hand in a chat Joe already pays for — export a zip,
  upload, paste the reply back. Ruled on 2026-08-30 when the photo-to-fields
  spike proposed a vision API; the tool that called one was deleted, not
  parked. This also keeps OPS-SPEND-GUARD closed, since its whole premise is
  that the Cloudflare Free plan is a hard billing wall.

Confirmed by Joe on 2026-09-01, at the start of the interface stream:

- **The URL is `vinyl-sorter.joe-2d2.workers.dev`.** Clean cut, no
  redirect, old Worker deleted. Done.
- **Settings stops at export.** Device settings open, collection
  settings and a JSON/CSV export behind the shared passphrase; token
  entry, database reset and roster editing stay at the command line.
  All three want a sign-in first, which is OPEN-V1-AUTH.
- **AI stays hand-carried.** Joe was offered Cloudflare's free Workers
  AI allocation and a local model and took neither: the loop remains a
  person moving a pack into a chat they already pay for, and the
  investment goes into the loop. There is no supported API behind a
  Claude or ChatGPT subscription, so "use the subscription" was never
  available — say so rather than re-deriving it.
- **Full redesign, not a tidy-up.** New palette, type and identity,
  light and dark. Capture stays dark regardless: dim light and gloves
  are constraints, not a preference.

**Why:** these were answered once so the run would not stop again on them.
Treat them as standing unless Joe says otherwise.

**How to apply:** assume these on any later Deep Groove milestone without
re-asking. See [[automated-stream-working-agreement]].

<!-- FILE: memory/field-report-harvest.md -->

---
name: field-report-harvest
description: "Where Deep Groove's chat/trajectory evidence is filed for pm-skills use-case analysis, and how the harvest is rebuilt."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 66ee0a44-8f39-4a43-bf1d-407d08746a27
  modified: 2026-09-02T21:52:55.211Z
---

Consuming-project evidence for pm-skills lives in the **public PM-Skills
checkout**, not the lab:
`<home>/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-12 pm-skills Framework Repository/self/field-reports/`
(tier README there is canonical; `local/` lanes are gitignored; the
CascadeProjects PM-Skills-lab clone has the tier README but no reports).

Harvest taken 2026-09-02 for `vinyl-sorting` (pm-next v0.2, 13 sessions)
and a re-take for `uon-video-helper` (pm_skills 4.9.2, 11 sessions):

- tracked lane: `<date>-export-{memory,rulebooks,git-log}.md` at HEAD,
  plus `2026-08-30-export-init-prompt.md` for vinyl (brief at INIT).
- local lane: `<session-day>-export-chat-<id8>-<title>.md` per session
  (verbatim prompts, assistant text and thinking; tool calls one-line;
  results clipped; facts table; commits in the session window),
  `-subagents.md` companions, `2026-09-02-sessions.tar.gz` byte-verbatim
  mirror of `~/.claude/projects/<slug>/` (+ `claude-memory/`), manifest
  with SHA-256s, and `2026-09-02-export-session-logs.md` index.

The generator is `build-field-report.mjs` beside the vinyl local lane
(env `OUT_ROOT`, `STAGE`). Claude Code's auto-mode classifier blocks
Bash writes into that checkout from a Vinyl session, so run the script
or the copy from a terminal, or from a session opened in that checkout.

**Why it matters:** the tier README's join key is `pm-skills=`; for
vinyl it is a pm-next string, not a release number, because the
framework is vendored from `lab/next` (see [[pm-next-framework-source]]).

<!-- FILE: memory/pm-next-framework-source.md -->

---
name: pm-next-framework-source
description: "Deep Groove vendors the pm-next v0.2 framework from PM-Skills-lab; the lab's path is not recorded anywhere in the repo."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 9511fb3c-9249-4dc1-9b4e-0d40c7ce1c6d
  modified: 2026-08-31T01:18:47.617Z
---

The AGENTS.md / curricula.md / `tools/{check-memory,gen-backlog,janitor-read,records-server}.mjs`
contract in this project is **pm-next v0.2**, vendored from
`<home>/CascadeProjects/PM-Skills-lab` — specifically its `lab/next/`
line. A worktree also exists at `<home>/pm-worktrees/`.

Nothing in the Vinyl Sorting repo names that path, so it is only
findable by searching the filesystem.

Verified 2026-08-31: all four tools and `curricula.md` byte-identical
to `lab/next/`. `AGENTS.md` is the lab's template with only the project
name and the project-specific hard rules added — no framework text
edited.

It is a **one-way copy**. Lab improvements do not flow here, and this
project's experience does not flow back, unless someone moves it by
hand. Worth re-diffing before assuming the vendored tools are current.

`check-memory.mjs` looks for a budget policy at `project/memory-policy.md`,
then `pm_skills/memory-policy.md`; neither exists here, so it falls back
to the inline JSON block in AGENTS.md. That is the intended arrangement
for a vendored copy, not a misconfiguration.

<!-- FILE: memory/vinyl-shared-worktree-hazard.md -->

---
name: vinyl-shared-worktree-hazard
description: Two Claude sessions often share this repo's single working tree, so the generated backlog view races.
metadata:
  type: project
---

Joe runs parallel Claude sessions against the ONE working tree of the
vinyl-sorting repo (not one branch per session, as AGENTS.md assumes).
Both sessions see the same HEAD, index and untracked files.

The trap, hit on 2026-08-31: `project/backlog.md` is generated from all
of `project/records/`. Generating it, then committing seconds later,
can commit a view that predates another session's just-landed commit —
silently deleting their entries from the backlog. Regenerating is the
whole fix (the view is generated, never hand-merged).

The second variant, hit on 2026-08-31 (commit `ef18de5`): a session
staged `data/` broadly and swept up ANOTHER session's `photos-pull`
output — 90 row-ids lines for records 467-483 — committing it under the
message "row-ids.csv after the 453/466 split re-pull". The content was
correct; the explanation in the log is not, and nothing flags that. So
the rule is not only about generated views: a data file another session
is mid-way through writing looks exactly like your own untracked
output.

**How to apply:** before committing memory files, `git status` to see
whose changes are in the tree, and stage only your own paths. To commit
the view safely, generate it from `git archive HEAD project` plus your
own record files in a temp dir, and re-check HEAD has not moved
immediately before `git commit` — or simply regenerate in place and
commit the whole current view. See [[deep-groove-run-defaults]].
