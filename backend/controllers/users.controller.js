import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";

export const getUsers = expressAsyncHandler(async (req, res) => {
  const loggedUserId = req.user._id;

  const users = await User.find({ _id: { $ne: loggedUserId } }).select(
    "-password"
  );

  res.status(200).json(users);
});
