# State Template

Template for `.planning/STATE.md` - the project's living memory.

---

## File Template

```markdown
# Project State

## Project Reference

See `.planning/PROJECT.md` for full project context.

**Core Value:** [One line from PROJECT.md Core Value section]
**Current Focus:** [Brief summary of Active requirements]

## Current Position

Phase: [X] of [Y] ([Phase name])
Plan: [A] of [B] in current phase
Status: [Ready to plan / Planning / Ready to execute / In progress / Phase complete]
Last activity: [YYYY-MM-DD] - [What happened]

Progress: [---] 0%

## Performance Metrics

**Velocity:**
- Total plans completed: [N]
- Average duration: [X] min
- Total execution time: [X.X] hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

**Recent Trend:**
- Last 5 plans: [durations]
- Trend: [Improving / Stable / Degrading]

*Updated after each plan completion*

## Accumulated Context

### Decisions Made

| Phase | Decision | Rationale |
|-------|----------|-----------|
| - | - | - |

### Deferred Issues

[From ISSUES.md - list open items with phase of origin]

None yet.

### Blockers/Concerns Carried Forward

[From prior "Next Phase Readiness" sections - issues that affect future work]

None yet.

## Session Continuity

Last session: [YYYY-MM-DD HH:MM]
Stopped at: [Description of last completed action]
Resume file: [Path to .continue-here*.md if exists, otherwise "None"]
```

<purpose>
STATE.md is the project's "short-term memory" that spans all phases and sessions.

**Problem it solves:** Information is captured in summaries, issues, and decisions - but not systematically consumed. Each phase plans in isolation. Sessions start without knowing accumulated context.

**Solution:** A single, small file that's:
- Always read first (every workflow)
- Always updated after work (every execution)
- Contains digest of all accumulated wisdom
- Enables instant context restoration
</purpose>

<lifecycle>

**Creation:** After ROADMAP.md is created (during init)
- Reference PROJECT.md (Core Value + Current Focus)
- Initialize empty accumulated context sections
- Set position to "Phase 1 ready to plan"

**Reading:** First step of EVERY workflow
- progress: Present status to user
- plan: Inform planning decisions
- execute: Know current position
- transition: Know what's complete

**Writing:** After every significant action
- execute: After SUMMARY.md created
  - Update position (phase, plan, status)
  - Extract decisions → add to table
  - Extract new issues → update deferred list
  - Extract concerns → add to blockers
- transition: After phase marked complete
  - Update progress bar
  - Clear resolved blockers
- milestone: After PROJECT.md updated
  - Refresh Project Reference section

</lifecycle>

<sections>

### Project Reference
References PROJECT.md instead of copying content. Contains:
- Core Value: The ONE thing that must work (from PROJECT.md)
- Current Focus: Summary of Active requirements

Updated when PROJECT.md changes (milestone completion, significant drift).

### Current Position
Where we are right now:
- Phase X of Y - which phase
- Plan A of B - which plan within phase
- Status - current state
- Last activity - what happened most recently
- Progress bar - visual indicator of overall completion

Progress calculation: (completed plans) / (total plans across all phases) x 100%

### Performance Metrics
Track velocity to understand execution patterns:
- Total plans completed
- Average duration per plan
- Per-phase breakdown
- Recent trend (improving/stable/degrading)

Updated after each plan completion.

### Accumulated Context

**Decisions Made:** Table of significant decisions with rationale.
- Extracted from SUMMARY.md "Decisions Made" sections
- Include phase number for traceability
- These constrain future phases (e.g., "use jose not jsonwebtoken")

**Deferred Issues:** Open items from ISSUES.md
- Brief description with ISS-XXX number
- Phase where discovered
- Effort estimate if known
- Helps phase planning identify what to address

**Blockers/Concerns:** From "Next Phase Readiness" sections
- Issues that affect future work
- Prefix with originating phase
- Cleared when addressed

### Session Continuity
Enables instant resumption:
- When was last session
- What was last completed
- Is there a .continue-here file to resume from

</sections>

<size_constraint>
Keep STATE.md under 100 lines.

It's a DIGEST, not an archive. If accumulated context grows too large:
- Summarize older phase decisions: "Phases 1-2: [key decisions]"
- Reference ISSUES.md instead of listing all: "12 open issues - see ISSUES.md"
- Keep only active blockers, archive resolved ones

The goal is "read once, know everything" - if it's too long, that fails.
</size_constraint>

<opencode_integration>
**OpenCode Session Task Tracking:**

STATE.md tracks project-level state across sessions. Within a single session, use OpenCode's native `todowrite`/`todoread` tools for granular task tracking:

- **STATE.md:** "Phase 2 Plan 1, in progress" (project-level)
- **todowrite:** "Task 3 of 5: Implement login endpoint" (session-level)

The execute workflow uses `todowrite` to track individual tasks during plan execution. STATE.md is updated at the end when SUMMARY.md is created.

This gives you:
- Real-time task visibility during execution (todowrite)
- Persistent project memory across sessions (STATE.md)
</opencode_integration>

<guidelines>
**When created:**
- During project initialization (after ROADMAP.md)
- Reference PROJECT.md (Core Value + Current Focus)
- Initialize empty sections

**When read:**
- EVERY workflow starts by reading STATE.md
- Provides instant context restoration
- Shows current position and accumulated wisdom

**When updated:**
- After each plan execution (update position, extract decisions/issues/blockers)
- After phase transitions (update progress bar, clear resolved blockers)
- After milestone completion (refresh Project Reference from updated PROJECT.md)

**Size management:**
- Keep under 100 lines total
- Summarize older decisions if table grows large
- Reference ISSUES.md instead of listing all issues
- Keep only active blockers, archive resolved ones

**Sections:**
- Project Reference: Pointer to PROJECT.md with Core Value + Current Focus
- Current Position: Where we are now (phase, plan, status)
- Performance Metrics: Velocity tracking
- Accumulated Context: Decisions, deferred issues, blockers
- Session Continuity: Resume information
</guidelines>
