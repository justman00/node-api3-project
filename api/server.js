require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.7j4py.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)

const {logger} = require('./middleware/middleware');

const usersRouter = require('./users/users-router');
const postsRouter = require('./posts/posts-router');

const server = express();

server.use(logger);
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

module.exports = server;
