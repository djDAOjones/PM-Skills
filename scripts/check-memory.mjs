#!/usr/bin/env node
// @ts-check

/**
 * check-memory.mjs — mechanical validator for pm-skills project memory.
 *
 * Implements the end-of-task size check (end-of-task.md step 4) and the
 * mechanical half of memory-maintenance's Diagnose verb as one command,
 * and doubles as the property oracle for behavioural evaluation
 * scenarios (EVAL-SCEN).
 *
 * Exit semantics (assessment C1: budgets propose, they never block):
 *   - STRUCTURAL failures exit 1 — grammar violations, [x] items left
 *     in the backlog, duplicate IDs, ticket orphans, conflict markers.
 *     These gate commits via lint:memory in `npm run check`.
 *   - BUDGET overruns and ageing are WARN lines, exit 0 — they feed
 *     maintenance proposals, never block work.
 *
 * Budget numbers come from the machine-readable block in
 * `pm_skills/memory-policy.md` (the canonical home of the numbers);
 * this script carries none of its own.
 *
 * HONESTY NOTE: this validates the FORM of project memory, never the
 * truth of it — a well-formed decision entry can still be wrong.
 *
 * Records-mode dialect (RECORDS-DIST): `tickets/_meta.md` may carry
 * `flags: a, b` to extend the known flag list. Custom flags are known,
 * never standing. Kept in step with the generic fork
 * `pm_skills/scaffold/check-memory.mjs` (deliberate forks,
 * CONTRIBUTING.md).
 *
 * Usage:
 *   node scripts/check-memory.mjs [--project-dir self/project]
 *                                 [--repo-root .]
 *
 * Zero dependencies; git via execSync only for the lite-close trailer
 * scan (skipped gracefully outside a git repo / on shallow history).
 */

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';

/** @typedef {{tag: 'FAIL'|'WARN'|'OK'|'note', msg: string}} Line */

/** @type {Line[]} */
const lines = [];
const say = (/** @type {Line['tag']} */ tag, /** @type {string} */ msg) =>
  lines.push({ tag, msg });

const args = process.argv.slice(2);
const argOf = (/** @type {string} */ name, /** @type {string} */ dflt) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : dflt;
};
const repoRoot = resolve(argOf('--repo-root', '.'));
const projectDir = resolve(repoRoot, argOf('--project-dir', 'self/project'));

const read = (/** @type {string} */ p) =>
  existsSync(p) ? readFileSync(p, 'utf8') : null;
const words = (/** @type {string|null} */ s) =>
  s ? s.split(/\s+/).filter(Boolean).length : 0;
const tok = (/** @type {number} */ w) => `~${Math.round((w * 4) / 3)} tok`;
const daysSince = (/** @type {string} */ iso) =>
  Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);

/** Parse the machine-readable budget block out of memory-policy.md. */
function readBudgets() {
  const policy = read(join(repoRoot, 'pm_skills', 'memory-policy.md'));
  if (!policy) throw new Error('pm_skills/memory-policy.md not found');
  const m = policy.match(/```json\n([\s\S]*?)```/);
  if (!m) throw new Error('no machine-readable budget block in memory-policy.md');
  return JSON.parse(m[1]);
}

const KNOWN_FLAGS = /^(sign-off|spike|detail|maintainer|security|blocked\b.*)$/;
const STANDING = /^(sign-off|maintainer|blocked\b.*)$/;

/** Extra known flags from the records-mode dialect key (`_meta.md`). */
function dialectFlags() {
  const fm = recordFm(join(projectDir, 'tickets', '_meta.md'));
  if (!fm?.flags) return new Set();
  return new Set(fm.flags.split(',').map((s) => s.trim()).filter(Boolean));
}

/**
 * Parse the backlog's Active section into items, joining continuation
 * lines so multi-line flags and descriptions parse whole.
 */
function parseBacklog(/** @type {string} */ content) {
  const hasActive = /^## Active\s*$/m.test(content);
  const active = content.split(/^## Active\s*$/m)[1] ?? '';
  const section = active.split(/^## /m)[0];
  const raw = section.split('\n');
  /** @type {{status:string,text:string,line:number}[]} */
  const items = [];
  for (let i = 0; i < raw.length; i++) {
    const m = raw[i].match(/^- \[([ x~-])\]\s+(.*)$/);
    if (!m) continue;
    let text = m[2];
    let j = i + 1;
    while (j < raw.length && /^ {2,}\S/.test(raw[j]) && !/^ *- \[/.test(raw[j])) {
      text += ` ${raw[j].trim()}`;
      j++;
    }
    items.push({ status: m[1], text, line: i + 1 });
  }
  return { items, sectionWords: words(section), hasActive };
}

/**
 * Split a backlog view line at the first em-dash that separates the
 * item head (`**ID Title** [flags] (date)`) from its summary.
 *
 * The separator is the first em-dash at bracket depth zero: a flag body
 * (`[blocked: waiting on X — or the decision to cut]`) and a
 * parenthetical may both contain one. A naive `split('—')[0]` truncates
 * the head mid-bracket, after which no flag parses, the item stops
 * counting as standing, and its date is lost — silently, with no error
 * (FLAGS-EMDASH). `gen-backlog.mjs` renders `blocked-on` verbatim into
 * the bracket, so the generator emitted exactly what this could not read.
 */
function itemHead(/** @type {string} */ rest) {
  let square = 0, round = 0;
  for (let i = 0; i < rest.length; i++) {
    const c = rest[i];
    if (c === '[') square++;
    else if (c === ']') square = Math.max(0, square - 1);
    else if (c === '(') round++;
    else if (c === ')') round = Math.max(0, round - 1);
    else if (c === '\u2014' && !square && !round) return rest.slice(0, i);
  }
  return rest;
}

function backlogCheck(/** @type {any} */ B) {
  const path = join(projectDir, 'backlog.md');
  const content = read(path);
  if (!content) { say('note', 'backlog.md: absent — skipped'); return { detailIds: new Set() }; }
  // Records mode changes the right repair: the view is generated, so a bad
  // line is fixed by regenerating from records — never by editing the view.
  const recordsMode = content.includes('<!-- generated:records:start')
    || existsSync(join(projectDir, 'tickets', '_meta.md'));
  const extraFlags = recordsMode ? dialectFlags() : new Set();
  const { items, sectionWords, hasActive } = parseBacklog(content);
  // A named section the parser cannot find must be said out loud. Reporting
  // "0 open items" over a backlog full of work is the worst failure this
  // tool has: a green line from a check that read nothing (SILENT-LOSS-SWEEP).
  if (!hasActive)
    say('WARN', 'backlog.md: no "## Active" section found — the item, budget and grammar checks below read nothing; rename the section or point --project-dir at the right file');
  const ids = new Map();
  const detailIds = new Set();
  /** @type {Map<string,string>} */
  const openStatuses = new Map();
  const ageing = [];
  /** @type {{id:string,words:number}[]} */
  const verbose = [];
  let open = 0, unparsed = 0;

  for (const it of items) {
    if (it.status === 'x')
      say('FAIL', recordsMode
        ? `backlog: shipped [x] item in the generated view (line ${it.line}) — move the record to archive and regenerate (gen-backlog); never hand-edit between the markers`
        : `backlog: shipped [x] item still present (line ${it.line}) — evict to trajectory`);
    if (it.status === ' ' || it.status === '~') open++;
    const bold = it.text.match(/^\*\*([A-Z][A-Z0-9-]+)\b([^*]*)\*\*\s*(.*)$/);
    if (!bold) { unparsed++; continue; }
    const id = bold[1];
    if (ids.has(id)) say('FAIL', `backlog: duplicate item ID ${id}`);
    ids.set(id, true);
    if (it.status !== 'x') openStatuses.set(id, it.status);
    if (it.status !== 'x') verbose.push({ id, words: words(it.text) });
    const head = itemHead(bold[3]);
    const flags = [...head.matchAll(/\[([^\]]+)\]/g)].map((f) => f[1]);
    for (const f of flags)
      if (!KNOWN_FLAGS.test(f) && !extraFlags.has(f))
        say('WARN', `backlog: ${id} carries unknown flag [${f}]`);
    if (flags.includes('detail')) detailIds.add(id);
    const date = head.match(/\((\d{4}-\d{2}-\d{2})\)/)?.[1];
    const standing = flags.some((f) => STANDING.test(f));
    if (standing && !date)
      say('WARN', `backlog: standing item ${id} has no creation date (grammar asks for one)`);
    if (standing && date && daysSince(date) > B.standingItemWarnDays)
      ageing.push(`${id} (${daysSince(date)} d)`);
    if (flags.includes('security'))
      say('WARN', `SECURITY: ${id} open${date ? ` since ${date} (${daysSince(date)} d)` : ''} — banners every session until closed`);
  }
  if (unparsed)
    say('WARN', `backlog: ${unparsed} item line(s) do not parse as "**ID Title** [flags] — …" (template placeholders count)`);
  if (ageing.length)
    say('WARN', `backlog: standing items past ${B.standingItemWarnDays} d — ${ageing.slice(0, 3).join(', ')}`);
  // Item count is the primary trigger; the per-item guard catches an item
  // that has grown into an essay. There is no fixed section-word cap — a
  // mature queue of tight items is density, not bloat (memory-policy.md).
  const longest = verbose.reduce((a, b) => (b.words > a.words ? b : a), { id: '—', words: 0 });
  if (open > B.backlogActive.maxOpenItems)
    say('WARN', `backlog Active over budget: ${open} open items (budget ${B.backlogActive.maxOpenItems}) — propose Refactor`);
  const over = verbose.filter((v) => v.words > B.backlogActive.itemGuardWords);
  if (over.length)
    say('WARN', `backlog: ${over.length} item(s) over the ~${B.backlogActive.itemGuardWords}-word verbosity guard — ${over.slice(0, 3).map((v) => `${v.id} (${v.words} w)`).join(', ')} — tighten, or move detail to tickets/`);
  if (open <= B.backlogActive.maxOpenItems && !over.length)
    say('OK', `backlog Active: ${open} open items (budget ${B.backlogActive.maxOpenItems}), longest item ${longest.words} w (guard ${B.backlogActive.itemGuardWords}); ${sectionWords} words total`);
  return { detailIds, openStatuses };
}

/** Parse a record file's flat frontmatter, or null if none. */
function recordFm(/** @type {string} */ p) {
  const m = (read(p) ?? '').match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
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
  return fm;
}

function ticketsCheck(/** @type {any} */ B, /** @type {Set<string>} */ detailIds, /** @type {Map<string,string>|null} */ openStatuses) {
  const dir = join(projectDir, 'tickets');
  if (!existsSync(dir)) { say('note', 'tickets/: absent — skipped'); return; }
  const files = readdirSync(dir).filter((f) => f.endsWith('.md'));
  if (files.includes('_meta.md') && openStatuses) {
    // RECORDS MODE (BACKLOG-STATE phase 1): tickets are the records;
    // the backlog view is generated. Coherence replaces the old
    // detail-flag two-way rule.
    const recs = files.filter((f) => !f.startsWith('_'));
    const recIds = new Map(recs.map((f) => {
      const fm = recordFm(join(dir, f));
      return [basename(f, '.md'), fm];
    }));
    for (const [id, fm] of recIds) {
      if (!fm) { say('FAIL', `records: ${id}.md has no frontmatter`); continue; }
      const status = fm.status ?? '';
      if (!/^(open|todo|in-progress|cut)$/.test(status))
        say('WARN', `records: ${id} status '${status}' is not a known value (open/todo/in-progress/cut) — it renders as open; a shipped record moves to archive instead`);
      if (!openStatuses.has(id))
        say('FAIL', `records: ${id}.md has no open item in the view — if it shipped, move the record to archive and regenerate; if still open, the view has drifted — regenerate from records (never hand-edit the view)`);
      else {
        const box = openStatuses.get(id);
        const want = status === 'in-progress' ? '~' : status === 'cut' ? '-' : ' ';
        if (box !== want)
          say('FAIL', `records: ${id} status '${status}' does not match view box '[${box}]' — regenerate the view from records`);
        const w = words(read(join(dir, `${id}.md`)));
        if (w > B.ticketSoftWords)
          say('WARN', `records: ${id}.md at ${w} words (soft ${B.ticketSoftWords})`);
      }
    }
    for (const id of openStatuses.keys())
      if (!recIds.has(id))
        say('FAIL', `records: open item ${id} has no record file — the view should be generated`);
    say('OK', `records mode: ${recs.length} record(s), view coherence checked`);
    return;
  }
  for (const f of files) {
    const id = basename(f, '.md');
    if (!detailIds.has(id))
      say('FAIL', `tickets: orphan file ${f} — no open backlog item ${id} with [detail]`);
    const w = words(read(join(dir, f)));
    if (w > B.ticketSoftWords)
      say('WARN', `tickets: ${f} at ${w} words (soft ${B.ticketSoftWords})`);
  }
  for (const id of detailIds)
    if (!files.includes(`${id}.md`))
      say('FAIL', `tickets: ${id} carries [detail] but tickets/${id}.md is missing`);
  if (files.length) say('OK', `tickets: ${files.length} file(s), mapping checked`);
}

function markersCheck() {
  const targets = [projectDir, join(projectDir, 'tickets')];
  for (const dir of targets) {
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.md'))) {
      const c = read(join(dir, f)) ?? '';
      if (/^(?:<{7}|>{7})(?:\s|$)/m.test(c))
        say('FAIL', `merge residue: conflict marker in ${f}`);
    }
  }
}

function trailersCheck(/** @type {any} */ B) {
  let log = '';
  try {
    log = execSync('git log --date=short --format=%h%x1f%ad%x1f%B%x1e', {
      cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch { say('note', 'lite closes: no git history readable — skipped'); return; }
  const marker = (read(join(projectDir, 'decision-log.md')) ?? '')
    .match(/Reconcile marker:\s*([0-9a-f]{7,40})/)?.[1];
  const closes = [];
  for (const rec of log.split('\x1e')) {
    const [sha, date, body] = rec.split('\x1f');
    if (!sha?.trim()) continue;
    if (marker && sha.trim().startsWith(marker.slice(0, 7))) break;
    if (/^Close: lite\s*$/m.test(body ?? '')) {
      const item = body?.match(/^Item:\s*(\S+)/m)?.[1];
      closes.push({ sha: sha.trim(), date, item });
      if (!item)
        say('WARN', `lite close ${sha.trim()} has no parseable "Item:" — list for manual triage`);
    }
  }
  if (!closes.length) { say('OK', 'lite closes: none unreconciled'); return; }
  const oldest = closes[closes.length - 1];
  const over = closes.length >= B.liteClose.maxCount
    || daysSince(oldest.date) >= B.liteClose.maxOldestDays;
  say(over ? 'WARN' : 'note',
    `lite closes: ${closes.length} unreconciled, oldest ${oldest.date}`
    + (over ? ` — RECONCILE MANDATORY before next pick (cap ${B.liteClose.maxCount} / ${B.liteClose.maxOldestDays} d)` : ''));
}

function budgetsReport(/** @type {any} */ B) {
  const fm = read(join(projectDir, 'file-map.md'));
  if (fm) {
    const n = (fm.match(/^- `/gm) ?? []).length;
    const budget = Math.max(B.fileMap.floorWords, n * B.fileMap.wordsPerFile);
    const w = words(fm);
    say(w > budget ? 'WARN' : 'OK',
      `file-map budget: ${n} files × ${B.fileMap.wordsPerFile} = ${n * B.fileMap.wordsPerFile}, floor ${B.fileMap.floorWords} → ${budget} words; measured ${w}${w > budget ? ' — propose Prune (strip accreted history)' : ''}`);
  } else say('note', 'file-map.md: absent — skipped');

  // Root rulebooks accrete like any reference doc and nothing else
  // notices: a fresh-init AGENTS.md was measured at 4,502 words in four
  // days with no budget anywhere to see it (memory-policy.md, the
  // reference-doc row). Absent files are skipped by the loop below.
  const refs = [
    join(repoRoot, 'README.md'),
    join(projectDir, 'brief.md'),
    join(projectDir, 'architecture.md'),
    join(projectDir, 'conventions.md'),
    join(repoRoot, 'AGENTS.md'),
    join(repoRoot, 'UI-STANDARDS.md'),
    join(repoRoot, 'DEV-INFRASTRUCTURE.md'),
    join(repoRoot, 'PROCESS.md'),
  ];
  for (const p of refs) {
    const w = words(read(p));
    if (!w) continue;
    say(w > B.referenceDocSoftWords ? 'WARN' : 'OK',
      `reference doc ${basename(p)}: ${w} words, ${tok(w)} (soft ${B.referenceDocSoftWords})`);
  }

  const tw = words(read(join(projectDir, 'trajectory.md')));
  if (tw) say(tw > B.trajectoryWords ? 'WARN' : 'OK',
    `trajectory: ${tw} words (budget ${B.trajectoryWords})`);

  const dl = read(join(projectDir, 'decision-log.md'));
  if (dl) {
    const heads = [...dl.matchAll(/^## (\d{4}-\d{2}-\d{2})/gm)].map((m) => m[1]);
    const n = heads.length;
    const oldest = heads.length ? heads.reduce((a, b) => (a < b ? a : b)) : null;
    const D = B.decisionLog;
    if (n > D.maxLiveEntries)
      say('WARN', `decision-log: ${n} live entries (budget ${D.maxLiveEntries}) — propose archive split, keep latest ${D.liveFloorEntries} live`);
    else say('OK', `decision-log: ${n} live entries (budget ${D.maxLiveEntries})`);
    if (oldest && daysSince(oldest) > D.maxOldestDays) {
      const beyond = n - D.liveFloorEntries;
      say(beyond >= D.minEntriesBeyondFloor ? 'WARN' : 'note',
        `decision-log: oldest entry ${oldest} (${daysSince(oldest)} d > ${D.maxOldestDays})`
        + (beyond >= D.minEntriesBeyondFloor ? ' — propose archive split' : ' — noted only (few entries beyond the read-tier floor)'));
    }
    for (const chunk of dl.split(/^## /m).slice(1)) {
      const w = words(chunk);
      if (w > D.entryGuardWords)
        say('WARN', `decision-log: entry "${chunk.slice(0, 46).trim()}…" at ${w} words (guard ${D.entryGuardWords})`);
    }
  }

  const wl = read(join(projectDir, 'wish-list.md'));
  if (wl) {
    if (!/^## Open\s*$/m.test(wl))
      say('WARN', 'wish-list.md: no "## Open" section found — the count below read nothing');
    const openSec = wl.split(/^## Open\s*$/m)[1] ?? '';
    const n = (openSec.match(/^- /gm) ?? []).length;
    say(n > B.wishListMaxOpen ? 'WARN' : 'OK',
      `wish-list: ${n} open (budget ${B.wishListMaxOpen})${n > B.wishListMaxOpen ? ' — propose a triage pass' : ''}`);
  }

  const dd = read(join(projectDir, 'doc-deltas.md'));
  if (dd) {
    const n = (dd.match(/^- \[ \]/gm) ?? []).length;
    const oldest = dd.match(/^- \[ \]\s+(\d{4}-\d{2}-\d{2})/m)?.[1];
    const over = n > B.docDeltas.maxOpen
      || (oldest && daysSince(oldest) > B.docDeltas.maxOldestDays);
    if (n) say(over ? 'WARN' : 'OK',
      `doc-deltas: ${n} open${oldest ? `, oldest ${oldest}` : ''}${over ? ' — propose a doc-sync pass' : ''}`);
  }
}

/**
 * Attention counters (metrics-lite): derivable from trajectory dates
 * and git history alone — no telemetry infrastructure. Informational;
 * read at reflection, never a gate.
 */
function attentionCounters() {
  const tr = read(join(projectDir, 'trajectory.md'));
  if (!tr) return;
  /** @type {{id:string,date:string}[]} */
  const items = [];
  for (const chunk of tr.split(/^(?=- )/m)) {
    // Tolerate consuming-project dialects: `- ID (date, mode) — …` as well
    // as canon's `- ID — …`, and `(YYYY-MM-DD, anything)` date stamps.
    const id = chunk.match(/^- ([A-Z][A-Z0-9-]+)(?: \([^)]*\))? —/)?.[1];
    const dates = [...chunk.matchAll(/\((\d{4}-\d{2}-\d{2})(?:,[^)]*)?\)/g)];
    if (id && dates.length) items.push({ id, date: dates[dates.length - 1][1] });
  }
  const last30 = items.filter((i) => daysSince(i.date) <= 30).length;
  say('note', `counters: ${items.length} items in trajectory, ${last30} shipped in the last 30 days`);
  let commits = 0, counted = 0;
  for (const i of items.slice(0, 5)) {
    try {
      const n = execSync(`git log --oneline --grep=${i.id}`, {
        cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
      }).trim().split('\n').filter(Boolean).length;
      commits += n; counted++;
    } catch { /* no git — skip */ }
  }
  if (counted)
    say('note', `counters: ${(commits / counted).toFixed(1)} commits per shipped item (last ${counted})`);
}

function main() {
  console.log(`check-memory: ${projectDir.replace(`${repoRoot}/`, '')} (root ${repoRoot})`);
  console.log('note: validates the form of memory, never the truth of it.');
  const B = readBudgets();
  const { detailIds, openStatuses } = backlogCheck(B);
  ticketsCheck(B, detailIds, openStatuses);
  markersCheck();
  trailersCheck(B);
  budgetsReport(B);
  attentionCounters();
  for (const l of lines) console.log(`${l.tag.padEnd(4)} ${l.msg}`);
  const fails = lines.filter((l) => l.tag === 'FAIL').length;
  const warns = lines.filter((l) => l.tag === 'WARN').length;
  console.log(`Summary: ${fails} structural failure(s), ${warns} warning(s)`);
  process.exit(fails ? 1 : 0);
}

main();
