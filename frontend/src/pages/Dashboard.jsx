import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


// ✅ Reusable component to show each note card
function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md p-5 rounded-xl hover:shadow-xl transition w-full h-full">
      {/* Note Title */}
      <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
        {note.title}
      </h3>

      {/* Note Content */}
      <p className="text-gray-600 dark:text-gray-300 mb-4">{note.content}</p>

      {/* Action Buttons (Edit + Delete) */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(note)}
          className="flex-1 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="flex-1 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}


// ✅ Dashboard Component
export default function Dashboard() {
  const navigate = useNavigate(); // Navigation hook
  const [notes, setNotes] = useState([]); // Store notes data
  const [loading, setLoading] = useState(true); // Track loading state

  // 🔹 Fetch all notes from backend
  const fetchNotes = async () => {
    try {
      const response = await axios.get("https://your-api.com/notes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Send auth token if available
        },
      });
      setNotes(response.data); // Save fetched notes
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load notes!");
      setLoading(false);
    }
  };

  // 🔹 Run once when component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  // 🔹 Handle delete note
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://your-api.com/notes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Note deleted!");
      setNotes(notes.filter((note) => note.id !== id)); // Remove deleted note from state
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete note!");
    }
  };

  // 🔹 Handle edit note (navigate to edit page)
  const handleEdit = (note) => {
    navigate(`/edit/${note.id}`);
  };

  // 🔹 Show loading screen while fetching notes
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Loading notes...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col p-6 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
          Your Notes
        </h1>
        <button
          onClick={() => navigate("/AddNote")}
          className="py-2 px-5 bg-green-500 text-white font-bold rounded-xl shadow-lg hover:bg-green-600 transition"
        >
          Add Note
        </button>
      </div>

      {/* Notes Section */}
      {notes.length === 0 ? (
        // No notes found message
        <p className="text-gray-700 dark:text-gray-300 text-center mt-10 text-lg">
          No notes found. Click "Add Note" to create one!
        </p>
      ) : (
        // Grid of notes (responsive layout)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
