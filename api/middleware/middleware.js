const users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  const date = new Date().toISOString();
  if(type === 'small'){
    return console.info(
      `Date - ${date}, method: ${req.method}, path - ${req.path}`
    );
  }
  else if(type === 'combined'){
    const userAgent = req.headers['user-agent'];
    return console.info(
      `Date - ${date}, method: ${req.method}, path - ${req.path}, user agent - ${userAgent}, ip address: ${req.ip}`
    );
  }
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
   users
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: 'No user found' });
      }
      req.user = user;
      next();
    })
    .catch(next);
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({
      message: 'Missing user name or age',
    });
  } else {
      return next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  validateUser,
  logger,
  validateUserId
};