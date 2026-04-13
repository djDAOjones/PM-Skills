# Recipe Book

A personal recipe book web app for home cooks. Add, edit, search, and
organise recipes in a fast, minimal, local-first interface.

## Quick start

```sh
git clone <repo-url>
cd recipe-book
npm install
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173).

```sh
npm run build     # Production build → dist/
npm test          # Run tests (Vitest)
```

## Key infrastructure

- **src/db/** — all IndexedDB access via Dexie.js. No other module
  writes to the database directly.
- **src/hooks/** — custom React hooks that are the data layer for
  components. Call db/ functions, manage React state.
- **src/components/** — reusable UI components. Receive data via
  props or hooks.
- **src/pages/** — route-level composition. Wire hooks to components.

## Invariants

- All database access goes through `src/db/`.
- All styling uses Tailwind utility classes — no inline styles.
- WCAG 2.2 AAA target: 7:1 contrast, 44px targets, keyboard
  navigable, screen-reader friendly.
- No runtime dependencies beyond React, Dexie.js, and Tailwind.

## Gotchas

- Photos are stored as base64 in IndexedDB, not as file references.
  Resize client-side before storage.
- No backend for v1. All data lives in the browser's IndexedDB.
