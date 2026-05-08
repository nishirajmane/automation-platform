# ─────────────────────────────────────────────────
# Stage 1: Install dependencies & build
# ─────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy workspace root files
COPY package.json package-lock.json turbo.json tsconfig.base.json ./

# Copy packages and the worker app
COPY packages/ ./packages/
COPY apps/runtime-worker/ ./apps/runtime-worker/

# Install dependencies
RUN npm ci

# Build the worker
RUN npx turbo run build --filter=@app/runtime-worker

# ─────────────────────────────────────────────────
# Stage 2: Production image
# ─────────────────────────────────────────────────
FROM node:20-alpine AS runner

ENV NODE_ENV=production
WORKDIR /app

# Copy workspace root files
COPY package.json package-lock.json ./

# Copy built artifacts
COPY --from=builder /app/apps/runtime-worker/dist ./apps/runtime-worker/dist
COPY --from=builder /app/apps/runtime-worker/package.json ./apps/runtime-worker/
COPY --from=builder /app/apps/runtime-worker/node_modules ./apps/runtime-worker/node_modules
COPY --from=builder /app/packages/ ./packages/
COPY --from=builder /app/node_modules ./node_modules

# Create non-root user
RUN addgroup --system --gid 1001 appuser && \
    adduser  --system --uid 1001 appuser

USER appuser

# Worker does not expose ports — it only consumes from Redis queue

CMD ["node", "apps/runtime-worker/dist/index.js"]
