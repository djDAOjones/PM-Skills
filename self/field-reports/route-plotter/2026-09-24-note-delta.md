<!-- field-report: project=route-plotter · date=2026-09-24 · type=note
     · pm-skills=4.7.0 (installed fresh by 599407f on 2026-08-17 with memory ported from the v2 line; never upgraded since)
     · source=harvested from the maintainer's checkouts and the Claude Code, Codex and Windsurf stores by Claude Code (self/FIELD-HARVEST.md, run of 2026-09-24, capture cut-off 2026-09-24T11:40:00Z)
     · redaction=absolute paths written as <checkout> and <home>; no e-mail addresses or credential-shaped values appear in this note
     · retained=names already present in the public repository -->

# Delta note — Route Plotter, 2026-09-24

The refresh of this directory's archive since the 2026-08-27 harvest.
Everything below is an observed fact recorded at harvest time; nothing
here is an evaluation. The memory, rulebook, state, git-log and
inventory exports of this delta sit in the tracked lane, because the
exported HEAD (`989f11d`) is on the public remote — checked against
GitHub at 11:45 UTC on the day. Everything else is in `local/`.

## Why now

The field-harvest run of 2026-09-24 found the archive stale on every
test the instrument applies: 49 commits since the filed snapshot, 106
sessions no archive held and 2 that had grown, a second checkout (the
v2 line) never archived, eight install-day sessions never filed, and a
Codex field-report handoff left half-filed in the project's parent
folder.
The oldest unarchived Claude Code log here was last modified on
2026-09-15.

## The last cut-off, and a correction

The filed exports of 2026-08-27 were taken at `6f2ac15` (the public
commit both the Claude Code harvest and the Codex re-harvest name in
their bodies). The Projects table in the tier README gave `9276e4f`,
that harvest's starting HEAD; it is corrected in the same change as
this note. The delta is measured from `6f2ac15`.

## What moved

| Test | Result |
| --- | --- |
| History | 49 commits from `6f2ac15` to `989f11d` (2026-09-24 11:38 +0100); 128 files changed, 61,542 insertions, 1,603 deletions |
| Memory (`pm_skills/project/`) | 11 files changed, 1,873 insertions, 709 deletions; 18 files, 338,484 bytes at HEAD — `decision-log.md` 63,668, `file-map.md` 46,069, `trajectory.md` 11,179, `backlog.md` 8,307 |
| Working tree | clean before and after the harvest |
| Framework | unchanged: canon 4.7.0 since `599407f`; no upgrade since install |
| Sessions | 106 not in any filed archive, 2 grown since it, 32 already filed unchanged (10 Claude Code, 22 Codex) |

Commit shape over the whole history at HEAD: 135 commits from
2026-08-17 18:49 to 2026-09-24 11:38; 76 subjects open with an item
ID, 58 bodies carry a `Verify:` line, 90 carry a co-author trailer;
two author identities (106 and 29 commits).

## Sessions taken (all in `local/2026-09-24-sessions.tar.gz`)

| Store | Taken | Notes |
| --- | ---: | --- |
| Claude Code | 18 | from the PARM-folder directory, 8 new (2026-08-27 to 2026-09-24) and 2 grown since the 2026-08-27 archive (the other 10 there are filed unchanged; one of them gained 2 side files, taken); **8 from a stale Desktop copy of the PARM folder** (2026-08-17 16:49 to 2026-08-18 14:57 UTC) — the Route Plotter v3 install days: the import of `router-plotter-02`, `git init`, the PM-Skills 4.7.0 install. The 2026-08-27 harvest did not see them; that Desktop folder no longer exists, and only the harness store still held the logs |
| Codex, live | 76 | 2026-03-27 to 2026-09-24, including rollouts launched from Claude Code scratchpads of Route Plotter sessions (28) and the 14 v2-line rollouts of March–June |
| Codex, archived | 14 | 2026-08-26 — the store no earlier harvest read |

Model mix across all 140 attributed sessions (taken and already
filed): Claude Code `claude-fable-5` 17, `claude-opus-5` 9,
`claude-opus-5-5` 2; Codex `gpt-5.6-sol` 40, `gpt-6-astra` 31,
`gpt-5.4` 7, `gpt-5.5` 7, auto-review 13, imports without model turns
14. One log was still being written at the cut-off and was cut there;
two agent-memory files rewritten after the cut-off are left out of the
archive and listed in its manifest.

The secrets scan found bearer tokens in 28 archived members — the
`Authorization: Bearer` header Codex's GitHub integration passes to
`git push`. The archive is byte-verbatim and local; the manifest names
the files.

## The v2 line — a second checkout, first archived now

The Windsurf Map Router checkout (`router-plotter-02`, private) is
this project's earlier line: Route Plotter v3's first commit
(`3509790`, 2026-08-17) imports it at `5b19787`. It carries its own
framework install — the unversioned tree from `ce904c2` (2026-04-16),
upgraded to 2.3.0 by `5825d52` (2026-06-14) — and 336 commits from
2025-10-16 to 2026-06-18. Filed with a `-v2-line` topic, all local
(the repository is private): memory (8 files, 59,279 bytes), rulebooks,
state, git log, inventory, a working-tree snapshot (173 status lines
before and after; seven entries were cloud-only placeholders, not
opened), and a verified bundle. Its `.git` held 2,340 cloud-only
objects when first counted, so every object was read through a scratch clone of the
remote plus the checkout's own refs.

Checkpoint A's second witness proposed filing it as a separate
project; it stays here because the v3 history begins by importing it
and the tier's row already records the memory port from the v2 line.
It has its own complete evidence set, as the witness asked.

## The Codex handoff left in the parent folder

`.field-report-route-plotter-staging` (45 files, 403 MB), written by
the Codex field-report run of 2026-08-27. Eight of its files are
byte-identical to files filed on 2026-08-28. Five local notes were
never filed and are now, byte-verbatim with a `-codex` suffix:
`2026-08-27-export-working-tree-snapshot-codex.md`,
`…-export-working-tree-snapshot-post-cutoff-codex.md`,
`…-note-usage-analysis-codex.md`, `…-note-manifest-codex.md`,
`…-note-handoff-state-codex.md`. Its 32 raw session copies were not
kept: each equals a filed archive member or is a prefix of a store
file this delta takes whole.

## The Windsurf stores

Archived once for the whole run, in this project's `local/` —
`2026-09-24-windsurf-stores.tar.gz` (188 files: 51 conversation files
modified 2025-11-19 to 2026-07-20, 85 memory files 2025-06-06 to
2026-07-16, and the 52 workspace records). They are filed here because
this was the first project harvested whose folder Windsurf's workspace
list names — the v2-line checkout — not because the files are known to
be this project's. Every other project whose Windsurf era overlaps
cites this archive.

## History

`local/2026-09-24-repo.bundle` — every ref the checkout carried at the
cut-off (22), verified. `local/2026-06-18-repo-v2-line.bundle` — the v2
line's refs, verified; four Codex turn-diff checkpoint refs could not
be preserved (the checkout's own store cannot supply the trees they
name), recorded by name in its manifest.

## Where things are

- Tracked: `2026-09-24-export-memory.md`, `-export-rulebooks.md`,
  `-export-state.md`, `-export-git-log.md`, `-export-inventory.md`, this
  note.
- Local: the bundles and their manifests; `2026-09-24-sessions.tar.gz`
  and manifest; `2026-09-24-export-prompts.md`;
  `2026-09-24-export-agent-memory.md`; the `-v2-line` exports; the five
  `-codex` notes; the Windsurf stores and manifest; the generator that
  built this run (`harvest-2026-09-24/`).

## What to compare later

- The 49 commits since `6f2ac15` against the 86 before it: item IDs,
  `Verify:` lines, co-author trailers.
- The install-day sessions against the install commit `599407f` and the
  memory port it records.
- The v2 line's memory at `5b19787` against v3's first memory commit.
- The decision log's growth (63,668 bytes at HEAD) against the budget
  canon 4.7.0 set.
