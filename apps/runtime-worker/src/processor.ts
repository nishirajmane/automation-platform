import type { Job, Processor } from 'bullmq';
import type { AutomationJobPayload, AutomationJobResult } from '@app/shared-types';
import { createLogger } from '@app/shared-utils';

const logger = createLogger('AutomationProcessor');

/**
 * Processes an automation execution job.
 * Currently a stub that simulates work with a delay.
 *
 * TODO: Replace with actual automation execution logic.
 */
export const processAutomation: Processor<AutomationJobPayload, AutomationJobResult> = async (
  job: Job<AutomationJobPayload, AutomationJobResult>,
) => {
  const { automationId, tenantId, payload } = job.data;

  logger.info(`Processing automation`, {
    jobId: job.id,
    automationId,
    tenantId,
    payload,
  });

  const startTime = Date.now();

  // Simulate execution with a 1–3 second delay
  const delay = 1000 + Math.random() * 2000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const executionTimeMs = Date.now() - startTime;

  logger.info(`Automation executed in ${executionTimeMs}ms`, {
    jobId: job.id,
    automationId,
  });

  // TODO: Execute the actual automation logic
  // TODO: Store execution results in the database

  return {
    success: true,
    executionTimeMs,
    output: { message: 'Simulated execution completed' },
  };
};
