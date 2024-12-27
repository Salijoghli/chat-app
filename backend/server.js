import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { connectMongoDB } from "./db/connectMongoDB.js";

const app = express();
const PORT = process.env.PORT || 3000;

//use env variables
dotenv.config();
//use json from body
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectMongoDB();
});
