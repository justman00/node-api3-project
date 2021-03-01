const express = require("express");

const posts = require("../posts/posts-model");

const { validatePostId } = require("../middleware/postMiddleware");

const router = express.Router();

// RETURN AN ARRAY WITH ALL THE POSTS

router.get("/api/posts", (req, res, next) => {
  posts
    .get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(next);
});

// RETURN THE POST OBJECT
// this needs a middleware to verify post id

router.get("api/posts/:postId", validatePostId(), (req, res, next) => {
  res.status(200).json(req.post);
});
