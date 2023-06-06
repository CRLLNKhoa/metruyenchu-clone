const Author = require("../models/authorModel");
const Story = require("../models/storyModel");
const Comment = require("../models/commentModel");

const createComment = (newCmt) => {
  const { userId, storyId, cmt, chapterNo } = newCmt;
  return new Promise(async (resolve, reject) => {
    try {
      const created = await Comment.create({
        userId,
        storyId,
        cmt,
        chapterNo,
      });
      const cmtOfStory = Story.findById(storyId);
      await cmtOfStory.updateOne({ $push: { comments: created._id } });
      resolve({
        status: "OK",
        message: "Thêm bình luận thành công!",
        data: created,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const replayComment = (id,newCmt) => {
  const { userId, cmt } = newCmt;
  return new Promise(async (resolve, reject) => {
    try {
      const cmts = await Comment.findByIdAndUpdate(
        id,
        { $push: { replay: { userId: userId, cmt: cmt} } },
        { new: true }
      );
      resolve({
        status: "OK",
        message: "Thêm bình luận thành công!",
        data: cmts,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getComment = (storyId, limit = 6) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cmts = await Comment.find({
        storyId: storyId,
      })
        .populate("userId", "displayName avatar").populate("replay.userId","displayName avatar")
        .sort({ createdAt: "desc" }).sort({"replay.updatedAt": "desc"})
        .limit(limit);
      const total = await Comment.find({
        storyId: storyId,
      }).count();
      resolve({
        status: "OK",
        message: "Lấy bình luận thành công!",
        data: cmts,
        total: total,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const like = (id, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cmts = await Comment.findByIdAndUpdate(
        id,
        { $addToSet: { liked: userId } },
        { new: true }
      );
      resolve({
        status: "OK",
        message: "Thích thành công!",
        data: cmts,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const unlike = (id, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cmts = await Comment.findByIdAndUpdate(
        id,
        { $pull: { liked: userId } },
        { new: true }
      );
      resolve({
        status: "OK",
        message: "Bỏ thích thành công!",
        data: cmts,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createComment,
  getComment,
  like,
  unlike,
  replayComment,
};
