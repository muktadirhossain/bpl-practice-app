"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { signIn } from "@/auth";
import connectDB from "@/lib/connectdb";
import User from "@/models/users/user.model";
import { handleError } from "./errorHandler";

// Define the schema
const userSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Specify the error path
  });

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const credentialsLogin = async (formData: FormData) => {
  try {
    const formDataObj = Object.fromEntries(formData.entries());
    const { email, password } = credentialsSchema.parse(formDataObj);

    // login::
    const res = await signIn("credentials", {
      email: email as string,
      password: password as string,
      redirect: false,
    });

    // return res;
    console.log("res::", res);
    return {
      success: true,
      message: "Logged in successfully",
      isError: false,
      error: {},
      data: {},
    };
  } catch (error: any) {
    return handleError(error);
  }
};

export const doSocialLogin = async (formData: FormData): Promise<void> => {
  const action = formData.get("action") as string;

  if (action) {
    await signIn(action, { callbackUrl: "/dashboard/home" });
  }
};

// Define types for form action props if needed
// interface FormActionResponse {
//   success: boolean;
//   message: string;
//   error?: {
//     fields: {
//       [key: string]: string;
//     };
//   };
// }

// export const testFormAction = async (
//   props: any,
//   formData: FormData,
// ): Promise<FormActionResponse> => {
//   console.log(props);

//   // const { fullName, email } = Object.fromEntries(formData.entries()) as {
//   //   fullName: string;
//   //   email: string;
//   // };

//   try {
//     throw new Error("this is an error message !!!");

//     return {
//       success: true,
//       message: "Form Submitted successfully!!!",
//     };
//   } catch (error: any) {
//     console.log(error);

//     return {
//       success: false,
//       message: error.message || "An unknown error occurred.",
//       error: {
//         fields: {
//           email: "Invalid email address",
//           fullName: "Please enter your full name",
//         },
//       },
//     };
//   }
// };

export const createUserAction = async (prevState: any, formData: FormData) => {
  await connectDB();
  try {
    const formDataObj = Object.fromEntries(formData.entries());
    const parsedData = userSchema.parse(formDataObj);

    const { fullName, email, password } = parsedData;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database v:   const user =
    await User.create({
      name: fullName,
      email,
      password: hashedPassword,
    });

    return {
      success: true,
      message: "Form submitted successfully!!!",
    };
  } catch (error: any) {
    // console.error(error, "my err");
    if (error instanceof z.ZodError) {
      // Handle validation errors
      const fieldErrors = error.errors.reduce(
        (acc, err) => {
          acc[err.path[0]] = err.message;

          return acc;
        },
        {} as Record<string, string>
      );

      return {
        success: false,
        message: "Validation failed",
        error: { fields: fieldErrors },
      };
    }

    if (error.code && error.code === 11000) {
      // Handle duplicate entry error
      return {
        success: false,
        message: "User Already Exists!",
        error: {
          fields: {
            email: "Email already exists. Please use a different email.",
          },
        },
      };
    }

    // console.log(error);

    return {
      success: false,
      message: "An unknown error occurred.",
      error: {
        fields: {},
      },
    };
  }
};
