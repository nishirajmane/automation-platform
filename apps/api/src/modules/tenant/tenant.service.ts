import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../prisma/prisma.service';

@Injectable()
export class TenantService {
  constructor(private readonly db: DatabaseService) {}

  /**
   * Find a tenant by ID.
   * TODO: Add CRUD operations as needed.
   */
  async findById(id: string) {
    const res = await this.db.query('SELECT * FROM "Tenant" WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  /**
   * Find a tenant by slug.
   */
  async findBySlug(slug: string) {
    const res = await this.db.query('SELECT * FROM "Tenant" WHERE slug = $1', [slug]);
    return res.rows[0] || null;
  }
}
