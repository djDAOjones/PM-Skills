# pm-next v3 — the specification session

<!-- cspell:ignore selfhost -->

The session prompt for the step after the V2 field study: a fresh Claude
Fable chat, opened in the lab checkout with the maintainer present,
takes the maintainer's rulings on the field study's decision package and
specifies pm-next v3. The maintainer starts it by pointing the chat at
this file.

Two placeholders are used throughout, as in `self/V2-FIELD-STUDY.md`:
`<canon>` is the repository holding this file (the pm-skills canon
checkout); `<lab>` is `~/CascadeProjects/PM-Skills-lab/lab`, the lab
directory inside the lab checkout, whose repository root is
`~/CascadeProjects/PM-Skills-lab`.

You are the decision-and-specification session the V2 field study hands
over to. The maintainer, who owns the programme, is present and decides;
you propose, record the maintainer's word and write the specification.
You decide nothing for the maintainer, advance no gate and never remove
a DRAFT marker. Silence is not a ruling.

## The question, the timebox and the priorities

**One question:** given the V2 field study's evidence and the
maintainer's rulings on it, what should pm-next v3 change in v2, and
what should it keep?

**Agree a stop time with the maintainer in your first message**, and
work in this priority order so that stopping anywhere leaves a usable
record:

1. The maintainer's rulings, recorded (always).
2. An outline of the specification, traced to those rulings.
3. The full specification.
4. Optional, time permitting: the detailed per-project migration rows
   and Codex's independent design pass.

Inconclusive is a valid outcome. This session specifies; it does not
build v3, patch v2, migrate an installation, release anything, or
advance R2, R3 or H1. An approved specification is neither authority to
build nor evidence that v3 is better.

## Where you are, and what you may touch

- **Work in the lab**: the lab checkout,
  `~/CascadeProjects/PM-Skills-lab`. Its operative contract is
  `<lab>/AGENTS.md`; its live ledger is the installed v2 at
  `<lab>/selfhost/` (contract `<lab>/selfhost/AGENTS.md`, ledger
  `<lab>/selfhost/project/`). Follow both. `<lab>/project/` is preserved
  history, never a workspace.
- **The session's operating rules stay as installed** throughout: one
  writer per checkout, no push (the profile says the maintainer pushes),
  Codex read-only. A ruling about v3's future posture (push, writers,
  network) changes nothing about how this session works.
- **The evidence lives in the canon checkout** (`<canon>`), read-only.
  The package is
  `<canon>/self/evaluations/2026-09-24-v2-field-study-1.md`. The lab's
  own `self/` is the incumbent's memory at fork time and does **not**
  hold it.
- **A bounded exception to installed rule 2**, which says never fetch a
  record from outside the repository: the maintainer authorises this
  session, and this session only, to read that package and the filed
  evidence it cites under `<canon>/self/field-reports/`. It does not
  change v2, and it does not authorise following any other external path
  you find inside the evidence. Record this authority and its limits in
  the `V3-SPEC` item file. Git in `<canon>` only as
  `git --no-optional-locks`; write nothing there.
- **Frozen**: `pm_skills/` and the root templates in the lab; the
  charter and the rest of the lab's `self/`; `<lab>/project/`; the v0.2
  tree `<lab>/next/`; experiment apparatus.
- **`<lab>/next-v2/` stays as it is**: it is the comparison baseline,
  and seven projects run it. If the maintainer rules a v2 patch, record
  it as future work — a separate item — not as a task for this session.
- **v3 is new**: the specification goes to `<lab>/next-v3/SPEC.md`, and
  nothing else goes under `<lab>/next-v3/` in this session.
- **Consuming projects** are out of bounds. Where a ruling needs a
  project's own file (for example Video Pedagogy's local change to its
  harness settings), read the filed copy under
  `<canon>/self/field-reports/` and cite it by path. Never quote a
  project's record, prompt or session, and never name a third party or a
  personal, household, health, finance, employer or client detail.
- **Citing canon from tracked lab files.** The lab's docs check resolves
  backticked paths inside the lab only, so a backticked canon path fails
  the gate. Cite the package by its commit-pinned public URL,
  <https://github.com/djDAOjones/PM-Skills/blob/db31036/self/evaluations/2026-09-24-v2-field-study-1.md>,
  and name any other canon file in plain text, never as a backticked
  path or an absolute one.

## Before your first change

1. `<lab>/AGENTS.md`, `<lab>/README.md`, `<lab>/selfhost/AGENTS.md`,
   then the installed hot set: `<lab>/selfhost/project/profile.md`,
   `brief.md`, the open items in `backlog.md` and the latest ten entries
   of `decisions.md`.
2. The package, in its own order: section 1 (verdict and evidence
   weight), then sections 6–10 and 15 in full; sections 5, 11–13 and the
   appendices as each ruling needs. Carry its grades: nothing is above
   Pattern, and anything about v2 in use is Hypothesis — one owner, one
   exposed project, eight days.
3. v2 as it stands: `<lab>/next-v2/README.md`, `AGENTS.md`,
   `CHANGELOG.md` (V2-HONE's "Existing installations" note),
   `verbs/*.md`, `<lab>/next-v2/project/profile.md`,
   `<lab>/next-v2/project/items/_schema.md` (the item schema; the
   installed ledger has no copy of its own), and what
   `<lab>/next-v2/tools/check.mjs` and `<lab>/next-v2/tools/ledger.mjs`
   check. The cost baseline is `<lab>/findings/2026-09-13-v2-hone.md` →
   "Cost and validation record": contract 377 words, close verb 263,
   plan verb 325, tools 528 lines.
4. The lab items `V2-FIELD-1`, `R2-PROTO`, `R2-SUPERIORITY`,
   `R3-MIGRATION` and `V2-ICEBOX`, and the two owner captures at the end
   of `<lab>/selfhost/project/wish-list.md` — read budgets and long-term
   storage; the kick-off brief against the compact chat brief. Both bear
   directly on v3's read set.
5. Record both checkouts' HEAD and status. Keep the package's
   recommendations apart from decisions the lab has already recorded.

## The work, in order

### 1. Open the item

Run the installed plan verb (`<lab>/selfhost/verbs/plan.md`) as written:
it reads the whole backlog and the trajectory's last phase, states a
direction and generates the view. Propose one phase holding one item,
`V3-SPEC` — "Specify pm-next v3 from the V2 field study" — with an item
file to the schema above. On the maintainer's word, record the phase as
the next free `PLAN-N` entry, whose `**Items:**` line lists `V3-SPEC`.
The plan entry carries its `PLAN-N` ID; every ruling, other entry and
commit below carries `V3-SPEC`.

### 2. Take the maintainer's rulings

Walk the package in section 15's order: V2-FIELD-1's option; D1; D4, D6
and D5, each separately; D7; D2; D3; D8; the R2 wording; the v2-side
retirements; then the icebox rows and the migration must-carry list. For
each, in a few lines: the question; the options, including *do nothing*;
the evidence for and against, with its grade; the recurring cost; the
package's recommendation and confidence; the acceptance test and what
would reverse it. You may offer the package's recommendations as a
default slate for the maintainer to take whole or amend item by item.
Each ruling is one of *adopt, amend, test, defer, reject*, with any
parameter still open (a cap, a window) named as open.

Two rulings need particular care:

- **V2-FIELD-1.** The package designs it as a trial of v2. Moving it to
  v3 is a prospective amendment the maintainer must approve in full:
  treatment and version, clock origin, the control read, which criteria
  are kept, and the external accessibility audit the item names.
  Evidence from v2 is never relabelled as v3 evidence. Unanswered
  choices block the trial's readiness, not the specification. The
  pre-registration is drafted into the item and signed only by the
  maintainer.
- **The R2 wording** allows parity ("at least as well, at no more
  words"), while the gate says the prototype *beats* the incumbent. If
  the maintainer adopts it as `R2-SUPERIORITY`'s blocker line, record in
  the maintainer's words how it bears on superiority. It neither passes
  the gate nor replaces the gate's same-suite and real-use requirements
  by implication.

Before writing any specification, **read the complete ruling table back
to the maintainer** and take the maintainer's corrections. Then record
each ruling as its own entry in `<lab>/selfhost/project/decisions.md`,
newest first, in the installed grammar:
`## YYYY-MM-DD — V3-SPEC — <decision name>`, a `**Decision:**` line, a
`**Rationale:**` line citing the package (by its pinned URL), the
finding and study it rests on and the acceptance test, and
`**Supersedes:** none` or an exact earlier heading. A deferral is also a
line (rule 5). Edits to the existing items above happen only on the
maintainer's word and keep their inherited obligations.

**Canon matters are not this session's.** The canon halves of D7 and D8,
the five canon triage candidates (among them HARVEST-SCAN-GAPS) and the
two canon retirements go into a handoff list in your closing report,
each with its destination (canon's decision log, wish-list or a ticket).
If the maintainer rules on any here, write those words into that list;
never edit `<canon>`.

### 3. Specify v3

Write `<lab>/next-v3/SPEC.md`, marked **DRAFT**, in the shape below.
Every change names the files it touches in v2's layout, the ruling it
rests on (decision heading), the finding and grade behind it, its cost
and its acceptance test with a window and a threshold. Separate
recurring costs (words read, lines written at every session) from
one-off costs (migration, tool maintenance), and mark estimates as
estimates.

**Only rulings shape the specification.** A change appears in sections 3
to 9 only if the maintainer adopted, amended or chose to test it; a
rejected or deferred option appears only in the dispositions and
deferrals. A "test" stays a test and an option stays an option — for
example, D5's `Checked:` line is optional at a close that had a
second-model check, never a mandatory review at every close.

### 4. Review

Run the Codex steps below and dispose of every point.

### 5. Close

As below. The specification stays DRAFT. If the maintainer approves it,
record the maintainer's exact words and the date under its status; the
DRAFT marker is the maintainer's to remove, and approval alone does not
close the item.

## The specification — required shape

1. **Status and basis** — DRAFT; the maintainer's approval, if given, in
   the maintainer's words; the rulings (headings) it rests on; a
   traceability table from each requirement to its ruling and finding.
2. **What v3 keeps** — the behaviours the package found load-bearing
   (its section 6): permanent IDs, deferrals as structured lines, named
   supersession, the verbatim archive step, the mechanical close, the
   plan verb, a small contract — and v2's owner scope, unless a ruling
   changes it: minimal core plus a knowledge layer, an owner-signed
   profile with cited digests, generated human views, zero runtime
   dependencies, and the twelve-rule budget with retire-or-evidence.
3. **Changes** — one subsection per adopted, amended or tested ruling.
4. **Records and the read set** — each file's authority, grammar,
   budget, read timing, references and archive behaviour; v3's rule 1
   file by file (purpose, when read, budget, what the checker counts).
   Rest it on S5 and S6 — whole-record recall is at the ceiling; the
   mandatory read is where substrates separate; because neither the
   trajectory nor the wish-list is in rule 1, decision entries carry
   recall — on D1 and D3 as ruled, and on the maintainer's two wish-list
   captures, which stay open design questions unless the maintainer
   rules them.
5. **Intake and authority**, as ruled — sourced fields and marked
   guesses; delegated against reviewed signatures; migration-only
   constraints and their expiry; protected paths; how standards are
   adopted.
6. **Working lifecycle and enforcement**, as ruled — plan, close,
   recall, the second-model check, writers and staging, push and
   network; for each, what a tool checks, what needs judgement, and what
   only the actual client's behaviour can show. V2-HONE's hardening and
   V2-SELFHOST's source-retention boundaries stay.
7. **The obligation budget** — the twelve rules before and after, each
   addition paired with its retirement or its evidence; and the
   obligations that hide outside the numbered rules — in verbs,
   templates, mandatory reading and maintenance — against V2-HONE's cost
   baseline. Minimality is measured, not claimed.
8. **Migration from v2**, as ruled — one row per installed project
   (Video Pedagogy, Derry Lane, Pattern Mapper, Storage Tidy, Marketing
   Skills, Personal Finance, eBay Tool), with the lab's self-host
   separate. Each row is a filed snapshot, labelled with its source
   revision and cut-off and its unknowns — not a verified current
   installation: version, populated memory, local tool and verb edits,
   settings, authority boundaries, open promises; then reviewed
   mappings, preservation evidence, the upgrade in a commit of its own
   if ruled, retired files deleted, and a rollback that keeps later
   work. This is design, not permission to migrate; R3's must-carry list
   (from S7) is recorded as input to R3, which stays gated. If time is
   short, the rows can follow in a later session.
9. **Evaluation**, as ruled — V2-FIELD-1 with its treatment, clock
   origin and control read; its day-14 and day-42 probes; the
   mandatory-read recall criterion with the whole record as control; the
   reading bound; the promise trace and the other registered criteria.
   If D3 is to be tested, the shortened read is probed against the
   unchanged read on the same record. If the R2 field form is adopted:
   its matched comparator (±14 days, within a factor of two in commits,
   chosen before scoring), its 60-commit floor and its inconclusive
   outcomes.
10. **Retirements, deferrals and the icebox** — each with its trigger;
    deferrals as lines. A fired icebox trigger justifies a look, not a
    wholesale restoration.
11. **What v3 does not claim** — the evidence limits in the package's
    grades; no superiority (R2 has not passed); nothing about code
    quality.
12. **Build order** — a proposed next phase of items with IDs, for the
    maintainer to start later. Nothing is built in this session.
13. **Open questions for the maintainer, and the Codex dispositions** —
    including every substantive disagreement left open for the
    maintainer.

## Codex as second witness

```sh
codex exec -m gpt-6-astra -s read-only --skip-git-repo-check --color never \
  -C ~/CascadeProjects/PM-Skills-lab -o <out> "<instruction>" < <brief>
```

Read-only, without search. Settle each disagreement by returning to the
evidence, never by majority. A substantive disagreement you cannot
settle stays open for the maintainer; only the mechanical fixes after
the last round are yours alone.

- **Independent design pass** (optional, time permitting) — after the
  rulings are recorded and before you draft. Write and seal your own
  outline first (time and SHA-256); then give Codex the same ruling
  entries and the same sources, and ask for its own file-level changes,
  read set, obligation budget and migration outline. Both designs see
  the package's recommendations; the comparison is between two designs
  made without sight of each other, not blind to the evidence.
- **Draft review** — the brief carries the draft and the same paths, and
  asks whether every requirement traces to a ruling and a finding,
  whether any rejected, deferred or tested option was written in as a
  requirement, whether the obligation budget holds, and whether each
  cost is priced and each acceptance test falsifiable; verdict *ready
  for the maintainer*, *ready after fixes* or *not ready*. One follow-up
  round to verify the fixes.
- If the maintainer wants a second view on a single ruling before
  deciding, run Codex on that ruling alone.
- **Evidence handling** (`<lab>/RAW-EVIDENCE.md`): briefs, replies and
  runner logs go to `<lab>/raw-evidence/v3-spec-<date>/` (gitignored).
  The tracked manifest — filename, size, SHA-256 and one line of
  description per file — goes in the `V3-SPEC` item file; the
  dispositions go in the specification. Before committing, scan the
  staged set for absolute paths, session identifiers and
  credential-shaped strings, and read the diff once for private content.
  If Codex cannot run, say so and carry on.

## How this goes wrong

- **Recommendations become decisions** — fluent drafting turns a "test"
  or an option into mandatory v3 behaviour, or a recommendation into a
  ruling the maintainer never gave.
- **Minimality becomes cosmetic** — twelve numbered rules hide growing
  files, procedures and mandatory reading.
- **The evaluation shifts under the claim** — a changed treatment, a
  retrospective registration, or a parity result presented as
  superiority.
- **It claims too much** — one owner, one exposed v2 project, eight days.
- **It quotes** a consuming project's record, or names a person.
- **It writes where it must not** — `<canon>`, `<lab>/next-v2/`, or a
  frozen tree — or starts a second task inside this one.
- **It reads the wrong copy** — the lab's `self/` has no package.

## Close

Follow the installed close verb (`<lab>/selfhost/verbs/close.md`) as
written:

- **Record**: every ruling as a decision entry; deferrals captured once
  as lines; the evidence manifest in the item file. Unless the item's
  acceptance criteria are met, `V3-SPEC` stays open with a `[!]` line
  naming what the maintainer still has to give, and its phase stays
  open. If the item does close, it takes its trajectory line, and
  closing the phase's only item is a phase close (rule 11): reconcile
  against the `PLAN-N` item list, mark the phase CLOSED with its date,
  name the next item and reason or record that owner direction is
  needed, run `<lab>/selfhost/verbs/recall.md` and store its labelled
  result. Build items go to `## Next` only on the maintainer's word.
- **Check**, from the lab repository root: `npm run check` and
  `npm run check:lab`, then `node lab/selfhost/tools/check.mjs`. Fix
  warnings or link one existing follow-up; above 45 live decisions, run
  the archive step as the close verb describes.
- **Commit**: `node lab/selfhost/tools/view.mjs`; commit only this
  item's files as `V3-SPEC: …` with a `Verify:` line naming the gate
  result and the harness; then
  `node lab/selfhost/tools/check.mjs --commit HEAD`.
- **No push**: report the pending push to the maintainer.
- **Report**: the rulings, the specification's status, the canon handoff
  list, the open questions and disagreements, and the next step.

## Provenance

Written 2026-09-24, after the V2 field study was filed (canon
`db31036`). Codex Astra acted as second witness twice while this prompt
was made: a blind design opinion (965 words) that agreed on the
decisions-first, lab-only shape and added the read-back, the hidden
obligation budget, per-project migration rows, a pinned trial treatment
and the R2 parity caveat; then a review of the draft (743 words, "ready
after fixes"), whose ten points were all adopted — among them the
bounded rule-2 exception, the installed close and phase-close steps, the
evidence manifest, conditional specification sections and a
priority-ordered timebox. Working files:
`~/scratch/pm-v3-prompt/2026-09-24/`.
