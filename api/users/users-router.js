const express = require("express");
// const users = require("../users/users-model");
const Users = require("../users/user-model-mongo");
// const posts = require("../posts/posts-model");
const Posts = require("../posts/posts-model-mongo");
const middleware = require("../middleware/middleware");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get("/", async (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  /* Nr.1 */
  // users
  //   .get()
  //   .then((user) => {
  //     res.status(200).json(user);
  //   })
  //   .catch(next);
  /* Nr.2 */
  Users.find()
    .exec()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get("/:id", middleware.validateUserId, async (req, res, next) => {
  // this needs a middleware to verify user id
  // RETURN THE USER OBJECT
  /* Nr.1*/
  // res.status(200).json(req.user);
  /*Nr.2*/
  Users.findById(req.params.userId)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.post("/", middleware.validateUser, async (req, res, next) => {
  // this needs a middleware to check that the request body is valid
  // RETURN THE NEWLY CREATED USER OBJECT
  /* Nr.1*/
  // users.insert(req.body).then((user) => {
  //   res.status(200).json(user);
  // });

  const newUser = req.body;

  /*Nr.2*/
  new Users(newUser).save().then((user) => {
    res.json(user);
  });
});

router.put(
  "/:id",
  middleware.validateUserId,
  middleware.validateUser,
  async (req, res, next) => {
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    /* Nr.1*/
    //   users
    //     .update(req.params.id, req.body)
    //     .then((user) => {
    //       res.status(200).json(user);
    //     })
    //     .catch(next);
    // }

    /*Nr.2*/

    Users.findByIdAndUpdate(req.params.id, req.body)
      .exec()
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(next);
  }
);

router.delete("/:id", middleware.validateUserId, async (req, res, next) => {
  // this needs a middleware to verify user id
  // RETURN THE FRESHLY DELETED USER OBJECT
  /*Nr.1*/
  // users
  //   .remove(req.params.id)
  //   .then((user) => {
  //     res.status(200).json(user);
  //   })
  //   .catch(next);

  /*Nr.2*/

  Users.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.get("/:id/posts", middleware.validateUserId, async (req, res, next) => {
  // this needs a middleware to verify user id
  // RETURN THE ARRAY OF USER POSTS

  /*Nr.1*/
  // users
  //   .getUserPosts(req.params.id)
  //   .then((posts) => {
  //     res.status(200).json(posts);
  //   })
  //   .catch(next);

  /*Nr.2*/
  Posts.find({userId:req.params.id})
    .populate("userId")
    .then((userPost) => {
      res.status(200).json(userPost);
    })
    .catch(next);
});

router.post(
  "/:id/posts",
  middleware.validateUserId,
  middleware.validatePost,
  async (req, res, next) => {
    // this needs a middleware to verify user id
    // RETURN THE NEWLY CREATED USER POST
    // and another middleware to check that the request body is valid
    /*Nr.1*/
    //   posts.insert(req.body).then((post) => {
    //     res.status(200).json(post);
    //   });
    // }

    /*Nr.2*/

    // const newPost =  await req.body;

    // console.error('SAAAAAAAALUT',req.body);

    new Posts(req.body)
      .save()
      .then((post) => {
        res.status(200).json(post);
      })
      .catch(next);
  }
);

// do not forget to export the router
module.exports = router;
