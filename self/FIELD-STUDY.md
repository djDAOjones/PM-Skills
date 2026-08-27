---
description: Turn collected consuming-project field reports into a thorough, evidenced report on what the framework should change — read-only, single-pass, proposes only
---

# Field study

The instrument for a reflection run whose evidence is **consuming
projects**, not this repository. It reads the field-report tier,
works out what the framework actually did in projects that used it,
and produces one comprehensive report of what should change.

Source-only. It is this repository's own procedure for improving the
product, and it reads `self/`, so it is not distributable as written
(root `AGENTS.md` → "The product tree is protected"). Distribution as
a framework verb is deferred by standing policy — see "Filing and
governance" below.

## Where it sits

- `pm_skills/prompts/field-report.md` — what a **consuming project**
  runs to produce evidence and hand it upstream.
- `self/field-reports/README.md` — where that evidence is filed, in
  what shape, under which lane.
- **This** — what the maintainer runs over the collection. A field
  report is input; this turns it into a verdict.
- `self/REFLECTION.md` — the practice that decides *when* a run
  fires, what evidence gates it, and what may be done with the
  output. This prompt does not restate those rules; it obeys them.
- `self/evaluations/` — where the finished report is filed, as a
  dated evaluation, **after** the read-only posture ends.

The distinction that matters: a reflection run may be triggered by
volume, a model change, or an incident. This instrument is for the
trigger that is worth the most — *first month of evidence from a new
consuming project* — and it is the only shape of run that satisfies
`self/REFLECTION.md`'s self-reference countermeasure without a
declared discount.

## Posture

Run under `pm_skills/prompts/read-only.md`. That posture carries the
no-write contract, the command-isolation rules, the start-and-end
integrity check, the confidence grading, and the sanction for running
a single autonomous pass without gates. Do not restate it here; declare
it at the top of the report and prove it at the bottom.

Four deltas apply to this study specifically.

- **The evidence is immutable.** Field reports are filed verbatim.
  Never correct a typo, normalise a heading, re-redact, or add a
  missing header to a report while studying it. A report that is
  malformed is itself a finding about
  `pm_skills/prompts/field-report.md`; repairing it destroys that
  finding and edits the evidence at the same time.
- **Consuming projects are out of bounds entirely.** Do not open,
  clone, pull, or run anything in a consuming project's own
  checkout, even read-only. The study runs on the filed copies. If
  the filed copy cannot answer a question, that is a gap in the
  tier, and the gap is reported — it is not a licence to go and
  look.
- **The local lane leaves no quotations.** Evidence under
  `self/field-reports/*/local/` is gitignored because it cannot be
  public. The report is public. Cite local material by path and
  carry over only the finding, never a third party's words and never
  a detail that identifies a person or a client.
- **Nothing is written into `self/` during the run**, including the
  report. The report is drafted outside the tree. Filing it is a
  separate step that ends the posture.

## Evidence gate

`self/REFLECTION.md` → "Evidence gate" governs. Two additions.

**Declare the weight of the evidence before analysing it.** State,
in the report's first section: how many projects, over what span,
built by how many distinct people, at which framework versions. Then
state what that population cannot show. The current tier is the
maintainer's own projects, which means it can demonstrate that a
prompt gets skipped and cannot demonstrate that a stranger would
fail to learn it. A study that does not say this out loud will
over-read its own evidence within two sections.

**Empty or thin inputs → stop and say so.** No new reports since the
last study is a complete and valid outcome. Reflection without fresh
evidence only polishes the mirror.

## Read order and cost

The tier is deliberately cheap at the top and enormous at the
bottom. Read in this order and stop at the point where the next
tier's cost exceeds what the remaining questions are worth. State
where you stopped.

| Order | Material | Cost | What it settles |
| --- | --- | --- | --- |
| 1 | `README.md` Projects table | trivial | Which projects, which lane, which version, install path |
| 2 | `note` reports | low | Analysis a previous run already did — read before redoing it |
| 3 | `export` of memory, rulebooks, git log | moderate | Almost every mechanical count in the dimensions below |
| 4 | `export` of review artefacts, end-user evidence | moderate | Outcome, and whether the work was any good |
| 5 | Session logs in the `self/field-reports/*/local/` lane | very high | Only what nothing above can answer |

Session logs are where a study drowns. They run to tens of thousands
of messages per project. **Never load them wholesale.** Go to them
with a named question and a grep, take the answer, and come back.
If a question needs a full read of a log to settle, it is cheaper to
record it as unresolved than to spend the run on it.

The counts in tier 3 are the backbone of the study, and they are
mechanical — `git log`, `wc`, and reading a table. Do them
completely before forming any opinion. An impression formed from
session logs and then supported by selected counts is the most
common way this study goes wrong.

## Phase 1 — Start state

Record, and keep for the closing comparison: this repository's HEAD
SHA and `git status --porcelain` in full; the current
`pm_skills/VERSION`; the top `pm_skills/CHANGELOG.md` heading; the
date of the last study in `self/REFLECTION.md` → "Run log"; and the
list of report files in the tier, with their dates, so a report
added mid-run is visible rather than silently included.

## Phase 2 — Corpus ledger

One row per project, built from the reports and nothing else. This
is the table every later claim is checked against.

| Field | Source |
| --- | --- |
| Slug, lane (tracked / local) | tier README Projects table |
| Version at each report | the `pm-skills=` header — the join key |
| How that version was reached | upgrade walk, fresh install, or reinstall |
| HEAD SHA the exports were taken at | export headers |
| Report types present, and dates | filenames |
| Report types **absent** | the closed type list in the tier README |
| Span of evidence | earliest to latest report date |

The absent types are as informative as the present ones. A project
with exports and no `note` has produced raw material nobody has
read; a project with no `incident` has either had none or recorded
none, and those are different facts.

## Phase 3 — Date everything against the release

Do this before any dimension work. It is cheap and it is where the
false findings are.

Every report describes the framework **as it was at that report's
`pm-skills=` version**. Between then and now the framework has
shipped releases. For each candidate observation:

1. read the observation against `pm_skills/CHANGELOG.md` from that
   version forward;
2. classify it as **live** (the behaviour is still current),
   **fixed** (a named release changed it — cite the version), or
   **changed shape** (still present, but a later release altered
   what it costs);
3. drop the fixed ones, with the citation, into the report's stale
   register rather than deleting them silently.

`pm_skills/prompts/findings.md` makes the same point about code
review, and it applies harder here: field evidence is by
construction older than the framework it describes. A study that
skips this pass will re-propose things that shipped last week.

Where a report's header has no version, or says the framework was
reinstalled rather than upgraded, say so and treat every observation
from it as version-unanchored. Do not guess the version from dates.

## Phase 4 — Dimensions

Twelve questions the tier can actually answer. For each: the
question, what to count, and how the count lies. Cover all twelve
explicitly — a dimension with no evidence is recorded as *no
evidence*, never omitted, because omission reads as a clean result.

### D1 Arrival

**Question.** How did the framework get into the project, and how
did it reach the version it is on?

**Count.** Fresh install / port from a previous line / reinstall /
upgrade walk, per project, from the git log export and the tier
README. Time from install to first shipped item.

**The trap.** A reinstall and an upgrade both end at the right
version. Only the git log distinguishes them, and the difference is
the whole point of `pm_skills/prompts/upgrade.md`.

### D2 Verb firing

**Question.** Which prompts and integrations actually fired, and
which were invoked but abandoned part-way?

**Count.** Invocations, completions, and abandonments per verb.
Count an explicit invocation or a declared-and-executed run; do not
count a file merely being read.

**The trap.** A verb whose rules were absorbed into the project's
`AGENTS.md` fires without ever being named. Behavioural
classification is legitimate — label it as inference, not as an
invocation count.

### D3 Silence

**Question.** Which verbs have never fired **in any project**?

**Count.** The distributed prompt and integration list against every
project's firing record. Total silence across the whole tier is the
signal; one project's silence is not.

**The trap.** Three readings, and they need different remedies:
the verb is not needed (retire it), it is needed but undiscoverable
(fix the entry point, not the verb), or the project's shape makes it
inapplicable (no finding). Deciding which requires the substitution
evidence in D4 — never conclude silence alone.

### D4 Substitution

**Question.** When a project skipped a prompt, what did it do
instead?

**Count.** For each skipped verb, the observed alternative: an ad-hoc
routine, an IDE feature, a hand-rolled script, an external tool, or
nothing. Note anything the project **built** to sit alongside the
framework.

**The trap.** This is the most valuable dimension and the easiest to
skip, because it needs judgement rather than counting. A substitute
is a specification: it shows the need was real and the framework's
answer was not reachable, too costly, or worse. A project that wrote
its own script is describing a missing feature precisely.

### D5 Close fidelity

**Question.** Is the close ritual actually run?

**Count.** From commit messages alone: commits carrying a `Verify:`
line, commits naming a backlog ID, `Close: lite` trailers, commits
per shipped item, and sessions ending with mutations uncommitted.

**The trap.** Commit messages are a proxy, not the thing. A green
gate that was run and not recorded looks identical to one never run.
Report the proxy as a proxy and say which direction it errs.

### D6 Memory behaviour

**Question.** What does project memory do over months of use?

**Count.** Word counts per memory file against
`pm_skills/memory-policy.md`; open backlog items; live decision-log
entries; trajectory length; wish-list depth; number and date of
archive rotations. Run `scripts/check-memory.mjs` against a filed
memory export where the export is complete enough to support it, or
say why it is not.

**The trap.** A project that has never rotated may be young,
disciplined, or ignoring the budget. Separate the three with the
git-log dates before drawing any conclusion about the policy.

### D7 Rulebook divergence

**Question.** What did each project change in the rulebooks it was
given?

**Count.** Diff each filed `AGENTS.md`, `UI-STANDARDS.md`, and
`DEV-INFRASTRUCTURE.md` export against the distribution template at
that project's version. Classify every divergence: filled-in
placeholder, addition, deletion, or rewrite.

**The trap.** This is the highest-value diff in the tier and it is
almost never done, because it requires checking out the template at
an old version. Additions show what the template lacks. **Deletions
and rewrites show which shipped rule a real project judged wrong** —
the strongest retirement evidence available anywhere.

### D8 Upgrade landing

**Question.** When an upgrade did happen, did the CHANGELOG's
Upgrade actions match what the project had to do?

**Count.** Actions listed in the release entry against actions
evidenced in the project's git log and any `upgrade` report:
performed, not needed, missing from the entry, or wrong.

**The trap.** With no upgrade walks in the tier, this dimension
reports *no evidence* — and that absence is itself the D3 finding
about `pm_skills/prompts/upgrade.md`. Record it in both places
rather than letting the empty dimension imply the machinery works.

### D9 Cost and attention

**Question.** What does the framework cost a project per session?

**Count.** Where session logs allow it cheaply: session lengths,
message counts, how much of the tiered read policy is actually read
at session start, and which memory files were opened.

**The trap.** Cost is only meaningful against benefit. Never report
a context figure without the outcome from D11 beside it, or the
study will recommend shrinking whatever is largest.

### D10 Incidents

**Question.** What went wrong that the framework caused, permitted,
or failed to catch?

**Count.** Prose-skips, gate misfires, a close that went wrong, a
prompt that mis-served the project, data or work lost.

**The trap.** Distinguish the framework's fault from the project's.
A rule that was followed and produced a bad outcome is a framework
finding; a rule that was ignored is a D3 or D4 finding about
reachability, not a defect in the rule's content.

### D11 Outcome

**Question.** Did the project ship, and would it have shipped
without the framework?

**Count.** Shipped items, releases, deployments, and any end-user
evidence filed.

**The trap.** The counterfactual is unknowable from this tier. Say
so plainly. The honest form is "the project shipped N items while
running the framework", never "the framework delivered N items".

### D12 Evidence health

**Question.** Is the tier producing reports this study can use?

**Count.** Reports missing the header, missing the `pm-skills=` join
key, missing the redaction counts; exports filed with no
accompanying `note`; projects with a directory and no evidence.

**The trap.** Findings here are about
`pm_skills/prompts/field-report.md` and the tier README, and they
are the ones a study is most tempted to fix quietly in passing.
Report them; the posture forbids fixing them.

## Phase 5 — Cross-project consistency

Findings gain their force from repetition across independent
projects. Grade every candidate:

| Grade | Basis | What it licenses |
| --- | --- | --- |
| **Framework-level** | Seen in three or more projects, or in every project where it could occur | A change to the product |
| **Pattern** | Seen in two independent projects | A candidate for triage |
| **Hypothesis** | Seen in one project | A wish-list line, watched for a second sighting |
| **Local** | Explained by that project's own shape | No framework action; record why |

Independence matters more than the count. Reports produced by the
same person, in the same week, with the same tooling, are not three
witnesses. Where projects share an origin, say so and grade down.

Also run the reverse check: where two projects met the same
situation and behaved **differently**, the difference is the
finding. Same version, same prompt, opposite outcome means the
prompt's behaviour depends on something it does not name.

## Phase 6 — Adversarial pass

Every surviving finding gets, before it reaches the report:

- **A lighter alternative.** What is the smallest change that would
  address it — including a one-line wording change, or moving a
  sentence to where it is actually read?
- **Cost honesty.** What does the proposed change cost every
  consuming project at every session, forever? A prompt is read far
  more often than it is written.
- **A failure mode.** How does this change make things worse if the
  evidence behind it turns out to be one project's idiosyncrasy?
- **The do-nothing case.** State the argument for leaving it, then
  say why it loses. A finding that cannot survive its own best
  counter-argument is not ready.

Then consolidate: findings sharing a root cause become one finding
with several symptoms. Do not inflate the report by splitting one
cause into many observations, and honour the finding and candidate
caps in `self/REFLECTION.md` → "The three passes, with caps". A
thorough report is thorough in its evidence and its coverage, not in
its finding count.

## Phase 7 — Retirement

Name at least one thing the framework should **stop** doing, or
record explicitly that no safe retirement exists — which is itself a
finding about the evidence layer.

This is a standing requirement of `self/REFLECTION.md` and it exists
because of a specific, near-certain failure: a study whose only
outputs are additions grows the framework every time it runs, and
every addition is paid for at every session in every project.
D3 and D7 are the two dimensions that produce retirement evidence.
Look there first.

## Phase 8 — Close the posture

Re-record HEAD SHA and `git status --porcelain`; compare with
Phase 1; report the verdict. If the tree changed, report it
prominently at the top and **do not repair it** — including a new
report file that appeared in the tier mid-run.

Then reconcile coverage: every project in the tier and every
dimension above appears exactly once in the coverage matrix, at one
of the grades in `pm_skills/prompts/improvement-waves.md` →
"Coverage ledger". "Thorough" means that table reconciles — not that
everything was read.

## Finding shape

Every finding in the report carries:

- **ID and title** — short, and stable enough to cite later.
- **Dimension** — D1–D12.
- **Consistency grade** — framework-level / pattern / hypothesis /
  local, from Phase 5.
- **Severity** and **confidence**, separately and never combined.
- **Evidence** — report path and the specific line, table, or count.
  Every claim traces to a filed report. An observation that traces
  only to this repository is marked **self-hosted** and discounted.
- **Version anchor** — the `pm-skills=` version it was observed at,
  and its Phase 3 verdict (live / fixed / changed shape).
- **What it costs now** — the concrete consequence in a project.
- **Remedy**, with its lighter alternative and its per-session cost.
- **How anyone would know it worked** — the observation in a future
  field report that would confirm or refute the change. A remedy
  with no future observable is a preference.

Severity, in this domain:

- **Critical** — the framework caused loss of work, memory, or
  correctness in a real project.
- **High** — a core loop is being routinely skipped or worked
  around, or a shipped rule is measurably making projects worse.
- **Medium** — real friction with a known workaround; a rule that is
  followed but does not pay for itself.
- **Low** — worthwhile improvement, no current harm.
- **Informational** — a positive finding, or a clarification.

Confidence, in this domain:

- **High** — counted mechanically from filed exports, reproducible
  by anyone reading the same files.
- **Medium** — read from session evidence or behaviour, consistent
  across projects, dependent on interpretation.
- **Low** — a plausible reading of thin or single-project evidence.

## What a remedy may be

Every finding's remedy is chosen from this list, and the first three
are preferred over the last:

- **Retire** — delete a prompt, a rule, or a section. Nothing is
  cheaper for consuming projects.
- **Move** — the content is right and unreachable; put it where it is
  already being read.
- **Shrink or clarify** — same rule, less of it, or plainer wording.
- **Change the default** — where the evidence shows a gate is
  rubber-stamped or a mode is always overridden.
- **Add** — a new rule, section, or prompt. Requires framework-level
  or pattern grade; a hypothesis never justifies an addition.
- **Tooling** — a script or check. Weigh against the zero-dependency
  and minimal-tooling constraints in `self/project/brief.md`.
- **Leave unchanged** — a first-class outcome. Record the reason so
  the next study does not re-litigate it.

## What the tier has already shown

Illustrations of the **shape** of a real finding, not conclusions to
confirm. Re-derive everything; a study that only re-finds these has
not run.

- A verb can ship, be documented, be correct, and never once be
  invoked — the evidence for that is an absence, and absences are
  only visible if you enumerate the verb list and tick it off.
- Projects reach the current version by erasing and reinstalling.
  The end state is identical; the process the framework designed was
  not used, and only the git log shows it.
- An analysis note attached to an export is worth more than the
  export, and it is the part most often missing.

## Report contract

One Markdown document, drafted outside the tree, in this order.
Sections with no evidence are retained and marked *no evidence*.

1. **Executive summary** — the overall verdict, the evidence-weight
   declaration, the five most important findings, at least one named
   retirement, and the integrity statement.
2. **Corpus and method** — the Phase 2 ledger, the read order
   actually used, and where reading stopped.
3. **Read-only result** — start and end SHA and status, the verdict,
   commands not run and why.
4. **Coverage matrix** — projects × dimensions, graded, reconciled.
5. **Version baseline and staleness register** — the Phase 3 pass,
   including observations dropped as fixed, with citations.
6. **What is working** — framework behaviour the evidence shows is
   load-bearing and must be preserved. A study that is entirely
   negative will be read as an opinion rather than a measurement.
7. **Findings** — prioritised, in the shape above, within the caps.
8. **Root-cause themes** — the two or three causes behind them.
9. **Silence and substitution register** — every verb that never
   fired, and what was used instead.
10. **Retirement candidates** — with the evidence for each, or the
    explicit statement that none is safe.
11. **Cross-project consistency** — the Phase 5 grades, and the
    same-situation-different-behaviour cases.
12. **Cost account** — what the framework costs per session, beside
    the outcome evidence.
13. **Candidates for triage** — at most five, written in this
    repository's ticket grammar so they can be ordered against
    everything else.
14. **Sequencing** — whether the candidates interact enough to need
    `pm_skills/prompts/improvement-waves.md`, or can go through
    normal triage individually.
15. **Unresolved uncertainties** — kept as questions. For each: what
    is unknown, what was inspected, the safest current assumption,
    and which findings depend on it.
16. **What this study could not see** — the population's limits, the
    questions that need a project built by someone else, and what
    the next field report should capture to close them.
17. **Handover** — the five most valuable proposed changes, and an
    explicit statement that nothing was applied.

## Filing and governance

The study **proposes**. It never edits a prompt, a template, or a
memory file, and it never advances a maintainer-owned gate.

Filing is a separate step, and it is where the read-only posture
ends — exactly as `pm_skills/prompts/read-only.md` provides: the
exemption covers looking, never changing, and does not travel with
the output.

1. File the report verbatim as `self/evaluations/YYYY-MM-DD-field-study-<n>.md`.
2. Add the run to `self/REFLECTION.md` → "Run log": date, trigger,
   projects, findings, candidates, retirement named.
3. Put the candidates through normal triage —
   `self/project/wish-list.md`, or straight to
   `self/project/backlog.md` if one is scoped enough to be workable.
4. Record any adopted policy in `self/project/decision-log.md`.

Everything after step 1 is ordinary work under ordinary gates. A
change to a distributed file is a release, with VERSION, CHANGELOG
upgrade actions, and MANIFEST/GUIDE sync
(`pm_skills/prompts/release.md`).

Distribution of this instrument itself is deferred: `self/REFLECTION.md`
defers the reflection practice's distribution until two self-hosted
runs have happened, and this prompt reads `self/` throughout, so a
distributed version would need the evidence tier abstracted out of
it first. Revisit when a second consuming project starts collecting
reports of its own.

## How this study goes wrong

- **It re-finds what is already fixed.** Phase 3 exists for this and
  is the first thing dropped when a run is long.
- **It grows the framework.** Every finding gets an addition, nothing
  is ever retired, and the per-session cost rises after every study.
- **It generalises from one project.** Phase 5's grades exist to stop
  it; the countermeasure is worthless if the grades are assigned
  after the recommendation is written.
- **It reads the session logs first.** They are vivid, enormous, and
  unrepresentative. The mechanical counts come first.
- **It treats absence as approval.** A dimension with no evidence is
  reported as no evidence, never as a clean result.
- **It tidies the evidence.** A malformed report is a finding, and
  fixing it in passing both destroys the finding and breaks the
  posture.
- **It confuses the maintainer's own habits for a user population**,
  because every project in the tier is currently one person's.
