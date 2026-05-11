import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { createLogger } from '@app/shared-utils';

const logger = createLogger('ProductService');

// TODO: Replace with actual tenant resolution from auth context
const HARDCODED_TENANT_ID = '00000000-0000-0000-0000-000000000001';

@Injectable()
export class ProductService {
  constructor(private readonly db: DatabaseService) {}

  /**
   * List all products (no tenant filter).
   */
  async findAll() {
    const res = await this.db.query('SELECT * FROM "Product" ORDER BY "createdAt" DESC');
    return res.rows;
  }

  /**
   * List products for a specific tenant.
   */
  async findByTenant(tenantId: string) {
    const res = await this.db.query('SELECT * FROM "Product" WHERE "tenantId" = $1 ORDER BY "createdAt" DESC', [tenantId]);
    return res.rows;
  }

  /**
   * Find a single product by ID.
   */
  async findById(id: string) {
    const res = await this.db.query('SELECT * FROM "Product" WHERE id = $1', [id]);
    const product = res.rows[0];
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  /**
   * Create a new product.
   * Uses a hardcoded tenantId for now.
   */
  async create(dto: CreateProductDto) {
    const slug = dto.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    logger.info('Creating product', { name: dto.name, slug });

    // Ensure the hardcoded tenant exists (create if not)
    await this.db.query(`
      INSERT INTO "Tenant" (id, name, slug)
      VALUES ($1, $2, $3)
      ON CONFLICT (id) DO NOTHING
    `, [HARDCODED_TENANT_ID, 'Default Tenant', 'default']);

    const res = await this.db.query(`
      INSERT INTO "Product" ("tenantId", name, slug, description, price, "pricingModel")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [HARDCODED_TENANT_ID, dto.name, slug, dto.description, dto.price, dto.pricingModel]);
    
    return res.rows[0];
  }
}

