<!-- field-report: project=pattern-mapper · date=2026-09-16 · type=note
     · pm-skills=canon 4.0.0 (installed as 3.17.1 on 2026-07-17 and upgraded to 4.0.0 the same day; never upgraded since; baseline taken before the pm-next v2 intake maps its history)
     · source=harvested from a fresh clone of the public repository, the maintainer's checkout, and the Claude Code and Codex session logs by Claude Code
     · redaction=absolute paths written as <checkout> and <home>; e-mail addresses removed from the exports; nothing personal appears in this note
     · retained=names already present in the public repository; the agent memory, the project transcripts and every session log stay in the local lane -->

# Pre-adoption baseline — Pattern Mapper (canon 4.0.0)

The orientation file for this project's directory. The source
repository (`djDAOjones/pattern-mapper`) is **public**, so the
memory, rulebooks, git log, install-time memory, configuration and
inventory are in the tracked lane; the agent memory, every maintainer
prompt, the session archive and a verified git bundle sit in `local/`.
Everything below is an observed fact recorded at harvest time;
nothing here is an evaluation.

**Why now.** The maintainer scheduled this project for the lab's
pm-next v2 on 2026-09-15; the intake had produced a partial proposal
by 2026-09-16 with "history mapping" still to do. This is the largest
canon deployment the tier holds and the one whose history the intake
has most to map, so the baseline was taken before that mapping
touched anything. It is also the most perishable evidence in the
tier: its earliest session logs date from July, and Claude Code
deletes transcripts thirty days after their last activity by default.

## The project

A web app that converts artwork into cross-stitch designs in real
time: it captures a chosen screen region from another application
and renders a live cross-stitch preview with palette, dithering and
export tooling. A Jen and Jones studio project. It was named **Cross
Stitch Lens** until 2026-08-11 (commit "the product becomes Pattern
Mapper", RENAME-01, decision D150); the rename moved the folder, so
its session logs sit under two project directories.

## Framework deployment

| Fact | Value |
| --- | --- |
| Framework | canon pm-skills 4.0.0 — the full tiered memory (`pm_skills/project/`), three rulebooks, the 4.0.0 prompt set |
| Installed | 2026-07-17 09:34 +0100: "PM-Skills framework baseline" (`6bb39f9`, VERSION 3.17.1), then "Init: Cross Stitch Lens project memory and docs" (`3d5baa5`) |
| Upgraded | 2026-07-17 10:40 +0100: "Upgrade pm-skills 3.17.1 -> 4.0.0 (DIST-BOUNDARY) + remove framework-repo leftovers" (`75f04d1`). **This is the only recorded walk of an upgrade in the tier.** Field study two counted zero walks across three deployments; this fourth deployment walked one, on its first morning, before 4.0.0's distribution boundary existed in the project |
| Upgrades since | none — `pm_skills/VERSION` has been 4.0.0 for 216 commits while canon reached 4.21.1 |
| Rulebooks | `AGENTS.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md` and a README, 92 KB together |
| Harness configuration | `.claude/settings.json` runs a cloud-sync settle script at every session start; `.windsurf/workflows/next.md` points the Windsurf `/next` workflow at the framework; `_transcripts/` is a tracked directory whose README describes a transcript-saving convention |
| Working tree at harvest | HEAD `348eb16` on `main`, 216 commits, pushed; a merged-and-kept agent-worktree branch `creative-01-proto` at `9041fae`, also pushed; one untracked `.codex/hooks.json` from the intake attempt; 121 cloud-only placeholders, all build outputs, fonts and benchmark reports; 825 cloud-only loose objects inside `.git`, which is why the exports were taken from a fresh clone (HEAD identical) |

## History shape

216 commits on `main`, 2026-07-17 to 2026-08-28 (+0100): 69 in July,
147 in August. One author, with a Devin bot co-author trailer on four
August commits, so three harnesses touched this repository.

| Measure | Count |
| --- | ---: |
| Subjects carrying an item ID or a conventional prefix | 190 of 216 |
| Bodies carrying a `Verify:` line | 85 of 216 |
| `Co-Authored-By` trailers | 167 |
| `Close: lite` trailers | 0 |
| Decision-log archive rotations | 6 (chunks from 07-16, 07-17 to 07-19, 07-20 to 07-23, 08-04 to 08-05, 08-06 to 08-09, 08-11 to 08-12) |
| Trajectory archive rotations | 6 |

## Memory at the snapshot

802 KB under `pm_skills/project/` at `348eb16`: a 126 KB live
decision log over 383 KB of archived chunks; a 16 KB live trajectory
over 62 KB of chunks; a 28 KB backlog; twelve tickets totalling
103 KB (the largest, `ICE-PROFILES-02` and `CREATIVE-01`, 26 KB and
25 KB); a 44 KB file map; architecture, conventions, brief,
wish-list, doc-deltas and the archive index. No memory validator
existed in 4.0.0, so there is no validator run in this baseline; the
project's gate was docs integrity, spelling and a secrets check.

## Harness and model mix

| Harness | Sessions | Notes |
| --- | ---: | --- |
| Claude Code | 75 | 39 under the Cross Stitch Lens directory (earliest logged 2026-07-19), 33 under Pattern Mapper, 3 in agent-worktree directories on 2026-08-22 |
| Codex | 55 rollouts | 12 interactive rollouts in July under the old name; 43 on 2026-08-26 to 08-28 — 34 Codex Desktop imports of Claude sessions, 5 guardian auto-review runs, 1 interactive, 3 spawned: the 08-26 review round |
| Devin | 4 commits | co-author trailer only; no local log |

379 maintainer prompts across the 75 Claude Code sessions are
exported verbatim in the local lane; the earliest logged one, from
2026-07-19, is an `autojazz` instruction over the backlog, so the
actual initialisation prompt of 2026-07-17 predates the local logs
and only the memory as first committed survives from it.

## What the baseline preserves

- Tracked: `2026-08-28-export-memory.md` (every file under
  `pm_skills/project/` with a byte inventory),
  `2026-08-28-export-rulebooks.md`, `2026-08-28-export-git-log.md`,
  `2026-08-28-export-state.md` (harness and gate configuration),
  `2026-07-17-export-init-prompt.md` (the brief and backlog as first
  committed, plus the earliest logged prompts) and
  `2026-09-16-export-inventory.md` (every tracked blob at HEAD).
- Local: `2026-08-28-repo.bundle` (both branches, verified),
  `2026-09-16-export-prompts-all.md`,
  `2026-08-27-export-agent-memory.md` (16 files from both directories),
  and `2026-09-16-sessions.tar.gz` — 181 files, 244 MB, 75 MB
  compressed: five Claude Code project directories and 55 Codex
  rollouts, with the manifest's per-session rows and SHA-256.

## What to compare after the intake

- How six archived decision-log chunks and six trajectory chunks map
  into a ledger that has an archive step of its own.
- What becomes of the twelve tickets, the 44 KB file map and the
  92 KB of rulebooks: items, a structure file and a profile with
  digests, or something carried over verbatim.
- Whether the intake's adoption decision records the 3.17.1 to 4.0.0
  upgrade and the rename as history or loses them.
- The read cost of a first session before and after.
