import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find a user by ID.
   * TODO: Add CRUD, password hashing, etc.
   */
  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  /**
   * Find a user by email.
   */
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  /**
   * List all users for a given tenant.
   */
  async findByTenant(tenantId: string) {
    return this.prisma.user.findMany({ where: { tenantId } });
  }
}
