import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Registered:", formData);
    // Later: send to backend using axios
  };

  return (
    <div className="signup-container min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="signup-box bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-md transform hover:scale-105 transition duration-300">
        <h2 className="text-4xl font-extrabold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-8">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-purple-300 dark:border-purple-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-700 focus:border-purple-500 placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Enter your name"
            />
          </div>

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
              className="w-full p-3 border-2 border-blue-300 dark:border-blue-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Enter your email"
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
              className="w-full p-3 border-2 border-pink-300 dark:border-pink-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-700 focus:border-pink-500 placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-500 dark:text-purple-400 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
