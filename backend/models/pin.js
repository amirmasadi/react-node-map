const mongoose = require("mongoose");

const pinSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    createdBy: { type: String, require: true },
    desc: { type: String, require: true },
    lat: { type: Number, require: true },
    long: { type: Number, require: true },
    rate: { type: Number, require: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

const Pin = new mongoose.model("mark", pinSchema);

module.exports = Pin;
