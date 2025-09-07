import express from "express";
import { register, login, me } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // ✅ named import

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, me); // protected route

export default router;
