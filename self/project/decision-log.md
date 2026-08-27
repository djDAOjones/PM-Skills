# Decision Log — pm-skills framework repository

<!-- Append new decisions at the top. Don't edit old entries. -->
<!-- Hot sectional: agents scan the latest 10 headings, open only
     relevant bodies. Keep entries tight: Decision / Rationale /
     Alternatives. -->

<!-- Older entries are archived: 2026-08-17, 2026-08-09→17,
     2026-08-08→09, and 2026-07 — see archive/INDEX.md for ranges
     AND item IDs. Grep the archive files directly; never re-inline
     them. Reversing a decision? Mark it forward with a
     `Supersedes:` line (memory-policy -> "Retention shape"). -->

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

## Archived: 2026-08-17 — see archive/decision-log-2026-08c.md
