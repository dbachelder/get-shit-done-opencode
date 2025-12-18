---
description: Analyze codebase with parallel explore agents to produce .planning/codebase/ documents
subtask: true
---

<objective>
Analyze existing codebase using parallel explore agents to produce structured codebase documents.

This command spawns multiple explore agents to analyze different aspects of the codebase in parallel, each with fresh context.

Output: .planning/codebase/ folder with 7 structured documents about the codebase state.
</objective>

<execution_context>
@{{GSD_PATH}}/workflows/map-codebase.md
@{{GSD_PATH}}/templates/codebase/stack.md
@{{GSD_PATH}}/templates/codebase/architecture.md
@{{GSD_PATH}}/templates/codebase/structure.md
@{{GSD_PATH}}/templates/codebase/conventions.md
@{{GSD_PATH}}/templates/codebase/testing.md
@{{GSD_PATH}}/templates/codebase/integrations.md
@{{GSD_PATH}}/templates/codebase/concerns.md
</execution_context>

<context>
Focus area: $ARGUMENTS (optional - if provided, tells agents to focus on specific subsystem)

**Load project state if exists:**
Check for .planning/STATE.md - loads context if project already initialized

**This command can run:**
- Before /gsd/new-project (brownfield codebases) - creates codebase map first
- After /gsd/new-project (greenfield codebases) - updates codebase map as code evolves
- Anytime to refresh codebase understanding
</context>

<when_to_use>
**Use map-codebase for:**
- Brownfield projects before initialization (understand existing code first)
- Refreshing codebase map after significant changes
- Onboarding to an unfamiliar codebase
- Before major refactoring (understand current state)
- When STATE.md references outdated codebase info

**Skip map-codebase for:**
- Greenfield projects with no code yet (nothing to map)
- Trivial codebases (<5 files)
</when_to_use>

<process>
1. Check if .planning/codebase/ already exists (offer to refresh or skip)
2. Create .planning/codebase/ directory structure
3. Spawn 4 parallel explore agents using Task tool to analyze codebase:
   - Agent 1: Stack + Integrations (technology focus)
   - Agent 2: Architecture + Structure (organization focus)
   - Agent 3: Conventions + Testing (quality focus)
   - Agent 4: Concerns (issues focus)
4. Wait for all agents to complete, collect findings
5. Write 7 codebase documents using templates:
   - STACK.md - Languages, frameworks, key dependencies
   - ARCHITECTURE.md - System design, patterns, data flow
   - STRUCTURE.md - Directory layout, module organization
   - CONVENTIONS.md - Code style, naming, patterns
   - TESTING.md - Test structure, coverage, practices
   - INTEGRATIONS.md - APIs, databases, external services
   - CONCERNS.md - Technical debt, risks, issues
6. Commit the codebase map to git
7. Offer next steps (typically: /gsd/new-project or /gsd/plan-phase)
</process>

<success_criteria>
- [ ] .planning/codebase/ directory created
- [ ] All 7 codebase documents written
- [ ] Documents follow template structure
- [ ] Parallel agents completed without errors
- [ ] Changes committed to git
- [ ] User knows next steps
</success_criteria>
