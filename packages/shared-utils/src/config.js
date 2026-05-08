"use strict";
/**
 * Type-safe config loader that reads environment variables
 * and provides typed configuration objects.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = loadConfig;
function getEnvOrThrow(key) {
    const value = process.env[key];
    if (value === undefined || value === '') {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}
function getEnvOrDefault(key, defaultValue) {
    return process.env[key] ?? defaultValue;
}
/**
 * Loads and validates all required environment variables.
 * Call this once at application startup.
 */
function loadConfig() {
    return {
        nodeEnv: getEnvOrDefault('NODE_ENV', 'development'),
        port: parseInt(getEnvOrDefault('API_PORT', '4000'), 10),
        databaseUrl: getEnvOrThrow('DATABASE_URL'),
        redisUrl: getEnvOrDefault('REDIS_URL', 'redis://localhost:6379'),
        jwtSecret: getEnvOrThrow('JWT_SECRET'),
        jwtExpiresIn: getEnvOrDefault('JWT_EXPIRES_IN', '7d'),
    };
}
//# sourceMappingURL=config.js.map