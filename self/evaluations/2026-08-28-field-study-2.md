# Field study — reflection run two (2026-08-28)

<!-- Dated evaluation. Produced by self/FIELD-STUDY.md under
     pm_skills/prompts/read-only.md; drafted outside the tree and
     filed as a separate step, per that instrument's "Filing and
     governance". Trigger: the first tranche of consuming-project
     evidence in the tier — the external-evidence run that the
     run-one log entry said run two must wait for — fired by
     maintainer call on 2026-08-28. -->

**Workflow declaration.** This is a field study — the instrument in
`self/FIELD-STUDY.md` — running under the read-only posture of
`pm_skills/prompts/read-only.md`, autonomously, in a single pass,
as that posture sanctions. Nothing in the tree changed during the
run; the proof is in section 3.

## 1. Executive summary

**Verdict.** The framework demonstrably carries real projects — three
deployments shipped working software or a working register inside
eleven days, one of them to a live public pilot on its second day —
and its memory machinery held under the heaviest use it has ever
had. But the field runs a different framework from the one the
repository imagines: no project has ever walked the upgrade
procedure, the review-production verb has never fired, word budgets
are systematically overridden on quality grounds while count budgets
hold, and one shipped rule — that cloud-synced checkouts are
"unsupported" — is contradicted by every deployment on record,
including the framework's own repository.

**Evidence weight, declared before analysis.** Four projects; evidence
spanning 2026-08-16 to 2026-08-27; **one person built all of them**
(the framework's own maintainer); versions 4.6.0, 4.7.0 and 4.9.2
against a current 4.16.1. Two harvesting witnesses (Claude Code and
Codex) took independent exports of the same two projects and their
mechanical counts agree, which strengthens the counting but not the
population. What this population cannot show: whether a stranger
could learn the framework, whether its prompts survive contact with
someone who did not write them, or whether any observed skip is a
discoverability failure rather than one person's habit. Every
consistency grade below is capped by that: reports produced by the
same person in the same fortnight are not independent witnesses, so
nothing in this study exceeds **pattern** grade except where the
evidence is the mechanical state of every deployment at once.

**Five most important findings** (full shape in section 7):

1. **FS2-06** — the template's claim that cloud-synced paths are
   "unsupported for project memory" is a dead letter: 4 of 4
   deployments (and this repository) live on OneDrive, and projects
   write the operational guidance the template lacks. Retire the
   claim; keep the guard's working half. *(the named retirement)*
2. **FS2-02** — `prompts/review.md` fired zero times across two
   projects that each ran a full review round the same week; both
   built their own review machinery instead. 4.14.0/4.15.0 already
   metabolised half of this; the production half is still silent.
3. **FS2-01** — upgrade reality: three fresh installs, two same-day
   reinstalls, one outright version refusal, zero walks of
   `upgrade.md`. 4.13.0's reinstall path is the framework's answer;
   no field evidence tests it yet.
4. **FS2-03** — word budgets lose to quality judgement everywhere
   they collide (51/20 decision entries at Route Plotter; backlog
   Active held at ~2× budget for the Video Helper's whole life),
   while count-triggered rotation fired promptly and cleanly. The
   budget mechanism works as a conversation trigger, not a limit.
5. **FS2-04** — a fresh init keeps every template section and only
   ever adds: the Video Helper's every-session rulebook reached
   4,502 words in four days; Route Plotter runs the same framework
   on 993. Nothing in the lifecycle ever prunes a rulebook.

**Integrity statement.** Start and end SHA identical
(`d2cbce43ffc5bfbd27755df133a9b4b1e6f6e950`), `git status
--porcelain` empty at both ends, no file created, edited, staged or
committed inside the tree during the run. Details in section 3.

## 2. Corpus and method

### Corpus ledger (Phase 2)

| Field | digital-art-audience-hub | derry-lane-development-system | route-plotter | uon-video-helper |
| --- | --- | --- | --- | --- |
| Lane | tracked (empty) | **local-only** | tracked + local | tracked + local |
| `pm-skills=` at report | — (no tier reports) | 4.6.0 | 4.7.0 | 4.9.2 |
| How reached | n/a | 4.4.0 fresh 2026-08-17, fresh-reinstalled 4.6.0 same day | fresh 4.7.0 2026-08-17 (`599407f`), v2-line memory ported | 4.6.0 root commit 2026-08-24 (`f46bcf0`), reinstalled 4.9.2 68 minutes later (`92e9791`) |
| Export HEAD | — | `375e102` | `6f2ac154` (Codex) / working checkout (Claude) | `09702c2` (Codex boundary) |
| Types present | none | `export` (1, local) | `export` ×6 (two witnesses for all), `note` ×3 | `export` ×7, `note` ×4 (usage-analysis in two witnesses) |
| Types absent | all eight | `note`, `case-study`, `session-close`, `janitor`, `validator`, `upgrade`, `incident` | `case-study`, `session-close`, `janitor`, `validator`, `upgrade`, `incident`; **no usage-analysis note** | `case-study`, `session-close`, `janitor`, `validator`, `upgrade`, `incident` |
| Span of evidence | — | 2026-08-23 (one day) | 2026-08-17 → 2026-08-27 | 2026-08-24 → 2026-08-27 |

The absences carry information. No project has ever filed an
`incident` report, although incidents visibly occurred (parallel-
writer collisions, OneDrive sync pauses, an abandoned close) — the
incident channel exists and nothing routes into it. Derry Lane's
export has **no analysis note**, exactly the omission
`prompts/field-report.md` (4.11.0) was later written to forbid.
Route Plotter has no session-log usage analysis; the Video Helper
does — so the strongest D2 evidence exists for only one project.

### Read order actually used, and where reading stopped

Per the instrument's cost table: (1) the tier README Projects table;
(2) **all seven analysis notes, in full** — they carry most of the
prior analysis; (3) exports read **mechanically, not wholesale**:
headers of all 27 tracked files, byte-inventory tables, section
headings, word counts, `Verify:` / `Close: lite` counts, and
targeted slices (template-vs-project rulebook headings, the
projects' CLAUDE.md adapters); (4) end-user evidence read for both
coding projects; review-artefact exports sampled structurally
(headings), not read in full; init-prompt exports not read beyond
their headers (the notes summarise them); (5) **session logs not
opened** — they are tar archives in the local lanes, the Video
Helper's usage-analysis notes already answer the questions they
could settle, and no remaining question justified an extraction.
Derry Lane's single local export was read to line ~100 (header,
provenance, memory top); its chat-history body (≈5,900 lines) was
not read. Questions that would have needed the unread material are
recorded in section 15 rather than guessed at.

## 3. Read-only result

| Check | Start (Phase 1) | End (Phase 8) |
| --- | --- | --- |
| HEAD SHA | `d2cbce43ffc5bfbd27755df133a9b4b1e6f6e950` | `d2cbce43ffc5bfbd27755df133a9b4b1e6f6e950` |
| `git status --porcelain` | empty | empty |

**Verdict: the run changed nothing.** The report was drafted in the
session scratchpad outside the tree and filed afterwards as a
separate step, which is where the posture ends.

Commands not run, and why: no builds, no test suites, no linters in
fixing mode (nothing in a docs repository needed them); no
extraction of the local-lane tar archives (cost over remaining
question value; extraction target would have been outside the tree);
`scripts/check-memory.mjs` was **not** run against the filed memory
exports because they are single concatenated files, not the
directory tree the validator reads — reconstructing a fake tree to
run it would have manufactured evidence; the projects' own validator
output is quoted in the filed snapshots and was used instead.

Note for the record: immediately before this run, the same session
(outside the posture) filed the two Codex handoff bundles into the
tier flat shape (`-codex` suffix, content byte-verbatim, commit
`d2cbce4`) and restored a stray executable bit on an archived ticket
file. Both are ordinary filing/tidy work done and pushed **before**
Phase 1's snapshot; the study ran on the settled tree.

## 4. Coverage matrix

Grades from `pm_skills/prompts/improvement-waves.md` → Coverage
ledger: **substantive / superficial / classified-only /
excluded-with-reason**. Every project × dimension appears once.

| Dim | Hub | Derry Lane | Route Plotter | Video Helper |
| --- | --- | --- | --- | --- |
| D1 arrival | excluded — no tier reports; pre-adoption case study already consumed by runs zero/one | substantive | substantive | substantive |
| D2 verb firing | excluded — as above | superficial (export header + memory top only) | superficial (repo-record inference; no log analysis filed) | **substantive** (session-log analysis note) |
| D3 silence | excluded | superficial | substantive | substantive |
| D4 substitution | excluded | classified-only (chat body unread) | substantive | substantive |
| D5 close fidelity | excluded | superficial (19 commits, counts from header) | substantive | substantive |
| D6 memory | excluded | superficial (memory top read) | substantive | substantive |
| D7 rulebook divergence | excluded | classified-only (rulebook section unread) | substantive | substantive |
| D8 upgrade landing | excluded | substantive (no walk — evidenced) | substantive (refusal evidenced; one pre-4.x walk in ported archive) | substantive (reinstall evidenced) |
| D9 cost | excluded | substantive (token totals in header) | superficial (session sizes only) | substantive (volume table) |
| D10 incidents | excluded | classified-only | substantive | substantive |
| D11 outcome | excluded | substantive (header + trajectory) | substantive | substantive |
| D12 evidence health | substantive (the empty directory is itself the D12 datum) | substantive | substantive | substantive |

## 5. Version baseline and staleness register (Phase 3)

Observations date from 4.6.0/4.7.0/4.9.2; current is 4.16.1, with
ten releases on 2026-08-27 alone — several of them **written from
this very evidence**. Dropped or re-classified before analysis:

| Observation (version) | Verdict | Citation |
| --- | --- | --- |
| "No safe route to current version except a hand walk" (4.6–4.9) | **changed shape** — 4.13.0 ships the measured-safe reinstall path; the walk shrinks to root-template/memory reconciliation | CHANGELOG 4.13.0 |
| "Projects build read-only review scaffolding by hand" (4.7.0) | **changed shape** — 4.14.0 ships `read-only.md` (the posture Route Plotter hand-rolled) | CHANGELOG 4.14.0 |
| "Both projects critique reviews before acting; nothing verifies findings" (4.7–4.9) | **changed shape** — 4.15.0 ships `findings.md`, explicitly citing this field pattern | CHANGELOG 4.15.0 |
| "Archive rotation shape improvised per project" (4.9.2) | **fixed** — 4.10.0 codifies retention shape; INDEX-as-archive-map is exactly the Video Helper's workaround, legitimised | CHANGELOG 4.10.0 |
| Video Helper: "Prune file-map step omitted because the generator ignores `pm_skills/`" (4.9.2) | **local** — no 4.9.2 prune step actually demands archive files in the file-map (checked at the 4.9.2 release commit); the project's own completeness expectation, and 4.10.0 blesses the INDEX route | 4.9.2 `memory-maintenance.md`; CHANGELOG 4.10.0 |
| "Long autonomous batch runs end in handoffs; budgets trip mid-run" (4.9.2) | **changed shape** — 4.12.0 `epic.md` adds the pre-pick budget check and the staged-set stop, both written from exactly these failure modes | CHANGELOG 4.12.0 |
| "Field harvesting is a hand procedure" (4.7–4.9) | **fixed** — 4.11.0 ships `field-report.md`; the Codex bundles in this tier were produced by it | CHANGELOG 4.11.0 |
| Everything in sections 6–7 below | **live** at 4.16.1 unless stated | — |

Version-anchoring gaps: none — every tracked report carries the
`pm-skills=` join key (27/27, counted).

## 6. What is working (load-bearing; preserve)

- **The memory validator visibly changes outcomes.** Route Plotter
  (4.7.0, predates the 4.8.0 scaffold `check-memory.mjs`) drifted to
  51 live decision entries against a budget of 20 before a prune
  ran. The Video Helper (4.9.2, validator wired into its gate)
  rotated three times in four days and never exceeded ~2× on the
  entries it eventually rotated. Same maintainer, same fortnight.
  Confounded (see 15), but the natural experiment points one way.
- **Rotation machinery held under heavy use.** Seven archive
  rotations across two projects in eleven days; INDEX files,
  whole-phase chunks, verbatim moves — no recorded loss. The 4.10.0
  retention shape codified what the field was already converging on.
- **`field-report.md` worked on first field contact, run by a
  different agent.** The Codex bundles follow the handoff contract,
  carry counted redactions (195 emails found and collapsed in one
  export), and left the projects byte-clean. Cross-agent portability
  of a framework verb is demonstrated, not assumed.
- **The evidence loop already closes.** 4.13.0 and 4.15.0 are field
  evidence turned into releases within days. This study found their
  fingerprints everywhere it looked; the framework is learning from
  its deployments, which is the entire bet.
- **The `Verify:` close convention is alive** in both coding
  projects (27 and 23 commit occurrences), including on deploy
  commits.
- **`PROCESS.md` (optional, 4.4.0) was adopted at first opportunity**
  by the one multi-phase governance project (Derry Lane) and
  correctly skipped by the two app projects. An optional surface
  behaving exactly as designed.
- **The framework generalises off code.** Derry Lane is a Notion
  governed register — no build, no tests — and the memory loop,
  ticket grammar and close ritual ran anyway, shipping a
  357-issue verified register.
- **The environment preflight fires.** The Codex harvest's own run
  hit the OneDrive warn-only condition and said so. The operational
  half of the hostile-filesystem guard earns its keep (its
  declarative half does not — FS2-06).

## 7. Findings

Shape per the instrument; severity and confidence separate;
consistency graded per Phase 5. Six findings — at the cap.

---

**FS2-01 — Upgrades do not happen; installs and reinstalls do.**
D1/D8 · **framework-level** (the mechanical state of every
deployment) · Severity **High** · Confidence **High**.

*Evidence.* Route Plotter: exactly one commit ever touching
`pm_skills/VERSION` (`599407f`, fresh 4.7.0), and a decision-log
entry declining 4.9.2 — "skipped, not merely deferred"
(deployment-snapshot notes, both witnesses). Video Helper: root
commit installs 4.6.0, clean reinstall to 4.9.2 68 minutes later,
the commit stating the walk was not used (Codex snapshot, commit
table). Derry Lane: fresh 4.4.0, fresh-reinstall 4.6.0 the same day
"at Joe's direction (clean slate over the upgrade path)" (export
header + trajectory INIT-3). The only upgrade walk anywhere in the
corpus is a pre-4.x "pre-1.0.0 → 2.3.0" entry in Route Plotter's
**ported June archive** — different machinery, different era.

*Version anchor.* Observed at 4.6.0–4.9.2; **changed shape** at
4.13.0 (reinstall path made safe and legitimate). The residual live
fact is the refusal: one project declined the *content* of an
upgrade, not merely its method, and the corpus contains no case of
the 4.13.0 recipe being exercised.

*What it costs now.* The CHANGELOG's Upgrade actions — the release
tax paid on every single release — currently have zero field
readers in their primary role; their surviving role (the record a
reinstall consults for template/memory deltas, per 4.13.0) is
untested.

*Remedy.* **Leave unchanged and instrument.** 4.13.0 is the change;
this study's job is the observable: the next field report from any
project should show either a 4.13.0-recipe reinstall with memory
intact and a Steps-7–8 residue walk, or another raw reinstall — and
which one it is decides whether the reinstall path worked. Lighter
alternative: none needed (no new change proposed). Do-nothing case:
this *is* the do-nothing case, deliberately — adding more upgrade
machinery three-for-three unused would be the failure mode.

---

**FS2-02 — The review-production verb has never fired; projects
build review machinery instead.** D3/D4 · **pattern** (two
projects, one maintainer — graded down from framework-level for
shared origin) · Severity **High** · Confidence **High**.

*Evidence.* Video Helper usage analysis: `review.md` invoked 0
times across 13 logical sessions while "multiple evidence-led
review sessions occurred". Route Plotter: the review-artefacts
export opens with a hand-written "Read-Only Comprehensive
Repository Review Prompt" — phases for state preservation,
discovery, baseline validation, and a multi-dimension review
(correctness, security, privacy, architecture, performance,
dependencies) — plus a novice-facing headline summary and a finding
crosswalk. Both projects also wrote critiques *of* their reviews
before acting (cited as the design driver in CHANGELOG 4.15.0).

*Version anchor.* Observed at 4.7.0/4.9.2; **changed shape** —
4.14.0 ships the posture Route Plotter hand-rolled and 4.15.0 ships
the verify/disposition half. The production half (`review.md`
itself) remains, and remains unfired.

*What it costs now.* A distributed prompt every project carries and
none uses; and the parts of the field's substitute with no framework
counterpart yet — most sharply the **novice-facing summary** (a
review output pitched for an owner who cannot read the code), which
both projects' rulebooks say describes their maintainer.

*Remedy.* **Watch, then shrink.** If the next two field reports show
`findings.md` firing while `review.md` stays silent, shrink
`review.md` to the entry point that routes to the posture and the
verify half (Move/Shrink, not Add). Lighter alternative: do nothing
— 4.15.0 may already have repositioned the surface correctly.
Failure mode of acting now: shrinking a verb the same week its
neighbours shipped destroys the ability to see whether the new
arrangement works. Do-nothing loses only if a third project builds
a third bespoke review prompt — which is precisely what the watch
detects. Future observable: verb-firing table in the next usage
analysis.

---

**FS2-03 — Word budgets yield to quality judgement; count budgets
hold.** D6 · **pattern** (two projects; the same doctrine in both
owners' words) · Severity **Medium** · Confidence **High** (counted
from filed exports and logs).

*Evidence.* Route Plotter: prune stopped at 16/20 entries and 91%
of the trajectory budget, recorded as "the rule applied, not an
overrun to fix"; owner doctrine "pruning must never harm development
quality… budget targets yield to that bar". Video Helper: backlog
Active deliberately held at 2,479–3,004 words against a 1,500 soft
limit for effectively the project's whole life ("the inline detail
is doing real work"), while the same project rotated its decision
log and trajectory promptly each time a **count or hard threshold**
tripped. The validator's Active-over-budget warning appears in ten
of twelve primary session traces — fired, read, and overridden as a
standing state.

*Version anchor.* Live at 4.16.1 — no release since has changed
budget semantics (4.3.0's prune-to hysteresis predates the
evidence and is the arithmetic being overridden).

*What it costs now.* A warning that is wrong ten sessions out of
twelve trains every session to discount warnings; and each
override is currently a per-project doctrine invented in the
decision log rather than a rule the policy states.

*Remedy.* **Shrink/clarify `memory-policy.md`**: state the quality
bar the field already runs — context still feeding open work stays
live; prune-to targets yield to that bar; the stop is recorded —
so an override becomes a rule application. Optionally make word
budgets advisory where a count budget exists for the same file.
Lighter alternative: one sentence, no semantic change ("a recorded
quality-bar stop above the prune-to target is compliant"). Cost:
none per session (close-time only). Failure mode: legitimised
overrides erode the budgets' trigger value — mitigated by keeping
count budgets hard, which is the half the field obeys. Do-nothing
case: budgets-as-conversation-triggers demonstrably work; it loses
because the warning-fatigue cost is real and measured (10/12).
Future observable: the Active warning stops appearing as a standing
state in session traces, or appears with a recorded stop.

---

**FS2-04 — Fresh init only accretes; nothing ever prunes a
rulebook.** D7/D9 · **pattern**, with declared shared-origin
discount (one fresh-init witness plus one full-set adoption; the
counterexample is ported lineage) · Severity **Medium** ·
Confidence **Medium**.

*Evidence.* Template `AGENTS.md`: 3,228 words, eleven sections. The
Video Helper's populated copy after four days: **4,502 words**,
all eleven template sections retained plus seven project additions —
loaded every session. Route Plotter's (ported v2-lineage, never
template-populated): **993 words**, nine of the eleven concepts,
two template sections absent (wish-list capture, anti-patterns) —
and the project ran the same framework competently. Derry Lane
adopted the full rulebook set including the optional PROCESS.md.
Rulebooks appear in no budget: `memory-policy.md` soft-budgets the
reference docs (README, brief, architecture, conventions) but not
`AGENTS.md`, the largest always-loaded file in two of three
projects.

*Version anchor.* Live at 4.16.1.

*What it costs now.* The Video Helper pays ~4.5k words of rulebook
every session; the framework has no mechanism that would ever
surface that as a cost, let alone reduce it.

*Remedy.* **Add `AGENTS.md` (and the populated rulebooks) to the
reference-doc soft-budget list** in `memory-policy.md`, so the
existing validator warns on rulebook growth exactly as it does for
the brief. Lighter alternative: one init.md line — "delete template
sections that do not apply; the template is a menu, not a
contract". Cost: one warn line at close; nothing per session.
Failure mode: a budget nudges projects to cut rules that were
load-bearing — mitigated by warn-only, and by FS2-03's quality bar
applying here too. Do-nothing case: two data points, same author,
and Route Plotter proves small works — but it loses because the
fresh-init path is the one every stranger will take, and it only
grows. Future observable: next harvest's rulebook word counts, and
whether a validator warning for them appears.

---

**FS2-05 — The close ritual holds at milestones, not at session
ends; the lite close never fires.** D5/D10 · **pattern** ·
Severity **Medium** · Confidence **Medium** (log-derived for one
project, commit-proxy for the other).

*Evidence.* Video Helper, from logs: strict gate-plus-commit
session closes 4/13; five mutation sessions ended in handoffs or
stops with work uncommitted; six formal close episodes total —
against the 4.2.0 standard that the close commits and pushes.
Milestone-level discipline inside those sessions was meanwhile
good (many green gates and item commits — `Verify:` on 23 of 111
commits). Route Plotter proxy: 27 `Verify:` occurrences on 86
commits; proxy errs toward under-counting ritual (a run gate not
echoed into the message is invisible). `Close: lite` — the
sanctioned small-close trailer, distributed in GUIDE, task.md and
next.md — appears **zero** times in 197 commits across both
projects. The unclosed sessions cluster where parallel sessions
were interfering (below).

*Version anchor.* Partially **changed shape** — 4.12.0's epic mode
adds the staged-set stop and pre-pick budget check for long runs;
session-end closes outside epic mode are unchanged.

*What it costs now.* Work sits uncommitted at session boundaries in
a cloud-synced checkout — the single environment where uncommitted
state is least safe (FS2-06's failure modes), and the exact thing
the harvest twice had to record as "in-flight changes preserved in
the working-tree snapshot".

*Remedy.* **Clarify the unit in `end-of-task.md`**: a session that
ends mid-task hands off *or* commits a checkpoint — name the
checkpoint commit as the lite close's use case (which would give
the unused trailer its first real job, or prove it should retire).
Lighter alternative: nothing — treat item-level discipline as the
real contract and session ends as noise. Failure mode: mandating
session-end commits produces broken-state commits; mitigated by
checkpoint semantics being explicitly not-a-close. Do-nothing loses
because the observed cost is concrete (recovered-from-snapshot work
twice in one harvest). Future observable: uncommitted-at-harvest
state absent from the next export; any `Close: lite` occurrence.

---

**FS2-06 — The "unsupported" cloud-sync claim is a dead letter; its
operational half is load-bearing.** D10/D7 · **framework-level**
(the mechanical state of every deployment, and of this repository)
· Severity **Medium** (no loss has yet resulted; the near-misses
are recorded) · Confidence **High**.

*Evidence.* Template `AGENTS.md` → Hostile-filesystem guard (shipped
4.0.0, predates all three installs): cloud-synced repo paths "are
unsupported for project memory". Field state: Derry Lane, Route
Plotter, the Video Helper **and the framework's own repository**
all live on OneDrive paths. The projects did not relocate; they
wrote operational defences: Route Plotter's DEV-INFRASTRUCTURE
warns against workers on the synced path and its June archive holds
sync-caused incidents (watch churn, dropped executable bits, a test
pool change); the Video Helper's DEV-INFRASTRUCTURE and README warn
about Files-On-Demand, and its owner explicitly **rejected**
excluding the repo from OneDrive, documenting symptoms and an
`npm ci` recovery instead. The template's DEV-INFRASTRUCTURE — the
operational rulebook where both projects wrote this material — has
no cloud-sync section (0 mentions, checked). Meanwhile the guard's
*operational* clauses (warn-only preflight, block before memory
surgery) demonstrably fire: the Codex harvest hit the preflight and
said so. This session adds a fourth-project datum: the framework
repo's own `.git` state was still syncing in when the session
opened, presenting a phantom unfinished close.

*Version anchor.* Live at 4.16.1.

*What it costs now.* A rule every deployment permanently violates
teaches projects that rules are decorative — the most corrosive
thing a rulebook can do — and the real mitigations get reinvented
per project without a template home.

*Remedy — the named retirement.* **Retire the word "unsupported".**
Rewrite the guard to what the field validates: cloud-synced paths
are *hazardous and common*; here are the failure modes (observed
list above) and the standing mitigations (preflight, pause-or-
exclude, commit-early, the tar-archive practice for bulk evidence);
and add the operational section to the DEV-INFRASTRUCTURE template
where both projects independently wrote theirs. Lighter
alternative: delete the "unsupported" sentence alone (three words
of honesty for zero structure). Cost: root-template class — a
three-way merge on upgrade; nothing per session. Failure mode: a
softer rule reads as endorsement and someone loses memory to a
sync conflict — mitigated by keeping the surgery block hard.
Do-nothing case: the guard's operational half already works, so
the claim is harmless fiction — it loses because fiction in a hard
rule is never harmless; it is the template's worked example of a
rule you may ignore. Future observable: next harvest shows projects
*deleting* their hand-rolled OneDrive sections in favour of the
template's, or at least not writing new ones.

---

## 8. Root-cause themes

1. **The framework's answers exist; its entry points are not where
   the work happens.** review.md unfired while reviews ran;
   dispatch.md unfired while parallel sessions collided; the lite
   close unfired while sessions ended untidily. In each case the
   need was real, the shipped answer was reachable, and the moment
   of need never routed through it. (FS2-02, FS2-05, and the
   silence register.)
2. **Judgement outranks arithmetic, and the field says so out
   loud.** Word budgets, prune-to targets, upgrade walks: where a
   rule's arithmetic collided with an owner's quality judgement,
   judgement won and was written down. The framework's best moves
   this fortnight (4.13.0, 4.15.0) were the ones that made the
   field's judgement the rule. (FS2-01, FS2-03, FS2-06.)
3. **Everything accretes; nothing self-prunes.** Rulebooks, review
   artefacts, memory before the validator arrives. The only
   observed shrink events are explicit prunes with a human gate.
   Any surface without a budget and a warning grows without limit.
   (FS2-03, FS2-04.)

## 9. Silence and substitution register (D3/D4)

Verb-by-verb across the corpus. "Fired" needs an explicit
invocation or a declared-and-executed run; Route Plotter's column is
behavioural inference from repo records (no log analysis exists for
it — itself a D12 gap).

| Verb | Video Helper (logs) | Route Plotter (repo inference) | Derry Lane (header only) | Substitute observed |
| --- | --- | --- | --- | --- |
| session-start | 1 explicit | unknown | unknown | AGENTS "Before every task" absorbed into rules position (@AGENTS.md import) — fires without being named |
| end-of-task | 8 (7 complete) | behavioural (Verify: on closes) | behavioural (19 commits, item IDs) | — |
| memory-maintenance | 5/5 complete | 3 recorded actions | unknown | — |
| task / autojazz | 5 (2 complete, 2 abandoned, 1 active) | behavioural | unknown | AGENTS-trigger replaces re-reading task.md (classified as inference by the analysis note) |
| init-mvp | 1 complete (25 h, 866 tool calls) | n/a | n/a | — |
| next | 1 | unknown | unknown | — |
| adopt | 0 (inspected only) | n/a | n/a | — |
| bugfix | 0 | unknown | unknown | ordinary sessions |
| **review** | **0** | **0** (round ran) | n/a | **bespoke read-only dimension-suite prompt, novice summary, crosswalk (RP); external reviews + critiques-of-review (both)** |
| **upgrade** | **0** (reinstalled) | **0** (refused) | **0** (reinstalled) | erase-and-reinstall |
| release | 0 | n/a (owner holds releases by hand) | n/a | owner-held deploy commits |
| **dispatch** (shipped 4.7.0; present in both) | 0 logged | **0**, while parallel sessions ran | n/a | **hand coordination in chat ("wait for the active chat to release the backlog")** |
| backlog-authoring | unknown | unknown | unknown | — |
| scoping / design-options / implementation-plan / validation / quick-task / bug-scoping / deploy | no invocation logged | unknown | unknown | inline planning inside task flow (likely; ungraded) |
| field-report (4.11.0) | fired post-corpus — produced this tier's Codex bundles | same | not yet | (was the hand procedure, now the verb) |
| epic / findings / read-only / improvement-waves (4.12.0–4.16.0) | post-corpus — cannot have fired | — | — | — |
| `Close: lite` trailer | 0 in 111 commits | 0 in 86 commits | not checked | full closes, or no close |
| janitor report path (4.5.0) | no report (script is maintainer tooling, never distributed) | same | same | — expected silence, not a finding |

Total-tier silence with a live substitute (the actionable kind):
**review, upgrade, dispatch, Close: lite.** The first two are
already answered (4.15.0/4.13.0 — watch); dispatch and the lite
close are named in FS2-05/C5.

## 10. Retirement candidates (Phase 7)

**Named retirement: the "unsupported" claim in the
hostile-filesystem guard** (FS2-06) — retire the fiction, keep the
working machinery, re-home the operational guidance. Evidence
grade framework-level; the only retirement in this study that a
real project's behaviour demands rather than permits.

Watched, not yet retired (insufficient or too-fresh evidence):
`Close: lite` (zero firings, but two witnesses and a plausible
never-needed reading — FS2-05's remedy gives it one release to
find its job); `review.md`'s production half (FS2-02 — one
release-cycle watch); the template's wish-list-capture and
anti-patterns sections (deleted only in ported lineage — hypothesis
grade, single witness, no action).

## 11. Cross-project consistency (Phase 5)

- **Framework-level** (every deployment, mechanically): no upgrade
  walks (FS2-01); cloud-synced checkouts universal (FS2-06);
  join-key compliance 27/27 (D12 positive).
- **Pattern** (two projects): review substitution (FS2-02); word-
  budget overrides with the same stated doctrine (FS2-03); close
  instability at session ends (FS2-05); operational OneDrive
  sections hand-written into DEV-INFRASTRUCTURE (FS2-06's re-home
  evidence); rulebook accretion (FS2-04, with the discount stated).
- **Hypothesis** (one project): template-section deletions (Route
  Plotter, lineage-confounded); the 25-hour init-mvp prompt-fit
  question (Video Helper — its own note declines to infer, and so
  does this study); cold-tier read discipline (doc-deltas read in
  four sessions — one project's logs only).
- **Local** (explained by the project's shape): the file-map/
  generator omission (Video Helper — see staleness register);
  Route Plotter's 13-family commit-ID spread (ported multi-series
  history; the Video Helper's clean single series shows the
  convention lands fine on a fresh start).
- **Same situation, different behaviour — the reverse check.** (1)
  Memory discipline with vs without the validator: RP 51/20 blowout
  vs UVH's prompt rotations — the difference tracks the 4.8.0
  validator's presence (confounded; still the study's strongest
  causal hint — see 6). (2) Same review week, same maintainer: RP
  wrote a bespoke review prompt; UVH ran external reviewers and
  critiqued them — the shared behaviour is "not review.md", the
  divergent halves show the prompt's absence bites differently by
  project shape. (3) Commit-ID namespace: ported history spreads,
  fresh history holds a single series — the convention depends on
  start state, which it does not name.

## 12. Cost account (D9, beside D11 outcomes)

| Project | Cost evidence (filed) | Outcome evidence (filed) |
| --- | --- | --- |
| Derry Lane (11 sessions, 8 days) | 376 API requests: 12.6k input, **71.5M cache-read**, 3.19M cache-create, 845k output tokens; 49 human turns, 536 tool calls | 357-issue verified Notion register, risk register, perspective capture; 19 commits; F-01–F-14 line items |
| Video Helper (13 logical sessions, 4 days) | 17,308 native messages, 91.3MB logs; init-mvp alone 25+ h, 866 tool calls | **Live unadvertised pilot from day 2**; MVP shipped 2026-08-25; 111 commits; three-engine verification |
| Route Plotter (12 sessions, 11 days) | ~7,671 messages, ~30MB logs | v3.2.618 live on Pages; v2 line preserved for existing users; 86 commits; review round + remediation branch (release owner-held) |

What the tier cannot price: the framework's *share* of those tokens
(no per-read attribution exists), and the counterfactual (D11's
honest form: the projects shipped this much *while running* the
framework). The one direct framework-cost datum: the Video
Helper's 4.5k-word rulebook and the ~250KB memory trees are read
under the tiered policy, not wholesale — and the observed failure
of that policy (cold-tier reads of doc-deltas in four sessions) is
measured in one project's logs. No context-size recommendation is
made on this evidence, per the instrument's D9 trap.

## 13. Candidates for triage (at most five, ticket grammar)

Written for `self/project/wish-list.md`; the first is scoped enough
to promote whenever the maintainer chooses.

1. `CLOUD-TRUTH` — retire the "unsupported" claim in the
   hostile-filesystem guard; state the observed failure modes and
   standing mitigations instead, and add the operational cloud-sync
   section to the DEV-INFRASTRUCTURE template (evidence: FS2-06;
   two template files + release). **Promotion-ready.**
2. `BUDGET-QUALITY-BAR` — memory-policy states the quality-bar
   stop: live context feeding open work outranks prune-to
   arithmetic; the stop is recorded; count budgets stay hard
   (evidence: FS2-03).
3. `RULEBOOK-BUDGET` — populated rulebooks join the reference-doc
   soft budgets so the validator warns on rulebook growth; init.md
   says template sections are a menu (evidence: FS2-04).
4. `REVIEW-SILENCE-WATCH` — standing observable, no edit: if the
   next two field reports show findings.md firing while review.md
   stays silent, shrink review.md to the entry point (evidence:
   FS2-02). Trigger-shaped, not work-shaped.
5. `SESSION-CHECKPOINT` — end-of-task names the mid-task
   checkpoint commit (the lite close's first real job) so sessions
   stop ending with work uncommitted on synced checkouts
   (evidence: FS2-05; watch `Close: lite` for retirement if still
   unused after).

## 14. Sequencing

No wave programme needed: the five candidates touch disjoint files
(templates/AGENTS + templates/DEV-INFRASTRUCTURE; memory-policy;
memory-policy + init; nothing; end-of-task) and none depends on
another. Normal one-at-a-time triage per
`pm_skills/prompts/improvement-waves.md`'s own admission rule —
it exists for interacting changes, and these do not.

## 15. Unresolved uncertainties

1. **Which hot files the Video Helper's seven "missed-read"
   sessions actually missed.** AGENTS arrives via the @AGENTS.md
   import (a logged Read would be redundant); the three memory
   identity docs do not. Inspected: the rulebook export's CLAUDE.md
   and the usage-analysis note. Safest assumption: some misses are
   real for brief/architecture/conventions. Depends on it: the D9
   cold-read texture (kept as texture, not a finding).
2. **Whether the validator, the 30KB rulebook, or maintainer
   learning drove the Video Helper's better memory discipline.**
   Inspected: both projects' maintenance records. Assumption: the
   validator is the operative difference (it is the mechanism that
   fires in-session). Depends on it: the strength of section 6's
   first bullet — stated as a hint, not a result.
3. **Derry Lane's verb usage and rulebook sizes.** Its 5,900-line
   export body was deliberately not read past the memory top.
   Assumption: patterns consistent with the other two. Depends on
   it: FS2-04's grade (pattern rather than framework-level partly
   because this is unread).
4. **Why Route Plotter refused 4.9.2** beyond "skipped, not merely
   deferred". The record gives the fact, not the reasoning.
   Assumption: perceived upgrade cost against a working 4.7.0.
   Depends on it: nothing in this study's remedies (FS2-01
   deliberately proposes no new machinery).
5. **The `sessions-codex-index.md` files in both local lanes** were
   not examined; the tar archives were not opened. Assumption: they
   match their manifests. Depends on it: nothing above.

## 16. What this study could not see

The population is one person. Every "verbs go unfired" finding is
compatible with "the author does not need his own signage", and
nothing here can separate discoverability failure from author
habit. The questions that need a stranger: does a non-author
project populate the templates this fully? walk the upgrade? find
dispatch when two chats collide? The next field report worth the
most is one from a project **not** built by the maintainer — and
until one exists, the second-best instrument is exactly what
4.13.0/4.15.0 did: ship the field's own behaviour as the rule and
watch whether the next harvest confirms it. What the next report
should capture to close this study's gaps: verb-firing tables (the
Video Helper's usage-analysis note should become the model — it
was this study's single most valuable input), rulebook word counts
over time, any `Close: lite` or checkpoint-commit occurrence, and
the version-reached line 4.11.0 already mandates.

## 17. Handover

The five most valuable proposed changes, in order: `CLOUD-TRUTH`
(retire the dead-letter claim; framework-level evidence),
`BUDGET-QUALITY-BAR`, `RULEBOOK-BUDGET`, `SESSION-CHECKPOINT`,
`REVIEW-SILENCE-WATCH` (a trigger, not a task). **Nothing was
applied.** No prompt, template, memory file or gate changed in this
run; the candidates go to normal triage and every change remains
gated as ordinary work — a distributed change is a release with
VERSION, CHANGELOG upgrade actions, and MANIFEST/GUIDE sync.

---

## Addendum — same-day interrogation (2026-08-28, maintainer-directed)

The maintainer directed a reflection on the study's conclusions
before triage. This pass read the four distributed files the
remedies had targeted without reading — `prompts/review.md`,
`memory-policy.md`, `prompts/end-of-task.md`, and both
`check-memory` forks — plus the six held ticket records. Outcomes,
finding by finding:

**FS2-01 (upgrades) — confirmed unchanged.** No new machinery;
the 4.13.0 observable stands.

**FS2-02 (review silence) — corrected.** The study mischaracterised
`review.md`: it is a **run-acceptance** review (accept an autonomous
run's change set against its stated intent), not the whole-repo
defect-production verb the projects substituted external tools for
— for whole-repo work it already delegates to the GUIDE audit
recipe. The observation stands (verb silent; machinery built), but
the proposed remedy ("shrink review.md to an entry point routing to
findings.md") would have deleted a distinct function. Re-aimed: the
watch now asks whether **run-acceptance as a named verb** ever
fires — UVH's "ordinary code-review sessions" are its observed
substitute — and the retirement question, if silence persists, is
the verb, not a merge into `findings.md`.

**FS2-03 (word budgets) — confirmed and strengthened.** The policy
has already retired fixed word caps in three places — file-map
(derived, "noise, not size"), decision-log (entry-count primary;
the old file-level word budget removed for tripping on healthy
density), and the every-task read load (no aggregate cap) — each
time naming the exact pathology the field showed: a permanently red
check "training agent and maintainer to ignore the size check".
**Backlog Active's fixed 1,500-word cap is the straggler**, and it
is precisely the budget that stood over in 10/12 Video Helper
sessions. The remedy sharpens from "add a quality-bar doctrine" to
"apply the policy's own established design to its last fixed word
cap", plus the recorded quality-stop clause for prune-to targets.

**FS2-04 (rulebook accretion) — qualified, remedy reshaped.** The
993-vs-4,502 comparison overstated: Route Plotter's weight sits in
its 22 KB README (hot, and already budgeted), so total hot surface
is comparable across the projects. What survives exactly as found:
`AGENTS.md` — the heaviest always-loaded file in two of three
projects — is outside the budget system, and the validator
implements only the four reference docs although both
`memory-policy.md` and `end-of-task.md` name "project
standards/process/infra docs" in the same row. The remedy is now a
completeness fix: name the root rulebooks (AGENTS.md included) in
the policy row and implement them in **both** check-memory forks.

**FS2-05 (session closes) — half withdrawn.** `end-of-task.md`
already ships everything the SESSION-CHECKPOINT candidate proposed:
the lite close with its trailer grammar, and a **secondary-session
close** that ends in a handoff block by design. Re-read against
that, part of the "unclosed" evidence is the designed mechanism
operating (the autojazz batch "ended in a handoff"; the maintainer's
chat coordination is the advisory-claim protocol `memory-policy.md`
→ "One writer at a time" prescribes). What survives: at least two
genuinely untidy endings (uncommitted memory edits at stop), and
`Close: lite` at zero firings despite being referenced in the
Video Helper's own rulebooks — reachable and unused. **The
SESSION-CHECKPOINT candidate is withdrawn**; the residue becomes a
lite-close watch. The substitution-register line "dispatch
substitute: hand coordination" is likewise corrected — that hand
coordination is a shipped framework mechanism, not an ad-hoc
replacement.

**FS2-06 (cloud-sync claim) — confirmed unchanged.** The
retirement stands as written.

**Section 14 (sequencing) — error acknowledged.** The claim that
the five candidates "touch disjoint files" was wrong on its own
listing: BUDGET-QUALITY-BAR and RULEBOOK-BUDGET both edit
`memory-policy.md` and both validator forks. They are merged into
one candidate (BUDGET-TRUTH) at triage.

**Section 6 caveat.** The validator natural experiment is stated
one notch too strongly: both projects overshoot budgets *between*
maintenance events (UVH reached 39/20 entries before its third
rotation). The validator's demonstrated effect is a shorter
response window, not prevented overshoot.

**Net position after interrogation.** Six findings → five effective
(FS2-05 demoted to a watch); five candidates → two workable repo
items (CLOUD-TRUTH; BUDGET-TRUTH, merged), one maintainer-driven
pilot already on the wish-list (WAVES-PILOT — its run would also
produce the FS2-01/FS2-02 observables), and two watches
(review-acceptance firing; lite-close firing). SESSION-CHECKPOINT
withdrawn. The retirement is unaffected. Queue changes from this
triage are recorded in the decision log and the backlog records,
not here.
