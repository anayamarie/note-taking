"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const dotenv = __importStar(require("dotenv")); // Updated import
// Load environment variables from .env
dotenv.config();
// Initialize express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// MongoDB connection URI from environment variable
const MONGODB_URI = process.env.MONGODB_URI || "";
let client;
let db;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!client) {
                client = new mongodb_1.MongoClient(MONGODB_URI);
                // Connect to MongoDB Atlas
                yield client.connect();
                db = client.db();
                console.log("✅ Connected to MongoDB Atlas");
            }
        }
        catch (error) {
            console.error("❌ MongoDB connection error:", error);
            throw new Error("Could not connect to MongoDB Atlas");
        }
    });
}
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB();
        const collection = db.collection("notes");
        const result = yield collection.find({}).toArray();
        res.json({
            message: "Hello from Express + MongoDB Atlas!",
            data: result,
        });
    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
        res.status(500).json({ message: "Error connecting to MongoDB Atlas" });
    }
}));
// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
