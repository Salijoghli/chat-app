import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import usersRoutes from "./routes/users.route.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectMongoDB } from "./db/connectMongoDB.js";

const app = express();

//use env variables
dotenv.config();

const PORT = process.env.PORT || 3000;

//use json from body
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// It makes the cookies available in req.cookies
app.use(cookieParser());

//allow cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", usersRoutes);

//error handling middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectMongoDB();
});
