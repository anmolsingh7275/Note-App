

// ==========================
// GET ALL NOTES (owner + collaborators)
// ==========================
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      $or: [{ owner: req.user.id }, { collaborators: req.user.id }]
    })
      .populate("lastEditedBy", "username")
      .populate("owner", "username")
      .populate("collaborators", "username")
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
      .populate("lastEditedBy", "username")
      .populate("owner", "username")
      .populate("collaborators", "username");

    if (!note) return res.status(404).json({ error: "Note not found" });

    // security: ensure user has access
    if (
      note.owner.toString() !== req.user.id &&
      !note.collaborators.includes(req.user.id)
    ) {
      return res.status(403).json({ error: "Not authorized to view this note" });
    }

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
      owner: req.user.id, // owner is logged-in user
      lastEditedBy: req.user.id,
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

    // security: only owner or collaborators can update
    if (
      note.owner.toString() !== req.user.id &&
      !note.collaborators.includes(req.user.id)
    ) {
      return res.status(403).json({ error: "Not authorized to edit this note" });
    }

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
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    // only owner can delete
    if (note.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: "Only owner can delete note" });
    }

    await note.deleteOne();

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

    if (
      note.owner.toString() !== req.user.id &&
      !note.collaborators.includes(req.user.id)
    ) {
      return res.status(403).json({ error: "Not authorized to edit favorite" });
    }

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

// ==========================
// ADD COLLABORATOR
// ==========================
import Note from "../models/Note.js";
import User from "../models/User.js";

// ==========================
// ADD COLLABORATOR
// ==========================
export const addCollaborator = async (req, res) => {
  try {
    const noteId = req.params.id; // now from URL param
    const { collaboratorId } = req.body; // only collaboratorId from body

    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ error: "Note not found" });

    // only owner can add collaborators
    if (note.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: "Only owner can add collaborators" });
    }

    if (!note.collaborators.includes(collaboratorId)) {
      note.collaborators.push(collaboratorId);
      await note.save();
    }

    await note.populate("collaborators", "username");
    req.io.emit("noteUpdated", note);

    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add collaborator" });
  }
};

// ==========================
// REMOVE COLLABORATOR
// ==========================
export const removeCollaborator = async (req, res) => {
  try {
    const noteId = req.params.id; // from URL param
    const { collaboratorId } = req.body;

    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ error: "Note not found" });

    // only owner can remove collaborators
    if (note.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: "Only owner can remove collaborators" });
    }

    note.collaborators = note.collaborators.filter(
      (id) => id.toString() !== collaboratorId
    );
    await note.save();

    await note.populate("collaborators", "username");
    req.io.emit("noteUpdated", note);

    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove collaborator" });
  }
};


