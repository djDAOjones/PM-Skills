<!-- field-report: project=video-pedagogy-research · date=2026-09-24 · type=note
     · pm-skills=pm-next-v2 (lab at c6d8198, V2-SELFHOST of 2026-09-15; adopted by INTAKE a9a0d1f on 2026-09-16; no canon release governs it)
     · source=harvested from the maintainer's checkout and the Claude Code, Codex and Windsurf stores by Claude Code (self/FIELD-HARVEST.md, run of 2026-09-24, capture cut-off 2026-09-24T11:40:00Z)
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note
     · retained=project and tool names only; every export of this delta is in the local lane -->

# Delta note — Video Pedagogy Research, 2026-09-24

The refresh of this directory's archive since the pre-adoption baseline
of 2026-09-16. The repository (`djDAOjones/video-pedagogy-research`) is
private, so every export, the upgrade report, the bundle and the
session archive are in `local/`.
Everything below is an observed fact recorded at harvest time; nothing
here is an evaluation.

## Why now

The pm-next v2 intake landed on 2026-09-16 (`a9a0d1f`, 10:25 +0100),
after the baseline was filed; 74 commits and more than 400 sessions have
followed. The project was producing sessions during the harvest — Codex
waves run from held clones under `~/vpr-held/` — so the cut-off matters
here more than anywhere: the logs still being written at it were cut
there, and side files written after it were left out (both counted
below).

## The project

A research-synthesis pipeline: a corpus on video in higher-education
teaching, extracted into evidence cards, synthesised into principles and
ratified house positions, and drafted into staff-facing material.

## The deployment

| Fact | Value |
| --- | --- |
| Framework | pm-next v2, from the lab at `c6d8198` (the provenance record under `project/migration/` names it) |
| Intake | `a9a0d1f`, 2026-09-16 10:25 +0100, by a Codex thread started from the canon checkout at 09:07 UTC ('Migrate Video Pedagogy Research to PM-Skills V2 for project development, autonomously…'), one of six run in parallel that morning |
| Before | no framework (the baseline filed 2026-09-16 at `8f6b6c6`) |
| The maintainer's list | on 2026-09-15 at 21:55 UTC this project was among three to 'keep … unchanged for comparison evidence'; the intake thread was started the next morning |
| HEAD at the cut-off | `23af797` (2026-09-23 23:15 +01:00), 13 refs |
| Working tree at harvest | 28 status lines before the harvest read anything |

## History

88 commits from 2026-09-04 09:16 +01:00 to 2026-09-23 23:15 +01:00; 74 subjects open with an item ID, 74 bodies carry a `Verify:` line, 86 a co-author trailer; 1 author identity.

Since the filed cut-off `8f6b6c6`: 74 commits; 529 files changed, 96012 insertions(+), 240 deletions(-); memory — project: 156 files changed, 17505 insertions(+).

## Memory at the snapshot

- `project/` — 156 files, 1,434,600 bytes; largest outside archives and records: `decisions.md` 131,234, `corpus-expansion/expansion-brief-draft-2.md` 44,304, `corpus-expansion/expansion-brief.md` 39,988, `corpus-expansion/expansion-brief-draft-1.md` 33,137, `wish-list.md` 18,871, `migration/baseline.json` 14,617.

## Tools and framework changes

The project's own memory tools, run on a clean archive of the frozen HEAD under a write-confining sandbox: `node tools/check.mjs` exit 0 (43 warnings).

Framework changes filed as `upgrade` reports:

- `2026-09-16-upgrade.md` — Intake to pm-next v2, `a9a0d1f998df` on 2026-09-16; validator: `node tools/check.mjs` after the change exit 0.

## Sessions

`local/2026-09-24-sessions.tar.gz` — 522 files, 701.9 MB uncompressed, 184.2 MB compressed; 14 log(s) cut at the cut-off, 9 side file(s) written after it left out.

| Store | Attributed | Taken this run |
| --- | ---: | ---: |
| Claude Code | 51 | 48 |
| Codex, live and archived | 362 + 1 | 356 |

Codex rollouts taken, by kind: 12 Codex Desktop import (mirror of a Claude Code chat; no model turns), 340 interactive, 4 guardian auto-review.

Attributed sessions include 92 Codex rollouts run from held clones under `~/vpr-held/`, 14 launched from Claude Code scratchpads, and the intake thread and its guardian run started from the canon checkout. One filed rollout had changed in the store; it was rewritten by Codex's in-place format change, not resumed.

Model mix across every attributed session:

| Harness · model | Sessions |
| --- | ---: |
| Codex · gpt-6-astra | 341 |
| Claude Code · claude-fable-5-1 | 25 |
| Claude Code · claude-opus-5 | 14 |
| Codex · no model recorded (imports, spawned threads) | 14 |
| Claude Code · claude-opus-5-5 | 10 |
| Codex · auto-review | 4 |
| Codex · gpt-5.6-sol | 4 |
| Claude Code · claude-sonnet-5 | 2 |

The secrets scan found credential-shaped values in 339 archived member(s) — named in the manifest, values not reproduced; the archive is byte-verbatim and local.

## History bundle

`local/2026-09-23-repo.bundle` — 2.5 MB, every ref the checkout carried at the cut-off (13), verified in an empty repository.

## Where things are

- Tracked: this note only.
- Local: `2026-09-16-upgrade.md`, `2026-09-23-export-agent-memory.md`, `2026-09-23-export-git-log.md`, `2026-09-23-export-memory.md`, `2026-09-23-export-rulebooks.md`, `2026-09-23-export-state.md`, `2026-09-23-repo.bundle`, `2026-09-24-export-bundle-manifest.md`, `2026-09-24-export-inventory.md`, `2026-09-24-export-prompts.md` (6.6 MB), `2026-09-24-export-working-tree-snapshot.md`, `2026-09-24-sessions-manifest.md`, `2026-09-24-sessions.tar.gz` (184.2 MB), `2026-09-24-validator.md`.

## What to compare later

- The migration records under `project/migration/` against the baseline filed on 2026-09-16.
- The 74 commits since the baseline: item IDs and `Verify:` lines on every one, against none before the intake.
- The held-clone waves as a pattern: Codex runs launched from copies of the repository rather than the checkout.
