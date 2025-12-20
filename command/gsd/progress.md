---
description: Check project progress, show full phase status table, and route to next action
---

<objective>
Check project progress with a comprehensive phase status table, summarize recent work, then intelligently route to the next action.

Provides complete situational awareness before continuing work.
</objective>

<context>
Planning structure: !`ls -la .planning/ 2>/dev/null || echo "NO_PLANNING_STRUCTURE"`
Phase directories: !`ls -d .planning/phases/*/ 2>/dev/null | sort`
State exists: !`[ -f .planning/STATE.md ] && echo "EXISTS" || echo "MISSING"`
Roadmap exists: !`[ -f .planning/ROADMAP.md ] && echo "EXISTS" || echo "MISSING"`
Issues exist: !`[ -f .planning/ISSUES.md ] && echo "EXISTS" || echo "MISSING"`
All plans: !`find .planning/phases -name "*-PLAN.md" -type f 2>/dev/null | sort`
All summaries: !`find .planning/phases -name "*-SUMMARY.md" -type f 2>/dev/null | sort`
All research: !`find .planning/phases -name "*-RESEARCH.md" -type f 2>/dev/null | sort`
All context: !`find .planning/phases -name "*-CONTEXT.md" -type f 2>/dev/null | sort`
</context>

<process>

<step name="verify">
**Verify planning structure exists:**

If no `.planning/` directory:

```
No planning structure found.

Run /gsd/new-project to start a new project.
```

Exit.

If missing STATE.md or ROADMAP.md: inform what's missing, suggest running `/gsd/new-project`.
</step>

<step name="load">
**Load full project context:**

- Read `.planning/STATE.md` for current position and living memory
- Read `.planning/ROADMAP.md` for phase structure and objectives
- Read `.planning/PROJECT.md` for project name (brief summary only)
- Read `.planning/ISSUES.md` if exists for issue counts per phase
</step>

<step name="build_phase_table">
**Build comprehensive phase status table:**

For each phase directory in `.planning/phases/`:

1. **Parse phase info:**
   - Phase number (including decimals like 5.1)
   - Phase name from directory name or ROADMAP.md heading
   - Is this the current phase? (from STATE.md)

2. **Check research status:**
   - Look for `{phase}-RESEARCH.md` in phase directory
   - Check ROADMAP.md phase description for niche domain keywords:
     - 3D, WebGL, OpenGL, shader, audio, game, ML, AI, neural, crypto, blockchain
   - Status: `done` (file exists) | `needed` (keywords found, no file) | `-` (not needed)

3. **Check context status:**
   - Look for `{phase}-CONTEXT.md` or `CONTEXT.md` in phase directory
   - Status: `✓` (exists) | `-` (not exists)

4. **Count plans:**
   - Find all `*-PLAN.md` files in phase directory
   - Find all `*-SUMMARY.md` files in phase directory
   - Format: `completed/total` (e.g., `2/3`) or `0` if no plans

5. **Determine phase status:**
   - `complete` - All plans have summaries
   - `in-progress` - Some plans have summaries, some don't
   - `planned` - Plans exist but no summaries yet
   - `not-started` - No plans exist

6. **Count tagged issues:**
   - Parse ISSUES.md for issues with "Suggested phase: X" matching this phase
   - Count open issues only (not closed)
   - Display count or `-` if none

**Handle decimal phases:**
- Sort phases numerically (1, 2, 2.1, 2.2, 3, ...)
- Indent decimal phases under their parent: `  └─ 05.1 Security fix`
</step>

<step name="render_table">
**Render the phase status table:**

IMPORTANT: Use plain text with fixed-width columns. Do NOT use markdown table syntax (no pipe characters `|`). This ensures proper rendering in the terminal.

```
# [Project Name]

## Phase Status

Phase                        Research  Context  Plans  Status       Issues
─────────────────────────────────────────────────────────────────────────────
  01 Foundation              -         ✓        2/2    complete     -
  02 Core API                -         -        1/2    in-progress  -
► 03 WebGL Renderer          needed    -        0/0    not-started  1
  04 Audio System            done      ✓        0/0    not-started  -
  05 Polish                  -         -        0/0    not-started  2
    └─ 05.1 Security fix     -         -        0/0    not-started  -

Progress: 5/10 plans complete (50%)
```

**Table formatting rules:**
- Use plain text with spaces for alignment (NOT markdown table pipes)
- `►` marker on current phase (from STATE.md)
- Decimal phases indented with `└─` prefix
- Fixed column widths: Phase (28), Research (10), Context (9), Plans (7), Status (13), Issues (6)
- Plans format: `completed/total` (e.g., `2/3`, `0/3`)
- Progress summary as plain text line below table
- Use box-drawing character `─` for separator line only
</step>

<step name="recent_work">
**Show recent work summary (abbreviated):**

Find the 2-3 most recent SUMMARY.md files. Extract one-line summary from each:

```
## Recent Work
- Phase 2, Plan 1: Implemented user authentication endpoints
- Phase 2, Plan 2: Added JWT token validation
```

Keep brief - the table is the main focus.
</step>

<step name="open_issues">
**Show open issues if any exist:**

If ISSUES.md exists and has open issues:

```
## Open Issues ([N] total)
- ISS-003: Add dark mode toggle (Phase 5)
- ISS-007: Optimize database queries (Future)
```

List up to 5 most recent, indicate if more exist.
</step>

<step name="route">
**Determine and show next action:**

Based on current phase status:

**If current phase has unexecuted PLAN.md:**
```
---

## ▶ Next Up

**Phase [N], Plan [M]: [objective]**

`/gsd/execute-plan [path]`

_(`/clear` first for fresh context)_
```

**If current phase needs planning (no plans yet):**

Check for CONTEXT.md and RESEARCH.md status:

```
---

## ▶ Next Up

**Phase [N]: [name]** — [goal from roadmap]

`/gsd/plan-phase [N]`

_(`/clear` first for fresh context)_

---

**Also available:**
- `/gsd/discuss-phase [N]` — clarify vision first [if no CONTEXT.md]
- `/gsd/research-phase [N]` — research niche domain [if research needed]
- `/gsd/list-phase-assumptions [N]` — surface hidden assumptions
```

**If current phase complete, more phases remain:**
```
---

## ▶ Next Up

**Phase [N+1]: [name]** — Start next phase

`/gsd/plan-phase [N+1]`

_(`/clear` first for fresh context)_
```

**If all phases complete (100%):**
```
---

## ▶ Next Up

**Milestone complete!** All phases finished.

`/gsd/complete-milestone [version]`

_Review open issues with `/gsd/consider-issues` before completing._
```
</step>

</process>

<success_criteria>
- [ ] Full phase table rendered with all columns
- [ ] Current phase marked with ► indicator
- [ ] Decimal phases shown nested under parent
- [ ] Research/Context/Plans/Status/Issues all populated
- [ ] Recent work summarized briefly
- [ ] Smart routing to next action
- [ ] Clear command provided for continuation
</success_criteria>
