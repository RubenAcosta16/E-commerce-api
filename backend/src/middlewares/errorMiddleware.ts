// middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import {
  UserError,
  NotFoundError,
  AuthError,
  ImageError,
} from "../utils/errorFactory";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof UserError ||
    err instanceof ImageError ||
    err instanceof AuthError
  ) {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      message: err.message,
    });
  }

  console.log(err);
  // Para cualquier otro error
  return res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
