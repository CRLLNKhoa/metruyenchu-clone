const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    thumbnail: {type: String,default: "https://static.cdnno.com/poster/day-bygones/300.jpg?1683542627"},
    view: { type: Number, default: 0 },
    chapter_readed: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
    genre: { type: String, ref: "Genre" },
    originalLook: { type: String },
    character: { type: String }, 
    worldScene: { type: String },
    progress: {type:String,default: "Chưa hoàn thành"},
    sect: { type: String },
    isComplete: { type: Boolean, default: false },
    recommended: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    liked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    chapter: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
    quantityChapter: {type: Number,default: 0}, 
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    author: {type: String},
    rating: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rate" }],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model("Story", storySchema);
module.exports = Story;
