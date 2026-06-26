import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://abhinash:abhinash@cluster0.kvut8us.mongodb.net/announcement_app?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
export const connectToDB = async () => {
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
