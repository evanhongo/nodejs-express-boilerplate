import "reflect-metadata";
import express from "express";
import compression from "compression";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import bodyParser from "@/controller/middleware/bodyParser";
import rateLimiter from "@/controller/middleware/rateLimiter";
import logHandler from "@/controller/middleware/logHandler";
import traceHandler from "@/controller/middleware/traceHandler";
import errorHandler from "@/controller/middleware/errorHandler";
import handleGraphQL from "@/controller/middleware/handleGraphQL";
import metricsHandler from "@/controller/middleware/metricsHandler";
import { initializeDatabase } from "@/pkg/db";
import logger from "@/pkg/logger";
import { PORT } from "@/config";

const main = async () => {
  try {
    await initializeDatabase();
    logger.info("Database connected");
  } catch (err) {
    logger.error(err.toString());
    process.exit();
  }

  const app = express();
  app
    //Removes the X-Powered-By header, which is set by default in some frameworks
    .disable("x-powered-by")
    // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // see https://expressjs.com/en/guide/behind-proxies.html
    .set("trust proxy", 1)
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
    //for health check
    .get("/ping", (_, res) => res.send("pong"))
    .get("/metrics", metricsHandler);

  //await handleAuthentication(app);
  await handleGraphQL(app);

  app.use(errorHandler);

  const server = app.listen(PORT, () =>
    logger.info(
      `Server ready at http://localhost:${PORT}, Graphql playground at http://localhost:${PORT}/graphql`
    )
  );

  process.once("SIGINT", function () {
    logger.warn("Caught SIGINT, shutting down.");
    server.close((err) => {
      if (err) {
        logger.error("There is something wrong when shutting down");
        process.exit(1);
      }
      logger.info("Gracefully shut down!");
      process.exit(0);
    });
  });
};

main();
