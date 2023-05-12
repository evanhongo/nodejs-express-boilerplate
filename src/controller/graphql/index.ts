import { Request, Response } from "express";

import { Context } from "@/controller/graphql/context";
import dataloader from "./dataloaders";

const buildContext = ({
  req,
  res
}: {
  req: Request;
  res: Response;
}): Context => ({ req, res, dataloader });

export { buildContext };
