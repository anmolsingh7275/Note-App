import express from "express";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  toggleFavorite,
  addCollaborator,
  removeCollaborator,
} from "../controllers/noteController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Protect all routes with auth middleware
router.use(verifyToken);

// Routes
router.get("/", getNotes);                       // Get all notes
router.get("/:id", getNoteById);                 // Get single note by ID
router.post("/", createNote);                    // Create a new note
router.put("/:id", updateNote);                  // Update a note
router.delete("/:id", deleteNote);               // Delete a note
router.patch("/:id/favorite", toggleFavorite);   // Toggle favorite

// 👇 New routes for collaborators
router.post("/:id/add-collaborator", addCollaborator);
router.post("/:id/remove-collaborator", removeCollaborator);

export default router;
