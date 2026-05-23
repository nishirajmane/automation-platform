CREATE TABLE IF NOT EXISTS "Tenant" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(255),
  "slug" VARCHAR(255) UNIQUE,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Product" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "tenantId" UUID REFERENCES "Tenant"("id"),
  "name" VARCHAR(255),
  "slug" VARCHAR(255),
  "description" TEXT,
  "price" DECIMAL(10,2),
  "pricingModel" VARCHAR(50),
  "thumbnailUrl" VARCHAR(1024),
  "category" VARCHAR(100),
  "version" VARCHAR(50),
  "features" JSONB,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
