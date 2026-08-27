---
id: PM-MCP
name: Programmatic memory interface
status: todo
milestone: icebox
flags: detail,blocked
blocked-on: harness-client run of the lab prototype (RQ5 GREEN 2026-08-17); distribution additionally on more than one consuming project
date: 2026-08-09
grades: High / High / Medium / Medium
order: 1
summary: packaging-ladder rung 4; adapter outside the distributed tree, never core.
---
# PM-MCP — Programmatic memory interface

> **Status:** Icebox — horizon item · **Grades:**
> High / High / Medium / Medium.
> **Gate:** prototype unlocks when BACKLOG-STATE phase 1 is proven
> here (the lab's RQ5-INTERFACE is the prototype vehicle);
> **distribution** additionally stays blocked on more than one
> consuming project — the external-evidence leg that guards against
> building the successor's interface on mirror evidence alone.

## Intent

The packaging ladder's fourth rung: serve project memory through a
protocol interface (MCP-class) — get-context-for-task, pick-next,
close-item — with structure enforced at the interface and the
judgement prose unchanged inside the prompts. Portability via
protocol rather than lowest-common-denominator file reads.

## Done when (prototype scope only)

- A minimal MCP server over the records layer runs against the lab
  repo's own project-memory records (RQ5-INTERFACE).
- The close-control scenario passes when driven through the tools
  instead of file edits, oracle-verified.
- A findings document compares tool-driven against file-driven on
  reliability, enforcement, and cost — the codify-or-drop input for
  any distribution decision, which is its own future item.

## Evidence / context

RQ8-SCAN: MCP is foundation-governed and universally adopted — the
protocol-convergence trigger leg fired 2026-08-08. The synthesis's
packaging ladder names this rung and its identity cost: a server is
code, an install step, a dependency surface — everything the
zero-dependency product refuses — so it can only ever be an
**optional adapter outside `pm_skills/`**, never the core.

Last assessed 2026-08-27 (Re-assess): hold, but one leg has now
fired. The **distribution** leg asked for more than one consuming
project; three are now on record with evidence filed in
`self/field-reports/` — Derry Lane, Route Plotter and UoN Video
Helper. That leg is satisfied. The **prototype** leg is not: it
needs the lab's harness-client run (RQ5-INTERFACE), which is a lab
move, and the lab arc was paused by the maintainer on 2026-08-27.
So the hold stands on the prototype leg alone, and the external-
evidence discipline it was paired with has been met rather than
waived. Prior assessment 2026-08-17 (INTAKE-DEEP): RQ5 GREEN
advanced the prototype leg.

## Approach

Records first (BACKLOG-STATE), then the lab prototype (RQ5), then
evidence, then — separately — a distribution question with the
external-evidence leg intact. Never merged into this repo's
distributed tree in prototype form.

## Constraints

- Adapter, never core: the file-based framework must remain fully
  functional without the server.
- The interface carries state operations only; scoping, options,
  validation, and review stay prose curricula.
- No dependencies inside `pm_skills/`; the server lives with the
  lab or a sibling package.

## Open questions

- Which harness's MCP client hosts the prototype run — pick at
  RQ5 scoping.
- Whether pick-next belongs in the interface or stays a prompt
  (the pick is judgement-adjacent) — RQ5 evidence decides.
