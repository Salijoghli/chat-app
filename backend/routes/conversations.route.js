import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  getConversations,
  createConversation,
  updateConversation,
  deleteConversation,
  addParticipantToGroup,
  removeParticipantFromGroup,
  addAdminToGroup,
  removeAdminFromGroup,
  pinMessage,
  unpinMessage,
  leaveGroup,
  getGroupConversations,
  changeGroupAvatar,
  changeGroupName,
} from "../controllers/conversations.controller.js";

const router = express.Router();

router.use(protect);

// GET routes
router.get("/", getConversations);
router.get("/groups", getGroupConversations);

// POST routes
router.post("/", createConversation);
router.post("/:conversationId/pin/:messageId", pinMessage);
router.post("/:conversationId/participants", addParticipantToGroup);
router.post("/:conversationId/admins", addAdminToGroup);

// PATCH routes
router.patch("/:conversationId", updateConversation);
router.patch("/:conversationId/name", changeGroupName);
router.patch("/:conversationId/avatar", changeGroupAvatar);

// DELETE routes
router.delete("/:conversationId", deleteConversation);
router.delete("/:conversationId/pin/:messageId", unpinMessage);
router.delete(
  "/:conversationId/participants/:userId",
  removeParticipantFromGroup
);
router.delete("/:conversationId/admins/:userId", removeAdminFromGroup);
router.delete("/:conversationId/leave", leaveGroup);

export default router;
