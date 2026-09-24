<!-- field-report: project=ebay-tool · date=2026-09-24 · type=note
     · pm-skills=pm-next-v2 (lab at c6d8198, V2-SELFHOST of 2026-09-15; adopted by V2-MIGRATE f800a63 on 2026-09-16; no canon release governs it); the v0.2 memory archived under project/archive/pre-v2/
     · source=harvested from the maintainer's checkout and the Claude Code, Codex and Windsurf stores by Claude Code (self/FIELD-HARVEST.md, run of 2026-09-24, capture cut-off 2026-09-24T11:40:00Z)
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note
     · retained=project and tool names only; every export of this delta is in the local lane -->

# Delta note — eBay Tool, 2026-09-24

The refresh of this directory's archive since the 2026-09-09 harvest.
The repository is private; every export of this delta is in `local/`.
Everything below is an observed fact recorded at harvest time; nothing
here is an evaluation.

## Why now

The conversion from pm-next v0.2 to v2 landed on 2026-09-16
(`f800a63`, 10:25 +0100), after the last harvest.

## The project

A private, local-first comparison table over saved listing evidence,
built by Codex; the second pm-next v0.2 run and now the second
v0.2-to-v2 conversion on record, after Storage Tidy.

## The deployment

| Fact | Value |
| --- | --- |
| Framework | pm-next v2, from the lab at `c6d8198` (provenance: `V2-MIGRATION.md`) |
| Conversion | `f800a63`, 2026-09-16 10:25 +0100, 'V2-MIGRATE: adopt PM-Skills V2 with preserved eBay history', by a Codex thread started from the canon checkout at 09:06 UTC ('Migrate eBay Tool to PM-Skills V2 and complete the work autonomously…'); not pushed |
| Before | pm-next v0.2 (lab/next at `530637a`), its memory archived under `project/archive/pre-v2/` |
| HEAD at the cut-off | `f800a63` (2026-09-16 10:25 +01:00), 7 refs |
| Working tree at harvest | 0 status lines before the harvest read anything |

## History

16 commits from 2026-08-30 10:01 +01:00 to 2026-09-16 10:25 +01:00; 16 subjects open with an item ID, 16 bodies carry a `Verify:` line, 0 a co-author trailer; 1 author identity.

Since the filed cut-off `550ece7`: 1 commit; 49 files changed, 2419 insertions(+), 155 deletions(-); memory — project: 29 files changed, 1866 insertions(+), 27 deletions(-).

## Memory at the snapshot

- `project/` — 29 files, 159,422 bytes; largest outside archives and records: `decisions.md` 23,377, `brief.md` 21,288, `trajectory.md` 2,929, `profile.md` 2,059, `digests/_schema.md` 1,894, `structure.md` 1,469.

## Tools and framework changes

The project's own memory tools, run on a clean archive of the frozen HEAD under a write-confining sandbox: `node tools/check.mjs` exit 0 (1 warning).

Framework changes filed as `upgrade` reports:

- `2026-09-16-upgrade.md` — Conversion from pm-next v0.2 to v2, `f800a631aa28` on 2026-09-16; validator: `node tools/check-memory.mjs` before the change exit 0; `node tools/check.mjs` after the change exit 0.

## Sessions

`local/2026-09-24-sessions.tar.gz` — 2 files, 2.8 MB uncompressed, 0.5 MB compressed; 0 log(s) cut at the cut-off, 0 side file(s) written after it left out.

| Store | Attributed | Taken this run |
| --- | ---: | ---: |
| Claude Code | 0 | 0 |
| Codex, live and archived | 115 + 0 | 2 |

Codex rollouts taken, by kind: 1 interactive, 1 guardian auto-review.

Model mix across every attributed session:

| Harness · model | Sessions |
| --- | ---: |
| Codex · gpt-5.6-sol | 53 |
| Codex · no model recorded (imports, spawned threads) | 43 |
| Codex · auto-review | 18 |
| Codex · gpt-6-astra | 1 |

The secrets scan found credential-shaped values in 1 archived member(s) — named in the manifest, values not reproduced; the archive is byte-verbatim and local.

## History bundle

`local/2026-09-16-repo.bundle` — 1.5 MB, every ref the checkout carried at the cut-off (7), verified in an empty repository.

## Where things are

- Tracked: this note only.
- Local: `2026-09-16-export-git-log.md`, `2026-09-16-export-memory.md`, `2026-09-16-export-rulebooks.md`, `2026-09-16-export-state.md`, `2026-09-16-repo.bundle`, `2026-09-16-upgrade.md`, `2026-09-24-export-bundle-manifest.md`, `2026-09-24-export-inventory.md`, `2026-09-24-export-prompts.md`, `2026-09-24-sessions-manifest.md`, `2026-09-24-sessions.tar.gz`, `2026-09-24-validator.md`.

## What to compare later

- The v2 ledger against the v0.2 records archived under `project/archive/pre-v2/`: carried, merged, dropped.
- The v0.2 validator before the conversion against the v2 validator after it (both in the upgrade report).
