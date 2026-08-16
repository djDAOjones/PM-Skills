#!/usr/bin/env node
// @ts-check

/**
 * janitor-read.mjs — the read-only maintenance janitor (JANITOR-READ).
 *
 * Runs the memory validator plus the cheap session-start environment
 * line and writes a dated report to self/project/reports/latest.md.
 * A fresh report (per the staleness contract in session-start.md)
 * lets session start read instead of compute; a stale or absent one
 * falls back to computing.
 *
 * READ-ONLY FOREVER: this janitor never writes project memory —
 * writing verbs are JANITOR-WRITE, separately gated per verb. The
 * report is generated output: never hand-edited, never canonical.
 *
 * Usage: node scripts/janitor-read.mjs [--project-dir self/project]
 *                                      [--repo-root .]
 */

import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const argOf = (/** @type {string} */ n, /** @type {string} */ d) => {
  const i = args.indexOf(n);
  return i >= 0 && args[i + 1] ? args[i + 1] : d;
};
const repoRoot = resolve(argOf('--repo-root', '.'));
const projectDir = argOf('--project-dir', 'self/project');

const sh = (/** @type {string} */ c) => {
  try {
    return execSync(c, { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch (e) {
    return /** @type {any} */ (e).stdout?.trim() ?? '(command failed)';
  }
};

const sha = sh('git rev-parse HEAD') || '(no git)';
const now = new Date().toISOString();
const cloud = sh("pwd -P | grep -Ei 'Library/CloudStorage|OneDrive|Dropbox|Google Drive|iCloud' || true");
let validator = '';
try {
  validator = execSync(
    `${JSON.stringify(process.execPath)} scripts/check-memory.mjs --repo-root ${JSON.stringify(repoRoot)} --project-dir ${JSON.stringify(projectDir)}`,
    { cwd: repoRoot, encoding: 'utf8' },
  );
} catch (e) {
  validator = /** @type {any} */ (e).stdout ?? 'validator failed to run';
}

const report = `# Janitor report (generated — never edit)

Generated: ${now}
Start SHA: ${sha}
Project dir: ${projectDir}
Freshness contract: sessions read this only if it is under ~24 h
old AND the Start SHA is in the current branch history; otherwise
compute per session-start.md.

## Environment

Cloud-sync path: ${cloud ? `MATCH — ${cloud} (warn-only at session start)` : 'clean'}

## Validator (check-memory)

${validator.trim()}
`;

const outDir = join(repoRoot, projectDir, 'reports');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'latest.md'), report);
console.log(`janitor-read: wrote ${join(projectDir, 'reports', 'latest.md')} @ ${sha.slice(0, 7)}`);
