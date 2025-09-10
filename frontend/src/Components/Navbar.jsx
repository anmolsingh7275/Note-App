import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const navigate = useNavigate();

  // Watch login/logout changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Apply dark mode on mount & change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // go to Home after logout
  };

  return (
    <nav className="bg-purple-600 dark:bg-gray-900 text-white shadow-md w-full">
      <div className="w-full px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          NoteApp
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>

          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-yellow-300 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/addnote"
                className="hover:text-yellow-300 transition"
              >
                Add Note
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-300 transition">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-yellow-400 text-purple-800 px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
