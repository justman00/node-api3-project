module.exports = (err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    msg: "Something went wrong. Please try again.",
  });
};
