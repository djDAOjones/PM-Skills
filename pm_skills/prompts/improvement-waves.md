---
description: Turn verified findings into a staged programme of small, reversible, behaviour-preserving changes — planning only, never implementation
---

# Improvement waves

You have a pile of verified findings about a codebase. This turns
them into a **programme**: a small number of reviewable waves, in a
safe order, each independently revertible, with an honest account of
what was and was not looked at.

Planning only. It never edits code. Each accepted wave becomes normal
work — `integrations/task.md` in `refactor` mode for a
behaviour-preserving one — with its own gates.

## Where it sits

- **`prompts/review.md`** and a whole-repository audit produce
  findings.
- **`prompts/findings.md`** verifies each one and dispositions it —
  individually.
- **This** is what individual disposition cannot do: decide the
  order, the grouping, and the stopping point across all of them.
- **`task.md` refactor mode** executes one accepted wave.

Run it under `prompts/read-only.md`. That posture already settles
whether a gateless single-pass planning run is legitimate: gates
exist to stop irreversible change, planning makes none, and the
exemption ends the moment a wave is executed.

## Consume findings; do not re-census

Start from findings that already exist and cite them by ID. Do not
re-derive the census — two coverage claims over one repository will
disagree, and then neither can be trusted. Traceability comes from
the ledger below pointing at finding IDs, not from doing the work
twice.

If there are no findings yet, stop and say so. This prompt does not
substitute for looking.

## What a wave is

A wave is a group of changes that:

- **shares a rationale** — one boundary clarified, one duplication
  resolved, one seam made testable. "Assorted small fixes" is not a
  wave;
- **is independently revertible** — reverting it leaves the codebase
  coherent, without unpicking a later wave;
- **fits one review** — if nobody will read it in one sitting, it is
  two waves;
- **is preceded by its own safety net** — where coverage is thin, the
  first step of the wave is the test that makes the rest verifiable,
  not an afterthought.

Order waves by dependency, then by risk retired per unit of work.
Put the cheapest wave that de-risks the others first.

## The pilot

The first wave is a **pilot** and is treated differently: run it,
then stop and compare what happened against what was predicted —
effort, blast radius, what the gate said, what surprised you.

If the pilot's prediction was wrong, re-plan the remaining waves
before running any of them. A programme whose first estimate missed
is a programme built on a wrong model, and running wave two on
schedule is how a plan outlives its evidence.

## Treatments, and "leave it" among them

Abstraction is **not** the objective. Every finding gets one of:

- **Abstract** — extract the shared thing. Only when the duplication
  is genuinely the same thing, not merely similar-looking.
- **De-abstract** — inline it back. An abstraction with one caller,
  or one whose parameters encode its callers' differences, costs more
  than it saves.
- **Simplify** — same shape, less of it.
- **Isolate** — leave it as it is, behind a boundary, so it stops
  spreading.
- **Keep the duplication** — two things that look alike and change
  for different reasons should stay apart.
- **Leave unchanged** — a first-class outcome, not a failure to
  decide. Record why, so the next pass does not re-litigate it.

A plan whose every entry says "abstract" has not been thought about.

## Coverage ledger

The programme's honesty rests on this. For every area of the
repository, record which of the following it was:

| Grade | Meaning |
| --- | --- |
| **Substantive** | Read and assessed. Conclusions are evidenced. |
| **Superficial** | Skimmed. Conclusions are provisional and labelled. |
| **Classified only** | Identified and categorised, not inspected. |
| **Excluded** | Deliberately out of scope, **with the reason**. |

"Exhaustive" means this ledger reconciles against the repository —
every area appears exactly once — **not** that everything was read.
An unbounded claim of complete assessment is the failure this ledger
exists to prevent.

**Never trade inspection for assumption when the run cannot finish.**
If context or time runs out, areas stay *classified only* and the
programme covers less. Downgrading the grade is honest; inferring
what an unread area probably contains is not.

## Findings that are not problems

Record what is working and should be preserved — a boundary that is
holding, a test suite that is genuinely load-bearing, a duplication
that is correct. Two reasons: a later wave that erodes it will be
recognised as a regression rather than an improvement, and a plan
that is exclusively negative gets read as an opinion about the
authors rather than the code.

## Measures

Report a few, and treat every one as an **observation, not a
target**:

- coverage — areas substantively assessed against areas accounted
  for;
- waves accepted, shipped, and reverted;
- gate result before and after each wave.

Do **not** set numeric targets for code properties — line counts,
file counts, duplication percentages, module sizes. This prompt
authorises the very changes that would move those numbers, so a
target makes gaming them the cheapest way to succeed.

## Report lifecycle

- The programme is written to the project's **cold** documentation,
  outside anything read every session. It is a document to consult,
  not context to carry.
- It is **proposed**. A human accepts waves individually — accepting
  the plan is not accepting every wave in it.
- Each accepted wave becomes one task and one record: its decision in
  the decision log, its outcome in the trajectory, its item in the
  backlog like any other work.
- Unaccepted waves stay in the document with the reason. They are not
  deleted, and they are not re-proposed until something changes.

## Report contract

1. **Scope and coverage ledger** — the table above, reconciled.
2. **What is working** — preserve-these findings.
3. **The waves** — each with its rationale, the finding IDs it
   addresses, its treatment, its safety net, its dependencies, and
   how a reviewer will know it preserved behaviour.
4. **The pilot** — which wave, and what it is expected to cost.
5. **Not planned** — findings deliberately left, with reasons.
6. **Confidence** — where the evidence is thin, in plain words.
