# GSD (OC Edition) Integration

This project uses the Get Shit Done workflow for spec-driven development.

## Upstream Sync

**Last synced:** 2025-12-17
**Upstream repo:** https://github.com/glittercowboy/get-shit-done
**Synced through commit:** `e409c7f` (all commits from `484257a` through `e409c7f`)

Key upstream changes ported:
- Removed `research-project` command (over-engineered, use `research-phase` instead)
- Added `map-codebase` command for brownfield projects
- Added 7 codebase templates (STACK, ARCHITECTURE, STRUCTURE, CONVENTIONS, TESTING, INTEGRATIONS, CONCERNS)
- Integrated brownfield support into `new-project`, `plan-phase`, `execute-phase`
- Updated continuation UI format (`## ▶ Next Up` with inline backticks)

## Quick Start

Run `/gsd/help` for all commands, or:

**For new (greenfield) projects:**
1. `/gsd/new-project` - Define what you're building
2. `/gsd/create-roadmap` - Plan phases
3. `/gsd/plan-phase 1` - Create executable plan
4. `/gsd/execute-plan` - Build it
5. `/gsd/progress` - Check status

**For existing (brownfield) projects:**
1. `/gsd/map-codebase` - Analyze existing code first
2. `/gsd/new-project` - Define what you're adding (will detect existing code)
3. Continue as above...

## Key Concepts

- **PROJECT.md** - Your vision and constraints (created once)
- **ROADMAP.md** - Milestones and phases
- **STATE.md** - Current position and accumulated context
- **PLAN.md** - Executable task list (2-3 tasks each)
- **codebase/*.md** - Codebase documentation (brownfield projects)

All files live in `.planning/` directory.

## Research with Context7

When researching, use Context7 MCP for live documentation:

```
mcp__context7__resolve-library-id with libraryName: "next.js"
mcp__context7__get-library-docs with the resolved ID
```

Or use the research command for comprehensive ecosystem research:

- `/gsd/research-phase` - Research how to implement a phase (for niche/complex domains)

## Brownfield Support

For existing codebases, `/gsd/map-codebase` creates structured documentation:

```
.planning/codebase/
├── STACK.md          # Languages, frameworks, dependencies
├── ARCHITECTURE.md   # System design, patterns, data flow
├── STRUCTURE.md      # Directory layout, module organization
├── CONVENTIONS.md    # Code style, naming patterns
├── TESTING.md        # Test structure, coverage
├── INTEGRATIONS.md   # APIs, databases, external services
└── CONCERNS.md       # Technical debt, risks, issues
```

These docs are automatically loaded during planning based on phase type.

## Task Tracking

GSD uses `.planning/STATE.md` for cross-session project state.
OpenCode's `todowrite`/`todoread` handles session-level task tracking.

## Workflow Commands

| Phase | Commands |
|-------|----------|
| Setup | `map-codebase` (brownfield), `new-project`, `create-roadmap` |
| Planning | `plan-phase`, `discuss-phase`, `research-phase`, `list-phase-assumptions` |
| Execution | `execute-plan`, `progress` |
| Adjustments | `add-phase`, `insert-phase`, `consider-issues` |
| Milestones | `complete-milestone`, `new-milestone`, `discuss-milestone` |
| Session | `pause-work`, `resume-work` |

## Continuation Format

Commands end with a standardized "Next Up" block:

```
---

## ▶ Next Up

**Phase 2: Authentication** — JWT login with refresh tokens

`/gsd/plan-phase 2`

<sub>`/clear` first → fresh context window</sub>

---
```

This format shows what's next with context, not just a command path.
