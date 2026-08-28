# Changelog

Append-only record of pm-skills framework releases. Newest entry at
the top. Never rewrite a published entry.

This file is the **upgrade instruction set**. Each release lists what
changed and, critically, an **Upgrade actions** block: the mechanical
steps an agent applies to move a project from the previous version to
this one. The upgrade procedure (`prompts/upgrade.md`) reads the
entries between a project's current `VERSION` and the latest, and
executes their Upgrade actions in order — oldest first.

Versioning is semver-style for a docs framework:

- **major** — structural or breaking change that needs a migration
  (renamed/removed files, restructured templates, changed memory
  contracts).
- **minor** — new file or capability, backward compatible (a new
  prompt, integration, or template section).
- **patch** — wording, clarification, or fix with no new files and no
  migration.

Maintainers: every framework change must bump `pm_skills/VERSION` and
add an entry here. See `prompts/release.md`.

---

## Archived epochs

Entries for superseded epochs live in sibling files, moved
verbatim (CL-HORIZON, 4.5.0). The upgrade walk starts in the
oldest file its version gap touches:

- 1.x — `CHANGELOG-1x.md`
- 2.x — `CHANGELOG-2x.md`
- 3.x — `CHANGELOG-3x.md` (3.17.1, the final 3.x entry, stays
  below so a one-gap upgrade never opens the archive)

## 4.18.1 — 2026-08-28

FLAGS-EMDASH: the memory validator no longer loses an entire backlog
item to an em-dash inside a flag body.

`check-memory.mjs` read an item as `**ID Title** [flags] (date) —
summary` by taking `text.split('—')[0]` and then matching bracketed
flags and the date inside that head. A flag body containing an
em-dash — `[blocked: maintainer inputs, or the decision to cut — one
or more raw transcripts]` — truncates the head mid-bracket. After
that, no flag parses, the item stops counting as standing, its
creation date is lost, and the standing-age warning disappears. No
error, no diagnostic: the item simply becomes uninteresting to the
check that exists to notice it.

`gen-backlog.mjs` renders a record's `blocked-on` verbatim into that
bracket, so the generator emitted precisely what the validator could
not read. The two halves of records mode disagreed about their own
grammar, and the grammar never forbade the punctuation — only the
parser did.

This is the FILEMAP-WRAP shape again, in the sibling tool: a
single-line assumption inside a generated-file utility, discarding
real content quietly enough that the output still looks well-formed.
Worth stating plainly, because it is the second one found in a week
in the same family of scripts. Measured on this framework's own
records: with the old parser the validator reported **zero**
warnings; with the fix it reports the 43-day standing item that had
been there all along.

The separator is now the first em-dash at **bracket depth zero**,
so a flag body or a parenthetical may contain one. Behaviour on
every well-formed line is unchanged.

### Fixed

- `pm_skills/scaffold/check-memory.mjs` — new `itemHead()` scans for
  the first em-dash outside `[]` and `()` instead of splitting on the
  first one anywhere; flag parsing, the standing-age check and date
  extraction all read the correct head. Zero dependencies, interface
  unchanged. Ported from the source-repo fork fixed the same day
  (deliberate forks — the parser moved across, not the file).

### Upgrade actions

- `pm_skills/scaffold/*` is `scaffold` class — **copied once at init
  and never touched on upgrade** — so your copy is not replaced by
  this release and nothing is required of you.
- To adopt the fix, copy the current
  `pm_skills/scaffold/check-memory.mjs` over your root copy, or port
  `itemHead()` into it if you have customised it.
- Before adopting, look at your backlog for any item whose flag body
  contains an em-dash — most often a `[blocked: …]` reason. Those
  items have not been counted as standing, and their age has not
  been checked, for as long as they have been worded that way. They
  will start reporting once the fix is in; expect the standing-age
  warning to grow rather than shrink, and read that as the check
  waking up, not as new drift.

## 4.18.0 — 2026-08-28

BUDGET-TRUTH: the size checks catch up with what the field actually
does. Three parts — the last fixed word cap is re-derived, the
quality stop both consuming projects invented becomes policy, and
the reference-doc sweep finally includes the rulebooks.

**The backlog's fixed 1,500-word cap is retired.** The policy had
already removed fixed word caps in three places, each time naming
the same pathology: a check that is permanently red trains agent and
maintainer to ignore it. The file-map budget became derived ("noise,
not size"); the decision log moved to entry count plus a
runaway-entry guard, because the old file-level word budget tripped
on healthy density; the every-task read load lost its aggregate cap
outright. Backlog Active was the straggler — and it is precisely the
budget that stood over, read and overridden, in ten of twelve
sessions in one project's traces, and for effectively that project's
whole life. Item count (~40) stays the primary trigger. The section
cap is replaced by a **per-item verbosity guard**, mirroring the
decision log's entry-guard design, which is what the table's own
"a low item count with high words means items are too verbose" was
reaching for.

The guard is **~200 words per item**, derived rather than guessed:
one project ran 26 items across 2,479–3,004 words (~95–115 per item)
and called the density load-bearing; this framework's own queue runs
40–96 per item. 200 sits at roughly twice the observed ceiling — the
same guard-to-healthy ratio the decision log uses (600 against a
healthy 150–300). Over the guard, the remedy is not to compress the
item but to move its detail into `tickets/<ID>.md`, which is what
that file is for.

**A recorded quality stop is compliant.** Two consuming projects
independently wrote the same doctrine into their own decision logs —
"pruning must never harm development quality… budget targets yield
to that bar", "the inline detail is doing real work" — before the
policy said it anywhere. When two owners invent the same rule
unprompted, that is the policy's omission, not their deviation. A
prune that stops above the 70% target because the material still
there is feeding open work has now *applied* the rule, provided the
stop is recorded in the prune's decision-log entry. Unrecorded, it
is still an overrun. Count budgets do not yield this way: they are
the half the field obeys, and they are what stops a soft stop
becoming a habit.

**Rulebooks are reference docs.** The policy row already said
"project standards/process/infra docs"; no validator implemented it,
so nothing anywhere watched a rulebook's size. A fresh-init
`AGENTS.md` was measured at 4,502 words in four days, against
another project running the same framework on 993 — a file read in
full at every session start, growing unobserved because a fresh init
only ever adds. The row now names the root rulebooks explicitly and
both validator forks sweep them.

### Changed

- `pm_skills/memory-policy.md` — `backlogActive` becomes
  `{ maxOpenItems, itemGuardWords }`; the Active row and the
  reference-doc row rewritten; "Prune-to targets (hysteresis)" gains
  the recorded-quality-stop clause. Block and table updated together,
  as that section requires.
- `scripts/check-memory.mjs` **and**
  `pm_skills/scaffold/check-memory.mjs` (deliberate forks, changed
  together) — the Active check reports open items and the longest
  item against the guard instead of a section-word cap, naming any
  item that trips it; the reference-doc sweep gains `AGENTS.md`,
  `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md` and `PROCESS.md`,
  skipping those a project does not keep.
- `pm_skills/prompts/end-of-task.md` — the step-4 full sweep matches:
  rulebooks counted, backlog counted by items and the guard. The
  conditional-rulebook carve-out is corrected — those files sit
  outside the every-task **read load**, which was always the
  parenthetical's actual reason, not outside the size check.
- `pm_skills/prompts/memory-maintenance.md` — Diagnose check 1 and
  Prune P1 restated to match.

### Upgrade actions

- Replace `pm_skills/memory-policy.md`,
  `pm_skills/prompts/end-of-task.md` and
  `pm_skills/prompts/memory-maintenance.md` (all `framework` class).
- **If you copied `check-memory.mjs` out of `scaffold/`** (`scaffold`
  class — never replaced on upgrade), port the two changes above by
  hand, or re-copy the current file if you have not customised it.
  Both directions degrade safely in the meantime: an old validator
  against the new policy reads `softWords` as undefined and simply
  stops applying a section cap; a new validator against an old policy
  finds no `itemGuardWords` and runs no guard. Neither errors.
- **Expect the backlog warning to change shape**, not disappear. If
  your Active section stood over the old word cap, that line is gone;
  if any single item is over ~200 words, a new line names it. Move
  that item's detail into `pm_skills/project/tickets/<ID>.md` rather
  than compressing it away.
- **Expect a new line per root rulebook.** If one is over ~3,500
  words, it is not a prune target — tighten it, or split durable
  detail into a permanent contract file. Nothing is required at this
  release; it is a guideline that was previously unmeasured.
- No memory migration. No change to `pm_skills/project/`.

## 4.17.1 — 2026-08-28

CLOUD-TRUTH-SWEEP: 4.17.0 retired the "unsupported" cloud-sync claim
from the AGENTS template and left it standing in three other
distributed files. This finishes the retirement.

The residue was found within the hour, by the framework running its
own environment preflight before a prune — reading
`prompts/memory-maintenance.md` → "Standing advice" and hitting the
sentence the release had just repudiated. A retirement that lands in
one file and not its restatements does not retire anything; it just
moves the contradiction somewhere a reader is less likely to check
against.

Two of the three were straight restatements and are now pointers —
canonical-copy discipline, which is what should have carried the
claim in the first place: had `AGENTS.md` been the only site, 4.17.0
would have been complete. The third is a genuinely stricter rule for
a riskier situation, and it survives with its scope made visible: a
single synced checkout is a managed hazard, but two parallel lane
trees writing under one sync client make conflict copies routine
rather than possible. That distinction was implicit before, which is
how it read as another blanket prohibition.

`GUIDE.md` → "Parallel and multi-machine work" is deliberately left
alone: "don't let a sync folder carry a working tree between
machines" is a claim about sync-as-transport, not about where a
checkout may live, and it remains true.

### Changed

- `pm_skills/prompts/memory-maintenance.md` — "Standing advice" no
  longer restates the guard (or its retired claim); it points at
  `AGENTS.md` → "Hostile-filesystem guard" and keeps only what is
  local to the prompt: why session start repeats the detect, and why
  the file-surgery flows block rather than warn.
- `pm_skills/GUIDE.md` — the "My repo lives in OneDrive / Dropbox /
  iCloud" quick answer now answers "yes, with care", naming the
  failure modes, what the framework does about them, and where the
  per-project detail belongs.
- `pm_skills/integrations/dispatch.md` — the lane-tree rule keeps its
  "never" but states the reason that makes it stricter than the
  general guard.

### Upgrade actions

- All three are `framework` class — replaced wholesale on upgrade.
  Nothing is required of you beyond taking the files.
- If you adopted 4.17.0 and copied its `AGENTS.md` guard into your
  root rulebook, you are already consistent; this release only
  removes the contradiction from the framework's own copies.
- If your project wrote its own note repeating "cloud-synced paths
  are unsupported", that note is now the last place the claim
  survives. Delete it, or replace it with the operational detail
  under `DEV-INFRASTRUCTURE.md` → "Cloud-synced checkouts" (4.17.0).

## 4.17.0 — 2026-08-28

CLOUD-TRUTH: the hostile-filesystem guard stops claiming that
cloud-synced paths are "unsupported for project memory", and the
operational knowledge that claim displaced gets a template home.

Four of four deployments on record — and this framework's own
repository — live on OneDrive. None relocated. What they did instead
was hand-write the operational defences the templates never carried:
one project warns against workers on the synced path and logs
sync-caused incidents; another documents Files-On-Demand symptoms and
an `npm ci` recovery, its owner having explicitly rejected excluding
the repo from sync. The distributed `DEV-INFRASTRUCTURE.md` template,
the operational rulebook where both wrote that material, had no
cloud-sync section at all.

A hard rule that every deployment permanently violates is not a
harmless fiction. It is the template's worked example of a rule you
may ignore, and it sits in a list of rules whose whole authority
rests on being non-negotiable. Retiring it costs three words of
honesty; leaving it costs the credibility of everything beside it.

What is retired is the **claim**, not the guard. The preflight still
runs warn-only at session start, and it still **blocks** before any
memory-file surgery — moving files on top of sync corruption is how
the good copy gets lost, and that gate is stated more sharply here
than it was before. The rule now names what the field actually
observed (silent mid-session reverts, conflict copies, dropped
executable bits, watcher churn, a half-synced `node_modules/`, deep
paths truncated by the client's path limit) and the mitigations that
actually work (preflight, pause-or-exclude, commit early and push,
archive bulk evidence as single files).

Canonical-copy discipline holds across the two files: `AGENTS.md`
carries the hard rule and its standing mitigations, the new
`DEV-INFRASTRUCTURE.md` section carries only what varies per project
— which client, which symptoms, which recovery, what must never run
on the synced path — and its CUSTOMISE guidance says outright not to
restate the rule.

### Added

- `pm_skills/templates/DEV-INFRASTRUCTURE.md` — new **Cloud-synced
  checkouts** section (after Package management), a CUSTOMISE
  placeholder for the per-project operational detail: sync client and
  on-demand setting, symptoms seen, recovery path, and what must
  never run on the synced path.
- `pm_skills/init.md` — Step 8's population list gains the section as
  item 2 (subsequent items renumbered), and Appendix B gains a
  **Cloud-synced checkouts example** worked shape.

### Changed

- `pm_skills/templates/AGENTS.md` — "Hostile-filesystem guard"
  rewritten: cloud-synced paths are hazardous and common rather than
  unsupported; observed failure modes and standing mitigations named;
  the memory-surgery block restated as hard, with its reason; pointer
  added to `DEV-INFRASTRUCTURE.md` → "Cloud-synced checkouts".

### Upgrade actions

- `pm_skills/templates/*` is `root-template` class: the shipped
  template files are replaced like framework files, and your
  populated root copies are **3-way merged** — take the new
  structure, preserve every populated section verbatim.
- In your root `AGENTS.md`, replace the "Hostile-filesystem guard"
  bullet with the new one from `pm_skills/templates/AGENTS.md`. If
  you had softened, deleted, or annotated the old bullet because your
  checkout is on a synced path, that annotation is now redundant —
  the rule says it.
- In your root `DEV-INFRASTRUCTURE.md`, add the **Cloud-synced
  checkouts** section after Package management. If your project
  already hand-wrote cloud-sync guidance elsewhere in that file (or
  in `README.md`), move it under the new heading rather than
  duplicating it, and delete anything that merely restates the
  `AGENTS.md` rule.
- If your checkout is **not** on a synced path and cannot be, delete
  the new section. Nothing else in this release applies to you.
- No memory migration, no `pm_skills/project/` change, nothing
  required per session.

## 4.16.1 — 2026-08-28

FILEMAP-WRAP: the scaffold file-map generator no longer discards a
role that was hard-wrapped across lines. `existingRoles()` matched
role text with a single-line regular expression, so a role written as

```text
- `path` — first line of the role
  the rest of the role
```

came back as "first line of the role" and the continuation was
dropped entirely — silently, on a routine regeneration, in the file
the agent is told to keep current. Both of the script's own documented
promises were false for those entries: role text is "preserved
verbatim", and the generator "never silently drops". Four roles in
the framework repository's own map had already been truncated to
half-sentences before anyone noticed, which is the failure mode
exactly — the map still lints, still reads as prose, and quietly
stops describing the file.

The parser now folds continuation lines back into the role. One line
per file remains the map's contract; a maintainer's words are no
longer discarded to enforce it.

Ported from the source-repo fork fixed the same day — the two are
deliberate forks, so the parser moved across, not the file.

### Fixed

- `pm_skills/scaffold/gen-file-map.mjs` — `existingRoles()` now
  tracks the path whose role line it last read and appends any
  indented continuation line to that role, resetting on the next role
  line, heading, or blank line. The header comment and the function
  comment state the folding behaviour. Zero dependencies, interface
  unchanged.

### Upgrade actions

- `pm_skills/scaffold/*` is `scaffold` class — **copied once at init
  and never touched on upgrade** — so your project's copy is not
  replaced by this release and nothing is required of you.
- To adopt the fix, copy the current
  `pm_skills/scaffold/gen-file-map.mjs` over your root copy, or port
  `existingRoles()` into it if you have customised it.
- Before your next regeneration with an unfixed copy, read
  `pm_skills/project/file-map.md` for roles that end mid-sentence.
  `git log -S` on the role line recovers the original wording; the
  fixed generator folds it back onto one line instead of losing it
  again.

## 4.16.0 — 2026-08-27

ABSTRACTION-PLAN: `prompts/improvement-waves.md` turns verified
findings into a staged programme — a few independently revertible
waves, in dependency order, with an honest coverage ledger. Planning
only; each accepted wave becomes one normal task, and a
behaviour-preserving one runs as `task.md` refactor mode against
that wave's stated grouping.

It completes the read-only family: `review.md` and an audit produce
findings, `findings.md` verifies and dispositions them one by one,
this decides the **order, grouping and stopping point** across them —
which per-finding disposition structurally cannot — and refactor
mode executes one wave.

Four decisions worth naming:

- **Consume findings; never re-census.** Two coverage claims over one
  repository will disagree, and then neither can be trusted.
  Traceability comes from the ledger citing finding IDs, not from
  doing the work twice. With no findings, the prompt stops.
- **Abstraction is not the objective.** Six treatments are
  first-class and equal: abstract, de-abstract, simplify, isolate,
  keep the duplication, leave unchanged. A plan whose every entry
  says "abstract" has not been thought about.
- **"Exhaustive" means a reconciled ledger, not everything read.**
  Every area is graded substantive / superficial / classified-only /
  excluded-with-reason and appears exactly once. When a run cannot
  finish, areas stay *classified only* — **never** trade inspection
  for assumption; downgrading the grade is honest, inferring what an
  unread area contains is not.
- **Measures are observations, never targets.** No numeric goals for
  line counts, file counts, duplication percentages or module sizes:
  this prompt authorises the very changes that move those numbers, so
  a target makes gaming them the cheapest way to succeed.

The first wave is a **pilot**: run it, compare outcome against
prediction, and re-plan the rest if the prediction was wrong. A
programme whose first estimate missed is built on a wrong model.

The autonomy question this item shared with READ-ONLY-AUDIT is
already settled by 4.14.0 and is not re-opened: run under
`prompts/read-only.md`, whose exemption ends the moment a wave is
executed.

### Added

- `pm_skills/prompts/improvement-waves.md` (`framework` class) —
  what a wave is, the pilot rule, the six treatments, the coverage
  ledger, preserve-these findings, measures, report lifecycle
  (cold storage, per-wave acceptance, one record per wave), and the
  report contract.

### Changed

- `pm_skills/prompts/findings.md` — points here when the survivors
  are many enough that their order matters.
- `pm_skills/integrations/task.md` — refactor mode's declared
  surface is one accepted wave's stated grouping.
- `pm_skills/GUIDE.md` — the `prompts/` tree lists the new file.

### Upgrade actions

- Copy `pm_skills/prompts/improvement-waves.md` into your project's
  `pm_skills/prompts/` (`framework` class — new file, nothing
  overwritten).
- Replace `pm_skills/prompts/findings.md`,
  `pm_skills/integrations/task.md` and `pm_skills/GUIDE.md` with this
  version's copies.
- Nothing else changes; the prompt is inert until findings exist.

## 4.15.0 — 2026-08-27

REVIEW-SUITE: `prompts/findings.md` — verify a review's findings
against the source, notice what the review missed, and disposition
the survivors into the backlog. Findings from any reviewer,
including tools.

**This is not the suite the ticket asked for, and the field evidence
is why.** The plan was engineering-depth dimensions — security,
performance, dependencies, tests — layered onto the whole-repository
audit recipe. Two consuming projects had by then each run a deep
review and kept the artefacts, and what they show is that the
dimensions were never the missing piece: both got a competent
multi-dimension review from an external tool, and **both then wrote
a critique of that review before acting on it.** Neither was told
to. Across the two rounds the critiques found findings that were
real but materially over-rated, a finding already fixed and
re-reported stale, several the review had omitted entirely, and — the
expensive one — a **prescribed remedy that would have introduced a
different defect**, where the fix was more dangerous than the bug.

So the framework's contribution is the half nobody's review tool
does: deciding what is *true*, and what happens *next*. Producing
findings is increasingly commodity; verifying them and routing
them into a queue is not.

- **Five verdicts** — confirmed / over-rated / stale / not
  reproduced / wrong — because "agree or disagree" cannot express
  "real, but a third as bad as claimed".
- **Verify the remedy, not just the defect.** A correct finding with
  a wrong fix passes review and ships.
- **Check staleness first** — cheapest check, commonest false
  positive, especially when the review ran against an older commit.
- **Do not discard executable evidence without refuting it.** An
  opinion does not outrank a reproduction.
- **Every survivor gets a disposition** — fixed, backlogged in the
  project's own ticket grammar, wish-listed, or declined with the
  reason in the decision log. Stale and wrong findings are recorded
  as such, never silently deleted, so the next reviewer does not
  re-find them. A crosswalk keeps every original finding ID
  answerable.
- **Severity and confidence stay separate**; one combined number
  hides the case that needs the most care.

### Added

- `pm_skills/prompts/findings.md` (`framework` class) — the three
  stages (verify / what was missed / disposition), the verdict
  table, the finding shape, and the honesty rules. It proposes and
  never edits; declare `prompts/read-only.md` to run the
  verification without touching the tree.

### Changed

- `pm_skills/prompts/review.md` — new "Handing findings on" section
  pointing at it.
- `pm_skills/GUIDE.md` — the `prompts/` tree lists the new file.

### Upgrade actions

- Copy `pm_skills/prompts/findings.md` into your project's
  `pm_skills/prompts/` (`framework` class — new file, nothing
  overwritten).
- Replace `pm_skills/prompts/review.md` and `pm_skills/GUIDE.md`
  with this version's copies.
- If you have a review whose findings were acted on without a
  verification pass, the cheap retrospective check is staleness and
  remedies: which findings were already fixed, and which fixes
  introduced something.

## 4.14.0 — 2026-08-27

READ-ONLY-AUDIT: `prompts/read-only.md` ships the **no-write
posture** — a hard read-only contract, isolation rules for commands
that might write, and a start-and-end integrity check that makes
"it changed nothing" verifiable instead of asserted.

It is a posture, not a verb: workflows declare they run inside it.
`review.md` points at it for a review that must prove it changed
nothing, and spike mode points at it for a spike that must not write
at all. The framework already had a findings-only *posture*; it had
no no-write contract at the command level, and no way to check the
claim afterwards.

Three things it settles:

- **Where the leak actually is.** A read-only pass that writes its
  own report into the tree has already broken its contract, and that
  is the commonest way it happens. The report goes outside the tree
  or into the conversation.
- **Builds and tests are the risk, not edits.** They emit coverage,
  caches, snapshots and generated files as a matter of course. The
  rule is redirect, else run on a disposable copy, else **do not
  run it** and record the gap — a check you did not run is a stated
  gap, a stray artefact is a broken guarantee.
- **Never repair a difference.** If the integrity check fails, that
  is the finding. Deleting the stray file destroys the only evidence
  that something wrote to the tree — and it may not even have been
  this run.

**Why an autonomous, gateless pass is allowed in a gated framework.**
The exemption is narrow and stated in the file: gates exist to stop
irreversible change, and this posture cannot make any. A pass that
provably writes nothing does not need permission to look. The moment
a workflow inside the posture wants to change something, the posture
ends and the normal gates apply to that change — the exemption does
not travel with it.

Every inference in the report carries its confidence in plain words
(confident / likely / guess), because ungraded assertions in a long
autonomous report are indistinguishable from findings.

### Added

- `pm_skills/prompts/read-only.md` (`framework` class) — the
  contract, command isolation, integrity check, the autonomy
  sanction, assumption grading, and the report additions the posture
  imposes on whatever workflow runs inside it.

### Changed

- `pm_skills/prompts/review.md` — names the posture for a review
  that must prove it changed nothing.
- `pm_skills/integrations/task.md` — spike mode names it for a spike
  that must not write at all.
- `pm_skills/GUIDE.md` — the `prompts/` tree lists the new file.

### Upgrade actions

- Copy `pm_skills/prompts/read-only.md` into your project's
  `pm_skills/prompts/` (`framework` class — new file, nothing
  overwritten).
- Replace `pm_skills/prompts/review.md`,
  `pm_skills/integrations/task.md` and `pm_skills/GUIDE.md` with
  this version's copies.
- Nothing else changes. The posture is inert until a workflow
  declares it.

## 4.13.0 — 2026-08-27

UPGRADE-REFUSED: `prompts/upgrade.md` gains a **Reinstall path** —
the route projects actually take, made safe instead of ignored.

Three deployments are on record and none reached its version by
walking the upgrade procedure; one declined an upgrade outright and
wrote the refusal into its decision log. Arguing people into a
twelve-step changelog walk has now failed three times out of three.
Making what they already do safe had not been tried.

Because it is not safe. Measured on a populated fixture: copying a
new `pm_skills/` over the old silently replaces populated
`project/brief.md`, `project/decision-log.md` and every other memory
file with the **blank templates** — no error, no prompt. Deleting
`pm_skills/` first and re-copying does that *and* removes
`project/tickets/` and `project/archive/` entirely: every ticket
record and the whole cold archive. Both break the rule this file
already states and the `project-memory` class the manifest exists to
enforce. Projects that reinstalled without loss got away with it
because the clobber appeared in `git status` and somebody looked —
that is review catching it, not the method being safe.

The new section carries the safe recipe (one rule: never let a
reinstall touch `pm_skills/project/`), verified by running it
verbatim from the published text. It is complete for
`framework`-class files, including files added since the project's
version, which simply arrive. It leaves exactly two things undone —
root-template merges and memory-template reconciliation — so after a
reinstall the walk shrinks to Steps 7–8 for the entries in the gap
only. A major bump still needs the full procedure, because copying
cannot delete a file that should no longer exist.

This also settles what the **Upgrade actions** block is for. Not the
automated walk nobody runs: it is the record of which root-template
and memory-template sections changed, which is exactly what a
reinstall cannot infer by copying. The release tax stands.

### Added

- `pm_skills/prompts/upgrade.md` — "Reinstall path (what projects
  actually do)": the measurement, the safe recipe, what it cannot
  do, and a when-to-use-which for the three cases (clean gap,
  gap containing template changes, major bump).

### Changed

- `pm_skills/prompts/upgrade.md` → "Rules" — the never-delete rule
  now names reinstall as the thing that breaks it by default.

### Upgrade actions

- Replace `pm_skills/prompts/upgrade.md` with this version's copy
  (`framework` class).
- If your project has ever been reinstalled rather than upgraded,
  check `pm_skills/project/` against your history now: a memory file
  reset to its template is the failure mode, and it is silent.
- Nothing else changes. No new files, no memory or rulebook edits.

## 4.12.1 — 2026-08-27

Prune P4 trap, found by running it: a decision-log split carried the
live file's **own archive-index lines** into the new chunk. Those
lines sit at the foot of the live file, which is precisely where the
archived tail slice starts, so a straightforward `tail -n +N` takes
them with it — and the live log silently loses its pointer to every
earlier archive, which is the one thing that makes a cold archive
findable. The step already said to write an index entry "for each
archive file"; it did not warn that the existing ones are inside the
slice you are moving.

### Fixed

- `pm_skills/prompts/memory-maintenance.md` — Prune P4 now says to
  strip existing `## Archived:` index lines from the archived slice
  and re-emit the full set on the live file, and explains why a naive
  tail loses them.

### Upgrade actions

- Replace `pm_skills/prompts/memory-maintenance.md` with this
  version's copy (`framework` class).
- If a past prune already swallowed an index line, the fix is a
  one-line re-add to the live file — check that every file in
  `archive/` is named by an index line in the live log. The archived
  entries themselves are unaffected.

## 4.12.0 — 2026-08-27

EPIC-AUTOJAZZ: `integrations/epic.md` burns the backlog down
continuously — build, close, and at each milestone boundary repair
the queue, re-judge it, and print a status table — where `next.md`
ships one item and stops. It composes `next.md` per item and adds no
new mechanism.

This reverses a decision `next.md` states outright ("it never burns
down the whole backlog unattended"), and the reversal rests entirely
on one distinction: **invoked, never scheduled**. A person asking for
a burn-down in this session is a delegation, and delegation is what
lets the maintenance verbs run. Automation is not: Re-assess already
says automation may surface that a pass is due but never run one, and
write-ladder items hold that a blanket sign-off opens no gate. Both
stay true. The file says so in its own terms, because the reversal
does not survive without it.

Written from a live exercise of the mode rather than from theory, and
three of its rules exist because that run hit them:

- **Budgets are checked before the first pick, not at close.** Two
  memory budgets were already over when that run began, so its first
  act had to be a Prune. A long run writes memory per item; starting
  one on full memory guarantees a mid-run trip.
- **The staged-set echo becomes a stop, not a print.** Over a long
  run a working tree accumulates files the run did not create — in
  the exercise, a concurrent session's output — and `git add -A`
  swept them into a commit. The echo caught it, but only after the
  commit, because echo and commit ran in one breath.
- **"Milestone" means the backlog's own milestones** — not
  `init-mvp.md` bands, not trajectory phases. The status table needs
  one vocabulary and the queue is already written in that one.

### Added

- `pm_skills/integrations/epic.md` (`framework` class) —
  admissibility rule (invoked, never scheduled), the pre-pick budget
  check, the per-milestone Refactor → Re-assess → table → checkpoint
  loop, the status-table column contract, six stop conditions
  (including a `[sign-off]` item reaching the front, and the same
  failure twice), and the three risks specific to running long.

### Changed

- `pm_skills/integrations/next.md` — points at `epic.md` for
  continuous burn-down, exactly as it already points at
  `dispatch.md` for parallel lanes. Its own one-item scope and its
  guardrails are unchanged.
- `pm_skills/GUIDE.md` — the `integrations/` tree lists the new file.

### Upgrade actions

- Copy `pm_skills/integrations/epic.md` into your project's
  `pm_skills/integrations/` (`framework` class — new file, nothing
  overwritten). If you copy integration files into your AI tool's
  workflow directory, copy it there too.
- Replace `pm_skills/integrations/next.md` and `pm_skills/GUIDE.md`
  with this version's copies.
- **Do not** wire `epic.md` into a scheduler, cron entry, or
  automated maintenance ladder. Its reversal of the one-item rule is
  conditional on being invoked by a person.

## 4.11.0 — 2026-08-27

FIELD-EXPORT: a new prompt, `prompts/field-report.md`, has a project
emit a usage report **about its own use of pm-skills** for whoever
collects such reports upstream. It was written from a procedure that
already existed outside the framework: the same work was done by hand
twice in one day, the second time by an agent following a written
prompt, across two real deployments. A procedure written down, handed
to an agent, and run twice is a verb; this is that verb, shipped.

Two questions the ticket left open are answered in the prompt itself.
**A prompt, not a script** — the work runs inside the consuming
project, so the instructions have to ship there; maintainer-side
tooling cannot reach in, and the mechanical parts (inventories, git
formatting, redaction) are shell one-liners, not a generator. **It
belongs to the product even though the project gains little from it**
— for the same reason, and the prompt says so in its first paragraph
rather than implying a local benefit that is not there.

What the two hand passes taught, now fixed in the prompt: the
analysis note is mandatory (the first pass made it optional and
skipped it); redaction is reported as **counts**, not as the word
"redacted"; the tracked/private lane is decided per file by what is
already public upstream, not by how private the project feels; and
how a project reached its version — upgraded or reinstalled — is
called out as the single most useful line and the one most often
missing.

### Added

- `pm_skills/prompts/field-report.md` (`framework` class) — output
  goes to a sibling directory **outside** the project; the header
  contract carries `pm-skills=` as the join key plus `redaction=` /
  `retained=` counts; evidence is split into what is countable from
  the repository alone (deployment facts, upgrade-or-reinstall,
  memory counters, archive rotations, close fidelity from commit
  messages) and what needs session logs, with "logs unavailable"
  stated as a valid report rather than a failure; a
  leave-nothing-behind check closes it.

### Changed

- `pm_skills/GUIDE.md` — the `prompts/` tree lists the new file.

### Upgrade actions

- Copy `pm_skills/prompts/field-report.md` into your project's
  `pm_skills/prompts/` (`framework` class — a new file, so nothing is
  overwritten).
- Replace `pm_skills/GUIDE.md` with this version's copy.
- Nothing else changes: no memory file, no rulebook, no budget. The
  prompt is invoked on request and is inert until then.

## 4.10.1 — 2026-08-27

SCAFFOLD-GITPATH: the scaffold link checker now resolves link targets
against the paths **Git** knows about, not the local filesystem. It
already drew its *inputs* from Git (`git ls-files`) but checked
targets with `existsSync`, and the two disagree: a working checkout
carries gitignored generated files, a fresh clone — which is what CI
lints — does not. A link to one therefore passed locally and failed in
CI, on a reference the author could not see was broken. This
repository lived that failure twice; the second time left the badge
red for ten pushes over six days. Set membership makes local and CI
agree by construction, and being exact-case it matches Linux rather
than a case-insensitive macOS volume.

Targeted port of the fix this repo took source-only on 2026-08-24
(GATE-PARITY) into its distributed sibling — the two are deliberate
forks, so the resolution logic moved across, not the file.

### Fixed

- `pm_skills/scaffold/check-links.mjs` — new `gitPaths()` (two Git
  calls, no filesystem walk) builds the set of tracked files,
  non-ignored new files, and every ancestor directory of both;
  `resolvesInRepo()` replaces the `existsSync` call and refuses
  out-of-tree targets (`../` past the root). Header gains a
  "Resolution model" note. Zero dependencies, `node:fs` and
  `node:path` only, as before.

### Upgrade actions

- `pm_skills/scaffold/*` is `scaffold` class — **copied once at init
  and never touched on upgrade**, so your project's
  `check-links.mjs` is not replaced by this release and nothing is
  required of you.
- To adopt the fix in an existing project, copy the current
  `pm_skills/scaffold/check-links.mjs` over your root copy (or port
  `gitPaths()` / `resolvesInRepo()` into it if you have customised
  it). Expect newly-red links: each one is a reference CI could
  already not resolve. Fix the reference — do not re-point the
  checker at the filesystem.

## 4.10.0 — 2026-08-27

ARCH-RETENTION: the archive gains a **retention shape** — the rules
that decide whether evicted memory can still be asked questions
later, rather than only grepped for precedent on a lucky guess. The
budget table already said *when* memory is archived; nothing said
*how*, so the first `archive/trajectory/` prune in any project would
have set the shape by accident. Four rules, all forward-only: the
item ID is the join key and every INDEX row lists the IDs its chunk
holds; chunks break on whole sequence units (epochs for the decision
log, whole **phases** for the trajectory); INDEX rows carry enough
to choose a chunk without opening it; and a reversal is marked
**forward** by the overturning entry, since append-only means the
superseded one can never be edited to say so. Analysis stays a
practice, not a new verb — added only when a project reports an
analysis it could not perform.

### Changed

- `pm_skills/memory-policy.md` — new section "Retention shape (what
  the archive must preserve)", between the file-map derivation and
  the size-check fast path. No budget numbers changed; the
  machine-readable block is untouched, so memory validators need no
  update.
- `pm_skills/prompts/memory-maintenance.md` — Prune P2: the
  `trajectory.md` action now says whole phases only and names the
  INDEX row contract; the `decision-log.md` action names the same
  contract for its own row.
- `pm_skills/project/decision-log.md` (template) — header comments
  gain the forward-supersession grammar
  (`Supersedes: <ID or heading> — <one line>`).

### Upgrade actions

- Replace `pm_skills/memory-policy.md` and
  `pm_skills/prompts/memory-maintenance.md` with this version's
  copies (`framework` class).
- `pm_skills/project/decision-log.md` is `template` class — a
  populated project keeps its own file. To adopt the supersession
  grammar, copy the new `Supersedes:` comment block from the
  template into your log's header comments. Optional: nothing
  breaks without it, and **no existing entry is ever rewritten** to
  add one — the marker applies forward only.
- If your project already has `archive/` chunks whose `INDEX.md`
  rows lack item IDs, leave them: rows are brought up to contract
  as chunks are added, never by a back-fill pass.

## 4.9.2 — 2026-08-23

RELEASE-TREE-GLOB: the release checklist's GUIDE-tree check now
honours glob lines. Since 4.5.0 the guide's folder tree lists the
archived changelog epochs as one `CHANGELOG-*.md` line, and the step 6
snippet grepped each shipped basename literally — so the three
archive files reported MISSING at every release (a false positive
reproduced at the 4.9.1 close). Wording and snippet only; no new
files, no behaviour change for consuming projects.

### Changed

- `pm_skills/prompts/release.md` — step 6's "Top-level files missing
  from the GUIDE tree" loop: a basename that matches any `*` pattern
  token in the guide (file-shaped tokens only, `name*name.ext`) now
  passes; a name the guide neither mentions nor covers by pattern
  still reports MISSING. Shell-agnostic (regex via `grep -E`, no
  word-splitting or pathname-expansion dependence); verified under
  sh, bash, and zsh. One explanatory paragraph follows the snippet.

### Upgrade actions

- Replace `pm_skills/prompts/release.md` with this version's copy
  (`framework` class). Source-repo maintainers only — consuming
  projects never run the release checklist; nothing else to do.

## 4.9.1 — 2026-08-23

GUIDE-SYNC: the guide's prose catches up with behaviour that shipped
across 4.4.0–4.9.0 but was only ever reflected in the file tree or
the verb list. Wording only — no new files, no behaviour change.

### Changed

- `pm_skills/GUIDE.md` — the mental model names the optional
  `PROCESS.md` rulebook and the full hot-tier set (root README,
  brief, architecture, conventions); the folder tree states the
  `MANIFEST.md` class names exactly (`root-template`,
  `project-memory`); "Two ways to drive it" lists
  `prompts/backlog-authoring.md` among the prompts carrying workflow
  frontmatter; the daily-loop Pick describes the 4.9.0 empty-queue
  rule (a Re-assess pass is proposed before any Icebox pull) and the
  optional janitor report; the Close steps name the `doc-deltas.md`
  capture and `scaffold/check-memory.mjs` as the whole of step 4
  where it is wired; "Looking after project memory" presents the
  validator as a gate for any project, not only records mode, and
  the model-tier note adds Re-assess's re-grading to the propose
  steps.

### Upgrade actions

- Replace `pm_skills/GUIDE.md` with this version's copy (`framework`
  class).
- No file adds, renames, or removals; no memory migration; nothing
  to do in a consuming project beyond the replace.

## 4.9.0 — 2026-08-18

PLAN-ORDER: memory maintenance gains a sixth verb, **Re-assess
(re-judge the queue)** — a maintainer-gated pass that re-grades
standing items, refreshes hold reasons and triggers, re-orders, and
refills empty milestones, so the next pick stands on current
judgement rather than stale grades. Refactor repairs the map's
structure and stops when it is clean; Re-assess re-judges its
substance, which a structurally clean backlog can need all the same
(evidence: two manual precedents on the source repo, 2026-08-17 and
2026-08-18).

### Changed

- `pm_skills/prompts/memory-maintenance.md` — new **Re-assess** verb
  (RA1–RA5 + rules: propose-only, never auto-run, age informs but
  never reorders, quiet no-op when nothing changed); the intro and
  shared-rules lines now count six verbs; the model-tier note adds
  RA3 to the propose steps; Diagnose check 13's action now routes
  ageing standing items to Re-assess.
- `pm_skills/prompts/session-start.md` — Start B step 2: an Icebox
  pull with nothing committed in Active now proposes a Re-assess
  pass first; with Current and Next both empty, that pass is the
  refill mechanism.
- `pm_skills/GUIDE.md` — the folder-tree line and the "Looking after
  project memory" verb list carry all six verbs.

### Upgrade actions

- Re-copy `pm_skills/prompts/memory-maintenance.md`,
  `pm_skills/prompts/session-start.md`, and `pm_skills/GUIDE.md`
  (all `framework` class — replace wholesale).
- No file adds, renames, or removals; no memory migration. Records
  mode needs no record changes: `Last assessed:` is a ticket-body
  line the new verb writes only when an assessment changes
  something.

## 4.8.0 — 2026-08-17

RECORDS-DIST: records mode becomes distributable (BACKLOG-STATE
phase 2) — run-in-place scaffold tooling, a configurable dialect
surface, and adoption grammar guidance. Evidence base: the first
records adoption on a consuming project (2026-08-17), which
canon-shaped tooling mis-served three ways.

### Added

- `pm_skills/scaffold/gen-backlog.mjs` — records-mode backlog-view
  generator (`scaffold` class, the directory default): flat
  frontmatter records under `tickets/` render the backlog's Active
  section between generated markers. Takes `--project-dir` (default
  `pm_skills/project`) and `--check`; first generation creates the
  `## Active` heading when the file lacks one; a record naming a
  milestone outside the configured groups is an error, never a
  silent drop. Dialect
  keys in `tickets/_meta.md`: `milestones: key=Title, …` (ordered;
  absent → Current / Next / Icebox) and per-group `<key>-intent:`
  lines.
- `pm_skills/scaffold/check-memory.mjs` — memory validator: the
  end-of-task size check and the mechanical half of Diagnose as one
  command, reading budgets from `pm_skills/memory-policy.md`.
  Records-aware (record↔view coherence, records-mode repair
  messages, dialect `flags:` extension — custom flags are known,
  never standing); structural failures exit 1, budget overruns
  warn. Optionally wired into a project's `check` gate.

### Changed

- `pm_skills/prompts/backlog-authoring.md` — new "Records mode"
  section: the record frontmatter grammar and field list, the
  `_meta.md` dialect keys, and the grammar the frontmatter forces —
  every item needs an ID (icebox lines included), IDs are
  SCREAMING-KEBAB with no dots, `summary:` is one physical line,
  edit-records-regenerate. The ticket-file lifecycle rule notes the
  records-mode inversion.
- `pm_skills/GUIDE.md` — "Records mode (optional)" adoption path
  under "Looking after project memory"; the scaffold file tree
  lists the two new tools.
- `pm_skills/init.md` — Step 9 notes the run-in-place scaffold
  tooling (nothing new to copy at init).
- `pm_skills/prompts/end-of-task.md` — the step 3 backlog bullet
  gains the records-mode aside: apply changes as record edits and
  regenerate; never hand-edit between the generated markers.
- `pm_skills/project/backlog.md` (template) — one pointer comment
  to the records-mode docs.
- `pm_skills/MANIFEST.md` — the class-inheritance rule now names
  `pm_skills/scaffold/` → `scaffold` explicitly (the paths table's
  wildcard already covered it).

### Upgrade actions

- Add `pm_skills/scaffold/gen-backlog.mjs` and
  `pm_skills/scaffold/check-memory.mjs` from this version
  (`scaffold` class; both run in place from `pm_skills/scaffold/` —
  nothing to copy into the project root).
- Replace `pm_skills/GUIDE.md`, `pm_skills/init.md`,
  `pm_skills/prompts/backlog-authoring.md`,
  `pm_skills/prompts/end-of-task.md`, and `pm_skills/MANIFEST.md`
  with this version's copies.
- Do **not** replace `pm_skills/project/backlog.md` in a consuming
  project (`project-memory` class — the class wins): the template's
  records-mode pointer comment reaches populated backlogs by
  adoption at the next backlog touch, never by file replacement.
- Optional adoption: a project that wants a generated backlog
  follows `pm_skills/GUIDE.md` → "Records mode" (records under
  `tickets/`, `_meta.md` dialect keys, the two tools optionally in
  its `check` gate). Prose backlogs remain first-class; no action
  otherwise.

## 4.7.2 — 2026-08-17

Correction release (CL-440-WORDING): 4.4.0's Upgrade actions name a
project-memory path in a replace list; plus the precedence rule in
`prompts/upgrade.md` and a `prompts/release.md` snippet completion.

### Corrections

- **4.4.0 → Upgrade actions** (published entry stays byte-untouched
  — append-only rule): the replace list names
  `pm_skills/project/backlog.md` "(template)". That path is
  `project-memory` class in `MANIFEST.md` and is **never replaced**
  in a consuming project — a populated backlog must survive every
  upgrade. What 4.4.0 should have said: the backlog-template deltas
  (linked `[detail]` grammar, legibility guidance) reach populated
  backlogs by adoption at the next backlog touch — see that entry's
  own "Optional adoptions" line — never by file replacement. For
  every walk: when an entry's literal action list conflicts with a
  path's MANIFEST class, **the class wins** (`prompts/upgrade.md`
  Step 3).

### Changed

- `prompts/upgrade.md` — Step 3 now states the precedence rule: an
  entry's action list never overrides a path's class; a
  `project-memory` path is never replaced whatever an entry says.
- `prompts/release.md` — step 6 snippet: the `TOP=` awk anchors to
  version headings (`^## [0-9]`), completing 4.7.1's grep fix (the
  coverage check was comparing against the "Archived epochs"
  section).

### Upgrade actions

- Replace `pm_skills/prompts/upgrade.md` and
  `pm_skills/prompts/release.md` with the 4.7.2 copies (`framework`
  class).
- No memory changes. If a past upgrade across 4.4.0 replaced a
  populated `pm_skills/project/backlog.md`, restore it from git
  history — 4.4.0 never licensed that replace.

## 4.7.1 — 2026-08-17

Advisory harness check joins the release close (RELEASE-EVALS).

### Changed

- `prompts/release.md` — new step 7, "Harness check (advisory)":
  repos keeping a behavioural eval harness run the scenarios
  applicable to the release — upgrade scenario for upgrade-machinery
  changes, close scenario for close-protocol changes — and note the
  results (or "no applicable scenarios" plus the reason) in the
  closing report. Advisory, never a gate; repos without a harness
  skip it. Also fixes the step 6 consistency snippet: the top-entry
  grep now matches version headings (`^## [0-9]`), not the
  "Archived epochs" section CL-HORIZON added above the entries.

### Upgrade actions

- Replace `pm_skills/prompts/release.md` with the 4.7.1 copy
  (`framework` class — no customisation check expected). No memory
  migration. Projects without an eval harness see no behavioural
  change.

## 4.7.0 — 2026-08-17

PAR-DISPATCH: a dispatch verb initiates parallel dev work in
parallel chats; the per-close transcript reminder retires.

### Added

- `pm_skills/integrations/dispatch.md` — the parallel-work entry
  move: pick two or three disjoint backlog items (at most one
  touching the release-bearing tree), assign lanes (branch, mode,
  a working tree each) and the primary, and emit one paste-ready
  brief per chat; the dispatching session integrates the returning
  lanes, applies their handoff blocks, and releases once. Composes
  the Start B pick, the GUIDE parallel conventions, and the
  secondary close; verified by a live two-lane dispatched exercise
  before release.

### Changed

- `pm_skills/integrations/next.md` — gains a pointer to the
  dispatch verb; the trigger itself stays strictly one-item.
- `pm_skills/GUIDE.md` — the file tree, the daily-loop Pick, and
  "Parallel and multi-machine work" gain dispatch pointers;
  "Saving session transcripts" is demoted to an optional on-demand
  reference (the 4.2.0 per-close reminder never fired in consuming
  evidence).
- `pm_skills/prompts/end-of-task.md` — the closing report's
  non-blocking save-your-transcript reminder paragraph is removed;
  the report step is otherwise unchanged.

### Upgrade actions

- Copy the new `pm_skills/integrations/dispatch.md` into place; if
  your AI tool runs workflows from a directory, copy it there
  alongside `task.md` and `next.md`.
- Replace `pm_skills/integrations/next.md`, `pm_skills/GUIDE.md`,
  and `pm_skills/prompts/end-of-task.md` with this version's
  copies (all `framework` class).
- Behaviour note: task closes no longer print the
  save-your-transcript reminder. The `_transcripts/` convention is
  unchanged and stays documented in `GUIDE.md` → "Saving session
  transcripts".

## 4.6.0 — 2026-08-17

PAR-BRANCH: branch-per-session coordination for records-mode
projects, with the regenerate-the-view merge rule.

### Changed

- `pm_skills/GUIDE.md` — "Parallel and multi-machine work" gains
  the records-mode path: sessions on branches, item work needs no
  claims, record files merge clean, and any view conflict is
  resolved by regenerating from the merged records — never by
  hand-merging the view. Advisory claims remain for prose-memory
  projects and the shared append files.
- `pm_skills/prompts/end-of-task.md` — the secondary-session close
  shrinks under records mode: the handoff block carries only the
  shared-file appends; backlog changes ride the branch as record
  edits.

### Upgrade actions

- Replace `pm_skills/GUIDE.md` and
  `pm_skills/prompts/end-of-task.md` with this version's copies.
  No action for prose-memory projects — the new paths activate only
  where a project runs a generated backlog over per-item records.

## 4.5.0 — 2026-08-17

JANITOR-READ + CL-HORIZON: session start can read a standing
janitor report instead of computing its nags, and the changelog's
superseded epochs move to archive files behind an index.

### Added

- `pm_skills/CHANGELOG-1x.md`, `pm_skills/CHANGELOG-2x.md`,
  `pm_skills/CHANGELOG-3x.md` — archived epochs, moved verbatim
  (49 entries verified byte-identical across the split; the live
  file drops from ~17.9k to ~1.9k words). `framework` class.

### Changed

- `pm_skills/CHANGELOG.md` — gains the "Archived epochs" index;
  keeps the 4.x epoch plus 3.17.1 live so a one-gap upgrade never
  opens the archive.
- `pm_skills/prompts/upgrade.md` — Step 2's walk follows the index
  into archived epoch files when the version gap starts there.
- `pm_skills/prompts/session-start.md` — new "Janitor report"
  section: a fresh report (under ~24 h, Start SHA in branch
  history) supplies the counts and banners; stale or absent falls
  back to computing. Read-only report; never canonical.
- `pm_skills/GUIDE.md` — folder tree lists the archive files.
- `pm_skills/MANIFEST.md` — rows for the three archive files.

### Upgrade actions

- Copy the three new `CHANGELOG-*x.md` files; replace
  `pm_skills/CHANGELOG.md`, `pm_skills/prompts/upgrade.md`,
  `pm_skills/prompts/session-start.md`, `pm_skills/GUIDE.md`, and
  `pm_skills/MANIFEST.md` with this version's copies.
- No action on project memory. A janitor script is optional
  maintainer tooling (the reference implementation lives in the
  framework source repo; a scaffold copy may ship once proven) —
  the session-start path activates only where a report exists.

## 4.4.0 — 2026-08-17

Ticket-sweep release: the optional PROCESS template (PROCESS-TPL,
option A), backlog authoring + ticket skeleton + navigation
(BACKLOG-AUTH — the TICKET-GEN authoring cluster), deprecation
shims on consolidation (DEPREC-SHIM), the `[security]`-flag
cross-reference, and harness auto-memory guidance.

### Added

- `pm_skills/templates/PROCESS.md` — optional fourth root template
  (`root-template` class) for complex multi-phase projects: macro
  phases with definitions of done, the decision/ADR closure
  protocol, always-four-stage triggers, demo/spike cadence, risk
  watch list. Conditional read tier; skippable without nag.
- `pm_skills/prompts/backlog-authoring.md` — loose ideas or a
  transcript → grammar-true backlog items grouped by milestone,
  plus `tickets/<ID>.md` files from its canonical ticket skeleton;
  doubles as the contract an external agent follows when asked to
  write tickets.

### Changed

- `pm_skills/prompts/upgrade.md` — Step 6 gains deprecation-shim
  handling for removed user-invocable files (workflow-dir sweep,
  optional tombstones); Step 5 and the report carry the
  backups-are-for-recovery-never-invocation rule.
- `pm_skills/prompts/release.md` — verify step requires an
  old → new mapping table whenever a release removes or renames a
  user-invocable file.
- `pm_skills/prompts/session-start.md` — stops any workflow
  invoked from `archive/upgrade-backup-*`; Start B triage now
  creates a ticket (skeleton + `[detail]`) for a promoted line
  that has outgrown one line, before the line is deleted.
- `pm_skills/project/backlog.md` — ticket grammar: the `[detail]`
  flag is written as a Markdown link targeting `tickets/<ID>.md`,
  so backlog → ticket is one hop; legibility guidance (lean
  milestones, one
  intent line per heading, shipped work never lingers even as
  comments); pointer to the authoring prompt.
- `pm_skills/templates/AGENTS.md` — conditional read tier gains
  the optional `PROCESS.md` line; the Security baseline states
  that leaked-credential tracking items are flagged `[security]`
  on creation.
- `pm_skills/init.md` — Step 0 mentions the optional fourth
  template.
- `pm_skills/GUIDE.md` — templates tree + prompts list updated;
  new "Harness auto-memories" guidance (tool memories are a
  per-tool cache; the files are the record); backlog-authoring
  usage note.
- `README.md` — commands table gains "Draft a backlog from these
  notes".
- `pm_skills/MANIFEST.md` — row for the new template.

### Upgrade actions

- Copy the two new files (`pm_skills/templates/PROCESS.md`,
  `pm_skills/prompts/backlog-authoring.md`); replace
  `pm_skills/prompts/upgrade.md`, `pm_skills/prompts/release.md`,
  `pm_skills/prompts/session-start.md`,
  `pm_skills/project/backlog.md` (template),
  `pm_skills/init.md`, `pm_skills/GUIDE.md`, and
  `pm_skills/MANIFEST.md` with this version's copies.
- `pm_skills/templates/AGENTS.md` is `root-template`: 3-way merge
  the two additive changes into your populated root copy (one
  conditional-tier bullet; one Security-baseline sentence).
- Optional adoptions, no action required: copy and populate
  `PROCESS.md` only if your project is multi-phase; rewrite
  existing `[detail]` flags as links at your next backlog touch.

## 4.3.0 — 2026-08-09

PRUNE-HYST + CTX-IMPORTS: prune actions gain a hysteresis target so
maintenance stops re-firing immediately, and the read-tier guidance
gains measured rules-import advice.

### Changed

- `pm_skills/memory-policy.md` — new "Prune-to targets (hysteresis)"
  rule: prune to at most 70% of a budget, never merely under it;
  `pruneToFraction` added to the machine-readable block.
- `pm_skills/GUIDE.md` — "How it works" gains rules-import guidance:
  import the identity documents into the rules position where the
  tool supports it (measured: about a third fewer tool round-trips,
  about a seventh fewer tokens at equal verified quality); pre-load
  identity documents only, never work-target files.
- `pm_skills/prompts/session-start.md` — one note under the hot
  whole-file list pointing at the same guidance.

### Upgrade actions

- Replace the three files above with this version's copies (all
  `framework`-class, standard replace). If your project customised
  budget numbers, re-apply them in both the JSON block and the
  table; the new `pruneToFraction` key defaults to 0.7.

## 4.2.0 — 2026-08-09

Wave 1 batch — TRANSCRIPT-SHA + OPT-PROTO + RETIRE-COMP +
CLOSE-COMMIT: four small capability and policy changes from the
machine-native programme, shipped as one listed release.
**Behaviour change:** the close now commits — and pushes when a
remote is already configured — as a standard step instead of a
proposal.

### Changed

- `pm_skills/GUIDE.md` — the transcript convention gains a
  `Start SHA:` first-line header (TRANSCRIPT-SHA: a saved transcript
  becomes a scenario seed for behavioural evaluations); "Commit as
  you close" reflects the standard commit-and-push close
  (CLOSE-COMMIT).
- `pm_skills/prompts/end-of-task.md` — the step 5 commit status
  reflects the standard commit-and-push close; the transcript
  reminder carries the `Start SHA:` header.
- `pm_skills/integrations/task.md` — step 11 becomes "Commit and
  push (standard close step)", keeping the staged-set echo and
  parallel-session staging rules and adding a no-habitual-bypass
  rule (never step past a failing gate with `--no-verify`); step 8
  drops the obsolete "imports at the top" compensation
  (RETIRE-COMP — a lint rule owns it where the stack supports one;
  evidence: two blinded evaluation runs showed frontier agents
  reconstruct sensible conventions regardless).
- `pm_skills/prompts/design-options.md` — new rule (OPT-PROTO):
  when options differ on an empirically checkable claim costing
  roughly fifteen minutes or less to check, run the check in a
  scratch location first and present measured comparisons, not
  argued ones.
- `pm_skills/prompts/memory-maintenance.md` — the shared verb rules
  keep stop-and-report-on-failure and drop the obsolete
  no-ad-hoc-scripts compensation (RETIRE-COMP).

### Upgrade actions

- Replace the five files above with this version's copies (all
  `framework`-class, standard replace).
- **Flag the behaviour change to the project owner:** closes now
  commit and push by default. A project that prefers the previous
  propose-only behaviour states it in its root `AGENTS.md` (one
  line, e.g. "Closes propose commits; never auto-commit or push").

## 4.1.0 — 2026-08-09

MEM-CHECK: budgets become machine-readable and the end-of-task size
check gains a validator hook — the first enforcement-over-exhortation
release from the 2026-08-08 machine-native evaluation series:
mechanical memory checks move from prose instructions to a tool a
project can run, gate on, and build evaluations against.

### Changed

- `pm_skills/memory-policy.md` — new "Machine-readable budgets"
  section: the canonical budget numbers as a fenced JSON block a
  memory validator parses; the table below it explains the same
  numbers for humans. Update block and table together.
- `pm_skills/prompts/end-of-task.md` — step 4 gains a "Memory
  validator (preferred when the project keeps one)" paragraph:
  structural failures must be fixed before closing, WARN lines feed
  the maintenance proposals, and the manual counts remain the
  fallback when no validator exists.

### Upgrade actions

- Replace `pm_skills/memory-policy.md` and
  `pm_skills/prompts/end-of-task.md` with this version's copies
  (both `framework`-class, standard replace). If your project
  customised budget numbers, re-apply them inside BOTH the new JSON
  block and the table — they must stay in step.
- No new distributed files: the reference validator
  (`check-memory.mjs`) lives in the framework source repo only; a
  scaffold copy ships in a later release once proven on a consuming
  project. Nothing else to do.

## 4.0.0 — 2026-07-17

DIST-BOUNDARY: the three rulebook templates lived at the framework
repo's root, so the natural acquisition act — cloning or downloading
the repo — carried the maintainer's own tree (repo README, tooling,
CI, self-hosted memory) into consuming projects, and IDE global-rule
loading in the source repo picked up the placeholder template instead
of the operative contract (both observed on a real consuming project,
2026-07-16). The distributable is now exactly one folder: `pm_skills/`
contains everything, including the templates. Major: distributed
files moved (root → `pm_skills/templates/`).

### Changed

- `pm_skills/templates/AGENTS.md`, `pm_skills/templates/UI-STANDARDS.md`,
  `pm_skills/templates/DEV-INFRASTRUCTURE.md` — the three root-template
  files move from the source repo root into the distributed tree.
  Content unchanged; class unchanged (`root-template`).
- `pm_skills/MANIFEST.md` — root-template path rows moved to
  `pm_skills/templates/*`; the `root-template` class description now
  states the ship-in-templates / populate-at-root split; new files
  under `pm_skills/templates/` default to `root-template`.
- `pm_skills/init.md` — new **Step 0: Copy the rulebook templates**
  (`cp -n` from `pm_skills/templates/` to the project root); agent
  mode executes Steps 0–10; preamble and minimum-viable list updated.
- `pm_skills/GUIDE.md` — folder tree gains `templates/`; the rulebooks
  bullet notes they are copied out of `templates/` at init.
- `pm_skills/prompts/upgrade.md` — intro and Step 7 name the template
  source location (`pm_skills/templates/` at 4.0.0+, the source repo
  root in older sources); the merge target is always the project's
  populated root copy.
- `pm_skills/integrations/adopt.md` — framework-source-tree detection
  heuristic updated for the new template location; the framework
  context read copies missing root rulebooks from
  `pm_skills/templates/` per init Step 0.
- `pm_skills/integrations/init-mvp.md` — same framework context read
  update.

### Upgrade actions

- Framework sync (Step 6): overwrite `init.md`, `GUIDE.md`,
  `MANIFEST.md`, `prompts/upgrade.md`, `integrations/adopt.md`,
  `integrations/init-mvp.md`, `VERSION`, `CHANGELOG.md`; **add** the
  new `pm_skills/templates/` directory (three files) from the source.
- Your populated root `AGENTS.md`, `UI-STANDARDS.md`, and
  `DEV-INFRASTRUCTURE.md` are your project's own copies — **no
  action**; nothing moves, merges, or is overwritten at the project
  root. Future template merges (upgrade Step 7) read the base
  structure from `pm_skills/templates/` instead of the source root.
- Housekeeping (optional, propose per file — never batch-delete): if
  an earlier whole-repo copy left framework-repo files in your
  project that were never part of the distribution (the framework's
  own `README.md`/`CONTRIBUTING.md`, a `scripts/check-docs.mjs`, a
  `.github/workflows/lint.yml`, a `package.json` named `pm-skills`,
  `self/` ignores), confirm each is unused in your project and remove
  it.

---

## 3.17.1 — 2026-07-16

ARCH-INTEG: the append-only doctrine had no integrity check — content
could vanish from the decision-log + archives while `trajectory.md`
still pointed at it, and nothing noticed (a real incident: four
2026-06-23/24 entries dropped by a revert, referenced but present in no
archive, unflagged across three prunes and a Diagnose pass). Adds a
cheap referential check to Diagnose so silent loss surfaces at the next
health pass. Patch: one new Diagnose check + a Prune note, no new files,
no migration.

### Changed

- `pm_skills/prompts/memory-maintenance.md` — Diagnose gains check 7,
  **Archive referential integrity**, inserted after archive-hygiene
  check 6 (the two content-adjacent checks): it harvests dated
  `decision-log YYYY-MM(-DD)` pointers from `trajectory.md` and its
  archive chunks, harvests coverage from the live log's `## YYYY-MM-DD`
  headings plus each archive INDEX date range, and FAILs on any
  referenced date covered by neither — with a git-recovery hint and a
  propose-restore (never auto-edit) action. The former checks 7–12
  (Version drift, ADR status, Orphan ticket files, Unreconciled lite
  closes, Doc-delta ledger health, Ageing standing items) renumber to
  8–13. Prune P5 (Verify) gains a note to re-run this check after a
  `decision-log.md` / `trajectory.md` split.

### Upgrade actions

- `memory-maintenance.md` is `framework` — overwrite wholesale with the
  new version after the Step 4 customisation check. No project-memory,
  MANIFEST, or root-template change; no migration. Diagnose check
  numbers shifted (7 is now Archive referential integrity; 8–13 are the
  former 7–12) — update any local notes that cite a check by number.
