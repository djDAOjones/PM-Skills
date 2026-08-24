---
id: GATE-PARITY
name: Make the local gate CI-faithful
status: todo
milestone: icebox
flags: detail,blocked
blocked-on: a third local-vs-CI gate divergence, or a red default-branch run that survives more than one push
date: 2026-08-24
grades: Medium / Low / Low / Low
order: 6
summary: the gate is documented as CI-mirrored but passes locally while CI fails, because gitignored generated files exist only on a working checkout; options are a clean-clone check target, a pristine-checkout CI step, or a red-run notification.
---
# GATE-PARITY — make the local gate CI-faithful

## The gap

The root contract calls the quality gate "non-mutating, CI-mirrored".
It is not mirrored: gitignored **generated** files exist on a working
checkout and never in CI's fresh clone, so a doc reference to one
resolves locally and fails in CI.

Twice now. GATE-FRESH (2026-08-08) for `node_modules/`, and
GATE-REPORTS (2026-08-24) for the janitor report — the latter left
the Lint job red for ten consecutive pushes over six days behind a
green local gate, showing a failing badge at the top of the public
README the whole time.

## Options if the trigger fires

- A `check:ci` script that clones the repo to a temp directory and
  runs the gate there — reproduces CI exactly; costs one clone.
- A CI step asserting the gate passes on a pristine checkout, so the
  divergence itself is what fails rather than its symptom.
- Cheapest partial: a notification on a red default-branch run, which
  catches any cause in minutes rather than in pushes.

## Why held

Both instances were one-line fixes, and the class is now recorded in
the decision log plus the check-docs header. Tooling to prevent a
rare, cheap-to-fix bug is not obviously worth its own maintenance
burden — revisit if the trigger fires.
