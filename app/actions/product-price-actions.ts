"use server";
import connectDB from "@/lib/connectdb";
import ProductPrice from "@/models/product/product-price.model";

export const createProductPriceAction = async (
  productId: string,
  data: any
) => {
  try {
    console.log(productId);
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const { price, quantity, attributes } = data[i];
      const attributeValues = attributes?.map((attr: any) => {
        return {
          [attr.attribute]: attr.value,
        };
      });
      connectDB();

      console.log(attributeValues);

      await ProductPrice.create({
        productId: productId,
        price: price,
        quantity: quantity,
        attributeValues: attributeValues,
      });
    }
    return {
      success: true,
      message: "Product prices added successfully",
      isError: false
    };
  } catch (error: any) {
    throw new Error(error);
  }
};
