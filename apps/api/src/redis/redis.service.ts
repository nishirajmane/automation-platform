import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { createLogger } from '@app/shared-utils';

const logger = createLogger('RedisService');

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor(configService: ConfigService) {
    const redisUrl = configService.get<string>('REDIS_URL', 'redis://localhost:6379');
    super(redisUrl, {
      maxRetriesPerRequest: null, // Required for BullMQ compatibility
      lazyConnect: true,
      retryStrategy(times) {
        // Stop retrying after 3 attempts in dev
        if (times > 3) return null;
        return Math.min(times * 500, 3000);
      },
    });

    // Suppress unhandled error events
    this.on('error', (err) => {
      if (err.message?.includes('ECONNREFUSED')) {
        // Only log once, not on every retry
        if (!this._connWarned) {
          logger.warn('Redis unavailable. Some features will be limited.');
          this._connWarned = true;
        }
      } else {
        logger.error(`Redis error: ${err.message}`);
      }
    });

    // Connect but don't crash if Redis is unavailable
    this.connect().catch(() => {
      // Error already handled by event listener above
    });
  }

  private _connWarned = false;

  async onModuleDestroy() {
    try {
      await this.quit();
    } catch {
      // Already disconnected
    }
  }
}
