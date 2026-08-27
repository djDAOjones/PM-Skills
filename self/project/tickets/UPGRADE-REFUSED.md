---
id: UPGRADE-REFUSED
name: Nobody walks the upgrade prompt
status: todo
milestone: icebox
flags: detail
date: 2026-08-27
grades: High / Medium / Low / Medium
order: 11
summary: three deployments on record (Derry Lane, Route Plotter, UoN Video Helper) and none reached its current version by walking upgrade.md — Route Plotter declined 4.9.2 outright and said so in its decision log. The declarative-upgrade contract (MANIFEST classes, CHANGELOG Upgrade actions, upgrade.md) rests on a procedure no consuming project has used. Investigate why, and what the machinery should be if reinstall is the real path. Evidence in self/field-reports/.
---
# UPGRADE-REFUSED — nobody walks the upgrade prompt

> **Status:** Icebox — investigation, unblocked. **Grades:**
> provisional at intake (2026-08-27): High / Medium / Low / Medium.

## The finding

Filed from the FIELD-HARVEST evidence (2026-08-27). Three
deployments are on record and none reached its current version by
running `pm_skills/prompts/upgrade.md`:

| Project | Path taken |
| --- | --- |
| Derry Lane | 4.4.0 installed 2026-08-17, fresh-reinstalled as 4.6.0 the same day |
| UoN Video Helper | 4.6.0 installed 2026-08-24, reinstalled at 4.9.2 the same day |
| Route Plotter v3 | 4.7.0 installed fresh 2026-08-17 with v2 memory ported; 4.9.2 then **declined** |

Route Plotter is the sharp case, because it is a refusal rather than
an omission. Its decision log records the owner call in as many
words:

> stay on PM-Skills 4.7.0 (upstream is 4.9.2 — skipped, not merely
> deferred)

That is a maintainer running the framework daily, who knew upstream
had moved, considered it, and said no.

## Why this matters

A substantial part of the product exists to make upgrades
declarative: per-path upgrade classes in `pm_skills/MANIFEST.md`,
the **Upgrade actions** block that every `pm_skills/CHANGELOG.md`
entry is required to carry, and `upgrade.md` itself, which reads the
entries between a project's `VERSION` and the latest and executes
them oldest-first. The root contract makes writing those actions a
release gate.

On current evidence that machinery has never been exercised by a
consuming project. It is not known to be broken — it is untested in
the field, which is a different and more awkward position, because
every release pays a tax to maintain it.

## Investigation questions

- **Why reinstall?** Cheaper, better understood, less risky, or
  simply more obvious? The session logs for two of the three
  projects are filed in this repository and can be read directly.
- **What did Route Plotter's owner weigh?** The refusal is recorded
  but not reasoned in the log. Ask, or read the surrounding session.
- **Does reinstall actually work?** Both reinstalls preserved
  populated memory and rulebooks. If reinstall is safe and complete,
  the honest question is whether `upgrade.md` earns its keep at all,
  or should become a documented fallback for cases reinstall cannot
  handle (a rename, a restructured template, a memory migration).
- **What breaks under reinstall?** MANIFEST classes exist because
  some paths are project-owned and must not be overwritten. A
  reinstall that clobbers them would be a silent data loss. Test
  this before recommending reinstall as the blessed path.
- **Is the CHANGELOG upgrade-actions tax justified?** If it is the
  only durable record of what changed between versions, it may earn
  its place regardless of whether `upgrade.md` runs.

## Constraints

- **Product tree, so any change is a release** — VERSION, CHANGELOG
  with upgrade actions, MANIFEST and GUIDE sync.
- **Do not conclude from three data points.** All three are the same
  maintainer, in the same eight-week window, on the same machine.
  That is a strong signal about *this* user and a weak one about
  consuming projects in general. Say which is being claimed.
- **Evidence first.** The analysis belongs in `self/evaluations/`
  and should cite the reports, not restate them.

## Evidence available now

- `self/field-reports/route-plotter/2026-08-27-note-deployment-snapshot.md`
  → "The upgrade was refused, not missed".
- `self/field-reports/uon-video-helper/2026-08-27-note-deployment-snapshot.md`
  → "Framework deployment".
- Both projects' full memory, git logs and session logs, filed in
  the same directories — the session logs sit in the gitignored
  local-only lane, so they exist on the maintainer's checkout only.
- The Derry Lane export, filed local-only under its own project
  directory in the same tier.
