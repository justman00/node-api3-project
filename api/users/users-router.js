const express = require('express');
const {validateUserId, validateUser} = require('./../middleware/middleware');
const {validatePost, validatePostId} = require('./../middleware/postsMiddleware');
const userModel = require('./users-model');
const postModel = require('./../posts/posts-model');

const router = express.Router();

router.get('/', (req, res) => {
  userModel.get().then((users) => {
    res.status(200).json(users)
  }).catch((error) => {
    console.log('Error ',error)
    res.status(500).json({
      msg: 'Something went wrong'
    })
  })

});

router.get('/:id', validateUserId(), (req, res) => {
     res.status(200).json(req.user);
});

router.post('/', express.json(), validateUser(), (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  userModel.insertUser(req.body).then((addedUser) => {
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
  userModel.updateUser(req.params.id, req.body).then(() => {
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
  userModel.removeUser(req.user.id).then((removed) => {
      return res.status(201).json(removed)
  }).catch((error) => {
    res.status(500).json({msg: 'Something went wrong'})
  })
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  postModel.getByUser(req.params.id).then((posts) => {
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

router.get('/:userId/posts/:postId', validatePostId(), (req, res) => {
  res.status(200).json(req.post);
})

router.delete('/:userId/posts/:postId/delete', validatePostId(), (req, res) => {
    postModel.remove( req.params.userId ,req.params.postId).then((deletedPost) => {
      return res.status(201).json(deletedPost)
    }).catch((error) => {
      return res.status(500).json({msg: 'Something went wrong'})
    })
})

router.put('/:userId/posts/:postId/edit', validatePostId(), express.json(), validatePost(), (req, res) => {
  postModel.update(req.params.postId, req.body).then(() => {
    return res.status(201).json({
      id: req.params.id,
      text: req.body.text
    })
 })
})

// do not forget to export the router
module.exports = router;
