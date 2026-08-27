# Field Report

Emit a usage report **from this project, about this project's use of
pm-skills**, for whoever collects such reports upstream.

Be clear about who benefits: not you. A project gains little from
reporting on itself — the value is upstream, where reports from many
projects become evidence about which prompts fire, which get skipped,
what memory does over time, and how upgrades actually land. Run this
when asked for one, or when something happened here that the
framework should learn from.

This is a **read-and-copy** procedure. It reads the project and
writes **outside** it. Nothing in the project changes.

## Where the output goes

Write to a new directory **beside** the project, never inside it:

```text
../<project-slug>-field-report-YYYY-MM-DD/
```

Inside the project, create no files, no branch, no commit, no stash.
The project must end byte-identical to how it started, apart from
anything its own maintainer changed while you worked. Verify that at
the end (see "Leave nothing behind") — do not assert it.

If the collecting repository is available locally, say where the
output is and let its maintainer file it. Do not write into it: the
filing decision (which lane, what redaction) belongs to whoever owns
that tier.

## The header every file carries

Prepend this to every file you emit, so a later analysis can grep the
whole collection and read usage against the release history:

```markdown
<!-- field-report: project=<slug> · date=YYYY-MM-DD · type=<type>
     · pm-skills=<version in this project at the time>
     · source=<who or what produced it>
     · redaction=<what was collapsed, with counts>
     · retained=<what was deliberately kept, and why it is safe> -->
```

- `pm-skills=` is the **join key** — the version in force here when
  the evidence was produced, read from `pm_skills/VERSION`. Without
  it a report cannot be read against `CHANGELOG.md`, which is most of
  its value. If the project's version is unknown or was reinstalled
  rather than upgraded, say exactly that rather than guessing.
- `type=` is one of: `case-study`, `session-close`, `janitor`,
  `validator`, `upgrade`, `incident`, `export`, `note`. An `export`
  is a verbatim primary-source dump with no analysis; `note` is
  everything else.
- `redaction=` and `retained=` are **counts and reasons**, not
  reassurance. "12 absolute paths collapsed, 3 e-mail addresses
  removed, no credential-shaped values found" is auditable; "redacted
  appropriately" is not.

## What to gather

### Counted from the repository (no session logs needed)

Most of the useful signal is here, and this part is mechanical. Read
it with `git` and `wc`; do not estimate.

- **Deployment facts** — `pm_skills/VERSION`, HEAD SHA, branch,
  whether the worktree is clean, which rulebooks exist
  (`AGENTS.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md`,
  `PROCESS.md`), and whether `pm_skills/project/` is populated or
  still template.
- **How this version was reached** — upgraded via `upgrade.md`, or
  reinstalled fresh? This is the single most useful line in the
  report and the one most often missing. Look for upgrade evidence in
  the git log and decision log; if the answer is "reinstalled", say
  so plainly and say why, if the project recorded a why.
- **Memory sizes and counters** — word counts per memory file
  against `memory-policy.md`, open backlog items, live decision-log
  entries, trajectory items, wish-list depth. If the project keeps a
  memory validator, run it and paste its output verbatim.
- **Archive rotations** — how many prune/archive events, and when.
  A project that has never rotated is telling you something.
- **Close fidelity from commit messages alone** — how many commits
  carry the `Verify:` line, how many carry a `Close: lite` trailer,
  how many name a backlog ID, commits per shipped item. This is a
  proxy for whether the close ritual is actually run, and it needs no
  logs at all.

### Needs session logs (skip cleanly if unavailable)

- Which verbs and prompts actually fired, and which were skipped.
- Where a prompt mis-served the project, and what the agent did
  instead.
- Incidents: a gate misfire, a close that went wrong, a prose-skip.

Session logs are often local-only and often unavailable. **Not having
them is a valid report** — say so in the method section and carry on.
A report of the counted evidence alone is worth filing.

## The analysis note is not optional

Emit at least one `note` alongside the raw material, saying what the
evidence **means** for the framework: where it helped, where it was
ignored, what it should have done differently here.

This section is the first thing to be dropped when a run is long, and
it is the only part a collector cannot reconstruct from the exports.
A run that emits exports and no note has not produced a field report.

## Redaction and the public/private split

- **Redact mechanically, then count.** Absolute home and checkout
  paths, e-mail addresses, tokens and credential-shaped values, and
  third-party identifiers. Record the counts in the header.
- **Decide the lane by what is already public upstream, not by how
  private the project feels.** A public source repository can have
  its memory, rulebooks, and git log filed openly; its session logs
  usually cannot. A project that is private by design keeps
  everything in the private lane. Apply that test per file, not once
  for the whole project.
- **When in doubt, private.** A collector can promote a private
  report later; nobody can un-publish one.
- Never emit secrets in either lane.

## Leave nothing behind

Before reporting done:

- `git status --porcelain` in the project shows exactly what it
  showed when you started — paste both.
- The output directory is outside the project and is not inside any
  path the project's git would see.
- No branch, commit, stash, or config change was made here.

If any of these fails, fix it before reporting, and say in the report
what was left and removed.

## Report

One short summary: the output path, the `pm-skills=` version and how
it was reached, which sections have evidence and which were skipped
(with the reason), the redaction counts, and the leave-nothing-behind
check.
