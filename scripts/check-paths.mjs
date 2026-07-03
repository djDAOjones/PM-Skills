#!/usr/bin/env node
// @ts-check

/**
 * check-paths.mjs — backticked inline path-reference integrity check.
 *
 * Complements check-links.mjs: that script checks Markdown link targets
 * `[text](target)`; this one checks repo paths written as inline code,
 * e.g. `pm_skills/prompts/release.md`, which Markdown linkers ignore.
 *
 * Scope (deliberately conservative, to avoid false positives):
 * - Only inline code spans (single backticks) are scanned.
 * - A candidate is checked ONLY if it contains a `/` (so it is an
 *   unambiguous repo-root-relative path) and matches a strict path
 *   charset. Bare filenames (`AGENTS.md`) are out of scope: their
 *   location is ambiguous and not resolvable from the text alone.
 * - Commands (`npm run lint`), globs (`**\/*.md`), URLs, and anything
 *   with placeholders (`<x>`, `X.Y.Z`, `NNNN`) are skipped.
 * - A trailing `#fragment`, `:line`, and surrounding punctuation are
 *   stripped before the existence check.
 * - Template/example paths that legitimately do not exist in this repo
 *   (the framework documents a memory layout that ships blank) are
 *   listed in IGNORE and skipped.
 *
 * Inputs: tracked + non-ignored `*.md` files via `git ls-files`, so
 * gitignored scratch and node_modules are excluded automatically.
 *
 * Exit code: 0 when every checked path resolves; 1 otherwise.
 */

import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** Inline code spans: capture group 1 is the span's content. */
const CODE_SPAN_RE = /`([^`]+)`/g;

/** Known file extensions that mark a token as a file path. */
const FILE_EXT_RE = /\.(md|mjs|js|json|jsonc|ya?ml)$/;

/** Strict path charset: letters, digits, dot, slash, hyphen, underscore. */
const SAFE_PATH_RE = /^[\w./-]+$/;

/**
 * Path patterns that are documented templates/examples, not real files
 * in this repo: on-demand memory stores that ship blank — archives
 * (created when a project prunes) and per-item ticket detail files
 * (created on demand). Matched against an `archive` or `tickets` segment
 * anywhere.
 */
const IGNORE = [/(^|\/)archive(\/|$)/, /(^|\/)tickets(\/|$)/];

/**
 * Bases a repo path may be written relative to. Framework docs reference
 * paths either from the repo root (`pm_skills/prompts/x.md`) or from
 * inside `pm_skills/` (`prompts/x.md`); a path is valid under either.
 */
const BASES = [process.cwd(), resolve('pm_skills')];

/**
 * @returns {string[]} repo-relative paths to each checkable `*.md` file
 */
function markdownFiles() {
  const tracked = execSync('git ls-files "*.md"', { encoding: 'utf8' });
  const untracked = execSync(
    'git ls-files --others --exclude-standard "*.md"',
    { encoding: 'utf8' },
  );
  return [
    ...new Set(
      `${tracked}\n${untracked}`.split('\n').map((s) => s.trim()).filter(Boolean),
    ),
  ];
}

/**
 * Decide whether an inline-code token is a checkable repo path, and if
 * so return the cleaned filesystem path; otherwise null.
 * @param {string} raw the content of one inline code span
 * @returns {string|null}
 */
function toCheckablePath(raw) {
  let t = raw.trim();
  if (!t.includes('/')) return null; // bare name: ambiguous, skip
  if (/\s/.test(t)) return null; // command line, not a path
  if (t.includes('://') || t.startsWith('http')) return null; // URL
  if (/[*<>?]/.test(t)) return null; // glob or placeholder
  if (t.includes('..')) return null; // out-of-tree relative example
  if (/NNNN|X\.Y\.Z/.test(t)) return null; // doc placeholder
  if (/(^|\/)[A-Z]\.\w+$/.test(t)) return null; // single-letter placeholder
  // Strip a trailing fragment / line ref, then surrounding punctuation.
  t = t.split('#')[0].replace(/:\d+(-\d+)?$/, '');
  t = t.replace(/[.,;:)]+$/, '').replace(/^[("']+/, '');
  if (!t || !SAFE_PATH_RE.test(t)) return null;
  // Must look like a file path or a directory reference.
  const looksFile = FILE_EXT_RE.test(t);
  const looksDir = t.endsWith('/');
  if (!looksFile && !looksDir) return null;
  if (IGNORE.some((re) => re.test(t))) return null;
  return t.replace(/\/$/, '');
}

/**
 * @param {string} file repo-relative path to a Markdown file
 * @returns {{file: string, line: number, target: string}[]}
 */
function brokenPathsIn(file) {
  const content = readFileSync(file, 'utf8');
  /** @type {{file: string, line: number, target: string}[]} */
  const broken = [];
  for (const m of content.matchAll(CODE_SPAN_RE)) {
    const target = toCheckablePath(m[1]);
    if (target === null) continue;
    if (BASES.some((base) => existsSync(resolve(base, target)))) continue;
    const line = content.slice(0, m.index).split('\n').length;
    broken.push({ file, line, target });
  }
  return broken;
}

function main() {
  const files = markdownFiles();
  console.log(`check-paths: ${files.length} file(s)`);
  /** @type {{file: string, line: number, target: string}[]} */
  const broken = [];
  for (const file of files) broken.push(...brokenPathsIn(file));
  for (const b of broken) {
    console.error(`${b.file}:${b.line} missing path -> ${b.target}`);
  }
  console.log(`Summary: ${broken.length} missing path(s)`);
  process.exit(broken.length === 0 ? 0 : 1);
}

main();
