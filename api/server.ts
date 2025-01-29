import express from "express";
import { MongoClient } from "mongodb";
import noteRoutes from "../src/routes/noteRoutes";
import { VercelRequest, VercelResponse } from "@vercel/node";

const app = express();

// MongoDB connection string (replace with your MongoDB Atlas URL in the .env file)
const url =
    process.env.MONGODB_URI ||
    "mongodb+srv://anayatingson:E5KBeIa69YJUwVDu@dev-note-db-cluster.nvno3.mongodb.net/?retryWrites=true&w=majority&appName=dev-note-db-cluster";
const dbName = process.env.MONGODB_DB || "notetaking";

// Middleware
app.use(express.json());

async function createServer() {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);

    // Inject database into routes
    app.use("/notes", noteRoutes(db));

    return app;
}

// Vercel entry point
let server: express.Express;
export default async (req: VercelRequest, res: VercelResponse) => {
    if (!server) {
        server = await createServer();
    }
    server(req, res);
};
