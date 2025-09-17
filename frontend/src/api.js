import axios from "axios";
import { io } from "socket.io-client";

// =====================
// AXIOS SETUP
// =====================
const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend base URL
  headers: { "Content-Type": "application/json" },
});

// attach JWT token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// =====================
// SOCKET.IO SETUP
// =====================
export const socket = io("http://localhost:5000", {
  autoConnect: true,
  auth: {
    token: localStorage.getItem("token"), // optional if backend uses JWT for socket
  },
});

// =====================
// AUTH ROUTES
// =====================
export const registerUser = async (username, email, password) => {
  const res = await api.post("/auth/register", { username, email, password });
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

// =====================
// NOTES ROUTES
// =====================
export const getNotes = async () => {
  const res = await api.get("/notes");
  return res.data;
};

export const getNoteById = async (id) => {
  const res = await api.get(`/notes/${id}`);
  return res.data;
};

export const createNote = async (note) => {
  const res = await api.post("/notes", note);
  return res.data; // backend will emit noteCreated
};

export const updateNote = async (id, note) => {
  const res = await api.put(`/notes/${id}`, note);
  return res.data; // backend will emit noteUpdated
};

export const deleteNote = async (id) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data; // backend will emit noteDeleted
};

export const toggleFavorite = async (id) => {
  const res = await api.patch(`/notes/${id}/favorite`);
  return res.data; // backend will emit noteUpdated
};

// =====================
// COLLABORATOR ROUTES
// =====================
export const addCollaborator = async (noteId, collaboratorId) => {
  const res = await api.post(`/notes/${noteId}/add-collaborator`, {
    collaboratorId,
  });
  return res.data; // backend will emit noteUpdated
};

export const removeCollaborator = async (noteId, collaboratorId) => {
  const res = await api.post(`/notes/${noteId}/remove-collaborator`, {
    collaboratorId,
  });
  return res.data; // backend will emit noteUpdated
};

// =====================
// SOCKET LISTENERS
// =====================
export const onNoteCreated = (callback) => {
  socket.on("noteCreated", callback);
};

export const onNoteUpdated = (callback) => {
  socket.on("noteUpdated", callback);
};

export const onNoteDeleted = (callback) => {
  socket.on("noteDeleted", callback);
};
