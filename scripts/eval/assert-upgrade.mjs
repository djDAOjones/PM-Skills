#!/usr/bin/env node
// @ts-check

/**
 * assert-upgrade.mjs — byte-level assertions for the upgrade
 * scenario: after running prompts/upgrade.md in a fixture,
 *
 *   1. project memory is byte-identical to the pre-upgrade baseline
 *      (git diff against <baseline-ref> for pm_skills/project/);
 *   2. root-template customisations survive (marker line present);
 *   3. pm_skills/VERSION equals the expected version (argv or the
 *      source repo's VERSION);
 *   4. every path changed since baseline is on the allowed list
 *      passed via --allow (comma-separated prefixes), so an upgrade
 *      cannot smuggle extra changes.
 *
 * Usage: node scripts/eval/assert-upgrade.mjs <fixture-root>
 *          <baseline-ref> --version X.Y.Z
 *          --custom "<literal line>" --allow p1,p2,...
 */

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const [root, ref] = args;
const opt = (/** @type {string} */ n, /** @type {string} */ d) => {
  const i = args.indexOf(n);
  return i >= 0 && args[i + 1] ? args[i + 1] : d;
};
if (!root || !ref) {
  console.error('usage: assert-upgrade.mjs <fixture-root> <baseline-ref> [--version X] [--custom line] [--allow p1,p2]');
  process.exit(2);
}
const R = resolve(root);
const git = (/** @type {string[]} */ a) =>
  execFileSync('git', ['-C', R, ...a], { encoding: 'utf8' });
let failed = 0;
const check = (/** @type {boolean} */ ok, /** @type {string} */ msg) => {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${msg}`);
  if (!ok) failed++;
};

// upgrade.md Step 10 mandates prepending one record to the project
// decision log, so that file is asserted append-only rather than
// byte-identical; every other memory file must not change at all.
const LOG = 'pm_skills/project/decision-log.md';
const memChanged = git(['diff', '--name-only', ref, '--', 'pm_skills/project/'])
  .trim().split('\n').filter(Boolean);
const memRogue = memChanged.filter((p) => p !== LOG);
check(memRogue.length === 0, `memory byte-identical to ${ref} (Step 10 log exempt)${memRogue.length ? ` (changed: ${memRogue.join(', ')})` : ''}`);
if (memChanged.includes(LOG)) {
  const oldLog = git(['show', `${ref}:${LOG}`]);
  const i = oldLog.indexOf('\n## ');
  const oldBody = i >= 0 ? oldLog.slice(i) : oldLog;
  const newLog = readFileSync(join(R, LOG), 'utf8');
  check(newLog.includes(oldBody), 'decision-log change is append-only (baseline entries intact)');
}

const custom = opt('--custom', '');
if (custom) {
  const agents = readFileSync(join(R, 'AGENTS.md'), 'utf8');
  check(agents.includes(custom), 'root-template customisation preserved');
}

const want = opt('--version', '');
if (want) {
  const got = readFileSync(join(R, 'pm_skills', 'VERSION'), 'utf8').trim();
  check(got === want, `VERSION stamped ${got} (want ${want})`);
}

const allow = opt('--allow', '').split(',').filter(Boolean);
if (allow.length) {
  const changed = git(['diff', '--name-only', ref]).trim().split('\n').filter(Boolean);
  const rogue = changed.filter((p) => !allow.some((a) => p.startsWith(a)));
  check(rogue.length === 0, `changed set within allowed list${rogue.length ? ` (rogue: ${rogue.join(', ')})` : ` (${changed.length} file(s))`}`);
}

console.log(`Upgrade scenario: ${failed ? 'RED' : 'GREEN'}`);
process.exit(failed ? 1 : 0);
