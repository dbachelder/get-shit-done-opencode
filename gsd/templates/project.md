# PROJECT.md Template

Template for `.planning/PROJECT.md` - an evolutionary document that grows with your project.

## Philosophy

PROJECT.md evolves from static initialization document to living requirements tracker:

1. **At init:** Captures vision and initial hypotheses
2. **After shipping:** Requirements move from Active to Validated (or Out of Scope)
3. **Key decisions:** Accumulated with outcomes over time
4. **Regular reviews:** Full review at milestone completion, spot updates during execution

## Template

```markdown
# [Project Name]

## What This Is

[Current accurate description - updated when reality drifts from original vision.
Start with 2-4 paragraphs capturing full picture, compress over time as project matures.]

## Core Value

[The ONE thing. If everything else fails, this must work.
This is your north star for scope decisions.]

## Requirements

### Validated
<!-- Shipped and confirmed valuable by users/testing -->

- [Feature] — v[X.Y]

### Active
<!-- Current hypotheses being built -->

- [ ] [Feature/capability]
- [ ] [Feature/capability]
- [ ] [Feature/capability]

### Out of Scope
<!-- Explicitly excluded, with reasoning -->

- [Feature] — [reason why excluded]
- [Feature] — [reason why excluded]

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| [Choice made] | [Why this choice] | [Good / Revisit / Pending] |
| [Choice made] | [Why this choice] | [Good / Revisit / Pending] |

Outcome markers:
- **Good** - Decision proven correct, keep it
- **Revisit** - Causing issues, reconsider in future milestone
- **Pending** - Too early to evaluate

## Context

[Background information that informs implementation:
- Prior work or experience relevant to this project
- Technical environment or ecosystem context
- Explored alternatives and why rejected
- Constraints (tech stack, timeline, resources, dependencies)]

*Last updated: YYYY-MM-DD after [trigger: init/milestone/drift]*
```

## Evolution Triggers

**When to update PROJECT.md:**

| Trigger | What to Update | Who Updates |
|---------|---------------|-------------|
| Project init | Full document creation | `/gsd/new-project` |
| Milestone complete | Full review, move Active→Validated | `/gsd/complete-milestone` |
| Significant drift | What This Is, Active requirements | During execution |
| Key decision made | Key Decisions table | During execution |
| Scope change | Active/Out of Scope sections | During planning |

## Update Patterns

### After Milestone (Full Review)

```markdown
## Requirements

### Validated
<!-- Moved from Active after shipping v1.0 -->
- User authentication with JWT — v1.0
- Protected API routes — v1.0
- Basic CRUD operations — v1.0

### Active
<!-- New hypotheses for v1.1 -->
- [ ] Rate limiting
- [ ] Admin dashboard
- [ ] Email notifications

### Out of Scope
- OAuth providers — deferring to v2.0, focus on core first
- Mobile app — web-first approach validated
```

### Decision Tracking

```markdown
## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| jose over jsonwebtoken | Better TypeScript support, smaller bundle | Good |
| Prisma over raw SQL | Type safety, migrations | Good |
| Skip OAuth for v1 | Reduce scope, validate core first | Pending |
| Custom auth over Clerk | Full control, no vendor lock-in | Revisit |
```

## Integration with STATE.md

STATE.md no longer copies an immutable "Project Summary" section. Instead:

**STATE.md references PROJECT.md:**
```markdown
## Project Reference

See `.planning/PROJECT.md` for current project state.

**Core Value:** [One line from PROJECT.md Core Value section]
**Current Focus:** [Current Active requirements summary]
```

This keeps STATE.md lean (~100 lines) while PROJECT.md holds the complete picture.

## Guidelines

**Do:**
- Update "What This Is" when reality drifts from description
- Move requirements between sections as status changes
- Add decision outcomes when you learn what worked
- Include "Last updated" with trigger reason

**Don't:**
- Keep stale descriptions that no longer match reality
- Leave Active requirements after they've shipped
- Forget to add Out of Scope reasoning
- Make PROJECT.md too long (compress older sections)

**Size target:** Keep under 150 lines. If growing too large:
- Compress "What This Is" to essentials
- Archive old Validated items to milestone docs
- Summarize Context section
