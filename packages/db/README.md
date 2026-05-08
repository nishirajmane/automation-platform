# @app/db — Database Package

This package centralises the Prisma ORM setup for the AI Marketplace.

## Setup

1. Ensure PostgreSQL is running and `DATABASE_URL` is set in `.env` at the repo root.

2. Generate the Prisma Client:

   ```bash
   pnpm db:generate
   ```

3. Run migrations (creates / updates tables):

   ```bash
   pnpm db:migrate
   ```

4. Or push schema directly (useful during prototyping):

   ```bash
   pnpm db:push
   ```

## Prisma Studio

Open the visual data browser:

```bash
pnpm --filter @app/db run studio
```

## Usage

```ts
import { prisma } from '@app/db';

const tenants = await prisma.tenant.findMany();
```
