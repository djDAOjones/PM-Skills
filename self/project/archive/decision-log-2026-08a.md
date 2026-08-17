# Decision log — 2026-08-08 → 2026-08-09 (archived range)

Archived verbatim from `self/project/decision-log.md` (Prune,
2026-08-17). Append-only history — never rewrite an entry here.
Pointers resolve via `archive/INDEX.md`.

---

## 2026-08-09 — WAVE1-BATCH: four small ships as one release (4.2.0)

**Decision:** Batched TRANSCRIPT-SHA (Start SHA transcript header),
OPT-PROTO (empirical option checks rule in design-options),
RETIRE-COMP (imports-at-top dropped from task.md step 8; the
memory-maintenance plain-shell clause narrowed to
stop-and-report-on-failure; a no-habitual-bypass rule added at the
commit step), and CLOSE-COMMIT (commit-and-push becomes a standard
close step; propose-only restorable per project via root
`AGENTS.md`; staged-set echo and parallel staging rules kept; the
agent never adds or changes a remote) into one listed minor
release, 4.2.0.

**Rationale:** The four were triaged together, are individually
paragraph-scale, and `release.md` permits batching when every
change is listed — one upgrade step for consuming projects instead
of four. RETIRE-COMP is the programme's first measured prose
retirement (evidence: RQ2-LITE catalogue; EVAL-SCEN's masked
plants). CLOSE-COMMIT records the maintainer's trust recalibration
(wish-list capture, applied in behaviour since 2026-08-09, now in
text).

**Alternatives:** Four patch releases (rejected — upgrade-step
noise); folding CTX-CACHE in (rejected — a spike with an open
question, not a ship).

## 2026-08-09 — EVAL-SCEN: the frontier model repairs the framework as it executes it

**Question:** Can a behavioural scenario (fixture + blinded ask +
`check-memory.mjs` oracle + property assertions) catch a planted
prompt regression? Bar: control passes, planted deletion goes red.

**Method:** Houseplant-tracker fixture (packaged at 4.1.0 via
`npm run package`), three blinded sub-agent runs: control; eviction
bullet deleted; trajectory ID-format inverted. All states verified
mechanically. Detail: the dated EVAL-SCEN findings document under
`self/evaluations/`.

**Findings:** Control passed everything. Both plants were
**masked** — the agents reconstructed the intended behaviour from
priors and surviving context (run B even listed the eviction as its
own stated assumption). Bar unmet as designed, and the
generalisation is the deliverable: *prompts are load-bearing where
they encode the arbitrary, not the sensible.* Detectable probes are
arbitrary machine contracts, corrupted-state repair, and byte-level
(upgrade) assertions. Machinery proven end-to-end at 66–79k tokens
per run; zero confabulation across three runs.

**Recommendation:** EVAL-HARNESS unblocked with the revised
scenario doctrine (its first calibration probe: an
arbitrary-contract plant). Feeds RQ-ABLATION (two accidental
ablation cells returned "dead weight at the frontier") and the
minimal-core fiction (third triangulation). Retirement of prose
still routes through conversion to checks — now with sharper
justification.

**Alternatives:** Meeting the bar by re-planting until something
went red (rejected — the masked plants are the finding, not a
failure to engineer around); headless CLI runner instead of
sub-agents (deferred — sub-agents gave blinding and permissions
for free).

## 2026-08-09 — MEM-CHECK: memory validator shipped, wired into the gate (4.1.0)

**Decision:** Shipped `scripts/check-memory.mjs` (source-only
reference implementation) and wired it into `npm run check` as
`lint:memory`; added the "Machine-readable budgets" JSON block to
`pm_skills/memory-policy.md` and the generic validator paragraph to
`pm_skills/prompts/end-of-task.md` step 4 (release 4.1.0, minor).
Exit semantics honour existing policy: structural failures (grammar,
`[x]` items, duplicate IDs, ticket orphans, merge residue) gate
commits; budget overruns and ageing warn and feed proposals —
budgets propose, they never block. Lite-close trailers with no
parseable `Item:` warn for manual triage rather than fail (historic
commits must not poison the gate). Verified on `self/project` (six
honest warnings: four undated standing items, one over-soft ticket,
none structural); second-project verification lands with the lab's
upstream sync.

**Rationale:** Assessment C1 + lab RQ2-LITE: exhortation decays
within a session, enforcement does not; the validator retires the
manual greps of end-of-task step 4 and Diagnose's mechanical half,
and becomes the property oracle EVAL-SCEN needs. First
mechanism of the programme to pay the retire-prose rent.

**Alternatives:** Parsing the prose budget table (rejected —
fragile; the JSON block keeps numbers canonical in one file while
machine-readable); distributing a scaffold copy now (deferred per
the triaged item — proven here first); failing on undated standing
items (softened to warn — adopt-tier projects would gate-break).

## 2026-08-09 — TRIAGE-REV: revolution candidates triaged into the backlog

**Decision:** Promoted the machine-native series candidates
(`self/evaluations/`, 2026-08-08 audit as revised by the extended
assessment and synthesis) into the backlog. Current = Wave 1 / R0
instrumentation: MEM-CHECK, EVAL-SCEN, CTX-CACHE, TRANSCRIPT-SHA,
OPT-PROTO, RETIRE-COMP, CLOSE-COMMIT. Next = Wave 2: EVAL-HARNESS,
MEM-CHECK-2 (absorbs BUDGET-DERIVE), PRUNE-HYST, REFLECT-PRACTICE.
Icebox with named triggers: BACKLOG-STATE, JANITOR-READ,
JANITOR-WRITE, ARCH-RECALL, PAR-BRANCH, PM-MCP. Six wish-list
lines absorbed by promotions and deleted; five remain open.
RETIRE-COMP and EVAL-SCEN's planted-regression bar import lab
findings (PM-Skills-lab RQ8-SCAN, RQ2-LITE). CLOSE-COMMIT records
the maintainer's decision to make commit-and-push a standard close
step rather than propose-only.

**Rationale:** Maintainer instruction 2026-08-09 ("triage the
candidates into canon"), after the lab's first two spikes
triangulated the direction. Current is exactly the R0 gate the
revolution programme needs from the incumbent, so incumbent work
and lab progress now share one critical path.

**Alternatives:** Leaving candidates in the evaluation documents
(rejected — the pick flow reads the backlog, not cold storage);
promoting the structural moves now (rejected — they keep their
named triggers per the two-lane rule).

## 2026-08-08 — GATE-FRESH: fresh-clone docs-gate repair (source-only)

**Decision:** Fixed `npm run check` failing in a fresh clone with 4
`lint:docs` problems. (1) The `scripts/check-docs.mjs` IGNORE list
gains `node_modules` — the three backticked `node_modules/` references
(`self/DEV-INFRASTRUCTURE.md`, `self/project/brief.md`) stay as
written. (2) `self/project/file-map.md` regenerated: its
`.devin/workflows/session.md` line — an untracked empty stub, absent
from every clone — confirmed-and-removed; the shim idea is preserved
in the wish-list. Source-only; no VERSION bump.

**Rationale:** check-docs verifies backticked repo paths exist on
disk, but `node_modules/` is gitignored: legitimately absent in a
fresh clone yet present both locally (after an install) and in CI
(`npm ci` runs before the gate), so every place the gate runs was
masked. Found 2026-08-08 while creating the PM-Skills-lab fork. The
checker-side ignore fixes the class — any future backticked
node_modules reference — where rewording the three docs would fix the
instances and leave the trap armed.

**Alternatives:** Rewording docs to avoid the backticked form
(rejected — instance fix, and the backticked path is the natural
spelling). Committing the empty .devin stub to make the map line true
(rejected — an empty file is not the "session workflow shim" the role
text claimed; write it for real first). Scaffold fork
`pm_skills/scaffold/check-links.mjs` considered per CONTRIBUTING →
"Note on deliberate forks": not applicable — it checks links only and
has no backticked-path pass.
