import express, { Router } from "express";

import paymentController from "../../controllers/paymentController";
import authMiddleware from "../../middlewares/authMiddleware";
import authAdminMiddleware from "../../middlewares/authAdminMiddleware";

const router: Router = express.Router();

router.post("/", authMiddleware, paymentController.createPayment);

router.post(
  "/completed",
  express.raw({ type: "application/json" }),
  paymentController.completed
); 
router.post(
  "/failed",
  express.raw({ type: "application/json" }),
  paymentController.failed
);
router.get(
  "/allPayments",
  authMiddleware,
  authAdminMiddleware,
  paymentController.getAllPayments
);
router.get("/", authMiddleware, paymentController.getAllUserPayments);

export default router;
