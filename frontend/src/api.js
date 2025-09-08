// src/api.js
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // direct backend URL (safe for dev)
  headers: { "Content-Type": "application/json" },
});

// Interceptor to attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
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
  // Save token for future requests
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
  return res.data;
};

export const updateNote = async (id, note) => {
  const res = await api.put(`/notes/${id}`, note);
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};

export const toggleFavorite = async (id) => {
  const res = await api.patch(`/notes/${id}/favorite`);
  return res.data;
};
