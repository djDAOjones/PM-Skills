# Prune Memory

Run this when the end-of-task size check flags any project memory
file over budget, or when the user requests a memory prune.

Budgets are defined in AGENTS.md → "Memory size budgets". Do not
duplicate the numbers here — read them from AGENTS.md.

This procedure is single-pass and minimises its own meta-cost. Use
plain shell (`wc`, `head`, `tail`, `grep`, `cp`, `mv`, output
redirection). No Python scripts. No retry loops. If a step fails,
stop and report.

## 1. Detect

Word-count each hot whole-file read in `pm_skills/project/` plus
`README.md`. Count Completed items in `backlog.md`. Count entries
and the oldest entry date in `decision-log.md`.

Output a short table:

| File | Metric | Current | Budget | Status |

This is the **before** snapshot.

## 2. Propose

For each over-budget file, propose one specific action:

- `file-map.md` over budget → strip historical and batch notes,
  keep current roles only. Move stripped content to
  `pm_skills/project/archive/file-map-YYYY-MM-DD-historical.md`.
- `architecture.md` or `conventions.md` over budget → propose
  tightening or splitting; usually content belongs in
  `decision-log.md` or in a new permanent contract file.
- `brief.md` over budget → propose tightening (rare).
- `backlog.md` Completed > budget → move all but the most recent 30
  items to `archive/backlog-shipped.md`. Keep Active untouched.
- `decision-log.md` > entry budget OR oldest > age budget → split
  older months whole into `archive/decision-log-YYYY-MM.md`. Leave
  a one-line index at the bottom of the live file pointing at
  each archived month.

Present the proposal to the user. Wait for approval. Do not skip.

## 3. Backup (conditional)

Run `git status --porcelain` on the project root.

- If output is empty (working tree clean), skip explicit backup —
  git history is sufficient.
- If output is non-empty, copy each file to be modified into
  `pm_skills/project/archive/backup-YYYY-MM-DD-HHMM/` first.

## 4. Execute

For each approved prune:

- Create `pm_skills/project/archive/` if it does not exist.
- Move content to its archive file. Preserve append-only entries
  verbatim — never rewrite.
- Rewrite the live file with kept content.
- For `decision-log.md`, append a one-line index entry at the
  bottom of the live file for each archived month, in the form:
  `## Archived: 2026-04 — see archive/decision-log-2026-04.md`.

Batch the operations. Do not iterate file-by-file with confirmation
prompts.

## 5. Verify

- Re-run word counts. Confirm all files now under budget.
- Confirm archive files exist with the moved content.
- Confirm append-only entries are unchanged byte-for-byte.
- Confirm `backlog.md` Active section is untouched.
- Output a before / after table.

## 6. Record

- Append a one-line entry to `decision-log.md` (top, append-only):
  the date, "Pruned project memory", and a one-line summary of
  what was archived (e.g. "decision-log April 2026 → archive,
  backlog 60 shipped → archive").
- If new archive files were created, add them to
  `pm_skills/project/file-map.md` under a new "Archive" section
  if one does not already exist.

## Rules

- Append-only files (`decision-log.md`): move entries verbatim.
  Never rewrite. Never collapse. Never summarise on archive.
- Live files keep the latest content; archives keep history.
- Archives are append-only too — never rewrite an existing archive.
- If multiple files exceed budget, prune them all in one pass to
  avoid multiple sessions of meta-cost.
- If unsure whether to archive a piece of content, leave it in the
  live file. False positives are worse than false negatives —
  content can always be archived next session.
- Tier names ("hot whole-file", "hot sectional", "cold") and
  budget numbers come from AGENTS.md only. Do not redefine here.
