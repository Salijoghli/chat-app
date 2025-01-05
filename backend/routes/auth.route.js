import express from "express";
import protect from "../middleware/auth.middleware.js";
import { login, logout, signup, auth } from "../controllers/auth.controller.js";

export const router = express.Router();

router.get("/user", protect, auth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
