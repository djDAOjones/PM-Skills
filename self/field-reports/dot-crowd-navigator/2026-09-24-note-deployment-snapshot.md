<!-- field-report: project=dot-crowd-navigator · date=2026-09-24 · type=note
     · pm-skills=unversioned (pre-1.0.0 framework tree: pm_skills/ with project memory and no VERSION file; committed on 2026-08-17 in an as-found snapshot of the April work)
     · source=harvested from the maintainer's checkout and the Claude Code, Codex and Windsurf stores by Claude Code (self/FIELD-HARVEST.md, run of 2026-09-24, capture cut-off 2026-09-24T11:40:00Z)
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note
     · retained=names already present in the public repository -->

# Deployment snapshot — Dot Crowd Navigator (pre-1.0.0 framework tree)

The orientation file for this project's directory. Its memory,
rulebook, state, git-log and inventory exports are in the tracked lane:
the repository (`djDAOjones/dot-crowd-navigator`) is public and the
exported HEAD is on it. Sessions and the bundle are in `local/`.
Everything below is an observed fact recorded at harvest time; nothing
here is an evaluation.

## Why now

The field-harvest run of 2026-09-24 found this checkout by walking the
project roots: a `pm_skills/` tree with populated project memory and no
`VERSION` file — the framework as it stood before version numbers — in
a project the tier had never seen.

## The project

A graph-based crowd-flow simulation: draw a network of nodes and
weighted edges over an image and run a swarm of dots through it. It
began as a fork of the Route Plotter v2 line (its first commit replaces
the tree with `router-plotter-02`), and its history was restored from a
lost-source recovery on 2026-08-17.

## The deployment

| Fact | Value |
| --- | --- |
| Framework | the unversioned pre-1.0.0 tree (`pm_skills/` with `GUIDE.md`, `init.md`, integrations, prompts, scaffold and project memory; no `VERSION`) |
| Committed | in `0880110`, 2026-08-17 — an as-found snapshot of the April working state, followed by a salvage of lost source |
| Rulebooks | `AGENTS.md` (and an `AGENTS.md.new` beside it), `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md`, `SALVAGE-NOTE.md` |
| Harness | Codex (2026-04-10 to 04-14, in the parent folder) and one Claude Code session of 2026-08-17 in a stale Desktop copy of the parent folder; Windsurf's workspace list names the folder |
| HEAD at the cut-off | `8d38880` (2026-08-17 19:53 +01:00), 2 refs |
| Working tree at harvest | 0 status lines before the harvest read anything |

## History

7 commits from 2026-04-12 02:41 +01:00 to 2026-08-17 19:53 +01:00; 0 subjects open with an item ID, 0 bodies carry a `Verify:` line, 2 a co-author trailer; 1 author identity.

## Memory at the snapshot

- `pm_skills/project/` — 6 files, 34,145 bytes; largest outside archives and records: `architecture.md` 10,369, `decision-log.md` 7,683, `file-map.md` 5,777, `backlog.md` 4,187, `brief.md` 3,317, `conventions.md` 2,812.

## Tools and framework changes

The pre-1.0.0 framework tree ships no memory tool; nothing was run.

## Sessions

`local/2026-09-24-sessions.tar.gz` — 5 files, 6.3 MB uncompressed, 2.9 MB compressed; 0 log(s) cut at the cut-off, 0 side file(s) written after it left out.

| Store | Attributed | Taken this run |
| --- | ---: | ---: |
| Claude Code | 1 | 1 |
| Codex, live and archived | 4 + 0 | 4 |

Codex rollouts taken, by kind: 4 interactive.

The Windsurf era of this project is in the unattributed Windsurf archive filed once for the run: `route-plotter/local/2026-09-24-windsurf-stores.tar.gz`.

Model mix across every attributed session:

| Harness · model | Sessions |
| --- | ---: |
| Codex · gpt-5.4 | 3 |
| Claude Code · claude-fable-5 | 1 |
| Codex · no model recorded (imports, spawned threads) | 1 |

## History bundle

`local/2026-08-17-repo.bundle` — 55.7 MB, every ref the checkout carried at the cut-off (2), verified in an empty repository.

## Where things are

- Tracked: `2026-08-17-export-git-log.md`, `2026-08-17-export-memory.md`, `2026-08-17-export-rulebooks.md`, `2026-08-17-export-state.md`, `2026-09-24-export-inventory.md`, and this note.
- Local: `2026-08-17-export-init-prompt.md`, `2026-08-17-repo.bundle` (55.7 MB), `2026-09-24-export-bundle-manifest.md`, `2026-09-24-export-prompts.md`, `2026-09-24-sessions-manifest.md`, `2026-09-24-sessions.tar.gz`.

## What to compare later

- The pre-1.0.0 memory here against the Route Plotter v2 line's, from which the code was forked.
- What the as-found snapshot of 2026-08-17 recovered against what the April sessions describe.
