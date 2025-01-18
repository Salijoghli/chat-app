import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getPendingRequests,
  cancelFriendRequest,
  deleteFriend,
} from "../controllers/friends.controller.js";

const router = express.Router();

router.post("/send/:userId", protect, sendFriendRequest);
router.post("/accept/:requestId", protect, acceptFriendRequest);
router.post("/reject/:requestId", protect, rejectFriendRequest);
router.delete("/cancel/:requestId", protect, cancelFriendRequest);
router.get("/pending", protect, getPendingRequests);
router.delete("/remove/:friendId", protect, deleteFriend);

export default router;
