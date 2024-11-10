"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { handleError } from "./errorHandler";

import uploadFileHandler from "@/utils/file-upload-helpers";
import { createProduct, deleteProductById } from "@/service/product-service";
import deleteFilePath from "@/utils/delete-file-from-path";
import { Product } from "@/models/product";
import connectDB from "@/lib/connectdb";

const productSchema = z.object({
  title: z.string().min(5),
  itemCode: z.string(),
  category: z.string(),
  description: z.string().min(5),
  price: z.preprocess((val) => String(val), z.string()),
});

// ! Add Product
export const addProductAction = async (formData: FormData) => {
  const images: string[] = [];

  try {
    const formDataObj = Object.fromEntries(formData.entries());
    const { category, title, itemCode, description, price } =
      productSchema.parse(formDataObj);

    // Get all image files from FormData
    const imageFiles = formData.getAll("images") as File[];

    if (imageFiles.length > 0) {
      for (const file of imageFiles) {
        const filePath = await uploadFileHandler({
          file,
          extensionArray: ["png", "jpg", "jpeg"],
          destinationPath: "/images/products",
        });

        images.push(filePath);
      }
    }

    const product = await createProduct({
      title,
      itemCode,
      description,
      price,
      images,
      category,
    });

    return product;
  } catch (error: any) {
    return handleError(error);
  } finally {
    revalidatePath("/dashboard/shop");
  }
};

// ! Delete Product::
export const deleteProductAction = async (id: string) => {
  try {
    deleteProductById(id);

    return {
      success: true,
      message: "Product deleted successfully!",
    };
  } catch (error: any) {
    return handleError(error);
  } finally {
    revalidatePath("/dashboard/shop");
  }
};

export const updateProductAction = async (
  productId: string,
  formData: FormData
) => {
  let images: string[] = [];
  let hasNewPhotos = false;
  try {
    const formDataObj = Object.fromEntries(formData.entries());
    const { category, title, itemCode, description, price } =
      productSchema.parse(formDataObj);

    // Get all image files from FormData
    const imageFiles = formData.getAll("images") as File[];
    connectDB();
    // Check if new images are provided
    if (imageFiles.length > 0) {
      // If new images are present, upload them and delete old images
      for (const file of imageFiles) {
        const filePath = await uploadFileHandler({
          file,
          extensionArray: ["png", "jpg", "jpeg"],
          destinationPath: "/images/products",
        });
        images.push(filePath);
      }
      hasNewPhotos = true;
    } else {
      // If no new images are provided, retrieve existing images
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return {
          message: "Product not found!",
          success: false,
          isError: true,
          error: { fields: {} },
        };
      }
      images = existingProduct.images;
    }

    // Update the product with new details
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        title,
        itemCode,
        description,
        price,
        images,
        category,
      },
      { new: false } // Return the updated document
    );

    // delete Old Product only when new photo updates:🧮
    if (hasNewPhotos) {
      for (const oldImg of updatedProduct?.images) {
        await deleteFilePath(oldImg);
      }
    }

    return {
      message: "Product updated successfully",
      success: true,
      data: { title: updatedProduct.title, itemCode: updatedProduct.itemCode },
      isError: false,
      error: {},
    };
  } catch (error: any) {
    // Rollback: delete uploaded files if error occurs
    if (images.length > 0) {
      for (const link of images) {
        await deleteFilePath(link);
      }
    }
    return handleError(error);
  } finally {
    revalidatePath("/dashboard/shop");
  }
};
