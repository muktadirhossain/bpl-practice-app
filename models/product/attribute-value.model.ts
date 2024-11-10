import { Schema, models, model } from "mongoose";

const attributeValueSchema = new Schema(
  {
    attributeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Attribute",
    },
    value: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const AttributeValue =
  models?.AttributeValue || model("AttributeValue", attributeValueSchema);

export default AttributeValue;
