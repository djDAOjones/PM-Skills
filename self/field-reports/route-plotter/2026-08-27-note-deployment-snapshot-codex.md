<!-- field-report: project=route-plotter · date=2026-08-27 · type=note
     · pm-skills=4.7.0
     · source=Codex synthesis of the clean public handoff at 5db724e056fa5d6c8c377a3f49fbed35ce0b8602, pinned exports at 6f2ac154430be665a9cb1665a6f20d1b317990e0, and three timestamped local state captures
     · redaction=no absolute checkout/home paths, e-mail addresses, or credential-shaped values present
     · retained=already-public Joe Bell and Gary Priestnall names, public GitHub account/URLs, framework/product names, and commit hashes retained -->

# Deployment snapshot

## Orientation

Project slug: `route-plotter`  
PM-Skills version: `4.7.0`  
Clean handoff snapshot HEAD: `5db724e056fa5d6c8c377a3f49fbed35ce0b8602`  
Pinned public-export HEAD: `6f2ac154430be665a9cb1665a6f20d1b317990e0`  
Branch: `review-remediation`, equal to `origin/review-remediation` at handoff  
Source visibility: public GitHub repository and pushed public branch

At the first orientation check, HEAD was
`f1c14b96a6e69a3609f4bab4d2ad4109d099752a` and six tracked memory/review
files were modified while one continuation prompt was untracked. A concurrent
session committed and pushed that material as `6f2ac154`; the worktree was
clean at that pinned public evidence baseline. The exact earlier status,
tracked diff, and untracked file are preserved in
`local/2026-08-27-export-working-tree-snapshot.md` rather than silently
normalised away.

Concurrent Route Plotter work resumed after that pinned source check. At
`2026-08-27T22:44:48.463Z`, HEAD was still `6f2ac154`, but
`src/components/ParamTooltip.js` was modified and
`tests/paramTooltip.test.js` was untracked. A canonical `npm run check` against
that later dirty state stopped in Vitest with 1,017 tests passing and three new
tooltip tests failing, before the chained shell and build checks could run.
`local/2026-08-27-export-working-tree-snapshot-post-cutoff.md` preserves that
status, tracked diff, untracked test, checksums, and gate result. The public
exports remain pinned to the clean public commit and do not silently blend in
the later in-flight files; the usage-analysis session corpus separately stops
at the user's `execute` request to avoid counting report generation itself.

That post-cutoff work was subsequently completed and pushed as
`5db724e0` (`A11Y-01: hints describe their control instead of posing as
buttons`). At the handoff check on 2026-08-28, the worktree was clean and
upstream-equal. The canonical gate passed at that HEAD: 68 test files and 1,024
tests, restart-safety shell checks, and the non-mutating production check
build. An isolated archive of the pinned export commit also passed its own
full gate: 67 test files, 1,006 tests, restart safety, and the check build.
`local/2026-08-27-note-handoff-state.md` records the boundary and the one-commit
delta. The later commit is reflected in the handoff-state figures below but is
not retroactively folded into the pinned raw exports.

After that timestamped handoff, a separate concurrent task continued changing
the source worktree. Those later in-flight files are outside this report's
session cutoff and do not alter the fixed public-export or handoff snapshots.

The environment preflight found a OneDrive/CloudStorage checkout, which is the
framework's standing warn-only condition. Git passed its sanity check and no
sync-conflict copy was found.

| Requested surface | State at clean handoff |
| --- | --- |
| `pm_skills/project/` | Exists |
| `AGENTS.md` | Exists |
| `UI-STANDARDS.md` | Exists |
| `DEV-INFRASTRUCTURE.md` | Exists |
| `CLAUDE.md` | Exists |
| Other `AGENTS.md` files | Only `pm_skills/templates/AGENTS.md`; it is a framework template, not a second live rulebook |
| `reviews/` | Exists |
| `docs/` | Exists |
| `.claude/` | Exists as ignored/local state; not exported publicly |
| `.codex/` | Absent in the repository |

## The project

Route Plotter is a single-purpose animated route editor whose canonical flow is
background image, waypoints, animated path, then export; its rulebook explicitly
separates it from GIS, general drawing, and video-editing tools. Users place and
style waypoints over a map or image and export MP4, WebM, or self-contained
HTML. Version 3 extends the hero route with deterministic crowd/particle flow
layers evaluated on the same master timeline. The project brief names university
educators, students, and presentation makers as its audience and Gary Priestnall
as primary user; it is a client-only static app published through GitHub Pages.

Sources: `AGENTS.md` § Product identity;
`pm_skills/project/brief.md` §§ What are we building, Who is it for, Platform
and deployment.

## Framework deployment

The clean-handoff v3 Git graph contains exactly one commit touching
`pm_skills/VERSION`: `599407f4b5b4b62e304bb47a807295761ee6b588`
on 2026-08-17, subject `Install PM-Skills 4.7.0 (fresh,
manifest-verified); port v2 project memory`. It added the full 47-file framework
through the packager and created `VERSION` with `4.7.0`. No later reinstall or
`upgrade.md` walk exists in this history, and `4.7.0` is the only value this
history's file has held.

The clean-handoff deployment does not predate this fresh v3 history: the root commit
deliberately omitted the predecessor's embedded framework, and the 4.7.0 fresh
install followed six minutes later. Framework use does predate it. Ported
decision records show unversioned/pre-1.0 adoption on 2026-04-16 and a Legacy
upgrade to 2.3.0 on 2026-06-14 in the predecessor repository; those values are
lineage evidence, not values held by `pm_skills/VERSION` in this v3 graph.

Sources: commit `599407f`; `pm_skills/project/archive/decision-log-2026-04.md`
heading `Adopted PM-Skills framework for AI guidance`;
`pm_skills/project/archive/decision-log-2026-06.md` heading `Upgraded
pm-skills framework (pre-1.0.0 → 2.3.0)`.

## History shape

The clean handoff contains 87 commits from 2026-08-17 through 2026-08-27,
an 11-calendar-day span with commits on five days.

| Author date | Commits |
| --- | ---: |
| 2026-08-17 | 13 |
| 2026-08-18 | 29 |
| 2026-08-19 | 4 |
| 2026-08-26 | 23 |
| 2026-08-27 | 18 |
| **Total** | **87** |

Using `^[A-Z][A-Z0-9]*-[0-9]+[a-z]?: .+` as the explicit
`<ITEM-ID>: <summary>` test, 32 of 87 subjects comply (36.78%). The 14
distinct ID families are A11Y, COMPOSE, CROWD, DEMO, DOC, HEAD, MAINT, PHASE,
REV, ROUTE, SCALE, SUPPORT, UI, and UX. Conventional-commit subjects such as
`feat(ui): ...`, and non-ID headings such as `PM: ...`, were not counted.

Source: live `git log` at clean handoff `5db724e0`. The pinned
`2026-08-27-export-git-log.md` ends one commit earlier at `6f2ac154` and
therefore contains 86 commits, 31 matching subjects, and 13 ID families.

## Memory behaviour

### Current handoff byte inventory

| File | Bytes |
| --- | ---: |
| `pm_skills/project/architecture.md` | 7,109 |
| `pm_skills/project/archive/INDEX.md` | 1,520 |
| `pm_skills/project/archive/decision-log-2026-04.md` | 1,470 |
| `pm_skills/project/archive/decision-log-2026-06.md` | 32,569 |
| `pm_skills/project/archive/decision-log-2026-08-17-to-2026-08-26.md` | 97,330 |
| `pm_skills/project/archive/trajectory/trajectory-0001-2026-04-16-to-2026-06-17.md` | 7,821 |
| `pm_skills/project/archive/trajectory/trajectory-0002-2026-08-17-to-2026-08-19.md` | 7,361 |
| `pm_skills/project/backlog.md` | 6,377 |
| `pm_skills/project/brief.md` | 3,535 |
| `pm_skills/project/conventions.md` | 2,633 |
| `pm_skills/project/decision-log.md` | 40,606 |
| `pm_skills/project/doc-deltas.md` | 1,487 |
| `pm_skills/project/file-map.md` | 36,576 |
| `pm_skills/project/tickets/REV-03.md` | 4,163 |
| `pm_skills/project/trajectory.md` | 13,566 |
| `pm_skills/project/wish-list.md` | 2,955 |
| **Total** | **267,078** |

The concatenated public memory export remains pinned to `6f2ac154` and opens
with that snapshot's 263,879-byte source inventory plus an export-content byte
column. The one later handoff commit changed backlog, decision log, file map,
trajectory, and wish-list; the table above reports their handoff-snapshot bytes
rather than mislabelling the export's older inventory as the handoff snapshot.

### Recorded maintenance and prune actions

Three maintenance/prune actions are recorded; two created cold archive
rotations. Only the latest explicitly names the current Diagnose/Prune
workflow, so this is a count of recorded actions rather than three proven
invocations of one prompt version.

1. **2026-06-16 — live relocation, no archive.** One shipped `[x]` item
   remained in the backlog, whose shipped-work budget is zero. The action moved
   the outcome to one trajectory line, retained its prior rationale, and
   removed the Completed section; all other memory was within budget. This
   predecessor-repo action is known through the ported June decision log.
2. **2026-08-19 — first archive rotation.** The decision log had 35
   mechanically headed entries against the 20-entry budget; an earlier close
   reported 36 live entries, with one later-archived entry lacking an H2
   heading. Owner-approved whole-month rotation created the April and June
   archives plus `archive/INDEX.md`, leaving 15 headed live entries. The index
   describes the June chunk as 14 entries, while the archive mechanically has
   19 dated headings; the report preserves that discrepancy rather than
   reconciling it by inference. Commit: `27dd3768`.
3. **2026-08-27 — Diagnose-approved prune.** Diagnose recorded 51 live
   decision entries against 20 and trajectory at 3,859 words against 2,000.
   The signed-off, diff-verified prune moved 36 decision entries and two closed
   trajectory epochs to cold archives, leaving 15 decision entries and 1,812
   trajectory words before the prune record itself was added. Commit:
   `ea3e27a0`. A subsequent owner decision retained open-work context even
   though that stopped above the framework's 70% prune-to targets.

Sources: the three `Pruned project memory` / `Phase 5` / `memory prune`
headings in the live and archived decision logs; commits `27dd3768` and
`ea3e27a0`; `pm_skills/project/archive/INDEX.md`.

## Maintainer overrides and explicit exceptions

The decision corpus records the following cases where a documented process
default, budget, or rule was set aside. Ordinary product choices and normal
approval gates are excluded.

1. **Lossless Legacy upgrade deferred the new backlog lifecycle
   (2026-06-14).** Migration of completed backlog work to trajectory plus
   decision log was deferred “to keep this upgrade lossless”; the June 16
   prune completed it. Source: archived June heading `Upgraded pm-skills
   framework`.
2. **Over-budget history was deliberately preserved through eight 2026-08-26
   closes.** The REV-06, CROWD-02, CROWD-03, UI-05, UI-04, UI-03, REV-02, and
   `Roadmap refactor: lifecycle queue after Phase 1 health work` entries each
   retain the complete trajectory despite its known soft-size warning. The
   roadmap entry states the root reason: the maintainer explicitly chose full
   historical continuity. Source: headings at lines 108, 137, 169, 200, 230,
   261, 372, and 450 of
   `archive/decision-log-2026-08-17-to-2026-08-26.md`.
3. **Active warnings were deferred briefly on 2026-08-27.** The accessibility
   close sent trajectory and decision-log warnings to a maintenance session
   and recorded “Not pruned”; `ea3e27a0` resolved the deferral later that day.
   Source: live heading `owner verdicts clear quarantine, and axe joins the
   gate`.
4. **Quality now outranks prune-to arithmetic.** The owner directed that
   context still feeding open work remains live and that “budget/prune-to
   targets yield to that bar”. The recorded stop was 16/20 decision entries and
   trajectory at 91% of budget. Source: live heading `owner sets the prune bar,
   and holds the merge`.
5. **The offered framework upgrade was skipped.** The maintenance entry says
   to remain on 4.7.0 although upstream was 4.9.2, “skipped, not merely
   deferred”; dependency upgrades were separately deferred to `DEPS-01`.
   This is an owner choice over the offered maintenance direction, not a rules
   breach. Source: live heading `memory prune, and two owner deferrals`.
6. **Release was held.** The owner directed that `review-remediation` not merge
   to `main` and that live v3.2.618 remain until an explicit release call.
   **Inference:** although the framework does not force a merge, this hold
   defers the next deployment step that the branch was prepared to take.
   Source: live heading `owner sets the prune bar, and holds the merge`.
7. **The 2026-08-19 whole-month rotation stopped at 15/20 entries.** Git
   pre/post counts and the recorded “owner-approved budget split” show a stop
   one entry above the then-applicable 70% target of 14. This is labelled an
   inference: the log does not literally call it a prune-target exception.
8. **Two imported architecture rules were superseded.** The v3 founding entry
   explicitly replaces the dot-crowd rule forbidding linear routes so the hero
   route and flow layers can coexist; the salvage entry replaces recovered
   stateful `tick(deltaMs)` behaviour because the owner-mandated deterministic
   timeline forbids accumulated runtime state. These are product-rule
   supersessions, not PM-Skills workflow exceptions. Sources: archived
   headings `Route Plotter v3 founding` and `Dot-crowd salvage`.

No other matches from searches for override, exception, default, rule, budget,
owner, skip, defer, preserve, supersede, prune, and archive clearly set aside a
framework rule or budget. Several other matches record ordinary product
decisions or successful compliance and were not relabelled as exceptions.
