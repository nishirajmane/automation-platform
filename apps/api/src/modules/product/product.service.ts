import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { createLogger } from '@app/shared-utils';

const logger = createLogger('ProductService');

// TODO: Replace with actual tenant resolution from auth context
const HARDCODED_TENANT_ID = '00000000-0000-0000-0000-000000000001';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * List all products (no tenant filter).
   */
  async findAll() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * List products for a specific tenant.
   */
  async findByTenant(tenantId: string) {
    return this.prisma.product.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Find a single product by ID.
   */
  async findById(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
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
    await this.prisma.tenant.upsert({
      where: { id: HARDCODED_TENANT_ID },
      update: {},
      create: {
        id: HARDCODED_TENANT_ID,
        name: 'Default Tenant',
        slug: 'default',
      },
    });

    return this.prisma.product.create({
      data: {
        tenantId: HARDCODED_TENANT_ID,
        name: dto.name,
        slug,
        description: dto.description,
        price: dto.price,
        pricingModel: dto.pricingModel,
      },
    });
  }
}
