#!/usr/bin/env node
// @ts-check

/**
 * gen-roadmap.mjs — human-readable ROADMAP view (BACKLOG-TABLE,
 * source-only).
 *
 * A second renderer over the records `gen-backlog.mjs` already parses,
 * plus the shipped history. It exists because the backlog view is
 * written for an agent — grammar-true, wrapped at 72, one paragraph
 * per item — and a person scanning "what is open and what happened"
 * wants a table.
 *
 * Why a separate file and not a table inside `backlog.md`: the backlog
 * is a HOT SECTIONAL read (root AGENTS.md -> "Before every task"), so
 * a wide table there costs agent context every session for a purely
 * human benefit. This file is cold — nothing reads it automatically.
 *
 * Why tracked and lint-gated (unlike the gitignored janitor report):
 * its whole purpose is to be shareable, so it must survive a clone and
 * be visible on the forge. It stays gate-clean rather than
 * gate-exempt — the only lint-hostile element is `<details>` (MD033),
 * disabled inline for this one file, so no lint config changes.
 *
 * History comes from the trajectory's own `## ` phases (live) and from
 * `archive/INDEX.md` rows for phases already pruned. Phases are
 * DECLARED, not derived: they are the sequence unit `memory-policy.md`
 * -> "Retention shape" made load-bearing, and the INDEX row contract
 * (range, count, IDs, file) is exactly what lets an archived phase be
 * listed without opening a cold chunk.
 *
 * Generated: never hand-edit. On any conflict, regenerate from the
 * merged records — the same merge rule as the backlog view.
 *
 * Usage: node scripts/gen-roadmap.mjs [--project-dir self/project] [--check]
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
const archiveDir = join(projectDir, 'archive');
const outPath = join(projectDir, 'roadmap.md');
const check = args.includes('--check');

const MILESTONES = [
  ['current', 'Current'],
  ['next', 'Next'],
  ['icebox', 'Icebox'],
];

/**
 * Parse one flat-frontmatter record. Same dialect as gen-backlog.mjs:
 * `key: value` lines, no nesting, no YAML library.
 * @param {string} p path to the record
 * @returns {{fm: Record<string,string>, body: string}}
 */
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

/**
 * Make a string safe inside a Markdown table cell: pipes escaped,
 * newlines collapsed. @param {string} s
 */
const cell = (s) => (s ?? '').replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim();

/**
 * Trim to a word boundary so the Description column stays scannable.
 * @param {string} s @param {number} max
 */
function clip(s, max) {
  const t = cell(s);
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

/**
 * The Status column: lifecycle plus the reason it cannot be worked,
 * which is the one thing a reader of a backlog most often wants.
 * @param {Record<string,string>} fm
 */
function status(fm) {
  const flags = (fm.flags ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  if (flags.includes('blocked')) {
    return `Blocked — ${clip(fm['blocked-on'] ?? 'see ticket', 60)}`;
  }
  if (flags.includes('maintainer')) return 'Maintainer — held';
  if (fm.status === 'in-progress') return 'In progress';
  if (fm.status === 'cut') return 'Cut';
  return 'Todo';
}

/** Open records, grouped by milestone in record order. */
function outstanding() {
  const files = readdirSync(recDir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'));
  const items = files.map((f) => parseRecord(join(recDir, f)));
  let out = '## Outstanding\n\n';
  out += '| Ticket ID | Name | Milestone | Description | Status |\n';
  out += '| --- | --- | --- | --- | --- |\n';
  for (const [key, title] of MILESTONES) {
    const rows = items.filter((i) => i.fm.milestone === key)
      .sort((a, b) => Number(a.fm.order ?? 99) - Number(b.fm.order ?? 99));
    for (const [n, { fm }] of rows.entries()) {
      const id = (fm.flags ?? '').includes('detail')
        ? `[${fm.id}](tickets/${fm.id}.md)` : fm.id;
      const desc = clip(fm.summary, 150);
      out += `| **${id}** | ${cell(fm.name)} | ${title} #${n + 1}`
        + ` | ${desc.charAt(0).toUpperCase()}${desc.slice(1)}`
        + ` | ${status(fm)} |\n`;
    }
  }
  return `${out}\n`;
}

/**
 * Live phases from the trajectory, newest first, each collapsible.
 * A phase is any `## ` heading; its items are the top-level bullets.
 */
function livePhases() {
  const src = join(projectDir, 'trajectory.md');
  if (!existsSync(src)) return '';
  const lines = readFileSync(src, 'utf8').split('\n');
  /** @type {{title: string, items: string[]}[]} */
  const phases = [];
  for (const line of lines) {
    if (line.startsWith('## ')) phases.push({ title: line.slice(3).trim(), items: [] });
    else if (line.startsWith('- ') && phases.length) {
      phases[phases.length - 1].items.push(line.slice(2).trim());
    } else if (/^ {2}\S/.test(line) && phases.length) {
      const cur = phases[phases.length - 1].items;
      if (cur.length) cur[cur.length - 1] += ` ${line.trim()}`;
    }
  }
  let out = '';
  for (const p of phases) {
    if (!p.items.length) continue;
    out += `<details>\n<summary><strong>${cell(p.title)}</strong>`
      + ` — ${p.items.length} item(s)</summary>\n\n`;
    out += '| Item | Outcome |\n| --- | --- |\n';
    for (const it of p.items) {
      const m = it.match(/^([^\s—]+)\s*(?:—|-)?\s*(.*)$/);
      const id = m ? m[1] : it.slice(0, 24);
      const rest = m ? m[2] : '';
      out += `| \`${cell(id)}\` | ${clip(rest, 180)} |\n`;
    }
    out += '\n</details>\n\n';
  }
  return out;
}

/**
 * Archived phases, listed from `archive/INDEX.md` rows alone. The row
 * contract (range, count, IDs, file) exists so a chunk can be named
 * without opening it — this is that contract being used.
 */
function archivedPhases() {
  const idx = join(archiveDir, 'INDEX.md');
  if (!existsSync(idx)) return '';
  const text = readFileSync(idx, 'utf8');
  const section = text.split(/^## /m).find((s) => s.startsWith('Trajectory'));
  if (!section) return '';
  const rows = section.split(/\n(?=- )/).slice(1)
    .map((r) => r.replace(/\s+/g, ' ').trim()).filter(Boolean);
  if (!rows.length) return '';
  let out = '<details>\n<summary><strong>Archived phases</strong>'
    + ` — ${rows.length} chunk(s), cold storage</summary>\n\n`;
  out += '| Range | Items | Chunk |\n| --- | --- | --- |\n';
  for (const r of rows) {
    const file = r.match(/`([^`]+\.md)`\s*$/);
    const range = r.match(/^- ([^(]+)\(/);
    const ids = r.match(/\(([^)]*)\)/);
    const path = file ? file[1] : '';
    out += `| ${range ? cell(range[1]) : '—'} `
      + `| ${ids ? clip(ids[1], 220) : '—'} `
      + `| ${path ? `[${path}](archive/${path})` : '—'} |\n`;
  }
  return `${out}\n</details>\n\n`;
}

const body = `<!-- markdownlint-disable MD033 -->
# Roadmap — pm-skills framework repository

<!-- GENERATED by scripts/gen-roadmap.mjs from self/project/tickets/,
  trajectory.md, and archive/INDEX.md. Never hand-edit; on any conflict,
  regenerate from the merged records.

  Cold read tier: this is the human-readable view. Agents read
  backlog.md (sectional) and the records themselves. -->

${outstanding()}## History

Shipped work, by declared phase, newest first. Phases are the
trajectory's own level-2 headings; archived phases are listed from
\`archive/INDEX.md\` rows without opening the cold chunks.

${livePhases()}${archivedPhases()}`;

const doc = `${body.replace(/\n{3,}/g, '\n\n').trimEnd()}\n`;

const existing = existsSync(outPath) ? readFileSync(outPath, 'utf8') : '';
if (check) {
  if (existing !== doc) {
    console.error('gen-roadmap --check: roadmap diverges from records — regenerate');
    process.exit(1);
  }
  console.log('gen-roadmap --check: roadmap matches records');
} else {
  writeFileSync(outPath, doc);
  console.log(`gen-roadmap: ${outPath}`);
}
