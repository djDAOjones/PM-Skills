---
id: FIELD-EXPORT
name: Usage-report verb for consuming projects
status: todo
milestone: current
flags: detail
date: 2026-08-23
grades: High / Medium / Low / Low
order: 1
summary: a framework verb that emits a standard usage report from a consuming project — memory counters, verbs fired, close fidelity, upgrade outcome, incidents — already in the header shape the field-reports tier expects, so filing is consistent rather than hand-copied. Promoted from the wish-list at the 2026-08-27 Re-assess after the work was done by hand twice in one day.
---
# FIELD-EXPORT — usage-report verb for consuming projects

> **Status:** Next — promoted 2026-08-27. **Grades:** High / Medium
> / Low / Low. **Last assessed:** 2026-08-27.

## Intent

A verb a consuming project can run against itself that emits the
evidence `self/field-reports/` wants, in the shape that tier's
README already specifies: the header contract with `project=`,
`date=`, `type=` and the `pm-skills=` join key, the closed type
list, and the tracked/local lane split.

## Why it earned promotion

It was performed by hand, twice, in a single day (2026-08-27,
FIELD-HARVEST):

- A first pass harvested Route Plotter and UoN Video Helper from
  a Claude Code session — deployment snapshots, memory exports with
  byte inventories, rulebooks, git logs, review artefacts.
- A prompt was then written to have an agent repeat it, and a second
  pass ran that prompt inside both projects, superseding the first
  pass's exports with fuller metadata and per-file redaction counts.

A procedure written down, handed to an agent, and run twice is a
verb that already exists — it simply lives outside the framework.
The wish-list entry predicted this on 2026-08-23; the harvest
supplied the evidence.

## What the two passes revealed about the shape

- **The mechanical parts are genuinely mechanical** — inventories,
  git-log formatting, concatenation with `<!-- FILE: … -->` markers,
  path redaction. All scriptable, and the second pass did script it.
- **The lane decision is a judgement, not a rule.** Both passes had
  to decide tracked versus local. The rule that worked: file by
  whether the material is *already* public upstream, not by whether
  the project feels private.
- **Redaction wants counting, not just doing.** The second pass's
  headers state how many path and e-mail occurrences were collapsed
  and what was deliberately retained. That is auditable; prose
  claiming "redacted" is not.
- **The analysis note is the valuable part and the first to be
  skipped.** The first prompt made it optional and the pass omitted
  it; the revision made it mandatory. A verb should not let it be
  optional either.

## Investigation questions

- Verb or prompt? The framework distributes prompts, not scripts,
  and a generator would be the first real code in `pm_skills/`
  outside the two scaffold scripts.
- What can be counted without reading session logs at all — memory
  sizes, archive rotations, commit-convention adherence, gate lines
  in commit bodies — versus what needs the logs.
- Where the output goes. A consuming project has no
  `self/field-reports/`; the verb must write somewhere neutral and
  say so, without leaving artefacts in the project it harvested.
- Does this belong to the product, or is it maintainer tooling?
  Consuming projects gain little from reporting on themselves; the
  beneficiary is whoever collects the reports.

## Constraints

- **Product tree if distributed, so a release.**
- **Zero dependencies.**
- **Leave nothing behind** — the harvested project must end
  byte-identical apart from what its own maintainer changed. The
  first prompt got this wrong and left artefacts that had to be
  moved out by hand.

## Evidence available now

- `self/field-reports/route-plotter/` and
  `self/field-reports/uon-video-helper/` — two full passes of what
  the output should look like.
- Both snapshot notes carry a "Provenance: two passes" section
  recording how the second pass differed from the first.
