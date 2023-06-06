const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    stories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story"
    },
  },
  {
    timestamps: true,
  }
);

const Genre = mongoose.model("Genre", genreSchema);
module.exports = Genre;
