---
id: FLAGS-EMDASH
name: Validator flag parsing dies on an em-dash
status: todo
milestone: current
flags: detail
blocked-on:
date: 2026-08-28
grades: Medium / Low / Low / Low
order: 3
summary: check-memory splits the backlog view line on the first em-dash before matching bracketed flags, so an em-dash inside a flag body silently defeats flag parsing, the standing-age check, and date extraction; gen-backlog happily emits such lines, so the two tools disagree about the grammar. Fix the parser in both forks (patch release); the FILEMAP-WRAP shape again.
---
# FLAGS-EMDASH — Validator flag parsing dies on an em-dash

> **Status:** Current · **Grades:** Medium / Low / Low / Low.
> **Last assessed:** 2026-08-28 — found live during the run-two
> refactor: rewording DATA-MIG's `blocked-on` with an em-dash made
> its by-design ITEM-AGE warning vanish from the validator output.

## Intent

`check-memory.mjs` parses a view item as
`**ID Title** [flags] (date) — summary` by taking
`head = text.split('—')[0]` and then matching `[...]` groups and
the `(YYYY-MM-DD)` date inside that head. An em-dash **inside a
flag body** truncates the head mid-bracket: no flags parse, the
item stops counting as standing, its date is lost, and the
standing-age warning disappears with no error. `gen-backlog.mjs`
renders `blocked-on` verbatim into the bracket, so the generator
emits exactly what the validator cannot parse.

## Done when

- The parser extracts bracketed flag groups and the date **before**
  splitting on the summary separator (equivalently: splits on the
  first em-dash *outside* brackets). Flag bodies may contain
  em-dashes; behaviour for well-formed lines is unchanged.
- Fixed in **both** deliberate forks — `scripts/check-memory.mjs`
  and `pm_skills/scaffold/check-memory.mjs` — in one change
  (CONTRIBUTING → deliberate forks); scaffold change ships as a
  patch release with upgrade actions in the FILEMAP-WRAP style
  (scaffold class: nothing required; copy to adopt).
- Verified against this repo's live records: VOICE-INTAKE and
  DATA-MIG may carry natural punctuation in `blocked-on` and still
  count as standing items with dates.

## Evidence / context

Found 2026-08-28: the DATA-MIG ITEM-AGE WARN (43 d, by design)
vanished after a `blocked-on` rewording that contained an em-dash;
VOICE-INTAKE's original `blocked-on` already contained one, so its
standing-age check has been silently dead since authoring — the
same silent-loss shape as FILEMAP-WRAP (4.16.1), in the sibling
scaffold tool. Both records were reworded em-dash-free as the
immediate mitigation; this ticket restores the grammar's tolerance.
