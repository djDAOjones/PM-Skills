#!/usr/bin/env node
// @ts-check

/**
 * assert-scenario.mjs — property assertions for one evaluation
 * scenario against a fixture. Runs the shared oracle
 * (check-memory.mjs) plus the scenario spec's greps.
 *
 * Usage: node scripts/eval/assert-scenario.mjs <fixture-root> <spec.json>
 * Spec: { "projectDir": "pm_skills/project",
 *         "greps": [{ "file": "...", "pattern": "...",
 *                     "want": ">=1"|"0", "desc": "..." }] }
 * Exit 0 iff oracle structural-clean AND every grep matches.
 */

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const [root, specPath] = process.argv.slice(2);
if (!root || !specPath) {
  console.error('usage: assert-scenario.mjs <fixture-root> <spec.json>');
  process.exit(2);
}
const spec = JSON.parse(readFileSync(specPath, 'utf8'));
const here = dirname(fileURLToPath(import.meta.url));
let failed = 0;

try {
  execFileSync(process.execPath, [
    join(here, '..', 'check-memory.mjs'),
    '--repo-root', resolve(root),
    '--project-dir', spec.projectDir ?? 'pm_skills/project',
  ], { stdio: ['ignore', 'ignore', 'ignore'] });
  console.log('PASS oracle: 0 structural failures');
} catch {
  console.log('FAIL oracle: structural failures (run check-memory for detail)');
  failed++;
}

for (const g of spec.greps ?? []) {
  const content = readFileSync(join(resolve(root), g.file), 'utf8');
  const n = (content.match(new RegExp(g.pattern, 'gm')) ?? []).length;
  const ok = g.want === '0' ? n === 0 : n >= 1;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${g.desc}: ${n} match(es), want ${g.want}`);
  if (!ok) failed++;
}

console.log(`Scenario: ${failed ? 'RED' : 'GREEN'} (${failed} failing assertion(s))`);
process.exit(failed ? 1 : 0);
