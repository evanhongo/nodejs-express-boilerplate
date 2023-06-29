import { Request, Response } from "express";

import { Context } from "./context";
import dataloader from "./dataloaders";

const buildContext = ({
  req,
  res
}: {
  req: Request;
  res: Response;
}): Context => ({ req, res, dataloader });

export default buildContext;
