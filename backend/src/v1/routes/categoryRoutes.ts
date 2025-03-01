import express, { Router } from "express";

import categoryController from "../../controllers/categoryController"
// import authMiddleware from "../../middlewares/authMiddleware";

const router: Router = express.Router();

router
  .post("/", categoryController.createCategory)
  .get("/", categoryController.getCategories)


export default router;
