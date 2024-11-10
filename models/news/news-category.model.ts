import { Schema, models, model } from "mongoose";

const categorySchema = new Schema(
  {
    category: {
      type: String,
      require: [true, "category is required"],
    },
  },
  {
    timestamps: true,
  },
);

const Category = models?.Category || model("Category", categorySchema);

export default Category;
