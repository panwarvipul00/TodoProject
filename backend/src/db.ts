
import mongoose from "mongoose";

export const connectDB = async (uri: string) => {
  if (!uri) throw new Error("MongoDB URI missing");
  await mongoose.connect(uri);
  console.log("✅ MongoDB Connected");
};
