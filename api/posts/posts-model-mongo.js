const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
