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
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const noteRoutes_1 = __importDefault(require("../src/routes/noteRoutes"));
const app = (0, express_1.default)();
// MongoDB connection string (replace with your MongoDB Atlas URL in the .env file)
const url = process.env.MONGODB_URI ||
    "mongodb+srv://anayatingson:E5KBeIa69YJUwVDu@dev-note-db-cluster.nvno3.mongodb.net/?retryWrites=true&w=majority&appName=dev-note-db-cluster";
const dbName = process.env.MONGODB_DB || "notetaking";
// Middleware
app.use(express_1.default.json());
function createServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb_1.MongoClient(url);
        yield client.connect();
        const db = client.db(dbName);
        // Inject database into routes
        app.use("/notes", (0, noteRoutes_1.default)(db));
        return app;
    });
}
// Vercel entry point
let server;
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!server) {
        server = yield createServer();
    }
    server(req, res);
});
