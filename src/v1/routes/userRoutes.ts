import express, { Router } from "express";

import userController from "../../controllers/userController";
import authMiddleware from "../../middlewares/authMiddleware";

const router: Router = express.Router();

router
  .post("/register", userController.register)
  .post("/login", userController.login)
  .post("/logout", userController.logout)
  .get("/protected", authMiddleware, userController.protectedRoute)
  .post("/favorite", authMiddleware, userController.addFavorite)
  .get("/favorite", authMiddleware, userController.getFavorites)
  .delete("/favorite/:id", authMiddleware, userController.removeFromFavorites);

export default router; 
