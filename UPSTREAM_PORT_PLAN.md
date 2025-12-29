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
<sub>`/new` first → fresh context</sub> (explain why)
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
| `Run /new, then paste:` + fenced block | Inline backtick + `<sub>` |
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

---

## Sync: 2025-12-29

**Upstream range:** `8ebae04` (v1.3.8, Dec 18) → `51f3950` (v1.3.13, Dec 29)

### Upstream Commits (16 total)

| Commit | Date | Description | Port? |
|--------|------|-------------|-------|
| `51f3950` | Dec 29 | 1.3.13 | Skip (version bump) |
| `86878b9` | Dec 29 | fix: restore deterministic bash commands, remove redundant decision_gate | **Port** |
| `9164faa` | Dec 29 | 1.3.12 | Skip (version bump) |
| `1609618` | Dec 29 | revert: restore plan-format.md - output template, not instructional | Review |
| `1de0dda` | Dec 29 | 1.3.11 - 70% context reduction for plan-phase | Skip (version bump) |
| `df1f138` | Dec 29 | feat(04-02): 70% context reduction for plan-phase | **Port** |
| `5d16432` | Dec 29 | feat(04-01): merge cli-automation into checkpoints, compress plan-format | **Port** |
| `d6913f3` | Dec 29 | 1.3.10 | Skip (version bump) |
| `f24203d` | Dec 29 | fix: explicit plan count check in offer_next step | **Port** |
| `fe48ea5` | Dec 27 | 1.3.9 | Skip (version bump) |
| `31597a9` | Dec 27 | feat: evolutionary PROJECT.md system | **Port** |
| `8ebae04` | Dec 18 | 1.3.8 | Already synced |
| `00623e5` | Dec 18 | docs: add brownfield/existing projects section to README | Already synced |
| `5e496e7` | Dec 18 | 1.3.7 | Already synced |
| `c11b744` | Dec 18 | fix: improve incremental codebase map updates | Already synced |
| `a990e37` | Dec 18 | 1.3.6 | Already synced |
| `b1f9d57` | Dec 18 | feat: add file paths to codebase mapping output | Already synced |

---

## Port Plan: Phase 8 - Context Reduction & Evolutionary PROJECT.md

### Overview

This sync introduces two major changes:
1. **70% context reduction** - Merging/compressing reference docs to reduce plan context overhead
2. **Evolutionary PROJECT.md** - Requirements tracking that evolves as you ship

### Phase 8.1: Merge cli-automation.md into checkpoints.md

**Priority:** HIGH  
**Upstream:** `5d16432`  
**Context savings:** ~500 lines

**Rationale:** `cli-automation.md` (528 lines) and `checkpoints.md` (595 lines) have significant overlap. Upstream merged them into a single file.

**Files to modify:**
- [x] `gsd/references/checkpoints.md` - Add compact `<automation_reference>` section from cli-automation.md
- [x] Delete `gsd/references/cli-automation.md`
- [x] `gsd/workflows/plan-phase.md` - Remove cli-automation.md from required_reading (not present)
- [x] `gsd/workflows/execute-phase.md` - Update any cli-automation.md references (not present)
- [x] `command/gsd/plan-phase.md` - Remove cli-automation.md reference if present

**Merge strategy:**
1. Keep full checkpoint type documentation (human-verify, decision, human-action)
2. Add compressed `<automation_reference>` with:
   - Quick reference table (CLI/API → automate, no API → checkpoint)
   - Authentication gate pattern (single example)
   - Decision tree (simplified)
3. Remove redundant examples that duplicate checkpoint examples

---

### Phase 8.2: Compress scope-estimation.md

**Priority:** HIGH  
**Upstream:** `5d16432`, `df1f138`  
**Context savings:** ~370 lines (485 → ~115)

**Rationale:** Verbose explanations replaced with tables. Core concepts preserved.

**Files to modify:**
- [x] `gsd/references/scope-estimation.md` - Full rewrite with compressed format

**Compression targets:**
| Section | Before | After |
|---------|--------|-------|
| Quality degradation curve | 30 lines prose | 8 line table |
| Context target | 15 lines explanation | 5 lines |
| Task rule | 40 lines examples | 15 line table |
| Split signals | 60 lines | 20 lines bullets |
| Splitting strategies | 80 lines examples | Remove (covered in plan-phase) |
| Anti-patterns | 70 lines | 20 lines (keep 2 examples) |
| Estimating context | 30 lines | 10 line table |
| Summary | 20 lines | 5 lines |

**Key content to preserve:**
- 2-3 task rule with 50% context target
- Quality degradation curve concept
- Split signals list
- Autonomous vs interactive distinction

---

### Phase 8.3: Workflow Updates (plan-phase.md)

**Priority:** MEDIUM  
**Upstream:** `86878b9`, `df1f138`

**Changes:**
- [x] Remove redundant `decision_gate` step (confirm_breakdown already handles this)
- [x] Add explicit bash commands for deterministic file checks:
  - `ls .planning/codebase/*.md 2>/dev/null` (already in load_codebase_context)
  - `cat .planning/ROADMAP.md` (already in identify_phase)
  - `ls .planning/phases/` (already in identify_phase)
  - `ls .planning/phases/*/*-SUMMARY.md 2>/dev/null | sort` (already in read_project_history)
  - `cat .planning/ISSUES.md 2>/dev/null` (already in read_project_history)
  - `ls -la src/ 2>/dev/null` and `cat package.json 2>/dev/null | head -20` (already in gather_phase_context)

**Files to modify:**
- [x] `gsd/workflows/plan-phase.md`

---

### Phase 8.4: Workflow Updates (execute-phase.md)

**Priority:** MEDIUM  
**Upstream:** `f24203d`

**Changes:**
- [x] Add explicit plan count check in `offer_next` step

**Added this bash block:**
```bash
# Get current phase directory from the plan we just executed
PHASE_DIR=$(dirname "$PLAN_PATH")

# Count PLAN files vs SUMMARY files
PLAN_COUNT=$(ls "$PHASE_DIR"/*-PLAN.md 2>/dev/null | wc -l | tr -d ' ')
SUMMARY_COUNT=$(ls "$PHASE_DIR"/*-SUMMARY.md 2>/dev/null | wc -l | tr -d ' ')

echo "Plans: $PLAN_COUNT, Summaries: $SUMMARY_COUNT"

if [[ $SUMMARY_COUNT -lt $PLAN_COUNT ]]; then
  echo "MORE_PLANS_EXIST"
else
  echo "PHASE_COMPLETE"
fi
```

**Files to modify:**
- [x] `gsd/workflows/execute-phase.md` - Update offer_next step

---

### Phase 8.5: Evolutionary PROJECT.md System

**Priority:** MEDIUM  
**Upstream:** `31597a9`

**Concept:** PROJECT.md evolves from static init document to living requirements tracker.

**New structure:**
```markdown
# Project Name

## What This Is
[Current accurate description - updated when reality drifts]

## Core Value  
[The ONE thing. If everything else fails, this must work.]

## Requirements

### Validated
<!-- Shipped and confirmed valuable -->
- ✓ Feature — vX.Y

### Active
<!-- Current hypotheses -->
- [ ] Feature

### Out of Scope
<!-- With reasoning -->
- Feature — reason

## Key Decisions
| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Choice | Why | ✓ Good / ⚠️ Revisit / — Pending |

## Context
[Background, constraints, prior art]

*Last updated: YYYY-MM-DD after [trigger]*
```

**Files to modify:**
- [x] `gsd/templates/project.md` - Replace with evolutionary template
- [x] `gsd/templates/state.md` - Update to reference PROJECT.md instead of copying summary
- [x] `gsd/workflows/complete-milestone.md` - Add `evolve_project_full_review` step

**STATE.md changes:**
- [x] "Project Summary" (immutable copy) → "Project Reference" (pointer to PROJECT.md)
- [x] 150 lines → 100 lines target
- [x] Remove "Project Alignment" section (now tracked in PROJECT.md Key Decisions)

---

### Phase 8.6: Codebase Template File Paths

**Priority:** LOW (may already be done)  
**Upstream:** `b1f9d57` (already synced, but verify all templates)

**Verify these templates have file path guidance:**
- [x] `gsd/templates/codebase/architecture.md` - Has guidance: "Include file paths as concrete examples... Use backtick formatting"
- [x] `gsd/templates/codebase/concerns.md` - Has guidance: "Always include file paths" + Files field in every section
- [x] `gsd/templates/codebase/stack.md` - N/A (focuses on technologies, not files)
- [x] `gsd/templates/codebase/structure.md` - Inherently about file paths, uses backticks throughout
- [x] `gsd/templates/codebase/conventions.md` - N/A (focuses on coding patterns)
- [x] `gsd/templates/codebase/integrations.md` - N/A (focuses on external services)
- [x] `gsd/templates/codebase/testing.md` - Has file path examples in structure section

---

### Phase 8.7: Update AGENTS.md

**Priority:** LOW

**Files to modify:**
- [x] `AGENTS.md` - Update "Last synced" to `51f3950` (v1.3.13, Dec 29)

---

## Execution Order

Recommended sequence to minimize conflicts:

1. **8.1** - Merge cli-automation into checkpoints (biggest context win)
2. **8.2** - Compress scope-estimation (second biggest win)
3. **8.3** - plan-phase.md workflow updates (depends on 8.1)
4. **8.4** - execute-phase.md plan count fix (independent)
5. **8.5** - Evolutionary PROJECT.md (independent, most complex)
6. **8.6** - Verify codebase templates (quick check)
7. **8.7** - Update AGENTS.md (final step)

---

## Testing After Port

After completing the port:

1. **Install changes:**
   ```bash
   echo "1" | node bin/install.js --force
   ```

2. **Test plan-phase workflow:**
   - Run `/gsd/plan-phase` on a test project
   - Verify reduced context (check if cli-automation.md no longer loaded)
   - Verify bash commands execute correctly

3. **Test execute-phase workflow:**
   - Run `/gsd/execute-plan` on a multi-plan phase
   - Verify plan count check works correctly

4. **Test PROJECT.md evolution:**
   - Run `/gsd/complete-milestone` 
   - Verify PROJECT.md gets the new structure

---

## OpenCode-Specific Considerations

**Keep these OpenCode adaptations:**
- `~/.config/opencode/gsd/` paths (not `~/.claude/`)
- "LLM" terminology (not "Claude")
- Task tool for subagents (not implicit spawning)
- `todowrite`/`todoread` integration in STATE.md template
- Context7 MCP references for research

**Don't port:**
- Claude Code specific frontmatter (`allowed-tools:`, `argument-hint:`)
- `AskUserQuestion`, `SlashCommand`, `TaskOutput` tool references
- Version bumps to package.json
