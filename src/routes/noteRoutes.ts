import { Router } from "express";
import { getDatabase } from "../database";
import { ObjectId } from "mongodb";

const router = Router();

router.get("/notes", async (req, res) => {
    try {
        const db = getDatabase();
        const notesCollection = db.collection("notes");
        const notes = await notesCollection.find().toArray();
        res.json(notes);
    } catch (err) {
        res.status(500).send("Error fetching notes");
    }
});

// Create a new note
router.post("/notes", async (req, res) => {
    try {
        const newNote = req.body;
        const db = getDatabase();
        const notesCollection = db.collection("notes");
        const result = await notesCollection.insertOne(newNote);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send("Error creating note");
    }
});

// Update a note
router.put("/notes/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const db = getDatabase();
        const notesCollection = db.collection("notes");
        const result = await notesCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updates },
        );
        res.json(result);
    } catch (err) {
        res.status(500).send("Error updating note");
    }
});

// Delete a note
router.delete("/notes/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const db = getDatabase();
        const notesCollection = db.collection("notes");
        const result = await notesCollection.deleteOne({
            _id: new ObjectId(id),
        });
        res.json(result);
    } catch (err) {
        res.status(500).send("Error deleting note");
    }
});

export default router;
