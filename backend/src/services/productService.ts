import { IProduct, ProductType, ProductFilter } from "../types/index";
import { ProductModel } from "../models/productModel";
import { CategoryModel } from "../models/categoryModel";
import { ProductValidation } from "../validations/productValidations";
import { ProductError } from "../utils/errorFactory";
import { CategoryError } from "../utils/errorFactory";

const createProduct = async (
  product: Omit<ProductType, "_id">
): Promise<ProductType> => {
  //validations
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

  const queryFilter: any = {};

  // Agregar filtros según los parámetros
  if (search) {
    queryFilter.name = { $regex: search, $options: "i" }; // Búsqueda insensible a mayúsculas
  }

  if (category) {
    queryFilter.category = category; // Filtrar por categoría
  }

  if (minPrice !== undefined) {
    queryFilter.price = { ...queryFilter.price, $gte: minPrice }; // Precio mínimo
  }

  if (maxPrice !== undefined) {
    queryFilter.price = { ...queryFilter.price, $lte: maxPrice }; // Precio máximo
  }

  // Obtener productos con paginación
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
  ProductValidation.validateId(idProduct);

  const productFound = await ProductModel.findOne({ _id: idProduct });
  if (!productFound) throw new ProductError("Product not found");

  return productFound;
};

const productService = {
  createProduct,
  getProducts,
  getOneProduct,
};

export default productService;
