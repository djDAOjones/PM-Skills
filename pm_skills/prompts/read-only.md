---
description: The no-write posture — a hard read-only contract, command isolation, and a start-and-end integrity check, for any investigation that must change nothing
---

# Read-only

A **posture**, not a verb. Investigation workflows declare they run
under it; it says what "read-only" actually costs and how the claim
is proved. `review.md`, `task.md` → spike mode, and any whole-repo
audit or planning pass can run inside it.

It defines *how to look safely*. It does not say what to look for —
that belongs to the workflow running inside it.

## Declare it, then prove it

Say at the start which workflow is running and that it is read-only.
Say at the end whether the tree changed. A guarantee nobody checks
is a preference.

## The contract

While this posture is in force, **nothing in the working tree
changes**. Not as a matter of intent — as a matter of what you are
permitted to run.

Never:

- Edit, create, move, rename, or delete any file in the tree,
  including scratch files, notes, and the report itself.
- Commit, stage, stash, branch, tag, reset, checkout, revert, merge,
  rebase, or `git clean`. Reading history is fine; moving it is not.
- Install, update, or remove a dependency, or run any command that
  writes a lockfile.
- Run a formatter, linter, or automated rewriting tool in its
  **fixing** mode (`--fix`, `--write`, `-i`). Checking mode is fine.
- Run migrations, seeds, or anything that touches a real datastore.
- Change configuration, environment files, or credentials.
- Push, publish, deploy, or call an external service that mutates
  anything.

The report is written **outside the tree**, or returned in the
conversation. A read-only pass that leaves a report behind in the
repository has already broken its own contract — and this is the
most common way it happens.

## Commands that might write

Most useful commands are safe: `git log`, `git diff`, `git show`,
`grep`, `find`, `cat`, `wc`, and any linter or type-checker in
checking mode. Builds and tests are the problem — they routinely
emit artefacts, coverage, caches, snapshots, and generated files
into the tree.

For anything that might write:

1. **Redirect its output outside the tree** if it supports that
   (an out-directory, a cache path, a temp working directory), and
   say in the report which flags were used.
2. **Otherwise, run it on a disposable copy** — a clone or a
   worktree in a scratch location — never on the tree under
   investigation.
3. **Otherwise, do not run it.** Say so in the report, name the
   command, and continue statically. A check you did not run is a
   stated gap; a stray artefact is a broken guarantee.

Read the build config to find out what a command writes before
running it, rather than running it and inspecting the damage.

## Integrity check

This is the part that makes the guarantee verifiable rather than
merely asserted.

**At the start**, record and keep:

- The current commit SHA.
- `git status --porcelain` in full — including untracked files.

**At the end**, record the same two and compare.

- **Identical** → say so plainly in the report: the run changed
  nothing, and here is the evidence.
- **Different** → report it **prominently, at the top**, with the
  exact difference. Then stop.

**Never repair a difference.** Do not delete a stray file, do not
revert an edit, do not `git clean`. Something wrote to the tree
while a read-only pass was running; that fact is the finding, and
tidying it away destroys the only evidence of it. It may not even
have been this run — a parallel session, a watcher, an editor, a
build daemon. Report, do not clean.

Record the untracked list too, not just tracked changes: an
artefact dropped by a build is untracked, and a tracked-only check
would call the run clean.

## Autonomous, and why that is allowed here

Run to completion without approval pauses or clarifying questions.
Where something is ambiguous: infer the most probable reading,
**label the assumption and how confident you are**, continue, and
collect every unresolved question into the report.

This cuts against a framework built on gates, and the exemption is
narrow and specific: **gates exist to stop irreversible change, and
this posture cannot make any.** A run that provably writes nothing
has nothing for a gate to protect. The moment a workflow inside this
posture wants to change something, the posture ends and the normal
gates apply to that change — it does not carry the exemption with
it.

So the sanction is not "audits are trusted". It is "a pass that
cannot write does not need permission to look".

## Assumptions and confidence

Every inference in the report carries its own confidence, in plain
words: **confident** (the code says so), **likely** (consistent with
what is here but not stated), **guess** (a reading that fits, and
alternatives exist). Ungraded assertions in a long autonomous report
are indistinguishable from findings, which is how a wrong inference
becomes a fact three sessions later.

## Report contract

Whatever the workflow's own report shape, this posture adds:

- **The integrity result** — start and end SHA and status, and the
  verdict. At the top when it failed; a line near the end when it
  passed.
- **Commands not run**, with the reason each was skipped.
- **Unresolved questions** — what could not be settled without
  asking, kept as questions rather than resolved into guesses.
- **Coverage** — what was examined and what was not, so a gap is
  visible rather than implied by silence.

## What this is not

- Not a review curriculum. What to look for, how to grade findings,
  and what to do about them belong to the workflow running inside
  this posture.
- Not a sandbox. It constrains what you run; it does not prevent a
  misbehaving tool from writing. That is what the integrity check
  is for.
- Not a substitute for a gate on the *fix*. Findings from a
  read-only pass become normal work, scoped and gated as usual.
