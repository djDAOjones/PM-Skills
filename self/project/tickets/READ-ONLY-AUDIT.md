---
id: READ-ONLY-AUDIT
name: Read-only deep investigation verb
status: todo
milestone: current
flags: detail
date: 2026-08-27
grades: High / High / Medium / Low
order: 2
summary: investigate a verb that examines a whole application deeply in one autonomous run and returns a comprehensive report, under a hard read-only guarantee — a no-write contract, isolation for any command that might write, and a start-and-end integrity check. Basis archived at self/inputs/2026-08-27-read-only-repository-review-prompt.md. Third of three overlapping read-only analysis items; settle the family before building any.
---
# READ-ONLY-AUDIT — read-only deep investigation verb

> **Status:** Icebox — investigation, unblocked. **Grades:** provisional at intake
> (2026-08-27): High / High / Medium / Low.

## Intent

A verb that investigates an entire application deeply — in one
continuous autonomous run, under a guarantee it changed nothing —
and returns a comprehensive report. Not a review of one change.

## Source material

`self/inputs/2026-08-27-read-only-repository-review-prompt.md`:
eight phases, thirteen dimension sections, a twenty-section report.
The larger sibling of the prompt REVIEW-SUITE is built on.

## What is genuinely new

- **A hard read-only contract.** Roughly thirty prohibited
  actions, isolation rules for any command that might write into
  the tree, and the fallback: if safe isolation is unavailable, do
  not run it — say so and continue statically. The framework has a
  findings-only *posture* (spike mode, `review.md`); it has no
  no-write contract at the command level.
- **A start-and-end integrity check.** Record repository status at
  both ends; if the tree changed, report it prominently and do not
  repair it. That is a verifiable guarantee rather than an
  instruction, and it is the part most worth stealing.
- **Autonomous single-run mode.** No approval pauses, no
  clarifying questions: infer, label the assumption and its
  confidence, continue, and record unresolved questions in the
  report. This cuts against a framework built on gates — a real
  tension to decide, not to skip past.
- **Breadth** beyond REVIEW-SUITE's list: privacy and data
  governance, API and data-contract quality, platform-specific
  concerns, a cross-cutting consistency pass, root-cause themes,
  and a review-coverage matrix.

## Investigation questions

- Merge with REVIEW-SUITE, or keep the split above?
- Verb or **mode**? A reusable no-write posture would serve
  review, spike, and ABSTRACTION-PLAN alike, and may be worth
  more than a fourth deep verb.
- Does a no-pause autonomous mode belong in a gated framework, and
  if so under what sanction?
- Cost: this prompt is long, and the whole-repo audit recipe
  already insists on chunking. Do the two compose, or compete?
- Where the report lives, and how findings become records.

## Constraints

- **Read-only is the product** — the verb never edits.
- **Product tree, so every change is a release** — VERSION,
  CHANGELOG with upgrade actions, MANIFEST and GUIDE sync.
- **Zero dependencies** — prose curriculum, never a scanner.

## Evidence needed at pick

As with REVIEW-SUITE: this repository has no application to
investigate deeply — Markdown and lint tooling, no runtime, no
interface. A real consuming project is the test.

## Family settled (2026-08-27 Re-assess)

The three read-only whole-repository items were carried as "one
unsettled family — do not build all three" across three passes. The
2026-08-27 Re-assess adopted the division of labour READ-ONLY-AUDIT
already proposed, rather than defer a fourth time:

- **REVIEW-SUITE** — *what is wrong*: dimensions, finding schema.
- **ABSTRACTION-PLAN** — *what to change*: waves, pilot, metrics.
- **READ-ONLY-AUDIT** — *how to run either safely*: the no-write
  contract, single-pass autonomous mode, integrity check. It is the
  shared **mode**, not a third verb.

Consequence: READ-ONLY-AUDIT is a dependency of the other two, not a
competitor, and should be settled first. Nothing is merged and
nothing is cut — the overlap was in the framing, not the content.
