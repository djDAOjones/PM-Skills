<!-- field-report: project=pattern-mapper · date=2026-09-24 · type=note
     · pm-skills=pm-next-v2 (lab at c6d8198, V2-SELFHOST of 2026-09-15; adopted by INTAKE 24c9e93 on 2026-09-16; no canon release governs it); the canon 4.0.0 tree remains in pm_skills/
     · source=harvested from the maintainer's checkout and the Claude Code, Codex and Windsurf stores by Claude Code (self/FIELD-HARVEST.md, run of 2026-09-24, capture cut-off 2026-09-24T11:40:00Z)
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note
     · retained=names already present in the public repository; this delta's exports are in the local lane because the intake commit is not on the public remote -->

# Delta note — Pattern Mapper, 2026-09-24

The refresh of this directory's archive since the baseline of
2026-09-16. The repository is public, but the intake commit is not on
the remote, so every export of this delta is in `local/`.
Everything below is an observed fact recorded at harvest time; nothing
here is an evaluation.

## Why now

The pm-next v2 intake landed on 2026-09-16 (`24c9e93`, 11:03 +0100),
about an hour after the baseline was filed; eight Codex rollouts sat in
the archived-sessions store no harvest had read.

## The project

A web app that converts artwork into cross-stitch designs in real
time; the largest canon deployment in the tier before this intake.

## The deployment

| Fact | Value |
| --- | --- |
| Framework | pm-next v2, from the lab at `c6d8198` (provenance: `project/migration.md`), beside the retained canon 4.0.0 tree |
| Intake | `24c9e93`, 2026-09-16 11:03 +0100, 'INTAKE: adopt V2 records with harness verification pending', by a Codex thread started from the canon checkout at 09:07 UTC ('Migrate Pattern Mapper to PM-Skills V2 autonomously, preserving its product rules, work ordering and existing owner acceptance requirements…'), the longest of the six (to 10:05 UTC); not pushed |
| Uncommitted at harvest | `.codex/config.toml` modified and `.codex/hooks.json` untracked — exported as a working-tree snapshot |
| `.git` | 767 cloud-only objects when first counted |
| HEAD at the cut-off | `24c9e93` (2026-09-16 11:03 +01:00), 13 refs |
| Working tree at harvest | 2 status lines before the harvest read anything |

## History

217 commits from 2026-07-17 09:34 +01:00 to 2026-09-16 11:03 +01:00; 51 subjects open with an item ID, 86 bodies carry a `Verify:` line, 167 a co-author trailer; 1 author identity.

Since the filed cut-off `348eb16`: 1 commit; 106 files changed, 10734 insertions(+), 697 deletions(-); memory — project: 78 files changed, 9559 insertions(+); pm_skills/project: no change.

## Memory at the snapshot

- `project/` — 78 files, 1,619,417 bytes; largest outside archives and records: `view.html` 220,647, `history/prose-map.json` 62,337, `history/index.md` 40,063, `rules.md` 27,926, `history/trajectory-map.json` 18,844, `architecture.md` 15,165.
- `pm_skills/project/` — 34 files, 802,086 bytes; largest outside archives and records: `decision-log.md` 125,716, `file-map.md` 44,155, `backlog.md` 28,373, `trajectory.md` 16,321, `architecture.md` 15,165, `doc-deltas.md` 6,692.

## Tools and framework changes

The project's own memory tools, run on a clean archive of the frozen HEAD under a write-confining sandbox: `node tools/check.mjs` exit 0 (9 warnings).

Framework changes filed as `upgrade` reports:

- `2026-09-16-upgrade.md` — Intake to pm-next v2 (records, harness verification pending), `24c9e9300965` on 2026-09-16; validator: `node tools/check.mjs` after the change exit 0.

## Sessions

`local/2026-09-24-sessions.tar.gz` — 11 files, 27.6 MB uncompressed, 7.2 MB compressed; 0 log(s) cut at the cut-off, 0 side file(s) written after it left out.

| Store | Attributed | Taken this run |
| --- | ---: | ---: |
| Claude Code | 75 | 0 |
| Codex, live and archived | 58 + 8 | 11 |

Codex rollouts taken, by kind: 3 interactive, 2 guardian auto-review, 6 spawned thread.

The agent's own memory is unchanged since the 2026-08-27 export and is not repeated.

Model mix across every attributed session:

| Harness · model | Sessions |
| --- | ---: |
| Claude Code · claude-fable-5 | 49 |
| Codex · no model recorded (imports, spawned threads) | 35 |
| Codex · gpt-5.6-sol | 20 |
| Claude Code · claude-opus-5 | 19 |
| Claude Code · claude-opus-4-8 | 7 |
| Codex · auto-review | 6 |
| Codex · gpt-5.5 | 4 |
| Codex · gpt-6-astra | 1 |

The secrets scan found credential-shaped values in 1 archived member(s) — named in the manifest, values not reproduced; the archive is byte-verbatim and local.

## History bundle

`local/2026-09-16-repo.bundle` — 9.4 MB, every ref the checkout carried at the cut-off (13), verified in an empty repository; 3 Codex turn-diff checkpoint ref(s) could not be preserved (the checkout's own store cannot supply the objects they name) and are recorded by name in the bundle manifest.

## Where things are

- Tracked: this note only.
- Local: `2026-09-16-export-git-log.md`, `2026-09-16-export-memory-pm-skills-project.md`, `2026-09-16-export-memory-project.md`, `2026-09-16-export-rulebooks.md`, `2026-09-16-export-state.md`, `2026-09-16-repo.bundle` (9.4 MB), `2026-09-16-upgrade.md`, `2026-09-24-export-bundle-manifest.md`, `2026-09-24-export-inventory.md`, `2026-09-24-export-prompts.md`, `2026-09-24-export-working-tree-snapshot.md`, `2026-09-24-sessions-manifest.md`, `2026-09-24-sessions.tar.gz` (7.2 MB), `2026-09-24-validator.md`.

## What to compare later

- The 78 files the intake wrote under `project/` (1,619,417 bytes, most of it the records it mapped) against the canon memory it left unchanged.
- Whether 'harness verification pending' closes, and in which commit.
