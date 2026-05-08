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
/**
 * Loads and validates all required environment variables.
 * Call this once at application startup.
 */
export declare function loadConfig(): AppConfig;
//# sourceMappingURL=config.d.ts.map