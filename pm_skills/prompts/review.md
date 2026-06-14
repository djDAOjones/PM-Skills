# Review

Review a chunk of work — typically an autonomous run (`auto-jazz`,
`auto-jazz-lite`, `init-mvp`, `spec-to-prod`) — before you accept it.
The forward pipeline (scoping → design → plan → validation) front-loads
discipline; this is its mirror on the way out: a structured, skimmable
read of what actually landed, so "review later" is a ten-minute pass,
not an archaeology dig.

Read-only by default. It diagnoses, maps, and proposes a punch list; it
does not silently change the work. Approved fixes run as their own task.

## Inputs

- The change set — a commit range, a branch diff, or the uncommitted
  working tree. Default: the commits since you last reviewed. Ask if
  unclear; don't guess the range.
- The run's own account — the scope, plan, and assumptions the workflow
  stated, plus the `decision-log.md` entry it wrote.

## 1. Load

- Get the diff: `git diff <range>` (or `git diff` / `git status` for
  uncommitted work; `git log --oneline <range>` for the commits).
- Load the standard project context per `AGENTS.md` → "Before every
  task", so changes can be judged against the brief, architecture,
  conventions, and hard rules.
- Read the latest `decision-log.md` entry and the relevant `backlog.md`
  items, so the work can be checked against what it claimed to do.

## 2. Map the change set to intent

Group the diff by *intent*, not by file. For each group: one line on
what changed and why, with the key `file:line` as evidence. A reader
should understand the whole run from this map without opening the diff.

## 3. Scope adherence and assumptions

- Did the work stay within the stated scope? List anything that landed
  *outside* it (scope creep) and anything in scope that is *missing*.
- For every assumption the gateless run stated, surface it for an
  explicit accept / reject — unverified assumptions are where a run
  without gates most needs a human.

## 4. Contract and invariant audit

- Hard rules (`AGENTS.md`): any violation — mid-file imports, a runtime
  dependency added, build output hand-edited, a listed anti-pattern
  introduced, minimal-change discipline broken (reorganised or
  re-commented code it was not asked to touch)?
- `UI-STANDARDS.md` if UI changed; `DEV-INFRASTRUCTURE.md` if build,
  runtime lifecycle, or diagnostics changed.

## 5. Risk and what to spot-check

- The regression surface: which existing behaviour this most exposes.
- The 1–3 things only a human can verify (real browser, device, data,
  judgement). Name them as a manual checklist.
- Tests: were the right categories covered; any hollow or weakened
  test; was "not applicable" claimed where an invariant was actually
  at risk?

## 6. Memory hygiene

Confirm the run did its end-of-task housekeeping: a tight
`decision-log.md` entry; the `backlog.md` item removed or updated; a
`trajectory.md` line if it shipped; `file-map.md` current; no size
budget tripped. Flag anything stale. Cross-reference `end-of-task.md`
and `doctor-memory.md`; don't re-run them here.

## 7. Verdict and punch list

State one: **accept** / **accept with follow-ups** / **needs changes**.
Then a short, prioritised punch list — each item one line, actionable,
with `file:line`. These are the next tasks, not edits to make now.

## 8. Feedback into memory (propose, don't apply)

If the review surfaced something durable, propose where it belongs: a
recurring agent mistake → an `AGENTS.md` anti-pattern; a settled
convention → `conventions.md`; an out-of-scope idea → one line in
`wish-list.md`. Apply only what the user confirms.

## Rules

- Read-only. Review diagnoses and proposes; it does not rewrite the
  work. Approved fixes run as their own task (`feature.md` /
  `auto-jazz.md` / `bugfix.md`).
- Review the execution, not the mandate — don't re-litigate decisions
  already approved upstream. Unless the execution reveals the mandate
  was wrong; then say so plainly.
- Cite `file:line` as evidence. No vague "looks fine."
- Keep it skimmable. The point is a fast, trustworthy read.
