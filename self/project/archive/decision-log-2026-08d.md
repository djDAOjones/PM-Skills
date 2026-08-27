# Decision log archive — 2026-08-17 → 2026-08-23

<!-- Cold tier: grep only, never auto-read. Append-only, verbatim.
     Its range overlaps decision-log-2026-08c.md: August is sub-split
     by date range, so the INDEX row's item IDs, not the dates, locate
     an entry (pm_skills/memory-policy.md -> "Retention shape"). -->

## 2026-08-23 — Re-assess (scoped): TEST-DOC cut, DATA-MIG held

**Decision:** Scoped Re-assess over the two standing items past the
30-day threshold — assessed 2, promoted 0, held 1, cut 1. **DATA-MIG
held**, no re-stamp: the trigger (first consuming project with
persistent user data) is concrete, testable, and restated in
`brief.md` → Out of scope; the only consuming project runs an
append-only log with rebuildable projections. **TEST-DOC cut**
(maintainer decision, 2026-08-23); record archived verbatim with
`status: cut`.

**Rationale (cut):** The July origin verdict was already "DEFERRED /
cut down" — the testing doctrine lives in `templates/AGENTS.md` →
Testing and behaved on the Hub (2,002 tests, honest not-applicable
use). The whole deliverable was one cross-reference paragraph in
the DEV-INFRA Quality-gate section — a one-minute edit the day any
evidence appears, needing no record to be remembered. The trigger
"evidence of need" is untestable and did not fire through five
judgements (07-16 triage, TICKET-SWEEP, ICEBOX-DEEP, INTAKE-DEEP,
the 08-18 pass), each keeping it only by deferring to a prior call;
carrying cost had become a judgement slot per pass and a WARN per
close. Re-add condition kept in the Icebox intent line.

**Alternatives:** keep both (rejected — a fifth deferral); cut both
(rejected — DATA-MIG's hold is sound and brief-stated).

## 2026-08-23 — RELEASE-TREE-GLOB: glob-aware GUIDE-tree check (4.9.2)

**Decision:** The step 6 loop derives one extended regex from the
guide's file-shaped `*` tokens (`name*name.ext` only, so markdown
bold never matches) and tests each basename with `grep -E` after
the literal grep fails. Patch release; GUIDE untouched.

**Rationale:** The snippet is pasted into whatever shell the
maintainer has. A `case`-pattern loop over the token list depends
on word-splitting (zsh does not split unquoted expansions) and on
pathname expansion being off; a `while read` pipe loses the match
flag in a bash subshell. One regex sidesteps all three; verified
identical output under sh, bash, and zsh, positive and negative.

**Alternatives:** `case` + `set -f` (rejected — zsh word-splitting);
expanding the guide's glob line into three names (rejected — the
4.5.0 glob was deliberate and the check should serve future
families too); scoping the literal grep to the tree block only
(deferred — stricter than today; not this fix's concern).

## 2026-08-23 — Pruned project memory: decision-log 21 → 10 live

**Decision:** Archived the oldest 11 entries (REFLECT-1 … CTX-CACHE,
2026-08-09 → 2026-08-17) verbatim to
`archive/decision-log-2026-08b.md`; the live file keeps the latest
10 (read-tier floor; hysteresis ceiling 14). Byte-verified split,
21 = 11 + 10; preflight blocking-mode clean.

## 2026-08-18 — PLAN-ORDER: Re-assess verb ships; first pass run live (4.9.0)

**Decision:** the development-order investigation concluded *build*:
memory maintenance gains **Re-assess (re-judge the queue)** rather
than a new prompt file or a Refactor extension. Evidence for the gap:
Refactor's own rules stop on a structurally clean backlog ("not a
re-prioritisation"), yet a clean backlog still needed a judgement
pass twice in two days (INTAKE-DEEP 2026-08-17 by hand; the
maintainer's 2026-08-18 "triage, assess, grade the icebox" request —
this session's pass). Distributed because the sibling intake flow
(backlog-authoring) already is, and any graded backlog ages the same
way.

**Shape calls:** (1) sibling verb, not a Refactor mode — structure
and substance want separate sign-off surfaces. (2) Propose-only and
**never auto-run**, written into the verb rules so no future
automated-maintenance ladder can absorb a judgement pass. (3) Noise
rule: `Last assessed:` body lines only where the assessment changed
something; confirmed holds stay diff-quiet, the pass's log entry
carries the batch date. (4) An `assessed:` frontmatter key stays out
of the record grammar until a mechanical consumer (janitor/validator
staleness computed off assessment date, not creation date) earns it —
that is the formalisation trigger.

**First pass (this session, delegated gateless):** seven items
assessed — PLAN-ORDER shipped as the verb itself; VOICE-INTAKE
promoted Icebox → Current, blocked on maintainer inputs (real
transcripts + the external preparation prompts); the five triggered
holds confirmed current (no trigger fired since INTAKE-DEEP); zero
cut; wish-list's NEXT-FRAGMENTS left parked per PACE-POLICY.
Harness: no applicable scenarios — neither the close protocol nor
the upgrade machinery changed.

## 2026-08-17 — RECORDS-DIST: records mode ships distributable (4.8.0)

**Decision:** BACKLOG-STATE phase 2 shipped as one arc, gateless
under `next:`: scaffold copies of the records tooling
(`pm_skills/scaffold/gen-backlog.mjs` + `check-memory.mjs`,
run-in-place, `--project-dir` defaulting to `pm_skills/project`), a
dialect surface, and adoption grammar guidance (GUIDE "Records
mode", backlog-authoring "Records mode", template pointer, init
Step 9 note, end-of-task records aside). Dialect pick — the
ticket's open question — flat keys in `tickets/_meta.md`
(`milestones: key=Title, …` ordered pairs; `flags:` extras, known
never standing) over a config file (a new artifact for two keys) or
documented-trade-only (fails the Hub evidence: the dialect really
was flattened). A record naming a milestone outside the configured
groups errors, never silently drops. Both source forks gained the
same mechanism (deliberate-forks parity; canon view byte-stable).
Fixture testing caught one real gap — first generation onto a file
without `## Active` produced a view the validator could not parse —
fixed in both forks (the generator now creates the heading).

**Verification:** gate green after the last edit; Hub-style dialect
fixture green including both negative paths; template-adoption path
green. Harness (advisory): close scenario applicable
(end-of-task.md changed) — first blinded close-control run,
**GREEN** (4/4 assertions + oracle; the fixture's validator was the
newly shipped scaffold copy operating in-role) — see
`self/evaluations/`.

**Alternatives:** tools without the dialect surface (rejected —
re-creates the flattening RECORDS-TAXONOMY named); three separate
releases (rejected at INTAKE-DEEP — one evidence base, one
surface); a second consuming project before building (the ticket's
re-gate option — not exercised; the INTAKE-DEEP placement stood).

## 2026-08-17 — CL-440-WORDING: 4.4.0 corrected; first real harness pull (4.7.2)

**Decision:** three changes, one patch release. (1) The 4.4.0
correction rides a `### Corrections` section in the 4.7.2 entry
(assumption: extends the canonical entry shape; the published 4.4.0
entry stays byte-untouched). (2) The ticket's open question is
taken: `upgrade.md` Step 3 gains the class-precedence guard — the
decisive argument is reach: a changelog entry is read only by walks
crossing it, while the procedure is read by **every** walk, so the
rule must live in the procedure. (3) `release.md`'s step 6 awk
completes the 4.7.1 snippet fix (review F1). **Mapping call:** the
upgrade scenario **applied** — the release changes `upgrade.md` and
corrects upgrade instructions; the milestone intent had sequenced
this release under the net. First **blinded** run (R0's pending
gap): fixture 4.3.0 → 4.7.2, populated memory, template-merge
window. Raw pass **RED** — the asserter flagged the mandated Step
10 decision-log append as a memory mutation; calibrated on R0's
in-role run, which skipped Step 10. Oracle fixed source-only
(append-only assertion replaces byte-identical for that one file;
5 checks where there were 4), re-run **GREEN 5/5**. The protected
property held: the populated backlog crossed 4.4.0 untouched, with
the blinded agent citing the correction unprompted. Detail:
`self/evaluations/2026-08-17-upgrade-scenario-4.7.2.md`.

**Rationale:** correct the record for planners (Step 2 assembles
the whole gap before executing, so the correction reaches in-flight
walks); make precedence structural for future walks; fix the oracle
openly rather than let the net cry wolf at every faithful run.

**Alternatives:** correction entry without the guard (rejected —
reach, above); leaving the asserter and annotating runs (rejected —
a net that is red on every honest pass trains people to ignore it).
