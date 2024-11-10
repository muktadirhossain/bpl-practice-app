import { Schema, models, model } from "mongoose";

const sponsorSchema = new Schema(
  {
    sponsorship_name: {
      type: String,
      unique: true,
      required: [true, "Must provide a sponsor name"],
      trim: true,
    },
    sponsor_img: {
      type: String,
      unique: true,
      required: [true, "Must provide a sponsor sponsor logo"],
      trim: true,
    },
    sponsor_type: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SponsorType",
    },
  },
  {
    timestamps: true,
  },
);

// Create the Category model using the category Schema
const Sponsor = models.Sponsor || model("Sponsor", sponsorSchema);

// Export the Category model
export default Sponsor;
