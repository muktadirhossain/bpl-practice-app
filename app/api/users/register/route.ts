import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/connectdb";
import User from "@/models/users/user.model";

// Define an interface for the request body to ensure type safety
interface UserRequestBody {
  fullName: string;
  email: string;
  password: string;
}

export const POST = async (req: Request) => {
  try {
    // Parse the request body
    const { fullName, email, password }: UserRequestBody = await req.json();

    // Connect DB
    await connectDB();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: {
          fullName,
          email,
        },
      },
      {
        status: 201,
        statusText: "User created successfully!",
      },
    );
  } catch (error: any) {
    // console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong!",
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
};
