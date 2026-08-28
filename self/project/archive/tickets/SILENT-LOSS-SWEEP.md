---
id: SILENT-LOSS-SWEEP
name: Audit the generator/validator family for silent loss
status: todo
milestone: current
flags: detail
blocked-on:
date: 2026-08-28
grades: Medium / Medium / Low / Low
order: 1
summary: two defects of identical shape in five days — a parser in a gen-/check- script discarding real content with no error, in both deliberate forks — say the class is worth one deliberate pass rather than a third accident. Audit every parsing assumption in the family, fix what silently drops content, and make deliberate leniency explicit where a parser must tolerate variation.
---
# SILENT-LOSS-SWEEP — audit the family for silent loss

> **Status:** Current · **Grades:** Medium / Medium / Low / Low.
> **Last assessed:** 2026-08-28 — created at the run-two burn-down's
> milestone boundary, from that run's own findings.

## Intent

The `gen-*.mjs` / `check-*.mjs` family parses text this project
authors, and its characteristic failure is **silence**: output that
still looks well-formed while real content has been dropped. Two
instances in five days, both in both forks, both found by accident.
Find the rest deliberately.

## Done when

- Every parsing assumption in the family is listed — the source
  forks (`scripts/`) and the distributed copies
  (`pm_skills/scaffold/`) — with, per assumption, what input defeats
  it and whether the failure is loud (error) or silent (content
  dropped, check skipped).
- Every silent one is either fixed, or documented in the script as a
  deliberate tolerance with the reason.
- Fixes land in both forks in the same change (CONTRIBUTING →
  deliberate forks); distributed changes ship as a release.
- The audit list itself survives the close — as the decision-log
  entry's content, so a third instance can be checked against it
  rather than re-derived.

## Evidence / context

Two confirmed instances, both this week, both in generated-file
utilities, both silent:

- **FILEMAP-WRAP** (4.16.1, 2026-08-28) — `existingRoles()` matched
  role text with a single-line regular expression, so any
  hand-wrapped role lost everything after its first line. Four roles
  in this repo's own map had already decayed to half-sentences.
- **FLAGS-EMDASH** (4.18.1, 2026-08-28) — `check-memory` split the
  view line on the first em-dash anywhere, so an em-dash inside a
  flag body erased flag parsing, the standing-age check and the date.
  Measured: the validator reported zero warnings on records carrying
  a 43-day standing item.

Both were found while reading output for an unrelated purpose. That
is the argument for the sweep: the detection mechanism to date has
been luck.

## Constraints

- Behaviour on well-formed input must not change — this is a
  correctness audit, not a redesign.
- Deliberate-fork rule: a fix crosses to the sibling in the same
  change, or neither moves.
- No new dependencies; these scripts are dependency-free by contract.
- If the audit finds nothing further, that is a valid and useful
  result — record the list and close it.
