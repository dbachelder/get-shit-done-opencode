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

1. **Project Setup** - `/gsd/new-project` creates a PROJECT.md defining goals and constraints
2. **Research** - `/gsd/research-project` explores the codebase and gathers context
3. **Roadmap** - `/gsd/create-roadmap` breaks the project into phases and milestones
4. **Planning** - `/gsd/plan-phase N` creates detailed execution plans for each phase
5. **Execution** - `/gsd/execute-plan` runs the plan with focused context
6. **Progress** - `/gsd/progress` tracks status and suggests next actions

### All Commands

| Command | Description |
|---------|-------------|
| `/gsd/help` | Show all available commands |
| `/gsd/new-project` | Start a new project |
| `/gsd/research-project` | Research the codebase |
| `/gsd/create-roadmap` | Create project roadmap |
| `/gsd/plan-phase N` | Plan a specific phase |
| `/gsd/execute-plan` | Execute the current plan |
| `/gsd/progress` | Check progress and next steps |
| `/gsd/complete-milestone` | Mark milestone complete |
| `/gsd/discuss-milestone` | Discuss a milestone |
| `/gsd/new-milestone` | Add a new milestone |
| `/gsd/discuss-phase` | Discuss a phase |
| `/gsd/research-phase` | Research a specific phase |
| `/gsd/list-phase-assumptions` | List assumptions for a phase |
| `/gsd/add-phase` | Add a new phase |
| `/gsd/insert-phase` | Insert a phase at position |
| `/gsd/pause-work` | Pause and save progress |
| `/gsd/resume-work` | Resume previous work |
| `/gsd/consider-issues` | Review open issues |

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

This agent runs `execute-plan` with `bash: allow` and `edit: allow` permissions, stopping only at checkpoints.

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
