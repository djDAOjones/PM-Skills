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
- add a backlog ticket writing command (I often offload this to a different agent i.e. codex plug in)
- Investigate: an easier link between a backlog line and its ticket
  file. Today `[detail]` implies `tickets/<ID>.md` by convention with
  nothing to follow — consider a real link, or a generated index, so
  backlog → ticket is one hop.
- Investigate: the backlog is hard to understand at a glance. Review
  whether the problem is structure, item grammar, or density, and what
  would make the current state of work legible without opening tickets.
  Related to the item above — navigation and comprehension may be one
  fix or two.
- Ticket skeleton + Start B triage hook: a promoted wish-list line
  that has outgrown its line gets `tickets/<ID>.md` + `[detail]`
  before the line is deleted (TICKET-GEN finding 2026-08-16 —
  triage with the ticket-writing-command and backlog→ticket-link
  lines as one authoring cluster).
- Devin session shim: write and commit a real
  .devin/workflows/session.md (sibling of the Windsurf /next shim).
  The stray empty stub is gone from all known checkouts (canon
  2026-08-09 during MEM-CHECK, lab in LAB-SYNC) — write it for real
  or drop the idea.
