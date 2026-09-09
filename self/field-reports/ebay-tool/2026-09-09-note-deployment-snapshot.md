<!-- field-report: project=ebay-tool · date=2026-09-09 · type=note
     · pm-skills=pm-next-v0.2 (lab/next of djDAOjones/PM-Skills-lab at 530637a, vendored 2026-08-30; no canon release governs it)
     · source=harvested from the maintainer's checkout, the Codex rollout logs, and the lab checkout by Claude Code
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note; product detail kept to one paragraph because the source repository is private
     · retained=public names Joe and djDAOjones -->

# Deployment snapshot — eBay Tool (pm-next v0.2)

The orientation file for this project's directory, and the only
file of it in the tracked lane: the source repository
(`djDAOjones/ebay-tool`) is **private**, so per the tier README's
lane rule the memory, rulebook, git-log, init-prompt, janitor and
validator exports and the session archive all sit in `local/` on the
maintainer's checkout. Everything below is an observed fact recorded
at harvest time; nothing here is an evaluation.

**This is the second real-project run of pm-next**, started the same
morning as `vinyl-sorting` (this tier) by the same maintainer, on the
same framework bytes, with the same opening prompt for the automated
stream — but under a different harness and model. Neither the lab nor
this repository had a record of it before this harvest.

## The project

A private, local-first comparison table for saved eBay listing
evidence: a static page over a versioned JSON dataset, with
sorting, filtering, hide-and-restore, named shortlists with
immutable history, buyer overrides and a bounded image review. No
backend, no accounts, no runtime dependency, no AI connection — the
assessments are produced in a chat and imported. Built from a
one-paragraph request into a twelve-item stream in a day.

## Framework deployment

| Fact | Value |
| --- | --- |
| Framework | pm-next v0.2 — one-file `AGENTS.md` contract, optional `curricula.md`, records under `project/records/`, generated `project/backlog.md`, the three state tools |
| Source of the copy | `lab/next/` of the private PM-Skills-lab checkout at lab commit `530637a` (the lab's HEAD at install time) |
| Installed | 2026-08-30, INIT commit `4f772b0` at 10:01 +0100 (contract, curricula, blank memory, tools); brief confirmed `e50be30` at 10:05; the delivery stream seeded `9629fdc` at 10:31 with all twelve records at once |
| Install method | fresh vendored copy; `gen-backlog.mjs`, `check-memory.mjs`, `janitor-read.mjs` and `curricula.md` byte-identical to the lab at `530637a` and to the lab's HEAD at harvest; `records-server.mjs` not copied (it is optional) |
| Contract edits | `AGENTS.md` differs from the lab template by 2 lines — the project name only. The hard rules were left at the template's canonical four; none of the brief's own constraints (private, local, no AI connection, no runtime dependency) was written into the contract |
| Harness | Codex — the VS Code extension (`codex_work_desktop`, CLI 0.150.0-alpha.8), model `gpt-5.6-sol` throughout; 113 rollouts: 3 top-level threads, 50 spawned sub-agent threads (depth up to 2), 60 "guardian" auto-review rollouts |
| Budget policy | none installed; the validator used the inline JSON block in `AGENTS.md` |
| Upgrades since | none possible — the lab shipped nothing to `lab/next/` between the install and this harvest |

The install prompt was five words longer than a slug: "install
pm-skills-labs to this project, I will use it for development".
Codex Desktop ran four parallel attempts of it; the first commit
already carries the pm-next layout, so whichever attempt was kept
found `lab/next/` rather than the incumbent tree that the vinyl
install stumbled on the same morning. The rollouts are in the
archive for anyone who wants the path the agent took.

## History shape

15 commits, 2026-08-30 10:01 to 2026-08-31 01:19 (+0100), one
author: 13 on 08-30, 2 on 08-31. HEAD at harvest is `550ece7` on
`main`, pushed. Two INIT commits and one BRIEF commit, then twelve
item commits in the order the seed listed them.

| Measure | Count |
| --- | ---: |
| Subjects prefixed with an item ID | 15 of 15 |
| Bodies carrying a `Verify:` line | 15 of 15 |
| `Co-Authored-By` trailers | 0 |
| Commits touching `project/` | 15 of 15 |
| Commits that regenerated `project/backlog.md` | 14 |
| Records created (all at the seed) | 12 |
| Records deleted, one per item commit | 12 |
| Open records at HEAD | 0 |

Maintainer input over the whole stream: nine prompts in the main
thread, seven of them one to three words ("yes", "absolutely", "go
for it", "yes good"), then "what next?" at 09:32 UTC on 08-31,
answered by a two-minute thread. `_meta.md` at HEAD reads "no item
committed" for all three milestones. The prompts are exported
verbatim in `local/2026-08-30-export-init-prompt.md`.

## Memory at the snapshot

At `550ece7`: 0 open records; 12 trajectory lines; 12 live
decision-log entries (20 KB, never pruned — no archive rotation in
the project's life); an empty wish-list (the template comment only);
a 3,001-word brief that holds the whole product specification and is
the largest memory file. Validator at harvest
(`local/2026-09-09-validator.md`, on a clean archive of HEAD): 0
failures, 0 warnings; `gen-backlog --check`: view matches records.
The project's last janitor report (2026-08-31 00:19 UTC): 0
failures, 0 warnings, 1.0 commits per shipped item.

## Incident: deleted records that would not stay deleted

pm-next ships an item by deleting its record. Two of the twelve
(`IMAGE-REVIEW`, `MANUAL-OVERRIDES`, deleted by the last two
commits) are still present on the maintainer's checkout as OneDrive
**cloud-only placeholders** — zero local bytes, flagged `dataless` —
so `git status` lists them as untracked, and any attempt to read
them blocks until the network times out. Consequence observed at
harvest: `node tools/check-memory.mjs` in the checkout ends in
`FAIL check-memory could not complete: ETIMEDOUT`, and
`gen-backlog --check` crashes the same way, while both pass on a
clean `git archive` of HEAD extracted outside the synced path. The
janitor's "Cloud-sync path: MATCH (warn-only)" line names the
condition but not this failure mode, and nothing in the project's
memory mentions it: the stream ended before it could bite a session.

## Cost of the run

From the last `token_count` event of each Codex rollout, summed by
rollout kind:

| Rollouts | Kind | Total tokens | of which cached | Output tokens |
| ---: | --- | ---: | ---: | ---: |
| 3 | top-level threads | 10,628,760 | 10,193,152 | 49,028 |
| 50 | spawned sub-agent threads | 143,347,479 | 136,045,056 | 938,097 |
| 60 | guardian auto-review | 3,312,668 | 2,622,720 | 10,423 |

Roughly 157 million tokens, 95% of them cached reads; the sub-agent
tree, not the maintainer's thread, carried nine tenths of the work.

## Where the evidence sits (all in `local/`)

- `2026-08-30-export-init-prompt.md` — the maintainer's prompts,
  verbatim, and the brief and milestone intents at the seed commit.
- `2026-08-31-export-memory.md` — every file under `project/` at
  HEAD with a byte inventory.
- `2026-08-31-export-rulebooks.md` — `AGENTS.md`, `curricula.md`,
  `README.md` at HEAD.
- `2026-08-31-export-git-log.md` — the full name-only log.
- `2026-08-31-janitor.md` — the last janitor report the project
  wrote.
- `2026-09-09-validator.md` — both checks at harvest.
- `2026-09-09-sessions.tar.gz` + manifest — all 113 Codex rollouts
  whose recorded working directory is this project.

## What this evidence can and cannot support

- Paired with `vinyl-sorting` it is the closest thing to a
  controlled reading pm-next has: same maintainer, same day, same
  framework bytes, the identical automated-stream prompt, one run on
  Claude Code with `claude-opus-5`, one on Codex with `gpt-5.6-sol`.
  The projects differ in size and kind, so it pairs the *shape* of a
  run (planning at the seed, close discipline, record lifecycle,
  steering), not its outcome.
- It is the shortest complete pm-next lifecycle on record: seed
  twelve records, ship twelve, end with an empty backlog and an
  untouched wish-list, in fifteen hours. Whether that is the design
  working or a stream that never needed the design is exactly the
  question an analysis should ask; the contract was never extended
  with a single project rule, and no record was ever re-scoped.
- The canon observables in `self/project/wish-list.md`
  (`LITE-CLOSE-WATCH`, `REVIEW-SILENCE-WATCH`) are not tested here;
  the pm-next contract has neither the trailer nor the prompt.
