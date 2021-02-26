const express = require('express');
const {validateUserId, validateUser, validatePost} = require('./../middleware/middleware');
const userModel = require('./users-model');
const postsModel = require('./../posts/posts-model');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  userModel.get().then((users) => {
    res.status(200).json(users)
  }).catch((error) => {
    res.status(500).json({
      msg: 'Something went wrong'
    })
  })

});

router.get('/:id', validateUserId(), (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
     res.status(200).json(req.user);
});

router.post('/', express.json(), validateUser(), (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  console.log(req.body.name)
  userModel.insert(req.body).then((addedUser) => {
    return res.status(201).json(addedUser);
  }).catch((error) => {
    return res.status(500).json({
      msg: 'Something went wrong'
    })
  })
});

router.put('/:id', validateUserId(), validateUser(), (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId(), (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
