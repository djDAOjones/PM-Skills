<!-- field-report: project=uon-video-helper · date=2026-08-27 · type=note
     · pm-skills=4.9.2
     · source=harvested from the maintainer's checkout by Claude Code -->

# Deployment snapshot — UoN Video Helper

The orientation file for this project's directory. Everything below
is an observed fact recorded at harvest time; nothing here is an
evaluation. Analysis that reads these reports belongs in
`self/evaluations/`, per this tier's README.

**Snapshot caveat.** The project was mid-session during the harvest,
with a memory prune staged but not yet committed. Exact byte counts
live in the inventory block of `2026-08-27-export-memory.md`; the
figures quoted in this note are characterising, not authoritative.

## The project

**UoN Video Helper** — a static, browser-only web app that adds
approved University of Nottingham branding to an educational video,
normalises its loudness, and exports a correctly-encoded MP4. Its
stated mental model is "a one-way conveyor, not an editor": a file
goes in, a branded, correctly-levelled file comes out, the user makes
three choices, and everything technical is decided for them. All
processing happens on the user's own device.

Public source: `https://github.com/djDAOjones/UoN-Video-Helper`.
The project's own rulebook describes the maintainer as a vibe coder
who owns macro structure, UX direction and conceptual design but not
deep implementation.

## Framework deployment

| Fact | Value |
| --- | --- |
| pm-skills version | 4.9.2 |
| First installed | 2026-08-24, commit `f46bcf0`, at v4.6.0 |
| Current version reached | 2026-08-24, commit `92e9791`, "Reinstall PM Skills framework at v4.9.2" |
| Install method | fresh install, then reinstall — no `upgrade.md` walk |
| Path mapping | none — standard `pm_skills/` layout |

## Provenance, stated precisely

This matters more than usual, because the project has been spoken of
as the experimental arm of a lab-versus-canon comparison, and the
checkout does not straightforwardly support that reading.

The project's `README.md` credits the framework as PM Skills and
links to `https://github.com/djDAOjones/PM-Skills-lab` — the private
research fork — at v4.9.2. What is actually installed is the standard
`pm_skills/` tree carrying canon version 4.9.2. No `pm-next`
directory, manifest, or other next-generation artefact exists
anywhere in the repository, and that single README link is the only
mention of the lab in the entire tree.

The honest reading: **sourced from the lab fork at the point where
the fork had assimilated canon 4.9.2, running canon content.** The
fork is the provenance, not the payload. Anyone treating this project
as a lab arm should check that assumption against this paragraph
first — and if a real lab-versus-canon comparison is wanted, this
harvest says it has not happened yet.

## History shape

108 commits at harvest, spanning four consecutive days — the entire
life of the project: 16 on 08-24, 43 on 08-25, 18 on 08-26, 31 on
08-27.

Half the commit subjects carry an `<ITEM-ID>:` prefix, and nearly all
of those are a single `VH-nn` series. That is a far tighter namespace
than Route Plotter's eight-family spread over a comparable period,
despite both projects running the same framework and the same
maintainer.

## Memory behaviour

Memory maintenance has fired repeatedly in four days. Committed
already: a decision-log rotation into
`archive/decision-log-0001-2026-08-25.md`, and two trajectory bands
archived under `archive/trajectory/`. Staged but uncommitted at
harvest: a second decision-log archive
(`decision-log-0002-2026-08-25-to-2026-08-27.md`) and a third
trajectory band. A project four days old has run the
prune-and-archive path three times.

Against Route Plotter — same framework, one version behind, same
maintainer — two contrasts stand out:

- `AGENTS.md` here is around 30 KB against Route Plotter's 7 KB.
  Over four times the rulebook, for a project a fraction of the age.
- `DEV-INFRASTRUCTURE.md` is around 21 KB against 12 KB, while
  `README.md` is 7 KB against 22 KB. This project's weight sits in
  its rules; Route Plotter's sits in its public documentation.

## Other observations

- **Reinstall chosen over upgrade, again.** 4.6.0 to 4.9.2 was
  reached by reinstalling the same day, not by walking
  `pm_skills/prompts/upgrade.md`. Derry Lane made the same choice on
  2026-08-17, and Route Plotter's install was fresh too — and Route
  Plotter has since declined 4.9.2 outright. Three deployments on
  record, no upgrade walks.
- **The init prompt was kept.** `docs/04-init-prompt.md` preserves
  the actual input used to stand the project up, alongside the
  original brief it was written from. Filed as
  `2026-08-24-export-init-prompt.md`. Because the session logs cover
  the project's entire life from about two hours after install, this
  is a complete before-and-after: the prompt, and everything it
  produced.
- **A "hostile-filesystem guard" is now a standing rule.**
  `AGENTS.md` carries an explicit rule about cloud-synced repo paths,
  and `DEV-INFRASTRUCTURE.md` and `README.md` both warn about
  OneDrive Files-On-Demand. Route Plotter records the same class of
  problem in its June 2026 archived decision log. Two independent
  projects have written cloud-sync defences into their rulebooks.
- **A review round ran on 2026-08-26**, producing a comprehensive
  review, an internal code review, two successive critiques *of the
  review*, and a continuation prompt. Filed as
  `2026-08-26-export-review-artefacts.md`. The critique-of-review
  artefacts have no counterpart in the framework's own prompts.

## What is in this directory

| File | Lane | Contents |
| --- | --- | --- |
| `2026-08-27-note-deployment-snapshot.md` | tracked | this file |
| `2026-08-27-export-memory.md` | tracked | `pm_skills/project/**` verbatim, with a byte inventory |
| `2026-08-27-export-rulebooks.md` | tracked | `AGENTS.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md`, `CLAUDE.md`, `README.md` |
| `2026-08-27-export-git-log.md` | tracked | full history with bodies and changed files |
| `2026-08-26-export-review-artefacts.md` | tracked | the `reviews/2026-08-26/` tree |
| `2026-08-24-export-init-prompt.md` | tracked | init prompt, original brief, open-decisions register |
| `local/2026-08-27-export-session-logs.md` | local | index of the raw Claude Code session logs |
| `local/sessions/*.jsonl` | local | 11 sessions, 14,013 messages, ~28 MB, byte-verbatim |

Every tracked file above is already public in the source repository;
the session logs are not, which is why they sit in the local lane.
