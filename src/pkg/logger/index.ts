import { createLogger, format, transports, Logger } from "winston";
import { TransformableInfo } from "logform";
import rTracer from "cls-rtracer";

import { LOG_LEVEL } from "@/config";

interface ILogger {
  debug(msg: string): void;
  info(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
}

export class WinstonLogger implements ILogger {
  private logger: Logger;

  constructor(level: string) {
    this.logger = createLogger({
      level,
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        silly: 5
      },
      handleExceptions: true,
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.json(),
        format((info: TransformableInfo) => {
          Object.keys(info).forEach(
            (key) => info[key] === undefined && delete info[key]
          );
          return info;
        })()
      ),
      transports: [new transports.Console()]
    });
  }

  debug(msg: string): void {
    this.logger.child({ traceId: rTracer.id() }).debug(msg);
  }

  info(msg: string): void {
    this.logger.child({ traceId: rTracer.id() }).info(msg);
  }

  warn(msg: string): void {
    this.logger.child({ traceId: rTracer.id() }).warn(msg);
  }

  error(msg: string): void {
    this.logger.child({ traceId: rTracer.id() }).error(msg);
  }
}

const logger = new WinstonLogger(LOG_LEVEL);

export default logger;
