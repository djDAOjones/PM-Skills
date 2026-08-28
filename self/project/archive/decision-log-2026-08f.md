# Decision log archive — 2026-08-27

<!-- Cold tier: grep only, never auto-read. Append-only, verbatim.
  Ranges across the August chunks overlap: the INDEX row's item IDs,
  not the dates, locate an entry (pm_skills/memory-policy.md ->
  "Retention shape"). -->

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
