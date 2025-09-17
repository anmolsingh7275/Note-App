import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import cors from "cors";
import { createServer } from "http";    
import { Server } from "socket.io";     

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// test route
app.get("/", (req, res) => res.send("API is running..."));

// create HTTP server for socket.io
const httpServer = createServer(app);

// setup socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "*",   // ⚠️ replace with your frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// socket.io logic
io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

// ✅ Export io so controllers can emit events
export { io };
