const express = require('express');
const  User  = require('./users-model');
const Posts = require('../posts/posts-model')
const { validateUser,validateUserId,validatePost} = require('../middleware/middleware');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.find(req.query).then((users) =>{
    res.status(200).json(users);
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the users',
    });
  });
});

router.get('/:id',validateUserId, (req, res,next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the user',
      });
    });
});

router.post('/', validateUser,  (req, res,next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
 
  User.add(req.body)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: 'Error adding the user',
        });
      });
    
});

router.put('/:id',validateUserId,validateUser, (req, res,next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const changedUser = req.body;

  User.update(req.params.id, changedUser)
    .then((updatedUser) => {
      res.status(200).json({ updatedUser });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.delete('/:id',validateUserId, (req, res,next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  User.remove(req.params.id)
    .then((deleteduser) => {
      res.status(200).json({ deleteduser });
    })
    .catch((err) => {
      // Internal server error
      res.status(500).json({ message: err });
    });
});

router.get('/:id/:postId/posts',validateUserId,async (req, res,next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const foundUser = await User.findById( req.params.id ).catch((err) => {
    res.status(500).json({ message: err });
  });
  const posts = await Posts.find(
    { user_id: req.params.id ,_id: req.params.postId }
  ).exec().catch((err) => {
    res.status(500).json({ message: err });
  });
  console.log("hello")
  res.json({ foundUser, posts });
});


router.get('/:id/posts',async (req, res,next) => {
  Posts.findById(req.params.id)
  .then((post) => {
    if (post) {
      res.status(200).json({ post });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the Post',
    });
  });
});

router.post('/:id/posts',validatePost,validateUserId,async  (req, res,next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const addedPost = await new Posts({
    ...req.body,
    user_id: req.params.userId,
  }).save().catch((err) => {
    res.status(500).json({ message: err });
  });

  res.json(addedPost);
});

// do not forget to export the router
module.exports = router;