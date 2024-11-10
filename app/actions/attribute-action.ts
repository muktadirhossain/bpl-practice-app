"use server";
import { z } from "zod";
import { handleError } from "./errorHandler";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/connectdb";
import Attribute from "@/models/product/attribute.model";
import AttributeValue from "@/models/product/attribute-value.model";

const attributeSchema = z.object({
  attribute: z.string().min(2),
});

export const createAttributeAction = async (
  prevState: any,
  formData: FormData
) => {

  try {
    const formDataObj = Object.fromEntries(formData.entries());
    const { attribute } = attributeSchema.parse(formDataObj);

    connectDB();

    const res = await Attribute.create({
      name: attribute,
    });

    return {
      success: true,
      message: "Attribute Added Successfully !",
      data: {
        name: res?.name,
      },
      isError: false,
      error: {},
    };
  } catch (error) {
    return handleError(error);
  } finally {
    revalidatePath("/dashboard/product-category");
  }
};

export const deleteAttributeAction = async (id: string) => {
  if (!id) throw new Error("Please Provide an Attribute ID");
  try {
    await Attribute.findByIdAndDelete(id);
    // Delete related values from AttributeValues::
    await AttributeValue.deleteMany({ attributeId: id });

    return {
      success: true,
      message: "Attribute Deleted Successfully !",
      data: {},
      isError: false,
      error: {},
    };
  } catch (error) {
    return handleError(error);
  } finally {
    revalidatePath("/dashboard/product-category");
  }
};

//  ! Attribute Values Area ::

// Schema definition
const attributeValueSchema = z.object({
  value: z.string(),
});

// Function definition
export const addValuesToAttributesAction = async (
  attributeID: string,
  formData: FormData
) => {
  try {
    const formDataObj = Object.fromEntries(formData.entries());
    const { value } = attributeValueSchema.parse(formDataObj);
    // Connect to database
    await connectDB();

    // Find the attribute
    const attribute = await Attribute.findOne({ _id: attributeID });
    if (!attribute) throw new Error("Attribute not found!");

    // Create the attribute value
    const res = await AttributeValue.create({
      attributeId: attributeID,
      value: value,
    });

    console.log(res);

    return {
      success: true,
      message: "Attribute value Successfully !",
      data: {},
      isError: false,
      error: {},
    };
  } catch (error) {
    console.log(error);
    // Handle errors
    return handleError(error);
  } finally {
    // Revalidate path
    revalidatePath("/dashboard/product-category");
  }
};

export const deleteAttributeValueAction = async (id: string) => {
  try {
    await AttributeValue.findByIdAndDelete(id);
    return {
      success: true,
      message: "Attribute Value Deleted Successfully !",
      data: {},
      isError: false,
      error: {},
    };;
  } catch (error) {
    // Handle errors
    return handleError(error);
  } finally {
    // Revalidate path
    revalidatePath("/dashboard/product-category");
  }
};
