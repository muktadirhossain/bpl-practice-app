import connectDB from "@/lib/connectdb";
import Category from "@/models/news/news-category.model";

// Initialize database connection
connectDB();

// Create a new category
export const createCategory = async (categoryName: string) => {
  try {
    const category = await Category.create({ category: categoryName });

    return category;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to create category!");
  }
};

// Get all categories
export const getAllCategories = async () => {
  try {
    const categories = await Category.find();

    return categories;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to retrieve categories!");
  }
};

// Get a category by ID
export const getCategoryById = async (id: string) => {
  try {
    const category = await Category.findById(id);

    if (!category) {
      throw new Error("Category not found!");
    }

    return category;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to retrieve category!");
  }
};

// Update a category by ID
export const updateCategory = async (id: string, categoryName: string) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { category: categoryName },
      { new: true, runValidators: true },
    );

    if (!updatedCategory) {
      throw new Error("Category not found!");
    }

    return updatedCategory;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update category!");
  }
};

// Delete a category by ID
export const deleteCategory = async (id: string) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      throw new Error("Category not found!");
    }

    return deletedCategory;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to delete category!");
  }
};
