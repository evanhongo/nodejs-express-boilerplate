import { Mongoose, connect } from "mongoose";

import { DB_URL } from "@/config";

let mongooseInstance: Mongoose;

export const initializeDatabase = async () => {
  mongooseInstance = await connect(DB_URL, { maxPoolSize: 256 });
  mongooseInstance.set("strictQuery", true);
};

export default mongooseInstance;
