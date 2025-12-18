# External Integrations Template

Template for `.planning/codebase/INTEGRATIONS.md` - captures external service dependencies.

**Purpose:** Document what external systems this codebase communicates with. Focused on "what lives outside our code that we depend on."

---

## File Template

```markdown
# External Integrations

**Analysis Date:** [YYYY-MM-DD]

## APIs & External Services

**Payment Processing:**
- [Service] - [What it's used for: e.g., "subscription billing, one-time payments"]
  - SDK/Client: [e.g., "stripe npm package v14.x"]
  - Auth: [e.g., "API key in STRIPE_SECRET_KEY env var"]
  - Endpoints used: [e.g., "checkout sessions, webhooks"]

**Email/SMS:**
- [Service] - [What it's used for: e.g., "transactional emails"]
  - SDK/Client: [e.g., "sendgrid/mail v8.x"]
  - Auth: [e.g., "API key in SENDGRID_API_KEY env var"]
  - Templates: [e.g., "managed in SendGrid dashboard"]

**External APIs:**
- [Service] - [What it's used for]
  - Integration method: [e.g., "REST API via fetch", "GraphQL client"]
  - Auth: [e.g., "OAuth2 token in AUTH_TOKEN env var"]
  - Rate limits: [if applicable]

## Data Storage

**Databases:**
- [Type/Provider] - [e.g., "PostgreSQL on Supabase"]
  - Connection: [e.g., "via DATABASE_URL env var"]
  - Client: [e.g., "Prisma ORM v5.x"]
  - Migrations: [e.g., "prisma migrate in migrations/"]

**File Storage:**
- [Service] - [e.g., "AWS S3 for user uploads"]
  - SDK/Client: [e.g., "@aws-sdk/client-s3"]
  - Auth: [e.g., "IAM credentials in AWS_* env vars"]
  - Buckets: [e.g., "prod-uploads, dev-uploads"]

**Caching:**
- [Service] - [e.g., "Redis for session storage"]
  - Connection: [e.g., "REDIS_URL env var"]
  - Client: [e.g., "ioredis v5.x"]

## Authentication & Identity

**Auth Provider:**
- [Service] - [e.g., "Supabase Auth", "Auth0", "custom JWT"]
  - Implementation: [e.g., "Supabase client SDK"]
  - Token storage: [e.g., "httpOnly cookies", "localStorage"]
  - Session management: [e.g., "JWT refresh tokens"]

**OAuth Integrations:**
- [Provider] - [e.g., "Google OAuth for sign-in"]
  - Credentials: [e.g., "GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET"]
  - Scopes: [e.g., "email, profile"]

## Monitoring & Observability

**Error Tracking:**
- [Service] - [e.g., "Sentry"]
  - DSN: [e.g., "SENTRY_DSN env var"]
  - Release tracking: [e.g., "via SENTRY_RELEASE"]

**Analytics:**
- [Service] - [e.g., "Mixpanel for product analytics"]
  - Token: [e.g., "MIXPANEL_TOKEN env var"]
  - Events tracked: [e.g., "user actions, page views"]

**Logs:**
- [Service] - [e.g., "CloudWatch", "Datadog", "none (stdout only)"]
  - Integration: [e.g., "AWS Lambda built-in"]

## CI/CD & Deployment

**Hosting:**
- [Platform] - [e.g., "Vercel", "AWS Lambda", "Docker on ECS"]
  - Deployment: [e.g., "automatic on main branch push"]
  - Environment vars: [e.g., "configured in Vercel dashboard"]

**CI Pipeline:**
- [Service] - [e.g., "GitHub Actions"]
  - Workflows: [e.g., "test.yml, deploy.yml"]
  - Secrets: [e.g., "stored in GitHub repo secrets"]

## Environment Configuration

**Development:**
- Required env vars: [List critical vars]
- Secrets location: [e.g., ".env.local (gitignored)", "1Password vault"]
- Mock/stub services: [e.g., "Stripe test mode", "local PostgreSQL"]

**Staging:**
- Environment-specific differences: [e.g., "uses staging Stripe account"]
- Data: [e.g., "separate staging database"]

**Production:**
- Secrets management: [e.g., "Vercel environment variables"]
- Failover/redundancy: [e.g., "multi-region DB replication"]

## Webhooks & Callbacks

**Incoming:**
- [Service] - [Endpoint: e.g., "/api/webhooks/stripe"]
  - Verification: [e.g., "signature validation via stripe.webhooks.constructEvent"]
  - Events: [e.g., "payment_intent.succeeded, customer.subscription.updated"]

**Outgoing:**
- [Service] - [What triggers it]
  - Endpoint: [e.g., "external CRM webhook on user signup"]
  - Retry logic: [if applicable]

---

*Integration audit: [date]*
*Update when adding/removing external services*
```

## Guidelines

**What belongs in INTEGRATIONS.md:**
- External services the code communicates with
- Authentication patterns (where secrets live, not the secrets themselves)
- SDKs and client libraries used
- Environment variable names (not values)
- Webhook endpoints and verification methods
- Database connection patterns
- File storage locations
- Monitoring and logging services

**What does NOT belong here:**
- Actual API keys or secrets (NEVER write these)
- Internal architecture (that's ARCHITECTURE.md)
- Code patterns (that's CONVENTIONS.md)
- Technology choices (that's STACK.md)
- Performance issues (that's CONCERNS.md)

**When filling this template:**
- Check .env.example or .env.template for required env vars
- Look for SDK imports (stripe, @sendgrid/mail, etc.)
- Check for webhook handlers in routes/endpoints
- Note where secrets are managed (not the secrets)
- Document environment-specific differences (dev/staging/prod)
- Include auth patterns for each service

**Useful for phase planning when:**
- Adding new external service integrations
- Debugging authentication issues
- Understanding data flow outside the application
- Setting up new environments
- Auditing third-party dependencies
- Planning for service outages or migrations

**Security note:**
Document WHERE secrets live (env vars, Vercel dashboard, 1Password), never WHAT the secrets are.
