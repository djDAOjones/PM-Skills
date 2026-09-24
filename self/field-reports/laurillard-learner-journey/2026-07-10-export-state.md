<!-- field-report: project=laurillard-learner-journey · date=2026-07-10 · type=export
     · pm-skills=3.1.1 (installed with the first commit 2fef7cf on 2026-07-10; never upgraded)
     · source=Git blobs at 0341c0bb898776bf353a67d490ec7d9d73c24996 for the harness and gate configuration the project carries (.github, .editorconfig, .gitignore, .markdownlint.json, package.json, check-links.mjs, scripts), taken 2026-09-24 by Claude Code (read from a scratch clone assembled from the remote and the checkout's objects, every ref set to its value at the cut-off 2026-09-24T11:40:00.000Z; content-addressed, so identical to the checkout's HEAD)
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained; uncommitted work, session logs and the bundle stay in the local lane -->

# State export

Snapshot: `0341c0bb898776bf353a67d490ec7d9d73c24996`.

| Path | Bytes |
| --- | ---: |
| `.editorconfig` | 731 |
| `.github/workflows/check.yml` | 289 |
| `.gitignore` | 371 |
| `.markdownlint.json` | 1155 |
| `check-links.mjs` | 5018 |
| `package.json` | 551 |
| `scripts/check-html.mjs` | 4851 |
| `scripts/check-project-memory.mjs` | 1348 |

<!-- FILE: .editorconfig -->

# EditorConfig — copy this file to your project root and customise.
# See https://editorconfig.org for supported editors and properties.
#
# This provides mechanical style enforcement at save time, before any
# linter or formatter runs. Editors that support EditorConfig apply
# these rules automatically.

root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[*.js]
indent_size = 2
# quote_type is not part of the core EditorConfig spec.
# Some editors (e.g. VS Code with extensions) support it; others ignore it.
quote_type = single

[*.json]
indent_size = 2

[*.{html,css}]
indent_size = 2

<!-- FILE: .github/workflows/check.yml -->

name: Check

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm run check

<!-- FILE: .gitignore -->

# .gitignore — copy this file to your project root and customise.
# These are common defaults for JS/npm projects. Adjust as needed.

# Dependencies
node_modules/

# Build output (customise to match your build output directory)
dist/

# OS files
.DS_Store
Thumbs.db

# Environment and secrets
.env
.env.local

# Logs
*.log
npm-debug.log*

# Editor state
*.swp
*.swo
*~

<!-- FILE: .markdownlint.json -->

{
  "$comment": "Markdown lint baseline for pm-skills projects. This is a scaffold file: copied into your project root once, then yours to own, tune, or delete (it is never force-upgraded). Philosophy — be strict about what breaks rendering or hides mistakes, relaxed about purely stylistic rules. 'default': true keeps every breakage- and structure-catching rule on (reversed links, missing code-fence languages, empty links, bad heading increments, hard tabs, and so on). MD013 (line length) is OFF: prose wrapping, tables, links, and fenced code routinely exceed any fixed width, and the rule is the single largest source of low-value noise. MD024 uses siblings_only so changelog-style docs can repeat headings like '### Added' under each version. Common further relaxations if your project needs them: MD033 (inline HTML, e.g. <details> or badges) and MD041 (first line must be a top-level heading, e.g. when files start with frontmatter). Add a new rule only when it catches a real defect — a noisy rule that gets inline-disabled erodes trust in the whole gate.",
  "default": true,
  "MD013": false,
  "MD024": {
    "siblings_only": true
  }
}

<!-- FILE: check-links.mjs -->

#!/usr/bin/env node
// @ts-check

/**
 * check-links.mjs — internal Markdown link integrity check.
 *
 * A pm-skills scaffold file: copied into your project root once, then
 * yours to own, extend, or delete. Requires Node (>= 18) only — no npm
 * install and no dependencies. If your project is not a Node project,
 * either run this via `npx`/CI or delete it and link-check another way;
 * the point is that *some* gate proves your docs' internal links resolve.
 *
 * Why this exists: in a docs- and memory-heavy project the main source of
 * rot is broken internal cross-references (a file renamed, a path moved),
 * not dead external URLs. This proves every *local* Markdown link target
 * resolves to a real file on disk, with zero dependencies and no
 * full-tree walk (which stalls on cloud-synced / on-demand filesystems).
 *
 * Scope and deliberate non-goals:
 * - Checks inline links only: `[text](target)`.
 * - External targets (http/https/mailto/tel and protocol-relative `//`)
 *   are skipped: network checks are flaky and not this gate's job.
 * - URL fragments (`#anchor`) are stripped before the existence check; the
 *   file must exist, but heading-anchor resolution is intentionally not
 *   verified (slug rules cause false positives that erode trust).
 *
 * Inputs: the set of tracked `*.md` files (via `git ls-files`) plus new
 * not-yet-committed ones, so gitignored paths (scratch, `node_modules/`)
 * are excluded automatically.
 *
 * Exit code: 0 when every local link resolves; 1 when any link is broken
 * (so it can gate CI). Prints a markdownlint-style summary.
 */

import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

/** Matches inline Markdown links: the captured group 1 is the raw target. */
const LINK_RE = /\[[^\]]*\]\(([^)]+)\)/g;

/** Targets with these prefixes are external/non-file and skipped. */
const EXTERNAL_PREFIXES = ['http://', 'https://', 'mailto:', 'tel:', '//'];

/**
 * List the Markdown files to check, relative to the repo root: everything
 * Git tracks, plus new files Git does not ignore (so a not-yet-committed
 * doc is still checked), and never anything in `.gitignore` (scratch,
 * `node_modules/`). Using Git avoids a recursive filesystem walk, which
 * stalls on cloud-synced / on-demand checkouts.
 * @returns {string[]} repo-relative paths to each checkable `*.md` file
 */
function markdownFiles() {
  const tracked = execSync('git ls-files "*.md"', { encoding: 'utf8' });
  const untracked = execSync(
    'git ls-files --others --exclude-standard "*.md"',
    { encoding: 'utf8' },
  );
  const all = `${tracked}\n${untracked}`
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  return [...new Set(all)];
}

/**
 * Normalise a raw link target into a checkable filesystem path, or null
 * when the target is external, an in-page anchor, or empty.
 * Strips an optional `"title"` suffix, surrounding `<>`, and any
 * `#fragment` / `?query`.
 * @param {string} rawTarget the text captured between `(` and `)`
 * @returns {string|null} the path portion to check, or null to skip
 */
function toCheckablePath(rawTarget) {
  // Drop an optional link title: `(path "Title")` -> `path`.
  let target = rawTarget.trim().split(/\s+/)[0];
  // Drop angle brackets: `(<path>)` -> `path`.
  target = target.replace(/^<|>$/g, '');
  if (!target) return null;
  if (target.startsWith('#')) return null; // same-page anchor
  if (EXTERNAL_PREFIXES.some((p) => target.startsWith(p))) return null;
  // Strip fragment and query so `file.md#x` / `file.md?y` check the file.
  target = target.split('#')[0].split('?')[0];
  if (!target) return null;
  return target;
}

/**
 * Find every broken local link in a single file.
 * @param {string} file repo-relative path to the Markdown file
 * @returns {{file: string, line: number, target: string}[]} broken links
 */
function brokenLinksIn(file) {
  const content = readFileSync(file, 'utf8');
  const baseDir = dirname(file);
  /** @type {{file: string, line: number, target: string}[]} */
  const broken = [];
  for (const match of content.matchAll(LINK_RE)) {
    const target = toCheckablePath(match[1]);
    if (target === null) continue;
    const resolved = resolve(baseDir, target);
    if (existsSync(resolved)) continue;
    const line = content.slice(0, match.index).split('\n').length;
    broken.push({ file, line, target });
  }
  return broken;
}

/** Run the check over every checkable Markdown file and report. */
function main() {
  const files = markdownFiles();
  console.log(`check-links: ${files.length} file(s)`);
  /** @type {{file: string, line: number, target: string}[]} */
  const broken = [];
  for (const file of files) broken.push(...brokenLinksIn(file));

  for (const b of broken) {
    console.error(`${b.file}:${b.line} broken link -> ${b.target}`);
  }
  console.log(`Summary: ${broken.length} broken link(s)`);
  process.exit(broken.length === 0 ? 0 : 1);
}

main();

<!-- FILE: package.json -->

{
  "name": "laurillard-video-functions-learner-journey",
  "version": "0.1.0",
  "private": true,
  "description": "Self-contained HTML/SVG diagram connecting Laurillard learning types, teaching functions, and learner-journey stages.",
  "type": "module",
  "scripts": {
    "check": "npm run check:html && npm run check:memory && npm run check:links",
    "check:html": "node scripts/check-html.mjs",
    "check:memory": "node scripts/check-project-memory.mjs",
    "check:links": "node check-links.mjs"
  },
  "engines": {
    "node": ">=18"
  }
}

<!-- FILE: scripts/check-html.mjs -->

#!/usr/bin/env node
// @ts-check

import { readFileSync } from 'node:fs';

const HTML_FILE = 'laurillard_video_functions_learning_journey.html';

const html = readFileSync(HTML_FILE, 'utf8');
const failures = [];

function fail(message) {
  failures.push(message);
}

function count(pattern) {
  return [...html.matchAll(pattern)].length;
}

function expectEqual(name, actual, expected) {
  if (actual !== expected) fail(`${name}: expected ${expected}, got ${actual}`);
}

const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
let script = '';
if (!scriptMatch) {
  fail('inline script missing');
} else {
  script = scriptMatch[1];
  try {
    new Function(script);
  } catch (error) {
    fail(`inline script syntax error: ${error instanceof Error ? error.message : String(error)}`);
  }
}

expectEqual('static SVG node rectangles', count(/<rect\b[^>]*class="node"/g), 0);
expectEqual('static SVG node text labels', count(/<text\b[^>]*class="nodeText"/g), 0);
expectEqual('static SVG link paths', count(/<path\b[^>]*class="link" data-from=/g), 0);
expectEqual('SVG marker arrows', count(/marker-end=/g), 0);
expectEqual('SVG marker definitions', count(/<marker\b/g), 0);
expectEqual('legacy order button class references', count(/orderButton/g), 0);
expectEqual('legacy order controls references', count(/orderControls/g), 0);
expectEqual('legacy button group references', count(/buttonGroup/g), 0);

const dataModel = extractDataModel(script);
if (dataModel) {
  expectEqual('Laurillard category nodes', dataModel.categories.laurillard.length, 6);
  expectEqual('Teaching function category nodes', dataModel.categories.teaching_functions.length, 9);
  expectEqual('Learner journey category nodes', dataModel.categories.learner_journey.length, 6);
  expectEqual('relationships', dataModel.relationships.length, 68);

  const strengths = dataModel.relationships.reduce((acc, relationship) => {
    acc[relationship.strength] = (acc[relationship.strength] ?? 0) + 1;
    return acc;
  }, {});
  expectEqual('strong relationships', strengths.strong ?? 0, 34);
  expectEqual('moderate relationships', strengths.moderate ?? 0, 21);
  expectEqual('supporting relationships', strengths.supporting ?? 0, 13);
}

const dataNodeTags = html.match(/<(?:rect|text)\b[^>]*data-node=[^>]*>/g) ?? [];
for (const tag of dataNodeTags) {
  const occurrences = countIn(tag, /data-node=/g);
  if (occurrences > 1) fail(`duplicate data-node attributes in tag: ${tag.slice(0, 120)}`);
}

const requiredSnippets = [
  'const dataModel = {',
  'normalizeModel(dataModel, categoryMeta, \'teaching_functions\')',
  '.columnHeading { cursor: grab; outline: none; }',
  'class: \'columnHeading\'',
  'class: \'columnBand\'',
  'class: \'headingBadge\'',
  'function renderGrip(x, y)',
  'function renderStrengthLegend()',
  'svg.addEventListener(\'pointerdown\'',
  'svg.addEventListener(\'pointermove\'',
  'svg.addEventListener(\'pointerup\'',
  'svg.addEventListener(\'keydown\'',
  'let arrowHeads = new Map();',
  'element(\'polygon\'',
  'arrowShaftOverlap',
  'function shouldRenderLink(link)',
  'Math.abs(toIndex - fromIndex) === 1',
  'const visualFromId = fromIndex < toIndex ? link.from : link.to',
  'const visualToId = fromIndex < toIndex ? link.to : link.from',
  '\'data-source\': link.from',
  '\'data-target\': link.to',
  'function moveColumn(columnId, toIndex)',
  'function nearestColumnIndex(x)',
  'data-strength',
  'arrowHeads.get(link)?.classList.add(\'is-connected\')',
  'focusColumnIndex === 0',
  'focusColumnIndex === 2',
];

for (const snippet of requiredSnippets) {
  if (!html.includes(snippet)) fail(`missing expected interaction snippet: ${snippet}`);
}

const externalRuntimePatterns = [
  /<script\b[^>]*\bsrc=/i,
  /<link\b[^>]*\brel=["']stylesheet["'][^>]*\bhref=/i,
  /<img\b[^>]*\bsrc=["']https?:\/\//i,
  /url\(["']?https?:\/\//i,
];

for (const pattern of externalRuntimePatterns) {
  if (pattern.test(html)) fail(`external runtime dependency matched: ${pattern}`);
}

if (failures.length > 0) {
  console.error('check-html failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('check-html: ok');

function countIn(text, pattern) {
  return [...text.matchAll(pattern)].length;
}

function extractDataModel(script) {
  const startMarker = 'const dataModel = ';
  const endMarker = ';\n\n  const categoryMeta';
  const start = script.indexOf(startMarker);
  const end = script.indexOf(endMarker, start);
  if (start === -1 || end === -1) {
    fail('dataModel block missing');
    return null;
  }

  const literal = script.slice(start + startMarker.length, end);
  try {
    return Function(`'use strict'; return (${literal});`)();
  } catch (error) {
    fail(`dataModel parse error: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

<!-- FILE: scripts/check-project-memory.mjs -->

#!/usr/bin/env node
// @ts-check

import { readFileSync } from 'node:fs';

const requiredFiles = [
  'README.md',
  'AGENTS.md',
  'UI-STANDARDS.md',
  'DEV-INFRASTRUCTURE.md',
  'VERSION',
  'pm_skills/project/brief.md',
  'pm_skills/project/architecture.md',
  'pm_skills/project/conventions.md',
  'pm_skills/project/backlog.md',
  'pm_skills/project/decision-log.md',
  'pm_skills/project/trajectory.md',
  'pm_skills/project/wish-list.md',
  'pm_skills/project/file-map.md',
];

const placeholderPatterns = [
  /<!--\s*CUSTOMISE/i,
  /\[Project Name\]/,
  /\[short product description\]/,
  /Task\s+[—-]\s+description/,
  /One paragraph\. What is this thing\?/,
  /Generated during project initialization/,
];

const failures = [];

for (const file of requiredFiles) {
  let content = '';
  try {
    content = readFileSync(file, 'utf8');
  } catch (error) {
    failures.push(`${file}: missing`);
    continue;
  }

  if (content.trim().length === 0) failures.push(`${file}: empty`);
  for (const pattern of placeholderPatterns) {
    if (pattern.test(content)) failures.push(`${file}: template placeholder matched ${pattern}`);
  }
}

if (failures.length > 0) {
  console.error('check-project-memory failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('check-project-memory: ok');

