const express = require("express");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const users = require("./users-model");
const posts = require("../posts/posts-model");
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const router = express.Router();

// RETURN AN ARRAY WITH ALL THE USERS

router.get("/api/users", (req, res, next) => {
  users
    .get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// RETURN THE USER OBJECT
// this needs a middleware to verify user id

router.get("api/users/:id", (req, res) => {
  users
    .getById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ msg: "Not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put("/:id", (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id", (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get("/:id/posts", (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
