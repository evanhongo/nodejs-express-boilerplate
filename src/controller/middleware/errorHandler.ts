import { Request, Response } from "express";

export default function errorHandler(error: Error, _: Request, res: Response) {
  res.json({ message: error.message });
}
