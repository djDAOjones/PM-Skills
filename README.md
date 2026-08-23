# PM Skills

[![Lint](https://github.com/djDAOjones/PM-Skills/actions/workflows/lint.yml/badge.svg)](https://github.com/djDAOjones/PM-Skills/actions/workflows/lint.yml)

A project-management layer for AI-assisted coding. It gives your AI
agent a **memory** (files that carry your project's context between
chat sessions), a **rulebook** (standards the agent must follow), and
**workflows** (step-by-step procedures for building, fixing, and
shipping). The result: every new chat starts already knowing your
project, and the agent designs before it codes instead of improvising.

Built for solo and small-team builders who own the product direction
but want the AI to handle implementation — without losing context,
drifting off-plan, or wasting tokens.

Defaults: Carbon Design System, WCAG 2.2 AAA accessibility, Nielsen
usability heuristics, JSDoc, and a lean invariant-led testing
doctrine. All customisable.

## The pieces, in plain words

- **Project memory** (`pm_skills/project/`) — living files the agent
  reads and updates: what you're building (`brief.md`), how it's built
  (`architecture.md`), how it's written (`conventions.md`), what's
  next (`backlog.md`), why past choices were made
  (`decision-log.md`), what shipped (`trajectory.md`), raw ideas
  (`wish-list.md`), which protected docs have drifted
  (`doc-deltas.md`), and what each file does (`file-map.md`).
- **Rulebooks** (`AGENTS.md`, `UI-STANDARDS.md`,
  `DEV-INFRASTRUCTURE.md` in your project root) — the permanent rules:
  coding invariants, UI and accessibility standards, and how the
  project builds, runs, and deploys. Complex multi-phase projects can
  add an optional fourth, `PROCESS.md` (macro phases, definitions of
  done, decision-record closure).
- **Workflows** (`pm_skills/integrations/` and `pm_skills/prompts/`) —
  procedures the agent follows. If your AI tool supports workflows
  (e.g. slash commands), copy `integrations/` into its workflow
  folder; otherwise paste the prompt files into chat.

## Set up (once per project)

1. Copy `pm_skills/` into your project — that folder is the **entire**
   distributable. Nothing else in this repo (its own memory, tooling,
   CI) belongs in your project. From a clone of this repo,
   `npm run package -- <your-project>` exports exactly the right set.
2. Fill everything in by following `pm_skills/init.md` — its Step 0
   copies the rulebook templates from `pm_skills/templates/` to your
   project root (three, plus the optional `PROCESS.md`) — or just
   tell the agent:

   > Run pm_skills/init.md in agent mode.

   It interviews you, drafts each file, and waits for your approval
   before writing anything.
3. Optional, but measured to pay off: if your AI tool supports rules
   imports (a `CLAUDE.md` with `@` imports, or similar), import
   `brief.md`, `architecture.md`, and `conventions.md` there so every
   session starts oriented — about a third fewer tool round-trips at
   equal quality. Import those identity files only, never the files
   being worked on (`pm_skills/GUIDE.md` → "How it works").

Starting from nothing but an idea? Use
[`pm_skills/integrations/init-mvp.md`](pm_skills/integrations/init-mvp.md)
instead:

> Run init-mvp: I want a web app that tracks my houseplants'
> watering schedules.

You approve two things — the foundation (what it understood, the tech
stack, the task list) and **how far to go** (just build it locally, or
carry on and deploy it) — then it builds the whole first version
without further questions.

Already have a codebase? Use
[`pm_skills/integrations/adopt.md`](pm_skills/integrations/adopt.md)
instead of init:

> Run adopt.md on this repo.

It reverse-engineers your project memory from the source tree and git
history, then asks only for what the repo can't tell it — proposing
edits to your existing docs, never overwriting them.

## Day to day: pick → build → close

### 1. Pick what to work on

Open a fresh chat. Either name the task yourself:

> My task: add a CSV export button to the reports page.

…or let the agent choose from your backlog:

> Pick the next batch.

It will propose the next logical item (triaging any parked ideas
first) and wait for your go-ahead.

…or hand the whole loop over:

> Run next.

That picks the next item, builds it without check-ins, and closes it
— one item per invocation, so you stay in control of the cadence
(items flagged `[sign-off]` still stop for you). Got two or three
independent items and spare chat windows? "Run dispatch" hands each
one a paste-ready brief and integrates the results when they return.

### 2. Build it with the task workflow

Run `task.md` (or paste the stage prompts — see the GUIDE). By
default it works in **checkpoint** mode, which interrupts you only
twice:

1. It investigates and presents the **scope** — you approve it.
2. It presents 2–3 **design options** with a recommendation — you
   pick one.

Then it plans, sanity-checks, and implements on its own, telling you
what it assumed. Other modes when you want them:

> Run this as full. — *a check-in at every stage; use for risky work*
>
> Run this as auto-jazz. — *no check-ins at all; it decides, builds,
> and reports*
>
> Run this as a spike. — *timeboxed investigation; it comes back with
> findings, not code*
>
> Refactor X without changing behaviour. — *restructuring within a
> declared set of files; behaviour stays put*

Small fix or tweak? Say it's a quick task and you get a single
scope-and-plan to approve instead of four stages. Something broken?

> This is a bug: saving a plant with no name crashes the app.

…runs `bugfix.md`, which diagnoses the root cause and gets your OK
before fixing anything.

Whatever the mode, the agent must respect the hard limits: no new
dependencies, no touching protected files, no deleting data, no
weakening tests — it stops and asks instead.

### 3. Close the task

> Run end-of-task.

The agent runs the project's quality check, updates the memory files
(ticks off the backlog item, records why decisions were made, logs
what shipped), commits — pushing if a remote is configured — and
reports. This is what keeps the next session smart — don't skip it.
(Prefer to commit yourself? One line in your `AGENTS.md` — "Closes
propose commits; never auto-commit or push" — switches it back.)

In a burst of small items, a **lite** close runs the quality check
but defers the memory writes to a structured commit trailer; a later
Reconcile pass back-fills the files from git history. The memory
loop is never skipped, only batched.

## While you're working

One-liners that keep a session on track (full list in
`pm_skills/prompts/session-start.md`):

> Park it. — *captures a side-idea to the wish-list and gets back to
> work*
>
> Tighten scope. / Reset to plan. / Stay in design mode. — *course
> corrections*

## Every so often

- **After an autonomous run** (auto-jazz or an init-mvp build):
  "Run review.md" — a read-only audit of what landed, with a verdict
  and follow-up list, before you accept the work.
- **When the agent says memory needs attention**: approve the
  `memory-maintenance.md` pass it proposes — one of six verbs:
  health-check the files (Diagnose), archive old content losslessly
  (Prune), repair a messy backlog (Refactor), re-judge a stale queue
  (Re-assess), back-fill memory after lite closes (Reconcile), or
  bring drifted protected docs back in line (Doc-sync).
- **A pile of notes to turn into work**: "Draft a backlog from these
  notes" — loose ideas or a meeting transcript become grammar-true
  backlog items by milestone, with ticket files for the big ones.
- **Ready for production**: "Run deploy.md" — pre-flight checks, the
  documented deploy pipeline, live verification, rollback if anything
  fails.
- **New framework version out**: point the agent at the newer
  pm-skills and say "Run upgrade.md" — it applies only what changed,
  never touches your project memory, and never overwrites your
  customisations.

The full guide — folder contents, how the memory tiers work, and the
copy-paste flow for AI tools without workflow support — is
[`pm_skills/GUIDE.md`](pm_skills/GUIDE.md).

## What's in this repo

- **`pm_skills/`** — the framework, the **only** distributed tree:
  templates (`pm_skills/templates/` — the rulebooks with
  `<!-- CUSTOMISE -->` placeholders, copied to a consuming project's
  root at init), prompts, workflows, scaffold tooling, docs.
  Versioned via `pm_skills/VERSION`, `pm_skills/CHANGELOG.md`, and
  `pm_skills/MANIFEST.md`, which make upgrades a declarative read
  rather than a full-tree diff. `npm run package -- <target>` exports
  it, manifest-verified.
- **`AGENTS.md`** (repo root) — this repo's **operative agent
  contract** (the framework develops itself on its own loops —
  self-hosted). Not a template and not distributed; the template
  lives at `pm_skills/templates/AGENTS.md`.
- **`self/`** — this repo's own living project memory
  (`self/project/`) and archived history. Source-only, never
  distributed — see `CONTRIBUTING.md`.

## Glossary

### Project memory (`pm_skills/project/`)

| File | What it holds |
| --- | --- |
| `brief.md` | What you're building, for whom, and what's out of scope. |
| `architecture.md` | Tech stack, folder structure, key modules. |
| `conventions.md` | Code style, naming, testing and tooling choices. |
| `backlog.md` | Open work only, grouped by milestone. Shipped items leave. |
| `decision-log.md` | Why each design choice was made (append-only). |
| `trajectory.md` | One line per shipped item — the project's history. |
| `wish-list.md` | Raw parked ideas, waiting to be triaged in or cut. |
| `file-map.md` | One line per source file: its role in the codebase. |
| `doc-deltas.md` | Ledger of protected docs (specs, ADRs) that no longer match the code; cleared by a Doc-sync pass. |
| `tickets/<ID>.md` | Optional extra detail for one big backlog item; deleted when it ships. In records mode, one per open item — the backlog's Active section is generated from them. |
| `archive/` | Old memory moved out of the way; created on the first prune. |

### Rulebooks (project root)

| File | What it governs |
| --- | --- |
| `AGENTS.md` | Hard rules and invariants every agent session must follow. |
| `UI-STANDARDS.md` | Design system, usability, and accessibility standards. |
| `DEV-INFRASTRUCTURE.md` | Build, dev server, runtime, diagnostics, quality gate, deploy. |
| `PROCESS.md` (optional) | Macro phases with definitions of done, decision-record closure, risk watch list — for complex multi-phase projects only. |

### Framework files (`pm_skills/`)

| File | What it is |
| --- | --- |
| `GUIDE.md` | The full manual — read this second, after this README. |
| `init.md` | Project setup, step by step (manual or agent-run). |
| `memory-policy.md` | Size budgets for memory files and what to do when they trip. |
| `VERSION` / `CHANGELOG.md` / `MANIFEST.md` | Framework version, release history (doubles as upgrade instructions; older epochs archived verbatim in `CHANGELOG-1x.md`, `-2x`, `-3x`), and per-file upgrade rules. |
| `templates/` | The rulebook templates — three, plus the optional `PROCESS.md`; copied to your project root at init (Step 0). |
| `scaffold/` | Starter config to copy to your project root: `.editorconfig`, `.gitignore`, `.markdownlint.json`, `check-links.mjs` — plus run-in-place tooling: `gen-file-map.mjs` and the optional records-mode pair `gen-backlog.mjs` + `check-memory.mjs`. |

### Commands — what you say, what runs

| You say | What runs | What happens |
| --- | --- | --- |
| "My task: …" | `integrations/task.md` (checkpoint mode) | Scope → your approval → options → your pick → it plans and builds. |
| "Run this as full / auto-jazz / auto-jazz-lite" | `task.md` in that mode | Same stages; a check-in at every gate / none / none + compressed. |
| "Run this as a spike" / "Refactor X without changing behaviour" | `task.md` in spike / refactor mode | Timeboxed investigation that returns findings, not code / behaviour-preserving restructuring within a declared file set. |
| "This is a quick task: …" | `prompts/quick-task.md` | One combined scope-and-plan to approve, then build. |
| "This is a bug: …" | `integrations/bugfix.md` | Diagnose root cause first; fix only after your OK. |
| "Pick the next batch" | `prompts/session-start.md` → Start B | Triages the wish-list, proposes the next backlog item, waits. |
| "Run next" | `integrations/next.md` | Picks the next backlog item, builds it auto-jazz, closes it — one item per invocation, no per-item sign-off (`[sign-off]` items escalate to full). |
| "Run dispatch" | `integrations/dispatch.md` | Fans two or three disjoint items out to parallel chats (one lane each, paste-ready briefs); the dispatching chat integrates, releases once, closes. |
| "Run end-of-task" | `prompts/end-of-task.md` | Quality gate, memory updates, size check, commit (and push), closing report. Lite close defers the memory writes to a commit trailer. |
| "Park it" | (one-liner) | Captures the current side-idea to the wish-list, resumes work. |
| "Run review.md" | `prompts/review.md` | Read-only audit of an autonomous run: verdict + punch list. |
| "Run memory maintenance" | `prompts/memory-maintenance.md` | Diagnose (health check), Prune (archive), Refactor (tidy backlog), Re-assess (re-judge the queue), Reconcile (back-fill after lite closes), or Doc-sync (reconcile protected docs). |
| "Draft a backlog from these notes" | `prompts/backlog-authoring.md` | Loose ideas or a transcript → grammar-true items by milestone, plus tickets for the big ones. |
| "Run deploy.md" | `prompts/deploy.md` | Pre-flight, documented deploy pipeline, live checks, rollback path. |
| "Run upgrade.md" | `prompts/upgrade.md` | Updates the framework to a newer version; never touches memory. |
| "Run init.md in agent mode" / "Run init-mvp: …" | `init.md` / `integrations/init-mvp.md` | Set up a new project / set up **and** build it, to a signed-off ceiling. |
| "Run adopt.md on this repo" | `integrations/adopt.md` | Retrofit pm-skills onto an existing codebase; reverse-engineer memory, ask only for gaps. |
| `check` | your project's quality gate | One command that answers "did I break anything?" — defined in `DEV-INFRASTRUCTURE.md`. |

Contributing to the framework itself? See
[`CONTRIBUTING.md`](CONTRIBUTING.md).
