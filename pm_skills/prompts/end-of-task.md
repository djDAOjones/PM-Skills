# End of Task

Run this at the end of every task session, after implementation
and verification are complete. This is the canonical housekeeping
ritual. The integration workflows reference this file rather than
duplicating its contents.

## 1. Verify the runtime still boots (if this task touched it)

If this task changed the runtime — a server, worker, port, env var,
generated output, build step, dependency, or a boot/reboot/status
script — confirm the app still recovers cleanly before closing:

- Boot from cold via the canonical command in `DEV-INFRASTRUCTURE.md`
  → "Runtime lifecycle" (`reboot` / `dev` for most projects).
- Confirm it reaches a verified-ready state (health endpoint or
  expected output), not merely that a process launched.
- Report the dev URL, the log location, and any manual step that is
  not yet automated.
- If the runtime surface changed, update `DEV-INFRASTRUCTURE.md` →
  "Runtime lifecycle" (see step 2) to match.

If the task did not touch the runtime, say "not applicable" and move on.

## 2. Update project memory

Update each of the following if relevant to this task:

- `pm_skills/project/decision-log.md` — record the key design decision
  from this task (the WHY). This is the canonical home for the
  reasoning; other files point here, they never restate it.
- `pm_skills/project/backlog.md` — when this task ships, **remove** its
  item (there is no Completed section); add any follow-ups to Active as
  open items. If the task isn't finished, update its status in place.
- `pm_skills/project/trajectory.md` — when this task ships, add ONE
  line under the current phase: `ITEM-ID — outcome (date) — see
  decision-log`. Compress on ship: outcome here, why in the log, file
  roles in file-map. Never paste the decision-log prose.
- `pm_skills/project/wish-list.md` — append any out-of-scope ideas
  surfaced this task, one line each.
- `pm_skills/project/file-map.md` — add or update entries for files
  created or changed. Map roles, not change history.
- `pm_skills/project/conventions.md` — if new conventions were
  established or existing ones changed.
- `README.md` — if architecture, dev workflow, or key infrastructure
  changed significantly.
- `AGENTS.md` — if this task established new invariants, data model
  changes, protected modules, event namespaces, or anti-patterns.
  Check whether `AGENTS.md` still reflects current architecture and
  conventions.
- `UI-STANDARDS.md` — if this task established new token systems, UI
  conventions, or the diagnostics affordance.
- `DEV-INFRASTRUCTURE.md` — if this task changed build, dev server,
  versioning, script conventions, the runtime lifecycle (boot/reboot/
  status commands, process ownership, health checks, protected paths),
  or maintainer diagnostics (the logger, buffer, redaction, or copy
  bundle).

## 3. Run the memory size check

Budgets are defined in `AGENTS.md` → "Memory size budgets". Do not
duplicate the numbers here.

- Word-count `file-map.md` against its hard accreting budget and each
  reference doc (`README.md`, `brief.md`, `architecture.md`,
  `conventions.md`, + any project-added standards/process/infra docs)
  against its soft guideline. Do not sum them into an aggregate hot-set
  cap — there isn't one. The conditional reads (`UI-STANDARDS.md`,
  `DEV-INFRASTRUCTURE.md`) are not part of the every-task check.
- Count the backlog **Active** section's words and open items, and
  confirm **no `[x]` list items remain** in `backlog.md`
  (`grep -cE '^\s*[-*] \[x\]'`, so the status-legend line is not a false
  positive) — shipped work belongs in `trajectory.md`.
- Word-count `trajectory.md`.
- Count both entries **and** words in `decision-log.md`, and check the
  oldest entry's date. The entry count is the primary trigger; keep
  entries tight (~150–300 words) so the word budget flags runaway
  entries, not normal density.
- Count open items in `wish-list.md`.

If any budget is exceeded:

- Do not auto-prune.
- Output one line per overrun: which file, which budget, current
  value.
- Exception: if only the `decision-log.md` age budget is exceeded
  and fewer than ~5 entries lie beyond the latest-10 floor, just
  note it — don't propose a prune. On low-velocity / sporadic
  projects the age budget trips repeatedly with little to archive;
  the entry-count and word budgets are the meaningful triggers.
- An over-budget `wish-list.md` is drained by triage, not archiving.
  Propose a triage pass (promote or cut) — via `next-batch.md` or
  `prune-memory.md` — rather than an archive split.
- `[x]` items left in the backlog, or a backlog Active over budget, are
  a structural issue, not a size one: propose `roadmap-refactor.md`
  (move shipped work to `trajectory.md`, restructure the queue) rather
  than a generic prune.
- Propose running `pm_skills/prompts/prune-memory.md` and wait for
  user approval.

## 4. Report

Output a one-line summary:

- Whether the runtime was verified to boot to a ready state (or n/a).
- Which memory files were updated.
- Which budgets were checked.
- Whether any tripped (and the proposal made if so).

Present the report to the user before closing the task.
