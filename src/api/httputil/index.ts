import { Response } from "express";

import logger from "@/pkg/logger";
export interface ErrorInfo {
  code?: unknown;
  message?: unknown;
  stack?: unknown;
}

export const success = (data: unknown) => {
  return {
    data
  };
};

export const error = (msg: unknown) => {
  return {
    error: msg
  };
};

export const handleSuccess = (
  res: Response,
  data: unknown,
  status: number = 200
) => {
  return res.status(status).json(success(data));
};

export const handleError = (res: Response, errorInfo: ErrorInfo) => {
  const code = Number.isInteger(errorInfo.code)
    ? (errorInfo.code as number)
    : 500;
  const message = errorInfo.stack ?? errorInfo.message;
  const returnedMessage = code < 500 ? message : "Internal server error";
  logger.error(message.toString());
  return res.status(code).json(error(returnedMessage));
};
