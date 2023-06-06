const Story = require("../models/storyModel");
const Author = require("../models/authorModel");
const Genre = require("../models/genreModel");
const User = require("../models/userModel");

const createStory = (newStory) => {
  return new Promise(async (resolve, reject) => {
    const {
      title,
      description,
      genre,
      originalLook,
      idUser,
      sect,
      worldScene,
      character,
    } = newStory;
    try {
      const checkGenre = await Story.findOne({
        title: title,
      });
      if (checkGenre !== null) {
        resolve({
          status: "ERR",
          message: "Truyện đã tồn tại!",
        });
      }
      if (checkGenre === null) {
        const created = await Story.create({
          title,
          description,
          genre: genre,
          originalLook,
          userId: idUser,
          sect,
          worldScene,
          character,
        });
        const userId = User.findById(idUser);
        const genreId = Genre.findOne({ titlle: genre });
        await userId.updateOne({ $push: { storyWritten: created._id } });
        await genreId.updateOne({ $push: { stories: created._id } });
        resolve({
          status: "OK",
          message: "Thêm truyện thành công!",
          data: created,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const   getall = (limit = 10, page = 0, sort) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalUser = await Story.count();
      if (sort) {
        const objSort = {};
        objSort[sort[1]] = sort[0];
        console.log(objSort)
        const allUserSort = await Story.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objSort).populate("userId");
        resolve({
          status: "OK",
          message: "Lấy danh sách truyện dùng thành công!",
          data: allUserSort,
          totalStory: totalUser,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalUser / limit),
        });
      }
      const allUser = await Story.find()
        .limit(limit)
        .skip(page * limit)
        .sort({ title: "asc" }).populate('userId',"displayName");
      resolve({
        status: "OK",
        message: "Lấy danh sách truyện thành công!",
        data: allUser,
        totalStory: totalUser,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalUser / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllAuthor = (limit = 100, page = 0, sort, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalUser = await Story.count();
      if (sort) {
        const objSort = {};
        objSort[sort[1]] = sort[0];
        const allUserSort = await Story.find({
          userId: id,
        })
          .limit(limit)
          .skip(page * limit)
          .sort(objSort);
        resolve({
          status: "OK",
          message: "Lấy danh sách truyện dùng thành công!",
          data: allUserSort,
          totalStory: totalUser,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalUser / limit),
        });
      }
      const allUser = await Story.find()
        .limit(limit)
        .skip(page * limit)
        .sort({ title: "asc" });
      resolve({
        status: "OK",
        message: "Lấy danh sách người dùng thành công!",
        data: allUser,
        totalStory: totalUser,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalUser / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const story = await Story.findOne({
        _id: id,
      }).populate("chapter","title _id createdAt").populate("userId","avatar displayName storyWritten");
      if (story === null) {
        resolve({
          status: "OK",
          message: "Truyện không tồn tại!",
        });
      }
      resolve({
        status: "OK",
        message: "Lấy thông tin truyện thành công!",
        data: story,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteStory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkStory = await Story.findOne({
        _id: id,
      });
      if (checkStory === null) {
        resolve({
          status: "OK",
          message: "Truyện không tồn tại!",
        });
      }
      const deleteStory = await Story.findByIdAndDelete(id);
      await Genre.updateMany({ stories: id }, { $pull: { stories: id } });
      // await Author.updateMany({stories:id},{$pull: {stories:id}})
      await User.updateMany({ $pull: { storyWritten: id } });
      resolve({
        status: "OK",
        message: "Xóa truyện thành công!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateStory = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await Story.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "Truyện không tồn tại!",
        });
      }
      const updateUser = await Story.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "OK",
        message: "Cập nhật thành công!",
        data: updateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createStory,
  getall,
  getDetail,
  deleteStory,
  updateStory,
  getAllAuthor,
};
