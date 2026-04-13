# Decision Log

## 2026-04-14 — Store photos as base64 in IndexedDB, not as file references

**Decision:** Recipe photos are stored as base64-encoded strings directly
in the IndexedDB recipe record.

**Rationale:** Avoids the complexity of a separate file storage layer.
IndexedDB handles blobs well enough at this scale. Photos are resized
client-side before storage to keep record sizes reasonable.

**Alternatives considered:**
- File System Access API: better for large files but poor browser support and more complex.
- Separate object store for blobs: cleaner separation but adds query complexity for a marginal benefit at this scale.

---

## 2026-04-12 — Use IndexedDB via Dexie.js instead of localStorage

**Decision:** Use Dexie.js as the storage layer.

**Rationale:** Recipes have structured data with relationships (tags).
IndexedDB supports indexes and queries. Dexie wraps it in a clean
Promise-based API with live query support for React. localStorage would
require manual serialization and has a ~5MB limit.

**Alternatives considered:**
- localStorage: simpler but limited capacity and no query support.
- SQLite via WASM: powerful but heavy dependency for a small app.
- Remote backend (Supabase, Firebase): adds complexity and removes offline-first simplicity.

---

## 2026-04-12 — Use Vite + React + TypeScript + Tailwind

**Decision:** Standard modern frontend stack with no backend for v1.

**Rationale:** Fast dev loop, good AI support, and the team (solo dev)
already knows React. Tailwind avoids the need for a component library
while keeping styling fast and consistent.

**Alternatives considered:**
- Next.js: overkill for a single-user local-first app with no SSR needs.
- Svelte: lighter but less ecosystem and AI training data.
- Plain HTML/CSS/JS: lower abstraction but slower to build interactive UI.
