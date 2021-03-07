if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
console.log(process.env.NODE_ENV);
console.log(process.env.MONGO_DB_USERNAME, process.env.MONGO_DB_PASSWORD);

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@stepit-cluster.v8xqd.mongodb.net/Blog?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected!!");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};
connectDB();

const logger = require("./middleware/loggerMiddleware");
const error = require("./middleware/errorMiddleware");
const welcomeRouter = require("./welcome/welcome-router");
const usersRouter = require("./users/users-router");
const postsRouter = require("./posts/posts-router");
const server = express();

server.use(logger("combined"));
server.use(express.json());
server.use(welcomeRouter);
server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);
server.use(error);

module.exports = server;
