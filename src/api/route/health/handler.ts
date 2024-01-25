import { Request, Response, NextFunction } from "express";

import { success } from "@/api/httputil";
import ISchema from "@/pkg/schema/interface";
import perfMeasure from "@/pkg/util/perfMeasure";
import { CustomError, INVALID_REQUEST } from "@/pkg/util/error";

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
      return next(new CustomError(err.message, INVALID_REQUEST));
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
