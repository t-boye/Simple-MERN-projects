const mongoose = require("mongoose");

// Define a schema for the user
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

// Define a model for the user
const User = mongoose.model("User", UserSchema);
module.exports = User;
