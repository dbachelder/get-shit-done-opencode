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

### In Progress (Phase 8 of UPSTREAM_PORT_PLAN.md)
- Phase 8.1: Merged cli-automation.md into checkpoints.md (DONE)
- Phase 8.2: Compressed scope-estimation.md (DONE)
- Phase 8.3-8.7: Remaining workflow updates and PROJECT.md evolution

### Recently Added
- `/gsd/add-issue` - Quick issue capture during execution
- Fixed progress table rendering (plain text instead of markdown pipes)
- Context reduction: checkpoints.md now includes automation reference (~70% smaller combined)
- Context reduction: scope-estimation.md compressed (~75% smaller)

### Known Issues
- None currently tracked

## Testing Changes

1. Install with `echo "1" | node bin/install.js --force`
2. Open a test project (or use `.planning/` in another repo)
3. Run the modified command
4. Check output renders correctly in terminal
