<!-- field-report: project=marcacao-mestre · date=2026-09-24 · type=note
     · pm-skills=2.4.0 (installed by 84f2f3e on 2026-06-14; never upgraded; the install was never pushed)
     · source=harvested from the maintainer's checkout and the Claude Code, Codex and Windsurf stores by Claude Code (self/FIELD-HARVEST.md, run of 2026-09-24, capture cut-off 2026-09-24T11:40:00Z)
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note
     · retained=project and tool names only; no client name; the framework commits are not on the public remote, so every export is in the local lane -->

# Deployment snapshot — Marcação Mestre

The orientation file for this project's directory, and its only
tracked file: the repository (`djDAOjones/Marcacao-Mestre`) is public,
but it was last pushed on 2026-02-19, four months before the framework
was installed, so every export sits in `local/`.
Everything below is an observed fact recorded at harvest time; nothing
here is an evaluation.

## Why now

Found by the field-harvest run's walk of the project roots: a canon
2.4.0 deployment the tier had never seen. Its `.git` held 497
cloud-only objects when first counted, and the remote lacks every
commit since February, so the checkout's own objects had to be read
(391 files, downloaded by reading them) before its history could be
cloned and bundled.

## The project

A web-based DJ tool for Capoeira instructors, optimised for tablets:
automatic beat-matched transitions and a music library organised by
tempo.

## The deployment

| Fact | Value |
| --- | --- |
| Framework | canon 2.4.0, installed by `84f2f3e` ('docs: add project management framework and agent guidelines'), 2026-06-14; never upgraded |
| Before | 57 commits of product history from `f4d9f7b` (2026-01-24) before the install, 7 from the install to HEAD; the public remote stops at `e3b22e8` (2026-02-19) |
| Rulebooks | `AGENTS.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md` |
| Harness | Codex — 18 rollouts, all of 2026-08-26: the read-only review run in the project folder (10 live, 8 in the archived store); Windsurf's workspace list names three variants of the folder |
| HEAD at the cut-off | `a9fcee4` (2026-06-14 03:57 +01:00), 3 refs |
| Working tree at harvest | 0 status lines before the harvest read anything |

## History

64 commits from 2026-01-24 02:06 UTC to 2026-06-14 03:57 +01:00; 0 subjects open with an item ID, 0 bodies carry a `Verify:` line, 0 a co-author trailer; 1 author identity.

## Memory at the snapshot

- `pm_skills/project/` — 8 files, 25,758 bytes; largest outside archives and records: `architecture.md` 5,448, `decision-log.md` 4,083, `file-map.md` 3,733, `trajectory.md` 3,215, `conventions.md` 3,188, `brief.md` 2,549.

## Tools and framework changes

Canon 2.4.0 as installed here carries no memory tool; nothing was run.

## The review of 2026-08-26

A Codex read-only review of the app, written into the project folder, is filed as `local/2026-08-26-export-review-artefacts.md`. The file was a cloud-only placeholder; reading it hydrated it. It lists findings about the app, which is why it stays local.

## Sessions

`local/2026-09-24-sessions.tar.gz` — 18 files, 25.8 MB uncompressed, 5.6 MB compressed; 0 log(s) cut at the cut-off, 0 side file(s) written after it left out.

| Store | Attributed | Taken this run |
| --- | ---: | ---: |
| Claude Code | 0 | 0 |
| Codex, live and archived | 10 + 8 | 18 |

Codex rollouts taken, by kind: 6 guardian auto-review, 3 interactive, 9 spawned thread.

The project's Windsurf era is in the unattributed Windsurf archive filed once for the run: `route-plotter/local/2026-09-24-windsurf-stores.tar.gz`.

Model mix across every attributed session:

| Harness · model | Sessions |
| --- | ---: |
| Codex · gpt-5.6-sol | 12 |
| Codex · auto-review | 6 |

## History bundle

`local/2026-06-14-repo.bundle` — 173.3 MB, every ref the checkout carried at the cut-off (3), verified in an empty repository. Most of its size is zip archives committed into the history — two versions of `Archive.zip` of about 80 MB each.

## Where things are

- Tracked: `.gitkeep`, and this note.
- Local: `2026-06-14-export-git-log.md`, `2026-06-14-export-init-prompt.md`, `2026-06-14-export-memory.md`, `2026-06-14-export-rulebooks.md`, `2026-06-14-export-state.md`, `2026-06-14-repo.bundle` (173.3 MB), `2026-08-26-export-review-artefacts.md`, `2026-09-24-export-bundle-manifest.md`, `2026-09-24-export-inventory.md`, `2026-09-24-export-prompts.md`, `2026-09-24-sessions-manifest.md`, `2026-09-24-sessions.tar.gz` (5.6 MB).

## What to compare later

- The memory as first committed on 2026-06-14 against the review of 2026-08-26: what the review read as the project's own record.
- The 57 commits of product history before the install against the 7 after it.
