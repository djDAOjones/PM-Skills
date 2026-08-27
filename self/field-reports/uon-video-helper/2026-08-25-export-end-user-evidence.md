<!-- field-report: project=uon-video-helper · date=2026-08-25 · type=export
     · pm-skills=4.9.2
     · source=repository deployment records and maintainer-operated pilot checks
     · redacted=3 email occurrence(s) to <redacted-email>
     · not-redacted=already-public personal names, public repository/account identifiers, commit hashes, workflow identifiers, and project facts -->

# UoN Video Helper end-user evidence export

## Evidence boundary

The repository records maintainer-operated checks of an unadvertised live pilot and its deployment path. It contains no analytics export, support thread, independent-user feedback, or evidence of adoption by people other than the maintainer.

<!-- FILE: README.md (status excerpt) -->

# UoN Video Helper

A browser-based tool that helps University of Nottingham staff prepare
educational video for publication: approved opening and closing branding,
consistent audio levels, and a correctly encoded MP4 — with no software to
install and **no media leaving the user's device**.

## Status

**Live as an unadvertised pilot**, built from `main` on every push. The MVP
shipped 2026-08-25: a real recording goes in and a branded, correctly-levelled
MP4 comes out, entirely on the user's device.

What it does NOT yet do is in [`pm_skills/project/backlog.md`](pm_skills/project/backlog.md).
Three things are worth knowing before using it in anger:

- **Firefox cannot make the audio, and is refused.** It has an `AudioEncoder`
  and rejects `mp4a.40.2` at every bitrate and channel count, so a video with
  sound is blocked before the job starts, with a message naming a browser that
  works. Silent sources still run there. Decided 2026-08-27: Firefox users are
  told to switch rather than served a different format — spec §6.1 says MP4,
  and a WebM/Opus path for them is iceboxed behind D11 (VH-49).
- **Opening sequences are withdrawn**, because no approved asset exists (VH-33).
- **All four closing choices are available** — clean cut, over the picture,
  over a freeze frame, or none. The two compositing modes were withdrawn in
  August for being wrong in Firefox; VH-44 fixed that by detecting the engine's
  behaviour rather than its name, and VH-46b put them back on 2026-08-27.


<!-- FILE: pm_skills/project/archive/trajectory/trajectory-0002-real-material-and-band-1.md (lines 76-115 at snapshot) -->

### Deployed, and verified in the browsers that mattered

The app went live at `djdaojones.github.io/UoN-Video-Helper/` on 2026-08-25 as
an unadvertised pilot; the intended home is an internal server. The WebCodecs
decision is what made GitHub Pages viable at all — no `SharedArrayBuffer`
means no COOP/COEP headers, which Pages cannot set.

Chrome 151 and Safari 26.5.2 both decode VP9 alpha, through the app's own
loader, so all three closing modes work in both. Firefox is still unchecked.
Both browsers independently return `drawImage -> R=202` on the premultiplied
onset, confirming that treating that colour as straight is standard canvas
behaviour rather than one engine's quirk — the CPU composite is necessary
everywhere, not a workaround for Chrome.

The first real job on the deployed site worked. It also exposed two things the
harness could not: the size estimate overstates by 3.6x (VH-31), and the
interface needs a deliberate design pass rather than tweaks (VH-32).

### All three engines verified — and they disagree

Firefox joined Chrome 151 and Safari 26.5.2 in decoding VP9 alpha through the
app's own loader. Decode is all that proved: VH-34 later measured the PIXELS
and found the two compositing modes wrong in Firefox (see below).

The same runs found something worth more than the pass. Compositing the onset
over white via `drawImage` returns 202 in Chrome and Safari but **255 in
Firefox**, on 152 and again on 154 two major versions later: the engines
genuinely disagree about whether a decoded frame's colour is premultiplied, and
it is not a regression on its way out. 255 is the correct answer, so Gecko is
the one in the right — but a composite that is correct in one engine and
double-darkened in the other two is unusable, and no `drawImage` call is
portable. Doing the blend on the CPU in `composite.ts` was chosen when only
Chrome had been measured, and it was right to move; it was not sufficient.

A smaller difference in the same output: asking for exactly t=0.40 s returned
the neighbouring frame in Firefox. Invisible at 40 ms, but a reminder not to
key logic off exact multiples of the frame period.

The deployed site was also confirmed working on a University machine, so
`github.io` is not filtered there — the last unknown in VH-14's technical half.

<!-- FILE: .github/workflows/deploy-pages.yml -->

# Deploys the app to GitHub Pages.
#
# The maintainer accepted a public site on 2026-08-25 for piloting — it is
# unadvertised, and the intended home is an internal server once this is ready
# to show. So `main` deploys automatically, with manual dispatch kept for
# re-running without a commit.
#
# The app processes video entirely on the viewer's device, so deploying it
# exposes no media. What deploying DOES expose is the branding assets and the
# tool itself.

name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

# Least privilege at the top, and the deploy credentials granted only to the
# job that deploys (VH-65). `build` runs `npm ci` and then the whole test
# suite, which is a lot of third-party code to hand a token that can publish to
# the University's pilot site. It needs to read the repository and nothing
# more.
permissions:
  contents: read

# Never publish two builds at once; let a queued run supersede a waiting one,
# but do not cancel one that is mid-deploy.
concurrency:
  group: pages
  cancel-in-progress: false

# Actions are pinned to commit SHAs, not to `v4`. A major-version tag is
# mutable: whoever controls it can move it to any commit, and that commit runs
# with this workflow's permissions on every push to `main` — which is this
# project's act of publishing. The version each SHA resolves to is named beside
# it, and the update route is to re-resolve the tag deliberately
# (`gh api repos/<owner>/<repo>/commits/<tag> --jq .sha`) rather than to let it
# drift.
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262 # v4.4.0

      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020 # v4.4.0
        with:
          node-version: 24
          cache: npm

      - run: npm ci

      # The full gate, not just a build. A deploy is the one place where
      # shipping a broken bundle is expensive to undo.
      - run: npm run check
        env:
          BASE_PATH: /${{ github.event.repository.name }}/

      # Derived from the repo name so a fork or a rename does not silently
      # produce a site whose asset URLs all 404.
      - run: npm run build
        env:
          BASE_PATH: /${{ github.event.repository.name }}/

      - uses: actions/configure-pages@983d7736d9b0ae728b81ab479565c72886d7745b # v5.0.0
      - uses: actions/upload-pages-artifact@56afc609e74202658d3ffba0e8f6dda462b719fa # v3.0.1
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    # The only job that needs these, and the only one that has them.
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@d6db90164ac5ed86f2b6aed7e0febac5b3c0c03e # v4.0.5


<!-- FILE: selected deployment and pilot commit records -->

commit 95d80214db5f5369f1b3e58b06a57082f5e803c4
Date: 2026-08-25T18:10:40+01:00

Make the build deployable to GitHub Pages

Pages is viable, and the WebCodecs decision is why: nothing uses
SharedArrayBuffer or crossOriginIsolated, so the app needs no COOP/COEP
headers - which Pages cannot set, and which would have made an
ffmpeg.wasm build impossible to host there without a service-worker
hack.

One thing did break. BRANDING_ASSET_BASE was the absolute '/branding',
and a project site serves from '/<repo>/', so every branding fetch
would have 404'd. It now derives from import.meta.env.BASE_URL, and
vite.config.ts takes `base` from BASE_PATH so local dev stays at '/'.
Verified against a real build: the worker bundle - which is what
actually fetches branding at runtime - carries
'UoN-Video-Helper/branding'.

The workflow is deliberately workflow_dispatch only. A Pages site on a
personal account is public and this one carries UoN branding, so the
first publish should be a decision rather than a side effect of a
commit. It runs the full gate before deploying, and derives the base
path from the repo name so a rename or fork cannot silently produce a
site whose asset URLs all 404.

VH-14 is no longer blocked on D5 for the technical work; what remains
is the hosting question itself, plus whether github.io is reachable
from a managed University machine.

Co-Authored-By: Claude Opus 5 <<redacted-email>>


commit e4df33e4f7f6dfe206aeb1a3a77b4a303adce06f
Date: 2026-08-25T18:22:20+01:00

Run real UoN material end to end, and enable deployment

The maintainer accepted a public pilot site, so main now deploys
automatically; manual dispatch stays for re-running without a commit.

Adds spike-real.html, which runs an actual recording through the whole
pipeline rather than a synthesised fixture - several §13 criteria are
recorded as "needs real material" for exactly that reason. First run,
on the Mac PowerPoint export: 214.8s in, 218.8s out, which is the 4.00s
hard-cut closing exactly, at 6.3x real time. That is also the first
real performance figure for VH-M2; an hour of that material would take
about ten minutes on this machine.

The new sample is a second PowerPoint family - macOS, Core Media
handler rather than Windows Media Foundation - and the most extreme
declared rate in the corpus: r_frame_rate 600/1, which is the 600Hz
timebase, not a frame rate. Its intervals genuinely alternate between
19 and 20 ticks because 30.303fps is not an integer tick count, so it
is the closest thing to real VFR here. The app still resolves it to
30.303030303030305 with min === max, which is the right answer since we
conform by timestamp.

It also has no audio stream at all. A silent briefing is most likely a
failed export - PowerPoint drops narration when timings and narrations
are excluded - which makes the §5.4 missing-audio warning a real safety
net. Three of twenty-two corpus files are now silent.

Quantifies the bitrate concern too: against this 2.08 Mbps source, the
preset named "smaller file" asks for 2.50 Mbps.

Co-Authored-By: Claude Opus 5 <<redacted-email>>


commit 666df437410adbdb7e104c08da7f51ad5208a170
Date: 2026-08-26T00:35:24+01:00

VH-39: make three stale claims read true

README said "Foundation set, build not started" on the front page of an app that has been live since 2026-08-25; it now says what the pilot is and names what is withdrawn from it. media/branding.ts described the transition modes as not built, two days after they shipped. And presets.ts commented avc1.640033 as level 4.2 where 0x33 is 51, i.e. level 5.1 — wrong in the direction that matters, because 4.2 tops out below the 4K sources spec 2 contains, so anyone trusting the comment would have "corrected" the string into refusing them.

Verify: typecheck 0 · docs:lint 0 · links 0 broken · check:memory 0 structural


commit 9f0c6a13c5dd01d882704b886824c3c349a64c01
Date: 2026-08-27T14:43:34+01:00

VH-65: the build job does not need to be able to publish

Every push to `main` deploys (VH-14), so this workflow IS the act of
publishing and its blast radius is the University's pilot site.

Top-level `permissions` applied to both jobs, so `build` — which runs
`npm ci` and then the entire test suite — held a token that could deploy.
That is a great deal of third-party code standing next to the publish
button. `contents: read` at the top; `pages: write` and `id-token: write`
on the `deploy` job alone.

A major-version tag is mutable. `actions/checkout@v4` is whatever that
tag points at today, and whoever controls it can move it to any commit,
which then runs on every push to `main` with this workflow's permissions.
Each action is now pinned to a resolved commit SHA with the version it is
named beside it, and the comment gives the command to re-resolve so an
update is a decision rather than a drift.

And the media guard scanned `public/spike/` only, so a recording copied
anywhere else under `public/` shipped. The fix is not a list of branding
filenames: a list must be updated whenever an asset is added, and the day
it is not is the day the guard stops guarding. Git already knows which
media belongs to this repository — the branding assets are tracked, a
lecture copied in by hand is not, wherever it was put. Outside a checkout
it falls back to the old directory rule rather than to trusting
everything.

Verified: an untracked MP4 in `public/assets/`, outside the only
directory the old guard looked at, fails the gate with exit 1 and names
the file.

npm run check: 418 passed, 1 skipped, 0 broken links.

Co-Authored-By: Claude Opus 5 <<redacted-email>>

