import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error(
        "❌ MONGO_URI is not set. Create a .env file or set the MONGO_URI environment variable."
      );
      process.exit(1);
    }

    console.log("Connecting to MongoDB...");
    console.log("URI:", process.env.MONGO_URI?.replace(/:([^@]+)@/, ":****@"));
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
