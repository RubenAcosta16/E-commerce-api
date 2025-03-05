import { Request, Response, NextFunction } from "express";
import cartService from "../services/cartService";
import { AuthError } from "../utils/errorFactory";

const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  const { productId, quantity }: { productId: string; quantity: string } =
    req.body;

  try {
    if (!req.user) {
      throw new AuthError("Access denied: User not authenticated");
    }
 
    const addedToCart = await cartService.addToCart({
      productId,
      quantity: Number(quantity),
      userId: req.user._id,
    });

    res.status(200).json({
      message: "Product added to cart successfully",
      data: addedToCart,
    });
  } catch (error) {
    next(error);
  }
};

const getCartFromIdUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AuthError("Access denied: User not authenticated");
    }

    const cart = await cartService.getCartFromIdUser({ userId: req.user._id });

    res.status(200).json({
      message: "Cart found successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   const { productId }: { productId: string } = req.body;
  const { productId } = req.params;

  try {
    if (!req.user) {
      throw new AuthError("Access denied: User not authenticated");
    }

    await cartService.removeFromCart({
      productId,
      userId: req.user._id,
    });

    res.status(200).json({
      message: "Remove item from cart successfully",
    });
  } catch (error) {
    next(error);
  }
};

const removeAllFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AuthError("Access denied: User not authenticated");
    }

    await cartService.removeAllCart(req.user._id);

    res.status(200).json({
      message: "All cart removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

const cartController = {
  addToCart,
  getCartFromIdUser,
  removeFromCart,
  removeAllFromCart,
};
export default cartController;
