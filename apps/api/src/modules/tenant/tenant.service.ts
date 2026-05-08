import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TenantService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find a tenant by ID.
   * TODO: Add CRUD operations as needed.
   */
  async findById(id: string) {
    return this.prisma.tenant.findUnique({ where: { id } });
  }

  /**
   * Find a tenant by slug.
   */
  async findBySlug(slug: string) {
    return this.prisma.tenant.findUnique({ where: { slug } });
  }
}
