import express, { Router } from "express";

import imagesController from "../../controllers/imagesController";
import uploadImage from "../../middlewares/uploadMiddleware";
import authMiddleware from "../../middlewares/authMiddleware";
import authAdminMiddleware from "../../middlewares/authAdminMiddleware";

const router: Router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  authAdminMiddleware,
  uploadImage,
  imagesController.upload
);

// router.post("/:id/transform", uploadImage, authMiddleware, imagesController.transformImage);

// ejemplo de uso
// /api/image/<imageId>
router.get("/:id", imagesController.getOneImage);

// ejemplo de uso
// /api/image?page=1&limit=10
// router.get("/", authMiddleware, imagesController.getAllImages);

export default router;
 