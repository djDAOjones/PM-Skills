# Decision Log — pm-skills framework repository

<!-- Append new decisions at the top. Don't edit old entries. -->
<!-- Hot sectional: agents scan the latest 10 headings, open only
     relevant bodies. Keep entries tight: Decision / Rationale /
     Alternatives. -->

<!-- Older entries are archived — every chunk is named by an
     "## Archived:" line at the foot of this file. Ranges OVERLAP, so
     see archive/INDEX.md for the item IDs, not just the ranges
     AND item IDs. Grep the archive files directly; never re-inline
     them. Reversing a decision? Mark it forward with a
     `Supersedes:` line (memory-policy -> "Retention shape"). -->

## 2026-08-28 — FLAGS-EMDASH: the second silent-loss parser this week

**Decision:** shipped 4.18.1. `check-memory`'s item head is now
delimited by the first em-dash at **bracket depth zero** (`itemHead()`)
instead of the first em-dash anywhere, so a flag body or a
parenthetical may contain one. Fixed in both deliberate forks in one
change. The two live records that had been reworded em-dash-free as
the immediate mitigation are restored to natural punctuation, and
now serve as the live regression witness.

**Rationale:** `gen-backlog` renders `blocked-on` verbatim into the
flag bracket, so the generator emitted exactly what the validator
could not parse — the two halves of records mode disagreed about a
grammar that never forbade the punctuation. Only the parser did.
Fixing the parser rather than the grammar keeps the constraint where
it belongs: a maintainer writing a blocking reason should not have
to know which characters a script splits on.

**Verification (the numbers are the point).** Against this
repository's own records, with em-dashes restored: the pre-fix
validator reports **0 warnings**; the post-fix validator reports the
43-day standing item that was there the whole time. A synthetic
two-item fixture isolates it further — the control item counts as
standing under both parsers, the em-dash item only under the fixed
one. No behaviour change on any well-formed line.

**The pattern is worth naming.** This is FILEMAP-WRAP's shape
(4.16.1) in the sibling script, five days later: a single-line
assumption inside a generated-file utility that discards real content
while the output still looks well-formed. Both were found by
accident, both by someone reading output for another purpose. The
family — `gen-*.mjs` and `check-*.mjs` — parses text the project
itself authors, and its failure mode is silence rather than error.
That is a standing reason to distrust one-line splits and regexes in
these scripts specifically, and it is now on the record twice.

**Assumptions (auto-jazz):** depth counted for `()` as well as `[]`,
since a `[detail]` flag carries its `tickets/` link target on the
same line
and a parenthetical is as likely to carry an em-dash as a flag body;
unbalanced closers clamp at zero rather than going negative, so
prose cannot drive the scanner into a wrong state. No grammar
document changed — the grammar always permitted this.

## 2026-08-28 — BUDGET-TRUTH: the last fixed word cap, and two omissions

**Decision:** shipped 4.18.0 in three parts. (1) Backlog Active's
fixed 1,500-word cap is replaced by a **per-item verbosity guard** at
~200 words, item count (~40) staying primary — the decision log's
entry-guard design applied to the policy's last fixed word cap. (2)
The **recorded quality stop** becomes policy: a prune that stops
above the 70% target because the material still there feeds open work
has applied the rule, provided the stop is recorded in that prune's
decision-log entry; count budgets explicitly do **not** yield this
way. (3) The reference-doc sweep gains the **root rulebooks**
(`AGENTS.md` always, plus UI-STANDARDS / DEV-INFRASTRUCTURE / PROCESS
where kept), implemented in both validator forks.

**Rationale:** the policy had already retired fixed word caps three
times — file-map (derived, "noise not size"), decision log
(entry-count primary), read load (no aggregate cap) — each time
naming the pathology the field then demonstrated: the Active warning
stood, read and overridden, in 10 of 12 traces in one project and for
that project's whole life. A permanently red check is not a check.
The quality-stop clause has the strongest evidence shape available:
two owners wrote the same doctrine into their own logs, unprompted
and in their own words, before the policy said it — when that
happens, the omission is the policy's. And the rulebook sweep closes
a hole the policy row had already described but no tool implemented:
a fresh-init AGENTS.md reached 4,502 words in four days with nothing
anywhere positioned to notice.

**The guard number is derived, not chosen.** Field corpus: 26 items
across 2,479–3,004 words (~95–115/item), held deliberately and called
load-bearing; this repo's own queue runs 40–96/item. 200 is ~2× the
observed ceiling — the same guard-to-healthy ratio the decision log
uses (600 against 150–300). Recorded here because a guessed budget
becomes archaeology within two releases.

**Assumptions (auto-jazz, skipped gates):** the guard is per single
item, not a mean — a mean lets one runaway hide behind nine terse
items, and the decision-log precedent it mirrors is per-entry.
Scope grew by two prompts beyond the ticket's named files
(`end-of-task.md`, `memory-maintenance.md`): both restate the budget
shape, and leaving them would have shipped the same
retire-in-one-place-only defect as CLOUD-TRUTH did an hour earlier.
`end-of-task.md`'s conditional-rulebook carve-out was corrected
rather than deleted — its parenthetical always gave read load as the
reason, so scoping it to read load is what it meant.

**Verification:** guard confirmed firing on a synthetic 250-word item
(named, WARN not FAIL) and silent on a terse one; both forks run
identically against this repo's records; AGENTS.md now reports at
971/3,500. Gate green.

## 2026-08-28 — CLOUD-TRUTH-SWEEP: a retirement that landed in one file

**Decision:** shipped 4.17.1 an hour after 4.17.0, removing the
retired "unsupported" cloud-sync claim from the three distributed
files 4.17.0 left it in — `prompts/memory-maintenance.md` ("Standing
advice"), `GUIDE.md` (the OneDrive quick answer), and
`integrations/dispatch.md` (the lane-tree rule). The first two become
pointers to `AGENTS.md` → "Hostile-filesystem guard"; the third keeps
its stricter "never" and gains the reason that justifies it — two
parallel lane trees under one sync client make conflict copies
routine, not merely possible. `GUIDE.md` → "Parallel and
multi-machine work" was deliberately left: it is a claim about
sync-as-transport between machines, not about where a checkout may
live, and it is still true.

**Rationale:** found by the framework running its own environment
preflight before the Prune, and reading the sentence 4.17.0 had just
repudiated. CLOUD-TRUTH's "Done when" named two template files; the
item's actual intent was to retire a claim, and a claim is retired
only where it is asserted. The ticket was under-scoped and its close
did not catch it, because the release-consistency check only looks at
files the release *changed* — it cannot see a file that should have
changed and did not.

**The real lesson is upstream of the bug:** the claim was restated in
four places, so retiring it took a sweep. Two of those restatements
existed in violation of canonical-copy discipline, which this repo's
own conventions state plainly. Had the rule lived in one place with
pointers to it, 4.17.0 would have been complete on the first pass.
A grep for the retired wording across the distributed tree is now
part of how a retirement gets closed — cheap, and it would have
caught this before the first push.

**Assumptions (auto-jazz):** shipped as a patch under a new ID rather
than reopening CLOUD-TRUTH (already closed and pushed); no ticket
record created, following the FILEMAP-WRAP precedent for a defect
found and shipped in the same session; `dispatch.md`'s rule kept
rather than relaxed, on the grounds that its risk profile genuinely
differs.

## 2026-08-28 — Fourth Prune, taken at the budget rather than past it

**Decision:** pruned the decision log 20 → 12 live entries, the
oldest eight (all 2026-08-27, from the mid-run Prune / P4 trap entry
back through the LAB-FIRST-pause Re-assess) moved verbatim to
`archive/decision-log-2026-08f.md`, with the INDEX row in contract
form and the live file's pointer set re-emitted intact.

**Rationale:** the burn-down's pre-pick budget check put the log at
exactly 20/20 after CLOUD-TRUTH closed — at budget, not over, with
two more releases queued behind it. `epic.md` says to interleave the
Prune when a budget trips; taking it one entry early bought a clean
working tree for P3 (backup skipped, git history sufficient) instead
of a mid-close prune on a dirty one. Kept 12 rather than the
latest-10 floor: a generous margin is the prompt's own preference,
and 8 entries of headroom covers the rest of this run.

**Verification:** 12 kept + 8 archived = 20 original; both slices
diffed byte-identical against `HEAD` (only the chunk's trailing blank
line trimmed); the P4 index trap avoided — the six existing
`## Archived:` pointers stayed on the live file and did not ride the
slice into the new chunk. Gate green.

## 2026-08-28 — CLOUD-TRUTH: the guard stops lying, the gate stays hard

**Decision:** the AGENTS template's hostile-filesystem guard no
longer claims cloud-synced paths are "unsupported for project
memory" (4.17.0). The rule now states the hazard as standing and
common, names the failure modes the field actually produced (silent
mid-session reverts, conflict copies, dropped executable bits,
watcher churn, half-synced `node_modules/`, deep paths truncated by
the client's path limit) and the mitigations that work (preflight,
pause-or-exclude, commit early and push, archive bulk evidence as
single files). The memory-surgery block is kept **hard** and stated
more sharply than before — the softening is of the claim, never the
gate. The operational half gets a template home: a new **Cloud-synced
checkouts** section in the DEV-INFRASTRUCTURE template, plus the
matching `init.md` Step 8 list item and Appendix B worked shape, so a
fresh init populates it instead of each project reinventing it.

**Rationale:** four of four deployments on record — this repository
included — live on OneDrive, and none relocated; they hand-wrote the
operational defences the templates lacked (FS2-06, confirmed by the
same-day addendum). A hard rule that every deployment permanently
violates is not harmless fiction: it is the template's worked example
of a rule you may ignore, sitting in a list whose whole authority is
that its rules are not negotiable. The credibility of the rules
beside it is worth more than the three words.

**Alternatives:** delete the "unsupported" sentence alone (the
study's lighter option) — rejected because it leaves the operational
knowledge homeless, which is what produced the per-project
reinvention in the first place. Leave it and rely on the guard's
working half — rejected on the corrosion argument above. Adding the
DEV-INFRASTRUCTURE section without the `init.md` wiring was
considered and rejected in-flight: the template's CUSTOMISE comments
defer to Step 8 for shapes, so a section absent from that list is a
section a fresh init skips — the FS2-04 drift shape, avoided for the
cost of one list item.

**Assumptions (auto-jazz, skipped gates):** placed the new section
after Package management, on the grounds that the dependency tree is
the loudest victim and an environmental caveat should be read early;
scoped the change to four distributed files (the ticket said two —
`init.md` was added for the wiring reason above); left `README.md`
untouched, as neither quick start nor upgrading changed.

## 2026-08-28 — Run-two interrogation, and the queue refills

**Decision:** on the maintainer's direction, the study's conclusions
were interrogated against the four distributed files its remedies
had targeted without reading, corrections filed as a same-day
addendum to `self/evaluations/2026-08-28-field-study-2.md`, and the
backlog refactored for the next wave. Corrections that changed the
triage: FS2-02's remedy was aimed at the wrong object (`review.md`
is run-acceptance, not whole-repo production — the watch is re-aimed
at the verb itself); FS2-05 half-withdrew (end-of-task already
ships the lite close and the secondary-session handoff, and part of
the "unclosed sessions" evidence is that machinery operating —
SESSION-CHECKPOINT is withdrawn); the study's "disjoint files"
sequencing claim was wrong, so BUDGET-QUALITY-BAR and
RULEBOOK-BUDGET merged into one item. The refactor also
surfaced a live validator bug: rewording DATA-MIG's `blocked-on`
with an em-dash made its by-design ITEM-AGE warning vanish —
`check-memory` splits the view line on the first em-dash before
matching flags, so flag parsing, standing-age, and the date die
silently, and VOICE-INTAKE's original wording shows the defect
predates today. Both records were reworded em-dash-free as
mitigation and the fix is ticketed (FLAGS-EMDASH, both forks, the
FILEMAP-WRAP shape again). Queue after the refactor —
Current: CLOUD-TRUTH, BUDGET-TRUTH, FLAGS-EMDASH (all workable
today).
Next: WAVES-PILOT (promoted from the wish-list, maintainer-driven;
Route Plotter's filed review round is the ready corpus),
VOICE-INTAKE (moved out of Current at its sixth pass — a blocked
item should not headline the wave; inputs-or-cut stands with the
maintainer). Icebox: unchanged except DATA-MIG, whose hold is
re-worded from "trigger unfired" to "maintainer confirms" — the
Derry Lane register is a plausible claimant, and the record had
not been re-judged since that evidence arrived. Wish-list: two
watches (review-acceptance, lite-close), ROADMAP-DIST,
NEXT-FRAGMENTS.

**Rationale:** an adversarial pass over one's own findings is the
study's Phase 6 applied to the study itself, and it earned out —
three of six findings changed shape on contact with the current
files, which is exactly the re-finds-what-is-fixed failure the
instrument warns about, caught before any edit shipped. The
refactor is maintainer-directed triage, which is what licenses
wish-list promotion (promotion is never automatic).

**Alternatives:** leave the candidates on the wish-list awaiting a
separate Start B pick (rejected — the maintainer's "refactor the
backlog ready for the next wave" is that pick); promote DATA-MIG
to Next on the Derry Lane evidence (rejected — the confirm is the
maintainer's, and `brief.md` still carries the matching deferral);
keep VOICE-INTAKE in Current (rejected — six passes of "still
blocked" in the headline slot stopped being informative a pass
ago).

## 2026-08-28 — Reflection run two: the field runs a different framework

**Decision:** reflection run two executed as the first field study
(`self/FIELD-STUDY.md` under the read-only posture) over the full
consuming-project tier — four projects, two harvesting witnesses,
integrity check clean at both ends. Six findings within the caps,
five candidates filed to wish-list triage (CLOUD-TRUTH marked
promotion-ready), one retirement named: the hostile-filesystem
guard's "unsupported" claim, which every deployment on record —
this repository included — permanently contradicts. No policy
adopted; nothing applied; every change stays gated as ordinary
work. Report: `self/evaluations/2026-08-28-field-study-2.md`.

**Rationale:** the run-one log entry held run two for external
evidence, and the tier now carries it — including a session-log
verb-firing analysis, the single most valuable input the study
found. The headline result is a repeated shape: where a rule's
arithmetic met owner judgement, judgement won and was written
down (word budgets, prune-to targets, the upgrade walk), and the
framework's best recent releases (4.13.0, 4.15.0) are exactly the
ones that made the field's judgement the rule. The evidence
population stays one person's projects; every grade in the report
is capped accordingly, and the report names the evidence run
three most needs — a project not built by the maintainer.

**Alternatives:** run the three-pass reflection directly on the
reports (rejected — the instrument exists precisely so the
evidence run is method-governed); push CLOUD-TRUTH straight to
the backlog (rejected — the queue was declared empty-of-workable
on 2026-08-27 and promotion is the maintainer's pick, so it is
flagged, not forced); file candidates as one composite item
(rejected — they touch disjoint files and need no wave).

## 2026-08-28 — FIELD-STUDY: the reflection practice gets a method

**Decision:** `self/FIELD-STUDY.md` — the read-only, single-pass
procedure that turns the field-report tier into an evidenced
framework-improvement report. REFLECTION.md stays the policy
(triggers, evidence gate, caps, governance); this is the method it
calls. It runs under `prompts/read-only.md` rather than restating the
no-write contract.

**Source-only, deliberately.** Two things settled the placement, both
hard: its substance is reading `self/field-reports/`, and no
distributed file may reference `self/`; and REFLECTION.md already
defers distribution of the practice until two self-hosted runs have
happened, of which one has. Shipping it as a release now would have
overridden a standing decision to get a worse file.

**Rationale.** The tier has held real consuming-project evidence
since 2026-08-23 and nothing has read it systematically. The prompt's
load-bearing parts are the ones a generic reflection would omit: a
staleness pass dating every observation against the `pm-skills=` join
key and diffing forward through CHANGELOG, because field evidence is
by construction older than the framework it describes; consistency
grades, because three reports by one person in one week are not three
witnesses; and a mandatory retirement, because the certain failure of
a self-improvement prompt is that it only ever adds.

**Alternatives.** A distributed verb (blocked, above). Folding it
into REFLECTION.md (rejected — policy and method have different
readers and different change rates). Reusing `prompts/findings.md`
(rejected — that verifies findings about code against source; this
produces them about the framework from filed evidence).

**Resolved on the way:** `read-only.md` says the report is written
outside the tree; the reflection governance says outputs are dated
documents under `self/evaluations/`. Filing is a separate step that
ends the posture, exactly as read-only.md provides.

## 2026-08-28 — FILEMAP-WRAP: the generator was eating role text

**Decision:** fix `existingRoles()` in both file-map generators to
fold hand-wrapped continuation lines back into the role instead of
truncating to the first line; restore the four damaged roles verbatim
from git history. Released as **4.16.1**, patch — a fix, no new
files, no migration; the shape of 4.10.1 (SCAFFOLD-GITPATH).

**Rationale.** The bug falsified both of the script's own documented
promises — role text "preserved verbatim", and "never silently
drops". It was found by running the generator, watching it eat a role
written by an earlier session, and checking whether that had happened
before: three more roles were already half-sentences. That is the
failure mode in full — the map still lints, still reads as prose, and
quietly stops describing the file. `git log -S` on each role line
recovered the original wording, so nothing was reinvented.

**Alternatives.** Hard-fail on a wrapped role (rejected — nags where
it can repair). Leave the source fork alone and fix only the scaffold
(rejected — the fork rule runs both ways). Restore the roles without
fixing the parser (rejected — the next regeneration eats them again).

**Fork port.** `pm_skills/scaffold/gen-file-map.mjs` had the
identical parser, so the fix moved across, not the file — the
deliberate-fork rule. Upgrade actions state plainly that `scaffold`
class means nothing is required of a consuming project, and give the
one thing that is time-critical: check your map for roles ending
mid-sentence *before* regenerating with an unfixed copy, because that
regeneration is what destroys the evidence.

## 2026-08-27 — Third Prune; the P4 fix repays itself the same day

**Decision:** decision log 21 → 14 live at the run's close;
seven entries to `archive/decision-log-2026-08e.md` (2026-08-23 →
2026-08-27). Lossless: 21 entries before, 21 after, zero content
lines dropped. Three prunes in one session — two interleaved, this
one at the close — which is the interleaving `epic.md` prescribes,
not a symptom of anything going wrong.

**The 4.12.1 fix caught its own bug on first use.** This prune's
archived slice contained **two** `## Archived:` index lines, which a
naive tail would have carried into the chunk exactly as the earlier
one did. The fix pulled them back to the live file.

**And the historical damage it predicted was real.** 4.12.1's upgrade
action says to check that every file in `archive/` is named by an
index line in the live log. Checked here: three of six were **not** —
`decision-log-2026-07.md`, `-08a.md` and `-08b.md` had lost their
pointers to prunes that predate today. Restored. The header comment
now says the index lines are the record rather than listing ranges
itself, so the list cannot go stale again.

That is a fix written this morning, exercised this afternoon, and
found to have already been needed — the strongest evidence a
same-day patch can produce.

## 2026-08-27 — Re-assess: the queue reaches empty-of-workable

**Decision:** the burn-down stops here, on `epic.md`'s normal ending
— no workable items left. Ten shipped in one run (ARCH-RETENTION,
SCAFFOLD-GITPATH, FIELD-EXPORT, BACKLOG-TABLE, EPIC-AUTOJAZZ,
PRUNE-P4-INDEX, UPGRADE-REFUSED, READ-ONLY-AUDIT, REVIEW-SUITE,
ABSTRACTION-PLAN), 4.9.2 → 4.16.0. Six items remain and every one is
held on something only the maintainer or an outside event supplies.
Nothing was invented to fill the gap.

**VOICE-INTAKE has been passed over at five consecutive refactors.**
Its intent line has said "the honest move is to say so" for two
passes; this is saying it. The block is real (real transcripts plus
the external preparation prompts) and it is the softest block in the
queue, so it is not an Icebox item — but "still blocked" has stopped
carrying information. It wants the inputs or a decision to cut.

**Two items moved closer without being touched.** ARCH-RECALL is now
one field report away: ARCH-RETENTION lifted the retention cap this
morning, so only the missed-precedent evidence trigger remains.
JANITOR-WRITE's line has now been drawn from both sides — 4.12.0
established that delegation licences a maintenance verb where
automation does not, 4.14.0 that a read-only pass needs no gate at
all — so what is left of it is genuinely the write ladder and nothing
conceptual.

**Wish-list left un-promoted, deliberately.** Three items wait there
and promotion is never automatic (session-start Start B: "Apply only
what the user confirms. Never auto-promote."). The delegated run
covered burning the backlog down, not deciding what enters it.
WAVES-PILOT is the one worth the maintainer's attention first: a
single run against Route Plotter or UoN Video Helper closes the
unvalidated gap that **both** REVIEW-SUITE and ABSTRACTION-PLAN
shipped with.

**Counts:** assessed 6 / promoted 0 / held 6 / cut 0.

## 2026-08-27 — ABSTRACTION-PLAN: the composition layer ships (4.16.0)

**Decision:** ship `pm_skills/prompts/improvement-waves.md` as a
**separate prompt**, not a stage of REVIEW-SUITE. Once REVIEW-SUITE
landed as per-finding verify-and-disposition, the boundary became
structural rather than a judgement call: `findings.md` decides what
each finding is and where it goes; nothing in a per-finding pass can
decide **order, grouping, or where to stop** across all of them.
That is this file, and it is the composition layer the ticket
suspected was missing.

**The four open questions, answered:**

1. *Separate or a stage?* Separate — per above.
2. *Consume findings, or repeat the census?* **Consume, and cite
   IDs.** Two coverage claims over one repository will disagree, and
   then neither can be trusted. With no findings the prompt stops
   rather than substituting for looking.
3. *Which metrics?* Only observations — coverage, waves shipped
   versus reverted, gate result. **No numeric targets for code
   properties**: this prompt authorises the changes that move line
   counts and duplication percentages, so a target makes gaming them
   the cheapest route to success.
4. *Autonomous no-pausing mode in a gated framework?* **Already
   settled**, this morning, by READ-ONLY-AUDIT (4.14.0) — the ticket
   asked for it to be settled once for both, and it was. This file
   declares `read-only.md` and re-opens nothing.

**The two invariants worth the file's existence.** "Exhaustive"
means a **reconciled ledger**, not everything read: every area graded
substantive / superficial / classified-only / excluded-with-reason
and appearing exactly once. And when a run cannot finish, areas stay
*classified only* — never trade inspection for assumption.
Downgrading the grade is honest; inferring what an unread area
contains is the failure the ledger exists to prevent.

**Abstraction is not the objective**, and the file says so: six equal
treatments including *keep the duplication* and *leave unchanged*. A
plan whose every entry says "abstract" has not been thought about.

**Assumptions at skipped gates (auto-jazz):** minor release, new
file; named `improvement-waves.md` rather than `improvement-plan.md`
to avoid a folder listing where it sits one word from
`implementation-plan.md`, which is a different thing (one change, not
a programme).

**The Done-when line that is NOT met, stated plainly:** "a pilot on a
real codebase gives useful, traceable recommendations without
modifying application source." This repository has no application
source — Markdown and lint tooling. The prompt's pilot rule is
written but has never been run. That is the same gap REVIEW-SUITE
carries, and the same test closes both: a run against Route Plotter
or UoN Video Helper. Filed to the wish-list rather than left implied.

**Alternatives:** fold it into `findings.md` (rejected — per-finding
and across-findings are different operations and the combined file
would be twice the length for one audience at a time); adopt the
basis prompt's census-first shape (rejected — duplicates the audit
and creates the competing coverage claim question 2 rejects).

## 2026-08-27 — Second mid-run Prune; this session declared as its own phase

**Decision:** trajectory hit 1909/2000 between items, so a second
interleaved Prune ran before the next pick. 1909 → 1297 words; five
whole phases moved to
`archive/trajectory/trajectory-0002-2026-08-08-to-2026-08-18.md`
(20 items, IDs in the INDEX row). Lossless: 43 items before, 43
after, zero content lines dropped.

**And a phase was declared, not just archived.** "Planning loop" had
grown to 1077 words — over half the file — because this session's
nine shipped items were accreting into the phase that preceded them.
They are now `## Phase: Epic burn-down (2026-08-27)`, with Planning
loop left holding what came before. ARCH-RETENTION made phases the
load-bearing sequence unit this morning, so letting one phase absorb
a distinct arc would have made the next prune choose between
splitting a phase (forbidden) and archiving a live one.

**Two prunes in one session is the mode working, not failing.**
`epic.md` predicted exactly this and says to interleave; the ticket
that became it predicted a mid-run trip from theory. Both prunes
were needed, both were cheap, and neither blocked an item.

**Alternatives:** archive a slice of Planning loop (rejected — that
is splitting a phase, which the retention shape forbids); prune
deeper to avoid a third pass (rejected — 70% is the policy, and
interleaving is the sanctioned answer).

## 2026-08-27 — REVIEW-SUITE: the field evidence changed the answer (4.15.0)

**Decision:** ship `pm_skills/prompts/findings.md` — verify a
review's findings against the source, ask what the review missed,
disposition the survivors — instead of the engineering-depth
dimension suite the ticket scoped.

**Why the answer changed.** The ticket assumed the gap was depth per
chunk: security, performance, dependencies, tests. The two consuming
projects whose review artefacts are filed in `self/field-reports/`
say otherwise. Both had already obtained a competent
multi-dimension review from an external tool — and **both then wrote
a critique of that review before acting on it**, unprompted. Route
Plotter produced a finding crosswalk mapping RP-01–RP-18 to
implemented work plus residual tickets; UoN Video Helper produced
two rounds of critique with source-verified R-01–R-16 verdicts.
Across them the critiques found: findings real but materially
over-rated, one already fixed and re-reported stale, six omitted
entirely, and a **prescribed remedy that would have introduced a
different defect** (blind zero-padding that would have triggered
macro-levelling on room tone).

Producing findings is commodity. Deciding which are true, and what
happens next, is not — and it is the half both projects had to build
by hand. That answers the ticket's own third question ("does the
framework's value become the triage half?") with evidence rather
than a guess: yes.

**On the evidence gate.** The ticket gated *distribution* on running
the suite against a consuming project, because "this repository has
no application to investigate deeply — the dimensions that matter
have nothing to bite on". That rationale is about **dimensions**,
and this ships none: the verification stage is source-agnostic and
its evidence is that two projects independently invented it. The
gate is met for the conclusion, not bypassed. What remains
unvalidated is the prompt's own wording in use — the next real
review round is that test, and it is stated in the entry rather than
implied.

**Assumptions at skipped gates (auto-jazz):** minor release, new
file; a separate prompt rather than a section in `review.md`,
because the findings it handles usually did not come from
`review.md`.

**Alternatives:** the nine-dimension suite as scoped (rejected —
harnesses already do dimensions well, a prose curriculum does them
badly, and the evidence says that was never the gap); a dedicated
`audit.md` (rejected — CODEBASE-AUDIT already ships the outer loop
and deferred this file for want of evidence that the recipe
under-specified; the evidence that arrived pointed elsewhere).

## 2026-08-27 — READ-ONLY-AUDIT: the no-write posture ships (4.14.0)

**Decision:** ship `pm_skills/prompts/read-only.md` as a **posture**
workflows declare, not a seventh entry in `task.md`'s modes table
and not a fourth deep verb. Every mode in that table is a way of
making a change; this one never writes, so it belongs beside the
workflows rather than inside their mode list. The 2026-08-27
Re-assess had already settled the family this way — READ-ONLY-AUDIT
is *how to run either safely*, a dependency of REVIEW-SUITE and
ABSTRACTION-PLAN rather than their competitor.

**The autonomy question, answered rather than dodged.** A gateless
single-pass run cuts against a gated framework, and the ticket
flagged it as a real tension. The exemption is narrow and stated in
the file: gates exist to stop irreversible change, and this posture
cannot make any, so a pass that provably writes nothing does not
need permission to look. Crucially the exemption **does not travel**
— the moment a workflow inside the posture wants to change
something, the posture ends and normal gates apply to that change.
This is the same line JANITOR-READ drew (read-only forever; writing
verbs separately gated) and the same one EPIC-AUTOJAZZ drew this
morning between delegation and automation.

**Three things worth the file's existence:**

1. **The leak is the report itself.** A read-only pass that writes
   its findings into the tree has broken its own contract, and that
   is the commonest way it happens. Report goes outside the tree.
2. **Builds and tests are the risk, not edits.** They emit coverage,
   caches, snapshots as a matter of course. Redirect, else run on a
   disposable copy, else **do not run it** and record the gap.
3. **Never repair an integrity failure.** If the tree changed, that
   is the finding; deleting the stray file destroys the only
   evidence — and it may not even have been this run.

**Assumptions at skipped gates (auto-jazz):** minor release, new
file, nothing overwritten; `review.md` and spike mode each gain one
sentence pointing at it rather than restating the contract.

**Alternatives:** a seventh `task.md` mode (rejected — that table is
implementation modes); a full read-only *verb* with its own review
curriculum (rejected — that is REVIEW-SUITE and ABSTRACTION-PLAN,
and the family settlement says this is the shared mode they run
inside).

**Left open:** the posture is untested. This repository has no
application to investigate deeply — Markdown and lint tooling, no
runtime. A real consuming project is the test, as its ticket said.

## 2026-08-27 — UPGRADE-REFUSED: make reinstall safe, not argue against it (4.13.0)

**Decision:** `upgrade.md` gains a **Reinstall path** section rather
than the framework trying harder to get projects to walk the
procedure. Three deployments, three reinstalls, one explicit
refusal — persuasion has failed 3/3, and making the observed
behaviour safe had not been tried.

**The measurement decided it, not the field reports.** The reports
give a weak claim (one maintainer, one window, one machine — said so
at intake). The fixture gives a mechanical one that holds for
anyone. On pm-skills 4.7.0 with populated memory:

- `cp -R` new over old → populated `brief.md` and `decision-log.md`
  **silently replaced by the blank templates**. No error, no prompt.
- `rm -rf pm_skills` then copy → that, **plus** `project/tickets/`
  and `project/archive/` deleted outright.
- Replace everything except `pm_skills/project/` → all preserved,
  and files added since (field-report.md, epic.md) simply arrive.

Both failing methods break the rule `upgrade.md` already states and
the `project-memory` class MANIFEST exists to enforce.

**The uncomfortable finding:** the field reports say the two
reinstalls preserved memory, and that is true — because the clobber
showed in `git status` and somebody looked. Reinstall's field safety
record is code review's record, not the method's. A project outside
version control loses its memory and finds out later.

**What this settles about the release tax.** The Upgrade-actions
block is justified, but not as the input to a walk nobody runs: it
is the record of which **root-template and memory-template** sections
changed, which is exactly what copying cannot infer. That is also
the only part reinstall leaves undone, so the walk after a reinstall
shrinks to Steps 7–8 for the entries in the gap.

**Verified, not asserted:** the published recipe was run verbatim
from the section text against the same fixture and preserved every
project-owned file.

**Assumptions at skipped gates (auto-jazz):** minor release (new
section, backward compatible, no new files); analysis filed to
`self/evaluations/2026-08-27-upgrade-refused.md` per the ticket's
own constraint, citing the reports rather than restating them.

**Alternatives:** deprecate `upgrade.md` in favour of reinstall
(rejected — reinstall cannot merge root templates or delete removed
files, and a major bump needs both); leave the procedure alone and
treat the refusals as user error (rejected — 3/3 is a design signal,
not three mistakes).

**Left open:** *why* Route Plotter refused. The decision is
recorded, the reasoning is not; it needs the maintainer or the
session log in the local lane.

## Archived: 2026-08-27 — see archive/decision-log-2026-08f.md

## Archived: 2026-08-23 → 2026-08-27 — see archive/decision-log-2026-08e.md

## Archived: 2026-08-17 → 2026-08-23 — see archive/decision-log-2026-08d.md

## Archived: 2026-08-17 — see archive/decision-log-2026-08c.md

## Archived: 2026-08-09 → 2026-08-17 — see archive/decision-log-2026-08b.md

## Archived: 2026-08-08 → 2026-08-09 — see archive/decision-log-2026-08a.md

## Archived: 2026-07-16 → 2026-07-17 — see archive/decision-log-2026-07.md
