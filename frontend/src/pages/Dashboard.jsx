// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "../Components/NoteCard"; // Ensure path is correct
import SearchBar from "../Components/SearchBar"; // Ensure path is correct

export default function Dashboard() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]); // Notes from backend
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [loading, setLoading] = useState(true);

  // Fetch notes from backend API
  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch("/api/notes"); // Replace with your API endpoint
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  // Filter notes based on search term
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/notes/${id}`, { method: "DELETE" });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const handleEdit = (note) => {
    navigate(`/edit/${note.id}`);
  };

  const handleToggleFavorite = async (id) => {
    try {
      const updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, favorite: !note.favorite } : note
      );
      setNotes(updatedNotes);
      await fetch(`/api/notes/${id}/favorite`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorite: updatedNotes.find(n => n.id === id).favorite }),
      });
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col p-6 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 w-full">
        {/* App Logo / Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
          Note App
        </h1>

        {/* Search Bar (center) */}
        <div className="flex-1 mx-4 w-full max-w-md">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        {/* Add Note Button */}
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
              key={note.id}
              note={note}
              index={index}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
