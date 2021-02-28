function logger(type) {
  return (req, res, next) => {
    const date = new Date().toISOString();

    switch (type) {
      case "small":
        console.info(
          `Date - ${date}, method: ${req.method}, path - ${req.path}`
        );
        break;
      case "combined":
        const userAgent = req.headers["user-agent"];
        console.info(
          `Date - ${date}, method: ${req.method}, path - ${req.path}, user Agent - ${userAgent}, ip address: ${req.ip}`
        );
        break;
    }
    next();
  };
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = { logger };
