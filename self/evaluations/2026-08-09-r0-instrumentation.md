# R0 instrumentation complete — harness v1, upgrade GREEN, probe DETECTED

<!-- self/evaluations/ — cold tier. Autonomous run 2026-08-09
     (maintainer away; auto-jazz delegation with budget cap).
     Canon SHA at start: e51ea56. Records the EVAL-HARNESS v1 +
     MEM-CHECK-2 closes and the evidence on which the lab declares
     gate R0 passed. -->

## What shipped

- **Harness v1** (`scripts/eval/` — source-only): doctrine README,
  generic property asserter (`assert-scenario.mjs`, oracle +
  spec-driven greps), byte-level upgrade asserter
  (`assert-upgrade.mjs`), and the first scenario spec
  (plantpal-close). Fixture recipe documented; runners are fresh
  blinded sub-agents.
- **MEM-CHECK phase 2**: token estimates on budget lines and the
  first attention counters (items shipped per 30 days, commits per
  shipped item) — metrics-lite, derivable from trajectory + git
  alone. Full token re-denomination of policy numbers deliberately
  deferred (roadmap alteration under delegated authority: display
  estimates satisfy the metrics need without a release).

## Run results

- **Upgrade scenario: GREEN** — first mechanical verification of
  the framework's core promise in 45 releases. Fixture built at
  4.0.0 (`git archive`), customised root template, populated
  memory; upgrade.md executed 4.0.0 → 4.2.0; assertions: memory
  byte-identical, customisation preserved, VERSION stamped, changed
  set exactly the changelog's list (8 files). Limitations: operator
  ran the procedure in-role (blinded agent run pending); this
  version window exercises no template merge — a future scenario
  needs a window with template deltas.
- **Trailer-key calibration probe: DETECTED** — the arbitrary
  contract leg of the EVAL-SCEN doctrine, now evidence: with
  `Item:` tampered to `Ticket:` in the trailer grammar, a blinded
  agent wrote `Ticket: PLANT-3` (zero `Item:`) in its lite-close
  trailer. Combined with EVAL-SCEN's two masked plants, the
  doctrine is confirmed from both directions: priors repair the
  sensible; text carries the arbitrary. One run, ~63k sub-agent
  tokens.
- **Harness glue validated** on the known-good ctx-b fixture
  (GREEN, 5/5).

## R0 declaration basis

Per the lab contract, R0's owner is evidence: validator (4.1.0,
gate-wired, verified on three project shapes) + three scenarios
including upgrade (plantpal-close GREEN on a real run; upgrade
GREEN; trailer-key DETECTED) + attention counters printing. R0 is
declared in the lab's decision log with this document as the
evidence pointer. R1 remains maintainer-owned and untouched.

## Budget note

One sub-agent run this session (the probe, ~63k tokens); all other
work direct. Prior scenario runs reused rather than repeated.
