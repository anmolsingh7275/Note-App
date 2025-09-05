import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddNote() {
  const navigate = useNavigate(); // For redirecting after adding note

  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!noteData.title || !noteData.content) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      // Replace URL with your backend endpoint
      const response = await axios.post("https://your-api.com/notes", noteData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // If using JWT auth
        },
      });

      toast.success("Note added successfully!");
      console.log("Server Response:", response.data);

      // Redirect to dashboard after adding
      navigate("/Dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to add note. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-lg transform hover:scale-105 transition duration-300">
        <h2 className="text-4xl font-extrabold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mb-8">
          Add New Note
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={noteData.title}
              onChange={handleChange}
              placeholder="Enter note title"
              className="w-full p-3 border-2 border-blue-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Content
            </label>
            <textarea
              name="content"
              value={noteData.content}
              onChange={handleChange}
              placeholder="Write your note here..."
              rows={6}
              className="w-full p-3 border-2 border-pink-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-500 dark:focus:ring-pink-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300"
            >
              Add Note
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 py-3 bg-gray-300 dark:bg-gray-600 dark:text-gray-200 text-gray-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
