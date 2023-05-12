import { Request, Response } from "express";

const metricsHandler = (req: Request, res: Response) => {
  res.json({
    mem: process.memoryUsage(),
    uptime: process.uptime()
  });
};

export default metricsHandler;
