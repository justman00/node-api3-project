const express = require("express");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const users = require("./users-model");
const posts = require("../posts/posts-model");
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
  users
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
  users
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
  users
    .update(req.params.id, req.body)
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch(next);
});

// RETURN THE FRESHLY DELETED USER OBJECT
// this needs a middleware to verify user id

router.delete("/:id", validateUserId(), (req, res, next) => {
  users
    .remove(req.params.id)
    .then((deletedUser) => {
      res.status(200).json(deletedUser);
    })
    .catch(next);
});

// RETURN THE ARRAY OF USER POSTS
// this needs a middleware to verify user id

router.get("/:id/posts", validateUserId(), (req, res, next) => {
  users
    .getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(next);
});

// RETURN THE NEWLY CREATED USER POST
// this needs a middleware to verify user id
// and another middleware to check that the request body is valid

router.post(
  "/:id/posts",
  validateUserId(),
  validatePost(),
  (req, res, next) => {
    posts
      .insert(req.body)
      .then((newPost) => {
        res.status(201).json(newPost);
      })
      .catch(next);
  }
);

// RETURN THE POST OBJECT
// this needs a middleware to verify user id
// this needs a middleware to verify post id

router.get(
  "/:id/posts/:postId",
  validateUserId(),
  validatePostId(),
  (req, res) => {
    console.log("request: ", req);
    res.status(200).json(req.post);
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
  (req, res, next) => {
    posts
      .update(req.params.id, req.body)
      .then((updatedPost) => {
        res.status(200).json(updatedPost);
      })
      .catch(next);
  }
);

// RETURN THE FRESHLY DELETED POST OBJECT
// this needs a middleware to verify user id
// this needs a middleware to verify post id

router.delete(
  "/:id/posts/:postId",
  validateUserId(),
  validatePostId(),
  (req, res, next) => {
    posts
      .remove(req.params.id)
      .then((deletedPost) => {
        res.status(200).json(deletedPost);
      })
      .catch(next);
  }
);

// do not forget to export the router
module.exports = router;
