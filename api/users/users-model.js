const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    }
  ]
});

const Users = mongoose.model("Users", userSchema);

const get = () => {
  return Users.find().exec();
};

const getById = (userId) => {
  return Users.findById(userId).exec();
};

const insertUser = (user) => {
  const userToAdd = new Users(user);
  return userToAdd.save();
};

const updateUser = (id, change) => {
  return Users.findByIdAndUpdate(id, change).exec();
};

const removeUser = (id) => {
  return Users.findByIdAndDelete(id).exec();
};

module.exports = {
  get,
  getById,
  insertUser,
  updateUser,
  removeUser
};
