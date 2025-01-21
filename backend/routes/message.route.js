import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  sendMessage,
  getMessages,
  editMessage,
  deleteMessage,
  replyToMessage,
  searchMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// GET routes
router.get("/conversation/:conversationId", getMessages);
router.get("/search", searchMessages);

// POST routes
router.post("/conversation/:conversationId", sendMessage);
router.post("/:messageId/reply", replyToMessage);

// PATCH routes
router.patch("/:messageId/edit", editMessage);

// DELETE routes
router.delete("/:messageId", deleteMessage);

export default router;
