# Project Brief

## What are we building?

A personal recipe book web app. Users can add, edit, search, and
organize their own recipes. It should feel fast, minimal, and pleasant
to use on both desktop and mobile.

## Who is it for?

Home cooks who want a simple, private place to save recipes — not a
social platform or a recommendation engine. Just a personal collection.

## Platform and deployment

Web app, deployed as a static site with a lightweight backend or
local storage. Should work on all modern browsers, especially mobile
Safari and Chrome.

## Core features (v1)

- Add a recipe with title, ingredients, steps, and optional photo.
- Edit and delete existing recipes.
- Search recipes by title or ingredient.
- Tag recipes (e.g. "weeknight", "baking", "vegetarian").
- Filter by tag.

## Constraints

- Solo developer, building with AI assistance.
- Prefer minimal dependencies and a fast dev loop.
- Should work offline or with unreliable connectivity.
- No user accounts for v1 — single-user, local-first.
- Accessibility matters: good contrast, keyboard navigable, screen-reader friendly.

## Out of scope (for now)

- Multi-user / sharing.
- Meal planning or shopping lists.
- Recipe import from URLs.
- Hosting or deployment setup (handle separately).

## Open questions

- Should data live in localStorage, IndexedDB, or a file-based backend?
- Is a service worker worth the complexity for v1 offline support?
