<!-- field-report: project=parenting-research · date=2026-09-24 · type=note
     · pm-skills=none (pre-adoption baseline; scheduled for pm-next v2 intake — maintainer's list of 2026-09-15)
     · source=harvested from the maintainer's checkout and the Claude Code, Codex and Windsurf stores by Claude Code (self/FIELD-HARVEST.md, run of 2026-09-24, capture cut-off 2026-09-24T11:40:00Z)
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note
     · retained=project and tool names only; no family detail; every file but this note is in the local lane -->

# Deployment snapshot — Parenting Research (pre-adoption baseline)

The orientation file for this project's directory, and its only
tracked file: the corpus concerns the maintainer's family, so the folder
archive, the inventory, the prompts and the session archive are in
`local/`.
Everything below is an observed fact recorded at harvest time; nothing
here is an evaluation.

## Why now

On 2026-09-15 the maintainer listed this project among those to be
converted to the lab's pm-next v2 (item 7). No framework and no
repository exist yet, so this is the pre-adoption baseline the intake
can later be measured against.

## The project

A research corpus on parenting and child development, produced by Codex
from a written research brief, with reviews and a small family-quiz
folder beside it; no repository.

## The deployment

| Fact | Value |
| --- | --- |
| Framework | none; a start file, the research brief, the corpus, and a release archive of its first version |
| Repository | none; the folder is archived whole and inventoried by SHA-256 |
| Scheduled for | pm-next v2 intake (maintainer's list, 2026-09-15) |
| Harness | Codex (22 rollouts, 2026-09-08 to 09-23, in this folder) and one Claude Code session |
| Cloud state | 171 of the 176 files were cloud-only placeholders; reading them for the archive hydrated them |
| Working tree at harvest | 177 files (1,685,620 bytes) listed before the harvest read anything, system files such as `.DS_Store` included |

## Sessions

`local/2026-09-24-sessions.tar.gz` — 36 files, 24.6 MB uncompressed, 8.5 MB compressed; 0 log(s) cut at the cut-off, 0 side file(s) written after it left out.

| Store | Attributed | Taken this run |
| --- | ---: | ---: |
| Claude Code | 1 | 1 |
| Codex, live and archived | 22 + 0 | 22 |

Codex rollouts taken, by kind: 3 interactive, 7 spawned thread, 11 guardian auto-review, 1 Codex Desktop import (mirror of a Claude Code chat; no model turns).

A second Codex thread that ran in this folder — the one that produced the Personal Finance corpus — was filed under `personal-finance` by the 2026-09-16 harvest (thread linkage), and five rollouts filed under `marketing-skills` likewise; neither is repeated here.

Model mix across every attributed session:

| Harness · model | Sessions |
| --- | ---: |
| Codex · gpt-6-astra | 10 |
| Codex · no model recorded (imports, spawned threads) | 7 |
| Codex · auto-review | 5 |
| Claude Code · claude-fable-5-1 | 1 |

The secrets scan found credential-shaped values in 3 archived member(s) — named in the manifest, values not reproduced; the archive is byte-verbatim and local.

## Where things are

- Tracked: this note only.
- Local: `2026-09-23-export-agent-memory.md`, `2026-09-24-export-folder.tar.gz`, `2026-09-24-export-history.md`, `2026-09-24-export-inventory.md`, `2026-09-24-export-prompts.md`, `2026-09-24-sessions-manifest.md`, `2026-09-24-sessions.tar.gz` (8.5 MB).

## What to compare later

- The corpus as archived here against what the v2 intake reads as existing project memory.
- The research brief against the corpus's own coverage and method files.
