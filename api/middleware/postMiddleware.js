const posts = require("../posts/posts-model");

function validatePostId() {
  return (req, res, next) => {
    posts
      .getById(req.params.postId)
      .then((post) => {
        if (!post) {
          return res.status(404).json({ msg: "Post Not Found!" });
        }
        req.post = post;

        next();
      })
      .catch(next);
  };
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ msg: "Missing post data!" });
    } else if (!req.body.text) {
      return res.status(400).json({ msg: "Missing required text field!" });
    } else {
      return next();
    }
  };
}

module.exports = { validatePost, validatePostId };
