import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv"; // Updated import

// Load environment variables from .env
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8080;

// MongoDB connection URI from environment variable
const MONGODB_URI = process.env.MONGODB_URI || "";

let client: MongoClient;
let db: any;

async function connectDB() {
    try {
        if (!client) {
            client = new MongoClient(MONGODB_URI);
            // Connect to MongoDB Atlas
            await client.connect();
            db = client.db();
            console.log("✅ Connected to MongoDB Atlas");
        }
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw new Error("Could not connect to MongoDB Atlas");
    }
}

app.get("/", async (req, res) => {
    try {
        await connectDB();
        const collection = db.collection("notes");
        const result = await collection.find({}).toArray();
        res.json({
            message: "Hello from Express + MongoDB Atlas!",
            data: result,
        });
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        res.status(500).json({ message: "Error connecting to MongoDB Atlas" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
