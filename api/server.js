const express = require("express");
// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here
const usersRouter = require("./users/users-router");
const { logger } = require("./middleware/middleware");
const server = express();

server.use(express.json());
server.use(logger("combined"));
server.use(usersRouter);

module.exports = server;
