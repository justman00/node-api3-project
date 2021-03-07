const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);

const get = () => {
  return Post.find().exec();
};

const getById = (postId) => {
  return Post.findById(postId).exec();
};

module.exports = { get, getById, Post };
