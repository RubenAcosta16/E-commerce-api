// import mongoose from "mongoose";
import { CartModel } from "../models/cartModel";
import { CartType, ICart } from "../types";
import { CartError } from "../utils/errorFactory";
import productService from "./productService";

interface Props {
  userId: string;
  productId: string;
  quantity: number;
}

const addToCart = async ({
  productId,
  quantity,
  userId, 
}: Props): Promise<CartType> => {
  if (!userId || !productId || !quantity || quantity <= 0) {
    throw new CartError("Invalid props");
  }

  const product = await productService.getOneProduct({ idProduct: productId });

  if (!product) {
    throw new CartError("Product not found");
  }

  if (product.stock < quantity) {
    throw new CartError("There are no products");
  }

  const cart =
    (await CartModel.findOne({ userId })) ||
    new CartModel({ userId, products: [] });

  const existingProductIndex = cart.products.findIndex(
    (p) => p.productId.toString() === productId
  );

  if (existingProductIndex > -1) {
    const currentProduct = cart.products[existingProductIndex];
    const newQuantity = currentProduct.quantity + quantity;
    if (product.stock < newQuantity) {
      throw new CartError("There are no products");
    }

    cart.products[existingProductIndex].quantity = newQuantity;
  } else {
    cart.products.push({
      productId: productId,
      quantity,
    });
  }

  await cart.save();

  product.stock -= quantity;
  await product.save();

  return cart;
};

const removeFromCart = async ({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}): Promise<CartType> => {
  if (!productId || !userId) {
    throw new CartError("Invalid props");
  }

  await productService.getOneProduct({ idProduct: productId });

  const cart = await CartModel.findOne({ userId });

  if (!cart) throw new CartError("Cart not found");

  const existingProductIndex = cart.products.findIndex(
    (p) => p.productId.toString() === productId
  );

  if (existingProductIndex > -1) {
    cart.products.splice(existingProductIndex, 1);
  } else {
    throw new CartError("Product not found in cart");
  }

  await cart.save();

  return cart;
};

const getCartFromIdUser = async ({
  userId,
}: {
  userId: string;
}): Promise<ICart> => {
  if (!userId) {
    throw new CartError("Invalid props");
  }
  const cart = await CartModel.findOne({ userId });

  if (!cart) throw new CartError("Cart not found");

  return cart;
};

const removeAllCart = async (userId: string): Promise<void> => {
  if (!userId) {
    throw new CartError("Invalid props");
  }
  const cart = await CartModel.findOne({ userId });

  if (!cart) throw new CartError("Cart not found");

  cart.products = [];

  await cart.save();
};

const cartService = {
  addToCart,
  removeFromCart,
  getCartFromIdUser,
  removeAllCart,
};
export default cartService;
