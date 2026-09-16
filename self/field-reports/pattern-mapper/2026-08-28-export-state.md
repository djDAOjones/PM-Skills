<!-- field-report: project=pattern-mapper · date=2026-08-28 · type=export
     · pm-skills=canon 4.0.0 (installed as 3.17.1 on 2026-07-17 and upgraded to 4.0.0 the same day; never upgraded since; baseline taken before the pm-next v2 intake maps its history)
     · source=Git blobs at 348eb1692c5c16eb94d6c934cd8d9a42a78f6a95 for the project's harness and gate configuration and its own docs (.windsurf, .claude, _transcripts, .githooks, .github, cspell.json, .markdownlint.json, .markdownlint-cli2.jsonc, .markdownlintignore, .editorconfig-checker.json)
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained where present; the agent memory, the project transcripts and every session log stay in the local lane -->

# State export

Snapshot: `348eb1692c5c16eb94d6c934cd8d9a42a78f6a95`.

| Path | Bytes |
| --- | ---: |
| `.claude/launch.json` | 750 |
| `.claude/settings.json` | 263 |
| `.editorconfig-checker.json` | 136 |
| `.githooks/pre-commit` | 734 |
| `.github/workflows/lint.yml` | 8066 |
| `.markdownlint-cli2.jsonc` | 466 |
| `.markdownlint.json` | 809 |
| `.markdownlintignore` | 415 |
| `.windsurf/workflows/next.md` | 331 |
| `_transcripts/README.md` | 1077 |
| `cspell.json` | 3499 |

<!-- FILE: .claude/launch.json -->

{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "pattern-mapper-dev",
      "runtimeExecutable": "npm",
      "runtimeArgs": [
        "run",
        "dev"
      ],
      "port": 5173,
      "autoPort": true
    },
    {
      "name": "pattern-mapper-preview",
      "runtimeExecutable": "npx",
      "runtimeArgs": [
        "vite",
        "preview",
        "--port",
        "4173"
      ],
      "port": 4173,
      "autoPort": true
    },
    {
      "name": "pattern-mapper-pages-preview",
      "runtimeExecutable": "npx",
      "runtimeArgs": [
        "vite",
        "preview",
        "--base",
        "/pattern-mapper/",
        "--port",
        "4173"
      ],
      "port": 4173,
      "autoPort": true
    }
  ]
}

<!-- FILE: .claude/settings.json -->

{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|resume",
        "hooks": [
          {
            "type": "command",
            "command": "bash \"$CLAUDE_PROJECT_DIR\"/scripts/cloud-setup.sh"
          }
        ]
      }
    ]
  }
}

<!-- FILE: .editorconfig-checker.json -->

{
  "Exclude": [
    "\\.md$",
    "package-lock\\.json",
    "node_modules",
    "_user-guff",
    "src/core/palettes/.*\\.csv$"
  ]
}

<!-- FILE: .githooks/pre-commit -->

#!/bin/sh
# Pre-commit gate: run the repo's one-command quality gate so a red
# tree cannot be committed by accident. Dependency-free: `npm run
# check` invokes the linters via npx (local install used when present,
# npx cache otherwise) plus the Node-only docs checker.
#
# Wired via `git config core.hooksPath .githooks` — run once manually,
# or let the package.json `prepare` script do it on any npm install.
# Bypass for a genuine emergency with `git commit --no-verify`.

echo "pre-commit: npm run check"
npm run check || {
  echo ""
  echo "pre-commit: check FAILED — commit blocked."
  echo "Fix the issues (npm run lint:fix handles auto-fixable Markdown),"
  echo "or bypass once with: git commit --no-verify"
  exit 1
}

<!-- FILE: .github/workflows/lint.yml -->

name: CI

# Runs the one-command quality gate (`npm run check`) — typecheck,
# ESLint (incl. the src/core isolation rule), Vitest golden suite,
# Rust crate tests + wasm-pack build (M5), production build, the
# docs-lint baseline, and the report-only secret scan — on every push
# to the default branch and every pull request.
# CI parity rule (DEV-INFRASTRUCTURE.md): local green = CI green.
#
# On a push to the default branch a green gate is followed by the
# GitHub Pages publish (D172): the bundle is rebuilt with the
# project-site base path (`/<repo>/`) and `dist` is deployed. The
# repository's Pages source must be "GitHub Actions" — a branch
# source keeps its own build running and races this one. The public
# bundle omits the measurement harness (PUB-06), and once deployed the
# live build id is checked against the pushed commit (PUB-05).

on:
  push:
    branches: [main, master]
  pull_request:

permissions:
  contents: read

# Supply-chain pins (CI-01). Every third-party action below is
# referenced by full commit SHA with its version in a comment beside
# it: a tag is a movable pointer, and `@v4` silently becomes whatever
# the publisher pushes next. The toolchain versions are pinned here so
# a runner-image refresh cannot change what the gate ran against, and
# wasm-pack is fetched as a fixed release asset whose checksum is
# verified before it is unpacked — the previous `curl … | sh` executed
# whatever that URL served at that moment.
#
# Bumping any of these is a deliberate act with its own commit; the
# procedure is in DEV-INFRASTRUCTURE.md -> "Supply-chain pins".
# (The runner image is written out at each `runs-on` — that key is
# resolved before the `env` context exists, so it cannot be a
# variable. It is listed in the bump procedure with the rest.)
env:
  # The `engines` floor in package.json: CI proves the minimum we claim.
  NODE_VERSION: 22.18.0
  # Matches the toolchain the crate is developed against.
  RUST_VERSION: 1.97.1
  WASM_PACK_VERSION: 0.15.0
  WASM_PACK_SHA256: c09f971ecaed9a2efc80fdcea7a00ef6b53c7fadc8c57d1f61b53a6aa66b668a

# Cancel superseded runs on the same ref: rapid pushes (or PR updates)
# should not queue redundant runs — only the latest commit matters.
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  check:
    name: Quality gate (npm run check)
    runs-on: ubuntu-24.04 # pinned: `ubuntu-latest` moves between images (CI-01)
    # The gate must stay under ~2 minutes locally; cap the job so a
    # hung runner fails fast instead of consuming the 6-hour default.
    timeout-minutes: 15
    steps:
      - name: Check out
        uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262 # v4.4.0

      - name: Set up Node.js
        uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020 # v4.4.0
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm

      - name: Install dependencies
        run: npm ci

      # Rust for the stitch-engine crate (check:wasm). The hosted
      # runner ships rustup, but its `stable` moves with the image;
      # pin the exact toolchain so a green gate names a compiler.
      - name: Set up Rust
        run: |
          rustup toolchain install "$RUST_VERSION" \
            --profile minimal --target wasm32-unknown-unknown --no-self-update
          rustup default "$RUST_VERSION"
          rustc --version

      - name: Cache cargo
        uses: actions/cache@0057852bfaa89a56745cba8c7296529d2fc39830 # v4.3.0
        with:
          path: |
            ~/.cargo/registry
            ~/.cargo/git
            crates/stitch-engine/target
          key: cargo-${{ runner.os }}-${{ hashFiles('crates/stitch-engine/Cargo.lock') }}

      # A fixed release asset, verified before it runs. The installer
      # this replaced piped an unpinned remote script into `sh`, so
      # every CI run — and every deploy behind it — trusted whatever
      # that URL served at that moment (CI-01). A checksum mismatch is
      # fatal by construction: `sha256sum -c` is the gate, and the
      # tarball is never unpacked if it fails.
      - name: Install wasm-pack (pinned, checksum-verified)
        run: |
          set -euo pipefail
          asset="wasm-pack-v${WASM_PACK_VERSION}-x86_64-unknown-linux-musl"
          url="https://github.com/wasm-bindgen/wasm-pack/releases/download/v${WASM_PACK_VERSION}/${asset}.tar.gz"
          curl --proto '=https' --tlsv1.2 -sSfL --retry 3 -o wasm-pack.tar.gz "$url"
          echo "${WASM_PACK_SHA256}  wasm-pack.tar.gz" | sha256sum -c -
          mkdir -p wasm-pack-extract "$HOME/.cargo/bin"
          tar -xzf wasm-pack.tar.gz -C wasm-pack-extract
          # Locate the binary rather than assuming the archive's layout:
          # the pin is the checksum, and the extraction should not be a
          # second, unverified assumption that breaks on a repackage.
          binary="$(find wasm-pack-extract -type f -name wasm-pack | head -n 1)"
          test -n "$binary" || { echo "wasm-pack not found in $asset"; exit 1; }
          install -m 0755 "$binary" "$HOME/.cargo/bin/wasm-pack"
          rm -rf wasm-pack.tar.gz wasm-pack-extract
          wasm-pack --version

      - name: Quality gate
        run: npm run check
        env:
          CI: 'true'

      # A project site is served under /<repo>/, so the shipped bundle
      # is a second build with that base. The gate's own `vite build`
      # (base `/`) stays a build proof; this one is the artefact. The
      # wasm pkg check:wasm built above is still on disk, so the bundle
      # carries the Rust engine. Default-branch pushes only.
      - name: Build the Pages bundle
        if: github.event_name == 'push' && github.ref_name == github.event.repository.default_branch
        run: npx vite build --base "$BASE_PATH"
        env:
          BASE_PATH: /${{ github.event.repository.name }}/
          # The public bundle carries the app alone: the measurement
          # harness (bench.html, bench-source.html) stays in every other
          # build — the gate's compile proof above, and bench:auto — but
          # not at a public URL (PUB-06; see vite.config.ts).
          PM_PUBLIC_BUNDLE: '1'

      - name: Upload the Pages artifact
        if: github.event_name == 'push' && github.ref_name == github.event.repository.default_branch
        uses: actions/upload-pages-artifact@fc324d3547104276b827a68afc52ff2a11cc49c9 # v5.0.0
        with:
          path: dist

  deploy:
    name: Publish to GitHub Pages
    # `needs` makes a red gate a non-deploy, not a broken site.
    needs: check
    if: github.event_name == 'push' && github.ref_name == github.event.repository.default_branch
    runs-on: ubuntu-24.04 # pinned: `ubuntu-latest` moves between images (CI-01)
    timeout-minutes: 10
    permissions:
      contents: read
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@cd2ce8fcbc39b97be8ca5fce6e763baed58fa128 # v5.0.0

      # Post-deploy verification (PUB-05): the site must now serve the
      # commit this run deployed. These steps run AFTER deploy-pages, so
      # a FAIL reddens the run without un-deploying — the previous
      # bundle is already replaced; the red run is the signal to look,
      # and `npm run verify:deploy` reproduces the check locally. The
      # script has no dependencies, so there is no `npm ci` here.
      - name: Check out
        uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262 # v4.4.0

      - name: Set up Node.js
        uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020 # v4.4.0
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Verify the live build id
        run: node scripts/verify-deploy.mjs --url "$PAGE_URL" --wait 300 "$GITHUB_SHA"
        env:
          PAGE_URL: ${{ steps.deployment.outputs.page_url }}

<!-- FILE: .markdownlint-cli2.jsonc -->

{
  // markdownlint-cli2 options. This is separate from the rule config in
  // .markdownlint.json, which markdownlint-cli2 still reads and merges.
  //
  // gitignore:true makes the linter skip everything .gitignore skips
  // (node_modules/, installed deps) so the "**/*.md" glob never descends
  // into them. markdownlint-cli2 does NOT honour a .markdownlintignore
  // file, so relying on one silently lints node_modules.
  "gitignore": true,
  "ignores": []
}

<!-- FILE: .markdownlint.json -->

{
  "$comment": "PM Skills lint config. MD041 is relaxed because integration workflow files use YAML frontmatter with a 'description' field (not 'title') as their de facto heading; MD029 is disabled because workflow files deliberately use continuous step numbering across '--- SECTION ---' dividers; MD013 is disabled because the framework wraps prose for readability but does not enforce a fixed line length, and tables/citations/code blocks routinely exceed 80 chars; MD024 uses siblings_only because CHANGELOG.md repeats '### Added'/'### Changed'/'### Upgrade actions' under each version heading by design. All other defaults stand.",
  "default": true,
  "MD041": {
    "front_matter_title": "^\\s*description\\s*[:=]"
  },
  "MD029": false,
  "MD013": false,
  "MD024": {
    "siblings_only": true
  }
}

<!-- FILE: .markdownlintignore -->

# For the EDITOR extension only (vscode-markdownlint honours this file).
# The CLI gate (markdownlint-cli2) ignores .markdownlintignore entirely —
# it skips these paths via `gitignore: true` in .markdownlint-cli2.jsonc.
# This file exists so the IDE Problems panel matches the CLI gate:
# without it the extension lints gitignored scratch and node_modules.
# Do not remove as "unused".
node_modules/
_user-guff/

<!-- FILE: .windsurf/workflows/next.md -->

---
description: Pick and ship the next Pattern Mapper backlog item
---

Run `pm_skills/integrations/next.md` as written (standard consuming
project — no path mapping): project memory lives in
`pm_skills/project/`, the operative contract is the root `AGENTS.md`,
and the quality gate and scripts are per `DEV-INFRASTRUCTURE.md`.

<!-- FILE: _transcripts/README.md -->

# Session transcripts

Saved chat-session transcripts, kept as evidence for later evaluation
and prompt-tuning. **Cold tier — never auto-loaded** (`AGENTS.md` →
"Before every task"); the close ritual in
`pm_skills/prompts/end-of-task.md` offers to save one, and it never
gates a close.

Saving is one command since DOCS-01 (D159):

```sh
npm run transcript
```

lists this project's Claude Code sessions; run it again with an id
prefix to export one here as **redacted** markdown. Sessions from
before the D150 rename live under the old directory slug — reach them
with `--dir`.

The `.md` files here are **gitignored**, deliberately. A transcript
carries whatever was on screen during a working session — captured
content, file paths, project names — so it stays local unless it has
been read and redacted first. See `pm_skills/GUIDE.md` → "Saving
session transcripts" for the redaction rules.

This README is the one tracked file in the folder; it exists so the
path is real, so documentation may reference it, and so the ignore
rule has something to sit beside.

<!-- FILE: cspell.json -->

{
  "version": "0.2",
  "language": "en,en-GB",
  "useGitignore": true,
  "ignorePaths": [
    "node_modules/**",
    "package-lock.json",
    "_user-guff/**",
    "docs/requirements.md",
    "src/core/palettes/**",
    "THIRD-PARTY-NOTICES.md"
  ],
  "ignoreRegExpList": [
    "/\\b[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+\\b/g"
  ],
  "words": [
    "Adire",
    "AKIA",
    "Anchor",
    "Ariadna",
    "assertable",
    "asyncification",
    "asyncifies",
    "autojazz",
    "automatable",
    "backticked",
    "baselined",
    "beforeunload",
    "benchable",
    "bindability",
    "bindgen",
    "bluenoise",
    "caffeinate",
    "cbrt",
    "CIEDE",
    "CIELAB",
    "clippy",
    "coalescer",
    "codegen",
    "COEP",
    "cooldown",
    "Cosmo",
    "descope",
    "descoped",
    "deserialisation",
    "DeviantArt",
    "diffable",
    "distinguishability",
    "DITH",
    "Dockerfiles",
    "docstrings",
    "dppx",
    "driveable",
    "editclasses",
    "fdlibm",
    "FILEMAP",
    "Finca",
    "Fluoro",
    "focusables",
    "fontkit",
    "frontmatter",
    "fround",
    "gatelessly",
    "gestureless",
    "gesturestart",
    "gitleaks",
    "gofmt",
    "grayscale",
    "greppability",
    "greppable",
    "HSTS",
    "iceboxed",
    "instrumentable",
    "ioreg",
    "Kagaku",
    "Kilim",
    "killall",
    "ledgered",
    "letraset",
    "letterboxed",
    "letterboxing",
    "libm",
    "lightroom",
    "livepath",
    "lockfiles",
    "Madeira",
    "messageerror",
    "misrenders",
    "moorit",
    "mypy",
    "narrowings",
    "neartie",
    "Ninke",
    "nodark",
    "nodither",
    "nontext",
    "ombr\u00e9",
    "oneline",
    "Opinionation",
    "optgroups",
    "pfull",
    "cloneability",
    "loadeddata",
    "onmessageerror",
    "pickerless",
    "pipefail",
    "pmproj",
    "pointerup",
    "smoothstep",
    "posterisation",
    "posterise",
    "precheck",
    "previewable",
    "protectable",
    "pyproject",
    "quietable",
    "readback",
    "reassignable",
    "recuts",
    "rederive",
    "rederives",
    "rederiving",
    "regenerable",
    "regoverns",
    "relitigate",
    "relitigated",
    "relitigating",
    "reparent",
    "reparenting",
    "reparents",
    "resampler",
    "rescoped",
    "retroreflective",
    "RGBA",
    "Riso",
    "Risograph",
    "rrggbb",
    "rustflags",
    "rustup",
    "rvfc",
    "Sashiko",
    "seedable",
    "serde",
    "serp",
    "Shibori",
    "shortsha",
    "sidechain",
    "sidechains",
    "skimmable",
    "slideable",
    "smartquotes",
    "splittable",
    "srgb",
    "staticcheck",
    "Stijl",
    "stitchability",
    "stitchable",
    "strawman",
    "Stucki",
    "Sullivans",
    "Sumi",
    "Suzani",
    "Talavera",
    "Tauri",
    "tenmoku",
    "Threadify",
    "timebox",
    "timeboxed",
    "timeboxing",
    "toggleable",
    "toplevel",
    "transcendentals",
    "transferables",
    "trufflehog",
    "Ukiyo",
    "unbindable",
    "uncalibrated",
    "unclickable",
    "undithered",
    "undock",
    "undocked",
    "ungated",
    "unhandledrejection",
    "unjudged",
    "unminified",
    "unparseable",
    "unpayable",
    "unredacted",
    "unrepresentable",
    "unrotated",
    "unroutable",
    "unrouted",
    "unrunnable",
    "unstarted",
    "untokenised",
    "upng",
    "Vaporwave",
    "watchouts",
    "WCAG",
    "webgpu",
    "WGSL",
    "worklist",
    "worktree",
    "worktrees",
    "zari",
    "zgodzinski",
    "zoomable"
  ]
}

