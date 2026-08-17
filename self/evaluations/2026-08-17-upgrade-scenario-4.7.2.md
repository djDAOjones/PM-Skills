# Upgrade scenario at the 4.7.2 release close — first blinded run, GREEN

<!-- self/evaluations/ — cold tier. Run 2026-08-17 at the CL-440-WORDING
     release close (canon at 597a949 / v4.7.1 when the run started;
     scenario target was the uncommitted 4.7.2 working tree). First
     release-close harness run under the 4.7.1 advisory line. -->

## Why the scenario applied

The 4.7.2 release changes `prompts/upgrade.md` (class-precedence
guard) and corrects the upgrade instruction set (the 4.4.0
correction) — upgrade machinery under the RELEASE-EVALS mapping. The
milestone intent had already sequenced this: hang the net first so
the correction release runs under it.

## Fixture and runner

- **Fixture:** PlantPal at pm-skills 4.3.0 (`git archive b6bde0b`),
  populated memory (backlog with open items, decision log,
  trajectory, brief/architecture/conventions), populated root
  `AGENTS.md` with a customisation marker line, terse
  `DEV-INFRASTRUCTURE.md`. Baseline commit `35e3eb5` in the
  fixture's own git.
- **Source:** `npm run package` export of the working tree (47
  files, manifest-verified, VERSION 4.7.2).
- **Runner:** fresh **blinded** sub-agent (fixture path + task only;
  no knowledge of the assertions) executing the fixture's own
  `pm_skills/prompts/upgrade.md` with delegated maintainer authority
  at the STOP gates. ~109k sub-agent tokens, ~7 min, 27 tool uses.
  This closes both gaps R0 recorded: first blinded upgrade run, and
  the first window exercising a root-template merge (4.4.0's
  `AGENTS.md` additive changes).

## Result

- **Raw first pass: RED (3/4)** — sole failure: `memory
  byte-identical` flagged `pm_skills/project/decision-log.md`
  (+8 lines). Diagnosis: that is the **Step 10 record upgrade.md
  mandates** ("Append one entry to the top of
  `pm_skills/project/decision-log.md`"). Append-only verified by
  inspection and by check: baseline entries intact verbatim beneath
  the new record. Every other memory file byte-identical; the
  populated backlog — 4.4.0's literal replace-list target —
  untouched.
- **Harness defect, not upgrade defect:** `assert-upgrade.mjs` was
  calibrated against R0's operator-in-role run (2026-08-09), which
  evidently never executed Step 10. The first faithful blinded run
  exposed the blind spot.
- **Oracle fixed (source-only):** the decision log is exempted from
  the byte-identical set and gains an explicit append-only
  assertion (baseline body must survive verbatim). Net: 5 checks
  where there were 4 — strictly tighter, not weaker.
- **Re-run: GREEN (5/5)** — memory identical (log exempt), log
  append-only, customisation marker preserved through the template
  merge, VERSION stamped 4.7.2, changed set within the allow-list
  (13 files under `pm_skills/` + root `AGENTS.md`).

## Blinded-run observations (transcript-adjacent, not assertions)

- The agent applied class precedence unprompted and cited the 4.7.2
  correction in its Step 10 record — the corrected instruction set
  reached a live walk on its first day.
- It surfaced the 4.7.0 close-behaviour change (transcript reminder
  retired) to the owner as part of its report — faithful Step 4/11
  behaviour, not requested.

## Follow-ups

- None filed. The asserter fix shipped with the 4.7.2 close; the
  close-control scenario remains the next unexercised leg at a
  qualifying release.
