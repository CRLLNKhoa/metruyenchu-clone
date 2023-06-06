const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String},
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "https://static.cdnno.com/user/default/200.jpg",
    },
    displayName: { type: String, default: "Người dùng mới" },
    birthyear: { type: Number },
    isAdmin: { type: Boolean, default: false, required: true },
    role: { type: Number, default: 0 },
    sex: { type: Number, default: 3 },
    exp: { type: Number, default: 0 },
    seenChapter: { type: Number, default: 0 },
    seenStory: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      }],
    recommendedStory: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      }],
    favoriteStories: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      }],
    savedStory: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      }],
    asset: {
      candy: {
        quantity: { type: Number, default: 0 },
      },
      flower: {
        quantity: { type: Number, default: 0 },
      }
    },
    vip: {
        status: {type: Boolean, default: false},
        exp: {type: Number}
    },
    storyWritten: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      }],
    status: {type: Boolean, default: true}
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
