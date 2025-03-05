import express, { Router } from "express";

import productController from "../../controllers/productController";
import authMiddleware from "../../middlewares/authMiddleware";
import authAdminMiddleware from "../../middlewares/authAdminMiddleware";
// import authMiddleware from "../../middlewares/authMiddleware";

const router: Router = express.Router();

router
  .post( 
    "/",
    authMiddleware,
    authAdminMiddleware,
    productController.createProduct
  )
  .get("/", productController.getProducts)
  .delete(
    "/:id",
    authMiddleware,
    authAdminMiddleware,
    productController.deleteProduct
  )
  .get("/:id", productController.getOneProduct)
  .put(
    "/:id",
    authMiddleware,
    authAdminMiddleware,
    productController.updateProduct
  );

export default router;
