import { Schema, models, model } from "mongoose";

const productCategorySchema = new Schema(
  {
    category: {
      type: String,
      require: [true, "product category is required"],
    },
    serial_number: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

// Middleware to auto-increment the serial number
productCategorySchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const lastProductCategory = await ProductCategory.findOne().sort({
    serial_number: -1,
  });

  this.serial_number = lastProductCategory
    ? lastProductCategory.serial_number + 1
    : 1;

  next();
});

const ProductCategory =
  models?.ProductCategory || model("ProductCategory", productCategorySchema);

export default ProductCategory;
