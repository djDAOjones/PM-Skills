<!-- field-report: project=corperate-image-generator · date=2026-06-03 · type=export
     · pm-skills=2.2.0 (installed with the single commit ee49264 on 2026-06-03; never upgraded)
     · source=Git blobs at ee4926480fb0799239590817eea9753e9bad0d11 for the harness and gate configuration the project carries (.editorconfig, .gitignore, .markdownlintignore, package.json, tools), taken 2026-09-24 by Claude Code (read from a scratch clone assembled from the remote and the checkout's objects, every ref set to its value at the cut-off 2026-09-24T11:40:00.000Z; content-addressed, so identical to the checkout's HEAD)
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained; uncommitted work, session logs and the bundle stay in the local lane -->

# State export

Snapshot: `ee4926480fb0799239590817eea9753e9bad0d11`.

| Path | Bytes |
| --- | ---: |
| `.editorconfig` | 389 |
| `.gitignore` | 373 |
| `.markdownlintignore` | 254 |
| `package.json` | 528 |

<!-- FILE: .editorconfig -->

# EditorConfig — mechanical style enforcement at save time.
# See https://editorconfig.org

root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[*.{ts,js}]
indent_size = 2
quote_type = single

[*.json]
indent_size = 2

[*.{html,css}]
indent_size = 2

<!-- FILE: .gitignore -->

# Dependencies
node_modules/

# Build output
dist/
dist-ssr/
*.tsbuildinfo

# Vite / tooling caches
.vite/
coverage/

# OS files
.DS_Store
Thumbs.db

# Environment and secrets
.env
.env.local

# Logs
*.log
npm-debug.log*

# Editor state
.vscode/*
!.vscode/extensions.json
.idea/
*.swp
*.swo
*~

# Local session output (generated at runtime, not committed)
assets/sessions/

<!-- FILE: .markdownlintignore -->

# Prompt content files are injected verbatim into image prompts, not prose —
# they intentionally have no markdown headings.
assets/prompts/baseline-corporate-style.md

# Vendored framework docs (managed via the pm-skills upgrade workflow).
pm_skills/

<!-- FILE: package.json -->

{
  "name": "corporate-image-generator",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "description": "Local browser-based generative-art instrument: consumes the AI Jam Exhibition Art Wall and generates corporate-stock imagery via ComfyUI.",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "typescript": "^5.5.4",
    "vite": "^5.4.8",
    "vitest": "^2.1.2"
  }
}

