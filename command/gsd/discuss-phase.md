---
description: Gather phase context through adaptive questioning before planning [phase]
---

<objective>
Help the user articulate their vision for a phase through collaborative thinking.

Purpose: Understand HOW the user imagines this phase working — what it looks like, what's essential, what's out of scope. You're a thinking partner helping them crystallize their vision, not an interviewer gathering technical requirements.

Output: {phase}-CONTEXT.md capturing the user's vision for the phase
</objective>

<execution_context>
@{{GSD_PATH}}/workflows/discuss-phase.md
@{{GSD_PATH}}/templates/context.md
</execution_context>

<context>
Phase number: $ARGUMENTS (required)

**Load project state first:**
@.planning/STATE.md

**Load roadmap:**
@.planning/ROADMAP.md
</context>

<process>
1. Validate phase number argument (error if missing or invalid)
2. Check if phase exists in roadmap
3. Check if CONTEXT.md already exists (offer to update if yes)
4. Follow discuss-phase.md workflow with **ALL questions using numbered options**:
   - Present phase from roadmap

## How You See This

How do you imagine this working?

1. [Interpretation A based on phase]
2. [Interpretation B based on phase]
3. Let me describe it

Reply with a number or your own answer.

   - Follow their thread — probe what excites them:

## [Topic They Mentioned]

You mentioned [X] — what's important about that?

1. [Aspect A]
2. [Aspect B]
3. Something else

Reply with a number or your own answer.

   - Sharpen the core — what's essential for THIS phase:

## Essential

If this phase could only nail one thing, what would it be?

1. [Key aspect A]
2. [Key aspect B]
3. All equally important

Reply with a number or your own answer.

   - Find boundaries — what's explicitly out of scope:

## Boundaries

What's explicitly NOT in this phase?

1. [Tempting thing A]
2. [Tempting thing B]
3. Nothing specific
4. Let me explain

Reply with a number or your own answer.

   - Decision gate:

## Ready?

Ready to capture this context, or explore more?

1. Create CONTEXT.md - Capture and continue
2. Ask more questions - I'll dig deeper
3. Let me add context - You have more to share

Reply with a number.

   - Create CONTEXT.md capturing their vision
5. Offer next steps (research or plan the phase)

**CRITICAL: Use numbered options for ALL questions. Never ask inline text questions.**

User is the visionary, you are the builder:
- Ask about vision, feel, essential outcomes
- DON'T ask about technical risks (you figure those out)
- DON'T ask about codebase patterns (you read the code)
- DON'T ask about success metrics (too corporate)
- DON'T interrogate about constraints they didn't mention
</process>

<success_criteria>
- Phase validated against roadmap
- Vision gathered through collaborative thinking (not interrogation)
- CONTEXT.md captures: how it works, what's essential, what's out of scope
- User knows next steps (research or plan the phase)
</success_criteria>
