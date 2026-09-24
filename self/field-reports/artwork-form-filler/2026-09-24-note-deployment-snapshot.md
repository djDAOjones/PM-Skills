<!-- field-report: project=artwork-form-filler · date=2026-09-24 · type=note
     · pm-skills=2.2.1 (installed with the initial commit 2c02f80 on 2026-06-13; never upgraded)
     · source=harvested from the maintainer's checkout and the Claude Code, Codex and Windsurf stores by Claude Code (self/FIELD-HARVEST.md, run of 2026-09-24, capture cut-off 2026-09-24T11:40:00Z)
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note
     · retained=names already present in the public repository -->

# Deployment snapshot — Artwork Form Filler

The orientation file for this project's directory. Its memory,
rulebook, state, git-log and inventory exports are in the tracked lane:
the repository (`djDAOjones/form-filler`) is public and the exported
HEAD is on it. Uncommitted memory, sessions and the bundle are in
`local/`.
Everything below is an observed fact recorded at harvest time; nothing
here is an evaluation.

## Why now

Found by the field-harvest run's walk of the project roots: a canon
deployment the tier had never seen.

## The project

A browser-only tool that fills a target shape with many source
silhouette images, arranged so that none is clipped, none overlaps
another and none leaves the target.

## The deployment

| Fact | Value |
| --- | --- |
| Framework | canon 2.2.1, installed with the initial commit `2c02f80` ('Initial commit: project memory and standards files'), 2026-06-13; never upgraded |
| Rulebooks | `AGENTS.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md` |
| Harness | Codex (14 rollouts, 2026-06-13 to 08-26, one of them in the archived store) |
| HEAD at the cut-off | `02d4145` (2026-06-14 02:07 +01:00), 3 refs |
| Working tree at harvest | 8 status lines before the harvest read anything |

## History

8 commits from 2026-06-13 22:24 +01:00 to 2026-06-14 02:07 +01:00; 0 subjects open with an item ID, 0 bodies carry a `Verify:` line, 0 a co-author trailer; 1 author identity.

## Memory at the snapshot

- `pm_skills/project/` — 8 files, 27,256 bytes; largest outside archives and records: `decision-log.md` 7,912, `trajectory.md` 4,183, `architecture.md` 3,602, `file-map.md` 3,453, `backlog.md` 2,412, `brief.md` 2,301.

## Tools and framework changes

Canon 2.2.1 as installed here carries no memory tool; nothing was run.

## Sessions

`local/2026-09-24-sessions.tar.gz` — 14 files, 23.9 MB uncompressed, 4.4 MB compressed; 0 log(s) cut at the cut-off, 0 side file(s) written after it left out.

| Store | Attributed | Taken this run |
| --- | ---: | ---: |
| Claude Code | 0 | 0 |
| Codex, live and archived | 13 + 1 | 14 |

Codex rollouts taken, by kind: 4 interactive, 7 guardian auto-review, 3 spawned thread.

Model mix across every attributed session:

| Harness · model | Sessions |
| --- | ---: |
| Codex · auto-review | 7 |
| Codex · gpt-5.6-sol | 6 |
| Codex · gpt-5.5 | 1 |

## History bundle

`local/2026-06-14-repo.bundle` — 3.4 MB, every ref the checkout carried at the cut-off (3), verified in an empty repository; 1 Codex turn-diff checkpoint ref(s) could not be preserved (the checkout's own store cannot supply the objects they name) and are recorded by name in the bundle manifest.

## Where things are

- Tracked: `2026-06-14-export-git-log.md`, `2026-06-14-export-memory.md`, `2026-06-14-export-rulebooks.md`, `2026-06-14-export-state.md`, `2026-09-24-export-inventory.md`, and this note.
- Local: `2026-06-13-export-init-prompt.md`, `2026-06-14-repo.bundle`, `2026-09-24-export-bundle-manifest.md`, `2026-09-24-export-prompts.md`, `2026-09-24-export-working-tree-snapshot.md`, `2026-09-24-sessions-manifest.md`, `2026-09-24-sessions.tar.gz`.

## What to compare later

- The two memory files modified but never committed (`decision-log.md`, `trajectory.md`) against the committed versions.
