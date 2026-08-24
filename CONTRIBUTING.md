# Contributing to PM Skills

This guide is for developing **the framework repository itself**. For
*using* the framework in a project, see [`README.md`](./README.md) and
[`pm_skills/GUIDE.md`](./pm_skills/GUIDE.md).

## What this repo ships vs. what it does not

The framework is overwhelmingly Markdown. Two classes of file live here:

- **Distributed framework** — copied into consuming projects:
  `pm_skills/` and nothing else (since 4.0.0 the three rulebook
  templates live inside it, at
  [`pm_skills/templates/`](./pm_skills/templates/)). Every shipped
  path and its upgrade class is declared in
  [`pm_skills/MANIFEST.md`](./pm_skills/MANIFEST.md), and
  `npm run package -- <target>` exports exactly that set,
  manifest-verified.
- **Source-repo-only** — never distributed, never copied into a consuming
  project: `package.json`, `package-lock.json`, `.github/`, `.githooks/`,
  `scripts/`, the root `.editorconfig`, `.markdownlint.json`,
  `.markdownlint-cli2.jsonc`, `.markdownlintignore`, the root
  `.gitignore`, `CONTRIBUTING.md`, `README.md`, plus the repo's **own
  pm-skills deployment** (SELF-HOST, 2026-07-16): the operative agent
  contract (root [`AGENTS.md`](./AGENTS.md) — moved from
  self/AGENTS.md in 4.0.0), living project memory (`self/project/`),
  and cold storage (`self/archive/` pre-adoption history incl. the
  retired `user_crud` tree, `self/evaluations/`, `self/_transcripts/`,
  and the per-project directories under `self/field-reports/` —
  consuming-project reports filed verbatim; see that tier's README).
  The living memory is inside the lint gate; only the cold storage is
  excluded.

Rule: do **not** add a source-only tooling path to `MANIFEST.md`, and the
upgrade workflow must never carry these files into a consuming project.
`scripts/package.mjs` enforces the boundary mechanically: it exports
only `pm_skills/` and fails if the tracked tree and the manifest
disagree (a new shipped file missing its manifest row, or a manifest
row pointing at nothing).

Note on deliberate forks: `pm_skills/scaffold/check-links.mjs` /
`pm_skills/scaffold/gen-file-map.mjs` /
`pm_skills/scaffold/gen-backlog.mjs` /
`pm_skills/scaffold/check-memory.mjs` /
`pm_skills/scaffold/.markdownlint.json` and their source-only siblings
(`scripts/check-docs.mjs`, `scripts/gen-file-map.mjs`,
`scripts/gen-backlog.mjs`, `scripts/check-memory.mjs`, root
`.markdownlint.json`) are **separate copies by design** — the scaffold
ships generic, the source-repo copy is tuned for this repo (check-docs
also validates inline path references and skips the append-only
changelog as a path source; gen-file-map maps `pm_skills/` as source
and targets `self/project/file-map.md`; the records-mode pair differs
only in defaults — `--project-dir self/project` plus the canon marker
text vs the generic `pm_skills/project` — so their diffs should stay
near-empty; `scripts/package.mjs` has no
scaffold sibling — it is boundary tooling, not a consuming-project
utility). A bug fixed in one must be
considered for the other; there is no sync mechanism, only this
reminder.

## Prerequisites

- Node.js `>= 18` (only for the lint tooling).
- Git.

## Linting and checks

The full gate is one command:

```text
npm run check
```

Individual checks:

- `npm run lint:md` — markdownlint over every tracked Markdown file.
- `npm run lint:fix` — auto-fix the markdownlint issues that are fixable.
- `npm run lint:docs` — internal relative-link **and** inline backticked
  path-reference integrity, via the dependency-free
  `scripts/check-docs.mjs`.
- `npm run lint:spell` — spelling, via `cspell` against the curated
  dictionary in `cspell.json`.
- `npm run lint:editorconfig` — `.editorconfig` conformance on
  non-Markdown files, via `editorconfig-checker`.
- `npm run lint:boundary` — distribution boundary: the tracked
  `pm_skills/` tree and `pm_skills/MANIFEST.md` must agree both ways,
  via `scripts/package.mjs --check`. (`npm run lint` is the four lint
  checks without it.)

Not part of the gate:

- `npm run check:clone` — runs the whole gate against a fresh clone of
  HEAD in a temp directory, exactly as CI does. Run it before pushing a
  change to the gate itself; see "Local–CI parity" below.

Configuration:

- markdownlint rules: `.markdownlint.json`. Each rule customisation has a
  rationale in that file's `$comment` field.
- markdownlint-cli2 options: `.markdownlint-cli2.jsonc`. Sets
  `gitignore: true` so the linter skips whatever `.gitignore` skips
  (`node_modules/`), plus an explicit `ignores` for the cold `self/`
  tiers (`self/archive/`, `self/evaluations/`, `self/_transcripts/`,
  `self/field-reports/*/` — the tier README itself stays gated) — the
  living memory in `self/` is gated. (markdownlint-cli2 does not
  honour `.markdownlintignore`.)
- `.markdownlintignore` exists **for the editor extension only**
  (vscode-markdownlint honours it; the CLI does not). It mirrors the
  gate-excluded paths so the IDE Problems panel matches the CLI gate —
  without it the extension flags scratch files the gate deliberately
  skips. Keep it in step with `.gitignore` + the cli2 `ignores` list.
- cspell: `cspell.json`. `language` accepts `en,en-GB`; `useGitignore`
  skips ignored paths and `ignorePaths` excludes the cold `self/`
  tiers; `ignoreRegExpList` skips SCREAMING-KEBAB backlog/ticket IDs
  (`SELF-HOST`, `MEM-MAINT`, …) as identifiers, not prose; the `words`
  array is the curated domain vocabulary (coined terms and jargon the
  bundled dictionaries miss). When cspell flags a word in distributed
  docs, **prefer rewording** (plain English over coinage); add to
  `words` only a term of art the doc genuinely needs (`auto-jazz`,
  `Reconcile`-family jargon, stack names). Quoted external material in
  memory files takes a file-scoped `cspell:ignore` comment, and cold
  storage is never the reason to grow the dictionary.
- editorconfig-checker: `.editorconfig-checker.json`. Excludes `*.md`
  (markdownlint owns Markdown indentation), the generated lockfile, and
  the cold `self/` tiers.

### Running without a local install

`npm run lint` works with **or without** `node_modules`: the
dependency-based checks are invoked via `npx --yes`, which uses the
local install when present and falls back to the npx cache (fetching
on first run) when not. This keeps the gate one command on
cloud-synced checkouts where `node_modules` is deliberately absent or
stale. The equivalent direct commands:

```text
npx markdownlint-cli2 "**/*.md"
node scripts/check-docs.mjs
npx cspell "**/*.md"
npx editorconfig-checker
```

### OneDrive / cloud-synced checkout

This repo commonly lives in a cloud-synced folder. Do **not** let
`node_modules/` sync — it triggers sync storms and on-demand hydration
stalls. `node_modules/` is gitignored; prefer the `npx`/Node commands
above or let CI do the authoritative run. If you `npm ci` locally,
exclude `node_modules` from cloud sync first.

## Continuous integration

`.github/workflows/lint.yml` runs `npm ci`, then `npm run lint:md`,
`lint:docs`, `lint:memory`, `lint:spell`, `lint:editorconfig`, and
`lint:boundary` — the same set as `npm run check` — on every push to
the default branch and every pull request. It runs in a clean Ubuntu
runner, so the cloud-sync constraints above never apply to CI.

### Local–CI parity

CI lints a **fresh clone**; your checkout also holds files Git ignores
— `node_modules/`, the generated janitor report under
`self/project/reports/`, a project's `local/` field reports. Anything
in the gate that consults the filesystem can therefore pass locally and
fail in CI. That happened twice: GATE-FRESH (2026-08-08, `node_modules/`)
and GATE-REPORTS (2026-08-24, the janitor report), the second leaving
the Lint badge red for ten pushes over six days.

Two things keep the two honest:

- `scripts/check-docs.mjs` resolves every reference against the set of
  paths **Git** knows about, never against the filesystem, so a link to
  a generated file fails here exactly as it fails in CI. Its `IGNORE`
  list is the one deliberate exception, and it covers backticked prose
  only — never links. The other checks already honour `.gitignore`
  (`gitignore: true`, `useGitignore: true`, and the
  editorconfig-checker excludes).
- `npm run check:clone` proves the whole gate on a pristine clone, for
  divergence classes nobody has anticipated. It is opt-in because it
  costs a clone plus a cold `npx` fetch. Run it whenever you change a
  lint config, a check script, or `.gitignore`.

## Pre-commit hook

A tracked hook at `.githooks/pre-commit` runs `npm run check` before
every commit, so a red tree cannot be committed by accident. Wire it
once with:

```text
git config core.hooksPath .githooks
```

(The `prepare` script in `package.json` does this automatically on any
`npm install`/`npm ci`.) Bypass a single commit in an emergency with
`git commit --no-verify` — CI still runs the same gate, so a bypassed
red commit fails on push.

## Dependencies

Keep dev dependencies minimal (an `AGENTS.md` hard rule). There are
currently three: `cspell`, `editorconfig-checker`, and
`markdownlint-cli2`. The docs-integrity checker
(`scripts/check-docs.mjs`) is dependency-free by design. When you add any dependency, regenerate and
commit the lockfile:

```text
npm install --package-lock-only
```

### Security overrides

`package.json` currently carries **no** `overrides`. The two
historical pins — `js-yaml` `^4.2.0` (CVE-2026-53550) and
`markdown-it` `^14.2.0` (CVE-2026-48988) — were retired on
2026-08-17, when `markdownlint-cli2@0.23.2` moved onto patched
releases of both directly (the retirement condition the pins were
documented with). The same bump resolved the js-yaml 4.x
quadratic-CPU advisories (CVE-2026-59870, fix never backported to
4.x) and the transitive `mailto:` scan-loop DoS under
`markdown-it`.

All such advisories to date are dev-only, lint-time DoS exposure
over trusted repo docs, not a runtime surface. Triage new ones via
`npm audit`; reintroduce an override only when the tool itself
cannot move yet, document the CVE beside the pin, and remove it
once `markdownlint-cli2` depends on the patched version (or later)
directly.

## Versioning and releases

- The canonical framework version is
  [`pm_skills/VERSION`](./pm_skills/VERSION). `package.json` is source-only
  tooling and intentionally carries no version, so there is no second
  source of truth.
- A change to the **distributed** framework (any `pm_skills/**` file or a
  root template) must bump `pm_skills/VERSION` and add a
  [`pm_skills/CHANGELOG.md`](./pm_skills/CHANGELOG.md) entry with Upgrade
  actions. See [`pm_skills/prompts/release.md`](./pm_skills/prompts/release.md).
- A change to **source-only** tooling (this file, CI, lint config,
  `scripts/`, `package.json`) does **not** bump `VERSION` or the changelog —
  consuming projects are unaffected.

## Adding a prompt or integration

- A new `pm_skills/prompts/*.md` or `pm_skills/integrations/*.md` inherits
  the `framework` class automatically (see `MANIFEST.md`).
- Keep the file tree in [`pm_skills/GUIDE.md`](./pm_skills/GUIDE.md) in
  sync — the link check and a quick tree review catch drift.
- Run `npm run lint` before committing.

## Optional future tooling

None pending. The previous candidates — spell check (`cspell`),
`editorconfig-checker`, and inline path-reference validation — are now
part of the gate above.
