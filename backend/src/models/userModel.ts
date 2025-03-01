import mongoose, { Schema } from "mongoose";
import { IUser } from "../types";

// Define una interfaz para el usuario

// Define el esquema del usuario
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
); // Agrega timestamps para createdAt y updatedAt

// Crea el modelo utilizando la interfaz
export const User = mongoose.model<IUser>("User", userSchema);
