import { CategoryModel } from "../models/categoryModel";
import { CategoryType } from "../types";
import { CategoryError } from "../utils/errorFactory";
import CategoryValidations from "../validations/categoryValidations";

const createCategory = async (
  category: Omit<CategoryType, "_id">
): Promise<CategoryType> => {
  //validations
  CategoryValidations.validate(category);

  const existingCategory = await CategoryModel.findOne({ name: category.name });
  if (existingCategory) throw new CategoryError("Category already exists");

  const newCategory = new CategoryModel(category);
  await newCategory.save();

  return newCategory;
};

const getCategories = async (): Promise<CategoryType[]> => {
  //validations
  // CategoryValidations.validate(category);

  const categories = await CategoryModel.find();

  return categories;
};

const categoryService = {
  createCategory,
  getCategories,
};
export default categoryService;
