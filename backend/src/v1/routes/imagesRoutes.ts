import express, { Router } from "express";

import imagesController from "../../controllers/imagesController";
import uploadImage from "../../middlewares/uploadMiddleware";
import authMiddleware from "../../middlewares/authMiddleware";

const router: Router = express.Router();

router.post("/upload",uploadImage, imagesController.upload);

// router.post("/:id/transform", uploadImage, authMiddleware, imagesController.transformImage);

// ejemplo de uso
// /api/image/<imageId>
router.get("/:id", authMiddleware, imagesController.getOneImage);

// ejemplo de uso
// /api/image?page=1&limit=10
// router.get("/", authMiddleware, imagesController.getAllImages);

export default router;
  