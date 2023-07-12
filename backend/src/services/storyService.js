const Story = require("../models/storyModel");
const Author = require("../models/authorModel");
const Genre = require("../models/genreModel");
const User = require("../models/userModel");
const Chapter = require("../models/chapterModel");

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

const getall = (limit = 10, page = 0, sort) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalUser = await Story.count();
      if (sort) {
        const objSort = {};
        objSort[sort[1]] = sort[0];
        const allUserSort = await Story.find({published: true})
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
      const allUser = await Story.find({published: true})
        .limit(limit)
        .skip(page * limit)
        .sort({ createdAt: "desc" }).populate('userId',"displayName").populate("chapter","view");
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

const getStorySortRating = (limit = 8, page = 0) => {
  return new Promise(async (resolve, reject) => {
    try {
      const total = await Story.count();
      const all = await Story.find({published: true}).populate("userId", "displayName").populate('rating',"worldScene content character").select("title thumbnail genre description");
      const arr = []
      const forEachLoop = _ => {
        all.forEach(item => {
            item.rating.forEach(itemRating=>{
              const avg = Math.round((itemRating.worldScene + itemRating.character + itemRating.content)/3*100)/100
              arr.push({
                _id: item._id,
                title: item.title,
                author: item.userId.displayName,
                desc: item.description,
                genre: item.genre,
                rating: avg,
                quantityRating: item.rating.length,
                thumbnail: item.thumbnail
              })
            })
        })
      }
      forEachLoop()
      const sort = arr.sort((a,b)=> b.rating - a.rating)
      resolve({
        status: "OK",
        message: "Lấy danh sách truyện thành công!",
        data: sort.slice(0,limit),
        totalStory: total,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(total / limit),
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
      const allUser = await Story.find({
        userId: id,
      })
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
      }).populate("chapter","title _id createdAt chapterNo view").populate("userId","avatar displayName storyWritten").populate("rating","content character worldScene");
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
      await Chapter.deleteMany({storyId:id})
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

const getByRank = (limit = 10, page = 0, sort) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalStory = await Story.count();
      if (sort) {
        const objSort = {};
        objSort[sort] = "desc";
        const allStorySort = await Story.find({published: true})
          .limit(limit)
          .skip(page * limit)
          .sort(objSort).populate("userId","displayName").populate("chapter","view");
        resolve({
          status: "OK",
          message: "Lấy danh sách truyện dùng thành công!",
          data: allStorySort,
          totalStory: totalStory,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalStory / limit),
        });
      }
      const allStory = await Story.find()
        .limit(limit)
        .skip(page * limit)
        .sort({ createdAt: "desc" }).populate('userId',"displayName").populate("chapter","view");
      resolve({
        status: "OK",
        message: "Lấy danh sách truyện thành công!",
        data: allStory,
        totalStory: totalStory,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalStory / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getByFilter = (limit = 10, page = 0, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalStory = await Story.count();
      if (filter) {
        const allStorySort = await Story.find(filter)
          .limit(limit)
          .skip(page * limit)
          .populate("userId","displayName").populate("chapter","view");
        resolve({
          status: "OK",
          message: "Lấy danh sách truyện dùng thành công!",
          data: allStorySort,
          totalStory: allStorySort.length,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(allStorySort.length / limit),
        });
      }
      const allStory = await Story.find({published: true})
        .limit(limit)
        .skip(page * limit)
        .sort({ createdAt: "desc" }).populate('userId',"displayName").populate("chapter","view");
      resolve({
        status: "OK",
        message: "Lấy danh sách truyện thành công!",
        data: allStory,
        totalStory: totalStory,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalStory / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getallAdmin = (limit = 10, page = 0) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalUser = await Story.count();
      const allUser = await Story.find()
        .limit(limit)
        .skip(page * limit)
        .sort({ createdAt: "desc" }).populate('userId',"displayName").populate("chapter","view");
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

module.exports = {
  createStory,
  getall,
  getDetail,
  deleteStory,
  updateStory,
  getAllAuthor,getStorySortRating,getByRank,getByFilter,getallAdmin
};
