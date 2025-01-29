import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// MongoDB connection URI from environment variable
const MONGODB_URI = process.env.MONGODB_URI || "";

let client: MongoClient | null = null;

export const connectDB = async () => {
    try {
        if (client) {
            console.log("Already connected to the database.");
            return client;
        }
        if (!client) {
            client = new MongoClient(MONGODB_URI);
            // Connect to MongoDB Atlas
            await client.connect();
            console.log("Connected to MongoDB Atlas!");
            return client;
        }
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw new Error("Could not connect to MongoDB Atlas");
    }
};

export const getDatabase = () => {
    if (!client) {
        throw new Error("Database not connected. Please connect first.");
    }
    return client.db(); // Return the connected database
};
