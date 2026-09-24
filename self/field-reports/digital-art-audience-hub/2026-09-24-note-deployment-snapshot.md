<!-- field-report: project=digital-art-audience-hub · date=2026-09-24 · type=note
     · pm-skills=4.6.0 (installed unversioned by a089018 on 2026-05-03; upgraded 1.0.0 → 1.1.0 → 2.0.0 → 2.1.0 → 2.7.3 → 3.1.0 → 3.1.1 → 4.6.0 by eight commits, the last 7f32957 on 2026-08-17; records mode adopted by a7e6999 the same day)
     · source=harvested from the maintainer's checkout and the Claude Code, Codex and Windsurf stores by Claude Code (self/FIELD-HARVEST.md, run of 2026-09-24, capture cut-off 2026-09-24T11:40:00Z)
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note
     · retained=project and tool names only; the repository is private, so every export, upgrade report, the review and the session archive are in the local lane -->

# Deployment snapshot — Digital Art Audience Hub (first harvest)

The orientation file for this project's directory, and the only file
of it in the tracked lane: the repository
(`djDAOjones/nottingham-contemporary-exhibition-2026-march`) is private.
Everything below is an observed fact recorded at harvest time; nothing
here is an evaluation.

## Why now

The tier opened on 2026-08-23 with this project in its table and a
`.gitkeep` in its directory, but nothing had ever been harvested from
it. It is the framework's first real deployment and carries the longest
upgrade history on record.

## The project

The AI Jam Exhibition System (v2): a live, multi-artist,
audience-driven art-jam system for a gallery exhibition — audience
submissions from phones, moderation, artist and display surfaces, show
controls. A v1 codebase is preserved as the `v1-final` tag.

## The deployment

| Fact | Value |
| --- | --- |
| Framework | canon 4.6.0 |
| Installed | `a089018`, 2026-05-03 00:42 +0100, 'v2 init: clean slate + PM-Skills installed and populated' — the tree before version numbers |
| Upgrades | `bdfbcbc` 1.0.0 (05-29), `b5c2e86` 1.1.0 (05-31), `7e76d37` 2.0.0 (06-01), `61b3d8c` 2.1.0 (06-04), `8f26869` 2.7.3 (06-19), `15dfabe` 3.1.0 and `50c56fe` 3.1.1 (both 07-04), `7f32957` 4.6.0 (08-17) |
| Records mode | adopted by `a7e6999`, 2026-08-17 |
| Rulebooks | `AGENTS.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md`, `PROCESS.md`, `README.md`, `SPEC.md`, `project_manual.md` |
| Harness | Codex only among the readable stores; no Claude Code directory; Windsurf's workspace list names the former folder |
| HEAD at the cut-off | `fc4df64` (2026-08-17 16:38 +01:00), 35 refs |
| Working tree at harvest | 277 status lines before the harvest read anything |

## History

154 commits from 2026-02-28 16:13 UTC to 2026-08-17 16:38 +01:00; 23 subjects open with an item ID, 13 bodies carry a `Verify:` line, 1 a co-author trailer; 1 author identity.

## Memory at the snapshot

- `pm_skills/project/` — 129 files, 3,071,038 bytes; largest outside archives and records: `file-map.md` 78,936, `decision-log.md` 61,445, `trajectory.md` 21,018, `conventions.md` 13,589, `architecture.md` 12,432, `backlog.md` 11,647.

## Tools and framework changes

The project's own memory tools, run on a clean archive of the frozen HEAD under a write-confining sandbox: `node scripts/gen-backlog.mjs --check` exit 0.

Framework changes filed as `upgrade` reports:

- `2026-05-29-upgrade.md` — Framework upgrade to 1.0.0, `bdfbcbc54557` on 2026-05-29.
- `2026-05-31-upgrade.md` — Framework upgrade 1.0.0 → 1.1.0, `b5c2e866ec30` on 2026-05-31.
- `2026-06-01-upgrade.md` — Framework upgrade 1.1.0 → 2.0.0, `7e76d3773f6f` on 2026-06-01.
- `2026-06-04-upgrade.md` — Framework upgrade 2.0.0 → 2.1.0, `61b3d8c0d7f3` on 2026-06-04.
- `2026-06-19-upgrade.md` — Framework upgrade 2.1.0 → 2.7.3, `8f268690d237` on 2026-06-19.
- `2026-07-04-upgrade-3-1-0.md` — Framework upgrade 2.7.3 → 3.1.0, `15dfabe306d8` on 2026-07-04.
- `2026-07-04-upgrade-3-1-1.md` — Framework upgrade 3.1.0 → 3.1.1, `50c56fe7fdf1` on 2026-07-04.
- `2026-08-17-upgrade-4-6-0.md` — Framework upgrade 3.1.1 → 4.6.0, `7f32957d3674` on 2026-08-17.
- `2026-08-17-upgrade-records-mode.md` — Records mode adopted, `a7e6999a65b0` on 2026-08-17.

## The former folder

63 Codex rollouts (2026-04-24 to 06-19) ran in `…/Nottingham Contempory AI Exhibition/Windsurf`, a folder that still holds the Hub's runtime directories but no repository. The rollouts' own Git metadata name this repository, on the branches `master` and `wip/live-show-fixes-2026-06-04`; they are filed here. The second witness at Checkpoint A read that folder as unmarked; the metadata settled it.

## Not taken

`archive_sessions/`, `sessions/`, `recordings/` and `_user files/` in the checkout are the application's runtime data — show archives written by `scripts/reset-hard.sh`, logs and recordings, per the project's `.gitignore` — not agent session records, and they carry audience content. They were left out.

## The review of 2026-08-26

A Codex read-only review of the Hub and the Corperate Image Generator, written into the exhibition folder, is filed as `local/2026-08-26-export-review-artefacts.md`; the 18 rollouts of the run that wrote it are in the session archive. It lists security findings, which is why it stays local.

## Sessions

`local/2026-09-24-sessions.tar.gz` — 102 files, 109.4 MB uncompressed, 31.0 MB compressed; 0 log(s) cut at the cut-off, 0 side file(s) written after it left out.

| Store | Attributed | Taken this run |
| --- | ---: | ---: |
| Claude Code | 0 | 0 |
| Codex, live and archived | 94 + 8 | 102 |

Codex rollouts taken, by kind: 87 interactive, 5 guardian auto-review, 10 spawned thread.

Model mix across every attributed session:

| Harness · model | Sessions |
| --- | ---: |
| Codex · gpt-5.5 | 80 |
| Codex · gpt-5.6-sol | 13 |
| Codex · auto-review | 4 |
| Codex · gpt-5.4 | 4 |
| Codex · no model recorded (imports, spawned threads) | 1 |

The secrets scan found credential-shaped values in 3 archived member(s) — named in the manifest, values not reproduced; the archive is byte-verbatim and local.

## History bundle

`local/2026-08-17-repo.bundle` — 749.3 MB, every ref the checkout carried at the cut-off (35), verified in an empty repository. It is 749 MB because refs other than `main` carry video files that were committed and later removed — show recordings and demonstration media; `main` alone bundles to 35 MB.

## Where things are

- Tracked: this note only.
- Local: `2026-05-03-export-init-prompt.md`, `2026-05-29-upgrade.md`, `2026-05-31-upgrade.md`, `2026-06-01-upgrade.md`, `2026-06-04-upgrade.md`, `2026-06-19-upgrade.md`, `2026-07-04-upgrade-3-1-0.md`, `2026-07-04-upgrade-3-1-1.md`, `2026-08-17-export-git-log.md`, `2026-08-17-export-memory.md`, `2026-08-17-export-rulebooks.md`, `2026-08-17-export-state.md`, `2026-08-17-repo.bundle` (749.3 MB), `2026-08-17-upgrade-4-6-0.md`, `2026-08-17-upgrade-records-mode.md`, `2026-08-26-export-review-artefacts.md`, `2026-09-24-export-bundle-manifest.md`, `2026-09-24-export-inventory.md`, `2026-09-24-export-prompts.md`, `2026-09-24-sessions-manifest.md`, `2026-09-24-sessions.tar.gz` (31.0 MB), `2026-09-24-validator.md`.

## What to compare later

- The eight upgrade commits against the CHANGELOG entries of the releases they took, one by one.
- The records-mode adoption of 2026-08-17 against canon's records mode as released.
- The 2026-07-16 case study frozen in this repository's pre-adoption archive against the evidence now filed.
