# TICKET-GEN — Ticket-generation reliability: findings

<!-- self/evaluations/ — cold tier, never auto-read. Spike findings
     for TICKET-GEN (Next milestone). Session: 2026-08-16, canon SHA
     at spike start 21bbd04. Evidence pass only — no fixtures, no
     code; this document and the decision-log entry are the
     deliverables. -->

## Question

Do `[detail]` tickets get created and fleshed out reliably? Name the
scenarios where they don't — or return "works as designed".

## Method

Repository-history evidence pass. Sources: git history of
`self/project/tickets/` and `self/project/archive/tickets/`
(creations, renames, dates); `-G'\[detail\]'` history of
`self/project/backlog.md`; the framework's instruction inventory for
tickets (`prompts/scoping.md`, `integrations/task.md` → resume
insurance, `prompts/session-start.md` → Start B triage,
`prompts/end-of-task.md`, `scripts/check-memory.mjs`); the
2026-07-16 transcripts (including the five uncommitted ones, read
as evidence only); the TRIAGE-REV decision entry.

## Findings

1. **The lifecycle is asymmetric.** Retirement is reliable: 5/5
   shipped `[detail]` items had their tickets archived in the same
   commit that shipped them (R100 renames). Flag↔file consistency
   has been mechanically enforced since 4.1.0 — the validator FAILs
   both an orphan ticket file and a `[detail]` item whose file is
   missing. Creation is the unprotected end.
2. **No ticket has ever been created organically at scoping.** All
   eight tickets in repo history were batch-authored on one day
   (2026-07-16): seven at the SELF-HOST adoption commit, one
   (NEXT-CMD) at a triage commit. In the 31 days and ~18 shipped
   items since, zero tickets were created — and none were clearly
   needed: every item shipped in-session, and spikes route their
   detail to `self/evaluations/` plus the decision log. The
   scoping-time triggers ("context worth keeping", "resume
   insurance") are judgement-only and have never fired; their
   failure mode — silently re-deriving scope after an interrupted
   run — leaves no trace, so absence of failures is weak evidence.
3. **The observable gap is at triage/promotion time.** Start B's
   triage step instructs promote-or-cut and *deletes* the promoted
   wish-list line ("no history kept here"), but never mentions
   ticket creation. TRIAGE-REV (2026-08-09) promoted 17 items and
   created no tickets; the rich context stayed in cold-tier
   `self/evaluations/` — the same entry that rejected cold storage
   for the *pick* left the *detail* there. The one organic creation
   (NEXT-CMD) fired only because the session noticed the `[detail]`
   convention implied the file — and it had to open `ITEM-AGE.md`
   first to learn the house ticket format.
4. **No ticket template exists.** `pm_skills/project/` ships no
   ticket skeleton; the grammar comment in the backlog template is
   the only specification of what a ticket holds.
5. **The maintainer routes around the gap.** The wish-list already
   captures: a backlog-ticket-writing command ("I often offload
   this to a different agent"), an easier backlog→ticket link, and
   backlog legibility. The felt pain is authoring, not retirement.

## Scenarios where tickets don't get created

- **S1 — Promotion of a context-rich idea at triage.** No
  instruction exists; the wish-list line is deleted on promotion;
  the context survives only if it happens to live elsewhere (as the
  evaluation series did) or the promoter volunteers `[detail]`.
  Observed: TRIAGE-REV, 17 promotions, zero tickets.
- **S2 — Externally-authored tickets.** The maintainer offloads
  ticket writing to a non-framework agent with no template or
  format contract to hand it; output shape depends on the agent.
- **S3 — Scoping-time resume insurance misjudged.** The trigger is
  pure judgement; a wrong "will finish in-session" call costs a
  silent scope re-derivation later. Never observed — and never
  observable without instrumentation.
- **Update path — no evidence either way.** "Flesh out as the item
  continues" has never been exercised: no `[detail]` item has been
  actively worked since adoption (all three current tickets are
  dormant alongside their dormant items, which is as designed).

## Verdict and recommendation

Creation-at-scoping: **works as designed** on current evidence.
Creation-at-promotion: **unreliable by construction** — no
instruction, no template, and evidence of routing around it. The
fix surface is authoring, not consistency (the validator already
owns consistency): (a) a ticket skeleton in the distribution, (b)
one line in the Start B triage step — a promoted line that has
outgrown its backlog line gets `tickets/<ID>.md` + `[detail]`
*before* the wish-list line is deleted, (c) optionally the
wish-listed ticket-writing command. Converges with three existing
wish-list captures — triage them as one authoring cluster.
