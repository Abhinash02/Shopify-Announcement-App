import mongoose from "mongoose";

<<<<<<< HEAD
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
export const connectToDB = async () => {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
  }
=======
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://abhinash:abhinash@cluster0.kvut8us.mongodb.net/announcement_app?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
export const connectToDB = async () => {
>>>>>>> ba075f0f9e90cbda1ef543c069138404758b6e99
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
