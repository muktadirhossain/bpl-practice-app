import { Schema, models, model } from "mongoose";

// Define SponsorType schema
const sponsorTypeSchema = new Schema(
  {
    sponsorship_type: {
      type: String,
      unique: true,
      required: [true, "Must provide a sponsor type name"],
      trim: true,
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
sponsorTypeSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const lastSponsor = await SponsorType.findOne().sort({ serial_number: -1 });

  this.serial_number = lastSponsor ? lastSponsor.serial_number + 1 : 1;

  next();
});

// Create the SponsorType model using the schema
const SponsorType =
  models.SponsorType || model("SponsorType", sponsorTypeSchema);

export default SponsorType;
