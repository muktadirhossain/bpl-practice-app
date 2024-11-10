import { cache } from "react";
import connectDB from "./connectdb";
import User from "@/models/users/user.model";
import ApiFeatures from "./ApiFeatures";

export const getUserByEmail = cache(async (email: string) => {
  connectDB();
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const fetchUsers = cache(async (searchParams: object) => {
  try {
    // Initialize ApiFeatures instance
    const query = new ApiFeatures(User, searchParams);

    // Execute the paginated query and retrieve the total number of pages
    const dataPromise = query
      .searchByFields(["name", "email", "address","number"])
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
