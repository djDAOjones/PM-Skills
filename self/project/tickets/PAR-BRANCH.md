# PAR-BRANCH — Branch-per-session coordination (records era)

> **Status:** Next #2, after BACKLOG-STATE · **Grades:**
> Medium / Low-Med / Low / Medium.

## Intent

Once BACKLOG-STATE makes memory writes disjoint by file (one record
per item), retire the chat-claim ceremony where records apply:
parallel sessions each work a branch, and memory merges become
mechanical because two sessions touching different items touch
different files. The one-writer rule narrows to the few genuinely
shared files.

## Done when

- `GUIDE.md` → "Parallel and multi-machine work" documents the
  records-era path (branch per session, merge at close, no claims
  needed for item work) alongside the advisory-claim protocol,
  which remains the documented fallback for prose-memory projects
  and for shared-file writes (decision log, trajectory).
- `end-of-task.md`'s secondary-session close simplifies when
  records are present: the handoff block shrinks to the shared-file
  appends only.
- The append-conflict caveat (assessment C10: same-file appends are
  git's weakest merge case) is stated as the reason the advisory
  protocol survives for the shared files.

## Evidence / context

Assessment C10 examined and declined branch-per-session at prose
scale — the merge problem just moved. Records dissolve the item-file
half of it, which was the revisit condition. The records-core
fiction's day-in-the-life (three agents, no claims) is the target
picture.

## Approach

A documentation-and-convention change riding whatever release
follows BACKLOG-STATE phase 1 — no tooling of its own. Verify with
one real parallel exercise on this repo (two working trees, two
items, merge) before the GUIDE text claims it works.

## Constraints

- Never remove the advisory protocol — prose-memory projects and
  shared files still need it; this is an additional path, not a
  replacement.
- No lockfiles, ever (the crashed-session rule stands).

## Open questions

- Do decision-log appends stay serial (primary-writes) or move to
  per-item decision fragments folded at close — lean serial for
  now; fragments are a records phase-2 question.
