import connectDB from "./connectdb";

import User from "@/models/users/user.model";

export const loginWithEmail = async (email: string, password: string) => {
  try {
    connectDB();
    const user = await User.findOne({
      $or: [{ email: email }, { phoneNumber: email }],
    });

    if (!user) {
      throw new Error("User not found !");
    }
    const isPasswordMatched = password === user.password;

    if (user && isPasswordMatched) {
      return user;
    }
    // else {
    //   throw new Error("Wrong credentials");
    // }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
