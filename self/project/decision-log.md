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

## 2026-08-27 — Mid-run Prune, and the P4 trap it exposed (4.12.1)

**Decision:** the decision log hit 20/20 between items, so a Prune
ran **before** the next pick rather than at a close — the interleave
`epic.md` had just been written to require. 20 → 14 live entries;
six moved to `archive/decision-log-2026-08d.md` (2026-08-17 →
2026-08-23), losslessly: both slices proved byte-identical against
the committed original, 745 = 745 lines.

**The trap:** the archived tail slice carried the live file's own
`## Archived:` index lines with it, because those lines sit at the
foot of the live file — exactly where the tail begins. The live log
silently lost its pointer to `decision-log-2026-08c.md`, which is
the one thing that makes a cold archive findable at all. P4 said to
write an index entry "for each archive file" but never said the
existing ones are inside the slice being moved. Fixed in the prompt
and shipped as 4.12.1.

**Second confirmation of the ID join key.** This chunk's range
(2026-08-17 → 2026-08-23) **overlaps** `08c`'s (2026-08-17), because
August is sub-split by date. That is the second time in one day that
a date range failed to locate an entry and the INDEX row's item IDs
did — the first was 08c itself. ARCH-RETENTION's rule (1) is
earning its place faster than it was written.

**Rationale for pruning between items rather than at close:** a
long run writes an entry per item, so a log at budget guarantees the
next close trips it. Pruning at the trip point rather than after it
keeps every close inside budget instead of one behind.

**Alternatives:** carry on and prune at the next close (rejected —
the budget was already at the line, not near it); prune deeper than
the 70% target for extra headroom (rejected — the target is the
policy, and interleaving is now the sanctioned answer to running
out).

## 2026-08-27 — EPIC-AUTOJAZZ: continuous burn-down ships as its own integration (4.12.0)

**Decision:** ship `pm_skills/integrations/epic.md` — its own
integration composing `next.md` per item, **not** a mode inside
`next.md`. Putting it inside would weaken that file's own guarantee
("never burns down the whole backlog unattended") in the same file
that makes it; keeping it separate is the pattern `dispatch.md`
already set, and `next.md` gains a pointer, not a caveat.

**The reversal's whole basis: invoked, never scheduled.** The
investigation's hardest question was blanket versus graduated
authorisation, and the answer is that neither framing fits.
JANITOR-WRITE holds that a blanket sign-off opens no gate, and
Re-assess says automation may surface that a pass is due but never
run one — yet this run legitimately ran Prune, Refactor and
Re-assess under a single maintainer instruction. The line is not
how broad the sign-off is; it is whether a person asked, in this
session, now. Delegation licences the verbs; automation does not.
`epic.md` states that as its admissibility rule and says plainly
that the reversal does not survive being put behind a timer.

**Written from the exercise, not from theory.** This session ran the
mode before the file existed, and three rules exist because it hit
them:

1. **Budgets are checked before the first pick.** Two were already
   over when the run began (trajectory 2116/2000, log 21/20), so the
   run's first act was a Prune. The ticket predicted a mid-run trip;
   the reality was worse — it had already happened.
2. **The staged-set echo is a stop, not a print.** `git add -A self`
   swept eight files from a concurrent Codex session into a commit.
   The echo caught it — but after the commit, because echo and
   commit ran in one shell pipeline. Backed out with a soft reset
   and re-committed on explicit paths.
3. **"Minor milestone" means the backlog's milestones** — not
   init-mvp bands, not trajectory phases. Chosen at the run's start
   and it held; the table needs one vocabulary.

**Also decided:** stop conditions are six, and two are new to this
file — a `[sign-off]` item reaching the front (it needs a person, so
the burn-down ends there rather than running it gateless), and the
same failure twice (systemic, not two incidents).

**Assumptions at skipped gates (auto-jazz):** minor release, new
file, nothing overwritten; BACKLOG-TABLE sequenced first as its own
ticket instructed, so `epic.md` states the table's columns and
defers to a project's generated view rather than reimplementing one.

**Alternatives:** a mode flag inside `next.md` (rejected — it would
contradict that file's stated scope where the scope is stated);
graduated authorisation on the JANITOR-WRITE ladder (rejected — the
ladder gates automation, and this is not automation; conflating them
would either block a delegated run or licence a scheduled one).

## 2026-08-27 — BACKLOG-TABLE: a second renderer, source-only for now

**Decision:** build `scripts/gen-roadmap.mjs` → tracked
`self/project/roadmap.md`, gate-checked as `lint:roadmap`. Answers to
the ticket's five questions, each with the reason that decided it:

- **Shape 2, a separate file** — not a table at the top of
  `backlog.md`. The backlog is a hot sectional read, so a wide table
  there bills agent context every session for a purely human benefit;
  the agent already reads the records perfectly well.
- **Tracked, and gate-clean rather than gate-exempt.** The janitor
  report's precedent (generated, gitignored, exempt in four configs)
  is wrong here: a shareable snapshot must survive a clone and be
  visible on the forge. The only lint-hostile element is `<details>`
  (MD033), so the generator emits `<!-- markdownlint-disable MD033 -->`
  as the file's first line — an inline, one-file disable rather than
  a lint-config change and its `check:clone` obligation.
- **Phases are declared, not derived** — they are the trajectory's own
  level-2 headings, which ARCH-RETENTION made the load-bearing
  sequence unit hours earlier. Archived phases are listed from
  `archive/INDEX.md` rows **without opening the cold chunks**, which
  is precisely what that INDEX row contract (range, count, IDs, file)
  was specified for. The history side of this item cost almost
  nothing because that shape already existed.
- **Columns: ID, Name, Milestone, Description, Status** — the set the
  maintainer asked for and this session rendered by hand twice before
  the generator existed. Nothing added.
- **Process, not product.** Held source-only until this repo has
  actually used it; distributing it now would double the maintenance
  under the deliberate-fork rule for a shape with no usage evidence.
  Parked on the wish-list for promotion once it has earned it.

**Rationale:** the whole item is cheap because the data model already
existed — records for the open side, declared phases plus INDEX rows
for the history side. What needed deciding was where the output lives
and what it costs the hot read, and both answers fell out of "the
backlog view is for the agent, this one is for a person".

**Assumptions at skipped gates (auto-jazz):** source-only, so no
release; `package.json` counts as gate config, so `check:clone` was
run against the committed state (see the closing report).

**Alternatives:** a table inside `backlog.md` (rejected — hot-read
cost, and MD033 would need a config exception); gitignored like the
janitor report (rejected — not shareable, not in the versioned
backup); phases derived from release minors (rejected — declared
phases already exist and are now contractual).

## 2026-08-27 — FIELD-EXPORT: the harvest procedure ships as a prompt (4.11.0)

**Decision:** ship `pm_skills/prompts/field-report.md` — a prompt, not
a script, and part of the product rather than maintainer tooling.
Both answers rest on the same mechanical fact: the work runs **inside**
the consuming project, so the instructions have to be there. A
maintainer-side generator cannot reach into a project it does not
have, and the mechanical parts (inventories, git-log formatting,
redaction) are shell one-liners the agent composes — no generator,
so `pm_skills/` gains no code outside the two scaffold scripts.

**Rationale:** the ticket's honest objection — consuming projects gain
little from reporting on themselves — is true and is now stated in
the prompt's own first paragraph, rather than papered over with an
invented local benefit. A project that knows it is reporting upstream
runs the thing correctly; one told it is for its own good will skip
the analysis note. That skip is not hypothetical: the first hand pass
made the note optional and omitted it.

**What the two hand passes fixed in the shape:** the analysis note is
mandatory; redaction is reported as counts, not as the word
"redacted"; the lane is decided per file by what is already public
upstream, not by how private the project feels; and
upgraded-or-reinstalled is called out as the most useful line and the
one most often missing — all three deployments on record reinstalled
(see UPGRADE-REFUSED, still open).

**Output location:** a sibling directory outside the project, with a
leave-nothing-behind check that pastes `git status --porcelain` from
before and after. The first hand pass left artefacts inside the
harvested project that had to be moved out by hand; that is the
failure the check exists for.

**Assumptions at skipped gates (auto-jazz):** minor release (new
file, backward compatible, nothing overwritten); MANIFEST needed no
row since `pm_skills/prompts/*` already globs to `framework`.

**Alternatives:** a scaffold script (rejected — the judgement steps,
lane and note, are the parts that failed by hand, and a script cannot
make them); maintainer-only tooling in `scripts/` (rejected — it
cannot run where the evidence is).

## 2026-08-27 — Refactor: the queue after the Current milestone cleared

**Decision:** structural repair of the backlog after ARCH-RETENTION
and SCAFFOLD-GITPATH shipped, applied directly under the
maintainer's delegated continuous run (Re-assess RA3's gateless
clause). Assessed 13 / promoted 3 / re-ordered 9 / cut 0. No
done-work, duplicates, stale sections, or orphan tickets were found
— the two faults were both about **readability of the queue**:

1. **Current's only remaining item was blocked.** VOICE-INTAKE has
   been held on maintainer inputs since 2026-08-18, so the head of
   the queue could not be started. FIELD-EXPORT promoted from Next above
   it; VOICE-INTAKE unchanged behind it.
2. **The Icebox interleaved workable and held items,** so the order
   things unblock in was not readable — the exact R2 finding.
   Re-ordered: workable first (UPGRADE-REFUSED, then the read-only
   family in its SETTLED dependency order), held below in
   unblock order.

**Refill (a Re-assess judgement, recorded as such):** BACKLOG-TABLE
and EPIC-AUTOJAZZ promoted Icebox → Next, in that order, on
EPIC-AUTOJAZZ's own instruction that BACKLOG-TABLE is sequenced
first "or this reimplements it". The maintainer's instruction was to
burn down the whole backlog, so refilling the working milestones
from the Icebox is the asked-for work, not scope creep.

**Rationale:** Refactor repairs structure and stops; the promotions
are substance and belong to Re-assess. Both ran in one pass because
the milestone close is the moment the map and the judgement are both
stale, and separating them here would have meant two entries
describing one decision.

**Alternatives:** leave Current holding only VOICE-INTAKE (rejected
— session-start would fall through to Next every pick, and the
milestone would be a fiction); refill Next from the wish-list
(rejected — its one open item, NEXT-FRAGMENTS, is routed to the
lab's queue, and LAB-FIRST is paused).

## 2026-08-27 — SCAFFOLD-GITPATH: the fix crosses the fork (4.10.1)

**Decision:** port GATE-PARITY's resolution model into
`pm_skills/scaffold/check-links.mjs` — `gitPaths()` +
`resolvesInRepo()` replace the `existsSync` call — as a targeted
port, not a merge of the source fork. Released patch, with an
**advisory** upgrade action: `scaffold` class is copied once at init
and never touched on upgrade, so no consuming project's copy is
replaced and the changelog says how to adopt it by hand.

**Rationale:** the deliberate-fork rule (`CONTRIBUTING.md`) requires
a bug fixed in one copy to be considered for the other; this one was
considered on 2026-08-24, deferred with a stated reason (the change
is distributed, so a release, while LAB-FIRST held the queue), and
the reason expired when the maintainer paused LAB-FIRST. Every
project scaffolded since inherited the gap, and it fails in the
least useful direction — green locally, red in CI, on references
the author cannot see are broken.

**Assumption at skipped gates (auto-jazz):** patch, not minor — a
behaviour fix to a shipped file, no new files, no migration.

**Verified on a throwaway fixture**, not by inspection: a repo with
`generated/` gitignored and a link to `generated/latest.md`. The
shipped (HEAD) scaffold reported 0 broken links and exited 0 — the
defect reproduced; the patched copy reported the link broken and
exited 1. Positives re-checked in the same fixture: a tracked file, an
untracked-but-not-ignored new file, and a directory target all still
resolve.

**Alternatives:** import the source fork wholesale (rejected — the
scaffold copy is deliberately simpler and generic; the ticket asked
for the resolution, not the file); leave it to the next scaffold
consumer to hit (rejected — that is the failure mode being fixed).

## 2026-08-27 — ARCH-RETENTION: the archive gains a retention shape (4.10.0)

**Decision:** four forward-only rules in
`pm_skills/memory-policy.md` -> "Retention shape" decide what the
archive must preserve, and the due Prune was run against them
rather than before them. (1) The item ID is the join key, so every
`archive/INDEX.md` row lists the IDs its chunk holds. (2) Chunks
break on whole sequence units — epochs for the decision log, whole
**phases** for the trajectory, never a split phase. (3) INDEX rows
carry range + count + IDs + file, enough to choose a chunk without
opening it. (4) A reversal is marked **forward**, by the
overturning entry carrying `Supersedes:`, because append-only means
the superseded entry can never be edited to say so. Analysis stays
a practice, not a verb.

**Rationale:** the ticket's own warning was that the first
`archive/trajectory/` run would set the shape by accident, and that
run was the next one — trajectory stood at 2116/2000 with the
directory never created in three months of self-hosting. Deciding
during the prune is how a default becomes a contract nobody chose.
Prose over records for archived decisions: converting the log would
mean rewriting append-only history for a use nobody has yet
reported, where the ID join key gets most of the benefit for none of
the cost. ARCH-RECALL (recall) stays blocked on evidence; this is
retention only, and poor retention would have capped it.

**Assumptions at skipped gates (auto-jazz):** smallest useful scope
— contract into the file that already owns the archive rows, no new
verb, no back-fill of existing INDEX rows; prose + explicit join key
over a records conversion.

**Exercised, not just specified.** The Prune that followed found the
first real ambiguity: `## Source-only fixes` was an undated
catch-all spanning 2026-07-16 → 2026-08-17, wedged between two July
phases — not a sequence unit, so rule (2) could not chunk it. It was
dissolved into the sequence first (August items to a live phase, the
one July item into the July slice), then the cut was taken on the
epoch boundary. Trajectory 2116 → 1392 words (chunk 0001,
2026-04-12 → 2026-07-17, 24 IDs); decision log 21 → 14 live entries
(`decision-log-2026-08c.md`, 7 entries, all 2026-08-17 — which is
also split across 08b and the live log, so its INDEX **IDs**, not
its date range, are what locate an entry: rule (1) earning its
place on its first use).

**Alternatives:** let the first prune set the shape (rejected — the
ticket exists because that is the failure); records-ify the decision
log (rejected — rewrites append-only history, no reported demand);
add an analysis verb (rejected — same evidence bar ARCH-RECALL sits
behind, and nothing has reported an analysis it could not perform).

## 2026-08-27 — Re-assess: queue refilled after the LAB-FIRST pause

**Decision:** first Re-assess since the maintainer paused LAB-FIRST.
Assessed 15 records: 3 promoted, 5 refreshed, 4 holds confirmed
unchanged, 0 cut, and the read-only family settled. Signed off by the
maintainer before applying.

**Promoted to Current.** **ARCH-RETENTION** leads because its trigger
genuinely fired: the trajectory is over budget at 2116/2000 words and
`archive/trajectory/` has never been created in this repository, so
the next Prune creates it. The ticket's own warning was that the first
run "defines the shape by accident unless decided first" — that run is
now the next one, which makes this the rare queue item with a real
deadline. **SCAFFOLD-GITPATH**, promoted from the wish-list: the
shipped `pm_skills/scaffold/check-links.mjs` still resolves link
targets with `existsSync` (verified at line 102), so every scaffolded
project inherits the local-passes/CI-fails gap GATE-PARITY closed
here on 2026-08-24. Its recorded hold was "not taken with GATE-PARITY
while LAB-FIRST holds the canon queue" — a reason that expired the
same day the pause landed. Distributed, so a release when taken.
VOICE-INTAKE drops to last in Current: still blocked, and a blocked
item at the top of a milestone misreads as the next pick.

**Promoted to Next.** **FIELD-EXPORT**, on the strongest evidence a
proposed verb can have — performed by hand twice in one day during
FIELD-HARVEST, once manually and once by an agent following a written
prompt. Its open question is ownership, not feasibility: consuming
projects gain little from reporting on themselves.

**The read-only family is settled**, after three passes carrying it as
"one unsettled family — do not build all three". Adopted the division
READ-ONLY-AUDIT had already proposed: REVIEW-SUITE is *what is wrong*,
ABSTRACTION-PLAN is *what to change*, and READ-ONLY-AUDIT is the
shared no-write **mode** both would run inside — a dependency of the
other two, not a competitor. Nothing merged, nothing cut; the overlap
was in the framing, not the content. Deferring it a fourth time was
the alternative and was rejected: the question had stopped generating
new information.

**Refreshed, not promoted.** REVIEW-SUITE's evidence gate named "the
university video-helper app once the lab's R2 arc reaches it" — R2
will not reach it, so the wording was replaced with the field-report
evidence now filed, which meets the gate's substance more easily than
its old wording did. PM-MCP's distribution leg has **fired**: it asked
for more than one consuming project and three are now on record, so
the hold stands on its prototype leg alone, which is lab work.
EPIC-AUTOJAZZ, filed hours earlier, quoted the trajectory at 1987/2000
and the log at 18/20 as a *risk of running long*; both were breached
the same day by ordinary single-item work, so its central risk is
realised rather than hypothetical. Four tickets carried stale
"LAB-FIRST gates the pick" status lines and were cleared.

**Holds confirmed, deliberately not re-stamped** (this entry carries
the batch date, so unchanged records stay diff-quiet): DATA-MIG (42 d,
age-by-design per ITEM-AGE; both new consuming projects are
browser-only, so its trigger is unfired), ARCH-RECALL and
JANITOR-WRITE. For the next pass: ARCH-RECALL waits on a project
reporting missed-precedent pain, and the session logs that would
evidence it are now filed and unread — the hold stands because nobody
has looked, not because the evidence is absent.

**Consequence:** the decision log now stands at 21 live entries
against a budget of 20, and the trajectory remains over. A Prune is
due — but it should wait for ARCH-RETENTION, which exists precisely
to decide the archive shape that Prune would otherwise set by
accident.

## Archived: 2026-08-23 → 2026-08-27 — see archive/decision-log-2026-08e.md

## Archived: 2026-08-17 → 2026-08-23 — see archive/decision-log-2026-08d.md

## Archived: 2026-08-17 — see archive/decision-log-2026-08c.md

## Archived: 2026-08-09 → 2026-08-17 — see archive/decision-log-2026-08b.md

## Archived: 2026-08-08 → 2026-08-09 — see archive/decision-log-2026-08a.md

## Archived: 2026-07-16 → 2026-07-17 — see archive/decision-log-2026-07.md
