<!-- transcript: FIELD-HARVEST-RUN-1 · 2026-09-24 · Codex (gpt-6-astra) as second witness at the
     three checkpoints of the first field-harvest run. A redacted account, per
     self/FIELD-HARVEST.md → "What is done with the opinion": the findings, the disagreements
     and how the evidence resolved them — paraphrased, not reproduced. The verbatim briefs and
     replies stay in the unsynced run directory (<home>/scratch/pm-harvest/2026-09-24/codex/);
     the rollouts are in <home>/.codex/sessions/2026/09/24/. Redaction: paths collapsed to
     <home>; no text from any project's local lane quoted; one person's name on the
     maintainer's list replaced by the project's description. Cold tier — lint-exempt, never
     auto-read. -->

# Codex Astra as second witness — the first field-harvest run

Every call: `codex exec -m gpt-6-astra -s read-only
--skip-git-repo-check --color never -C <this repository> -o
<run>/codex/<step>.md "<instruction>" < <run>/codex/<step>-brief.md`
(codex-cli 0.155.1; rollouts kept, no `--ephemeral`). Each brief named
its sources as paths and carried no evidence.

## Checkpoint A — blind inventory

11:14 to 11:25 UTC, 677.9 s, 141,813 tokens. The brief gave the
discovery sources (the walk roots, the three harness stores, Windsurf's
workspace list, the session log holding the maintainer's list of
2026-09-15) and the tier README, and none of the run's findings.

Codex's table agreed with the run on every framework version and
intake commit, on Storage Tidy being current, on the Personal Finance
thread that ran in the Parenting Research folder, on the lab commit
(`c6d8198`) that all seven v2 provenance records name, and on the
OpenClaw administration project on the maintainer's list having no
checkout on this machine. Where it differed, each row was re-examined
at source:

1. **The Hub's former folder** — 63 rollouts in a folder Codex read as
   unmarked. The rollouts' own Git metadata name the Hub's repository
   on its `master` and `wip/live-show-fixes-2026-06-04` branches; they
   are the Hub's.
2. **Three `pm_skills/` trees without a `VERSION`** (Dot Matrix Tool,
   Resolve Scripting Windsurf, Dot Crowd Navigator) — Codex called them
   contract-only. Each holds the full framework tree of April 2026 with
   populated project memory: canon, unversioned. The instrument's class
   table had no row for them; it does now.
3. **The Windsurf Map Router** — Codex proposed a separate project.
   Route Plotter v3's first commit imports that repository; it is filed
   under `route-plotter` as the v2 line, with the complete evidence set
   of its own that Codex asked for.
4. **The last filed cut-offs of the Video Helper and Route Plotter** —
   Codex was right: the exports name `09702c2` and `6f2ac15`; the tier
   README had each harvest's starting HEAD. Adopted and corrected.
5. **Video Pedagogy's Codex count** (318 against 270) — timing: 59
   rollouts were created during the run from held clones. Handled by
   re-taking the inventory at the cut-off.
6. **Vinyl** — Codex counted one more Claude Code session (a scratch
   session about the project's folder): adopted. It flagged a
   readiness-only rollout as ambiguous: left unattributed after
   Checkpoint B.
7. **The Hub's "adoption" commit** — Codex named `a7e6999`; that is the
   records-mode adoption of 2026-08-17. The framework itself was
   installed unversioned by `a089018` on 2026-05-03. Both are filed.

## Checkpoint B — the plan

11:29 to 11:32 UTC, 180.7 s, 88,061 tokens. The brief named the plan,
the tier README and instrument sections, the generator's code, the
attribution file and the before-captures.

Fourteen findings — two blockers, eleven major, one minor. All were
checked against the code and the plan, all held, and all were fixed
before anything was captured:

1. Validators could write outside scratch — they now run under a
   `sandbox-exec` profile that denies writes outside scratch and all
   network, after their scripts are read.
2. Private-key redaction left the key body — whole blocks are removed,
   and finished Markdown is re-scanned; a residual hit fails tracked
   output.
3. The tracked lane was trusted from configuration — the generator
   now checks each exported commit against the public remote and
   defaults to local.
4. First harvests lacked the memory as first committed and stated
   validator dispositions — added.
5. The before-captures skipped files inside untracked folders and
   folder projects' contents — re-taken recursively, cloud-only files
   recorded as gaps rather than opened.
6. The cut-off did not govern everything — HEAD and every ref are
   frozen at it, and agent memory, reviews and folders are filtered by
   it.
7. A source changing during capture only warned — it now aborts the
   capture.
8. Hydration and folder secrets were unrecorded — both are recorded.
9. The mirror fallback could lose ref names — the clone is assembled to
   match the checkout's ref map by name and object, and the bundle
   manifest compares them.
10. The readiness-only rollout's attribution was unsupported — made
    unattributed.
11. Equal size was taken as unchanged — equal-size logs modified since
    are hash-compared with their filed copies, and new side files of
    unchanged sessions are taken.
12. Upgrade reports carried the current version — each now carries the
    version of its own moment.
13. The prompt filter dropped anything starting with `<` — only named
    harness envelopes are dropped; manifests gained line counts and
    status labels; names are collision-safe.
14. Path length was unchecked — Phase 4 checks every final path.

## Checkpoint C — verification

13:09 to 13:15 UTC, 309.3 s, 100,994 tokens. The brief named the
staged set and its echo, the evidence this run wrote, the tier
contract and the instrument's Phases 4 and 5, and asked Codex to
re-hash, re-list and re-grep independently. (This section was written
after the checkpoint ran; the follow-up below checked it.)

Codex confirmed, without network access: all 44 archive and bundle
hashes match their manifests (21 session archives, 20 bundles, two
folder archives, the Windsurf stores); every inventoried member is
present at its recorded size and hash; the 62 staged paths match the
echo and the index, and none is under a `local/` directory; every new
field-report document carries a header with a join key; nothing staged
reads as private material. Its verdict: commit after five fixes.

1. **A staged validator report** (Laurillard's) sat outside the list
   of kinds the brief named. The list was incomplete; the tier
   contract files validator reports, and this one comes from a public
   commit. Kept.
2. **Public provenance could not be checked** without network. The run
   checked it at 13:17 UTC: all five repositories are public and each
   exported commit is on GitHub (`form-filler` `02d4145`,
   `Corperate-Image-Generator` `ee49264`, `dot-crowd-navigator`
   `8d38880`, `laurillard-video-functions-learner-journey` `0341c0b`,
   `route-plotter` `989f11d`).
3. **This section was unwritten** — it is now.
4. **AppleDouble members.** Every archive carries `._*` members that
   macOS `tar` wrote for the extended attributes of the staging files,
   and macOS `tar -tzf` does not list them, so the run's own member
   checks had counted payload only. The archives are unchanged; each of
   the 24 manifests now lists its AppleDouble members with size and
   SHA-256 under a correction heading (7,190 in all), and the
   instrument gains the hazard.
5. **This transcript's header** is a transcript header, not a
   field-report header — the convention of this directory, which is not
   part of the tier. No change.

Follow-up (the one the instrument allows), 13:20 to 13:22 UTC,
153.0 s, 48,785 tokens: this section faithful and nothing private in
it; the staged set unchanged at 62 paths, none local; the new hazard
accurate. It found one overclaim — the correction said each archive's
member list was now complete, but the session archives also hold
directory entries listed in neither table (54 in vinyl's) — and
returned "do not commit" on that. The corrections now say every file
member is listed and give each archive's count of directory entries.
With the follow-up spent, the run checked the fix mechanically: all 24
archives enumerated with a tar library, no file member unlisted.

## What neither witness was asked, and the run found

Recorded here because they bear on how far the checkpoints reached:
the harvest's own session attribution missed one filed-archive layout
and re-took ten Route Plotter sessions already filed, caught by a
recount before filing and fixed; and Codex had rewritten every rollout
in its store since the previous harvests, which the delta labels now
distinguish from resumed sessions. Both are in the run's decision-log
entry and the instrument's hazards.
