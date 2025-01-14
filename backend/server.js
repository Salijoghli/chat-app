import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import usersRoutes from "./routes/users.route.js";
import friendRequestRoutes from "./routes/friendRequest.route.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectMongoDB } from "./db/connectMongoDB.js";

const app = express();

//use env variables
dotenv.config();

const PORT = process.env.PORT || 3000;

//allow cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH"],
  })
);

//use json from body
app.use(express.json({ limit: "5mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }, { limit: "5mb" }));

// It makes the cookies available in req.cookies
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/friends", friendRequestRoutes);

//error handling middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectMongoDB();
});
