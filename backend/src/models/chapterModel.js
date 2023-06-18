const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    storyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },
    content: { type: String, required: true },
    chapterNo: { type: Number },
    view: { type: Number, default: 0 },
    like: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Story" },
        type: {type: Number}
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chapter = mongoose.model("Chapter", chapterSchema);
module.exports = Chapter;
