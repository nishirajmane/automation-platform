import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../../redis/redis.service';
import type { HealthStatus } from '@app/shared-types';

@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async check(): Promise<HealthStatus> {
    let dbStatus: 'up' | 'down' = 'down';
    let redisStatus: 'up' | 'down' = 'down';

    // Check database
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      dbStatus = 'up';
    } catch {
      dbStatus = 'down';
    }

    // Check Redis
    try {
      await this.redis.ping();
      redisStatus = 'up';
    } catch {
      redisStatus = 'down';
    }

    const allUp = dbStatus === 'up' && redisStatus === 'up';

    return {
      status: allUp ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      services: {
        app: 'up',
        database: dbStatus,
        redis: redisStatus,
      },
    };
  }
}
