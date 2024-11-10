import mongoose, { Document, Model, Schema } from "mongoose";

import { siteConfig } from "@/config/site";

// Define an interface for the User Document extending Mongoose Document
export interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  address?: string;
  image?: string;
  bio?: string;
  role: string;
}

// Define the User Schema::
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      trim: true,
      sparse: true,
    },
    password: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      default: "",
      maxLength: 255,
    },
    bio: {
      type: String,
      default: "",
      maxLength: 255,
    },
    image: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      lowercase: true,
      default: "user",
      enum: {
        values: siteConfig.USER_ROLES,
        message: "{VALUE} is not supported",
      },
    },
  },
  {
    timestamps: true,
  },
);

// Define an interface for User Model extending Mongoose Model
interface IUserModel extends Model<IUser> {
  getUserRoleById(userId: string): Promise<string>;
}

// Custom method to get user role by _id
userSchema.statics.getUserRoleById = async function (userId: string) {
  try {
    const user = await this.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user.role || "user";
  } catch (error) {
    throw error;
  }
};

// Create the User model using the userSchema
const User =
  mongoose.models?.User ||
  mongoose.model<IUser, IUserModel>("User", userSchema);

// Export the User model
export default User;
