<!-- field-report: project=personal-finance · date=2026-09-24 · type=note
     · pm-skills=pm-next-v2 (lab at c6d8198, V2-SELFHOST of 2026-09-15; adopted by INTAKE 602e28a on 2026-09-16; no canon release governs it)
     · source=harvested from the maintainer's checkout and the Claude Code, Codex and Windsurf stores by Claude Code (self/FIELD-HARVEST.md, run of 2026-09-24, capture cut-off 2026-09-24T11:40:00Z)
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note
     · retained=project and tool names only; no household figure; every export of this delta is in the local lane -->

# Delta note — Personal Finance, 2026-09-24

The refresh of this directory's archive since the pre-adoption
baseline of 2026-09-16. The repository has no remote; every export of
this delta is in `local/`, and its bundle is the only copy of the
history outside the checkout.
Everything below is an observed fact recorded at harvest time; nothing
here is an evaluation.

## Why now

The intake landed on 2026-09-16 (`602e28a`, 10:24 +0100), after the
baseline was filed; three rollouts of the producing Codex thread had
changed in the store since.

## The project

A research corpus and one pilot skill for the maintainer's own
household, produced by a single Codex thread; the v0.3 folder became a
repository at the intake.

## The deployment

| Fact | Value |
| --- | --- |
| Framework | pm-next v2 for corpus development, from the lab at `c6d8198` (provenance under `project/migration/`) |
| History | two commits, both made by the intake in `personal-finance-v0.3/`: `dd44cb1` BASELINE (10:10 +0100) and `602e28a` INTAKE (10:24 +0100), by a Codex thread started from the canon checkout at 09:07 UTC ('Install PM-Skills V2 for the development of my current Personal Finance corpus and cash-flow skill. Complete the migration autonomously…') |
| The rest of the folder | every file of the 2026-09-16 inventory is present at the same size; the only additions are the intake's own files inside `personal-finance-v0.3/` |
| HEAD at the cut-off | `602e28a` (2026-09-16 10:24 +01:00), 1 refs |
| Working tree at harvest | 0 status lines before the harvest read anything |

## History

2 commits from 2026-09-16 10:10 +01:00 to 2026-09-16 10:24 +01:00; 2 subjects open with an item ID, 2 bodies carry a `Verify:` line, 0 a co-author trailer; 1 author identity.

## Memory at the snapshot

- `project/` — 30 files, 89,238 bytes; largest outside archives and records: `migration/baseline-files.json` 28,033, `view.html` 13,067, `migration/source-installation.json` 6,297, `migration/report.md` 5,295, `migration/source-manifest.json` 4,794, `framework/README.md` 4,228.

## Tools and framework changes

The project's own memory tools, run on a clean archive of the frozen HEAD under a write-confining sandbox: `node tools/check.mjs` exit 0.

Framework changes filed as `upgrade` reports:

- `2026-09-16-upgrade.md` — Intake to pm-next v2 for corpus development, after a git baseline, `602e28aa343e` on 2026-09-16; validator: `node tools/check.mjs` after the change exit 0.

## Sessions

`local/2026-09-24-sessions.tar.gz` — 5 files, 3.3 MB uncompressed, 0.8 MB compressed; 0 log(s) cut at the cut-off, 0 side file(s) written after it left out.

| Store | Attributed | Taken this run |
| --- | ---: | ---: |
| Claude Code | 1 | 0 |
| Codex, live and archived | 25 + 0 | 5 |

Codex rollouts taken, by kind: 4 guardian auto-review, 1 interactive.

The three changed rollouts belong to the producing thread, whose working directory was the Parenting Research folder; the earlier harvest filed them here by thread linkage. All three were rewritten by the store (Codex's in-place format change — same lines, the filed copy no longer a prefix), not resumed. The agent's own memory is unchanged since the 2026-09-08 export and is not repeated.

Model mix across every attributed session:

| Harness · model | Sessions |
| --- | ---: |
| Codex · gpt-6-astra | 19 |
| Codex · auto-review | 5 |
| Claude Code · claude-fable-5-1 | 1 |
| Codex · no model recorded (imports, spawned threads) | 1 |

The secrets scan found credential-shaped values in 1 archived member(s) — named in the manifest, values not reproduced; the archive is byte-verbatim and local.

## History bundle

`local/2026-09-16-repo.bundle` — 0.4 MB, every ref the checkout carried at the cut-off (1), verified in an empty repository.

## Where things are

- Tracked: this note only.
- Local: `2026-09-16-export-git-log.md`, `2026-09-16-export-memory.md`, `2026-09-16-export-rulebooks.md`, `2026-09-16-export-state.md`, `2026-09-16-repo.bundle`, `2026-09-16-upgrade.md`, `2026-09-24-export-bundle-manifest.md`, `2026-09-24-export-inventory.md`, `2026-09-24-export-prompts.md`, `2026-09-24-sessions-manifest.md`, `2026-09-24-sessions.tar.gz`, `2026-09-24-validator.md`.

## What to compare later

- The migration records under `project/migration/` against the 2026-09-16 inventory.
- Whether the corpus's own validators and the v2 validator agree after the intake.
