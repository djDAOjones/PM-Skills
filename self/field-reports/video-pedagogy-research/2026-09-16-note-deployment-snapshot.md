<!-- field-report: project=video-pedagogy-research · date=2026-09-16 · type=note
     · pm-skills=none (pre-adoption baseline; scheduled for pm-next v2 intake — maintainer decision 2026-09-15)
     · source=harvested from the maintainer's checkout, the Claude Code and Codex session logs, and the lab checkout by Claude Code
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note; institution-specific facts stay in the local lane
     · retained=public name Joe and public GitHub identifier djDAOjones -->

# Pre-adoption baseline — Video Pedagogy Research

The orientation file for this project's directory, and the only file
of it in the tracked lane: the source repository
(`djDAOjones/video-pedagogy-research`) is **private**, so every
export and the session archive sit in `local/` on the maintainer's
checkout. Everything below is an observed fact recorded at harvest
time; nothing here is an evaluation.

**Why this is filed before any framework is installed.** On
2026-09-15 the maintainer listed twelve of their projects as
candidates for the lab's pm-next v2 and asked which should be
converted and which left alone as evidence. This project is one
that will be converted. A baseline taken before the intake is the
only way the intake's effect can later be measured: what the v2
verb reads as "existing project memory", what it rewrites, and what
the project's own state-keeping looked like when it had no
framework at all. The v2 intake verb reads existing docs and memory
first and records "the adoption and what was carried over" in one
decision; this directory is what that decision can be checked
against.

## The project

A research-synthesis pipeline, not an app: a corpus of research and
standards on video in higher-education teaching, extracted into
structured evidence cards, validated, and synthesised into a set of
principles, ratified house positions on the contradictions, and four
task skills that answer practical questions inside that framework.
Delivery targets are staff training, an intranet hub and a
practitioner community. The maintainer owns the corpus and ratifies
every house position; the agents do the extraction, validation and
synthesis.

## How the project keeps its own state (the thing the baseline preserves)

| Surface | Where | Notes |
| --- | --- | --- |
| Contract | `AGENTS.md`, 13 lines | Addressed to Codex for the unattended card-extraction stage: what to read, what it may write, run the checker after each card, do not commit, do not ask |
| Working rules | `CLAUDE.md`, 58 lines | Layout table with an owner column per path; eight answering rules; a "Current state" paragraph updated by hand at each stage boundary — the project's only cross-session memory inside the repository |
| Pipeline status | `README.md` | A six-stage table with who did what and when; stage 6 (trial on real tasks) pending at HEAD |
| Registry | `evidence/sources.tsv` (single source of truth), `evidence/INDEX.md` (generated) | 28 KB and 23 KB |
| Logs | `evidence/EXTRACTION_LOG.md`, `evidence/VALIDATION_LOG.md` | One row per card with completeness, confidence and validation; the validation log names its method and every card fully read |
| Knowledge | `synthesis/principles.md` (47 KB, the load-bearing file), `tensions.md` (13 house positions, all ratified 2026-09-08), `gaps.md`, `context/` (scope, vocabularies, house voice, local facts, a design-reference lens) | This is what a v2 intake would treat as the owner's knowledge layer |
| Skills | four `SKILL.md` files, duplicated under `.claude/skills/` and `.agents/skills/` | Byte-identical pairs: one per harness |
| Agent memory | outside the repo, in Claude Code's auto-memory: two files | Exported in the local lane; it holds the division of labour, the scope decisions and the state as of each day |

There is no backlog, no decision log, no trajectory, no validator of
memory and no budget. Decisions live in the commit subjects, the
"Current state" prose and the agent's memory; open work lives in the
README's status column.

## History shape

14 commits, 2026-09-04 09:16 to 2026-09-08 10:37 (+0100), one
author; HEAD `8f6b6c6` on `main`, pushed, tree clean at harvest.
Twelve of the fourteen commits landed on 09-04 and 09-05; the last
two ratify the house positions on 09-08. No commit since, although
the project was used twice on 09-14 (below). Commit subjects are
descriptive sentences, not item IDs; there is no `Verify:` line,
trailer or ID convention to count.

93 card files are tracked at HEAD; the README and `CLAUDE.md` say
95 cards. The bundle in the local lane settles which is right.

## Harness and model mix

| Harness | Sessions | Model(s) | Role |
| --- | ---: | --- | --- |
| Claude Code | 3 | `claude-sonnet-5` (repo scaffold, 09-04), `claude-fable-5-1` (the build, 09-04 to 09-08, 14 prompts), `claude-opus-5` (a drop-in-session blurb, 09-14) | Scaffold, gold cards, validation, synthesis, skills, ratification |
| Codex (VS Code extension) | 4 rollouts on 09-05 (one thread, three spawned) | `gpt-5.6-sol` | The overnight bulk extraction: 88 cards in about 70 minutes, as the project's own validation log records |
| Codex | 1 rollout on 09-14 | `gpt-6-astra` | Review of a real training deck — the first stage-6 use |
| Codex Desktop | 3 imports | none | Mirrors of Claude sessions; no model turns |

The maintainer's division of labour is explicit in the agent's memory:
bulk extraction on the cheaper harness to conserve credits, gold
cards, validation and synthesis on Claude. Every maintainer prompt of
every logged session is exported verbatim in the local lane
(`2026-09-04-export-init-prompt.md`); the first one is the brief.

## What the baseline preserves

- `local/2026-09-08-repo.bundle` — the whole repository history as a
  git bundle (verified), 446 KB; SHA-256 in the build output and the
  manifest. Restorable with `git clone <bundle>`.
- `local/2026-09-16-export-inventory.md` — every tracked path with
  its blob hash at HEAD, and the gitignored directories by count and
  size (the copyrighted `sources/` corpus is deliberately not
  archived).
- `local/2026-09-08-export-rulebooks.md`, `-export-state.md`,
  `-export-git-log.md` — readable copies of the contract, the state
  surfaces listed above and the full log.
- `local/2026-09-04-export-init-prompt.md` and
  `local/2026-09-08-export-agent-memory.md`.
- `local/2026-09-16-sessions.tar.gz` — 3 Claude Code sessions with
  their sub-agent and tool-result directories and the agent memory,
  plus the 8 Codex rollouts whose working directory is this project;
  two 2026-07 rollouts from an older, differently named video project
  were excluded. Manifest beside it with per-session rows and the
  archive's SHA-256.

## What to compare after the intake

- Which of the state surfaces above the intake carried into the
  ledger, which it left in place, and what it rewrote — diff the
  inventory and the bundle against the post-intake tree.
- Whether the hand-kept "Current state" paragraph and the README
  status column survive, move, or become redundant.
- Whether the knowledge layer (principles, tensions, context) is
  digested or pointed at, and whether the two duplicated skill trees
  collapse to one.
- The size of the first session's read after the intake against the
  size of a read before it (contract plus `CLAUDE.md` plus the
  "Current state" paragraph today).
