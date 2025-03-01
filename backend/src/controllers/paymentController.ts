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

const webhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sig = req.headers["stripe-signature"];
    await paymentService.stripeWebhook({ body: req.body, sig });
    res.status(200).json({
      message: "Payment done successfully",
    });
  } catch (error) {
    next(error);
  }
};

const paymentController = { createPayment, webhook };
export default paymentController;
