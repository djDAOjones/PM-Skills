---
id: BACKLOG-TABLE
name: Readable backlog table and phase history
status: todo
milestone: next
flags: detail
date: 2026-08-26
grades: Medium / Low / Low / Low
order: 1
summary: investigate a readable table view — at the top of the backlog, or as a generated human-readable file — showing outstanding tickets plus previous development grouped into collapsible phases since inception. A second renderer over records gen-backlog.mjs already parses; where it lives and what it costs the hot read are the questions.
---
# BACKLOG-TABLE — readable backlog table and phase history

> **Status:** Icebox — investigation, unblocked (LAB-FIRST gates
> the pick, not the filing). **Grades:** provisional at intake
> (2026-08-26): Medium / Low / Low / Low.

## Intent

A table a human can read at a glance: outstanding tickets, plus a
previous period of development, ideally collapsible by phases
since inception. Two candidate shapes, and choosing between them
is most of the work — (1) a table at the top of `backlog.md`, or
(2) a separate generated file the agent never hot-reads.

## Why it is cheap

`scripts/gen-backlog.mjs` already parses every ticket record into
structured fields and renders one view between generated markers.
A table is a second renderer over the same parsed records, not a
new data model; `--check` divergence detection extends the same
way.

## Where the history comes from

Not currently modelled as "phases", and scattered:
`trajectory.md` (one line per shipped item, pruned at 2000 words,
so incomplete back to inception); `archive/tickets/` (full retired
records, same parseable frontmatter); `pm_skills/CHANGELOG.md`
plus the split `1x/2x/3x` files (the only source reaching
inception with dates and versions). Whether phases are derived
from release minors, milestone arcs, or declared by hand is open —
if declared, that is a records change, not a rendering one.

## Constraints found at intake

- **Collapsible needs inline HTML.** Markdown has no native
  collapsible block; `<details>` is the usual answer, and MD033
  is **on** here — `.markdownlint.json` disables only MD041,
  MD029, MD013, MD024. So shape 1 needs an MD033 exception or a
  lint-exempt home. The strongest argument for shape 2.
- **The backlog is a hot sectional read** (root `AGENTS.md` →
  "Before every task"). A wide table costs that context every
  session for a purely human-facing benefit — the agent reads the
  records perfectly well already.
- **Generated files are never hand-edited**; on conflict,
  regenerate from merged records.
- **The scaffold fork.** If it ships as product it lands in
  `pm_skills/scaffold/gen-backlog.mjs` too (`CONTRIBUTING.md` →
  "Note on deliberate forks").

## Precedent for shape 2

`self/project/reports/latest.md` — generated, gitignored,
lint-exempt in all four configs, read only when fresh. Costs the
hot read nothing. Trade-off: gitignored means not public and not
in the versioned backup, so a shareable snapshot must be tracked,
and is then lint-gated again unless excluded.

## Investigation questions

- Which shape — or both, terse in the backlog, full history
  derived?
- Tracked or gitignored, and so lint-gated or exempt?
- What defines a phase; derived or declared?
- Which columns earn their width?
- Product or process? Distribution makes it a release with
  MANIFEST and GUIDE sync.

## Done when (investigation only)

A recommendation with a worked example of the chosen shape, lint
and read-budget consequences stated, and either a build item or a
recorded decision to drop it.
