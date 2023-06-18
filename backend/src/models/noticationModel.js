const mongoose = require("mongoose");

const noticSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    userId: [
      {
        type: String,
      },
    ],
    desc: { type: String },
    link: { type: String },
    thumbnail: { type: String },
  },
  {
    timestamps: true,
  }
);

const Notic = mongoose.model("Notic", noticSchema);
module.exports = Notic;
