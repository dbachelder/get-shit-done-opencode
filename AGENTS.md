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

_(`/clear` first for fresh context)_
```

### No HTML Tags

Avoid `<sub>`, `<sup>`, or other HTML in output - use markdown or plain text.

## Upstream Sync

**Upstream repo:** https://github.com/glittercowboy/get-shit-done
**Last synced:** 2025-12-17
**Synced through:** commit `e409c7f`

When porting upstream changes:
1. Check UPSTREAM_PORT_PLAN.md for mapping
2. Adapt Claude-specific patterns to OpenCode
3. Update AGENTS.sample.md with sync info

## Current Work

### Recently Added
- `/gsd/add-issue` - Quick issue capture during execution
- Fixed progress table rendering (plain text instead of markdown pipes)

### Known Issues
- None currently tracked

## Testing Changes

1. Install with `echo "1" | node bin/install.js --force`
2. Open a test project (or use `.planning/` in another repo)
3. Run the modified command
4. Check output renders correctly in terminal
