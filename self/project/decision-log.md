# Decision Log — pm-skills framework repository

<!-- Append new decisions at the top. Don't edit old entries. -->
<!-- Hot sectional: agents scan the latest 10 headings, open only
     relevant bodies. Keep entries tight: Decision / Rationale /
     Alternatives. -->

<!-- Older entries are archived: 2026-08-08→09 and 2026-07 —
     see archive/INDEX.md for ranges. Grep the archive files
     directly; never re-inline them. -->

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

## 2026-08-17 — RELEASE-EVALS: the release close gains the advisory harness line (4.7.1)

**Decision:** `release.md` step 7 plus the repo checklist line wire
the eval harness into every release close, advisory-only. The
scenario-class mapping picked: **upgrade scenario** only for
upgrade-machinery changes (`upgrade.md`, manifest rows/classes,
changelog structure, renames/removals of distributed files) — the
routine entry prepend never qualifies by itself, else the
~70–80k-token scenario fires at literally every release;
**close scenario** for close-protocol changes (end-of-task, task.md
close steps, `Close: lite` trailer grammar); **neither** → the
closing report notes "no applicable scenarios" plus the reason —
the note is the evidence the check ran. The REFLECT-1 janitor fold
is **declined**: no janitor trigger line for the harness — the
trigger now sits in the mandatory release checklist, the exact loop
finding 6 saw fail, and inferring "last scenario run" from
`self/evaluations/` filenames would put fragile parsing in a
deliberately mechanical read-only script; the janitor's existing
note counters already carry the reflection-volume signal. Auto-jazz
run (next-verb). Assumptions at skipped gates: patch bump (one
prompt gains a section, no new files); checklist line inserted
third so "the last three lines" keeps its source-only meaning.
This close is the first under the net.

**Rationale:** the net must hang in the loop it protects
(reflection run one, finding 6 — the only finding to survive pass 2
intact); advisory keeps a red scenario informative, never blocking.

**Alternatives:** upgrade scenario at every release (rejected —
makes the mapping vacuous at ~70–80k tokens a run); janitor counter
line (declined as above — revisit if closing reports show the
checklist line being skipped).

## 2026-08-17 — PACE-POLICY adopted; lab legs recaptured; review verdict on the gateless close

**Decision:** Three maintainer instructions on the INTAKE-DEEP
report, executed together. (1) **PACE-POLICY is adopted:**
successor increments pause until the Hub leg lands — external
evidence, not volume, restarts them. The answered line leaves the
wish-list; NEXT-FRAGMENTS (the one successor increment queued
anywhere) is now explicitly paused under it; RECORDS-DIST is
incumbent-framework work and unaffected. The adoption is also
noticed lab-side, where successor work actually runs — the lab's
wish-list line now points at this entry and asks the next lab
session to log it locally. (2) **The two lab chores were already
captured:** the lab's inherited wish-list still held the full
three-leg REPORTS-IGNORE line, and both legs verified real (the
lab's janitor report still tracked and not ignored; the pm-next
template at lab/next). The line was narrowed to the two live legs
and marked current rather than recaptured from nothing; the
INTAKE-DEEP cut here stands. (3) **Review run** over the
INTAKE-DEEP close commit per `pm_skills/prompts/review.md`:
verdict **accept with follow-ups**. One defect — the INTAKE-DEEP
entry's heading below miscounts its buckets; the true split of the
thirteen source items is **five wish lines promoted (into three
backlog items), seven held, one cut**. The entry body and every
per-item verdict are correct; append-only discipline puts the
correction here rather than rewriting there. Cosmetic follow-up:
the three stub records read "no working detail yet" above their
new assessment lines — reword at next touch. Flagged for the lab's
next triage: its RELEASE-EVALS and RETIRE-TRANSCRIPT-NAG wish
lines predate the 4.7.0 arc (the latter already shipped).

**Rationale:** adoption and recapture are explicit maintainer
instruction; marking the lab lines current instead of duplicating
them keeps one capture per chore; the count correction follows the
changelog pattern — append a correction, never rewrite a published
entry.

**Alternatives:** recording the policy in REFLECTION.md (deferred —
it governs successor increments, not reflection runs; this entry
plus the paused lines are the binding surface); editing the lab's
other stale lines (declined — outside the instructed scope; its
own triage owns that inbox).

## 2026-08-17 — INTAKE-DEEP: thirteen intake items assessed; three promoted, nine held, one cut

**Decision:** Deep assessment of the whole intake pool (five icebox
records, eight wish-list lines) against the day's evidence — the R1
Hub run and records adoption, reflection run one, and RQ5 GREEN.
Run gateless under `next:`; placements written directly per the
backlog-authoring gateless clause, every one reversible by a record
edit plus regeneration. **Promoted to Current:** RELEASE-EVALS
(#1 — reflection finding 6 survived assessment intact: the shipped
regression net has never run at a release, including 4.5.0
restructuring the changelog the upgrade scenario protects; the net
hangs first so the next release runs under it) and CL-440-WORDING
(#2 — R1 Hub evidence: the 4.4.0 Upgrade actions name a
project-memory path in a replace list, a live hazard to the
never-touch-memory promise; fixed by an appended correction entry,
never a rewrite; the wish's "CL-4.4.0-WORDING" label renamed at
promotion — the item-ID grammar excludes dots, which the validator
caught live and RECORDS-DIST's grammar leg now records). **Promoted to Next as one arc:** RECORDS-DIST,
absorbing RECORDS-SCAFFOLD + RECORDS-TAXONOMY +
RECORDS-GRAMMAR-GUIDE — one evidence base (the Hub mis-served three
ways by canon-shaped tooling), one release surface; shipping any
leg alone re-creates the gap the others name. This takes up
BACKLOG-STATE's deferred phase 2 on the fired 4.1.0
proven-on-a-consuming-project trigger. **Icebox — all five held,
triggers restated and honest,** dated verdict lines on each record:
DATA-MIG (no consuming project carries persistent user data),
TEST-DOC (zero evidence of need at zero carrying cost; a cut stays
the maintainer's call), ARCH-RECALL (no missed-precedent pain
reported), JANITOR-WRITE (per-verb gate untouched; JANITOR-READ now
bedding in makes the Reconcile rung buildable when the maintainer
opens the gate), PM-MCP (RQ5 GREEN advanced the prototype leg; the
harness-client run stays a lab move — the ticket's open question,
answered — and distribution stays on the more-than-one-project
leg). **Wish-list:** PACE-POLICY held — policy adoption needs an
explicit maintainer yes/no, surfaced in the closing report with a
recommendation to adopt; NEXT-FRAGMENTS held — lab-side successor
work governed by that same answer; REPORTS-IGNORE residual cut —
the canon leg shipped with 4.7.0 and the lab / pm-next legs are
lab-repo chores to re-capture in the lab's own tracking (surfaced
in the closing report so the pointer is handed over, not hoped
for).

**Rationale:** assessment before inclusion, as instructed — every
placement names its evidence; the two Current items are the
smallest committed slice and each guards a core framework promise
(regression visibility; never touch project memory).

**Alternatives:** promoting the three records wishes as separate
items (rejected — one evidence base, one surface; separate items
invite shipping the tools without the dialect design); promoting
PM-MCP's harness-client leg into this backlog (rejected — lab
work; the icebox record tracks the gate); cutting TEST-DOC
(rejected again — prior maintainer keep respected at zero carrying
cost).

## 2026-08-17 — DEV-PREP: tidy, secure, and triage-queue sweep (source-only)

**Decision:** Ran the maintainer-requested prep sweep before the
next development arc. **Tidy:** the five loose exports in
`self/_transcripts/` identified by content and modified times as
the missing tail of the 2026-07-16 burst (REVIEW-FIXES,
REPO-REVIEW, NEXT-CMD, ITEM-AGE, ARCH-INTEG), renamed to the
dated-ID convention and committed after a redaction scan (no
secrets; the view-link paths match the already-tracked July set).
**Secure:** `npm audit` 3 high → 0 by bumping `markdownlint-cli2`
to 0.23.2 and retiring both `overrides` pins at their documented
retirement condition (the tool now depends on patched `js-yaml`
5.x and `markdown-it` 14.3.0 directly; the js-yaml 4.x fix was
never backported, so the tool bump was the only clean resolution);
the missing `lint:memory` step added to CI and to the
DEV-INFRASTRUCTURE script table — 4.1.0 wired it into
`npm run lint` but workflow and table never followed. **Triage:**
nothing promoted on momentum — INTAKE-DEEP authored as Current #1:
every icebox and wish-list item assessed against current evidence
(promote / hold / cut, reasons recorded) as the next task.

**Rationale:** the maintainer asked for tidy, secure, and triage
in preparation for more dev, with assessment-before-inclusion
explicit — queuing the assessment as the committed slice honours
that instead of pre-empting its verdicts.

**Alternatives:** promoting the records-distribution wishes now
(rejected — the instruction defers inclusion to the assessment);
holding markdownlint-cli2 back with deeper pins (rejected — no
patched js-yaml 4.x exists to pin to).

## 2026-08-17 — PAR-DISPATCH: dispatch verb ships exercise-verified (4.7.0)

**Decision:** Shipped `pm_skills/integrations/dispatch.md` — the
parallel-work initiation verb: disjoint pick (two or three items,
at most one touching the release-bearing tree), lane assignment
(branch, mode, a working tree each) with the dispatching session
as primary, one paste-ready brief per chat, and integration with a
single release. Design calls: a sibling file, not a next.md mode
(the one-item guardrail stays untouched); the primary is the
dispatching session; lanes never release. Verified before the text
shipped, per the ticket's PAR-BRANCH discipline: a live two-lane
dispatched exercise on this repo — RETIRE-TRANSCRIPT-NAG
(distributed lane) and REPORTS-IGNORE (source-only lane) run as
independent sessions in scratch working trees on lane branches,
secondary closes with handoff blocks, both merged conflict-free,
one 4.7.0 release at integration. (Integration note for the next
reader: merging a lane that stops tracking a file deletes the
primary's disk copy; the janitor regenerates it.) Lane whys, folded on ship: the
4.2.0 transcript reminder had zero fires in any evidence
(reflection run one) — the nag goes, the transcripts convention
survives as reference; the janitor report is regenerated per
session and read from the filesystem (timestamp + Start SHA), so
git tracking added churn without authority.

**Rationale:** the exercise doubled as real work (two wishes
drained) and as the verification the ticket's Done-when demanded;
both lanes' gates ran green in their own trees before merge.

**Alternatives:** a synthetic exercise (rejected — real items test
the real choreography); more than one distributed lane (kept
forbidden — changelog prepends are git's weakest merge case).

## 2026-08-17 — PAR-DISPATCH: parallel-initiation verb queued (Next #1)

**Decision:** Queued PAR-DISPATCH in the Next milestone after a
maintainer-requested viability exploration: a distributed verb that
initiates parallel dev work across parallel chats — disjoint pick,
lane and primary assignment, one paste-ready brief per chat.
Viability closed on shipped evidence: PAR-BRANCH (4.6.0) verified
the parallel mechanics live on both repos, next.md supplies the
composition-verb idiom, and nothing yet performs the entry move —
the GUIDE governs sessions already in flight. Constraints and open
questions live in the ticket record.

**Rationale:** every hard concurrency problem (merge rule,
one-writer, secondary close) shipped and verified this week; the
remaining gap is orchestration — one prompt file's worth.
Placement is Next, not Current: the instruction was "add to
roadmap", and Current's intent reserves the committed
build-next slice — promotion is a separate maintainer call.

**Alternatives:** wish-list capture (rejected — the instruction was
conditional roadmap placement and the viability condition was met);
treating the GUIDE parallel section as sufficient per the
audit-recipe precedent (rejected — that precedent defers verbs
whose recipe already exists as composable pieces; the entry move
has no recipe anywhere); a dispatch mode inside next.md (kept open
in the ticket — lean sibling file so the one-item guardrail stays
untouched).

## 2026-08-17 — VALIDATOR-QC: probe-evidenced hardening ships source-only

**Decision:** three `scripts/check-memory.mjs` fixes, straight from
the R1 Hub evidence probes, shipped source-only (no VERSION bump —
the validator has no scaffold copy yet; RECORDS-SCAFFOLD remains
wished): (1) records-aware repair messages — under records mode the
shipped-`[x]` and record-without-open-item FAILs now say
regenerate-from-records / move-record-to-archive instead of "evict
to trajectory", whose verbatim following would have archived a live
item; (2) WARN on unknown record `status:` values (the probe's
`done` typo rendered silently as open); (3) trajectory counters
tolerate the consuming-project dialect `- ID (date, mode) — …`.

**Rationale:** all three failures were demonstrated live on the Hub
records probe (`PM-Skills-lab` findings 2026-08-17); the maintainer
gave a same-day quality mandate. Fixes verified four ways: canon
green (counters gained two previously missed lines), lab memory
unaffected (its fork inherits at next upstream merge), Hub live
memory counters 0 → 12 items, and both probe scenarios replayed
against the patched validator now produce correct, non-destructive
guidance.

**Alternatives:** wait for triage (rejected — same-day mandate,
directly evidenced, source-only surface); fold into a release with
the 4.4.0 changelog-wording fix (rejected — that one is distributed
and stays wished as CL-4.4.0-WORDING).

## 2026-08-17 — REFLECT-1: reflection run one (self-hosted, discounted)

**Decision:** Ran the standing practice's first triggered pass —
late: the ~15-item trigger had fired at ~26 items unnoticed, which
the run records as its own first finding about the practice
(triggers work only when read; the janitor report is the natural
carrier for a trigger line — folded into RELEASE-EVALS scoping).
Declared pure self-hosted; discount applied throughout. Six
findings, assessed adversarially with a delta list; five
candidates to the wish-list (RELEASE-EVALS, RETIRE-TRANSCRIPT-NAG
— the mandatory retirement, a shipped capability with zero fires —
REPORTS-IGNORE, PACE-POLICY, NEXT-FRAGMENTS); invariant drift
noted (I5 regressed in practice: the regression net exists,
unhung). No policies auto-adopted; no gates touched. Detail: the
dated run-one document under `self/evaluations/`.

**Rationale:** The practice's own trigger, honoured; run two is
declared to fire on external evidence, not volume — the Hub leg
remains the programme's binding input.

**Alternatives:** Skipping until Hub evidence exists (rejected —
the evidence gate was satisfied and six findings were waiting;
but the pacing conclusion itself says the *next* run waits).

## 2026-08-17 — PAR-BRANCH: branch-per-session ships for records mode (4.6.0)

**Decision:** Released 4.6.0: the GUIDE's parallel-work section and
the end-of-task secondary close gain the records-mode path —
sessions on branches, no claims for item work, and the merge rule
verified live on both repos: record files merge clean;
insert-collisions conflict only in the generated view and are
resolved by regeneration; field edits usually merge clean
everywhere. Advisory claims remain for prose-memory projects and
the shared append files (same-file appends stay git's weakest
case). The Next milestone is now empty: the records arc is
complete.

**Rationale:** The ticket's own verification requirement was met
twice over (lab E1 insert case; canon field-edit exercise) before
the GUIDE text claimed anything.

**Alternatives:** Retiring advisory claims entirely (rejected —
the C10 append caveat still governs the shared files).

## 2026-08-17 — BACKLOG-STATE: canon runs records mode (phase 1)

**Decision:** Shipped phase 1, source-only. Records are the ticket
files — flat `key: value` frontmatter (id, name, summary, status,
milestone, flags, blocked-on, date, grades, order; the key is
`name`, never `title`, which markdownlint claims) over the H1
ticket body; three Icebox items gained minimal records; `_meta.md`
carries milestone intents. `scripts/gen-backlog.mjs` (fork of the
lab RQ3 prototype) generates the Active section between markers;
`check-memory.mjs` gains records-mode coherence (missing record,
orphan record, status mismatch — all structural FAILs, replacing
the old detail-flag two-way rule in records mode). Phase 0 = lab
RQ3 pass: append case clean as records versus a hard prose
conflict; merge rule "regenerate, never hand-merge the view".
Phase 2 (distribution) remains a separate future decision.

**Rationale:** The Next-arc plan as ticketed; the prototype's
findings applied unchanged (ticket-shaped records, name key, merge
recipe).

**Alternatives:** Separate records directory (rejected — tickets
already are per-item files with the right lifecycle; one dir, one
lifecycle).

## 2026-08-17 — 4.5.0: JANITOR-READ + CL-HORIZON ship together

**Decision:** Released 4.5.0. JANITOR-READ: a read-only janitor
script wraps the validator plus the environment line into
`self/project/reports/latest.md` (timestamp + Start SHA); the
reports directory joins the generated-cold lint excludes (the
evaluations precedent, mirrored across the four configs and the
docs checker); session-start gains the read-when-fresh path with
the staleness contract mandatory and surfacing unchanged (the
report moves where numbers come from, never whether they print).
CL-HORIZON: 43 of 49 entries moved byte-verified into three epoch
archives; the live changelog keeps 4.x plus 3.17.1 (a one-gap
upgrade never opens the archive) behind an index the upgrade walk
follows; live file ~1.9k words from ~17.9k.

**Rationale:** Both Current items were paragraph-to-script scale
with banked designs; one listed release per the batching
precedent. The split executed *before* the 20k trigger so no
future release carries it as a side quest.

**Alternatives:** Committing janitor reports on every run
(deferred — the report updates when runs happen; commits happen at
closes); one rolling archive file (rejected — per-major files
bound their own growth and read cleanly).

## 2026-08-17 — ICEBOX-DEEP: nine items analysed against the programme's aim; four promoted

**Decision:** Deep triage of the whole Icebox against the
machine-native programme. **Promoted, in development order:**
JANITOR-READ (Current #1 — continuous-core's read-only organ; the
validator already computes its report; the loop-style operation
that was its trigger is how development already runs), CL-HORIZON
(Current #2 — the changelog is the machine-consumed upgrade
contract at ~18k of its 20k trigger; split scheduled before it
fires mid-release), BACKLOG-STATE (Next #1 — the records-core
heart; the "commissioned generation" trigger leg is real:
maintainer instruction plus the shipped authoring prompt; phased
so lab RQ3 gates phase 1, keeping R1 unprejudiced), PAR-BRANCH
(Next #2, chained). All four carry skeleton-true tickets, written
to the backlog-authoring contract, linked one-hop from their
items. **Ticketed but held in Icebox:** JANITOR-WRITE — the
per-verb graduated sign-off is the governance, and a blanket
sign-off does not satisfy it; its ticket writes the ladder.
PM-MCP — prototype path unlocked via lab RQ5 once records prove,
but the more-than-one-consuming-project leg guards distribution
and stays (external-evidence discipline). **Stay iced, no
ticket:** DATA-MIG and TEST-DOC (genuinely external triggers;
guidance without its evidence base is what this programme
rejects) and ARCH-RECALL (read-time recall pays only at archive
scale no project here has). Dates added to the two long-undated
standing items (2026-07-16 triage origin).

**Rationale:** "Meets the aim of this chat" = serves the
evidence-gated machine-native revolution: the promotions are the
continuous-core and records-core organs with fired or
maintainer-supplied triggers; the holds are where governance or
external evidence is the point.

**Alternatives:** Promoting PM-MCP outright (rejected — mirror
evidence); cutting TEST-DOC (kept — zero carrying cost, prior
maintainer call respected).

## 2026-08-17 — TICKET-SWEEP: thorough pass over every open item (4.4.0)

**Decision:** Under blanket sign-off, processed every open ticket,
Icebox item, and wish-list line. Shipped as 4.4.0: PROCESS-TPL
(option A — optional `PROCESS.md` root template), DEPREC-SHIM
(upgrade shims + backup-invocation guard + release map rule,
including the ticket's "lean yes" open question), BACKLOG-AUTH
(the authoring cluster: `backlog-authoring.md` with the canonical
ticket skeleton and external contract, Start B promotion hook,
`[detail]` links, legibility guidance, absorbing five wish-list
lines and the TICKET-GEN recommendation), the `[security]`-flag
cross-reference in the AGENTS template, harness auto-memory
guidance in the GUIDE (absorbing the lab's coexistence wish), and
the real Devin session shim (source-only). **Cut with rationale:**
TASK-SIZING — its own evidence records no failure from absence,
free-text steering already works, and formalising it is the
sensible-practice prose class the ablation marked dead weight while
its named risk (a sticky `large` eroding conservative defaults) is
asymmetric; ticket archived. "Rename spike" — cut: standard agile
vocabulary is prior-aligned; renaming buys churn, not clarity.
**Kept blocked, triggers re-affirmed:** DATA-MIG, TEST-DOC,
CL-HORIZON (measured 17,352 words — expect the ~20k trigger within
a few releases), BACKLOG-STATE (authoring-demand leg served by
BACKLOG-AUTH; trigger now rests on merge incidents),
JANITOR-READ/WRITE, ARCH-RECALL, PAR-BRANCH, PM-MCP. Wish-list
drained to empty; backlog rewritten to its own new legibility
guidance (accreted shipped-comments removed — trajectory owns
history).

**Rationale:** PROCESS-TPL's Hub evidence packages judgement and
arbitrary-contract content — the classes ablation proved
load-bearing — as an optional, conditional-tier template, which
fits the minimal-core direction rather than fighting it. The
authoring cluster is where three maintainer wants and the
TICKET-GEN finding converged on one surface.

**Alternatives:** Building BACKLOG-STATE now to serve authoring
(rejected — prose-first serves the want at a tenth the risk and
leaves R1 unprejudiced); keeping TASK-SIZING iced (rejected — an
item whose own ticket argues against its priority accrues reading
cost each sweep; cut cleanly, revivable from the archive).

## 2026-08-16 — TICKET-GEN: tickets are batch-authored at triage, never at scoping

**Question:** Do `[detail]` tickets get created and fleshed out
reliably? Name the scenarios where they don't, or "works as
designed".

**Method:** Repo-history evidence pass (no fixtures): git history
of `tickets/` + `archive/tickets/`, `-G'\[detail\]'` backlog
history, the framework's ticket instruction inventory, the
2026-07-16 transcripts, the TRIAGE-REV entry. Detail: the dated
TICKET-GEN findings document under `self/evaluations/`.

**Findings:** The lifecycle is asymmetric. Retirement: 5/5 archived
at the ship commit; flag↔file consistency mechanically enforced
since 4.1.0 (validator FAILs both directions). Creation: all eight
tickets ever created were batch-authored on 2026-07-16 (seven at
adoption, one at triage); the scoping-time "resume insurance" path
has never fired — defensibly, since every item since shipped
in-session. The observable gap is **promotion time**: Start B
triage deletes the promoted wish-list line with no instruction to
create a ticket (TRIAGE-REV: 17 promotions, zero tickets, detail
left in cold storage); no ticket template ships; the maintainer
offloads ticket writing to outside agents. Scenarios named: S1
context-rich promotion, S2 external authoring without a contract,
S3 misjudged in-session call (invisible without instrumentation).

**Recommendation:** Scoping path — works as designed. Fix surface
is authoring at promotion: ticket skeleton in the distribution +
one Start B triage line (create `tickets/<ID>.md` + `[detail]`
before deleting an outgrown line) + optionally the wish-listed
ticket-writing command. Converges with three existing wish-list
captures — triage as one cluster; one new wish-list line added.

**Alternatives:** Instrumenting S3 first (rejected — no observed
incident; promotion gap has direct evidence); mandatory tickets for
every item (rejected — "don't create a file for an item that fits
its line" is load-bearing against memory bloat).

## 2026-08-09 — REFLECT-PRACTICE: reflection is now a standing practice

**Decision:** Codified the reflection protocol as
`self/REFLECTION.md`: evidence-based triggers, the evidence gate
with the self-reference countermeasure, three capped passes with a
mandatory retirement check, the model-generation clause (now
carrying the EVAL-SCEN doctrine restriction on tamper probes), and
governance (reflection proposes, never edits; gates stay
maintainer-owned). The 2026-08-08 series is recorded as run zero.
Source-only; distribution as a framework verb is decided after two
self-hosted runs.

**Rationale:** The governance audit found steering depended on the
maintainer remembering to ask reflective questions; codified
triggers convert that to something the system asks itself.

**Alternatives:** A distributed `reflect` verb now (rejected — the
two-run proving rule the synthesis set for itself applies).

## 2026-08-09 — 4.3.0: prune hysteresis + rules-import guidance

**Decision:** Released 4.3.0: prune actions now target at most 70%
of a budget (`pruneToFraction`, prose rule + machine-readable key)
so maintenance stops re-firing immediately after completing — the
maintainer's prune-fatigue capture, scoped: the 30% gap makes the
re-fire period roughly a third of budget over accretion rate. The
GUIDE and session-start gain the measured rules-import guidance
(CTX-CACHE evidence), absorbing the CTX-IMPORTS wish-list line.

**Rationale:** Both were paragraph-scale distributed changes with
their evidence already banked; batching them into one listed minor
release follows the 4.2.0 precedent.

**Alternatives:** A tunable per-project fraction row in the table
(kept simple — the prose says tune per project; the key is the
default); waiting for a larger batch (rejected — nothing else
distributed is queued).

## 2026-08-09 — R0-INSTR: harness v1 + counters ship; upgrade GREEN; probe DETECTED

**Decision:** Shipped EVAL-HARNESS v1 (`scripts/eval/`: doctrine
README, generic property asserter, byte-level upgrade asserter,
close-control spec) and MEM-CHECK phase 2 (attention counters +
token estimates), both source-only. Ran the upgrade scenario
(4.0.0 → 4.2.0 fixture: memory byte-identical, customisation
preserved, changed set exact — **GREEN**, the promise's first
mechanical verification) and the trailer-key calibration probe
(blinded agent followed a tampered `Ticket:` contract —
**DETECTED**). With the validator, three scenarios including
upgrade, and counters printing, the lab declares gate R0 passed on
evidence. Detail: the dated R0 instrumentation document under
`self/evaluations/`.

**Rationale:** Critical path under delegated auto-jazz: R0 was the
only gate reachable without the maintainer. Roadmap alterations
under the delegation: full token re-denomination deferred (display
estimates suffice; a release for units alone fails the rent rule);
EVAL-HARNESS marked shipped-v1 with pending follow-ups (blinded
upgrade run, a template-delta window scenario) recorded in the
harness README rather than held open on the backlog.

**Alternatives:** Holding EVAL-HARNESS open until seven scenarios
exist (rejected — the cap is a ceiling, not a quota; three
evidence-bearing scenarios clear R0); running more probes now
(rejected — budget cap; one sub-agent run spent where blinding was
essential).

## 2026-08-09 — CTX-CACHE: pre-loading the hot set pays, mostly in round-trips and foraging

**Question:** Does moving the identity documents into the rules
position reduce cost at equal quality? (Wave 1 spike; codify or
drop.)

**Method:** Matched blinded fixture pair, same task, same starting
commit: fetch versus pre-loaded prompt. Outcomes oracle-verified
identical. Detail: the dated CTX-CACHE findings under
`self/evaluations/`.

**Findings:** −13.8% tokens, −37% tool calls, −9 files opened, −8%
duration, equal quality. The saving is ~46× the pre-loaded content
size, so it is round-trip overhead plus an unanticipated
**foraging reduction** — a pre-grounded agent explores less — not
content deduplication (which grows with hot-set size; this repo's
real hot set is ~3,526 words). Cache pricing stays arithmetic:
sub-agent usage exposes no cache split. Rule derived: pre-load
identity documents, never work-target files.

**Decision:** Codify in the cheap-reversible lane — root
`CLAUDE.md` importing the hot set ships with this close
(source-only, reversible by deletion); the distributed guidance
note is parked to the wish-list for the next triage rather than
shipped as a lone-paragraph release.

**Alternatives:** Drop (rejected — consistent gains at equal
verified quality); distributed note now (deferred — one paragraph,
rides the next release).
