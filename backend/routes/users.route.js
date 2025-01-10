import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  getUsers,
  deleteFriend,
  getUser,
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", protect, getUsers);
router.get("/:userId", protect, getUser);
router.delete("/:friendId", protect, deleteFriend);

export default router;
