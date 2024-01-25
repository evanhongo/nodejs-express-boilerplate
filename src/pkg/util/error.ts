export class CustomError extends Error {
  code: ErrorCode;

  constructor(msg: string, code: ErrorCode = INTERNAL_SERVER_ERROR) {
    super(msg);
    this.code = code;
  }
}

export const NOT_FOUND = "NOT_FOUND";
export const INVALID_REQUEST = "INVALID_REQUEST";
export const INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR";

export type ErrorCode =
  | "NOT_FOUND"
  | "INVALID_REQUEST"
  | "INTERNAL_SERVER_ERROR";
