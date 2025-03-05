import { Request, Response, NextFunction } from "express";
import {
  UserError,
  NotFoundError,
  AuthError,
  ImageError,
  CartError,
  CategoryError,
  PaymentError,
  ProductError,
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
    err instanceof AuthError ||
    err instanceof ProductError ||
    err instanceof PaymentError ||
    err instanceof CategoryError ||
    err instanceof CartError
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
  return res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
