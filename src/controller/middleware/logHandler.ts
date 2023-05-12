import morgan from "morgan";

import logger from "@/pkg/logger";
import { NODE_ENV } from "@/config";

morgan.token("status", (_, res) =>
  res.headersSent ? res.statusCode.toString() : undefined
);

const dev = ":method :url :status :response-time ms";
const production =
  ":remote-addr :method :url :status :response-time ms :user-agent";
const morganFormat = NODE_ENV === "production" ? production : dev;

export default morgan(morganFormat, {
  stream: {
    write: (msg) => {
      logger.info(msg);
    }
  }
});
