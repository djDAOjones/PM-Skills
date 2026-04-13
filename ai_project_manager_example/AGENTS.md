# AI Agent Rules

## Product identity

**Recipe Book** — A personal recipe book web app for home cooks.
Users add, edit, search, and organise their own recipes. Local-first,
single-user, no backend for v1. The canonical mental model is a
personal notebook, not a social platform or recommendation engine.

---

## Who you are working with

The maintainer is a vibe coder who owns macro structure, UX direction,
and conceptual design — but not deep implementation. Do the work; don't
explain concepts back unless asked.

---

## Before every task

1. Read `README.md` (architecture, key infrastructure, invariants,
   gotchas).
2. Read the project memory files in `ai_project_manager_kickstart/project/`:
   `brief.md`, `architecture.md`, `conventions.md` (if it exists),
   `file-map.md`, and `backlog.md`.
3. Read `UI-STANDARDS.md` for any task that touches UI, controls,
   layout, text, states, accessibility, or user-facing behaviour.
4. Read `DEV-INFRASTRUCTURE.md` (if it exists) for build, dev server,
   versioning, and script conventions.
5. For non-trivial work, run the `/feature-scoping` workflow (or
   follow the 4-stage prompt sequence in `prompts/`:
   `scoping.md` → `design-options.md` → `implementation-plan.md` →
   `validation.md`). Get user sign-off on scope before writing code.
   For small tasks, use `prompts/quick-task.md` instead.
6. Search the full source tree before proposing changes. Check for
   existing tuneable values and UI controls before adding new ones.

---

## Hard rules (invariants)

These apply unconditionally to every change.

- **All imports at the top of the file.** Mid-file imports break
  bundlers.
- **Build output directories are read-only.** Never hand-edit files
  in `dist/`.
- **Minimal runtime dependencies.** Do not add packages without
  explicit approval. Allowed: React, Dexie.js, Tailwind CSS.
- **Tailwind-first UI.** All styling uses Tailwind utility classes.
  No inline styles. No separate CSS files unless absolutely necessary.
- **WCAG 2.2 AAA by default.** 7:1 text contrast for normal text,
  ≥ 44 × 44 CSS px pointer targets, visible focus rings, no
  colour-only meaning.
- **All database access through db/.** No raw IndexedDB calls from
  components, hooks, or pages.

---

## Core data model

The canonical model is:

- **`Recipe`** — id, title, ingredients (string[]), steps (string[]),
  tags (string[]), photo (base64 string | null), createdAt, updatedAt.
- **`Tag`** — id, name. Tags are shared across recipes.

Do **not** introduce a separate "ingredient" entity or normalise
ingredients into their own table. Keep recipes self-contained for v1.

---

## Event naming convention

Not applicable for v1. Communication is via React hooks and props,
not a pub-sub event system.

---

## UI, usability, and accessibility (summary)

Full rules are in `UI-STANDARDS.md`. The key principles are:

- **Tailwind utility classes for all styling.** Consistent spacing,
  colour, and typography via the Tailwind theme.
- **WCAG 2.2 AAA by default, exceptions documented.** 7:1 contrast,
  44 px targets, keyboard operability, no colour-only meaning, visible
  focus, semantic HTML first.
- **Nielsen heuristics are hard rules, not aspirations.**
- **Design review gate.** Every UI-affecting change must pass the
  checklist in `UI-STANDARDS.md` before sign-off.

---

## Minimal change discipline

- Don't reorganise code you weren't asked to touch.
- Don't add or remove comments in code you weren't asked to touch.
  New code should follow the documentation rules below.
- Don't introduce new abstractions for a single use case.
- Match existing style (indent size, quote style, semicolons, etc.).
- Avoid speculative abstractions unless there is duplication, unstable
  logic, or a clear reuse case.

---

## Code documentation

- JSDoc for all exported functions, hooks, and db/ methods.
- Document purpose, parameters, return values, and side effects.
- Comments are for future humans and AI agents. Write them to provide
  context that is not obvious from the code alone.
- Do not add boilerplate or redundant comments that restate the code.

---

## Testing

- Vitest for unit tests.
- Test hooks and db/ functions. Components only if they have
  non-trivial logic.
- No coverage target for v1 — focus on testing the data layer.
- Run `npm test` after every change.

---

## Files to never edit

- `dist/` — build output, overwritten on every build.
- `node_modules/` — managed by npm.

See `DEV-INFRASTRUCTURE.md` for the concrete list of protected paths.

---

## Persistence checklist

When adding any property that should survive reload:

1. Default in the Recipe or Tag type definition.
2. Include in the Dexie schema if it needs indexing.
3. Handle in any import/export functions with fallback default.
4. Verify it persists correctly in IndexedDB via the db/ layer.

---

## Document ownership

Project knowledge is split across these layers:

- **`AGENTS.md`** — permanent hard rules, invariants, data model
  contracts, and anti-patterns.
- **`UI-STANDARDS.md`** — permanent UI, accessibility, and usability
  rules.
- **`DEV-INFRASTRUCTURE.md`** — permanent build, dev server,
  versioning, and script conventions.
- **`project/` memory files** — living project context: brief,
  architecture, backlog, file map, conventions, and decision log.

---

## Anti-patterns to reject

If you find yourself doing any of these, stop and reconsider:

- Accessing IndexedDB from components or pages instead of through db/.
- Using `useEffect` for data fetching instead of Dexie's `useLiveQuery`.
- Prop drilling beyond two levels instead of extracting a hook.
- Using inline styles instead of Tailwind classes.
- Adding runtime dependencies without explicit approval.
- Hard-coding values that should be in the Tailwind theme config.
