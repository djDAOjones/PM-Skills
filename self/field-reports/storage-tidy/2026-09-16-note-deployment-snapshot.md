<!-- field-report: project=storage-tidy · date=2026-09-16 · type=note
     · pm-skills=pm-next-v0.2 (lab/next byte-identical to the lab at 7415e8b, its last change; installed 2026-09-11; converted to pm-next v2 by INTAKE 267e031 on 2026-09-16)
     · source=harvested from the maintainer's checkout and the Claude Code and Codex session logs by Claude Code
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note; drive and folder names stay in the local lane
     · retained=public name Joe -->

# Deployment snapshot — Storage Tidy (pm-next v0.2, then the first v2 intake)

The orientation file for this project's directory, and the only file
of it in the tracked lane: the source repository
(`djDAOjones/storage-tidy`) is **private**, so every export, the
upgrade report, the bundle and the session archive sit in `local/`.
Everything below is an observed fact recorded at harvest time;
nothing here is an evaluation.

Two things are filed here. The project is the **third real run of
pm-next v0.2**, after `vinyl-sorting` and `ebay-tool`; it was created
on the prototype rather than converted to it. And its INTAKE commit,
made the morning of the harvest, is the **first conversion of a
pm-next v0.2 project to pm-next v2** on record, so the harvest takes
the pre-intake commit as the v0.2 snapshot and files the intake
itself as an `upgrade` report.

## The project

A filing system for the maintainer's own storage: a catalogue and
scanner across a Mac, cloud drives and external drives, duplicate
detection, filing-path rules, quarantine batches with a purge that
survives a folder an application is still writing to, a local review
interface, and a move command that copies, verifies every file and
holds the source. Built and operated on the maintainer's real data
over three days.

## The pm-next v0.2 run

| Fact | Value |
| --- | --- |
| Installed | 2026-09-11 14:28 +0100, first commit `0c0413d`: "first commit with pm-next install, brief, discovery notes and the filing-system proposal" |
| Source of the copy | `lab/next/`; the three state tools, the records server and `curricula.md` are byte-identical to the lab's last change to that tree (`7415e8b`, 2026-08-30); `AGENTS.md` differs from the template by the project name only |
| Harness | Claude Code, `claude-fable-5-1`; 5 sessions, 2026-09-11 to 2026-09-16; Codex Desktop holds 5 imported mirrors of them and no model turns |
| Stream | 19 commits, 2026-09-11 14:28 to 2026-09-13 23:15 (+0100); item IDs on every subject (P0-*, P1-*, FILING-*, DESTINATION-OPTIONS); `Verify:` on 19 of 19 bodies; 19 `Co-Authored-By` trailers |
| Memory at `eb96fbc` | four open records plus `_meta.md`; brief, backlog view, decision log, trajectory, wish-list; two project docs (the filing-system proposal and the destination options paper) |
| Validators at `eb96fbc` | `check-memory` exit 0; `gen-backlog --check` matches (run on a clean archive) |
| Janitor | the project's own report of 2026-09-15 22:27 UTC, copied as left |

## The intake to pm-next v2

Commit `267e031`, 2026-09-16 09:35 +0100, "INTAKE: adopt the
approved V2 ledger", not yet pushed at harvest. Its own message:
"Preserve the complete brief, existing IDs and domain rules; record
Joe's approval, expose inherited deferrals, and install reviewed
closed/intake harness profiles. No application code or catalogue
operations changed."

What the commit did, from its stat:

- Moved the whole pre-v2 installation verbatim under
  `project/archive/pre-v2/`: contract, curricula, brief, backlog,
  decision log, four records, trajectory, wish-list and the four
  tools.
- Wrote an adoption record under `project/adoption/`: `approval.md`,
  `prose-map.md`, `record-map.json` (12 KB, the record-to-item map)
  and `verification.md`.
- Wrote the v2 ledger: `profile.md`, a 17 KB `brief.md`, a 26 KB
  `decisions.md`, `project-rules.md`, `digest-proposals.md`,
  `structure.md`, four items, and the regenerated backlog,
  trajectory and wish-list.
- Installed the v2 tools and verbs, a 174-line-shorter `AGENTS.md`,
  a one-line `CLAUDE.md`, and closed and intake harness settings for
  Claude Code and Codex.

The v2 validator, run at harvest on a clean archive of the intake
commit: 0 structural failures, 2 warnings — the brief at 2,718 words
against a 300-word guideline, and an item naming a local path outside
the repository. Its own summary: 4 open, 10 shipped, 21 live
decisions, a first-session read estimate of 5,840 words.

The maintainer's status line for this project at harvest read
"unsigned candidate; 16 tests passed". The commit records an
approval; whether the profile carries the owner's signature line is
visible in the local upgrade export.

## What the baseline preserves (all in `local/`)

- `2026-09-13-export-memory.md`, `-export-rulebooks.md`,
  `-export-state.md`, `-export-git-log.md` — the v0.2 run at its
  last commit.
- `2026-09-11-export-init-prompt.md` — every maintainer prompt of the
  five sessions, and the brief and milestone intents as first
  committed.
- `2026-09-16-validator.md`, `2026-09-15-janitor.md`.
- `2026-09-16-upgrade.md` — the intake commit, the adoption record,
  the new ledger files and the v2 validator run.
- `2026-09-13-repo.bundle` — the whole history including the unpushed
  intake commit, verified.
- `2026-09-13-export-agent-memory.md` (6 files) and
  `2026-09-16-sessions.tar.gz` — 20 files, 16 MB, 4.9 MB compressed.

## What to compare after

- The record-map against the archived records: what the map carried,
  merged or dropped, item by item.
- The 26 KB of decisions written at intake for a 19-commit project,
  against the v0.2 decision log it archived.
- Whether the brief warning is cleared by trimming or by a changed
  guideline.
- What the next ten commits on the v2 ledger look like against the
  nineteen on v0.2: close fidelity, view regeneration, steering.
