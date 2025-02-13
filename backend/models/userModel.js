const mongoose = require("mongoose");
const bycryt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  totalBlogs: {
    type: Number,
    default: 0,
  },
  bio: {
    type: String,
    maxlength: 500,
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
