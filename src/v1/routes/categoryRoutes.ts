import express, { Router } from "express";

import categoryController from "../../controllers/categoryController";
import authMiddleware from "../../middlewares/authMiddleware";
import authAdminMiddleware from "../../middlewares/authAdminMiddleware";
// import authMiddleware from "../../middlewares/authMiddleware";

const router: Router = express.Router();
 
router
  .post(
    "/",
    authMiddleware,
    authAdminMiddleware,
    categoryController.createCategory
  )
  .get("/", categoryController.getCategories)
  .get("/:id", categoryController.getOneCategory)
  .delete(
    "/:id",
    authMiddleware,
    authAdminMiddleware,
    categoryController.deleteCategory
  )
  .put(
    "/:id",
    authMiddleware,
    authAdminMiddleware,
    categoryController.updateCategory
  );

export default router;
