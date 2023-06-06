const Author = require("../models/authorModel");
const Chapter = require("../models/chapterModel");
const Story = require("../models/storyModel");

const createChapter = (newChapter) => {
  const { title, content, storyId, chapterNo } = newChapter;
  return new Promise(async (resolve, reject) => {
    try {
      const chapterOfStory = await Story.findById(storyId);
      const created = await Chapter.create({
        title,
        content,
        storyId,
        chapterNo: chapterOfStory.chapter.length + 1,
      });
      await chapterOfStory.updateOne({ $push: { chapter: created._id } });
      resolve({
        status: "OK",
        message: "Thêm tập truyện thành công!",
        data: created,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = (limit = 10, page = 0, sort) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalUser = await Chapter.count();
      if (sort) {
        const objSort = {};
        objSort[sort[1]] = sort[0];
        const allUserSort = await Chapter.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objSort).populate({
            path: "storyId",
            populate: {
               path: "userId" 
            }
         });
        resolve({
          status: "OK",
          message: "Lấy danh sách tập truyện thành công!",
          data: allUserSort,
          totalChapter: totalUser,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalUser / limit),
        });
      }
      const allUser = await Chapter.find()
        .limit(limit)
        .skip(page * limit)
        .sort({ name: "asc" }).populate("storyId","title genre userId.author");
      resolve({
        status: "OK",
        message: "Lấy danh sách tập truyện thành công!",
        data: allUser,
        totalChapter: totalUser,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalUser / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllByStory = (limit = 10, page = 0, sort,id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const totalUser = await Chapter.count( {
            storyId: id
        });
        if (sort) {
          const objSort = {};
          objSort[sort[1]] = sort[0];
          const allUserSort = await Chapter.find(
            {
                storyId: id
            }
          )
            .limit(limit)
            .skip(page * limit)
            .sort(objSort);
          resolve({
            status: "OK",
            message: "Lấy danh sách tập truyện thành công!",
            data: allUserSort,
            totalChapter: totalUser,
            pageCurrent: Number(page + 1),
            totalPage: Math.ceil(totalUser / limit),
          });
        }
        const allUser = await Chapter.find( {
            storyId: id
        })
          .limit(limit)
          .skip(page * limit)
          .sort({ name: "asc" });
        resolve({
          status: "OK",
          message: "Lấy danh sách tập truyện thành công!",
          data: allUser,
          totalChapter: totalUser,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalUser / limit),
        });
      } catch (e) {
        reject(e);
      }
    });
  };

const deleteChapter = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await Chapter.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "Tập truyện không tồn tại!",
        });
      }
      await Chapter.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Xóa tập truyện thành công!",
      });
      await Story.updateMany({chapter:id},{$pull: {chapter:id}})  
    } catch (e) {
      reject(e);
    }
  });
};

const updateChapter = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await Chapter.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "Tập truyện không tồn tại!",
        });
      }
      const updateUser = await Chapter.findByIdAndUpdate(id, data, {
        new: true,
      });
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

const getChapter = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await Chapter.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "Tập truyện không tồn tại!",
        });
      }
      resolve({
        status: "OK",
        message: "Lấy thông tin thành công!",
        data: checkUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createChapter,
  getAll,
  getAllByStory,
  deleteChapter,
  updateChapter,
  getChapter
};
