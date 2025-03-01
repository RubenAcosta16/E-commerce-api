import mongoose, { Document } from "mongoose";

export type SessionType = { user: null | { id: string; username: string } };

// User --------------------------------------------------------------------------------------------

export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  // Otros campos que necesites...
}

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  // Otros campos que necesites...
}

// export interface IUser extends Omit<UserType, "_id">, Document {}

// Product ------------------------------------------------------------------------------------------

export interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: mongoose.Schema.Types.ObjectId; // Puede ser un ID de categoría
  stock: number;
  image?: mongoose.Schema.Types.ObjectId;
}

export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: mongoose.Schema.Types.ObjectId; // Puede ser un ID de categoría
  stock: number;
  image?: mongoose.Schema.Types.ObjectId;
}

export interface ProductFilter {
  search?: string; // Búsqueda opcional
  category?: string; // ID de categoría opcional
  minPrice?: number; // Precio mínimo opcional
  maxPrice?: number; // Precio máximo opcional
  page?: number; // Página opcional, por defecto es 1
  limit?: number; // Límite de resultados por página, por defecto es 10
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
  userId: string; // ID del usuario
  products: {
    productId: string; // ID del producto
    quantity: number;
  }[];
}

export interface ICart extends Document {
  _id: string;
  userId: string; // ID del usuario
  products: {
    productId: string; // ID del producto
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
  transactionId: string; // Stripe transaction ID
}

export interface IPayment extends Document {
  _id: string;
  userId: mongoose.Schema.Types.ObjectId;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  transactionId: string; // Stripe transaction ID
}

export interface StripeEvent {
  id: string;
  object: string;
  type: string;
  data: {
    object: {
      id: string;
      payment_status: string;
      // Agrega otros campos que necesites
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

// types/TransformImageType.ts
export interface TransformImageType {
  resize?: {
    width: number;
    height: number;
  };
  crop?: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
  rotate?: number;
  format?: string;
  filters?: {
    grayscale?: boolean;
    sepia?: boolean;
  };
}

export type TransformationType = {
  width?: number; // Ancho de la imagen después de la transformación
  height?: number; // Altura de la imagen después de la transformación
  crop?: string; // Tipo de recorte, puede ser "scale" o "crop"
  angle?: number; // Ángulo de rotación de la imagen
  effect?: string; // Efectos aplicados, como "grayscale" o "sepia"
  fetch_format?: string; // Formato de la imagen, como "jpg", "png", etc.
  x?: number; // Coordenada X para el recorte
  y?: number; // Coordenada Y para el recorte
};

export type GetAllImagesController = {
  page: string;
  limit: string;
};
