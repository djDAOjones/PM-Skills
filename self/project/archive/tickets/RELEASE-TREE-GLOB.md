---
id: RELEASE-TREE-GLOB
name: Glob-aware GUIDE-tree check in release.md
status: in-progress
milestone: current
date: 2026-08-23
grades: Low / Low / Low / Low
order: 2
summary: the release.md step 6 "missing from the GUIDE tree" loop greps per basename, so the three `CHANGELOG-*x.md` archives fire MISSING against the tree's one glob line — a false positive every release since 4.5.0. Make the check honour `*` pattern lines; GUIDE untouched. Patch release.
---
# RELEASE-TREE-GLOB — Glob-aware GUIDE-tree check in release.md

Promoted from the wish-list at the 2026-08-23 session (captured at
the GUIDE-SYNC 4.9.1 close). Quick task, auto-jazz-lite; one
distributed file (`pm_skills/prompts/release.md`), patch bump.

Acceptance: the amended snippet prints no MISSING on the current
tree (positive) and still prints MISSING for an injected fake name
(negative) — weakened for globs, not disabled.
