type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_COLORS: Record<LogLevel, string> = {
  debug: '\x1b[36m', // cyan
  info: '\x1b[32m',  // green
  warn: '\x1b[33m',  // yellow
  error: '\x1b[31m', // red
};

const RESET = '\x1b[0m';

/**
 * Simple console-based logger.
 * Easy to swap for winston / pino later.
 */
export class Logger {
  constructor(private readonly context: string) {}

  private log(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
    const timestamp = new Date().toISOString();
    const color = LOG_COLORS[level];
    const prefix = `${color}[${level.toUpperCase()}]${RESET} ${timestamp} [${this.context}]`;

    if (meta) {
      console[level === 'debug' ? 'log' : level](`${prefix} ${message}`, meta);
    } else {
      console[level === 'debug' ? 'log' : level](`${prefix} ${message}`);
    }
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    this.log('debug', message, meta);
  }

  info(message: string, meta?: Record<string, unknown>): void {
    this.log('info', message, meta);
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    this.log('warn', message, meta);
  }

  error(message: string, meta?: Record<string, unknown>): void {
    this.log('error', message, meta);
  }
}

export function createLogger(context: string): Logger {
  return new Logger(context);
}
