<!-- field-report: project=windsurf-ai-credit-display · date=2026-09-24 · type=note
     · pm-skills=2.2.1 (installed as 1.1.0 by 3a958c3 on 2026-05-31; upgraded to 2.2.1 by 14d0ba1 on 2026-06-13)
     · source=harvested from the maintainer's checkout and the Claude Code, Codex and Windsurf stores by Claude Code (self/FIELD-HARVEST.md, run of 2026-09-24, capture cut-off 2026-09-24T11:40:00Z)
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note
     · retained=project and tool names only; the repository is private, so every export is in the local lane -->

# Deployment snapshot — Cascade Cost Meter (Windsurf AI credit display)

The orientation file for this project's directory, and its only
tracked file: the repository (`djDAOjones/Windsurf-Prompt-Coster`) is
private.
Everything below is an observed fact recorded at harvest time; nothing
here is an evaluation.

## Why now

Found by the field-harvest run's walk of the project roots: a canon
deployment of the Windsurf era the tier had never seen.

## The project

A local, privacy-first cost meter for Windsurf Cascade: a
post-response hook records each turn and an editor extension estimates
and prices its tokens.

## The deployment

| Fact | Value |
| --- | --- |
| Framework | canon 2.2.1 |
| Installed | 1.1.0 with the first commit `3a958c3`, 2026-05-31 |
| Upgraded | to 2.2.1 inside the second commit `14d0ba1`, 2026-06-13 — filed as an `upgrade` report |
| Rulebooks | `AGENTS.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md` |
| Harness | Codex (4 rollouts, 2026-05-31 to 06-16); Windsurf's workspace list names the folder |
| HEAD at the cut-off | `14d0ba1` (2026-06-13 23:50 +01:00), 4 refs |
| Working tree at harvest | 7 status lines before the harvest read anything; 7 of them cloud-only placeholders, recorded as gaps and not opened |

## History

2 commits from 2026-05-31 10:30 +01:00 to 2026-06-13 23:50 +01:00; 1 subjects open with an item ID, 0 bodies carry a `Verify:` line, 0 a co-author trailer; 1 author identity.

## Memory at the snapshot

- `pm_skills/project/` — 10 files, 55,815 bytes; largest outside archives and records: `decision-log.md` 21,599, `architecture.md` 6,208, `file-map.md` 5,431, `trajectory.md` 4,123, `brief.md` 3,639, `conventions.md` 2,996.

## Tools and framework changes

Canon 1.x–2.x as installed here carries no memory tool; nothing was run.

Framework changes filed as `upgrade` reports:

- `2026-06-13-upgrade.md` — Framework upgrade 1.1.0 → 2.2.1 (in the MVP-completion commit), `14d0ba195790` on 2026-06-13.

## Sessions

`local/2026-09-24-sessions.tar.gz` — 4 files, 3.2 MB uncompressed, 1.4 MB compressed; 0 log(s) cut at the cut-off, 0 side file(s) written after it left out.

| Store | Attributed | Taken this run |
| --- | ---: | ---: |
| Claude Code | 0 | 0 |
| Codex, live and archived | 4 + 0 | 4 |

Codex rollouts taken, by kind: 4 interactive.

The project's Windsurf era is in the unattributed Windsurf archive filed once for the run: `route-plotter/local/2026-09-24-windsurf-stores.tar.gz`.

Model mix across every attributed session:

| Harness · model | Sessions |
| --- | ---: |
| Codex · gpt-5.5 | 4 |

## History bundle

`local/2026-06-13-repo.bundle` — 0.2 MB, every ref the checkout carried at the cut-off (4), verified in an empty repository; 2 Codex turn-diff checkpoint ref(s) could not be preserved (the checkout's own store cannot supply the objects they name) and are recorded by name in the bundle manifest.

## Where things are

- Tracked: this note only.
- Local: `2026-05-31-export-init-prompt.md`, `2026-06-13-export-git-log.md`, `2026-06-13-export-memory.md`, `2026-06-13-export-rulebooks.md`, `2026-06-13-export-state.md`, `2026-06-13-repo.bundle`, `2026-06-13-upgrade.md`, `2026-09-24-export-bundle-manifest.md`, `2026-09-24-export-inventory.md`, `2026-09-24-export-prompts.md`, `2026-09-24-export-working-tree-snapshot.md`, `2026-09-24-sessions-manifest.md`, `2026-09-24-sessions.tar.gz`.

## What to compare later

- The memory as first committed at 1.1.0 against the memory after the 2.2.1 upgrade, 13 days later.
- The uncommitted memory changes in the working-tree snapshot against the committed memory.
