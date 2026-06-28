import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
export const connectToDB = async () => {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
  }
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  return mongoose.connect(MONGO_URI);
};

// Define the Schema
const announcementSchema = new mongoose.Schema({
  text: String,
  shop: String,
  timestamp: { type: Date, default: Date.now }
});

// Create or retrieve the Model
export const Announcement = mongoose.models.Announcement || mongoose.model("Announcement", announcementSchema);
