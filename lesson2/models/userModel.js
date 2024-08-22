const mongoose = require("mongoose");

const Users = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: String,
});

module.exports = mongoose.model("users", Users);
