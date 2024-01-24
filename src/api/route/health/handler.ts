import { Request, Response, NextFunction } from "express";

import { success } from "@/api/httputil";
import ISchema from "@/pkg/schema/interface";
import perfMeasure from "@/pkg/util/perfMeasure";

export class PingHandler {
  private schema: ISchema;

  constructor(schema: ISchema) {
    this.schema = schema;
    this.validateRequest = this.validateRequest.bind(this);
  }

  validateRequest(req: Request, _: Response, next: NextFunction) {
    try {
      req.body = this.schema.parse(req.body);
      return next();
    } catch (err) {
      return next(
        Error(
          `400invalid request: ${JSON.stringify(
            JSON.parse(err.message),
            null,
            0
          )}`
        )
      );
    }
  }
}

export class MetricsHandler {
  @perfMeasure("test_indicator")
  async getMetrics(_: Request, res: Response) {
    return res.json(
      success({
        mem: process.memoryUsage(),
        uptime: process.uptime()
      })
    );
  }
}
