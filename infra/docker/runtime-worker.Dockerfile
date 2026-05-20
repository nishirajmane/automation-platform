# ─────────────────────────────────────────────────
# Stage 0: Prune the monorepo for the worker
# ─────────────────────────────────────────────────
FROM node:20-alpine AS pruner
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@app/runtime-worker --docker

# ─────────────────────────────────────────────────
# Stage 1: Install dependencies & build
# ─────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Copy pruned lockfile and package manifests
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json

# Install dependencies (only for worker and its shared packages)
RUN npm ci

# Copy pruned source files
COPY --from=pruner /app/out/full/ .
COPY --from=pruner /app/tsconfig.base.json ./tsconfig.base.json

# Build the worker
RUN npx turbo run build --filter=@app/runtime-worker

# Prune devDependencies to keep final image minimal
RUN npm prune --omit=dev

# ─────────────────────────────────────────────────
# Stage 2: Production image
# ─────────────────────────────────────────────────
FROM node:20-alpine AS runner

ENV NODE_ENV=production
WORKDIR /app

# Copy root manifests and pruned node_modules
COPY --from=builder /app/package.json         ./package.json
COPY --from=builder /app/package-lock.json    ./package-lock.json
COPY --from=builder /app/node_modules         ./node_modules

# Copy built worker and its package manifest
COPY --from=builder /app/apps/runtime-worker/dist        ./apps/runtime-worker/dist
COPY --from=builder /app/apps/runtime-worker/package.json ./apps/runtime-worker/package.json

# Copy shared packages (needed at runtime)
COPY --from=builder /app/packages/            ./packages/

# Create non-root user
RUN addgroup --system --gid 1001 appuser && \
    adduser  --system --uid 1001 appuser

USER appuser

# Worker does not expose ports — it only consumes from Redis queue

HEALTHCHECK --interval=60s --timeout=5s --retries=3 \
  CMD pgrep -f "node apps/runtime-worker" || exit 1

CMD ["node", "apps/runtime-worker/dist/index.js"]
