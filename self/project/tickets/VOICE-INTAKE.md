---
id: VOICE-INTAKE
name: Voice-memo transcript intake
status: todo
milestone: icebox
flags: detail
date: 2026-08-18
grades: Medium / Medium / Low / Low
order: 6
summary: investigate a transcript-intake workflow — verb + raw transcript + triage: topic cues gathered, the transcript rebuilt for quality, features / approach / tasks derived, results factored into the roadmap or backlog. The maintainer's current method, run today outside the framework; viability and worth are the questions.
---
# VOICE-INTAKE — Voice-memo transcript intake

> **Status:** Icebox — investigation, unblocked; open to a
> maintainer pick. **Grades:** provisional at intake (2026-08-18):
> Medium / Medium / Low / Low — the investigation re-grades.

## Intent

Investigate whether a first-class transcript-intake workflow is
viable and worthwhile: a verb that takes a long, meandering
voice-memo transcript raw, gathers topic cues from the maintainer,
rebuilds the transcript to improve its quality, derives features /
approach / tasks from it, and triages the results into project
memory — roadmap and backlog placement under the existing intake
discipline.

## Evidence / context

This is the maintainer's actual working method (stated 2026-08-18):
transcript preparation currently happens outside the framework — a
general-purpose chat assistant rebuilds the transcript — and the
derived items are brought in by hand. Owning the flow would keep
the raw transcript as provenance next to what it produced, and
make the triage consistent with backlog policy rather than ad hoc.

## Investigation questions

- Where it lives: a new prompt/verb versus an extension of the
  existing scoping and intake flows; distributed in
  `pm_skills/prompts/` versus proven here first (self/ only).
- Whether the raw transcript is retained, and where — this repo's
  `self/_transcripts/` convention suggests a home; what is the
  consuming-project equivalent?
- Pipeline shape: which stages are one verb versus separate passes
  (cue gathering, rebuild, derivation, triage), and where the
  human confirms before memory is written.
- Triage policy: how derived items land across milestones, the
  Icebox, and the wish-list without flooding open work.
- Generality: does this serve consuming projects, or is it a
  maintainer-workflow note that stays in self/?

## Constraints

- Text in, text out: audio transcription is out of scope
  (zero-dependency rule) — the verb takes a transcript, not a
  recording.
- Prose curriculum, not tooling: no new scripts unless the
  investigation proves the need.

## Inputs needed at pick

- One or more real raw transcripts from the maintainer as test
  material, plus the preparation prompts currently used
  externally, for comparison.
