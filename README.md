# AI Automations & Bots Marketplace

A production-ready SaaS platform for discovering, publishing and monetising AI-powered automations and bots.

---

## Tech Stack

| Layer          | Technology                                      |
| -------------- | ------------------------------------------------ |
| **Frontend**   | Next.js 15 (App Router) · TypeScript · TailwindCSS v4 |
| **Backend API**| NestJS 10 · TypeScript · PostgreSQL (pg)           |
| **Worker**     | Node.js · BullMQ · Redis                         |
| **Database**   | PostgreSQL                                       |
| **Cache/Queue**| Redis                                             |
| **Infra**      | Docker · Kubernetes · GitHub Actions              |
| **Monorepo**   | pnpm workspaces · Turborepo                       |

---

## Monorepo Structure

```
├── apps/
│   ├── web/                    # Next.js frontend (marketplace + dashboards)
│   ├── api/                    # NestJS backend API
│   └── runtime-worker/         # BullMQ worker for executing automations
│
├── packages/
│   ├── db/                     # Prisma schema, migrations, client
│   ├── shared-types/           # Shared TypeScript interfaces
│   └── shared-utils/           # Logger, config loader
│
├── infra/
│   ├── docker/                 # Dockerfiles for all services
│   └── k8s/                    # Kubernetes manifests
│       ├── base/               # Namespace, ConfigMap, Secrets
│       ├── web/                # Web deployment + service
│       ├── api/                # API deployment + service
│       ├── runtime-worker/     # Worker deployment
│       └── ingress/            # Ingress routing rules
│
├── .github/workflows/          # CI, build & push, deploy workflows
├── turbo.json                  # Turborepo pipeline config
├── pnpm-workspace.yaml         # pnpm workspace definition
└── tsconfig.base.json          # Shared TypeScript config
```

---

## Prerequisites

- **Node.js** ≥ 20
- **pnpm** ≥ 9 (`corepack enable && corepack prepare pnpm@9 --activate`)
- **PostgreSQL** (local or Docker)
- **Redis** (local or Docker)
- **Docker** (for building container images)
- **kubectl** (for Kubernetes deployments)

---

## Getting Started

### 1. Clone & Install

```bash
git clone <repo-url>
cd ai-marketplace

# Copy environment file
cp .env.example .env
# Edit .env with your DB, Redis, and JWT settings

# Install all dependencies
pnpm install
```

### 2. Setup Database

```bash
# Generate Prisma Client
pnpm db:generate

# Run database migrations (creates tables)
pnpm db:migrate

# OR push schema directly (useful for prototyping)
pnpm db:push
```

### 3. Run Locally

```bash
# Start all services (web + api + worker) via Turborepo
pnpm dev

# Or start individually:
pnpm dev:web      # http://localhost:3000
pnpm dev:api      # http://localhost:4000
pnpm dev:worker   # BullMQ worker
```

### 4. Verify

- **Frontend**: http://localhost:3000
- **API Health**: http://localhost:4000/health
- **Dashboard** (shows API status): http://localhost:3000/dashboard

---

## Database Migrations

The database layer lives in `packages/db/` using Prisma:

```bash
# Create a new migration
pnpm db:migrate

# Generate Prisma Client after schema changes
pnpm db:generate

# Push schema without migrations (prototyping)
pnpm db:push

# Open Prisma Studio (visual data browser)
pnpm --filter @app/db run studio
```

See [`packages/db/README.md`](./packages/db/README.md) for more details.

---

## Building Docker Images

All Dockerfiles are in `infra/docker/`:

```bash
# Build the web image
docker build -f infra/docker/web.Dockerfile -t ai-marketplace-web .

# Build the API image
docker build -f infra/docker/api.Dockerfile -t ai-marketplace-api .

# Build the worker image
docker build -f infra/docker/runtime-worker.Dockerfile -t ai-marketplace-runtime-worker .
```

---

## Deployment

### GitHub Actions

Three workflows in `.github/workflows/`:

| Workflow      | Trigger                        | Purpose                          |
| ------------- | ------------------------------ | -------------------------------- |
| `ci.yml`      | PR + push to main              | Lint, test, typecheck, build     |
| `build.yml`   | Push to main (after CI passes) | Build & push Docker images to GHCR |
| `deploy.yml`  | After build or on version tags | Apply K8s manifests & update images |

### Manual Kubernetes Deployment

```bash
# Apply namespace and base config
kubectl apply -f infra/k8s/base/namespace.yaml
kubectl apply -f infra/k8s/base/configmap.yaml

# Create secrets (do NOT use secrets.example.yaml in production)
kubectl create secret generic ai-marketplace-secrets \
  --namespace=ai-marketplace \
  --from-literal=DATABASE_URL='postgresql://...' \
  --from-literal=REDIS_URL='redis://...' \
  --from-literal=JWT_SECRET='your-secret'

# Deploy services
kubectl apply -f infra/k8s/web/
kubectl apply -f infra/k8s/api/
kubectl apply -f infra/k8s/runtime-worker/

# Apply ingress
kubectl apply -f infra/k8s/ingress/
```

---

## Available Scripts

| Script             | Description                                |
| ------------------ | ------------------------------------------ |
| `pnpm dev`         | Start all services in development mode     |
| `pnpm build`       | Build all packages and apps                |
| `pnpm lint`        | Lint all packages and apps                 |
| `pnpm test`        | Run all tests                              |
| `pnpm typecheck`   | TypeScript type checking                   |
| `pnpm dev:web`     | Start frontend only                        |
| `pnpm dev:api`     | Start backend API only                     |
| `pnpm dev:worker`  | Start runtime worker only                  |
| `pnpm db:migrate`  | Run Prisma migrations                      |
| `pnpm db:generate` | Generate Prisma Client                     |
| `pnpm db:push`     | Push schema to DB (no migration files)     |

---

## License

MIT
