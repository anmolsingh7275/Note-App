import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditNote() {
  const { id } = useParams(); // get note id from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  // Fetch the existing note details
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`https://your-api.com/notes/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setFormData({
          title: response.data.title,
          content: response.data.content,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load note!");
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated note
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://your-api.com/notes/${id}`,
        { title: formData.title, content: formData.content },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Note updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update note!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-bold">Loading note...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-purple-600">
          Edit Note
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200"
              placeholder="Enter note title"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="6"
              className="w-full p-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-200"
              placeholder="Enter note content"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:scale-105 transition"
          >
            Update Note
          </button>
        </form>
      </div>
    </div>
  );
}
