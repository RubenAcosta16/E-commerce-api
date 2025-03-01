import mongoose, { Schema } from "mongoose";

import { ICart } from "../types";
const CartSchema: Schema = new Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

export const CartModel = mongoose.model<ICart>("Cart", CartSchema);
