import { CategoryModel } from "../models/categoryModel";
import { CategoryType } from "../types";
import { CategoryError } from "../utils/errorFactory";
import CategoryValidations from "../validations/categoryValidations";

const createCategory = async (
  category: Omit<CategoryType, "_id">
): Promise<CategoryType> => {
  CategoryValidations.validate(category);

  const existingCategory = await CategoryModel.findOne({ name: category.name });
  if (existingCategory) throw new CategoryError("Category already exists");

  const newCategory = new CategoryModel(category);
  await newCategory.save();
 
  return newCategory;
};

const getCategories = async (): Promise<CategoryType[]> => {
  const categories = await CategoryModel.find();

  return categories;
};

const getOneCategory = async ({
  categoryId,
}: {
  categoryId: string;
}): Promise<CategoryType> => {
  if (!categoryId) throw new CategoryError("Category ID is required");

  const category = await CategoryModel.findOne({ _id: categoryId });
  if (!category) throw new CategoryError("Category not found");

  return category;
};

const updateCategory = async ({
  categoryId,
  updates,
}: {
  categoryId: string;
  updates: Omit<CategoryType, "_id">;
}): Promise<CategoryType | null> => {
  // Validate the updates
  CategoryValidations.validate(updates);

  const category = await CategoryModel.findById(categoryId);
  if (!category) {
    throw new CategoryError(`Category with ID ${categoryId} not found`);
  }

  Object.assign(category, updates);
  await category.save();

  return category;
};

const deleteCategory = async ({
  categoryId,
}: {
  categoryId: string;
}): Promise<void> => {
  const category = await CategoryModel.findById(categoryId);
  if (!category) {
    throw new CategoryError(`Category with ID ${categoryId} not found`);
  }

  await category.deleteOne();
};

const categoryService = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getOneCategory,
};
export default categoryService;
