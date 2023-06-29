import express, { Request, Response } from "express";

import { handleSuccess } from "@/api/httputil";

const router = express.Router();

const metricsHandler = (_: Request, res: Response) => {
  return handleSuccess(res, {
    mem: process.memoryUsage(),
    uptime: process.uptime()
  });
};

//for health check
router
  .get("/ping", (_, res) => res.send("pong"))
  .get("/metrics", metricsHandler);

export default router;
