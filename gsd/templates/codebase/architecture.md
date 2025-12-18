# Architecture Template

Template for `.planning/codebase/ARCHITECTURE.md` - captures conceptual code organization.

**Purpose:** Document how the code is organized at a conceptual level. Complements STRUCTURE.md (which shows physical file locations).

---

## File Template

```markdown
# Architecture

**Analysis Date:** [YYYY-MM-DD]

## Pattern Overview

**Overall:** [Pattern name: e.g., "Monolithic CLI", "Serverless API", "Full-stack MVC"]

**Key Characteristics:**
- [Characteristic 1: e.g., "Single executable"]
- [Characteristic 2: e.g., "Stateless request handling"]
- [Characteristic 3: e.g., "Event-driven"]

## Layers

[Describe the conceptual layers and their responsibilities]

**[Layer Name]:**
- Purpose: [What this layer does]
- Contains: [Types of code: e.g., "route handlers", "business logic"]
- Depends on: [What it uses: e.g., "data layer only"]
- Used by: [What uses it: e.g., "API routes"]

**[Layer Name]:**
- Purpose: [What this layer does]
- Contains: [Types of code]
- Depends on: [What it uses]
- Used by: [What uses it]

## Data Flow

[Describe the typical request/execution lifecycle]

**[Flow Name] (e.g., "HTTP Request", "CLI Command", "Event Processing"):**

1. [Entry point: e.g., "User runs command"]
2. [Processing step: e.g., "Router matches path"]
3. [Processing step: e.g., "Controller validates input"]
4. [Processing step: e.g., "Service executes logic"]
5. [Output: e.g., "Response returned"]

**State Management:**
- [How state is handled: e.g., "Stateless - no persistent state", "Database per request", "In-memory cache"]

## Key Abstractions

[Core concepts/patterns used throughout the codebase]

**[Abstraction Name]:**
- Purpose: [What it represents]
- Examples: [e.g., "UserService, ProjectService"]
- Pattern: [e.g., "Singleton", "Factory", "Repository"]

**[Abstraction Name]:**
- Purpose: [What it represents]
- Examples: [Concrete examples]
- Pattern: [Pattern used]

## Entry Points

[Where execution begins]

**[Entry Point]:**
- Location: [Brief: e.g., "src/index.ts", "API Gateway triggers"]
- Triggers: [What invokes it: e.g., "CLI invocation", "HTTP request"]
- Responsibilities: [What it does: e.g., "Parse args, route to command"]

## Error Handling

**Strategy:** [How errors are handled: e.g., "Exception bubbling to top-level handler", "Per-route error middleware"]

**Patterns:**
- [Pattern: e.g., "try/catch at controller level"]
- [Pattern: e.g., "Error codes returned to user"]

## Cross-Cutting Concerns

[Aspects that affect multiple layers]

**Logging:**
- [Approach: e.g., "Winston logger, injected per-request"]

**Validation:**
- [Approach: e.g., "Zod schemas at API boundary"]

**Authentication:**
- [Approach: e.g., "JWT middleware on protected routes"]

---

*Architecture analysis: [date]*
*Update when major patterns change*
```

## Guidelines

**What belongs in ARCHITECTURE.md:**
- Overall architectural pattern (monolith, microservices, layered, etc.)
- Conceptual layers and their relationships
- Data flow / request lifecycle
- Key abstractions and patterns
- Entry points
- Error handling strategy
- Cross-cutting concerns (logging, auth, validation)

**What does NOT belong here:**
- Specific file paths (that's STRUCTURE.md)
- Technology choices (that's STACK.md)
- Line-by-line code walkthrough (defer to code reading)
- Implementation details of specific features

**When filling this template:**
- Read main entry points (index, server, main)
- Identify layers by reading imports/dependencies
- Trace a typical request/command execution
- Note recurring patterns (services, controllers, repositories)
- Keep descriptions conceptual, not mechanical

**Useful for phase planning when:**
- Adding new features (where does it fit in the layers?)
- Refactoring (understanding current patterns)
- Identifying where to add code (which layer handles X?)
- Understanding dependencies between components
