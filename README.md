# GSD - OpenCode Edition

```
   ██████╗ ███████╗██████╗ 
  ██╔════╝ ██╔════╝██╔══██╗
  ██║  ███╗███████╗██║  ██║
  ██║   ██║╚════██║██║  ██║
  ╚██████╔╝███████║██████╔╝
   ╚═════╝ ╚══════╝╚═════╝  for
                                    ▄     
  █▀▀█ █▀▀█ █▀▀█ █▀▀▄  █▀▀▀ █▀▀█ █▀▀█ █▀▀█
  █░░█ █░░█ █▀▀▀ █░░█  █░░░ █░░█ █░░█ █▀▀▀
  ▀▀▀▀ █▀▀▀ ▀▀▀▀ ▀  ▀  ▀▀▀▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀
```

A meta-prompting, context engineering and spec-driven development system for **OpenCode**.

This is a port of [Get Shit Done (GSD)](https://github.com/glittercowboy/get-shit-done) by glittercowboy, adapted for OpenCode's native capabilities.

## Installation

```bash
npx get-shit-done-oc
```

The installer will prompt you to choose between:
- **Global install** (`~/.config/opencode/`) - Available in all projects
- **Local install** (`./.opencode/`) - Only in the current project

Or specify directly:
```bash
npx get-shit-done-oc --global  # or -g
npx get-shit-done-oc --local   # or -l
```

### Upgrading

When upgrading, the installer will **replace** existing GSD files. If you have an existing installation, you'll be prompted to confirm before files are removed.

```bash
npx get-shit-done-oc --global --force  # Skip confirmation, replace existing files
```

**Note:** Only GSD-specific directories (`command/gsd/` and `gsd/`) are replaced. Your project files, other commands, and OpenCode config are not affected.

### Post-Installation: Context7 MCP

For research commands to work, add Context7 MCP to your OpenCode config:

Edit `~/.config/opencode/opencode.json` (or `.opencode/opencode.json` for local):

```json
{
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp"
    }
  }
}
```

Context7 provides live documentation lookups during research phases.

## Quick Start

After installation, verify it works:

```
/gsd/help
```

To start a new project:

```
/gsd/new-project
```

## Workflow Overview

GSD provides a structured approach to software development:

1. **Codebase Analysis** (brownfield only) - `/gsd/map-codebase` documents existing code
2. **Project Setup** - `/gsd/new-project` creates a PROJECT.md defining goals and constraints
3. **Roadmap** - `/gsd/create-roadmap` breaks the project into phases and milestones
4. **Planning** - `/gsd/plan-phase N` creates detailed execution plans for each phase
5. **Execution** - `/gsd/execute-plan` runs the plan with focused context
6. **Progress** - `/gsd/progress` tracks status and suggests next actions

### All Commands

#### Project Setup
| Command | Description | When to Use |
|---------|-------------|-------------|
| `/gsd/map-codebase` | Analyze existing codebase | **For brownfield projects.** Creates codebase docs before planning |
| `/gsd/new-project` | Start a new project | **Always first.** Creates PROJECT.md with goals and constraints |
| `/gsd/create-roadmap` | Create project roadmap | **After new-project.** Breaks work into phases, creates STATE.md |

#### Phase Work (The Main Loop)
| Command | Description | When to Use |
|---------|-------------|-------------|
| `/gsd/discuss-phase` | Discuss a phase | When you need to clarify scope before planning |
| `/gsd/research-phase` | Research a specific phase | Phase involves unfamiliar libraries or patterns |
| `/gsd/list-phase-assumptions` | List assumptions for a phase | Before planning to surface hidden assumptions |
| `/gsd/plan-phase N` | Plan a specific phase | Before starting work on phase N. Creates detailed PLAN.md files |
| `/gsd/execute-plan` | Execute the current plan | When you have a PLAN.md ready to run |

#### Session Management
| Command | Description | When to Use |
|---------|-------------|-------------|
| `/gsd/progress` | Check progress and next steps | **Start of every session.** Shows status and recommends next action |
| `/gsd/pause-work` | Pause and save progress | End of a work session, stepping away for a break |
| `/gsd/resume-work` | Resume previous work | Returning after a break within the same milestone |

#### Adjusting the Plan
| Command | Description | When to Use |
|---------|-------------|-------------|
| `/gsd/add-issue` | Capture an enhancement idea | Mid-execution idea you don't want to lose but don't want to act on now |
| `/gsd/add-phase` | Add a new phase at the end | Scope expanded, need more work after existing phases |
| `/gsd/insert-phase` | Insert a phase at position | Urgent work mid-milestone (e.g., `/gsd/insert-phase 3 "Security fix"` creates 3.1) |
| `/gsd/consider-issues` | Review deferred issues | Before milestone completion, or when looking for low-priority work |

#### Milestones
| Command | Description | When to Use |
|---------|-------------|-------------|
| `/gsd/discuss-milestone` | Discuss a milestone | Planning scope for the next major deliverable |
| `/gsd/new-milestone` | Add a new milestone | After completing a milestone, ready to plan the next version |
| `/gsd/complete-milestone` | Mark milestone complete | All phases done, ready to tag a release. Evolves PROJECT.md |

#### Help
| Command | Description | When to Use |
|---------|-------------|-------------|
| `/gsd/help` | Show all available commands | Anytime you need a refresher |

### Example: Greenfield Project (CLI Tool)

Here's a realistic walkthrough of building a new project from scratch.

```
# Day 1: Project Setup

> /gsd/new-project

GSD asks deep questions about your vision, constraints, and scope.
You describe: "A CLI tool that syncs dotfiles across machines"

→ Creates .planning/PROJECT.md

> /gsd/create-roadmap

GSD breaks your project into phases based on deliverables.

→ Creates .planning/ROADMAP.md with:
  - Phase 1: Core sync engine
  - Phase 2: Config file parsing  
  - Phase 3: CLI interface
  - Phase 4: Conflict resolution
→ Creates .planning/STATE.md (project memory)
```

```
# Day 1: Discussing Before Planning

> /gsd/discuss-phase 1

You: "I'm not sure if we should use rsync or build our own sync logic"

GSD explores tradeoffs, asks about your constraints (cross-platform? 
Windows support?), and helps you decide.

→ Creates .planning/phases/01-core-sync/01-CONTEXT.md with decisions

> /gsd/list-phase-assumptions 1

GSD surfaces assumptions like:
- "Assuming sync is one-way (local → remote)"
- "Assuming SSH access to target machines"

You correct: "No, it needs to be bidirectional"

This context feeds into planning.
```

```
# Day 1-2: Planning and Executing

> /gsd/plan-phase 1

GSD creates detailed plans with 2-3 tasks each.

→ Creates .planning/phases/01-core-sync/01-01-PLAN.md
→ Creates .planning/phases/01-core-sync/01-02-PLAN.md

> /gsd/execute-plan .planning/phases/01-core-sync/01-01-PLAN.md

GSD executes tasks, pausing at checkpoints for your input.
Commits changes to git after completion.

→ Creates 01-01-SUMMARY.md
→ Updates STATE.md

> /gsd/execute-plan .planning/phases/01-core-sync/01-02-PLAN.md

→ Phase 1 complete!
```

```
# Day 2: Phase Done, But Something's Off

After Phase 2 execution, you realize the config format is too rigid.

> "The YAML config works, but users will want JSON and TOML too"

GSD logs this to ISSUES.md as a deferred enhancement (not blocking).

> /gsd/progress

"Phase 2 complete. 1 issue logged. Phase 3 ready for planning."

You decide to handle it now rather than later:

> /gsd/insert-phase 2 "Multi-format config support"

→ Creates Phase 2.1 (inserted after Phase 2)

> /gsd/plan-phase 2.1
> /gsd/execute-plan ...
```

```
# Day 3: Returning to Work

> /gsd/progress

"Phase 2.1 complete. Phase 3 (CLI interface) ready for planning."

> /gsd/plan-phase 3

GSD reads STATE.md (remembers all prior context and decisions).

> /gsd/execute-plan ...
```

```
# Day 4: Unfamiliar Territory

Phase 4 involves conflict resolution algorithms. You're not sure 
about the best approach.

> /gsd/research-phase 4

GSD uses Context7 to research diff algorithms, three-way merge 
strategies, and how other tools (git, syncthing) handle conflicts.

→ Creates .planning/phases/04-conflicts/04-RESEARCH.md

> /gsd/plan-phase 4

Plans now incorporate research findings.
```

```
# Day 5: Wrapping Up the Milestone

> /gsd/progress

"All phases complete. Ready for milestone completion."

> /gsd/consider-issues

GSD shows deferred enhancements from ISSUES.md:
- "Add --dry-run flag" (logged during Phase 3)
- "Support for .gitignore-style exclusions" (logged during Phase 1)

You decide: dry-run goes in v1.0, exclusions can wait for v2.

> /gsd/add-phase "Add --dry-run flag"
> /gsd/plan-phase 5
> /gsd/execute-plan ...

> /gsd/complete-milestone 1.0.0

→ Archives to MILESTONES.md
→ Creates git tag v1.0.0
→ Evolves PROJECT.md (moves shipped features to "Validated", updates decisions)
```

```
# Starting the Next Milestone

> /gsd/discuss-milestone

Discuss scope for v2.0: cloud backup, team sharing, .gitignore-style 
exclusions (from ISSUES.md), etc.

> /gsd/new-milestone

→ Creates new milestone in ROADMAP.md with new phases
```

### Example: Brownfield Project (Adding Features to Existing Code)

When you have an existing codebase, start with `/gsd/map-codebase`:

```
# Day 1: Understanding the Codebase

> /gsd/map-codebase

GSD spawns parallel agents to analyze your codebase:
- Stack analysis (languages, frameworks, dependencies)
- Architecture patterns (how code is organized)
- Testing approach (test structure, coverage)
- Integrations (APIs, databases, external services)
- Technical concerns (debt, risks, issues)

→ Creates .planning/codebase/ with 7 documents:
  - STACK.md, ARCHITECTURE.md, STRUCTURE.md
  - CONVENTIONS.md, TESTING.md, INTEGRATIONS.md, CONCERNS.md

> /gsd/new-project

GSD detects existing code and offers to use the codebase analysis.
You describe what you want to add: "User authentication system"

→ Creates .planning/PROJECT.md (incorporates codebase context)

> /gsd/create-roadmap

GSD creates phases that respect existing architecture:
- Knows your stack from STACK.md
- Follows conventions from CONVENTIONS.md
- Avoids areas flagged in CONCERNS.md

→ Creates .planning/ROADMAP.md
→ Creates .planning/STATE.md
```

```
# Planning Respects Existing Patterns

> /gsd/plan-phase 1

GSD loads relevant codebase docs based on phase type:
- For API work: ARCHITECTURE.md, CONVENTIONS.md
- For database work: ARCHITECTURE.md, STACK.md
- For UI work: CONVENTIONS.md, STRUCTURE.md

Plans reference existing patterns in your codebase.
```

```
# After Execution: Codebase Docs Stay Current

> /gsd/execute-plan ...

If you modify >3 code files, GSD incrementally updates
the relevant codebase documents (STRUCTURE.md, etc.)

No need to re-run /gsd/map-codebase unless major changes.
```

### Evolutionary PROJECT.md

PROJECT.md evolves as you ship:

- **At init:** Captures vision and initial requirements as hypotheses
- **During execution:** Key decisions tracked with rationale
- **At milestone completion:** Requirements move from "Active" to "Validated" (or "Out of Scope")

```markdown
## Requirements

### Validated
- User authentication with JWT — v1.0
- Protected API routes — v1.0

### Active  
- [ ] Rate limiting
- [ ] Admin dashboard

### Out of Scope
- OAuth providers — deferring to v2.0
```

This creates a living record of what shipped and what was cut, with reasoning preserved.

### Understanding Milestones vs Phases

**Milestones** are major deliverable boundaries—think version releases or significant project checkpoints.

**Phases** are chunks of work within a milestone—think feature areas or logical groupings.

| Concept | What It Represents | Examples |
|---------|-------------------|----------|
| **Milestone** | A shippable release, git tag | MVP (v1.0), "Auth Complete" (v1.1), Public Beta (v2.0) |
| **Phase** | A logical chunk of work | "Database setup", "User authentication", "API endpoints" |
| **Plan** | 2-3 atomic tasks within a phase | "Create user model", "Add login endpoint" |

**Rule of thumb:** If it's worth a git tag, it's a milestone. If not, it's probably a phase.

```
Milestone 1.0 - MVP
  ├── Phase 1: Foundation (project setup, core models)
  ├── Phase 2: Core Feature A
  └── Phase 3: Core Feature B

Milestone 2.0 - Enhanced
  ├── Phase 4: Feature C
  └── Phase 5: Polish & Performance
```

For smaller projects, you might only have **one milestone**—that's fine. Don't over-engineer the structure.

## Migration from Claude Code

This is a port of the original [GSD for Claude Code](https://github.com/glittercowboy/get-shit-done). Key adaptations:

| Aspect | Claude Code | OpenCode |
|--------|-------------|----------|
| Install path | `~/.claude/` | `~/.config/opencode/` |
| Subagents | Implicit spawning | Task tool with `subagent_type` |
| Task tracking | Custom STATE.md only | STATE.md + native `todowrite` |
| User prompts | `AskUserQuestion` tool | Numbered options in text |
| Command chaining | `SlashCommand` tool | "Next, run `/gsd/X`" guidance |
| Doc lookup | Web search | Context7 MCP |

For the full migration guide (useful if porting other Claude Code projects), see [MIGRATION.md](./MIGRATION.md).

## Optional: YOLO Mode Agent

For autonomous plan execution, you can use the sample agent included in this package. After running `npx get-shit-done-oc`, find `agent/gsd-execute.sample.md` in the package directory and copy it to your project's `.opencode/agent/` folder.

This agent runs `execute-plan` with permissive tool settings, stopping only at checkpoints.

## Troubleshooting

### Commands not appearing

If `/gsd/help` doesn't work:
1. Verify installation location: `ls ~/.config/opencode/command/gsd/` (or `.opencode/command/gsd/` for local)
2. Check that OpenCode is looking in the right place for custom commands
3. Try reinstalling: `npx get-shit-done-oc --global`

### Context7 / research commands failing

If research commands fail with MCP errors:
1. Check that `opencode.json` has the Context7 config (see installation section)
2. Restart OpenCode after modifying the config
3. Test with: `mcp__context7__resolve-library-id` for a known library

### Path replacement issues

If you see `{{GSD_PATH}}` in command outputs:
1. The installer didn't complete correctly
2. Reinstall with `npx get-shit-done-oc` and choose your installation type

### Missing .planning directory

The `.planning/` directory is created by `/gsd/new-project`. If it's missing:
1. Make sure you ran `/gsd/new-project` first
2. Check you're in the right directory

## Credits

Original [Get Shit Done](https://github.com/glittercowboy/get-shit-done) by [glittercowboy](https://github.com/glittercowboy).

OpenCode port by the OpenCode community.

## License

MIT
