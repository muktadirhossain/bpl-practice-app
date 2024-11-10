import { cache } from "react";

import connectDB from "@/lib/connectdb";
import { ProductCategory } from "@/models/product";
import { replaceMongoIdInArray } from "@/utils/convert-data";

// Initialize database connection
connectDB();

// Create a new category
export const createProductCategory = async (categoryName: string) => {
  try {
    const category = await ProductCategory.create({ category: categoryName });

    return category;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to create Product category!");
  }
};

// Get all categories
export const getAllProductCategories = cache(async () => {
  try {
    const categories = await ProductCategory.find({}).select("-__v").lean();

    return replaceMongoIdInArray(categories);
  } catch (error: any) {
    throw new Error(error?.message || "Failed to retrieve Product categories!");
  }
});

// Get a category by ID
export const getProductCategoryById = async (id: string) => {
  try {
    const category = await ProductCategory.findById(id);

    if (!category) {
      throw new Error("Category not found!");
    }

    return category;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to retrieve Product category!");
  }
};

// Update a category by ID
export const updateProductCategory = async (
  id: string,
  categoryName: string,
) => {
  try {
    const updatedCategory = await ProductCategory.findByIdAndUpdate(
      id,
      { category: categoryName },
      { new: true, runValidators: true },
    );

    if (!updatedCategory) {
      throw new Error("Product Category not found!");
    }

    return updatedCategory;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update Product category!");
  }
};

// Delete a category by ID
export const deleteProductCategory = async (id: string) => {
  try {
    const deletedCategory = await ProductCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      throw new Error("Product Category not found!");
    }

    return deletedCategory;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to delete Product category!");
  }
};
