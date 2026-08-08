# Machine-Native Audit — where pm-skills encodes human constraints

<!-- self/evaluations/ — cold tier, never auto-read. Drafted
     2026-08-08 from a fresh-look review session ("in what ways is
     this framework constrained by human thinking that would be
     better AI thinking and machine processing?").
     Status: PROPOSAL. This document changes nothing by itself.
     The candidate backlog items at the end await wish-list triage —
     nothing has been parked or promoted.
     SUPERSEDED IN PART: the extended per-concept assessment in
     2026-08-08-machine-native-concepts.md revises several verdicts,
     grades, and wave placements — where they differ, it wins.
     Note: evaluations are excluded from the lint gate and the docs
     integrity check; inline references here are for human readers. -->

## Why this document exists

The maintainer asked for a genuinely fresh look: where does the
framework encode *human* cognitive and organisational constraints in
places where AI-native thinking and machine processing would serve
better — and what would be a good way to look at that question?

This document expands that review into something durable: a
diagnosis, a reusable audit method, six findings tied to evidence in
the tree, an explicit list of what should *stay* human-shaped, and a
sequenced adoption path with backlog-ready candidates. It holds
itself to the framework's own standard: prompts here are "tested by
consuming-project evidence and retrospective evaluations"
(`self/project/conventions.md`), so nothing below is decided by
argument alone — the sequencing deliberately puts measurement first.

## The diagnosis

pm-skills is a database, a scheduler, and an operations manual —
implemented in prose, and executed probabilistically by whichever
model reads it.

That sentence is both the design's genius and its deepest human
constraint. The genius: prose runs anywhere, down to paste-into-chat;
it carries judgement and nuance; a human can read every part of it.
The constraint: obedience is probabilistic, state is stored in
typography, and organisation happens at write time by ritual. Almost
every finding below is a corollary.

Name the systems primitive each mechanism hand-implements:

| Framework mechanism | Primitive it re-implements in prose |
| --- | --- |
| `Close: lite` trailer + Reconcile | write-ahead log + checkpoint flush |
| Hot / sectional / warm / cold tiers | cache hierarchy (static policy) |
| Memory size budgets | eviction policy |
| One-writer rule | exclusive lock |
| Parallel-session claim | advisory lock |
| `archive/` + `INDEX.md` | cold storage + index |
| MANIFEST classes + upgrade flow | schema migration |
| Staged-set echo | transactional commit check |
| `gen-file-map.mjs` | materialised view — the one already mechanised |

The last row matters most: the file map is the one place the
framework already made the machine-native move (a generated skeleton,
mechanically refreshed, with human-authored role text preserved), and
it is by common consent one of the healthiest parts of the system.

One more pattern completes the diagnosis. Look at the three "learned
the hard way" incidents recorded in the docs: the release commit that
shipped without its changelog entry (which minted the staged-set
echo), the session that assumed uncommitted work was the maintainer's
(which minted the arrival procedure), and the review that was blind
for lack of transcripts (which minted the transcripts habit). Each
failure was answered with **more prose** — a new paragraph of
ceremony, growing the very read load the budgets exist to fight. Call
this the ceremony ratchet. Prose-as-mechanism only ratchets up;
mechanism-as-mechanism caps it.

## Three forces — sorting what looks human

Not everything human-shaped here is a defect. Three distinct forces
are tangled, and only one is a redesign target:

1. **Human-owned.** The scarce resource is genuinely the human:
   intent, trust, taste. Test: *would a maximally capable harness
   still want this?* The scope gate and the design pick pass; no
   redesign below touches them.
2. **Portability-constrained.** Prose-everything exists partly so the
   framework runs on any tool, down to the manual paste flow. Test:
   *does this exist so the weakest tool can run it?* The answer is a
   ladder, not a rewrite: keep the portable prose core, add optional
   mechanical adapters where the harness supports them. This repo
   already treats itself exactly this way — hooks, CI, and tuned
   scripts that it does not distribute.
3. **Human-constrained.** The form was inherited from a world of
   scarce human working memory, expensive action, and linear reading
   — and the constraint no longer binds. These are the six findings.

## The audit method — five probes

The way to look at it, phrased so it can be reused (one mechanism per
memory-maintenance pass, if wanted):

1. **Scarce-resource probe.** Which resource does this mechanism
   economise, and was it scarce for humans (working memory, reading
   speed, meeting time) or is it still scarce for agents (context
   tokens, retrieval precision, verification cost, human attention)?
   Where the scarce resource changed, the form is a candidate.
2. **Named-primitive probe.** What systems primitive is this prose
   hand-implementing? If it has a name — log, lock, cache, index,
   migration — consider implementing it as that thing, and reserve
   prose for what has no primitive.
3. **Write-time / read-time probe.** Is this curation done at write
   time (prune, budget, tier, compress) that a full-fidelity store
   plus read-time computation would do better?
4. **Obedience / enforcement probe.** Is this a sentence because it
   needs judgement, or because the tool couldn't enforce it? *If it
   must never be skipped, it must not be a sentence.*
5. **Reader probe.** Who consumes this artefact — human, model, or
   both? If both, split the state from the view and generate the
   view.

Plus one meta-rule that finding F5 exists to enable: settle redesign
questions by measurement, not argument.

## Findings

### F1 — Prose is the execution engine

**Evidence.** The hard prohibitions, the end-of-task steps, the
one-writer rule, the staged-set echo — all load-bearing, all
enforced by a model remembering to comply. The lite-close trailer is
defined, in the framework's own words, as "a data format Reconcile
parses, so keep it exact and grep-stable" — a schema, specified in
prose, validated by hope. The ceremony ratchet above is the failure
signature: every incident so far became a new rule to remember.

**The constraint.** Human institutions run on trained compliance
because that is all they have. An agent framework has a second
option: checks that cannot be skipped.

**Machine-native target.** An enforcement ladder. Classify every
MUST in the rulebooks and prompts: (a) statically checkable — becomes
a validator; (b) checkable at an event — becomes a hook or a gate
step; (c) genuine judgement — stays prose. The concrete first
deliverable is a dependency-free `check-memory.mjs` (sibling of
`check-links.mjs`, and a scaffold/scripts fork pair per the
deliberate-forks rule): parse the backlog grammar, flag `[x]` items,
verify trailer blocks in `git log`, sweep ticket orphans, print every
budget with its derivation. That one script mechanises most of
end-of-task step 4 and the mechanical half of the Diagnose verb — it
*removes* ceremony rather than adding a check to it.

**Counterpoint, engaged honestly.** FMT-CONV (2026-07-16) declined a
backlog-grammar checker: "adds gate friction for marginal gain;
revisit only if tooling parses the backlog programmatically." Two
answers. First, the revisit trigger has already half-fired: Reconcile
parses trailer grammar programmatically today, and every candidate
below extends that. Second, the friction argument inverts when the
checker replaces manual steps instead of adding one — the gain is
negative friction.

**How to test it.** Run the script against this repo's memory and a
consuming project's (the Hub); run a manual Diagnose beside it; count
what each catches that the other misses.

### F2 — Write-time curation, for read-time machines

**Evidence.** `pm_skills/memory-policy.md` is a table of round human
constants — 20 entries, 90 days, 25 items, 5 closes, 7 days — all
denominated in *words*, a typographic unit, when the billed and
attended resource is tokens. The repo has already discovered, twice,
that constants rot: the file-map budget was rebuilt as **derived**
(~35 words × mapped files) so it "measures noise, not size", and the
aggregate hot-set cap was removed because "a fixed sum fires
permanently on a mature project". The policy even instructs that
budgets be "periodically re-derived from real mature projects rather
than guessed" — manual recalibration, the human patch for what
measurement automates. And the transcripts habit exists precisely
because write-time compression once destroyed evidence a later
review needed.

**The constraint.** Librarianship: organise at write time, because
the reader retrieves linearly and expensively. A model's retrieval is
cheap at read time; the static tier table is a hand-written attention
policy that a model could compute per task.

**Machine-native target.** Three steps of increasing ambition:

- Generalise the derivation pattern the file map already proved:
  every accreting budget derived from a measurable base (the
  decision-log live window from entry velocity; trajectory from phase
  count), floors protecting small projects, derivations printed the
  way the file-map check already prints its own.
- Denominate budgets in tokens (a words-to-tokens approximation is
  fine and dependency-free).
- Longer-term: task-conditional context assembly — compute the read
  set from the task statement (the backlog item, its `[detail]`
  ticket, decision headings matched by ID and keyword, file-map
  sections for the touched directories), with the static tiers
  retained as floor and fallback, not as the policy.

**Counterpoint.** Static tiers are predictable, zero-cost, and
debuggable; dynamic assembly adds a planning step and can miss.
Hence floor-plus-computation, never replacement — and the assembly
step ships only after F5 can measure its recall.

**How to test it.** Replay recorded tasks; compare computed
assembly against the static tier load on tokens spent and relevant
content actually surfaced.

### F3 — Inherited genres fuse state with view

**Evidence.** Backlog, decision log, trajectory, wish-list — genres
invented for human coordination rituals, adopted because session
amnesia looks like "new hire every morning". The cost shows in the
machinery needed to keep prose behaving like a table: grammar
specified in HTML comments, grep-stable anchors, a whole Refactor
verb for when the queue drifts. Meanwhile the maintainer's own
wish-list is asking for the backlog to become a *generated* artefact
— "a backlog writing process that takes a list of ideas (or even
loose conversational transcript) and produces a prioritized backlog",
plus a ticket-writing command — and the file map already demonstrates
the split working: mechanical skeleton, preserved human text, flagged
staleness.

**The constraint.** Human documents fuse storage with display
because a human wants one artefact to read and edit. So the state is
maintained by hand and linted by eye.

**Machine-native target.** Do for the backlog what `gen-file-map.mjs`
did for the file map. Rung 1 (cheap, already justified by F1):
validate the grammar mechanically; Markdown stays the substrate.
Rung 2 (structural): items become typed records — id, status, flags,
dates, dependencies, grades — and `backlog.md` becomes a generated
view. Reconcile becomes a data operation; a parallel-session merge
becomes mechanical; the transcript-to-backlog process writes records
and the view regenerates. Portability survives because the generated
Markdown *is* the portable artefact — a tool without adapters reads
exactly what it reads today.

Two smaller notes under the same probe. The point-don't-restate
discipline is correct for maintenance, but for a model every pointer
is another read round-trip — a digest generator that inlines views at
point of use would serve both readers (speculative; low priority).
And the 72-character hard wrap plus curated dictionary serve the
human page; in machine-written memory files their main yield is diff
churn (minor; note only).

**Counterpoint.** Structured records raise the floor for the
paste-flow user and invite schema bikeshedding. Mitigation: rung 2
waits for rung 1 evidence, and humans keep editing the view — a
close-time step folds edits back into the records.

**How to test it.** A/B one Reconcile and one simulated
parallel-session merge, prose versus records; count errors and steps.

### F4 — A serial pipeline in a parallel medium

**Evidence.** One session, staged pipeline, one backlog item per
`next` invocation, one writer. Design options are argued in prose
and picked before anything is built. Coordination is chat-declared
claims and hand-copied handoff blocks — meeting-room protocol —
while git branches, the actual concurrency primitive in the stack,
sit unused for it. The session-start ritual computes nags (ageing,
reconcile counts, doc-deltas) at the one moment a human is present.

**The constraint.** Deliberate-then-act is a discipline for a world
where acting is expensive and the actor is single-threaded. For an
agent, building is nearly as cheap as arguing, and there can be
several of it.

**Machine-native target.** Three adapters, none touching the gates:

- **Prototyped options.** Where build cost is at or below argument
  cost, build the 2–3 design options in scratch worktrees and present
  artefacts plus measurements at the unchanged design gate. This is
  spike thinking generalised into the design stage. Only the picked
  artefact gets human review; the others are evidence.
- **Branch-per-session.** Each parallel session works its own
  branch; memory writes serialise at merge; the secondary handoff
  block becomes a merge commit; provenance becomes `git log` instead
  of narration.
- **Janitor loop.** A scheduled background agent runs Reconcile,
  doc-sync, ageing checks, and Diagnose continuously; session start
  stops computing nags and reads the janitor's report.

**Counterpoint.** N builds cost tokens — bounded by the
build-versus-argue test and by option-sized scopes. All three are
harness-dependent: optional adapters on the portability ladder, never
the core.

**How to test it.** Sample recently shipped items and ask of each:
would three cheap prototypes have changed the pick or shortened the
argument? Ship the mode only if the answer is often yes.

### F5 — Improvement by anecdote, not measurement

**Evidence.** The conventions say it outright: behaviour changes to
prompts are "tested" by consuming-project evidence and retrospective
evaluations. The quality gate checks form — lint, links, spelling,
editorconfig — and is structurally blind to function: nothing can
detect that a prompt edit made the agent behave worse. Semver is
applied to prompts, but a prompt's "breaking change" is a
behavioural, empirical property, not an API shape. The wish-list
already contains the instinct: "review this and evaluate how
pm-skills performed."

**The constraint.** Human organisations improve by retrospective
anecdote because running the counterfactual is impossible for them.
For prompts, it isn't: the same scenario can be replayed against two
versions.

**Machine-native target.** An evaluation harness, and it is the
*enabling* move — it converts every other finding from a taste debate
into an experiment. Shape:

- A scenario = an initial state snapshot (repo + memory) + the ask +
  **property assertions** on the end state: gate green, item evicted,
  trajectory line added, trailer parses, grammar valid. The oracles
  are largely `check-memory.mjs` — which is why F1 sequences first.
- Properties, never golden transcripts: models vary; properties
  hold.
- A run matrix of prompt version × model tier — which also converts
  the GUIDE's static "which model tier" advice into measured routing.
- Releases gain an evaluation line beside `Verify:` in the CHANGELOG
  entry.

The seed corpus already exists: the documented init/next run, and the
transcripts folder accumulating since 3.7.0.

**Counterpoint.** Harness cost and flaky scenarios. Mitigation:
start with exactly one scenario (a spike), property-only assertions,
and grow only on caught regressions.

**How to test it.** The harness is the test; its first caught
regression pays for it.

### F6 — Cache-blind context assembly

**Evidence.** The tier system minimises how much is read — token
*count* — but nothing controls the *stability of the byte stream*:
hot files land as interleaved tool reads in varying order, which
defeats provider prompt caching. The wish-list asks the question
directly ("take advantage of anthropic API cache costs?").

**The constraint.** Token counting is human cost-accounting
(reading time, attention); cache economics are machine
cost-accounting, and the two diverge exactly when reads are
unstable.

**Machine-native target.** Deterministic context assembly: one
stable-ordered block per session, stable content first (brief,
architecture, conventions — they rarely change), volatile content
last (backlog Active, decision headings), byte-identical across
sessions where the content hasn't changed. The benefit concentrates
in API-billed autonomous loops (`next` on a schedule); it is
marginal in interactive IDE use where the harness manages its own
caching.

**Counterpoint.** It constrains assembly order for a benefit that
depends on the harness — so it is not adopted on faith.

**How to test it.** Run an autonomous loop both ways; compare
cached-token share and cost per item shipped. Answer the wish-list
question with a number.

## What stays human-shaped

The audit owes the other side of the ledger. These pass the
maximally-capable-harness test and should survive every move above:

- **The two gates.** Scope approval and the design pick sit exactly
  where intent transfer is irreducible. Checkpoint mode's insight —
  "you keep the two decisions that matter and skip the ceremony" —
  is correct attention economics; the findings above change the
  *evidence presented at* the gates, never the gates.
- **Advisory, never locking.** "A crashed session must never block
  the next one" is sound distributed-systems design, arrived at by
  human judgement.
- **Append-only history.** Archive-never-delete, the decision log,
  the changelog-as-upgrade-plan: event-sourcing instincts, already
  machine-friendly.
- **Spike mode.** The framework's own admission that some questions
  are answered by doing rather than deliberating. F4 merely
  generalises it.
- **Prose for the why.** Decision rationale is judgement — the one
  thing prose is *for*. F3 moves state out of prose, never the
  reasoning.
- **Compress-on-ship, as the view.** Humans still want the terse
  trajectory line. Under F3 the view compresses; the store no longer
  has to.

## Adoption path — evidence-gated waves

Nothing graduates by argument; each wave carries its own test and
the later waves are blocked on the earlier ones' evidence.

- **Wave 1 — measurement substrate.** MEM-CHECK (prove it in
  `scripts/` as source-only first; promote to scaffold as a release
  once it earns it) and EVAL-SCEN (spike).
- **Wave 2 — measured economics.** EVAL-HARNESS, CTX-CACHE (spike),
  BUDGET-DERIVE.
- **Wave 3 — workflow upgrades behind evidence.** OPT-PROTO,
  TIER-ASSEMBLY.
- **Wave 4 — structural, explicitly triggered.** BACKLOG-STATE
  (the FMT-CONV revisit condition met deliberately), JANITOR and
  branch-per-session (harness-dependent adapters).

## Candidate backlog items (drafted, not parked)

Written in the ticket grammar with the self-repo grades
(Impact / Difficulty / Risk / OpΔ). For triage: promote, hold, or
cut — nothing here has been added to the wish-list or backlog.

- [ ] **MEM-CHECK Memory validator script** — dependency-free
  `check-memory.mjs` (scripts first; scaffold fork when proven):
  backlog grammar, `[x]` eviction, trailer parse from `git log`,
  ticket orphans, budgets printed with derivations.
  Intent: mechanise end-of-task step 4 and Diagnose's mechanical
  half; double as the evaluation oracle. Meets FMT-CONV's stated
  revisit condition.
  Done when: one command reports clean/red on this repo and one
  consuming project, and end-of-task points at it.
  · High / Medium / Low / Medium.
- [ ] **EVAL-SCEN First behavioural scenario** [spike] — reduce the
  documented init/next run to one replayable scenario with property
  assertions. Question: does transcript + repo state reduce to a
  scenario cleanly? · High / Medium / Low / Low.
- [ ] **EVAL-HARNESS Prompt evaluation harness** [blocked:
  EVAL-SCEN findings] — scenario corpus, property oracles, release
  regression line in the CHANGELOG beside `Verify:`.
  · High / High / Medium / Medium.
- [ ] **CTX-CACHE Cache-stable context assembly** [spike] — measure
  cached-token share and cost of a stable-ordered session-start
  block on an autonomous loop before codifying any assembly order.
  · Medium / Low / Low / Low.
- [ ] **BUDGET-DERIVE Derived budgets in tokens** — generalise the
  file-map derivation to the other accreting budgets; denominate in
  tokens. · Medium / Low-Med / Low / Low.
- [ ] **OPT-PROTO Prototyped design options** — where build cost ≤
  argument cost, build the 2–3 options in scratch worktrees;
  artefacts and measurements at the unchanged design gate.
  · Med-High / Medium / Medium / Low.
- [ ] **TIER-ASSEMBLY Task-conditional context assembly** — compute
  the read set from the task statement; static tiers remain floor
  and fallback. · Medium / Medium / Medium / Low.
- [ ] **BACKLOG-STATE Backlog state/view split** [blocked:
  MEM-CHECK shipped + EVAL-HARNESS green] — items as typed records,
  `backlog.md` a generated view (the gen-file-map move applied to
  the backlog); Reconcile and parallel merges become data
  operations. · High / High / Med-High / Medium.
- [ ] **JANITOR Background maintenance loop** [blocked: harness
  scheduling support] — Reconcile / doc-sync / ageing / Diagnose
  run continuously; session start reads the janitor's report
  instead of computing nags. · Medium / Medium / Medium / Medium.

## Wish-list absorption map

How the current wish-list lines relate, for the next triage:

- "anthropic API cache costs — worthwhile?" → **CTX-CACHE** answers
  it with a measurement.
- "review the documented init/next example" → **EVAL-SCEN** is that
  review, made replayable.
- "is decision log etc long enough" → **BUDGET-DERIVE** replaces the
  guess with a derivation.
- "backlog writing process from ideas / transcript" and "ticket
  writing command" → best served by **BACKLOG-STATE** rung 2 (they
  write records; the view regenerates) — though both can ship
  earlier as prose-first commands if wanted.
- "check the commit and push workflow" → partially covered by
  **MEM-CHECK** (trailer and staged-set verification).
- "rename spike" → untouched here; naming, not architecture.

## Closing note

The framework's distinctive virtue is that it versions, documents,
and retrospects itself with unusual discipline. The ask in this
audit is narrow: extend that same discipline from the repo's *form*
(lint, links, releases) to its *function* (measured agent
behaviour), and let the six findings be settled the way the
framework already says it wants things settled — by evidence.
