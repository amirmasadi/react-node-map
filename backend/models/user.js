const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, min: 4, max: 15 },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
