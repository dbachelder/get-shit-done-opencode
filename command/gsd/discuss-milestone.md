---
description: Gather context for next milestone through adaptive questioning
---

<objective>
Help you figure out what to build in the next milestone through collaborative thinking.

Purpose: After completing a milestone, explore what features you want to add, improve, or fix. Features first — scope and phases derive from what you want to build.
Output: Context gathered, then routes to /gsd/new-milestone
</objective>

<execution_context>
@{{GSD_PATH}}/workflows/discuss-milestone.md
</execution_context>

<context>
**Load project state first:**
@.planning/STATE.md

**Load roadmap:**
@.planning/ROADMAP.md

**Load milestones (if exists):**
@.planning/MILESTONES.md
</context>

<process>
1. Verify previous milestone complete (or acknowledge active milestone)
2. Present context from previous milestone (accomplishments, phase count)
3. Follow discuss-milestone.md workflow with **ALL questions using numbered options**:

## Features

What do you want to add, improve, or fix?

1. [Feature category A based on project]
2. [Feature category B based on project]
3. [Feature category C based on project]
4. Let me describe it

Reply with a number or your own answer.

Then dig into features they mention:

## [Topic They Mentioned]

You mentioned [X] — what would that look like?

1. [Interpretation A]
2. [Interpretation B]
3. Something else

Reply with a number or your own answer.

Help them articulate what matters most:

## Priority

What's most important for this milestone?

1. [Feature A they mentioned]
2. [Feature B they mentioned]
3. All equally important
4. Let me think about it

Reply with a number or your own answer.

Decision gate:

## Ready?

Ready to create the milestone, or explore more?

1. Create milestone - Finalize and continue
2. Ask more questions - I'll dig deeper
3. Let me add context - You have more to share

Reply with a number.

4. Hand off to /gsd/new-milestone with gathered context

**CRITICAL: Use numbered options for ALL questions. Never ask inline text questions.**
</process>

<success_criteria>
- Project state loaded and presented
- Previous milestone context summarized
- Milestone scope gathered through adaptive questioning
- Context handed off to /gsd/new-milestone
</success_criteria>
