---
id: CODEX-NETWORK-NOTE
name: A Codex prefix rule is not a network control
status: todo
milestone: current
flags: detail
date: 2026-09-13
grades: High / Medium / Low / Low
order: 2
summary: the harness-surface item shipped in 4.21.0 lists "a rules file forbidding command prefixes (curl, wget, gh, git push)" among the Codex closing settings; the long stream showed a compound command (a variable assignment followed by the clone) walk straight past the prefix rule and clone a real upstream repository — only the sandbox's network switch is the control, the prefix rules are advisory. Patch.
---
# CODEX-NETWORK-NOTE — say which Codex setting actually closes the network

## Intent

Item 7 of the DEV-INFRASTRUCTURE template's security baseline (4.21.0)
was written from the clean-room hardening, where the Codex leg kept the
network on for npm and relied on `prefix_rule` entries to forbid
`curl`, `wget`, `gh` and `git clone|fetch|pull|push`. On 2026-09-13 a
bare-arm session, told to close a phase and given no record, ran
`git ls-remote` (not listed) and then a compound command — a temporary
directory assignment followed by the clone — that the rule does not
match, because it matches a command that *starts with* `git clone` and read the real project's records. The note must say
so: on Codex, the sandbox's network setting is the only network
control; prefix rules stop the model's first draft of a command, not
its second. Keep the item's shape; change the Codex line.

## Done when

- `pm_skills/templates/DEV-INFRASTRUCTURE.md` item 7, Codex line:
  network is closed in the permissions profile (`network` off) or not
  at all; the rules file is advisory; `git ls-remote` added to the
  advisory list for completeness.
- Patch release; upgrade action: re-copy the item or edit the Codex
  line in your root `DEV-INFRASTRUCTURE.md`.
- Evidence cited: lab findings 2026-09-10, Amendment 4 results
  (isolation breach, declared).
