---
description: Create roadmap with phases for the project
---

<objective>
Create project roadmap with phase breakdown.

Roadmaps define the phase breakdown - what work happens in what order.
Use after /gsd/new-project to break the project into phases.
</objective>

<execution_context>
@{{GSD_PATH}}/workflows/create-roadmap.md
@{{GSD_PATH}}/templates/roadmap.md
@{{GSD_PATH}}/templates/state.md
</execution_context>

<context>
@.planning/PROJECT.md

**Load config:**
@.planning/config.json
</context>

<process>

<step name="validate">
```bash
# Verify project exists
[ -f .planning/PROJECT.md ] || { echo "ERROR: No PROJECT.md found. Run /gsd/new-project first."; exit 1; }
```
</step>

<step name="check_existing">
Check if roadmap already exists:

```bash
[ -f .planning/ROADMAP.md ] && echo "ROADMAP_EXISTS" || echo "NO_ROADMAP"
```

**If ROADMAP_EXISTS:**

## Roadmap Exists

A roadmap already exists. What would you like to do?

1. View existing - Show current roadmap
2. Replace - Create new roadmap (will overwrite)
3. Cancel - Keep existing roadmap

Reply with a number.

If "View existing": `cat .planning/ROADMAP.md` and exit
If "Cancel": Exit
If "Replace": Continue with workflow
</step>

<step name="create_roadmap">
Follow the create-roadmap.md workflow starting from detect_domain step.

The workflow handles:
- Domain expertise detection
- Phase identification (informed by research if present)
- Research flags for each phase
- Confirmation gates (respecting config mode)
- ROADMAP.md creation
- STATE.md initialization
- Phase directory creation
- Git commit
</step>

<step name="done">
```
Roadmap created:
- Roadmap: .planning/ROADMAP.md
- State: .planning/STATE.md
- [N] phases defined

---

## ▶ Next Up

**Phase 1: [name]** — [goal from roadmap]

`/gsd/plan-phase 1`

<sub>`/clear` first → fresh context window</sub>

---

**Also available:**
- `/gsd/discuss-phase 1` — gather context first
- `/gsd/research-phase 1` — for niche domains

---
```
</step>

</process>

<output>
- `.planning/ROADMAP.md`
- `.planning/STATE.md`
- `.planning/phases/XX-name/` directories
</output>

<success_criteria>
- [ ] PROJECT.md validated
- [ ] Research incorporated if present
- [ ] ROADMAP.md created with phases
- [ ] STATE.md initialized
- [ ] Phase directories created
- [ ] Changes committed
</success_criteria>
