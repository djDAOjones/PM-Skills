# Wish-list — pm-skills framework repository

<!-- Capture inbox for unscoped ideas. Cold tier — read only at triage
     (session-start Start B, or when the size check flags it).
     Promote into backlog.md or cut; no history kept here. -->

## Open

- Cross-ref `[security]` from the root `AGENTS.md` "Security baseline"
  playbook: state that a leaked-credential tracking item is flagged
  `[security]` on creation (ITEM-AGE open question 2; deferred — it's a
  root-template 3-way-merge change).
- rename "spike" to something more intuitively self indicative
- a backlog writing process that takes a list of ideas (or even loose conversational transcript) and produces a prioritized backlog with milestone and component tasks. this potentially includes a process to develop a sequence of backlog items that comprise a milestone.
- could there be a switchable mode to try and write the backlog based project plan to take advantage of anthropic API cache costs? worthwhile?
- check the commit and push workflow is working as intended. should the backlog creation process specify commits?
- is decision log etc long enough
- we have a documented example of using init and next commands against a good backlog. review this and evaluate how pm-skills performed
- add a backlog ticket writing command (I often offload this to a different agent i.e. codex plug in)
- commit and push at end of task should be unconditional, not maintainer-triggered/gated — it is always required, so make it a standard step of the close flow rather than something the maintainer has to ask for.
- prune is too repetitious: it trims to just below the trigger threshold, so another prune is due again almost immediately. Widen the gap between the prune-to target and the prune-trigger threshold so pruning fires less often. Scope what gap is optimal for productivity / compute value (cost of a prune pass vs. cost of carrying a larger file).
- Devin session shim: write and commit a real
  .devin/workflows/session.md (sibling of the Windsurf /next shim) —
  its untracked empty stub broke fresh clones via the file-map line,
  removed in GATE-FRESH (2026-08-08). Delete or fill the stray stub in
  any checkout that still has one, so regenerating the file-map does
  not re-add it.
>>>>>>> claude/pensive-tereshkova-dbda17
