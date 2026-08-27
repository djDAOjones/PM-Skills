<!-- field-report: project=route-plotter · date=2026-08-27 · type=note
     · pm-skills=4.7.0
     · source=harvested from the maintainer's checkout by Claude Code -->

# Deployment snapshot — Route Plotter v3

The orientation file for this project's directory. Everything below
is an observed fact recorded at harvest time; nothing here is an
evaluation. Analysis that reads these reports belongs in
`self/evaluations/`, per this tier's README.

**Snapshot caveat.** The project was under active development during
the harvest: it advanced two commits and ran a full memory prune
while the export was being taken. Exact byte counts live in the
inventory block of `2026-08-27-export-memory.md`, which was generated
in one pass; the figures quoted in this note are characterising, not
authoritative, and will not match a later re-harvest.

## The project

**Route Plotter v3** — an animated route editor for maps and images.
A user drops in a background image, clicks to place waypoints,
configures styles and timing, and exports MP4, WebM, or a
self-contained HTML file. Its stated mental model is background image
→ waypoints → animated path → export. v3 extends the single narrative
route into a layered scene over one master timeline, adding
particle/crowd flow layers absorbed from an archived fork.

Public source: `https://github.com/djDAOjones/route-plotter`.
The project's own rulebook describes the maintainer as a novice coder
who owns macro structure, UX direction and conceptual design while
relying on AI for implementation and project management.

## Framework deployment

| Fact | Value |
| --- | --- |
| pm-skills version | 4.7.0 |
| Installed | 2026-08-17, commit `599407f` |
| Install method | fresh install, manifest-verified, with v2 project memory ported across |
| Upgrades since | none — see below |
| Path mapping | none — standard `pm_skills/` layout |

This project's pm-skills use predates this repository. The first
commit (`3509790`, 2026-08-17) imports an earlier build "as fresh v3
history", and the ported memory carries archived decision logs for
April and June 2026; the archive index records a "pm-skills 2.3.0
upgrade" among the June entries. The deployment is therefore
continuous even though the git history is not — an
installed-fresh-but-carried-over case the framework has no vocabulary
for.

`pm_skills/VERSION` has been touched exactly once, at install.

## The upgrade was refused, not missed

This is the most directly useful thing in this project's record. On
2026-08-27 the decision log states the owner call in as many words:

> stay on PM-Skills 4.7.0 (upstream is 4.9.2 — skipped, not merely
> deferred)

So this is not a project that drifted behind or never got round to
`upgrade.md`. Upstream was known, considered, and declined outright,
by a maintainer running the framework daily. Any question about why
consuming projects sit behind the current release has a first-hand
answer here rather than an inference.

## History shape

85 commits at harvest, 2026-08-17 to 2026-08-27, in two bursts with a
six-day gap between them: 13 on 08-17, 29 on 08-18, 4 on 08-19, then
nothing until 23 on 08-26 and 16 on 08-27.

Roughly a third of commit subjects carry an `<ITEM-ID>:` prefix, and
the IDs come from at least eight different families — `UI`, `REV`,
`COMPOSE`, `PM`, `PHASE`, `CROWD`, `UX`, `SUPPORT` — rather than one
project series. The convention is followed in spirit but not as a
single namespace, which matters for any tooling that expects to
reconcile shipped IDs.

## Memory behaviour

A prune ran during the harvest, and the decision log records what
triggered it: the log stood at **51 live entries against a budget of
20**, and the trajectory at **3,859 words against a budget of 2,000**
— both far over. The prune moved 36 entries and two closed epochs
into `archive/`, cutting the live decision log from roughly 130 KB to
35 KB and the trajectory from 27 KB to 13 KB, with 97 KB of archived
decision log left behind.

Two owner calls in that same session are worth carrying forward,
because they are the maintainer overriding the framework's own
guidance:

- **"Pruning must never harm development quality."** Content still
  feeding open work stays live, and budget targets yield to that bar.
  The stopping points reached — the log left at 16 entries against a
  budget of 20, the trajectory at 91% of budget — are described as
  "the rule applied, not an overrun to fix".
- **Review remediation does not merge to main yet.** The live site
  stays on an older build until the owner calls the release.

Beyond that: `file-map.md` is around 36 KB, larger than the live
decision log after the prune, and the project `README.md` is roughly
three times the size of the `AGENTS.md` that governs it. Only one
ticket file exists, so this project is not running anything
resembling records mode.

## Other observations

- **Cloud-sync friction is recorded as project history, not as a
  one-off.** `DEV-INFRASTRUCTURE.md` warns against starting workers
  on the OneDrive-synced workspace path, and the archived June
  decision log holds several entries caused by it: dev-server watch
  churn, OneDrive dropping the executable bit, and a `npm test` pool
  change made because the default pool failed on this path. The
  framework's own brief already names cloud-synced checkouts as a
  constraint; this is consuming-project evidence for it.
- **Install, not upgrade — three for three.** With the UoN Video
  Helper reinstall on 2026-08-24 and the Derry Lane reinstall on
  2026-08-17, no deployment on record has reached its current version
  by walking `pm_skills/prompts/upgrade.md`.
- **A review round ran on 2026-08-26**, producing a bespoke read-only
  review prompt, a review, a novice-facing headline summary, a
  finding crosswalk, and a remediation continuation prompt. Filed as
  `2026-08-26-export-review-artefacts.md`.

## What is in this directory

| File | Lane | Contents |
| --- | --- | --- |
| `2026-08-27-note-deployment-snapshot.md` | tracked | this file |
| `2026-08-27-export-memory.md` | tracked | `pm_skills/project/**` verbatim, with a byte inventory |
| `2026-08-27-export-rulebooks.md` | tracked | `AGENTS.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md`, `CLAUDE.md`, `README.md` |
| `2026-08-27-export-git-log.md` | tracked | full history with bodies and changed files |
| `2026-08-26-export-review-artefacts.md` | tracked | the `reviews/` tree |
| `local/2026-08-27-export-session-logs.md` | local | index of the raw Claude Code session logs |
| `local/sessions/*.jsonl` | local | 12 sessions, 7,671 messages, ~30 MB, byte-verbatim |

Every tracked file above is already public in the source repository;
the session logs are not, which is why they sit in the local lane.
