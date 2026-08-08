# Machine-Native Synthesis — the best-functioning system, and the process that keeps it so

<!-- self/evaluations/ — cold tier, never auto-read. Third document
     in the 2026-08-08 series: the audit diverged (findings), the
     assessment converged (verdicts), this pass synthesises (design
     + process). It reflects on both earlier documents, defines the
     fitness function neither of them named, specifies the target
     design as invariants, and formalises reflection itself as a
     repeatable protocol — of which this three-document series is
     run zero.
     Status: SYNTHESIS. Confirms the assessment's Wave 1 in
     substance; adds a fitness function over it, a process around
     it, and a horizon beyond it. Nothing parked or promoted.
     Continued in 2026-08-08-revolution-programme.md — the goal was
     subsequently raised from evolution to revolution; that document
     designs the research/manage/develop programme and reconciles it
     with this one (Wave 1 = gate R0). -->

## 1. What "best functioning" means

Neither earlier document defined what "better" means, which left
every argument to be settled by taste. Define it now.

**The fitness function: shipped, verified outcomes per unit of
human attention, at constant or better quality and safety.**

Three currencies trade inside it, and they are not equal. Human
attention is the scarce one, and its price is roughly constant.
Model tokens are cheap and getting cheaper. Calendar latency sits
between (a gate costs a round-trip; an autonomous run costs none
but risks rework). The framework has always priced human attention
well — checkpoint mode's "two decisions that matter" is exactly
this function applied to gates — but it prices tokens crudely
(word budgets) and latency not at all, and it *measures* none of
the three. Every verdict below, and every future one, should be an
argument about this function, stated in its currencies.

Taking "app" seriously also means taking it literally: what is the
best *packaging* of pm-skills — prose files, validated files,
harness adapters, or an actual programmatic interface? Section 5
answers with a ladder rather than a leap.

## 2. Reflection on the two earlier passes

### What the audit got right and wrong

Right: the primitives table (prose re-implementing named systems
machinery) sorts the framework accurately and generatively; the
five probes are a genuinely reusable method; the write-time /
read-time distinction and the state/view fusion are real and load
the right targets.

Wrong or overclaimed: the ceremony ratchet claimed monotonic
growth the repo's own history refutes (checkpoint mode, the
removed hot-set cap, the fast path — process-born ceremony *does*
get pruned; only failure-born ceremony ratchets). It under-credited
the existing sectional tier system, which already is
task-conditional assembly. It framed CTX-CACHE around ordering
when the lever is placement. And it never defined the fitness
function, so its findings argued direction without magnitude.

### What the assessment got right and wrong

Right: it argued with its own material and drew blood — two
concepts down-scoped, one retired, one split, one declined — and
its right-sizing (seven scenarios, advisory-first, source-only
harness) respects the solo-maintainer economics that kill
evaluation suites. The governance splits (JANITOR-READ/WRITE,
per-verb autonomy) protect the propose-first line that makes the
framework trustworthy.

Wrong or incomplete: it stayed additive — it found no immediate
retirement, and did not notice that this fact is itself a finding
(see 6.3). It accepted the audit's frame — *which candidates?* —
and never drew the target the candidates aim at. Its evidence base
remained self-referential (the framework studying itself), a
hazard it did not name. And it, too, never named the fitness
function.

### The lesson in the pattern of revisions

Where did audit ambition survive assessment, and where did it die?
It survived wherever it touched **evidence and enforcement**
(MEM-CHECK, the harness, the SHA rider) and died wherever it
touched **workflow reshaping** (new modes, dynamic assembly,
branch coordination). That pattern is information: the workflow
skeleton encodes years of accumulated, use-tested judgement, while
the evidence layer was simply absent. The system does not need a
new skeleton. It needs the missing organ.

**The synthesis in one line: pm-skills has a skeleton (workflows),
muscles (the agent), and memory (the files) — what it lacks is
senses. Everything worth building next is sensory: validation,
traces, replay, measurement, and a reflex for acting on what the
senses report.**

## 3. The design — a specification in invariants

The house doctrine is invariant-led testing; the target design is
therefore specified the same way. The best-functioning pm-skills
is any implementation satisfying eight invariants:

- **I1 — Single source, dual readability.** Every fact lives in
  exactly one place; wherever a machine consumes it, a
  machine-readable form exists — embedded or generated, never
  hand-duplicated.
- **I2 — Checked or judged, never hoped.** Every load-bearing rule
  is either mechanically checked or explicitly classed as
  judgement. No invariant is enforced by hope.
- **I3 — Stable identity prefix.** The model's session-start
  context is deterministic and cache-friendly; the identity
  documents load in the rules position, not as per-session reads.
- **I4 — Replayable history.** Every session leaves a trace
  sufficient to replay it (transcript + starting SHA); every close
  leaves a parseable record.
- **I5 — Regression visibility.** A behavioural change to a
  distributed prompt can be detected before release, with the
  highest-stakes promises (upgrade, close, reconcile) covered
  first.
- **I6 — Priced attention.** Human attention is spent only at
  genuine decision points; gate redirect rates and nag firing
  rates are measured; defaults are revisited when the price of
  model capability changes.
- **I7 — Rent-paying overhead.** Every ceremony names the failure
  it prevents; every mechanism names the prose it retires; both
  rents are re-assessed at reflection. (One law replacing the two
  ratchets: all overhead pays rent in the fitness currencies, or
  goes.)
- **I8 — Evidence-gated structure.** Structural change — schema,
  autonomy, distribution shape — happens only behind named
  triggers; cheap-reversible change trials in self-hosting first.

### The gap table

| Invariant | Today | Established by |
| --- | --- | --- |
| I1 dual readability | partial — canonical copies, no machine forms | MEM-CHECK's budget block; records layer when triggered |
| I2 checked or judged | partial — lint + boundary; memory rules hoped | MEM-CHECK structural class; enforcement-ladder audit |
| I3 stable prefix | AGENTS.md only | CTX-CACHE spike → import placement |
| I4 replayable history | transcripts optional, no SHA | TRANSCRIPT-SHA rider |
| I5 regression visibility | none | EVAL-SCEN → EVAL-HARNESS (upgrade first) |
| I6 priced attention | priced by design, never measured | metrics-lite counters + transition policy (see 4.2, 6.2) |
| I7 rent-paying overhead | informal | the reflection protocol (section 4) |
| I8 evidence-gated structure | informal instinct | adopted as standing policy |

The Wave 1 of the assessment is unchanged by this pass — it is
simply revealed as the establishment of I1–I4 plus the seed of I5.
That the portfolio survives a third adversarial look intact is
itself evidence it is correctly sized.

## 4. The process — reflection as a first-class verb

This three-document series is the prototype. Formalised, it is a
**Reflect** protocol — a self/ practice now, a distributed verb
only if self-hosted runs prove the shape (I8 applied to itself).

### 4.1 Triggers — evidence-based, never calendar

Run a reflection when any of these fires, and only then:

- ~15 shipped items or ~10 releases since the last reflection
  marker;
- a model-generation change in the primary tooling (see 4.2);
- any prose-skip incident reaching the decision log;
- the first month of evidence from a new consuming project;
- maintainer call.

**Evidence gate:** a reflection's inputs are the metrics readout,
new transcripts since the marker, the incident list, and
consuming-project reports. If the inputs are empty, the reflection
is skipped and says so. Reflection without fresh evidence is
prohibited — it can only polish the mirror.

**Self-reference countermeasure:** consuming-project evidence
outweighs self-hosted evidence. A reflection run purely on
self-hosted material must declare that and discount its own
conclusions accordingly. The framework's fitness is measured in
consuming projects shipping, never in the elegance of its
self-description — this series, conducted entirely in the mirror,
is itself the cautionary example.

### 4.2 The model-generation clause

Model improvement is the dominant external force on this design,
and it does not merely retire compensations. It shifts the gate
economics (more work becomes auto-jazz-eligible; the two-gate
default is itself a calibration against 2025-era models) and it
erodes the portability floor (the paste-flow tool class shrinks as
harnesses standardise). Therefore: **the framework's defaults have
a half-life.** On every model-generation trigger, the reflection
runs two standing studies: compensation retirement (drop a
drift-correction, replay scenarios, retire the paragraph if
behaviour holds) and gate-economics review (measured redirect
rates; if scope approvals run near-100% rubber-stamp at the new
tier, propose shifting the default mode, project by project).

### 4.3 The three passes, with caps

1. **Audit** (divergent): apply the six probes to the current
   system against current scarce resources. At most ~6 findings.
2. **Assessment** (adversarial): argue with every finding —
   feasibility here, cost honesty, lighter alternative, failure
   modes. The delta list ("what changed under assessment") is
   mandatory; an assessment that changes nothing was not performed.
3. **Synthesis** (convergent): update the invariant gap table;
   emit **at most 5 candidates** to ordinary wish-list triage; name
   **at least one retirement** — or record explicitly that no safe
   retirement exists for lack of evidence, which is itself a
   finding that indicts the evidence layer, not a pass.

**Governance:** reflection proposes; it never edits workflows or
memory directly. Its outputs are dated cold documents (the
"reflection pack"), one decision-log entry for any policy adopted,
and candidates that flow through normal triage. The human remains
the only promoter.

### 4.4 Where it lives, and for whom

Now: a `self/` practice, this pack being run zero. Later, if two
or more self-hosted runs prove the shape: a distributed verb —
because consuming projects deserve the same instrument pointed at
*their* process (are the gates rubber stamps? is memory healthy
beyond its size? which corrections does the current model still
need?). An evidence-based process retrospective is arguably the
most valuable thing pm-skills could ship that it does not
currently ship — and, per I8, it is not shipped until proven here.

## 5. The packaging ladder — taking "app" literally

Four rungs, in ascending mechanism:

1. **Prose files** (today): maximum portability, probabilistic
   execution.
2. **Validated files** (Wave 1): prose plus dependency-free
   sensors. Identity preserved — "overwhelmingly Markdown" stays
   true.
3. **Harness adapters** (Wave 2+, per tool): rule imports (I3),
   hooks for event-time checks, scheduled JANITOR-READ. Optional
   by definition; the paste flow still works.
4. **A programmatic interface** — the honest end of the ladder,
   named here because neither earlier document did: once a records
   layer exists (BACKLOG-STATE), the natural machine-native
   packaging is a small **MCP server** exposing project memory as
   tools and resources — get-context-for-task, close-task,
   pick-next — with the prose judgement layer riding inside the
   prompts. Structure enforced at the interface; portability via
   protocol rather than lowest-common-denominator prose.

Rung 4 is deliberately not a candidate. It changes the product's
identity (code to maintain, an install step, a dependency surface
— everything the brief currently refuses), and its precondition is
the records layer that is itself behind two triggers. But the
ladder should be on the map, because it resolves a tension the
first two documents left standing: the portability argument for
prose-everything weakens every year as harnesses converge on
common protocol, and the framework should *notice* when that
trigger fires rather than discover it late. Named trigger: records
layer proven, plus more than one consuming project, plus the
maintainer's tools all speaking the protocol natively.

**Two horizons, concretely.** Near (Wave 1–2 landed): a consuming
project copies the folder; init wires the identity docs into the
rules position; the daily loop is pick → build → close where close
runs `check` plus the memory validator and the transcript
self-saves with its SHA; upgrades arrive eval-verified and boring;
reflection fires on evidence, proposes at most five things, and
retires at least one. Far (triggers fired): items are records with
a generated index; parallel merges are disjoint by construction;
the same records serve whatever interface the era's harnesses
prefer — files today, protocol tomorrow — with the judgement prose
unchanged at the centre. The skeleton persists; the senses and the
skin evolve.

## 6. What this pass adds that the first two missed

### 6.1 The funnel

Both documents audited the running loop and ignored its mouth.
`init.md` and `adopt.md` determine the quality of everything
downstream — a bad brief or a wrong architecture summary is
faithfully preserved by the very machinery that makes memory
durable. Garbage in, *preserved* garbage out. The evidence layer
should eventually include one init-quality scenario (does a fresh
init produce memory that MEM-CHECK and a judgement review both
pass?), and adopt-tier projects deserve a documented
"first-reflection after adoption" checkpoint. Folded into the
harness's scenario list, low priority, noted here so it stops
being invisible.

### 6.2 The slowest component

The framework models the human as a decision oracle with infinite
patience. In reality the human is the slowest, most variable
component in the loop — triage debt, unread reports, capture
discipline. The existing design already respects this better than
either document credited (batched decisions at the pick, one-line
banners, caps on nags) — but nothing *measures* it. The
attention-accounting counters (sessions per shipped item, redirect
rate at each gate, nag firing rates, reconcile debt age) are all
derivable from git and transcripts with zero infrastructure. They
belong in MEM-CHECK phase 2's print-out and in the reflection's
evidence gate. They are also the numbers that let gates and modes
be renegotiated honestly under 4.2.

### 6.3 The retirement result

The synthesis looked for a substantive piece of ceremony to retire
today, as its own rent payment — and found none that could be
retired *safely on current evidence*. Every candidate retirement
(a drift correction, a validation sub-step, the two-gate default
on some project) requires exactly the measurement layer Wave 1
builds. Recorded per protocol: **no safe retirement exists yet,
and that is the strongest single argument for the evidence layer
that any of these three documents has produced.** The first
measured retirement — likely a compensation dropped after a
scenario replay — will be the programme's proof of function.

## 7. Consequences for the portfolio

The assessment's Wave 1 stands unchanged: MEM-CHECK, EVAL-SCEN,
CTX-CACHE, TRANSCRIPT-SHA, the OPT-PROTO amendment. This pass adds
one candidate, folds two scope notes, and marks one horizon:

- [ ] **REFLECT-PRACTICE Reflection protocol as a standing
  practice** — codify section 4 as a `self/` practice document
  plus a decision-log policy entry (triggers, evidence gate,
  three passes with caps, mandatory retirement check,
  self-reference countermeasure). Source-only; no release.
  Distribution decision deferred until two self-hosted runs
  complete. · Medium / Low / Low / Medium.
- Scope folds: MEM-CHECK phase 2 gains the attention-accounting
  counters (6.2); the harness's scenario list gains an
  init-quality scenario at low priority (6.1) and the two standing
  studies of 4.2 (compensation retirement, gate economics).
- Horizon marker, optional Icebox line: **PM-MCP Programmatic
  interface** [blocked: records layer proven + >1 consuming
  project + harness protocol convergence] — noted per section 5,
  not argued for.

## 8. Closing

Three passes converge on a small, stable answer. The
best-functioning pm-skills is not a different system — it is this
system with senses: a validator so form is checked rather than
hoped (I2), traces so history replays rather than fades (I4),
scenarios so promises are tested rather than trusted (I5),
counters so attention is priced rather than assumed (I6), and a
reflection protocol so the system periodically re-earns its own
overhead (I7) under a fitness function that is finally written
down (section 1). The design fits on a page of invariants; the
process fits in a trigger list and three capped passes; and the
first proof of function will be the day a measurement lets this
framework delete a paragraph of itself with confidence. Everything
else — records, janitors, protocol servers — waits, correctly,
behind named triggers for evidence the senses will collect.
