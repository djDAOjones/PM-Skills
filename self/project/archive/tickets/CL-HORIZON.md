# CL-HORIZON — Changelog horizon (epoch split)

> **Status:** Current #2 · **Grades:** Medium / Low-Med / Low /
> Low.

## Intent

The changelog is not prose history — it is the machine-consumed
upgrade instruction set (`upgrade.md` walks every entry between a
project's version and latest). Keep it cheap to consume as it
grows: split archived epochs out before the size trigger fires
mid-release.

## Done when

- Entries for superseded major epochs (1.x–3.x) move verbatim to an
  archive file (e.g. a `CHANGELOG-3x` sibling); the live
  `pm_skills/CHANGELOG.md` keeps the 4.x epoch plus an index line
  per archived epoch.
- `upgrade.md` Step 2's walk follows the index when a project's
  version gap spans an archived epoch — a 2.x project still
  upgrades declaratively.
- `pm_skills/MANIFEST.md` rows cover the archive file; the split is
  itself a release with upgrade actions.

## Evidence / context

Measured 17,352 words before 4.4.0; the ~20k trigger is expected
within a few releases. Append-only forever means the growth never
reverses. The epoch-chunking pattern already exists for memory
archives (memory-policy: chunk by sequence boundary for
browsability, never by size alone).

## Approach

Archive whole major epochs only, at the major boundary; entries are
moved byte-verbatim (append-only discipline — the 4.3.0
heading-swallow incident is the cautionary tale, caught by the
gate). Keep the newest epoch plus the previous major's final entry
live so the common one-gap upgrade never needs the archive.

## Constraints

- Never rewrite an entry in the move; `diff` the concatenation
  against the original before committing.
- Consuming projects more than one epoch behind must still complete
  a full walk — the index is a pointer, not a summary.

## Open questions

- One archive file per major, or one rolling archive — lean
  per-major (browsability, bounded files).
- Execute now or at the measured trigger — lean now-ish: it is
  small, and doing it inside some future release doubles that
  release's risk.
