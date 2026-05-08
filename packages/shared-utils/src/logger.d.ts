/**
 * Simple console-based logger.
 * Easy to swap for winston / pino later.
 */
export declare class Logger {
    private readonly context;
    constructor(context: string);
    private log;
    debug(message: string, meta?: Record<string, unknown>): void;
    info(message: string, meta?: Record<string, unknown>): void;
    warn(message: string, meta?: Record<string, unknown>): void;
    error(message: string, meta?: Record<string, unknown>): void;
}
export declare function createLogger(context: string): Logger;
//# sourceMappingURL=logger.d.ts.map