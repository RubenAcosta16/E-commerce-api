import { Request, Response, NextFunction } from "express";
import { ProductType, ProductFilter } from "../types";
import productService from "../services/productService";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category, description, name, price, stock, image }: ProductType =
    req.body;
 
  try {
    const newProduct = await productService.createProduct({
      category,
      description,
      name,
      price,
      stock,
      image,
    });

    res.status(200).json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const filter: ProductFilter = req.body;

  try {
    const products = await productService.getProducts(filter);

    res.status(200).json({
      message: "Products found successfully",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getOneProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const productId: string = req.body;
  const { id } = req.params;

  try {
    const product = await productService.getOneProduct({
      idProduct: id,
    });

    res.status(200).json({
      message: "Product found successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const productId: string = req.body;
  const { id } = req.params;
  const updates: ProductType = req.body;

  try {
    const product = await productService.updateProduct({
      productId: id,
      updates
    });

    res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const productId: string = req.body;
  const { id } = req.params;

  try {
    await productService.deleteProduct({ productId: id });

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const productController = {
  createProduct,
  getProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
export default productController;
