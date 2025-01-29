import { Router } from "express";
import { Db, ObjectId } from "mongodb";

const noteRoutes = (db: Db) => {
    const router = Router();
    const notesCollection = db.collection("notes");

    // Fetch all notes
    router.get("/", async (req, res) => {
        try {
            const notes = await notesCollection.find().toArray();
            res.json(notes);
        } catch (err) {
            res.status(500).send("Error fetching notes");
        }
    });

    // Create a new note
    router.post("/", async (req, res) => {
        try {
            const newNote = req.body;
            const result = await notesCollection.insertOne(newNote);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).send("Error creating note");
        }
    });

    // Update a note
    router.put("/:id", async (req, res) => {
        const { id } = req.params;
        const updates = req.body;

        try {
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
    router.delete("/:id", async (req, res) => {
        const { id } = req.params;

        try {
            const result = await notesCollection.deleteOne({
                _id: new ObjectId(id),
            });
            res.json(result);
        } catch (err) {
            res.status(500).send("Error deleting note");
        }
    });

    return router;
};

export default noteRoutes;
