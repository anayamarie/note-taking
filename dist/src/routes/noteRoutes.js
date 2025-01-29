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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const noteRoutes = (db) => {
    const router = (0, express_1.Router)();
    const notesCollection = db.collection("notes");
    // Fetch all notes
    router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const notes = yield notesCollection.find().toArray();
            res.json(notes);
        }
        catch (err) {
            res.status(500).send("Error fetching notes");
        }
    }));
    // Create a new note
    router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newNote = req.body;
            const result = yield notesCollection.insertOne(newNote);
            res.status(201).json(result);
        }
        catch (err) {
            res.status(500).send("Error creating note");
        }
    }));
    // Update a note
    router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const updates = req.body;
        try {
            const result = yield notesCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: updates });
            res.json(result);
        }
        catch (err) {
            res.status(500).send("Error updating note");
        }
    }));
    // Delete a note
    router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const result = yield notesCollection.deleteOne({
                _id: new mongodb_1.ObjectId(id),
            });
            res.json(result);
        }
        catch (err) {
            res.status(500).send("Error deleting note");
        }
    }));
    return router;
};
exports.default = noteRoutes;
