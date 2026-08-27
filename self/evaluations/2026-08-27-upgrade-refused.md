# Why nobody walks the upgrade prompt — and what reinstall costs

Evaluation, 2026-08-27. Written for UPGRADE-REFUSED, from the
field reports filed the same day. Cites them; does not restate them.

## What the evidence says

Three deployments are on record and none reached its current
version through `pm_skills/prompts/upgrade.md`:

| Project | Path taken | Report |
| --- | --- | --- |
| Derry Lane | 4.4.0, reinstalled as 4.6.0 the same day | local lane |
| UoN Video Helper | 4.6.0, reinstalled at 4.9.2 the same day | `self/field-reports/uon-video-helper/2026-08-27-note-deployment-snapshot.md` → "Framework deployment" |
| Route Plotter v3 | 4.7.0 fresh; 4.9.2 **declined outright** | `self/field-reports/route-plotter/2026-08-27-note-deployment-snapshot.md` → "The upgrade was refused, not missed" |

Route Plotter is the one that carries information. The others could
be inattention; that one is a maintainer who knew upstream had moved
and wrote the refusal into the decision log.

**What is being claimed.** All three projects share one maintainer,
one eight-week window, one machine. As a claim about consuming
projects in general this is weak, and the ticket said so at intake.
It is strong about this maintainer, and it is the only field evidence
that exists.

The measurement below is a different kind of claim. It is mechanical,
reproducible, and does not depend on who ran it.

## The measurement

A fixture: pm-skills 4.7.0 installed, memory populated (a real
`brief.md` and `decision-log.md`, one ticket record, an archive
INDEX), a root `AGENTS.md` with a house rule appended, a root
`check-links.mjs` with a local tweak. Then each reinstall method a
maintainer would plausibly reach for, checked by SHA against the
before-state.

| Method | Memory files | `tickets/` + `archive/` | Root copies |
| --- | --- | --- | --- |
| A — `cp -R` new over old | **overwritten with blank templates** | survive | survive |
| B — `rm -rf pm_skills` then copy | **overwritten** | **deleted** | survive |
| C — replace all but `pm_skills/project/` | preserved | preserved | preserved |

Method A destroys populated memory silently: no error, no prompt,
the file simply becomes the template again. Method B additionally
removes every ticket record and the entire cold archive, because
they are extra files that the shipped tree does not contain.

Both violate the rule `upgrade.md` states outright — *never delete
files in `pm_skills/project/` or `pm_skills/project/archive/`* —
and both violate the `project-memory` class that
`pm_skills/MANIFEST.md` exists to enforce.

## The uncomfortable part

The field reports say the two projects that reinstalled kept their
memory. That is true and it is not a contradiction. They kept it
because the clobber appeared in `git status` and somebody looked.

So the safety record of reinstall in the field is the safety record
of **code review**, not of the method. A project reinstalling
outside version control, or with a maintainer who commits without
reading the diff, loses its memory and finds out later.

## What follows

1. **`upgrade.md` is not redundant, but it is not what people use.**
   Arguing them into a twelve-step changelog walk has failed three
   times out of three. Making what they already do safe has not been
   tried.
2. **Reinstall is complete for `framework`-class files.** Files
   added since the project's version simply arrive — `field-report.md`
   and `epic.md` both landed in the fixture without being named.
   That is genuinely most of a release.
3. **It leaves exactly two things undone**, and they are the two the
   changelog's Upgrade actions describe: root-template merges (new
   sections never reach a populated root `AGENTS.md`) and
   memory-template reconciliation. So after a reinstall the walk
   shrinks to Steps 7–8, for the entries in the gap only.
4. **The Upgrade-actions tax is justified**, but for a different
   reason than the one it was introduced with. Its product is not
   the automated walk nobody runs; it is the record of *which
   root-template and memory-template sections changed*, which is
   precisely what a reinstall cannot infer by copying.
5. **A major bump still needs the full procedure.** Copying cannot
   delete a file that should no longer exist.

## Shipped from this

`pm_skills/prompts/upgrade.md` gains a **Reinstall path** section
(4.13.0): the measurement above in two sentences, the safe recipe,
what it cannot do, and when to use which. The recipe was run
verbatim from the published text against the same fixture and
preserved every project-owned file.

## What this does not settle

- **Why** the Route Plotter refusal happened. The decision is
  recorded; the reasoning is not. That needs the maintainer, or a
  read of the surrounding session log in the local lane.
- Whether the reinstall preference generalises beyond one
  maintainer. It needs a consuming project with a different owner.
- Whether the new section changes behaviour. It has not been used
  yet; the next deployment that moves version is the test.
