const express = require("express");

const router = express.Router();
console.log(process.env.CHALLENGE);

router.get("/", (req, res) => {
  res.status(200).json({ message: `Welcome to ${process.env.CHALLENGE}` });
});

module.exports = router;
