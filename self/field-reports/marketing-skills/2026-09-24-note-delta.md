<!-- field-report: project=marketing-skills · date=2026-09-24 · type=note
     · pm-skills=pm-next-v2 (lab at c6d8198, V2-SELFHOST of 2026-09-15; adopted by INTAKE 889b65f on 2026-09-16; no canon release governs it)
     · source=harvested from the maintainer's checkout and the Claude Code, Codex and Windsurf stores by Claude Code (self/FIELD-HARVEST.md, run of 2026-09-24, capture cut-off 2026-09-24T11:40:00Z)
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note
     · retained=project and tool names only; every export of this delta is in the local lane -->

# Delta note — Marketing Skills, 2026-09-24

The refresh of this directory's archive since the pre-adoption
baseline of 2026-09-16. The repository has no remote; every export of
this delta is in `local/`, and its bundle is the only copy of the
history outside the checkout.
Everything below is an observed fact recorded at harvest time; nothing
here is an evaluation.

## Why now

The intake finished on 2026-09-16 (`889b65f`, 10:25 +0100) after the
baseline was filed; the baseline recorded the intake as in flight.

## The project

A marketing knowledge corpus, an advice-framework scaffold built to
consume it, and a poster research pack; only the scaffold,
`marketing-skills/`, became a repository.

## The deployment

| Fact | Value |
| --- | --- |
| Framework | pm-next v2 for development, from the lab at `c6d8198` (provenance: `project/adoption/PROVENANCE.md`) |
| History | two commits, both made by the intake: `fddd691` BASELINE (10:14 +0100) and `889b65f` INTAKE (10:25 +0100), by a Codex thread started from the canon checkout at 09:07 UTC ('Install PM-Skills V2 as the development-management layer for marketing-skills. Work autonomously through a local commit…') |
| The rest of the folder | the two sibling corpora are unchanged since the 2026-09-16 inventory by path and size; only `marketing-skills/` moved |
| HEAD at the cut-off | `889b65f` (2026-09-16 10:25 +01:00), 1 refs |
| Working tree at harvest | 0 status lines before the harvest read anything |

## History

2 commits from 2026-09-16 10:14 +01:00 to 2026-09-16 10:25 +01:00; 2 subjects open with an item ID, 2 bodies carry a `Verify:` line, 0 a co-author trailer; 1 author identity.

## Memory at the snapshot

- `project/` — 17 files, 35,871 bytes; largest outside archives and records: `adoption/baseline-manifest.json` 8,033, `adoption/SOURCE-MANIFEST.json` 4,794, `adoption/VALIDATION.md` 3,879, `decisions.md` 2,854, `profile.md` 2,303, `digests/_schema.md` 1,894.

## Tools and framework changes

The project's own memory tools, run on a clean archive of the frozen HEAD under a write-confining sandbox: `node tools/check.mjs` exit 0.

Framework changes filed as `upgrade` reports:

- `2026-09-16-upgrade.md` — Intake to pm-next v2 (development only), after a git baseline, `889b65f344fa` on 2026-09-16; validator: `node tools/check.mjs` after the change exit 0.

## Sessions

`local/2026-09-24-sessions.tar.gz` — 2 files, 2.4 MB uncompressed, 0.5 MB compressed; 0 log(s) cut at the cut-off, 0 side file(s) written after it left out.

| Store | Attributed | Taken this run |
| --- | ---: | ---: |
| Claude Code | 1 | 0 |
| Codex, live and archived | 21 + 0 | 2 |

Codex rollouts taken, by kind: 1 interactive, 1 guardian auto-review.

The agent's own memory is unchanged since the 2026-09-08 export and is not repeated.

Model mix across every attributed session:

| Harness · model | Sessions |
| --- | ---: |
| Codex · gpt-6-astra | 13 |
| Codex · auto-review | 7 |
| Claude Code · claude-fable-5-1 | 1 |
| Codex · no model recorded (imports, spawned threads) | 1 |

The secrets scan found credential-shaped values in 1 archived member(s) — named in the manifest, values not reproduced; the archive is byte-verbatim and local.

## History bundle

`local/2026-09-16-repo.bundle` — 0.1 MB, every ref the checkout carried at the cut-off (1), verified in an empty repository.

## Where things are

- Tracked: this note only.
- Local: `2026-09-16-export-git-log.md`, `2026-09-16-export-memory.md`, `2026-09-16-export-rulebooks.md`, `2026-09-16-export-state.md`, `2026-09-16-repo.bundle`, `2026-09-16-upgrade.md`, `2026-09-24-export-bundle-manifest.md`, `2026-09-24-export-inventory.md`, `2026-09-24-export-prompts.md`, `2026-09-24-sessions-manifest.md`, `2026-09-24-sessions.tar.gz`, `2026-09-24-validator.md`.

## What to compare later

- The adoption record under `project/adoption/` against the pre-adoption inventory of 2026-09-16.
- The first commits after the intake: whether they come from Codex, Claude Code or neither.
