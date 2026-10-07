const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 5000;
const DATA_FILE = path.join(__dirname, "notes.json");


// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());


// ================= FILE HELPERS =================

function readNotes() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, "[]");
    }

    const data = fs.readFileSync(DATA_FILE, "utf8");

    return JSON.parse(data);
}

function writeNotes(notes) {
    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(notes, null, 2)
    );
}


// ================= HOME ROUTE =================

app.get("/", (req, res) => {
    res.send("QuickNotes API is running!");
});


// ================= GET ALL NOTES =================

app.get("/api/notes", (req, res) => {
    try {
        const notes = readNotes();

        res.json(notes);

    } catch (error) {
        res.status(500).json({
            message: "Failed to read notes"
        });
    }
});


// ================= CREATE NOTE =================

app.post("/api/notes", (req, res) => {
    try {

        const {
            title,
            content,
            subject = "Study",
            priority = "Medium",
            reminderAt = "",
            studyDuration = 25
        } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        if (!content || !content.trim()) {
            return res.status(400).json({
                message: "Content is required"
            });
        }

        const notes = readNotes();

        const newId =
            notes.length === 0
                ? 1
                : Math.max(
                    ...notes.map(note => Number(note.id) || 0)
                ) + 1;

        const newNote = {
            id: newId,
            title: title.trim(),
            content: content.trim(),
            subject: subject || "Study",
            priority: priority || "Medium",
            reminderAt: reminderAt || "",
            studyDuration: Number(studyDuration) || 25,
            completed: false
        };

        notes.push(newNote);

        writeNotes(notes);

        res.status(201).json(newNote);

    } catch (error) {

        res.status(500).json({
            message: "Failed to create note"
        });

    }
});


// ================= UPDATE NOTE =================
// Extra feature for completing notes

app.put("/api/notes/:id", (req, res) => {
    try {

        const id = Number(req.params.id);

        const notes = readNotes();

        const noteIndex = notes.findIndex(
            note => Number(note.id) === id
        );

        if (noteIndex === -1) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        const existingNote = notes[noteIndex];

        const updatedNote = {
            ...existingNote,
            ...req.body,
            id: existingNote.id
        };

        notes[noteIndex] = updatedNote;

        writeNotes(notes);

        res.json(updatedNote);

    } catch (error) {

        res.status(500).json({
            message: "Failed to update note"
        });

    }
});


// ================= DELETE NOTE =================

app.delete("/api/notes/:id", (req, res) => {
    try {

        const id = Number(req.params.id);

        const notes = readNotes();

        const noteExists = notes.some(
            note => Number(note.id) === id
        );

        if (!noteExists) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        const updatedNotes = notes.filter(
            note => Number(note.id) !== id
        );

        writeNotes(updatedNotes);

        res.json({
            message: "Note deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete note"
        });

    }
});


// ================= START SERVER =================

app.listen(PORT, () => {
    console.log(
        `QuickNotes API running on http://localhost:${PORT}`
    );
});