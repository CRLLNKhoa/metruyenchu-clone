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
    content: { type: String, required: true },
    figureRate: {type: Number, default: 0},
    contentRate:  {type: Number, default: 0},
    worldLayoutRate:  {type: Number, default: 0},
  },
  {
    timestamps: true,
  }
);

const Rate = mongoose.model("Rate", rateSchema);
module.exports = Rate;
