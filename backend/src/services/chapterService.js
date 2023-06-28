const Author = require("../models/authorModel");
const Chapter = require("../models/chapterModel");
const Story = require("../models/storyModel");
const Notic = require("../models/noticationModel");

const createChapter = (newChapter) => {
  const { title, content, storyId, chapterNo } = newChapter;
  return new Promise(async (resolve, reject) => {
    try {
      const chapterOfStory = await Story.findById(storyId).populate("userId","avatar");
      const created = await Chapter.create({
        title,
        content,
        storyId,
        chapterNo: chapterOfStory.chapter.length + 1,
      });
      await chapterOfStory.updateOne({ $push: { chapter: created._id } });
      await chapterOfStory.updateOne({ $push: { quantityChapter: chapterOfStory.chapter.length } });
      await Notic.create({
        title: `Truyện mà bạn đã theo dõi đã cập nhật chương mới!`,
        desc: `Truyện "${chapterOfStory.title}" đã ra chương ${created.chapterNo} mau mau đến đọc thôi!`,
        userId: chapterOfStory.liked,
        link: `/chuong/${chapterOfStory._id}/${created.chapterNo}`,
        thumbnail: chapterOfStory.userId.avatar
      })
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
          .sort(objSort)
          .populate({
            path: "storyId",
            populate: {
              path: "userId",
            },
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
        .sort({ name: "asc" })
        .populate("storyId", "title genre userId.author");
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

const getAllByStory = (limit = 10, page = 0, sort, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalUser = await Chapter.count({
        storyId: id,
      });
      if (sort) {
        const objSort = {};
        objSort[sort[1]] = sort[0];
        const allUserSort = await Chapter.find({
          storyId: id,
        })
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
      const allUser = await Chapter.find({
        storyId: id,
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
      await Story.updateMany({ chapter: id }, { $pull: { chapter: id } });
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

const getChapter = (idStory, no = 1) => {
  return new Promise(async (resolve, reject) => {
    try {
      const chapter = await Chapter.findOne({
        storyId: idStory,
        chapterNo: no,
      }).populate({path: "storyId",populate: {path: "userId",select: "displayName"},select: "title"});
      const totalChapter = await Chapter.find({
        storyId: idStory,
      }).count();
      if (chapter === null) {
        resolve({
          status: "ERR",
          message: "Tập truyện không tồn tại!",
        });
      }
      const prevChapter = () => {
        if (chapter.chapterNo === 1) {
          return {link:`/chuong/${idStory}/1`,hidden: true};
        } else return {link: `/chuong/${idStory}/${chapter.chapterNo - 1}`,hidden: false};
      };
      const nextChapter = () => {
        if (chapter.chapterNo === totalChapter) {
          return {link: `/chuong/${idStory}/${totalChapter}`,hidden: true};
        } else return {link: `/chuong/${idStory}/${chapter.chapterNo + 1}`,hidden: false};
      };
      resolve({
        status: "OK",
        message: "Lấy thông tin thành công!",
        data: chapter,
        next: nextChapter(),
        prev: prevChapter(),
        length: chapter.content.length
         });
    } catch (e) {
      reject(e);
    }
  });
};

const getChapterEdit = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const chapter = await Chapter.findOne({
        _id: id
      }).populate({path: "storyId",populate: {path: "userId",select: "displayName"},select: "title"});
      resolve({
        status: "OK",
        message: "Lấy thông tin thành công!",
        data: chapter,
         });
    } catch (e) {
      reject(e);
    }
  });
};

const view = (id) => {
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
      const updateUser = await Chapter.findByIdAndUpdate(id, {view: checkUser.view + 1}, {
        new: true,
      });
      const viewStory = await Story.findByIdAndUpdate(updateUser.storyId, {view: checkUser.view + 1}, {
        new: true,
      })
      if(viewStory.chapter_readed <= updateUser.chapterNo){
        const viewStorys = await Story.findByIdAndUpdate(updateUser.storyId, {chapter_readed: updateUser.chapterNo}, {
          new: true,
        })
      }
      resolve({
        status: "OK"
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
  getChapter,getChapterEdit,view
};
