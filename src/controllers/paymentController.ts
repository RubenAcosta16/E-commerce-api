import { Request, Response, NextFunction } from "express";
import paymentService from "../services/paymentService";
import { AuthError } from "../utils/errorFactory";

const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction 
) => {
  try {
    if (!req.user) {
      throw new AuthError("Access denied: User not authenticated");
    }

    const payment = await paymentService.createPayment(req.user._id);

    res.status(200).json({
      message: "Payment pending...",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

const completed = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const sig = req.headers["stripe-signature"];
    await paymentService.completed({ body: req.body });
    res.status(200).json({
      message: "Payment done successfully",
    });
  } catch (error) {
    next(error);
  }
};

const failed = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const sig = req.headers["stripe-signature"];
    await paymentService.failed({ body: req.body });
    res.status(200).json({
      message: "Payment failed",
    });
  } catch (error) {
    next(error);
  }
};

const getAllPayments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const sig = req.headers["stripe-signature"];
    const payments=await paymentService.getAllPayments()
    res.status(200).json({
      message: "Payments found successfully",
      data:payments
    });
  } catch (error) {
    next(error);
  }
};

const getAllUserPayments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const sig = req.headers["stripe-signature"];
    if (!req.user) {
      throw new AuthError("Access denied: User not authenticated");
    }
    const payments = await paymentService.getAllUserPayments({ userId: req.user._id });
    res.status(200).json({
      message: "Payments found successfully",
      data: payments
    });
  } catch (error) {
    next(error);
  }
};

const paymentController = { createPayment, completed,failed,getAllPayments, getAllUserPayments };
export default paymentController;
