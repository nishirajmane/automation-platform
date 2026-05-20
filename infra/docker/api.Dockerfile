# ─────────────────────────────────────────────────
# Stage 0: Prune the monorepo for the API
# ─────────────────────────────────────────────────
FROM node:20-alpine AS pruner
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@app/api --docker

# ─────────────────────────────────────────────────
# Stage 1: Install dependencies & build
# ─────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Copy pruned lockfile and package manifests
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json

# Install dependencies (only for API and its shared packages)
RUN npm ci

# Copy pruned source files
COPY --from=pruner /app/out/full/ .
COPY --from=pruner /app/tsconfig.base.json ./tsconfig.base.json

# Build the NestJS app
RUN npx turbo run build --filter=@app/api

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

# Copy built API and its package manifest
COPY --from=builder /app/apps/api/dist        ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json

# Copy shared packages (needed at runtime)
COPY --from=builder /app/packages/            ./packages/

# Create non-root user
RUN addgroup --system --gid 1001 appuser && \
    adduser  --system --uid 1001 appuser

USER appuser

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:4000/health || exit 1

CMD ["node", "apps/api/dist/main.js"]
