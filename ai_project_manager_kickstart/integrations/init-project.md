---
description: Initialize a new project using the AI Project Manager framework
---

Guide the user through project initialization. Follow these steps in
order, writing files as you go. Present results for review at each
step before proceeding to the next.

1. Fill in the project brief.
   Ask the user the questions from
   `ai_project_manager_kickstart/project/brief.md` (what are we
   building, who is it for, platform, core features, constraints,
   out of scope, open questions).
   Write the answers to `ai_project_manager_kickstart/project/brief.md`.

2. Generate the architecture.
   Read `ai_project_manager_kickstart/project/brief.md`.
   Propose a tech stack, folder structure, key modules, communication
   patterns, dependency policy, dev workflow, and configuration
   strategy. Follow the template in
   `ai_project_manager_kickstart/project/architecture.md`.
   Present the proposal for review. After approval, write it to
   `ai_project_manager_kickstart/project/architecture.md`.

3. Generate the initial backlog.
   Read the brief and architecture.
   Propose 8–12 tasks grouped by milestone, ordered by dependency,
   small enough for a single session. Follow the template in
   `ai_project_manager_kickstart/project/backlog.md`.
   Present for review. After approval, write to
   `ai_project_manager_kickstart/project/backlog.md`.

4. Set initial conventions (optional).
   Ask the user if they have preferred code style, naming, commit
   format, testing, or documentation conventions. If yes, write to
   `ai_project_manager_kickstart/project/conventions.md`.
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
   detailed instructions in `ai_project_manager_kickstart/init.md`
   Step 6 for what each section needs.
   Present the populated version for review. After approval, write
   to `AGENTS.md`.

7. Populate UI-STANDARDS.md (if the project has UI).
   Read the brief, architecture, and `UI-STANDARDS.md`.
   Fill in the token systems section.
   Present for review. After approval, write to `UI-STANDARDS.md`.
   If no UI, tell the user this file can be removed.

8. Populate DEV-INFRASTRUCTURE.md (if the project has a build step).
   Read the brief, architecture, and `DEV-INFRASTRUCTURE.md`.
   Fill in every applicable `<!-- CUSTOMISE -->` placeholder.
   Present for review. After approval, write to
   `DEV-INFRASTRUCTURE.md`.
   If no build tooling, tell the user this file can be removed.

9. Copy Cascade workflow files.
   Copy `ai_project_manager_kickstart/integrations/init-project.md`
   to `.windsurf/workflows/init-project.md`.
   Copy `ai_project_manager_kickstart/integrations/feature.md`
   to `.windsurf/workflows/feature.md`.
   Copy `ai_project_manager_kickstart/scaffold/.editorconfig`
   to the project root (if applicable).

10. Readiness check.
    Confirm all required files are populated:
    - `ai_project_manager_kickstart/project/brief.md`
    - `ai_project_manager_kickstart/project/architecture.md`
    - `ai_project_manager_kickstart/project/backlog.md`
    - `README.md`
    - `AGENTS.md` (no remaining `[Project Name]` placeholder)
    - `UI-STANDARDS.md` (if applicable)
    - `DEV-INFRASTRUCTURE.md` (if applicable)
    Report what is complete and what is missing.
    If everything is ready, tell the user to pick their first task
    from the backlog and run `/feature` to start.
