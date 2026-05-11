import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { db } from '@app/db';
import { createLogger } from '@app/shared-utils';

const logger = createLogger('DatabaseService');

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  public pool = db;

  async onModuleInit() {
    try {
      await this.pool.connect();
      logger.info('Connected to database via pg');
    } catch (error) {
      logger.warn(
        'Could not connect to database. Some features will be unavailable.',
      );
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  async query(text: string, params?: any[]) {
    return this.pool.query(text, params);
  }
}
