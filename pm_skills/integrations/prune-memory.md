---
description: Prune project memory when files exceed budgets
---

Run this when the end-of-task size check flags any project memory
file over budget, or when the user explicitly requests a memory
prune. Procedure is single-pass and minimises its own meta-cost.

1. State the trigger.
   One sentence: which file or files flagged the prune, and which
   budget. If the user requested manually, say so.

2. Read the policy.
   Read AGENTS.md → "Memory size budgets" for the thresholds and
   the over-budget files themselves. Do not load full session
   context — this is a maintenance task, not a feature task.

3. Detect.
   Word-count each hot whole-read file in `pm_skills/project/` plus
   `README.md`. Count Completed items in `backlog.md`. Count
   entries and the oldest entry's date in `decision-log.md`.
   Output a before-table:

   | File | Metric | Current | Budget | Status |

4. Propose.
   For each over-budget file, propose a specific prune action.
   See `pm_skills/prompts/prune-memory.md` step 2 for the action
   types. Present to the user. Wait for approval.

5. Backup (conditional).
   Run `git status --porcelain` on the project root.
   - Empty output → working tree clean → skip explicit backup.
   - Non-empty → copy each file to be modified into
     `pm_skills/project/archive/backup-YYYY-MM-DD-HHMM/` first.

6. Execute.
   Use plain shell only (`wc`, `head`, `tail`, `grep`, `cp`, `mv`,
   output redirection). No Python. No retry loops. Batch operations.
   - Create `pm_skills/project/archive/` if missing.
   - Move content to its archive file. Preserve append-only entries
     verbatim — never rewrite.
   - Rewrite the live file with kept content.
   - For `decision-log.md`, append a one-line index entry at the
     bottom of the live file for each archived month.

7. Verify.
   - Re-run word counts. Confirm all files under budget.
   - Confirm archive files exist with the moved content.
   - Confirm append-only entries are unchanged byte-for-byte.
   - Confirm `backlog.md` Active section is untouched.
   - Output an after-table alongside the before-table.

8. Record.
   - Append a one-line entry to the top of `decision-log.md`:
     date + "Pruned project memory" + one-line summary of what
     was archived.
   - If new archive files were created and `file-map.md` does not
     yet have an "Archive" section, add one with the new files
     listed.

9. Report results to the user.
