---
id: WCAG-3
name: WCAG 3.0 — assess the implications for the default UI bar
status: todo
milestone: icebox
flags: detail, blocked
blocked-on: WCAG 3.0 reaches W3C Candidate Recommendation, or a consuming project's own compliance regime requires it — whichever fires first; maintainer confirms the trigger
date: 2026-08-30
grades: High / Medium / Medium / Low
order: 6
summary: decide what pm-skills changes when WCAG 3.0 matures. The framework ships "WCAG 2.2 AAA by default" to every consuming project, restated across seven distributed sites, and 3.0 replaces the A/AA/AAA conformance model outright — so the default has no direct translation and a partial change would ship a contradiction. Assessment only; no adoption before the standard is stable.
---
# WCAG-3 — WCAG 3.0 and the default accessibility bar

Record only — the trigger is unfired. Filed 2026-08-30 on the
maintainer's instruction to queue the consideration, not the change.

## Intent

Decide, once WCAG 3.0 is stable enough to act on, what the framework
tells consuming projects: adopt 3.0, dual-track it against 2.2, or
stay on 2.2 with a documented review date. This is a **product**
decision about the distributed defaults — this repo has no UI of its
own (root `AGENTS.md` → "Not applicable here").

## Blast radius (verified by grep, 2026-08-30)

"WCAG 2.2 AAA" is asserted in **seven distributed sites**, not one:

- `pm_skills/templates/UI-STANDARDS.md` — five (the section heading
  and target at :133/:135, the 7:1 and 4.5:1 contrast numbers at
  :141, the 44x44 px pointer target at :153, and the checklist
  restatement at :225)
- `pm_skills/templates/AGENTS.md:180`
- `pm_skills/GUIDE.md:11`, `pm_skills/init.md:50`,
  `pm_skills/integrations/init-mvp.md:16`, `README.md:16`

This is a textbook **RETIRE-SWEEP** case (4.19.0): a bar withdrawn in
one file and left standing in six means the framework asserts both
halves of a contradiction, and a consuming project's 3-way merge
picks a half at random. Any change here runs `release.md` step 6
over the whole distributed tree, and ships as a release with upgrade
actions because `UI-STANDARDS.md` is a template consuming projects
have already populated and customised.

## Why the translation is not mechanical

WCAG 3.0 does not renumber 2.2 — it restructures. Two consequences
the assessment must settle rather than assume:

- **"AAA by default" may have no successor.** 3.0 drops the
  A/AA/AAA success-criterion model, so the single word the framework
  currently leans on to set the bar may not exist in the new
  vocabulary at all.
- **The hard numbers may not port.** UI-STANDARDS' 7:1 and 4.5:1 come
  from 2.x's contrast-ratio maths; 3.0 drafts have explored a
  perceptual contrast algorithm instead, which is not a rescaling of
  the same quantity. If that holds, the numbers change rather than
  move — check the current draft for the algorithm it names.

## Verify before acting

**Status at filing is from the drafting agent's training knowledge
and was NOT checked against w3.org: WCAG 3.0 believed still a W3C
Working Draft, no Candidate Recommendation, no target date.** That
claim ages badly by construction. Re-verify the current status
against the W3C first — if 3.0 has advanced, the trigger may already
have fired and this record's premise is stale.

## Risk that sets the pace

Accessibility conformance is a claim with legal weight in several
jurisdictions, and the framework makes it on behalf of every project
that adopts its defaults. Shipping a premature or wrong 3.0 bar
propagates a false claim downstream. Moving late costs nothing;
moving early costs correctness. Hence: assessment first, and no
adoption before the standard is stable.

## Done when

1. Current W3C status verified first-hand and recorded.
2. A decision is recorded in the decision log — adopt / dual-track /
   stay on 2.2 with a review date — with its rationale.
3. If the decision is to move, the sweep is scoped: all seven sites
   named, the release class chosen, and the upgrade actions drafted
   for projects whose `UI-STANDARDS.md` is already customised.
