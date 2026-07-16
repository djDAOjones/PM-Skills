# Decision Log — pm-skills framework repository

<!-- Append new decisions at the top. Don't edit old entries. -->
<!-- Hot sectional: agents scan the latest 10 headings, open only
     relevant bodies. Keep entries tight: Decision / Rationale /
     Alternatives. -->

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
