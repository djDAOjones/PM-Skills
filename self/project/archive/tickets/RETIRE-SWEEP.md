---
id: RETIRE-SWEEP
name: A retirement must be swept, not asserted once
status: todo
milestone: current
flags: detail
blocked-on:
date: 2026-08-28
grades: Medium / Low / Low / Low
order: 1
summary: release.md's verify step checks that every changed distributed file is named in the changelog entry, but nothing checks the opposite — a file that should have changed and did not. A release that retires a claim or a rule leaves the framework contradicting itself wherever the claim is restated. Add the sweep; it costs one grep and it has already cost one release.
---
# RETIRE-SWEEP — a retirement must be swept, not asserted once

> **Status:** Current · **Grades:** Medium / Low / Low / Low.
> **Last assessed:** 2026-08-28 — created at the burn-down's second
> milestone boundary, from a defect that shipped the same day.

## Intent

`release.md` step 6 has a **coverage** check in one direction: every
changed distributed file must be named in the changelog entry, so a
change cannot ship undocumented. There is no check in the other
direction — a file the release *should* have changed and did not.
For most releases that gap is theoretical. For a release that
**retires** something, it is the whole risk: a claim is retired only
where it is asserted, and prompts restate each other.

## Done when

- `release.md` step 6 gains a retirement sweep: when a release
  removes or reverses a rule, claim, or recommendation, grep the
  distributed tree for its wording before verifying, and either
  change every site or state in the entry why a site legitimately
  differs.
- The check is stated as cheap and mandatory-for-retirements, not as
  a general "grep everything" — the trigger is the retirement, not
  the release.
- Names the failure it prevents concretely enough that a reader
  recognises it: the framework asserting both halves of a
  contradiction, with the consuming project's 3-way merge picking
  the loser.

## Evidence / context

CLOUD-TRUTH (4.17.0, 2026-08-28) retired the claim that cloud-synced
paths are "unsupported for project memory" from the AGENTS template,
and left it standing in `prompts/memory-maintenance.md`, `GUIDE.md`
and `integrations/dispatch.md`. The release-consistency check passed:
it only inspects files the release changed. The contradiction stood
until the framework's own environment preflight read one of the
stale copies about an hour later, and cost the 4.17.1 sweep release
to clear.

Two of those three sites existed in violation of canonical-copy
discipline in the first place, which is the deeper fix — but that is
a per-case judgement, and this is a check.

## Constraints

- `release.md` is `framework` class: this is a release.
- Do not turn step 6 into a general audit. One conditional
  sub-step, triggered by a retirement, with a concrete command.
- The grep is advisory in form — the maintainer judges each hit —
  but running it is not optional when the trigger fires.
