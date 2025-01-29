"use strict";
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
exports.getDatabase = exports.connectDB = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// MongoDB connection URI from environment variable
const MONGODB_URI = process.env.MONGODB_URI || "";
let client = null;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (client) {
            console.log("Already connected to the database.");
            return client;
        }
        if (!client) {
            client = new mongodb_1.MongoClient(MONGODB_URI);
            // Connect to MongoDB Atlas
            yield client.connect();
            console.log("Connected to MongoDB Atlas!");
            return client;
        }
    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw new Error("Could not connect to MongoDB Atlas");
    }
});
exports.connectDB = connectDB;
const getDatabase = () => {
    if (!client) {
        throw new Error("Database not connected. Please connect first.");
    }
    return client.db(); // Return the connected database
};
exports.getDatabase = getDatabase;
