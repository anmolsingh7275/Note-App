// src/components/SearchBar.jsx
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ value, onChange, placeholder = "Search notes..." }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Search Icon */}
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      
      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      />
    </div>
  );
}
