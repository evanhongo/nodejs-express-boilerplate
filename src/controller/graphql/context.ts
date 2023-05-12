import { Request, Response } from "express";
import { BaseContext } from "@apollo/server";

import { User } from "@/model/user";

export interface Context extends BaseContext {
  dataloader?: any;
  JWT_SECRET?: string;
  req: Request;
  res: Response;
}
