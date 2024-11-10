import mongoose, { ConnectOptions } from "mongoose";

import { siteConfig } from "@/config/site";

interface Config {
  isConnected: number;
}

const config: Config = {
  isConnected: 0,
};

const connectDB = async (): Promise<void> => {
  // Check if already connected to DB
  if (config.isConnected) {
    return;
  }

  const options: ConnectOptions = {
    dbName: siteConfig.DB_NAME,
  };

  try {
    const mongooseInstance = await mongoose.connect(
      process.env.MONGODB_URI as string,
      options,
    );

    config.isConnected = mongooseInstance.connection.readyState;

    // console.log("Connected to DB 👍👍👍");
    // console.log("connected with host ", mongooseInstance.connection.host);
  } catch (error: any) {
    // console.log("Failed to connect DB ☠️☠️☠️", error);
    throw new Error(error);
  }
};

export default connectDB;
