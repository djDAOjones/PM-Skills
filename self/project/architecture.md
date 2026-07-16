# Architecture — pm-skills framework repository

<!-- Hot whole-file read. See pm_skills/memory-policy.md for limits. -->
<!-- Describe current structure only. History lives in decision-log.md. -->

## Tech stack

- **Markdown** — the product is docs; everything distributed is `.md`
  plus two Node scaffold scripts.
- **Node >= 18 (dev only)** — lint tooling and the two dependency-free
  scaffold scripts; invoked via `npx --yes` so no local install is
  required.
- **git** — sync channel, release ledger, and the discovery mechanism
  for tooling (`git ls-files`, no filesystem walks on cloud-synced
  checkouts).

## Project structure

- `pm_skills/` — **the product** (distributed; classes in
  `pm_skills/MANIFEST.md`):
  - `init.md`, `GUIDE.md`, `memory-policy.md`, `VERSION`,
    `CHANGELOG.md`, `MANIFEST.md` — core docs + release machinery.
  - `prompts/` — stage prompts (session-start, scoping → validation,
    end-of-task, memory-maintenance, release, upgrade, review, …).
  - `integrations/` — workflow files (task, bugfix, init-mvp, adopt).
  - `project/` — blank memory templates consuming projects populate.
  - `scaffold/` — generic starter config + scripts, copied at init.
- `AGENTS.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md` (root) —
  **product**: distribution templates with placeholders intact.
- `self/` — **process**: this repo's own pm-skills deployment
  (contract, memory, archive). Never distributed.
- `scripts/` — source-only tooling forks tuned for this repo
  (`check-docs.mjs`, `gen-file-map.mjs`).
- `.github/workflows/`, `.githooks/` — CI lint gate + pre-commit hook.
- `.windsurf/` — IDE workflows and rules pointers for this repo.
- Root configs — `.markdownlint.json`, `.markdownlint-cli2.jsonc`,
  `.markdownlintignore`, `cspell.json`, `.editorconfig-checker.json`,
  `.editorconfig`, `package.json` (source-only, no version field).

## Key modules

- `pm_skills/MANIFEST.md` — per-path upgrade classes; the contract
  that makes upgrades declarative.
- `pm_skills/CHANGELOG.md` — append-only release history doubling as
  the upgrade instruction set.
- `scripts/check-docs.mjs` — docs integrity (links + inline paths);
  the repo's main rot detector.
- `scripts/gen-file-map.mjs` — file-map skeleton generator tuned for
  this repo (maps the product tree; the scaffold copy excludes it).

## Communication patterns

Cross-references between docs, one direction each where possible.
Canonical copies live in exactly one place (ticket grammar in the
backlog template; read tiers in the root AGENTS template; tooling
detail in `CONTRIBUTING.md`) — other files point, never restate.
`scripts/check-docs.mjs` enforces that every reference resolves.

## Dependency policy

Zero runtime dependencies — the framework must work by copying files.
Dev dependencies need explicit approval; currently three lint tools.
Transitive security pins via `package.json` `overrides`.

## Dev workflow

- Install: none required (`npx --yes` fallback) — `npm ci` optional
  and discouraged on cloud-synced checkouts.
- Gate: `npm run check` (see `self/DEV-INFRASTRUCTURE.md`).
- Release: `pm_skills/prompts/release.md` — bump VERSION, prepend
  CHANGELOG entry with Upgrade actions, sync MANIFEST/GUIDE.
- Session loop: `pm_skills/prompts/session-start.md` Start B with the
  `self/` path mapping (`self/AGENTS.md`).
