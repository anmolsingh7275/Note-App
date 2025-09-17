import axios from "axios";
import { io } from "socket.io-client";

// =====================
// AXIOS SETUP
// =====================
const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend
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
// NOTES ROUTES (REST + SOCKET)
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
  socket.emit("noteCreated", res.data); // 🔥 broadcast via socket
  return res.data;
};

export const updateNote = async (id, note) => {
  const res = await api.put(`/notes/${id}`, note);
  socket.emit("noteUpdated", res.data); // 🔥 broadcast via socket
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await api.delete(`/notes/${id}`);
  socket.emit("noteDeleted", id); // 🔥 broadcast via socket
  return res.data;
};

export const toggleFavorite = async (id) => {
  const res = await api.patch(`/notes/${id}/favorite`);
  socket.emit("noteUpdated", res.data); // 🔥 broadcast
  return res.data;
};

// =====================
// SOCKET LISTENERS (for React components to subscribe)
// =====================
export const onNoteCreated = (callback) => {
  socket.on("noteCreated", (note) => callback(note));
};

export const onNoteUpdated = (callback) => {
  socket.on("noteUpdated", (note) => callback(note));
};

export const onNoteDeleted = (callback) => {
  socket.on("noteDeleted", (noteId) => callback(noteId));
};
