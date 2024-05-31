import mongoose from "mongoose";

const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@dropbox.ri2krwm.mongodb.net/`;
if (!connectionString) {
  throw new Error("Please provide a valid connection string");
}

export const connectDB = async () => {
  if (mongoose.connection?.readyState >= 1) {
    console.log("----Already connected to Mongo DB----");
    return;
  }

  try {
    await mongoose.connect(connectionString, { dbName: "LinkedInClone" });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
