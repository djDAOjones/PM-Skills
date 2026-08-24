#!/usr/bin/env node
// @ts-check

/**
 * check-clone.mjs — run the full quality gate the way CI runs it:
 * against a fresh clone of HEAD, in a temporary directory.
 *
 * Why this exists (GATE-PARITY, 2026-08-24): `npm run check` is
 * documented as CI-mirrored, and twice it was not. A working checkout
 * carries files a fresh clone never has — gitignored generated output
 * (`node_modules/`, the janitor report) — so a gate that consults the
 * filesystem can pass here and fail there. `scripts/check-docs.mjs`
 * now resolves references against Git rather than the filesystem, which
 * closes that class at the source and always runs. This script is the
 * belt-and-braces complement: it proves the WHOLE gate — every linter,
 * not just the docs check — behaves identically on a pristine tree, so
 * a divergence class nobody has thought of yet still gets caught.
 *
 * Run it before pushing any change to the gate itself (a lint config,
 * a check script, .gitignore). Day-to-day work needs only
 * `npm run check`.
 *
 * Deliberately NOT part of `npm run check`: it costs a clone plus a
 * cold `npx` fetch of the lint tools, which is far too slow for the
 * per-task gate.
 *
 * Scope note: it clones HEAD, so UNCOMMITTED work is not tested — the
 * same as CI, which lints the pushed commit. A dirty tree is reported
 * rather than silently ignored.
 *
 * Exit code: whatever the gate returned inside the clone.
 */

import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/**
 * Capture the trimmed stdout of a Git command run in the repo root.
 * @param {string[]} args
 * @returns {string}
 */
function git(args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

function main() {
  const head = git(['rev-parse', '--short', 'HEAD']);
  const subject = git(['log', '-1', '--pretty=%s']);
  const dirty = git(['status', '--porcelain']);

  console.log(`check-clone: cloning HEAD ${head} — ${subject}`);
  if (dirty) {
    const n = dirty.split('\n').length;
    console.log(
      `check-clone: NOTE — ${n} uncommitted change(s) are NOT included;`,
    );
    console.log('             CI lints the pushed commit, and so does this.');
  }

  const dir = mkdtempSync(join(tmpdir(), 'pm-skills-gate-'));
  try {
    execFileSync('git', ['clone', '--quiet', '--no-hardlinks', '.', dir], {
      stdio: 'inherit',
    });
    const gate = spawnSync('npm', ['run', 'check'], {
      cwd: dir,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });
    const code = gate.status ?? 1;
    console.log(
      code === 0
        ? `check-clone: gate GREEN on a pristine clone of ${head}`
        : `check-clone: gate RED on a pristine clone of ${head} (exit ${code})`,
    );
    process.exit(code);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

main();
