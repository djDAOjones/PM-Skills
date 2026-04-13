# Conventions

## Code style

- Prettier with defaults. Single quotes, no semicolons, 2-space indent.
- ESLint with the recommended TypeScript config.
- Strict TypeScript — no `any` without a comment explaining why.

## Naming

- Files: kebab-case (`recipe-card.tsx`, `use-recipes.ts`).
- Components: PascalCase (`RecipeCard`, `TagFilter`).
- Hooks: camelCase with `use` prefix (`useRecipes`, `useSearch`).
- Types: PascalCase (`Recipe`, `Tag`).
- Database tables: camelCase (`recipes`, `tags`).

## Commit messages

- Format: `type: short description` (e.g. `feat: add tag filtering`).
- Types: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`.
- Keep commits small and focused on one change.

## Documentation

- JSDoc for all exported functions, hooks, and db/ methods.
- Document purpose, parameters, return values, and side effects.
- Explain why, not what. No boilerplate comments.

## Testing

- Vitest for unit tests.
- Test hooks and db/ functions. Components only if they have non-trivial logic.
- No coverage target for v1 — focus on testing the data layer.

## Patterns to follow

- All database access goes through db/. No raw IndexedDB calls elsewhere.
- Custom hooks are the data layer for components. Components don't call db/ directly.
- Keep components small. Extract when a component exceeds ~80 lines.

## Patterns to avoid

- No `useEffect` for data fetching — use Dexie's live queries via `useLiveQuery` instead.
- No prop drilling beyond two levels — extract a hook instead.
- No inline styles — use Tailwind classes.

## Tooling

- Bundler: Vite
- Test runner: Vitest
- Formatter: Prettier (config in `.prettierrc`)
- Linter: ESLint with TypeScript config
- Editor: `.editorconfig` for baseline formatting
