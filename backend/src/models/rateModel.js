const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },
    cmt: { type: String, required: true },
    worldScene: {type: Number, default: 0},
    content:  {type: Number, default: 0},
    character:  {type: Number, default: 0},
  },
  {
    timestamps: true,
  }
);

const Rate = mongoose.model("Rate", rateSchema);
module.exports = Rate;
