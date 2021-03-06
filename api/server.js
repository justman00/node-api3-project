require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = async () => {
  try {
    await connectDB();
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.7j4py.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected!!");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};
//connectDB();

const { logger } = require("./middleware/middleware");

const usersRouter = require("./users/users-router");
const postsRouter = require("./posts/posts-router");

const server = express();
server.use(cors());

server.use(logger);
server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);

module.exports = server;
