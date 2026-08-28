<!-- field-report: project=uon-video-helper · date=2026-08-27 · type=note
     · pm-skills=4.9.2
     · source=repository history, tracked rulebooks and project memory, local working-tree observations, and the accompanying session-log analysis
     · redacted=absolute checkout and home paths omitted; 195 email occurrences redacted across the public exports; no credential-shaped values found
     · not-redacted=already-public names and identifiers, including Joe Bell, djDAOjones, model attributions, and Paul Smith in tracked review evidence -->

# UoN Video Helper deployment snapshot

## Evidence boundary

The public snapshot is fixed at commit
`09702c2d8c749e72943678c94c558cf33ac1270f`, 2026-08-27 23:09:36 BST,
with an analysis cutoff of 2026-08-27 23:12:50 BST. This prevents a live
development session from moving the evidence while it is being counted.

Initial orientation found HEAD
`c0e0a197f4699e64ab8e6a292dbcfdb37cbf5913`, with modifications to
`DEV-INFRASTRUCTURE.md` and `package.json` and untracked
`scripts/check-build.mjs`. Those changes were committed during capture as
`09702c2`, after which the working tree briefly became clean. At the fixed
cutoff it was dirty again: `src/media/encoding.ts` was modified and
`src/media/encoding.test.ts` was untracked. The recovered patch and this
movement are preserved in
`local/2026-08-27-note-working-tree-snapshot.md`; they are local-only because
they had not been published at the boundary.

The branch continued moving after the cutoff and had reached `a801930` when
this note was written, with a different in-flight source set. Those later
commits and changes belong to another active session and are excluded from
the fixed snapshot.

## Orientation and package map

The stable project slug is `uon-video-helper`; the framework version is
`4.9.2`; the branch at the boundary was
`codex/repository-review-remediation`.

| Surface checked | Present? | Observation at the boundary |
| --- | --- | --- |
| `pm_skills/project/` | Yes | Live memory, three ticket files, and cold archives are tracked. |
| `AGENTS.md` | Yes | It is the only active project rulebook with that name; framework template copies are not active rulebooks. |
| `UI-STANDARDS.md` | Yes | Root UI and accessibility contract. |
| `DEV-INFRASTRUCTURE.md` | Yes | Root build, runtime, quality-gate, deployment, and diagnostics contract. |
| `CLAUDE.md` | Yes | Root Claude entrypoint. |
| Other root rulebook siblings | Yes | `README.md` plus the UI and infrastructure rulebooks above. |
| `reviews/` | Yes | Seven tracked review artefacts dated 2026-08-26. |
| `docs/` | Yes | Original brief, specification, rationale, and initialization material. |
| `.claude/` | Yes | Project-local Claude configuration exists. |
| `.codex/` | No | No project-local Codex directory was present. |

## The project

UoN Video Helper is a static, browser-only application that takes an
educational recording and produces a consistently branded, loudness-normalised,
correctly encoded MP4 without uploading the media. Its product model is a
one-way conveyor rather than an editor: the user chooses opening branding,
closing branding, and one of two purpose-named outputs, while technical settings
remain decided by the application. It is intended for University of Nottingham
academic and professional-services staff using typical Teams, Zoom,
screen-recording, and webcam material. Processing runs locally through
WebCodecs; the source is opened read-only and is never modified.

Sources: `AGENTS.md:5-19`; `pm_skills/project/brief.md:19-45`.

## Framework deployment

The framework deployment begins with the repository itself, so it does not
predate the available Git history.

| Commit | Date | Recorded deployment event |
| --- | --- | --- |
| `f46bcf0` | 2026-08-24 17:10 BST | Root commit: fresh install of pm-skills `4.6.0`, exported from `djDAOjones/PM-Skills-lab` with `scripts/package.mjs`; 46 manifest-verified files. |
| `92e9791` | 2026-08-24 18:18 BST | Clean reinstall at `4.9.2`; the commit explicitly says the upgrade walk was not used because nothing had been customised and no project memory had yet been populated; 49 manifest-verified files. |

Every committed value of `pm_skills/VERSION` is therefore either `4.6.0` or
`4.9.2`; the boundary snapshot is on `4.9.2`.

## History shape

Through `09702c2`, the repository contains 111 commits from 2026-08-24
17:10 BST through 2026-08-27 23:09 BST.

| Date | Commits |
| --- | ---: |
| 2026-08-24 | 16 |
| 2026-08-25 | 43 |
| 2026-08-26 | 18 |
| 2026-08-27 | 34 |

Fifty-seven of 111 subjects (51.35%) use one singular
`<ITEM-ID>: <summary>` prefix: 56 use the `VH` family (including the `VH-M`
maintenance subfamily) and one uses the `D` family. A further subject names
two VH items before its colon and is not counted as conforming to the singular
form. There are two top-level ID families, `VH` and `D`.

## Project-memory footprint

The following are source byte counts at the fixed boundary. The same files are
exported verbatim in `2026-08-27-export-memory.md`.

| Project-memory file | Bytes |
| --- | ---: |
| `pm_skills/project/architecture.md` | 15,039 |
| `pm_skills/project/archive/INDEX.md` | 1,948 |
| `pm_skills/project/archive/decision-log-0001-2026-08-25.md` | 24,011 |
| `pm_skills/project/archive/decision-log-0002-2026-08-25-to-2026-08-27.md` | 50,539 |
| `pm_skills/project/archive/trajectory/trajectory-0001-band-0-mvp.md` | 4,844 |
| `pm_skills/project/archive/trajectory/trajectory-0002-real-material-and-band-1.md` | 12,073 |
| `pm_skills/project/archive/trajectory/trajectory-0003-review-remediation-and-band-1-close.md` | 11,492 |
| `pm_skills/project/backlog.md` | 21,111 |
| `pm_skills/project/brief.md` | 6,878 |
| `pm_skills/project/conventions.md` | 5,290 |
| `pm_skills/project/decision-log.md` | 37,565 |
| `pm_skills/project/doc-deltas.md` | 4,295 |
| `pm_skills/project/file-map.md` | 20,627 |
| `pm_skills/project/tickets/VH-26.md` | 3,138 |
| `pm_skills/project/tickets/VH-30.md` | 2,519 |
| `pm_skills/project/tickets/VH-71.md` | 8,302 |
| `pm_skills/project/trajectory.md` | 8,629 |
| `pm_skills/project/wish-list.md` | 9,201 |
| **18 files** | **247,501** |

The boundary's memory validator reported no structural failures. It warned
that Backlog Active was 3,004 words across 26 open items against the 1,500-word
soft limit and 40-item limit, that `tickets/VH-71.md` was 1,101 words against
the 600-word soft guideline, and that 13 open doc deltas exceeded the
10-delta threshold.

## Memory-maintenance events and triggers

Session logs record five explicit `memory-maintenance` invocations. Repository
history records four distinct maintenance outcomes, three of which created
archive rotations; more than one invocation contributed to the same repository
state.

| Date | Outcome and recorded trigger |
| --- | --- |
| 2026-08-25 | Ledger and wish-list cleanup, with no archive: 12 completed doc deltas and two dead wish-list entries were swept. Trajectory stood at 1,972/2,000 words; Backlog Active deliberately remained at 2,479/1,500. |
| 2026-08-25 | First trajectory split after VH-45 pushed it to 2,069/2,000 words. The closed Band 0 phase moved to `trajectory-0001`; the live file was recorded as 1,358 words, below the 1,400 prune-to target. |
| 2026-08-26 | Second rotation after trajectory reached 3,321/2,000 words and the decision log reached 22/20 entries. Twelve decisions and the next trajectory phase were archived. The decision record says trajectory fell to 1,423 words; a commit-level recount gives 1,435, so the 12-word discrepancy is retained rather than normalised away. |
| 2026-08-27 | Third rotation after review remediation drove the decision log to 39/20 entries and trajectory to 3,010/2,000 words. Twenty-five decisions and 13 trajectory sections were archived, leaving 14 live entries and a recorded 1,303 trajectory words. |

Sources: `pm_skills/project/archive/decision-log-0001-2026-08-25.md:128-154,
236-260`; `pm_skills/project/archive/decision-log-0002-2026-08-25-to-2026-08-27.md:457-475`;
`pm_skills/project/decision-log.md:114-136`.

## Documented framework departures and maintainer overrides

Four entries set aside a framework rule, budget, default, or normal practice
and state why:

1. **Backlog and ticket budgets were knowingly exceeded.** Backlog Active was
   retained at 2,479/1,500 words, with two tickets over their soft limits,
   because “the inline detail is doing real work” and the open-item count
   remained within budget. Source:
   `pm_skills/project/archive/decision-log-0001-2026-08-25.md:251-254`.
2. **The Prune file-map step was deliberately omitted.** New archive files were
   not hand-added to `file-map.md` because its generator ignores
   `pm_skills/` and would delete that section; `archive/INDEX.md` became the
   cold-storage map. Source:
   `pm_skills/project/archive/decision-log-0001-2026-08-25.md:145-149`.
3. **A spike left a persistent artefact.** Although a spike normally leaves
   nothing behind, `src/spike/alpha.ts` was retained because “a verification
   that cannot be re-run is not a verification.” Source:
   `pm_skills/project/archive/decision-log-0001-2026-08-25.md:228-231`.
4. **The maintainer rejected excluding the repository from OneDrive.** The
   permanent hazard was documented with symptoms and an `npm ci` recovery
   path; no detector was built because the condition was not reproducible and
   an untested guard was judged worse. Source:
   `pm_skills/project/decision-log.md:320-327`.

## Public/local lanes and redaction record

The GitHub repository `djDAOjones/UoN-Video-Helper` was confirmed public, so
tracked material belongs in the public report root. Raw Claude Code and Codex
logs have never been published and remain byte-verbatim under
`local/sessions/`; the local index carries their sizes and SHA-256 checksums.

Public-lane scanning and export transformed 53 absolute checkout-path
occurrences to `<checkout>`, one other home-path occurrence to `<home>`, and
195 email occurrences to `<redacted-email>` (192 in the Git log and three in
end-user evidence). No API-key, token, or credential-shaped value was found.
Already-public identities and account/repository identifiers were retained.
In particular, the tracked review source contains “Paul Smith” in a sample
label; it is flagged here as a third-party-looking personal name and has not
been silently removed. The report does not infer whether that public label is
a real identity.

The accompanying usage analysis is based on 99 copied JSONL files totalling
105,941,728 bytes and 19,049 native messages at capture. It explains imported
Codex mirrors, completion denominators, process corrections, read-tier
departures, and the active-partial boundary; the byte-verbatim source traces
remain local-only.
