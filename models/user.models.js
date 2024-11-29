const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: String,
  facebookId: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  profilePicture: String,
  password: String,
});

module.exports = mongoose.model("User ", UserSchema);
