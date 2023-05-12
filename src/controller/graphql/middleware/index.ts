import { MiddlewareFn } from "type-graphql";

import { Context } from "../context";
import logger from "@/pkg/logger";

export const ErrorInterceptor: MiddlewareFn<Context> = async (_, next) => {
  try {
    return await next();
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

export const Authenticater: MiddlewareFn<Context> = async (
  { root, context, args },
  next
) => {
  const { req } = context;
  const userId = req.session["userId"];
  if (!userId) throw new Error("Not logged in.");
  return next();
};
