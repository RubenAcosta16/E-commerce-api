import mongoose, { Schema } from "mongoose";
import { IPayment } from "../types";

const PaymentSchema: Schema = new Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    required: true,
  },
  transactionId: { type: String, required: true },
});

export const PaymentModel = mongoose.model<IPayment>("Payment", PaymentSchema);
