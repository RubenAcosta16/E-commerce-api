import mongoose, { Schema } from "mongoose";
import { IImage } from "../types";

const imageSchema = new Schema<IImage>(
  {
    url: { type: String, required: true },
    productId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Image = mongoose.model<IImage>("Image", imageSchema);
