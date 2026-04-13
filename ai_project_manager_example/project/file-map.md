# File Map

## Entry point

- src/main.tsx — app entry, mounts React root
- src/App.tsx — root component, routing

## Core modules

- src/db/index.ts — Dexie database instance and schema
- src/db/recipes.ts — recipe CRUD operations
- src/db/tags.ts — tag CRUD operations
- src/types/recipe.ts — Recipe and Tag type definitions

## UI

- src/pages/Home.tsx — recipe list page
- src/pages/AddRecipe.tsx — add recipe form page
- src/pages/RecipeDetail.tsx — single recipe view
- src/components/RecipeCard.tsx — recipe summary card for list view
- src/components/RecipeForm.tsx — shared form for add and edit
- src/components/TagFilter.tsx — tag selection bar

## Config and constants

- tailwind.config.js — Tailwind theme and customization
- tsconfig.json — TypeScript config
- vite.config.ts — Vite config

## Tests

- src/db/__tests__/recipes.test.ts — recipe CRUD tests
- src/hooks/__tests__/use-recipes.test.ts — recipe hook tests

## Build and tooling

- package.json — dependencies and scripts
- .prettierrc — Prettier config
- .eslintrc.cjs — ESLint config
