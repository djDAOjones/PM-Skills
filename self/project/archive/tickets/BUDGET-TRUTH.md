---
id: BUDGET-TRUTH
name: Make the size checks tell the truth
status: todo
milestone: current
flags: detail
blocked-on:
date: 2026-08-28
grades: High / Medium / Medium / Low
order: 2
summary: the budget system catches up with field evidence, three parts, one release — backlog Active loses the last fixed word cap (re-derived per the policy's own noise-not-size principle), prune-to targets gain the recorded quality-stop clause both projects invented, and the validator's reference-doc sweep gains the root rulebooks the policy row already names (AGENTS.md included, both check-memory forks).
---
# BUDGET-TRUTH — Make the size checks tell the truth

> **Status:** Current · **Grades:** High / Medium / Medium / Low.
> **Last assessed:** 2026-08-28 — created at the run-two triage,
> merging the study's BUDGET-QUALITY-BAR and RULEBOOK-BUDGET
> candidates (same files: `memory-policy.md` + both `check-memory`
> forks — the study's section 14 called them disjoint in error;
> see the addendum).

## Intent

The policy has already replaced fixed word caps where they trained
people to ignore warnings — file-map (derived), decision-log
(entry-count primary), read load (no aggregate cap) — each time
naming that exact pathology. Finish the job where the field showed
it still bites, and make the validator implement the policy's own
reference-doc scope.

## Done when

Three parts, one release:

1. **Backlog Active budget re-derived.** Item count (40) stays the
   primary trigger; the fixed 1,500-word cap is replaced by a
   per-item verbosity guard (mirroring the decision-log's
   entry-guard design — the table already says "a low item count
   with high words means items are too verbose"). JSON block and
   table updated together.
2. **Quality-stop clause for prune-to.** A prune that stops above
   the 70% target because live context still feeds open work is
   compliant **when the stop is recorded** — the doctrine both
   projects wrote independently ("pruning must never harm
   development quality"; "the inline detail is doing real work"),
   made policy instead of per-project exception.
3. **Reference-doc sweep completeness.** The policy row's "project
   standards/process/infra docs" is made explicit — root rulebooks
   including `AGENTS.md` — and both validators implement it
   (`pm_skills/scaffold/check-memory.mjs` + `scripts/check-memory.mjs`,
   deliberate-fork rule: both or neither).

## Evidence / context

Field study FS2-03 (strengthened by the addendum) and FS2-04
(reshaped by it): the Active word warning stood in 10/12 Video
Helper session traces as a standing overridden state; Route
Plotter's owner-gated prune stopped above target with the stop
recorded; the Video Helper's fresh-init AGENTS.md reached 4,502
words in four days with no budget anywhere to notice. Future
observable: the Active warning stops appearing as a standing state
in the next harvest's traces; a rulebook WARN line exists.

## Constraints

- Count budgets stay hard; this loosens nothing that held in the
  field.
- Budget numbers change only in `memory-policy.md` (block + table
  together); a budget change is a framework release.
- Validator changes land in both forks in the same change
  (CONTRIBUTING → deliberate forks).

## Open questions

- Per-item guard number: derive from the field corpus (Video
  Helper 26 items / ~3,000 words ≈ 115 w/item lived-fine) rather
  than guessed — pick at implementation, record the derivation.
