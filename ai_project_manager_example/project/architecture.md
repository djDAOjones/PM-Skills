# Architecture

## Tech stack

- **React** — component model fits the UI, large ecosystem for quick solutions.
- **TypeScript** — catch errors early, better AI-assisted coding.
- **Vite** — fast dev server, simple config, good production builds.
- **Tailwind CSS** — utility-first styling, fast iteration without CSS files.
- **IndexedDB (via Dexie.js)** — structured local storage with good query support, no backend needed.

## Project structure

```text
src/
  components/       UI components (RecipeCard, RecipeForm, TagFilter, etc.)
  pages/            Route-level components (Home, RecipeDetail, AddRecipe)
  db/               Database layer (Dexie schema, queries)
  hooks/            Custom React hooks (useRecipes, useSearch, useTags)
  types/            TypeScript type definitions
  utils/            Shared helpers (formatting, validation)
  App.tsx           Root component and routing
  main.tsx          Entry point
public/
  index.html
```

## Key modules

- **db/** — owns all IndexedDB interaction. No other module writes to the database directly.
- **hooks/** — owns data fetching and state management for components. Calls into db/.
- **components/** — stateless or lightly stateful UI. Receives data via props or hooks.
- **pages/** — route-level composition. Wires hooks to components.

## Communication patterns

- Pages use hooks to get data and callbacks.
- Hooks call db/ functions and manage React state.
- Components receive props from pages. No direct db access from components.
- No global state store for v1. Hooks are the state layer.

## Dependency policy

- Prefer zero or small dependencies. Justify anything beyond React, Vite, Tailwind, and Dexie.
- No UI component library for v1 — hand-build with Tailwind.
- No state management library — hooks are sufficient at this scale.

## Dev workflow

- Install: `npm install`
- Dev: `npm run dev` → http://localhost:5173
- Build: `npm run build` → output in `dist/`
- Test: `npm test` (Vitest)
