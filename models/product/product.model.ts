import { Schema, models, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Must provide a product name"],
      unique: true,
      trim: true,
    },
    itemCode: {
      type: String,
      required: [true, "Must provide a product code"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Must Provide a price of an Item"],
      minValue: 1,
    },
    images: {
      type: Array,
      defaultValue: [],
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ProductCategory",
    },
  },
  {
    timestamps: true,
    strictPopulate: false,
  },
);

const Product = models?.Product || model("Product", productSchema);

export default Product;


/*

import { Schema, models, model } from "mongoose";

const variantSchema = new Schema(
  {
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    image: {
      type: String, // Optional: URL or path to image specific to this variant (e.g., different colors)
    },
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Must provide a product name"],
      unique: true,
      trim: true,
    },
    itemCode: {
      type: String,
      required: [true, "Must provide a product code"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Must provide a price of an item"],
      min: 1,
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ProductCategory",
    },
    variants: [variantSchema],
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
);

const Product = models?.Product || model("Product", productSchema);

export default Product;


*/
