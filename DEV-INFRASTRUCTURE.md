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
