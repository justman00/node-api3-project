const postModel = require('./../posts/posts-model');

const validatePostId = () => (req, res, next) => {
    postModel.getById(req.params.postId).then((post) => {
        if(!post) {
            return res.status(404).json({
                msg: 'no post found'
            })
        }
        else
        req.post = post
        next();
    }).catch((error) => {
        console.log(error)
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    })
}

const validatePost = () => (req, res, next) => {
    // DO YOUR MAGIC
    if(!req.body.text) {
      return res.status(400).json({
        msg: 'missing required text field'
      })
  }
  else
    return next();
  }

module.exports = {validatePostId, validatePost};