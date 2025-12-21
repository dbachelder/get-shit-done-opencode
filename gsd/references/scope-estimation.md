<scope_estimation>
Plans must maintain consistent quality from first task to last. This requires understanding the **quality degradation curve** and splitting aggressively to stay in the peak quality zone.

<quality_degradation_curve>

**Critical insight:** LLMs don't degrade at arbitrary percentages - they degrade when they *perceive* context pressure and enter "completion mode."

```
Context Usage  │  Quality Level   │  LLM's Mental State
─────────────────────────────────────────────────────────
0-30%          │  ████████ PEAK   │  "I can be thorough and comprehensive"
               │                  │  No anxiety, full detail, best work

30-50%         │  ██████ GOOD     │  "Still have room, maintaining quality"
               │                  │  Engaged, confident, solid work

50-70%         │  ███ DEGRADING   │  "Getting tight, need to be efficient"
               │                  │  Efficiency mode, compression begins

70%+           │  █ POOR          │  "Running out, must finish quickly"
               │                  │  Self-lobotomization, rushed, minimal
```

**The 40-50% inflection point:**

This is where quality breaks. The LLM sees context mounting and thinks "I'd better conserve now or I won't finish." Result: The classic mid-execution statement "I'll complete the remaining tasks more concisely" = quality crash.

**The fundamental rule:** Stop BEFORE quality degrades, not at context limit.
</quality_degradation_curve>

<context_target>

**Plans should complete within ~50% of context usage.**

Why 50% not 80%?
- Huge safety buffer
- No context anxiety possible
- Quality maintained from start to finish
- Room for unexpected complexity
- Space for iteration and fixes

**If you target 80%, you're planning for failure.** By the time you hit 80%, you've already spent 40% in degradation mode.
</context_target>

<task_rule>

**Each plan should contain 2-3 tasks maximum. Context usage matters more than task count.**

**The real measure: Stay under 50% context usage.**

Task count is a proxy for context. Adjust based on task complexity:

**Simple tasks (CRUD, config, basic features):**
- 3 tasks is fine
- Each burns ~10-15% context
- Total: ~30-45% → Safe

**Complex tasks (auth, payments, architecture, integrations):**
- Stick to 2 tasks
- Each burns ~20-30% context
- Total: ~40-50% → At limit

**Very complex tasks (migrations, major refactors, novel patterns):**
- Consider 1-2 tasks only
- Each can burn 30-40% context
- Splitting to 1 task/plan is valid for high complexity

**Context estimation by task type:**

**Task 1 (0-15% context for simple, 0-30% for complex):**
- Fresh context
- Peak quality
- Comprehensive implementation
- Full testing

**Task 2 (15-35% context for simple, 30-50% for complex):**
- Still good quality
- Context pressure manageable
- Natural stopping point for complex work

**Task 3 (35-50% context for simple only):**
- Only include for simple tasks
- Skip for complex work
- Better to split complex work at 2 tasks

**Task 4+ (50%+ context):**
- NEVER do this
- Quality guaranteed to degrade
- Should have split earlier

**When in doubt: Default to 2 tasks.** Better to have an extra plan than degraded quality.

**The principle:** Each plan completes within 50% context. Task count is flexible based on complexity.
</task_rule>

<split_signals>

<always_split>

**1. More than 3 tasks**
- Even if tasks seem small
- Each additional task increases degradation risk
- Split into logical groups of 2-3

**2. Multiple subsystems**
```
❌ Bad (1 plan):
- Database schema (3 files)
- API routes (5 files)
- UI components (8 files)
Total: 16 files, 1 plan → guaranteed degradation

✅ Good (3 plans):
- 01-01-PLAN.md: Database schema (3 files, 2 tasks)
- 01-02-PLAN.md: API routes (5 files, 3 tasks)
- 01-03-PLAN.md: UI components (8 files, 3 tasks)
Total: 16 files, 3 plans → consistent quality
```

**3. Any task with >5 file modifications**
- Large tasks burn context fast
- Split by file groups or logical units
- Better: 3 plans of 2 files each vs 1 plan of 6 files

**4. Checkpoint + implementation work**
- Checkpoints require user interaction (context preserved)
- Implementation after checkpoint should be separate plan

✅ Good split:
- 02-01-PLAN.md: Setup (checkpoint: decision on auth provider)
- 02-02-PLAN.md: Implement chosen auth solution

**5. Discovery + implementation**
- Discovery produces DISCOVERY.md (separate plan)
- Implementation consumes DISCOVERY.md (separate plan)
- Clear boundary, clean handoff
</always_split>

<consider_splitting>

**1. Estimated >5 files modified total**
- Context from reading existing code
- Context from diffs
- Context from responses
- Adds up faster than expected

**2. Complex domains (auth, payments, data modeling)**
- These require careful thinking
- Burns more context per task than simple CRUD
- Split more aggressively

**3. Any uncertainty about approach**
- "Figure out X" phase separate from "implement X" phase
- Don't mix exploration and implementation

**4. Natural semantic boundaries**
- Setup → Core → Features
- Backend → Frontend
- Configuration → Implementation → Testing
</consider_splitting>
</split_signals>

<splitting_strategies>

<by_subsystem>

**Phase:** "Authentication System" (complex - 6 plans)

**Split:**
```
- 03-01-PLAN.md: Database models (User, Session, RefreshToken tables)
- 03-02-PLAN.md: Password utilities (hashing, validation, strength checks)
- 03-03-PLAN.md: Auth API - registration (endpoint, email verification flow)
- 03-04-PLAN.md: Auth API - login/logout (JWT issuance, refresh tokens)
- 03-05-PLAN.md: Protected routes (middleware, role-based access)
- 03-06-PLAN.md: UI components (login, register, forgot password forms)
```

Each plan: 2-3 tasks, single subsystem, clean commits. Complex domains warrant more plans.
</by_subsystem>

<by_dependency>

**Phase:** "Payment Integration" (moderate - 5 plans)

**Split:**
```
- 04-01-PLAN.md: Stripe setup (SDK, env vars, test mode config)
- 04-02-PLAN.md: Webhook infrastructure (endpoint, signature verification, event routing)
- 04-03-PLAN.md: Subscription logic (plans, pricing tiers, trial handling)
- 04-04-PLAN.md: Checkout flow (session creation, success/cancel handling)
- 04-05-PLAN.md: Customer portal (billing management, invoice history UI)
```

Later plans depend on earlier completion. Sequential execution, fresh context each time.
</by_dependency>

<by_complexity>

**Phase:** "Analytics Dashboard" (complex - 7 plans)

**Split:**
```
- 05-01-PLAN.md: Layout shell (simple: sidebar, header, routing)
- 05-02-PLAN.md: Data layer (TanStack Query setup, API client, caching)
- 05-03-PLAN.md: Summary cards (KPI widgets, sparklines)
- 05-04-PLAN.md: Time series charts (line/area charts, date range picker)
- 05-05-PLAN.md: Data tables (sortable, filterable, paginated tables)
- 05-06-PLAN.md: Real-time updates (WebSocket integration, live indicators)
- 05-07-PLAN.md: Export functionality (CSV/PDF generation, scheduled reports)
```

Complex work gets its own plan with full context budget. Don't compress complexity into fewer plans.
</by_complexity>

<by_verification_points>

**Phase:** "Production Deployment" (moderate - 5 plans)

**Split:**
```
- 06-01-PLAN.md: Infrastructure setup (Vercel project, domain config)
  → checkpoint:human-verify "base deploy loads at domain"

- 06-02-PLAN.md: Database provisioning (production DB, connection pooling)
  → checkpoint:human-verify "migrations run successfully"

- 06-03-PLAN.md: Environment config (secrets, env vars, feature flags)
  → Autonomous (no checkpoints) → subagent execution

- 06-04-PLAN.md: CI/CD pipeline (GitHub Actions, preview deploys, checks)
  → checkpoint:human-verify "PR preview works"

- 06-05-PLAN.md: Monitoring setup (error tracking, logging, alerts)
  → checkpoint:human-verify "test error appears in dashboard"
```

Verification checkpoints create natural boundaries. Autonomous plans between checkpoints execute via subagent with fresh context.
</by_verification_points>
</splitting_strategies>

<autonomous_vs_interactive>

**Critical optimization:** Plans without checkpoints don't need main context.

<autonomous_plans>
- Contains only `type="auto"` tasks
- No user interaction needed
- **Execute via subagent with fresh 200k context**
- Impossible to degrade (always starts at 0%)
- Creates SUMMARY, commits, reports back
- Can run in parallel (multiple subagents)
</autonomous_plans>

<interactive_plans>
- Contains `checkpoint:human-verify` or `checkpoint:decision` tasks
- Requires user interaction
- Must execute in main context
- Still target 50% context (2-3 tasks)

**Planning guidance:** If splitting a phase, try to:
- Group autonomous work together (→ subagent)
- Separate interactive work (→ main context)
- Maximize autonomous plans (more fresh contexts)

Example:
```
Phase: "E-commerce Cart System" (6 plans)
- 07-01-PLAN.md: Cart data models (autonomous) → subagent
- 07-02-PLAN.md: Cart API endpoints (autonomous) → subagent
- 07-03-PLAN.md: Cart state management (autonomous) → subagent
- 07-04-PLAN.md: Cart UI components (autonomous) → subagent
- 07-05-PLAN.md: Checkout flow (has checkpoint:decision for payment provider) → main context
- 07-06-PLAN.md: Order confirmation (has checkpoint:human-verify for email) → main context
```

Four fresh contexts via subagent, two interactive plans. Maximize autonomous work.
</interactive_plans>
</autonomous_vs_interactive>

<anti_patterns>

<antipattern_comprehensive>

```
Plan: "Complete Authentication System"
Tasks:
1. Database models
2. Migration files
3. Auth API endpoints
4. JWT utilities
5. Protected route middleware
6. Password hashing
7. Login form component
8. Registration form component

Result: 8 tasks, 80%+ context, degradation at task 4-5
```

**Why this fails:**
- Task 1-3: Good quality
- Task 4-5: "I'll do these concisely" = degradation begins
- Task 6-8: Rushed, minimal, poor quality
</antipattern_comprehensive>

<pattern_atomic>

```
Split into 6 plans:

Plan 1: "Auth Database Models" (2 tasks)
- Database schema (User, Session, RefreshToken)
- Migration files

Plan 2: "Password Utilities" (2 tasks)
- Hashing with bcrypt/argon2
- Validation and strength checking

Plan 3: "Auth API - Registration" (2 tasks)
- Register endpoint
- Email verification flow

Plan 4: "Auth API - Session Management" (3 tasks)
- Login endpoint
- Logout endpoint
- JWT utilities and refresh token rotation

Plan 5: "Auth Middleware" (2 tasks)
- Protected route middleware
- Role-based access control

Plan 6: "Auth UI Components" (3 tasks)
- Login form
- Registration form
- Forgot password flow
```

**Why this succeeds:**
- Each plan: 2-3 tasks, 30-40% context
- All tasks: Peak quality throughout
- Git history: 6 focused commits
- Easy to verify each piece
- Rollback is surgical
- Complex domain (auth) gets appropriate number of plans
</pattern_atomic>

<antipattern_efficiency_trap>

```
Thinking: "These tasks are small, let's do 6 to be efficient"

Result: Task 1-2 are good, task 3-4 begin degrading, task 5-6 are rushed
```

**Why this fails:** You're optimizing for fewer plans, not quality. The "efficiency" is false - poor quality requires more rework.
</antipattern_efficiency_trap>

<pattern_quality_first>

```
Thinking: "These tasks are small, but let's do 2-3 to guarantee quality"

Result: All tasks peak quality, clean commits, no rework needed
```

**Why this succeeds:** You optimize for quality, which is true efficiency. No rework = faster overall.
</pattern_quality_first>
</anti_patterns>

<estimating_context>

**Rough heuristics for plan size:**

<file_counts>
- 0-3 files modified: Small task (~10-15% context)
- 4-6 files modified: Medium task (~20-30% context)
- 7+ files modified: Large task (~40%+ context) - split this
</file_counts>

<complexity>
- Simple CRUD: ~15% per task
- Business logic: ~25% per task
- Complex algorithms: ~40% per task
- Domain modeling: ~35% per task
</complexity>

<two_task_plan>
- 2 simple tasks: ~30% total ✅ Plenty of room
- 2 medium tasks: ~50% total ✅ At target
- 2 complex tasks: ~80% total ❌ Too tight, split
</two_task_plan>

<three_task_plan>
- 3 simple tasks: ~45% total ✅ Good
- 3 medium tasks: ~75% total ⚠️ Pushing it
- 3 complex tasks: 120% total ❌ Impossible, split

**Conservative principle:** When in doubt, split. Better to have an extra plan than degraded quality.
</three_task_plan>
</estimating_context>

<atomic_commits>

**What we're optimizing for:** Beautiful git history where each commit is:
- Focused (2-3 related changes)
- Complete (fully implemented, tested)
- Documented (clear commit message)
- Reviewable (small enough to understand)
- Revertable (surgical rollback possible)

**Bad git history (large plans):**
```
feat(auth): Complete authentication system
- Added 16 files
- Modified 8 files
- 1200 lines changed
- Contains: models, API, UI, middleware, utilities
```

Impossible to review, hard to understand, can't revert without losing everything.

**Good git history (atomic plans):**
```
feat(auth-01): Add User and Session database models
- Added schema files
- Added migration
- 45 lines changed

feat(auth-02): Implement register and login API endpoints
- Added /api/auth/register
- Added /api/auth/login
- Added JWT utilities
- 120 lines changed

feat(auth-03): Add protected route middleware
- Added middleware/auth.ts
- Added tests
- 60 lines changed

feat(auth-04): Build login and registration forms
- Added LoginForm component
- Added RegisterForm component
- 90 lines changed
```

Each commit tells a story. Each is reviewable. Each is revertable. This is craftsmanship.
</atomic_commits>

<quality_assurance>

**The guarantee:** When you follow the 2-3 task rule with 50% context target:

1. **Consistency:** First task has same quality as last task
2. **Thoroughness:** No "I'll complete X concisely" degradation
3. **Documentation:** Full context budget for comments/tests
4. **Error handling:** Space for proper validation and edge cases
5. **Testing:** Room for comprehensive test coverage

**The cost:** More plans to manage.

**The benefit:** Consistent excellence. No rework. Clean history. Maintainable code.

**The trade-off is worth it.**
</quality_assurance>

<summary>

**2-3 tasks per plan, 50% context target:**
- All tasks: Peak quality
- Git: Atomic, surgical commits
- Quality: Consistent excellence
- Autonomous plans: Subagent execution (fresh context)

**Plan count scales with complexity:**
- Simple phase (add a feature): 2-3 plans
- Moderate phase (new integration): 4-5 plans
- Complex phase (auth, payments, dashboards): 6-8 plans
- Very complex phase (major subsystem): 8-10+ plans

**The principle:** Aggressive atomicity. More plans, smaller scope, consistent quality.

**The rule:** If in doubt, split. Quality over consolidation. Always.
</summary>
</scope_estimation>
