import { Schema, models, model } from "mongoose";

const newsSchema = new Schema(
  {
    headline: {
      type: String,
      require: [true, "Headline is required"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
    },
    content: {
      type: String,
      required: [true, "content is required"],
      unique: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    cover_photo: {
      type: String,
      required: [true, "cover_photo is required"],
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const News = models?.News || model("News", newsSchema);

export default News;
