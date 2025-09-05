import React, { useState } from "react";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { format } from "date-fns";

// Pastel background colors
const colors = [
  "#FEF3C7", // yellow
  "#FBCFE8", // pink
  "#EDE9FE", // purple
  "#DCFCE7", // green
  "#DBEAFE", // blue
  "#FFE5B4", // orange
];

export default function NoteCard({ note, index, onEdit, onDelete, onToggleFavorite }) {
  const [hovered, setHovered] = useState(false);
  const bgColor = colors[index % colors.length];

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`relative rounded-xl p-5 shadow-lg border border-gray-300 dark:border-gray-600 transition transform ${
        hovered ? "-translate-y-1 shadow-2xl" : ""
      } cursor-pointer`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Favorite Star */}
      <div
        className="absolute top-3 right-3 cursor-pointer text-yellow-400 dark:text-yellow-300"
        onClick={() => onToggleFavorite(note.id)}
      >
        <FaStar className={note.favorite ? "fill-current text-yellow-400 dark:text-yellow-300" : "text-gray-400"} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 truncate">
        {note.title}
      </h3>

      {/* Content */}
      <p className="text-gray-800 dark:text-gray-200 text-sm line-clamp-5">{note.content}</p>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        {/* Date */}
        <span className="text-gray-700 dark:text-gray-300 text-xs">
          {format(new Date(note.date), "MMM dd, yyyy")}
        </span>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(note.id)}
            className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
