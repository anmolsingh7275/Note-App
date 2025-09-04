import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// Component to show each note card
function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-md p-5 rounded-xl hover:shadow-xl transition">
      <h3 className="font-bold text-xl mb-2">{note.title}</h3>
      <p className="text-gray-600 mb-4">{note.content}</p>
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

export default function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all notes from backend
  const fetchNotes = async () => {
    try {
      const response = await axios.get("https://your-api.com/notes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load notes!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle delete note
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

  // Handle edit note (navigate to edit page or open modal)
  const handleEdit = (note) => {
    // Example: navigate to /edit/:id page
    navigate(`/edit/${note.id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-bold">Loading notes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800">Your Notes</h1>
        <button
          onClick={() => navigate("/AddNote")}
          className="py-2 px-5 bg-green-500 text-white font-bold rounded-xl shadow-lg hover:bg-green-600 transition"
        >
          Add Note
        </button>
      </div>

      {notes.length === 0 ? (
        <p className="text-gray-700 text-center mt-10 text-lg">
          No notes found. Click "Add Note" to create one!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
