import { ProductType } from "../types";
import { ProductError } from "../utils/errorFactory";
import mongoose from "mongoose";


export class ProductValidation {
  static validate(product: Omit<ProductType,"_id">): void {
    this.validateName(product.name);
    this.validateDescription(product.description);
    this.validatePrice(product.price);
    this.validateCategory(product.category.toString()); 
    this.validateStock(product.stock);
    this.validateImage(product.image?.toString()); 
  }

  static validateId(id: string): void {
    if (!id) throw new ProductError("Id is required");
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new ProductError("Id must be a valid ObjectId");
  }

  private static validateName(name: string): void {
    if (!name) throw new ProductError("Name is required");
    if (typeof name !== "string")
      throw new ProductError("Name must be a string");
    if (name.length < 3)
      throw new ProductError("Name must be at least 3 characters long");
  }

  private static validateDescription(description: string): void {
    if (!description) throw new ProductError("Description is required");
    if (typeof description !== "string")
      throw new ProductError("Description must be a string");
    if (description.length < 10)
      throw new ProductError("Description must be at least 10 characters long");
  }

  private static validatePrice(price: number): void {
    if (price === undefined) throw new ProductError("Price is required");
    if (typeof price !== "number")
      throw new ProductError("Price must be a number");
    if (price < 0) throw new ProductError("Price must be a positive number");
  }

  private static validateCategory(category: string): void {
    if (!category) throw new ProductError("Category is required");
    if (!mongoose.Types.ObjectId.isValid(category))
      throw new ProductError("Category must be a valid ObjectId");
  }

  private static validateStock(stock: number): void {
    if (stock === undefined) throw new ProductError("Stock is required");
    if (typeof stock !== "number")
      throw new ProductError("Stock must be a number");
    if (stock < 0)
      throw new ProductError("Stock must be a non-negative number");
  }

  private static validateImage(image?: string): void {
    if (!image) return;
    if (typeof image !== "string")
      throw new ProductError("Image must be a string");
  }
}

export default ProductValidation;
