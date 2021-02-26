const logger = (req, res, next) => {
  // DO YOUR MAGIC
  const date = new Date().toISOString();
  console.info(`Date - ${date}   Method - ${req.method}   Url - ${req.path}`);
  next();
}

const validateUserId = () => (req, res, next) => {
  // DO YOUR MAGIC
}

const validateUser = () => (req, res, next) => {
  // DO YOUR MAGIC
}

const validatePost = () => (req, res, next) => {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
