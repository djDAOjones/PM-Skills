# EVAL-SCEN — First behavioural scenario: findings

<!-- self/evaluations/ — cold tier, never auto-read. Spike findings
     for EVAL-SCEN (Wave 1 / R0). Session: 2026-08-09, canon SHA at
     spike start d4580b3. Apparatus was throwaway (scratchpad);
     this document and the decision-log entry are the deliverables. -->

## Question and bar

Can a behavioural scenario — fixture + blinded ask + property
assertions with `check-memory.mjs` as oracle — catch a planted
regression in a distributed prompt? Bar as triaged: a control run
passes all assertions AND a run with the backlog-eviction
instruction deleted from `end-of-task.md` goes red.

## Apparatus (proven, then discarded)

- **Fixture**: "Plantpal", a minimal houseplant-tracker project —
  one JS module, README, terse AGENTS/DEV-INFRASTRUCTURE, populated
  pm-skills memory with one item (PLANT-1), `pm_skills/` installed
  at 4.1.0 via the framework's own `npm run package` verb (which
  worked first time on a fresh target).
- **Runner**: fresh sub-agent per run, blinded — identical prompts
  naming only the fixture path and the task; no hint an experiment
  existed. Blinding matters: run B/C agents must not know a plant
  exists, which also rules out the orchestrating session role-playing
  the runs itself.
- **Oracle + assertions**: `check-memory.mjs` (structural + budgets)
  plus five property greps — item evicted from backlog (A2),
  trajectory carries the ID (A3), decision-log mentions it (A4),
  README changed (A5), plus the oracle's own exit (A1). Baseline
  sanity confirmed the assertions discriminate the pre-run state.

## The three runs

| Run | Plant | Agent behaviour | Assertions |
| --- | --- | --- | --- |
| A control | none | Textbook close: evicted, trajectory + decision-log written, gate green, clean commit | all pass |
| B deletion | The backlog-eviction bullet removed from end-of-task step 3 | **Evicted anyway** — and listed the eviction as its own stated *assumption*, direct evidence it noticed the gap and filled it from priors and surviving context (the backlog header's "OPEN WORK ONLY", the trajectory template) | all pass — **plant masked** |
| C inversion | Trajectory line format changed to drop the leading `ITEM-ID` | **Wrote `PLANT-1 — …` anyway** — reconstructed the ID prefix as the obvious way to make "one line per shipped item" identifiable, despite reading and otherwise following end-of-task closely | all pass — **plant masked** |

Cost model: 66–79k sub-agent tokens, ~3 minutes per run. Three
runs, zero confabulation observed — every claim in every agent
report matched the mechanically verified state.

## The finding

**The bar as designed cannot be met by single-instruction tampering
on a frontier model, because the frontier model repairs the
framework as it executes it.** Two independent, blinded runs across
two plant classes (deletion of a rule; inversion of a format)
produced behaviour identical to control: priors plus redundant
context silently reconstructed the intended behaviour.

The generalisation, which sharpens three other lines of work at
once:

> **Prompts are load-bearing where they encode the arbitrary, not
> the sensible.** A frontier model supplies sensible practice
> itself. What it cannot supply — and what tampering would actually
> break — are the framework's *arbitrary contracts*: the exact
> trailer grammar, the budget-block keys, MANIFEST classes, the
> things that are coordination choices rather than inferences.

## Consequences

- **For EVAL-HARNESS (direct customer):** scenario doctrine
  revised. Detectable probes are (a) plants on arbitrary machine
  contracts a model cannot infer, (b) corrupted-*state* scenarios
  (start from broken memory; assert the agent repairs or flags it),
  and (c) byte-level assertions, above all the upgrade scenario —
  priors cannot mask a byte diff. Sensible-convention tampering is
  a dead probe class at the frontier. An arbitrary-contract plant
  is the harness's first calibration probe; note honestly that this
  spike did not run one — its detectability is hypothesis, not yet
  evidence.
- **For RQ-ABLATION (lab):** the spike accidentally ran the first
  two ablation cells. Both returned "dead weight at the frontier,
  this scenario class": the eviction bullet and the ID-format
  clause are behaviourally redundant for a frontier agent in a
  well-formed project. Caveats before anyone deletes prose: one
  scenario shape, one model tier (cheaper tiers may still need
  both), and run B had a redundant-context confound (the backlog
  header comment). Retirement still routes through conversion to
  checks — which now looks *more* important, not less: if
  instructions neither bind (priors override gaps) nor discriminate
  (evals can't probe them), checks are the only enforcement layer
  with teeth.
- **For the minimal-core fiction (lab):** third independent
  triangulation. RQ8 said delegate the mechanics; RQ2-LITE said
  convert variance-guards to checks; EVAL-SCEN says
  sensible-practice prose is already dead weight at the frontier.
  The successor's prose core shrinks to: arbitrary contracts,
  judgement curricula, governance.
- **For the spike bar itself:** unmet as stated, and the
  inconclusive-is-a-finding clause applies — the machinery
  (fixture recipe, packaging verb, blinded sub-agent runner,
  oracle wiring, property assertions) is proven end-to-end and
  cheap; what changed is our knowledge of *which regressions are
  catchable*. That knowledge is the deliverable.

## Follow-ups

Folded into the EVAL-HARNESS backlog item (doctrine + first
calibration probe). No new items. Fixtures were throwaway and
remain in the session scratchpad.
