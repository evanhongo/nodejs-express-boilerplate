import { Request, Response, NextFunction } from "express";

import { error } from "@/api/httputil";
import logger from "@/pkg/logger";
import {
  CustomError,
  ErrorCode,
  NOT_FOUND,
  INVALID_REQUEST
} from "@/pkg/util/error";

const errorCodeToHttpStatus = new Map<ErrorCode, number>();
errorCodeToHttpStatus.set(NOT_FOUND, 404);
errorCodeToHttpStatus.set(INVALID_REQUEST, 400);

export default function exceptionHandler(
  err: CustomError,
  _: Request,
  res: Response,
  __: NextFunction
) {
  logger.error(err.stack);

  const httpStatus = errorCodeToHttpStatus.get(err.code);
  if (httpStatus.toString().startsWith("4"))
    return res.status(httpStatus).json(error(err.code, err.message));

  return res.status(500).json(error(err.code, "Internal server error"));
}
