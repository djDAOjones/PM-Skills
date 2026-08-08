# CTX-CACHE — Import placement: findings

<!-- self/evaluations/ — cold tier, never auto-read. Spike findings
     for CTX-CACHE (Wave 1). Session: 2026-08-09, canon SHA at spike
     start 857fd41. Apparatus: matched pair of blinded fixture runs
     (fetch vs pre-loaded), oracle-verified at equal quality, plus
     static arithmetic on this repo's real hot set. -->

## Question

What share of an autonomous run is spent fetching the hot set, and
does moving the stable identity documents into the rules position
(pre-loaded before the ask) reduce cost and round-trips? Deliver a
number, then codify or drop.

## Method

Two blinded sub-agent runs of the same trivial task (PLANT-2) on
byte-identical fixtures at the same starting commit. Run A: standard
fetch — the agent reads its own context via tool calls. Run B: the
four identity documents (AGENTS, DEV-INFRASTRUCTURE, brief, backlog
Active) inlined in the prompt as pre-loaded rules-position content;
workflow files still read on demand. Outcome quality verified
mechanically on both: `check-memory.mjs` clean, and all four
property assertions identical.

## The numbers

| Metric | A (fetch) | B (pre-loaded) | Delta |
| --- | --- | --- | --- |
| Sub-agent tokens | 80,824 | 69,684 | **−11,140 (−13.8%)** |
| Tool calls | 27 | 17 | **−10 (−37%)** |
| Files opened | 17 | 8 | −9 |
| Duration | 238 s | 219 s | −8% |
| Outcome quality | oracle clean, 4/4 assertions | oracle clean, 4/4 assertions | equal |

Fixture hot set: 178 words (~240 tokens). The token saving
(11,140) is ~46× the pre-loaded content's size — so at fixture
scale the saving is **not** content deduplication. It decomposes
into round-trip overhead (10 fewer calls, each carrying wrapper and
result duplication) and, unexpectedly, **reduced foraging**: the
pre-grounded agent opened nine fewer files overall (it skipped
quick-task, wish-list, file-map, conventions, architecture, even
the source module), navigating directly instead of exploring. An
agent that starts oriented searches less.

Static magnitude for the real case: this repo's hot set is 3,526
words (~4,700 tokens) across five documents. In fetch mode that is
~5 tool round-trips and ~4,700 duplicated result tokens per
session, every session. In the rules position it loads once,
byte-stable — eligible for provider prefix caching across turns
and, within cache windows, across sessions of an autonomous loop
(cache reads price at roughly a tenth of fresh input). Cache-hit
share itself was not measurable here — the sub-agent usage figures
do not expose a cache split — so the cache leg remains arithmetic,
stated as such.

## Caveats

- N=1 per variant, one trivial task, one model tier. Deltas are
  direction-and-scale evidence, not precision.
- The reduced-foraging effect cut nine reads harmlessly on a
  trivial task; on a complex task, less exploration is a tail risk
  as well as a saving. Pre-load the *identity* docs, never the
  work-target files — Run B correctly still read `README.md` from
  disk before editing it.
- Pre-loading via prompt is a simulation of rules-position imports;
  real harness imports (e.g. memory imports in Claude-Code-class
  tools) should behave at least as well (loaded before the ask,
  cached by the harness).

## Verdict: codify — adapter lane

The assessment's three payoffs reorder empirically: round-trip
elimination and the unanticipated foraging reduction dominate;
content deduplication grows with hot-set size; cache pricing is
real but unmeasured here. Codification per the two-lane rule:

1. **Self-host trial (done with this close):** a root `CLAUDE.md`
   importing the hot set (`AGENTS.md`, brief, architecture,
   conventions) — source-only, reversible by deletion, observed in
   ordinary future sessions.
2. **Distributed guidance (parked to triage):** a short note in the
   GUIDE/session-start recommending rules-position imports of the
   identity documents where the tool supports them, with the
   pre-load-identity-not-targets rule. A wish-list line carries it
   to the next triage; it is one paragraph and can ride any future
   release.

## Follow-ups

Wish-list: the distributed guidance note (CTX-IMPORTS). The
attention counters (MEM-CHECK-2) should eventually report hot-set
share per session so this number stops being a one-off measurement.
