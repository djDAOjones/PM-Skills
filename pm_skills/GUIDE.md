# PM Skills — Guide

An opinionated starter pack for AI-assisted coding projects.
Structured markdown files, design-before-code discipline, and
persistent project memory — the way Joe likes to work in 2026.

For solo and small-team builders who own product direction and
macro structure but want AI agents to handle implementation
without losing context, drifting, or wasting tokens.

Defaults to Carbon Design System, WCAG 2.2 AAA, Nielsen heuristics,
JSDoc, and a lean invariant-led testing doctrine. All customisable,
none apologised for.

## Start here

**New project?** Follow [init.md](./init.md) step by step.

**New project, and you want the agent to build it?** Run
[`integrations/init-mvp.md`](./integrations/init-mvp.md). It is the
guided-then-autonomous path: you sign off the foundation (the product
read, the stack, and the MVP backlog), then it builds the first-milestone
MVP to completion without further gates — de-risked by staged rollback
checkpoints. Same rigour as the gated path.

**New project, and you want it built *and shipped*?** Same workflow —
`init-mvp.md` — with a deploy band: sign off the foundation, pick Band
1–3 (deployed MVP / deployed Current milestone / full backlog), and it
carries on to a production deploy via
[`prompts/deploy.md`](./prompts/deploy.md). Two gates only: the
foundation, and how far to go.

**Already using an older version of pm-skills?** Run or paste
[`prompts/upgrade.md`](./prompts/upgrade.md) into your AI tool. The
workflow compares your project's `VERSION` against the latest, applies
only the deltas the `CHANGELOG.md` documents (stopping early if you
are already current), preserves your project memory and populated root
templates, and never silently overwrites a customised framework file.

## Memory layers and read tiers

The framework uses **two memory layers** and **four read tiers**.

**Two memory layers:**

- **`project/`** — living project memory. Updated every session.
  Contains the brief, backlog, trajectory, wish-list, file map,
  conventions, and decision log.
- **`AGENTS.md` + `UI-STANDARDS.md` + `DEV-INFRASTRUCTURE.md`** (in
  the project root) — permanent behavioral contracts. Contain hard
  rules, invariants, accessibility standards, design system
  conventions, and dev infrastructure rules. Populated during the
  kickoff process (Steps 6–8 of `init.md`) and updated when major
  architectural, UI, or build decisions change.

**Four read tiers** (canonical policy in `AGENTS.md` → "Before
every task"):

- **Hot whole-file** — read every task: reference docs (soft size
  guideline, not prune targets), the accreting `file-map.md` (hard
  prunable budget), and conditional `UI-STANDARDS.md` /
  `DEV-INFRASTRUCTURE.md` (read only when the task touches that domain).
- **Hot sectional** — read by section only (`backlog.md` Active;
  `decision-log.md` latest 10).
- **Warm** — `pm_skills/project/trajectory.md` (shipped-work
  narrative) is read on demand, not every task.
- **Cold** — `pm_skills/project/wish-list.md` (capture inbox),
  `pm_skills/project/archive/*`, and the optional per-item
  `pm_skills/project/tickets/<ITEM-ID>.md` detail files are never
  auto-read (the active item's ticket file is read only when its backlog
  line carries `[detail]`).

AI tools that support global rules load `AGENTS.md` automatically.
For other tools, the session-start prompts include explicit read
instructions.

## What's in this folder

```text
VERSION          Current framework version (semver). The upgrade check.
CHANGELOG.md     Append-only release log; each entry is an upgrade plan.
MANIFEST.md      Path classes: framework / template / memory / scaffold.
GUIDE.md         This guide — folder contents, memory tiers, workflows.
init.md          Step-by-step project initialization (the manual path).
memory-policy.md Memory size budgets + overrun actions (read at task close only).

project/         Durable project memory. Fill once, maintain ongoing.
  brief.md         What we're building.
  architecture.md  Tech stack, structure, key decisions.
  conventions.md   Style, naming, patterns, rules.
  backlog.md       Open work only (Current, Next, Icebox).
  trajectory.md    Shipped-work narrative, in milestones (warm tier).
  wish-list.md     Capture inbox for unscoped ideas (cold; triaged later).
  file-map.md      Key files and their roles.
  decision-log.md  Append-only record of design decisions (the why).

prompts/         Reusable per-task prompts.
  session-start.md        Begin a chat: context load, task starts, next-batch pick, drift corrections.
  scoping.md              Stage 1: scope the task.
  design-options.md       Stage 2: explore options.
  implementation-plan.md  Stage 3: plan the build.
  validation.md           Stage 4: pre-code checks.
  quick-task.md           Single-stage alternative for small tasks.
  bug-scoping.md          Bug-specific scoping: reproduce, diagnose, fix.
  end-of-task.md          Canonical end-of-task housekeeping.
  review.md               Read-only review of a run (esp. autonomous): scope, risk, verdict.
  memory-maintenance.md   Diagnose / Prune / Refactor project memory.
  upgrade.md              Framework upgrade procedure (canonical).
  release.md              Maintainer release checklist (source repo only).
  deploy.md               Production deploy + live verification (consuming project).

integrations/    Tool-workflow files (copy to your tool's workflow dir).
  task.md      The task workflow — modes: full / checkpoint (default) / auto-jazz / auto-jazz-lite.
  bugfix.md    Diagnosis-before-fix workflow for bugs.
  init-mvp.md  Sign off foundation + scope band, then autonomous build (and optional deploy).

scaffold/        Template files to copy into your project root.
  .editorconfig       Editor style enforcement (indent, encoding, etc.).
  .gitignore          Common ignores for JS/npm projects.
  .markdownlint.json  Markdown lint baseline: strict on breakage, relaxed on style.
  check-links.mjs     Dependency-free internal Markdown link checker (Node).
```

## Per-task quick reference

### AI tools with workflow support

If your AI tool supports workflows, copy the files from
`integrations/` to your tool's workflow directory (plus
`prompts/upgrade.md` and `prompts/memory-maintenance.md` if you want
those as commands — they carry workflow frontmatter too). Then run
`task.md` at the start of any task — it reads project memory, runs
the staged pipeline in the chosen **gating mode**, and triggers the
canonical end-of-task housekeeping (`prompts/end-of-task.md`).

The modes (say the mode when you invoke, or take the default):

- **`checkpoint`** — the recommended default. Gates only where human
  judgement adds value: you approve the scope and pick the design
  option; plan and validation run gateless with stated assumptions.
  Two round-trips instead of four.
- **`full`** — fully gated: approval between scoping, design, plan,
  and validation. Use for `[sign-off]` items and high-risk work.
- **`auto-jazz`** — no approval gates. The agent picks the recommended
  option, states each assumption in one line, and continues. Hard
  prohibitions still apply (see `task.md`). Use when you trust the
  agent end-to-end.
- **`auto-jazz-lite`** — no gates and compressed stages (quick-task
  scope-and-plan, then implement + verify + housekeep). Use for small
  or low-risk tasks.

For bugs, run **`bugfix.md`** — the diagnosis-before-fix workflow.

Both workflows search the source tree before changing code and run
the same end-of-task housekeeping: the quality gate (`check`), memory
updates, size check, and a closing report.

After a gateless run (`auto-jazz`, `auto-jazz-lite`, an `init-mvp`
build), paste `prompts/review.md` to review what landed before you
accept it — scope adherence, stated assumptions, risk, and a punch
list. It is read-only: it proposes a verdict and follow-ups, it does
not silently rewrite the work.

### Manual prompt workflow

**Starting from the backlog (any task type):**

Instead of naming the task yourself, use `prompts/session-start.md` →
**Start B**: the agent picks the next logical batch from the backlog
and presents it with a recommended mode — then stops for your
go-ahead. Confirm, then continue with the matching flow below.

**Non-trivial tasks (4-stage):**

1. New chat → paste `prompts/session-start.md` (Standard start).
2. Paste `prompts/scoping.md` → approve scope.
3. Paste `prompts/design-options.md` → pick an option.
4. Paste `prompts/implementation-plan.md` → approve plan.
5. Paste `prompts/validation.md` → confirm readiness.
6. "Go ahead and implement."
7. End of task → paste `prompts/end-of-task.md`.

Checkpoint variant (recommended): after step 3, say "run plan and
validation without stopping, state assumptions, then implement" —
steps 4–5 then run gateless, saving two round-trips.

**Small tasks (single-stage):**

1. New chat → paste `prompts/session-start.md` (Quick start).
2. Paste `prompts/quick-task.md` → approve plan.
3. "Go ahead and implement."
4. End of task → paste `prompts/end-of-task.md`.

**Bug tasks:**

1. New chat → paste `prompts/session-start.md` (Bug start).
2. Paste `prompts/bug-scoping.md` → approve diagnosis and fix plan.
3. "Go ahead and fix."
4. Verify the fix.
5. End of task → paste `prompts/end-of-task.md`.

**Shipping to production:**

When work is merged and green, paste `prompts/deploy.md`. It reads
`DEV-INFRASTRUCTURE.md` → Deployment, runs the pre-flight checks,
executes the documented pipeline, and verifies the live result.

## Keeping project memory fresh

| File | When to update |
| --- | --- |
| `brief.md` | Rarely. Only if the project's direction fundamentally changes. |
| `architecture.md` | When adding major modules or changing the tech stack. |
| `conventions.md` | When a new convention is established or changed. |
| `backlog.md` | End of every task — remove shipped items, add follow-ups (open work only). |
| `tickets/<ITEM-ID>.md` | Optional, per non-trivial item. Created when an item needs detail beyond its line (set the `[detail]` flag); deleted when it ships or is cut. |
| `trajectory.md` | End of every task that ships — one line per shipped item, grouped by phase. |
| `wish-list.md` | When an out-of-scope idea surfaces — append one line. Drained by triage at the next-batch pick (Start B). |
| `file-map.md` | When files are created, renamed, or deleted. |
| `decision-log.md` | During the design phase of each task. |
| `README.md` (root) | When architecture, dev workflow, or key infrastructure changes. |
| `AGENTS.md` (root) | When new invariants, data model changes, protected modules, event namespaces, or anti-patterns are established. |
| `UI-STANDARDS.md` (root) | When new token systems or UI conventions are established. |
| `DEV-INFRASTRUCTURE.md` (root) | When build, dev server, versioning, or script conventions change. |

Use `prompts/end-of-task.md` at the end of every task session to
stay current.

## Keeping memory lean

Project memory is read in tiers so context stays bounded as the
project grows. Tier definitions live in `AGENTS.md` → "Before every
task"; the budget numbers and overrun actions live in
`pm_skills/memory-policy.md`, read only at task close (size check,
prune, refactor, health check) — not part of the every-task load.
This guide does not restate either — one source of truth each.

The end-of-task update runs a size check (fast path on most tasks).
When any file crosses its budget, the agent proposes the **Prune**
verb of `prompts/memory-maintenance.md` — never auto-prunes. Prune
archives older content whole (append-only entries are never
rewritten) and leaves a one-line index in the live file pointing at
each archive. The same file's **Diagnose** verb is the periodic
read-only health check, and **Refactor** repairs a drifted backlog.

A fresh project has no `archive/` folder. It is created lazily on
the first prune.
