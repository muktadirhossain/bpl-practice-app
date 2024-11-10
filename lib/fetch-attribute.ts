import { cache } from "react";
import ApiFeatures from "./ApiFeatures";
import Attribute from "@/models/product/attribute.model";
import AttributeValue from "@/models/product/attribute-value.model";

export const fetchAttributes = cache(async (searchParams: object) => {
  try {
    // Initialize ApiFeatures instance
    const query = new ApiFeatures(Attribute, searchParams);

    // Execute the paginated query and retrieve the total number of pages
    const dataPromise = query
      .searchByFields(["name"])
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
});

export const getAllAttributesWithValues = cache(async () => {
  try {
    const attributes = await Attribute.aggregate([
      // Look up values from AttributeValue collection based on attributeId
      {
        $lookup: {
          from: "attributevalues", // Use the collection name in lowercase by convention
          localField: "_id",
          foreignField: "attributeId",
          as: "values",
        },
      },
      // Format values to include an array of {_id, value} objects
      {
        $addFields: {
          values: {
            $map: {
              input: "$values",
              as: "value",
              in: { _id: "$$value._id", value: "$$value.value" },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          values: 1,
          createdAt: 1,
        },
      },
    ]);

    return attributes;
  } catch (error) {
    console.error("Error fetching attributes with values:", error);
    throw new Error("Unable to fetch attributes with values");
  }
});

export const allAttributes = cache(async () => {
  try {
    const attributes = await Attribute.find({})
      .select("-__v -createdAt -updatedAt")
      .lean();
    return attributes;
  } catch (error: any) {
    throw new Error("Error fetching attributes with values:", error?.message);
  }
});

// Values
export const allAttributeValues = cache(async () => {
  try {
    const values = await AttributeValue.find({})
      .select("-__v -createdAt -updatedAt")
      .lean();
    return values;
  } catch (error: any) {
    throw new Error("Error fetching attributes with values:", error?.message);
  }
});
