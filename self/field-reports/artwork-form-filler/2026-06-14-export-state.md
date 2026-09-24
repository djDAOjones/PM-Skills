<!-- field-report: project=artwork-form-filler · date=2026-06-14 · type=export
     · pm-skills=2.2.1 (installed with the initial commit 2c02f80 on 2026-06-13; never upgraded)
     · source=Git blobs at 02d414590a5f4a66714be8764b0039a5e4e7bc7a for the harness and gate configuration the project carries (.editorconfig, .gitignore, package.json), taken 2026-09-24 by Claude Code (read from a scratch clone assembled from the remote and the checkout's objects, every ref set to its value at the cut-off 2026-09-24T11:40:00.000Z; content-addressed, so identical to the checkout's HEAD)
     · redaction=0 checkout path occurrence(s), 0 other-project path occurrence(s), 0 scratch path occurrence(s) and 0 other home-path occurrence(s) collapsed; 0 e-mail address(es) replaced; no credential-shaped values found
     · retained=names already present in the public repository retained; uncommitted memory, session logs and the bundle stay in the local lane -->

# State export

Snapshot: `02d414590a5f4a66714be8764b0039a5e4e7bc7a`.

| Path | Bytes |
| --- | ---: |
| `.editorconfig` | 260 |
| `.gitignore` | 186 |
| `package.json` | 666 |

<!-- FILE: .editorconfig -->

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

[*.json]
indent_size = 2

[*.{ts,tsx,js,jsx,html,css}]
indent_size = 2

<!-- FILE: .gitignore -->

# Dependencies
node_modules/

# Build output
dist/

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
*.swp
*.swo
*~

<!-- FILE: package.json -->

{
  "name": "artwork-form-filler",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "description": "Browser-only tool that fills a target shape with many source silhouette images.",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "bench": "vitest bench"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.6.3",
    "vite": "^5.4.11",
    "vitest": "^2.1.8"
  }
}

