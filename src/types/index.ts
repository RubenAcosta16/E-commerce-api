import mongoose, { Document } from "mongoose";

export type SessionType = { user: null | { id: string; username: string } };

// User --------------------------------------------------------------------------------------------

export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  favorites: {
    productId: string;
  }[];
}

export interface IUser extends Document { 
  _id: string;
  username: string;
  email: string;
  password: string;
  favorites: {
    productId: string;
  }[];
}

// export interface IUser extends Omit<UserType, "_id">, Document {}

// Product ------------------------------------------------------------------------------------------

export interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: mongoose.Schema.Types.ObjectId;
  stock: number;
  image?: string;
}

export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: mongoose.Schema.Types.ObjectId;
  stock: number;
  image?: string;
}

export interface ProductFilter {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

// export interface IProduct extends Omit<ProductType, "_id">, Document {}

// Category ------------------------------------------------------------------------------------------

export interface CategoryType {
  _id: string;
  name: string;
  description?: string;
}

export interface ICategory extends Document {
  _id: string;
  name: string;
  description?: string;
}

// export interface ICategory extends Omit<CategoryType, "_id">, Document {}

// Cart ------------------------------------------------------------------------------------------

export interface CartType {
  _id: string;
  userId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
}

export interface ICart extends Document {
  _id: string;
  userId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
}

// export interface ICart extends Omit<CartType, "_id">, Document {}

// Payment ------------------------------------------------------------------------------------------

export interface PaymentType {
  _id: string;
  userId: mongoose.Schema.Types.ObjectId;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  transactionId: string;
}

export interface IPayment extends Document {
  _id: string;
  userId: mongoose.Schema.Types.ObjectId;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  transactionId: string;
}

export interface StripeEvent {
  id: string;
  object: string;
  type: string;
  data: {
    object: {
      id: string;
      payment_status: string;
    };
  };
}

// export interface IPayment extends Omit<PaymentType, "_id">, Document {}

// Image ------------------------------------------------------------------------------------------

export interface ImageType {
  _id: string;
  url: string;
  productId: mongoose.Schema.Types.ObjectId;
}

export interface IImage extends Document {
  _id: string;
  url: string;
  productId: mongoose.Schema.Types.ObjectId;
}

// export interface IImage extends Omit<ImageType, "_id">, Document {}

// export type ControllerImage = {
//   imgC: Express.Multer.File;
// };


