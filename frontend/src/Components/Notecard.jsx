import React, { useState } from "react";
import { FaStar, FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";

// Pastel background + matching border colors
const colors = [
  { bg: "#FEF3C7", border: "#FACC15" }, // yellow
  { bg: "#FBCFE8", border: "#EC4899" }, // pink
  { bg: "#EDE9FE", border: "#8B5CF6" }, // purple
  { bg: "#DCFCE7", border: "#22C55E" }, // green
  { bg: "#DBEAFE", border: "#3B82F6" }, // blue
];

export default function NoteCard({
  note,
  index,
  onEdit,
  onDelete,
  onToggleFavorite,
  onCollaborate, // ✅ new prop for collaborator modal
}) {
  const [hovered, setHovered] = useState(false);
  const colorSet = colors[index % colors.length];

  return (
    <div
      style={{
        backgroundColor: hovered ? `${colorSet.bg}dd` : colorSet.bg, // pastel bg
        borderColor: colorSet.border, // colorful border
      }}
      className={`relative rounded-2xl p-5 border-2 transition transform ${
        hovered ? "-translate-y-1 shadow-2xl" : "shadow-lg"
      } cursor-pointer`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Favorite Star */}
      <div
        className="absolute top-3 right-3 cursor-pointer"
        onClick={() => onToggleFavorite(note._id)}
      >
        <FaStar
          className={`h-5 w-5 transition ${
            note.favorite
              ? "text-yellow-500"
              : "text-gray-500 hover:text-yellow-400"
          }`}
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-black mb-2 truncate">
        {note.title}
      </h3>

      {/* Content */}
      <p className="text-black text-sm line-clamp-5">{note.content}</p>

      {/* Last edited by */}
      {note.lastEditedBy?.username && (
        <p className="text-gray-700 text-xs mt-2">
          Last edited by:{" "}
          <span className="font-medium">{note.lastEditedBy.username}</span>
        </p>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        {/* Date */}
        <span className="text-gray-800 text-xs">{note.date}</span>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(note._id)}
            className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition shadow"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition shadow"
            title="Delete"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => onCollaborate(note._id)} // ✅ opens CollaboratorModal
            className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition shadow"
            title="Collaborate"
          >
            <FaUserPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
