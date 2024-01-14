import { Request, Response } from "express";

import { handleSuccess } from "@/api/httputil";
import perfMeasure from "@/aop/perfMeasure";

export default class MetricsHandler {
  @perfMeasure("test_indicator")
  getMetrics(_: Request, res: Response) {
    return handleSuccess(res, {
      mem: process.memoryUsage(),
      uptime: process.uptime()
    });
  }
}
