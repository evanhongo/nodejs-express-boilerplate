import express from "express";

import MetricsHandler from "./handler";
import { MetricsRequestSchema } from "./schema";

const router = express.Router();
const handler = new MetricsHandler(new MetricsRequestSchema());

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
  .get("/metrics", handler.validateRequest, handler.getMetrics);

export default router;
