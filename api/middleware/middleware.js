// const users = require("../users/users-model");
const Users = require("../users/user-model-mongo");

const logger = (req, res, next) => {
  // DO YOUR MAGIC
  const date = new Date().toISOString();
  const userAgent = req.headers["user-agent"];
  console.info(
    `Date = ${date} | path = ${req.path} | ip = ${req.ip} | client = ${userAgent} | method = ${req.method}`
  );
  next();
};

const error = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Something went wrong. Please try again",
  });
};

const validateUserId = async (req, res, next) => {
  // DO YOUR MAGIC
  // users.getById({ userId: req.params.id }).then((user) => {
  //   if (!user) {
  //     return res.status(400).json({ message: "Not found user" });
  //   }
  //   req.user = user;
  //   next();
  // });

  Users.findById(req.params.id).then((user) => {
    if (!user) {
      return res.status(400).json({ message: "Not found user" });
    }
    req.user = user;
    next();
  });
};

const validateUser = async (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ message: "Missing name and email " });
  }
  next();
};

const validatePost = async (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.text) {
    return res.status(400).json({ message: "Missing text" });
  }

  next();
};

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  error,
};
