const usersModel = require('./../users/users-model');

const logger = (req, res, next) => {
  // DO YOUR MAGIC
  const date = new Date().toISOString();
  console.info(`Date - ${date}   Method - ${req.method}   Url - ${req.path}`);
  next();
}

const validateUserId = () => (req, res, next) => {
  // DO YOUR MAGIC
  usersModel.getById(req.params.id).then((user) => {
     if(!user) {
        return res.status(404).json({
          msg: 'No user found'
        })
     }

     req.user = user;
     next();
  }).catch((error) => {
    return res.status(500).json({
      msg: 'Something went wrong'
    })
  })
}

const validateUser = () => (req, res, next) => {
  // DO YOUR MAGIC
  if(!req.body.name || req.body.name === ' ') {
      return res.status(400).json({
        msg: 'missing required name field'
      })
  }
  else
    return next();
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

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
