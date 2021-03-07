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

const insert = (post) => {
  return new Post(post).save();
};

const getById = (postId) => {
  return Post.findById(postId).exec();
};

const remove = (postId) => {
  return Post.findOneAndDelete({ _id: postId }).exec();
};

const update = (postId, updatedPost) => {
  return Post.findByIdAndUpdate(postId, updatedPost).exec();
};

module.exports = { get, insert, getById, remove, update, Post };
