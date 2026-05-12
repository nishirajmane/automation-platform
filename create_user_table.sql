CREATE TABLE "User" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password_hash" VARCHAR(255),
  "googleId" VARCHAR(255) UNIQUE,
  "name" VARCHAR(255),
  "tenantId" UUID,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
