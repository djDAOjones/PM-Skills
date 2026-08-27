# Decision log archive — 2026-08-23 → 2026-08-27

<!-- Cold tier: grep only, never auto-read. Append-only, verbatim.
  Ranges across the August chunks overlap: the INDEX row's item IDs,
  not the dates, locate an entry (pm_skills/memory-policy.md ->
  "Retention shape"). -->

## 2026-08-27 — LAB-FIRST paused; UPGRADE-REFUSED filed

**Decision:** the maintainer paused the LAB-FIRST standing order
until further notice. The `ALERT` flag is withdrawn and the record
moves to the Icebox, so it no longer gates the queue and canon work
may be picked normally. Nothing in the order is retracted — it
resumes intact on the maintainer's word, and only the maintainer
resumes or clears it. In the same pass, `UPGRADE-REFUSED` was filed
to the Icebox from the FIELD-HARVEST evidence.

**Rationale:** the order was written on 2026-08-23 to stop canon
changes widening the delta the lab had to absorb. That reason has
largely expired: UPSTREAM-ASSIM shipped on 2026-08-24 and the lab is
merged to 4.9.2. The R2 leg it also protected has not run and cannot
run on its intended subject — the University of Nottingham
video-helper app was built on canon 4.9.2, not pm-next (FIELD-HARVEST,
same day), so it is a second incumbent run and is spent as an R2
subject. Holding the whole canon queue behind a leg that now needs a
project nobody has picked was costing more than it protected.

**Consequences:** Current holds only VOICE-INTAKE, still blocked on
its maintainer inputs, so **nothing in Current is runnable** and a
Re-assess is due to refill it from an Icebox that has grown to ten
items — three of which (REVIEW-SUITE, ABSTRACTION-PLAN,
READ-ONLY-AUDIT) remain one unsettled family. The lab's own memory
still records the video-helper as R2's planned subject; correcting it
is lab-side work and is not done here.

**On UPGRADE-REFUSED:** three deployments on record and none reached
its current version by walking `upgrade.md`; Route Plotter declined
4.9.2 outright and said so in its decision log. The declarative
upgrade machinery — MANIFEST classes, the CHANGELOG Upgrade actions
every release must carry, `upgrade.md` itself — is untested in the
field, which is not the same as broken, and the ticket says so. Filed
as an investigation, not a verdict: all three deployments share one
maintainer in one eight-week window, which is strong evidence about
this user and weak evidence about consuming projects generally.

**Alternatives:** clearing LAB-FIRST outright — rejected, the
maintainer said pause, and the order's content still stands for
whenever the lab arc resumes. Filing an `R2-ARM-CHECK` ticket here —
rejected, R2 is lab work and does not belong in the canon backlog;
the finding is recorded in this log and in the paused ticket instead.

## 2026-08-27 — FIELD-HARVEST: two applied projects filed as evidence

**Decision:** harvested Route Plotter v3 and UoN Video Helper into
`self/field-reports/` — eleven tracked reports (deployment-snapshot
notes, project memory with byte inventories, rulebooks, full git logs,
review artefacts, and the Video Helper's preserved init prompt) plus
23 raw Claude Code session logs in the local lane. Both source
repositories are public and carry `pm_skills/project/` tracked, so the
memory and rulebook material is filed in the tracked lane: copying it
here discloses nothing that is not already published. Only the session
logs go to `local/`, because those have never been published and
cannot be made public by mechanical redaction. Absolute checkout paths
were collapsed to `<checkout>`/`<home>` on filing; the one third-party
personal name — the primary user named in Route Plotter's `brief.md` —
was left as written and flagged in that export's header, because it is
already public upstream and cutting it would misrepresent how the
brief template is used in practice. Taken on the maintainer's direct
pick, which cleared the LAB-FIRST gate as GATE-PARITY did on
2026-08-24. No backlog item shipped; nothing removed from the backlog.

**Rationale:** two live deployments running the framework daily in the
same week, one of them recorded from install onwards, is the strongest
usage evidence this tier has held — and `self/REFLECTION.md` →
"Evidence gate" weights consuming-project evidence above self-hosted
material. It was also perishable: both projects pruned memory during
the harvest itself, and Route Plotter's live decision log shrank from
roughly 130 KB to 35 KB while the export was being taken. The exports
therefore record working-tree state with the diff from HEAD attached,
rather than claiming a clean snapshot.

**What the evidence says**, recorded here as a starting point rather
than a conclusion — the analysis belongs in `self/evaluations/`:

- Three deployments are now on record (Derry Lane, Route Plotter, UoN
  Video Helper) and none reached its current version by walking
  `pm_skills/prompts/upgrade.md`. Route Plotter is the sharp case: its
  decision log records the owner choosing to "stay on PM-Skills 4.7.0
  (upstream is 4.9.2 — skipped, not merely deferred)". The declarative
  upgrade contract — MANIFEST classes, CHANGELOG Upgrade actions — is
  built on a procedure no consuming project has yet used.
- UoN Video Helper is **not** the lab arm it has been treated as. It
  is sourced from the PM-Skills-lab fork but runs canon 4.9.2 content;
  no `pm-next` artefact exists anywhere in the tree, and one README
  link is the only mention of the lab. This bears directly on
  LAB-FIRST's R2 parallel-run: on this evidence the two-arm test has
  not started.
- Two independent projects have written cloud-sync defences into their
  rulebooks, confirming from the field the constraint the brief
  already names.

**Alternatives:** filing everything local-only, as Derry Lane was —
rejected, because it would hide already-public material behind a lane
meant for genuinely private evidence, and would stop a public
evaluation citing them at all. Waiting for a quiescent moment in
both projects — rejected, because both are in daily flux and the
prune that ran mid-harvest is itself evidence worth holding.

## 2026-08-24 — GATE-PARITY: the gate resolves against Git, not the filesystem

**Decision:** `scripts/check-docs.mjs` resolves link targets and
backticked paths against the set of paths Git knows about — tracked
files, non-ignored new files, and their ancestor directories — rather
than calling `existsSync`. Its `IGNORE` list stays as the single
deliberate exception and is documented as prose-only: a link gets no
escape hatch, because CI cannot follow one. A new `npm run check:clone`
(`scripts/check-clone.mjs`) runs the whole gate against a fresh clone
of HEAD. Source-only; shipped on the maintainer's direct pick, which
cleared the record's own trigger and the LAB-FIRST gate.

**Rationale:** the root contract calls the gate "CI-mirrored" and it
was not. CI lints a fresh clone; a working checkout also carries
gitignored generated files, so a filesystem check passed here on
references CI could not resolve. Twice — GATE-FRESH (`node_modules/`)
and GATE-REPORTS (the janitor report), the latter red for ten pushes
over six days behind a green local gate. Both were repaired by adding
a pattern to `IGNORE` after the fact, which fixes the instance and
leaves the class. Resolution was already half git-faithful: sources
come from `git ls-files`, and every other gate tool honours
`.gitignore`. Making the target side agree closes the class at its
source, costs nothing at runtime, needs no clone, and — being
exact-case — also stops a case-only reference passing on a
case-insensitive macOS volume and failing on Linux.

**Alternatives:** the ticket's three options. A clone-based check
alone (rejected as the primary — opt-in, so it cannot stop the
divergence being introduced; kept as the secondary `check:clone`,
which is worth having because it covers classes the docs check cannot
model). A CI step asserting parity (rejected — CI already *is* the
fresh clone; once local resolution is faithful, a red CI run means a
real fault). A notification on a red default-branch run (rejected as a
fix — it shortens the feedback loop but leaves the gate lying about
being mirrored; still worth enabling as a repo setting).

## 2026-08-24 — GATE-REPORTS: check-docs ignores the generated janitor report

**Decision:** `scripts/check-docs.mjs` adds a
`self/project/reports/` pattern to its `IGNORE` list, so a
backticked reference to the janitor report is never counted as a
missing path. Source-only; taken under the LAB-FIRST gate-forced
maintenance exception.

**Rationale:** the report is generated and gitignored
(REPORTS-IGNORE, 2026-08-17), so the root contract's pointer to it
resolved on a working checkout and failed in every fresh clone. The
CI Lint job went red on 2026-08-18 and stayed red for ten pushes
while `npm run check` was green locally, leaving a failing badge at
the top of the README. Every other gate tool already excluded the
path — markdownlint, cspell, editorconfig-checker, and check-docs'
own `FILE_EXCLUDE` — only the target-side `IGNORE` list had missed
it. Same repair GATE-FRESH (2026-08-08) made for `node_modules/`.

**Alternatives:** track a placeholder report (rejected —
contradicts REPORTS-IGNORE and is overwritten every session); drop
the path from the contract's prose (rejected — the pointer is the
contract for a documented verb); ignore a generic `reports/`
segment anywhere (rejected — would mask real rot elsewhere).

## 2026-08-23 — LAB-FIRST: the lab arc gates this repo's queue

**Decision:** Maintainer standing order queued as an ALERT record
at the top of Current (LAB-FIRST, order 0; custom `ALERT` flag
registered via the 4.8.0 `_meta.md` dialect key): no new canon
work before the lab arc — UPSTREAM-ASSIM (queued lab-side the
same day, lab commit `437fed6`), then R2 parallel-run preparation
for the two-arm test on the next real project. Exceptions:
gate-forced maintenance, and upstream work the lab arc itself
requests. Only the maintainer clears the record.

**Rationale:** the R2 comparison needs the incumbent at its
current best *as merged by the lab*; canon commits made before
the assimilation widen the delta and stale the survey hints on
the lab's ticket. The hot Active view is the surface session
start actually reads, so the order lives there, not in
assistant-side memory alone.

**Alternatives:** memory-only note (rejected — not a framework
surface, and other harnesses would never see it); blocking
VOICE-INTAKE explicitly (unnecessary — already blocked on its
maintainer inputs).

## 2026-08-23 — FIELD-REPORTS: local-only lane for evidence that cannot be public

**Decision:** The first real field report — a 343 KB primary-source
export from the Derry Lane Development System (private by design:
household property matters and a third party's attributed views,
verbatim) — is kept local-only: `self/field-reports/<slug>/local/`
is gitignored by one tracked rule, the project directory stays
tracked with a `.gitkeep`, the Projects row says which lane the
evidence uses, and the README gains an `export` type for raw dumps.
Maintainer decision 2026-08-23, on the recommendation.

**Rationale:** the tier lives in a public repo and a push is
permanent (forks, caches, indexers); mechanical redaction removed
IDs and emails but cannot remove the household content the
framework-usage evidence is inseparable from. Local-only keeps every
byte on the cloud-synced checkout for analysis and publishes
nothing; the redaction judgement moves to the public evaluation
that reads it. A per-project `local/` subdirectory scales without
further `.gitignore` edits and keeps public/private visible in the
path.

**Alternatives:** commit as-is (rejected — a third party's words in
a public repo, irreversibly); trim to memory files + git log
(rejected — the project *is* the household matter, so every section
carries it, and trimming destroys the primary evidence); gitignore
the whole project directory (rejected — per-project rule, and the
project vanishes from the tree).

## 2026-08-23 — FIELD-REPORTS: a cold tier for consuming-project evidence

**Decision:** Reports from projects that run pm-skills are filed
under `self/field-reports/<project-slug>/YYYY-MM-DD-<type>.md` — a
new cold tier beside `self/evaluations/` and `self/_transcripts/`,
source-only, tracked, lint-exempt per project directory with one
gated README as the canonical description (what is filed, the type
list, the header contract with a `pm-skills=` join key, the public-
repo redaction rule). Wired into all six exclusion points and the
root `AGENTS.md` cold tier; `digital-art-audience-hub` is the first
project directory. The Hub case study stays in the frozen archive
and is pointed at, not moved.

**Rationale:** `self/REFLECTION.md` already names consuming-project
reports as the evidence input that outweighs self-hosted material,
yet no tier held them — run one had to declare itself pure
self-hosted. Neither existing cold tier fits: evaluations are this
repo's analysis *outputs*, transcripts are its own session inputs;
exports from outside need their own home so a usage analysis can
group by project and read each report against the release in force.
Per-project directories keep the README gated while the verbatim
exports (foreign paths and spellings) stay out of the gate.

**Alternatives:** a `self/evaluations/projects/` subtree (rejected —
inherits exclusions for free but conflates input with output, which
the reflection's self-reference countermeasure needs kept apart);
flat dated files with a project prefix (rejected — no grouping for
cross-project analysis, and no way to gate a README); gitignore the
tier like the janitor report (rejected — evidence is kept, not
regenerated; the tracked checkout is the backup).
