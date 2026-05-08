"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
exports.createLogger = createLogger;
const LOG_COLORS = {
    debug: '\x1b[36m', // cyan
    info: '\x1b[32m', // green
    warn: '\x1b[33m', // yellow
    error: '\x1b[31m', // red
};
const RESET = '\x1b[0m';
/**
 * Simple console-based logger.
 * Easy to swap for winston / pino later.
 */
class Logger {
    context;
    constructor(context) {
        this.context = context;
    }
    log(level, message, meta) {
        const timestamp = new Date().toISOString();
        const color = LOG_COLORS[level];
        const prefix = `${color}[${level.toUpperCase()}]${RESET} ${timestamp} [${this.context}]`;
        if (meta) {
            console[level === 'debug' ? 'log' : level](`${prefix} ${message}`, meta);
        }
        else {
            console[level === 'debug' ? 'log' : level](`${prefix} ${message}`);
        }
    }
    debug(message, meta) {
        this.log('debug', message, meta);
    }
    info(message, meta) {
        this.log('info', message, meta);
    }
    warn(message, meta) {
        this.log('warn', message, meta);
    }
    error(message, meta) {
        this.log('error', message, meta);
    }
}
exports.Logger = Logger;
function createLogger(context) {
    return new Logger(context);
}
//# sourceMappingURL=logger.js.map