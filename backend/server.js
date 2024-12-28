import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { connectMongoDB } from "./db/connectMongoDB.js";

const app = express();

//use env variables
dotenv.config();

const PORT = process.env.PORT || 3000;

//use json from body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectMongoDB();
});
