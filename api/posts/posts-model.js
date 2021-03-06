const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }
})

const Posts = mongoose.model('Posts', postSchema);

const insert = (post) => {
  const newPost = new Posts(post);
  return newPost.save();
}

const getByUser = (userId) => {
  return Posts.find({user_id: userId}).exec();
}

const getById = (postId) => {
  return Posts.findOne({_id: postId}).exec();
}

const getAllPosts = () => {
  return Posts.find().exec();
}

const remove = (userId, postId) => {
  return Posts.findByIdAndDelete(postId).where({user_id: userId}).exec();
}

const update = (postId, newPost) => {
  return Posts.findByIdAndUpdate(postId, newPost).exec();
}

module.exports = {insert, getByUser, getById, getAllPosts, remove, update, Posts}