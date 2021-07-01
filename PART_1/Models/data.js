const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
      unique: true,
    },
    Age: {
      type: Number,
      required: true,
      unique: true,
    },
  },
);

module.exports = mongoose.model("Data", dataSchema);
