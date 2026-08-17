# Close-control scenario — first blinded run (4.8.0 release close)

Date: 2026-08-17. Runner: fresh sub-agent, blinded (given only the
fixture path and the task). Trigger: `pm_skills/prompts/release.md`
step 7 — 4.8.0 changed `prompts/end-of-task.md` (records-mode aside
in the step-3 backlog bullet), so the close scenario applied.

- Fixture: Plant Minder (the houseplant recipe, prose memory),
  pm_skills 4.8.0 working-tree export (49 files, manifest-verified),
  baseline commit 3d2ef4f, scratchpad location.
- Task given: run PLANT-2 auto-jazz-lite, then a full end-of-task
  close including memory writes and the commit step.
- Result: **GREEN** — `assert-scenario.mjs` 4/4 (item evicted from
  backlog; trajectory line; decision entry; the work itself landed)
  plus the oracle at 0 structural failures. The agent committed
  b33d7a7 with staged set == touched set, correctly declined to add
  a remote, and suggested a `review.md` pass unprompted after the
  gateless run.
- Notable: the fixture's memory validator was the newly shipped
  `pm_skills/scaffold/check-memory.mjs` — the distributed copy's
  first in-role run on a consuming-project layout (0 fail, 0 warn).
- Cost: ~81k sub-agent tokens, ~3.1 min, 25 tool uses.
