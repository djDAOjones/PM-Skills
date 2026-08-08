# Decision Log — pm-skills framework repository

<!-- Append new decisions at the top. Don't edit old entries. -->
<!-- Hot sectional: agents scan the latest 10 headings, open only
     relevant bodies. Keep entries tight: Decision / Rationale /
     Alternatives. -->

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

## 2026-08-09 — WAVE1-BATCH: four small ships as one release (4.2.0)

**Decision:** Batched TRANSCRIPT-SHA (Start SHA transcript header),
OPT-PROTO (empirical option checks rule in design-options),
RETIRE-COMP (imports-at-top dropped from task.md step 8; the
memory-maintenance plain-shell clause narrowed to
stop-and-report-on-failure; a no-habitual-bypass rule added at the
commit step), and CLOSE-COMMIT (commit-and-push becomes a standard
close step; propose-only restorable per project via root
`AGENTS.md`; staged-set echo and parallel staging rules kept; the
agent never adds or changes a remote) into one listed minor
release, 4.2.0.

**Rationale:** The four were triaged together, are individually
paragraph-scale, and `release.md` permits batching when every
change is listed — one upgrade step for consuming projects instead
of four. RETIRE-COMP is the programme's first measured prose
retirement (evidence: RQ2-LITE catalogue; EVAL-SCEN's masked
plants). CLOSE-COMMIT records the maintainer's trust recalibration
(wish-list capture, applied in behaviour since 2026-08-09, now in
text).

**Alternatives:** Four patch releases (rejected — upgrade-step
noise); folding CTX-CACHE in (rejected — a spike with an open
question, not a ship).

## 2026-08-09 — EVAL-SCEN: the frontier model repairs the framework as it executes it

**Question:** Can a behavioural scenario (fixture + blinded ask +
`check-memory.mjs` oracle + property assertions) catch a planted
prompt regression? Bar: control passes, planted deletion goes red.

**Method:** Houseplant-tracker fixture (packaged at 4.1.0 via
`npm run package`), three blinded sub-agent runs: control; eviction
bullet deleted; trajectory ID-format inverted. All states verified
mechanically. Detail: the dated EVAL-SCEN findings document under
`self/evaluations/`.

**Findings:** Control passed everything. Both plants were
**masked** — the agents reconstructed the intended behaviour from
priors and surviving context (run B even listed the eviction as its
own stated assumption). Bar unmet as designed, and the
generalisation is the deliverable: *prompts are load-bearing where
they encode the arbitrary, not the sensible.* Detectable probes are
arbitrary machine contracts, corrupted-state repair, and byte-level
(upgrade) assertions. Machinery proven end-to-end at 66–79k tokens
per run; zero confabulation across three runs.

**Recommendation:** EVAL-HARNESS unblocked with the revised
scenario doctrine (its first calibration probe: an
arbitrary-contract plant). Feeds RQ-ABLATION (two accidental
ablation cells returned "dead weight at the frontier") and the
minimal-core fiction (third triangulation). Retirement of prose
still routes through conversion to checks — now with sharper
justification.

**Alternatives:** Meeting the bar by re-planting until something
went red (rejected — the masked plants are the finding, not a
failure to engineer around); headless CLI runner instead of
sub-agents (deferred — sub-agents gave blinding and permissions
for free).

## 2026-08-09 — MEM-CHECK: memory validator shipped, wired into the gate (4.1.0)

**Decision:** Shipped `scripts/check-memory.mjs` (source-only
reference implementation) and wired it into `npm run check` as
`lint:memory`; added the "Machine-readable budgets" JSON block to
`pm_skills/memory-policy.md` and the generic validator paragraph to
`pm_skills/prompts/end-of-task.md` step 4 (release 4.1.0, minor).
Exit semantics honour existing policy: structural failures (grammar,
`[x]` items, duplicate IDs, ticket orphans, merge residue) gate
commits; budget overruns and ageing warn and feed proposals —
budgets propose, they never block. Lite-close trailers with no
parseable `Item:` warn for manual triage rather than fail (historic
commits must not poison the gate). Verified on `self/project` (six
honest warnings: four undated standing items, one over-soft ticket,
none structural); second-project verification lands with the lab's
upstream sync.

**Rationale:** Assessment C1 + lab RQ2-LITE: exhortation decays
within a session, enforcement does not; the validator retires the
manual greps of end-of-task step 4 and Diagnose's mechanical half,
and becomes the property oracle EVAL-SCEN needs. First
mechanism of the programme to pay the retire-prose rent.

**Alternatives:** Parsing the prose budget table (rejected —
fragile; the JSON block keeps numbers canonical in one file while
machine-readable); distributing a scaffold copy now (deferred per
the triaged item — proven here first); failing on undated standing
items (softened to warn — adopt-tier projects would gate-break).

## 2026-08-09 — TRIAGE-REV: revolution candidates triaged into the backlog

**Decision:** Promoted the machine-native series candidates
(`self/evaluations/`, 2026-08-08 audit as revised by the extended
assessment and synthesis) into the backlog. Current = Wave 1 / R0
instrumentation: MEM-CHECK, EVAL-SCEN, CTX-CACHE, TRANSCRIPT-SHA,
OPT-PROTO, RETIRE-COMP, CLOSE-COMMIT. Next = Wave 2: EVAL-HARNESS,
MEM-CHECK-2 (absorbs BUDGET-DERIVE), PRUNE-HYST, REFLECT-PRACTICE.
Icebox with named triggers: BACKLOG-STATE, JANITOR-READ,
JANITOR-WRITE, ARCH-RECALL, PAR-BRANCH, PM-MCP. Six wish-list
lines absorbed by promotions and deleted; five remain open.
RETIRE-COMP and EVAL-SCEN's planted-regression bar import lab
findings (PM-Skills-lab RQ8-SCAN, RQ2-LITE). CLOSE-COMMIT records
the maintainer's decision to make commit-and-push a standard close
step rather than propose-only.

**Rationale:** Maintainer instruction 2026-08-09 ("triage the
candidates into canon"), after the lab's first two spikes
triangulated the direction. Current is exactly the R0 gate the
revolution programme needs from the incumbent, so incumbent work
and lab progress now share one critical path.

**Alternatives:** Leaving candidates in the evaluation documents
(rejected — the pick flow reads the backlog, not cold storage);
promoting the structural moves now (rejected — they keep their
named triggers per the two-lane rule).

## 2026-08-08 — GATE-FRESH: fresh-clone docs-gate repair (source-only)

**Decision:** Fixed `npm run check` failing in a fresh clone with 4
`lint:docs` problems. (1) The `scripts/check-docs.mjs` IGNORE list
gains `node_modules` — the three backticked `node_modules/` references
(`self/DEV-INFRASTRUCTURE.md`, `self/project/brief.md`) stay as
written. (2) `self/project/file-map.md` regenerated: its
`.devin/workflows/session.md` line — an untracked empty stub, absent
from every clone — confirmed-and-removed; the shim idea is preserved
in the wish-list. Source-only; no VERSION bump.

**Rationale:** check-docs verifies backticked repo paths exist on
disk, but `node_modules/` is gitignored: legitimately absent in a
fresh clone yet present both locally (after an install) and in CI
(`npm ci` runs before the gate), so every place the gate runs was
masked. Found 2026-08-08 while creating the PM-Skills-lab fork. The
checker-side ignore fixes the class — any future backticked
node_modules reference — where rewording the three docs would fix the
instances and leave the trap armed.

**Alternatives:** Rewording docs to avoid the backticked form
(rejected — instance fix, and the backticked path is the natural
spelling). Committing the empty .devin stub to make the map line true
(rejected — an empty file is not the "session workflow shim" the role
text claimed; write it for real first). Scaffold fork
`pm_skills/scaffold/check-links.mjs` considered per CONTRIBUTING →
"Note on deliberate forks": not applicable — it checks links only and
has no backticked-path pass.

## 2026-07-17 — DIST-BOUNDARY: templates into pm_skills/, packaging verb (4.0.0)

**Decision:** Shipped DIST-BOUNDARY as major 4.0.0 — options A + B
from the maintainer-picked design. (B) The three rulebook templates
moved from the repo root into `pm_skills/templates/` (init gains
Step 0 to copy them out; MANIFEST rows moved; upgrade Step 7 names
the source location per version), making `pm_skills/` the entire
distributable. The operative self contract was promoted from
self/AGENTS.md to the repo root, so IDE global-rule loading now picks
up the real contract. (A) New source-only `scripts/package.mjs`
exports the tracked `pm_skills/` tree manifest-verified (two-way:
every tracked file classified, every literal row exists; empty globs
allowed for tickets/archive), wired as `npm run package` and folded
into the gate as `lint:boundary`.

**Rationale:** The distribution boundary existed only as prose; the
first real consuming project (Cross Stitch Lens, 2026-07-16) cloned
the whole repo and carried the framework's own `package.json`,
`scripts/`, CI, CONTRIBUTING and `self/` ignores into the app — and
its IDE loaded the placeholder template as global rules instead of an
operative contract. Both failures are structural, both fixed at the
root: distribution is now one folder, and the boundary is machine-
checked at every gate run.

**Alternatives:** Two-repo split (rejected — kills dogfooding
locality; memory would live away from the code it describes); full
inversion with real memory at `pm_skills/project/` and templates
generated at release (rejected — the repo would no longer literally
be the distributable, breaking MANIFEST path identity); A alone
(rejected — leaves the wrong-contract auto-load failure live).
`self/DEV-INFRASTRUCTURE.md` deliberately stays in `self/` — only
AGENTS.md is auto-loaded by IDEs. check-docs now excludes the
append-only decision log as a path source (same rationale as the
CHANGELOG exclusion).

## 2026-07-16 — CI-NODE: bump CI Node to 22 for cspell v10 (source-only)

**Decision:** Bumped `.github/workflows/lint.yml` from `node-version:
20` to `22`, and aligned `package.json` `engines` to `>=22.18.0`
(architecture.md updated to match). No VERSION bump — CI/tooling config
is source-only.

**Rationale:** Every push to `main` was failing the Lint job (flood of
GitHub failure emails). Root cause was environmental, not content:
`cspell@^10` requires Node `>=22.18.0` and aborted the `lint:spell`
step with `Unsupported NodeJS version (20.20.2)`. `npm run check`
passed locally because the maintainer runs Node v24; only the pinned
CI runner was stale.

**Alternatives:** Node 24 (rejected — 22 is current LTS, sufficient for
the `>=22.18.0` floor); pinning cspell back to v9 (rejected — bumping
the runner is the correct fix, not freezing a dependency).

## 2026-07-16 — ARCH-INTEG: archive referential-integrity check (3.17.1)

**Decision:** Shipped ARCH-INTEG as patch 3.17.1 — a new Diagnose check
(**Archive referential integrity**) plus a Prune P5 re-verification note
in `memory-maintenance.md`. The check harvests dated `decision-log`
pointers from the trajectory (live + archive chunks) and FAILs on any
date the live log's `## YYYY-MM-DD` headings and the archive INDEX
ranges don't cover, with a git-recovery hint. Decided at the ungated
gates: (1) **placement after archive-hygiene check 6**, not appended at
the end — the ticket's explicit position, grouping it with the two
content-adjacent checks (4 file-map paths, 6 INDEX rows) it extends from
*files exist* to *content covered*; this renumbers the former checks
7–12 to 8–13. (2) **patch bump** (one check + one note, no new files, no
migration, MANIFEST unchanged). (3) **date-level granularity +
"unresolved reference" wording**, accepting a small false-positive rate
for one cheap shell pass (ticket constraint). (4) **propose-restore,
never auto-edit** — consistent with Diagnose-never-edits.

**Rationale:** The append-only doctrine protected file *existence* but
not *a citation resolving to content*; the banked incident (four
2026-06-23/24 entries dropped by a Hub revert, still referenced by
trajectory-0003/0004, present in no archive, an invisible INDEX hole)
went unflagged across three prunes and a Diagnose pass precisely because
checks 4 and 6 verify files, not coverage. Frozen CHANGELOG entries that
cite the old check numbers stay as-is — append-only history records the
release-time state; the renumber is called out in the 3.17.1 Upgrade
actions instead.

**Alternatives considered:** Append as check 13 (no renumber churn) —
rejected; the ticket deliberately groups it with checks 4/6 for the
reader thinking about archive integrity, and MD029 being disabled means
the renumber is cosmetic, not a lint risk. Entry-level (not date-level)
granularity — rejected (needs headline parsing; the failure mode is
whole-day slices vanishing). Reverse check (archive entries never
referenced) — rejected per the ticket (unreferenced history is fine;
the doctrine protects existence, not citation).

## 2026-07-16 — ITEM-AGE: standing-item ageing + `[security]` flag (3.17.0)

**Decision:** Shipped ITEM-AGE as a minor release. Standing human-owned
work (`[maintainer]`/`[sign-off]`/`[blocked]`) now carries a creation
date in the canonical backlog grammar, and Start B surfaces the 3 oldest
with their age at the pick (item 7 of "Present the pick"). A new
`[security]` flag — reserved for live exposure (leaked credential, open
auth hole; nothing weaker) — prints a one-line banner at every session
start, on Start A and B alike, until closed. Diagnose gained check 12
(ageing standing items + any open `[security]`); `memory-policy.md`
gained a Standing-item age row (WARN 30 d). Decided at the ungated
gates: (1) **bump = minor** (new capability + flag, backward
compatible, no migration); (2) **threshold = 30 d WARN** in
memory-policy (ticket open question 1 — numbers live there); (3)
**banner = one line max** even for multiple `[security]` items (ticket
constraint against nag-walls), age via shell arithmetic with a
`since <date>` fallback; (4) **held scope to the ticket's file set** —
did **not** edit the root `AGENTS.md` "Security baseline" playbook
(open question 2), because that would change the release class to a
root-template 3-way merge; parked as a wish-list follow-up.

**Rationale:** Visibility without age decays into wallpaper — the Hub
left a leaked API key tracked-but-unrotated ~7 weeks with perfect
visibility and zero pressure (banked evidence, ticket §Evidence). Age is
strictly **informational**: it never auto-escalates an item's position
(ordering stays dependency-driven — the Hub's explicit convention), so
the whole feature is a surfacing nudge, not a scheduler. `[security]` is
the one exception that nags on a task-focused Start A, because an
unrotated live exposure genuinely outranks the task. `project/backlog.md`
is `project-memory` (never overwritten on upgrade), so the grammar
addition ships with a manual Upgrade action; the four framework files
overwrite wholesale. MANIFEST unchanged (no files added/renamed).

**Alternatives considered:** Age reorders the queue — rejected (breaks
the dependency-ordering invariant; the ticket is explicit age is
informational). Per-item `[security]` banner lines — rejected
(nag-wall; the permanently-red-budget lesson). Editing the root
Security-baseline playbook now — deferred (changes release class;
parked). A date-parsing dependency — rejected (zero-runtime-deps rule;
shell arithmetic + `since <date>` fallback).

## 2026-07-16 — NEXT-CMD: `/next` shipped as a distributed workflow (3.16.0)

**Decision:** Shipped `pm_skills/integrations/next.md` — the one-word
"run the next backlog item" trigger — as a `framework`-class
integration (auto-jazz run). It composes three existing pieces with no
new mechanism: `session-start.md` → Start B (pick) → `task.md`
auto-jazz (build) → `end-of-task.md` (close). Decided at the ungated
gates: (1) **location** `integrations/` not `prompts/` — it is
invoked, not pasted (ticket open question, leaned integrations); (2)
**one item per invocation**, not burn-down-until-stopped — bounded,
matches "batch" semantics (ticket recommendation); (3) **invocation is
the go-ahead** — state the pick in one line and continue rather than
waiting for Start B's confirm (prototype behaviour). Wired GUIDE (file
tree + Pick section) and README (commands table); MANIFEST unchanged
(the `integrations/*` wildcard already classes it `framework`). This
repo's `.windsurf/workflows/next.md` rewritten to defer to the
distributed copy plus the `self/` path mapping, closing NEXT-CMD's
"Done when".

**Rationale:** The whole risk of a one-word gateless trigger is
normalising gateless runs, so the guardrail wording is the real work,
not the composition. The file makes four guardrails load-bearing and
non-optional: `[sign-off]` escalates to `full` mode, wish-list triage
still runs at the pick, the reconcile gate still holds, and `task.md`'s
hard prohibitions still stop-and-ask. Close stays `full` by default.
Minor bump (new backward-compatible file); Upgrade action is a single
file copy.

**Alternatives considered:** `prompts/` placement — rejected (pasted,
not invoked; the trigger is a command). Burn-down-until-stopped —
rejected (unbounded gateless runs are exactly what the guardrails
guard against; one item keeps each run auditable). A new mechanism
(dedicated pick+run engine) — rejected (the three composed workflows
already do it; the prototype proved composition works).

## 2026-07-16 — Roadmap refactor + wish-list triage (maintainer-approved)

**Decision:** Drained the wish-list (5 → 0) and re-ordered the backlog
by value, per maintainer sign-off ("yes to wishlist triage; re-order as
you see fit"). Promoted: **NEXT-CMD** (two `/next`-trigger captures
merged; → Current, first position, ticket created preserving the
archived-ROADMAP pointer) and **TICKET-GEN** `[spike]` (→ Next). Cut:
commit-and-push automation, and the maintainer-scratch-home question.
Current is now NEXT-CMD → ITEM-AGE → ARCH-INTEG; Next is TICKET-GEN →
PROCESS-TPL; DEPREC-SHIM, TASK-SIZING, and the three blocked items stay
iced. The brief's open question (was `/next` distribution) is resolved
by the promotion.

**Rationale:** NEXT-CMD leads — the maintainer asked for it twice and
the repo's own `/next` is a working prototype; ITEM-AGE / ARCH-INTEG
are cheap Medium-impact hardening. The spike precedes PROCESS-TPL so
evidence lands before the heavier `[sign-off]` design. Cuts: never-
auto-push is a settled framework stance (COMMIT-STEP covers the rest),
and the scratch-home revisit trigger (a second self-hosted case) is
already recorded under ADOPT-FIXES.

**Alternatives considered:** Keeping the cut items iced — rejected;
both have recorded stances/triggers, and the Icebox is post-triage
commitment, not a second inbox.

## 2026-07-16 — REPO-REVIEW: full source-tree review + memory refresh

**Decision:** Maintainer-directed full review (auto-jazz): all four
Node scripts, every distributed doc, configs, CI, hook, and the `self/`
memory. One defect found and fixed in **both** gen-file-map forks
(`scripts/` + `pm_skills/scaffold/`, per the deliberate-forks rule):
the role parser read the generated index block's section lines as path
roles, so any re-run over an existing map emitted a spurious "No longer
on disk" block — non-idempotent, contradicting the file header. Fix:
strip the index block before parsing roles; both forks verified
idempotent. One doc drift fixed: GUIDE/README described the scaffold as
wholly copy-once while `gen-file-map.mjs` runs in place (init Step 9
deliberately does not copy it). Shipped as patch 3.15.3. Memory was
audited against every budget — all green (48-file map ⇒ floor 2,000 vs
609 words; 6 log entries; 470 trajectory words; 5 wish-list items; 0
doc-deltas; 0 lite closes) — so the "purge" resolved to refreshing the
stale backlog placeholder, not archiving.

**Rationale:** The bug was upstream in the parser, not in the emitted
map, so the minimal fix is one function; the committed map was clean
(written by a first run), which is why the gate never caught it — only
a second run exposed it. Doc wording followed actual behaviour rather
than the reverse.

**Alternatives considered:** Filtering directory names out of the stale
list downstream — rejected (treats the symptom; index lines would still
pollute the roles map). Skipping the scaffold fork — rejected
(CONTRIBUTING's fork rule; same defect, same fix).

## 2026-07-16 — REVIEW-FIXES: first review pass over the self-host burst

**Decision:** Reviewed the three-commit burst SELF-HOST → 3.15.0 →
3.15.1 (`review.md`, range `83ca5cd..797075d`) — verdict: accept with
follow-ups. Three fixes applied: (1) the 3.15.1 changelog entry's
repo-specific `self/` reference reworded to repo-neutral prose,
shipped as patch 3.15.2; (2) a maintainer wish-list capture given its
trailing newline (the gate was red on MD047); (3) the seven saved
transcripts deduplicated (two byte-identical to archived copies
deleted) and renamed to the dated convention.

**Rationale:** The product-tree rule ("no distributed file may
reference `self/`") outranks the changelog's append-only guidance for
a same-day prose slip that leaves Upgrade actions untouched — the
append-only rule protects upgrade semantics, which did not change.
Boundary recorded: a *repo-specific* `self/` reference violates the
rule; a *generic example* (adopt.md Step 0's "e.g. `self/`" naming
the fork pattern) is intent-compliant and stays.

**Alternatives considered:** Leaving the published entry untouched —
rejected (a permanent letter-violation of a hard rule to preserve
prose history). Rewording adopt.md's example too — rejected (the
example is generic by construction and names the one proven pattern).

## 2026-07-16 — ADOPT-FIXES: one fix shipped, two closed why-not

**Decision:** Triaged the three findings from adopt.md's first real run
(SELF-HOST dogfood). Finding 1 (Step-0 misroutes the framework source
tree to upgrade.md, because its `pm_skills/VERSION` is the *product*)
shipped as patch 3.15.1 — a Step-0 "framework source tree" exception.
Findings 2 and 3 close **without** a distributed change:

- **Finding 2 (file-map generator scope).** The scaffold
  `gen-file-map.mjs` `IGNORE` list excludes `pm_skills/**` — correct for
  consuming projects, wrong where the product tree IS the source. The
  documented copy-it-out path (`scripts/gen-file-map.mjs`, tuned to map
  the product tree) resolved it; the knob worked as designed. No change.
- **Finding 3 (memory-home assumption).** adopt/init/session prompts
  assume the memory home is `pm_skills/project/`. Self-hosting needed a
  parallel home (`self/`) plus a path-mapping rule, but that is a
  repo-contract concern (`self/AGENTS.md`), not a prompt change, and
  this repo is the only known self-hosted case. Revisit only if a second
  self-hosted deployment appears.

**Rationale:** Only Finding 1 is a defect anyone reusing the flow would
hit; 2 and 3 are self-hosting edge cases the existing knobs and the repo
contract already cover. Keeps adopt.md's brevity discipline (one
sub-bullet, no new phase) per the ticket constraint.

**Alternatives considered:** Generalising the `self/` mapping into the
distributed prompts — rejected as speculative (single known case; would
bloat every consuming project's read for a maintainer-only concern).

## 2026-07-16 — CODEBASE-AUDIT: recipe, not a new prompt

**Decision:** Ship the whole-codebase audit as a `GUIDE.md` recipe
("Auditing the whole codebase") plus a short pointer note in
`review.md`'s Inputs, composing the existing pieces (review.md area
mode, refactor mode, the doc-deltas ledger) rather than a dedicated
`audit.md`. Chunk unit is the `file-map.md` section (top-level dirs
for adopt-tier repos with no generated map); the audit is
findings-only, aggregated into a cold dated report, triaged into
backlog/wish-list with structural items spun out as refactor tasks.
Minor release 3.15.0.

**Rationale:** The pieces already existed; the only gap was the outer
loop (enumerate → review each → aggregate → triage) — orchestration,
not new mechanism. A recipe keeps the framework surface small and
defers a prompt file until real use proves it under-specifies. Bounded
per-chunk read cost answers the banked read-cost lesson (Hub file-map
~9k words): a single unbounded pass is exactly the anti-pattern the
sectional file-map fixed.

**Alternatives considered:**

- A new `audit.md` prompt — more surface, duplicates area mode;
  deferred behind an evidence trigger.
- A `review.md` whole-repo mode — the orchestration is multi-session
  and sits above a single review, so it belongs in the GUIDE, not
  inside the per-chunk engine.

## 2026-07-16 — SELF-HOST: self/ is the repo's own deployment home

**Decision:** This repo's pm-skills deployment lives in a top-level
`self/` directory mirroring the standard layout (`self/AGENTS.md`,
`self/DEV-INFRASTRUCTURE.md`, `self/project/*`), with one documented
path-mapping rule. The pre-adoption memory (`user_crud`) is archived
verbatim at `self/archive/user_crud/`; its live content migrated into
the standard memory set. The adopted memory is lint-gated; only
`self/archive/**`, `self/evaluations/**`, and `self/_transcripts/**`
stay excluded.

**Rationale:** The standard deployment paths are occupied by the
product here — `pm_skills/` must stay a pristine distributed tree and
the root templates ship with placeholders intact — so the deployment
needs a parallel home that keeps the product/process boundary
mechanically obvious. Maintainer picked this structure at the
2026-07-16 gate ("the repo needs to manage the development of the
framework, but keep its own pm-skills deployment for project
management — clear and organised separation").

**Alternatives considered:**

- Reshape `user_crud` in place (the ticket's lean): keeps a
  meaningless name; conflicts with the maintainer's "retire
  everything else, keep user_crud as archive" direction.
- Make `pm_skills/project/` the real memory and move blank templates
  elsewhere: a breaking product restructure driven by this repo's
  convenience; rejected.

## 2026-07-16 — Decisions carried from the retired ROADMAP

Carried verbatim-in-substance from the retired scratch roadmap
(archived at `self/archive/user_crud/ROADMAP.md` — full reasoning in
the case study it cites). Do not re-litigate:

- **REAL-TRAJ** — CLOSED. Executed by the Hub case study; re-run on
  the *next* consuming project. Self-hosting makes this repo that
  project.
- **FMT-CONV** — DECLINED. Backlog-grammar checker adds gate friction
  for marginal gain; revisit only if tooling parses the backlog
  programmatically.
- **DATA-MIG / TEST-DOC / CL-HORIZON** — DEFERRED with triggers; held
  as blocked Icebox items in `self/project/backlog.md`.
- **Ticket archiving** — maintainer call: archive shipped tickets,
  never delete (durable conclusions still fold into the CHANGELOG
  entry). Home going forward: `self/project/archive/tickets/`.

## 2026-07-16 — Adopted pm-skills (self-hosted)

**Decision:** Adopted pm-skills onto its own repository via
`pm_skills/integrations/adopt.md`; project memory reverse-engineered
from the source tree, git history, and the pre-adoption scratch
roadmap (reverse-engineered — verify). Session loops now run the
standard prompts with the `self/` path mapping instead of the
ROADMAP kick-off analogue.
