import { CategoryType } from "../types";
import { ProductError } from "../utils/errorFactory";

export class ProductValidation {
  static validate(product: Omit<CategoryType, "_id">): void {
    this.validateName(product.name);
    this.validateDescription(product.description);
  }

  private static validateName(name: string): void {
    if (!name) throw new ProductError("Name is required");
    if (typeof name !== "string")
      throw new ProductError("Name must be a string");
    if (name.length < 3)
      throw new ProductError("Name must be at least 3 characters long");
  }

  private static validateDescription(description?: string): void {
    if (!description) throw new ProductError("Description is required");
    if (typeof description !== "string")
      throw new ProductError("Description must be a string");
    if (description.length < 10)
      throw new ProductError("Description must be at least 10 characters long");
  }
}

export default ProductValidation;
