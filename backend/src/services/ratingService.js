const Genre = require("../models/genreModel");
const Rate = require("../models/rateModel");
const Story = require("../models/storyModel");

const createRating = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await Rate.find({
        storyId: data.storyId,
        userId: data.userId,
      });
      if (check.length > 0) {
        resolve({
          status: "ERR",
          message: "Đã  tồn tại!",
        });
      } else {
        const created = await Rate.create(data);
        await Story.findByIdAndUpdate(data.storyId,{$push: {rating: created._id}})
        resolve({
          status: "OK",
          message: "Đánh giá thành công!",
          data: created,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = (id, limit = 10) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ratings = await Rate.find({storyId: id})
      const all = await Rate.find({
        storyId: id,
      })
        .limit(limit)
        .sort({ createdAt: "desc" }).populate("userId", "avatar displayName exp");
        const avgCharacter = ratings.reduce((acc,cur) => (acc + cur.character) ,0)
        const avgWorldScene = ratings.reduce((acc,cur) => (acc + cur.worldScene) ,0)
        const avgContent = ratings.reduce((acc,cur) => (acc + cur.content) ,0)
      const avg = (avgCharacter/ratings.length + avgContent/ratings.length + avgWorldScene/ratings.length)/ratings.length
      resolve({
        status: "OK",
        message: "Lấy danh sách thành công!",
        data: all,
        avg: {
          total: Math.round(avg*100)/100,
          character:  (Math.round(avgCharacter/ratings.length*100)/100),
          worldScene: Math.round(avgWorldScene/ratings.length*100)/100,
          content: Math.round(avgContent/ratings.length*100)/100,
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getNewRating = ( limit = 3) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ratings = await Rate.find().limit(limit).sort({ createdAt: "desc" }).populate("userId", "avatar displayName").populate("storyId","title");
        // const avgCharacter = ratings.reduce((acc,cur) => (acc + cur.character)/ratings.length ,0)
        // const avgWorldScene = ratings.reduce((acc,cur) => (acc + cur.worldScene)/ratings.length ,0)
        // const avgContent = ratings.reduce((acc,cur) => (acc + cur.content)/ratings.length ,0)
      resolve({
        status: "OK",
        message: "Lấy danh sách thành công!",
        data: ratings,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getMyRating = (idStory,idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkRating = await Rate.find({
        storyId: idStory,
        userId: idUser
      });
      if (checkRating === null) {
        resolve({
          status: "OK",
          message: "Đánh giá không tồn tại!",
        });
      }
      resolve({
        status: "OK",
        message: "Lấy đánh giá thành công!",
        data: checkRating
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteGenre = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await Genre.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "Thể loại không tồn tại!",
        });
      }
      const checkStory = await Story.find({
        genre: id,
      });
      if (checkStory.length < 1) {
        await Genre.findByIdAndDelete(id);
        resolve({
          status: "OK",
          message: "Xóa thể loại thành công!",
        });
      }
      resolve({
        status: "ERR",
        message: "Xóa không thành công (đã có truyện)!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateRating = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await Rate.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "Đánh giá không tồn tại!",
        });
      }
      const updateRating = await Rate.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "OK",
        message: "Cập nhật thành công!",
        data: updateRating,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createRating,
  getAll,
  deleteGenre,
  updateRating,
  getMyRating,getNewRating
};
