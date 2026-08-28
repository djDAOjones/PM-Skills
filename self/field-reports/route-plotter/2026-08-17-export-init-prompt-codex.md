<!-- field-report: project=route-plotter · date=2026-08-17 · type=export
     · pm-skills=4.7.0
     · source=original v3 brief from framework-install commit 599407f4b5b4b62e304bb47a807295761ee6b588
     · redaction=none required; scan found 0 absolute checkout/home paths, 0 e-mail addresses, 0 private-key blocks, and 0 credential-shaped tokens
     · retained=already-public Gary Priestnall name, project/framework names, commit identifiers, and other tracked identifiers retained -->

# Initialization evidence: original v3 brief

No project-initialisation prompt was found. This is the original 1,588-byte v3 brief as ported by the fresh PM-Skills 4.7.0 installation commit; the current expanded brief is separately present in the live memory export. Source blob SHA-256: `7538005b91ae1ad7a513591c3af1db384d9e7706646ae25e8d2e3bff93ece945`.

<!-- FILE: pm_skills/project/brief.md -->
<!-- SOURCE-REVISION: 599407f4b5b4b62e304bb47a807295761ee6b588 -->

# Project Brief

## What are we building?

Route Plotter — an animated route editor for maps and images. Users drop
in a background image, click to place waypoints, configure styles and
timing, and export as MP4, WebM, or a self-contained HTML file.

## Who is it for?

University educators and presentation makers who need animated map or
image overlays showing routes, processes, or sequences. Primary user:
Gary Priestnall, University of Nottingham (geography/cartography).

## Platform and deployment

Web app. Single-page, client-side only. No server. Deployed via GitHub
Pages from `docs/` on `main` branch.

## Core features (v1)

- Drag-and-drop background images with waypoint placement (major + minor)
- Catmull-Rom spline path with per-segment speed control
- Per-waypoint markers, beacons, text labels, area highlights, camera zoom
- Multiple visibility modes (path, waypoint, background)
- Video export (MP4/WebM via WebCodecs) and self-contained HTML export
- Auto-save to localStorage, project save/load as ZIP

## Constraints

- Pure JavaScript, no frameworks. Single runtime dependency: mediabunny.
- Canvas 2D rendering.
- npm + esbuild for bundling, Vitest for testing.
- WCAG 2.2 AAA accessibility.
- IBM Carbon Design System for UI patterns (implemented, not installed).
- Okabe-Ito colour-blind safe palette for map data.
- UoN semantic design tokens for UI chrome.

## Out of scope (for now)

- Server-side storage or user accounts
- Multi-user collaboration
- GIS integration or georeferencing
- Mobile-native apps

## Open questions

- None currently blocking.
