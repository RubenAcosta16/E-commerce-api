import { IProduct, ProductType, ProductFilter } from "../types/index";
import { ProductModel } from "../models/productModel";
import { CategoryModel } from "../models/categoryModel";
import { ProductValidation } from "../validations/productValidations";
import { ProductError } from "../utils/errorFactory";
import { CategoryError } from "../utils/errorFactory";

const createProduct = async (
  product: Omit<ProductType, "_id">
): Promise<ProductType> => {
  ProductValidation.validate(product);
 
  const existingCategory = await CategoryModel.findOne({
    _id: product.category,
  });
  if (!existingCategory) throw new CategoryError("Category doesn't exists");

  const existingProduct = await ProductModel.findOne({ name: product.name });
  if (existingProduct) throw new ProductError("Product already exists");

  const newProduct = new ProductModel(product);
  await newProduct.save();

  return newProduct;
};

const getProducts = async ({
  category,
  limit,
  maxPrice,
  minPrice,
  page,
  search,
}: ProductFilter): Promise<ProductType[]> => {
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  if (pageNumber < 1 || limitNumber < 1) {
    throw new ProductError("Invalid pagination parameters");
  }

  if ((pageNumber && !limitNumber) || (!pageNumber && limitNumber))
    throw new ProductError("Invalid pagination parameters");

  const queryFilter: any = {};

  if (search) {
    queryFilter.name = { $regex: search, $options: "i" };
  }

  if (category) {
    queryFilter.category = category;
  }

  if (minPrice !== undefined) {
    queryFilter.price = { ...queryFilter.price, $gte: minPrice };
  }

  if (maxPrice !== undefined) {
    queryFilter.price = { ...queryFilter.price, $lte: maxPrice };
  }

  const products = await ProductModel.find(queryFilter)
    .limit(limitNumber)
    .skip((pageNumber - 1) * limitNumber);

  return products;
};

const getOneProduct = async ({
  idProduct,
}: {
  idProduct: string;
}): Promise<IProduct> => {
  if (!idProduct) throw new ProductError("Product ID is required");

  const productFound = await ProductModel.findOne({ _id: idProduct });
  if (!productFound) throw new ProductError("Product not found");

  return productFound;
};

const updateProduct = async ({
  productId,
  updates,
}: {
  productId: string;
  updates: Omit<ProductType, "_id">;
}): Promise<ProductType | null> => {
  if (!productId) throw new ProductError("Product ID is required");
  ProductValidation.validate(updates);

  const existingCategory = await CategoryModel.findOne({
    _id: updates.category,
  });
  if (!existingCategory) throw new CategoryError("Category doesn't exists");

  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new ProductError(`Product with ID ${productId} not found`);
  }

  Object.assign(product, updates);
  await product.save();

  return product;
};

const deleteProduct = async ({
  productId,
}: {
  productId: string;
}): Promise<void> => {
  if (!productId) throw new ProductError("Product ID is required");

  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new ProductError(`Product with ID ${productId} not found`);
  }

  await product.deleteOne();
};

const productService = {
  createProduct,
  getProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
export default productService;
