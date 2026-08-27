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
 * resolves, with zero dependencies and no full-tree walk (which stalls on
 * cloud-synced / on-demand filesystems).
 *
 * Resolution model: link targets resolve against the set of paths GIT
 * knows about, never against the local filesystem. CI lints a fresh
 * clone, which holds exactly those paths, while a working checkout also
 * carries gitignored generated files — so an `existsSync` check passes
 * locally on links CI cannot resolve, and you find out from a red badge.
 * Set membership makes local and CI agree by construction, and being
 * exact-case it matches Linux rather than a case-insensitive macOS
 * volume.
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
import { readFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';

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
 * Every repo-relative path Git knows about: tracked files, new files Git
 * does not ignore, and every ancestor directory of both. This is
 * precisely what a fresh clone contains, so it is what CI can resolve.
 * Built once with two Git calls — no filesystem walk.
 * @returns {Set<string>} POSIX-separated, no trailing slash
 */
function gitPaths() {
  const listed = [
    execSync('git ls-files', { encoding: 'utf8' }),
    execSync('git ls-files --others --exclude-standard', { encoding: 'utf8' }),
  ].join('\n');
  /** @type {Set<string>} */
  const paths = new Set();
  for (const line of listed.split('\n')) {
    const file = line.trim();
    if (!file) continue;
    paths.add(file);
    for (let dir = dirname(file); dir && dir !== '.'; dir = dirname(dir)) {
      paths.add(dir);
    }
  }
  return paths;
}

/** The repository's resolvable paths (see gitPaths). */
const REPO_PATHS = gitPaths();

/**
 * Does a link target resolve to a path the repository actually holds?
 * Deliberately NOT an `existsSync` call — see "Resolution model" in the
 * header. Out-of-tree targets (`../` past the root) never resolve.
 * @param {string} baseDir directory the target is written relative to
 * @param {string} target cleaned target path
 * @returns {boolean}
 */
function resolvesInRepo(baseDir, target) {
  const rel = relative(process.cwd(), resolve(baseDir, target))
    .split('\\')
    .join('/')
    .replace(/\/$/, '');
  if (!rel || rel === '..' || rel.startsWith('../')) return false;
  return REPO_PATHS.has(rel);
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
    if (resolvesInRepo(baseDir, target)) continue;
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
