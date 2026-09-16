<!-- field-report: project=marketing-skills · date=2026-09-16 · type=note
     · pm-skills=none (pre-adoption baseline; the pm-next v2 intake has prepared a git proposal for marketing-skills; content verification was blocked by cloud-only placeholders until they were hydrated for this baseline on 2026-09-16)
     · source=harvested from the maintainer's folder, the Claude Code session log and the Codex rollouts by Claude Code
     · redaction=absolute paths written as <checkout>, <other-checkout:…> and <home>; no e-mail addresses or credential-shaped values appear in this note; business and place names stay in the local lane
     · retained=public name Joe -->

# Pre-adoption baseline — Marketing Skills

The orientation file for this project's directory, and the only file
of it in the tracked lane: the folder is private working material, so
every export, the folder archive and the session archive sit in
`local/`. Everything below is an observed fact recorded at harvest
time; nothing here is an evaluation.

**Why now, and one caveat.** The maintainer scheduled this project
for the lab's pm-next v2 on 2026-09-15; by 2026-09-16 the intake had
prepared a git proposal but could not verify the content because most
of the folder was cloud-only. This baseline hydrated the folder first
(162 placeholder files, about three minutes) and then captured it.
The intake moved while the harvest ran: `marketing-skills/` gained
its first git commit at 10:14 that morning ("BASELINE: preserve
reviewed marketing framework scaffold") and a second at 10:25
("INTAKE: install development-only PM-Skills V2"). The folder
archive here holds the scaffold at the first of those commits, so
the marketing-skills part of this baseline is "as the intake began",
while the two research corpora were untouched. The intake's own
BASELINE commit is the in-repository twin of this record.

## The project

One folder, three corpora, all produced by Codex in September:

| Corpus | What it is | State |
| --- | --- | --- |
| `marketing-research/` | A marketing knowledge corpus for local and small businesses: 51 source records, 70 findings, 36 synthesis claims, nine domain syntheses. Completed 2026-09-08 and "prepared for a later AI skills process" | Version 1.0, no git, own validator output |
| `marketing-skills/` | The advice-framework scaffold that will consume the corpus. Its README says the pattern "is borrowed from PM-Skills: one distributable tree, a manifest that classes every path, an append-only changelog whose entries are upgrade plans, an onboarding interview, and a reinstall recipe that can never touch a business's own memory" | 0.1.0 draft scaffold, no skill built; git initialised by the intake on 2026-09-16 |
| `bottesford-poster-research/` | A food-poster design research pack with a level-2 decision and prototype-preparation set | 2026-09-09, no git |

The middle one matters for the framework: it is a second-order
consumer, a project that has copied pm-skills' distribution machinery
(manifest classes, changelog-as-upgrade-plan, reinstall recipe) into
a framework of its own before adopting the successor.

## How the project keeps its own state

No contract at the folder root and no git until the intake. The
corpora carry their own READMEs, a research manifest and validator
output; the scaffold carries `VERSION`, `CORPUS-VERSION`,
`CHANGELOG.md`, `MANIFEST.md` and a `project/backlog.md` of its own
shape. Agent memory outside the folder: one file from the single
Claude Code session.

## History shape

Three Codex threads on `gpt-6-astra`: the corpus thread opened from
the Parenting Research folder on 2026-09-08 at 15:02 UTC (the same
pattern as the finance corpus, relocated afterwards; selected here by
parent-thread linkage), then 14 rollouts in the folder itself on
2026-09-08 and 09-09 (2 interactive, 6 spawned, 5 guardian, 1 import).
One Claude Code session on 2026-09-08 (`claude-fable-5-1`) reviewed
the corpus and proposed how it becomes advice skills.

## What the baseline preserves (all in `local/`)

- `2026-09-16-export-folder.tar.gz` — the three corpora verbatim,
  269 files including the new git metadata, 7.6 MB, SHA-256 in the
  history export.
- `2026-09-16-export-inventory.md` — SHA-256 of every file.
- `2026-09-09-export-history.md` — READMEs, manifests, changelog,
  version files and the scaffold's backlog; `2026-09-09-validator.md`
  — the corpus validator's recorded output.
- `2026-09-08-export-init-prompt.md` — the Claude session's prompt
  and the Codex threads' prompts, verbatim.
- `2026-09-08-export-agent-memory.md` and
  `2026-09-16-sessions.tar.gz` — 36 files, 79 MB, 41 MB compressed.

## What to compare after the intake

- What the intake does with a folder that already contains a
  pm-skills-shaped framework of its own: absorb, wrap or leave.
- Whether the corpus becomes a digest, a structure entry or stays a
  sibling folder.
- The git history the intake writes over the scaffold, against the
  inventory here.
