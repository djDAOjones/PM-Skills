---
id: SCAFFOLD-GITPATH
name: Carry the GATE-PARITY fix into the scaffold
status: todo
milestone: current
flags: detail
date: 2026-08-24
grades: Medium / Low / Low / Low
order: 2
summary: the shipped pm_skills/scaffold/check-links.mjs still resolves link targets with existsSync, so every project scaffolded from it inherits the local-passes/CI-fails gap GATE-PARITY closed in this repo's own fork on 2026-08-24. Distributed, so a release. Promoted from the wish-list at the 2026-08-27 Re-assess, when LAB-FIRST was paused and its stated hold reason expired.
---
# SCAFFOLD-GITPATH — carry the GATE-PARITY fix into the scaffold

> **Status:** Current — promoted 2026-08-27. **Grades:** Medium /
> Low / Low / Low. **Last assessed:** 2026-08-27.

## The defect

`pm_skills/scaffold/check-links.mjs` line 102 still does:

```js
if (existsSync(resolved)) continue;
```

It gathers its *inputs* from Git (`git ls-files`) but resolves link
*targets* against the filesystem. That is precisely the split
GATE-PARITY fixed in this repository's own fork on 2026-08-24: a
working checkout carries gitignored generated files, so a link to
one passes locally and fails in CI, which lints a fresh clone.

Verified still present at the 2026-08-27 Re-assess.

## Why it was not fixed with GATE-PARITY

GATE-PARITY was taken source-only, and the scaffold is distributed —
touching it makes the change a release. The wish-list entry recorded
the deferral plainly: "deliberately not taken with GATE-PARITY
(source-only) while LAB-FIRST holds the canon queue."

LAB-FIRST was paused by the maintainer on 2026-08-27, so that reason
no longer applies. This is the deliberate-fork rule doing its job —
`CONTRIBUTING.md` → "Note on deliberate forks" requires a bug fixed
in one fork to be considered for the other, and this one was
considered, deferred with a reason, and is now due.

## Why it matters more than its size suggests

Every project scaffolded from `pm_skills/scaffold/` inherits the
gap, and it fails in the least useful way: green locally, red in
CI, on references the author cannot see are broken. This repository
lived that failure twice — GATE-FRESH (`node_modules/`) and
GATE-REPORTS, the latter red for ten pushes across six days behind
a green local gate.

## Approach

Port the resolution logic from `scripts/check-docs.mjs`: build the
set of paths Git knows about — tracked files, non-ignored new files,
and their ancestor directories — and resolve against that set rather
than calling `existsSync`. Keep the forks' deliberate differences
intact; this is a targeted port, not a merge.

## Constraints

- **Distributed, so a release** — bump `pm_skills/VERSION`, prepend
  a `pm_skills/CHANGELOG.md` entry with Upgrade actions. The scaffold
  is copied at init, so the upgrade action has to say how an existing
  project picks up the fix.
- **Zero dependencies** — shell and `node:fs` only, as now.
- **Do not import the source fork wholesale.** The scaffold copy is
  deliberately simpler; port the resolution, not the file.

## Done when

- The scaffold resolves link targets against the Git path set.
- A link to a gitignored generated file fails the scaffold check.
- Released, with an Upgrade action covering existing projects.
