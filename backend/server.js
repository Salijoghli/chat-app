import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectMongoDB } from "./db/connectMongoDB.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

//use env variables
dotenv.config();

const PORT = process.env.PORT || 3000;

//use json from body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

//error handling middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectMongoDB();
});
