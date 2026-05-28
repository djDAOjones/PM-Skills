# Upgrade

Run this when an existing project is on an older version of pm-skills
and needs to adopt the latest framework files (prompts, integrations,
init, GUIDE, scaffold) plus any new sections in the root templates
(`AGENTS.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md`).

This procedure is destructive in places. Always propose before
executing. Never silently overwrite user-populated content. Never
delete anything in `pm_skills/project/` or
`pm_skills/project/archive/`.

## 0. Locate the latest version

Ask the user for the source of the latest pm-skills if they have not
already provided one. Acceptable sources:

- A local checkout (e.g. `../pm-skills/` or `~/code/pm-skills/`).
- A Git URL the agent can clone or fetch.
- The user pasting individual files into the chat.

If pasting, request files in this order to minimise round-trips:
`pm_skills/init.md`, `pm_skills/GUIDE.md`, then everything under
`pm_skills/prompts/`, `pm_skills/integrations/`, `pm_skills/scaffold/`,
then `AGENTS.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md`, then the
files under `pm_skills/project/` (the distributed templates, not the
user's populated copies).

Treat the latest `pm_skills/init.md` and `pm_skills/GUIDE.md` as
authoritative for the new structure.

## 1. Audit

Produce a diff report grouped as:

a. **Framework files to replace wholesale** — `pm_skills/init.md`,
   `pm_skills/GUIDE.md`, `pm_skills/prompts/*`,
   `pm_skills/integrations/*`, `pm_skills/scaffold/*`. List which
   files differ, are new upstream, or no longer exist upstream.

b. **Root templates to 3-way merge** — `AGENTS.md`,
   `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md`. For each, identify
   which sections this repo has populated (no `<!-- CUSTOMISE -->`
   markers, real content) versus which are still on template
   defaults.

c. **Project memory to preserve** — `pm_skills/project/*`. Compare
   headings/sections against the latest distributed templates. Note
   any new sections to add empty, any renamed headings, any sections
   removed upstream.

d. **New files upstream that don't exist here.**

e. **Files here that no longer exist upstream.**

Output a short table per group. STOP. Wait for approval before
changing anything.

## 2. Backup (conditional)

Run `git status --porcelain` on the project root.

- If output is empty (working tree clean), skip explicit backup —
  git history is sufficient.
- If output is non-empty, copy every file that will be modified or
  deleted into
  `pm_skills/project/archive/upgrade-backup-YYYY-MM-DD-HHMM/`
  before continuing.

## 3. Replace framework files

For approved items in audit group (a):

- Overwrite each existing framework file with the latest version.
- Add new framework files from upstream.
- Delete files that no longer exist upstream **only with per-file
  confirmation**. Do not batch-delete.

The audit was already approved — do not pause for confirmation
between individual overwrites. Batch the operations.

## 4. Merge root templates

For each of `AGENTS.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md`:

- Use the latest template as the base structure.
- Port every populated section from this repo into the matching
  section of the new template. **Preserve wording exactly.** Do not
  paraphrase, summarise, or "improve" the user's content.
- New sections this repo never populated keep their
  `<!-- CUSTOMISE -->` markers from the new template.
- If a section the user had populated no longer exists upstream, do
  not delete it — surface it in the report and ask where (if
  anywhere) the content should move.
- Show a unified diff per file before writing.

After approval, write each merged file.

## 5. Reconcile project memory templates

For each file in `pm_skills/project/`:

- Compare its headings against the latest distributed template.
- For new sections upstream: add the heading with no body content.
- For renamed headings: leave the user's content under the existing
  heading and surface the rename for the user to apply manually. Do
  not auto-rename — content beneath the old heading may not fit the
  new heading's intent.
- For removed sections upstream: do nothing. Never delete user
  content.

Show the proposed migration before applying.

## 6. Readiness check

Run the placeholder lint from the latest `pm_skills/init.md`
Step 10:

```sh
grep -nE '\[Project Name\]|\[short product description\]|<!-- CUSTOMISE' \
  AGENTS.md UI-STANDARDS.md DEV-INFRASTRUCTURE.md 2>/dev/null
```

Classify every remaining hit as:

- **(i) Genuinely not applicable** — leave as a deliberate stub.
- **(ii) New in this version, needs population** — point the user at
  the matching `init.md` step (Steps 6–8) for a follow-up session.

## 7. Record

Append a one-line entry to the top of
`pm_skills/project/decision-log.md` (append-only): the date,
"Upgraded pm-skills framework", and a brief summary of what changed
(e.g. "added 2 new prompts, merged AGENTS.md, no project memory
migrations").

If new framework files were added that the user should know about
(new prompts, new integrations, new sections in `init.md`), name
them in the entry.

## 8. Report

Output a final upgrade report:

- Framework files replaced (count + names of any notable additions).
- Root templates merged (one line per file, e.g.
  `AGENTS.md: 4 sections ported, 1 new section needs input`).
- Project memory migrations applied (or "none").
- Outstanding placeholders by category.
- Backup location (if a backup was taken).

## Rules

- Never silently overwrite user-populated content in root templates
  or `pm_skills/project/`.
- Never delete files in `pm_skills/project/` or
  `pm_skills/project/archive/`.
- Append-only files (`decision-log.md`) are never rewritten — only
  appended to.
- Treat the latest `init.md` and `GUIDE.md` as authoritative for
  structure and process.
- All non-trivial changes batched and shown before write.
- If an upstream change is ambiguous (e.g. a section was both
  renamed and restructured), ask the user. Do not guess.
