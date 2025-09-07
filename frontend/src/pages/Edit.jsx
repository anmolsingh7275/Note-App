import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById, updateNote } from "../api.js";
import { toast } from "react-toastify";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNote() {
      try {
        const data = await getNoteById(id);
        setFormData({ title: data.title, content: data.content });
      } catch (err) {
        toast.error("Failed to load note");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateNote(id, formData);
      toast.success("Note updated!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };


  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-purple-600 dark:text-purple-400">
          Edit Note
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-purple-300 dark:border-purple-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-700"
              placeholder="Enter note title"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="6"
              className="w-full p-3 border-2 border-pink-300 dark:border-pink-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-700"
              placeholder="Enter note content"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:scale-105 transition dark:from-purple-600 dark:to-pink-600"
          >
            Update Note
          </button>
        </form>
      </div>
    </div>
  );
}
