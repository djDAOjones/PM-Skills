---
id: HARNESS-ISOLATION-NOTE
name: Tell consuming projects what their harness exposes by default
status: todo
milestone: current
flags: detail
date: 2026-09-11
grades: High / Medium / Low / Low
order: 2
summary: add a "Harness surface" subsection to the DEV-INFRASTRUCTURE template's security baseline — what Codex (connector apps on by default, 126 tools incl. GitHub write), Claude Code (Task, cloud-session trigger, WebFetch) and Devin Local (web tools not deniable) expose, and the three settings that close it — from the clean-room hardening record. Minor release.
---
# HARNESS-ISOLATION-NOTE — what the harness exposes, and how to close it

## Intent

Hardening the clean-room found surfaces a consuming project would not
expect: Codex Desktop/CLI enable "apps" by default, which put 126
ChatGPT connector tools — GitHub create-commit, merge-pull-request,
site deploy — in front of the agent; Claude Code exposes subagents,
a cloud-session trigger and web tools unless denied; Devin Local's web
tools cannot be denied by name; sibling checkouts are readable on all
three. None of this is in the template a project copies. Add a short
"Harness surface" subsection to the security baseline: the three
harnesses, what each exposes, and the setting that closes each
(Codex `[features] apps = false` and a permissions profile; Claude
Code `permissions.deny` plus `sandbox.filesystem.denyRead`; Devin
`permissions.deny` for reads and exec, web declared as a residual).

## Done when

- `pm_skills/templates/DEV-INFRASTRUCTURE.md` → "Security baseline"
  gains "Harness surface" (a table and three settings), evidence
  dated 2026-09-10.
- Minor release (new template section), CHANGELOG upgrade action
  "re-copy the template or add the subsection".
