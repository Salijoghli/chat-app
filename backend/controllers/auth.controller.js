export const signup = (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    if (!fullname || !username || !password || !confirmPassword)
      res.status(400).json({ message: "All fields are required" });
    if (password !== confirmPassword)
      res.status(400).json({ message: "Passwords do not match" });
  } catch (error) {}
};
export const login = (req, res) => {
  res.send("Login route");
};
export const logout = (req, res) => {
  res.send("Logout route");
};
