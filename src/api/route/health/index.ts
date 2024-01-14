import express from "express";

import MetricsHandler from "./handler";

const router = express.Router();
const handler = new MetricsHandler();

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
  .get("/metrics", handler.getMetrics);

export default router;
