const express = require("express");
const users = require("../users/users-model");
const posts = require("../posts/posts-model");
const middleware = require("../middleware/middleware");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get("/", (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  users
    .get()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(400).json("Ops, something happened");
    });
});

router.get("/:id", middleware.validateUserId(), (req, res) => {
  // this needs a middleware to verify user id
  // RETURN THE USER OBJECT
  res.status(200).json(req.user);
});

router.post("/", middleware.validateUser(), (req, res) => {
  // this needs a middleware to check that the request body is valid
  // RETURN THE NEWLY CREATED USER OBJECT
  users.insert(req.body).then((user) => {
    res.status(200).json(user);
  });
});

router.put(
  "/:id",
  middleware.validateUserId(),
  middleware.validateUser(),
  (req, res) => {
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    users.update(req.params.id, req.body).then((user) => {
      res.status(200).json(user);
    });
  }
);

router.delete("/:id", middleware.validateUserId(), (req, res) => {
  // this needs a middleware to verify user id
  // RETURN THE FRESHLY DELETED USER OBJECT
  users.remove(req.params.id).then((user) => {
    res.status(200).json(user);
  });
});

router.get("/:id/posts", middleware.validateUserId(), (req, res) => {
  // this needs a middleware to verify user id
  // RETURN THE ARRAY OF USER POSTS
  users.getUserPosts(req.params.id).then((posts) => {
    res.status(200).json(posts);
  });
});

router.post(
  "/:id/posts",
  middleware.validateUserId(),
  middleware.validatePost(),
  (req, res) => {
    // this needs a middleware to verify user id
    // RETURN THE NEWLY CREATED USER POST
    // and another middleware to check that the request body is valid
    posts.insert(req.body).then((post) => {
      res.status(200).json(post);
    });
  }
);

// do not forget to export the router
module.exports = router;