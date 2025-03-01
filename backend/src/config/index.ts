import dotenv from "dotenv";

// Carga las variables de entorno
dotenv.config();

export const {
  PORT = 3000,
  MONGODB_URI,
  SALTROUNDS,
  SECRET_JWT_KEY,
  FRONTEND_URL = "http://localhost:5173",
  CLOUDINARY_TU_CLOUD_NAME,
  CLOUDINARY_TU_API_KEY,
  CLOUDINARY_TU_API_SECRET,
  STRIPE_SECRET_KEY
} = process.env;
