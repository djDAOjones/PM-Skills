---
id: RELEASE-EVALS
name: Advisory harness line in the release close
status: todo
milestone: current
flags: detail
date: 2026-08-17
grades: High / Low / Low / Low
order: 1
summary: run the applicable harness scenarios at every release close and note results in the closing report — advisory, never blocking; hangs the shipped regression net in the loop it protects (reflection run one, finding 6).
---
# RELEASE-EVALS — Advisory harness line in the release close

> **Status:** Current #1 · **Grades:** High / Low / Low / Low.

## Intent

Wire the eval harness (R0-INSTR, `scripts/eval/`) into the release
close: at every release, run the applicable scenarios and note the
results in the closing report. Advisory — results inform, never
block. Closes reflection run one's sharpest finding: 4.5.0
restructured the very changelog the upgrade scenario protects with
no scenario run, and no scenario has run at any release since R0 —
I5 (regression visibility) regressed in practice.

## Done when

- `pm_skills/prompts/release.md` carries the advisory line, phrased
  for any project (if the project keeps an eval harness, run the
  applicable scenarios and note results) — a distributed change, so
  a release.
- The repo release checklist (root `AGENTS.md` end-of-task
  extension) carries the matching line for this repo's own
  `scripts/eval/` scenarios.
- The janitor-report question is decided at scoping: REFLECT-1
  folded "the report is the natural carrier for a reflection
  trigger line" into this item's scope — take it or record why not.
- The release that ships this closes with the line honoured — the
  first release to run under the net.

## Evidence / context

Reflection run one finding 6, the only finding to survive pass 2
intact, plus the REFLECT-1 decision fold (both 2026-08-17). The
harness exists and is green (R0-INSTR, 2026-08-09); it has never
run at a real release. Self-hosted discount applies, but the miss
is mechanical fact, not judgement.

## Approach

Smallest useful change: one paragraph in the release prompt, one
checklist line in the root contract, the janitor trigger-line call
made at scoping. The scenario-to-release-class mapping stays
minimal (upgrade scenario for any changelog or manifest change;
close-control for close-protocol changes) — propose it at scoping.

## Constraints

- Advisory, never a gate — a red scenario informs the closing
  report; it does not block the release.
- No new distributed files; the scenarios themselves stay
  source-only in `scripts/eval/`.

## Open questions

- (none — the janitor trigger-line call is a scoping decision,
  recorded above.)
