# Behavioural evaluation harness (v1)

Source-only maintainer infrastructure — never distributed. Evaluates
"pm-skills as executed by an agent on a model", per the EVAL-SCEN
findings (`self/evaluations/`, 2026-08-09).

## Doctrine (what a scenario may probe)

Frontier models repair sensible conventions as they execute them —
two blinded plant classes (rule deletion, format inversion) were
masked in EVAL-SCEN. Scenarios therefore probe only:

1. **Arbitrary machine contracts** — grammar a model cannot infer
   (the `Close: lite` trailer keys, budget-block keys, MANIFEST
   classes). Calibration probe: TRAILER-KEY (below).
2. **Corrupted-state repair** — start from broken memory; assert
   the agent repairs or flags it.
3. **Byte-level operations** — above all `upgrade.md`: memory must
   be byte-identical, customisations preserved, the changed set
   exactly the changelog's list. Priors cannot mask a byte diff.

Never sensible-convention tampering. Assertions are properties of
the end state, never transcripts. `check-memory.mjs` is the shared
oracle.

## Scenarios

| Scenario | Kind | Status |
| --- | --- | --- |
| `close-control` | close correctness (control) | first blinded run GREEN 2026-08-17 (4.8.0 close; see `self/evaluations/`) |
| `upgrade` | byte-level upgrade | asserted by `assert-upgrade.mjs`; first run 2026-08-09 (procedure operated in-role; blinded agent run pending) |
| `trailer-key` | arbitrary-contract calibration | first blinded run 2026-08-09 |

## Fixture recipe (the houseplant tracker)

Built in a scratch location, never committed here: a tiny project
(README, one plants data module under a src directory, terse
AGENTS + DEV-INFRASTRUCTURE, one open backlog item) with `pm_skills/` installed by `npm run package
-- <target>` (current) or `git archive <ref> pm_skills` (historic
version). Baseline committed in the fixture's own git. Runner: a
fresh sub-agent given only the fixture path and the task — blinded;
the orchestrating session must not run scenarios itself (it knows
the plants).

## Running assertions

```sh
node scripts/eval/assert-scenario.mjs <fixture-root> scripts/eval/scenarios/<name>.json
node scripts/eval/assert-upgrade.mjs <fixture-root> <baseline-ref>
```

Exit 0 = scenario green. Budget note: a full scenario run costs
roughly 70–80k sub-agent tokens and ~3–4 minutes; run the matrix
sparingly and record results in `self/evaluations/`.
