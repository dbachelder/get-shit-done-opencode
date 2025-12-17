<purpose>
Help the user figure out what they want to build in the next milestone through collaborative thinking.

You're a thinking partner helping them crystallize their vision for what's next. Features first — everything else (scope, phases) derives from what they want to build.
</purpose>

<process>

<step name="check_state" priority="first">
Load project state:

```bash
cat .planning/STATE.md
cat .planning/ROADMAP.md
```

**If no active milestone (expected state after completing previous):**
Continue to milestone_context.

**If active milestone exists:**

```
Current milestone in progress: v[X.Y] [Name]
Phases [N]-[M], [P]% complete

Did you want to:
1. Complete current milestone first (/gsd/complete-milestone)
2. Add phases to current milestone (/gsd/add-phase)
3. Continue anyway - discuss next milestone scope
```

Wait for user response. If "Continue anyway", proceed to milestone_context.
</step>

<step name="milestone_context">
Present context from previous milestone:

```
Last completed: v[X.Y] [Name] (shipped [DATE])
Key accomplishments:
- [From MILESTONES.md or STATE.md]

Total phases delivered: [N]
Next phase number: [N+1]
```

Continue to intake_gate.
</step>

<step name="intake_gate">
**CRITICAL: ALL questions use numbered options format.**

The primary question is: **What do you want to build/add/fix?**

Everything else (scope, priority, constraints) is secondary and derived from features.

Check for inputs:
- Deferred issues from STATE.md (potential features)
- Known gaps or pain points from usage
- User's ideas for what's next

**1. Open:**

## Next

What do you want to add, improve, or fix in this milestone?

1. [Deferred issue from STATE.md if any]
2. [Another deferred issue if any]
3. New features
4. Improvements to existing
5. Bug fixes
6. Let me describe

Reply with a number or your own answer.

**2. Explore features:**

Based on their response:

If they named specific features:

## Feature Details

Tell me more about [feature] - what should it do?

1. [Contextual option based on feature type]
2. [Another contextual option]
3. Let me describe it

Reply with a number or your own answer.

If they described a general direction:

## Breaking It Down

That could involve [A], [B], [C] - which matter most?

1. [Specific sub-feature A]
2. [Specific sub-feature B]
3. All of them
4. Something else

Reply with a number or your own answer.

If they're not sure:

## Starting Points

What's been frustrating or missing?

1. [Deferred issue from STATE.md]
2. [Pain point category A]
3. [Pain point category B]
4. Let me think about it

Reply with a number or your own answer.

**3. Prioritize:**

## Priority

Which of these matters most?

1. [Feature they mentioned]
2. [Another feature they mentioned]
3. All equally important
4. Let me prioritize

Reply with a number or your own answer.

After gathering features, synthesize:

```
Based on what you described:

**Features:**
- [Feature 1]: [brief description]
- [Feature 2]: [brief description]
- [Feature 3]: [brief description]

**Estimated scope:** [N] phases
**Theme suggestion:** v[X.Y] [Name]
```

**4. Decision gate:**

## Ready?

Ready to create the milestone, or explore more?

1. Create milestone - Proceed to /gsd/new-milestone
2. Ask more questions - Help me think through this more
3. Let me add context - I have more to share

Reply with a number.

If "Ask more questions" → return to step 2 with new probes.
If "Let me add context" → receive input → return to step 2.
Loop until "Create milestone" selected.
</step>

<step name="handoff">
Present summary and hand off to create-milestone:

```
Milestone scope defined:

**Features:**
- [Feature 1]: [description]
- [Feature 2]: [description]
- [Feature 3]: [description]

**Suggested milestone:** v[X.Y] [Theme Name]
**Estimated phases:** [N]

Ready to create the milestone structure.

## To Continue

Run `/clear`, then paste:
```
/gsd/new-milestone
```
```

Pass context forward by summarizing:
- Features to build (the substance)
- Suggested milestone name
- How features map to phases
</step>

</process>

<success_criteria>

- Project state loaded (STATE.md, ROADMAP.md)
- Previous milestone context presented
- **Features identified** - What to build/add/fix (the substance)
- Features explored with clarifying questions
- Scope synthesized from features (not asked abstractly)
- Context handed off to /gsd/new-milestone with feature list
</success_criteria>
