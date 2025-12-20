# Add Issue Workflow

Quick capture of an enhancement idea to ISSUES.md.

## Execution Context

```
@.planning/ISSUES.md
@.planning/STATE.md
```

## Process

<step name="parse_arguments">
The issue description is: $ARGUMENTS

If the description is empty or blank:

```
ERROR: Issue description required
Usage: /gsd/add-issue <description>
Example: /gsd/add-issue Add dark mode toggle to settings
```

Exit.
</step>

<step name="determine_context">
Capture minimal context from current state:

1. Read `.planning/STATE.md` to get:
   - Current phase number
   - Current plan/task if available
   - Today's date

2. Default values if state unavailable:
   - Phase: "Setup" 
   - Task: "N/A"
   - Date: today

Context should be brief - this is for future reference, not documentation.
</step>

<step name="ensure_issues_file">
Check if ISSUES.md exists:

```bash
if [ ! -f .planning/ISSUES.md ]; then
  # Create from template
  ISSUES_FILE_CREATED=true
fi
```

If creating new file, use template from `gsd/templates/issues.md`:
- Copy template content
- Remove "## Template Notes" section (that's for reference only)
- Write to `.planning/ISSUES.md`

Confirm: "Created .planning/ISSUES.md"
</step>

<step name="calculate_issue_number">
Parse existing issues to find next number:

1. Search for pattern `### ISS-XXX:` in both Open and Closed sections
2. Extract all numbers
3. Find maximum
4. Add 1 for next issue

If no existing issues: start with ISS-001

Format as three-digit: `printf "ISS-%03d" $next_num`
</step>

<step name="infer_issue_type">
Based on the description, infer the most likely type:

| Keywords | Type |
|----------|------|
| slow, performance, speed, optimize, cache | Performance |
| refactor, cleanup, reorganize, simplify | Refactoring |
| UI, UX, user, interface, display, layout | UX |
| test, coverage, spec, assert | Testing |
| docs, readme, comment, explain | Documentation |
| a11y, accessibility, screen reader, aria | Accessibility |

Default to "Enhancement" if unclear.

This is a best guess - user can edit later.
</step>

<step name="append_issue">
Create the issue entry following the template format:

```markdown
### ISS-XXX: [Brief description]

- **Discovered:** Phase [X] Task [Z] (YYYY-MM-DD)
- **Type:** [Inferred type]
- **Description:** [The provided description, expanded slightly if very terse]
- **Impact:** Low (works correctly, this would enhance)
- **Effort:** TBD
- **Suggested phase:** Future
```

Append to the "## Open Enhancements" section in ISSUES.md:
1. Find the "## Open Enhancements" heading
2. Insert new issue after any existing issues (before "## Closed Enhancements")
3. Preserve blank line between issues
</step>

<step name="update_state">
If STATE.md exists, update the deferred issues count:

1. Look for "Deferred issues:" or similar counter
2. Increment by 1
3. If no counter exists, don't add one (not all projects track this)
</step>

<step name="completion">
Present brief confirmation:

```
Logged ISS-XXX: [description]

Added to .planning/ISSUES.md under Open Enhancements.

Review later with `/gsd/consider-issues` or address during phase planning.
```

**Do not offer next steps or continuation options** - the user wants to continue their current work, not switch context.
</step>

## Anti-patterns

- Don't ask clarifying questions - capture what was given
- Don't suggest creating a phase for this issue
- Don't offer to plan or prioritize the issue
- Don't expand the description extensively - keep it brief
- Don't commit changes (user decides when to commit)
- Don't show "Next Up" section - user should continue current work

## Success Criteria

- [ ] Issue appended to ISSUES.md in correct format
- [ ] ISS number auto-incremented correctly
- [ ] Type inferred from description keywords
- [ ] ISSUES.md created from template if it didn't exist
- [ ] Brief confirmation shown
- [ ] User can immediately continue previous work
