---
description: Create detailed execution plan for a phase (PLAN.md) [phase]
---

<objective>
Create executable phase prompt with discovery, context injection, and task breakdown.

Purpose: Break down roadmap phases into concrete, executable PLAN.md files that the LLM can execute.
Output: One or more PLAN.md files in the phase directory (.planning/phases/XX-name/{phase}-{plan}-PLAN.md)
</objective>

<execution_context>
@{{GSD_PATH}}/workflows/plan-phase.md
@{{GSD_PATH}}/templates/phase-prompt.md
@{{GSD_PATH}}/references/plan-format.md
@{{GSD_PATH}}/references/scope-estimation.md
@{{GSD_PATH}}/references/checkpoints.md
@{{GSD_PATH}}/references/cli-automation.md
</execution_context>

<context>
Phase number: $ARGUMENTS (optional - auto-detects next unplanned phase if not provided)

**Load project state first:**
@.planning/STATE.md

**Load roadmap:**
@.planning/ROADMAP.md

**Load phase context if exists (created by /gsd/discuss-phase):**
Check for and read `.planning/phases/XX-name/{phase}-CONTEXT.md` - contains research findings, clarifications, and decisions from phase discussion.
</context>

<process>
1. Check .planning/ directory exists (error if not - user should run /gsd/new-project)
2. If phase number provided via $ARGUMENTS, validate it exists in roadmap
3. If no phase number, detect next unplanned phase from roadmap
4. Follow plan-phase.md workflow:
   - Load project state and accumulated decisions
   - Perform mandatory discovery (Level 0-3 as appropriate)
   - Read project history (prior decisions, issues, concerns)
   - Break phase into tasks
   - Estimate scope and split into multiple plans if needed
   - Create PLAN.md file(s) with executable structure

For documentation lookups during discovery, use Context7 MCP:
1. mcp__context7__resolve-library-id with libraryName
2. mcp__context7__get-library-docs with the resolved ID
</process>

<success_criteria>
- One or more PLAN.md files created in .planning/phases/XX-name/
- Each plan has: objective, execution_context, context, tasks, verification, success_criteria, output
- Tasks are specific enough for the LLM to execute
- User knows next steps (execute plan or review/adjust)
</success_criteria>
