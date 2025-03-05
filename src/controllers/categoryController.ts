import { Request, Response, NextFunction } from "express";

import { CategoryType } from "../types";
import categoryService from "../services/categoryService";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction 
) => {
  const { name, description }: CategoryType = req.body;

  try {
    const newCategory = await categoryService.createCategory({
      name,
      description,
    });

    res.status(200).json({
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    next(error);
  }
};

const getOneCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { name, description }: CategoryType = req.body;

  try {
    const category = await categoryService.getOneCategory({
      categoryId: req.params.id,
    });

    res.status(200).json({
      message: "Category found successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { name, description }: CategoryType = req.body;

  try {
    const categories = await categoryService.getCategories();

    res.status(200).json({
      message: "Categories found successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const productId: string = req.body;
  const { id } = req.params;
  const updates: CategoryType = req.body;

  try {
    const product = await categoryService.updateCategory({
      categoryId: id,
      updates,
    });

    res.status(200).json({
      message: "Category updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const productId: string = req.body;
  const { id } = req.params;

  try {
    await categoryService.deleteCategory({ categoryId: id });

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const categoryController = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getOneCategory,
};
export default categoryController;
