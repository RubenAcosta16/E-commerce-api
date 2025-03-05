import stripe from "../config/stripeConfig";
import { CartModel } from "../models/cartModel";
import { PaymentModel } from "../models/paymentModel";
// import { StripeEvent } from "../types";
import { CartError, PaymentError } from "../utils/errorFactory";
import productService from "./productService";
import { STRIPE_SECRET_KEY } from "../config/";
import { PaymentType } from "../types";

if (!STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
} 

const createPayment = async (userId: string): Promise<string | null> => {
  if (!userId) {
    throw new CartError("Invalid props");
  }
  const cart = await CartModel.findOne({ userId });

  if (!cart) throw new CartError("Cart not found");

  const line_items = await Promise.all(
    cart.products.map(async (product) => {
      const productDetails = await productService.getOneProduct({
        idProduct: product.productId.toString(),
      });

      if (!productDetails) {
        throw new CartError(`Product not found for ID: ${product.productId}`);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: productDetails.name.toString(),
          },
          unit_amount: productDetails.price * 100,
        },
        quantity: product.quantity,
      };
    })
  );

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  const amount = await Promise.all(
    cart.products.map(async (product) => {
      const productDetails = await productService.getOneProduct({
        idProduct: product.productId.toString(),
      });

      if (!productDetails) {
        throw new CartError(`Product not found for ID: ${product.productId}`);
      }

      return productDetails.price * product.quantity;
    })
  ).then((prices) => prices.reduce((total, price) => total + price, 0));

  if (isNaN(amount)) {
    throw new PaymentError("Invalid total amount");
  }

  const payment = new PaymentModel({
    userId,
    amount,
    currency: "usd",
    status: "pending",
    transactionId: session.id,
  });

  await payment.save();

  return session.url;
};

interface PropsWeb {
  body: any;
}

const completed = async ({ body }: PropsWeb) => {
  // let event;

  if (body.type === "checkout.session.completed") {
    const session = body.data.object;

    const payment = await PaymentModel.findOne({ transactionId: session.id });
    if (!payment) {
      throw new PaymentError("Payment not found");
    }

    payment.status = "completed";
    await payment.save();

    const cart = await CartModel.findOne({ userId: payment.userId });

    if (!cart) throw new CartError("Cart not found");

    cart.products = [];
    await cart.save();

    return;
  }
};

const failed = async ({ body }: PropsWeb) => {
  if (body.type === "checkout.session.async_payment_failed") {
    const session = body.data.object;

    const payment = await PaymentModel.findOne({ transactionId: session.id });
    if (!payment) {
      throw new PaymentError("Payment not found");
    }

    payment.status = "failed";
    await payment.save();

    return;
  }
};

const getAllPayments = async (): Promise<PaymentType[]> => {
  const payments = await PaymentModel.find();

  return payments;
};

const getAllUserPayments = async ({
  userId,
}: {
  userId: string;
}): Promise<PaymentType[]> => {
  const payments = await PaymentModel.find({ userId });
  return payments;
};

const paymentService = {
  createPayment,
  completed,
  failed,
  getAllPayments,
  getAllUserPayments,
};
export default paymentService;
