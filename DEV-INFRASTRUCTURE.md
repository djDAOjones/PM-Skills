# Dev Infrastructure

<!-- NOTE: This file is a template. It contains CUSTOMISE placeholders
     that must be populated before it can serve as an authoritative reference.
     Complete the kickstart process (init.md Step 8) to fill them in.
     If this project has no build step, dev server, or package manager,
     this file can be removed from the boilerplate. -->

This file defines the permanent rules for how the project is built,
run, tested, versioned, and shipped. `AGENTS.md` references this file.
Read it before any task that involves the build system, dev server,
scripts, configuration, or deployment.

---

## Package management

<!-- CUSTOMISE: Define the package manager and dependency policy.
     Example:

Package manager: **npm**

- `package.json` lives in the project root.
- **Runtime dependencies** require explicit approval. The default is
  zero runtime dependencies.
- **Dev dependencies** (bundler, test runner, linter) can be added
  when justified by the architecture.
- Run `npm install` after cloning. Do not commit `node_modules/`. -->

---

## Canonical scripts

<!-- CUSTOMISE: List every script in package.json. Example:

| Script | Command | Purpose | When to use |
| --- | --- | --- | --- |
| `dev` | `node build.js --watch --serve` | Dev server with hot reload | Day-to-day development |
| `build` | `NODE_ENV=production node build.js` | Production build | Before deploy |
| `test` | `vitest run` | Run tests once | After every change |
| `test:watch` | `vitest watch` | Tests in watch mode | During development |
| `push` | `node push.js` | Build + commit + push | When ready to ship |

Do not add scripts without updating this table. -->

---

## Dev server

<!-- CUSTOMISE: Define the canonical dev URL and how to start it.
     Example:

- **URL:** `http://localhost:3000`
- **Start:** `npm run dev`
- **Serves:** Build output from `docs/` (esbuild rebuilds on change)
- **Hot reload:** JS changes trigger esbuild rebuild automatically.
  CSS and HTML changes are watched and copied to the output directory.

All development and testing should use this URL. Do not hard-code
alternative ports or URLs. -->

---

## Build system

<!-- CUSTOMISE: Define the bundler, entry point, and output. Example:

- **Bundler:** esbuild (via custom `build.js`)
- **Entry point:** `src/main.js`
- **Output directory:** `docs/` (also serves as GitHub Pages root)
- **Format:** ESM, target ES2020
- **Source maps:** Enabled in both dev and production
- **Minification:** Production builds only
- **Static files:** `index.html`, `styles/*.css`, and `images/` are
  copied to the output directory by the build script.

The output directory is **read-only** — never hand-edit files in it.
They are overwritten on every build. -->

---

## Version management

<!-- CUSTOMISE: Define the versioning scheme. Example:

Format: `major.minor.build` (e.g. `3.1.76`)

| Component | Source | Updated | Example |
| --- | --- | --- | --- |
| `major.minor` | `package.json` version field | Manually, for features or breaking changes | 3.0 → 3.1 |
| `build` | `version.json` build field | Automatically, once per dev session | 3.1.75 → 3.1.76 |

The combined version is injected at build time via esbuild's `define`
feature as `APP_VERSION`. It is a compile-time constant with no
runtime overhead.

Do not edit `version.json` manually — the build script manages it.
Bump `major.minor` in `package.json` when shipping a new feature or
breaking change. -->

---

## Deployment

<!-- CUSTOMISE: Define the deploy target and pipeline. Example:

- **Target:** GitHub Pages (served from `docs/` on `main` branch)
- **Pipeline:** `npm run build:deploy` → builds to `dist/`, copies to
  `docs/`, ready to commit and push.
- **Post-deploy:** Verify the live URL matches the latest build
  version. -->

---

## Utility scripts

<!-- CUSTOMISE: Describe any helper scripts beyond the standard
     dev/build/test cycle. Example:

- **`push.js`** — Runs a production build, stages all changes, commits
  with a version-stamped message, and pushes to the remote. Safe to
  run without review for routine commits. Does not force-push. -->

---

## Configuration strategy

<!-- CUSTOMISE: Define where tuneable values and tokens live. Example:

- **Constants:** `src/config/constants.js` — all tuneable values
  (animation, rendering, interaction, path, motion, text labels,
  video export). Grouped by domain. Check this file before adding
  any new hard-coded value.
- **Design tokens:** `styles/tokens.css` — CSS custom properties for
  colours, spacing, and theming. Do not duplicate token values in
  JavaScript; reference the CSS properties where possible.
- **Keybindings:** `src/config/keybindings.js` — all mouse and
  keyboard shortcuts. Customisable at runtime via localStorage.

Do not scatter configuration across service files. If a value might
need tuning, it belongs in the constants file. -->

---

## Editor config

<!-- CUSTOMISE: If the project uses .editorconfig, describe it. Example:

The project root contains `.editorconfig` for mechanical style
enforcement. It defines:
- UTF-8 encoding, LF line endings
- 2-space indentation for all files
- Trailing whitespace trimmed (except in markdown)
- Single quotes in JavaScript

Editors that support EditorConfig (VS Code, Windsurf, Sublime,
IntelliJ, vim) apply these rules automatically on save. This is the
first line of defence for consistent formatting — before any linter
or formatter runs.

Copy `ai_project_manager_kickstart/scaffold/.editorconfig` to the
project root if one does not already exist. -->

---

## Files agents must not hand-edit

<!-- CUSTOMISE: List concrete paths. Example:

- `docs/` — build output, overwritten on every build.
- `dist/` — intermediate build output.
- `version.json` — managed by the build script.
- `node_modules/` — managed by npm.
- `package-lock.json` — managed by npm. Do not edit manually, but
  do commit it. -->
