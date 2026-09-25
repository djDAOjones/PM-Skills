---
description: Read the filed project history for what it tells pm-next v2 — a commissioned, read-only analysis programme run by Claude Opus with Codex Astra as second witness, producing a decision package for a Claude Fable session with the maintainer
---

# V2 field study

<!-- cspell:ignore selfhost Laurillard — a lab directory name, and a project name as its owner spells it -->

The instrument for the question the maintainer put on 2026-09-24:
*what useful analysis can we do on project history to help refine
upcoming versions of pm-skills based on the lab v2 version?* It reads
the field-report tier and the lab's successor branch, runs a fixed
set of studies, and hands a **decision package** to a separate
session that decides. It decides nothing itself.

Source-only. It reads `self/` and the lab checkout, so it is not
distributable (root `AGENTS.md` → "The product tree is protected").

Three placeholders are used throughout, so that paths outside this
repository are not mistaken for paths in it: `<tier>` is
`self/field-reports`; `<lab>` is `~/CascadeProjects/PM-Skills-lab/lab`;
`<run>` is the run directory `~/scratch/pm-v2-study/YYYY-MM-DD`.

## Where it sits

- `self/FIELD-STUDY.md` — the canon reflection instrument: twelve
  dimensions over the tier, findings about the **current** framework.
  This study reuses its posture, its evidence gate, its grading and
  its finding shape, and does not restate them. Where the two differ,
  this file says so; where it is silent, that one governs. The
  package says how the studies below map onto its D1–D12.
- `self/FIELD-HARVEST.md` — fills the tier. The harvest of
  2026-09-24 (`FIELD-HARVEST-RUN-1`, commit `e64c3f8`) is the corpus
  this study reads; its decision-log entry and the generator's README
  (`<tier>/route-plotter/local/harvest-2026-09-24/README.md`) list
  the corpus's known defects.
- `self/REFLECTION.md` — the practice: triggers, evidence gate, the
  caps, governance. This run fires on maintainer call (eight days of
  v2 use is not yet its "first month" trigger; that one fires later)
  and is run three in the run log.
- `<lab>/next-v2/` — the object of the study: the twelve-rule
  contract, the ledger grammars, the four verbs, the validator, the
  view, the digests. Read-only here, like everything else.
- `self/evaluations/` — where the package is filed, dated, after the
  read-only posture ends.

## The three parties

**Claude Opus runs the study.** It builds the corpus ledger, computes
every count, runs the judged measures with independent scorers,
grades, argues against its own findings, and writes the package. It
proposes; it never edits a prompt, a template, a memory file or a
gate, in this repository or the lab.

**Codex Astra is the second witness** — `codex exec` on
`gpt-6-astra`, read-only, at three checkpoints and as an additional
scorer on two studies (below). Never a rubber stamp: it is given the
sources by path, not the run's conclusions, and each disagreement is
settled by re-reading the evidence, never by majority or by
deference.

**Claude Fable decides, with the maintainer present.** It receives
the package and nothing else, records each decision in the right
ledger (lab for v2, canon for the framework), and routes candidates
through normal triage. The package is written for that reader: every
decision it asks for carries its options, its evidence, its cost, its
acceptance test and its amendment choices.

## Posture

`pm_skills/prompts/read-only.md`, with the four deltas in
`self/FIELD-STUDY.md` → "Posture" applied verbatim: the evidence is
immutable; consuming projects' checkouts are out of bounds even
though they are on this machine; the local lane leaves no quotation;
nothing is written into `self/` or the lab during the run. Seven
more apply here.

- **The lab checkout is read, by exception.** It is not a consuming
  project; it is the object of the study and holds the design
  evidence, so it is read directly — every Git call there is
  `git --no-optional-locks …`, its HEAD and status are recorded at
  Phase 0 and Phase 6 exactly like this repository's, and nothing in
  it is touched. `<lab>/selfhost/project/` is the lab's own live v2
  ledger: read it, never write it.
- **Extract archives only into scratch, outside the synced path.**
  `<run>` holds `<run>/extract/`, `<run>/tables/`, `<run>/predictions/`,
  `<run>/codex/` and `<run>/scores/`. Extract with `tar -xzf … --exclude '._*'`: the archives
  carry AppleDouble members macOS `tar` wrote (each manifest's
  correction section lists them).
- **Session archives hold credentials.** The harvest's secrets scans
  found credential-shaped values in many rollouts (counts and file
  names in each manifest's "Secrets scan"; the post-close triage is
  in the generator README). Never copy a line from a rollout or a
  Claude Code log into a table or the report; carry counts,
  timestamps, IDs and your own paraphrase. Scan every draft with the
  credential patterns in the generator's `lib.mjs` (in the tools
  directory beside that README) before it leaves scratch.
- **No claim about code quality.** `CLAIM-RECORD` (decision log,
  2026-09-11): the framework's benefit is a durable, used record;
  this study measures the record and its use, never whether the code
  was better.
- **Date every observation twice.** Canon observations against
  `pm_skills/CHANGELOG.md` from the report's `pm-skills=` version
  forward (`self/FIELD-STUDY.md` → "Phase 3") **and** against the
  addendum of `self/evaluations/2026-08-28-field-study-2.md`, which
  withdrew or reshaped remedies the main text proposes — a withdrawn
  remedy is not revived. V2 observations against
  `<lab>/next-v2/CHANGELOG.md` and the lab's Git log from the commit
  the six intakes name (`c6d8198`) to the lab's HEAD. On 2026-09-24
  that range held no commit touching `<lab>/next-v2/`; that says the
  branch did not move, not that every installed copy matches it —
  S9 checks the copies.
- **Judged measures are scored twice** (DOUBLE-SCORE, decision log
  2026-09-12): a fresh session with no tools, no history and no
  answer key, given the rubric and the artefacts and nothing else,
  one session per cell; agreement reported per cell; every
  disagreement adjudicated by re-reading, with the reason beside the
  cell; majority never decides. A single-scored judgement is graded
  no higher than *Hypothesis*. "Scoring" below (S1, S5) adds Codex
  as a third scorer without relaxing any of that.
- **Facts inherited from the harvest are provisional until
  re-verified at Phase 0.** This file states several (session
  counts, cut logs, corrected manifests, secrets counts, uncommitted
  entries, the six-thread provenance of the intakes). Each is
  recorded in the harvest's decision-log entry, the generator README,
  the manifests or the notes; verify each against its record before
  relying on it, and attach the anchor in the package.

## The partner: Codex as second witness

Invocation, as the harvest used it:

```text
codex exec -m gpt-6-astra -s read-only --skip-git-repo-check \
  --color never -C <this repository> -o <run>/codex/<step>.md \
  "<one-line instruction>" < <run>/codex/<step>-brief.md
```

Each brief names its sources as paths and carries no evidence and no
conclusion of the run. Codex reads the lab checkout by absolute path.
Keep the verbatim briefs and replies in `<run>/codex/`, unsynced;
file a redacted account in `self/_transcripts/` at the close, as
`self/_transcripts/2026-09-24-FIELD-HARVEST-codex.md` did. The
checkpoints and the scoring are separate calls with separate briefs;
a scoring brief never names a checkpoint reply, and a checkpoint
brief never names a score.

### Checkpoint A — before any count: design and a bias check

Brief: this instrument, the tier README, the tracked notes, the lab's
v2 documents. Ask for (1) Codex's own ranking of the studies below
and any it would add or drop, with reasons; (2) a **prediction
register**: for each study's headline measure, the value or direction
Codex expects and why. Seal it in `<run>/predictions/codex-A.md`.
Before reading Codex's reply, seal your own predictions in
`<run>/predictions/opus-A.md`. Neither witness is naive — both have
read the notes — so the registers are a bias check, not evidence:
the package reports them in an appendix and labels each result
*expected by both*, *expected by one*, *surprised both*, and a
result that merely confirms both expectations is re-checked for the
counts having been read to fit. Surprise carries no evidential
weight of its own.

Adopt a design change Codex proposes only if the instrument's own
reasoning does not answer it; record every adoption and every
refusal, with the reason.

### Checkpoint B — after the counts, before the grading

Brief: the corpus ledger, the exposure table and the count tables,
without the run's interpretations. Ask: what do these numbers show
and not show; where is the study about to over-read; which count is
missing; which denominator is wrong; which observation is already
fixed by a dated lab or canon change. Settle each point by the
evidence before grading anything.

### Scoring — S1 and S5

The two Claude passes come first: the run's own, then the fresh,
tool-less session per cell. Codex scores **before either exists on
disk**, so there is nothing for a tool-bearing session to find: its
scoring brief carries the rubric and the artefacts inlined, names no
path, and asks for scores only; the run's own scores are written
only after Codex's reply is sealed in `<run>/scores/`. Report
three-way agreement per cell; adjudicate every disagreement by
re-reading the artefact and record the reason. A cell where the two
Claude passes agree and Codex differs is re-read, not outvoted.

### Checkpoint C — on the drafted package

Brief: the draft, the tier contract, this instrument's "Decision
package" section. Ask Codex to check that every number traces to a
filed path, a stated denominator and a source anchor; that no
local-lane quotation or identifying detail survived; that every
judged cell carries its agreement and adjudication; that the grades
respect the independence caps; that each decision has the required
shape; that the R2 hypothesis is falsifiable; that a retirement is
named or the explicit finding that none is safe is made. Verdict:
hand over / hand over after fixes / do not hand over. One follow-up
round only; after that, fix mechanically and say so.

## Evidence map

Everything is under `<tier>/<slug>/`; the Projects table at the end
of the tier README is the inventory and says which lane each project
uses. **Inventory the actual file names with `ls` before reading**:
the patterns below are illustrative, not selectors — export dates
follow the HEAD exported (Video Pedagogy's latest exports are dated
2026-09-23), a project may lack a kind the pattern implies (Video
Pedagogy has no separate memory export at its intake; the upgrade
report's "Records the change wrote" section is that record), and two
notes (ADHD Research, Derry Lane) are local, not tracked. Costs run
from trivial to ruinous; read in this order and state where you
stopped.

| Order | Material | Where | Settles |
| --- | --- | --- | --- |
| 1 | Projects table; the 2026-09-24 notes | tier README; `<slug>/2026-09-24-note-*.md` (local for two projects) | class, version, install path, session counts, what each harvest took |
| 2 | Upgrade reports | `<slug>/local/*-upgrade*.md` (six v2 intakes; storage-tidy's v0.2 → v2 conversion; the Hub's nine; Windsurf AI's one) | what an intake or upgrade wrote, the commit, the validator at the time |
| 3 | Memory, rulebook, state and git-log exports at each filed HEAD | `<slug>/[local/]<HEAD-date>-export-{memory,rulebooks,state,git-log}*.md`; working-tree snapshots where memory was dirty | almost every mechanical count |
| 4 | Prompts and agent-memory exports | `<slug>/local/<HEAD-date>-export-prompts.md`, `-export-agent-memory.md` | the owner's directives verbatim (redacted); what the harness kept for itself |
| 5 | Session manifests | `<slug>/local/*-sessions-manifest*.md` | per-session table: opening prompt, harness, kind, model, lines, dates — most session questions without extracting anything |
| 6 | The harvest's session index | `<tier>/route-plotter/local/harvest-2026-09-24/run-records.tar.gz` → the JSON member `attribution.json` under `inv` (every session on the machine: store, cwd, first/last, prompt count, model, slug, opening prompt) | cross-project session census in one file |
| 7 | Review artefacts, validator and janitor runs, baselines | `*-export-review-artefacts.md`, `*-validator*.md`, `*-janitor*.md`, the pre-adoption exports | outcome and record health at named dates |
| 8 | Session archives | `<slug>/local/*-sessions.tar.gz` | only what nothing above answers — go with a named question and a grep |
| 9 | Bundles | `<slug>/local/*-repo.bundle` | commit-level history when the git-log export is not enough (`git clone <bundle>` into scratch) |

The lab checkout adds: `<lab>/next-v2/` (the object), `<lab>/selfhost/`
(the lab's own v2 record, run by the same owner — the eighth v2
record beside the seven consuming ones), `<lab>/findings/` (the
design evidence), `<lab>/project/` (the lab's open questions and
records).

**Templates at a version.** Canon's own Git history holds every
distribution template from the unversioned April tree (`957fa30`,
2026-04-13) to 4.21.1. The release commit for a version is the commit
that set `pm_skills/VERSION` to it — walk `git log -- pm_skills/VERSION`
and confirm with `git show <commit>:pm_skills/VERSION`; do not use
`-S`, which also finds the version's removal. **Where the template
lives moved at 4.0.0**: before it, the root `AGENTS.md`,
`UI-STANDARDS.md` and `DEV-INFRASTRUCTURE.md` were the templates;
from 4.0.0 the root `AGENTS.md` is this repository's own contract and
the templates are under `pm_skills/templates/` — confirm against
`pm_skills/MANIFEST.md` at that commit before diffing, or S7 will
manufacture divergence. The unversioned projects received the first
commit's files.

Known corpus defects, from the harvest's decision-log entry and the
generator README: session tables took their "Last" column from the
inventory (corrections appended to four manifests); some Video
Pedagogy and Route Plotter logs are cut at the cut-off
`2026-09-24T11:40Z` — nothing after it exists in the tier; Codex
rewrote its whole store in place before the harvest, so byte-level
comparison across harvests is only meaningful through the manifests'
change labels; the Windsurf stores are opaque and unattributed;
Codex Desktop's imports of Claude Code chats, guardian auto-reviews
and spawned threads are labelled by kind in the session tables and
are not independent sessions.

## Phase 0 — Start state

Record, for the closing comparison: both checkouts' HEAD SHAs and
`git status --porcelain` in full; `pm_skills/VERSION`; the lab's
HEAD and the last commit touching `<lab>/next-v2/`; the list of
files in the tier with dates; the date of the last run in
`self/REFLECTION.md` → "Run log"; and the SHA-256 of every tier file
the run reads, appended as it goes — the package's source anchors.
Re-verify the inherited facts (Posture) here.

## Phase 1 — Corpus ledger, exposure and coverage

One row per project and per filed HEAD, from the reports and nothing
else: slug, lane, substrate class (`none` / unversioned / canon
`x.y.z` / pm-next v0.2 / pm-next v2), join key, how the version was
reached, HEAD and date of each export, evidence kinds present and
absent (against the tier README's closed type list), horizon (first
to last session), harnesses seen, and the **witness note**: who
built it, when, from what prompt — because independence, not count,
sets the grade in Phase 4.

Then the **exposure table**, before any study, one row per project:
install or intake commit, the baseline it was measured from, commits
since, sessions since (from the manifests — a HEAD that did not move
does not mean no session ran), memory words written, days from
install to last activity, memory left uncommitted at the last
harvest (the working-tree snapshots), rulebook or verb ceremony never
exercised. Seven consuming projects run v2 (the six intakes of
2026-09-16 and storage-tidy's conversion); take each one's exposure
from its row, not from a sentence in this file. Every rate in the
package names its own denominator; exposure is one denominator, not
all of them.

Then the **coverage matrix** the package must reconcile: projects ×
studies, each cell *examined*, *absent* (the evidence does not
exist in the tier) or *unexamined* (it exists and the budget did not
reach it). Absent and unexamined are different facts and are never
merged.

State the independence facts before analysing: every project is the
maintainer's; the six v2 intakes were six parallel Codex threads
started from this repository the same morning from one prompt (one
witness for how intake behaves, six for how projects differ — verify
in the manifests); the second harvests of Route Plotter, the Video
Helper and vinyl are the same projects a month on (longitudinal, not
new witnesses); Claude Code and Codex sessions are different
harnesses on the same owner.

## Phase 2 — Date everything

Run the dating pass from the Posture before any study, for canon
and for v2, and read the field-study-2 addendum. Drop fixed and
withdrawn observations into the staleness register with the
citation; keep live and changed-shape ones.

## Phase 3 — The studies

Nine studies, ordered by what they settle per unit of cost. Each
carries the question, the evidence, the measure, what it settles
about v2 (the rule, verb, file or icebox item), and its trap. The
rubrics the judged measures use are in "Rubrics" below and are
frozen before any artefact is scored. Run the studies in order; stop
where the next study's cost exceeds what its answer is worth to the
package, and say where you stopped in the coverage matrix. A study
with no evidence is reported as *no evidence*, never omitted.

### S1 Intake fidelity — did the record survive the crossing?

**Question.** Did the intake verb preserve what the project already
knew — its obligations, blockers, approval boundaries, open work —
and ground what it wrote, or did it produce "a plausible but
insufficiently grounded profile" (v2-hone's first predicted failure)
and lose acceptance context on the way? The same question, with the
same rubric, for the one canon-to-canon port on record: Route
Plotter v3's memory carried from the v2 line (`2026-06-18-*-v2-line.md`
against the memory at the install commit `599407f`, from the bundle
or the git-log export, and `2026-08-17-export-init-prompt.md`).

**Evidence.** The seven v2 `upgrade` reports; each project's
pre-adoption baseline exports (memory, rulebooks, state, the owner's
start files); the record at the intake (the memory export where one
exists, else the upgrade report's "Records the change wrote"); the
intake threads and guardian runs in the session manifests (opening
prompt, length, harness), the logs only for a named question.

**Measure.** Per intake, **counted** by the S1 rubric: obligation
units in the baseline, each classed preserved / merged / omitted /
unresolved; profile fields by origin (inferred / asked / guessed and
marked / guessed and unmarked / placeholder); gate command present
(whether it ever ran is a log question, not a validator one); owner
signature present and dated; digests adopted and "rules that bite"
lines present; what the thread asked the owner and whether an answer
came; validator result at the intake commit. **Judged**, scored per
the Posture with Codex as third scorer: did meaning, blockers and
approval boundaries survive (0–2); is the profile grounded in the
repository or in inference (0–2).

**Settles.** Intake verb steps 1–6 (step 2 is "ask only what you
cannot infer"); the profile schema's fields; item-file guidance;
whether the seven installs are records or scaffolds.

**Trap.** Structural validity (the validator exit code) does not
prove faithful migration, and preserved bytes do not prove
retrievability — S5 measures that. Six intakes from one prompt on
one morning are one witness for the verb's behaviour; differences
between them are the projects' shape.

### S2 The first week on v2 — verbs and rules

**Question.** In the use since 2026-09-16, which of v2's verbs fired
and which of its twelve rules held?

**Evidence.** The record at intake and at the latest filed HEAD for
each v2 project (say which have any exposure — the exposure table);
git-log exports and bundles for commit shape; session manifests for
session counts, harnesses and opening prompts; logs by grep for
`check.mjs`, `view.mjs`, `recall`, `PLAN-`.

**Measure.** Per project: `PLAN-N` decisions with `**Items:**`
lines; trajectory lines added and their shape; `RECALL —` lines with
four components and a mode; `Verify:` lines and `ID: summary` titles
per commit (rule 9 — a declaration, not a gate run); deferrals named
in entries that are also lines (rule 5) versus not; `[!]` owner
lines; validator FAIL / WARN / INFO over time from the logs; view
generated; digest rules named at close (rule 8) on tasks that touched
a standard. Recall and drift for these projects are measured in S5
and S4 with everyone else's, and read back here against V2-FIELD-1's
criteria as an **interim** reading — not the pre-registered result,
which cannot be created after the fact.

**Settles.** Which rules are load-bearing and which are ceremony
(v2-hone: "the four-question phase review still has value if it
reveals a hole; repeating it in every ordinary item would be a cost
without evidence"); whether the close verb is run; the incidence of
each predicted first-fortnight failure at one week.

**Trap.** One project's sessions dwarf the rest; report per project,
never pooled. A rule that a harness enforces (the `@AGENTS.md`
import) fires without being named.

### S3 Handoff and concurrency — one writer, closed network, real practice

**Question.** Does v2's posture — one writer per checkout, the
record as the handoff between harnesses, the network closed in
sessions — survive how the owner actually works: parallel Codex
waves from held clones, Claude Code alongside Codex, intakes
launched from another checkout?

**Evidence.** Session manifests and the attribution index (cwd,
overlapping first/last times, harness); git-log exports and bundles
(merge commits, conflict markers in ledger files, commits by two
harnesses within minutes); the intake commits' harness settings
files; prompts and agent-memory exports; a **capped sample** of
handoff episodes (S3 rubric) read in the logs, in Video Pedagogy,
vinyl and Route Plotter.

**Measure.** Overlapping sessions touching `project/`; merges and
conflicts in ledger files; validator failures following a merge;
for each sampled episode: whether the plan reached the executor as
backlog lines and item files or as chat; acceptance facts the
executor needed that were available only outside the ledger;
repeated owner explanations of the same thing; repair interventions;
network use in closed sessions; the same for the two v0.2 projects
and Route Plotter as canon comparators. Episode classification is
judged and double-scored.

**Settles.** The one-writer rule; rule 2 (the owner directs; ask
the owner; never fetch a record from outside); the profile's Handoff
line; whether the parallel lanes or dispatch held in the icebox have
a trigger; whether the generated harness settings were installed
and honoured.

**Trap.** Held clones are separate checkouts; two writers on two
clones is a merge question, not a one-writer violation, until the
ledgers meet. Held-clone activity is a sampling lead, not proof.
What an agent actually received is visible only in the log of that
session; snapshots cannot establish it.

### S4 Promises over months — deferral pay-off and open-list drift

**Question.** Over months, does the open list stay current and do
deferrals get paid — the long-horizon behaviours the clean-room
could not see and V2-FIELD-1 pre-registers ("the open list shows no
drift")?

**Evidence.** Every project with a month or more of record: the
Hub (May–Aug, eight upgrades), Route Plotter and its v2 line,
Pattern Mapper, vinyl, the Video Helper, Derry Lane, Dot Matrix;
memory exports at each filed HEAD; git-log exports and bundles; the
v2 projects for their week, censored.

**Measure.** Trace each promise (S4 rubric) through its life:
creation → retention → promotion → fulfilment, explicit retirement,
or disappearance; count each outcome against its opportunities.
Shipped-but-still-open items; open items with no activity, by age;
deferrals named in decision, trajectory or commit text that never
became a line (the DEFERRAL-LINE defect: 7 of 10 misses in the lab's
stream); decision-log growth and when the 45-entry archive trigger
would have fired against when canon actually rotated; entries that
supersede earlier ones with a reason. Fulfilment is judged and
double-scored.

**Settles.** Rules 4, 5, 6 and 11; the validator's deferral checks
against the observed failure; the archive step's threshold; whether
`PROCESS.md` or fuller memory maintenance has earned release from
the icebox; the drift rate by substrate class, which is the baseline
any v2 claim of superiority must beat.

**Trap.** Pending work is not failure, and an unfinished window is
censored, not scored. A young record has not had time to drift:
separate age from discipline with the git dates before comparing
classes.

### S5 Retrievability across the whole population — the recall probe as a field baseline

**Question.** From each filed record alone, can a fresh reader
answer v2's four recall questions — the last four pieces of work in
order, one decision and its why, what is deferred and where, the
next open item and its phase — and does the answer depend on the
substrate?

**Evidence.** The record at every filed HEAD for every project that
has one (S5 rubric defines the record per substrate and the eligible
HEADs), and `<lab>/selfhost/project/`; the git-log export and the
record's own lines as the keys, per question.

**Measure.** Answers are produced by **fresh, tool-less reader
sessions** given the record and the four questions and nothing else
— never by the run, which knows the histories. Scoring of each
answer against its key: 0–2 by v2's rubric
(`<lab>/next-v2/verbs/recall.md`), the run's pass, the tool-less
second pass, and Codex first as the
Posture's "Scoring" orders; agreement and adjudications reported;
results by substrate class and by record age. For each cell below 2:
which v2 rule or validator check would have caught the gap, or none.

**Settles.** A field baseline for V2-FIELD-1's recall criterion; the
candidate axis for R2 (the lab's stream found pm-next level with
canon on synthetic records; real records of varied age and
discipline are the untested case); which retrieval failures the ID
graph, the Supersedes line and the structure file address.

**Trap.** The key for "what shipped" is the git log, which the
record's author also wrote; the keys for the other three questions
are the record itself, judged. Keep every key away from the readers.
Score what the record says against the key, never against what the
scorer remembers.

### S6 Attention cost, paired with S5 — does minimality earn its keep?

**Question.** What does a session have to read under each substrate
— not `AGENTS.md` alone but the contract, the profile or identity
files, the brief, the open backlog, the recent decisions, the verbs
invoked and the adopted digests together — and does the smaller
read set answer S5's questions as well?

**Evidence.** Successive memory and rulebook exports of vinyl, Video
Pedagogy, Pattern Mapper, the Hub and the small deployments; filed
validator and janitor outputs at more than one date (vinyl,
storage-tidy, Laurillard); the maintenance episodes in the git logs
and trajectories.

**Measure.** First define the comparable obligation per substrate:
canon's every-task read (the root `AGENTS.md` template's read tiers
at that version) against v2's rule 1 (profile, brief, open backlog,
latest ten decisions) against v0.2's contract. Then, per project and
per filed HEAD, in whitespace words — v2's own estimate unit; say
plainly they estimate reading burden, not tokens loaded — the size of
each obligation on that record; repeated validator warnings across
dates; archive and rotation events; repair work (commits or sessions
whose subject is the record itself). Place each figure beside that
record's S5 score; never report a cost without its retrieval
outcome.

**Settles.** Rule 1's read set; rule 10 and the validator's warning
economy; the 45-entry archive threshold; rule 12's twelve-rule
budget as a proxy for reading cost (v2-hone: "compare equivalent
obligations using actual reads, repairs and owner interventions,
not rule count"); the read tiers held in the icebox.

**Trap.** Words are not tokens and archive size is not hot context.
No leaderboard across eras and models; the pairing with S5 is the
finding, not the ranking.

### S7 Rulebook census mapped onto the profile — what a migration must carry

**Question.** What did the canon deployments write into the
rulebooks they were given, does each thing they wrote have a home in
v2's profile schema, its digests, an item file or a decision — or no
home at all — and, where a home exists, was the obligation actually
cited at close?

**Evidence.** Each canon project's rulebook export (`AGENTS.md`,
`UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md`, `CLAUDE.md`) against the
template at that project's version, located as "Templates at a
version" says; the profile schema at `<lab>/next-v2/project/profile.md`;
the four digests; for the v2 projects, the profile written and the
closes since; the agent-memory exports.

**Measure.** Per project: additions, deletions, rewrites and
filled placeholders (the `self/FIELD-STUDY.md` D7 classification);
each addition mapped to a v2 home or marked *no home*; the
obligations the small deployments carried and never exercised
(ceremony); for the v2 projects, digest rules cited per task that
touched a standard (rule 8); facts in the agent-memory export that
the ledger has no slot for.

**Settles.** Whether a 400-word signed profile can carry what real
projects wrote; the must-carry list for R3-MIGRATION; rule 8 and
intake's standards selection; whether the separate `UI-STANDARDS`
and `DEV-INFRASTRUCTURE` templates stay folded; the digest layer's
coverage of the standards projects actually invoked; whether "the
harness's auto-memory is a cache" holds.

**Trap.** This is the highest-value diff in the tier and the one
most often skipped because it needs the old template; the 4.0.0
move is where it goes wrong. Citation frequency does not establish
accessibility or domain compliance; report it as citation.

### S8 Owner directives — what is actually asked for

**Question.** What does the owner ask an agent to do, how often, and
which of those asks does v2 answer with a verb, a profile line, an
icebox item, or nothing?

**Evidence.** The `-export-prompts.md` export of every project; the
opening prompts in the session manifests and the attribution index.

**Measure.** Every maintainer prompt in the S8 sampling frame
classified by intent (S8 rubric), counted per project and per month
with the frame's prompt count as denominator; each intent mapped to
a v2 verb (`intake`, `plan`, `close`, `recall`), a profile line
(hosting and deploy has one; no verb), an icebox item (`V2-ICEBOX`
names findings, field-report, janitor, dispatch and parallel lanes,
improvement waves, the scoping and planning prompts, curricula,
codecs, upgrade machinery, `PROCESS.md`; review is folded into
`plan`) or nothing. Report the owner's asks as paraphrased intent
labels; quote a trigger phrase only where it is already public in
this repository's own tracked files.

**Settles.** Demand for verbs held in the icebox and for asks v2
has no name for (deploy — the canon wish-list's `AUTO-DEPLOY` came
from this behaviour; second-model verification; memory audit);
whether the contract should name the owner's loop; which v2 verbs
are never asked for by name.

**Trap.** Prompts are what the owner typed, not what the session
did; pair with S2's firing counts before concluding a verb is used
or unused. Sampled agreement bounds population claims (S8 rubric).

### S9 Upgrade landing, and the first v2 upgrade — conditional

Run only if the budget remains after S1–S8, or if the lab's branch
has moved since the intakes (Phase 0).

**Question.** What did upgrades cost the projects that walked them,
and do the seven v2 installs still match the branch?

**Evidence.** The Hub's `upgrade` reports — the eight version
upgrades read separately from the records-mode adoption; Windsurf
AI's one; Pattern Mapper's 3.17.1 → 4.0.0 walk; the v0.2 → v2
conversions (storage-tidy, eBay); Route Plotter's refusal and the
reinstalls (`self/evaluations/2026-08-27-upgrade-refused.md`, the
notes); `<lab>/next-v2/CHANGELOG.md` → "Existing installations";
the lab's Git log after `c6d8198`; each install's copied tools and
verbs against the branch (the blob inventories and bundles).

**Measure.** Per upgrade: required, performed, omitted and
unadvertised actions (the CHANGELOG's Upgrade actions against what
the commit shows — `self/FIELD-STUDY.md` D8); files changed; memory
migration steps; breakage; walked or reinstalled; preservation and
rollback receipts where filed. For v2: whether each install's
`tools/` and `verbs/` match the branch at `c6d8198` and at HEAD, and
what "replace tools and verbs as a reviewed set; merge the contract
deliberately" would require of each.

**Settles.** Whether v2's no-engine upgrade path ("re-copy the
folder; the changelog says what moved") is enough before a
re-founding (R3); which upgrade safeguards the field shows to be
necessary and which are canon's apparatus for its own sake.

**Trap.** A successful upgrade does not prove rollback after later
work. With no branch movement since the intakes, the v2 side reports
*no evidence* — record it as such, not as "the path works".

### Held back, with the reason

- **Gate truthfulness** (did the gate actually run before each
  `Verify:` line): a log-grep study of high cost; run only on the
  v2 projects and only if S2 shows `Verify:` lines at all.
- **Second-witness landing** (whether Codex review findings became
  lines and decisions): S8 counts the asks; the landing question
  waits for `WAVES-PILOT`.
- **Re-running the twelve canon dimensions**: done on four projects
  on 2026-08-28; the population has not changed hands. Re-derive a
  dimension only where a study above needs it, and say in the
  package which of D1–D12 each study covers.
- **Re-grading every project for record maintenance**: the field
  grading of 2026-09-11 settled the bounded claim; target its
  unresolved horizon and semantic gaps instead.
- **Comparing v2 with canon outcomes as if randomised**: no
  counterfactual exists outside the clean-room; the field gives
  baselines, horizons and drift rates, never the effect of absence.

## Rubrics

Frozen before scoring; reproduced in the package's appendix so the
decision session can read a score without the run.

- **S1 obligation unit.** One sentence or list line in the
  baseline's memory, rulebook, start file or README that states a
  constraint, a commitment, an open item, a blocker or an approval
  boundary. Classes: *preserved* (present in the v2 record with the
  same meaning), *merged* (present combined with others, meaning
  kept), *omitted* (absent), *unresolved* (present but contradicted,
  or left as a placeholder). A baseline with no such statement
  yields no units; say so. Profile field origin: *inferred* (traces
  to a repository file), *asked* (the thread asked and an answer
  came), *guessed and marked*, *guessed and unmarked*, *placeholder*.
- **S3 handoff episode.** A plan or item written in one harness's
  session and executed in a different harness's session within
  seven days, identified from opening prompts, IDs and cwd. Cap:
  twelve episodes — all of them if twelve or fewer are detectable,
  else twelve drawn by seeded random sample (seed `20260924`)
  stratified by project.
- **S4 promise.** A deferral, follow-up, phase commitment, wish-list
  line or superseded decision, one unit each. An *opportunity* is a
  later close, phase close or plan event in the same project.
  Outcomes: *fulfilled* (the work is evidenced and the line retired
  or struck), *explicitly retired* (a line or decision says so),
  *promoted* (became an item), *disappeared* (no line, no decision,
  no work), *pending* (the window is open — censored). Fulfilment
  judged 0–2: did the work pay the promise.
- **S5 record and keys.** The record per substrate: unversioned and
  canon — the memory export (`pm_skills/project/`) plus the root
  rulebooks; v0.2 — `project/` plus the curricula; v2 — `project/`
  (profile, brief, backlog, decisions, trajectory, wish-list, items,
  digests); folder projects without Git — the history export, with
  question 1 not scored unless the release archives give an order.
  Eligible HEADs: every filed export; the same project at two HEADs
  is two records. Keys: question 1 — the last four item-bearing
  commits in the git-log export; question 2 — any decision entry in
  the record with a stated why; question 3 — the record's own
  deferral lines against its entries, the reader naming where;
  question 4 — the first open backlog item and its phase or
  milestone. Readers never see a key.
- **S8 sampling frame.** Every maintainer prompt in the
  `-export-prompts.md` exports, excluding Codex Desktop imports,
  guardian auto-reviews and spawned threads (by session kind in the
  manifests). Intent list: plan the next phase; do the next item;
  run the whole backlog; review; verify with a second model; deploy
  or make live; audit or repair memory; fix a defect; explain;
  harvest or file evidence; other. Double-score a sample of sixty
  drawn with seed `20260924`, stratified by project (at least two
  per project where the frame allows); population figures classified
  by one scorer carry the sample's agreement rate as their error
  band and are graded no higher than *Hypothesis* unless that rate
  is at least 0.9.

## Phase 4 — Grade and argue

`self/FIELD-STUDY.md` → "Phase 5" (consistency grades, capped by
independence) and "Phase 6" (lighter alternative, cost honesty,
failure mode, do-nothing case, consolidation by root cause) apply to
every candidate finding. Three additions.

- **The assessment delta.** `self/REFLECTION.md` makes the "what
  changed under assessment" list mandatory: record, per finding,
  what the adversarial pass changed — grade, severity, remedy,
  withdrawal — and carry the list into the package.
- **Counterexamples.** Every finding names the project or record in
  the tier that runs against it, or states that none does.
- **Caps.** `self/REFLECTION.md` → "The three passes, with caps":
  at most ~6 findings after consolidation; at most 5 candidates to
  canon triage; at least one retirement named, or the explicit
  finding that none is safe. Decisions for the decision session are
  capped at eight, each anchored to a finding; a ninth is a sign
  that findings have not been consolidated.

## Phase 5 — The decision package

One Markdown document, drafted in scratch, in this order. Sections
with no evidence are retained and marked *no evidence*. It must be
usable by a session that has nothing else: the rubrics, the
sanitised evidence summaries, the adjudications and the source
anchors travel inside it, because the local lane's paths are not
readable from a package alone.

1. **Verdict and evidence weight** — the overall answer to the
   maintainer's question; the population declared (projects, span,
   one builder, substrates, harnesses) and what it cannot show; the
   integrity statement.
2. **Corpus, exposure, coverage and method** — the Phase 1 ledger,
   exposure table and coverage matrix (projects × studies:
   examined / absent / unexamined); the pinned sources and cut-offs;
   the read order used and where reading stopped; which of
   `self/FIELD-STUDY.md`'s D1–D12 each study covers and which are
   not covered at all.
3. **Read-only result** — start and end SHAs and status for both
   checkouts; commands not run and why.
4. **Staleness register** — the Phase 2 pass, both sides, the
   addendum's withdrawals included.
5. **Study results S1–S9** — each with its tables, per project,
   never pooled across substrates; every rate with its denominator
   and counting rule; judged cells with agreement and adjudications.
6. **What v2 already gets right** — behaviour the evidence shows is
   load-bearing and must survive the next version. A package that is
   entirely negative reads as an opinion.
7. **Findings** — consolidated, in `self/FIELD-STUDY.md`'s finding
   shape plus the counterexample and the assessment delta, each
   naming the v2 rule, verb, file or icebox item it bears on, and
   whether it also bears on canon.
8. **The decision table** — one table, finding-linked, holding every
   decision the package asks for: the design decisions (at most
   eight), the icebox items whose stated trigger the field has fired
   (with the current failure, the applicable opportunity and the
   cheaper alternative considered) and those whose trigger it has
   not, the migration must-carry list from S7 (R3's input), the
   retirement candidates in v2 and in canon, and the candidates for
   canon triage (at most five, in this repository's ticket grammar).
   Then one entry per design decision: the question in one sentence;
   the options, always including *do nothing*; the evidence for and
   against, by path, anchor and grade; what each option costs every
   project at every session, forever; how the option fails if the
   evidence is one person's habit; the **acceptance test** — the
   observation in a future harvest that would show the change
   worked, and the one that would reverse it; the run's
   recommendation and its confidence; the amendment choices open to
   the decision session; which ledger owns the decision (lab or
   canon).
9. **An R2 hypothesis** — the candidate to test and challenge is
   the one the second witness put at design time: *v2 preserves
   independently assessed retrieval and open-list accuracy with
   fewer maintenance repairs and owner interventions at comparable
   exposure*. State whether S4, S5 and S6 support, weaken or reshape
   it; give the final falsifiable wording, the field observable and
   the experiment; or the plain statement that this tier yields
   none, and what evidence would.
10. **V2-FIELD-1** — a project already exposed cannot satisfy
    criteria registered before its first session. Offer the decision
    session the choice: a fresh prospective project with the
    pre-registration written out (criteria, probes, dates), or an
    amended, clearly prospective continuation of one of the seven
    with its interim readings disclosed. Say what the tier cannot
    supply: the second week, a fresh-session recall, the external
    accessibility audit.
11. **The invariant-gap table** — updated as `self/REFLECTION.md`'s
    synthesis pass requires, from the table the last run left.
12. **Unresolved uncertainties** — what is unknown, what was
    inspected, the safest assumption, which decisions depend on it.
13. **What this study could not see, and what the next harvest must
    capture** — including any change `self/FIELD-HARVEST.md` needs
    so the next run can answer what this one could not.
14. **Appendices** — the rubrics as frozen; the sanitised evidence
    summaries the findings rest on; the adjudication records; the
    source anchors (path and SHA-256 of every file read); the two
    prediction registers with their labels (a bias check, not
    evidence); the pointer to the redacted Codex account.
15. **Handover** — the decisions in priority order; the statement
    that nothing was applied and no gate advanced.

## Phase 6 — Close

Re-record both HEADs and statuses; compare with Phase 0. **If either
tree changed, stop**: report it at the top of the package, do not
repair it, do not file, and hand the package and the difference to
the maintainer. Otherwise the posture ends and filing is ordinary
work under this repository's own close rules:

1. File the package verbatim as
   `self/evaluations/YYYY-MM-DD-v2-field-study-<n>.md`.
2. File the redacted Codex account under `self/_transcripts/` with
   the topic `V2-FIELD-STUDY`.
3. Add run three to `self/REFLECTION.md` → "Run log": date, trigger,
   projects, findings, decisions handed over, retirement named.
4. `npm run check` green; commit source-only with the staged-set
   echo; push (the standard close step, root `AGENTS.md`).

Nothing else changes. No wish-list line, no backlog record, no
decision-log entry, no lab file: those are the decision session's
to write once the maintainer has decided.

## For the decision session

Read the package in its order; the verdict and the evidence weight
first, the decision table eighth. Each decision is a proposal with
its counter-argument attached; the maintainer decides — adopt,
defer, reject, amend, or test — and the session records. A decision
about v2 goes in the lab's ledger (`<lab>/selfhost/project/decisions.md`
under a v2 ID, with the package cited by path); a decision about
canon goes in `self/project/decision-log.md`; a candidate goes to
`self/project/wish-list.md` or a ticket; a V2-FIELD-1
pre-registration, once signed, goes in the lab's record for it; an
R2 hypothesis, once adopted, replaces `R2-SUPERIORITY`'s blocker
line. Neither analyst advances a gate; the decision session does not
either — it records the maintainer's word. Every recorded decision
names the finding and the study it rests on, and the acceptance
test, so the next harvest knows what to look for. The session prompt
for that step, which goes on to specify pm-next v3 in the lab, is
`self/V3-SPEC-SESSION.md` (2026-09-25).

## How this study goes wrong

- **It pools.** Six intakes from one prompt become "six projects";
  one project's four hundred sessions become "the field". Per
  project, per witness, each rate with its own denominator, always.
- **It reads the counts to fit.** The prediction registers are the
  bias check; a run that seals them after the counts has none.
- **It quotes the local lane**, or copies a rollout line carrying a
  token into a table, or reproduces the owner's wording from a
  private prompt.
- **It grades v2 against canon as an outcome.** The field has no
  bare arm; it has baselines, horizons and drift rates.
- **It infers.** Quality from commit volume, gate execution from
  `Verify:`, usefulness from rule count, abandonment from
  inactivity, a used verb from a typed ask, owner time from thread
  length.
- **It grows v2.** Every finding becomes a rule; rule 12 exists so
  that an addition retires something, and the package must name a
  retirement or find that none is safe.
- **It decides.** The run proposes; the maintainer decides in
  another session with the package in front of him.
- **It re-finds what the branch already changed**, or revives a
  remedy the addendum withdrew, because the dating pass was skipped.
- **It diffs against the wrong template**, because the templates
  moved at 4.0.0.
- **It mistakes the maintainer's habits for a user population.**
  Every project is one person's; say so in the first section and
  cap every grade accordingly.

## Provenance

Written 2026-09-24 in the session that closed `FIELD-HARVEST-RUN-1`,
from the maintainer's question, with Codex Astra as second witness
twice (verbatim briefs and replies in the unsynced directory
`~/scratch/pm-analysis/2026-09-24/codex/`).

First, a blind design opinion (read-only, 177 s, 1,151 words): the
two lists agreed on six studies; Codex sharpened three (intake as
fidelity, promises as a life cycle, attention cost paired with
retrieval), added the field-study-2 addendum, the exposure table and
the R2 hypothesis, and asked to be the blind scorer — granted for S1
and S5 as an additional scorer, ordered before the Claude passes so
that nothing exists for it to find, not in place of the tool-less
pass DOUBLE-SCORE names. The owner-directive census and the
prediction registers are this session's, kept over Codex's silence.

Second, a review of the draft (read-only, 187 s, 910 words; verdict
"run after the fixes"): one blocker — the templates moved to
`pm_skills/templates/` at 4.0.0, which the draft's S7 would have
diffed against the wrong file — and thirteen findings, all adopted:
seven v2 projects not six and the `none` class; the file-name
patterns made illustrative with the inventory step; intake step 2
not rule 2; the icebox's actual list and deploy's profile line;
inherited facts marked provisional with anchors; the scoring order
and per-cell isolation; rubrics, units, sampling frames and seeds;
answer production separated from scoring in S5, with keys and record
boundaries; caps and coverage statuses; paraphrased intents and the
lab exception stated; the assessment delta, invariant-gap table and
coverage matrix restored; V2-FIELD-1 made prospective; the trigger
corrected to maintainer call; predictions demoted to a bias check;
S10 folded into the exposure table and S1, S2's recall and drift
into S5 and S4, S9 made conditional, the package's decisions
consolidated into one table.
