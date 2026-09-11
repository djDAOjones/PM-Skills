# Field grading — the project-management benefits, read from real projects (2026-09-11)

<!-- Dated evaluation. Analysis of the field-reports tier, written
     here per self/field-reports/README.md ("an analysis of field
     reports is written as an evaluation and links back to the
     reports it read"). Session start SHA: cff13bc. Trigger: the
     maintainer's commission after the clean-room ablation (lab
     findings 2026-09-10) could not measure the framework's
     long-horizon benefits — cross-session carry, planning, drift —
     because its four items were independent by design. Question
     put: can those benefits, and the six the clean-room did measure,
     be assessed from real projects? Method: the clean-room's own
     signal definitions applied to the session archives, memory
     exports and git-log exports filed in this tier. Extractor and
     per-conversation table kept maintainer-side (~/cleanroom-private/
     field-work/); nothing private is quoted here — every excerpt is
     from a tracked, redacted export. -->

**Workflow declaration.** A read-only analysis of filed evidence.
Nothing in the tree changed except this file and the close lines in
`self/project/`. No consuming project's live memory was touched.

## Question

The clean-room ablation graded four substrates on what one fresh
session ships. The maintainer's stated value of the framework is
different — long-term planning, staying on task, project-management
discipline — and three of the nine benefits named for it could not be
measured in isolated sessions. Can real projects measure them, and
what do they show?

## Headline

**Yes, observationally, and the real projects show the substrate doing
the job the clean-room could only infer.** Across 47 substantive
conversations on three projects (Route Plotter, vinyl-sorting, the UoN
video-helper; two harnesses, 2026-08-18 to 2026-09-02), sessions that
shipped code had read project memory before their first code change
90–100% of the time and wrote memory back 70–88% of the time; two
thirds to nine tenths of all commits touch the memory files; decision
logs cross-reference earlier decisions and supersede them with dated
reasons; and on the one project with a pre-install record, the memory
became two and a half times denser and twice as cross-referenced after
the framework was installed. What real projects cannot give is the
counterfactual: every session postdates its project's install, so the
absence of the substrate is visible only in the clean-room's bare arms.
The two are complementary and their findings agree.

## What can be read from where

| Benefit | Source in the tier | Read here? |
| --- | --- | --- |
| Context intake | session logs: memory read before the first code write | yes |
| Process adherence | session logs: rulebook read; ritual sessions invoked | yes |
| Decision retention | session logs: memory writes; memory exports: entries | yes |
| Deferral discipline | memory exports: deferred entries → later pick-up | yes |
| Progress legibility | git-log exports: commits touching memory | yes |
| Close ritual | session logs: shipped sessions that wrote memory | yes |
| Cross-session carry | memory exports: entries citing earlier ones; narration | yes |
| Long-horizon planning | deferral pay-off; memory-only commits | partly (streams are days long) |
| Drift resistance | supersedes with reasons; intake-vs-no-intake contrast | partly (contrast is underpowered) |

## The evidence base

| Project | Substrate | Conversations | Harness | Span | Tool calls |
| --- | --- | --- | --- | --- | --- |
| Route Plotter | canon 4.7.0 | 13 (10 shipped) | Claude Code 11, Codex 2 | 2026-08-18 → 08-27 | 6,580 |
| vinyl-sorting | pm-next v0.2 | 18 (10 shipped) | Claude Code 13, Codex 5 | 2026-08-28 → 09-02 | 2,522 |
| UoN video-helper | canon 4.9.2 | 16 (9 shipped) | Claude Code 12, Codex 4 | 2026-08-24 → 08-27 | 7,082 |
| eBay Tool | pm-next v0.2 | 3 | Codex 3 | 2026-08-30 | 100 |

A conversation is a top-level thread with its forks and spawned child
agents merged in (Codex spawned 52 child agents and 65 guardian review
threads across the archives; Claude Code sidechain subagents likewise
fold into their parent). Sessions with no work in the log (a question
answered in prose; a prompt whose work happened in a thread not
archived) are excluded from the rates. **eBay Tool is not gradeable
at session level**: its archive holds guardian review threads and
three thin top-level rollouts with seven patches; the working threads
are not in the tier. Route Plotter's Windsurf/Cascade era (April to
mid-August) is not in any session archive either — it is visible only
through the memory it left, which is what makes the before/after
comparison below possible.

## Per-project grades

Same 0/1/2 scale as the clean-room arms; the rate behind each cell is
in the table that follows.

| Dimension | Route Plotter | vinyl-sorting | UoN video-helper |
| --- | --- | --- | --- |
| Context intake | 2 | 1 | 2 |
| Process adherence | 2 | 1 | 2 |
| Decision retention | 2 | 2 | 2 |
| Deferral discipline | 2 | 1 | 1 |
| Progress legibility | 2 | 2 | 2 |
| Close ritual | 2 | 1 | 2 |
| Cross-session carry | 1 | 1 | 2 |
| Long-horizon planning | 1 | too short | too short |
| Drift resistance | 1 | 1 | 1 |
| **Total (of 14 on the clean-room's six + close)** | **12** | **9** | **11** |

The rates (substantive conversations; shipped conversations in
brackets):

| Measure | Route Plotter | vinyl-sorting | UoN video-helper |
| --- | --- | --- | --- |
| Read memory before first code write | 92% (100%) | 60% (90%) | 100% (100%) |
| Read memory within the first 3 calls | 0% (0%) | 13% (20%) | 25% (11%) |
| Read the rulebook explicitly | 69% (70%) | 60% (90%) | 91% (88%) |
| Wrote memory during the session | 61% (80%) | 46% (70%) | 66% (88%) |
| Narration cites an earlier decision | 7% (10%) | 6% (10%) | 25% (33%) |
| Sessions writing a deferral | 5 | 6 | 5 |
| Sessions writing a supersede | 2 | 3 | 5 |
| Commits touching memory files | 58 of 86 (67%) | 79 of 115 (68%) | 103 of 111 (92%) |
| Memory/docs-only commits | 24 | 23 | 34 |
| Decision-log entries (span) | 75 (54 post-install, 5 days) | 51 (4 days) | 56 (3 days) |
| Entries citing or building on an earlier one | 12 (16%) | 5 (10%) | 11 (20%) |
| Entries superseding an earlier one | 18 | 4 | 17 |
| Deferred entries → later picked up | 16 → 5 | 2 → 0 | 5 → 0 |

Reading the cells:

- **Intake is real but not first.** Shipped sessions read memory
  before changing code 90–100% of the time, yet only 0–25% read it
  within the first three calls. The field pattern is *orient in the
  code, consult memory before editing* — the same pattern the
  clean-room saw from Claude on the canon arm, now visible as the norm
  across both harnesses. The clean-room's 100%-at-call-one on Codex
  was the exception, not the rule.
- **vinyl-sorting's lower intake and adherence** follow from its
  setup: pm-next with no `CLAUDE.md`, so Claude Code auto-loads no
  rulebook and every session has to fetch `AGENTS.md` by hand (90%
  of shipped sessions did); and several Codex Desktop threads were
  conversational, not working, which drags the substantive-rate down
  without touching the shipped-rate.
- **Retention and legibility are the substrate's strongest showing.**
  Two thirds of all commits on two projects and 92% on the third
  touch the memory files; 23–34 commits per project are memory or
  documentation only — the record is maintained continuously, not
  reconstructed at the end.
- **Carry is present and modest at session level, stronger in the
  record.** Narration rarely says "as decided"; the decision-log does
  the citing: 10–20% of entries build on an earlier dated entry
  ("beneath the hero route per the founding decision" — Route Plotter,
  2026-08-18), and 4–18 entries per project supersede an earlier one
  with the date and the reason ("tick() API superseded per
  2026-08-17"). That is drift being *caught and recorded*, not
  drift happening silently.
- **Deferral pay-off needs a longer stream.** Route Plotter, the only
  project with months of record, picked up 5 of 16 deferrals
  (`getSegmentLengths()`, the export "Included" consolidation); the
  three-day streams have not had time to.

## Before and after, on the one project that has both

Route Plotter kept a home-grown project memory from April 2026 and
installed pm-skills on 2026-08-17. Its decision-log, by era:

| | Pre-install (Apr–Aug 16) | Post-install (Aug 17–27) |
| --- | --- | --- |
| Entries | 21 on 5 recorded days | 54 on 5 recorded days |
| Citing or building on an earlier entry | 2 (9%) | 10 (18%) |
| Superseding an earlier entry | 3 | 15 |
| Deferred entries | 6 | 10 |
| Words per entry | 203 | 341 |

Two and a half times the entries per recorded day, twice the
cross-reference rate, five times the reasoned reversals, entries two
thirds longer. This is the closest thing the tier holds to a
counterfactual, and it is not a clean one: the pre-install era ran on
a different harness (Windsurf/Cascade) with a different memory layout,
and the post-install fortnight was an unusually intense burn-down (86
commits in five days). It says the record got richer and more
self-referential once the framework arrived; it does not by itself
say why.

## What real projects cannot tell you

- **No counterfactual.** Every archived session ran with the
  substrate. The contrast the design allows — shipped sessions that
  did not read memory versus those that did — has n=1 on the "did
  not" side (vinyl-sorting; it wrote no memory and cited nothing,
  consistent but a single case). The clean-room's bare arms remain
  the only evidence of what absence costs.
- **Lower bounds throughout.** A harness that auto-loads the rulebook
  needs no read call, so "read the rulebook" undercounts on Route
  Plotter and the video-helper; a session may have carried context in
  its prompt rather than from a file.
- **Short streams.** Three to ten days each. Planning and deferral
  pay-off are month-scale behaviours; only Route Plotter's record
  reaches back far enough to show them at all.
- **Heuristic classification.** Session type, intake, writes and
  citations are regex-detected from the logs and spot-checked by
  hand, not double-scored. The extractor and the per-conversation
  table are kept maintainer-side for re-running.

## Disposition

The maintainer's question is answered: the six measurable benefits
transfer directly to real projects and the three long-horizon ones
are readable from the memory record, with the caveats above. The
field agrees with the clean-room on the substrate's job — it buys the
record, and the record is used — and adds what the clean-room could
not: the record is maintained continuously (two thirds of commits),
cross-referenced (10–20% of entries), and revised with reasons rather
than silently contradicted. The field's own gap is the counterfactual;
the clean-room's is the horizon. Together they are the evidence base
the reflection practice should weight.

Reports read: `self/field-reports/route-plotter/` (memory, git-log,
rulebooks and init-prompt exports; deployment snapshots; the session
archive), `self/field-reports/vinyl-sorting/` (memory, git-log,
rulebooks, init-prompt, janitor, validator; the session archive),
`self/field-reports/uon-video-helper/` (memory, git-log, rulebooks,
usage analyses; the session archive), `self/field-reports/ebay-tool/`
(deployment snapshot; the session archive). Companion: the lab
findings `lab/findings/2026-09-10-cleanroom-ab.md` in PM-Skills-lab.
