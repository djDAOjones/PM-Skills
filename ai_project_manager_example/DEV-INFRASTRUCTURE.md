# Dev Infrastructure

## Package management

Package manager: **npm**

- `package.json` lives in the project root.
- **Runtime dependencies** require explicit approval. Allowed:
  React, React DOM, Dexie.js.
- **Dev dependencies** (Vite, Vitest, Tailwind, TypeScript, ESLint,
  Prettier) are pre-approved.
- Run `npm install` after cloning. Do not commit `node_modules/`.

---

## Canonical scripts

| Script | Command | Purpose | When to use |
| --- | --- | --- | --- |
| `dev` | `vite` | Dev server with hot reload | Day-to-day development |
| `build` | `tsc && vite build` | Type-check + production build | Before deploy |
| `preview` | `vite preview` | Preview production build locally | After build, before deploy |
| `test` | `vitest run` | Run tests once | After every change |
| `test:watch` | `vitest watch` | Tests in watch mode | During development |
| `lint` | `eslint src/` | Lint check | Before commit |

Do not add scripts without updating this table.

---

## Dev server

- **URL:** `http://localhost:5173`
- **Start:** `npm run dev`
- **Serves:** Source files via Vite's dev server with HMR
- **Hot reload:** Changes to `.tsx`, `.ts`, and `.css` files trigger
  instant hot module replacement.

All development and testing should use this URL.

---

## Build system

- **Bundler:** Vite (esbuild for dev, Rollup for production)
- **Entry point:** `src/main.tsx`
- **Output directory:** `dist/`
- **Format:** ESM
- **Source maps:** Enabled in dev, disabled in production
- **Minification:** Production builds only

The `dist/` directory is **read-only** — never hand-edit files in it.

---

## Version management

Managed via `package.json` version field. Bump manually using
semantic versioning:

- **patch** for bug fixes
- **minor** for new features
- **major** for breaking changes

---

## Deployment

Not configured for v1. The project builds to `dist/` and can be
deployed to any static hosting service (Netlify, Vercel, GitHub
Pages, etc.).

---

## Configuration strategy

- **Tailwind theme:** `tailwind.config.js` — all design tokens
  (colours, spacing, fonts) are defined here.
- **TypeScript:** `tsconfig.json` — strict mode, no `any` without
  justification.
- **Vite:** `vite.config.ts` — minimal config, plugins as needed.

Do not scatter theme values across component files. If a value might
need tuning, it belongs in the Tailwind config.

---

## Editor config

The project root contains `.editorconfig`:

- UTF-8 encoding, LF line endings
- 2-space indentation for all files
- Trailing whitespace trimmed (except in markdown)

Prettier handles additional formatting (single quotes, no semicolons).

---

## Files agents must not hand-edit

- `dist/` — build output, overwritten on every build.
- `node_modules/` — managed by npm.
- `package-lock.json` — managed by npm. Do not edit manually, but
  do commit it.
