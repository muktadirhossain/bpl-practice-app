"use server";
import { z } from "zod";

import { handleError } from "./errorHandler";

import connectDB from "@/lib/connectdb";

// Define the schema
const playerSchema = z.object({
  name: z.string().min(1, { message: "Full name is required" }),
  dob: z.string().date(),
  batting_style: z.string(),
  bowling_style: z.string(),
  about: z.string(),
  player_type: z.string(),
  avatar: z.string(),
});

export const addPlayerAction = async (prevState: any, formData: FormData) => {
  try {
    const formDataObj = Object.fromEntries(formData.entries());
    const parsedData = playerSchema.parse(formDataObj);

    const {
      name,
      dob,
      batting_style,
      bowling_style,
      about,
      player_type,
      avatar,
    } = parsedData;

    // BD connect::
    connectDB();
  } catch (error) {
    return handleError(error);
  }
};
