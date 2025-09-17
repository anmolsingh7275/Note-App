// src/components/CollaboratorModal.jsx
import React, { useState } from "react";
import { addCollaborator, removeCollaborator } from "../api";
import { useToast } from "./Toast";

export default function CollaboratorModal({ noteId, onClose }) {
  const [collaborator, setCollaborator] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  // Helper: resolve email/username to userId
  const getUserId = async (input) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/find?query=${input}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Check if response is JSON before parsing
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid response from server");
      }

      if (!res.ok) throw new Error(data.message || "User not found");

      return data._id; // backend should return user document
    } catch (err) {
      console.error(err.message);
      throw new Error(err.message || "Failed to fetch user");
    }
  };

  const handleAdd = async () => {
    if (!collaborator.trim()) {
      showToast("Please enter an email/username", "error");
      return;
    }
    setLoading(true);
    try {
      const userId = await getUserId(collaborator.trim());
      await addCollaborator(noteId, userId);
      showToast("Collaborator added ✅", "success");
      setCollaborator("");
      onClose();
    } catch (err) {
      showToast(`Failed to add collaborator ❌ (${err.message})`, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!collaborator.trim()) {
      showToast("Please enter an email/username", "error");
      return;
    }
    setLoading(true);
    try {
      const userId = await getUserId(collaborator.trim());
      await removeCollaborator(noteId, userId);
      showToast("Collaborator removed ✅", "success");
      setCollaborator("");
      onClose();
    } catch (err) {
      showToast(`Failed to remove collaborator ❌ (${err.message})`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          Manage Collaborators
        </h2>

        <input
          type="text"
          value={collaborator}
          onChange={(e) => setCollaborator(e.target.value)}
          placeholder="Enter email or username"
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleRemove}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition disabled:opacity-50"
          >
            {loading ? "Removing..." : "Remove"}
          </button>
          <button
            onClick={handleAdd}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
