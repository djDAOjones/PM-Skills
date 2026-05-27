# Cascade Chat Conversation

  Note: _This is purely the output of the chat conversation and does not contain any raw data, codebase snippets, etc. used to generate the output._

### User Input

the pm-skils files are getting large. how might I theretically prune them and will it help reduce AI token usage? devise a plan, backup the existing files then implement, using the rogour from pm-skills, but not the human gating process.

some food for thought that you are free to ignore, from chatgpt:

it will help reduce AI token usage, but only if the large files are no longer read by default.

Right now the main token weight is not brief.md, architecture.md, or conventions.md. It is:

decision-log.md: ~58,830 words
backlog.md: ~24,825 words
file-map.md: ~14,089 words
all pm_skills/project/*.md: ~100,579 words total, roughly 120k-140k tokens if fully loaded
So yes: pruning could make a very real difference.

The best theoretical pruning model

Keep a small “hot memory” layer and move history into archives.

brief.md
Keep mostly as-is. It is compact and useful.

architecture.md
Keep current architecture only. Remove “May-2026 batch…” historical notes once they describe shipped work rather than live structure.

file-map.md
This is probably overgrown. It should be a map, not a changelog.

Better shape:

- `src/core/dot-grid.js` — source rasterisation and dot-grid generation.
  Notes: derived cache; text/image/composite paths; exports `computeUniformDotGrid`.
Move long implementation histories to decision-log/archive.

backlog.md
Keep only:

Active
Next
Parked/Future
maybe a short “Recently shipped” list
Move completed shipped FRs into pm_skills/project/archive/backlog-2026-05.md.

decision-log.md
Keep:

the latest 5-10 decisions
a short “decision index”
stable current decisions that agents still need
Move older full entries untouched into monthly archive files, e.g.

pm_skills/project/archive/decision-log-2026-04.md
pm_skills/project/archive/decision-log-2026-05.md
Important: preserve the append-only principle by moving whole old entries, not rewriting them.

The key extra bit

The biggest win would come from changing the read policy, not just shortening files. For example:

Always read: brief.md, architecture.md, conventions.md, file-map.md, backlog.md#Active
Read only when relevant: decision-log.md
Never read by default: archive/*
Otherwise, if AGENTS.md still tells agents to read giant files every task, the token savings will be limited.

My instinct: prune file-map.md first, then move shipped backlog items out, then archive old decision-log entries. That gets the biggest gain while keeping the project memory useful instead of amnesiac.

### Planner Response

I'll examine the pm_skills files, create a plan, back them up, and implement the pruning.

*Viewed [file-map.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/file-map.md) *

*Viewed [decision-log.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/decision-log.md) *

*Viewed [brief.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/brief.md) *

*Viewed [architecture.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/architecture.md) *

*Viewed [decision-log.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/decision-log.md) *

*Viewed [backlog.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/backlog.md) *

*Viewed [conventions.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/conventions.md) *

*Viewed [backlog.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/backlog.md) *

*Viewed [file-map.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/file-map.md) *

### Planner Response

Now I have the full picture. Let me create the plan, back up the files, and implement the pruning.

*Updated todo list*

*User accepted the command `mkdir -p "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backup-2026-05-26" && cp "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/"*.md "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backup-2026-05-26/" && ls -la "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backup-2026-05-26/" 2>&1 || echo "Backup check" 2>&1 && ls -la "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/"*.md 2>&1 | head -20 || echo "Source check" 2>&1 && ls -la "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/" 2>&1 || echo "Archive check" 2>&1 && ls -la "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/" 2>&1 | head -30 || echo "Project check" 2>&1 && find "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills" -type d 2>&1 | head -20 || echo "Dir check" 2>&1 && ls -la "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/" 2>&1 | head -30 || echo "PM check" 2>&1 && echo "---" && pwd 2>&1 || echo "PWD check" 2>&1 && ls -la "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/" 2>&1 || echo "Final check" 2>&1 && ls -la "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/" 2>&1 || echo "Archive final" 2>&1 && ls -la "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backup-2026-05-26/" 2>&1 || echo "Backup files" 2>&1 && find "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backup-2026-05-26/" -type f 2>&1 || echo "Backup find" 2>&1`*

*Checked command status*

### Planner Response

Backup complete. Now let me examine the decision-log structure to identify archive boundaries:

*Grep searched codebase*

*Viewed [backlog.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/backlog.md) *

*User accepted the command `wc -l -w "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/decision-log.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/file-map.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/brief.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/architecture.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/conventions.md"`*

*Viewed [backlog.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/backlog.md) *

*Checked command status*

*Viewed [backlog.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/backlog.md) *

*Grep searched codebase*

*Grep searched codebase*

### Planner Response

Now I have the full picture. Let me implement the pruning:

*Updated todo list*

*User accepted the command `mkdir -p "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive" && head -n 20 "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/file-map.md"`*

### Planner Response

Let me create the pruned file-map.md by extracting just the essential file descriptions without historical batch notes:

*Viewed [file-map.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/file-map.md) *

### Planner Response

Let me take a different approach. I'll create the archive files by extracting content, then rewrite the active files. First, let me identify the structure better:

*User accepted the command `grep -n "^## 2026-" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/decision-log.md" | head -30`*

*User accepted the command `grep -n "^## 2026-" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/decision-log.md" | tail -20`*

*User accepted the command `wc -l "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/decision-log.md" && tail -n +3379 "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/decision-log.md" | head -20`*

*User accepted the command `echo "# Decision Log Archive — April 2026 to mid-May 2026" > "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/decision-log-2026-04.md" && echo "" >> "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/decision-log-2026-04.md" && echo "<!-- Entries archived from decision-log.md on 2026-05-26 -->" >> "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/decision-log-2026-04.md" && echo "" >> "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/decision-log-2026-04.md" && tail -n +3379 "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/decision-log.md" >> "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/decision-log-2026-04.md" && wc -l -w "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/decision-log-2026-04.md"`*

*Checked command status*

*User accepted the command `head -n 3378 "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/decision-log.md" > "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/decision-log.md.tmp" && mv "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/decision-log.md.tmp" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/decision-log.md" && wc -l -w "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/decision-log.md"`*

*Checked command status*

### Planner Response

Now let me work on backlog.md - I'll archive the shipped items:

*Updated todo list*

*User accepted the command `grep -n "^- \[x\]" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md" | wc -l && grep -n "^- \[ \]" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md" | wc -l && grep -n "^- \[~\]" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md" | wc -l`*

*User accepted the command `head -n 25 "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md" && echo "---" && grep -n "^## " "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md"`*

*User accepted the command `cat > /tmp/prune_backlog.py << 'EOF'
import re

# Read the backlog file
with open("/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md", "r") as f:
    content = f.read()

# Extract the header (first 5 lines)
lines = content.split('\n')
header = '\n'.join(lines[:5])  # # Backlog + comment + blank + ## Active

# Pattern to match backlog items
# Items start with "- [ ]", "- [~]", or "- [x]" and continue until next item or section header
item_pattern = re.compile(r'^- \[([ ~x])\] \*\*([^*]+)\*\*', re.MULTILINE)
section_pattern = re.compile(r'^## ', re.MULTILINE)

todo_items = []
inprogress_items = []
shipped_items = []

# Find all items with their positions
matches = list(item_pattern.finditer(content))

for i, match in enumerate(matches):
    status = match.group(1)
    title = match.group(2)
    start = match.start()
    
    # Find the end of this item (start of next item or section)
    if i + 1 < len(matches):
        end = matches[i + 1].start()
    else:
        # Find next section header
        next_section = section_pattern.search(content, match.end())
        if next_section:
            end = next_section.start()
        else:
            end = len(content)
    
    item_text = content[start:end].strip()
    
    if status == ' ':
        todo_items.append(item_text)
    elif status == '~':
        inprogress_items.append(item_text)
    elif status == 'x':
        shipped_items.append(item_text)

# Write shipped archive
archive_header = """# Backlog Archive — Shipped Items

<!-- Items archived from backlog.md on 2026-05-26 -->

## Shipped (April–May 2026)

"""

with open("/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped.md", "w") as f:
    f.write(archive_header)
    f.write('\n\n'.join(shipped_items))

# Write pruned active backlog
pruned_content = header + '\n\n'

if inprogress_items:
    pruned_content += '\n\n'.join(inprogress_items) + '\n\n'

if todo_items:
    pruned_content += '\n\n'.join(todo_items) + '\n\n'

# Add minimal sections for the rest
pruned_content += """## Recently Shipped (summary)

See `archive/backlog-shipped.md` for full shipped-item history.

- MVP2: FR-BATCH-NAME1 + FR-BATCH-VID1 (batch export preset + video batch)
- MVP2: FR-VID1 + FR-SWA2 (trim drag preview + swarm seed)
- MVP1: FR-COL1 + FR-LINT1 (colour swap + lint cleanup)
- Video parity batch: EPIC SC (FR-SC1/2/3), FR-DOT1, FR-VID2/3/4, FR-IA1, FR-SWA1, FR-SWA3
- Export reliability: Batches 1–5 (telemetry, seek timeout, decoded-frame retrieval, streaming, clip-trim)

## Parked / Future

- FR-SWA-SEMI — Semi-swarm video mode (queued behind MVP2)
- FR-IA-SWARM — Move swarm into Animation; rename back to "Animation" (unscheduled)
- FR-ANIM1 — Video "Animate first and last frames" checkbox (deferred to EPIC ANIM Stage 2)
- Drone-swarm dot-style gaps — letter mode + rotation follow-up

## Milestone 2 — Authoring depth

Deferred to post-show roadmap.

## Milestone 3 — Scale and batch  

Deferred to post-show roadmap.

## Technical debt / deferred follow-ups

See archive for historical deferred items.

## Icebox

See archive for historical icebox items.
"""

with open("/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md", "w") as f:
    f.write(pruned_content)

print(f"Shipped items archived: {len(shipped_items)}")
print(f"Todo items kept: {len(todo_items)}")
print(f"In-progress items kept: {len(inprogress_items)}")
EOF
python3 /tmp/prune_backlog.py`*

*Checked command status*

*Checked command status*

*User accepted the command `pkill -f prune_backlog.py; echo "Killed if running"`*

*User accepted the command `echo "# Backlog Archive — Shipped Items

<!-- Items archived from backlog.md on 2026-05-26 -->

## Shipped (April–May 2026)

" > "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped.md" && grep "^- \[x\]" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md.backup" >> "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped.md" 2>/dev/null || grep "^- \[x\]" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md" >> "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped.md" && wc -l "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped.md"`*

*Checked command status*

### Planner Response

Let me take a more direct approach with the backlog pruning:

*Viewed [backlog.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/backlog.md) *

*Grep searched codebase*

*User accepted the command `head -n 23 "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md" > "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md.new" && sed -n '155,3145p' "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md" | grep "^- \[ \]" >> "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md.new" 2>&1 || echo "grep done" && wc -l "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md.new"`*

*User accepted the command `pkill -f "sed -n" 2>/dev/null; rm -f "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md.new" 2>/dev/null; echo "cleaned"`*

*Edited relevant file*

### Planner Response

The edit only replaced the first section. Let me truncate the rest of the file:

*Viewed [backlog.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/backlog.md) *

*User accepted the command `head -n 94 "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md" > "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.tmp" && mv "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.tmp" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md" && wc -l -w "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md"`*

*Checked command status*

### Planner Response

Backlog pruned from 3303 lines to 94 lines. Now let me create the shipped items archive and prune file-map.md:

*User accepted the command `cp "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backup-2026-05-26/backlog.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped.md" && echo "# Backlog Archive — Shipped Items" > "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped-header.md" && echo "" >> "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped-header.md" && echo "<!-- Full backlog from 2026-05-26 — 120+ shipped items with detailed descriptions -->" >> "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped-header.md" && echo "" >> "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped-header.md" && cat "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped-header.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped.md" > "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped-temp.md" && mv "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped-temp.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped.md" && rm -f "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped-header.md" && wc -l -w "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped.md"`*

*Checked command status*

### Planner Response

Now let me prune file-map.md. First, let me see its full structure:

*Viewed [file-map.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/file-map.md) *

### Planner Response

The file-map.md has extensive inline batch notes. Let me create a clean version:

*Updated todo list*

*User accepted the command `cp "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/file-map.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/file-map-2026-05-26-historical.md" && echo "# File Map\n\n<!-- Format: path — role or responsibility -->\n<!-- Update when files are created, renamed, or deleted. -->\n\n## Entry point\n\n- \`index.html\` — single HTML entry point, loads CSS and bundled JS\n- \`index.js\` — app bootstrap, initialises modules when DOM ready; state subscribers; undo/redo keybindings; export orchestration\n\n## Core modules\n\n- \`src/core/state.js\` — centralised immutable state store; path-based updates; filtered subscriptions; undo/redo integration\n- \`src/core/history.js\` — undo/redo snapshot stack; ring-buffer with coalesce window\n- \`src/core/dot-grid.js\` — source (text / image) → dot grid conversion; multi-line layout; exports \`computeUniformDotGrid\` for video layer\n- \`src/core/source-composite.js\` — per-frame composite canvas (image + text + video) for matrix-mode sampling\n- \`src/core/image-loader.js\` — async image decode + fit-canvas cache + pub/sub\n- \`src/core/easing.js\` — easing functions (linear, easeIn, easeOut, easeInOut)\n- \`src/core/animation-time.js\` — pure animation time model; timeline phases; pause-point warping\n- \`src/core/preview-loop.js\` — rAF preview loop factory; play/pause/seek/loop\n- \`src/core/persistence.js\` — localStorage auto-save + JSON save/load\n- \`src/core/modulation.js\` — modulation evaluator; ramps + LFOs + 12×5 matrix → per-target deltas\n- \`src/core/video-source.js\` — hidden video element + brightness sampler; seek with timeout; export frame source override\n- \`src/core/video-pixel-grid.js\` — Mode A: per-dot ring buffer + hysteresis for temporal averaging\n- \`src/core/video-drone-swarm.js\` — Mode B: persistent agent pool + spring physics for swarm behaviour\n- \`src/core/trim-window.js\` — clip-trim window resolver; sentinel (0,0) = full clip\n\n## Animations\n\n- \`src/animations/registry.js\` — animation type registry; mode/trajectory composite keys\n- \`src/animations/static.js\` — static fill (no animation)\n- \`src/animations/printer-reveal.js\` — legacy printer-reveal (back-compat only)\n- \`src/animations/letter-reveal.js\` — character-by-character reveal\n- \`src/animations/directional.js\` — six reveal fills (LR, RL, TB, BT, center-out, outside-in)\n- \`src/animations/flying.js\` — ten fly fills (nearest/furthest × LR/RL/TB/BT/from-viewer)\n- \`src/animations/random-reveal.js\` — random per-dot reveal via deterministic hash\n- \`src/animations/slide.js\` — four slide fills (LR, RL, TB, BT)\n- \`src/animations/slide-offset.js\` — pure helper: \`getSlideOffset(t, trajectory, w, h)\`\n- \`src/animations/print.js\` — dot-matrix-printer reveal mode\n- \`src/animations/lane-buckets.js\` — shared lane-binning helper with WeakMap cache\n- \`src/animations/loop.js\` — Loop animation mode with wrap + gap support\n\n## Renderer\n\n- \`src/renderer/webgl-renderer.js\` — WebGL 2 dual-mode renderer; instanced dots + grid shader; glow integration; two layer slots (text-image, video)\n- \`src/renderer/post-glow.js\` — post-process glow pipeline; scene FBO + blur + halo composite\n- \`src/renderer/shaders/dot.vert\` — vertex shader for instanced dots\n- \`src/renderer/shaders/dot.frag\` — fragment shader; unified shapeDist (line/polygon/circle) + letter-mode atlas\n- \`src/renderer/shaders/grid.vert\` — full-screen quad vertex\n- \`src/renderer/shaders/grid.frag\` — procedural dot grid fragment shader\n- \`src/renderer/shaders/post-quad.vert\` — post-process full-screen quad\n- \`src/renderer/shaders/glow-bright.frag\` — bright-pass extraction with soft-knee\n- \`src/renderer/shaders/glow-blur.frag\` — separable Gaussian blur\n- \`src/renderer/shaders/glow-composite.frag\` — halo composite (not cross-fade)\n- \`src/renderer/text-atlas.js\` — character texture atlas generation\n- \`src/renderer/renderer-utils.js\` — WebGL context + buffer helpers\n\n## Export\n\n- \`src/export/video-encoder.js\` — Mediabunny CanvasSource export; MP4 H.264 + transparent WebM VP9\n- \`src/export/fallback.js\` — MediaRecorder WebM fallback\n- \`src/export/png-export.js\` — single-frame PNG screenshot\n- \`src/export/gif-export.js\` — animated GIF export via gifenc\n- \`src/export/video-frame.js\` — shared per-frame video-source export helpers; streaming retrieval\n- \`src/export/video-frame-source.js\` — Mediabunny decoded-frame provider; \`canvasesAtTimestamps\` streaming\n- \`src/export/batch-export.js\` — batch-export coordinators (spreadsheet + video batch)\n- \`src/export/highres-still.js\` — high-resolution print PNG export\n- \`src/export/zip-writer.js\` — hand-rolled STORE-mode ZIP writer\n- \`src/export/export-session.js\` — export-session lock; UI freeze; renderer restore\n- \`src/export/export-telemetry.js\` — per-export timing recorder\n\n## UI\n\n- \`src/ui/app-shell.js\` — layout; 8 accordions; mount coordination\n- \`src/ui/text-input.js\` — text entry control; auto-grow textarea\n- \`src/ui/text-layout-controls.js\` — alignment + line-height controls\n- \`src/ui/image-input.js\` — image upload + fit + gamma + invert\n- \`src/ui/video-input.js\` — video upload + mode dropdown + trim slider + speed\n- \`src/ui/video-trim-slider.js\` — dual-handle range slider for clip trim\n- \`src/ui/canvas-drag.js\` — canvas pointer-drag for image reposition\n- \`src/ui/canvas-dropzone.js\` — drag-drop image upload overlay\n- \`src/ui/dot-controls.js\` — dot styling (colours, size, shape, star, rotation, letter mode)\n- \`src/ui/animation-controls.js\` — animation mode + trajectory + batch + pause-point controls\n- \`src/ui/modulation-controls.js\` — ramp/LFO/matrix UI; cell drag; normalised mode\n- \`src/ui/global-controls.js\` — animation duration, pre/post-roll, scale, glow\n- \`src/ui/export-controls.js\` — export menu + format dropdown + progress UI\n- \`src/ui/preview-controls.js\` — transport dock; play/pause/loop/mirror; progress bar; timecode\n- \`src/ui/playback-controller.js\` — adapter routing transport to animation loop or video source\n- \`src/ui/font-controls.js\` — font family dropdown + URL paste + size + fit-to-canvas\n- \`src/ui/save-load.js\` — save/load/reset header actions\n- \`src/ui/reset-modal.js\` — scope-selective reset dialog\n- \`src/ui/filename-modal.js\` — pre-download filename picker; session stem memory\n- \`src/ui/batch-export-modal.js\` — spreadsheet batch export modal\n- \`src/ui/batch-video-modal.js\` — video batch export modal\n- \`src/ui/highres-still-modal.js\` — print-width picker for high-res still\n\n## Config\n\n- \`src/config/constants.js\` — DEFAULT_STATE, limits, enums\n- \`src/config/fonts.js\` — curated Google Fonts list\n- \`src/config/presets.js\` — 8 factory preset generators\n- \`src/config/user-presets.js\` — user-preset CRUD over localStorage\n\n## Utils\n\n- \`src/utils/font-loader.js\` — CSS Font Loading API wrapper\n- \`src/utils/canvas-utils.js\` — offscreen canvas helpers\n- \`src/utils/dom.js\` — minimal DOM utilities (el, sliders, selects)\n\n## Styles\n\n- \`styles/tokens.css\` — Carbon + project design tokens\n- \`styles/layout.css\` — app shell grid layout\n- \`styles/controls.css\` — control panel styling (accordions, sliders, segmented controls)\n- \`styles/canvas.css\` — canvas/preview area styling\n" > "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/file-map.md" && wc -l -w "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/file-map.md"`*

*Checked command status*

### Planner Response

Excellent! file-map.md pruned from ~14K words to ~817 words. Now let me update AGENTS.md and verify the final state:

*Grep searched codebase*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Updated todo list*

*User accepted the command `echo "=== FINAL FILE SIZES ===" && wc -l -w "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/"*.md && echo "" && echo "=== ARCHIVE FILES ===" && ls -la "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/" && echo "" && echo "=== ARCHIVE SIZES ===" && wc -l -w "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/"*.md 2>/dev/null | head -10`*

*Checked command status*

*User accepted the command `echo "=== ACTIVE FILES (now small) ===" && wc -l -w "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/decision-log.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/file-map.md" && echo "" && echo "=== ARCHIVE FILES (historical) ===" && wc -l -w "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/backlog-shipped.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/decision-log-2026-04.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/file-map-2026-05-26-historical.md"`*

*Checked command status*

*User accepted the command `echo "ACTIVE pm_skills/project/*.md:" && for f in "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/"*.md; do wc -l -w "$f" | awk '{print $2 " words\t" $1 " lines\t" "$f"}'; done && echo "" && echo "ARCHIVE pm_skills/project/archive/*.md:" && for f in "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/archive/"*.md; do wc -l -w "$f" 2>/dev/null | awk '{print $2 " words\t" $1 " lines\t" "$f"}'; done 2>/dev/null | head -5`*

*User accepted the command `echo "=== ACTIVE FILES (read every task) ===" && wc -l -w "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/brief.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/architecture.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/conventions.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/file-map.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/decision-log.md" && echo "" && echo "ACTIVE TOTAL:" && cat "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/brief.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/architecture.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/conventions.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/file-map.md" "/Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe OE Drive/4_Work/2026-04-11 NTU Degree Show/Dot Matrix Tool/pm_skills/project/backlog.md" | wc -l -w`*

*Checked command status*

### Planner Response

Pruning complete. Here's the summary:

## Results

| File | Before | After | Change |
|------|--------|-------|--------|
| [backlog.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/backlog.md:0:0-0:0) | 3,303 lines / ~24,825 words | **94 lines / 672 words** | -97% |
| [decision-log.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/decision-log.md:0:0-0:0) | 8,858 lines / ~60,915 words | **3,378 lines / 22,806 words** | -63% |
| [file-map.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/file-map.md:0:0-0:0) | 139 lines / ~14,089 words | **116 lines / 817 words** | -94% |
| **Active total** (always read) | **~100,000 words** | **~4,300 words** | **-96%** |

## What Was Done

**1. Created Archives:**
- `pm_skills/project/archive/backup-2026-05-26/` — full backup of all files pre-pruning
- `pm_skills/project/archive/backlog-shipped.md` — 120 shipped items with full descriptions
- `pm_skills/project/archive/decision-log-2026-04.md` — April through mid-May 2026 decisions
- `pm_skills/project/archive/file-map-2026-05-26-historical.md` — original file-map with batch annotations

**2. Pruned Active Files:**
- [backlog.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/backlog.md:0:0-0:0) — kept only Active (todo/in-progress) + Recently Shipped summary + Parked/Future headers
- [decision-log.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/decision-log.md:0:0-0:0) — kept May 20-26, 2026 entries only (~10 recent decisions)
- [file-map.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/file-map.md:0:0-0:0) — stripped all inline "Batch X" and "May-2026" annotations, kept current structure only

**3. Updated [AGENTS.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/AGENTS.md:0:0-0:0) Read Policy:**
- Added explicit rule: "Read [decision-log.md](file:///Users/joe/Library/CloudStorage/OneDrive-OurWiltonTrust/_Joe%20OE%20Drive/4_Work/2026-04-11%20NTU%20Degree%20Show/Dot%20Matrix%20Tool/pm_skills/project/decision-log.md:0:0-0:0) only when the task involves design decisions or prior-choice context. Skip by default — it is large."
- Added explicit rule: "Never read `pm_skills/project/archive/*` by default."

## Token Impact

The always-read memory files dropped from ~100K words (~120K-140K tokens) to ~4K words (~5K tokens) — a **96% reduction** in baseline token consumption per task. The decision-log is now conditional (~23K words, ~28K tokens when read). Archives are excluded from default reads.