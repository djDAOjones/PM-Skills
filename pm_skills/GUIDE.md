# PM Skills — Guide

The full manual for the framework. You don't need to memorise it —
your AI agent reads the rules for you. Read this once to understand
the moving parts; come back when you want the "why" behind something.

For solo and small-team builders who own product direction and macro
structure but want AI agents to handle implementation without losing
context, drifting, or wasting tokens.

Defaults to Carbon Design System, WCAG 2.2 AAA, Nielsen heuristics,
JSDoc, and a lean invariant-led testing doctrine. All customisable,
none apologised for.

## How it works — the mental model

An AI chat session has no memory: close the window and everything it
learned about your project is gone. This framework fixes that with
**files the agent reads at the start of every session and updates at
the end of every task**:

- **Project memory** (`project/`) — the living state: what you're
  building, what's next, what shipped, and why choices were made.
- **Rulebooks** (`AGENTS.md`, `UI-STANDARDS.md`,
  `DEV-INFRASTRUCTURE.md` in your project root) — the permanent rules:
  invariants, UI and accessibility standards, build and deploy facts.
  Populated once during setup; updated only when big decisions change.
- **Workflows** (`integrations/` and `prompts/`) — the procedures:
  how to scope, design, plan, validate, implement, and close a task.

Two habits make the memory work:

- **Compress on ship.** When a task finishes, its backlog item is
  removed, one line goes to `trajectory.md` (what happened), and the
  reasoning goes to `decision-log.md` (why). Nothing is written twice,
  so the files the agent reads every day stay small.
- **Read tiers.** Not every file is read every time. Hot files (the
  brief, the architecture) are read every task; `backlog.md` and the
  file map are read by section; `trajectory.md` only on demand; the
  wish-list and archives never load automatically. This keeps each
  session's context — and token bill — bounded as the project grows.
  The canonical tier policy lives in `AGENTS.md` → "Before every
  task"; the size budgets live in `memory-policy.md`.

AI tools that support global rules load `AGENTS.md` automatically.
For other tools, `prompts/session-start.md` lists what to read.

## What's in this folder

```text
VERSION          Current framework version (semver). The upgrade check.
CHANGELOG.md     Append-only release log; each entry is an upgrade plan.
MANIFEST.md      Path classes: framework / template / memory / scaffold.
GUIDE.md         This guide.
init.md          Project setup, step by step (manual or agent-run).
memory-policy.md Memory size budgets + overrun actions (read at task close only).

project/         Your living project memory. Fill once, maintain ongoing.
  brief.md         What we're building, for whom, what's out of scope.
  architecture.md  Tech stack, structure, key modules.
  conventions.md   Style, naming, patterns, tooling.
  backlog.md       Open work only (Current, Next, Icebox).
  trajectory.md    Shipped-work history, one line per item.
  wish-list.md     Parked ideas, waiting for triage.
  file-map.md      One line per source file: its role. Skeleton generated; read by section.
  decision-log.md  Append-only record of the WHY behind decisions.

prompts/         Reusable per-task prompts (paste, or run as commands).
  session-start.md        Begin a chat: context, task starts, next-batch pick, drift corrections.
  scoping.md              Stage 1: what needs to change and why.
  design-options.md       Stage 2: 2–3 ways to do it, with a recommendation.
  implementation-plan.md  Stage 3: files, sequence, acceptance criteria.
  validation.md           Stage 4: pre-code sanity and risk checks.
  quick-task.md           Single-stage scope-and-plan for small tasks.
  bug-scoping.md          Bug diagnosis: reproduce, root cause, minimal fix.
  end-of-task.md          The closing ritual: quality gate + memory updates.
  review.md               Read-only audit of an autonomous run or feature area.
  memory-maintenance.md   Diagnose / Prune / Refactor / Reconcile project memory.
  upgrade.md              Move a project to a newer framework version.
  release.md              Maintainer release checklist (source repo only).
  deploy.md               Production deploy + live verification.

integrations/    Tool-workflow files (copy to your AI tool's workflow dir).
  task.md      The task workflow — modes: full / checkpoint (default) / auto-jazz / auto-jazz-lite / spike / refactor.
  bugfix.md    Diagnosis-before-fix workflow for bugs.
  init-mvp.md  Sign off foundation + scope band, then autonomous build (and optional deploy).
  adopt.md     Retrofit pm-skills onto an existing codebase; reverse-engineer memory, interview for gaps.

scaffold/        Starter config to copy into your project root once.
  .editorconfig       Editor style enforcement (indent, encoding, etc.).
  .gitignore          Common ignores for JS/npm projects.
  .markdownlint.json  Markdown lint baseline: strict on breakage, relaxed on style.
  check-links.mjs     Dependency-free internal Markdown link checker (Node).
  gen-file-map.mjs    Dependency-free file-map skeleton generator (Node).
```

## Two ways to drive it

- **Workflow-capable AI tools** (slash commands or similar): copy the
  files from `integrations/` into your tool's workflow directory —
  plus `prompts/upgrade.md` and `prompts/memory-maintenance.md` if you
  want those as commands too (they carry workflow frontmatter). Then
  you just invoke a workflow and talk.
- **Any other AI tool**: paste the prompt files into chat at the right
  moments. The "Manual paste flow" section below gives the exact
  sequences. Same rigour, more copy-paste.

## Starting a project

**New project, you drive the setup:** follow [init.md](./init.md) step
by step (~30 minutes) — or tell the agent "Run pm_skills/init.md in
agent mode" and approve each artifact as it drafts them. Either way
you end with populated memory, populated rulebooks, and a first
backlog.

**New project, the agent builds it too:** run
[`integrations/init-mvp.md`](./integrations/init-mvp.md), e.g.

> Run init-mvp: I want a web app that tracks my houseplants'
> watering schedules.

You approve the **foundation** (its reading of what you want, the
stack, the task list) and a **scope band** — how far this run may go:

| Band | It builds… | Then |
| --- | --- | --- |
| 0 (default) | the first milestone (an MVP) | hands back, running locally |
| 1 | the MVP | deploys it to production |
| 2 | everything in the Current milestone | deploys |
| 3 | the full committed backlog | deploys |

After sign-off it runs to that ceiling without further questions,
committing rollback checkpoints as it goes, and stopping early only if
the plan proves wrong (or a hard limit is hit).

**Existing codebase, no pm-skills yet:** run
[`integrations/adopt.md`](./integrations/adopt.md). It reverse-engineers
your project memory from the source tree and git history — file map,
architecture, a seeded trajectory, a brief that points at your existing
docs — then interviews you only for what the repo can't tell it
(product intent, invariants, deploy target, what's next). It proposes,
never overwrites: existing READMEs and specs are linked and digested,
not clobbered. Ends at the `init.md` readiness check, ready for Start B.

**Existing project on an older pm-skills:** point the agent at the
public repo (`https://github.com/djDAOjones/PM-Skills.git`) as the first
port of call, or another newer source (sibling clone, fork Git URL, or
pasted files), and run [`prompts/upgrade.md`](./prompts/upgrade.md). It
reads the version gap, applies only the documented deltas, and never
overwrites your memory or customisations.

## The daily loop: pick → build → close

### Pick

Open a fresh chat. Name the task ("My task: add CSV export to the
reports page") or say **"pick the next batch"** — the agent triages
any parked wish-list ideas, proposes the next logical backlog item
with a recommended mode, and waits for your go-ahead.

### Build

Run `task.md`. Its **modes** set how often it stops for you:

| Mode | Stops for you at… | Use for |
| --- | --- | --- |
| `checkpoint` (default) | scope approval + design pick | everyday non-trivial tasks |
| `full` | every stage (scope, options, plan, validation) | `[sign-off]` items, high-risk work |
| `auto-jazz` | nothing — states assumptions and continues | work you'd accept sight-unseen |
| `auto-jazz-lite` | nothing, and compresses the stages | small, low-risk tasks |
| `spike` | nothing — timebox, then findings | timeboxed exploration (items flagged `[spike]`) |
| `refactor` | scope (declared surface) + design pick | behaviour-preserving restructuring within a named file set |

(The `refactor` **mode** restructures code with no behaviour change; the
`Refactor` **verb** in `memory-maintenance.md` tidies drifted project
memory — different files, same word.)

Why checkpoint is the default: scope and design choice are where your
judgement genuinely changes the outcome; plan and validation approvals
are usually rubber stamps that cost a whole round-trip each. You keep
the two decisions that matter and skip the ceremony.

In every mode the same hard limits apply (see `task.md`): no new
runtime dependencies, no touching protected or never-edit files, no
destructive migrations or data deletion, no refactors sprawling past
the agreed scope, no weakening tests. The agent stops and asks rather
than crossing one.

**Small tasks** take the quick path (one combined scope-and-plan)
instead of four stages — say "this is a quick task", or let the size
triage in `task.md` spot it. **Bugs** go through `bugfix.md`:
reproduce, diagnose the root cause with evidence, and only fix after
you confirm the diagnosis.

### Close

Say "run end-of-task" (`prompts/end-of-task.md`). The agent:

1. Runs the project's one-command quality gate (`check`).
2. Verifies the app still boots, if the task touched the runtime.
3. Updates project memory — removes the shipped backlog item, records
   the why in `decision-log.md`, adds the trajectory line, refreshes
   the file map and any rulebook that changed.
4. Size-checks the memory files (a fast path skips the full audit on
   most tasks) and proposes maintenance if a budget tripped.
5. Reports what it did.

This ritual is what makes the *next* session start smart. Don't skip
it.

**Closing lite (for burst work).** If you're closing a run of small
tasks fast and don't want a full memory write each time, say "close
lite". The agent still runs the quality gate and boot check, but
records the task as a structured `Close: lite` trailer in the commit
message instead of updating the memory files — deferring, never
skipping, the write. Later, `memory-maintenance.md` → **Reconcile**
reads those trailers from git history and back-fills the backlog,
trajectory, and decision-log in one pass. Session start counts any
unreconciled lite closes and, past a cap, insists on a reconcile before
picking new work — so the deferral can't quietly become a memory hole.
`[sign-off]` items and fully-gated runs can't close lite; their
reasoning is the record.

### After an autonomous run

If the work ran gateless (`auto-jazz`, `auto-jazz-lite`, an `init-mvp`
build), paste `prompts/review.md` before accepting it: a read-only
audit that maps the changes to intent, checks every stated assumption
and hard rule, names what only a human can verify, and ends with a
verdict and punch list. It proposes; it never silently rewrites.

`review.md` also accepts a **feature area** (a name plus its IDs and/or
entry-point files) instead of a diff range: it assembles the change set
from `git log --grep` per ID plus the matching memory entries — the
natural review unit once batches ship gateless and lite-closed (a
reconciled batch is a ready-made area).

## Manual paste flow

For AI tools without workflow support. Start every session by pasting
the relevant parts of `prompts/session-start.md` (context list + one
Start block), then:

**Non-trivial task (4-stage):**

1. Paste `prompts/scoping.md` → approve the scope.
2. Paste `prompts/design-options.md` → pick an option.
3. Paste `prompts/implementation-plan.md` → approve the plan.
4. Paste `prompts/validation.md` → confirm readiness.
5. "Go ahead and implement."
6. Paste `prompts/end-of-task.md`.

Checkpoint variant (recommended): after step 2, say "run plan and
validation without stopping, state assumptions, then implement" —
saving two round-trips.

**Small task:** paste `prompts/quick-task.md` → approve the plan →
"go ahead" → `prompts/end-of-task.md`.

**Bug:** paste `prompts/bug-scoping.md` → approve the diagnosis and
fix plan → "go ahead and fix" → verify → `prompts/end-of-task.md`.

**Ship to production:** when work is merged and green, paste
`prompts/deploy.md` — it runs the pipeline documented in
`DEV-INFRASTRUCTURE.md` → Deployment and verifies the live result.

## Looking after project memory

Mostly automatic: `end-of-task.md` keeps the files current, and you
approve a maintenance pass when the agent proposes one. For reference,
what changes when:

| File | When it updates |
| --- | --- |
| `brief.md` | Rarely — only if the project's direction fundamentally changes. |
| `architecture.md` | When major modules or the stack change. |
| `conventions.md` | When a convention is established or changed. |
| `backlog.md` | Every task — shipped items leave, follow-ups join. |
| `tickets/<ITEM-ID>.md` | Optional, for one big item's working detail; deleted when it ships. |
| `trajectory.md` | Every task that ships — one line per item. |
| `wish-list.md` | Whenever an idea is parked; drained at the next-batch pick. |
| `file-map.md` | When files are created, renamed, or deleted. |
| `decision-log.md` | During each task's design phase. |
| Root `README.md` + rulebooks | When architecture, UI conventions, or build/deploy facts change. |

**When a size budget trips** (the end-of-task check tells you), the
agent proposes `prompts/memory-maintenance.md` and waits for your
approval. Its four verbs:

- **Diagnose** — read-only health check; finds structural drift and
  points at the right fix. Also worth running after a long gap.
- **Prune** — archives the oldest content whole (never rewritten,
  never summarised) and leaves an index pointer in the live file.
- **Refactor** — tidies a drifted backlog: evicts shipped work,
  merges duplicates, regroups by milestone.
- **Reconcile** — back-fills memory from `Close: lite` commit trailers:
  evicts the reconciled backlog items, adds their trajectory lines, and
  writes one consolidated decision-log entry for the batch.

Budgets and the actions per file live in
[`memory-policy.md`](./memory-policy.md) — the agent reads it at task
close; you never need to.

Two folders are created lazily, so don't be surprised they're missing
on a fresh project: `project/archive/` (first prune) and
`project/tickets/` (first item that needs a detail file).

## Saving session transcripts

Whenever your AI tool can export a conversation, save it to a
`_transcripts/` folder at your project root. It costs nothing during
the work and compounds into evidence: future evaluations,
retrospectives, and prompt-tuning get to read what actually happened in
a session instead of inferring it from the decision log. (The framework
itself learned this the hard way — a later review was blind to months
of sessions because no transcripts existed for them.)

The convention:

- **Folder:** `_transcripts/` at the project root — short, sortable,
  obviously not source.
- **Naming:** `YYYY-MM-DD-<ITEM-ID-or-topic>.md`, one file per session.
- **Tier:** cold — never auto-read. Listed in `AGENTS.md` → cold tier
  alongside the wish-list and archives; it carries zero read-tier cost.
- **Gitignored by default.** The scaffold `.gitignore` ignores
  `_transcripts/`, so transcripts stay local unless you deliberately
  commit them.
- **Redact before committing.** Transcripts can contain secrets (env
  values, URLs with codes, tokens). Committing any transcript is an
  explicit, per-file choice that requires a redaction pass first — the
  same "redact by default" rule as the diagnostics bundle
  (`AGENTS.md` → "Self-explaining runtime").

`end-of-task.md`'s closing report carries a one-line reminder to save
the transcript; it never blocks the close. If you later run a
retrospective evaluation of your sessions, point it here — the evidence
lives in `_transcripts/`.

## Quick answers

- **Do I have to read the memory files?** No — the agent does. Skim
  `backlog.md` when you want to see what's queued; everything else is
  primarily for the agent.
- **The agent is going off-track mid-task.** Use the one-line drift
  corrections in `session-start.md`: "Tighten scope", "Reset to plan",
  "Re-ground in codebase", "Stay in design mode".
- **I had an idea mid-task.** Say **"park it"** — one line goes to the
  wish-list and work resumes. It gets triaged at the next batch pick.
- **A chat died mid-task.** Start a new one with the "Continuing a
  previous task" block in `session-start.md`. For long tasks the
  workflow saves the approved scope and chosen design to the item's
  ticket file, so nothing needs re-deriving.
- **Will upgrading break my memory?** No. `MANIFEST.md` classes every
  file; project memory is never overwritten on upgrade, and populated
  rulebook sections are preserved verbatim.
- **My repo lives in OneDrive / Dropbox / iCloud — is that OK?** It's
  unsupported for project memory: sync folders silently revert tracked
  files and spawn conflict copies. Session start runs a cheap
  warn-only environment preflight, and prune/upgrade block on it before
  moving files, with a sync-conflict repair playbook in
  `prompts/memory-maintenance.md`. If the location is unavoidable, pause
  syncing during sessions or exclude `.git`.
- **What does a task cost me in attention?** Checkpoint mode: two
  decisions (scope, design pick) plus reading the closing report.
  Everything else is the agent's job.
