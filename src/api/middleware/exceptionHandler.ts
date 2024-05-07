import { Request, Response, NextFunction } from "express";

import { error } from "@/api/httputil";
import logger from "@/pkg/logger";
import { CustomError } from "@/pkg/util/error";

export default function exceptionHandler(
  err: CustomError,
  _: Request,
  res: Response,
  __: NextFunction
) {
  logger.error(err.stack);

  if (err.code.toString().startsWith("4"))
    return res.status(err.code).json(error(err.code, err.message));

  return res.status(err.code).json(error(err.code, "Internal server error"));
}
