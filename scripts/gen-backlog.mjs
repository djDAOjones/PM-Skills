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
 * Usage: node scripts/gen-backlog.mjs [--check]
 */

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve('.');
const recDir = join(root, 'self', 'project', 'tickets');
const viewPath = join(root, 'self', 'project', 'backlog.md');
const check = process.argv.includes('--check');

/** @param {string} p */
function parseRecord(p) {
  const raw = readFileSync(p, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`no frontmatter: ${p}`);
  /** @type {Record<string,string>} */
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z-]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  return { fm, body: m[2].trim() };
}

const MILESTONES = /** @type {const} */ ([
  ['current', 'Current milestone'],
  ['next', 'Next milestone'],
  ['icebox', 'Icebox'],
]);

const files = readdirSync(recDir).filter((f) => f.endsWith('.md'));
const meta = files.includes('_meta.md')
  ? parseRecord(join(recDir, '_meta.md')).fm : {};
const items = files.filter((f) => !f.startsWith('_'))
  .map((f) => parseRecord(join(recDir, f)));

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
for (const [key, title] of MILESTONES) {
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
const next = re.test(existing)
  ? existing.replace(re, block)
  : `${existing.trim()}\n\n${block}\n`;

if (check) {
  if (existing !== next) { console.error('gen-backlog --check: view diverges from records — regenerate'); process.exit(1); }
  console.log('gen-backlog --check: view matches records');
} else {
  writeFileSync(viewPath, next);
  console.log(`gen-backlog: ${items.length} record(s) → self/project/backlog.md`);
}
