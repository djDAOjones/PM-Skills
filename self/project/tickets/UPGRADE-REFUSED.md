---
id: UPGRADE-REFUSED
name: Nobody walks the upgrade prompt
status: todo
milestone: next
flags: detail
date: 2026-08-27
grades: High / Medium / Low / Medium
order: 1
summary: three deployments on record (Derry Lane, Route Plotter, UoN Video Helper) and none reached its current version by walking upgrade.md — Route Plotter declined 4.9.2 outright and said so in its decision log. The declarative-upgrade contract (MANIFEST classes, CHANGELOG Upgrade actions, upgrade.md) rests on a procedure no consuming project has used. Investigate why, and what the machinery should be if reinstall is the real path. Evidence in self/field-reports/.
---
# UPGRADE-REFUSED — nobody walks the upgrade prompt

> **Status:** Icebox — investigation. **Grades:** provisional at
> intake (2026-08-27): High / Medium / Low / Medium.

## The finding

Filed from the FIELD-HARVEST evidence (2026-08-27). Three
deployments, none of which reached its version via
`pm_skills/prompts/upgrade.md`:

| Project | Path taken |
| --- | --- |
| Derry Lane | 4.4.0 in 2026-08-17, reinstalled as 4.6.0 that day |
| UoN Video Helper | 4.6.0 in 2026-08-24, reinstalled at 4.9.2 that day |
| Route Plotter v3 | 4.7.0 fresh 2026-08-17, memory ported; 4.9.2 **declined** |

Route Plotter is the sharp case: a refusal, not an omission. Its
decision log records the owner call in as many words —

> stay on PM-Skills 4.7.0 (upstream is 4.9.2 — skipped, not merely
> deferred)

— from a maintainer running the framework daily, who knew upstream
had moved and said no.

## Why this matters

A substantial part of the product exists to make upgrades
declarative: per-path classes in `pm_skills/MANIFEST.md`, the
**Upgrade actions** block every `pm_skills/CHANGELOG.md` entry must
carry, and `upgrade.md` itself. The root contract makes writing
those actions a release gate.

On current evidence that machinery has never been exercised by a
consuming project. Not known to be broken — untested in the field,
which is more awkward, because every release pays a tax for it.

## Investigation questions

- **Why reinstall?** Cheaper, better understood, less risky, or
  just more obvious? Two of the three projects' session logs are
  filed here and can be read directly.
- **What did Route Plotter's owner weigh?** The refusal is recorded
  but not reasoned. Ask, or read the surrounding session.
- **Does reinstall actually work?** Both reinstalls preserved
  populated memory and rulebooks. If it is safe and complete, ask
  whether `upgrade.md` earns its keep at all, or becomes a
  documented fallback for what reinstall cannot do — a rename, a
  restructured template, a memory migration.
- **What breaks under reinstall?** MANIFEST classes exist because
  some paths are project-owned. A reinstall that clobbers them is
  silent data loss. Test before blessing reinstall as the path.
- **Is the CHANGELOG upgrade-actions tax justified?** It may earn
  its place as the durable record of what changed, regardless of
  whether `upgrade.md` ever runs.

## Constraints

- **Product tree, so any change is a release** — VERSION, CHANGELOG
  with upgrade actions, MANIFEST and GUIDE sync.
- **Do not conclude from three data points.** All three share one
  maintainer, one eight-week window, one machine: strong evidence
  about *this* user, weak about consuming projects generally. Say
  which is being claimed.
- **Evidence first.** Analysis belongs in `self/evaluations/`, and
  cites the reports rather than restating them.

## Evidence available now

- `self/field-reports/route-plotter/2026-08-27-note-deployment-snapshot.md`
  → "The upgrade was refused, not missed".
- `self/field-reports/uon-video-helper/2026-08-27-note-deployment-snapshot.md`
  → "Framework deployment".
- Both projects' full memory, git logs and session logs, in the
  same directories — session logs in the gitignored local-only
  lane, so on the maintainer's checkout only.
- The Derry Lane export, filed local-only in the same tier.
