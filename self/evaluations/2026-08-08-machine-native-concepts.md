# Machine-Native Concepts — Extended Assessment

<!-- self/evaluations/ — cold tier, never auto-read. Companion to
     2026-08-08-machine-native-audit.md, drafted the same day.
     Status: ASSESSMENT. Where verdicts, grades, or wave placements
     here differ from the audit, THIS file supersedes it.
     Continued in 2026-08-08-machine-native-synthesis.md (design +
     reflection process; confirms Wave 1, adds the fitness function).
     Nothing has been parked or promoted; triage still pending. -->

## Assessment standard

The audit argued *for* its concepts; this pass argues *with* them.
Each concept is stress-tested four ways: feasibility in this
specific repository (not a hypothetical one), cost honesty
(including maintenance and attention, not just build effort),
lighter alternatives (including doing nothing), and failure modes
(including the second-order ones). Where a concept survives intact,
that is said plainly; where it shrinks, moves, splits, or dies, the
change is stated in its verdict and collected at the end under
"What changed under assessment". Grades keep the backlog convention:
Impact / Difficulty / Risk / OpΔ.

Two facts recur enough to state once. The framework has shipped 45
releases to 4.0.0 with one deep consuming deployment (~200 shipped
items) plus a year's self-hosting — a real but thin evidence base.
And the current tooling surface is five small Node scripts — the
repo's identity ("overwhelmingly Markdown, zero runtime
dependencies, minimal dev tooling") is a constraint this assessment
treats as binding, not decorative.

## Part I — the framing concepts

### I.1 The prose-DBMS diagnosis

The lens — a database, scheduler, and operations manual implemented
in prose, executed probabilistically — sorts the framework's parts
well. Two caveats survive contact with the tree.

**Pedagogy is not mechanism.** A large fraction of the framework —
scoping, design options, validation, the bug protocol — is not
state management at all; it is a curriculum for judgement. The
diagnosis must not license "mechanise everything": the prose that
teaches judgement is the product's core value, and rung (c) of the
enforcement ladder is where most of the framework rightly lives.
The primitives table covers the scaffolding around the judgement,
not the judgement.

**The base rate is unmeasured.** The case for enforcement rests on
three recorded incidents across ~200 shipped items and a year of
self-hosting. If the true prose-skip rate is that low, heavy armour
is over-engineering; if incidents are under-recorded — plausible,
since a prose-skip needs a human to notice it — it is worse than it
looks. Either way, the honest first move is measurement, which is
what Wave 1 is.

**Verdict:** adopt the lens; carry both caveats into every
per-concept verdict below.

### I.2 The ceremony ratchet — refined

The audit claimed ceremony only grows. The repo's own history
contests that: checkpoint mode exists because full gating proved too
heavy; the aggregate hot-set cap was removed; the size check grew a
fast path; lite close exists. Ceremony added as *process design*
demonstrably gets pruned.

What ratchets is ceremony born from *failure*. Removing a
failure-born rule feels like re-opening the wound, so the staged-set
echo, the arrival procedure, and their kin are effectively
permanent prose. The refined claim: mechanism should preferentially
replace **failure-born** prose — that is where the ratchet actually
binds, and it is exactly MEM-CHECK's target list.

**Verdict:** keep, refined as above.

### I.3 The three forces — plus a fourth

The audit sorted human-looking design into human-owned,
portability-constrained, and human-constrained. Assessment adds a
force it missed: **model-capability compensations**. Some ceremony
encodes neither human limits nor portability but the weaknesses of
the models the framework grew up on: the drift-correction
one-liners ("re-ground in codebase", "reset to plan"), the
insistence on one-line assumption statements, arguably part of the
validation stage. These compensations age as models improve, and
the framework has no procedure for noticing that one has become
dead weight — a compensation never announces its own obsolescence.

The evaluation harness is that procedure: replay scenarios with a
compensation removed; if behaviour holds across the model matrix,
retire the paragraph. Call it **compensation retirement**, and make
it a standing job of the harness, not a one-off.

**Verdict:** adopt the fourth force; add compensation retirement to
the harness's job description.

### I.4 The five probes — one overlap, one addition

Probes 2 (named primitive) and 4 (obedience/enforcement) overlap: a
named primitive usually implies enforceability. Acceptable — they
catch different halves (data shapes versus events).

Worth adding: a **firing-rate probe** — how often does this
mechanism actually trigger, measured from transcripts and git
history? The security banner, the ageing surfacing, and the
doc-deltas nudge are priced at every-session cost for rare firings.
A rule's prose cost should be justified by its firing rate or by an
explicit severity claim; today neither is measured. This probe also
applies to the gates themselves (see Part III).

**Verdict:** keep five, add the sixth; run it once MEM-CHECK and
the transcript corpus make firing rates countable.

### I.5 Evidence-gated waves — two lanes

Gating everything on harness evidence over-corrects. A
one-paragraph prompt amendment, or an import-placement experiment,
costs less to *try* than to eval-gate — the repo's own
reversibility instinct applies. Two lanes:

- **Cheap-reversible:** try it in self-hosting, observe, keep or
  revert. No harness required.
- **Structural:** schema changes, autonomy changes, anything
  distributed that alters behaviour at scale — eval-gated.

**Verdict:** adopt two lanes; Part IV re-lanes the candidates.

### I.6 New: the mechanism ratchet

The machine-native programme has a symmetric hazard the audit did
not name: tooling accretes by enthusiasm as surely as ceremony
accretes by failure. Five scripts today; the audit's full candidate
list could double that in a repo whose gate checks prose, not code
behaviour — and scripts rot faster than prose when nothing
exercises them. The discipline that keeps the programme honest:

> **Every script must name the prose it retires.** A mechanism that
> does not delete ceremony is inventory, not progress.

MEM-CHECK passes easily (it retires the fiddly half of end-of-task
step 4 and of Diagnose). The evaluation harness retires nothing
directly — it pays rent in caught regressions and retired
compensations, which is precisely why it must stay small and can be
pruned like anything else if it stops paying.

**Verdict:** adopt as a standing rule of the programme.

## Part II — the candidates, extended

### C1 — MEM-CHECK (memory validator)

**What it is.** A dependency-free script validating project memory:
ticket grammar, hygiene, lite-close trailers, budgets with printed
derivations.

**Design, concretely.** Split the checks into **structural** (exit
1: grammar violations, `[x]` items in the backlog, ticket orphans,
unparseable trailers since the last reconcile marker) and
**advisory** (exit 0 with WARN lines: budget overruns, ages). This
preserves existing policy — budgets propose maintenance, they never
block work — and respects the session-start principle that a check
that blocks daily gets disabled.

One design problem the audit missed: the budget numbers live in
`pm_skills/memory-policy.md` prose, and the single-source rule
forbids restating them in code. The clean answer is a small
machine-readable block (fenced JSON) *inside* memory-policy.md that
the script reads and the surrounding table explains. The canonical
copy stays in one file and becomes dual-readable — itself a
miniature state/view split, and a cheap dogfood of C8 before C8 is
attempted.

Distribution follows the repo's own ladder: prove it in `scripts/`
(source-only, no release); promote a generic fork to the scaffold
once a consuming project wants it (a release). The generic fork
drops repo-specific grammar (grades) and warns rather than fails on
adopt-tier projects whose backlogs predate the template grammar.

**Value.** Mechanises the greps a close currently performs by hand;
supplies the oracle every evaluation scenario needs; partially
answers the wish-list "check the commit workflow" line via trailer
verification.

**Costs and risks.** (a) Grammar ossification: a checker freezes
the ticket format; mitigate by failing only structure and warning
on style. (b) False confidence: it validates the *form* of memory,
never the truth of it — a well-formed decision entry can still be
wrong; the script's output header should say so. (c) Code↔prose
drift between the JSON block and its explanatory table — accepted
and noted where it can drift.

**Alternatives.** Custom markdownlint rules (worse: couples memory
validation to lint-tool versioning). Doing nothing (keeps the
manual ceremony and leaves evaluations oracle-less).

**Verdict: adopt — Wave 1, first.** Grades hold:
High / Medium / Low / Medium. The highest certainty-per-effort in
the portfolio.

### C2 — EVAL-SCEN (first behavioural scenario, spike)

**What it is.** A spike to produce one replayable scenario:
fixture + ask + property assertions.

**Design, concretely.** The fixture is a synthetic minimal project
(the README's houseplant tracker is the house example), built by a
script into a scratch location and git-initialised there — never a
nested working tree. The ask is one Start-B pick or one `next`
invocation. The runner drives a headless agent session — which
makes the harness **harness-specific by nature**: it evaluates
"pm-skills as executed by tool X on model Y". That is the point
(measure real behaviour), but it has a consequence the audit
skipped: the harness is maintainer infrastructure, source-only,
never distributed. Assertions run MEM-CHECK plus scenario-specific
properties — item evicted, trajectory line appended, decision entry
present, and one governance property worth calling out: *commit
proposed but not executed*.

**The sharpened bar.** The audit's spike question ("does transcript
plus state reduce to a scenario?") was too soft. The real question:
**can a planted regression be caught?** Remove the eviction
instruction from a copy of end-of-task.md, run the scenario, and
require the assertions to go red. A scenario that cannot detect a
planted regression is decoration, and the spike should say so if
that is what it finds.

**Costs and risks.** Real token cost per run (a full task run is
dollar-scale, not cent-scale); model non-determinism (mitigated by
structural properties, never wording assertions); fixture drift.

**A rider to adopt regardless of the spike's outcome.** Record the
session's starting commit SHA in the transcript header. One line
added to the transcript convention turns every saved transcript
into a replayable scenario seed (today a transcript records the
trajectory but not the starting state). This is the cheapest
enabler in the whole programme.

**Verdict: spike — Wave 1**, with the planted-regression bar.
Grades hold: High / Medium / Low / Low.

### C3 — EVAL-HARNESS

**What it is.** The scenario corpus, runner, and a release
regression line.

**Design, concretely — right-sized and reordered.** At most seven
scenarios, and the assessment reorders which come first. The audit
under-weighted the framework's highest-stakes mechanical promise:
**upgrade.md** — "never touches your memory, never overwrites your
customisations" — executed by every consuming project at every
release, currently tested by faith. The fixture: a project on
version N−1 with populated memory and a deliberately customised
rulebook section; run the upgrade; assert memory byte-identical,
customisation preserved, VERSION and CHANGELOG state correct. That
single scenario probably justifies the harness. After it: an
end-of-task close, a Reconcile over planted lite trailers, a
Start-B pick, a `next` loop.

Governance is advisory-first: a failing evaluation warns on release
and graduates to blocking once trust is earned — the repo's own
warn-then-block pattern. Matrix discipline: routine regression runs
are scenarios × one or two models; the full prompt-version ×
model-tier matrix is an occasional manual study, never CI. The
harness also carries the fourth-force job from I.3: compensation
retirement studies.

**Costs and risks, honestly.** Evaluation suites on solo-maintained
projects die of maintenance more often than they fail technically.
If the harness costs more attention than the regressions it
catches, it becomes stale infrastructure — worse than nothing,
because it adds false confidence *and* rot. Mitigations: the
seven-scenario cap; property-only assertions; scenarios seeded from
real transcripts (the SHA rider) rather than invented; and the
mechanism-ratchet rule — the harness pays rent or gets pruned.

**Verdict: adopt after EVAL-SCEN passes its bar — Wave 2.** Upgrade
scenario first. Grades hold: High / High / Medium / Medium, with
the maintenance warning attached.

### C4 — CTX-CACHE → reframed as import placement

**What the assessment changed.** The audit framed this as "stable
ordering of session-start reads". Working the mechanics through
changes the frame: content read mid-conversation is poorly
cacheable across sessions *no matter how stably ordered*, because
everything before it — the user's ask — differs per session. The
real lever is **placement**: content that precedes the variable ask
(the global-rules position) is the cacheable, deterministic,
read-once position. The framework already uses that vehicle for
`AGENTS.md`; tools with rule imports (Claude Code's memory imports
among them) can carry the stable hot set — brief, architecture,
conventions — the same way.

Three payoffs, of which cache pricing is the *smallest*:

1. **No re-read round-trips.** The hot files stop being repeated
   tool calls with duplicated result tokens, session after session.
2. **Deterministic load.** The hot set cannot be forgotten,
   mis-ordered, or partially read — retiring a paragraph of
   session-start ceremony (the mechanism-ratchet rule is satisfied).
3. **Prefix-cache reuse** across turns, and across sessions within
   TTL windows on API-billed autonomous loops.

The marginal cost of always-loading is zero *by policy* — these
files are hot-tier already; the framework has committed to paying
for them every task.

**Risks.** Rules-space bloat competing with instruction-following
(bounded: the three files carry small budgets); mid-session
staleness if architecture.md changes (no worse than today);
tool-specificity (an adapter on the portability ladder — the paste
flow is untouched).

**Spike shape.** Measure the share of an autonomous run's input
spent on hot-set re-reads; rerun the same task with imports;
compare cache-read share and total cost. Deliver the wish-list
question a number.

**Verdict: spike — promoted to Wave 1** (cheap-reversible lane),
reframed as import placement with cache as one of three payoffs.
Revised grades: Med-High / Low / Low / Low.

### C5 — BUDGET-DERIVE → demoted and folded

**What the assessment changed.** The audit skipped the question of
which budgets are load-bearing. They come in three kinds: read-cost
budgets on hot files (matter); hygiene budgets (structural — now
MEM-CHECK's job); and archive-cadence budgets on files whose read
cost is already bounded by sectional access — the decision-log is
read latest-10 regardless of file size, trajectory is warm. For the
third kind, deriving the number is polish: the file's size barely
affects any session's bill. Token denomination is a units cleanup.
Neither justifies a standalone item.

**Verdict: fold into MEM-CHECK phase 2** (the script already prints
derivations; extend the pattern and the units there). If held
standalone anyway: Low-Med / Low / Low / Low. The audit over-graded
this one.

### C6 — OPT-PROTO → down-scoped, and better for it

**What the assessment changed.** Building options beats arguing
about them only when the options differ on an **empirically
checkable claim** — does the API support X, is approach A fast
enough. Most design-option splits in this framework's actual
history are strategic (where responsibility lives,
template-versus-absorb): building three artefacts illuminates
little, and the human pick then requires *reading* three artefacts,
raising the cost of the gate the concept meant to enrich. Spike
mode already covers pre-design empirical questions; the uncovered
case is narrower — a small empirical check *inside* the design
stage.

The down-scoped form is one paragraph added to
`pm_skills/prompts/design-options.md`:

> When options differ on an empirically checkable claim and the
> check costs roughly fifteen minutes of build or less, run the
> check in a scratch location before presenting. Present measured
> comparisons, not argued ones — and say which claims were checked
> and which remain argued.

No new mode, no worktree machinery, no gate change. Separately:
best-of-N *whole implementations* (parallel candidate selection) is
a different concept, and this framework's solo-review economics
genuinely does not want it — N implementations demand N reviews or
a blind pick. Named and declined.

**Verdict: adopt the amendment** — cheap-reversible lane; a small
distributed change (minor release). Revised grades:
Medium / Low / Low / Low. The audit's mode-with-worktrees version
is retired unless the fifteen-minute checks prove to want isolation.

### C7 — TIER-ASSEMBLY → mostly already built; residue renamed

**What the assessment changed.** The audit under-credited the
existing design. The sectional reads *are* task-conditional
assembly, hand-rolled per file: backlog Active-only, decision-log
latest-10-headings-then-relevant-bodies, file-map by touched
section, ticket files only for the active item. The only
unconditional whole-file reads are brief, architecture, and
conventions — small identity documents that arguably *should* be
unconditional, and that C4 makes free. The framework is roughly 80%
task-conditional already; the audit proposed rebuilding the 80% to
chase the 20%.

The genuinely missing capability is different: **recall over cold
storage**. Grep is keyword-lucky; a mature project's archive holds
precedent ("we tried this in March, it failed for reason Y") that
heading-grep misses. Embedding search fights the zero-dependency
rule; the cheap version is an agent-side pattern — richer archive
INDEX summaries plus a search-then-skim pass; the expensive version
waits for evidence that missed precedent actually bites.

**Verdict: retire TIER-ASSEMBLY as scoped; replace with
ARCH-RECALL** — Icebox, [blocked: a consuming project reports
missed-precedent pain]. Grades for the replacement:
Medium-when-triggered / Medium / Low / Low.

### C8 — BACKLOG-STATE → held, with a sharper design and triggers

**Weighing the value channels.** Mechanical validation: mostly
captured by MEM-CHECK on prose — this argument alone no longer
justifies the split. Mechanical merge for parallel sessions: real,
but the incident rate is currently unmeasured and probably low.
A write target for generated backlogs: real and growing — two of
the maintainer's seven fresh wish-list lines (transcript-to-backlog
and a ticket-writing command) want exactly this. Typed queries for
ages and flags: nice, minor.

**The design contribution.** The schema the audit hand-waved
already exists in the tree. `tickets/<ID>.md` is a per-item file
with a lifecycle — created, updated, deleted on ship. Generalise
it: **every item becomes a ticket file with a small frontmatter
block** (id, status, flags, dates, milestone, grades — eight
fields, deliberately not a specification language), and
`backlog.md` becomes a **generated index**, exactly as
`file-map.md` is a generated skeleton with preserved prose. One
file per item makes parallel merges near-trivial (disjoint files),
Reconcile writes records, the view regenerates, and humans may
still hand-edit the view: MEM-CHECK detects view/record divergence
and the next session folds it back — self-healing, not forbidden.

**Costs, honestly.** This touches nearly every workflow file that
names the backlog — session-start, task, end-of-task,
memory-maintenance, review, init, adopt — a major release with
upgrade actions for every consuming project, plus real sync
machinery, plus schema-bikeshed hazard.

**Verdict: Icebox with two explicit triggers** — adopt when either
(a) parallel-merge incidents are actually observed and counted, or
(b) the backlog-generation process is commissioned and wants a
write target. Not adopted for validation alone. Grades hold:
High / High / Med-High / Medium.

### C9 — JANITOR → split in two

The audit's single concept conflates two governance classes.

**JANITOR-READ** — a scheduled background pass that *computes and
reports*: reconcile counts, ages, budget states, doc-deltas, into a
dated report file the next session reads instead of computing.
Compatible with every existing rule. Its value is modest at
interactive scale (the nags are cheap greps) and real at autonomous
scale (`next` on a schedule). It needs a staleness contract: the
report carries a timestamp, and a session finding it older than a
bound falls back to computing.

**JANITOR-WRITE** — auto-running maintenance verbs — crosses the
propose-first line the framework drew deliberately ("never
auto-run the reconcile; propose it"). If it ever comes, it should
come as **graduated autonomy per verb**: Reconcile first (parse and
append — lowest judgement), Prune later (moves files), doc-sync
perhaps never (protected docs are sign-off by definition). The gate
for each verb: harness-verified behaviour plus an explicit
maintainer sign-off recorded in the decision log.

**Verdict:** JANITOR-READ — Icebox, [blocked: an actual
autonomous-loop deployment]; Medium / Low-Med / Low / Medium.
JANITOR-WRITE — deferred behind the harness and per-verb sign-off;
not graded until then.

### C10 — PAR-BRANCH (the audit's orphan), examined and declined

The audit mentioned branch-per-session in F4 and Wave 4 but never
made it a candidate; the assessment closes the gap — and then
mostly declines it. Moving coordination from chat claims to
branches looks mechanical, but the merge problem does not vanish;
it moves. Two sessions appending to `decision-log.md` produce an
end-of-file conflict, and appends to the same location are git's
*weakest* merge case — the current handoff block resolves it more
gracefully than a conflict marker would. Branch-per-session earns
its keep only with long-lived parallel sessions, or after C8 makes
memory writes per-item files (disjoint, so merges become trivial).

The chat-claim protocol is cheaper than it looked from the audit:
a rare case where the prose mechanism out-engineers the mechanical
alternative at current scale.

**Verdict: defer.** Revisit only alongside BACKLOG-STATE, or on
observed claim-collision incidents.

## Part III — the keep-list, re-examined

- **The two gates.** Confirmed; C4 and C6 change the evidence
  presented *at* the gates, never the gates. One watch, via the
  firing-rate probe: a gate justified by trust can quietly become a
  gate justified by habit. How often does the human actually
  redirect at each gate? If scope approvals run near-100%
  rubber-stamp on some project, that project should be told —
  countable from transcripts.
- **Advisory, never locking.** Confirmed and *strengthened* by
  C10's finding: the chat-claim protocol currently out-engineers
  its mechanical replacement.
- **Append-only history.** Confirmed; it is also what makes the SHA
  rider and Reconcile possible. Protect it.
- **Spike mode.** Confirmed; C6's amendment is spike-thinking
  miniaturised into the design stage, not a rival.
- **Prose for the why.** Confirmed, with I.1's caveat sharpened:
  the decision log is the one artefact whose reader genuinely is
  both audiences. Leave it prose.
- **Compress-on-ship.** Confirmed as the view-side rule; the SHA
  rider quietly upgrades the store side — full-fidelity transcripts
  become replayable, not merely readable.

## Part IV — portfolio view

**Dependency spine.** MEM-CHECK supplies the oracle for EVAL-SCEN;
EVAL-SCEN's bar admits EVAL-HARNESS; the harness gates
JANITOR-WRITE, compensation retirement, and BACKLOG-STATE's
evaluation condition. Three riders are independent of the spine:
TRANSCRIPT-SHA, CTX-CACHE, and the OPT-PROTO amendment.

**Revised waves.**

- **Wave 1 — now.** MEM-CHECK (adopt); EVAL-SCEN [spike];
  CTX-CACHE [spike, reframed]; TRANSCRIPT-SHA (rider — one header
  line); OPT-PROTO amendment (small distributed change).
- **Wave 2 — after the spikes report.** EVAL-HARNESS (upgrade
  scenario first); MEM-CHECK phase 2 (absorbs BUDGET-DERIVE).
- **Icebox, with named triggers.** BACKLOG-STATE (merge incidents
  observed, or backlog generation commissioned); JANITOR-READ
  (autonomous-loop deployment exists); ARCH-RECALL
  (missed-precedent pain reported); PAR-BRANCH (paired with
  BACKLOG-STATE); JANITOR-WRITE (harness green + per-verb
  sign-off).

**Verdict table.**

| Concept | Audit position | Assessment verdict | Grade change |
| --- | --- | --- | --- |
| MEM-CHECK | Wave 1 | Adopt, first | none |
| EVAL-SCEN | Wave 1 spike | Spike, harder bar | none |
| EVAL-HARNESS | Wave 2 | Adopt post-spike, upgrade scenario first | none + warning |
| CTX-CACHE | Wave 2 spike | Spike, Wave 1, reframed as import placement | Impact ↑ Med-High |
| BUDGET-DERIVE | Wave 2 | Folded into MEM-CHECK phase 2 | Impact ↓ Low-Med |
| OPT-PROTO | Wave 3 | Down-scoped to a design-options amendment | Difficulty ↓ Low |
| TIER-ASSEMBLY | Wave 3 | Retired; replaced by ARCH-RECALL (Icebox) | re-scoped |
| BACKLOG-STATE | Wave 4 | Icebox, two named triggers, tickets-convergent schema | none |
| JANITOR | Wave 4 | Split: READ Icebox / WRITE behind harness | split |
| PAR-BRANCH | (unlisted) | Examined, declined for now | new, deferred |
| TRANSCRIPT-SHA | (unlisted) | Adopt — cheapest enabler | new |

## What changed under assessment

1. **CTX-CACHE reframed** from read ordering to import placement;
   promoted to Wave 1; cache pricing is the smallest of its three
   payoffs.
2. **OPT-PROTO shrank** from a mode with worktrees to a
   one-paragraph design-options amendment; best-of-N whole
   implementations named and declined on review economics.
3. **TIER-ASSEMBLY retired** as largely already built (the
   sectional tiers are task-conditional assembly); its residue
   renamed ARCH-RECALL and iced with a trigger.
4. **BUDGET-DERIVE demoted** into MEM-CHECK phase 2 — most
   archive-cadence budgets are not load-bearing.
5. **JANITOR split** into READ (compatible, iced) and WRITE (a
   governance change, gated on the harness plus per-verb sign-off).
6. **BACKLOG-STATE held** but sharpened: the schema converges on
   the existing `tickets/` pattern (per-item files + generated
   index), and vague blockage became two named triggers.
7. **Upgrade.md promoted** to the harness's first and most valuable
   scenario — the framework's highest-stakes mechanical promise,
   currently tested by faith.
8. **PAR-BRANCH examined and declined**: append conflicts are
   git's weakest case; the chat-claim protocol is vindicated at
   current scale.
9. **A fourth force added** — model-capability compensations — with
   compensation retirement as a standing harness job.
10. **The mechanism ratchet named**, with its discipline: every
    script must name the prose it retires.
11. **TRANSCRIPT-SHA added** — one header line that turns the
    transcript archive into a replayable scenario corpus.
12. **Standing caveat:** three incidents across ~200 items is a
    thin evidence base — Wave 1 measures before anything later
    armours.

## Closing

The audit's direction survives the assessment, but shrunk and
re-priced. The biggest wins turn out to be small — a validator, a
header line, an import, a paragraph — every structural move now
waits behind a named trigger or a measurement, and two audit ideas
partly died on contact with the repo's actual economics. That is
the method working as intended: the point of arguing with your own
proposals is to find out which ones argue back.
