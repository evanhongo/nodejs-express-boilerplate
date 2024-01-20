import { Request, Response, NextFunction } from "express";

import ISchema from "@/pkg/schema/interface";
import { success } from "@/api/httputil";
import perfMeasure from "@/pkg/util/perfMeasure";

export default class MetricsHandler {
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
