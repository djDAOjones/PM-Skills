---
id: ARCH-RETENTION
name: Retaining history for later analysis
status: todo
milestone: icebox
flags: detail
date: 2026-08-27
grades: Medium / Medium / Low / Low
order: 10
summary: investigate how the decision log, trajectory, and other history are retained in the archive so they can be analysed later, not merely evicted and grepped for precedent. Retention sibling of ARCH-RECALL. Live pressure: trajectory sits 13 words under budget and archive/trajectory/ has never been created, so the first run defines the shape by accident unless decided first.
---
# ARCH-RETENTION — retaining history for later analysis

> **Status:** Icebox — investigation, unblocked (LAB-FIRST gates
> the pick). **Grades:** provisional at intake (2026-08-27):
> Medium / Medium / Low / Low.

## Intent

Whether the historical record — decision log, trajectory, and the
ticket archive — should be retained as an analysable asset, rather
than only as evicted prose kept for occasional precedent lookup.

## What exists

Retention is specified and works. `memory-policy.md` sends
`trajectory.md` past 2000 words to `archive/trajectory/`, splits
`decision-log.md` past 20 entries into `archive/decision-log-*.md`
by epoch, chunks archives one epoch per file, and keeps
`archive/INDEX.md` current. Archived material is verbatim and
append-only; shipped tickets are archived whole.

## The gap

The archive was built for **eviction and precedent**, not analysis:
`session-start.md` defines it as grep only, when explicitly
relevant. "Later analysis" is named as a purpose exactly once in
this repository — for `self/field-reports/`, whose header contract
exists so a reader can grep the tier and read it against the
release history. The project's own history has no equivalent.

What follows from that:

- **`archive/trajectory/` has never been created.** Policy names
  it; nothing has exercised it. Trajectory is 13 words from
  budget, so the first run is imminent and would set the shape
  mid-prune. Decide before it fires.
- **Prose, not records.** BACKLOG-STATE moved items to parseable
  frontmatter; the decision log did not. Analysis means grep.
- **No supersession marker.** Append-only, plus "never edit old
  entries", means a reversed decision reads exactly like a
  standing one — answering "what do we now believe about X" means
  reading all of it.
- **The join is a naming convention.** A decision entry, a
  trajectory line, a ticket record, and a commit describe one
  item, joined only by its identifier.
- **The natural consumer does not read it.** `self/REFLECTION.md`
  → Evidence gate takes counters, transcripts, incidents, and
  field reports — not the historical record.

## Boundary with ARCH-RECALL

ARCH-RECALL is **recall**: finding the right precedent on demand,
blocked on a project reporting missed-precedent pain. This is
**retention**: whether what is kept can support analysis at all.
Complementary — poor retention caps recall — so a Re-assess may
merge them.

## Investigation questions

- Records or prose for archived decisions, and is an explicit join
  key worth enforcing?
- Should supersession be marked forward — a later entry naming
  what it overturns — given entries are never edited?
- Does trajectory archive by phase, by date, or by release?
- What should INDEX carry so a chunk can be chosen without opening
  it?
- Is analysis a verb, or only a retention shape plus the existing
  reflection practice?

## Constraints

- **Append-only and verbatim.** Any new shape applies forward;
  history is never rewritten to fit it.
- **Cold stays cold** — never auto-read at session start.
- Product tree, so a template change is a release; zero
  dependencies.
