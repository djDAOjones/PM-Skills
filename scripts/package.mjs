#!/usr/bin/env node
// @ts-check

/**
 * package.mjs — export the distributable framework, manifest-verified.
 *
 * The distribution boundary rule (CONTRIBUTING.md → "What this repo
 * ships vs. what it does not") says consuming projects receive
 * `pm_skills/` and nothing else. This script makes that boundary
 * mechanical: it copies exactly the git-tracked files under
 * `pm_skills/` into a target directory, after verifying the tree
 * against `pm_skills/MANIFEST.md` — so the repo's own memory (root
 * AGENTS.md, `self/`), tooling (`scripts/`, lint config, CI), and
 * anything untracked can never ride along.
 *
 * Verification (both directions, before any copy):
 * - Every tracked file under `pm_skills/` must be covered by a
 *   manifest path row — a new shipped file without a manifest row
 *   fails the run (add the row first).
 * - Every literal (non-glob) manifest row must point at a tracked
 *   file — a dangling row fails the run. Glob rows (`…/*`) may match
 *   zero files: `pm_skills/project/tickets/*` and
 *   `pm_skills/project/archive/*` exist only in consuming projects.
 *
 * Usage:
 *   node scripts/package.mjs <target-dir>   # verify, then export
 *   node scripts/package.mjs --check        # verify only, copy nothing
 *   npm run package -- <target-dir>         # same, via npm
 *
 * The export refuses to overwrite: if `<target-dir>/pm_skills`
 * already exists the run fails — an existing deployment is upgraded
 * with `pm_skills/prompts/upgrade.md`, never clobbered by a fresh
 * copy.
 *
 * Exit code: 0 on success; 1 on any verification or copy failure.
 */

import { execSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';

/** The one distributed tree. Everything else in the repo stays home. */
const DIST_ROOT = 'pm_skills';

/** Manifest whose path rows define (and verify) the shipped set. */
const MANIFEST = 'pm_skills/MANIFEST.md';

/**
 * List the tracked files under the distributed tree. Tracked only —
 * untracked scratch must never ship, so there is no --others pass
 * here (unlike gen-file-map, which maps work in progress).
 * @returns {string[]} repo-relative paths, sorted
 */
function trackedDistFiles() {
  const out = execSync(`git ls-files ${DIST_ROOT}`, { encoding: 'utf8' });
  return out
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .sort();
}

/**
 * Parse the `## Paths` table of the manifest into path patterns.
 * Rows look like `| \`pm_skills/prompts/*\` | \`framework\` |`.
 * @param {string} manifestText raw MANIFEST.md contents
 * @returns {string[]} path patterns (literal paths or `dir/*` globs)
 */
function manifestPatterns(manifestText) {
  const patterns = [];
  for (const line of manifestText.split('\n')) {
    const m = line.match(/^\|\s*`([^`]+)`\s*\|\s*`[a-z-]+`\s*\|/);
    if (m) patterns.push(m[1]);
  }
  if (patterns.length === 0) {
    throw new Error(`no path rows parsed from ${MANIFEST}`);
  }
  return patterns;
}

/**
 * Test a tracked path against one manifest pattern. A trailing `/*`
 * covers everything under that directory; anything else is literal.
 * @param {string} file repo-relative tracked path
 * @param {string} pattern manifest path pattern
 * @returns {boolean}
 */
function covered(file, pattern) {
  if (pattern.endsWith('/*')) {
    return file.startsWith(pattern.slice(0, -1));
  }
  return file === pattern;
}

/**
 * Verify tree ↔ manifest agreement in both directions.
 * @param {string[]} files tracked files under the distributed tree
 * @param {string[]} patterns manifest path patterns
 * @returns {string[]} human-readable failures; empty means verified
 */
function verify(files, patterns) {
  const failures = [];
  const distPatterns = patterns.filter((p) => p.startsWith(`${DIST_ROOT}/`));
  for (const file of files) {
    if (!distPatterns.some((p) => covered(file, p))) {
      failures.push(`tracked but not in the manifest: ${file}`);
    }
  }
  for (const pattern of distPatterns) {
    if (pattern.endsWith('/*')) continue; // globs may be empty here
    if (!files.includes(pattern)) {
      failures.push(`manifest row points at nothing: ${pattern}`);
    }
  }
  return failures;
}

/**
 * Copy the verified file set into the target directory, preserving
 * repo-relative paths (so the target gains a `pm_skills/` tree).
 * @param {string[]} files repo-relative paths to copy
 * @param {string} targetDir destination project root
 * @returns {number} files copied
 */
function exportTo(files, targetDir) {
  const distTarget = join(targetDir, DIST_ROOT);
  if (existsSync(distTarget)) {
    throw new Error(
      `${distTarget} already exists — upgrade an existing deployment ` +
        'with pm_skills/prompts/upgrade.md instead of re-exporting',
    );
  }
  for (const file of files) {
    const dest = join(targetDir, file);
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(file, dest);
  }
  return files.length;
}

function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error(
      'usage: node scripts/package.mjs <target-dir> | --check',
    );
    process.exit(1);
  }

  const files = trackedDistFiles();
  const patterns = manifestPatterns(readFileSync(MANIFEST, 'utf8'));
  const failures = verify(files, patterns);
  if (failures.length > 0) {
    for (const f of failures) console.error(`FAIL ${f}`);
    console.error(
      `\n${failures.length} manifest/tree mismatch(es) — fix ` +
        `${MANIFEST} or the tree before packaging.`,
    );
    process.exit(1);
  }
  console.log(`verified: ${files.length} files match ${MANIFEST}`);

  if (arg === '--check') return;

  const copied = exportTo(files, arg);
  console.log(`exported: ${copied} files -> ${join(arg, DIST_ROOT)}`);
  console.log(
    'next: run pm_skills/init.md (Step 0 copies the rulebook ' +
      'templates to the project root)',
  );
}

try {
  main();
} catch (err) {
  console.error(`error: ${err instanceof Error ? err.message : err}`);
  process.exit(1);
}
