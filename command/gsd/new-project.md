---
description: Initialize a new project with deep context gathering and PROJECT.md
---

<objective>
Initialize a new project through comprehensive context gathering.

This is the most leveraged moment in any project. Deep questioning here means better plans, better execution, better outcomes.

Creates `.planning/` with PROJECT.md and config.json.
</objective>

<execution_context>
@{{GSD_PATH}}/references/principles.md
@{{GSD_PATH}}/references/questioning.md
@{{GSD_PATH}}/templates/project.md
@{{GSD_PATH}}/templates/config.json
</execution_context>

<context>
!`[ -d .planning ] && echo "PLANNING_EXISTS" || echo "NO_PLANNING"`
</context>

<process>

<step name="setup">
**MANDATORY FIRST STEP — Execute these checks before ANY user interaction:**

1. **Abort if project exists:**
   ```bash
   [ -f .planning/PROJECT.md ] && echo "ERROR: Project already initialized. Use /gsd/progress" && exit 1
   ```

2. **Initialize git repo in THIS directory** (required even if inside a parent repo):
   ```bash
   # Check if THIS directory is already a git repo root (handles .git file for worktrees too)
   if [ -d .git ] || [ -f .git ]; then
       echo "Git repo exists in current directory"
   else
       git init
       echo "Initialized new git repo"
   fi
   ```

3. **Detect existing code (brownfield detection):**
   ```bash
   # Check for existing code files
   CODE_FILES=$(find . -name "*.ts" -o -name "*.js" -o -name "*.py" -o -name "*.go" -o -name "*.rs" -o -name "*.swift" -o -name "*.java" 2>/dev/null | grep -v node_modules | grep -v .git | head -20)
   HAS_PACKAGE=$([ -f package.json ] || [ -f requirements.txt ] || [ -f Cargo.toml ] || [ -f go.mod ] || [ -f Package.swift ] && echo "yes")
   HAS_CODEBASE_MAP=$([ -d .planning/codebase ] && echo "yes")
   echo "CODE_FILES: $CODE_FILES"
   echo "HAS_PACKAGE: $HAS_PACKAGE"
   echo "HAS_CODEBASE_MAP: $HAS_CODEBASE_MAP"
   ```

   **You MUST run all bash commands above using the Bash tool before proceeding.**
</step>

<step name="brownfield_offer">
**If existing code detected and .planning/codebase/ doesn't exist:**

Check the results from setup step:
- If `CODE_FILES` is non-empty OR `HAS_PACKAGE` is "yes"
- AND `HAS_CODEBASE_MAP` is NOT "yes"

Present:

## Existing Code Detected

I detected existing code in this directory. Would you like to map the codebase first?

1. Map codebase first - Run /gsd/map-codebase to understand existing architecture (Recommended)
2. Skip mapping - Proceed with project initialization

Reply with a number.

**If "Map codebase first":**
```
Run `/gsd/map-codebase` first, then return to `/gsd/new-project`
```
Exit command.

**If "Skip mapping":** Continue to question step.

**If no existing code detected OR codebase already mapped:** Continue to question step.
</step>

<step name="question">
**CRITICAL: Use numbered options for ALL questions.**

**1. Open:**

## Vision

What do you want to build?

1. New app/tool
2. Feature for existing project
3. Let me describe it

Reply with a number or your own answer.

**2. Follow the thread:**

Based on their response, probe what they mentioned:

## [Topic they mentioned]

You mentioned [X] — what would that look like?

1. [Interpretation A]
2. [Interpretation B]
3. Something else

Reply with a number or your own answer.

**3. Sharpen the core:**

## Core

If you could only nail one thing, what would it be?

1. [Key aspect A they mentioned]
2. [Key aspect B they mentioned]
3. All equally important
4. Something else

Reply with a number or your own answer.

**4. Find boundaries:**

## Scope

What's explicitly NOT in v1?

1. [Tempting thing A]
2. [Tempting thing B]
3. Nothing specific
4. Let me list them

Reply with a number or your own answer.

**5. Ground in reality:**

## Constraints

Any hard constraints?

1. [Relevant constraint type A]
2. [Relevant constraint type B]
3. None
4. Yes, let me explain

Reply with a number or your own answer.

**6. Decision gate:**

## Ready?

Ready to create PROJECT.md, or explore more?

1. Create PROJECT.md - Finalize and continue
2. Ask more questions - I'll dig deeper
3. Let me add context - You have more to share

Reply with a number.

If "Ask more questions" → check coverage gaps from `questioning.md` → return to step 2.
If "Let me add context" → receive input via their response → return to step 2.
Loop until "Create PROJECT.md" selected.
</step>

<step name="project">
Synthesize all context into `.planning/PROJECT.md` using the template from `templates/project.md`.

Do not compress. Capture everything gathered.
</step>

<step name="mode">
Ask workflow mode preference:

## Mode

How do you want to work?

1. Interactive - Confirm at each step
2. YOLO - Auto-approve, just execute

Reply with a number.

Create `.planning/config.json` with chosen mode using `templates/config.json` structure.
</step>

<step name="commit">
```bash
git add .planning/PROJECT.md .planning/config.json
git commit -m "$(cat <<'EOF'
docs: initialize [project-name]

[One-liner from PROJECT.md]

Creates PROJECT.md with vision and requirements.
EOF
)"

```
</step>

<step name="done">
Present completion inline (not as a question):

```
Project initialized:

- Project: .planning/PROJECT.md
- Config: .planning/config.json (mode: [chosen mode])
[If .planning/codebase/ exists:] - Codebase: .planning/codebase/ (7 documents)

---

## ▶ Next Up

**Create roadmap** — break project into phases

`/gsd/create-roadmap`

_(`/new` first for fresh context)_

---
```
</step>

</process>

<output>
- `.planning/PROJECT.md`
- `.planning/config.json`
</output>

<success_criteria>
- [ ] Deep questioning completed (not rushed)
- [ ] PROJECT.md captures full context
- [ ] config.json has workflow mode
- [ ] All committed to git
</success_criteria>
