require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {logger} = require('./middleware/middleware');

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@my-first-cluster.gdyz9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{useNewUrlParser: true}
);

const server = express();

server.use(express.json())
const usersRouter = require('./users/users-router');
server.use('/api/users', usersRouter);

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.use(logger('small'));
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
