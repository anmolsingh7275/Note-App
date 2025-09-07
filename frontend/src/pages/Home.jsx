// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleSignUp = () => navigate("/signup");
  const handleLogin = () => navigate("/login");

  const handleWriteNote = () => {
    navigate("/dashboard"); // Directly go to dashboard
  };

  const handleViewNotes = () => {
    navigate("/dashboard"); // Directly go to dashboard
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <h1 className="text-5xl font-bold mb-8 text-purple-700 dark:text-purple-400 text-center">
        Welcome to NoteApp
      </h1>

      {!isLoggedIn && (
        <div className="space-x-4 mb-6">
          <button
            onClick={handleSignUp}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
          <button
            onClick={handleLogin}
            className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
          >
            Login
          </button>
        </div>
      )}

      <div className="space-x-4">
        <button
          onClick={handleWriteNote}
          className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition"
        >
          Write Note
        </button>
        <button
          onClick={handleViewNotes}
          className="px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
        >
          View Notes
        </button>
      </div>

      {isLoggedIn && (
        <p className="mt-6 text-gray-700 dark:text-gray-300">
          You are already logged in!
        </p>
      )}
    </div>
  );
}
