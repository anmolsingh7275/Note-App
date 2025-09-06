import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";   // make sure folder name matches
import SearchBar from "../components/SearchBar";
import { useToast } from "../components/Toast";  // import toast

export default function Dashboard() {
  const navigate = useNavigate();
  const { showToast } = useToast(); // Toast hook

  const [notes, setNotes] = useState([]); // Notes from backend
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [loading, setLoading] = useState(true);

  // Fetch notes from backend API
  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch("/api/notes"); // Replace with your backend endpoint
        if (!response.ok) throw new Error("Failed to fetch notes");
        const data = await response.json();
        setNotes(data);
        showToast("Notes loaded ✅", "success");
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        showToast("Failed to fetch notes ❌", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, [showToast]);

  // Filter notes based on search term
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setNotes(notes.filter((note) => note.id !== id));
      showToast("Note deleted successfully ✅", "success");
    } catch (error) {
      console.error("Failed to delete note:", error);
      showToast("Failed to delete note ❌", "error");
    }
  };

  const handleEdit = (note) => {
    navigate(`/edit/${note.id}`);
    showToast("Editing note...", "info");
  };

  const handleToggleFavorite = async (id) => {
    try {
      const updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, favorite: !note.favorite } : note
      );
      setNotes(updatedNotes);

      const favoriteStatus = updatedNotes.find((n) => n.id === id).favorite;

      const res = await fetch(`/api/notes/${id}/favorite`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorite: favoriteStatus }),
      });

      if (!res.ok) throw new Error("Favorite update failed");

      showToast(
        favoriteStatus ? "Added to favorites ⭐" : "Removed from favorites ❌",
        "success"
      );
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
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
