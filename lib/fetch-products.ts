import { cache } from "react";

import ApiFeatures from "./ApiFeatures";

import { Product } from "@/models/product";

export const fetchProducts = cache(async (searchParams: object) => {
  try {
    // Initialize ApiFeatures instance
    const query = new ApiFeatures(Product, searchParams);

    // Execute the paginated query and retrieve the total number of pages
    const dataPromise = query
      .searchByFields(["title", "itemCode", "description"])
      .populate("category")
      .filterBy("category")
      .paginate()
      .select("-updatedAt -__v")
      .sort()
      .execute();

    const totalPagesPromise = query.getTotalPages();

    // Wait for both the data and total pages to resolve
    const [data, totalPages] = await Promise.all([
      dataPromise,
      totalPagesPromise,
    ]);

    // Return both data and totalPages
    return {
      data,
      totalPages,
    };
  } catch (error) {
    // console.error(error);
    throw new Error("Failed to fetch news with total pages");
  }
});

export const getProductCategoryById = cache(async (id: string) => {
  try {
    const product = await Product.findOne({ _id: id })
      .populate({
        path: "category",
        select: "category _id",
      })
      .select("-__v")
      .lean();

    return product;
  } catch (error: any) {
    throw new error("Product not found!!");
  }
});
