import { Schema, models, model } from "mongoose";

const attributeSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "product attribute is required"],
    },
    serial_number: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to auto-increment the serial number
attributeSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const lastAttribute = await Attribute.findOne().sort({
    serial_number: -1,
  });

  this.serial_number = lastAttribute
    ? lastAttribute.serial_number + 1
    : 1;

  next();
});

const Attribute = models?.Attribute || model("Attribute", attributeSchema);

export default Attribute;
