<!-- field-report: project=route-plotter · date=2026-08-27 · type=export
     · pm-skills=4.7.0
     · source=tracked release, deployment, build, and publication records through public snapshot 6f2ac154430be665a9cb1665a6f20d1b317990e0
     · redaction=0 checkout-path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=public GitHub account/URLs and public commit/asset integrity hashes retained; no direct user-behaviour evidence or unpublished identity is present -->

# Release and publication evidence

This repository contains release, deployment, build, and publication records. It contains no analytics or telemetry export, support thread, user-feedback record, attributed user issue report, or usability-study record. The evidence below establishes public availability and approved publication boundaries, not observed use by a person.

## Evidence inventory

| Source | Material date | Observable record |
| --- | --- | --- |
| `pm_skills/project/archive/decision-log-2026-08-17-to-2026-08-26.md`, source lines 696-705 | 2026-08-19 | Pages enabled from `main/docs`; v3.2.618 recorded live; frozen v2 retained |
| `pm_skills/project/archive/trajectory/trajectory-0002-2026-08-17-to-2026-08-19.md`, source lines 1-8 | 2026-08-19 | Release milestone and live URL |
| Commit `a43639673abb359e28c9470f5db38fc5942ee226` | 2026-08-19 | v3.2.618 deployment commit |
| Commit `2bc9fffdb4f5c6a7763477721a98fa709561b441` | 2026-08-26 | v3.2.619 Pages artefact committed on the review branch; not proof of live-source selection |
| `pm_skills/project/backlog.md`, source lines 39-45 | 2026-08-27 | Release remains owner-held; the live site remains v3.2.618 |
| `version.json` | 2026-08-27 | Current review-branch build identity; not live-deployment identity |
| `public-assets.json` | 2026-08-26 to 2026-08-27 | Owner-approved public images and generated example archives; source states no user data |

<!-- FILE: pm_skills/project/archive/decision-log-2026-08-17-to-2026-08-26.md -->
<!-- SOURCE-LINES: 696-705 -->

**Release:** version bumped 3.1 → 3.2 (AGENTS release rule); GitHub Pages
enabled on `route-plotter` (main, /docs) and v3.2.618 deployed —
**https://djdaojones.github.io/route-plotter/ is live** (player.js served
alongside, so exports work from the live site). The frozen v2 line stays
at router-plotter-02 for existing users. Docs refreshed: README, brief,
architecture, DEV-INFRASTRUCTURE (v3 URL + dual entry points), and the
owner-approved dev-guide reconciliation (§4/§7/§10 mixin split, §9 worker
removal, §3 build:deploy alias — doc-delta ticked). Decision-log archived
by month (2026-06, 2026-04 → archive/, INDEX.md created) per the
owner-approved budget split.

<!-- FILE: pm_skills/project/archive/trajectory/trajectory-0002-2026-08-17-to-2026-08-19.md -->
<!-- SOURCE-LINES: 1-8 -->

# Trajectory — archived epoch: v3.0 refactor milestone (2026-08-17 → 2026-08-19)

<!-- Archived from trajectory.md on 2026-08-27 (memory prune). Verbatim.
     Founding through Phase 5 parity & release; milestone CLOSED 2026-08-19. -->

## Phase 5 — parity & release (shipped 2026-08-19; PHASE 5 COMPLETE — v3.0 refactor milestone CLOSED)

Outcome: HTML exports run the app's real render stack — `src/player/PlayerApp.js` (bundled to `docs/player.js`, inlined into every export) replaces the 1,270-line template player; exports gain swarm layers and area highlights, preserve the authored timeline via the snapshot's `timingReference`, and render at export resolution. v3.2.618 released: GitHub Pages enabled — **https://djdaojones.github.io/route-plotter/ live** (v2 line stays up). Docs refreshed incl. the owner-approved dev-guide reconciliation; decision-log archived by month. See decision-log 2026-08-19 "Phase 5".

<!-- COMMIT: a43639673abb359e28c9470f5db38fc5942ee226 -->

commit a43639673abb359e28c9470f5db38fc5942ee226
Author: djDAOjones
Author date: 2026-08-19T09:45:00+01:00
Commit date: 2026-08-19T09:45:00+01:00
Subject: chore: deploy v3.2.618




<!-- COMMIT: 2bc9fffdb4f5c6a7763477721a98fa709561b441 -->

commit 2bc9fffdb4f5c6a7763477721a98fa709561b441
Author: djDAOjones
Author date: 2026-08-26T13:22:00+01:00
Commit date: 2026-08-26T13:22:00+01:00
Subject: chore: deploy v3.2.619

Generate the clean GitHub Pages /docs artifact from the reviewed source and remove stale files outside the deployment allowlist.

Verify: build 0 · cache references 0 · staged set docs/version only



<!-- FILE: pm_skills/project/backlog.md -->
<!-- SOURCE-LINES: 39-45 -->

- [ ] **DEPLOY-01 Release the remediation branch** · Release
  [blocked: owner calls the release] — The owner held the merge on 2026-08-27
  (`f1c14b9`): the live site stays on v3.2.618 until they call it. This ticket
  exists so RP-07's residual is tracked rather than forgotten, not to reopen
  the decision. When called: `review-remediation` is 41 commits ahead of
  `main`, which is what Pages serves. Also settle GitHub branch-protection and
  Pages permissions, which the review could inspect only from repository files.

<!-- FILE: version.json -->

{
  "build": 679,
  "lastUpdated": "2026-08-27T20:15:59.423Z"
}


<!-- FILE: public-assets.json -->

{
  "schemaVersion": 1,
  "approval": {
    "approvedOn": "2026-08-26",
    "approvedBy": "owner",
    "scope": "The exact bytes of the six listed built-in background images are approved for public publication."
  },
  "assets": [
    {
      "path": "images/Court.png",
      "sha256": "ff7a7436c6cf42afa9d8ee4a5d69d2c94de60f84fc920e58ec22d3fff1693bb5"
    },
    {
      "path": "images/Garlic.jpg",
      "sha256": "87031c28a3eb6788e9fddcf91393c6f0f80114da22a819a5f3bcaefe90dd5cc6"
    },
    {
      "path": "images/Nervous_System.jpg",
      "sha256": "25792a838d1a5ebb9d9457375d611198e7e0e6b383c0cf8cc88d1bcd11f1be05"
    },
    {
      "path": "images/PARM_Aerial.jpg",
      "sha256": "380a6ead0f0a8c179eeee798a835605e8416f1055354b26b6a17c3be22e996af"
    },
    {
      "path": "images/Rocketry.jpg",
      "sha256": "07e7cd19facb06dc9071929e21ec0130c266467fd9127e15634e2e9e71b05ec8"
    },
    {
      "path": "images/UoN_map.png",
      "sha256": "2951edd4fd35392948b337224e2820cc6ca64916ebded1f6beb7c789e85d0bea"
    }
  ],
  "exampleProjects": {
    "approvedOn": "2026-08-27",
    "approvedBy": "owner",
    "scope": "The three generated example project archives listed below may be published as downloadable project saves. Their only third-party content is one of the approved background images above, whose bytes are hash-verified separately; the routes, crowds and metadata are authored in src/examples/index.js and contain no user data.",
    "archives": [
      {
        "id": "parm-aerial-walk",
        "background": "images/PARM_Aerial.jpg"
      },
      {
        "id": "uon-open-day",
        "background": "images/UoN_map.png"
      },
      {
        "id": "nervous-system-flow",
        "background": "images/Nervous_System.jpg"
      }
    ]
  }
}

