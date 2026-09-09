<!-- field-report: project=vinyl-sorting · date=2026-09-09 · type=validator
     · pm-skills=pm-next-v0.2 (lab/next of djDAOjones/PM-Skills-lab at 530637a, vendored 2026-08-30; no canon release governs it)
     · source=the project's own tools/check-memory.mjs and tools/gen-backlog.mjs --check, run 2026-09-09 by Claude Code against a clean git archive of 60c3c4b55dba25c52e6e0ba9a8bbf3fc9ea88f88 extracted outside the cloud-synced path
     · redaction=0 checkout path occurrence(s), 1 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=public names Joe and djDAOjones, the public Worker subdomain joe-2d2 and the Discogs account name walter_odington retained where present — every one already public in the project's committed files; no unpublished identity was intentionally added -->

# Validator output at harvest

Run against `git archive 60c3c4b55dba25c52e6e0ba9a8bbf3fc9ea88f88` extracted to a scratch directory, not against the checkout: the checkout sits on a OneDrive path where files deleted by a past commit can survive as cloud-only placeholders, and reading one of those blocks the validator (see the deployment-snapshot note). The tools are the project's own vendored copies, byte-identical to the lab's.

### `node tools/check-memory.mjs` — exit 0

```text
check-memory: project (root <scratch>/exports/vinyl-sorting)
note: validates the form of memory, never the truth of it.
OK   backlog Active: 1334 words, 18 open items (budget 1500 / 40)
WARN records: M2-DISCOGS-PACING.md at 627 words (soft 600)
WARN records: PHOTO-CULL.md at 698 words (soft 600)
WARN records: SPIKE-PHOTO-TO-FIELDS.md at 945 words (soft 600)
OK   records mode: 18 record(s), id/status coherence with the view checked (byte drift is gen-backlog --check's remit)
OK   reference doc README.md: 2498 words, ~3331 tok (soft 3500)
OK   reference doc brief.md: 664 words, ~885 tok (soft 3500)
OK   trajectory: 1969 words (budget 2000)
OK   decision-log: 18 live entries (budget 20)
OK   wish-list: 14 open (budget 25)
note counters: 45 items in trajectory, 45 shipped in the last 30 days
Summary: 0 structural failure(s), 3 warning(s)
```

### `node tools/gen-backlog.mjs --check` — exit 0

```text
gen-backlog --check: view matches records
```
