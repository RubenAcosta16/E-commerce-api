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

const categoryController = { createCategory, getCategories };
export default categoryController;
