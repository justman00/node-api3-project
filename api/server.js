const express = require("express");
// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here
const logger = require("./middleware/loggerMiddleware");
const error = require("./middleware/errorMiddleware");
const usersRouter = require("./users/users-router");
const postsRouter = require("./posts/posts-router");

const server = express();

server.use(logger("combined"));
server.use(express.json());
server.use(usersRouter);
server.use(postsRouter);

server.use(error);

module.exports = server;
