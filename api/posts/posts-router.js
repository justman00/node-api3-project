const express = require('express');
const {validatePostId} = require('./../middleware/postsMiddleware');
const postModel = require('./../posts/posts-model');

const router = express.Router();

router.get('/', (req, res) => {
    postModel.getAllPosts().then((posts) => {
        return res.status(200).json(posts)
    }).catch((error) => {
        return res.status(500).json({msg: 'Something went wrong'})
    })
})

router.get('/:postId', validatePostId(), (req, res) => {
    res.status(200).json(req.post);
})

module.exports = router;