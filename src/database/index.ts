import mongoose from "mongoose";
import { config } from "dotenv";

config({ path: "./test.env" });

const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URI!).then(() => {
    console.log("✅ Database connection established.");
  });
};

export default connectDB;
