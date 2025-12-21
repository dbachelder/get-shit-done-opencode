---
description: Execute a PLAN.md file [path-to-PLAN.md]
subtask: true
---

<objective>
Execute a PLAN.md file, create SUMMARY.md, update project state, commit.

Uses intelligent segmentation:

- Plans without checkpoints → spawn subagent for full autonomous execution
- Plans with checkpoints → segment execution, pause at checkpoints, pass context to next segment
</objective>

<execution_context>
@{{GSD_PATH}}/workflows/execute-phase.md
@{{GSD_PATH}}/templates/summary.md
@{{GSD_PATH}}/references/checkpoints.md
</execution_context>

<context>
Plan path: $ARGUMENTS

**Load project state first:**
@.planning/STATE.md

**Load workflow config:**
@.planning/config.json
</context>

<process>
1. Check .planning/ directory exists (error if not - user should run /gsd/new-project)
2. Verify plan at $ARGUMENTS exists
3. Check if SUMMARY.md already exists (plan already executed?)
4. Load workflow config for mode (interactive/yolo)
5. Parse plan to identify checkpoints (if any)
6. Determine execution strategy:
   - No checkpoints → Strategy A (fully autonomous)
   - Has checkpoints → Strategy B (segmented)
7. Execute using appropriate strategy:
   - Spawn subagent(s) for task execution
   - Pause at checkpoints, present to user
   - Pass checkpoint outcomes to subsequent segments
8. Create SUMMARY.md
9. Update STATE.md
10. Commit changes

**Note:** Use OpenCode's native `todowrite`/`todoread` tools to track task progress during execution. This provides visibility into progress alongside STATE.md updates.
</process>

<execution_strategies>
**Strategy A: Fully Autonomous** (no checkpoints)

- Use the Task tool to spawn a subagent:
  - subagent_type: "general"
  - description: "Execute plan [phase]-[plan]"
  - prompt: Full plan content with execution instructions
- Subagent creates SUMMARY.md and commits
- Main context: orchestration only (~5% usage)

**Strategy B: Segmented** (has any checkpoints - verify or decision)

- Parse plan to identify checkpoint locations
- Execute in segments between checkpoints using Task tool
- At each checkpoint:
  1. Subagent returns with completed work + checkpoint info
  2. Main context presents checkpoint to user (verify or decision)
  3. User responds
  4. New subagent spawns with:
     - Remaining tasks
     - Checkpoint outcome (decision made or verification result)
     - Summary of work completed so far
- Final segment creates SUMMARY.md and commits
- Decision outcomes are passed as context to subsequent segments

**Passing checkpoint context to next segment:**

```
Previous work completed:
- [Task 1]: [outcome]
- [Task 2]: [outcome]

Checkpoint resolved:
- Type: decision
- Decision: "Use Supabase Auth"
- Rationale: [user's reasoning if provided]

Continue with remaining tasks, incorporating the decision above.
```
</execution_strategies>

<deviation_rules>
During execution, handle discoveries automatically:

1. **Auto-fix bugs** - Fix immediately, document in Summary
2. **Auto-add critical** - Security/correctness gaps, add and document
3. **Auto-fix blockers** - Can't proceed without fix, do it and document
4. **Ask about architectural** - Major structural changes, stop and ask user
5. **Log enhancements** - Nice-to-haves, log to ISSUES.md, continue

Only rule 4 requires user intervention.
</deviation_rules>

<commit_rules>
**Critical: Stage only files this plan actually modified.**

NEVER use:

- `git add .`
- `git add -A`
- `git add src/` or any broad directory

Stage each file individually from the modified-files list.
</commit_rules>

<success_criteria>
- [ ] All tasks executed
- [ ] SUMMARY.md created with substantive content
- [ ] STATE.md updated (position, decisions, issues, session)
- [ ] ROADMAP updated (plan count, phase status)
- [ ] Changes committed with feat({phase}-{plan}): [summary]
- [ ] User informed of next steps
</success_criteria>
