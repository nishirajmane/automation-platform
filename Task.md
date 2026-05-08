You are a senior full‑stack engineer and DevOps architect.

Goal: Scaffold a production‑ready monorepo for an “AI Automations & Bots Marketplace” SaaS platform.

Do NOT build full business logic. Focus on:
- Clean folder structure
- Minimal but working boilerplate code
- Environment/config wiring
- Docker + Kubernetes manifests
- GitHub Actions CI/CD skeletons

Tech stack:
- Package management: pnpm with workspaces
- Frontend: Next.js (latest, App Router) + TypeScript + TailwindCSS
- Backend API: Node.js + TypeScript (NestJS preferred; Express acceptable if simpler)
- Worker: Node.js + TypeScript runtime worker for executing automations via a job queue (BullMQ with Redis)
- Database: PostgreSQL (via Prisma or TypeORM)
- Cache/Queue: Redis
- Infra: Docker + Kubernetes (generic manifests, targeting managed clusters like DigitalOcean Kubernetes)
- CI/CD: GitHub Actions (build, test, docker build & push, deploy to K8s)

You are working in a completely empty repository.
Create all necessary files and folders.

========================================
1. Monorepo layout
========================================

Create a pnpm‑based monorepo with this structure:

- package.json                  # root, with pnpm workspaces
- pnpm-workspace.yaml
- turbo.json (or nx.json)       # task runner config (Turborepo preferred)
- tsconfig.base.json
- .editorconfig
- .gitignore
- .prettierrc / eslint config

- apps/
  - web/                        # Next.js frontend (marketplace + dashboards)
  - api/                        # NestJS/Express backend API
  - runtime-worker/             # Worker that executes automations from a queue

- packages/
  - db/                         # ORM models, migrations, DB utils
  - shared-types/               # Shared TypeScript types/interfaces
  - shared-utils/               # Logging, error helpers, config loaders

- infra/
  - k8s/
    - base/
      - namespace.yaml
      - configmap.yaml
      - secrets.example.yaml    # example; real secrets via K8s or cloud manager
    - web/
      - deployment.yaml
      - service.yaml
    - api/
      - deployment.yaml
      - service.yaml
    - runtime-worker/
      - deployment.yaml
    - ingress/
      - ingress.yaml
  - docker/
    - web.Dockerfile
    - api.Dockerfile
    - runtime-worker.Dockerfile

- .github/
  - workflows/
    - ci.yml                    # test + lint + typecheck
    - build.yml                 # build & push Docker images
    - deploy.yml                # deploy to Kubernetes

========================================
2. Root config & tooling
========================================

At repo root:

- Configure pnpm workspaces to include:
  - "apps/*"
  - "packages/*"

- package.json:
  - Scripts for:
    - "dev:web", "dev:api", "dev:worker"
    - "build:web", "build:api", "build:worker"
    - "lint", "test", "typecheck"
    - Monorepo‑level "dev" and "build" using Turborepo or a simple script

- turbo.json:
  - Define pipelines for build, lint, test, dev with proper dependency graph between apps and packages.

- tsconfig.base.json:
  - Base TypeScript settings with path aliases to packages (e.g. @app/db, @app/shared-types).

========================================
3. Frontend app: apps/web
========================================

Stack:
- Next.js (latest, App Router) + TypeScript
- TailwindCSS + basic shadcn‑style component setup (no heavy UI library)

Implement:

- Minimal routes:
  - "/" → marketing landing page placeholder
  - "/dashboard" → simple logged‑in creator dashboard placeholder
  - "/marketplace" → placeholder marketplace listing page

- Basic layout with:
  - Top nav (logo text, links to Marketplace, Dashboard, Sign in)
  - Simple responsive layout and dark/light mode toggling if easy

- Type‑safe API calls:
  - A small client wrapper to call the backend API (e.g. /api/health) and display the status on the dashboard page.

- Tailwind setup:
  - Tailwind config and basic design tokens
  - Global CSS with sensible defaults

Use environment variables for API base URL (e.g. NEXT_PUBLIC_API_BASE_URL).

========================================
4. Backend API: apps/api
========================================

Stack:
- NestJS (preferred) with TypeScript
  - If NestJS is too heavy, fall back to Express with a modular structure.

Core modules (only minimal functionality; just skeletons):

- AppModule / main server bootstrap
- ConfigModule:
  - Loads env vars: DB URL, Redis URL, JWT secrets, etc.
- AuthModule:
  - Basic local auth placeholder (no need to fully implement OAuth)
  - Provide an example /auth/sign-in route with dummy implementation
- TenantModule:
  - Tenant entity with tenant_id / org_id
  - Multi‑tenant pattern: every relevant model should reference tenant_id
- UserModule:
  - Basic User entity (id, email, role, tenant_id)
- ProductModule:
  - Represents “bots/automations” listings
  - Fields: id, tenant_id, name, slug, description, price, pricingModel (enum), status
- HealthModule:
  - /health endpoint returning app + DB + Redis status

Database:

- Use Prisma OR TypeORM via packages/db.
- Define initial schema with at least:
  - Tenant
  - User
  - Product
- Multi‑tenant pattern: each table (except Tenant) has tenant_id.
- Add migration scripts and a README explaining how to run migrations.

Expose minimal REST endpoints (NestJS Controllers):

- GET /health
- GET /products (lists products for current tenant)
- POST /products (creates a product with a hardcoded tenant for now)

========================================
5. Shared packages
========================================

packages/db:
- Export Prisma/TypeORM client and entities
- Provide migration scripts
- Centralize DB connection configuration using env vars

packages/shared-types:
- Define shared interfaces:
  - User, Tenant, Product, HealthStatus, etc.
- Ensure both web and api can import types via path aliases.

packages/shared-utils:
- Logging utility (console‑based; easy to swap for a better logger later)
- Config loader that reads env vars and provides typed config objects

========================================
6. Runtime worker: apps/runtime-worker
========================================

Stack:
- Node.js + TypeScript
- BullMQ (Redis‑backed) for job processing

Implement:

- A worker that connects to Redis using env vars
- One example queue:
  - "automation-executions"
- A simple processor:
  - Logs job payload (e.g. { automationId, tenantId, payload })
  - Simulates execution with a timeout
- Export a small API to enqueue jobs (used by api in future; for now leave a TODO / placeholder comment)

Use a simple config pattern similar to api (shared utils).

========================================
7. Dockerization
========================================

Create Dockerfiles in infra/docker:

- web.Dockerfile:
  - Multi‑stage build:
    1. Install deps + build Next.js
    2. Copy .next and run with node in production
  - Use NODE_ENV=production and healthcheck

- api.Dockerfile:
  - Multi‑stage build:
    1. Install deps + build NestJS
    2. Copy dist and run node dist/main.js
  - Healthcheck that hits /health

- runtime-worker.Dockerfile:
  - Multi‑stage build for TS worker
  - Entrypoint runs the worker process

Ensure Dockerfiles assume env vars for DB, Redis, etc., not hardcoded hosts.

========================================
8. Kubernetes manifests
========================================

Under infra/k8s:

base/namespace.yaml:
- Create a namespace, e.g. "ai-marketplace"

base/configmap.yaml:
- Non‑secret configuration values (APP_NAME, NODE_ENV, etc.)

base/secrets.example.yaml:
- Example showing keys needed (DB_URL, REDIS_URL, JWT_SECRET, etc.)
- NOTE: Indicate that real secrets should be created via kubectl or cloud secret manager.

web/deployment.yaml & service.yaml:
- Deployment:
  - Image: placeholder like ghcr.io/ORG/ai-marketplace-web:latest
  - Env from ConfigMap + Secret
  - Liveness & readiness probes hitting a simple health endpoint
- Service:
  - ClusterIP exposing web on port 3000

api/deployment.yaml & service.yaml:
- Similar to web, but for api
- Expose port 4000 (or 3001)
- Liveness/readiness hitting /health

runtime-worker/deployment.yaml:
- Deployment for worker with:
  - No Service (does not receive external traffic)
  - Just needs Redis + DB env vars

ingress/ingress.yaml:
- Single Ingress resource routing:
  - / → web service
  - /api/* → api service
- Assume TLS will be managed by cert-manager/Let’s Encrypt (add placeholder annotations and comments)

========================================
9. GitHub Actions CI/CD
========================================

Create three workflows in .github/workflows:

A) ci.yml (on pull_request + push to main):
- Checkout repo
- Setup pnpm + Node
- Install deps with caching
- Run:
  - pnpm lint
  - pnpm test
  - pnpm build (or turbo run build)
- Fail fast on errors

B) build.yml (build & push Docker images):
- Trigger: on push to main (after ci.yml is successful)
- Steps:
  - Checkout
  - Setup Docker Buildx
  - Login to container registry (Docker Hub or GHCR) using secrets
  - Build & push:
    - web image
    - api image
    - runtime-worker image
  - Tag with:
    - latest
    - git SHA

C) deploy.yml (deploy to Kubernetes):
- Trigger: on successful completion of build.yml or on tag push
- Steps:
  - Checkout
  - Setup kubectl context using kubeconfig/cluster secrets
  - Apply manifests from infra/k8s (or a Helm chart if you create one)
  - Optionally run "kubectl set image" to update Deployments with the new image tags

Keep workflows minimal but production‑oriented, with clear TODO comments where the user should plug in their registry and cluster details.

========================================
10. README and developer UX
========================================

Create a top‑level README.md that explains:

- Project overview and goals (AI automations & bots marketplace)
- Tech stack summary
- Monorepo structure explanation
- How to run locally:
  - Requirements (Node, pnpm, Docker, Postgres, Redis)
  - Commands: pnpm install, pnpm dev, etc.
- How to run DB migrations
- How to build Docker images
- How to deploy:
  - High‑level description of GitHub Actions workflows
  - How to manually apply K8s manifests

========================================
11. General rules
========================================

- Use clear comments and TODO markers where business logic should be added later.
- Favor simplicity and clarity over clever abstractions.
- Ensure the repository is in a compilable, runnable state:
  - "pnpm install" then "pnpm dev" should start web + api + worker (as much as reasonable).
- Avoid adding any external SaaS‑specific configs (like DigitalOcean IDs); keep infra generic but clearly documented.