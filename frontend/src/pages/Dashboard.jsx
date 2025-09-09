// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "../Components/Notecard";
import SearchBar from "../Components/SearchBar";
import { useToast } from "../Components/Toast";
import { getNotes, deleteNote, toggleFavorite } from "../api.js";

export default function Dashboard() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Protect this route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please login first 🚪", "error");
      navigate("/login");
    } else {
      fetchNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch notes from backend
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const data = await getNotes(); // use api.js function
      setNotes(data);
      showToast("Notes loaded ✅", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to load notes ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  // Filter notes
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n._id !== id));
      showToast("Note deleted ✅", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete note ❌", "error");
    }
  };

  const handleEdit = (id) => {
   navigate(`/edit/${id}`);  
  };

  const handleToggleFavorite = async (id) => {
    try {
      const updatedNote = await toggleFavorite(id);
      setNotes(notes.map((n) => (n._id === id ? updatedNote : n)));
      showToast(
        updatedNote.favorite ? "Added to favorites ⭐" : "Removed from favorites ❌",
        "success"
      );
    } catch (err) {
      console.error(err);
      showToast("Failed to update favorite ❌", "error");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col p-6 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Search Bar */}
      <div className="flex justify-center mb-6 w-full">
        <div className="w-full max-w-md">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>

      {/* Add Note Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/AddNote")}
          className="py-2 px-5 bg-green-500 text-white font-bold rounded-xl shadow-lg hover:bg-green-600 transition"
        >
          Add Note
        </button>
      </div>

      {/* Notes Grid */}
      {loading ? (
        <p className="text-gray-700 dark:text-gray-300 text-center mt-10 text-lg col-span-full">
          Loading notes...
        </p>
      ) : filteredNotes.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300 text-center mt-10 text-lg col-span-full">
          No notes found. Try another search or click "Add Note".
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredNotes.map((note, index) => (
            <NoteCard
              key={note._id}
              note={note}
              index={index}
              onEdit={() => handleEdit(note._id)}
              onDelete={() => handleDelete(note._id)}
              onToggleFavorite={() => handleToggleFavorite(note._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
