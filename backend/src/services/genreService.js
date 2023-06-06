const Genre = require("../models/genreModel");
const Story = require("../models/storyModel")

const createGenre = (title) => {
  return new Promise(async (resolve, reject) => {
    try {
        const checkGenre = await Genre.findOne({
            title: title
        })
        if(checkGenre !== null){
            resolve({
                status: "ERR",
                message: "Thể loại đã tồn tại!"
            })
        }      
        if(checkGenre === null){
          const created = await Genre.create({
            title,
          });
          resolve({
            status: "OK",
            message: "Tạo thể loại thành công!",
            data: created,
          });
        }
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = (limit = 10, page = 0,sort) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalUser = await Genre.count()
      if(sort){
        const objSort = {}
        objSort[sort[1]] =sort[0]
        const allUserSort = await Genre.find().limit(limit).skip(page * limit).sort(objSort)
        resolve({
          status: "OK",
          message: "Lấy danh sách thể loại thành công!",
          data: allUserSort,
          totalGenre: totalUser,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalUser / limit)
        })
      }
        const allUser = await Genre.find().limit(limit).skip(page * limit).sort({title: "asc"})
      resolve({
        status: "OK",
        message: "Lấy danh sách thể loại thành công!",
        data: allUser,
        totalGenre: totalUser,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalUser / limit)
      })
    } catch (e) {
      reject(e);
    }
  });
};

const deleteGenre = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
        const checkUser = await Genre.findOne({
          _id: id
        })
        if(checkUser === null){
            resolve({
                status: "OK",
                message: "Thể loại không tồn tại!"
            })
        }
        const checkStory = await Story.find({
          genre: id
        })
        if(checkStory.length < 1){
          await Genre.findByIdAndDelete(id)
          resolve({
            status: "OK",
            message: "Xóa thể loại thành công!"
          })
        }
        resolve({
          status: "ERR",
          message: "Xóa không thành công (đã có truyện)!"
        })
    } catch (e) {
      reject(e);
    }
  });
};

const updateGenre = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
        const checkUser = await Genre.findOne({
          _id: id
        })
        if(checkUser === null){
            resolve({
                status: "OK",
                message: "Thể loại không tồn tại!"
            })
        }
        const updateUser = await Genre.findByIdAndUpdate(id, data, {new: true})
      resolve({
        status: "OK",
        message: "Cập nhật thành công!",
        data: updateUser
      })
    } catch (e) {
      reject(e);
    }
  });
};

module.exports ={
    createGenre,
    getAll,
    deleteGenre,
    updateGenre
}