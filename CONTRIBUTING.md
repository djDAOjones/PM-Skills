# Contributing to PM Skills

This guide is for developing **the framework repository itself**. For
*using* the framework in a project, see [`README.md`](./README.md) and
[`pm_skills/GUIDE.md`](./pm_skills/GUIDE.md).

## What this repo ships vs. what it does not

The framework is overwhelmingly Markdown. Two classes of file live here:

- **Distributed framework** — copied into consuming projects:
  `pm_skills/` plus the three root templates ([`AGENTS.md`](./AGENTS.md),
  [`UI-STANDARDS.md`](./UI-STANDARDS.md),
  [`DEV-INFRASTRUCTURE.md`](./DEV-INFRASTRUCTURE.md)). Every shipped path
  and its upgrade class is declared in
  [`pm_skills/MANIFEST.md`](./pm_skills/MANIFEST.md).
- **Source-repo-only** — never distributed, never copied into a consuming
  project: `package.json`, `package-lock.json`, `.github/`, `scripts/`,
  the root `.editorconfig`, `.markdownlint.json`, `.markdownlint-cli2.jsonc`,
  the root `.gitignore`, `CONTRIBUTING.md`, and `README.md`.

Rule: do **not** add a source-only tooling path to `MANIFEST.md`, and the
upgrade workflow must never carry these files into a consuming project.

## Prerequisites

- Node.js `>= 18` (only for the lint tooling).
- Git.

## Linting and checks

The full gate is one command:

```text
npm run lint
```

Individual checks:

- `npm run lint:md` — markdownlint over every tracked Markdown file.
- `npm run lint:fix` — auto-fix the markdownlint issues that are fixable.
- `npm run lint:links` — internal relative-link integrity, via the
  dependency-free `scripts/check-links.mjs`.
- `npm run lint:paths` — inline backticked path-reference integrity, via
  the dependency-free `scripts/check-paths.mjs`.
- `npm run lint:spell` — spelling, via `cspell` against the curated
  dictionary in `cspell.json`.
- `npm run lint:editorconfig` — `.editorconfig` conformance on
  non-Markdown files, via `editorconfig-checker`.

Configuration:

- markdownlint rules: `.markdownlint.json`. Each rule customisation has a
  rationale in that file's `$comment` field.
- markdownlint-cli2 options: `.markdownlint-cli2.jsonc`. Sets
  `gitignore: true` so the linter skips whatever `.gitignore` skips
  (`node_modules/`, `user_crud/`) — one ignore source, no separate ignore
  list to drift. (markdownlint-cli2 does not honour `.markdownlintignore`.)
- cspell: `cspell.json`. `language` accepts `en,en-GB`; `useGitignore`
  skips ignored paths; the `words` array is the curated domain
  vocabulary (coined terms and jargon the bundled dictionaries miss).
- editorconfig-checker: `.editorconfig-checker.json`. Excludes `*.md`
  (markdownlint owns Markdown indentation), the generated lockfile, and
  the `user_crud/` scratch dir.

### Running without a local install

Each check runs straight from the npx cache or Node, with no project
install:

```text
npx markdownlint-cli2 "**/*.md"
node scripts/check-links.mjs
node scripts/check-paths.mjs
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
`lint:links`, `lint:paths`, `lint:spell`, and `lint:editorconfig`, on
every push to the default branch and every pull request. It runs in a
clean Ubuntu runner, so the cloud-sync constraints above never apply to
CI.

## Dependencies

Keep dev dependencies minimal (an `AGENTS.md` hard rule). There are
currently three: `cspell`, `editorconfig-checker`, and
`markdownlint-cli2`. The link and path checkers
(`scripts/check-links.mjs`, `scripts/check-paths.mjs`) are
dependency-free by design. When you add any dependency, regenerate and
commit the lockfile:

```text
npm install --package-lock-only
```

### Security overrides

`package.json` `overrides` pins two transitive dependencies of
`markdownlint-cli2` to patched releases:

- `js-yaml` → `^4.2.0` (CVE-2026-53550: quadratic-complexity DoS in YAML
  merge-key handling).
- `markdown-it` → `^14.2.0` (CVE-2026-48988: quadratic-complexity DoS in
  the smartquotes rule).

Both are dev-only, lint-time DoS issues over trusted repo docs, not a
runtime exposure — but the pins keep `npm audit` clean at no cost (both
are backward-compatible minor bumps). `markdownlint-cli2` still pins the
unpatched versions exactly, so its own auto-fix would downgrade it;
remove an override only once `markdownlint-cli2` depends on the patched
version (or later) directly.

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
