const createErrorFactory = (name: string) => {
  return class BusinessError extends Error {
    constructor(message: string) {
      super(message);
      this.name = name;
    }
  };
};

export const NotFoundError = createErrorFactory("NotFoundError");
export const AuthError = createErrorFactory("AuthError");

export const UserError = createErrorFactory("UserError");
export const ImageError = createErrorFactory("ImageError");
export const ProductError = createErrorFactory("ProductError");
export const CategoryError = createErrorFactory("CategoryError");
export const CartError = createErrorFactory("CartError");
export const PaymentError = createErrorFactory("PaymentError");
