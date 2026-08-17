---
id: PAR-DISPATCH
name: Parallel dispatch verb
status: todo
milestone: next
flags: detail
date: 2026-08-17
grades: Medium / Low-Med / Medium / Low-Med
order: 1
summary: initiation verb for parallel chats — disjoint pick, lane and primary assignment, one paste-ready brief per chat; composes Start B + PAR-BRANCH conventions + the secondary close.
---
# PAR-DISPATCH — Parallel dispatch verb

> **Status:** Next #1 · **Grades:** Medium / Low-Med / Medium /
> Low-Med.

## Intent

4.6.0 shipped the mechanics of parallel work — branch-per-session,
the regenerate-the-view merge rule, the secondary close — but every
piece assumes the parallel set already exists; entering it is
manual (pick, branch, choose the writer, brief each chat). Ship
the missing initiation verb: run in the
spawning chat, it picks N mutually disjoint Active items, assigns
lanes (branch, mode, working tree) and the one primary, and emits
one paste-ready brief per parallel chat.

## Done when

- A distributed verb (sibling of `integrations/next.md`; name at
  design) performs the entry move: disjoint pick — predicted touch
  sets do not overlap, at most one lane touches `pm_skills/` —
  lane assignment, primary designation, one brief per lane.
- Briefs are plain Markdown pointers, not restatements: the
  session-start entry with the item, the branch and working-tree
  line, the mode, the secondary-close pointer for non-primary
  lanes. Any chat product works (manual-paste parity).
- NEXT-CMD guardrails restated per lane: `[sign-off]` escalates,
  one item per lane, hard prohibitions stop-and-ask, close full by
  default.
- `GUIDE.md` → "Parallel and multi-machine work" and
  `integrations/next.md` gain one-line pointers.
- One real dispatched exercise on this repo (two or more lanes,
  merge and integration close, gate green) before the
  text claims it works — the PAR-BRANCH discipline.

## Evidence / context

- PAR-BRANCH (4.6.0, 2026-08-17) verified the mechanics live on
  both repos; its target picture — three agents, no claims — still
  lacks this entry move.
- `integrations/next.md` is the idiom: a one-word trigger composing
  existing workflows, no new mechanism. The audit-recipe precedent
  (defer verbs whose recipe already exists in composable pieces)
  does not bite: the entry move has no recipe anywhere.
- Demand: maintainer triage 2026-08-17 — see the decision log;
  the Hub's backlog depth is the consuming-project case.

## Approach

One distributed prompt riding a minor release plus two
cross-reference lines. Composition only: Start B picks, task modes
run lanes, PAR-BRANCH conventions coordinate, the secondary close
returns. New content is limited to the disjoint-pick check, lane
and primary assignment, and the brief format. Verified self-hosted
before release.

## Constraints

- One-writer rule untouched: exactly one primary per set, assigned
  at dispatch; advisory claims remain the prose-memory fallback.
- At most one lane touches `pm_skills/` per set; releases serialise
  at integration (VERSION/CHANGELOG prepends are git's weakest
  merge case).
- No lockfiles or dispatch state that could strand a crashed lane —
  an abandoned lane costs nothing.
- Human-mediated fan-out: the maintainer opens each chat and pastes
  its brief; single-session autonomy never widens (NEXT-CMD's
  one-item spirit holds per lane).
- Briefs restate the sync-folder caveat: second working trees live
  outside cloud-synced paths.

## Open questions

- Sibling integrations file, or a dispatch mode inside
  `integrations/next.md`? Lean sibling — the one-item guardrail
  stays untouched.
- Integrator: the dispatching session as primary (lean — it holds
  the set's context) or last-lane-closes?
- Default and maximum lane count (lean two to three).
- Records mode: require, or recommend with the prose fallback
  (lean recommend — canon and the Hub both run records).
- Sequencing with RECORDS-SCAFFOLD (consuming projects need the
  generator as scaffold first; canon can exercise the verb
  immediately) and later NEXT-FRAGMENTS-style fragment folding.
