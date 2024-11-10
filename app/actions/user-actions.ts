"use server";
import path from "path";
import fs from "fs/promises";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

import { handleError } from "./errorHandler";

import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/fetch-user";
import User from "@/models/users/user.model";
import deleteFilePath from "@/utils/delete-file-from-path";
import uploadFileHandler from "@/utils/file-upload-helpers";
import connectDB from "@/lib/connectdb";
import { isError } from "lodash";

export const uploadUserAvatarAction = async (formData: FormData) => {
  try {
    const session = await auth();
    const { email } = session?.user || {};
    const user = await getUserByEmail(email as string);
    const file = formData.get("avatar") as File;

    const newAvatarLink = await uploadFileHandler({
      file,
      extensionArray: ["png", "jpg", "jpeg"],
      destinationPath: "/images/avatar",
    });

    // Delete the Old Avatar if exists::
    if (user?.image) {
      const fileName = path.basename(user.image);
      const filePath = `public/images/avatar/${fileName}`;

      try {
        // Check if the file exists
        await fs.access(filePath);
        // File exists, so delete it
        await deleteFilePath(filePath);
        // console.log("Old avatar deleted:", filePath);
      } catch {
        // File does not exist, so skip deletion
        // console.log("No existing file to delete.");
      }
    }

    await User.findByIdAndUpdate(
      user.id,
      { $set: { image: newAvatarLink } },
      { new: true }
    );

    revalidatePath("/dashboard/profile");
  } catch (error: any) {
    throw new Error(error);
  }
};

// password change
export const changePassword = async (formData: FormData) => {
  try {
    // Authenticate and get user info
    const session = await auth();
    const { email } = session?.user || {};

    connectDB();
    const user = await User.findOne({ email });

    const oldPassword = formData.get("old-password") as string;
    const newPassword = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      throw new Error("New password and confirm password do not match.");
    }

    if (user?.password) {
      // User has an existing password, so we need to verify the old password
      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        throw new Error("The old password is incorrect.");
      }
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    return {
      success: true,
      message: "Password changed successfully",
    };
  } catch (error: any) {
    // console.log(error);

    // Return error message
    return handleError(error);
  }
};

//
// /app/actions/user-actions.js
export async function updateUserDetails(formData: FormData) {
  const session = await auth();
  const { email } = session?.user || {};

  const updatedDetails = {
    name: formData.get("name"),
    bio: formData.get("bio"),
    phone: formData.get("phone"),
    address: formData.get("address"),
  };

  try {
    connectDB();
    const user = await User.findOne({ email });

    // Update user's password
    user.name = updatedDetails?.name;
    user.bio = updatedDetails?.bio;
    user.phoneNumber = updatedDetails?.phone;
    user.address = updatedDetails?.address;
    await user.save();

    return {
      success: true,
      message: "User details updated!",
      data: updatedDetails,
    };
  } catch (error: any) {
    // console.log(error);

    return handleError(error);
  }
}

export const toggleUserRole = async (id: string) => {
  try {
    await connectDB();

    const user = await User.findOne({ _id: id });
    if (!user) throw new Error("User not found");

    // Toggle role based on current role
    if (user.role === "admin") {
      user.role = "user";
    } else {
      user.role = "admin";
    }

    await user.save(); // Save the updated role to the database

    return {
      success: true,
      message: `User Role changes to ${user?.role}`,
      isError: false,
      error: {},
      date: {},
    };
  } catch (error: any) {
    return handleError(error);
  } finally {
    revalidatePath("/dashboard/users");
  }
};
