---
id: RECORDS-DIST
name: Records-mode distribution (BACKLOG-STATE phase 2)
status: todo
milestone: next
flags: detail
date: 2026-08-17
grades: High / Medium / Medium / Medium
order: 1
summary: records mode becomes distributable — one arc absorbing RECORDS-SCAFFOLD (scaffold generator + validator with --project-dir), RECORDS-TAXONOMY (configurable groups and flags, or the flattening trade documented), and RECORDS-GRAMMAR-GUIDE (adoption grammar guidance). (source: R1 Hub run 2026-08-17)
---
# RECORDS-DIST — Records-mode distribution (BACKLOG-STATE phase 2)

> **Status:** Next #1 · **Grades:** High / Medium / Medium / Medium.

## Intent

Make records mode adoptable by consuming projects — the phase 2
that BACKLOG-STATE (phase 1) explicitly deferred to a separate
future decision. The Hub adopted records live on 2026-08-17 and
was mis-served three ways by canon-shaped tooling; those findings
are this arc's spec. One arc, not three items: the three wishes
share one evidence base and one release surface, and shipping any
leg alone re-creates the gap the others name.

## Done when

- **Tools (was RECORDS-SCAFFOLD):** `gen-backlog.mjs` and
  `check-memory.mjs` ship as scaffold copies taking
  `--project-dir` — both are currently source-only and the
  generator is path-hardcoded. The 4.1.0 "proven on a consuming
  project" trigger fired with the Hub run.
- **Dialects (was RECORDS-TAXONOMY):** milestone groups and the
  validator flag list become configurable, or the flattening trade
  is documented as an explicit adoption choice — the fixed
  current/next/icebox view flattens the Hub's Standing / Venue /
  Rolling dialect, and its rehearsal flag WARNs as unknown against
  the canon-hardcoded KNOWN_FLAGS list.
- **Adoption guidance (was RECORDS-GRAMMAR-GUIDE):** grammar notes
  for long summaries (frontmatter lines cannot hard-wrap), for
  ID-less icebox prose (records force an ID per item), and for the
  ID grammar itself — SCREAMING-KEBAB, letters/digits/hyphens only
  (the validator's ID parse excludes dots; hit live at this sweep's
  CL-440-WORDING promotion).
- MANIFEST and GUIDE synced; released with upgrade actions; the
  deliberate forks reconciled per `CONTRIBUTING.md`.

## Evidence / context

R1 Hub run plus the Hub records adoption (PM-Skills-lab findings,
2026-08-17). VALIDATOR-QC shipped the canon-side validator fixes
source-only and left distribution wished; DEV-PREP deliberately
deferred this promotion to the INTAKE-DEEP assessment — this
placement is that verdict.

## Approach

Design the dialect surface first (config against documented trade)
— it decides what the scaffold copies ship; tools second; guidance
last, written from what actually shipped. Split the arc at scoping
only if it proves too large for one item.

## Constraints

- Scaffold copies stay dependency-free and generic; the tuned repo
  forks remain (deliberate-forks rule, `CONTRIBUTING.md`).
- Nothing distributed references `self/` or any repo-specific
  path.
- Records mode stays opt-in — prose backlogs remain first-class.

## Open questions

- Config file, keys in `_meta.md`, or documented-trade-only — pick
  at design options.
- Does phase 2 want a second consuming project first? Placement
  here says the Hub plus canon suffice for build; the maintainer
  can re-gate at pick time.
