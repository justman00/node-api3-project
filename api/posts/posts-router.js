const express = require("express");

//const posts = require("../posts/posts-model");
const mongoPosts = require("../posts/posts-mongo-model");

const {
  validatePostId,
  validatePost,
} = require("../middleware/postMiddleware");

const router = express.Router();

// RETURN AN ARRAY WITH ALL THE POSTS

router.get("/", (req, res, next) => {
  mongoPosts
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

// RETURN THE NEWLY CREATED POST OBJECT
// this needs a middleware to check that the request body is valid

router.post("/", validatePost(), (req, res, next) => {
  mongoPosts
    .insert(req.body)
    .then((newPost) => {
      res.status(201).json(newPost);
    })
    .catch(next);
});

module.exports = router;
