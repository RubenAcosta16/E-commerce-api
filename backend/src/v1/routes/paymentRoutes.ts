import express, { Router } from "express";

import paymentController from "../../controllers/paymentController";
import authMiddleware from "../../middlewares/authMiddleware";

const router: Router = express.Router();

router.post("/", authMiddleware, paymentController.createPayment);

router.post("/webhook", express.raw({ type: 'application/json' }), paymentController.webhook);

export default router;
