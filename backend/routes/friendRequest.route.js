import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getPendingRequests,
  cancelFriendRequest,
} from "../controllers/friendRequest.controller.js";

const router = express.Router();

router.post("/send/:userId", protect, sendFriendRequest);
router.post("/accept/:requestId", protect, acceptFriendRequest);
router.post("/reject/:requestId", protect, rejectFriendRequest);
router.delete("/cancel/:requestId", protect, cancelFriendRequest);
router.get("/pending", protect, getPendingRequests);

export default router;
