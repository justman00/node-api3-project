const users = require("../users/users-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
  const date = new Date().toISOString();
  const userAgent = req.headers["user-agent"];
  console.info(
    `Date = ${date} | path = ${req.path} | ip = ${req.ip} | client = ${userAgent} | method = ${req.method}`
  );
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  users.getById(req.params.id).then((user) => {
    if (!user) {
      return res.status(400).json({ message: "Not found user" });
    }
    req.user = user;
    next();
  });
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ message: "Missing name and email " });
  }
  next();
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.text) {
    return res.status(400).json({ message: "Missing text" });
  }

  next();
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
