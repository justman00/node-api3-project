const express = require("express");
const { Post } = require("../posts/posts-mongo-model");
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

// const users = require("./users-model");
// const posts = require("../posts/posts-model");
const mongoUsers = require("./users-mongo-model");
const {
  validateUserId,
  validateUser,
} = require("../middleware/userMiddleware");

const {
  validatePostId,
  validatePost,
} = require("../middleware/postMiddleware");

const router = express.Router();

// RETURN AN ARRAY WITH ALL THE USERS

router.get("/", (req, res, next) => {
  mongoUsers
    .get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

// RETURN THE USER OBJECT
// this needs a middleware to verify user id

router.get("/:id", validateUserId(), (req, res, next) => {
  res.status(200).json(req.user);
});

// RETURN THE NEWLY CREATED USER OBJECT
// this needs a middleware to check that the request body is valid

router.post("/", validateUser(), (req, res, next) => {
  mongoUsers
    .insert(req.body)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

// RETURN THE FRESHLY UPDATED USER OBJECT
// this needs a middleware to verify user id
// and another middleware to check that the request body is valid

router.put("/:id", validateUser(), validateUserId(), (req, res, next) => {
  mongoUsers
    .update(req.params.id, req.body)
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch(next);
});

// RETURN THE FRESHLY DELETED USER OBJECT
// this needs a middleware to verify user id

router.delete("/:id", validateUserId(), (req, res, next) => {
  mongoUsers
    .remove(req.params.id)
    .then((deletedUser) => {
      res.status(200).json(deletedUser);
    })
    .catch(next);
});

// RETURN THE ARRAY OF POSTS
// this needs a middleware to verify user id

//it seems like a validation for empty postsArray could be added if(posts.length==0){msg:"You didn't post anything yet."}

router.get("/:id/posts", validateUserId(), (req, res, next) => {
  mongoUsers
    .getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(next);
});

// RETURN THE POST OBJECT FROM THE POSTS ARRAY OF PARTICULAR USER
// this needs a middleware to verify user id
// this needs a middleware to verify post id

router.get(
  "/:id/posts/:postId",
  validateUserId(),
  validatePostId(),
  (req, res, next) => {
    mongoUsers
      .getUserPost(req.params.id, req.params.postId)
      .then((post) => {
        res.status(200).json(post);
      })
      .catch(next);
  }
);

// RETURN THE FRESHLY UPDATED POST OBJECT
// this needs a middleware to verify user id
// this needs a middleware to verify that the request body is valid
// and another middleware to verify post id

router.put(
  "/:id/posts/:postId",
  validateUserId(),
  validatePost(),
  validatePostId(),
  async (req, res, next) => {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      req.body
    ).exec();
    res.status(200).json(updatedPost);
  }
);

// RETURN THE FRESHLY DELETED POST OBJECT
// this needs a middleware to verify user id
// this needs a middleware to verify post id

router.delete(
  "/:id/posts/:postId",
  validateUserId(),
  validatePostId(),
  async (req, res, next) => {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId).exec();
    res.status(200).json(deletedPost);
  }
);

// RETURN THE NEWLY CREATED POST OBJECT
// this needs a middleware to verify user id
// this needs a middleware to check that the request body is valid

router.post(
  "/:id/posts",
  validateUserId(),
  validatePost(),
  async (req, res, next) => {
    const newPost = await new Post({
      ...req.body,
      user: req.params.id,
    }).save();
    res.status(201).json(newPost);
  }
);

// do not forget to export the router
module.exports = router;
