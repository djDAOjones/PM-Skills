---
description: Verify a review's findings against the source, then disposition them into project memory — for findings from any reviewer, including tools
---

# Findings

Take a pile of review findings and turn them into work you can
trust: **verify each one against the source**, notice what the
review missed, then disposition every survivor into the backlog.

The findings can come from anywhere — `prompts/review.md`, a
whole-repository audit, an external review tool, a colleague. This
prompt does not care who produced them. It cares whether they are
true, and what happens to them next.

## Why this exists

A deep review's raw output is a draft, not a verdict. Where two
projects ran one and kept the evidence, both independently wrote a
**critique of the review** before acting on it — and the critique
changed the answer. Across those two rounds it found:

- findings that were real but **materially over-rated**;
- a finding that was **already fixed** and had been re-reported
  stale;
- a **prescribed remedy that would have introduced a different
  defect** — the fix was more dangerous than the bug;
- several findings the review had **omitted entirely**.

Neither project was told to do this. Both did it because acting on
an unverified review is how a plausible wrong finding becomes a
sprint. Reviewing is increasingly something tools do well; deciding
what is *true* and what happens *next* is not, and that is the part
this prompt covers.

## 1. Verify each finding

Work through them one at a time, against the source — not against
the review's own summary of the source. Assign one verdict:

| Verdict | Meaning |
| --- | --- |
| **Confirmed** | Reproduced, or the code plainly says so. Cite `file:line`. |
| **Over-rated** | Real, but the severity or blast radius is smaller than claimed. Say what it actually is. |
| **Stale** | True when written, fixed since. Name the change that fixed it. |
| **Not reproduced** | May be real; could not be demonstrated. Say what would demonstrate it. |
| **Wrong** | The code does not do this. Cite what it does instead. |

Three rules make the difference between a verification and a
re-reading:

- **Verify the remedy, not just the defect.** A correct finding
  with a wrong fix is the most expensive kind, because it passes
  review and ships. Ask what the proposed change does in the cases
  the finding does not mention.
- **Check for staleness before anything else.** It is the cheapest
  check and the most common false positive, especially where the
  review ran against an older commit. Name the baseline commit the
  findings describe and diff forward.
- **Do not discard executable evidence without refuting it.** If a
  finding came with a reproduction, disagreeing means running it.
  An opinion does not outrank a demonstration.

Record the verdicts as a table. Disagreements are the valuable
part — state them plainly, with the evidence, not as hedges.

## 2. Ask what the review missed

Read the review's own coverage claim against what is actually
there: which areas it names, which it does not, and which it
mentions but never examines. Silence is not a clean bill of health.

Two cheap sweeps that repeatedly find omissions:

- **The seams** — where the review's sections meet. Findings that
  belong to no single area are the ones a sectioned review drops.
- **The claims it inherited** — anything it asserted from a
  document, a comment, or another review rather than from code.

Add what you find as new findings and verify them the same way.

## 3. Disposition every survivor

A verified finding is not done until it is somewhere the project
will see it again. For each **Confirmed**, **Over-rated**, and
**Not reproduced** finding:

- **Fix now** — only if it is genuinely small and in scope for the
  current task. It then follows the normal task and gate rules.
- **Backlog item** — the usual case. Written in the project's own
  ticket grammar, not left as review prose, so the queue can order
  it against everything else. Severity informs the grade; it does
  not become the grade.
- **Wish-list** — worth keeping, not worth scoping yet.
- **Declined** — with the reason. A finding argued down is a
  decision, and belongs in the decision log like any other.

**Stale** and **Wrong** findings are recorded as such and dropped.
Do not silently delete them: the next reviewer will find the same
thing, and the record of why it is not a finding is what stops the
loop.

Keep a **crosswalk**: every original finding ID against its verdict
and where it went. It is what lets someone months later ask "what
happened to R-07?" and get an answer.

When the survivors are many enough that their *order* matters —
several touch the same code, or one should clearly precede another —
`prompts/improvement-waves.md` groups them into a staged programme
instead. Individual disposition cannot decide sequencing.

## Finding shape

Whatever the source review used, a finding leaving this prompt
carries:

- **Location** — `file:line`, or the flow if it is not one place.
- **Severity** and **confidence**, separately. A high-severity
  low-confidence finding and a low-severity certain one need
  different handling, and one combined number hides that.
- **Evidence** — what was observed, and how.
- **Realistic scenario** — the conditions under which it actually
  bites. A finding with no plausible scenario is a note.
- **Remedy**, and what the remedy costs or risks.
- **Verification** — how anyone will know it is fixed.

## Rules

- **Never claim a command was run that was not run**, and never
  report an outcome you did not observe. This applies to the
  original review's claims too — a check reported as passing that
  was never run is itself a finding.
- **Trace before calling anything dead.** Unused-looking code is
  the classic confident wrong finding.
- **Check for existing mitigations and tests** before reporting a
  gap. Much of what a review finds is already handled somewhere it
  did not look.
- **Say where the evidence is thin.** A verification pass that
  never says "I could not tell" is not being honest about its own
  limits.
- This prompt **proposes**; it does not edit code. Fixes are normal
  work, scoped and gated as usual. To run the verification without
  touching the tree at all, declare `prompts/read-only.md`.
