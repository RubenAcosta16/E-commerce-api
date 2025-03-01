import express, { Router } from "express";

import cartController from "../../controllers/cartController";
import authMiddleware from "../../middlewares/authMiddleware";

const router: Router = express.Router();

router
  .post("/", authMiddleware, cartController.addToCart)
  .get("/", authMiddleware, cartController.getCartFromIdUser)
  .delete("/", authMiddleware, cartController.removeAllFromCart)
  .post("/:productId", authMiddleware, cartController.removeFromCart);

export default router;
