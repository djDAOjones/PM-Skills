# Inputs — verbatim external source material

<!-- Source-only cold tier (2026-08-26). Canonical description of
     what is filed here and how; other files point at this one. -->

## Purpose

Raw material supplied from outside this repository and kept
verbatim, because a backlog item is built on it and a later reader
needs the original wording rather than a paraphrase. A file here is
evidence of what was actually handed over, frozen at the date it
arrived.

The tier exists because the two neighbouring cold tiers both refuse
this content by their own definitions: `self/field-reports/` takes
evidence produced *by or about a consuming project*, and
`self/evaluations/` takes *this repository's own analysis*. A
prompt, specification, or reference document the maintainer brings
in from elsewhere is neither — it is an input to work not yet done.

## What goes here

- Prompts, checklists, and rubrics supplied as the candidate basis
  for a framework feature.
- Specifications, briefs, or standards from outside the project
  that an item must be designed against.
- Reference documents cited by a ticket that are not reachable by a
  stable public link.

What does **not** go here:

- Consuming-project evidence — `self/field-reports/`.
- This repository's own analysis or retrospectives —
  `self/evaluations/`.
- This repository's session transcripts — `self/_transcripts/`.
- Anything with secrets, credentials, or personal data. **This
  repository is public** and `self/` is tracked; redact before
  filing, or do not file.

## Layout and naming

```text
self/inputs/
  README.md                     <- this file (lint-gated)
  YYYY-MM-DD-<topic>.<ext>      <- verbatim source material
```

- Dated by the day the material **arrived**, not the day the item
  that uses it is picked up.
- `<topic>` is lower-case kebab and names the material, not the
  ticket that consumes it — one input may outlive or feed several
  items.
- Any extension. Prefer the format it arrived in; do not convert a
  plain-text file to Markdown to make it look tidy.

## Filing rule

File verbatim. The only permitted change is mechanical
normalisation the quality gate requires — a terminating newline,
line endings — and any redaction, which must be noted in the
ticket that cites the file. Never edit the content to improve it:
the point of the tier is that the original survives.

## Lint status

Dated material here is cold — excluded from markdownlint, cspell,
and the docs-integrity checker, because material filed verbatim
carries foreign headings, spellings, and paths the gate cannot
check. The exclusions key on this tier's `YYYY-MM-DD-` naming
rule (`self/inputs/[0-9]*`), so **material is exempt and this
README stays gated**. Name files by the rule or they will be
linted like ordinary repository prose.

The exclusion was added when the first Markdown input arrived
(2026-08-27): it failed 14 markdownlint rules and 9 spellings, and
correcting either would have broken the filing rule. Changing the
tier's shape means updating `.markdownlint-cli2.jsonc`,
`.markdownlintignore`, `cspell.json`, and
`scripts/check-docs.mjs` in the same change
(`CONTRIBUTING.md` → "Configuration").

Every file here **is** checked by editorconfig-checker whatever
its extension — deliberately, since the filing rule already
permits mechanical normalisation. That is why a terminating
newline is allowed, and why line endings may be corrected.

This README is the tier's one gated file and is listed in
`self/project/file-map.md`.

## Read tier

Cold — never auto-read at session start (root `AGENTS.md` →
"Before every task"). Read when a backlog item cites the file, and
when scoping or building the item that consumes it.

## Contents

| File | Arrived | Supplied by | Consumed by |
| --- | --- | --- | --- |
| `2026-08-26-code-review-prompt.txt` | 2026-08-26 | Maintainer, from outside the project | `REVIEW-SUITE` — candidate basis for a deep code-review suite |
| `2026-08-27-read-only-repository-review-prompt.md` | 2026-08-27 | Maintainer, from outside the project | `READ-ONLY-AUDIT` — candidate basis for a read-only deep investigation verb; the larger sibling of the 2026-08-26 prompt |
| `2026-08-26-code-abstraction-prompt.txt` | 2026-08-26 | Maintainer, from outside the project | `ABSTRACTION-PLAN` — candidate basis for an abstraction and auditability planning function |
