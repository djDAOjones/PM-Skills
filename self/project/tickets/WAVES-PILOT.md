---
id: WAVES-PILOT
name: Pilot the findings-to-waves pipeline
status: todo
milestone: next
flags: detail, maintainer
blocked-on: maintainer picks the target project and drives the run there
date: 2026-08-28
grades: High / Medium / Low / Low
order: 1
summary: run findings.md + improvement-waves.md end-to-end in a real consuming project and file the result as a field report — both prompts shipped 2026-08-27 unvalidated in use. Route Plotter is the natural target: its filed 2026-08-26 review round is a ready-made findings corpus, and the run doubles as the next field report carrying the run-two observables.
---
# WAVES-PILOT — Pilot the findings-to-waves pipeline

> **Status:** Next · **Grades:** High / Medium / Low / Low ·
> [maintainer] — the run happens in a consuming project's own
> sessions; this repo receives the field report.
> **Last assessed:** 2026-08-28 — promoted from the wish-list at
> the run-two triage on the maintainer's direction.

## Intent

Close the validation gap both prompts shipped with: this repository
has no application source to pilot them on, and both tickets named
that gap. One end-to-end run — findings verified and given their
dispositions, a wave programme planned, ideally the pilot wave run —
validates both, and the filed report becomes the tier's next
evidence tranche.

## Done when

- `prompts/findings.md` has run against a real review corpus in a
  consuming project (Route Plotter's filed 2026-08-26 review round
  — review, crosswalk, remediation prompt — is ready-made; the UoN
  Video Helper's is the alternative).
- `prompts/improvement-waves.md` has planned waves over the
  survivors; the pilot wave ran, or the stopping reason is
  recorded.
- The outcome is filed here as a field report
  (`prompts/field-report.md`), which also carries the run-two
  observables: version-reached (FS2-01), verb-firing including
  review/findings (FS2-02 watch), any `Close: lite` occurrence.

## Constraints

- The run happens in the consuming project, under its own gates;
  this repo's sessions never open that checkout (field-study
  boundary applies to studies, not to the maintainer working his
  own project — but the *filing* still comes back as a report, not
  as live memory).
- Any framework defect the pilot exposes becomes a normal ticket
  here, not an in-flight patch there.
