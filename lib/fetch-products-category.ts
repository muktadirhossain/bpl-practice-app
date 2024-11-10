import { cache } from "react";

import ApiFeatures from "./ApiFeatures";

import { ProductCategory } from "@/models/product";

export const fetchAllProductsCategories = cache(
  async (searchParams: object) => {
    try {
      // Initialize ApiFeatures instance
      const query = new ApiFeatures(ProductCategory, searchParams);

      // Execute the paginated query and retrieve the total number of pages
      const dataPromise = query
        .searchByFields(["category"])
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
      throw new Error("Failed to fetch category with total pages");
    }
  },
);
