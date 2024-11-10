"use server";
import { handleError } from "@/app/actions/errorHandler";
import connectDB from "@/lib/connectdb";
import { Product } from "@/models/product";
import deleteFilePath from "@/utils/delete-file-from-path";

export interface ProductInterface {
  title: string;
  itemCode: string;
  description: string;
  price: string;
  category: string;
  images: string[];
}

// Connect Database 🧮:
connectDB();

export const createProduct = async ({
  title,
  itemCode,
  description,
  price,
  images,
  category,
}: ProductInterface) => {
  try {
    const product = await Product.create({
      title,
      itemCode,
      description,
      price,
      images,
      category,
    });

    // console.log(images, "Images service");

    return {
      message: "Product added successfully",
      success: true,
      data: { title: product.title, itemCode: product.item },
      isError: false,
      error: {},
    };
  } catch (error: any) {
    // console.error("Images Happened", images);
    if (images?.length > 0) {
      for (const link of images) {
        await deleteFilePath(link);
      }
    }

    return handleError(error);
  }
};

// Update Product:🧮

// ! Delete product
export const deleteProductById = async (id: string) => {
  try {
    const product = await Product.findByIdAndDelete(id);

    if (product) {
      const images = product.images;

      for (let img of images) {
        await deleteFilePath(img);
      }
    }

    return product;
  } catch (error) {
    return error;
  }
};
