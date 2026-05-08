import { Queue } from 'bullmq';
import type { AutomationJobPayload } from '@app/shared-types';

const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';
const QUEUE_NAME = 'automation-executions';

/**
 * Factory to get a BullMQ queue for enqueuing automation jobs.
 *
 * Usage (from the API service, in future):
 *
 *   const queue = getAutomationQueue();
 *   await queue.add('execute', {
 *     automationId: 'abc-123',
 *     tenantId: 'tenant-1',
 *     payload: { input: 'hello' },
 *   });
 *
 * TODO: Integrate this into apps/api to enqueue jobs from product endpoints.
 */
export function getAutomationQueue(): Queue<AutomationJobPayload> {
  return new Queue(QUEUE_NAME, {
    connection: { url: REDIS_URL },
  });
}
