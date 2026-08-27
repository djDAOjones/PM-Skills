# Decision Log — pm-skills framework repository

<!-- Append new decisions at the top. Don't edit old entries. -->
<!-- Hot sectional: agents scan the latest 10 headings, open only
     relevant bodies. Keep entries tight: Decision / Rationale /
     Alternatives. -->

<!-- Older entries are archived: 2026-08-17→23, 2026-08-17,
     2026-08-09→17, 2026-08-08→09, and 2026-07 — ranges OVERLAP, so
     see archive/INDEX.md for the item IDs, not just the ranges
     AND item IDs. Grep the archive files directly; never re-inline
     them. Reversing a decision? Mark it forward with a
     `Supersedes:` line (memory-policy -> "Retention shape"). -->

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

## 2026-08-27 — LAB-FIRST paused; UPGRADE-REFUSED filed

**Decision:** the maintainer paused the LAB-FIRST standing order
until further notice. The `ALERT` flag is withdrawn and the record
moves to the Icebox, so it no longer gates the queue and canon work
may be picked normally. Nothing in the order is retracted — it
resumes intact on the maintainer's word, and only the maintainer
resumes or clears it. In the same pass, `UPGRADE-REFUSED` was filed
to the Icebox from the FIELD-HARVEST evidence.

**Rationale:** the order was written on 2026-08-23 to stop canon
changes widening the delta the lab had to absorb. That reason has
largely expired: UPSTREAM-ASSIM shipped on 2026-08-24 and the lab is
merged to 4.9.2. The R2 leg it also protected has not run and cannot
run on its intended subject — the University of Nottingham
video-helper app was built on canon 4.9.2, not pm-next (FIELD-HARVEST,
same day), so it is a second incumbent run and is spent as an R2
subject. Holding the whole canon queue behind a leg that now needs a
project nobody has picked was costing more than it protected.

**Consequences:** Current holds only VOICE-INTAKE, still blocked on
its maintainer inputs, so **nothing in Current is runnable** and a
Re-assess is due to refill it from an Icebox that has grown to ten
items — three of which (REVIEW-SUITE, ABSTRACTION-PLAN,
READ-ONLY-AUDIT) remain one unsettled family. The lab's own memory
still records the video-helper as R2's planned subject; correcting it
is lab-side work and is not done here.

**On UPGRADE-REFUSED:** three deployments on record and none reached
its current version by walking `upgrade.md`; Route Plotter declined
4.9.2 outright and said so in its decision log. The declarative
upgrade machinery — MANIFEST classes, the CHANGELOG Upgrade actions
every release must carry, `upgrade.md` itself — is untested in the
field, which is not the same as broken, and the ticket says so. Filed
as an investigation, not a verdict: all three deployments share one
maintainer in one eight-week window, which is strong evidence about
this user and weak evidence about consuming projects generally.

**Alternatives:** clearing LAB-FIRST outright — rejected, the
maintainer said pause, and the order's content still stands for
whenever the lab arc resumes. Filing an `R2-ARM-CHECK` ticket here —
rejected, R2 is lab work and does not belong in the canon backlog;
the finding is recorded in this log and in the paused ticket instead.

## 2026-08-27 — FIELD-HARVEST: two applied projects filed as evidence

**Decision:** harvested Route Plotter v3 and UoN Video Helper into
`self/field-reports/` — eleven tracked reports (deployment-snapshot
notes, project memory with byte inventories, rulebooks, full git logs,
review artefacts, and the Video Helper's preserved init prompt) plus
23 raw Claude Code session logs in the local lane. Both source
repositories are public and carry `pm_skills/project/` tracked, so the
memory and rulebook material is filed in the tracked lane: copying it
here discloses nothing that is not already published. Only the session
logs go to `local/`, because those have never been published and
cannot be made public by mechanical redaction. Absolute checkout paths
were collapsed to `<checkout>`/`<home>` on filing; the one third-party
personal name — the primary user named in Route Plotter's `brief.md` —
was left as written and flagged in that export's header, because it is
already public upstream and cutting it would misrepresent how the
brief template is used in practice. Taken on the maintainer's direct
pick, which cleared the LAB-FIRST gate as GATE-PARITY did on
2026-08-24. No backlog item shipped; nothing removed from the backlog.

**Rationale:** two live deployments running the framework daily in the
same week, one of them recorded from install onwards, is the strongest
usage evidence this tier has held — and `self/REFLECTION.md` →
"Evidence gate" weights consuming-project evidence above self-hosted
material. It was also perishable: both projects pruned memory during
the harvest itself, and Route Plotter's live decision log shrank from
roughly 130 KB to 35 KB while the export was being taken. The exports
therefore record working-tree state with the diff from HEAD attached,
rather than claiming a clean snapshot.

**What the evidence says**, recorded here as a starting point rather
than a conclusion — the analysis belongs in `self/evaluations/`:

- Three deployments are now on record (Derry Lane, Route Plotter, UoN
  Video Helper) and none reached its current version by walking
  `pm_skills/prompts/upgrade.md`. Route Plotter is the sharp case: its
  decision log records the owner choosing to "stay on PM-Skills 4.7.0
  (upstream is 4.9.2 — skipped, not merely deferred)". The declarative
  upgrade contract — MANIFEST classes, CHANGELOG Upgrade actions — is
  built on a procedure no consuming project has yet used.
- UoN Video Helper is **not** the lab arm it has been treated as. It
  is sourced from the PM-Skills-lab fork but runs canon 4.9.2 content;
  no `pm-next` artefact exists anywhere in the tree, and one README
  link is the only mention of the lab. This bears directly on
  LAB-FIRST's R2 parallel-run: on this evidence the two-arm test has
  not started.
- Two independent projects have written cloud-sync defences into their
  rulebooks, confirming from the field the constraint the brief
  already names.

**Alternatives:** filing everything local-only, as Derry Lane was —
rejected, because it would hide already-public material behind a lane
meant for genuinely private evidence, and would stop a public
evaluation citing them at all. Waiting for a quiescent moment in
both projects — rejected, because both are in daily flux and the
prune that ran mid-harvest is itself evidence worth holding.

## 2026-08-24 — GATE-PARITY: the gate resolves against Git, not the filesystem

**Decision:** `scripts/check-docs.mjs` resolves link targets and
backticked paths against the set of paths Git knows about — tracked
files, non-ignored new files, and their ancestor directories — rather
than calling `existsSync`. Its `IGNORE` list stays as the single
deliberate exception and is documented as prose-only: a link gets no
escape hatch, because CI cannot follow one. A new `npm run check:clone`
(`scripts/check-clone.mjs`) runs the whole gate against a fresh clone
of HEAD. Source-only; shipped on the maintainer's direct pick, which
cleared the record's own trigger and the LAB-FIRST gate.

**Rationale:** the root contract calls the gate "CI-mirrored" and it
was not. CI lints a fresh clone; a working checkout also carries
gitignored generated files, so a filesystem check passed here on
references CI could not resolve. Twice — GATE-FRESH (`node_modules/`)
and GATE-REPORTS (the janitor report), the latter red for ten pushes
over six days behind a green local gate. Both were repaired by adding
a pattern to `IGNORE` after the fact, which fixes the instance and
leaves the class. Resolution was already half git-faithful: sources
come from `git ls-files`, and every other gate tool honours
`.gitignore`. Making the target side agree closes the class at its
source, costs nothing at runtime, needs no clone, and — being
exact-case — also stops a case-only reference passing on a
case-insensitive macOS volume and failing on Linux.

**Alternatives:** the ticket's three options. A clone-based check
alone (rejected as the primary — opt-in, so it cannot stop the
divergence being introduced; kept as the secondary `check:clone`,
which is worth having because it covers classes the docs check cannot
model). A CI step asserting parity (rejected — CI already *is* the
fresh clone; once local resolution is faithful, a red CI run means a
real fault). A notification on a red default-branch run (rejected as a
fix — it shortens the feedback loop but leaves the gate lying about
being mirrored; still worth enabling as a repo setting).

## 2026-08-24 — GATE-REPORTS: check-docs ignores the generated janitor report

**Decision:** `scripts/check-docs.mjs` adds a
`self/project/reports/` pattern to its `IGNORE` list, so a
backticked reference to the janitor report is never counted as a
missing path. Source-only; taken under the LAB-FIRST gate-forced
maintenance exception.

**Rationale:** the report is generated and gitignored
(REPORTS-IGNORE, 2026-08-17), so the root contract's pointer to it
resolved on a working checkout and failed in every fresh clone. The
CI Lint job went red on 2026-08-18 and stayed red for ten pushes
while `npm run check` was green locally, leaving a failing badge at
the top of the README. Every other gate tool already excluded the
path — markdownlint, cspell, editorconfig-checker, and check-docs'
own `FILE_EXCLUDE` — only the target-side `IGNORE` list had missed
it. Same repair GATE-FRESH (2026-08-08) made for `node_modules/`.

**Alternatives:** track a placeholder report (rejected —
contradicts REPORTS-IGNORE and is overwritten every session); drop
the path from the contract's prose (rejected — the pointer is the
contract for a documented verb); ignore a generic `reports/`
segment anywhere (rejected — would mask real rot elsewhere).

## 2026-08-23 — LAB-FIRST: the lab arc gates this repo's queue

**Decision:** Maintainer standing order queued as an ALERT record
at the top of Current (LAB-FIRST, order 0; custom `ALERT` flag
registered via the 4.8.0 `_meta.md` dialect key): no new canon
work before the lab arc — UPSTREAM-ASSIM (queued lab-side the
same day, lab commit `437fed6`), then R2 parallel-run preparation
for the two-arm test on the next real project. Exceptions:
gate-forced maintenance, and upstream work the lab arc itself
requests. Only the maintainer clears the record.

**Rationale:** the R2 comparison needs the incumbent at its
current best *as merged by the lab*; canon commits made before
the assimilation widen the delta and stale the survey hints on
the lab's ticket. The hot Active view is the surface session
start actually reads, so the order lives there, not in
assistant-side memory alone.

**Alternatives:** memory-only note (rejected — not a framework
surface, and other harnesses would never see it); blocking
VOICE-INTAKE explicitly (unnecessary — already blocked on its
maintainer inputs).

## 2026-08-23 — FIELD-REPORTS: local-only lane for evidence that cannot be public

**Decision:** The first real field report — a 343 KB primary-source
export from the Derry Lane Development System (private by design:
household property matters and a third party's attributed views,
verbatim) — is kept local-only: `self/field-reports/<slug>/local/`
is gitignored by one tracked rule, the project directory stays
tracked with a `.gitkeep`, the Projects row says which lane the
evidence uses, and the README gains an `export` type for raw dumps.
Maintainer decision 2026-08-23, on the recommendation.

**Rationale:** the tier lives in a public repo and a push is
permanent (forks, caches, indexers); mechanical redaction removed
IDs and emails but cannot remove the household content the
framework-usage evidence is inseparable from. Local-only keeps every
byte on the cloud-synced checkout for analysis and publishes
nothing; the redaction judgement moves to the public evaluation
that reads it. A per-project `local/` subdirectory scales without
further `.gitignore` edits and keeps public/private visible in the
path.

**Alternatives:** commit as-is (rejected — a third party's words in
a public repo, irreversibly); trim to memory files + git log
(rejected — the project *is* the household matter, so every section
carries it, and trimming destroys the primary evidence); gitignore
the whole project directory (rejected — per-project rule, and the
project vanishes from the tree).

## 2026-08-23 — FIELD-REPORTS: a cold tier for consuming-project evidence

**Decision:** Reports from projects that run pm-skills are filed
under `self/field-reports/<project-slug>/YYYY-MM-DD-<type>.md` — a
new cold tier beside `self/evaluations/` and `self/_transcripts/`,
source-only, tracked, lint-exempt per project directory with one
gated README as the canonical description (what is filed, the type
list, the header contract with a `pm-skills=` join key, the public-
repo redaction rule). Wired into all six exclusion points and the
root `AGENTS.md` cold tier; `digital-art-audience-hub` is the first
project directory. The Hub case study stays in the frozen archive
and is pointed at, not moved.

**Rationale:** `self/REFLECTION.md` already names consuming-project
reports as the evidence input that outweighs self-hosted material,
yet no tier held them — run one had to declare itself pure
self-hosted. Neither existing cold tier fits: evaluations are this
repo's analysis *outputs*, transcripts are its own session inputs;
exports from outside need their own home so a usage analysis can
group by project and read each report against the release in force.
Per-project directories keep the README gated while the verbatim
exports (foreign paths and spellings) stay out of the gate.

**Alternatives:** a `self/evaluations/projects/` subtree (rejected —
inherits exclusions for free but conflates input with output, which
the reflection's self-reference countermeasure needs kept apart);
flat dated files with a project prefix (rejected — no grouping for
cross-project analysis, and no way to gate a README); gitignore the
tier like the janitor report (rejected — evidence is kept, not
regenerated; the tracked checkout is the backup).

## Archived: 2026-08-17 → 2026-08-23 — see archive/decision-log-2026-08d.md

## Archived: 2026-08-17 — see archive/decision-log-2026-08c.md
