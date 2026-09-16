<!-- field-report: project=personal-finance · date=2026-09-16 · type=note
     · pm-skills=none (pre-adoption baseline; scheduled for pm-next v2 intake — maintainer decision 2026-09-15)
     · source=harvested from the maintainer's folder, the Claude Code session log and the Codex rollouts by Claude Code
     · redaction=absolute paths written as <checkout>, <other-checkout:…> and <home>; no e-mail addresses or credential-shaped values appear in this note; the household context and every figure stay in the local lane
     · retained=public name Joe -->

# Pre-adoption baseline — Personal Finance

The orientation file for this project's directory, and the only file
of it in the tracked lane: the project is a personal-finance research
corpus tailored to the maintainer's own household, so every export,
the three release archives and the session archive sit in `local/`
on the maintainer's checkout. Everything below is an observed fact
recorded at harvest time; nothing here is an evaluation, and nothing
here says what the corpus concludes.

**Why this is filed before any framework is installed.** On
2026-09-15 the maintainer listed twelve projects as candidates for
the lab's pm-next v2 and asked which should be converted and which
left alone as evidence. This is one that will be converted. It is
the least repository-shaped project in the tier — no git, no
contract file, no agent instructions — so the baseline records what
"existing project memory" the v2 intake will find here and what it
will have to invent.

## The project

A research corpus, produced in one day by a Codex thread from a
one-paragraph request and extended the same evening, then reviewed
a week later into a set of decision principles and one pilot skill
with its own calculator, tests and a blinded comparison against an
unassisted answer. The corpus itself carries its release history:
three dated archives, an update log, a research backlog and a
review report that records its own limits.

## How the project keeps its own state (the thing the baseline preserves)

| Surface | Where | Notes |
| --- | --- | --- |
| Contract | none | No `AGENTS.md`, `CLAUDE.md` or equivalent; each session began from a pasted request |
| Entry point | `START-HERE.md` at the folder root, written with v0.3 | Points at the current reviewed release and says the earlier folders and archives are preserved |
| Releases | `personal-finance-corpus-2026-09-08.zip` (v0.1), `…-v0.2-2026-09-08.zip`, `…-v0.3-2026-09-14.zip` | The history. Two working folders (`personal-finance/`, `personal-finance-v0.3/`) were byte-identical to the v0.2 and v0.3 archives at harvest |
| Update log | `research/update-log.md` inside each release | One dated entry per release, with the review corrections applied |
| Open work | `research/backlog.md` | The corpus's own research backlog |
| Validation | `tools/validate_corpus.py`, `tools/validate_skill_review.py`, their recorded outputs | Structure and links only, as the README says |
| Agent memory | outside the folder, in Claude Code's auto-memory: two files from the one review session | Exported in the local lane |

No git, no versioned history beyond the archives, no decision log,
no trajectory, no memory budget. Decisions live in the update log and
the review report; open work lives in the research backlog.

## History shape

Three releases in six days, all produced by Codex:

| Release | Produced | How |
| --- | --- | --- |
| v0.1 foundation | 2026-09-08, afternoon | One Codex Desktop thread (`gpt-6-astra`), opened at 13:35 UTC from a request for "a corpus of synthesised literature"; the thread's working directory was the maintainer's Parenting Research folder, and the work was relocated into a new Personal Finance folder on request at 15:40 UTC |
| v0.2 family extension | 2026-09-08, evening | The same thread, continued |
| v0.3 review and pilot | 2026-09-13 22:39 to 2026-09-14 10:29 UTC | The same thread resumed five days later; nine spawned sub-agent threads and three guardian auto-review runs did the instruction audit, the pilot, the blinded comparison and the grading |

Between v0.2 and v0.3, on 2026-09-08 at 18:58 UTC, one Claude Code
session (`claude-fable-5-1`, a single prompt) reviewed the corpus
and proposed a staged improvement process; the v0.3 work followed
that shape. Its prompt, and the nine prompts of the Codex thread, are
exported verbatim in `local/2026-09-08-export-init-prompt.md`.

The v0.3 review met the same hazard the eBay Tool report in this
tier records: fourteen files of the working folder were OneDrive
cloud-only placeholders, so the review verified and used the v0.2
archive as its baseline rather than the folder, and published v0.3
as a separate folder. Its `baseline-provenance.json` records the
archive hash and the affected paths. At harvest no placeholder
remained.

## Harness and model mix

| Harness | Sessions | Model(s) | Role |
| --- | ---: | --- | --- |
| Codex Desktop | 1 thread, 22 rollout files: the thread's own file plus 8 resumption files (Codex labels a resumption as spawned from the thread's own id), 9 spawned sub-agent threads, 4 guardian auto-review runs | `gpt-6-astra` | Everything that produced the corpus and the pilot |
| Claude Code | 1 | `claude-fable-5-1` | The improvement-process review between v0.2 and v0.3 |
| Codex Desktop | 1 import | none | A mirror of the Claude session; no model turns |

## What the baseline preserves

- `local/2026-09-08-export-corpus-v0.1.zip`,
  `local/2026-09-08-export-corpus-v0.2.zip`,
  `local/2026-09-14-export-corpus-v0.3.zip` — the three release
  archives, byte-verbatim, copy-verified, SHA-256 in the history
  export.
- `local/2026-09-16-export-inventory.md` — SHA-256 of every file in
  both working folders, the three archives and the start file: the
  baseline a post-intake folder is diffed against, since there is no
  git to diff.
- `local/2026-09-14-export-history.md` — the start file, the three
  release READMEs, the update log, the research backlog and method,
  the scope, the v0.3 review report and its baseline-provenance
  record, readable.
- `local/2026-09-14-validator.md` — the project's own recorded
  validator outputs.
- `local/2026-09-08-export-init-prompt.md` and
  `local/2026-09-08-export-agent-memory.md`.
- `local/2026-09-16-sessions.tar.gz` — the Claude Code session with
  its tool results and the agent memory, plus the 23 Codex rollouts of
  the producing thread, selected by parent-thread linkage from the
  Parenting Research working directory so that none of that other
  project's work is included. Manifest beside it with per-rollout
  rows and the archive's SHA-256.

## What to compare after the intake

- What the intake writes as the brief and the profile for a project
  that has no contract at all, and which of the surfaces above it
  points at, digests or ignores.
- Whether the three-archive release habit continues or is replaced
  by the ledger's history.
- Whether the research backlog inside the corpus and the ledger's
  backlog become one list or two.
- How the intake handles a project whose entire history sits in
  Codex rollouts under another folder's working directory.
