import mongoose, { Schema } from "mongoose";
import { ICategory } from "../types";

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, optional: true },
});

export const CategoryModel = mongoose.model<ICategory>(
  "Category",
  CategorySchema
);
