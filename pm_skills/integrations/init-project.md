---
description: Initialize a new project using PM Skills
---

Guide the user through project initialization. Follow these steps in
order, writing files as you go. Present results for review at each
step before proceeding to the next.

To gate only the foundation and then autonomously build the first-milestone
MVP, use `pm_skills/integrations/init-mvp.md` instead.

1. Fill in the project brief.
   Ask the user the questions from
   `pm_skills/project/brief.md` (what are we
   building, who is it for, platform, core features, constraints,
   out of scope, open questions).
   Write the answers to `pm_skills/project/brief.md`.

2. Generate the architecture.
   Read `pm_skills/project/brief.md`.
   Propose a tech stack, folder structure, key modules, communication
   patterns, dependency policy, dev workflow, and configuration
   strategy. Follow the template in
   `pm_skills/project/architecture.md`.
   Present the proposal for review. After approval, write it to
   `pm_skills/project/architecture.md`.

3. Generate the initial backlog.
   Read the brief and architecture.
   Propose 8–12 OPEN tasks grouped by milestone (Current / Next, plus
   an Icebox for deferred), ordered by dependency, small enough for a
   single session. Open work only — no Completed section. Use the
   ticket grammar in `pm_skills/project/backlog.md` (one line for quick
   items; an Intent / Done-when pair plus any [sign-off] / [blocked]
   flags for non-trivial ones) so intent survives later compression.
   Present for review. After approval, write to
   `pm_skills/project/backlog.md`.

4. Set initial conventions (optional).
   Ask the user if they have preferred code style, naming, commit
   format, testing, or documentation conventions. If yes, write to
   `pm_skills/project/conventions.md`.
   If unsure, skip — conventions will emerge during implementation.

5. Create a root README.md.
   Read the brief and architecture.
   Draft a concise project README with: one-paragraph description,
   how to run/build, key infrastructure, invariants, gotchas.
   Present for review. After approval, write to `README.md` in the
   project root.

6. Populate AGENTS.md.
   Read the brief, architecture, conventions (if exists), and
   `AGENTS.md`. Fill in every applicable `<!-- CUSTOMISE -->`
   placeholder using the information gathered so far. Follow the
   detailed instructions in `pm_skills/init.md` Step 6 for what
   each section needs. For shape examples (data model, protected
   infrastructure, event naming, persistence checklist, etc.),
   read `pm_skills/init.md` Appendix A.
   Present the populated version for review. After approval, write
   to `AGENTS.md`.

7. Populate UI-STANDARDS.md (if the project has UI).
   Read the brief, architecture, and `UI-STANDARDS.md`.
   Fill in the token systems section.
   Present for review. After approval, write to `UI-STANDARDS.md`.
   If no UI, tell the user this file can be removed.

8. Populate DEV-INFRASTRUCTURE.md (if the project has a build step).
   Read the brief, architecture, and `DEV-INFRASTRUCTURE.md`.
   Fill in every applicable `<!-- CUSTOMISE -->` placeholder, including
   the **Runtime lifecycle** section (the boot/reboot/recovery command
   surface, process ownership, health checks, and protected paths) and
   the **Maintainer diagnostics** section (structured logger, bounded
   buffer, global error capture, redacted copy bundle, dev-only gating),
   both scaled to the project. For shape examples per section, read
   `pm_skills/init.md` Appendix B.
   Present for review. After approval, write to
   `DEV-INFRASTRUCTURE.md`.
   If no build tooling, tell the user this file can be removed — but
   even a static site still documents how to run it in `README.md`.

9. Copy scaffold files.
   Copy `pm_skills/scaffold/.editorconfig`,
   `pm_skills/scaffold/.gitignore`,
   `pm_skills/scaffold/.markdownlint.json`, and
   `pm_skills/scaffold/check-links.mjs` to the project root if they
   don't already exist. The last two are the Markdown lint baseline
   (Node-based); drop them for a non-Markdown or non-Node project.

10. Readiness check.
    Confirm all required files are populated:
    - `pm_skills/project/brief.md`
    - `pm_skills/project/architecture.md`
    - `pm_skills/project/backlog.md`
    - `README.md`
    - `AGENTS.md` (no remaining `[Project Name]` or
      `[short product description]` placeholder)
    - `UI-STANDARDS.md` (if applicable)
    - `DEV-INFRASTRUCTURE.md` (if applicable)
    - Runtime lifecycle documented and the app boots to a verified-ready
      state via the canonical command (not just a launched process)
    - Maintainer diagnostics documented: uncaught errors are legible
      (a global error hook at minimum); if there is UI, a dev-only
      redacted copy-diagnostics affordance is planned
    - `.editorconfig`
    - `.gitignore`
    - `.markdownlint.json` + `check-links.mjs` (Markdown lint baseline,
      if the project keeps docs in Markdown)

    Run the placeholder lint:

    ```sh
    grep -nE '\[Project Name\]|\[short product description\]|<!-- CUSTOMISE' \
      AGENTS.md UI-STANDARDS.md DEV-INFRASTRUCTURE.md 2>/dev/null
    ```

    Review each hit with the user. Each remaining `<!-- CUSTOMISE -->`
    marker should either be populated or left as a deliberate
    "not applicable" stub. Bracketed `[placeholder]` strings should
    not remain in populated sections.

    Note: `pm_skills/project/wish-list.md` and
    `pm_skills/project/trajectory.md` ship empty (just their template
    headers) — they need no population at init. Don't flag them as
    missing or incomplete.

    Note: `pm_skills/project/archive/` should NOT exist yet — it is
    created lazily on the first run of
    `pm_skills/prompts/prune-memory.md`.

    Report what is complete and what is missing.
    If everything is ready, tell the user to pick their first task
    from the backlog.
