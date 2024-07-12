import { ICategory } from "./category.interface";
import CategoryModel from "./category.model";

export const createCategoryService = async (payload: ICategory) => {
  // Check if category already exists by categoryName
  const existingCategory = await CategoryModel.findOne({
    categoryName: payload.categoryName,
  });
  if (existingCategory) {
    throw new Error("Category with this name already exists");
  }

  const result = await CategoryModel.create(payload);
  return result;
};

export const updateCategoryService = async (
  categoryId: string,
  payload: Partial<ICategory>
) => {
  const existingCategory = await CategoryModel.findById(categoryId);
  if (!existingCategory) {
    throw new Error("Category not found");
  }

  // Check if updating to a new categoryName that already exists
  if (payload.categoryName) {
    const duplicateCategory = await CategoryModel.findOne({
      categoryName: payload.categoryName,
      _id: { $ne: categoryId },
    });
    if (duplicateCategory) {
      throw new Error("Category with this name already exists");
    }
  }

  // Perform the update
  const updatedCategory = await CategoryModel.findByIdAndUpdate(
    categoryId,
    payload,
    { new: true }
  );

  return updatedCategory;
};

export const deleteCategoryService = async (categoryId: string) => {
  // Check if category exists
  const existingCategory = await CategoryModel.findById(categoryId);
  if (!existingCategory) {
    throw new Error("Category not found");
  }

  // Perform the delete operation
  const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);

  return deletedCategory;
};

export const getAllCategoryService = async () => {
  const result = await CategoryModel.find();
  return result;
};
