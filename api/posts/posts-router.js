const express = require("express");

const posts = require("../posts/posts-model");

const { validatePostId } = require("../middleware/postMiddleware");

const router = express.Router();

// RETURN AN ARRAY WITH ALL THE POSTS

router.get("/", (req, res, next) => {
  posts
    .get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(next);
});

// RETURN THE POST OBJECT
// this needs a middleware to verify post id

router.get("/:postId", validatePostId(), (req, res, next) => {
  res.status(200).json(req.post);
});

module.exports= router;