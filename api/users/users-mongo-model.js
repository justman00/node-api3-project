const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

const get = () => {
  return User.find().exec();
};

const insert = (user) => {
  return new User(user).save();
};

const getById = (userId) => {
  return User.findById(userId).exec();
};

const remove = (userId) => {
  return User.findOneAndDelete({ _id: userId }).exec();
};

const update = (userId, updatedUser) => {
  return User.findByIdAndUpdate(userId, updatedUser).exec();
};

module.exports = {
  get,
  insert,
  getById,
  remove,
  update,
};
