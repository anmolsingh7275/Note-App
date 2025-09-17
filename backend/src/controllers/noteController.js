import Note from "../models/Note.js"; // Note model
import User from "../models/User.js";

// ==========================
// GET ALL NOTES
// ==========================
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find()
      .populate("lastEditedBy", "username") // populate username
      .sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// ==========================
// GET NOTE BY ID
// ==========================
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate("lastEditedBy", "username");
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch note" });
  }
};

// ==========================
// CREATE NOTE
// ==========================
export const createNote = async (req, res) => {
  try {
    const note = new Note({
      ...req.body,
      lastEditedBy: req.user.id, // who created the note
    });
    await note.save();
    await note.populate("lastEditedBy", "username");

    // Emit socket event
    req.io.emit("noteCreated", note);

    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create note" });
  }
};

// ==========================
// UPDATE NOTE
// ==========================
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    Object.assign(note, req.body);
    note.lastEditedBy = req.user.id;
    await note.save();
    await note.populate("lastEditedBy", "username");

    req.io.emit("noteUpdated", note);

    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update note" });
  }
};

// ==========================
// DELETE NOTE
// ==========================
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    req.io.emit("noteDeleted", note._id);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete note" });
  }
};

// ==========================
// TOGGLE FAVORITE
// ==========================
export const toggleFavorite = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    note.favorite = !note.favorite;
    note.lastEditedBy = req.user.id;
    await note.save();
    await note.populate("lastEditedBy", "username");

    req.io.emit("noteUpdated", note);

    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to toggle favorite" });
  }
};
