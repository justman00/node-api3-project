const express = require('express');
const validatePostId = require('./../middleware/postsMiddleware');
const postModel = require('./../posts/posts-model');

const router = express.Router();

module.exports = router;