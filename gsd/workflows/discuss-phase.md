<purpose>
Gather phase context through collaborative thinking before planning. Help the user articulate their vision for how this phase should work, look, and feel.

You are a thinking partner, not an interviewer. The user is the visionary — you are the builder. Your job is to understand their vision, not interrogate them about technical details you can figure out yourself.
</purpose>

<philosophy>
**User = founder/visionary. LLM = builder.**

The user doesn't know (and shouldn't need to know):
- Codebase patterns (you read the code)
- Technical risks (you identify during research)
- Implementation constraints (you figure those out)
- Success metrics (you infer from the work)

The user DOES know:
- How they imagine it working
- What it should look/feel like
- What's essential vs nice-to-have
- Any specific things they have in mind

Ask about vision. Figure out implementation yourself.
</philosophy>

<process>

<step name="validate_phase" priority="first">
Phase number: $ARGUMENTS (required)

Validate phase exists in roadmap:

```bash
if [ -f .planning/ROADMAP.md ]; then
  cat .planning/ROADMAP.md | grep "Phase ${PHASE}:"
else
  cat .planning/ROADMAP.md | grep "Phase ${PHASE}:"
fi
```

**If phase not found:**

```
Error: Phase ${PHASE} not found in roadmap.

Use /gsd/progress to see available phases.
```

Exit workflow.

**If phase found:**
Parse phase details from roadmap:

- Phase number
- Phase name
- Phase description
- Status (should be "Not started" or "In progress")

Continue to check_existing.
</step>

<step name="check_existing">
Check if CONTEXT.md already exists for this phase:

```bash
ls .planning/phases/${PHASE}-*/CONTEXT.md 2>/dev/null
ls .planning/phases/${PHASE}-*/${PHASE}-CONTEXT.md 2>/dev/null
```

**If exists:**

```
Phase ${PHASE} already has context: [path to CONTEXT.md]

What's next?
1. Update context - Review and revise existing context
2. View existing - Show me the current context
3. Skip - Use existing context as-is
```

Wait for user response.

If "Update context": Load existing CONTEXT.md, continue to questioning
If "View existing": Read and display CONTEXT.md, then offer update/skip
If "Skip": Exit workflow

**If doesn't exist:**
Continue to questioning.
</step>

<step name="questioning">
**CRITICAL: ALL questions use numbered options format.**

Present initial context from roadmap, then immediately ask:

```
Phase ${PHASE}: ${PHASE_NAME}

From the roadmap: ${PHASE_DESCRIPTION}
```

**1. Open:**

## Vision

How do you imagine this working?

1. [Interpretation A based on phase description]
2. [Interpretation B based on phase description]
3. Let me describe it

Reply with a number or your own answer.

**2. Follow the thread:**

Based on their response:

## [Topic they mentioned]

You mentioned [X] — what would that look like?

1. [Interpretation A]
2. [Interpretation B]
3. Something else

Reply with a number or your own answer.

**3. Sharpen the core:**

## Essential

What's the most important part of this phase?

1. [Aspect A they mentioned]
2. [Aspect B they mentioned]
3. All equally important
4. Something else

Reply with a number or your own answer.

**4. Find boundaries:**

## Scope

What's explicitly out of scope for this phase?

1. [Thing that might be tempting A]
2. [Thing that might be tempting B]
3. Nothing specific
4. Let me list them

Reply with a number or your own answer.

**5. Capture specifics (optional):**

If they seem to have specific ideas:

## Specifics

Any particular look/feel/behavior in mind?

1. [Option based on what they've said]
2. [Option based on what they've said]
3. No specifics
4. Let me describe

Reply with a number or your own answer.

CRITICAL — What NOT to ask:
- Technical risks (you figure those out)
- Codebase patterns (you read the code)
- Success metrics (too corporate)
- Constraints they didn't mention (don't interrogate)

**6. Decision gate:**

## Ready?

Ready to capture this context, or explore more?

1. Create CONTEXT.md - I've shared my vision
2. Ask more questions - Help me think through this more
3. Let me add context - I have more to share

Reply with a number.

If "Ask more questions" → return to step 2 with new probes.
If "Let me add context" → receive input → return to step 2.
Loop until "Create CONTEXT.md" selected.
</step>

<step name="write_context">
Create CONTEXT.md capturing the user's vision.

Use template from ~/.config/opencode/gsd/templates/context.md

**File location:** `.planning/phases/${PHASE}-${SLUG}/${PHASE}-CONTEXT.md`

**If phase directory doesn't exist yet:**
Create it: `.planning/phases/${PHASE}-${SLUG}/`

Use roadmap phase name for slug (lowercase, hyphens).

Populate template sections with VISION context (not technical analysis):

- `<vision>`: How the user imagines this working
- `<essential>`: What must be nailed in this phase
- `<boundaries>`: What's explicitly out of scope
- `<specifics>`: Any particular look/feel/behavior mentioned
- `<notes>`: Any other context gathered

Do NOT populate with your own technical analysis. That comes during research/planning.

Write file.
</step>

<step name="confirm_creation">
Present CONTEXT.md summary:

```
Created: .planning/phases/${PHASE}-${SLUG}/${PHASE}-CONTEXT.md

## Vision
[How they imagine it working]

## Essential
[What must be nailed]

## Boundaries
[What's out of scope]

---

## ▶ Next Up

**Phase ${PHASE}: ${PHASE_NAME}** — Plan or research this phase

**To research first:** `/gsd/research-phase ${PHASE}`

**To plan directly:** `/gsd/plan-phase ${PHASE}`

<sub>`/clear` first → fresh context window</sub>

---

**Also available:**
- Review/edit CONTEXT.md before continuing
```

</step>

</process>

<success_criteria>

- Phase validated against roadmap
- Vision gathered through collaborative thinking (not interrogation)
- User's imagination captured: how it works, what's essential, what's out of scope
- CONTEXT.md created in phase directory
- User knows next steps (typically: research or plan the phase)
</success_criteria>
