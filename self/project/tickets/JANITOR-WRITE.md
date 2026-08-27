---
id: JANITOR-WRITE
name: Auto-run maintenance verbs
status: todo
milestone: icebox
flags: detail,blocked
blocked-on: per-verb scenario green + explicit per-verb maintainer sign-off
date: 2026-08-09
grades: Medium / Medium / Medium / Medium
order: 6
summary: graduated autonomy, Reconcile rung first; a blanket sign-off does not open this gate.
---
# JANITOR-WRITE — Auto-run maintenance verbs (graduated)

> **Status:** Icebox — deliberately gated · **Grades:**
> Medium / Medium / Medium / Medium.
> **Gate:** per-verb harness scenario green **plus** an explicit
> per-verb maintainer sign-off recorded in the decision log. A
> blanket sign-off does not open this gate (2026-08-17 sweep
> ruling: the graduated-autonomy governance is the point, not an
> obstacle).

## Intent

Let the janitor *write*: run maintenance verbs unattended, verb by
verb, in trust order — Reconcile first (parse-and-append, lowest
judgement), Prune later (moves files), doc-sync perhaps never
(protected docs are sign-off territory by definition).

## Done when (per verb, repeated per rung)

- A corrupted-state harness scenario proves the verb: e.g. for
  Reconcile, a fixture with planted `Close: lite` trailers that the
  janitor back-fills, byte-asserted against expected memory writes.
- The maintainer signs off **that verb** in the decision log.
- The janitor gains the verb behind an explicit flag, with every
  write landing as a tagged commit (auditable, reversible) and a
  kill switch (delete the flag, janitor is read-only again).

## Evidence / context

Assessment C9 split READ/WRITE on the propose-first line
(memory-policy: budgets propose, never block; maintenance is
proposed, never auto-run). The continuous-core fiction assumes
this ships eventually; the ablation's governance arm (D) showed
prohibition-class rules doing real work — this gate is that class.

Last assessed 2026-08-17 (INTAKE-DEEP): hold — the per-verb gate is
untouched (no scenario built, no per-verb sign-off recorded).
JANITOR-READ is now live and bedding in (4.5.0; reports untracked
since REPORTS-IGNORE), so the Reconcile-rung scenario can be built
whenever the maintainer chooses to open the gate.

## Approach

Reconcile-rung first, built on JANITOR-READ's wrapper: detect
unreconciled trailers → apply the documented Reconcile procedure →
commit tagged `janitor:reconcile` → report. Only after its scenario
and sign-off. Prune-rung design waits until the Reconcile rung has
run clean for a stated period.

## Constraints

- JANITOR-READ ships and beds in first.
- Never bypasses the gate or the validator; a red gate stops the
  janitor cold.
- Doc-sync stays human-gated indefinitely unless the maintainer
  explicitly rules otherwise.

## Open questions

- The clean-period threshold before the Prune rung is designed —
  propose at Reconcile sign-off time.
