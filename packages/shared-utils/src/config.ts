/**
 * Type-safe config loader that reads environment variables
 * and provides typed configuration objects.
 */

export interface AppConfig {
  nodeEnv: string;
  port: number;
  databaseUrl: string;
  redisUrl: string;
  jwtSecret: string;
  jwtExpiresIn: string;
}

function getEnvOrThrow(key: string): string {
  const value = process.env[key];
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function getEnvOrDefault(key: string, defaultValue: string): string {
  return process.env[key] ?? defaultValue;
}

/**
 * Loads and validates all required environment variables.
 * Call this once at application startup.
 */
export function loadConfig(): AppConfig {
  return {
    nodeEnv: getEnvOrDefault('NODE_ENV', 'development'),
    port: parseInt(getEnvOrDefault('API_PORT', '4000'), 10),
    databaseUrl: getEnvOrThrow('DATABASE_URL'),
    redisUrl: getEnvOrDefault('REDIS_URL', 'redis://localhost:6379'),
    jwtSecret: getEnvOrThrow('JWT_SECRET'),
    jwtExpiresIn: getEnvOrDefault('JWT_EXPIRES_IN', '7d'),
  };
}
