require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { logger } = require('./middleware/middleware');
const usersRouter = require('./users/users-router');
const postsRouter = require('./posts/posts-router');

mongoose.Promise = global.Promise;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@stepit-cluster.cbszf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
    console.log('MongoDB connected!!');
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
  }
};
connectDB();

const server = express();
server.use(cors());

server.use(logger);
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

module.exports = server;
