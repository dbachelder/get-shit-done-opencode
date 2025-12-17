<questioning_guide>
The initialization phase is dream extraction, not requirements gathering. You're helping the user discover and articulate what they want to build. This isn't a contract negotiation — it's collaborative thinking.

<philosophy>
**You are a thinking partner, not an interviewer.**

The user often has a fuzzy idea. Your job is to help them sharpen it. Ask questions that make them think "oh, I hadn't considered that" or "yes, that's exactly what I mean."

Don't interrogate. Collaborate.
</philosophy>

<critical_rule>
**ALL questions MUST use numbered options.**

Since OpenCode doesn't have a dedicated interactive question tool, present all exploration questions with numbered options that help the user articulate their vision.

This applies to:
- Opening questions ("What do you want to build?")
- Follow-up questions ("You mentioned X — what would that look like?")
- Sharpening questions ("What's essential vs nice-to-have?")
- Boundary questions ("What's out of scope?")
- Decision gates ("Ready to proceed?")

The numbered options format helps users think by presenting concrete options to react to, rather than facing a blank text field.

**Format:**
```
## [Topic]

[Question]

1. [Option A]
2. [Option B]
3. [Option C]
4. Let me describe it differently

Reply with a number or your own answer.
```
</critical_rule>

<conversation_arc>
**1. Open**

Present numbered options:
```
## Vision

What do you want to build?

1. [Contextual starting point if available]
2. [Another contextual option]
3. [Broad category]
4. Let me describe it

Reply with a number or describe your idea.
```

Let them respond. Then follow up based on what they said.

**2. Follow the thread**

Whatever they said — dig into it. What excited them? What problem sparked this?

Present options that probe what they mentioned:
```
## [Topic they mentioned]

You mentioned [X] — what would that actually look like?

1. [Interpretation A of what they might mean]
2. [Interpretation B]
3. [Interpretation C]
4. Something else

Reply with a number or explain.
```

**3. Sharpen the core**

Help them distinguish the essential from the nice-to-have.

```
## Core

If you could only nail one thing, what would it be?

1. [Key feature/aspect they mentioned]
2. [Another key aspect]
3. [Third key aspect]
4. All equally important
5. Something else

Reply with a number or explain.
```

**4. Find the boundaries**

What is this NOT? Explicit exclusions prevent scope creep later.

```
## Scope

What's explicitly NOT in v1?

1. [Thing that might be tempting to include]
2. [Another tempting feature]
3. [Third tempting feature]
4. Nothing specific
5. Let me list them

Reply with numbers (can pick multiple) or explain.
```

**5. Ground in reality**

Only ask about constraints that actually exist. Don't invent concerns.

```
## Constraints

Any hard constraints?

1. [Common constraint type relevant to context]
2. [Another relevant constraint type]
3. [Third relevant constraint type]
4. None
5. Yes, let me explain

Reply with a number or explain.
```
</conversation_arc>

<good_vs_bad>
**BAD — Plain text questions without options:**
- Asking "What is your target audience?" as plain text
- Free-form "Tell me more about X" without options
- Any question that leaves the user staring at a blank input

**GOOD — Numbered options that help them think:**
```
## Audience

Who is this for?

1. Just me
2. My team
3. Public users
4. Let me describe

Reply with a number or explain.
```

**BAD — Corporate speak:**
- "What are your success criteria?"
- "What's your budget?"
- "Have you done X before?" (irrelevant — LLM builds)

**GOOD — Concrete options that help them think:**
```
## Done

How will you know this is working?

1. I'm using it daily
2. Specific metric improves
3. Replaces current workflow
4. Let me describe

Reply with a number or explain.
```

**BAD — Checklist walking:**
- Ask about audience → ask about constraints → ask about tech stack (regardless of what user said)

**GOOD — Following threads with targeted options:**
- User mentions frustration → Present specific frustration interpretations as options → their selection reveals the core value prop
</good_vs_bad>

<probing_techniques>
When answers are vague, don't accept them. Probe with numbered options:

**"Make it good"** →
```
## Good

What does 'good' mean here?

1. Fast
2. Beautiful
3. Simple
4. Reliable
5. Let me describe

Reply with a number or explain.
```

**"Users"** →
```
## Users

Which users?

1. Just me
2. My team
3. Specific type of person
4. Let me describe

Reply with a number or explain.
```

**"It should be easy to use"** →
```
## Easy

Easy how?

1. Fewer clicks
2. No learning curve
3. Works on mobile
4. Let me describe

Reply with a number or explain.
```

Specifics are everything. Vague in = vague out.
</probing_techniques>

<coverage_check>
By the end of questioning, you should understand:

- [ ] What they're building (the thing)
- [ ] Why it needs to exist (the motivation)
- [ ] Who it's for (even if just themselves)
- [ ] What "done" looks like (measurable outcome)
- [ ] What's NOT in scope (boundaries)
- [ ] Any real constraints (tech, timeline, compatibility)
- [ ] What exists already (greenfield vs brownfield)

If gaps remain, weave questions naturally into the conversation. Don't suddenly switch to checklist mode.
</coverage_check>

<decision_gate>
When you feel you understand the vision, present the decision gate:

```
## Ready?

Ready to create PROJECT.md, or explore more?

1. Create PROJECT.md - Finalize and continue
2. Ask more questions - I'll dig into areas we haven't covered
3. Let me add context - I have more to share

Reply with a number.
```

If "Ask more questions" → identify gaps from coverage check → ask naturally → return to gate.

Loop until "Create PROJECT.md" selected.
</decision_gate>

<anti_patterns>
- **Interrogation** - Firing questions without building on answers
- **Checklist walking** - Going through domains regardless of conversation flow
- **Corporate speak** - "What are your success criteria?" "Who are your stakeholders?"
- **Rushing** - Minimizing questions to get to "the work"
- **Assuming** - Filling gaps with assumptions instead of asking
- **User skills** - NEVER ask about user's technical experience. LLM builds — user's skills are irrelevant.
- **Premature constraints** - Asking about tech stack before understanding the idea
- **Shallow acceptance** - Taking vague answers without probing for specifics
</anti_patterns>
</questioning_guide>
