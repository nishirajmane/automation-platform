import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@app/db';
import { createLogger } from '@app/shared-utils';

const logger = createLogger('PrismaService');

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
      logger.info('Connected to database');
    } catch (error) {
      logger.warn(
        'Could not connect to database. Some features will be unavailable.',
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
