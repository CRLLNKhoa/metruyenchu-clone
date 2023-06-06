const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    stories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story"
    },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
