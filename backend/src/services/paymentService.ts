import stripe from "../config/stripeConfig";
import { CartModel } from "../models/cartModel";
import { PaymentModel } from "../models/paymentModel";
// import { StripeEvent } from "../types";
import { CartError, PaymentError } from "../utils/errorFactory";
import productService from "./productService";
import { STRIPE_SECRET_KEY } from "../config/";

if (!STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

// falta lo de confirm payment
// implementar algo para ejecutar cuandoe el pago este hechi

const createPayment = async (userId: string): Promise<string | null> => {
  if (!userId) {
    throw new CartError("Invalid props");
  }
  const cart = await CartModel.findOne({ userId });

  if (!cart) throw new CartError("Cart not found");

  // const product=await productService.getOneProduct({ idProduct: productId });

  const line_items = await Promise.all(
    cart.products.map(async (product) => {
      // Obtener el producto completo para acceder al precio
      const productDetails = await productService.getOneProduct({
        idProduct: product.productId.toString(),
      });

      if (!productDetails) {
        throw new CartError(`Product not found for ID: ${product.productId}`);
      }

      return {
        price_data: {
          currency: "usd", // Asegúrate de definir la moneda
          product_data: {
            name: productDetails.name.toString(),
          },
          unit_amount: productDetails.price * 100, // Convertir a centavos
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

  const amount = cart.products.reduce((total: number, item: any) => {
    const price = item.productId.price;
    const quantity = item.quantity;

    if (isNaN(price) || isNaN(quantity)) {
      console.warn("Invalid price or quantity:", item);
      return total;
    }

    return total + price * quantity;
  }, 0);

  // Make sure amount is a valid number before saving it
  if (isNaN(amount)) {
    throw new PaymentError("Invalid total amount");
  }

  //   ///////////////////////////////////////////////////////////////////////////////////////////////
  const payment = new PaymentModel({
    userId,
    amount,
    currency: "usd",
    status: "pending",
    transactionId: session.id,
  });

  await payment.save();

  await cart.updateOne({ userId: userId }, { $set: { products: [] } });
  await cart.save();

  return session.url;
};

interface PropsWeb {
  sig: string | string[] | undefined;
  body: Buffer; // Cambia el tipo a Buffer
}

const stripeWebhook = async ({ body, sig }: PropsWeb) => {
  let event;

  try {
    if (!sig) {
      throw new PaymentError("Missing signature");
    }
    event = stripe.webhooks.constructEvent(
      body, // Aquí se pasa el cuerpo sin procesar
      sig,
      STRIPE_SECRET_KEY!
    );
  } catch (error) {
    console.error('Error al verificar el webhook:', error); // Agrega un registro de error
    throw new PaymentError(`Webhook Error: ${error}`);
  }

  console.log('Webhook event type:', event.type); // Registro del tipo de evento

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log('Session data:', session); // Registro de datos de la sesión

    const payment = await PaymentModel.findOne({ transactionId: session.id });
    if (!payment) {
      throw new PaymentError("Payment not found");
    }

    // Actualizar el estado del pago
    payment.status = "completed";
    await payment.save();
    console.log('Payment status updated to completed'); // Registro de actualización
  }
};

const paymentService = { createPayment, stripeWebhook };
export default paymentService;
