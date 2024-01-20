import { Request, Response, NextFunction } from "express";

import { error } from "@/api/httputil";
import logger from "@/pkg/logger";

export default function exceptionHandler(
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  if (err.message.startsWith("4"))
    return res
      .status(parseInt(err.message.substring(0, 3)))
      .json(error(err.message.substring(3)));

  logger.error(err.stack);
  return res.status(500).json(error("Internal server error"));
}
