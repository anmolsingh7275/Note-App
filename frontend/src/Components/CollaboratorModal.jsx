// src/components/CollaboratorModal.jsx
import React, { useState } from "react";
import { addCollaborator, removeCollaborator } from "../api";
import { useToast } from "./Toast";

export default function CollaboratorModal({ noteId, onClose }) {
  const [collaborator, setCollaborator] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleAdd = async () => {
    if (!collaborator.trim()) {
      showToast("Please enter an email/username", "error");
      return;
    }
    setLoading(true);
    try {
      await addCollaborator(noteId, collaborator.trim());
      showToast("Collaborator added ✅", "success");
      setCollaborator("");
      onClose(); // close modal after success
    } catch (err) {
      console.error(err);
      showToast("Failed to add collaborator ❌", "error");
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
      await removeCollaborator(noteId, collaborator.trim());
      showToast("Collaborator removed ✅", "success");
      setCollaborator("");
      onClose();
    } catch (err) {
      console.error(err);
      showToast("Failed to remove collaborator ❌", "error");
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
