import express from "express";

import { PingHandler, MetricsHandler } from "./handler";
import { PingRequestSchema } from "./schema";

const router = express.Router();
const pingHandler = new PingHandler(new PingRequestSchema());
const metricsHandler = new MetricsHandler();

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
  .post("/ping", pingHandler.validateRequest, (_, res) => res.send("pong"))
  .get("/metrics", metricsHandler.getMetrics);

export default router;
