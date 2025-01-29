import express from "express";
import dotenv from "dotenv";
import noteRoutes from "../src/routes/noteRoutes";
import { connectDB } from "../src/database";

// Load environment variables from .env
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Route for root path to get all notes
app.get("/", async (req, res) => {
    try {
        const client = await connectDB();
        if (!client) {
            return res
                .status(500)
                .json({ message: "Failed to connect to database" });
        }

        const db = client.db(); // Get the database object
        if (!db) {
            // If db is undefined or null, return an error response
            return res.status(500).json({ message: "Database not found" });
        }
        const notesCollection = db.collection("notes");
        const notes = await notesCollection.find().toArray();
        res.json({
            message: "Hello from Express + MongoDB Atlas!",
            data: notes,
        });
    } catch (error) {
        console.error("Error retrieving notes:", error);
        res.status(500).json({ message: "Error retrieving notes", error });
    }
});

// Ensure MongoDB connection
connectDB().catch((err) => {
    console.error("Failed to connect to MongoDB Atlas:", err);
    process.exit(1); // Exit the app if DB connection fails
});

app.use("/api", noteRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
