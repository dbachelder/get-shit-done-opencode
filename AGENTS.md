# GSD Development

This repo contains the GSD (Get Shit Done) workflow system for OpenCode.

## Development Workflow

### Installing Changes

After modifying any workflow files, install to test:

```bash
echo "1" | node bin/install.js --force
```

This copies commands and skills to `~/.config/opencode/`.

### File Structure

```
command/gsd/          # Slash commands (user-facing entry points)
  ├── *.md            # Each file = one /gsd/command
  
gsd/
  ├── workflows/      # Reusable workflow definitions
  ├── templates/      # File templates for .planning/ structure
  └── references/     # Reference docs loaded by workflows
```

### Command vs Workflow

- **Commands** (`command/gsd/*.md`): Entry points invoked by user with `/gsd/name`
- **Workflows** (`gsd/workflows/*.md`): Shared logic included by commands

Commands should be thin wrappers that set context and delegate to workflows.

## Key Design Decisions

### Plain Text Tables (Not Markdown)

The `/gsd/progress` command uses plain text tables with fixed-width columns, NOT markdown pipe tables. Markdown tables render inconsistently and have caused crashes.

```
# Good - plain text with spaces
Phase                        Research  Context  Plans  Status
─────────────────────────────────────────────────────────────
  01 Foundation              -         ✓        2/2    complete

# Bad - markdown pipes
| Phase | Research | Context | Plans | Status |
|-------|----------|---------|-------|--------|
```

### Continuation Format

All commands end with a standardized "Next Up" block:

```
---

## ▶ Next Up

**Phase 2: Auth** — JWT with refresh tokens

`/gsd/plan-phase 2`

_(`/new` first for fresh context)_
```

### No HTML Tags

Avoid `<sub>`, `<sup>`, or other HTML in output - use markdown or plain text.

## Upstream Sync

**Upstream repo:** https://github.com/glittercowboy/get-shit-done
**Last synced:** 2025-12-29
**Synced through:** commit `51f3950` (v1.3.13)

When porting upstream changes:
1. Check UPSTREAM_PORT_PLAN.md for mapping
2. Adapt Claude-specific patterns to OpenCode
3. Update this file with sync info

## Current Work

### Completed (Phase 8 of UPSTREAM_PORT_PLAN.md)
All Phase 8 tasks complete:
- Phase 8.1: Merged cli-automation.md into checkpoints.md
- Phase 8.2: Compressed scope-estimation.md (~75% smaller)
- Phase 8.3: Removed redundant decision_gate from plan-phase.md
- Phase 8.4: Added explicit plan count check to execute-phase.md
- Phase 8.5: Evolutionary PROJECT.md system (new template + STATE.md updates)
- Phase 8.6: Verified codebase template file paths
- Phase 8.7: Updated sync info

### Recently Added
- **research-phase file write enforcement** - Made RESEARCH.md file creation mandatory with explicit "ACTION REQUIRED" language; LLM was presenting findings inline instead of writing to file
- **plan-phase/research-phase separation** - Added explicit guard to prevent plan-phase from drifting into research mode
- Evolutionary PROJECT.md - requirements tracking that evolves as you ship
- STATE.md now references PROJECT.md instead of copying immutable summary
- `/gsd/complete-milestone` now includes `evolve_project_full_review` step
- Context reduction: checkpoints.md includes automation reference (~70% smaller combined)
- Context reduction: scope-estimation.md compressed (~75% smaller)

### Known Issues
- None currently tracked

## Testing Changes

1. Install with `echo "1" | node bin/install.js --force`
2. Open a test project (or use `.planning/` in another repo)
3. Run the modified command
4. Check output renders correctly in terminal
