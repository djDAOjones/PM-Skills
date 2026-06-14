# Dev Infrastructure

<!-- NOTE: This file is a template. It contains CUSTOMISE placeholders
     that must be populated before it can serve as an authoritative reference.
     Complete the kickstart process (init.md Step 8) to fill them in.
     If this project has no build step, dev server, or package manager,
     this file can be removed from the boilerplate. -->

This file defines the permanent rules for how the project is built,
run, tested, versioned, and shipped. `AGENTS.md` references this file.
Read it before any task that involves the build system, dev server,
scripts, configuration, or deployment.

---

## Package management

<!-- CUSTOMISE: Define the package manager and dependency policy.
     See init.md Step 8 for example shape. -->

---

## Canonical scripts

<!-- CUSTOMISE: List every script in package.json as a table.
     See init.md Step 8 for example shape. -->

---

## Dev server

<!-- CUSTOMISE: Define the canonical dev URL, how to start it, and what
     it serves. See init.md Step 8 for example shape. -->

---

## Runtime lifecycle

<!-- CUSTOMISE: Define how to boot, reboot, inspect, and recover the app
     locally so the maintainer never has to remember ports, processes,
     env, generated outputs, or startup order. Implementation scales with
     complexity (see init.md Appendix B) — but the documented capability
     is required at every tier, even pure-static ("open this file" /
     "serve this directory"). Populate:
     1. Command surface — the canonical verbs this project implements
        (dev, reboot/dev:restart, boot, stop, status, logs, reset,
        reset:hard). Reference the Canonical scripts table above; don't
        duplicate it. dev + reboot is the minimum for a dev-server app.
     2. Canonical dev URL and port (cross-ref Dev server above).
     3. Runtime components started, and startup order if it matters.
     4. Process ownership — PID and log file locations (if any
        background processes).
     5. Env prerequisites and the .env workflow (composition, secrets
        sidecar, what is gitignored).
     6. Generated outputs cleaned/rebuilt by reboot/reset — the explicit
        allowlist of paths (never source, never persistent data).
     7. Health / readiness checks — the endpoint or signal that proves
        the app is READY, not merely that a process launched.
     8. Recovery playbook — the common "it's broken, get me back"
        commands.
     9. Exposure controls — flags that widen surface (public tunnel,
        LAN, operator/rehearsal modes) and the default (safe/local)
        posture.
     10. Protected paths scripts must never delete or hand-edit
         (cross-ref "Files agents must not hand-edit" below).

     Safety rules these scripts must honour: kill only owned
     processes/ports (no blanket killall); graceful shutdown before
     force; allowlist cleanup (never delete source); never wipe
     persistent data without an explicit reset:hard flag; never hide a
     failed health check (exit non-zero, print the log tail and next
     command); require an explicit flag + printed warning for anything
     that exposes a private or operator surface.

     If this project is pure static files with no runtime to manage,
     replace this section with the single command to view it, or remove
     it and cover "how to run" in README.md. -->

---

## Maintainer diagnostics

<!-- CUSTOMISE: Define how the app makes its own behaviour legible while
     it is being built, and how a maintainer hands a diagnostic snapshot
     to an AI agent. The goal is to collapse "reproduce -> open DevTools
     -> preserve logs -> copy the right messages -> paste" into "click ->
     copy -> paste". A page cannot read the browser's native DevTools
     console history, so diagnostics must flow through an app-owned logger
     and buffer, not the native console. Implementation scales with
     complexity (see init.md Appendix B) -- but the documented capability
     is required at every tier, even a static page (a global error hook +
     a console helper). Populate:
     1. Diagnostic logger -- the single structured entry point all notable
        runtime behaviour routes through (levels: debug / info / warn /
        error). It writes to the browser console AND a bounded in-memory
        ring buffer. No scattered ad-hoc console.log. The console is one
        output sink, not the store of record.
     2. Log record shape -- the local schema each entry carries. A lean
        default: time, level, scope, event, message, data, error (+ an
        optional interactionId to correlate one user action's logs). The
        OpenTelemetry log data model and W3C Trace Context inspire the
        shape; do not pull in those packages by default.
     3. Ring buffer -- bounded size (e.g. the last N entries; oldest
        evicted). This buffer, not the native console, is what the copy
        affordance reads from.
     4. Global capture -- window 'error' and 'unhandledrejection' hooks
        that funnel into the logger, so nothing fails silently.
     5. Copy-diagnostics bundle -- what the dev-only affordance copies
        (the control itself lives in UI-STANDARDS.md -> "Diagnostics
        affordance"). INCLUDE: app name / version / build, timestamp +
        timezone, current URL / route / view, user agent + viewport,
        dev-mode / feature flags, the last N redacted log entries,
        uncaught errors and rejections, recent network failures if
        tracked, recent interaction IDs, and a redaction notice. EXCLUDE
        by default: passwords, tokens, cookies, raw request bodies, full
        local / sessionStorage, secret env values, and personal data
        unless explicitly safe.
     6. Redaction -- the default-on filter applied before anything is
        logged or copied. Redaction is a safety invariant, not a
        nice-to-have (see AGENTS.md -> "Self-explaining runtime" and the
        OWASP logging guidance it follows).
     7. Environment gating -- the diagnostics affordance and verbose
        levels are DEV-ONLY by default. Production requires an explicit
        opt-in AND a redaction review; name the flag and its default here.
     8. Optional: forward to the dev / server console -- e.g. Vite's
        server.forwardConsole forwards browser runtime events (errors and
        selected console levels) to the dev server so a coding agent sees
        them automatically. Name the mechanism your stack offers, or n/a.

     Safety rules these mechanisms must honour: redact by default and fail
     closed (when unsure whether a field is sensitive, omit it); never
     enable the copy affordance or verbose logging in production without an
     explicit flag plus a reviewed redaction notice; keep the logger
     quietable / removable from one place; and do not log inside hot loops
     in a way that floods the buffer.

     Tiered shape (populate only the tier this project is at):
     - Tier 0 (static / no-UI / scripts): a console log helper with
       consistent levels + a global error / unhandledrejection hook. No
       buffer, no panel. Floor: uncaught errors are legible.
     - Tier 1 (typical dev-server app): logger -> console + bounded ring
       buffer + global capture + a dev-only copy-diagnostics affordance
       that copies the redacted bundle above.
     - Tier 2 (operator-facing / multi-surface): add interactionId
       correlation, recent network-failure capture, User Timing marks /
       measures for slow operations, and optional forward-to-server.

     If this project is pure static files with nothing to instrument,
     collapse this section to one line -- e.g. "Tier 0: errors logged via
     a console helper; no copy affordance" -- or remove it. -->

---

## Build system

<!-- CUSTOMISE: Define bundler, entry point, output directory, source
     maps, minification, and static-file handling. State that the output
     directory is read-only. See init.md Step 8 for example shape. -->

---

## Version management

<!-- CUSTOMISE: Define the versioning scheme, sources, and bump rules.
     See init.md Step 8 for example shape. -->

---

## Deployment

<!-- CUSTOMISE: Define the deploy target, pipeline, and post-deploy
     verification. See init.md Step 8 for example shape. -->

---

## Utility scripts

<!-- CUSTOMISE: Describe helper scripts beyond the standard dev/build/test
     cycle. See init.md Step 8 for example shape. -->

---

## Configuration strategy

<!-- CUSTOMISE: Define where tuneable values, tokens, and user-facing
     config live. See init.md Step 8 for example shape. -->

---

## Editor config

<!-- CUSTOMISE: If the project uses .editorconfig, describe what it
     enforces. Copy `pm_skills/scaffold/.editorconfig` to the project
     root if one does not already exist. -->

---

## Files agents must not hand-edit

<!-- CUSTOMISE: List concrete paths agents must never hand-edit
     (build output, lockfiles, generated version files, etc.). -->
