# Decision log archive — 2026-08-17

<!-- Cold tier: grep only, never auto-read. Append-only, verbatim —
     entries moved whole from self/project/decision-log.md.
     2026-08-17 spans this chunk, decision-log-2026-08b.md, and the
     live log: the INDEX row's item IDs, not the date range, are what
     locate an entry (pm_skills/memory-policy.md -> "Retention shape"). -->

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
