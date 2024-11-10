import { Schema, models, model } from "mongoose";

const attributeValuesSchema = new Schema(
  {
    attribute: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Attribute",
    },
    value: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AttributeValue",
    },
  },
  {
    _id: false,
  }
);

const attributePriceSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    quantity: {
      type: Number,
      min: 0,
    },
    price: {
      type: Number,
      min: 1,
    },
    // attributeValues: [attributeValuesSchema],
    attributeValues: [],
  },
  {
    timestamps: true,
  }
);

const ProductPrice =
  models?.ProductPrice || model("ProductPrice", attributePriceSchema);

export default ProductPrice;
