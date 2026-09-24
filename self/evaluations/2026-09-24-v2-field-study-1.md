# V2 field study — decision package, run 1

- **Date:** 2026-09-24. **Instrument:** `self/V2-FIELD-STUDY.md` at
  canon `d1f92f3`. **Object:** pm-next v2 at lab `ec9aa81` (no change
  under `lab/next-v2/` since `fa9c7a9`). **Corpus:** the field-report
  tier as filed by `FIELD-HARVEST-RUN-1` (`e64c3f8`).
- **Run by** Claude Opus 5.5; **second witness** Codex
  (`gpt-6-astra`, read-only) at Checkpoints A, B and C and as the
  first scorer on S1 and S5; **for** the decision session (Claude
  Fable, with the maintainer present).
- **Reflection run three** (`self/REFLECTION.md` → "Run log"),
  triggered by maintainer call.
- **This package decides nothing.** It proposes; the maintainer
  decides; the decision session records. Nothing in the lab or in
  canon's distributed tree was changed.

Read the verdict and evidence weight first and the decision table
eighth. Every number traces to a study table (section 5 and Appendix
B), a stated denominator, and a source anchored by path and SHA-256
(Appendix D). The local lane is cited by path only: no line of any
project's record, prompt or session is reproduced, and owner wording
is paraphrased.

## 1. Verdict and evidence weight

**The maintainer's question** was what analysis of project history can
help refine the versions of pm-skills after the lab's v2. The answer
this run gives: four analyses pay now, and this package runs them.

1. **Crossing fidelity.** What an intake carries across, and where it
   puts it (S1).
2. **Promise tracing over months.** Where commitments are lost, and in
   what kind of event (S4).
3. **Fresh-reader recall on real records.** Recall is measured twice:
   on the whole record, and on only the reading each contract makes
   mandatory (S5 with S6).
4. **A census of what projects write into their rulebooks,** mapped
   onto v2's slots (S7).

Three more describe the owner's practice, which v2 must fit: the one
exposed week (S2), handoff and concurrency (S3), and what the owner
actually asks for (S8). None of these can yet say whether v2 works
better than canon in use. **Only one v2 project has been used, for
eight days.**

**What the evidence says.**

- **v2 is right, on this evidence, about:**
  - crossings that lose almost nothing outright;
  - a mechanical close that held on every commit of the exposed week;
  - deferrals kept as structured lines, and named supersession;
  - an archive step that actually fires;
  - dropping the ceremony canon deployments carried with almost no trace
    of use;
  - a much smaller contract.

  See section 6.
- **Where v2 does not yet match how the owner works** (six findings,
  section 7):
  - project rules have no home in v2's record, so every intake
    improvised one (V2F-1);
  - the intake ran without the owner the verb assumes (V2F-2);
  - decisions became the dominant hot read within a week (V2F-3);
  - the owner works with several writers and agent-dispatched
    second-model checks, and has agents push from inside the session
    (V2F-4);
  - promises are lost in maintenance events, in canon and v0.2 alike
    (V2F-5);
  - the upgrade note has two gaps (V2F-6).
- **Recall** on whole records is at the ceiling for every substrate:
  0.90–1.00 of the points by class, scored three ways and adjudicated.
  So whole-record recall cannot rank substrates. On only the mandatory
  read, v2's rule-1 read answered 7.0 of 8 at a median 6,078 words,
  against canon 4.x's 6.7 at 12,893 and v0.2's 2 — though mostly on
  intake-day records (S5). That arm is where V2-FIELD-1 and the reshaped
  R2 should be measured.
- **Eight design decisions** are handed over (section 8). Most are
  small, bounded changes with a lighter alternative and a do-nothing
  option. Ahead of them sits the choice of how to run V2-FIELD-1
  (section 10), since nothing else lifts the one-week cap on v2
  evidence. The R2 candidate is reshaped into a falsifiable form
  (section 9). Retirements are
  named on both sides:
  - v2: the profile's auto-memory claim, and the README's "never as
    chat";
  - canon: the design review gate, and lite close.

**Evidence weight.**

- **The population.** Twenty-two consuming projects and the lab's own
  v2 ledger. Evidence runs from 2025-10-16 to the harvest cut-off
  (2026-09-24T11:40Z).
  - **One builder**, the maintainer, built every project.
  - **Harnesses:** Claude Code and Codex, and Windsurf before July.
  - **Substrates at the latest filed HEAD:**
    - seven pm-next v2 installs, plus the lab;
    - one pm-next v0.2;
    - three canon 4.x;
    - six canon 2.x–3.x, plus Route Plotter's earlier 2.3.0 line;
    - three unversioned;
    - two with no framework.
- **What the population cannot show:**
  - how anyone but the owner would fare;
  - v2 beyond one week, in any project but one;
  - any causal benefit;
  - v2 against a bare arm (there is none).

  No claim is made about code quality.
- **Grades.** Every grade is capped by independence. The ceiling here
  is Pattern: every project is one person's, and the six intakes of
  2026-09-16 are one witness. Anything specific to v2's rules in use
  is Hypothesis, because it rests on one project.

**Integrity statement.**

- **Read-only posture.** Both checkouts ended where they started — canon
  `d1f92f3` and lab `ec9aa81`, both clean when re-recorded at 21:20Z —
  and the tier's 470 files hash identically, with none added (section
  3). Nothing was written into `self/` or the lab before that
  comparison.
- **No local-lane quotation.** No line of any project's record, prompt
  or session appears here, and owner wording is paraphrased. Every draft
  was scanned with the harvest's credential patterns before it left
  scratch.
- **Order of work.** Rubrics and both prediction registers were sealed
  before any score or count was written. Codex scored S1 and S5 first,
  from inlined material with no path, and its scores were sealed before
  the run's.
- **Judged measures were double-scored blind,** S1 and S5 three ways.
  Every disagreement was adjudicated by re-reading, and the reasons are
  in Appendix C.
- **Declared deviations:**
  1. The blind scorers and the S5 readers were fresh sub-agents allowed
     one file read each, because the standalone CLI's login had expired.
     An audit of every tool call shows each read only its own file
     (C.1) — which establishes what each could open, not that it read
     every line, and each inherited this repository's standing session
     context.
  2. The S5 blind pass ran alongside the run's own S5 pass rather than
     after it. Both came after Codex's sealed scores, and neither could
     see the other.
  3. The run's own passes were made by the run's sub-agents, working to
     the frozen rubrics and with tool access. They were never meant to
     be blind.

## 2. Corpus, exposure, coverage and method

### The population

Twenty-two project directories in `self/field-reports/` as filed by
the harvest of 2026-09-24 (`e64c3f8`), plus the lab's own v2 ledger
(`<lab>/selfhost/project/`) as an eighth v2 record. Evidence spans
2025-10-16 (the Route Plotter v2 line's first commit) to the capture
cut-off `2026-09-24T11:40Z`. **One person built every project.** Two
harnesses (Claude Code, Codex) and, before July, Windsurf, all driven
by that person. Substrates at the latest filed HEAD:

| Class | Projects (latest filed HEAD) |
| --- | --- |
| pm-next v2 | Video Pedagogy (`23af797`), Derry Lane (`665f36b`), Pattern Mapper (`24c9e93`), Storage Tidy (`267e031`), Marketing Skills (`889b65f`), Personal Finance (`602e28a`), eBay Tool (`f800a63`); the lab self-host (`ec9aa81`) |
| pm-next v0.2 | vinyl-sorting (`06f6c90`) |
| canon 4.x | Digital Art Audience Hub 4.6.0 (`fc4df64`), Route Plotter v3 4.7.0 (`989f11d`), the Video Helper (`uon-video-helper`) 4.9.2 (`c346581`) |
| canon 2.x–3.x | Windsurf AI 2.2.1, Artwork Form Filler 2.2.1, Corporate Image Generator 2.2.0, the client app 2.4.0, the client site 3.1.1, Laurillard 3.1.1; Route Plotter's v2 line 2.3.0 |
| unversioned (pre-1.0.0 tree) | Dot Crowd Navigator, Dot Matrix Tool, Resolve Scripting Windsurf |
| none (pre-adoption baseline only) | ADHD Research, Parenting Research |

Two client projects appear here as the client app and the client site;
their tier directories are named only in Appendix D's source anchors.

The corpus ledger (one row per project and filed HEAD, with lane,
join key, how the version was reached, kinds present, horizon,
harnesses and the witness) is in Appendix B.1. No project holds a
`case-study`, `session-close` or `incident` report.

### Independence, stated before any analysis

- Every project is the maintainer's. The tier can show that a rule was
  skipped or a verb went unused; it cannot show that a stranger would
  fail to learn either.
- **The six v2 intakes of 2026-09-16 are one witness for how intake
  behaves**: six `gpt-6-astra` Codex threads opened 09:06:56–09:07:51
  UTC from the canon checkout, each launched by a prompt built from
  one template (target, preparation package, pinned source `c6d8198`,
  an instruction not to stop for interactive approval, advance
  approval of profile and brief) out of one preparation run whose
  packages are not in the tier.
  The prompts are tailored per project (565–623 words; 2–6 % shared
  six-word sequences). Storage Tidy's intake was separate and earlier
  (08:35 UTC). They are six witnesses for how the projects differ.
- Route Plotter, the Video Helper and vinyl filed twice are the same
  projects a month on — longitudinal, not new witnesses. The
  Codex-made `-codex` exports of 2026-08-27 are a second harvesting
  witness of the same HEADs.

### Exposure (the denominator most rates need)

| v2 record | Commits after the intake | Sessions after the intake (all stores) | Days of use |
| --- | ---: | ---: | ---: |
| Video Pedagogy | 73 | 401 (48 Claude Code, 339 Codex interactive, 14 other) | 8 |
| Derry, Pattern Mapper, eBay, Marketing, Personal Finance | 0 | 0 | 0 |
| Storage Tidy | not filed after 2026-09-16 | 0 attributed | 0 |
| lab self-host | 1 (a two-line wish capture) | — | — |

**Five of the seven v2 installs show no commit and no session between
their intake and the harvest cut-off; Storage Tidy has no filed
evidence after its intake — absent, not zero.** v2's first week in the
field is one project. The other projects'
exposure (commits, sessions, days since install, uncommitted memory at
the last harvest) is in Appendix B.2; the longest records are the Hub
(154 commits in all, 136 since its install; 102 sessions; 2026-02 to
08-17), Pattern Mapper (217 commits, 216 since its canon install; 141
sessions) and vinyl (v0.2; 283 commits, 282 since install; 418
sessions).

### Pinned sources and cut-offs

Canon `d1f92f3` (the instrument's commit; the tier as of `e64c3f8`),
lab `ec9aa81` (no change under `lab/next-v2/` since `fa9c7a9`, before
every intake). Every tier file read is anchored by SHA-256 (470 files
hashed at the start; Appendix D). Session logs were read only by
targeted grep for a named question; no rollout line appears here.

### Read order used, and where reading stopped

Tiers 1–7 of the evidence map were read for every project, as each
study required.
Tier 8 (session archives) was read for named questions only: the
seven intake threads (what they asked the owner), handoff episodes
(S3), and the prompt census (S8, from the prompts exports, not the
archives). Tier 9 (bundles) was cloned to scratch where a record at a
commit was needed (S1 baselines, S4 draw points, S5 records, S9
upgrade trees). Not read: session logs beyond those questions; the
Windsurf stores (opaque, unattributed); the v2 intakes' preparation
packages (outside the tier — a gap, section 13).

### Coverage matrix

Projects × studies. **E** examined; **A** absent (the evidence does not
exist in the tier); **U** unexamined (it exists; the budget did not
reach it); — not applicable by the study's own scope.

| Project | S1 | S2 | S3 | S4 | S5 | S6 | S7 | S8 | S9 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Video Pedagogy | E | E | E | E (censored) | E ×3 | E | — | E | E (copies) |
| Derry Lane | E | A (no use) | U | E | E ×2 | E | E | E | E |
| Pattern Mapper | E | A (no use) | U | E | E ×2 | E | E | E | E |
| Storage Tidy | E | A (not filed) | U | U | E ×2 | E | — | U (no prompts export) | E |
| Marketing Skills | E | A (no use) | — | — | E ×2 | E | — | E | E (copies) |
| Personal Finance | E | A (no use) | — | — | E ×2 | E | — | E | E (copies) |
| eBay Tool | E | A (no use) | U | U | E ×2 | E | — | E | E |
| lab self-host | — | E (trivial) | — | — | E | E | — | — | — |
| vinyl-sorting | — | — | E | E | E ×2 | E | — | E | — |
| Digital Art Audience Hub | — | — | U | E | E | E | E | E | E |
| Route Plotter (+ v2 line) | E (port) | — | E | E | E ×3 | E | E | E | E |
| Video Helper (`uon-video-helper`) | — | — | U | E | E ×2 | E | E | E | E (reinstall) |
| Dot Matrix Tool | — | — | — | E | E | E | E | E | — |
| Windsurf AI | — | — | — | U | E | E | E | E | E |
| Artwork, Corporate, the client app, the client site, Laurillard | — | — | — | U | E | E | E | E | — |
| Dot Crowd, Resolve | — | — | — | U | E | E | E | E | — |
| ADHD, Parenting | — | — | — | — | E | E | — | E | — |

### Which of `self/FIELD-STUDY.md`'s D1–D12 each study covers

S1 → D1 (arrival) with D6/D7 in part; S2 → D2, D5; S3 → D4/D10 in part;
S4 → D6; S5 → new (retrievability), D6/D11 in part; S6 → D9; S7 → D7,
D3 in part; S8 → D2/D3/D4 in part; S9 → D8, D1 in part; the ledger →
D12. **Not covered:** D10 incidents beyond S3/S4, D11 outcome (shipping)
— the field grading of 2026-09-11 settled the bounded claim.

### Method, in one paragraph

Counts are mechanical from the exports and git logs (the run's scripts
stay in its scratch directory; each table states its counting rule).
Judged measures (S1 J1/J2, S3 episode class, S4
fulfilment, S5 recall, S8 intents) were scored by the run and by a
blind second pass (one fresh session per cell, given only the rubric
and the cell); S1 and S5 had Codex as a third scorer, run first with
the material inlined and no path, sealed before the run's own scores
were written. **Deviation, declared:** the standalone `claude` CLI's
login had expired, so the blind second pass and the S5 readers ran as
fresh Claude sub-agents rather than `claude -p --tools ""` sessions.
Each was allowed exactly one action — reading its one cell or packet
file — and every tool call each one made was audited afterwards from
its transcript: each read only its own file (Appendix C.1). They did
receive the canon repository's standing session context. Rubrics were
frozen and sealed
before the first score (Appendix A).

## 3. Read-only result

| Checkout | Start (2026-09-24T16:13Z) | End (Phase 6) | Status start → end |
| --- | --- | --- | --- |
| canon | `d1f92f345753e89b087e219b51acd68315aba2a7` (VERSION 4.21.1) | `d1f92f345753e89b087e219b51acd68315aba2a7` (unchanged; VERSION 4.21.1) | clean → clean |
| lab | `ec9aa81dfacbb0c92a5179e42332255101d92fb8` | `ec9aa81dfacbb0c92a5179e42332255101d92fb8` (unchanged) | clean → clean |
| the tier (`self/field-reports/`, 470 files hashed) | manifest SHA-256 `c42439f528e1bfe285cd877ef1837da31308d13e74b3723f0d44f9628dcd823d` | manifest SHA-256 `c42439f528e1bfe285cd877ef1837da31308d13e74b3723f0d44f9628dcd823d` (re-hashed 2026-09-24T21:20Z) | identical — 470 files, none added or removed |

Every output of the run was written under the scratch run directory
(`~/scratch/pm-v2-study/2026-09-24`); nothing was written into `self/`
or the lab until the Phase 6 filing below. Git ran only as
`git --no-optional-locks` against both checkouts; ordinary Git ran only
in scratch clones of the filed bundles. Archives were extracted only
into scratch, with `--exclude '._*'`.

**Commands not run, and why.**

- Nothing in any consuming project's own checkout — out of bounds; the
  filed copies were the evidence.
- v2's `check.mjs`, `view.mjs` and `harness.mjs` — not run, in the lab
  or on any record. The lab is read by exception and never written, and
  the validator figures used (S2, S6) are the harvest's filed runs.
- `npm run check` — not run during the analysis; it runs once at the
  Phase 6 close, as the close step.
- `claude -p --tools ""` for the blind scorers and the S5 readers —
  attempted; the standalone CLI's stored login had expired, and signing
  in is the maintainer's to do. Replaced by fresh sub-agents allowed one
  file read each (section 2, "Method"; Appendix C.1).
- No `git fetch`, `pull` or `push` anywhere during the run; no web
  access; every Codex call was `codex exec -m gpt-6-astra -s read-only`
  without search.
- The Windsurf stores were not extracted (opaque and unattributed); the
  session archives were queried by program for named questions only.

## 4. Staleness register

Every observation is dated twice: canon observations against
`pm_skills/CHANGELOG.md` to 4.21.1 and the field-study-2 addendum
(2026-08-28); v2 observations against the lab log from `c6d8198`.

### v2 side — every observation is against the current branch

The six 2026-09-16 intakes pinned `c6d8198`; Storage Tidy's intake used
the same branch state. The lab has one commit after `c6d8198`
(`ec9aa81`, 2026-09-16, a two-line wish capture in the lab's own
ledger); nothing under `lab/next-v2/` has changed since `fa9c7a9`
(V2-HONE, 2026-09-14), which predates every intake. **Every v2
observation here is live.** One qualification: Video Pedagogy changed
its own copy during its week (the validator, the harness generator,
the close verb's step 6 and `structure.mjs`; S9), so its push and
network observations are against the locally amended copy and say so.

### Canon side — releases since each deployment's version

| Deployment (version) | Releases since | Those that change what these studies measure |
| --- | --- | --- |
| unversioned trees (Dot Crowd, Dot Matrix, Resolve; the Hub and Route Plotter's v2 line at install) | all, 1.0.0 → 4.21.1 | everything; read against the earliest CHANGELOG entry |
| 2.2.0–2.4.0 (Corporate, Windsurf AI, Artwork, the client app; Route Plotter's v2 line at 2.3.0) | ≈ 60 | 3.x read tiers; the 4.0.0 distribution boundary (templates moved); records mode 4.8.0; budgets 4.18.0 / 4.20.0; DEFERRAL-LINE 4.21.1 |
| 3.1.1 (the client site, Laurillard) | ≈ 45 | as above, from 3.2 |
| 4.0.0 (Pattern Mapper, before its intake) | 4.1.0–4.21.1 | 4.6.0 / 4.7.0 parallel work; 4.8.0 records mode; 4.9.0 re-assess; 4.10.0 archive retention; 4.11.0 field reports; 4.12.0 run the whole backlog; 4.13.0 reinstall path; 4.15.0 findings; 4.16.0 improvement waves; 4.17.0 / 4.17.1 cloud-sync claim retired; 4.18.0 budgets re-derived, rulebooks in the validator; 4.20.0 budgets raised; 4.20.1 reads due before the first change; 4.21.0 harness-surface security item; 4.21.1 deferral line and the Codex network note |
| 4.6.0 (the Hub, Derry before its intake) | 4.7.0–4.21.1 | as above, from 4.7.0 |
| 4.7.0 (Route Plotter v3) | 4.7.1–4.21.1 | as above, from 4.8.0 |
| 4.9.2 (the Video Helper) | 4.10.0–4.21.1 | as above, from 4.10.0 |

No canon deployment in the tier has taken any release after 4.9.2, so
nothing shipped from 4.10.0 on has field evidence of its effect.

### The field-study-2 addendum (2026-08-28) — not revived

| Item | Addendum outcome | Consequence here |
| --- | --- | --- |
| FS2-02: shrink `review.md` into an entry point for `findings.md` | withdrawn — run-acceptance is a distinct function | not proposed |
| FS2-05: a session-checkpoint candidate | withdrawn — end-of-task already ships lite and secondary-session closes | not re-proposed; lite close appears only as a retirement candidate (no trailer anywhere, S7) |
| "Dispatch substitute: hand coordination" | corrected — hand coordination is the shipped advisory-claim protocol | owner coordination is not counted as a substitute (S3) |
| FS2-04: rulebook remedy | reshaped to a completeness fix; shipped 4.18.0 | fixed |
| FS2-03: word budgets | shipped 4.18.0, raised 4.20.0 | changed shape |
| FS2-06: the cloud-sync "unsupported" claim | retired 4.17.0, swept 4.17.1 | fixed |
| FS2-01: upgrades never walked | a watch; 4.13.0 reinstall path | corrected by this study's evidence (below) |
| The validator natural experiment | one notch weaker: a shorter response window, not prevented overshoot | carried in the weaker form |

### Observations dropped or reclassified by the dating pass

| Observation (study) | Changed by | Class | Consequence here |
| --- | --- | --- | --- |
| v2's upgrade path is "re-copy the folder and read the changelog" (S9; the icebox's wording) | lab `fa9c7a9` (V2-HONE, 2026-09-14), "Existing installations": compare the diff with the installed copy, replace tools and verbs as a reviewed set, merge the contract deliberately, keep populated records | **stale** — superseded before any intake (Checkpoint B) | V2F-6 reshaped to what the note does not say; severity Low |
| Canon has no safe reinstall path (S9: Route Plotter v3 dropped its contract merge, 08-17) | canon 4.13.0 (2026-08-27) | **changed shape** — the failure predates the remedy | history, not a live canon gap |
| The Hub's records-adoption tooling gaps (S4, S9) | canon 4.8.0 (2026-08-17) | **fixed** | not carried |
| Canon has no deferral cross-check (S4) | canon 4.21.1 (2026-09-14) | **changed shape** — the rule exists; no deployment has taken it | canon disappearances are dated pre-4.21.1; D7's canon half becomes a checker aid |
| Prefix rules read as network isolation for Codex (S3) | canon 4.21.1 Codex network note | **fixed** in canon's wording | V2F-4 rests on hosted-tool calls, not prefix rules |
| "Nobody walks the upgrade procedure" (the tier's working belief) | this study's S9 count: 11 walks, all but one dated 07-17 or earlier | **corrected by evidence** | S9 states the correction |

## 5. Study results S1–S9

Per project, never pooled across substrates; every rate with its
denominator and counting rule; judged cells with their agreement
and adjudication (Appendix C). Grades are capped by independence
throughout: one owner; the six same-morning intakes are one
witness; one exposed v2 project.

### S1 — Intake fidelity: did the record survive the crossing?

Eight crossings censused in full (no sampling was needed): the seven
v2 intakes and the one canon-to-canon port (Route Plotter's v2 line
into v3). Obligation units are sentences or list lines in the
baseline's in-force surfaces stating a constraint, commitment, open
item, blocker or approval boundary (frozen rubric, Appendix A), classed
against the record the crossing wrote. Per-crossing summaries: B.6.

| Crossing (baseline → after) | Units raw / dedup | Active | Merged | Retained-only | Unresolved | Omitted |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Video Pedagogy (none → v2) | 214 / 145 | 84.1 % | 3.4 % | 6.9 % | 4.1 % | 1.4 % |
| Marketing Skills (none → v2) | 69 / 56 | 62.5 % | 25.0 % | 10.7 % | 1.8 % | 0 |
| Personal Finance (none → v2) | 200 / 117 | 77.8 % | 8.5 % | 10.3 % | 1.7 % | 1.7 % |
| Pattern Mapper (canon 4.0.0 → v2) | 1,115 / 942 | 59.8 % | 11.8 % | 27.3 % | 1.2 % | 0 |
| Derry Lane (canon 4.6.0 → v2) | 316 / 240 | 55.4 % | 11.7 % | 31.2 % | 1.2 % | 0.4 % |
| eBay Tool (v0.2 → v2) | 231 / 203 | 83.3 % | 4.9 % | 11.8 % | 0 | 0 |
| Storage Tidy (v0.2 → v2) | 366 / 254 | 80.7 % | 3.5 % | 15.0 % | 0.4 % | 0.4 % |
| Route Plotter port (canon 2.3.0 → 4.7.0) | 302 / 221 | 92.3 % | 1.8 % | 1.4 % | 4.5 % | 0 |

Percentages are of deduplicated obligations. Omitted items came only
from sources the intakes could not read (the harness's own memory, chat
prompts).

- **Almost nothing was lost outright (0–1.7 % omitted, all from sources
  the intakes could not read), and almost everything that survives in
  force does so by pointer.** Every intake archived the old installation
  byte for byte. But the obligations counted "active" mostly survive
  because the new record declares *unchanged pre-v2 files* in force, not
  because the ledger restates them: without pointer carriage, active
  falls to 12.5 % (Marketing), 31.6 % (Personal Finance), 36.1 %
  (Pattern Mapper, narrow reading), 38.8 % (Derry, without the retained
  contract); in Video Pedagogy, 69 of 122 active obligations have no
  carrier in the new ledger.
- **Every intake had to invent a home for project rules.** None of the
  v2 schema's files holds them, so each intake wrote one outside it —
  Pattern Mapper `project/rules.md` (27,926 bytes) and `authority.md`;
  Derry `DEVELOPMENT-AUTHORITY.md` and a retained contract "still in
  force"; eBay and Storage Tidy `project/project-rules.md`; Video
  Pedagogy `context/research-contract.md` (the old `CLAUDE.md`, byte
  for byte); Marketing and Personal Finance pointers to their policy,
  method and research-backlog files — and **five of seven amended or
  extended rule 1** to make those files mandatory reads. The validator's
  read estimate does not see them (S6).
- **Approval boundaries** (deduplicated) survived in force at high
  rates where counted separately: Derry 22 of 24, Video Pedagogy 9 of
  10, eBay 10 of 12 (2 merged), Personal Finance 3 of 3, Pattern Mapper
  32 of 64 (16 merged, 14 retained-only — mostly ticket-level owner
  calls behind pointers that declare the retained tickets binding).
- **The owner never signed.** In all seven intakes the agent wrote the
  owner's signature — six under an advance authorisation in the
  launching prompt that the record cites, Storage Tidy under a one-line
  blanket approval its thread asked for — and each record says the
  wording was not individually reviewed. The intake verb says "the owner signs".
- **Step 2 ("ask only what you cannot infer") never ran.** The six
  threads asked the owner nothing (one maintainer prompt each; the
  prompts forbade questions and pre-answered the gate, hosting, harness
  and standards from preparation packages that are outside the tier);
  Storage Tidy's thread asked once, for approval of the whole package.
  In the four censuses that count profile fields one by one (73
  fields): 33 inferred from the repository, 28 supplied by the
  launching prompt, 1 asked (Storage Tidy's approval, recorded as its
  signature), 2 guessed and marked, 9 guessed and left unmarked; the
  other three censuses group fields and show the same mix, with one
  more unmarked guess (B.8). **No content field was asked**; 10 were
  guessed and left unmarked in all (Personal Finance's runtime floor;
  Video Pedagogy's
  repository privacy; a Handoff role split letting either harness plan
  or implement, which no repository file or owner statement supports,
  in four intakes — the template leaves that split as a placeholder; the
  template's default Secrets sentence kept without a stated store; a
  Claude Code harness claim in a Codex-only project; a Push line
  contradicting the baseline).
- **Migration scope leaked into standing policy** in at least three
  intakes: Video Pedagogy's brief bans re-ratification and altered
  claims outright (instructions meant for the migration); Pattern
  Mapper's profile turns a dependency freeze scoped to the migration
  into a standing ban on adding or upgrading dependencies; Storage
  Tidy's and Derry's `Push: no`
  overrode baseline push rules without citing the owner.
- **Budgets at intake:** the brief exceeded v2's 300-word guideline in
  four of seven (eBay kept its 3,204-word brief verbatim; Storage Tidy
  2,718; Pattern Mapper 778; Video Pedagogy 349). Digests adopted with
  "rules that bite": two intakes (Video Pedagogy and Pattern Mapper,
  three each). Validator at every intake commit: 0 structural failures.

**Judged measures (three scorers, adjudicated — C.2).**

| Crossing | J1 meaning, blockers, approval boundaries | J2 profile grounded |
| --- | ---: | ---: |
| Video Pedagogy | 0 | 1 |
| Marketing Skills | 1 | 2 |
| Personal Finance | 2 | 1 |
| Pattern Mapper | 0 | 1 |
| Storage Tidy | 1 | 1 |
| Route Plotter port | 1 | 1 |
| Derry Lane | 1 | 1 |
| eBay Tool | 2 | 1 |

All three scorers agreed on 7 of 16 cells; Codex and the blind pass
agreed with each other on 13, the run with Codex on 8 and with the
blind pass on 9. Every disagreement was adjudicated by re-reading the
packet against the frozen anchors (C.2). Seven went to the run's lower
score, on retained-only, weakened or contradicted obligations the other
scorers' bases did not address. Two J1 cells went lower still, to 0,
because the frozen anchor scores 0 for any contradicted approval
boundary or for several retained-only ones ("several" read as three or
more): Video Pedagogy's new brief overrides its rule for reopening a
ratified position, and Pattern Mapper keeps 14 of its approval
boundaries only in retained tickets (Checkpoint C). Codex scored J1 2 in
six crossings and the blind pass in
seven; the recurrent difference is whether obligations reached only through a
pointer to unchanged or retained files count as in force. **Whether
pointer-carried obligations are "in the record" is the design question
S1 surfaces**, not a scoring accident.

**Grade.** The intake behaviours above rest on two independent intake
witnesses (the templated wave of six, and Storage Tidy) and one canon
port: **Pattern** for the pointer carriage, the invented rules files,
the agent-written signature and the unasked step 2; **Hypothesis** for
migration-scope leakage (three cases, all from the wave).

### S2 — The first week on v2

**Exposure.** One project. Video Pedagogy ran 73 commits and 401
sessions on v2 between its intake (2026-09-16) and its last filed HEAD
(2026-09-23). The other six installs have **no evidence**: no commit
and no attributed session after the intake. The lab self-host made one
two-line commit. Intake-written lines are excluded from every count
below (A7).

| Rule / verb | Measure (Video Pedagogy, 8 days) | Count |
| --- | --- | --- |
| 9 — `ID: summary` title | commits | 73 / 73 |
| 9 — `Verify:` line | commits (a declaration, not a gate run) | 73 / 73 |
| 10 — validator reviewed | commits whose Verify names a `check.mjs` result | 72 / 73 |
| plan verb | `PLAN-N` entries with an `**Items:**` line | 3 (PLAN-2, PLAN-3 — extended by a Supersedes entry — PLAN-4) |
| 4 — decisions | entries written | 69 (45 live + 24 archived); median 333 words, maximum 1,494 |
| 4 — Supersedes | the field on live entries / entries naming a real earlier heading, with a reason | 45 of 45 live (36 "none") / 16 of all 69 (7 of those superseded again within the week) |
| archive step | runs | 2; the first four days and 22 entries after the 45-entry trigger, held deliberately while another session's entries landed |
| 5 — deferral lines | wish-list lines carrying `(from: ID, date)` (line annotation); `**Deferred:**` fields naming IDs; prose deferrals in entries that never became a line (capture) | 68 / 68; 9 of 9; **0 of 1** — the S4 frame of the week holds one prose deferral, sent to an owner edit list in a run file, not a ledger line |
| 6 — trajectory line on finishing | items shipped with a line | 6 of 6 |
| 11 — phase close + recall | phase closes in the window | 0 → recall had no opportunity (the only `RECALL` line is the intake's local 8/8) |
| 8 — digest rule at close | decision entries on items in the areas the three adopted digests govern (hub, training, skills) that name a digest rule — a keyword proxy for "tasks that touched a standard" | ≈ 10 of 26 |
| view | `project/view.html` in a commit | 0 of 73 (the view is gitignored here) |
| budgets | profile / brief words at `23af797` | 399 / 292 (under 400 / 300) — **the owner replaced the intake's brief on day 2** (BRIEF-SERVICE) |
| rule-1 hot read | the checker's own estimate (contract, profile, brief, backlog, latest ten decisions) / the mandatory read as amended (adds `CLAUDE.md` and the project-added research contract and scope) | 6,566 / 8,655 words; the ten decisions alone 4,593 |
| local changes to v2 | files | `check.mjs` (a project invariant: the two skill mirrors must match), `harness.mjs` and `verbs/close.md` (**push opened to Claude Code sessions** on 2026-09-23, "RR-31"), `structure.mjs` (2 lines) |

The validator run by the harvest on a clean checkout of `23af797`
reports 43 warnings where the commits' own runs reported 1–2: 42 are
item files naming local-only paths under the ignored `drafts/`
directory. **An item file's sources are not in the record another
checkout receives.**

**Settles, at one project and one week (Hypothesis grade at most).**
The commit shape held on every commit (rule 9's title and `Verify:`
line), but rule 9's "commit only this item's files" did not — three
sweep commits carried another item's ledger lines (S3); rule 10's
checker result is declared on 72 of 73 commits, a declaration rather
than proof of a run or a review; rules 4 and 6 held where checkable
(Decision and Rationale lines, a trajectory line per shipped item);
and rule 5's line annotation held (68 of 68 wish-list lines, 9 of 9
Deferred fields) —
but the one prose deferral in the week never became a line (0 of 1),
so rule 5's capture is not shown to hold; the plan
verb fired three times; recall and phase close had no opportunity, so
rule 11 is untested; the decision log became the dominant cost of the
hot read within a week; the owner rewrote the intake's brief; and the
project changed v2's push posture and close verb within seven days.
Of v2-hone's predicted first-fortnight failures: "a plausible but
insufficiently grounded profile" — see S1; "a handoff that loses
acceptance context" — see S3; "semantic deferrals" — the lines that
exist are structured, but the one prose deferral was not captured;
"copied stale settings" — the
harness settings were locally rewritten, not copied stale; "archive
and phase churn" — the archive step ran twice in a week.

### S3 — Handoff and concurrency

Window 2026-09-16 09:25 UTC → the cut-off, for Video Pedagogy (v2) and
two comparators, vinyl (v0.2) and Route Plotter (canon 4.7.0). Session
logs were queried by program for named questions; no log line appears
here.

**How plans travelled.** Episode frame (cross-harness, within seven
days; same-harness delegation counted separately): Video Pedagogy 49,
vinyl 62, Route Plotter 23. Most were a Claude session launching Codex
with a prompt it wrote (`codex exec`): 43 episodes (318 runs), 62
(146) and 23 (31). The rest — record-borne handoffs, an owner relaying a
plan or an executor opening on an item the other harness wrote —
appear only in Video Pedagogy: 6 of its 49. Every Codex `exec` run in
the window, in all three projects, was launched from a Claude session
(330, 152 and 31 runs). Twelve episodes were sampled
(four per project, seed `20260924`) and classed record / hybrid /
chat, double-scored (C.3).

| Episode class (4 sampled per project) | Video Pedagogy | vinyl | Route Plotter |
| --- | --- | --- | --- |
| record — the executor needed nothing the record did not hold | 0 | 0 | 0 |
| hybrid — the record held the item; the brief, acceptance facts or output shape travelled in the prompt | 2 | 2 | 4 |
| chat — the work was not in the record when the executor ran | 2 | 2 | 0 |

The run pass and the blind pass agreed on all twelve (12/12; no
adjudication needed; C.3). In every sampled episode the launching
prompt carried two to four facts the ledger did not hold (run pass,
single-scored counts); the owner restated an instruction or authority
in the launching session in eight of the twelve.

**What the executors were.** In Video Pedagogy's v2 week, every one of
the 330 Codex runs was launched by a Claude session and was read-only
throughout: the harnesses separated into **Claude writes, Codex reads
and checks**. That is the owner's actual handoff — a second model
verifying the first — not v2's "plan in one harness, execute in the
other".

**One writer per checkout.**

| | Video Pedagogy | vinyl | Route Plotter |
| --- | --- | --- | --- |
| Co-active pairs where both wrote ledger files | 5 (09-17, 09-18, 09-24) | 10 (all 09-20) | 0 |
| What the history shows | 3 commits that swept another item's uncommitted ledger lines into their own; the ledger refers to a concurrent session 20 times in five days and once asks the owner to settle which session holds the ledger | a parallel lane in which four of six items were built twice, combined by hand | branches and pull requests; two local merges on 09-24 conflicted in `file-map.md` / `wish-list.md`; the gate passed after both |
| Held or scratch clones | 92 Codex runs in three held clones on 09-24, not merged back by the cut-off (an open merge question, not an observed conflict) | 137 scratch clones or worktrees | 28 scratch clones |

**Network closed in sessions.** Codex honoured it (all 344 of Video
Pedagogy's rollouts ran with the network restricted; web search only in
runs launched with `--search` under a recorded decision). **Claude Code
in the desktop app did not enforce the generated settings**: 37 pushes
(31 succeeded), 17 remote reads, 252 web-tool calls and 33 writes into
the harness's own memory store (which the settings turn off) — almost
all under an owner instruction recorded in the ledger, except seven
web calls on 09-22 with no recorded authority. The project's own
HARNESS-VERIFY entry recorded on day 3 that the desktop app does not
enforce the closed profile; on day 8 it opened a standing push for
Claude Code sessions (S2, S9).

**Settings installed.** Claude settings at `.claude/` in four of the
seven v2 projects (Video Pedagogy, Derry, Pattern Mapper, Storage
Tidy); eBay generated them under `harness/claude/`; Marketing and
Personal Finance have none. A project-level `.codex/config.toml` in
three (Video Pedagogy, Derry, Pattern Mapper). Installation only: no
project but Video Pedagogy has a session after its intake, so whether
the settings are honoured can be tested nowhere else.
The Codex intake profile cannot take effect from inside the repository:
the trusted project configuration outranks `-p` (recorded in Video
Pedagogy's ledger).

**Comparators for context** (no closed-network rule in either):
vinyl's Claude sessions pushed 157 times and ran 87 Codex rollouts
with the network on; Route Plotter pushed through branches and 37 pull
requests.

**Settles, at one project and one week (Hypothesis at most):** rule
3's "one writer per checkout" did not hold in the one exposed v2
project — the ledger itself records the sweeps; the record is not the
channel plans travel by; and the network posture holds only where the
harness enforces it (Codex), not where it is generated but not applied
(the desktop app's Claude Code sessions).

### S4 — Promises over months

Promises (deferrals, follow-ups, phase commitments, wish-list lines,
superseding decisions) drawn from each record at a point at least four
weeks before its last filed HEAD (or census where the frame was 30 or
fewer), seed `20260924`, and traced through the history. Per project,
never pooled; the rows are young-record baselines, not settled
discipline (three of the draw records were 3–10 days old). Three draws
fall short of four weeks because no earlier HEAD was filed — the Video
Helper and Derry 25 days, vinyl 22 — and are marked *short window*.

| Project (substrate) | Draw → end | Frame | Drawn | Fulfilled | Explicitly retired | Disappeared | Pending (censored) | Unknown |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Hub (canon, unversioned → 4.6.0) | 07-08 → 08-17 | 65 | 30 | 8 | 0 | 0 | 22 | 0 |
| Dot Matrix (unversioned) | 04-24 → 05-29 | 75 | 30 | 10 | 1 | **14** | 5 | 0 |
| Pattern Mapper (canon 4.0.0, through the v2 intake) | 07-23 → 09-16 | 73 | 30 | 14 | 9 | 4 | 3 | 0 |
| Route Plotter (canon 4.7.0) | 08-27 → 09-24 | 29 | 29 | 14 | 0 | 1 | 14 | 0 |
| Route Plotter v2 line (canon 2.3.0) | 04-16 → 06-18 | 19 | 19 | 8 | 0 | 0 | 11 | 0 |
| the Video Helper (canon 4.9.2) | 08-27 → 09-21 (*short window*) | 70 | 30 | 5 | 1 | 2 | 22 | 0 |
| Derry Lane (canon 4.6.0, through the v2 intake) | 08-22 → 09-16 (*short window*) | 26 | 26 | 0 | 0 | 0 | 22 | 4 |
| vinyl-sorting (v0.2) | 09-01 → 09-23 (*short window*) | 50 | 30 | 13 | 1 | 0 | 16 | 0 |
| *Video Pedagogy (v2, one week — censored, not comparable)* | 09-16 → 09-23 | 136 | 30 | 6 | 0 | 0 | 24 | 0 |

Superseding-decision units almost always "held" (13 of 13 drawn in the
Hub and Dot Matrix; every one in Pattern Mapper and vinyl); read the
rows without them for drift (each summary gives both).

**Opportunities** (the frozen rubric's two counts: plan or phase-close
events, and all later closes, over the window): the Hub's pending units
sat through a median 18 plan events and 53 closes (its install-era
icebox lines 25 and 98); Dot Matrix's lost units 5 and 28 before they
were dropped, its pending ones 7–8 and 35–37; Pattern Mapper 32 plan
events and 62 closes in the window; Route Plotter 10 and 41; its v2
line 5 and 17; the Video Helper 5 and 18; Derry 2 plan events and no
close; vinyl 18 and 52; Video Pedagogy 3 plans and 6 closes (censored).
A zero in the disappeared column is read only where such events
occurred.

**Promoted** (a transition, not a terminal state; of the drawn units
that could be promoted): the Hub 0 of 1 prose unit (22 of its 25
non-superseded units were born as items), Dot Matrix 8 of 15, Pattern
Mapper 8 of 23, Route Plotter 4 of 14, its v2 line 0 of 3, the Video
Helper 3 of 22, Derry 2 of 14, vinyl 5 of 16, Video Pedagogy 1 of 22.
**Shipped but still open:** by ID, none at any export; by content, the
Hub 1 (with a peak of ten shipped-but-open IDs in July, cleared within
two days), Dot Matrix 2 and one partial, vinyl 1 (open for 22 days).

- **Promises are lost in events, not by decay.** 19 of the 21
  disappearances in the table happened in maintenance events: 14 in
  one Dot Matrix commit (a restructure that dropped 25 of 51 open lines
  with no decision entry, followed by an archive move), 3 in Pattern
  Mapper when decision entries holding prose deferrals were archived,
  and 2 when the Video Helper compressed a ticket that was the only
  home of two deferrals. (The other two: a conditional that went moot
  unremarked, and a choice deferred to a sign-off that never made
  it.) The loss happens when a line leaves the live record in a
  restructure, an archive or a compression without a line, a decision
  or work to show for it.
- **Prose deferrals rarely become lines.** Among drawn prose-origin
  promises: Route Plotter 2 of 3, the Video Helper 0 of 2, Derry 1 of
  4, Pattern Mapper 1 of 5 (census of its stratum: 4 of 12), vinyl 0 of
  2 (census 1 of 4), the Hub (census) 1 of 8. Dot Matrix promoted 8 of
  15 in one sweep, and all 8 disappeared in the restructure: promotion
  alone did not protect them. This is the DEFERRAL-LINE defect in the
  field, in every canon and v0.2 record; canon 4.21.1 now ships the
  rule, and no deployment has taken it. In v2's one week, every
  `**Deferred:**` field names item IDs and every wish-list line carries
  its origin — rule 5 observed at the field level, too young to judge.
- **Explicit retirement is rare and batched.** One explicit retirement
  in 104 units in the Route Plotter/Video Helper/Derry batch, and that
  in a commit body. Pattern Mapper's nine retirements came mostly from
  one catch-up triage after its wish-list had stood at twice its cap
  through two prunes.
- **Staleness.** The Hub's open list: 29 of 30 open lines untouched
  for over 30 days at its export, ten since install, two obsolete, one
  already shipped (a spike of ten shipped-but-open IDs had been cleared
  within two days in July). vinyl: one item's done-when met while it
  stayed open; a shipped wish-list line open for 22 days; four records
  corrected by the project itself. Route Plotter archived two phase
  headings still marked as in progress. Pattern Mapper: nothing paid
  while its line stayed open.
- **The 45-entry archive trigger against actual rotations.** Canon's
  20-entry budget drove every actual rotation in canon records,
  overshooting up to 3.4×; a 45-entry rule would have fired three
  times in the Hub (each 1–6 days before the actual rotation), three
  episodes in Pattern Mapper, once in Route Plotter, never in the Video
  Helper, 21 days before the only rotation in Dot Matrix, and from
  2026-09-20 on in vinyl, which never rotated after its first three
  days (103 live entries against a budget of 20). In Dot Matrix the
  entries average 7.9 KB: **an entry-count trigger does not bound what
  the file costs to read**.
- **Supersession on the record.** Canon records rarely name what they
  supersede: the Hub 3 of 26 live entries (none with a Supersedes
  line), Dot Matrix 4 of 43, Route Plotter 6 of 20 in the window (one
  with a Supersedes line), the Video Helper 2 of 14. Video Pedagogy's
  v2 week: 16 of 69 with an exact-heading Supersedes line.
- **Crossings.** The Route Plotter port carried every open v2-line
  line verbatim, and promises idle for 63 days were paid or cut
  within 11 days of v3 starting. Derry's v2 intake dropped none of its
  26 open promises (4 became v2 items, 8 merged, 12 routed to external
  workflows by ID, 2 kept only in history). Pattern Mapper's three
  pending promises survived its intake, two only inside retained
  tickets.

Fulfilment where work was evidenced was judged 0–2 (92 judged
promises) and double-scored blind: agreement 76 / 92 (0.826; Video
Pedagogy lowest, 4 of 9). Adjudication by re-reading moved ten cells
from 2 to 1 and one from 1 to 2 (C.4). **Assessment delta:** the run's
own fulfilment pass was generous — the mean over the 92 falls from
1.73 to 1.63. Terminal statuses in the table do not depend on the
fulfilment score and stand.

### S5 — Retrievability across the whole population

**Frame.**

- **Records:** 35, every filed HEAD with a record:
  - 31 at Git HEADs, including Storage Tidy's intake commit (read from
    its bundle) and the lab's self-host;
  - four folder records without Git, three of which carry no order,
    so their question 1 is not scored;
  - the same project at two HEADs counted as two records.
- **A hot-set arm on 14 records** (Checkpoint A, A2): the latest
  eligible HEAD of every project whose mandatory read is materially
  smaller than its record. These readers got only what the contract
  makes every session read.
- **49 fresh readers.** Each was given one record (or one hot set) and
  the four questions, and no other project material; each also
  inherited this repository's standing session context (C.1). Sixteen
  answers were re-run once and two failed runs repeated; the discarded
  first answers were not scored, so re-run sensitivity is unknown.
- **Cells:** 196 = 49 × 4. Four have no possible key (three folders'
  Q1, one record without a backlog), leaving **192 scored**.
- **Keys:** built from the record and its Git history, and never shown
  to a reader.
- **Scoring:** Codex first (sealed 20:20Z, material inlined, neutral
  cell ids), then the run, then the blind pass. Each blind session read
  one neutral cell file (C.1).

**Agreement.** Over 192 cells, all three scorers agreed on 163; run and
blind 174 (0.906); Codex and blind 179 (0.932); Codex and run 164
(0.854). 29 disagreements were adjudicated: the result matched the run's
score in 17, Codex's in 12 and the blind pass's in 14. In 11 of them the
two Claude passes agreed and Codex differed; each was re-read, not
outvoted.

Every disagreement was re-read and adjudicated under stated rules
(C.6):

- **Q3 (deferrals).** A 2 needs every deferral list the record holds,
  each with its location. At most one isolated prose deferral may be
  missed. A list only pointed to scores 1. Items queued in a next
  milestone, and permanent exclusions, are not deferrals.
- **Q2 (a decision and its why).** Any real decision the record holds,
  with its real reason, scores 2 — checked against the whole record
  where a key listed only recent entries.
- **Q1 (the last four pieces of work).** Scored against the key's
  stated record-only answer where the record's granularity differs
  from Git.

The strict reading, under which every key line counts, is Codex's. It
is reported beside the adjudicated scores as the sensitivity.

**Results by substrate class** (whole-record arm; share of available
points; adjudicated):

| Class | Records | Mean share (adjudicated) | Lowest | Q1 | Q2 | Q3 | Q4 | Mean share, strict reading |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| canon 4.x | 7 | 0.91 | 0.75 | 1.57 | 2.00 | 1.71 | 2.00 | 0.89 |
| canon 2–3.x | 7 | 0.96 | 0.88 | 1.86 | 2.00 | 1.86 | 2.00 | 0.93 |
| unversioned | 3 | 1.00 | 1.00 | 2.00 | 2.00 | 2.00 | 2.00 | 0.90 |
| v0.2 | 4 | 1.00 | 1.00 | 2.00 | 2.00 | 2.00 | 2.00 | 0.94 |
| v2 | 9 | 0.96 | 0.75 | 2.00 | 2.00 | 1.89 | 1.78 | 0.93 |
| none | 5 | 0.90 | 0.50 | 1.33 | 2.00 | 1.80 | 2.00 | 0.81 |

**The hot-set arm: the same record, with only the mandatory read:**

| Record | Class | Mandatory words | Whole-record words | Whole record | Mandatory read only | Questions below full credit with only the mandatory read |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| hub@fc4df64 | canon 4.x | 17,053 | 56,719 | 7/8 | 7/8 | Q1 |
| rp@989f11d | canon 4.x | 7,657 | 56,377 | 7/8 | 6/8 | Q1, Q3 |
| uvh@c346581 | canon 4.x | 12,893 | 52,207 | 8/8 | 7/8 | Q3 |
| client-site@2738fe5 | canon 2–3.x | 2,658 | 5,148 | 8/8 | 7/8 | Q1 |
| dotcrowd@8d38880 | unversioned | 6,420 | 12,264 | 8/8 | 5/8 | Q1, Q2 |
| dotmatrix@0314b05 | unversioned | 6,996 | 41,581 | 8/8 | 7/8 | Q3 |
| vinyl@06f6c90 | v0.2 | 1,617 | 71,320 | 8/8 | 2/8 | Q1, Q3, Q4 |
| derry@665f36b | v2 | 2,502 | 14,364 | 8/8 | 7/8 | Q3 |
| ebay@f800a63 | v2 | 6,857 | 25,029 | 8/8 | 8/8 | — |
| marketing@889b65f | v2 | 1,370 | 4,980 | 8/8 | 6/8 | Q1, Q3 |
| pf@602e28a | v2 | 1,532 | 9,676 | 8/8 | 8/8 | — |
| pm@24c9e93 | v2 | 8,127 | 89,200 | 7/8 | 7/8 | Q3 |
| storage@267e031 | v2 | 6,078 | 28,901 | 8/8 | 7/8 | Q3 |
| vpr@23af797 | v2 | 8,655 | 66,924 | 8/8 | 6/8 | Q1, Q3 |

**Recall beside reading cost** (S6's pairing; whole and hot-set arms):

| Record | Class | Mandatory words | Record words | Recall, whole | Recall, mandatory read only |
| --- | --- | ---: | ---: | ---: | ---: |
| derry@375e102 | canon 4.x | 6,664 | 12,486 | 8/8 | — |
| hub@fc4df64 | canon 4.x | 17,053 | 56,719 | 7/8 | 7/8 |
| pm@348eb16 | canon 4.x | 14,314 | 65,743 | 8/8 | — |
| rp@6f2ac15 | canon 4.x | 6,607 | 42,640 | 6/8 | — |
| rp@989f11d | canon 4.x | 7,657 | 56,377 | 7/8 | 6/8 |
| uvh@09702c2 | canon 4.x | 13,270 | 48,136 | 7/8 | — |
| uvh@c346581 | canon 4.x | 12,893 | 52,207 | 8/8 | 7/8 |
| artwork@02d4145 | canon 2–3.x | 5,792 | 8,466 | 7/8 | — |
| corperate@ee49264 | canon 2–3.x | 6,444 | 10,729 | 8/8 | — |
| client-site@2738fe5 | canon 2–3.x | 2,658 | 5,148 | 8/8 | 7/8 |
| laurillard@0341c0b | canon 2–3.x | 2,617 | 4,293 | 8/8 | — |
| client-app@a9fcee4 | canon 2–3.x | 6,444 | 10,031 | 8/8 | — |
| rp-v2line@5b19787 | canon 2–3.x | 8,819 | 14,610 | 7/8 | — |
| windsurf-ai@14d0ba1 | canon 2–3.x | 8,272 | 12,425 | 8/8 | — |
| dotcrowd@8d38880 | unversioned | 6,420 | 12,264 | 8/8 | 5/8 |
| dotmatrix@0314b05 | unversioned | 6,996 | 41,581 | 8/8 | 7/8 |
| resolve@folder | unversioned | 13,679 | 20,762 | 6/6 | — |
| ebay@550ece7 | v0.2 | 1,123 | 9,000 | 8/8 | — |
| storage@eb96fbc | v0.2 | 3,819 | 9,907 | 8/8 | — |
| vinyl@06f6c90 | v0.2 | 1,617 | 71,320 | 8/8 | 2/8 |
| vinyl@60c3c4b | v0.2 | 1,454 | 35,368 | 8/8 | — |
| derry@665f36b | v2 | 2,502 | 14,364 | 8/8 | 7/8 |
| ebay@f800a63 | v2 | 6,857 | 25,029 | 8/8 | 8/8 |
| lab-selfhost@ec9aa81 | v2 | 6,655 | 9,777 | 6/8 | — |
| marketing@889b65f | v2 | 1,370 | 4,980 | 8/8 | 6/8 |
| pf@602e28a | v2 | 1,532 | 9,676 | 8/8 | 8/8 |
| pm@24c9e93 | v2 | 8,127 | 89,200 | 7/8 | 7/8 |
| storage@267e031 | v2 | 6,078 | 28,901 | 8/8 | 7/8 |
| vpr@23af797 | v2 | 8,655 | 66,924 | 8/8 | 6/8 |
| vpr@a9a0d1f | v2 | 3,349 | 9,722 | 8/8 | — |
| adhd@b1a20d6 | none | 8,630 | 15,761 | 3/6 | — |
| marketing@folder | none | 0 | 4,998 | 6/6 | — |
| parenting@folder | none | 0 | 2,845 | 6/6 | — |
| pf@folder | none | 0 | 5,233 | 8/8 | — |
| vpr@8f6b6c6 | none | 873 | 33,133 | 8/8 | — |

**Paired records across a crossing** (the same project before and
after its v2 intake):

| Project | Before (substrate, HEAD) | After the v2 intake | Later |
| --- | --- | --- | --- |
| Derry Lane | canon 4.x `375e102`: 8/8 | v2 `665f36b`: 8/8 | — |
| Pattern Mapper | canon 4.x `348eb16`: 8/8 | v2 `24c9e93`: 7/8 | — |
| eBay Tool | v0.2 `550ece7`: 8/8 | v2 `f800a63`: 8/8 | — |
| Storage Tidy | v0.2 `eb96fbc`: 8/8 | v2 `267e031`: 8/8 | — |
| Video Pedagogy | none `8f6b6c6`: 8/8 | v2 `a9a0d1f`: 8/8 | v2 `23af797`: 8/8 (eight days on) |
| Marketing Skills | none `folder`: 6/6 | v2 `889b65f`: 8/8 | — |
| Personal Finance | none `folder`: 8/8 | v2 `602e28a`: 8/8 | — |

**By record age** (first commit to HEAD; whole arm): 0–7 days 0.98 (n =
11); 8–30 days 0.92 (n = 9); 31–90 days 0.94 (n = 4); over 90 days 0.94
(n = 4). Record age does not move whole-record recall in this
population.

**Cells below 2, and which v2 rule or check would have caught each:**

| Cell | Record | Arm | Q | Score | Gap | The v2 rule or check that would have caught it |
| --- | --- | --- | --- | ---: | --- | --- |
| C002 | adhd@b1a20d6 | whole | Q3 | 1 | a standing blocker list not given | rule 5 (a blocker becomes a backlog line marked blocked) |
| C007 | lab-selfhost@ec9aa81 | whole | Q4 | 0 | a decision names a next item the backlog order does not put first | rule 11 names the next item at a phase close; no check ties that name to the backlog order — none |
| C010 | vpr@23af797 | mandatory read | Q3 | 1 | the wish-list is outside rule 1's read | none — rule 1 excludes the wish-list; the Deferred fields in the latest ten decisions recovered part |
| C022 | client-site@2738fe5 | mandatory read | Q1 | 1 | the shipped-work ledger is outside the mandatory read | none — v2's rule 1 excludes the trajectory too |
| C023 | dotcrowd@8d38880 | mandatory read | Q2 | 1 | the decision log is outside the mandatory read | rule 1 (the latest ten decisions are mandatory in v2) |
| C027 | hub@fc4df64 | whole | Q1 | 1 | same-day ships in no recorded order | none — trajectory lines carry a date, not a sequence |
| C038 | adhd@b1a20d6 | whole | Q1 | 0 | no shipped-work ledger at all | rule 6 (a trajectory line on finishing) |
| C041 | rp-v2line@5b19787 | whole | Q3 | 1 | two prose or brief deferrals not given | rule 5 (every deferral a line; prose-only deferrals are what rule 5 targets) |
| C044 | derry@665f36b | mandatory read | Q3 | 1 | the retained icebox sits in a migration map outside rule 1 | none — rule 1 excludes the wish-list and retained files |
| C050 | storage@267e031 | mandatory read | Q3 | 1 | the wish-list is outside rule 1's read | none — rule 5's Deferred cross-references recovered most of it |
| C056 | pm@24c9e93 | whole | Q3 | 1 | a blocked line and two document deferrals not given | rule 5 in part (the document-level deferrals are not lines) |
| C065 | rp@989f11d | mandatory read | Q3 | 1 | the wish-list is outside the mandatory read | none — v2's rule 1 excludes the wish-list too |
| C071 | rp@989f11d | mandatory read | Q1 | 1 | the shipped-work ledger is outside the mandatory read | none — v2's rule 1 excludes the trajectory too |
| C081 | artwork@02d4145 | whole | Q1 | 1 | shipped work recorded by phase, not by item | rule 6 (one trajectory line per item) |
| C082 | dotmatrix@0314b05 | mandatory read | Q3 | 1 | stale deferral lines the record itself contradicts | rule 6 in part (retire paid lines; the checker's shipped-but-open drift check covers IDs only) |
| C088 | vpr@23af797 | mandatory read | Q1 | 1 | the trajectory is outside rule 1's read | none — decisions record progress, not ships |
| C091 | marketing@889b65f | mandatory read | Q1 | 1 | the trajectory is outside rule 1's read | none — as C088 |
| C123 | rp@6f2ac15 | whole | Q3 | 1 | the reader pointed to the wish-list without listing it | none — a reader's choice, not a record gap |
| C130 | dotcrowd@8d38880 | mandatory read | Q1 | 0 | the completed list is outside the mandatory Active section | none — v2's rule 1 excludes the trajectory too |
| C134 | vinyl@06f6c90 | mandatory read | Q3 | 0 | v0.2's mandatory read holds no ledger | rule 1 in part (v2 makes the open backlog and latest ten decisions mandatory) |
| C139 | pm@24c9e93 | mandatory read | Q3 | 1 | the wish-list is outside rule 1's read | none — as C010 |
| C154 | rp@989f11d | whole | Q3 | 1 | three decision-log or brief deferrals not given | rule 5 (deferrals kept only in decision prose) |
| C163 | vinyl@06f6c90 | mandatory read | Q4 | 0 | v0.2's mandatory read holds no backlog | rule 1 (the open backlog is mandatory in v2) |
| C164 | rp@6f2ac15 | whole | Q1 | 1 | housekeeping lines interleaved with ships | rule 6 (only finished items get trajectory lines) |
| C166 | uvh@09702c2 | whole | Q1 | 1 | trajectory mixes shipped, closed, cut and reframed entries | rule 6's line grammar (ID — outcome) in part |
| C169 | marketing@889b65f | mandatory read | Q3 | 1 | the wish-list is outside rule 1's read | none — as C010 |
| C170 | hub@fc4df64 | mandatory read | Q1 | 1 | the shipped-work ledger is outside the mandatory read | none — v2's rule 1 excludes the trajectory too |
| C173 | vinyl@06f6c90 | mandatory read | Q1 | 0 | the shipped-work ledger is outside the mandatory read | none — v2's rule 1 excludes the trajectory too |
| C187 | uvh@c346581 | mandatory read | Q3 | 1 | the wish-list is outside the mandatory read | none — v2's rule 1 excludes the wish-list too |

**Settles** (graded Pattern for the substrate comparison — every record
is the owner's; Hypothesis for v2 in use):

1. **Whole-record recall is at the ceiling for every substrate.**
   - 32 of 35 records scored at least 7 of 8, or the equivalent where a
     question had no key.
   - Six of the seven crossings scored the same before and after the v2
     intake; Pattern Mapper's fell from 8 to 7 of 8, on deferrals.
   - Record age made no difference.

   A whole-record recall criterion of 7 of 8, as V2-FIELD-1 drafts it,
   would pass almost any record here, so it cannot tell whether v2
   helps. **The baseline V2-FIELD-1 needs is the mandatory-read arm.**
2. **The mandatory read separates the substrates.**

   | Substrate | Mean score | Median mandatory read |
   | --- | --- | --- |
   | v2 (seven sets) | 7.0 of 8 | 6,078 words |
   | canon 4.x (three) | 6.7 of 8 | 12,893 words |
   | canon 3.1.1 (one) | 7 of 8 | 2,658 words |
   | unversioned (two) | 5 and 7 of 8 | 6,420 and 6,996 words |
   | pm-next v0.2 (one) | 2 of 8 | 1,617 words (its contract alone) |

   **The caveat that decides how far this carries:** six of the seven v2
   sets were taken on intake day. The one v2 record with a week of use
   answered 6 of 8 from 8,655 words.
3. **What the mandatory read loses, and why.**
   - **Q3 (deferred work) fell below full credit in 9 of the 14
     mandatory reads, and Q1 (shipped work) in 7.** No contract —
     canon's, v0.2's or v2's rule 1
     — puts the wish-list or the trajectory in the mandatory read.
   - **v2's hot sets held Q2 and Q4 in all seven,** because rule 1 makes
     the open backlog and the latest ten decisions mandatory. v0.2's
     contract-only read lost Q4.
   - **v2's hot sets recovered part of Q1 and Q3 through the decision
     entries:** their item IDs and their Deferred fields.
   - **The Supersedes line and the structure file were implicated in no
     cell below 2.**
   - **The whole-record failures trace to four things:**
     - shipped work recorded by phase rather than by item (rule 6);
     - same-day ships with no recorded order (no rule);
     - a next item named in a decision that the backlog does not put
       first (rule 11, with no check to tie the two);
     - deferrals kept only in decision prose or documents rather than
       as lines (rule 5) — the Q3 cells C002, C041, C056, C123, C154.
4. **For D3:** reading only decision headings and Decision lines would
   cut the channel through which v2's mandatory read recovers shipped
   work and deferrals. Test before adopting.

### S6 — Attention cost, paired with S5

Whitespace words of the reading each record's own contract prescribes
before work begins — before every task in canon, before the first change
in v2 (rule 1), the contract itself in v0.2. These are prescribed
reading, an estimate of burden: not tokens, and not measured attention
(Appendix B.3 per record).

| Class | Records | Mandatory read, range | Median | Contract's share |
| --- | ---: | --- | ---: | --- |
| canon 4.x | 7 | 6,607 – 17,053 | 12,893 | 16 – 58 % |
| canon 3.x | 2 | 2,617 – 2,658 | 2,638 | 18, 37 % |
| canon 2.x | 5 | 5,792 – 8,819 | 6,444 | 24 – 50 % |
| unversioned | 3 | 6,420 – 13,679 | 6,996 | 8 – 26 % |
| pm-next v0.2 | 4 | 1,123 – 3,819 | 1,536 | 26 – 88 % |
| pm-next v2 | 9 | 1,370 – 8,655 | 6,078 | 5 – 33 % |
| none | 5 | 0 – 8,630 | 0 | — |

- **Where v2's weight went.** v2's contract is 395–482 words, but its
  mandatory read is not small: the latest ten decisions (4,593 words in
  Video Pedagogy after one week) and the project rules files the
  intakes added to rule 1 (Pattern Mapper's `project/rules.md`, 4,085
  words; Derry's `DEVELOPMENT-AUTHORITY.md`, 734; Video Pedagogy's
  research contract and scope, 2,071). **The validator's own read
  estimate leaves those additions out** (Pattern Mapper: 3,432
  reported against ≈ 8,100 actual).
- **Canon's weight** is the contract itself (`AGENTS.md` 4,500–5,700
  words in the Hub, Pattern Mapper and the Video Helper) and the
  Active backlog; canon reads only the latest ten decision *headings*
  (42–163 words).
- **Maintenance.** Archive or rotation events: the Hub 12 rotations in
  154 commits, Pattern Mapper 7, vinyl 5 (all in its first three days,
  none after, while its warnings grew from 1 to 21 across four filed
  runs), Route Plotter 3, the Video Helper 3, Video Pedagogy 2 in its
  v2 week.
- Paired with S5: see S5's table, which places each record's recall
  beside its mandatory words and its hot-set arm.

### S7 — Rulebook census mapped onto the profile

Every canon deployment's rulebooks diffed against the template at its
version (templates located by the commit that set `pm_skills/VERSION`;
under `pm_skills/templates/` from 4.0.0; 2.2.0 diffed against 2.1.0's
text because no commit set 2.2.0). 690 divergence rows across 15
deployments (Appendix B.4).

| Batch | Written units with a home | Named slot | Generic only (a decision entry) | None |
| --- | ---: | ---: | ---: | ---: |
| canon 4.x (Hub, Derry, Pattern Mapper, Route Plotter, Video Helper) — additions | 200 | 51.5 % | 23 % | 25.5 % |
| … the same, within the 400-word profile budget | 200 | ≈ 41.5 % | 23 % | ≈ 35.5 % |
| Windsurf-era and unversioned (10 deployments) — all written units | 274 | 63.1 % | 23.7 % | 13.1 % |

- **What has no home, the same across projects:** operational
  runbooks (deploy, release, rollback, runtime lifecycle); standing
  checklists (persistence, scratch storage); reference catalogues
  (data models, event tables); protection and approval rules for
  protected paths; process tiers (the PROCESS.md content v2 iceboxed);
  environment and cloud-sync hazards (written into their own
  rulebooks by three 4.x projects).
- **What only a decision can hold:** architecture invariants and
  module-level approval boundaries. v2's rule 1 reads the latest ten
  decisions, so an always-in-force invariant stored as a decision ages
  out of the mandatory read.
- **Retirement evidence (shipped rules real projects deleted, weakened
  or left without a trace of use).** Absent evidence is not demonstrated
  non-use, except where the rule itself requires a trace. The 14-point
  design review gate: cited in 2 of 616 commits across the four 4.x UI
  projects (the Hub 137, Pattern Mapper 216, Route Plotter 134, the
  Video Helper 129 commits since install), and carried by seven early
  projects with no trace; Nielsen as hard rules; the anti-pattern list; the
  testing doctrine; the self-explaining runtime and commit-derived
  build identity (carried six to nine weeks in the Hub, never built);
  lite close (no `Close: lite` trailer anywhere, and the rule requires
  one, so this one is non-use); handoff blocks (none in commits, though
  parallel sessions ran in four of five 4.x projects). **v2
  already omits most of these.**
- **Agent memory.** Of 98 kinds of fact the harnesses kept for
  themselves across seven projects, **58 % have no slot in canon or
  v2** (harness and tool behaviour, multi-session coordination,
  owner working agreements, the synced-folder environment); 27 %
  duplicate a ledger slot. The profile's line "each harness's own
  auto-memory is a cache; this ledger is the truth" does not describe
  what the field kept there. Single-scored (Hypothesis at most).

### S8 — Owner directives

Frame: every prompt in the tier's `-export-prompts` exports, excluding
Codex Desktop imports, guardian runs and spawned threads — **2,270
prompts, 1,956 unique** (314 exact repeats within a project, from
forked sessions; the same text can still recur across projects — three
sampled cells carry one reply sent in three projects).
Coverage limit: the prompts exports cover only sessions new or changed
at each harvest, so the early sessions of vinyl, eBay, the Video Helper
and Route Plotter (archived by earlier harvests without a prompts
export) are outside the frame; Storage Tidy has no prompts export.
Classified by the run (one classifier per project batch, harmonised:
a plain commit-and-push is not "deploy"); a 60-prompt sample
double-scored blind (C.5). **Agreement on the sample: primary intent
40 / 60 (0.667); author 59 / 60** — below the rubric's 0.9, so every
population figure below is Hypothesis at most. Adjudication found the
run over-assigning *fix* (reverts and prompt-writing coded as fixes)
and *next-item* (acknowledgements): the *fix* share is an
overestimate and *other* an underestimate; *second-model* errors ran
both ways (net −2 of 60), so its share is not shown to be biased in
either direction. The one author disagreement (a prepared intake
prompt, opened programmatically with its five siblings) was adjudicated
to agent-dispatch. 619 of the 1,409 owner prompts (43.9 %) carry a
secondary intent; counts below use the primary.

**Who wrote the prompts.** Of the 1,956 unique prompts, 1,409 were
typed by the owner and **489 were written by one agent to launch
another** (mostly Claude sessions launching Codex runs: 205 for
second-model verification, 142 for review, 103 for implementation);
the rest are harness wrappers.

**What the owner asks for** (unique owner-typed prompts, n = 1,409;
primary intent):

| Intent | Prompts | Share | pm-next v2's answer | Kind |
| --- | ---: | ---: | --- | --- |
| explain / advise | 375 | 26.6 % | — (not process) | — |
| next item / implement this | 304 | 21.6 % | the contract only; no entry verb | execution |
| verify with a second model | 144 | 10.2 % | **nothing** | process |
| other (mostly commit and push) | 145 | 10.3 % | — | — |
| audit, repair or close memory | 121 | 8.6 % | close verb; memory maintenance is iceboxed | process |
| plan the next phase | 107 | 7.6 % | plan verb | process |
| fix a defect | 85 | 6.0 % | the contract only (bug-scoping iceboxed) | execution |
| review | 60 | 4.3 % | plan verb (review folded in) | process |
| run the whole backlog | 51 | 3.6 % | **nothing** (plan allows authorised execution of one phase) | execution |
| deploy / make live | 12 | 0.9 % | a profile line only | process |
| harvest or file evidence | 5 | 0.4 % | iceboxed (lab-side) | process |

- **Named verbs.** The owner named a framework verb in 168 prompts; the
  most named are canon's: close 53, "autojazz" 34, session-start 27,
  next 23, plan 8, epic 3. A prompt may name several verbs: the 168
  prompts carry 200 mentions of 28 verb names in all. **v2's `recall`
  and `intake` were never named** (the intakes
  were launched by prepared prompts that name the v2 branch itself).
- **Push.** 55 owner prompts ask the agent to push (Pattern Mapper 34,
  Video Pedagogy 13) — against v2's posture that the owner pushes from
  outside a closed session.
- **Over time** (owner prompts per month): March 12, April 74, May 181,
  June 75, July 122, August 379, September 566. "Run the whole backlog"
  peaked in August (27); second-model verification returned in
  September (52 owner prompts, plus the agent-dispatched runs).
- **Settles (grade capped by the sample's agreement, C.5):** demand
  for two things v2 has no name for — second-model verification (the
  single largest process ask, and the owner's actual cross-harness
  pattern in S3) and running the backlog continuously — and for
  pushing from inside the session. The four v2 verbs are asked for by
  function (plan, close) but never by name; `recall` and `intake`
  never appear.

### S9 — Upgrade landing (conditional; run because budget remained)

**v2 side: no upgrade opportunity.** The branch has not moved since
the intakes. Five intakes' tools and verbs are byte-identical to the
branch; Pattern Mapper's are identical under `pm_skills/v2/` behind
two-line wrappers. **The one project with a week of use changed three
tools and the close verb in that week** — the reviewed-set replacement
the v2 change note prescribes would overwrite all three.

**Canon side (229 action rows; Appendix B.5).**

| Path | Count |
| --- | ---: |
| walked `upgrade.md` | 11 (the Hub ×8, Windsurf AI, Pattern Mapper, Route Plotter's v2 line — the last unfiled until now) |
| reinstalled | 3 (Route Plotter v3, Derry, the Video Helper) |
| refused | 1 (Route Plotter, 4.9.2) |
| converted by a v2 intake | 2 (Storage Tidy, eBay) |

- Walking was normal until mid-July: every walk but the Hub's
  lab-driven 4.6.0 walk is dated 07-17 or earlier; every reinstall and
  the refusal date from 08-17 on. This corrects the tier's working
  belief that nobody walks the procedure.
- The trees land exactly: every walked framework tree byte-matches its
  target release apart from five named deviations. Of the 138 action
  rows that came from changelog entries: 109 performed, 25 not needed, 4
  omitted (two were changes the entry never listed); one entry was
  wrong, and the class rule blocked it. Across all 193 action rows of
  the eleven walks — entries, standing procedure steps, and actions
  found only in the commit or its record — 146 performed, 25 not
  needed, 9 omitted and 13 unadvertised (B.5).
- **The one loss of memory on record** came from an upgrade commit
  that also carried a product revert (the Hub, 3.1.0): ten decision
  entries dropped and never restored; the upgrade's backup was taken
  after the reset. No procedure, canon or v2, requires upgrade commits
  to be free of product work.
- Safeguards the field shows necessary: the class rule (memory never
  replaced); contract merges (Route Plotter v3 cited five retired
  prompts for ten days after a reinstall without one); memory-migration
  mechanics (snapshot, reconcile); deleting retired files; removing
  leftovers; byte or manifest checks. Exercised without effect:
  backups (never restored from), rollback (never run), placeholder lint,
  the environment preflight.
- **Against v2's actual upgrade note** (V2-HONE's "Existing
  installations", not the icebox's older "re-copy the folder" phrase,
  which it superseded — Checkpoint B): the note already asks for a
  reviewed comparison, a reviewed replacement of tools and verbs, a
  deliberate contract merge and preserved records. It does not say to
  carry local tool edits, to upgrade in a commit of its own, or to delete
  retired files — the three things the canon field shows mattered and
  the one v2 week shows are needed (four local edits). A whole-set
  replacement would beat canon's literal entry walk on silent changes
  (the Hub, 2.1.0).

## 6. What v2 already gets right

Behaviour the evidence shows is load-bearing and must survive the next
version. Grades are capped by independence (one owner; one exposed v2
project; the intakes one witness).

1. **The crossing loses almost nothing.** Across eight crossings (seven
   v2 intakes and the one canon port), obligations omitted outright:
   0–1.7 % of deduplicated units, all from sources the intakes could
   not read; every intake archived the old
   installation byte for byte, and the two v0.2 conversions rehearsed
   rollback. Derry's intake dropped none of its 26 open promises.
   *(S1, S4 — Pattern across seven records, one intake witness.)*
2. **The mechanical close held on every commit of the only exposed
   week**: `ID: summary` and `Verify:` 73 of 73; the validator's result
   named in 72; a trajectory line for every shipped item. Canon
   deployments carry an item-ID title on 0–56 % of commits and a
   `Verify:` line on 0–43 %; the v0.2 runs already reached 87–100 %
   on both, so this is the successor line's discipline, not new in
   v2. *(S2 — Hypothesis: one project.)*
3. **Deferrals as structured lines.** Every wish-list line in Video
   Pedagogy carries its origin (68 of 68) and every `**Deferred:**`
   field names item IDs (the week's one prose deferral did not become a
   line) — the opposite of the canon and v0.2 records,
   where most prose deferrals never became a line and 19 of 21 lost
   promises vanished in restructures, archives and compressions.
   *(S2, S4 — the canon side meets the Framework-level count, every
   canon and v0.2 record where it could occur, but is capped at Pattern:
   one owner; the v2 side is one week, Hypothesis.)*
4. **Supersession named on the record.** 16 of 69 entries in the v2 week
   carry an exact-heading Supersedes line; canon records name what they
   supersede in 3–15 % of entries and almost never with a pointer.
   *(S2, S4.)*
5. **An archive step that moves verbatim and fires.** The 45-entry
   archive ran twice in the v2 week, moving entries word for word;
   canon's budgets were overrun by up to 3.4× and one v0.2 record
   reached 103 live entries against a budget of 20 without rotating.
   *(S2, S4, S6.)*
6. **v2 already dropped what the field carried without a trace of
   use.** The design review gate, Nielsen as hard rules, anti-pattern
   lists, the testing doctrine, the self-explaining runtime, build
   identity, lite close and handoff blocks — carried by canon
   deployments for weeks with almost no trace of use (the design gate
   cited in 2 of 616 commits across four UI projects; no lite-close
   trailer anywhere, though that rule requires one) — are absent from
   v2. Absent traces are not proof of non-use, except for lite close.
   *(S7 — the Framework-level count on the canon side, capped at
   Pattern: one owner.)*
7. **A smaller contract, and a mandatory read that still answers.**
   v2's always-loaded contract is 395–482 words, against canon 4.x's
   1,089–5,689 (4,500–5,700 in the Hub, Pattern Mapper and the Video
   Helper). The median mandatory read is half canon 4.x's (6,078 against
   12,893 words). Given only that read, fresh readers answered v2's four
   recall questions at 7.0 of 8, against 6.7 for canon 4.x's. Rule 1's
   open backlog and latest ten decisions held the decision and
   next-item questions in every v2 set. *(S5, S6 — Pattern for the
   substrate comparison; mostly intake-day v2 records.)*
8. **The plan verb fires.** Three `PLAN-N` entries with item lists in
   the one exposed week, one extended by an explicit supersession.
   *(S2 — Hypothesis.)*

## 7. Findings

Six findings after consolidation, in `self/FIELD-STUDY.md`'s shape plus
the counterexample and the assessment delta. Grades are capped by
independence throughout: one owner; the six same-morning intakes are
one witness; Video Pedagogy is the only exposed v2 project.

### V2F-1 — What projects actually carry has no home in v2's record, so every crossing improvised one

- **Studies / dimensions:** S1, S6, S7 (D1, D7, D9).
- **Grade:** Pattern (two independent intake witnesses — the templated
  wave and Storage Tidy — plus the census of fifteen canon deployments'
  rulebooks). **Severity:** High — the crossing works only by
  improvisation the schema does not name, and the minimal core's read
  cost is not what the validator reports. **Confidence:** High for the
  counts; Medium for the pointer reading (judged, three scorers).
- **Evidence.** Every intake wrote a project-rules file outside the
  schema (Pattern Mapper `project/rules.md` 27,926 bytes and
  `authority.md`; Derry `DEVELOPMENT-AUTHORITY.md`; eBay and Storage
  Tidy `project-rules.md`; Video Pedagogy's old `CLAUDE.md` byte for
  byte as `context/research-contract.md`; Marketing and Personal Finance
  pointers to policy and method files), and five of seven amended or
  extended rule 1 to make them mandatory (S1). Without pointer carriage
  the in-force share of baseline obligations falls to 12.5–38.8 % in
  four intakes (S1). The validator's read estimate omits the added
  reads (Pattern Mapper 3,432 reported, ≈ 8,100 actual; S6). Of the
  canon rulebooks' additions, 25.5 % (4.x) and 13.1 % (early) have no
  v2 home and a further 23–24 % fit only as decision entries that age
  out of rule 1's latest ten (S7). 58 % of the kinds of fact the
  harnesses kept in their own memory have no slot in canon or v2 (S7,
  single-scored).
- **Version anchor:** v2 at `c6d8198` = current branch — **live**.
- **What it costs now:** each intake reinvents where rules live, in a
  different place per project; a v2 session's real mandatory read is
  larger than the one the checker reports; invariants kept as decisions
  drop out of the mandatory read after ten newer entries.
- **Remedy.** *Move/Add, bounded:* one named slot — a profile line
  pointing to a single project rules file that rule 1 reads, budgeted
  and counted by the validator's estimate — plus structure.md's "Where
  to look first" naming runbooks and checklists (not read every task).
  *Lighter alternative:* only make the checker count whatever files
  rule 1 names, and let intakes keep improvising. *Per-session cost:*
  the rules file is read every task (bounded by its budget); the
  runbook pointers cost nothing until needed.
- **Counterexample:** Personal Finance and Marketing needed no new
  file — pointers to unchanged method and policy files sufficed — and
  scored J1 2 and 1; the canon port (Route Plotter) needed none because
  canon has rulebooks.
- **How we would know it worked:** the next intakes write no rules
  file outside the schema and leave rule 1 unamended; the checker's read
  estimate matches the measured mandatory read.
- **Also bears on canon:** no (canon's rulebooks are the home).
- **Assessment delta.** Checkpoint B narrowed the evidence to the rules
  files and the rule-1 amendments (not archives or migration receipts),
  and changed "unsupported" to "no named home" throughout. S1's
  three-way adjudication scored J1 below the blind pass in five
  crossings, mostly on the pointer question (Video Pedagogy's on a
  contradicted approval boundary). Grade, severity and remedy unchanged;
  the lighter
  alternative (the checker counts what rule 1 names) was added.

### V2F-2 — The intake ran without the owner the verb assumes

- **Studies:** S1 (D1). **Grade:** Pattern (the wave and Storage Tidy).
  **Severity:** Medium — almost nothing was lost outright (0–1.7 %),
  and every record says so honestly; but the verb's governance claims
  are not met. **Confidence:**
  High (mechanical: signature text, prompt counts).
- **Evidence.** All seven signatures were written by the agent — six
  under an advance authorisation in the launching prompt that the
  record cites, one under a one-line blanket approval; each says the
  wording was not individually reviewed. Step 2 ("ask only what you
  cannot infer") never ran: the six threads received one maintainer
  prompt each, which forbade questions and pre-answered the gate,
  hosting, harness and standards from preparation packages outside the
  tier; Storage Tidy's thread asked once, for approval of the whole
  package. What the agent filled by default went unmarked in five of seven
  profiles (10 fields: a Handoff role split letting either harness plan
  or implement, with no source, in four — the template leaves the split
  as a placeholder; the template's default Secrets sentence kept without
  a stated store; a Claude Code harness claim in a Codex-only project; a
  Push line contradicting the baseline). Migration-only instructions
  became standing policy in at least three (a standing ban on
  re-ratification; a migration-scoped dependency freeze turned into a
  standing ban on adding or upgrading dependencies; `Push: no` over the
  owner's push rule). The owner replaced Video
  Pedagogy's brief on day 2.
- **Version anchor:** live.
- **What it costs now:** a signed profile that says "signed" but was
  never read by the signer; guesses and template defaults that look like
  decisions; migration constraints that outlive the migration.
- **Remedy.** *Change the default:* intake step 3 marks every field it
  cannot source as a guess — the Handoff role split included — and the
  Secrets line's store becomes a required choice the checker fails on
  while it is a placeholder ("none held" allowed); the Signed section
  admits a delegated state
  (`Signed (delegated, not reviewed): … — see <authority>`) that the
  view shows as needing the owner until reviewed. *Lighter:* amend
  intake step 6's wording to name delegation and require the record to
  cite it (which every intake already did). *Cost:* one line in the
  profile; one owner-review item per install, once.
- **Counterexample:** Marketing's profile had no unmarked guess and
  scored J2 2 — the prompt supplied what the template left open.
- **How we would know:** at the next intakes, no unsourced field
  survives unmarked, and the owner-review item closes within two weeks.
- **Also bears on canon:** yes, weakly — canon's `adopt.md`/`init-mvp.md`
  equivalents were not tested here.
- **Assessment delta.** The pre-release sweep found that the Handoff
  role split is not template text — the template leaves it as a
  placeholder, and the intakes filled it with an unsourced guess. The
  remedy moved from shipping template placeholders to making intake
  mark every field it cannot source. Grade and severity unchanged.

### V2F-3 — Decisions became the dominant hot read within a week, and an entry count does not bound them

- **Studies:** S2, S4, S6, S7 (D6, D9). **Grade:** Hypothesis for v2
  (one project); Pattern for "count does not bound size" (Dot Matrix,
  vinyl, the Hub). **Severity:** Medium. **Confidence:** High (counts).
- **Evidence.** Video Pedagogy wrote 69 decision entries in eight days
  (median 333 words, maximum 1,494); rule 1's latest ten came to 4,593
  of the checker's 6,566-word estimate (8,655 with the reads the project
  added) (S2, S6). Canon reads the latest ten
  decision *headings* (42–163 words). Dot Matrix's entries average
  7.9 KB; the 45-entry trigger would not bound what the file costs to
  read (S4). Architecture invariants that projects kept as decisions
  would age out of the latest ten (S7).
- **Version anchor:** live.
- **What it costs now:** the mandatory read grows with how much a
  project decides, not with how much is in force.
- **Remedy.** *Shrink:* rule 1 reads the latest ten headings and
  Decision lines, bodies on demand (canon's rule), or caps entry length;
  standing invariants move to the rules slot (V2F-1). *Lighter:* a
  checker warning on entry length only. *Cost:* lower per session; one
  rule-1 wording change. *Risk:* in S5's mandatory-read arm, v2's
  rule-1 read recovered shipped work and deferrals through the decision
  entries, since the trajectory and the wish-list are outside rule 1;
  shrinking the read may cost that recall — hence a test, not an
  adoption (D3).
- **Counterexample:** the Hub's decision log rotated ten times (S4; S6
  counts twelve rotation events across all its memory files) and stayed
  near 26 live entries — the budget, not the rule shape, kept it small.
- **How we would know:** the next exposed v2 project's rule-1 read stays
  under a stated bound after a month of use, and S5-style recall on its
  record does not fall.
- **Also bears on canon:** no.
- **Assessment delta.** Checkpoint B reconciled the hot-read figures
  (the checker's own estimate is 6,566 words; the mandatory read with
  project-added files is 8,655). S5 added a risk to the remedy, since
  decision entries carry recall in the mandatory read, so D3 stays a
  test. Grade unchanged: Hypothesis for v2.

### V2F-4 — The owner works with several writers, agent-dispatched checks and pushes from the session; v2's posture assumes one writer, the record as handoff and a closed network

- **Studies:** S2, S3, S8, S9 (D2, D4, D10). **Grade:** Pattern for the
  practice as counted mechanically — pushes, dispatched runs, sweep
  commits and write overlaps (Video Pedagogy, vinyl, Route Plotter,
  Pattern Mapper, the Hub); Hypothesis for the S8 intent shares (sample
  agreement 0.667) and for v2's rules under the practice (one project).
  **Severity:**
  High — a core posture is contradicted daily in the only exposed
  project, which recorded the collisions itself. **Confidence:**
  Medium-High (session data by program; episodes double-scored).
- **Evidence.** One writer per checkout did not hold: three commits in
  Video Pedagogy swept another item's uncommitted ledger lines; the
  ledger refers to a concurrent session 20 times in five days; vinyl built four
  of six items twice in a parallel lane (S3). Plans reached Codex as
  prompts one agent wrote for another (318 runs), not through the
  ledger — record-borne handoffs were 6 of 49 episodes (S3). Every
  Codex run in the v2 week was read-only: the harness split is **Claude
  writes, Codex checks** (S3). Second-model verification is the largest
  process ask (10.2 % of owner prompts, plus 205 agent-dispatched
  runs) and has no v2 name (S8). The network stayed closed only where
  the harness enforced it (Codex); Claude Code in the desktop app did
  not apply the generated settings (37 pushes, 252 web calls) (S3). The
  owner asked agents to push 55 times (S8) and Video Pedagogy opened a
  standing push in its first week, editing `harness.mjs` and
  `verbs/close.md` (S2, S9).
- **Version anchor:** live.
- **What it costs now:** ledger collisions the project repairs by hand;
  a posture the contract states and the harness does not enforce; the
  commonest check the owner runs has no place in the record.
- **Remedy.** Three separable decisions (D4–D6): push/network as a
  profile choice with an enforced route; a named second-model check at
  close; rule 3 reworded to what the project actually needed (stage
  from HEAD; one writer per ledger file per commit). *Lighter:* state
  the gap in the README's posture and leave the rules. *Cost:* one line
  at close for the check; none per session for push.
- **Counterexample:** Route Plotter (canon) ran branches and pull
  requests with no ledger collision in the window.
- **How we would know:** no sweep commits and no hand-merged lanes in
  the next exposed project; second-model verdicts visible in the record.
- **Also bears on canon:** yes — canon's PAR-BRANCH and dispatch
  machinery exists for the same practice.
- **Assessment delta.** Checkpoint B moved the evidence off
  co-activity and restricted shells, onto write overlaps, the ledger's
  own sweep commits and hosted web calls. The dating pass cites canon
  4.21.1's Codex network note as fixed for canon's wording. The S3
  episode classes were double-scored, 12 of 12. Grade and severity
  unchanged.

### V2F-5 — Promises are lost in maintenance events, and prose deferrals rarely become lines

- **Studies:** S4 (D6). **Grade:** Pattern (every canon and v0.2 record
  where it could occur; one owner). **Severity:** Medium-High — lost
  work commitments (14 of 30 drawn in one Dot Matrix restructure).
  **Confidence:** Medium (promise identification judged; fulfilment
  double-scored).
- **Evidence.** 19 of 21 disappearances happened in a restructure, an
  archive or a compression; prose-origin promises became lines in few
  cases (0–2 per project drawn; Pattern Mapper census 4 of 12, the Hub
  1 of 8); explicit retirement is rare and batched (S4). v2's week:
  every wish-list line and Deferred field is structured (68 of 68, 9 of
  9), but the one prose deferral of the week never became a line (0 of
  1) — too young and too small to judge (S2, S4).
- **Version anchor:** canon — DEFERRAL-LINE (4.21.1) addresses the
  prose-to-line gap, unobserved (no deployment has taken it): *changed
  shape*. v2 — rule 5 says "nothing is dropped silently"; the checker
  cannot see a line that was deleted: *live*.
- **What it costs now:** a restructure can drop open work with no trace
  the validator or a reader can find.
- **Remedy.** *Tooling, small:* `check.mjs --commit` flags open
  backlog or wish-list lines removed in the commit that appear in no
  trajectory line, decision or item of the same commit. *Lighter:* the
  close verb's step 2 already says "retire paid lines"; add "a removed
  line names why in the commit". *Cost:* none per session; one check at
  close.
- **Counterexample:** the Route Plotter port carried every open line
  and paid them within eleven days; Derry's intake dropped none.
- **How we would know:** no disappeared promise in the next S4 trace of
  a v2 project older than a month.
- **Also bears on canon:** yes — the same check fits canon's validator
  fork.
- **Assessment delta.** S4's blind pass showed the run's fulfilment
  scores to be generous (mean 1.73 → 1.63 after adjudication); the
  terminal statuses the finding rests on are unchanged. The dating pass
  made the canon half *changed shape* (DEFERRAL-LINE, 4.21.1), so D7's
  canon part is a checker aid to an existing rule.

### V2F-6 — v2's upgrade note does not say to carry local tool edits or to upgrade in a commit of its own

- **Studies:** S9 (D8). **Grade:** Hypothesis (v2 side, one project);
  Pattern (canon side, eleven walks). **Severity:** Low — no v2 upgrade
  has happened, and the note already asks for a reviewed, deliberate
  upgrade. **Confidence:** High (byte comparisons).
- **Evidence.** v2's change note (V2-HONE, `fa9c7a9`) already says to
  compare the note and the diff with the installed copy, to replace
  tools and verbs as a reviewed set, to merge the contract deliberately
  and to keep every populated file (Checkpoint B corrected the run's
  first reading here). What it does not say: that local edits to the
  tools are carried forward (Video Pedagogy changed three tools and the
  close verb in its first week — a reviewed replacement drops them
  unless someone carries them); that the upgrade is a commit of its own
  (canon's one memory loss on record came from an upgrade commit that
  also carried a product revert); and that retired files are deleted.
  "Nobody walks the upgrade procedure" was wrong: eleven canon walks,
  all but one before mid-July.
- **Version anchor:** v2 live; canon — the 4.13.0 reinstall path post-dates
  Route Plotter's failed contract merge (*changed shape*); the
  upgrade-commit gap is live in `upgrade.md`.
- **Remedy.** *Clarify:* two sentences in "Existing installations" —
  carry local tool edits as a decision; upgrade in a commit of its own
  (and delete what the note retires). *Lighter:* do nothing until the
  first v2 upgrade. *Cost:* none per session.
- **Counterexample:** five intakes' tools are still byte-identical to the
  branch — no local edits to lose there.
- **How we would know:** the first v2 upgrade lands in its own commit
  with Video Pedagogy's local changes carried.
- **Also bears on canon:** yes (the upgrade-commit rule).
- **Assessment delta.** Checkpoint B showed the run's first reading
  ("re-copy the folder") to be the icebox's superseded wording. The
  finding was narrowed to the note's two remaining gaps, and its
  severity lowered from Medium to Low. S9 also corrected the tier's
  belief that nobody walks the upgrade procedure.

## 8. The decision table

Every decision this package asks for, in one table, then one entry per
design decision. "Ledger" says where the decision session records it:
**lab** = `<lab>/selfhost/project/decisions.md` under a v2 ID; **canon**
= `self/project/decision-log.md`.

| # | Decision (finding) | Recommendation | Confidence | Ledger |
| --- | --- | --- | --- | --- |
| D1 | Give project rules one named, budgeted home that rule 1 reads and the checker counts (V2F-1) | adopt | Medium-High | lab |
| D2 | Make delegated signing an explicit state; intake marks every field it cannot source (V2F-2) | adopt | Medium | lab |
| D3 | Rule 1 reads the latest ten decision headings and Decision lines, not whole entries (V2F-3) | test (in the V2-FIELD-1 project) | Low-Medium | lab |
| D4 | Push and network: a profile choice with an enforced route, not a fixed posture (V2F-4) | adopt | Medium | lab |
| D5 | Name the second-model check: one `Checked:` line at close (V2F-4) | adopt | Medium | lab |
| D6 | Reword rule 3's "one writer per checkout" to what the project needed (V2F-4) | amend | Medium | lab |
| D7 | The checker flags open lines removed without a trace (V2F-5) | adopt, v2 and canon | Medium | lab + canon |
| D8 | Upgrade note: carry local edits; upgrade in its own commit (V2F-6) | adopt | Medium | lab (+ canon for upgrade.md) |
| — | V2-FIELD-1: a fresh prospective project (A) or an amended continuation of Video Pedagogy (B) — section 10 | A | Medium | lab |
| — | R2: adopt the reshaped field hypothesis as R2-SUPERIORITY's blocker line, amend it, or record that the tier yields none — section 9 | adopt | Medium | lab |
| — | Icebox triggers the field has fired | dispatch and parallel lanes (the practice exists, ungoverned — D5/D6 take the small part); read tiers beyond the timing rule (V2F-3 → D3) | | lab |
| — | Icebox triggers not fired | release and upgrade machinery (no branch movement — D8 only); PROCESS.md (the Hub never ran its own); curricula; codecs; machine-native ledgers; janitor; file-per-record mode; improvement waves | | lab |
| — | Migration must-carry list (R3) | below | | lab |
| — | Retirement candidates | v2: the profile's "auto-memory is a cache" claim; the README's "never as chat" sentence. Canon: the design review gate; lite close | | lab / canon |
| — | Canon triage candidates | five, below | | canon |

### D1 — A home for project rules

- **Question.** Should v2 name one budgeted file for project rules that
  rule 1 reads and the checker counts, instead of letting each intake
  improvise?
- **Options.** (a) *Do nothing* — intakes keep writing rules files and
  amending rule 1. (b) *Count only* — the checker's read estimate counts
  every file rule 1 names; no new slot. (c) *Named slot* — the profile
  gains `Rules: project/rules.md (≤ N words)`, rule 1 names it, the
  intake verb step 5 writes it, and structure.md's "Where to look first"
  names runbooks and checklists (not read every task). (d) *Widen the
  profile* to hold the rules (fails: the census puts UI projects over
  budget before any project line, S7).
- **Evidence for.** Seven of seven intakes wrote a rules home; five
  amended rule 1; pointer carriage is most of the in-force fidelity
  (S1, Pattern); canon additions without a v2 home 13–25.5 %, generic-only
  23–24 % (S7, Pattern); the read estimate is wrong where rules files
  exist (S6). **Against.** It grows the core by a slot (rule 12's budget
  question); Marketing and Personal Finance managed with pointers.
- **Cost, by option, every project, every session.** (a) None new —
  the improvised files are read anyway, uncounted (Pattern Mapper ≈ 8,100
  words against 3,432 reported). (b) None per session; the reported
  estimate rises to the truth. (c) The rules file's words, capped:
  Pattern Mapper's is 4,085 today, and a cap near 1,500 would make its
  owner move procedures into runbooks, a one-off split per large
  project. (d) Fails the 400-word profile budget.
- **If this is one person's habit.** Another owner might keep rules in
  the brief or in decisions; the slot then sits empty at no read cost.
- **Acceptance test.** Confirm: across the next three intakes, none
  writes a rules file outside the schema or amends rule 1, and the
  checker's estimate is within 5 % of the measured mandatory read.
  Reverse: one of them invents a second rules file, or a capped rules
  file exceeds its cap at two consecutive harvests.
- **Recommendation.** (c), with (b) as its first step. Confidence
  Medium-High.
- **Amendment choices.** The cap; whether decisions carry invariants
  instead (ties to D3); whether the rules file is signed with the
  profile.
- **Ledger.** lab.

### D2 — Delegated signing, and no unmarked guesses

- **Question.** Should the intake record delegated signing as its own
  state, and should the intake mark every profile field it cannot
  source?
- **Options.** (a) *Do nothing.* (b) *State:* `Signed (delegated, not
  reviewed): <owner>, <date> — see <authority file>`; the view lists it
  as needing the owner until a review line replaces it. (c) *Sourcing:*
  intake step 3 marks every field it cannot source as a guess (the
  Handoff role split included), and the Secrets store becomes a required
  placeholder the checker fails on. (d) Both. (e) Require the owner's
  own review before the
  first close (heavier).
- **Evidence for.** 7 of 7 signatures agent-written; step 2 never ran;
  10 unmarked guessed or template-default fields across five profiles; migration
  scope leaked in three (S1, Pattern/Hypothesis). **Against.** Every
  record already says the signature was delegated — the honesty exists
  in prose; a new state adds grammar.
- **Cost, by option.** (a) None. (b) One line per install and one owner
  review per install (a 400-word profile and a 300-word brief). (c) A
  guess mark per unsourced field, and one failing check until the
  Secrets store is named. (d) Both. (e) The first close waits on the
  owner's time.
- **If one person's habit.** An owner who is present at intake signs
  normally; the delegated state is unused.
- **Acceptance test.** Confirm: at the next three intakes, no
  unsourced field is unmarked (checked as in S1), and every delegated
  signature gives way to a reviewed one within two weeks. Reverse: a
  delegated signature is still unreviewed after four weeks in two
  projects — the state has become noise.
- **Recommendation.** (d). Confidence Medium.
- **Amendment choices.** Whether migration-only instructions get an
  explicit expiry mark (the leakage symptom).
- **Ledger.** lab.

### D3 — What rule 1 reads of the decisions

- **Question.** Should rule 1 read the latest ten decision headings and
  Decision lines (bodies on demand), as canon reads headings, rather
  than ten whole entries?
- **Options.** (a) *Do nothing.* (b) *Headings + Decision lines.* (c)
  *An entry-length cap* the checker warns on. (d) Invariants move to the
  rules slot (D1) and decisions stay as they are.
- **Evidence.** The latest ten were 4,593 of the checker's 6,566-word
  estimate in the one exposed week (Hypothesis); entry count does not
  bound size in
  Dot Matrix, vinyl, the Hub (Pattern). **Against.** In S5's
  mandatory-read arm, v2's rule-1 read recovered shipped work and
  deferrals chiefly through the decision entries — their IDs and
  Deferred fields — because neither the trajectory nor the wish-list is
  in rule 1. A headings-only read would cut that channel. The latest
  ten in full are also what makes v2's recent reasoning immediately
  available, and one week is thin.
- **Cost, by option, every session.** (a) The latest ten in full —
  4,593 words at day 8 in Video Pedagogy — growing with entry length.
  (b) Roughly a tenth of that, with a recall risk where the why sits
  only in the body. (c) A warning per long entry and the writer's time
  to shorten it. (d) As D1.
- **If one person's habit.** Video Pedagogy's long entries reflect one
  writing style; a terser project would not need it.
- **Acceptance test.** Test in the V2-FIELD-1 project, measuring both
  reads on the same record: at day 42 the shortened rule-1 read stays
  under the stated bound, and a fresh reader given only it scores ≥ 7
  of 8 and no lower than a reader given the unchanged read (S5's
  method). Reverse: the shortened read scores lower than the unchanged
  one on shipped work or deferrals.
- **Recommendation.** *Test*, not adopt. Confidence Low-Medium.
- **Amendment choices.** Headings only vs headings + Decision lines.
- **Ledger.** lab.

### D4 — Push and network

- **Question.** Should push and session network be a profile choice with
  a route the harness actually enforces, rather than v2's fixed "closed;
  the owner pushes from outside"?
- **Options.** (a) *Do nothing* (the posture stands; projects amend it
  locally, as Video Pedagogy did). (b) *Profile choice:* the Push line
  names the route (owner-operated, or harness push to one host), and
  `harness.mjs` generates the matching setting (Video Pedagogy's local
  change is the template). (c) Keep closed and fix enforcement in the
  desktop app first.
- **Evidence for.** 55 owner prompts ask the agent to push (S8); Video
  Pedagogy opened a standing push in week one (S2, S9); the desktop
  app's Claude Code did not apply the closed settings (S3); Storage
  Tidy's owner rule was to push at every close (S1). Pattern for the
  observed practice (pushes counted mechanically); the 55 push asks come
  from S8's single-scored census (Hypothesis).
  **Against.** A closed session is v2's security premise; opening push
  widens what an agent can do unattended.
- **Cost, by option.** (a) None per session; each project keeps editing
  its tools locally, and the posture stays unenforced in the desktop
  app. (b) None per session; a one-off profile choice at intake, and
  one route per host in the harness generator. (c) Waits on a client
  change outside any project's control.
- **If one person's habit.** Another owner may want closed sessions —
  (b) still offers closed as a choice.
- **Acceptance test.** Confirm: over the next exposed month, session
  logs show the chosen route used and a denied operation refused in
  each harness actually used — observed operations, not generated
  settings — and no project edits `harness.mjs` or `close.md` to change
  the push rule. Reverse: a push or network call the profile does not
  allow succeeds, or a push the owner did not intend.
- **Recommendation.** (b). Confidence Medium.
- **Amendment choices.** Which hosts; whether web fetch is also a
  profile choice (252 web calls in the exposed week, almost all
  owner-authorised).
- **Ledger.** lab.

### D5 — Name the second-model check

- **Question.** Should the close verb carry an optional `Checked:` line
  naming the second model that verified the work and its verdict?
- **Options.** (a) *Do nothing* (the practice runs outside the record).
  (b) *One optional line at close.* (c) Take dispatch and parallel lanes
  out of the icebox as a verb (heavier).
- **Evidence for.** The largest process ask (10.2 % of owner prompts)
  plus 205 agent-dispatched runs (S8); every Codex run in the exposed
  week was a read-only check (S3); this study itself runs on the pattern.
  Pattern for the counted runs; the 10.2 % share is S8's single-scored
  census (Hypothesis). **Against.** Rule 12's budget; the line is
  optional and may be
  noise.
- **Cost, by option.** (a) None; the checks stay out of the record.
  (b) One line on each close that had a check. (c) A new verb file,
  read whenever a lane is dispatched, and one existing rule retired
  under rule 12 to make room.
- **If one person's habit.** Unused by an owner with one model.
- **Acceptance test.** Confirm: over the next exposed month, with at
  least five closes whose session logs show a second-model run, a
  `Checked:` line appears on at least three quarters of them. Reverse:
  `Checked:` lines appear on closes with no such run. Fewer than five
  such closes: inconclusive.
- **Recommendation.** (b). Confidence Medium.
- **Amendment choices.** Line in the commit vs in the decision entry.
- **Ledger.** lab.

### D6 — Rule 3's writer clause

- **Question.** Should "one writer per checkout" become "one writer per
  ledger file; stage only this item's lines from HEAD"?
- **Options.** (a) *Do nothing.* (b) *Reword* as above (Video Pedagogy
  built this tooling itself after three sweep commits). (c) Enforce one
  writer mechanically (a lock file).
- **Evidence.** Three sweep commits and 20 ledger notes about a concurrent
  session in the exposed week; vinyl's parallel lane built four of six
  items twice;
  Route Plotter's branches merged cleanly through the gate (S3).
  Pattern for the practice; Hypothesis for v2. **Against.** The rule is
  right in principle; rewording legitimises concurrency the record
  cannot fully coordinate.
- **Cost, by option.** (a) None; the sweep commits continue. (b) A
  staging habit at close — only this item's ledger lines — a minute per
  close. (c) A lock check at every session start, plus a manual clear
  after each crashed session leaves a stale lock.
- **If one person's habit.** An owner who runs one session at a time
  never meets the case, and the reworded rule costs nothing there.
- **Acceptance test.** Confirm: no sweep commit (a commit carrying
  another item's ledger lines) in the next exposed month, in which at
  least two sessions wrote to the ledger concurrently. Reverse: two or
  more sweep commits, or ledger conflicts at merge. No concurrent
  writing in the month: inconclusive.
- **Recommendation.** (b). Confidence Medium.
- **Amendment choices.** Whether staging only this item's lines is
  checked (a diff of staged ledger files at close) or stays an
  instruction in the close verb.
- **Ledger.** lab.

### D7 — A trace for every removed line

- **Question.** Should `check.mjs --commit` flag an open backlog or
  wish-list line removed in the commit with no trajectory line,
  decision or item mention in the same commit?
- **Options.** (a) *Do nothing* (rule 5's sentence). (b) *The check.* (c)
  A close-verb sentence only.
- **Evidence.** 19 of 21 lost promises vanished in maintenance events
  (S4, Pattern); the checker cannot see a deleted line today.
  **Against.** False positives on legitimate reorganisations.
- **Cost, by option.** (a) None; losses stay invisible. (b) None per
  session; at close the writer answers each flagged removal — a few per
  restructure, some of them false positives on legitimate
  reorganisations. (c) One sentence in the close verb, unchecked.
- **If one person's habit.** A project that never restructures its
  lists never triggers the check.
- **Acceptance test.** Confirm: in the next S4 trace of a v2 project
  more than a month old, with at least one archive step, restructure or
  compression in the window, no promise disappears. Reverse: the check
  is overridden on more than half of its flags.
- **Recommendation.** (b), in both v2 and canon's validator.
  Confidence Medium.
- **Amendment choices.** Whether a removal may be justified in the
  commit body instead of a ledger line; whether the check fails or
  warns.
- **Ledger.** lab + canon.

### D8 — The upgrade note

- **Question.** Should v2's "Existing installations" add that local tool
  edits are carried forward as a decision, that the upgrade is a commit
  of its own, and that retired files are deleted? (The note already
  requires a reviewed comparison and a deliberate contract merge.)
- **Options.** (a) *Do nothing until the first upgrade.* (b) *Two
  sentences now.*
- **Evidence.** Video Pedagogy's four local edits; canon's one memory
  loss came from a bundled product revert (S9, Hypothesis/Pattern).
  **Against.** No v2 upgrade has happened; the review step may already
  catch local edits.
- **Cost, by option.** (a) None now; the first upgrade may drop local
  edits. (b) None per session; at each upgrade, carrying the local edits
  and a separate commit — the canon walks took 20–35 minutes each (S9).
- **If one person's habit.** Projects that never edit the tools lose
  nothing either way.
- **Acceptance test.** Confirm: the first v2 upgrade lands in a commit
  of its own and keeps each local edit, or records its removal as a
  decision. Reverse: a local edit is lost in an upgrade.
- **Recommendation.** (b). Confidence Medium. Canon: the upgrade-commit
  sentence in `upgrade.md` (candidate below).
- **Amendment choices.** One decision entry per carried edit, or one
  per upgrade; whether retired files are deleted by the note's
  instruction or by a tool.
- **Ledger.** lab (+ canon for upgrade.md).

### Migration must-carry list (R3-MIGRATION input, from S7)

For every canon project: the brief's product constraints (fit in 300
words); the profile's stack lines (fit); convention and standards lines
(exceed the 400-word profile once UI standards are adopted — D1); one to
fourteen architecture invariants per project (only as decisions today —
D1/D3); runbooks, checklists and catalogues (no home — repository
documents named in structure.md); protected paths and approval rules
(brief constraints for product-level; no home for module-level); the
harness know-how in agent memory (no slot; 58 % of kinds); open
promises carried verbatim (the Route Plotter port and Derry intake show
it can be done without loss).

### Retirement candidates

- **v2 — the profile's harness-line claim** "each harness's own
  auto-memory is a cache; this ledger is the truth": 58 % of what the
  harnesses kept has no slot in the ledger (S7, single-scored). Retire
  the claim; keep "the ledger is the record".
- **v2 — the README's "never as chat"** in the posture paragraph:
  record-borne handoffs were 6 of 49 in the exposed project (S3); reword
  to what D5/D6 decide.
- **Canon — the 14-point design review gate** in the UI-STANDARDS
  template: cited in 2 of 616 commits across four 4.x UI projects,
  and carried with no trace of use by seven more (S7) — absent evidence,
  not demonstrated non-use. v2 already omits it.
- **Canon — lite close:** no `Close: lite` trailer in any deployment
  where it could be judged (S7); field-study-2's addendum left it as a
  watch, and the watch has now read zero across the tier.

### Candidates for canon triage (ticket grammar)

```text
id: DESIGN-GATE-RETIRE
name: Retire the design review gate from the UI template
status: todo
milestone: next
date: 2026-09-24
summary: 2 of 616 commits in four 4.x UI projects cite it; seven early deployments carried it unexercised (V2-FIELD-STUDY S7). · Medium / Low / Low / Low

id: LITE-CLOSE-RETIRE
name: Retire lite close; keep the secondary-session close
status: todo
milestone: next
date: 2026-09-24
summary: zero Close: lite trailers across every judgeable deployment; the field-study-2 watch reads zero (S7). · Low / Low / Low / Low

id: UPGRADE-COMMIT-PURE
name: An upgrade is a commit of its own
status: todo
milestone: next
date: 2026-09-24
summary: the one memory loss on record came from an upgrade commit carrying a product revert (the Hub, 3.1.0; S9). One sentence in prompts/upgrade.md. · Medium / Low / Low / Low

id: DROP-TRACE-CHECK
name: The memory checker flags open lines removed without a trace
status: todo
milestone: next
date: 2026-09-24
summary: 19 of 21 lost promises vanished in restructures, archives and compressions (S4); both check-memory forks. · Medium / Medium / Low / Low

id: HARVEST-SCAN-GAPS
name: Three harvest-method fixes the study found
status: todo
milestone: next
date: 2026-09-24
summary: entropy check for unformatted tokens in prompts exports; compare staged memory with HEAD, not with the working tree; cumulative prompts export per project (section 13). Source-only. · Medium / Low / Low / Low
```

## 9. An R2 hypothesis

**The candidate** the second witness put at design time: *v2 preserves
independently assessed retrieval and open-list accuracy with fewer
maintenance repairs and owner interventions at comparable exposure.*

**What S4, S5 and S6 say about each clause.**

- **Retrieval — reshape.** On whole records, recall is at the ceiling
  for every substrate: the adjudicated class means run from 0.90 (no
  framework) to 1.00 (v0.2 and the unversioned trees), with v2 at 0.96
  and canon 4.x at 0.91, and six of the seven crossings scored the same
  before and after the intake (S5). At that ceiling, "preserves
  retrieval" is true
  of every substrate and cannot tell them apart. On the mandatory read
  alone the substrates separate: v2's rule-1 read averaged 7.0 of 8 at
  a median 6,078 words, canon 4.x's every-task read 6.7 at 12,893, and
  v0.2's contract 2 — but six of the seven v2 reads were taken on intake
  day. The claim worth testing is about *what the mandatory read
  answers, and at what reading cost*, not about whole-record retrieval.
- **Open-list accuracy — untested.** v2 has one censored week: no v2
  promise has been traced to an outcome beyond eight days (S4). In
  canon and v0.2 records, 19 of 21 lost promises vanished in
  maintenance events. So the observable exists — disappearances per
  maintenance event — but it has not yet been read on v2.
- **Fewer maintenance repairs — weakened.** Repair commits per commit:
  - Video Pedagogy, 3 of its 73 v2 commits;
  - canon 4.x records with a month or more of use, 5.9–9.7 %;
  - vinyl (v0.2), 2.5 %.

  The exposures are not comparable, and one week's repairs say
  nothing about a quarter's (S6).
- **Fewer owner interventions — weakened.** The owner restated an
  instruction or authority in 8 of 12 sampled handoff episodes, across
  all three substrates. Video Pedagogy's owner replaced the intake's
  brief on day 2. No per-substrate difference is visible (S3, S2).
- **Comparable exposure does not exist in the tier.** One v2 project
  has eight days of use; the canon projects have one to six months.

**The reshaped hypothesis, in falsifiable form.**

> **R2 (field form).** Six weeks after a v2 intake, in a project with
> at least 60 commits since the intake, the reading v2's rule 1 makes
> mandatory answers the four recall questions at least as well as the
> every-task reading of a canon 4.x project of similar age and activity
> does. Both are given to a fresh reader alone and blind-scored against
> keys built from Git. The v2 reading is also no longer than the canon
> reading in words, counting every file the contract makes mandatory,
> including project-added rules. And no open promise disappears in a v2
> archive step or restructure.
>
> **Falsified if** any of these holds:
>
> - the v2 hot-set score is lower by 1 point or more on the 8-point
>   probe;
> - the v2 mandatory read is longer than the canon one;
> - a promise vanishes in a v2 maintenance event (an archive step, a
>   restructure or a compression) with no line, decision or trace.
>
> **Fixed in advance.** The comparator is matched within ±14 days of
> age since install and within a factor of two in commits. Below 60
> commits at day 42, the reading is reported but neither confirms nor
> falsifies. Zero disappearances count only if at least one archive
> step, restructure or compression fell in the window. If D3's
> shortened read is under test, both the unchanged rule-1 read and the
> shortened one are probed on the same record, and the hypothesis is
> judged on the unchanged read.

Two readings in this study bear on it. Video Pedagogy's mandatory read
at its eight-day HEAD — 8,655 words, project-added reads included —
scored 6 of 8. The two active canon 4.x comparators: Route Plotter's
read (7,657 words, 38 days after its install) also scored 6, and the
Video Helper's (12,893 words, 28 days) scored 7. Against Route Plotter
the size clause already fails, since v2's read is the longer, while the
score clause holds. Against the Video Helper both clauses hold. Neither
pairing is at matched age, so the hypothesis is neither supported nor
falsified yet.

**The field observable.** Four measurements, all taken on the
V2-FIELD-1 project at its day-42 reading:

- S5's hot-set arm;
- S6's word count of the mandatory read;
- the same probe, by the same method, on a canon 4.x record matched as
  fixed above — a canon project started alongside, or a historical
  HEAD of an existing canon project at the matching age (the tier
  already holds two in range: the Video Helper at 28 days and Route
  Plotter at 38). The first matching record
  by date is chosen before the v2 reading is scored; if none matches,
  the comparison is reported as inconclusive;
- S4's trace across every v2 archive step, restructure and compression
  in the window.

**The experiment** is V2-FIELD-1 Option A (section 10) with the matched
canon comparator:

- keys built by a session that never sees an answer;
- readers given only the mandatory set;
- scoring done three ways, as here.

One pair of projects gives a Hypothesis-grade result, and a second
pair lifts it to Pattern. **What this tier cannot supply:** any v2
reading past eight days, and any project not built by the owner.

## 10. V2-FIELD-1

V2-FIELD-1 pre-registers criteria for the branch's first real project
"before session one". Seven projects are already exposed, so none of
them can satisfy that; Video Pedagogy's first week is the only use, and
it is now read here. Two ways forward for the decision session:

**Option A — a fresh prospective project.** Pre-registration, to be
signed before its first session:

- *Project:* one not yet in the tier (or a fresh copy), chosen by the
  owner; one harness pair named in the profile's Handoff line.
- *Criteria at two weeks and at six weeks:* (1) recall — a fresh
  session given only the mandatory read (rule 1's set plus every file
  the contract adds) scores ≥ 7 of 8 on the four questions, scored
  blind against a key built from Git (this study's S5 method); the
  whole record is scored as a control, since on whole records every
  substrate here reached the ceiling;
  (2) the open list — no promise disappeared in a restructure, archive or
  compression, traced as in S4; (3) the view shows every `[!]` line;
  (4) digest rules named at close on at least three of four tasks that
  touch an adopted standard; (5) the rule-1 read stays under a stated
  bound (set it now; S6 suggests 8,000 words); (6) no ledger sweep
  commit (S3); (7) the external accessibility audit the item names;
  (8) if R2's field form is adopted, the matched canon comparator probed
  on the same dates by the same method (section 9).
- *Probes:* the harvest takes exports at day 14 and day 42; S5's keys
  are built by a session that never reads the answers.
- *Dates:* start on the owner's word; the two readings fall 14 and 42
  days after the first session.

**Option B — an amended, clearly prospective continuation of Video
Pedagogy.** Disclose the interim readings (S2: the commit shape held on
every commit, three sweep commits broke rule 9's staging, and one prose
deferral never became a line;
plan fired three times; no phase close yet; decisions dominate
the read; the project changed three tools and the close verb; S3: three
sweep commits; S5: whole-record recall 8 of 8 at all three of its HEADs,
and 6 of 8
from the mandatory read at its latest) and register
the same criteria from the date of signing, reading at +14 and +42
days. It is not the pre-registered trial the item describes: the
project chose its own posture changes before the criteria existed.

**What the tier cannot supply for either:** a second week of any v2
project; a fresh-session recall taken *by the project* (S5 here is the
study's, after the fact); the external accessibility audit; any project
not built by the owner.

## 11. The invariant-gap table

Updated from the table the last runs left: run one's drift note
(2026-08-17) for I1 and I3–I7, and run zero's table (2026-08-08) for
I2 and I8, which run one did not revisit; run two did not update it.
Columns: the invariant, where canon stood, what this run's evidence
says about v2.

| Invariant | Canon, as last recorded | v2 on this evidence |
| --- | --- | --- |
| I1 single source, dual readability | markedly improved (records, imports) | the ledger is single-source, but every intake put project rules outside it (V2F-1); the view is generated, not committed, in the one exposed project |
| I2 checked or judged | memory rules partly hoped | shape is checked; the read estimate, deleted lines (V2F-5), signatures and template defaults (V2F-2) are not |
| I3 stable identity prefix | met (imports) | contract 395–482 words; the rule-1 read moves to decisions and project-added files (V2F-1, V2F-3) |
| I4 replayable history | nominally met, practically starved | every commit carries ID and Verify in the exposed week; handoffs travel as prompts outside the ledger (V2F-4) |
| I5 regression visibility | regressed in practice | the lab's 36 regressions exist; local edits to tools in a consuming project are invisible to them (V2F-6) |
| I6 priced attention | counters live, one reader | the owner's attention went to prepared prompts, not to intake questions (V2F-2); 72 of 73 commits declare a checker result — a declaration, not proof of review |
| I7 rent-paying overhead | needed a net ledger | v2 dropped the ceremonies the field carried with almost no trace of use (section 6); the plan verb pays; recall had no opportunity |
| I8 evidence-gated structure | adopted as policy | this package; V2-FIELD-1 and R2 still without field evidence |

## 12. Unresolved uncertainties

| Unknown | What was inspected | Safest assumption | Decisions that depend on it |
| --- | --- | --- | --- |
| Whether the six prepared intakes differ from an owner-present intake | the six prompts; Storage Tidy's separate intake | intake behaviour here is the prepared-prompt case only | D1, D2 |
| What the preparation packages contained | nothing (outside the tier) | the "supplied" profile fields may have been asked earlier, off the record | D2 |
| Whether the blind scorers and readers saw only their own material | every tool call of every session, audited: each read only its own file (C.1); not shown — the standing session context each inherited, and whether each read its file to the end | each saw its own file plus the repository's standing context | all judged grades |
| Held-clone merges in Video Pedagogy after the cut-off | nothing after `2026-09-24T11:40Z` exists in the tier | unknown; could add ledger conflicts | D6 |
| Whether pointer-carried obligations are read in practice | S1's classification; no session evidence of reading them | treat them as retained, not in force | D1 |
| v2 behaviour past one week, in any project but one | — | none can be inferred | every v2 decision (grades capped) |

## 13. What this study could not see, and what the next harvest must capture

- **A project not built by the owner.** Every grade is capped by it.
- **A second exposed v2 project, and any v2 project past a week.** The
  next harvest should take Video Pedagogy's exports at +14 and +42 days
  from its intake and whichever project V2-FIELD-1 selects.
- **The intakes' preparation packages** (`~/v2-prep-2026-09-16/…`,
  cited by absolute path in the records): the next harvest should file
  them beside each intake's `upgrade` report, since S1's "supplied"
  class rests on them.
- **The v2 view.** It is generated and ignored in the exposed project;
  the harvest should render and file it at each HEAD so the "view shows
  what needs the owner" criterion can be read.
- **Working-tree state at a minute.** S3 could not recover uncommitted
  ledger edits; a harvest cannot either — record it as a limit.
- **Changes `self/FIELD-HARVEST.md` needs:** (1) the credential scan
  missed an unformatted 24-character token in a prompts export (the
  Hub's); add a length-and-entropy check to the scan or a review step;
  (2) the 2026-09-16 Derry delta note's finding of no memory change compared the
  working tree with the index, not the index with HEAD — the harvest
  should compare staged and committed memory separately; (3) prompts
  exports cover only new or changed sessions, so earlier sessions of
  twice-harvested projects are missing from any prompt census — file a
  cumulative prompts export per project.

## 14. Appendices

### A. The rubrics as frozen

Frozen 2026-09-24T16:26:49Z, before the first score, SHA-256
`d5ba8861b62a5e591d4286dc4177eef177eb9f1f9831ab4d897f0d659e3ed7a6`
(sealed in the run's seal list). Reproduced verbatim below, apart from
this heading and the demoted subheadings.

The instrument's rubrics (`self/V2-FIELD-STUDY.md` → "Rubrics") with the
Checkpoint A adoptions (A2–A18, listed in the Checkpoint A record, Appendix F)
written in. Nothing here changes after the first score is written.

#### S1 — intake fidelity

**Obligation unit.** One sentence or list line in the baseline's
memory, rulebook, start file or README that states a constraint, a
commitment, an open item, a blocker or an approval boundary. Scope:
the baseline's *in-force* surfaces — rulebooks, brief, conventions,
architecture constraints, backlog (open items and their blockers),
wish-list, open tickets/records, the live decision log's Decision
lines, the owner's start files and README; archived chunks and derived
files (file maps) are out of scope and said so. A baseline with no
such statement yields no units. Where a surface exceeds what a census
can cover, units are drawn by seeded random sample (seed `20260924`)
stratified by surface, and the sampling fraction is reported.

**Classes** (each unit gets exactly one):

- *preserved-active* — present with the same meaning in the v2 active
  record: a file rule 1 reads (profile, brief, backlog, the latest ten
  decisions), or an item file, digest, rules file or decision that the
  active record names by path or ID.
- *preserved-retained-only* — present only in an archived or retained
  copy (e.g. `project/archive/pre-v2/`, the retained canon tree) or
  behind a pointer to it; not in force for a rule-1 reader.
- *merged* — present in the active record combined with others,
  meaning kept.
- *omitted* — absent from both.
- *unresolved* — present but contradicted, weakened, or left as a
  placeholder.

Reported raw and **deduplicated** (units with the same meaning in
several baseline files collapse to one obligation). Approval-boundary
units are reported as their own row.

**Profile field origin** (per populated field of the v2 profile):
*inferred* (traces to a repository file), *supplied* (stated by the
owner unasked, in the launching prompt or a preparation package the
record cites), *asked* (the thread asked and an answer came), *guessed
and marked*, *guessed and unmarked*, *placeholder*.

**Judged J1 — meaning, blockers and approval boundaries survived (0–2).**
2 = every blocker and approval boundary in force at the intake is in
the active record with its meaning intact; no obligation's meaning is
inverted or weakened; any omission is trivial (duplicates, formatting,
work explicitly retired). 1 = most survive, but at least one in-force
blocker, approval boundary or acceptance condition is missing,
weakened, or survives only retained-only; none inverted. 0 = several
in-force blockers or approval boundaries lost or retained-only, or any
inverted or contradicted.

**Judged J2 — profile grounded in the repository (0–2).** 2 = every
profile field traces to a repository file, an owner statement or an
owner answer, and every guess is marked. 1 = mostly traceable, but at
least one guessed field unmarked, or one claim the repository does not
support. 0 = largely generic or template text, placeholders remain, or
several unsupported claims.

#### S3 — handoff episode

A plan or item written in one harness's session and executed in a
different harness's session within seven days, identified from opening
prompts, IDs and cwd. Cap: twelve episodes — all if twelve or fewer are
detectable, else twelve by seeded random sample (seed `20260924`)
stratified by project. Restriction stated in the package: cross-harness
and seven-day only; same-harness delegation is counted separately where
visible and never enters the episode count. Episode classes: *record*
(the executor's needs were in backlog lines, item files or decisions),
*hybrid* (record plus facts carried only in the launching prompt or
chat), *chat* (the plan reached the executor only as chat). Merges and
conflicts are read from history (bundles, git logs), never inferred from
the absence of markers in a snapshot.

#### S4 — promise

A deferral, follow-up, phase commitment, wish-list line or superseded
decision, one unit each. **Terminal status:** *fulfilled* (work
evidenced), *explicitly retired* (a line or decision says so),
*disappeared* (no line, no decision, no work), *pending* (window still
open — censored), *unknown* (the later evidence needed is not filed).
Recorded separately: *promoted* (became an item — a transition, not a
terminal state); *work evidenced* (yes/no); *line retired* (yes/no), so
"shipped but still open" falls out of the same trace. Opportunities
are reported two ways: plan and phase-close events; and all later
closes. Fulfilment judged 0–2: 2 = the work fully paid the promise;
1 = partly; 0 = not.

#### S5 — record and keys

**Record per substrate.** Unversioned and canon — the memory export
(`pm_skills/project/`) plus the root rulebooks; v0.2 — `project/` plus
the contract and curricula; v2 — `project/` (profile, brief, backlog,
decisions, trajectory, wish-list, items, digests) plus the contract;
folder projects without Git — the history export, question 1 not
scored unless the release archives give an order. **Eligible HEADs:**
every filed memory or history export; the same project at two HEADs is
two records; the Claude/Codex twin exports of one HEAD count once;
install-time "memory as first committed" exports with no shipped work
are excluded (Q1 has no key). **Hot-set arm (A2):** at each project's
latest eligible HEAD where the mandatory read set is materially smaller
than the record, a second reader receives only the mandatory set.

**Keys.** Q1 — the last four item-bearing commits in the git-log export
(projects without ID titles: the last four non-merge commits that
changed product files). Q2 — any decision entry in the record with a
stated why; the scorer checks the named entry exists and its why is
right. Q3 — the record's own deferral lines (wish-list, deferred or
icebox backlog lines, deferral entries) with where they are recorded.
Q4 — the first open backlog item and its phase or milestone. Readers
never see a key.

**Scoring** (v2's recall rubric, `<lab>/next-v2/verbs/recall.md`):
per question 0–2 — 2 supported with the why or where; 1 partial; 0
missing or wrong. Fewer than four shipped items: naming all and saying
so scores 2. An empty deferred list or no next item: citing the empty
list and the owner-direction record scores 2. N/A cells (no key
possible) are excluded from denominators and counted.

#### S7 — rulebook census

Divergence classes (`self/FIELD-STUDY.md` D7): filled placeholder,
addition, deletion, rewrite — against the distribution template at the
project's version, located by the commit that set `pm_skills/VERSION`
(templates at root before 4.0.0, under `pm_skills/templates/` from
4.0.0). Each addition's v2 home: *named slot* (a profile field, a
schema section or a digest designed for that kind of content, within
the profile budget), *generic only* (only a decision entry or a
free-form item could hold it), *none*.

#### S8 — owner directives

Sampling frame: every maintainer prompt in the `-export-prompts.md`
exports, excluding Codex Desktop imports, guardian auto-reviews and
spawned threads (by session kind). Intents: plan the next phase; do the
next item; run the whole backlog; review; verify with a second model;
deploy or make live; audit or repair memory; fix a defect; explain;
harvest or file evidence; other. Each prompt gets one primary intent
and any secondary intents; counts use the primary; the multi-intent
share is reported. The mapping to v2 distinguishes task execution from
process support. Double-scored sample: sixty prompts, seed `20260924`,
stratified by project (at least two per project where the frame
allows). Agreement is reported as agreement (reliability), not as an
error band; population figures classified by one scorer are graded no
higher than *Hypothesis* unless sample agreement is at least 0.9.

### B. Sanitised evidence summaries

Numbers only, and paths into the tier. No line of any project's record,
prompt or session appears here; where a finding needs content it is
paraphrased.

#### B.1 Corpus ledger — one row per project and filed HEAD

Lane: T tracked, L local, T+L both. Sessions: attributed by the
harvest across all stores (CC Claude Code, Cx Codex; "int" Codex
interactive, the rest imports, guardian runs and spawned threads).

| Project | Lane | Filed HEAD (date) → substrate class | How reached | Kinds present | Horizon (attributed sessions) | Harnesses (CC / Cx) | Witness |
| --- | --- | --- | --- | --- | --- | --- | --- |
| digital-art-audience-hub | L (+T note) | `a089018` (05-03) unversioned (init export); `fc4df64` (08-17) canon 4.6.0 + records mode | unversioned install → 8 upgrade commits 1.0.0 … 4.6.0 → records mode `a7e6999` | export, upgrade ×9, validator, note | 04-24 → 08-29 (102) | 0 / 102 (87 int) | Claude Code harvest 09-24 (first harvest) |
| derry-lane-development-system | L | `375e102` (08-23) canon 4.6.0; `665f36b` (09-16) **v2 intake**, canon tree retained | 4.4.0 → same-day fresh reinstall 4.6.0 → v2 INTAKE | export, upgrade, validator, note (local) | 08-16 → 09-16 (48) | 12 / 36 (4 int) | CC harvests 08-23, 09-16, 09-24 |
| pattern-mapper | T+L | `3d5baa5` (07-17) canon 3.17.1 init; `348eb16` (08-28) canon 4.0.0; `24c9e93` (09-16) **v2 intake**, canon retained | 3.17.1 install → **walked** 4.0.0 upgrade same day → v2 INTAKE | export, upgrade, validator, note | 07-16 → 09-16 (141) | 75 / 66 (16 int) | CC harvests 09-16, 09-24 |
| storage-tidy | L (+T note) | `0c0413d` (09-11) v0.2 init; `eb96fbc` (09-13) v0.2; `267e031` (09-16) **v2 intake** (upgrade report only) | v0.2 from first commit → v2 INTAKE (not by the six-thread wave) | export, janitor, validator, upgrade, note | 09-11 → 09-15 (10); **no filed evidence after 09-16** | 5 / 5 (0 int) | CC harvest 09-16 |
| marketing-skills | L (+T notes) | folder (09-09 history) none; `889b65f` (09-16) **v2 intake** | no repository → BASELINE + INTAKE commits by the intake thread | export, validator, upgrade, note | 09-08 → 09-16 (22) | 1 / 21 (4 int) | CC harvests 09-16, 09-24 |
| uon-video-helper | T+L | `09702c2` (08-27) canon 4.9.2; `c346581` (09-21) canon 4.9.2 | 4.6.0 install → same-day **reinstall** 4.9.2 | export (+`-codex` twins), note | 08-24 → 09-21 (103) | 13 / 90 (7 int) | CC + Codex harvests 08-27; CC 09-24 |
| route-plotter | T+L | v2 line `5b19787` (06-18) canon 2.3.0; `6f2ac15` (08-27) canon 4.7.0 (CC + Codex twin exports); `989f11d` (09-24) canon 4.7.0 | v2 line (unversioned → 2.3.0 upgrade) → **fresh install** 4.7.0 with memory ported; refused 4.9.2 | export (+twins), note, review | 03-27 → 09-24 (140) | 28 / 112 (51 int) | CC + Codex 08-27; CC 09-24 |
| vinyl-sorting | T+L | `2bc9260` (08-30) v0.2 init; `60c3c4b` (09-01) v0.2; `06f6c90` (09-23) v0.2 | canon 4.9.2 installed by mistake and removed → v0.2 vendored | export, janitor ×2, validator ×2, note | 08-28 → 09-23 (418) | 38 / 380 (169 int) | CC harvests 09-09, 09-24 |
| ebay-tool | L (+T notes) | `4f772b0` (08-30) v0.2 init; `550ece7` (08-31) v0.2; `f800a63` (09-16) **v2 (V2-MIGRATE)** | v0.2 vendored → v2 conversion | export, janitor, validator ×2, upgrade, note | 08-30 → 09-16 (115) | 0 / 115 (4 int) | CC harvests 09-09, 09-24 |
| video-pedagogy-research | L (+T notes) | `8f6b6c6` (09-08) none; `a9a0d1f` (09-16) **v2 intake** (upgrade report only); `23af797` (09-23) v2 | no framework → v2 INTAKE | export, upgrade, validator, note | 09-04 → 09-24 (414) | 51 / 363 (342 int) | CC harvests 09-16, 09-24 |
| personal-finance | L (+T notes) | folder (09-14 history) none; `602e28a` (09-16) **v2 intake** | no repository → BASELINE + INTAKE commits | export, validator ×2, upgrade, note | 09-08 → 09-16 (26) | 1 / 25 (2 int) | CC harvests 09-16, 09-24 |
| adhd-research | L | `b1a20d6` (09-18) none | pre-adoption baseline only | export, note (local) | 09-04 → 09-18 (19) | 7 / 12 (2 int) | CC harvest 09-24 |
| parenting-research | L (+T note) | folder (09-24) none | pre-adoption baseline only | export, note | 09-08 → 09-23 (23) | 1 / 22 (3 int) | CC harvest 09-24 |
| dot-crowd-navigator | T+L | `8d38880` (08-17) unversioned | April tree, as-found snapshot commit 08-17 | export, note | 04-10 → 08-17 (5) | 1 / 4 | CC harvest 09-24 |
| windsurf-ai-credit-display | L (+T note) | `3a958c3` (05-31) 1.1.0 init; `14d0ba1` (06-13) canon 2.2.1 | 1.1.0 install → upgrade 2.2.1 (in the second commit) | export, upgrade, note | 05-31 → 06-16 (4) | 0 / 4 | CC harvest 09-24 |
| artwork-form-filler | T+L | `2c02f80` (06-13) 2.2.1 init; `02d4145` (06-14) canon 2.2.1 | install with initial commit; never upgraded | export, note | 06-13 → 08-26 (14) | 0 / 14 (4 int) | CC harvest 09-24 |
| client-app | L (+T note) | `84f2f3e` (06-14) install; `a9fcee4` (06-14) canon 2.4.0 | install; never upgraded or pushed | export, review, note | 08-26 only (18, the review run) | 0 / 18 (3 int) | CC harvest 09-24 |
| client-site | L (+T note) | `2738fe5` (07-04) canon 3.1.1 | framework repo copied under `Code/PM-Skills/` | export, note | 07-03 → 07-04 (2) | 0 / 2 | CC harvest 09-24 |
| corperate-image-generator | T+L | `ee49264` (06-03) canon 2.2.0 (single commit) | install with the single commit | export, note | 06-04 → 06-05 (4) | 0 / 4 | CC harvest 09-24 |
| laurillard-learner-journey | T+L | `2fef7cf` (07-10) init; `0341c0b` (07-10) canon 3.1.1 | install with first commit | export, validator, note | 07-10 (2) | 0 / 2 | CC harvest 09-24 |
| dot-matrix-tool | L (+T note) | `7a1d55e` (04-17) init; `0314b05` (05-29) unversioned | April tree | export, review, note | 04-11 → 08-26 (50) | 0 / 50 (34 int) | CC harvest 09-24 |
| resolve-scripting-windsurf | L (+T note) | folder (09-24), never committed, unversioned | April tree in a folder | export, note | 06-11 (1) | 0 / 1 | CC harvest 09-24 |
| *lab self-host* (`<lab>/selfhost/`) | lab repo | lab HEAD `ec9aa81` (09-16) **v2** | V2-SELFHOST adoption 09-15 | the ledger itself | — | — | the lab's own record, same owner |

#### B.2 Exposure — split at each install and each v2 intake

Commits are counted in scratch clones of the filed bundles
(`git rev-list --count <install>..<latest filed HEAD>`) or, where no
bundle was cloned, from the census's git-log reading. Sessions are
those the harvest attributed to the project, across all stores, whose
activity falls after the install; "opened after the v2 intake" counts
only sessions that started after the intake commit. Record words are
the whole record at the latest filed HEAD as S5 defines it (memory
plus rulebooks for canon; `project/` plus the contract for v0.2 and
v2). Uncommitted memory is what the harvest's working-tree snapshot
recorded; "none filed" means the harvest found the scope clean.
Ceremony is from S2 (v2) and S7 (canon), where examined.

| Project | Framework now; install → intake | Commits since install | … after the v2 intake | Sessions since install | … opened after the v2 intake | Record words, latest HEAD | Days, install → last session | Memory uncommitted at the last harvest | Ceremony never exercised |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| video-pedagogy-research | v2; intake `a9a0d1f` (09-16) on a no-framework baseline | 73 | 73 | 403 | 401 | 66,924 | 8 | 4 untracked review files under `project/reviews/` | phase close and recall (no opportunity); the view is never committed |
| derry-lane-development-system | v2; canon 4.6.0 reinstall `c18eba1` (08-17) → intake `665f36b` (09-16) | 14 | 0 | 47 | 0 | 14,364 | 30 | 4 memory files staged in the retained canon tree; the Codex configuration | canon: lite close, handoff blocks (short window); v2: every verb (no use) |
| pattern-mapper | v2; canon install `6bb39f9` (07-17) → intake `24c9e93` (09-16) | 216 | 0 | 138 | 0 | 89,200 | 61 | no memory; the Codex configuration and a hooks file | canon: lite close, handoff blocks, design review gate, filesystem preflight (one mention); v2: every verb |
| storage-tidy | v2; v0.2 `0c0413d` (09-11) → intake `267e031` (09-16) | 19 | not filed (absent) | 10 | none attributed (nothing filed after the intake) | 28,901 | 5 | none filed | v0.2 not censused; v2: no evidence either way |
| ebay-tool | v2; v0.2 `4f772b0` (08-30) → conversion `f800a63` (09-16) | 15 | 0 | 115 | 0 | 25,029 | 17 | none filed | v0.2 not censused; v2: every verb |
| marketing-skills | v2; baseline and intake `889b65f` (09-16), no earlier repository | 0 | 0 | 2 | 0 | 4,980 | 0 | none filed | v2: every verb |
| personal-finance | v2; baseline and intake `602e28a` (09-16) | 0 | 0 | 2 | 0 | 9,676 | 0 | none filed | v2: every verb |
| digital-art-audience-hub | canon 4.6.0 + records mode; unversioned install `a089018` (05-03) | 136 | — | 99 | — | 56,719 | 118 | none filed | design review gate; self-explaining runtime; one-command gate; build identity; its own PROCESS.md rituals |
| route-plotter (v3) | canon 4.7.0; fresh install `599407f` (08-17) | 133 | — | 126 | — | 56,377 | 38 | none for v3; the retired v2-line tree holds 7 memory and 4 rulebook edits never committed | design review gate; secret scan; lite close; handoff blocks |
| uon-video-helper | canon 4.9.2; reinstall `92e9791` (08-24) | 125 | — | 103 | — | 52,207 | 28 | no memory at 08-27 (two configuration edits, one untracked script); none filed at 09-24 | dependency-audit cadence; lite close; handoff blocks |
| vinyl-sorting | pm-next v0.2; `2bc9260` (08-30) | 282 | — | 416 | — | 71,320 | 25 | none filed | v0.2 not censused |
| dot-matrix-tool | unversioned; `7a1d55e` (04-17) | 40 | — | 46 | — | 41,581 | 131 | none filed | tests (manual only); persistence checklist stale |
| windsurf-ai-credit-display | canon 2.2.1 (1.1.0 install `3a958c3`, 05-31) | 1 | — | 4 | — | 12,425 | 16 | 4 memory files, 3 rulebooks | DEV ownership slots; design review gate; budgets |
| artwork-form-filler | canon 2.2.1; `2c02f80` (06-13) | 7 | — | 14 | — | 8,466 | 74 | 2 memory files | wish-list; design review gate |
| client-app | canon 2.4.0; `84f2f3e` (06-14) | 6 | — | 18 | — | 10,031 | 73 | none filed | design review gate; DEV sync |
| corperate-image-generator | canon 2.2.0; `ee49264` (06-03) | 0 | — | 4 | — | 10,729 | 3 | 5 memory files, 4 rulebook or configuration files, 1 untracked tool | every ritual (one commit, the install) |
| client-site | canon 3.1.1; `6c63973` (07-04) | 1 | — | 1 | — | 5,148 | 1 | none filed | quality gate; version identity; wish-list |
| laurillard-learner-journey | canon 3.1.1; `2fef7cf` (07-10) | 2 | — | 2 | — | 4,293 | 1 | 7 memory files, 4 rulebooks, 6 configuration or script files | the gate, never named in a commit |
| dot-crowd-navigator | unversioned; April tree, snapshot commit (08-17) | 4 | — | 3 | — | 12,264 | 128 | none filed | not judgeable (four commits) |
| resolve-scripting-windsurf | unversioned; never committed | — | — | 1 | — | 20,762 | — | folder only | not judgeable from Git |
| adhd-research | none (baseline only) | — | — | 19 | — | 15,761 | — | none filed | — |
| parenting-research | none (folder) | — | — | 23 | — | 2,845 | — | folder only | — |
| lab self-host | v2 (V2-SELFHOST, 09-15) | 1 after `c6d8198` | — | — | — | 9,777 | — | clean at the start of this run | not examined |

Route Plotter's v2 line (canon 2.3.0, 336 commits to `5b19787`,
06-18) is the port's baseline, counted in S1 and S4, not here.

#### B.3 Attention cost per record (S6)

Whitespace words; they estimate reading burden, not tokens. (a) the
always-loaded contract; (b) whole files the contract makes mandatory;
(c) the mandatory sections of sectional reads. Conditional reads are
listed, never counted. The v2 checker's own filed read estimate equals
(a)+(b)+(c) without the project-added reads exactly (eBay `f800a63`
6,660; Video Pedagogy `23af797` 6,566).

| Record | Substrate | Mandatory | (a) contract | (b) whole | (c) sectional | Contract share | Conditional listed / increment | Warm |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| hub@fc4df64 | canon 4.6.0 (records mode) | 17,053 | 5,689 | 9,371 | 1,993 | 33% | 16,924 / 16,447 | 2,783 |
| derry@375e102 | canon 4.6.0 | 6,664 | 3,841 | 1,681 | 1,142 | 58% | 4,311 / 4,013 | 412 |
| pm@348eb16 | canon 4.0.0 | 14,314 | 5,147 | 4,844 | 4,323 | 36% | 17,272 / 16,708 | 2,415 |
| uvh@09702c2 | canon 4.9.2 | 13,270 | 4,569 | 4,896 | 3,805 | 34% | 10,924 / 10,125 | 1,339 |
| uvh@c346581 | canon 4.9.2 | 12,893 | 4,569 | 4,896 | 3,428 | 35% | 11,774 / 10,934 | 1,909 |
| rp@6f2ac15 | canon 4.7.0 | 6,607 | 1,089 | 4,379 | 1,139 | 16% | 14,693 / 14,495 | 1,871 |
| rp@989f11d | canon 4.7.0 | 7,657 | 1,511 | 4,547 | 1,599 | 20% | 18,458 / 18,044 | 1,736 |
| client-site@2738fe5 | canon 3.1.1 | 2,658 | 976 | 1,221 | 461 | 37% | 2,153 / 2,018 | 78 |
| laurillard@0341c0b | canon 3.1.1 | 2,617 | 462 | 1,789 | 366 | 18% | 1,397 / 1,287 | 198 |
| windsurf-ai@14d0ba1 | canon 2.2.1 | 8,272 | 2,735 | 2,861 | 2,676 | 33% | 1,466 / 1,466 | 585 |
| artwork@02d4145 | canon 2.2.1 | 5,792 | 2,645 | 1,920 | 1,227 | 46% | 1,663 / 1,663 | 562 |
| client-app@a9fcee4 | canon 2.4.0 | 6,444 | 3,209 | 2,538 | 697 | 50% | 2,662 / 2,662 | 454 |
| corperate@ee49264 | canon 2.2.0 | 6,444 | 3,003 | 2,956 | 485 | 47% | 1,839 / 1,839 | 373 |
| rp-v2line@5b19787 | canon 2.3.0 | 8,819 | 2,079 | 6,190 | 550 | 24% | 5,054 / 5,054 | 1,244 |
| dotcrowd@8d38880 | unversioned | 6,420 | 1,678 | 4,490 | 252 | 26% | 3,605 / 3,605 | — |
| dotmatrix@0314b05 | unversioned | 6,996 | 1,787 | 4,107 | 1,102 | 26% | 34,060 / 34,060 | — |
| resolve@folder | unversioned (no commits) | 13,679 | 1,128 | 6,668 | 5,883 | 8% | 7,227 / 7,227 | — |
| storage@eb96fbc | pm-next v0.2 | 3,819 | 993 | 2,826 | 0 | 26% | 569 / 569 | 312 |
| vinyl@60c3c4b | pm-next v0.2 | 1,454 | 1,277 | 177 | 0 | 88% | 1,233 / 1,233 | 1,969 |
| vinyl@06f6c90 | pm-next v0.2 | 1,617 | 1,277 | 340 | 0 | 79% | 1,244 / 1,244 | 4,346 |
| ebay@550ece7 | pm-next v0.2 | 1,123 | 954 | 169 | 0 | 85% | 3,570 / 3,570 | 332 |
| derry@665f36b | pm-next v2 | 2,502 | 482 | 1,283 | 737 | 19% | 5,511 / 5,511 | 34 |
| pm@24c9e93 | pm-next v2 | 8,127 | 410 | 5,810 | 1,907 | 5% | 10,241 / 10,241 | 1,827 |
| storage@267e031 | pm-next v2 | 6,078 | 421 | 3,181 | 2,476 | 7% | 0 / 0 | 347 |
| marketing@889b65f | pm-next v2 | 1,370 | 395 | 550 | 425 | 29% | 0 / 0 | 57 |
| ebay@f800a63 | pm-next v2 | 6,857 | 419 | 3,678 | 2,760 | 6% | 0 / 0 | 373 |
| vpr@a9a0d1f | pm-next v2 (intake) | 3,349 | 452 | 2,362 | 535 | 13% | 726 / 726 | 61 |
| vpr@23af797 | pm-next v2 | 8,655 | 451 | 2,762 | 5,442 | 5% | 742 / 742 | 306 |
| pf@602e28a | pm-next v2 | 1,532 | 395 | 584 | 553 | 26% | 1,562 / 1,562 | 41 |
| lab-selfhost@ec9aa81 | pm-next v2 | 6,655 | 2,206 | 2,945 | 1,504 | 33% | 706 / 706 | 330 |
| vpr@8f6b6c6 | none | 873 | 873 | 0 | 0 | 100% | 9,178 / 9,178 | — |
| adhd@b1a20d6 | none | 8,630 | 617 | 8,013 | 0 | 7% | 0 / 0 | — |
| marketing@folder | none | 0 | 0 | 0 | 0 | n/a | 0 / 0 | — |
| pf@folder | none | 0 | 0 | 0 | 0 | n/a | 0 / 0 | — |
| parenting@folder | none | 0 | 0 | 0 | 0 | n/a | 0 / 0 | — |

Archive, rotation and repair commits (mechanical keyword rules; commit
subjects used to classify only):

| Project (history) | Commits | Span | Archive events | Kinds | Archive dates (MM-DD) | Repair | Memory-only |
| --- | ---: | --- | ---: | --- | --- | ---: | ---: |
| digital-art-audience-hub | 154 | 02-28 → 08-17 | 17 | rotation 12, backup 5 | 05-28, 05-29, 05-30, 05-31b, 06-01 ×2, 06-03 ×3 (1b), 06-04, 06-19, 07-04 ×2b, 07-05, 07-06, 07-08, 08-17b | 15 | 20 |
| derry-lane-development-system | 20 | 08-17 → 09-16 | 1 | intake 1 | 09-16 | 1 | 4 |
| pattern-mapper | 217 | 07-16 → 09-16 | 8 | rotation 7, intake 1 | 07-19, 07-22, 08-07 ×2, 08-11, 08-12, 08-23, 09-16 | 16 | 41 |
| storage-tidy | 20 | 09-11 → 09-16 | 1 | intake 1 | 09-16 | 0 | 5 |
| marketing-skills (from baseline) | 2 | 09-16 | 1 | intake 1 | 09-16 | 0 | 0 |
| uon-video-helper | 129 | 08-24 → 09-21 | 3 | rotation 3 | 08-25, 08-26, 08-27 | 10 | 27 |
| route-plotter (v3) | 135 | 08-17 → 09-24 | 3 | rotation 3 | 08-19, 08-27, 09-22 | 8 | 24 |
| route-plotter (v2 line) | 336 | 2025-10-16 → 06-18 | 0 | — | — | 2 | 3 |
| vinyl-sorting | 283 | 08-30 → 09-23 | 5 | rotation 5 | 08-30 ×3, 08-31, 09-01 | 7 | 77 |
| ebay-tool | 16 | 08-30 → 09-16 | 1 | intake 1 | 09-16 | 0 | 2 |
| video-pedagogy-research | 88 | 09-04 → 09-23 | 3 | intake 1, rotation 2 | 09-16, 09-23 ×2 | 3 | 21 |
| personal-finance (from baseline) | 2 | 09-16 | 1 | intake 1 | 09-16 | 0 | 0 |
| adhd-research | 19 | 09-04 → 09-18 | 0 | — | — | 0 | 0 |
| dot-crowd-navigator | 7 | 04-12 → 08-17 | 0 | — | — | 0 | 0 |
| windsurf-ai-credit-display | 2 | 05-31 → 06-13 | 1 | rotation 1 | 06-13 | 0 | 0 |
| artwork-form-filler | 8 | 06-13 → 06-14 | 0 | — | — | 0 | 2 |
| client-app | 64 | 01-24 → 06-14 | 0 | — | — | 0 | 2 |
| client-site | 9 | 07-03 → 07-04 | 0 | — | — | 0 | 0 |
| corperate-image-generator | 1 | 06-03 | 0 | — | — | 0 | 0 |
| laurillard-learner-journey | 3 | 07-10 | 0 | — | — | 0 | 0 |
| dot-matrix-tool | 45 | 04-13 → 05-29 | 1 | rotation 1 | 05-27 | 1 | 1 |
| lab self-host (touching `lab/selfhost`, `lab/project`) | 66 | 08-08 → 09-16 | 19 | shipped-record 18, intake 1 | 08-17, 08-24, 08-28 ×4, 08-29 ×4, 08-30 ×2, 09-13 ×5, 09-14, 09-15 (intake) | 2 | 12 |

#### B.4 Rulebook census (S7)

Canon 4.x deployments (additions and adding rewrites mapped to a v2
home):

| Project | Rows | Filled placeholder | Addition | Rewrite (adds / weakens / neutral) | Deletion | Additions + adding rewrites | Named slot | Generic only | None |
| --- | ---: | ---: | ---: | --- | ---: | ---: | ---: | ---: | ---: |
| Audience Hub | 84 | 17 | 62 | 5 (3 / 1 / 1) | 0 | 65 | 33 (51 %) | 13 (20 %) | 19 (29 %) |
| Derry Lane | 36 | 17 | 16 | 2 (0 / 2 / 0) | 1 | 16 | 12 (75 %) | 1 (6 %) | 3 (19 %) |
| Pattern Mapper | 66 | 17 | 47 | 2 (0 / 2 / 0) | 0 | 47 | 23 (49 %) | 14 (30 %) | 10 (21 %) |
| Route Plotter v3 | 74 | 17 | 37 | 11 (2 / 5 / 4) | 9 | 39 | 18 (46 %) | 10 (26 %) | 11 (28 %) |
| Video Helper (`uon-video-helper`) | 51 | 18 | 33 | 0 | 0 | 33 | 17 (52 %) | 8 (24 %) | 8 (24 %) |
| **Batch** | **311** | **86** | **195** | **20 (5 / 10 / 5)** | **10** | **200** | **103 (51.5 %)** | **46 (23 %)** | **51 (25.5 %)** |

Windsurf-era and unversioned deployments (all written units):

| Project | Commits after install | Rows (fill / add / del / rew) | Weakening flags | Homes of written units: named / generic / none | Additions: named / generic / none | Profile-bound units |
| --- | ---: | --- | ---: | --- | --- | ---: |
| windsurf | 1 | 20 (18 / 0 / 1 / 1) | 0 | 9 / 6 / 2 of 17 | — | 3 |
| artwork | 7 | 22 (22 / 0 / 0 / 0) | 0 | 12 / 6 / 1 of 19 | — | 8 |
| corperate | 0 | 31 (30 / 0 / 1 / 0) | 0 | 17 / 7 / 3 of 27 | — | 9 |
| client-app | 6 | 31 (30 / 0 / 1 / 0) | 2 | 17 / 7 / 4 of 28 | — | 9 |
| client-site | 1 | 59 (32 / 3 / 10 / 14) | 13 | 26 / 4 / 3 of 33 | 3 / 0 / 0 | 20 |
| laurillard | 2 | 50 (19 / 7 / 12 / 12) | 11 | 22 / 5 / 2 of 29 | 6 / 1 / 0 | 17 |
| RP v2 line | 21 after upgrade | 49 (27 / 3 / 3 / 16) | 4 | 20 / 6 / 6 of 32 | 2 / 0 / 1 | 14 |
| dot-crowd | 4 | 30 (27 / 0 / 1 / 2) | 0 | 13 / 8 / 4 of 25 | — | 10 |
| dot-matrix | 40 after memory install | 39 (32 / 2 / 1 / 4) | 0 | 16 / 10 / 4 of 30 | 2 / 0 / 0 | 11 |
| resolve | none (no commits) | 48 (31 / 3 / 7 / 7) | 3 | 21 / 6 / 7 of 34 | 1 / 0 / 2 | 10 |
| **Batch** | | **379 (268 / 18 / 37 / 56)** | **33** | **173 / 65 / 36 of 274 (63.1 % / 23.7 % / 13.1 %)** | **14 / 1 / 3 of 18** | |

#### B.5 Upgrade landing, per upgrade (S9)

P / NN / O / U: performed / not needed / omitted / unadvertised.

| Upgrade | Path | Window (entries) | P/NN/O/U | Files changed | Memory migration | Breakage afterwards (git log) | Preservation and rollback receipts |
| --- | --- | ---: | --- | --- | --- | --- | --- |
| Hub unversioned → 1.0.0 `bdfbcbc` | walked (legacy path) | 1 | 6/1/1/0 | 11 (9 framework, 2 rulebooks); +491/−162 | none | none | record, committed in a later feature commit; no backup although the tree was dirty |
| Hub 1.0.0 → 1.1.0 `b5c2e86` | walked | 1 | 8/0/1/1 | 17 (12 fw, 1 rb, 3 memory, 1 product); +157/−14 | new `wish-list.md` | project changelog lacked the 1.1.0 entry for one day (ENTRY-GAP); harmless | backup, 14 files (committed in the next feature commit); record |
| Hub 1.1.0 → 2.0.0 `7e76d37` | walked | 4 | 16/3/0/2 | 26 (19 fw, 1 rb, 6 mem); +1,622/−428 | **the 2.0.0 migration**: 157 `[x]` lines out, backlog 23,045 → 1,221 words, byte-verified snapshot, ID reconcile | none; archive splits followed on 06-03 | snapshot re-verified byte-equal here; record |
| Hub 2.0.0 → 2.1.0 `61b3d8c` | walked | 1 | 6/0/1/0 | 8 (6 fw, 1 rb, 1 mem); +176/−47 | none | two prompts stayed at 2.0.0 text for 15 days (ENTRY-GAP); no harm seen | record |
| Hub 2.1.0 → 2.7.3 `8f26869` | walked, no record | 11 | 21/5/1/0 | 28 (25 fw, 3 rb); +1,858/−172 | none | none | **none**: empty commit body, no decision-log record anywhere |
| Hub 2.7.3 → 3.1.0 `15dfabe` | walked | 3 | 14/2/1/2 | 65 (22 fw; 35 backup, including the 12 retired files moved in; 2 rb; 1 mem; 5 product); +6,798/−787 | none required | **yes**: see "Breakage" below | backup, 35 files, taken **after** a bundled revert; record |
| Hub 3.1.0 → 3.1.1 `50c56fe` | walked | 1 | 6/0/0/0 | 9 (4 fw, 4 backup, 1 mem); +2,104/−8 | none | none | backup, 4 files; record |
| Hub 3.1.1 → 4.6.0 `7f32957` | walked (lab evidence session) | 29 | 41/10/0/2 | 61 (29 fw, 26 backup, 2 rb, 3 mem, `.gitignore`); +12,090/−1,536 | `doc-deltas.md` created; backlog legend, flags and dates edited by hand | latent: the merged AGENTS rule reads a file-map index block the map never gained | preflight; backup, 26 files; record; byte-assertions |
| Hub records mode `a7e6999` (read separately) | branch probe then merge; no release entry governed it (records mode shipped in 4.8.0) | – | 1/1/0/4 | 14 (2 rb, 11 mem, 1 script); +335/−39 | 6 open items → records; 1 archived record | none (history ends the same day); the probe found two canon-tool defects that fed 4.8.0 | branch and history as rollback; no snapshot |
| Windsurf AI 1.1.0 → 2.2.1 `14d0ba1` | walked, inside a feature commit | 7 | 19/3/2/2 | 60 (17 fw, 1 rb, 7 mem, 35 product/other); +4,821/−218 | 2.0.0 migration: 24 items, reconcile 24 = 24 | none evidenced (no later commits) | snapshot (byte identity unverifiable: the pre-upgrade backlog was never committed); record; no backup though the tree was dirty |
| Pattern Mapper 3.17.1 → 4.0.0 `75f04d1` | walked | 1 | 4/1/0/3 | 67 (11 fw, 1 mem, 55 housekeeping/config); +1,181/−7,871 | none | none: framework untouched for two months (213 commits) until the v2 intake | record (D11); gate green |
| Route Plotter v2-line unversioned → 2.3.0 `5825d52` (unfiled) | walked (legacy path) | 1.0.0–2.3.0 | 5/0/2/1 | 37 (3 mem, 2 rb); +3,518/−85 | 2.0.0 migration **deferred**; done by hand two days later without snapshot or reconcile (1 item) | none | record |
| Route Plotter v3 `599407f` | reinstall into a fresh repo, memory ported | gap 2.4.0–4.7.0 | 2/1/1/0 | 47; +10,691 | memory ported verbatim | **contract cited 5 retired prompts for 10 days** (fixed `87740a7`); the 2.4.0–4.7.0 template rules arrived only on 09-22 (`597be47`); hostile-filesystem guard still absent at HEAD | manifest-verified export |
| Route Plotter 4.7.0 → 4.9.2 | refused | 4.7.1–4.9.2 | 0/0/1/0 | 0 | – | none; the gap held framework replaces only | decision recorded (no reason given) |
| Derry 4.4.0 → 4.6.0 `a138f1a` + `c18eba1` | reinstall, then re-init | 2 | 3/0/0/0 | 26 + 16 | half-day-old memory regenerated; decision log and trajectory carried whole | none | named recovery commit (`13cbce6`) |
| Video Helper 4.6.0 → 4.9.2 `92e9791` | reinstall before init | 7 | 2/1/0/0 | 18; +1,299/−49 | none (memory unpopulated) | none | manifest-verified export |
| Storage Tidy v0.2 → v2 `267e031` | v2 intake | intake verb | 5/1/0/3 | 55; +2,199/−202 | v0.2 ledger → v2 items, decisions and brief | no later commits | pre-v2 archive byte-preserved; approval with hashes; **rollback rehearsed** (46-file baseline) |
| eBay v0.2 → v2 `f800a63` | v2 intake | intake verb | 5/1/0/4 | 49; +2,419/−155 | same shape | no later commits | pre-v2 archive; source-manifest check; **rollback rehearsed** (117 files) |

#### B.6 Intake fidelity — every reading, labelled (S1)

Deduplicated shares (active / merged / retained-only / unresolved /
omitted). The main reading is the one in section 5; each alternative
names the population it changes.

| Crossing | Main reading | Alternative readings, labelled |
| --- | --- | --- |
| Video Pedagogy | 84.1 / 3.4 / 6.9 / 4.1 / 1.4 (145 obligations) | *pointer carriage:* 69 of 122 active obligations have no carrier in the new ledger; *live README counted as active:* retained-only falls from 10 to 1 obligation; *without the two non-repository strata* (the harness's memory, chat prompts): nothing omitted |
| Marketing Skills | 62.5 / 25.0 / 10.7 / 1.8 / 0 (56) | *without pointer carriage:* active 12.5 % (14.5 % raw); *with the business-folder product stratum added* (103 obligations): active 67, merged 15, retained-only 10, unresolved 5, omitted 6 |
| Personal Finance | 77.8 / 8.5 / 10.3 / 1.7 / 1.7 (117) | *without pointer carriage:* active 31.6 % (34.0 % raw) |
| Pattern Mapper | 59.8 / 11.8 / 27.3 / 1.2 / 0 (942) | *(a) narrow — only files rule 1 reads, items, digests and cited decisions:* 36.1 / 10.4 / 52.3 / 1.2; *(b) a pointer that calls retained tickets binding counts as active:* 82.9 / 11.7 / 4.2 / 1.2; *(c) heading-level decision matches become retained-only:* 58.8 / 11.8 / 28.2 / 1.2. Approval boundaries under the main reading: 50.0 / 25.0 / 21.9 / 3.1 |
| Derry Lane | 55.4 / 11.7 / 31.2 / 1.2 / 0.4 (240) | *strict — the retained original contract is not in force:* 38.8 / 11.7 / 47.9 / 1.2 / 0.4; *retired process rules left out* (212 obligations): 62.7 / 13.2 / 22.6 / 1.4 / 0 |
| eBay Tool | 83.3 / 4.9 / 11.8 / 0 / 0 (203) | *strict — three decisions beyond the latest ten and two README-only units not in force:* 80.8 / 4.9 / 14.3 / 0 / 0. (A sub-table in the per-crossing working summary is headed "retained-only" but excludes those units — Checkpoint B; not used here.) |
| Storage Tidy | 80.7 / 3.5 / 15.0 / 0.4 / 0.4 (254) | *rubric-listed surfaces only* (project-docs stratum left out; 187): 73.8 / 4.8 / 20.3 / 0.5 / 0.5; *project obligations only* (framework-process keys left out): 94.0 / 2.3 / 2.8 / 0.5 / 0.5 |
| Route Plotter port | 92.3 / 1.8 / 1.4 / 4.5 / 0 (221) | *project obligations only* (framework keys left out; 196): 95.9 / 1.5 / 1.5 / 1.0 / 0; *cold live files counted as active:* 93.7 / 1.8 / 0 / 4.5 / 0 |

#### B.7 Owner prompts, by project and month (S8)

Unique owner-typed prompts in the frame (n = 1,409); "·" is zero.

| Project | 2026-03 | 2026-04 | 2026-05 | 2026-06 | 2026-07 | 2026-08 | 2026-09 | total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| adhd-research | · | · | · | · | · | · | 84 | 84 |
| artwork-form-filler | · | · | · | 1 | · | 3 | · | 4 |
| corperate-image-generator | · | · | · | 9 | · | · | · | 9 |
| derry-lane-development-system | · | · | · | · | · | 1 | · | 1 |
| digital-art-audience-hub | · | 2 | 88 | 42 | 58 | 4 | · | 194 |
| dot-crowd-navigator | · | 31 | · | · | · | 1 | · | 32 |
| dot-matrix-tool | · | 23 | 89 | · | · | 3 | · | 115 |
| client-site | · | · | · | · | 17 | · | · | 17 |
| laurillard-learner-journey | · | · | · | · | 11 | · | · | 11 |
| client-app | · | · | · | · | · | 3 | · | 3 |
| parenting-research | · | · | · | · | · | · | 8 | 8 |
| pattern-mapper | · | · | · | · | 36 | 278 | · | 314 |
| resolve-scripting-windsurf | · | · | · | 1 | · | · | · | 1 |
| route-plotter | 12 | 18 | · | 14 | · | 39 | 31 | 114 |
| uon-video-helper | · | · | · | · | · | 45 | 6 | 51 |
| video-pedagogy-research | · | · | · | · | · | · | 245 | 245 |
| vinyl-sorting | · | · | · | · | · | 2 | 192 | 194 |
| windsurf-ai-credit-display | · | · | 4 | 8 | · | · | · | 12 |
| **all** | 12 | 74 | 181 | 75 | 122 | 379 | 566 | 1409 |

Authors of the unique prompts (1,956):

| Project | owner | agent-dispatch | harness-injected | unclear |
| --- | ---: | ---: | ---: | ---: |
| video-pedagogy-research | 245 | 287 | 13 | 1 |
| pattern-mapper | 314 | 13 | 4 | 0 |
| vinyl-sorting | 194 | 149 | 5 | 2 |
| adhd-research | 84 | 0 | 0 | 0 |
| artwork-form-filler | 4 | 0 | 3 | 0 |
| corperate-image-generator | 9 | 0 | 0 | 0 |
| derry-lane-development-system | 1 | 1 | 2 | 0 |
| digital-art-audience-hub | 194 | 7 | 6 | 0 |
| dot-crowd-navigator | 32 | 0 | 0 | 0 |
| dot-matrix-tool | 115 | 0 | 3 | 0 |
| ebay-tool | 0 | 1 | 0 | 0 |
| client-site | 17 | 0 | 0 | 0 |
| laurillard-learner-journey | 11 | 0 | 1 | 0 |
| client-app | 3 | 0 | 3 | 0 |
| marketing-skills | 0 | 1 | 0 | 0 |
| parenting-research | 8 | 0 | 0 | 0 |
| personal-finance | 0 | 1 | 0 | 0 |
| resolve-scripting-windsurf | 1 | 0 | 0 | 0 |
| route-plotter | 114 | 29 | 7 | 0 |
| uon-video-helper | 51 | 0 | 8 | 0 |
| windsurf-ai-credit-display | 12 | 0 | 0 | 0 |

#### B.8 Where each headline number comes from

Working tables are in the run's scratch directory
(`~/scratch/pm-v2-study/2026-09-24/`, not filed); tier sources are
anchored in Appendix D. `<tier>` is `self/field-reports`.

| Figures | Computed in (scratch) | From (tier) | Counting rule |
| --- | --- | --- | --- |
| S1 units and classes | `tables/s1/<crossing>/units.tsv`, `summary.md` | `<tier>/<slug>/local/*-export-memory*.md`, `*-export-rulebooks.md`, `*-upgrade.md`; bundles at the named commits | the frozen S1 unit; one class per unit; dedup groups take their best class |
| S1 profile fields — counted one by one: Video Pedagogy 20 (7 inferred, 11 supplied, 2 guessed and unmarked), Derry 19 (8, 10, 1), eBay 18 (8, 7, 3), Storage Tidy 16 (10 inferred, 1 asked, 2 guessed and marked, 3 guessed and unmarked); grouped by line: Marketing and Pattern Mapper (no unmarked guess), Personal Finance (one) | the same summaries, "Profile field origin" | each intake's `project/profile.md`; the launching prompts in `*-export-prompts.md` | one populated profile line = one field where counted one by one |
| S2 counts | `tables/s2-first-week.md` | Video Pedagogy's git-log export and bundle to `23af797` | commits after `a9a0d1f`; intake-written lines excluded |
| S3 populations — logs 414 / 268 / 48; exec runs 330 / 152 / 31; episodes 49 / 62 / 23, of them Claude-launched 43 / 62 / 23 with 318 / 146 / 31 runs; 12 sampled | `tables/s3/summary.md`, `episodes-scores.tsv` | `*-sessions.tar.gz` and `*-sessions-manifest.md`; bundles | window 2026-09-16 09:25 → 09-24 11:40 UTC; co-activity in 10-minute bins; imports excluded |
| S4 promises and the 92-cell register | `tables/s4/<slug>-promises.tsv`, `-scores.tsv`, `register.md` | memory exports and bundles at the draw and end HEADs | the frozen S4 unit and outcomes; seed `20260924` |
| S5 scores, per cell and per record | `scores/adj-S5.json`, `tables/s5/final.md`, keys in `tables/s5/keys/` | memory and rulebook exports at each HEAD; git-log exports | the frozen S5 rubric; neutral cell ids |
| S6 words | `tables/s6/read-sets.tsv` | exports at each HEAD | whitespace words of the prescribed reading |
| S7 rows (690) and homes; the 616-commit ceremony denominator; 98 memory-fact kinds | `tables/s7/*.tsv`, `summary-4x.md`, `summary-early.md`, `agent-memory-facts.md` | `*-export-rulebooks.md`; templates at each version (Git objects, D); `*-export-agent-memory.md` | 616 = non-merge commits in each git-log export from the install date to the HEAD, inclusive — the Hub 137, Pattern Mapper 216, Route Plotter 134, the Video Helper 129 (B.2 counts commits reachable from the HEAD but not from the install commit, merges included, hence 136, 216, 133, 125). 98 kinds = one per distinct kind of fact across 80 fact files (Pattern Mapper 15, Route Plotter 6, the Video Helper 9, vinyl 29, Video Pedagogy 11, Storage Tidy 6, Derry 4): 57 with no slot in canon or v2, 14 canon only, 1 v2 only, 26 both |
| S8 — 2,270 prompts, 1,956 unique, 1,409 owner, 489 agent-dispatch; 60-cell sample | `tables/s8/all-rows.json`, `aggregate.md`, `sample-cells.json`, `project-month.md` | `*-export-prompts.md` | the frozen S8 frame; exact repeats removed within a project |
| S9 — 229 action rows; 193 for the eleven walks; 138 from changelog entries | `tables/s9/upgrades.tsv`, `summary.md` | `*-upgrade*.md`; the changelog at each target release (Git); bundles | one row per action; performed / not needed / omitted / unadvertised |
| Exposure (B.2) | `phase0/`, the harvest's attribution index | `<tier>/route-plotter/local/harvest-2026-09-24/run-records.tar.gz`; session manifests | sessions as the harvest attributed them |

#### B.9 Recall, per record and arm (S5)

Per record and arm: the adjudicated score per question (n/a where no key
was possible), the total, the total under the strict reading (Codex's),
the mandatory and whole-record words (S6), the record's age at its HEAD
(first commit to HEAD, days) and its commit count.

| Record | Class | Arm | Q1 | Q2 | Q3 | Q4 | Score | Codex reading | Mandatory words | Record words | Age (days) | Commits |
| --- | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| derry@375e102 | canon 4.x | whole | 2 | 2 | 2 | 2 | 8/8 | 8/8 | 6,664 | 12,486 | 5 | 19 |
| hub@fc4df64 | canon 4.x | whole | 1 | 2 | 2 | 2 | 7/8 | 6/8 | 17,053 | 56,719 | 170 | 154 |
| hub@fc4df64 | canon 4.x | hot set | 1 | 2 | 2 | 2 | 7/8 | 7/8 | 17,053 | 56,719 | 170 | 154 |
| pm@348eb16 | canon 4.x | whole | 2 | 2 | 2 | 2 | 8/8 | 8/8 | 14,314 | 65,743 | 42 | 216 |
| rp@6f2ac15 | canon 4.x | whole | 1 | 2 | 1 | 2 | 6/8 | 6/8 | 6,607 | 42,640 | 10 | 86 |
| rp@989f11d | canon 4.x | whole | 2 | 2 | 1 | 2 | 7/8 | 7/8 | 7,657 | 56,377 | 38 | 135 |
| rp@989f11d | canon 4.x | hot set | 1 | 2 | 1 | 2 | 6/8 | 5/8 | 7,657 | 56,377 | 38 | 135 |
| uvh@09702c2 | canon 4.x | whole | 1 | 2 | 2 | 2 | 7/8 | 7/8 | 13,270 | 48,136 | 3 | 111 |
| uvh@c346581 | canon 4.x | whole | 2 | 2 | 2 | 2 | 8/8 | 8/8 | 12,893 | 52,207 | 28 | 129 |
| uvh@c346581 | canon 4.x | hot set | 2 | 2 | 1 | 2 | 7/8 | 7/8 | 12,893 | 52,207 | 28 | 129 |
| artwork@02d4145 | canon 2–3.x | whole | 1 | 2 | 2 | 2 | 7/8 | 7/8 | 5,792 | 8,466 | 0 | 8 |
| corperate@ee49264 | canon 2–3.x | whole | 2 | 2 | 2 | 2 | 8/8 | 8/8 | 6,444 | 10,729 | 0 | 1 |
| client-site@2738fe5 | canon 2–3.x | whole | 2 | 2 | 2 | 2 | 8/8 | 7/8 | 2,658 | 5,148 | 1 | 9 |
| client-site@2738fe5 | canon 2–3.x | hot set | 1 | 2 | 2 | 2 | 7/8 | 6/8 | 2,658 | 5,148 | 1 | 9 |
| laurillard@0341c0b | canon 2–3.x | whole | 2 | 2 | 2 | 2 | 8/8 | 8/8 | 2,617 | 4,293 | 0 | 3 |
| client-app@a9fcee4 | canon 2–3.x | whole | 2 | 2 | 2 | 2 | 8/8 | 7/8 | 6,444 | 10,031 | 141 | 64 |
| rp-v2line@5b19787 | canon 2–3.x | whole | 2 | 2 | 1 | 2 | 7/8 | 7/8 | 8,819 | 14,610 | 244 | 336 |
| windsurf-ai@14d0ba1 | canon 2–3.x | whole | 2 | 2 | 2 | 2 | 8/8 | 8/8 | 8,272 | 12,425 | 14 | 2 |
| dotcrowd@8d38880 | unversioned | whole | 2 | 2 | 2 | 2 | 8/8 | 7/8 | 6,420 | 12,264 | 128 | 7 |
| dotcrowd@8d38880 | unversioned | hot set | 0 | 1 | 2 | 2 | 5/8 | 3/8 | 6,420 | 12,264 | 128 | 7 |
| dotmatrix@0314b05 | unversioned | whole | 2 | 2 | 2 | 2 | 8/8 | 8/8 | 6,996 | 41,581 | 45 | 45 |
| dotmatrix@0314b05 | unversioned | hot set | 2 | 2 | 1 | 2 | 7/8 | 7/8 | 6,996 | 41,581 | 45 | 45 |
| resolve@folder | unversioned | whole | n/a | 2 | 2 | 2 | 6/6 | 5/6 | 13,679 | 20,762 | — | — |
| ebay@550ece7 | v0.2 | whole | 2 | 2 | 2 | 2 | 8/8 | 8/8 | 1,123 | 9,000 | 1 | 15 |
| storage@eb96fbc | v0.2 | whole | 2 | 2 | 2 | 2 | 8/8 | 7/8 | 3,819 | 9,907 | — | — |
| vinyl@06f6c90 | v0.2 | whole | 2 | 2 | 2 | 2 | 8/8 | 8/8 | 1,617 | 71,320 | 24 | 283 |
| vinyl@06f6c90 | v0.2 | hot set | 0 | 2 | 0 | 0 | 2/8 | 0/8 | 1,617 | 71,320 | 24 | 283 |
| vinyl@60c3c4b | v0.2 | whole | 2 | 2 | 2 | 2 | 8/8 | 7/8 | 1,454 | 35,368 | 3 | 115 |
| derry@665f36b | v2 | whole | 2 | 2 | 2 | 2 | 8/8 | 7/8 | 2,502 | 14,364 | 30 | 20 |
| derry@665f36b | v2 | hot set | 2 | 2 | 1 | 2 | 7/8 | 7/8 | 2,502 | 14,364 | 30 | 20 |
| ebay@f800a63 | v2 | whole | 2 | 2 | 2 | 2 | 8/8 | 8/8 | 6,857 | 25,029 | 17 | 16 |
| ebay@f800a63 | v2 | hot set | 2 | 2 | 2 | 2 | 8/8 | 7/8 | 6,857 | 25,029 | 17 | 16 |
| lab-selfhost@ec9aa81 | v2 | whole | 2 | 2 | 2 | 0 | 6/8 | 6/8 | 6,655 | 9,777 | — | — |
| marketing@889b65f | v2 | whole | 2 | 2 | 2 | 2 | 8/8 | 8/8 | 1,370 | 4,980 | 0 | 2 |
| marketing@889b65f | v2 | hot set | 1 | 2 | 1 | 2 | 6/8 | 6/8 | 1,370 | 4,980 | 0 | 2 |
| pf@602e28a | v2 | whole | 2 | 2 | 2 | 2 | 8/8 | 8/8 | 1,532 | 9,676 | 0 | 2 |
| pf@602e28a | v2 | hot set | 2 | 2 | 2 | 2 | 8/8 | 8/8 | 1,532 | 9,676 | 0 | 2 |
| pm@24c9e93 | v2 | whole | 2 | 2 | 1 | 2 | 7/8 | 7/8 | 8,127 | 89,200 | 61 | 217 |
| pm@24c9e93 | v2 | hot set | 2 | 2 | 1 | 2 | 7/8 | 7/8 | 8,127 | 89,200 | 61 | 217 |
| storage@267e031 | v2 | whole | 2 | 2 | 2 | 2 | 8/8 | 8/8 | 6,078 | 28,901 | — | — |
| storage@267e031 | v2 | hot set | 2 | 2 | 1 | 2 | 7/8 | 7/8 | 6,078 | 28,901 | — | — |
| vpr@23af797 | v2 | whole | 2 | 2 | 2 | 2 | 8/8 | 8/8 | 8,655 | 66,924 | 20 | 88 |
| vpr@23af797 | v2 | hot set | 1 | 2 | 1 | 2 | 6/8 | 6/8 | 8,655 | 66,924 | 20 | 88 |
| vpr@a9a0d1f | v2 | whole | 2 | 2 | 2 | 2 | 8/8 | 7/8 | 3,349 | 9,722 | 12 | 15 |
| adhd@b1a20d6 | none | whole | 0 | 2 | 1 | n/a | 3/6 | 1/6 | 8,630 | 15,761 | 14 | 19 |
| marketing@folder | none | whole | n/a | 2 | 2 | 2 | 6/6 | 6/6 | 0 | 4,998 | — | — |
| parenting@folder | none | whole | n/a | 2 | 2 | 2 | 6/6 | 6/6 | 0 | 2,845 | — | — |
| pf@folder | none | whole | 2 | 2 | 2 | 2 | 8/8 | 7/8 | 0 | 5,233 | — | — |
| vpr@8f6b6c6 | none | whole | 2 | 2 | 2 | 2 | 8/8 | 8/8 | 873 | 33,133 | 4 | 14 |

### C. Adjudication records

#### C.1 Integrity of the blind passes

The blind second pass and the S5 readers ran as fresh sub-agents
(section 2, "Method"). Every tool call each one made was audited from
its transcript after the run (names and target paths only):

| Pass | Sessions | Tool calls | Calls other than a file read | Sessions reading more than one file | Files read |
| --- | ---: | ---: | ---: | ---: | --- |
| S1 blind (16 cells; 12 re-run once) | 28 | 172 | 0 | 0 | each its own cell |
| S3 blind | 12 | 12 | 0 | 0 | each its own cell |
| S4 blind | 92 | 92 | 0 | 0 | each its own cell |
| S8 blind | 60 | 60 | 0 | 0 | each its own cell |
| S5 blind | 192 | 192 | 0 | 0 | each its own cell |
| S5 readers (35 whole records, 14 hot sets; re-runs included) | 67 | 396 | 0 | 0 | each its own record packet |

S1's large counts are one cell file read in chunks under the read
tool's size cap: no session opened a second file. The audit shows what
each session could open, not that it read every line, and each session
started with this repository's standing session context (its rules
files), which a `claude -p --tools ""` session would not have had — the
declared deviation.

**Re-runs.** The coordinators re-ran, once, every session whose tool
calls exceeded a line-based estimate, and kept the second reply; the
audit since shows the first sessions were just as confined. S1: 12 of
16 cells re-run. Their first replies, recovered from the session
transcripts, differ in two cells: Derry J2 and Storage Tidy J2 were 2
at first and 1 on re-run. With the first replies, S1's run–blind
agreement would be 7 of 16 rather than 9, Codex–blind unchanged at 13,
and all three 6 rather than 7; the adjudicated scores do not change.
S5 readers: 49 answers from 67 sessions — 16 answers re-run once for
the same estimate, and two failed sessions re-run (Storage Tidy's
intake record and the Resolve folder); the later answer was kept, and
the discarded first answers were not scored. S3, S4, S8 and the S5
blind pass needed no re-run.

#### C.2 S1 — three scorers, and every disagreement

Codex scored first from inlined material with no path (no shell call
in any of its eight runs), sealed at 17:29–17:30Z; then the run; then
the blind pass.

| Crossing | J1 Codex / run / blind | J1 adjudicated | J2 Codex / run / blind | J2 adjudicated |
| --- | --- | ---: | --- | ---: |
| Video Pedagogy | 2 / 1 / 2 | 0 | 1 / 1 / 1 | 1 |
| Marketing Skills | 1 / 1 / 2 | 1 | 2 / 2 / 2 | 2 |
| Personal Finance | 2 / 2 / 2 | 2 | 1 / 1 / 1 | 1 |
| Pattern Mapper | 2 / 1 / 2 | 0 (2 if binding pointers count) | 2 / 1 / 2 | 1 |
| Storage Tidy | 2 / 1 / 2 | 1 | 2 / 1 / 1 | 1 |
| Route Plotter port | 2 / 1 / 2 | 1 | 2 / 1 / 1 | 1 |
| Derry Lane | 1 / 1 / 1 | 1 | 1 / 1 / 1 | 1 |
| eBay Tool | 2 / 2 / 2 | 2 | 2 / 1 / 2 | 1 |

Agreement over 16 cells: all three 7; run–blind 9; Codex–blind 13;
Codex–run 8. The nine disagreements were adjudicated against the
frozen anchors, on evidence the other scorers' stated bases did not
address: seven to the run's score, and two J1 cells — Video Pedagogy's
and Pattern Mapper's — to 0 (paraphrased). The frozen 0 anchor covers
any contradicted approval boundary and several lost or retained-only
ones; "several" is read as three or more, which leaves Storage Tidy (two
retained-only) and Derry and Marketing (one each) at 1:

- **Video Pedagogy J1 → 0.** The census counts the rule for reopening
  a ratified position (only on new evidence) among the project's
  approval boundaries, and the new brief's out-of-scope list overrides
  it with a standing ban on re-ratification that was meant for the
  migration only. The frozen anchor scores any contradicted approval
  boundary 0; the run's first pass had scored 1 on this same evidence,
  and Checkpoint C found the inconsistency. The intake also softened a
  standing instruction (never stop to ask) into a narrower one.
- **Marketing J1.** An approval boundary — the onboarding skill is
  manual-only — survives only in an unchanged file reached through a
  wish-list pointer (retained-only). The active onboarding file, which
  also allows an agent to drive it, is unchanged from the baseline, so
  the conflict predates the intake and is not an inversion by it. An
  ordering condition on a corpus-access test was lost, and a handoff
  condition (a human selects and adapts candidates first) is not
  carried.
- **Pattern Mapper J1 → 0.** Fourteen of its 64 approval boundaries
  (deduplicated) survive only in retained tickets that the new items
  declare binding — retained-only under the frozen text, which counts
  content behind a pointer as retained-only, and in force under the
  briefs' paraphrase (see the declared wording discrepancy below). One
  example: a spike's boundary against packaging or new dependencies
  without separate approval. Several retained-only boundaries score 0;
  the run's pass had scored 1, and Checkpoint C found the
  inconsistency.
- **Pattern Mapper J2.** The profile restates a migration-scoped
  dependency freeze as standing policy the repository does not
  support, and its harness line omits the IDE workflow the intake
  itself rewrote.
- **Storage Tidy J1.** The rule never to add a remote — an approval
  boundary — survives only in a decision outside the latest ten and in
  the archive (retained-only). The owner's push-at-close commitment is
  contradicted by the new push line; the census does not count it as an
  approval boundary, so it caps the score at 1 (an obligation's meaning
  changed) rather than 0.
- **Route Plotter port J1.** The ported rules point at four framework
  prompts the new version no longer ships (weakened obligations). A
  backlog line plans a runtime dependency against the carried
  single-dependency rule with no approval recorded; the approval rule
  itself stays in force, and the conflict predates the port (the
  library was already loaded at runtime), so no boundary is inverted.
- **Route Plotter port J2.** Ported files state facts the new tree does
  not bear out (the output and deploy description, a deleted
  directory, the dependency count); the port flags them as stale only
  as a whole.
- **Storage Tidy J2.** The push line contradicts the baseline and cites
  no owner statement; the handoff and secrets lines are template
  defaults for a single-harness project.
- **eBay J2.** The harness line names a client the baseline never
  mentions and no eBay session used; the handoff and secrets lines are
  template defaults; none is marked as a guess.

**Declared wording discrepancy.** The frozen J1 anchor for 1 includes
"survives only retained-only", and retained-only covers content behind
a pointer. The Codex and blind briefs paraphrased it as content the
active record "does not put in force". This was a defect of the
scoring briefs, not an amendment of the rubric: adjudication used the
frozen text, and the paraphrase explains part of the gap between the
scorers. Means: J1 1.00 and J2 1.13 adjudicated; Codex's own scores
average J1 1.75 and J2 1.63.

#### C.3 S3 — episode classes

Twelve episodes (four per project, seed `20260924`), run and blind:
VPR E01 hybrid, E02 chat, E03 chat, E04 hybrid; vinyl E05 chat, E06
chat, E07 hybrid, E08 hybrid; Route Plotter E09–E12 hybrid. Agreement
12 / 12; no adjudication.

#### C.4 S4 — fulfilment (92 judged promises)

Agreement, run vs blind, 76 / 92 (0.826): the Hub 7 / 8, Dot Matrix
8 / 10, Pattern Mapper 13 / 15, Route Plotter 14 / 16, its v2 line 9 /
9, the Video Helper 8 / 8, Video Pedagogy 4 / 9, vinyl 13 / 17.
Adjudicated by re-reading each cell:

| Cell | Run | Blind | Adjudicated | Reason |
| --- | ---: | ---: | ---: | --- |
| Hub H60 | 1 | 2 | 2 | the written promise was the verbatim archive move, done; the parked items' re-triage is a separate promise |
| Dot Matrix D68 | 2 | 1 | 1 | three locked choices; the evidence shows one (B1) |
| Dot Matrix D72 | 2 | 1 | 1 | a continuous float was promised; the slider is integer-step |
| Pattern Mapper PC-01 | 2 | 1 | 2 | the done-when (owner pass/fail recorded, failures routed) is met; the live-session legs were routed explicitly |
| Pattern Mapper WL-25 | 2 | 1 | 1 | the stack was added; the console mirror's legibility is not shown fixed |
| Route Plotter PC-11 | 2 | 1 | 1 | two of four named surfaces fixed; the other two became a documented exception — a scope change, not full payment |
| Route Plotter PC-12 | 2 | 1 | 2 | every Phase 5 item had shipped; the unclosed headings are a line-retirement failure, recorded separately |
| Video Pedagogy PC-18 | 0 | 1 | 0 | the two commits under the ID are unrelated house-rule edits; none of the promised framework carry-through |
| Video Pedagogy PC-23 | 2 | 1 | 1 | several acceptance criteria not evidenced (structure counts, prompts listing) |
| Video Pedagogy WL-69 | 2 | 1 | 1 | three of four facts recorded; one partly |
| Video Pedagogy WL-70 | 2 | 1 | 1 | footer settled; the statement's placement not |
| Video Pedagogy SD-09 | 2 | 1 | 2 | a superseding ruling: it held and was acted on (the mockup rebuilt) |
| vinyl PC-03 | 2 | 1 | 2 | the literal done-when is met; a new remainder opened |
| vinyl SD-02 | 2 | 1 | 1 | the rule rewording is shown; the edit token is not |
| vinyl SD-03 | 2 | 1 | 1 | the guarded route is shown; the moved fields are not |
| vinyl SD-11 | 2 | 1 | 1 | three of four parts shown |

To the run 5, to the blind 11. The run's pass was generous: ten cells
fell from 2 to 1 and one rose; the mean over the 92 falls from 1.73 to
1.63.

The full register — each promise as run / blind, and → the
adjudicated score where they differed:

- Derry (0): 
- Hub (8): H01 1/1; H03 2/2; H17 2/2; H56 2/2; H59 2/2; H60 1/2→2; H62
  2/2; H66 2/2
- Dot Matrix (10): D13 2/2; D47 1/1; D58 2/2; D59 2/2; D62 2/2; D65 2/2;
  D68 2/1→1; D69 2/2; D71 2/2; D72 2/1→1
- Pattern Mapper (15): PC-01 2/1→2; PC-03 2/2; PC-05 1/1; DL-01 2/2;
  DL-05 2/2; DL-06 2/2; DP-09 2/2; FU-02 2/2; FU-08 1/1; WL-03 1/1;
  WL-23 2/2; WL-25 2/1→1; SD-02 2/2; SD-03 2/2; SD-04 2/2
- Route Plotter (16): PC-01 1/1; PC-04 2/2; PC-05 2/2; PC-06 2/2; PC-07
  2/2; PC-08 2/2; PC-09 2/2; PC-10 2/2; PC-11 2/1→1; PC-12 2/1→2; PC-13
  1/1; DL-03 1/1; DP-01 2/2; WL-05 1/1; SD-01 2/2; SD-02 2/2
- RP v2 line (9): PC-01 1/1; PC-02 2/2; PC-03 2/2; PC-04 1/1; PC-05 2/2;
  PC-06 2/2; PC-07 2/2; PC-08 2/2; PC-10 2/2
- Video Helper (8): PC-01 2/2; PC-03 2/2; PC-09 2/2; PC-15 1/1; WL-12
  1/1; WL-19 2/2; WL-21 0/0; WL-24 2/2
- Video Pedagogy (9): PC-18 0/1→0; PC-21 1/1; PC-23 2/1→1; FU-04 2/2;
  WL-69 2/1→1; WL-70 2/1→1; SD-04 2/2; SD-08 2/2; SD-09 2/1→2
- vinyl (17): PC-01 1/1; PC-03 2/1→2; PC-09 1/1; PC-11 1/1; DL-03 1/1;
  DL-05 0/0; FU-02 2/2; WL-02 2/2; WL-10 2/2; WL-13 2/2; SD-02 2/1→1;
  SD-03 2/1→1; SD-04 2/2; SD-06 2/2; SD-08 2/2; SD-10 2/2; SD-11 2/1→1

#### C.5 S8 — the 60-prompt sample

Agreement on primary intent 40 / 60 (0.667); on author 59 / 60.
Adjudicated by re-reading each prompt (paraphrased here):

| Cell | Run | Blind | Adjudicated | Reason |
| --- | --- | --- | --- | --- |
| S8-02 | other | next-item | other | a one-word fragment; no task stated |
| S8-03, S8-07, S8-20 | fix | other | other | the same text: undo the agent's own edits after a mistaken prompt — not a product defect |
| S8-09 | second-model | review | review | a housekeeping review; the second model is the reviewer, not the ask |
| S8-10 | fix | other | other | asks for a combined prompt |
| S8-11 | next-item | other | other | approval without work: hold off editing |
| S8-12 | fix | other | other | a bare request to revert the agent's edits |
| S8-13 | next-item | second-model | second-model | asks for a prompt handing three tasks to another agent |
| S8-24 | next-item | other | other | a personal task unrelated to the project |
| S8-26 | plan-phase | memory | plan-phase | a backlog review and reorganisation for the next phases |
| S8-29 | second-model | explain | explain | asks what pasted output means |
| S8-37 | fix | second-model | second-model | asks for a prompt handing an enquiry to another model |
| S8-38 | fix | explain | explain | asks for ideas, explicitly not code — debugging advice |
| S8-39 | other | plan-phase | other | an interview answer during research intake, not a plan request |
| S8-44 | other | next-item | other | an acknowledgement |
| S8-48 | other | next-item | next-item | a concrete repository task |
| S8-49 | second-model | review | second-model | an adversarial falsification brief to a second model |
| S8-53 | next-item | explain | next-item | a dispatched drafting task |
| S8-56 | second-model | review | second-model | a dispatched read-only verification of a stage's work |

Author, the one disagreement: S8-27, run agent-dispatch, blind owner →
agent-dispatch — a prepared intake launch written by the preparation
run in the owner's name and opened programmatically with its five
siblings.

To the run 7, to the blind 13. The run over-assigned *fix* (6 of the
20) and *next-item*; *second-model* moved both ways (net −2 of 60).

#### C.6 S5 — recall scores

Three-way agreement over 192 cells: all three 163; run–blind 174;
Codex–blind 179; Codex–run 164. Adjudicated disagreements: 29.

The rules applied to every disagreement:

- **Q3.** 2 when the answer gives every deferral list the record
  holds (wish-list, icebox or deferred backlog lines, deferral fields
  and entries, out-of-scope lines marked "for now"), each with its
  location, missing at most one isolated prose deferral. 1 when a
  deferral list or a standing blocker list is missed or only pointed
  to, or a location is wrong. Items queued in a next milestone or a
  later phase, which several keys flag as the queue themselves, and
  permanent exclusions are not deferrals for this purpose.
- **Q2.** 2 for any real decision the record holds with its real
  reason, checked against the whole record where a key listed only
  recent entries or omitted decisions kept in tool comments; 1 for a
  design rule with a stated reason that is not a decision entry, where
  the record has a decision log.
- **Q1.** The key's stated record-only answer is the reference where
  the record's granularity differs from Git; a line the key does not
  accept, placed among the four, gives 1.

The strict reading, under which every key line counts, is Codex's; B.9
gives it per record. Cells where all three scorers agreed were not
re-opened, though the run's scorer flagged four keys as ambiguous: the
lab's next item (C007, where a decision names a next item the backlog
does not put first), the Hub's same-day order (C027, C170) and the
Video Helper's mix of ships and closures (C166).

| Cell | Record | Arm | Q | Codex / run / blind | Adjudicated | Reason (paraphrased) |
| --- | --- | --- | --- | --- | ---: | --- |
| C002 | adhd@b1a20d6 | whole | Q3 | 1 / 2 / 1 | 1 | a standing blocker list (the contract's open-question rule) is omitted — not an isolated prose line; four other lines correctly located |
| C003 | derry@665f36b | whole | Q1 | 1 / 2 / 2 | 2 | states fewer than four under v2; flags the recall line as a check, not shipped work; gives the key's history sequence from the linked file |
| C011 | dotcrowd@8d38880 | whole | Q3 | 1 / 2 / 1 | 2 | every explicit deferral list (icebox, deferred module, out-of-scope-for-now) with locations; the omitted lines are the later-phase queue |
| C014 | vinyl@06f6c90 | mandatory read | Q2 | 0 / 2 / 1 | 2 | a real decision with its real why, stated in the contract and entered in the decision log (outside the key's latest-twenty list) |
| C019 | ebay@f800a63 | mandatory read | Q3 | 1 / 2 / 1 | 2 | all thirteen key lines recovered; the four wish-list lines through the decisions that record them, with that location |
| C023 | dotcrowd@8d38880 | mandatory read | Q2 | 0 / 1 / 0 | 1 | a real design rule with a stated reason, but not a decision entry; the key is complete for the decision log |
| C029 | client-app@a9fcee4 | whole | Q3 | 1 / 2 / 1 | 2 | icebox, wish-list and out-of-scope lists complete with locations; omitted lines are the next-milestone queue |
| C035 | dotcrowd@8d38880 | mandatory read | Q3 | 1 / 2 / 1 | 2 | as C011, from the hot set |
| C036 | resolve@folder | whole | Q2 | 1 / 2 / 2 | 2 | the named entry's own stated reason for the part of the decision the reader chose |
| C041 | rp-v2line@5b19787 | whole | Q3 | 1 / 2 / 2 | 1 | wish-list and icebox complete with locations, but two deferrals are missed (a decision-log prose line and the brief's out-of-scope-for-now line) — more than the one isolated prose line the rule allows (Checkpoint C) |
| C044 | derry@665f36b | mandatory read | Q3 | 1 / 2 / 1 | 1 | the largest block (the retained icebox, eight lines) only pointed to; blocked lines and the Deferred field given |
| C050 | storage@267e031 | mandatory read | Q3 | 1 / 2 / 1 | 1 | the main list (wish-list) declared unavailable; most lines recovered through decisions, but wish-list-only and blocked lines missed (about a quarter) |
| C054 | vpr@a9a0d1f | whole | Q3 | 1 / 2 / 1 | 2 | all four deferred items with every location; the omitted brief lines are permanent exclusions, not deferrals |
| C056 | pm@24c9e93 | whole | Q3 | 1 / 2 / 2 | 1 | wish-list and icebox complete with locations, but three deferrals are missed (one blocked Current line, the brief's and the architecture's lines) — more than the rule allows (Checkpoint C) |
| C058 | pf@folder | whole | Q3 | 1 / 2 / 2 | 2 | every explicitly deferred or conditional line with its location; omitted rows are open work, not deferrals |
| C072 | client-site@2738fe5 | whole | Q1 | 1 / 2 / 2 | 2 | exactly the corrected key's record-only answer, stating fewer than four |
| C073 | vinyl@60c3c4b | whole | Q3 | 1 / 2 / 2 | 2 | wish-list and icebox complete with locations, plus the blocked and parked lines |
| C074 | rp-v2line@5b19787 | whole | Q1 | 2 / 2 / 1 | 2 | the record's four newest shipped sections in order, which the key names as a correct record-only answer; commit granularity is not recoverable from the record |
| C095 | client-site@2738fe5 | mandatory read | Q3 | 1 / 2 / 1 | 2 | icebox and out-of-scope-for-now lists complete with locations; one prose line omitted; queue excluded deliberately |
| C123 | rp@6f2ac15 | whole | Q3 | 1 / 2 / 2 | 1 | the wish-list (about half the core deferrals) only pointed to, not listed |
| C133 | rp@989f11d | mandatory read | Q2 | 1 / 2 / 1 | 2 | a real decision entry in the record (outside the key's latest-twenty list) with its stated reason |
| C139 | pm@24c9e93 | mandatory read | Q3 | 1 / 2 / 1 | 1 | icebox, blocked lines and Deferred field complete, but the wish-list (seven lines) is only pointed to, not listed — a deferral list not given |
| C154 | rp@989f11d | whole | Q3 | 1 / 2 / 2 | 1 | icebox and wish-list complete with locations, but three decision-log or brief deferrals are missed — more than the rule allows (Checkpoint C) |
| C164 | rp@6f2ac15 | whole | Q1 | 1 / 2 / 1 | 1 | its ordered four include a housekeeping line the key does not accept; two key items appear only in a caveat |
| C169 | marketing@889b65f | mandatory read | Q3 | 1 / 2 / 1 | 1 | the blocked item with every location; the wish-list lines only partly recovered from the brief, one missed |
| C174 | hub@fc4df64 | whole | Q3 | 1 / 2 / 2 | 2 | thirty of thirty-one key lines with locations |
| C178 | storage@eb96fbc | whole | Q3 | 1 / 2 / 2 | 2 | twenty of twenty-one key lines with locations |
| C187 | uvh@c346581 | mandatory read | Q3 | 1 / 2 / 1 | 1 | the wish-list (ten lines) and two decision-log deferrals missed — about two-fifths of the core |
| C189 | adhd@b1a20d6 | whole | Q2 | 0 / 1 / 0 | 2 | against Codex and the blind pass (both 0): the re-read finds the decision and its stated reason verbatim in a tool comment in the record — the kind of decision record the key itself accepts for a record without a decision log; the key's list of eight omits it |

### D. Source anchors

Every tier file, hashed at the start of the run (the end
comparison is in section 3); the run read only from this set.
Local-lane files are named, never quoted. `.DS_Store` entries are
omitted (never read).

````text
0b83dee8eae489750922124808bf1765eab46a5fa933376dd88e49a82d6052cb  self/field-reports/README.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/harun-website/.gitkeep
44ed7b218cc5af7072124b91742cf0384f21a7418a0c85f344d78be06b99237f  self/field-reports/harun-website/2026-09-24-note-deployment-snapshot.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/dot-matrix-tool/.gitkeep
a0ce25d86046ca2b67cd17e88af882abd855cae671ce80fad2c2a740d0ff9a06  self/field-reports/dot-matrix-tool/2026-09-24-note-deployment-snapshot.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/derry-lane-development-system/.gitkeep
f9df988cf9c934a8981c1bfccd7c384fa06ffe5b49849b202c0cb5f27544bc5f  self/field-reports/personal-finance/2026-09-24-note-delta.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/personal-finance/.gitkeep
b461c125577e652eeca3ec5400df2bd5315074a0516905ce6c422d6069182ef4  self/field-reports/personal-finance/2026-09-16-note-deployment-snapshot.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/adhd-research/.gitkeep
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/storage-tidy/.gitkeep
cc5fce2ab48980c4a4c16c6289f2fc1dbb2f147ddc3c57d85620cf84984e587c  self/field-reports/storage-tidy/2026-09-16-note-deployment-snapshot.md
b433265ee35b1e30ba309a018a6d4d983f1057038fdfee82a96a2e94c0b85857  self/field-reports/vinyl-sorting/2026-09-01-export-memory.md
a06614a202f2f21b2ea04886ec9f0bbed72d153cc55990712e79b75be1132592  self/field-reports/vinyl-sorting/2026-09-24-note-delta.md
8ef50eda06e41f2f87962c6690bb28b6b482fb7546b336593b69c5096278fb6c  self/field-reports/vinyl-sorting/2026-09-01-export-git-log.md
b8783a20211529ecf09f21401f2a71494ff725b7e52c3870ec2fae972346f267  self/field-reports/vinyl-sorting/2026-09-09-note-deployment-snapshot.md
1e33429b3f99f2e8fef9caaf6f7bb93621ea6eee3f12f53e9536eb0ab38ab4c3  self/field-reports/vinyl-sorting/2026-09-09-validator.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/vinyl-sorting/.gitkeep
f175271f49ba8be845a302591a252fe564df743c8e6810c86a6ad54a11f6bb72  self/field-reports/vinyl-sorting/2026-09-01-janitor.md
a32d6a4f3b2dd3aa524e1166525d47025527f63407c2eae25868faefa57284b8  self/field-reports/vinyl-sorting/2026-09-01-export-rulebooks.md
c28da645d910c8bac949de2aedf1ec616cd4f93d25ed7fd8d48652db8da1f23c  self/field-reports/vinyl-sorting/2026-08-30-export-init-prompt.md
5c14a109d05b31416bd68586dcb364de8194ab1887c7b0b2dfec1768edea297f  self/field-reports/vinyl-sorting/2026-09-02-export-agent-memory.md
c13fd9baec0627295cb8fb6f66323e6bc6f8c9545e342f5bc0716ffa9aed35b2  self/field-reports/video-pedagogy-research/2026-09-24-note-delta.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/video-pedagogy-research/.gitkeep
41ca7855c7a1b7a244e7735c353850b32c4a147e142b1715effa142121b37e0b  self/field-reports/video-pedagogy-research/2026-09-16-note-deployment-snapshot.md
5b76bbd3107b5546f1c38b1bd1199adfbd0ed43b03ae051ce2daf79ba0fcfa01  self/field-reports/pattern-mapper/2026-08-28-export-rulebooks.md
269727c20d6ff56919feff39813f5b67dd73db79e79e9128c64cf2a76d70f7bd  self/field-reports/pattern-mapper/2026-09-24-note-delta.md
1f58de42dde6ea0f0dfd2436feec1bc0c3305d5cc1b59ed2607fd69263841db7  self/field-reports/pattern-mapper/2026-08-28-export-state.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/pattern-mapper/.gitkeep
44a368be9ab03b18592e628a1a9feabed0e94062bf610496cd8c0b956473bbad  self/field-reports/pattern-mapper/2026-09-16-export-inventory.md
a99b7afdb9165882218c8c25d90f895bbc2bcd888710fc095f914746f92375e4  self/field-reports/pattern-mapper/2026-08-28-export-git-log.md
97c0483a1b1650e95efbd8c0cd1d21ffab50de4b59ca4b3dc0c0ff44db9856c9  self/field-reports/pattern-mapper/2026-07-17-export-init-prompt.md
70bc85108594039f6d06a7ebe53e710002f15e3af68d068d8667d00c4e0680d7  self/field-reports/pattern-mapper/2026-08-28-export-memory.md
00bf5cef110c0fd873d9a5879a320855c5f4fe6aee7fc93008b4c6742750ab97  self/field-reports/pattern-mapper/2026-09-16-note-deployment-snapshot.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/parenting-research/.gitkeep
e9ecc9d306fba00409da60855b4d5b977cbd0d38632f7ce57dd276280ea575da  self/field-reports/parenting-research/2026-09-24-note-deployment-snapshot.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/digital-art-audience-hub/.gitkeep
bcc17775903ad5eda2db59fb9f3e4e19fe9ce8681f24f41fac380007b8bd03a8  self/field-reports/digital-art-audience-hub/2026-09-24-note-deployment-snapshot.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/resolve-scripting-windsurf/.gitkeep
0aada23e4da457ce05457ca844bbbef359499a5d443d86d256138562b3bb55a9  self/field-reports/resolve-scripting-windsurf/2026-09-24-note-deployment-snapshot.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/marcacao-mestre/.gitkeep
9bcbbba7d6b6b84ef0ae56c06c5fa9283294bb4416f27738ec40e08f8b952f40  self/field-reports/marcacao-mestre/2026-09-24-note-deployment-snapshot.md
b3ed9f69cd0c3f15b0f5aac11a9055668076ca52b9ae49461d78ebdbaa5e611c  self/field-reports/uon-video-helper/2026-08-26-export-review-artefacts.md
8f91ec5383a499fad56a79f548c55706d0e723433ad4ca4306bdc4c9eb3fd757  self/field-reports/uon-video-helper/2026-09-24-note-delta.md
2e647daca3b478b285ed3f79bd3ff22bb1641192e60c07e23d3046623b90441b  self/field-reports/uon-video-helper/2026-08-27-note-usage-analysis.md
be7b1f87aad85ab6b59e93ed8665c314de659fb833a11c833938e3249286836c  self/field-reports/uon-video-helper/2026-08-24-export-init-prompt-codex.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/uon-video-helper/.gitkeep
70cc15d3b1f556ccd913a475e125a5dfbbdc9bb336d469ca89c29e71c8f0d834  self/field-reports/uon-video-helper/2026-08-27-export-rulebooks.md
fcb3c8a55f444d2340d5de82228dc919fa333b94a30756cf90aa782be03e6545  self/field-reports/uon-video-helper/2026-08-27-note-deployment-snapshot-codex.md
8d4356b8d617f6650970e44a1c2060f3385c5f7dd4338d94842207fdbf9b38b1  self/field-reports/uon-video-helper/2026-08-27-note-deployment-snapshot.md
5d13fd70cd92b646572a342459507a27c0ae24fcb6e1b51b4ede6f3e2b31235e  self/field-reports/uon-video-helper/2026-08-25-export-end-user-evidence.md
3351d63248b1fb6bdf8d27977d3b27fb6ff01c6137f0b4a378ea04a45e60c391  self/field-reports/uon-video-helper/2026-08-27-note-usage-analysis-codex.md
ae33170922cbb24e44869998b5b9df356455e74954593588b1f123147dc8f738  self/field-reports/uon-video-helper/2026-08-27-export-git-log.md
6a27bc1d39c7a100529da178a3e75ae82331335508acf8876cfb9e28eecbb4bb  self/field-reports/uon-video-helper/2026-08-27-export-memory.md
b01d6ae9b979857fa4fae3f2ec392aba80198bbce8ea445ab3f850635d23a417  self/field-reports/uon-video-helper/2026-08-24-export-init-prompt.md
f6f7ea2ce59ac99396566d162d5b248f31b924f7b3584af69ce48aa00a2cf1b8  self/field-reports/marketing-skills/2026-09-24-note-delta.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/marketing-skills/.gitkeep
2305eedc7984ee2d69651fd989b0707f94d47e921eed9ada7889516e9fe95e34  self/field-reports/marketing-skills/2026-09-16-note-deployment-snapshot.md
1889f8557d8f81ec4510e26a5544804ff451c96481bf9c3d391524c00df96bf2  self/field-reports/laurillard-learner-journey/2026-07-10-export-memory.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/laurillard-learner-journey/.gitkeep
2149b9619f1bf08ada860914b4b65b622f3ebb6306497fb88800271cd68b4298  self/field-reports/laurillard-learner-journey/2026-07-10-export-state.md
25c477820862db21382d32716583ee31db83b1f9a82fdba332c6f6214114c34e  self/field-reports/laurillard-learner-journey/2026-09-24-note-deployment-snapshot.md
6e6a460b1d0f544ab9fc12ccd805638017226079086c96e29af69693eccd5fe1  self/field-reports/laurillard-learner-journey/2026-07-10-export-git-log.md
daef9a89343d426d0d030fd8ac54c635c5806c05a573ffec7fc6d875ecce7892  self/field-reports/laurillard-learner-journey/2026-09-24-export-inventory.md
c4f95507deca47d74200a44f3b93d6271d2f531c99ea07e0317f2daf3c0408fb  self/field-reports/laurillard-learner-journey/2026-09-24-validator.md
b588a7755f532dd0adf99bb2842b3a8496874e07b62e95a30a678e27246afe0f  self/field-reports/laurillard-learner-journey/2026-07-10-export-rulebooks.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/windsurf-ai-credit-display/.gitkeep
d6c352970daa7e8df57ce8e9e14be95609f8bc75572369ef4a3bf56daac37043  self/field-reports/windsurf-ai-credit-display/2026-09-24-note-deployment-snapshot.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/dot-crowd-navigator/.gitkeep
cbae463eba17568dfbb3aed505310f5636551ac73a82da9a04f41bd637c88ae3  self/field-reports/dot-crowd-navigator/2026-09-24-note-deployment-snapshot.md
51bf4216bb5340d4419c84f10ecf18b6fb87c840cd8d44b1af42ab11566a1f03  self/field-reports/dot-crowd-navigator/2026-08-17-export-rulebooks.md
df0069c8bebb796beb802c9fadb6056881655f7311e0cbd521dfdf4fff9e7578  self/field-reports/dot-crowd-navigator/2026-08-17-export-state.md
a79851825e8c08a02aaddd68e6712bad7fad0c9fddabd5696f6a60ba1a9abf4c  self/field-reports/dot-crowd-navigator/2026-08-17-export-memory.md
ecf79549c47bc829f5a7a614da9695394267bdfa9978b5675c1072e077cba70a  self/field-reports/dot-crowd-navigator/2026-09-24-export-inventory.md
fb70cf2fcac539de87e23884c796ee46e185f48f2c2b8f0c8a8e25d03e207698  self/field-reports/dot-crowd-navigator/2026-08-17-export-git-log.md
9f0e326698995d21e105b2b7fcacbce0661c7a76152156bad75d039856ac4dc7  self/field-reports/route-plotter/2026-09-24-export-rulebooks.md
a41bc0918e125fb5e3901ce3e0324a6d803bc292712402d27aaf3e4425941e16  self/field-reports/route-plotter/2026-09-24-export-state.md
93781c7a4238fa6e4614146b449ff9abb7643b6f2ed4a3254552fc43f1489368  self/field-reports/route-plotter/2026-08-26-export-review-artefacts.md
9b7deab98ce65c075802c3a45062801f55e18d575f531f62a7128f1ee2ea82f7  self/field-reports/route-plotter/2026-09-24-note-delta.md
60e8364a7168e3a4217ca037d1d512a6e924374d1c0a11e16294450029a845ad  self/field-reports/route-plotter/2026-09-24-export-memory.md
50fa7861325b6fb8810c88edecb7d8e91f11d705bd7f085185929f01662db131  self/field-reports/route-plotter/2026-08-27-export-memory-codex.md
67f7b9202c597bb2f71e18014259045869715c93074e86d5e3a27aa98f967caf  self/field-reports/route-plotter/2026-08-27-note-deployment-snapshot-second-pass.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/route-plotter/.gitkeep
d7e39d544676ee206365242534d0f9396c962c8ddc86ea302a9d7dea38c79918  self/field-reports/route-plotter/2026-08-27-export-end-user-evidence-codex.md
bd2d225c3ad094a468938259279e2c1d9c2a2ff63ec9bc41173769b76db154df  self/field-reports/route-plotter/2026-08-27-export-end-user-evidence.md
4a6e45af599a9b2e3bf67692dd40fb7fce2042a14359d7584b1fcb787a32ee10  self/field-reports/route-plotter/2026-08-27-export-rulebooks.md
b4aeb4cc9944207e8d1de51528e4423bb098d62d2b02ee1dad2edd8c2324b6f3  self/field-reports/route-plotter/2026-08-27-export-rulebooks-codex.md
e0691222e0eb7da4164904117f06e6edc54e5b2a3c5833d4ba8c107e3916208e  self/field-reports/route-plotter/2026-08-17-export-init-prompt.md
9368a2821feccd89fbcf3a054e8e67bd3279866092e5ae296964fa7b5c0228b0  self/field-reports/route-plotter/2026-08-17-export-init-prompt-codex.md
ec3b509bfaccd3aec727c1878744c1d9bfc269b56641dbaff579cd1307a89f0d  self/field-reports/route-plotter/2026-08-27-note-deployment-snapshot-codex.md
82558f82b2960cbd1abc2032ffaef9fb18b445cba009f1f219d1a03870e39177  self/field-reports/route-plotter/2026-09-24-export-inventory.md
8e8cef288ef0f90455eb6c8a67fec5b02d52434ea486a134ad74c98bb2bdd670  self/field-reports/route-plotter/2026-08-26-export-review-artefacts-codex.md
6fa2c1c71c7968a307caa3f50abd356d7f8e8ee625b90748cfe882e97cc15a48  self/field-reports/route-plotter/2026-08-27-note-deployment-snapshot.md
0ae8fcca87e1fbac840a6474a092b179daf944b7599fc983969f5a786ec3c261  self/field-reports/route-plotter/2026-09-24-export-git-log.md
ccb2976e6bacc708ff940f6d47e24a8c74ab6e583702082695da12fb2bb4e675  self/field-reports/route-plotter/2026-08-27-export-git-log.md
82e527aca36bac807e4329addb9ba9a30cff79982bb743e53d781da987636d6e  self/field-reports/route-plotter/2026-08-27-export-git-log-codex.md
3f2f36c38545abbd1df8f1c9a3b97ab4c3a52c31deb5dee48f6c81ce12ece984  self/field-reports/route-plotter/2026-08-27-export-memory.md
4db796b9496782de9b489307c8ac123f9ce642170a95095d87b1e9812a6b067c  self/field-reports/ebay-tool/2026-09-24-note-delta.md
8b140559647c9375bc4d7ecd42a829854989136908a556dc27f69f297ab03852  self/field-reports/ebay-tool/2026-09-09-note-deployment-snapshot.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/ebay-tool/.gitkeep
8fd3843ed4e8358912efe6843dfc97308177e0329123edd3bb4722b7cc8843d2  self/field-reports/corperate-image-generator/2026-06-03-export-git-log.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/corperate-image-generator/.gitkeep
223f6e009df863dc0b84289c11dedb04398789b10687106efe34eb4ecdcc9dee  self/field-reports/corperate-image-generator/2026-09-24-note-deployment-snapshot.md
b4822b3e3c642a3dff7d0f9f092ebb3bed9fe131d431d254a9384142e2cede44  self/field-reports/corperate-image-generator/2026-06-03-export-state.md
056231ebaa0b21b908d2f063fd1eacd4d51bbc9d1a76fbd062f1a1df54ebc6ca  self/field-reports/corperate-image-generator/2026-09-24-export-inventory.md
9e7ecf6ac661e289bf95810261c1d74b0cf4d33efe4552a05425efae0c6087ff  self/field-reports/corperate-image-generator/2026-06-03-export-rulebooks.md
9c796f3d9e19ea1905eb4672304fa67b77612faa0429018765dd8fe1972cdf37  self/field-reports/corperate-image-generator/2026-06-03-export-memory.md
9d4de321c71af4e12709d3d863cd81c9c481e65a70a6af91e637a3ed2c18d2eb  self/field-reports/artwork-form-filler/2026-06-14-export-state.md
792019e46c87e97ad32abd9dfb08126815c4a944be62e3f56583ffa22555a9b7  self/field-reports/artwork-form-filler/2026-06-14-export-memory.md
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  self/field-reports/artwork-form-filler/.gitkeep
2e042d7dda0c1097ecd872995a7fb47b16798d6aedf2be36dd9a152ce538ab70  self/field-reports/artwork-form-filler/2026-09-24-note-deployment-snapshot.md
a4fe1cdcba8ed901caa17104ca6cf7519b393b779d2ab7e33b047e49929c1926  self/field-reports/artwork-form-filler/2026-09-24-export-inventory.md
d9dffd3979f9f49bc7b2cca79bc4f87ad5162319487e9cbadd0f7157c38ef554  self/field-reports/artwork-form-filler/2026-06-14-export-rulebooks.md
1cc069077915594d376143af76e95855e80a881acdc2a3be994c062fa9787ec9  self/field-reports/artwork-form-filler/2026-06-14-export-git-log.md
d15c9b46fe39d35e0bf72a4482c359765de9c738ee3ccbddd794d1b66422cfa3  self/field-reports/harun-website/local/2026-07-04-export-memory.md
b964c365e73953dc9e9ba7cacd68be811622109f3a5c5214e9e4593e1687d111  self/field-reports/harun-website/local/2026-07-04-export-init-prompt.md
a8c5f7377b1675c151f7267b1eeae724f95359d7120eb52e41b697a2b382a64b  self/field-reports/harun-website/local/2026-07-04-export-git-log.md
d2888eee45fd6d3622be495d08172e8fcdda67e790993168f21445d527a21896  self/field-reports/harun-website/local/2026-09-24-sessions-manifest.md
0da6ef065dee95347776517784d0dd8ceb0fae2f117ebc725c8a2f2cbff44f73  self/field-reports/harun-website/local/2026-09-24-export-prompts.md
cb32472b383410ed48b1007e583787107e4152774f90d04852704ee2ab9219e6  self/field-reports/harun-website/local/2026-07-04-export-rulebooks.md
2559ace49d783090b84a05ff3013c92709fd15f9b423e14f1120f119d4718d8d  self/field-reports/harun-website/local/2026-09-24-export-bundle-manifest.md
db67ada9a2283daf781ba7e28318424afee6dcb93dc29112e2b2937ed8d9dc82  self/field-reports/harun-website/local/2026-09-24-export-inventory.md
0ea982499acb44c019c2024a43b4aa1f80dba99ca65090182f8858cd72ce69a1  self/field-reports/harun-website/local/2026-07-04-export-state.md
02f6066b3a0f36c9a265e7d804a4abbd61bf2a0621b1569f175c010755c158e8  self/field-reports/harun-website/local/2026-09-24-sessions.tar.gz
645d1f12c047d2e7a62e388438e1a2bc8776e0cf910e10617652363c9d7f427f  self/field-reports/harun-website/local/2026-07-04-repo.bundle
e8d06e893e8556b06f63b55b015f37b57a876fd8b211139ab4a3ee0c8b0e89e3  self/field-reports/dot-matrix-tool/local/2026-05-29-export-rulebooks.md
11af6f9546d8c0ecd848e0478bf56dce8ecc1072ca327f60473c0f401785ab0d  self/field-reports/dot-matrix-tool/local/2026-08-26-export-review-artefacts.md
51ba38e19d4e7bb61e83b8b8dabfebf82fb56ac44b64d0716086da989d7d617f  self/field-reports/dot-matrix-tool/local/2026-05-29-export-state.md
4d8f8288322578633dc196ae41fd6496409d2ba55b6895ebf7dad5f53b5eb621  self/field-reports/dot-matrix-tool/local/2026-09-24-sessions-manifest.md
730b4a92e1c82a6a9973d6429541a0214f294e687bc012e81cf2ffd5a433e27c  self/field-reports/dot-matrix-tool/local/2026-04-17-export-init-prompt.md
7214a85d7e9dad4594b1cb5715f3366476f659fd21ffe3192ce663cb717687a6  self/field-reports/dot-matrix-tool/local/2026-09-24-export-prompts.md
1f14218b677ebf4aa7432941e484cbe1b168d533f31e0d4d20f415ec2fa6280d  self/field-reports/dot-matrix-tool/local/2026-09-24-export-bundle-manifest.md
dc09ad97ed71ce0ea6f5631ff06b31d2b07d963626b22973985f35bc46f24349  self/field-reports/dot-matrix-tool/local/2026-09-24-export-inventory.md
f1af2e5b24917f8d53c28a27e941debb5467eca86244ad98e97e7779f8a75c22  self/field-reports/dot-matrix-tool/local/2026-09-24-sessions.tar.gz
8c6898c5a7b13b4171c5f1c65bd48db3606980403ebc2d0bf7bbf7e3defaffc7  self/field-reports/dot-matrix-tool/local/2026-05-29-export-memory.md
8dde22842fab6865267c19400f55979a8eba2949c4289e6f205772c313793529  self/field-reports/dot-matrix-tool/local/2026-05-29-repo.bundle
e7b1ff3acb2423b9d377844e865452cc3abb0bd85f45701c85804131c945fd5d  self/field-reports/dot-matrix-tool/local/2026-05-29-export-git-log.md
6a32a0ff973d442da5d9fae91d84758a9e4225572873a51a3fce4b9030547f5d  self/field-reports/derry-lane-development-system/local/2026-09-16-export-state.md
48aa74e3b423629ab6f8dd9b71e6eee28ebba087f0569fb064087eb3eb0f137b  self/field-reports/derry-lane-development-system/local/2026-09-24-export-working-tree-snapshot.md
37273ce0a5ab3f455950b0574254c36842bc439864b262eaa975b5f47bdf9483  self/field-reports/derry-lane-development-system/local/2026-09-16-upgrade.md
9313c22d2b4b9aa5506d50a3c696f363480546ba4f850b6e73ca8e862302640f  self/field-reports/derry-lane-development-system/local/2026-09-24-note-delta.md
5e3c92fd0106c5362188f8328a2e27f9bf40d752a3d55db7bbea23f5b9c9e91b  self/field-reports/derry-lane-development-system/local/2026-09-16-export-memory-pm-skills-project.md
89366399dc1a11717f50c573d3c2c36a12d122876e62b22685b3e3ddce0540e7  self/field-reports/derry-lane-development-system/local/2026-09-16-repo.bundle
ae2c9293d6abfc6db84118d1dbbc1b1951e96f92295374a61a71f9ec58171186  self/field-reports/derry-lane-development-system/local/2026-09-24-sessions-manifest.md
5ae32eaa27f711f2559ac1ae2f582f8da097693925eda4ba26929ef7fc5d471a  self/field-reports/derry-lane-development-system/local/2026-09-16-export-memory-project.md
6a4e72f11200c5e8461da6f14e07f67030a979daecaa2d6449d9d37ec3da8922  self/field-reports/derry-lane-development-system/local/2026-09-16-sessions-manifest.md
95ce75a594ee93ba21c7d651ba5d5dc6bf677c22dd767bc5c4abb40c4d275c78  self/field-reports/derry-lane-development-system/local/2026-09-16-note-delta.md
b84981032af6bde775255e052d54deaa8b162f00421a5da0541dc6de85988e16  self/field-reports/derry-lane-development-system/local/2026-09-24-export-prompts.md
9540eaf193c19a061370171cea2d622db8ff8faf9dfd25bfb822fa67927b37f6  self/field-reports/derry-lane-development-system/local/2026-08-23-export-agent-memory.md
7070ece057be69386a3c7976ee115d602f9a2c4ee450985c43dcafb7ecb8ca9b  self/field-reports/derry-lane-development-system/local/2026-09-16-export-git-log.md
44828c7381daa2d89c5856c9368c36f22b7497abf881c0894610b8df1e9ac64d  self/field-reports/derry-lane-development-system/local/2026-09-24-export-bundle-manifest.md
08b46e544d1d861c40e08aeb2b6d8383161e070022dbed8f5d2da22d97844ce0  self/field-reports/derry-lane-development-system/local/2026-09-24-export-inventory.md
7dc5a7ad5a5aaf1593268e08c9eccc00b6429a33139426de88a94451eb2cce55  self/field-reports/derry-lane-development-system/local/2026-08-23-export-chat-history-and-trajectory.md
8fc671505e3b625894f4751f970e9e0745933856f19784fe618abe87ae02cfd5  self/field-reports/derry-lane-development-system/local/2026-09-24-validator.md
be4378b3a91d58de6a9eee2a3795f92e0323473df8498c3b794dea1b5eff833a  self/field-reports/derry-lane-development-system/local/2026-09-24-sessions.tar.gz
41d3472c23c32a997c2bff61dd67d877fc8efb280c0faf3b6668ebcd5f8a6457  self/field-reports/derry-lane-development-system/local/2026-09-16-sessions.tar.gz
736c7aa40df6ab5df75ac3820cc10e5dd46a40a740c53189a7a6be732630a0ad  self/field-reports/derry-lane-development-system/local/2026-09-16-export-rulebooks.md
7b982cc5c8ab42b5e6ae857548008065c3394ae1d23a220e84ffe859a29522c7  self/field-reports/personal-finance/local/2026-09-16-export-state.md
f2c0fc1615ee4ecdf08ba20aa611995e25b06397a9ed8f21c0b90be0a35691fd  self/field-reports/personal-finance/local/2026-09-16-upgrade.md
3b954cdabb20dfb74fe1dbdaaf70dc47eb80db6a94638b71581b131f9bd0afbb  self/field-reports/personal-finance/local/2026-09-14-export-history.md
7e6c2ed7c70db6348ca6c4a3940d2d91baf6cdc92ae6f57c1923275ce1ef917e  self/field-reports/personal-finance/local/2026-09-14-export-corpus-v0.3.zip
37178b84598efd0272f1a4ca7c3bb2e6350585949b0dfac96a054c1d597c7f6b  self/field-reports/personal-finance/local/2026-09-16-repo.bundle
0f46ea1d544405d0bf9114faa5daa2dbf24269714d76887b234d623299a92ce6  self/field-reports/personal-finance/local/2026-09-16-export-inventory.md
8d9adff9d646d5d690aed21e0d67d93602d0d673d31bd9cddedf665cc53f5e18  self/field-reports/personal-finance/local/2026-09-24-sessions-manifest.md
16eed8ca3d4e52b972e30a4d3fde4b4b1e706631d7af5d57b69993588b2d22f0  self/field-reports/personal-finance/local/2026-09-16-sessions-manifest.md
8a90995f4ecab37bde3d338c087ced9c44e9cee99292f737a6aa8f0a5be3fd91  self/field-reports/personal-finance/local/2026-09-24-export-prompts.md
9455b2189d754d11e2b03f7728c8bf78f42d7c664817df2efa0e8e100050d4d1  self/field-reports/personal-finance/local/2026-09-08-export-init-prompt.md
b109a22612f97d2c168b3fc113b04df94439ac43d9cf5cd4683c1d99286f0677  self/field-reports/personal-finance/local/2026-09-16-export-git-log.md
f762cd59999ed52db60c28074e125d2cd2034fd5745deab9eee94d7508116364  self/field-reports/personal-finance/local/2026-09-24-export-bundle-manifest.md
580754d838d1116c51c8e875bf697ef2401ffac689d24aa94c5920fadc1c2b93  self/field-reports/personal-finance/local/2026-09-24-export-inventory.md
f8fb79c309b85c2a7fc1ac0bb438d1a679a04dcca1e7f9abfa6f3d798fd2342a  self/field-reports/personal-finance/local/2026-09-14-validator.md
5500aa93579ffa3409a21b78d9bbf9ff506a74f25eab1fd250dbc4dc7b16e7a4  self/field-reports/personal-finance/local/2026-09-16-export-memory.md
11e6421e1b6356f7fa21255c84856c0eb245df5cfe41b25750bb0b8e752b4b59  self/field-reports/personal-finance/local/2026-09-08-export-agent-memory.md
3df10dd8455799d12e5df5d61643a805c96f78b404a77fbab18615ba870b2f42  self/field-reports/personal-finance/local/2026-09-24-validator.md
162ce0da866b141c3a3ed1fd00742f4b607dc17cfc5f469ccec2a6d8e93f440f  self/field-reports/personal-finance/local/2026-09-24-sessions.tar.gz
47a3a4d69836f3fa464f57a33c914b9bc0c48649b1d20d75a8f8c32562f3e2e2  self/field-reports/personal-finance/local/2026-09-08-export-corpus-v0.2.zip
a1663f1df49500b46a4846841ab167c42150adef4a51a23ab24843376853cab2  self/field-reports/personal-finance/local/2026-09-16-sessions.tar.gz
953b023c213c25f97f246d8dcae67d2cce3470deb7b84984fb066bdfe203f7b7  self/field-reports/personal-finance/local/2026-09-16-export-rulebooks.md
868b1aab278abcf1b311bc43d21ad92db0b74e75195efb5b1bbc658fe7259a4d  self/field-reports/personal-finance/local/2026-09-08-export-corpus-v0.1.zip
ae4fed1b1d01931375ba932c1d4a2605226439725d2f2146b12211f41fd4dffa  self/field-reports/adhd-research/local/2026-09-18-export-git-log.md
4ddba5b971db7b9b85dfdbf0adcd004b6b5667cc2949b03fc242afbd11be865e  self/field-reports/adhd-research/local/2026-09-24-sessions-manifest.md
e366ead35fb5e41dfd7aeac146db9f0d85df2bbc7a9bfef2ef939fa528672d15  self/field-reports/adhd-research/local/2026-09-24-note-deployment-snapshot.md
32eb337ff234a48df7ac25a7c6fb5612eb02d22204d3ab50d8e8aff20145be69  self/field-reports/adhd-research/local/2026-09-18-export-state.md
493ceb3e847483f86af275928a3fd48177832e5b24db69de268ca4bc27e2c695  self/field-reports/adhd-research/local/2026-09-24-export-prompts.md
4936be89adfaec27722c5da5a2069bba0d62564f10ea90d7682816842b3e17a6  self/field-reports/adhd-research/local/2026-09-18-export-rulebooks.md
6ff3d4591c7e671ffbbd80d31dc24c4fa12f681a850532521ca67f7ead5d6bda  self/field-reports/adhd-research/local/2026-09-24-export-bundle-manifest.md
66d60784fcb3e0296c1834a52dc13c4baf17fcc17745f38b6df9e7d75664e526  self/field-reports/adhd-research/local/2026-09-24-export-inventory.md
cdd7b761974341acba8417a47f6c58c6193605cdf06769bda5491ec40e03290d  self/field-reports/adhd-research/local/2026-09-04-export-agent-memory.md
14fa829408e40e9f188863dcba2636661cabb34731ace63cc2e9f6e09d6c2e72  self/field-reports/adhd-research/local/2026-09-04-export-init-prompt.md
8f7758cbc9fb15d39950cc8e1cf866d4c4819f7d77f43354f55498b452b5116f  self/field-reports/adhd-research/local/2026-09-18-repo.bundle
9d78d5ea3f24656747d8eb8f585ae498372ce50a87a05f0e2c655a8d13239e98  self/field-reports/adhd-research/local/2026-09-24-sessions.tar.gz
49b3c2995b627e7516b8dc27ef9557725ba96b36b35f1ffd8f546eb75e7a69ec  self/field-reports/storage-tidy/local/2026-09-13-repo.bundle
206d05cac4b607e489cf0d7e757edb18c9da586583bc632a7294dc6e157cb02b  self/field-reports/storage-tidy/local/2026-09-16-upgrade.md
91c4ad8dcf80d8ac767f811aca081e4975e820f2c183955f536b3deba93383e1  self/field-reports/storage-tidy/local/2026-09-13-export-agent-memory.md
7b14f45d8a2b097eb25617e324be3668d4d52056e3e72e6e0fe7b48787b1b693  self/field-reports/storage-tidy/local/2026-09-16-validator.md
6c1626a4cf16b467be770ff4b47f747e86e123bc070e2ee4e478d17765447ff3  self/field-reports/storage-tidy/local/2026-09-15-janitor.md
79806ad746f9629ffd5b01cf88f4fe9baf61be9154d6badea9b971982383521b  self/field-reports/storage-tidy/local/2026-09-16-export-inventory.md
2eabb389646414d439c743bbffaf5c1a4e6255555e53aaeded9c86bb32451b71  self/field-reports/storage-tidy/local/2026-09-11-export-init-prompt.md
254aac27aede3a4fb98a06eff90bdd7fc06196ac38dc9a3958ae0bb87b9ed8f6  self/field-reports/storage-tidy/local/2026-09-16-sessions-manifest.md
39a940dfd2619c138727e969e0108d3c8cc67bc1187ce14b5e78fe2f44f30f32  self/field-reports/storage-tidy/local/2026-09-13-export-memory.md
434a82023afeabdc527fb7f583f39ad0a8caa87c8d0346fc48f647e27712246f  self/field-reports/storage-tidy/local/2026-09-13-export-git-log.md
9f89fe9db5ab28a42791d0465f94bd7cb66d134b034d530fef27f8e5255a605c  self/field-reports/storage-tidy/local/2026-09-13-export-rulebooks.md
f73e5933fa47631fdc046350e7ee135c72280331968d77e7a9feee55455e4f95  self/field-reports/storage-tidy/local/2026-09-16-sessions.tar.gz
2ae9d50d62ce1fa8dabfc813bb0800156cf9a96e1a14027f04794a02dc44a963  self/field-reports/storage-tidy/local/2026-09-13-export-state.md
90f7ad20ad4267490fe20766d9d89053a4072fe563bba6016ef2427e8f45b23b  self/field-reports/ebay-tool/local/2026-09-16-export-state.md
1edd1007efbd14facc98a387968d9cf1f8841165444b06b76c7000e2ed1ea139  self/field-reports/ebay-tool/local/2026-08-31-export-rulebooks.md
d32c497d1c8223206b227c346079286a0a9c433918514fa8ac2f387d365635a0  self/field-reports/ebay-tool/local/2026-09-16-upgrade.md
3b75d64ef66589c9c25c4a60b02240ba15d56fafc1741c5e53cbad9415047cbd  self/field-reports/ebay-tool/local/2026-09-16-repo.bundle
ddeee67d2b5459bf092c0af722d3196d10208e716227eb3239cefe50fc8d4470  self/field-reports/ebay-tool/local/2026-09-09-validator.md
bd0764cd3bb818fd4f40442b0b9119ce19434ced15ba2eef282fec939018fd23  self/field-reports/ebay-tool/local/2026-09-24-sessions-manifest.md
3913632aef8c096158926867276be7f85f614388ddd0f837edd450dc67899592  self/field-reports/ebay-tool/local/2026-08-31-export-git-log.md
ecfc5d60139aece1618cccd2122b7e4c718303f88b19d3eb272bccb664bf2e7e  self/field-reports/ebay-tool/local/2026-08-31-export-memory.md
4d5450a43c7c3ec03bcee7aa2a678a49bfe8bc0647f8960aa0914fd5e90dccaa  self/field-reports/ebay-tool/local/2026-09-24-export-prompts.md
e7420e431098044b8b87893102a30f52367d66e46b95b86a142a89f2cf47c116  self/field-reports/ebay-tool/local/2026-09-16-export-git-log.md
b917e3fbabf0698abc83e2f3be7ed8f05723620458cd1e058322ac8056069b62  self/field-reports/ebay-tool/local/2026-09-09-sessions.tar.gz
2acea8baa1167f05a53fee4dfd2cd57aa49119bfa14f0ed21346d9ed7ed8e882  self/field-reports/ebay-tool/local/2026-09-24-export-bundle-manifest.md
7a71cb461ae3a81cfa426810ceeeb4c7d286a026780dbc8ab54858e8a4c4000f  self/field-reports/ebay-tool/local/2026-09-24-export-inventory.md
4e4778fdb1b7dc5c2a752e20d19641f7b7c4b7d39674c782aa98f7464df97d4a  self/field-reports/ebay-tool/local/2026-09-16-export-memory.md
1e11184b5cce803504e06155a695c97b954352bb082a2a821d09d0beed47b459  self/field-reports/ebay-tool/local/2026-08-30-export-init-prompt.md
a9e214008cd64738ea26d69038f1a122fe23db4847f1b0908483778aa56dbd10  self/field-reports/ebay-tool/local/2026-09-24-validator.md
cb78092593917790ec2e6d451cebabe472128cdb4bcdc6a674ecc3a16dd50e21  self/field-reports/ebay-tool/local/2026-09-24-sessions.tar.gz
2f1b0b24f2827a1710b15730355fa1a719837ce740610dc7b77bedad9fd9dacb  self/field-reports/ebay-tool/local/2026-08-31-janitor.md
526f36e170f0aa47b9623d6e0e4fe6b2bccdacc4fcade684ee771149fbfecc16  self/field-reports/ebay-tool/local/2026-09-16-export-rulebooks.md
a0cf38673e0fb278dcea6b25b5d26c503fb3a536f4e9dfc950b025cd614688ac  self/field-reports/ebay-tool/local/2026-09-09-sessions-manifest.md
3100d8d3c47ef9e498ee3d5e8da2503f69cedba54c42a15feaed2a51729dd7a5  self/field-reports/corperate-image-generator/local/2026-09-24-export-working-tree-snapshot.md
f12311ae502756813ff2b5cf94ca376c2e9b1b521cb4397c62433bb4a3cfea6a  self/field-reports/corperate-image-generator/local/2026-06-03-repo.bundle
703ef20d90bd2ac33e9921ce53bf4670b80ac95351a42a445dacf8cba3112299  self/field-reports/corperate-image-generator/local/2026-09-24-sessions-manifest.md
8e962e9a76e2dd2e7637b9db939edcd43908e2f93e89b831d41eaea0bc0c3ba3  self/field-reports/corperate-image-generator/local/2026-06-03-export-init-prompt.md
37a0e23b65bb7062f3225fb8facde06c8be6809ecad191f79d7749a1bdf959af  self/field-reports/corperate-image-generator/local/2026-09-24-export-prompts.md
d5a1c020e874743d7071868fcca8367f537205815874dde417ad50b067275f8b  self/field-reports/corperate-image-generator/local/2026-09-24-export-bundle-manifest.md
1dad9a1623395be8aea1f4729dcb2d4d0881f5560109a3c1ac5297c1d727c64d  self/field-reports/corperate-image-generator/local/2026-09-24-sessions.tar.gz
9c07c6d8b1d0c63866d3ed7fe469bad0f0c0a044a9df5e4afe37bcae2ae834e1  self/field-reports/artwork-form-filler/local/2026-09-24-export-working-tree-snapshot.md
e0a14c585246fbc43f844aeee93d6a9ce429c2148afb7f04bdc7fc3d6801d50e  self/field-reports/artwork-form-filler/local/2026-09-24-sessions-manifest.md
801ee58241ec59e04881b430b1b7d2e72a90968eb65ba296efab61a9e0dbc6c3  self/field-reports/artwork-form-filler/local/2026-09-24-export-prompts.md
dcec81914df96ddbfa54529872584ec8bcddeebfab2053744827f4c94c4d1a63  self/field-reports/artwork-form-filler/local/2026-09-24-export-bundle-manifest.md
0385c5056871f3b6c03eef60d69f02935f3e00ca8c84b4a8f8987cad31089cfa  self/field-reports/artwork-form-filler/local/2026-06-14-repo.bundle
9f6bb3f080899b70e5b60125a908d7595bdc563c16145f1ae4f546313dbd95e1  self/field-reports/artwork-form-filler/local/2026-09-24-sessions.tar.gz
b4fb79fe78933218db716bd31395b133eeeec86ec5b8e103d6db671fe1e3ce9d  self/field-reports/artwork-form-filler/local/2026-06-13-export-init-prompt.md
144c7ad9b1c3ceecf1445dc43ea1e978c3d53c963743f47fe9546655a634aea1  self/field-reports/vinyl-sorting/local/build-field-report.mjs
7742c0634c08b0ce84ade29e88c740902e2e4e9751a9e1906145fbafddb04bec  self/field-reports/vinyl-sorting/local/2026-09-23-export-state.md
4dc7421e250880a78337180aa43eb2fa2dc4d6da711babb45b9ae136cdf07bb4  self/field-reports/vinyl-sorting/local/2026-09-23-export-rulebooks.md
47c053a0db59d452abab51c30fdeca1c2c828ee7178585bade75851c426ee70d  self/field-reports/vinyl-sorting/local/2026-09-22-janitor.md
5ef8b4d2279afc85a17287d6f91eb47278f9e44ba92bc2224dfd43b39d5af360  self/field-reports/vinyl-sorting/local/2026-09-24-sessions-manifest.md
4fcf1a36c98c450ac8a4f225d25e46c00f99e2024dfbf607dd8bc45a8883f6e2  self/field-reports/vinyl-sorting/local/2026-09-23-export-agent-memory.md
a639e5ca1ce2dde1fe7f1fffc26e76578f7577619e835e0eb737134831ff7459  self/field-reports/vinyl-sorting/local/2026-09-23-export-git-log.md
0425e331bdbf4ae56181362ed92c6a590515c992edfe43b0b80c4ecb95347cdf  self/field-reports/vinyl-sorting/local/2026-09-24-export-prompts.md
d1010497af109a36a77c48128100cf4f1752606ceff86e344a001564f980dcab  self/field-reports/vinyl-sorting/local/2026-09-09-sessions.tar.gz
f17c964861897163bf799ed1d194b5b89d64b70eeea14c3ddc27c6703775e7cd  self/field-reports/vinyl-sorting/local/2026-09-24-export-bundle-manifest.md
1bc9466f51afc5ff5cb4f5c9fee0eb988063613be32fa690bcc54361478b82e6  self/field-reports/vinyl-sorting/local/2026-09-24-export-inventory.md
6f35876b4a3229e6cc02897f50f9479c6542065686db63c471cc39d13443e531  self/field-reports/vinyl-sorting/local/2026-09-23-export-memory.md
4445199f08fbaf7c5de0e53072fa7dfe09b1c2f2b8c2a5639978866358223c15  self/field-reports/vinyl-sorting/local/2026-09-23-repo.bundle
3cfed8f343133c278fe945cfdb5c517fb2931e7b11a757f825c36f68a547171a  self/field-reports/vinyl-sorting/local/2026-09-24-validator.md
592800d20b4a5f81e1c47628da4d7c53a9df20782b094ecf08e8f7580de35242  self/field-reports/vinyl-sorting/local/2026-09-24-sessions.tar.gz
246c8244a110c2750dd60182f3b4841f78e27c46494423e0e8f5f062ea964d7b  self/field-reports/vinyl-sorting/local/2026-09-09-sessions-manifest.md
80bbc4a3f7f0e69de3d53c14aac27bbbdc6a88b5abe15a08faf48e0c69d9b740  self/field-reports/video-pedagogy-research/local/build-baseline.mjs
8017668e94699fe21abfbfd0c56bcb6819664fa30b53694c44d663a349ce1b97  self/field-reports/video-pedagogy-research/local/2026-09-24-export-working-tree-snapshot.md
a8f87518d540b9b476994eb027d1c21222cb3bedad7b0fdbf850d93aab72b73f  self/field-reports/video-pedagogy-research/local/2026-09-16-upgrade.md
9855afb034fb27abb7c3d30f7e54d5536cf0b075836d0e929fd12749b4e66619  self/field-reports/video-pedagogy-research/local/2026-09-23-export-state.md
eff4e08c311cc8fb055f1c607d5146641360fc1791598b6031bd053eacdf64b0  self/field-reports/video-pedagogy-research/local/2026-09-23-export-rulebooks.md
86b4019b6b8f04da0c48d1f7806851fb5e4f8ed468689e9a3f7f86e54e4edf97  self/field-reports/video-pedagogy-research/local/2026-09-08-export-state.md
044bf90c406664369448ce1047313eb6dc29670adf4f395fb697644ffb18790c  self/field-reports/video-pedagogy-research/local/2026-09-16-export-inventory.md
47ce77600248951301817e4a4ec21c1bf607beaa7fbf09ba9548e10c7a89cdc0  self/field-reports/video-pedagogy-research/local/2026-09-24-sessions-manifest.md
3df3e4cce846063ad2210a5f4a371756e2234bdddd1834f981e7b8dd902f323d  self/field-reports/video-pedagogy-research/local/2026-09-23-export-agent-memory.md
56825b58b6d66e797f17769b6bfbf862802ddbe28eaab9fa069bbd8a4588b626  self/field-reports/video-pedagogy-research/local/2026-09-16-sessions-manifest.md
5367a9e24f49e990db44d702c2300f132e6e5ed3822d80fee8df468cdffa956e  self/field-reports/video-pedagogy-research/local/2026-09-23-export-git-log.md
715a846384fde5a88974bcbaa3556cb827fe32cd24298134ad550a8670b5b16d  self/field-reports/video-pedagogy-research/local/2026-09-24-export-prompts.md
80639049b7a2b32411099bb5332805c6fdaa486d11f24de68bcceb52b84b3b8d  self/field-reports/video-pedagogy-research/local/2026-09-24-export-bundle-manifest.md
aae5ac22a1a028e9b157002cc3aa58de2f5214c47237c8e19a74f82f788d5868  self/field-reports/video-pedagogy-research/local/2026-09-24-export-inventory.md
0477d72f19fcee2b8741b197ab624ff44bdff8cd8f1ee2daaee5fb861328960c  self/field-reports/video-pedagogy-research/local/2026-09-08-export-rulebooks.md
d8f18ee726ce31eaad68acb273c16f960e203ebe45e3765fad28e4ebd6347337  self/field-reports/video-pedagogy-research/local/2026-09-23-export-memory.md
7c75c07c0002c956cb566d4037be829dd76a76dbd1acc74ab7160615be588426  self/field-reports/video-pedagogy-research/local/2026-09-23-repo.bundle
f27e94d77c8b1a3b6a3052adba43a0cb6bdf0171a70fa4aab2cab66dca42b646  self/field-reports/video-pedagogy-research/local/2026-09-04-export-init-prompt.md
588f46534dffa07de4a40fea9cbb189a182deb69c3a73599c2ec2efa4ee79951  self/field-reports/video-pedagogy-research/local/2026-09-08-export-agent-memory.md
3be8af675d6122050fe1927acd23eb2e4f2bf86213cc3a6c3921061dd3191e00  self/field-reports/video-pedagogy-research/local/2026-09-24-validator.md
3d33e017875a0806a2a5e132781700547a9bcd41204c1ef43e2770f96f4b7b3a  self/field-reports/video-pedagogy-research/local/2026-09-24-sessions.tar.gz
ed74431a95973358bd6cfc5c5aba9b653c68c0837afa78d585646be721990057  self/field-reports/video-pedagogy-research/local/2026-09-08-export-git-log.md
d00dd46827587ff6f2ab3fbd085c04151d2b6e00534c8306206fe00dbc9f10ea  self/field-reports/video-pedagogy-research/local/2026-09-08-repo.bundle
778034261e2f86979b439afcda61e0f99623da5403474e5da8745a0b1fbafa1c  self/field-reports/video-pedagogy-research/local/2026-09-16-sessions.tar.gz
ad0daf7569d78d5cfa17d8029656cd72c1563e0df55a08400d0ec5d4a4ea9281  self/field-reports/pattern-mapper/local/2026-09-16-export-state.md
d28d4bdc2289315746cb835b0239cd9437852a0ab3bcb7c3297ca93b50e5789d  self/field-reports/pattern-mapper/local/2026-09-24-export-working-tree-snapshot.md
8faff2df8adc00c80db778f3536354f5ca4cbfb4570a6e9c63de0a728ec497c3  self/field-reports/pattern-mapper/local/2026-09-16-upgrade.md
688d15e8aa279f12033c53b84589b7a9d875695a91891847fec22a053f662a01  self/field-reports/pattern-mapper/local/2026-09-16-export-memory-pm-skills-project.md
970ed1a1eb3dcb8342265107b4d3b3209f21788fd0ee183e24ff84a621557895  self/field-reports/pattern-mapper/local/2026-08-28-repo.bundle
149d871421cf8c0be5cf3c9191cbd914f33648242d735098de5e7da2adbfc86a  self/field-reports/pattern-mapper/local/2026-09-16-repo.bundle
b94d43b146a57a4ff2991d86b7fb6c6aeec8fded96bd21cebe5f447ade76ee43  self/field-reports/pattern-mapper/local/2026-09-16-export-prompts-all.md
603fd925b9a70dd55d4f1bad64fa35ce4ac83e494366956a1d960bf6170d5108  self/field-reports/pattern-mapper/local/2026-09-24-sessions-manifest.md
db3b10f753f3280625f3b2c3864da06ab0c9be471a0c0cab74e49d3f4d0ef69b  self/field-reports/pattern-mapper/local/2026-09-16-export-memory-project.md
f469226797bc6734de66e3f1245d8165949274d91e6a149b30fe15a880a1c156  self/field-reports/pattern-mapper/local/2026-09-16-sessions-manifest.md
9a0d15df5e4cab3b216e582d9d610f59d1a668e8d1b7056180e9451aa320dd83  self/field-reports/pattern-mapper/local/2026-09-24-export-prompts.md
17ccd9d574f144b74c8fe8c198f309db83c840eedd627e001e014a7bc4ceba6d  self/field-reports/pattern-mapper/local/build-wave2.mjs
82a44f531e1b5cde52415f309026c5e577b0f9e16abfd17a358f4a76014b02d1  self/field-reports/pattern-mapper/local/2026-09-16-export-git-log.md
6b90e502bf02918e4696323d62c7c77a7acec864e6d57cecf5b8a22e4e913397  self/field-reports/pattern-mapper/local/2026-09-24-export-bundle-manifest.md
de53c87695ee4d8abbbf22c290463dec4f5159bb3beb2d4dd3aa13cd7f5b9239  self/field-reports/pattern-mapper/local/2026-08-27-export-agent-memory.md
ad6eef163e9aa3a93467ace1e222a67667f343cd243fb7ebb3ac048b697ac358  self/field-reports/pattern-mapper/local/2026-09-24-export-inventory.md
0ddb7ba5bbdc473a2e420e3d9614a1840ce84858add22444d77ef7286aa19ecb  self/field-reports/pattern-mapper/local/2026-09-24-validator.md
7157f1000c0d0fffa0472d7c79b7c4738112212e3cacb12cd6871d6cfc69db31  self/field-reports/pattern-mapper/local/2026-09-24-sessions.tar.gz
d37cc113c9d57eb6a6613999bbd7e77f9a64d063c95a09bf0b5080674f197324  self/field-reports/pattern-mapper/local/2026-09-16-sessions.tar.gz
db51d79ab6b6e032e80592ffacf8987d4d71b4afad67a7d3370eb6dd485fa120  self/field-reports/pattern-mapper/local/2026-09-16-export-rulebooks.md
597b534ef7cd72be9bd5d890de216179e83e0555835abed441a55f40d53a1979  self/field-reports/parenting-research/local/2026-09-24-export-history.md
82ae6f44db024c84f41d436d51f46f830b6e96d45e91c03bff82b2e6297e1484  self/field-reports/parenting-research/local/2026-09-24-sessions-manifest.md
14c2608662720cebb78d04834a53da71c776142941f80c17974ec11a894188d0  self/field-reports/parenting-research/local/2026-09-23-export-agent-memory.md
50856dfc54c6204e5c5870edd92c4367c11b69cfceab2be69ec646c9f4a99495  self/field-reports/parenting-research/local/2026-09-24-export-prompts.md
d64aa10a7d13223a32dd1f299d2d1a04a0cc8c0b73095a34281a566db4df2186  self/field-reports/parenting-research/local/2026-09-24-export-folder.tar.gz
2cc91843be72df99f689cf1d4911b0341b5bcd1084c4f35cb0fcea8f7d2b6c93  self/field-reports/parenting-research/local/2026-09-24-export-inventory.md
c9b5d1922de4ccffda52d3a6260280d7834f2b3dd9d21811875e083ad86c1c2d  self/field-reports/parenting-research/local/2026-09-24-sessions.tar.gz
0cc3b3f96045a4cc2004217a67cc4fe1d040b5ec8fdf52056975f769f8e40f3f  self/field-reports/digital-art-audience-hub/local/2026-05-31-upgrade.md
966354f0014575f82034bbef0e7b3f214ab1f01962cd45b5e59ab5f8b323b7d4  self/field-reports/digital-art-audience-hub/local/2026-08-26-export-review-artefacts.md
95ab85df17a7d9b1bde454c8cadd9c0c670a82ce0ec44d8e23c5efc8a014a191  self/field-reports/digital-art-audience-hub/local/2026-08-17-upgrade-4-6-0.md
e83f5ee29998c57c1ef5a74bf9cf8a5209e0c968f28bd8ef888488a6dab72975  self/field-reports/digital-art-audience-hub/local/2026-07-04-upgrade-3-1-1.md
693941d3aa52e469cc04637d95459d536f76b8e9d20517bdbc17b1e8ba8ae5c8  self/field-reports/digital-art-audience-hub/local/2026-05-03-export-init-prompt.md
556755faf583416cc917ee1ff3ef0b58228d6d79e553f4d2b6f7b8541c38d010  self/field-reports/digital-art-audience-hub/local/2026-07-04-upgrade-3-1-0.md
ac2619184028cfdab535adc96831d6511d1c9ced9d1080dbd1b2110579b34886  self/field-reports/digital-art-audience-hub/local/2026-06-01-upgrade.md
0e8d7faccbf9df785c2ffe1d76dc323bed56016e5de60d65859436243f86b6a8  self/field-reports/digital-art-audience-hub/local/2026-09-24-sessions-manifest.md
4eed647fa3c455db0b10302d78a94e8bc5657dda0e2c862e052c7395bad5f9c1  self/field-reports/digital-art-audience-hub/local/2026-06-04-upgrade.md
14fc278ca89bd4e5142a1b1f9003fe0680af1623ad847190c74a4a6f43f878ca  self/field-reports/digital-art-audience-hub/local/2026-08-17-export-rulebooks.md
1aa64bd4520c955f8a855cc097461550dfeac64a34b806ee1273704ae80ebff7  self/field-reports/digital-art-audience-hub/local/2026-08-17-upgrade-records-mode.md
a6e12404999770a6f2395672ff906175f49c7c92e075a8e443bcd820a0c0df06  self/field-reports/digital-art-audience-hub/local/2026-08-17-export-state.md
e8ddb42ef0dfef53665633fcd62d470c66c5bd99fdb69571c40ccb66e96c81d2  self/field-reports/digital-art-audience-hub/local/2026-05-29-upgrade.md
f6ac5dcbf41a3a6bc3b87cec95746f1a08a8400a2df0e25cde7b429c3cd4e23e  self/field-reports/digital-art-audience-hub/local/2026-08-17-export-memory.md
fe11963d68277f75e7aea9c2c5fc34825e40ac3a0efd2ee070f904fdeabcd147  self/field-reports/digital-art-audience-hub/local/2026-09-24-export-prompts.md
9b429d7ec02099a0379d8caaec51a40a740e15810d27ba9cb6b62a32754d9feb  self/field-reports/digital-art-audience-hub/local/2026-09-24-export-bundle-manifest.md
d52ffa1c3860da330d8061c518039b9fae9186fea95c5661212db8bbd441fcf2  self/field-reports/digital-art-audience-hub/local/2026-09-24-export-inventory.md
92f93184240068f29f357a29373500615e7681cc396b8fc21d91bcda9f388667  self/field-reports/digital-art-audience-hub/local/2026-08-17-repo.bundle
9150fabb1c95ab82983f6bc348aa0bf673246a13d747159c5be294e9f2da42d3  self/field-reports/digital-art-audience-hub/local/2026-08-17-export-git-log.md
9e10d23a36e34ccfa1b213e1b37e3193c948c5f5fe3fb06c07057d3f54910c0b  self/field-reports/digital-art-audience-hub/local/2026-06-19-upgrade.md
e166068f7f0d047df96dad0fbdd124365799276b358e6d01c8bc77447a6b35ef  self/field-reports/digital-art-audience-hub/local/2026-09-24-validator.md
955baa1316170d9788d95bcf609ac5254d39589c0a50c6a9f934d285f837c072  self/field-reports/digital-art-audience-hub/local/2026-09-24-sessions.tar.gz
a7f88432b65c6c14c20d41293126fa6467972bfeb3d4039953ff4224cdf43f17  self/field-reports/resolve-scripting-windsurf/local/2026-09-24-export-history.md
9eded26e013dd0e4b47ac031eb4dc930f12f22edcde42fb45cc0565db0f1b2af  self/field-reports/resolve-scripting-windsurf/local/2026-09-24-sessions-manifest.md
6b5709cb66cc5e84c8b0c683d9f318280a376d69456aca78355d044f4b8013ef  self/field-reports/resolve-scripting-windsurf/local/2026-09-24-export-prompts.md
86fe38952013a8234580e2f243c4b04ee241c3a2e44226ba3aed106a60cf16f8  self/field-reports/resolve-scripting-windsurf/local/2026-09-24-export-folder.tar.gz
b313a07f96db2e00c085687f2a6df57bcfd547756207ea82b8250079c575d190  self/field-reports/resolve-scripting-windsurf/local/2026-09-24-export-inventory.md
232da2d19d5ca5549504ca35808f5a22440b625794987ab20e245347abb8bc2c  self/field-reports/resolve-scripting-windsurf/local/2026-09-24-sessions.tar.gz
cc31242001bc4a9ae6b4ab5f13e474e3e9d87bf304d6371896daa4c4b81e7b79  self/field-reports/marcacao-mestre/local/2026-06-14-export-init-prompt.md
7ef34ff3a292298bc64533dd5cd7d13225b0bd934211d308e1a0a65f960887e8  self/field-reports/marcacao-mestre/local/2026-08-26-export-review-artefacts.md
b37838defe3f91d83b1cca9f2f3cb9d269b00868b47a214fe0c06bb24833d491  self/field-reports/marcacao-mestre/local/2026-06-14-export-state.md
20755265dbda8822441e7bbc9856e7505e32168a2c2527ccc3faff33052cf3ee  self/field-reports/marcacao-mestre/local/2026-06-14-export-memory.md
2fe264d97e7214de973989a794e16a94ea6e7d608974696cf5be6329b44017b3  self/field-reports/marcacao-mestre/local/2026-09-24-sessions-manifest.md
93b3488058c4e773d2f62bee679527a29aea29b79d423a367619bf1ff20577b3  self/field-reports/marcacao-mestre/local/2026-09-24-export-prompts.md
600fecb849f16423aa5986142fd53bee94f302d6411303d37b0d1a445be7a018  self/field-reports/marcacao-mestre/local/2026-09-24-export-bundle-manifest.md
0f2eb7d465e4aad4e0ca8f1cd824846b94d5fa566222deb9645aeb511ee52eea  self/field-reports/marcacao-mestre/local/2026-09-24-export-inventory.md
208e019d12df6191ef29324c10ff20958637cddb2aeabcd6e2db442659998c1a  self/field-reports/marcacao-mestre/local/2026-06-14-export-rulebooks.md
8ab1df9798b69e94c4f75214ac04e812f479654c362579fbf2c9ccead98466ef  self/field-reports/marcacao-mestre/local/2026-06-14-repo.bundle
e2dd35ce9690309888b7b8b6b1e64e2dc92b24d9fa0ad6b818d4ad7ae50321a3  self/field-reports/marcacao-mestre/local/2026-09-24-sessions.tar.gz
64d2cbb506ef26ce7c78e464ed83d58ca12462ab2c10bcb7cdacfbc1d83a5b02  self/field-reports/marcacao-mestre/local/2026-06-14-export-git-log.md
40179703afd5e1eaee61676cad2b1d27643549b88cb09cb8fb3c3e7ed4b31be7  self/field-reports/uon-video-helper/local/2026-09-21-repo.bundle
263eba8eae4275438dd0bfd099e29979ec5ed29b1ce8831c22a4bf81386daabe  self/field-reports/uon-video-helper/local/sessions-codex-index.md
c0251001b0bad56aa4251e4a8122409af6994bf36c32c31ec72c283fb086d1e7  self/field-reports/uon-video-helper/local/2026-08-27-sessions-manifest.md
b993a92d11ea34b9afd6c5d4187f801e614fe394aa65c86182646afd50c6af4b  self/field-reports/uon-video-helper/local/2026-09-21-export-rulebooks.md
91a54e75fcfd34085049ba8d411ce80f2f10c0f6dec6c64c0f8b7ca58de23357  self/field-reports/uon-video-helper/local/2026-09-21-export-memory.md
a1ec2b9eb160ff080d434302d7f5c60d50f056076f12785332e29f266a0c9aa2  self/field-reports/uon-video-helper/local/2026-09-24-sessions-manifest.md
bf8d34288f4249cf04f9a789945dde76d2f1e0c7e4dacba30fa714698b47e8f7  self/field-reports/uon-video-helper/local/2026-09-24-export-agent-memory.md
73aa366ac10811f9328ad7b6b26f632acf1c2a5bd56299f2ad911b847b92828e  self/field-reports/uon-video-helper/local/2026-09-24-export-prompts.md
0d15d5ce2a59b7d33db779a6d7d396eee94396f94fb4ff5765e5a5fa4f2744a0  self/field-reports/uon-video-helper/local/2026-08-27-export-session-logs.md
1cb5b725f45ad31bbbd6695d8f439ba52181ac848c9706ef83897f615e3041ba  self/field-reports/uon-video-helper/local/2026-09-24-export-bundle-manifest.md
1fb184a05a12086d2f90af7862f1d9c86b67ef0c538092beefd1fbd8c73f16e6  self/field-reports/uon-video-helper/local/2026-08-27-sessions.tar.gz
c55dfba127816f6a90a5260c0d4c595a2dce7df86654d1176185c5244af34284  self/field-reports/uon-video-helper/local/2026-09-24-export-inventory.md
b8880a4baf83c49a5ec751c3ac69f99adb2d561bc4136523ca060512a9c6d9c9  self/field-reports/uon-video-helper/local/2026-09-21-export-git-log.md
f8ed371250d8f03ad35456d359c5d9feb6157e0041bc4879f2261061eceac5ec  self/field-reports/uon-video-helper/local/2026-09-24-sessions.tar.gz
f3efe80db61fc0231ee1f5c7d8acb9fc59f85c98c1e498d81ae40e77ea224846  self/field-reports/uon-video-helper/local/2026-09-21-export-state.md
586284d8fdf65fb457ccb7edd36c34b01bdc39f9f5d487991c47197bb165496f  self/field-reports/uon-video-helper/local/2026-08-27-note-working-tree-snapshot.md
9288242e7c96e8787ca24adf9deb2ec36abc84b0df59e5782fd91748c420a251  self/field-reports/marketing-skills/local/2026-09-09-export-history.md
5819d137d6f73e004f0a3fbe6092e6fa0eb5ad121c893a99b8dbbd15bfe43274  self/field-reports/marketing-skills/local/2026-09-16-export-state.md
2f4d4d5ae4a5e42fcb0f7c4cb1f7cbd4c8a325b0f54e12567dd36973b025a1a5  self/field-reports/marketing-skills/local/2026-09-16-upgrade.md
9f6301bfaf13de55d7e71ee61d6bca1125c36697b4c13b99feebf2874f0e10ec  self/field-reports/marketing-skills/local/2026-09-16-repo.bundle
c3f5eaac50a7fab9d20e315c6db082ad6f354db32d96036609e2c54c1734e885  self/field-reports/marketing-skills/local/2026-09-09-validator.md
edb479b6176f0d98293b06664de6439532163523c670dd9310afef46791cdb5c  self/field-reports/marketing-skills/local/2026-09-16-export-inventory.md
bb545df7e4141ae41cb3cec25c4b36fb9b0412d1fc323a2797721bb7c59e9971  self/field-reports/marketing-skills/local/2026-09-24-sessions-manifest.md
5032e2eda2143bcd70508c0580dd25300ebcb1ad7dfb1c0cc7d82c82ac3631fe  self/field-reports/marketing-skills/local/2026-09-16-sessions-manifest.md
5cc0b1cafcaf168b2f419ad1c7646da75be37434cdc87bbd51ec05884952e637  self/field-reports/marketing-skills/local/2026-09-24-export-prompts.md
2baa392e4b6da7e617e6af0237fa700ae5c94adba54e4721cabc5b44e92d498e  self/field-reports/marketing-skills/local/2026-09-08-export-init-prompt.md
712d6dc373c025c6985732861fb21c50115cdf238c8a55e75ad7e9b5b292fa25  self/field-reports/marketing-skills/local/2026-09-16-export-git-log.md
3c455c89392c86ba2e552f0d7bd007c7183be272c572a2f9207a7debe3abe887  self/field-reports/marketing-skills/local/2026-09-24-export-bundle-manifest.md
3985def5107f5412eca421b09b7ddb277d64d4c385af91b2299b4faeec4bc537  self/field-reports/marketing-skills/local/2026-09-24-export-inventory.md
6a902227ef345ef410a929908fd04ce725b52d554dfb6d8631f4b59bade4b75c  self/field-reports/marketing-skills/local/2026-09-16-export-folder.tar.gz
ed5b3a19894d620dcae1ef9ec5aa870c0ff69217c5ed4820954eca8be6bc2be1  self/field-reports/marketing-skills/local/2026-09-16-export-memory.md
a4cd24104f72baf79342ab047e75ce137e6ced0b7ea7c62c944e1cfedf1f0273  self/field-reports/marketing-skills/local/2026-09-08-export-agent-memory.md
249748d737afa84543329710a02b19a4058ae30d93587f08dba3d715b5806a3f  self/field-reports/marketing-skills/local/2026-09-24-validator.md
5f6a02a0ca341e066f09cd52c3065d2229c4403cd2b47227a6fd97b8ab8f613a  self/field-reports/marketing-skills/local/2026-09-24-sessions.tar.gz
7cc27e2fdfdcce304e58bd124d4301df9c6cae6df33f0d32b81ade6be2dfb55f  self/field-reports/marketing-skills/local/2026-09-16-sessions.tar.gz
d045cf38ec4a612374511f203f80dfaaa422c5c603fc66bb3d7520797538da19  self/field-reports/marketing-skills/local/2026-09-16-export-rulebooks.md
4576004d0741263ecd03b0a7e77d57b95d6508045ba86b3cdb1069a494fdbe8b  self/field-reports/laurillard-learner-journey/local/2026-09-24-export-working-tree-snapshot.md
dbd151331964fea2191fa5b58dca86243d6890c182dff359295791691262a819  self/field-reports/laurillard-learner-journey/local/2026-07-10-export-init-prompt.md
fc087dbcd13c596d5647323109c7c6d4a6968b5e2fc0d0956d7a8a9935445a70  self/field-reports/laurillard-learner-journey/local/2026-07-10-repo.bundle
f77e411ed3589cc40a7c32cbef11aadaeb463dcd1de214a17faa05581b6ec671  self/field-reports/laurillard-learner-journey/local/2026-09-24-sessions-manifest.md
e8cd2247a35eeafb1fa56e7fd0b985de476ebf5050dc976e26306d124e56024d  self/field-reports/laurillard-learner-journey/local/2026-09-24-export-prompts.md
810f6ed83a32f5e1ea8c027ec26eec78884b7ca6b881e12f32b2674c79e9cd9c  self/field-reports/laurillard-learner-journey/local/2026-09-24-export-bundle-manifest.md
be9ab6f03024059fdda6ad888843204c07fe61f71083f969b3b18385a4d52d55  self/field-reports/laurillard-learner-journey/local/2026-09-24-sessions.tar.gz
3d2a5f96b02bbdde2101f465792747dc0d72042fea27d176cdee758447455a41  self/field-reports/windsurf-ai-credit-display/local/2026-09-24-export-working-tree-snapshot.md
cf125319626f926a4314f32249a4d3d0fa7b0b4f2189d748128e6f60a28f534b  self/field-reports/windsurf-ai-credit-display/local/2026-06-13-repo.bundle
6402f6b91b89402fe2a904134fd21383f3d360ad6b7f010fc47f1a3a19e73ef6  self/field-reports/windsurf-ai-credit-display/local/2026-06-13-export-state.md
65eec2b08a395f4c395abf088e9e29a531911c9d9138a44e019020efe2749cc9  self/field-reports/windsurf-ai-credit-display/local/2026-05-31-export-init-prompt.md
baa398f7f45c4c49690df911d1c89f1a20038fb9b87708c3be9119d7dbb0c6eb  self/field-reports/windsurf-ai-credit-display/local/2026-09-24-sessions-manifest.md
d815b5baa35be9ff6a14222a3f8c5665a1db29deaf5d1e2845ebc9f58c3187c8  self/field-reports/windsurf-ai-credit-display/local/2026-06-13-export-rulebooks.md
ff2b7ead068075f1089178160e31e9f918b41c7d31d0b512012488a24c86b113  self/field-reports/windsurf-ai-credit-display/local/2026-09-24-export-prompts.md
3c3e51d2a34a6f5153dbe3256ed776d6e1315ceebfd6df0f0b506c777d15cdd8  self/field-reports/windsurf-ai-credit-display/local/2026-06-13-export-git-log.md
12fd795501b279c1cff92f2d4c13e62c7c3e0f2066fc5a14e625dd62f8e2fbe1  self/field-reports/windsurf-ai-credit-display/local/2026-09-24-export-bundle-manifest.md
49354abe8fe4b34fb67499693807b1e58d82039ef5d0bb8d10ee732bf61da8c8  self/field-reports/windsurf-ai-credit-display/local/2026-09-24-export-inventory.md
15b6bed930dc99448b6f089584d3c44d637423a66aa0094180f38f656a0f60e3  self/field-reports/windsurf-ai-credit-display/local/2026-06-13-upgrade.md
688d391c998ae2a85e12f3f50fba02e64713cb9c4c7be6ceaf0cfd2a53e7ee4e  self/field-reports/windsurf-ai-credit-display/local/2026-06-13-export-memory.md
963638eefd02671c4e1c279c9fff8e15d9c8d67f585e60437e854c77bf0b0061  self/field-reports/windsurf-ai-credit-display/local/2026-09-24-sessions.tar.gz
c8ef6896d25230c74add047235dbb2a0ef13377b4c8ca99733333d93e0ae9c0d  self/field-reports/dot-crowd-navigator/local/2026-09-24-sessions-manifest.md
1118032f87e977e6d102ba448c3cbd2549f5de2bca4a8af9de2fc1781e1a920f  self/field-reports/dot-crowd-navigator/local/2026-08-17-export-init-prompt.md
3e1d14c2b023b7f95cd6d18ea58c2d42b7e17052fda94d25f668930ab18235ab  self/field-reports/dot-crowd-navigator/local/2026-09-24-export-prompts.md
af416acd81f6252988d8f4c8e28a319951f08f036ed18235e37de2c6508e71e6  self/field-reports/dot-crowd-navigator/local/2026-09-24-export-bundle-manifest.md
08e8a40090bf82d3f2fde5c75b76b747571e2f8864302429d5ba6e0b61a5a781  self/field-reports/dot-crowd-navigator/local/2026-08-17-repo.bundle
3c99638d61385ea1a23a58bea45cf5464fd4515c4b737ae59d045435b8b79465  self/field-reports/dot-crowd-navigator/local/2026-09-24-sessions.tar.gz
4bc6201c8cb5d3f12c7669a65cd24fd9c819e3c61c23cdf144511808ce9b9bcc  self/field-reports/route-plotter/local/2026-06-18-export-memory-v2-line.md
86fa4c8188de67781cde0efca02a7c08a6458302a3e6b0b14af145a95176c1b1  self/field-reports/route-plotter/local/sessions-codex-index.md
af8d551a59ef26f1889b8d97e1dc0bacd11931b98441366f598148b5094d2b44  self/field-reports/route-plotter/local/2026-08-27-sessions-manifest.md
15d8e392fcbe06fd106cafedc69b3c6641c7b82f498086cf152e5b449b317253  self/field-reports/route-plotter/local/2026-08-27-export-working-tree-snapshot.md
8ad7efb28f3038f906080499c9c22083885d4843997346c5ee4ea266880b5fb5  self/field-reports/route-plotter/local/2026-09-24-repo.bundle
d94ed9779e7b305ae2fd685bff051e9a63d2c592b5af06d7f3e6a2083cf995a3  self/field-reports/route-plotter/local/2026-06-18-repo-v2-line.bundle
3ed8cce33ed26a79c78b7a554fef9088788cd62bcf35e93bdfaebd51daca25b7  self/field-reports/route-plotter/local/2026-09-24-windsurf-stores-manifest.md
a6c8f1a1c8698b9ef55a44b579594310b5b91ef41f4da6e8bccd7a5e588d4187  self/field-reports/route-plotter/local/build-report-exports.mjs
356fd7c37aa4277fa97a120263817c7746e37dbc74b08f87b32f33a636c52745  self/field-reports/route-plotter/local/2026-09-24-sessions-manifest.md
617c81f018553cdca81be679e4cb84a69ab2ebc7d25be10c0cade666171bd9ca  self/field-reports/route-plotter/local/2026-06-18-export-rulebooks-v2-line.md
6d28f17e9280a3b94ef54b9c01af5e129103e72dcbdfaec46cdc865e1aa543e6  self/field-reports/route-plotter/local/2026-09-24-export-agent-memory.md
d6a60e896c187473ff187aac0d8a1a1bf3cefa9e3f4b0d911bb1b8663f2bbc14  self/field-reports/route-plotter/local/2026-08-27-export-working-tree-snapshot-codex.md
044a75d64dc2045e01143e01f236f3c9034599a05ef465ec206b6246d033809a  self/field-reports/route-plotter/local/2026-09-24-export-prompts.md
5497d34d5a77ea94f7f300a6568e540da105a1021628ac25ade37f5c89881e07  self/field-reports/route-plotter/local/2026-08-27-export-session-logs.md
1fd4230ca36c73371f7884e3e785a4e8a4804a65939ae9f021bf7853f740abb8  self/field-reports/route-plotter/local/2026-09-24-export-bundle-manifest.md
cf807889f59cb7847b15becfa1b8f4112b6500e7744d26ecbea978b974f9bf53  self/field-reports/route-plotter/local/2026-08-27-sessions.tar.gz
10d4d8db0ea27b69c4a74830aa2fe430dd7466f231e480b50c695dbabbdb5c76  self/field-reports/route-plotter/local/2026-08-27-export-working-tree-snapshot-post-cutoff-codex.md
8ad3942c678c4d0d34d3132eedbafbfddd12e97a6d5f924a132353370850f60e  self/field-reports/route-plotter/local/2026-09-24-windsurf-stores.tar.gz
8bc53a6e7532265c1eba2aaa2bf302572ca47e63c7d26af858dd5d994281f9db  self/field-reports/route-plotter/local/2026-06-18-export-git-log-v2-line.md
2c056f2bb2ec196584a4356148bf8c8bdbdf22f68ae1515288ac069a55e01610  self/field-reports/route-plotter/local/2026-09-24-export-inventory-v2-line.md
063e06273762179238652aa9beb71422e623518e13555ffb453e393316764ff5  self/field-reports/route-plotter/local/2026-09-24-export-working-tree-snapshot-v2-line.md
6fb7456d809fd9f945df72253c866edde8d7792b3564adc41eab09d8e27bd94b  self/field-reports/route-plotter/local/2026-09-24-export-bundle-manifest-v2-line.md
519139af36aefa43e2712a6a81f6d1a1899e3d3e4461e7087cc5129dca28cc59  self/field-reports/route-plotter/local/2026-08-27-note-usage-analysis-codex.md
3d6f41c3a4899b8dc7991ab7131708dd5a9e7bd3ee0fd4a42929e89f17a62049  self/field-reports/route-plotter/local/2026-06-18-export-state-v2-line.md
785a1cc87d10e408b9f0271d5f6f6fdad0568941eb53003593ef6bd1819bac16  self/field-reports/route-plotter/local/2026-09-24-sessions.tar.gz
a612bbdc487d6624574706554abd1ebc62cf44db0e0a3180eb6ba9ef1b7c92e8  self/field-reports/route-plotter/local/2026-08-27-note-manifest-codex.md
c1b7895c39c777d85f89a5aa93225c369b75a07426dac810a0c95b434e534cad  self/field-reports/route-plotter/local/2026-08-27-note-handoff-state-codex.md
41ba576ac1cc70617a9daec25e637e085f572e4c686523ac0f40a3104c05579a  self/field-reports/vinyl-sorting/local/harvest-lib/codex.mjs
e490c59b349ae5a512ac606e98270682282dde31bd56e1236cfe50c449eeb53b  self/field-reports/vinyl-sorting/local/harvest-lib/select-thread.mjs
906a6e2a0a803cc910cb99152410441551913264a2b46715f2d50f7b25470600  self/field-reports/vinyl-sorting/local/harvest-lib/prompts.mjs
2766531e2a9851eea1ecde95ccd002b30f9b2ce640741536b93d25a129126ca0  self/field-reports/vinyl-sorting/local/harvest-inputs/pm-init-prompts.md
eff5debed72d1d3a8ef11f0fb6f586633e14e2f6c28c71ef44c532050f164b51  self/field-reports/vinyl-sorting/local/harvest-inputs/marketing-codex.json
cfa7926e92fa805cf87d2270f6c1516b0a1f2703e91d4cc568acbda633a66691  self/field-reports/vinyl-sorting/local/harvest-inputs/mk-prompts.md
bba9b023310302c55437ff418d628bfe643cab3ddc66e0132f1910f5c72ba207  self/field-reports/vinyl-sorting/local/harvest-inputs/st-prompts.md
cdf26d3afec07831ebee7fc95535af1d575867404cb9fd80b3d7e597999804ee  self/field-reports/vinyl-sorting/local/harvest-inputs/pm-all-prompts.md
9110e10f1877cab3dada1ff51b4877f05580cd6cdbca261b7539d6a86cc772a7  self/field-reports/route-plotter/local/harvest-2026-09-24/run-records.sha256
a3bcb26a79e42934f4129a4cce8e4bc9c198b13c50cff6d7a4b7db115a39e7ca  self/field-reports/route-plotter/local/harvest-2026-09-24/README.md
b0c7962b8c33810909ae9756e52f30775f5a84ec77dc72e38e3661dec69fab05  self/field-reports/route-plotter/local/harvest-2026-09-24/run-records.tar.gz
bc030cb88e53a44e16ee44a61fd998fd547ae3b83ce761b2abaff275b77362c1  self/field-reports/route-plotter/local/harvest-2026-09-24/plan.md
5f61c13b045ad3cfe473f60526afa2025a9db3bb60605b4e40fe7ca46d56e660  self/field-reports/route-plotter/local/harvest-2026-09-24/CUT.txt
89f7b62b5ff5f220681e9d2696b20f7bf6ed32cbb59686c9400e4a182c3ae056  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/handoff.mjs
a9301985cc17cbca6f95112a2c3c553d45a484fef203329f860a22bbc62829ab  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/appledouble.py
19dc4467ac290eb20112c041f9022c394c940d4b2ade403d11523532a66874b5  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/cutlast.py
c83437f803d99880e2f094b1aa814c923597a4b81016c1fbf1ee6895ee62f8be  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/cutcheck.py
de1bc57d100dadd84cd73ed3b4eb624c1e06188cc0098e29ca189d9f6fa8bcb9  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/lib.mjs
ec46627a2ce2ad6dc67aaddda1c404e492cbb35ec7d3e8109f7502ba3ce4bd6e  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/hydrate-git.sh
e30b56c0e306a32a492d8e4e38390df408b31308c77a61c709023ccfb5d495aa  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/windsurf.mjs
f1a62942af50287b52d0e27a36b7c2b408b49754d7bae2d72391a5d39c79f899  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/secrets-triage2.py
418af35012f1ef0b8a2900250fa2541b2edb2b96a0ea8e989eaa604d8ebcecba  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/notes.py
9adee30b2efc27b667d17e949899c9385252cc8aacd4b88f040843ceade114df  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/untracked-check.mjs
3fd7281b3a14fa00ab1076a13efa705843dccbe91b8800f371e10374c570d51e  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/facts.mjs
5d2a3d6401a37a73f25cd2ce97291b2e71027f60443b56773455df2ceac6f06e  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/build.mjs
a4ed9d058dbd9c9f1936215091c75523df8b97a4d593be10039105ffdefc9f5b  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/inventory.mjs
63f5c8b4f18e38465c48dabc1027e64cff6ec52ad0c5273eb22c4476bfb82ad6  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/secrets-triage.py
2f77285a3da85b6eb9da14cfaa026cef5b2c27ed4a8837b08c8083be36e47a02  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/notefacts.mjs
a0272d3d0599c37d544248451220f1abb2d41edfbc07b372223dfa8f25dbd9d2  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/notes-text.json
0de64b27b3ef9bd24d6d7267b64be401e06b8fdc77080c67e1d2660f89225c18  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/registry.mjs
5bd08ef01771dd18428a59dd01f8df4d2e5b26725cf98f5dfaaabdd237b19e62  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/verify.py
87b8b5eac15bc158f544b17edb36666d86d413b0cf6b8289733551cd52ad6adb  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/freeze.mjs
0577ff795d0263225ad06f841184136aa5ed5509ca911e0c875ac71d599ba9e6  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/config.mjs
9ec03568df3e1c163023f61838c03d1af453039801242767601a7ac14aa3d2f0  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/run-build.sh
a54c2d3d6076c66eccae9763eaeb281b1c651ead51c52cfbcf6344e364a754ae  self/field-reports/route-plotter/local/harvest-2026-09-24/tools/attribute.mjs
````

The lab, at `ec9aa81` (every file under the paths read: the v2
branch, the self-host record, the two v2 findings):

````text
a465af485043c5d63f0c0bfb17d9309b5ac75367aad8eb36d993b35a93172551  <lab>/findings/2026-09-13-v2-hone.md
37333eb19c501c2abada5bdfefa6f381a9fc73546a66ccbea04a2c02642e5e78  <lab>/findings/2026-09-15-v2-selfhost.md
f27165a483425bda7b9e044b473766c1b5a7a27358770cf293491f92fc1e0d58  <lab>/next-v2/AGENTS.md
4e9fc78a4559463d1d460705e5f80c3aeabec5c5d3638560fd92b323cd57aabb  <lab>/next-v2/CHANGELOG.md
861609a69e7e297a9e942f1beab1af7e23397efd1b503e8f0687382ed4d0888f  <lab>/next-v2/CLAUDE.md
db7a4b59c61b6153c3a048aa23ee944484087958d19dd29363cdeeccf156fa4c  <lab>/next-v2/README.md
e5adcf0a94122df62658c07d5475e2980b73a630f361a883c15d2eeed637dc8e  <lab>/next-v2/project/archive/INDEX.md
55925dbe59d81ea8cd940bd11e8f761c5072f22f2bcdfafba2eb682c9045fe82  <lab>/next-v2/project/backlog.md
1c7d5d4e1ec633f77c93e289983d0478482fa453de8cf78b97633dcf6cb3418b  <lab>/next-v2/project/brief.md
1a386a2758ca68eb87f6533be5297832377fe10befbb69582f7479c05f8264ba  <lab>/next-v2/project/decisions.md
59a19be73de968f78f140999b3ea635c71a6d0707c289b4164eb5e391df28d02  <lab>/next-v2/project/digests/_schema.md
9241cd46bf68c29198a89d5567f1bd65aa87104118a206c70f572ce100ceb064  <lab>/next-v2/project/digests/carbon.md
4c8937cbe8c86ac127e520164f33ee9ef6d0d12c7f1ab324436bdf5b14ad805b  <lab>/next-v2/project/digests/nielsen.md
3ed6e5923cc4158ba7a6dbfd8f80796521886b42a4b5d93b4e4e60c66b8a52cb  <lab>/next-v2/project/digests/node.md
e6322f47154c348a8b6e3f70ab91f00ddb23ca39afe778ab4dd1c40b25e0f332  <lab>/next-v2/project/digests/wcag-2.2-aaa.md
ccd75d8c9290914b2c9664d51cd6165228aeaa7f5a8f76534f633756f442319e  <lab>/next-v2/project/items/_schema.md
049970e583e2157bb314febd58dd412ed491ba7b6507337d203a60da40975f98  <lab>/next-v2/project/profile.md
724b0fa06239294c4e65adfca8ddf58f0fc4f23711b0093c74ac458a464d39a1  <lab>/next-v2/project/structure.md
9d3f794c0b37091a44ded30b42a8137d9fb01c27e08479038c1e97610f1b1ff4  <lab>/next-v2/project/trajectory.md
981570462e1d6129c8cb00fa908a775e560715e20c235b2502536441959489ce  <lab>/next-v2/project/wish-list.md
82b5ac412c55d35e165efb8aa461f6f5631ea5372ab63bf1be0c8322d669837f  <lab>/next-v2/tools/archive.mjs
e253e30160e89d6d3971f979bcde837fd6624cd095639d6a68299df043d47f35  <lab>/next-v2/tools/check.mjs
2684135cc0f252d5b328abe3d4c3034e58e37720966b540504d281cd7138a641  <lab>/next-v2/tools/harness.mjs
ff37b437b5f5aa931cf2031575a5dc6c131399df3966a1cc63129858a70b2ab0  <lab>/next-v2/tools/ledger.mjs
ddeb1a31ea1001e34f75a89ef384b4e0fbf65daf2b945b78d21440cb7cc46a20  <lab>/next-v2/tools/structure.mjs
289352d3c1f679b5b6f6dbe516009530f8788df8b2636200e3d8acaade0b9126  <lab>/next-v2/tools/view.mjs
a9f1cf68b8619e623112148ad249f3a65b286d5a821f147339960f6da3ae2aa1  <lab>/next-v2/verbs/close.md
de8e4870372193f17dfe65a77fbffca824241d37f1b6e27a64d27e2b9df113ef  <lab>/next-v2/verbs/intake.md
98e0cd97932d61a0d487ef008ff589823ca6ff162d6a691bf82213eccc33762f  <lab>/next-v2/verbs/plan.md
24412dbbec6126c51fa870247af1acb3779d7b7c71d1ab5ff7ac9ee912df9b95  <lab>/next-v2/verbs/recall.md
bb3165e4fb21815841ca4f90b22bf74d95206c9e42d4251df58db851323105f7  <lab>/selfhost/.gitignore
c746dc4eacc319939944097cfe129ef19bad8e1feac2565c555e193ecfd96eb5  <lab>/selfhost/AGENTS.md
0466187b3d742725c884d5e71e401858014324420378cd592b3a26d7cbf4ea87  <lab>/selfhost/README.md
be025f34d54f069e8cba32ce8f8b46f9556acd21d5e4380d4041ac689af2f7fe  <lab>/selfhost/migration.json
d9b747040cb9dbfeba3c2d5bdcfb8c0d6b4a2e44dcd645b75962b6886afe6eeb  <lab>/selfhost/project/archive/INDEX.md
cb527e6b42e8b3fb4f480483c376001b1bf19eace3c5ef5e73037b8fe0458040  <lab>/selfhost/project/backlog.md
73dd8b18274201bc0af895968e40897b2ef227210d7e005a446a57efb46e04f2  <lab>/selfhost/project/brief.md
f08346bbabbf9333e2a0ff3efffebcb63d2e9b8aae3ffaf13a52bbc3645351b4  <lab>/selfhost/project/decisions.md
88130054070ac8f14ba37e0e88ff6f5481fd32fb5e93f14b36e757e728551634  <lab>/selfhost/project/history.md
f75f8c6789e8cac0a0202614b3565a6341cd5b147a3bada104ce9b05c7b72565  <lab>/selfhost/project/items/INIT-LEG.md
ee5e197c1dfc10a11c091479deaa641c03383e30028f41f61746874488b11672  <lab>/selfhost/project/items/MNO-BYTES.md
50d52da8e0161b67ead6daf0c5e1744de2f0c72c525bc00bf1fe80d42a6177e3  <lab>/selfhost/project/items/MNO-CODEC-CARD.md
0aba01937bba59cc628b32fbcacd56725d3d68b3a2a56ca3745d26b1ba5101ff  <lab>/selfhost/project/items/MNO-CODEC-FOLD.md
61120b226a79c81c4e461f58a3d3fafc41b9e31f0f4aee9c070c7ec186d08bc3  <lab>/selfhost/project/items/MNO-DIALECT.md
27c3562a7711cdf324ae413001caacff8ca8ac91998cfd5dc4df9528c3f183b1  <lab>/selfhost/project/items/MNO-IDRULE.md
adab59b8e023c628d7a40ac50c5a50a8ae696ed9656a64df774c90e9bd80b44a  <lab>/selfhost/project/items/MNO-LEDGER.md
38dcb21078ce808ae38189d5da1c546ef22d98211c6a86fd82ff9f1ec10f46d4  <lab>/selfhost/project/items/MNO-ROUTING.md
00765c2046f9f9870fb71abc00a7b51e05a669b0e942191788c5182cbd423ef7  <lab>/selfhost/project/items/MNO-SRVFOLD.md
218d4dbde77837c9059b5b094ca25d1131599921142d56a213b0bc71e45c4b97  <lab>/selfhost/project/items/R2-PROTO.md
5a56d4395abbd3812dc62cd32c954d474b7eaa76c0ce5809a2224c084d370cd4  <lab>/selfhost/project/items/R2-SUPERIORITY.md
bcbbf28e33580b7bf2b323394b0a844ea9dd3ca8533f83e289b484994c8a5949  <lab>/selfhost/project/items/R3-MIGRATION.md
83df5306f8b42ef7470ecb2e4249ce4e1e73180d0cf44168572d1f6853ea974b  <lab>/selfhost/project/items/RQ4-RETRIEVAL.md
014204e4c539f7b7976306f817b2e238f304562b84f25ebd85f1c72c42d853ef  <lab>/selfhost/project/items/RQ9-BENCH-T2.md
001ec8c1042e8e53fa24c2001812c815f6260cdfddc2ac37ac128450b403be6f  <lab>/selfhost/project/items/RQ9-CODEC-T2.md
43bc054931073511892e89a2119e0973a25b25b1597c2ee6ed839d76ece26fcd  <lab>/selfhost/project/items/RQ9-REPAIR-T1.md
320b967a1fb4cfc2960303303a256ba41b7076a7d9497b3fa2503f6876d163eb  <lab>/selfhost/project/items/RQ9-VALUE-T2.md
a9cf04af16e772144f7b21a8db7e1c4476907c6c9676a3a6484ca76e5896b8e3  <lab>/selfhost/project/items/TIER-LEG.md
8f598f207fd68b15d2b97299e0ff0eb74923026f148a459caa37a02cb95ef731  <lab>/selfhost/project/items/V2-FIELD-1.md
cb99f1529092c71ed13e8786048ce23d0e5269d00910c7133b11b87f9217f2c6  <lab>/selfhost/project/items/V2-ICEBOX.md
901ae59c18cad3cf2306591190a8c95dea844530e3726cab867e9aca48b23812  <lab>/selfhost/project/items/V2-SELFHOST.md
62f86661c7fafa647ede5f3a8d41cc936fbaf93203929f15be25991cfae903df  <lab>/selfhost/project/profile.md
83eeddc5fd10b2cb1488c6d8d3c7815309531ed36de6f5d86e710461185305e4  <lab>/selfhost/project/structure.md
68d6b02c722eb4db859f0d876e6ac61f240958c5039ebd1abe06fd07c1d90e74  <lab>/selfhost/project/trajectory.md
7e028c306c6f79e2cf478e3ca54f138203383bd6457e4b4fba7d14c680b7dfec  <lab>/selfhost/project/wish-list.md
68be81ab9defa4a446196b20e16c08bba4e09ee47e49d89023e4bb67bdbc5258  <lab>/selfhost/tools/archive.mjs
125b99f14d2ff749a45acaa2c61e26b531c33af0e9bbccb431fbce348f255f40  <lab>/selfhost/tools/check.mjs
cf7961771b0a81cab4560387d00d6fa169f7473659ba7bb0d50927d82aa28b17  <lab>/selfhost/tools/harness.mjs
69498c3e060b40cdce47bf6a154e4343bc634d2934c3a38194dd67b8754a01e2  <lab>/selfhost/tools/structure.mjs
d3972213358f884907fc6d72febcc3f1ce93f9c5c99e2b00b45f1e5cfbfc8887  <lab>/selfhost/tools/view.mjs
a9f1cf68b8619e623112148ad249f3a65b286d5a821f147339960f6da3ae2aa1  <lab>/selfhost/verbs/close.md
de8e4870372193f17dfe65a77fbffca824241d37f1b6e27a64d27e2b9df113ef  <lab>/selfhost/verbs/intake.md
98e0cd97932d61a0d487ef008ff589823ca6ff162d6a691bf82213eccc33762f  <lab>/selfhost/verbs/plan.md
24412dbbec6126c51fa870247af1acb3779d7b7c71d1ab5ff7ac9ee912df9b95  <lab>/selfhost/verbs/recall.md
````

Canon, at `d1f92f3`:

````text
c16af88844f40757731f4146dc243fc671a294c5f7be4138ca8eec69c8828038  self/V2-FIELD-STUDY.md
9dc0d09e8a43c628ddf65a94e7845cad223db02c05c2c441071f595db38a79a5  self/FIELD-STUDY.md
9aae2c7c7a9be1b7a1896e690ddb7f807d1d893f0988283a77de345f8b30a487  self/REFLECTION.md
893d39c4ebdd2f4ac20b61621bb33ef8ba746db5200160a598d17f046884bad0  self/FIELD-HARVEST.md
61a8e94f4cedfa2b29957f87eedd37a1de335b0832e47f157efeb25ecff84854  self/evaluations/2026-08-28-field-study-2.md
8fd64d04ea42237b25913cbbd308d80ea6d269e1a7012c0947834b0d76e4331e  pm_skills/CHANGELOG.md
8684f8838911854260530b21ca9ba636f3d56de4eed63182d1f15029336e0351  pm_skills/CHANGELOG-3x.md
397523b8e15a91eab7c8c46d1ea9bf25d44e8d84254db90bb6e35f3c260c0f07  pm_skills/CHANGELOG-2x.md
bf7b22fb3a2a2a3cabe56bcc89204d54b40b21485a883eb3805584b4a3f79b52  pm_skills/CHANGELOG-1x.md
1c945e6d0c0b6ffc7221ef9d4ae7f0595943555cc2a598208ffba499571eca97  pm_skills/MANIFEST.md
f3ad10117dde2b5e70d924c7a1cab5514ba8a566e8df8422ab0dd6c2a986a7f9  pm_skills/VERSION
4107091d2fedcf449dfeac24ea35de175a431a45daceb8add11154f20491ad87  pm_skills/prompts/upgrade.md
````

Distribution templates read at each deployment's version (S7), as
Git objects of this repository — the commit names the content:

1.1.0 → `c4ed293`; 2.1.0 → `722d494`; 2.2.1 → `5c676d7`; 2.3.0 →
`0eae59c`; 2.4.0 → `4f3418c`; 3.1.1 → `434a47f`; 3.17.1 → `3d1b000`;
4.0.0 → `e7fa46d`; 4.6.0 → `cbec0cc`; 4.7.0 → `145076c`; 4.9.2 →
`ca76cca`; unversioned-5e27c4a → `5e27c4a`; unversioned-5fe4c67 →
`5fe4c67`; unversioned-6343728 → `6343728`; unversioned-7e90c4d →
`7e90c4d`; unversioned-8825289 → `8825289`; unversioned-957fa30 →
`957fa30`; unversioned-a47cec9 → `a47cec9`; unversioned-d445e17 →
`d445e17`; unversioned-f3d8bc9 → `f3d8bc9`.

### E. The two prediction registers (a bias check, not evidence)

Both registers were sealed before any count: the run's at 16:17:20Z
(SHA-256 `72a4ed84…04bd`); Codex's at 16:18:52Z (`2dfa1b13…f7d`),
written without sight of the run's. The full texts are in the run
directory and, for Codex's, in the filed account (Appendix F). Labels:
**both** — expected by both registers; **run** or **Codex** — expected
by one only; **neither** — surprised both. This is a bias check, not
evidence.

| Study | The run predicted | Codex predicted | Found | Label |
| --- | --- | --- | --- | --- |
| S1 preservation | 60–90 % preserved or merged (70–90 for the ports, 60–85 for no-framework baselines) | 80–100 %, higher for the ports | active or merged: no-framework baselines 86–88 %; v0.2 ports 84–88 %; canon ports 67–72 % | split: the run on three of four ports, Codex on all three baselines |
| S1 pointer carriage | at least three intakes invent a rules file | "high fidelity without minimality": preservation through retained rules | seven of seven invent a rules home; active preservation rests on pointers | both |
| S1 signatures | agent-written, owner absent | not predicted | seven of seven agent-written | run |
| S1 judged J1 | mean ≈ 1.5 | mostly 2 | 1.00 adjudicated | run (closer) |
| S2 mechanical rules | ID and Verify on ≈ all commits; plan fires | 95–100 % declarations | 73 / 73; three plans | both |
| S2 digest citations | ≈ 0 | 0–20 % | ≈ 10 of 26 (a proxy) | neither |
| S2 validator warnings | accumulate unfixed | not predicted | 1–2 at commit time; 43 on a clean checkout, from missing item sources | neither |
| S3 handoff | a mix; the prompt carries acceptance facts | hybrid or chat outnumber record | 0 record, 8 hybrid, 4 chat | both |
| S3 network | Codex sessions push and fetch | not predicted | Codex held the closed network; the desktop app's Claude Code did not | neither |
| S4 outcomes | 35–50 % fulfilled; 15–30 % disappeared | 40 % fulfilled; 5–20 % disappeared in older records | per project: fulfilled 0–48 %; disappeared 0–47 %, 19 of 21 in maintenance events | neither (the mechanism) |
| S5 recall | canon 5–7 of 8; v0.2 6–7; v2 6–8; unversioned and early records 3–5; no framework 2–4; the losses on Q3 and Q4 | v2 6–8; v0.2 5–8; canon 4–8; unversioned 2–6; no framework 3–6; older active records lose 1–2 points | whole records 0.90–1.00 of the points in every class, with no age effect; losses only in the mandatory-read arm, on Q1 and Q3 | Codex for v2, v0.2 and canon; neither for the ceiling in the unversioned and no-framework records |
| S6 reading cost | mature canon 8,000–20,000; v2 2,000–6,000; the exposed project nears canon | v2 1,000–7,000; canon 5,000–20,000 | canon 4.x 6,607–17,053; v2 1,370–8,655; the exposed project at 8,655 | both, in part |
| S7 homes | 60–80 % of additions have a v2 home | 85–95 % | canon 4.x 74.5 %; early deployments 86.9 % | run for 4.x, Codex for the early batch |
| S8 intents | next item, run the backlog, fix, review, plan; 20–30 % map to nothing | 10 % nothing; 55 % verbs | explain 26.6 % (the largest); 13.8 % map to nothing; verbs 11.9 % | neither (explain) |
| S9 upgrades | the Hub walked; every other canon deployment reinstalled or never upgraded | walks in the Hub, Pattern Mapper and Windsurf; reinstalls in the Video Helper and Derry | eleven walks (the Hub, Windsurf, Pattern Mapper, Route Plotter's v2 line); three reinstalls | Codex |

**Top expected surprises.**

- **The run's:**
  - the exposed v2 record grows its hot read fastest — held (V2F-3);
  - the owner is absent at signing — held (V2F-2);
  - old canon records hold up on recall — held (the oldest canon records
    scored 7 and 8 of 8).
- **Codex's:**
  - "high fidelity without minimality" — held (V2F-1);
  - "near-perfect declarations beside weak semantic closure" — held in
    part (S2);
  - "little substrate separation in recall; whole-record access may
    manufacture a ceiling" — held — the whole-record arm is at the
    ceiling, and the mandatory-read arm (Codex's own Checkpoint A
    suggestion) is where the substrates separate.

### F. The Codex account

The redacted account of every exchange with the second witness is
filed beside this package as
`self/_transcripts/2026-09-24-V2-FIELD-STUDY-codex.md`: the briefs as
sent (local-lane content redacted where a brief inlined it), each
reply's verdict and length, the seal times, and the disposition
tables for Checkpoints A, B and C, including C's one follow-up round.
Every call ran as `codex exec -m gpt-6-astra -s read-only`, without
search.

## 15. Handover

**Checkpoint C.** Codex reviewed the drafted package (verdict: hand
over after fixes, eleven points), then the revision in the one
follow-up round the instrument allows (the same verdict, seven points
partly resolved and three new ones). Everything it raised was fixed —
the last round's residuals mechanically, without a further Codex round.
The dispositions are in the filed account (Appendix F).

**Nothing was applied and no gate advanced.** This run changed no lab
file, no canon distributed file, no backlog record, no wish-list line
and no decision-log entry. Every recommendation above is a proposal
with its counter-argument attached. The maintainer decides; the
decision session records the maintainer's word. v2 decisions go to the
lab's ledger under a v2 ID; canon decisions go to
`self/project/decision-log.md`. Each recorded decision names its
finding, its study and its acceptance test, so the next harvest knows
what to look for.

The decisions, in the order the run would take them:

1. **V2-FIELD-1 — choose Option A or B** (section 10). Every v2 grade
   here is capped at one exposed week in one project; nothing else
   lifts that cap. D3 folds into the chosen project's criteria.
2. **D1 — a home for project rules** (V2F-1): adopt, test or reject
   the named, budgeted rules slot, with the checker counting it.
3. **D4, D6, D5 — the working posture** (V2F-4): push and network as a
   profile choice with an enforced route; rule 3's writer clause; a
   named second-model check at close. Three separable decisions on one
   finding.
4. **D7 — a trace for every removed line** (V2F-5), with its canon
   twin, the triage candidate DROP-TRACE-CHECK.
5. **D2 — delegated signing and placeholder template lines** (V2F-2).
6. **D3 — what rule 1 reads of the decisions** (V2F-3): the run
   recommends a test inside V2-FIELD-1, not adoption.
7. **D8 — the upgrade note** (V2F-6), with its canon twin
   UPGRADE-COMMIT-PURE.
8. **The R2 hypothesis** (section 9): adopt the reshaped wording as the
   replacement for R2-SUPERIORITY's blocker line, amend it, or record
   that the tier yields none.
9. **Retirements**: in v2, the profile's auto-memory claim and the
   README's "never as chat"; in canon, the design review gate and lite
   close (triage candidates DESIGN-GATE-RETIRE and LITE-CLOSE-RETIRE).
10. **The harvest method** (source-only): HARVEST-SCAN-GAPS, including
    the credential-scan gap this run found in one prompts export
    (reported to the maintainer separately; the value appears nowhere
    in this package or the filed account).
