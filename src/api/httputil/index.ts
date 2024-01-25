import { ErrorCode } from "@/pkg/util/error";

export const success = (data: unknown) => {
  return {
    data
  };
};

export const error = (code: ErrorCode, msg: string) => {
  return {
    code,
    error: msg
  };
};
