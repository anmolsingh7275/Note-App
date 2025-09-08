// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api.js"; // Your backend API call
import { toast } from "react-toastify";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call backend API with email and password
      const data = await loginUser(formData.email, formData.password);

      // Save token in localStorage
      localStorage.setItem("token", data.token);

      // 🔥 Trigger storage event so Navbar updates immediately
      window.dispatchEvent(new Event("storage"));

      // Show success toast
      toast.success("Login successful!");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed! Check your credentials."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-md transform hover:scale-105 transition duration-300">
        <h2 className="text-4xl font-extrabold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full p-3 border-2 border-blue-300 dark:border-blue-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full p-3 border-2 border-pink-300 dark:border-pink-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-700 focus:border-pink-500 placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300 dark:from-green-600 dark:via-blue-600 dark:to-purple-600"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 dark:text-blue-400 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
