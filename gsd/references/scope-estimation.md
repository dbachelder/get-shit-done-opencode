<scope_estimation>
Plans must maintain consistent quality from first task to last. This requires understanding quality degradation and splitting aggressively.

<quality_insight>
The LLM degrades when it *perceives* context pressure and enters "completion mode."

| Context Usage | Quality | LLM's State |
|---------------|---------|-------------|
| 0-30% | PEAK | Thorough, comprehensive |
| 30-50% | GOOD | Confident, solid work |
| 50-70% | DEGRADING | Efficiency mode begins |
| 70%+ | POOR | Rushed, minimal |

**The 40-50% inflection point:** The LLM sees context mounting and thinks "I'd better conserve now." Result: "I'll complete the remaining tasks more concisely" = quality crash.

**The rule:** Stop BEFORE quality degrades, not at context limit.
</quality_insight>

<context_target>
**Plans should complete within ~50% of context usage.**

Why 50% not 80%?
- No context anxiety possible
- Quality maintained start to finish
- Room for unexpected complexity
- If you target 80%, you've already spent 40% in degradation mode
</context_target>

<task_rule>
**Each plan: 2-3 tasks maximum. Stay under 50% context.**

| Task Complexity | Tasks/Plan | Context/Task | Total |
|-----------------|------------|--------------|-------|
| Simple (CRUD, config) | 3 | ~10-15% | ~30-45% |
| Complex (auth, payments) | 2 | ~20-30% | ~40-50% |
| Very complex (migrations, refactors) | 1-2 | ~30-40% | ~30-50% |

**When in doubt: Default to 2 tasks.** Better to have an extra plan than degraded quality.
</task_rule>

<split_signals>

<always_split>
- **More than 3 tasks** - Even if tasks seem small
- **Multiple subsystems** - DB + API + UI = separate plans
- **Any task with >5 file modifications** - Split by file groups
- **Checkpoint + implementation work** - Checkpoints in one plan, implementation after in separate plan
- **Discovery + implementation** - DISCOVERY.md in one plan, implementation in another
</always_split>

<consider_splitting>
- Estimated >5 files modified total
- Complex domains (auth, payments, data modeling)
- Any uncertainty about approach
- Natural semantic boundaries (Setup -> Core -> Features)
</consider_splitting>
</split_signals>

<splitting_strategies>
**By subsystem:** Auth → 01: DB models, 02: API routes, 03: Protected routes, 04: UI components

**By dependency:** Payments → 01: Stripe setup, 02: Subscription logic, 03: Frontend integration

**By complexity:** Dashboard → 01: Layout shell, 02: Data fetching, 03: Visualization

**By verification:** Deploy → 01: Vercel setup (checkpoint), 02: Env config (auto), 03: CI/CD (checkpoint)
</splitting_strategies>

<anti_patterns>
**Bad - Comprehensive plan:**
```
Plan: "Complete Authentication System"
Tasks: 8 (models, migrations, API, JWT, middleware, hashing, login form, register form)
Result: Task 1-3 good, Task 4-5 degrading, Task 6-8 rushed
```

**Good - Atomic plans:**
```
Plan 1: "Auth Database Models" (2 tasks)
Plan 2: "Auth API Core" (3 tasks)
Plan 3: "Auth API Protection" (2 tasks)
Plan 4: "Auth UI Components" (2 tasks)
Each: 30-40% context, peak quality, focused commits
```
</anti_patterns>

<estimating_context>
| Files Modified | Context Impact |
|----------------|----------------|
| 0-3 files | ~10-15% (small) |
| 4-6 files | ~20-30% (medium) |
| 7+ files | ~40%+ (large - split) |

| Complexity | Context/Task |
|------------|--------------|
| Simple CRUD | ~15% |
| Business logic | ~25% |
| Complex algorithms | ~40% |
| Domain modeling | ~35% |

**2 tasks:** Simple ~30%, Medium ~50%, Complex ~80% (split)
**3 tasks:** Simple ~45%, Medium ~75% (risky), Complex 120% (impossible)
</estimating_context>

<summary>
**2-3 tasks, 50% context target:**
- All tasks: Peak quality
- Git: Atomic, surgical commits
- Autonomous plans: Subagent execution (fresh context)

**The principle:** Aggressive atomicity. More plans, smaller scope, consistent quality.

**The rule:** If in doubt, split. Quality over consolidation. Always.
</summary>
</scope_estimation>
