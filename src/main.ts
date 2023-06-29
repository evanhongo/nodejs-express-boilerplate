import "reflect-metadata";
import express from "express";

import createRouter from "@/api/route";
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
    .set("trust proxy", 1);

  const router = await createRouter();
  app.use("/", router);

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
