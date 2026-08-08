# Revolution Programme — how to research, manage, and develop the next framework

<!-- self/evaluations/ — cold tier, never auto-read. Fourth document
     in the 2026-08-08 series (audit → assessment → synthesis →
     this). The maintainer has set the eventual goal: revolutionise
     the framework. This document designs the programme that gets
     there: the research that discovers what the revolution should
     be, the management that runs it beside a live incumbent on one
     person's attention, and the development path that ships it
     without betraying the framework's own promises.
     Status: PROGRAMME DESIGN. Proposes; changes nothing.
     Nothing parked or promoted. -->

## 1. Reconciling revolution with the synthesis

The synthesis concluded "the skeleton is right; the system lacks
senses" — an evolutionary verdict. The new goal is revolution. These
are not in conflict, and the reconciliation shapes the whole
programme:

- The synthesis assessed *today's system for today's environment*.
  A revolution is a bet on **discontinuities** — the environment
  after model capability jumps, after harnesses converge on common
  protocol and background operation, after token cost stops
  mattering. You revolutionise *for that world*, not this one.
- The evidence layer (Wave 1) is **revolution-neutral
  instrumentation**. The corpus, oracles, and metrics are exactly
  what lets a radical successor be evaluated against the incumbent
  fairly instead of rhetorically. Building it is not the timid
  alternative to revolution; it is the precondition for a measured
  one.
- A revolution declared before research is a rewrite. A revolution
  discovered through research is a re-founding. The programme below
  is designed to produce the second kind — and to allow, with
  dignity, the third outcome: that the evidence says no revolution
  is warranted, and the findings fold back into the evolutionary
  track. A programme that cannot conclude "null" is advocacy with
  a budget.

Live evidence that the ground is already moving, from this week's
wish-list captures: the maintainer now wants commit-and-push at
close to be unconditional rather than proposed — trust in the agent
has risen past a default the framework calibrated a year ago — and
finds prune "too repetitious", firing again almost as soon as it
completes — write-time curation ceremony whose cost now exceeds its
felt value, and a missing hysteresis gap in the budget design. Both
are small items on their own; both are data points that the
framework's defaults are aging in exactly the direction the
synthesis's half-life clause predicted. The revolution should be
understood as the *planned* version of what these captures are
doing spontaneously.

## 2. What "revolutionise" means — three axes

The research phase's first job is to decide which of these the
revolution is, because they demand different successors:

- **Axis A — Re-architecture.** Same scope, machine-native core:
  memory as records with generated views; enforcement at the
  interface; possibly a protocol server (the packaging ladder's
  rung 4). The prose judgement layer survives at the centre.
- **Axis B — Re-scoping.** The environment has absorbed functions
  the framework once had to provide (harness memory features,
  plan modes, hooks, scheduling, background agents). The successor
  *shrinks* to the irreducible core — project-memory semantics, the
  judgement curriculum, governance — and delegates mechanics to the
  harness. A revolution that deletes most of the framework is a
  legitimate and perhaps the most likely finding.
- **Axis C — Re-founding for continuous operation.** The session
  dissolves: always-on background agents, write-through memory,
  multi-agent division of labour (implementer, reviewer, janitor),
  humans steering by exception. The pick → build → close loop —
  the framework's deepest structural assumption — is redesigned
  around streams rather than sittings.

These combine (a full revolution is likely A+B+C in some ratio),
but each has different evidence requirements, and naming them
separately prevents the programme from quietly assuming its
conclusion.

## 3. Research — discovering what the revolution should be

### 3.1 North star first

Before any experiment: write the successor's **brief** — one page,
using the framework's own init discipline on its own successor.
What is pm-skills-next for, for whom, in what assumed world (dated
assumptions, explicitly), and what is out of scope? This document
is the research programme's steering artefact; every research
question below must trace to a line in it. It is cheap, it is
human-owned, and it is the first deliverable.

### 3.2 Research questions as falsifiable spikes

Each hypothesis becomes a spike with a question, a method, a
timebox, and a findings entry — the framework's own spike contract,
pointed at itself. The opening set:

- **RQ1 — The load-bearing map (keystone).** Ablation study: run
  identical fixture tasks under the full framework, under no
  framework, and under graduated strips (no validation stage, no
  tiers, no close ritual, no drift corrections…). Where failures
  reappear, a wall was load-bearing; where nothing changes, the
  ceremony was dead weight. The output is the successor's
  requirements list, derived empirically instead of argued.
  Requires the harness; the single most valuable experiment in the
  programme.
- **RQ2 — The model floor.** How much scaffolding does the current
  model generation actually need? (Compensation retirement
  generalised.) Re-run at every model generation; the answer dates
  every other result.
- **RQ3 — Memory substrate.** Records + generated views versus
  prose files: merge safety, reconcile fidelity, generation tasks,
  at equal human legibility. Prototype on the lab project itself
  (see 4.2).
- **RQ4 — Retrieval.** Full-fidelity store + read-time retrieval
  versus curated tiers, at 10× current project scale (synthetic
  aged fixture): context relevance, cost, misses.
- **RQ5 — Interface.** File reads versus a protocol interface
  (MCP tools over the records layer): reliability, enforcement,
  portability across harnesses.
- **RQ6 — Continuous operation.** Run a janitor-style loop plus
  background `next` on a fixture for a sustained period: does the
  close ritual survive contact with streams? What replaces
  session-start when there are no sessions?
- **RQ7 — Multi-agent coordination.** At real concurrency
  (implementer + reviewer + janitor), which coordination rules
  earn their keep — advisory claims, branches, per-item files,
  queues? The assessment's PAR-BRANCH verdict gets retested here
  at the scale it was declined for.
- **RQ8 — Environmental scan.** What do current harnesses provide
  natively that the framework still hand-builds? Standing scan,
  refreshed each generation; feeds Axis B directly. Cheap,
  agent-run, start immediately.
- **RQ9 — The human interface.** What is the minimum decision
  surface at revolution scale — which gates, which triage, which
  reflection — and what does live trust evidence (the unconditional
  commit request; prune fatigue) say the human is already willing
  to delegate?

### 3.3 Design fictions

In parallel with the spikes: two or three **candidate architectures
as design fictions** — day-in-the-life documents for a consuming
project under each candidate (a records-core successor, a
minimal-core successor, a continuous-operation successor). Cheap,
agent-drafted, human-judged against the fitness function, each
stating its assumed world and its RQ dependencies. Fictions are not
commitments; they are how the programme keeps imagining bigger than
its current experiment while staying falsifiable — each fiction
must name the RQ results that would kill it.

### 3.4 Research standards

Everything inherits the reflection protocol's rules: evidence-gated
(no experiment, no claim), consuming-project evidence outweighs
self-hosted, null results are findings, and every research artefact
is cold-tier and dated. The fitness function from the synthesis is
the only scoreboard.

## 4. Management — running a revolution on one person's attention

### 4.1 Two tracks, one instrument

- **The incumbent track** (pm-skills 4.x) continues: Wave 1, normal
  releases, consuming projects served. It is simultaneously the
  *baseline* every candidate must beat, the *instrument* that
  measures them, and the *hedge* if the revolution nulls out.
  It must not starve.
- **The lab track** runs the research. Quarantined: nothing from
  the lab enters `pm_skills/` distribution except through the
  normal release path; lab work is source-only until it graduates.

### 4.2 The lab is a pm-skills project

Run the revolution *as a project on the framework*: a lab space
(its own repo or tree) with its own brief (the north star from
3.1), its own backlog (the RQs and fictions), its own decision log
(the findings — these will be the most consequential decisions in
the project's history), its own trajectory. This is not cuteness;
it is a real test with real yield: the framework has only ever run
build-projects, and a research-project workload (spike-heavy,
findings-dense, null-friendly) will stress different parts of it —
generating incumbent evidence for free while the lab works.

### 4.3 Attention budget

The maintainer is solo; agents do the volume. Explicit split:
agents run scans, ablations, prototypes, and fiction drafts;
the human owns exactly four things — the north-star brief, the
pick of research questions each cycle, judgement on findings, and
the gates below. Cap the lab at roughly one session in four (tune
by feel), so the incumbent keeps shipping and the lab cannot
become a procrastination of it. Reflection (the synthesis's
protocol) runs over *both* tracks on its normal triggers and is
where the ratio gets renegotiated.

### 4.4 Gates — the only big decisions

Predeclared, so momentum never substitutes for evidence:

- **R0 — Entry.** Instrumentation exists: MEM-CHECK, at least
  three scenarios including upgrade, metrics-lite counters. Until
  R0, lab work is limited to the brief, RQ8's scan, and RQ2's
  cheap form. (R0 is Wave 1–2 wearing its other hat.)
- **R1 — Direction.** Enough RQs answered to pick the axes and one
  candidate architecture — or to declare the null ("no revolution
  warranted; findings fold into 4.x"), which is a successful exit,
  recorded with honours in the decision log.
- **R2 — Superiority.** A successor prototype beats the incumbent
  on the same evaluation suite *and* on fitness metrics from a
  real parallel run (see 5.2). Not "is exciting"; beats.
- **R3 — Migration.** The 4.x-to-successor upgrade is proven on
  real project memory, with a rollback path. The framework's
  sacred promise — upgrades never destroy memory — applied to its
  own revolution. Only past R3 does the successor get a name and a
  release.

### 4.5 Kill criteria and sunsets

Every RQ has a timebox and a null outcome. Every fiction names its
killers. The programme itself has a sunset review each model
generation: if no candidate has reached R2 and the environment has
shifted again, re-run RQ2/RQ8 and re-draft the fictions before
spending more — bets decay, and a revolution designed for last
year's discontinuity is just a rewrite with nostalgia.

## 5. Development — building it without betraying it

### 5.1 Strangler fig, not big bang

Wherever possible the successor grows *inside* the incumbent:
records under generated views (new core, old interface), validators
that both systems share, scenarios that both must pass. Organs that
prove out are back-ported to 4.x immediately — so the programme
pays dividends even if the revolution nulls, and the eventual
cutover is a **re-founding release** (new brief, new defaults,
legacy ceremony deleted, tombstones per the existing DEPREC-SHIM
pattern) rather than a rewrite with a migration cliff.

### 5.2 Parallel run

Before R2 can pass, incumbent and successor run side by side on
real work — the Hub, the lab itself, or a fresh project — long
enough for the metrics to mean something. Cutover is gated on
lived evidence, mirroring deploy.md's live-verification ethos: the
framework does not ship a deploy it has not watched boot.

### 5.3 Migration and retreat

The upgrade path is a first-class deliverable built *before*
launch, eval-covered by the harness's upgrade scenario generalised
to cross-generation. So is the retreat: a documented rollback from
5 to 4.x with memory intact, for the field failure the programme
did not foresee. A revolution with no retreat is a hostage
situation.

### 5.4 Identity honesty

The successor's release says plainly what died and why, with the
evidence linked — the load-bearing map from RQ1 doubles as the
deletion justification. Consuming projects get the same dignity
the framework's own memory gets: nothing silently overwritten,
everything explained once, in one place.

## 6. The operating rhythm, compactly

- **Now:** finish Wave 1 (it is R0); write the north-star brief
  (one session, human-owned); stand up the lab as a pm-skills
  project; start RQ8's scan and RQ2's cheap form (agent-run).
- **Steady state:** ~1 lab session in 4. Each lab session is a
  spike against a named RQ or a fiction revision. Findings land in
  the lab decision log; reflection runs over both tracks on its
  triggers and renegotiates the ratio.
- **Decisions:** only at gates. R1 picks the direction (or the
  null). R2 demands superiority. R3 demands safe passage. Nothing
  else needs the maintainer's permission to be learned.

## 7. Candidates (drafted, not parked — cap respected)

- [ ] **REV-BRIEF North-star brief for the successor** — one page,
  init discipline, dated world-assumptions; steers all RQs.
  Human-owned. · High / Low / Low / Low.
- [ ] **LAB-INIT Stand up the revolution lab** — a lab space run
  as a pm-skills project (brief = REV-BRIEF, backlog = RQs and
  fictions, own decision log); quarantine rule from distribution.
  · High / Low-Med / Low / Medium.
- [ ] **RQ-ABLATION Load-bearing map** [spike, blocked: R0
  instrumentation] — the graduated-strip ablation study (RQ1);
  output is the successor's empirical requirements list.
  · High / Medium / Medium / Low.

(RQ8's environmental scan and RQ2's cheap form need no ticket —
they are single agent-run lab sessions once LAB-INIT exists. The
two fresh wish-list lines — unconditional commit at close, prune
hysteresis — remain ordinary evolutionary triage for 4.x, and are
additionally logged here as trust-shift and ceremony-cost evidence
for RQ9.)

## 8. Risks, named

- **Second-system effect.** The classic: the successor absorbs
  every deferred wish. Countered by the north-star brief's out-of-
  scope line, the fiction killers, and R2's cold arithmetic.
- **Research theatre.** Fictions and essays without falsification.
  Countered by the evidence gate: no experiment, no claim — and by
  RQ1 being the programme's centre of gravity.
- **Incumbent starvation.** The lab is more interesting than the
  chores. Countered by the session cap and by reflection auditing
  the ratio.
- **Bet decay.** Model generations outpace the programme.
  Countered by dated assumptions, per-generation sunset reviews,
  and keeping RQ2/RQ8 standing rather than one-shot.
- **Solo-maintainer fragility.** One human is the bus factor of
  the whole decision layer. Partially countered by the lab's
  decision-log discipline (the reasoning survives the person's
  context) — and worth naming as unsolved.
- **Sunk cost at the gates.** By R2 the lab will be loved.
  Countered only by predeclaring, now, in writing: the null is a
  success. It is in this document twice on purpose.

## 9. Closing

The way to revolutionise a working framework is to make the
revolution *discoverable*: instrument the incumbent (Wave 1 is
R0), write the successor's brief before its code, turn every
revolutionary claim into an ablation or a prototype with a
timebox, run the whole thing as a quarantined pm-skills project on
a strict attention budget, and let three predeclared gates — one
of which is allowed to say "no revolution" — make the only big
decisions. Research finds the load-bearing walls; management keeps
one person solvent while two tracks run; development grows the
successor inside the incumbent and ships it as a re-founding with
safe passage both ways. The framework's own philosophy, applied at
one altitude higher, is sufficient to replace the framework — and
proving that is the revolution's first result either way.
