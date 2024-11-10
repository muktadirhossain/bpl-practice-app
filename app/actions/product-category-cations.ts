"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { handleError } from "./errorHandler";

import {
  createProductCategory,
  deleteProductCategory,
  updateProductCategory,
} from "@/service/product-category-service";

// Validation Schemas
const categorySchema = z.object({
  category: z.string().min(2),
});

export const createProductCategoryAction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const formDataObj = Object.fromEntries(formData.entries());
    const { category } = categorySchema.parse(formDataObj);
    const newCategory = await createProductCategory(category as string);

    return {
      success: true,
      message: "Category Added Successfully !",
      isError: false,
      data: newCategory,
      error: {},
    };
  } catch (error) {
    return handleError(error);
  } finally {
    revalidatePath("/dashboard/product-category");
  }
};

export const deleteProductCategoryAction = async (categoryID: string) => {
  try {
    await deleteProductCategory(categoryID);

    return {
      success: true,
      message: "Category deleted successfully!",
    };
  } catch (error) {
    return handleError(error);
  } finally {
    revalidatePath("/dashboard/product-category");
  }
};

export const updateCategoryAction = async (
  categoryID: string,
  formData: FormData,
) => {
  try {
    const formDataObj = Object.fromEntries(formData.entries());
    const { category } = categorySchema.parse(formDataObj);
    const newCategory = await updateProductCategory(categoryID, category);

    return {
      success: true,
      message: "Category Updated Successfully !",
      data: newCategory,
    };
  } catch (error) {
    return handleError(error);
  } finally {
    revalidatePath("/dashboard/product-category");
  }
};
