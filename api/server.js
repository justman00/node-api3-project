require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.Promise = global.Promise;

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0-shard-00-00.7j4py.mongodb.net:27017,cluster0-shard-00-01.7j4py.mongodb.net:27017,cluster0-shard-00-02.7j4py.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-il7y58-shard-0&authSource=admin&retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected!!");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};
connectDB();

const { logger } = require("./middleware/middleware");

const usersRouter = require("./users/users-router");
const postsRouter = require("./posts/posts-router");

const server = express();
server.use(cors());

server.use(logger);
server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);

module.exports = server;
