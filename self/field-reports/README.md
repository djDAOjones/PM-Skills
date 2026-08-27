# Field reports — consuming-project evidence

<!-- Source-only cold tier (FIELD-REPORTS, 2026-08-23). Canonical
     description of what is filed here and how; other files point
     at this one. The tier's per-project directories are lint-exempt;
     this README is gated. -->

## Purpose

Reports carried back from projects that run pm-skills — "consuming
projects" in the framework's vocabulary, "applied projects" in the
maintainer's. They are the evidence base for analysing how the
framework is actually used: which verbs fire, what the memory sizes
do over time, where prompts get skipped or mis-serve a project, how
upgrades land. They are also the input the reflection practice
weights above self-hosted material (`self/REFLECTION.md` →
"Evidence gate": consuming-project evidence outweighs self-hosted).

Until this tier existed the only such evidence — the Hub case study
— sat in the frozen pre-adoption archive, and every reflection run
had to declare itself pure self-hosted. Reports filed here end that.

## What goes here

Anything produced *by or about* a consuming project that bears on
framework usage, filed verbatim:

- Case studies and retrospective evaluations of a project's use of
  the framework (when written in or by the project).
- Session-close / end-of-task closing reports.
- Janitor reports — the generated maintenance output a project
  keeps (`pm_skills/prompts/session-start.md` → "Janitor report"):
  a dated snapshot of memory health.
- Memory validator output (`check-memory.mjs`) and memory-size
  snapshots.
- Upgrade reports: the outcome of an `upgrade.md` walk — version
  from → to, actions taken, friction met.
- Incident notes: prose-skips, gate misfires, a prompt that
  mis-served the project, a close that went wrong.
- Raw exports — the project's memory files, rulebooks, git log,
  and session logs (prompts, replies, tool calls) taken verbatim at
  a named HEAD. Redact mechanically on filing (IDs, addresses); say
  in the header what was and was not redacted.
- Maintainer notes on a project — anything observed while working
  in it that the framework should learn from.

What does **not** go here:

- This repository's own analysis — that is `self/evaluations/`
  (dated, cold). A field report is *input*; an evaluation is
  *output*. An analysis of field reports is written as an evaluation
  and links back to the reports it read.
- This repository's own session transcripts — `self/_transcripts/`.
- A consuming project's live memory. Copy the report, never the
  memory; the project remains the only owner of its memory files.
- Secrets, credentials, personal data — anywhere. **This repository
  is public** (`https://github.com/djDAOjones/PM-Skills`) and `self/`
  is tracked — redact before filing. Evidence that cannot be made
  public by redaction (a private project, third-party content) goes
  in the project's local-only lane (`self/field-reports/*/local/`),
  never at the project root — see "Local-only lane". Project names
  and paths are fine when the
  project is the maintainer's own.

## Layout

```text
self/field-reports/
  README.md                          <- this file (lint-gated)
  <project-slug>/                    <- one directory per project (cold)
    YYYY-MM-DD-<type>[-<topic>].md   <- tracked: public evidence
    local/                           <- gitignored: evidence that cannot be public
      YYYY-MM-DD-<type>[-<topic>].md
```

- `<project-slug>` — lower-case kebab, stable for the project's
  life (`digital-art-audience-hub`). Name it once in the Projects
  table below when the directory is created.
- Files are dated by the day the report was **produced in the
  project**, not the day it was filed here.
- `<type>` comes from a short closed list so reports group across
  projects: `case-study`, `session-close`, `janitor`, `validator`,
  `upgrade`, `incident`, `export`, `note`. `export` is a raw
  primary-source dump — the project's memory files, rulebooks, git
  log, and/or session history verbatim, no analysis — the bulkiest
  and most valuable type for usage analysis. `note` is for
  everything else. Add `-<topic>` when one day carries several
  reports of a type.
- Non-Markdown evidence (validator text, JSON, CSV) is fine; same
  name shape, its own extension.

A report is filed verbatim. If it did not arrive with a header,
prepend this one so a later analysis can grep the tier and read
usage against the release history:

```markdown
<!-- field-report: project=<slug> · date=YYYY-MM-DD · type=<type>
     · pm-skills=<version in the project at the time>
     · source=<who or what produced it> -->
```

The `pm-skills=` field is the join key: it is what lets a report be
read against `pm_skills/CHANGELOG.md` for the release in force when
the project produced it.

## Lint status

Everything under `self/field-reports/*/` is cold — excluded from
markdownlint, cspell, editorconfig-checker, the docs-integrity
checker, and the file-map generator, because exported content
carries foreign paths and spellings the gate cannot check. This
README is the tier's one gated file and is listed in
`self/project/file-map.md`. Changing the tier's shape means
updating `.markdownlint-cli2.jsonc`, `.markdownlintignore`,
`cspell.json`, `.editorconfig-checker.json`,
`scripts/check-docs.mjs`, `scripts/gen-file-map.mjs`, and the cold
tier in the root `AGENTS.md` in the same change (`CONTRIBUTING.md`
→ "Configuration").

## Local-only lane

`<project-slug>/local/` is gitignored by one tracked rule (root
`.gitignore` → `self/field-reports/*/local/`). Evidence filed there
exists only on the maintainer's checkout — cloud-synced, so backed
up, but never pushed. Use it when redaction cannot make a report
public: a project that is private by design, household or client
matters, a third party's words. Everything else about a local
report is unchanged — same name shape, same header, same cold read
tier — and the project directory itself stays tracked (a `.gitkeep`
at its root) so the project is visible in the tree and its row in
the Projects table says which lane its evidence uses.

An analysis that reads local evidence is still written as a public
evaluation under `self/evaluations/`. The redaction judgement moves
to that evaluation: cite the local report by path, carry over only
what the finding needs, and nothing a third party said verbatim.

## Read tier

Cold — never auto-read at session start (root `AGENTS.md` → "Before
every task"). Read when a reflection runs (`self/REFLECTION.md` →
"Evidence gate"), when a usage analysis or evaluation is the task,
or when a backlog item cites a report as evidence.

## Projects

| Slug | Project | pm-skills since | Earliest evidence |
| --- | --- | --- | --- |
| `digital-art-audience-hub` | Digital Art Audience Hub (AI Jam Exhibition System v2) — the first real deployment, ~200 shipped items, two live shows | 2026-05-02 (unversioned → 3.1.1 → tracking current) | 2026-07-16 case study, written in this repo before adoption — stays frozen at `self/archive/user_crud/evaluations/2026-07-16-hub-case-study.md` (archive, never moved); reports from the project file here |
| `derry-lane-development-system` | Derry Lane Development System — governed register for a two-person property refurbishment (Notion + private GitHub + planned analysis code); source repository private by design — **evidence is local-only** (`local/` lane, maintainer decision 2026-08-23) | 2026-08-17 (4.4.0, fresh-reinstalled as 4.6.0 the same day — reinstall chosen over `upgrade.md`) | 2026-08-23 export (local): memory files, rulebooks, git log, and all 11 Claude Code session logs at HEAD `375e102`; Notion IDs and emails redacted mechanically, household content not |
| `uon-video-helper` | UoN Video Helper — a browser-only app that brands, loudness-normalises and encodes an educational video; public source at `https://github.com/djDAOjones/UoN-Video-Helper`, so evidence is in the **tracked lane** apart from session logs | 4.6.0 installed 2026-08-24, reinstalled as 4.9.2 the same day — reinstall chosen over `upgrade.md`, as at Derry Lane. Sourced from the PM-Skills-lab fork, but the installed payload is canon 4.9.2 (see its snapshot note) | 2026-08-24 init prompt and brief; 2026-08-26 review artefacts; 2026-08-27 snapshot, memory, rulebook and git-log exports at HEAD `a3c070a`; 11 session logs in `local/` covering the project from install |
| `route-plotter` | Route Plotter v3 — an animated route editor for maps and images, built for university teaching use; public source at `https://github.com/djDAOjones/route-plotter`, so evidence is in the **tracked lane** apart from session logs | 4.7.0 installed fresh 2026-08-17 with memory ported from the v2 line, which had run pm-skills since at least April 2026 (archive records a 2.3.0 upgrade in June) | 2026-08-26 review artefacts; 2026-08-27 snapshot, memory, rulebook and git-log exports at HEAD `9276e4f`; 12 session logs in `local/` |
