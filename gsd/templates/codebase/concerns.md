# Codebase Concerns Template

Template for `.planning/codebase/CONCERNS.md` - captures known issues and areas requiring care.

**Purpose:** Surface actionable warnings about the codebase. Focused on "what to watch out for when making changes."

---

## File Template

```markdown
# Codebase Concerns

**Analysis Date:** [YYYY-MM-DD]

## Tech Debt

**[Area/Component]:**
- Issue: [What's the shortcut/workaround]
- Files: [`path/to/file.ts`, `path/to/other.ts`]
- Why: [Why it was done this way]
- Impact: [What breaks or degrades because of it]
- Fix approach: [How to properly address it]

**[Area/Component]:**
- Issue: [What's the shortcut/workaround]
- Files: [`path/to/file.ts`]
- Why: [Why it was done this way]
- Impact: [What breaks or degrades because of it]
- Fix approach: [How to properly address it]

## Known Bugs

**[Bug description]:**
- Symptoms: [What happens]
- Files: [`path/to/file.ts`]
- Trigger: [How to reproduce]
- Workaround: [Temporary mitigation if any]
- Root cause: [If known]
- Blocked by: [If waiting on something]

**[Bug description]:**
- Symptoms: [What happens]
- Files: [`path/to/file.ts`]
- Trigger: [How to reproduce]
- Workaround: [Temporary mitigation if any]
- Root cause: [If known]

## Security Considerations

**[Area requiring security care]:**
- Risk: [What could go wrong]
- Files: [`path/to/file.ts`]
- Current mitigation: [What's in place now]
- Recommendations: [What should be added]

**[Area requiring security care]:**
- Risk: [What could go wrong]
- Files: [`path/to/file.ts`]
- Current mitigation: [What's in place now]
- Recommendations: [What should be added]

## Performance Bottlenecks

**[Slow operation/endpoint]:**
- Problem: [What's slow]
- Files: [`path/to/file.ts`]
- Measurement: [Actual numbers: "500ms p95", "2s load time"]
- Cause: [Why it's slow]
- Improvement path: [How to speed it up]

**[Slow operation/endpoint]:**
- Problem: [What's slow]
- Files: [`path/to/file.ts`]
- Measurement: [Actual numbers]
- Cause: [Why it's slow]
- Improvement path: [How to speed it up]

## Fragile Areas

**[Component/Module]:**
- Files: [`path/to/file.ts`]
- Why fragile: [What makes it break easily]
- Common failures: [What typically goes wrong]
- Safe modification: [How to change it without breaking]
- Test coverage: [Is it tested? Gaps?]

**[Component/Module]:**
- Files: [`path/to/file.ts`]
- Why fragile: [What makes it break easily]
- Common failures: [What typically goes wrong]
- Safe modification: [How to change it without breaking]
- Test coverage: [Is it tested? Gaps?]

## Scaling Limits

**[Resource/System]:**
- Current capacity: [Numbers: "100 req/sec", "10k users"]
- Limit: [Where it breaks]
- Symptoms at limit: [What happens]
- Scaling path: [How to increase capacity]

## Dependencies at Risk

**[Package/Service]:**
- Risk: [e.g., "deprecated", "unmaintained", "breaking changes coming"]
- Impact: [What breaks if it fails]
- Migration plan: [Alternative or upgrade path]

## Missing Critical Features

**[Feature gap]:**
- Problem: [What's missing]
- Current workaround: [How users cope]
- Blocks: [What can't be done without it]
- Implementation complexity: [Rough effort estimate]

## Test Coverage Gaps

**[Untested area]:**
- What's not tested: [Specific functionality]
- Files: [`path/to/file.ts`]
- Risk: [What could break unnoticed]
- Priority: [High/Medium/Low]
- Difficulty to test: [Why it's not tested yet]

---

*Concerns audit: [date]*
*Update as issues are fixed or new ones discovered*
```

## Guidelines

**What belongs in CONCERNS.md:**
- Tech debt with clear impact and fix approach
- Known bugs with reproduction steps
- Security gaps and mitigation recommendations
- Performance bottlenecks with measurements
- Fragile code that breaks easily
- Scaling limits with numbers
- Dependencies that need attention
- Missing features that block workflows
- Test coverage gaps

**What does NOT belong here:**
- Opinions without evidence ("code is messy")
- Complaints without solutions ("auth sucks")
- Future feature ideas (that's for product planning)
- Normal TODOs (those live in code comments)
- Architectural decisions that are working fine
- Minor code style issues

**When filling this template:**
- **Always include file paths** - Concerns without locations are not actionable. Use backticks: `src/file.ts`
- Be specific with measurements ("500ms p95" not "slow")
- Include reproduction steps for bugs
- Suggest fix approaches, not just problems
- Focus on actionable items
- Prioritize by risk/impact
- Update as issues get resolved
- Add new concerns as discovered

**Tone guidelines:**
- Professional, not emotional ("N+1 query pattern" not "terrible queries")
- Solution-oriented ("Fix: add index" not "needs fixing")
- Risk-focused ("Could expose user data" not "security is bad")
- Factual ("3.5s load time" not "really slow")

**Useful for phase planning when:**
- Deciding what to work on next
- Estimating risk of changes
- Understanding where to be careful
- Prioritizing improvements
- Onboarding new contexts
- Planning refactoring work

**How this gets populated:**
Explore agents detect these during codebase mapping. Manual additions welcome for human-discovered issues. This is living documentation, not a complaint list.
