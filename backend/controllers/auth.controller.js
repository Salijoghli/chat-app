import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/genToken.js";
import {
  validateRegisterUser,
  validateLoginUser,
} from "../../shared/userValidation.js";
import expressAsyncHandler from "express-async-handler";
import { handleError } from "../utils/handleError.js";

export const signup = expressAsyncHandler(async (req, res) => {
  const { fullname, username, password, confirmPassword, gender } = req.body;

  //validate user data
  const { error } = validateRegisterUser(req.body);

  if (error) {
    const errors = error.details.map((err) => err.message);
    handleError(res, 400, errors);
  }

  const user = await User.findOne({ username });
  if (user) handleError(res, 400, "Username already exists");

  //password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Profile picture URL - it will make unique profile picture based on username
  const genderAvatars = {
    male: `https://avatar.iran.liara.run/public/boy?username=${username}`,
    female: `https://avatar.iran.liara.run/public/girl?username=${username}`,
  };

  const profilePicture = genderAvatars[gender];

  const newUser = new User({
    fullname,
    username,
    password: hashedPassword,
    gender,
    profilePicture,
  });

  //save user
  if (newUser) {
    await newUser.save();
    //jwt signature
    generateToken(newUser._id, res);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePicture: newUser.profilePicture,
      },
    });
  } else handleError(res, 400, "User registration failed");
});
export const login = expressAsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  //validate user data
  const { error } = validateLoginUser(req.body);

  if (error) handleError(res, 400, "Invalid credentials");

  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password)))
    handleError(res, 400, "Invalid credentials");

  //jwt signature
  const token = generateToken(user._id, res);
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: {
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePicture: user.profilePicture,
    },
  });
});

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {});
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    handleError(res, 500, "Internal server error");
  }
};
