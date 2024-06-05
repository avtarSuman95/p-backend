const User = require("./../db/users.js");

async function addUser(userModel) {
  let user = new User({
    ...userModel,
  });
  await user.save();
  return user.toObject();
}

async function getUsers() {
  let users = await User.find();
  return users.map((data) => data.toObject());
}

async function getUserById(id) {
  let user = await User.findById(id);
  return user.toObject();
}

async function updateUser(id, userModel) {
  let filter = { _id: id };
  await User.findByIdAndUpdate(filter, userModel);
}

async function deleteUser(id) {
  let filter = { _id: id };
  await User.findByIdAndDelete(filter);
}

module.exports = { addUser, getUsers, getUserById, updateUser, deleteUser };
