#!/usr/bin/env node
// @ts-check

/**
 * gen-backlog.mjs — backlog VIEW generator (BACKLOG-STATE phase 1,
 * source-repo fork of the lab RQ3 prototype).
 *
 * Records ARE the ticket files: self/project/tickets/<ID>.md with a
 * flat `key: value` frontmatter block (no nesting, no YAML library)
 * over the ticket body. `_meta.md` holds milestone intent lines.
 * The Active section of self/project/backlog.md is rendered between
 * generated markers in the standard ticket grammar ([detail] is
 * rendered as the one-hop link when the flag is present); content
 * outside the markers is preserved.
 *
 * Merge rule (RQ3 finding): on any view conflict, REGENERATE from
 * the merged records — never hand-merge the view.
 *
 * Dialect keys (optional, in `_meta.md` — RECORDS-DIST): `milestones:`
 * as ordered `key=Title` pairs (absent → the canonical three), and
 * `flags:` for the validator. A record naming an unconfigured
 * milestone is an error, never a silent drop. Kept in step with the
 * generic fork `pm_skills/scaffold/gen-backlog.mjs` (deliberate
 * forks, CONTRIBUTING.md).
 *
 * Scanned set: `<project>/tickets/*.md`, non-recursive, `_`-prefixed
 * files reserved for meta. This is deliberate, not an oversight — but
 * it means a record with any other extension, or in a subdirectory, is
 * invisible to BOTH this generator and `check-memory.mjs`, so it is
 * lost without a diagnostic. Keep records flat and `.md`.
 *
 * Usage: node scripts/gen-backlog.mjs [--project-dir self/project] [--check]
 */

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const argOf = (/** @type {string} */ name, /** @type {string} */ dflt) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : dflt;
};
const projectDir = resolve(argOf('--project-dir', 'self/project'));
const recDir = join(projectDir, 'tickets');
const viewPath = join(projectDir, 'backlog.md');
const check = args.includes('--check');

/** @param {string} p */
function parseRecord(p) {
  const raw = readFileSync(p, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`no frontmatter: ${p}`);
  /** @type {Record<string,string>} */
  const fm = {};
  /** Key whose value was last read, and may continue on the next line. */
  let open = null;
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z-]+):\s*(.*)$/);
    if (kv) { open = kv[1]; fm[open] = kv[2].trim(); continue; }
    // A hand-wrapped value continues as an indented line. Fold it back
    // instead of dropping it (SILENT-LOSS-SWEEP): this project hard-wraps
    // prose, so a long `summary:` is exactly what a maintainer will wrap,
    // and the old parser discarded everything after the first line with
    // no error while the generated view still read as well-formed.
    if (open && /^\s+\S/.test(line)) { fm[open] = `${fm[open]} ${line.trim()}`.trim(); continue; }
    open = null;
  }
  return { fm, body: m[2].trim() };
}

const DEFAULT_MILESTONES = [
  ['current', 'Current milestone'],
  ['next', 'Next milestone'],
  ['icebox', 'Icebox'],
];

const files = readdirSync(recDir).filter((f) => f.endsWith('.md'));
const meta = files.includes('_meta.md')
  ? parseRecord(join(recDir, '_meta.md')).fm : {};
const items = files.filter((f) => !f.startsWith('_'))
  .map((f) => parseRecord(join(recDir, f)));

const milestones = meta.milestones
  ? meta.milestones.split(',').map((pair) => {
    const m = pair.trim().match(/^([a-z][a-z0-9-]*)=(.+)$/);
    if (!m) {
      console.error(`gen-backlog: bad milestones pair '${pair.trim()}' in _meta.md — use key=Title`);
      process.exit(1);
    }
    return [m[1], m[2].trim()];
  })
  : DEFAULT_MILESTONES;

const known = new Set(milestones.map(([k]) => k));
let stray = false;
for (const { fm } of items) {
  if (!known.has(fm.milestone ?? '')) {
    console.error(`gen-backlog: record ${fm.id ?? '(no id)'} has milestone '${fm.milestone ?? ''}' — not one of: ${[...known].join(', ')}`);
    stray = true;
  }
}
if (stray) process.exit(1);

/** @param {{fm: Record<string,string>}} r */
function renderItem({ fm }) {
  const box = fm.status === 'in-progress' ? '~' : fm.status === 'cut' ? '-' : ' ';
  const flags = (fm.flags ?? '').split(',').map((s) => s.trim()).filter(Boolean)
    .map((f) => {
      if (f === 'detail') return `[detail](tickets/${fm.id}.md)`;
      if (f === 'blocked' && fm['blocked-on']) return `[blocked: ${fm['blocked-on']}]`;
      return `[${f}]`;
    }).join(' ');
  const date = fm.date ? ` (${fm.date})` : '';
  const grades = fm.grades ? ` · ${fm.grades}` : '';
  const head = `- [${box}] **${fm.id} ${fm.name}**${flags ? ` ${flags}` : ''}${date} —`;
  return wrap(`${head} ${fm.summary}${grades}`.trim());
}

/** Hard-wrap at ~72 with two-space continuations. @param {string} s */
function wrap(s) {
  const words = s.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > 72 && cur) { lines.push(cur); cur = '  ' + w; }
    else cur = cur ? `${cur} ${w}` : w;
  }
  if (cur) lines.push(cur);
  return lines.join('\n');
}

let out = '';
for (const [key, title] of milestones) {
  const intent = meta[`${key}-intent`];
  out += `### ${title}\n\n`;
  if (intent) out += `<!-- Intent: ${intent} -->\n\n`;
  const rows = items.filter((i) => i.fm.milestone === key)
    .sort((a, b) => Number(a.fm.order ?? 99) - Number(b.fm.order ?? 99));
  for (const r of rows) out += `${renderItem(r)}\n`;
  if (rows.length) out += '\n';
}

const START = '<!-- generated:records:start (edit tickets/, run scripts/gen-backlog.mjs) -->';
const END = '<!-- generated:records:end -->';
const esc = (/** @type {string} */ s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const existing = existsSync(viewPath) ? readFileSync(viewPath, 'utf8') : '';
const re = new RegExp(`${esc(START)}[\\s\\S]*?${esc(END)}`);
const block = `${START}\n\n${out.trim()}\n\n${END}`;

/**
 * First generation appends the block at the end of the file, inside
 * the `## Active` section the validator parses — creating the heading
 * when the file lacks one. If the backlog keeps other `## ` sections
 * after Active, move the block inside Active once; later runs rewrite
 * it in place. @param {string} content @param {string} blk
 */
function appendBlock(content, blk) {
  const trimmed = content.trim();
  if (/^## Active\s*$/m.test(trimmed)) return `${trimmed}\n\n${blk}\n`;
  const head = trimmed ? `${trimmed}\n\n` : '# Backlog\n\n';
  return `${head}## Active\n\n${blk}\n`;
}

const next = re.test(existing)
  ? existing.replace(re, block)
  : appendBlock(existing, block);

if (check) {
  if (existing !== next) { console.error('gen-backlog --check: view diverges from records — regenerate'); process.exit(1); }
  console.log('gen-backlog --check: view matches records');
} else {
  writeFileSync(viewPath, next);
  console.log(`gen-backlog: ${items.length} record(s) → ${viewPath}`);
}
