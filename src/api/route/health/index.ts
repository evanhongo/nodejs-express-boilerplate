import express, { Request, Response } from "express";

import { handleSuccess } from "@/api/httputil";

const router = express.Router();

const metricsHandler = (_: Request, res: Response) => {
  return handleSuccess(res, {
    mem: process.memoryUsage(),
    uptime: process.uptime()
  });
};

router
  /**
   * @openapi
   * /health/ping:
   *   get:
   *     description: health check
   *     responses:
   *       200:
   *         description: Returns `pong`.
   */
  .get("/ping", (_, res) => res.send("pong"))
  .get("/metrics", metricsHandler);

export default router;
