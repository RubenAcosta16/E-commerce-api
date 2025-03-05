import mongoose, { Schema } from "mongoose";
import { IProduct } from "../types";

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  image: { type: String, optional: true },
});

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
