import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  /**
   * Find a user by ID.
   * TODO: Add CRUD, password hashing, etc.
   */
  async findById(id: string) {
    const res = await this.db.query('SELECT * FROM "User" WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  /**
   * Find a user by email.
   */
  async findByEmail(email: string) {
    const res = await this.db.query('SELECT * FROM "User" WHERE email = $1', [email]);
    return res.rows[0] || null;
  }

  /**
   * List all users for a given tenant.
   */
  async findByTenant(tenantId: string) {
    const res = await this.db.query('SELECT * FROM "User" WHERE "tenantId" = $1', [tenantId]);
    return res.rows;
  }
}
