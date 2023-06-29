import express from "express";
import compression from "compression";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import bodyParser from "@/api/middleware/bodyParser";
import rateLimiter from "@/api/middleware/rateLimiter";
import logHandler from "@/api/middleware/logHandler";
import traceHandler from "@/api/middleware/traceHandler";
import health from "./health";
import docs from "./docs";
import createGraphqlRouter from "./graphql";
import { NODE_ENV } from "@/config";

const createRouter = async () => {
  const router = express.Router();
  router
    .use(
      compression(),
      bodyParser(),
      cookieParser("OMG"),
      rateLimiter(),
      logHandler,
      traceHandler
      //TODO: disable inline style
      // helmet({
      //   contentSecurityPolicy: {
      //     directives: {
      //       "default-src": "*",
      //       "script-src": ["'self'", "'unsafe-inline'"],
      //       "style-src": ["'self'", "'unsafe-inline'"]
      //     }
      //   }
      // })
    )
    .use(health);

  if (NODE_ENV === "development") router.use(docs);

  const graphql = await createGraphqlRouter();

  router.use(graphql);

  return router;
};

export default createRouter;
