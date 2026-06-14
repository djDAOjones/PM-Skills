#!/usr/bin/env node
// @ts-check

/**
 * check-links.mjs — relative Markdown link integrity check for this repo.
 *
 * Why this exists: the framework's primary risk is broken internal
 * cross-references (a prompt renamed, a path moved) — not external URLs.
 * This script proves every *local* Markdown link target resolves to a
 * real file on disk, with zero dependencies and no full-tree walk (which
 * stalls on cloud-synced / on-demand filesystems).
 *
 * Scope and deliberate non-goals:
 * - Checks inline links only: `[text](target)`. Reference-style links are
 *   not used in this repo.
 * - External targets (http/https/mailto/tel and protocol-relative `//`)
 *   are skipped: network checks are flaky and not this gate's job.
 * - URL fragments (`#anchor`) are stripped before the existence check; the
 *   file must exist, but heading-anchor resolution is intentionally not
 *   verified (slug rules cause false positives that erode trust in CI).
 * - Inline-code path references (in backticks, not links) are out of
 *   scope; see CONTRIBUTING.md for the rationale and a possible future
 *   enhancement.
 *
 * Inputs: the set of tracked `*.md` files (via `git ls-files`), so
 * gitignored scratch (e.g. `user_crud/`) and `node_modules/` are excluded
 * automatically.
 *
 * Exit code: 0 when every local link resolves; 1 when any link is broken
 * (so it can gate CI). Prints a markdownlint-style summary.
 */

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFileSync } from 'node:fs';
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
  // Drop an optional link title: `(path "Title")` → `path`.
  let target = rawTarget.trim().split(/\s+/)[0];
  // Drop angle brackets: `(<path>)` → `path`.
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
