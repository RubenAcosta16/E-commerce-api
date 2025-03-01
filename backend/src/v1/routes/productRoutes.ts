import express, { Router } from "express";

import productController from "../../controllers/productController";
// import authMiddleware from "../../middlewares/authMiddleware";

const router: Router = express.Router();

router
  .post("/", productController.createProduct)
  .get("/:productId", productController.getOneProduct)
  .get("/", productController.getProducts);

export default router;
