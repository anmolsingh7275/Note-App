import express from "express";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  toggleFavorite,
} from "../controllers/noteController.js";
import {verifyToken} from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Protect all routes with auth middlewcdare
router.use(verifyToken);

// Routes
router.get("/", getNotes);                // Get all notes
router.get("/:id", getNoteById);          // Get single note by ID
router.post("/", createNote);             // Create a new note
router.put("/:id", updateNote);           // Update a note
router.delete("/:id", deleteNote);        // Delete a note
router.patch("/:id/favorite", toggleFavorite); // Toggle favorite

export default router;
