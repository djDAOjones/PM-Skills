<!-- field-report: project=uon-video-helper · date=2026-08-27 · type=note
     · pm-skills=4.9.2
     · source=analysis of local Claude Code and Codex JSONL session logs
     · redacted=absolute home and checkout paths omitted; one unrelated repository name generalised; no emails or credential-shaped values included
     · not-redacted=short session identifiers, dates, aggregate counts, and brief process-only maintainer excerpts -->

# PM Skills usage analysis

## Method and boundary

The analysis cutoff is 2026-08-27T23:12:50+01:00, aligned with repository
commit `09702c2`. The long-running Claude session already active at that point
and this field-report run are copied as partial evidence but excluded from
historical completion-rate denominators.

The corpus includes the project's Claude directory, relevant Claude workflow
and subagent logs, Codex sessions whose metadata names this checkout, attached
Codex guardian traces, and one session that was launched from an unrelated
repository but demonstrably edited UoN Video Helper. Mere path mentions caused
by injected memory or cross-project audit prompts were excluded. The first
eight Codex histories mirror Claude transcripts; matching opening prompts and
a sampled autojazz pair with 220 of 221 identical Claude text blocks establish
that they are imports, not new logical sessions. They remain in the raw export
but are deduplicated for run and close counts.

Ten of the eleven historical Codex parent logs also carry an
`EXTERNAL SESSION IMPORTED` marker. Their Codex record timestamps are import
times, not reliable evidence of the original session chronology.

A “message” below means a native user/assistant record: top-level
`type=user|assistant` for Claude, including tool-result envelopes, and a Codex
`response_item` whose payload is a user/assistant message. The figure is
reproducible within each format but is not a cross-platform turn count. The
checksummed raw-copy inventory is `local/sessions/index.md`.

## Volume

| Corpus | Logical primary runs | JSONL files | Native messages | Bytes | Span |
| --- | ---: | ---: | ---: | ---: | --- |
| Historical, completion-rate denominator | 13 | 94 | 17,308 | 91,301,106 | 2026-08-24 to 2026-08-27 |
| Active partials copied, rates excluded | 2 | 5 | 1,741 | 14,640,622 | 2026-08-27 |
| **All copied evidence** | **15** | **99** | **19,049** | **105,941,728** | **2026-08-24 to 2026-08-27** |

The 99 raw files comprise ten complete Claude primaries, one wrong-cwd Claude
primary, 46 Claude workflow/subagent logs, eleven Codex primaries (including
imports), one wrong-cwd Codex mirror, 25 Codex guardians, one active Claude
partial, and four field-report-run partials. Raw files are traces rather than
independent logical sessions, which is why both counts are shown.

## Framework verbs that fired

One invocation means an explicit user invocation or an agent declaration
followed by execution. Merely reading a framework file during setup does not
count. Imported mirrors count once.

| Verb | Invoked | Complete | Abandoned or partial | Evidence |
| --- | ---: | ---: | ---: | --- |
| `session-start` | 1 | 1 | 0 | Explicit run in Claude session `2e4a…`, 2026-08-25 19:45Z. |
| `end-of-task` | 8 | 7 | 1 | Seven reached a close result; Codex `7ce3…` stopped after memory inspection. |
| `memory-maintenance` | 5 | 5 | 0 | Runs in `2e4a…`, `af12…`, `f6e…`, wrong-cwd `2750…`, and `b51d…`. |
| legacy `prune-memory` filename | 0 | 0 | 0 | No exact invocation; the current Prune subverb ran 4/4 times to completion. |
| `release` | 0 | 0 | 0 | No invocation. |
| `upgrade` | 0 | 0 | 0 | The framework was erased and reinstalled instead. |
| `review` prompt | 0 | 0 | 0 | Ordinary code-review sessions occurred, but the framework review prompt did not fire. |
| `next` | 1 | 1 | 0 | Invoked inside the initial MVP workflow. |
| `integrations/task` / autojazz | 5 | 2 | 2 abandoned; 1 active | Later runs relied on the AGENTS trigger rather than rereading `task.md`; classification is behavioural. |
| `integrations/bugfix` | 0 | 0 | 0 | No invocation. |
| `integrations/init-mvp` | 1 | 1 | 0 | Explicitly invoked 2026-08-24; closed green, committed, pushed, and deployed. |
| `integrations/adopt` | 0 | 0 | 0 | Inspected during setup only. |

The four completed Prune runs correspond to three archive-producing rotations
and one ledger/wish-list cleanup. This agrees with the repository decision-log
evidence; it is not inferred from archive filenames alone.

## Task-close outcomes

Across 13 historical logical primary sessions:

- Four ended with a final green gate and a session-owned commit: init-MVP
  (`53fe…`), specification refinement (`ff92…`), the shared Codex/Claude
  context (`627f…`), and maintenance/reconciliation (`b51d…`). This is the
  strict **4/13 direct gate-plus-commit** result.
- One housekeeping session (`af12…`) performed a formal green secondary close;
  another live session had already swept its edits into a commit whose subject
  did not describe them.
- Five mutation sessions ended without a clean canonical close: a resumed
  review bundle left new files uncommitted; backlog/doc-sync work continued
  after its only gate; a long autojazz batch ended in a handoff after its last
  milestone commit; a wrong-cwd continuation stopped for a parallel writer;
  and Codex remediation stopped mid-close with memory edits uncommitted.
- Two read-only or informational sessions ended normally without owned
  mutations, commits, or a formal close.
- One bootstrap session installed and reinstalled the framework before the
  application had a canonical `check`, so it is neither a tidy nor an untidy
  application-task close.

There were six formal close episodes: the four direct closes, the secondary
close, and a clean no-change review close. The no-change chat was later resumed
to add a review bundle and then ended with those new files uncommitted, so the
episode is evidence that the ritual ran, not evidence that the later mutations
closed tidily.

## Read-tier discipline

This check searched logged tool inputs. “No logged read found” is deliberately
weaker than “was not read”, because persisted or truncated tool output can hide
an access.

- Of ten framework-era completed top-level Claude sessions, three (`53fe…`,
  `2e4a…`, `b51d…`) logged reads of all four hot-whole files. **Seven had no
  logged read of at least one**: `85d…`, `9d0…`, `af12…`, `e238…`, `f6e…`,
  `ff92…`, and wrong-cwd `2750…`. Several were narrow or read-only tasks, but
  the rule says the hot set is read every task.
- Four distinct sessions read cold `doc-deltas.md` beyond its allowed count-only
  access outside a Doc-sync pass: `af12…` line 118; `f6e…` line 30; `ff92…`
  line 68; and `2e4a…` lines 68/77 and 594/597. This is a recurring finding,
  not a single-line anomaly.
- In `f6e…` line 48, the agent also bulk-read seven cold ticket files instead
  of only the current item's detail file. This finding rests on one logged tool
  call.

The repeated cold-tier miss is therefore specific: full or entry-body reads of
`doc-deltas.md` occurred in four sessions even though ordinary tasks may read
only its open-count line.

## Maintainer process corrections and steering

No literal “you forgot to” or “that is not what the rulebook says” correction
appears in the corpus. The highest-signal process steering is below. Each quote
rests on one raw record unless the recurrence is stated.

- 2026-08-24 18:37Z, `53fe…` line 287: “confirmed, but also undertake a
  verification step your side to check work.”
- 2026-08-25 21:54Z, `85d…` line 221: “wait for the active chat to release the
  backlog + ticket file”.
- 2026-08-25 21:56Z, `2e4a…` line 1640: “pause so another chat can access file
  editing”.
- 2026-08-26 21:05Z, Codex `c9e2…` line 329: “put the relevant review docs in
  the repo and make the prompt refer to file paths...” This followed a
  chat/download handoff and asks for durable repository evidence.
- 2026-08-27 around 12:37 local, Codex `7ce3…` line 210: “I started that session
  by mistake and closed it... assess ... expunge or take anything useful.” The
  agent had detected overlapping edits.
- 2026-08-27 21:23Z, `b51d…` line 169: “don't prune where it harms the project
  development quality, otherwise prune.” This is explicit steering against
  mechanical compression, not a ban on pruning.

## Friction and recurrence

- **Parallel-writer friction recurred in at least four logical sessions.** One
  session saw another commit its files; two 2026-08-25 chats needed explicit
  release/pause instructions; the wrong-cwd continuation stopped on a live
  writer; and the later remediation session reviewed and recovered the
  abandoned work.
- **OneDrive friction was restated three times in the init-MVP conversation.**
  The maintainer reported sync paused once on 2026-08-24 and twice on
  2026-08-25. Later sessions still treated HEAD movement or reversion as a live
  hazard.
- **The exact backlog Active over-budget warning appears in ten of twelve
  primary Claude traces.** Raw occurrences duplicate tool output, so this is a
  session-level count. The maintainer's later pruning instruction qualifies how
  that repeated warning should be acted on.
- **Formal close discipline was not stable.** Five mutation sessions handed off
  or stopped without the canonical final gate-and-commit close, despite many
  green milestone gates and commits inside the longer workflows.
- **The framework review verb was quietly absent.** Multiple evidence-led
  review sessions occurred; `pm_skills/prompts/review.md` fired zero times.
- **Prompt-fit observation:** the init-MVP integration lasted more than 25
  hours, made 866 tool calls, crossed a context continuation, and repeatedly
  asked whether to continue in the same or a fresh chat. Those are observed
  facts; this report does not infer whether the workflow was wrong.
