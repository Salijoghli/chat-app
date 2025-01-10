import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import handleError from "../utils/handleError.js";

// Get all users except the logged in user
export const getUsers = expressAsyncHandler(async (req, res) => {
  const loggedUserId = req.user._id;

  const users = await User.find({ _id: { $ne: loggedUserId } }).select(
    "-password"
  );

  res.status(200).json(users);
});

// Get a user by ID
export const getUser = expressAsyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId).select("-password");

  if (!user) handleError(res, 404, "User not found.");

  res.status(200).json({ success: true, data: user });
});

// Delete a friend
export const deleteFriend = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const friendId = req.params.friendId;

  const friend = await User.findById(friendId);
  if (!friend) handleError(res, 404, "Friend not found.");

  const isFriend = friend.friends.includes(userId);
  if (!isFriend) handleError(res, 400, "You are not friends with this user.");

  await Promise.all([
    User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }),
    User.findByIdAndUpdate(friendId, { $pull: { friends: userId } }),
  ]);

  res.status(200).json({ success: true, message: "Friend deleted." });
});
