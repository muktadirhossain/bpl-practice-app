"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { handleError } from "./errorHandler";

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/service/category-service";

// Validation Schemas
const categorySchema = z.object({
  category: z.string(),
});

export const createCategoryAction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const formDataObj = Object.fromEntries(formData.entries());
    const { category } = categorySchema.parse(formDataObj);
    const newCategory = await createCategory(category);

    return {
      success: true,
      message: "Category Added Successfully !",
      data: newCategory,
      isError: false,
      error: {},
    };
  } catch (error) {
    return handleError(error);
  } finally {
    revalidatePath("/dashboard/category");
  }
};

export const deleteCategoryAction = async (categoryID: string) => {
  try {
    await deleteCategory(categoryID);

    return {
      success: true,
      message: "Category Deleted Successfully !",
      data: {},
      isError: false,
      error: {},
    };
  } catch (error) {
    return handleError(error);
  } finally {
    revalidatePath("/dashboard/category");
  }
};

export const updateCategoryAction = async (
  categoryID: string,
  formData: FormData,
) => {
  try {
    const formDataObj = Object.fromEntries(formData.entries());
    const { category } = categorySchema.parse(formDataObj);
    const newCategory = await updateCategory(categoryID, category);

    return {
      success: true,
      message: "Category Updated Successfully !",
      data: newCategory,
      isError: false,
      error: {},
    };
  } catch (error) {
    return handleError(error);
  } finally {
    revalidatePath("/dashboard/category");
  }
};
