import { Worker } from 'bullmq';
import { createLogger } from '@app/shared-utils';
import { processAutomation } from './processor';

const logger = createLogger('RuntimeWorker');

const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';
const QUEUE_NAME = 'automation-executions';

/**
 * Creates and starts the BullMQ worker for automation executions.
 */
function startWorker() {
  logger.info(`Connecting to Redis at ${REDIS_URL}`);
  logger.info(`Listening on queue: ${QUEUE_NAME}`);

  const worker = new Worker(QUEUE_NAME, processAutomation, {
    connection: { url: REDIS_URL },
    concurrency: 5,
  });

  worker.on('completed', (job) => {
    logger.info(`Job ${job.id} completed successfully`);
  });

  worker.on('failed', (job, err) => {
    logger.error(`Job ${job?.id} failed: ${err.message}`);
  });

  worker.on('error', (err) => {
    logger.error(`Worker error: ${err.message}`);
  });

  // Graceful shutdown
  const shutdown = async () => {
    logger.info('Shutting down worker…');
    await worker.close();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  logger.info('Worker is running. Waiting for jobs…');
}

startWorker();
