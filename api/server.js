require("dotenv").config();
const express = require("express");
const middleware = require("./middleware/middleware");
const routerUsers = require("./users/users-router");
const mongoose = require("mongoose");
const server = express();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zxvho.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);
server.use(express.json());
server.use("/api/users", routerUsers);
// remember express by default cannot parse JSON in request bodies

server.use(middleware.logger);
server.use(middleware.error);

// global middlewares and the user's router need to be connected here

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
