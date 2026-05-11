# ─────────────────────────────────────────────────
# Stage 1: Install dependencies & build
# ─────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy workspace root files
COPY package.json package-lock.json turbo.json tsconfig.base.json ./

# Copy packages and the api app
COPY packages/ ./packages/
COPY apps/api/ ./apps/api/

# Install all dependencies
RUN npm ci

# Generate Prisma Client
RUN npm run generate --workspace=@app/db

# Build the NestJS app
RUN npx turbo run build --filter=@app/api

# ─────────────────────────────────────────────────
# Stage 2: Production image
# ─────────────────────────────────────────────────
FROM node:20-alpine AS runner

ENV NODE_ENV=production
WORKDIR /app

# Copy workspace root files
COPY package.json package-lock.json ./

# Copy built artifacts
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/packages/ ./packages/
COPY --from=builder /app/node_modules ./node_modules

# Create non-root user
RUN addgroup --system --gid 1001 appuser && \
    adduser  --system --uid 1001 appuser

USER appuser

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:4000/health || exit 1

CMD ["node", "apps/api/dist/main.js"]
