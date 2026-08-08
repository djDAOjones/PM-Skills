# Wish-list — pm-skills framework repository

<!-- Capture inbox for unscoped ideas. Cold tier — read only at triage
     (session-start Start B, or when the size check flags it).
     Promote into backlog.md or cut; no history kept here. -->

## Open

- Cross-ref `[security]` from the root `AGENTS.md` "Security baseline"
  playbook: state that a leaked-credential tracking item is flagged
  `[security]` on creation (ITEM-AGE open question 2; deferred — it's a
  root-template 3-way-merge change).
- Devin session shim: write and commit a real
  .devin/workflows/session.md (sibling of the Windsurf /next shim) —
  its untracked empty stub broke fresh clones via the file-map line,
  removed in GATE-FRESH (2026-08-08). Delete or fill the stray stub in
  any checkout that still has one, so regenerating the file-map does
  not re-add it.
