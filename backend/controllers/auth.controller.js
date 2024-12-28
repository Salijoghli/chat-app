import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/genToken.js";
export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    //checks
    if (!fullname || !username || !password || !confirmPassword)
      return res.status(400).json({ message: "All fields are required" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const user = await User.findOne({ username });
    if (user)
      return res.status(400).json({ message: "Username already exists" });

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create profile picture URL - it will make unique profile picture based on username
    const profilePicture =
      gender == "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;

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
        message: "User registered successfully",
        user: {
          _id: newUser._id,
          fullname: newUser.fullname,
          username: newUser.username,
          profilePicture: newUser.profilePicture,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error, please try again later" });
  }
};
export const login = (req, res) => {
  res.send("Login route");
};
export const logout = (req, res) => {
  res.send("Logout route");
};
