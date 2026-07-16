# Decision Log — pm-skills framework repository

<!-- Append new decisions at the top. Don't edit old entries. -->
<!-- Hot sectional: agents scan the latest 10 headings, open only
     relevant bodies. Keep entries tight: Decision / Rationale /
     Alternatives. -->

## 2026-07-16 — CODEBASE-AUDIT: recipe, not a new prompt

**Decision:** Ship the whole-codebase audit as a `GUIDE.md` recipe
("Auditing the whole codebase") plus a short pointer note in
`review.md`'s Inputs, composing the existing pieces (review.md area
mode, refactor mode, the doc-deltas ledger) rather than a dedicated
`audit.md`. Chunk unit is the `file-map.md` section (top-level dirs
for adopt-tier repos with no generated map); the audit is
findings-only, aggregated into a cold dated report, triaged into
backlog/wish-list with structural items spun out as refactor tasks.
Minor release 3.15.0.

**Rationale:** The pieces already existed; the only gap was the outer
loop (enumerate → review each → aggregate → triage) — orchestration,
not new mechanism. A recipe keeps the framework surface small and
defers a prompt file until real use proves it under-specifies. Bounded
per-chunk read cost answers the banked read-cost lesson (Hub file-map
~9k words): a single unbounded pass is exactly the anti-pattern the
sectional file-map fixed.

**Alternatives considered:**

- A new `audit.md` prompt — more surface, duplicates area mode;
  deferred behind an evidence trigger.
- A `review.md` whole-repo mode — the orchestration is multi-session
  and sits above a single review, so it belongs in the GUIDE, not
  inside the per-chunk engine.

## 2026-07-16 — SELF-HOST: self/ is the repo's own deployment home

**Decision:** This repo's pm-skills deployment lives in a top-level
`self/` directory mirroring the standard layout (`self/AGENTS.md`,
`self/DEV-INFRASTRUCTURE.md`, `self/project/*`), with one documented
path-mapping rule. The pre-adoption memory (`user_crud`) is archived
verbatim at `self/archive/user_crud/`; its live content migrated into
the standard memory set. The adopted memory is lint-gated; only
`self/archive/**`, `self/evaluations/**`, and `self/_transcripts/**`
stay excluded.

**Rationale:** The standard deployment paths are occupied by the
product here — `pm_skills/` must stay a pristine distributed tree and
the root templates ship with placeholders intact — so the deployment
needs a parallel home that keeps the product/process boundary
mechanically obvious. Maintainer picked this structure at the
2026-07-16 gate ("the repo needs to manage the development of the
framework, but keep its own pm-skills deployment for project
management — clear and organised separation").

**Alternatives considered:**

- Reshape `user_crud` in place (the ticket's lean): keeps a
  meaningless name; conflicts with the maintainer's "retire
  everything else, keep user_crud as archive" direction.
- Make `pm_skills/project/` the real memory and move blank templates
  elsewhere: a breaking product restructure driven by this repo's
  convenience; rejected.

## 2026-07-16 — Decisions carried from the retired ROADMAP

Carried verbatim-in-substance from the retired scratch roadmap
(archived at `self/archive/user_crud/ROADMAP.md` — full reasoning in
the case study it cites). Do not re-litigate:

- **REAL-TRAJ** — CLOSED. Executed by the Hub case study; re-run on
  the *next* consuming project. Self-hosting makes this repo that
  project.
- **FMT-CONV** — DECLINED. Backlog-grammar checker adds gate friction
  for marginal gain; revisit only if tooling parses the backlog
  programmatically.
- **DATA-MIG / TEST-DOC / CL-HORIZON** — DEFERRED with triggers; held
  as blocked Icebox items in `self/project/backlog.md`.
- **Ticket archiving** — maintainer call: archive shipped tickets,
  never delete (durable conclusions still fold into the CHANGELOG
  entry). Home going forward: `self/project/archive/tickets/`.

## 2026-07-16 — Adopted pm-skills (self-hosted)

**Decision:** Adopted pm-skills onto its own repository via
`pm_skills/integrations/adopt.md`; project memory reverse-engineered
from the source tree, git history, and the pre-adoption scratch
roadmap (reverse-engineered — verify). Session loops now run the
standard prompts with the `self/` path mapping instead of the
ROADMAP kick-off analogue.
