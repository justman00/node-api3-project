const mongoose = require('mongoose');

// Linking
const postsSchema = new mongoose.Schema({
  text:{
    type:String,
    required: true,
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Posts = mongoose.model('Posts', postsSchema);

module.exports =  Posts;
