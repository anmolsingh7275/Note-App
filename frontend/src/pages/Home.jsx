// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaPen,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaLightbulb,
  FaLock,
  FaCloud,
  FaInstagram,
} from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // ✅ Update login status whenever token changes
  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleAction = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full">
      {/* ==== MAIN CONTENT ==== */}
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        
        {/* Hero Section */}
        <header className="flex flex-col items-center justify-center text-center py-20 px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            ✨ Capture, Create & Remember
          </h1>
          <p className="mt-6 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg md:text-xl italic">
            "The shortest pencil is longer than the longest memory."
          </p>
        </header>

        {/* Action Buttons */}
        <main className="flex flex-col items-center justify-center py-6 px-4">
          <div className="flex flex-wrap gap-6 justify-center">
            <button
              onClick={() => handleAction("/dashboard")}
              className="flex items-center space-x-3 px-8 py-4 rounded-2xl bg-indigo-600 text-white text-xl font-bold shadow-xl hover:scale-105 transform transition duration-300"
            >
              <FaEye size={22} /> <span>View Notes</span>
            </button>
            <button
              onClick={() => handleAction("/addnote")}
              className="flex items-center space-x-3 px-8 py-4 rounded-2xl bg-green-600 text-white text-xl font-bold shadow-xl hover:scale-105 transform transition duration-300"
            >
              <FaPen size={22} /> <span>Write Note</span>
            </button>
          </div>
        </main>

        {/* Features Section */}
        <section className="py-16 px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition">
              <FaLightbulb className="mx-auto text-indigo-600 dark:text-yellow-400" size={50} />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                Organize Ideas
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Capture your thoughts and structure them easily.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition">
              <FaLock className="mx-auto text-green-600 dark:text-green-400" size={50} />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                Secure Notes
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Your notes are private and encrypted.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition">
              <FaCloud className="mx-auto text-yellow-600 dark:text-yellow-400" size={50} />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                Access Anywhere
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Sync across devices and never lose your ideas.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ==== FOOTER ==== */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-20 px-6 min-h-screen flex flex-col justify-center items-center border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10">
          🌍 Connect with Me
        </h2>

        {/* Social Icons */}
        <div className="flex space-x-10 text-gray-700 dark:text-gray-300 mb-12">
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transform hover:scale-125 transition">
            <FaGithub size={40} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transform hover:scale-125 transition">
            <FaLinkedin size={40} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transform hover:scale-125 transition">
            <FaTwitter size={40} />
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="hover:text-pink-500 transform hover:scale-125 transition">
            <FaInstagram size={40} />
          </a>
          <a href="https://yourportfolio.com/" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transform hover:scale-125 transition">
            <span className="text-lg font-semibold">🌐 Portfolio</span>
          </a>
        </div>

        <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl text-lg leading-relaxed">
          NoteApp is your personal digital notebook. Stay inspired, stay organized, 
          and never lose a thought. Whether you're jotting down quick ideas, writing 
          important notes, or keeping track of your goals — everything is safe, simple, 
          and accessible from anywhere.
        </p>

        <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} NoteApp. Built with ❤️ by{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            Anmol Singh
          </span>
        </p>
      </footer>
    </div>
  );
}
