# GSD (OC Edition) Integration

This project uses the Get Shit Done workflow for spec-driven development.

## Quick Start

Run `/gsd/help` for all commands, or:

1. `/gsd/new-project` - Define what you're building
2. `/gsd/create-roadmap` - Plan phases
3. `/gsd/plan-phase 1` - Create executable plan
4. `/gsd/execute-plan` - Build it
5. `/gsd/progress` - Check status

## Key Concepts

- **PROJECT.md** - Your vision and constraints (created once)
- **ROADMAP.md** - Milestones and phases
- **STATE.md** - Current position and context
- **PLAN.md** - Executable task list for current phase

All files live in `.planning/` directory.

## Research with Context7

When researching, add "use context7" to get live documentation:

```
What's the Next.js 14 App Router pattern for auth? use context7
```

Or use the research commands:

- `/gsd/research-project` - Research your tech stack
- `/gsd/research-phase` - Research specific implementation

## Task Tracking

GSD uses `.planning/STATE.md` for project state.
OpenCode's `todowrite`/`todoread` handles session tasks automatically.

## Workflow Commands

| Phase | Commands |
|-------|----------|
| Setup | `new-project`, `create-roadmap` |
| Planning | `plan-phase`, `discuss-phase`, `research-phase` |
| Execution | `execute-plan`, `progress` |
| Milestones | `complete-milestone`, `new-milestone`, `discuss-milestone` |
| Maintenance | `pause-work`, `resume-work`, `consider-issues` |
