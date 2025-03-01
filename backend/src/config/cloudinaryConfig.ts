import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_TU_CLOUD_NAME,
  CLOUDINARY_TU_API_KEY,
  CLOUDINARY_TU_API_SECRET,
} from ".";

cloudinary.config({
  cloud_name: CLOUDINARY_TU_CLOUD_NAME,
  api_key: CLOUDINARY_TU_API_KEY,
  api_secret: CLOUDINARY_TU_API_SECRET,
});

export default cloudinary;
