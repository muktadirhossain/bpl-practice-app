// errorHandler.ts
import { ZodError } from "zod";

export const handleError: any = (error: any) => {
  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const fieldErrors = error.errors.reduce(
      (acc, err) => {
        acc[err.path[0]] = err.message;

        return acc;
      },
      {} as Record<string, string>,
    );

    return {
      success: false,
      message: "Validation failed",
      data: {},
      isError: true,
      error: { fields: fieldErrors },
    };
  }

  // Improved handling for duplicate entry errors
  if (error.code && error.code === 11000) {
    const duplicatedField = Object.keys(error.keyPattern)[0]; // Get the field causing the duplication

    return {
      success: false,
      isError: true,
      data: {},
      message: `${duplicatedField.charAt(0).toUpperCase() + duplicatedField.slice(1)} already exists!`, // Dynamic message based on the field
      error: {
        fields: {
          [duplicatedField]: `${duplicatedField.charAt(0).toUpperCase() + duplicatedField.slice(1)} already exists. Please use a different ${duplicatedField}.`,
        },
      },
    };
  }

  // Handle other unknown errors
  return {
    success: false,
    message: error?.message?.replace("Read more at https://errors.authjs.dev#autherror","") || "An unknown error occurred.",
    isError: true,
    data: {},
    error: {
      fields: {},
    },
  };
};
