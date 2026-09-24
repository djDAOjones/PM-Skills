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

## 2026-09-24 — FIELD-HARVEST: the tier gets a standing harvest instrument, with Codex as second witness

**Decision:** source-only. The archival side of the field-report
tier is codified as `self/FIELD-HARVEST.md`, a sibling of
`self/FIELD-STUDY.md`: one run inventories every project the machine
can see, reads which framework and version each runs and how it got
there, judges each archive current, stale or unarchived against the
tier's own cut-offs, ranks the due work by Claude Code's thirty-day
retention, takes or refreshes the archive under the README's
contract, and verifies it. Three rules are new: discovery takes the
union of the harness stores (Claude Code, Codex live and archived,
Windsurf) and a background walk of the roots, never a foreground
walk; the Windsurf stores, opaque and un-attributable, are archived
once, in the local lane of the first harvested project that
Windsurf's own workspace list names, with attribution declared
unknown and cited from the rest; and Codex on `gpt-6-astra` gives an
independent opinion at three checkpoints (inventory, plan,
verification), disagreements resolved by evidence, a redacted
account of each exchange filed as this repository's transcript and
the verbatim originals kept in the unsynced run directory. Archival
only; analysis stays with the study or a prompt still to be devised.

The draft went through its own protocol before filing: Codex on
`gpt-6-astra` reviewed it blind against the machine and returned
seventeen findings with the verdict "not ready". Sixteen were
verified against the evidence and taken, two in modified form —
lossy Claude Code directory names, an unverified Windsurf retention
claim, name-based freshness that would miss a resumed session or
uncommitted memory, session tables mistaken for member lists,
`git status` taking optional locks, remote-only bundles dropping
never-pushed refs, no secrets scan of raw archives, verification before
staging, and a verbatim transcript of Codex's replies in a tracked
tier that could have republished local-lane evidence.

**Rationale:** the maintainer asked (2026-09-23) for a prompt that
inspects all visible projects, reads their pm-skills version and
brings the "real-world application archive" up to date — archival
only — with Codex Astra as a project partner. Writing it against the
live state showed why a standing instrument beats another one-off
wave: the Hub, the first deployment with six upgrade commits from
1.0.0 to 4.6.0, has never been harvested and its session records are
untracked files on one checkout; seven Windsurf-era canon
deployments (2.2.0 to 3.1.1) sit outside the tier and only a
filesystem walk finds them; seven pm-next v2 intakes have landed
since the 2026-09-16 baselines, so each of those archives is stale;
Codex's archived-sessions store was never read by any harvest; and
Route Plotter v3's Claude Code directory was already empty —
retention is a deadline, not a risk. Codex as a second witness
follows the 2026-08-28 precedent (the `-codex` bundles) and is
cheap: a smoke test answered in eight seconds.

**Alternatives:** a distributed harvest verb (rejected — it reads
`self/` and names this machine's stores; the distributed half stays
`field-report.md`); asking the maintainer per project (rejected —
the README already decides lanes and exclusions, and the task was
set as autonomous); a Claude sub-agent as the second reader
(rejected — a differential opinion needs a different model); filing
Codex's replies in the tier (rejected — evidence about a harvest,
not about a consuming project).

## 2026-09-16 — FIELD-BASELINE-WAVE-2: take two, keep three, one after the fact

**Decision:** of the six projects the maintainer listed as upgrading
to pm-next v2, two trajectories were taken now — `pattern-mapper`
before its history mapping, and `storage-tidy` whose intake had
already been committed, filed as the v0.2 run at its last commit plus
the intake as an `upgrade` report — one was completed with a delta
(`derry-lane-development-system`: sessions and agent memory, no
memory delta), one was taken after hydrating its cloud-only folder
(`marketing-skills`, with the intake in flight and the note saying
so), and two needed nothing (`ebay-tool`, whose 2026-09-09 harvest
still matches HEAD; the lab, which preserved its own pre-v2 ledger
and wrote its migration record). Pattern Mapper's memory, rulebooks
and git log go to the tracked lane because its repository is public;
its agent memory and prompts stay local.

**Rationale:** the assessment ranked by perishability and size.
Claude Code deletes transcripts thirty days after last activity by
default and Pattern Mapper's earliest logs are from July, so its 75
sessions were the most at risk and the most valuable — 216 commits of
canon 4.0.0 under one name and then another, the richest canon memory
on record, and the only upgrade walk the tier has ever seen, which
corrects field study two's "zero walks" count. Storage Tidy's
pre-state survived in git and in the intake's own `archive/pre-v2/`,
so it could be taken after the fact without loss. Marketing could not
be hashed until hydrated; hydration is a read, not a write, and it
also removed the intake's "content verification" blocker. Pattern
Mapper's `.git` holds 825 cloud-only objects, so its exports came
from a fresh clone of the public remote at the identical HEAD.

**Alternatives:** waiting for the intakes to finish and diffing
afterwards (rejected — the pre-state is what the intakes rewrite);
tracking Storage Tidy's or Marketing's exports (rejected — private);
raising the transcript-retention setting (left to the maintainer; it
is a global harness setting, and the archives now hold the logs).

## 2026-09-16 — FIELD-BASELINE-V2: a project files its baseline before the intake

**Decision:** the two projects the maintainer scheduled for pm-next
v2 on 2026-09-15 — `video-pedagogy-research` and `personal-finance`
— are filed in `self/field-reports/` now, before either intake runs,
as **pre-adoption baselines**: their history (a verified git bundle
where there is git, the release archives verbatim where there is
not), a hash inventory of every file, the contract and state files,
the maintainer's prompts, the agent's own memory and both harnesses'
session logs. Both projects are private, so everything sits in the
local lane except one snapshot note each, and the personal-finance
note carries no household figure. The tier README defines the
baseline and its join key, `pm-skills=none (pre-adoption baseline;
…)`.

**Rationale:** the maintainer asked for the history and trajectory
of these two projects to be archived "ahead of these being upgraded
to labs-v2" for later comparison. An intake rewrites what it reads —
the v2 verb reads existing docs and memory first and records what it
carried over in one decision — so the only way to measure its effect
is a snapshot taken before it, and the projects' own state-keeping
(a hand-kept "Current state" paragraph in one, three dated archives
in the other) is exactly what would be lost. The Codex thread that
produced the finance corpus ran from another project's folder, so
its rollouts were selected by parent-thread linkage rather than by
working directory, and the manifest says so.

**Alternatives:** waiting and diffing after the intake (rejected —
nothing preserves the pre-state once the intake has rewritten it);
filing only the git-backed project (rejected — the folder-shaped one
is the harder case for the intake and the more informative baseline);
archiving the copyrighted source corpus (rejected — third-party
material, text that can be regenerated, and not framework evidence).

## 2026-09-14 — DEFERRAL-LINE + CODEX-NETWORK-NOTE ship as one patch release (4.21.1)

**Decision:** both commissioned patches ship together as 4.21.1
rather than as 4.21.1 and 4.21.2. DEFERRAL-LINE puts the rule in
`end-of-task.md` step 3's wish-list bullet — the place the capture
actually happens — plus one sentence in the lite-close paragraph,
because lite skips step 3 and would otherwise miss the rule. The
template `AGENTS.md` capture bullet is left alone: it governs an
out-of-scope idea surfacing mid-task, not a deferral named in a
close artefact, so it does not restate the rule and the ticket's
conditional does not fire. CODEX-NETWORK-NOTE rewrites only item 7's
Codex line.

**Rationale:** the two changes touch disjoint files with no ordering
dependency, so the `order:` fields sequence the work, not the
releases. One entry carries two numbered upgrade actions, and
`upgrade.md` executes actions, not versions — a project that runs no
Codex harness skips action 2 and is no worse served than by a
separate version. Splitting would mint a 4.21.1 that exists for
minutes, cost every consuming project an extra version hop, and buy
a per-change traceability that git already provides. Canonical-copy
discipline decided both placements: one home per rule, pointers
elsewhere. The retirement sweep for the prefix-rule-as-control claim
found no other distributed hit — `init.md` Step 8 and Appendix B
point at the template rather than restating it. Claude Code's
`permissions.deny` Bash prefixes were left as they are: that is a
harness-enforced check, not a model-facing rules file, and its
network control (`network.allowedDomains` with `strictAllowlist`) is
already named correctly.

**Alternatives:** two patch releases (rejected above); putting the
deferral rule in step 5's report instead of step 3 (rejected — the
report describes what happened, the writes happen in step 3).

## 2026-09-13 — LONG-STREAM-EVIDENCE: two patches commissioned; the trim is the maintainer's call

**Decision (maintainer's plan, executed):** DEFERRAL-LINE and
CODEX-NETWORK-NOTE queued in the current milestone as patches. Not
queued: a minimal tier. The lab's long stream (120 sessions, Opus 5
and Codex GPT-5.6-Sol) found the eight-rule contract keeping the
record as well as canon over twelve items with maintenance
obligations; that licenses a trim, and shipping one is a product
decision recorded here as open for the maintainer.

**Rationale:** seven of ten open-list misses were a deferral named in
prose and never listed — a one-line fix in the close ritual; and the
harness-surface note shipped in 4.21.0 names a Codex prefix rule
among the closing settings when a compound command walked past it in
the study. Detail: the two tickets; lab findings 2026-09-10,
Amendment 4 results.

## 2026-09-12 — DOUBLE-SCORE: judged measures get a blind second scorer

**Decision:** source-only. `self/FIELD-STUDY.md` Phase 4 now
requires a blind second pass on any judged dimension — a fresh,
tool-less session with the rubric and the artefacts and no key —
with agreement reported, disagreements adjudicated by re-reading the
artefact, and single-scored judged grades capped at *Hypothesis*.

**Rationale:** in the clean-room ablation the blind scorer disagreed
on 6 of 48 cells and was right on 2; one changed a findings table
(the first pass missed a parked deferral in the minimal contract's
wish-list). A judged measure with one scorer is an opinion with a
number on it. The cost is one tool-less session per cell, once.

**Alternatives:** two full passes by tool-using sessions (rejected —
the second scorer's value is that it cannot go looking for what the
first pass found); majority of three (rejected — adjudication by
reading is cheaper and leaves a reason on the record).

## 2026-09-12 — HARNESS-ISOLATION-NOTE: reach out of the repo is a security-baseline item

**Decision:** shipped 4.21.0. The DEV-INFRASTRUCTURE template's
"Security baseline" gains item 7, harness surface — one line per
harness in use, what it exposes beyond the tree and the setting that
closes it, re-verified at each harness upgrade — seeded with the
clean-room hardening findings for Codex, Claude Code and Devin.

**Rationale:** the baseline covered secrets coming into the repo but
not the agent reaching out of it; the 2026-09-10 hardening found
Codex serving 126 account-connector tools (GitHub write, deploys)
by default, Claude Code's tool set moving between versions, Devin
ignoring tool-name denies for web tools, and all three reading
sibling checkouts. Minor, not patch: a new template section item
with new guidance. Facts are dated and marked "verify against your
version" because they will rot.

**Alternatives:** a hard rule in the AGENTS template (rejected —
the closing settings are harness- and version-specific, which is
DEV-INFRASTRUCTURE's register); a separate HARNESS.md (rejected —
one more every-task file for a paragraph of content).

## 2026-09-12 — READ-TIER-BEFORE-CHANGE: the read tier's letter matches its substance

**Decision:** shipped 4.20.1. The hot reads are due before the
task's first change to the tree; the tier's contents are unchanged.

**Rationale:** the field grading (47 conversations, two harnesses),
the clean-room ablation and the dependent-item stream all measured
memory consulted before the first change 90–100% of the time and as
the first act 0–25%. "Read every task" as a first act was a ritual
nobody kept while its substance was kept everywhere; a rule broken
in letter trains readers to discount the rulebook. Patch, not minor:
wording only, no new files. Evidence recorded in the prompt's own
comment and in the CHANGELOG entry.

**Alternatives:** leave the wording (rejected — the gap between
letter and practice is itself a finding of the field study, D7
rulebook divergence); demand the reads first thing (rejected — no
evidence that first-act reading buys anything the before-change
reading does not, and it fights how every harness orients).

## 2026-09-11 — EVIDENCE-PLAN: what three studies commission, and in what order

**Decision (maintainer, on the session's recommendation):** three
closes queued in the current milestone — READ-TIER-BEFORE-CHANGE
(patch), HARNESS-ISOLATION-NOTE (minor), DOUBLE-SCORE (source-only) —
executed in that order; the long-stream experiment that could move the
lab's R2 gate is recorded lab-side (LONG-STREAM) and runs after them.

**Rationale:** the ablation, the field grading and the dependent-item
stream agree on three actionable facts: agents keep the read tier
before their first change, not first thing (so the contract's letter
should say that); harnesses expose surfaces a project would not expect
(so the template should say what and how to close it); and judged
measures need a blind second pass (one changed a findings table). Each
is an afternoon and spends no model usage. Trimming the canon toward
the 8-rule contract is *not* queued: the evidence covers single items
and short streams, and only a long stream with maintenance obligations
can say whether a minimal contract sustains the record. Detail: the
three tickets; lab record LONG-STREAM.

## 2026-09-11 — CLAIM-RECORD: the product claim is sharpened to "a durable project record the harness will not keep for you"

**Decision (maintainer, on the session's recommendation):** the
README's opening no longer promises better code; it states what the
substrate buys — a record of decisions, deferrals and progress that
every session reads and extends — and says plainly that bare and
framework sessions ship the same correct work on single items. The
brief gains a constraint that benefit claims track the evidence base.

**Rationale:** three studies agree. The clean-room ablation (four
substrates, two full harness legs, 32 sessions) found every arm
correct and the substrate's effect confined to retrievability. The
field grading (three real projects, 47 conversations) found the
record read before code changes 90–100% of the time and maintained
by two thirds of commits. The dependent-item stream (three items that
lean on an earlier decision or deferral, 25 Fable and 12 Opus 5 cells)
found every arm, bare included, correct on every cell — the bare arm
recovering what it needed from code and git history — while only the
framework arms read and extended the record, and only they retrieved
the parked deferrals on the probe. Detail: the lab's clean-room findings of 2026-09-10 (Amendments
1–3a),
`self/evaluations/2026-09-11-field-pm-grading.md`.

## 2026-09-11 — FIELD-PM-GRADING: the long-horizon benefits are read from the field, the counterfactual from the clean-room

**Decision (maintainer commission, in session):** the framework's
project-management benefits — context intake, process adherence,
decision retention, deferral discipline, progress legibility, close
ritual, cross-session carry, long-horizon planning, drift resistance
— are assessed from the field-reports tier with the clean-room's own
signal definitions, and filed as an evaluation. Real projects supply
the horizon; the clean-room's bare arms remain the only evidence of
the substrate's absence. The two are read together, never pooled.

**Rationale:** the clean-room ablation (lab, 2026-09-10) showed the
substrate buys the record, not the code, but its independent items
could not show the record being used later. The field archives can:
shipped sessions consult memory before changing code 90–100% of the
time, two thirds to nine tenths of commits maintain it, and decision
logs cross-reference and supersede earlier entries with dated
reasons. Limits are stated in the evaluation: no counterfactual,
lower-bound rates, days-long streams, heuristic classification, and
one project (eBay Tool) cannot be graded because its working threads are
not in the tier. Detail: `self/evaluations/2026-09-11-field-pm-grading.md`.

## 2026-09-09 — FIELD-HARVEST-NEXT: pm-next runs file in this tier, by lane

**Decision:** the two real-project runs of the lab's successor
prototype — `vinyl-sorting` and `ebay-tool`, both pm-next v0.2
vendored from the lab at `530637a` on 2026-08-30 — are filed in
`self/field-reports/`, not in the lab, under the tier's existing
lane rule: vinyl's public repository puts its memory, rulebooks, git
log, prompts, agent memory and validator run in the tracked lane
with only the session logs local; the eBay Tool's private repository
puts everything local except a snapshot note that names no product
detail beyond one paragraph. The join key for a pm-next project
names the prototype version and the lab commit, and the tier README
now says so.

**Rationale:** the maintainer asked for pm-next instances to be
found and archived "in the pm-skills repo", and the lab's own
evidence policy (`lab/RAW-EVIDENCE.md`) keeps raw material out of
its history anyway, so this tier's gitignored local lane is the only
place the verbatim logs can live; the lab can cite them by path when
it writes the R2 finding. The vinyl session that was asked to file
this on 2026-09-02 could not write into this checkout (the harness
blocks a consuming-project session from doing so) and its staged
output was lost — so harvests run from a session opened here, from
source, with the generator kept beside the evidence. Deleted-record
placeholders on the eBay checkout hang both pm-next validators, so
validator evidence is taken from a clean `git archive` outside the
synced path, and the notes say why.

**Alternatives:** filing in the lab's `lab/raw-evidence/` lane
(rejected — the maintainer named this repository, and the lab's lane
is for experiment output rather than consuming-project reports);
tracking the eBay exports after redaction (rejected — the lane rule
is what is already public upstream, and a private repository is
not); reusing the 2026-09-02 harvest shape (moot — it did not
survive).

## 2026-08-30 — MEM-BUDGETS: budgets recalibrated by read-cost tier

**Decision:** shipped 4.20.0. Memory budgets raised — Active items
40→60 (per-item guard 200→250 words), decision-log live entries
20→45 (oldest-entry age 90→120 days), wish-list 25→60, trajectory
2,000→4,000 words, tickets soft ~600→~900 words. Held deliberately:
reference-doc 3,500 (hot whole-file), the per-entry guards, the
derived file-map budget, doc-deltas, lite-close, standing-item and
`pruneToFraction`. The lab received the same raise as a lab-owned
`lab/project/memory-policy.md` override — its frozen `pm_skills/`
baseline copy stays untouched, because that copy is comparison
apparatus for experiments, not live policy.

**Rationale:** maintainer order 2026-08-30 ("raise the limits of
current release and labs between 1 and 2.5, wherever seems
worthwhile"), backed by field evidence: the lab ran 34–35 live
decision entries against 20 with no quality loss, and two external
critiques misread that overrun as hygiene drift when it was
calibration. Tiering rule (generous where reads are cold or
sectional, tight where every session pays) now stated in the policy
file.

Supersedes: 2026-08-28 — Burn-down stop (budget note only) — the
prune required at 20/20 is resolved by recalibration; this entry
stands at 21/45.

**Alternatives:** a uniform 2.5× (rejected — hot-surface budgets
price session reads, not storage); per-project tuning only
(rejected — the defaults themselves were the reported pressure).

## 2026-08-28 — Burn-down stop: the queue is maintainer-blocked

**Decision:** the epic burn-down stops on `epic.md`'s normal
condition — no workable items left. Six releases shipped (4.17.0
through 4.19.0), plus one Prune and two mid-run refactors. Current is
empty of *workable*, not merely empty: all seven open items need the
maintainer (inputs, a target project, a trigger confirmation, or the
paused LAB-FIRST order resumed), and the five wish-list entries are
three no-edit observables, one deliberate hold, and one lab item
behind that pause.

**Rationale for stopping here rather than refilling a third time:**
the run already refilled Current twice from its own findings, and
both refills cleared the evidence bar — SILENT-LOSS-SWEEP on two
confirmed defects of one shape, RETIRE-SWEEP on a defect that had
already cost a release the same morning. A third would not. The line
between refilling from findings and manufacturing work is whether the
evidence exists independently of wanting something to do, and past
this point it does not.

**Budget note for the next session:** the decision log stands at
20/20 live entries. The next close trips it; run a Prune first.

## 2026-08-28 — RETIRE-SWEEP: the check coverage cannot perform

**Decision:** shipped 4.19.0. `release.md` step 6 gains a
**Retirement sweep**: when a release withdraws a rule, claim or
recommendation, grep the distributed tree for the retired wording
and resolve every hit — change it, or state in the entry why that
site legitimately differs. Conditional on the retirement, not the
release. This repo's own release checklist in the root `AGENTS.md`
gains the matching conditional line (source-only).

**Rationale:** the existing coverage check inspects the files a
release *touched* and asks whether the entry names them. It is blind
by construction to the opposite failure — a file that should have
changed and did not — and that failure has one common cause. It fired
this morning: CLOUD-TRUTH (4.17.0) retired the "unsupported"
cloud-sync claim from the AGENTS template and left it in three other
distributed files; step 6 passed; the contradiction stood about an
hour until the framework's own preflight read a stale copy, and cost
the 4.17.1 sweep release. One grep against that is not a close call.

**Scoped narrowly on purpose.** Widening step 6 into a general audit
would make it a step people skip, which is how a check stops working.
The trigger is the retirement; most releases retire nothing and run
nothing.

**The honest caveat, recorded rather than fixed:** two of the three
stale sites were restatements that canonical-copy discipline should
have prevented. With the rule in one place and pointers to it, there
would have been nothing to sweep. This check exists because that
discipline is imperfectly kept, not instead of keeping it — worth
saying plainly so the sweep is not mistaken for permission to
restate.

**First live application:** 4.19.0 itself retires nothing, so the new
sub-step correctly does not fire. Recorded because a check whose first
run is a no-op is easy to believe untested.

## 2026-08-28 — SILENT-LOSS-SWEEP: the audit list, and what it found

**Decision:** shipped 4.18.2. Audited every parsing assumption in the
`gen-*.mjs` / `check-*.mjs` family, both forks. Nine found: two fixed
as new defects, one as an inconsistency, one documented as a
deliberate blind spot, two accepted as loud enough, three already
fixed this week. **The table is the deliverable** — a fourth instance
gets checked against it rather than re-derived.

| # | Site | Assumption | Defeated by | Failure | Disposition |
| --- | --- | --- | --- | --- | --- |
| A1 | flat frontmatter reader (5 copies) | one key per line | a hard-wrapped value | **silent** — continuation dropped, view still well-formed | **Fixed** 4.18.2 |
| A2 | `check-memory` backlog section (2) | heading is literally `## Active` | any other name, or none | **silent** — green "0 open items" over a full queue | **Fixed** 4.18.2 (WARN) |
| A3 | `check-memory` wish-list section (2) | heading is literally `## Open` | as A2 | **silent** — green zero | **Fixed** 4.18.2 (WARN) |
| A4 | `gen-roadmap` `livePhases()` | continuation is exactly two spaces | a three-space wrap | **silent** — line dropped | **Fixed** 4.18.2 (any indent) |
| A5 | `gen-backlog` record scan | records are flat `tickets/*.md` | another extension, a subdirectory | **silent** — invisible to generator and validator at once | **Documented** (deliberate) |
| A6 | `gen-roadmap` `archivedPhases()` | chunk file is last on the INDEX row | trailing text | visible `—` in the table | Accepted |
| A7 | `check-docs` / `check-links` targets | title, fragment and query can be stripped | — | deliberate, already commented | Accepted |
| A8 | `check-memory` `itemHead()` | separator is an em-dash at depth 0 | — | fixed 4.18.1 | — |
| A9 | `gen-file-map` `existingRoles()` | a role continues on indented lines | — | fixed 4.16.1 | — |

**Rationale:** two instances in five days, both found by accident
while reading output for something else, made luck the detection
mechanism; the sweep replaced it with a list. It paid immediately.
A1 is a fourth instance of the identical shape, in five copies, and
had not fired here only because every record in this repository
happens to carry a single-line `summary:` — in a project whose
conventions hard-wrap prose at ~72 characters. A2 is worse than any
of them: a passing line from a check that read nothing, in the tool
the whole close protocol trusts to notice.

**The class, stated once.** These scripts parse text the project
authors, so their inputs drift with house style rather than a schema,
and every defect here is the same mistake — treating a formatting
convention as a parsing contract. A2/A3 are its sharp form: treating
a *heading name* as one and defaulting to empty when it does not
match, which converts "I could not read this" into "there is nothing
here". **Defaulting to empty on a failed parse** is the pattern to
distrust, more than any particular regular expression.

**Assumptions (auto-jazz):** A6 accepted, not fixed — its degradation
is already visible in the rendered table. A5 documented, not fixed —
changing the scanned set changes what counts as a record, a design
call rather than a bug fix. Behaviour on well-formed input is
unchanged throughout.

## 2026-08-28 — Refactor + Re-assess at the run-two milestone boundary

**Decision:** the Current milestone emptied when FLAGS-EMDASH shipped
— the whole run-two wave is gone (CLOUD-TRUTH 4.17.0, CLOUD-TRUTH-SWEEP
4.17.1, BUDGET-TRUTH 4.18.0, FLAGS-EMDASH 4.18.1, plus a Prune). All
three milestone intent lines were stale and are rewritten. Assessed
7 open items, promoted 1, held 7, cut 0.

**Refill: SILENT-LOSS-SWEEP → Current, sole item.** Not from the
study's queue, which is now empty, but from this run's own findings:
two defects of identical shape in five days — FILEMAP-WRAP (4.16.1)
and FLAGS-EMDASH (4.18.1) — each a parser in a `gen-*`/`check-*`
script discarding real content with no error, each in both deliberate
forks, each found by accident while reading output for something
else. Two instances make a class; the detection mechanism so far has
been luck. One deliberate pass over the family is cheap, needs no
maintainer, and either finds the third or retires the worry with a
list. A nil result is an acceptable close.

**Holds — all seven re-checked, all seven still hold.** WAVES-PILOT
and VOICE-INTAKE (Next) both need the maintainer: the first for the
target project and the run, the second for inputs or the decision to
cut. PM-MCP waits on the lab prototype's harness-client run, which
LAB-FIRST's pause makes unreachable. JANITOR-WRITE's scenario half
now shares CLOSE-SCENARIO-DEBT's blocker — a blinded runner the
shipping session cannot be. ARCH-RECALL's trigger stayed unfired
through run two (no missed-precedent pain reported). DATA-MIG and
LAB-FIRST are maintainer calls. No hold wording needed refreshing,
so no record was re-stamped — the batch date is this entry.

**VOICE-INTAKE's seventh pass is worth naming.** It has now been
passed over at seven consecutive refactors on the same blocker. The
live question has quietly stopped being "when do the inputs arrive"
and become "is this a cut" — the Next intent line says so now rather
than carrying the item forward silently for an eighth time.

**Wish-list:** five parked, none promotable. Three are standing
observables that explicitly call for no edit; NEXT-FRAGMENTS is lab
queue behind a paused order; ROADMAP-DIST's deliberate hold stands,
its line refreshed with the usage evidence this run generated (the
renderer ran at every close and its `--check` caught a real
divergence) so the next assessment inherits the clock rather than
re-deriving it.

**Assumptions (delegated run, RA3 gateless clause):** promotion of
SILENT-LOSS-SWEEP to Current applied directly rather than proposed —
it is evidence-backed by two shipped fixes and needs nothing from the
maintainer. Grades Medium / Medium / Low / Low: medium impact
(correctness in tools everything else trusts), medium difficulty
(eleven small scripts, no redesign), low risk (audit, behaviour
preserved), low OpΔ.

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
