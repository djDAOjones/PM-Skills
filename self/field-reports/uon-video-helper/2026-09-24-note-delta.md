<!-- field-report: project=uon-video-helper · date=2026-09-24 · type=note
     · pm-skills=4.9.2 (installed as 4.6.0 by f46bcf0 on 2026-08-24 and reinstalled as 4.9.2 by 92e9791 the same day; never upgraded since)
     · source=harvested from the maintainer's checkout and the Claude Code, Codex and Windsurf stores by Claude Code (self/FIELD-HARVEST.md, run of 2026-09-24, capture cut-off 2026-09-24T11:40:00Z)
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note
     · retained=names already present in the public repository; this delta's exports are in the local lane because the exported HEAD is not on the public remote -->

# Delta note — UoN Video Helper, 2026-09-24

The refresh of this directory's archive since the 2026-08-27 harvest.
The repository is public, but the exported HEAD is on a branch that is
not on the remote, so every export of this delta is in `local/`.
Everything below is an observed fact recorded at harvest time; nothing
here is an evaluation.

## Why now

18 commits since the filed snapshot, on a branch the remote does not
have; 51 sessions no archive held; and 40 filed sessions whose byte
count had changed in the store.

## The project

A browser-only app that brands, loudness-normalises and encodes an
educational video.

## The deployment

| Fact | Value |
| --- | --- |
| Framework | canon 4.9.2, unchanged since the reinstall `92e9791` of 2026-08-24 |
| Branch at HEAD | `codex/repository-review-remediation` — `c346581`, 2026-09-21 10:17 +0100, not on the public remote |
| Last filed cut-off | `09702c2` — the snapshot the 2026-08-27 exports name in their bodies (the tier README gave `a3c070a`, that harvest's starting HEAD; corrected in the same change) |
| `.git` | 1,820 cloud-only objects when first counted; every object read went through a scratch clone of the remote plus the checkout's own refs |
| HEAD at the cut-off | `c346581` (2026-09-21 10:17 +01:00), 15 refs |
| Working tree at harvest | 0 status lines before the harvest read anything |

## History

129 commits from 2026-08-24 17:10 +01:00 to 2026-09-21 10:17 +01:00; 69 subjects open with an item ID, 23 bodies carry a `Verify:` line, 99 a co-author trailer; 2 author identities.

Since the filed cut-off `09702c2`: 18 commits; 61 files changed, 3572 insertions(+), 921 deletions(-); memory — pm_skills/project: 7 files changed, 726 insertions(+), 336 deletions(-).

## Memory at the snapshot

- `pm_skills/project/` — 18 files, 267,140 bytes; largest outside archives and records: `decision-log.md` 67,236, `file-map.md` 22,086, `backlog.md` 17,774, `architecture.md` 15,039, `trajectory.md` 12,337, `brief.md` 6,878.

## Tools and framework changes

No memory tool in the tree (`scripts/check-build.mjs` and `check-placeholders.mjs` check the product); nothing was run.

## The store rewrote filed rollouts

Codex has rewritten its session store in place since the 2026-08-27 harvest: every one of the 1,720 rollouts on this machine now carries a per-line `ordinal` field, and the rewritten files keep their original modification times. Of this project's 40 filed sessions whose byte count changed, 36 are Codex rollouts the store rewrote — the same number of lines, the filed copy no longer a prefix — 33 of them larger and three far smaller (3,136,900 → 719,728; 3,335,169 → 773,359; 11,467,079 → 973,835 bytes). Four were genuinely extended: two Claude Code sessions and two Codex threads. This delta takes the current versions and labels every such row against its filed copy; the 2026-08-27 archive keeps the originals, and for the three shrunk rollouts it holds the only full copies.

## Sessions

`local/2026-09-24-sessions.tar.gz` — 166 files, 309.7 MB uncompressed, 73.7 MB compressed; 0 log(s) cut at the cut-off, 0 side file(s) written after it left out.

| Store | Attributed | Taken this run |
| --- | ---: | ---: |
| Claude Code | 14 | 4 |
| Codex, live and archived | 47 + 43 | 87 |

Codex rollouts taken, by kind: 12 Codex Desktop import (mirror of a Claude Code chat; no model turns), 27 guardian auto-review, 6 interactive, 42 spawned thread.

Model mix across every attributed session:

| Harness · model | Sessions |
| --- | ---: |
| Codex · gpt-5.6-sol | 50 |
| Codex · auto-review | 25 |
| Codex · no model recorded (imports, spawned threads) | 15 |
| Claude Code · claude-opus-5 | 13 |
| Claude Code · claude-fable-5 | 1 |

The secrets scan found credential-shaped values in 1 archived member(s) — named in the manifest, values not reproduced; the archive is byte-verbatim and local.

## History bundle

`local/2026-09-21-repo.bundle` — 2.4 MB, every ref the checkout carried at the cut-off (15), verified in an empty repository; 4 Codex turn-diff checkpoint ref(s) could not be preserved (the checkout's own store cannot supply the objects they name) and are recorded by name in the bundle manifest.

## Where things are

- Tracked: this note only.
- Local: `2026-09-21-export-git-log.md`, `2026-09-21-export-memory.md`, `2026-09-21-export-rulebooks.md`, `2026-09-21-export-state.md`, `2026-09-21-repo.bundle`, `2026-09-24-export-agent-memory.md`, `2026-09-24-export-bundle-manifest.md`, `2026-09-24-export-inventory.md`, `2026-09-24-export-prompts.md`, `2026-09-24-sessions-manifest.md`, `2026-09-24-sessions.tar.gz` (73.7 MB).

## What to compare later

- The 18 commits on the unpushed remediation branch against the review the branch answers.
- The three rollouts the store shrank: what the 2026-08-27 copies hold that the store no longer does.
