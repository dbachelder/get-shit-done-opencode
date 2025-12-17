# GSD Migration Guide: Claude Code to OpenCode

This document describes how [Get Shit Done (GSD)](https://github.com/glittercowboy/get-shit-done) was ported from Claude Code to OpenCode. Use this as a reference for similar migrations.

## Source Structure

The original GSD repository has four main directories:

| Directory | Contents | Count |
|-----------|----------|-------|
| `commands/gsd/` | Slash command definitions | 18 files |
| `get-shit-done/references/` | Reference docs (principles, patterns) | 9 files |
| `get-shit-done/templates/` | File templates (PROJECT.md, ROADMAP.md, etc.) | 14 files |
| `get-shit-done/workflows/` | Detailed workflow instructions | 13 files |

## Target Structure

OpenCode uses a different directory layout:

```
~/.config/opencode/           # Global install location
├── command/gsd/              # Slash commands
├── gsd/
│   ├── references/           # Reference docs
│   ├── templates/            # Templates
│   └── workflows/            # Workflows
└── opencode.json             # MCP configuration
```

## Transformation Patterns

### 1. Path References

**Before:** `~/.claude/get-shit-done/`
**After:** `{{GSD_PATH}}/` (replaced at install time)

The installer replaces `{{GSD_PATH}}` with the actual path:
- Global: `~/.config/opencode/gsd`
- Local: `./.opencode/gsd`

### 2. Command Frontmatter

Claude Code uses `allowed-tools:` and `argument-hint:` in frontmatter. OpenCode doesn't support these.

**Before:**
```yaml
---
description: Execute the current plan
allowed-tools: Bash, Read, Write, Edit, ...
argument-hint: [phase-number]
---
```

**After:**
```yaml
---
description: Execute the current plan for phase [N]
subtask: true
---
```

- Remove `allowed-tools:` (OpenCode doesn't restrict tools per command)
- Merge `argument-hint:` into `description:`
- Add `subtask: true` for commands that spawn subagents (fresh context)

### 3. Interactive Prompts

Claude Code has an `AskUserQuestion` tool. OpenCode doesn't.

**Before:**
```
Use AskUserQuestion to ask the user which option they prefer.
```

**After:**
```markdown
## What type of project is this?

1. Greenfield - Starting from scratch
2. Brownfield - Adding to existing codebase
3. Migration - Moving between technologies

Reply with a number or describe your situation.
```

Pattern: Present numbered options, tell user to reply with a number.

### 4. Command Invocation

Claude Code has a `SlashCommand` tool to invoke other commands. OpenCode doesn't.

**Before:**
```
Use SlashCommand to run /gsd/plan-phase with the phase number.
```

**After:**
```
Next, run `/gsd/plan-phase N` to create the execution plan.
```

Pattern: Tell the user what command to run next.

### 5. Subagent Spawning

Claude Code spawns subagents implicitly. OpenCode uses the Task tool.

**Before:**
```
Spawn a research subagent with this prompt: ...
```

**After:**
```
Use the Task tool with:
- subagent_type: "general" (or "explore" for codebase search)
- prompt: [the subagent instructions]
```

### 6. Task Tracking

Claude Code's GSD uses custom STATE.md for task tracking. OpenCode has native `todowrite`/`todoread`.

**Approach:** Keep STATE.md for project-level tracking, but add notes that OpenCode's native todo tools complement it for session-level tracking.

### 7. Research/Documentation Lookup

Claude Code uses web search. OpenCode can use MCP servers.

**Approach:** Add Context7 MCP for documentation lookups:
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

Reference in research workflows:
```
Use mcp__context7__resolve-library-id to find the library
Use mcp__context7__get-library-docs to fetch documentation
```

### 8. Terminology

| Claude Code | OpenCode |
|-------------|----------|
| "Claude Code" | "OpenCode" |
| "Claude" (as the model) | "LLM" (generic) |

## Installer Design

The installer (`bin/install.js`):

1. Prompts for global vs local installation
2. Copies command/ and gsd/ directories to target
3. Replaces `{{GSD_PATH}}` in all .md files with actual path
4. Prints setup instructions (MCP config, next steps)

Key considerations:
- Path prefix should NOT have trailing slash (avoid `gsd//workflows`)
- Include sample files in package.json `files` array
- Check if MCP is already configured before printing setup instructions

## Files That Need Special Attention

### Commands with `subtask: true`

These commands spawn subagents and need fresh context:
- `execute-plan.md` - Autonomous plan execution
- `research-project.md` - Parallel research subagents
- `research-phase.md` - Phase-specific research

### Workflows with Context7 References

These workflows use MCP for documentation:
- `discovery-phase.md` - Shallow research
- `research-phase.md` - Deep phase research
- `plan-phase.md` - Planning with doc lookups
- `research-project.md` - Project-wide research

### Templates with OpenCode Notes

These templates mention OpenCode-specific features:
- `state.md` - Notes about todowrite/todoread
- `continue-here.md` - Session handoff notes

## Verification Checklist

After migration, verify:

```bash
# No old paths
grep -r "~/.claude/" command/ gsd/ --include="*.md"  # Should find nothing

# No Claude frontmatter
grep -r "allowed-tools:" command/  # Should find nothing
grep -r "argument-hint:" command/  # Should find nothing

# No Claude tools
grep -r "AskUserQuestion" command/ gsd/  # Should find nothing
grep -r "SlashCommand" command/ gsd/     # Should find nothing

# Correct file counts
ls command/gsd/*.md | wc -l      # 18
ls gsd/references/*.md | wc -l   # 9
ls gsd/templates/* | wc -l       # 14
ls gsd/workflows/*.md | wc -l    # 13

# All commands have description
for f in command/gsd/*.md; do
  grep -q "^description:" "$f" || echo "Missing: $f"
done
```

## Lessons Learned

1. **Test path replacement carefully** - Trailing slashes cause double-slash bugs
2. **Sample files need explicit inclusion** - Add to package.json `files` array
3. **Numbered options work well** - Users can reply with just "1" or "2"
4. **Keep both tracking systems** - STATE.md for project, todowrite for session
5. **MCP is optional** - Research commands should work without it, just less effectively
