# Memory Policy

The canonical **memory size budgets** for project memory, and the
actions to take when a budget trips. Moved out of `AGENTS.md` so the
always-loaded contract carries only always-needed rules; this file is
read **only** by the workflows that consult budgets:
`prompts/end-of-task.md` (size check) and
`prompts/memory-maintenance.md` (Diagnose / Prune / Refactor).

Read-tier definitions (hot / sectional / warm / cold) stay in
`AGENTS.md` → "Before every task" — they govern every session start.
This file governs the checks that run at task close.

## Memory size budgets

Memory files have word/entry budgets: **hard, prunable** limits on
accreting files (`file-map.md`, the sectional `backlog.md` /
`decision-log.md`, `trajectory.md`) and **soft** size guidelines on
reference docs (see the table). The end-of-task update check flags
overruns and proposes the Prune verb of
`pm_skills/prompts/memory-maintenance.md`. Do not auto-prune — always
propose first.

| Scope | Soft limit | Action when exceeded |
| --- | --- | --- |
| Reference doc (`README`, `brief.md`, `architecture.md`, `conventions.md`, + project standards/process/infra docs) | soft ~3,500 words each | Not a prune target — reference docs don't accrete. If one is genuinely bloated, tighten it or split detail into a permanent contract file; never strip to hit a number. |
| `file-map.md` (accreting) | 2,000 words | Propose Prune: strip accreted history (task tags, dates, test counts) to `archive/file-map-*-historical.md`, keep current roles. Floor = the irreducible current-role list; on a large codebase that may exceed 2,000, which is fine — strip noise, not signal. |
| Every-task read load | structural (no aggregate word cap) | A fixed sum fires permanently on a mature project (≥ 5 hot files × the 2,000 file budget > any flat cap), so there is none. Healthy = each file within its own row above. If the always-read set keeps growing, review whether a hot read should move to _conditional_ or _warm_, or whether a reference doc has bloated. |
| `backlog.md` Active | 1,500 words **or** ~40 open items (whichever trips first) | Propose Refactor: restructure by lifecycle, evict done-work, dedupe stale rounds. A low item count with high words means items are too verbose — tighten them. |
| `backlog.md` shipped work | 0 — done `[x]` items do not live here | Move each to `trajectory.md` (one line) + `decision-log.md` (the why). Flagged by `end-of-task.md` and the Diagnose verb. |
| `trajectory.md` | 2,000 words | Propose archiving the oldest phases to `archive/trajectory/`, keeping `archive/INDEX.md` current. |
| `decision-log.md` live log | 20 entries (primary) **or** ~6,000 words | Propose an archive split to `archive/decision-log-*.md` (by whole month; by date-range when one month alone exceeds a budget). Entry count is the primary trigger; the word budget is a secondary guard against runaway entries — a healthy entry is ~150–300 words (Decision, Rationale, Alternatives, Link), not an essay. Keep at least the read-tier latest 10 live. |
| `decision-log.md` oldest entry age | 90 days | Propose an archive split, oldest first — but only when ≥ 5 entries lie beyond the latest-10 read-tier floor (live log ≥ 15). Below that, note the overrun and skip: on low-velocity / sporadic projects the age budget keeps tripping with little to move, so the entry-count and word budgets are the meaningful triggers. |
| `wish-list.md` open items | 25 items | Propose a triage pass (promote each into `backlog.md`, or cut). Never archive — the wish-list shrinks by triage, not by moving content to `archive/`. |
| `tickets/<ITEM-ID>.md` (per-item, cold) | soft ~600 words each | Working detail for one open item; not counted in the every-task read load. Shrinks by lifecycle eviction, not archiving — deleted when the item ships or is cut. An orphan file (no matching open item) is structural, not a size issue: Refactor evicts it, Diagnose flags it. |
| `archive/` chunk | one epoch per file (whole month / migration boundary) | Chunk cold archives by **sequence boundary for INDEX browsability**, not size — they're never auto-read (grep + line-range only), so word count barely matters and an epoch bounds its own growth. Sub-split a single epoch only if it's genuinely unwieldy to grep; never split or merge epochs just to hit a number. Maintain `archive/INDEX.md`. |
| Unreconciled `Close: lite` closes | **5 closes** since the last reconcile marker, **or** oldest **7 days** (whichever trips first) | Deferred memory writes, not a file size. Under the cap it's a session-start nudge; at or over it, a **Reconcile** (`memory-maintenance.md`) is mandatory before the next-batch pick. Counted from `git log` since the marker, not from a file. See `end-of-task.md` → "Close mode". |

## Size-check fast path

The end-of-task size check scales with what the task actually touched
(see `prompts/end-of-task.md`):

- **Fast path** — if the task appended little or nothing to project
  memory (≤ 2 memory files touched, no accreting file grew
  materially), count only the files touched and skip the rest.
- **Full sweep** — run the whole table when the task did real memory
  work (a prune, a refactor, a shipped milestone), when several files
  were touched, or if no full sweep has happened in the last ~5 tasks.
  If you cannot tell when the last full sweep ran, run one.
- The Diagnose verb of `memory-maintenance.md` remains the periodic
  deep check for structural drift the size check cannot see.

## Rules

- Budget numbers live **only** here. `AGENTS.md`, the prompts, and the
  template comments point at this file; they never restate the numbers.
- **One writer at a time.** Project memory assumes a single active task
  session. If parallel agent sessions run, only one may perform
  end-of-task memory updates; the others report their updates for the
  next serial close (parallel appends to `decision-log.md` /
  `backlog.md` conflict). The Prune verify step treats an unexpected
  concurrent edit as a stop-and-report, never a "fix".
- Changing a budget is a framework change (this is a `framework`-class
  file): bump `VERSION` and add a `CHANGELOG.md` entry per
  `prompts/release.md`.
