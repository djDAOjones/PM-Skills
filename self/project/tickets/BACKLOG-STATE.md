# BACKLOG-STATE — Backlog state/view split

> **Status:** Next #1 · **Grades:** High / High / Med-High /
> Medium.

## Intent

Apply the gen-file-map move to the backlog: item *state* lives in
per-item record files, and `backlog.md` becomes a generated,
human-legible view. Ends grammar-by-typography for state, makes
parallel merges disjoint by construction, turns Reconcile into a
data operation, and gives BACKLOG-AUTH a write target. The
records-core fiction's heart, built incumbent-first so R1 stays
unprejudiced.

## Done when

**Phase 0 (lab, gates the rest):** RQ3-SUBSTRATE prototypes the
split on the lab repo's own project memory and its findings pass —
merge safety and
reconcile fidelity better than prose at equal human legibility.

**Phase 1 (this repo):** each open item is `tickets/<ID>.md` with a
flat key-value frontmatter block (id, status, flags, dates,
milestone, grades — eight fields, no nesting) and the current
ticket body below; a generator produces `backlog.md` (milestone
intent lines preserved, items rendered in today's grammar);
`check-memory.mjs` validates record↔view coherence and flags
divergence; hand-edits to the view fold back at the next close.

**Phase 2 (distribution):** a separate, later release decision —
explicitly out of this item's scope.

## Evidence / context

Fictions: records-core. RQ-ABLATION: memory files are state, not
instructions — structure the state, keep the views human. The
assessment's schema insight: the `tickets/` pattern generalised is
the record format, already in use. BACKLOG-AUTH currently writes
prose that would write records unchanged in shape. Trigger status:
the "commissioned generation" leg is now real (maintainer
instruction 2026-08-17 plus the shipped authoring prompt).

## Approach

1. Land after JANITOR-READ (small before structural). Absorb RQ3
   findings first.
2. A `gen-backlog.mjs` generator + a ~20-line flat frontmatter
   parser
   (zero-dependency rule: no YAML library — flat `key: value`
   lines only, recorded as a format constraint).
3. Migrate this repo's open items (currently few — cheap moment);
   validator additions; close-flow fold-back step.

## Constraints

- The view stays the human surface; records are never the thing a
  person must read.
- Git stays the substrate; no new dependencies anywhere.
- Decision rationale stays prose in the decision log — only state
  is structured.

## Open questions

- Fold-back mechanics: at close (agent folds) vs validator-prompted
  (warn until folded) — lean both: fold at close, warn between.
- Do grades live in frontmatter (queryable) or body (prose) — lean
  frontmatter.
