<!-- transcript: FIELD-HARVEST-PROMPT · 2026-09-24 · Codex (gpt-6-astra) differential
     review of the draft self/FIELD-HARVEST.md, run from this checkout by Claude Code
     (codex exec, read-only sandbox with full-disk read, non-ephemeral). The brief was
     piped on stdin; the reply is Codex's final message, verbatim. Disposition at the
     foot. Cold tier — lint-exempt, never auto-read. -->

# Codex Astra review of the draft field-harvest prompt

The maintainer's instruction (2026-09-23): "use codex astra as a project
partner to get a differential opinion on tasks, build this into the
prompt, and when making the prompt". This file is the "when making the
prompt" half; the built-in half is `self/FIELD-HARVEST.md` → "The
partner: Codex as second witness".

## Instruction (the `codex exec` argument)

> You are the second witness on a draft prompt. Follow the brief on
> stdin exactly: read the named files, verify the machine facts by
> reading the stores yourself, and produce the numbered findings and
> verdict it asks for. Read-only: change nothing.

## Brief (stdin, verbatim)

    # Brief for Codex (gpt-6-astra) — differential review of a draft prompt
    
    You are the second witness. The maintainer of this repository (Joe) asked
    for a prompt to be written and asked that Codex on the astra model be used
    as a project partner "to get a differential opinion on tasks" — both built
    into the prompt and used while making it. This is the "while making it"
    half. Give an INDEPENDENT opinion: read the sources yourself, verify the
    machine facts yourself, and disagree where the evidence says so.
    
    ## The maintainer's task statement (verbatim, 2026-09-23)
    
    > please create a prompt that covers: inspection of all my visible
    > projects, see which version of pm-skills they are using, and check if
    > the real-world application archive is up to date, bringing existing
    > archives up to date and create archives for those using pm-skills and
    > not yet archived, in order to analyse how well pm-skills is working
    > judging by project progress and chat history. this is just the archival
    > task, we will devise a separate prompt for analysis.
    >
    > ps use codex astra as a project partner to get a differential opinion
    > on tasks, build this into the prompt, and when making the prompt
    
    "The real-world application archive" is the field-report tier at
    `self/field-reports/` (its README is the contract).
    
    ## What to read (read-only; change nothing)
    
    1. The draft: `self/FIELD-HARVEST.md` (untracked, in this checkout).
    2. The contract it must obey: `self/field-reports/README.md`.
    3. Its siblings, for shape and non-overlap: `self/FIELD-STUDY.md`
       (analysis instrument) and `pm_skills/prompts/field-report.md`
       (what a consuming project runs by itself).
    4. The existing harvest evidence, to see the shapes the draft describes:
       any `self/field-reports/<slug>/*-note-deployment-snapshot.md` and a
       `self/field-reports/<slug>/local/*-sessions-manifest.md` if present.
    
    ## Machine facts the draft asserts — verify each one on this machine
    
    - `~/.claude/projects/` directory naming (path with `/` → `-`), and that
      Claude Code deletes session logs 30 days after last activity by default
      (check `~/.claude/settings.json` for `cleanupPeriodDays`; absence means
      the default).
    - `~/.codex/config.toml` has a `[projects]` trust list and `model =
      "gpt-6-astra"`.
    - `~/.codex/sessions/<year>/<mm>/<dd>/*.jsonl` rollouts carry
      `session_meta` with a `cwd`; `~/.codex/archived_sessions/` exists and
      holds rollouts (count them); earlier harvest manifests never mention
      `archived_sessions`.
    - Windsurf workspace folders are listed in
      `~/Library/Application Support/Windsurf/User/workspaceStorage/*/workspace.json`;
      `~/.codeium/windsurf/cascade/*.pb` and `~/.codeium/windsurf/memories/*.pb`
      are opaque (no readable path strings) and dated only by mtime
      (claimed: 8–20 July 2026).
    - `codex exec` flags used in the draft's invocation block exist and mean
      what the draft says (`-m`, `-s read-only`, `--skip-git-repo-check`,
      `--color never`, `-C`, `-o`, stdin appended as a `<stdin>` block,
      `--ephemeral`). Also: under `-s read-only`, can Codex read files OUTSIDE
      the `-C` directory (the harness stores under `~`)? If not, the draft's
      invocation needs a permission override — say which.
    - macOS has no `timeout` binary; a `find -maxdepth 5` walk of the
      cloud-synced roots takes minutes.
    - Seven canon deployments at versions 2.2.0–3.1.1 exist outside the
      tier (found 2026-09-23 by the walk); seven pm-next v2 intakes have
      landed since 2026-09-16 (`<checkout>/project/profile.md` present).
      Spot-check two of each if you can find them cheaply; do not walk the
      whole OneDrive.
    
    ## Deliberate choices in the draft — not errors
    
    - Consuming-project paths are written as `<checkout>/…` and gitignored
      helper paths as `<slug>/local/…` because this repository's docs
      checker resolves backticked paths against Git and would fail on them.
    - The draft is source-only and machine-specific on purpose.
    - The draft points at the README for the header, lane and naming
      contract instead of restating it (canonical-copy discipline).
    
    ## What to produce
    
    A numbered list of findings, each with: severity (blocker / major /
    minor), the draft section it concerns, the evidence (what you read or
    ran), and a concrete proposed fix in one or two sentences. Cover, in
    this order:
    
    1. Factual errors about the machine, the stores, or the tools.
    2. Gaps against the maintainer's task statement (something asked for
       that the draft does not do, or does only implicitly).
    3. Unsafe or irreversible steps, and anything that could write into a
       consuming project or leak private evidence into the tracked lane.
    4. The Codex-partner protocol (section "The partner: Codex as second
       witness") judged from Codex's own side: invocation, stdin, sandbox
       read scope, persistence, cost, and whether three checkpoints are the
       right number and the right places.
    5. What you would do differently, ranked by value, at most five items.
    6. A one-line verdict: ready / ready with the fixes above / not ready.
    
    Under 1500 words. Plain prose, no tables needed. Do not edit, create,
    move or delete anything; do not run any command that writes.

## Run facts

- Command: `codex exec -m gpt-6-astra -s read-only -c 'sandbox_permissions=["disk-full-read-access"]' --skip-git-repo-check --color never -C <this checkout> -o <scratch>/last-message.md "<instruction>" < brief.md`
  (the `-c` override turned out to be unnecessary — finding 13).
- Session id `01a0d2f2-ec2c-74a2-86d7-c18dae5c29b4`; elapsed 315 s; 36 read commands; tokens used: 120,023.
- Redaction of this file: none required — the reply names only projects already listed in the tracked tier README and generic in-project paths; no household content, addresses or credential-shaped values; checked 2026-09-24 before filing. Under the rule the revised prompt now sets, later checkpoint exchanges are filed as redacted accounts and their originals stay in the run directory.

## Reply (verbatim)

Read-only review completed; I changed nothing. The checkout changed concurrently: between status captures, `self/project/decision-log.md`, `self/project/trajectory.md`, and `self/_transcripts/2026-09-24-FIELD-HARVEST-codex-astra-review.md` appeared as additional changes. I left them untouched.

I read all named sources, including Storage Tidy’s deployment snapshot and session manifest. Direct checks confirmed `model = "gpt-6-astra"`, project trust entries, dated live rollouts carrying `session_meta.cwd`, **131 archived rollouts**, and no `archived_sessions` references in existing manifests. Neither `timeout` nor `gtimeout` is on PATH; `find -maxdepth` works. I did not reproduce the historical five-minute walk or either seven-project total.

1. **Major — Phase 1, Claude directory naming.** Actual names replace spaces and underscores too: `_Joe OE Drive` becomes `-Joe-OE-Drive`. The slash-only transformation is therefore incorrect and cannot reliably reconstruct checkout paths. Discover directories as stored and establish identity from session metadata and verified checkout mappings.

2. **Major — Phase 1, Windsurf dates and retention.** I counted 50 cascade files dated 8–20 July 2026, but 84 memory files span **1 July 2025–16 July 2026**. Four common path markers produced no matches; that establishes neither an exhaustive decoding result nor a retention policy. Report the stores separately and remove “anything earlier is already gone” and “keeps a window of weeks”.

3. **Minor — Phase 1, archived Codex coverage.** The 131 archived rollouts have 13 distinct recorded working directories; none names eBay Tool or Storage Tidy. Earlier manifests’ silence supports an unchecked-source finding, not “every project has a fresh Codex source there”. Require per-project attribution and comparison with previously archived session identities and hashes.

4. **Major — Phase 1, V2 provenance.** eBay Tool and Video Pedagogy both have V2 profiles, but neither has `project/adoption/verification.md`. Video Pedagogy instead has `project/migration/SOURCE-MANIFEST.json` and `verification.md`; Git dates its profile introduction to intake `a9a0d1f`, 16 September. Discover provenance records instead of requiring one path, and record unknowns explicitly. My older-canon spot checks found Windsurf AI credit display at **2.2.1** and Corperate Image Generator at **2.2.0**; eBay’s history query timed out.

5. **Minor — Phase 2 and cadence, retention clock.** `~/.claude/settings.json` contains no `cleanupPeriodDays`; Anthropic documents a 30-day default. The draft first describes inactivity, then calculates deadlines from session age. Use the effective retention setting and last activity, with a safety margin; do not present deletion as an exact scheduled instant. [Claude directory documentation](https://code.claude.com/docs/en/claude-directory#cleaned-up-automatically)

6. **Major — Phases 1–2, completeness of discovery.** “Never waited on” allows the run to close before the only source capable of finding some deployments finishes. Continue other work while discovery runs, but reconcile its results before declaring coverage complete; otherwise report unfinished roots and partial coverage. Add explicit statuses for inaccessible candidates and projects with no framework and no scheduled adoption.

7. **Major — Phase 2, false “current” results.** The session test detects new starts and missing IDs, but misses appended messages in an already-listed session. HEAD comparison also misses changed uncommitted memory. Compare content hashes, byte lengths and last timestamps for existing sessions, and fingerprint relevant working-tree evidence independently of HEAD.

8. **Major — Phases 3–4, incomplete preservation checks.** Storage Tidy’s manifest describes **20 archive files**, while its session tables contain ten rows: session rows cannot equal archive entries. Require a separate complete member inventory with hashes, plus a fixed capture cutoff and checks for files changing during capture. Preserve prior harvests under collision-safe names and distinguish committed exports from dirty working-tree snapshots.

9. **Major — Phase 3, history completeness.** A fresh remote clone at matching HEAD does not establish that every local branch or unpushed commit was preserved; Storage Tidy’s existing snapshot explicitly includes an unpushed intake. Compare local and archived reference maps and object coverage, and report unavailable history rather than calling a remote-only bundle complete.

10. **Blocker — Partner transcript filing and Phase 5 publication.** Lines 149–152 require verbatim briefs and replies under `self/_transcripts/`; `git check-ignore` confirms that proposed path is not ignored. Those exchanges inspect private manifests and evidence, so verbatim publication can bypass the tier’s lane rules. Preserve originals only in an explicitly ignored process-evidence location and commit a reviewed, redacted account.

11. **Major — Phase 3, raw evidence and opaque stores.** Whole-directory copies, full history bundles and an unattributable Windsurf store can contain credentials or explicitly excluded projects. The README prohibits secrets in either lane; ignoring an archive does not resolve that. Define inspection, exclusion and sanitisation before filing, retain redaction counts, and describe unknown Windsurf attribution without assigning ownership from overlapping dates.

12. **Major — Posture, execution and source integrity.** Running copied validators in scratch is useful, but not containment: scripts can follow absolute paths or symlinks into consuming projects. Identical porcelain status also does not prove identical dirty-file contents. Constrain validator writes to disposable scratch, disable optional Git locks for inspection, compare relevant content fingerprints, and report concurrent differences without repairing them.

13. **Minor — Partner invocation and sandbox claims.** Installed `codex exec --help` confirms every listed flag and the argument-plus-stdin `<stdin>` behaviour. This read-only session successfully read stores outside its working directory, so **no read-scope override is needed here**. Clarify that `-C` selects the working root, not a read allowlist; the command sandbox does not prevent the host from writing `-o`, rollouts, or using separately controlled connectors. [OpenAI sandbox documentation](https://learn.chatgpt.com/docs/sandboxing)

14. **Minor — Partner persistence, independence and cost.** Keeping rollouts is appropriate, but choosing a consuming checkout with `-C` gives process-review sessions that checkout’s metadata and instructions. Keep the review rooted here and provide absolute evidence paths. The stated allowance is up to **six executions**, not a token or monetary bound; record elapsed time and usage, bound discovery/output, and distinguish blind inventory review from the deliberately informed plan review.

15. **Major — Checkpoint C and Phase 5 ordering.** Three checkpoints are sensible: discovery, planned capture, final verification. However, C inspects a staged set before the draft explicitly stages it, and Phase 5 pushes before adding closing memory and the partner transcript. Complete and privacy-review all intended outputs, stage explicit paths, run the final gate and C against that set, then commit and push; recheck any subsequent amendments.

16. **Minor — Phase 4, header validation.** “Every new file” includes archives, bundles, generators and `.gitkeep`; these cannot all carry the Markdown header. Limit header checks to report documents and manifests, and verify binary evidence through its manifest. Preserve the archive-only boundary: the consuming-project sibling’s mandatory analytical note should not be imported into this harvest.

17. **Major — Ranked changes I would prioritise.** Based on the evidence above: **(1)** close the transcript/publication leak; **(2)** make freshness content-based and captures immutable; **(3)** reconcile discovery before claiming completeness; **(4)** replace assumed paths and retention claims with observed metadata; **(5)** make final verification cover the exact publishable set. These changes have greater value than adding another witness checkpoint.

I did not launch another Codex session or run `npm run check`: the former persists files, and the latter invokes npm/npx, which can write caches or logs. This is a static differential review, not an executed harvest or a green-gate claim.

**Verdict: not ready.**


## Disposition (Claude Code, 2026-09-24)

Each finding was checked against the evidence before the draft was changed. "Taken" means the revised `self/FIELD-HARVEST.md` now says what the finding asked for.

| # | Severity | Verified | Taken | What changed |
| --- | --- | --- | --- | --- |
| 1 | major | yes — `_Joe OE Drive` → `-Joe-OE-Drive` in the store | yes | names declared lossy; checkout identified from the logs' `cwd` field |
| 2 | major | yes — memories span 2025-07-01 to 2026-07-16 | yes | two stores reported separately with observed ranges; retention "unknown", stores treated as perishable; the "window of weeks" and "already gone" claims removed |
| 3 | minor | yes — 13 distinct working directories among the 131 | yes | "fresh source for every project" replaced by per-project attribution and de-duplication by session id |
| 4 | major | yes — Video Pedagogy keeps provenance under `project/migration/` | yes | provenance record discovered, not assumed; "unknown" recorded when absent |
| 5 | minor | yes — no `cleanupPeriodDays` set; default applies | yes | deadline = last activity + effective period − five-day margin; "sweep, not an instant" |
| 6 | major | yes | yes | walk started first, reconciled before the inventory is final; partial coverage reported per root; statuses "inaccessible" and "no framework, not scheduled" added |
| 7 | major | yes — manifests carry bytes and last timestamp per session | yes | freshness by bytes/last timestamp per listed session plus a working-tree fingerprint independent of HEAD |
| 8 | major | yes — Storage Tidy: 20 members, 10 session rows | yes | member inventory with hashes required; capture cut-off fixed; hash-twice check; never overwrite; working-tree snapshot exported separately |
| 9 | major | yes — Storage Tidy's bundle held an unpushed intake | yes | bundle from the checkout when it verifies; otherwise clone + ref-map comparison + local-only refs bundled separately or reported |
| 10 | blocker | yes — `self/_transcripts/` is tracked and public | yes, modified | redacted account in `self/_transcripts/`; verbatim originals in the unsynced run directory; briefs carry paths, never content. A new ignored directory was not added (it would change the gate's `.gitignore`); the redaction rule achieves the same containment without touching the gate |
| 11 | major | yes | yes, modified | secrets scan with counts per archive before filing; excluded projects left out or the manifest says they could not be separated; Windsurf attribution declared unknown and the filing location chosen from Windsurf's workspace list (a recorded fact), still under a project directory because the tier's layout has no other home |
| 12 | major | yes | yes | scripts read for absolute paths and symlink-following before running in scratch; `--no-optional-locks` on every read; before/after content fingerprints of dirty files; concurrent differences reported, never repaired |
| 13 | minor | yes — this run read the stores with no override needed | yes | invocation without the override; `-C` described as working root, not a read allow-list; host writes named |
| 14 | minor | yes | yes | `-C` pinned to this repository (a consuming checkout's `AGENTS.md` would become the reviewer's instructions); bound stated as six executions; elapsed time and tokens recorded; A blind, B informed by design |
| 15 | major | yes | yes | Phase 4 stages by explicit path; C runs on the staged set; Phase 5 completes memory and transcript before the gate, C and the push |
| 16 | minor | yes | yes | header check limited to Markdown documents and manifests; binaries verified through the manifest; the analytical note stays with `field-report.md` |
| 17 | ranking | — | — | the five priorities map to findings 10, 7/8, 6, 1/2/4/5 and 15, all taken |

Not reproduced by Codex and left as this run's evidence: the five-minute walk and the two seven-project counts (the walk's output is in the session that wrote the prompt). Codex's note that the checkout changed during its run is correct — the decision-log entry, trajectory line and this transcript's stub were written while it read.
