# Upstream Port Plan

**Created:** 2025-12-17
**Source:** https://github.com/glittercowboy/get-shit-done
**Last synced:** 2025-12-19 at commit `8ebae04` (v1.3.8)

## Overview

Port upstream changes from the original Claude Code GSD to our OpenCode edition.

---

## Phase 1: Remove `research-project` Command

**Status:** COMPLETE
**Priority:** High
**Upstream commit:** `c2359cd`

**Rationale:** Upstream removed this as "over-engineered theater" - 3 parallel subagents producing fragmented output. Phase-level research (`/gsd/research-phase`) is sufficient for niche domains.

### Files to Delete
- [x] `command/gsd/research-project.md`
- [x] `gsd/workflows/research-project.md`
- [x] `gsd/templates/project-research.md`
- [x] `gsd/references/research-subagent-prompts.md`

### Files to Update
- [x] `command/gsd/help.md` - remove from command list
- [x] `command/gsd/create-roadmap.md` - remove references to research-project
- [x] `command/gsd/new-project.md` - remove references
- [x] `gsd/workflows/create-roadmap.md` - remove references
- [x] `README.md` - remove from documentation

### Notes
- All 4 files deleted
- Updated help.md Quick Start (now 4 steps instead of 5)
- Updated help.md to show `/gsd/research-phase` for niche domains instead of research-project
- Removed research-project from README workflow overview and command table
- Simplified create-roadmap objective and removed check_research step from workflow

---

## Phase 2: Add Continuation Format Reference

**Status:** COMPLETE
**Priority:** Medium
**Upstream commit:** `733fc14`

### New File
- [x] `gsd/references/continuation-format.md`

### Key Format Rules
```
## ▶ Next Up                              (not "To Continue")
**Phase N: Name** — description           (not just command path)
`/gsd/command`                            (inline backticks, not fenced block)
<sub>`/clear` first → fresh context</sub> (explain why)
**Also available:**                       (not "Other options:")
```

### Notes
- Full reference document with variants for different scenarios
- Includes anti-patterns to avoid

---

## Phase 3: Update Continuation UI Across Files

**Status:** COMPLETE
**Priority:** Medium
**Upstream commits:** `733fc14`, `c3273a5`

### Pattern Changes
| Old | New |
|-----|-----|
| `## To Continue` | `## ▶ Next Up` |
| `Run /clear, then paste:` + fenced block | Inline backtick + `<sub>` |
| `Other options:` | `**Also available:**` |
| Just command path | `**Phase N: Name** — description` |

### Files Updated
Commands:
- [x] `command/gsd/create-roadmap.md`
- [x] `command/gsd/progress.md`
- [x] `command/gsd/new-project.md`

Workflows:
- [x] `gsd/workflows/create-roadmap.md`
- [x] `gsd/workflows/map-codebase.md`

### Files Updated (all remaining)
Commands:
- [x] `command/gsd/execute-plan.md` (delegates to workflow)
- [x] `command/gsd/plan-phase.md` (delegates to workflow)
- [x] `command/gsd/research-phase.md` (delegates to workflow)
- [x] `command/gsd/pause-work.md` (no continuation block needed)
- [x] `command/gsd/add-phase.md`
- [x] `command/gsd/insert-phase.md`

Workflows:
- [x] `gsd/workflows/execute-phase.md`
- [x] `gsd/workflows/plan-phase.md`
- [x] `gsd/workflows/research-phase.md`
- [x] `gsd/workflows/resume-project.md`
- [x] `gsd/workflows/transition.md`
- [x] `gsd/workflows/discuss-phase.md`
- [x] `gsd/workflows/discuss-milestone.md`
- [x] `gsd/workflows/create-milestone.md`
- [x] `gsd/workflows/complete-milestone.md`
- [x] `gsd/workflows/discovery-phase.md`
- [x] `gsd/workflows/list-phase-assumptions.md`

### Notes
- All files now use the new continuation format
- Pattern: `## ▶ Next Up` with inline backticks and `<sub>` explanation
- Reference document `continuation-format.md` available for guidance

---

## Phase 4: Add `map-codebase` Command

**Status:** COMPLETE
**Priority:** High
**Upstream commits:** `cfde291`, `8a0dcd6`

### New Files
- [x] `command/gsd/map-codebase.md`
- [x] `gsd/workflows/map-codebase.md`

### OpenCode Adaptations Applied
1. Removed `allowed-tools:` frontmatter
2. Removed `argument-hint:` - merged into description
3. Added `subtask: true` for fresh context
4. Replaced Claude subagent spawning with Task tool:
   - `subagent_type: "explore"` for codebase analysis
   - Removed `run_in_background` references
5. Changed path references from `~/.claude/get-shit-done/` to `{{GSD_PATH}}/`
6. Removed `TaskOutput` tool references (OpenCode Task returns directly)

### Files Updated
- [x] `command/gsd/help.md` - added map-codebase to command list
- [x] `README.md` - added to Project Setup commands table

### Notes
- Workflow uses 4 parallel explore agents via Task tool
- All 7 document templates in gsd/templates/codebase/
- Git commit step included in workflow

---

## Phase 5: Add Codebase Templates

**Status:** COMPLETE
**Priority:** High
**Upstream commits:** `de16552`, `33c832e`, `6582592`

### New Directory
`gsd/templates/codebase/`

### New Files (7 templates)
- [x] `stack.md` - Languages, frameworks, dependencies
- [x] `architecture.md` - System design, patterns, data flow
- [x] `structure.md` - Directory layout, module organization
- [x] `conventions.md` - Code style, naming patterns
- [x] `testing.md` - Test structure, coverage
- [x] `integrations.md` - APIs, databases, external services
- [x] `concerns.md` - Technical debt, risks, issues

### Notes
- All 7 templates fetched from upstream and written
- Removed "Claude" references, changed to "LLM" where needed
- Templates are pure documentation - no tool-specific adaptations needed

---

## Phase 6: Integrate Brownfield Support

**Status:** COMPLETE
**Priority:** High
**Upstream commit:** `8d2f307`

### Files Updated

#### `command/gsd/new-project.md`
- [x] Detect existing code at start (find code files, check package manifests)
- [x] Offer `/gsd/map-codebase` first for brownfield projects (brownfield_offer step)
- [x] Check `PROJECT.md` not `.planning/` dir (fix from `8697c5f`)

#### `gsd/workflows/plan-phase.md`
- [x] Added load_codebase_context step
- [x] Load relevant codebase files based on phase type
- [x] Extract constraints from STACK.md, ARCHITECTURE.md, CONVENTIONS.md, CONCERNS.md

#### `gsd/workflows/execute-phase.md`
- [x] Added update_codebase_map step
- [x] Detect significant code changes (>3 files)
- [x] Incremental update strategy for codebase documents

#### `command/gsd/help.md`
- [x] Already added `map-codebase` in Phase 4

### Notes
- Brownfield detection uses find + package manifest checks
- Codebase context is loaded selectively based on phase keywords
- Incremental codebase updates avoid full remapping after each plan

---

## Phase 7: Miscellaneous Fixes

**Status:** COMPLETE
**Priority:** Low
**Upstream commits:** `484257a`, `8697c5f`, `dccde98`

### Fixes Applied
- [x] **Derive phase count from work** (`gsd/workflows/create-roadmap.md`)
  - No arbitrary 3-6 phase constraint in our port (already clean)
  - Workflow says "phase count emerges from the project"

- [x] **Check PROJECT.md not dir** (`command/gsd/new-project.md`)
  - Already using `[ -f .planning/PROJECT.md ]` (fixed in Phase 6)

- [x] **Remove 100-line limit** (`gsd/workflows/map-codebase.md`)
  - Never added arbitrary limits in our port

### Notes
- All fixes were either already clean in our port or applied during earlier phases

---

## Execution Order

Recommended: 1 → 5 → 4 → 6 → 2 → 3 → 7

1. **Phase 1** - Remove old stuff first (clean slate)
2. **Phase 5** - Add templates (no dependencies)
3. **Phase 4** - Add map-codebase command (uses templates)
4. **Phase 6** - Integrate into existing workflows
5. **Phase 2** - Add continuation format reference
6. **Phase 3** - Apply UI updates everywhere
7. **Phase 7** - Misc fixes

---

## Progress Log

| Date | Phase | Status | Notes |
|------|-------|--------|-------|
| 2025-12-17 | 1 | Complete | Removed research-project command and all references |
| 2025-12-17 | 5 | Complete | Added 7 codebase templates to gsd/templates/codebase/ |
| 2025-12-17 | 4 | Complete | Added map-codebase command and workflow, updated help/README |
| 2025-12-17 | 6 | Complete | Integrated brownfield support into new-project, plan-phase, execute-phase |
| 2025-12-17 | 2 | Complete | Added continuation-format.md reference |
| 2025-12-17 | 3 | Complete | Updated all commands and workflows with new continuation format |
| 2025-12-17 | 7 | Complete | All fixes already applied or clean in port |

## Summary

**All phases complete:**
- Brownfield support (map-codebase command + 7 templates + workflow integration)
- Breaking change applied (removed research-project)
- Continuation UI reference added
- All commands and workflows updated with new format

**Port complete as of 2025-12-17.**

---

## Context for Future Sessions

### Key Differences: Claude Code vs OpenCode
- **Subagents:** Claude uses implicit spawning; OpenCode uses `Task` tool with `subagent_type`
- **Frontmatter:** Claude has `allowed-tools:`, `argument-hint:`; OpenCode only has `description:`, `subtask:`
- **Paths:** Claude uses `~/.claude/`; OpenCode uses `{{GSD_PATH}}/` (replaced at install)
- **Tools:** Claude has `AskUserQuestion`, `SlashCommand`, `TaskOutput`; OpenCode doesn't

### Files Already in Our Port
- 18 commands in `command/gsd/`
- 13 workflows in `gsd/workflows/`
- 14 templates in `gsd/templates/`
- 9 references in `gsd/references/`

---

## Sync: 2025-12-19

**Upstream range:** `e409c7f` (v1.3.5, Dec 17) → `8ebae04` (v1.3.8, Dec 18)

### Commits Ported

| Commit | Description |
|--------|-------------|
| `b1f9d57` | feat: add file paths to codebase mapping output |
| `c11b744` | fix: improve incremental codebase map updates |
| `00623e5` | docs: add brownfield/existing projects section to README |

### Changes Applied

**1. File paths in codebase mapping (`b1f9d57`)**
- Added philosophy section to `gsd/workflows/map-codebase.md` explaining file path requirement
- Updated all 4 agent prompts to require file paths in findings
- Updated `gsd/templates/codebase/architecture.md` with file path guidance
- Updated `gsd/templates/codebase/concerns.md` to require Files: field for all concerns

**2. Improved incremental codebase updates (`c11b744`)**
- Rewrote `update_codebase_map` step in `gsd/workflows/execute-phase.md`
- Removed arbitrary ">3 files" threshold
- Added specific update triggers by change type
- Added explicit skip conditions (bug fixes, content changes)
- Added "file renamed/moved" case

**3. README brownfield section (`00623e5`)**
- Already present in our README (added during Phase 6 of original port)

### Skipped

- `a990e37`, `5e496e7`, `8ebae04` - Version bump commits (package.json only)
