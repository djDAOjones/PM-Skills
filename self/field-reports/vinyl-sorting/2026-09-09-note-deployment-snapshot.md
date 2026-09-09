<!-- field-report: project=vinyl-sorting · date=2026-09-09 · type=note
     · pm-skills=pm-next-v0.2 (lab/next of djDAOjones/PM-Skills-lab at 530637a, vendored 2026-08-30; no canon release governs it)
     · source=harvested from the maintainer's checkout, the Claude Code and Codex session logs, and the lab checkout by Claude Code
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note
     · retained=public names Joe and djDAOjones, the public Worker subdomain joe-2d2 and the Discogs account name walter_odington — all already public in the project's committed files -->

# Deployment snapshot — Vinyl Sorting (pm-next v0.2)

The orientation file for this project's directory. Everything below
is an observed fact recorded at harvest time; nothing here is an
evaluation. Analysis that reads these reports belongs in
`self/evaluations/`, per this tier's README. The final section lists
what this evidence can and cannot support, so an analysis does not
have to rediscover it.

**This is the first real-project run of pm-next**, the lab's
successor prototype, and therefore the first evidence in this tier
that is not about canon pm-skills. The project's own GitHub
description says so in as many words: "Running pm-next v0.2 as a
real-world test." The lab acknowledged the stream on 2026-09-08
(`lab/project/decision-log.md`, CLEANROOM-AB Amendment 1: "a real
stream (vinyl-sorting, 2026-08-30)") but had not harvested it; the
lab's amendment calls it "a real eight-item stream", which is smaller
than what the git log below shows.

## The project

**Vinyl sorter** (called Deep Groove until 2026-08-30) — a web app
that catalogues a classical vinyl collection from label photographs,
verifies each record against public discographies under a
corroboration rule, and turns overlapping copies into a queue of
listening decisions. Cloudflare Worker plus D1, R2 and KV; a
photo-first offline capture PWA; a review queue; a browse screen. A
household tool for a handful of people, live since 2026-08-31.

Public source: `https://github.com/djDAOjones/vinyl-sorting`. The
product is private by design ("Not public, ever" in its brief); the
repository is public, so its memory, rulebooks and git log are filed
in the tracked lane and only the session logs sit in `local/`.

## Framework deployment

| Fact | Value |
| --- | --- |
| Framework | pm-next v0.2 — one-file `AGENTS.md` contract, optional `curricula.md`, records under `project/records/`, generated `project/backlog.md`, three state tools plus the optional records server |
| Source of the copy | `lab/next/` of the private PM-Skills-lab checkout at lab commit `530637a` (2026-08-30 04:04 +0100, the lab's HEAD at install time) |
| Installed | 2026-08-30, INIT commit `2bc9260` at 10:07 +0100, per `lab/next/README.md` → "Install"; `tools/close-core/` excluded as that README instructs |
| Install method | fresh vendored copy; the records tools, `curricula.md` and `records-server.mjs` are byte-identical to the lab at `530637a` **and** to the lab's HEAD at harvest — nothing in the lab's `lab/next/` changed after the install, because lab development had stopped on 2026-08-29 for exactly this run |
| Contract edits | `AGENTS.md` differs from the lab template by 37 lines: the project name, a dated "sanctioned dependency exception" for the brief's stack (added at the M1 boundary, 2026-08-30), and five project boundaries (read-only archive, machine-never-writes-capture, the provenance rule, no secrets, central rate limits). No framework text was edited |
| Harness | Claude Code (desktop app); model `claude-opus-5` in 12 of 13 sessions, `claude-fable-5-1` in the 2026-09-02 harvest session; Codex (`gpt-5.6-sol`, VS Code extension) as the photo reader in the hand-carried loop |
| Budget policy | none installed; `check-memory` fell back to the inline JSON block in `AGENTS.md`, which the agent's memory records as the intended arrangement for a vendored copy |
| Upgrades since | none possible — the lab shipped nothing to `lab/next/` between the install and this harvest |
| Path mapping | pm-next's own layout at the root; no `pm_skills/` directory is tracked |

### The wrong framework was installed first

The install session's log (session `7bf9721f`, local lane) records
the sequence, all on 2026-08-30 UTC:

- 08:16 — the maintainer asks for "pm-skills-lab version of
  pm-skills … to run a real-world test".
- 08:19 — the agent copies the lab checkout's `pm_skills/`
  directory: canon 4.9.2, 49 files, "verified byte-identical to
  source". The lab's `README.md` says of that tree "Nothing here is
  the product"; the agent read it only after the correction.
- 08:49 — a second, parallel session is asked to "review the
  briefing doc and take me through the pm-skills-labs init process"
  against that 4.9.2 install; it finds the brief blank, holds, and
  writes nothing.
- 08:55 — the maintainer: "no, this has gone wrong … I want
  pm-skills-labs. uninstall completely".
- 08:56–08:58 — the 4.9.2 tree is removed after a byte check, the
  agent finds `lab/next/`, confirms the target, and installs
  pm-next v0.2 per its README.
- 09:00 — the maintainer supplies the project name, "we can be
  flexible" on hard rules, the brief (a claude.ai artifact), and
  asks for a new GitHub repository.
- 09:07 (+0100 10:07) — INIT commit, pushed.

So the successor's name was ambiguous enough that an agent reading
the lab checkout chose the incumbent, and the correction cost about
forty minutes. The prompts are exported verbatim in
`2026-08-30-export-init-prompt.md`.

### A canon tree is back in the working tree

At harvest the working tree holds an **untracked** `pm_skills/`
directory: canon 4.9.2, file mtimes 2026-08-24 17:39 (the lab's
copies), directory mtime 2026-09-01 09:00. The install log records
that directory being removed on 2026-08-30 at 08:56 UTC and the root
"back to exactly its prior state". How it returned is not recorded
anywhere in the project; the timing coincides with a cloud-sync event
that also re-touched several session-log files that morning. It is
not gitignored, so any agent that lists the root sees a full canon
prompt set beside the pm-next contract. Nothing in the git log or the
memory files refers to it.

## History shape

115 commits, 2026-08-30 10:07 to 2026-09-01 23:44 (+0100), one
author: 56 on 08-30, 52 on 08-31, 7 on 09-01. HEAD at harvest is
`60c3c4b` on branch `spike-photo-harness-fixes` (pushed), one commit
ahead of `main` at `d488a39`; a merged agent-worktree branch
(`worktree-agent-acc72224487d08505`, at `38f5bdf`) is still checked
out under `.claude/worktrees/`.

Close discipline, counted from commit messages alone:

| Measure | Count |
| --- | ---: |
| Subjects prefixed with an item ID | 94 of 115 |
| Subjects prefixed `Upkeep:` (the curricula's maintenance section) | 8 |
| Bodies carrying a `Verify:` line | 113 of 115 |
| `Co-Authored-By: Claude Opus 5` trailers | 114 of 115 |
| `Close: lite` trailers | 0 — not part of the pm-next contract |
| Commits touching `project/` | 82 of 115 |
| Commits that regenerated `project/backlog.md` | 67 |
| Commits touching `project/records/` | 67 |
| Commits touching the decision log | 47 |
| Commits touching the trajectory | 42 |
| Records created over the run | 56 |
| Records deleted (shipped or cut) | 37 |

## Memory at the snapshot

At `60c3c4b`: 18 open records (7 Current, 5 Next, 6 Icebox — two
`sign-off`, one `spike`, three `detail`, two `blocked`); 45
trajectory lines; 18 live decision-log entries (45 KB) over a 66 KB
archive file; 14 wish-list entries; a 664-word brief. The decision
log was pruned three times in three days, each time "to its 70%
mark" — 2026-08-30 13:58, 2026-08-30 23:59 and 2026-08-31 12:22 —
which is the archive rotation the tier README asks about.

Validator at harvest (`2026-09-09-validator.md`, run on a clean
archive of HEAD): 0 structural failures, 3 warnings, all three the
same kind — records over the 600-word soft limit (627, 698 and 945
words). `gen-backlog --check`: view matches records. The project's
last janitor report (`2026-09-01-janitor.md`, 2026-08-31 23:59 UTC):
0 failures, 1 warning, 45 items in the trajectory, 1.0 commits per
shipped item.

## Incidents recorded by the project itself

Each of these is in a commit message or in the agent's own memory
(`2026-09-02-export-agent-memory.md`), not inferred.

1. **A racing view generator dropped four backlog entries**
   (`55a7f6d`, 2026-08-31). Two sessions shared one working tree;
   one committed a `backlog.md` generated seconds before the other's
   commit landed, and three records plus one status vanished from
   the view. No record file was touched; regenerating was the whole
   fix, "per the merge rule".
2. **A careless `git add -A` committed an agent worktree as a
   gitlink** (`2dd08c7`, 2026-08-31) — an accidental submodule
   pointing at a transient isolation directory. Removed from the
   index and gitignored.
3. **A session staged another session's half-written data file**
   (`ef18de5`, per the agent's memory): the content was right, the
   commit message's explanation was not, and nothing flagged it.
4. **The parallel stream merged** (`6917c4b`, 2026-08-31): five
   items from a worktree agent, one conflict in `backlog.md` resolved
   by regeneration as the contract prescribes, and ten tests that
   failed on the branch because the gate reads the gitignored
   `Pre August 2026/` archive — the commit names this "a real
   friction between AGENTS.md's one-branch-per-session and a gate
   that depends on an untracked path".
5. **The wrong install** (above).
6. **A harvest that could not file itself** (session `66ee0a44`,
   2026-09-02): asked to "extract what you can of the chat and
   trajectory and file away", the session built the whole export in
   its scratch directory and then found that the harness blocks a
   consuming-project session from writing into this repository. The
   agent's memory records the blocked path; the staged output did not
   survive to this harvest, which rebuilt it from source.

Also counted from the session logs: 14 `AskUserQuestion` calls
across the run (the steering the maintainer's front-loaded-questions
agreement was meant to minimise), and 6 API errors (authentication
expiry), none of which lost work that the commits show.

## Cost of the run

From the `usage` fields of every assistant message in the 13 Claude
Code sessions:

| Sessions | API calls | Cache-read tokens | Cache-write tokens | Output tokens |
| ---: | ---: | ---: | ---: | ---: |
| 13 | 4,256 | 1,426,292,811 | 17,031,921 | 5,207,839 |

One session (`9511fb3c`, 50 maintainer turns over two days) accounts
for 679 million of the cache-read tokens. The Codex photo-reading
rollouts are a separate, unmetered-by-API cost the maintainer chose
deliberately (the "no metered services" ruling in the decision log).

## Where the evidence sits

- `2026-08-30-export-init-prompt.md` — the maintainer's five
  prompts, verbatim, and the brief and milestone intents as first
  committed.
- `2026-09-01-export-memory.md` — every file under `project/` at
  HEAD with a byte inventory.
- `2026-09-01-export-rulebooks.md` — `AGENTS.md`, `curricula.md`,
  `README.md` at HEAD.
- `2026-09-01-export-git-log.md` — the full name-only log.
- `2026-09-01-janitor.md` — the last janitor report the project
  wrote.
- `2026-09-02-export-agent-memory.md` — the coding agent's own
  notes across sessions: its working agreement, standing answers,
  pitfalls, and where it believed the framework came from.
- `2026-09-09-validator.md` — both checks at harvest.
- `local/2026-09-09-sessions.tar.gz` + manifest — 13 Claude Code
  sessions with their sub-agent and tool-result directories and the
  agent memory, plus 21 Codex rollouts from the run window (the
  photo-reading threads, and Codex Desktop's imported mirrors of five
  Claude sessions). Codex rollouts in this directory after 2026-09-02
  are unrelated personal documents and were excluded.

## What this evidence can and cannot support

- It is the **treatment arm** the lab's R2 gate has been waiting for
  since 2026-08-17: a real, multi-item stream on pm-next, by the
  framework's maintainer, on the frontier tier. It is not a
  controlled comparison; the same maintainer ran canon 4.9.2 on the
  UoN Video Helper a week earlier with a near-identical opening
  prompt, and `ebay-tool` (this tier) ran pm-next on the same day
  under Codex with the identical automated-stream prompt, so paired
  readings are possible but every population caveat from field study
  two applies.
- The canon observables carried in `self/project/wish-list.md`
  (`LITE-CLOSE-WATCH`, `REVIEW-SILENCE-WATCH`) are **not tested** by
  this project: `Close: lite` and `prompts/review.md` do not exist in
  the pm-next contract, so their zero counts here are by
  construction, not silence.
- The records design was exercised hard: 56 records created, 37
  deleted, the view regenerated 67 times, three decision-log prunes,
  one generator race, one worktree merge with a view conflict, and
  three records over the soft word limit at the end. What it did to
  the maintainer's reading cost is not in this evidence; the session
  logs hold it.
