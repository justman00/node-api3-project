require('dotenv').config();
const express = require("express");
const middleware = require('./middleware/middleware')
const routerUsers = require('./users/users-router');
const server = express();


// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(middleware.logger());

// global middlewares and the user's router need to be connected here
server.use('/api/users',routerUsers);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
