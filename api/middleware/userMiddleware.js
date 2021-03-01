const users = require("../users/users-model");

function validateUserId() {
  return (req, res, next) => {
    users
      .getById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ msg: "User Not Found!" });
        }
        req.user = user;

        next();
      })
      .catch(next);
  };
}

function validateUser() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ msg: "Missing user data!" });
    } else if (!req.body.name) {
      return res.status(400).json({ msg: "Missing required name field!" });
    } else {
      return next();
    }
  };
}

// do not forget to expose these functions to other modules
module.exports = { validateUserId, validateUser };
