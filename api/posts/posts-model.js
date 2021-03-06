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
  return Posts.findById(postId).exec();
}

module.exports = {insert, getByUser, getById, Posts}