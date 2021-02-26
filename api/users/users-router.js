const express = require('express');
const {validateUserId, validateUser, validatePost} = require('./../middleware/middleware');
const validatePostId = require('./../middleware/postsMiddleware');
const userModel = require('./users-model');
const postModel = require('./../posts/posts-model');

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
  userModel.insert(req.body).then((addedUser) => {
    return res.status(201).json(addedUser);
  }).catch((error) => {
    return res.status(500).json({
      msg: 'Something went wrong'
    })
  })
});

router.put('/:id', validateUserId(), express.json(), validateUser(), (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  userModel.update(req.params.id, req.body).then(() => {
     return res.status(201).json({
       id: req.params.id,
       name: req.body.name
     })
  }).catch((error) => {
    return res.status(500).json({msg: 'Something went wrong'})
  })
});

router.delete('/:id', validateUserId(), (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  userModel.remove(req.user.id).then((removed) => {
      return res.status(201).json(removed)
  }).catch((error) => {
    res.status(500).json({msg: 'Something went wrong'})
  })
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  userModel.getUserPosts(req.params.id).then((posts) => {
    return res.status(200).json(posts)
  }).catch((error) => {
    return res.status(500).json({msg: 'Something went wrong'})
  })
});

router.post('/:id/posts', validateUserId(), express.json(), validatePost(), (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  postModel.insert(req.body).then((addedPost) => {
     return res.status(201).json(addedPost)
  }).catch((error) => {
    return res.status(500).json({
      msg: 'Something went wrong'
    })
  })
});

router.get('/:id/posts/:id', validatePostId(), (req, res) => {
  res.status(200).json(req.post);
})

router.delete('/:id/posts/:id', validatePostId(), (req, res) => {
    postModel.remove(req.params.id).then((deletedPost) => {
      return res.status(201).json(deletedPost)
    }).catch((error) => {
      return res.status(500).json({msg: 'Something went wrong'})
    })
})

router.put('/:id/posts/:id', validatePostId(), express.json(), validatePost(), (req, res) => {
  postModel.update(req.params.id, req.body).then(() => {
    return res.status(201).json({
      id: req.params.id,
      text: req.body.text
    })
 })
})

// do not forget to export the router
module.exports = router;
